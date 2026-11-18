import { getIcons, getIcon } from "./dockview-icon.js"
import { deleteInvisiblePanel, findContentFromPanels, moveAlwaysRenderPanel } from "./dockview-panel.js"
import { saveConfig } from "./dockview-config.js"
import { markFirstVisibleElement } from "./dockview-utils.js"
import EventHandler from '../../BootstrapBlazor/modules/event-handler.js'

const onAddGroup = group => {
    Object.defineProperties(group, {
        type: {
            get() { return this.model.location.type }
        },
        params: {
            get() { return JSON.parse(JSON.stringify(group.activePanel?.params || {})) }
        }
    })

    const dockview = group.api.accessor;

    group.header.onDrop(() => {
        saveConfig(dockview)
    })
    group.model.contentContainer.dropTarget.onDrop(() => {
        saveConfig(dockview);
        markFirstVisibleElement(group)
    })
    createGroupActions(group);
}

const addGroupWithPanel = (dockview, panel, panels, index) => {
    if (panel.groupId) {
        addPanelWidthGroupId(dockview, panel, index)
    }
    else {
        addPanelWidthCreatGroup(dockview, panel, panels)
    }
    deleteInvisiblePanel(dockview, panel)
}

const addPanelWidthGroupId = (dockview, panel, index) => {
    let group = dockview.api.getGroup(panel.groupId)
    // The group may have moved (floated/docked) since this panel was closed; getFloatingId toggles its grid<->floating
    // id. If our entry is empty/gone but the counterpart holds the panels, route there so the panel rejoins the group.
    if (!group || group.panels.length === 0) {
        const counterpart = dockview.api.getGroup(getFloatingId(panel.groupId))
        if (counterpart && counterpart.panels.length > 0) group = counterpart
    }
    // 钉起期间从边条删除的面板：取消钉住后边条组已销毁，回它钉起前的原占位组（而不是新建浮窗）
    if (!group && panel.params?.edgeOrigin) {
        group = dockview.api.getGroup(panel.params.edgeOrigin)
    }
    // Empty pre-existing group = deleted-side placeholder (deferred actions + collapsed branch); a populated one is healthy.
    const reusedEmptyGroup = !!group && group.panels.length === 0;
    const isNewFloatingGroup = !group;
    let { rect = {}, packup, currentPosition } = panel.params || {}
    if (!group) {
        group = dockview.createGroup({ id: panel.groupId })
        const width = dockview.width > 500 ? 500 : (dockview.width - 10)
        const height = dockview.height > 460 ? 460 : (dockview.height - 10)
        const left = (dockview.width - width) / 2
        const top = (dockview.height - height) / 2
        // Prefer currentPosition (saved on hide) over rect (only refreshed on un-float) to keep last size & position.
        let floatingGroupRect = (currentPosition?.width > 0
            ? { width: currentPosition.width, height: currentPosition.height, position: { top: currentPosition.top, left: currentPosition.left } }
            : rect) || {
            width, height: packup?.isPackup ? packup.height : height, position: { left, top }
        }
        dockview.addFloatingGroup(group, { ...floatingGroupRect, skipRemoveGroup: true })
        const overlay = dockview.floatingGroups.find(fg => fg.group.id == group.id).overlay
        observeOverlayChange(overlay, group)
        createGroupActions(group);
    }
    else {
        if (group.api.location.type === 'grid') {
            let isVisible = dockview.isVisible(group)
            if (isVisible === false) {
                dockview.setVisible(group, true)
            }
        }
    }

    // Restore a saved dimension only when the group collapsed to its minimum; if the structure already gave it a real
    // size, restoring a stale saved value would shrink it and squeeze/blank a sibling.
    let initialWidth, initialHeight;
    if (reusedEmptyGroup && group.api.location.type === 'grid' && group.element.parentElement) {
        const cp = panel.params?.currentPosition;
        const { offsetWidth, offsetHeight } = group.element.parentElement;
        if (cp?.width > offsetWidth && offsetWidth <= group.minimumWidth + 2) initialWidth = cp.width;
        if (cp?.height > offsetHeight && offsetHeight <= group.minimumHeight + 2) initialHeight = cp.height;
    }
    dockview.addPanel({
        id: panel.id,
        title: panel.title,
        inactive: true,
        renderer: panel.renderer,
        component: panel.component,
        position: { referenceGroup: group, index: index || 0 },
        initialWidth,
        initialHeight,
        params: { ...panel.params, rect, packup, visible: true }
    })

    // addPanel is inactive; activate so a freshly created floating group isn't blank.
    if (isNewFloatingGroup) {
        group.panels.find(p => p.id === panel.id)?.api.setActive();
    }

    // Placeholder deferred its action states while empty (see resetActionStates); re-render now it has a panel.
    if (reusedEmptyGroup && group.api.location.type === 'grid') {
        reRenderActionStates(group);
        // The restore left a _pendingSize; clear it so a later setVisible(true) (float->dock) won't replay this stale size.
        if (initialWidth > 0 || initialHeight > 0) group.api._pendingSize = undefined;
    }
}

