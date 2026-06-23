import { DockviewComponent } from "./dockview-core.esm.js"
import { DockviewPanelContent } from "./dockview-content.js"
import { onAddGroup, addGroupWithPanel, toggleLock, observeFloatingGroupLocationChange, observeOverlayChange, createDrawerHandle, onMaximizedGroupChange } from "./dockview-group.js"
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
        disableTabsOverflowList: true,
        createComponent: option => new DockviewPanelContent(option)
    });
    guardCollapsedSaveProportions(dockview);
    initDockview(dockview, options, template);
    return dockview;
}

// Fix "groups evenly split after refresh": while collapsed (size 0) skip overwriting existing
// proportions, else saveProportions freezes the collapsed equal-minimums as the split. _proportions is
// undefined only on the first deserialize save — let that through. Upstream fix: add `size > 0` to
// dockview-core's Splitview.saveProportions, then drop this patch.
const guardCollapsedSaveProportions = dockview => {
    const splitview = dockview.gridview?.root?.splitview;
    if (!splitview) return;
    const proto = Object.getPrototypeOf(splitview);
    if (proto.__bbCollapseGuard) return;          // Splitview.prototype is shared by all instances; patch once
    proto.__bbCollapseGuard = true;
    const original = proto.saveProportions;
    proto.saveProportions = function () {
        if (this.size === 0 && this._proportions) return;
        original.call(this);
    };
}

const initDockview = (dockview, options, template) => {
    dockview.params = { panels: [], options, template, observer: null };
    dockview.init = function (options) {
        initDockviewFromConfig(this, options);
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
            dockview.reset(options);
        }
        else {
            toggleComponent(dockview, options);
        }
    }

    dockview.reset = options => {
        dockview.params.inited = false;
        dockview.params.reset = true;
        dockview.init(options);
        dockview.params.reset = false;
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
        const handler = setTimeout(() => {
            clearTimeout(handler);
            if (dockview._isDisposed) {
                dockview = null;
                return;
            }
            const panels = dockview.panels;
            const groups = dockview.groups;

            panels.forEach(panel => {
                const visible = panel.params.visible
                if (visible) {
                    dockview._panelVisibleChanged?.fire({ key: panel.params.key, status: true });
                }
                else {
                    panel.group.model.closePanel(panel)
                }
            })

            if (options.renderer === 'onlyWhenVisible') {
                const visiblePanels = groups.filter(g => g.isVisible).map(g => g.panels.find(p => p.params.isActive) || g.panels.find(p => p.api.isVisible))
                dockview._loadTabs?.fire(visiblePanels.filter(p => p.params.key).map(p => p.params.key));
            }
            const { floatingGroups } = dockview.params
            dockview.floatingGroups.forEach(fg => {
                const { top, right, bottom, left } = floatingGroups.find(g => g.data.id == fg.group.id).position

                fg.group.element.parentElement.style.inset = [top, right, bottom, left]
                    .map(item => typeof item == 'number' ? (item + 'px') : 'auto').join(' ')

                observeOverlayChange(fg.overlay, fg.group)
                const { floatType, direction } = fg.group.getParams();
                if (floatType == 'drawer') {
                    createDrawerHandle(fg.group, direction == 'right')
                }
                observeFloatingGroupLocationChange(fg.group)
            })

            dockview.groups.forEach(group => {
                observeGroup(group)
            })
            dockview.element.querySelector('&>.dv-dockview>.dv-branch-node')?.addEventListener('click', function (e) {
                this.parentElement.querySelectorAll('&>.dv-resize-container-drawer, &>.dv-render-overlay-float-drawer')?.forEach(item => {
                    item.classList.remove('active')
                })
                this.closest('.bb-dockview').querySelectorAll('&>.bb-dockview-aside>.bb-dockview-aside-button')?.forEach(item => {
                    item.classList.remove('active')
                })
            })
            dockview.params.inited = true;
            dockview._initialized?.fire();
        }, 0);
    })

    dockview.gridview.onDidChange(event => {
        dockview._groupSizeChanged.fire()
        saveConfig(dockview)
    })

    dockview._rootDropTarget.onDrop(() => {
        saveConfig(dockview)
    })

    dockview.init(options);
}

export const observeGroup = (group) => {
    const dockview = group.api.accessor
    if (dockview.params.observer === null) {
        dockview.params.observer = new ResizeObserver(observerList => requestAnimationFrame(() => resizeObserverHandle(observerList, dockview)));
    }
    dockview.params.observer.observe(group.header.element)
    dockview.params.observer.observe(group.header.tabs._tabsList)
}

const resizeObserverHandle = (observerList, dockview) => {
    observerList.forEach(({ target }) => {
        setWidth(target, dockview)
    })
}
const setWidth = (target, dockview) => {
    let header, tabsContainer
    if (target.classList.contains('dv-tabs-container')) {
        header = target.parentElement.parentElement
        tabsContainer = target
    }
    else {
        header = target
        tabsContainer = header.querySelector('.dv-tabs-container')
    }
    if (header.offsetWidth == 0) return
    let voidWidth = header.querySelector('.dv-void-container').offsetWidth
    let dropdown = header.querySelector('.dv-right-actions-container>.dropdown')
    if (!dropdown) return
    let dropMenu = dropdown.querySelector('.dropdown-menu')
    // `shrinking` (a strict width drop) gates the active-panel switch below — it must NOT fire during the
    // transient expand a group goes through when a hidden view becomes visible (would switch + blank it).
    const group = dockview.params.inited ? dockview.groups.find(g => g.element === header.parentElement) : null
    const shrinking = group && group._lastHeaderWidth !== undefined && header.offsetWidth < group._lastHeaderWidth
    if (group) group._lastHeaderWidth = header.offsetWidth

    if (voidWidth === 0) {
        if (tabsContainer.children.length <= 1) return
        // On shrink, if the active tab would overflow, switch to the first panel before tucking it away.
        if (shrinking) {
            const activeTab = tabsContainer.querySelector('.dv-tab.dv-active-tab')
            if (activeTab && activeTab.offsetLeft + activeTab.offsetWidth > tabsContainer.offsetWidth) {
                group.panels[0]?.api.setActive()
            }
        }
        const tabs = tabsContainer.querySelectorAll('.dv-tab')
        for (let i = tabs.length - 1; i >= 0; i--) {
            const lastTab = tabs[i]
            if (lastTab.offsetLeft + lastTab.offsetWidth > tabsContainer.offsetWidth) {
                const aEle = document.createElement('a')
                const liEle = document.createElement('li')
                aEle.className = 'dropdown-item'
                liEle.tabWidth = lastTab.offsetWidth;
                aEle.append(lastTab)
                liEle.append(aEle)
                dropMenu.insertAdjacentElement("afterbegin", liEle)
            }
        }
    }
    else {
        const firstLi = dropMenu.children[0]
        if (firstLi) {
            const firstTab = firstLi.querySelector('.dv-tab')
            if (voidWidth > firstLi.tabWidth || tabsContainer.children.length == 0) {
                firstTab && tabsContainer.append(firstTab)
                firstLi.remove()
            }
        }
    }
    // Fallback: keep an active panel when the group has none (e.g. the active one was closed).
    if (group && !group.activePanel) {
        group.panels[0]?.api.setActive()
    }
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
