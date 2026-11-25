/**
 * dockview-core
 * @version 8.9.0
 * @link https://github.com/dockview/dockview
 * @license MIT
 */
//#region src/dnd/dataTransfer.ts
var _LocalSelectionTransfer;
var TransferObject = class {
	constructor() {}
};
var PanelTransfer = class extends TransferObject {
	constructor(viewId, groupId, panelId, tabGroupId) {
		super();
		this.viewId = viewId;
		this.groupId = groupId;
		this.panelId = panelId;
		this.tabGroupId = tabGroupId;
	}
};
var PaneTransfer = class extends TransferObject {
	constructor(viewId, paneId) {
		super();
		this.viewId = viewId;
		this.paneId = paneId;
	}
};
/**
* A singleton to store transfer data during drag & drop operations that are only valid within the application.
*/
var LocalSelectionTransfer = class LocalSelectionTransfer {
	constructor() {}
	static getInstance() {
		return LocalSelectionTransfer.INSTANCE;
	}
	hasData(proto) {
		return proto && proto === this.proto;
	}
	clearData(proto) {
		if (this.hasData(proto)) {
			this.proto = void 0;
			this.data = void 0;
		}
	}
	getData(proto) {
		if (this.hasData(proto)) return this.data;
	}
	setData(data, proto) {
		if (proto) {
			this.data = data;
			this.proto = proto;
		}
	}
};
_LocalSelectionTransfer = LocalSelectionTransfer;
LocalSelectionTransfer.INSTANCE = new _LocalSelectionTransfer();
function getPanelData() {
	const panelTransfer = LocalSelectionTransfer.getInstance();
	if (!panelTransfer.hasData(PanelTransfer.prototype)) return;
	return panelTransfer.getData(PanelTransfer.prototype)[0];
}
function getPaneData() {
	const paneTransfer = LocalSelectionTransfer.getInstance();
	if (!paneTransfer.hasData(PaneTransfer.prototype)) return;
	return paneTransfer.getData(PaneTransfer.prototype)[0];
}

//#endregion
//#region src/lifecycle.ts
let Disposable;
(function(_Disposable) {
	_Disposable.NONE = { dispose: () => {} };
	function from(func) {
		return { dispose: () => {
			func();
		} };
	}
	_Disposable.from = from;
})(Disposable || (Disposable = {}));
var CompositeDisposable = class {
	get isDisposed() {
		return this._isDisposed;
	}
	constructor(...args) {
		this._isDisposed = false;
		this._disposables = new Set(args);
	}
	addDisposables(...args) {
		args.forEach((arg) => this._disposables.add(arg));
	}
	removeDisposable(disposable) {
		this._disposables.delete(disposable);
	}
	dispose() {
		if (this._isDisposed) return;
		this._isDisposed = true;
		this._disposables.forEach((arg) => arg.dispose());
		this._disposables.clear();
	}
};
var MutableDisposable = class {
	constructor() {
		this._disposable = Disposable.NONE;
	}
	get value() {
		return this._disposable === Disposable.NONE ? void 0 : this._disposable;
	}
	set value(disposable) {
		if (this._disposable) this._disposable.dispose();
		this._disposable = disposable;
	}
	dispose() {
		if (this._disposable) {
			this._disposable.dispose();
			this._disposable = Disposable.NONE;
		}
	}
};

//#endregion
//#region src/events.ts
let Event;
(function(_Event) {
	_Event.map = (event, fn) => (listener) => event((e) => listener(fn(e)));
	_Event.any = (...children) => {
		return (listener) => {
			const disposables = children.map((child) => child(listener));
			return { dispose: () => {
				disposables.forEach((d) => {
					d.dispose();
				});
			} };
		};
	};
})(Event || (Event = {}));
var DockviewEvent = class {
	constructor() {
		this._defaultPrevented = false;
	}
	get defaultPrevented() {
		return this._defaultPrevented;
	}
	preventDefault() {
		this._defaultPrevented = true;
	}
};
var AcceptableEvent = class {
	constructor() {
		this._isAccepted = false;
	}
	get isAccepted() {
		return this._isAccepted;
	}
	accept() {
		this._isAccepted = true;
	}
};
var LeakageMonitor = class {
	constructor() {
		this.events = /* @__PURE__ */ new Map();
	}
	get size() {
		return this.events.size;
	}
	add(event, stacktrace) {
		this.events.set(event, stacktrace);
	}
	delete(event) {
		this.events.delete(event);
	}
	clear() {
		this.events.clear();
	}
};
var Stacktrace = class Stacktrace {
	static create() {
		var _Error$stack;
		return new Stacktrace((_Error$stack = (/* @__PURE__ */ new Error("listener stacktrace")).stack) !== null && _Error$stack !== void 0 ? _Error$stack : "");
	}
	constructor(value) {
		this.value = value;
	}
	print() {
		console.warn("dockview: stacktrace", this.value);
	}
};
var Listener = class {
	constructor(callback, stacktrace) {
		this.callback = callback;
		this.stacktrace = stacktrace;
	}
};
var Emitter = class Emitter {
	static setLeakageMonitorEnabled(isEnabled) {
		if (isEnabled !== Emitter.ENABLE_TRACKING) Emitter.MEMORY_LEAK_WATCHER.clear();
		Emitter.ENABLE_TRACKING = isEnabled;
	}
	get value() {
		return this._last;
	}
	constructor(options) {
		this.options = options;
		this._listeners = [];
		this._disposed = false;
	}
	get event() {
		if (!this._event) {
			this._event = (callback) => {
				var _this$options;
				if (((_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.replay) && this._last !== void 0) callback(this._last);
				const listener = new Listener(callback, Emitter.ENABLE_TRACKING ? Stacktrace.create() : void 0);
				this._listeners.push(listener);
				return { dispose: () => {
					const index = this._listeners.indexOf(listener);
					if (index > -1) this._listeners.splice(index, 1);
					else if (Emitter.ENABLE_TRACKING) {}
				} };
			};
			if (Emitter.ENABLE_TRACKING) Emitter.MEMORY_LEAK_WATCHER.add(this._event, Stacktrace.create());
		}
		return this._event;
	}
	fire(e) {
		var _this$options2;
		if (this._pauseTokens !== void 0 && this._pauseTokens.size > 0) return;
		if ((_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.replay) this._last = e;
		const listeners = this._listeners;
		const length = listeners.length;
		if (length === 0) return;
		if (length === 1) {
			listeners[0].callback(e);
			return;
		}
		for (const listener of listeners.slice()) listener.callback(e);
	}
	pause() {
		var _this$_pauseTokens;
		const token = {};
		(_this$_pauseTokens = this._pauseTokens) !== null && _this$_pauseTokens !== void 0 || (this._pauseTokens = /* @__PURE__ */ new Set());
		this._pauseTokens.add(token);
		return Disposable.from(() => {
			var _this$_pauseTokens2;
			return (_this$_pauseTokens2 = this._pauseTokens) === null || _this$_pauseTokens2 === void 0 ? void 0 : _this$_pauseTokens2.delete(token);
		});
	}
	dispose() {
		if (!this._disposed) {
			this._disposed = true;
			if (this._listeners.length > 0) if (Emitter.ENABLE_TRACKING) queueMicrotask(() => {
				for (const listener of this._listeners) {
					var _listener$stacktrace;
					console.warn("dockview: stacktrace", (_listener$stacktrace = listener.stacktrace) === null || _listener$stacktrace === void 0 ? void 0 : _listener$stacktrace.print());
				}
				this._listeners = [];
			});
			else this._listeners = [];
			if (Emitter.ENABLE_TRACKING && this._event) Emitter.MEMORY_LEAK_WATCHER.delete(this._event);
		}
	}
};
Emitter.ENABLE_TRACKING = false;
Emitter.MEMORY_LEAK_WATCHER = new LeakageMonitor();
function addDisposableListener(element, type, listener, options) {
	element.addEventListener(type, listener, options);
	return { dispose: () => {
		element.removeEventListener(type, listener, options);
	} };
}
/**
*
* Event Emitter that fires events from a Microtask callback, only one event will fire per event-loop cycle.
*
* It's kind of like using an `asapScheduler` in RxJs with additional logic to only fire once per event-loop cycle.
* This implementation exists to avoid external dependencies.
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask
* @see https://rxjs.dev/api/index/const/asapScheduler
*/
var AsapEvent = class {
	constructor() {
		this._onFired = new Emitter();
		this._currentFireCount = 0;
		this._pending = /* @__PURE__ */ new Set();
		this._queued = false;
		this.onEvent = (listener) => {
			const fireCountAtTimeOfEventSubscription = this._currentFireCount;
			return this._onFired.event((values) => {
				if (this._currentFireCount > fireCountAtTimeOfEventSubscription) listener(values);
			});
		};
	}
	fire(value) {
		this._currentFireCount++;
		this._pending.add(value);
		if (this._queued) return;
		this._queued = true;
		queueMicrotask(() => {
			this._queued = false;
			const values = this._pending;
			this._pending = /* @__PURE__ */ new Set();
			this._onFired.fire(values);
		});
	}
	dispose() {
		this._onFired.dispose();
	}
};

//#endregion
//#region src/dom.ts
var OverflowObserver = class extends CompositeDisposable {
	constructor(el) {
		super();
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		this._value = null;
		this.addDisposables(this._onDidChange, watchElementResize(el, (entry) => {
			const hasScrollX = entry.target.scrollWidth > entry.target.clientWidth;
			const hasScrollY = entry.target.scrollHeight > entry.target.clientHeight;
			this._value = {
				hasScrollX,
				hasScrollY
			};
			this._onDidChange.fire(this._value);
		}));
	}
};
function watchElementResize(element, cb) {
	const pendingFrames = /* @__PURE__ */ new Set();
	const observer = new ResizeObserver((entires) => {
		/**
		* Fast browser window resize produces Error: ResizeObserver loop limit exceeded.
		* The error isn't visible in browser console, doesn't affect functionality, but degrades performance.
		* See https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded/58701523#58701523
		*/
		let ran = false;
		let frame;
		frame = requestAnimationFrame(() => {
			ran = true;
			if (frame !== void 0) pendingFrames.delete(frame);
			const firstEntry = entires[0];
			cb(firstEntry);
		});
		if (!ran) pendingFrames.add(frame);
	});
	observer.observe(element);
	return { dispose: () => {
		observer.unobserve(element);
		observer.disconnect();
		for (const frame of pendingFrames) cancelAnimationFrame(frame);
		pendingFrames.clear();
	} };
}
const removeClasses = (element, ...classes) => {
	for (const classname of classes) if (element.classList.contains(classname)) element.classList.remove(classname);
};
const addClasses = (element, ...classes) => {
	for (const classname of classes) if (!element.classList.contains(classname)) element.classList.add(classname);
};
const toggleClass = (element, className, isToggled) => {
	const hasClass = element.classList.contains(className);
	if (isToggled && !hasClass) element.classList.add(className);
	if (!isToggled && hasClass) element.classList.remove(className);
};
function isAncestor(testChild, testAncestor) {
	while (testChild) {
		if (testChild === testAncestor) return true;
		testChild = testChild.parentNode;
	}
	return false;
}
function trackFocus(element) {
	return new FocusTracker(element);
}
/**
* Track focus on an element. Ensure tabIndex is set when an HTMLElement is not focusable by default
*/
var FocusTracker = class extends CompositeDisposable {
	constructor(element) {
		super();
		this._onDidFocus = new Emitter();
		this.onDidFocus = this._onDidFocus.event;
		this._onDidBlur = new Emitter();
		this.onDidBlur = this._onDidBlur.event;
		this.addDisposables(this._onDidFocus, this._onDidBlur);
		let hasFocus = isAncestor(getActiveElement(element), element);
		let loosingFocus = false;
		const onFocus = () => {
			loosingFocus = false;
			if (!hasFocus) {
				hasFocus = true;
				this._onDidFocus.fire();
			}
		};
		const onBlur = () => {
			if (hasFocus) {
				loosingFocus = true;
				globalThis.setTimeout(() => {
					if (loosingFocus) {
						loosingFocus = false;
						hasFocus = false;
						this._onDidBlur.fire();
					}
				}, 0);
			}
		};
		this._refreshStateHandler = () => {
			if (isAncestor(getActiveElement(element), element) !== hasFocus) if (hasFocus) onBlur();
			else onFocus();
		};
		this.addDisposables(addDisposableListener(element, "focus", onFocus, true));
		this.addDisposables(addDisposableListener(element, "blur", onBlur, true));
	}
	refreshState() {
		this._refreshStateHandler();
	}
};
const QUASI_PREVENT_DEFAULT_KEY = "dv-quasiPreventDefault";
function quasiPreventDefault(event) {
	event[QUASI_PREVENT_DEFAULT_KEY] = true;
}
function quasiDefaultPrevented(event) {
	return event[QUASI_PREVENT_DEFAULT_KEY];
}
/** Whether the event originated within any of `elements`. Checks the
*  composed path, so it also holds for elements inside a shadow root, which a
*  window or document listener sees retargeted to the shadow host. */
function isEventWithin(event, elements) {
	var _event$composedPath, _event$composedPath2;
	const path = (_event$composedPath = (_event$composedPath2 = event.composedPath) === null || _event$composedPath2 === void 0 ? void 0 : _event$composedPath2.call(event)) !== null && _event$composedPath !== void 0 ? _event$composedPath : [];
	if (path.length > 0) return elements.some((el) => path.includes(el));
	const target = event.target;
	return target instanceof Node && elements.some((el) => el.contains(target));
}
/** Every shadow root between `element` and its document, innermost first. An
*  element in a component nested inside another component sits in more than
*  one, and an event is cut at each boundary. */
function shadowRootsOf(node) {
	const roots = [];
	let root = node.getRootNode();
	while (isShadowRoot(root)) {
		roots.push(root);
		root = root.host.getRootNode();
	}
	return roots;
}
/**
* `element` as a listener rooted in `scope`'s tree sees it. A node in a shadow
* root *below* that tree is retargeted to its host there, repeatedly for
* nested roots; a node already in the same tree is returned unchanged. Omit
* `scope` (or pass a node in the document) for the document-level view, which
* is what a window listener gets.
*
* The scope matters: a layer living inside a shadow root must be able to tell
* its own elements apart, and retargeting everything out to the document would
* collapse them all onto the one host.
*/
function retargetInto(element, scope) {
	const scopeRoot = scope === null || scope === void 0 ? void 0 : scope.getRootNode();
	let current = element;
	let root = current.getRootNode();
	while (root !== scopeRoot && isShadowRoot(root)) {
		current = root.host;
		root = current.getRootNode();
	}
	return current;
}
function addStyles(document, styleSheetList, options = {}) {
	const styleSheets = Array.from(styleSheetList);
	const { nonce } = options;
	const resolvedNonce = typeof nonce === "function" ? nonce(document) : nonce;
	for (const styleSheet of styleSheets) {
		if (styleSheet.href) {
			const link = document.createElement("link");
			link.href = styleSheet.href;
			link.type = styleSheet.type;
			link.rel = "stylesheet";
			if (resolvedNonce) link.setAttribute("nonce", resolvedNonce);
			document.head.appendChild(link);
			continue;
		}
		let cssTexts = [];
		try {
			if (styleSheet.cssRules) cssTexts = Array.from(styleSheet.cssRules).map((rule) => rule.cssText);
		} catch (err) {
			console.warn("dockview: failed to access stylesheet rules due to security restrictions", err);
		}
		const fragment = document.createDocumentFragment();
		for (const rule of cssTexts) {
			const style = document.createElement("style");
			if (resolvedNonce) style.setAttribute("nonce", resolvedNonce);
			style.appendChild(document.createTextNode(rule));
			fragment.appendChild(style);
		}
		document.head.appendChild(fragment);
	}
}
function getDomNodePagePosition(domNode) {
	const { left, top, width, height } = domNode.getBoundingClientRect();
	return {
		left: left + window.scrollX,
		top: top + window.scrollY,
		width,
		height
	};
}
/**
* Check whether an element is in the DOM (including the Shadow DOM)
* @see https://terodox.tech/how-to-tell-if-an-element-is-in-the-dom-including-the-shadow-dom/
*/
function isInDocument(element) {
	let currentElement = element;
	while (currentElement === null || currentElement === void 0 ? void 0 : currentElement.parentNode) if (currentElement.parentNode === document) return true;
	else if (currentElement.parentNode instanceof DocumentFragment) currentElement = currentElement.parentNode.host;
	else currentElement = currentElement.parentNode;
	return false;
}
/** Duck-typed so it holds for a shadow root from another window's realm. */
function isShadowRoot(node) {
	return !!node && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in node && !!node.host;
}
/**
* The document or shadow root to hit-test (`elementFromPoint` /
* `elementsFromPoint`) against for `node`. Hit-testing on the document stops
* at a shadow host, so when dockview is mounted in a shadow root it has to go
* through that root to reach its own elements. Falls back to the owning
* document (which may be a popout's) for a detached node.
*/
function getHitTestRoot(node) {
	var _node$ownerDocument;
	const root = node.getRootNode();
	if (root !== node && typeof root.elementsFromPoint === "function") return root;
	return (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 ? _node$ownerDocument : document;
}
function addTestId(element, id) {
	element.dataset.testid = id;
}
/**
* Should be more efficient than element.querySelectorAll("*") since there
* is no need to store every element in-memory using this approach
*/
function allTagsNamesInclusiveOfShadowDoms(tagNames, rootNode) {
	const iframes = [];
	function findIframesInNode(node) {
		if (node.nodeType === Node.ELEMENT_NODE) {
			if (tagNames.includes(node.tagName)) iframes.push(node);
			if (node.shadowRoot) findIframesInNode(node.shadowRoot);
			for (const child of node.children) findIframesInNode(child);
		}
	}
	findIframesInNode(rootNode instanceof Document ? rootNode.documentElement : rootNode);
	return iframes;
}
function disableIframePointEvents(rootNode = document) {
	const iframes = allTagsNamesInclusiveOfShadowDoms(["IFRAME", "WEBVIEW"], rootNode);
	const original = /* @__PURE__ */ new WeakMap();
	for (const iframe of iframes) {
		original.set(iframe, iframe.style.pointerEvents);
		iframe.style.pointerEvents = "none";
	}
	return { release: () => {
		for (const iframe of iframes) {
			var _original$get;
			iframe.style.pointerEvents = (_original$get = original.get(iframe)) !== null && _original$get !== void 0 ? _original$get : "auto";
		}
		iframes.splice(0, iframes.length);
	} };
}
/**
* Suppress text selection for the duration of a pointer drag.
*
* A pointer drag is just a held button as far as the browser is concerned, so
* it selects text under the cursor as it travels. HTML5 drag-and-drop is
* exempt - the browser owns the gesture - which is why this is only needed on
* the pointer backend.
*
* `user-select: none` alone is not enough on WebKit: it starts the selection
* gesture from a mousedown on a `user-select: none` element unless that
* element is also natively draggable, then extends it into whatever the
* pointer crosses. Cancelling `selectstart` refuses that first extension,
* which ends the gesture for the rest of the drag.
*
* An existing selection is left alone: a mousedown on a `user-select: none`
* element does not clear one natively, and a pointer drag should not either.
*/
function disableTextSelection(rootNode = document) {
	const doc = rootNode instanceof Document ? rootNode : rootNode.ownerDocument;
	const root = doc === null || doc === void 0 ? void 0 : doc.documentElement;
	if (!doc || !root) return { release: () => void 0 };
	const properties = ["user-select", "-webkit-user-select"];
	const previous = properties.map((name) => [name, root.style.getPropertyValue(name)]);
	for (const name of properties) root.style.setProperty(name, "none");
	const onSelectStart = (event) => event.preventDefault();
	doc.addEventListener("selectstart", onSelectStart);
	return { release: () => {
		doc.removeEventListener("selectstart", onSelectStart);
		for (const [name, value] of previous) if (value) root.style.setProperty(name, value);
		else root.style.removeProperty(name);
	} };
}
function getDockviewTheme(element) {
	function toClassList(element) {
		const list = [];
		for (let i = 0; i < element.classList.length; i++) list.push(element.classList.item(i));
		return list;
	}
	let theme = void 0;
	let parent = element;
	while (parent !== null) {
		theme = toClassList(parent).find((cls) => cls.startsWith("dockview-theme-"));
		if (typeof theme === "string") break;
		if (parent.parentElement === null) {
			const root = parent.getRootNode();
			parent = isShadowRoot(root) ? root.host : null;
			continue;
		}
		parent = parent.parentElement;
	}
	return theme;
}
var Classnames = class {
	constructor(element) {
		this.element = element;
		this._classNames = [];
	}
	setClassNames(classNames) {
		for (const className of this._classNames) toggleClass(this.element, className, false);
		this._classNames = classNames.split(" ").filter((v) => v.trim().length > 0);
		for (const className of this._classNames) toggleClass(this.element, className, true);
	}
};
const DEBOUCE_DELAY = 100;
function isChildEntirelyVisibleWithinParent(child, parent) {
	const childPosition = getDomNodePagePosition(child);
	const parentPosition = getDomNodePagePosition(parent);
	if (childPosition.left < parentPosition.left) return false;
	if (childPosition.left + childPosition.width > parentPosition.left + parentPosition.width) return false;
	if (childPosition.top < parentPosition.top) return false;
	if (childPosition.top + childPosition.height > parentPosition.top + parentPosition.height) return false;
	return true;
}
function onDidWindowMoveEnd(window) {
	const emitter = new Emitter();
	let previousScreenX = window.screenX;
	let previousScreenY = window.screenY;
	let timeout;
	let rafHandle = 0;
	let stopped = false;
	const checkMovement = () => {
		if (stopped || window.closed) return;
		const currentScreenX = window.screenX;
		const currentScreenY = window.screenY;
		if (currentScreenX !== previousScreenX || currentScreenY !== previousScreenY) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				emitter.fire();
			}, DEBOUCE_DELAY);
			previousScreenX = currentScreenX;
			previousScreenY = currentScreenY;
		}
		rafHandle = requestAnimationFrame(checkMovement);
	};
	checkMovement();
	const disposeEmitter = emitter.dispose.bind(emitter);
	emitter.dispose = () => {
		if (!stopped) {
			stopped = true;
			cancelAnimationFrame(rafHandle);
			clearTimeout(timeout);
		}
		disposeEmitter();
	};
	return emitter;
}
function onDidWindowResizeEnd(element, cb) {
	let resizeTimeout;
	return new CompositeDisposable(addDisposableListener(element, "resize", () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			cb();
		}, DEBOUCE_DELAY);
	}), Disposable.from(() => clearTimeout(resizeTimeout)));
}
function shiftAbsoluteElementIntoView(element, root, options) {
	var _options$buffer;
	const buffer = (_options$buffer = options === null || options === void 0 ? void 0 : options.buffer) !== null && _options$buffer !== void 0 ? _options$buffer : 10;
	const rect = element.getBoundingClientRect();
	const rootRect = root.getBoundingClientRect();
	let translateX = 0;
	let translateY = 0;
	const left = rect.left - rootRect.left;
	const top = rect.top - rootRect.top;
	const bottom = rect.bottom - rootRect.bottom;
	const right = rect.right - rootRect.right;
	if (left < buffer) translateX = buffer - left;
	else if (right > buffer) translateX = -buffer - right;
	if (top < buffer) translateY = buffer - top;
	else if (bottom > buffer) translateY = -bottom - buffer;
	if (translateX !== 0 || translateY !== 0) element.style.transform = `translate(${translateX}px, ${translateY}px)`;
}
function findRelativeZIndexParent(el) {
	let tmp = el;
	while (tmp && (tmp.style.zIndex === "auto" || tmp.style.zIndex === "")) tmp = tmp.parentElement;
	return tmp;
}
/** Whether the user has requested reduced motion: the JS counterpart to the
*  `prefers-reduced-motion` media query, for animations driven in script. */
function prefersReducedMotion(doc = document) {
	var _doc$defaultView, _doc$defaultView$matc;
	const mq = (_doc$defaultView = doc.defaultView) === null || _doc$defaultView === void 0 || (_doc$defaultView$matc = _doc$defaultView.matchMedia) === null || _doc$defaultView$matc === void 0 ? void 0 : _doc$defaultView$matc.call(_doc$defaultView, "(prefers-reduced-motion: reduce)");
	return !!(mq === null || mq === void 0 ? void 0 : mq.matches);
}
/** The first opaque computed background colour walking up from `element` (the
*  element itself, then its ancestors). Use to give a floating/overlapping
*  surface a non-see-through backdrop derived from the live DOM. Returns `''`
*  when nothing opaque is found (let the stylesheet decide). */
function resolveOpaqueBackground(element) {
	const win = element.ownerDocument.defaultView;
	if (!win) return "";
	let el = element;
	while (el) {
		const bg = win.getComputedStyle(el).backgroundColor;
		if (bg && bg !== "transparent" && !/,\s*0\)\s*$/.test(bg)) return bg;
		el = el.parentElement;
	}
	return "";
}
/** The focused element as seen from `node`'s own tree. Unlike
*  `document.activeElement`, which is the shadow host when focus is inside a
*  shadow root, this reaches into the root `node` lives in (and a popout's
*  own document), while a web component nested inside that tree still
*  resolves to its host there. */
function getActiveElement(node) {
	var _root$activeElement;
	const root = node.getRootNode();
	const doc = root.nodeType === Node.DOCUMENT_NODE ? root : node.ownerDocument;
	if (doc && typeof doc.hasFocus === "function" && !doc.hasFocus()) return null;
	return (_root$activeElement = root.activeElement) !== null && _root$activeElement !== void 0 ? _root$activeElement : null;
}
/** Where to append a floating element (e.g. a drag ghost) for `node`: its
*  shadow root when it lives in one, so styles scoped there still apply,
*  otherwise the body of its own document (which may be a popout's). */
function getOverlayParent(node) {
	var _node$ownerDocument2;
	const root = node.getRootNode();
	if (isShadowRoot(root)) return root;
	return ((_node$ownerDocument2 = node.ownerDocument) !== null && _node$ownerDocument2 !== void 0 ? _node$ownerDocument2 : document).body;
}

//#endregion
//#region \0@oxc-project+runtime@0.139.0/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(n, t, e, r, o, a, c) {
	try {
		var i = n[a](c), u = i.value;
	} catch (n) {
		e(n);
		return;
	}
	i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
	return function() {
		var t = this, e = arguments;
		return new Promise(function(r, o) {
			var a = n.apply(t, e);
			function _next(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
			}
			function _throw(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
			}
			_next(void 0);
		});
	};
}

//#endregion
//#region src/popoutWindow.ts
/**
* Throwing form of {@link getPopoutUrlError}, for callers with no way to
* recover from a refused URL.
*/
function assertSameOriginPopoutUrl(url) {
	const error = getPopoutUrlError(url);
	if (error) throw error;
}
/**
* Schemes a popout must never open: each runs script in a context the browser
* still associates with the opener, or (for `file:`) has no origin to check.
*/
const UNSAFE_POPOUT_PROTOCOLS = /* @__PURE__ */ new Set([
	"javascript:",
	"data:",
	"blob:",
	"vbscript:",
	"file:"
]);
/** How often an open popout window's `closed` flag is checked. */
const CLOSED_POLL_INTERVAL_MS = 250;
/**
* The reason `url` is unusable as a popout target, or `undefined` if it is
* allowed. Rejects anything that isn't same-origin with the page (scheme and
* host, so a packaged webview's own scheme such as `tauri://` qualifies), and
* the `javascript:`, `data:`, `blob:`, `vbscript:` and `file:` schemes that
* would otherwise execute in a context the browser still associates with the
* opener via `window.opener`.
*
* Callers that can recover from a refusal use this rather than catching, so it
* can be handled without a rejected promise. `page` is what the URL resolves
* against, and defaults to this page.
*/
function getPopoutUrlError(url, page = globalThis.location) {
	let resolved;
	try {
		resolved = new URL(url, page.href);
	} catch (_unused) {
		return /* @__PURE__ */ new Error(`dockview: invalid popout URL: ${url}`);
	}
	if (UNSAFE_POPOUT_PROTOCOLS.has(resolved.protocol)) return /* @__PURE__ */ new Error(`dockview: popout URL must not use the "${resolved.protocol}" protocol, which would run in the opener's context; got: ${url}`);
	if (!(resolved.protocol === page.protocol && resolved.host === page.host)) return /* @__PURE__ */ new Error(`dockview: popout URL must be same-origin with the page (${page.protocol}//${page.host}); got: ${url}`);
}
var PopoutWindow = class extends CompositeDisposable {
	get window() {
		var _this$_window$value, _this$_window;
		return (_this$_window$value = (_this$_window = this._window) === null || _this$_window === void 0 ? void 0 : _this$_window.value) !== null && _this$_window$value !== void 0 ? _this$_window$value : null;
	}
	/** Set when {@link open} resolved `null`, saying which way it failed. */
	get failure() {
		return this._failure;
	}
	constructor(target, className, options) {
		super();
		this.target = target;
		this.className = className;
		this.options = options;
		this._onWillClose = new Emitter();
		this.onWillClose = this._onWillClose.event;
		this._onDidClose = new Emitter();
		this.onDidClose = this._onDidClose.event;
		this._window = null;
		this.addDisposables(this._onWillClose, this._onDidClose);
	}
	/**
	* Close before `super.dispose()` kills the close emitters, so an explicit
	* dispose still fires `onWillClose` / `onDidClose` (the component's
	* per-window teardown hangs off them). A closed window is a no-op.
	*/
	dispose() {
		this.close();
		super.dispose();
	}
	dimensions() {
		if (!this._window) return null;
		const left = this._window.value.screenX;
		return {
			top: this._window.value.screenY,
			left,
			width: this._window.value.innerWidth,
			height: this._window.value.innerHeight
		};
	}
	close() {
		var _this$options$onWillC, _this$options;
		const current = this._window;
		if (!current) return;
		this._window = null;
		this._onWillClose.fire();
		(_this$options$onWillC = (_this$options = this.options).onWillClose) === null || _this$options$onWillC === void 0 || _this$options$onWillC.call(_this$options, {
			id: this.target,
			window: current.value
		});
		current.disposable.dispose();
		this._onDidClose.fire();
	}
	open() {
		var _this = this;
		return _asyncToGenerator(function* () {
			var _this$options$onDidOp, _this$options2;
			if (_this._window) throw new Error("instance of popout window is already open");
			const url = `${_this.options.url}`;
			assertSameOriginPopoutUrl(url);
			const features = Object.entries({
				top: _this.options.top,
				left: _this.options.left,
				width: _this.options.width,
				height: _this.options.height
			}).map(([key, value]) => `${key}=${value}`).join(",");
			/**
			* @see https://developer.mozilla.org/en-US/docs/Web/API/Window/open
			*/
			const externalWindow = window.open(url, _this.target, features);
			if (!externalWindow) {
				_this._failure = { reason: "blocked" };
				return null;
			}
			const disposable = new CompositeDisposable();
			_this._window = {
				value: externalWindow,
				disposable
			};
			disposable.addDisposables(Disposable.from(() => {
				externalWindow.close();
			}), _this.watchForClose(externalWindow), addDisposableListener(globalThis.window, "beforeunload", () => {
				/**
				* before the main window closes we should close this popup too
				* to be good citizens
				*
				* @see https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
				*/
				_this.close();
			}));
			const container = _this.createPopoutWindowContainer();
			if (_this.className) container.classList.add(_this.className);
			(_this$options$onDidOp = (_this$options2 = _this.options).onDidOpen) === null || _this$options$onDidOp === void 0 || _this$options$onDidOp.call(_this$options2, {
				id: _this.target,
				window: externalWindow
			});
			return new Promise((resolve) => {
				/**
				* A host can answer `window.open` with a window in its own
				* JavaScript context, which throws on first touch and cannot be
				* filled with panel DOM. Settle as a blocked popup does, so the
				* caller's fallback returns the group to the grid.
				*/
				const abandon = (err) => {
					_this._failure = {
						reason: "unscriptable",
						error: err instanceof Error ? err : new Error(String(err))
					};
					_this.close();
					resolve(null);
				};
				try {
					externalWindow.addEventListener("unload", () => {});
				} catch (err) {
					abandon(err);
					return;
				}
				/**
				* `load` is the only event that resolves this promise with a
				* container, so a window that goes away first would leave the
				* caller awaiting a promise that never settles - and
				* `addPopoutGroup` holds its layout transaction open until it does.
				* Settle with `null` on close, the same signal a blocked popup
				* gives and one the caller already handles. `resolve` after the
				* fact is a no-op, so a `load` that arrived first still wins.
				*/
				disposable.addDisposables(_this.onWillClose(() => {
					var _this$_failure;
					(_this$_failure = _this._failure) !== null && _this$_failure !== void 0 || (_this._failure = { reason: "closed" });
					resolve(null);
				}));
				externalWindow.addEventListener("load", () => {
					/**
					* @see https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
					*/
					try {
						var _globalThis$document$, _this$options$styleRo, _this$options3;
						const externalDocument = externalWindow.document;
						externalDocument.title = document.title;
						externalDocument.body.appendChild(container);
						addStyles(externalDocument, [...Array.from(globalThis.document.styleSheets), ...(_globalThis$document$ = globalThis.document.adoptedStyleSheets) !== null && _globalThis$document$ !== void 0 ? _globalThis$document$ : []], { nonce: _this.options.nonce });
						const sheets = [];
						for (let root = (_this$options$styleRo = (_this$options3 = _this.options).styleRoot) === null || _this$options$styleRo === void 0 ? void 0 : _this$options$styleRo.call(_this$options3); isShadowRoot(root); root = root.host.getRootNode()) {
							var _root$styleSheets, _root$adoptedStyleShe;
							sheets.push(...Array.from((_root$styleSheets = root.styleSheets) !== null && _root$styleSheets !== void 0 ? _root$styleSheets : []), ...(_root$adoptedStyleShe = root.adoptedStyleSheets) !== null && _root$adoptedStyleShe !== void 0 ? _root$adoptedStyleShe : []);
						}
						if (sheets.length > 0) addStyles(externalDocument, sheets, { nonce: _this.options.nonce });
						/**
						* beforeunload must be registered after load for reasons I could not determine
						* otherwise the beforeunload event will not fire when the window is closed
						*/
						addDisposableListener(externalWindow, "beforeunload", () => {
							/**
							* @see https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
							*/
							_this.close();
						});
						resolve(container);
					} catch (err) {
						abandon(err);
					}
				});
			});
		})();
	}
	/**
	* Backstop for the `beforeunload` signal, which a window torn down without
	* running its unload handlers never sends: a native shell destroying the
	* webview, or a browser discarding the page. `closed` is readable on any
	* handle, cross-origin included. Whichever signal arrives first wins.
	*/
	watchForClose(externalWindow) {
		if (typeof externalWindow.closed !== "boolean") return Disposable.NONE;
		const handle = setInterval(() => {
			if (externalWindow.closed) this.close();
		}, CLOSED_POLL_INTERVAL_MS);
		return Disposable.from(() => {
			clearInterval(handle);
		});
	}
	createPopoutWindowContainer() {
		const el = document.createElement("div");
		el.classList.add("dv-popout-window");
		el.id = "dv-popout-window";
		el.style.position = "absolute";
		el.style.width = "100%";
		el.style.height = "100%";
		el.style.top = "0px";
		el.style.left = "0px";
		return el;
	}
};

//#endregion
//#region src/array.ts
function tail(arr) {
	if (arr.length === 0) throw new Error("Invalid tail call");
	return [arr.slice(0, arr.length - 1), arr[arr.length - 1]];
}
function sequenceEquals(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false;
	return true;
}
/**
* Pushes an element to the start of the array, if found.
*/
function pushToStart(arr, value) {
	const index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
		arr.unshift(value);
	}
}
/**
* Pushes an element to the end of the array, if found.
*/
function pushToEnd(arr, value) {
	const index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
		arr.push(value);
	}
}
function firstIndex(array, fn) {
	for (let i = 0; i < array.length; i++) {
		const element = array[i];
		if (fn(element)) return i;
	}
	return -1;
}
function remove(array, value) {
	const index = array.indexOf(value);
	if (index > -1) {
		array.splice(index, 1);
		return true;
	}
	return false;
}

//#endregion
//#region src/math.ts
const clamp = (value, min, max) => {
	if (min > max)
 /**
	* caveat: an error should be thrown here if this was a proper `clamp` function but we need to handle
	* cases where `min` > `max` and in those cases return `min`.
	*/
	return min;
	return Math.min(max, Math.max(value, min));
};
const sequentialNumberGenerator = () => {
	let value = 1;
	return { next: () => (value++).toString() };
};
const range = (from, to) => {
	const result = [];
	if (typeof to !== "number") {
		to = from;
		from = 0;
	}
	if (from <= to) for (let i = from; i < to; i++) result.push(i);
	else for (let i = from; i > to; i--) result.push(i);
	return result;
};

//#endregion
//#region src/splitview/viewItem.ts
var ViewItem = class {
	set size(size) {
		this._size = size;
	}
	setContainerGeometry(prop, value) {
		if (this._appliedStyles[prop] === value) return;
		this._appliedStyles[prop] = value;
		this.container.style[prop] = value;
	}
	get size() {
		return this._size;
	}
	get cachedVisibleSize() {
		return this._cachedVisibleSize;
	}
	get visible() {
		return this._cachedVisibleSize === void 0;
	}
	get minimumSize() {
		return this.visible ? this.view.minimumSize : 0;
	}
	get viewMinimumSize() {
		return this.view.minimumSize;
	}
	get maximumSize() {
		return this.visible ? this.view.maximumSize : 0;
	}
	get viewMaximumSize() {
		return this.view.maximumSize;
	}
	get priority() {
		return this.view.priority;
	}
	get snap() {
		return !!this.view.snap;
	}
	set enabled(enabled) {
		this.container.style.pointerEvents = enabled ? "" : "none";
	}
	constructor(container, view, size, disposable) {
		this.container = container;
		this.view = view;
		this.disposable = disposable;
		this._cachedVisibleSize = void 0;
		this._appliedStyles = {};
		if (typeof size === "number") {
			this._size = size;
			this._cachedVisibleSize = void 0;
			container.classList.add("visible");
		} else {
			this._size = 0;
			this._cachedVisibleSize = size.cachedVisibleSize;
		}
	}
	setVisible(visible, size) {
		if (visible === this.visible) return;
		if (visible) {
			var _this$_cachedVisibleS;
			const cachedVisibleSize = (_this$_cachedVisibleS = this._cachedVisibleSize) !== null && _this$_cachedVisibleS !== void 0 ? _this$_cachedVisibleS : 0;
			this._cachedVisibleSize = void 0;
			this.size = clamp(cachedVisibleSize, this.viewMinimumSize, this.viewMaximumSize);
		} else {
			this._cachedVisibleSize = typeof size === "number" ? size : this.size;
			this.size = 0;
		}
		this.container.classList.toggle("visible", visible);
		if (this.view.setVisible) this.view.setVisible(visible);
	}
	/**
	* Rescales the size, or the cached size while hidden, by `factor`.
	*/
	scale(factor) {
		if (this._cachedVisibleSize !== void 0) {
			this._cachedVisibleSize = Math.round(this._cachedVisibleSize * factor);
			return;
		}
		this.size = clamp(Math.round(this.size * factor), this.minimumSize, this.maximumSize);
	}
	dispose() {
		this.disposable.dispose();
		return this.view;
	}
};

//#endregion
//#region src/splitview/splitview.ts
let Orientation = /* @__PURE__ */ function(Orientation) {
	Orientation["HORIZONTAL"] = "HORIZONTAL";
	Orientation["VERTICAL"] = "VERTICAL";
	return Orientation;
}({});
let SashState = /* @__PURE__ */ function(SashState) {
	SashState[SashState["MAXIMUM"] = 0] = "MAXIMUM";
	SashState[SashState["MINIMUM"] = 1] = "MINIMUM";
	SashState[SashState["DISABLED"] = 2] = "DISABLED";
	SashState[SashState["ENABLED"] = 3] = "ENABLED";
	return SashState;
}({});
let LayoutPriority = /* @__PURE__ */ function(LayoutPriority) {
	LayoutPriority["Low"] = "low";
	LayoutPriority["High"] = "high";
	LayoutPriority["Normal"] = "normal";
	return LayoutPriority;
}({});
function setSashPosition(sash, left, top) {
	if (sash.appliedLeft !== left) {
		sash.appliedLeft = left;
		sash.container.style.left = left;
	}
	if (sash.appliedTop !== top) {
		sash.appliedTop = top;
		sash.container.style.top = top;
	}
}
let Sizing;
(function(_Sizing) {
	_Sizing.Distribute = { type: "distribute" };
	function Split(index) {
		return {
			type: "split",
			index
		};
	}
	_Sizing.Split = Split;
	function Invisible(cachedVisibleSize) {
		return {
			type: "invisible",
			cachedVisibleSize
		};
	}
	_Sizing.Invisible = Invisible;
})(Sizing || (Sizing = {}));
var Splitview = class {
	get contentSize() {
		return this._contentSize;
	}
	get size() {
		return this._size;
	}
	set size(value) {
		this._size = value;
	}
	get orthogonalSize() {
		return this._orthogonalSize;
	}
	set orthogonalSize(value) {
		this._orthogonalSize = value;
	}
	get length() {
		return this.viewItems.length;
	}
	get proportions() {
		return this._proportions ? [...this._proportions] : void 0;
	}
	get proportionalLayout() {
		return this._proportionalLayout;
	}
	set proportionalLayout(value) {
		if (this._proportionalLayout === value) return;
		this._proportionalLayout = value;
		if (value) this.saveProportions();
		else this._proportions = void 0;
	}
	get orientation() {
		return this._orientation;
	}
	set orientation(value) {
		if (this._orientation === value) return;
		this._orientation = value;
		const tmp = this.size;
		this.size = this.orthogonalSize;
		this.orthogonalSize = tmp;
		this.rescaleViews(this.size);
		removeClasses(this.element, "dv-horizontal", "dv-vertical");
		this.element.classList.add(this.orientation == "HORIZONTAL" ? "dv-horizontal" : "dv-vertical");
	}
	get minimumSize() {
		return this.viewItems.reduce((r, item) => r + item.minimumSize, 0);
	}
	get maximumSize() {
		return this.length === 0 ? Number.POSITIVE_INFINITY : this.viewItems.reduce((r, item) => r + item.maximumSize, 0);
	}
	get startSnappingEnabled() {
		return this._startSnappingEnabled;
	}
	set startSnappingEnabled(startSnappingEnabled) {
		if (this._startSnappingEnabled === startSnappingEnabled) return;
		this._startSnappingEnabled = startSnappingEnabled;
		this.updateSashEnablement();
	}
	get endSnappingEnabled() {
		return this._endSnappingEnabled;
	}
	set endSnappingEnabled(endSnappingEnabled) {
		if (this._endSnappingEnabled === endSnappingEnabled) return;
		this._endSnappingEnabled = endSnappingEnabled;
		this.updateSashEnablement();
	}
	get disabled() {
		return this._disabled;
	}
	set disabled(value) {
		this._disabled = value;
		toggleClass(this.element, "dv-splitview-disabled", value);
	}
	get margin() {
		return this._margin;
	}
	/**
	* The size each visible view gives up to the margins: `n` visible views
	* are separated by `n - 1` margins, spread evenly over the `n`.
	*/
	get marginShare() {
		let visibleViewCount = 0;
		for (const item of this.viewItems) if (item.visible) visibleViewCount++;
		return this.marginShareFor(visibleViewCount);
	}
	set margin(value) {
		this._margin = value;
		toggleClass(this.element, "dv-splitview-has-margin", value !== 0);
	}
	constructor(container, options) {
		var _options$orientation, _options$margin;
		this.container = container;
		this.viewItems = [];
		this.sashes = [];
		this._size = 0;
		this._orthogonalSize = 0;
		this._contentSize = 0;
		this._proportions = void 0;
		this._startSnappingEnabled = true;
		this._endSnappingEnabled = true;
		this._disabled = false;
		this._margin = 0;
		this._onDidSashEnd = new Emitter();
		this.onDidSashEnd = this._onDidSashEnd.event;
		this._onDidAddView = new Emitter();
		this.onDidAddView = this._onDidAddView.event;
		this._onDidRemoveView = new Emitter();
		this.onDidRemoveView = this._onDidRemoveView.event;
		this.resize = (index, delta, sizes = this.viewItems.map((x) => x.size), lowPriorityIndexes, highPriorityIndexes, overloadMinDelta = Number.NEGATIVE_INFINITY, overloadMaxDelta = Number.POSITIVE_INFINITY, snapBefore, snapAfter) => {
			if (index < 0 || index > this.viewItems.length) return 0;
			const upIndexes = range(index, -1);
			const downIndexes = range(index + 1, this.viewItems.length);
			if (highPriorityIndexes) for (const i of highPriorityIndexes) {
				pushToStart(upIndexes, i);
				pushToStart(downIndexes, i);
			}
			if (lowPriorityIndexes) for (const i of lowPriorityIndexes) {
				pushToEnd(upIndexes, i);
				pushToEnd(downIndexes, i);
			}
			const minDeltaUp = upIndexes.reduce((_, i) => _ + this.viewItems[i].minimumSize - sizes[i], 0);
			const maxDeltaUp = upIndexes.reduce((_, i) => _ + this.viewItems[i].maximumSize - sizes[i], 0);
			const maxDeltaDown = downIndexes.length === 0 ? Number.POSITIVE_INFINITY : downIndexes.reduce((_, i) => _ + sizes[i] - this.viewItems[i].minimumSize, 0);
			const minDeltaDown = downIndexes.length === 0 ? Number.NEGATIVE_INFINITY : downIndexes.reduce((_, i) => _ + sizes[i] - this.viewItems[i].maximumSize, 0);
			const minDelta = Math.max(minDeltaUp, minDeltaDown);
			const maxDelta = Math.min(maxDeltaDown, maxDeltaUp);
			let snapped = false;
			if (snapBefore) {
				const snapView = this.viewItems[snapBefore.index];
				const visible = delta >= snapBefore.limitDelta;
				snapped = visible !== snapView.visible;
				snapView.setVisible(visible, snapBefore.size);
			}
			if (!snapped && snapAfter) {
				const snapView = this.viewItems[snapAfter.index];
				const visible = delta < snapAfter.limitDelta;
				snapped = visible !== snapView.visible;
				snapView.setVisible(visible, snapAfter.size);
			}
			if (snapped) return this.resize(index, delta, sizes, lowPriorityIndexes, highPriorityIndexes, overloadMinDelta, overloadMaxDelta);
			const tentativeDelta = clamp(delta, minDelta, maxDelta);
			let actualDelta = 0;
			let deltaUp = tentativeDelta;
			for (const upIndex of upIndexes) {
				const item = this.viewItems[upIndex];
				const priorSize = sizes[upIndex];
				const size = clamp(priorSize + deltaUp, item.minimumSize, item.maximumSize);
				const viewDelta = size - priorSize;
				actualDelta += viewDelta;
				deltaUp -= viewDelta;
				item.size = size;
			}
			let deltaDown = actualDelta;
			for (const downIndex of downIndexes) {
				const item = this.viewItems[downIndex];
				const priorSize = sizes[downIndex];
				const size = clamp(priorSize - deltaDown, item.minimumSize, item.maximumSize);
				const viewDelta = size - priorSize;
				deltaDown += viewDelta;
				item.size = size;
			}
			return delta;
		};
		this._orientation = (_options$orientation = options.orientation) !== null && _options$orientation !== void 0 ? _options$orientation : "VERTICAL";
		this.element = this.createContainer();
		this.margin = (_options$margin = options.margin) !== null && _options$margin !== void 0 ? _options$margin : 0;
		this._proportionalLayout = options.proportionalLayout === void 0 ? true : !!options.proportionalLayout;
		this.viewContainer = this.createViewContainer();
		this.sashContainer = this.createSashContainer();
		this.element.appendChild(this.sashContainer);
		this.element.appendChild(this.viewContainer);
		this.container.appendChild(this.element);
		this.style(options.styles);
		if (options.descriptor) {
			this._size = options.descriptor.size;
			options.descriptor.views.forEach((viewDescriptor, index) => {
				const sizing = viewDescriptor.visible === void 0 || viewDescriptor.visible ? viewDescriptor.size : {
					type: "invisible",
					cachedVisibleSize: viewDescriptor.size
				};
				const view = viewDescriptor.view;
				this.addView(view, sizing, index, true);
			});
			this._contentSize = this.viewItems.reduce((r, i) => r + i.size, 0);
			this.saveProportions();
		}
	}
	style(styles) {
		if ((styles === null || styles === void 0 ? void 0 : styles.separatorBorder) === "transparent") {
			removeClasses(this.element, "dv-separator-border");
			this.element.style.removeProperty("--dv-separator-border");
		} else {
			addClasses(this.element, "dv-separator-border");
			if (styles === null || styles === void 0 ? void 0 : styles.separatorBorder) this.element.style.setProperty("--dv-separator-border", styles.separatorBorder);
		}
	}
	isViewVisible(index) {
		if (index < 0 || index >= this.viewItems.length) throw new Error("Index out of bounds");
		return this.viewItems[index].visible;
	}
	setViewVisible(index, visible) {
		if (index < 0 || index >= this.viewItems.length) throw new Error("Index out of bounds");
		const viewItem = this.viewItems[index];
		viewItem.setVisible(visible, viewItem.size);
		this.distributeEmptySpace(index);
		this.layoutViews();
		this.saveProportions();
	}
	getViewSize(index) {
		if (index < 0 || index >= this.viewItems.length) return -1;
		return this.viewItems[index].size;
	}
	resizeView(index, size) {
		if (index < 0 || index >= this.viewItems.length) return;
		const indexes = range(this.viewItems.length).filter((i) => i !== index);
		const lowPriorityIndexes = [...indexes.filter((i) => this.viewItems[i].priority === "low"), index];
		const highPriorityIndexes = indexes.filter((i) => this.viewItems[i].priority === "high");
		const item = this.viewItems[index];
		size = Math.round(size);
		size = clamp(size, item.minimumSize, Math.min(item.maximumSize, this._size));
		item.size = size;
		this.relayout(lowPriorityIndexes, highPriorityIndexes);
	}
	getViews() {
		return this.viewItems.map((x) => x.view);
	}
	onDidChange(item, size) {
		const index = this.viewItems.indexOf(item);
		if (index < 0 || index >= this.viewItems.length) return;
		size = typeof size === "number" ? size : item.size;
		size = clamp(size, item.minimumSize, item.maximumSize);
		item.size = size;
		const indexes = range(this.viewItems.length).filter((i) => i !== index);
		const lowPriorityIndexes = [...indexes.filter((i) => this.viewItems[i].priority === "low"), index];
		const highPriorityIndexes = indexes.filter((i) => this.viewItems[i].priority === "high");
		/**
		* add this view we are changing to the low-index list since we have determined the size
		* here and don't want it changed
		*/
		this.relayout([...lowPriorityIndexes, index], highPriorityIndexes);
	}
	addView(view, size = Sizing.Distribute, index = this.viewItems.length, skipLayout) {
		const container = document.createElement("div");
		container.className = "dv-view";
		container.appendChild(view.element);
		let viewSize;
		if (typeof size === "number") viewSize = size;
		else if (size.type === "split") {
			const splitTarget = this.viewItems[size.index];
			if (splitTarget) {
				const half = Math.floor(splitTarget.size / 2);
				viewSize = splitTarget.size - half;
				splitTarget.size = half;
			} else viewSize = this.getViewSize(size.index) / 2;
		} else if (size.type === "invisible") viewSize = { cachedVisibleSize: size.cachedVisibleSize };
		else viewSize = view.minimumSize;
		const disposable = view.onDidChange((newSize) => this.onDidChange(viewItem, newSize.size));
		const viewItem = new ViewItem(container, view, viewSize, { dispose: () => {
			disposable.dispose();
			container.remove();
		} });
		if (index === this.viewItems.length) this.viewContainer.appendChild(container);
		else this.viewContainer.insertBefore(container, this.viewContainer.children.item(index));
		this.viewItems.splice(index, 0, viewItem);
		if (this.viewItems.length > 1) {
			const sash = document.createElement("div");
			sash.className = "dv-sash";
			const onPointerStart = (event) => {
				var _sash$ownerDocument;
				for (const item of this.viewItems) item.enabled = false;
				const doc = (_sash$ownerDocument = sash.ownerDocument) !== null && _sash$ownerDocument !== void 0 ? _sash$ownerDocument : document;
				const iframes = disableIframePointEvents(doc);
				const start = this._orientation === "HORIZONTAL" ? event.clientX : event.clientY;
				const sashIndex = firstIndex(this.sashes, (s) => s.container === sash);
				const sizes = this.viewItems.map((x) => x.size);
				let snapBefore;
				let snapAfter;
				const upIndexes = range(sashIndex, -1);
				const downIndexes = range(sashIndex + 1, this.viewItems.length);
				const minDeltaUp = upIndexes.reduce((r, i) => r + (this.viewItems[i].minimumSize - sizes[i]), 0);
				const maxDeltaUp = upIndexes.reduce((r, i) => r + (this.viewItems[i].viewMaximumSize - sizes[i]), 0);
				const maxDeltaDown = downIndexes.length === 0 ? Number.POSITIVE_INFINITY : downIndexes.reduce((r, i) => r + (sizes[i] - this.viewItems[i].minimumSize), 0);
				const minDeltaDown = downIndexes.length === 0 ? Number.NEGATIVE_INFINITY : downIndexes.reduce((r, i) => r + (sizes[i] - this.viewItems[i].viewMaximumSize), 0);
				const minDelta = Math.max(minDeltaUp, minDeltaDown);
				const maxDelta = Math.min(maxDeltaDown, maxDeltaUp);
				const snapBeforeIndex = this.findFirstSnapIndex(upIndexes);
				const snapAfterIndex = this.findFirstSnapIndex(downIndexes);
				if (typeof snapBeforeIndex === "number") {
					const snappedViewItem = this.viewItems[snapBeforeIndex];
					const halfSize = Math.floor(snappedViewItem.viewMinimumSize / 2);
					snapBefore = {
						index: snapBeforeIndex,
						limitDelta: snappedViewItem.visible ? minDelta - halfSize : minDelta + halfSize,
						size: snappedViewItem.size
					};
				}
				if (typeof snapAfterIndex === "number") {
					const snappedViewItem = this.viewItems[snapAfterIndex];
					const halfSize = Math.floor(snappedViewItem.viewMinimumSize / 2);
					snapAfter = {
						index: snapAfterIndex,
						limitDelta: snappedViewItem.visible ? maxDelta + halfSize : maxDelta - halfSize,
						size: snappedViewItem.size
					};
				}
				const onPointerMove = (event) => {
					const delta = (this._orientation === "HORIZONTAL" ? event.clientX : event.clientY) - start;
					this.resize(sashIndex, delta, sizes, void 0, void 0, minDelta, maxDelta, snapBefore, snapAfter);
					this.distributeEmptySpace();
					this.layoutViews();
				};
				const end = () => {
					for (const item of this.viewItems) item.enabled = true;
					iframes.release();
					this.saveProportions();
					doc.removeEventListener("pointermove", onPointerMove);
					doc.removeEventListener("pointerup", end);
					doc.removeEventListener("pointercancel", end);
					doc.removeEventListener("contextmenu", end);
					this._onDidSashEnd.fire(void 0);
				};
				doc.addEventListener("pointermove", onPointerMove);
				doc.addEventListener("pointerup", end);
				doc.addEventListener("pointercancel", end);
				doc.addEventListener("contextmenu", end);
			};
			sash.addEventListener("pointerdown", onPointerStart);
			const sashItem = {
				container: sash,
				disposable: () => {
					sash.removeEventListener("pointerdown", onPointerStart);
					sash.remove();
				}
			};
			this.sashContainer.appendChild(sash);
			this.sashes.push(sashItem);
		}
		if (!skipLayout) this.relayout([index]);
		if (!skipLayout && typeof size !== "number" && size.type === "distribute") this.distributeViewSizes();
		this._onDidAddView.fire(view);
	}
	distributeViewSizes() {
		const flexibleViewItems = [];
		let flexibleSize = 0;
		for (const item of this.viewItems) if (item.maximumSize - item.minimumSize > 0) {
			flexibleViewItems.push(item);
			flexibleSize += item.size;
		}
		const size = Math.floor(flexibleSize / flexibleViewItems.length);
		for (const item of flexibleViewItems) item.size = clamp(size, item.minimumSize, item.maximumSize);
		const indexes = range(this.viewItems.length);
		const lowPriorityIndexes = indexes.filter((i) => this.viewItems[i].priority === "low");
		const highPriorityIndexes = indexes.filter((i) => this.viewItems[i].priority === "high");
		this.relayout(lowPriorityIndexes, highPriorityIndexes);
	}
	removeView(index, sizing, skipLayout = false) {
		const viewItem = this.viewItems.splice(index, 1)[0];
		viewItem.dispose();
		if (this.viewItems.length >= 1) {
			const sashIndex = Math.max(index - 1, 0);
			this.sashes.splice(sashIndex, 1)[0].disposable();
		}
		if (!skipLayout) this.relayout();
		if ((sizing === null || sizing === void 0 ? void 0 : sizing.type) === "distribute") this.distributeViewSizes();
		this._onDidRemoveView.fire(viewItem.view);
		return viewItem.view;
	}
	getViewCachedVisibleSize(index) {
		if (index < 0 || index >= this.viewItems.length) throw new Error("Index out of bounds");
		return this.viewItems[index].cachedVisibleSize;
	}
	moveView(from, to) {
		const cachedVisibleSize = this.getViewCachedVisibleSize(from);
		const sizing = cachedVisibleSize === void 0 ? this.getViewSize(from) : Sizing.Invisible(cachedVisibleSize);
		const view = this.removeView(from, void 0, true);
		this.addView(view, sizing, to);
	}
	layout(size, orthogonalSize) {
		const previousSize = Math.max(this.size, this._contentSize);
		this.size = size;
		this.orthogonalSize = orthogonalSize;
		if (!this._proportions) this.saveProportions();
		if (this.proportions) {
			let total = 0;
			for (let i = 0; i < this.viewItems.length; i++) {
				const item = this.viewItems[i];
				const proportion = this.proportions[i];
				if (typeof proportion === "number") total += proportion;
				else size -= item.size;
			}
			for (let i = 0; i < this.viewItems.length; i++) {
				const item = this.viewItems[i];
				const proportion = this.proportions[i];
				if (typeof proportion === "number" && total > 0) item.size = clamp(Math.round(proportion * size / total), item.minimumSize, item.maximumSize);
			}
		} else {
			const indexes = range(this.viewItems.length);
			const lowPriorityIndexes = indexes.filter((i) => this.viewItems[i].priority === "low");
			const highPriorityIndexes = indexes.filter((i) => this.viewItems[i].priority === "high");
			this.resize(this.viewItems.length - 1, size - previousSize, void 0, lowPriorityIndexes, highPriorityIndexes);
		}
		this.distributeEmptySpace();
		this.layoutViews();
	}
	relayout(lowPriorityIndexes, highPriorityIndexes) {
		const contentSize = this.viewItems.reduce((r, i) => r + i.size, 0);
		this.resize(this.viewItems.length - 1, this._size - contentSize, void 0, lowPriorityIndexes, highPriorityIndexes);
		this.distributeEmptySpace();
		this.layoutViews();
		this.saveProportions();
	}
	distributeEmptySpace(lowPriorityIndex) {
		let contentSize = 0;
		for (const item of this.viewItems) contentSize += item.size;
		let emptyDelta = this.size - contentSize;
		if (emptyDelta === 0) return;
		const indexes = range(this.viewItems.length - 1, -1);
		let hasPriority = false;
		for (const item of this.viewItems) if (item.priority === "low" || item.priority === "high") {
			hasPriority = true;
			break;
		}
		if (hasPriority) {
			const lowPriorityIndexes = indexes.filter((i) => this.viewItems[i].priority === "low");
			const highPriorityIndexes = indexes.filter((i) => this.viewItems[i].priority === "high");
			for (const index of highPriorityIndexes) pushToStart(indexes, index);
			for (const index of lowPriorityIndexes) pushToEnd(indexes, index);
		}
		if (typeof lowPriorityIndex === "number") pushToEnd(indexes, lowPriorityIndex);
		for (let i = 0; emptyDelta !== 0 && i < indexes.length; i++) {
			const item = this.viewItems[indexes[i]];
			const size = clamp(item.size + emptyDelta, item.minimumSize, item.maximumSize);
			const viewDelta = size - item.size;
			emptyDelta -= viewDelta;
			item.size = size;
		}
	}
	rescaleViews(size) {
		let contentSize = 0;
		for (const item of this.viewItems) contentSize += item.size;
		if (size <= 0 || contentSize <= 0) return;
		const factor = size / contentSize;
		let rescaledSize = 0;
		for (const item of this.viewItems) {
			item.scale(factor);
			rescaledSize += item.size;
		}
		this._contentSize = rescaledSize;
	}
	saveProportions() {
		if (!this.proportionalLayout) return;
		let contentSize = 0;
		for (const item of this.viewItems) contentSize += item.size;
		if (contentSize > 0) this._proportions = this.viewItems.map((i) => i.visible ? i.size / contentSize : void 0);
	}
	/**
	* Margin explain:
	*
	* For `n` views in a splitview there will be `n-1` margins `m`.
	*
	* To fit the margins each view must reduce in size by `(m * (n - 1)) / n`.
	*
	* For each view `i` the offet must be adjusted by `m * i/(n - 1)`.
	*/
	layoutViews() {
		let contentSize = 0;
		let visibleViewCount = 0;
		for (const item of this.viewItems) {
			contentSize += item.size;
			if (item.visible) visibleViewCount++;
		}
		this._contentSize = contentSize;
		this.updateSashEnablement();
		if (this.viewItems.length === 0) return;
		const sashCount = Math.max(0, visibleViewCount - 1);
		const marginReducedSize = this.marginShareFor(visibleViewCount);
		let totalLeftOffset = 0;
		const viewLeftOffsets = [];
		const sashWidth = 4;
		let runningVisiblePanelCount = 0;
		this.viewItems.forEach((view, i) => {
			totalLeftOffset += this.viewItems[i].size;
			viewLeftOffsets.push(totalLeftOffset);
			runningVisiblePanelCount += view.visible ? 1 : 0;
			const size = view.visible ? view.size - marginReducedSize : 0;
			const visiblePanelsBeforeThisView = Math.max(0, runningVisiblePanelCount - 1);
			const offset = i === 0 || visiblePanelsBeforeThisView === 0 ? 0 : viewLeftOffsets[i - 1] + visiblePanelsBeforeThisView / sashCount * marginReducedSize;
			if (i < this.viewItems.length - 1) {
				const newSize = view.visible ? offset + size - sashWidth / 2 + this.margin / 2 : offset;
				const sash = this.sashes[i];
				if (this._orientation === "HORIZONTAL") setSashPosition(sash, `${newSize}px`, `0px`);
				if (this._orientation === "VERTICAL") setSashPosition(sash, `0px`, `${newSize}px`);
			}
			if (this._orientation === "HORIZONTAL") {
				view.setContainerGeometry("width", `${size}px`);
				view.setContainerGeometry("left", `${offset}px`);
				view.setContainerGeometry("top", "");
				view.setContainerGeometry("height", "");
			}
			if (this._orientation === "VERTICAL") {
				view.setContainerGeometry("height", `${size}px`);
				view.setContainerGeometry("top", `${offset}px`);
				view.setContainerGeometry("width", "");
				view.setContainerGeometry("left", "");
			}
			view.view.layout(size, this._orthogonalSize);
		});
	}
	marginShareFor(visibleViewCount) {
		const sashCount = Math.max(0, visibleViewCount - 1);
		return this._margin * sashCount / Math.max(1, visibleViewCount);
	}
	findFirstSnapIndex(indexes) {
		for (const index of indexes) {
			const viewItem = this.viewItems[index];
			if (!viewItem.visible) continue;
			if (viewItem.snap) return index;
		}
		for (const index of indexes) {
			const viewItem = this.viewItems[index];
			if (viewItem.visible && viewItem.maximumSize - viewItem.minimumSize > 0) return;
			if (!viewItem.visible && viewItem.snap) return index;
		}
	}
	updateSashEnablement() {
		if (this.sashes.length === 0) return;
		let previous = false;
		const collapsesDown = this.viewItems.map((i) => previous = i.size - i.minimumSize > 0 || previous);
		previous = false;
		const expandsDown = this.viewItems.map((i) => previous = i.maximumSize - i.size > 0 || previous);
		const reverseViews = [...this.viewItems].reverse();
		previous = false;
		const collapsesUp = reverseViews.map((i) => previous = i.size - i.minimumSize > 0 || previous).reverse();
		previous = false;
		const expandsUp = reverseViews.map((i) => previous = i.maximumSize - i.size > 0 || previous).reverse();
		let position = 0;
		for (let index = 0; index < this.sashes.length; index++) {
			const sash = this.sashes[index];
			const viewItem = this.viewItems[index];
			position += viewItem.size;
			const min = !(collapsesDown[index] && expandsUp[index + 1]);
			const max = !(expandsDown[index] && collapsesUp[index + 1]);
			if (min && max) {
				const upIndexes = range(index, -1);
				const downIndexes = range(index + 1, this.viewItems.length);
				const snapBeforeIndex = this.findFirstSnapIndex(upIndexes);
				const snapAfterIndex = this.findFirstSnapIndex(downIndexes);
				const snappedBefore = typeof snapBeforeIndex === "number" && !this.viewItems[snapBeforeIndex].visible;
				const snappedAfter = typeof snapAfterIndex === "number" && !this.viewItems[snapAfterIndex].visible;
				if (snappedBefore && collapsesUp[index] && (position > 0 || this.startSnappingEnabled)) this.updateSash(sash, 1);
				else if (snappedAfter && collapsesDown[index] && (position < this._contentSize || this.endSnappingEnabled)) this.updateSash(sash, 0);
				else this.updateSash(sash, 2);
			} else if (min && !max) this.updateSash(sash, 1);
			else if (!min && max) this.updateSash(sash, 0);
			else this.updateSash(sash, 3);
		}
	}
	updateSash(sash, state) {
		toggleClass(sash.container, "dv-disabled", state === 2);
		toggleClass(sash.container, "dv-enabled", state === 3);
		toggleClass(sash.container, "dv-maximum", state === 0);
		toggleClass(sash.container, "dv-minimum", state === 1);
	}
	createViewContainer() {
		const element = document.createElement("div");
		element.className = "dv-view-container";
		return element;
	}
	createSashContainer() {
		const element = document.createElement("div");
		element.className = "dv-sash-container";
		return element;
	}
	createContainer() {
		const element = document.createElement("div");
		element.className = `dv-split-view-container ${this._orientation === "HORIZONTAL" ? "dv-horizontal" : "dv-vertical"}`;
		return element;
	}
	dispose() {
		this._onDidSashEnd.dispose();
		this._onDidAddView.dispose();
		this._onDidRemoveView.dispose();
		for (let i = 0; i < this.element.children.length; i++) if (this.element.children.item(i) === this.element) {
			this.element.remove();
			break;
		}
		for (const viewItem of this.viewItems) viewItem.dispose();
		this.element.remove();
	}
};

//#endregion
//#region src/splitview/options.ts
const PROPERTY_KEYS_SPLITVIEW = (() => {
	return Object.keys({
		orientation: void 0,
		descriptor: void 0,
		proportionalLayout: void 0,
		styles: void 0,
		margin: void 0,
		disableAutoResizing: void 0,
		className: void 0
	});
})();

//#endregion
//#region src/paneview/paneview.ts
var Paneview = class extends CompositeDisposable {
	get onDidAddView() {
		return this.splitview.onDidAddView;
	}
	get onDidRemoveView() {
		return this.splitview.onDidRemoveView;
	}
	get minimumSize() {
		return this.splitview.minimumSize;
	}
	get maximumSize() {
		return this.splitview.maximumSize;
	}
	get orientation() {
		return this.splitview.orientation;
	}
	get size() {
		return this.splitview.size;
	}
	get orthogonalSize() {
		return this.splitview.orthogonalSize;
	}
	constructor(container, options) {
		var _options$orientation;
		super();
		this.paneItems = [];
		this.skipAnimation = false;
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		this._orientation = (_options$orientation = options.orientation) !== null && _options$orientation !== void 0 ? _options$orientation : "VERTICAL";
		this.element = document.createElement("div");
		this.element.className = "dv-pane-container";
		container.appendChild(this.element);
		this.splitview = new Splitview(this.element, {
			orientation: this._orientation,
			proportionalLayout: false,
			descriptor: options.descriptor
		});
		this.getPanes().forEach((pane) => {
			const disposable = new CompositeDisposable(pane.onDidChangeExpansionState(() => {
				this.setupAnimation();
				this._onDidChange.fire(void 0);
			}));
			const paneItem = {
				pane,
				disposable: { dispose: () => {
					disposable.dispose();
				} }
			};
			this.paneItems.push(paneItem);
			pane.orthogonalSize = this.splitview.orthogonalSize;
		});
		this.addDisposables(this._onDidChange, this.splitview.onDidSashEnd(() => {
			this._onDidChange.fire(void 0);
		}), this.splitview.onDidAddView(() => {
			this._onDidChange.fire();
		}), this.splitview.onDidRemoveView(() => {
			this._onDidChange.fire();
		}));
	}
	setViewVisible(index, visible) {
		this.splitview.setViewVisible(index, visible);
	}
	addPane(pane, size, index = this.splitview.length, skipLayout = false) {
		const disposable = pane.onDidChangeExpansionState(() => {
			this.setupAnimation();
			this._onDidChange.fire(void 0);
		});
		const paneItem = {
			pane,
			disposable: { dispose: () => {
				disposable.dispose();
			} }
		};
		this.paneItems.splice(index, 0, paneItem);
		pane.orthogonalSize = this.splitview.orthogonalSize;
		this.splitview.addView(pane, size, index, skipLayout);
	}
	getViewSize(index) {
		return this.splitview.getViewSize(index);
	}
	getViewCachedVisibleSize(index) {
		return this.splitview.getViewCachedVisibleSize(index);
	}
	getPanes() {
		return this.splitview.getViews();
	}
	removePane(index, options) {
		if (index < 0 || index >= this.paneItems.length) throw new Error("Index out of bounds");
		const paneItem = this.paneItems.splice(index, 1)[0];
		this.splitview.removeView(index);
		if (!(options === null || options === void 0 ? void 0 : options.skipDispose)) {
			paneItem.disposable.dispose();
			paneItem.pane.dispose();
		}
		return paneItem;
	}
	moveView(from, to) {
		if (from === to) return;
		const cachedVisibleSize = this.getViewCachedVisibleSize(from);
		const view = this.removePane(from, { skipDispose: true });
		const sizing = cachedVisibleSize === void 0 ? view.pane.size : Sizing.Invisible(cachedVisibleSize);
		view.disposable.dispose();
		this.skipAnimation = true;
		try {
			this.addPane(view.pane, sizing, to, false);
		} finally {
			this.skipAnimation = false;
		}
	}
	layout(size, orthogonalSize) {
		this.splitview.layout(size, orthogonalSize);
	}
	setupAnimation() {
		if (this.skipAnimation) return;
		if (this.animationTimer) {
			clearTimeout(this.animationTimer);
			this.animationTimer = void 0;
		}
		addClasses(this.element, "dv-animated");
		this.animationTimer = setTimeout(() => {
			this.animationTimer = void 0;
			removeClasses(this.element, "dv-animated");
		}, 200);
	}
	dispose() {
		super.dispose();
		if (this.animationTimer) {
			clearTimeout(this.animationTimer);
			this.animationTimer = void 0;
		}
		this.paneItems.forEach((paneItem) => {
			paneItem.disposable.dispose();
			paneItem.pane.dispose();
		});
		this.paneItems = [];
		this.splitview.dispose();
		this.element.remove();
	}
};

//#endregion
//#region src/gridview/leafNode.ts
var LeafNode = class {
	get minimumWidth() {
		return this.view.minimumWidth;
	}
	get maximumWidth() {
		return this.view.maximumWidth;
	}
	get minimumHeight() {
		return this.view.minimumHeight;
	}
	get maximumHeight() {
		return this.view.maximumHeight;
	}
	get priority() {
		return this.view.priority;
	}
	get snap() {
		return this.view.snap;
	}
	get minimumSize() {
		return this.orientation === "HORIZONTAL" ? this.minimumHeight : this.minimumWidth;
	}
	get maximumSize() {
		return this.orientation === "HORIZONTAL" ? this.maximumHeight : this.maximumWidth;
	}
	get minimumOrthogonalSize() {
		return this.orientation === "HORIZONTAL" ? this.minimumWidth : this.minimumHeight;
	}
	get maximumOrthogonalSize() {
		return this.orientation === "HORIZONTAL" ? this.maximumWidth : this.maximumHeight;
	}
	get orthogonalSize() {
		return this._orthogonalSize;
	}
	get size() {
		return this._size;
	}
	get element() {
		return this.view.element;
	}
	get width() {
		return this.orientation === "HORIZONTAL" ? this.orthogonalSize : this.size;
	}
	get height() {
		return this.orientation === "HORIZONTAL" ? this.size : this.orthogonalSize;
	}
	constructor(view, orientation, orthogonalSize, size = 0) {
		this.view = view;
		this.orientation = orientation;
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		this._orthogonalSize = orthogonalSize;
		this._size = size;
		this._disposable = this.view.onDidChange((event) => {
			if (event) this._onDidChange.fire({
				size: this.orientation === "VERTICAL" ? event.width : event.height,
				orthogonalSize: this.orientation === "VERTICAL" ? event.height : event.width
			});
			else this._onDidChange.fire({});
		});
	}
	setVisible(visible) {
		if (this.view.setVisible) this.view.setVisible(visible);
	}
	layout(size, orthogonalSize) {
		this._size = size;
		this._orthogonalSize = orthogonalSize;
		this.view.layout(this.width, this.height);
	}
	dispose() {
		this._onDidChange.dispose();
		this._disposable.dispose();
	}
};

//#endregion
//#region src/gridview/branchNode.ts
var BranchNode = class BranchNode extends CompositeDisposable {
	get width() {
		return this.orientation === "HORIZONTAL" ? this.size : this.orthogonalSize;
	}
	get height() {
		return this.orientation === "HORIZONTAL" ? this.orthogonalSize : this.size;
	}
	get minimumSize() {
		if (this._cachedMinimumSize === void 0) {
			let value = 0;
			for (let index = 0; index < this.children.length; index++) if (this.splitview.isViewVisible(index)) value = Math.max(value, this.children[index].minimumOrthogonalSize);
			this._cachedMinimumSize = value;
		}
		return this._cachedMinimumSize;
	}
	get maximumSize() {
		if (this._cachedMaximumSize === void 0) {
			let value = Number.POSITIVE_INFINITY;
			for (let index = 0; index < this.children.length; index++) if (this.splitview.isViewVisible(index)) value = Math.min(value, this.children[index].maximumOrthogonalSize);
			this._cachedMaximumSize = value;
		}
		return this._cachedMaximumSize;
	}
	get minimumOrthogonalSize() {
		return this.splitview.minimumSize;
	}
	get maximumOrthogonalSize() {
		return this.splitview.maximumSize;
	}
	get orthogonalSize() {
		return this._orthogonalSize;
	}
	get size() {
		return this._size;
	}
	get minimumWidth() {
		return this.orientation === "HORIZONTAL" ? this.minimumOrthogonalSize : this.minimumSize;
	}
	get minimumHeight() {
		return this.orientation === "HORIZONTAL" ? this.minimumSize : this.minimumOrthogonalSize;
	}
	get maximumWidth() {
		return this.orientation === "HORIZONTAL" ? this.maximumOrthogonalSize : this.maximumSize;
	}
	get maximumHeight() {
		return this.orientation === "HORIZONTAL" ? this.maximumSize : this.maximumOrthogonalSize;
	}
	get priority() {
		var _this$_cachedPriority;
		(_this$_cachedPriority = this._cachedPriority) !== null && _this$_cachedPriority !== void 0 || (this._cachedPriority = this.computePriority());
		return this._cachedPriority;
	}
	computePriority() {
		if (this.children.length === 0) return "normal";
		let hasHigh = false;
		let hasLow = false;
		for (const child of this.children) {
			var _child$priority;
			const priority = (_child$priority = child.priority) !== null && _child$priority !== void 0 ? _child$priority : "normal";
			if (priority === "high") hasHigh = true;
			else if (priority === "low") hasLow = true;
		}
		if (hasHigh) return "high";
		else if (hasLow) return "low";
		return "normal";
	}
	invalidateCachedSizes() {
		this._cachedMinimumSize = void 0;
		this._cachedMaximumSize = void 0;
		this._cachedPriority = void 0;
		this._onDidInvalidateSizes.fire();
	}
	get disabled() {
		return this.splitview.disabled;
	}
	set disabled(value) {
		this.splitview.disabled = value;
	}
	get margin() {
		return this.splitview.margin;
	}
	set margin(value) {
		this.splitview.margin = value;
		this.children.forEach((child) => {
			if (child instanceof BranchNode) child.margin = value;
		});
	}
	get proportionalLayout() {
		return this.splitview.proportionalLayout;
	}
	set proportionalLayout(value) {
		this.splitview.proportionalLayout = value;
		this.children.forEach((child) => {
			if (child instanceof BranchNode) child.proportionalLayout = value;
		});
	}
	constructor(orientation, proportionalLayout, styles, size, orthogonalSize, disabled, margin, childDescriptors) {
		super();
		this.orientation = orientation;
		this.styles = styles;
		this._childrenDisposable = Disposable.NONE;
		this.children = [];
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		this._onDidVisibilityChange = new Emitter();
		this.onDidVisibilityChange = this._onDidVisibilityChange.event;
		this._onDidInvalidateSizes = new Emitter();
		this.onDidInvalidateSizes = this._onDidInvalidateSizes.event;
		this._orthogonalSize = orthogonalSize;
		this._size = size;
		this.element = document.createElement("div");
		this.element.className = "dv-branch-node";
		if (childDescriptors) {
			const descriptor = {
				views: childDescriptors.map((childDescriptor) => {
					var _childDescriptor$visi;
					return {
						view: childDescriptor.node,
						size: childDescriptor.node.size,
						visible: (_childDescriptor$visi = childDescriptor.visible) !== null && _childDescriptor$visi !== void 0 ? _childDescriptor$visi : true
					};
				}),
				size: this.orthogonalSize
			};
			this.children = childDescriptors.map((c) => c.node);
			this.splitview = new Splitview(this.element, {
				orientation: this.orientation,
				descriptor,
				proportionalLayout,
				styles,
				margin
			});
		} else {
			this.splitview = new Splitview(this.element, {
				orientation: this.orientation,
				proportionalLayout,
				styles,
				margin
			});
			this.splitview.layout(this.size, this.orthogonalSize);
		}
		this.disabled = disabled;
		this.addDisposables(this._onDidChange, this._onDidVisibilityChange, this._onDidInvalidateSizes, this.splitview.onDidSashEnd(() => {
			this._onDidChange.fire({});
		}));
		this.setupChildrenEvents();
	}
	setVisible(_visible) {}
	isChildVisible(index) {
		if (index < 0 || index >= this.children.length) throw new Error("Invalid index");
		return this.splitview.isViewVisible(index);
	}
	setChildVisible(index, visible) {
		if (index < 0 || index >= this.children.length) throw new Error("Invalid index");
		if (this.splitview.isViewVisible(index) === visible) return;
		const wereAllChildrenHidden = this.splitview.contentSize === 0;
		this.splitview.setViewVisible(index, visible);
		this.invalidateCachedSizes();
		const areAllChildrenHidden = this.splitview.contentSize === 0;
		if (visible && wereAllChildrenHidden || !visible && areAllChildrenHidden) this._onDidVisibilityChange.fire({ visible });
	}
	moveChild(from, to) {
		if (from === to) return;
		if (from < 0 || from >= this.children.length) throw new Error("Invalid from index");
		if (from < to) to--;
		this.splitview.moveView(from, to);
		const child = this._removeChild(from);
		this._addChild(child, to);
	}
	getChildSize(index) {
		if (index < 0 || index >= this.children.length) throw new Error("Invalid index");
		return this.splitview.getViewSize(index);
	}
	resizeChild(index, size) {
		if (index < 0 || index >= this.children.length) throw new Error("Invalid index");
		this.splitview.resizeView(index, size);
	}
	layout(size, orthogonalSize) {
		this._size = orthogonalSize;
		this._orthogonalSize = size;
		this.splitview.layout(orthogonalSize, size);
	}
	addChild(node, size, index, skipLayout) {
		if (index < 0 || index > this.children.length) throw new Error("Invalid index");
		this.splitview.addView(node, size, index, skipLayout);
		this._addChild(node, index);
	}
	getChildCachedVisibleSize(index) {
		if (index < 0 || index >= this.children.length) throw new Error("Invalid index");
		return this.splitview.getViewCachedVisibleSize(index);
	}
	removeChild(index, sizing) {
		if (index < 0 || index >= this.children.length) throw new Error("Invalid index");
		this.splitview.removeView(index, sizing);
		return this._removeChild(index);
	}
	_addChild(node, index) {
		this.children.splice(index, 0, node);
		this.setupChildrenEvents();
	}
	_removeChild(index) {
		const [child] = this.children.splice(index, 1);
		this.setupChildrenEvents();
		return child;
	}
	setupChildrenEvents() {
		this.invalidateCachedSizes();
		this._childrenDisposable.dispose();
		this._childrenDisposable = new CompositeDisposable(Event.any(...this.children.map((c) => c.onDidChange))((e) => {
			/**
			* indicate a change has occured to allows any re-rendering but don't bubble
			* event because that was specific to this branch
			*/
			this.invalidateCachedSizes();
			this._onDidChange.fire({ size: e.orthogonalSize });
		}), ...this.children.map((c, i) => {
			if (c instanceof BranchNode) return new CompositeDisposable(c.onDidVisibilityChange(({ visible }) => {
				this.setChildVisible(i, visible);
			}), c.onDidInvalidateSizes(() => {
				this.invalidateCachedSizes();
			}));
			return Disposable.NONE;
		}));
	}
	dispose() {
		this._childrenDisposable.dispose();
		this.splitview.dispose();
		this.children.forEach((child) => child.dispose());
		super.dispose();
	}
};

//#endregion
//#region src/gridview/gridview.ts
function findLeaf(candiateNode, last) {
	if (candiateNode instanceof LeafNode) return candiateNode;
	if (candiateNode instanceof BranchNode) return findLeaf(candiateNode.children[last ? candiateNode.children.length - 1 : 0], last);
	throw new Error("invalid node");
}
/**
* The sizing to re-add a branch's child with, so a hidden child stays hidden
* (with its cached size) instead of coming back visible at size 0.
*/
function childSizing(node, index, size, scale = 1) {
	const cachedVisibleSize = node.getChildCachedVisibleSize(index);
	return cachedVisibleSize === void 0 ? size : Sizing.Invisible(Math.round(cachedVisibleSize * scale));
}
function cloneNode(node, size, orthogonalSize) {
	if (node instanceof BranchNode) {
		const result = new BranchNode(node.orientation, node.proportionalLayout, node.styles, size, orthogonalSize, node.disabled, node.margin);
		for (let i = node.children.length - 1; i >= 0; i--) {
			const child = node.children[i];
			const childSize = child instanceof BranchNode ? child.orthogonalSize : child.size;
			result.addChild(cloneNode(child, child.size, child.orthogonalSize), childSizing(node, i, childSize), 0, true);
		}
		return result;
	} else return new LeafNode(node.view, node.orientation, orthogonalSize);
}
function flipNode(node, size, orthogonalSize) {
	if (node instanceof BranchNode) {
		const result = new BranchNode(orthogonal(node.orientation), node.proportionalLayout, node.styles, size, orthogonalSize, node.disabled, node.margin);
		let totalSize = 0;
		const cachedSizeScale = node.size === 0 ? 1 : size / node.size;
		for (let i = node.children.length - 1; i >= 0; i--) {
			const child = node.children[i];
			const childSize = child instanceof BranchNode ? child.orthogonalSize : child.size;
			let newSize = node.size === 0 ? 0 : Math.round(size * childSize / node.size);
			totalSize += newSize;
			if (i === 0) newSize += size - totalSize;
			result.addChild(flipNode(child, orthogonalSize, newSize), childSizing(node, i, newSize, cachedSizeScale), 0, true);
		}
		return result;
	} else return new LeafNode(node.view, orthogonal(node.orientation), orthogonalSize);
}
function indexInParent(element) {
	const parentElement = element.parentElement;
	if (!parentElement) throw new Error("Invalid grid element");
	let el = parentElement.firstElementChild;
	let index = 0;
	while (el !== element && el !== parentElement.lastElementChild && el) {
		el = el.nextElementSibling;
		index++;
	}
	return index;
}
/**
* Find the grid location of a specific DOM element by traversing the parent
* chain and finding each child index on the way.
*
* This will break as soon as DOM structures of the Splitview or Gridview change.
*/
function getGridLocation(element) {
	const parentElement = element.parentElement;
	if (!parentElement) throw new Error("Invalid grid element");
	if (/\bdv-grid-view\b/.test(parentElement.className)) return [];
	const index = indexInParent(parentElement);
	const ancestor = parentElement.parentElement.parentElement.parentElement;
	return [...getGridLocation(ancestor), index];
}
function getRelativeLocation(rootOrientation, location, direction) {
	if (getLocationOrientation(rootOrientation, location) === getDirectionOrientation(direction)) {
		const [rest, _index] = tail(location);
		let index = _index;
		if (direction === "right" || direction === "bottom") index += 1;
		return [...rest, index];
	} else {
		const index = direction === "right" || direction === "bottom" ? 1 : 0;
		return [...location, index];
	}
}
function getDirectionOrientation(direction) {
	return direction === "top" || direction === "bottom" ? "VERTICAL" : "HORIZONTAL";
}
function getLocationOrientation(rootOrientation, location) {
	return location.length % 2 === 0 ? orthogonal(rootOrientation) : rootOrientation;
}
const orthogonal = (orientation) => orientation === "HORIZONTAL" ? "VERTICAL" : "HORIZONTAL";
function isGridBranchNode(node) {
	return !!node.children;
}
const serializeBranchNode = (node, orientation) => {
	const size = orientation === "VERTICAL" ? node.box.width : node.box.height;
	if (!isGridBranchNode(node)) {
		if (typeof node.cachedVisibleSize === "number") return {
			type: "leaf",
			data: node.view.toJSON(),
			size: node.cachedVisibleSize,
			visible: false
		};
		return {
			type: "leaf",
			data: node.view.toJSON(),
			size
		};
	}
	const data = node.children.map((c) => serializeBranchNode(c, orthogonal(orientation)));
	if (typeof node.cachedVisibleSize === "number") return {
		type: "branch",
		data,
		size: node.cachedVisibleSize,
		visible: false
	};
	return {
		type: "branch",
		data,
		size
	};
};
var Gridview = class {
	get length() {
		return this._root ? this._root.children.length : 0;
	}
	get orientation() {
		return this.root.orientation;
	}
	set orientation(orientation) {
		if (this.root.orientation === orientation) return;
		const { size, orthogonalSize } = this.root;
		this.root = flipNode(this.root, orthogonalSize, size);
		this.root.layout(size, orthogonalSize);
	}
	get width() {
		return this.root.width;
	}
	get height() {
		return this.root.height;
	}
	get minimumWidth() {
		return this.root.minimumWidth;
	}
	get minimumHeight() {
		return this.root.minimumHeight;
	}
	get maximumWidth() {
		return this.root.maximumWidth;
	}
	get maximumHeight() {
		return this.root.maximumHeight;
	}
	get locked() {
		return this._locked;
	}
	set locked(value) {
		this._locked = value;
		const branch = [this.root];
		/**
		* simple depth-first-search to cover all nodes
		*
		* @see https://en.wikipedia.org/wiki/Depth-first_search
		*/
		while (branch.length > 0) {
			const node = branch.pop();
			if (node instanceof BranchNode) {
				node.disabled = value;
				branch.push(...node.children);
			}
		}
	}
	get margin() {
		return this._margin;
	}
	set margin(value) {
		this._margin = value;
		this.root.margin = value;
	}
	maximizedView() {
		var _this$_maximizedNode;
		return (_this$_maximizedNode = this._maximizedNode) === null || _this$_maximizedNode === void 0 ? void 0 : _this$_maximizedNode.leaf.view;
	}
	hasMaximizedView() {
		return this._maximizedNode !== void 0;
	}
	maximizeView(view) {
		var _this$_maximizedNode2;
		const location = getGridLocation(view.element);
		const [_, node] = this.getNode(location);
		if (!(node instanceof LeafNode)) return;
		if (((_this$_maximizedNode2 = this._maximizedNode) === null || _this$_maximizedNode2 === void 0 ? void 0 : _this$_maximizedNode2.leaf) === node) return;
		if (this.hasMaximizedView()) this.exitMaximizedView();
		serializeBranchNode(this.getView(), this.orientation);
		const hiddenOnMaximize = [];
		function hideAllViewsBut(parent, exclude) {
			for (let i = 0; i < parent.children.length; i++) {
				const child = parent.children[i];
				if (child instanceof LeafNode) {
					if (child !== exclude) if (parent.isChildVisible(i)) parent.setChildVisible(i, false);
					else hiddenOnMaximize.push(child);
				} else hideAllViewsBut(child, exclude);
			}
		}
		hideAllViewsBut(this.root, node);
		this._maximizedNode = {
			leaf: node,
			hiddenOnMaximize
		};
		this._onDidMaximizedNodeChange.fire({
			view: node.view,
			isMaximized: true
		});
	}
	exitMaximizedView() {
		if (!this._maximizedNode) return;
		const hiddenOnMaximize = this._maximizedNode.hiddenOnMaximize;
		function showViewsInReverseOrder(parent) {
			for (let index = parent.children.length - 1; index >= 0; index--) {
				const child = parent.children[index];
				if (child instanceof LeafNode) {
					if (!hiddenOnMaximize.includes(child)) parent.setChildVisible(index, true);
				} else showViewsInReverseOrder(child);
			}
		}
		showViewsInReverseOrder(this.root);
		const tmp = this._maximizedNode.leaf;
		this._maximizedNode = void 0;
		this._onDidMaximizedNodeChange.fire({
			view: tmp.view,
			isMaximized: false
		});
	}
	serialize() {
		const maximizedView = this.maximizedView();
		let maxmizedViewLocation;
		if (maximizedView)
 /**
		* The minimum information we can get away with in order to serialize a maxmized view is it's location within the grid
		* which is represented as a branch of indices
		*/
		maxmizedViewLocation = getGridLocation(maximizedView.element);
		/**
		* We pause the onDidMaximizedNodeChange events because this method needs to
		* call `this.exitMaximizedView()`. We don't want this to invoke any listeners
		* since we undo it before leaving this method
		*/
		const pauseToken = this._onDidMaximizedNodeChange.pause();
		try {
			if (this.hasMaximizedView())
 /**
			* the saved layout cannot be in its maxmized state otherwise all of the underlying
			* view dimensions will be wrong
			*
			* To counteract this we temporaily remove the maximized view to compute the serialized output
			* of the grid before adding back the maxmized view as to not alter the layout from the users
			* perspective when `.toJSON()` is called
			*/
			this.exitMaximizedView();
			const result = {
				root: serializeBranchNode(this.getView(), this.orientation),
				width: this.width,
				height: this.height,
				orientation: this.orientation
			};
			if (maxmizedViewLocation) result.maximizedNode = { location: maxmizedViewLocation };
			if (maximizedView) this.maximizeView(maximizedView);
			return result;
		} finally {
			pauseToken.dispose();
		}
	}
	dispose() {
		this.disposable.dispose();
		this._onDidChange.dispose();
		this._onDidMaximizedNodeChange.dispose();
		this._onDidViewVisibilityChange.dispose();
		this.root.dispose();
		this._maximizedNode = void 0;
		this.element.remove();
	}
	clear() {
		const orientation = this.root.orientation;
		this.root = new BranchNode(orientation, this.proportionalLayout, this.styles, this.root.size, this.root.orthogonalSize, this.locked, this.margin);
	}
	deserialize(json, deserializer) {
		const orientation = json.orientation;
		const height = orientation === "VERTICAL" ? json.height : json.width;
		this._deserialize(json.root, orientation, deserializer, height);
		/**
		* The deserialied layout must be positioned through this.layout(...)
		* before any maximizedNode can be positioned
		*/
		this.layout(json.width, json.height);
		if (json.maximizedNode) {
			const location = json.maximizedNode.location;
			const [_, node] = this.getNode(location);
			if (!(node instanceof LeafNode)) return;
			this.maximizeView(node.view);
		}
	}
	_deserialize(root, orientation, deserializer, orthogonalSize) {
		this.root = this._deserializeNode(root, orientation, deserializer, orthogonalSize);
	}
	_deserializeNode(node, orientation, deserializer, orthogonalSize) {
		let result;
		if (node.type === "branch") {
			const children = node.data.map((serializedChild) => {
				return {
					node: this._deserializeNode(serializedChild, orthogonal(orientation), deserializer, node.size),
					visible: serializedChild.visible
				};
			});
			result = new BranchNode(orientation, this.proportionalLayout, this.styles, node.size, orthogonalSize, this.locked, this.margin, children);
		} else {
			const view = deserializer.fromJSON(node);
			if (typeof node.visible === "boolean") {
				var _view$setVisible;
				(_view$setVisible = view.setVisible) === null || _view$setVisible === void 0 || _view$setVisible.call(view, node.visible);
			}
			result = new LeafNode(view, orientation, orthogonalSize, node.size);
		}
		return result;
	}
	get root() {
		return this._root;
	}
	set root(root) {
		const oldRoot = this._root;
		if (oldRoot) {
			oldRoot.dispose();
			this._maximizedNode = void 0;
			oldRoot.element.remove();
		}
		this._root = root;
		this.element.appendChild(this._root.element);
		this.disposable.value = this._root.onDidChange((e) => {
			this._onDidChange.fire(e);
		});
	}
	normalize() {
		if (!this._root) return;
		if (this._root.children.length !== 1) return;
		const oldRoot = this.root;
		const childReference = oldRoot.children[0];
		if (childReference instanceof LeafNode) return;
		oldRoot.element.remove();
		const child = oldRoot.removeChild(0);
		oldRoot.dispose();
		child.dispose();
		this._root = cloneNode(childReference, childReference.size, childReference.orthogonalSize);
		this.element.appendChild(this._root.element);
		this.disposable.value = this._root.onDidChange((e) => {
			this._onDidChange.fire(e);
		});
	}
	/**
	* If the root is orientated as a VERTICAL node then nest the existing root within a new HORIZIONTAL root node
	* If the root is orientated as a HORIZONTAL node then nest the existing root within a new VERITCAL root node
	*/
	insertOrthogonalSplitviewAtRoot() {
		if (!this._root) return;
		const oldRoot = this.root;
		oldRoot.element.remove();
		this._root = new BranchNode(orthogonal(oldRoot.orientation), this.proportionalLayout, this.styles, this.root.orthogonalSize, this.root.size, this.locked, this.margin);
		if (oldRoot.children.length === 0) {} else if (oldRoot.children.length === 1) {
			const childReference = oldRoot.children[0];
			oldRoot.removeChild(0).dispose();
			oldRoot.dispose();
			this._root.addChild(
				/**
				* the child node will have the same orientation as the new root since
				* we are removing the inbetween node.
				* the entire 'tree' must be flipped recursively to ensure that the orientation
				* flips at each level
				*/
				flipNode(childReference, childReference.orthogonalSize, childReference.size),
				Sizing.Distribute,
				0
			);
		} else this._root.addChild(oldRoot, Sizing.Distribute, 0);
		this.element.appendChild(this._root.element);
		this.disposable.value = this._root.onDidChange((e) => {
			this._onDidChange.fire(e);
		});
	}
	next(location) {
		return this.progmaticSelect(location);
	}
	previous(location) {
		return this.progmaticSelect(location, true);
	}
	getView(location) {
		const node = location ? this.getNode(location)[1] : this.root;
		return this._getViews(node, this.orientation);
	}
	_getViews(node, orientation, cachedVisibleSize) {
		const box = {
			height: node.height,
			width: node.width
		};
		if (node instanceof LeafNode) return {
			box,
			view: node.view,
			cachedVisibleSize
		};
		const children = [];
		for (let i = 0; i < node.children.length; i++) {
			const child = node.children[i];
			const nodeCachedVisibleSize = node.getChildCachedVisibleSize(i);
			children.push(this._getViews(child, orthogonal(orientation), nodeCachedVisibleSize));
		}
		return {
			box,
			children,
			cachedVisibleSize
		};
	}
	progmaticSelect(location, reverse = false) {
		const [path, node] = this.getNode(location);
		if (!(node instanceof LeafNode)) throw new TypeError("invalid location");
		for (let i = path.length - 1; i > -1; i--) {
			const n = path[i];
			const l = location[i] || 0;
			if (reverse ? l - 1 > -1 : l + 1 < n.children.length) return findLeaf(n.children[reverse ? l - 1 : l + 1], reverse);
		}
		return findLeaf(this.root, reverse);
	}
	get proportionalLayout() {
		return this.root.proportionalLayout;
	}
	set proportionalLayout(value) {
		this.root.proportionalLayout = value;
	}
	constructor(proportionalLayout, styles, orientation, locked, margin) {
		this.styles = styles;
		this._locked = false;
		this._margin = 0;
		this._maximizedNode = void 0;
		this.disposable = new MutableDisposable();
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		this._onDidViewVisibilityChange = new Emitter();
		this.onDidViewVisibilityChange = this._onDidViewVisibilityChange.event;
		this._onDidMaximizedNodeChange = new Emitter();
		this.onDidMaximizedNodeChange = this._onDidMaximizedNodeChange.event;
		this.element = document.createElement("div");
		this.element.className = "dv-grid-view";
		this._locked = locked !== null && locked !== void 0 ? locked : false;
		this._margin = margin !== null && margin !== void 0 ? margin : 0;
		this.root = new BranchNode(orientation, proportionalLayout, styles, 0, 0, this.locked, this.margin);
	}
	isViewVisible(location) {
		const [rest, index] = tail(location);
		const [, parent] = this.getNode(rest);
		if (!(parent instanceof BranchNode)) throw new TypeError("Invalid from location");
		return parent.isChildVisible(index);
	}
	setViewVisible(location, visible) {
		if (this.hasMaximizedView()) this.exitMaximizedView();
		const [rest, index] = tail(location);
		const [, parent] = this.getNode(rest);
		if (!(parent instanceof BranchNode)) throw new TypeError("Invalid from location");
		this._onDidViewVisibilityChange.fire();
		parent.setChildVisible(index, visible);
	}
	moveView(parentLocation, from, to) {
		if (this.hasMaximizedView()) this.exitMaximizedView();
		const [, parent] = this.getNode(parentLocation);
		if (!(parent instanceof BranchNode)) throw new TypeError("Invalid location");
		parent.moveChild(from, to);
	}
	addView(view, size, location) {
		if (this.hasMaximizedView()) this.exitMaximizedView();
		const [rest, index] = tail(location);
		const [pathToParent, parent] = this.getNode(rest);
		if (parent instanceof BranchNode) {
			const node = new LeafNode(view, orthogonal(parent.orientation), parent.orthogonalSize);
			parent.addChild(node, size, index);
		} else {
			const [grandParent, ..._] = [...pathToParent].reverse();
			const [parentIndex, ...__] = [...rest].reverse();
			let newSiblingSize = 0;
			const newSiblingCachedVisibleSize = grandParent.getChildCachedVisibleSize(parentIndex);
			if (typeof newSiblingCachedVisibleSize === "number") newSiblingSize = Sizing.Invisible(newSiblingCachedVisibleSize);
			grandParent.removeChild(parentIndex).dispose();
			const newParent = new BranchNode(parent.orientation, this.proportionalLayout, this.styles, parent.size, parent.orthogonalSize, this.locked, this.margin);
			grandParent.addChild(newParent, parent.size, parentIndex);
			const newSibling = new LeafNode(parent.view, grandParent.orientation, parent.size);
			newParent.addChild(newSibling, newSiblingSize, 0);
			if (typeof size !== "number" && size.type === "split") size = {
				type: "split",
				index: 0
			};
			const node = new LeafNode(view, grandParent.orientation, parent.size);
			newParent.addChild(node, size, index);
		}
	}
	remove(view, sizing) {
		const location = getGridLocation(view.element);
		return this.removeView(location, sizing);
	}
	removeView(location, sizing) {
		if (this.hasMaximizedView()) this.exitMaximizedView();
		const [rest, index] = tail(location);
		const [pathToParent, parent] = this.getNode(rest);
		if (!(parent instanceof BranchNode)) throw new TypeError("Invalid location");
		const nodeToRemove = parent.children[index];
		if (!(nodeToRemove instanceof LeafNode)) throw new TypeError("Invalid location");
		parent.removeChild(index, sizing);
		nodeToRemove.dispose();
		if (parent.children.length !== 1) return nodeToRemove.view;
		const sibling = parent.children[0];
		if (pathToParent.length === 0) {
			if (sibling instanceof LeafNode) return nodeToRemove.view;
			parent.removeChild(0, sizing);
			this.root = sibling;
			return nodeToRemove.view;
		}
		const [grandParent, ..._] = [...pathToParent].reverse();
		const [parentIndex, ...__] = [...rest].reverse();
		const isSiblingVisible = parent.isChildVisible(0);
		parent.removeChild(0, sizing);
		const sizes = grandParent.children.map((_size, i) => grandParent.getChildSize(i));
		grandParent.removeChild(parentIndex, sizing).dispose();
		if (sibling instanceof BranchNode) {
			const childSizes = sibling.children.map((c) => c instanceof BranchNode ? c.orthogonalSize : c.size);
			sizes.splice(parentIndex, 1, ...childSizes);
			for (let i = 0; i < sibling.children.length; i++) {
				const child = sibling.children[i];
				const childSize = childSizing(sibling, i, childSizes[i]);
				grandParent.addChild(child, !isSiblingVisible && typeof childSize === "number" ? Sizing.Invisible(childSize) : childSize, parentIndex + i);
			}
			/**
			* clean down the branch node since we need to dipose of it and
			* when .dispose() it called on a branch it will dispose of any
			* views it is holding onto.
			*/
			while (sibling.children.length > 0) sibling.removeChild(0);
		} else {
			const newSibling = new LeafNode(sibling.view, orthogonal(sibling.orientation), sibling.size);
			const siblingSizing = isSiblingVisible ? sibling.orthogonalSize : Sizing.Invisible(sibling.orthogonalSize);
			grandParent.addChild(newSibling, siblingSizing, parentIndex);
		}
		sibling.dispose();
		for (let i = 0; i < sizes.length; i++) grandParent.resizeChild(i, sizes[i]);
		return nodeToRemove.view;
	}
	layout(width, height) {
		const [size, orthogonalSize] = this.root.orientation === "HORIZONTAL" ? [height, width] : [width, height];
		this.root.layout(size, orthogonalSize);
	}
	getNode(location, node = this.root, path = []) {
		if (location.length === 0) return [path, node];
		if (!(node instanceof BranchNode)) throw new TypeError("Invalid location");
		const [index, ...rest] = location;
		if (index < 0 || index >= node.children.length) throw new Error("Invalid location");
		const child = node.children[index];
		path.push(node);
		return this.getNode(rest, child, path);
	}
};

//#endregion
//#region src/gridview/options.ts
const PROPERTY_KEYS_GRIDVIEW = (() => {
	return Object.keys({
		disableAutoResizing: void 0,
		proportionalLayout: void 0,
		orientation: void 0,
		hideBorders: void 0,
		className: void 0
	});
})();

//#endregion
//#region src/resizable.ts
var Resizable = class extends CompositeDisposable {
	get element() {
		return this._element;
	}
	get disableResizing() {
		return this._disableResizing;
	}
	set disableResizing(value) {
		this._disableResizing = value;
	}
	constructor(parentElement, disableResizing = false) {
		super();
		this._lastWidth = -1;
		this._lastHeight = -1;
		this._disableResizing = disableResizing;
		this._element = parentElement;
		this.addDisposables(watchElementResize(this._element, (entry) => {
			if (this.isDisposed)
 /**
			* resize is delayed through requestAnimationFrame so there is a small chance
			* the component has already been disposed of
			*/
			return;
			if (this.disableResizing) return;
			if (!this._element.offsetParent)
 /**
			* offsetParent === null is equivalent to display: none being set on the element or one
			* of it's parents. In the display: none case the size will become (0, 0) which we do
			* not want to propagate.
			*
			* @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
			*
			* You could use checkVisibility() but at the time of writing it's not supported across
			* all Browsers
			*
			* @see https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility
			*/
			return;
			if (!isInDocument(this._element))
 /**
			* since the event is dispatched through requestAnimationFrame there is a small chance
			* the component is no longer attached to the DOM, if that is the case the dimensions
			* are mostly likely all zero and meaningless. we should skip this case.
			*/
			return;
			const width = Math.round(entry.contentRect.width);
			const height = Math.round(entry.contentRect.height);
			if (width === this._lastWidth && height === this._lastHeight) return;
			this._lastWidth = width;
			this._lastHeight = height;
			this.layout(width, height);
		}));
	}
	/**
	* Lay out from the element's current size.
	*
	* The ResizeObserver above only reports asynchronously, so between
	* construction and its first callback the component believes it has no
	* size - and anything built in that window (panels added right after
	* `createDockview`, say) resolves its sizes against zero and collapses to
	* minimums. Concrete components call this once they are fully constructed
	* so that work sees the real size. The same guards as the observer apply:
	* a detached or hidden element has no size worth propagating.
	*/
	layoutFromElement() {
		if (this.disableResizing || !this._element.offsetParent) return;
		if (!isInDocument(this._element)) return;
		const width = Math.round(this._element.clientWidth);
		const height = Math.round(this._element.clientHeight);
		if (width === 0 || height === 0) return;
		this.layout(width, height);
	}
};

//#endregion
//#region src/gridview/baseComponentGridview.ts
const nextLayoutId$1 = sequentialNumberGenerator();
function toTarget(direction) {
	switch (direction) {
		case "left": return "left";
		case "right": return "right";
		case "above": return "top";
		case "below": return "bottom";
		default: return "center";
	}
}
var BaseGrid = class extends Resizable {
	get id() {
		return this._id;
	}
	get size() {
		return this._groups.size;
	}
	get groups() {
		return Array.from(this._groups.values()).map((_) => _.value);
	}
	get width() {
		return this.gridview.width;
	}
	get height() {
		return this.gridview.height;
	}
	get minimumHeight() {
		return this.gridview.minimumHeight;
	}
	get maximumHeight() {
		return this.gridview.maximumHeight;
	}
	get minimumWidth() {
		return this.gridview.minimumWidth;
	}
	get maximumWidth() {
		return this.gridview.maximumWidth;
	}
	get activeGroup() {
		return this._activeGroup;
	}
	get locked() {
		return this.gridview.locked;
	}
	set locked(value) {
		this.gridview.locked = value;
	}
	constructor(container, options) {
		var _options$className;
		super(document.createElement("div"), options.disableAutoResizing);
		this._id = nextLayoutId$1.next();
		this._groups = /* @__PURE__ */ new Map();
		this._onDidRemove = new Emitter();
		this.onDidRemove = this._onDidRemove.event;
		this._onDidAdd = new Emitter();
		this.onDidAdd = this._onDidAdd.event;
		this._onDidMaximizedChange = new Emitter();
		this.onDidMaximizedChange = this._onDidMaximizedChange.event;
		this._onDidActiveChange = new Emitter();
		this.onDidActiveChange = this._onDidActiveChange.event;
		this._bufferOnDidLayoutChange = new AsapEvent();
		this.onDidLayoutChange = Event.map(this._bufferOnDidLayoutChange.onEvent, (reasons) => ({ reasons }));
		this._onDidViewVisibilityChangeMicroTaskQueue = new AsapEvent();
		this.onDidViewVisibilityChangeMicroTaskQueue = this._onDidViewVisibilityChangeMicroTaskQueue.onEvent;
		this.element.style.height = "100%";
		this.element.style.width = "100%";
		this._classNames = new Classnames(this.element);
		this._classNames.setClassNames((_options$className = options.className) !== null && _options$className !== void 0 ? _options$className : "");
		container.appendChild(this.element);
		this.gridview = new Gridview(!!options.proportionalLayout, options.styles, options.orientation, options.locked, options.margin);
		this.gridview.locked = !!options.locked;
		this.element.appendChild(this.gridview.element);
		this.layout(0, 0, true);
		this.addDisposables(this.gridview.onDidMaximizedNodeChange((event) => {
			this._onDidMaximizedChange.fire({
				panel: event.view,
				isMaximized: event.isMaximized
			});
		}), this.gridview.onDidViewVisibilityChange(() => this._onDidViewVisibilityChangeMicroTaskQueue.fire()), this.onDidViewVisibilityChangeMicroTaskQueue(() => {
			this.forceRelayout();
		}), Disposable.from(() => {
			this.element.remove();
		}), this.gridview.onDidChange(() => {
			this._bufferOnDidLayoutChange.fire("geometry");
		}), Event.any(this.onDidAdd, this.onDidRemove)(() => {
			this._bufferOnDidLayoutChange.fire("structure");
		}), this.onDidActiveChange(() => {
			this._bufferOnDidLayoutChange.fire("activePanel");
		}), this.onDidMaximizedChange(() => {
			this._bufferOnDidLayoutChange.fire("geometry");
		}), this._onDidMaximizedChange, this._onDidViewVisibilityChangeMicroTaskQueue, this._bufferOnDidLayoutChange);
	}
	setVisible(panel, visible) {
		this.gridview.setViewVisible(getGridLocation(panel.element), visible);
		this._bufferOnDidLayoutChange.fire("geometry");
	}
	isVisible(panel) {
		return this.gridview.isViewVisible(getGridLocation(panel.element));
	}
	updateOptions(options) {
		if ("proportionalLayout" in options) {
			var _options$proportional;
			this.gridview.proportionalLayout = (_options$proportional = options.proportionalLayout) !== null && _options$proportional !== void 0 ? _options$proportional : true;
		}
		if (options.orientation) this.gridview.orientation = options.orientation;
		if ("styles" in options) {}
		if ("disableAutoResizing" in options) {
			var _options$disableAutoR;
			this.disableResizing = (_options$disableAutoR = options.disableAutoResizing) !== null && _options$disableAutoR !== void 0 ? _options$disableAutoR : false;
		}
		if ("locked" in options) {
			var _options$locked;
			this.locked = (_options$locked = options.locked) !== null && _options$locked !== void 0 ? _options$locked : false;
		}
		if ("margin" in options) {
			var _options$margin;
			this.gridview.margin = (_options$margin = options.margin) !== null && _options$margin !== void 0 ? _options$margin : 0;
		}
		if ("className" in options) {
			var _options$className2;
			this._classNames.setClassNames((_options$className2 = options.className) !== null && _options$className2 !== void 0 ? _options$className2 : "");
		}
	}
	maximizeGroup(panel) {
		this.gridview.maximizeView(panel);
		this.doSetGroupActive(panel);
	}
	isMaximizedGroup(panel) {
		return this.gridview.maximizedView() === panel;
	}
	exitMaximizedGroup() {
		this.gridview.exitMaximizedView();
	}
	hasMaximizedGroup() {
		return this.gridview.hasMaximizedView();
	}
	doAddGroup(group, location = [0], size, gridview = this.gridview) {
		gridview.addView(group, size !== null && size !== void 0 ? size : Sizing.Distribute, location);
		this._onDidAdd.fire(group);
	}
	doRemoveGroup(group, options) {
		if (!this._groups.has(group.id)) throw new Error("invalid operation");
		const item = this._groups.get(group.id);
		const view = this.gridview.remove(group, Sizing.Distribute);
		if (item && !(options === null || options === void 0 ? void 0 : options.skipDispose)) {
			item.disposable.dispose();
			item.value.dispose();
			this._groups.delete(group.id);
			this._onDidRemove.fire(group);
		}
		if (!(options === null || options === void 0 ? void 0 : options.skipActive) && this._activeGroup === group) {
			const groups = Array.from(this._groups.values());
			this.doSetGroupActive(groups.length > 0 ? groups[0].value : void 0);
		}
		return view;
	}
	getPanel(id) {
		var _this$_groups$get;
		return (_this$_groups$get = this._groups.get(id)) === null || _this$_groups$get === void 0 ? void 0 : _this$_groups$get.value;
	}
	doSetGroupActive(group) {
		if (this._activeGroup === group) return;
		if (this._activeGroup) this._activeGroup.setActive(false);
		if (group) group.setActive(true);
		this._activeGroup = group;
		this._onDidActiveChange.fire(group);
	}
	removeGroup(group) {
		this.doRemoveGroup(group);
	}
	activateNext(options) {
		var _options, _this$gridview$next;
		(_options = options) !== null && _options !== void 0 || (options = {});
		if (!options.group) {
			if (!this.activeGroup) return;
			options.group = this.activeGroup;
		}
		const location = getGridLocation(options.group.element);
		const next = (_this$gridview$next = this.gridview.next(location)) === null || _this$gridview$next === void 0 ? void 0 : _this$gridview$next.view;
		this.doSetGroupActive(next);
	}
	activatePrevious(options) {
		var _options2, _this$gridview$previo;
		(_options2 = options) !== null && _options2 !== void 0 || (options = {});
		if (!options.group) {
			if (!this.activeGroup) return;
			options.group = this.activeGroup;
		}
		const location = getGridLocation(options.group.element);
		const next = (_this$gridview$previo = this.gridview.previous(location)) === null || _this$gridview$previo === void 0 ? void 0 : _this$gridview$previo.view;
		this.doSetGroupActive(next);
	}
	forceRelayout() {
		this.layout(this.width, this.height, true);
	}
	layout(width, height, forceResize) {
		if (!(forceResize || width !== this.width || height !== this.height)) return;
		this.gridview.element.style.height = `${height}px`;
		this.gridview.element.style.width = `${width}px`;
		this.gridview.layout(width, height);
	}
	dispose() {
		this._onDidActiveChange.dispose();
		this._onDidAdd.dispose();
		this._onDidRemove.dispose();
		for (const group of this.groups) group.dispose();
		this.gridview.dispose();
		super.dispose();
	}
};

//#endregion
//#region \0@oxc-project+runtime@0.139.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}

//#endregion
//#region \0@oxc-project+runtime@0.139.0/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}

//#endregion
//#region \0@oxc-project+runtime@0.139.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}

//#endregion
//#region \0@oxc-project+runtime@0.139.0/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}

//#endregion
//#region \0@oxc-project+runtime@0.139.0/helpers/esm/objectSpread2.js
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}

//#endregion
//#region src/dockview/accessibilityMessages.ts
/** Where a drop position lands, phrased for the *edge prompt*. */
function edgeWhere(position, target) {
	return position === "center" ? `Tab into ${target}` : `Split ${position} of ${target}`;
}
/** Where a drop position landed, phrased for the *commit* sentence. */
function committedWhere(position, target) {
	return position === "center" ? `docked into ${target}` : `split ${position} of ${target}`;
}
const DEFAULT_MESSAGES = {
	panelOpened: (title) => `${title} opened`,
	panelClosed: (title) => `${title} closed`,
	groupMaximized: (title) => `${title} maximized`,
	groupRestored: (title) => `${title} restored`,
	groupFloated: (title) => `${title} floated`,
	groupDocked: (title) => `${title} docked`,
	groupPoppedOut: (title) => `${title} opened in a new window`,
	closeTab: (title) => `Close ${title}`,
	closeTabPlain: () => `Close`,
	movePickTarget: (source, target, current, total) => `Moving ${source}. Target ${target}, ${current} of ${total}. Enter to choose where, Escape to cancel.`,
	movePickEdge: (position, target) => `${edgeWhere(position, target)}. Arrows to change, Enter to confirm, Escape to go back.`,
	moveCommitted: (source, target, position) => `${source} ${committedWhere(position, target)}.`,
	moveCancelled: () => `Move cancelled.`,
	moveNotAllowed: () => `That move is not allowed.`,
	moveFloated: (source) => `${source} floated.`
};
/** Merge an app's partial overrides over the English defaults. */
function resolveMessages(overrides) {
	return overrides ? _objectSpread2(_objectSpread2({}, DEFAULT_MESSAGES), overrides) : DEFAULT_MESSAGES;
}

//#endregion
//#region src/api/component.api.ts
var SplitviewApi = class {
	/**
	* The minimum size  the component can reach where size is measured in the direction of orientation provided.
	*/
	get minimumSize() {
		return this.component.minimumSize;
	}
	/**
	* The maximum size the component can reach where size is measured in the direction of orientation provided.
	*/
	get maximumSize() {
		return this.component.maximumSize;
	}
	/**
	* Width of the component.
	*/
	get width() {
		return this.component.width;
	}
	/**
	* Height of the component.
	*/
	get height() {
		return this.component.height;
	}
	/**
	* The current number of panels.
	*/
	get length() {
		return this.component.length;
	}
	/**
	* The current orientation of the component.
	*/
	get orientation() {
		return this.component.orientation;
	}
	/**
	* The list of current panels.
	*/
	get panels() {
		return this.component.panels;
	}
	/**
	* Invoked after a layout is loaded through the `fromJSON` method.
	*/
	get onDidLayoutFromJSON() {
		return this.component.onDidLayoutFromJSON;
	}
	/**
	* Invoked whenever any aspect of the layout changes.
	* If listening to this event it may be worth debouncing ouputs.
	* The event carries the `reasons` for the change.
	*/
	get onDidLayoutChange() {
		return this.component.onDidLayoutChange;
	}
	/**
	* Invoked when a view is added.
	*/
	get onDidAddView() {
		return this.component.onDidAddView;
	}
	/**
	* Invoked when a view is removed.
	*/
	get onDidRemoveView() {
		return this.component.onDidRemoveView;
	}
	constructor(component) {
		this.component = component;
	}
	/**
	* Removes an existing panel and optionally provide a `Sizing` method
	* for the subsequent resize.
	*/
	removePanel(panel, sizing) {
		this.component.removePanel(panel, sizing);
	}
	/**
	* Focus the component.
	*/
	focus() {
		this.component.focus();
	}
	/**
	* Get the reference to a panel given it's `string` id.
	*/
	getPanel(id) {
		return this.component.getPanel(id);
	}
	/**
	* Layout the panel with a width and height.
	*/
	layout(width, height) {
		return this.component.layout(width, height);
	}
	/**
	* Add a new panel and return the created instance.
	*/
	addPanel(options) {
		return this.component.addPanel(options);
	}
	/**
	* Move a panel given it's current and desired index.
	*/
	movePanel(from, to) {
		this.component.movePanel(from, to);
	}
	/**
	* Deserialize a layout to built a splitivew.
	*/
	fromJSON(data) {
		this.component.fromJSON(data);
	}
	/** Serialize a layout */
	toJSON() {
		return this.component.toJSON();
	}
	/**
	* Remove all panels and clear the component.
	*/
	clear() {
		this.component.clear();
	}
	/**
	* Update configuratable options.
	*/
	updateOptions(options) {
		this.component.updateOptions(options);
	}
	/**
	* Release resources and teardown component. Do not call when using framework versions of dockview.
	*/
	dispose() {
		this.component.dispose();
	}
};
var PaneviewApi = class {
	/**
	* The minimum size  the component can reach where size is measured in the direction of orientation provided.
	*/
	get minimumSize() {
		return this.component.minimumSize;
	}
	/**
	* The maximum size the component can reach where size is measured in the direction of orientation provided.
	*/
	get maximumSize() {
		return this.component.maximumSize;
	}
	/**
	* Width of the component.
	*/
	get width() {
		return this.component.width;
	}
	/**
	* Height of the component.
	*/
	get height() {
		return this.component.height;
	}
	/**
	* All panel objects.
	*/
	get panels() {
		return this.component.panels;
	}
	/**
	* Invoked when any layout change occures, an aggregation of many events.
	* The event carries the `reasons` for the change.
	*/
	get onDidLayoutChange() {
		return this.component.onDidLayoutChange;
	}
	/**
	* Invoked after a layout is deserialzied using the `fromJSON` method.
	*/
	get onDidLayoutFromJSON() {
		return this.component.onDidLayoutFromJSON;
	}
	/**
	* Invoked when a panel is added. May be called multiple times when moving panels.
	*/
	get onDidAddView() {
		return this.component.onDidAddView;
	}
	/**
	* Invoked when a panel is removed. May be called multiple times when moving panels.
	*/
	get onDidRemoveView() {
		return this.component.onDidRemoveView;
	}
	/**
	* Invoked when a Drag'n'Drop event occurs that the component was unable to handle. Exposed for custom Drag'n'Drop functionality.
	*/
	get onDidDrop() {
		return this.component.onDidDrop;
	}
	get onUnhandledDragOver() {
		return this.component.onUnhandledDragOver;
	}
	constructor(component) {
		this.component = component;
	}
	/**
	* Remove a panel given the panel object.
	*/
	removePanel(panel) {
		this.component.removePanel(panel);
	}
	/**
	* Get a panel object given a `string` id. May return `undefined`.
	*/
	getPanel(id) {
		return this.component.getPanel(id);
	}
	/**
	* Move a panel given it's current and desired index.
	*/
	movePanel(from, to) {
		this.component.movePanel(from, to);
	}
	/**
	*  Focus the component. Will try to focus an active panel if one exists.
	*/
	focus() {
		this.component.focus();
	}
	/**
	* Force resize the component to an exact width and height. Read about auto-resizing before using.
	*/
	layout(width, height) {
		this.component.layout(width, height);
	}
	/**
	* Add a panel and return the created object.
	*/
	addPanel(options) {
		return this.component.addPanel(options);
	}
	/**
	* Create a component from a serialized object.
	*/
	fromJSON(data) {
		this.component.fromJSON(data);
	}
	/**
	* Create a serialized object of the current component.
	*/
	toJSON() {
		return this.component.toJSON();
	}
	/**
	* Reset the component back to an empty and default state.
	*/
	clear() {
		this.component.clear();
	}
	/**
	* Update configuratable options.
	*/
	updateOptions(options) {
		this.component.updateOptions(options);
	}
	/**
	* Release resources and teardown component. Do not call when using framework versions of dockview.
	*/
	dispose() {
		this.component.dispose();
	}
};
var GridviewApi = class {
	/**
	* Width of the component.
	*/
	get width() {
		return this.component.width;
	}
	/**
	* Height of the component.
	*/
	get height() {
		return this.component.height;
	}
	/**
	* Minimum height of the component.
	*/
	get minimumHeight() {
		return this.component.minimumHeight;
	}
	/**
	* Maximum height of the component.
	*/
	get maximumHeight() {
		return this.component.maximumHeight;
	}
	/**
	* Minimum width of the component.
	*/
	get minimumWidth() {
		return this.component.minimumWidth;
	}
	/**
	* Maximum width of the component.
	*/
	get maximumWidth() {
		return this.component.maximumWidth;
	}
	/**
	* Invoked when any layout change occures, an aggregation of many events.
	* The event carries the `reasons` for the change.
	*/
	get onDidLayoutChange() {
		return this.component.onDidLayoutChange;
	}
	/**
	* Invoked when a panel is added. May be called multiple times when moving panels.
	*/
	get onDidAddPanel() {
		return this.component.onDidAddGroup;
	}
	/**
	* Invoked when a panel is removed. May be called multiple times when moving panels.
	*/
	get onDidRemovePanel() {
		return this.component.onDidRemoveGroup;
	}
	/**
	* Invoked when the active panel changes. May be undefined if no panel is active.
	*/
	get onDidActivePanelChange() {
		return this.component.onDidActiveGroupChange;
	}
	/**
	* Invoked after a layout is deserialzied using the `fromJSON` method.
	*/
	get onDidLayoutFromJSON() {
		return this.component.onDidLayoutFromJSON;
	}
	/**
	* All panel objects.
	*/
	get panels() {
		return this.component.groups;
	}
	/**
	* Current orientation. Can be changed after initialization.
	*/
	get orientation() {
		return this.component.orientation;
	}
	set orientation(value) {
		this.component.updateOptions({ orientation: value });
	}
	constructor(component) {
		this.component = component;
	}
	/**
	*  Focus the component. Will try to focus an active panel if one exists.
	*/
	focus() {
		this.component.focus();
	}
	/**
	* Force resize the component to an exact width and height. Read about auto-resizing before using.
	*/
	layout(width, height, force = false) {
		this.component.layout(width, height, force);
	}
	/**
	* Add a panel and return the created object.
	*/
	addPanel(options) {
		return this.component.addPanel(options);
	}
	/**
	* Remove a panel given the panel object.
	*/
	removePanel(panel, sizing) {
		this.component.removePanel(panel, sizing);
	}
	/**
	* Move a panel in a particular direction relative to another panel.
	*/
	movePanel(panel, options) {
		this.component.movePanel(panel, options);
	}
	/**
	* Get a panel object given a `string` id. May return `undefined`.
	*/
	getPanel(id) {
		return this.component.getPanel(id);
	}
	/**
	* Create a component from a serialized object.
	*/
	fromJSON(data) {
		return this.component.fromJSON(data);
	}
	/**
	* Create a serialized object of the current component.
	*/
	toJSON() {
		return this.component.toJSON();
	}
	/**
	* Reset the component back to an empty and default state.
	*/
	clear() {
		this.component.clear();
	}
	updateOptions(options) {
		this.component.updateOptions(options);
	}
	/**
	* Release resources and teardown component. Do not call when using framework versions of dockview.
	*/
	dispose() {
		this.component.dispose();
	}
};
var DockviewApi = class {
	/**
	* The unique identifier for this instance. Used to manage scope of Drag'n'Drop events.
	*/
	get id() {
		return this.component.id;
	}
	/**
	* Width of the component.
	*/
	get width() {
		return this.component.width;
	}
	/**
	* Height of the component.
	*/
	get height() {
		return this.component.height;
	}
	/**
	* Minimum height of the component.
	*/
	get minimumHeight() {
		return this.component.minimumHeight;
	}
	/**
	* Maximum height of the component.
	*/
	get maximumHeight() {
		return this.component.maximumHeight;
	}
	/**
	* Minimum width of the component.
	*/
	get minimumWidth() {
		return this.component.minimumWidth;
	}
	/**
	* Maximum width of the component.
	*/
	get maximumWidth() {
		return this.component.maximumWidth;
	}
	/**
	* Total number of groups.
	*/
	get size() {
		return this.component.size;
	}
	/**
	* The active tab-group color palette. Reflects the configured
	* `tabGroupColors` option, or the built-in defaults when unset.
	* Useful for custom chip renderers that want to roll their own
	* picker UI.
	*/
	get tabGroupColors() {
		return this.component.tabGroupColorPalette.entries();
	}
	/**
	* Total number of panels.
	*/
	get totalPanels() {
		return this.component.totalPanels;
	}
	/**
	* Invoked when the active group changes. May be undefined if no group is active.
	*/
	get onDidActiveGroupChange() {
		return this.component.onDidActiveGroupChange;
	}
	/**
	* Invoked when a group is added. May be called multiple times when moving groups.
	*/
	get onDidAddGroup() {
		return this.component.onDidAddGroup;
	}
	/**
	* Invoked when a group is removed. May be called multiple times when moving groups.
	*/
	get onDidRemoveGroup() {
		return this.component.onDidRemoveGroup;
	}
	/**
	* Invoked when the active panel changes. The event carries the active
	* `panel` (may be undefined if no panel is active) and the
	* {@link DockviewOrigin} (`'user'` vs `'api'`) of the change.
	*/
	get onDidActivePanelChange() {
		return this.component.onDidActivePanelChange;
	}
	/**
	* Fired when a panel is pinned or unpinned (PinnedTabs module). Carries the
	* panel and its new `isPinned` state.
	*/
	get onDidPanelPinnedChange() {
		return this.component.onDidPanelPinnedChange;
	}
	/**
	* Invoked when a panel is added. May be called multiple times when moving panels.
	*/
	get onDidAddPanel() {
		return this.component.onDidAddPanel;
	}
	/**
	* Invoked when a panel is removed. May be called multiple times when moving panels.
	*/
	get onDidRemovePanel() {
		return this.component.onDidRemovePanel;
	}
	get onDidMovePanel() {
		return this.component.onDidMovePanel;
	}
	/**
	* Invoked after a layout is deserialzied using the `fromJSON` method.
	*/
	get onDidLayoutFromJSON() {
		return this.component.onDidLayoutFromJSON;
	}
	/**
	* Invoked when any layout change occures, an aggregation of many events.
	* The event carries the `reasons` for the change.
	*/
	get onDidLayoutChange() {
		return this.component.onDidLayoutChange;
	}
	/**
	* Invoked when a Drag'n'Drop event occurs that the component was unable to handle. Exposed for custom Drag'n'Drop functionality.
	*/
	get onDidDrop() {
		return this.component.onDidDrop;
	}
	/**
	* Invoked when a Drag'n'Drop event occurs but before dockview handles it giving the user an opportunity to intecept and
	* prevent the event from occuring using the standard `preventDefault()` syntax.
	*
	* Preventing certain events may causes unexpected behaviours, use carefully.
	*/
	get onWillDrop() {
		return this.component.onWillDrop;
	}
	/**
	* Fires before each top-level structural layout mutation (add / remove /
	* move / float / popout / maximize / load / clear). Compound operations
	* (e.g. a drag) fire once. Pair with `onDidMutateLayout` to bracket a
	* change, which is useful for undo/redo, autosave and dirty-tracking.
	*/
	get onWillMutateLayout() {
		return this.component.onWillMutateLayout;
	}
	/** Fires after each top-level structural layout mutation. See `onWillMutateLayout`. */
	get onDidMutateLayout() {
		return this.component.onDidMutateLayout;
	}
	/**
	* Invoked before an overlay is shown indicating a drop target.
	*
	* Calling `event.preventDefault()` will prevent the overlay being shown and prevent
	* the any subsequent drop event.
	*/
	get onWillShowOverlay() {
		return this.component.onWillShowOverlay;
	}
	/**
	* Invoked before a group is dragged.
	*
	* Calling `event.nativeEvent.preventDefault()` will prevent the group drag starting.
	*
	*/
	get onWillDragGroup() {
		return this.component.onWillDragGroup;
	}
	/**
	* Invoked before a panel is dragged.
	*
	* Calling `event.nativeEvent.preventDefault()` will prevent the panel drag starting.
	*/
	get onWillDragPanel() {
		return this.component.onWillDragPanel;
	}
	get onUnhandledDragOver() {
		return this.component.onUnhandledDragOver;
	}
	/**
	* The drag-and-drop backends currently live: `dndStrategy` resolved against
	* this device, which `'auto'` reads from the primary input device. Only an
	* HTML5 drag can leave the window it started in, so check `html5` before
	* relying on a drag between a popout window and the main window.
	*/
	get dndCapabilities() {
		return this.component.dndCapabilities;
	}
	get onDidPopoutGroupSizeChange() {
		return this.component.onDidPopoutGroupSizeChange;
	}
	get onDidPopoutGroupPositionChange() {
		return this.component.onDidPopoutGroupPositionChange;
	}
	/**
	* Fires when a popout group successfully opens in its own window, carrying
	* the live `Window` handle. Use it to route focus or attach per-document
	* listeners. Enumerate the current popouts at any time with `getPopouts()`.
	*/
	get onDidAddPopoutGroup() {
		return this.component.onDidAddPopoutGroup;
	}
	/**
	* Fires when a popout group is removed, whether the user closed its window
	* or it was docked back programmatically. Symmetric with
	* {@link onDidAddPopoutGroup}; not fired during component disposal.
	*/
	get onDidRemovePopoutGroup() {
		return this.component.onDidRemovePopoutGroup;
	}
	/**
	* Fires when a popout window could not be used, carrying which way it
	* failed: the URL was refused, the browser blocked the window, the host
	* returned a window whose document the opener cannot reach, or it closed
	* before loading. The group stays in (or returns to) the main grid.
	*/
	get onDidOpenPopoutWindowFail() {
		return this.component.onDidOpenPopoutWindowFail;
	}
	/**
	* Fires as dockview lets go of a popout window, while that window is still
	* open, carrying its live `Window` handle. Covers every popout the component
	* opened and every reason for closing one, disposal included;
	* {@link onDidAddPopoutGroup} is the opening half.
	*
	* For hosts that own their windows: in a desktop webview the page's own
	* `close()` can be a no-op, so the shell has to be told.
	*/
	get onWillClosePopoutWindow() {
		return this.component.onWillClosePopoutWindow;
	}
	/** Enumerate the popout groups currently open in their own windows. */
	getPopouts() {
		return this.component.getPopouts();
	}
	/**
	* Invoked when a tab group is created in any group.
	*/
	get onDidCreateTabGroup() {
		return this.component.onDidCreateTabGroup;
	}
	/**
	* Invoked when a tab group is destroyed in any group.
	*/
	get onDidDestroyTabGroup() {
		return this.component.onDidDestroyTabGroup;
	}
	/**
	* Invoked when a panel is added to a tab group.
	*/
	get onDidAddPanelToTabGroup() {
		return this.component.onDidAddPanelToTabGroup;
	}
	/**
	* Invoked when a panel is removed from a tab group.
	*/
	get onDidRemovePanelFromTabGroup() {
		return this.component.onDidRemovePanelFromTabGroup;
	}
	/**
	* Invoked when a tab group's properties (label, color) change.
	*/
	get onDidTabGroupChange() {
		return this.component.onDidTabGroupChange;
	}
	/**
	* Invoked when a tab group is collapsed or expanded.
	*/
	get onDidTabGroupCollapsedChange() {
		return this.component.onDidTabGroupCollapsedChange;
	}
	/**
	* All panel objects.
	*/
	get panels() {
		return this.component.panels;
	}
	/**
	* All group objects.
	*/
	get groups() {
		return this.component.groups;
	}
	/**
	* The nearest grid group in a spatial direction from `group`, comparing
	* group centre points, e.g. the group visually to the left. Floating and
	* popout groups are ignored. Returns `undefined` when there is no group in
	* that direction. Pair with `group.api.boundingBox` to build your own
	* spatial navigation.
	*/
	adjacentGroupInDirection(group, direction) {
		return this.component.adjacentGroupInDirection(group, direction);
	}
	/**
	*  Active panel object.
	*/
	get activePanel() {
		return this.component.activePanel;
	}
	/**
	* Active group object.
	*/
	get activeGroup() {
		return this.component.activeGroup;
	}
	/**
	* The resolved accessibility message catalog (the app's `messages`
	* overrides merged over the English defaults). Used by parts that surface
	* localisable AT strings, e.g. the default tab's close-button label.
	*/
	get messages() {
		return resolveMessages(this.component.options.messages);
	}
	constructor(component) {
		this.component = component;
	}
	/**
	*  Focus the component. Will try to focus an active panel if one exists.
	*/
	focus() {
		this.component.focus();
	}
	/**
	* Get a panel object given a `string` id. May return `undefined`.
	*/
	getPanel(id) {
		return this.component.getGroupPanel(id);
	}
	/**
	* Force resize the component to an exact width and height. Read about auto-resizing before using.
	*/
	layout(width, height, force = false) {
		this.component.layout(width, height, force);
	}
	/**
	* Add a panel and return the created object.
	*/
	addPanel(options) {
		return this.component.withOrigin("api", () => this.component.addPanel(options));
	}
	/**
	* Remove a panel given the panel object.
	*
	* `removeEmptyGroup` overrides the `closeEmptyGroups` option for this
	* call: `false` keeps the group if the panel was its last one, `true`
	* removes it.
	*/
	removePanel(panel, options) {
		this.component.withOrigin("api", () => this.component.removePanel(panel, options));
	}
	/**
	* Add a group and return the created object.
	*/
	addGroup(options) {
		return this.component.withOrigin("api", () => this.component.addGroup(options));
	}
	/**
	* Serialize one group together with the state of every panel it holds.
	* The result is self-contained and can be rehydrated with
	* `addGroupFromJSON`, on this instance or another one.
	*/
	serializeGroup(group) {
		return this.component.serializeGroup(group);
	}
	/**
	* Rebuild a group from `serializeGroup` output and add it to the live
	* layout, positioned as for `addGroup`, leaving the rest of the layout
	* untouched. Throws before changing anything if a panel id is already in
	* use.
	*/
	addGroupFromJSON(data, options) {
		return this.component.withOrigin("api", () => this.component.addGroupFromJSON(data, options));
	}
	/**
	* Add a panel from its `toJSON()` state, placed as `addPanel` places
	* one: the counterpart to `panel.toJSON()` for a single tab moving
	* between layouts or instances, as `addGroupFromJSON` is to
	* `serializeGroup`. Throws before changing anything if the panel id is
	* already in use.
	*/
	addPanelFromJSON(state, options) {
		return this.component.withOrigin("api", () => this.component.addPanelFromJSON(state, options));
	}
	/**
	* Close all groups and panels.
	*/
	closeAllGroups() {
		return this.component.withOrigin("api", () => this.component.closeAllGroups());
	}
	/**
	* Remove a group and any panels within the group.
	*/
	removeGroup(group) {
		this.component.withOrigin("api", () => this.component.removeGroup(group));
	}
	/**
	* Get a group object given a `string` id. May return undefined.
	*/
	getGroup(id) {
		return this.component.getPanel(id);
	}
	/**
	* Add a floating group
	*/
	addFloatingGroup(item, options) {
		return this.component.withOrigin("api", () => this.component.addFloatingGroup(item, options));
	}
	/**
	* Create a component from a serialized object.
	*/
	fromJSON(data, options) {
		this.component.withOrigin("api", () => this.component.fromJSON(data, options));
	}
	/**
	* Create a serialized object of the current component.
	*/
	toJSON() {
		return this.component.toJSON();
	}
	/**
	* Reset the component back to an empty and default state.
	*/
	clear() {
		this.component.withOrigin("api", () => this.component.clear());
	}
	/**
	* Undo the previous recorded layout mutation. No-op when there is nothing
	* to undo, when `layoutHistory.enabled` is not set, or when the
	* LayoutHistory module is absent.
	*/
	undo() {
		this.component.undo();
	}
	/** Re-apply the next layout mutation undone via {@link undo}. */
	redo() {
		this.component.redo();
	}
	/** Whether {@link undo} would do something. Reactive via {@link onDidChangeHistory}. */
	get canUndo() {
		return this.component.canUndo;
	}
	/** Whether {@link redo} would do something. */
	get canRedo() {
		return this.component.canRedo;
	}
	/** Drop both undo and redo stacks (e.g. on document switch). */
	clearHistory() {
		this.component.clearHistory();
	}
	/** Fires whenever the undo/redo stacks change. */
	get onDidChangeHistory() {
		return this.component.onDidChangeHistory;
	}
	/**
	* Whether Smart Guides snapping is active (the `smartGuides` option is
	* present + enabled and the module is registered). Reactive via
	* {@link setSmartGuidesEnabled}.
	*/
	get smartGuidesEnabled() {
		return this.component.smartGuidesEnabled;
	}
	/** Toggle Smart Guides snapping at runtime (no-op when the module is absent). */
	setSmartGuidesEnabled(enabled) {
		this.component.setSmartGuidesEnabled(enabled);
	}
	/** Merge a partial Smart Guides option override in at runtime. */
	updateSmartGuidesOptions(options) {
		this.component.updateSmartGuidesOptions(options);
	}
	/** Fires when a dragged floating group commits an alignment snap on drop. */
	get onDidSnapFloat() {
		return this.component.onDidSnapFloat;
	}
	/** Fires when a dragged floating group docks/merges into another on drop. */
	get onDidSnapTogether() {
		return this.component.onDidSnapTogether;
	}
	/**
	* Resolves once any in-flight popout-window restoration completes. Popout
	* windows re-open asynchronously, so after an {@link undo} / {@link redo} (or
	* {@link fromJSON}) that re-opens a popout, await this to know the window is
	* ready. Already-resolved when nothing is restoring.
	*/
	get popoutRestorationPromise() {
		return this.component.popoutRestorationPromise;
	}
	/**
	* Activate the next panel or group, moving focus programmatically. Pass
	* `{ includePanel: true }` to step through the panels of the active group
	* before advancing to the next group.
	*/
	activateNext(options) {
		this.component.activateNext(options);
	}
	/**
	* Activate the previous panel or group, moving focus programmatically. Pass
	* `{ includePanel: true }` to step through the panels of the active group
	* before advancing to the previous group.
	*/
	activatePrevious(options) {
		this.component.activatePrevious(options);
	}
	/**
	* @deprecated Use {@link DockviewApi.activateNext} instead. Renamed because
	* this advances the active panel/group (focus), it does not relocate a
	* panel. Removal planned for a future major release.
	*/
	moveToNext(options) {
		this.activateNext(options);
	}
	/**
	* @deprecated Use {@link DockviewApi.activatePrevious} instead. Renamed
	* because this advances the active panel/group (focus), it does not
	* relocate a panel. Removal planned for a future major release.
	*/
	moveToPrevious(options) {
		this.activatePrevious(options);
	}
	maximizeGroup(panel) {
		this.component.withOrigin("api", () => this.component.maximizeGroup(panel.group));
	}
	hasMaximizedGroup() {
		return this.component.hasMaximizedGroup();
	}
	exitMaximizedGroup() {
		this.component.withOrigin("api", () => this.component.exitMaximizedGroup());
	}
	get onDidMaximizedGroupChange() {
		return this.component.onDidMaximizedGroupChange;
	}
	/**
	* Add a popout group in a new Window
	*/
	addPopoutGroup(item, options) {
		return this.component.withOrigin("api", () => this.component.addPopoutGroup(item, options));
	}
	/**
	* Add an edge group at the given position. Returns the group panel API
	* for the newly created group. Throws if a group already exists there.
	*/
	addEdgeGroup(position, options) {
		return this.component.addEdgeGroup(position, options);
	}
	/**
	* Reveal (create-or-fill) the edge group at `position` and move the dragged
	* item described by `data` into it. A newly created edge group tears down to
	* zero footprint when later emptied. Drives the dock-to-edge groups behind
	* the `dockToEdgeGroups` option; a no-op if edge groups are unavailable.
	*/
	revealEdgeGroupWithData(position, data, options) {
		this.component.revealEdgeGroupWithData(position, data, options);
	}
	/**
	* Get the group panel API for an edge group at the given position.
	* Returns `undefined` if no edge group is configured at that position.
	*/
	getEdgeGroup(position) {
		return this.component.getEdgeGroup(position);
	}
	/**
	* Set the visibility of an edge group.
	*/
	setEdgeGroupVisible(position, visible) {
		this.component.setEdgeGroupVisible(position, visible);
	}
	/**
	* Check whether an edge group is currently visible.
	*/
	isEdgeGroupVisible(position) {
		return this.component.isEdgeGroupVisible(position);
	}
	/**
	* Remove an edge group and reclaim its slot in the layout.
	* All panels inside the group are disposed. Throws if no group exists at position.
	*/
	removeEdgeGroup(position) {
		this.component.removeEdgeGroup(position);
	}
	/**
	* Pin (expand) the collapsed edge group at `position`. Requires the
	* auto-hide edge groups module; no-op when it is absent.
	*/
	pinEdgeGroup(position) {
		this.component.pinEdgeGroup(position);
	}
	/** Auto-hide (collapse to a strip) the edge group at `position`. */
	autoHideEdgeGroup(position) {
		this.component.autoHideEdgeGroup(position);
	}
	/**
	* Peek (slide out as an overlay, without reflowing the grid) or close the
	* collapsed edge group at `position`. No-op when the auto-hide module is
	* absent or the group is not collapsed.
	*/
	peekEdgeGroup(position, peek) {
		this.component.peekEdgeGroup(position, peek);
	}
	updateOptions(options) {
		this.component.updateOptions(options);
	}
	_getGroupModel(groupId) {
		const group = this.component.getPanel(groupId);
		if (!group) throw new Error(`dockview: group '${groupId}' not found`);
		return group.model;
	}
	createTabGroup(options) {
		const model = this._getGroupModel(options.groupId);
		return this.component.withOrigin("api", () => model.createTabGroup({
			label: options.label,
			color: options.color,
			componentParams: options.componentParams
		}));
	}
	dissolveTabGroup(options) {
		const model = this._getGroupModel(options.groupId);
		this.component.withOrigin("api", () => model.dissolveTabGroup(options.tabGroupId));
	}
	addPanelToTabGroup(options) {
		const model = this._getGroupModel(options.groupId);
		this.component.withOrigin("api", () => model.addPanelToTabGroup(options.tabGroupId, options.panelId, options.index));
	}
	removePanelFromTabGroup(options) {
		const model = this._getGroupModel(options.groupId);
		this.component.withOrigin("api", () => model.removePanelFromTabGroup(options.panelId));
	}
	getTabGroups(options) {
		return this._getGroupModel(options.groupId).getTabGroups();
	}
	getTabGroupForPanel(options) {
		return this._getGroupModel(options.groupId).getTabGroupForPanel(options.panelId);
	}
	moveTabGroup(options) {
		this._getGroupModel(options.groupId).moveTabGroup(options.tabGroupId, options.index);
	}
	/**
	* Release resources and teardown component. Do not call when using framework versions of dockview.
	*/
	dispose() {
		this.component.dispose();
	}
};

//#endregion
//#region src/dnd/dnd.ts
var DragAndDropObserver = class extends CompositeDisposable {
	constructor(element, callbacks) {
		super();
		this.element = element;
		this.callbacks = callbacks;
		this.target = null;
		this.registerListeners();
	}
	onDragEnter(e) {
		this.target = e.target;
		this.callbacks.onDragEnter(e);
	}
	onDragOver(e) {
		e.preventDefault();
		if (this.callbacks.onDragOver) this.callbacks.onDragOver(e);
	}
	onDragLeave(e) {
		if (this.target === e.target) {
			this.target = null;
			this.callbacks.onDragLeave(e);
		}
	}
	onDragEnd(e) {
		this.target = null;
		this.callbacks.onDragEnd(e);
	}
	onDrop(e) {
		this.callbacks.onDrop(e);
	}
	registerListeners() {
		this.addDisposables(addDisposableListener(this.element, "dragenter", (e) => {
			this.onDragEnter(e);
		}, true));
		this.addDisposables(addDisposableListener(this.element, "dragover", (e) => {
			this.onDragOver(e);
		}, true));
		this.addDisposables(addDisposableListener(this.element, "dragleave", (e) => {
			this.onDragLeave(e);
		}));
		this.addDisposables(addDisposableListener(this.element, "dragend", (e) => {
			this.onDragEnd(e);
		}));
		this.addDisposables(addDisposableListener(this.element, "drop", (e) => {
			this.onDrop(e);
		}));
	}
};

//#endregion
//#region src/dnd/dropOverlay.ts
const DEFAULT_SIZE = {
	value: 50,
	type: "percentage"
};
const SMALL_WIDTH_BOUNDARY = 100;
const SMALL_HEIGHT_BOUNDARY = 100;
function createOverlayElements() {
	const dropzone = document.createElement("div");
	dropzone.className = "dv-drop-target-dropzone";
	const selection = document.createElement("div");
	selection.className = "dv-drop-target-selection";
	dropzone.appendChild(selection);
	return {
		dropzone,
		selection
	};
}
function computeOverlayShape(quadrant, width, height, overlayModel) {
	var _overlayModel$smallWi, _overlayModel$smallHe, _overlayModel$size;
	const smallWidthBoundary = (_overlayModel$smallWi = overlayModel === null || overlayModel === void 0 ? void 0 : overlayModel.smallWidthBoundary) !== null && _overlayModel$smallWi !== void 0 ? _overlayModel$smallWi : SMALL_WIDTH_BOUNDARY;
	const smallHeightBoundary = (_overlayModel$smallHe = overlayModel === null || overlayModel === void 0 ? void 0 : overlayModel.smallHeightBoundary) !== null && _overlayModel$smallHe !== void 0 ? _overlayModel$smallHe : SMALL_HEIGHT_BOUNDARY;
	const isSmallX = width < smallWidthBoundary;
	const isSmallY = height < smallHeightBoundary;
	const isLeft = quadrant === "left";
	const isRight = quadrant === "right";
	const isTop = quadrant === "top";
	const isBottom = quadrant === "bottom";
	const rightClass = !isSmallX && isRight;
	const leftClass = !isSmallX && isLeft;
	const topClass = !isSmallY && isTop;
	const bottomClass = !isSmallY && isBottom;
	let size = 1;
	const sizeOptions = (_overlayModel$size = overlayModel === null || overlayModel === void 0 ? void 0 : overlayModel.size) !== null && _overlayModel$size !== void 0 ? _overlayModel$size : DEFAULT_SIZE;
	if (sizeOptions.type === "percentage") size = clamp(sizeOptions.value, 0, 100) / 100;
	else {
		if (rightClass || leftClass) size = clamp(sizeOptions.value, 0, width) / width;
		if (topClass || bottomClass) size = clamp(sizeOptions.value, 0, height) / height;
	}
	return {
		isSmallX,
		isSmallY,
		isLeft,
		isRight,
		isTop,
		isBottom,
		rightClass,
		leftClass,
		topClass,
		bottomClass,
		size
	};
}
function renderInPlaceOverlay(overlay, quadrant, width, height, overlayModel) {
	const shape = computeOverlayShape(quadrant, width, height, overlayModel);
	const { rightClass, leftClass, topClass, bottomClass, size } = shape;
	const box = {
		top: "0px",
		left: "0px",
		width: "100%",
		height: "100%"
	};
	if (rightClass) {
		box.left = `${100 * (1 - size)}%`;
		box.width = `${100 * size}%`;
	} else if (leftClass) box.width = `${100 * size}%`;
	else if (topClass) box.height = `${100 * size}%`;
	else if (bottomClass) {
		box.top = `${100 * (1 - size)}%`;
		box.height = `${100 * size}%`;
	}
	if (shape.isSmallX && shape.isLeft) box.width = "4px";
	if (shape.isSmallX && shape.isRight) {
		box.left = `${width - 4}px`;
		box.width = "4px";
	}
	if (shape.isSmallY && shape.isTop) box.height = "4px";
	if (shape.isSmallY && shape.isBottom) {
		box.top = `${height - 4}px`;
		box.height = "4px";
	}
	overlay.style.top = box.top;
	overlay.style.left = box.left;
	overlay.style.width = box.width;
	overlay.style.height = box.height;
	overlay.style.visibility = "visible";
	if (!overlay.style.transform || overlay.style.transform === "") overlay.style.transform = "translate3d(0, 0, 0)";
	const isLine = shape.isSmallX && (shape.isLeft || shape.isRight) || shape.isSmallY && (shape.isTop || shape.isBottom);
	toggleClass(overlay, "dv-drop-target-small-vertical", shape.isSmallY);
	toggleClass(overlay, "dv-drop-target-small-horizontal", shape.isSmallX);
	toggleClass(overlay, "dv-drop-target-selection-line", isLine);
	toggleClass(overlay, "dv-drop-target-left", shape.isLeft);
	toggleClass(overlay, "dv-drop-target-right", shape.isRight);
	toggleClass(overlay, "dv-drop-target-top", shape.isTop);
	toggleClass(overlay, "dv-drop-target-bottom", shape.isBottom);
	toggleClass(overlay, "dv-drop-target-center", quadrant === "center");
}
function checkAnchoredBoundsChanged(overlay, bounds) {
	const topPx = `${Math.round(bounds.top)}px`;
	const leftPx = `${Math.round(bounds.left)}px`;
	const widthPx = `${Math.round(bounds.width)}px`;
	const heightPx = `${Math.round(bounds.height)}px`;
	return overlay.style.top !== topPx || overlay.style.left !== leftPx || overlay.style.width !== widthPx || overlay.style.height !== heightPx;
}
function applyAnchoredBounds(overlay, bounds) {
	overlay.style.top = `${Math.round(bounds.top)}px`;
	overlay.style.left = `${Math.round(bounds.left)}px`;
	overlay.style.width = `${Math.round(bounds.width)}px`;
	overlay.style.height = `${Math.round(bounds.height)}px`;
	overlay.style.visibility = "visible";
	if (!overlay.style.transform || overlay.style.transform === "") overlay.style.transform = "translate3d(0, 0, 0)";
}
/** `boundsChanged: false` lets callers skip redundant work on tight drag loops. */
function renderAnchoredOverlay(args) {
	const shape = computeOverlayShape(args.quadrant, args.width, args.height, args.overlayModel);
	const { rightClass, leftClass, topClass, bottomClass, size } = shape;
	const elBox = args.outlineElement.getBoundingClientRect();
	const ta = args.targetModel.getElements(void 0, args.outlineElement);
	const el = ta.root;
	const overlay = ta.overlay;
	const bigbox = el.getBoundingClientRect();
	const rootTop = elBox.top - bigbox.top;
	const rootLeft = elBox.left - bigbox.left;
	const box = {
		top: rootTop,
		left: rootLeft,
		width: args.width,
		height: args.height
	};
	if (rightClass) {
		box.left = rootLeft + args.width * (1 - size);
		box.width = args.width * size;
	} else if (leftClass) box.width = args.width * size;
	else if (topClass) box.height = args.height * size;
	else if (bottomClass) {
		box.top = rootTop + args.height * (1 - size);
		box.height = args.height * size;
	}
	if (shape.isSmallX && shape.isLeft) box.width = 4;
	if (shape.isSmallX && shape.isRight) {
		box.left = rootLeft + args.width - 4;
		box.width = 4;
	}
	if (shape.isSmallY && shape.isTop) box.height = 4;
	if (shape.isSmallY && shape.isBottom) {
		box.top = rootTop + args.height - 4;
		box.height = 4;
	}
	if (!checkAnchoredBoundsChanged(overlay, box)) return {
		boundsChanged: false,
		targetChanged: ta.changed
	};
	applyAnchoredBounds(overlay, box);
	overlay.className = `dv-drop-target-anchor${args.className ? ` ${args.className}` : ""}`;
	toggleClass(overlay, "dv-drop-target-left", shape.isLeft);
	toggleClass(overlay, "dv-drop-target-right", shape.isRight);
	toggleClass(overlay, "dv-drop-target-top", shape.isTop);
	toggleClass(overlay, "dv-drop-target-bottom", shape.isBottom);
	toggleClass(overlay, "dv-drop-target-anchor-line", shape.isSmallX && (shape.isLeft || shape.isRight) || shape.isSmallY && (shape.isTop || shape.isBottom));
	toggleClass(overlay, "dv-drop-target-center", args.quadrant === "center");
	if (ta.changed) {
		toggleClass(overlay, "dv-drop-target-anchor-container-changed", true);
		setTimeout(() => {
			toggleClass(overlay, "dv-drop-target-anchor-container-changed", false);
		}, 10);
	}
	return {
		boundsChanged: true,
		targetChanged: ta.changed
	};
}

//#endregion
//#region src/dnd/droptarget.ts
var WillShowOverlayEvent = class extends DockviewEvent {
	get nativeEvent() {
		return this.options.nativeEvent;
	}
	get position() {
		return this.options.position;
	}
	/** See {@link DroptargetEvent.edge}. */
	get edge() {
		return !!this.options.edge;
	}
	/** See {@link PositionResolverResult.edgeGroup}. A display hint; a consumer
	*  (e.g. the DnD compass) can bow out of this cell. */
	get edgeGroup() {
		return !!this.options.edgeGroup;
	}
	constructor(options) {
		super();
		this.options = options;
	}
};
function directionToPosition(direction) {
	switch (direction) {
		case "above": return "top";
		case "below": return "bottom";
		case "left": return "left";
		case "right": return "right";
		case "within": return "center";
		default: throw new Error(`invalid direction '${direction}'`);
	}
}
function positionToDirection(position) {
	switch (position) {
		case "top": return "above";
		case "bottom": return "below";
		case "left": return "left";
		case "right": return "right";
		case "center": return "within";
		default: throw new Error(`invalid position '${position}'`);
	}
}
const DEFAULT_ACTIVATION_SIZE$1 = {
	value: 20,
	type: "percentage"
};
var Droptarget = class Droptarget extends CompositeDisposable {
	get disabled() {
		return this._disabled;
	}
	set disabled(value) {
		this._disabled = value;
	}
	get state() {
		return this._state;
	}
	constructor(element, options) {
		super();
		this.element = element;
		this.options = options;
		this._edge = false;
		this._edgeGroup = false;
		this._onDrop = new Emitter();
		this.onDrop = this._onDrop.event;
		this._onWillShowOverlay = new Emitter();
		this.onWillShowOverlay = this._onWillShowOverlay.event;
		this._disabled = false;
		this._acceptedTargetZonesSet = new Set(this.options.acceptedTargetZones);
		this.dnd = new DragAndDropObserver(this.element, {
			onDragEnter: () => {
				var _this$options$getOver, _this$options;
				(_this$options$getOver = (_this$options = this.options).getOverrideTarget) === null || _this$options$getOver === void 0 || (_this$options$getOver = _this$options$getOver.call(_this$options)) === null || _this$options$getOver === void 0 || _this$options$getOver.getElements();
			},
			onDragOver: (e) => {
				var _this$options$getOver2, _this$options2, _this$options$getOver3, _this$options$getOver4, _this$options3, _e$clientX, _e$clientY;
				if (this._disabled) {
					this.clearOwnOverlay();
					return;
				}
				Droptarget.ACTUAL_TARGET = this;
				const overrideTarget = (_this$options$getOver2 = (_this$options2 = this.options).getOverrideTarget) === null || _this$options$getOver2 === void 0 ? void 0 : _this$options$getOver2.call(_this$options2);
				if (this._acceptedTargetZonesSet.size === 0) {
					this.clearOwnOverlay();
					return;
				}
				const target = (_this$options$getOver3 = (_this$options$getOver4 = (_this$options3 = this.options).getOverlayOutline) === null || _this$options$getOver4 === void 0 ? void 0 : _this$options$getOver4.call(_this$options3)) !== null && _this$options$getOver3 !== void 0 ? _this$options$getOver3 : this.element;
				const width = target.offsetWidth;
				const height = target.offsetHeight;
				if (width === 0 || height === 0) return;
				const rect = target.getBoundingClientRect();
				const x = ((_e$clientX = e.clientX) !== null && _e$clientX !== void 0 ? _e$clientX : 0) - rect.left;
				const y = ((_e$clientY = e.clientY) !== null && _e$clientY !== void 0 ? _e$clientY : 0) - rect.top;
				const resolved = this.resolvePosition(x, y, width, height, e);
				/**
				* If the event has already been used by another DropTarget instance
				* then don't show a second drop target, only one target should be
				* active at any one time. The anchored overlay belongs to whichever
				* target claimed the event, so leave it alone here.
				*/
				if (this.isAlreadyUsed(e)) {
					this.removeDropTarget();
					return;
				}
				if (resolved === null) {
					this.clearOwnOverlay();
					return;
				}
				const quadrant = resolved.position;
				if (!this.options.canDisplayOverlay(e, quadrant)) {
					this.clearOwnOverlay();
					return;
				}
				const willShowOverlayEvent = new WillShowOverlayEvent({
					nativeEvent: e,
					position: quadrant,
					edge: resolved.edge,
					edgeGroup: resolved.edgeGroup
				});
				/**
				* Provide an opportunity to prevent the overlay appearing and in turn
				* any dnd behaviours
				*/
				this._onWillShowOverlay.fire(willShowOverlayEvent);
				if (willShowOverlayEvent.defaultPrevented) {
					this.clearOwnOverlay();
					return;
				}
				this.markAsUsed(e);
				if (resolved.edge) {
					this.clearOwnOverlay();
					this._state = quadrant;
					this._edge = true;
					this._edgeGroup = resolved.edgeGroup;
					return;
				}
				this._edge = false;
				this._edgeGroup = false;
				if (overrideTarget) {} else if (!this.targetElement) {
					const els = createOverlayElements();
					this.targetElement = els.dropzone;
					this.overlayElement = els.selection;
					this._state = "center";
					target.classList.add("dv-drop-target");
					target.append(this.targetElement);
				}
				this.toggleClasses(quadrant, width, height);
				this._state = quadrant;
			},
			onDragLeave: () => {
				var _this$options$getOver5, _this$options4;
				const target = (_this$options$getOver5 = (_this$options4 = this.options).getOverrideTarget) === null || _this$options$getOver5 === void 0 ? void 0 : _this$options$getOver5.call(_this$options4);
				if (target) {
					var _target$scheduleClear;
					this._state = void 0;
					this._edge = false;
					this._edgeGroup = false;
					(_target$scheduleClear = target.scheduleClear) === null || _target$scheduleClear === void 0 || _target$scheduleClear.call(target);
					return;
				}
				this.removeDropTarget();
			},
			onDragEnd: (e) => {
				var _this$options$getOver6, _this$options5;
				const target = (_this$options$getOver6 = (_this$options5 = this.options).getOverrideTarget) === null || _this$options$getOver6 === void 0 ? void 0 : _this$options$getOver6.call(_this$options5);
				if (target && Droptarget.ACTUAL_TARGET === this) {
					if (this._state) {
						e.stopPropagation();
						this._onDrop.fire({
							position: this._state,
							nativeEvent: e,
							edge: this._edge,
							edgeGroup: this._edgeGroup
						});
					}
				}
				this.removeDropTarget();
				target === null || target === void 0 || target.clear();
			},
			onDrop: (e) => {
				var _this$options$getOver7, _this$options6;
				e.preventDefault();
				const state = this._state;
				const edge = this._edge;
				const edgeGroup = this._edgeGroup;
				this.removeDropTarget();
				(_this$options$getOver7 = (_this$options6 = this.options).getOverrideTarget) === null || _this$options$getOver7 === void 0 || (_this$options$getOver7 = _this$options$getOver7.call(_this$options6)) === null || _this$options$getOver7 === void 0 || _this$options$getOver7.clear();
				if (state) {
					e.stopPropagation();
					this._onDrop.fire({
						position: state,
						nativeEvent: e,
						edge,
						edgeGroup
					});
				}
			}
		});
		this.addDisposables(this._onDrop, this._onWillShowOverlay, this.dnd);
	}
	setTargetZones(acceptedTargetZones) {
		this._acceptedTargetZonesSet = new Set(acceptedTargetZones);
	}
	setOverlayModel(model) {
		this.options.overlayModel = model;
	}
	dispose() {
		this.removeDropTarget();
		super.dispose();
	}
	/**
	* Add a property to the event object for other potential listeners to check
	*/
	markAsUsed(event) {
		event[Droptarget.USED_EVENT_ID] = true;
	}
	/**
	* Check is the event has already been used by another instance of DropTarget
	*/
	isAlreadyUsed(event) {
		const value = event[Droptarget.USED_EVENT_ID];
		return typeof value === "boolean" && value;
	}
	toggleClasses(quadrant, width, height) {
		var _this$options$getOver8, _this$options7;
		const target = (_this$options$getOver8 = (_this$options7 = this.options).getOverrideTarget) === null || _this$options$getOver8 === void 0 ? void 0 : _this$options$getOver8.call(_this$options7);
		if (target) {
			var _this$options$getOver9, _this$options$getOver10, _this$options8;
			renderAnchoredOverlay({
				outlineElement: (_this$options$getOver9 = (_this$options$getOver10 = (_this$options8 = this.options).getOverlayOutline) === null || _this$options$getOver10 === void 0 ? void 0 : _this$options$getOver10.call(_this$options8)) !== null && _this$options$getOver9 !== void 0 ? _this$options$getOver9 : this.element,
				targetModel: target,
				quadrant,
				width,
				height,
				overlayModel: this.options.overlayModel,
				className: this.options.className
			});
			return;
		}
		if (!this.overlayElement) return;
		renderInPlaceOverlay(this.overlayElement, quadrant, width, height, this.options.overlayModel);
	}
	/**
	* Resolve the drop {@link Position} for a pointer location: defer to an
	* injected {@link PositionResolver} when present, otherwise the built-in
	* cursor-quadrant logic (unchanged).
	*/
	resolvePosition(x, y, width, height, event) {
		var _this$options$getPosi, _this$options9;
		const resolver = (_this$options$getPosi = (_this$options9 = this.options).getPositionResolver) === null || _this$options$getPosi === void 0 ? void 0 : _this$options$getPosi.call(_this$options9);
		if (resolver) {
			const result = resolver.resolve({
				x,
				y,
				width,
				height,
				zones: this._acceptedTargetZonesSet,
				event
			});
			return result ? {
				position: result.position,
				edge: !!result.edge,
				edgeGroup: !!result.edgeGroup
			} : null;
		}
		const position = this.calculateQuadrant(this._acceptedTargetZonesSet, x, y, width, height);
		return position ? {
			position,
			edge: false,
			edgeGroup: false
		} : null;
	}
	calculateQuadrant(overlayType, x, y, width, height) {
		var _this$options$overlay, _this$options$overlay2;
		const activationSizeOptions = (_this$options$overlay = (_this$options$overlay2 = this.options.overlayModel) === null || _this$options$overlay2 === void 0 ? void 0 : _this$options$overlay2.activationSize) !== null && _this$options$overlay !== void 0 ? _this$options$overlay : DEFAULT_ACTIVATION_SIZE$1;
		if (activationSizeOptions.type === "percentage") return calculateQuadrantAsPercentage(overlayType, x, y, width, height, activationSizeOptions.value);
		return calculateQuadrantAsPixels(overlayType, x, y, width, height, activationSizeOptions.value);
	}
	/**
	* Tear down whatever this target is showing, on any frame it resolves to no
	* overlay. Two things make this more than `removeDropTarget`:
	*
	* - With `dndOverlayMounting: 'absolute'` the overlay lives in an anchor
	*   container shared by every drop target in the component, and
	*   `removeDropTarget` only owns the in-place dropzone — so the container
	*   needs clearing explicitly or the last frame's highlight lingers.
	* - It must only clear the container when this target actually put
	*   something there. The root edge target sits over every group and
	*   declines `center` on each frame in the middle of the layout purely so
	*   the event falls through; clearing from there would destroy and rebuild
	*   the group's overlay every frame, killing its move transition.
	*
	* Resetting `_state` unconditionally is the other half: a target that
	* resolves to nothing must not stay latched, or a later drop commits a
	* position the cursor left long ago.
	*/
	clearOwnOverlay() {
		const owned = this._state !== void 0;
		this.removeDropTarget();
		if (owned) {
			var _this$options$getOver11, _this$options10;
			(_this$options$getOver11 = (_this$options10 = this.options).getOverrideTarget) === null || _this$options$getOver11 === void 0 || (_this$options$getOver11 = _this$options$getOver11.call(_this$options10)) === null || _this$options$getOver11 === void 0 || _this$options$getOver11.clear();
		}
	}
	removeDropTarget() {
		this._state = void 0;
		this._edge = false;
		this._edgeGroup = false;
		if (this.targetElement) {
			var _this$targetElement$p;
			(_this$targetElement$p = this.targetElement.parentElement) === null || _this$targetElement$p === void 0 || _this$targetElement$p.classList.remove("dv-drop-target");
			this.targetElement.remove();
			this.targetElement = void 0;
			this.overlayElement = void 0;
		}
	}
	/**
	* Render the drop overlay at `position` without a live drag, so keyboard
	* docking shows the exact same preview as a mouse drag. Mirrors the
	* `onDragOver` render path (in-place or anchored). Pair with `clearOverlay`.
	*/
	showOverlay(position) {
		var _this$options$getOver12, _this$options11, _this$options$getOver13, _this$options$getOver14, _this$options12;
		const overrideTarget = (_this$options$getOver12 = (_this$options11 = this.options).getOverrideTarget) === null || _this$options$getOver12 === void 0 ? void 0 : _this$options$getOver12.call(_this$options11);
		const target = (_this$options$getOver13 = (_this$options$getOver14 = (_this$options12 = this.options).getOverlayOutline) === null || _this$options$getOver14 === void 0 ? void 0 : _this$options$getOver14.call(_this$options12)) !== null && _this$options$getOver13 !== void 0 ? _this$options$getOver13 : this.element;
		const width = target.offsetWidth;
		const height = target.offsetHeight;
		if (!overrideTarget && !this.targetElement) {
			const els = createOverlayElements();
			this.targetElement = els.dropzone;
			this.overlayElement = els.selection;
			target.classList.add("dv-drop-target");
			target.append(this.targetElement);
		}
		this.toggleClasses(position, width, height);
		this._state = position;
	}
	/** Clear an overlay shown via {@link showOverlay} (in-place or anchored). */
	clearOverlay() {
		var _this$options$getOver15, _this$options13;
		this.removeDropTarget();
		(_this$options$getOver15 = (_this$options13 = this.options).getOverrideTarget) === null || _this$options$getOver15 === void 0 || (_this$options$getOver15 = _this$options$getOver15.call(_this$options13)) === null || _this$options$getOver15 === void 0 || _this$options$getOver15.clear();
		this._state = void 0;
	}
};
Droptarget.USED_EVENT_ID = "__dockview_droptarget_event_is_used__";
function calculateQuadrantAsPercentage(overlayType, x, y, width, height, threshold) {
	const xp = 100 * x / width;
	const yp = 100 * y / height;
	if (overlayType.has("left") && xp < threshold) return "left";
	if (overlayType.has("right") && xp > 100 - threshold) return "right";
	if (overlayType.has("top") && yp < threshold) return "top";
	if (overlayType.has("bottom") && yp > 100 - threshold) return "bottom";
	if (!overlayType.has("center")) return null;
	return "center";
}
function calculateQuadrantAsPixels(overlayType, x, y, width, height, threshold) {
	const band = (edge) => typeof threshold === "number" ? threshold : threshold[edge];
	if (overlayType.has("left") && x < band("left")) return "left";
	if (overlayType.has("right") && x > width - band("right")) return "right";
	if (overlayType.has("top") && y < band("top")) return "top";
	if (overlayType.has("bottom") && y > height - band("bottom")) return "bottom";
	if (!overlayType.has("center")) return null;
	return "center";
}

//#endregion
//#region src/dnd/ghost.ts
function addGhostImage(dataTransfer, ghostElement, options) {
	var _options$ownerDocumen, _options$x, _options$y;
	addClasses(ghostElement, "dv-dragged");
	ghostElement.style.top = "-9999px";
	ghostElement.style.position = "absolute";
	((options === null || options === void 0 ? void 0 : options.owner) ? getOverlayParent(options.owner) : ((_options$ownerDocumen = options === null || options === void 0 ? void 0 : options.ownerDocument) !== null && _options$ownerDocumen !== void 0 ? _options$ownerDocumen : document).body).appendChild(ghostElement);
	dataTransfer.setDragImage(ghostElement, (_options$x = options === null || options === void 0 ? void 0 : options.x) !== null && _options$x !== void 0 ? _options$x : 0, (_options$y = options === null || options === void 0 ? void 0 : options.y) !== null && _options$y !== void 0 ? _options$y : 0);
	setTimeout(() => {
		removeClasses(ghostElement, "dv-dragged");
		ghostElement.remove();
	}, 0);
}

//#endregion
//#region src/dnd/pointer/pointerDragController.ts
/**
* Only one pointer-driven drag can be active at a time.
*
* State is shared across every Dockview instance on the page. Targets
* from instance B receive hit-tests from drags originating in instance A;
* that's intentional for cross-instance drops since `LocalSelectionTransfer`
* is also process-wide. The corollary is that every Tabs subscriber to
* `onDragMove` fires for every pointer drag globally; each subscriber
* hit-tests against its own DOM, so this is O(N) per pointermove where N
* is the number of registered listeners across all instances.
*/
var PointerDragController = class PointerDragController extends CompositeDisposable {
	static getInstance() {
		var _PointerDragControlle;
		(_PointerDragControlle = PointerDragController._instance) !== null && _PointerDragControlle !== void 0 || (PointerDragController._instance = new PointerDragController());
		return PointerDragController._instance;
	}
	constructor() {
		super();
		this._targets = /* @__PURE__ */ new Set();
		this._targetByElement = /* @__PURE__ */ new Map();
		this._onDragStart = new Emitter();
		this.onDragStart = this._onDragStart.event;
		this._onDragMove = new Emitter();
		this.onDragMove = this._onDragMove.event;
		this._onDragEnd = new Emitter();
		this.onDragEnd = this._onDragEnd.event;
		this.addDisposables(this._onDragStart, this._onDragMove, this._onDragEnd);
	}
	get active() {
		return this._active;
	}
	registerTarget(target) {
		this._targets.add(target);
		this._targetByElement.set(target.element, target);
		return { dispose: () => {
			this._targets.delete(target);
			if (this._targetByElement.get(target.element) === target) this._targetByElement.delete(target.element);
			if (this._currentTarget === target) this._currentTarget = void 0;
		} };
	}
	beginDrag(args) {
		var _source$ownerDocument, _source$ownerDocument2, _source$ownerDocument3, _source$ownerDocument4;
		if (this._active) this.cancel();
		const { pointerEvent, source } = args;
		const dataDisposable = args.getData();
		this._active = {
			pointerId: pointerEvent.pointerId,
			startX: pointerEvent.clientX,
			startY: pointerEvent.clientY,
			source
		};
		this._lastPointerEvent = pointerEvent;
		this._onDragMoveCallback = args.onDragMove;
		this._onDragEndCallback = args.onDragEnd;
		this._dataDisposable = dataDisposable;
		this._ghost = args.ghost;
		this._iframeShield = disableIframePointEvents((_source$ownerDocument = source.ownerDocument) !== null && _source$ownerDocument !== void 0 ? _source$ownerDocument : document);
		this._selectionShield = disableTextSelection((_source$ownerDocument2 = source.ownerDocument) !== null && _source$ownerDocument2 !== void 0 ? _source$ownerDocument2 : document);
		const startEvent = {
			clientX: pointerEvent.clientX,
			clientY: pointerEvent.clientY,
			pointerEvent
		};
		this._onDragStart.fire(startEvent);
		const targetWindow = (_source$ownerDocument3 = (_source$ownerDocument4 = source.ownerDocument) === null || _source$ownerDocument4 === void 0 ? void 0 : _source$ownerDocument4.defaultView) !== null && _source$ownerDocument3 !== void 0 ? _source$ownerDocument3 : globalThis.window;
		this._moveListener = addDisposableListener(targetWindow, "pointermove", (e) => {
			var _this$_active;
			if (e.pointerId !== ((_this$_active = this._active) === null || _this$_active === void 0 ? void 0 : _this$_active.pointerId)) return;
			this._handleMove(e);
		});
		this._upListener = addDisposableListener(targetWindow, "pointerup", (e) => {
			var _this$_active2;
			if (e.pointerId !== ((_this$_active2 = this._active) === null || _this$_active2 === void 0 ? void 0 : _this$_active2.pointerId)) return;
			this._handleEnd(e, true);
		});
		this._cancelListener = addDisposableListener(targetWindow, "pointercancel", (e) => {
			var _this$_active3;
			if (e.pointerId !== ((_this$_active3 = this._active) === null || _this$_active3 === void 0 ? void 0 : _this$_active3.pointerId)) return;
			this._handleEnd(e, false);
		});
	}
	cancel() {
		var _this$_currentTarget, _this$_dataDisposable;
		if (!this._active) return;
		const onEnd = this._onDragEndCallback;
		const lastEvent = this._lastPointerEvent;
		(_this$_currentTarget = this._currentTarget) === null || _this$_currentTarget === void 0 || _this$_currentTarget.handleDragLeave();
		this._teardown();
		(_this$_dataDisposable = this._dataDisposable) === null || _this$_dataDisposable === void 0 || _this$_dataDisposable.dispose();
		this._dataDisposable = void 0;
		if (lastEvent) {
			const dragEvent = {
				clientX: lastEvent.clientX,
				clientY: lastEvent.clientY,
				pointerEvent: lastEvent
			};
			onEnd === null || onEnd === void 0 || onEnd(dragEvent, false);
			this._onDragEnd.fire(dragEvent);
		}
	}
	_findTargetUnder(x, y) {
		const elements = (this._active ? getHitTestRoot(this._active.source) : document).elementsFromPoint(x, y);
		for (const el of elements) {
			let current = el;
			while (current) {
				var _target$isHitTestTran;
				const target = this._targetByElement.get(current);
				if (target && !((_target$isHitTestTran = target.isHitTestTransparent) === null || _target$isHitTestTran === void 0 ? void 0 : _target$isHitTestTran.call(target))) return target;
				current = current.parentElement;
			}
		}
	}
	_handleMove(e) {
		var _this$_ghost, _this$_onDragMoveCall;
		this._lastPointerEvent = e;
		(_this$_ghost = this._ghost) === null || _this$_ghost === void 0 || _this$_ghost.update(e.clientX, e.clientY);
		const dragEvent = {
			clientX: e.clientX,
			clientY: e.clientY,
			pointerEvent: e
		};
		const newTarget = this._findTargetUnder(e.clientX, e.clientY);
		if (newTarget !== this._currentTarget) {
			var _this$_currentTarget2;
			(_this$_currentTarget2 = this._currentTarget) === null || _this$_currentTarget2 === void 0 || _this$_currentTarget2.handleDragLeave();
			this._currentTarget = newTarget;
		}
		if (newTarget) newTarget.handleDragOver(dragEvent);
		(_this$_onDragMoveCall = this._onDragMoveCallback) === null || _this$_onDragMoveCall === void 0 || _this$_onDragMoveCall.call(this, dragEvent);
		this._onDragMove.fire(dragEvent);
	}
	_handleEnd(e, dropped) {
		const dragEvent = {
			clientX: e.clientX,
			clientY: e.clientY,
			pointerEvent: e
		};
		try {
			if (dropped && this._currentTarget) this._currentTarget.handleDrop(dragEvent);
			else {
				var _this$_currentTarget3;
				(_this$_currentTarget3 = this._currentTarget) === null || _this$_currentTarget3 === void 0 || _this$_currentTarget3.handleDragLeave();
			}
		} finally {
			const onEnd = this._onDragEndCallback;
			const dataDisposable = this._dataDisposable;
			this._teardown();
			this._dataDisposable = void 0;
			setTimeout(() => dataDisposable === null || dataDisposable === void 0 ? void 0 : dataDisposable.dispose(), 0);
			onEnd === null || onEnd === void 0 || onEnd(dragEvent, dropped);
			this._onDragEnd.fire(dragEvent);
		}
	}
	_teardown() {
		var _this$_ghost2, _this$_iframeShield, _this$_selectionShiel, _this$_moveListener, _this$_upListener, _this$_cancelListener;
		this._currentTarget = void 0;
		this._active = void 0;
		this._lastPointerEvent = void 0;
		this._onDragMoveCallback = void 0;
		this._onDragEndCallback = void 0;
		(_this$_ghost2 = this._ghost) === null || _this$_ghost2 === void 0 || _this$_ghost2.dispose();
		this._ghost = void 0;
		(_this$_iframeShield = this._iframeShield) === null || _this$_iframeShield === void 0 || _this$_iframeShield.release();
		this._iframeShield = void 0;
		(_this$_selectionShiel = this._selectionShield) === null || _this$_selectionShiel === void 0 || _this$_selectionShiel.release();
		this._selectionShield = void 0;
		(_this$_moveListener = this._moveListener) === null || _this$_moveListener === void 0 || _this$_moveListener.dispose();
		(_this$_upListener = this._upListener) === null || _this$_upListener === void 0 || _this$_upListener.dispose();
		(_this$_cancelListener = this._cancelListener) === null || _this$_cancelListener === void 0 || _this$_cancelListener.dispose();
		this._moveListener = void 0;
		this._upListener = void 0;
		this._cancelListener = void 0;
	}
};

//#endregion
//#region src/dnd/pointer/pointerDropTarget.ts
const DEFAULT_ACTIVATION_SIZE = {
	value: 20,
	type: "percentage"
};
/** Pointer-driven counterpart to `Droptarget` with identical visual output. */
var PointerDropTarget = class extends CompositeDisposable {
	get disabled() {
		return this._disabled;
	}
	set disabled(value) {
		this._disabled = value;
		if (value) this._removeOverlay();
	}
	get state() {
		return this._state;
	}
	constructor(element, options) {
		super();
		this.element = element;
		this.options = options;
		this._edge = false;
		this._edgeGroup = false;
		this._onDrop = new Emitter();
		this.onDrop = this._onDrop.event;
		this._onWillShowOverlay = new Emitter();
		this.onWillShowOverlay = this._onWillShowOverlay.event;
		this._disabled = false;
		this._acceptedTargetZonesSet = new Set(options.acceptedTargetZones);
		const handle = {
			element: this.element,
			handleDragOver: (e) => this._onDragOver(e),
			handleDragLeave: () => this._onDragLeave(),
			handleDrop: (e) => this._onDropEvent(e),
			isHitTestTransparent: options.isHitTestTransparent
		};
		this.addDisposables(this._onDrop, this._onWillShowOverlay, PointerDragController.getInstance().registerTarget(handle));
	}
	clearOverlay() {
		this._clearOwnOverlay();
	}
	setTargetZones(zones) {
		this._acceptedTargetZonesSet = new Set(zones);
	}
	setOverlayModel(model) {
		this.options.overlayModel = model;
	}
	dispose() {
		this._removeOverlay();
		super.dispose();
	}
	_onDragOver(event) {
		var _this$options$getOver, _this$options, _this$options$getOver2, _this$options$getOver3, _this$options2;
		if (this._disabled) {
			this._clearOwnOverlay();
			return;
		}
		const overrideTarget = (_this$options$getOver = (_this$options = this.options).getOverrideTarget) === null || _this$options$getOver === void 0 ? void 0 : _this$options$getOver.call(_this$options);
		if (this._acceptedTargetZonesSet.size === 0) {
			this._clearOwnOverlay();
			return;
		}
		const outlineEl = (_this$options$getOver2 = (_this$options$getOver3 = (_this$options2 = this.options).getOverlayOutline) === null || _this$options$getOver3 === void 0 ? void 0 : _this$options$getOver3.call(_this$options2)) !== null && _this$options$getOver2 !== void 0 ? _this$options$getOver2 : this.element;
		const width = outlineEl.offsetWidth;
		const height = outlineEl.offsetHeight;
		if (width === 0 || height === 0) return;
		const rect = outlineEl.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const resolved = this._resolvePosition(x, y, width, height, event.pointerEvent);
		if (resolved === null) {
			this._clearOwnOverlay();
			return;
		}
		const quadrant = resolved.position;
		if (!this.options.canDisplayOverlay(event.pointerEvent, quadrant)) {
			this._clearOwnOverlay();
			return;
		}
		const willShow = new WillShowOverlayEvent({
			nativeEvent: event.pointerEvent,
			position: quadrant,
			edge: resolved.edge,
			edgeGroup: resolved.edgeGroup
		});
		this._onWillShowOverlay.fire(willShow);
		if (willShow.defaultPrevented) {
			this._clearOwnOverlay();
			return;
		}
		if (resolved.edge) {
			this._clearOwnOverlay();
			this._state = quadrant;
			this._edge = true;
			this._edgeGroup = resolved.edgeGroup;
			return;
		}
		this._edge = false;
		this._edgeGroup = false;
		if (overrideTarget) {
			renderAnchoredOverlay({
				outlineElement: outlineEl,
				targetModel: overrideTarget,
				quadrant,
				width,
				height,
				overlayModel: this.options.overlayModel,
				className: this.options.className
			});
			this._state = quadrant;
			return;
		}
		if (!this._targetElement) {
			const els = createOverlayElements();
			this._targetElement = els.dropzone;
			this._overlayElement = els.selection;
			this._state = "center";
			this.element.classList.add("dv-drop-target");
			this.element.append(this._targetElement);
		}
		if (this._overlayElement) renderInPlaceOverlay(this._overlayElement, quadrant, width, height, this.options.overlayModel);
		this._state = quadrant;
	}
	_onDragLeave() {
		var _this$options$getOver4, _this$options3;
		const overrideTarget = (_this$options$getOver4 = (_this$options3 = this.options).getOverrideTarget) === null || _this$options$getOver4 === void 0 ? void 0 : _this$options$getOver4.call(_this$options3);
		if (overrideTarget) {
			this._state = void 0;
			overrideTarget.clear();
			return;
		}
		this._removeOverlay();
	}
	_onDropEvent(event) {
		var _this$options$getOver5, _this$options4;
		const state = this._state;
		const edge = this._edge;
		const edgeGroup = this._edgeGroup;
		const overrideTarget = (_this$options$getOver5 = (_this$options4 = this.options).getOverrideTarget) === null || _this$options$getOver5 === void 0 ? void 0 : _this$options$getOver5.call(_this$options4);
		this._removeOverlay();
		overrideTarget === null || overrideTarget === void 0 || overrideTarget.clear();
		if (state) this._onDrop.fire({
			position: state,
			nativeEvent: event.pointerEvent,
			edge,
			edgeGroup
		});
	}
	/**
	* Resolve the drop {@link Position}: defer to an injected
	* {@link PositionResolver} when present, otherwise the built-in
	* cursor-quadrant logic (unchanged). Shares the resolver with the HTML5
	* backend.
	*/
	_resolvePosition(x, y, width, height, event) {
		var _this$options$getPosi, _this$options5;
		const resolver = (_this$options$getPosi = (_this$options5 = this.options).getPositionResolver) === null || _this$options$getPosi === void 0 ? void 0 : _this$options$getPosi.call(_this$options5);
		if (resolver) {
			const result = resolver.resolve({
				x,
				y,
				width,
				height,
				zones: this._acceptedTargetZonesSet,
				event
			});
			return result ? {
				position: result.position,
				edge: !!result.edge,
				edgeGroup: !!result.edgeGroup
			} : null;
		}
		const position = this._calculateQuadrant(x, y, width, height);
		return position ? {
			position,
			edge: false,
			edgeGroup: false
		} : null;
	}
	_calculateQuadrant(x, y, width, height) {
		var _this$options$overlay, _this$options$overlay2;
		const activation = (_this$options$overlay = (_this$options$overlay2 = this.options.overlayModel) === null || _this$options$overlay2 === void 0 ? void 0 : _this$options$overlay2.activationSize) !== null && _this$options$overlay !== void 0 ? _this$options$overlay : DEFAULT_ACTIVATION_SIZE;
		if (activation.type === "percentage") return calculateQuadrantAsPercentage(this._acceptedTargetZonesSet, x, y, width, height, activation.value);
		return calculateQuadrantAsPixels(this._acceptedTargetZonesSet, x, y, width, height, activation.value);
	}
	/**
	* Tear down whatever this target is showing, on any frame it resolves to no
	* overlay. Two things make this more than `_removeOverlay`:
	*
	* - With `dndOverlayMounting: 'absolute'` the overlay lives in an anchor
	*   container shared by every drop target in the component, and
	*   `_removeOverlay` only owns the in-place dropzone — so the container
	*   needs clearing explicitly or the last frame's highlight lingers.
	* - It must only clear the container when this target actually put
	*   something there. The root edge target sits over every group and
	*   declines `center` on each frame in the middle of the layout purely so
	*   the event falls through; clearing from there would destroy and rebuild
	*   the group's overlay every frame, killing its move transition.
	*/
	_clearOwnOverlay() {
		const owned = this._state !== void 0;
		this._removeOverlay();
		if (owned) {
			var _this$options$getOver6, _this$options6;
			(_this$options$getOver6 = (_this$options6 = this.options).getOverrideTarget) === null || _this$options$getOver6 === void 0 || (_this$options$getOver6 = _this$options$getOver6.call(_this$options6)) === null || _this$options$getOver6 === void 0 || _this$options$getOver6.clear();
		}
	}
	_removeOverlay() {
		this._edge = false;
		this._edgeGroup = false;
		if (this._targetElement) {
			var _this$_targetElement$;
			this._state = void 0;
			(_this$_targetElement$ = this._targetElement.parentElement) === null || _this$_targetElement$ === void 0 || _this$_targetElement$.classList.remove("dv-drop-target");
			this._targetElement.remove();
			this._targetElement = void 0;
			this._overlayElement = void 0;
		} else this._state = void 0;
	}
};

//#endregion
//#region src/dnd/pointer/pointerDragSource.ts
const DEFAULT_THRESHOLD = 5;
const DEFAULT_TOUCH_INITIATION_DELAY = 250;
const DEFAULT_PRESS_TOLERANCE = 8;
/**
* Pointer-event drag source. Waits for movement past `threshold` (and
* touch-only `touchInitiationDelay`) before promoting to a drag so taps
* pass through unaffected.
*/
var PointerDragSource = class extends CompositeDisposable {
	constructor(element, options) {
		var _options$touchOnly;
		super();
		this.element = element;
		this.options = options;
		this._disabled = false;
		this._armed = false;
		this._startX = 0;
		this._startY = 0;
		this._touchOnly = (_options$touchOnly = options.touchOnly) !== null && _options$touchOnly !== void 0 ? _options$touchOnly : true;
		this.addDisposables(addDisposableListener(this.element, "pointerdown", (e) => {
			this._onPointerDown(e);
		}));
	}
	setDisabled(value) {
		this._disabled = value;
		if (value) this._cancelPending();
	}
	/**
	* `false` lets the pointer source also handle mouse pointers; used when
	* `dndStrategy: 'pointer'` to drive every input type through this path.
	*/
	setTouchOnly(value) {
		if (this._touchOnly === value) return;
		this._touchOnly = value;
		if (value) this._cancelPending();
	}
	_shouldHandle(event) {
		var _this$options$isCance, _this$options;
		if (this._disabled) return false;
		if (this._touchOnly && event.pointerType !== "touch" && event.pointerType !== "pen") return false;
		if (event.pointerType === "mouse" && event.button !== 0) return false;
		if ((_this$options$isCance = (_this$options = this.options).isCancelled) === null || _this$options$isCance === void 0 ? void 0 : _this$options$isCance.call(_this$options, event)) return false;
		return true;
	}
	_onPointerDown(event) {
		var _this$element$ownerDo, _ref, _this$options$thresho, _ref2, _this$element$ownerDo2, _this$element$ownerDo3;
		if (!this._shouldHandle(event)) return;
		this._cancelPending();
		this._selectionShield = disableTextSelection((_this$element$ownerDo = this.element.ownerDocument) !== null && _this$element$ownerDo !== void 0 ? _this$element$ownerDo : document);
		this._pendingPointerId = event.pointerId;
		this._startX = event.clientX;
		this._startY = event.clientY;
		this._startEvent = event;
		const isTouch = event.pointerType === "touch" || event.pointerType === "pen";
		const initiationDelayOpt = this.options.touchInitiationDelay;
		const initiationDelay = (_ref = typeof initiationDelayOpt === "function" ? initiationDelayOpt() : initiationDelayOpt) !== null && _ref !== void 0 ? _ref : DEFAULT_TOUCH_INITIATION_DELAY;
		this._armed = !isTouch || initiationDelay <= 0;
		if (isTouch && initiationDelay > 0 && Number.isFinite(initiationDelay)) this._armTimer = setTimeout(() => {
			this._armTimer = void 0;
			this._armed = true;
		}, initiationDelay);
		const threshold = (_this$options$thresho = this.options.threshold) !== null && _this$options$thresho !== void 0 ? _this$options$thresho : DEFAULT_THRESHOLD;
		const pressToleranceOpt = this.options.pressTolerance;
		const pressTolerance = (_ref2 = typeof pressToleranceOpt === "function" ? pressToleranceOpt() : pressToleranceOpt) !== null && _ref2 !== void 0 ? _ref2 : DEFAULT_PRESS_TOLERANCE;
		const targetWindow = (_this$element$ownerDo2 = (_this$element$ownerDo3 = this.element.ownerDocument) === null || _this$element$ownerDo3 === void 0 ? void 0 : _this$element$ownerDo3.defaultView) !== null && _this$element$ownerDo2 !== void 0 ? _this$element$ownerDo2 : globalThis.window;
		this._pendingMoveListener = addDisposableListener(targetWindow, "pointermove", (moveEvent) => {
			if (moveEvent.pointerId !== this._pendingPointerId) return;
			const dx = moveEvent.clientX - this._startX;
			const dy = moveEvent.clientY - this._startY;
			const distance = Math.hypot(dx, dy);
			if (this._armed) {
				if (distance >= threshold) this._beginDrag(moveEvent);
				return;
			}
			if (distance > pressTolerance) this._beginDrag(moveEvent);
		});
		this._pendingUpListener = addDisposableListener(targetWindow, "pointerup", (upEvent) => {
			if (upEvent.pointerId !== this._pendingPointerId) return;
			this._cancelPending();
		});
		this._pendingCancelListener = addDisposableListener(targetWindow, "pointercancel", (cancelEvent) => {
			if (cancelEvent.pointerId !== this._pendingPointerId) return;
			this._cancelPending();
		});
	}
	/** For sibling gesture detectors (e.g. LongPressDetector) to dismiss a pending drag. */
	cancelPending() {
		this._cancelPending();
	}
	_cancelPending() {
		var _this$_selectionShiel, _this$_pendingMoveLis, _this$_pendingUpListe, _this$_pendingCancelL;
		(_this$_selectionShiel = this._selectionShield) === null || _this$_selectionShiel === void 0 || _this$_selectionShiel.release();
		this._selectionShield = void 0;
		this._pendingPointerId = void 0;
		if (this._armTimer !== void 0) {
			clearTimeout(this._armTimer);
			this._armTimer = void 0;
		}
		this._armed = false;
		(_this$_pendingMoveLis = this._pendingMoveListener) === null || _this$_pendingMoveLis === void 0 || _this$_pendingMoveLis.dispose();
		(_this$_pendingUpListe = this._pendingUpListener) === null || _this$_pendingUpListe === void 0 || _this$_pendingUpListe.dispose();
		(_this$_pendingCancelL = this._pendingCancelListener) === null || _this$_pendingCancelL === void 0 || _this$_pendingCancelL.dispose();
		this._pendingMoveListener = void 0;
		this._pendingUpListener = void 0;
		this._pendingCancelListener = void 0;
		this._startEvent = void 0;
	}
	_beginDrag(triggerEvent) {
		var _this$_startEvent, _this$options$onDragS, _this$options2, _this$options$createG, _this$options3;
		const startEvent = (_this$_startEvent = this._startEvent) !== null && _this$_startEvent !== void 0 ? _this$_startEvent : triggerEvent;
		this._cancelPending();
		const wasPrevented = startEvent.defaultPrevented;
		(_this$options$onDragS = (_this$options2 = this.options).onDragStart) === null || _this$options$onDragS === void 0 || _this$options$onDragS.call(_this$options2, startEvent);
		if (startEvent.defaultPrevented && !wasPrevented) return;
		const ghost = (_this$options$createG = (_this$options3 = this.options).createGhost) === null || _this$options$createG === void 0 ? void 0 : _this$options$createG.call(_this$options3, startEvent);
		PointerDragController.getInstance().beginDrag({
			pointerEvent: triggerEvent,
			source: this.element,
			getData: () => this.options.getData(startEvent),
			ghost,
			onDragMove: this.options.onDragMove,
			onDragEnd: this.options.onDragEnd
		});
	}
	dispose() {
		this._cancelPending();
		super.dispose();
	}
};

//#endregion
//#region src/dnd/pointer/pointerGhost.ts
/**
* Floating clone that follows the pointer; appended to the owning
* document's body with `pointer-events: none` so it doesn't intercept
* hit-testing.
*/
var PointerGhost = class {
	constructor(opts) {
		var _opts$offsetX, _opts$offsetY, _popover, _opts$opacity;
		this._disposed = false;
		this.element = opts.element;
		this.offsetX = (_opts$offsetX = opts.offsetX) !== null && _opts$offsetX !== void 0 ? _opts$offsetX : 0;
		this.offsetY = (_opts$offsetY = opts.offsetY) !== null && _opts$offsetY !== void 0 ? _opts$offsetY : 0;
		const parent = opts.owner ? getOverlayParent(opts.owner) : document.body;
		let popover;
		if (isShadowRoot(parent) && typeof this.element.showPopover === "function") {
			popover = this.element.ownerDocument.createElement("div");
			popover.popover = "manual";
			Object.assign(popover.style, {
				inset: "auto",
				margin: "0",
				padding: "0",
				border: "0",
				background: "transparent",
				color: "inherit",
				overflow: "visible"
			});
			popover.appendChild(this.element);
			this.element.style.pointerEvents = "none";
			this.element.style.transform = "none";
		}
		this.container = (_popover = popover) !== null && _popover !== void 0 ? _popover : this.element;
		const style = this.container.style;
		style.position = "fixed";
		style.left = "0px";
		style.top = "0px";
		style.pointerEvents = "none";
		style.zIndex = "99999";
		style.opacity = String((_opts$opacity = opts.opacity) !== null && _opts$opacity !== void 0 ? _opts$opacity : .8);
		style.willChange = "transform";
		style.transform = `translate3d(${opts.initialX - this.offsetX}px, ${opts.initialY - this.offsetY}px, 0)`;
		parent.appendChild(this.container);
		popover === null || popover === void 0 || popover.showPopover();
	}
	update(clientX, clientY) {
		if (this._disposed) return;
		this.container.style.transform = `translate3d(${clientX - this.offsetX}px, ${clientY - this.offsetY}px, 0)`;
	}
	dispose() {
		if (this._disposed) return;
		this._disposed = true;
		this.element.remove();
		if (this.container !== this.element) this.container.remove();
	}
};

//#endregion
//#region src/dnd/backend.ts
/**
* HTML5 drag source. Listens for the native `dragstart` event, fires
* `onDragStart` (the consumer's chance to veto via `preventDefault()`), then
* calls `getData` to populate transfer, optionally renders the ghost via
* `setDragImage`, and tears down the transfer disposer after `dragend`.
*/
var Html5DragSource = class extends CompositeDisposable {
	constructor(el, opts) {
		super();
		this.el = el;
		this.opts = opts;
		this._dataDisposable = new MutableDisposable();
		this._pointerEventsDisposable = new MutableDisposable();
		this._disabled = !!opts.disabled;
		this.addDisposables(this._dataDisposable, this._pointerEventsDisposable, addDisposableListener(this.el, "dragstart", (event) => {
			var _this$opts$isCancelle, _this$opts, _this$opts$onDragStar, _this$opts2, _this$el$ownerDocumen, _this$opts$createGhos, _this$opts3;
			if (event.defaultPrevented || this._disabled || ((_this$opts$isCancelle = (_this$opts = this.opts).isCancelled) === null || _this$opts$isCancelle === void 0 ? void 0 : _this$opts$isCancelle.call(_this$opts, event))) {
				event.preventDefault();
				return;
			}
			(_this$opts$onDragStar = (_this$opts2 = this.opts).onDragStart) === null || _this$opts$onDragStar === void 0 || _this$opts$onDragStar.call(_this$opts2, event);
			if (event.defaultPrevented) return;
			const iframes = disableIframePointEvents((_this$el$ownerDocumen = this.el.ownerDocument) !== null && _this$el$ownerDocumen !== void 0 ? _this$el$ownerDocumen : document);
			this._pointerEventsDisposable.value = { dispose: () => iframes.release() };
			this.el.classList.add("dv-dragged");
			setTimeout(() => this.el.classList.remove("dv-dragged"), 0);
			this._dataDisposable.value = this.opts.getData(event);
			const ghost = (_this$opts$createGhos = (_this$opts3 = this.opts).createGhost) === null || _this$opts$createGhos === void 0 ? void 0 : _this$opts$createGhos.call(_this$opts3, event);
			if (ghost && event.dataTransfer) {
				var _ghost$offsetX, _ghost$offsetY, _this$el$ownerDocumen2;
				addGhostImage(event.dataTransfer, ghost.element, {
					x: (_ghost$offsetX = ghost.offsetX) !== null && _ghost$offsetX !== void 0 ? _ghost$offsetX : 0,
					y: (_ghost$offsetY = ghost.offsetY) !== null && _ghost$offsetY !== void 0 ? _ghost$offsetY : 0,
					ownerDocument: (_this$el$ownerDocumen2 = this.el.ownerDocument) !== null && _this$el$ownerDocumen2 !== void 0 ? _this$el$ownerDocumen2 : void 0,
					owner: this.el
				});
				if (ghost.dispose) {
					const disposeGhost = ghost.dispose;
					setTimeout(() => disposeGhost(), 0);
				}
			}
			if (event.dataTransfer) {
				event.dataTransfer.effectAllowed = "move";
				if (event.dataTransfer.items.length === 0) event.dataTransfer.setData("text/plain", "");
			}
		}), addDisposableListener(this.el, "dragend", (event) => {
			var _this$opts$onDragEnd, _this$opts4;
			this._pointerEventsDisposable.dispose();
			setTimeout(() => this._dataDisposable.dispose(), 0);
			(_this$opts$onDragEnd = (_this$opts4 = this.opts).onDragEnd) === null || _this$opts$onDragEnd === void 0 || _this$opts$onDragEnd.call(_this$opts4, event);
		}));
	}
	setDisabled(value) {
		this._disabled = value;
	}
	setTouchOnly(_) {}
	cancelPending() {}
};
var Html5DragBackend = class {
	constructor() {
		this.kind = "html5";
	}
	createDropTarget(element, options) {
		return new Droptarget(element, options);
	}
	createDragSource(element, options) {
		return new Html5DragSource(element, options);
	}
};
var PointerDragBackend = class {
	constructor() {
		this.kind = "pointer";
	}
	createDropTarget(element, options) {
		return new PointerDropTarget(element, options);
	}
	createDragSource(element, options) {
		const pointerCreateGhost = options.createGhost ? (event) => {
			const spec = options.createGhost(event);
			if (!spec) return;
			const ghost = new PointerGhost({
				element: spec.element,
				initialX: event.clientX,
				initialY: event.clientY,
				offsetX: spec.offsetX,
				offsetY: spec.offsetY,
				owner: element
			});
			if (spec.dispose) {
				const baseDispose = ghost.dispose.bind(ghost);
				const disposeSpec = spec.dispose;
				ghost.dispose = () => {
					baseDispose();
					disposeSpec();
				};
			}
			return ghost;
		} : void 0;
		const source = new PointerDragSource(element, {
			getData: options.getData,
			isCancelled: options.isCancelled,
			onDragStart: options.onDragStart,
			onDragEnd: options.onDragEnd ? (event) => options.onDragEnd(event.pointerEvent) : void 0,
			createGhost: pointerCreateGhost,
			touchOnly: options.touchOnly,
			touchInitiationDelay: options.touchInitiationDelay,
			pressTolerance: options.pressTolerance,
			threshold: options.threshold
		});
		if (options.disabled) source.setDisabled(true);
		return source;
	}
};
const html5Backend = new Html5DragBackend();
const pointerBackend = new PointerDragBackend();

//#endregion
//#region src/paneview/options.ts
const PROPERTY_KEYS_PANEVIEW = (() => {
	return Object.keys({
		disableAutoResizing: void 0,
		disableDnd: void 0,
		className: void 0
	});
})();
var PaneviewUnhandledDragOverEvent = class extends AcceptableEvent {
	constructor(nativeEvent, position, getData, panel) {
		super();
		this.nativeEvent = nativeEvent;
		this.position = position;
		this.getData = getData;
		this.panel = panel;
	}
};

//#endregion
//#region src/api/panelApi.ts
var WillFocusEvent = class extends DockviewEvent {
	constructor() {
		super();
	}
};
/**
* A core api implementation that should be used across all panel-like objects
*/
var PanelApiImpl = class extends CompositeDisposable {
	get isFocused() {
		return this._isFocused;
	}
	get isActive() {
		return this._isActive;
	}
	get isVisible() {
		return this._isVisible;
	}
	get width() {
		return this._width;
	}
	get height() {
		return this._height;
	}
	constructor(id, component) {
		super();
		this.id = id;
		this.component = component;
		this._isFocused = false;
		this._isActive = false;
		this._isVisible = true;
		this._width = 0;
		this._height = 0;
		this._parameters = {};
		this.panelUpdatesDisposable = new MutableDisposable();
		this._onDidDimensionChange = new Emitter();
		this.onDidDimensionsChange = this._onDidDimensionChange.event;
		this._onDidChangeFocus = new Emitter();
		this.onDidFocusChange = this._onDidChangeFocus.event;
		this._onWillFocus = new Emitter();
		this.onWillFocus = this._onWillFocus.event;
		this._onDidVisibilityChange = new Emitter();
		this.onDidVisibilityChange = this._onDidVisibilityChange.event;
		this._onWillVisibilityChange = new Emitter();
		this.onWillVisibilityChange = this._onWillVisibilityChange.event;
		this._onDidActiveChange = new Emitter();
		this.onDidActiveChange = this._onDidActiveChange.event;
		this._onActiveChange = new Emitter();
		this.onActiveChange = this._onActiveChange.event;
		this._onDidParametersChange = new Emitter();
		this.onDidParametersChange = this._onDidParametersChange.event;
		this.addDisposables(this.onDidFocusChange((event) => {
			this._isFocused = event.isFocused;
		}), this.onDidActiveChange((event) => {
			this._isActive = event.isActive;
		}), this.onDidVisibilityChange((event) => {
			this._isVisible = event.isVisible;
		}), this.onDidDimensionsChange((event) => {
			this._width = event.width;
			this._height = event.height;
		}), this.panelUpdatesDisposable, this._onDidDimensionChange, this._onDidChangeFocus, this._onDidVisibilityChange, this._onDidActiveChange, this._onWillFocus, this._onActiveChange, this._onWillFocus, this._onWillVisibilityChange, this._onDidParametersChange);
	}
	getParameters() {
		return this._parameters;
	}
	initialize(panel) {
		this.panelUpdatesDisposable.value = this._onDidParametersChange.event((parameters) => {
			this._parameters = parameters;
			panel.update({ params: parameters });
		});
	}
	setVisible(isVisible) {
		this._onWillVisibilityChange.fire({ isVisible });
	}
	setActive() {
		this._onActiveChange.fire();
	}
	updateParameters(parameters) {
		this._onDidParametersChange.fire(parameters);
	}
};

//#endregion
//#region src/api/splitviewPanelApi.ts
var SplitviewPanelApiImpl = class extends PanelApiImpl {
	constructor(id, component) {
		super(id, component);
		this._onDidConstraintsChangeInternal = new Emitter();
		this.onDidConstraintsChangeInternal = this._onDidConstraintsChangeInternal.event;
		this._onDidConstraintsChange = new Emitter({ replay: true });
		this.onDidConstraintsChange = this._onDidConstraintsChange.event;
		this._onDidSizeChange = new Emitter();
		this.onDidSizeChange = this._onDidSizeChange.event;
		this.addDisposables(this._onDidConstraintsChangeInternal, this._onDidConstraintsChange, this._onDidSizeChange);
	}
	setConstraints(value) {
		this._onDidConstraintsChangeInternal.fire(value);
	}
	setSize(event) {
		this._onDidSizeChange.fire(event);
	}
};

//#endregion
//#region src/api/paneviewPanelApi.ts
var PaneviewPanelApiImpl = class extends SplitviewPanelApiImpl {
	set pane(pane) {
		this._pane = pane;
	}
	constructor(id, component) {
		super(id, component);
		this._onDidExpansionChange = new Emitter({ replay: true });
		this.onDidExpansionChange = this._onDidExpansionChange.event;
		this._onMouseEnter = new Emitter({});
		this.onMouseEnter = this._onMouseEnter.event;
		this._onMouseLeave = new Emitter({});
		this.onMouseLeave = this._onMouseLeave.event;
		this.addDisposables(this._onDidExpansionChange, this._onMouseEnter, this._onMouseLeave);
	}
	setExpanded(isExpanded) {
		var _this$_pane;
		(_this$_pane = this._pane) === null || _this$_pane === void 0 || _this$_pane.setExpanded(isExpanded);
	}
	get isExpanded() {
		var _this$_pane2;
		return !!((_this$_pane2 = this._pane) === null || _this$_pane2 === void 0 ? void 0 : _this$_pane2.isExpanded());
	}
};

//#endregion
//#region src/gridview/basePanelView.ts
var BasePanelView = class extends CompositeDisposable {
	get element() {
		return this._element;
	}
	get width() {
		return this._width;
	}
	get height() {
		return this._height;
	}
	get params() {
		var _this$_params;
		return (_this$_params = this._params) === null || _this$_params === void 0 ? void 0 : _this$_params.params;
	}
	constructor(id, component, api) {
		super();
		this.id = id;
		this.component = component;
		this.api = api;
		this._height = 0;
		this._width = 0;
		this._element = document.createElement("div");
		this._element.tabIndex = -1;
		this._element.style.outline = "none";
		this._element.style.height = "100%";
		this._element.style.width = "100%";
		this._element.style.overflow = "hidden";
		const focusTracker = trackFocus(this._element);
		this.addDisposables(this.api, focusTracker.onDidFocus(() => {
			this.api._onDidChangeFocus.fire({ isFocused: true });
		}), focusTracker.onDidBlur(() => {
			this.api._onDidChangeFocus.fire({ isFocused: false });
		}), focusTracker);
	}
	focus() {
		const event = new WillFocusEvent();
		this.api._onWillFocus.fire(event);
		if (event.defaultPrevented) return;
		this._element.focus();
	}
	layout(width, height) {
		this._width = width;
		this._height = height;
		this.api._onDidDimensionChange.fire({
			width,
			height
		});
		if (this.part) {
			if (this._params) this.part.update({ params: this._params.params });
		}
	}
	init(parameters) {
		this._params = parameters;
		this.part = this.getComponent();
	}
	update(event) {
		var _this$_params2, _this$part;
		this._params = _objectSpread2(_objectSpread2({}, this._params), {}, { params: _objectSpread2(_objectSpread2({}, (_this$_params2 = this._params) === null || _this$_params2 === void 0 ? void 0 : _this$_params2.params), event.params) });
		/**
		* delete new keys that have a value of undefined,
		* allow values of null
		*/
		for (const key of Object.keys(event.params)) if (event.params[key] === void 0) delete this._params.params[key];
		(_this$part = this.part) === null || _this$part === void 0 || _this$part.update({ params: this._params.params });
	}
	toJSON() {
		var _this$_params$params, _this$_params3;
		const params = (_this$_params$params = (_this$_params3 = this._params) === null || _this$_params3 === void 0 ? void 0 : _this$_params3.params) !== null && _this$_params$params !== void 0 ? _this$_params$params : {};
		return {
			id: this.id,
			component: this.component,
			params: Object.keys(params).length > 0 ? params : void 0
		};
	}
	dispose() {
		var _this$part2;
		this.api.dispose();
		(_this$part2 = this.part) === null || _this$part2 === void 0 || _this$part2.dispose();
		super.dispose();
	}
};

//#endregion
//#region src/paneview/paneviewPanel.ts
var PaneviewPanel = class extends BasePanelView {
	set orientation(value) {
		this._orientation = value;
	}
	get orientation() {
		return this._orientation;
	}
	get minimumSize() {
		return this.headerSize + (this.isExpanded() ? this._minimumBodySize : 0);
	}
	get maximumSize() {
		return this.headerSize + (this.isExpanded() ? this._maximumBodySize : 0);
	}
	get size() {
		return this._size;
	}
	get orthogonalSize() {
		return this._orthogonalSize;
	}
	set orthogonalSize(size) {
		this._orthogonalSize = size;
	}
	get minimumBodySize() {
		return this._minimumBodySize;
	}
	set minimumBodySize(value) {
		this._minimumBodySize = typeof value === "number" ? value : 0;
	}
	get maximumBodySize() {
		return this._maximumBodySize;
	}
	set maximumBodySize(value) {
		this._maximumBodySize = typeof value === "number" ? value : Number.POSITIVE_INFINITY;
	}
	get headerVisible() {
		return this._headerVisible;
	}
	set headerVisible(value) {
		this._headerVisible = value;
		this.header.style.display = value ? "" : "none";
	}
	constructor(options) {
		super(options.id, options.component, new PaneviewPanelApiImpl(options.id, options.component));
		this._onDidChangeExpansionState = new Emitter({ replay: true });
		this.onDidChangeExpansionState = this._onDidChangeExpansionState.event;
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		this._orthogonalSize = 0;
		this._size = 0;
		this._isExpanded = false;
		this.api.pane = this;
		this.api.initialize(this);
		this.headerSize = options.headerSize;
		this.headerComponent = options.headerComponent;
		this._minimumBodySize = options.minimumBodySize;
		this._maximumBodySize = options.maximumBodySize;
		this._isExpanded = options.isExpanded;
		this._headerVisible = options.isHeaderVisible;
		this._onDidChangeExpansionState.fire(this.isExpanded());
		this._orientation = options.orientation;
		this.element.classList.add("dv-pane");
		this.addDisposables(this.api.onWillVisibilityChange((event) => {
			const { isVisible } = event;
			const { accessor } = this._params;
			accessor.setVisible(this, isVisible);
		}), this.api.onDidSizeChange((event) => {
			this._onDidChange.fire({ size: event.size });
		}), addDisposableListener(this.element, "mouseenter", (ev) => {
			this.api._onMouseEnter.fire(ev);
		}), addDisposableListener(this.element, "mouseleave", (ev) => {
			this.api._onMouseLeave.fire(ev);
		}));
		this.addDisposables(this._onDidChangeExpansionState, this.onDidChangeExpansionState((isPanelExpanded) => {
			this.api._onDidExpansionChange.fire({ isExpanded: isPanelExpanded });
		}), this.api.onDidFocusChange((e) => {
			if (!this.header) return;
			if (e.isFocused) addClasses(this.header, "focused");
			else removeClasses(this.header, "focused");
		}));
		this.renderOnce();
	}
	setVisible(isVisible) {
		this.api._onDidVisibilityChange.fire({ isVisible });
	}
	setActive(isActive) {
		this.api._onDidActiveChange.fire({ isActive });
	}
	isExpanded() {
		return this._isExpanded;
	}
	setExpanded(expanded) {
		var _this$_expandedSize;
		if (this._isExpanded === expanded) return;
		this._isExpanded = expanded;
		if (expanded) {
			if (this.animationTimer) clearTimeout(this.animationTimer);
			if (this.body) this.element.appendChild(this.body);
		} else {
			this._expandedSize = this._size;
			this.animationTimer = setTimeout(() => {
				var _this$body;
				(_this$body = this.body) === null || _this$body === void 0 || _this$body.remove();
			}, 200);
		}
		this._onDidChange.fire(expanded ? { size: (_this$_expandedSize = this._expandedSize) !== null && _this$_expandedSize !== void 0 ? _this$_expandedSize : this.width } : {});
		this._onDidChangeExpansionState.fire(expanded);
	}
	layout(size, orthogonalSize) {
		this._size = size;
		this._orthogonalSize = orthogonalSize;
		const [width, height] = this.orientation === "HORIZONTAL" ? [size, orthogonalSize] : [orthogonalSize, size];
		super.layout(width, height);
	}
	init(parameters) {
		var _this$body2, _this$header;
		super.init(parameters);
		if (typeof parameters.minimumBodySize === "number") this.minimumBodySize = parameters.minimumBodySize;
		if (typeof parameters.maximumBodySize === "number") this.maximumBodySize = parameters.maximumBodySize;
		this.bodyPart = this.getBodyComponent();
		this.headerPart = this.getHeaderComponent();
		this.bodyPart.init(_objectSpread2(_objectSpread2({}, parameters), {}, { api: this.api }));
		this.headerPart.init(_objectSpread2(_objectSpread2({}, parameters), {}, { api: this.api }));
		(_this$body2 = this.body) === null || _this$body2 === void 0 || _this$body2.append(this.bodyPart.element);
		(_this$header = this.header) === null || _this$header === void 0 || _this$header.append(this.headerPart.element);
		if (typeof parameters.isExpanded === "boolean") this.setExpanded(parameters.isExpanded);
	}
	toJSON() {
		const params = this._params;
		return _objectSpread2(_objectSpread2({}, super.toJSON()), {}, {
			headerComponent: this.headerComponent,
			title: params.title
		});
	}
	renderOnce() {
		this.header = document.createElement("div");
		this.header.tabIndex = 0;
		this.header.className = "dv-pane-header";
		this.header.style.height = `${this.headerSize}px`;
		this.header.style.lineHeight = `${this.headerSize}px`;
		this.header.style.minHeight = `${this.headerSize}px`;
		this.header.style.maxHeight = `${this.headerSize}px`;
		this.element.appendChild(this.header);
		this.body = document.createElement("div");
		this.body.className = "dv-pane-body";
		this.element.appendChild(this.body);
	}
	getComponent() {
		return {
			update: (event) => {
				var _this$bodyPart, _this$headerPart;
				(_this$bodyPart = this.bodyPart) === null || _this$bodyPart === void 0 || _this$bodyPart.update(event);
				(_this$headerPart = this.headerPart) === null || _this$headerPart === void 0 || _this$headerPart.update(event);
			},
			dispose: () => {
				var _this$bodyPart2, _this$headerPart2;
				(_this$bodyPart2 = this.bodyPart) === null || _this$bodyPart2 === void 0 || _this$bodyPart2.dispose();
				(_this$headerPart2 = this.headerPart) === null || _this$headerPart2 === void 0 || _this$headerPart2.dispose();
			}
		};
	}
};

//#endregion
//#region src/paneview/draggablePaneviewPanel.ts
var DraggablePaneviewPanel = class extends PaneviewPanel {
	constructor(options) {
		super({
			id: options.id,
			component: options.component,
			headerComponent: options.headerComponent,
			orientation: options.orientation,
			isExpanded: options.isExpanded,
			isHeaderVisible: true,
			headerSize: options.headerSize,
			minimumBodySize: options.minimumBodySize,
			maximumBodySize: options.maximumBodySize
		});
		this._onDidDrop = new Emitter();
		this.onDidDrop = this._onDidDrop.event;
		this._onUnhandledDragOver = new Emitter();
		this.onUnhandledDragOver = this._onUnhandledDragOver.event;
		this.accessor = options.accessor;
		this.addDisposables(this._onDidDrop, this._onUnhandledDragOver);
		if (!options.disableDnd) this.initDragFeatures();
	}
	initDragFeatures() {
		if (!this.header) return;
		const id = this.id;
		const accessorId = this.accessor.id;
		this.header.draggable = true;
		const sharedDragOptions = { getData: () => {
			LocalSelectionTransfer.getInstance().setData([new PaneTransfer(accessorId, id)], PaneTransfer.prototype);
			return { dispose: () => {
				LocalSelectionTransfer.getInstance().clearData(PaneTransfer.prototype);
			} };
		} };
		this.html5DragSource = html5Backend.createDragSource(this.header, sharedDragOptions);
		this.pointerDragSource = pointerBackend.createDragSource(this.header, sharedDragOptions);
		const canDisplayOverlay = (event, position) => {
			const data = getPaneData();
			if (data) {
				if (data.paneId !== this.id && data.viewId === this.accessor.id) return true;
			}
			const firedEvent = new PaneviewUnhandledDragOverEvent(event, position, getPaneData, this);
			this._onUnhandledDragOver.fire(firedEvent);
			return firedEvent.isAccepted;
		};
		const dropTargetOptions = {
			acceptedTargetZones: ["top", "bottom"],
			overlayModel: { activationSize: {
				type: "percentage",
				value: 50
			} },
			canDisplayOverlay
		};
		this.target = html5Backend.createDropTarget(this.element, dropTargetOptions);
		this.pointerTarget = pointerBackend.createDropTarget(this.element, dropTargetOptions);
		this.addDisposables(this._onDidDrop, this.html5DragSource, this.pointerDragSource, this.target, this.pointerTarget, this.target.onDrop((event) => {
			this.onDrop(event);
		}), this.pointerTarget.onDrop((event) => {
			this.onDrop(event);
		}));
	}
	onDrop(event) {
		const data = getPaneData();
		if ((data === null || data === void 0 ? void 0 : data.viewId) !== this.accessor.id) {
			this._onDidDrop.fire(_objectSpread2(_objectSpread2({}, event), {}, {
				panel: this,
				api: new PaneviewApi(this.accessor),
				getData: getPaneData
			}));
			return;
		}
		const containerApi = this._params.containerApi;
		const panelId = data.paneId;
		const existingPanel = containerApi.getPanel(panelId);
		if (!existingPanel) {
			this._onDidDrop.fire(_objectSpread2(_objectSpread2({}, event), {}, {
				panel: this,
				getData: getPaneData,
				api: new PaneviewApi(this.accessor)
			}));
			return;
		}
		const allPanels = containerApi.panels;
		const fromIndex = allPanels.indexOf(existingPanel);
		let toIndex = containerApi.panels.indexOf(this);
		if (event.position === "left" || event.position === "top") {
			if (fromIndex < toIndex) toIndex--;
		}
		if (event.position === "right" || event.position === "bottom") {
			if (fromIndex > toIndex) toIndex++;
			toIndex = Math.min(allPanels.length - 1, toIndex);
		}
		containerApi.movePanel(fromIndex, toIndex);
	}
};

//#endregion
//#region src/dockview/components/panel/content.ts
let _contentId = 0;
/** Stable DOM id so each tab's `aria-controls` can reference its tabpanel. */
const nextContentId = () => `dv-tabpanel-${_contentId++}`;
var ContentContainer = class extends CompositeDisposable {
	get element() {
		return this._element;
	}
	get dimensions() {
		return this._dimensions;
	}
	constructor(accessor, group) {
		var _this$accessor$resolv, _this$accessor, _this$accessor$resolv2, _this$accessor2, _this$accessor$onDidO, _this$accessor$onDidO2, _this$accessor3;
		super();
		this.accessor = accessor;
		this.group = group;
		this.disposable = new MutableDisposable();
		this._onDidFocus = new Emitter();
		this.onDidFocus = this._onDidFocus.event;
		this._onDidBlur = new Emitter();
		this.onDidBlur = this._onDidBlur.event;
		this._onDidDimensionsChange = new Emitter();
		this.onDidDimensionsChange = this._onDidDimensionsChange.event;
		this._element = document.createElement("div");
		this._element.className = "dv-content-container";
		this._element.tabIndex = -1;
		this._element.id = nextContentId();
		this._element.setAttribute("role", "tabpanel");
		this.addDisposables(this._onDidFocus, this._onDidBlur, this._onDidDimensionsChange);
		const getOverrideTarget = () => {
			var _group$dropTargetCont;
			return (_group$dropTargetCont = group.dropTargetContainer) === null || _group$dropTargetCont === void 0 ? void 0 : _group$dropTargetCont.model;
		};
		const canDisplayOverlay = (event, position) => this.group.canDisplayContentOverlay(event, position);
		this.dropTarget = new Droptarget(this.element, {
			getOverlayOutline: () => {
				var _accessor$options$the;
				return ((_accessor$options$the = accessor.options.theme) === null || _accessor$options$the === void 0 ? void 0 : _accessor$options$the.dndPanelOverlay) === "group" ? this.element.parentElement : null;
			},
			className: "dv-drop-target-content",
			acceptedTargetZones: [
				"top",
				"bottom",
				"left",
				"right",
				"center"
			],
			canDisplayOverlay,
			getOverrideTarget,
			overlayModel: (_this$accessor$resolv = (_this$accessor = this.accessor).resolveDropOverlayModel) === null || _this$accessor$resolv === void 0 ? void 0 : _this$accessor$resolv.call(_this$accessor, "content"),
			getPositionResolver: () => {
				var _accessor$getDropPosi;
				return (_accessor$getDropPosi = accessor.getDropPositionResolver) === null || _accessor$getDropPosi === void 0 ? void 0 : _accessor$getDropPosi.call(accessor);
			}
		});
		this.pointerDropTarget = pointerBackend.createDropTarget(this.element, {
			acceptedTargetZones: [
				"top",
				"bottom",
				"left",
				"right",
				"center"
			],
			canDisplayOverlay,
			getOverlayOutline: () => {
				var _accessor$options$the2;
				return ((_accessor$options$the2 = accessor.options.theme) === null || _accessor$options$the2 === void 0 ? void 0 : _accessor$options$the2.dndPanelOverlay) === "group" ? this.element.parentElement : null;
			},
			className: "dv-drop-target-content",
			getOverrideTarget,
			overlayModel: (_this$accessor$resolv2 = (_this$accessor2 = this.accessor).resolveDropOverlayModel) === null || _this$accessor$resolv2 === void 0 ? void 0 : _this$accessor$resolv2.call(_this$accessor2, "content"),
			getPositionResolver: () => {
				var _accessor$getDropPosi2;
				return (_accessor$getDropPosi2 = accessor.getDropPositionResolver) === null || _accessor$getDropPosi2 === void 0 ? void 0 : _accessor$getDropPosi2.call(accessor);
			}
		});
		this.addDisposables(this.dropTarget, this.pointerDropTarget, (_this$accessor$onDidO = (_this$accessor$onDidO2 = (_this$accessor3 = this.accessor).onDidOptionsChange) === null || _this$accessor$onDidO2 === void 0 ? void 0 : _this$accessor$onDidO2.call(_this$accessor3, () => {
			var _this$accessor$resolv3, _this$accessor$resolv4, _this$accessor4;
			const model = (_this$accessor$resolv3 = (_this$accessor$resolv4 = (_this$accessor4 = this.accessor).resolveDropOverlayModel) === null || _this$accessor$resolv4 === void 0 ? void 0 : _this$accessor$resolv4.call(_this$accessor4, "content")) !== null && _this$accessor$resolv3 !== void 0 ? _this$accessor$resolv3 : {};
			this.dropTarget.setOverlayModel(model);
			this.pointerDropTarget.setOverlayModel(model);
		})) !== null && _this$accessor$onDidO !== void 0 ? _this$accessor$onDidO : Disposable.NONE);
	}
	show() {
		this.element.style.display = "";
	}
	hide() {
		this.element.style.display = "none";
	}
	setLabelledBy(tabElementId) {
		if (tabElementId) this._element.setAttribute("aria-labelledby", tabElementId);
		else this._element.removeAttribute("aria-labelledby");
	}
	renderPanel(panel, options) {
		var _options$asActive;
		const doRender = ((_options$asActive = options === null || options === void 0 ? void 0 : options.asActive) !== null && _options$asActive !== void 0 ? _options$asActive : true) || this.group.isPanelActive(panel);
		if (doRender || this.panel === panel) {
			var _this$panel;
			if (((_this$panel = this.panel) === null || _this$panel === void 0 ? void 0 : _this$panel.view.content.element.parentElement) === this._element) {
				var _this$panel$view$cont, _this$panel$view$cont2;
				this.panel.view.content.element.remove();
				(_this$panel$view$cont = (_this$panel$view$cont2 = this.panel.view.content).onHide) === null || _this$panel$view$cont === void 0 || _this$panel$view$cont.call(_this$panel$view$cont2);
			}
			this.panel = panel;
		}
		let container;
		switch (panel.api.renderer) {
			case "onlyWhenVisible":
				this.group.renderContainer.detatch(panel);
				if (doRender) {
					var _panel$view$content$o, _panel$view$content;
					this._element.appendChild(panel.view.content.element);
					(_panel$view$content$o = (_panel$view$content = panel.view.content).onShow) === null || _panel$view$content$o === void 0 || _panel$view$content$o.call(_panel$view$content);
				}
				container = this._element;
				break;
			case "always":
				if (panel.view.content.element.parentElement === this._element) panel.view.content.element.remove();
				container = this.group.renderContainer.attach({
					panel,
					referenceContainer: this
				});
				break;
			default: throw new Error(`dockview: invalid renderer type '${panel.api.renderer}'`);
		}
		if (doRender) {
			const focusTracker = trackFocus(container);
			this.focusTracker = focusTracker;
			const disposable = new CompositeDisposable();
			disposable.addDisposables(focusTracker, focusTracker.onDidFocus(() => this._onDidFocus.fire()), focusTracker.onDidBlur(() => this._onDidBlur.fire()));
			this.disposable.value = disposable;
		}
	}
	openPanel(panel) {
		if (this.panel === panel) return;
		this.renderPanel(panel);
	}
	layout(width, height) {
		var _this$_dimensions;
		if (((_this$_dimensions = this._dimensions) === null || _this$_dimensions === void 0 ? void 0 : _this$_dimensions.width) === width && this._dimensions.height === height) return;
		this._dimensions = {
			width,
			height
		};
		this._onDidDimensionsChange.fire(this._dimensions);
	}
	closePanel() {
		if (this.panel) {
			if (this.panel.api.renderer === "onlyWhenVisible") {
				var _this$panel$view$cont3, _this$panel$view$cont4;
				this.panel.view.content.element.remove();
				(_this$panel$view$cont3 = (_this$panel$view$cont4 = this.panel.view.content).onHide) === null || _this$panel$view$cont3 === void 0 || _this$panel$view$cont3.call(_this$panel$view$cont4);
			}
		}
		this.panel = void 0;
	}
	dispose() {
		this.disposable.dispose();
		super.dispose();
	}
	/**
	* Refresh the focus tracker state to handle cases where focus state
	* gets out of sync due to programmatic panel activation
	*/
	refreshFocusState() {
		var _this$focusTracker;
		if ((_this$focusTracker = this.focusTracker) === null || _this$focusTracker === void 0 ? void 0 : _this$focusTracker.refreshState) this.focusTracker.refreshState();
	}
};

//#endregion
//#region src/svg.ts
const createSvgElementFromPath = (params) => {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttributeNS(null, "height", params.height);
	svg.setAttributeNS(null, "width", params.width);
	svg.setAttributeNS(null, "viewBox", params.viewbox);
	svg.setAttributeNS(null, "aria-hidden", "false");
	svg.setAttributeNS(null, "focusable", "false");
	svg.classList.add("dv-svg");
	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttributeNS(null, "d", params.path);
	svg.appendChild(path);
	return svg;
};
const createCloseButton = () => createSvgElementFromPath({
	width: "11",
	height: "11",
	viewbox: "0 0 28 28",
	path: "M2.1 27.3L0 25.2L11.55 13.65L0 2.1L2.1 0L13.65 11.55L25.2 0L27.3 2.1L15.75 13.65L27.3 25.2L25.2 27.3L13.65 15.75L2.1 27.3Z"
});
const createPinButton = () => createSvgElementFromPath({
	width: "11",
	height: "11",
	viewbox: "0 0 24 24",
	path: "M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"
});
const createExpandMoreButton = () => createSvgElementFromPath({
	width: "11",
	height: "11",
	viewbox: "0 0 24 15",
	path: "M12 14.15L0 2.15L2.15 0L12 9.9L21.85 0.0499992L24 2.2L12 14.15Z"
});
const createChevronRightButton = () => createSvgElementFromPath({
	width: "11",
	height: "11",
	viewbox: "0 0 15 25",
	path: "M2.15 24.1L0 21.95L9.9 12.05L0 2.15L2.15 0L14.2 12.05L2.15 24.1Z"
});

//#endregion
//#region src/dnd/pointer/longPress.ts
const DEFAULT_DELAY = 500;
const DEFAULT_TOLERANCE = 8;
/**
* Doesn't consume the pointer; movement past `tolerance` cancels
* silently so a sibling `PointerDragSource` can take over.
*/
var LongPressDetector = class extends CompositeDisposable {
	constructor(element, options) {
		super();
		this.element = element;
		this.options = options;
		this._startX = 0;
		this._startY = 0;
		this.addDisposables(addDisposableListener(this.element, "pointerdown", (e) => {
			this._onPointerDown(e);
		}));
	}
	_onPointerDown(event) {
		var _this$options$touchOn, _this$options$delay, _this$options$toleran, _this$element$ownerDo, _this$element$ownerDo2;
		if (((_this$options$touchOn = this.options.touchOnly) !== null && _this$options$touchOn !== void 0 ? _this$options$touchOn : true) && event.pointerType !== "touch" && event.pointerType !== "pen") return;
		this._cancelPending();
		this._pointerId = event.pointerId;
		this._startX = event.clientX;
		this._startY = event.clientY;
		const delay = (_this$options$delay = this.options.delay) !== null && _this$options$delay !== void 0 ? _this$options$delay : DEFAULT_DELAY;
		const tolerance = (_this$options$toleran = this.options.tolerance) !== null && _this$options$toleran !== void 0 ? _this$options$toleran : DEFAULT_TOLERANCE;
		const targetWindow = (_this$element$ownerDo = (_this$element$ownerDo2 = this.element.ownerDocument) === null || _this$element$ownerDo2 === void 0 ? void 0 : _this$element$ownerDo2.defaultView) !== null && _this$element$ownerDo !== void 0 ? _this$element$ownerDo : globalThis.window;
		this._timer = setTimeout(() => {
			this._timer = void 0;
			this._cancelPending();
			this._installContextMenuGuard(targetWindow);
			this._installClickGuard(targetWindow);
			this.options.onLongPress(event);
		}, delay);
		this._moveListener = addDisposableListener(targetWindow, "pointermove", (moveEvent) => {
			if (moveEvent.pointerId !== this._pointerId) return;
			const dx = moveEvent.clientX - this._startX;
			const dy = moveEvent.clientY - this._startY;
			if (Math.hypot(dx, dy) > tolerance) this._cancelPending();
		});
		this._upListener = addDisposableListener(targetWindow, "pointerup", (upEvent) => {
			if (upEvent.pointerId !== this._pointerId) return;
			this._cancelPending();
		});
		this._cancelListener = addDisposableListener(targetWindow, "pointercancel", (cancelEvent) => {
			if (cancelEvent.pointerId !== this._pointerId) return;
			this._cancelPending();
		});
	}
	_installContextMenuGuard(targetWindow) {
		let guard;
		const timeout = setTimeout(() => guard === null || guard === void 0 ? void 0 : guard.dispose(), 500);
		guard = addDisposableListener(targetWindow, "contextmenu", (event) => {
			event.preventDefault();
			clearTimeout(timeout);
			guard === null || guard === void 0 || guard.dispose();
		}, { capture: true });
	}
	_installClickGuard(targetWindow) {
		let guard;
		const timeout = setTimeout(() => guard === null || guard === void 0 ? void 0 : guard.dispose(), 500);
		guard = addDisposableListener(targetWindow, "click", (event) => {
			if (isEventWithin(event, [this.element])) {
				event.preventDefault();
				event.stopPropagation();
			}
			clearTimeout(timeout);
			guard === null || guard === void 0 || guard.dispose();
		}, { capture: true });
	}
	_cancelPending() {
		var _this$_moveListener, _this$_upListener, _this$_cancelListener;
		if (this._timer !== void 0) {
			clearTimeout(this._timer);
			this._timer = void 0;
		}
		this._pointerId = void 0;
		(_this$_moveListener = this._moveListener) === null || _this$_moveListener === void 0 || _this$_moveListener.dispose();
		(_this$_upListener = this._upListener) === null || _this$_upListener === void 0 || _this$_upListener.dispose();
		(_this$_cancelListener = this._cancelListener) === null || _this$_cancelListener === void 0 || _this$_cancelListener.dispose();
		this._moveListener = void 0;
		this._upListener = void 0;
		this._cancelListener = void 0;
	}
	dispose() {
		this._cancelPending();
		super.dispose();
	}
};

//#endregion
//#region src/dockview/dndCapabilities.ts
function resolveDndCapabilities(options) {
	if (options.disableDnd) return {
		html5: false,
		pointer: false,
		pointerHandlesMouse: false
	};
	switch (options.dndStrategy) {
		case "pointer": return {
			html5: false,
			pointer: true,
			pointerHandlesMouse: true
		};
		case "html5": return {
			html5: true,
			pointer: false,
			pointerHandlesMouse: false
		};
		case "auto":
		case void 0:
		default: return isCoarsePrimaryInput$2() ? {
			html5: false,
			pointer: true,
			pointerHandlesMouse: true
		} : {
			html5: true,
			pointer: true,
			pointerHandlesMouse: false
		};
	}
}
function isCoarsePrimaryInput$2() {
	if (globalThis.window === void 0 || !globalThis.matchMedia) return false;
	const coarse = globalThis.matchMedia("(pointer: coarse)").matches;
	const fine = globalThis.matchMedia("(pointer: fine)").matches;
	return coarse && !fine;
}

//#endregion
//#region src/dockview/components/tab/tab.ts
let _tabId = 0;
/** Stable DOM id referenced by the tabpanel's `aria-labelledby`. */
const nextTabId = () => `dv-tab-${_tabId++}`;
var Tab = class extends CompositeDisposable {
	get element() {
		return this._element;
	}
	constructor(panel, accessor, group) {
		var _this$panel$title, _this$group, _this$panel$api$onDid, _this$panel$api, _this$panel$api$onDid2, _this$panel$api$onDid3, _this$panel$api2, _this$panel$api2$onDi;
		super();
		this.panel = panel;
		this.accessor = accessor;
		this.group = group;
		this.content = void 0;
		this.panelTransfer = LocalSelectionTransfer.getInstance();
		this._direction = "horizontal";
		this._pinIndicator = void 0;
		this._onPointDown = new Emitter();
		this.onPointerDown = this._onPointDown.event;
		this._onTabClick = new Emitter();
		this.onTabClick = this._onTabClick.event;
		this._onDropped = new Emitter();
		this.onDrop = this._onDropped.event;
		this._onDragStart = new Emitter();
		this.onDragStart = this._onDragStart.event;
		this._onDragEnd = new Emitter();
		this.onDragEnd = this._onDragEnd.event;
		const caps = resolveDndCapabilities(this.accessor.options);
		this._element = document.createElement("div");
		this._element.className = "dv-tab";
		this._element.tabIndex = -1;
		this._element.draggable = caps.html5;
		this._element.id = nextTabId();
		this._element.setAttribute("role", "tab");
		this._element.setAttribute("aria-selected", "false");
		this._element.setAttribute("aria-label", (_this$panel$title = this.panel.title) !== null && _this$panel$title !== void 0 ? _this$panel$title : this.panel.id);
		this._element.dataset.tabPanelId = this.panel.id;
		const contentContainerId = (_this$group = this.group) === null || _this$group === void 0 || (_this$group = _this$group.model) === null || _this$group === void 0 ? void 0 : _this$group.contentContainerId;
		if (contentContainerId) this._element.setAttribute("aria-controls", contentContainerId);
		toggleClass(this.element, "dv-inactive-tab", true);
		this._updatePinnedClasses();
		const canDisplayOverlay = (event, position) => {
			if (this.group.locked) return false;
			const data = getPanelData();
			if (this.accessor.id === (data === null || data === void 0 ? void 0 : data.viewId)) {
				var _this$accessor$option;
				if (((_this$accessor$option = this.accessor.options.theme) === null || _this$accessor$option === void 0 ? void 0 : _this$accessor$option.tabAnimation) === "smooth") return false;
				if (data.tabGroupId && data.groupId === this.group.id && this.group.model.getTabGroupForPanel(this.panel.id)) return false;
				return true;
			}
			return this.group.model.canDisplayOverlay(event, position, "tab");
		};
		this.dropTarget = html5Backend.createDropTarget(this._element, {
			acceptedTargetZones: ["left", "right"],
			overlayModel: this._buildOverlayModel(),
			canDisplayOverlay,
			getOverrideTarget: () => {
				var _group$model$dropTarg;
				return (_group$model$dropTarg = group.model.dropTargetContainer) === null || _group$model$dropTarg === void 0 ? void 0 : _group$model$dropTarg.model;
			}
		});
		this.pointerDropTarget = pointerBackend.createDropTarget(this._element, {
			acceptedTargetZones: ["left", "right"],
			overlayModel: this._buildOverlayModel(),
			canDisplayOverlay,
			getOverrideTarget: () => {
				var _group$model$dropTarg2;
				return (_group$model$dropTarg2 = group.model.dropTargetContainer) === null || _group$model$dropTarg2 === void 0 ? void 0 : _group$model$dropTarg2.model;
			}
		});
		const sharedDragOptions = {
			getData: () => {
				this.panelTransfer.setData([new PanelTransfer(this.accessor.id, this.group.id, this.panel.id)], PanelTransfer.prototype);
				return { dispose: () => {
					this.panelTransfer.clearData(PanelTransfer.prototype);
				} };
			},
			createGhost: () => ({
				element: this._buildGhostElement(),
				offsetX: 30,
				offsetY: -10
			}),
			onDragStart: (event) => {
				var _this$accessor$option2;
				this._onDragStart.fire(event);
				if (!event.defaultPrevented && !(event instanceof PointerEvent) && ((_this$accessor$option2 = this.accessor.options.theme) === null || _this$accessor$option2 === void 0 ? void 0 : _this$accessor$option2.tabAnimation) === "smooth") requestAnimationFrame(() => {
					toggleClass(this.element, "dv-tab--dragging", true);
				});
			},
			onDragEnd: (event) => {
				this._onDragEnd.fire(event);
			}
		};
		this.html5DragSource = html5Backend.createDragSource(this._element, _objectSpread2(_objectSpread2({}, sharedDragOptions), {}, { disabled: !caps.html5 }));
		this.pointerDragSource = pointerBackend.createDragSource(this._element, _objectSpread2(_objectSpread2({}, sharedDragOptions), {}, {
			disabled: !caps.pointer,
			touchOnly: !caps.pointerHandlesMouse,
			isCancelled: () => !resolveDndCapabilities(this.accessor.options).pointer
		}));
		this.onWillShowOverlay = Event.any(this.dropTarget.onWillShowOverlay, this.pointerDropTarget.onWillShowOverlay);
		this.addDisposables(this._onPointDown, this._onTabClick, this._onDropped, this._onDragStart, this._onDragEnd, this.accessor.onDidOptionsChange(() => {
			const model = this._buildOverlayModel();
			this.dropTarget.setOverlayModel(model);
			this.pointerDropTarget.setOverlayModel(model);
			this._updatePinnedClasses();
		}), (_this$panel$api$onDid = (_this$panel$api = this.panel.api) === null || _this$panel$api === void 0 || (_this$panel$api$onDid2 = _this$panel$api.onDidChangePinned) === null || _this$panel$api$onDid2 === void 0 ? void 0 : _this$panel$api$onDid2.call(_this$panel$api, () => {
			this._updatePinnedClasses();
		})) !== null && _this$panel$api$onDid !== void 0 ? _this$panel$api$onDid : { dispose: () => {} }, (_this$panel$api$onDid3 = (_this$panel$api2 = this.panel.api) === null || _this$panel$api2 === void 0 || (_this$panel$api2$onDi = _this$panel$api2.onDidTitleChange) === null || _this$panel$api2$onDi === void 0 ? void 0 : _this$panel$api2$onDi.call(_this$panel$api2, (event) => {
			var _event$title;
			this._element.setAttribute("aria-label", (_event$title = event.title) !== null && _event$title !== void 0 ? _event$title : this.panel.id);
		})) !== null && _this$panel$api$onDid3 !== void 0 ? _this$panel$api$onDid3 : { dispose: () => {} }, addDisposableListener(this._element, "dragend", () => {
			toggleClass(this.element, "dv-tab--dragging", false);
		}), this.html5DragSource, addDisposableListener(this._element, "pointerdown", (event) => {
			this._onPointDown.fire(event);
		}), addDisposableListener(this._element, "click", (event) => {
			this._onTabClick.fire(event);
		}), addDisposableListener(this._element, "contextmenu", (event) => {
			var _this$accessor$contex;
			(_this$accessor$contex = this.accessor.contextMenuService) === null || _this$accessor$contex === void 0 || _this$accessor$contex.show(this.panel, this.group, event);
		}), new LongPressDetector(this._element, { onLongPress: (event) => {
			var _this$accessor$contex2;
			this.pointerDragSource.cancelPending();
			(_this$accessor$contex2 = this.accessor.contextMenuService) === null || _this$accessor$contex2 === void 0 || _this$accessor$contex2.show(this.panel, this.group, event);
		} }), this.dropTarget.onDrop((event) => {
			this._onDropped.fire(event);
		}), this.pointerDropTarget.onDrop((event) => {
			this._onDropped.fire(event);
		}), this.dropTarget, this.pointerDropTarget, this.pointerDragSource);
	}
	_updatePinnedClasses() {
		var _this$panel$api$isPin, _this$panel$api3, _this$accessor$option3, _this$panel$api4;
		const pinned = (_this$panel$api$isPin = (_this$panel$api3 = this.panel.api) === null || _this$panel$api3 === void 0 ? void 0 : _this$panel$api3.isPinned) !== null && _this$panel$api$isPin !== void 0 ? _this$panel$api$isPin : false;
		const compact = pinned && ((_this$accessor$option3 = this.accessor.options.pinnedTabs) === null || _this$accessor$option3 === void 0 ? void 0 : _this$accessor$option3.compact) === true;
		toggleClass(this.element, "dv-tab--pinned", pinned);
		toggleClass(this.element, "dv-tab--pinned-compact", compact);
		const wantGlyph = pinned && !((_this$panel$api4 = this.panel.api) === null || _this$panel$api4 === void 0 ? void 0 : _this$panel$api4.tabComponent);
		if (wantGlyph && !this._pinIndicator) {
			const indicator = document.createElement("div");
			indicator.className = "dv-tab-pin";
			indicator.appendChild(createPinButton());
			this._element.insertBefore(indicator, this._element.firstChild);
			this._pinIndicator = indicator;
		} else if (!wantGlyph && this._pinIndicator) {
			this._pinIndicator.remove();
			this._pinIndicator = void 0;
		}
	}
	setActive(isActive) {
		toggleClass(this.element, "dv-active-tab", isActive);
		toggleClass(this.element, "dv-inactive-tab", !isActive);
		this._element.setAttribute("aria-selected", isActive ? "true" : "false");
		this._element.tabIndex = isActive ? 0 : -1;
	}
	setContent(part) {
		if (this.content) this.content.element.remove();
		this.content = part;
		this._element.appendChild(this.content.element);
	}
	_buildOverlayModel() {
		var _this$accessor$resolv, _this$accessor, _this$accessor$option4;
		const custom = (_this$accessor$resolv = (_this$accessor = this.accessor).resolveDropOverlayModel) === null || _this$accessor$resolv === void 0 ? void 0 : _this$accessor$resolv.call(_this$accessor, "tab", this.group);
		if (custom) return custom;
		const smallBoundary = ((_this$accessor$option4 = this.accessor.options.theme) === null || _this$accessor$option4 === void 0 ? void 0 : _this$accessor$option4.dndTabIndicator) === "line" ? Number.POSITIVE_INFINITY : 0;
		return {
			activationSize: {
				value: 50,
				type: "percentage"
			},
			smallWidthBoundary: smallBoundary,
			smallHeightBoundary: smallBoundary
		};
	}
	setDirection(direction) {
		this._direction = direction;
		const zones = direction === "vertical" ? ["top", "bottom"] : ["left", "right"];
		this.dropTarget.setTargetZones(zones);
		this.pointerDropTarget.setTargetZones(zones);
	}
	updateDragAndDropState() {
		const caps = resolveDndCapabilities(this.accessor.options);
		this._element.draggable = caps.html5;
		this.html5DragSource.setDisabled(!caps.html5);
		this.pointerDragSource.setDisabled(!caps.pointer);
		this.pointerDragSource.setTouchOnly(!caps.pointerHandlesMouse);
	}
	/**
	* Vertical tabs are flipped to horizontal so the ghost stays readable
	* during the drag rather than appearing sideways-rotated.
	*/
	_buildGhostElement() {
		const style = getComputedStyle(this.element);
		const newNode = this.element.cloneNode(true);
		const isVertical = this._direction === "vertical";
		const verticalSkip = /* @__PURE__ */ new Set([
			"writing-mode",
			"inline-size",
			"block-size",
			"min-inline-size",
			"min-block-size",
			"max-inline-size",
			"max-block-size",
			"margin-inline",
			"margin-inline-start",
			"margin-inline-end",
			"margin-block",
			"margin-block-start",
			"margin-block-end",
			"padding-inline",
			"padding-inline-start",
			"padding-inline-end",
			"padding-block",
			"padding-block-start",
			"padding-block-end"
		]);
		Array.from(style).forEach((key) => {
			if (isVertical && verticalSkip.has(key)) return;
			newNode.style.setProperty(key, style.getPropertyValue(key), style.getPropertyPriority(key));
		});
		if (isVertical) {
			newNode.style.setProperty("writing-mode", "horizontal-tb");
			newNode.style.setProperty("width", style.height);
			newNode.style.setProperty("height", style.width);
		}
		newNode.style.position = "absolute";
		newNode.classList.add("dv-tab-ghost-drag");
		return newNode;
	}
};

//#endregion
//#region src/dockview/events.ts
var DockviewWillShowOverlayLocationEvent = class {
	get kind() {
		return this.options.kind;
	}
	/** Narrow with `instanceof DragEvent` before reading `dataTransfer`. */
	get nativeEvent() {
		return this.event.nativeEvent;
	}
	get position() {
		return this.event.position;
	}
	/** The resolved cell was marked `edge` (an outer "dock to the whole layout"
	*  cell). See {@link DroptargetEvent.edge}. */
	get edge() {
		return this.event.edge;
	}
	/** The resolved cell docks as a dedicated edge group (display hint). See
	*  {@link PositionResolverResult.edgeGroup}. */
	get edgeGroup() {
		return this.event.edgeGroup;
	}
	get defaultPrevented() {
		return this.event.defaultPrevented;
	}
	get panel() {
		return this.options.panel;
	}
	get api() {
		return this.options.api;
	}
	get group() {
		return this.options.group;
	}
	preventDefault() {
		this.event.preventDefault();
	}
	getData() {
		return this.options.getData();
	}
	constructor(event, options) {
		this.event = event;
		this.options = options;
	}
};

//#endregion
//#region src/dockview/components/titlebar/groupDragSource.ts
const FLOATING_REDOCK_INITIATION_DELAY_MS = 500;
/**
* The drag-source half of a group drag handle: html5 + pointer drag sources
* that publish a group-level `PanelTransfer`, the "Multiple Panels (N)" ghost,
* and the floating-group disambiguation that keeps the redock gesture from
* firing alongside the overlay's move-the-float gesture.
*
* Shared by the tab-bar void container and the dedicated floating title bar so
* both grab handles redock identically.
*/
var GroupDragSource = class extends CompositeDisposable {
	get group() {
		return this.groupAccessor();
	}
	constructor(options) {
		var _options$isFloatingMo, _this$group2;
		super();
		this.panelTransfer = LocalSelectionTransfer.getInstance();
		this._onDragStart = new Emitter();
		this.onDragStart = this._onDragStart.event;
		this._element = options.element;
		this.accessor = options.accessor;
		const group = options.group;
		this.groupAccessor = typeof group === "function" ? group : () => group;
		this.isFloatingMoveHandle = (_options$isFloatingMo = options.isFloatingMoveHandle) !== null && _options$isFloatingMo !== void 0 ? _options$isFloatingMo : (() => true);
		const caps = resolveDndCapabilities(this.accessor.options);
		this._element.draggable = caps.html5;
		toggleClass(this._element, "dv-draggable", caps.html5 || caps.pointer);
		this.addDisposables(this._onDragStart);
		const buildMultiPanelsGhost = () => {
			const ghostEl = document.createElement("div");
			const style = globalThis.getComputedStyle(this._element);
			const bgColor = style.getPropertyValue("--dv-activegroup-visiblepanel-tab-background-color");
			const color = style.getPropertyValue("--dv-activegroup-visiblepanel-tab-color");
			ghostEl.style.backgroundColor = bgColor;
			ghostEl.style.color = color;
			ghostEl.style.padding = "2px 8px";
			ghostEl.style.height = "24px";
			ghostEl.style.fontSize = "11px";
			ghostEl.style.lineHeight = "20px";
			ghostEl.style.borderRadius = "12px";
			ghostEl.style.whiteSpace = "nowrap";
			ghostEl.style.boxSizing = "border-box";
			ghostEl.style.display = "inline-block";
			ghostEl.textContent = `Multiple Panels (${this.group.size})`;
			return ghostEl;
		};
		const buildGhostSpec = () => {
			var _this$accessor$buildG, _this$accessor;
			const customGhost = (_this$accessor$buildG = (_this$accessor = this.accessor).buildGroupDragGhost) === null || _this$accessor$buildG === void 0 ? void 0 : _this$accessor$buildG.call(_this$accessor, this.group);
			if (customGhost) return customGhost;
			return {
				element: buildMultiPanelsGhost(),
				offsetX: 30,
				offsetY: -10
			};
		};
		const sharedDragOptions = {
			getData: () => {
				this.panelTransfer.setData([new PanelTransfer(this.accessor.id, this.group.id, null)], PanelTransfer.prototype);
				return { dispose: () => {
					this.panelTransfer.clearData(PanelTransfer.prototype);
				} };
			},
			createGhost: buildGhostSpec,
			onDragStart: (event) => {
				this._onDragStart.fire(event);
			}
		};
		this.html5DragSource = html5Backend.createDragSource(this._element, _objectSpread2(_objectSpread2({}, sharedDragOptions), {}, {
			disabled: !caps.html5,
			isCancelled: (event) => {
				if (this.group.api.location.type === "floating" && this.isFloatingMoveHandle() && !event.shiftKey) return true;
				if (this.group.api.location.type === "edge" && this.group.size === 0) return true;
				return false;
			}
		}));
		const isFloating = () => {
			var _this$group;
			return ((_this$group = this.group) === null || _this$group === void 0 || (_this$group = _this$group.api) === null || _this$group === void 0 || (_this$group = _this$group.location) === null || _this$group === void 0 ? void 0 : _this$group.type) === "floating" && this.isFloatingMoveHandle();
		};
		this.pointerDragSource = pointerBackend.createDragSource(this._element, _objectSpread2(_objectSpread2({}, sharedDragOptions), {}, {
			disabled: !caps.pointer,
			touchOnly: !caps.pointerHandlesMouse,
			touchInitiationDelay: () => isFloating() ? 500 : 250,
			pressTolerance: () => isFloating() ? Infinity : 8,
			isCancelled: () => {
				if (!resolveDndCapabilities(this.accessor.options).pointer) return true;
				if (this.group.api.location.type === "edge" && this.group.size === 0) return true;
				return false;
			},
			onDragStart: (event) => {
				var _this$getFloatingOver;
				const wasPrevented = event.defaultPrevented;
				this._onDragStart.fire(event);
				if (event.defaultPrevented && !wasPrevented) return;
				(_this$getFloatingOver = this.getFloatingOverlay()) === null || _this$getFloatingOver === void 0 || _this$getFloatingOver.cancelPendingDrag();
			}
		}));
		const overlayMoveSub = new MutableDisposable();
		const refreshOverlayMoveSub = () => {
			const overlay = this.getFloatingOverlay();
			overlayMoveSub.value = overlay ? overlay.onDidStartMoving(() => {
				this.pointerDragSource.cancelPending();
			}) : Disposable.NONE;
		};
		refreshOverlayMoveSub();
		this.addDisposables(overlayMoveSub);
		const locationChange = (_this$group2 = this.group) === null || _this$group2 === void 0 || (_this$group2 = _this$group2.api) === null || _this$group2 === void 0 ? void 0 : _this$group2.onDidLocationChange;
		if (locationChange) this.addDisposables(locationChange(refreshOverlayMoveSub));
		this.addDisposables(this.html5DragSource, this.pointerDragSource);
	}
	updateDragAndDropState() {
		const caps = resolveDndCapabilities(this.accessor.options);
		this._element.draggable = caps.html5;
		toggleClass(this._element, "dv-draggable", caps.html5 || caps.pointer);
		this.html5DragSource.setDisabled(!caps.html5);
		this.pointerDragSource.setDisabled(!caps.pointer);
		this.pointerDragSource.setTouchOnly(!caps.pointerHandlesMouse);
	}
	getFloatingOverlay() {
		var _this$accessor$floati;
		if (!this.group) return;
		return (_this$accessor$floati = this.accessor.floatingGroups) === null || _this$accessor$floati === void 0 || (_this$accessor$floati = _this$accessor$floati.find((fg) => fg.group === this.group)) === null || _this$accessor$floati === void 0 ? void 0 : _this$accessor$floati.overlay;
	}
};

//#endregion
//#region src/dockview/components/titlebar/voidContainer.ts
var VoidContainer = class extends CompositeDisposable {
	get element() {
		return this._element;
	}
	constructor(accessor, group) {
		var _this$accessor$resolv, _this$accessor, _this$accessor$resolv2, _this$accessor2, _this$accessor$onDidO, _this$accessor$onDidO2, _this$accessor3;
		super();
		this.accessor = accessor;
		this.group = group;
		this._onDrop = new Emitter();
		this.onDrop = this._onDrop.event;
		this._onDragStart = new Emitter();
		this.onDragStart = this._onDragStart.event;
		this._element = document.createElement("div");
		this._element.className = "dv-void-container";
		this.addDisposables(this._onDrop, this._onDragStart, addDisposableListener(this._element, "pointerdown", () => {
			this.accessor.doSetGroupActive(this.group);
		}), addDisposableListener(this._element, "pointerdown", (e) => {
			if (e.shiftKey) quasiPreventDefault(e);
		}, true));
		this.dragSource = new GroupDragSource({
			element: this._element,
			accessor: this.accessor,
			group: this.group,
			isFloatingMoveHandle: () => !this._element.closest(".dv-resize-container-with-titlebar")
		});
		const canDisplayOverlay = (event, position) => {
			if (this.group.api.locked) return false;
			const data = getPanelData();
			if (this.accessor.id === (data === null || data === void 0 ? void 0 : data.viewId)) return true;
			return group.model.canDisplayOverlay(event, position, "header_space");
		};
		this.dropTarget = html5Backend.createDropTarget(this._element, {
			acceptedTargetZones: ["center"],
			canDisplayOverlay,
			getOverrideTarget: () => {
				var _group$model$dropTarg;
				return (_group$model$dropTarg = group.model.dropTargetContainer) === null || _group$model$dropTarg === void 0 ? void 0 : _group$model$dropTarg.model;
			},
			overlayModel: (_this$accessor$resolv = (_this$accessor = this.accessor).resolveDropOverlayModel) === null || _this$accessor$resolv === void 0 ? void 0 : _this$accessor$resolv.call(_this$accessor, "header_space", this.group)
		});
		this.pointerDropTarget = pointerBackend.createDropTarget(this._element, {
			acceptedTargetZones: ["center"],
			canDisplayOverlay,
			getOverrideTarget: () => {
				var _group$model$dropTarg2;
				return (_group$model$dropTarg2 = group.model.dropTargetContainer) === null || _group$model$dropTarg2 === void 0 ? void 0 : _group$model$dropTarg2.model;
			},
			overlayModel: (_this$accessor$resolv2 = (_this$accessor2 = this.accessor).resolveDropOverlayModel) === null || _this$accessor$resolv2 === void 0 ? void 0 : _this$accessor$resolv2.call(_this$accessor2, "header_space", this.group)
		});
		this.onWillShowOverlay = Event.any(this.dropTarget.onWillShowOverlay, this.pointerDropTarget.onWillShowOverlay);
		this.addDisposables(this.dragSource, this.dragSource.onDragStart((event) => {
			this._onDragStart.fire(event);
		}), this.dropTarget.onDrop((event) => {
			this._onDrop.fire(event);
		}), this.pointerDropTarget.onDrop((event) => {
			this._onDrop.fire(event);
		}), this.dropTarget, this.pointerDropTarget, (_this$accessor$onDidO = (_this$accessor$onDidO2 = (_this$accessor3 = this.accessor).onDidOptionsChange) === null || _this$accessor$onDidO2 === void 0 ? void 0 : _this$accessor$onDidO2.call(_this$accessor3, () => {
			var _this$accessor$resolv3, _this$accessor$resolv4, _this$accessor4;
			const model = (_this$accessor$resolv3 = (_this$accessor$resolv4 = (_this$accessor4 = this.accessor).resolveDropOverlayModel) === null || _this$accessor$resolv4 === void 0 ? void 0 : _this$accessor$resolv4.call(_this$accessor4, "header_space", this.group)) !== null && _this$accessor$resolv3 !== void 0 ? _this$accessor$resolv3 : {};
			this.dropTarget.setOverlayModel(model);
			this.pointerDropTarget.setOverlayModel(model);
		})) !== null && _this$accessor$onDidO !== void 0 ? _this$accessor$onDidO : Disposable.NONE);
	}
	updateDragAndDropState() {
		this.dragSource.updateDragAndDropState();
	}
};

//#endregion
//#region src/scrollbar.ts
var Scrollbar = class Scrollbar extends CompositeDisposable {
	get element() {
		return this._element;
	}
	get orientation() {
		return this._orientation;
	}
	set orientation(value) {
		if (this._orientation === value) return;
		this._scrollOffset = 0;
		this._orientation = value;
		removeClasses(this._scrollbar, "dv-scrollbar-vertical", "dv-scrollbar-horizontal");
		if (value === "vertical") addClasses(this._scrollbar, "dv-scrollbar-vertical");
		else addClasses(this._scrollbar, "dv-scrollbar-horizontal");
	}
	constructor(scrollableElement) {
		super();
		this.scrollableElement = scrollableElement;
		this._scrollOffset = 0;
		this._orientation = "horizontal";
		this._element = document.createElement("div");
		this._element.className = "dv-scrollable";
		this._scrollbar = document.createElement("div");
		this._scrollbar.className = "dv-scrollbar dv-scrollbar-horizontal";
		this.element.appendChild(scrollableElement);
		this.element.appendChild(this._scrollbar);
		this.addDisposables(addDisposableListener(this.element, "wheel", (event) => {
			this._scrollOffset += event.deltaY * Scrollbar.MouseWheelSpeed;
			this.scheduleStyleUpdate();
		}), addDisposableListener(this._scrollbar, "pointerdown", (event) => {
			var _this$_scrollbar$owne;
			event.preventDefault();
			const doc = (_this$_scrollbar$owne = this._scrollbar.ownerDocument) !== null && _this$_scrollbar$owne !== void 0 ? _this$_scrollbar$owne : document;
			toggleClass(this.element, "dv-scrollable-scrolling", true);
			const originalClient = this._orientation === "horizontal" ? event.clientX : event.clientY;
			const originalScrollOffset = this._scrollOffset;
			const onPointerMove = (event) => {
				const delta = this._orientation === "horizontal" ? event.clientX - originalClient : event.clientY - originalClient;
				const p = (this._orientation === "horizontal" ? this.element.clientWidth : this.element.clientHeight) / (this._orientation === "horizontal" ? this.scrollableElement.scrollWidth : this.scrollableElement.scrollHeight);
				this._scrollOffset = originalScrollOffset + delta / p;
				this.scheduleStyleUpdate();
			};
			const onEnd = () => {
				toggleClass(this.element, "dv-scrollable-scrolling", false);
				doc.removeEventListener("pointermove", onPointerMove);
				doc.removeEventListener("pointerup", onEnd);
				doc.removeEventListener("pointercancel", onEnd);
			};
			doc.addEventListener("pointermove", onPointerMove);
			doc.addEventListener("pointerup", onEnd);
			doc.addEventListener("pointercancel", onEnd);
		}), addDisposableListener(this.element, "scroll", () => {
			this.scheduleStyleUpdate();
		}), addDisposableListener(this.scrollableElement, "scroll", () => {
			this._scrollOffset = this._orientation === "horizontal" ? this.scrollableElement.scrollLeft : this.scrollableElement.scrollTop;
			this.scheduleStyleUpdate();
		}), watchElementResize(this.element, () => {
			toggleClass(this.element, "dv-scrollable-resizing", true);
			if (this._animationTimer) clearTimeout(this._animationTimer);
			this._animationTimer = setTimeout(() => {
				clearTimeout(this._animationTimer);
				toggleClass(this.element, "dv-scrollable-resizing", false);
			}, 500);
			this.scheduleStyleUpdate();
		}), Disposable.from(() => {
			if (this._pendingStyleFrame !== void 0) {
				cancelAnimationFrame(this._pendingStyleFrame);
				this._pendingStyleFrame = void 0;
			}
			if (this._animationTimer !== void 0) {
				clearTimeout(this._animationTimer);
				this._animationTimer = void 0;
			}
		}));
	}
	/**
	* Coalesce the scrollbar restyle to one pass per animation frame. The
	* wheel / scroll / pointermove handlers can each fire many times per frame,
	* and `calculateScrollbarStyles` both reads layout (`clientWidth`/
	* `scrollWidth`) and writes styles + `scrollLeft`/`scrollTop`; running it
	* synchronously per event caused repeated read→write→read reflow. Batching
	* to a frame keeps a burst of events to a single measure+write.
	*/
	scheduleStyleUpdate() {
		if (this._pendingStyleFrame !== void 0) return;
		this._pendingStyleFrame = requestAnimationFrame(() => {
			this._pendingStyleFrame = void 0;
			this.calculateScrollbarStyles();
		});
	}
	calculateScrollbarStyles() {
		const clientSize = this._orientation === "horizontal" ? this.element.clientWidth : this.element.clientHeight;
		const scrollSize = this._orientation === "horizontal" ? this.scrollableElement.scrollWidth : this.scrollableElement.scrollHeight;
		if (scrollSize > clientSize) {
			const px = clientSize * (clientSize / scrollSize);
			if (this._orientation === "horizontal") {
				this._scrollbar.style.width = `${px}px`;
				this._scrollbar.style.height = "";
			} else {
				this._scrollbar.style.height = `${px}px`;
				this._scrollbar.style.width = "";
			}
			this._scrollOffset = clamp(this._scrollOffset, 0, scrollSize - clientSize);
			if (this._orientation === "horizontal") this.scrollableElement.scrollLeft = this._scrollOffset;
			else this.scrollableElement.scrollTop = this._scrollOffset;
			const percentageComplete = this._scrollOffset / (scrollSize - clientSize);
			if (this._orientation === "horizontal") {
				this._scrollbar.style.left = `${(clientSize - px) * percentageComplete}px`;
				this._scrollbar.style.top = "";
			} else {
				this._scrollbar.style.top = `${(clientSize - px) * percentageComplete}px`;
				this._scrollbar.style.left = "";
			}
		} else {
			if (this._orientation === "horizontal") {
				this._scrollbar.style.width = "0px";
				this._scrollbar.style.left = "0px";
			} else {
				this._scrollbar.style.height = "0px";
				this._scrollbar.style.top = "0px";
			}
			this._scrollOffset = 0;
		}
	}
};
Scrollbar.MouseWheelSpeed = 1;

//#endregion
//#region src/dockview/options.ts
/**
* The CSS class the `MultiRowTabsModule` toggles on a group's tab list
* (`.dv-tabs-container`) to switch it into wrap layout. Shared here so core
* (the reorder controller's wrap detection + the SCSS rules) and the module
* agree on the one string; renaming it in one place would otherwise silently
* break the seam across the package boundary.
*/
const OVERFLOW_WRAP_TABS_CLASS = "dv-tabs-container--wrap";
/**
* The CSS class the `MultiRowTabsModule` adds alongside
* {@link OVERFLOW_WRAP_TABS_CLASS} once `overflow.maxRows` is set. It clips the
* wrapped strip to `--dv-max-tab-rows` rows (the surplus rows spill to the
* dropdown) so the header stops growing at the cap. Shared here so core (SCSS)
* and the module agree on the one string.
*/
const OVERFLOW_WRAP_TABS_CAPPED_CLASS = "dv-tabs-container--wrap-capped";
/**
* The custom property the `MultiRowTabsModule` sets on a capped wrapped strip to
* carry the `overflow.maxRows` value into the SCSS `max-height` calc. Shared for
* the same reason as the class names above.
*/
const OVERFLOW_MAX_TAB_ROWS_VARIABLE = "--dv-max-tab-rows";
/**
* The custom property the `MultiRowTabsModule` sets on a wrapped vertical
* (edge-group) tab list to pin every wrapped tab to a single, uniform height:
* the tallest tab's natural height, measured live by the controller. A vertical
* tab's natural height tracks its (rotated) title length, so a column only fits
* a handful of tabs and tiny per-tab height differences flip how many fit,
* ragged-ing the wrapped grid into a staircase. Pinning one height makes every
* column hold the same count, so the columns line up as a clean grid (the mirror
* of the horizontal wrap, whose tabs share the fixed row height). Shared here so
* core (SCSS) and the module agree on the one string. Only meaningful in vertical
* wrap; a horizontal strip never sets it and the SCSS falls back to auto height.
*/
const OVERFLOW_WRAP_TABS_VERTICAL_TAB_HEIGHT_VARIABLE = "--dv-wrap-vertical-tab-height";
/** Whether `position` is enabled in a per-edge {@link EdgeGroupSet}. */
function isEdgeGroupEnabled(set, position) {
	if (typeof set === "boolean") return set;
	return !!(set === null || set === void 0 ? void 0 : set[position]);
}
/** Whether any edge is enabled in a per-edge {@link EdgeGroupSet}. */
function isAnyEdgeGroupEnabled(set) {
	if (typeof set === "boolean") return set;
	if (!set) return false;
	return Object.values(set).some(Boolean);
}
var DockviewUnhandledDragOverEvent = class extends AcceptableEvent {
	constructor(nativeEvent, target, position, getData, group) {
		super();
		this.nativeEvent = nativeEvent;
		this.target = target;
		this.position = position;
		this.getData = getData;
		this.group = group;
	}
};
const PROPERTY_KEYS_DOCKVIEW = (() => {
	return Object.keys({
		disableAutoResizing: void 0,
		proportionalLayout: void 0,
		hideBorders: void 0,
		singleTabMode: void 0,
		disableFloatingGroups: void 0,
		floatingGroupBounds: void 0,
		transformFloatingGroupDrag: void 0,
		smartGuides: void 0,
		floatingGroupDragHandle: void 0,
		popoutUrl: void 0,
		nonce: void 0,
		defaultRenderer: void 0,
		defaultHeaderPosition: void 0,
		debug: void 0,
		locked: void 0,
		disableDnd: void 0,
		dndStrategy: void 0,
		className: void 0,
		noPanelsOverlay: void 0,
		closeEmptyGroups: void 0,
		groupIdGenerator: void 0,
		dndEdges: void 0,
		dropPositionResolver: void 0,
		dndCompass: void 0,
		dropSizing: void 0,
		theme: void 0,
		disableTabsOverflowList: void 0,
		overflow: void 0,
		scrollbars: void 0,
		getTabContextMenuItems: void 0,
		getTabGroupChipContextMenuItems: void 0,
		createTabGroupChipComponent: void 0,
		createGroupDragGhostComponent: void 0,
		dropOverlayModel: void 0,
		announcements: void 0,
		getAnnouncement: void 0,
		announcer: void 0,
		messages: void 0,
		keyboardNavigation: void 0,
		layoutHistory: void 0,
		autoHideEdgeGroups: void 0,
		dockToEdgeGroups: void 0,
		edgeGroupPeek: void 0,
		tabGroupColors: void 0,
		tabGroupAccent: void 0,
		pinnedTabs: void 0
	});
})();
function isPanelOptionsWithPanel(data) {
	if (data.referencePanel) return true;
	return false;
}
function isPanelOptionsWithGroup(data) {
	if (data.referenceGroup) return true;
	return false;
}
function isGroupOptionsWithPanel(data) {
	if (data.referencePanel) return true;
	return false;
}
function isGroupOptionsWithGroup(data) {
	if (data.referenceGroup) return true;
	return false;
}

//#endregion
//#region src/dockview/tabGroupAccent.ts
const DEFAULT_TAB_GROUP_COLORS = [
	{
		id: "grey",
		value: "var(--dv-tab-group-color-grey)",
		label: "Grey"
	},
	{
		id: "blue",
		value: "var(--dv-tab-group-color-blue)",
		label: "Blue"
	},
	{
		id: "red",
		value: "var(--dv-tab-group-color-red)",
		label: "Red"
	},
	{
		id: "yellow",
		value: "var(--dv-tab-group-color-yellow)",
		label: "Yellow"
	},
	{
		id: "green",
		value: "var(--dv-tab-group-color-green)",
		label: "Green"
	},
	{
		id: "pink",
		value: "var(--dv-tab-group-color-pink)",
		label: "Pink"
	},
	{
		id: "purple",
		value: "var(--dv-tab-group-color-purple)",
		label: "Purple"
	},
	{
		id: "cyan",
		value: "var(--dv-tab-group-color-cyan)",
		label: "Cyan"
	},
	{
		id: "orange",
		value: "var(--dv-tab-group-color-orange)",
		label: "Orange"
	}
];
/**
* Runtime palette for tab-group color accents.
*
* Resolves a stored `color` string to a CSS color expression, with three
* fall-through modes:
*   1. `id` matches an entry → entry's `value`
*   2. `id` doesn't match → `id` itself (raw CSS literal pass-through)
*   3. `id` is empty or undefined → undefined (caller skips assignment)
*
* When `enabled` is false the palette returns undefined for everything; this
* is the `tabGroupAccent: 'off'` opt-out path.
*/
var TabGroupColorPalette = class {
	constructor(entries, enabled = true) {
		this._entries = entries.slice();
		this._byId = new Map(entries.map((e) => [e.id, e]));
		this._enabled = enabled;
	}
	get enabled() {
		return this._enabled;
	}
	set enabled(value) {
		this._enabled = value;
	}
	/**
	* Replace the entry list in place. Used by `updateOptions` so that
	* existing palette references (held by chips, indicators, etc.) see
	* the new palette without needing to be re-wired.
	*/
	setEntries(entries) {
		this._entries = entries.slice();
		this._byId = new Map(entries.map((e) => [e.id, e]));
	}
	entries() {
		return this._entries;
	}
	has(id) {
		return this._byId.has(id);
	}
	get(id) {
		return this._byId.get(id);
	}
	/** First entry's id; used as the default when a color is unset. */
	defaultId() {
		var _this$_entries$;
		return (_this$_entries$ = this._entries[0]) === null || _this$_entries$ === void 0 ? void 0 : _this$_entries$.id;
	}
	/**
	* Resolve a stored color to its CSS value, or undefined if no value
	* should be written (palette disabled, or color empty/undefined).
	*/
	resolveValue(color) {
		if (!this._enabled || !color) return;
		const entry = this._byId.get(color);
		return entry ? entry.value : color;
	}
};
let _fallbackPalette;
/**
* Lazy-built palette used when the accessor isn't available (test mocks,
* isolated chip construction). Production code paths always pass a real
* palette through.
*/
function getFallbackPalette() {
	var _fallbackPalette2;
	(_fallbackPalette2 = _fallbackPalette) !== null && _fallbackPalette2 !== void 0 || (_fallbackPalette = new TabGroupColorPalette(DEFAULT_TAB_GROUP_COLORS, true));
	return _fallbackPalette;
}
/**
* Set the `--dv-tab-group-color` custom property on `el` to the resolved
* accent value, or remove it when the palette is disabled / color is unset.
*/
function applyTabGroupAccent(el, color, palette) {
	const value = (palette !== null && palette !== void 0 ? palette : getFallbackPalette()).resolveValue(color);
	if (value === void 0) el.style.removeProperty("--dv-tab-group-color");
	else el.style.setProperty("--dv-tab-group-color", value);
}
/**
* Return the resolved CSS color for a tab group, or undefined when the
* palette is disabled or no color is set. Use this when you need the raw
* value to assign to a non-custom-property style (e.g. SVG stroke,
* backgroundColor on the indicator underline).
*/
function resolveTabGroupAccent(color, palette) {
	return (palette !== null && palette !== void 0 ? palette : getFallbackPalette()).resolveValue(color);
}

//#endregion
//#region src/dockview/components/titlebar/tabGroupChip.ts
/**
* Visual chip for a tab group. Owns the DOM element, label, click /
* context-menu interactions, and exposes a long-press gesture as a
* second `onContextMenu` source. Drag-and-drop wiring lives in
* `TabGroupManager`, which constructs the drag sources on this
* chip's element so it can include tabs-list context (custom group
* drag image, tab-group transfer payload).
*/
var TabGroupChip = class extends CompositeDisposable {
	get element() {
		return this._element;
	}
	constructor(_palette) {
		super();
		this._palette = _palette;
		this._onClick = new Emitter();
		this.onClick = this._onClick.event;
		this._onContextMenu = new Emitter();
		this.onContextMenu = this._onContextMenu.event;
		this._element = document.createElement("div");
		this._element.className = "dv-tab-group-chip";
		this._element.tabIndex = 0;
		this._label = document.createElement("span");
		this._label.className = "dv-tab-group-chip-label";
		this._element.appendChild(this._label);
		this.addDisposables(this._onClick, this._onContextMenu, new LongPressDetector(this._element, { onLongPress: (event) => {
			this._onContextMenu.fire(event);
		} }), addDisposableListener(this._element, "click", (event) => {
			this._onClick.fire(event);
		}), addDisposableListener(this._element, "contextmenu", (event) => {
			this._onContextMenu.fire(event);
		}));
	}
	init(params) {
		this._tabGroup = params.tabGroup;
		this.updateColor(params.tabGroup.color);
		this.updateLabel(params.tabGroup.label);
		this.updateCollapsed(params.tabGroup.collapsed);
		this.addDisposables(params.tabGroup.onDidChange(() => {
			if (this._tabGroup) {
				this.updateColor(this._tabGroup.color);
				this.updateLabel(this._tabGroup.label);
			}
		}), params.tabGroup.onDidCollapseChange((collapsed) => {
			this.updateCollapsed(collapsed);
		}), this._onClick.event(() => {
			var _this$_tabGroup;
			(_this$_tabGroup = this._tabGroup) === null || _this$_tabGroup === void 0 || _this$_tabGroup.toggle();
		}));
	}
	update(params) {
		this._tabGroup = params.tabGroup;
		this.updateColor(params.tabGroup.color);
		this.updateLabel(params.tabGroup.label);
		this.updateCollapsed(params.tabGroup.collapsed);
	}
	updateColor(color) {
		var _this$_palette;
		applyTabGroupAccent(this._element, color, this._palette);
		toggleClass(this._element, "dv-tab-group-chip--accent-off", ((_this$_palette = this._palette) === null || _this$_palette === void 0 ? void 0 : _this$_palette.enabled) === false);
	}
	updateLabel(label) {
		this._label.textContent = label;
		toggleClass(this._label, "dv-tab-group-chip-label--empty", !label);
	}
	updateCollapsed(collapsed) {
		toggleClass(this._element, "dv-tab-group-chip--collapsed", collapsed);
	}
};

//#endregion
//#region src/dockview/components/titlebar/tabGroupIndicator.ts
/**
* Class for the small accent pip drawn at the leading edge of each wrapped
* row a tab group spans beyond its first. Echoes the group chip so a
* multi-row group reads as one group on every row it occupies.
*/
const TAB_GROUP_CHIP_CONTINUATION_CLASS = "dv-tab-group-chip-continuation";
/** Diameter (px) of a continuation pip; mirrors the CSS size. */
const CONTINUATION_PIP_SIZE = 8;
/**
* Shared positioning logic for tab group indicators.
* Subclasses implement `applyShape` to control the visual output.
*/
var BaseTabGroupIndicator = class {
	get underlines() {
		return this._underlines;
	}
	constructor(_ctx) {
		this._ctx = _ctx;
		this._underlines = /* @__PURE__ */ new Map();
		this._continuationMarkers = /* @__PURE__ */ new Map();
		this._rafId = null;
	}
	positionUnderlines() {
		requestAnimationFrame(() => {
			this._positionUnderlinesSync();
		});
	}
	/**
	* Continuously reposition underlines every frame for the duration
	* of a tab transition (~200ms), so the underline tracks tab sizes.
	*/
	trackUnderlines() {
		if (this._rafId !== null) cancelAnimationFrame(this._rafId);
		const start = performance.now();
		const duration = 250;
		const tick = () => {
			this._positionUnderlinesSync();
			if (performance.now() - start < duration) this._rafId = requestAnimationFrame(tick);
			else this._rafId = null;
		};
		this._rafId = requestAnimationFrame(tick);
	}
	syncUnderlineElements(activeGroupIds) {
		for (const groupId of activeGroupIds) if (!this._underlines.has(groupId)) {
			const underline = document.createElement("div");
			underline.className = "dv-tab-group-underline";
			this._ctx.tabsList.appendChild(underline);
			this._underlines.set(groupId, underline);
		}
		for (const [groupId, el] of this._underlines) if (!activeGroupIds.has(groupId)) {
			el.remove();
			this._underlines.delete(groupId);
			this._clearContinuationMarkers(groupId);
		}
	}
	getUnderline(groupId) {
		return this._underlines.get(groupId);
	}
	dispose() {
		if (this._rafId !== null) {
			cancelAnimationFrame(this._rafId);
			this._rafId = null;
		}
		for (const [, el] of this._underlines) el.remove();
		this._underlines.clear();
		this._clearContinuationMarkers();
	}
	/**
	* Grow/shrink a group's continuation-marker pool to `count` pips,
	* creating/removing DOM nodes as needed, and return the pool.
	*/
	_syncContinuationMarkers(groupId, count) {
		let pool = this._continuationMarkers.get(groupId);
		if (!pool) {
			pool = [];
			this._continuationMarkers.set(groupId, pool);
		}
		while (pool.length < count) {
			const marker = document.createElement("div");
			marker.className = TAB_GROUP_CHIP_CONTINUATION_CLASS;
			this._ctx.tabsList.appendChild(marker);
			pool.push(marker);
		}
		while (pool.length > count) {
			const marker = pool.pop();
			marker === null || marker === void 0 || marker.remove();
		}
		return pool;
	}
	/**
	* Remove continuation markers for a single group, or (when `groupId`
	* is omitted) for every group. Used when a group dissolves, stops
	* wrapping, or the indicator is disposed.
	*/
	_clearContinuationMarkers(groupId) {
		if (groupId === void 0) {
			for (const [, pool] of this._continuationMarkers) for (const marker of pool) marker.remove();
			this._continuationMarkers.clear();
			return;
		}
		const pool = this._continuationMarkers.get(groupId);
		if (pool) {
			for (const marker of pool) marker.remove();
			this._continuationMarkers.delete(groupId);
		}
	}
	_positionUnderlinesSync() {
		const containerRect = this._ctx.tabsList.getBoundingClientRect();
		const tabGroups = this._ctx.getTabGroups();
		const isVertical = this._ctx.getDirection() === "vertical";
		const wrapped = this._ctx.tabsList.classList.contains(OVERFLOW_WRAP_TABS_CLASS);
		if (!wrapped) this._clearContinuationMarkers();
		const containerCrossSize = isVertical ? containerRect.width : containerRect.height;
		const activePanelId = this._ctx.getActivePanelId();
		const tabMap = this._ctx.getTabMap();
		for (const tg of tabGroups) {
			const underline = this._underlines.get(tg.id);
			if (!underline) continue;
			const panelIds = tg.panelIds;
			if (panelIds.length === 0) {
				underline.style.display = "none";
				continue;
			}
			underline.style.display = "";
			if (wrapped) {
				this._positionWrappedUnderline(underline, tg, containerRect, tabMap, isVertical);
				continue;
			}
			const chipEl = this._ctx.getChipElement(tg.id);
			let startEdge;
			if (chipEl) {
				const chipRect = chipEl.getBoundingClientRect();
				const chipStyle = getComputedStyle(chipEl);
				const leadingMargin = isVertical ? Number.parseFloat(chipStyle.marginTop) || 0 : Number.parseFloat(chipStyle.marginLeft) || 0;
				startEdge = isVertical ? chipRect.top - containerRect.top - leadingMargin : chipRect.left - containerRect.left - leadingMargin;
			} else {
				const firstPanelId = panelIds[0];
				const firstTabEntry = tabMap.get(firstPanelId);
				if (firstTabEntry) {
					const firstRect = firstTabEntry.value.element.getBoundingClientRect();
					startEdge = isVertical ? firstRect.top - containerRect.top : firstRect.left - containerRect.left;
				} else startEdge = 0;
			}
			const lastPanelId = panelIds[panelIds.length - 1];
			const lastTabEntry = tabMap.get(lastPanelId);
			if (!lastTabEntry) {
				if (isVertical) {
					underline.style.top = `${startEdge}px`;
					underline.style.height = "0px";
					underline.style.left = "";
					underline.style.width = "";
				} else {
					underline.style.left = `${startEdge}px`;
					underline.style.width = "0px";
					underline.style.top = "";
					underline.style.height = "";
				}
				continue;
			}
			const lastTabRect = lastTabEntry.value.element.getBoundingClientRect();
			let endEdge = isVertical ? lastTabRect.bottom - containerRect.top : lastTabRect.right - containerRect.left;
			let span = endEdge - startEdge;
			if ((tg.collapsed || tg.panelIds.some((pid) => {
				const te = tabMap.get(pid);
				return te === null || te === void 0 ? void 0 : te.value.element.classList.contains("dv-tab--group-expanding");
			})) && chipEl) {
				const chipRect = chipEl.getBoundingClientRect();
				const chipCenter = isVertical ? chipRect.top + chipRect.height / 2 - containerRect.top : chipRect.left + chipRect.width / 2 - containerRect.left;
				let currentTabSize = 0;
				let fullTabSize = 0;
				for (const pid of tg.panelIds) {
					const te = tabMap.get(pid);
					if (!te) continue;
					const el = te.value.element;
					if (isVertical) {
						currentTabSize += el.getBoundingClientRect().height;
						fullTabSize += el.scrollHeight;
					} else {
						currentTabSize += el.getBoundingClientRect().width;
						fullTabSize += el.scrollWidth;
					}
				}
				const progress = fullTabSize > 0 ? Math.min(1, currentTabSize / fullTabSize) : 0;
				startEdge = chipCenter + (startEdge - chipCenter) * progress;
				endEdge = chipCenter + (endEdge - chipCenter) * progress;
				span = Math.max(0, endEdge - startEdge);
			}
			if (isVertical) {
				underline.style.top = `${startEdge}px`;
				underline.style.height = `${Math.max(0, span)}px`;
				underline.style.left = "";
				underline.style.width = "";
				underline.style.bottom = "";
			} else {
				underline.style.left = `${startEdge}px`;
				underline.style.width = `${Math.max(0, span)}px`;
				underline.style.top = "";
				underline.style.height = "";
				underline.style.bottom = "";
			}
			this.applyShape(underline, tg, startEdge, span, containerCrossSize, activePanelId, containerRect, isVertical);
		}
	}
	/**
	* Position a group's underline across a multi-line (wrapped) tab strip. The
	* single-bar model can't span lines, so the element is sized to cover the
	* group's line span and an SVG draws one straight segment per line-run of
	* the group's tabs: a horizontal segment per row (horizontal header) or a
	* vertical segment per column (vertical header). Tabs are bucketed into
	* runs by their cross-axis offset: `top` for rows, `left` for columns.
	* (The active-tab wrap-around bump is omitted in wrap; the per-line lines
	* still convey membership.)
	*/
	_positionWrappedUnderline(underline, tg, containerRect, tabMap, isVertical) {
		const t = 2;
		const color = resolveTabGroupAccent(tg.color, this._ctx.getColorPalette());
		if (color === void 0) {
			underline.style.display = "none";
			this._clearContinuationMarkers(tg.id);
			return;
		}
		const { runs, firstRun } = this._computeWrappedRuns(tg, containerRect, tabMap, isVertical);
		if (runs.length === 0) {
			underline.style.display = "none";
			this._clearContinuationMarkers(tg.id);
			return;
		}
		this._positionContinuationMarkers(tg.id, runs, firstRun, color, isVertical);
		const minLeft = Math.min(...runs.map((r) => r.left));
		const maxRight = Math.max(...runs.map((r) => r.right));
		const minTop = Math.min(...runs.map((r) => r.top));
		const maxBottom = Math.max(...runs.map((r) => r.bottom));
		const width = isVertical ? Math.max(0, maxRight - minLeft) : containerRect.width;
		const height = isVertical ? containerRect.height : Math.max(0, maxBottom - minTop);
		underline.style.left = isVertical ? `${minLeft}px` : "0px";
		underline.style.top = isVertical ? "0px" : `${minTop}px`;
		underline.style.bottom = "auto";
		underline.style.width = `${width}px`;
		underline.style.height = `${height}px`;
		underline.style.backgroundColor = "";
		const { svg, path } = this.ensureSvgPath(underline);
		svg.setAttribute("width", String(width));
		svg.setAttribute("height", String(height));
		path.setAttribute("stroke", color);
		path.setAttribute("stroke-width", String(t));
		const headerPosition = this._ctx.getHeaderPosition();
		const inverted = isVertical ? headerPosition === "right" : headerPosition === "bottom";
		path.setAttribute("d", this._wrappedPathData(runs, isVertical, inverted, minLeft, minTop, t));
	}
	/**
	* Bucket a group's visible tabs into line-runs by their cross-axis offset
	* (rows by `top`, columns by `left`), with a 2px sub-pixel tolerance.
	* `firstRun` is the run holding the group's first tab (the chip's line),
	* tracked by reference so it is correct regardless of axis or header side (a
	* `vertical-rl` first column is right-most, not left-most).
	*/
	_computeWrappedRuns(tg, containerRect, tabMap, isVertical) {
		const runs = [];
		let firstRun;
		for (const pid of tg.panelIds) {
			var _firstRun;
			const te = tabMap.get(pid);
			if (!te) continue;
			const r = te.value.element.getBoundingClientRect();
			if (r.width === 0 && r.height === 0) continue;
			const top = r.top - containerRect.top;
			const bottom = r.bottom - containerRect.top;
			const left = r.left - containerRect.left;
			const right = r.right - containerRect.left;
			const key = isVertical ? left : top;
			let run = runs.find((x) => Math.abs((isVertical ? x.left : x.top) - key) <= 2);
			if (run) {
				run.top = Math.min(run.top, top);
				run.bottom = Math.max(run.bottom, bottom);
				run.left = Math.min(run.left, left);
				run.right = Math.max(run.right, right);
			} else {
				run = {
					top,
					bottom,
					left,
					right
				};
				runs.push(run);
			}
			(_firstRun = firstRun) !== null && _firstRun !== void 0 || (firstRun = run);
		}
		return {
			runs,
			firstRun
		};
	}
	/**
	* Build the SVG `path` data for a group's per-line underline segments: a
	* horizontal segment along each row's edge (`svg-y` offset by `minTop`) or a
	* vertical segment down each column's leading edge (`svg-x` offset by
	* `minLeft`). `inverted` moves the line to the header-facing edge.
	*/
	_wrappedPathData(runs, isVertical, inverted, minLeft, minTop, t) {
		let d = "";
		for (const run of runs) if (isVertical) {
			const x = inverted ? run.right - minLeft - t / 2 : run.left - minLeft + t / 2;
			d += `M ${x},${run.top} L ${x},${run.bottom} `;
		} else {
			const y = inverted ? run.top - minTop + t / 2 : run.bottom - minTop - t / 2;
			d += `M ${run.left},${y} L ${run.right},${y} `;
		}
		return d.trim();
	}
	/**
	* Draw a small accent pip at the leading edge of every wrapped line-run a
	* group spans beyond its first. The group's real chip already marks the
	* first run; these lightweight markers echo it on the continuation runs so
	* a group that wraps onto rows/columns 2–3 reads as one group on each line
	* instead of losing its colour after the first.
	*
	* `runs` are the group's line-runs (container-relative geometry) as
	* bucketed by {@link _positionWrappedUnderline}; `firstRun` is the run that
	* holds the chip and is skipped. The pip sits at each continuation run's
	* main-axis start (top of a column, left of a row), centred on the cross
	* axis.
	*/
	_positionContinuationMarkers(groupId, runs, firstRun, color, isVertical) {
		const continuationRuns = runs.filter((run) => run !== firstRun);
		const markers = this._syncContinuationMarkers(groupId, continuationRuns.length);
		continuationRuns.forEach((run, i) => {
			const marker = markers[i];
			marker.style.backgroundColor = color;
			if (isVertical) {
				const center = (run.left + run.right) / 2;
				marker.style.left = `${center - CONTINUATION_PIP_SIZE / 2}px`;
				marker.style.top = `${run.top}px`;
			} else {
				const center = (run.top + run.bottom) / 2;
				marker.style.left = `${run.left}px`;
				marker.style.top = `${center - CONTINUATION_PIP_SIZE / 2}px`;
			}
		});
	}
	/**
	* Ensure the underline element holds a single reusable `<svg><path/></svg>`
	* (created once, reused across frames) and return them.
	*/
	ensureSvgPath(underline) {
		const existing = underline.firstElementChild;
		if ((existing === null || existing === void 0 ? void 0 : existing.tagName) === "svg") return {
			svg: existing,
			path: existing.firstElementChild
		};
		underline.replaceChildren();
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.style.display = "block";
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("fill", "none");
		svg.appendChild(path);
		underline.appendChild(svg);
		return {
			svg,
			path
		};
	}
};
/**
* Chrome-style wrap-around indicator using SVG paths.
*/
var WrapTabGroupIndicator = class extends BaseTabGroupIndicator {
	_applyStraightLine(svg, path, underline, mainSize, crossSize, near, isVertical) {
		const svgW = isVertical ? crossSize : mainSize;
		const svgH = isVertical ? mainSize : crossSize;
		svg.setAttribute("width", String(svgW));
		svg.setAttribute("height", String(svgH));
		underline.style.width = `${svgW}px`;
		underline.style.height = `${svgH}px`;
		path.setAttribute("d", isVertical ? `M ${near},0 L ${near},${mainSize}` : `M 0,${near} L ${mainSize},${near}`);
	}
	/**
	* Chrome-style wrap-around underline: a stroked SVG path that runs
	* along the bottom (or left edge in vertical mode), curving up and
	* over the active tab with rounded corners.
	*
	* The SVG and path elements are created once per underline and reused;
	* only the `d`, `stroke`, and viewport attributes are updated each frame.
	*/
	applyShape(underline, tg, groupStart, groupSpan, containerCrossSize, activePanelId, containerRect, isVertical) {
		const t = 2;
		const crossSize = containerCrossSize;
		const mainSize = groupSpan;
		const color = resolveTabGroupAccent(tg.color, this._ctx.getColorPalette());
		if (mainSize <= 0 || crossSize <= 0 || color === void 0) {
			underline.style.display = "none";
			return;
		}
		underline.style.display = "";
		let activeTabEntry;
		if (activePanelId && tg.panelIds.includes(activePanelId)) activeTabEntry = this._ctx.getTabMap().get(activePanelId);
		const { svg, path } = this.ensureSvgPath(underline);
		path.setAttribute("stroke", color);
		path.setAttribute("stroke-width", String(t));
		const inset = t;
		const headerPosition = this._ctx.getHeaderPosition();
		const isBottomHeader = !isVertical && headerPosition === "bottom";
		const isRightHeader = isVertical && headerPosition === "right";
		let near;
		let far;
		if (isVertical) {
			near = isRightHeader ? crossSize - inset : inset;
			far = isRightHeader ? inset : crossSize - inset;
		} else {
			near = isBottomHeader ? inset : crossSize - inset;
			far = isBottomHeader ? crossSize - inset : inset;
		}
		if (!activeTabEntry) {
			this._applyStraightLine(svg, path, underline, mainSize, crossSize, near, isVertical);
			return;
		}
		const activeRect = activeTabEntry.value.element.getBoundingClientRect();
		let aStart;
		let aEnd;
		if (isVertical) {
			aStart = Math.max(0, activeRect.top - containerRect.top - groupStart);
			aEnd = Math.min(mainSize, activeRect.bottom - containerRect.top - groupStart);
		} else {
			aStart = Math.max(0, activeRect.left - containerRect.left - groupStart);
			aEnd = Math.min(mainSize, activeRect.right - containerRect.left - groupStart);
		}
		if (aEnd <= aStart) {
			this._applyStraightLine(svg, path, underline, mainSize, crossSize, near, isVertical);
			return;
		}
		const r = 6;
		const cd = far > near ? 1 : -1;
		if (isVertical) {
			const svgW = crossSize;
			const svgH = mainSize;
			svg.setAttribute("width", String(svgW));
			svg.setAttribute("height", String(svgH));
			underline.style.width = `${svgW}px`;
			underline.style.height = `${svgH}px`;
			const d = [
				`M ${near},0`,
				`L ${near},${aStart - r}`,
				`Q ${near},${aStart} ${near + cd * r},${aStart}`,
				`L ${far - cd * r},${aStart}`,
				`Q ${far},${aStart} ${far},${aStart + r}`,
				`L ${far},${aEnd - r}`,
				`Q ${far},${aEnd} ${far - cd * r},${aEnd}`,
				`L ${near + cd * r},${aEnd}`,
				`Q ${near},${aEnd} ${near},${aEnd + r}`,
				`L ${near},${svgH}`
			].join(" ");
			path.setAttribute("d", d);
		} else {
			const svgW = mainSize;
			const svgH = crossSize;
			svg.setAttribute("width", String(svgW));
			svg.setAttribute("height", String(svgH));
			underline.style.width = `${svgW}px`;
			underline.style.height = `${svgH}px`;
			const d = [
				`M 0,${near}`,
				`L ${aStart - r},${near}`,
				`Q ${aStart},${near} ${aStart},${near + cd * r}`,
				`L ${aStart},${far - cd * r}`,
				`Q ${aStart},${far} ${aStart + r},${far}`,
				`L ${aEnd - r},${far}`,
				`Q ${aEnd},${far} ${aEnd},${far - cd * r}`,
				`L ${aEnd},${near + cd * r}`,
				`Q ${aEnd},${near} ${aEnd + r},${near}`,
				`L ${svgW},${near}`
			].join(" ");
			path.setAttribute("d", d);
		}
	}
};
/**
* Flat continuous bar indicator: a plain colored line spanning the full tab
* group width, with no wrap-around.
*/
var NoneTabGroupIndicator = class extends BaseTabGroupIndicator {
	applyShape(underline, tg, _startEdge, span, _containerCrossSize, _activePanelId, _containerRect, isVertical) {
		const t = 2;
		const color = resolveTabGroupAccent(tg.color, this._ctx.getColorPalette());
		if (span <= 0 || color === void 0) {
			underline.style.display = "none";
			return;
		}
		underline.style.display = "";
		if (underline.firstElementChild) underline.replaceChildren();
		underline.style.backgroundColor = color;
		if (isVertical) {
			underline.style.width = `${t}px`;
			underline.style.height = `${span}px`;
		} else {
			underline.style.width = `${span}px`;
			underline.style.height = `${t}px`;
		}
	}
};

//#endregion
//#region src/dockview/components/titlebar/tabGroups.ts
const EMPTY_MAP = /* @__PURE__ */ new Map();
var TabGroupManager = class {
	get chipRenderers() {
		return this._chipRenderers;
	}
	get groupUnderlines() {
		var _this$_indicator$unde, _this$_indicator;
		return (_this$_indicator$unde = (_this$_indicator = this._indicator) === null || _this$_indicator === void 0 ? void 0 : _this$_indicator.underlines) !== null && _this$_indicator$unde !== void 0 ? _this$_indicator$unde : EMPTY_MAP;
	}
	get skipNextCollapseAnimation() {
		return this._skipNextCollapseAnimation;
	}
	set skipNextCollapseAnimation(value) {
		this._skipNextCollapseAnimation = value;
	}
	constructor(_ctx, _callbacks) {
		this._ctx = _ctx;
		this._callbacks = _callbacks;
		this._chipRenderers = /* @__PURE__ */ new Map();
		this._indicator = null;
		this._skipNextCollapseAnimation = false;
		this._pendingTransitionCleanups = /* @__PURE__ */ new Map();
	}
	/**
	* Synchronize chip elements and CSS classes for all tab groups
	* in the parent group model. Call after any tab group mutation.
	*/
	update() {
		const tabGroups = this._ctx.group.model.getTabGroups();
		const activeGroupIds = /* @__PURE__ */ new Set();
		for (const tabGroup of tabGroups) {
			activeGroupIds.add(tabGroup.id);
			this._ensureChipForGroup(tabGroup);
			this._positionChipForGroup(tabGroup);
		}
		for (const [groupId, entry] of this._chipRenderers) if (!activeGroupIds.has(groupId)) {
			var _entry$dragSourcesDis;
			entry.chip.element.remove();
			entry.chip.dispose();
			(_entry$dragSourcesDis = entry.dragSourcesDisposable) === null || _entry$dragSourcesDis === void 0 || _entry$dragSourcesDis.dispose();
			entry.disposable.dispose();
			this._chipRenderers.delete(groupId);
		}
		this._updateTabGroupClasses();
	}
	/**
	* Re-read the active palette and re-apply colors to chips, tabs and
	* the indicator. Called when `tabGroupColors` / `tabGroupAccent`
	* options change at runtime.
	*/
	refreshAccents() {
		for (const tabGroup of this._ctx.group.model.getTabGroups()) {
			var _entry$chip, _entry$chip$update;
			const entry = this._chipRenderers.get(tabGroup.id);
			entry === null || entry === void 0 || (_entry$chip$update = (_entry$chip = entry.chip).update) === null || _entry$chip$update === void 0 || _entry$chip$update.call(_entry$chip, { tabGroup });
		}
		this._updateTabGroupClasses();
	}
	positionAllChips() {
		if (this._chipRenderers.size === 0) return;
		for (const tabGroup of this._ctx.group.model.getTabGroups()) this._positionChipForGroup(tabGroup);
	}
	updateDirection() {
		const isVertical = this._ctx.getDirection() === "vertical";
		for (const [, entry] of this._chipRenderers) {
			const zones = isVertical ? ["top"] : ["left"];
			entry.dropTarget.setTargetZones(zones);
			entry.pointerDropTarget.setTargetZones(zones);
		}
	}
	/**
	* Drop any overlay the chips are showing. A group move is committed by a
	* capturing listener on the tabs list that stops the event, so the chip
	* target under the cursor never sees the drop that would clear its own.
	*/
	clearChipDropOverlays() {
		for (const [, entry] of this._chipRenderers) {
			var _entry$dropTarget, _entry$pointerDropTar;
			(_entry$dropTarget = entry.dropTarget) === null || _entry$dropTarget === void 0 || _entry$dropTarget.clearOverlay();
			(_entry$pointerDropTar = entry.pointerDropTarget) === null || _entry$pointerDropTar === void 0 || _entry$pointerDropTar.clearOverlay();
		}
	}
	/** Each chip's extent along the strip's main axis: width for a horizontal
	*  header, height for a vertical one. */
	snapshotChipSizes() {
		const isVertical = this._ctx.getDirection() === "vertical";
		const sizes = /* @__PURE__ */ new Map();
		for (const [groupId, entry] of this._chipRenderers) {
			const rect = entry.chip.element.getBoundingClientRect();
			sizes.set(groupId, isVertical ? rect.height : rect.width);
		}
		return sizes;
	}
	positionUnderlines() {
		var _this$_indicator2;
		(_this$_indicator2 = this._indicator) === null || _this$_indicator2 === void 0 || _this$_indicator2.positionUnderlines();
	}
	trackUnderlines() {
		var _this$_indicator3;
		(_this$_indicator3 = this._indicator) === null || _this$_indicator3 === void 0 || _this$_indicator3.trackUnderlines();
	}
	setGroupDragImage(event, tabGroup, chipEl) {
		if (!event.dataTransfer) return;
		const isVertical = this._ctx.getDirection() === "vertical";
		const clone = this._ctx.tabsList.cloneNode(true);
		if (isVertical) {
			clone.classList.remove("dv-tabs-container-vertical", "dv-vertical");
			clone.classList.add("dv-horizontal");
			clone.style.writingMode = "horizontal-tb";
			clone.style.height = `${this._ctx.tabsList.offsetWidth}px`;
		} else clone.style.height = `${this._ctx.tabsList.offsetHeight}px`;
		clone.style.width = "auto";
		clone.style.overflow = "visible";
		clone.style.pointerEvents = "none";
		const children = Array.from(clone.children);
		const realChildren = Array.from(this._ctx.tabsList.children);
		for (let i = children.length - 1; i >= 0; i--) {
			if (realChildren[i] === chipEl) continue;
			children[i].remove();
		}
		const wrapper = document.createElement("div");
		wrapper.className = "dv-groupview dv-active-group";
		wrapper.style.position = "fixed";
		wrapper.style.top = "-10000px";
		wrapper.style.left = "0px";
		wrapper.style.height = "auto";
		wrapper.style.width = "auto";
		wrapper.style.pointerEvents = "none";
		const actionsWrapper = document.createElement("div");
		actionsWrapper.className = "dv-tabs-and-actions-container";
		actionsWrapper.style.height = "auto";
		actionsWrapper.style.width = "auto";
		wrapper.appendChild(actionsWrapper);
		actionsWrapper.appendChild(clone);
		this._ctx.accessor.element.appendChild(wrapper);
		const clonedChip = clone.querySelector(".dv-tab-group-chip");
		const chipRect = chipEl.getBoundingClientRect();
		const cursorInChipX = event.clientX - chipRect.left;
		const cursorInChipY = event.clientY - chipRect.top;
		if (clonedChip) {
			const clonedChipRect = clonedChip.getBoundingClientRect();
			const wrapperRect = wrapper.getBoundingClientRect();
			const offsetX = clonedChipRect.left - wrapperRect.left + cursorInChipX;
			const offsetY = clonedChipRect.top - wrapperRect.top + cursorInChipY;
			event.dataTransfer.setDragImage(wrapper, offsetX, offsetY);
		} else event.dataTransfer.setDragImage(wrapper, cursorInChipX, cursorInChipY);
		requestAnimationFrame(() => {
			wrapper.remove();
		});
	}
	cleanupTransition(panelId) {
		var _this$_pendingTransit;
		(_this$_pendingTransit = this._pendingTransitionCleanups.get(panelId)) === null || _this$_pendingTransit === void 0 || _this$_pendingTransit();
		this._pendingTransitionCleanups.delete(panelId);
	}
	updateDragAndDropState() {
		const caps = resolveDndCapabilities(this._ctx.accessor.options);
		for (const entry of this._chipRenderers.values()) {
			var _entry$html5DragSourc, _entry$pointerDragSou, _entry$pointerDragSou2;
			entry.chip.element.draggable = caps.html5;
			(_entry$html5DragSourc = entry.html5DragSource) === null || _entry$html5DragSourc === void 0 || _entry$html5DragSourc.setDisabled(!caps.html5);
			(_entry$pointerDragSou = entry.pointerDragSource) === null || _entry$pointerDragSou === void 0 || _entry$pointerDragSou.setDisabled(!caps.pointer);
			(_entry$pointerDragSou2 = entry.pointerDragSource) === null || _entry$pointerDragSou2 === void 0 || _entry$pointerDragSou2.setTouchOnly(!caps.pointerHandlesMouse);
		}
	}
	/**
	* Synchronously dispose the chip drag sources for an in-flight chip
	* drag. Called from `_commitGroupMove` so the transfer payload +
	* iframe shield are released before the cross-group move detaches
	* the chip (chip dispose is scheduled on a microtask via
	* `_scheduleTabGroupUpdate`, which is too late for callers that read
	* `getPanelData()` synchronously after the move).
	*
	* A cross-group move dissolves the source chip entirely, but a
	* within-group reorder keeps the same chip element — so the sources are
	* cleared to `undefined` here and the subsequent `update()` re-arms them
	* via `_ensureChipForGroup`. Without that re-arm the chip would fire a
	* native `dragstart` (the element keeps `draggable=true`) but never set
	* a transfer payload, leaving the group permanently undraggable after
	* its first move. (#1410)
	*/
	disposeChipDrag(tabGroupId) {
		var _entry$dragSourcesDis2;
		const entry = this._chipRenderers.get(tabGroupId);
		if (!entry) return;
		(_entry$dragSourcesDis2 = entry.dragSourcesDisposable) === null || _entry$dragSourcesDis2 === void 0 || _entry$dragSourcesDis2.dispose();
		entry.html5DragSource = void 0;
		entry.pointerDragSource = void 0;
		entry.dragSourcesDisposable = void 0;
	}
	/** Cloned chip rect used as the pointer follow-finger ghost. */
	_buildChipGhostElement(chipEl) {
		const style = getComputedStyle(chipEl);
		const clone = chipEl.cloneNode(true);
		Array.from(style).forEach((key) => {
			clone.style.setProperty(key, style.getPropertyValue(key), style.getPropertyPriority(key));
		});
		clone.style.position = "absolute";
		return clone;
	}
	disposeAll() {
		var _this$_indicator4;
		(_this$_indicator4 = this._indicator) === null || _this$_indicator4 === void 0 || _this$_indicator4.dispose();
		this._indicator = null;
		for (const [, cleanup] of this._pendingTransitionCleanups) cleanup();
		this._pendingTransitionCleanups.clear();
		for (const [, entry] of this._chipRenderers) {
			var _entry$dragSourcesDis3;
			entry.chip.element.remove();
			entry.chip.dispose();
			(_entry$dragSourcesDis3 = entry.dragSourcesDisposable) === null || _entry$dragSourcesDis3 === void 0 || _entry$dragSourcesDis3.dispose();
			entry.disposable.dispose();
		}
		this._chipRenderers.clear();
	}
	_ensureIndicator() {
		var _this$_ctx$accessor$o, _this$_ctx$accessor$o2, _this$_indicator5;
		const Ctor = ((_this$_ctx$accessor$o = (_this$_ctx$accessor$o2 = this._ctx.accessor.options.theme) === null || _this$_ctx$accessor$o2 === void 0 ? void 0 : _this$_ctx$accessor$o2.tabGroupIndicator) !== null && _this$_ctx$accessor$o !== void 0 ? _this$_ctx$accessor$o : "wrap") === "none" ? NoneTabGroupIndicator : WrapTabGroupIndicator;
		if (this._indicator && !(this._indicator instanceof Ctor)) {
			this._indicator.dispose();
			this._indicator = null;
		}
		(_this$_indicator5 = this._indicator) !== null && _this$_indicator5 !== void 0 || (this._indicator = new Ctor({
			tabsList: this._ctx.tabsList,
			getTabGroups: () => this._ctx.group.model.getTabGroups(),
			getActivePanelId: () => {
				var _this$_ctx$group$acti;
				return (_this$_ctx$group$acti = this._ctx.group.activePanel) === null || _this$_ctx$group$acti === void 0 ? void 0 : _this$_ctx$group$acti.id;
			},
			getTabMap: () => this._ctx.getTabMap(),
			getChipElement: (id) => {
				var _this$_chipRenderers$;
				return (_this$_chipRenderers$ = this._chipRenderers.get(id)) === null || _this$_chipRenderers$ === void 0 ? void 0 : _this$_chipRenderers$.chip.element;
			},
			getDirection: () => this._ctx.getDirection(),
			getHeaderPosition: () => this._ctx.group.model.headerPosition,
			getColorPalette: () => this._ctx.accessor.tabGroupColorPalette
		}));
	}
	/**
	* Create the HTML5 + pointer drag sources for a chip (and the direct
	* dragend listener that clears the transfer synchronously). Extracted so
	* both the initial chip build and the post-move re-arm in
	* `_ensureChipForGroup` share one wiring path. (#1410)
	*/
	_createChipDragSources(chip, tabGroup) {
		const caps = resolveDndCapabilities(this._ctx.accessor.options);
		chip.element.draggable = caps.html5;
		const panelTransfer = LocalSelectionTransfer.getInstance();
		const getData = () => {
			panelTransfer.setData([new PanelTransfer(this._ctx.accessor.id, this._ctx.group.id, null, tabGroup.id)], PanelTransfer.prototype);
			return { dispose: () => {
				panelTransfer.clearData(PanelTransfer.prototype);
			} };
		};
		const html5DragSource = html5Backend.createDragSource(chip.element, {
			getData,
			disabled: !caps.html5,
			isCancelled: () => !resolveDndCapabilities(this._ctx.accessor.options).html5,
			onDragStart: (event) => {
				if ("dataTransfer" in event && event.dataTransfer) this.setGroupDragImage(event, tabGroup, chip.element);
				this._callbacks.onChipDragStart(tabGroup, chip, event);
			},
			onDragEnd: (event) => {
				var _this$_callbacks$onCh, _this$_callbacks;
				(_this$_callbacks$onCh = (_this$_callbacks = this._callbacks).onChipDragEnd) === null || _this$_callbacks$onCh === void 0 || _this$_callbacks$onCh.call(_this$_callbacks, tabGroup, chip, event);
			}
		});
		const onDragEndClear = () => {
			panelTransfer.clearData(PanelTransfer.prototype);
		};
		chip.element.addEventListener("dragend", onDragEndClear, { once: true });
		const pointerDragSource = pointerBackend.createDragSource(chip.element, {
			getData,
			disabled: !caps.pointer,
			touchOnly: !caps.pointerHandlesMouse,
			isCancelled: () => !resolveDndCapabilities(this._ctx.accessor.options).pointer,
			createGhost: () => ({
				element: this._buildChipGhostElement(chip.element),
				offsetX: 8,
				offsetY: 8
			}),
			onDragStart: (event) => {
				this._callbacks.onChipDragStart(tabGroup, chip, event);
			}
		});
		return {
			html5DragSource,
			pointerDragSource,
			disposable: { dispose: () => {
				html5DragSource.dispose();
				pointerDragSource.dispose();
				chip.element.removeEventListener("dragend", onDragEndClear);
			} }
		};
	}
	_ensureChipForGroup(tabGroup) {
		const existing = this._chipRenderers.get(tabGroup.id);
		if (existing) {
			if (!existing.html5DragSource) {
				const sources = this._createChipDragSources(existing.chip, tabGroup);
				existing.html5DragSource = sources.html5DragSource;
				existing.pointerDragSource = sources.pointerDragSource;
				existing.dragSourcesDisposable = sources.disposable;
			}
			return;
		}
		const createChip = this._ctx.accessor.options.createTabGroupChipComponent;
		const chip = createChip ? createChip(tabGroup) : new TabGroupChip(this._ctx.accessor.tabGroupColorPalette);
		chip.init({
			tabGroup,
			api: this._ctx.accessor.api
		});
		const dragSources = this._createChipDragSources(chip, tabGroup);
		const disposables = [
			tabGroup.onDidChange(() => {
				var _chip$update;
				(_chip$update = chip.update) === null || _chip$update === void 0 || _chip$update.call(chip, { tabGroup });
				this._updateTabGroupClasses();
			}),
			tabGroup.onDidPanelChange(() => {
				this._positionChipForGroup(tabGroup);
				this._updateTabGroupClasses();
			}),
			tabGroup.onDidCollapseChange(() => {
				this._updateTabGroupClasses();
			})
		];
		const onContextMenu = (event) => {
			var _this$_chipRenderers$2;
			(_this$_chipRenderers$2 = this._chipRenderers.get(tabGroup.id)) === null || _this$_chipRenderers$2 === void 0 || (_this$_chipRenderers$2 = _this$_chipRenderers$2.pointerDragSource) === null || _this$_chipRenderers$2 === void 0 || _this$_chipRenderers$2.cancelPending();
			this._callbacks.onChipContextMenu(tabGroup, event);
		};
		if (chip instanceof TabGroupChip) disposables.push(chip.onContextMenu(onContextMenu));
		else disposables.push(new LongPressDetector(chip.element, { onLongPress: onContextMenu }), addDisposableListener(chip.element, "contextmenu", onContextMenu));
		const dropTargetOptions = {
			acceptedTargetZones: this._ctx.getDirection() === "vertical" ? ["top"] : ["left"],
			overlayModel: { activationSize: {
				value: 100,
				type: "percentage"
			} },
			canDisplayOverlay: (event, position) => {
				if (this._ctx.group.locked) return false;
				if (this._ctx.accessor.options.disableDnd) return false;
				const data = getPanelData();
				if (this._ctx.accessor.id === (data === null || data === void 0 ? void 0 : data.viewId)) {
					var _this$_ctx$accessor$o3;
					if (((_this$_ctx$accessor$o3 = this._ctx.accessor.options.theme) === null || _this$_ctx$accessor$o3 === void 0 ? void 0 : _this$_ctx$accessor$o3.tabAnimation) === "smooth" && !data.tabGroupId) return false;
					return true;
				}
				return this._ctx.group.model.canDisplayOverlay(event, position, "tab");
			}
		};
		const dropTarget = html5Backend.createDropTarget(chip.element, dropTargetOptions);
		const pointerDropTarget = pointerBackend.createDropTarget(chip.element, dropTargetOptions);
		const onDrop = (event) => {
			this._callbacks.onChipDrop(tabGroup, event);
		};
		disposables.push(dropTarget, dropTarget.onDrop(onDrop), pointerDropTarget, pointerDropTarget.onDrop(onDrop));
		const disposable = new CompositeDisposable(...disposables);
		this._chipRenderers.set(tabGroup.id, {
			chip,
			html5DragSource: dragSources.html5DragSource,
			pointerDragSource: dragSources.pointerDragSource,
			dragSourcesDisposable: dragSources.disposable,
			disposable,
			dropTarget,
			pointerDropTarget
		});
		if (tabGroup.collapsed) this._skipNextCollapseAnimation = true;
	}
	_positionChipForGroup(tabGroup) {
		const entry = this._chipRenderers.get(tabGroup.id);
		if (!entry) return;
		const chipEl = entry.chip.element;
		const panelIds = tabGroup.panelIds;
		if (panelIds.length === 0) {
			chipEl.remove();
			return;
		}
		const firstPanelId = panelIds[0];
		const firstTabEntry = this._ctx.getTabMap().get(firstPanelId);
		if (!firstTabEntry) {
			chipEl.remove();
			return;
		}
		const firstTabEl = firstTabEntry.value.element;
		if (chipEl.nextSibling !== firstTabEl) this._ctx.tabsList.insertBefore(chipEl, firstTabEl);
	}
	_updateTabGroupClasses() {
		const tabGroups = this._ctx.group.model.getTabGroups();
		const tabs = this._ctx.getTabs();
		const tabMap = this._ctx.getTabMap();
		let hasAnimation = false;
		const panelGroupMap = /* @__PURE__ */ new Map();
		for (const tg of tabGroups) for (const pid of tg.panelIds) panelGroupMap.set(pid, tg);
		for (const tabEntry of tabs) {
			const tab = tabEntry.value;
			const panelId = tab.panel.id;
			const tg = panelGroupMap.get(panelId);
			const isGrouped = !!tg;
			toggleClass(tab.element, "dv-tab--grouped", isGrouped);
			if (tg) {
				const ids = tg.panelIds;
				const isFirst = ids[0] === panelId;
				const isLast = ids[ids.length - 1] === panelId;
				toggleClass(tab.element, "dv-tab--group-first", isFirst);
				toggleClass(tab.element, "dv-tab--group-last", isLast);
				applyTabGroupAccent(tab.element, tg.color, this._ctx.accessor.tabGroupColorPalette);
				const isCollapsed = tab.element.classList.contains("dv-tab--group-collapsed");
				if (!tg.collapsed && isCollapsed) {
					var _this$_pendingTransit2;
					hasAnimation = true;
					tab.element.classList.remove("dv-tab--group-collapsed");
					tab.element.classList.add("dv-tab--group-expanding");
					(_this$_pendingTransit2 = this._pendingTransitionCleanups.get(panelId)) === null || _this$_pendingTransit2 === void 0 || _this$_pendingTransit2();
					const onEnd = () => {
						tab.element.classList.remove("dv-tab--group-expanding");
						tab.element.style.removeProperty("width");
						tab.element.removeEventListener("transitionend", onEnd);
						clearTimeout(fallbackTimer);
						this._pendingTransitionCleanups.delete(panelId);
					};
					const fallbackTimer = setTimeout(onEnd, 300);
					this._pendingTransitionCleanups.set(panelId, onEnd);
					tab.element.addEventListener("transitionend", onEnd);
				}
			} else {
				toggleClass(tab.element, "dv-tab--group-first", false);
				toggleClass(tab.element, "dv-tab--group-last", false);
				tab.element.classList.remove("dv-tab--group-collapsed", "dv-tab--group-expanding");
				tab.element.style.removeProperty("width");
				tab.element.style.removeProperty("--dv-tab-group-color");
			}
		}
		const activeGroupIds = /* @__PURE__ */ new Set();
		for (const tg of tabGroups) {
			activeGroupIds.add(tg.id);
			if (tg.collapsed && tg.panelIds.some((pid) => {
				const te = tabMap.get(pid);
				return te && !te.value.element.classList.contains("dv-tab--group-collapsed");
			})) if (this._skipNextCollapseAnimation) {
				const affected = [];
				for (const pid of tg.panelIds) {
					const te = tabMap.get(pid);
					if (te) {
						te.value.element.style.transition = "none";
						te.value.element.classList.add("dv-tab--group-collapsed");
						affected.push(te.value.element);
					}
				}
				if (affected.length > 0) {
					affected[0].offsetHeight;
					for (const el of affected) el.style.removeProperty("transition");
				}
			} else {
				hasAnimation = true;
				const isVert = this._ctx.getDirection() === "vertical";
				for (const pid of tg.panelIds) {
					const te = tabMap.get(pid);
					if (te && !te.value.element.classList.contains("dv-tab--group-collapsed")) {
						const rect = te.value.element.getBoundingClientRect();
						if (isVert) te.value.element.style.height = `${rect.height}px`;
						else te.value.element.style.width = `${rect.width}px`;
						te.value.element.offsetHeight;
						te.value.element.classList.add("dv-tab--group-collapsed");
					}
				}
			}
		}
		this._skipNextCollapseAnimation = false;
		this._ensureIndicator();
		if (this._indicator) {
			this._indicator.syncUnderlineElements(activeGroupIds);
			if (hasAnimation) this._indicator.trackUnderlines();
			else this._indicator.positionUnderlines();
		}
	}
};

//#endregion
//#region src/dockview/components/titlebar/tabReorderController.ts
/**
* Main-axis extent of a rect. Tabs flow along x in a horizontal header
* (top/bottom) and along y in a vertical one (the left/right edge groups),
* so the reorder math reads every size through this.
*/
function mainAxisSize(rect, direction) {
	return direction === "vertical" ? rect.height : rect.width;
}
/** Leading edge of a rect along the main axis. */
function mainAxisStart(rect, direction) {
	return direction === "vertical" ? rect.top : rect.left;
}
/** A cursor position projected onto the main axis. */
function mainAxisCursor(event, direction) {
	return direction === "vertical" ? event.clientY : event.clientX;
}
/**
* Tab drag-reorder + FLIP animation subsystem extracted from `Tabs`. The DOM
* event wiring remains in `Tabs` and delegates the reorder/animation logic to
* this controller. All access back into `Tabs` goes through
* {@link ITabReorderHost}.
*/
var TabReorderController = class extends CompositeDisposable {
	get _tabs() {
		return this.host.tabItems;
	}
	get _tabMap() {
		return this.host.tabMap;
	}
	get _tabsList() {
		return this.host.tabsList;
	}
	get _direction() {
		return this.host.direction;
	}
	get group() {
		return this.host.groupPanel;
	}
	get accessor() {
		return this.host.component;
	}
	get _tabGroupManager() {
		return this.host.tabGroupManager;
	}
	/** Whether the tab strip is in multi-row wrap layout
	*  (`MultiRowTabsModule`, `overflow.mode: 'wrap'`). In wrap, the 1-D
	*  gap/FLIP animation is suppressed and reorder uses a 2-D hit-test. */
	get _wrapMode() {
		return this._tabsList.classList.contains(OVERFLOW_WRAP_TABS_CLASS);
	}
	get animState() {
		return this._animState;
	}
	set animState(value) {
		this._animState = value;
	}
	get pendingCollapse() {
		return this._pendingCollapse;
	}
	set pendingCollapse(value) {
		this._pendingCollapse = value;
	}
	set voidContainerElement(el) {
		this._voidContainer = el;
	}
	constructor(host) {
		super();
		this.host = host;
		this._animState = null;
		this._pendingMarginCleanups = /* @__PURE__ */ new Map();
		this._pendingCollapse = false;
		this._flipTransitionCleanup = null;
		this._voidContainer = null;
		this._extendedDropZone = null;
		this._pointerInsideTabsList = false;
		this._wrapIndicatorEl = null;
		this.addDisposables({ dispose: () => {
			var _this$_flipTransition;
			(_this$_flipTransition = this._flipTransitionCleanup) === null || _this$_flipTransition === void 0 || _this$_flipTransition.call(this);
		} });
	}
	setExtendedDropZone(el) {
		this._extendedDropZone = el;
	}
	/**
	* Allows external elements (e.g. void container, left actions) to push an
	* insertion index into the animation while the cursor is outside the tabs
	* list itself.  Pass `null` to clear the indicator.
	*/
	setExternalInsertionIndex(index) {
		if (!this._animState) return;
		if (index === this._animState.currentInsertionIndex) return;
		this._animState.currentInsertionIndex = index;
		this.applyDragOverTransforms();
	}
	/**
	* Called when the drag cursor leaves the entire header area (not just the
	* tabs list).  Clears animation state for cross-group drags, which never
	* receive a `dragend` event on this tab list.
	*/
	clearExternalAnimState() {
		if (!this._animState) return;
		this.resetTabTransforms();
		if (this._animState.sourceIndex === -1) this._animState = null;
		else this._animState.currentInsertionIndex = null;
	}
	snapshotTabPositions() {
		const positions = /* @__PURE__ */ new Map();
		for (const tab of this._tabs) positions.set(tab.value.panel.id, tab.value.element.getBoundingClientRect());
		return positions;
	}
	/** Main-axis extent of a rect for this header's orientation. */
	_mainAxisSize(rect) {
		return mainAxisSize(rect, this._direction);
	}
	/** Main-axis leading edge of a rect for this header's orientation. */
	_mainAxisStart(rect) {
		return mainAxisStart(rect, this._direction);
	}
	/** The cursor coordinate along the main axis. */
	_mainAxisCoord(clientX, clientY) {
		return mainAxisCursor({
			clientX,
			clientY
		}, this._direction);
	}
	/** The margin that opens the insertion gap. It must run along the main
	*  axis, so a vertical header pushes tabs down rather than sideways. */
	get _gapMarginProperty() {
		return this._direction === "vertical" ? "margin-top" : "margin-left";
	}
	getAverageTabSize() {
		if (this._tabs.length === 0) return 0;
		let total = 0;
		for (const tab of this._tabs) total += this._mainAxisSize(tab.value.element.getBoundingClientRect());
		return total / this._tabs.length;
	}
	/**
	* Pointer-event entry point. The HTML5 path enters via the per-element
	* `dragover` listener; this one hit-tests the global pointer-drag
	* position against the tabs list and routes through the same shared
	* `processDragOver` / `processDragLeave` helpers.
	*/
	handlePointerDragMove(clientX, clientY) {
		const elAtPoint = getHitTestRoot(this._tabsList).elementFromPoint(clientX, clientY);
		if (!(!!elAtPoint && (this._tabsList.contains(elAtPoint) || !!this._extendedDropZone && this._extendedDropZone.contains(elAtPoint)))) {
			if (this._pointerInsideTabsList) {
				this._pointerInsideTabsList = false;
				this.processDragLeave(elAtPoint);
			}
			return;
		}
		this._pointerInsideTabsList = true;
		this.processDragOver(clientX, clientY);
	}
	/**
	* Pointer-side cleanup hook: when any pointer drag ends, reset the
	* inside-strip flag and tear down any smooth-reorder anim state the
	* dragover bridge may have installed.
	*/
	handlePointerDragEnd(e) {
		if (e && this._animState && this._animState.sourceIndex !== -1 && this._animState.currentInsertionIndex !== null && this.isPointInsideTabsList(e.clientX, e.clientY)) {
			const sourceTabGroupId = this._animState.sourceTabGroupId;
			if (sourceTabGroupId) {
				const insertionIndex = this._animState.currentInsertionIndex;
				this._animState = null;
				this.commitGroupMove(sourceTabGroupId, insertionIndex);
			} else this.commitPointerReorder(e.pointerEvent);
		}
		this._pointerInsideTabsList = false;
		this.resetDragAnimation();
	}
	isPointInsideTabsList(clientX, clientY) {
		const el = getHitTestRoot(this._tabsList).elementFromPoint(clientX, clientY);
		return !!el && this._tabsList.contains(el);
	}
	/**
	* Resolve a single-tab drop from its anim state: the list index adjusted
	* for the source's own slot, and the tab group that slot falls in. Null
	* when the drop changes neither position nor group membership; a drop at
	* the source's own slot still commits when it joins or leaves a group.
	*/
	resolveTabDrop(animState) {
		var _this$group$model$get, _this$group$model$get2;
		const insertionIndex = animState.currentInsertionIndex;
		if (insertionIndex === null) return null;
		const { sourceIndex, targetTabGroupId } = animState;
		const index = insertionIndex - (sourceIndex !== -1 && sourceIndex < insertionIndex ? 1 : 0);
		if (index === sourceIndex && targetTabGroupId === ((_this$group$model$get = (_this$group$model$get2 = this.group.model.getTabGroupForPanel(animState.sourceTabId)) === null || _this$group$model$get2 === void 0 ? void 0 : _this$group$model$get2.id) !== null && _this$group$model$get !== void 0 ? _this$group$model$get : null)) return null;
		return {
			index,
			targetTabGroupId
		};
	}
	/** Commit a smooth-mode intra-group reorder from the current insertion
	*  index (adjusted for the source's own position), then clear drag state.
	*  Used by the pointer backend for both single-row and wrap layouts. */
	commitPointerReorder(event) {
		const animState = this._animState;
		if ((animState === null || animState === void 0 ? void 0 : animState.currentInsertionIndex) == null) return;
		const drop = this.resolveTabDrop(animState);
		this._animState = null;
		this.clearWrapDropIndicator();
		this.uncollapseSourceTab(animState.sourceTabId);
		if (!drop) return;
		this.host.fireDrop(_objectSpread2({ event }, drop));
	}
	/**
	* Shared body of the dragover entry point. Refreshes stale anim state
	* for a changed drag identity, initializes anim state for incoming
	* cross-group drags, and dispatches to the gap-following math in
	* `handleDragOver`. Returns true when this tabs list has taken
	* ownership of the drag; HTML5 callers use this to gate
	* `event.preventDefault()`.
	*/
	processDragOver(clientX, clientY) {
		if (this.accessor.options.disableDnd) return false;
		this._dropStaleAnimState();
		if (!this._animState && !this._initAnimStateForExternalDrag()) return false;
		if (this._animState.sourceIndex !== -1) {
			var _this$group$model$dro;
			(_this$group$model$dro = this.group.model.dropTargetContainer) === null || _this$group$model$dro === void 0 || (_this$group$model$dro = _this$group$model$dro.model) === null || _this$group$model$dro === void 0 || _this$group$model$dro.clear();
		}
		this.handleDragOver({
			clientX,
			clientY
		});
		return true;
	}
	/**
	* If a previous drag's anim state lingers but the current drag is a
	* different cross-group chip identity, drop the stale state so the new drag
	* starts clean.
	*/
	_dropStaleAnimState() {
		if (!this._animState) return;
		const data = getPanelData();
		if ((data === null || data === void 0 ? void 0 : data.tabGroupId) && data.groupId !== this.group.id && this._animState.sourceTabGroupId !== data.tabGroupId) this._animState = null;
	}
	/**
	* Create the anim state for an external (cross-group) tab or chip drag.
	* Returns `true` when state was created, `false` when this drag should not
	* be handled at the tabs-list level.
	*/
	_initAnimStateForExternalDrag() {
		var _this$accessor$option;
		const data = getPanelData();
		if (((_this$accessor$option = this.accessor.options.theme) === null || _this$accessor$option === void 0 ? void 0 : _this$accessor$option.tabAnimation) === "default" && !(data === null || data === void 0 ? void 0 : data.tabGroupId)) return false;
		if (!data || !(data.panelId || data.tabGroupId) || data.groupId === this.group.id) return false;
		const avgSize = this.getAverageTabSize();
		this._animState = data.tabGroupId ? this._makeGroupDragAnimState(data, avgSize) : this._makeTabDragAnimState(data, avgSize);
		return true;
	}
	/** Anim state for an external group-chip drag (gap sized to the group). */
	_makeGroupDragAnimState(data, avgSize) {
		var _sourceTg$panelIds$le;
		const sourceGroup = this.accessor.getPanel(data.groupId);
		const sourceTg = sourceGroup === null || sourceGroup === void 0 ? void 0 : sourceGroup.model.getTabGroups().find((tg) => tg.id === data.tabGroupId);
		const groupGapSize = avgSize * ((_sourceTg$panelIds$le = sourceTg === null || sourceTg === void 0 ? void 0 : sourceTg.panelIds.length) !== null && _sourceTg$panelIds$le !== void 0 ? _sourceTg$panelIds$le : 1) + avgSize;
		return {
			sourceTabId: "",
			sourceIndex: -1,
			tabPositions: this.snapshotTabPositions(),
			chipSizes: this._tabGroupManager.snapshotChipSizes(),
			currentInsertionIndex: null,
			targetTabGroupId: null,
			sourceTabGroupId: data.tabGroupId,
			sourceGroupPanelIds: sourceTg ? new Set(sourceTg.panelIds) : /* @__PURE__ */ new Set(),
			sourceChipSize: avgSize,
			cursorOffsetFromDragStart: groupGapSize / 2,
			sourceGapSize: groupGapSize,
			containerStart: this._mainAxisStart(this._tabsList.getBoundingClientRect())
		};
	}
	/** Anim state for an external single-tab drag. */
	_makeTabDragAnimState(data, avgSize) {
		return {
			sourceTabId: data.panelId,
			sourceIndex: -1,
			tabPositions: this.snapshotTabPositions(),
			chipSizes: this._tabGroupManager.snapshotChipSizes(),
			currentInsertionIndex: null,
			targetTabGroupId: null,
			sourceTabGroupId: null,
			sourceGroupPanelIds: null,
			sourceChipSize: 0,
			cursorOffsetFromDragStart: avgSize / 2,
			sourceGapSize: avgSize,
			containerStart: this._mainAxisStart(this._tabsList.getBoundingClientRect())
		};
	}
	/**
	* Shared body of the dragleave entry point. Preserves anim state when
	* the drag moves between tabs-list children, into the extended drop
	* zone, or into the void container; tears it down otherwise.
	*/
	processDragLeave(related) {
		var _this$_extendedDropZo;
		if (!this._animState) return;
		if (related && this._tabsList.contains(related)) return;
		if (related && ((_this$_extendedDropZo = this._extendedDropZone) === null || _this$_extendedDropZo === void 0 ? void 0 : _this$_extendedDropZo.contains(related))) {
			this.resetTabTransforms();
			this._animState.currentInsertionIndex = null;
			return;
		}
		if (this._voidContainer && related && (related === this._voidContainer || this._voidContainer.contains(related))) return;
		this.resetTabTransforms();
		if (this._animState.sourceIndex === -1) {
			this.clearHeaderAnchorOverlay();
			this._animState = null;
		} else this._animState.currentInsertionIndex = null;
	}
	/**
	* Clear the anchored overlay only when this header is what rendered it.
	* The container is shared with the group's content drop target, which
	* renders into it on the same frame the cursor leaves the strip: the
	* pointer backend calls `handleDragOver` on the new target before the
	* global `onDragMove` that reaches us (#1612).
	*/
	clearHeaderAnchorOverlay() {
		var _container$model;
		const container = this.group.model.dropTargetContainer;
		const outline = container === null || container === void 0 ? void 0 : container.renderedOutline;
		if (outline && ![
			this._tabsList,
			this._voidContainer,
			this._extendedDropZone
		].some((scope) => scope === null || scope === void 0 ? void 0 : scope.contains(outline))) return;
		container === null || container === void 0 || (_container$model = container.model) === null || _container$model === void 0 || _container$model.clear();
	}
	handleDragOver(event) {
		var _event$clientY2, _this$accessor$option2;
		if (!this._animState) return;
		if (this._wrapMode && !this._animState.sourceTabGroupId) {
			var _event$clientY;
			this.handleWrappedDragOver(event.clientX, (_event$clientY = event.clientY) !== null && _event$clientY !== void 0 ? _event$clientY : 0);
			return;
		}
		const mousePos = this._mainAxisCoord(event.clientX, (_event$clientY2 = event.clientY) !== null && _event$clientY2 !== void 0 ? _event$clientY2 : 0);
		const firstPanelToGroup = this._buildFirstPanelToGroupMap();
		let insertionIndex = this._computeDragOverInsertionIndex(mousePos, firstPanelToGroup);
		let targetTabGroupId = null;
		if (insertionIndex !== null && this._tabGroupManager.chipRenderers.size > 0) {
			const resolved = this._resolveInsertionAgainstTabGroups(mousePos, insertionIndex, firstPanelToGroup);
			insertionIndex = resolved.insertionIndex;
			targetTabGroupId = resolved.targetTabGroupId;
		}
		if (insertionIndex === this._animState.currentInsertionIndex && targetTabGroupId === this._animState.targetTabGroupId) return;
		this._animState.currentInsertionIndex = insertionIndex;
		this._animState.targetTabGroupId = targetTabGroupId;
		if (((_this$accessor$option2 = this.accessor.options.theme) === null || _this$accessor$option2 === void 0 ? void 0 : _this$accessor$option2.tabAnimation) === "smooth") this.applyDragOverTransforms();
	}
	/**
	* Build a lookup from the first panel ID of each non-source group → group
	* ID, so the accumulation walk can add chip widths when it reaches a
	* group's first tab.
	*/
	_buildFirstPanelToGroupMap() {
		const firstPanelToGroup = /* @__PURE__ */ new Map();
		if (this._tabGroupManager.chipRenderers.size === 0) return firstPanelToGroup;
		for (const tg of this.group.model.getTabGroups()) {
			if (tg.id === this._animState.sourceTabGroupId) continue;
			if (tg.panelIds.length > 0) firstPanelToGroup.set(tg.panelIds[0], tg.id);
		}
		return firstPanelToGroup;
	}
	/**
	* Walk the tabs in flow order by their original main-axis sizes and return
	* the insertion slot for the drag image's leading edge (null if no slot
	* fits).
	*/
	_computeDragOverInsertionIndex(mousePos, firstPanelToGroup) {
		const animState = this._animState;
		const sourceGroupPanelIds = animState.sourceGroupPanelIds;
		const availableSpace = mousePos - animState.cursorOffsetFromDragStart - animState.containerStart;
		let accSize = 0;
		let insertionIndex = null;
		for (let i = 0; i < this._tabs.length; i++) {
			const tab = this._tabs[i].value;
			if (tab.panel.id === animState.sourceTabId) continue;
			if (sourceGroupPanelIds === null || sourceGroupPanelIds === void 0 ? void 0 : sourceGroupPanelIds.has(tab.panel.id)) continue;
			const groupId = firstPanelToGroup.get(tab.panel.id);
			if (groupId) {
				var _animState$chipSizes$;
				const chipSize = (_animState$chipSizes$ = animState.chipSizes.get(groupId)) !== null && _animState$chipSizes$ !== void 0 ? _animState$chipSizes$ : 0;
				if (accSize + chipSize > availableSpace) {
					var _insertionIndex;
					(_insertionIndex = insertionIndex) !== null && _insertionIndex !== void 0 || (insertionIndex = i);
					break;
				}
				accSize += chipSize;
			}
			const origRect = animState.tabPositions.get(tab.panel.id);
			const tabSize = this._mainAxisSize(origRect !== null && origRect !== void 0 ? origRect : tab.element.getBoundingClientRect());
			if (accSize + tabSize / 2 <= availableSpace) {
				accSize += tabSize;
				insertionIndex = i + 1;
			} else {
				var _insertionIndex2;
				(_insertionIndex2 = insertionIndex) !== null && _insertionIndex2 !== void 0 || (insertionIndex = i);
				break;
			}
		}
		return insertionIndex;
	}
	/**
	* Rebuild the accumulated original main-axis size up to `insertionIndex`,
	* walking the tabs exactly the way the accumulation loop does, so callers
	* know the original trailing edge of the chip (if any) that precedes the
	* insertion slot.
	*/
	_accumulatedSizeUpTo(insertionIndex, firstPanelToGroup) {
		const animState = this._animState;
		const sourceGroupPanelIds = animState.sourceGroupPanelIds;
		let accUpTo = 0;
		for (let i = 0; i < this._tabs.length; i++) {
			const tab = this._tabs[i].value;
			if (tab.panel.id === animState.sourceTabId) continue;
			if (sourceGroupPanelIds === null || sourceGroupPanelIds === void 0 ? void 0 : sourceGroupPanelIds.has(tab.panel.id)) continue;
			if (i >= insertionIndex) break;
			const gid = firstPanelToGroup.get(tab.panel.id);
			if (gid) {
				var _animState$chipSizes$2;
				accUpTo += (_animState$chipSizes$2 = animState.chipSizes.get(gid)) !== null && _animState$chipSizes$2 !== void 0 ? _animState$chipSizes$2 : 0;
			}
			const origRect = animState.tabPositions.get(tab.panel.id);
			accUpTo += this._mainAxisSize(origRect !== null && origRect !== void 0 ? origRect : tab.element.getBoundingClientRect());
		}
		return accUpTo;
	}
	/**
	* Given a raw insertion index, snap it out of / into any tab group it falls
	* within and resolve the target group (if the drop should merge into one).
	*/
	_resolveInsertionAgainstTabGroups(mousePos, insertionIndex, firstPanelToGroup) {
		var _this$_keepSourceGrou2;
		const isGroupDrag = !!this._animState.sourceTabGroupId;
		const accUpTo = this._accumulatedSizeUpTo(insertionIndex, firstPanelToGroup);
		for (const tg of this.group.model.getTabGroups()) {
			const resolved = this._evaluateTabGroupForInsertion(tg, mousePos, insertionIndex, accUpTo, isGroupDrag);
			if (resolved) {
				var _this$_keepSourceGrou;
				return resolved.targetTabGroupId ? resolved : (_this$_keepSourceGrou = this._keepSourceGroupAtOwnSlot(mousePos, resolved.insertionIndex, accUpTo)) !== null && _this$_keepSourceGrou !== void 0 ? _this$_keepSourceGrou : resolved;
			}
		}
		return (_this$_keepSourceGrou2 = this._keepSourceGroupAtOwnSlot(mousePos, insertionIndex, accUpTo)) !== null && _this$_keepSourceGrou2 !== void 0 ? _this$_keepSourceGrou2 : {
			insertionIndex,
			targetTabGroupId: null
		};
	}
	/** A single tab released at its own slot that no other group claimed stays
	*  in its group (the ranges above exclude the source, so a lone or last
	*  member's own slot has no range). At the first slot the chip edge gates it. */
	_keepSourceGroupAtOwnSlot(mousePos, insertionIndex, accUpTo) {
		const animState = this._animState;
		const sourceIndex = animState.sourceIndex;
		if (animState.sourceGroupPanelIds || sourceIndex === -1 || insertionIndex !== sourceIndex && insertionIndex !== sourceIndex + 1) return null;
		const tg = this.group.model.getTabGroups().find((candidate) => candidate.panelIds.includes(animState.sourceTabId));
		if (!tg) return null;
		if (tg.panelIds[0] === animState.sourceTabId) {
			var _animState$chipSizes$3;
			const chipSize = (_animState$chipSizes$3 = animState.chipSizes.get(tg.id)) !== null && _animState$chipSizes$3 !== void 0 ? _animState$chipSizes$3 : 0;
			if (mousePos < animState.containerStart + accUpTo + chipSize) return null;
		}
		return {
			insertionIndex,
			targetTabGroupId: tg.id
		};
	}
	/**
	* Evaluate a single tab group against the proposed insertion index.
	* Returns the resolved `{ insertionIndex, targetTabGroupId }` when this
	* group governs the slot (the caller stops iterating), or `null` when the
	* group is irrelevant and the caller should keep looking.
	*/
	_evaluateTabGroupForInsertion(tg, mousePos, insertionIndex, accUpTo, isGroupDrag) {
		const range = this._resolveGroupRange(tg);
		if (!range) return null;
		const { firstIdx, lastIdx } = range;
		const isInsideRange = insertionIndex >= firstIdx && insertionIndex <= lastIdx;
		const isJustBeforeGroup = !isInsideRange && insertionIndex === firstIdx - 1;
		if (!isInsideRange && !isJustBeforeGroup) return null;
		if (isGroupDrag) return this._resolveGroupDragTarget(insertionIndex, firstIdx, lastIdx, isInsideRange);
		return this._resolveTabDragTarget(tg, mousePos, insertionIndex, accUpTo, firstIdx, isJustBeforeGroup);
	}
	/**
	* The index range this group occupies in the live tab list, excluding the
	* source tab / source group tabs (so dragging a tab out of its own group
	* doesn't inflate the range). Null when the group has no effective tabs or
	* its bounds can't be located.
	*/
	_resolveGroupRange(tg) {
		const animState = this._animState;
		const sourceGroupPanelIds = animState.sourceGroupPanelIds;
		const effectivePanelIds = tg.panelIds.filter((pid) => pid !== animState.sourceTabId && !(sourceGroupPanelIds === null || sourceGroupPanelIds === void 0 ? void 0 : sourceGroupPanelIds.has(pid)));
		if (effectivePanelIds.length === 0) return null;
		const firstIdx = this._tabs.findIndex((t) => t.value.panel.id === effectivePanelIds[0]);
		const lastIdx = this._tabs.findIndex((t) => t.value.panel.id === effectivePanelIds[effectivePanelIds.length - 1]);
		if (firstIdx === -1 || lastIdx === -1) return null;
		return {
			firstIdx,
			lastIdx
		};
	}
	/** Insertion target for a group-chip drag: a group can't be dropped inside
	*  another group, so snap out of the range; a just-before slot is kept. */
	_resolveGroupDragTarget(insertionIndex, firstIdx, lastIdx, isInsideRange) {
		if (isInsideRange) return {
			insertionIndex: insertionIndex < (firstIdx + lastIdx + 1) / 2 ? firstIdx : lastIdx + 1,
			targetTabGroupId: null
		};
		return {
			insertionIndex,
			targetTabGroupId: null
		};
	}
	/** Insertion target for a single-tab drag against a group: decide whether
	*  the drop merges into the group based on the cursor vs the chip edge. */
	_resolveTabDragTarget(tg, mousePos, insertionIndex, accUpTo, firstIdx, isJustBeforeGroup) {
		var _animState$chipSizes$4;
		const animState = this._animState;
		const chipSize = (_animState$chipSizes$4 = animState.chipSizes.get(tg.id)) !== null && _animState$chipSizes$4 !== void 0 ? _animState$chipSizes$4 : 0;
		if (isJustBeforeGroup) {
			if (!this._onlySourceBetween(insertionIndex, firstIdx)) return null;
			if (mousePos >= (tg.collapsed ? animState.containerStart + accUpTo + chipSize / 2 : animState.containerStart + accUpTo + chipSize)) return {
				insertionIndex: firstIdx,
				targetTabGroupId: tg.id
			};
			return {
				insertionIndex,
				targetTabGroupId: null
			};
		}
		const chipOriginalEnd = animState.containerStart + accUpTo + chipSize;
		if (insertionIndex === firstIdx) return {
			insertionIndex,
			targetTabGroupId: mousePos >= chipOriginalEnd ? tg.id : null
		};
		return {
			insertionIndex,
			targetTabGroupId: tg.id
		};
	}
	/**
	* Whether every tab in the half-open range `[from, to)` is the source tab
	* or one of the source group's tabs.
	*/
	_onlySourceBetween(from, to) {
		const animState = this._animState;
		for (let j = from; j < to; j++) {
			var _animState$sourceGrou;
			const pid = this._tabs[j].value.panel.id;
			if (pid !== animState.sourceTabId && !((_animState$sourceGrou = animState.sourceGroupPanelIds) === null || _animState$sourceGrou === void 0 ? void 0 : _animState$sourceGrou.has(pid))) return false;
		}
		return true;
	}
	/**
	* Multi-row wrap drag-over: resolve the 2-D insertion slot and show a
	* discrete drop indicator. No gap/FLIP animation (that's 1-D and fights the
	* flow layout, so `applyDragOverTransforms`/`runFlipAnimation` no-op in wrap).
	*/
	handleWrappedDragOver(clientX, clientY) {
		if (!this._animState) return;
		const index = this.computeWrappedInsertionIndex(clientX, clientY);
		if (index === this._animState.currentInsertionIndex && this._animState.targetTabGroupId === null) return;
		this._animState.currentInsertionIndex = index;
		this._animState.targetTabGroupId = null;
		this.updateWrapDropIndicator(index);
	}
	/**
	* The insertion slot (index into the full tab list) for a pointer at
	* `(clientX, clientY)` over a wrapped strip. Two axes:
	*  - horizontal header (rows): pick the row whose vertical span contains
	*    `clientY`, then the slot within it by x-midpoint;
	*  - vertical header (columns): pick the column whose horizontal span
	*    contains `clientX`, then the slot within it by y-midpoint.
	* The pointer's cross-axis coordinate selects the line (nearest line if it
	* falls in an inter-line gap); its main-axis coordinate selects the slot.
	* Excludes the drag source so its own position doesn't bias the result; the
	* drop path adjusts for the source offset.
	*/
	computeWrappedInsertionIndex(clientX, clientY) {
		var _lines$find;
		const isVertical = this._direction === "vertical";
		const entries = this._wrappedDragEntries();
		if (entries.length === 0) return this._tabs.length;
		const crossPointer = isVertical ? clientX : clientY;
		const mainPointer = isVertical ? clientY : clientX;
		const crossStart = (r) => isVertical ? r.left : r.top;
		const crossEnd = (r) => isVertical ? r.right : r.bottom;
		const mainStart = (r) => isVertical ? r.top : r.left;
		const mainSize = (r) => isVertical ? r.height : r.width;
		const lines = this._bucketWrappedLines(entries, crossStart, crossEnd);
		const items = [...((_lines$find = lines.find((l) => crossPointer >= l.start && crossPointer <= l.end)) !== null && _lines$find !== void 0 ? _lines$find : this._nearestWrappedLine(lines, crossPointer)).items].sort((a, b) => mainStart(a.rect) - mainStart(b.rect));
		for (const item of items) if (mainPointer < mainStart(item.rect) + mainSize(item.rect) / 2) return item.index;
		return items[items.length - 1].index + 1;
	}
	/**
	* The wrapped drop candidates: each non-source tab's list index + live
	* rect. The drag source (and any grouped tabs moving with it) are excluded
	* so their own positions don't bias the hit-test.
	*/
	_wrappedDragEntries() {
		var _this$_animState, _this$_animState2;
		const sourceId = (_this$_animState = this._animState) === null || _this$_animState === void 0 ? void 0 : _this$_animState.sourceTabId;
		const sourceGroupIds = (_this$_animState2 = this._animState) === null || _this$_animState2 === void 0 ? void 0 : _this$_animState2.sourceGroupPanelIds;
		const entries = [];
		for (let i = 0; i < this._tabs.length; i++) {
			const tab = this._tabs[i].value;
			if (tab.panel.id === sourceId) continue;
			if (sourceGroupIds === null || sourceGroupIds === void 0 ? void 0 : sourceGroupIds.has(tab.panel.id)) continue;
			entries.push({
				index: i,
				rect: tab.element.getBoundingClientRect()
			});
		}
		return entries;
	}
	/**
	* Bucket entries into lines by cross-axis start (2px tolerance for sub-pixel
	* rounding), sorted along the cross axis.
	*/
	_bucketWrappedLines(entries, crossStart, crossEnd) {
		const lines = [];
		for (const entry of entries) {
			const s = crossStart(entry.rect);
			const line = lines.find((l) => Math.abs(l.start - s) <= 2);
			if (line) {
				line.items.push(entry);
				line.end = Math.max(line.end, crossEnd(entry.rect));
			} else lines.push({
				start: s,
				end: crossEnd(entry.rect),
				items: [entry]
			});
		}
		lines.sort((a, b) => a.start - b.start);
		return lines;
	}
	/** The line nearest `crossPointer` by cross-axis distance (gap fallback). */
	_nearestWrappedLine(lines, crossPointer) {
		const distance = (l) => crossPointer < l.start ? l.start - crossPointer : crossPointer - l.end;
		return lines.reduce((nearest, l) => distance(l) < distance(nearest) ? l : nearest, lines[0]);
	}
	updateWrapDropIndicator(index) {
		var _this$_animState3;
		this.clearWrapDropIndicator();
		const count = this._tabs.length;
		if (count === 0) return;
		const sourceId = (_this$_animState3 = this._animState) === null || _this$_animState3 === void 0 ? void 0 : _this$_animState3.sourceTabId;
		if (index < count) {
			const el = this._tabs[index].value.element;
			if (this._tabs[index].value.panel.id === sourceId) return;
			el.classList.add("dv-tab--reorder-before");
			this._wrapIndicatorEl = el;
		} else {
			const el = this._tabs[count - 1].value.element;
			el.classList.add("dv-tab--reorder-after");
			this._wrapIndicatorEl = el;
		}
	}
	clearWrapDropIndicator() {
		var _this$_wrapIndicatorE;
		(_this$_wrapIndicatorE = this._wrapIndicatorEl) === null || _this$_wrapIndicatorE === void 0 || _this$_wrapIndicatorE.classList.remove("dv-tab--reorder-before", "dv-tab--reorder-after");
		this._wrapIndicatorEl = null;
	}
	/**
	* Batch-remove a CSS class from multiple elements instantly,
	* forcing only a single reflow for the entire batch.
	*/
	_removeClassInstantlyBatch(elements, cls) {
		const affected = [];
		for (const el of elements) if (el.classList.contains(cls)) {
			el.style.transition = "none";
			toggleClass(el, cls, false);
			affected.push(el);
		}
		if (affected.length > 0) {
			affected[0].getBoundingClientRect();
			for (const el of affected) el.style.removeProperty("transition");
		}
	}
	/**
	* Remove `dv-tab--dragging` from the source tab instantly so it
	* regains its real width before FLIP snapshots.
	*/
	uncollapseSourceTab(sourceTabId) {
		const entry = this._tabMap.get(sourceTabId);
		if (entry) this._removeClassInstantlyBatch([entry.value.element], "dv-tab--dragging");
	}
	applyDragOverTransforms(skipTransition = false) {
		var _this$_animState4;
		if (this._wrapMode) return;
		if (((_this$_animState4 = this._animState) === null || _this$_animState4 === void 0 ? void 0 : _this$_animState4.currentInsertionIndex) == null) {
			this.resetTabTransforms();
			return;
		}
		if (this._pendingCollapse) return;
		const insertionIndex = this._animState.currentInsertionIndex;
		const gapSize = this._computeGapSize();
		const chipToShift = this._computeChipToShift(insertionIndex);
		this._applyGapMargins(insertionIndex, gapSize, chipToShift, skipTransition);
	}
	/** Gap size for the current drag: the whole group's span for a group
	*  drag, otherwise the source tab's own main-axis size. */
	_computeGapSize() {
		const animState = this._animState;
		if (animState.sourceTabGroupId && animState.sourceGroupPanelIds) return animState.sourceGapSize;
		const sourceRect = animState.tabPositions.get(animState.sourceTabId);
		return sourceRect ? this._mainAxisSize(sourceRect) : this.getAverageTabSize();
	}
	/**
	* When the insertion lands at or before a group's first tab, the chip is
	* shifted so the gap appears before the entire group. Returns that chip
	* element, or null when no chip should shift.
	*
	* A chip shifts when dropping outside the group (targetTabGroupId null), or
	* when dropping inside a collapsed group (whose tabs are invisible, so
	* putting the gap on them has no visual effect).
	*/
	_computeChipToShift(insertionIndex) {
		if (this._tabGroupManager.chipRenderers.size === 0) return null;
		for (const tg of this.group.model.getTabGroups()) {
			const result = this._chipToShiftForGroup(tg, insertionIndex);
			if (result !== void 0) return result;
		}
		return null;
	}
	/**
	* The chip to shift for a single group, or `undefined` to keep scanning the
	* remaining groups. A defined result (the chip element, or null when the
	* governing group has no shiftable chip) stops the scan.
	*/
	_chipToShiftForGroup(tg, insertionIndex) {
		const animState = this._animState;
		if (tg.id === animState.sourceTabGroupId) return void 0;
		if (tg.panelIds.includes(animState.sourceTabId)) return void 0;
		const effectivePids = tg.panelIds.filter((pid) => {
			var _animState$sourceGrou2;
			return pid !== animState.sourceTabId && !((_animState$sourceGrou2 = animState.sourceGroupPanelIds) === null || _animState$sourceGrou2 === void 0 ? void 0 : _animState$sourceGrou2.has(pid));
		});
		if (effectivePids.length === 0) return void 0;
		const firstIdx = this._tabs.findIndex((t) => t.value.panel.id === effectivePids[0]);
		if (!(!animState.targetTabGroupId || animState.targetTabGroupId === tg.id && tg.collapsed)) return void 0;
		if (firstIdx < insertionIndex) return void 0;
		if (this._onlySourceBetween(insertionIndex, firstIdx)) {
			const chipEntry = this._tabGroupManager.chipRenderers.get(tg.id);
			if (chipEntry) return chipEntry.chip.element;
		}
		return null;
	}
	/** Reset non-source chip margins, then apply the gap margin to the chip or
	*  the first tab at/after the insertion index. */
	_applyGapMargins(insertionIndex, gapSize, chipToShift, skipTransition) {
		const animState = this._animState;
		const sourceGroupPanelIds = animState.sourceGroupPanelIds;
		let gapApplied = false;
		for (const [groupId, entry] of this._tabGroupManager.chipRenderers) {
			if (groupId === animState.sourceTabGroupId) continue;
			this._clearMargin(entry.chip.element, skipTransition);
		}
		if (chipToShift) {
			this._setMargin(chipToShift, `${gapSize}px`, skipTransition);
			gapApplied = true;
		}
		for (let i = 0; i < this._tabs.length; i++) {
			const tab = this._tabs[i].value;
			if (tab.panel.id === animState.sourceTabId) continue;
			if (sourceGroupPanelIds === null || sourceGroupPanelIds === void 0 ? void 0 : sourceGroupPanelIds.has(tab.panel.id)) continue;
			if (!gapApplied && i >= insertionIndex) {
				this._setMargin(tab.element, `${gapSize}px`, skipTransition);
				gapApplied = true;
			} else this._clearMargin(tab.element, skipTransition);
		}
		this._tabGroupManager.trackUnderlines();
	}
	/** Pick the correct shifting class for tabs vs chips. */
	_shiftingClass(el) {
		return el.classList.contains("dv-tab-group-chip") ? "dv-tab-group-chip--shifting" : "dv-tab--shifting";
	}
	/** Apply the main-axis gap margin to an element, optionally bypassing CSS
	*  transitions for instant positioning. */
	_setMargin(el, value, skipTransition) {
		const property = this._gapMarginProperty;
		if (skipTransition) {
			el.style.transition = "none";
			el.style.setProperty(property, value);
			el.getBoundingClientRect();
			el.style.removeProperty("transition");
		} else el.style.setProperty(property, value);
		toggleClass(el, this._shiftingClass(el), true);
	}
	/** Clear an element's gap margin, animating it back to zero unless
	*  transitions are skipped. */
	_clearMargin(el, skipTransition) {
		const cls = this._shiftingClass(el);
		const property = this._gapMarginProperty;
		const prev = this._pendingMarginCleanups.get(el);
		if (prev) prev();
		if (skipTransition || !el.style.getPropertyValue(property)) {
			el.style.removeProperty(property);
			toggleClass(el, cls, false);
		} else {
			el.style.setProperty(property, "0px");
			toggleClass(el, cls, true);
			const onEnd = () => {
				el.style.removeProperty(property);
				toggleClass(el, cls, false);
				el.removeEventListener("transitionend", onEnd);
				clearTimeout(fallbackTimer);
				this._pendingMarginCleanups.delete(el);
			};
			const fallbackTimer = setTimeout(onEnd, 300);
			this._pendingMarginCleanups.set(el, onEnd);
			el.addEventListener("transitionend", onEnd);
		}
	}
	resetTabTransforms() {
		this.clearWrapDropIndicator();
		for (const [, cleanup] of this._pendingMarginCleanups) cleanup();
		this._pendingMarginCleanups.clear();
		for (const tab of this._tabs) {
			tab.value.element.style.removeProperty("margin-left");
			tab.value.element.style.removeProperty("margin-right");
			tab.value.element.style.removeProperty("margin-top");
			tab.value.element.style.removeProperty("margin-bottom");
			tab.value.element.style.removeProperty("transform");
			toggleClass(tab.value.element, "dv-tab--shifting", false);
		}
		for (const [, entry] of this._tabGroupManager.chipRenderers) {
			entry.chip.element.style.removeProperty("margin-left");
			entry.chip.element.style.removeProperty("margin-top");
			toggleClass(entry.chip.element, "dv-tab-group-chip--shifting", false);
		}
		this._tabGroupManager.positionUnderlines();
	}
	/**
	* Commit a group-drag drop: clear drag classes, move the group
	* in the model, and run a FLIP animation.
	*/
	commitGroupMove(sourceTabGroupId, insertionIndex) {
		const data = getPanelData();
		this._tabGroupManager.disposeChipDrag(sourceTabGroupId);
		this._tabGroupManager.clearChipDropOverlays();
		if (this.group.model.getTabGroups().some((tg) => tg.id === sourceTabGroupId)) {
			var _this$accessor$option3;
			if (((_this$accessor$option3 = this.accessor.options.theme) === null || _this$accessor$option3 === void 0 ? void 0 : _this$accessor$option3.tabAnimation) === "smooth") {
				this._clearGroupDragClasses(sourceTabGroupId);
				const firstPositions = this.snapshotTabPositions();
				this.resetTabTransforms();
				this.group.model.moveTabGroup(sourceTabGroupId, insertionIndex);
				this.runFlipAnimation(firstPositions, "", false);
			} else {
				this._tabGroupManager.skipNextCollapseAnimation = true;
				this.group.model.moveTabGroup(sourceTabGroupId, insertionIndex);
			}
		} else if (data) {
			var _data$tabGroupId;
			this.resetTabTransforms();
			this.accessor.moveGroupOrPanel({
				from: {
					groupId: data.groupId,
					tabGroupId: (_data$tabGroupId = data.tabGroupId) !== null && _data$tabGroupId !== void 0 ? _data$tabGroupId : sourceTabGroupId
				},
				to: {
					group: this.group,
					position: "center",
					index: insertionIndex
				}
			});
		}
	}
	_clearGroupDragClasses(sourceTabGroupId) {
		const chipEntry = this._tabGroupManager.chipRenderers.get(sourceTabGroupId);
		if (chipEntry) this._removeClassInstantlyBatch([chipEntry.chip.element], "dv-tab-group-chip--dragging");
		this._removeClassInstantlyBatch(this._tabs.map((t) => t.value.element), "dv-tab--dragging");
		const underline = this._tabGroupManager.groupUnderlines.get(sourceTabGroupId);
		if (underline) underline.style.removeProperty("display");
		this._tabGroupManager.skipNextCollapseAnimation = true;
	}
	resetDragAnimation() {
		this._pendingCollapse = false;
		if (this._animState) {
			this.resetTabTransforms();
			if (this._animState.sourceTabGroupId) this._clearGroupDragClasses(this._animState.sourceTabGroupId);
			else this._removeClassInstantlyBatch(this._tabs.map((t) => t.value.element), "dv-tab--dragging");
			this._animState = null;
			for (const [, el] of this._tabGroupManager.groupUnderlines) el.style.removeProperty("display");
		}
	}
	runFlipAnimation(firstPositions, sourceTabId, isCrossGroup = false, animRange) {
		if (this._wrapMode) return;
		let hasAnimation = false;
		for (let i = 0; i < this._tabs.length; i++) if (this._applyFlipTransform(this._tabs[i], i, sourceTabId, isCrossGroup, firstPositions, animRange)) hasAnimation = true;
		if (!hasAnimation) return;
		this._scheduleFlipReset();
	}
	/**
	* Set a single tab's FLIP transform: the source tab slides in from the end
	* on a cross-group insert; other in-range tabs slide from their first
	* position to their last. Returns true if the tab will animate.
	*/
	_applyFlipTransform(tab, index, sourceTabId, isCrossGroup, firstPositions, animRange) {
		const isVertical = this._direction === "vertical";
		const panelId = tab.value.panel.id;
		if (panelId === sourceTabId) {
			if (!isCrossGroup) return false;
			const rect = tab.value.element.getBoundingClientRect();
			tab.value.element.style.transform = isVertical ? `translateY(${rect.height}px)` : `translateX(${rect.width}px)`;
			toggleClass(tab.value.element, "dv-tab--shifting", true);
			return true;
		}
		if (animRange !== void 0 && (index < animRange.from || index > animRange.to)) return false;
		const firstRect = firstPositions.get(panelId);
		if (!firstRect) return false;
		const lastRect = tab.value.element.getBoundingClientRect();
		const delta = isVertical ? firstRect.top - lastRect.top : firstRect.left - lastRect.left;
		if (Math.abs(delta) < 1) return false;
		tab.value.element.style.transform = isVertical ? `translateY(${delta}px)` : `translateX(${delta}px)`;
		toggleClass(tab.value.element, "dv-tab--shifting", true);
		return true;
	}
	/**
	* Next frame, clear the transforms (triggering the CSS transition), track
	* underlines through the slide, and drop the shifting classes once the
	* transform transition ends.
	*/
	_scheduleFlipReset() {
		requestAnimationFrame(() => {
			var _this$_flipTransition2;
			for (const tab of this._tabs) if (tab.value.element.style.transform) tab.value.element.style.transform = "";
			this._tabGroupManager.trackUnderlines();
			(_this$_flipTransition2 = this._flipTransitionCleanup) === null || _this$_flipTransition2 === void 0 || _this$_flipTransition2.call(this);
			const onTransitionEnd = (event) => {
				if (event.propertyName === "transform") {
					cleanup();
					for (const tab of this._tabs) toggleClass(tab.value.element, "dv-tab--shifting", false);
					this._tabGroupManager.positionUnderlines();
				}
			};
			const cleanup = () => {
				this._tabsList.removeEventListener("transitionend", onTransitionEnd);
				this._flipTransitionCleanup = null;
			};
			this._flipTransitionCleanup = cleanup;
			this._tabsList.addEventListener("transitionend", onTransitionEnd);
		});
	}
};

//#endregion
//#region src/dockview/components/titlebar/tabs.ts
var Tabs = class extends CompositeDisposable {
	get _animState() {
		return this._reorder.animState;
	}
	set _animState(value) {
		this._reorder.animState = value;
	}
	get _pendingCollapse() {
		return this._reorder.pendingCollapse;
	}
	set _pendingCollapse(value) {
		this._reorder.pendingCollapse = value;
	}
	get tabItems() {
		return this._tabs;
	}
	get tabMap() {
		return this._tabMap;
	}
	get tabsList() {
		return this._tabsList;
	}
	get groupPanel() {
		return this.group;
	}
	get component() {
		return this.accessor;
	}
	get tabGroupManager() {
		return this._tabGroupManager;
	}
	fireDrop(event) {
		this._onDrop.fire(event);
	}
	/**
	* Register a predicate excluding panels from the overflow dropdown (pinned
	* tabs). Re-evaluates the dropdown immediately if overflow is being
	* observed. Passing `() => false` restores default behaviour.
	*/
	setOverflowExclude(fn) {
		this._overflowExclude = fn;
		this.refreshOverflow();
	}
	/**
	* Register a predicate that forces matching panels into the overflow
	* dropdown regardless of horizontal fit (the MultiRowTabs surplus set, the
	* rows beyond `overflow.maxRows`). Re-evaluates the dropdown immediately.
	* Passing `() => false` restores default behaviour.
	*/
	setForcedOverflow(fn) {
		this._forcedOverflow = fn;
		this.refreshOverflow();
	}
	/** Re-evaluate the overflow dropdown now (e.g. after the exclusion set
	*  changed) instead of waiting for the next resize/scroll observer fire. */
	refreshOverflow() {
		if (this._showTabsOverflowControl) this.toggleDropdown({ reset: false });
		this._applyPinnedSticky();
	}
	/**
	* Enable/disable sticky-on-scroll for pinned tabs (inline mode), wired by
	* the PinnedTabs module. When on, pinned (overflow-excluded) tabs are frozen
	* to the left edge as the strip scrolls, each at the cumulative width of the
	* pinned tabs before it; when off, the sticky styling is cleared. The
	* offsets are scroll-invariant, so they are recomputed only on resize,
	* horizontal scroll (a cheap self-heal after a reorder), and pinned-set
	* changes, not continuously.
	*/
	setPinnedSticky(enabled) {
		if (this._pinnedSticky === enabled) return;
		this._pinnedSticky = enabled;
		this._applyPinnedSticky();
	}
	/**
	* Freeze the pinned (overflow-excluded) tabs to the left edge: give each the
	* `dv-tab--pinned-sticky` class and a `--dv-pinned-sticky-left` offset so the
	* CSS `position: sticky` rule holds it in place as the strip scrolls. Clears
	* the styling from any tab that is no longer pinned, and from all tabs when
	* the feature is off.
	*/
	_applyPinnedSticky() {
		const pinned = this._pinnedSticky ? this._tabs.filter((tab) => this._overflowExclude(tab.value.panel.id)) : [];
		if (pinned.length === 0 && !this._hasPinnedStickyStyling) return;
		for (const tab of this._tabs) {
			const el = tab.value.element;
			if (el.classList.contains("dv-tab--pinned-sticky")) {
				el.classList.remove("dv-tab--pinned-sticky");
				el.style.removeProperty("--dv-pinned-sticky-left");
			}
		}
		if (pinned.length === 0) {
			this._hasPinnedStickyStyling = false;
			return;
		}
		const lefts = pinned.map((tab) => tab.value.element.offsetLeft);
		pinned.forEach((tab, index) => {
			const el = tab.value.element;
			el.classList.add("dv-tab--pinned-sticky");
			el.style.setProperty("--dv-pinned-sticky-left", `${lefts[index]}px`);
		});
		this._hasPinnedStickyStyling = true;
	}
	get showTabsOverflowControl() {
		return this._showTabsOverflowControl;
	}
	set showTabsOverflowControl(value) {
		if (this._showTabsOverflowControl == value) return;
		this._showTabsOverflowControl = value;
		if (value) {
			const observer = new OverflowObserver(this._tabsList);
			this._observerDisposable.value = new CompositeDisposable(observer, observer.onDidChange((event) => {
				const hasOverflow = event.hasScrollX || event.hasScrollY;
				this.toggleDropdown({ reset: !hasOverflow });
				this._applyPinnedSticky();
				if (this._tabGroupManager.groupUnderlines.size > 0) this._tabGroupManager.positionUnderlines();
			}), addDisposableListener(this._tabsList, "scroll", () => {
				this.toggleDropdown({ reset: false });
				this._applyPinnedSticky();
				if (this._tabGroupManager.groupUnderlines.size > 0) this._tabGroupManager.positionUnderlines();
			}));
		} else this._observerDisposable.value = Disposable.NONE;
	}
	get element() {
		return this._element;
	}
	/**
	* The scrollable tab list (`.dv-tabs-container`) holding the tab elements,
	* exposed (read-only) so the multi-row wrap controller can measure the
	* wrapped row count and toggle the wrap class. Not the outer header element.
	*/
	get tabsListElement() {
		return this._tabsList;
	}
	set voidContainer(el) {
		var _this$_voidContainerL;
		(_this$_voidContainerL = this._voidContainerListeners) === null || _this$_voidContainerL === void 0 || _this$_voidContainerL.dispose();
		this._voidContainerListeners = null;
		this._reorder.voidContainerElement = el;
		if (el) this._voidContainerListeners = new CompositeDisposable(addDisposableListener(el, "dragover", (event) => {
			if (this._animState) event.preventDefault();
		}), addDisposableListener(el, "drop", (event) => {
			var _this$_animState;
			if (((_this$_animState = this._animState) === null || _this$_animState === void 0 ? void 0 : _this$_animState.sourceTabGroupId) && this._animState.currentInsertionIndex !== null) {
				event.preventDefault();
				event.stopPropagation();
				this.handleVoidDrop();
			}
		}));
	}
	/**
	* Handle a drop that occurred on the void container (empty header
	* space to the right of the tabs). Returns `true` if the drop was
	* consumed by an active group drag, `false` otherwise.
	*/
	handleVoidDrop() {
		var _this$_animState2, _this$_animState$curr;
		if (!((_this$_animState2 = this._animState) === null || _this$_animState2 === void 0 ? void 0 : _this$_animState2.sourceTabGroupId)) return false;
		const sourceTabGroupId = this._animState.sourceTabGroupId;
		const insertionIndex = (_this$_animState$curr = this._animState.currentInsertionIndex) !== null && _this$_animState$curr !== void 0 ? _this$_animState$curr : this._tabs.length;
		this._animState = null;
		this._commitGroupMove(sourceTabGroupId, insertionIndex);
		return true;
	}
	get panels() {
		return this._tabs.map((_) => _.value.panel.id);
	}
	get size() {
		return this._tabs.length;
	}
	get tabs() {
		return this._tabs.map((_) => _.value);
	}
	get direction() {
		return this._direction;
	}
	set direction(value) {
		if (this._direction === value) return;
		this._direction = value;
		this._tabsList.setAttribute("aria-orientation", value === "vertical" ? "vertical" : "horizontal");
		if (this._scrollbar) this._scrollbar.orientation = value;
		removeClasses(this._tabsList, "dv-horizontal", "dv-vertical");
		if (value === "vertical") addClasses(this._tabsList, "dv-tabs-container-vertical", "dv-vertical");
		else {
			removeClasses(this._tabsList, "dv-tabs-container-vertical");
			addClasses(this._tabsList, "dv-horizontal");
		}
		for (const tab of this._tabs) tab.value.setDirection(value);
		this._tabGroupManager.updateDirection();
	}
	constructor(group, accessor, options) {
		super();
		this.group = group;
		this.accessor = accessor;
		this._observerDisposable = new MutableDisposable();
		this._pointerActivation = new MutableDisposable();
		this._scrollbar = null;
		this._tabs = [];
		this._overflowRefreshPending = false;
		this._tabMap = /* @__PURE__ */ new Map();
		this.selectedIndex = -1;
		this._showTabsOverflowControl = false;
		this._overflowExclude = () => false;
		this._forcedOverflow = () => false;
		this._pinnedSticky = false;
		this._hasPinnedStickyStyling = false;
		this._direction = "horizontal";
		this._voidContainerListeners = null;
		this._onTabDragStart = new Emitter();
		this.onTabDragStart = this._onTabDragStart.event;
		this._onDrop = new Emitter();
		this.onDrop = this._onDrop.event;
		this._onWillShowOverlay = new Emitter();
		this.onWillShowOverlay = this._onWillShowOverlay.event;
		this._onOverflowTabsChange = new Emitter();
		this.onOverflowTabsChange = this._onOverflowTabsChange.event;
		this._tabsList = document.createElement("div");
		this._tabsList.className = "dv-tabs-container";
		this._tabsList.setAttribute("role", "tablist");
		this._tabsList.setAttribute("aria-orientation", this._direction === "vertical" ? "vertical" : "horizontal");
		this.showTabsOverflowControl = options.showTabsOverflowControl;
		if (accessor.options.scrollbars === "native") this._element = this._tabsList;
		else {
			this._scrollbar = new Scrollbar(this._tabsList);
			this._scrollbar.orientation = this.direction;
			this._element = this._scrollbar.element;
			this.addDisposables(this._scrollbar);
		}
		this._tabGroupManager = new TabGroupManager({
			group: this.group,
			accessor: this.accessor,
			tabsList: this._tabsList,
			getTabs: () => this._tabs,
			getTabMap: () => this._tabMap,
			getDirection: () => this._direction
		}, {
			onChipContextMenu: (tabGroup, event) => {
				var _this$accessor$contex;
				(_this$accessor$contex = this.accessor.contextMenuService) === null || _this$accessor$contex === void 0 || _this$accessor$contex.showForChip(tabGroup, this.group, event);
			},
			onChipDragStart: (tabGroup, chip, event) => {
				this._handleChipDragStart(tabGroup, chip, event);
			},
			onChipDragEnd: () => {
				this._reorder.resetDragAnimation();
			},
			onChipDrop: (tabGroup, event) => {
				this._handleChipDrop(tabGroup, event);
			}
		});
		this._reorder = new TabReorderController(this);
		const tabsListPointerTarget = pointerBackend.createDropTarget(this._tabsList, {
			acceptedTargetZones: ["center"],
			canDisplayOverlay: () => false,
			isHitTestTransparent: () => {
				const data = getPanelData();
				if ((data === null || data === void 0 ? void 0 : data.viewId) !== this.accessor.id || data.groupId !== this.group.id) return true;
				return data.panelId === null && !data.tabGroupId;
			}
		});
		this.addDisposables(tabsListPointerTarget, this._onOverflowTabsChange, this._observerDisposable, this._pointerActivation, this._onWillShowOverlay, this._onDrop, this._onTabDragStart, this._reorder, PointerDragController.getInstance().onDragEnd((e) => {
			this._reorder.handlePointerDragEnd(e);
		}), PointerDragController.getInstance().onDragMove((e) => {
			this._reorder.handlePointerDragMove(e.clientX, e.clientY);
		}), addDisposableListener(this.element, "pointerdown", (event) => {
			if (event.defaultPrevented) return;
			if (event.button === 0) this.accessor.doSetGroupActive(this.group);
		}), addDisposableListener(this._tabsList, "wheel", (event) => {
			const isVertical = this._direction === "vertical";
			const primary = isVertical ? event.deltaY || event.deltaX : event.deltaX || event.deltaY;
			if (primary === 0) return;
			const max = isVertical ? this._tabsList.scrollHeight - this._tabsList.clientHeight : this._tabsList.scrollWidth - this._tabsList.clientWidth;
			if (max <= 0) return;
			const current = isVertical ? this._tabsList.scrollTop : this._tabsList.scrollLeft;
			if (primary < 0 && current <= 0 || primary > 0 && current >= max) return;
			event.preventDefault();
			event.stopPropagation();
			if (isVertical) this._tabsList.scrollTop = current + primary;
			else this._tabsList.scrollLeft = current + primary;
		}, { passive: false }), addDisposableListener(this._tabsList, "keydown", (event) => {
			this._onKeyDown(event);
		}), addDisposableListener(this._tabsList, "dragover", (event) => {
			if (this._reorder.processDragOver(event.clientX, event.clientY)) event.preventDefault();
		}, true), addDisposableListener(this._tabsList, "dragleave", (event) => {
			this._reorder.processDragLeave(event.relatedTarget);
		}, true), addDisposableListener(this._tabsList, "dragend", () => {
			this._reorder.resetDragAnimation();
		}), addDisposableListener(this._tabsList, "drop", (event) => {
			var _this$_animState3, _this$accessor$option, _this$group$model$dro;
			if (((_this$_animState3 = this._animState) === null || _this$_animState3 === void 0 ? void 0 : _this$_animState3.currentInsertionIndex) == null) return;
			if (((_this$accessor$option = this.accessor.options.theme) === null || _this$accessor$option === void 0 ? void 0 : _this$accessor$option.tabAnimation) !== "smooth" && !this._animState.sourceTabGroupId) return;
			event.stopPropagation();
			event.preventDefault();
			(_this$group$model$dro = this.group.model.dropTargetContainer) === null || _this$group$model$dro === void 0 || (_this$group$model$dro = _this$group$model$dro.model) === null || _this$group$model$dro === void 0 || _this$group$model$dro.clear();
			const animState = this._animState;
			this._animState = null;
			this._pendingCollapse = false;
			if (animState.sourceTabGroupId) {
				this._commitGroupMove(animState.sourceTabGroupId, animState.currentInsertionIndex);
				return;
			}
			const drop = this._reorder.resolveTabDrop(animState);
			this._reorder.uncollapseSourceTab(animState.sourceTabId);
			if (!drop) {
				this.resetTabTransforms();
				return;
			}
			const sourceIndex = animState.sourceIndex;
			const firstPositions = this.snapshotTabPositions();
			this.resetTabTransforms();
			this._onDrop.fire(_objectSpread2({ event }, drop));
			this.runFlipAnimation(firstPositions, animState.sourceTabId, sourceIndex === -1, {
				from: Math.min(sourceIndex, drop.index),
				to: Math.max(sourceIndex, drop.index)
			});
		}, true), Disposable.from(() => {
			var _this$_voidContainerL2;
			(_this$_voidContainerL2 = this._voidContainerListeners) === null || _this$_voidContainerL2 === void 0 || _this$_voidContainerL2.dispose();
			this._reorder.resetDragAnimation();
			this._tabGroupManager.disposeAll();
			for (const { value, disposable } of this._tabs) {
				disposable.dispose();
				value.dispose();
			}
			this._tabs = [];
			this._tabMap.clear();
		}));
	}
	indexOf(id) {
		return this._tabs.findIndex((tab) => tab.value.panel.id === id);
	}
	/** DOM id of the tab element for a panel, used for the tabpanel's `aria-labelledby`. */
	getTabId(panelId) {
		var _this$_tabMap$get;
		return (_this$_tabMap$get = this._tabMap.get(panelId)) === null || _this$_tabMap$get === void 0 ? void 0 : _this$_tabMap$get.value.element.id;
	}
	/** Inverse of {@link getTabId}: the panel whose tab owns `element` (the tab
	*  itself or any descendant of it), or `undefined` for non-tab targets. */
	getPanelForTab(element) {
		for (const { value } of this._tabs) if (value.element === element || value.element.contains(element)) return value.panel;
	}
	isActive(tab) {
		return this.selectedIndex > -1 && this._tabs[this.selectedIndex].value === tab;
	}
	_onKeyDown(event) {
		const index = this._tabs.findIndex((tab) => tab.value.element === event.target);
		if (index === -1) return;
		const isVertical = this._direction === "vertical";
		const nextKey = isVertical ? "ArrowDown" : "ArrowRight";
		const prevKey = isVertical ? "ArrowUp" : "ArrowLeft";
		const last = this._tabs.length - 1;
		switch (event.key) {
			case nextKey:
				event.preventDefault();
				this._focusTab(Math.min(index + 1, last));
				break;
			case prevKey:
				event.preventDefault();
				this._focusTab(Math.max(index - 1, 0));
				break;
			case "Home":
				event.preventDefault();
				this._focusTab(0);
				break;
			case "End":
				event.preventDefault();
				this._focusTab(last);
				break;
			case "Enter":
			case " ":
				event.preventDefault();
				this.accessor.withOrigin("user", () => this._tabs[index].value.panel.api.setActive());
				break;
			case "Delete":
			case "Backspace":
				event.preventDefault();
				this._closeTab(index);
				break;
		}
	}
	/**
	* Close the tab at `index` and move roving focus to a neighbouring tab so
	* keyboard focus stays in the tablist.
	*/
	_closeTab(index) {
		var _this$_tabs$index, _ref, _this$_tabs$value, _this$_tabs, _this$_tabs2;
		const tab = (_this$_tabs$index = this._tabs[index]) === null || _this$_tabs$index === void 0 ? void 0 : _this$_tabs$index.value;
		if (!tab) return;
		const neighbourId = (_ref = (_this$_tabs$value = (_this$_tabs = this._tabs[index + 1]) === null || _this$_tabs === void 0 ? void 0 : _this$_tabs.value) !== null && _this$_tabs$value !== void 0 ? _this$_tabs$value : (_this$_tabs2 = this._tabs[index - 1]) === null || _this$_tabs2 === void 0 ? void 0 : _this$_tabs2.value) === null || _ref === void 0 ? void 0 : _ref.panel.id;
		tab.panel.api.close();
		if (neighbourId !== void 0) {
			const nextIndex = this._tabs.findIndex((t) => t.value.panel.id === neighbourId);
			if (nextIndex > -1) this._focusTab(nextIndex);
		}
	}
	/** Move the roving focus to the tab at `index` (updates tabindex + DOM focus). */
	_focusTab(index) {
		for (let i = 0; i < this._tabs.length; i++) this._tabs[i].value.element.tabIndex = i === index ? 0 : -1;
		this._tabs[index].value.element.focus();
	}
	/** Move DOM focus to the active tab, the entry point into the tablist. */
	focusActiveTab() {
		var _this$group$activePan;
		if (this._tabs.length === 0) return;
		const activeId = (_this$group$activePan = this.group.activePanel) === null || _this$group$activePan === void 0 ? void 0 : _this$group$activePan.id;
		const activeIndex = activeId ? this._tabs.findIndex((t) => t.value.panel.id === activeId) : -1;
		this._focusTab(activeIndex > -1 ? activeIndex : 0);
	}
	setActivePanel(panel) {
		const isVertical = this._direction === "vertical";
		for (const tab of this._tabs) {
			const isActivePanel = panel.id === tab.value.panel.id;
			tab.value.setActive(isActivePanel);
			if (isActivePanel) this._scrollTabIntoView(tab.value.element, isVertical);
		}
		if (this._tabGroupManager.groupUnderlines.size > 0) this._tabGroupManager.positionUnderlines();
	}
	/**
	* Scroll the active tab into view within its scroll container. Uses the
	* element's own offset (relative to the container) rather than accumulating
	* tab client sizes, which omits tab margins and any in-flow group chips
	* between tabs and so undershoots the active tab's real position.
	*/
	_scrollTabIntoView(element, isVertical) {
		const parentElement = element.parentElement;
		if (!parentElement) return;
		const start = isVertical ? element.offsetTop : element.offsetLeft;
		const size = isVertical ? element.offsetHeight : element.offsetWidth;
		const scrollStart = isVertical ? parentElement.scrollTop : parentElement.scrollLeft;
		const clientSize = isVertical ? parentElement.clientHeight : parentElement.clientWidth;
		if (start < scrollStart || start + size > scrollStart + clientSize) if (isVertical) parentElement.scrollTop = start;
		else parentElement.scrollLeft = start;
	}
	/**
	* Activate a tab in response to a plain (non-shift) left pointerdown.
	*
	* With the HTML5 drag backend the tab is natively `draggable`, and a native
	* drag arms from the same pointerdown+move gesture. Firefox aborts that
	* pending drag if the pointerdown also moves focus / relayouts the tab strip
	* synchronously — which `openPanel` does — so a drag started on an inactive
	* tab never begins (issue #932). Defer the activation past the frame so
	* `dragstart` arms first; a plain click (no drag) still activates on the
	* next frame, which is imperceptible. The pointer backend has no native drag
	* to pre-empt, so it activates synchronously as before.
	*/
	_activateOnPointerDown(panel) {
		if (!resolveDndCapabilities(this.accessor.options).html5) {
			this.group.model.openPanel(panel);
			return;
		}
		const handle = requestAnimationFrame(() => {
			if (this._tabMap.has(panel.id)) this.group.model.openPanel(panel);
		});
		this._pointerActivation.value = { dispose: () => cancelAnimationFrame(handle) };
	}
	openPanel(panel, index = this._tabs.length) {
		if (this._tabMap.has(panel.id)) return;
		const tab = new Tab(panel, this.accessor, this.group);
		tab.setContent(panel.view.tab);
		if (this._direction !== "horizontal") tab.setDirection(this._direction);
		const value = {
			value: tab,
			disposable: new CompositeDisposable(tab.onDragStart((event) => {
				var _this$accessor$option2;
				const wasPrevented = event.defaultPrevented;
				this._onTabDragStart.fire({
					nativeEvent: event,
					panel
				});
				if (event.defaultPrevented && !wasPrevented) return;
				if (((_this$accessor$option2 = this.accessor.options.theme) === null || _this$accessor$option2 === void 0 ? void 0 : _this$accessor$option2.tabAnimation) === "smooth") {
					const tabSize = mainAxisSize(tab.element.getBoundingClientRect(), this._direction);
					const sourceIndex = this._tabs.findIndex((x) => x.value === tab);
					this._animState = {
						sourceTabId: panel.id,
						sourceIndex,
						tabPositions: this.snapshotTabPositions(),
						chipSizes: this._tabGroupManager.snapshotChipSizes(),
						currentInsertionIndex: null,
						targetTabGroupId: null,
						sourceTabGroupId: null,
						sourceGroupPanelIds: null,
						sourceChipSize: 0,
						cursorOffsetFromDragStart: tabSize / 2,
						sourceGapSize: tabSize,
						containerStart: mainAxisStart(this._tabsList.getBoundingClientRect(), this._direction)
					};
					this._pendingCollapse = true;
					requestAnimationFrame(() => {
						var _this$_animState4, _this$_animState4$cur;
						this._pendingCollapse = false;
						if (!this._animState) return;
						if (!this._tabsList.classList.contains("dv-tabs-container--wrap")) {
							tab.element.style.transition = "none";
							toggleClass(tab.element, "dv-tab--dragging", true);
							tab.element.offsetHeight;
						}
						(_this$_animState4$cur = (_this$_animState4 = this._animState).currentInsertionIndex) !== null && _this$_animState4$cur !== void 0 || (_this$_animState4.currentInsertionIndex = sourceIndex);
						this.applyDragOverTransforms(true);
						tab.element.style.removeProperty("transition");
					});
				}
			}), tab.onTabClick((event) => {
				if (event.defaultPrevented) return;
				if (this.group.api.location.type !== "edge") return;
				if (this.group.activePanel === panel) if (this.group.api.isCollapsed()) this.group.api.expand();
				else this.group.api.collapse();
				else {
					this.group.model.openPanel(panel);
					if (this.group.api.isCollapsed()) this.group.api.expand();
				}
			}), tab.onPointerDown((event) => {
				if (event.defaultPrevented) return;
				const isFloatingGroupsEnabled = !this.accessor.options.disableFloatingGroups;
				const isFloatingWithOnePanel = this.group.api.location.type === "floating" && this.size === 1;
				if (isFloatingGroupsEnabled && !isFloatingWithOnePanel && event.shiftKey) {
					event.preventDefault();
					const panel = this.accessor.getGroupPanel(tab.panel.id);
					const { top, left } = tab.element.getBoundingClientRect();
					const { top: rootTop, left: rootLeft } = this.accessor.element.getBoundingClientRect();
					this.accessor.addFloatingGroup(panel, {
						x: left - rootLeft,
						y: top - rootTop,
						inDragMode: true
					});
					return;
				}
				if (event.button === 0 && this.group.api.location.type !== "edge" && this.group.activePanel !== panel) this._activateOnPointerDown(panel);
			}), tab.onDrop((event) => {
				const animState = this._animState;
				this._animState = null;
				this._pendingCollapse = false;
				const tabIndex = this._tabs.findIndex((x) => x.value === tab);
				if (animState) {
					var _this$accessor$option3;
					const dropIndex = event.position === "right" ? tabIndex + 1 : tabIndex;
					if (animState.sourceTabGroupId) {
						var _animState$currentIns;
						this._commitGroupMove(animState.sourceTabGroupId, (_animState$currentIns = animState.currentInsertionIndex) !== null && _animState$currentIns !== void 0 ? _animState$currentIns : dropIndex);
						return;
					}
					this._reorder.uncollapseSourceTab(animState.sourceTabId);
					const firstPositions = this.snapshotTabPositions();
					this.resetTabTransforms();
					this._onDrop.fire({
						event: event.nativeEvent,
						index: dropIndex,
						targetTabGroupId: animState.targetTabGroupId
					});
					if (((_this$accessor$option3 = this.accessor.options.theme) === null || _this$accessor$option3 === void 0 ? void 0 : _this$accessor$option3.tabAnimation) === "smooth") this.runFlipAnimation(firstPositions, animState.sourceTabId, animState.sourceIndex === -1, animState.sourceIndex === -1 ? void 0 : {
						from: Math.min(animState.sourceIndex, dropIndex),
						to: Math.max(animState.sourceIndex, dropIndex)
					});
				} else {
					var _this$group$model$get, _this$group$model$get2;
					const afterPosition = this._direction === "vertical" ? "bottom" : "right";
					const insertionIndex = event.position === afterPosition ? tabIndex + 1 : tabIndex;
					const data = getPanelData();
					const sourceIndex = data ? this._tabs.findIndex((x) => x.value.panel.id === data.panelId) : -1;
					const adjustedIndex = insertionIndex - (sourceIndex !== -1 && sourceIndex < insertionIndex ? 1 : 0);
					const targetTabGroupId = (_this$group$model$get = (_this$group$model$get2 = this.group.model.getTabGroupForPanel(tab.panel.id)) === null || _this$group$model$get2 === void 0 ? void 0 : _this$group$model$get2.id) !== null && _this$group$model$get !== void 0 ? _this$group$model$get : null;
					this._onDrop.fire({
						event: event.nativeEvent,
						index: adjustedIndex,
						targetTabGroupId
					});
				}
			}), tab.onWillShowOverlay((event) => {
				this._onWillShowOverlay.fire(new DockviewWillShowOverlayLocationEvent(event, {
					kind: "tab",
					panel: this.group.activePanel,
					api: this.accessor.api,
					group: this.group,
					getData: getPanelData
				}));
			}))
		};
		this.addTab(value, index);
		this._scheduleOverflowRefresh();
		this._tabGroupManager.positionAllChips();
		if (this._animState) {
			this._animState.tabPositions = this.snapshotTabPositions();
			this._animState.chipSizes = this._tabGroupManager.snapshotChipSizes();
			this.applyDragOverTransforms();
		}
	}
	delete(id) {
		var _this$_animState5;
		const index = this.indexOf(id);
		if (index === -1) return;
		if (((_this$_animState5 = this._animState) === null || _this$_animState5 === void 0 ? void 0 : _this$_animState5.sourceTabId) === id) {
			this.resetTabTransforms();
			this._animState = null;
		}
		this._tabGroupManager.cleanupTransition(id);
		const { value, disposable } = this._tabs.splice(index, 1)[0];
		this._tabMap.delete(id);
		disposable.dispose();
		value.dispose();
		value.element.remove();
		this._scheduleOverflowRefresh();
		if (this._animState) {
			this._animState.tabPositions = this.snapshotTabPositions();
			this._animState.chipSizes = this._tabGroupManager.snapshotChipSizes();
			this.applyDragOverTransforms();
		}
	}
	addTab(tab, index = this._tabs.length) {
		if (index < 0 || index > this._tabs.length) throw new Error("invalid location");
		const refNode = index < this._tabs.length ? this._tabs[index].value.element : null;
		this._tabsList.insertBefore(tab.value.element, refNode);
		this._tabs = [
			...this._tabs.slice(0, index),
			tab,
			...this._tabs.slice(index)
		];
		this._tabMap.set(tab.value.panel.id, tab);
		if (this.selectedIndex < 0) this.selectedIndex = index;
	}
	/** Re-evaluate overflow after the tab list changed: the `OverflowObserver`
	*  only fires when the strip itself resizes. Coalesced on a microtask and
	*  evaluated the way the observer does. */
	_scheduleOverflowRefresh() {
		if (this._overflowRefreshPending || !this._showTabsOverflowControl) return;
		this._overflowRefreshPending = true;
		queueMicrotask(() => {
			this._overflowRefreshPending = false;
			if (this.isDisposed || !this._showTabsOverflowControl) return;
			const el = this._tabsList;
			const hasOverflow = el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
			this.toggleDropdown({ reset: !hasOverflow });
		});
	}
	toggleDropdown(options) {
		const hasForced = this._tabs.some((tab) => !this._overflowExclude(tab.value.panel.id) && this._forcedOverflow(tab.value.panel.id));
		if (options.reset && !hasForced) {
			this._onOverflowTabsChange.fire({
				tabs: [],
				tabGroups: [],
				pinnedTabs: [],
				reset: true
			});
			return;
		}
		const tabs = this._tabs.filter((tab) => !this._overflowExclude(tab.value.panel.id) && (this._forcedOverflow(tab.value.panel.id) || !options.reset && !isChildEntirelyVisibleWithinParent(tab.value.element, this._tabsList))).map((x) => x.value.panel.id);
		const pinnedTabs = options.reset ? [] : this._tabs.filter((tab) => this._overflowExclude(tab.value.panel.id) && tab.value.element.getBoundingClientRect().width > 0 && !isChildEntirelyVisibleWithinParent(tab.value.element, this._tabsList)).map((x) => x.value.panel.id);
		const overflowTabSet = new Set(tabs);
		const tabGroups = [];
		for (const tg of this.group.model.getTabGroups()) {
			const chipEntry = this._tabGroupManager.chipRenderers.get(tg.id);
			const chipClipped = chipEntry && !isChildEntirelyVisibleWithinParent(chipEntry.chip.element, this._tabsList);
			const allTabsOverflow = tg.panelIds.length > 0 && tg.panelIds.every((pid) => overflowTabSet.has(pid));
			if (chipClipped || allTabsOverflow) {
				tabGroups.push(tg.id);
				if (tg.collapsed) {
					for (const pid of tg.panelIds) if (!overflowTabSet.has(pid)) {
						overflowTabSet.add(pid);
						tabs.push(pid);
					}
				}
			}
		}
		this._onOverflowTabsChange.fire({
			tabs,
			tabGroups,
			pinnedTabs,
			reset: false
		});
	}
	updateDragAndDropState() {
		for (const tab of this._tabs) tab.value.updateDragAndDropState();
		this._tabGroupManager.updateDragAndDropState();
	}
	/**
	* Synchronize chip elements and CSS classes for all tab groups
	* in the parent group model. Call after any tab group mutation.
	*/
	updateTabGroups() {
		this._tabGroupManager.update();
	}
	refreshTabGroupAccent() {
		this._tabGroupManager.refreshAccents();
	}
	/**
	* Tabs-list-specific side effects of a chip drag start. The chip's
	* drag sources (constructed by `TabGroupManager`) own the transfer
	* payload, iframe shielding, dataTransfer setup, and the HTML5 drag
	* image. This method just sets up the smooth-reorder anim state and
	* collapses the source-group tabs in the tabs list.
	*/
	_handleChipDragStart(tabGroup, chip, event) {
		var _this$accessor$option4;
		const firstPanelId = tabGroup.panelIds[0];
		const firstIdx = firstPanelId ? this._tabs.findIndex((t) => t.value.panel.id === firstPanelId) : -1;
		const chipRect = chip.element.getBoundingClientRect();
		let groupGapSize = mainAxisSize(chipRect, this._direction);
		for (const pid of tabGroup.panelIds) {
			const tabEntry = this._tabMap.get(pid);
			if (tabEntry) groupGapSize += mainAxisSize(tabEntry.value.element.getBoundingClientRect(), this._direction);
		}
		this._animState = {
			sourceTabId: "",
			sourceIndex: firstIdx,
			tabPositions: this.snapshotTabPositions(),
			chipSizes: this._tabGroupManager.snapshotChipSizes(),
			currentInsertionIndex: null,
			targetTabGroupId: null,
			sourceTabGroupId: tabGroup.id,
			sourceGroupPanelIds: new Set(tabGroup.panelIds),
			sourceChipSize: mainAxisSize(chipRect, this._direction),
			cursorOffsetFromDragStart: mainAxisCursor(event, this._direction) - mainAxisStart(chipRect, this._direction),
			sourceGapSize: groupGapSize,
			containerStart: mainAxisStart(this._tabsList.getBoundingClientRect(), this._direction)
		};
		if (((_this$accessor$option4 = this.accessor.options.theme) === null || _this$accessor$option4 === void 0 ? void 0 : _this$accessor$option4.tabAnimation) !== "smooth") return;
		const groupPanelIds = new Set(tabGroup.panelIds);
		this._pendingCollapse = true;
		requestAnimationFrame(() => {
			var _this$_animState6, _this$_animState6$cur;
			this._pendingCollapse = false;
			if (!this._animState) return;
			for (const t of this._tabs) if (groupPanelIds.has(t.value.panel.id)) {
				t.value.element.style.transition = "none";
				toggleClass(t.value.element, "dv-tab--dragging", true);
			}
			const chipEntry = this._tabGroupManager.chipRenderers.get(tabGroup.id);
			if (chipEntry) {
				chipEntry.chip.element.style.transition = "none";
				toggleClass(chipEntry.chip.element, "dv-tab-group-chip--dragging", true);
			}
			this._tabsList.offsetHeight;
			const underline = this._tabGroupManager.groupUnderlines.get(tabGroup.id);
			if (underline) underline.style.display = "none";
			(_this$_animState6$cur = (_this$_animState6 = this._animState).currentInsertionIndex) !== null && _this$_animState6$cur !== void 0 || (_this$_animState6.currentInsertionIndex = firstIdx);
			this.applyDragOverTransforms(true);
			for (const t of this._tabs) if (groupPanelIds.has(t.value.panel.id)) t.value.element.style.removeProperty("transition");
			if (chipEntry) chipEntry.chip.element.style.removeProperty("transition");
		});
	}
	/**
	* A drop on a tab group chip means "insert before this group". Resolve to
	* the index of the group's first tab, adjusting for same-group removal
	* (when the source tab is currently to the left of the target slot, its
	* removal shifts the insertion index down by one). Always clears
	* `targetTabGroupId` so the dropped tab lands outside the group.
	*
	* A chip dropped on a chip is a group move: the panel path would route it
	* through the cross-group machinery, which rebuilds the tab group under a
	* new id.
	*/
	_handleChipDrop(tabGroup, event) {
		const firstPanelId = tabGroup.panelIds[0];
		if (!firstPanelId) return;
		const insertionIndex = this._tabs.findIndex((x) => x.value.panel.id === firstPanelId);
		if (insertionIndex === -1) return;
		const data = getPanelData();
		if (data === null || data === void 0 ? void 0 : data.tabGroupId) {
			var _animState$currentIns2;
			const animState = this._animState;
			this._animState = null;
			this._pendingCollapse = false;
			this._commitGroupMove(data.tabGroupId, (_animState$currentIns2 = animState === null || animState === void 0 ? void 0 : animState.currentInsertionIndex) !== null && _animState$currentIns2 !== void 0 ? _animState$currentIns2 : insertionIndex);
			return;
		}
		const sourceIndex = (data === null || data === void 0 ? void 0 : data.groupId) === this.group.id && (data === null || data === void 0 ? void 0 : data.panelId) ? this._tabs.findIndex((x) => x.value.panel.id === data.panelId) : -1;
		const adjustedIndex = insertionIndex - (sourceIndex !== -1 && sourceIndex < insertionIndex ? 1 : 0);
		this._onDrop.fire({
			event: event.nativeEvent,
			index: adjustedIndex,
			targetTabGroupId: null
		});
	}
	/**
	* Sets the broader container that is part of the same logical drop surface
	* as this tab list (e.g. the full header element).  When a dragleave from
	* the tabs list lands inside this container, `_animState` is preserved so
	* that external dragover listeners can continue the animation.
	*/
	setExtendedDropZone(el) {
		this._reorder.setExtendedDropZone(el);
	}
	/**
	* Allows external elements (e.g. void container, left actions) to push an
	* insertion index into the animation while the cursor is outside the tabs
	* list itself.  Pass `null` to clear the indicator.
	*/
	setExternalInsertionIndex(index) {
		this._reorder.setExternalInsertionIndex(index);
	}
	/**
	* Called when the drag cursor leaves the entire header area (not just the
	* tabs list).  Clears animation state for cross-group drags, which never
	* receive a `dragend` event on this tab list.
	*/
	clearExternalAnimState() {
		this._reorder.clearExternalAnimState();
	}
	snapshotTabPositions() {
		return this._reorder.snapshotTabPositions();
	}
	handleDragOver(event) {
		this._reorder.handleDragOver(event);
	}
	applyDragOverTransforms(skipTransition = false) {
		this._reorder.applyDragOverTransforms(skipTransition);
	}
	resetTabTransforms() {
		this._reorder.resetTabTransforms();
	}
	_commitGroupMove(sourceTabGroupId, insertionIndex) {
		this._reorder.commitGroupMove(sourceTabGroupId, insertionIndex);
	}
	runFlipAnimation(firstPositions, sourceTabId, isCrossGroup = false, animRange) {
		this._reorder.runFlipAnimation(firstPositions, sourceTabId, isCrossGroup, animRange);
	}
};

//#endregion
//#region src/dockview/components/titlebar/tabOverflowControl.ts
function createDropdownElementHandle() {
	const el = document.createElement("div");
	el.className = "dv-tabs-overflow-dropdown-default";
	const text = document.createElement("span");
	text.textContent = ``;
	const icon = createChevronRightButton();
	el.appendChild(icon);
	el.appendChild(text);
	return {
		element: el,
		update: (params) => {
			text.textContent = `${params.tabs}`;
		}
	};
}

//#endregion
//#region src/dockview/components/titlebar/tabsContainer.ts
var TabsContainer = class extends CompositeDisposable {
	get onTabDragStart() {
		return this.tabs.onTabDragStart;
	}
	get panels() {
		return this.tabs.panels;
	}
	get size() {
		return this.tabs.size;
	}
	get hidden() {
		return this._hidden;
	}
	set hidden(value) {
		this._hidden = value;
		this.element.style.display = value ? "none" : "";
	}
	get direction() {
		return this._direction;
	}
	set direction(value) {
		this._direction = value;
		if (value === "vertical") {
			addClasses(this._element, "dv-groupview-header-vertical");
			addClasses(this.rightActionsContainer, "dv-right-actions-container-vertical");
			this.tabs.direction = value;
		} else {
			removeClasses(this._element, "dv-groupview-header-vertical");
			removeClasses(this.rightActionsContainer, "dv-right-actions-container-vertical");
			this.tabs.direction = value;
		}
	}
	get element() {
		return this._element;
	}
	get tabsListElement() {
		return this.tabs.tabsListElement;
	}
	constructor(accessor, group) {
		super();
		this.accessor = accessor;
		this.group = group;
		this._hidden = false;
		this._direction = "horizontal";
		this._dropIndexResolver = (_panelId, index) => index;
		this._pinnedRow = void 0;
		this.dropdownPart = null;
		this._overflowTabs = [];
		this._overflowTabGroups = [];
		this._overflowPinnedTabs = [];
		this._dropdownDisposable = new MutableDisposable();
		this._onDrop = new Emitter();
		this.onDrop = this._onDrop.event;
		this._onGroupDragStart = new Emitter();
		this.onGroupDragStart = this._onGroupDragStart.event;
		this._onWillShowOverlay = new Emitter();
		this.onWillShowOverlay = this._onWillShowOverlay.event;
		this._element = document.createElement("div");
		this._element.className = "dv-tabs-and-actions-container";
		toggleClass(this._element, "dv-full-width-single-tab", this.accessor.options.singleTabMode === "fullwidth");
		this.rightActionsContainer = document.createElement("div");
		this.rightActionsContainer.className = "dv-right-actions-container";
		this.leftActionsContainer = document.createElement("div");
		this.leftActionsContainer.className = "dv-left-actions-container";
		this.preActionsContainer = document.createElement("div");
		this.preActionsContainer.className = "dv-pre-actions-container";
		this.tabs = new Tabs(group, accessor, { showTabsOverflowControl: !accessor.options.disableTabsOverflowList });
		this.voidContainer = new VoidContainer(this.accessor, this.group);
		this.tabs.voidContainer = this.voidContainer.element;
		this._element.appendChild(this.preActionsContainer);
		this._element.appendChild(this.tabs.element);
		this._element.appendChild(this.leftActionsContainer);
		this._element.appendChild(this.voidContainer.element);
		this._element.appendChild(this.rightActionsContainer);
		this.tabs.setExtendedDropZone(this._element);
		this.addDisposables(this.tabs.onDrop((e) => this._onDrop.fire(e)), this.tabs.onWillShowOverlay((e) => this._onWillShowOverlay.fire(e)), accessor.onDidOptionsChange(() => {
			this.tabs.showTabsOverflowControl = !accessor.options.disableTabsOverflowList;
		}), this.tabs.onOverflowTabsChange((event) => {
			this.toggleDropdown(event);
		}), this.tabs, this._onWillShowOverlay, this._onDrop, this._onGroupDragStart, this.voidContainer, this.voidContainer.onDragStart((event) => {
			this._onGroupDragStart.fire({
				nativeEvent: event,
				group: this.group
			});
		}), this.voidContainer.onDrop((event) => {
			if (this.tabs.handleVoidDrop()) return;
			this._onDrop.fire({
				event: event.nativeEvent,
				index: this.tabs.size
			});
		}), this.voidContainer.onWillShowOverlay((event) => {
			this._onWillShowOverlay.fire(new DockviewWillShowOverlayLocationEvent(event, {
				kind: "header_space",
				panel: this.group.activePanel,
				api: this.accessor.api,
				group: this.group,
				getData: getPanelData
			}));
		}), addDisposableListener(this.leftActionsContainer, "dragleave", (event) => {
			const related = event.relatedTarget;
			if (!this.leftActionsContainer.contains(related) && !this._element.contains(related)) this.tabs.clearExternalAnimState();
		}), addDisposableListener(this.voidContainer.element, "dragleave", (event) => {
			const related = event.relatedTarget;
			if (!this.voidContainer.element.contains(related)) if (this._element.contains(related)) this.tabs.setExternalInsertionIndex(null);
			else this.tabs.clearExternalAnimState();
		}), addDisposableListener(this.voidContainer.element, "pointerdown", (event) => {
			if (event.defaultPrevented) return;
			if (!this.accessor.options.disableFloatingGroups && event.shiftKey && this.group.api.location.type !== "floating" && this.group.api.location.type !== "edge") {
				event.preventDefault();
				const { top, left } = this.element.getBoundingClientRect();
				const { top: rootTop, left: rootLeft } = this.accessor.element.getBoundingClientRect();
				this.accessor.addFloatingGroup(this.group, {
					x: left - rootLeft + 20,
					y: top - rootTop + 20,
					inDragMode: true
				});
			}
		}));
	}
	show() {
		if (!this.hidden) this.element.style.display = "";
	}
	hide() {
		this._element.style.display = "none";
	}
	setRightActionsElement(element) {
		if (this.rightActions === element) return;
		if (this.rightActions) {
			this.rightActions.remove();
			this.rightActions = void 0;
		}
		if (element) {
			this.rightActionsContainer.appendChild(element);
			this.rightActions = element;
		}
	}
	setLeftActionsElement(element) {
		if (this.leftActions === element) return;
		if (this.leftActions) {
			this.leftActions.remove();
			this.leftActions = void 0;
		}
		if (element) {
			this.leftActionsContainer.appendChild(element);
			this.leftActions = element;
		}
	}
	setPrefixActionsElement(element) {
		if (this.preActions === element) return;
		if (this.preActions) {
			this.preActions.remove();
			this.preActions = void 0;
		}
		if (element) {
			this.preActionsContainer.appendChild(element);
			this.preActions = element;
		}
	}
	isActive(tab) {
		return this.tabs.isActive(tab);
	}
	indexOf(id) {
		return this.tabs.indexOf(id);
	}
	getTabId(panelId) {
		return this.tabs.getTabId(panelId);
	}
	getPanelForTab(element) {
		return this.tabs.getPanelForTab(element);
	}
	setActive(_isGroupActive) {}
	delete(id) {
		this.tabs.delete(id);
		this.updateClassnames();
	}
	setActivePanel(panel) {
		this.tabs.setActivePanel(panel);
	}
	focusActiveTab() {
		this.tabs.focusActiveTab();
	}
	openPanel(panel, index = this.tabs.size) {
		this.tabs.openPanel(panel, index);
		this.updateClassnames();
	}
	closePanel(panel) {
		this.delete(panel.id);
	}
	setOverflowExclude(fn) {
		this.tabs.setOverflowExclude(fn);
	}
	setForcedOverflow(fn) {
		this.tabs.setForcedOverflow(fn);
	}
	setPinnedSticky(enabled) {
		this.tabs.setPinnedSticky(enabled);
	}
	refreshOverflow() {
		this.tabs.refreshOverflow();
	}
	setPinnedRow(el) {
		if (this._pinnedRow === el) return;
		if (this._pinnedRow) this._pinnedRow.remove();
		this._pinnedRow = el;
		if (el) {
			el.classList.add("dv-pinned-row");
			this._element.insertBefore(el, this._element.firstChild);
		}
		toggleClass(this._element, "dv-tabs-and-actions-container--pinned-row", !!el);
	}
	setDropIndexResolver(fn) {
		this._dropIndexResolver = fn;
	}
	resolveDropIndex(panelId, index) {
		return this._dropIndexResolver(panelId, index);
	}
	updateClassnames() {
		toggleClass(this._element, "dv-single-tab", this.size === 1);
	}
	toggleDropdown(options) {
		const tabs = options.reset ? [] : options.tabs;
		const tabGroups = options.reset ? [] : options.tabGroups;
		const pinnedTabs = options.reset ? [] : options.pinnedTabs;
		this._overflowTabs = tabs;
		this._overflowTabGroups = tabGroups;
		this._overflowPinnedTabs = pinnedTabs;
		const totalCount = this._overflowTabs.length + this._overflowPinnedTabs.length;
		if (totalCount > 0 && this.dropdownPart) {
			this.dropdownPart.update({ tabs: totalCount });
			return;
		}
		if (totalCount === 0) {
			this._dropdownDisposable.dispose();
			return;
		}
		const root = document.createElement("div");
		root.className = "dv-tabs-overflow-dropdown-root";
		const part = createDropdownElementHandle();
		part.update({ tabs: totalCount });
		this.dropdownPart = part;
		root.appendChild(part.element);
		this.rightActionsContainer.prepend(root);
		this._dropdownDisposable.value = new CompositeDisposable(Disposable.from(() => {
			var _this$dropdownPart, _this$dropdownPart$di;
			root.remove();
			(_this$dropdownPart = this.dropdownPart) === null || _this$dropdownPart === void 0 || (_this$dropdownPart$di = _this$dropdownPart.dispose) === null || _this$dropdownPart$di === void 0 || _this$dropdownPart$di.call(_this$dropdownPart);
			this.dropdownPart = null;
		}), addDisposableListener(root, "pointerdown", (event) => {
			event.preventDefault();
		}, { capture: true }), addDisposableListener(root, "click", (event) => {
			const relativeParent = findRelativeZIndexParent(root);
			const anchor = {
				x: event.clientX,
				y: event.clientY,
				zIndex: (relativeParent === null || relativeParent === void 0 ? void 0 : relativeParent.style.zIndex) ? `calc(${relativeParent.style.zIndex} * 2)` : void 0
			};
			const { context, rowRenderers } = this.createOverflowRenderContext(root, anchor);
			const advancedOverflow = this.accessor.advancedOverflowService;
			try {
				if (advancedOverflow) advancedOverflow.renderOverflow({
					group: this.group,
					overflowTabs: [...this._overflowTabs],
					overflowTabGroups: [...this._overflowTabGroups],
					pinnedOverflowTabs: [...this._overflowPinnedTabs],
					context
				});
				else context.open(this.renderFreeOverflowList(context));
			} catch (err) {
				rowRenderers.dispose();
				throw err;
			}
		}));
	}
	/**
	* Build the core row/header builders + popover control shared by the free
	* overflow list and the advanced overflow module. Everything the module
	* needs to rebuild the dropdown body in a custom order lives here, so the
	* row DOM, group-header DOM, click-to-activate, and (critically) the
	* window-bound popover open/close stay in core, so the module never captures
	* the wrong `window` for a popped-out group.
	*/
	createOverflowRenderContext(root, anchor) {
		const overflowGroupSet = new Set(this._overflowTabGroups);
		const allTabGroups = this.group.model.getTabGroups();
		const panelToGroup = /* @__PURE__ */ new Map();
		const groupById = /* @__PURE__ */ new Map();
		for (const tg of allTabGroups) {
			groupById.set(tg.id, tg);
			if (overflowGroupSet.has(tg.id)) for (const pid of tg.panelIds) panelToGroup.set(pid, tg);
		}
		const popup = () => this.accessor.getPopupServiceForGroup(this.group);
		const rowRenderers = new CompositeDisposable();
		const buildGroupHeader = (tg) => {
			const groupHeader = document.createElement("div");
			groupHeader.className = "dv-tabs-overflow-group-header";
			const colorDot = document.createElement("span");
			colorDot.className = "dv-tabs-overflow-group-color";
			applyTabGroupAccent(colorDot, tg.color, this.accessor.tabGroupColorPalette);
			groupHeader.appendChild(colorDot);
			const labelSpan = document.createElement("span");
			labelSpan.className = "dv-tabs-overflow-group-label";
			labelSpan.textContent = tg.label || tg.id;
			groupHeader.appendChild(labelSpan);
			if (tg.collapsed) {
				const badge = document.createElement("span");
				badge.className = "dv-tabs-overflow-group-collapsed-badge";
				badge.textContent = `${tg.panelIds.length}`;
				groupHeader.appendChild(badge);
			}
			groupHeader.addEventListener("click", () => {
				popup().close();
				if (tg.collapsed) tg.expand();
				const firstPanelId = tg.panelIds[0];
				if (firstPanelId) {
					const panel = this.group.panels.find((p) => p.id === firstPanelId);
					this.accessor.withOrigin("user", () => panel === null || panel === void 0 ? void 0 : panel.api.setActive());
				}
			});
			return groupHeader;
		};
		return {
			context: {
				overflowGroupIdForPanel: (panelId) => {
					var _panelToGroup$get;
					return (_panelToGroup$get = panelToGroup.get(panelId)) === null || _panelToGroup$get === void 0 ? void 0 : _panelToGroup$get.id;
				},
				buildGroupHeader: (tabGroupId) => {
					const tg = groupById.get(tabGroupId);
					if (!tg || !overflowGroupSet.has(tg.id)) return;
					return buildGroupHeader(tg);
				},
				buildPinnedHeader: () => {
					const header = document.createElement("div");
					header.className = "dv-tabs-overflow-group-header dv-tabs-overflow-pinned-header";
					const glyph = createPinButton();
					glyph.classList.add("dv-tabs-overflow-pinned-icon");
					header.appendChild(glyph);
					const labelSpan = document.createElement("span");
					labelSpan.className = "dv-tabs-overflow-group-label";
					labelSpan.textContent = "Pinned";
					header.appendChild(labelSpan);
					return header;
				},
				buildRow: (panelId) => {
					const panel = this.group.panels.find((p) => p.id === panelId);
					if (!panel) return;
					const tab = this.tabs.tabs.find((t) => t.panel.id === panelId);
					const tg = panelToGroup.get(panelId);
					const tabComponent = panel.view.createTabRenderer("headerOverflow");
					let rowDisposed = false;
					const disposeRow = Disposable.from(() => {
						if (!rowDisposed) {
							var _tabComponent$dispose;
							rowDisposed = true;
							(_tabComponent$dispose = tabComponent.dispose) === null || _tabComponent$dispose === void 0 || _tabComponent$dispose.call(tabComponent);
						}
					});
					if (rowRenderers.isDisposed) disposeRow.dispose();
					else rowRenderers.addDisposables(disposeRow);
					const child = tabComponent.element;
					const wrapper = document.createElement("div");
					toggleClass(wrapper, "dv-tab", true);
					toggleClass(wrapper, "dv-active-tab", panel.api.isActive);
					toggleClass(wrapper, "dv-inactive-tab", !panel.api.isActive);
					if (tg) toggleClass(wrapper, "dv-tab--grouped", true);
					const doActivate = () => {
						if (tg === null || tg === void 0 ? void 0 : tg.collapsed) tg.expand();
						tab === null || tab === void 0 || tab.element.scrollIntoView({
							block: "nearest",
							inline: "nearest"
						});
						this.accessor.withOrigin("user", () => panel.api.setActive());
					};
					wrapper.addEventListener("click", (event) => {
						popup().close();
						if (event.defaultPrevented) return;
						doActivate();
					});
					wrapper.appendChild(child);
					return {
						element: wrapper,
						panel,
						activate: () => {
							popup().close();
							doActivate();
						},
						dispose: () => {
							rowRenderers.removeDisposable(disposeRow);
							disposeRow.dispose();
						}
					};
				},
				open: (body) => {
					popup().openPopover(body, anchor, { onClose: () => rowRenderers.dispose() });
				},
				close: () => popup().close(),
				focusTrigger: () => {
					root.tabIndex = -1;
					root.focus();
				}
			},
			rowRenderers
		};
	}
	/**
	* The free (module-absent) overflow list: the flat `.dv-tabs-overflow-container`
	* body with a group header before the first member tab of each overflow
	* group, in tab (DOM) order. Reuses the shared row/header builders so it
	* stays identical to the advanced path's per-row DOM.
	*/
	renderFreeOverflowList(context) {
		const el = document.createElement("div");
		el.style.overflow = "auto";
		el.className = "dv-tabs-overflow-container";
		const pinnedRows = this._overflowPinnedTabs.map((panelId) => context.buildRow(panelId)).filter((row) => row != null);
		if (pinnedRows.length > 0) {
			el.appendChild(context.buildPinnedHeader());
			for (const row of pinnedRows) el.appendChild(row.element);
		}
		const renderedGroups = /* @__PURE__ */ new Set();
		for (const tab of this.tabs.tabs.filter((tab) => this._overflowTabs.includes(tab.panel.id))) {
			const tgId = context.overflowGroupIdForPanel(tab.panel.id);
			if (tgId && !renderedGroups.has(tgId)) {
				renderedGroups.add(tgId);
				const header = context.buildGroupHeader(tgId);
				if (header) el.appendChild(header);
			}
			const row = context.buildRow(tab.panel.id);
			if (row) el.appendChild(row.element);
		}
		return el;
	}
	updateDragAndDropState() {
		this.tabs.updateDragAndDropState();
		this.voidContainer.updateDragAndDropState();
	}
	updateTabGroups() {
		this.tabs.updateTabGroups();
	}
	refreshTabGroupAccent() {
		this.tabs.refreshTabGroupAccent();
	}
};

//#endregion
//#region src/dockview/tabGroup.ts
var TabGroup = class extends CompositeDisposable {
	get label() {
		return this._label;
	}
	get color() {
		return this._color;
	}
	get componentParams() {
		return this._componentParams;
	}
	setLabel(value) {
		if (this.isDisposed || this._label === value) return;
		this._label = value;
		this._onDidChange.fire();
	}
	setColor(value) {
		if (this.isDisposed) return;
		const next = value === "" ? void 0 : value;
		if (this._color === next) return;
		this._color = next;
		this._onDidChange.fire();
	}
	setComponentParams(value) {
		if (this.isDisposed) return;
		this._componentParams = value;
		this._onDidChange.fire();
	}
	get collapsed() {
		return this._collapsed;
	}
	get panelIds() {
		return this._panelIds;
	}
	get size() {
		return this._panelIds.length;
	}
	get isEmpty() {
		return this._panelIds.length === 0;
	}
	constructor(id, options) {
		var _options$label, _options$collapsed;
		super();
		this.id = id;
		this._collapsed = false;
		this._panelIds = [];
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		this._onDidPanelChange = new Emitter();
		this.onDidPanelChange = this._onDidPanelChange.event;
		this._onDidCollapseChange = new Emitter();
		this.onDidCollapseChange = this._onDidCollapseChange.event;
		this._onDidDestroy = new Emitter();
		this.onDidDestroy = this._onDidDestroy.event;
		this._label = (_options$label = options === null || options === void 0 ? void 0 : options.label) !== null && _options$label !== void 0 ? _options$label : "";
		this._color = (options === null || options === void 0 ? void 0 : options.color) === "" ? void 0 : options === null || options === void 0 ? void 0 : options.color;
		this._collapsed = (_options$collapsed = options === null || options === void 0 ? void 0 : options.collapsed) !== null && _options$collapsed !== void 0 ? _options$collapsed : false;
		this._componentParams = options === null || options === void 0 ? void 0 : options.componentParams;
		this.addDisposables(this._onDidChange, this._onDidPanelChange, this._onDidCollapseChange, this._onDidDestroy);
	}
	addPanel(panelId, index) {
		if (this.isDisposed) return;
		if (this._panelIds.includes(panelId)) return;
		const insertIndex = index === void 0 ? this._panelIds.length : Math.max(0, Math.min(index, this._panelIds.length));
		this._panelIds.splice(insertIndex, 0, panelId);
		this._onDidPanelChange.fire({
			panelId,
			type: "add"
		});
	}
	removePanel(panelId) {
		if (this.isDisposed) return false;
		const index = this._panelIds.indexOf(panelId);
		if (index === -1) return false;
		this._panelIds.splice(index, 1);
		this._onDidPanelChange.fire({
			panelId,
			type: "remove"
		});
		return true;
	}
	indexOfPanel(panelId) {
		return this._panelIds.indexOf(panelId);
	}
	containsPanel(panelId) {
		return this._panelIds.includes(panelId);
	}
	collapse() {
		if (this.isDisposed || this._collapsed) return;
		this._collapsed = true;
		this._onDidCollapseChange.fire(true);
	}
	expand() {
		if (this.isDisposed || !this._collapsed) return;
		this._collapsed = false;
		this._onDidCollapseChange.fire(false);
	}
	toggle() {
		if (this._collapsed) this.expand();
		else this.collapse();
	}
	toJSON() {
		const result = {
			id: this.id,
			collapsed: this._collapsed,
			panelIds: [...this._panelIds]
		};
		if (this._label) result.label = this._label;
		if (this._color !== void 0) result.color = this._color;
		if (this._componentParams !== void 0) result.componentParams = this._componentParams;
		return result;
	}
	dispose() {
		this._onDidDestroy.fire();
		super.dispose();
	}
};

//#endregion
//#region src/dockview/dockviewGroupPanelModel.ts
var DockviewDidDropEvent = class extends DockviewEvent {
	/**
	* `PointerEvent` for touch drags has no `dataTransfer`; use
	* `getData()` for the dockview payload regardless of input method.
	*/
	get nativeEvent() {
		return this.options.nativeEvent;
	}
	get position() {
		return this.options.position;
	}
	get panel() {
		return this.options.panel;
	}
	/**
	* For a drop on a group's tab bar, the tab index the drop landed at:
	* where a panel added in response belongs (`addPanel`'s `index`, or
	* `addGroupFromJSON` with `direction: 'within'`). `undefined` for a
	* drop on a group's content or a layout edge.
	*/
	get index() {
		return this.options.index;
	}
	get group() {
		return this.options.group;
	}
	get api() {
		return this.options.api;
	}
	constructor(options) {
		super();
		this.options = options;
	}
	getData() {
		return this.options.getData();
	}
};
var DockviewWillDropEvent = class extends DockviewDidDropEvent {
	get kind() {
		return this._kind;
	}
	/** The drop came from an edge-group drop zone (the dock-to-edge strip, or
	*  a resolver cell marked `edgeGroup`). */
	get edgeGroup() {
		return this._edgeGroup;
	}
	constructor(options) {
		super(options);
		this._kind = options.kind;
		this._edgeGroup = !!options.edgeGroup;
	}
};
var DockviewGroupPanelModel = class extends CompositeDisposable {
	get tabGroups() {
		return this._tabGroups;
	}
	get element() {
		throw new Error("dockview: not supported");
	}
	get activePanel() {
		return this._activePanel;
	}
	/** DOM id of the content container (the group's tabpanel), referenced by each tab's `aria-controls`. */
	get contentContainerId() {
		return this.contentContainer.element.id;
	}
	/** The group's content drop target; lets keyboard docking preview a drop here. */
	get contentDropTarget() {
		return this.contentContainer.dropTarget;
	}
	get locked() {
		return this._locked;
	}
	set locked(value) {
		this._locked = value;
		toggleClass(this.container, "dv-locked-groupview", value === "no-drop-target" || value);
	}
	get isActive() {
		return this._isGroupActive;
	}
	get panels() {
		return this._panels;
	}
	get size() {
		return this._panels.length;
	}
	get isEmpty() {
		return this._panels.length === 0;
	}
	get hasWatermark() {
		return !!(this.watermark && this.container.contains(this.watermark.element));
	}
	get header() {
		return this.tabsContainer;
	}
	/** The scrollable tab list element (`.dv-tabs-container`), exposed for the
	*  multi-row wrap controller to measure rows / toggle the wrap class. */
	get tabsListElement() {
		return this.tabsContainer.tabsListElement;
	}
	/** The panel whose tab owns `element` (the tab itself or a descendant of
	*  it), or `undefined` when the target isn't a tab. The robust inverse of a
	*  tab→panel lookup, with no positional/DOM-order assumptions. */
	getPanelForTab(element) {
		return this.tabsContainer.getPanelForTab(element);
	}
	get isContentFocused() {
		const element = this.contentContainer.element;
		const activeElement = getActiveElement(element);
		if (!activeElement) return false;
		return isAncestor(activeElement, element);
	}
	get headerPosition() {
		var _this$_headerPosition;
		return (_this$_headerPosition = this._headerPosition) !== null && _this$_headerPosition !== void 0 ? _this$_headerPosition : "top";
	}
	set headerPosition(value) {
		this._headerPosition = value;
		this.invalidateHeaderSize();
		removeClasses(this.container, "dv-groupview-header-top", "dv-groupview-header-bottom", "dv-groupview-header-left", "dv-groupview-header-right");
		addClasses(this.container, `dv-groupview-header-${value}`);
		const direction = value === "top" || value === "bottom" ? "horizontal" : "vertical";
		const previousDirection = this._headerDirection;
		this._headerDirection = direction;
		this.tabsContainer.direction = direction;
		this.header.direction = direction;
		if (this.panels.length > 0) this.layoutContent();
		this.updateHeaderActions();
		if (previousDirection !== void 0 && previousDirection !== direction) {
			var _this$groupPanel;
			(_this$groupPanel = this.groupPanel) === null || _this$groupPanel === void 0 || _this$groupPanel.api._onDidHeaderDirectionChange.fire({
				direction,
				position: value
			});
		}
	}
	get location() {
		return this._location;
	}
	set location(value) {
		this._location = value;
		toggleClass(this.container, "dv-groupview-floating", false);
		toggleClass(this.container, "dv-groupview-popout", false);
		toggleClass(this.container, "dv-groupview-edge", false);
		const applyZones = (zones) => {
			this.contentContainer.dropTarget.setTargetZones(zones);
			this.contentContainer.pointerDropTarget.setTargetZones(zones);
		};
		switch (value.type) {
			case "grid":
				applyZones([
					"top",
					"bottom",
					"left",
					"right",
					"center"
				]);
				break;
			case "floating":
				applyZones([
					"top",
					"bottom",
					"left",
					"right",
					"center"
				]);
				toggleClass(this.container, "dv-groupview-floating", true);
				break;
			case "popout":
				applyZones([
					"top",
					"bottom",
					"left",
					"right",
					"center"
				]);
				toggleClass(this.container, "dv-groupview-popout", true);
				break;
			case "edge":
				applyZones(["center"]);
				toggleClass(this.container, "dv-groupview-edge", true);
				break;
		}
		this.groupPanel.api._onDidLocationChange.fire({ location: this.location });
	}
	constructor(container, accessor, id, options, groupPanel) {
		var _options$locked, _options$headerPositi;
		super();
		this.container = container;
		this.accessor = accessor;
		this.id = id;
		this.options = options;
		this.groupPanel = groupPanel;
		this._isGroupActive = false;
		this._locked = false;
		this._location = { type: "grid" };
		this.mostRecentlyUsed = [];
		this._overwriteRenderContainer = null;
		this._overwriteDropTargetContainer = null;
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		this._width = 0;
		this._height = 0;
		this._panels = [];
		this._panelDisposables = /* @__PURE__ */ new Map();
		this._tabGroupDisposables = /* @__PURE__ */ new Map();
		this._pendingMicrotaskDisposables = /* @__PURE__ */ new Set();
		this._onMove = new Emitter();
		this.onMove = this._onMove.event;
		this._onDidDrop = new Emitter();
		this.onDidDrop = this._onDidDrop.event;
		this._onWillDrop = new Emitter();
		this.onWillDrop = this._onWillDrop.event;
		this._onWillShowOverlay = new Emitter();
		this.onWillShowOverlay = this._onWillShowOverlay.event;
		this._onTabDragStart = new Emitter();
		this.onTabDragStart = this._onTabDragStart.event;
		this._onGroupDragStart = new Emitter();
		this.onGroupDragStart = this._onGroupDragStart.event;
		this._onDidAddPanel = new Emitter();
		this.onDidAddPanel = this._onDidAddPanel.event;
		this._onDidPanelTitleChange = new Emitter();
		this.onDidPanelTitleChange = this._onDidPanelTitleChange.event;
		this._onDidPanelParametersChange = new Emitter();
		this.onDidPanelParametersChange = this._onDidPanelParametersChange.event;
		this._onDidRemovePanel = new Emitter();
		this.onDidRemovePanel = this._onDidRemovePanel.event;
		this._onDidActivePanelChange = new Emitter();
		this.onDidActivePanelChange = this._onDidActivePanelChange.event;
		this._onUnhandledDragOver = new Emitter();
		this.onUnhandledDragOver = this._onUnhandledDragOver.event;
		this._tabGroups = [];
		this._tabGroupMap = /* @__PURE__ */ new Map();
		this._panelToTabGroup = /* @__PURE__ */ new Map();
		this._tabGroupIdCounter = 0;
		this._pendingTabGroupUpdate = false;
		this._onDidCreateTabGroup = new Emitter();
		this.onDidCreateTabGroup = this._onDidCreateTabGroup.event;
		this._onDidDestroyTabGroup = new Emitter();
		this.onDidDestroyTabGroup = this._onDidDestroyTabGroup.event;
		this._onDidAddPanelToTabGroup = new Emitter();
		this.onDidAddPanelToTabGroup = this._onDidAddPanelToTabGroup.event;
		this._onDidRemovePanelFromTabGroup = new Emitter();
		this.onDidRemovePanelFromTabGroup = this._onDidRemovePanelFromTabGroup.event;
		this._onDidTabGroupChange = new Emitter();
		this.onDidTabGroupChange = this._onDidTabGroupChange.event;
		this._onDidTabGroupCollapsedChange = new Emitter();
		this.onDidTabGroupCollapsedChange = this._onDidTabGroupCollapsedChange.event;
		toggleClass(this.container, "dv-groupview", true);
		this.container.setAttribute("role", "region");
		this._api = new DockviewApi(this.accessor);
		this.tabsContainer = new TabsContainer(this.accessor, this.groupPanel);
		this.contentContainer = new ContentContainer(this.accessor, this);
		container.append(this.tabsContainer.element, this.contentContainer.element);
		this.header.hidden = !!options.hideHeader;
		this.locked = (_options$locked = options.locked) !== null && _options$locked !== void 0 ? _options$locked : false;
		this.headerPosition = (_options$headerPositi = options.headerPosition) !== null && _options$headerPositi !== void 0 ? _options$headerPositi : accessor.defaultHeaderPosition;
		this.addDisposables(watchElementResize(this.tabsContainer.element, () => {
			if (this.isDisposed) return;
			const size = this.measureHeaderSize();
			if (size !== this._cachedHeaderSize) {
				this._cachedHeaderSize = size;
				this.layout(this._width, this._height);
			}
		}), this._onDidPanelTitleChange.event(() => this.updateAccessibleLabel()), this._onTabDragStart, this._onGroupDragStart, this._onWillShowOverlay, this.tabsContainer.onTabDragStart((event) => {
			this._onTabDragStart.fire(event);
		}), this.tabsContainer.onGroupDragStart((event) => {
			this._onGroupDragStart.fire(event);
		}), this.tabsContainer.onDrop((event) => {
			var _dragData$panelId;
			const dragData = getPanelData();
			const draggedPanelId = (_dragData$panelId = dragData === null || dragData === void 0 ? void 0 : dragData.panelId) !== null && _dragData$panelId !== void 0 ? _dragData$panelId : null;
			const resolvedIndex = draggedPanelId ? this.tabsContainer.resolveDropIndex(draggedPanelId, event.index) : event.index;
			this.handleDropEvent("header", event.event, "center", resolvedIndex);
			if (draggedPanelId && event.targetTabGroupId) {
				const tabGroup = this._tabGroupMap.get(event.targetTabGroupId);
				let localIndex;
				if (tabGroup) {
					const globalIdx = this._panels.findIndex((p) => p.id === draggedPanelId);
					if (globalIdx !== -1) {
						localIndex = 0;
						for (const pid of tabGroup.panelIds) if (this._panels.findIndex((p) => p.id === pid) < globalIdx) localIndex++;
					}
				}
				this.addPanelToTabGroup(event.targetTabGroupId, draggedPanelId, localIndex);
			} else if (draggedPanelId && event.targetTabGroupId === null) this.removePanelFromTabGroup(draggedPanelId);
		}), this.contentContainer.onDidFocus(() => {
			this.accessor.doSetGroupActive(this.groupPanel);
		}), this.contentContainer.onDidBlur(() => {}), this.contentContainer.dropTarget.onDrop((event) => {
			this.handleDropEvent("content", event.nativeEvent, event.position, void 0, event.edge, event.edgeGroup);
		}), this.contentContainer.pointerDropTarget.onDrop((event) => {
			this.handleDropEvent("content", event.nativeEvent, event.position, void 0, event.edge, event.edgeGroup);
		}), this.tabsContainer.onWillShowOverlay((event) => {
			this._onWillShowOverlay.fire(event);
		}), this.contentContainer.dropTarget.onWillShowOverlay((event) => {
			this._onWillShowOverlay.fire(new DockviewWillShowOverlayLocationEvent(event, {
				kind: "content",
				panel: this.activePanel,
				api: this._api,
				group: this.groupPanel,
				getData: getPanelData
			}));
		}), this.contentContainer.pointerDropTarget.onWillShowOverlay((event) => {
			this._onWillShowOverlay.fire(new DockviewWillShowOverlayLocationEvent(event, {
				kind: "content",
				panel: this.activePanel,
				api: this._api,
				group: this.groupPanel,
				getData: getPanelData
			}));
		}), this._onMove, this._onDidChange, this._onDidDrop, this._onWillDrop, this._onDidAddPanel, this._onDidRemovePanel, this._onDidActivePanelChange, this._onUnhandledDragOver, this._onDidPanelTitleChange, this._onDidPanelParametersChange, this._onDidCreateTabGroup, this._onDidDestroyTabGroup, this._onDidAddPanelToTabGroup, this._onDidRemovePanelFromTabGroup, this._onDidTabGroupChange, this._onDidTabGroupCollapsedChange, this._onDidCreateTabGroup.event(() => {
			this._scheduleTabGroupUpdate();
		}), this._onDidDestroyTabGroup.event(() => {
			this._scheduleTabGroupUpdate();
		}), this._onDidAddPanelToTabGroup.event(() => {
			this._scheduleTabGroupUpdate();
		}), this._onDidRemovePanelFromTabGroup.event(() => {
			this._scheduleTabGroupUpdate();
		}), this._onDidTabGroupChange.event(() => {
			this._scheduleTabGroupUpdate();
		}), this._onDidTabGroupCollapsedChange.event(() => {
			this._scheduleTabGroupUpdate();
		}));
	}
	_scheduleTabGroupUpdate() {
		if (this._pendingTabGroupUpdate) return;
		this._pendingTabGroupUpdate = true;
		queueMicrotask(() => {
			this._pendingTabGroupUpdate = false;
			if (!this.isDisposed) this.tabsContainer.updateTabGroups();
		});
	}
	/**
	* Bracket a tab-group mutation as a layout transaction. `accessor` is
	* always a full {@link DockviewComponent} in production; the optional-call
	* fallback keeps partial test doubles (which omit `mutation`) working.
	* When nested inside a larger operation (a drag-driven move, fromJSON
	* restore) the component's depth counter folds it into the outer one.
	*/
	_bracketTabGroupMutation(func) {
		return this.accessor.mutation ? this.accessor.mutation("tab-group", func) : func();
	}
	createTabGroup(options) {
		return this._bracketTabGroupMutation(() => this._doCreateTabGroup(options));
	}
	_doCreateTabGroup(options) {
		var _options$id;
		const id = (_options$id = options === null || options === void 0 ? void 0 : options.id) !== null && _options$id !== void 0 ? _options$id : `tg-${this.id}-${this._tabGroupIdCounter++}`;
		const tabGroup = new TabGroup(id, {
			label: options === null || options === void 0 ? void 0 : options.label,
			color: options === null || options === void 0 ? void 0 : options.color,
			collapsed: options === null || options === void 0 ? void 0 : options.collapsed,
			componentParams: options === null || options === void 0 ? void 0 : options.componentParams
		});
		this._tabGroups.push(tabGroup);
		this._tabGroupMap.set(id, tabGroup);
		this._tabGroupDisposables.set(id, new CompositeDisposable(tabGroup.onDidChange(() => {
			this._onDidTabGroupChange.fire({ tabGroup });
		}), tabGroup.onDidCollapseChange((isCollapsed) => {
			if (isCollapsed) this._handleGroupCollapse(tabGroup);
			else this._handleGroupExpand(tabGroup);
			this._onDidTabGroupCollapsedChange.fire({ tabGroup });
		}), tabGroup.onDidDestroy(() => {
			this._removeTabGroupInternal(tabGroup);
		})));
		this._onDidCreateTabGroup.fire({ tabGroup });
		return tabGroup;
	}
	dissolveTabGroup(tabGroupId) {
		const tabGroup = this._tabGroupMap.get(tabGroupId);
		if (!tabGroup) return;
		this._bracketTabGroupMutation(() => {
			const panelIds = [...tabGroup.panelIds];
			for (const panelId of panelIds) {
				tabGroup.removePanel(panelId);
				this._panelToTabGroup.delete(panelId);
				this._onDidRemovePanelFromTabGroup.fire({
					tabGroup,
					panelId
				});
			}
			tabGroup.dispose();
		});
	}
	addPanelToTabGroup(tabGroupId, panelId, index) {
		const tabGroup = this._tabGroupMap.get(tabGroupId);
		if (!tabGroup) return;
		if (!this._panels.some((p) => p.id === panelId)) return;
		const existingGroup = this.getTabGroupForPanel(panelId);
		if ((existingGroup === null || existingGroup === void 0 ? void 0 : existingGroup.id) === tabGroupId) return;
		this._bracketTabGroupMutation(() => {
			if (existingGroup) this.removePanelFromTabGroup(panelId);
			tabGroup.addPanel(panelId, index);
			this._panelToTabGroup.set(panelId, tabGroup);
			this._enforceContiguity(tabGroup, panelId);
			this._onDidAddPanelToTabGroup.fire({
				tabGroup,
				panelId
			});
		});
	}
	/**
	* Move a panel to a new index within its tab group.
	* Updates both the group's panelIds order and the flat _panels array.
	*/
	movePanelWithinGroup(tabGroupId, panelId, newIndex) {
		const tabGroup = this._tabGroupMap.get(tabGroupId);
		if (!(tabGroup === null || tabGroup === void 0 ? void 0 : tabGroup.containsPanel(panelId))) return;
		tabGroup.removePanel(panelId);
		tabGroup.addPanel(panelId, newIndex);
		this._enforceContiguity(tabGroup, panelId);
		this.tabsContainer.updateTabGroups();
	}
	/**
	* Move a panel from one tab group to another.
	*/
	movePanelBetweenGroups(sourcePanelId, targetTabGroupId, targetIndex) {
		const sourceGroup = this._findTabGroupForPanel(sourcePanelId);
		const targetGroup = this._tabGroupMap.get(targetTabGroupId);
		if (!targetGroup) return;
		if (sourceGroup) {
			sourceGroup.removePanel(sourcePanelId);
			this._panelToTabGroup.delete(sourcePanelId);
			this._moveOutOfGroupSpan(sourceGroup, sourcePanelId);
			this._onDidRemovePanelFromTabGroup.fire({
				tabGroup: sourceGroup,
				panelId: sourcePanelId
			});
			if (sourceGroup.isEmpty) sourceGroup.dispose();
		}
		targetGroup.addPanel(sourcePanelId, targetIndex);
		this._panelToTabGroup.set(sourcePanelId, targetGroup);
		this._enforceContiguity(targetGroup, sourcePanelId);
		this._onDidAddPanelToTabGroup.fire({
			tabGroup: targetGroup,
			panelId: sourcePanelId
		});
	}
	/**
	* Move an entire tab group to a new position in the tab bar.
	* The group's internal panel order is preserved.
	*/
	moveTabGroup(tabGroupId, targetIndex) {
		const tabGroup = this._tabGroupMap.get(tabGroupId);
		if (!tabGroup || tabGroup.panelIds.length === 0) return;
		const groupPanelIds = new Set(tabGroup.panelIds);
		const groupPanels = tabGroup.panelIds.map((pid) => this._panels.find((p) => p.id === pid)).filter((p) => p !== void 0);
		if (groupPanels.length === 0) return;
		let groupPanelsBefore = 0;
		for (let i = 0; i < Math.min(targetIndex, this._panels.length); i++) if (groupPanelIds.has(this._panels[i].id)) groupPanelsBefore++;
		for (const panel of groupPanels) {
			const idx = this._panels.indexOf(panel);
			if (idx !== -1) this._panels.splice(idx, 1);
		}
		const adjustedIndex = targetIndex - groupPanelsBefore;
		const insertAt = Math.max(0, Math.min(adjustedIndex, this._panels.length));
		this._panels.splice(insertAt, 0, ...groupPanels);
		for (const panel of this._panels) this.tabsContainer.delete(panel.id);
		for (let i = 0; i < this._panels.length; i++) this.tabsContainer.openPanel(this._panels[i], i);
		this._syncActiveTab();
		this.tabsContainer.updateTabGroups();
	}
	/**
	* Ensure a panel is at the correct global index in _panels
	* to maintain contiguity of its tab group members.
	*/
	_enforceContiguity(tabGroup, panelId) {
		const panel = this._panels.find((p) => p.id === panelId);
		if (!panel) return;
		const localIndex = tabGroup.indexOfPanel(panelId);
		const globalIndex = this._computeGlobalIndex(tabGroup, localIndex);
		const currentIndex = this._panels.indexOf(panel);
		if (currentIndex === globalIndex) return;
		this._panels.splice(currentIndex, 1);
		const adjustedIndex = globalIndex > currentIndex ? globalIndex - 1 : globalIndex;
		this._panels.splice(adjustedIndex, 0, panel);
		this._reinsertTab(panel, adjustedIndex);
	}
	/** Move `panel`'s tab to `index` by delete + re-open. The fresh `Tab`
	*  renders inactive under a new DOM id, so the active highlight and the
	*  tabpanel's `aria-labelledby` are re-applied when it is the active one. */
	_reinsertTab(panel, index) {
		this.tabsContainer.delete(panel.id);
		this.tabsContainer.openPanel(panel, index);
		if (panel === this._activePanel) this._syncActiveTab();
	}
	/** Point the strip's active highlight and the tabpanel's
	*  `aria-labelledby` at `_activePanel`'s current tab element. */
	_syncActiveTab() {
		if (!this._activePanel) return;
		this.tabsContainer.setActivePanel(this._activePanel);
		this.contentContainer.setLabelledBy(this.tabsContainer.getTabId(this._activePanel.id));
	}
	/**
	* Compute the global index in _panels for a group-local index.
	* Finds where the group's panels start in the flat array and offsets.
	*/
	_computeGlobalIndex(tabGroup, localIndex) {
		const groupPanelIds = tabGroup.panelIds;
		if (groupPanelIds.length <= 1) {
			const panel = this._panels.find((p) => p.id === groupPanelIds[0]);
			return panel ? this._panels.indexOf(panel) : this._panels.length;
		}
		for (let i = 0; i < groupPanelIds.length; i++) {
			if (i === localIndex) continue;
			const existingPanel = this._panels.find((p) => p.id === groupPanelIds[i]);
			if (existingPanel) {
				const existingGlobalIndex = this._panels.indexOf(existingPanel);
				return Math.max(0, existingGlobalIndex + (localIndex - i));
			}
		}
		return this._panels.length;
	}
	removePanelFromTabGroup(panelId) {
		const tabGroup = this._findTabGroupForPanel(panelId);
		if (!tabGroup) return;
		this._bracketTabGroupMutation(() => {
			tabGroup.removePanel(panelId);
			this._panelToTabGroup.delete(panelId);
			this._moveOutOfGroupSpan(tabGroup, panelId);
			this._onDidRemovePanelFromTabGroup.fire({
				tabGroup,
				panelId
			});
			if (tabGroup.isEmpty) tabGroup.dispose();
		});
	}
	/** Keep a group's members contiguous: a panel that left `tabGroup` while
	*  sitting between two members moves to just after the group. No-op for an
	*  edge member or a panel no longer in this model. */
	_moveOutOfGroupSpan(tabGroup, panelId) {
		const currentIndex = this._panels.findIndex((p) => p.id === panelId);
		if (currentIndex === -1 || tabGroup.isEmpty) return;
		const memberIds = tabGroup.panelIds;
		const firstIdx = this._panels.findIndex((p) => p.id === memberIds[0]);
		const lastIdx = this._panels.findIndex((p) => p.id === memberIds[memberIds.length - 1]);
		if (firstIdx === -1 || lastIdx === -1 || currentIndex < firstIdx || currentIndex > lastIdx) return;
		const [panel] = this._panels.splice(currentIndex, 1);
		this._panels.splice(lastIdx, 0, panel);
		this._reinsertTab(panel, lastIdx);
	}
	getTabGroups() {
		return this._tabGroups;
	}
	updateTabGroups() {
		this.tabsContainer.updateTabGroups();
	}
	refreshTabGroupAccent() {
		this.tabsContainer.refreshTabGroupAccent();
	}
	refreshWatermark() {
		if (this.watermark) {
			var _this$watermark$dispo, _this$watermark;
			this.watermark.element.remove();
			(_this$watermark$dispo = (_this$watermark = this.watermark).dispose) === null || _this$watermark$dispo === void 0 || _this$watermark$dispo.call(_this$watermark);
			this.watermark = void 0;
		}
		this.updateContainer();
	}
	getTabGroupForPanel(panelId) {
		return this._findTabGroupForPanel(panelId);
	}
	_findTabGroupForPanel(panelId) {
		return this._panelToTabGroup.get(panelId);
	}
	_removeTabGroupInternal(tabGroup) {
		const index = this._tabGroups.indexOf(tabGroup);
		if (index !== -1) {
			this._tabGroups.splice(index, 1);
			this._tabGroupMap.delete(tabGroup.id);
			for (const panelId of tabGroup.panelIds) this._panelToTabGroup.delete(panelId);
			this._onDidDestroyTabGroup.fire({ tabGroup });
			const tabGroupDisposable = this._tabGroupDisposables.get(tabGroup.id);
			this._tabGroupDisposables.delete(tabGroup.id);
			if (tabGroupDisposable) {
				this._pendingMicrotaskDisposables.add(tabGroupDisposable);
				queueMicrotask(() => {
					this._pendingMicrotaskDisposables.delete(tabGroupDisposable);
					tabGroupDisposable.dispose();
				});
			}
		}
	}
	_handleGroupCollapse(tabGroup) {
		if (!this._activePanel) return;
		if (!tabGroup.containsPanel(this._activePanel.id)) return;
		const activePanelIndex = this._panels.indexOf(this._activePanel);
		for (let i = activePanelIndex + 1; i < this._panels.length; i++) {
			const candidate = this._panels[i];
			const candidateGroup = this._findTabGroupForPanel(candidate.id);
			if (!(candidateGroup === null || candidateGroup === void 0 ? void 0 : candidateGroup.collapsed)) {
				this.doSetActivePanel(candidate);
				this.updateContainer();
				return;
			}
		}
		for (let i = activePanelIndex - 1; i >= 0; i--) {
			const candidate = this._panels[i];
			const candidateGroup = this._findTabGroupForPanel(candidate.id);
			if (!(candidateGroup === null || candidateGroup === void 0 ? void 0 : candidateGroup.collapsed)) {
				this.doSetActivePanel(candidate);
				this.updateContainer();
				return;
			}
		}
		this.contentContainer.closePanel();
		this.doSetActivePanel(void 0);
		this.updateContainer();
	}
	_handleGroupExpand(tabGroup) {
		if (this._activePanel) return;
		const firstPanelId = tabGroup.panelIds[0];
		if (firstPanelId) {
			const panel = this._panels.find((p) => p.id === firstPanelId);
			if (panel) {
				this.doSetActivePanel(panel);
				this.updateContainer();
			}
		}
	}
	/** Restore tab groups from serialized data (used by fromJSON) */
	restoreTabGroups(serializedGroups) {
		for (const data of serializedGroups) {
			const match = /-(\d+)$/.exec(data.id);
			if (match) {
				const num = Number.parseInt(match[1], 10) + 1;
				if (num > this._tabGroupIdCounter) this._tabGroupIdCounter = num;
			}
		}
		for (const data of serializedGroups) {
			const tabGroup = this.createTabGroup({
				id: data.id,
				label: data.label,
				color: data.color,
				componentParams: data.componentParams
			});
			const concreteGroup = this._tabGroupMap.get(tabGroup.id);
			for (const panelId of data.panelIds) if (this._panels.some((p) => p.id === panelId)) {
				tabGroup.addPanel(panelId);
				this._panelToTabGroup.set(panelId, concreteGroup);
				this._enforceContiguity(concreteGroup, panelId);
			}
			if (data.collapsed) tabGroup.collapse();
			if (tabGroup.isEmpty) tabGroup.dispose();
		}
	}
	focusContent() {
		this.contentContainer.element.focus();
	}
	focusActiveTab() {
		this.tabsContainer.focusActiveTab();
	}
	set renderContainer(value) {
		this.panels.forEach((panel) => {
			this.renderContainer.detatch(panel);
		});
		this._overwriteRenderContainer = value;
		this.panels.forEach((panel) => {
			this.rerender(panel);
		});
		if (this.panels.length > 0) this.layoutContent();
	}
	get renderContainer() {
		var _this$_overwriteRende;
		return (_this$_overwriteRende = this._overwriteRenderContainer) !== null && _this$_overwriteRende !== void 0 ? _this$_overwriteRende : this.accessor.overlayRenderContainer;
	}
	set dropTargetContainer(value) {
		this._overwriteDropTargetContainer = value;
	}
	get dropTargetContainer() {
		var _this$_overwriteDropT;
		if (this._location.type === "floating" && this.accessor.rootDropTargetContainer.disabled) return this.accessor.floatingDropTargetContainer;
		return (_this$_overwriteDropT = this._overwriteDropTargetContainer) !== null && _this$_overwriteDropT !== void 0 ? _this$_overwriteDropT : this.accessor.rootDropTargetContainer;
	}
	initialize() {
		if (this.options.panels) this.options.panels.forEach((panel) => {
			this.doAddPanel(panel);
		});
		if (this.options.activePanel) this.openPanel(this.options.activePanel);
		this.setActive(this.isActive, true);
		this.updateContainer();
		this.updateHeaderActions();
	}
	updateHeaderActions() {
		var _this$accessor$header;
		(_this$accessor$header = this.accessor.headerActionsService) === null || _this$accessor$header === void 0 || _this$accessor$header.refresh(this.groupPanel);
	}
	attachHeaderAction(slot, element) {
		switch (slot) {
			case "left":
				this.tabsContainer.setLeftActionsElement(element);
				break;
			case "right":
				this.tabsContainer.setRightActionsElement(element);
				break;
			case "prefix":
				this.tabsContainer.setPrefixActionsElement(element);
				break;
		}
	}
	rerender(panel) {
		this.contentContainer.renderPanel(panel, { asActive: false });
	}
	indexOf(panel) {
		return this.tabsContainer.indexOf(panel.id);
	}
	toJSON() {
		var _this$_activePanel;
		const result = {
			views: this.tabsContainer.panels,
			activeView: (_this$_activePanel = this._activePanel) === null || _this$_activePanel === void 0 ? void 0 : _this$_activePanel.id,
			id: this.id
		};
		if (this.locked !== false) result.locked = this.locked;
		if (this.header.hidden) result.hideHeader = true;
		if (this.headerPosition !== "top") result.headerPosition = this.headerPosition;
		if (this._tabGroups.length > 0) result.tabGroups = this._tabGroups.map((tg) => tg.toJSON());
		return result;
	}
	moveToNext(options) {
		var _options, _options2, _options2$panel;
		(_options = options) !== null && _options !== void 0 || (options = {});
		(_options2$panel = (_options2 = options).panel) !== null && _options2$panel !== void 0 || (_options2.panel = this.activePanel);
		const index = options.panel ? this.panels.indexOf(options.panel) : -1;
		let normalizedIndex;
		if (index < this.panels.length - 1) normalizedIndex = index + 1;
		else if (options.suppressRoll) return;
		else normalizedIndex = 0;
		this.openPanel(this.panels[normalizedIndex]);
	}
	moveToPrevious(options) {
		var _options3, _options4, _options4$panel;
		(_options3 = options) !== null && _options3 !== void 0 || (options = {});
		(_options4$panel = (_options4 = options).panel) !== null && _options4$panel !== void 0 || (_options4.panel = this.activePanel);
		if (!options.panel) return;
		const index = this.panels.indexOf(options.panel);
		let normalizedIndex;
		if (index > 0) normalizedIndex = index - 1;
		else if (options.suppressRoll) return;
		else normalizedIndex = this.panels.length - 1;
		this.openPanel(this.panels[normalizedIndex]);
	}
	containsPanel(panel) {
		return this.panels.includes(panel);
	}
	init(_params) {}
	update(_params) {}
	focus() {
		var _this$_activePanel2;
		(_this$_activePanel2 = this._activePanel) === null || _this$_activePanel2 === void 0 || _this$_activePanel2.focus();
	}
	openPanel(panel, options = {}) {
		if (typeof options.index !== "number" || options.index > this.panels.length) options.index = this.panels.length;
		else if (options.index < 0) options.index = 0;
		const skipSetActive = !!options.skipSetActive;
		panel.updateParentGroup(this.groupPanel, { skipSetActive: options.skipSetActive });
		this.doAddPanel(panel, options.index, { skipSetActive });
		this.invalidateHeaderSize();
		if (this._activePanel === panel) {
			this.contentContainer.openPanel(panel);
			return;
		}
		if (!skipSetActive) this.doSetActivePanel(panel);
		if (!options.skipSetGroupActive) this.accessor.doSetGroupActive(this.groupPanel);
		if (!options.skipSetActive) this.updateContainer();
		else panel.runEvents();
	}
	removePanel(groupItemOrId, options) {
		const id = typeof groupItemOrId === "string" ? groupItemOrId : groupItemOrId.id;
		const panelToRemove = this._panels.find((panel) => panel.id === id);
		if (!panelToRemove) throw new Error("invalid operation");
		return this._removePanel(panelToRemove, options);
	}
	closeAllPanels() {
		if (this.panels.length > 0) {
			const arrPanelCpy = [...this.panels];
			for (const panel of arrPanelCpy) this.doClose(panel);
		} else this.accessor.removeGroup(this.groupPanel);
	}
	closePanel(panel) {
		this.doClose(panel);
	}
	doClose(panel) {
		const isLast = this.panels.length === 1 && this.accessor.isLastGridGroup(this.groupPanel);
		this.accessor.removePanel(panel, isLast && this.accessor.options.noPanelsOverlay === "emptyGroup" ? { removeEmptyGroup: false } : void 0);
	}
	isPanelActive(panel) {
		return this._activePanel === panel;
	}
	updateActions(element) {
		this.tabsContainer.setRightActionsElement(element);
	}
	setActive(isGroupActive, force = false) {
		if (this.isDisposed) return;
		if (!force && this.isActive === isGroupActive) return;
		this._isGroupActive = isGroupActive;
		toggleClass(this.container, "dv-active-group", isGroupActive);
		toggleClass(this.container, "dv-inactive-group", !isGroupActive);
		this.tabsContainer.setActive(this.isActive);
		if (!this._activePanel && this.panels.length > 0) {
			const candidate = this._panels.find((p) => {
				const tg = this._findTabGroupForPanel(p.id);
				return !(tg === null || tg === void 0 ? void 0 : tg.collapsed);
			});
			if (candidate) this.doSetActivePanel(candidate);
		}
		this.updateContainer();
	}
	layout(width, height) {
		this._width = width;
		this._height = height;
		this.layoutContent();
	}
	/**
	* Apply the current content box (group box minus header extent) to the
	* content container and the active panel. Every path that can change that
	* box goes through here so the container's recorded dimensions, which size
	* overlay-rendered panels, never lag the active panel's. Callers other
	* than `layout()` skip it for a group with no panels: there is nothing to
	* size, and measuring the header of a group that is not in the document
	* yet (the constructor sets `headerPosition`) would cache a zero extent.
	*/
	layoutContent() {
		var _this$_activePanel3;
		const { width, height } = this.contentDimensions();
		this.contentContainer.layout(width, height);
		if ((_this$_activePanel3 = this._activePanel) === null || _this$_activePanel3 === void 0 ? void 0 : _this$_activePanel3.layout) this._activePanel.layout(width, height);
	}
	/**
	* Re-run the group's layout with its current dimensions. Used to propagate a
	* header-size change (e.g. a header that grew/shrank without the group box
	* changing) down to the content + active panel.
	*/
	relayout() {
		this.invalidateHeaderSize();
		this.layout(this._width, this._height);
	}
	/**
	* The dimensions available to the content/panel: the group box minus the
	* header along its axis. The header (`dv-tabs-and-actions-container`) is
	* laid out top/bottom (subtract its height) or left/right (subtract its
	* width); a hidden header has `display:none` so its `offset*` is 0 and
	* nothing is subtracted.
	*/
	/**
	* Measure the header's extent along its occupied axis. This is the single
	* forced-reflow read; it now runs only on a cache miss (first layout after
	* a header change) and inside the header's ResizeObserver — not on every
	* layout frame.
	*/
	measureHeaderSize() {
		const headerEl = this.tabsContainer.element;
		return this.headerPosition === "top" || this.headerPosition === "bottom" ? headerEl.offsetHeight : headerEl.offsetWidth;
	}
	invalidateHeaderSize() {
		this._cachedHeaderSize = void 0;
	}
	contentDimensions() {
		var _this$_cachedHeaderSi;
		const horizontal = this.headerPosition === "top" || this.headerPosition === "bottom";
		const headerSize = (_this$_cachedHeaderSi = this._cachedHeaderSize) !== null && _this$_cachedHeaderSi !== void 0 ? _this$_cachedHeaderSi : this._cachedHeaderSize = this.measureHeaderSize();
		return {
			width: horizontal ? this._width : Math.max(0, this._width - headerSize),
			height: horizontal ? Math.max(0, this._height - headerSize) : this._height
		};
	}
	_removePanel(panel, options) {
		const isActivePanel = this._activePanel === panel;
		this.doRemovePanel(panel);
		this.invalidateHeaderSize();
		if (isActivePanel && this.panels.length > 0) {
			const nextPanel = this.mostRecentlyUsed[0];
			this.openPanel(nextPanel, {
				skipSetActive: options === null || options === void 0 ? void 0 : options.skipSetActive,
				skipSetGroupActive: options === null || options === void 0 ? void 0 : options.skipSetActiveGroup
			});
		}
		if (!(options === null || options === void 0 ? void 0 : options.skipSetActive)) this.updateContainer();
		return panel;
	}
	doRemovePanel(panel) {
		const index = this.panels.indexOf(panel);
		if (this._activePanel === panel) this.contentContainer.closePanel();
		this.tabsContainer.delete(panel.id);
		this._panels.splice(index, 1);
		if (this.mostRecentlyUsed.includes(panel)) {
			const index = this.mostRecentlyUsed.indexOf(panel);
			this.mostRecentlyUsed.splice(index, 1);
		}
		const disposable = this._panelDisposables.get(panel.id);
		if (disposable) {
			disposable.dispose();
			this._panelDisposables.delete(panel.id);
		}
		this.removePanelFromTabGroup(panel.id);
		if (this._activePanel === panel && this._panels.length === 0) this.doSetActivePanel(void 0);
		this._onDidRemovePanel.fire({ panel });
	}
	doAddPanel(panel, index = this.panels.length, options) {
		const hasExistingPanel = this._panels.indexOf(panel) > -1;
		this.tabsContainer.show();
		this.contentContainer.show();
		this.tabsContainer.openPanel(panel, index);
		if (!(options === null || options === void 0 ? void 0 : options.skipSetActive)) this.contentContainer.openPanel(panel);
		else if (panel.api.renderer === "always") this.contentContainer.renderPanel(panel, { asActive: false });
		if (hasExistingPanel) return;
		this.updateMru(panel);
		this.panels.splice(index, 0, panel);
		this._panelDisposables.set(panel.id, new CompositeDisposable(panel.api.onDidTitleChange((event) => this._onDidPanelTitleChange.fire(event)), panel.api.onDidParametersChange((event) => this._onDidPanelParametersChange.fire(event))));
		this._onDidAddPanel.fire({ panel });
	}
	doSetActivePanel(panel) {
		if (this._activePanel === panel) return;
		this._activePanel = panel;
		if (panel) {
			var _this$accessor$curren, _this$accessor$curren2, _this$accessor;
			this._syncActiveTab();
			this.contentContainer.openPanel(panel);
			this.layoutContent();
			this.updateMru(panel);
			this.contentContainer.refreshFocusState();
			this._onDidActivePanelChange.fire({
				panel,
				origin: (_this$accessor$curren = (_this$accessor$curren2 = (_this$accessor = this.accessor).currentOrigin) === null || _this$accessor$curren2 === void 0 ? void 0 : _this$accessor$curren2.call(_this$accessor)) !== null && _this$accessor$curren !== void 0 ? _this$accessor$curren : "user"
			});
		}
		this.updateAccessibleLabel();
	}
	/** Label the group region with its active panel's title (the WAI-ARIA region name). */
	updateAccessibleLabel() {
		var _this$_activePanel4;
		const title = (_this$_activePanel4 = this._activePanel) === null || _this$_activePanel4 === void 0 ? void 0 : _this$_activePanel4.title;
		if (title) this.container.setAttribute("aria-label", title);
		else this.container.removeAttribute("aria-label");
	}
	updateMru(panel) {
		if (this.mostRecentlyUsed.includes(panel)) this.mostRecentlyUsed.splice(this.mostRecentlyUsed.indexOf(panel), 1);
		this.mostRecentlyUsed = [panel, ...this.mostRecentlyUsed];
	}
	updateContainer() {
		this.panels.forEach((panel) => panel.runEvents());
		const shouldShowWatermark = this.isEmpty || !this._activePanel;
		if (shouldShowWatermark && !this.watermark) {
			const watermark = this.accessor.createWatermarkComponent();
			watermark.init({
				containerApi: this._api,
				group: this.groupPanel
			});
			this.watermark = watermark;
			addDisposableListener(this.watermark.element, "pointerdown", () => {
				if (!this.isActive) this.accessor.doSetGroupActive(this.groupPanel);
			});
			this.contentContainer.element.appendChild(this.watermark.element);
		}
		if (!shouldShowWatermark && this.watermark) {
			var _this$watermark$dispo2, _this$watermark2;
			this.watermark.element.remove();
			(_this$watermark$dispo2 = (_this$watermark2 = this.watermark).dispose) === null || _this$watermark$dispo2 === void 0 || _this$watermark$dispo2.call(_this$watermark2);
			this.watermark = void 0;
		}
	}
	canDisplayOverlay(event, position, target) {
		const firedEvent = new DockviewUnhandledDragOverEvent(event, target, position, getPanelData, this.accessor.getPanel(this.id));
		this._onUnhandledDragOver.fire(firedEvent);
		return firedEvent.isAccepted;
	}
	/**
	* Whether a content drop at `position` is allowed: the locked rules, the
	* shift-to-not-drop gesture, the same-component shortcut, then the
	* `canDisplayOverlay` veto. The single source of truth for the content drop
	* target (`content.ts`) and the compass cell gating (`canDropOnGroup`).
	*/
	canDisplayContentOverlay(event, position) {
		if (this.locked === "no-drop-target" || this.locked && position === "center") return false;
		const data = getPanelData();
		if (!data && event.shiftKey && this.location.type !== "floating") return false;
		if ((data === null || data === void 0 ? void 0 : data.viewId) === this.accessor.id) return true;
		return this.canDisplayOverlay(event, position, "content");
	}
	handleDropEvent(type, event, position, index, edge, edgeGroup) {
		if (this.locked === "no-drop-target") return;
		if (type === "content" && edge) {
			this.accessor.dockToLayoutEdge(event, position, edgeGroup);
			return;
		}
		function getKind() {
			switch (type) {
				case "header": return typeof index === "number" ? "tab" : "header_space";
				case "content": return "content";
			}
		}
		const panel = typeof index === "number" ? this.panels[index] : void 0;
		const willDropEvent = new DockviewWillDropEvent({
			nativeEvent: event,
			position,
			panel,
			index,
			getData: () => getPanelData(),
			kind: getKind(),
			group: this.groupPanel,
			api: this._api
		});
		this._onWillDrop.fire(willDropEvent);
		if (willDropEvent.defaultPrevented) return;
		const data = getPanelData();
		if ((data === null || data === void 0 ? void 0 : data.viewId) === this.accessor.id) {
			if (type === "content") {
				if (data.groupId === this.id) {
					if (position === "center") return;
					if (data.panelId === null && !data.tabGroupId) return;
				}
			}
			if (type === "header") {
				if (data.groupId === this.id) {
					if (data.panelId === null && !data.tabGroupId) return;
				}
			}
			if (data.panelId === null) {
				const { groupId } = data;
				this._onMove.fire({
					target: position,
					groupId,
					index,
					tabGroupId: data.tabGroupId
				});
				return;
			}
			if (this.tabsContainer.indexOf(data.panelId) !== -1 && this.tabsContainer.size === 1 && this.accessor.options.closeEmptyGroups !== false) return;
			const { groupId, panelId } = data;
			if (this.id === groupId && !position) {
				if (this.tabsContainer.indexOf(panelId) === index) return;
			}
			this._onMove.fire({
				target: position,
				groupId: data.groupId,
				itemId: data.panelId,
				index
			});
		} else this._onDidDrop.fire(new DockviewDidDropEvent({
			nativeEvent: event,
			position,
			panel,
			index,
			getData: () => getPanelData(),
			group: this.groupPanel,
			api: this._api
		}));
	}
	updateDragAndDropState() {
		this.tabsContainer.updateDragAndDropState();
	}
	dispose() {
		var _this$watermark3, _this$watermark4, _this$watermark4$disp;
		super.dispose();
		(_this$watermark3 = this.watermark) === null || _this$watermark3 === void 0 || _this$watermark3.element.remove();
		(_this$watermark4 = this.watermark) === null || _this$watermark4 === void 0 || (_this$watermark4$disp = _this$watermark4.dispose) === null || _this$watermark4$disp === void 0 || _this$watermark4$disp.call(_this$watermark4);
		this.watermark = void 0;
		for (const tabGroup of [...this._tabGroups]) tabGroup.dispose();
		for (const disposable of this._tabGroupDisposables.values()) disposable.dispose();
		this._tabGroupDisposables.clear();
		for (const disposable of this._pendingMicrotaskDisposables) disposable.dispose();
		this._pendingMicrotaskDisposables.clear();
		for (const panel of this.panels) panel.dispose();
		this.tabsContainer.dispose();
		this.contentContainer.dispose();
	}
};

//#endregion
//#region src/api/gridviewPanelApi.ts
var GridviewPanelApiImpl = class extends PanelApiImpl {
	constructor(id, component, panel) {
		super(id, component);
		this._onDidConstraintsChangeInternal = new Emitter();
		this.onDidConstraintsChangeInternal = this._onDidConstraintsChangeInternal.event;
		this._onDidConstraintsChange = new Emitter();
		this.onDidConstraintsChange = this._onDidConstraintsChange.event;
		this._onDidSizeChange = new Emitter();
		this.onDidSizeChange = this._onDidSizeChange.event;
		this.addDisposables(this._onDidConstraintsChangeInternal, this._onDidConstraintsChange, this._onDidSizeChange);
		if (panel) this.initialize(panel);
	}
	setConstraints(value) {
		this._onDidConstraintsChangeInternal.fire(value);
	}
	setSize(event) {
		this._onDidSizeChange.fire(event);
	}
};

//#endregion
//#region src/gridview/gridviewPanel.ts
var GridviewPanel = class extends BasePanelView {
	get priority() {
		return this._priority;
	}
	get snap() {
		return this._snap;
	}
	get minimumWidth() {
		/**
		* defer to protected function to allow subclasses to override easily.
		* see https://github.com/microsoft/TypeScript/issues/338
		*/
		return this.__minimumWidth();
	}
	get minimumHeight() {
		/**
		* defer to protected function to allow subclasses to override easily.
		* see https://github.com/microsoft/TypeScript/issues/338
		*/
		return this.__minimumHeight();
	}
	get maximumHeight() {
		/**
		* defer to protected function to allow subclasses to override easily.
		* see https://github.com/microsoft/TypeScript/issues/338
		*/
		return this.__maximumHeight();
	}
	get maximumWidth() {
		/**
		* defer to protected function to allow subclasses to override easily.
		* see https://github.com/microsoft/TypeScript/issues/338
		*/
		return this.__maximumWidth();
	}
	__minimumWidth() {
		const width = typeof this._minimumWidth === "function" ? this._minimumWidth() : this._minimumWidth;
		if (width !== this._evaluatedMinimumWidth) {
			this._evaluatedMinimumWidth = width;
			this.updateConstraints();
		}
		return width;
	}
	__maximumWidth() {
		const width = typeof this._maximumWidth === "function" ? this._maximumWidth() : this._maximumWidth;
		if (width !== this._evaluatedMaximumWidth) {
			this._evaluatedMaximumWidth = width;
			this.updateConstraints();
		}
		return width;
	}
	__minimumHeight() {
		const height = typeof this._minimumHeight === "function" ? this._minimumHeight() : this._minimumHeight;
		if (height !== this._evaluatedMinimumHeight) {
			this._evaluatedMinimumHeight = height;
			this.updateConstraints();
		}
		return height;
	}
	__maximumHeight() {
		const height = typeof this._maximumHeight === "function" ? this._maximumHeight() : this._maximumHeight;
		if (height !== this._evaluatedMaximumHeight) {
			this._evaluatedMaximumHeight = height;
			this.updateConstraints();
		}
		return height;
	}
	get isActive() {
		return this.api.isActive;
	}
	get isVisible() {
		return this.api.isVisible;
	}
	constructor(id, component, options, api) {
		super(id, component, api !== null && api !== void 0 ? api : new GridviewPanelApiImpl(id, component));
		this._evaluatedMinimumWidth = 0;
		this._evaluatedMaximumWidth = Number.MAX_SAFE_INTEGER;
		this._evaluatedMinimumHeight = 0;
		this._evaluatedMaximumHeight = Number.MAX_SAFE_INTEGER;
		this._minimumWidth = 0;
		this._minimumHeight = 0;
		this._maximumWidth = Number.MAX_SAFE_INTEGER;
		this._maximumHeight = Number.MAX_SAFE_INTEGER;
		this._snap = false;
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		if (typeof (options === null || options === void 0 ? void 0 : options.minimumWidth) === "number") this._minimumWidth = options.minimumWidth;
		if (typeof (options === null || options === void 0 ? void 0 : options.maximumWidth) === "number") this._maximumWidth = options.maximumWidth;
		if (typeof (options === null || options === void 0 ? void 0 : options.minimumHeight) === "number") this._minimumHeight = options.minimumHeight;
		if (typeof (options === null || options === void 0 ? void 0 : options.maximumHeight) === "number") this._maximumHeight = options.maximumHeight;
		this.api.initialize(this);
		this.addDisposables(this.api.onWillVisibilityChange((event) => {
			const { isVisible } = event;
			const { accessor } = this._params;
			accessor.setVisible(this, isVisible);
		}), this.api.onActiveChange(() => {
			const { accessor } = this._params;
			accessor.doSetGroupActive(this);
		}), this.api.onDidConstraintsChangeInternal((event) => this.applyConstraints(event)), this.api.onDidSizeChange((event) => {
			this._onDidChange.fire({
				height: event.height,
				width: event.width
			});
		}), this._onDidChange);
	}
	setVisible(isVisible) {
		this.api._onDidVisibilityChange.fire({ isVisible });
	}
	setActive(isActive) {
		this.api._onDidActiveChange.fire({ isActive });
	}
	init(parameters) {
		if (parameters.maximumHeight) this._maximumHeight = parameters.maximumHeight;
		if (parameters.minimumHeight) this._minimumHeight = parameters.minimumHeight;
		if (parameters.maximumWidth) this._maximumWidth = parameters.maximumWidth;
		if (parameters.minimumWidth) this._minimumWidth = parameters.minimumWidth;
		this._priority = parameters.priority;
		this._snap = !!parameters.snap;
		super.init(parameters);
		if (typeof parameters.isVisible === "boolean") this.setVisible(parameters.isVisible);
	}
	/**
	* Record a `setConstraints` request, then tell the containing view. A
	* subclass that layers its own state over these fields updates it before
	* calling through, so the notification carries the new constraints.
	*/
	applyConstraints(event) {
		if (typeof event.minimumWidth === "number" || typeof event.minimumWidth === "function") this._minimumWidth = event.minimumWidth;
		if (typeof event.minimumHeight === "number" || typeof event.minimumHeight === "function") this._minimumHeight = event.minimumHeight;
		if (typeof event.maximumWidth === "number" || typeof event.maximumWidth === "function") this._maximumWidth = event.maximumWidth;
		if (typeof event.maximumHeight === "number" || typeof event.maximumHeight === "function") this._maximumHeight = event.maximumHeight;
		this.notifyConstraintsChanged();
	}
	/**
	* Tell the containing view (LeafNode -> BranchNode) that this panel's
	* constraints changed: the branch's cached aggregate min/max over its
	* children is stale and the parent splitview must re-clamp this panel.
	*/
	notifyConstraintsChanged() {
		this._onDidChange.fire(void 0);
	}
	updateConstraints() {
		this.api._onDidConstraintsChange.fire({
			minimumWidth: this._evaluatedMinimumWidth,
			maximumWidth: this._evaluatedMaximumWidth,
			minimumHeight: this._evaluatedMinimumHeight,
			maximumHeight: this._evaluatedMaximumHeight
		});
	}
	toJSON() {
		const state = super.toJSON();
		const maximum = (value) => value === Number.MAX_SAFE_INTEGER ? void 0 : value;
		const minimum = (value) => value <= 0 ? void 0 : value;
		return _objectSpread2(_objectSpread2({}, state), {}, {
			minimumHeight: minimum(this.minimumHeight),
			maximumHeight: maximum(this.maximumHeight),
			minimumWidth: minimum(this.minimumWidth),
			maximumWidth: maximum(this.maximumWidth),
			snap: this.snap,
			priority: this.priority
		});
	}
};

//#endregion
//#region src/api/dockviewGroupPanelApi.ts
const NOT_INITIALIZED_MESSAGE = "dockview: DockviewGroupPanelApiImpl not initialized";
var DockviewGroupPanelApiImpl = class extends GridviewPanelApiImpl {
	get location() {
		if (!this._group) throw new Error(NOT_INITIALIZED_MESSAGE);
		return this._group.model.location;
	}
	/**
	* The group's bounding box relative to the top-left of the dockview root,
	* in pixels. Covers grid and floating groups; returns `undefined` for a
	* popout group (it lives in a separate window). Reflects the live rendered
	* geometry, so it is only meaningful once the layout has been sized.
	*/
	get boundingBox() {
		if (!this._group || this._group.model.location.type === "popout") return;
		const root = this.accessor.element.getBoundingClientRect();
		const rect = this._group.element.getBoundingClientRect();
		return {
			left: rect.left - root.left,
			top: rect.top - root.top,
			width: rect.width,
			height: rect.height
		};
	}
	get locked() {
		if (!this._group) throw new Error(NOT_INITIALIZED_MESSAGE);
		return this._group.locked;
	}
	set locked(value) {
		if (!this._group) throw new Error(NOT_INITIALIZED_MESSAGE);
		this._group.locked = value;
	}
	constructor(id, accessor) {
		super(id, "__dockviewgroup__");
		this.accessor = accessor;
		this._isApplyingSize = false;
		this._onDidLocationChange = new Emitter();
		this.onDidLocationChange = this._onDidLocationChange.event;
		this._onDidActivePanelChange = new Emitter();
		this.onDidActivePanelChange = this._onDidActivePanelChange.event;
		this._onDidCollapsedChange = new Emitter();
		this.onDidCollapsedChange = this._onDidCollapsedChange.event;
		this._onDidPeekChange = new Emitter();
		this.onDidPeekChange = this._onDidPeekChange.event;
		this._onDidHeaderDirectionChange = new Emitter();
		this.onDidHeaderDirectionChange = this._onDidHeaderDirectionChange.event;
		this.addDisposables(this._onDidLocationChange, this._onDidActivePanelChange, this._onDidCollapsedChange, this._onDidPeekChange, this._onDidHeaderDirectionChange, this._onDidVisibilityChange.event((event) => {
			if (event.isVisible && this._pendingSize) {
				const pendingSize = this._pendingSize;
				this._pendingSize = void 0;
				super.setSize(pendingSize);
			}
		}), this.onDidDimensionsChange((event) => {
			var _this$_reportedSize, _this$_reportedSize2;
			const moved = event.width !== ((_this$_reportedSize = this._reportedSize) === null || _this$_reportedSize === void 0 ? void 0 : _this$_reportedSize.width) || event.height !== ((_this$_reportedSize2 = this._reportedSize) === null || _this$_reportedSize2 === void 0 ? void 0 : _this$_reportedSize2.height);
			this._reportedSize = {
				width: event.width,
				height: event.height
			};
			if (moved && this.isVisible && !this._isApplyingSize) this._pendingSize = void 0;
		}));
	}
	setSize(event) {
		if (typeof event.width === "number" || typeof event.height === "number") this._pendingSize = _objectSpread2({}, event);
		const wasApplyingSize = this._isApplyingSize;
		this._isApplyingSize = true;
		try {
			super.setSize(event);
		} finally {
			this._isApplyingSize = wasApplyingSize;
		}
	}
	close() {
		if (!this._group) return;
		return this.accessor.removeGroup(this._group);
	}
	getWindow() {
		return this.location.type === "popout" ? this.location.getWindow() : globalThis.window;
	}
	setHeaderPosition(position) {
		if (!this._group) throw new Error(NOT_INITIALIZED_MESSAGE);
		this._group.model.headerPosition = position;
	}
	getHeaderPosition() {
		if (!this._group) throw new Error(NOT_INITIALIZED_MESSAGE);
		return this._group.model.headerPosition;
	}
	moveTo(options) {
		if (!this._group) throw new Error(NOT_INITIALIZED_MESSAGE);
		this.accessor.withOrigin("api", () => {
			var _options$group, _options$position, _options$skipSetActiv, _options$position2;
			const group = (_options$group = options.group) !== null && _options$group !== void 0 ? _options$group : this.accessor.addGroup({
				direction: positionToDirection((_options$position = options.position) !== null && _options$position !== void 0 ? _options$position : "right"),
				skipSetActive: (_options$skipSetActiv = options.skipSetActive) !== null && _options$skipSetActiv !== void 0 ? _options$skipSetActiv : false
			});
			this.accessor.moveGroupOrPanel({
				from: { groupId: this._group.id },
				to: {
					group,
					position: options.group ? (_options$position2 = options.position) !== null && _options$position2 !== void 0 ? _options$position2 : "center" : "center",
					index: options.index
				},
				skipSetActive: options.skipSetActive
			});
		});
	}
	maximize() {
		if (!this._group) throw new Error(NOT_INITIALIZED_MESSAGE);
		if (this.location.type !== "grid") return;
		this.accessor.maximizeGroup(this._group);
	}
	isMaximized() {
		if (!this._group) throw new Error(NOT_INITIALIZED_MESSAGE);
		return this.accessor.isMaximizedGroup(this._group);
	}
	exitMaximized() {
		if (!this._group) throw new Error(NOT_INITIALIZED_MESSAGE);
		if (this.isMaximized()) this.accessor.exitMaximizedGroup();
	}
	collapse() {
		if (!this._group) return;
		this.accessor.setEdgeGroupCollapsed(this._group, true);
	}
	expand() {
		if (!this._group) return;
		this.accessor.setEdgeGroupCollapsed(this._group, false);
	}
	isCollapsed() {
		if (!this._group) return false;
		return this.accessor.isEdgeGroupCollapsed(this._group);
	}
	isPeeking() {
		if (!this._group) return false;
		return this.accessor.isEdgeGroupPeeking(this._group);
	}
	setAutoHide(value) {
		if (!this._group) return;
		this.accessor.setEdgeGroupAutoHide(this._group, value);
	}
	isAutoHide() {
		if (!this._group) return false;
		return this.accessor.isEdgeGroupAutoHide(this._group);
	}
	initialize(group) {
		this._group = group;
	}
};

//#endregion
//#region src/dockview/dockviewGroupPanel.ts
const MINIMUM_DOCKVIEW_GROUP_PANEL_WIDTH = 100;
const MINIMUM_DOCKVIEW_GROUP_PANEL_HEIGHT = 100;
var DockviewGroupPanel = class extends GridviewPanel {
	get minimumWidth() {
		var _this$activePanel;
		if (typeof this._explicitConstraints.minimumWidth === "number") return this._explicitConstraints.minimumWidth;
		const activePanelMinimumWidth = (_this$activePanel = this.activePanel) === null || _this$activePanel === void 0 ? void 0 : _this$activePanel.minimumWidth;
		if (typeof activePanelMinimumWidth === "number") return activePanelMinimumWidth;
		return super.__minimumWidth();
	}
	get minimumHeight() {
		var _this$activePanel2;
		if (typeof this._explicitConstraints.minimumHeight === "number") return this._explicitConstraints.minimumHeight;
		const activePanelMinimumHeight = (_this$activePanel2 = this.activePanel) === null || _this$activePanel2 === void 0 ? void 0 : _this$activePanel2.minimumHeight;
		if (typeof activePanelMinimumHeight === "number") return activePanelMinimumHeight;
		return super.__minimumHeight();
	}
	get maximumWidth() {
		var _this$activePanel3;
		if (typeof this._explicitConstraints.maximumWidth === "number") return this._explicitConstraints.maximumWidth;
		const activePanelMaximumWidth = (_this$activePanel3 = this.activePanel) === null || _this$activePanel3 === void 0 ? void 0 : _this$activePanel3.maximumWidth;
		if (typeof activePanelMaximumWidth === "number") return activePanelMaximumWidth;
		return super.__maximumWidth();
	}
	get maximumHeight() {
		var _this$activePanel4;
		if (typeof this._explicitConstraints.maximumHeight === "number") return this._explicitConstraints.maximumHeight;
		const activePanelMaximumHeight = (_this$activePanel4 = this.activePanel) === null || _this$activePanel4 === void 0 ? void 0 : _this$activePanel4.maximumHeight;
		if (typeof activePanelMaximumHeight === "number") return activePanelMaximumHeight;
		return super.__maximumHeight();
	}
	get panels() {
		return this._model.panels;
	}
	get activePanel() {
		return this._model.activePanel;
	}
	get size() {
		return this._model.size;
	}
	get model() {
		return this._model;
	}
	get locked() {
		return this._model.locked;
	}
	set locked(value) {
		this._model.locked = value;
	}
	get header() {
		return this._model.header;
	}
	constructor(accessor, id, options) {
		var _options$constraints$, _options$constraints, _options$constraints$2, _options$constraints2, _options$constraints3, _options$constraints4;
		super(id, "groupview_default", {
			minimumHeight: (_options$constraints$ = (_options$constraints = options.constraints) === null || _options$constraints === void 0 ? void 0 : _options$constraints.minimumHeight) !== null && _options$constraints$ !== void 0 ? _options$constraints$ : MINIMUM_DOCKVIEW_GROUP_PANEL_HEIGHT,
			minimumWidth: (_options$constraints$2 = (_options$constraints2 = options.constraints) === null || _options$constraints2 === void 0 ? void 0 : _options$constraints2.minimumWidth) !== null && _options$constraints$2 !== void 0 ? _options$constraints$2 : MINIMUM_DOCKVIEW_GROUP_PANEL_WIDTH,
			maximumHeight: (_options$constraints3 = options.constraints) === null || _options$constraints3 === void 0 ? void 0 : _options$constraints3.maximumHeight,
			maximumWidth: (_options$constraints4 = options.constraints) === null || _options$constraints4 === void 0 ? void 0 : _options$constraints4.maximumWidth
		}, new DockviewGroupPanelApiImpl(id, accessor));
		this._explicitConstraints = {};
		this.api.initialize(this);
		this._model = new DockviewGroupPanelModel(this.element, accessor, id, options, this);
		this._lastConstraints = this.currentConstraints();
		this.addDisposables(this.model.onDidActivePanelChange((event) => {
			this.api._onDidActivePanelChange.fire(event);
			this.notifyIfConstraintsChanged();
		}), this.model.onDidRemovePanel(() => {
			this.notifyIfConstraintsChanged();
		}));
	}
	applyConstraints(event) {
		if (event.minimumWidth !== void 0) this._explicitConstraints.minimumWidth = typeof event.minimumWidth === "function" ? event.minimumWidth() : event.minimumWidth;
		if (event.minimumHeight !== void 0) this._explicitConstraints.minimumHeight = typeof event.minimumHeight === "function" ? event.minimumHeight() : event.minimumHeight;
		if (event.maximumWidth !== void 0) this._explicitConstraints.maximumWidth = typeof event.maximumWidth === "function" ? event.maximumWidth() : event.maximumWidth;
		if (event.maximumHeight !== void 0) this._explicitConstraints.maximumHeight = typeof event.maximumHeight === "function" ? event.maximumHeight() : event.maximumHeight;
		super.applyConstraints(event);
		this._lastConstraints = this.currentConstraints();
	}
	currentConstraints() {
		return {
			minimumWidth: this.minimumWidth,
			maximumWidth: this.maximumWidth,
			minimumHeight: this.minimumHeight,
			maximumHeight: this.maximumHeight
		};
	}
	notifyIfConstraintsChanged() {
		const previous = this._lastConstraints;
		const current = this.currentConstraints();
		if (previous.minimumWidth === current.minimumWidth && previous.maximumWidth === current.maximumWidth && previous.minimumHeight === current.minimumHeight && previous.maximumHeight === current.maximumHeight) return;
		this._lastConstraints = current;
		this.notifyConstraintsChanged();
	}
	focus() {
		if (!this.api.isActive) this.api.setActive();
		super.focus();
	}
	initialize() {
		this._model.initialize();
	}
	setActive(isActive) {
		super.setActive(isActive);
		this.model.setActive(isActive);
	}
	layout(width, height) {
		super.layout(width, height);
		this.model.layout(width, height);
	}
	/**
	* Re-run the group's layout with its current dimensions, propagating a
	* header-size change down to the content + active panel.
	*/
	relayout() {
		this.model.relayout();
	}
	getComponent() {
		return this._model;
	}
	toJSON() {
		return this.model.toJSON();
	}
};

//#endregion
//#region src/dockview/theme.ts
const themeDark = {
	name: "dark",
	className: "dockview-theme-dark",
	colorScheme: "dark"
};
const themeLight = {
	name: "light",
	className: "dockview-theme-light",
	colorScheme: "light"
};
const themeVisualStudio = {
	name: "visualStudio",
	className: "dockview-theme-vs",
	colorScheme: "dark",
	edgeGroupCollapsedSize: 22
};
const themeAbyss = {
	name: "abyss",
	className: "dockview-theme-abyss",
	colorScheme: "dark",
	tabGroupIndicator: "none"
};
const themeDracula = {
	name: "dracula",
	className: "dockview-theme-dracula",
	colorScheme: "dark"
};
const themeAbyssSpaced = {
	name: "abyssSpaced",
	className: "dockview-theme-abyss-spaced",
	colorScheme: "dark",
	gap: 10,
	edgeGroupCollapsedSize: 44,
	dndOverlayMounting: "absolute",
	dndPanelOverlay: "group",
	dndTabIndicator: "line",
	dndOverlayBorder: "2px solid var(--dv-active-sash-color)"
};
const themeLightSpaced = {
	name: "lightSpaced",
	className: "dockview-theme-light-spaced",
	colorScheme: "light",
	gap: 10,
	edgeGroupCollapsedSize: 44,
	dndOverlayMounting: "absolute",
	dndPanelOverlay: "group",
	dndTabIndicator: "line",
	dndOverlayBorder: "2px solid var(--dv-active-sash-color)"
};
const themeNord = {
	name: "nord",
	className: "dockview-theme-nord",
	colorScheme: "dark"
};
const themeNordSpaced = {
	name: "nordSpaced",
	className: "dockview-theme-nord-spaced",
	colorScheme: "dark",
	gap: 10,
	edgeGroupCollapsedSize: 44,
	dndOverlayMounting: "absolute",
	dndPanelOverlay: "group",
	dndTabIndicator: "line",
	dndOverlayBorder: "2px solid var(--dv-active-sash-color)"
};
const themeCatppuccinMocha = {
	name: "catppuccinMocha",
	className: "dockview-theme-catppuccin-mocha",
	colorScheme: "dark"
};
const themeCatppuccinMochaSpaced = {
	name: "catppuccinMochaSpaced",
	className: "dockview-theme-catppuccin-mocha-spaced",
	colorScheme: "dark",
	gap: 10,
	edgeGroupCollapsedSize: 44,
	dndOverlayMounting: "absolute",
	dndPanelOverlay: "group",
	dndTabIndicator: "line",
	dndOverlayBorder: "2px solid var(--dv-active-sash-color)"
};
const themeMonokai = {
	name: "monokai",
	className: "dockview-theme-monokai",
	colorScheme: "dark"
};
const themeSolarizedLight = {
	name: "solarizedLight",
	className: "dockview-theme-solarized-light",
	colorScheme: "light"
};
const themeSolarizedLightSpaced = {
	name: "solarizedLightSpaced",
	className: "dockview-theme-solarized-light-spaced",
	colorScheme: "light",
	gap: 10,
	edgeGroupCollapsedSize: 44,
	dndOverlayMounting: "absolute",
	dndPanelOverlay: "group",
	dndTabIndicator: "line",
	dndOverlayBorder: "2px solid var(--dv-active-sash-color)"
};
const themeGithubDark = {
	name: "githubDark",
	className: "dockview-theme-github-dark",
	colorScheme: "dark"
};
const themeGithubDarkSpaced = {
	name: "githubDarkSpaced",
	className: "dockview-theme-github-dark-spaced",
	colorScheme: "dark",
	gap: 10,
	edgeGroupCollapsedSize: 44,
	dndOverlayMounting: "absolute",
	dndPanelOverlay: "group",
	dndTabIndicator: "line",
	dndOverlayBorder: "2px solid var(--dv-active-sash-color)"
};
const themeGithubLight = {
	name: "githubLight",
	className: "dockview-theme-github-light",
	colorScheme: "light"
};
const themeGithubLightSpaced = {
	name: "githubLightSpaced",
	className: "dockview-theme-github-light-spaced",
	colorScheme: "light",
	gap: 10,
	edgeGroupCollapsedSize: 44,
	dndOverlayMounting: "absolute",
	dndPanelOverlay: "group",
	dndTabIndicator: "line",
	dndOverlayBorder: "2px solid var(--dv-active-sash-color)"
};

//#endregion
//#region src/api/dockviewPanelApi.ts
var DockviewPanelApiImpl = class extends GridviewPanelApiImpl {
	get location() {
		return this.group.api.location;
	}
	get title() {
		return this.panel.title;
	}
	get isPinned() {
		return this.panel.isPinned;
	}
	get isGroupActive() {
		return this.group.isActive;
	}
	get renderer() {
		return this.panel.renderer;
	}
	set group(value) {
		if (this._group !== value) {
			const wasGroupActive = this._group.isActive;
			this._group = value;
			this._onDidGroupChange.fire({});
			this.setupGroupEventListeners();
			if (wasGroupActive !== this.isGroupActive) this._onDidActiveGroupChange.fire({ isActive: this.isGroupActive });
			this.fireLocationChange();
		}
	}
	get group() {
		return this._group;
	}
	get tabComponent() {
		return this._tabComponent;
	}
	constructor(panel, group, accessor, component, tabComponent) {
		super(panel.id, component);
		this.panel = panel;
		this.accessor = accessor;
		this._onDidTitleChange = new Emitter();
		this.onDidTitleChange = this._onDidTitleChange.event;
		this._onDidChangePinned = new Emitter();
		this.onDidChangePinned = this._onDidChangePinned.event;
		this._onDidActiveGroupChange = new Emitter();
		this.onDidActiveGroupChange = this._onDidActiveGroupChange.event;
		this._onDidGroupChange = new Emitter();
		this.onDidGroupChange = this._onDidGroupChange.event;
		this._onDidRendererChange = new Emitter();
		this.onDidRendererChange = this._onDidRendererChange.event;
		this._onDidLocationChange = new Emitter();
		this.onDidLocationChange = this._onDidLocationChange.event;
		this.groupEventsDisposable = new MutableDisposable();
		this._tabComponent = tabComponent;
		this.initialize(panel);
		this._group = group;
		this.setupGroupEventListeners();
		this.addDisposables(this.groupEventsDisposable, this._onDidRendererChange, this._onDidTitleChange, this._onDidChangePinned, this._onDidGroupChange, this._onDidActiveGroupChange, this._onDidLocationChange);
	}
	getWindow() {
		return this.group.api.getWindow();
	}
	setActive() {
		this.accessor.withOrigin("api", () => super.setActive());
	}
	moveTo(options) {
		this.accessor.withOrigin("api", () => {
			var _options$group, _options$position;
			return this.accessor.moveGroupOrPanel({
				from: {
					groupId: this._group.id,
					panelId: this.panel.id
				},
				to: {
					group: (_options$group = options.group) !== null && _options$group !== void 0 ? _options$group : this._group,
					position: options.group ? (_options$position = options.position) !== null && _options$position !== void 0 ? _options$position : "center" : "center",
					index: options.index
				},
				skipSetActive: options.skipSetActive
			});
		});
	}
	setTitle(title) {
		this.panel.setTitle(title);
	}
	setPinned(pinned) {
		this.accessor.setPanelPinned(this.panel, pinned);
	}
	setRenderer(renderer) {
		this.panel.setRenderer(renderer);
	}
	close() {
		this.group.model.closePanel(this.panel);
	}
	maximize() {
		this.group.api.maximize();
	}
	isMaximized() {
		return this.group.api.isMaximized();
	}
	exitMaximized() {
		this.group.api.exitMaximized();
	}
	/**
	* Report that this panel's location may have moved.
	*
	* A relocation touches the location more than once - the panel is
	* reparented into the destination group, then that group is tagged with
	* the location it ends up at - so the event is coalesced to the end of the
	* enclosing layout mutation and reports where the panel actually settled.
	* Firing each signal as it happened surfaced an intermediate `grid`
	* location the panel was never in, at a point where it was in neither
	* group's panel list. Outside a mutation this fires straight away.
	*/
	fireLocationChange() {
		this.accessor.deferLocationChange(this, () => {
			if (this.isDisposed) return;
			this._onDidLocationChange.fire({ location: this.location });
		});
	}
	setupGroupEventListeners() {
		let _trackGroupActive = this.isGroupActive;
		this.groupEventsDisposable.value = new CompositeDisposable(this.group.api.onDidVisibilityChange((event) => {
			const hasBecomeHidden = !event.isVisible && this.isVisible;
			const hasBecomeVisible = event.isVisible && !this.isVisible;
			const isActivePanel = this.group.model.isPanelActive(this.panel);
			if (hasBecomeHidden || hasBecomeVisible && isActivePanel) this._onDidVisibilityChange.fire(event);
		}), this.group.api.onDidLocationChange(() => {
			if (this.group !== this.panel.group) return;
			this.fireLocationChange();
		}), this.group.api.onDidActiveChange(() => {
			if (this.group !== this.panel.group) return;
			if (_trackGroupActive !== this.isGroupActive) {
				_trackGroupActive = this.isGroupActive;
				this._onDidActiveGroupChange.fire({ isActive: this.isGroupActive });
			}
		}));
	}
};

//#endregion
//#region src/dockview/dockviewPanel.ts
var DockviewPanel = class extends CompositeDisposable {
	get params() {
		return this._params;
	}
	get title() {
		return this._title;
	}
	get isPinned() {
		return this._pinned;
	}
	get group() {
		return this._group;
	}
	get renderer() {
		var _this$_renderer;
		return (_this$_renderer = this._renderer) !== null && _this$_renderer !== void 0 ? _this$_renderer : this.accessor.renderer;
	}
	get minimumWidth() {
		return this._minimumWidth;
	}
	get minimumHeight() {
		return this._minimumHeight;
	}
	get maximumWidth() {
		return this._maximumWidth;
	}
	get maximumHeight() {
		return this._maximumHeight;
	}
	constructor(id, component, tabComponent, accessor, containerApi, group, view, options) {
		super();
		this.id = id;
		this.accessor = accessor;
		this.containerApi = containerApi;
		this.view = view;
		this._pinned = false;
		this._renderer = options.renderer;
		this._group = group;
		this._minimumWidth = options.minimumWidth;
		this._minimumHeight = options.minimumHeight;
		this._maximumWidth = options.maximumWidth;
		this._maximumHeight = options.maximumHeight;
		this.api = new DockviewPanelApiImpl(this, this._group, accessor, component, tabComponent);
		this.addDisposables(this.api.onActiveChange(() => {
			accessor.setActivePanel(this);
		}), this.api.onDidSizeChange((event) => {
			this.group.api.setSize(event);
		}), this.api.onDidRendererChange(() => {
			this.group.model.rerender(this);
		}));
	}
	init(params) {
		this._params = params.params;
		this.view.init(_objectSpread2(_objectSpread2({}, params), {}, {
			api: this.api,
			containerApi: this.containerApi
		}));
		this.setTitle(params.title);
	}
	focus() {
		const event = new WillFocusEvent();
		this.api._onWillFocus.fire(event);
		if (event.defaultPrevented) return;
		if (!this.api.isActive) this.api.setActive();
	}
	toJSON() {
		return {
			id: this.id,
			contentComponent: this.view.contentComponent,
			tabComponent: this.view.tabComponent,
			params: Object.keys(this._params || {}).length > 0 ? this._params : void 0,
			title: this.title,
			renderer: this._renderer,
			minimumHeight: this._minimumHeight,
			maximumHeight: this._maximumHeight,
			minimumWidth: this._minimumWidth,
			maximumWidth: this._maximumWidth,
			pinned: this._pinned ? true : void 0
		};
	}
	setTitle(title) {
		if (title !== this.title) {
			this._title = title;
			this.view.setTitle(title);
			this.api._onDidTitleChange.fire({ title });
		}
	}
	/**
	* Low-level pinned-state mutation. Sets the flag and fires the panel-api
	* event. The public, module-gated entry point is
	* `panel.api.setPinned` → `DockviewComponent.setPanelPinned`, which decides
	* whether pinning is active before reaching here; this method itself does
	* not gate, so the ordering module and serialization can drive it directly.
	*/
	setPinned(pinned) {
		if (this._pinned === pinned) return;
		this._pinned = pinned;
		this.api._onDidChangePinned.fire({ isPinned: pinned });
	}
	setRenderer(renderer) {
		if (renderer !== this.renderer) {
			this._renderer = renderer;
			this.api._onDidRendererChange.fire({ renderer });
		}
	}
	update(event) {
		this._params = _objectSpread2(_objectSpread2({}, this._params), event.params);
		/**
		* delete new keys that have a value of undefined,
		* allow values of null
		*/
		for (const key of Object.keys(event.params)) if (event.params[key] === void 0) delete this._params[key];
		this.view.update({ params: this._params });
	}
	updateFromStateModel(state) {
		var _state$params, _state$title, _state$renderer, _state$pinned, _this$accessor$option;
		this._maximumHeight = state.maximumHeight;
		this._minimumHeight = state.minimumHeight;
		this._maximumWidth = state.maximumWidth;
		this._minimumWidth = state.minimumWidth;
		this._params = (_state$params = state.params) !== null && _state$params !== void 0 ? _state$params : {};
		this.view.update({ params: this._params });
		this.setTitle((_state$title = state.title) !== null && _state$title !== void 0 ? _state$title : this.id);
		this.setRenderer((_state$renderer = state.renderer) !== null && _state$renderer !== void 0 ? _state$renderer : this.accessor.renderer);
		this.setPinned(((_state$pinned = state.pinned) !== null && _state$pinned !== void 0 ? _state$pinned : false) && !!((_this$accessor$option = this.accessor.options.pinnedTabs) === null || _this$accessor$option === void 0 ? void 0 : _this$accessor$option.enabled));
	}
	updateParentGroup(group, options) {
		this._group = group;
		this.api.group = this._group;
		const isPanelVisible = this._group.model.isPanelActive(this);
		const isActive = this.group.api.isActive && isPanelVisible;
		if (!(options === null || options === void 0 ? void 0 : options.skipSetActive)) {
			if (this.api.isActive !== isActive) this.api._onDidActiveChange.fire({ isActive: this.group.api.isActive && isPanelVisible });
		}
		if (this.api.isVisible !== isPanelVisible) this.api._onDidVisibilityChange.fire({ isVisible: isPanelVisible });
	}
	runEvents() {
		const isPanelVisible = this._group.model.isPanelActive(this);
		const isActive = this.group.api.isActive && isPanelVisible;
		if (this.api.isActive !== isActive) this.api._onDidActiveChange.fire({ isActive: this.group.api.isActive && isPanelVisible });
		if (this.api.isVisible !== isPanelVisible) this.api._onDidVisibilityChange.fire({ isVisible: isPanelVisible });
	}
	layout(width, height) {
		this.api._onDidDimensionChange.fire({
			width,
			height
		});
		this.view.layout(width, height);
	}
	dispose() {
		this.api.dispose();
		this.view.dispose();
	}
};

//#endregion
//#region src/dockview/components/tab/defaultTab.ts
var DefaultTab = class extends CompositeDisposable {
	get element() {
		return this._element;
	}
	constructor() {
		super();
		this._messages = DEFAULT_MESSAGES;
		this._element = document.createElement("div");
		this._element.className = "dv-default-tab";
		this._content = document.createElement("div");
		this._content.className = "dv-default-tab-content";
		this.action = document.createElement("div");
		this.action.className = "dv-default-tab-action";
		this.action.setAttribute("role", "button");
		this.action.setAttribute("tabindex", "-1");
		const closeIcon = createCloseButton();
		closeIcon.setAttribute("aria-hidden", "true");
		this.action.appendChild(closeIcon);
		this._element.appendChild(this._content);
		this._element.appendChild(this.action);
		this.render();
	}
	init(params) {
		var _params$containerApi$;
		this._title = params.title;
		this._messages = (_params$containerApi$ = params.containerApi.messages) !== null && _params$containerApi$ !== void 0 ? _params$containerApi$ : DEFAULT_MESSAGES;
		this.addDisposables(params.api.onDidTitleChange((event) => {
			this._title = event.title;
			this.render();
		}), addDisposableListener(this.action, "pointerdown", (ev) => {
			ev.preventDefault();
		}), addDisposableListener(this.action, "click", (ev) => {
			if (ev.defaultPrevented) return;
			ev.preventDefault();
			params.api.close();
		}));
		this.render();
	}
	render() {
		if (this._content.textContent !== this._title) {
			var _this$_title;
			this._content.textContent = (_this$_title = this._title) !== null && _this$_title !== void 0 ? _this$_title : "";
		}
		this.action.setAttribute("aria-label", this._title ? this._messages.closeTab(this._title) : this._messages.closeTabPlain());
	}
};

//#endregion
//#region src/dockview/dockviewPanelModel.ts
var DockviewPanelModel = class {
	get content() {
		return this._content;
	}
	get tab() {
		return this._tab;
	}
	constructor(accessor, id, contentComponent, tabComponent) {
		this.accessor = accessor;
		this.id = id;
		this.contentComponent = contentComponent;
		this.tabComponent = tabComponent;
		this._content = this.createContentComponent(this.id, contentComponent);
		this._tab = this.createTabComponent(this.id, tabComponent);
	}
	createTabRenderer(tabLocation) {
		const cmp = this.createTabComponent(this.id, this.tabComponent);
		if (this._params) cmp.init(_objectSpread2(_objectSpread2({}, this._params), {}, { tabLocation }));
		if (this._updateEvent) {
			var _cmp$update;
			(_cmp$update = cmp.update) === null || _cmp$update === void 0 || _cmp$update.call(cmp, this._updateEvent);
		}
		return cmp;
	}
	init(params) {
		this._params = params;
		this.content.init(params);
		this.tab.init(_objectSpread2(_objectSpread2({}, params), {}, { tabLocation: "header" }));
	}
	setTitle(title) {
		if (this._params) this._params.title = title;
	}
	layout(width, height) {
		var _this$content$layout, _this$content;
		(_this$content$layout = (_this$content = this.content).layout) === null || _this$content$layout === void 0 || _this$content$layout.call(_this$content, width, height);
	}
	update(event) {
		var _this$content$update, _this$content2, _this$tab$update, _this$tab;
		this._updateEvent = event;
		(_this$content$update = (_this$content2 = this.content).update) === null || _this$content$update === void 0 || _this$content$update.call(_this$content2, event);
		(_this$tab$update = (_this$tab = this.tab).update) === null || _this$tab$update === void 0 || _this$tab$update.call(_this$tab, event);
	}
	dispose() {
		var _this$content$dispose, _this$content3, _this$tab$dispose, _this$tab2;
		(_this$content$dispose = (_this$content3 = this.content).dispose) === null || _this$content$dispose === void 0 || _this$content$dispose.call(_this$content3);
		(_this$tab$dispose = (_this$tab2 = this.tab).dispose) === null || _this$tab$dispose === void 0 || _this$tab$dispose.call(_this$tab2);
	}
	createContentComponent(id, componentName) {
		return this.accessor.options.createComponent({
			id,
			name: componentName
		});
	}
	createTabComponent(id, componentName) {
		const name = componentName !== null && componentName !== void 0 ? componentName : this.accessor.options.defaultTabComponent;
		if (name) {
			if (this.accessor.options.createTabComponent) {
				const component = this.accessor.options.createTabComponent({
					id,
					name
				});
				if (component) return component;
				else return new DefaultTab();
			}
			console.warn(`dockview: tabComponent '${componentName}' was not found. falling back to the default tab.`);
		}
		return new DefaultTab();
	}
};

//#endregion
//#region src/dockview/deserializer.ts
var DefaultDockviewDeserialzier = class {
	constructor(accessor) {
		this.accessor = accessor;
	}
	fromJSON(panelData, group) {
		var _panelData$contentCom, _viewData$tab, _this$accessor$option;
		const panelId = panelData.id;
		const params = panelData.params;
		const title = panelData.title;
		const viewData = panelData.view;
		const contentComponent = viewData ? viewData.content.id : (_panelData$contentCom = panelData.contentComponent) !== null && _panelData$contentCom !== void 0 ? _panelData$contentCom : "unknown";
		const tabComponent = viewData ? (_viewData$tab = viewData.tab) === null || _viewData$tab === void 0 ? void 0 : _viewData$tab.id : panelData.tabComponent;
		const view = new DockviewPanelModel(this.accessor, panelId, contentComponent, tabComponent);
		const panel = new DockviewPanel(panelId, contentComponent, tabComponent, this.accessor, new DockviewApi(this.accessor), group, view, {
			renderer: panelData.renderer,
			minimumWidth: panelData.minimumWidth,
			minimumHeight: panelData.minimumHeight,
			maximumWidth: panelData.maximumWidth,
			maximumHeight: panelData.maximumHeight
		});
		panel.init({
			title: title !== null && title !== void 0 ? title : panelId,
			params: params !== null && params !== void 0 ? params : {}
		});
		if (panelData.pinned && ((_this$accessor$option = this.accessor.options.pinnedTabs) === null || _this$accessor$option === void 0 ? void 0 : _this$accessor$option.enabled)) panel.setPinned(true);
		return panel;
	}
};

//#endregion
//#region src/dockview/components/watermark/watermark.ts
var Watermark = class extends CompositeDisposable {
	get element() {
		return this._element;
	}
	constructor() {
		super();
		this._element = document.createElement("div");
		this._element.className = "dv-watermark";
	}
	init(_params) {}
};

//#endregion
//#region src/overlay/overlay.ts
var AriaLevelTracker = class {
	constructor() {
		this._orderedList = [];
	}
	push(element) {
		this._orderedList = [...this._orderedList.filter((item) => item !== element), element];
		this.update();
	}
	destroy(element) {
		this._orderedList = this._orderedList.filter((item) => item !== element);
		this.update();
	}
	update() {
		for (let i = 0; i < this._orderedList.length; i++) {
			this._orderedList[i].setAttribute("aria-level", `${i}`);
			this._orderedList[i].style.zIndex = `calc(var(--dv-overlay-z-index, 999) + ${i * 2})`;
		}
	}
};
const arialLevelTracker = new AriaLevelTracker();
/**
* A detached element, or one under a `display: none` ancestor, measures 0x0;
* clamping against such a rect collapses every position to 0.
*/
function hasLayout(rect) {
	return rect.width > 0 && rect.height > 0;
}
var Overlay = class Overlay extends CompositeDisposable {
	set minimumInViewportWidth(value) {
		this.options.minimumInViewportWidth = value;
	}
	set minimumInViewportHeight(value) {
		this.options.minimumInViewportHeight = value;
	}
	get element() {
		return this._element;
	}
	get isVisible() {
		return this._isVisible;
	}
	/**
	* Height of the optional drag-handle header, or 0 when none is present.
	* Used to translate between the overlay's outer box and the content area
	* available to the group beneath the header.
	*/
	get headerHeight() {
		var _this$options$header$, _this$options$header;
		return (_this$options$header$ = (_this$options$header = this.options.header) === null || _this$options$header === void 0 ? void 0 : _this$options$header.offsetHeight) !== null && _this$options$header$ !== void 0 ? _this$options$header$ : 0;
	}
	constructor(options) {
		super();
		this.options = options;
		this._element = document.createElement("div");
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		this._onDidChangeEnd = new Emitter();
		this.onDidChangeEnd = this._onDidChangeEnd.event;
		this._onDidStartMoving = new Emitter();
		this.onDidStartMoving = this._onDidStartMoving.event;
		this._dragMove = new MutableDisposable();
		this._dragCancelled = false;
		this.addDisposables(this._onDidChange, this._onDidChangeEnd, this._onDidStartMoving, this._dragMove);
		this._element.className = "dv-resize-container";
		this._element.setAttribute("role", "dialog");
		this._element.setAttribute("aria-modal", "false");
		this._isVisible = true;
		this.setupResize("top");
		this.setupResize("bottom");
		this.setupResize("left");
		this.setupResize("right");
		this.setupResize("topleft");
		this.setupResize("topright");
		this.setupResize("bottomleft");
		this.setupResize("bottomright");
		if (this.options.header) {
			toggleClass(this._element, "dv-resize-container-with-titlebar", true);
			this._element.appendChild(this.options.header);
		}
		this._element.appendChild(this.options.content);
		this.options.container.appendChild(this._element);
		this.setBounds(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({
			height: this.options.height,
			width: this.options.width
		}, "top" in this.options && { top: this.options.top }), "bottom" in this.options && { bottom: this.options.bottom }), "left" in this.options && { left: this.options.left }), "right" in this.options && { right: this.options.right }));
		arialLevelTracker.push(this._element);
	}
	setVisible(isVisible) {
		if (isVisible === this.isVisible) return;
		this._isVisible = isVisible;
		toggleClass(this.element, "dv-hidden", !this.isVisible);
	}
	bringToFront() {
		arialLevelTracker.push(this._element);
	}
	setBounds(bounds = {}) {
		if (typeof bounds.height === "number") this._element.style.height = `${bounds.height}px`;
		if (typeof bounds.width === "number") this._element.style.width = `${bounds.width}px`;
		if ("top" in bounds && typeof bounds.top === "number") {
			this._element.style.top = `${bounds.top}px`;
			this._element.style.bottom = "auto";
			this.verticalAlignment = "top";
		}
		if ("bottom" in bounds && typeof bounds.bottom === "number") {
			this._element.style.bottom = `${bounds.bottom}px`;
			this._element.style.top = "auto";
			this.verticalAlignment = "bottom";
		}
		if ("left" in bounds && typeof bounds.left === "number") {
			this._element.style.left = `${bounds.left}px`;
			this._element.style.right = "auto";
			this.horiziontalAlignment = "left";
		}
		if ("right" in bounds && typeof bounds.right === "number") {
			this._element.style.right = `${bounds.right}px`;
			this._element.style.left = "auto";
			this.horiziontalAlignment = "right";
		}
		const containerRect = this.options.container.getBoundingClientRect();
		const overlayRect = this._element.getBoundingClientRect();
		if (!hasLayout(containerRect) || !hasLayout(overlayRect)) {
			this._onDidChange.fire();
			return;
		}
		const xOffset = Math.max(0, this.getMinimumWidth(overlayRect.width));
		const yOffset = Math.max(0, this.getMinimumHeight(overlayRect.height));
		if (this.verticalAlignment === "top") {
			const top = clamp(overlayRect.top - containerRect.top, -yOffset, Math.max(0, containerRect.height - overlayRect.height + yOffset));
			this._element.style.top = `${top}px`;
			this._element.style.bottom = "auto";
		}
		if (this.verticalAlignment === "bottom") {
			const bottom = clamp(containerRect.bottom - overlayRect.bottom, -yOffset, Math.max(0, containerRect.height - overlayRect.height + yOffset));
			this._element.style.bottom = `${bottom}px`;
			this._element.style.top = "auto";
		}
		if (this.horiziontalAlignment === "left") {
			const left = clamp(overlayRect.left - containerRect.left, -xOffset, Math.max(0, containerRect.width - overlayRect.width + xOffset));
			this._element.style.left = `${left}px`;
			this._element.style.right = "auto";
		}
		if (this.horiziontalAlignment === "right") {
			const right = clamp(containerRect.right - overlayRect.right, -xOffset, Math.max(0, containerRect.width - overlayRect.width + xOffset));
			this._element.style.right = `${right}px`;
			this._element.style.left = "auto";
		}
		this._onDidChange.fire();
	}
	toJSON() {
		const container = this.options.container.getBoundingClientRect();
		const element = this._element.getBoundingClientRect();
		const result = {};
		if (this.verticalAlignment === "top") result.top = Number.parseFloat(this._element.style.top);
		else if (this.verticalAlignment === "bottom") result.bottom = Number.parseFloat(this._element.style.bottom);
		else result.top = element.top - container.top;
		if (this.horiziontalAlignment === "left") result.left = Number.parseFloat(this._element.style.left);
		else if (this.horiziontalAlignment === "right") result.right = Number.parseFloat(this._element.style.right);
		else result.left = element.left - container.left;
		if (hasLayout(element)) {
			result.width = element.width;
			result.height = element.height;
		} else {
			result.width = Number.parseFloat(this._element.style.width) || 0;
			result.height = Number.parseFloat(this._element.style.height) || 0;
		}
		return result;
	}
	/**
	* Abort an in-flight move-the-float drag. Used by the void container
	* when a redock long-press fires after the move started, so the ghost
	* gesture wins without the float continuing to follow the finger.
	* Does not emit `onDidChangeEnd` because no change is being committed.
	*/
	cancelPendingDrag() {
		if (!this._dragMove.value) return;
		this._dragCancelled = true;
		toggleClass(this._element, "dv-resize-container-dragging", false);
		this._dragMove.value = Disposable.NONE;
	}
	setupDrag(dragTarget, options) {
		const track = (captureTarget, pointerId) => {
			var _this$options$getSibl, _this$options$getSibl2, _this$options;
			let offset = null;
			let hasMoved = false;
			this._dragCancelled = false;
			const siblingBoxes = this.options.transformDragPosition ? (_this$options$getSibl = (_this$options$getSibl2 = (_this$options = this.options).getSiblingBoxes) === null || _this$options$getSibl2 === void 0 ? void 0 : _this$options$getSibl2.call(_this$options)) !== null && _this$options$getSibl !== void 0 ? _this$options$getSibl : [] : [];
			const iframes = disableIframePointEvents();
			if (captureTarget && typeof pointerId === "number" && typeof captureTarget.setPointerCapture === "function") try {
				captureTarget.setPointerCapture(pointerId);
			} catch (_unused) {}
			const end = () => {
				toggleClass(this._element, "dv-resize-container-dragging", false);
				this._dragMove.value = Disposable.NONE;
				this._onDidChangeEnd.fire();
			};
			this._dragMove.value = new CompositeDisposable({ dispose: () => {
				iframes.release();
				if (captureTarget && typeof pointerId === "number" && typeof captureTarget.releasePointerCapture === "function") try {
					captureTarget.releasePointerCapture(pointerId);
				} catch (_unused2) {}
			} }, addDisposableListener(globalThis.window, "pointermove", (e) => {
				var _offset;
				if (this._dragCancelled) return;
				const containerRect = this.options.container.getBoundingClientRect();
				const x = e.clientX - containerRect.left;
				const y = e.clientY - containerRect.top;
				toggleClass(this._element, "dv-resize-container-dragging", true);
				const overlayRect = this._element.getBoundingClientRect();
				(_offset = offset) !== null && _offset !== void 0 || (offset = {
					x: e.clientX - overlayRect.left,
					y: e.clientY - overlayRect.top
				});
				const xOffset = Math.max(0, this.getMinimumWidth(overlayRect.width));
				const yOffset = Math.max(0, this.getMinimumHeight(overlayRect.height));
				let proposedTop = y - offset.y;
				let proposedLeft = x - offset.x;
				if (this.options.transformDragPosition) {
					const adjusted = this.options.transformDragPosition({
						proposed: {
							top: proposedTop,
							left: proposedLeft,
							width: overlayRect.width,
							height: overlayRect.height
						},
						container: {
							width: containerRect.width,
							height: containerRect.height
						},
						others: siblingBoxes,
						modifiers: {
							altKey: e.altKey,
							ctrlKey: e.ctrlKey,
							metaKey: e.metaKey,
							shiftKey: e.shiftKey
						}
					});
					if (adjusted) {
						proposedTop = adjusted.top;
						proposedLeft = adjusted.left;
					}
				}
				const maxTop = Math.max(0, containerRect.height - overlayRect.height + yOffset);
				const maxLeft = Math.max(0, containerRect.width - overlayRect.width + xOffset);
				const top = clamp(proposedTop, -yOffset, maxTop);
				const bottom = clamp(containerRect.height - overlayRect.height - proposedTop, -yOffset, maxTop);
				const left = clamp(proposedLeft, -xOffset, maxLeft);
				const right = clamp(containerRect.width - overlayRect.width - proposedLeft, -xOffset, maxLeft);
				const bounds = {};
				if (top <= bottom) bounds.top = top;
				else bounds.bottom = bottom;
				if (left <= right) bounds.left = left;
				else bounds.right = right;
				this.setBounds(bounds);
				if (!hasMoved) {
					hasMoved = true;
					this._onDidStartMoving.fire();
				}
			}), addDisposableListener(globalThis.window, "pointerup", end), addDisposableListener(globalThis.window, "pointercancel", end));
		};
		this.addDisposables(addDisposableListener(dragTarget, "pointerdown", (event) => {
			if (event.defaultPrevented) {
				event.preventDefault();
				return;
			}
			if (quasiDefaultPrevented(event)) return;
			track(dragTarget, event.pointerId);
		}), addDisposableListener(this.options.content, "pointerdown", (event) => {
			if (event.defaultPrevented) return;
			if (quasiDefaultPrevented(event)) return;
			if (event.shiftKey) track(this.options.content, event.pointerId);
		}), addDisposableListener(this.options.content, "pointerdown", () => {
			arialLevelTracker.push(this._element);
		}, true));
		if (options === null || options === void 0 ? void 0 : options.inDragMode) track();
	}
	setupResize(direction) {
		const resizeHandleElement = document.createElement("div");
		resizeHandleElement.className = `dv-resize-handle-${direction}`;
		this._element.appendChild(resizeHandleElement);
		const move = new MutableDisposable();
		this.addDisposables(move, addDisposableListener(resizeHandleElement, "pointerdown", (e) => {
			e.preventDefault();
			let startPosition = null;
			const iframes = disableIframePointEvents();
			const pointerId = e.pointerId;
			if (typeof resizeHandleElement.setPointerCapture === "function") try {
				resizeHandleElement.setPointerCapture(pointerId);
			} catch (_unused3) {}
			const end = () => {
				move.dispose();
				this._onDidChangeEnd.fire();
			};
			move.value = new CompositeDisposable(addDisposableListener(globalThis.window, "pointermove", (e) => {
				var _startPosition;
				const containerRect = this.options.container.getBoundingClientRect();
				const overlayRect = this._element.getBoundingClientRect();
				const y = e.clientY - containerRect.top;
				const x = e.clientX - containerRect.left;
				(_startPosition = startPosition) !== null && _startPosition !== void 0 || (startPosition = {
					originalY: y,
					originalHeight: overlayRect.height,
					originalX: x,
					originalWidth: overlayRect.width,
					originTop: overlayRect.top - containerRect.top,
					originLeft: overlayRect.left - containerRect.left
				});
				let top = void 0;
				let bottom = void 0;
				let height = void 0;
				let left = void 0;
				let right = void 0;
				let width = void 0;
				const moveTop = () => {
					const maxTop = startPosition.originalY + startPosition.originalHeight > containerRect.height ? Math.max(0, containerRect.height - Overlay.MINIMUM_HEIGHT) : Math.max(0, startPosition.originalY + startPosition.originalHeight - Overlay.MINIMUM_HEIGHT);
					top = clamp(startPosition.originTop + (y - startPosition.originalY), -Number.MAX_VALUE, maxTop);
					height = startPosition.originalHeight - (top - startPosition.originTop);
					bottom = containerRect.height - top - height;
				};
				const moveBottom = () => {
					top = startPosition.originTop;
					const minHeight = top < 0 && typeof this.options.minimumInViewportHeight === "number" ? -top + this.options.minimumInViewportHeight : Overlay.MINIMUM_HEIGHT;
					height = clamp(startPosition.originalHeight + (y - startPosition.originalY), minHeight, Number.MAX_VALUE);
					bottom = containerRect.height - top - height;
				};
				const moveLeft = () => {
					const maxLeft = startPosition.originalX + startPosition.originalWidth > containerRect.width ? Math.max(0, containerRect.width - Overlay.MINIMUM_WIDTH) : Math.max(0, startPosition.originalX + startPosition.originalWidth - Overlay.MINIMUM_WIDTH);
					left = clamp(startPosition.originLeft + (x - startPosition.originalX), -Number.MAX_VALUE, maxLeft);
					width = startPosition.originalWidth - (left - startPosition.originLeft);
					right = containerRect.width - left - width;
				};
				const moveRight = () => {
					left = startPosition.originLeft;
					const minWidth = left < 0 && typeof this.options.minimumInViewportWidth === "number" ? -left + this.options.minimumInViewportWidth : Overlay.MINIMUM_WIDTH;
					width = clamp(startPosition.originalWidth + (x - startPosition.originalX), minWidth, Number.MAX_VALUE);
					right = containerRect.width - left - width;
				};
				switch (direction) {
					case "top":
						moveTop();
						break;
					case "bottom":
						moveBottom();
						break;
					case "left":
						moveLeft();
						break;
					case "right":
						moveRight();
						break;
					case "topleft":
						moveTop();
						moveLeft();
						break;
					case "topright":
						moveTop();
						moveRight();
						break;
					case "bottomleft":
						moveBottom();
						moveLeft();
						break;
					case "bottomright":
						moveBottom();
						moveRight();
						break;
				}
				const bounds = {};
				if (top <= bottom) bounds.top = top;
				else bounds.bottom = bottom;
				if (left <= right) bounds.left = left;
				else bounds.right = right;
				bounds.height = height;
				bounds.width = width;
				this.setBounds(bounds);
			}), { dispose: () => {
				iframes.release();
				if (typeof resizeHandleElement.releasePointerCapture === "function") try {
					resizeHandleElement.releasePointerCapture(pointerId);
				} catch (_unused4) {}
			} }, addDisposableListener(globalThis.window, "pointerup", end), addDisposableListener(globalThis.window, "pointercancel", end));
		}));
	}
	getMinimumWidth(width) {
		if (typeof this.options.minimumInViewportWidth === "number") return width - this.options.minimumInViewportWidth;
		return 0;
	}
	getMinimumHeight(height) {
		if (typeof this.options.minimumInViewportHeight === "number") return height - this.options.minimumInViewportHeight;
		return 0;
	}
	dispose() {
		arialLevelTracker.destroy(this._element);
		this._element.remove();
		super.dispose();
	}
};
Overlay.MINIMUM_HEIGHT = 20;
Overlay.MINIMUM_WIDTH = 20;

//#endregion
//#region src/dockview/components/titlebar/floatingTitleBar.ts
/**
* A dedicated, blank drag handle rendered above a floating group's tab bar.
*
* It plays the same dual role the tab-bar void container plays today: a plain
* pointer-drag moves the floating window (wired by the overlay via
* `setupDrag`), while a shift+drag (mouse) or long-press (touch) detaches the
* group to redock it into the grid. The redock half is provided by the shared
* {@link GroupDragSource}; the move half is owned by the overlay.
*
* The bar is intentionally contentless; styling is driven entirely through
* the `--dv-floating-titlebar-*` theme variables.
*/
var FloatingTitleBar = class extends CompositeDisposable {
	get element() {
		return this._element;
	}
	/** The window's current anchor group, the one this bar drags/activates. */
	get group() {
		return this._group;
	}
	/**
	* Retarget the bar at a new anchor group. Called when the original anchor
	* leaves a multi-group floating window and another member is promoted, so
	* the bar keeps activating/redocking a group that actually lives here.
	*/
	setGroup(group) {
		this._group = group;
	}
	constructor(accessor, group) {
		super();
		this.accessor = accessor;
		this._onDragStart = new Emitter();
		this.onDragStart = this._onDragStart.event;
		this._group = group;
		this._element = document.createElement("div");
		this._element.className = "dv-floating-titlebar";
		this.addDisposables(this._onDragStart, addDisposableListener(this._element, "pointerdown", () => {
			this.accessor.doSetGroupActive(this._group);
		}), addDisposableListener(this._element, "pointerdown", (e) => {
			if (e.shiftKey) quasiPreventDefault(e);
		}, true));
		this.dragSource = new GroupDragSource({
			element: this._element,
			accessor: this.accessor,
			group: () => this._group
		});
		this.addDisposables(this.dragSource, this.dragSource.onDragStart((event) => {
			this._onDragStart.fire(event);
		}));
	}
	updateDragAndDropState() {
		this.dragSource.updateDragAndDropState();
	}
};

//#endregion
//#region src/dockview/modules.ts
/**
* Typed helper for defining a module. Enforces that the factory's return
* type matches the slot in ServiceCollection at compile time, replacing
* the manual cast each module file would otherwise need.
*/
function defineModule(config) {
	return {
		moduleName: config.name,
		options: config.options,
		services: { [config.serviceKey]: config.create },
		init: config.init ? (host, services) => config.init(host, services[config.serviceKey]) : void 0,
		dependsOn: config.dependsOn
	};
}
/**
* The modules that ship in `dockview-enterprise` rather than the free
* packages. Core never imports them; it holds their names only so a
* missing-module message can name the package that provides the fix.
*
* Keep in sync with the `Modules` list exported by `dockview-enterprise`.
*/
const ENTERPRISE_MODULE_NAMES = /* @__PURE__ */ new Set([
	"AdvancedOverflow",
	"AutoEdgeGroup",
	"AutoHideEdgeGroup",
	"DndCompass",
	"KeyboardDocking",
	"KeyboardNavigation",
	"LayoutHistory",
	"License",
	"MultiRowTabs",
	"PinnedTabs",
	"SmartGuides"
]);
const _warnedMissingModule = /* @__PURE__ */ new Set();
/**
* Builds the text for a module that a caller needed but which isn't
* registered. `reason` describes what the user did to need it (an option they
* set, an api method they called) and is quoted verbatim. Pass several when one
* module is needed for several reasons at once: a single message listing them
* beats one message per reason each repeating the same install instructions.
*
* Exported so the rare caller that must throw (see `assertModule`) can raise
* the same message rather than a thinner second one.
*
* Enterprise modules get the install/import fix inline, because importing
* `dockview-enterprise` self-registers every enterprise module, so there is no
* separate `registerModules` step for the user to get wrong.
*/
function missingModuleMessage(moduleName, reason) {
	const reasons = reason === void 0 ? [] : [].concat(reason);
	const quoted = reasons.map((r) => `\`${r}\``).join(", ");
	const requires = reasons.length > 1 ? "require" : "requires";
	const needed = reasons.length ? `${quoted} ${requires} the "${moduleName}" module` : `The "${moduleName}" module is required`;
	if (ENTERPRISE_MODULE_NAMES.has(moduleName)) return `dockview: ${needed}, which ships in dockview-enterprise.\n\n  npm install dockview-enterprise\n  import 'dockview-enterprise'; // self-registers every enterprise module\n`;
	return `dockview: ${needed}, but it is not registered.`;
}
/**
* Logs a deduplicated "module not registered" error naming what was needed and
* how to get it. Deduped per module+reasons for the lifetime of the page, so
* repeated calls (and re-validation on every `updateOptions`) log once.
*/
function logMissingModule(moduleName, reason) {
	const key = `${moduleName}|${(reason === void 0 ? [] : [].concat(reason)).join("|")}`;
	if (_warnedMissingModule.has(key)) return;
	_warnedMissingModule.add(key);
	console.error(missingModuleMessage(moduleName, reason));
}
/**
* Returns the service if its module is registered, otherwise logs a
* deduplicated console error and returns `undefined`. This function never
* throws: the affected feature degrades to a no-op so consuming applications
* don't crash in production.
*
* The one exception is an entry point that must return a value it cannot
* synthesise: `addEdgeGroup(): DockviewGroupPanelApi` has no group to hand
* back and no `undefined` in its return type, so it throws
* `missingModuleMessage(...)` directly instead of calling this. Don't route
* such a caller through here: it would log *and* throw, reporting twice.
*
* Use at public-API entry points where the caller wants to surface which
* module is missing. For internal/lifecycle paths, plain `?.` chaining on
* the service slot is preferred: no log, a silent no-op.
*
* Two rules decide whether an entry point guards:
*
* 1. **Commands, not queries.** `api.undo()` asked for something to happen, so
*    silence is a bug report waiting to happen; `canUndo` asked a question, and
*    `false` is a truthful answer that shouldn't log. Same for event getters
*    falling back to a never-firing event, and for idempotent cleanup
*    (`clearHistory()` on an absent history has genuinely nothing to do).
*
* 2. **Only if the option rule can't already have fired.** A command reachable
*    without its gating option (`api.undo()` works on a component that never
*    set `layoutHistory`) needs this, because no rule will have run. A command
*    that can't be reached until the option is set doesn't: `setPanelPinned`
*    returns early unless `pinnedTabs.enabled`, so by the time it could warn,
*    the option rule has already named the same module. Guarding it too would
*    report one mistake twice.
*
* Rule 2 tolerates one overlap: setting `layoutHistory.enabled` *and* calling
* `api.undo()` without the module reports both, since the reasons differ and
* dedup is per module+reason. That's the price of covering the far more likely
* case: calling `undo()` having never set the option at all.
*
* Interaction handlers are queries in this sense too: a right-click reaching an
* absent module means the app never asked for that feature, so it stays silent
* (`?.`) and the browser's own behaviour applies. Options are where intent is
* declared; see `optionsModules.ts`.
*/
function assertModule(service, moduleName, context) {
	if (service !== void 0) return service;
	logMissingModule(moduleName, context);
}
var ModuleRegistry = class {
	constructor() {
		this._modules = /* @__PURE__ */ new Map();
		this._services = {};
		this._initDisposables = [];
	}
	get services() {
		return this._services;
	}
	register(module) {
		if (this._modules.has(module.moduleName)) return;
		if (module.dependsOn) for (const dep of module.dependsOn) this.register(dep);
		this._modules.set(module.moduleName, module);
	}
	initialize(host) {
		for (const module of this._modules.values()) {
			if (!module.services) continue;
			for (const [name, factory] of Object.entries(module.services)) this._services[name] = factory(host);
		}
	}
	postConstruct(host) {
		for (const module of this._modules.values()) if (module.init) this._initDisposables.push(module.init(host, this._services));
	}
	has(moduleName) {
		return this._modules.has(moduleName);
	}
	dispose() {
		for (const disposable of this._initDisposables) disposable.dispose();
		this._initDisposables.length = 0;
		for (const service of Object.values(this._services)) if (service !== void 0 && typeof service.dispose === "function") service.dispose();
	}
};
/**
* Process-global list of modules registered via {@link registerModules}.
* `DockviewComponent` appends these to its built-in set at construction, so
* importing a package that calls `registerModules(...)` (e.g. `dockview`)
* makes those modules available to every component in the process.
*/
const _globalModules = [];
/**
* Register modules globally. Idempotent per `moduleName`: registering the
* same module twice is a no-op. Intended to be called once at import time by
* the package that bundles a given set of modules.
*/
function registerModules(modules) {
	for (const module of modules) {
		if (_globalModules.some((m) => m.moduleName === module.moduleName)) continue;
		_globalModules.push(module);
	}
}
/**
* Returns the globally-registered modules (a copy). `DockviewComponent` reads
* this to extend its built-in module set.
*/
function getRegisteredModules() {
	return [..._globalModules];
}
/**
* For tests: clears the global module registry.
*/
function clearRegisteredModules() {
	_globalModules.length = 0;
}

//#endregion
//#region src/dockview/optionsModules.ts
/**
* Maps dockview options to the modules that implement them, so setting an
* option for an absent module reports which module is missing instead of
* silently doing nothing.
*
* This is the "declared intent" diagnostic. It fires when the user asks for a
* feature via options, at construction and on every `updateOptions`. It
* deliberately does *not* fire on user interaction: an interaction reaching an
* absent module stays silent, because the `?.` service-slot call sites can't
* tell a missing module from a feature the app never wanted.
*
* Rules are a flat list rather than a `Record<keyof DockviewOptions, ...>`
* because dockview's options are nested and value-gated: `overflow.mode:
* 'wrap'` needs MultiRowTabs while `overflow.search` needs AdvancedOverflow,
* so one top-level key maps to several modules depending on its contents. A
* rule per gated thing also lets `reason` name the exact path the user set,
* which is the whole point of the message.
*
* ## Adding a rule
*
* A rule is just "this option needs that module". Whether that makes it paid is
* not a judgement call: a module is enterprise iff it ships in
* `dockview-enterprise`'s `Modules` list. {@link ENTERPRISE_MODULE_NAMES}
* mirrors that list, and a test in dockview-enterprise fails if the two drift,
* so naming the right module is the only thing you have to get right here.
*
* The one trap is picking the module. Don't infer it from what core does at
* runtime: a core fallback that hands a paid feature to free builds would read
* as "the option is free" and turn one bug into two. Pick the module that
* *implements the documented feature*; if core also does it, that is a leak to
* fix in core, not a reason to drop the rule.
*/
const OPTION_MODULE_RULES = [
	{
		optionKey: "smartGuides",
		reason: "smartGuides",
		moduleName: "SmartGuides",
		when: (o) => !!o.smartGuides && o.smartGuides.enabled !== false
	},
	{
		optionKey: "layoutHistory",
		reason: "layoutHistory.enabled: true",
		moduleName: "LayoutHistory",
		when: (o) => {
			var _o$layoutHistory;
			return ((_o$layoutHistory = o.layoutHistory) === null || _o$layoutHistory === void 0 ? void 0 : _o$layoutHistory.enabled) === true;
		}
	},
	{
		optionKey: "pinnedTabs",
		reason: "pinnedTabs.enabled: true",
		moduleName: "PinnedTabs",
		when: (o) => {
			var _o$pinnedTabs;
			return ((_o$pinnedTabs = o.pinnedTabs) === null || _o$pinnedTabs === void 0 ? void 0 : _o$pinnedTabs.enabled) === true;
		}
	},
	{
		optionKey: "overflow",
		reason: "overflow.mode: 'wrap'",
		moduleName: "MultiRowTabs",
		when: (o) => {
			var _o$overflow;
			return ((_o$overflow = o.overflow) === null || _o$overflow === void 0 ? void 0 : _o$overflow.mode) === "wrap";
		}
	},
	{
		optionKey: "overflow",
		reason: "overflow.maxRows",
		moduleName: "MultiRowTabs",
		when: (o) => {
			var _o$overflow2;
			return ((_o$overflow2 = o.overflow) === null || _o$overflow2 === void 0 ? void 0 : _o$overflow2.maxRows) != null;
		}
	},
	{
		optionKey: "overflow",
		reason: "overflow.search",
		moduleName: "AdvancedOverflow",
		when: (o) => {
			var _o$overflow3;
			return !!((_o$overflow3 = o.overflow) === null || _o$overflow3 === void 0 ? void 0 : _o$overflow3.search);
		}
	},
	{
		optionKey: "overflow",
		reason: "overflow.mru",
		moduleName: "AdvancedOverflow",
		when: (o) => {
			var _o$overflow4;
			return !!((_o$overflow4 = o.overflow) === null || _o$overflow4 === void 0 ? void 0 : _o$overflow4.mru);
		}
	},
	{
		optionKey: "autoHideEdgeGroups",
		reason: "autoHideEdgeGroups",
		moduleName: "AutoHideEdgeGroup",
		when: (o) => isAnyEdgeGroupEnabled(o.autoHideEdgeGroups)
	},
	{
		optionKey: "dockToEdgeGroups",
		reason: "dockToEdgeGroups",
		moduleName: "AutoEdgeGroup",
		when: (o) => isAnyEdgeGroupEnabled(o.dockToEdgeGroups)
	},
	{
		optionKey: "dndCompass",
		reason: "dndCompass",
		moduleName: "DndCompass",
		when: (o) => !!o.dndCompass
	},
	{
		optionKey: "keyboardNavigation",
		reason: "keyboardNavigation",
		moduleName: "KeyboardNavigation",
		when: (o) => !!o.keyboardNavigation
	}
];
/**
* Reports any option in `options` whose module isn't registered. Never throws.
*
* Reasons are grouped so each missing module produces exactly one message, however
* many of its options were set: `overflow: { mode: 'wrap', maxRows: 3 }` names
* both paths in a single MultiRowTabs error rather than repeating the install
* instructions twice. Logging is deduplicated per module+reasons (see
* `logMissingModule`), so re-validating on every `updateOptions` stays quiet.
*
* Pass the options the caller supplied, not the merged set; see
* {@link OptionModuleRule.when}.
*/
function validateOptionModules(options, isModuleRegistered) {
	const reasonsByModule = /* @__PURE__ */ new Map();
	for (const rule of OPTION_MODULE_RULES) {
		if (!rule.when(options) || isModuleRegistered(rule.moduleName)) continue;
		const reasons = reasonsByModule.get(rule.moduleName);
		if (reasons) reasons.push(rule.reason);
		else reasonsByModule.set(rule.moduleName, [rule.reason]);
	}
	for (const [moduleName, reasons] of reasonsByModule) logMissingModule(moduleName, reasons);
}

//#endregion
//#region src/constants.ts
const DEFAULT_FLOATING_GROUP_POSITION = {
	left: 100,
	top: 100,
	width: 300,
	height: 300
};

//#endregion
//#region src/dockview/dockviewFloatingGroupPanel.ts
var DockviewFloatingGroupPanel = class extends CompositeDisposable {
	/**
	* The window's representative/anchor group. A floating window can host a
	* nested layout of several groups; the anchor is used for back-compat
	* single-group APIs and is reassigned if it leaves the window.
	*/
	get group() {
		return this._group;
	}
	/**
	* Register the dedicated title bar (if any) so anchor reassignment keeps
	* its drag handle pointed at a group that still lives in this window.
	*/
	setTitleBar(titleBar) {
		this._titleBar = titleBar;
	}
	setAnchorGroup(group) {
		var _this$_titleBar;
		this._group = group;
		(_this$_titleBar = this._titleBar) === null || _this$_titleBar === void 0 || _this$_titleBar.setGroup(group);
		this._onDidChangeAnchorGroup.fire(group);
	}
	constructor(group, overlay, gridview) {
		super();
		this.overlay = overlay;
		this.gridview = gridview;
		this._onDidChangeAnchorGroup = new Emitter();
		this.onDidChangeAnchorGroup = this._onDidChangeAnchorGroup.event;
		this._group = group;
		this.addDisposables(this._onDidChangeAnchorGroup, overlay, { dispose: () => this.gridview.dispose() });
	}
	position(bounds) {
		this.overlay.setBounds(bounds);
	}
};

//#endregion
//#region src/dockview/floatingGroupService.ts
var FloatingGroupService = class {
	get floatingGroups() {
		return this._floatingGroups;
	}
	constructor(host) {
		this._floatingGroups = [];
		this._host = host;
	}
	add(group, overlay, gridview) {
		const floatingGroupPanel = new DockviewFloatingGroupPanel(group, overlay, gridview);
		const disposable = new CompositeDisposable((() => {
			let lastWidth = -1;
			let lastHeight = -1;
			return watchElementResize(gridview.element, (entry) => {
				const width = Math.round(entry.contentRect.width);
				const height = Math.round(entry.contentRect.height);
				if (width === lastWidth && height === lastHeight) return;
				lastWidth = width;
				lastHeight = height;
				gridview.layout(width, height);
			});
		})());
		const updateDialogLabel = (anchor) => {
			var _anchor$activePanel;
			const title = (_anchor$activePanel = anchor.activePanel) === null || _anchor$activePanel === void 0 ? void 0 : _anchor$activePanel.title;
			if (title) overlay.element.setAttribute("aria-label", title);
			else overlay.element.removeAttribute("aria-label");
		};
		const anchorDisposable = new MutableDisposable();
		const bindAnchor = (anchor) => {
			updateDialogLabel(anchor);
			anchorDisposable.value = new CompositeDisposable(anchor.api.onDidActiveChange((event) => {
				if (event.isActive) overlay.bringToFront();
			}), anchor.api.onDidActivePanelChange(() => updateDialogLabel(anchor)), anchor.onDidChange((event) => {
				overlay.setBounds({
					height: typeof (event === null || event === void 0 ? void 0 : event.height) === "number" ? event.height + overlay.headerHeight : event === null || event === void 0 ? void 0 : event.height,
					width: event === null || event === void 0 ? void 0 : event.width
				});
			}));
		};
		bindAnchor(group);
		floatingGroupPanel.addDisposables(anchorDisposable, floatingGroupPanel.onDidChangeAnchorGroup((anchor) => bindAnchor(anchor)), overlay.onDidChange(() => {
			gridview.layout(gridview.width, gridview.height);
		}), overlay.onDidChangeEnd(() => {
			this._host.fireLayoutChange("geometry");
		}), { dispose: () => {
			disposable.dispose();
			remove(this._floatingGroups, floatingGroupPanel);
			group.model.location = { type: "grid" };
		} });
		this._floatingGroups.push(floatingGroupPanel);
		return floatingGroupPanel;
	}
	findByGroup(group) {
		return this._floatingGroups.find((floating) => floating.group === group || floating.gridview.element.contains(group.element));
	}
	serialize() {
		return this._floatingGroups.map((floating) => {
			const grid = floating.gridview.serialize();
			const position = floating.overlay.toJSON();
			const root = grid.root;
			if (root.type === "branch" && root.data.length === 1 && root.data[0].type === "leaf") return {
				data: root.data[0].data,
				position
			};
			return {
				grid,
				position
			};
		});
	}
	constrainBounds() {
		for (const floating of this._floatingGroups) floating.overlay.setBounds();
	}
	updateBounds(options) {
		if (!("floatingGroupBounds" in options)) return;
		for (const group of this._floatingGroups) {
			switch (options.floatingGroupBounds) {
				case "boundedWithinViewport":
					group.overlay.minimumInViewportHeight = void 0;
					group.overlay.minimumInViewportWidth = void 0;
					break;
				case void 0:
					group.overlay.minimumInViewportHeight = 100;
					group.overlay.minimumInViewportWidth = 100;
					break;
				default:
					var _options$floatingGrou, _options$floatingGrou2;
					group.overlay.minimumInViewportHeight = (_options$floatingGrou = options.floatingGroupBounds) === null || _options$floatingGrou === void 0 ? void 0 : _options$floatingGrou.minimumHeightWithinViewport;
					group.overlay.minimumInViewportWidth = (_options$floatingGrou2 = options.floatingGroupBounds) === null || _options$floatingGrou2 === void 0 ? void 0 : _options$floatingGrou2.minimumWidthWithinViewport;
			}
			group.overlay.setBounds();
		}
	}
	disposeAll() {
		for (const floating of [...this._floatingGroups]) floating.dispose();
	}
	dispose() {
		this.disposeAll();
	}
};
const FloatingGroupModule = defineModule({
	name: "FloatingGroup",
	serviceKey: "floatingGroupService",
	create: (host) => new FloatingGroupService(host)
});

//#endregion
//#region src/dockview/popoutWindowService.ts
var PopoutWindowService = class {
	constructor(host) {
		this._entries = [];
		this._restorationCleanups = /* @__PURE__ */ new Set();
		this._restorationPromise = Promise.resolve();
		this._onDidRemove = new Emitter();
		this.onDidRemove = this._onDidRemove.event;
		this._host = host;
	}
	get entries() {
		return this._entries;
	}
	get restorationPromise() {
		return this._restorationPromise;
	}
	add(entry) {
		this._entries.push(entry);
	}
	remove(entry) {
		if (remove(this._entries, entry) && !this._host.isDisposed) this._onDidRemove.fire(entry);
	}
	findByGroup(group) {
		return this._entries.find((entry) => entry.popoutGroup === group || entry.gridview.element.contains(group.element));
	}
	findReferenceGroupId(group) {
		var _this$_entries$find;
		return (_this$_entries$find = this._entries.find((entry) => entry.popoutGroup === group)) === null || _this$_entries$find === void 0 ? void 0 : _this$_entries$find.referenceGroup;
	}
	/**
	* The popout window's innerWidth/innerHeight are often 0/stale until it has
	* painted, and the nested gridview lays its children out to the size passed
	* to layout() (a plain group fills via CSS instead). To stop content
	* rendering into a zero box until a manual resize, and to avoid the race a
	* fixed number of animation frames had, observe the gridview element with
	* a ResizeObserver created in the popout window's own realm. A parent-realm
	* observer fires unreliably across the window boundary; a same-realm one
	* fires reliably, including the initial observation once the window is
	* sized.
	*
	* @returns a disposable that disconnects the observer, or `undefined` when
	* the popout realm has no ResizeObserver (e.g. jsdom).
	*/
	observeGridviewSize(popoutWindow, gridview, overlayRenderContainer) {
		var _popoutWindow$window;
		const PopoutResizeObserver = (_popoutWindow$window = popoutWindow.window) === null || _popoutWindow$window === void 0 ? void 0 : _popoutWindow$window.ResizeObserver;
		if (!PopoutResizeObserver) return;
		let lastWidth = -1;
		let lastHeight = -1;
		const relayout = () => {
			const win = popoutWindow.window;
			if (this._host.isDisposed || !win || win.closed) return;
			const width = Math.round(gridview.element.clientWidth);
			const height = Math.round(gridview.element.clientHeight);
			if (width === lastWidth && height === lastHeight) return;
			lastWidth = width;
			lastHeight = height;
			if (width > 0 && height > 0) gridview.layout(width, height);
			overlayRenderContainer.updateAllPositions();
		};
		const observer = new PopoutResizeObserver(() => {
			var _popoutWindow$window2;
			const raf = (_popoutWindow$window2 = popoutWindow.window) === null || _popoutWindow$window2 === void 0 ? void 0 : _popoutWindow$window2.requestAnimationFrame;
			if (raf) raf.call(popoutWindow.window, relayout);
			else relayout();
		});
		observer.observe(gridview.element);
		return { dispose: () => observer.disconnect() };
	}
	/**
	* Runs `work` after `delayMs`, resolving once it has finished. Work that
	* returns a promise is awaited, so a caller holding
	* `restorationPromise` waits for the popout window itself rather than
	* only for the timer that starts it.
	*/
	scheduleRestoration(delayMs, work, onCancel) {
		return new Promise((resolve) => {
			const cleanup = () => {
				this._restorationCleanups.delete(cleanup);
				clearTimeout(handle);
				onCancel === null || onCancel === void 0 || onCancel();
				resolve();
			};
			const handle = setTimeout(() => {
				this._restorationCleanups.delete(cleanup);
				if (this._host.isDisposed) {
					resolve();
					return;
				}
				Promise.resolve(work()).then(() => resolve(), () => resolve());
			}, delayMs);
			this._restorationCleanups.add(cleanup);
		});
	}
	finishRestoration(promises) {
		this._restorationPromise = Promise.all(promises).then(() => void 0);
	}
	cancelPendingRestorations() {
		for (const cleanup of [...this._restorationCleanups]) cleanup();
		this._restorationCleanups.clear();
	}
	serialize() {
		return this._entries.map((entry) => {
			const grid = entry.gridview.serialize();
			const root = grid.root;
			const url = entry.popoutGroup.api.location.type === "popout" ? entry.popoutGroup.api.location.popoutUrl : void 0;
			const base = {
				gridReferenceGroup: entry.referenceGroup,
				position: entry.window.dimensions(),
				url
			};
			if (root.type === "branch" && root.data.length === 1 && root.data[0].type === "leaf") return _objectSpread2(_objectSpread2({}, base), {}, { data: root.data[0].data });
			return _objectSpread2(_objectSpread2({}, base), {}, { grid });
		});
	}
	disposeAll() {
		for (const entry of [...this._entries]) entry.disposable.dispose();
	}
	dispose() {
		this.cancelPendingRestorations();
		this.disposeAll();
		this._onDidRemove.dispose();
	}
};
const PopoutWindowModule = defineModule({
	name: "PopoutWindow",
	serviceKey: "popoutWindowService",
	create: (host) => new PopoutWindowService(host)
});

//#endregion
//#region src/dockview/watermarkService.ts
var WatermarkService = class {
	constructor(host) {
		this._watermark = null;
		this._host = host;
	}
	update() {
		if (this._host.hasVisibleGridGroup()) {
			this._unmount();
			return;
		}
		if (this._watermark) return;
		this._watermark = this._host.createWatermarkComponent();
		this._watermark.init({ containerApi: this._host.api });
		const container = document.createElement("div");
		container.className = "dv-watermark-container";
		addTestId(container, "watermark-component");
		container.appendChild(this._watermark.element);
		this._host.mountElement.appendChild(container);
	}
	refresh() {
		this._unmount();
		this.update();
	}
	_unmount() {
		var _this$_watermark$disp, _this$_watermark;
		if (!this._watermark) return;
		this._watermark.element.parentElement.remove();
		(_this$_watermark$disp = (_this$_watermark = this._watermark).dispose) === null || _this$_watermark$disp === void 0 || _this$_watermark$disp.call(_this$_watermark);
		this._watermark = null;
	}
	dispose() {
		this._unmount();
	}
};
const WatermarkModule = defineModule({
	name: "Watermark",
	serviceKey: "watermarkService",
	create: (host) => new WatermarkService(host),
	init: (host, service) => {
		service.update();
		return new CompositeDisposable(Event.any(host.onDidAdd, host.onDidRemove)(() => {
			service.update();
		}), host.onDidViewVisibilityChangeMicroTaskQueue(() => {
			service.update();
		}));
	}
});

//#endregion
//#region src/dockview/edgeGroupService.ts
var EdgeGroupService = class {
	constructor() {
		this._edgeGroups = /* @__PURE__ */ new Map();
		this._edgeGroupDisposables = /* @__PURE__ */ new Map();
		this._autoHide = /* @__PURE__ */ new WeakMap();
		this._autoReveal = /* @__PURE__ */ new WeakMap();
	}
	add(position, group, autoCollapseDisposable) {
		this._edgeGroups.set(position, group);
		this._edgeGroupDisposables.set(position, autoCollapseDisposable);
	}
	remove(position) {
		var _this$_edgeGroupDispo;
		(_this$_edgeGroupDispo = this._edgeGroupDisposables.get(position)) === null || _this$_edgeGroupDispo === void 0 || _this$_edgeGroupDispo.dispose();
		this._edgeGroupDisposables.delete(position);
		this._edgeGroups.delete(position);
	}
	get(position) {
		return this._edgeGroups.get(position);
	}
	has(position) {
		return this._edgeGroups.has(position);
	}
	hasAny() {
		return this._edgeGroups.size > 0;
	}
	entries() {
		return this._edgeGroups.entries();
	}
	includes(group) {
		for (const edgeGroup of this._edgeGroups.values()) if (edgeGroup === group) return true;
		return false;
	}
	findPositionOf(group) {
		for (const [position, edgeGroup] of this._edgeGroups) if (edgeGroup === group) return position;
	}
	setAutoHide(group, value) {
		if (value === void 0) this._autoHide.delete(group);
		else this._autoHide.set(group, value);
	}
	isAutoHide(group) {
		return this._autoHide.get(group);
	}
	setAutoReveal(group, value) {
		this._autoReveal.set(group, value);
	}
	isAutoReveal(group) {
		var _this$_autoReveal$get;
		return (_this$_autoReveal$get = this._autoReveal.get(group)) !== null && _this$_autoReveal$get !== void 0 ? _this$_autoReveal$get : false;
	}
	disposeAll() {
		for (const disposable of this._edgeGroupDisposables.values()) disposable.dispose();
		this._edgeGroupDisposables.clear();
		this._edgeGroups.clear();
	}
	dispose() {
		this.disposeAll();
	}
};
const EdgeGroupModule = defineModule({
	name: "EdgeGroup",
	serviceKey: "edgeGroupService",
	create: () => new EdgeGroupService()
});

//#endregion
//#region src/dockview/rootDropTargetService.ts
const EDGES = [
	"left",
	"right",
	"top",
	"bottom"
];
const DEFAULT_ACTIVATION = 10;
const AUTO_EDGE_ACTIVATION = 32;
const DEFAULT_ROOT_OVERLAY_MODEL = {
	activationSize: {
		type: "pixels",
		value: DEFAULT_ACTIVATION
	},
	size: {
		type: "pixels",
		value: 20
	}
};
const AUTO_EDGE_ROOT_OVERLAY_MODEL = {
	activationSize: {
		type: "pixels",
		value: AUTO_EDGE_ACTIVATION
	},
	size: {
		type: "pixels",
		value: 20
	}
};
function hasCustomBand(options) {
	return typeof options.dndEdges === "object" && options.dndEdges !== null;
}
/**
* `hasEdgeDragReveal` gates the widened band, *not* the `dockToEdgeGroups`
* option alone: without the affordance nothing consumes the outer sub-band, so
* widening would only enlarge the plain grid-split trigger, a 3.2x bigger
* target for the same behaviour the default band already gives.
*/
function isBandWidened(options, hasEdgeDragReveal) {
	return !hasCustomBand(options) && hasEdgeDragReveal && isAnyEdgeGroupEnabled(options.dockToEdgeGroups);
}
function resolveRootOverlayModel(options, hasEdgeDragReveal) {
	if (hasCustomBand(options)) return options.dndEdges;
	return isBandWidened(options, hasEdgeDragReveal) ? AUTO_EDGE_ROOT_OVERLAY_MODEL : DEFAULT_ROOT_OVERLAY_MODEL;
}
/**
* Per-edge thresholds while the band is widened, else `undefined`. Disabled
* edges keep the default band.
*/
function resolveRootEdgeThresholds(options, hasEdgeDragReveal) {
	if (!isBandWidened(options, hasEdgeDragReveal)) return;
	const band = (edge) => isEdgeGroupEnabled(options.dockToEdgeGroups, edge) ? AUTO_EDGE_ACTIVATION : DEFAULT_ACTIVATION;
	return {
		left: band("left"),
		right: band("right"),
		top: band("top"),
		bottom: band("bottom")
	};
}
/** The default cursor-quadrant logic, with a threshold per edge. */
function createEdgeBandResolver(thresholds) {
	return { resolve: ({ x, y, width, height, zones }) => {
		const position = calculateQuadrantAsPixels(zones, x, y, width, height, thresholds);
		return position ? {
			position,
			edge: false
		} : null;
	} };
}
const GROUP_HEADER_SELECTOR = ".dv-tabs-and-actions-container";
/**
* Whether the pointer is over a group header. An HTML5 drag event targets the
* element under the pointer; a pointer-backend drag needs a hit-test.
*/
function isOverGroupHeader(event, root) {
	var _getHitTestRoot$eleme, _getHitTestRoot;
	const element = event.type.startsWith("drag") ? event.target : (_getHitTestRoot$eleme = (_getHitTestRoot = getHitTestRoot(root)).elementFromPoint) === null || _getHitTestRoot$eleme === void 0 ? void 0 : _getHitTestRoot$eleme.call(_getHitTestRoot, event.clientX, event.clientY);
	return element instanceof Element && element.closest(GROUP_HEADER_SELECTOR) !== null;
}
var RootDropTargetService = class {
	constructor(host) {
		this._widenedEdges = /* @__PURE__ */ new Set();
		this._host = host;
		const canDisplayOverlay = (event, position) => {
			if (this._widenedEdges.has(position) && isOverGroupHeader(event, host.element)) return false;
			const data = getPanelData();
			if (data) {
				if (data.viewId !== host.id) return false;
				if (position === "center") return host.isGridEmpty();
				return true;
			}
			if (position === "center" && !host.isGridEmpty()) return false;
			return host.dispatchUnhandledDragOver(event, position);
		};
		const overlayModel = resolveRootOverlayModel(host.options, false);
		const getPositionResolver = () => {
			var _host$options$dropPos;
			return (_host$options$dropPos = host.options.dropPositionResolver) !== null && _host$options$dropPos !== void 0 ? _host$options$dropPos : this._edgeBandResolver;
		};
		this._html5Target = html5Backend.createDropTarget(host.element, {
			className: "dv-drop-target-edge",
			canDisplayOverlay,
			acceptedTargetZones: [
				"top",
				"bottom",
				"left",
				"right",
				"center"
			],
			overlayModel,
			getOverrideTarget: () => host.rootDropTargetOverrideTarget(),
			getPositionResolver
		});
		this._pointerTarget = pointerBackend.createDropTarget(host.element, {
			className: "dv-drop-target-edge",
			canDisplayOverlay,
			acceptedTargetZones: [
				"top",
				"bottom",
				"left",
				"right",
				"center"
			],
			overlayModel,
			getOverrideTarget: () => host.rootDropTargetOverrideTarget(),
			getPositionResolver
		});
		this.onWillShowOverlay = Event.any(this._html5Target.onWillShowOverlay, this._pointerTarget.onWillShowOverlay);
		this.onDrop = Event.any(this._html5Target.onDrop, this._pointerTarget.onDrop);
		this.setOptions(host.options);
	}
	setOptions(options) {
		if ("dndEdges" in options) {
			const disabled = typeof options.dndEdges === "boolean" && options.dndEdges === false;
			this._html5Target.disabled = disabled;
			this._pointerTarget.disabled = disabled;
		}
		if ("dndEdges" in options || "dockToEdgeGroups" in options) {
			const merged = {
				dndEdges: "dndEdges" in options ? options.dndEdges : this._host.options.dndEdges,
				dockToEdgeGroups: "dockToEdgeGroups" in options ? options.dockToEdgeGroups : this._host.options.dockToEdgeGroups
			};
			const model = resolveRootOverlayModel(merged, this._host.hasEdgeDragReveal);
			this._html5Target.setOverlayModel(model);
			this._pointerTarget.setOverlayModel(model);
			const thresholds = resolveRootEdgeThresholds(merged, this._host.hasEdgeDragReveal);
			this._edgeBandResolver = thresholds ? createEdgeBandResolver(thresholds) : void 0;
			this._widenedEdges = new Set(EDGES.filter((edge) => (thresholds === null || thresholds === void 0 ? void 0 : thresholds[edge]) === AUTO_EDGE_ACTIVATION));
		}
	}
	dispose() {
		this._html5Target.dispose();
		this._pointerTarget.dispose();
	}
};
const RootDropTargetModule = defineModule({
	name: "RootDropTarget",
	serviceKey: "rootDropTargetService",
	create: (host) => new RootDropTargetService(host),
	init: (host, service) => {
		service.setOptions(host.options);
		return Disposable.NONE;
	}
});

//#endregion
//#region src/dockview/headerActionsService.ts
const SLOT_OPTION_KEY = {
	left: "createLeftHeaderActionComponent",
	right: "createRightHeaderActionComponent",
	prefix: "createPrefixHeaderActionComponent"
};
var HeaderActionsService = class {
	constructor(host) {
		this._perGroup = /* @__PURE__ */ new Map();
		this._host = host;
	}
	refresh(group) {
		if (!(group === null || group === void 0 ? void 0 : group.model)) return;
		const state = this._ensureState(group);
		this._refreshSlot("left", group, state.left);
		this._refreshSlot("right", group, state.right);
		this._refreshSlot("prefix", group, state.prefix);
	}
	refreshAll() {
		for (const group of this._host.groups) this.refresh(group);
	}
	disposeGroup(group) {
		const state = this._perGroup.get(group);
		if (!state) return;
		state.left.dispose();
		state.right.dispose();
		state.prefix.dispose();
		this._perGroup.delete(group);
	}
	dispose() {
		for (const group of [...this._perGroup.keys()]) this.disposeGroup(group);
	}
	_ensureState(group) {
		let state = this._perGroup.get(group);
		if (!state) {
			state = {
				left: new MutableDisposable(),
				right: new MutableDisposable(),
				prefix: new MutableDisposable()
			};
			this._perGroup.set(group, state);
		}
		return state;
	}
	_refreshSlot(slot, group, disposable) {
		const factory = this._host.options[SLOT_OPTION_KEY[slot]];
		if (factory) {
			const renderer = factory(group);
			disposable.value = renderer;
			renderer.init({
				containerApi: this._host.api,
				api: group.api,
				group
			});
			group.model.attachHeaderAction(slot, renderer.element);
		} else {
			disposable.dispose();
			group.model.attachHeaderAction(slot, void 0);
		}
	}
};
const HeaderActionsModule = defineModule({
	name: "HeaderActions",
	serviceKey: "headerActionsService",
	create: (host) => new HeaderActionsService(host),
	init: (host, service) => {
		return new CompositeDisposable(host.onDidRemoveGroup((group) => {
			service.disposeGroup(group);
		}));
	}
});

//#endregion
//#region src/dockview/liveRegionService.ts
/** Bulk transactions whose per-panel events should not each be announced. */
const isBulk = (kind) => kind === "load" || kind === "clear";
function createLiveRegion(doc, politeness) {
	const el = doc.createElement("div");
	el.className = politeness === "assertive" ? "dv-live-region-assertive" : "dv-live-region";
	el.setAttribute("role", politeness === "assertive" ? "alert" : "status");
	el.setAttribute("aria-live", politeness);
	el.setAttribute("aria-atomic", "true");
	Object.assign(el.style, {
		position: "absolute",
		width: "1px",
		height: "1px",
		margin: "-1px",
		padding: "0",
		overflow: "hidden",
		clip: "rect(0 0 0 0)",
		clipPath: "inset(50%)",
		whiteSpace: "nowrap",
		border: "0"
	});
	return el;
}
/**
* Narrates layout state changes to screen readers via visually-hidden
* `aria-live` regions. Free / core (WCAG 4.1.3). Announces panel open/close +
* the shared `announce()` sink (the accessibility module narrates docking here too).
* Two regions: a **polite** one for routine status and an **assertive** one
* for errors/cancellations. The bulk load/clear burst is suppressed via the
* mutation-transaction events, and an app can take over delivery entirely with
* the `announcer` option.
*/
var LiveRegionService = class extends CompositeDisposable {
	constructor(host) {
		var _mainDoc$defaultView;
		super();
		this._regions = /* @__PURE__ */ new Map();
		this._suppressDepth = 0;
		this._locationSubs = /* @__PURE__ */ new Map();
		this._host = host;
		const mainDoc = host.element.ownerDocument;
		this._mainWindow = (_mainDoc$defaultView = mainDoc.defaultView) !== null && _mainDoc$defaultView !== void 0 ? _mainDoc$defaultView : window;
		const mainPair = {
			polite: createLiveRegion(mainDoc, "polite"),
			assertive: createLiveRegion(mainDoc, "assertive")
		};
		host.element.appendChild(mainPair.polite);
		host.element.appendChild(mainPair.assertive);
		this._regions.set(this._mainWindow, mainPair);
		this._syncPopoutRegions();
		this.addDisposables({ dispose: () => this._disposeRegions() }, host.onDidChangePopouts(() => this._syncPopoutRegions()), host.onDidAddPanel((panel) => this._announce(panel, "open")), host.onDidRemovePanel((panel) => this._announce(panel, "close")), host.onWillMutateLayout((e) => {
			if (isBulk(e.kind)) this._suppressDepth++;
		}), host.onDidMutateLayout((e) => {
			if (isBulk(e.kind)) this._suppressDepth = Math.max(0, this._suppressDepth - 1);
		}), host.onDidMaximizedGroupChange((e) => {
			const panel = e.group.activePanel;
			if (panel) this._announce(panel, e.isMaximized ? "maximize" : "restore");
		}), host.onDidAddGroup((group) => this._trackLocation(group)), host.onDidRemoveGroup((group) => {
			var _this$_locationSubs$g;
			(_this$_locationSubs$g = this._locationSubs.get(group.id)) === null || _this$_locationSubs$g === void 0 || _this$_locationSubs$g.dispose();
			this._locationSubs.delete(group.id);
		}), { dispose: () => {
			this._locationSubs.forEach((sub) => sub.dispose());
			this._locationSubs.clear();
		} });
	}
	/** Create a live region in every popout document that lacks one, and remove
	*  regions for popouts that have closed. The main window's pair is permanent. */
	_syncPopoutRegions() {
		const mainDoc = this._host.element.ownerDocument;
		const desired = /* @__PURE__ */ new Set([this._mainWindow]);
		for (const win of this._host.getPopoutWindows()) {
			var _doc$body;
			if (win.document === mainDoc) continue;
			desired.add(win);
			if (this._regions.has(win)) continue;
			const doc = win.document;
			const mount = (_doc$body = doc.body) !== null && _doc$body !== void 0 ? _doc$body : doc.documentElement;
			const pair = {
				polite: createLiveRegion(doc, "polite"),
				assertive: createLiveRegion(doc, "assertive")
			};
			mount.appendChild(pair.polite);
			mount.appendChild(pair.assertive);
			this._regions.set(win, pair);
		}
		for (const [win, pair] of this._regions) if (!desired.has(win)) {
			pair.polite.remove();
			pair.assertive.remove();
			this._regions.delete(win);
		}
	}
	_disposeRegions() {
		for (const pair of this._regions.values()) {
			pair.polite.remove();
			pair.assertive.remove();
		}
		this._regions.clear();
	}
	/** Route announcements to the live region of the window that currently has
	*  focus, so a screen-reader user in a popout hears them, falling back to
	*  the main window. */
	_focusedRegions() {
		for (const [win, pair] of this._regions) {
			if (win === this._mainWindow) continue;
			try {
				if (win.document.hasFocus()) return pair;
			} catch (_unused) {}
		}
		return this._regions.get(this._mainWindow);
	}
	_trackLocation(group) {
		let prev = group.api.location.type;
		const sub = group.api.onDidLocationChange((e) => {
			const next = e.location.type;
			if (next === prev) return;
			prev = next;
			const panel = group.activePanel;
			if (!panel) return;
			let kind;
			switch (next) {
				case "floating":
					kind = "float";
					break;
				case "popout":
					kind = "popout";
					break;
				default:
					kind = "dock";
					break;
			}
			this._announce(panel, kind);
		});
		this._locationSubs.set(group.id, sub);
	}
	announce(message, politeness = "polite") {
		if (this._host.options.announcements === false || this._suppressDepth > 0 || !message) return;
		const announcer = this._host.options.announcer;
		if (announcer) {
			announcer({
				message,
				politeness
			});
			return;
		}
		const pair = this._focusedRegions();
		const region = politeness === "assertive" ? pair.assertive : pair.polite;
		region.textContent = "";
		region.textContent = message;
	}
	_announce(panel, kind) {
		var _this$_host$options$g, _this$_host$options;
		const custom = (_this$_host$options$g = (_this$_host$options = this._host.options).getAnnouncement) === null || _this$_host$options$g === void 0 ? void 0 : _this$_host$options$g.call(_this$_host$options, {
			kind,
			panel
		});
		if (custom === null || custom === "") return;
		this.announce(custom !== null && custom !== void 0 ? custom : this._defaultMessage(panel, kind));
	}
	_defaultMessage(panel, kind) {
		var _panel$title;
		const m = resolveMessages(this._host.options.messages);
		const name = (_panel$title = panel.title) !== null && _panel$title !== void 0 ? _panel$title : panel.id;
		switch (kind) {
			case "open": return m.panelOpened(name);
			case "close": return m.panelClosed(name);
			case "maximize": return m.groupMaximized(name);
			case "restore": return m.groupRestored(name);
			case "float": return m.groupFloated(name);
			case "dock": return m.groupDocked(name);
			case "popout": return m.groupPoppedOut(name);
		}
	}
};
const LiveRegionModule = defineModule({
	name: "LiveRegion",
	serviceKey: "liveRegionService",
	create: (host) => new LiveRegionService(host)
});

//#endregion
//#region src/dockview/advancedDnDService.ts
/** Cursor offset of the group drag ghost. */
const GROUP_DRAG_GHOST_OFFSET_X = 30;
const GROUP_DRAG_GHOST_OFFSET_Y = -10;
/**
* Owns the dispatch of the advanced drag-and-drop hooks: `onWillDragPanel`,
* `onWillDragGroup`, `onWillDrop` and `onWillShowOverlay`, forwarding each to
* the host's emitters so the public event shape is unchanged whether or not
* this module is registered.
*
* The service holds no drag state of its own. The gesture is driven by the
* DnD backends, and the per-group subscriptions live on the component's group
* lifecycle (so groups created mid-move are not missed).
*/
var AdvancedDnDService = class {
	constructor(host) {
		this.host = host;
	}
	dispatchWillDragPanel(event) {
		this.host.fireWillDragPanel(event);
	}
	dispatchWillDragGroup(event) {
		this.host.fireWillDragGroup(event);
	}
	dispatchWillDrop(event) {
		this.host.fireWillDrop(event);
	}
	dispatchWillShowOverlay(event) {
		this.host.fireWillShowOverlay(event);
	}
	buildGroupDragGhost(group) {
		const createGhost = this.host.options.createGroupDragGhostComponent;
		if (!createGhost) return;
		const renderer = createGhost(group);
		renderer.init({
			group,
			api: this.host.api
		});
		return {
			element: renderer.element,
			offsetX: GROUP_DRAG_GHOST_OFFSET_X,
			offsetY: GROUP_DRAG_GHOST_OFFSET_Y,
			dispose: renderer.dispose ? () => {
				var _renderer$dispose;
				return (_renderer$dispose = renderer.dispose) === null || _renderer$dispose === void 0 ? void 0 : _renderer$dispose.call(renderer);
			} : void 0
		};
	}
	resolveOverlayModel(location, group) {
		var _this$host$options$dr, _this$host$options;
		return (_this$host$options$dr = (_this$host$options = this.host.options).dropOverlayModel) === null || _this$host$options$dr === void 0 ? void 0 : _this$host$options$dr.call(_this$host$options, {
			location,
			group
		});
	}
	showPreviewOverlay(group, position) {
		const target = group.model.contentDropTarget;
		target.showOverlay(position);
		return Disposable.from(() => target.clearOverlay());
	}
	dispose() {}
};
const AdvancedDnDModule = defineModule({
	name: "AdvancedDnD",
	serviceKey: "advancedDnDService",
	create: (host) => new AdvancedDnDService(host)
});

//#endregion
//#region src/dockview/tabGroupChipsService.ts
var TabGroupChipsService = class {
	constructor(host) {
		this._host = host;
	}
	attachToGroup(group) {
		return new CompositeDisposable(group.model.onDidCreateTabGroup((e) => {
			this._host.fireDidCreateTabGroup(e);
		}), group.model.onDidDestroyTabGroup((e) => {
			this._host.fireDidDestroyTabGroup(e);
		}), group.model.onDidAddPanelToTabGroup((e) => {
			this._host.fireDidAddPanelToTabGroup(e);
		}), group.model.onDidRemovePanelFromTabGroup((e) => {
			this._host.fireDidRemovePanelFromTabGroup(e);
		}), group.model.onDidTabGroupChange((e) => {
			this._host.fireDidTabGroupChange(e);
		}), group.model.onDidTabGroupCollapsedChange((e) => {
			this._host.fireDidTabGroupCollapsedChange(e);
		}));
	}
	dispose() {}
};
const TabGroupChipsModule = defineModule({
	name: "TabGroupChips",
	serviceKey: "tabGroupChipsService",
	create: (host) => new TabGroupChipsService(host),
	init: (host, service) => {
		const perGroupDisposables = /* @__PURE__ */ new Map();
		return new CompositeDisposable(host.onDidAddGroup((group) => {
			perGroupDisposables.set(group, service.attachToGroup(group));
		}), host.onDidRemoveGroup((group) => {
			var _perGroupDisposables$;
			(_perGroupDisposables$ = perGroupDisposables.get(group)) === null || _perGroupDisposables$ === void 0 || _perGroupDisposables$.dispose();
			perGroupDisposables.delete(group);
		}), { dispose: () => {
			for (const d of perGroupDisposables.values()) d.dispose();
			perGroupDisposables.clear();
		} });
	}
});

//#endregion
//#region src/dockview/contextMenuService.ts
function popoverZIndexFor(target, group) {
	var _group$api, _group$api$isPeeking;
	if ((_group$api = group.api) === null || _group$api === void 0 || (_group$api$isPeeking = _group$api.isPeeking) === null || _group$api$isPeeking === void 0 ? void 0 : _group$api$isPeeking.call(_group$api)) return "calc(var(--dv-overlay-z-index, 999) + 100)";
	if (!(target instanceof HTMLElement)) return;
	const relativeParent = findRelativeZIndexParent(target);
	return (relativeParent === null || relativeParent === void 0 ? void 0 : relativeParent.style.zIndex) ? `calc(${relativeParent.style.zIndex} * 2)` : void 0;
}
let _nextId = 0;
const nextContextMenuItemId = () => `dv-ctx-menu-item-${_nextId++}`;
function isItemConfig(item) {
	return typeof item === "object";
}
function buildItem(label, close, action, disabled) {
	const el = document.createElement("div");
	el.className = "dv-context-menu-item";
	el.setAttribute("role", "menuitem");
	if (disabled) {
		el.classList.add("dv-context-menu-item--disabled");
		el.setAttribute("aria-disabled", "true");
	}
	el.textContent = label;
	if (!disabled) el.addEventListener("click", () => {
		action();
		close();
	});
	return el;
}
function buildSeparator() {
	const el = document.createElement("div");
	el.className = "dv-context-menu-separator";
	el.setAttribute("role", "separator");
	return el;
}
function isCoarsePrimaryInput$1() {
	if (globalThis.window === void 0 || !globalThis.matchMedia) return false;
	const coarse = globalThis.matchMedia("(pointer: coarse)").matches;
	const fine = globalThis.matchMedia("(pointer: fine)").matches;
	return coarse && !fine;
}
function buildRenameInput(tabGroup) {
	const wrapper = document.createElement("div");
	wrapper.className = "dv-context-menu-rename";
	const input = document.createElement("input");
	input.className = "dv-context-menu-rename-input";
	input.type = "text";
	input.placeholder = "Name This Group";
	input.value = tabGroup.label;
	input.addEventListener("input", () => {
		tabGroup.setLabel(input.value);
	});
	input.addEventListener("keydown", (e) => {
		if (e.key !== "Escape" && e.key !== "Enter") e.stopPropagation();
	});
	input.addEventListener("click", (e) => {
		e.stopPropagation();
	});
	wrapper.appendChild(input);
	if (!isCoarsePrimaryInput$1()) requestAnimationFrame(() => {
		input.focus();
		input.select();
	});
	return wrapper;
}
function buildColorPicker(tabGroup, palette) {
	const wrapper = document.createElement("div");
	wrapper.className = "dv-context-menu-color-picker";
	if (!palette.enabled) return wrapper;
	for (const entry of palette.entries()) {
		const swatch = document.createElement("div");
		swatch.className = "dv-context-menu-color-swatch";
		swatch.style.setProperty("--dv-tab-group-color", entry.value);
		if (entry.label) swatch.title = entry.label;
		if (tabGroup.color === entry.id) swatch.classList.add("dv-context-menu-color-swatch--selected");
		swatch.addEventListener("click", () => {
			tabGroup.setColor(entry.id);
		});
		wrapper.appendChild(swatch);
	}
	return wrapper;
}
var ContextMenuController = class {
	constructor(accessor) {
		this.accessor = accessor;
	}
	/**
	* A single maximize/restore toggle whose label and behaviour track the
	* group's live state: it reads *Restore* + calls `exitMaximized` when the
	* group is maximized, otherwise *Maximize* + `maximize`. Only grid groups
	* can be maximized, so the item is disabled for floating / popout panels
	* that are not already maximized.
	*/
	buildMaximizeItem(panel, close) {
		const isMaximized = panel.api.isMaximized();
		return buildItem(isMaximized ? "Restore" : "Maximize", close, isMaximized ? () => panel.api.exitMaximized() : () => panel.api.maximize(), !isMaximized && panel.api.location.type !== "grid");
	}
	/**
	* A single collapse/expand toggle whose label tracks the tab group's live
	* state: *Expand* when the group is already collapsed, otherwise *Collapse*.
	*/
	buildCollapseItem(tabGroup, close) {
		return buildItem(tabGroup.collapsed ? "Expand" : "Collapse", close, () => tabGroup.toggle());
	}
	/**
	* Whether to auto-inject the built-in Pin/Unpin item at the top of the tab
	* menu. True only when the PinnedTabs module is registered, pinning is
	* enabled, and the app has not opted out via `pinnedTabs.contextMenuItem:
	* false` (the item is on by default). This keeps pinning reachable from the
	* menu without the app having to return `'pin'` from
	* `getTabContextMenuItems` itself.
	*/
	_shouldInjectPin() {
		const pinnedTabs = this.accessor.options.pinnedTabs;
		return !!this.accessor.pinnedTabsService && !!(pinnedTabs === null || pinnedTabs === void 0 ? void 0 : pinnedTabs.enabled) && pinnedTabs.contextMenuItem !== false;
	}
	/**
	* The tab menu items: the app's own items (if any) with the built-in
	* `'pin'` item prepended when {@link _shouldInjectPin} applies, so the app
	* keeps full control of its list, and pinning is added without disturbing
	* it. Reuses the existing `'pin'` token rendering below.
	*/
	_resolveTabItems(panel, group, event) {
		var _this$accessor$option, _this$accessor$option2, _this$accessor$option3;
		const appItems = (_this$accessor$option = (_this$accessor$option2 = (_this$accessor$option3 = this.accessor.options).getTabContextMenuItems) === null || _this$accessor$option2 === void 0 ? void 0 : _this$accessor$option2.call(_this$accessor$option3, {
			panel,
			group,
			api: this.accessor.api,
			event
		})) !== null && _this$accessor$option !== void 0 ? _this$accessor$option : [];
		return this._shouldInjectPin() ? ["pin", ...appItems] : appItems;
	}
	/**
	* Render a custom `component` menu item and append it to `menuEl`. Builds
	* the framework renderer via the host's `createContextMenuItemComponent`
	* factory and initialises it. Shared by the tab menu and the chip menu,
	* which differ only in `identity`: the tab menu passes the `panel`, the chip
	* menu passes the `tabGroup`. No-op when no renderer could be created (no
	* factory configured, or the factory declined the component).
	*/
	appendComponentItem(menuEl, item, identity, group, close, renderers) {
		var _this$accessor$option4, _this$accessor$option5;
		const renderer = (_this$accessor$option4 = (_this$accessor$option5 = this.accessor.options).createContextMenuItemComponent) === null || _this$accessor$option4 === void 0 ? void 0 : _this$accessor$option4.call(_this$accessor$option5, {
			id: nextContextMenuItemId(),
			component: item.component
		});
		if (!renderer) return;
		renderers.addDisposables(renderer);
		renderer.init(_objectSpread2(_objectSpread2({}, identity), {}, {
			group,
			api: this.accessor.api,
			close,
			componentProps: item.componentProps
		}));
		menuEl.appendChild(renderer.element);
	}
	/**
	* The element for one built-in tab item, or `undefined` for a token this
	* version doesn't know (an app on a newer typings version, or plain JS):
	* an unrecognised token renders nothing rather than throwing.
	*/
	buildBuiltInTabItem(item, panel, group, close) {
		switch (item) {
			case "separator": return buildSeparator();
			case "close": return buildItem("Close", close, () => panel.api.close());
			case "closeOthers": return buildItem("Close Others", close, () => {
				group.panels.filter((p) => p !== panel).forEach((p) => p.api.close());
			});
			case "closeAll": return buildItem("Close All", close, () => {
				[...group.panels].forEach((p) => p.api.close());
			});
			case "closeLeft": {
				const index = group.panels.indexOf(panel);
				return buildItem("Close to the Left", close, () => {
					group.panels.filter((_, i) => i < index).forEach((p) => p.api.close());
				}, index <= 0);
			}
			case "closeRight": {
				const index = group.panels.indexOf(panel);
				return buildItem("Close to the Right", close, () => {
					group.panels.filter((_, i) => i > index).forEach((p) => p.api.close());
				}, index === -1 || index >= group.panels.length - 1);
			}
			case "maximize": return this.buildMaximizeItem(panel, close);
			case "float": return buildItem("Float", close, () => this.accessor.api.addFloatingGroup(panel), panel.api.location.type === "floating");
			case "popout": return buildItem("Open in New Window", close, () => {
				this.accessor.api.addPopoutGroup(panel);
			}, panel.api.location.type === "popout");
			case "pin": return buildItem(panel.api.isPinned ? "Unpin tab" : "Pin tab", close, () => panel.api.setPinned(!panel.api.isPinned));
			default: return;
		}
	}
	/**
	* Append one app-supplied item. A raw `element` is used as-is, a
	* `component` goes through the framework renderer, and a `label` builds the
	* default row; an item carrying none of the three renders nothing. Shared
	* by both menus, which differ only in `identity`.
	*/
	appendConfigItem(menuEl, item, identity, group, close, renderers) {
		if (item.element) menuEl.appendChild(item.element);
		else if (item.component) this.appendComponentItem(menuEl, item, identity, group, close, renderers);
		else if (item.label) menuEl.appendChild(buildItem(item.label, close, () => {
			var _item$action;
			return (_item$action = item.action) === null || _item$action === void 0 ? void 0 : _item$action.call(item);
		}, item.disabled));
	}
	show(panel, group, event) {
		const items = this._resolveTabItems(panel, group, event);
		if (items.length === 0) return;
		event.preventDefault();
		const popupService = this.accessor.getPopupServiceForGroup(group);
		const close = () => popupService.close();
		const renderers = new CompositeDisposable();
		const menuEl = document.createElement("div");
		menuEl.className = "dv-context-menu";
		menuEl.setAttribute("role", "menu");
		try {
			for (const item of items) {
				if (isItemConfig(item)) {
					this.appendConfigItem(menuEl, item, { panel }, group, close, renderers);
					continue;
				}
				const el = this.buildBuiltInTabItem(item, panel, group, close);
				if (el) menuEl.appendChild(el);
			}
		} catch (err) {
			renderers.dispose();
			throw err;
		}
		popupService.openPopover(menuEl, {
			x: event.clientX,
			y: event.clientY,
			zIndex: popoverZIndexFor(event.target, group)
		}, { onClose: () => renderers.dispose() });
	}
	showForChip(tabGroup, group, event) {
		if (!this.accessor.options.getTabGroupChipContextMenuItems) return;
		const items = this.accessor.options.getTabGroupChipContextMenuItems({
			tabGroup,
			group,
			api: this.accessor.api,
			event
		});
		if (items.length === 0) return;
		event.preventDefault();
		const popupService = this.accessor.getPopupServiceForGroup(group);
		const close = () => popupService.close();
		const renderers = new CompositeDisposable();
		const menuEl = document.createElement("div");
		menuEl.className = "dv-context-menu";
		menuEl.setAttribute("role", "menu");
		try {
			for (const item of items) if (item === "separator") menuEl.appendChild(buildSeparator());
			else if (item === "rename") menuEl.appendChild(buildRenameInput(tabGroup));
			else if (item === "colorPicker") menuEl.appendChild(buildColorPicker(tabGroup, this.accessor.tabGroupColorPalette));
			else if (item === "collapse") menuEl.appendChild(this.buildCollapseItem(tabGroup, close));
			else if (item === "close") menuEl.appendChild(buildItem("Close All", close, () => {
				group.panels.filter((p) => tabGroup.containsPanel(p.id)).forEach((p) => p.api.close());
			}));
			else if (isItemConfig(item)) this.appendConfigItem(menuEl, item, { tabGroup }, group, close, renderers);
		} catch (err) {
			renderers.dispose();
			throw err;
		}
		popupService.openPopover(menuEl, {
			x: event.clientX,
			y: event.clientY,
			zIndex: popoverZIndexFor(event.target, group)
		}, { onClose: () => renderers.dispose() });
	}
};
const ContextMenuModule = defineModule({
	name: "ContextMenu",
	serviceKey: "contextMenuService",
	create: (host) => new ContextMenuController(host)
});

//#endregion
//#region src/dockview/allModules.ts
/**
* Internal list of the built-in modules that ship with the core. Registered
* automatically by DockviewComponent at construction time; not exported from
* the package. Additional modules contributed by sibling packages (via
* `registerModules(...)`) are appended at construction.
*/
const AllModules = [
	FloatingGroupModule,
	PopoutWindowModule,
	WatermarkModule,
	EdgeGroupModule,
	RootDropTargetModule,
	HeaderActionsModule,
	LiveRegionModule,
	AdvancedDnDModule,
	TabGroupChipsModule,
	ContextMenuModule
];

//#endregion
//#region src/overlay/overlayRenderContainer.ts
var PositionCache = class {
	constructor() {
		this.cache = /* @__PURE__ */ new WeakMap();
		this.currentFrameId = 0;
		this.rafId = null;
	}
	getPosition(element) {
		const cached = this.cache.get(element);
		if ((cached === null || cached === void 0 ? void 0 : cached.frameId) === this.currentFrameId) return cached.rect;
		this.scheduleFrameUpdate();
		const rect = getDomNodePagePosition(element);
		this.cache.set(element, {
			rect,
			frameId: this.currentFrameId
		});
		return rect;
	}
	invalidate() {
		this.currentFrameId++;
	}
	scheduleFrameUpdate() {
		if (this.rafId) return;
		this.rafId = requestAnimationFrame(() => {
			this.currentFrameId++;
			this.rafId = null;
		});
	}
};
/**
* Placeholder handle marking "a reposition frame has been requested but the
* real handle is not known yet". Never passed to `cancelAnimationFrame` in
* practice — it is replaced within the same synchronous block — and harmless
* if it were, since no frame carries this id.
*/
const SCHEDULED = -1;
/**
* A collapsed edge group's content container is `display: none` (0x0) while
* collapsed. Edge collapse fires no visibility event, so this is read from the
* group rather than `panel.api.isVisible`.
*/
function isInCollapsedEdgeGroup(panel) {
	const api = panel.group.api;
	return api.location.type === "edge" && api.isCollapsed();
}
function createFocusableElement() {
	const element = document.createElement("div");
	element.tabIndex = -1;
	return element;
}
/**
* Write an inline pixel length only when it differs from what is already set,
* so a pass that re-derives geometry already in place leaves the element's
* style clean and the next measurement does not relayout the overlay subtree.
*/
function setPixels(style, property, value) {
	const next = `${value}px`;
	if (style[property] !== next) style[property] = next;
}
const owners = /* @__PURE__ */ new WeakMap();
var OverlayRenderContainer = class extends CompositeDisposable {
	constructor(element, accessor) {
		super();
		this.element = element;
		this.accessor = accessor;
		this.map = {};
		this._disposed = false;
		this._generation = 0;
		this.positionCache = new PositionCache();
		this.addDisposables(Disposable.from(() => {
			for (const value of Object.values(this.map)) {
				if (owners.get(value.panel) === this) owners.delete(value.panel);
				value.disposable.dispose();
				value.destroy.dispose();
				this.cancelPendingUpdate(value);
			}
			this._disposed = true;
		}));
	}
	updateAllPositions() {
		if (this._disposed) return;
		this.positionCache.invalidate();
		for (const entry of Object.values(this.map)) if (entry.panel.api.isVisible && entry.resize) entry.resize();
	}
	/**
	* Reposition a single panel's overlay over its reference container,
	* optionally forcing it visible even when the panel is not currently
	* "visible" (e.g. its group is collapsed). Used by the auto-hide peek to
	* slide an `always`-rendered panel out without reparenting it or mutating
	* the panel's visibility state. No-op if the panel isn't overlay-rendered.
	*/
	repositionPanelOverlay(panelId, forceVisible = false, clip) {
		var _entry$resize;
		if (this._disposed) return;
		const entry = this.map[panelId];
		if (!entry) return;
		entry.forceVisible = forceVisible;
		entry.clip = clip;
		this.positionCache.invalidate();
		(_entry$resize = entry.resize) === null || _entry$resize === void 0 || _entry$resize.call(entry);
	}
	/**
	* Drop the reposition frame queued for a panel, if any. A queued frame is
	* bound to the reference container that was current when it was scheduled,
	* so it must be discarded whenever that container stops being the one the
	* overlay should track.
	*/
	cancelPendingUpdate(entry) {
		if (entry.pendingUpdate !== void 0) {
			cancelAnimationFrame(entry.pendingUpdate);
			entry.pendingUpdate = void 0;
		}
	}
	detatch(panel) {
		if (this.map[panel.api.id]) {
			const entry = this.map[panel.api.id];
			entry.disposable.dispose();
			entry.destroy.dispose();
			this.cancelPendingUpdate(entry);
			delete this.map[panel.api.id];
			if (owners.get(entry.panel) === this) owners.delete(entry.panel);
			return true;
		}
		return false;
	}
	attach(options) {
		var _panel$group$api$onDi, _panel$group$api$onDi2, _panel$group$api;
		const { panel, referenceContainer } = options;
		const previousOwner = owners.get(panel);
		if (previousOwner && previousOwner !== this) previousOwner.detatch(panel);
		if (this._disposed) owners.delete(panel);
		else owners.set(panel, this);
		if (!this.map[panel.api.id]) {
			const element = createFocusableElement();
			element.className = "dv-render-overlay";
			element.style.visibility = "hidden";
			this.map[panel.api.id] = {
				panel,
				disposable: Disposable.NONE,
				destroy: Disposable.NONE,
				element,
				retainPreviousGeometry: false,
				positioned: false,
				generation: ++this._generation
			};
		}
		const mapEntry = this.map[panel.api.id];
		/**
		* A *change* of reference container supersedes the previous `attach`:
		* take a fresh generation so its `resize` closure can no longer run,
		* and drop the frame it queued against the old container. During
		* `fromJSON({ reuseExistingPanels: true })` that old container is a
		* detached staging group measuring 0x0, so leaving its frame in flight
		* both wastes the update and delays the reposition against the real one.
		*
		* Re-attaching over the *same* container (re-open, active panel change)
		* deliberately leaves scheduled work alone: `repositionPanelOverlay`
		* (the auto-hide peek) schedules a frame carrying the sticky
		* `forceVisible`/`clip` state which `attach` does not re-apply, and a
		* peeked panel's group is collapsed — so discarding that frame leaves
		* the frame pass to hide the overlay and the peek renders nothing. A
		* newly created entry already holds a fresh generation, so the stale
		* closures a `detatch` left behind are fenced off either way.
		*/
		if (mapEntry.referenceContainer !== referenceContainer) {
			mapEntry.generation = ++this._generation;
			this.cancelPendingUpdate(mapEntry);
			mapEntry.referenceContainer = referenceContainer;
			/**
			* Arm the retain flag only here: it means "a replacement reference
			* container is awaiting layout", so the 0x0 early-return below
			* holds the last good box rather than blanking the panel mid-move.
			* Arming it on every re-attach instead would make a container that
			* genuinely collapses to zero keep its stale geometry forever.
			*
			* Gated on `positioned` because an overlay that has never been
			* positioned has no left/top/width/height, and `.dv-render-overlay`
			* defaults to 100%/100% — retaining "previous" geometry there would
			* pin the content over the whole container.
			*
			* A collapsed edge group's 0x0 is a real collapse, not a pending
			* layout, so nothing is retained and the overlay hides at once
			* rather than staying painted at its old box until the next frame.
			*/
			const collapsedEdge = isInCollapsedEdgeGroup(panel);
			mapEntry.retainPreviousGeometry = mapEntry.positioned && !collapsedEdge;
			if (collapsedEdge && !mapEntry.forceVisible) {
				mapEntry.element.style.visibility = "hidden";
				mapEntry.element.style.pointerEvents = "none";
			}
		}
		const generation = mapEntry.generation;
		const focusContainer = mapEntry.element;
		const contentElement = panel.view.content.element;
		/**
		* Size the overlay from the layout engine's numbers (the content box
		* the group model also hands to `panel.layout()`): a style write with
		* no forced layout, so the content has its real box before anything
		* can measure it, and `.dv-render-overlay`'s 100%/100% default is never
		* observed. Hidden panels are sized too: their content is laid out
		* (hidden by `visibility`) and must not keep the root's box.
		*
		* Only while the overlay is not on screen at a measured position,
		* i.e. hidden or not yet positioned. Once it is, the frame pass owns
		* the whole box: size and position must change together, and group
		* layouts driven from an animation frame would otherwise paint one
		* frame at the new size and the old position. Likewise not while the
		* peek force-shows the overlay, whose geometry belongs to
		* `repositionPanelOverlay`: the collapsed group's own layouts describe
		* the strip, not the peek. A zero box (a container awaiting layout) is
		* skipped too: whether 0x0 is a real collapse is the frame pass's call.
		*/
		const applySize = (size) => {
			if (!size || size.width <= 0 || size.height <= 0) return;
			const entry = this.map[panel.api.id];
			if (!entry || entry.forceVisible || entry.positioned && panel.api.isVisible) return;
			setPixels(focusContainer.style, "width", size.width);
			setPixels(focusContainer.style, "height", size.height);
		};
		applySize(referenceContainer.dimensions);
		if (contentElement.parentElement !== focusContainer) focusContainer.appendChild(contentElement);
		if (focusContainer.parentElement !== this.element) this.element.appendChild(focusContainer);
		const resize = () => {
			const panelId = panel.api.id;
			const scheduling = this.map[panelId];
			if ((scheduling === null || scheduling === void 0 ? void 0 : scheduling.generation) !== generation) return;
			if (scheduling.pendingUpdate !== void 0) return;
			/**
			* Claim the slot *before* scheduling. `requestAnimationFrame` is
			* shimmed to run inline by some hosts (and by several suites here),
			* in which case the callback below clears `pendingUpdate` while
			* this call is still on the stack — assigning the handle afterwards
			* would resurrect a slot that is already spent and block every
			* later reposition. The sentinel is replaced by the real handle
			* only if the frame has not already run.
			*/
			scheduling.pendingUpdate = SCHEDULED;
			const handle = requestAnimationFrame(() => {
				var _entry$forceVisible;
				const entry = this.map[panelId];
				if (entry) entry.pendingUpdate = void 0;
				if (this.isDisposed || (entry === null || entry === void 0 ? void 0 : entry.generation) !== generation) return;
				const forceVisible = (_entry$forceVisible = entry.forceVisible) !== null && _entry$forceVisible !== void 0 ? _entry$forceVisible : false;
				const clip = entry.clip;
				const collapsedEdge = isInCollapsedEdgeGroup(panel);
				const hidden = !forceVisible && (!panel.api.isVisible || collapsedEdge);
				const box = this.positionCache.getPosition(referenceContainer.element);
				const box2 = this.positionCache.getPosition(this.element);
				const left = box.left - box2.left;
				const top = box.top - box2.top;
				const width = box.width;
				const height = box.height;
				if (width === 0 || height === 0) {
					if (collapsedEdge && !forceVisible) {
						entry.retainPreviousGeometry = false;
						focusContainer.style.visibility = "hidden";
						focusContainer.style.pointerEvents = "none";
						focusContainer.style.clipPath = "";
						focusContainer.style.zIndex = "";
						return;
					}
					if (entry.retainPreviousGeometry) {
						if (hidden) {
							focusContainer.style.visibility = "hidden";
							focusContainer.style.pointerEvents = "none";
						}
						return;
					}
				}
				entry.retainPreviousGeometry = false;
				entry.positioned = true;
				setPixels(focusContainer.style, "left", left);
				setPixels(focusContainer.style, "top", top);
				setPixels(focusContainer.style, "width", width);
				setPixels(focusContainer.style, "height", height);
				if (!hidden) {
					focusContainer.style.visibility = "";
					focusContainer.style.pointerEvents = "";
				} else {
					focusContainer.style.visibility = "hidden";
					focusContainer.style.pointerEvents = "none";
				}
				if (forceVisible) focusContainer.style.zIndex = "1000";
				else if (panel.api.location.type !== "floating") focusContainer.style.zIndex = "";
				if (clip) {
					var _view$scrollX, _view$scrollY;
					const view = this.element.ownerDocument.defaultView;
					const sx = (_view$scrollX = view === null || view === void 0 ? void 0 : view.scrollX) !== null && _view$scrollX !== void 0 ? _view$scrollX : 0;
					const sy = (_view$scrollY = view === null || view === void 0 ? void 0 : view.scrollY) !== null && _view$scrollY !== void 0 ? _view$scrollY : 0;
					const top = clip.top + sy;
					const left = clip.left + sx;
					const insetTop = Math.max(0, top - box.top);
					const insetLeft = Math.max(0, left - box.left);
					const insetRight = Math.max(0, box.left + width - (clip.right + sx));
					const insetBottom = Math.max(0, box.top + height - (clip.bottom + sy));
					focusContainer.style.clipPath = `inset(${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px)`;
				} else focusContainer.style.clipPath = "";
				toggleClass(focusContainer, "dv-render-overlay-float", panel.group.api.location.type === "floating");
			});
			if (scheduling.pendingUpdate === SCHEDULED) scheduling.pendingUpdate = handle;
		};
		const visibilityChanged = () => {
			var _this$map$panel$api$i;
			const collapsedEdge = !((_this$map$panel$api$i = this.map[panel.api.id]) === null || _this$map$panel$api$i === void 0 ? void 0 : _this$map$panel$api$i.forceVisible) && isInCollapsedEdgeGroup(panel);
			if (panel.api.isVisible && !collapsedEdge) {
				var _this$map$panel$api$i2;
				this.positionCache.invalidate();
				resize();
				/**
				* Existing geometry is safe to show while its replacement lays
				* out. `retainPreviousGeometry` is only set when geometry has
				* actually been written (see `attach`), so this can never
				* un-hide an overlay whose left/top/width/height are unset —
				* `.dv-render-overlay` is 100%/100% by default and would
				* otherwise cover the whole dock.
				*
				* The retained geometry is the panel's position in the previous
				* layout, so restoring a layout that moves the panel does paint
				* it at stale coordinates until the reposition lands. That is
				* bounded to the next frame now that a superseded `attach` can
				* no longer swallow the reposition (see `attach`); showing
				* stale-but-real geometry for a frame is the deliberate
				* trade-off against blanking the panel for the whole rebuild.
				*/
				if ((_this$map$panel$api$i2 = this.map[panel.api.id]) === null || _this$map$panel$api$i2 === void 0 ? void 0 : _this$map$panel$api$i2.retainPreviousGeometry) focusContainer.style.visibility = "";
				focusContainer.style.pointerEvents = "";
			} else {
				focusContainer.style.visibility = "hidden";
				focusContainer.style.pointerEvents = "none";
			}
		};
		const observerDisposable = new MutableDisposable();
		const correctLayerPosition = () => {
			if (panel.api.location.type === "floating") queueMicrotask(() => {
				if (disposable.isDisposed) return;
				const floatingGroup = this.accessor.getFloatingWindowForGroup(panel.api.group);
				if (!floatingGroup) return;
				const element = floatingGroup.overlay.element;
				const update = () => {
					const level = Number(element.getAttribute("aria-level"));
					focusContainer.style.zIndex = `calc(var(--dv-overlay-z-index, 999) + ${level * 2 + 1})`;
				};
				const observer = new MutationObserver(() => {
					update();
				});
				observerDisposable.value = Disposable.from(() => observer.disconnect());
				observer.observe(element, {
					attributeFilter: ["aria-level"],
					attributes: true
				});
				update();
			});
			else focusContainer.style.zIndex = "";
		};
		const disposable = new CompositeDisposable(
			observerDisposable,
			/**
			* since container is positioned absoutely we must explicitly forward
			* the dnd events for the expect behaviours to continue to occur in terms of dnd
			*
			* the dnd observer does not need to be conditional on whether the panel is visible since
			* non-visible panels have 'pointer-events: none' and in such case the dnd observer will not fire.
			*/
			new DragAndDropObserver(focusContainer, {
				onDragEnd: (e) => {
					referenceContainer.dropTarget.dnd.onDragEnd(e);
				},
				onDragEnter: (e) => {
					referenceContainer.dropTarget.dnd.onDragEnter(e);
				},
				onDragLeave: (e) => {
					referenceContainer.dropTarget.dnd.onDragLeave(e);
				},
				onDrop: (e) => {
					referenceContainer.dropTarget.dnd.onDrop(e);
				},
				onDragOver: (e) => {
					referenceContainer.dropTarget.dnd.onDragOver(e);
				}
			}),
			panel.api.onDidVisibilityChange(() => {
				/**
				* Control the visibility of the content, however even when not visible (display: none)
				* the content is still maintained within the DOM hence DOM specific attributes
				* such as scroll position are maintained when next made visible.
				*/
				visibilityChanged();
			}),
			panel.api.onDidDimensionsChange(() => {
				if (!panel.api.isVisible) return;
				resize();
			}),
			(_panel$group$api$onDi = (_panel$group$api$onDi2 = (_panel$group$api = panel.group.api).onDidCollapsedChange) === null || _panel$group$api$onDi2 === void 0 ? void 0 : _panel$group$api$onDi2.call(_panel$group$api, () => {
				this.positionCache.invalidate();
				resize();
			})) !== null && _panel$group$api$onDi !== void 0 ? _panel$group$api$onDi : Disposable.NONE,
			referenceContainer.onDidDimensionsChange((size) => {
				applySize(size);
			}),
			panel.api.onDidLocationChange(() => {
				correctLayerPosition();
			})
		);
		this.map[panel.api.id].destroy = Disposable.from(() => {
			if (contentElement.parentElement === focusContainer) contentElement.remove();
			focusContainer.remove();
		});
		correctLayerPosition();
		queueMicrotask(() => {
			if (this.isDisposed) return;
			/**
			* wait until everything has finished in the current stack-frame call before
			* calling the first resize as other size-altering events may still occur before
			* the end of the stack-frame.
			*/
			visibilityChanged();
		});
		this.map[panel.api.id].disposable.dispose();
		this.map[panel.api.id].disposable = disposable;
		this.map[panel.api.id].resize = resize;
		return focusContainer;
	}
};

//#endregion
//#region src/dockview/strictEventsSequencing.ts
var StrictEventsSequencing = class extends CompositeDisposable {
	constructor(accessor) {
		super();
		this.accessor = accessor;
		this.init();
	}
	init() {
		const panels = /* @__PURE__ */ new Set();
		const groups = /* @__PURE__ */ new Set();
		this.addDisposables(this.accessor.onDidAddPanel((panel) => {
			if (panels.has(panel.api.id)) throw new Error(`dockview: Invalid event sequence. [onDidAddPanel] called for panel ${panel.api.id} but panel already exists`);
			else panels.add(panel.api.id);
		}), this.accessor.onDidRemovePanel((panel) => {
			if (panels.has(panel.api.id)) panels.delete(panel.api.id);
			else throw new Error(`dockview: Invalid event sequence. [onDidRemovePanel] called for panel ${panel.api.id} but panel does not exists`);
		}), this.accessor.onDidAddGroup((group) => {
			if (groups.has(group.api.id)) throw new Error(`dockview: Invalid event sequence. [onDidAddGroup] called for group ${group.api.id} but group already exists`);
			else groups.add(group.api.id);
		}), this.accessor.onDidRemoveGroup((group) => {
			if (groups.has(group.api.id)) groups.delete(group.api.id);
			else throw new Error(`dockview: Invalid event sequence. [onDidRemoveGroup] called for group ${group.api.id} but group does not exists`);
		}));
	}
};

//#endregion
//#region src/dismissableLayer.ts
/** Touch-primary input (coarse pointer, no fine pointer). On these devices a
*  window resize is usually an on-screen-keyboard pop / orientation change /
*  address-bar collapse, none of which mean "dismiss". */
function isCoarsePrimaryInput(win) {
	if (!win.matchMedia) return false;
	const coarse = win.matchMedia("(pointer: coarse)").matches;
	const fine = win.matchMedia("(pointer: fine)").matches;
	return coarse && !fine;
}
/**
* The shared dismissal lifecycle behind transient surfaces (popovers, menus,
* peeks): while it lives it watches a configurable set of dismiss signals
* (Escape / extra keys, outside-pointerdown with an optional grace window,
* window resize, focus moving outside) and calls `onDismiss`. Inside/outside is
* decided by an `isInside` predicate (geometry) or by checking the event's
* composed path against `elements`. Dispose to detach every listener.
*
* It owns only the *signals*, not the surface element, its position, or any
* hover/keep-open policy, so callers keep their own element lifecycle and
* layer this underneath.
*/
function createDismissableLayer(options) {
	var _options$window, _options$capture, _options$escape, _options$keys, _options$outsidePoint, _options$pointerDownG, _options$now;
	const win = (_options$window = options.window) !== null && _options$window !== void 0 ? _options$window : window;
	const capture = (_options$capture = options.capture) !== null && _options$capture !== void 0 ? _options$capture : false;
	const escape = (_options$escape = options.escape) !== null && _options$escape !== void 0 ? _options$escape : true;
	const keys = (_options$keys = options.keys) !== null && _options$keys !== void 0 ? _options$keys : [];
	const outside = (_options$outsidePoint = options.outsidePointerDown) !== null && _options$outsidePoint !== void 0 ? _options$outsidePoint : true;
	const grace = (_options$pointerDownG = options.pointerDownGraceMs) !== null && _options$pointerDownG !== void 0 ? _options$pointerDownG : 0;
	const now = (_options$now = options.now) !== null && _options$now !== void 0 ? _options$now : Date.now;
	const openedAt = now();
	const disposables = new CompositeDisposable();
	const isInside = (event) => {
		var _options$elements, _options$elements2;
		if (options.isInside) return options.isInside(event);
		return isEventWithin(event, (_options$elements = (_options$elements2 = options.elements) === null || _options$elements2 === void 0 ? void 0 : _options$elements2.call(options)) !== null && _options$elements !== void 0 ? _options$elements : []);
	};
	if (escape || keys.length > 0) disposables.addDisposables(addDisposableListener(win, "keydown", (event) => {
		if (escape && event.key === "Escape" || keys.includes(event.key)) options.onDismiss();
	}, capture));
	if (outside || options.onInsidePointerDown) disposables.addDisposables(addDisposableListener(win, "pointerdown", (event) => {
		if (isInside(event)) {
			var _options$onInsidePoin;
			(_options$onInsidePoin = options.onInsidePointerDown) === null || _options$onInsidePoin === void 0 || _options$onInsidePoin.call(options, event);
			return;
		}
		if (!outside || now() - openedAt < grace) return;
		options.onDismiss();
	}, capture));
	if (options.resize) disposables.addDisposables(addDisposableListener(win, "resize", () => {
		if (isCoarsePrimaryInput(win)) return;
		options.onDismiss();
	}));
	if (options.focusOut) {
		/** A node in the layer's own tree, to scope retargeting and to locate
		*  the shadow roots to listen on. */
		const layerScope = () => {
			var _options$anchor, _options$anchor2, _options$elements3;
			return (_options$anchor = (_options$anchor2 = options.anchor) === null || _options$anchor2 === void 0 ? void 0 : _options$anchor2.call(options)) !== null && _options$anchor !== void 0 ? _options$anchor : (_options$elements3 = options.elements) === null || _options$elements3 === void 0 ? void 0 : _options$elements3.call(options)[0];
		};
		const seen = /* @__PURE__ */ new WeakSet();
		const onFocusIn = (event) => {
			var _options$elements4, _options$elements5;
			if (seen.has(event)) return;
			seen.add(event);
			const target = event.target;
			if (!(target instanceof Element)) return;
			if (!(options.isFocusInside ? options.isFocusInside(retargetInto(target, layerScope())) : isEventWithin(event, (_options$elements4 = (_options$elements5 = options.elements) === null || _options$elements5 === void 0 ? void 0 : _options$elements5.call(options)) !== null && _options$elements4 !== void 0 ? _options$elements4 : []))) options.onDismiss();
		};
		const bound = /* @__PURE__ */ new Map();
		const syncShadowRoots = () => {
			var _options$anchor3, _options$elements6, _options$elements7;
			const wanted = /* @__PURE__ */ new Set();
			const anchor = (_options$anchor3 = options.anchor) === null || _options$anchor3 === void 0 ? void 0 : _options$anchor3.call(options);
			const sources = [...(_options$elements6 = (_options$elements7 = options.elements) === null || _options$elements7 === void 0 ? void 0 : _options$elements7.call(options)) !== null && _options$elements6 !== void 0 ? _options$elements6 : [], ...anchor ? [anchor] : []];
			for (const node of sources) for (const root of shadowRootsOf(node)) wanted.add(root);
			for (const [root, listener] of bound) if (!wanted.has(root)) {
				listener.dispose();
				bound.delete(root);
			}
			for (const root of wanted) {
				if (bound.has(root)) continue;
				bound.set(root, addDisposableListener(root, "focusin", onFocusIn, capture));
			}
		};
		disposables.addDisposables(addDisposableListener(win, "focusin", (event) => {
			syncShadowRoots();
			onFocusIn(event);
		}, capture), { dispose: () => {
			for (const [, listener] of bound) listener.dispose();
			bound.clear();
		} });
		syncShadowRoots();
	}
	return disposables;
}

//#endregion
//#region src/dockview/components/popupService.ts
var PopupService = class extends CompositeDisposable {
	constructor(root, win = globalThis.window) {
		super();
		this._active = null;
		this._activeDisposable = new MutableDisposable();
		this._root = root;
		this._window = win;
		this._element = win.document.createElement("div");
		this._element.className = "dv-popover-anchor";
		this._element.style.position = "relative";
		this._root.prepend(this._element);
		this.addDisposables(Disposable.from(() => {
			this.close();
		}), this._activeDisposable);
	}
	/**
	* Move the popup anchor into a new root element. Call this when a shell
	* wraps the dockview component so that edge-group overflow dropdowns
	* position correctly relative to the full layout area.
	*/
	updateRoot(newRoot) {
		newRoot.prepend(this._element);
		this._root = newRoot;
	}
	openPopover(element, position, options) {
		var _position$zIndex;
		this.close();
		const wrapper = this._window.document.createElement("div");
		wrapper.style.position = "absolute";
		wrapper.style.zIndex = (_position$zIndex = position.zIndex) !== null && _position$zIndex !== void 0 ? _position$zIndex : "var(--dv-overlay-z-index)";
		wrapper.appendChild(element);
		const anchorBox = this._element.getBoundingClientRect();
		const offsetX = anchorBox.left;
		const offsetY = anchorBox.top;
		wrapper.style.top = `${position.y - offsetY}px`;
		wrapper.style.left = `${position.x - offsetX}px`;
		this._element.appendChild(wrapper);
		this._active = wrapper;
		const POINTERDOWN_GRACE_MS = 200;
		this._activeDisposable.value = new CompositeDisposable(createDismissableLayer({
			window: this._window,
			onDismiss: () => this.close(),
			elements: () => this._active ? [this._active] : [],
			keys: ["Enter"],
			pointerDownGraceMs: POINTERDOWN_GRACE_MS,
			resize: true
		}), (options === null || options === void 0 ? void 0 : options.onClose) ? Disposable.from(options.onClose) : Disposable.NONE);
		this._window.requestAnimationFrame(() => {
			shiftAbsoluteElementIntoView(wrapper, this._root);
		});
	}
	close() {
		if (this._active) {
			this._active.remove();
			this._activeDisposable.dispose();
			this._active = null;
		}
	}
};

//#endregion
//#region src/dnd/dropTargetAnchorContainer.ts
var DropTargetAnchorContainer = class extends CompositeDisposable {
	/**
	* The element the live overlay was rendered for, `undefined` when nothing
	* is showing. The container is shared by every drop target, so a caller
	* tearing down only its own overlay must check this before `clear()`.
	*/
	get renderedOutline() {
		return this._model ? this._outline : void 0;
	}
	get disabled() {
		return this._disabled;
	}
	set disabled(value) {
		if (this.disabled === value) return;
		this._disabled = value;
		if (value) this._clearNow();
	}
	_cancelPendingClear() {
		if (this._pendingClear !== void 0) {
			clearTimeout(this._pendingClear);
			this._pendingClear = void 0;
		}
	}
	_clearNow() {
		this._cancelPendingClear();
		if (this._model) this._model.root.remove();
		this._model = void 0;
	}
	get model() {
		if (this.disabled) return;
		return {
			clear: () => {
				this._clearNow();
			},
			scheduleClear: () => {
				if (this._pendingClear !== void 0 || !this._model) return;
				this._pendingClear = setTimeout(() => {
					this._pendingClear = void 0;
					this._clearNow();
				}, 0);
			},
			exists: () => {
				return !!this._model;
			},
			getElements: (event, outline) => {
				this._cancelPendingClear();
				const changed = this._outline !== outline;
				this._outline = outline;
				if (this._model) {
					this._model.changed = changed;
					return this._model;
				}
				const container = this.createContainer();
				const anchor = this.createAnchor();
				this._model = {
					root: container,
					overlay: anchor,
					changed
				};
				container.appendChild(anchor);
				this.element.appendChild(container);
				if ((event === null || event === void 0 ? void 0 : event.target) instanceof HTMLElement) {
					const targetBox = event.target.getBoundingClientRect();
					const box = this.element.getBoundingClientRect();
					anchor.style.left = `${targetBox.left - box.left}px`;
					anchor.style.top = `${targetBox.top - box.top}px`;
				}
				return this._model;
			}
		};
	}
	constructor(element, options) {
		super();
		this.element = element;
		this._disabled = false;
		this._disabled = options.disabled;
		this.addDisposables(Disposable.from(() => {
			var _this$model;
			(_this$model = this.model) === null || _this$model === void 0 || _this$model.clear();
		}));
	}
	createContainer() {
		const el = document.createElement("div");
		el.className = "dv-drop-target-container";
		return el;
	}
	createAnchor() {
		const el = document.createElement("div");
		el.className = "dv-drop-target-anchor";
		el.style.visibility = "hidden";
		return el;
	}
};

//#endregion
//#region src/dockview/dockviewShell.ts
const EDGE_POSITIONS = [
	"left",
	"right",
	"top",
	"bottom"
];
function isHorizontal(position) {
	return position === "left" || position === "right";
}
/** A view outside a shell: no gap, and every layout is real. */
const UNBOUNDED_AXIS = {
	marginShare: 0,
	size: Number.POSITIVE_INFINITY
};
var EdgeGroupView = class {
	/**
	* The effective (pre-gap) collapsed size: the measured tab-strip size when
	* available, otherwise the configured/theme base.
	*/
	get _effectiveBaseCollapsed() {
		var _this$_measuredTabSiz;
		return (_this$_measuredTabSiz = this._measuredTabSize) !== null && _this$_measuredTabSiz !== void 0 ? _this$_measuredTabSiz : this._baseCollapsedSize;
	}
	get minimumSize() {
		if (this._isCollapsed) return this.collapsedSize;
		return this._baseMinimumSize !== void 0 ? this._baseMinimumSize + this._axis.marginShare : this._effectiveBaseCollapsed + 50 + this._axis.marginShare;
	}
	get maximumSize() {
		return this._isCollapsed ? this.collapsedSize : this._expandedMaximumSize;
	}
	get element() {
		return this._group.element;
	}
	get isCollapsed() {
		return this._isCollapsed;
	}
	/** Includes the gap share, as expanding restores a slot size. */
	get lastExpandedSize() {
		return this._lastExpandedSize;
	}
	/** Without the gap share. */
	get lastExpandedContentSize() {
		return this._lastExpandedSize - this._axis.marginShare;
	}
	get collapsedSize() {
		return this._effectiveBaseCollapsed + this._axis.marginShare;
	}
	/** The user-configured (pre-gap) geometry constraints, for serialization.
	*  These are the raw values passed to `addEdgeGroup`, unlike the effective
	*  `minimumSize`/`maximumSize`/`collapsedSize` getters, which fold in the
	*  theme gap and collapse-locking. */
	get configuredMinimumSize() {
		return this._baseMinimumSize;
	}
	get configuredMaximumSize() {
		return this._expandedMaximumSize;
	}
	get configuredCollapsedSize() {
		return this._baseCollapsedSize;
	}
	constructor(options, group, orientation, axis = UNBOUNDED_AXIS) {
		var _options$collapsedSiz, _options$maximumSize, _options$initialSize;
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		this.snap = false;
		this.priority = "low";
		this._isCollapsed = false;
		this._isVisible = true;
		this._tabSizeDisposables = new CompositeDisposable();
		this._group = group;
		this._orientation = orientation;
		group.element.classList.add("dv-edge-group");
		group.element.dataset.testid = `dv-edge-group-${options.id}`;
		this._baseCollapsedSize = (_options$collapsedSiz = options.collapsedSize) !== null && _options$collapsedSiz !== void 0 ? _options$collapsedSiz : 35;
		this._baseMinimumSize = options.minimumSize;
		this._axis = axis;
		this._expandedMaximumSize = (_options$maximumSize = options.maximumSize) !== null && _options$maximumSize !== void 0 ? _options$maximumSize : Number.POSITIVE_INFINITY;
		this._lastExpandedSize = (_options$initialSize = options.initialSize) !== null && _options$initialSize !== void 0 ? _options$initialSize : 200;
		if (options.collapsed) {
			this._isCollapsed = true;
			group.element.classList.add("dv-edge-collapsed");
		}
		this._observeTabStrip();
	}
	/**
	* Watch the group's tab strip so the collapsed size follows the live tab
	* height. The strip's cross-axis size (height for top/bottom, width for
	* left/right) is exactly what a collapsed edge group should occupy; a
	* ResizeObserver keeps them in sync when the tab height changes at runtime.
	*/
	_observeTabStrip() {
		const strip = this._group.element.querySelector(".dv-tabs-and-actions-container");
		if (!strip) return;
		this._tabSizeDisposables.addDisposables(watchElementResize(strip, () => {
			const { headerPosition } = this._group;
			if ((headerPosition === "left" || headerPosition === "right") !== (this._orientation === "horizontal")) return;
			this._applyMeasuredTabSize(this._orientation === "vertical" ? strip.offsetHeight : strip.offsetWidth);
		}));
	}
	/**
	* Apply a freshly-measured tab-strip cross size. When the group is
	* collapsed this resizes it in the parent splitview so the collapsed strip
	* always shows the full tab height.
	*/
	_applyMeasuredTabSize(size) {
		if (size <= 0 || size === this._measuredTabSize) return;
		this._measuredTabSize = size;
		if (this._isCollapsed) this._onDidChange.fire({ size: this.collapsedSize });
	}
	layout(size, orthogonalSize) {
		if (!this._isCollapsed && this._isVisible && this._axis.size > 0) this._lastExpandedSize = size + this._axis.marginShare;
		if (this._orientation === "horizontal") this._group.layout(size, orthogonalSize);
		else this._group.layout(orthogonalSize, size);
	}
	setCollapsed(collapsed) {
		if (this._isCollapsed === collapsed) return;
		this._isCollapsed = collapsed;
		this._group.element.classList.toggle("dv-edge-collapsed", collapsed);
	}
	setVisible(visible) {
		this._isVisible = visible;
	}
	/**
	* Set the expanded size without triggering a layout: from serialized
	* state (before setCollapsed(true) during fromJSON, so that expanding
	* restores the right size) or from an explicit resize.
	*/
	restoreExpandedSize(size) {
		this._lastExpandedSize = size;
	}
	/**
	* Apply a new base (pre-gap) collapsed size and base minimum size after a
	* theme change. Base values come from the original config. A live measured
	* tab size (if any) continues to win over the base collapsed size.
	*/
	updateSizing(baseCollapsedSize, baseMinimumSize) {
		this._baseCollapsedSize = baseCollapsedSize;
		this._baseMinimumSize = baseMinimumSize;
	}
	dispose() {
		this._tabSizeDisposables.dispose();
		this._onDidChange.dispose();
	}
};
var CenterView = class {
	get element() {
		return this._dockviewElement;
	}
	constructor(_dockviewElement, _layoutDockview) {
		this._dockviewElement = _dockviewElement;
		this._layoutDockview = _layoutDockview;
		this.priority = "high";
		this.minimumSize = 100;
		this.maximumSize = Number.POSITIVE_INFINITY;
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
	}
	layout(size, orthogonalSize) {
		this._layoutDockview(orthogonalSize, size);
	}
	setVisible(_visible) {}
	dispose() {
		this._onDidChange.dispose();
	}
};
/**
* The vertical centre column: top (optional) | center | bottom (optional).
* This view sits between the left and right edge panels in the outer
* horizontal splitview, so its primary axis is width (horizontal).
*/
var MiddleColumnView = class {
	get element() {
		return this._element;
	}
	constructor(centerView, gap = 0) {
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		this.minimumSize = 100;
		this.maximumSize = Number.POSITIVE_INFINITY;
		this.priority = "high";
		this._element = document.createElement("div");
		this._element.className = "dv-shell-middle-column";
		this._element.style.height = "100%";
		this._element.style.width = "100%";
		this._splitview = new Splitview(this._element, {
			orientation: "VERTICAL",
			proportionalLayout: false,
			margin: gap
		});
		this._centerIndex = 0;
		this._splitview.addView(centerView, { type: "distribute" }, 0);
	}
	addTopView(view, initialSize) {
		this._splitview.addView(view, initialSize, 0);
		this._topIndex = 0;
		this._centerIndex += 1;
		if (this._bottomIndex !== void 0) this._bottomIndex += 1;
	}
	addBottomView(view, initialSize) {
		const newIndex = this._splitview.length;
		this._splitview.addView(view, initialSize, newIndex);
		this._bottomIndex = newIndex;
	}
	removeView(position) {
		const index = position === "top" ? this._topIndex : this._bottomIndex;
		if (index === void 0) return;
		this._splitview.removeView(index);
		if (position === "top") {
			this._topIndex = void 0;
			this._centerIndex -= 1;
			if (this._bottomIndex !== void 0) this._bottomIndex -= 1;
		} else this._bottomIndex = void 0;
	}
	layout(size, orthogonalSize) {
		this._splitview.layout(orthogonalSize, size);
	}
	setVisible(_visible) {}
	setViewVisible(position, visible) {
		const index = position === "top" ? this._topIndex : this._bottomIndex;
		if (index !== void 0) this._splitview.setViewVisible(index, visible);
	}
	isViewVisible(position) {
		const index = position === "top" ? this._topIndex : this._bottomIndex;
		if (index !== void 0) return this._splitview.isViewVisible(index);
		return false;
	}
	getViewSize(position) {
		const index = position === "top" ? this._topIndex : this._bottomIndex;
		if (index !== void 0) return this._splitview.getViewSize(index);
		return 0;
	}
	getViewCachedVisibleSize(position) {
		const index = position === "top" ? this._topIndex : this._bottomIndex;
		if (index !== void 0) return this._splitview.getViewCachedVisibleSize(index);
	}
	resizeView(position, size) {
		const index = position === "top" ? this._topIndex : this._bottomIndex;
		if (index !== void 0) this._splitview.resizeView(index, size);
	}
	/** The inner splitview, as the axis its edge views read. */
	get axis() {
		return this._splitview;
	}
	updateMargin(gap) {
		this._splitview.margin = gap;
	}
	/** Disables the sashes of the top/bottom edge groups. */
	get disabled() {
		return this._splitview.disabled;
	}
	set disabled(value) {
		this._splitview.disabled = value;
	}
	dispose() {
		this._onDidChange.dispose();
		this._splitview.dispose();
	}
};
var ShellManager = class {
	constructor(container, dockviewElement, layoutGrid, gap = 0, defaultCollapsedSize = 35) {
		this._disposables = new CompositeDisposable();
		this._viewConfigs = /* @__PURE__ */ new Map();
		this._pendingSizes = /* @__PURE__ */ new Map();
		this._currentWidth = 0;
		this._currentHeight = 0;
		this._gap = gap;
		this._defaultCollapsedSize = defaultCollapsedSize;
		this._shellElement = document.createElement("div");
		this._shellElement.className = "dv-shell";
		this._shellElement.style.height = "100%";
		this._shellElement.style.width = "100%";
		this._shellElement.style.position = "relative";
		container.appendChild(this._shellElement);
		const centerView = new CenterView(dockviewElement, layoutGrid);
		this._middleColumn = new MiddleColumnView(centerView, gap);
		this._outerSplitview = new Splitview(this._shellElement, {
			orientation: "HORIZONTAL",
			proportionalLayout: false,
			margin: gap
		});
		this._middleIndex = 0;
		this._outerSplitview.addView(this._middleColumn, { type: "distribute" }, 0);
		this._disposables.addDisposables(watchElementResize(this._shellElement, (entry) => {
			/**
			* When the shell (or an ancestor) becomes hidden — e.g. a
			* nested dockview whose `onlyWhenVisible` host panel is
			* deactivated — the element collapses to (0, 0) or is detached
			* from the DOM. Propagating that zero size would relayout the
			* edge-group splitview at 0, clamping the low-priority edge
			* groups down to their minimum size and destroying the user's
			* sizing. Skip these cases so sizes are preserved while hidden;
			* mirrors the guard in the `Resizable` base class. See #1495.
			*
			* offsetParent === null is equivalent to display: none on the
			* element or one of its ancestors.
			* @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
			*/
			if (!this._shellElement.offsetParent) return;
			if (!isInDocument(this._shellElement)) return;
			const width = Math.round(entry.contentRect.width);
			const height = Math.round(entry.contentRect.height);
			if (width === this._currentWidth && height === this._currentHeight) return;
			this.layout(width, height);
		}), this._outerSplitview, this._middleColumn, centerView);
	}
	get element() {
		return this._shellElement;
	}
	/**
	* The dock's `locked` option. The edge groups are resized with the sashes
	* of the shell's own splitviews (left/right in the outer one, top/bottom
	* in the middle column), so locking disables both.
	*/
	get locked() {
		return this._outerSplitview.disabled;
	}
	set locked(value) {
		this._outerSplitview.disabled = value;
		this._middleColumn.disabled = value;
	}
	/**
	* Add an edge group view at the given position. The view wraps the
	* provided group element inside the shell's splitview layout.
	* Throws if a group at this position is already registered.
	*/
	addEdgeView(position, options, group) {
		var _options$collapsedSiz2;
		if (this.hasEdgeGroup(position)) throw new Error(`dockview: edge group already registered at position '${position}'`);
		this._viewConfigs.set(position, options);
		const view = new EdgeGroupView(_objectSpread2(_objectSpread2({}, options), {}, { collapsedSize: (_options$collapsedSiz2 = options.collapsedSize) !== null && _options$collapsedSiz2 !== void 0 ? _options$collapsedSiz2 : this._defaultCollapsedSize }), group, isHorizontal(position) ? "horizontal" : "vertical", this._axisFor(position));
		const initialSize = view.isCollapsed ? view.collapsedSize : view.lastExpandedSize;
		switch (position) {
			case "left":
				this._outerSplitview.addView(view, initialSize, 0);
				this._leftIndex = 0;
				this._middleIndex += 1;
				if (this._rightIndex !== void 0) this._rightIndex += 1;
				this._leftView = view;
				break;
			case "right":
				{
					const idx = this._outerSplitview.length;
					this._outerSplitview.addView(view, initialSize, idx);
					this._rightIndex = idx;
					this._rightView = view;
				}
				break;
			case "top":
				this._middleColumn.addTopView(view, initialSize);
				this._topView = view;
				break;
			case "bottom":
				this._middleColumn.addBottomView(view, initialSize);
				this._bottomView = view;
				break;
		}
		this._disposables.addDisposables(view);
		if (!view.isCollapsed && !this._canResize(position)) this._pendingSizes.set(position, initialSize);
		this._relayout();
		return view;
	}
	/**
	* Lay out from the shell's current size.
	*
	* The ResizeObserver above only reports asynchronously, so between
	* construction and its first callback the shell believes it has no size -
	* and any layout built in that window (panels added straight after
	* `createDockview`, say) resolves its sizes against zero and collapses to
	* minimums, permanently. Seeding the size synchronously gives that work
	* the real dimensions. Same guards as the observer: a detached or hidden
	* shell has no size worth propagating.
	*/
	layoutFromElement() {
		if (!this._shellElement.offsetParent || !isInDocument(this._shellElement)) return;
		const width = Math.round(this._shellElement.clientWidth);
		const height = Math.round(this._shellElement.clientHeight);
		if (width === 0 || height === 0) return;
		this.layout(width, height);
	}
	layout(width, height) {
		this._currentWidth = width;
		this._currentHeight = height;
		this._outerSplitview.layout(width, height);
		this._flushPendingSizes();
	}
	/**
	* Called when the active theme changes. Updates splitview margins and
	* edge-group collapsed sizes so the layout matches the new theme's gap
	* and tab-strip dimensions.
	*/
	updateTheme(gap, defaultCollapsedSize) {
		this._gap = gap;
		this._defaultCollapsedSize = defaultCollapsedSize;
		this._outerSplitview.margin = gap;
		this._middleColumn.updateMargin(gap);
		this._applyThemeSizing();
		this._relayout();
	}
	/** Whether the other edge of `position`'s axis holds a view. */
	_hasSiblingOn(position) {
		return isHorizontal(position) ? this._leftView !== void 0 && this._rightView !== void 0 : this._topView !== void 0 && this._bottomView !== void 0;
	}
	/** The splitview `position`'s view sits in, as its edge axis. */
	_axisFor(position) {
		return isHorizontal(position) ? this._outerSplitview : this._middleColumn.axis;
	}
	/** Re-derive every edge view's base sizing from its original config and
	*  the current defaults. */
	_applyThemeSizing() {
		for (const position of EDGE_POSITIONS) {
			const view = this._getView(position);
			const baseCfg = this._viewConfigs.get(position);
			if (view && baseCfg) {
				var _baseCfg$collapsedSiz;
				view.updateSizing((_baseCfg$collapsedSiz = baseCfg.collapsedSize) !== null && _baseCfg$collapsedSiz !== void 0 ? _baseCfg$collapsedSiz : this._defaultCollapsedSize, baseCfg.minimumSize);
			}
		}
	}
	/**
	* Lay the shell out again at its current size, once it has one. The
	* splitviews clamp every view to its current constraints, which is how a
	* collapsed strip or a group at its minimum follows a moved gap share.
	*/
	_relayout() {
		if (this._currentWidth > 0 && this._currentHeight > 0) this.layout(this._currentWidth, this._currentHeight);
	}
	/** The view's slot in its splitview: its laid-out size plus the gap share. */
	_slotSize(position) {
		switch (position) {
			case "left": return this._leftIndex === void 0 ? 0 : this._outerSplitview.getViewSize(this._leftIndex);
			case "right": return this._rightIndex === void 0 ? 0 : this._outerSplitview.getViewSize(this._rightIndex);
			case "top":
			case "bottom": return this._middleColumn.getViewSize(position);
		}
	}
	removeEdgeView(position) {
		const view = this._getView(position);
		if (!view) return;
		switch (position) {
			case "left":
				this._outerSplitview.removeView(this._leftIndex);
				this._leftIndex = void 0;
				this._leftView = void 0;
				this._middleIndex -= 1;
				if (this._rightIndex !== void 0) this._rightIndex -= 1;
				break;
			case "right":
				this._outerSplitview.removeView(this._rightIndex);
				this._rightIndex = void 0;
				this._rightView = void 0;
				break;
			case "top":
				this._middleColumn.removeView("top");
				this._topView = void 0;
				break;
			case "bottom":
				this._middleColumn.removeView("bottom");
				this._bottomView = void 0;
				break;
		}
		this._disposables.removeDisposable(view);
		view.dispose();
		this._viewConfigs.delete(position);
		this._pendingSizes.delete(position);
		this._relayout();
	}
	hasEdgeGroup(position) {
		switch (position) {
			case "top": return this._topView !== void 0;
			case "bottom": return this._bottomView !== void 0;
			case "left": return this._leftView !== void 0;
			case "right": return this._rightView !== void 0;
		}
	}
	setEdgeGroupVisible(position, visible) {
		const changes = this._getView(position) !== void 0 && visible !== this.isEdgeGroupVisible(position);
		switch (position) {
			case "left":
				if (this._leftIndex !== void 0) this._outerSplitview.setViewVisible(this._leftIndex, visible);
				break;
			case "right":
				if (this._rightIndex !== void 0) this._outerSplitview.setViewVisible(this._rightIndex, visible);
				break;
			case "top":
			case "bottom":
				this._middleColumn.setViewVisible(position, visible);
				break;
		}
		if (changes && this._gap > 0 && this._hasSiblingOn(position)) this._relayout();
		if (visible) this._flushPendingSizes();
	}
	isEdgeGroupVisible(position) {
		switch (position) {
			case "left":
				if (this._leftIndex !== void 0) return this._outerSplitview.isViewVisible(this._leftIndex);
				return false;
			case "right":
				if (this._rightIndex !== void 0) return this._outerSplitview.isViewVisible(this._rightIndex);
				return false;
			case "top":
			case "bottom": return this._middleColumn.isViewVisible(position);
		}
	}
	setEdgeGroupCollapsed(position, collapsed) {
		const view = this._getView(position);
		if (!view) return;
		view.setCollapsed(collapsed);
		if (collapsed) {
			this._pendingSizes.delete(position);
			this._resizeView(position, view.collapsedSize);
		} else this.resizeEdgeGroup(position, view.lastExpandedSize);
	}
	/**
	* Resize the edge group at `position` along its primary axis (width for
	* `left`/`right`, height for `top`/`bottom`), clamped by the group's
	* constraints and the space available. Where `groupApi.setSize` lands.
	*
	* The size becomes the group's expanded size, so a collapsed group keeps
	* its strip and takes it on expand, and it survives a `toJSON` round-trip.
	*/
	resizeEdgeGroup(position, size) {
		const view = this._getView(position);
		if (!view || !Number.isFinite(size)) return;
		const target = Math.round(size);
		if (target <= 0) return;
		view.restoreExpandedSize(target);
		if (view.isCollapsed) {
			this._pendingSizes.delete(position);
			return;
		}
		if (this._canResize(position)) {
			this._pendingSizes.delete(position);
			this._resizeView(position, target);
		} else this._pendingSizes.set(position, target);
	}
	/** A resize lands only on a visible view (a hidden one is pinned to zero)
	*  whose splitview has extent to distribute. */
	_canResize(position) {
		return this.isEdgeGroupVisible(position) && this._axisFor(position).size > 0;
	}
	_resizeView(position, size) {
		switch (position) {
			case "left":
				if (this._leftIndex !== void 0) this._outerSplitview.resizeView(this._leftIndex, size);
				break;
			case "right":
				if (this._rightIndex !== void 0) this._outerSplitview.resizeView(this._rightIndex, size);
				break;
			case "top":
			case "bottom":
				this._middleColumn.resizeView(position, size);
				break;
		}
	}
	_flushPendingSizes() {
		if (this._pendingSizes.size === 0) return;
		for (const [position, size] of this._pendingSizes) {
			const view = this._getView(position);
			if (!view || view.isCollapsed || !this._canResize(position)) continue;
			this._pendingSizes.delete(position);
			this._resizeView(position, size);
		}
	}
	isEdgeGroupCollapsed(position) {
		var _this$_getView$isColl, _this$_getView;
		return (_this$_getView$isColl = (_this$_getView = this._getView(position)) === null || _this$_getView === void 0 ? void 0 : _this$_getView.isCollapsed) !== null && _this$_getView$isColl !== void 0 ? _this$_getView$isColl : false;
	}
	/** The size an edge group expands to (its pre-collapse size), used to size
	*  the auto-hide peek overlay. */
	getEdgeGroupExpandedSize(position) {
		var _this$_getView$lastEx, _this$_getView2;
		return (_this$_getView$lastEx = (_this$_getView2 = this._getView(position)) === null || _this$_getView2 === void 0 ? void 0 : _this$_getView2.lastExpandedContentSize) !== null && _this$_getView$lastEx !== void 0 ? _this$_getView$lastEx : 0;
	}
	_getView(position) {
		switch (position) {
			case "top": return this._topView;
			case "bottom": return this._bottomView;
			case "left": return this._leftView;
			case "right": return this._rightView;
		}
	}
	toJSON() {
		const edgeGroups = {};
		for (const position of EDGE_POSITIONS) {
			const view = this._getView(position);
			if (!view) continue;
			const visible = this.isEdgeGroupVisible(position);
			edgeGroups[position] = {
				size: this._expandedSize(view, position, visible),
				visible,
				collapsed: view.isCollapsed || void 0,
				minimumSize: view.configuredMinimumSize,
				maximumSize: Number.isFinite(view.configuredMaximumSize) ? view.configuredMaximumSize : void 0,
				collapsedSize: view.configuredCollapsedSize
			};
		}
		return edgeGroups;
	}
	/** The size to restore the group to. An expanded-but-hidden group has a
	*  slot of 0, so fall back to its cached visible size (then
	*  lastExpandedSize); otherwise re-showing snaps to minimumSize. */
	_expandedSize(view, position, visible) {
		if (view.isCollapsed) return view.lastExpandedSize;
		const pending = this._pendingSizes.get(position);
		if (pending !== void 0) return pending;
		if (!visible) {
			var _this$_cachedVisibleS;
			return (_this$_cachedVisibleS = this._cachedVisibleSize(position)) !== null && _this$_cachedVisibleS !== void 0 ? _this$_cachedVisibleS : view.lastExpandedSize;
		}
		return this._slotSize(position);
	}
	/** The slot a hidden view had when it was last visible. */
	_cachedVisibleSize(position) {
		switch (position) {
			case "left": return this._leftIndex === void 0 ? void 0 : this._outerSplitview.getViewCachedVisibleSize(this._leftIndex);
			case "right": return this._rightIndex === void 0 ? void 0 : this._outerSplitview.getViewCachedVisibleSize(this._rightIndex);
			case "top":
			case "bottom": return this._middleColumn.getViewCachedVisibleSize(position);
		}
	}
	fromJSON(data) {
		for (const position of EDGE_POSITIONS) {
			var _state$collapsed;
			const state = data[position];
			const view = this._getView(position);
			if (!state || !view) continue;
			view.restoreExpandedSize(state.size);
			view.setCollapsed((_state$collapsed = state.collapsed) !== null && _state$collapsed !== void 0 ? _state$collapsed : false);
			if (state.collapsed) {
				this._pendingSizes.delete(position);
				this._resizeView(position, view.collapsedSize);
			} else this.resizeEdgeGroup(position, state.size);
			this.setEdgeGroupVisible(position, !!state.visible);
		}
	}
	dispose() {
		this._disposables.dispose();
		this._shellElement.remove();
	}
};

//#endregion
//#region src/dockview/dockviewComponent.ts
/**
* An error says the most about why, so it wins; a blocked window has none, and
* its usual cause is more useful than its name.
*/
function logFailedPopout(failure) {
	if (failure.error) console.error("dockview: failed to create popout.", failure.error);
	else if (failure.reason === "blocked") console.error("dockview: failed to create popout. perhaps you need to allow pop-ups for this website");
	else console.error(`dockview: failed to create popout (${failure.reason}).`);
}
function buildTabGroupColorPalette(options) {
	var _options$tabGroupColo;
	return new TabGroupColorPalette((_options$tabGroupColo = options.tabGroupColors) !== null && _options$tabGroupColo !== void 0 ? _options$tabGroupColo : DEFAULT_TAB_GROUP_COLORS, options.tabGroupAccent !== "off");
}
function moveGroupWithoutDestroying(options) {
	const activePanel = options.from.activePanel;
	[...options.from.panels].map((panel) => {
		const removedPanel = options.from.model.removePanel(panel);
		options.from.model.renderContainer.detatch(panel);
		return removedPanel;
	}).forEach((panel) => {
		options.to.model.openPanel(panel, {
			skipSetActive: activePanel !== panel,
			skipSetGroupActive: true
		});
	});
}
/** A never-firing event, the fallback the api returns when the backing module
*  is absent, so the api events are always valid and subscribable. */
const NO_EVENT = () => ({ dispose: () => {} });
/** A never-firing history-change event, the fallback `onDidChangeHistory`
*  returns when the LayoutHistory module is absent. */
const NO_LAYOUT_HISTORY_CHANGES = NO_EVENT;
/** How many live ids a custom `groupIdGenerator` may return before giving up. */
const MAX_GROUP_ID_ATTEMPTS = 100;
var DockviewComponent = class extends BaseGrid {
	fireDidCreateTabGroup(event) {
		this._onDidCreateTabGroup.fire(event);
	}
	fireDidDestroyTabGroup(event) {
		this._onDidDestroyTabGroup.fire(event);
	}
	fireDidAddPanelToTabGroup(event) {
		this._onDidAddPanelToTabGroup.fire(event);
	}
	fireDidRemovePanelFromTabGroup(event) {
		this._onDidRemovePanelFromTabGroup.fire(event);
	}
	fireDidTabGroupChange(event) {
		this._onDidTabGroupChange.fire(event);
	}
	fireDidTabGroupCollapsedChange(event) {
		this._onDidTabGroupCollapsedChange.fire(event);
	}
	get orientation() {
		return this.gridview.orientation;
	}
	get totalPanels() {
		return this.panels.length;
	}
	get panels() {
		return this.groups.flatMap((group) => group.panels);
	}
	/** `dndStrategy` resolved against this device; see `DockviewApi`. */
	get dndCapabilities() {
		return resolveDndCapabilities(this.options);
	}
	get options() {
		return this._options;
	}
	get tabGroupColorPalette() {
		return this._tabGroupColorPalette;
	}
	get activePanel() {
		const activeGroup = this.activeGroup;
		if (!activeGroup) return;
		return activeGroup.activePanel;
	}
	get renderer() {
		var _this$options$default;
		return (_this$options$default = this.options.defaultRenderer) !== null && _this$options$default !== void 0 ? _this$options$default : "onlyWhenVisible";
	}
	get defaultHeaderPosition() {
		var _this$options$default2;
		return (_this$options$default2 = this.options.defaultHeaderPosition) !== null && _this$options$default2 !== void 0 ? _this$options$default2 : "top";
	}
	get api() {
		return this._api;
	}
	get floatingGroups() {
		var _this$_moduleRegistry, _this$_moduleRegistry2;
		return (_this$_moduleRegistry = (_this$_moduleRegistry2 = this._moduleRegistry) === null || _this$_moduleRegistry2 === void 0 || (_this$_moduleRegistry2 = _this$_moduleRegistry2.services.floatingGroupService) === null || _this$_moduleRegistry2 === void 0 ? void 0 : _this$_moduleRegistry2.floatingGroups) !== null && _this$_moduleRegistry !== void 0 ? _this$_moduleRegistry : [];
	}
	/**
	* Resolve the floating window hosting `group`, matched by membership so it
	* finds nested (non-anchor) members too — a floating window can host a
	* whole nested gridview, not just its anchor group. Returns `undefined`
	* when the group isn't in any floating window. `floatingGroups` alone only
	* exposes each window's anchor, so consumers that must act on any member
	* (e.g. lifting an `always`-rendered panel's overlay above the window)
	* should use this instead of a `.find(f => f.group === group)`.
	*/
	getFloatingWindowForGroup(group) {
		var _this$_floatingGroupS;
		return (_this$_floatingGroupS = this._floatingGroupService) === null || _this$_floatingGroupS === void 0 ? void 0 : _this$_floatingGroupS.findByGroup(group);
	}
	/**
	* Boxes of the floating groups other than `exclude`, in coordinates
	* relative to the floating overlay container. Supplied to a
	* `transformFloatingGroupDrag` callback as `context.others` so it can
	* align the dragged float against its siblings.
	*/
	_gatherFloatingGroupBoxes(exclude) {
		return this.getFloatingGroupSnapshots(exclude).map((s) => s.box);
	}
	/**
	* ISmartGuidesHost: the positioning parent floats are placed in, also the
	* coordinate space the Smart Guides overlay draws its alignment lines in.
	*/
	getFloatingContainer() {
		var _this$_floatingOverla;
		return (_this$_floatingOverla = this._floatingOverlayHost) !== null && _this$_floatingOverla !== void 0 ? _this$_floatingOverla : this.gridview.element;
	}
	/** ISmartGuidesHost: the other floats' group identity + container-relative
	*  box, for the snap-together detector. */
	getFloatingGroupSnapshots(exclude) {
		const containerRect = this.getFloatingContainer().getBoundingClientRect();
		return this.floatingGroups.filter((floating) => floating.group !== exclude).map((floating) => {
			const rect = floating.overlay.element.getBoundingClientRect();
			return {
				group: floating.group,
				box: {
					left: rect.left - containerRect.left,
					top: rect.top - containerRect.top,
					width: rect.width,
					height: rect.height
				}
			};
		});
	}
	/** ISmartGuidesHost: dock/merge a dragged float into a target group via the
	*  existing move primitive (so events + undo cover it). */
	mergeFloatInto(dragged, target, position) {
		if (dragged === target || !this.getPanel(target.id)) return;
		this.moveGroupOrPanel({
			from: { groupId: dragged.id },
			to: {
				group: target,
				position
			}
		});
	}
	/** ISmartGuidesHost: the main grid's splitter (sash) rectangles, in the
	*  floating container's coordinate space, for the optional splitter target. */
	getGridSplitterRects() {
		const origin = this.getFloatingContainer().getBoundingClientRect();
		const result = [];
		this.gridview.element.querySelectorAll(".dv-sash").forEach((sash) => {
			const r = sash.getBoundingClientRect();
			result.push({
				left: r.left - origin.left,
				top: r.top - origin.top,
				width: r.width,
				height: r.height
			});
		});
		return result;
	}
	get _smartGuidesService() {
		return this._moduleRegistry.services.smartGuidesService;
	}
	/** Whether Smart Guides snapping is currently active. */
	get smartGuidesEnabled() {
		var _this$_smartGuidesSer, _this$_smartGuidesSer2;
		return (_this$_smartGuidesSer = (_this$_smartGuidesSer2 = this._smartGuidesService) === null || _this$_smartGuidesSer2 === void 0 ? void 0 : _this$_smartGuidesSer2.enabled) !== null && _this$_smartGuidesSer !== void 0 ? _this$_smartGuidesSer : false;
	}
	/** Toggle Smart Guides snapping at runtime (no-op if the module is absent). */
	setSmartGuidesEnabled(enabled) {
		var _assertModule;
		(_assertModule = assertModule(this._smartGuidesService, "SmartGuides", "api.setSmartGuidesEnabled")) === null || _assertModule === void 0 || _assertModule.setEnabled(enabled);
	}
	/** Merge a partial Smart Guides option override in at runtime. */
	updateSmartGuidesOptions(options) {
		var _assertModule2;
		(_assertModule2 = assertModule(this._smartGuidesService, "SmartGuides", "api.updateSmartGuidesOptions")) === null || _assertModule2 === void 0 || _assertModule2.updateOptions(options);
	}
	/** Fires when a dragged float commits an alignment snap on drop. */
	get onDidSnapFloat() {
		var _this$_smartGuidesSer3, _this$_smartGuidesSer4;
		return (_this$_smartGuidesSer3 = (_this$_smartGuidesSer4 = this._smartGuidesService) === null || _this$_smartGuidesSer4 === void 0 ? void 0 : _this$_smartGuidesSer4.onDidSnapFloat) !== null && _this$_smartGuidesSer3 !== void 0 ? _this$_smartGuidesSer3 : NO_EVENT;
	}
	/** Fires when a dragged float commits a dock/merge on drop. */
	get onDidSnapTogether() {
		var _this$_smartGuidesSer5, _this$_smartGuidesSer6;
		return (_this$_smartGuidesSer5 = (_this$_smartGuidesSer6 = this._smartGuidesService) === null || _this$_smartGuidesSer6 === void 0 ? void 0 : _this$_smartGuidesSer6.onDidSnapTogether) !== null && _this$_smartGuidesSer5 !== void 0 ? _this$_smartGuidesSer5 : NO_EVENT;
	}
	/**
	* Compose the float drag-position transform from the public
	* `transformFloatingGroupDrag` option and the optional Smart Guides module,
	* so an app and the module can both nudge a single drag rather than one
	* clobbering the other. Returns `undefined` only when the app option is
	* unset and the module is absent (the removability case); then no transform
	* is installed and the sibling-box snapshot is skipped, so the drag loop is
	* truly byte-for-byte unchanged. When the module is present but `smartGuides`
	* is unset it installs a cheap pass-through (the service snaps nothing and
	* early-returns), so observable drag behaviour is still unchanged.
	*/
	_buildFloatingDragTransform(anchorGroup, disableSmartGuides) {
		const publicTransform = this.options.transformFloatingGroupDrag;
		const useGuides = !disableSmartGuides;
		if (!publicTransform && !(useGuides && this._smartGuidesService)) return;
		return (context) => {
			var _this$_smartGuidesSer7, _ref;
			const appResult = publicTransform === null || publicTransform === void 0 ? void 0 : publicTransform({
				group: anchorGroup,
				proposed: context.proposed,
				container: context.container,
				others: context.others,
				modifiers: context.modifiers
			});
			const proposed = appResult ? _objectSpread2(_objectSpread2({}, context.proposed), appResult) : context.proposed;
			const snapped = useGuides ? (_this$_smartGuidesSer7 = this._smartGuidesService) === null || _this$_smartGuidesSer7 === void 0 ? void 0 : _this$_smartGuidesSer7.transformFloatingGroupDrag({
				group: anchorGroup,
				proposed,
				container: context.container,
				others: context.others,
				modifiers: context.modifiers
			}) : void 0;
			return (_ref = snapped !== null && snapped !== void 0 ? snapped : appResult) !== null && _ref !== void 0 ? _ref : void 0;
		};
	}
	get _floatingGroupService() {
		return this._moduleRegistry.services.floatingGroupService;
	}
	get _popoutWindowService() {
		return this._moduleRegistry.services.popoutWindowService;
	}
	get _watermarkService() {
		return this._moduleRegistry.services.watermarkService;
	}
	get _edgeGroupService() {
		return this._moduleRegistry.services.edgeGroupService;
	}
	get _rootDropTargetService() {
		return this._moduleRegistry.services.rootDropTargetService;
	}
	get _advancedDnDService() {
		return this._moduleRegistry.services.advancedDnDService;
	}
	get _dndCompassService() {
		return this._moduleRegistry.services.dndCompassService;
	}
	/** IDndCompassHost: whether a content drop at `position` on `group` is
	*  allowed, for compass cell gating (only legal cells are shown). The same
	*  predicate the content drop target uses, so the compass and the real drop
	*  agree. */
	canDropOnGroup(group, position, event) {
		return group.model.canDisplayContentOverlay(event, position);
	}
	/** IDndCompassHost: the frame the content drop target measures (mirrors the
	*  `getOverlayOutline` rule in `content.ts`): the whole group when
	*  `dndPanelOverlay === 'group'`, else just the content. The compass paints
	*  in this frame so its cells align with where a drop resolves. */
	getDropOverlayElement(group) {
		var _this$options$theme, _content$parentElemen;
		const content = group.element.querySelector(".dv-content-container");
		if (!content) return;
		return ((_this$options$theme = this.options.theme) === null || _this$options$theme === void 0 ? void 0 : _this$options$theme.dndPanelOverlay) === "group" ? (_content$parentElemen = content.parentElement) !== null && _content$parentElemen !== void 0 ? _content$parentElemen : content : content;
	}
	/** IMultiRowTabsHost: the group's scrollable tab list (`.dv-tabs-container`),
	*  the element the wrap controller toggles + measures. */
	getTabsListElement(group) {
		return group.model.header.hidden ? void 0 : group.model.tabsListElement;
	}
	/** IMultiRowTabsHost: re-run a group's layout so a wrapped-header height
	*  change propagates to the content + active panel. */
	relayoutGroup(group) {
		group.relayout();
	}
	/** IMultiRowTabsHost: force the wrap controller's surplus set (rows beyond
	*  `overflow.maxRows`) into the group's overflow dropdown. */
	setForcedOverflow(group, fn) {
		group.model.header.setForcedOverflow(fn);
	}
	/** IDndCompassHost: the layout root (`.dv-dockview`, a positioned element),
	*  the surface the outer-cell landing preview is drawn over. */
	getLayoutElement() {
		return this.gridview.element;
	}
	/**
	* The drop-position resolver installed on the group content drop targets:
	* the app's `dropPositionResolver` option if set, else the DnD compass
	* module's compass resolver (undefined when the compass is disabled). Read
	* live by the content drop targets; undefined ⇒ default cursor-quadrant.
	*/
	getDropPositionResolver() {
		var _this$_dndCompassServ;
		if (this.options.dropPositionResolver) return this.options.dropPositionResolver;
		const compass = (_this$_dndCompassServ = this._dndCompassService) === null || _this$_dndCompassServ === void 0 ? void 0 : _this$_dndCompassServ.resolver;
		const autoEdge = this._moduleRegistry.services.autoEdgeGroupService;
		if (compass && autoEdge) return { resolve: (args) => {
			var _autoEdge$resolveEdge;
			return (_autoEdge$resolveEdge = autoEdge.resolveEdge(args)) !== null && _autoEdge$resolveEdge !== void 0 ? _autoEdge$resolveEdge : compass.resolve(args);
		} };
		return compass !== null && compass !== void 0 ? compass : autoEdge === null || autoEdge === void 0 ? void 0 : autoEdge.resolver;
	}
	/**
	* Route a layout-edge drop target's events: its overlay raises the public
	* `kind: 'edge'` overlay event and its drop docks at the layout edge.
	*/
	wireEdgeDropTarget(target) {
		return [target.onWillShowOverlay((event) => {
			if (this.gridview.length > 0 && event.position === "center") return;
			this._onWillShowOverlay.fire(new DockviewWillShowOverlayLocationEvent(event, {
				kind: "edge",
				panel: void 0,
				api: this._api,
				group: void 0,
				getData: getPanelData
			}));
		}), target.onDrop((event) => this.dockToLayoutEdge(event.nativeEvent, event.position, event.edgeGroup))];
	}
	createEdgeDropTarget(element, position) {
		const options = {
			acceptedTargetZones: [position],
			canDisplayOverlay: () => {
				var _getPanelData;
				return ((_getPanelData = getPanelData()) === null || _getPanelData === void 0 ? void 0 : _getPanelData.viewId) === this.id;
			},
			getPositionResolver: () => ({ resolve: () => ({
				position,
				edge: true,
				edgeGroup: true
			}) })
		};
		const targets = [html5Backend.createDropTarget(element, options), pointerBackend.createDropTarget(element, options)];
		const disposables = new CompositeDisposable(...targets);
		for (const target of targets) disposables.addDisposables(...this.wireEdgeDropTarget(target));
		return disposables;
	}
	/**
	* Dock the dragged item against the whole-layout edge at `position` (the
	* orthogonalized root group), as the layout-edge drop zones do. Shared by
	* the root drop target and by an `edge`-flagged drop on a group content
	* target (a position resolver that marks an outer "dock to the layout edge"
	* cell). No-op when there is no active drag data. `edgeGroup` marks a drop
	* from an edge-group drop zone; it is passed on in the `onWillDrop` event.
	*/
	dockToLayoutEdge(nativeEvent, position, edgeGroup = false) {
		const willDropEvent = new DockviewWillDropEvent({
			nativeEvent,
			position,
			panel: void 0,
			api: this._api,
			group: void 0,
			getData: getPanelData,
			kind: "edge",
			edgeGroup
		});
		this._onWillDrop.fire(willDropEvent);
		if (willDropEvent.defaultPrevented) return;
		const data = getPanelData();
		if (data) {
			var _data$panelId;
			this.moveGroupOrPanel({
				from: {
					groupId: data.groupId,
					panelId: (_data$panelId = data.panelId) !== null && _data$panelId !== void 0 ? _data$panelId : void 0
				},
				to: {
					group: this.orthogonalize(position),
					position: "center"
				}
			});
		} else this._onDidDrop.fire(new DockviewDidDropEvent({
			nativeEvent,
			position,
			panel: void 0,
			api: this._api,
			group: void 0,
			getData: getPanelData
		}));
	}
	get headerActionsService() {
		return this._moduleRegistry.services.headerActionsService;
	}
	get _layoutHistoryService() {
		return this._moduleRegistry.services.layoutHistoryService;
	}
	/** Undo the previous recorded layout mutation (no-op if nothing to undo or
	*  the LayoutHistory module is absent). Requires `layoutHistory.enabled`. */
	undo() {
		var _assertModule3;
		(_assertModule3 = assertModule(this._layoutHistoryService, "LayoutHistory", "api.undo")) === null || _assertModule3 === void 0 || _assertModule3.undo();
	}
	/** Re-apply the next layout mutation (no-op if nothing to redo). */
	redo() {
		var _assertModule4;
		(_assertModule4 = assertModule(this._layoutHistoryService, "LayoutHistory", "api.redo")) === null || _assertModule4 === void 0 || _assertModule4.redo();
	}
	get canUndo() {
		var _this$_layoutHistoryS, _this$_layoutHistoryS2;
		return (_this$_layoutHistoryS = (_this$_layoutHistoryS2 = this._layoutHistoryService) === null || _this$_layoutHistoryS2 === void 0 ? void 0 : _this$_layoutHistoryS2.canUndo) !== null && _this$_layoutHistoryS !== void 0 ? _this$_layoutHistoryS : false;
	}
	get canRedo() {
		var _this$_layoutHistoryS3, _this$_layoutHistoryS4;
		return (_this$_layoutHistoryS3 = (_this$_layoutHistoryS4 = this._layoutHistoryService) === null || _this$_layoutHistoryS4 === void 0 ? void 0 : _this$_layoutHistoryS4.canRedo) !== null && _this$_layoutHistoryS3 !== void 0 ? _this$_layoutHistoryS3 : false;
	}
	/** Drop both undo and redo stacks. */
	clearHistory() {
		var _this$_layoutHistoryS5;
		(_this$_layoutHistoryS5 = this._layoutHistoryService) === null || _this$_layoutHistoryS5 === void 0 || _this$_layoutHistoryS5.clear();
	}
	get onDidChangeHistory() {
		var _this$_layoutHistoryS6, _this$_layoutHistoryS7;
		return (_this$_layoutHistoryS6 = (_this$_layoutHistoryS7 = this._layoutHistoryService) === null || _this$_layoutHistoryS7 === void 0 ? void 0 : _this$_layoutHistoryS7.onDidChangeHistory) !== null && _this$_layoutHistoryS6 !== void 0 ? _this$_layoutHistoryS6 : NO_LAYOUT_HISTORY_CHANGES;
	}
	/**
	* Whether the two-band edge drag-reveal affordance is registered. See
	* {@link IRootDropTargetHost.hasEdgeDragReveal}; must not be read during
	* module initialisation, only from `init`/postConstruct onwards.
	*/
	get hasEdgeDragReveal() {
		return !!this._moduleRegistry.services.autoEdgeGroupService;
	}
	isGridEmpty() {
		return this.gridview.length === 0;
	}
	rootDropTargetOverrideTarget() {
		var _this$rootDropTargetC;
		return (_this$rootDropTargetC = this.rootDropTargetContainer) === null || _this$rootDropTargetC === void 0 ? void 0 : _this$rootDropTargetC.model;
	}
	dispatchUnhandledDragOver(nativeEvent, position) {
		const event = new DockviewUnhandledDragOverEvent(nativeEvent, "edge", position, getPanelData);
		this._onUnhandledDragOver.fire(event);
		return event.isAccepted;
	}
	fireWillDragPanel(event) {
		this._onWillDragPanel.fire(event);
	}
	fireWillDragGroup(event) {
		this._onWillDragGroup.fire(event);
	}
	fireWillDrop(event) {
		this._onWillDrop.fire(event);
	}
	fireWillShowOverlay(event) {
		this._onWillShowOverlay.fire(event);
	}
	/**
	* Resolve the custom group drag ghost (via the AdvancedDnD module), or
	* `undefined` to fall back to the default chip. Returns `undefined` when
	* the module is absent, and the default ghost then renders.
	*/
	buildGroupDragGhost(group) {
		var _this$_advancedDnDSer;
		return (_this$_advancedDnDSer = this._advancedDnDService) === null || _this$_advancedDnDSer === void 0 ? void 0 : _this$_advancedDnDSer.buildGroupDragGhost(group);
	}
	/**
	* Resolve the app-supplied drop overlay model (via the AdvancedDnD module)
	* for a group drop target, or `undefined` to keep the target's default.
	*/
	resolveDropOverlayModel(location, group) {
		var _this$_advancedDnDSer2;
		return (_this$_advancedDnDSer2 = this._advancedDnDService) === null || _this$_advancedDnDSer2 === void 0 ? void 0 : _this$_advancedDnDSer2.resolveOverlayModel(location, group);
	}
	/** Outermost element: the shell (incl. edge groups) once built, else the gridview. */
	get rootElement() {
		var _this$_shellManager$e, _this$_shellManager;
		return (_this$_shellManager$e = (_this$_shellManager = this._shellManager) === null || _this$_shellManager === void 0 ? void 0 : _this$_shellManager.element) !== null && _this$_shellManager$e !== void 0 ? _this$_shellManager$e : this.element;
	}
	/**
	* Does this dock own `node`, in any of its windows? True when the node is
	* inside the main shell, or inside one of this component's popout documents.
	* A popout window hosts only this component's content, so whole-document
	* membership is sufficient there; the main document may hold sibling docks,
	* so it must be a containment check. A same-document popout (the jsdom mock)
	* is already covered by the main check and contributes nothing.
	*/
	ownsElement(node) {
		if (this.rootElement.contains(node)) return true;
		const mainDoc = this.rootElement.ownerDocument;
		const doc = node.ownerDocument;
		if (!doc || doc === mainDoc) return false;
		return this.getPopoutWindows().some((win) => win.document === doc);
	}
	/**
	* The next / previous group in gridview (spatial) order, wrapping round,
	* within the gridview that hosts `group` (the main grid, or its floating /
	* popout window). The keyboard accessibility module's navigation is built
	* on this primitive, the only piece that needs the grid internals.
	*/
	adjacentGroup(group, reverse) {
		const gridview = this.getGridviewForGroup(group);
		if (!gridview.element.contains(group.element)) return;
		const location = getGridLocation(group.element);
		const next = (reverse ? gridview.previous(location) : gridview.next(location)).view;
		if (gridview !== this.gridview && next === group) return;
		return next;
	}
	/**
	* The nearest grid group in a spatial direction from `group`, by
	* comparing group centre points. Floating and popout groups sit outside
	* the grid's geometry and are ignored. Returns `undefined` when there is
	* no group in that direction.
	*/
	adjacentGroupInDirection(group, direction) {
		if (group.api.location.type !== "grid") return;
		const from = group.element.getBoundingClientRect();
		const fromX = from.left + from.width / 2;
		const fromY = from.top + from.height / 2;
		let best;
		let bestDistance = Number.POSITIVE_INFINITY;
		for (const candidate of this.groups) {
			if (candidate === group || candidate.api.location.type !== "grid") continue;
			const rect = candidate.element.getBoundingClientRect();
			const dx = rect.left + rect.width / 2 - fromX;
			const dy = rect.top + rect.height / 2 - fromY;
			let inDirection;
			switch (direction) {
				case "left":
					inDirection = dx < 0 && Math.abs(dx) >= Math.abs(dy);
					break;
				case "right":
					inDirection = dx > 0 && Math.abs(dx) >= Math.abs(dy);
					break;
				case "up":
					inDirection = dy < 0 && Math.abs(dy) >= Math.abs(dx);
					break;
				default:
					inDirection = dy > 0 && Math.abs(dy) >= Math.abs(dx);
					break;
			}
			if (!inDirection) continue;
			const distance = dx * dx + dy * dy;
			if (distance < bestDistance) {
				bestDistance = distance;
				best = candidate;
			}
		}
		return best;
	}
	showDropPreview(group, position) {
		var _this$_advancedDnDSer3, _this$_advancedDnDSer4;
		return (_this$_advancedDnDSer3 = (_this$_advancedDnDSer4 = this._advancedDnDService) === null || _this$_advancedDnDSer4 === void 0 ? void 0 : _this$_advancedDnDSer4.showPreviewOverlay(group, position)) !== null && _this$_advancedDnDSer3 !== void 0 ? _this$_advancedDnDSer3 : Disposable.NONE;
	}
	announce(message) {
		var _this$_moduleRegistry3;
		(_this$_moduleRegistry3 = this._moduleRegistry.services.liveRegionService) === null || _this$_moduleRegistry3 === void 0 || _this$_moduleRegistry3.announce(message);
	}
	dockPanel(panel, group, position) {
		this.moveGroupOrPanel({
			from: {
				groupId: panel.group.id,
				panelId: panel.id
			},
			to: {
				group,
				position
			}
		});
	}
	floatPanel(panel) {
		this.addFloatingGroup(panel);
	}
	get contextMenuService() {
		return this._moduleRegistry.services.contextMenuService;
	}
	get pinnedTabsService() {
		return this._moduleRegistry.services.pinnedTabsService;
	}
	get advancedOverflowService() {
		return this._moduleRegistry.services.advancedOverflowService;
	}
	/**
	* Pin/unpin a panel's tab. The single gated entry point behind
	* `panel.api.setPinned`. Dormant unless `pinnedTabs.enabled` is set (a
	* silent no-op), and a silent no-op when the PinnedTabs module is not
	* registered: reaching past the `enabled` check means the option was set,
	* so the option rule has already named the missing module. When active it
	* mutates the panel's pinned flag (which fires
	* `panel.api.onDidChangePinned`) and the component-level
	* `onDidPanelPinnedChange`; the module reacts to enforce pinned-first
	* ordering.
	*/
	setPanelPinned(panel, pinned) {
		var _this$options$pinnedT;
		if (panel.isPinned === pinned) return;
		if (!((_this$options$pinnedT = this.options.pinnedTabs) === null || _this$options$pinnedT === void 0 ? void 0 : _this$options$pinnedT.enabled)) return;
		if (!this.pinnedTabsService) return;
		panel.setPinned(pinned);
		this._onDidPanelPinnedChange.fire({
			panel,
			isPinned: pinned
		});
	}
	get mountElement() {
		return this.gridview.element;
	}
	hasVisibleGridGroup() {
		return this.groups.some((group) => group.api.location.type === "grid" && group.api.isVisible);
	}
	/**
	* Whether `group` is the only group in the grid. Edge, floating and popout
	* groups live outside the grid: they are never the last group, nor count
	* toward it (`noPanelsOverlay: 'emptyGroup'` keeps the grid non-empty).
	*/
	isLastGridGroup(group) {
		if (group.api.location.type !== "grid") return false;
		return !this.groups.some((other) => other !== group && other.api.location.type === "grid");
	}
	/** Ping `onDidLayoutChange` (coalesced) with why the layout changed. */
	fireLayoutChange(reason) {
		this._bufferOnDidLayoutChange.fire(reason);
	}
	/**
	* Promise that resolves when all popout groups from the last fromJSON call are restored.
	* Useful for tests that need to wait for delayed popout creation.
	*/
	get popoutRestorationPromise() {
		var _this$_popoutWindowSe, _this$_popoutWindowSe2;
		return (_this$_popoutWindowSe = (_this$_popoutWindowSe2 = this._popoutWindowService) === null || _this$_popoutWindowSe2 === void 0 ? void 0 : _this$_popoutWindowSe2.restorationPromise) !== null && _this$_popoutWindowSe !== void 0 ? _this$_popoutWindowSe : Promise.resolve();
	}
	constructor(container, options) {
		var _options$proportional, _options$theme$gap, _options$theme, _options$theme$gap2, _options$theme2, _options$theme3;
		super(container, {
			proportionalLayout: (_options$proportional = options.proportionalLayout) !== null && _options$proportional !== void 0 ? _options$proportional : true,
			orientation: "HORIZONTAL",
			styles: options.hideBorders ? { separatorBorder: "transparent" } : void 0,
			disableAutoResizing: options.disableAutoResizing,
			locked: options.locked,
			margin: (_options$theme$gap = (_options$theme = options.theme) === null || _options$theme === void 0 ? void 0 : _options$theme.gap) !== null && _options$theme$gap !== void 0 ? _options$theme$gap : 0,
			className: options.className
		});
		this.nextGroupId = sequentialNumberGenerator();
		this._deserializer = new DefaultDockviewDeserialzier(this);
		this._moduleRegistry = new ModuleRegistry();
		this._onWillDragPanel = new Emitter();
		this.onWillDragPanel = this._onWillDragPanel.event;
		this._onWillDragGroup = new Emitter();
		this.onWillDragGroup = this._onWillDragGroup.event;
		this._onDidDrop = new Emitter();
		this.onDidDrop = this._onDidDrop.event;
		this._onWillDrop = new Emitter();
		this.onWillDrop = this._onWillDrop.event;
		this._mutationDepth = 0;
		this._syncMutationDepth = 0;
		this._pendingLocationChanges = /* @__PURE__ */ new Map();
		this._openingPopoutWindows = /* @__PURE__ */ new Set();
		this._origin = "user";
		this._originDepth = 0;
		this._onWillMutateLayout = new Emitter();
		this.onWillMutateLayout = this._onWillMutateLayout.event;
		this._onDidMutateLayout = new Emitter();
		this.onDidMutateLayout = this._onDidMutateLayout.event;
		this._onWillShowOverlay = new Emitter();
		this.onWillShowOverlay = this._onWillShowOverlay.event;
		this._onUnhandledDragOver = new Emitter();
		this.onUnhandledDragOver = this._onUnhandledDragOver.event;
		this._onDidRemovePanel = new Emitter();
		this.onDidRemovePanel = this._onDidRemovePanel.event;
		this._onDidAddPanel = new Emitter();
		this.onDidAddPanel = this._onDidAddPanel.event;
		this._onDidPopoutGroupSizeChange = new Emitter();
		this.onDidPopoutGroupSizeChange = this._onDidPopoutGroupSizeChange.event;
		this._onDidPopoutGroupPositionChange = new Emitter();
		this.onDidPopoutGroupPositionChange = this._onDidPopoutGroupPositionChange.event;
		this._onDidAddPopoutGroup = new Emitter();
		this.onDidAddPopoutGroup = this._onDidAddPopoutGroup.event;
		this._onDidRemovePopoutGroup = new Emitter();
		this.onDidRemovePopoutGroup = this._onDidRemovePopoutGroup.event;
		this._onDidChangePopouts = new Emitter();
		this.onDidChangePopouts = this._onDidChangePopouts.event;
		this._onDidOpenPopoutWindowFail = new Emitter();
		this.onDidOpenPopoutWindowFail = this._onDidOpenPopoutWindowFail.event;
		this._onWillClosePopoutWindow = new Emitter();
		this.onWillClosePopoutWindow = this._onWillClosePopoutWindow.event;
		this._onDidStartFloatingGroupDrag = new Emitter();
		this.onDidStartFloatingGroupDrag = this._onDidStartFloatingGroupDrag.event;
		this._onDidEndFloatingGroupDrag = new Emitter();
		this.onDidEndFloatingGroupDrag = this._onDidEndFloatingGroupDrag.event;
		this._onDidLayoutFromJSON = new Emitter();
		this.onDidLayoutFromJSON = this._onDidLayoutFromJSON.event;
		this._onDidActivePanelChange = new Emitter({ replay: true });
		this.onDidActivePanelChange = this._onDidActivePanelChange.event;
		this._onDidPanelPinnedChange = new Emitter();
		this.onDidPanelPinnedChange = this._onDidPanelPinnedChange.event;
		this._onDidMovePanel = new Emitter();
		this.onDidMovePanel = this._onDidMovePanel.event;
		this._onDidCreateTabGroup = new Emitter();
		this.onDidCreateTabGroup = this._onDidCreateTabGroup.event;
		this._onDidDestroyTabGroup = new Emitter();
		this.onDidDestroyTabGroup = this._onDidDestroyTabGroup.event;
		this._onDidAddPanelToTabGroup = new Emitter();
		this.onDidAddPanelToTabGroup = this._onDidAddPanelToTabGroup.event;
		this._onDidRemovePanelFromTabGroup = new Emitter();
		this.onDidRemovePanelFromTabGroup = this._onDidRemovePanelFromTabGroup.event;
		this._onDidTabGroupChange = new Emitter();
		this.onDidTabGroupChange = this._onDidTabGroupChange.event;
		this._onDidTabGroupCollapsedChange = new Emitter();
		this.onDidTabGroupCollapsedChange = this._onDidTabGroupCollapsedChange.event;
		this._onDidMaximizedGroupChange = new Emitter();
		this.onDidMaximizedGroupChange = this._onDidMaximizedGroupChange.event;
		this._inShellLayout = false;
		this._onDidRemoveGroup = new Emitter();
		this.onDidRemoveGroup = this._onDidRemoveGroup.event;
		this._onDidEdgeGroupAutoHideChange = new Emitter();
		this.onDidEdgeGroupAutoHideChange = this._onDidEdgeGroupAutoHideChange.event;
		this._onDidAddGroup = new Emitter();
		this.onDidAddGroup = this._onDidAddGroup.event;
		this._onDidOptionsChange = new Emitter();
		this.onDidOptionsChange = this._onDidOptionsChange.event;
		this._onDidActiveGroupChange = new Emitter();
		this.onDidActiveGroupChange = this._onDidActiveGroupChange.event;
		this._peekingGroups = /* @__PURE__ */ new Set();
		this._moving = false;
		this._options = options;
		this._tabGroupColorPalette = buildTabGroupColorPalette(options);
		const explicitModules = options.modules;
		const modules = explicitModules !== null && explicitModules !== void 0 ? explicitModules : [...AllModules, ...getRegisteredModules()];
		for (const module of modules) this._moduleRegistry.register(module);
		this._moduleRegistry.initialize(this);
		this.reportMissingOptionModules(options);
		const popoutWindowService = this._popoutWindowService;
		if (popoutWindowService) this.addDisposables(popoutWindowService.onDidRemove((entry) => {
			this._onDidRemovePopoutGroup.fire({
				id: entry.popoutGroup.id,
				group: entry.popoutGroup,
				window: entry.getWindow()
			});
		}));
		this.popupService = new PopupService(this.element);
		this.addDisposables(this.popupService, Disposable.from(() => {
			for (const opening of this._openingPopoutWindows) opening.dispose();
			this._openingPopoutWindows.clear();
		}));
		this._api = new DockviewApi(this);
		this.disableResizing = true;
		this.element.remove();
		this._shellManager = new ShellManager(container, this.element, (w, h) => this._layoutFromShell(w, h), (_options$theme$gap2 = (_options$theme2 = options.theme) === null || _options$theme2 === void 0 ? void 0 : _options$theme2.gap) !== null && _options$theme$gap2 !== void 0 ? _options$theme$gap2 : 0, (_options$theme3 = options.theme) === null || _options$theme3 === void 0 ? void 0 : _options$theme3.edgeGroupCollapsedSize);
		this._shellManager.locked = !!options.locked;
		this.popupService.updateRoot(this._shellManager.element);
		this._shellThemeClassnames = new Classnames(this._shellManager.element);
		this.rootDropTargetContainer = new DropTargetAnchorContainer(this._shellManager.element, { disabled: true });
		this.floatingDropTargetContainer = new DropTargetAnchorContainer(this._shellManager.element, { disabled: false });
		this.overlayRenderContainer = new OverlayRenderContainer(this._shellManager.element, this);
		this._floatingOverlayHost = document.createElement("div");
		this._floatingOverlayHost.className = "dv-floating-overlay-host";
		this._shellManager.element.appendChild(this._floatingOverlayHost);
		toggleClass(this.gridview.element, "dv-dockview", true);
		toggleClass(this.element, "dv-debug", !!options.debug);
		this.updateTheme();
		if (options.debug) this.addDisposables(new StrictEventsSequencing(this));
		this.addDisposables(Disposable.from(() => this._pendingLocationChanges.clear()), this.rootDropTargetContainer, this.floatingDropTargetContainer, addDisposableListener(this._shellManager.element, "dragend", () => {
			var _this$rootDropTargetC2, _this$floatingDropTar;
			(_this$rootDropTargetC2 = this.rootDropTargetContainer.model) === null || _this$rootDropTargetC2 === void 0 || _this$rootDropTargetC2.clear();
			(_this$floatingDropTar = this.floatingDropTargetContainer.model) === null || _this$floatingDropTar === void 0 || _this$floatingDropTar.clear();
		}, true), this.overlayRenderContainer, this._onWillDragPanel, this._onWillDragGroup, this._onWillShowOverlay, this._onDidActivePanelChange, this._onDidPanelPinnedChange, this._onDidAddPanel, this._onDidRemovePanel, this._onDidLayoutFromJSON, this._onDidDrop, this._onWillDrop, this._onWillMutateLayout, this._onDidMutateLayout, this._onDidMovePanel, this._onDidMovePanel.event(() => {
			/**
			* Update overlay positions after DOM layout completes to prevent 0×0 dimensions.
			* With defaultRenderer="always" this results in panel content not showing after move operations.
			* Debounced to avoid multiple calls when moving groups with multiple panels.
			*/
			this.debouncedUpdateAllPositions();
		}), this._onDidAddGroup, this._onDidRemoveGroup, this._onDidEdgeGroupAutoHideChange, this._onDidActiveGroupChange, this._onUnhandledDragOver, this._onDidMaximizedGroupChange, this._onDidPopoutGroupSizeChange, this._onDidPopoutGroupPositionChange, this._onDidAddPopoutGroup, this._onDidRemovePopoutGroup, this._onDidChangePopouts, this._onDidAddPopoutGroup.event(() => this._onDidChangePopouts.fire()), this._onDidRemovePopoutGroup.event(() => this._onDidChangePopouts.fire()), this._onDidOpenPopoutWindowFail, this._onDidStartFloatingGroupDrag, this._onDidEndFloatingGroupDrag, this._onDidCreateTabGroup, this._onDidDestroyTabGroup, this._onDidAddPanelToTabGroup, this._onDidRemovePanelFromTabGroup, this._onDidTabGroupChange, this._onDidTabGroupCollapsedChange, Event.any(this.onDidPopoutGroupSizeChange, this.onDidPopoutGroupPositionChange)(() => {
			this.fireLayoutChange("geometry");
		}), Event.any(this.onDidCreateTabGroup, this.onDidDestroyTabGroup, this.onDidAddPanelToTabGroup, this.onDidRemovePanelFromTabGroup, this.onDidTabGroupChange, this.onDidTabGroupCollapsedChange)(() => {
			this.fireLayoutChange("structure");
		}), this._onDidOptionsChange, this.onDidAdd((event) => {
			if (!this._moving) this._onDidAddGroup.fire(event);
		}), this.onDidRemove((event) => {
			if (!this._moving) this._onDidRemoveGroup.fire(event);
		}), this.onDidActiveChange((event) => {
			if (!this._moving) this._onDidActiveGroupChange.fire(event);
		}), this.onDidMaximizedChange((event) => {
			this._onDidMaximizedGroupChange.fire({
				group: event.panel,
				isMaximized: event.isMaximized
			});
		}), Event.any(this.onDidAddPanel, this.onDidRemovePanel, this.onDidAddGroup, this.onDidRemove, this.onDidRemoveGroup, this.onDidMovePanel)(() => {
			this._bufferOnDidLayoutChange.fire("structure");
		}), this.onDidActivePanelChange(() => {
			this._bufferOnDidLayoutChange.fire("activePanel");
		}), Disposable.from(() => {
			var _this$_shellManager2;
			this._moduleRegistry.dispose();
			(_this$_shellManager2 = this._shellManager) === null || _this$_shellManager2 === void 0 || _this$_shellManager2.dispose();
		}), this._onWillClosePopoutWindow);
		const rootDropTarget = this._rootDropTargetService;
		if (rootDropTarget) this.addDisposables(...this.wireEdgeDropTarget(rootDropTarget));
		this._moduleRegistry.postConstruct(this);
		this._shellManager.layoutFromElement();
	}
	setVisible(panel, visible) {
		switch (panel.api.location.type) {
			case "grid":
				super.setVisible(panel, visible);
				break;
			case "floating": {
				const item = this.floatingGroups.find((floatingGroup) => floatingGroup.group === panel);
				if (item) {
					item.overlay.setVisible(visible);
					panel.api._onDidVisibilityChange.fire({ isVisible: visible });
				}
				break;
			}
			case "popout":
				console.warn("dockview: You cannot hide a group that is in a popout window");
				break;
			case "edge": break;
		}
	}
	/**
	* Returns the {@link PopupService} that should host popovers (context
	* menus, tab overflow menus) for the given group. Popout groups have their
	* own service rooted in their popout window so the popover renders there
	* and dismisses on events from that window.
	*/
	getPopupServiceForGroup(group) {
		var _this$_popoutWindowSe3, _this$_popoutWindowSe4;
		return (_this$_popoutWindowSe3 = (_this$_popoutWindowSe4 = this._popoutWindowService) === null || _this$_popoutWindowSe4 === void 0 || (_this$_popoutWindowSe4 = _this$_popoutWindowSe4.findByGroup(group)) === null || _this$_popoutWindowSe4 === void 0 ? void 0 : _this$_popoutWindowSe4.popupService) !== null && _this$_popoutWindowSe3 !== void 0 ? _this$_popoutWindowSe3 : this.popupService;
	}
	addPopoutGroup(itemToPopout, options) {
		return this.mutationAsync("popout", () => this._doAddPopoutGroup(itemToPopout, options));
	}
	/** Enumerate the popout groups currently open in their own windows. */
	getPopouts() {
		var _this$_popoutWindowSe5, _this$_popoutWindowSe6;
		return (_this$_popoutWindowSe5 = (_this$_popoutWindowSe6 = this._popoutWindowService) === null || _this$_popoutWindowSe6 === void 0 ? void 0 : _this$_popoutWindowSe6.entries.map((entry) => ({
			id: entry.popoutGroup.id,
			group: entry.popoutGroup,
			window: entry.getWindow()
		}))) !== null && _this$_popoutWindowSe5 !== void 0 ? _this$_popoutWindowSe5 : [];
	}
	/** The live popout `Window` handles, one per open popout group. The
	*  narrow surface accessibility services need to mirror per-window state. */
	getPopoutWindows() {
		return this.getPopouts().map((popout) => popout.window);
	}
	_doAddPopoutGroup(itemToPopout, options) {
		var _options$overridePopo, _options$overridePopo2, _options$popoutUrl, _this$options, _this$options2;
		const service = assertModule(this._popoutWindowService, "PopoutWindow", "api.addPopoutGroup");
		if (!service) return Promise.resolve(false);
		if (itemToPopout instanceof DockviewGroupPanel && itemToPopout.model.location.type === "edge") return Promise.resolve(false);
		if (itemToPopout instanceof DockviewPanel && itemToPopout.group.size === 1 && this.closeEmptyGroups) return this.addPopoutGroup(itemToPopout.group, options);
		const theme = getDockviewTheme(this.gridview.element);
		const element = this.element;
		function getBox() {
			var _itemToPopout$group$e, _itemToPopout$group;
			if (options === null || options === void 0 ? void 0 : options.position) return options.position;
			const rect = (itemToPopout instanceof DockviewGroupPanel ? itemToPopout.element : (_itemToPopout$group$e = (_itemToPopout$group = itemToPopout.group) === null || _itemToPopout$group === void 0 ? void 0 : _itemToPopout$group.element) !== null && _itemToPopout$group$e !== void 0 ? _itemToPopout$group$e : element).getBoundingClientRect();
			return {
				left: window.screenX + rect.left,
				top: window.screenY + rect.top,
				width: rect.width,
				height: rect.height
			};
		}
		const box = getBox();
		const groupId = (_options$overridePopo = options === null || options === void 0 || (_options$overridePopo2 = options.overridePopoutGroup) === null || _options$overridePopo2 === void 0 ? void 0 : _options$overridePopo2.id) !== null && _options$overridePopo !== void 0 ? _options$overridePopo : this.getNextGroupId();
		const resolvedPopoutUrl = (_options$popoutUrl = options === null || options === void 0 ? void 0 : options.popoutUrl) !== null && _options$popoutUrl !== void 0 ? _options$popoutUrl : (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.popoutUrl;
		const popoutUrl = resolvedPopoutUrl !== null && resolvedPopoutUrl !== void 0 ? resolvedPopoutUrl : "/popout.html";
		const _window = new PopoutWindow(`${this.id}-${groupId}`, theme !== null && theme !== void 0 ? theme : "", {
			url: popoutUrl,
			left: box.left,
			top: box.top,
			width: box.width,
			height: box.height,
			onDidOpen: options === null || options === void 0 ? void 0 : options.onDidOpen,
			onWillClose: (event) => {
				var _options$onWillClose;
				options === null || options === void 0 || (_options$onWillClose = options.onWillClose) === null || _options$onWillClose === void 0 || _options$onWillClose.call(options, event);
				this._onWillClosePopoutWindow.fire(event);
			},
			nonce: (_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.nonce,
			styleRoot: () => this.element.getRootNode()
		});
		const popoutWindowDisposable = new CompositeDisposable(_window, _window.onDidClose(() => {
			popoutWindowDisposable.dispose();
		}));
		this._openingPopoutWindows.add(popoutWindowDisposable);
		const openError = getPopoutUrlError(popoutUrl);
		return (openError ? Promise.resolve(null) : _window.open()).then((popoutContainer) => {
			var _options$referenceGro, _options$overridePopo4;
			this._openingPopoutWindows.delete(popoutWindowDisposable);
			if (this.isDisposed) {
				popoutWindowDisposable.dispose();
				return false;
			}
			if (_window.isDisposed) {
				const failure = _window.failure;
				if (failure && !this.isDisposed) {
					logFailedPopout(failure);
					this._onDidOpenPopoutWindowFail.fire(failure);
				}
				return false;
			}
			const referenceGroup = (_options$referenceGro = options === null || options === void 0 ? void 0 : options.referenceGroup) !== null && _options$referenceGro !== void 0 ? _options$referenceGro : itemToPopout instanceof DockviewPanel ? itemToPopout.group : itemToPopout;
			const referenceLocation = itemToPopout.api.location.type;
			/**
			* The group that is being added doesn't already exist within the DOM, the most likely occurrence
			* of this case is when being called from the `fromJSON(...)` method
			*/
			const isGroupAddedToDom = referenceGroup.element.parentElement !== null;
			let group;
			if (options === null || options === void 0 ? void 0 : options.overridePopoutGridview) {
				var _options$overridePopo3;
				group = (_options$overridePopo3 = options.overridePopoutGroup) !== null && _options$overridePopo3 !== void 0 ? _options$overridePopo3 : referenceGroup;
			} else if (!isGroupAddedToDom) group = referenceGroup;
			else if (options === null || options === void 0 ? void 0 : options.overridePopoutGroup) group = options.overridePopoutGroup;
			else {
				group = this.createGroup({ id: groupId });
				if (popoutContainer) this._onDidAddGroup.fire(group);
			}
			if (popoutContainer === null) {
				var _window$failure;
				this.handleBlockedPopout({
					group,
					referenceGroup,
					options,
					popoutWindowDisposable,
					failure: openError ? {
						reason: "url-refused",
						error: openError
					} : (_window$failure = _window.failure) !== null && _window$failure !== void 0 ? _window$failure : { reason: "blocked" }
				});
				return false;
			}
			const gready = document.createElement("div");
			gready.className = "dv-overlay-render-container";
			const overlayRenderContainer = new OverlayRenderContainer(gready, this);
			group.model.renderContainer = overlayRenderContainer;
			const popoutGridview = (_options$overridePopo4 = options === null || options === void 0 ? void 0 : options.overridePopoutGridview) !== null && _options$overridePopo4 !== void 0 ? _options$overridePopo4 : this.createNestedGridview();
			if (options === null || options === void 0 ? void 0 : options.overridePopoutGridview) popoutGridview.locked = this.gridview.locked;
			else popoutGridview.addView(group, Sizing.Distribute, [0]);
			popoutGridview.element.style.width = "100%";
			popoutGridview.element.style.height = "100%";
			popoutGridview.layout(_window.window.innerWidth, _window.window.innerHeight);
			let popoutGridviewDisposed = false;
			const disposePopoutGridview = () => {
				if (!popoutGridviewDisposed) {
					popoutGridviewDisposed = true;
					popoutGridview.dispose();
				}
			};
			let floatingBox;
			/**
			* Popping out rehomes panels into `group`, so like the floating
			* case it owes the caller an `onDidMovePanel` per panel. The
			* events are deferred until the window is wired up so listeners
			* observe the panels' final `popout` location.
			*/
			let movedPanels = [];
			if (!(options === null || options === void 0 ? void 0 : options.overridePopoutGroup) && !(options === null || options === void 0 ? void 0 : options.overridePopoutGridview) && isGroupAddedToDom) if (itemToPopout instanceof DockviewPanel) {
				const sourceGroup = itemToPopout.group;
				this.movingLock(() => {
					const panel = referenceGroup.model.removePanel(itemToPopout);
					group.model.openPanel(panel);
				});
				movedPanels = [{
					panel: itemToPopout,
					from: sourceGroup
				}];
			} else {
				this.movingLock(() => moveGroupWithoutDestroying({
					from: referenceGroup,
					to: group
				}));
				movedPanels = group.panels.map((panel) => ({
					panel,
					from: referenceGroup
				}));
				switch (referenceLocation) {
					case "grid":
						referenceGroup.api.setVisible(false);
						break;
					case "floating":
					case "popout":
						var _this$floatingGroups$;
						floatingBox = (_this$floatingGroups$ = this.floatingGroups.find((value) => value.group.api.id === itemToPopout.api.id)) === null || _this$floatingGroups$ === void 0 ? void 0 : _this$floatingGroups$.overlay.toJSON();
						this.removeGroup(referenceGroup);
						break;
				}
			}
			popoutContainer.classList.add("dv-dockview");
			popoutContainer.style.overflow = "hidden";
			popoutContainer.appendChild(gready);
			popoutContainer.appendChild(popoutGridview.element);
			const anchor = document.createElement("div");
			const dropTargetContainer = new DropTargetAnchorContainer(anchor, { disabled: this.rootDropTargetContainer.disabled });
			popoutContainer.appendChild(anchor);
			group.model.dropTargetContainer = dropTargetContainer;
			const popoutPopupService = new PopupService(popoutContainer, _window.window);
			popoutWindowDisposable.addDisposables(popoutPopupService);
			group.model.location = {
				type: "popout",
				getWindow: () => _window.window,
				popoutUrl: resolvedPopoutUrl
			};
			if (options === null || options === void 0 ? void 0 : options.overridePopoutGridview) {
				const members = this.groups.filter((candidate) => popoutGridview.element.contains(candidate.element));
				for (const member of members) {
					member.model.renderContainer = overlayRenderContainer;
					member.model.dropTargetContainer = dropTargetContainer;
					member.model.location = {
						type: "popout",
						getWindow: () => _window.window,
						popoutUrl: resolvedPopoutUrl
					};
				}
			}
			if (isGroupAddedToDom && itemToPopout.api.location.type === "grid") itemToPopout.api.setVisible(false);
			this.doSetGroupAndPanelActive(group);
			const resizeObserverDisposable = service.observeGridviewSize(_window, popoutGridview, overlayRenderContainer);
			if (resizeObserverDisposable) popoutWindowDisposable.addDisposables(resizeObserverDisposable);
			const focusRoutingDisposable = new MutableDisposable();
			popoutWindowDisposable.addDisposables(focusRoutingDisposable);
			const bindFocusRouting = (anchor) => {
				focusRoutingDisposable.value = new CompositeDisposable(anchor.api.onDidActiveChange((event) => {
					if (event.isActive) {
						var _window$window;
						(_window$window = _window.window) === null || _window$window === void 0 || _window$window.focus();
					}
				}), anchor.api.onWillFocus(() => {
					var _window$window2;
					(_window$window2 = _window.window) === null || _window$window2 === void 0 || _window$window2.focus();
				}));
			};
			bindFocusRouting(group);
			const closeResult = {};
			const isValidReferenceGroup = isGroupAddedToDom && referenceGroup && this.getPanel(referenceGroup.id);
			const value = {
				window: _window,
				popoutGroup: group,
				gridview: popoutGridview,
				overlayRenderContainer,
				dropTargetContainer,
				getWindow: () => _window.window,
				popoutUrl: resolvedPopoutUrl,
				referenceGroup: isValidReferenceGroup ? referenceGroup.id : void 0,
				popupService: popoutPopupService,
				setAnchorGroup: (newAnchor) => {
					value.popoutGroup = newAnchor;
					bindFocusRouting(newAnchor);
				},
				disposable: { dispose: () => {
					popoutWindowDisposable.dispose();
					return closeResult.returnedGroup;
				} }
			};
			const _onDidWindowPositionChange = onDidWindowMoveEnd(_window.window);
			popoutWindowDisposable.addDisposables(_onDidWindowPositionChange, onDidWindowResizeEnd(_window.window, () => {
				this._onDidPopoutGroupSizeChange.fire({
					width: _window.window.innerWidth,
					height: _window.window.innerHeight,
					group: value.popoutGroup
				});
			}), _onDidWindowPositionChange.event(() => {
				this._onDidPopoutGroupPositionChange.fire({
					screenX: _window.window.screenX,
					screenY: _window.window.screenY,
					group: value.popoutGroup
				});
			}), addDisposableListener(_window.window, "resize", () => {
				popoutGridview.layout(_window.window.innerWidth, _window.window.innerHeight);
			}), overlayRenderContainer, Disposable.from(() => this.disposePopoutWindow({
				group,
				referenceGroup,
				popoutGridview,
				isGroupAddedToDom,
				floatingBox,
				disposePopoutGridview,
				closeResult
			})));
			service.add(value);
			this._onDidAddPopoutGroup.fire({
				id: value.popoutGroup.id,
				group: value.popoutGroup,
				window: value.getWindow()
			});
			for (const { panel, from } of movedPanels) this.fireDidMovePanel(panel, from);
			return true;
		}).catch((err) => {
			this._openingPopoutWindows.delete(popoutWindowDisposable);
			console.error("dockview: failed to create popout.", err);
			return false;
		});
	}
	/**
	* The popout window never opened - blocked by the browser's popup blocker
	* (common when restoring popouts on load), or refused outright because its
	* URL failed the same-origin guard. Fall back gracefully so the group(s)
	* end up valid and visible in the main grid rather than as orphans that
	* render nothing and later crash clear()/remove().
	*/
	handleBlockedPopout(params) {
		const { group, referenceGroup, options, popoutWindowDisposable, failure } = params;
		logFailedPopout(failure);
		popoutWindowDisposable.dispose();
		this._onDidOpenPopoutWindowFail.fire(failure);
		if (options === null || options === void 0 ? void 0 : options.overridePopoutGridview) {
			const blockedGridview = options.overridePopoutGridview;
			const members = this.groups.filter((candidate) => blockedGridview.element.contains(candidate.element));
			for (const member of members) this.movingLock(() => {
				blockedGridview.remove(member);
				this.redockGroupToMainGrid(member);
			});
			blockedGridview.dispose();
			if (referenceGroup && !referenceGroup.api.isVisible) referenceGroup.api.setVisible(true);
			return;
		}
		if (group === referenceGroup) {
			if (!this.gridview.element.contains(group.element)) {
				this.movingLock(() => this.doAddGroup(group, [0]));
				group.model.location = { type: "grid" };
			}
		} else {
			this.movingLock(() => moveGroupWithoutDestroying({
				from: group,
				to: referenceGroup
			}));
			if (group.model.size === 0 && this._groups.has(group.id)) {
				group.dispose();
				this._groups.delete(group.id);
				this._onDidRemoveGroup.fire(group);
			}
		}
		if (!referenceGroup.api.isVisible) referenceGroup.api.setVisible(true);
	}
	/**
	* Wire a group that has been displaced from a floating / popout window back
	* to the main grid's render & drop-target containers and dock it at the
	* root. The caller is responsible for first detaching it from its old
	* gridview; the detach strategy differs between the window-teardown path
	* (`doRemoveGroup`) and the blocked-window path (`gridview.remove`).
	*/
	redockGroupToMainGrid(group) {
		group.model.renderContainer = this.overlayRenderContainer;
		group.model.dropTargetContainer = this.rootDropTargetContainer;
		group.model.location = { type: "grid" };
		this.doAddGroup(group, [0]);
	}
	/**
	* Teardown for a popout window's `popoutWindowDisposable`. Runs when the
	* window closes (by user, by `removeGroup` / `moveGroup`, or by component
	* disposal). On a genuine close it relocates every member group back to
	* the main grid (or to a floating window when the anchor came from one),
	* then disposes the nested gridview. On an explicit removal it only hands
	* the anchor back and disposes the nested gridview: the remover places the
	* group itself. `closeResult.returnedGroup` is read by the entry's
	* `dispose()` contract.
	*/
	disposePopoutWindow(params) {
		var _this$_popoutWindowSe7;
		const { group, referenceGroup, popoutGridview, isGroupAddedToDom, floatingBox, disposePopoutGridview, closeResult } = params;
		if (this.isDisposed) {
			disposePopoutGridview();
			return;
		}
		const genuineClose = !!((_this$_popoutWindowSe7 = this._popoutWindowService) === null || _this$_popoutWindowSe7 === void 0 ? void 0 : _this$_popoutWindowSe7.entries.find((entry) => entry.gridview === popoutGridview));
		const members = this.groups.filter((candidate) => popoutGridview.element.contains(candidate.element));
		const anchorPresent = members.includes(group);
		const anchorIsSoleMember = anchorPresent && members.length === 1;
		if (!genuineClose) {
			if (anchorPresent && this.getPanel(group.id)) {
				group.model.renderContainer = this.overlayRenderContainer;
				group.model.dropTargetContainer = this.rootDropTargetContainer;
				closeResult.returnedGroup = group;
			}
			disposePopoutGridview();
			return;
		}
		/**
		* Popping a group out fires `onDidMovePanel` per panel, so closing the
		* window owes the caller the same: every panel in it is rehomed, into
		* the reference group the popout left behind or into a fresh grid slot.
		* `movingLock` suppresses onDidAddPanel / onDidRemovePanel on these
		* paths, so `onDidMovePanel` is the only event that can carry it. The
		* events are deferred to the end so listeners observe the panels at
		* their final group and location.
		*/
		const movedPanels = [];
		for (const member of members) {
			if (member === group) continue;
			this.movingLock(() => {
				this.doRemoveGroup(member, {
					skipDispose: true,
					skipActive: true,
					skipPopoutReturn: true
				});
				this.redockGroupToMainGrid(member);
			});
			for (const panel of member.panels) movedPanels.push({
				panel,
				from: member
			});
		}
		if (anchorPresent && isGroupAddedToDom && this.getPanel(referenceGroup.id)) {
			const rehomed = [...group.panels];
			this.movingLock(() => moveGroupWithoutDestroying({
				from: group,
				to: referenceGroup
			}));
			for (const panel of rehomed) movedPanels.push({
				panel,
				from: group
			});
			if (!referenceGroup.api.isVisible) referenceGroup.api.setVisible(true);
			if (this.getPanel(group.id)) this.doRemoveGroup(group, { skipPopoutAssociated: true });
		} else if (anchorPresent && this.getPanel(group.id)) {
			group.model.renderContainer = this.overlayRenderContainer;
			group.model.dropTargetContainer = this.rootDropTargetContainer;
			closeResult.returnedGroup = group;
			if (floatingBox && anchorIsSoleMember) this.addFloatingGroup(group, {
				height: floatingBox.height,
				width: floatingBox.width,
				position: floatingBox
			});
			else {
				this.doRemoveGroup(group, {
					skipDispose: true,
					skipActive: true,
					skipPopoutReturn: true
				});
				group.model.location = { type: "grid" };
				this.movingLock(() => {
					this.doAddGroup(group, [0]);
				});
				for (const panel of group.panels) movedPanels.push({
					panel,
					from: group
				});
			}
			this.doSetGroupAndPanelActive(group);
		}
		disposePopoutGridview();
		for (const { panel, from } of movedPanels) this.fireDidMovePanel(panel, from);
	}
	addFloatingGroup(item, options) {
		this.mutation("float", () => this._doAddFloatingGroup(item, options));
	}
	_doAddFloatingGroup(item, options) {
		if (!assertModule(this._floatingGroupService, "FloatingGroup", "api.addFloatingGroup")) return;
		if (item instanceof DockviewGroupPanel && item.model.location.type === "edge") return;
		let group;
		/**
		* Floating relocates panels exactly like a drop onto the grid does, so
		* it owes the caller an `onDidMovePanel` per panel. The events are
		* deferred until the window is mounted below: only then do the panels
		* report their final `floating` location.
		*/
		let movedPanels = [];
		if (item instanceof DockviewPanel) {
			const sourceGroup = item.group;
			group = this.createGroup();
			this._onDidAddGroup.fire(group);
			this.movingLock(() => this.removePanel(item, {
				removeEmptyGroup: false,
				skipDispose: true,
				skipSetActiveGroup: true
			}));
			this.removeGroupIfEmpty(sourceGroup);
			this.movingLock(() => group.model.openPanel(item, { skipSetGroupActive: true }));
			movedPanels = [{
				panel: item,
				from: sourceGroup
			}];
		} else {
			var _this$_popoutWindowSe8;
			group = item;
			const popoutReferenceGroupId = (_this$_popoutWindowSe8 = this._popoutWindowService) === null || _this$_popoutWindowSe8 === void 0 ? void 0 : _this$_popoutWindowSe8.findReferenceGroupId(group);
			const popoutReferenceGroup = popoutReferenceGroupId ? this.getPanel(popoutReferenceGroupId) : void 0;
			if (!(typeof (options === null || options === void 0 ? void 0 : options.skipRemoveGroup) === "boolean" && options.skipRemoveGroup)) if (popoutReferenceGroup) {
				this.movingLock(() => moveGroupWithoutDestroying({
					from: item,
					to: popoutReferenceGroup
				}));
				this.doRemoveGroup(item, {
					skipPopoutReturn: true,
					skipPopoutAssociated: true
				});
				this.doRemoveGroup(popoutReferenceGroup, { skipDispose: true });
				group = popoutReferenceGroup;
				movedPanels = group.panels.map((panel) => ({
					panel,
					from: item
				}));
			} else {
				this.doRemoveGroup(item, {
					skipDispose: true,
					skipPopoutReturn: true,
					skipPopoutAssociated: false
				});
				movedPanels = group.panels.map((panel) => ({
					panel,
					from: group
				}));
			}
		}
		function getAnchoredBox() {
			if (options === null || options === void 0 ? void 0 : options.position) {
				const result = {};
				if ("left" in options.position) result.left = options.position.left;
				else if ("right" in options.position) result.right = options.position.right;
				else result.left = DEFAULT_FLOATING_GROUP_POSITION.left;
				if ("top" in options.position) result.top = options.position.top;
				else if ("bottom" in options.position) result.bottom = options.position.bottom;
				else result.top = DEFAULT_FLOATING_GROUP_POSITION.top;
				if (typeof options.width === "number") result.width = Math.max(options.width, 0);
				else result.width = DEFAULT_FLOATING_GROUP_POSITION.width;
				if (typeof options.height === "number") result.height = Math.max(options.height, 0);
				else result.height = DEFAULT_FLOATING_GROUP_POSITION.height;
				return result;
			}
			return {
				left: typeof (options === null || options === void 0 ? void 0 : options.x) === "number" ? Math.max(options.x, 0) : DEFAULT_FLOATING_GROUP_POSITION.left,
				top: typeof (options === null || options === void 0 ? void 0 : options.y) === "number" ? Math.max(options.y, 0) : DEFAULT_FLOATING_GROUP_POSITION.top,
				width: typeof (options === null || options === void 0 ? void 0 : options.width) === "number" ? Math.max(options.width, 0) : DEFAULT_FLOATING_GROUP_POSITION.width,
				height: typeof (options === null || options === void 0 ? void 0 : options.height) === "number" ? Math.max(options.height, 0) : DEFAULT_FLOATING_GROUP_POSITION.height
			};
		}
		const anchoredBox = getAnchoredBox();
		const floatingGridview = this.createNestedGridview();
		floatingGridview.addView(group, Sizing.Distribute, [0]);
		this.mountFloatingWindow(floatingGridview, group, [group], anchoredBox, {
			dragHandle: options === null || options === void 0 ? void 0 : options.dragHandle,
			inDragMode: options === null || options === void 0 ? void 0 : options.inDragMode,
			skipActiveGroup: options === null || options === void 0 ? void 0 : options.skipActiveGroup,
			disableSmartGuides: options === null || options === void 0 ? void 0 : options.disableSmartGuides
		});
		for (const { panel, from } of movedPanels) this.fireDidMovePanel(panel, from);
	}
	/** The `closeEmptyGroups` option: remove a group once it empties. */
	get closeEmptyGroups() {
		return this.options.closeEmptyGroups !== false;
	}
	/** Whether a move leaves its emptied source group in place. */
	keepEmptyGroups(options) {
		var _options$keepEmptyGro;
		return (_options$keepEmptyGro = options.keepEmptyGroups) !== null && _options$keepEmptyGro !== void 0 ? _options$keepEmptyGro : !this.closeEmptyGroups;
	}
	removeGroupIfEmpty(group) {
		if (group.model.size === 0 && this.closeEmptyGroups) this.doRemoveGroup(group, { skipActive: true });
	}
	/**
	* Locks the main grid, the shell whose splitviews host the edge groups,
	* and the nested gridviews of floating and popout windows. The base
	* setter stops at the main grid; `updateOptions` reaches this override.
	*/
	get locked() {
		return this.gridview.locked;
	}
	set locked(value) {
		this.gridview.locked = value;
		if (this._shellManager) this._shellManager.locked = value;
		for (const gridview of this.nestedGridviews()) gridview.locked = value;
	}
	/** The gridviews hosted by open floating and popout windows. */
	nestedGridviews() {
		var _this$_popoutWindowSe9, _this$_popoutWindowSe10;
		return [...this.floatingGroups.map((floating) => floating.gridview), ...((_this$_popoutWindowSe9 = (_this$_popoutWindowSe10 = this._popoutWindowService) === null || _this$_popoutWindowSe10 === void 0 ? void 0 : _this$_popoutWindowSe10.entries) !== null && _this$_popoutWindowSe9 !== void 0 ? _this$_popoutWindowSe9 : []).map((entry) => entry.gridview)];
	}
	/**
	* Build an empty gridview configured to match the main grid's styling and
	* resize behaviour, for hosting a nested layout inside a floating or popout
	* window.
	*/
	createNestedGridview(orientation = "HORIZONTAL") {
		var _this$options$theme$g, _this$options$theme2;
		return new Gridview(this.gridview.proportionalLayout, this.options.hideBorders ? { separatorBorder: "transparent" } : void 0, orientation, this.gridview.locked, (_this$options$theme$g = (_this$options$theme2 = this.options.theme) === null || _this$options$theme2 === void 0 ? void 0 : _this$options$theme2.gap) !== null && _this$options$theme$g !== void 0 ? _this$options$theme$g : 0);
	}
	/**
	* Wrap a (populated) floating gridview in an overlay window: title bar /
	* move handle, drag wiring, the floating-group service entry and the
	* `floating` location tag for every member group.
	*/
	mountFloatingWindow(floatingGridview, anchorGroup, members, anchoredBox, options) {
		var _ref2, _options$dragHandle, _this$_floatingOverla2, _this$options$floatin, _this$options$floatin2, _this$options$floatin3, _this$options$floatin4, _options$disableSmart, _titleBar$element;
		const service = assertModule(this._floatingGroupService, "FloatingGroup", "api.addFloatingGroup");
		if (!service) return;
		const titleBar = ((_ref2 = (_options$dragHandle = options === null || options === void 0 ? void 0 : options.dragHandle) !== null && _options$dragHandle !== void 0 ? _options$dragHandle : this.options.floatingGroupDragHandle) !== null && _ref2 !== void 0 ? _ref2 : "titlebar") === "titlebar" ? new FloatingTitleBar(this, anchorGroup) : void 0;
		const overlay = new Overlay(_objectSpread2(_objectSpread2({
			container: (_this$_floatingOverla2 = this._floatingOverlayHost) !== null && _this$_floatingOverla2 !== void 0 ? _this$_floatingOverla2 : this.gridview.element,
			content: floatingGridview.element,
			header: titleBar === null || titleBar === void 0 ? void 0 : titleBar.element
		}, anchoredBox), {}, {
			minimumInViewportWidth: this.options.floatingGroupBounds === "boundedWithinViewport" ? void 0 : (_this$options$floatin = (_this$options$floatin2 = this.options.floatingGroupBounds) === null || _this$options$floatin2 === void 0 ? void 0 : _this$options$floatin2.minimumWidthWithinViewport) !== null && _this$options$floatin !== void 0 ? _this$options$floatin : 100,
			minimumInViewportHeight: this.options.floatingGroupBounds === "boundedWithinViewport" ? void 0 : (_this$options$floatin3 = (_this$options$floatin4 = this.options.floatingGroupBounds) === null || _this$options$floatin4 === void 0 ? void 0 : _this$options$floatin4.minimumHeightWithinViewport) !== null && _this$options$floatin3 !== void 0 ? _this$options$floatin3 : 100,
			transformDragPosition: this._buildFloatingDragTransform(anchorGroup, (_options$disableSmart = options === null || options === void 0 ? void 0 : options.disableSmartGuides) !== null && _options$disableSmart !== void 0 ? _options$disableSmart : false),
			getSiblingBoxes: () => this._gatherFloatingGroupBoxes(anchorGroup)
		}));
		const dragHandle = (_titleBar$element = titleBar === null || titleBar === void 0 ? void 0 : titleBar.element) !== null && _titleBar$element !== void 0 ? _titleBar$element : anchorGroup.element.querySelector(".dv-void-container");
		if (!dragHandle) throw new Error("dockview: failed to find drag handle");
		overlay.setupDrag(dragHandle, { inDragMode: typeof (options === null || options === void 0 ? void 0 : options.inDragMode) === "boolean" ? options.inDragMode : false });
		const floatingGroupPanel = service.add(anchorGroup, overlay, floatingGridview);
		floatingGroupPanel.addDisposables(overlay.onDidStartMoving(() => this._onDidStartFloatingGroupDrag.fire(anchorGroup)), overlay.onDidChangeEnd(() => this._onDidEndFloatingGroupDrag.fire(anchorGroup)));
		if (titleBar) {
			floatingGroupPanel.setTitleBar(titleBar);
			floatingGroupPanel.addDisposables(titleBar, Disposable.from(() => floatingGroupPanel.setTitleBar(void 0)), titleBar.onDragStart((event) => {
				this._onWillDragGroup.fire({
					nativeEvent: event,
					group: floatingGroupPanel.group
				});
			}));
		}
		for (const member of members) member.model.location = { type: "floating" };
		if (!(options === null || options === void 0 ? void 0 : options.skipActiveGroup)) this.doSetGroupAndPanelActive(anchorGroup);
	}
	orthogonalize(position, options) {
		this.gridview.normalize();
		switch (position) {
			case "top":
			case "bottom":
				if (this.gridview.orientation === "HORIZONTAL") this.gridview.insertOrthogonalSplitviewAtRoot();
				break;
			case "left":
			case "right":
				if (this.gridview.orientation === "VERTICAL") this.gridview.insertOrthogonalSplitviewAtRoot();
				break;
			default: break;
		}
		switch (position) {
			case "top":
			case "left":
			case "center": return this.createGroupAtLocation([0], void 0, options);
			case "bottom":
			case "right": return this.createGroupAtLocation([this.gridview.length], void 0, options);
			default: throw new Error(`dockview: unsupported position ${position}`);
		}
	}
	updateOptions(options) {
		var _this$_floatingGroupS2, _this$_rootDropTarget;
		super.updateOptions(options);
		this.reportMissingOptionModules(options);
		(_this$_floatingGroupS2 = this._floatingGroupService) === null || _this$_floatingGroupS2 === void 0 || _this$_floatingGroupS2.updateBounds(options);
		(_this$_rootDropTarget = this._rootDropTargetService) === null || _this$_rootDropTarget === void 0 || _this$_rootDropTarget.setOptions(options);
		const oldDisableDnd = this.options.disableDnd;
		const oldDndStrategy = this.options.dndStrategy;
		this._options = _objectSpread2(_objectSpread2({}, this.options), options);
		const newDisableDnd = this.options.disableDnd;
		const newDndStrategy = this.options.dndStrategy;
		if (oldDisableDnd !== newDisableDnd || oldDndStrategy !== newDndStrategy) this.updateDragAndDropState();
		if ("proportionalLayout" in options) {
			const proportionalLayout = this.gridview.proportionalLayout;
			for (const gridview of this.nestedGridviews()) gridview.proportionalLayout = proportionalLayout;
		}
		if ("theme" in options) this.updateTheme();
		if ("createRightHeaderActionComponent" in options || "createLeftHeaderActionComponent" in options || "createPrefixHeaderActionComponent" in options) {
			var _this$headerActionsSe;
			(_this$headerActionsSe = this.headerActionsService) === null || _this$headerActionsSe === void 0 || _this$headerActionsSe.refreshAll();
		}
		if ("createWatermarkComponent" in options) {
			var _this$_watermarkServi;
			(_this$_watermarkServi = this._watermarkService) === null || _this$_watermarkServi === void 0 || _this$_watermarkServi.refresh();
			for (const group of this.groups) group.model.refreshWatermark();
		}
		if ("tabGroupColors" in options || "tabGroupAccent" in options) {
			var _this$_options$tabGro;
			this._tabGroupColorPalette.setEntries((_this$_options$tabGro = this._options.tabGroupColors) !== null && _this$_options$tabGro !== void 0 ? _this$_options$tabGro : DEFAULT_TAB_GROUP_COLORS);
			this._tabGroupColorPalette.enabled = this._options.tabGroupAccent !== "off";
			for (const group of this.groups) group.model.refreshTabGroupAccent();
		}
		this._onDidOptionsChange.fire();
		this._layoutFromShell(this.gridview.width, this.gridview.height);
	}
	/**
	* Report any option the caller set whose module isn't registered. Logs
	* once per module+reason; never throws, matching the module system's
	* degrade-to-no-op contract.
	*/
	reportMissingOptionModules(options) {
		validateOptionModules(options, (moduleName) => this._moduleRegistry.has(moduleName));
	}
	layout(width, height, forceResize) {
		var _this$_moduleRegistry4;
		if (this._shellManager && !this._inShellLayout) this._shellManager.layout(width, height);
		else super.layout(width, height, forceResize);
		this._syncFloatingOverlayHost();
		(_this$_moduleRegistry4 = this._moduleRegistry) === null || _this$_moduleRegistry4 === void 0 || (_this$_moduleRegistry4 = _this$_moduleRegistry4.services.floatingGroupService) === null || _this$_moduleRegistry4 === void 0 || _this$_moduleRegistry4.constrainBounds();
	}
	_syncFloatingOverlayHost() {
		if (!this._floatingOverlayHost || !this._shellManager) return;
		const shellRect = this._shellManager.element.getBoundingClientRect();
		const gridRect = this.element.getBoundingClientRect();
		const host = this._floatingOverlayHost;
		host.style.left = `${gridRect.left - shellRect.left}px`;
		host.style.top = `${gridRect.top - shellRect.top}px`;
		host.style.width = `${gridRect.width}px`;
		host.style.height = `${gridRect.height}px`;
	}
	_layoutFromShell(width, height) {
		this._inShellLayout = true;
		this.layout(width, height, true);
		this._inShellLayout = false;
	}
	forceRelayout() {
		if (this._shellManager) this._layoutFromShell(this.width, this.height);
		else super.forceRelayout();
	}
	addEdgeGroup(position, options) {
		const service = this._edgeGroupService;
		if (!service) throw new Error(missingModuleMessage("EdgeGroup", "api.addEdgeGroup"));
		if (service.has(position)) throw new Error(`dockview: edge group already exists at position '${position}'`);
		return this.mutation("add", () => {
			const group = this.createGroup({ id: options.id });
			group.model.location = {
				type: "edge",
				position
			};
			group.model.headerPosition = position;
			const resizeDisposable = group.onDidChange((event) => {
				var _this$_shellManager3;
				if (!event) return;
				const size = isHorizontal(position) ? event.width : event.height;
				if (typeof size !== "number") return;
				(_this$_shellManager3 = this._shellManager) === null || _this$_shellManager3 === void 0 || _this$_shellManager3.resizeEdgeGroup(position, size);
			});
			const autoCollapseDisposable = group.model.onDidRemovePanel(() => {
				if (!group.model.isEmpty) return;
				if (service.isAutoReveal(group)) queueMicrotask(() => {
					var _this$_edgeGroupServi;
					if (group.model.isEmpty && ((_this$_edgeGroupServi = this._edgeGroupService) === null || _this$_edgeGroupServi === void 0 ? void 0 : _this$_edgeGroupServi.includes(group))) this.removeEdgeGroup(position);
				});
				else this.setEdgeGroupCollapsed(group, true);
			});
			service.add(position, group, new CompositeDisposable(autoCollapseDisposable, resizeDisposable));
			if (options.autoHide !== void 0) service.setAutoHide(group, options.autoHide);
			if (options.autoReveal !== void 0) service.setAutoReveal(group, options.autoReveal);
			this._onDidAddGroup.fire(group);
			const host = {
				element: group.element,
				get headerPosition() {
					return group.model.headerPosition;
				},
				layout: (width, height) => group.layout(width, height)
			};
			this._shellManager.addEdgeView(position, options, host);
			return group.api;
		});
	}
	/**
	* Reveal (create-or-fill) the edge group at `position` and move the dragged
	* item described by `data` into it. A newly created edge group is created
	* collapsed, flagged `autoReveal` so it tears down to zero footprint when
	* later emptied, and takes its auto-hide state from `options.autoHide`. If an
	* edge group already exists there it is reused: the panel is added to its
	* tabs and its collapsed/toggled *and auto-hide* state are left as-is (never
	* re-created; `addEdgeGroup` throws on a duplicate position). This keeps a
	* drag-reveal from silently converting a static edge group into an
	* auto-hiding one; to change an existing group's auto-hide, call
	* `api.getEdgeGroup(position)?.setAutoHide(...)` directly. No-op if the
	* EdgeGroup module is absent.
	*
	* This is the primitive behind the dock-to-edge groups: the two-band
	* drag-reveal affordance routes its outer-band drops here.
	*/
	revealEdgeGroupWithData(position, data, options) {
		const service = this._edgeGroupService;
		if (!service) return;
		this.mutation("add", () => {
			var _data$panelId2;
			let group = service.get(position);
			if (!group) {
				this.addEdgeGroup(position, {
					id: this.getNextGroupId(),
					autoReveal: true,
					autoHide: options === null || options === void 0 ? void 0 : options.autoHide,
					collapsed: true
				});
				group = service.get(position);
			}
			if (!group) return;
			this.moveGroupOrPanel({
				from: {
					groupId: data.groupId,
					panelId: (_data$panelId2 = data.panelId) !== null && _data$panelId2 !== void 0 ? _data$panelId2 : void 0
				},
				to: {
					group,
					position: "center"
				}
			});
		});
	}
	getEdgeGroup(position) {
		var _this$_edgeGroupServi2;
		return (_this$_edgeGroupServi2 = this._edgeGroupService) === null || _this$_edgeGroupServi2 === void 0 || (_this$_edgeGroupServi2 = _this$_edgeGroupServi2.get(position)) === null || _this$_edgeGroupServi2 === void 0 ? void 0 : _this$_edgeGroupServi2.api;
	}
	/** The edge group panel at a position (the model, not the api). */
	getEdgeGroupPanel(position) {
		var _this$_edgeGroupServi3;
		return (_this$_edgeGroupServi3 = this._edgeGroupService) === null || _this$_edgeGroupServi3 === void 0 ? void 0 : _this$_edgeGroupServi3.get(position);
	}
	/** Pin (expand) the edge group at a position. Reports the missing module if
	*  AutoHideEdgeGroup is absent, since this command is reachable without the
	*  `autoHideEdgeGroups` option that would otherwise have named it. */
	pinEdgeGroup(position) {
		var _assertModule5;
		(_assertModule5 = assertModule(this._moduleRegistry.services.autoHideEdgeGroupService, "AutoHideEdgeGroup", "api.pinEdgeGroup")) === null || _assertModule5 === void 0 || _assertModule5.pin(position);
	}
	/** Auto-hide (collapse to strip) the edge group at a position. */
	autoHideEdgeGroup(position) {
		var _assertModule6;
		(_assertModule6 = assertModule(this._moduleRegistry.services.autoHideEdgeGroupService, "AutoHideEdgeGroup", "api.autoHideEdgeGroup")) === null || _assertModule6 === void 0 || _assertModule6.autoHide(position);
	}
	/** Peek (slide out) / close the collapsed edge group at a position. */
	peekEdgeGroup(position, peek) {
		var _assertModule7;
		(_assertModule7 = assertModule(this._moduleRegistry.services.autoHideEdgeGroupService, "AutoHideEdgeGroup", "api.peekEdgeGroup")) === null || _assertModule7 === void 0 || _assertModule7.peek(position, peek);
	}
	/** The auto-hide peek mounts on the shell, the same element the
	*  `OverlayRenderContainer` roots on, so `always` content re-anchors in the
	*  peek's coordinate space. */
	get overlayRoot() {
		return this.rootElement;
	}
	/** Viewport rect of the docked content area (the element the root/group drop
	*  targets hit-test against), used by the two-band drag-reveal affordance to
	*  classify a pointer's distance from each edge. This is the gridview/center
	*  container, which is inset when edge groups are present, so the outer band
	*  sits at the boundary of the content area (adjacent to any existing edge
	*  group) rather than at the shell's outer edge. */
	getDropZoneRect() {
		return this.element.getBoundingClientRect();
	}
	/** The size an edge group expands to (pre-collapse); sizes the peek. */
	getEdgeGroupExpandedSize(position) {
		var _this$_shellManager$g, _this$_shellManager4;
		return (_this$_shellManager$g = (_this$_shellManager4 = this._shellManager) === null || _this$_shellManager4 === void 0 ? void 0 : _this$_shellManager4.getEdgeGroupExpandedSize(position)) !== null && _this$_shellManager$g !== void 0 ? _this$_shellManager$g : 0;
	}
	/** Reposition a single `renderer:'always'` panel's overlay over its
	*  reference container, optionally forcing it visible (the auto-hide peek
	*  slides an `always` panel out without reparenting it or touching its
	*  visibility state). No-op for non-overlay-rendered panels. */
	repositionPanelOverlay(panel, forceVisible, clip) {
		this.overlayRenderContainer.repositionPanelOverlay(panel.api.id, forceVisible, clip);
	}
	setEdgeGroupVisible(position, visible) {
		this._shellManager.setEdgeGroupVisible(position, visible);
	}
	isEdgeGroupVisible(position) {
		return this._shellManager.isEdgeGroupVisible(position);
	}
	removeEdgeGroup(position) {
		const service = assertModule(this._edgeGroupService, "EdgeGroup", "api.removeEdgeGroup");
		if (!service) return;
		const group = service.get(position);
		if (!group) throw new Error(`dockview: no edge group exists at position '${position}'`);
		this.mutation("remove", () => {
			for (const panel of [...group.panels]) this.removePanel(panel, {
				removeEmptyGroup: false,
				skipDispose: false
			});
			this._shellManager.removeEdgeView(position);
			service.remove(position);
			group.dispose();
			this._groups.delete(group.id);
			this._onDidRemoveGroup.fire(group);
			this.activateFallbackGroupIfRemoved(group);
		});
	}
	setEdgeGroupCollapsed(group, collapsed) {
		var _this$_edgeGroupServi4;
		const position = (_this$_edgeGroupServi4 = this._edgeGroupService) === null || _this$_edgeGroupServi4 === void 0 ? void 0 : _this$_edgeGroupServi4.findPositionOf(group);
		if (!position) return;
		if (this._shellManager.isEdgeGroupCollapsed(position) === collapsed) return;
		this._shellManager.setEdgeGroupCollapsed(position, collapsed);
		group.api._onDidCollapsedChange.fire({ isCollapsed: collapsed });
	}
	isEdgeGroupCollapsed(group) {
		var _this$_edgeGroupServi5;
		const position = (_this$_edgeGroupServi5 = this._edgeGroupService) === null || _this$_edgeGroupServi5 === void 0 ? void 0 : _this$_edgeGroupServi5.findPositionOf(group);
		return position ? this._shellManager.isEdgeGroupCollapsed(position) : false;
	}
	isEdgeGroupPeeking(group) {
		return this._peekingGroups.has(group);
	}
	/** Set the peek state and fire the group's `onDidPeekChange` (called by the
	*  auto-hide service). */
	setEdgeGroupPeeking(group, peeking) {
		if (this._peekingGroups.has(group) === peeking) return;
		if (peeking) this._peekingGroups.add(group);
		else this._peekingGroups.delete(group);
		group.api._onDidPeekChange.fire({ isPeeking: peeking });
	}
	/**
	* Resolve whether an edge group should behave as an auto-hide (pinnable)
	* tool window: the per-group flag when set, otherwise the per-edge
	* `autoHideEdgeGroups` option for the group's edge. This is what lets a
	* static edge group and an auto-hiding one co-exist in the same layout.
	*/
	isEdgeGroupAutoHide(group) {
		var _this$_edgeGroupServi6, _this$_edgeGroupServi7;
		const perGroup = (_this$_edgeGroupServi6 = this._edgeGroupService) === null || _this$_edgeGroupServi6 === void 0 ? void 0 : _this$_edgeGroupServi6.isAutoHide(group);
		if (perGroup !== void 0) return perGroup;
		const position = (_this$_edgeGroupServi7 = this._edgeGroupService) === null || _this$_edgeGroupServi7 === void 0 ? void 0 : _this$_edgeGroupServi7.findPositionOf(group);
		if (position === void 0) return false;
		return isEdgeGroupEnabled(this.options.autoHideEdgeGroups, position);
	}
	/**
	* Set (or clear, via `undefined`) the per-group auto-hide flag and notify
	* the auto-hide module so it can dock/undock the group at runtime.
	*/
	setEdgeGroupAutoHide(group, value) {
		const service = this._edgeGroupService;
		if (!(service === null || service === void 0 ? void 0 : service.includes(group))) return;
		service.setAutoHide(group, value);
		this._onDidEdgeGroupAutoHideChange.fire(group);
	}
	updateDragAndDropState() {
		for (const group of this.groups) group.model.updateDragAndDropState();
	}
	focus() {
		var _this$activeGroup;
		(_this$activeGroup = this.activeGroup) === null || _this$activeGroup === void 0 || _this$activeGroup.focus();
	}
	getGroupPanel(id) {
		return this.panels.find((panel) => panel.id === id);
	}
	setActivePanel(panel) {
		panel.group.model.openPanel(panel);
		this.doSetGroupAndPanelActive(panel.group);
	}
	activateNext(options = {}) {
		if (!options.group) {
			if (!this.activeGroup) return;
			options.group = this.activeGroup;
		}
		if (options.includePanel && options.group) {
			if (options.group.activePanel !== options.group.panels[options.group.panels.length - 1]) {
				options.group.model.moveToNext({ suppressRoll: true });
				return;
			}
		}
		const next = this.activationTarget(options.group, false);
		if (next) this.doSetGroupAndPanelActive(next);
	}
	activatePrevious(options = {}) {
		if (!options.group) {
			if (!this.activeGroup) return;
			options.group = this.activeGroup;
		}
		if (options.includePanel && options.group) {
			if (options.group.activePanel !== options.group.panels[0]) {
				options.group.model.moveToPrevious({ suppressRoll: true });
				return;
			}
		}
		const next = this.activationTarget(options.group, true);
		if (next) this.doSetGroupAndPanelActive(next);
	}
	/**
	* The group `activateNext` / `activatePrevious` lands on when leaving
	* `group`. A group traverses the gridview that hosts it; a group hosted
	* outside any gridview (edge) or alone in its floating / popout window
	* falls through to the main grid's first / last visible leaf.
	*/
	activationTarget(group, reverse) {
		const gridview = this.getGridviewForGroup(group);
		if (gridview.element.contains(group.element)) {
			const location = getGridLocation(group.element);
			const next = (reverse ? gridview.previous(location) : gridview.next(location)).view;
			if (gridview === this.gridview || next !== group) return next;
		}
		const leaves = [];
		const collect = (node) => {
			if (isGridBranchNode(node)) node.children.forEach(collect);
			else leaves.push(node.view);
		};
		collect(this.gridview.getView());
		const visible = leaves.filter((leaf) => leaf.api.isVisible);
		return visible[reverse ? visible.length - 1 : 0];
	}
	/**
	* Serialize the current state of the layout
	*
	* @returns A JSON respresentation of the layout
	*/
	toJSON() {
		var _this$_floatingGroupS3, _this$_floatingGroupS4, _this$_popoutWindowSe11, _this$_popoutWindowSe12, _this$activeGroup2;
		const data = this.gridview.serialize();
		const panels = this.panels.reduce((collection, panel) => {
			collection[panel.id] = panel.toJSON();
			return collection;
		}, {});
		const floats = (_this$_floatingGroupS3 = (_this$_floatingGroupS4 = this._floatingGroupService) === null || _this$_floatingGroupS4 === void 0 ? void 0 : _this$_floatingGroupS4.serialize()) !== null && _this$_floatingGroupS3 !== void 0 ? _this$_floatingGroupS3 : [];
		const popoutGroups = (_this$_popoutWindowSe11 = (_this$_popoutWindowSe12 = this._popoutWindowService) === null || _this$_popoutWindowSe12 === void 0 ? void 0 : _this$_popoutWindowSe12.serialize()) !== null && _this$_popoutWindowSe11 !== void 0 ? _this$_popoutWindowSe11 : [];
		const result = {
			grid: data,
			panels,
			activeGroup: (_this$activeGroup2 = this.activeGroup) === null || _this$activeGroup2 === void 0 ? void 0 : _this$activeGroup2.id
		};
		if (floats.length > 0) result.floatingGroups = floats;
		if (popoutGroups.length > 0) result.popoutGroups = popoutGroups;
		const edgeGroups = this._serializeEdgeGroups();
		if (edgeGroups) result.edgeGroups = edgeGroups;
		return result;
	}
	/**
	* Serialize the edge groups, augmenting each shell entry with the serialized
	* group state + the component-owned per-group presentation flags (the shell
	* only knows geometry/collapse). Returns `undefined` when there are none.
	*/
	_serializeEdgeGroups() {
		var _this$_edgeGroupServi8;
		if (!((_this$_edgeGroupServi8 = this._edgeGroupService) === null || _this$_edgeGroupServi8 === void 0 ? void 0 : _this$_edgeGroupServi8.hasAny())) return;
		const shellSerialized = this._shellManager.toJSON();
		for (const [position, group] of this._edgeGroupService.entries()) {
			const entry = shellSerialized[position];
			if (!entry) continue;
			if (this._edgeGroupService.isAutoReveal(group) && group.model.isEmpty) {
				delete shellSerialized[position];
				continue;
			}
			entry.group = group.toJSON();
			if (this._edgeGroupService.isAutoReveal(group)) entry.autoReveal = true;
			const autoHide = this._edgeGroupService.isAutoHide(group);
			if (autoHide !== void 0) entry.autoHide = autoHide;
		}
		return shellSerialized;
	}
	fromJSON(data, options) {
		this.mutation("load", () => this._doFromJSON(data, options));
	}
	_doFromJSON(data, options) {
		var _this$_popoutWindowSe13, _data$grid$root;
		(_this$_popoutWindowSe13 = this._popoutWindowService) === null || _this$_popoutWindowSe13 === void 0 || _this$_popoutWindowSe13.cancelPendingRestorations();
		if (typeof data !== "object" || data === null) throw new Error("dockview: serialized layout must be a non-null object");
		if (!data.grid || ((_data$grid$root = data.grid.root) === null || _data$grid$root === void 0 ? void 0 : _data$grid$root.type) !== "branch" || !Array.isArray(data.grid.root.data)) throw new Error("dockview: root must be of type branch");
		const existingPanels = /* @__PURE__ */ new Map();
		const temporaryGroups = /* @__PURE__ */ new Map();
		const stagedPanels = [];
		const temporaryGroupDisposables = [];
		/**
		* The staging groups are detached from `_groups` and never enter the
		* grid, so nothing else will ever tear them down.
		*
		* `dispose()` reaches consumer `IContentRenderer.dispose()`, so one
		* throwing renderer must not abort the rest of the cleanup — that would
		* re-introduce the very leak this reclaims — nor replace the
		* deserialization error the caller is being given. Draining the list
		* also makes this safe to call more than once.
		*/
		const disposeTemporaryGroups = () => {
			for (const disposable of temporaryGroupDisposables) try {
				disposable.dispose();
			} catch (err) {
				console.error("dockview: failed to dispose a temporary group created for reuseExistingPanels", err);
			}
			temporaryGroupDisposables.length = 0;
		};
		if (options === null || options === void 0 ? void 0 : options.reuseExistingPanels) {
			/**
			* Visible, always-rendered panels need individual staging groups
			* to remain active. Other reused panels can share a staging group.
			* The staging groups are excluded from the layout clear below.
			*/
			const newPanels = Object.keys(data.panels);
			let sharedTemporaryGroup;
			const createTemporaryGroup = () => {
				const temporaryGroup = this.createGroup();
				/**
				* Removing the group from `_groups` also drops the record's
				* `CompositeDisposable`, so capture it first and tear both it
				* and the group down in the `finally` below. Left undisposed a
				* staging group leaks its `ResizeObserver`, its
				* `onDidOptionsChange` subscription (retained by this
				* component's emitter) and the watermark its model mounts when
				* the group empties — once per reused panel, per `fromJSON`.
				*/
				const record = this._groups.get(temporaryGroup.api.id);
				this._groups.delete(temporaryGroup.api.id);
				temporaryGroupDisposables.push(Disposable.from(() => {
					var _this$headerActionsSe2;
					/**
					* Reclaim the group's own resources, never its panels.
					* Staging is driven by the ids in `data.panels` while
					* reclaiming is driven by the group `views` that
					* reference them, so a panel whose state is present but
					* unreferenced is still staged here — and `dispose()`
					* on a non-empty group reaches the consumer's
					* `IContentRenderer.dispose()`. Emptying the group
					* first leaves those panels exactly as they were before
					* this teardown existed, which also keeps this safe
					* against any future path that rebuilds a panel under
					* an id that is live in the new layout.
					*/
					this.movingLock(() => {
						for (const panel of temporaryGroup.panels.slice()) temporaryGroup.model.removePanel(panel);
					});
					record === null || record === void 0 || record.disposable.dispose();
					(_this$headerActionsSe2 = this.headerActionsService) === null || _this$headerActionsSe2 === void 0 || _this$headerActionsSe2.disposeGroup(temporaryGroup);
					temporaryGroup.dispose();
				}));
				return temporaryGroup;
			};
			/**
			* Staging and the clear below run before the deserialization
			* `try`, so a throw here (a consumer `onDidRemovePanel` handler, a
			* renderer teardown during `clear`) would escape without reclaiming
			* the staging groups already created.
			*
			* The creation loop is inside the guard too, not just the moves and
			* the clear: `createGroup()` reaches consumer code of its own —
			* `initialize()` mounts the watermark through
			* `createWatermarkComponent()` — so a throw on the n-th panel would
			* otherwise strand the n-1 staging groups already built.
			*/
			try {
				for (const panel of this.panels) if (newPanels.includes(panel.api.id)) {
					existingPanels.set(panel.api.id, panel);
					let temporaryGroup;
					if (panel.api.renderer === "always" && panel.api.isVisible) temporaryGroup = createTemporaryGroup();
					else {
						var _sharedTemporaryGroup;
						(_sharedTemporaryGroup = sharedTemporaryGroup) !== null && _sharedTemporaryGroup !== void 0 || (sharedTemporaryGroup = createTemporaryGroup());
						temporaryGroup = sharedTemporaryGroup;
					}
					temporaryGroups.set(panel.api.id, temporaryGroup);
					stagedPanels.push({
						panel,
						temporaryGroup
					});
				}
				this.movingLock(() => {
					stagedPanels.forEach(({ panel, temporaryGroup }) => {
						this.moveGroupOrPanel({
							from: {
								groupId: panel.api.group.api.id,
								panelId: panel.api.id
							},
							to: {
								group: temporaryGroup,
								position: "center"
							},
							keepEmptyGroups: true
						});
					});
				});
				this.clear();
			} catch (err) {
				disposeTemporaryGroups();
				throw err;
			}
		} else this.clear();
		const { grid, panels, activeGroup } = data;
		try {
			var _data$floatingGroups, _data$popoutGroups, _this$_popoutWindowSe14, _this$_floatingGroupS5, _this$_watermarkServi2;
			const width = this.width;
			const height = this.height;
			const createGroupFromSerializedState = (data) => {
				const { id, locked, hideHeader, headerPosition, views, activeView } = data;
				if (typeof id !== "string") throw new TypeError("dockview: group id must be of type string");
				const group = this.createGroup({
					id,
					locked: locked !== null && locked !== void 0 ? locked : false,
					hideHeader: !!hideHeader,
					headerPosition
				});
				this._onDidAddGroup.fire(group);
				const createdPanels = [];
				/**
				* Skip any view whose panel state is missing from the panels
				* map rather than passing `undefined` to the deserializer
				* (which would dereference `panelData.id` and throw, aborting
				* the whole layout restore). Mirrors the guard on the
				* edge-group deserialization path.
				*/
				const presentViews = views.filter((child) => panels[child]);
				for (const child of presentViews) {
					/**
					* Run the deserializer step seperately since this may fail to due corrupted external state.
					* In running this section first we avoid firing lots of 'add' events in the event of a failure
					* due to a corruption of input data.
					*/
					const existingPanel = existingPanels.get(child);
					const temporaryGroup = temporaryGroups.get(child);
					if (temporaryGroup && existingPanel) {
						this.movingLock(() => {
							temporaryGroup.model.removePanel(existingPanel);
						});
						createdPanels.push(existingPanel);
						existingPanel.updateFromStateModel(panels[child]);
					} else {
						const panel = this._deserializer.fromJSON(panels[child], group);
						createdPanels.push(panel);
					}
				}
				for (const panel of createdPanels) {
					const isActive = typeof activeView === "string" && activeView === panel.id;
					if (existingPanels.has(panel.api.id)) this.movingLock(() => {
						group.model.openPanel(panel, {
							skipSetActive: !isActive,
							skipSetGroupActive: true
						});
					});
					else group.model.openPanel(panel, {
						skipSetActive: !isActive,
						skipSetGroupActive: true
					});
				}
				if (data.tabGroups && data.tabGroups.length > 0) group.model.restoreTabGroups(data.tabGroups);
				if (!group.activePanel && group.panels.length > 0) group.model.openPanel(group.panels[group.panels.length - 1], { skipSetGroupActive: true });
				return group;
			};
			this.gridview.deserialize(grid, { fromJSON: (node) => {
				return createGroupFromSerializedState(node.data);
			} });
			this._layoutFromShell(width, height);
			if (data.edgeGroups) this.deserializeEdgeGroups(data.edgeGroups, panels, existingPanels, temporaryGroups);
			this.deserializeFloatingWindows((_data$floatingGroups = data.floatingGroups) !== null && _data$floatingGroups !== void 0 ? _data$floatingGroups : [], createGroupFromSerializedState);
			const popoutPromises = this.deserializePopoutWindows((_data$popoutGroups = data.popoutGroups) !== null && _data$popoutGroups !== void 0 ? _data$popoutGroups : [], createGroupFromSerializedState);
			(_this$_popoutWindowSe14 = this._popoutWindowService) === null || _this$_popoutWindowSe14 === void 0 || _this$_popoutWindowSe14.finishRestoration(popoutPromises);
			(_this$_floatingGroupS5 = this._floatingGroupService) === null || _this$_floatingGroupS5 === void 0 || _this$_floatingGroupS5.constrainBounds();
			if (typeof activeGroup === "string") {
				const panel = this.getPanel(activeGroup);
				if (panel) this.doSetGroupAndPanelActive(panel);
			}
			(_this$_watermarkServi2 = this._watermarkService) === null || _this$_watermarkServi2 === void 0 || _this$_watermarkServi2.update();
		} catch (err) {
			var _this$_floatingGroupS6;
			console.error("dockview: failed to deserialize layout. Reverting changes", err);
			/**
			* Takes all the successfully created groups and remove all of their panels.
			*
			* `group.panels` is the group's live array and `removePanel`
			* splices it, so iterate a copy — walking the live array skips
			* every other panel, leaving it attached to the overlay render
			* container and its `onDidRemovePanel` never fired.
			*/
			for (const group of this.groups) for (const panel of group.panels.slice()) this.removePanel(panel, {
				removeEmptyGroup: false,
				skipDispose: false
			});
			/**
			* To remove a group we cannot call this.removeGroup(...) since this makes assumptions about
			* the underlying HTMLElement existing in the Gridview.
			*
			* Edge groups are structural (owned by the edge-group service and
			* the shell, not the grid), so they are skipped here exactly as
			* `_doClear` and `doRemoveGroup` skip them. Disposing one would
			* leave the service holding a dead group: `addEdgeGroup` at that
			* position reports it as existing, `addPanel` against it fails,
			* and a later good `fromJSON` restores nothing into it. The panel
			* loop above has already emptied them and the `clear()` below
			* keeps them registered: the same state a successful restore of a
			* layout without that edge group leaves them in.
			*/
			for (const group of this.groups) {
				var _this$_edgeGroupServi9;
				if ((_this$_edgeGroupServi9 = this._edgeGroupService) === null || _this$_edgeGroupServi9 === void 0 ? void 0 : _this$_edgeGroupServi9.includes(group)) continue;
				group.dispose();
				this._groups.delete(group.id);
				this._onDidRemoveGroup.fire(group);
			}
			(_this$_floatingGroupS6 = this._floatingGroupService) === null || _this$_floatingGroupS6 === void 0 || _this$_floatingGroupS6.disposeAll();
			this.clear();
			/**
			* even though we have cleaned-up we still want to inform the caller of their error
			* and we'll do this through re-throwing the original error since afterall you would
			* expect trying to load a corrupted layout to result in an error and not silently fail...
			*/
			throw err;
		} finally {
			disposeTemporaryGroups();
		}
		this.debouncedUpdateAllPositions();
		this._onDidLayoutFromJSON.fire();
	}
	/**
	* Rebuild a floating / popout window's nested gridview from its serialized
	* tree, collecting the member groups (in deserialization order) so the
	* caller can mount or restore the window.
	*/
	deserializeNestedGridview(grid, createGroup) {
		const gridview = this.createNestedGridview(grid.orientation);
		const members = [];
		gridview.deserialize(grid, { fromJSON: (node) => {
			const group = createGroup(node.data);
			members.push(group);
			return group;
		} });
		return {
			gridview,
			members
		};
	}
	deserializeEdgeGroups(edgeGroups, panels, existingPanels, temporaryGroups) {
		const edgeService = assertModule(this._edgeGroupService, "EdgeGroup", "fromJSON edge restoration");
		if (!edgeService) return;
		for (const _position of [
			"top",
			"bottom",
			"left",
			"right"
		]) {
			const fixedData = edgeGroups[_position];
			if (fixedData && !edgeService.has(_position)) {
				var _groupState$id;
				const groupState = fixedData.group;
				const id = (_groupState$id = groupState === null || groupState === void 0 ? void 0 : groupState.id) !== null && _groupState$id !== void 0 ? _groupState$id : `${_position}-group`;
				this.addEdgeGroup(_position, {
					id,
					autoReveal: fixedData.autoReveal,
					autoHide: fixedData.autoHide,
					minimumSize: fixedData.minimumSize,
					maximumSize: fixedData.maximumSize,
					collapsedSize: fixedData.collapsedSize
				});
			}
		}
		for (const [position, edgeGroup] of edgeService.entries()) {
			const edgeData = edgeGroups[position];
			const groupState = edgeData === null || edgeData === void 0 ? void 0 : edgeData.group;
			if (groupState) {
				const { views, activeView, locked, hideHeader } = groupState;
				edgeGroup.locked = locked !== null && locked !== void 0 ? locked : false;
				edgeGroup.header.hidden = !!hideHeader;
				const createdPanels = [];
				for (const panelId of views) {
					if (!panels[panelId]) continue;
					/**
					* Reclaim a staged panel rather than rebuilding it, the
					* same way the grid path does. Deserializing here instead
					* would honour `reuseExistingPanels` everywhere except edge
					* groups: the live panel keeps sitting in its staging group
					* while a second panel is built under the same id, so the
					* consumer's renderer for the original is orphaned — never
					* disposed, and its element left inside the id-keyed
					* overlay entry the replacement now shares.
					*/
					const existingPanel = existingPanels.get(panelId);
					const temporaryGroup = temporaryGroups.get(panelId);
					if (temporaryGroup && existingPanel) {
						this.movingLock(() => {
							temporaryGroup.model.removePanel(existingPanel);
						});
						createdPanels.push(existingPanel);
						existingPanel.updateFromStateModel(panels[panelId]);
					} else {
						const panel = this._deserializer.fromJSON(panels[panelId], edgeGroup);
						createdPanels.push(panel);
					}
				}
				for (const panel of createdPanels) {
					const isActive = activeView === panel.id;
					if (existingPanels.has(panel.api.id)) this.movingLock(() => {
						edgeGroup.model.openPanel(panel, {
							skipSetActive: !isActive,
							skipSetGroupActive: true
						});
					});
					else edgeGroup.model.openPanel(panel, {
						skipSetActive: !isActive,
						skipSetGroupActive: true
					});
				}
				if (groupState.tabGroups && groupState.tabGroups.length > 0) edgeGroup.model.restoreTabGroups(groupState.tabGroups);
				if (!edgeGroup.activePanel && edgeGroup.panels.length > 0) edgeGroup.model.openPanel(edgeGroup.panels[edgeGroup.panels.length - 1], { skipSetGroupActive: true });
			}
		}
		this._shellManager.fromJSON(edgeGroups);
	}
	deserializeFloatingWindows(serialized, createGroup) {
		for (const serializedFloatingGroup of serialized) {
			const { data, grid, position } = serializedFloatingGroup;
			if (grid) {
				const { gridview: floatingGridview, members } = this.deserializeNestedGridview(grid, createGroup);
				if (members.length === 0) continue;
				this.mountFloatingWindow(floatingGridview, members[0], members, position, { inDragMode: false });
			} else if (data) {
				const group = createGroup(data);
				this.addFloatingGroup(group, {
					position,
					width: position.width,
					height: position.height,
					skipRemoveGroup: true,
					inDragMode: false
				});
			}
		}
	}
	deserializePopoutWindows(serialized, createGroup) {
		const popoutService = serialized.length > 0 ? assertModule(this._popoutWindowService, "PopoutWindow", "fromJSON popout restoration") : this._popoutWindowService;
		if (!popoutService) return [];
		return serialized.flatMap((serializedPopoutGroup, index) => {
			const { data, grid, position, gridReferenceGroup, url } = serializedPopoutGroup;
			let overridePopoutGridview;
			let members = [];
			if (grid) {
				const built = this.deserializeNestedGridview(grid, createGroup);
				overridePopoutGridview = built.gridview;
				members = built.members;
				if (members.length === 0) {
					overridePopoutGridview.dispose();
					return [];
				}
			}
			const group = grid ? members[0] : createGroup(data);
			return popoutService.scheduleRestoration(index * 100, () => this.addPopoutGroup(group, {
				position: position !== null && position !== void 0 ? position : void 0,
				overridePopoutGroup: gridReferenceGroup ? group : void 0,
				overridePopoutGridview,
				referenceGroup: gridReferenceGroup ? this.getPanel(gridReferenceGroup) : void 0,
				popoutUrl: url
			}), () => {
				for (const orphan of members.length > 0 ? members : [group]) if (!this.isDisposed && this._groups.has(orphan.id) && orphan.element.parentElement === null) {
					for (const panel of [...orphan.panels]) this.removePanel(panel, { removeEmptyGroup: false });
					orphan.dispose();
					this._groups.delete(orphan.id);
					this._onDidRemoveGroup.fire(orphan);
				}
			});
		});
	}
	clear() {
		this.mutation("clear", () => this._doClear());
	}
	_doClear() {
		const groups = Array.from(this._groups.values()).map((_) => _.value);
		const hasActiveGroup = !!this.activeGroup;
		for (const group of groups) {
			var _this$_edgeGroupServi10;
			if ((_this$_edgeGroupServi10 = this._edgeGroupService) === null || _this$_edgeGroupServi10 === void 0 ? void 0 : _this$_edgeGroupServi10.includes(group)) {
				const panels = [...group.panels];
				for (const panel of panels) this.removePanel(panel, { removeEmptyGroup: false });
				continue;
			}
			this.removeGroup(group, { skipActive: true });
		}
		if (hasActiveGroup) this.doSetGroupAndPanelActive(void 0);
		this.gridview.clear();
	}
	closeAllGroups() {
		this.mutation("remove", () => {
			const groups = Array.from(this._groups.values()).map((_) => _.value);
			for (const group of groups) {
				if (!this._groups.has(group.id)) continue;
				const keepLast = this.options.noPanelsOverlay === "emptyGroup" && this.isLastGridGroup(group);
				if (keepLast && group.model.size === 0) continue;
				group.model.closeAllPanels();
				if (!this.closeEmptyGroups && !keepLast && this._groups.has(group.id) && group.model.size === 0) this.removeGroup(group, { skipActive: true });
			}
		});
	}
	addPanel(options) {
		return this.mutation("add", () => this._doAddPanel(options));
	}
	/**
	* Add a panel from its `toJSON()` state, placed as `addPanel` places
	* one: the counterpart to `panel.toJSON()` for a single tab moving
	* between layouts or instances, as `addGroupFromJSON` is to
	* `serializeGroup`. Throws before changing anything if the panel id is
	* already in use.
	*/
	addPanelFromJSON(state, options) {
		if (!state.contentComponent) throw new Error(`dockview: serialized panel ${state.id} has no contentComponent`);
		return this.mutation("add", () => {
			const panel = this._doAddPanel(_objectSpread2(_objectSpread2({}, options), {}, {
				id: state.id,
				component: state.contentComponent,
				tabComponent: state.tabComponent,
				title: state.title,
				renderer: state.renderer,
				params: state.params,
				minimumWidth: state.minimumWidth,
				minimumHeight: state.minimumHeight,
				maximumWidth: state.maximumWidth,
				maximumHeight: state.maximumHeight
			}));
			if (state.pinned) this.setPanelPinned(panel, true);
			return panel;
		});
	}
	_doAddPanel(options) {
		if (this.panels.some((_) => _.id === options.id)) throw new Error(`dockview: panel with id ${options.id} already exists`);
		let referenceGroup;
		if (options.position && options.floating) throw new Error("dockview: you can only provide one of: position, floating as arguments to .addPanel(...)");
		const initial = {
			width: options.initialWidth,
			height: options.initialHeight
		};
		let index;
		const shouldSkipSetActive = (group) => !!options.inactive && group.model.size > 0;
		if (options.position) if (isPanelOptionsWithPanel(options.position)) {
			const referencePanel = typeof options.position.referencePanel === "string" ? this.getGroupPanel(options.position.referencePanel) : options.position.referencePanel;
			index = options.position.index;
			if (!referencePanel) {
				var _options$position$ref;
				const referenceId = typeof options.position.referencePanel === "string" ? options.position.referencePanel : (_options$position$ref = options.position.referencePanel) === null || _options$position$ref === void 0 ? void 0 : _options$position$ref.id;
				throw new Error(`dockview: referencePanel '${referenceId}' does not exist`);
			}
			referenceGroup = this.findGroup(referencePanel);
		} else if (isPanelOptionsWithGroup(options.position)) {
			var _this$_groups$get;
			referenceGroup = typeof options.position.referenceGroup === "string" ? (_this$_groups$get = this._groups.get(options.position.referenceGroup)) === null || _this$_groups$get === void 0 ? void 0 : _this$_groups$get.value : options.position.referenceGroup;
			index = options.position.index;
			if (!referenceGroup) {
				var _options$position$ref2;
				const referenceId = typeof options.position.referenceGroup === "string" ? options.position.referenceGroup : (_options$position$ref2 = options.position.referenceGroup) === null || _options$position$ref2 === void 0 ? void 0 : _options$position$ref2.id;
				throw new Error(`dockview: referenceGroup '${referenceId}' does not exist`);
			}
		} else {
			const group = this.orthogonalize(directionToPosition(options.position.direction));
			const panel = this.createPanel(options, group);
			group.model.openPanel(panel, {
				skipSetActive: shouldSkipSetActive(group),
				skipSetGroupActive: options.inactive,
				index
			});
			if (!options.inactive) this.doSetGroupAndPanelActive(group);
			group.api.setSize({
				height: initial === null || initial === void 0 ? void 0 : initial.height,
				width: initial === null || initial === void 0 ? void 0 : initial.width
			});
			return panel;
		}
		else referenceGroup = this.activeGroup;
		let panel;
		if (referenceGroup) {
			var _options$position;
			const target = toTarget(((_options$position = options.position) === null || _options$position === void 0 ? void 0 : _options$position.direction) || "within");
			if (options.floating) {
				const group = this.createGroup();
				this._onDidAddGroup.fire(group);
				const floatingGroupOptions = typeof options.floating === "object" && options.floating !== null ? options.floating : {};
				this.addFloatingGroup(group, _objectSpread2(_objectSpread2({}, floatingGroupOptions), {}, {
					inDragMode: false,
					skipRemoveGroup: true,
					skipActiveGroup: true
				}));
				panel = this.createPanel(options, group);
				group.model.openPanel(panel, {
					skipSetActive: shouldSkipSetActive(group),
					skipSetGroupActive: options.inactive,
					index
				});
			} else if (referenceGroup.api.location.type === "edge" || target === "center") {
				panel = this.createPanel(options, referenceGroup);
				referenceGroup.model.openPanel(panel, {
					skipSetActive: shouldSkipSetActive(referenceGroup),
					skipSetGroupActive: options.inactive,
					index
				});
				referenceGroup.api.setSize({
					width: initial === null || initial === void 0 ? void 0 : initial.width,
					height: initial === null || initial === void 0 ? void 0 : initial.height
				});
				if (!options.inactive) this.doSetGroupAndPanelActive(referenceGroup);
			} else {
				const referenceGridview = this.getGridviewForGroup(referenceGroup);
				const location = getGridLocation(referenceGroup.element);
				const relativeLocation = getRelativeLocation(referenceGridview.orientation, location, target);
				const group = this.createGroupAtLocation(relativeLocation, this.orientationAtLocation(relativeLocation, referenceGridview) === "VERTICAL" ? initial === null || initial === void 0 ? void 0 : initial.height : initial === null || initial === void 0 ? void 0 : initial.width, void 0, referenceGridview);
				panel = this.createPanel(options, group);
				group.model.openPanel(panel, {
					skipSetActive: shouldSkipSetActive(group),
					skipSetGroupActive: options.inactive,
					index
				});
				if (!options.inactive) this.doSetGroupAndPanelActive(group);
			}
		} else if (options.floating) {
			const group = this.createGroup();
			this._onDidAddGroup.fire(group);
			const coordinates = typeof options.floating === "object" && options.floating !== null ? options.floating : {};
			this.addFloatingGroup(group, _objectSpread2(_objectSpread2({}, coordinates), {}, {
				inDragMode: false,
				skipRemoveGroup: true,
				skipActiveGroup: true
			}));
			panel = this.createPanel(options, group);
			group.model.openPanel(panel, {
				skipSetActive: shouldSkipSetActive(group),
				skipSetGroupActive: options.inactive,
				index
			});
		} else {
			const group = this.createGroupAtLocation([0], this.gridview.orientation === "VERTICAL" ? initial === null || initial === void 0 ? void 0 : initial.height : initial === null || initial === void 0 ? void 0 : initial.width);
			panel = this.createPanel(options, group);
			group.model.openPanel(panel, {
				skipSetActive: shouldSkipSetActive(group),
				skipSetGroupActive: options.inactive,
				index
			});
			if (!options.inactive) this.doSetGroupAndPanelActive(group);
		}
		return panel;
	}
	removePanel(panel, options) {
		this.mutation("remove", () => {
			var _options$removeEmptyG;
			return this._doRemovePanel(panel, {
				removeEmptyGroup: (_options$removeEmptyG = options === null || options === void 0 ? void 0 : options.removeEmptyGroup) !== null && _options$removeEmptyG !== void 0 ? _options$removeEmptyG : this.closeEmptyGroups,
				skipDispose: options === null || options === void 0 ? void 0 : options.skipDispose,
				skipSetActiveGroup: options === null || options === void 0 ? void 0 : options.skipSetActiveGroup
			});
		});
	}
	_doRemovePanel(panel, options) {
		const group = panel.group;
		if (!group) throw new Error(`dockview: cannot remove panel ${panel.id}. it's missing a group.`);
		group.model.removePanel(panel, { skipSetActiveGroup: options.skipSetActiveGroup });
		if (!options.skipDispose) {
			panel.group.model.renderContainer.detatch(panel);
			panel.dispose();
		}
		if (group.size === 0 && options.removeEmptyGroup) this.removeGroup(group, { skipActive: options.skipSetActiveGroup });
	}
	createWatermarkComponent() {
		if (this.options.createWatermarkComponent) return this.options.createWatermarkComponent();
		return new Watermark();
	}
	addGroup(options) {
		return this.mutation("add", () => this._doAddGroup(options));
	}
	/**
	* Serialize one group and the state of every panel it holds. The result
	* is self-contained: `addGroupFromJSON` on any dockview instance rebuilds
	* the group from it, with the same tab order, active tab, panel titles,
	* parameters and renderers.
	*/
	serializeGroup(group) {
		const panels = {};
		for (const panel of group.panels) panels[panel.id] = panel.toJSON();
		return {
			group: group.model.toJSON(),
			panels
		};
	}
	/**
	* Rebuild a group from `serializeGroup` output and add it to the live
	* layout at `options` (as for `addGroup`), without touching the rest of
	* the layout. This is the counterpart to `fromJSON`, which replaces the
	* whole layout, for moving one group between layouts or instances.
	*
	* With `direction: 'within'` and a reference group or panel, no group is
	* created: the serialized panels are merged into that group, in their
	* order, at `index` if given, and the serialized active panel becomes
	* the group's. The serialized group's own shape (id, locked, header,
	* tab groups) does not apply then. This is what a drop on a group's
	* centre or tab bar calls for, and the only form that works against a
	* floating or edge group, which has no grid neighbours.
	*
	* A panel id that is already live throws, as `addPanel` does, before
	* anything is changed. A group id that is already live is reassigned with
	* a warning, as `addGroup` does.
	*/
	addGroupFromJSON(data, options) {
		this.validateSerializedGroup(data);
		return this.mutation("add", () => this._doAddGroupFromJSON(data, options));
	}
	/**
	* Refuse an envelope that cannot be applied cleanly, before any mutation
	* is opened, so a refused call leaves no trace in the layout or its
	* events.
	*/
	validateSerializedGroup(data) {
		const state = data === null || data === void 0 ? void 0 : data.group;
		if (typeof (state === null || state === void 0 ? void 0 : state.id) !== "string") throw new TypeError("dockview: group id must be of type string");
		if (!Array.isArray(state.views)) throw new TypeError(`dockview: serialized group ${state.id} has no views`);
		for (const id of state.views) {
			var _data$panels;
			if (!((_data$panels = data.panels) === null || _data$panels === void 0 ? void 0 : _data$panels[id])) throw new Error(`dockview: serialized group ${state.id} is missing panel state for ${id}`);
			if (this.panels.some((panel) => panel.id === id)) throw new Error(`dockview: panel with id ${id} already exists`);
		}
	}
	_doAddGroupFromJSON(data, options) {
		var _options$direction;
		const { id, locked, hideHeader, headerPosition, constraints, activeView, tabGroups } = data.group;
		if (options && ((_options$direction = options.direction) !== null && _options$direction !== void 0 ? _options$direction : "within") === "within") {
			const target = this.resolveReferenceGroup(options);
			if (target) return this.mergeGroupFromJSON(data, target, options);
		}
		const groupOptions = {
			id,
			locked: locked !== null && locked !== void 0 ? locked : false,
			hideHeader: !!hideHeader,
			headerPosition,
			constraints,
			initialWidth: options === null || options === void 0 ? void 0 : options.initialWidth,
			initialHeight: options === null || options === void 0 ? void 0 : options.initialHeight,
			skipSetActive: true
		};
		const group = this.addEmptyGroupAt(groupOptions, options);
		let panels;
		try {
			panels = this.deserializePanels(data, group);
		} catch (err) {
			this.doRemoveGroup(group, { skipActive: true });
			throw err;
		}
		for (const panel of panels) group.model.openPanel(panel, {
			skipSetActive: panel.id !== activeView,
			skipSetGroupActive: true
		});
		if (tabGroups && tabGroups.length > 0) group.model.restoreTabGroups(tabGroups);
		if (!group.activePanel && group.panels.length > 0) group.model.openPanel(group.panels[group.panels.length - 1], { skipSetGroupActive: true });
		if (!(options === null || options === void 0 ? void 0 : options.skipSetActive)) this.doSetGroupAndPanelActive(group);
		return group;
	}
	/**
	* Add an empty group at the placement `options` names, or append it
	* when they name none.
	*/
	addEmptyGroupAt(groupOptions, options) {
		if (options !== void 0 && (isGroupOptionsWithPanel(options) || isGroupOptionsWithGroup(options) || typeof options.direction === "string")) return this._doAddGroup(_objectSpread2(_objectSpread2({}, options), groupOptions));
		const group = this.createGroup(groupOptions);
		this.doAddGroup(group);
		return group;
	}
	/**
	* Create every panel of a serialized group in `group`, in tab order,
	* before any is opened, so a corrupt panel state fails before a single
	* add event has fired (the ordering `fromJSON` uses). On failure the
	* panels made so far are disposed and the error rethrown.
	*/
	deserializePanels(data, group) {
		const panels = [];
		try {
			for (const child of data.group.views) panels.push(this._deserializer.fromJSON(data.panels[child], group));
		} catch (err) {
			for (const panel of panels) panel.dispose();
			throw err;
		}
		return panels;
	}
	/**
	* The group an `AddGroupOptions` placement names, or `undefined` for an
	* absolute placement. Throws for a reference that names nothing.
	*/
	resolveReferenceGroup(options) {
		if (isGroupOptionsWithPanel(options)) {
			const referencePanelId = typeof options.referencePanel === "string" ? options.referencePanel : options.referencePanel.id;
			const referencePanel = this.getGroupPanel(referencePanelId);
			if (!referencePanel) throw new Error(`dockview: reference panel ${referencePanelId} does not exist`);
			return referencePanel.group;
		}
		if (isGroupOptionsWithGroup(options)) {
			const referenceId = typeof options.referenceGroup === "string" ? options.referenceGroup : options.referenceGroup.id;
			const referenceGroup = this.getPanel(referenceId);
			if (!referenceGroup) throw new Error(`dockview: reference group ${referenceId} does not exist`);
			return referenceGroup;
		}
	}
	/**
	* The `direction: 'within'` form of `addGroupFromJSON`: the serialized
	* panels join `target` rather than a group of their own.
	*/
	mergeGroupFromJSON(data, target, options) {
		const { activeView } = data.group;
		const index = options.index;
		this.deserializePanels(data, target).forEach((panel, offset) => {
			target.model.openPanel(panel, {
				index: index === void 0 ? void 0 : index + offset,
				skipSetActive: panel.id !== activeView,
				skipSetGroupActive: true
			});
		});
		if (!options.skipSetActive) this.doSetGroupAndPanelActive(target);
		return target;
	}
	_doAddGroup(options) {
		if (options) {
			let referenceGroup;
			if (isGroupOptionsWithPanel(options)) {
				var _options$referencePan;
				const referencePanel = typeof options.referencePanel === "string" ? this.panels.find((panel) => panel.id === options.referencePanel) : options.referencePanel;
				const referencePanelId = typeof options.referencePanel === "string" ? options.referencePanel : (_options$referencePan = options.referencePanel) === null || _options$referencePan === void 0 ? void 0 : _options$referencePan.id;
				if (!referencePanel) throw new Error(`dockview: reference panel ${referencePanelId} does not exist`);
				referenceGroup = this.findGroup(referencePanel);
				if (!referenceGroup) throw new Error(`dockview: reference group for reference panel ${referencePanelId} does not exist`);
			} else if (isGroupOptionsWithGroup(options)) {
				var _this$_groups$get2;
				referenceGroup = typeof options.referenceGroup === "string" ? (_this$_groups$get2 = this._groups.get(options.referenceGroup)) === null || _this$_groups$get2 === void 0 ? void 0 : _this$_groups$get2.value : options.referenceGroup;
				if (!referenceGroup) {
					var _options$referenceGro2;
					const referenceId = typeof options.referenceGroup === "string" ? options.referenceGroup : (_options$referenceGro2 = options.referenceGroup) === null || _options$referenceGro2 === void 0 ? void 0 : _options$referenceGro2.id;
					throw new Error(`dockview: reference group ${referenceId} does not exist`);
				}
			} else {
				const group = this.orthogonalize(directionToPosition(options.direction), options);
				if (!options.skipSetActive) this.doSetGroupAndPanelActive(group);
				return group;
			}
			const target = toTarget(options.direction || "within");
			if (referenceGroup.api.location.type === "edge") throw new Error(`dockview: cannot add a group relative to edge group ${referenceGroup.id}; edge groups cannot be split`);
			const referenceGridview = this.getGridviewForGroup(referenceGroup);
			const location = getGridLocation(referenceGroup.element);
			const relativeLocation = getRelativeLocation(referenceGridview.orientation, location, target);
			const size = this.orientationAtLocation(relativeLocation, referenceGridview) === "VERTICAL" ? options.initialHeight : options.initialWidth;
			const group = this.createGroupAtLocation(relativeLocation, size, options, referenceGridview);
			if (!options.skipSetActive) this.doSetGroupAndPanelActive(group);
			return group;
		} else {
			const group = this.createGroup(options);
			this.doAddGroup(group);
			this.doSetGroupAndPanelActive(group);
			return group;
		}
	}
	removeGroup(group, options) {
		this.mutation("remove", () => this.doRemoveGroup(group, options));
	}
	/**
	* Detach a single group from the nested gridview of its floating / popout
	* window, keeping the window and its remaining members alive, and reassign
	* the window's anchor if the detached group was it.
	*
	* @returns `true` if the group was detached from a multi-member window;
	* `false` if `group` is not in a nested window, or is the window's only
	* member, in which case the caller is responsible for disposing the whole
	* window.
	*/
	detachFromNestedWindow(group) {
		var _this$_floatingGroupS7, _this$_popoutWindowSe15;
		const floating = (_this$_floatingGroupS7 = this._floatingGroupService) === null || _this$_floatingGroupS7 === void 0 ? void 0 : _this$_floatingGroupS7.findByGroup(group);
		if (floating) {
			const members = this.nestedWindowMembers(group);
			if (members.length <= 1) return false;
			floating.gridview.remove(group);
			if (floating.group === group) floating.setAnchorGroup(members.find((m) => m !== group));
			return true;
		}
		const popout = (_this$_popoutWindowSe15 = this._popoutWindowService) === null || _this$_popoutWindowSe15 === void 0 ? void 0 : _this$_popoutWindowSe15.findByGroup(group);
		if (popout) {
			const members = this.nestedWindowMembers(group);
			if (members.length <= 1) return false;
			popout.gridview.remove(group);
			if (popout.popoutGroup === group) popout.setAnchorGroup(members.find((m) => m !== group));
			return true;
		}
		return false;
	}
	/**
	* Dispose a group and forget it: remove it from `_groups` and fire the
	* removed event.
	*/
	disposeGroupRecord(group) {
		group.dispose();
		this._groups.delete(group.id);
		this._onDidRemoveGroup.fire(group);
	}
	/**
	* When `removed` was the active group, fall the active selection back to
	* the first remaining group (or clear it when none remain).
	*/
	activateFallbackGroupIfRemoved(removed, skipActive) {
		if (!skipActive && this._activeGroup === removed) {
			const groups = Array.from(this._groups.values());
			this.doSetGroupAndPanelActive(groups.length > 0 ? groups[0].value : void 0);
		}
	}
	doRemoveGroup(group, options) {
		var _this$_edgeGroupServi11;
		if ((_this$_edgeGroupServi11 = this._edgeGroupService) === null || _this$_edgeGroupServi11 === void 0 ? void 0 : _this$_edgeGroupServi11.includes(group)) return group;
		const panels = [...group.panels];
		if (!(options === null || options === void 0 ? void 0 : options.skipDispose)) for (const panel of panels) {
			var _options$skipDispose;
			this.removePanel(panel, {
				removeEmptyGroup: false,
				skipDispose: (_options$skipDispose = options === null || options === void 0 ? void 0 : options.skipDispose) !== null && _options$skipDispose !== void 0 ? _options$skipDispose : false
			});
		}
		const activePanel = this.activePanel;
		if (group.api.location.type === "floating") {
			var _this$_floatingGroupS8;
			const floatingGroup = (_this$_floatingGroupS8 = this._floatingGroupService) === null || _this$_floatingGroupS8 === void 0 ? void 0 : _this$_floatingGroupS8.findByGroup(group);
			if (!floatingGroup) throw new Error("dockview: failed to find floating group");
			if (this.detachFromNestedWindow(group)) {
				if (options === null || options === void 0 ? void 0 : options.skipDispose) group.model.location = { type: "grid" };
				else this.disposeGroupRecord(group);
				this.activateFallbackGroupIfRemoved(group, options === null || options === void 0 ? void 0 : options.skipActive);
				return group;
			}
			if (!(options === null || options === void 0 ? void 0 : options.skipDispose)) this.disposeGroupRecord(group);
			floatingGroup.dispose();
			this.activateFallbackGroupIfRemoved(group, options === null || options === void 0 ? void 0 : options.skipActive);
			return group;
		}
		if (group.api.location.type === "popout") {
			var _this$_popoutWindowSe16, _this$_popoutWindowSe17;
			const selectedGroup = (_this$_popoutWindowSe16 = this._popoutWindowService) === null || _this$_popoutWindowSe16 === void 0 ? void 0 : _this$_popoutWindowSe16.findByGroup(group);
			if (!selectedGroup) throw new Error("dockview: failed to find popout group");
			if (this.detachFromNestedWindow(group)) {
				if (options === null || options === void 0 ? void 0 : options.skipDispose) group.model.location = { type: "grid" };
				else this.disposeGroupRecord(group);
				this.activateFallbackGroupIfRemoved(group, options === null || options === void 0 ? void 0 : options.skipActive);
				return group;
			}
			if (!(options === null || options === void 0 ? void 0 : options.skipDispose)) {
				if (!(options === null || options === void 0 ? void 0 : options.skipPopoutAssociated)) {
					const refGroup = selectedGroup.referenceGroup ? this.getPanel(selectedGroup.referenceGroup) : void 0;
					if ((refGroup === null || refGroup === void 0 ? void 0 : refGroup.panels.length) === 0 && (this.closeEmptyGroups || !refGroup.api.isVisible)) this.removeGroup(refGroup);
				}
				selectedGroup.popoutGroup.dispose();
				this._groups.delete(group.id);
				this._onDidRemoveGroup.fire(group);
			}
			(_this$_popoutWindowSe17 = this._popoutWindowService) === null || _this$_popoutWindowSe17 === void 0 || _this$_popoutWindowSe17.remove(selectedGroup);
			const removedGroup = selectedGroup.disposable.dispose();
			if (!(options === null || options === void 0 ? void 0 : options.skipPopoutReturn) && removedGroup) {
				this.doAddGroup(removedGroup, [0]);
				this.doSetGroupAndPanelActive(removedGroup);
			}
			this.activateFallbackGroupIfRemoved(group, options === null || options === void 0 ? void 0 : options.skipActive);
			return selectedGroup.popoutGroup;
		}
		if (!this.gridview.element.contains(group.element)) {
			if (!(options === null || options === void 0 ? void 0 : options.skipDispose)) {
				const item = this._groups.get(group.id);
				item === null || item === void 0 || item.disposable.dispose();
				this.disposeGroupRecord(group);
			}
			this.activateFallbackGroupIfRemoved(group, options === null || options === void 0 ? void 0 : options.skipActive);
			return group;
		}
		const re = super.doRemoveGroup(group, options);
		if (!(options === null || options === void 0 ? void 0 : options.skipActive)) {
			if (this.activePanel !== activePanel) this.fireActivePanelChange(this.activePanel);
		}
		return re;
	}
	debouncedUpdateAllPositions() {
		if (this._updatePositionsFrameId !== void 0) cancelAnimationFrame(this._updatePositionsFrameId);
		this._updatePositionsFrameId = requestAnimationFrame(() => {
			var _this$_popoutWindowSe18, _this$_popoutWindowSe19;
			this._updatePositionsFrameId = void 0;
			this.overlayRenderContainer.updateAllPositions();
			for (const entry of (_this$_popoutWindowSe18 = (_this$_popoutWindowSe19 = this._popoutWindowService) === null || _this$_popoutWindowSe19 === void 0 ? void 0 : _this$_popoutWindowSe19.entries) !== null && _this$_popoutWindowSe18 !== void 0 ? _this$_popoutWindowSe18 : []) entry.overlayRenderContainer.updateAllPositions();
		});
	}
	movingLock(func) {
		const isMoving = this._moving;
		try {
			this._moving = true;
			return func();
		} finally {
			this._moving = isMoving;
		}
	}
	/**
	* Bracket a structural mutation with `onWillMutateLayout` /
	* `onDidMutateLayout`. Re-entrant: nested calls (a compound operation such
	* as a drag that relocates a panel) join the outermost transaction, so the
	* events fire exactly once around the whole operation. `kind` reflects the
	* outermost mutation.
	*/
	mutation(kind, func) {
		const close = this.openMutation(kind);
		this._syncMutationDepth++;
		try {
			return func();
		} finally {
			this._syncMutationDepth--;
			if (this._syncMutationDepth === 0) this.releaseDisposedActiveGroup();
			close();
		}
	}
	/**
	* `mutation()` for an operation whose work continues after the synchronous
	* call returns. The transaction stays open until the returned promise
	* settles, so everything the operation does - the group it adds, the panels
	* it relocates - lands inside the bracket, matching the synchronous
	* move / float paths.
	*/
	mutationAsync(kind, func) {
		var _this = this;
		return _asyncToGenerator(function* () {
			const close = _this.openMutation(kind);
			try {
				return yield func();
			} finally {
				close();
			}
		})();
	}
	/**
	* Open a transaction and return the function that closes it. Shared by the
	* synchronous and asynchronous brackets; the returned function must be
	* called exactly once.
	*
	* Both ends key off the depth counter reaching zero rather than off which
	* bracket opened first. For synchronous nesting the two are the same thing
	* - brackets close in the order they opened - but asynchronous transactions
	* can *overlap* rather than nest (two `addPopoutGroup` calls in flight at
	* once, or a restore staggering several), and there the first to open is
	* not the last to close. Reporting on the opener would fire `didMutate`
	* while the other transaction was still doing structural work, which is the
	* very thing the async bracket exists to prevent. Overlapping transactions
	* therefore report as one, tagged with the kind of the last to finish.
	*/
	openMutation(kind) {
		const origin = this._origin;
		if (this._mutationDepth === 0) this._onWillMutateLayout.fire({
			kind,
			origin
		});
		this._mutationDepth++;
		return () => {
			this._mutationDepth--;
			if (this._mutationDepth === 0) {
				this.releaseDisposedActiveGroup();
				this.flushLocationChanges();
				this._onDidMutateLayout.fire({
					kind,
					origin
				});
			}
		};
	}
	/** Covers removals with `skipActive` that disposed the active group. */
	releaseDisposedActiveGroup() {
		var _this$_activeGroup;
		if (!this.isDisposed && ((_this$_activeGroup = this._activeGroup) === null || _this$_activeGroup === void 0 ? void 0 : _this$_activeGroup.model.isDisposed)) this.activateFallbackGroupIfRemoved(this._activeGroup);
	}
	/**
	* Coalesce a panel's `onDidLocationChange` to the end of the enclosing
	* transaction, or fire it immediately when no transaction is in flight.
	*
	* Relocating a panel touches its location twice: once as it is reparented
	* into the destination group - which, when that group has just been created
	* for a floating or popout window, has not been told where it lives yet -
	* and once as the group is tagged with its final location. Reporting each
	* signal as it happens therefore leaks an intermediate `grid` location the
	* panel was never in, at a moment when it belongs to neither group's panel
	* list and so is missing from `api.panels`.
	*
	* Deferring collapses those signals into a single event carrying the
	* settled location. Note the signals are deliberately *not* compared
	* against the panel's previous location: a panel can move between two
	* floating windows without its location type changing, and this event is
	* the only signal `OverlayRenderContainer` has to re-resolve the panel's
	* z-index against its new host window.
	*/
	deferLocationChange(key, fire) {
		if (this._mutationDepth === 0) {
			fire();
			return;
		}
		this._pendingLocationChanges.set(key, fire);
	}
	/**
	* Report every panel whose location moved during the transaction that has
	* just closed. Each callback reads the panel's location at this point, so
	* what it reports is where the panel ended up.
	*/
	flushLocationChanges() {
		if (this._pendingLocationChanges.size === 0) return;
		const pending = Array.from(this._pendingLocationChanges.values());
		this._pendingLocationChanges.clear();
		for (const fire of pending) fire();
	}
	/**
	* The origin of the operation currently in progress (`'user'` by default).
	* Read inside a `mutation()` or active-panel change to learn whether the
	* change was driven by application code (via the {@link DockviewApi}) or a
	* user gesture.
	*/
	currentOrigin() {
		return this._origin;
	}
	/**
	* Run `func` with the operation origin set to `origin`, restoring the
	* previous value afterwards. Used by the DockviewApi boundary to tag
	* programmatic operations as `'api'`, and by user-gesture handlers to tag
	* `'user'`. Only the outermost caller sets the origin; a nested call (or a
	* call made while a mutation is already in flight) keeps whatever the
	* enclosing operation established, so the trigger always wins.
	*/
	withOrigin(origin, func) {
		if (this._originDepth > 0 || this._mutationDepth > 0) return func();
		const previous = this._origin;
		this._origin = origin;
		this._originDepth++;
		try {
			return func();
		} finally {
			this._originDepth--;
			this._origin = previous;
		}
	}
	/**
	* Fire `onDidActivePanelChange` with the panel and the current operation
	* {@link DockviewOrigin}. Callers keep their own dedupe guards.
	*/
	fireActivePanelChange(panel) {
		this._onDidActivePanelChange.fire({
			panel,
			origin: this._origin
		});
	}
	/**
	* Announce that `panel` has finished relocating. Must be called once the
	* move has settled: `to` is read from the panel's current group, so an
	* early call would report the source group as the destination.
	*/
	fireDidMovePanel(panel, from) {
		this._onDidMovePanel.fire({
			panel,
			from,
			to: panel.group
		});
	}
	moveGroupOrPanel(options) {
		this.mutation("move", () => this._doMoveGroupOrPanel(options));
	}
	_doMoveGroupOrPanel(options) {
		var _this$_groups$get3;
		const destinationGroup = options.to.group;
		const sourceGroupId = options.from.groupId;
		const sourceItemId = options.from.panelId;
		const destinationTarget = options.to.position;
		const destinationIndex = options.to.index;
		const sourceGroup = sourceGroupId ? (_this$_groups$get3 = this._groups.get(sourceGroupId)) === null || _this$_groups$get3 === void 0 ? void 0 : _this$_groups$get3.value : void 0;
		if (!sourceGroup) throw new Error(`dockview: Failed to find group id ${sourceGroupId}`);
		if (sourceItemId === void 0) {
			if (options.from.tabGroupId)
 /**
			* Moving a tab group (subset of panels) into another group
			*/
			this.moveTabGroupToGroup({
				sourceGroup,
				tabGroupId: options.from.tabGroupId,
				destinationGroup,
				destinationTarget,
				destinationIndex,
				skipSetActive: options.skipSetActive,
				keepEmptyGroups: options.keepEmptyGroups
			});
			else
 /**
			* Moving an entire group into another group
			*/
			this.moveGroup({
				from: { group: sourceGroup },
				to: {
					group: destinationGroup,
					position: destinationTarget
				},
				skipSetActive: options.skipSetActive
			});
			return;
		}
		if (!destinationTarget || destinationTarget === "center") {
			/**
			* Dropping a panel within another group
			*/
			const removedPanel = this.movingLock(() => sourceGroup.model.removePanel(sourceItemId, {
				skipSetActive: false,
				skipSetActiveGroup: true
			}));
			if (!removedPanel) throw new Error(`dockview: No panel with id ${sourceItemId}`);
			if (!this.keepEmptyGroups(options) && sourceGroup.model.size === 0 && sourceGroup !== destinationGroup) this.doRemoveGroup(sourceGroup, { skipActive: true });
			const isDestinationGroupEmpty = destinationGroup.model.size === 0;
			this.movingLock(() => {
				var _options$skipSetActiv;
				return destinationGroup.model.openPanel(removedPanel, {
					index: destinationIndex,
					skipSetActive: ((_options$skipSetActiv = options.skipSetActive) !== null && _options$skipSetActiv !== void 0 ? _options$skipSetActiv : false) && !isDestinationGroupEmpty,
					skipSetGroupActive: true
				});
			});
			if (!options.skipSetActive) this.doSetGroupAndPanelActive(destinationGroup);
			this.fireDidMovePanel(removedPanel, sourceGroup);
		} else {
			/**
			* Dropping a panel to the extremities of a group which will place that panel
			* into an adjacent group
			*/
			const destinationGridview = this.getGridviewForGroup(destinationGroup);
			const referenceLocation = getGridLocation(destinationGroup.element);
			const targetLocation = getRelativeLocation(destinationGridview.orientation, referenceLocation, destinationTarget);
			if (sourceGroup.size < 2 && !this.keepEmptyGroups(options)) {
				/**
				* If we are moving from a group which only has one panel left we will consider
				* moving the group itself rather than moving the panel into a newly created group.
				* When empty groups are kept the group must stay where it is, so the panel is
				* moved into a newly created group like any other panel.
				*/
				if (sourceGroup === destinationGroup) return;
				const [targetParentLocation, to] = tail(targetLocation);
				if (sourceGroup.api.location.type === "grid" && destinationGridview === this.gridview) {
					const [sourceParentLocation, from] = tail(getGridLocation(sourceGroup.element));
					if ((this.options.dropSizing !== "distribute" || sourceGroup === destinationGroup) && sequenceEquals(sourceParentLocation, targetParentLocation)) {
						this.gridview.moveView(sourceParentLocation, from, to);
						this.fireDidMovePanel(this.getGroupPanel(sourceItemId), sourceGroup);
						return;
					}
				}
				if (sourceGroup.api.location.type === "popout" && this.nestedWindowMembers(sourceGroup).length <= 1) {
					var _this$_popoutWindowSe20;
					/**
					* the source group is the only group in a popout window and
					* has a single panel
					*
					* 1. remove the panel from the group without triggering any events
					* 2. remove the popout group; this may cascade-remove the empty
					*    reference group it left behind in the main grid (see
					*    doRemoveGroup for popout groups), which can shift grid indices
					* 3. recompute the target location now that the grid is stable
					* 4. create a new group at the recomputed location and add that panel
					*
					* Multi-group popout windows fall through to the generic
					* detach-and-re-add path so the window stays alive.
					*/
					const popoutGroup = (_this$_popoutWindowSe20 = this._popoutWindowService) === null || _this$_popoutWindowSe20 === void 0 ? void 0 : _this$_popoutWindowSe20.findByGroup(sourceGroup);
					if (!popoutGroup) return;
					const removedPanel = this.movingLock(() => popoutGroup.popoutGroup.model.removePanel(popoutGroup.popoutGroup.panels[0], {
						skipSetActive: true,
						skipSetActiveGroup: true
					}));
					this.doRemoveGroup(sourceGroup, { skipActive: true });
					const updatedTargetLocation = getRelativeLocation(destinationGridview.orientation, getGridLocation(destinationGroup.element), destinationTarget);
					const newGroup = this.createGroupAtLocation(updatedTargetLocation, this.sizingForDrop(getGridLocation(destinationGroup.element)), void 0, destinationGridview);
					this.movingLock(() => newGroup.model.openPanel(removedPanel, { skipSetActive: true }));
					this.doSetGroupAndPanelActive(newGroup);
					this.fireDidMovePanel(this.getGroupPanel(sourceItemId), sourceGroup);
					return;
				}
				if (sourceGroup.api.location.type === "edge") {
					/**
					* Edge groups are permanent structural elements; never move the
					* group itself. Instead extract the panel and create a new grid group,
					* leaving the edge slot intact (same behaviour as the size >= 2 path).
					*/
					const removedPanel = this.movingLock(() => sourceGroup.model.removePanel(sourceItemId, {
						skipSetActive: false,
						skipSetActiveGroup: true
					}));
					if (!removedPanel) throw new Error(`dockview: No panel with id ${sourceItemId}`);
					const newGroup = this.createGroupAtLocation(targetLocation, this.sizingForDrop(referenceLocation), void 0, destinationGridview);
					this.movingLock(() => newGroup.model.openPanel(removedPanel, { skipSetGroupActive: true }));
					this.doSetGroupAndPanelActive(newGroup);
					this.fireDidMovePanel(removedPanel, sourceGroup);
					return;
				}
				const targetGroup = this.movingLock(() => this.doRemoveGroup(sourceGroup, {
					skipActive: true,
					skipDispose: true
				}));
				const updatedReferenceLocation = getGridLocation(destinationGroup.element);
				const location = getRelativeLocation(destinationGridview.orientation, updatedReferenceLocation, destinationTarget);
				this.movingLock(() => this.doAddGroup(targetGroup, location, this.sizingForDrop(updatedReferenceLocation), destinationGridview));
				this.setGroupLocationForRoot(targetGroup, destinationGridview);
				this.doSetGroupAndPanelActive(targetGroup);
				this.fireDidMovePanel(this.getGroupPanel(sourceItemId), sourceGroup);
			} else {
				/**
				* The group we are removing from has many panels, we need to remove the panels we are moving,
				* create a new group, add the panels to that new group and add the new group in an appropiate position
				*/
				const removedPanel = this.movingLock(() => sourceGroup.model.removePanel(sourceItemId, {
					skipSetActive: false,
					skipSetActiveGroup: true
				}));
				if (!removedPanel) throw new Error(`dockview: No panel with id ${sourceItemId}`);
				const dropLocation = getRelativeLocation(destinationGridview.orientation, referenceLocation, destinationTarget);
				const group = this.createGroupAtLocation(dropLocation, this.sizingForDrop(referenceLocation), void 0, destinationGridview);
				this.movingLock(() => group.model.openPanel(removedPanel, { skipSetGroupActive: true }));
				this.doSetGroupAndPanelActive(group);
				this.fireDidMovePanel(removedPanel, sourceGroup);
			}
		}
	}
	moveTabGroupToGroup(options) {
		const { sourceGroup, tabGroupId, destinationGroup, destinationTarget, destinationIndex } = options;
		const tabGroup = sourceGroup.model.getTabGroups().find((tg) => tg.id === tabGroupId);
		if (!tabGroup || tabGroup.panelIds.length === 0) return;
		const label = tabGroup.label;
		const color = tabGroup.color;
		const collapsed = tabGroup.collapsed;
		const componentParams = tabGroup.componentParams;
		const panelIds = [...tabGroup.panelIds];
		const referenceLocation = destinationTarget && destinationTarget !== "center" ? getGridLocation(destinationGroup.element) : void 0;
		const removedPanels = this.movingLock(() => panelIds.map((pid) => sourceGroup.model.removePanel(pid, {
			skipSetActive: false,
			skipSetActiveGroup: true
		})).filter((p) => p !== void 0));
		if (removedPanels.length === 0) return;
		const addPanelsToGroup = (targetGroup) => {
			this.movingLock(() => {
				for (const panel of removedPanels) targetGroup.model.openPanel(panel, {
					index: destinationIndex,
					skipSetActive: true,
					skipSetGroupActive: true
				});
			});
			const newTabGroup = targetGroup.model.createTabGroup({
				label,
				color,
				collapsed,
				componentParams
			});
			for (const panel of removedPanels) targetGroup.model.addPanelToTabGroup(newTabGroup.id, panel.id);
			if (!options.skipSetActive) this.doSetGroupAndPanelActive(targetGroup);
			for (const panel of removedPanels) this.fireDidMovePanel(panel, sourceGroup);
		};
		let targetGroup;
		if (!destinationTarget || destinationTarget === "center" || !referenceLocation) targetGroup = destinationGroup;
		else {
			const destinationGridview = this.getGridviewForGroup(destinationGroup);
			const dropLocation = getRelativeLocation(destinationGridview.orientation, referenceLocation, destinationTarget);
			targetGroup = this.createGroupAtLocation(dropLocation, this.sizingForDrop(referenceLocation), void 0, destinationGridview);
		}
		if (!this.keepEmptyGroups(options) && sourceGroup.model.size === 0 && sourceGroup !== targetGroup) this.doRemoveGroup(sourceGroup, { skipActive: true });
		addPanelsToGroup(targetGroup);
	}
	moveGroup(options) {
		this.mutation("move", () => this._doMoveGroup(options));
	}
	maximizeGroup(panel) {
		this.mutation("maximize", () => super.maximizeGroup(panel));
	}
	exitMaximizedGroup() {
		this.mutation("maximize", () => super.exitMaximizedGroup());
	}
	_doMoveGroup(options) {
		var _mergedPanels;
		const from = options.from.group;
		const to = options.to.group;
		const target = options.to.position;
		if (from === to) return;
		let source = from;
		let mergedPanels;
		if (target === "center") {
			const activePanel = from.activePanel;
			const tabGroupSnapshots = from.model.getTabGroups().map((tg) => ({
				label: tg.label,
				color: tg.color,
				collapsed: tg.collapsed,
				componentParams: tg.componentParams,
				panelIds: [...tg.panelIds]
			}));
			const panels = this.movingLock(() => [...from.panels].map((p) => from.model.removePanel(p.id, { skipSetActive: true })));
			if ((from === null || from === void 0 ? void 0 : from.model.size) === 0) this.doRemoveGroup(from, { skipActive: true });
			this.movingLock(() => {
				for (const panel of panels) to.model.openPanel(panel, {
					skipSetActive: panel !== activePanel,
					skipSetGroupActive: true
				});
			});
			mergedPanels = panels;
			for (const snapshot of tabGroupSnapshots) {
				const newTabGroup = to.model.createTabGroup({
					label: snapshot.label,
					color: snapshot.color,
					collapsed: snapshot.collapsed,
					componentParams: snapshot.componentParams
				});
				for (const panelId of snapshot.panelIds) to.model.addPanelToTabGroup(newTabGroup.id, panelId);
			}
			if (options.skipSetActive !== true) this.doSetGroupAndPanelActive(to);
			else if (!this.activePanel) this.doSetGroupAndPanelActive(to);
		} else {
			const isReorderWithinBranch = (() => {
				if (from.api.location.type === "edge" || to.api.location.type === "edge") return false;
				const root = this.getGridviewForGroup(from);
				if (root !== this.getGridviewForGroup(to)) return false;
				let fromLocation;
				let toLocation;
				try {
					fromLocation = getGridLocation(from.element);
					toLocation = getGridLocation(to.element);
				} catch (_unused) {
					return false;
				}
				if (fromLocation.length === 0 || toLocation.length === 0) return false;
				return sequenceEquals(tail(fromLocation)[0], tail(toLocation)[0]) && getLocationOrientation(root.orientation, toLocation) === getDirectionOrientation(target);
			})();
			if (from.api.location.type === "edge") {
				/**
				* Edge groups are permanent structural elements and must
				* stay anchored in their edge slot. Move the panels into a
				* new group; the auto-collapse listener registered in
				* addEdgeGroup will collapse the now-empty edge slot once
				* the last panel leaves. The placement code below then
				* positions `source` like any other moved group.
				*/
				const activePanel = from.activePanel;
				const tabGroupSnapshots = from.model.getTabGroups().map((tg) => ({
					label: tg.label,
					color: tg.color,
					collapsed: tg.collapsed,
					componentParams: tg.componentParams,
					panelIds: [...tg.panelIds]
				}));
				const movedPanels = this.movingLock(() => [...from.panels].map((p) => from.model.removePanel(p.id, { skipSetActive: true })));
				source = this.createGroup();
				this._onDidAddGroup.fire(source);
				this.movingLock(() => {
					for (const panel of movedPanels) source.model.openPanel(panel, {
						skipSetActive: panel !== activePanel,
						skipSetGroupActive: true
					});
				});
				for (const snapshot of tabGroupSnapshots) {
					const newTabGroup = source.model.createTabGroup({
						label: snapshot.label,
						color: snapshot.color,
						collapsed: snapshot.collapsed,
						componentParams: snapshot.componentParams
					});
					for (const panelId of snapshot.panelIds) source.model.addPanelToTabGroup(newTabGroup.id, panelId);
				}
			} else switch (from.api.location.type) {
				case "grid":
					this.gridview.removeView(getGridLocation(from.element));
					break;
				case "floating": {
					var _this$_floatingGroupS9;
					const selectedFloatingGroup = (_this$_floatingGroupS9 = this._floatingGroupService) === null || _this$_floatingGroupS9 === void 0 ? void 0 : _this$_floatingGroupS9.findByGroup(from);
					if (!selectedFloatingGroup) throw new Error("dockview: failed to find floating group");
					if (!this.detachFromNestedWindow(from)) selectedFloatingGroup.dispose();
					break;
				}
				case "popout": {
					var _this$_popoutWindowSe21, _this$_popoutWindowSe22;
					const selectedPopoutGroup = (_this$_popoutWindowSe21 = this._popoutWindowService) === null || _this$_popoutWindowSe21 === void 0 ? void 0 : _this$_popoutWindowSe21.findByGroup(from);
					if (!selectedPopoutGroup) throw new Error("dockview: failed to find popout group");
					if (this.detachFromNestedWindow(from)) break;
					(_this$_popoutWindowSe22 = this._popoutWindowService) === null || _this$_popoutWindowSe22 === void 0 || _this$_popoutWindowSe22.remove(selectedPopoutGroup);
					if (selectedPopoutGroup.referenceGroup) {
						const referenceGroup = this.getPanel(selectedPopoutGroup.referenceGroup);
						if (referenceGroup && !referenceGroup.api.isVisible) this.doRemoveGroup(referenceGroup, { skipActive: true });
					}
					selectedPopoutGroup.window.dispose();
					break;
				}
			}
			if (to.api.location.type === "grid" || to.api.location.type === "floating" || to.api.location.type === "popout") {
				const destGridview = this.getGridviewForGroup(to);
				const referenceLocation = getGridLocation(to.element);
				const dropLocation = getRelativeLocation(destGridview.orientation, referenceLocation, target);
				let size;
				if (isReorderWithinBranch && this.options.dropSizing !== "distribute") size = getDirectionOrientation(target) === "HORIZONTAL" ? from.api.width : from.api.height;
				else size = this.sizingForDrop(referenceLocation);
				destGridview.addView(source, size, dropLocation);
				this.setGroupLocationForRoot(source, destGridview);
			}
		}
		((_mergedPanels = mergedPanels) !== null && _mergedPanels !== void 0 ? _mergedPanels : source.panels).forEach((panel) => {
			this.fireDidMovePanel(panel, from);
		});
		this.debouncedUpdateAllPositions();
		if (options.skipSetActive === false) {
			const targetGroup = to !== null && to !== void 0 ? to : from;
			this.doSetGroupAndPanelActive(targetGroup);
		} else if (source !== from && options.skipSetActive !== true) this.doSetGroupAndPanelActive(source);
	}
	doSetGroupActive(group) {
		var _this$_onDidActivePan;
		super.doSetGroupActive(group);
		const activePanel = this.activePanel;
		if (!this._moving && activePanel !== ((_this$_onDidActivePan = this._onDidActivePanelChange.value) === null || _this$_onDidActivePan === void 0 ? void 0 : _this$_onDidActivePan.panel)) this.fireActivePanelChange(activePanel);
	}
	doSetGroupAndPanelActive(group) {
		var _this$_onDidActivePan2;
		super.doSetGroupActive(group);
		const activePanel = this.activePanel;
		if (group && this.hasMaximizedGroup() && !this.isMaximizedGroup(group)) this.exitMaximizedGroup();
		if (!this._moving && activePanel !== ((_this$_onDidActivePan2 = this._onDidActivePanelChange.value) === null || _this$_onDidActivePan2 === void 0 ? void 0 : _this$_onDidActivePan2.panel)) this.fireActivePanelChange(activePanel);
	}
	/**
	* The id for a group created without one: from `groupIdGenerator` when
	* the option is set, else the sequential counter. An id already in use is
	* skipped. The counter never repeats, so it can skip any number of live
	* ids (a restored layout may hold many); a custom generator is given a
	* bounded number of tries so a broken one cannot hang the call.
	*/
	getNextGroupId() {
		const generate = this.options.groupIdGenerator;
		if (!generate) {
			let id = this.nextGroupId.next();
			while (this._groups.has(id)) id = this.nextGroupId.next();
			return id;
		}
		for (let attempt = 0; attempt < MAX_GROUP_ID_ATTEMPTS; attempt++) {
			const id = generate();
			if (typeof id !== "string" || id.length === 0) throw new TypeError("dockview: groupIdGenerator must return a non-empty string");
			if (!this._groups.has(id)) return id;
		}
		throw new Error(`dockview: groupIdGenerator returned an id already in use ${MAX_GROUP_ID_ATTEMPTS} times in a row`);
	}
	createGroup(options) {
		var _options;
		(_options = options) !== null && _options !== void 0 || (options = {});
		let id = options === null || options === void 0 ? void 0 : options.id;
		if (id && this._groups.has(options.id)) {
			console.warn(`dockview: Duplicate group id ${options === null || options === void 0 ? void 0 : options.id}. reassigning group id to avoid errors`);
			id = void 0;
		}
		if (!id) id = this.getNextGroupId();
		const view = new DockviewGroupPanel(this, id, options);
		view.init({
			params: {},
			accessor: this
		});
		if (!this._groups.has(view.id)) {
			const disposable = new CompositeDisposable(view.model.onTabDragStart((event) => {
				var _this$_advancedDnDSer5;
				(_this$_advancedDnDSer5 = this._advancedDnDService) === null || _this$_advancedDnDSer5 === void 0 || _this$_advancedDnDSer5.dispatchWillDragPanel(event);
			}), view.model.onGroupDragStart((event) => {
				var _this$_advancedDnDSer6;
				(_this$_advancedDnDSer6 = this._advancedDnDService) === null || _this$_advancedDnDSer6 === void 0 || _this$_advancedDnDSer6.dispatchWillDragGroup(event);
			}), view.model.onMove((event) => {
				const { groupId, itemId, target, index, tabGroupId } = event;
				this.moveGroupOrPanel({
					from: {
						groupId,
						panelId: itemId,
						tabGroupId
					},
					to: {
						group: view,
						position: target,
						index
					}
				});
			}), view.model.onDidDrop((event) => {
				this._onDidDrop.fire(event);
			}), view.model.onWillDrop((event) => {
				var _this$_advancedDnDSer7;
				(_this$_advancedDnDSer7 = this._advancedDnDService) === null || _this$_advancedDnDSer7 === void 0 || _this$_advancedDnDSer7.dispatchWillDrop(event);
			}), view.model.onWillShowOverlay((event) => {
				var _this$_advancedDnDSer8;
				if (this.options.disableDnd) {
					event.preventDefault();
					return;
				}
				(_this$_advancedDnDSer8 = this._advancedDnDService) === null || _this$_advancedDnDSer8 === void 0 || _this$_advancedDnDSer8.dispatchWillShowOverlay(event);
			}), view.model.onUnhandledDragOver((event) => {
				this._onUnhandledDragOver.fire(event);
			}), view.model.onDidAddPanel((event) => {
				if (this._moving) return;
				this._onDidAddPanel.fire(event.panel);
			}), view.model.onDidRemovePanel((event) => {
				if (this._moving) return;
				this._onDidRemovePanel.fire(event.panel);
			}), view.model.onDidActivePanelChange((event) => {
				var _this$_onDidActivePan3;
				if (this._moving) return;
				if (event.panel !== this.activePanel) return;
				if (((_this$_onDidActivePan3 = this._onDidActivePanelChange.value) === null || _this$_onDidActivePan3 === void 0 ? void 0 : _this$_onDidActivePan3.panel) !== event.panel) this.fireActivePanelChange(event.panel);
			}), view.model.onDidPanelTitleChange(() => {
				this._bufferOnDidLayoutChange.fire("panelTitle");
			}), view.model.onDidPanelParametersChange(() => {
				this._bufferOnDidLayoutChange.fire("panelParameters");
			}));
			this._groups.set(view.id, {
				value: view,
				disposable
			});
		}
		view.initialize();
		return view;
	}
	createPanel(options, group) {
		var _options$tabComponent, _options$title, _options$params;
		const contentComponent = options.component;
		const tabComponent = (_options$tabComponent = options.tabComponent) !== null && _options$tabComponent !== void 0 ? _options$tabComponent : this.options.defaultTabComponent;
		const view = new DockviewPanelModel(this, options.id, contentComponent, tabComponent);
		const panel = new DockviewPanel(options.id, contentComponent, tabComponent, this, this._api, group, view, {
			renderer: options.renderer,
			minimumWidth: options.minimumWidth,
			minimumHeight: options.minimumHeight,
			maximumWidth: options.maximumWidth,
			maximumHeight: options.maximumHeight
		});
		panel.init({
			title: (_options$title = options.title) !== null && _options$title !== void 0 ? _options$title : options.id,
			params: (_options$params = options === null || options === void 0 ? void 0 : options.params) !== null && _options$params !== void 0 ? _options$params : {}
		});
		return panel;
	}
	/**
	* Sizing for a group created by a drop next to `referenceLocation`.
	* Gridview rewrites the index to 0 when a cross-axis drop wraps the
	* reference in a new branch, so one split index serves both paths.
	*/
	sizingForDrop(referenceLocation) {
		if (this.options.dropSizing === "distribute") return Sizing.Distribute;
		return Sizing.Split(referenceLocation.length === 0 ? 0 : referenceLocation[referenceLocation.length - 1]);
	}
	createGroupAtLocation(location, size, options, gridview = this.gridview) {
		const group = this.createGroup(options);
		this.doAddGroup(group, location, size, gridview);
		this.setGroupLocationForRoot(group, gridview);
		return group;
	}
	/**
	* Tag a group with the location and render / drop-target containers
	* matching the gridview root it now lives in: the main grid, a floating
	* window (shares the main containers), or a popout window (uses its own
	* window-local containers).
	*/
	setGroupLocationForRoot(group, gridview) {
		var _this$_popoutWindowSe23;
		const popout = (_this$_popoutWindowSe23 = this._popoutWindowService) === null || _this$_popoutWindowSe23 === void 0 ? void 0 : _this$_popoutWindowSe23.entries.find((entry) => entry.gridview === gridview);
		if (popout) {
			if (group.model.renderContainer !== popout.overlayRenderContainer) group.model.renderContainer = popout.overlayRenderContainer;
			group.model.dropTargetContainer = popout.dropTargetContainer;
			group.model.location = {
				type: "popout",
				getWindow: popout.getWindow,
				popoutUrl: popout.popoutUrl
			};
			return;
		}
		if (group.model.renderContainer !== this.overlayRenderContainer) group.model.renderContainer = this.overlayRenderContainer;
		group.model.dropTargetContainer = this.rootDropTargetContainer;
		group.model.location = gridview === this.gridview ? { type: "grid" } : { type: "floating" };
	}
	/**
	* Resolve which gridview root currently owns a group: the main grid, or
	* the nested gridview of the floating / popout window it lives in.
	*/
	getGridviewForGroup(group) {
		var _this$_floatingGroupS10, _this$_popoutWindowSe24;
		const floating = (_this$_floatingGroupS10 = this._floatingGroupService) === null || _this$_floatingGroupS10 === void 0 ? void 0 : _this$_floatingGroupS10.findByGroup(group);
		if (floating) return floating.gridview;
		const popout = (_this$_popoutWindowSe24 = this._popoutWindowService) === null || _this$_popoutWindowSe24 === void 0 ? void 0 : _this$_popoutWindowSe24.findByGroup(group);
		if (popout) return popout.gridview;
		return this.gridview;
	}
	/**
	* The groups that live within the same floating / popout window as `group`
	* (including `group` itself). Empty when `group` is in the main grid.
	*/
	nestedWindowMembers(group) {
		const gridview = this.getGridviewForGroup(group);
		if (gridview === this.gridview) return [];
		return this.groups.filter((candidate) => gridview.element.contains(candidate.element));
	}
	findGroup(panel) {
		var _Array$from$find;
		return (_Array$from$find = Array.from(this._groups.values()).find((group) => group.value.model.containsPanel(panel))) === null || _Array$from$find === void 0 ? void 0 : _Array$from$find.value;
	}
	orientationAtLocation(location, gridview = this.gridview) {
		const rootOrientation = gridview.orientation;
		return location.length % 2 == 1 ? rootOrientation : orthogonal(rootOrientation);
	}
	updateTheme() {
		var _this$_options$theme, _this$_shellThemeClas, _theme$gap, _this$_shellManager5, _theme$edgeGroupColla, _theme$tabGroupIndica;
		const theme = (_this$_options$theme = this._options.theme) !== null && _this$_options$theme !== void 0 ? _this$_options$theme : themeAbyss;
		(_this$_shellThemeClas = this._shellThemeClassnames) === null || _this$_shellThemeClas === void 0 || _this$_shellThemeClas.setClassNames(theme.className);
		const gap = (_theme$gap = theme.gap) !== null && _theme$gap !== void 0 ? _theme$gap : 0;
		this.gridview.margin = gap;
		for (const gridview of this.nestedGridviews()) gridview.margin = gap;
		(_this$_shellManager5 = this._shellManager) === null || _this$_shellManager5 === void 0 || _this$_shellManager5.updateTheme(gap, (_theme$edgeGroupColla = theme.edgeGroupCollapsedSize) !== null && _theme$edgeGroupColla !== void 0 ? _theme$edgeGroupColla : 35);
		if (theme.dndOverlayBorder === void 0) {
			var _this$_shellManager6;
			this.element.style.removeProperty("--dv-drag-over-border");
			(_this$_shellManager6 = this._shellManager) === null || _this$_shellManager6 === void 0 || _this$_shellManager6.element.style.removeProperty("--dv-drag-over-border");
		} else {
			var _this$_shellManager7;
			this.element.style.setProperty("--dv-drag-over-border", theme.dndOverlayBorder);
			(_this$_shellManager7 = this._shellManager) === null || _this$_shellManager7 === void 0 || _this$_shellManager7.element.style.setProperty("--dv-drag-over-border", theme.dndOverlayBorder);
		}
		switch (theme.dndOverlayMounting) {
			case "absolute":
				this.rootDropTargetContainer.disabled = false;
				break;
			default:
				this.rootDropTargetContainer.disabled = true;
				break;
		}
		const indicatorNone = ((_theme$tabGroupIndica = theme.tabGroupIndicator) !== null && _theme$tabGroupIndica !== void 0 ? _theme$tabGroupIndica : "wrap") === "none";
		toggleClass(this.element, "dv-tab-group-indicator-none", indicatorNone);
		if (this._shellManager) toggleClass(this._shellManager.element, "dv-tab-group-indicator-none", indicatorNone);
		for (const group of this.groups) group.model.updateTabGroups();
	}
};

//#endregion
//#region src/gridview/gridviewComponent.ts
var GridviewComponent = class extends BaseGrid {
	get orientation() {
		return this.gridview.orientation;
	}
	set orientation(value) {
		this.gridview.orientation = value;
	}
	get options() {
		return this._options;
	}
	get deserializer() {
		return this._deserializer;
	}
	set deserializer(value) {
		this._deserializer = value;
	}
	constructor(container, options) {
		var _options$proportional;
		super(container, {
			proportionalLayout: (_options$proportional = options.proportionalLayout) !== null && _options$proportional !== void 0 ? _options$proportional : true,
			orientation: options.orientation,
			styles: options.hideBorders ? { separatorBorder: "transparent" } : void 0,
			disableAutoResizing: options.disableAutoResizing,
			className: options.className
		});
		this._onDidLayoutfromJSON = new Emitter();
		this.onDidLayoutFromJSON = this._onDidLayoutfromJSON.event;
		this._onDidRemoveGroup = new Emitter();
		this.onDidRemoveGroup = this._onDidRemoveGroup.event;
		this._onDidAddGroup = new Emitter();
		this.onDidAddGroup = this._onDidAddGroup.event;
		this._onDidActiveGroupChange = new Emitter();
		this.onDidActiveGroupChange = this._onDidActiveGroupChange.event;
		this._options = options;
		this.addDisposables(this._onDidAddGroup, this._onDidRemoveGroup, this._onDidActiveGroupChange, this.onDidAdd((event) => {
			this._onDidAddGroup.fire(event);
		}), this.onDidRemove((event) => {
			this._onDidRemoveGroup.fire(event);
		}), this.onDidActiveChange((event) => {
			this._onDidActiveGroupChange.fire(event);
		}));
		this.layoutFromElement();
	}
	updateOptions(options) {
		super.updateOptions(options);
		const hasOrientationChanged = typeof options.orientation === "string" && this.gridview.orientation !== options.orientation;
		this._options = _objectSpread2(_objectSpread2({}, this.options), options);
		if (hasOrientationChanged) this.gridview.orientation = options.orientation;
		this.layout(this.gridview.width, this.gridview.height, true);
	}
	removePanel(panel) {
		this.removeGroup(panel);
	}
	/**
	* Serialize the current state of the layout
	*
	* @returns A JSON respresentation of the layout
	*/
	toJSON() {
		var _this$activeGroup;
		return {
			grid: this.gridview.serialize(),
			activePanel: (_this$activeGroup = this.activeGroup) === null || _this$activeGroup === void 0 ? void 0 : _this$activeGroup.id
		};
	}
	setVisible(panel, visible) {
		this.gridview.setViewVisible(getGridLocation(panel.element), visible);
	}
	setActive(panel) {
		this._groups.forEach((value, _key) => {
			value.value.setActive(panel === value.value);
		});
	}
	focus() {
		var _this$activeGroup2;
		(_this$activeGroup2 = this.activeGroup) === null || _this$activeGroup2 === void 0 || _this$activeGroup2.focus();
	}
	fromJSON(serializedGridview) {
		this.clear();
		const { grid, activePanel } = serializedGridview;
		try {
			const queue = [];
			const width = this.width;
			const height = this.height;
			this.gridview.deserialize(grid, { fromJSON: (node) => {
				const { data } = node;
				const view = this.options.createComponent({
					id: data.id,
					name: data.component
				});
				queue.push(() => view.init({
					params: data.params,
					minimumWidth: data.minimumWidth,
					maximumWidth: data.maximumWidth,
					minimumHeight: data.minimumHeight,
					maximumHeight: data.maximumHeight,
					priority: data.priority,
					snap: !!data.snap,
					accessor: this,
					isVisible: node.visible
				}));
				this._onDidAddGroup.fire(view);
				this.registerPanel(view);
				return view;
			} });
			this.layout(width, height, true);
			queue.forEach((f) => f());
			if (typeof activePanel === "string") {
				const panel = this.getPanel(activePanel);
				if (panel) this.doSetGroupActive(panel);
			}
		} catch (err) {
			/**
			* To remove a group we cannot call this.removeGroup(...) since this makes assumptions about
			* the underlying HTMLElement existing in the Gridview.
			*/
			for (const group of this.groups) {
				group.dispose();
				this._groups.delete(group.id);
				this._onDidRemoveGroup.fire(group);
			}
			this.clear();
			/**
			* even though we have cleaned-up we still want to inform the caller of their error
			* and we'll do this through re-throwing the original error since afterall you would
			* expect trying to load a corrupted layout to result in an error and not silently fail...
			*/
			throw err;
		}
		this._onDidLayoutfromJSON.fire();
	}
	clear() {
		const hasActiveGroup = this.activeGroup;
		const groups = Array.from(this._groups.values());
		for (const group of groups) {
			group.disposable.dispose();
			this.doRemoveGroup(group.value, { skipActive: true });
		}
		if (hasActiveGroup) this.doSetGroupActive(void 0);
		this.gridview.clear();
	}
	movePanel(panel, options) {
		var _this$_groups$get;
		const referenceGroup = (_this$_groups$get = this._groups.get(options.reference)) === null || _this$_groups$get === void 0 ? void 0 : _this$_groups$get.value;
		if (!referenceGroup) throw new Error(`reference group ${options.reference} does not exist`);
		const target = toTarget(options.direction);
		if (target === "center") throw new Error(`${target} not supported as an option`);
		const location = getGridLocation(referenceGroup.element);
		const relativeLocation = getRelativeLocation(this.gridview.orientation, location, target);
		const removedPanel = this.gridview.remove(panel);
		this.doAddGroup(removedPanel, relativeLocation, options.size);
	}
	addPanel(options) {
		var _options$location, _options$position, _options$params;
		let relativeLocation = (_options$location = options.location) !== null && _options$location !== void 0 ? _options$location : [0];
		if ((_options$position = options.position) === null || _options$position === void 0 ? void 0 : _options$position.referencePanel) {
			var _this$_groups$get2;
			const referenceGroup = (_this$_groups$get2 = this._groups.get(options.position.referencePanel)) === null || _this$_groups$get2 === void 0 ? void 0 : _this$_groups$get2.value;
			if (!referenceGroup) throw new Error(`reference group ${options.position.referencePanel} does not exist`);
			const target = toTarget(options.position.direction);
			if (target === "center") throw new Error(`${target} not supported as an option`);
			else {
				const location = getGridLocation(referenceGroup.element);
				relativeLocation = getRelativeLocation(this.gridview.orientation, location, target);
			}
		}
		const view = this.options.createComponent({
			id: options.id,
			name: options.component
		});
		view.init({
			params: (_options$params = options.params) !== null && _options$params !== void 0 ? _options$params : {},
			minimumWidth: options.minimumWidth,
			maximumWidth: options.maximumWidth,
			minimumHeight: options.minimumHeight,
			maximumHeight: options.maximumHeight,
			priority: options.priority,
			snap: !!options.snap,
			accessor: this,
			isVisible: true
		});
		this.doAddGroup(view, relativeLocation, options.size);
		this.registerPanel(view);
		this.doSetGroupActive(view);
		return view;
	}
	registerPanel(panel) {
		const disposable = new CompositeDisposable(panel.api.onDidFocusChange((event) => {
			if (!event.isFocused) return;
			this._groups.forEach((groupItem) => {
				const group = groupItem.value;
				group.setActive(group === panel);
			});
		}));
		this._groups.set(panel.id, {
			value: panel,
			disposable
		});
	}
	moveGroup(referenceGroup, groupId, target) {
		const sourceGroup = this.getPanel(groupId);
		if (!sourceGroup) throw new Error("invalid operation");
		const referenceLocation = getGridLocation(referenceGroup.element);
		const [targetParentLocation, to] = tail(getRelativeLocation(this.gridview.orientation, referenceLocation, target));
		const [sourceParentLocation, from] = tail(getGridLocation(sourceGroup.element));
		if (sequenceEquals(sourceParentLocation, targetParentLocation)) {
			this.gridview.moveView(sourceParentLocation, from, to);
			return;
		}
		const targetGroup = this.doRemoveGroup(sourceGroup, {
			skipActive: true,
			skipDispose: true
		});
		const updatedReferenceLocation = getGridLocation(referenceGroup.element);
		const location = getRelativeLocation(this.gridview.orientation, updatedReferenceLocation, target);
		this.doAddGroup(targetGroup, location);
	}
	removeGroup(group) {
		super.removeGroup(group);
	}
	dispose() {
		super.dispose();
		this._onDidLayoutfromJSON.dispose();
	}
};

//#endregion
//#region src/splitview/splitviewComponent.ts
/**
* A high-level implementation of splitview that works using 'panels'
*/
var SplitviewComponent = class extends Resizable {
	get panels() {
		return this.splitview.getViews();
	}
	get options() {
		return this._options;
	}
	get length() {
		return this._panels.size;
	}
	get orientation() {
		return this.splitview.orientation;
	}
	get splitview() {
		return this._splitview;
	}
	set splitview(value) {
		if (this._splitview) this._splitview.dispose();
		this._splitview = value;
		this._splitviewChangeDisposable.value = new CompositeDisposable(this._splitview.onDidSashEnd(() => {
			this._onDidLayoutChange.fire({ reasons: /* @__PURE__ */ new Set(["geometry"]) });
		}), this._splitview.onDidAddView((e) => this._onDidAddView.fire(e)), this._splitview.onDidRemoveView((e) => this._onDidRemoveView.fire(e)));
	}
	get minimumSize() {
		return this.splitview.minimumSize;
	}
	get maximumSize() {
		return this.splitview.maximumSize;
	}
	get height() {
		return this.splitview.orientation === "HORIZONTAL" ? this.splitview.orthogonalSize : this.splitview.size;
	}
	get width() {
		return this.splitview.orientation === "HORIZONTAL" ? this.splitview.size : this.splitview.orthogonalSize;
	}
	constructor(container, options) {
		var _options$className;
		super(document.createElement("div"), options.disableAutoResizing);
		this._splitviewChangeDisposable = new MutableDisposable();
		this._panels = /* @__PURE__ */ new Map();
		this._onDidLayoutfromJSON = new Emitter();
		this.onDidLayoutFromJSON = this._onDidLayoutfromJSON.event;
		this._onDidAddView = new Emitter();
		this.onDidAddView = this._onDidAddView.event;
		this._onDidRemoveView = new Emitter();
		this.onDidRemoveView = this._onDidRemoveView.event;
		this._onDidLayoutChange = new Emitter();
		this.onDidLayoutChange = this._onDidLayoutChange.event;
		this.element.style.height = "100%";
		this.element.style.width = "100%";
		this._classNames = new Classnames(this.element);
		this._classNames.setClassNames((_options$className = options.className) !== null && _options$className !== void 0 ? _options$className : "");
		container.appendChild(this.element);
		this._options = options;
		this.splitview = new Splitview(this.element, options);
		this.addDisposables(this._onDidAddView, this._onDidLayoutfromJSON, this._onDidRemoveView, this._onDidLayoutChange);
		this.layoutFromElement();
	}
	updateOptions(options) {
		if ("className" in options) {
			var _options$className2;
			this._classNames.setClassNames((_options$className2 = options.className) !== null && _options$className2 !== void 0 ? _options$className2 : "");
		}
		if ("disableAutoResizing" in options) {
			var _options$disableAutoR;
			this.disableResizing = (_options$disableAutoR = options.disableAutoResizing) !== null && _options$disableAutoR !== void 0 ? _options$disableAutoR : false;
		}
		if (typeof options.orientation === "string" && options.orientation !== this.splitview.orientation) {
			this.splitview.orientation = options.orientation;
			for (const panel of this.panels) panel.orientation = options.orientation;
		}
		this._options = _objectSpread2(_objectSpread2({}, this.options), options);
		this.splitview.layout(this.splitview.size, this.splitview.orthogonalSize);
	}
	focus() {
		var _this$_activePanel;
		(_this$_activePanel = this._activePanel) === null || _this$_activePanel === void 0 || _this$_activePanel.focus();
	}
	movePanel(from, to) {
		this.splitview.moveView(from, to);
	}
	setVisible(panel, visible) {
		const index = this.panels.indexOf(panel);
		this.splitview.setViewVisible(index, visible);
	}
	setActive(panel, skipFocus) {
		this._activePanel = panel;
		this.panels.filter((v) => v !== panel).forEach((v) => {
			v.api._onDidActiveChange.fire({ isActive: false });
			if (!skipFocus) v.focus();
		});
		panel.api._onDidActiveChange.fire({ isActive: true });
		if (!skipFocus) panel.focus();
	}
	removePanel(panel, sizing) {
		const item = this._panels.get(panel.id);
		if (!item) throw new Error(`unknown splitview panel ${panel.id}`);
		item.dispose();
		this._panels.delete(panel.id);
		const index = this.panels.indexOf(panel);
		this.splitview.removeView(index, sizing).dispose();
		const panels = this.panels;
		if (panels.length > 0) this.setActive(panels[panels.length - 1]);
	}
	getPanel(id) {
		return this.panels.find((view) => view.id === id);
	}
	addPanel(options) {
		var _options$params;
		if (this._panels.has(options.id)) throw new Error(`panel ${options.id} already exists`);
		const view = this.options.createComponent({
			id: options.id,
			name: options.component
		});
		view.orientation = this.splitview.orientation;
		view.init({
			params: (_options$params = options.params) !== null && _options$params !== void 0 ? _options$params : {},
			minimumSize: options.minimumSize,
			maximumSize: options.maximumSize,
			snap: options.snap,
			priority: options.priority,
			accessor: this
		});
		const size = typeof options.size === "number" ? options.size : Sizing.Distribute;
		const index = typeof options.index === "number" ? options.index : void 0;
		this.splitview.addView(view, size, index);
		this.doAddView(view);
		this.setActive(view);
		return view;
	}
	layout(width, height) {
		const [size, orthogonalSize] = this.splitview.orientation === "HORIZONTAL" ? [width, height] : [height, width];
		this.splitview.layout(size, orthogonalSize);
	}
	doAddView(view) {
		const disposable = view.api.onDidFocusChange((event) => {
			if (!event.isFocused) return;
			this.setActive(view, true);
		});
		this._panels.set(view.id, disposable);
	}
	toJSON() {
		var _this$_activePanel2;
		return {
			views: this.splitview.getViews().map((view, i) => {
				const cachedVisibleSize = this.splitview.getViewCachedVisibleSize(i);
				const hidden = typeof cachedVisibleSize === "number";
				return _objectSpread2({
					size: hidden ? cachedVisibleSize : this.splitview.getViewSize(i),
					data: view.toJSON(),
					snap: !!view.snap,
					priority: view.priority
				}, hidden ? { visible: false } : {});
			}),
			activeView: (_this$_activePanel2 = this._activePanel) === null || _this$_activePanel2 === void 0 ? void 0 : _this$_activePanel2.id,
			size: this.splitview.size,
			orientation: this.splitview.orientation
		};
	}
	fromJSON(serializedSplitview) {
		this.clear();
		const { views, orientation, size, activeView } = serializedSplitview;
		const queue = [];
		const width = this.width;
		const height = this.height;
		this.splitview = new Splitview(this.element, {
			orientation,
			proportionalLayout: this.options.proportionalLayout,
			descriptor: {
				size,
				views: views.map((view) => {
					const data = view.data;
					if (this._panels.has(data.id)) throw new Error(`panel ${data.id} already exists`);
					const panel = this.options.createComponent({
						id: data.id,
						name: data.component
					});
					queue.push(() => {
						var _data$params;
						panel.init({
							params: (_data$params = data.params) !== null && _data$params !== void 0 ? _data$params : {},
							minimumSize: data.minimumSize,
							maximumSize: data.maximumSize,
							snap: view.snap,
							priority: view.priority,
							accessor: this
						});
						if (view.visible === false) panel.setVisible(false);
					});
					panel.orientation = orientation;
					this.doAddView(panel);
					setTimeout(() => {
						this._onDidAddView.fire(panel);
					}, 0);
					return {
						size: view.size,
						view: panel,
						visible: view.visible
					};
				})
			}
		});
		this.layout(width, height);
		queue.forEach((f) => f());
		if (typeof activeView === "string") {
			const panel = this.getPanel(activeView);
			if (panel) this.setActive(panel);
		}
		this._onDidLayoutfromJSON.fire();
	}
	clear() {
		for (const disposable of this._panels.values()) disposable.dispose();
		this._panels.clear();
		while (this.splitview.length > 0) this.splitview.removeView(0, Sizing.Distribute, true).dispose();
	}
	dispose() {
		for (const disposable of this._panels.values()) disposable.dispose();
		this._panels.clear();
		const views = this.splitview.getViews();
		this._splitviewChangeDisposable.dispose();
		this.splitview.dispose();
		for (const view of views) view.dispose();
		this.element.remove();
		super.dispose();
	}
};

//#endregion
//#region src/paneview/defaultPaneviewHeader.ts
var DefaultHeader = class extends CompositeDisposable {
	get element() {
		return this._element;
	}
	constructor() {
		super();
		this._expandedIcon = createExpandMoreButton();
		this._collapsedIcon = createChevronRightButton();
		this.disposable = new MutableDisposable();
		this.apiRef = { api: null };
		this._element = document.createElement("div");
		this.element.className = "dv-default-header";
		this._content = document.createElement("span");
		this._expander = document.createElement("div");
		this._expander.className = "dv-pane-header-icon";
		this.element.appendChild(this._expander);
		this.element.appendChild(this._content);
		this.addDisposables(addDisposableListener(this._element, "click", () => {
			var _this$apiRef$api;
			(_this$apiRef$api = this.apiRef.api) === null || _this$apiRef$api === void 0 || _this$apiRef$api.setExpanded(!this.apiRef.api.isExpanded);
		}));
	}
	init(params) {
		this.apiRef.api = params.api;
		this._content.textContent = params.title;
		this.updateIcon();
		this.disposable.value = params.api.onDidExpansionChange(() => {
			this.updateIcon();
		});
	}
	updateIcon() {
		var _this$apiRef$api2;
		const isExpanded = !!((_this$apiRef$api2 = this.apiRef.api) === null || _this$apiRef$api2 === void 0 ? void 0 : _this$apiRef$api2.isExpanded);
		toggleClass(this._expander, "collapsed", !isExpanded);
		if (isExpanded) {
			if (this._expander.contains(this._collapsedIcon)) this._collapsedIcon.remove();
			if (!this._expander.contains(this._expandedIcon)) this._expander.appendChild(this._expandedIcon);
		} else {
			if (this._expander.contains(this._expandedIcon)) this._expandedIcon.remove();
			if (!this._expander.contains(this._collapsedIcon)) this._expander.appendChild(this._collapsedIcon);
		}
	}
	update(_params) {}
	dispose() {
		this.disposable.dispose();
		super.dispose();
	}
};

//#endregion
//#region src/paneview/paneviewComponent.ts
const nextLayoutId = sequentialNumberGenerator();
const HEADER_SIZE = 22;
const MINIMUM_BODY_SIZE = 0;
const MAXIMUM_BODY_SIZE = Number.MAX_SAFE_INTEGER;
var PaneFramework = class extends DraggablePaneviewPanel {
	constructor(options) {
		super({
			accessor: options.accessor,
			id: options.id,
			component: options.component,
			headerComponent: options.headerComponent,
			orientation: options.orientation,
			isExpanded: options.isExpanded,
			disableDnd: options.disableDnd,
			headerSize: options.headerSize,
			minimumBodySize: options.minimumBodySize,
			maximumBodySize: options.maximumBodySize
		});
		this.options = options;
	}
	getBodyComponent() {
		return this.options.body;
	}
	getHeaderComponent() {
		return this.options.header;
	}
};
var PaneviewComponent = class extends Resizable {
	get id() {
		return this._id;
	}
	get panels() {
		return this.paneview.getPanes();
	}
	set paneview(value) {
		this._paneview = value;
		this._disposable.value = new CompositeDisposable(this._paneview.onDidChange(() => {
			this._onDidLayoutChange.fire({ reasons: /* @__PURE__ */ new Set(["geometry"]) });
		}), this._paneview.onDidAddView((e) => this._onDidAddView.fire(e)), this._paneview.onDidRemoveView((e) => this._onDidRemoveView.fire(e)));
	}
	get paneview() {
		return this._paneview;
	}
	get minimumSize() {
		return this.paneview.minimumSize;
	}
	get maximumSize() {
		return this.paneview.maximumSize;
	}
	get height() {
		return this.paneview.orientation === "HORIZONTAL" ? this.paneview.orthogonalSize : this.paneview.size;
	}
	get width() {
		return this.paneview.orientation === "HORIZONTAL" ? this.paneview.size : this.paneview.orthogonalSize;
	}
	get options() {
		return this._options;
	}
	constructor(container, options) {
		var _options$className;
		super(document.createElement("div"), options.disableAutoResizing);
		this._id = nextLayoutId.next();
		this._disposable = new MutableDisposable();
		this._viewDisposables = /* @__PURE__ */ new Map();
		this._onDidLayoutfromJSON = new Emitter();
		this.onDidLayoutFromJSON = this._onDidLayoutfromJSON.event;
		this._onDidLayoutChange = new Emitter();
		this.onDidLayoutChange = this._onDidLayoutChange.event;
		this._onDidDrop = new Emitter();
		this.onDidDrop = this._onDidDrop.event;
		this._onDidAddView = new Emitter();
		this.onDidAddView = this._onDidAddView.event;
		this._onDidRemoveView = new Emitter();
		this.onDidRemoveView = this._onDidRemoveView.event;
		this._onUnhandledDragOver = new Emitter();
		this.onUnhandledDragOver = this._onUnhandledDragOver.event;
		this.element.style.height = "100%";
		this.element.style.width = "100%";
		this.addDisposables(this._onDidLayoutChange, this._onDidLayoutfromJSON, this._onDidDrop, this._onDidAddView, this._onDidRemoveView, this._onUnhandledDragOver);
		this._classNames = new Classnames(this.element);
		this._classNames.setClassNames((_options$className = options.className) !== null && _options$className !== void 0 ? _options$className : "");
		container.appendChild(this.element);
		this._options = options;
		this.paneview = new Paneview(this.element, { orientation: "VERTICAL" });
		this.addDisposables(this._disposable);
	}
	setVisible(panel, visible) {
		const index = this.panels.indexOf(panel);
		this.paneview.setViewVisible(index, visible);
	}
	focus() {}
	updateOptions(options) {
		if ("className" in options) {
			var _options$className2;
			this._classNames.setClassNames((_options$className2 = options.className) !== null && _options$className2 !== void 0 ? _options$className2 : "");
		}
		if ("disableAutoResizing" in options) {
			var _options$disableAutoR;
			this.disableResizing = (_options$disableAutoR = options.disableAutoResizing) !== null && _options$disableAutoR !== void 0 ? _options$disableAutoR : false;
		}
		this._options = _objectSpread2(_objectSpread2({}, this.options), options);
	}
	addPanel(options) {
		var _header, _options$headerSize, _options$params;
		const body = this.options.createComponent({
			id: options.id,
			name: options.component
		});
		let header;
		if (options.headerComponent && this.options.createHeaderComponent) header = this.options.createHeaderComponent({
			id: options.id,
			name: options.headerComponent
		});
		(_header = header) !== null && _header !== void 0 || (header = new DefaultHeader());
		const view = new PaneFramework({
			id: options.id,
			component: options.component,
			headerComponent: options.headerComponent,
			header,
			body,
			orientation: "VERTICAL",
			isExpanded: !!options.isExpanded,
			disableDnd: !!this.options.disableDnd,
			accessor: this,
			headerSize: (_options$headerSize = options.headerSize) !== null && _options$headerSize !== void 0 ? _options$headerSize : HEADER_SIZE,
			minimumBodySize: MINIMUM_BODY_SIZE,
			maximumBodySize: MAXIMUM_BODY_SIZE
		});
		this.doAddPanel(view);
		const size = typeof options.size === "number" ? options.size : Sizing.Distribute;
		const index = typeof options.index === "number" ? options.index : void 0;
		view.init({
			params: (_options$params = options.params) !== null && _options$params !== void 0 ? _options$params : {},
			minimumBodySize: options.minimumBodySize,
			maximumBodySize: options.maximumBodySize,
			isExpanded: options.isExpanded,
			title: options.title,
			containerApi: new PaneviewApi(this),
			accessor: this
		});
		this.paneview.addPane(view, size, index);
		view.orientation = this.paneview.orientation;
		return view;
	}
	removePanel(panel) {
		const index = this.panels.indexOf(panel);
		if (index < 0) throw new Error(`unknown paneview panel ${panel.id}`);
		this.paneview.removePane(index);
		this.doRemovePanel(panel);
	}
	movePanel(from, to) {
		this.paneview.moveView(from, to);
	}
	getPanel(id) {
		return this.panels.find((view) => view.id === id);
	}
	layout(width, height) {
		const [size, orthogonalSize] = this.paneview.orientation === "HORIZONTAL" ? [width, height] : [height, width];
		this.paneview.layout(size, orthogonalSize);
	}
	toJSON() {
		const maximum = (value) => value === Number.MAX_SAFE_INTEGER || value === Number.POSITIVE_INFINITY ? void 0 : value;
		const minimum = (value) => value <= 0 ? void 0 : value;
		return {
			views: this.paneview.getPanes().map((view, i) => {
				const cachedVisibleSize = this.paneview.getViewCachedVisibleSize(i);
				const hidden = typeof cachedVisibleSize === "number";
				return _objectSpread2({
					size: hidden ? cachedVisibleSize : this.paneview.getViewSize(i),
					data: view.toJSON(),
					minimumSize: minimum(view.minimumBodySize),
					maximumSize: maximum(view.maximumBodySize),
					headerSize: view.headerSize,
					expanded: view.isExpanded()
				}, hidden ? { visible: false } : {});
			}),
			size: this.paneview.size
		};
	}
	fromJSON(serializedPaneview) {
		this.clear();
		const { views, size } = serializedPaneview;
		const queue = [];
		const width = this.width;
		const height = this.height;
		this.paneview.dispose();
		this.paneview = new Paneview(this.element, {
			orientation: "VERTICAL",
			descriptor: {
				size,
				views: views.map((view) => {
					var _header2, _view$headerSize, _view$minimumSize, _view$maximumSize;
					const data = view.data;
					const body = this.options.createComponent({
						id: data.id,
						name: data.component
					});
					let header;
					if (data.headerComponent && this.options.createHeaderComponent) header = this.options.createHeaderComponent({
						id: data.id,
						name: data.headerComponent
					});
					(_header2 = header) !== null && _header2 !== void 0 || (header = new DefaultHeader());
					const panel = new PaneFramework({
						id: data.id,
						component: data.component,
						headerComponent: data.headerComponent,
						header,
						body,
						orientation: "VERTICAL",
						isExpanded: !!view.expanded,
						disableDnd: !!this.options.disableDnd,
						accessor: this,
						headerSize: (_view$headerSize = view.headerSize) !== null && _view$headerSize !== void 0 ? _view$headerSize : HEADER_SIZE,
						minimumBodySize: (_view$minimumSize = view.minimumSize) !== null && _view$minimumSize !== void 0 ? _view$minimumSize : MINIMUM_BODY_SIZE,
						maximumBodySize: (_view$maximumSize = view.maximumSize) !== null && _view$maximumSize !== void 0 ? _view$maximumSize : MAXIMUM_BODY_SIZE
					});
					this.doAddPanel(panel);
					queue.push(() => {
						var _data$params;
						panel.init({
							params: (_data$params = data.params) !== null && _data$params !== void 0 ? _data$params : {},
							minimumBodySize: view.minimumSize,
							maximumBodySize: view.maximumSize,
							title: data.title,
							isExpanded: !!view.expanded,
							containerApi: new PaneviewApi(this),
							accessor: this
						});
						panel.orientation = this.paneview.orientation;
						if (view.visible === false) panel.setVisible(false);
					});
					setTimeout(() => {
						this._onDidAddView.fire(panel);
					}, 0);
					return {
						size: view.size,
						view: panel,
						visible: view.visible
					};
				})
			}
		});
		this.layout(width, height);
		queue.forEach((f) => f());
		this._onDidLayoutfromJSON.fire();
	}
	clear() {
		for (const [_, value] of this._viewDisposables.entries()) value.dispose();
		this._viewDisposables.clear();
		const width = this.width;
		const height = this.height;
		this.paneview.dispose();
		this.paneview = new Paneview(this.element, { orientation: "VERTICAL" });
		this.layout(width, height);
	}
	doAddPanel(panel) {
		const disposable = new CompositeDisposable(panel.onDidDrop((event) => {
			this._onDidDrop.fire(event);
		}), panel.onUnhandledDragOver((event) => {
			this._onUnhandledDragOver.fire(event);
		}));
		this._viewDisposables.set(panel.id, disposable);
	}
	doRemovePanel(panel) {
		const disposable = this._viewDisposables.get(panel.id);
		if (disposable) {
			disposable.dispose();
			this._viewDisposables.delete(panel.id);
		}
	}
	dispose() {
		super.dispose();
		for (const [_, value] of this._viewDisposables.entries()) value.dispose();
		this._viewDisposables.clear();
		this.element.remove();
		this.paneview.dispose();
	}
};

//#endregion
//#region src/splitview/splitviewPanel.ts
var SplitviewPanel = class extends BasePanelView {
	get priority() {
		return this._priority;
	}
	set orientation(value) {
		this._orientation = value;
	}
	get orientation() {
		return this._orientation;
	}
	get minimumSize() {
		const size = typeof this._minimumSize === "function" ? this._minimumSize() : this._minimumSize;
		if (size !== this._evaluatedMinimumSize) {
			this._evaluatedMinimumSize = size;
			this.updateConstraints();
		}
		return size;
	}
	get maximumSize() {
		const size = typeof this._maximumSize === "function" ? this._maximumSize() : this._maximumSize;
		if (size !== this._evaluatedMaximumSize) {
			this._evaluatedMaximumSize = size;
			this.updateConstraints();
		}
		return size;
	}
	get snap() {
		return this._snap;
	}
	constructor(id, componentName) {
		super(id, componentName, new SplitviewPanelApiImpl(id, componentName));
		this._evaluatedMinimumSize = 0;
		this._evaluatedMaximumSize = Number.POSITIVE_INFINITY;
		this._minimumSize = 0;
		this._maximumSize = Number.POSITIVE_INFINITY;
		this._snap = false;
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		this.api.initialize(this);
		this.addDisposables(this._onDidChange, this.api.onWillVisibilityChange((event) => {
			const { isVisible } = event;
			const { accessor } = this._params;
			accessor.setVisible(this, isVisible);
		}), this.api.onActiveChange(() => {
			const { accessor } = this._params;
			accessor.setActive(this);
		}), this.api.onDidConstraintsChangeInternal((event) => {
			if (typeof event.minimumSize === "number" || typeof event.minimumSize === "function") this._minimumSize = event.minimumSize;
			if (typeof event.maximumSize === "number" || typeof event.maximumSize === "function") this._maximumSize = event.maximumSize;
			this.updateConstraints();
		}), this.api.onDidSizeChange((event) => {
			this._onDidChange.fire({ size: event.size });
		}));
	}
	setVisible(isVisible) {
		this.api._onDidVisibilityChange.fire({ isVisible });
	}
	setActive(isActive) {
		this.api._onDidActiveChange.fire({ isActive });
	}
	layout(size, orthogonalSize) {
		const [width, height] = this.orientation === "HORIZONTAL" ? [size, orthogonalSize] : [orthogonalSize, size];
		super.layout(width, height);
	}
	init(parameters) {
		super.init(parameters);
		this._priority = parameters.priority;
		if (parameters.minimumSize) this._minimumSize = parameters.minimumSize;
		if (parameters.maximumSize) this._maximumSize = parameters.maximumSize;
		if (parameters.snap) this._snap = parameters.snap;
	}
	toJSON() {
		const maximum = (value) => value === Number.MAX_SAFE_INTEGER || value === Number.POSITIVE_INFINITY ? void 0 : value;
		const minimum = (value) => value <= 0 ? void 0 : value;
		return _objectSpread2(_objectSpread2({}, super.toJSON()), {}, {
			minimumSize: minimum(this.minimumSize),
			maximumSize: maximum(this.maximumSize)
		});
	}
	updateConstraints() {
		this.api._onDidConstraintsChange.fire({
			maximumSize: this._evaluatedMaximumSize,
			minimumSize: this._evaluatedMinimumSize
		});
	}
};

//#endregion
//#region src/api/entryPoints.ts
function createDockview(element, options) {
	return new DockviewComponent(element, options).api;
}
function createSplitview(element, options) {
	return new SplitviewApi(new SplitviewComponent(element, options));
}
function createGridview(element, options) {
	return new GridviewApi(new GridviewComponent(element, options));
}
function createPaneview(element, options) {
	return new PaneviewApi(new PaneviewComponent(element, options));
}

//#endregion
export { AdvancedDnDModule, AdvancedDnDService, BaseGrid, ContentContainer, ContextMenuController, ContextMenuModule, DEFAULT_TAB_GROUP_COLORS, DefaultDockviewDeserialzier, DefaultTab, DockviewApi, DockviewComponent, CompositeDisposable as DockviewCompositeDisposable, DockviewDidDropEvent, Disposable as DockviewDisposable, Emitter as DockviewEmitter, Event as DockviewEvent, DockviewGroupPanel, DockviewGroupPanelModel, MutableDisposable as DockviewMutableDisposable, DockviewPanel, DockviewUnhandledDragOverEvent, DockviewWillDropEvent, DockviewWillShowOverlayLocationEvent, DraggablePaneviewPanel, EdgeGroupModule, FloatingGroupModule, Gridview, GridviewApi, GridviewComponent, GridviewPanel, LayoutPriority, LiveRegionModule, LocalSelectionTransfer, OVERFLOW_MAX_TAB_ROWS_VARIABLE, OVERFLOW_WRAP_TABS_CAPPED_CLASS, OVERFLOW_WRAP_TABS_CLASS, OVERFLOW_WRAP_TABS_VERTICAL_TAB_HEIGHT_VARIABLE, Orientation, PROPERTY_KEYS_DOCKVIEW, PROPERTY_KEYS_GRIDVIEW, PROPERTY_KEYS_PANEVIEW, PROPERTY_KEYS_SPLITVIEW, PaneFramework, PaneTransfer, PanelTransfer, Paneview, PaneviewApi, PaneviewComponent, PaneviewPanel, PaneviewUnhandledDragOverEvent, SashState, Sizing, Splitview, SplitviewApi, SplitviewComponent, SplitviewPanel, Tab, TabGroupChipsModule, TabGroupChipsService, TabGroupColorPalette, applyTabGroupAccent, clearRegisteredModules, createCloseButton, createDismissableLayer, createDockview, createGridview, createPaneview, createPinButton, createSplitview, defineModule, directionToPosition, findRelativeZIndexParent, getActiveElement, getDirectionOrientation, getGridLocation, getLocationOrientation, getPaneData, getPanelData, getPopoutUrlError, getRegisteredModules, getRelativeLocation, indexInParent, isAnyEdgeGroupEnabled, isEdgeGroupEnabled, isGridBranchNode, isGroupOptionsWithGroup, isGroupOptionsWithPanel, isPanelOptionsWithGroup, isPanelOptionsWithPanel, orthogonal, positionToDirection, prefersReducedMotion, registerModules, resolveMessages, resolveOpaqueBackground, resolveTabGroupAccent, themeAbyss, themeAbyssSpaced, themeCatppuccinMocha, themeCatppuccinMochaSpaced, themeDark, themeDracula, themeGithubDark, themeGithubDarkSpaced, themeGithubLight, themeGithubLightSpaced, themeLight, themeLightSpaced, themeMonokai, themeNord, themeNordSpaced, themeSolarizedLight, themeSolarizedLightSpaced, themeVisualStudio, toTarget };