const addPanelWidthCreatGroup = (dockview, panel, panels) => {
    let { position = {}, packupHeight, isPackup, isMaximized } = panel.params || {}
    let brothers = panels.filter(p => p.params.parentId == panel.params.parentId && p.id != panel.id)
    let group, direction
    if (brothers.length > 0 && brothers[0].params.parentType == 'group') {
        group = dockview.groups.find(g => findContentFromPanels(g.panels, brothers[0]))
    }
    else {
        let targetPanel
        for (let i = 0, len = panels.length; i < len; i++) {
            if (panels[i]?.id === panel.id) {
                if (i == len - 1) {
                    targetPanel = panels[i - 1]
                    group = dockview.groups.find(g => findContentFromPanels(g.panels, targetPanel))
                    direction = getOrientation(dockview.gridview.root, group) === 'VERTICAL' ? 'below' : 'right'
                    break
                }
                else {
                    targetPanel = panels[i + 1]
                    group = dockview.groups.find(g => findContentFromPanels(g.panels, targetPanel))
                    direction = getOrientation(dockview.gridview.root, group) === 'VERTICAL' ? 'above' : 'left'
                    break
                }
            }
        }
    }
    let option = {
        id: panel.id,
        title: panel.title,
        inactive: true,
        renderer: panel.renderer,
        component: panel.component,
        position: { referenceGroup: group },
        params: { ...panel.params, isPackup, packupHeight, isMaximized, position }
    }
    if (direction) option.position.direction = direction
    dockview.addPanel(option);
}

const getOrientation = function (child, group) {
    if (child.children) {
        let targetGroup = child.children.find(item => !item.children && item.element === group.element)
        if (targetGroup) {
            return child.orientation
        }
        else {
            for (const item of child.children) {
                let orientation = getOrientation(item, group)
                if (orientation) {
                    return orientation
                }
            }
        }
    }
    else {
        return false
    }
}

const createGroupActions = group => {
    const actionContainer = group.header.element.querySelector('.dv-right-actions-container');
    getIcons().forEach(item => {
        if (item.name !== 'bar') {
            const icon = getIcon(item.name);
            actionContainer.append(icon);
        }
    });
    setTimeout(() => {
        resetActionStates(group, actionContainer);
        if (showUp(group) && getUpState(group)) {
            group.panels.forEach(panel => panel.view.content.element.classList.add('bb-overflowHidden'))
        }
    }, 0)
    addActionEvent(group, actionContainer);
}

const disposeGroup = group => {
    if (group.mutationObserver) {
        group.mutationObserver.disconnect();
    }
    removeActionEvent(group);
}

const resetActionStates = (group, actionContainer) => {
    const dockview = group.api.accessor;
    // Empty group: `[].every()` is vacuously true so every show*() falls back to options defaults, wrongly showing
    // buttons that stick once re-filled. Defer until it has panels (re-rendered on insert in addPanelWidthGroupId).
    if (group.panels.length === 0) return;
    // Edge groups are structural: no float / no maximize, but pin must stay reachable (that's "取消钉住")
    const isEdge = group.model.location.type == 'edge'
    // bb-show-lock only gates the button; apply the lock STATE regardless so a locked group stays locked when showLock=false.
    if (showLock(dockview, group)) {
        actionContainer.classList.add('bb-show-lock');
    }
    if (getLockState(dockview, group)) {
        toggleLock(group, actionContainer, true, false)
    }
    // 边缘组必须始终留一个"取消钉住"的入口，否则面板可能被永久钉死在侧边
    if (isEdge || (showPin(dockview, group) && showFloat(dockview, group))) {
        actionContainer.classList.add('bb-show-pin');
        // toggle 而非 add：组在网格/浮窗/边条之间迁移时会带着旧类，必须清掉
        actionContainer.classList.toggle('bb-pin', getPinState(group));
    }
    if (!isEdge && showMaximize(dockview, group)) {
        actionContainer.classList.add('bb-show-maximize');
        if (getMaximizeState(group)) {
            setGroupMaximizeClass(group, true);
        }
    }
    if (!isEdge && showFloat(dockview, group)) {
        actionContainer.classList.add('bb-show-float');
        if (getFloatState(group)) {
            actionContainer.classList.add('bb-float');
        }
    }
    if (showUp(group) && !getUpState(group)) {
        actionContainer.classList.add('bb-up')
    }
}

