// Auto-Hide Edge Group 控制器（VS 工具窗交互模式）
//
// 钉起的面板收成边条后：点 tab → 浮层滑出【覆盖】内容（网格零重排），再点同一 tab / 点空白 /
// Esc → 收回，点其它 tab → 换内容（tab 常驻边条）；浮层 pin = 展开停靠，close = 关当前面板。
//
// 依据 core(MIT) 的公开契约实现：moduleContracts.d.ts 的 IAutoHideEdgeGroupHost/Service
// （peek 的 DOM 与动画由宿主自建）。用到两处缝隙：收起 tab 的默认 expand() 入口有
// defaultPrevented 让路检查；repositionPanelOverlay() 可锚定不随 reparent 走的 always 面板。
//
// 三层 DOM：clip 固定裁剪框（always 层锚它，内容"揭开"而非平移）/ overlay 背景层（内满铺，
// transform 滑入，z 999）/ header 标题栏（不滑动，z 1001）。z 是被 core 逼出来的：forceVisible
// 的 always 浮层会被抬到 1000，背景层只能留 999、标题栏再上 1001，否则要靠透明穿透去补。

import {
    defineModule, registerModules, DockviewCompositeDisposable, DockviewMutableDisposable,
    createDismissableLayer, prefersReducedMotion
} from './dockview-core.esm.js'
import { getIcon } from './dockview-icon.js'
import { unpinFromEdge } from './dockview-group.js'
import { saveConfig } from './dockview-config.js'

const PEEK_MS = 150
const STRIP_FALLBACK = 35
// peek 浮层可拖到的最小尺寸，与边缘组 minimumSize 同值（dockview-group.js 的 EDGE_MIN_SIZE）
const PEEK_MIN_SIZE = 180
const EDGE_POSITIONS = ['left', 'right', 'top', 'bottom']

// inline=true：边条在左右，浮层沿 X 轴出入；sign：滑出方向
const AXIS = {
    left: { inline: true, sign: -1 },
    right: { inline: true, sign: 1 },
    top: { inline: false, sign: -1 },
    bottom: { inline: false, sign: 1 }
}

// 标题栏高度的兜底值：实际高度取 CSS（与结构面板 tabs 栏同源），只在未布局时用
const TITLEBAR_FALLBACK = 30

const setRect = (el, r) => {
    el.style.left = `${r.left}px`
    el.style.top = `${r.top}px`
    el.style.width = `${r.width}px`
    el.style.height = `${r.height}px`
}

class BBAutoHideService {
    constructor(host) {
        this._host = host
        this._session = null
        this._listeners = new Map()
        this._disposables = new DockviewCompositeDisposable()
    }

    // ---- 生命周期 ----

    init() {
        const host = this._host
        // 事件委托挂 document；capture 才能抢在 core 的 tab 处理前面。不用 overlayRoot —— 它在
        // init 时可能还不是最终那个 shell（嵌套 dockview 会重建），挂上去的监听会静默失效。
        const doc = host.overlayRoot?.ownerDocument ?? window.document
        const onClick = event => this._onStripClick(event)
        const onKeyDown = event => {
            if (event.key === 'Enter' || event.key === ' ') this._onStripClick(event)
        }
        doc.addEventListener('click', onClick, true)
        doc.addEventListener('keydown', onKeyDown)

        this._disposables.addDisposables(
            {
                dispose: () => {
                    doc.removeEventListener('click', onClick, true)
                    doc.removeEventListener('keydown', onKeyDown)
                }
            },
            host.onDidAddGroup(group => {
                this._track(group)
                // 组刚建出来时 location 可能还没落成 edge（addEdgeGroup 之后才挂载），
                // 下一个微任务再补一次，否则这条边条永远没有 peek 响应
                queueMicrotask(() => this._track(group))
            }),
            host.onDidRemoveGroup(group => {
                this._untrack(group)
                if (this._session?.group === group) this._teardown()
            }),
            // 运行时改 autoHide 标志（如 setAutoHide(false) 后展开）：先收回浮层
            host.onDidEdgeGroupAutoHideChange(group => {
                if (this._session?.group === group && !host.isEdgeGroupAutoHide(group)) this._teardown()
            })
        )
        host.groups.forEach(g => this._track(g))
    }

