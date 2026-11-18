import { DockviewComponent } from "./dockview-core.esm.js"
import { DockviewPanelContent } from "./dockview-content.js"
import { onAddGroup, addGroupWithPanel, toggleLock, observeFloatingGroupLocationChange, observeOverlayChange, onMaximizedGroupChange } from "./dockview-group.js"
import { onAddPanel, onRemovePanel, getPanelsFromOptions, findContentFromPanels } from "./dockview-panel.js"
import { initDockviewFromConfig, saveConfig } from './dockview-config.js'
import './dockview-extensions.js'

const cerateDockview = (el, options) => {
    const theme = options.theme || "dockview-theme-light";
    const template = el.querySelector('template');
    options.renderer ??= 'onlyWhenVisible';
    const dockview = new DockviewComponent(el, {
        parentElement: el,
        theme: {
            name: "bb-dockview",
            className: theme,
            dndOverlayMounting: 'absolute',
            dndPanelOverlay: 'group'
        },
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
    dockview.floatingGroups.forEach(fg => {
        observeOverlayChange(fg.overlay, fg.group)
        observeFloatingGroupLocationChange(fg.group)
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

    dockview.onDidLayoutFromJSON(() => {
        dockview.groups.forEach(group => {
            markFirstVisibleElement(group);
        })
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
export const markFirstVisibleElement = group => {
    if (!group) return
    const viewContainerEle = group.element.parentElement.parentElement;
    if (!viewContainerEle) return
    const className = 'first-visible';
    [...viewContainerEle.children].forEach(ele => {
        if (ele.classList.contains(className)) {
            ele.classList.remove(className)
        }
    })
    viewContainerEle.querySelector('.visible')?.classList.add(className);
}

export { cerateDockview };
