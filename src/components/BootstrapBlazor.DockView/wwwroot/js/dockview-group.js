import { getIcons, getIcon } from "./dockview-icon.js"
import { deletePanel, findContentFromPanels } from "./dockview-panel.js"
import { saveConfig } from "./dockview-config.js"
import { observeGroup } from "./dockview-utils.js"
import EventHandler from '../../BootstrapBlazor/modules/event-handler.js'

const onAddGroup = group => {
    Object.defineProperties(group, {
        type: {
            get() { return this.model.location.type }
        },
        params: {
            get() { return JSON.parse(JSON.stringify(group.activePanel?.params || {})) }
        }
    })

    const dockview = group.api.accessor;

    group.header.onDrop(() => {
        saveConfig(dockview)
    })
    group.model.contentContainer.dropTarget.onDrop(() => {
        saveConfig(dockview)
    })
    createGroupActions(group);
    dockview._inited && observeGroup(group)
}

const addGroupWithPanel = (dockview, panel, panels, index) => {
    if (panel.groupId) {
        addPanelWidthGroupId(dockview, panel, index)
    }
    else {
        addPanelWidthCreatGroup(dockview, panel, panels)
    }
    deletePanel(dockview, panel)
}

const addPanelWidthGroupId = (dockview, panel, index) => {
    let group = dockview.api.getGroup(panel.groupId)
    let { rect = {}, packup, floatType, drawer, direction = 'left' } = panel.params || {}
    if (!group) {
        group = dockview.createGroup({ id: panel.groupId })
        // const floatingGroupPosition = isMaximized ? {
        //     x: 0, y: 0,
        //     width: dockview.width,
        //     height: dockview.height
        // } : {
        //     x: currentPosition?.left || 0,
        //     y: currentPosition?.top || 0,
        //     width: currentPosition?.width,
        //     height: currentPosition?.height
        // }
        // dockview.addFloatingGroup(group, floatingGroupPosition, { skipRemoveGroup: true })
        // createGroupActions(group);
        const width = dockview.width > 500 ? 500 : (dockview.width - 10)
        const height = dockview.height > 460 ? 460 : (dockview.height - 10)
        const left = (dockview.width - width) / 2
        const top = (dockview.height - height) / 2
        let floatingGroupRect = rect || {
            width, height: packup?.isPackup ? packup.height : height, position: { left, top }
        }
        if (floatType == 'drawer') {
            floatingGroupRect = {
                width: drawer.width || 300,
                height: dockview.height,
                position: { [direction]: 0, top: 0 }
            }
        }
        dockview.addFloatingGroup(group, { ...floatingGroupRect, skipRemoveGroup: true })
        const overlay = dockview.floatingGroups.find(fg => fg.group.id == group.id).overlay
        observeOverlayChange(overlay, group)
        createGroupActions(group, floatType);
        if (floatType == 'drawer') {
            setTimeout(() => createDrawerHandle(group, direction == 'right'), 0);
        }
        // const floatingGroup = createFloatingGroup(group, floatingGroupRect)
        const autoHideBtn = group.header.rightActionsContainer.querySelector('.bb-dockview-control-icon-autohide')
        if (autoHideBtn) {
            // autoHideBtn.style.display = 'none'
        }

        // saveConfig(dockview)
    }
    else {
        if (group.api.location.type === 'grid') {
            let isVisible = dockview.isVisible(group)
            if (isVisible === false) {
                dockview.setVisible(group, true)
                // isMaximized && group.api.maximize();
            }
        }
    }
    dockview.addPanel({
        id: panel.id,
        title: panel.title,
        renderer: panel.renderer,
        component: panel.component,
        position: { referenceGroup: group, index: index || 0 },
        params: { ...panel.params, rect, packup, visible: true }
    })
    dockview._panelVisibleChanged?.fire({ title: panel.title, status: true });
}

