import Data from '../../BootstrapBlazor/modules/data.js'

const getIcon = (name, hasTitle = true) => {
    const icons = getIcons();

    let icon = null;
    const control = icons.find(i => i.name === name);
    if (control) {
        icon = control.icon.cloneNode(true);
        if (!hasTitle) {
            icon.removeAttribute('title');
        }
    }
    return icon;
}

const getIcons = () => {
    let icons = Data.get('dockview-v2');
    if (icons === null) {
        const div = document.createElement('div')
        icons = ['bar', 'dropdown', 'autohide', 'lock', 'unlock', 'down', 'full', 'restore', 'float', 'dock', 'close'].map(v => {
            if(v == 'autohide'){
                div.innerHTML = ('<div class="bb-dockview-control-icon bb-dockview-control-icon-autohide" title="auto hide"><svg t="1723696991774" class="dockview-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3447" width="12" height="12"><path d="M530.09575405 1019.60295296l-36.16387022-0.00074142-23.72799796-341.06729075-227.83840257-0.02627872 67.40895558-67.40895557L309.76508394 116.75747327l2e-8 0-105.33027014-119.06722714L819.56330357-2.28634657l-105.33774169 119.05210601 0.01012803 494.34144163 67.41171763 67.41171762-227.83840256-0.02627873L530.09575405 1019.60295296zM649.76751938 116.77524485L374.21232108 116.7587932l-0.01225577 494.34221322 275.58761663 0.02725774L649.76751938 116.77524485z" p-id="3448"></path></svg></div>')
            }
            return {
                name: v,
                icon: v == 'autohide' ? div.children[0] : document.querySelector(`template > .bb-dockview-control-icon-${v}`)
            };
        });
        Data.set('dockview-v2', icons);
    }
    return icons;
}

export { getIcons, getIcon };