// Re-render action buttons after an empty placeholder gains a panel (its actions were deferred while empty).
const reRenderActionStates = group => {
    const actionContainer = group.header.element.querySelector('.dv-right-actions-container');
    if (actionContainer) resetActionStates(group, actionContainer);
}

const showLock = (dockview, group) => {
    const { options } = dockview.params;
    return group.panels.every(panel => panel.params.showLock === null)
        ? options.showLock
        : group.panels.some(panel => panel.params.showLock === true)
}
const showPin = (dockview, group) => {
    const { options } = dockview.params;
    return group.panels.every(panel => panel.params.showPin === null || panel.params.showPin === undefined)
        ? options.showPin
        : group.panels.some(panel => panel.params.showPin === true)
}
const getPinState = group => {
    // 已钉起 = 边缘组。网格组/浮窗都是"可钉起"态（空心图钉），边条是"已钉起"（实心图钉）
    return group.model.location.type == 'edge'
}

const getLockState = (dockview, group) => {
    if (group.locked) return true;
    const { options } = dockview.params;
    return group.panels.every(p => p.params.isLock == null)
        ? options.lock
        : group.panels.some(p => p.params.isLock === true);
}
const showUp = (group) => {
    return group.model.location.type == 'floating'
}
const getUpState = (group) => {
    return group.getParams().packup?.isPackup
}
const showMaximize = (dockview, group) => {
    const { options } = dockview.params;
    return group.panels.every(p => p.params.showMaximize === null)
        ? options.showMaximize
        : group.panels.some(p => p.params.showMaximize === true);
}

const getMaximizeState = (group) => {
    const type = group.model.location.type
    return type === 'grid'
        ? group.api.isMaximized()
        : (type === 'floating' ? group.activePanel?.params.isMaximized : false)
}

const showFloat = (dockview, group) => {
    const { options } = dockview.params;
    return group.panels.every(panel => panel.params.showFloat === null)
        ? options.showFloat
        : group.panels.some(panel => panel.params.showFloat === true)
}

const getFloatState = group => group.model.location.type === 'floating';

const addActionEvent = group => {
    const actionContainer = group.header.element.querySelector('.dv-right-actions-container');
    const tabsContainer = group.header.tabContainer

    EventHandler.on(actionContainer, 'click', '.bb-dockview-control-icon', e => {
        const ele = e.delegateTarget;
        if (ele.classList.contains('bb-dockview-control-icon-lock')) {
            toggleLock(group, actionContainer, false);
            group.api.accessor._lockChanged.fire({ keys: group.panels.map(panel => panel.params.key), isLock: false });
        }
        else if (ele.classList.contains('bb-dockview-control-icon-unlock')) {
            toggleLock(group, actionContainer, true);
            group.api.accessor._lockChanged.fire({ keys: group.panels.map(panel => panel.params.key), isLock: true });
        }
        else if (ele.classList.contains('bb-dockview-control-icon-restore')) {
            toggleFull(group, true);
        }
        else if (ele.classList.contains('bb-dockview-control-icon-full')) {
            toggleFull(group, false);
        }
        else if (ele.classList.contains('bb-dockview-control-icon-dock')) {
            dock(group);
        }
        else if (ele.classList.contains('bb-dockview-control-icon-float')) {
            float(group);
        }
        else if (ele.classList.contains('bb-dockview-control-icon-down')) {
            down(group, actionContainer, true);
        }
        else if (ele.classList.contains('bb-dockview-control-icon-close') && ele.parentElement.classList.contains('dv-right-actions-container')) {
            close(group, actionContainer, true);
        }
        else if (e.target.classList.contains('dv-default-tab-content')) {
            const targetTabEle = e.target.closest('.dv-tab')
            group.api.accessor.moveGroupOrPanel({
                from: { groupId: group.id, panelId: group.panels.find(p => p.view.tab.element.parentElement == targetTabEle).id },
                to: {
                    group,
                    position: 'center',
                    index: 0,
                },
            });
        }
        else if (ele.classList.contains('bb-dockview-control-icon-pin') || ele.classList.contains('bb-dockview-control-icon-pushpin')) {
            pinToEdge(group)
        }
    });
}