    dispose() {
        this._teardown()
        this._listeners.forEach(d => d.dispose())
        this._listeners.clear()
        this._disposables.dispose()
    }

    // ---- IAutoHideEdgeGroupService ----

    peek(position, peek) {
        if (peek) this._open(position)
        else if (this._session?.position === position) this._teardown()
    }

    pin(position) {
        const group = this._host.getEdgeGroupPanel(position)
        if (this._session?.group === group) this._teardown()
        if (group) this._host.setEdgeGroupCollapsed(group, false)
    }

    autoHide(position) {
        const group = this._host.getEdgeGroupPanel(position)
        if (this._session?.group === group) this._teardown()
        if (group) this._host.setEdgeGroupCollapsed(group, true)
    }

    // ---- 边条组跟踪（tab 点击拦截在 init 里挂 document 委托，见其注释）----
    _track(group) {
        if (group.api?.location?.type !== 'edge') return
        if (this._listeners.has(group)) return
        // 展开（回到结构）时标题条在顶部（横排 tabs，与普通面板一致）；
        // 收起回竖条时恢复贴边方向。任何来源的展开/收起都跟随（api/拖拽/按钮）。
        const collapsedDisposable = group.api.onDidCollapsedChange(event => {
            const position = this._positionOf(group)
            if (!position) return
            group.api.setHeaderPosition(event.isCollapsed ? position : 'top')
        })
        this._listeners.set(group, { dispose: () => collapsedDisposable.dispose() })
    }

    _untrack(group) {
        this._listeners.get(group)?.dispose()
        this._listeners.delete(group)
    }

    /** 事件目标反查所属边条组（委托挂在 document 上） */
    _groupFrom(target) {
        if (!target?.closest) return undefined
        for (const group of this._listeners.keys()) {
            if (group.element.contains(target)) return group
        }
        return undefined
    }

    _onStripClick(event) {
        const group = this._groupFrom(event.target)
        if (!group) return
        if (event.defaultPrevented) return
        const host = this._host
        if (!host.isEdgeGroupAutoHide(group)) return
        const tabEl = event.target.closest('.dv-tab')
        if (!tabEl) return
        // C# 标题栏按钮（≡，DockViewTitleBar.razor）复用了 dv-default-tab-action 类名，但既不是
        // tab 主体也不是关闭按钮：只掐掉 core 的默认处理，事件继续冒泡给 Blazor 的 @onclick。
        if (event.target.closest('.bb-dockview-item-title-icon')) {
            event.preventDefault()
            return
        }
        // tab 内部按钮不能被吞：这里一 preventDefault，core 的处理器（入口即 defaultPrevented
        // 让路）就跳过，按钮变成"点了没反应"。边条暂不展示它（见 bb.css），功能保留。
        if (event.target.closest('.dv-default-tab-action')) return
        if (!group.api.isCollapsed()) return
        event.preventDefault()
        // DOM Tab 包着 panel.view.tab（内容模型）作为子节点，用 contains 匹配；
        // 兜底按 aria-label（= 面板标题）
        const panel = group.panels.find(p => p.view?.tab?.element && tabEl.contains(p.view.tab.element))
            || group.panels.find(p => (p.title || p.id) === tabEl.getAttribute('aria-label'))
        if (this._session?.group === group) {
            // toggle：再点同一 tab 收回；点其它 tab 换内容
            if (this._session.panel === panel) this._teardown()
            else this._switch(panel)
            return
        }
        this._open(this._positionOf(group), panel || group.activePanel)
    }

    _positionOf(group) {
        const host = this._host
        for (const position of EDGE_POSITIONS) {
            if (host.getEdgeGroupPanel(position) === group) return position
        }
        return undefined
    }

    // ---- peek 会话 ----

