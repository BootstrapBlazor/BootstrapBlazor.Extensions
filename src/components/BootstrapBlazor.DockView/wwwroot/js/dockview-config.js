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
    const synced = syncLayoutWithOptions(layout, options, invisiblePanels);
    // 将同步结果写回 config.layout（保留引用结构）
    config.layout = synced;
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
    // 所有 panel 都应该注册到 panels 对象中，包括 visible: false 的
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
            views: views  // 包含所有 panel，包括 visible: false 的
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

/**
 * 将本地保存的 dockview layout 与最新的 options 同步：
 *  - 本地有、options 没有 → 从 grid/floatingGroups/panels 中删除
 *  - options 有、本地没有 → 插入到与其同 group 的兄弟 panel 所在的 leaf 中
 *  - 都有 → 用 options params 覆盖，保留本地 id 和 visible
 *
 * @param {Object} layout  - 本地存储的 dockview layout（{ grid, panels, floatingGroups? }）
 * @param {Object} options - 最新的 options（含 content 树）
 * @param {Array}  invisiblePanels - 用户主动关闭的面板列表（这些不应被重新添加）
 * @returns {Object} 同步后的新 layout（深拷贝，不修改原始对象）
 */
const syncLayoutWithOptions = (layout, options, invisiblePanels = []) => {
    // ── 1. 从 options.content 树中提取所有 panel 的完整信息（含 parentType/parentId）
    //     注意：包括 visible: false 的 panel，它们会在 onDidLayoutFromJSON 中被关闭
    const optionPanels = getPanelsFromOptions(options);

    // key → optionPanel
    const optionPanelByKey = new Map(optionPanels.map(p => [p.params.key, p]));

    // ── 2. 建立本地 key → panelId 的映射
    const localIdByKey = new Map();
    Object.values(layout.panels).forEach(p => {
        if (p.params?.key) localIdByKey.set(p.params.key, p.id);
    });

    // ── 3. 检测匹配率：若本地 panel 与 options panel 完全没有交集，说明是全新配置，直接重建
    const matchCount = [...optionPanelByKey.keys()].filter(key => localIdByKey.has(key)).length;
    if (matchCount === 0) {
        return getConfigFromContent(options);
    }

    const newLayout = JSON.parse(JSON.stringify(layout));

    // ── 4. 用户主动关闭的 key 集合（不应被重新添加）
    const invisibleKeys = new Set((invisiblePanels || []).map(p => p.params?.key).filter(Boolean));

    // ── 5. 更新：options 和本地都有的 panel，合并 params，保留本地 id 和 visible
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
                ...localPanel.params,        // 保留本地状态（isActive、currentPosition 等）
                ...optionPanel.params,       // options 的最新配置覆盖
                id: localId,                 // 保留本地 id
                visible: localPanel.params.visible  // 保留本地 visible 状态
            }
        };
    }

    // ── 6. 删除：本地有但 options 没有的 panel
    const keysToDelete = [...localIdByKey.keys()].filter(key => !optionPanelByKey.has(key));
    const idsToDelete = new Set(keysToDelete.map(key => localIdByKey.get(key)));
    if (idsToDelete.size > 0) {
        _removePanelIdsFromLayout(newLayout, idsToDelete);
    }

    // ── 7. 添加：options 有但本地没有的 panel（且不在用户主动关闭列表中）
    //    此时 localIdByKey 已反映删除后的状态，用更新后的 map 追踪新插入的 panel
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
 * 从 layout 的 grid、floatingGroups、panels 中删除指定 id 的 panel
 * @param {Object} layout
 * @param {Set<string>} idsToDelete
 */
const _removePanelIdsFromLayout = (layout, idsToDelete) => {
    // 从 panels 对象删除
    for (const id of idsToDelete) {
        delete layout.panels[id];
    }

    // 从 grid 树的 leaf.views 中删除，leaf 变空则从父 branch 移除
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
            // 先递归，再清理空 branch
            [...node.data].forEach(child => pruneNode(child, node));
            if (node.data.length === 0 && parent) {
                parent.data = parent.data.filter(n => n !== node);
            }
        }
    };
    pruneNode(layout.grid.root, null);

    // 从 floatingGroups 中删除
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
 * 将一个新 panel 插入到 layout 中合适的位置。
 * 策略：
 * 1. 根据 options 里的兄弟/父子关系找到添加位置
 * 2. 若找不到任何兄弟（极端情况），则添加到根目录的最后作为一个独立的 leaf
 *
 * @param {Object} layout
 * @param {Object} optionPanel   - 要插入的 panel（来自 getPanelsFromOptions）
 * @param {Array}  optionPanels  - 全部 optionPanels（用于找兄弟）
 * @param {Map}    localIdByKey  - 当前 key → localId 映射（已包含之前插入的）
 */