// 钉起 = 把组搬到官方 Edge Group。折叠/展开、竖排 tab 切换、尺寸与折叠状态的序列化全交给 dockview。
const EDGE_PREFIX = 'bb-edge-'
// 边条展开后的默认宽度 / 可拖到的最小尺寸（peek 浮层同用这个下限，见 dockview-autohide.js）
const EDGE_INITIAL_SIZE = 300
const EDGE_MIN_SIZE = 180

const findEdgeGroup = (dockview, position) =>
    dockview.groups.find(g => g.model.location.type == 'edge' && g.model.location.position == position)

// 钉起选边：组中心落在结构区左半边就左、右半边就右，正好在中线取左（就近吸附的直觉）
const getEdgeSide = group => {
    const dockview = group.api.accessor
    const root = dockview.gridview?.element ?? dockview.element
    if (!root) return 'left'
    const rect = group.element.getBoundingClientRect()
    const rootRect = root.getBoundingClientRect()
    if (!(rect.width > 0) || !(rootRect.width > 0)) {
        // 无布局环境（如尚未渲染/隐藏）：退化为"贴右缘 → 右，否则左"
        const left = group.element.offsetLeft
        const width = group.element.offsetWidth
        return left > 0 && Math.abs(left + width - root.offsetWidth) <= 1 ? 'right' : 'left'
    }
    return rect.left + rect.width / 2 <= rootRect.left + rootRect.width / 2 ? 'left' : 'right'
}

// 钉边前记下来源网格组：浮窗的 id 是 "<origin>_floating"
const getOriginGroupId = group =>
    group.model.location.type == 'floating' ? group.id.split('_')[0] : group.id

const pinToEdge = group => {
    const dockview = group.api.accessor
    if (group.locked) return
    if (group.model.location.type == 'edge') return unpinFromEdge(group)

    // 浮窗先落回网格（复用 dock 的已验证路径），之后按网格组处理
    let floatingSide
    if (group.model.location.type == 'floating') {
        // 只认 wrapper 自己建的浮窗（id 约定 <origin>_floating）；对不上就不钉，避免留下空浮窗
        const origin = dockview.groups.find(g => g.id.split('_')[0] == group.id.split('_')[0] && g.id != group.id)
        if (!origin) return
        // 选边用浮窗"当前所在位置"（回仓后它的位置就不代表用户意图了）
        floatingSide = getEdgeSide(group)
        dock(group)
        group = origin
        if (group.model.location.type != 'grid') return
    }
    if (group.panels.length == 0) return

    const position = floatingSide ?? getEdgeSide(group)
    const originId = group.id
    // 边条宽度沿用组上次的宽度：老布局把它存在 drawer.width 里，没有就取默认值
    const { drawer = {} } = group.getParams()
    const initialSize = drawer.width || EDGE_INITIAL_SIZE

    let edgeGroup = findEdgeGroup(dockview, position)
    if (!edgeGroup) {
        dockview.addEdgeGroup(position, {
            id: `${EDGE_PREFIX}${position}`,
            initialSize,
            minimumSize: EDGE_MIN_SIZE,
            collapsedSize: 35,
            // auto-hide 工具窗模式：收起条点 tab = peek 浮层（不挤占网格），只有浮层的 pin 才展开停靠
            autoHide: true
        })
        edgeGroup = findEdgeGroup(dockview, position)
    }
    if (!edgeGroup) return

    const panels = [...group.panels]
    panels.forEach(panel => {
        panel.params.edgeOrigin = originId
        dockview.moveGroupOrPanel({
            from: { groupId: group.id, panelId: panel.id },
            to: { group: edgeGroup, position: 'center' },
            keepEmptyGroups: true
        })
    })

    // 网格组留一个隐藏的空占位，取消钉住时原位还原
    dockview.setVisible(group, false)
    reRenderActionStates(group)

    // 钉起默认收起（有内容后 edge 组会自己展开，所以搬完再收一次）
    edgeGroup.api.collapse()
    reRenderActionStates(edgeGroup)
    saveConfig(dockview)
}