const addPanelWidthCreatGroup = (dockview, panel, panels) => {
    let { position = {}, currentPosition, packupHeight, isPackup, isMaximized } = panel.params || {}
    let brothers = panels.filter(p => p.params.parentId == panel.params.parentId && p.id != panel.id)
    let group, direction
    if (brothers.length > 0 && brothers[0].params.parentType == 'group') {
        group = dockview.groups.find(g => findContentFromPanels(g.panels, brothers[0]))
    }
    else {
        let targetPanel
        for (let i = 0, len = panels.length; i < len; i++) {
            if (panels[i]?.id === panel.id) {
                if (i == len - 1) {
                    targetPanel = panels[i - 1]
                    group = dockview.groups.find(g => findContentFromPanels(g.panels, targetPanel))
                    direction = getOrientation(dockview.gridview.root, group) === 'VERTICAL' ? 'below' : 'right'
                    break
                }
                else {
                    targetPanel = panels[i + 1]
                    group = dockview.groups.find(g => findContentFromPanels(g.panels, targetPanel))
                    direction = getOrientation(dockview.gridview.root, group) === 'VERTICAL' ? 'above' : 'left'
                    break
                }
            }
        }
    }
    let option = {
        id: panel.id,
        title: panel.title,
        renderer: panel.renderer,
        component: panel.component,
        position: { referenceGroup: group },
        params: { ...panel.params, isPackup, packupHeight, isMaximized, position }
    }
    if (direction) option.position.direction = direction
    dockview.addPanel(option);
    dockview._panelVisibleChanged?.fire({ title: panel.title, status: true });
}

const getOrientation = function (child, group) {
    if (child.children) {
        let targetGroup = child.children.find(item => !item.children && item.element === group.element)
        if (targetGroup) {
            return child.orientation
        }
        else {
            for (const item of child.children) {
                let orientation = getOrientation(item, group)
                if (orientation) {
                    return orientation
                }
            }
        }
    }
    else {
        return false
    }
}

const createGroupActions = (group, groupType) => {
    const actionContainer = group.header.element.querySelector('.dv-right-actions-container');
    getIcons().forEach(item => {
        if (item.name !== 'bar') {
            const icon = getIcon(item.name);
            actionContainer.append(icon);
        }
    });
    setTimeout(() => {
        groupType = groupType || group.getParams()?.floatType
        resetActionStates(group, actionContainer, groupType);
        if (showUp(group) && getUpState(group)) {
            group.panels.forEach(panel => panel.view.content.element.classList.add('bb-overflowHidden'))
        }
    }, 0)
    addActionEvent(group, actionContainer);
}
const observeDisplayChange = (icon, group) => {
    const dockview = group.api.accessor
    const element = icon.querySelector('.dropdown-menu')
    const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.attributeName == 'class') {
                if(mutation.target.classList.contains('show')) {
                    const currentPanelEle = group.activePanel.view.content.element.parentElement
                    const childEle = currentPanelEle.children[0]
                    group.element.querySelector('&>.dv-content-container').append(childEle)
                    currentPanelEle.style.zIndex = -1
                    childEle.wrapperEle = currentPanelEle
                }
                else {
                    const panelEleList = [...group.element.querySelector('&>.dv-content-container').children].map(item => {
                        const wrapperEle = item.wrapperEle
                        delete item.wrapperEle
                        wrapperEle.append(item)
                        return wrapperEle
                    })
                    group.element.parentElement.parentElement.append(...panelEleList)
                }
            }
        })
    });
    group.mutationObserver = mutationObserver
    mutationObserver.observe(element, {
        attributes: true,
        attributeFilter: ["class"],
    });
}

const disposeGroup = group => {
    const { observer } = group.api.accessor.params;
    if (observer) {
        observer.unobserve(group.header.element);
        observer.unobserve(group.header.tabs._tabsList);
    }
    if (group.mutationObserver) {
        group.mutationObserver.disconnect();
    }
    removeActionEvent(group);
}