    _open(position, panel) {
        const host = this._host
        const group = host.getEdgeGroupPanel(position)
        if (!group || group.api.location.type !== 'edge') return
        if (!host.isEdgeGroupAutoHide(group) || !group.api.isCollapsed()) return
        if (this._session) this._teardown()

        const doc = group.element.ownerDocument

        // clip / header 都直接挂 overlayRoot：同一个 stacking context，z 才比得了。标题栏一旦塞进
        // 背景层，背景层的 z-index 会造出独立上下文，内部 z 再大也压不住 always 层。
        const clip = doc.createElement('div')
        clip.className = `bb-edge-peek-clip bb-edge-peek-clip-${position}`

        const overlay = doc.createElement('div')
        overlay.className = 'bb-edge-peek'
        overlay.setAttribute('role', 'dialog')

        const bar = doc.createElement('div')
        bar.className = 'bb-edge-peek-titlebar'
        const title = doc.createElement('div')
        title.className = 'bb-edge-peek-title'
        const actions = doc.createElement('div')
        actions.className = 'bb-edge-peek-actions'
        // 克隆该组自己的动作按钮（title/类名/尺寸原样，不依赖模板缓存）；找不到时回退模板
        const cloneIcon = (selector, name) => {
            const source = group.element.querySelector(`.dv-right-actions-container ${selector}`)
            const icon = source ? source.cloneNode(true) : getIcon(name)
            icon.classList.remove('bb-show', 'bb-pin')   // 清掉可能的容器态类残留（防御）
            return icon
        }
        const unpin = cloneIcon('.bb-dockview-control-icon-pushpin', 'pushpin')
        unpin.classList.add('bb-edge-peek-pin')
        const close = cloneIcon('.bb-dockview-control-icon-close', 'close')
        close.classList.add('bb-edge-peek-close')
        actions.append(unpin, close)
        bar.append(title, actions)

        // 外框：整块（含标题栏）的内边缘描边 + 投影，纯装饰层不吃事件；挂 clip 上会在标题栏那段断开。
        const frame = doc.createElement('div')
        frame.className = `bb-edge-peek-frame bb-edge-peek-frame-${position}`

        // 内边缘拖拽把手（浮层本身不提供拉伸）。挂外框而非背景层：背景层在滑动，把手必须一开始
        // 就在固定框内边缘；同层也不行 —— 背景层 z 999 会把把手整块盖住，拖不动。
        const handle = doc.createElement('div')
        handle.className = `bb-edge-peek-handle bb-edge-peek-handle-${position}`
        frame.appendChild(handle)

        // reparent 内容容器：tab 留在边条上（VS 观感），内容进背景层满铺
        const container = group.model.contentContainer.element
        const restore = container.parentElement
        container.style.width = '100%'
        container.style.height = '100%'
        overlay.appendChild(container)
        clip.append(overlay)
        host.overlayRoot.append(clip, bar, frame)
        host.setEdgeGroupPeeking(group, true)

        const session = this._session = {
            group, position, panel: null, clip, overlay, header: bar, frame, title,
            closeBtn: close,
            // 面板是否允许关闭：与 tab 上的关闭按钮同一口径（panel.params.showClose ?? options.showClose）
            showCloseOf: p => (p?.params?.showClose ?? this._host.options?.showClose ?? true) !== false,
            container, restore, size: 0, renderLayer: null, disposables: new DockviewCompositeDisposable()
        }
        // peek 打开后内容已显示，边条 tab 要恢复选中态；core 的 isPeeking 不落 DOM，只能自己标
        group.element.classList.add('bb-edge-peeking')

        // 先就位再上内容：_switch 里的 _anchorRenderLayer 要把已定位的 clip 当裁剪窗口用
        this._layoutPeek(session)
        this._switch(panel || group.activePanel)

        this._bindResize(session, handle)

        unpin.addEventListener('click', () => {
            const target = session.group
            // VS 语义：只取消当前面板所属来源组（钉起时的分组），其它来源组的面板留在边条上
            const originId = session.panel?.params?.edgeOrigin ?? ''
            this._teardown()
            unpinFromEdge(target, originId)
        })
        close.addEventListener('click', () => {
            (session.panel || group.activePanel)?.api.close()
        })

        session.disposables.addDisposables(
            // 标题跟随激活面板（切 tab / 拖拽进新面板）
            group.api.onDidActivePanelChange(e => {
                if (this._session === session) this._switch(e.panel)
            }),
            // 外部展开（api.expand 等）：先还原 DOM 再让 shell 接管
            group.api.onDidCollapsedChange(e => {
                if (!e.isCollapsed && this._session === session) this._teardown()
            }),
            // 面板被关空：收回（空边条去留由 wrapper 的 close/removeGroup 逻辑决定）
            group.model.onDidRemovePanel(() => {
                if (group.model.isEmpty && this._session === session) this._teardown()
            }),
            // 点浮层与边条之外 / Esc / 窗口尺寸变化：收回。
            // 里面/外面按矩形判定（见 _pointInside），不信 DOM 血缘。
            createDismissableLayer({
                window: host.overlayRoot.ownerDocument?.defaultView ?? window,
                elements: () => [clip, bar, frame, group.element],
                isInside: e => this._pointInside(session, e.clientX, e.clientY),
                resize: true,
                onDismiss: () => { if (this._session === session) this._teardown() }
            })
        )

        this._slideIn(session)
        // 无障碍播报（无 live-region 服务时核心侧是 no-op）
        host.announce?.(`面板「${session.panel?.title || session.panel?.id || ''}」滑出预览`)
    }