// 取消钉住。originId 有值时只返还该来源组的面板（VS 语义：按钉起时的分组取消）；
// 不传则返还整条边条（展开态边条上的组级图钉走这条）。
const unpinFromEdge = (group, originId) => {
    const dockview = group.api.accessor
    const position = group.model.location.position
    const panels = [...group.panels]
    if (panels.length == 0) {
        dockview.removeEdgeGroup(position)
        saveConfig(dockview)
        return
    }

    // 边缘组可能收了多个来源组的面板：按 edgeOrigin 分组，各自搬回原来的占位组
    const byOrigin = new Map()
    panels.forEach(panel => {
        const key = panel.params.edgeOrigin || ''
        if (!byOrigin.has(key)) byOrigin.set(key, [])
        byOrigin.get(key).push(panel)
    })

    let fallback
    byOrigin.forEach((list, key) => {
        if (originId !== undefined && key !== originId) return
        let target = key ? dockview.groups.find(g => g.id === key) : null
        if (!target) {
            // 占位组没了（例如换了布局）：在对应侧新建一个网格组兜底，多个来源共用这一个
            if (!fallback) {
                fallback = dockview.addGroup({ direction: position == 'right' ? 'right' : 'left' })
            }
            target = fallback
        }
        if (!target) return
        dockview.setVisible(target, true)
        list.forEach(panel => {
            dockview.moveGroupOrPanel({
                from: { groupId: group.id, panelId: panel.id },
                to: { group: target, position: 'center' },
                keepEmptyGroups: true
            })
            delete panel.params.edgeOrigin
        })
        reRenderActionStates(target)
    })

    if (group.panels.length == 0 && dockview.getEdgeGroup(position)) {
        dockview.removeEdgeGroup(position)
    }
    saveConfig(dockview)
}

const removeActionEvent = group => {
    const actionContainer = group.header.element.querySelector('.dv-right-actions-container');

    EventHandler.off(actionContainer, 'click', '.bb-dockview-control-icon');
}

const toggleLock = (group, actionContainer, isLock, persist = true) => {
    group.locked = isLock ? 'no-drop-target' : isLock
    group.panels.forEach(panel => panel.params.isLock = isLock);
    if (isLock) {
        actionContainer.classList.add('bb-lock')
    }
    else {
        actionContainer.classList.remove('bb-lock')
    }
    if (persist) {
        saveConfig(group.api.accessor)
    }
}

const setGroupMaximizeClass = (group, maximized) => {
    const actionContainer = group.header.element.querySelector('.dv-right-actions-container');
    actionContainer?.classList.toggle('bb-maximize', maximized);
    group.element.parentElement?.classList.toggle('bb-maximize', maximized);
}

const onMaximizedGroupChange = event => {
    const dockview = event.group.api.accessor;
    dockview.groups.forEach(group => {
        if (group.model.location.type === 'grid') {
            setGroupMaximizeClass(group, false);
        }
    });
    if (event.isMaximized) {
        setGroupMaximizeClass(event.group, true);
    }
}

const toggleFull = (group, maximize) => {
    const dockview = group.api.accessor;
    const type = group.model.location.type;
    if (type == 'edge') return;
    dockview.params.maximizing = true;
    try {
        if (type === 'grid') {
            maximize ? dockview.exitMaximizedGroup() : group.api.maximize();
        }
        else {
            maximize ? floatingExitMaximized(group) : floatingMaximize(group);
            setGroupMaximizeClass(group, !maximize);
        }
    }
    finally {
        dockview.params.maximizing = false;
    }
}

const float = group => {
    if (!canFloat(group)) return;
    const dockview = group.api.accessor
    const width = dockview.width > 500 ? 500 : (dockview.width - 10)
    const height = dockview.height > 460 ? 460 : (dockview.height - 10)
    const left = (dockview.width - width) / 2
    const top = (dockview.height - height) / 2
    const { rect, packup } = group.getParams()
    const floatingGroupRect = rect || {
        width, height: packup?.isPackup ? packup.height : height, position: { left, top }
    }
    dockview.params.maximizing = true;
    try {
        group.api.isMaximized() && group.api.exitMaximized()
    }
    finally {
        dockview.params.maximizing = false;
    }
    const floatingGroup = createFloatingGroup(group, floatingGroupRect)
    saveConfig(dockview)
}