const resetActionStates = (group, actionContainer, groupType) => {
    const dockview = group.api.accessor;
    if (showLock(dockview, group)) {
        actionContainer.classList.add('bb-show-lock');
        if (getLockState(dockview, group)) {
            toggleLock(group, actionContainer, true)
        }
    }
    if (showPin(dockview, group) && showFloat(dockview, group)) {
        actionContainer.classList.add('bb-show-pin');
        if (getPinState(dockview, group, groupType)) {
            actionContainer.classList.add('bb-pin');
        }
    }
    if (showMaximize(dockview, group)) {
        actionContainer.classList.add('bb-show-maximize');
        // if (getMaximizeState(group)) {
        //     toggleFull(group, actionContainer, true)
        // }
    }
    if (showFloat(dockview, group)) {
        actionContainer.classList.add('bb-show-float');
        if (getFloatState(group)) {
            actionContainer.classList.add('bb-float');
        }
    }
    if (showUp(group) && !getUpState(group)) {
        actionContainer.classList.add('bb-up')
    }
}

const showLock = (dockview, group) => {
    const { options } = dockview.params;
    return group.panels.every(panel => panel.params.showLock === null)
        ? options.showLock
        : group.panels.some(panel => panel.params.showLock === true)
}
const showPin = (dockview, group) => {
    const { options } = dockview.params;
    return group.panels.every(panel => panel.params.showPin === null || panel.params.showPin === undefined)
        ? options.showPin
        : group.panels.some(panel => panel.params.showPin === true)
}
const getPinState = (dockview, group, groupType) => {
    return group.model.location.type == 'grid'
}

const getLockState = (dockview, group) => {
    const { options } = dockview.params;
    return group.panels.every(p => p.params.isLock === null)
        ? options.lock
        : group.panels.some(p => p.params.isLock === true);
}
const showUp = (group) => {
    return group.model.location.type == 'floating'
}
const getUpState = (group) => {
    return group.getParams().packup?.isPackup
}
const showMaximize = (dockview, group) => {
    const { options } = dockview.params;
    return group.panels.every(p => p.params.showMaximize === null)
        ? options.showMaximize
        : group.panels.some(p => p.params.showMaximize === true);
}

const getMaximizeState = (group) => {
    const type = group.model.location.type
    return type === 'grid'
        ? group.api.isMaximized()
        : (type === 'floating' ? group.activePanel?.params.isMaximized : false)
}

const showFloat = (dockview, group) => {
    const { options } = dockview.params;
    return group.panels.every(panel => panel.params.showFloat === null)
        ? options.showFloat
        : group.panels.some(panel => panel.params.showFloat === true)
}

const getFloatState = group => group.model.location.type === 'floating';

const addActionEvent = group => {
    const actionContainer = group.header.element.querySelector('.dv-right-actions-container');
    const tabsContainer = group.header.tabContainer

    EventHandler.on(actionContainer, 'click', '.bb-dockview-control-icon', e => {
        const ele = e.delegateTarget;
        if (ele.classList.contains('bb-dockview-control-icon-lock')) {
            toggleLock(group, actionContainer, false);
            group.api.accessor._lockChanged.fire({ title: group.panels.map(panel => panel.title), isLock: false });
        }
        else if (ele.classList.contains('bb-dockview-control-icon-unlock')) {
            toggleLock(group, actionContainer, true);
            group.api.accessor._lockChanged.fire({ title: group.panels.map(panel => panel.title), isLock: true });
        }
        else if (ele.classList.contains('bb-dockview-control-icon-restore')) {
            toggleFull(group, actionContainer, true);
        }
        else if (ele.classList.contains('bb-dockview-control-icon-full')) {
            toggleFull(group, actionContainer, false);
        }
        else if (ele.classList.contains('bb-dockview-control-icon-dock')) {
            dock(group);
        }
        else if (ele.classList.contains('bb-dockview-control-icon-float')) {
            float(group);
        }
        else if (ele.classList.contains('bb-dockview-control-icon-down')) {
            down(group, actionContainer, true);
        }
        else if (ele.classList.contains('bb-dockview-control-icon-close') && ele.parentElement.classList.contains('dv-right-actions-container')) {
            close(group, actionContainer, true);
        }
        else if (e.target.classList.contains('dv-default-tab-content')) {
            const targetTabEle = e.target.closest('.dv-tab')
            group.api.accessor.moveGroupOrPanel({
                from: { groupId: group.id, panelId: group.panels.find(p => p.view.tab.element.parentElement == targetTabEle).id },
                to: {
                    group,
                    position: 'center',
                    index: 0,
                },
            });
        }
        else if (ele.classList.contains('bb-dockview-control-icon-pin') || ele.classList.contains('bb-dockview-control-icon-pushpin')) {
            autoHide(group)
        }
    });
}

