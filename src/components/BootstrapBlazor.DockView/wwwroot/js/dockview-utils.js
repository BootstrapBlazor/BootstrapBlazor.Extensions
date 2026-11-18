import { DockviewComponent } from "./dockview-core.esm.js"
import { DockviewPanelContent } from "./dockview-content.js"
import { onAddGroup, addGroupWithPanel, toggleLock, observeFloatingGroupLocationChange, observeOverlayChange, onMaximizedGroupChange } from "./dockview-group.js"
import { onAddPanel, onRemovePanel, getPanelsFromOptions, findContentFromPanels } from "./dockview-panel.js"
import { initDockviewFromConfig, saveConfig } from './dockview-config.js'
import './dockview-extensions.js'

// 浮窗拖拽护栏：可以拖出当前 dockview（嵌套是常态用法），但不能拖出浏览器视口。
// core 的 floatingGroupBounds 只能夹到容器，必须放开（负大值 = 不夹）；视口约束在公开钩子
// transformFloatingGroupDrag 里做（每帧在 setBounds 前跑，返回值覆盖 proposed 位置）。
const viewportSize = () => ({
    width: document.documentElement.clientWidth || window.innerWidth || 0,
    height: document.documentElement.clientHeight || window.innerHeight || 0
})
const keepFloatingInsideViewport = ({ group, proposed }) => {
    const shell = group.element?.closest('.dv-resize-container')
    const host = shell?.parentElement
    if (!host || !(proposed.width > 0) || !(proposed.height > 0)) return undefined
    const view = viewportSize()
    if (!(view.width > 0) || !(view.height > 0)) return undefined
    // 浮层坐标以宿主为原点，先量出宿主在视口里的位置再换算
    const rect = host.getBoundingClientRect()
    const minLeft = -rect.left
    const minTop = -rect.top
    const maxLeft = Math.max(minLeft, view.width - proposed.width - rect.left)
    const maxTop = Math.max(minTop, view.height - proposed.height - rect.top)
    const left = Math.min(Math.max(proposed.left, minLeft), maxLeft)
    const top = Math.min(Math.max(proposed.top, minTop), maxTop)
    if (left === proposed.left && top === proposed.top) return undefined
    return { left, top }
}

const cerateDockview = (el, options) => {
    const theme = options.theme || "dockview-theme-light";
    const template = el.querySelector('template');
    // C# 的 Renderer 枚举经 [JsonEnumConverter(true)] 序列化成 camelCase，默认值被 JsonIgnore 省略（undefined）。
    // 必须显式落成 onlyWhenVisible：core 的 ?? 兜底只作用于 defaultRenderer，而 postLayoutInit /
    // observePanelActiveChange 都是精确比较 'onlyWhenVisible'，undefined 会让按需加载断链。
    options.renderer ??= 'onlyWhenVisible';
    const dockview = new DockviewComponent(el, {
        parentElement: el,
        defaultRenderer: options.renderer,
        theme: {
            name: "bb-dockview",
            className: theme,
            dndOverlayMounting: 'absolute',
            dndPanelOverlay: 'group'
        },
        // 容器方向放开：允许拖出当前 dockview（嵌套场景必需，见 keepFloatingInsideViewport 注释）。
        // 注意不能传 0 或正数 —— 但凡给个非负值，core 就会把窗口夹在容器内，等于禁止出界。
        floatingGroupBounds: {
            minimumWidthWithinViewport: -10000,
            minimumHeightWithinViewport: -10000
        },
        // 视口方向由这里兜住：不允许整窗出浏览器视口
        transformFloatingGroupDrag: keepFloatingInsideViewport,
        // 8.x 默认会给浮窗加一条 22px 的空 FloatingTitleBar（纯拖拽条、无文字）；
        // 'tabbar' 恢复旧行为：不渲染该条，拖 tab 栏空白处移动窗口
        floatingGroupDragHandle: 'tabbar',
        createComponent: option => new DockviewPanelContent(option)
    });
    guardCollapsedSaveProportions(dockview);
    guardMaximizeExit(dockview);
    initDockview(dockview, options, template);
    return dockview;
}