const canFloat = group => {
    if (group.locked) return false;
    // 边缘组是布局结构，官方明确不支持浮动/最大化
    if (group.model.location.type == 'edge') return false;
    const dockview = group.api.accessor;
    const gridGroups = dockview.groups.filter(g => g.panels.length > 0 && g.model.location.type === 'grid')
    if (gridGroups.length <= 1) return false;
    if (group.element.closest('.dv-resize-container')) return
    if (group.element.querySelector('.dv-resize-container')) return
    return true
}

const createFloatingGroup = (group, rect) => {
    const dockview = group.api.accessor
    const floatingGroup = dockview.createGroup({ id: getFloatingId(group.id) });
    observeFloatingGroupLocationChange(floatingGroup)
    const activePanel = group.activePanel
    group.panels.slice(0).forEach((panel, index) => {
        dockview.moveGroupOrPanel({
            from: { groupId: group.id, panelId: panel.id },
            to: { group: floatingGroup, position: 'center', index },
            keepEmptyGroups: true,
        })
    })
    dockview.setVisible(group, false)
    dockview.addFloatingGroup(floatingGroup, { ...rect, skipRemoveGroup: true })
    activePanel.api.setActive()
    const overlay = dockview.floatingGroups.find(fg => fg.group.id == floatingGroup.id).overlay
    observeOverlayChange(overlay, floatingGroup)
    createGroupActions(floatingGroup)
    if (floatingGroup.panels.length == 1) {
        moveAlwaysRenderPanel(floatingGroup.activePanel)
    }
    return floatingGroup
}
const observeOverlayChange = (overlay, group) => {
    overlay.onDidChangeEnd(() => {
        saveConfig(group.api.accessor)
    })
}
const observeFloatingGroupLocationChange = group => {
    const dockview = group.api.accessor
    group.api.onDidLocationChange(e => {
        if (e.location.type == 'grid') {
            setTimeout(() => {
                let originalGroup = dockview.groups.find(g => g.id.split('_')[0] == group.id.split('_')[0])
                if (originalGroup) {
                    dockview.params.reset = true
                    dockview.removeGroup(originalGroup)
                    dockview.params.reset = false
                    group.header.rightActionsContainer.classList.remove('bb-float')
                    group.header.rightActionsContainer.classList.remove('bb-pin')
                    saveConfig(dockview)
                }
            }, 0)
            group.header.rightActionsContainer.classList.add('bb-pin')
        }
    })
}
const getFloatingId = id => {
    const arr = id.split('_')
    return arr.length == 1 ? id + '_floating' : arr[0]
}

const dock = (group, floatType) => {
    if (group.locked) return;
    const dockview = group.api.accessor
    const originGroup = dockview.groups.find(g => g.id.split('_')[0] == group.id.split('_')[0] && g.id != group.id)
    if (!originGroup) return
    dockview.setVisible(originGroup, true)
    originGroup.header.rightActionsContainer.classList.remove('bb-maximize')
    originGroup.element.parentElement.classList.remove('bb-maximize')
    const { rect = {} } = group.getParams()
    const inset = group.element.parentElement.style.inset.split(' ').map(item => isNaN(parseFloat(item)) ? item : parseFloat(item))
    if (!rect.isMaximized) {
        rect.width = group.width + 2;
        rect.height = group.height + 2;
        rect.position = {};
        ;['top', 'right', 'bottom', 'left'].forEach((key, index) => {
            if (typeof inset[index] == 'number') {
                rect.position[key] = inset[index]
            }
        })
    }
    rect.isMaximized = false
    group.setParams({ rect })
    dockview.moveGroup({
        from: { group: group },
        to: { group: originGroup, position: 'center' }
    })
    // originGroup was an empty placeholder while floated; its deferred action buttons need re-rendering now it is filled.
    reRenderActionStates(originGroup)
    saveConfig(dockview)
}

