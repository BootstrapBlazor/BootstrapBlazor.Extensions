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
    // core 的 fromJSON 清场/回退会直接 removePanel（edge 组尤其），不经过 removeGroup 的归还分支；
    // 这里把内容元素放回 <template>，否则会永久丢失、下次同 key 创建时 appendChild(null)。重复归还幂等。
    if (dockview.params.reset) {
        movePanelContentToTemplate(event, true)
    }
    // Data-driven channels (showClose=false) must not enter invisiblePanels, else suppressed by the visible filter
    const isDataChannel = event.params?.showClose === false;
    // 在钉起的边条组里删除：currentPosition 会是边条（35px）的几何，补加时会把面板还原成一条窄浮窗，
    // 所以这种情况不记位置，仅保留 edgeOrigin（补加时回原占位组）
    const isEdgeGroup = event.group.api.location.type === 'edge';
    const params = { ...event.params };
    if (isEdgeGroup) {
        // params 是浅拷，可能带着"更早在浮窗里关闭时"记下的 currentPosition。边条分支不清掉它，
        // 等这条边条和原占位组都没了再补加时，会被当成合法浮窗几何还原成浮窗（应回网格）。这里显式删掉。
        delete params.currentPosition;
    }
    else {
        // 浮窗组取自己的外壳（.dv-view 的 offsetTop/Left 恒为 0）；grid 组取 .dv-view，
        // 避免嵌套 DockView 时 closest 命中外层浮窗壳。
        const geoEle = event.group.api.location.type === 'floating'
            ? (event.group.element.closest('.dv-resize-container') ?? event.group.element.parentElement)
            : event.group.element.parentElement;
        params.currentPosition = {
            width: geoEle.offsetWidth,
            height: geoEle.offsetHeight,
            // offsetTop/Left, not style.top/left which can be 'auto' -> parseFloat NaN -> lost position.
            top: geoEle.offsetTop,
            left: geoEle.offsetLeft
        };
    }
    params.index = event.group.delPanelIndex;
    let invisiblePanel = {
        id: event.id,
        title: event.title,
        component: event.view.contentComponent,
        renderer: event.renderer,
        groupId: event.group.id,
        params
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
    const { invisiblePanels } = dockview.params;
    if (!invisiblePanels) return
    invisiblePanels.push(invisiblePanel)
    const timer = setTimeout(() => {
        clearTimeout(timer)
        saveConfig(dockview)
    }, 0);
}

const deleteInvisiblePanel = (dockview, invisiblePanel) => {
    const { invisiblePanels } = dockview.params;

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