const guardMaximizeExit = dockview => {
    const gridview = dockview.gridview;
    if (!gridview) return;
    const proto = Object.getPrototypeOf(gridview);
    if (proto.__bbMaximizeExitGuard) return;
    proto.__bbMaximizeExitGuard = true;
    const original = proto.exitMaximizedView;
    proto.exitMaximizedView = function () {
        const dv = this._maximizedNode?.leaf?.view?.api?.accessor;
        if (!dv) return original.call(this);
        const prev = dv.params.maximizing;
        dv.params.maximizing = true;
        try { return original.call(this); }
        finally { dv.params.maximizing = prev; }
    };
}

const guardCollapsedSaveProportions = dockview => {
    const splitview = dockview.gridview?.root?.splitview;
    if (!splitview) return;
    const proto = Object.getPrototypeOf(splitview);
    if (proto.__bbCollapseGuard) return;
    proto.__bbCollapseGuard = true;
    const original = proto.saveProportions;
    proto.saveProportions = function () {
        if (this.size === 0 && this._proportions) return;
        original.call(this);
    };
}

const postLayoutInit = (dockview, options) => {
    if (dockview._isDisposed) {
        return
    }
    // 浮窗位置由 core 自己恢复（deserializeFloatingWindows → addFloatingGroup，getAnchoredBox 连锚定边
    // 一起还原；8.9.0 的 setBounds 还有 hasLayout 早退，rect 为 0×0 时不反写位置）。5.1.0 时代必须在这里
    // 再贴一次 style.inset 的两个理由都已修好，留着反而绕过 Overlay 的锚定归一化/clamp。
    dockview.floatingGroups.forEach(fg => {
        observeOverlayChange(fg.overlay, fg.group)
        observeFloatingGroupLocationChange(fg.group)
    })

    // 刷新恢复（fromJSON）不走组件级 setVisible ⇒ first-visible 要补一遍，否则隐藏占位列在最左时，
    // 右侧可见视图会多一条前导分隔线。fromJSON 在 initDockviewFromConfig 里同步执行完（事件已 fire），
    // 订阅只能接住"运行时再次 fromJSON"，所以先直接补一次。
    dockview.groups.forEach(group => markFirstVisibleElement(group))
    dockview.onDidLayoutFromJSON(() => {
        dockview.groups.forEach(group => markFirstVisibleElement(group))
    })

    dockview.params.inited = true;

    queueMicrotask(() => {
        if (dockview._isDisposed) {
            return
        }
        dockview.params.invisiblePanels?.forEach(p => {
            dockview._panelVisibleChanged?.fire({ key: p.params.key, status: false });
        })
        dockview.panels.forEach(panel => {
            if (panel.params.visible) {
                dockview._panelVisibleChanged?.fire({ key: panel.params.key, status: true });
            }
            else {
                panel.group.model.closePanel(panel)
            }
        })

        if (options.renderer === 'onlyWhenVisible') {
            const visiblePanels = dockview.groups.filter(g => g.isVisible).map(g => g.activePanel)
            dockview._loadTabs?.fire(visiblePanels.filter(p => p && p.params.key).map(p => p.params.key));
        }
        dockview._initialized?.fire();
    })
}

const initDockview = (dockview, options, template) => {
    dockview.params = { panels: [], options, template, layoutSeq: 0 };
    dockview.init = function (options) {
        initDockviewFromConfig(this, options);
        postLayoutInit(this, options);
    }

    dockview.switchTheme = theme => {
        const themeName = `dockview-theme-${theme}`;
        if (dockview.options.theme.className !== themeName) {
            dockview.options.theme.className = themeName;
            dockview.updateTheme();
        }
    }

    dockview.update = options => {
        const oldOptions = dockview.params.options;
        dockview.params.options = { ...options, renderer: options.renderer || 'onlyWhenVisible' };

        if (oldOptions.lock !== options.lock) {
            toggleGroupLock(dockview, options);
        }
        if (oldOptions.theme !== options.theme) {
            dockview.updateTheme();
        }

        if (options.layoutConfig) {
            dockview.reset(dockview.params.options);
        }
        else {
            toggleComponent(dockview, options);
        }
    }

    dockview.reset = options => {
        dockview.params.inited = false;
        dockview.params.reset = true;
        dockview.params.layoutSeq++;
        try {
            dockview.init(options);
        }
        finally {
            dockview.params.reset = false;
        }
    }

    dockview.switchLayout = options => {
        dockview.params.options = { ...options, renderer: options.renderer || 'onlyWhenVisible' };
        dockview.reset(dockview.params.options);
    }

    dockview.onDidRemovePanel(onRemovePanel);

    dockview.onDidAddPanel(onAddPanel);

    dockview.onDidAddGroup(onAddGroup);

    dockview.onDidMaximizedGroupChange(onMaximizedGroupChange);

    dockview.onWillDragPanel(event => {
        if (event.panel.group.locked) {
            event.nativeEvent.preventDefault()
        }
    })

    dockview.onWillDragGroup(event => {
        if (event.group.locked) {
            event.nativeEvent.preventDefault()
        }
    })

    dockview.gridview.onDidChange(event => {
        dockview._groupSizeChanged.fire()
        saveConfig(dockview)
    })

    dockview.onDidActivePanelChange(() => {
        saveConfig(dockview)
    })

    let movePanelTimer = null
    dockview.onDidMovePanel(() => {
        if (movePanelTimer) return
        movePanelTimer = setTimeout(() => {
            movePanelTimer = null
            if (dockview._isDisposed) return
            saveConfig(dockview)
        }, 0)
    })

    // 8.x 起 rootDropTarget 移入 rootDropTargetService（模块注册表），事件仍是 onDrop
    dockview._rootDropTargetService?.onDrop(() => {
        saveConfig(dockview)
    })

    dockview.init(options);
}