const down = (group, actionContainer) => {
    const parentEle = group.element.parentElement
    const { top, bottom, height } = parentEle.style
    const tabHeight = group.header.element.offsetHeight || 30
    const { packup } = group.getParams();
    if (packup?.isPackup) {
        group.setParams({ packup: { ...packup, isPackup: false } })
        parentEle.style.height = `${packup.height}px`;
        if (top == 'auto') {
            parentEle.style.bottom = parseFloat(bottom) - (packup.height - tabHeight) + 'px'
        }
        actionContainer.classList.add('bb-up');
        group.panels.forEach(panel => panel.view.content.element.classList.remove('bb-overflowHidden'))
    }
    else {
        group.setParams({ packup: { isPackup: true, height: parseFloat(height) } });
        parentEle.style.height = `${tabHeight}px`;
        if (top == 'auto') {
            parentEle.style.bottom = parseFloat(bottom) + (parseFloat(height) - tabHeight) + 'px'
        }
        actionContainer.classList.remove('bb-up')
        group.panels.forEach(panel => panel.view.content.element.classList.add('bb-overflowHidden'))
    }
    saveConfig(group.api.accessor)
}

// 边缘组是布局结构：先逐个关面板（每个都要触发 visibleChanged），再整条摘掉，
// 否则会留下一条没有面板的空边条。官方 removeGroup 没有 edge 分支，这里是统一入口。
const closeEdgeGroup = (dockview, group) => {
    const position = group.model.location.position
    ;[...group.panels].forEach(panel => panel.api.close())
    if (dockview.getEdgeGroup(position)) {
        dockview.removeEdgeGroup(position)
    }
}

const close = group => {
    if (group.locked) return
    const dockview = group.api.accessor
    if (group.model.location.type == 'edge') {
        closeEdgeGroup(dockview, group)
        saveConfig(dockview)
        return
    }
    group.api.close()
}

const floatingMaximize = group => {
    const parentEle = group.element.parentElement
    const { width: maxWidth, height: maxHeight } = group.api.accessor;
    const inset = parentEle.style.inset.split(' ').map(item => isNaN(parseFloat(item)) ? item : parseFloat(item))
    const rect = {
        width: group.width + 2,
        height: group.height + 2,
        isMaximized: true,
        position: {}
    }
        ;['top', 'right', 'bottom', 'left'].forEach((key, index) => {
            if (typeof inset[index] == 'number') {
                rect.position[key] = inset[index]
            }
        })
    group.setParams({ rect })

    parentEle.style.left = 0;
    parentEle.style.top = 0;
    parentEle.style.width = `${maxWidth}px`;
    parentEle.style.height = `${maxHeight}px`;
}

const floatingExitMaximized = group => {
    const parentEle = group.element.parentElement
    const { rect, rect: position } = group.getParams()
    const { top, right, bottom, left } = rect.position

    parentEle.style.inset = [top, right, bottom, left]
        .map(item => typeof item == 'number' ? (item + 'px') : 'auto').join(' ')
    parentEle.style.width = `${rect.width}px`;
    parentEle.style.height = `${rect.height}px`;
    group.setParams({ rect: { ...rect, isMaximized: false } })
}

const setWidth = (observerList) => {
    observerList.forEach(({ target }) => {
        let header, tabsContainer
        if (target.classList.contains('dv-tabs-container')) {
            header = target.parentElement
            tabsContainer = target
        }
        else {
            header = target
            tabsContainer = header.querySelector('.dv-tabs-container')
        }
        let voidWidth = header.querySelector('.dv-void-container').offsetWidth
        let dropdown = header.querySelector('.dv-right-actions-container>.dropdown')
        if (!dropdown) return
        let dropMenu = dropdown.querySelector('.dropdown-menu')
        if (voidWidth === 0) {
            if (tabsContainer.children.length <= 1) return
            const inactiveTabs = header.querySelectorAll('.dv-tabs-container>.dv-inactive-tab')
            const lastTab = inactiveTabs[inactiveTabs.length - 1]
            const aEle = document.createElement('a')
            const liEle = document.createElement('li')
            aEle.className = 'dropdown-item'
            liEle.tabWidth = lastTab.offsetWidth;
            aEle.append(lastTab)
            liEle.append(aEle)
            dropMenu.insertAdjacentElement("afterbegin", liEle)
        }
        else {
            let firstLi = dropMenu.querySelector('li:has(.dv-active-tab)') || dropMenu.children[0]
            if (firstLi) {
                let firstTab = firstLi.querySelector('.dv-tab')
                if (voidWidth > firstLi.tabWidth || tabsContainer.children.length == 0) {
                    firstTab && tabsContainer.append(firstTab)
                    firstLi.remove()
                }
            }
        }
    })
}

export { onAddGroup, addGroupWithPanel, toggleLock, disposeGroup, closeEdgeGroup, observeFloatingGroupLocationChange, observeOverlayChange, onMaximizedGroupChange, unpinFromEdge };