    // 定位：标题栏占顶部一段，clip 从它下沿开始；两者都锚到边条内侧、相对 overlayRoot 计算（网格零重排）。
    _layoutPeek(session) {
        const rootRect = this._host.overlayRoot.getBoundingClientRect()
        const stripRect = session.group.element.getBoundingClientRect()
        // 尺寸优先级：本次拖拽中的实时值 → 边缘组的展开尺寸（拖完已 setSize 写回 core 并随
        // toJSON 落盘）→ 默认 300。不自己另存一份表：两份状态迟早不一致。
        const size = Math.max(session.size || this._host.getEdgeGroupExpandedSize(session.position) || 300, STRIP_FALLBACK)
        const left = stripRect.left - rootRect.left
        const top = stripRect.top - rootRect.top

        let box
        switch (session.position) {
            case 'left':
                box = { left: left + stripRect.width, top, width: size, height: stripRect.height }
                break
            case 'right':
                box = { left: left - size, top, width: size, height: stripRect.height }
                break
            case 'top':
                box = { left, top: top + stripRect.height, width: stripRect.width, height: size }
                break
            default:   // bottom
                box = { left, top: top - size, width: stripRect.width, height: size }
                break
        }

        // 标题栏高度取实算值（CSS 与结构面板 tabs 栏同源，硬编码会和面板标题栏差 2px）
        const bar = Math.min(session.header.offsetHeight || TITLEBAR_FALLBACK, box.height)
        setRect(session.header, { ...box, height: bar })
        setRect(session.frame, box)
        setRect(session.clip, { left: box.left, top: box.top + bar, width: box.width, height: Math.max(0, box.height - bar) })
    }

    // 命中判定走几何：always 面板内容在 .dv-render-overlay 里，与 clip 是兄弟而非子节点，
    // composedPath 反查必然落空。用固定裁剪框而非滑动的背景层 —— 滑入期间背景层还没盖满
    // 露出区，点已露出的内容同样会被判成外面。
    _pointInside(session, x, y) {
        const hit = el => {
            const r = el.getBoundingClientRect()
            return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
        }
        return hit(session.group.element) || hit(session.clip) || hit(session.header)
    }

    // 滑入：手写 rAF + easeOutCubic，每帧重锚 always 内容。不用 CSS transition —— 那样取不到
    // 中间位移，always 层只能等结束一次性归位（先停在旧位置再跳一下）。
    _slideIn(session) {
        const overlay = session.overlay
        const axis = AXIS[session.position]
        const css = `translate${axis.inline ? 'X' : 'Y'}`
        // 先摆到窗口外，免得第一个 rAF 之前闪现在最终位置
        overlay.style.transform = `${css}(${100 * axis.sign}%)`

        const doc = overlay.ownerDocument
        const win = doc.defaultView
        const start = win?.performance?.now?.()
        // 减动效按浮层所在文档判断（顶层窗口的设置不一定代表它）
        if (prefersReducedMotion(doc) || typeof win?.requestAnimationFrame !== 'function' || start === undefined) {
            overlay.style.transform = ''
            this._anchorRenderLayer(session)
            return
        }
        const step = now => {
            if (this._session !== session) return   // 中途收回 / 换组
            const t = Math.min(1, (now - start) / PEEK_MS)
            const eased = 1 - Math.pow(1 - t, 3)
            overlay.style.transform = t >= 1 ? '' : `${css}(${(1 - eased) * 100 * axis.sign}%)`
            this._anchorRenderLayer(session)
            if (t < 1) win.requestAnimationFrame(step)
        }
        win.requestAnimationFrame(step)
    }