const cleanUndefined = (obj) => Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v != null)
);

const toggleComponent = (dockview, options) => {
    const optionsPanels = getPanelsFromOptions(options);
    const panels = optionsPanels.filter(p => p.params.visible);
    const localPanels = dockview.panels;
    panels.forEach(p => {
        const pan = findContentFromPanels(localPanels, p);
        if (pan === void 0) {
            const existingPanel = findContentFromPanels(dockview.params.invisiblePanels, p);
            const panel = existingPanel ?
                {
                    ...existingPanel,
                    ...cleanUndefined(p),
                    params: { ...existingPanel.params, ...cleanUndefined(p.params) }
                } : p;
            const groupPanels = panels.filter(p1 => p1.params.parentId == p.params.parentId);
            let indexOfOptions = groupPanels.findIndex(p => p.params.key == panel?.params.key);
            indexOfOptions = indexOfOptions == -1 ? 0 : indexOfOptions;
            addGroupWithPanel(dockview, panel, panels, indexOfOptions);
        }
        else {
            if (pan.title !== p.title) {
                pan.setTitle(p.title)
            }
            pan._params = {
                ...pan.params,
                ...p.params
            }
        }
    })

    localPanels.forEach(item => {
        let pan = findContentFromPanels(panels, item);
        if (pan === void 0) {
            item.group.delPanelIndex = item.group.panels.findIndex(p => p.params.key == item.params.key);
            const group = item.group;

            const moveToTemplate = optionsPanels.some(p => p.params.key == item.params.key);
            group.model.closePanel(item, false, moveToTemplate);

            if (group.panels.length === 0) {
                dockview.setVisible(group, false)
            }
        }
    })
}

const toggleGroupLock = (dockview, options) => {
    dockview.groups.forEach(group => {
        toggleLock(group, group.header.rightActionsContainer, options.lock)
    })
}
// 标记"当前视图容器里第一个可见的 .dv-view"，CSS 用它去掉前导分隔线：隐藏占位列宽 0 后，右侧第一个
// 可见视图在 DOM 里已不是首个子节点，core 仍给它画 ::before。但 [可见][隐藏][可见] 里后一个可见视图的
// ::before 正是两侧面板之间的线、必须保留 —— 只能按"是不是第一个可见"判定，不能用相邻兄弟近似。
export const markFirstVisibleElement = group => {
    if (!group) return
    const viewContainerEle = group.element.parentElement?.parentElement;
    // 只认 splitview 的视图容器：边条组不在 splitview 里，它的 parentElement.parentElement 会落到更外层，
    // 在那里 querySelector('.visible') 是瞎猜。CSS 规则都限定在 .dv-view-container > .dv-view，打错无影响，
    // 但没必要，直接不处理。
    if (!viewContainerEle?.classList.contains('dv-view-container')) return
    const className = 'first-visible';
    [...viewContainerEle.children].forEach(ele => {
        if (ele.classList.contains(className)) {
            ele.classList.remove(className)
        }
    })
    viewContainerEle.querySelector('.visible')?.classList.add(className);
}

export { cerateDockview };
