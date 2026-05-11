import { getPanelsFromOptions, findContentFromPanels } from "./dockview-panel.js"

const initDockviewFromConfig = (dockview, options) => {
    const { layoutConfig, enableLocalStorage } = options;
    let config = null;
    if (layoutConfig) {
        try {
            config = JSON.parse(layoutConfig);
        }
        catch (error) {
            console.error('Invalid layoutConfig JSON string:', error);
        }
    }
    else if (enableLocalStorage) {
        try {
            let key = `${options.localStorageKey}-layout`;
            const layoutJson = localStorage.getItem(key);
            if (layoutJson) {
                config = JSON.parse(layoutJson);
            }
            else {
                key = `${options.localStorageKey}`;
                const layout = JSON.parse(localStorage.getItem(key));
                if (layout) {
                    localStorage.removeItem(key);
                    key = `${options.localStorageKey}-panels`;
                    const invisiblePanels = JSON.parse(localStorage.getItem(key));
                    if (invisiblePanels) {
                        localStorage.removeItem(key);
                    }
                    config = {
                        layout,
                        invisiblePanels: invisiblePanels || []
                    }
                }
            }
        }
        catch (error) {
            console.error('Invalid localStorage JSON string:', error);
        }
    }

    if (config) {
        try {
            renewConfigFromOptions(config, options);
            const { layout, invisiblePanels } = config;
            dockview.fromJSON(layout);
            dockview.params.invisiblePanels = invisiblePanels || [];
            dockview.params.floatingGroups = layout.floatingGroups || []
        }
        catch (error) {
            console.error('Invalid localStorage JSON string:', error);
            dockview.fromJSON(getConfigFromContent(options));
        }
    }
    else {
        dockview.fromJSON(getConfigFromContent(options));
        dockview.params.invisiblePanels = [];
    }

}

const getConfigFromContent = options => {
    const { width, height } = { width: 800, height: 600 };
    const getGroupId = getGroupIdFunc()
    options = filterEmptyContent(options)
    const panels = {}, rootType = options.content[0].type
    const orientation = rootType === 'column' ? 'VERTICAL' : 'HORIZONTAL';
    const root = getTree(options.content[0], { width, height, orientation }, options, panels, getGroupId, options)
    return {
        activeGroup: '1',
        grid: { width, height, orientation, root },
        panels
    }
}

const renewConfigFromOptions = (config, options) => {
    const {layout, invisiblePanels} = config
    removeEmptyGridViews(layout, options, invisiblePanels)
    const optionPanels = getPanelsFromOptions(options)
    const localPanels = Object.values(layout.panels)
    optionPanels.forEach(optionPanel => {
        const panel = localPanels.find(localPanel => localPanel.params.key == optionPanel.params.key)
        if (panel) {
            optionPanel.params = {
                ...panel.params,
                ...optionPanel.params,
                visible: panel.params.visible
            }
            optionPanel.id = panel.id
            layout.panels[panel.id] = optionPanel
        }
        else {
            const delPanels = invisiblePanels;
            if (delPanels?.find(delPanel => delPanel.params.key == optionPanel.params.key)) return
            let index = optionPanels.findIndex(item => item.id == optionPanel.id)
            let brotherPanel, brotherType
            if (index == 0) {
                brotherPanel = optionPanels[1]
                brotherType = 'after'
            }
            else {
                brotherPanel = optionPanels[index - 1]
                brotherType = 'front'
            }
            layout.panels[optionPanel.id] = optionPanel
            const brotherId = Object.keys(layout.panels).find(key => layout.panels[key].params.key == brotherPanel.params.key)
            const originFloatingGroupId = layout.floatingGroups?.find(fg => fg.data.views.includes(brotherId))?.data.id.split('_')[0]
            addPanel(layout.grid.root, optionPanel, brotherPanel, brotherId, originFloatingGroupId)
        }
    })
    localPanels.forEach(localPanel => {
        const panel = optionPanels.find(optionPanel => optionPanel.params.key == localPanel.params.key)
        if (panel) {

        }
        else {
            delete layout.panels[localPanel.id] && layout.panels[localPanel.id]
            if (layout.floatingGroups
                && layout.floatingGroups.length > 0
                && layout.floatingGroups.find(fg => fg.data.views.includes(localPanel.id))
            ) {
                removeFloatingPanel(layout, localPanel)
            }
            else {
                removePanel(layout.grid.root, localPanel)
            }
        }
    })
}