const autoHide = group => {
    const dockview = group.api.accessor;
    const type = group.model.location.type
    if (type == 'floating') {
        dock(group, 'drawer')
    }
    if (type == 'grid') {
        if (!canFloat(group)) return;
        // 1、点击图标创建浮动窗口并隐藏
        const { drawer = { width: 300, visible: true } } = group.getParams()

        const left = getOffsetFromDockview(group.element)
        const width = group.element.offsetWidth
        const dockviewWidth = dockview.element.querySelector('&>.dv-dockview').offsetWidth
        const isRight = ((left + width) == dockviewWidth && left > 0) || left > (dockviewWidth / 2)

        const rect = {
            position: {
                [isRight ? 'right' : 'left']: 0,
                top: 0
            },
            width: drawer.width,
            height: '100%',
            className: 'dv-resize-container-drawer'
        }
        group.setParams({ drawer, floatType: 'drawer', direction: isRight ? 'right' : 'left' })

        const floatingGroup = createFloatingGroup(group, rect, 'drawer')
        if (floatingGroup) {
            setTimeout(() => {
                createDrawerHandle(floatingGroup, isRight)
            }, 0);
            setTimeout(() => {
                saveConfig(dockview)
            }, 100);
        }
    }
}

function getOffsetFromDockview(element) {
    let offsetLeft = element.offsetLeft;
    let parent = element.offsetParent;
    while (parent && !parent.classList.contains('dv-dockview')) {
        offsetLeft += parent.offsetLeft;
        parent = parent.offsetParent;
    }
    return offsetLeft
}

const createDrawerHandle = (floatingGroup, isRight) => {
    const className = isRight ? 'bb-resize-container-right' : 'bb-resize-container-left'
    floatingGroup.element.parentElement.classList.add('dv-resize-container-drawer')
    floatingGroup.element.parentElement.classList.add(className)
    floatingGroup.activePanel.view.content.element.parentElement.classList.add('dv-render-overlay-float-drawer')
    createDrawerBtn(floatingGroup, isRight)
}

const createDrawerBtn = (floatingGroup, isRight) => {
    const dockview = floatingGroup.api.accessor
    const btn = document.createElement('div')
    const title = floatingGroup.activePanel?.title || floatingGroup.panels[0]?.title
    btn.innerHTML = title
    btn.setAttribute('groupid', dockview.id + '_' + floatingGroup.id)
    btn.classList.add('bb-dockview-aside-button')
    if (floatingGroup.element.parentElement.classList.contains('active')) {
        btn.classList.add('active')
    }

    btn.addEventListener('click', () => {
        const fgWrapper = floatingGroup.element.parentElement
        const activePanel = floatingGroup.activePanel
        const parentElement = activePanel.view.content.element.parentElement
        const direction = fgWrapper.style.left == 'auto' ? 'right' : 'left'
        dockview.floatingGroups.forEach(item => {
            const params = item.group.getParams()
            if (params.floatType == 'drawer' && item.group != floatingGroup) {
                item.group.element.parentElement.classList.remove('active')
                if (activePanel?.renderer == 'always' && parentElement) {
                    item.group.activePanel.view.content.element.parentElement.classList.remove('active');
                }
            }
        })
        btn.parentElement.parentElement.querySelectorAll('&>.bb-dockview-aside>.bb-dockview-aside-button').forEach(btnEle => {
            btnEle.classList.remove('active')
        })

        if (fgWrapper.classList.contains('active')) {
            fgWrapper.classList.remove('active')
            if (activePanel?.renderer == 'always' && parentElement) {
                parentElement.classList.remove('active')
            }
        } else {
            btn.classList.add('active')
            fgWrapper.classList.add('active')
            if (parentElement) {
                parentElement.classList.add('active')
            }
        }
        saveConfig(dockview)
    })
    const dvEleBox = dockview.element
    const className = `bb-dockview-aside-${isRight ? 'right' : 'left'}`
    let btnWrapper = dvEleBox.querySelector(`&>.${className}`)
    if (!btnWrapper) {
        btnWrapper = document.createElement('aside')
        btnWrapper.className = className + ' bb-dockview-aside'
        isRight ? dvEleBox.append(btnWrapper) : dvEleBox.prepend(btnWrapper)
    }
    btnWrapper.append(btn)
}

