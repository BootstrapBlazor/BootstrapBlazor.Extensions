import { saveConfig } from "./dockview-config.js";
import { getIcon } from "./dockview-icon.js"

const onAddPanel = panel => {
    updateCloseButton(panel);
    updateTitle(panel);
    observePanelActiveChange(panel)
}

const observePanelActiveChange = panel => {
    panel.api.onDidVisibilityChange(({ isVisible }) => {
        const dockview = panel.accessor;
        if (dockview._isDisposed || dockview.params.maximizing) return;
        const renderer = dockview.params.options.renderer;
        if (renderer === 'onlyWhenVisible' && dockview.params.inited) {
            if (isVisible) {
                const visiblePanels = dockview.groups.map(g => g.activePanel)
                dockview._loadTabs?.fire(visiblePanels.filter(p => Boolean(p)).map(p => p.params.key));
            }
            else {
                movePanelContentToTemplate(panel, false)
            }
        }
    })
}

// 5.x 这里有个 moveAlwaysRenderPanel()：把 always 面板的内容手工搬进 .dv-content-container
// （当年 core 把 always 面板渲染在脱离浮窗的容器里，不搬就不显示）。
// 8.x 改为 .dv-render-overlay + overlayRenderContainer 自行定位，内容始终 connected 且跟随组，
// 手工搬反而会把元素从 overlay 里拽出来、破坏 core 的定位 —— 已删除（见文档 §7.2）。

const onRemovePanel = event => {
    const dockview = event.accessor
    // Data-driven channels (showClose=false) must not enter invisiblePanels, else suppressed by the visible filter
    const isDataChannel = event.params?.showClose === false;
    let invisiblePanel = {
        id: event.id,
        title: event.title,
        component: event.view.contentComponent,
        renderer: event.renderer,
        groupId: event.group.id,
        params: {
            ...event.params,
            currentPosition: {
                width: event.group.element.parentElement.offsetWidth,
                height: event.group.element.parentElement.offsetHeight,
                // offsetTop/Left, not style.top/left which can be 'auto' -> parseFloat NaN -> lost position.
                top: event.group.element.parentElement.offsetTop,
                left: event.group.element.parentElement.offsetLeft
            },
            index: event.group.delPanelIndex
        }
    }
    if (!isDataChannel) {
        saveInvisiblePanel(dockview, invisiblePanel)
    }

    if (event.group.children) {
        event.group.children = event.group.children.filter(p => findPanel(p, event) !== null);
        event.group.children.push({
            id: event.id,
            title: event.title,
            params: event.params
        })
    }
}

const updateCloseButton = panel => {
    const showClose = panel.params.showClose ?? panel.accessor.params.options.showClose;
    const tabEle = panel.view.tab.element
    if (showClose) {
        const closeButton = panel.view.tab._content.nextElementSibling;
        if (closeButton) {
            const closeIcon = getIcon('close', false);
            if (closeIcon) {
                closeButton.replaceChild(closeIcon, closeButton.children[0]);
            }
        }
    }
    else {
        tabEle.classList.add('dv-tab-on')
    }
}

const updateTitle = panel => {
    const tabEle = panel.view.tab.element;
    const contents = [...panel.view.content.element.children];
    const titleElement = contents.find(i => i.classList.contains('bb-dockview-item-title'));
    if (titleElement) {
        tabEle.replaceChild(titleElement, panel.view.tab._content);
    }
    else {
        const titleBarElement = contents.find(i => i.classList.contains('bb-dockview-item-title-icon'));
        if (titleBarElement) {
            titleBarElement.removeAttribute('title');
            tabEle.insertAdjacentElement("afterbegin", titleBarElement);
            panel.titleMenuEle = titleBarElement;
        }
    }
}

export const getRootContent = options => options.content.find(c => c.layoutName === options.layoutName) || options.content[0]
const getPanelsFromOptions = options => {
    const rootContent = getRootContent(options)
    return rootContent ? getPanels(rootContent, options) : []
}

const getPanels = (contentItem, options, parent = {}, panels = []) => {
    if (contentItem.type === 'component') {
        panels.push({
            id: contentItem.id,
            groupId: contentItem.groupId,
            title: contentItem.title,
            renderer: contentItem.renderer || options.renderer,
            tabComponent: contentItem.componentName,
            contentComponent: contentItem.componentName,
            params: { ...contentItem, parentType: parent.type, parentId: parent.id }
        });
    }
    else {
        contentItem.content?.forEach(item => getPanels(item, options, contentItem, panels))
    }
    return panels
}

const findContentFromPanels = (panels, content) => {
    return panels.find((p => p.params.key && p.params.key === content.params.key) || p.id === content.id || p.title === content.title);
}

const saveInvisiblePanel = (dockview, invisiblePanel) => {
    const { invisiblePanels, options } = dockview.params;
    if (!invisiblePanels) return
    invisiblePanels.push(invisiblePanel)
    const timer = setTimeout(() => {
        clearTimeout(timer)
        saveConfig(dockview)
    }, 0);
}

const deleteInvisiblePanel = (dockview, invisiblePanel) => {
    const { invisiblePanels, options } = dockview.params;

    dockview.params.invisiblePanels = invisiblePanels.filter(p => p.params.key !== invisiblePanel.params.key)
    saveConfig(dockview)
}

export const movePanelContentToTemplate = (panel, titleMenu = false) => {
    const dockview = panel.accessor
    if (panel.view.content.element) {
        if (titleMenu && panel.titleMenuEle) {
            panel.view.content.element.append(panel.titleMenuEle)
        }
        if (dockview.params.template) {
            dockview.params.template.append(panel.view.content.element)
        }
    }
}

export { onAddPanel, observePanelActiveChange, onRemovePanel, getPanelsFromOptions, findContentFromPanels, deleteInvisiblePanel };
