import { DockviewComponent, DockviewGroupPanel, DockviewGroupPanelModel, getGridLocation, getRelativeLocation, DockviewEmitter } from "./dockview-core.esm.js"
import { getConfigFromStorage, saveConfig } from "./dockview-config.js"
import { disposeGroup, removeDrawerBtn } from "./dockview-group.js"
import { markFirstVisibleElement } from "./dockview-utils.js"

DockviewComponent.prototype.on = function(eventType, callback) {
    this['_' + eventType] = new DockviewEmitter();
    this['_' + eventType].event(callback)
}

const dispose = DockviewComponent.prototype.dispose;
DockviewComponent.prototype.dispose = function() {
    this.params.observer?.disconnect();
    this.groups.forEach(group => {
        if (group.mutationObserver) {
            group.mutationObserver.disconnect();
        }
    })
    saveConfig(this);
    dispose.call(this);
}

const groupDispose = DockviewGroupPanel.prototype.dispose
DockviewGroupPanel.prototype.dispose = function() {
    disposeGroup(this)
    groupDispose.call(this)
}
DockviewGroupPanel.prototype.getParams = function() {
    return this.activePanel?.params || {}
}

DockviewGroupPanel.prototype.setParams = function(data) {
    Object.keys(data).forEach(key => {
        this.panels.forEach(panel => panel.params[key] = data[key])
    })
}

DockviewGroupPanel.prototype.removePropsOfParams = function(keys) {
    return (keys instanceof Array)
        ? keys.map(key => this.panels.forEach(panel => delete panel.params[key]))
        : typeof keys == 'string' ? this.panels.forEach(panel => delete panel.params[keys]) : false
}

const removeGroup = DockviewComponent.prototype.removeGroup
DockviewComponent.prototype.removeGroup = function(...args) {
    if (this.isClearing) {
        return removeGroup.apply(this, args)
    }

    const group = args[0]
    const type = group.api.location.type;
    if (type == 'grid') {
        [...group.panels].forEach(panel => {
            panel.api.close()
        })
        this.setVisible(group, false)
    }
    else if (type == 'floating') {
        removeDrawerBtn(group)
        return removeGroup.apply(this, args)
    }
}

const closePanel = DockviewGroupPanelModel.prototype.closePanel;
DockviewGroupPanelModel.prototype.closePanel = function(panel, triggerVisibleChangedCallback = true, moveToTemplate = true) {
    if (!panel.group.locked) {
        closePanel.call(this, panel);
        if (triggerVisibleChangedCallback) {
            this.accessor._panelVisibleChanged?.fire({ key: panel.params.key, status: false });
        }
    }

    if (panel.view.content.element) {
        if (moveToTemplate) {
            if (panel.titleMenuEle) {
                panel.view.content.element.append(panel.titleMenuEle)
            }
            if (this.accessor.params.template) {
                this.accessor.params.template.append(panel.view.content.element)
            }
        }
        else {
            panel.view.content.element.remove()
        }
    }
}

const setVisible = DockviewComponent.prototype.setVisible
DockviewComponent.prototype.setVisible = function(...args) {
    setVisible.apply(this, args);
    const branch = getBranchByGroup(args[0])
    const { orientation, splitview: { sashes } } = branch

    if (args[1] === true) {
        args[0].element.parentElement.style.zIndex = 'initial'
        sashes?.forEach(sash => {
            if (sash.container.style.zIndex == '-1') {
                sash.container.style.zIndex = '99'
            }
        });
    }
    else if (args[1] === false) {
        args[0].element.parentElement.style.zIndex = '-1'
        const sizeStr = branch.size - 2 + 'px'
        sashes?.forEach(sash => {
            const { left, top } = sash.container.style
            if (
                (left == '0px' && top == '0px')
                || (orientation == 'HORIZONTAL' && left == sizeStr)
                || (orientation == 'VERTICAL' && top == sizeStr)
            ) {
                sash.container.style.zIndex = '-1'
            }
        });
    }
    markFirstVisibleElement(args[0])
}
function getBranchByGroup(group) {
    const groupEle = group.element
    const root = group.api.accessor.gridview.root
    return getBranch(root, groupEle)
}
function getBranch(branchNode, groupEle) {
    let sashes
    if (branchNode.children?.find(bn => bn.element === groupEle)) {
        return branchNode
    }
    else {
        for (let bn of branchNode.children.filter(child => child.children)) {
            sashes = getBranch(bn, groupEle)
            if (sashes) return sashes
        }
    }
}