const removeDrawerBtn = group => {
    const parentEle = group.api.accessor.element.parentElement.parentElement
    const btnList = parentEle?.querySelectorAll(`[groupid="${group.api.accessor.id}_${group.id}"]`)
    btnList.forEach(btn => btn.remove())
}

const setDrawerTitle = group => {
    const title = group.activePanel?.title || group.panels[0]?.title
    const groupId = group.api.accessor.id + '_' + group.id
    const btnEle = group.api.accessor.element.parentElement.parentElement.querySelector(`.bb-dockview-aside>[groupId="${groupId}"]`)
    if (!btnEle) return
    btnEle.innerHTML = title
}

const removeActionEvent = group => {
    const actionContainer = group.header.element.querySelector('.dv-right-actions-container');

    EventHandler.off(actionContainer, 'click', '.bb-dockview-control-icon');
}

const toggleLock = (group, actionContainer, isLock) => {
    group.locked = isLock ? 'no-drop-target' : isLock
    group.panels.forEach(panel => panel.params.isLock = isLock);
    if (isLock) {
        actionContainer.classList.add('bb-lock')
    }
    else {
        actionContainer.classList.remove('bb-lock')
    }
    saveConfig(group.api.accessor)
}

const toggleFull = (group, actionContainer, maximize) => {
    const type = group.model.location.type;
    if (type === 'grid') {
        maximize ? group.api.exitMaximized() : group.api.maximize();
    }
    else if (type === 'floating') {
        maximize ? floatingExitMaximized(group) : floatingMaximize(group);
    }
    maximize ? actionContainer.classList.remove('bb-maximize') : actionContainer.classList.add('bb-maximize')
    if (maximize) {
        group.element.parentElement.classList.remove('bb-maximize')
    }
    else {
        group.element.parentElement.classList.add('bb-maximize')
    }
}

const float = group => {
    if (!canFloat(group)) return;
    if (group.api.isMaximized()) {
        toggleFull(group, group.header.rightActionsContainer, true);
    }
    const dockview = group.api.accessor
    const width = dockview.width > 500 ? 500 : (dockview.width - 10)
    const height = dockview.height > 460 ? 460 : (dockview.height - 10)
    const left = (dockview.width - width) / 2
    const top = (dockview.height - height) / 2
    const { rect, packup } = group.getParams()
    const floatingGroupRect = rect || {
        width, height: packup?.isPackup ? packup.height : height, position: { left, top }
    }
    const floatingGroup = createFloatingGroup(group, floatingGroupRect)
    saveConfig(dockview)
}

const canFloat = group => {
    if (group.locked) return false;
    const dockview = group.api.accessor;
    const gridGroups = dockview.groups.filter(g => g.panels.length > 0 && g.model.location.type === 'grid')
    if (gridGroups.length <= 1) return false;
    if (group.element.closest('.dv-resize-container')) return
    if (group.element.querySelector('.dv-resize-container')) return
    return true
}

