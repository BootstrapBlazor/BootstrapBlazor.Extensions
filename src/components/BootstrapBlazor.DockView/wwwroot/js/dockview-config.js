import { getPanelsFromOptions } from "./dockview-panel.js"

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
            mergeLayoutWithOptions(config, options);
            const { layout, invisiblePanels } = config;
            normalizeMaximizeState(layout?.grid);
            pruneOrphanViews(layout);
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

const mergeLayoutWithOptions = (config, options) => {
    const { layout, invisiblePanels } = config;
    // Clean invisiblePanels before merging, so sync's panelsToAdd can re-add the cleaned channels
    const optionKeys = new Set(getPanelsFromOptions(options).map(p => p.params?.key).filter(Boolean));
    const cleaned = (invisiblePanels || []).filter(p => {
        if (p.params?.showClose === false) return false;   // data-driven channel wrongly registered -> drop
        const key = p.params?.key;
        if (key && !optionKeys.has(key)) return false;     // key no longer in options (stale after dataset switch)
        return true;
    });
    // Sentinel: warn when a data-driven channel was wrongly in invisiblePanels (silent otherwise)
    const wronglyRegistered = (invisiblePanels || []).filter(p => p.params?.showClose === false);
    if (wronglyRegistered.length > 0) {
        console.warn('[dockview] data-driven channel wrongly in invisiblePanels (auto-cleared):',
            wronglyRegistered.map(p => p.params?.key), '| storage:', options.localStorageKey);
    }
    config.invisiblePanels = cleaned;
    config.layout = syncLayoutWithOptions(layout, options, cleaned);
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
    const views = contentItem.content.map(item => {
        panels[item.id] = {
            id: item.id,
            title: item.title,
            tabComponent: item.componentName,
            contentComponent: item.componentName,
            params: { ...item, parentId: parent.id }
        }
        return item.id
    });

    return {
        type: 'leaf',
        size: getSize(boxSize, contentItem.width || contentItem.height) || size,
        visible: contentItem.content.length > 0 || contentItem.content.some(item => item.visible !== false),
        data: {
            id: getGroupId(),
            activeView: contentItem.content[0]?.id || '',
            hideHeader: contentItem.content.length === 1 && contentItem.content[0].showHeader === false,
            views: views
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

// Drop view ids missing from layout.panels; fromJSON throws on such orphans and reverts the
// whole layout to empty. Only leaves/groups emptied by pruning are dropped, so already-empty
// floating placeholders are kept and float/dock still work.
const pruneOrphanViews = layout => {
    if (!layout || !layout.panels) return;
    const has = id => Object.prototype.hasOwnProperty.call(layout.panels, id);
    // returns true if the data had views and pruning removed all of them
    const pruneViews = data => {
        if (!data || !Array.isArray(data.views)) return false;
        const before = data.views.length;
        data.views = data.views.filter(has);
        if (!has(data.activeView)) {
            data.activeView = data.views[0] ?? '';
        }
        return before > 0 && data.views.length === 0;
    };
    const walk = (node, parent) => {
        if (!node) return;
        if (node.type === 'leaf') {
            if (pruneViews(node.data) && parent) {
                parent.data = parent.data.filter(n => n !== node);
            }
        }
        else if (node.type === 'branch' && Array.isArray(node.data)) {
            [...node.data].forEach(child => walk(child, node));
            if (node.data.length === 0 && parent) {
                parent.data = parent.data.filter(n => n !== node);
            }
        }
    };
    walk(layout.grid?.root, null);
    if (Array.isArray(layout.floatingGroups)) {
        layout.floatingGroups = layout.floatingGroups.filter(fg => !pruneViews(fg.data));
    }
};

// Strip maximize residue: drop maximizedNode and re-show non-empty hidden grid leaves
// (a maximized group's hidden siblings; floating placeholders are empty leaves, left as-is).
const normalizeMaximizeState = grid => {
    if (!grid) return;
    delete grid.maximizedNode;
    const walk = node => {
        if (!node) return;
        if (node.type === 'leaf') {
            if (node.visible === false && node.data?.views?.length > 0) {
                node.visible = true;
            }
        }
        else if (Array.isArray(node.data)) {
            node.data.forEach(walk);
        }
    };
    walk(grid.root);
};

const saveConfig = dockview => {
    if (dockview.params.inited !== true || dockview.params.maximizing) {
        return;
    }

    // Don't persist a collapsed/unmeasured layout: while collapsed toJSON() serializes size:100, which
    // makes the even-split sticky across refreshes. Real layouts are measured (width>0), so this only
    // drops a degenerate save the next change re-saves.
    if (!dockview.width || !dockview.height) {
        return;
    }

    dockview.panels.forEach(panel => {
        panel.params.isActive = panel.api.isActive || panel.group.activePanel === panel
    })

    // While maximized, toJSON()'s serialize() toggles sibling visibility once; guard it with
    // `maximizing` so the onlyWhenVisible handler doesn't move sibling content into the template
    // (which would blank it after exit). finally resets the flag even on throw, otherwise a stuck
    // `maximizing` would make every later saveConfig bail at the top guard.
    let gridJson;
    dockview.params.maximizing = true;
    try {
        gridJson = dockview.toJSON();
    }
    finally {
        dockview.params.maximizing = false;
    }
    // Maximize is transient; don't persist it.
    normalizeMaximizeState(gridJson.grid);
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

/**
 * @param {Object} layout
 * @param {Object} options
 * @param {Array}  invisiblePanels
 * @returns {Object}
 */
const syncLayoutWithOptions = (layout, options, invisiblePanels = []) => {
    const optionPanels = getPanelsFromOptions(options);
    const optionPanelByKey = new Map(optionPanels.map(p => [p.params.key, p]));
    const localIdByKey = new Map();
    Object.values(layout.panels).forEach(p => {
        if (p.params?.key) localIdByKey.set(p.params.key, p.id);
    });

    const matchCount = [...optionPanelByKey.keys()].filter(key => localIdByKey.has(key)).length;
    if (matchCount === 0) {
        return getConfigFromContent(options);
    }

    const newLayout = JSON.parse(JSON.stringify(layout));
    const invisibleKeys = new Set((invisiblePanels || []).map(p => p.params?.key).filter(Boolean));

    for (const [key, optionPanel] of optionPanelByKey) {
        if (!localIdByKey.has(key)) continue;
        const localId = localIdByKey.get(key);
        const localPanel = newLayout.panels[localId];
        newLayout.panels[localId] = {
            ...localPanel,
            title: optionPanel.title ?? localPanel.title,
            tabComponent: optionPanel.tabComponent ?? localPanel.tabComponent,
            contentComponent: optionPanel.contentComponent ?? localPanel.contentComponent,
            params: {
                ...localPanel.params,
                ...optionPanel.params,
                id: localId,
                visible: localPanel.params.visible,
                // keep remembered lock unless backend explicitly sends one
                isLock: optionPanel.params.isLock ?? localPanel.params.isLock
            }
        };
    }

    const keysToDelete = [...localIdByKey.keys()].filter(key => !optionPanelByKey.has(key));
    const idsToDelete = new Set(keysToDelete.map(key => localIdByKey.get(key)));
    if (idsToDelete.size > 0) {
        _removePanelIdsFromLayout(newLayout, idsToDelete);
    }

    const currentIdByKey = new Map(
        Object.values(newLayout.panels)
            .filter(p => p.params?.key)
            .map(p => [p.params.key, p.id])
    );
    const panelsToAdd = optionPanels.filter(p => !currentIdByKey.has(p.params.key) && !invisibleKeys.has(p.params.key));
    for (const optionPanel of panelsToAdd) {
        _insertPanelIntoLayout(newLayout, optionPanel, optionPanels, currentIdByKey);
        currentIdByKey.set(optionPanel.params.key, optionPanel.id);
    }

    return newLayout;
}

/**
 * @param {Object} layout
 * @param {Set<string>} idsToDelete
 */
const _removePanelIdsFromLayout = (layout, idsToDelete) => {
    for (const id of idsToDelete) {
        delete layout.panels[id];
    }

    const pruneNode = (node, parent) => {
        if (node.type === 'leaf') {
            node.data.views = node.data.views.filter(id => !idsToDelete.has(id));
            if (idsToDelete.has(node.data.activeView)) {
                node.data.activeView = node.data.views[0] ?? '';
            }
            if (node.data.views.length === 0 && parent) {
                parent.data = parent.data.filter(n => n !== node);
            }
        } else if (node.type === 'branch') {
            [...node.data].forEach(child => pruneNode(child, node));
            if (node.data.length === 0 && parent) {
                parent.data = parent.data.filter(n => n !== node);
            }
        }
    };
    pruneNode(layout.grid.root, null);

    if (layout.floatingGroups?.length) {
        layout.floatingGroups.forEach(fg => {
            if (!fg.data?.views) return;
            fg.data.views = fg.data.views.filter(id => !idsToDelete.has(id));
            if (idsToDelete.has(fg.data.activeView)) {
                fg.data.activeView = fg.data.views[0] ?? '';
            }
        });
        layout.floatingGroups = layout.floatingGroups.filter(fg => fg.data?.views?.length > 0);
    }
}

/**
 * @param {Object} layout
 * @param {Object} optionPanel
 * @param {Array}  optionPanels
 * @param {Map}    localIdByKey
 */
const _insertPanelIntoLayout = (layout, optionPanel, optionPanels, localIdByKey) => {
    layout.panels[optionPanel.id] = {
        id: optionPanel.id,
        title: optionPanel.title,
        tabComponent: optionPanel.tabComponent,
        contentComponent: optionPanel.contentComponent,
        params: { ...optionPanel.params }
    };

    const parentType = optionPanel.params.parentType;

    if (parentType === 'group') {
        const siblingLocalId = _findSiblingLocalId(optionPanel, optionPanels, localIdByKey);

        if (siblingLocalId) {
            const inserted = _insertIntoLeafWithSibling(layout.grid.root, siblingLocalId, optionPanel.id);
            if (inserted) return;

            if (layout.floatingGroups?.length) {
                for (const fg of layout.floatingGroups) {
                    if (fg.data?.views?.includes(siblingLocalId)) {
                        fg.data.views.push(optionPanel.id);
                        return;
                    }
                }
            }
        }
    }
    else {
        _createIndependentLeaf(layout, optionPanel, optionPanels, localIdByKey);
        return;
    }

    _appendToRootAsIndependentLeaf(layout, optionPanel);
}

const _findSiblingLocalId = (targetPanel, optionPanels, localIdByKey) => {
    const parentId = targetPanel.params.parentId;
    const siblings = optionPanels.filter(p =>
        p.params.key !== targetPanel.params.key &&
        p.params.parentId === parentId &&
        localIdByKey.has(p.params.key)
    );
    if (siblings.length > 0) return localIdByKey.get(siblings[0].params.key);

    const idx = optionPanels.findIndex(p => p.params.key === targetPanel.params.key);
    for (let i = idx - 1; i >= 0; i--) {
        if (localIdByKey.has(optionPanels[i].params.key)) return localIdByKey.get(optionPanels[i].params.key);
    }
    for (let i = idx + 1; i < optionPanels.length; i++) {
        if (localIdByKey.has(optionPanels[i].params.key)) return localIdByKey.get(optionPanels[i].params.key);
    }
    return null;
}

/**
 * @returns {boolean}
 */
const _insertIntoLeafWithSibling = (node, siblingId, newPanelId) => {
    if (node.type === 'leaf') {
        if (node.data.views.includes(siblingId)) {
            node.data.views.push(newPanelId);
            return true;
        }
        return false;
    }
    if (node.type === 'branch') {
        for (const child of node.data) {
            if (_insertIntoLeafWithSibling(child, siblingId, newPanelId)) return true;
        }
    }
    return false;
}



const _createIndependentLeaf = (layout, optionPanel, optionPanels, localIdByKey) => {
    const optionIndex = optionPanels.findIndex(p => p.params.key === optionPanel.params.key);
    const parentId = optionPanel.params.parentId;
    const siblingsInOptions = optionPanels.filter(p =>
        p.params.parentId === parentId &&
        localIdByKey.has(p.params.key)
    );

    if (siblingsInOptions.length > 0) {
        const firstSiblingKey = siblingsInOptions[0].params.key;
        const firstSiblingId = localIdByKey.get(firstSiblingKey);
        const inserted = _insertLeafNextToSibling(layout.grid.root, firstSiblingId, optionPanel.id);
        if (inserted) return;
    }

    const rootBranch = _findFirstBranch(layout.grid.root);
    if (rootBranch) {
        const newLeaf = {
            type: 'leaf',
            size: rootBranch.data.length > 0 ? rootBranch.data[0].size : 100,
            data: {
                id: Date.now() + Math.floor(Math.random() * 100) + '',
                activeView: optionPanel.id,
                views: [optionPanel.id]
            }
        };
        rootBranch.data.push(newLeaf);
        const avgSize = rootBranch.data.reduce((sum, leaf) => sum + leaf.size, 0) / rootBranch.data.length;
        rootBranch.data.forEach(leaf => leaf.size = avgSize);
    }
}

const _insertLeafNextToSibling = (node, siblingId, newPanelId) => {
    if (node.type === 'branch') {
        for (let i = 0; i < node.data.length; i++) {
            const child = node.data[i];
            if (child.type === 'leaf' && child.data.views.includes(siblingId)) {
                const newLeaf = {
                    type: 'leaf',
                    size: child.size,
                    data: {
                        id: Date.now() + Math.floor(Math.random() * 100) + '',
                        activeView: newPanelId,
                        views: [newPanelId]
                    }
                };
                node.data.splice(i + 1, 0, newLeaf);
                const avgSize = node.data.reduce((sum, leaf) => sum + leaf.size, 0) / node.data.length;
                node.data.forEach(leaf => leaf.size = avgSize);
                return true;
            } else if (child.type === 'branch') {
                if (_insertLeafNextToSibling(child, siblingId, newPanelId)) return true;
            }
        }
    }
    return false;
}

const _findFirstBranch = node => {
    if (node.type === 'branch') return node;
    if (node.type === 'leaf') return null;
    return null;
}

const _findFirstLeaf = node => {
    if (node.type === 'leaf') return node;
    if (node.type === 'branch') {
        for (const child of node.data) {
            const found = _findFirstLeaf(child);
            if (found) return found;
        }
    }
    return null;
}

const _appendToRootAsIndependentLeaf = (layout, optionPanel) => {
    let targetBranch = layout.grid.root;
    if (targetBranch.type === 'leaf') {
        const newBranch = {
            type: 'branch',
            size: targetBranch.size,
            data: [targetBranch]
        };
        layout.grid.root = newBranch;
        targetBranch = newBranch;
    }

    const newLeaf = {
        type: 'leaf',
        size: targetBranch.data.length > 0 ? targetBranch.data[0].size : 100,
        data: {
            id: Date.now() + Math.floor(Math.random() * 100) + '',
            activeView: optionPanel.id,
            views: [optionPanel.id]
        }
    };

    targetBranch.data.push(newLeaf);

    const avgSize = targetBranch.data.reduce((sum, leaf) => sum + leaf.size, 0) / targetBranch.data.length;
    targetBranch.data.forEach(leaf => leaf.size = avgSize);
}

export { initDockviewFromConfig, saveConfig, syncLayoutWithOptions };