const removeFloatingPanel = (config, localPanel) => {
    config.floatingGroups.forEach((fg, index) => {
        fg.data.views = fg.data.views.filter(p => p.id !== localPanel.id)
    })
    config.floatingGroups = config.floatingGroups.filter(fg => fg.data.views.lengt > 0)
}

const removeEmptyGridViews = (config, options, invisiblePanels) => {
    removeEmptyLeafViews(config.grid.root, config.floatingGroups || [], invisiblePanels || [])
}

const removeEmptyLeafViews = (branch, floatingGroups, delPanels, parent) => {
    if (branch.type == 'branch') {
        branch.data.forEach(item => removeEmptyLeafViews(item, floatingGroups, delPanels, branch))
    }
    else if (branch.type == 'leaf') {
        if (
            branch.data.views.length == 0
            && !floatingGroups.find(fg => fg.data.id.split('_')[0] == branch.data.id.split('_')[0])
            && !delPanels.find(p => p.groupId?.split('_')[0] == branch.data.id?.split('_')[0])
        ) {
            parent && (parent.data = parent.data.filter(item => item.data.id != branch.data.id))
        }
    }
}

const addPanel = (branch, panel, brotherPanel, brotherId, originFloatingGroupId) => {
    if (brotherPanel.params.parentType == 'group') {
        if (branch.type == 'leaf') {
            if (branch.data.views.includes(brotherId)) {
                branch.data.views.push(panel.id)
            }
        }
        else if (branch.type == 'branch') {
            branch.data.forEach(item => {
                addPanel(item, panel, brotherPanel, brotherId, originFloatingGroupId)
            })
        }
    }
    else if (branch.type == 'branch') {

        if (branch.data.length == 0) {
            branch.data.push({
                data: {
                    activeView: panel.id,
                    id: Date.now() + Math.floor(Math.random() * 100) + '',
                    views: [panel.id]
                },
                type: 'leaf'
            })
        }
        else {
            [...branch.data].forEach(item => {
                if (item.type == 'leaf') {
                    if (item.data.views.includes(brotherId) || item.data.id == originFloatingGroupId) {
                        branch.data.push({
                            data: {
                                activeView: panel.id,
                                id: Date.now() + Math.floor(Math.random() * 100) + '',
                                views: [panel.id]
                            },
                            size: branch.data.reduce((pre, cur) => pre + cur.size, 0) / branch.data.length,
                            type: 'leaf'
                        })
                    }
                }
                else {
                    addPanel(item, panel, brotherPanel, brotherId, originFloatingGroupId)
                }
            })
        }
    }
}

const removePanel = (branch, panel, parent) => {
    if (branch.type == 'leaf') {
        if (branch.data.views.length > 0) {
            branch.data.views = branch.data.views.filter(id => id != panel.id)
            if (branch.data.views.length == 0) {
                parent && (parent.data = parent.data.filter(child => child.data.id != branch.data.id))
            }
        }
    }
    else if (branch.type == 'branch') {
        branch.data.forEach(item => {
            removePanel(item, panel, branch)
        })
        if (branch.data.length == 0 && parent) {
            parent.data = parent.data.filter(b => !(b.type == 'branch' && b.data.length == 0))
        }
    }
}

const getGroupIdFunc = () => {
    let currentId = 0;
    return () => `${currentId++}`;
}

const filterEmptyContent = function (data) {
    if (!data || typeof data !== 'object') return data;

    if (Array.isArray(data.content)) {
        data.content = data.content
            .map(item => filterEmptyContent(item))
            .filter(item => !(Array.isArray(item.content) && item.content.length === 0));
    }

    return data;
}