    // always 面板渲染在 OverlayRenderContainer 里，reparent 搬不动，只能重新锚定 + 强制显示。
    // 锚裁剪框而非背景层：前者位置恒定、inset 稳定，后者每帧在变、会把内容锚到滑动的旧位置。
    _anchorRenderLayer(session) {
        const panel = session.panel
        if (!panel || panel.api.renderer !== 'always') return
        const rect = session.clip.getBoundingClientRect()
        // 没有布局时（如单测环境）clip 是 0 尺寸：此时不裁，只强制显示
        const clip = rect.width > 0 && rect.height > 0 ? rect : undefined
        this._host.repositionPanelOverlay(panel, true, clip)
        // 记下真正被强显的那层：收回时按它最准（事后按 panel 反查，换过 tab 或重新 attach 会落空）
        session.renderLayer = panel.view?.content?.element?.parentElement
        // 这一层可能被上一次收回按成 hidden（CSS 再把它翻成 opacity:0），强显就得放开
        this._showLayer(session.renderLayer)
    }

    _switch(panel) {
        const s = this._session
        if (!s || !panel || s.group.panels.indexOf(panel) === -1) return
        // 同组只强显当前这一个 always 面板：换 tab 时先把上一个还回可见性接管，
        // 否则多个 always 面板会拿到同一份几何、叠在一起互相覆盖。
        if (s.panel && s.panel !== panel) {
            this._hideRenderLayers(s.group, panel, s.renderLayer)
            s.renderLayer = null
            this._host.repositionPanelOverlay(s.panel, false)
        }
        s.panel = panel
        if (s.group.activePanel !== panel) s.group.model.openPanel(panel)
        s.title.textContent = panel.title || panel.id
        // 原面板没有关闭按钮（showClose=false）时，浮层里同样不出现
        s.closeBtn.style.display = s.showCloseOf(panel) ? '' : 'none'
        this._anchorRenderLayer(s)
    }

    // 内边缘拖拽调节浮层宽/高；松手写回边缘组展开尺寸，下次 peek 沿用
    _bindResize(session, handle) {
        const doc = handle.ownerDocument
        const position = session.position
        const axis = AXIS[position]
        // 内边缘方向：left/top 的把手在其右/下侧，向右/下拖变大；right/bottom 反之
        const dir = position === 'left' || position === 'top' ? 1 : -1
        const onDown = event => {
            if (event.button) return
            event.preventDefault()
            event.stopPropagation()
            const rect = session.clip.getBoundingClientRect()
            // 拖的是整个浮层（含标题栏）在主轴上的尺寸：竖向要补回标题栏那一段
            const bar = session.header.offsetHeight || TITLEBAR_FALLBACK
            const startSize = (axis.inline ? rect.width : rect.height + bar) || session.size || 0
            const start = axis.inline ? event.clientX : event.clientY
            const stripEl = session.group.element.getBoundingClientRect()
            const stripSize = (axis.inline ? stripEl.width : stripEl.height) || STRIP_FALLBACK
            const hostSize = axis.inline ? this._host.width : this._host.height
            const rootRect = this._host.overlayRoot.getBoundingClientRect()
            const boxSize = Math.max(hostSize || 0, (axis.inline ? rootRect.width : rootRect.height) || 0)
            // 容器尺寸无效（无布局环境）时不夹上限
            const max = boxSize > PEEK_MIN_SIZE + stripSize ? boxSize - stripSize - 40 : Number.POSITIVE_INFINITY
            const body = doc.body
            const prevCursor = body.style.cursor
            const prevSelect = body.style.userSelect
            body.style.cursor = axis.inline ? 'ew-resize' : 'ns-resize'
            body.style.userSelect = 'none'
            const move = moveEvent => {
                if (moveEvent.buttons === 0) return up()
                const delta = (axis.inline ? moveEvent.clientX : moveEvent.clientY) - start
                session.size = Math.max(PEEK_MIN_SIZE, Math.min(max, startSize + delta * dir))
                // 改的是裁剪框尺寸（背景层在框里满铺），重定位后 always 层跟着重锚
                this._layoutPeek(session)
                this._anchorRenderLayer(session)
            }
            const up = () => {
                doc.removeEventListener('pointermove', move)
                doc.removeEventListener('pointerup', up)
                doc.removeEventListener('pointercancel', up)
                body.style.cursor = prevCursor
                body.style.userSelect = prevSelect
                if (!session.size) return
                // 写回边缘组展开尺寸：收起态等价于 restoreExpandedSize，随 toJSON 落盘
                const group = session.group
                if (group && group.model.location.type === 'edge') {
                    group.api.setSize(axis.inline ? { width: session.size } : { height: session.size })
                    saveConfig(group.api.accessor)
                }
            }
            doc.addEventListener('pointermove', move)
            doc.addEventListener('pointerup', up)
            doc.addEventListener('pointercancel', up)
        }
        handle.addEventListener('pointerdown', onDown)
        session.disposables.addDisposables({ dispose: () => handle.removeEventListener('pointerdown', onDown) })
    }

