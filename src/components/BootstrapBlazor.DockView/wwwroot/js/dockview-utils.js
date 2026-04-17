import { DockviewComponent } from "./dockview-core.esm.js"
import { DockviewPanelContent } from "./dockview-content.js"
import { onAddGroup, addGroupWithPanel, toggleLock, observeFloatingGroupLocationChange, observeOverlayChange, createDrawerHandle } from "./dockview-group.js"
import { onAddPanel, onRemovePanel, getPanelsFromOptions, findContentFromPanels } from "./dockview-panel.js"
import { getConfig, reloadFromConfig, loadPanelsFromLocalstorage, saveConfig } from './dockview-config.js'
import './dockview-extensions.js'

const cerateDockview = (el, options) => {
    const theme = options.theme || "dockview-theme-light";
    const template = el.querySelector('template');
    options.renderer ??= 'onlyWhenVisible'; // onlyWhenVisible | partial | always
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
    initDockview(dockview, options, template);
    dockview.firstLoad = true;
    dockview.init();
    return dockview;
}

const initDockview = (dockview, options, template) => {
    dockview.params = { panels: [], options, template, observer: null };
    loadPanelsFromLocalstorage(dockview);

    dockview.init = () => {
        const config = getConfig(options);
        dockview.params.floatingGroups = config.floatingGroups || []
        dockview.fromJSON(config);
        // window.dockview = dockview;
    }

    dockview.switchTheme = theme => {
        const themeName = `dockview-theme-${theme}`;
        if (dockview.options.theme.className !== themeName) {
            dockview.options.theme.className = themeName;
            dockview.updateTheme();
        }
    }

    dockview.update = options => {
        dockview.isUpdating = true;
        if (dockview.params.options.lock !== options.lock) {
            dockview.params.options.lock = options.lock;
            toggleGroupLock(dockview, options);
        }
        if (dockview.options.theme.className !== options.theme) {
            dockview.options.theme.className = options.theme;
            dockview.updateTheme();
        }
        if (options.layoutConfig) {
            reloadFromConfig(dockview, options);
        }
        else {
            toggleComponent(dockview, options);
        }
        dockview.firstLoad = false;
        dockview.isUpdating = false;
    }

    dockview.reset = options => {
        reloadFromConfig(dockview, options)
    }

    dockview.onDidRemovePanel(onRemovePanel);

    dockview.onDidAddPanel(onAddPanel);

    dockview.onDidAddGroup(onAddGroup);

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
        const handler = setTimeout(() => {
            clearTimeout(handler);
            const panels = dockview.panels;
            const groups = dockview.groups;
            const delPanelsStr = localStorage.getItem(dockview.params.options.localStorageKey + '-panels');
            const delPanels = delPanelsStr && JSON.parse(delPanelsStr) || [];

            if (options.enableLocalStorage) {
                panels.forEach(panel => {
                    const visible = panel.params.visible
                    if (!visible) {
                        panel.group.model.closePanel(panel)
                    }
                    dockview._panelVisibleChanged?.fire({ key: panel.params.key, status: visible });
                })
                delPanels.forEach(panel => {
                    dockview._panelVisibleChanged?.fire({ key: panel.params.key, status: false });
                })
            }

            if (options.renderer === 'onlyWhenVisible') {
                const visiblePanels = groups.filter(g => g.isVisible).map(g => g.panels.find(p => p.params.isActive) || g.panels.find(p => p.api.isVisible))
                dockview._loadTabs?.fire(visiblePanels.filter(p => Boolean(p)).map(p => p.params.key));
            }
            if (options.renderer === 'always') {
                dockview._loadTabs?.fire(dockview.panels.map(p => p.params.key));
            }
            const { floatingGroups } = dockview.params
            dockview.floatingGroups.forEach(fg => {
                const { top, right, bottom, left } = floatingGroups.find(g => g.data.id == fg.group.id).position

                fg.group.element.parentElement.style.inset = [top, right, bottom, left]
                    .map(item => typeof item == 'number' ? (item + 'px') : 'auto').join(' ')

                // fg.overlay.onDidChangeEnd(e => {
                //     saveConfig(dockview);
                // })
                observeOverlayChange(fg.overlay, fg.group)
                const { floatType, direction } = fg.group.getParams();
                if (floatType == 'drawer') {
                    createDrawerHandle(fg.group, direction == 'right')
                }
                else {
                    const autoHideBtn = fg.group.header.rightActionsContainer.querySelector('.bb-dockview-control-icon-autohide')
                    if (autoHideBtn) {
                        // autoHideBtn.style.display = 'none'
                    }
                }
                observeFloatingGroupLocationChange(fg.group)
            })

            dockview.groups.forEach(group => {
                observeGroup(group)
            })
            dockview.element.querySelector('&>.dv-dockview>.dv-branch-node').addEventListener('click', function (e) {
                this.parentElement.querySelectorAll('&>.dv-resize-container-drawer, &>.dv-render-overlay-float-drawer').forEach(item => {
                    item.classList.remove('active')
                })
                this.closest('.bb-dockview').querySelectorAll('&>.bb-dockview-aside>.bb-dockview-aside-button').forEach(item => {
                    item.classList.remove('active')
                })
            })
            dockview._inited = true;
            dockview._initialized?.fire();
        }, 100);
    })

    dockview.gridview.onDidChange(event => {
        dockview._groupSizeChanged.fire()
        saveConfig(dockview)
    })

    dockview._rootDropTarget.onDrop(() => {
        saveConfig(dockview)
    })

}

export const observeGroup = (group) => {
    const dockview = group.api.accessor
    if (dockview.params.observer === null) {
        dockview.params.observer = new ResizeObserver(observerList => requestAnimationFrame(() => resizeObserverHandle(observerList, dockview)));
    }
    dockview.params.observer.observe(group.header.element)
    dockview.params.observer.observe(group.header.tabs._tabsList)
    for (let panel of group.panels) {
        if (panel.params.isActive) {
            panel.api.setActive()
            break
        }
    }
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
    if (voidWidth === 0) {
        if (tabsContainer.children.length <= 1) return
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
    if (dockview._inited && [...tabsContainer.children].every(tab => tab.classList.contains('dv-inactive-tab'))) {
        const group = dockview.groups.find(g => g.element === header.parentElement)
        group.panels[0] && group.panels[0].api.setActive()
    }
}

const toggleComponent = (dockview, options) => {
    const optionsPanels = getPanelsFromOptions(options);
    const panels = optionsPanels.filter(p => p.params.visible);
    const localPanels = dockview.panels;
    panels.forEach(p => {
        const pan = findContentFromPanels(localPanels, p);
        if (pan === void 0) {
            const panel = findContentFromPanels(dockview.params.panels, p) || p;
            panel.params = { ...panel.params, ...p.params };
            const groupPanels = panels.filter(p1 => p1.params.parentId == p.params.parentId);
            let indexOfOptions = groupPanels.findIndex(p => p.params.key == panel?.params.key);
            indexOfOptions = indexOfOptions == -1 ? 0 : indexOfOptions;
            // const index = panel && panel.params.index
            addGroupWithPanel(dockview, panel, panels, indexOfOptions);
        }
        else {
            if ( pan.title !== p.title ) {
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
            group.model.closePanel(item)
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

export { cerateDockview };