const getTree = (contentItem, { width, height, orientation }, parent, panels, getGroupId, options) => {
    const length = parent.content.length;
    const boxSize = orientation === 'HORIZONTAL' ? width : height;
    let size;
    const hasSizeList = parent.content.filter(item => item.width || item.height)
    const hasSizeLen = hasSizeList.length
    if (hasSizeLen === 0) {
        size = (1 / length * boxSize).toFixed(2) * 1
    }
    else {
        size = hasSizeList.reduce((pre, cur) => pre + getSize(boxSize, cur.width || cur.height), 0)
        size = ((boxSize - size) / (length - hasSizeLen)).toFixed(2) * 1
    }
    orientation === 'HORIZONTAL' ? width = size : height = size
    orientation = orientation === 'HORIZONTAL' ? 'VERTICAL' : 'HORIZONTAL'

    let obj = {}
    if (contentItem.type === 'row' || contentItem.type === 'column') {
        obj.type = 'branch';
        obj.size = getSize(boxSize, contentItem.width || contentItem.height) || size
        obj.data = contentItem.content.map(item => getTree(item, { width, height, orientation }, contentItem, panels, getGroupId, options))
    }
    else if (contentItem.type === 'group') {
        obj = getGroupNode(contentItem, size, boxSize, parent, panels, getGroupId, options);
    }
    else if (contentItem.type === 'component') {
        obj = getLeafNode(contentItem, size, boxSize, parent, panels, getGroupId, options);
    }
    return obj
}

const getSize = (size, rate) => {
    return rate ? size * (rate / 100) : false
}

const getActualSize = (width, height, widthRate, heightRate, defaultSize) => (width ?? height) === null
    ? defaultSize
    : width ? width * widthRate / 100 : height * heightRate / 100;

const getGroupNode = (contentItem, size, boxSize, parent, panels, getGroupId, options) => {
    return {
        type: 'leaf',
        size: getSize(boxSize, contentItem.width || contentItem.height) || size,
        visible: contentItem.content.length > 0 || contentItem.content.some(item => item.visible !== false),
        data: {
            id: getGroupId(),
            activeView: contentItem.content[0]?.id || '',
            hideHeader: contentItem.content.length === 1 && contentItem.content[0].showHeader === false,
            views: contentItem.content.filter(item => item.visible !== false).map(item => {
                panels[item.id] = {
                    id: item.id,
                    title: item.title,
                    tabComponent: item.componentName,
                    contentComponent: item.componentName,
                    params: { ...item, parentId: parent.id }
                }
                return item.id
            })
        }
    }
}

const getLeafNode = (contentItem, size, boxSize, parent, panels, getGroupId, options) => {
    const visible = contentItem.visible !== false;
    const data = {
        type: 'leaf',
        visible: true,
        size: getSize(boxSize, contentItem.width || contentItem.height) || size,
        data: {
            id: getGroupId(),
            activeView: contentItem.id,
            hideHeader: contentItem.showHeader === false,
            views: [contentItem.id]
        }
    };
    panels[contentItem.id] = {
        id: contentItem.id,
        title: contentItem.title,
        tabComponent: contentItem.componentName,
        contentComponent: contentItem.componentName,
        params: { ...contentItem, parentId: parent.id }
    }
    return data;
}

const saveConfig = dockview => {
    if (dockview.params.inited !== true || dockview.params.maximizing) {
        return;
    }

    dockview.panels.forEach(panel => {
        panel.params.isActive = panel.api.isActive || panel.group.activePanel === panel
    })

    const gridJson = dockview.toJSON();
    if (dockview.floatingGroups && dockview.floatingGroups.length > 0) {
        gridJson.floatingGroups.forEach((fg, index) => {
            const group = dockview.floatingGroups[index].group
            if (fg.position.width > 0) {
                group.panels.forEach(panel => {
                    !panel.params.currentPosition && (panel.params.currentPosition = {})
                    panel.params.currentPosition.width = fg.position.width
                })
            }
            else {
                fg.position.width = group.params.currentPosition.width || 500
            }
            if (fg.position.height > 0) {
                group.panels.forEach(panel => {
                    !panel.params.currentPosition && (panel.params.currentPosition = {})
                    panel.params.currentPosition.height = fg.position.height
                })
            }
            else {
                fg.position.height = group.params.currentPosition.height || 350
            }
        })
    }
    const json = JSON.stringify({
        layout: gridJson,
        invisiblePanels: dockview.params.invisiblePanels
    });

    if (dockview.params.options.enableLocalStorage) {
        const key = `${dockview.params.options.localStorageKey}-layout`;
        localStorage.setItem(key, json);
    }
    else {
        dockview._saveConfig?.fire(json);
    }
}

export const getInvisiblePanels = localStorageKey => {
    const storedStr = localStorage.getItem(localStorageKey);
    return storedStr ? JSON.parse(storedStr)?.invisiblePanels ?? [] : [];
}

export { initDockviewFromConfig, saveConfig };
