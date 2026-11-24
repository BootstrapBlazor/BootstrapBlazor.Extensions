import { DockviewComponent, DockviewGroupPanel, DockviewGroupPanelModel, DockviewEmitter } from "./dockview-core.esm.js"
import { movePanelContentToTemplate } from "./dockview-panel.js"
import { disposeGroup, closeEdgeGroup } from "./dockview-group.js"
import { markFirstVisibleElement } from "./dockview-utils.js"

DockviewComponent.prototype.on = function (eventType, callback) {
    this['_' + eventType] = new DockviewEmitter();
    this['_' + eventType].event(callback)
}

const groupDispose = DockviewGroupPanel.prototype.dispose
DockviewGroupPanel.prototype.dispose = function () {
    disposeGroup(this)
    groupDispose.call(this)
}
DockviewGroupPanel.prototype.getParams = function () {
    return this.activePanel?.params || {}
}

DockviewGroupPanel.prototype.setParams = function (data) {
    Object.keys(data).forEach(key => {
        this.panels.forEach(panel => panel.params[key] = data[key])
    })
}

DockviewGroupPanel.prototype.removePropsOfParams = function (keys) {
    return (keys instanceof Array)
        ? keys.map(key => this.panels.forEach(panel => delete panel.params[key]))
        : typeof keys == 'string' ? this.panels.forEach(panel => delete panel.params[keys]) : false
}

const removeGroup = DockviewComponent.prototype.removeGroup
DockviewComponent.prototype.removeGroup = function (...args) {
    const group = args[0]
    if (this.params.reset) {
        const panels = [...group.panels];
        removeGroup.apply(this, args)
        panels.forEach(panel => {
            movePanelContentToTemplate(panel, true);
        })
        return
    }

    const type = group.api.location.type;
    if (type == 'grid') {
        [...group.panels].forEach(panel => {
            panel.api.close()
        })
        this.setVisible(group, false)
    }
    else if (type == 'edge') {
        // 官方没有 removeGroup 的 edge 分支：走同一套"先关面板、再摘边条"
        closeEdgeGroup(this, group)
        return
    }
    else if (type == 'floating') {
        // Close panels (like the grid path) so each fires _panelVisibleChanged; the last close re-enters empty and removes the group.
        const panels = [...group.panels]
        if (panels.length === 0) {
            return removeGroup.apply(this, args)
        }
        panels.forEach(panel => panel.api.close())
    }
}

const closePanel = DockviewGroupPanelModel.prototype.closePanel;
DockviewGroupPanelModel.prototype.closePanel = function (panel, triggerVisibleChangedCallback = true, moveToTemplate = true) {
    if (!panel.group?.locked) {
        closePanel.call(this, panel);
        if (triggerVisibleChangedCallback) {
            this.accessor._panelVisibleChanged?.fire({ key: panel.params.key, status: false });
        }
        // locked groups keep panels intact — guard moveToTemplate too
        if (moveToTemplate) {
            movePanelContentToTemplate(panel, true);
        }
    }
}

// setVisible 之后维护 first-visible 类（改可见性后"第一个可见视图"可能变了）
const setVisible = DockviewComponent.prototype.setVisible
DockviewComponent.prototype.setVisible = function (...args) {
    setVisible.apply(this, args);
    markFirstVisibleElement(args[0])
}

// 隐藏占位列会在 splitview 里留下"鬼影 sash"（坐标算错，拖它能把 0 宽空列拉出来）。但真实边界
// 那条 sash 必须保持可拖，所以不能按"隐藏组边界"锁（会锁错对象），只能逐条判断 sash 自己的位置：
// 合法 = 缝同时对上某个可见视图的右边界和另一个可见视图的左边界。隐藏视图自身 style.left 不可信
// （钉起路径下被重置成 0），只看可见视图。
const syncHiddenSash = dockview => {
    // 按 splitview 去重：一个 splitview 可能被多个 group 反查到
    const splitviews = []
    const seen = new Set()
    dockview.groups.forEach(group => {
        const branch = getBranchByGroup(group)
        const sv = branch?.splitview
        if (!sv || seen.has(sv)) return
        seen.add(sv)
        splitviews.push({
            sv,
            horizontal: branch.orientation === 'HORIZONTAL',
            fallbackViewContainer: group.element.parentElement?.parentElement
        })
    })

    splitviews.forEach(({ sv, horizontal, fallbackViewContainer }) => {
        // .dv-sash-container 与 .dv-view-container 是 splitview 下的同级兄弟（splitview.ts:301-302），
        // 从任一条 sash 往上两级就是 splitview 根
        const splitviewRoot = sv.sashes?.[0]?.container?.parentElement?.parentElement
        // sashes 为空时（只剩 0~1 个可见视图）无法从 sash 反查容器，用 group 的 .dv-view-container 兜底，
        // 否则残留的锁定标记会清不掉（表现为"取消钉起后那条线还是拖不动"）
        const viewContainer = splitviewRoot?.querySelector(':scope > .dv-view-container')
            ?? fallbackViewContainer
        if (!viewContainer) return
        const views = [...viewContainer.children].filter(el => el.classList.contains('dv-view'))
        // 没有隐藏视图时：只需确保没有残留标记（取消钉起后必须恢复可拖），不做判定
        const hasHidden = views.some(el => !el.classList.contains('visible'))

        const coord = el => parseFloat(horizontal ? el.style.left : el.style.top)
        const size = el => parseFloat(horizontal ? el.style.width : el.style.height)
        const visibles = views
            .filter(el => el.classList.contains('visible'))
            .map(el => ({ left: coord(el), size: size(el) }))
            .filter(v => Number.isFinite(v.left) && Number.isFinite(v.size))

        sv.sashes?.forEach(sash => {
            const el = sash.container
            if (!hasHidden) {
                el.classList.remove('bb-sash-locked')
                return
            }
            const raw = parseFloat(horizontal ? el.style.left : el.style.top)
            // layout 未写完坐标：保持上一次状态，等下一轮（先 remove 再 return 会造成"闪一下可拖"）
            if (!Number.isFinite(raw)) return
            const boundary = raw + 2                    // sash 宽 4px、居中在缝上
            const leftOk = visibles.some(v => Math.abs(v.left + v.size - boundary) <= 3)
            const rightOk = visibles.some(v => Math.abs(v.left - boundary) <= 3)
            // toggle(force) 幂等：拖拽中每帧都会走到这里，避免无意义的 classList 写入
            el.classList.toggle('bb-sash-locked', !(leftOk && rightOk))
        })
    })
}

function getBranchByGroup(group) {
    const groupEle = group.element
    const root = group.api.accessor.gridview.root
    return getBranch(root, groupEle)
}
function getBranch(branchNode, groupEle) {
    let sashes
    if (branchNode.children?.find(bn => bn.element === groupEle)) {
        return branchNode
    }
    else {
        for (let bn of branchNode.children.filter(child => child.children)) {
            sashes = getBranch(bn, groupEle)
            if (sashes) return sashes
        }
    }
}

export { syncHiddenSash }