const createFloatingGroup = (group, rect, groupType) => {
    const dockview = group.api.accessor
    const floatingGroup = dockview.createGroup({ id: getFloatingId(group.id) });
    observeFloatingGroupLocationChange(floatingGroup)
    const activePanel = group.activePanel
    group.panels.slice(0).forEach((panel, index) => {
        dockview.moveGroupOrPanel({
            from: { groupId: group.id, panelId: panel.id },
            to: { group: floatingGroup, position: 'center', index },
            skipRemoveGroup: true,
        })
    })
    dockview.setVisible(group, false)
    dockview.addFloatingGroup(floatingGroup, { ...rect, skipRemoveGroup: true })
    activePanel.api.setActive()
    const overlay = dockview.floatingGroups.find(fg => fg.group.id == floatingGroup.id).overlay
    observeOverlayChange(overlay, floatingGroup)
    observeGroup(floatingGroup)
    createGroupActions(floatingGroup, groupType)
    return floatingGroup
}
const observeOverlayChange = (overlay, group) => {
    overlay.onDidChangeEnd(e => {
        if (e.eventType == 'drag' && group.getParams().floatType == 'drawer') {
            removeDrawerBtn(group)
            const parentEle = group.element.parentElement
            parentEle.style.height = `${parentEle.getBoundingClientRect().height}px`
            parentEle.classList.remove('dv-resize-container-drawer')
            parentEle.classList.remove('bb-resize-container-right')
            parentEle.classList.remove('bb-resize-container-left')
            group.activePanel.view.content.element.parentElement.classList.remove('active')
            group.activePanel.view.content.element.parentElement.classList.remove('dv-render-overlay-float-drawer')
            group.removePropsOfParams('floatType')
            group.removePropsOfParams('direction')
            group.header.rightActionsContainer.classList.remove('bb-show-autohide')
            group.header.rightActionsContainer.classList.add('bb-show-float')
            group.header.rightActionsContainer.querySelector('.bb-dockview-control-icon-down').style.display = 'block'
        }
        saveConfig(group.api.accessor)
    })
}
const observeFloatingGroupLocationChange = group => {
    const dockview = group.api.accessor
    group.api.onDidLocationChange(e => {
        if (e.location.type == 'grid') {
            setTimeout(() => {
                let originalGroup = dockview.groups.find(g => g.id.split('_')[0] == group.id.split('_')[0])
                if (originalGroup) {
                    dockview.isClearing = true
                    dockview.removeGroup(originalGroup)
                    dockview.isClearing = false
                    group.header.rightActionsContainer.classList.remove('bb-float')
                    saveConfig(dockview)
                }
            }, 0)
            removeDrawerBtn(group)
            group.header.rightActionsContainer.classList.add('bb-pin')
        }
    })
}
const getFloatingId = id => {
    const arr = id.split('_')
    return arr.length == 1 ? id + '_floating' : arr[0]
}

const dock = (group, floatType) => {
    if (group.locked) return;
    const dockview = group.api.accessor
    const originGroup = dockview.groups.find(g => g.id.split('_')[0] == group.id.split('_')[0] && g.id != group.id)
    if (!originGroup) return
    dockview.setVisible(originGroup, true)
    const { drawer } = group.getParams()
    const inset = group.element.parentElement.style.inset.split(' ').map(item => isNaN(parseFloat(item)) ? item : parseFloat(item))
    const rect = {
        width: group.width + 2,
        height: group.height + 2,
        position: {}
    }
        ;['top', 'right', 'bottom', 'left'].forEach((key, index) => {
            if (typeof inset[index] == 'number') {
                rect.position[key] = inset[index]
            }
        })
    if (floatType == 'drawer') {
        group.setParams({ drawer: { ...drawer, width: rect.width } })
        group.removePropsOfParams('floatType')
        group.removePropsOfParams('direction')
        removeDrawerBtn(group)
        group.activePanel.view.content.element.parentElement.classList.remove('active')
        group.activePanel.view.content.element.parentElement.classList.remove('dv-render-overlay-float-drawer')
    }
    else {
        group.setParams({ rect })
    }
    dockview.moveGroup({
        from: { group: group },
        to: { group: originGroup, position: 'center' }
    })
    saveConfig(dockview)
}

