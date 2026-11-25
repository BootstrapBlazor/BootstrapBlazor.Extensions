const networkDiscoveryPaths = [
    '/ISAPI/System/Network/Bond',
    '/ISAPI/System/Network/interfaces',
    '/ISAPI/System/Network/PPPoE/1/status',
    '/ISAPI/System/Network/UPnP/ports/status',
    '/ISAPI/Security/adminAccesses'
];
const patchedControls = new WeakSet();
const patchedPluginPrototypes = new WeakSet();
const pluginPageHideHandlers = new WeakMap();

const withoutUnloadListener = (action, emptyOnly = false, shouldSuppress = () => true) => {
    const ownListener = Object.getOwnPropertyDescriptor(window, 'addEventListener');
    const addListener = window.addEventListener;
    const listeners = [];
    let completed = false;
    window.addEventListener = function (type, listener, options) {
        if (type !== 'unload' || (emptyOnly && !/^\s*function\s*\(\)\s*\{\s*\}\s*$/.test(String(listener)))) {
            return addListener.call(this, type, listener, options);
        }
        listeners.push({ target: this, type, listener, options });
    };
    try {
        const result = action();
        completed = true;
        return result;
    }
    finally {
        if (ownListener) {
            Object.defineProperty(window, 'addEventListener', ownListener);
        }
        else {
            delete window.addEventListener;
        }
        if (!completed || !shouldSuppress()) {
            listeners.forEach(({ target, type, listener, options }) => addListener.call(target, type, listener, options));
        }
    }
};

const usesLegacyUnload = plugin => typeof plugin?.fUnload === 'function' &&
    typeof plugin.JS_Disconnect === 'function' &&
    /\.off\(["']unload["']/.test(String(plugin.fUnload));

// The SDK's local service is private; intercept its synchronous listener registration only.
const patchPlugin = () => {
    if (patchedPluginPrototypes.has(JSVideoPlugin.prototype)) {
        return;
    }

    const originalInit = JSVideoPlugin.prototype.initLocalService;
    if (typeof originalInit !== 'function') {
        return;
    }
    const originalGetVideoPlugin = JSVideoPlugin.prototype._getVideoPlugin;
    if (typeof originalGetVideoPlugin === 'function') {
        JSVideoPlugin.prototype._getVideoPlugin = function (...args) {
            const onConnectSuccess = this.oOptions?.onConnectSuccess;
            if (typeof onConnectSuccess === 'function') {
                this.oOptions.onConnectSuccess = function (...callbackArgs) {
                    const log = console.log;
                    console.log = function (...logArgs) {
                        if (logArgs.length !== 2 || logArgs[0] !== 'uuid' || logArgs[1] !== callbackArgs[0]) {
                            return log.apply(this, logArgs);
                        }
                    };
                    try {
                        return onConnectSuccess.apply(this, callbackArgs);
                    }
                    finally {
                        console.log = log;
                    }
                };
            }
            return originalGetVideoPlugin.apply(this, args);
        };
    }
    JSVideoPlugin.prototype.initLocalService = function (...args) {
        const result = withoutUnloadListener(() => originalInit.apply(this, args), false, () => usesLegacyUnload(this.oPlugin));
        const plugin = this.oPlugin;
        if (usesLegacyUnload(plugin)) {
            const onPageHide = event => {
                if (!event.persisted) {
                    window.removeEventListener('pagehide', onPageHide);
                    pluginPageHideHandlers.delete(plugin);
                    plugin.JS_Disconnect();
                }
            };
            window.addEventListener('pagehide', onPageHide);
            pluginPageHideHandlers.set(plugin, onPageHide);
        }
        return result;
    };
    patchedPluginPrototypes.add(JSVideoPlugin.prototype);
};

const patchPluginMethods = checkVisibility => {
    const originalResize = JSVideoPlugin.prototype.JS_Resize;
    JSVideoPlugin.prototype.JS_Resize = function (e, t) {
        const { szId } = this.oOptions;
        const el = document.getElementById(szId);
        if (el) {
            const visible = checkVisibility(el);
            if (visible) {
                return originalResize.call(this, e, t);
            }
            else {
                WebVideoCtrl.I_HidPlugin();
            }
        }
    };

    const originalShowWnd = JSVideoPlugin.prototype.JS_ShowWnd;
    JSVideoPlugin.prototype.JS_ShowWnd = function () {
        const { szId } = this.oOptions;
        const el = document.getElementById(szId);
        if (el) {
            const visible = checkVisibility(el);
            if (visible) {
                return originalShowWnd.call(this);
            }
            else {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            }
        }
    };

    JSVideoPlugin.prototype.JS_DestroyPlugin = function (n) {
        const onPageHide = pluginPageHideHandlers.get(this.oPlugin);
        if (onPageHide) {
            window.removeEventListener('pagehide', onPageHide);
            pluginPageHideHandlers.delete(this.oPlugin);
        }
        const origianlSendRequestProxy = this.oPlugin.oRequest.oRequest.sendRequest;
        this.oPlugin.oRequest.oRequest.sendRequest = function (r) {
            if (this.oWebSocket && WebSocket.OPEN === this.oWebSocket.readyState) {
                return origianlSendRequestProxy.call(this, r);
            }
        };
        this.oPlugin.JS_DestroyPlugin(true);

        JSVideoPlugin = null;
        delete window.JSVideoPlugin;
        const scripts = [...document.head.querySelectorAll('script')];
        const nodes = scripts.filter(link => link.src.indexOf('/jsVideoPlugin-1.0.0.min.js') > -1);
        for (const node of nodes) {
            document.head.removeChild(node);
        }

        return new Promise((resolve, reject) => {
            resolve();
        });
    };
};

export const initHikVisionHacks = checkVisibility => {
    if (patchedControls.has(WebVideoCtrl)) {
        return;
    }

    const sendRequest = WebVideoCtrl.I_SendHTTPRequest;
    WebVideoCtrl.I_SendHTTPRequest = function (device, url, options) {
        const request = sendRequest.call(this, device, url, options);
        if (typeof url === 'string' && typeof options?.error === 'function' &&
            networkDiscoveryPaths.some(path => url.includes(path))) {
            request.catch(error => console.warn('HikVision network discovery request failed:', error));
        }
        return request;
    };

    const initPlugin = WebVideoCtrl.I_InitPlugin;
    WebVideoCtrl.I_InitPlugin = function (options) {
        const onComplete = options.cbInitPluginComplete;
        const patchedOptions = {
            ...options,
            cbInitPluginComplete(...args) {
                patchPlugin();
                return onComplete?.apply(this, args);
            }
        };
        return withoutUnloadListener(() => initPlugin.call(this, patchedOptions), true);
    };

    const insertPlugin = WebVideoCtrl.I_InsertOBJECTPlugin;
    WebVideoCtrl.I_InsertOBJECTPlugin = function (...args) {
        const log = console.log;
        console.log = function (...logArgs) {
            if (logArgs.length !== 1 || logArgs[0] !== '这个是标配插件') {
                return log.apply(this, logArgs);
            }
        };
        let insertion;
        try {
            insertion = insertPlugin.apply(this, args);
        }
        finally {
            console.log = log;
        }
        return insertion.then(result => {
            patchPluginMethods(checkVisibility);
            return result;
        }, error => {
            patchPluginMethods(checkVisibility);
            throw error;
        });
    };
    patchedControls.add(WebVideoCtrl);
};