const _insertPanelIntoLayout = (layout, optionPanel, optionPanels, localIdByKey) => {
    // 注册到 panels
    layout.panels[optionPanel.id] = {
        id: optionPanel.id,
        title: optionPanel.title,
        tabComponent: optionPanel.tabComponent,
        contentComponent: optionPanel.contentComponent,
        params: { ...optionPanel.params }
    };

    const parentType = optionPanel.params.parentType; // 'group' | 'column' | 'row' | ...

    if (parentType === 'group') {
        // 找同一个 group（parentId 相同）中已存在于本地的兄弟 panel 的 localId
        const siblingLocalId = _findSiblingLocalId(optionPanel, optionPanels, localIdByKey);

        if (siblingLocalId) {
            // 找到兄弟所在的 leaf，把新 panel 追加进去
            const inserted = _insertIntoLeafWithSibling(layout.grid.root, siblingLocalId, optionPanel.id);
            if (inserted) return;

            // 兄弟可能在 floatingGroup 里
            if (layout.floatingGroups?.length) {
                for (const fg of layout.floatingGroups) {
                    if (fg.data?.views?.includes(siblingLocalId)) {
                        fg.data.views.push(optionPanel.id);
                        return;
                    }
                }
            }
        }
    } else {
        // parentType 是 'column' 或 'row'：平级组件，应该保持独立的 leaf
        // 在 grid 中找一个合适的位置创建新的独立 leaf
        _createIndependentLeaf(layout, optionPanel, optionPanels, localIdByKey);
        return;
    }

    // 兜底：添加到根目录的最后作为一个独立的 leaf
    _appendToRootAsIndependentLeaf(layout, optionPanel);
}

/**
 * 在 optionPanels 中找与 targetPanel 同 parentId 且已存在于本地的兄弟 panel 的 localId
 */
const _findSiblingLocalId = (targetPanel, optionPanels, localIdByKey) => {
    const parentId = targetPanel.params.parentId;
    // 同 group 的兄弟（parentId 相同），按 optionPanels 顺序找最近的已存在的
    const siblings = optionPanels.filter(p =>
        p.params.key !== targetPanel.params.key &&
        p.params.parentId === parentId &&
        localIdByKey.has(p.params.key)
    );
    if (siblings.length > 0) return localIdByKey.get(siblings[0].params.key);

    // 同 parentType 但不同 parentId 的兜底（跨 group 找最近邻）
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
 * 在 grid 树中找包含 siblingId 的 leaf，并将 newPanelId 追加到其 views
 * @returns {boolean} 是否成功插入
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



/**
 * 为平级组件（parentType 为 'column' 或 'row'）创建独立的 leaf
 */
const _createIndependentLeaf = (layout, optionPanel, optionPanels, localIdByKey) => {
    // 在 optionPanels 中找到这个 panel 的索引
    const optionIndex = optionPanels.findIndex(p => p.params.key === optionPanel.params.key);
    
    // 找同 parent 的兄弟 panel（在 options 中相邻的）
    const parentId = optionPanel.params.parentId;
    const siblingsInOptions = optionPanels.filter(p => 
        p.params.parentId === parentId && 
        localIdByKey.has(p.params.key)
    );
    
    if (siblingsInOptions.length > 0) {
        // 有兄弟存在，找到兄弟所在的 leaf，在旁边创建新的 leaf
        const firstSiblingKey = siblingsInOptions[0].params.key;
        const firstSiblingId = localIdByKey.get(firstSiblingKey);
        
        // 在 grid 中找包含兄弟的 branch，在旁边插入新 leaf
        const inserted = _insertLeafNextToSibling(layout.grid.root, firstSiblingId, optionPanel.id);
        if (inserted) return;
    }
    
    // 没有兄弟或插入失败，在 grid root 的第一个 branch 里追加新 leaf
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
        // 重新平衡 size
        const avgSize = rootBranch.data.reduce((sum, leaf) => sum + leaf.size, 0) / rootBranch.data.length;
        rootBranch.data.forEach(leaf => leaf.size = avgSize);
    }
}

/**
 * 在包含 siblingId 的 branch 旁边插入新 leaf
 */
const _insertLeafNextToSibling = (node, siblingId, newPanelId) => {
    if (node.type === 'branch') {
        // 检查这个 branch 里是否有 leaf 包含 siblingId
        for (let i = 0; i < node.data.length; i++) {
            const child = node.data[i];
            if (child.type === 'leaf' && child.data.views.includes(siblingId)) {
                // 在这个 leaf 后面插入新 leaf
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
                // 重新平衡 size
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

/**
 * 找 grid 树中第一个 branch 节点
 */
const _findFirstBranch = node => {
    if (node.type === 'branch') return node;
    if (node.type === 'leaf') return null;
    return null;
}

/**
 * 找 grid 树中第一个 leaf 节点
 */
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

/**
 * 添加到根目录的最后作为一个独立的 leaf（兜底逻辑）
 */
const _appendToRootAsIndependentLeaf = (layout, optionPanel) => {
    // 找到根 branch（grid.root 或 grid.root 的第一个 branch）
    let targetBranch = layout.grid.root;
    if (targetBranch.type === 'leaf') {
        // 如果 root 是 leaf，需要把它包装进一个 branch
        const newBranch = {
            type: 'branch',
            size: targetBranch.size,
            data: [targetBranch]
        };
        layout.grid.root = newBranch;
        targetBranch = newBranch;
    }
    
    // 创建新 leaf
    const newLeaf = {
        type: 'leaf',
        size: targetBranch.data.length > 0 ? targetBranch.data[0].size : 100,
        data: {
            id: Date.now() + Math.floor(Math.random() * 100) + '',
            activeView: optionPanel.id,
            views: [optionPanel.id]
        }
    };
    
    // 追加到 branch 的末尾
    targetBranch.data.push(newLeaf);
    
    // 重新平衡 size
    const avgSize = targetBranch.data.reduce((sum, leaf) => sum + leaf.size, 0) / targetBranch.data.length;
    targetBranch.data.forEach(leaf => leaf.size = avgSize);
}

export { initDockviewFromConfig, saveConfig, syncLayoutWithOptions };