const down = (group, actionContainer) => {
    const parentEle = group.element.parentElement
    const { top, bottom, height } = parentEle.style
    const tabHeight = group.header.element.offsetHeight || 30
    const { packup } = group.getParams();
    if (packup?.isPackup) {
        group.setParams({ packup: { ...packup, isPackup: false } })
        parentEle.style.height = `${packup.height}px`;
        if (top == 'auto') {
            parentEle.style.bottom = parseFloat(bottom) - (packup.height - tabHeight) + 'px'
        }
        actionContainer.classList.add('bb-up');
        group.panels.forEach(panel => panel.view.content.element.classList.remove('bb-overflowHidden'))
    }
    else {
        group.setParams({ packup: { isPackup: true, height: parseFloat(height) } });
        parentEle.style.height = `${tabHeight}px`;
        if (top == 'auto') {
            parentEle.style.bottom = parseFloat(bottom) + (parseFloat(height) - tabHeight) + 'px'
        }
        actionContainer.classList.remove('bb-up')
        group.panels.forEach(panel => panel.view.content.element.classList.add('bb-overflowHidden'))
    }
    saveConfig(group.api.accessor)
}

close = group => {
    if (!group.locked) {
        group.api.close()
    }
}

const floatingMaximize = group => {
    const parentEle = group.element.parentElement
    const { width: maxWidth, height: maxHeight } = group.api.accessor;
    const inset = parentEle.style.inset.split(' ').map(item => isNaN(parseFloat(item)) ? item : parseFloat(item))
    const rect = {
        width: group.width + 2,
        height: group.height + 2,
        position: {}
    }
        ;['top', 'right', 'bottom', 'left'].forEach((key, index) => {
            if (typeof inset[index] == 'number') {
                rect.position[key] = inset[index]
            }
        })
    group.setParams({ rect })

    parentEle.style.left = 0;
    parentEle.style.top = 0;
    parentEle.style.width = `${maxWidth}px`;
    parentEle.style.height = `${maxHeight}px`;
}

const floatingExitMaximized = group => {
    const parentEle = group.element.parentElement
    const { rect, rect: position } = group.getParams()
    const { top, right, bottom, left } = rect.position

    parentEle.style.inset = [top, right, bottom, left]
        .map(item => typeof item == 'number' ? (item + 'px') : 'auto').join(' ')
    parentEle.style.width = `${rect.width}px`;
    parentEle.style.height = `${rect.height}px`;
}

const setWidth = (observerList) => {
    observerList.forEach(({ target }) => {
        let header, tabsContainer
        if (target.classList.contains('dv-tabs-container')) {
            header = target.parentElement
            tabsContainer = target
        }
        else {
            header = target
            tabsContainer = header.querySelector('.dv-tabs-container')
        }
        let voidWidth = header.querySelector('.dv-void-container').offsetWidth
        let dropdown = header.querySelector('.dv-right-actions-container>.dropdown')
        if (!dropdown) return
        let dropMenu = dropdown.querySelector('.dropdown-menu')
        if (voidWidth === 0) {
            if (tabsContainer.children.length <= 1) return
            const inactiveTabs = header.querySelectorAll('.dv-tabs-container>.dv-inactive-tab')
            const lastTab = inactiveTabs[inactiveTabs.length - 1]
            const aEle = document.createElement('a')
            const liEle = document.createElement('li')
            aEle.className = 'dropdown-item'
            liEle.tabWidth = lastTab.offsetWidth;
            aEle.append(lastTab)
            liEle.append(aEle)
            dropMenu.insertAdjacentElement("afterbegin", liEle)
        }
        else {
            let firstLi = dropMenu.querySelector('li:has(.dv-active-tab)') || dropMenu.children[0]
            if (firstLi) {
                let firstTab = firstLi.querySelector('.dv-tab')
                if (voidWidth > firstLi.tabWidth || tabsContainer.children.length == 0) {
                    firstTab && tabsContainer.append(firstTab)
                    firstLi.remove()
                }
            }
        }
    })
}

export { onAddGroup, addGroupWithPanel, toggleLock, disposeGroup, observeFloatingGroupLocationChange, observeOverlayChange, createDrawerHandle, removeDrawerBtn, setDrawerTitle };