    // always 面板的内容不在我们搬走的 contentContainer 里，而 core 撤销 forceVisible 又排到下一
    // 帧 rAF，所以收回这一帧里它仍带着 peek 的 clipPath 与 z=1000 停在原地可见 —— 摘 DOM 前同步按死。
    // 光写 visibility 挡不住：它是继承属性，后代自己写着 visible 就能翻回来（实测报表每行一个
    // i.fa-solid 正是如此，只剩一串小箭头）。真正的"整棵子树不可见"由 bb.css 按这个 inline 状态位
    // 翻成 opacity:0；这里只维护状态位，core 清掉 visibility 就等于放开，不需要额外的恢复逻辑。
    _hideLayer(el) {
        if (!el || !el.classList.contains('dv-render-overlay')) return
        el.style.visibility = 'hidden'
        el.style.pointerEvents = 'none'
        el.style.clipPath = ''
        el.style.zIndex = ''
    }

    // 放开：把状态位交还给 core（下一次 reposition 也会写回同一件事）
    _showLayer(el) {
        if (!el || !el.classList.contains('dv-render-overlay')) return
        el.style.visibility = ''
    }

    // 按组内所有面板而不是只按当前面板：换 tab 漏一个、某面板 renderer 取默认值，都会让某层
    // 没被按掉（同样是多留一帧）。extra 传运行期实测到的 session.renderLayer —— 事后按 panel
    // 反查会落空，光遍历组内面板不够。
    _hideRenderLayers(group, keep, extra) {
        this._hideLayer(extra)
        if (!group) return
        for (const panel of group.panels) {
            if (panel === keep) continue
            this._hideLayer(panel.view?.content?.element?.parentElement)
        }
    }

    // 收回：还原 DOM 后直接摘掉，不做滑出动画 —— 那 150ms 里点击已经落到下面的网格上了。
    _teardown() {
        const s = this._session
        if (!s) return
        this._session = null
        s.group.element.classList.remove('bb-edge-peeking')
        // 先按内容层，再动 core 状态（下面每一步都可能排一轮 rAF 重排）：收起态下组内没有面板该可见。
        this._hideRenderLayers(s.group, null, s.renderLayer)
        this._host.setEdgeGroupPeeking(s.group, false)
        // 把 always 层还回边条：清 forceVisible + clip，让它重新受可见性管
        if (s.panel) this._host.repositionPanelOverlay(s.panel, false)
        this._host.announce?.('预览已收回')
        s.disposables.dispose()

        s.container.style.width = ''
        s.container.style.height = ''
        if (s.container.parentElement === s.overlay) s.restore.appendChild(s.container)
        s.clip.remove()      // 连带里面的背景层
        s.header.remove()
        s.frame.remove()     // 连带里面的把手
    }
}

const BBAutoHideModule = defineModule({
    name: 'AutoHideEdgeGroup',
    serviceKey: 'autoHideEdgeGroupService',
    create: host => new BBAutoHideService(host),
    init: (host, service) => {
        service.init()
        return service
    }
})

// 全局注册：须在 DockviewComponent 构造前执行（本文件被 dockview-utils.js 顶部 import）
registerModules([BBAutoHideModule])
