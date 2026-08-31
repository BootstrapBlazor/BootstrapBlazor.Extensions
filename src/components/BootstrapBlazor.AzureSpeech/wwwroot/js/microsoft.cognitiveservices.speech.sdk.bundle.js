/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable @typescript-eslint/no-unused-vars */
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const Exports_js_1 = __webpack_require__(2);
// Note: this instantiation ensures the above import isn't
// removed on compile. The import being absent causes an error on running
void new Exports_js_1.AgentConfig();
// Speech SDK API
__exportStar(__webpack_require__(85), exports);



/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutoDetectSourceLanguagesOpenRangeOptionName = exports.ForceDictationPropertyName = exports.ServicePropertiesPropertyName = exports.CancellationErrorCodePropertyName = exports.OutputFormatPropertyName = exports.SpeechSynthesisAdapter = exports.AvatarSynthesisAdapter = void 0;
// Make sure not to export internal modules.
//
__exportStar(__webpack_require__(3), exports);
__exportStar(__webpack_require__(61), exports);
__exportStar(__webpack_require__(60), exports);
__exportStar(__webpack_require__(62), exports);
__exportStar(__webpack_require__(63), exports);
__exportStar(__webpack_require__(64), exports);
__exportStar(__webpack_require__(65), exports);
__exportStar(__webpack_require__(202), exports);
__exportStar(__webpack_require__(203), exports);
__exportStar(__webpack_require__(204), exports);
__exportStar(__webpack_require__(205), exports);
__exportStar(__webpack_require__(206), exports);
__exportStar(__webpack_require__(207), exports);
__exportStar(__webpack_require__(208), exports);
__exportStar(__webpack_require__(209), exports);
__exportStar(__webpack_require__(180), exports);
__exportStar(__webpack_require__(211), exports);
__exportStar(__webpack_require__(212), exports);
__exportStar(__webpack_require__(213), exports);
__exportStar(__webpack_require__(214), exports);
__exportStar(__webpack_require__(215), exports);
__exportStar(__webpack_require__(216), exports);
__exportStar(__webpack_require__(217), exports);
__exportStar(__webpack_require__(218), exports);
__exportStar(__webpack_require__(219), exports);
__exportStar(__webpack_require__(220), exports);
__exportStar(__webpack_require__(221), exports);
__exportStar(__webpack_require__(223), exports);
__exportStar(__webpack_require__(224), exports);
__exportStar(__webpack_require__(225), exports);
__exportStar(__webpack_require__(226), exports);
__exportStar(__webpack_require__(228), exports);
__exportStar(__webpack_require__(230), exports);
__exportStar(__webpack_require__(231), exports);
__exportStar(__webpack_require__(233), exports);
__exportStar(__webpack_require__(239), exports);
__exportStar(__webpack_require__(240), exports);
__exportStar(__webpack_require__(244), exports);
__exportStar(__webpack_require__(245), exports);
__exportStar(__webpack_require__(247), exports);
var AvatarSynthesisAdapter_js_1 = __webpack_require__(248);
Object.defineProperty(exports, "AvatarSynthesisAdapter", ({ enumerable: true, get: function () { return AvatarSynthesisAdapter_js_1.AvatarSynthesisAdapter; } }));
var SpeechSynthesisAdapter_js_1 = __webpack_require__(249);
Object.defineProperty(exports, "SpeechSynthesisAdapter", ({ enumerable: true, get: function () { return SpeechSynthesisAdapter_js_1.SpeechSynthesisAdapter; } }));
__exportStar(__webpack_require__(250), exports);
__exportStar(__webpack_require__(251), exports);
__exportStar(__webpack_require__(252), exports);
__exportStar(__webpack_require__(253), exports);
exports.OutputFormatPropertyName = "OutputFormat";
exports.CancellationErrorCodePropertyName = "CancellationErrorCode";
exports.ServicePropertiesPropertyName = "ServiceProperties";
exports.ForceDictationPropertyName = "ForceDictation";
exports.AutoDetectSourceLanguagesOpenRangeOptionName = "UND";



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitiveSubscriptionKeyAuthentication = void 0;
const Exports_js_1 = __webpack_require__(4);
const HeaderNames_js_1 = __webpack_require__(59);
const IAuthentication_js_1 = __webpack_require__(60);
/**
 * @class
 */
class CognitiveSubscriptionKeyAuthentication {
    /**
     * Creates and initializes an instance of the CognitiveSubscriptionKeyAuthentication class.
     * @constructor
     * @param {string} subscriptionKey - The subscription key
     */
    constructor(subscriptionKey) {
        if (!subscriptionKey) {
            throw new Exports_js_1.ArgumentNullError("subscriptionKey");
        }
        this.privAuthInfo = new IAuthentication_js_1.AuthInfo(HeaderNames_js_1.HeaderNames.AuthKey, subscriptionKey);
    }
    /**
     * Fetches the subscription key.
     * @member
     * @function
     * @public
     * @param {string} authFetchEventId - The id to fetch.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetch(authFetchEventId) {
        return Promise.resolve(this.privAuthInfo);
    }
    /**
     * Fetches the subscription key.
     * @member
     * @function
     * @public
     * @param {string} authFetchEventId - The id to fetch.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchOnExpiry(authFetchEventId) {
        return Promise.resolve(this.privAuthInfo);
    }
}
exports.CognitiveSubscriptionKeyAuthentication = CognitiveSubscriptionKeyAuthentication;



/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationStatus = void 0;
__exportStar(__webpack_require__(5), exports);
__exportStar(__webpack_require__(29), exports);
__exportStar(__webpack_require__(30), exports);
__exportStar(__webpack_require__(32), exports);
__exportStar(__webpack_require__(33), exports);
__exportStar(__webpack_require__(34), exports);
__exportStar(__webpack_require__(31), exports);
__exportStar(__webpack_require__(35), exports);
__exportStar(__webpack_require__(36), exports);
__exportStar(__webpack_require__(7), exports);
__exportStar(__webpack_require__(37), exports);
__exportStar(__webpack_require__(38), exports);
__exportStar(__webpack_require__(39), exports);
__exportStar(__webpack_require__(40), exports);
__exportStar(__webpack_require__(41), exports);
__exportStar(__webpack_require__(42), exports);
__exportStar(__webpack_require__(43), exports);
__exportStar(__webpack_require__(44), exports);
__exportStar(__webpack_require__(45), exports);
__exportStar(__webpack_require__(46), exports);
__exportStar(__webpack_require__(47), exports);
__exportStar(__webpack_require__(6), exports);
__exportStar(__webpack_require__(48), exports);
__exportStar(__webpack_require__(49), exports);
__exportStar(__webpack_require__(50), exports);
__exportStar(__webpack_require__(51), exports);
__exportStar(__webpack_require__(52), exports);
var TranslationStatus_js_1 = __webpack_require__(53);
Object.defineProperty(exports, "TranslationStatus", ({ enumerable: true, get: function () { return TranslationStatus_js_1.TranslationStatus; } }));
__exportStar(__webpack_require__(54), exports);
__exportStar(__webpack_require__(55), exports);
__exportStar(__webpack_require__(56), exports);
__exportStar(__webpack_require__(57), exports);
__exportStar(__webpack_require__(58), exports);



/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AudioStreamNodeErrorEvent = exports.AudioStreamNodeDetachedEvent = exports.AudioStreamNodeAttachedEvent = exports.AudioStreamNodeAttachingEvent = exports.AudioStreamNodeEvent = exports.AudioSourceErrorEvent = exports.AudioSourceOffEvent = exports.AudioSourceReadyEvent = exports.AudioSourceInitializingEvent = exports.AudioSourceEvent = void 0;
/* eslint-disable max-classes-per-file */
const PlatformEvent_js_1 = __webpack_require__(6);
class AudioSourceEvent extends PlatformEvent_js_1.PlatformEvent {
    constructor(eventName, audioSourceId, eventType = PlatformEvent_js_1.EventType.Info) {
        super(eventName, eventType);
        this.privAudioSourceId = audioSourceId;
    }
    get audioSourceId() {
        return this.privAudioSourceId;
    }
}
exports.AudioSourceEvent = AudioSourceEvent;
class AudioSourceInitializingEvent extends AudioSourceEvent {
    constructor(audioSourceId) {
        super("AudioSourceInitializingEvent", audioSourceId);
    }
}
exports.AudioSourceInitializingEvent = AudioSourceInitializingEvent;
class AudioSourceReadyEvent extends AudioSourceEvent {
    constructor(audioSourceId) {
        super("AudioSourceReadyEvent", audioSourceId);
    }
}
exports.AudioSourceReadyEvent = AudioSourceReadyEvent;
class AudioSourceOffEvent extends AudioSourceEvent {
    constructor(audioSourceId) {
        super("AudioSourceOffEvent", audioSourceId);
    }
}
exports.AudioSourceOffEvent = AudioSourceOffEvent;
class AudioSourceErrorEvent extends AudioSourceEvent {
    constructor(audioSourceId, error) {
        super("AudioSourceErrorEvent", audioSourceId, PlatformEvent_js_1.EventType.Error);
        this.privError = error;
    }
    get error() {
        return this.privError;
    }
}
exports.AudioSourceErrorEvent = AudioSourceErrorEvent;
class AudioStreamNodeEvent extends AudioSourceEvent {
    constructor(eventName, audioSourceId, audioNodeId) {
        super(eventName, audioSourceId);
        this.privAudioNodeId = audioNodeId;
    }
    get audioNodeId() {
        return this.privAudioNodeId;
    }
}
exports.AudioStreamNodeEvent = AudioStreamNodeEvent;
class AudioStreamNodeAttachingEvent extends AudioStreamNodeEvent {
    constructor(audioSourceId, audioNodeId) {
        super("AudioStreamNodeAttachingEvent", audioSourceId, audioNodeId);
    }
}
exports.AudioStreamNodeAttachingEvent = AudioStreamNodeAttachingEvent;
class AudioStreamNodeAttachedEvent extends AudioStreamNodeEvent {
    constructor(audioSourceId, audioNodeId) {
        super("AudioStreamNodeAttachedEvent", audioSourceId, audioNodeId);
    }
}
exports.AudioStreamNodeAttachedEvent = AudioStreamNodeAttachedEvent;
class AudioStreamNodeDetachedEvent extends AudioStreamNodeEvent {
    constructor(audioSourceId, audioNodeId) {
        super("AudioStreamNodeDetachedEvent", audioSourceId, audioNodeId);
    }
}
exports.AudioStreamNodeDetachedEvent = AudioStreamNodeDetachedEvent;
class AudioStreamNodeErrorEvent extends AudioStreamNodeEvent {
    constructor(audioSourceId, audioNodeId, error) {
        super("AudioStreamNodeErrorEvent", audioSourceId, audioNodeId);
        this.privError = error;
    }
    get error() {
        return this.privError;
    }
}
exports.AudioStreamNodeErrorEvent = AudioStreamNodeErrorEvent;



/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlatformEvent = exports.EventType = void 0;
const Guid_js_1 = __webpack_require__(7);
var EventType;
(function (EventType) {
    EventType[EventType["Debug"] = 0] = "Debug";
    EventType[EventType["Info"] = 1] = "Info";
    EventType[EventType["Warning"] = 2] = "Warning";
    EventType[EventType["Error"] = 3] = "Error";
    EventType[EventType["None"] = 4] = "None";
})(EventType = exports.EventType || (exports.EventType = {}));
class PlatformEvent {
    constructor(eventName, eventType) {
        this.privName = eventName;
        this.privEventId = (0, Guid_js_1.createNoDashGuid)();
        this.privEventTime = new Date().toISOString();
        this.privEventType = eventType;
        this.privMetadata = {};
    }
    get name() {
        return this.privName;
    }
    get eventId() {
        return this.privEventId;
    }
    get eventTime() {
        return this.privEventTime;
    }
    get eventType() {
        return this.privEventType;
    }
    get metadata() {
        return this.privMetadata;
    }
}
exports.PlatformEvent = PlatformEvent;



/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createNoDashGuid = exports.createGuid = void 0;
const uuid_1 = __webpack_require__(8);
const createGuid = () => (0, uuid_1.v4)();
exports.createGuid = createGuid;
const createNoDashGuid = () => createGuid().replace(new RegExp("-", "g"), "").toUpperCase();
exports.createNoDashGuid = createNoDashGuid;



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.version = exports.validate = exports.v7 = exports.v6ToV1 = exports.v6 = exports.v5 = exports.v4 = exports.v3 = exports.v1ToV6 = exports.v1 = exports.stringify = exports.parse = exports.NIL = exports.MAX = void 0;
var max_js_1 = __webpack_require__(9);
Object.defineProperty(exports, "MAX", ({ enumerable: true, get: function () { return max_js_1.default; } }));
var nil_js_1 = __webpack_require__(10);
Object.defineProperty(exports, "NIL", ({ enumerable: true, get: function () { return nil_js_1.default; } }));
var parse_js_1 = __webpack_require__(11);
Object.defineProperty(exports, "parse", ({ enumerable: true, get: function () { return parse_js_1.default; } }));
var stringify_js_1 = __webpack_require__(14);
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return stringify_js_1.default; } }));
var v1_js_1 = __webpack_require__(15);
Object.defineProperty(exports, "v1", ({ enumerable: true, get: function () { return v1_js_1.default; } }));
var v1ToV6_js_1 = __webpack_require__(17);
Object.defineProperty(exports, "v1ToV6", ({ enumerable: true, get: function () { return v1ToV6_js_1.default; } }));
var v3_js_1 = __webpack_require__(18);
Object.defineProperty(exports, "v3", ({ enumerable: true, get: function () { return v3_js_1.default; } }));
var v4_js_1 = __webpack_require__(21);
Object.defineProperty(exports, "v4", ({ enumerable: true, get: function () { return v4_js_1.default; } }));
var v5_js_1 = __webpack_require__(23);
Object.defineProperty(exports, "v5", ({ enumerable: true, get: function () { return v5_js_1.default; } }));
var v6_js_1 = __webpack_require__(25);
Object.defineProperty(exports, "v6", ({ enumerable: true, get: function () { return v6_js_1.default; } }));
var v6ToV1_js_1 = __webpack_require__(26);
Object.defineProperty(exports, "v6ToV1", ({ enumerable: true, get: function () { return v6ToV1_js_1.default; } }));
var v7_js_1 = __webpack_require__(27);
Object.defineProperty(exports, "v7", ({ enumerable: true, get: function () { return v7_js_1.default; } }));
var validate_js_1 = __webpack_require__(12);
Object.defineProperty(exports, "validate", ({ enumerable: true, get: function () { return validate_js_1.default; } }));
var version_js_1 = __webpack_require__(28);
Object.defineProperty(exports, "version", ({ enumerable: true, get: function () { return version_js_1.default; } }));


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = 'ffffffff-ffff-ffff-ffff-ffffffffffff';


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = '00000000-0000-0000-0000-000000000000';


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const validate_js_1 = __webpack_require__(12);
function parse(uuid) {
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Invalid UUID');
    }
    let v;
    return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, (v >>> 16) & 0xff, (v >>> 8) & 0xff, v & 0xff, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 0xff, ((v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000) & 0xff, (v / 0x100000000) & 0xff, (v >>> 24) & 0xff, (v >>> 16) & 0xff, (v >>> 8) & 0xff, v & 0xff);
}
exports["default"] = parse;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const regex_js_1 = __webpack_require__(13);
function validate(uuid) {
    return typeof uuid === 'string' && regex_js_1.default.test(uuid);
}
exports["default"] = validate;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unsafeStringify = void 0;
const validate_js_1 = __webpack_require__(12);
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]).toLowerCase();
}
exports.unsafeStringify = unsafeStringify;
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
exports["default"] = stringify;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateV1State = void 0;
const rng_js_1 = __webpack_require__(16);
const stringify_js_1 = __webpack_require__(14);
const _state = {};
function v1(options, buf, offset) {
    let bytes;
    const isV6 = options?._v6 ?? false;
    if (options) {
        const optionsKeys = Object.keys(options);
        if (optionsKeys.length === 1 && optionsKeys[0] === '_v6') {
            options = undefined;
        }
    }
    if (options) {
        bytes = v1Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.nsecs, options.clockseq, options.node, buf, offset);
    }
    else {
        const now = Date.now();
        const rnds = (0, rng_js_1.default)();
        updateV1State(_state, now, rnds);
        bytes = v1Bytes(rnds, _state.msecs, _state.nsecs, isV6 ? undefined : _state.clockseq, isV6 ? undefined : _state.node, buf, offset);
    }
    return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
}
function updateV1State(state, now, rnds) {
    state.msecs ??= -Infinity;
    state.nsecs ??= 0;
    if (now === state.msecs) {
        state.nsecs++;
        if (state.nsecs >= 10000) {
            state.node = undefined;
            state.nsecs = 0;
        }
    }
    else if (now > state.msecs) {
        state.nsecs = 0;
    }
    else if (now < state.msecs) {
        state.node = undefined;
    }
    if (!state.node) {
        state.node = rnds.slice(10, 16);
        state.node[0] |= 0x01;
        state.clockseq = ((rnds[8] << 8) | rnds[9]) & 0x3fff;
    }
    state.msecs = now;
    return state;
}
exports.updateV1State = updateV1State;
function v1Bytes(rnds, msecs, nsecs, clockseq, node, buf, offset = 0) {
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    if (!buf) {
        buf = new Uint8Array(16);
        offset = 0;
    }
    else {
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
    }
    msecs ??= Date.now();
    nsecs ??= 0;
    clockseq ??= ((rnds[8] << 8) | rnds[9]) & 0x3fff;
    node ??= rnds.slice(10, 16);
    msecs += 12219292800000;
    const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    buf[offset++] = (tl >>> 24) & 0xff;
    buf[offset++] = (tl >>> 16) & 0xff;
    buf[offset++] = (tl >>> 8) & 0xff;
    buf[offset++] = tl & 0xff;
    const tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
    buf[offset++] = (tmh >>> 8) & 0xff;
    buf[offset++] = tmh & 0xff;
    buf[offset++] = ((tmh >>> 24) & 0xf) | 0x10;
    buf[offset++] = (tmh >>> 16) & 0xff;
    buf[offset++] = (clockseq >>> 8) | 0x80;
    buf[offset++] = clockseq & 0xff;
    for (let n = 0; n < 6; ++n) {
        buf[offset++] = node[n];
    }
    return buf;
}
exports["default"] = v1;


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}
exports["default"] = rng;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const parse_js_1 = __webpack_require__(11);
const stringify_js_1 = __webpack_require__(14);
function v1ToV6(uuid) {
    const v1Bytes = typeof uuid === 'string' ? (0, parse_js_1.default)(uuid) : uuid;
    const v6Bytes = _v1ToV6(v1Bytes);
    return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v6Bytes) : v6Bytes;
}
exports["default"] = v1ToV6;
function _v1ToV6(v1Bytes) {
    return Uint8Array.of(((v1Bytes[6] & 0x0f) << 4) | ((v1Bytes[7] >> 4) & 0x0f), ((v1Bytes[7] & 0x0f) << 4) | ((v1Bytes[4] & 0xf0) >> 4), ((v1Bytes[4] & 0x0f) << 4) | ((v1Bytes[5] & 0xf0) >> 4), ((v1Bytes[5] & 0x0f) << 4) | ((v1Bytes[0] & 0xf0) >> 4), ((v1Bytes[0] & 0x0f) << 4) | ((v1Bytes[1] & 0xf0) >> 4), ((v1Bytes[1] & 0x0f) << 4) | ((v1Bytes[2] & 0xf0) >> 4), 0x60 | (v1Bytes[2] & 0x0f), v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
}


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URL = exports.DNS = void 0;
const md5_js_1 = __webpack_require__(19);
const v35_js_1 = __webpack_require__(20);
var v35_js_2 = __webpack_require__(20);
Object.defineProperty(exports, "DNS", ({ enumerable: true, get: function () { return v35_js_2.DNS; } }));
Object.defineProperty(exports, "URL", ({ enumerable: true, get: function () { return v35_js_2.URL; } }));
function v3(value, namespace, buf, offset) {
    return (0, v35_js_1.default)(0x30, md5_js_1.default, value, namespace, buf, offset);
}
v3.DNS = v35_js_1.DNS;
v3.URL = v35_js_1.URL;
exports["default"] = v3;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function md5(bytes) {
    const words = uint8ToUint32(bytes);
    const md5Bytes = wordsToMd5(words, bytes.length * 8);
    return uint32ToUint8(md5Bytes);
}
function uint32ToUint8(input) {
    const bytes = new Uint8Array(input.length * 4);
    for (let i = 0; i < input.length * 4; i++) {
        bytes[i] = (input[i >> 2] >>> ((i % 4) * 8)) & 0xff;
    }
    return bytes;
}
function getOutputLength(inputLength8) {
    return (((inputLength8 + 64) >>> 9) << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
    const xpad = new Uint32Array(getOutputLength(len)).fill(0);
    xpad.set(x);
    xpad[len >> 5] |= 0x80 << len % 32;
    xpad[xpad.length - 1] = len;
    x = xpad;
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return Uint32Array.of(a, b, c, d);
}
function uint8ToUint32(input) {
    if (input.length === 0) {
        return new Uint32Array();
    }
    const output = new Uint32Array(getOutputLength(input.length * 8)).fill(0);
    for (let i = 0; i < input.length; i++) {
        output[i >> 2] |= (input[i] & 0xff) << ((i % 4) * 8);
    }
    return output;
}
function safeAdd(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
}
function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}
function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
exports["default"] = md5;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URL = exports.DNS = exports.stringToBytes = void 0;
const parse_js_1 = __webpack_require__(11);
const stringify_js_1 = __webpack_require__(14);
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str));
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; ++i) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}
exports.stringToBytes = stringToBytes;
exports.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(version, hash, value, namespace, buf, offset) {
    const valueBytes = typeof value === 'string' ? stringToBytes(value) : value;
    const namespaceBytes = typeof namespace === 'string' ? (0, parse_js_1.default)(namespace) : namespace;
    if (typeof namespace === 'string') {
        namespace = (0, parse_js_1.default)(namespace);
    }
    if (namespace?.length !== 16) {
        throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    }
    let bytes = new Uint8Array(16 + valueBytes.length);
    bytes.set(namespaceBytes);
    bytes.set(valueBytes, namespaceBytes.length);
    bytes = hash(bytes);
    bytes[6] = (bytes[6] & 0x0f) | version;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(bytes);
}
exports["default"] = v35;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const native_js_1 = __webpack_require__(22);
const rng_js_1 = __webpack_require__(16);
const stringify_js_1 = __webpack_require__(14);
function v4(options, buf, offset) {
    if (native_js_1.default.randomUUID && !buf && !options) {
        return native_js_1.default.randomUUID();
    }
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? (0, rng_js_1.default)();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(rnds);
}
exports["default"] = v4;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
exports["default"] = { randomUUID };


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URL = exports.DNS = void 0;
const sha1_js_1 = __webpack_require__(24);
const v35_js_1 = __webpack_require__(20);
var v35_js_2 = __webpack_require__(20);
Object.defineProperty(exports, "DNS", ({ enumerable: true, get: function () { return v35_js_2.DNS; } }));
Object.defineProperty(exports, "URL", ({ enumerable: true, get: function () { return v35_js_2.URL; } }));
function v5(value, namespace, buf, offset) {
    return (0, v35_js_1.default)(0x50, sha1_js_1.default, value, namespace, buf, offset);
}
v5.DNS = v35_js_1.DNS;
v5.URL = v35_js_1.URL;
exports["default"] = v5;


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function f(s, x, y, z) {
    switch (s) {
        case 0:
            return (x & y) ^ (~x & z);
        case 1:
            return x ^ y ^ z;
        case 2:
            return (x & y) ^ (x & z) ^ (y & z);
        case 3:
            return x ^ y ^ z;
    }
}
function ROTL(x, n) {
    return (x << n) | (x >>> (32 - n));
}
function sha1(bytes) {
    const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
    const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
    const newBytes = new Uint8Array(bytes.length + 1);
    newBytes.set(bytes);
    newBytes[bytes.length] = 0x80;
    bytes = newBytes;
    const l = bytes.length / 4 + 2;
    const N = Math.ceil(l / 16);
    const M = new Array(N);
    for (let i = 0; i < N; ++i) {
        const arr = new Uint32Array(16);
        for (let j = 0; j < 16; ++j) {
            arr[j] =
                (bytes[i * 64 + j * 4] << 24) |
                    (bytes[i * 64 + j * 4 + 1] << 16) |
                    (bytes[i * 64 + j * 4 + 2] << 8) |
                    bytes[i * 64 + j * 4 + 3];
        }
        M[i] = arr;
    }
    M[N - 1][14] = ((bytes.length - 1) * 8) / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = ((bytes.length - 1) * 8) & 0xffffffff;
    for (let i = 0; i < N; ++i) {
        const W = new Uint32Array(80);
        for (let t = 0; t < 16; ++t) {
            W[t] = M[i][t];
        }
        for (let t = 16; t < 80; ++t) {
            W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
        }
        let a = H[0];
        let b = H[1];
        let c = H[2];
        let d = H[3];
        let e = H[4];
        for (let t = 0; t < 80; ++t) {
            const s = Math.floor(t / 20);
            const T = (ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t]) >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
        }
        H[0] = (H[0] + a) >>> 0;
        H[1] = (H[1] + b) >>> 0;
        H[2] = (H[2] + c) >>> 0;
        H[3] = (H[3] + d) >>> 0;
        H[4] = (H[4] + e) >>> 0;
    }
    return Uint8Array.of(H[0] >> 24, H[0] >> 16, H[0] >> 8, H[0], H[1] >> 24, H[1] >> 16, H[1] >> 8, H[1], H[2] >> 24, H[2] >> 16, H[2] >> 8, H[2], H[3] >> 24, H[3] >> 16, H[3] >> 8, H[3], H[4] >> 24, H[4] >> 16, H[4] >> 8, H[4]);
}
exports["default"] = sha1;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const stringify_js_1 = __webpack_require__(14);
const v1_js_1 = __webpack_require__(15);
const v1ToV6_js_1 = __webpack_require__(17);
function v6(options, buf, offset) {
    options ??= {};
    offset ??= 0;
    let bytes = (0, v1_js_1.default)({ ...options, _v6: true }, new Uint8Array(16));
    bytes = (0, v1ToV6_js_1.default)(bytes);
    if (buf) {
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for (let i = 0; i < 16; i++) {
            buf[offset + i] = bytes[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(bytes);
}
exports["default"] = v6;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const parse_js_1 = __webpack_require__(11);
const stringify_js_1 = __webpack_require__(14);
function v6ToV1(uuid) {
    const v6Bytes = typeof uuid === 'string' ? (0, parse_js_1.default)(uuid) : uuid;
    const v1Bytes = _v6ToV1(v6Bytes);
    return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v1Bytes) : v1Bytes;
}
exports["default"] = v6ToV1;
function _v6ToV1(v6Bytes) {
    return Uint8Array.of(((v6Bytes[3] & 0x0f) << 4) | ((v6Bytes[4] >> 4) & 0x0f), ((v6Bytes[4] & 0x0f) << 4) | ((v6Bytes[5] & 0xf0) >> 4), ((v6Bytes[5] & 0x0f) << 4) | (v6Bytes[6] & 0x0f), v6Bytes[7], ((v6Bytes[1] & 0x0f) << 4) | ((v6Bytes[2] & 0xf0) >> 4), ((v6Bytes[2] & 0x0f) << 4) | ((v6Bytes[3] & 0xf0) >> 4), 0x10 | ((v6Bytes[0] & 0xf0) >> 4), ((v6Bytes[0] & 0x0f) << 4) | ((v6Bytes[1] & 0xf0) >> 4), v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
}


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateV7State = void 0;
const rng_js_1 = __webpack_require__(16);
const stringify_js_1 = __webpack_require__(14);
const _state = {};
function v7(options, buf, offset) {
    let bytes;
    if (options) {
        bytes = v7Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.seq, buf, offset);
    }
    else {
        const now = Date.now();
        const rnds = (0, rng_js_1.default)();
        updateV7State(_state, now, rnds);
        bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
    }
    return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
}
function updateV7State(state, now, rnds) {
    state.msecs ??= -Infinity;
    state.seq ??= 0;
    if (now > state.msecs) {
        state.seq = (rnds[6] << 23) | (rnds[7] << 16) | (rnds[8] << 8) | rnds[9];
        state.msecs = now;
    }
    else {
        state.seq = (state.seq + 1) | 0;
        if (state.seq === 0) {
            state.msecs++;
        }
    }
    return state;
}
exports.updateV7State = updateV7State;
function v7Bytes(rnds, msecs, seq, buf, offset = 0) {
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    if (!buf) {
        buf = new Uint8Array(16);
        offset = 0;
    }
    else {
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
    }
    msecs ??= Date.now();
    seq ??= ((rnds[6] * 0x7f) << 24) | (rnds[7] << 16) | (rnds[8] << 8) | rnds[9];
    buf[offset++] = (msecs / 0x10000000000) & 0xff;
    buf[offset++] = (msecs / 0x100000000) & 0xff;
    buf[offset++] = (msecs / 0x1000000) & 0xff;
    buf[offset++] = (msecs / 0x10000) & 0xff;
    buf[offset++] = (msecs / 0x100) & 0xff;
    buf[offset++] = msecs & 0xff;
    buf[offset++] = 0x70 | ((seq >>> 28) & 0x0f);
    buf[offset++] = (seq >>> 20) & 0xff;
    buf[offset++] = 0x80 | ((seq >>> 14) & 0x3f);
    buf[offset++] = (seq >>> 6) & 0xff;
    buf[offset++] = ((seq << 2) & 0xff) | (rnds[10] & 0x03);
    buf[offset++] = rnds[11];
    buf[offset++] = rnds[12];
    buf[offset++] = rnds[13];
    buf[offset++] = rnds[14];
    buf[offset++] = rnds[15];
    return buf;
}
exports["default"] = v7;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const validate_js_1 = __webpack_require__(12);
function version(uuid) {
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Invalid UUID');
    }
    return parseInt(uuid.slice(14, 15), 16);
}
exports["default"] = version;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionRedirectEvent = exports.ConnectionMessageSentEvent = exports.ConnectionMessageReceivedEvent = exports.ConnectionEstablishErrorEvent = exports.ConnectionErrorEvent = exports.ConnectionClosedEvent = exports.ConnectionEstablishedEvent = exports.ConnectionStartEvent = exports.ConnectionEvent = exports.ServiceEvent = void 0;
const PlatformEvent_js_1 = __webpack_require__(6);
class ServiceEvent extends PlatformEvent_js_1.PlatformEvent {
    constructor(eventName, jsonstring, eventType = PlatformEvent_js_1.EventType.Info) {
        super(eventName, eventType);
        this.privJsonResult = jsonstring;
    }
    get jsonString() {
        return this.privJsonResult;
    }
}
exports.ServiceEvent = ServiceEvent;
class ConnectionEvent extends PlatformEvent_js_1.PlatformEvent {
    constructor(eventName, connectionId, eventType = PlatformEvent_js_1.EventType.Info) {
        super(eventName, eventType);
        this.privConnectionId = connectionId;
    }
    get connectionId() {
        return this.privConnectionId;
    }
}
exports.ConnectionEvent = ConnectionEvent;
class ConnectionStartEvent extends ConnectionEvent {
    constructor(connectionId, uri, headers) {
        super("ConnectionStartEvent", connectionId);
        this.privUri = uri;
        this.privHeaders = headers;
    }
    get uri() {
        return this.privUri;
    }
    get headers() {
        return this.privHeaders;
    }
}
exports.ConnectionStartEvent = ConnectionStartEvent;
class ConnectionEstablishedEvent extends ConnectionEvent {
    constructor(connectionId) {
        super("ConnectionEstablishedEvent", connectionId);
    }
}
exports.ConnectionEstablishedEvent = ConnectionEstablishedEvent;
class ConnectionClosedEvent extends ConnectionEvent {
    constructor(connectionId, statusCode, reason) {
        super("ConnectionClosedEvent", connectionId, PlatformEvent_js_1.EventType.Debug);
        this.privReason = reason;
        this.privStatusCode = statusCode;
    }
    get reason() {
        return this.privReason;
    }
    get statusCode() {
        return this.privStatusCode;
    }
}
exports.ConnectionClosedEvent = ConnectionClosedEvent;
class ConnectionErrorEvent extends ConnectionEvent {
    constructor(connectionId, message, type) {
        super("ConnectionErrorEvent", connectionId, PlatformEvent_js_1.EventType.Debug);
        this.privMessage = message;
        this.privType = type;
    }
    get message() {
        return this.privMessage;
    }
    get type() {
        return this.privType;
    }
}
exports.ConnectionErrorEvent = ConnectionErrorEvent;
class ConnectionEstablishErrorEvent extends ConnectionEvent {
    constructor(connectionId, statuscode, reason) {
        super("ConnectionEstablishErrorEvent", connectionId, PlatformEvent_js_1.EventType.Error);
        this.privStatusCode = statuscode;
        this.privReason = reason;
    }
    get reason() {
        return this.privReason;
    }
    get statusCode() {
        return this.privStatusCode;
    }
}
exports.ConnectionEstablishErrorEvent = ConnectionEstablishErrorEvent;
class ConnectionMessageReceivedEvent extends ConnectionEvent {
    constructor(connectionId, networkReceivedTimeISO, message) {
        super("ConnectionMessageReceivedEvent", connectionId);
        this.privNetworkReceivedTime = networkReceivedTimeISO;
        this.privMessage = message;
    }
    get networkReceivedTime() {
        return this.privNetworkReceivedTime;
    }
    get message() {
        return this.privMessage;
    }
}
exports.ConnectionMessageReceivedEvent = ConnectionMessageReceivedEvent;
class ConnectionMessageSentEvent extends ConnectionEvent {
    constructor(connectionId, networkSentTimeISO, message) {
        super("ConnectionMessageSentEvent", connectionId);
        this.privNetworkSentTime = networkSentTimeISO;
        this.privMessage = message;
    }
    get networkSentTime() {
        return this.privNetworkSentTime;
    }
    get message() {
        return this.privMessage;
    }
}
exports.ConnectionMessageSentEvent = ConnectionMessageSentEvent;
class ConnectionRedirectEvent extends ConnectionEvent {
    constructor(connectionId, redirectUrl, originalUrl, context) {
        super("ConnectionRedirectEvent", connectionId, PlatformEvent_js_1.EventType.Info);
        this.privRedirectUrl = redirectUrl;
        this.privOriginalUrl = originalUrl;
        this.privContext = context;
    }
    get redirectUrl() {
        return this.privRedirectUrl;
    }
    get originalUrl() {
        return this.privOriginalUrl;
    }
    get context() {
        return this.privContext;
    }
}
exports.ConnectionRedirectEvent = ConnectionRedirectEvent;



/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/* eslint-disable @typescript-eslint/no-unsafe-return */
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionMessage = exports.MessageType = void 0;
const Error_js_1 = __webpack_require__(31);
const Guid_js_1 = __webpack_require__(7);
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Text"] = 0] = "Text";
    MessageType[MessageType["Binary"] = 1] = "Binary";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
class ConnectionMessage {
    constructor(messageType, body, headers, id) {
        this.privBody = null;
        if (messageType === MessageType.Text && body && !(typeof (body) === "string")) {
            throw new Error_js_1.InvalidOperationError("Payload must be a string");
        }
        if (messageType === MessageType.Binary && body && !(body instanceof ArrayBuffer)) {
            throw new Error_js_1.InvalidOperationError("Payload must be ArrayBuffer");
        }
        this.privMessageType = messageType;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.privBody = body;
        this.privHeaders = headers ? headers : {};
        this.privId = id ? id : (0, Guid_js_1.createNoDashGuid)();
        switch (this.messageType) {
            case MessageType.Binary:
                this.privSize = this.binaryBody !== null ? this.binaryBody.byteLength : 0;
                break;
            case MessageType.Text:
                this.privSize = this.textBody.length;
        }
    }
    get messageType() {
        return this.privMessageType;
    }
    get headers() {
        return this.privHeaders;
    }
    get body() {
        return this.privBody;
    }
    get textBody() {
        if (this.privMessageType === MessageType.Binary) {
            throw new Error_js_1.InvalidOperationError("Not supported for binary message");
        }
        return this.privBody;
    }
    get binaryBody() {
        if (this.privMessageType === MessageType.Text) {
            throw new Error_js_1.InvalidOperationError("Not supported for text message");
        }
        return this.privBody;
    }
    get id() {
        return this.privId;
    }
}
exports.ConnectionMessage = ConnectionMessage;



/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObjectDisposedError = exports.InvalidOperationError = exports.ArgumentNullError = void 0;
/* eslint-disable max-classes-per-file */
/**
 * The error that is thrown when an argument passed in is null.
 *
 * @export
 * @class ArgumentNullError
 * @extends {Error}
 */
class ArgumentNullError extends Error {
    /**
     * Creates an instance of ArgumentNullError.
     *
     * @param {string} argumentName - Name of the argument that is null
     *
     * @memberOf ArgumentNullError
     */
    constructor(argumentName) {
        super(argumentName);
        this.name = "ArgumentNull";
        this.message = argumentName;
    }
}
exports.ArgumentNullError = ArgumentNullError;
/**
 * The error that is thrown when an invalid operation is performed in the code.
 *
 * @export
 * @class InvalidOperationError
 * @extends {Error}
 */
class InvalidOperationError extends Error {
    /**
     * Creates an instance of InvalidOperationError.
     *
     * @param {string} error - The error
     *
     * @memberOf InvalidOperationError
     */
    constructor(error) {
        super(error);
        this.name = "InvalidOperation";
        this.message = error;
    }
}
exports.InvalidOperationError = InvalidOperationError;
/**
 * The error that is thrown when an object is disposed.
 *
 * @export
 * @class ObjectDisposedError
 * @extends {Error}
 */
class ObjectDisposedError extends Error {
    /**
     * Creates an instance of ObjectDisposedError.
     *
     * @param {string} objectName - The object that is disposed
     * @param {string} error - The error
     *
     * @memberOf ObjectDisposedError
     */
    constructor(objectName, error) {
        super(error);
        this.name = objectName + "ObjectDisposed";
        this.message = error;
    }
}
exports.ObjectDisposedError = ObjectDisposedError;



/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionOpenResponse = void 0;
class ConnectionOpenResponse {
    constructor(statusCode, reason) {
        this.privStatusCode = statusCode;
        this.privReason = reason;
    }
    get statusCode() {
        return this.privStatusCode;
    }
    get reason() {
        return this.privReason;
    }
}
exports.ConnectionOpenResponse = ConnectionOpenResponse;



/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeferralMap = void 0;
/**
 * The error that is thrown when an argument passed in is null.
 *
 * @export
 * @class DefferalMap
 */
class DeferralMap {
    constructor() {
        this.privMap = {};
    }
    add(id, deferral) {
        this.privMap[id] = deferral;
    }
    getId(id) {
        return this.privMap[id];
    }
    complete(id, result) {
        try {
            this.privMap[id].resolve(result);
        }
        catch (error) {
            this.privMap[id].reject(error);
        }
        finally {
            this.privMap[id] = undefined;
        }
    }
}
exports.DeferralMap = DeferralMap;



/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SendingAgentContextMessageEvent = exports.DialogEvent = void 0;
const PlatformEvent_js_1 = __webpack_require__(6);
class DialogEvent extends PlatformEvent_js_1.PlatformEvent {
    constructor(eventName, eventType = PlatformEvent_js_1.EventType.Info) {
        super(eventName, eventType);
    }
}
exports.DialogEvent = DialogEvent;
class SendingAgentContextMessageEvent extends DialogEvent {
    constructor(agentConfig) {
        super("SendingAgentContextMessageEvent");
        this.privAgentConfig = agentConfig;
    }
    get agentConfig() {
        return this.privAgentConfig;
    }
}
exports.SendingAgentContextMessageEvent = SendingAgentContextMessageEvent;



/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Events = void 0;
const Error_js_1 = __webpack_require__(31);
const EventSource_js_1 = __webpack_require__(36);
class Events {
    static setEventSource(eventSource) {
        if (!eventSource) {
            throw new Error_js_1.ArgumentNullError("eventSource");
        }
        Events.privInstance = eventSource;
    }
    static get instance() {
        return Events.privInstance;
    }
}
exports.Events = Events;
Events.privInstance = new EventSource_js_1.EventSource();



/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventSource = void 0;
const Error_js_1 = __webpack_require__(31);
const Guid_js_1 = __webpack_require__(7);
class EventSource {
    constructor(metadata) {
        this.privEventListeners = {};
        this.privIsDisposed = false;
        this.privConsoleListener = undefined;
        this.privMetadata = metadata;
    }
    onEvent(event) {
        if (this.isDisposed()) {
            throw (new Error_js_1.ObjectDisposedError("EventSource"));
        }
        if (this.metadata) {
            for (const paramName in this.metadata) {
                if (paramName) {
                    if (event.metadata) {
                        if (!event.metadata[paramName]) {
                            event.metadata[paramName] = this.metadata[paramName];
                        }
                    }
                }
            }
        }
        for (const eventId in this.privEventListeners) {
            if (eventId && this.privEventListeners[eventId]) {
                this.privEventListeners[eventId](event);
            }
        }
    }
    attach(onEventCallback) {
        const id = (0, Guid_js_1.createNoDashGuid)();
        this.privEventListeners[id] = onEventCallback;
        return {
            detach: () => {
                delete this.privEventListeners[id];
                return Promise.resolve();
            },
        };
    }
    attachListener(listener) {
        return this.attach((e) => listener.onEvent(e));
    }
    attachConsoleListener(listener) {
        if (!!this.privConsoleListener) {
            void this.privConsoleListener.detach(); // Detach implementation for eventListeners is synchronous
        }
        this.privConsoleListener = this.attach((e) => listener.onEvent(e));
        return this.privConsoleListener;
    }
    isDisposed() {
        return this.privIsDisposed;
    }
    dispose() {
        this.privEventListeners = null;
        this.privIsDisposed = true;
    }
    get metadata() {
        return this.privMetadata;
    }
}
exports.EventSource = EventSource;



/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionState = void 0;
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["None"] = 0] = "None";
    ConnectionState[ConnectionState["Connected"] = 1] = "Connected";
    ConnectionState[ConnectionState["Connecting"] = 2] = "Connecting";
    ConnectionState[ConnectionState["Disconnected"] = 3] = "Disconnected";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));



/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.List = void 0;
const Error_js_1 = __webpack_require__(31);
class List {
    constructor(list) {
        this.privSubscriptionIdCounter = 0;
        this.privAddSubscriptions = {};
        this.privRemoveSubscriptions = {};
        this.privDisposedSubscriptions = {};
        this.privDisposeReason = null;
        this.privList = [];
        // copy the list rather than taking as is.
        if (list) {
            for (const item of list) {
                this.privList.push(item);
            }
        }
    }
    get(itemIndex) {
        this.throwIfDisposed();
        return this.privList[itemIndex];
    }
    first() {
        return this.get(0);
    }
    last() {
        return this.get(this.length() - 1);
    }
    add(item) {
        this.throwIfDisposed();
        this.insertAt(this.privList.length, item);
    }
    insertAt(index, item) {
        this.throwIfDisposed();
        if (index === 0) {
            this.privList.unshift(item);
        }
        else if (index === this.privList.length) {
            this.privList.push(item);
        }
        else {
            this.privList.splice(index, 0, item);
        }
        this.triggerSubscriptions(this.privAddSubscriptions);
    }
    removeFirst() {
        this.throwIfDisposed();
        return this.removeAt(0);
    }
    removeLast() {
        this.throwIfDisposed();
        return this.removeAt(this.length() - 1);
    }
    removeAt(index) {
        this.throwIfDisposed();
        return this.remove(index, 1)[0];
    }
    remove(index, count) {
        this.throwIfDisposed();
        const removedElements = this.privList.splice(index, count);
        this.triggerSubscriptions(this.privRemoveSubscriptions);
        return removedElements;
    }
    clear() {
        this.throwIfDisposed();
        this.remove(0, this.length());
    }
    length() {
        this.throwIfDisposed();
        return this.privList.length;
    }
    onAdded(addedCallback) {
        this.throwIfDisposed();
        const subscriptionId = this.privSubscriptionIdCounter++;
        this.privAddSubscriptions[subscriptionId] = addedCallback;
        return {
            detach: () => {
                delete this.privAddSubscriptions[subscriptionId];
                return Promise.resolve();
            },
        };
    }
    onRemoved(removedCallback) {
        this.throwIfDisposed();
        const subscriptionId = this.privSubscriptionIdCounter++;
        this.privRemoveSubscriptions[subscriptionId] = removedCallback;
        return {
            detach: () => {
                delete this.privRemoveSubscriptions[subscriptionId];
                return Promise.resolve();
            },
        };
    }
    onDisposed(disposedCallback) {
        this.throwIfDisposed();
        const subscriptionId = this.privSubscriptionIdCounter++;
        this.privDisposedSubscriptions[subscriptionId] = disposedCallback;
        return {
            detach: () => {
                delete this.privDisposedSubscriptions[subscriptionId];
                return Promise.resolve();
            },
        };
    }
    join(seperator) {
        this.throwIfDisposed();
        return this.privList.join(seperator);
    }
    toArray() {
        const cloneCopy = Array();
        this.privList.forEach((val) => {
            cloneCopy.push(val);
        });
        return cloneCopy;
    }
    any(callback) {
        this.throwIfDisposed();
        if (callback) {
            return this.where(callback).length() > 0;
        }
        else {
            return this.length() > 0;
        }
    }
    all(callback) {
        this.throwIfDisposed();
        return this.where(callback).length() === this.length();
    }
    forEach(callback) {
        this.throwIfDisposed();
        for (let i = 0; i < this.length(); i++) {
            callback(this.privList[i], i);
        }
    }
    select(callback) {
        this.throwIfDisposed();
        const selectList = [];
        for (let i = 0; i < this.privList.length; i++) {
            selectList.push(callback(this.privList[i], i));
        }
        return new List(selectList);
    }
    where(callback) {
        this.throwIfDisposed();
        const filteredList = new List();
        for (let i = 0; i < this.privList.length; i++) {
            if (callback(this.privList[i], i)) {
                filteredList.add(this.privList[i]);
            }
        }
        return filteredList;
    }
    orderBy(compareFn) {
        this.throwIfDisposed();
        const clonedArray = this.toArray();
        const orderedArray = clonedArray.sort(compareFn);
        return new List(orderedArray);
    }
    orderByDesc(compareFn) {
        this.throwIfDisposed();
        return this.orderBy((a, b) => compareFn(b, a));
    }
    clone() {
        this.throwIfDisposed();
        return new List(this.toArray());
    }
    concat(list) {
        this.throwIfDisposed();
        return new List(this.privList.concat(list.toArray()));
    }
    concatArray(array) {
        this.throwIfDisposed();
        return new List(this.privList.concat(array));
    }
    isDisposed() {
        return this.privList == null;
    }
    dispose(reason) {
        if (!this.isDisposed()) {
            this.privDisposeReason = reason;
            this.privList = null;
            this.privAddSubscriptions = null;
            this.privRemoveSubscriptions = null;
            this.triggerSubscriptions(this.privDisposedSubscriptions);
        }
    }
    throwIfDisposed() {
        if (this.isDisposed()) {
            throw new Error_js_1.ObjectDisposedError("List", this.privDisposeReason);
        }
    }
    triggerSubscriptions(subscriptions) {
        if (subscriptions) {
            for (const subscriptionId in subscriptions) {
                if (subscriptionId) {
                    subscriptions[subscriptionId]();
                }
            }
        }
    }
}
exports.List = List;



/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.marshalPromiseToCallbacks = exports.Sink = exports.Deferred = exports.PromiseResultEventSource = exports.PromiseResult = exports.PromiseState = void 0;
/* eslint-disable max-classes-per-file, @typescript-eslint/typedef */
var PromiseState;
(function (PromiseState) {
    PromiseState[PromiseState["None"] = 0] = "None";
    PromiseState[PromiseState["Resolved"] = 1] = "Resolved";
    PromiseState[PromiseState["Rejected"] = 2] = "Rejected";
})(PromiseState = exports.PromiseState || (exports.PromiseState = {}));
class PromiseResult {
    constructor(promiseResultEventSource) {
        this.throwIfError = () => {
            if (this.isError) {
                throw this.error;
            }
        };
        promiseResultEventSource.on((result) => {
            if (!this.privIsCompleted) {
                this.privIsCompleted = true;
                this.privIsError = false;
                this.privResult = result;
            }
        }, (error) => {
            if (!this.privIsCompleted) {
                this.privIsCompleted = true;
                this.privIsError = true;
                this.privError = error;
            }
        });
    }
    get isCompleted() {
        return this.privIsCompleted;
    }
    get isError() {
        return this.privIsError;
    }
    get error() {
        return this.privError;
    }
    get result() {
        return this.privResult;
    }
}
exports.PromiseResult = PromiseResult;
class PromiseResultEventSource {
    constructor() {
        this.setResult = (result) => {
            this.privOnSetResult(result);
        };
        this.setError = (error) => {
            this.privOnSetError(error);
        };
        this.on = (onSetResult, onSetError) => {
            this.privOnSetResult = onSetResult;
            this.privOnSetError = onSetError;
        };
    }
}
exports.PromiseResultEventSource = PromiseResultEventSource;
class Deferred {
    constructor() {
        this.resolve = (result) => {
            this.privResolve(result);
            return this;
        };
        this.reject = (error) => {
            this.privReject(error);
            return this;
        };
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        this.privPromise = new Promise((resolve, reject) => {
            this.privResolve = resolve;
            this.privReject = reject;
        });
    }
    get promise() {
        return this.privPromise;
    }
}
exports.Deferred = Deferred;
class Sink {
    constructor() {
        this.privState = PromiseState.None;
        this.privPromiseResult = null;
        this.privPromiseResultEvents = null;
        this.privSuccessHandlers = [];
        this.privErrorHandlers = [];
        this.privPromiseResultEvents = new PromiseResultEventSource();
        this.privPromiseResult = new PromiseResult(this.privPromiseResultEvents);
    }
    get state() {
        return this.privState;
    }
    get result() {
        return this.privPromiseResult;
    }
    resolve(result) {
        if (this.privState !== PromiseState.None) {
            throw new Error("'Cannot resolve a completed promise'");
        }
        this.privState = PromiseState.Resolved;
        this.privPromiseResultEvents.setResult(result);
        for (let i = 0; i < this.privSuccessHandlers.length; i++) {
            this.executeSuccessCallback(result, this.privSuccessHandlers[i], this.privErrorHandlers[i]);
        }
        this.detachHandlers();
    }
    reject(error) {
        if (this.privState !== PromiseState.None) {
            throw new Error("'Cannot reject a completed promise'");
        }
        this.privState = PromiseState.Rejected;
        this.privPromiseResultEvents.setError(error);
        for (const errorHandler of this.privErrorHandlers) {
            this.executeErrorCallback(error, errorHandler);
        }
        this.detachHandlers();
    }
    on(successCallback, errorCallback) {
        if (successCallback == null) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            successCallback = () => { };
        }
        if (this.privState === PromiseState.None) {
            this.privSuccessHandlers.push(successCallback);
            this.privErrorHandlers.push(errorCallback);
        }
        else {
            if (this.privState === PromiseState.Resolved) {
                this.executeSuccessCallback(this.privPromiseResult.result, successCallback, errorCallback);
            }
            else if (this.privState === PromiseState.Rejected) {
                this.executeErrorCallback(this.privPromiseResult.error, errorCallback);
            }
            this.detachHandlers();
        }
    }
    executeSuccessCallback(result, successCallback, errorCallback) {
        try {
            successCallback(result);
        }
        catch (e) {
            this.executeErrorCallback(`'Unhandled callback error: ${e}'`, errorCallback);
        }
    }
    executeErrorCallback(error, errorCallback) {
        if (errorCallback) {
            try {
                errorCallback(error);
            }
            catch (e) {
                throw new Error(`'Unhandled callback error: ${e}. InnerError: ${error}'`);
            }
        }
        else {
            throw new Error(`'Unhandled error: ${error}'`);
        }
    }
    detachHandlers() {
        this.privErrorHandlers = [];
        this.privSuccessHandlers = [];
    }
}
exports.Sink = Sink;
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function marshalPromiseToCallbacks(promise, cb, err) {
    promise.then((val) => {
        try {
            if (!!cb) {
                cb(val);
            }
        }
        catch (error) {
            if (!!err) {
                try {
                    if (error instanceof Error) {
                        const typedError = error;
                        err(typedError.name + ": " + typedError.message);
                    }
                    else {
                        err(error);
                    }
                    // eslint-disable-next-line no-empty
                }
                catch (error) { }
            }
        }
    }, (error) => {
        if (!!err) {
            try {
                if (error instanceof Error) {
                    const typedError = error;
                    err(typedError.name + ": " + typedError.message);
                }
                else {
                    err(error);
                }
                // eslint-disable-next-line no-empty
            }
            catch (error) { }
        }
    });
}
exports.marshalPromiseToCallbacks = marshalPromiseToCallbacks;



/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Queue = void 0;
const Error_js_1 = __webpack_require__(31);
const List_js_1 = __webpack_require__(47);
const Promise_js_1 = __webpack_require__(48);
var SubscriberType;
(function (SubscriberType) {
    SubscriberType[SubscriberType["Dequeue"] = 0] = "Dequeue";
    SubscriberType[SubscriberType["Peek"] = 1] = "Peek";
})(SubscriberType || (SubscriberType = {}));
class Queue {
    constructor(list) {
        this.privPromiseStore = new List_js_1.List();
        this.privIsDrainInProgress = false;
        this.privIsDisposing = false;
        this.privDisposeReason = null;
        this.privList = list ? list : new List_js_1.List();
        this.privDetachables = [];
        this.privSubscribers = new List_js_1.List();
        this.privDetachables.push(this.privList.onAdded(() => this.drain()));
    }
    enqueue(item) {
        this.throwIfDispose();
        this.enqueueFromPromise(new Promise((resolve) => resolve(item)));
    }
    enqueueFromPromise(promise) {
        this.throwIfDispose();
        promise.then((val) => {
            this.privList.add(val);
            // eslint-disable-next-line @typescript-eslint/no-empty-function
        }, () => { });
    }
    dequeue() {
        this.throwIfDispose();
        const deferredSubscriber = new Promise_js_1.Deferred();
        if (this.privSubscribers) {
            this.privSubscribers.add({ deferral: deferredSubscriber, type: SubscriberType.Dequeue });
            this.drain();
        }
        return deferredSubscriber.promise;
    }
    peek() {
        this.throwIfDispose();
        const deferredSubscriber = new Promise_js_1.Deferred();
        const subs = this.privSubscribers;
        if (subs) {
            this.privSubscribers.add({ deferral: deferredSubscriber, type: SubscriberType.Peek });
            this.drain();
        }
        return deferredSubscriber.promise;
    }
    length() {
        this.throwIfDispose();
        return this.privList.length();
    }
    isDisposed() {
        return this.privSubscribers == null;
    }
    async drainAndDispose(pendingItemProcessor, reason) {
        if (!this.isDisposed() && !this.privIsDisposing) {
            this.privDisposeReason = reason;
            this.privIsDisposing = true;
            const subs = this.privSubscribers;
            if (subs) {
                while (subs.length() > 0) {
                    const subscriber = subs.removeFirst();
                    // TODO: this needs work (Resolve(null) instead?).
                    subscriber.deferral.resolve(undefined);
                    // subscriber.deferral.reject("Disposed");
                }
                // note: this block assumes cooperative multitasking, i.e.,
                // between the if-statement and the assignment there are no
                // thread switches.
                // Reason is that between the initial const = this.; and this
                // point there is the derral.resolve() operation that might have
                // caused recursive calls to the Queue, especially, calling
                // Dispose() on the queue alredy (which would reset the var
                // here to null!).
                // That should generally hold true for javascript...
                if (this.privSubscribers === subs) {
                    this.privSubscribers = subs;
                }
            }
            for (const detachable of this.privDetachables) {
                await detachable.detach();
            }
            if (this.privPromiseStore.length() > 0 && pendingItemProcessor) {
                const promiseArray = [];
                this.privPromiseStore.toArray().forEach((wrapper) => {
                    promiseArray.push(wrapper);
                });
                return Promise.all(promiseArray).finally(() => {
                    this.privSubscribers = null;
                    this.privList.forEach((item) => {
                        pendingItemProcessor(item);
                    });
                    this.privList = null;
                    return;
                }).then();
            }
            else {
                this.privSubscribers = null;
                this.privList = null;
            }
        }
    }
    async dispose(reason) {
        await this.drainAndDispose(null, reason);
    }
    drain() {
        if (!this.privIsDrainInProgress && !this.privIsDisposing) {
            this.privIsDrainInProgress = true;
            const subs = this.privSubscribers;
            const lists = this.privList;
            if (subs && lists) {
                while (lists.length() > 0 && subs.length() > 0 && !this.privIsDisposing) {
                    const subscriber = subs.removeFirst();
                    if (subscriber.type === SubscriberType.Peek) {
                        subscriber.deferral.resolve(lists.first());
                    }
                    else {
                        const dequeuedItem = lists.removeFirst();
                        subscriber.deferral.resolve(dequeuedItem);
                    }
                }
                // note: this block assumes cooperative multitasking, i.e.,
                // between the if-statement and the assignment there are no
                // thread switches.
                // Reason is that between the initial const = this.; and this
                // point there is the derral.resolve() operation that might have
                // caused recursive calls to the Queue, especially, calling
                // Dispose() on the queue alredy (which would reset the var
                // here to null!).
                // That should generally hold true for javascript...
                if (this.privSubscribers === subs) {
                    this.privSubscribers = subs;
                }
                // note: this block assumes cooperative multitasking, i.e.,
                // between the if-statement and the assignment there are no
                // thread switches.
                // Reason is that between the initial const = this.; and this
                // point there is the derral.resolve() operation that might have
                // caused recursive calls to the Queue, especially, calling
                // Dispose() on the queue alredy (which would reset the var
                // here to null!).
                // That should generally hold true for javascript...
                if (this.privList === lists) {
                    this.privList = lists;
                }
            }
            this.privIsDrainInProgress = false;
        }
    }
    throwIfDispose() {
        if (this.isDisposed()) {
            if (this.privDisposeReason) {
                throw new Error_js_1.InvalidOperationError(this.privDisposeReason);
            }
            throw new Error_js_1.ObjectDisposedError("Queue");
        }
        else if (this.privIsDisposing) {
            throw new Error_js_1.InvalidOperationError("Queue disposing");
        }
    }
}
exports.Queue = Queue;



/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RawWebsocketMessage = void 0;
const ConnectionMessage_js_1 = __webpack_require__(30);
const Error_js_1 = __webpack_require__(31);
const Guid_js_1 = __webpack_require__(7);
class RawWebsocketMessage {
    constructor(messageType, payload, id) {
        this.privPayload = null;
        if (!payload) {
            throw new Error_js_1.ArgumentNullError("payload");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (messageType === ConnectionMessage_js_1.MessageType.Binary && Object.getPrototypeOf(payload).constructor.name !== "ArrayBuffer") {
            throw new Error_js_1.InvalidOperationError("Payload must be ArrayBuffer");
        }
        if (messageType === ConnectionMessage_js_1.MessageType.Text && !(typeof (payload) === "string")) {
            throw new Error_js_1.InvalidOperationError("Payload must be a string");
        }
        this.privMessageType = messageType;
        this.privPayload = payload;
        this.privId = id ? id : (0, Guid_js_1.createNoDashGuid)();
    }
    get messageType() {
        return this.privMessageType;
    }
    get payload() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.privPayload;
    }
    get textContent() {
        if (this.privMessageType === ConnectionMessage_js_1.MessageType.Binary) {
            throw new Error_js_1.InvalidOperationError("Not supported for binary message");
        }
        return this.privPayload;
    }
    get binaryContent() {
        if (this.privMessageType === ConnectionMessage_js_1.MessageType.Text) {
            throw new Error_js_1.InvalidOperationError("Not supported for text message");
        }
        return this.privPayload;
    }
    get id() {
        return this.privId;
    }
}
exports.RawWebsocketMessage = RawWebsocketMessage;



/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiffPcmEncoder = void 0;
class RiffPcmEncoder {
    constructor(actualSampleRate, desiredSampleRate) {
        this.privActualSampleRate = actualSampleRate;
        this.privDesiredSampleRate = desiredSampleRate;
    }
    encode(actualAudioFrame) {
        const audioFrame = this.downSampleAudioFrame(actualAudioFrame, this.privActualSampleRate, this.privDesiredSampleRate);
        if (!audioFrame) {
            return null;
        }
        const audioLength = audioFrame.length * 2;
        const buffer = new ArrayBuffer(audioLength);
        const view = new DataView(buffer);
        this.floatTo16BitPCM(view, 0, audioFrame);
        return buffer;
    }
    setString(view, offset, str) {
        for (let i = 0; i < str.length; i++) {
            view.setUint8(offset + i, str.charCodeAt(i));
        }
    }
    floatTo16BitPCM(view, offset, input) {
        for (let i = 0; i < input.length; i++, offset += 2) {
            const s = Math.max(-1, Math.min(1, input[i]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
    }
    downSampleAudioFrame(srcFrame, srcRate, dstRate) {
        if (!srcFrame) {
            return null;
        }
        if (dstRate === srcRate || dstRate > srcRate) {
            return srcFrame;
        }
        const ratio = srcRate / dstRate;
        const dstLength = Math.round(srcFrame.length / ratio);
        const dstFrame = new Float32Array(dstLength);
        let srcOffset = 0;
        let dstOffset = 0;
        while (dstOffset < dstLength) {
            const nextSrcOffset = Math.round((dstOffset + 1) * ratio);
            let accum = 0;
            let count = 0;
            while (srcOffset < nextSrcOffset && srcOffset < srcFrame.length) {
                accum += srcFrame[srcOffset++];
                count++;
            }
            dstFrame[dstOffset++] = accum / count;
        }
        return dstFrame;
    }
}
exports.RiffPcmEncoder = RiffPcmEncoder;



/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Stream = void 0;
const Error_js_1 = __webpack_require__(31);
const Guid_js_1 = __webpack_require__(7);
const Queue_js_1 = __webpack_require__(49);
class Stream {
    constructor(streamId) {
        this.privIsWriteEnded = false;
        this.privIsReadEnded = false;
        this.privId = streamId ? streamId : (0, Guid_js_1.createNoDashGuid)();
        this.privReaderQueue = new Queue_js_1.Queue();
    }
    get isClosed() {
        return this.privIsWriteEnded;
    }
    get isReadEnded() {
        return this.privIsReadEnded;
    }
    get id() {
        return this.privId;
    }
    close() {
        if (!this.privIsWriteEnded) {
            this.writeStreamChunk({
                buffer: null,
                isEnd: true,
                timeReceived: Date.now(),
            });
            this.privIsWriteEnded = true;
        }
    }
    writeStreamChunk(streamChunk) {
        this.throwIfClosed();
        if (!this.privReaderQueue.isDisposed()) {
            try {
                this.privReaderQueue.enqueue(streamChunk);
            }
            catch (e) {
                // Do nothing
            }
        }
    }
    read() {
        if (this.privIsReadEnded) {
            throw new Error_js_1.InvalidOperationError("Stream read has already finished");
        }
        return this.privReaderQueue
            .dequeue()
            .then(async (streamChunk) => {
            if (streamChunk === undefined || streamChunk.isEnd) {
                await this.privReaderQueue.dispose("End of stream reached");
            }
            return streamChunk;
        });
    }
    readEnded() {
        if (!this.privIsReadEnded) {
            this.privIsReadEnded = true;
            this.privReaderQueue = new Queue_js_1.Queue();
        }
    }
    throwIfClosed() {
        if (this.privIsWriteEnded) {
            throw new Error_js_1.InvalidOperationError("Stream closed");
        }
    }
}
exports.Stream = Stream;



/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationStatus = void 0;
/**
 * Defines translation status.
 * @class TranslationStatus
 */
var TranslationStatus;
(function (TranslationStatus) {
    /**
     * @member TranslationStatus.Success
     */
    TranslationStatus[TranslationStatus["Success"] = 0] = "Success";
    /**
     * @member TranslationStatus.Error
     */
    TranslationStatus[TranslationStatus["Error"] = 1] = "Error";
})(TranslationStatus = exports.TranslationStatus || (exports.TranslationStatus = {}));



/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChunkedArrayBufferStream = void 0;
const Exports_js_1 = __webpack_require__(4);
class ChunkedArrayBufferStream extends Exports_js_1.Stream {
    constructor(targetChunkSize, streamId) {
        super(streamId);
        this.privTargetChunkSize = Math.round(targetChunkSize);
        this.privNextBufferReadyBytes = 0;
    }
    writeStreamChunk(chunk) {
        // No pending write, and the buffer is the right size so write it.
        if (chunk.isEnd ||
            (0 === this.privNextBufferReadyBytes && chunk.buffer.byteLength === this.privTargetChunkSize)) {
            super.writeStreamChunk(chunk);
            return;
        }
        let bytesCopiedFromBuffer = 0;
        while (bytesCopiedFromBuffer < chunk.buffer.byteLength) {
            // Fill the next buffer.
            if (undefined === this.privNextBufferToWrite) {
                this.privNextBufferToWrite = new ArrayBuffer(this.privTargetChunkSize);
                this.privNextBufferStartTime = chunk.timeReceived;
            }
            // Find out how many bytes we can copy into the read buffer.
            const bytesToCopy = Math.min(chunk.buffer.byteLength - bytesCopiedFromBuffer, this.privTargetChunkSize - this.privNextBufferReadyBytes);
            const targetView = new Uint8Array(this.privNextBufferToWrite);
            const sourceView = new Uint8Array(chunk.buffer.slice(bytesCopiedFromBuffer, bytesToCopy + bytesCopiedFromBuffer));
            targetView.set(sourceView, this.privNextBufferReadyBytes);
            this.privNextBufferReadyBytes += bytesToCopy;
            bytesCopiedFromBuffer += bytesToCopy;
            // Are we ready to write?
            if (this.privNextBufferReadyBytes === this.privTargetChunkSize) {
                super.writeStreamChunk({
                    buffer: this.privNextBufferToWrite,
                    isEnd: false,
                    timeReceived: this.privNextBufferStartTime,
                });
                this.privNextBufferReadyBytes = 0;
                this.privNextBufferToWrite = undefined;
            }
        }
    }
    close() {
        // Send whatever is pending, then close the base class.
        if (0 !== this.privNextBufferReadyBytes && !this.isClosed) {
            super.writeStreamChunk({
                buffer: this.privNextBufferToWrite.slice(0, this.privNextBufferReadyBytes),
                isEnd: false,
                timeReceived: this.privNextBufferStartTime,
            });
        }
        super.close();
    }
}
exports.ChunkedArrayBufferStream = ChunkedArrayBufferStream;



/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Timeout = void 0;
class Timeout {
    static load() {
        // Prefilling the Maps with a function indexed by zero is necessary to be compliant with the specification.
        const scheduledTimeoutFunctions = new Map([[0, () => { }]]); // eslint-disable-line @typescript-eslint/no-empty-function
        const unhandledRequests = new Map();
        // eslint-disable-next-line
        const workerScript = `!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=14)}([function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return d}));const r=new Map,o=new Map,i=e=>{const t=r.get(e);if(void 0===t)throw new Error('There is no interval scheduled with the given id "'.concat(e,'".'));clearTimeout(t),r.delete(e)},u=e=>{const t=o.get(e);if(void 0===t)throw new Error('There is no timeout scheduled with the given id "'.concat(e,'".'));clearTimeout(t),o.delete(e)},f=(e,t)=>{let n,r;if("performance"in self){const o=performance.now();n=o,r=e-Math.max(0,o-t)}else n=Date.now(),r=e;return{expected:n+r,remainingDelay:r}},c=(e,t,n,r)=>{const o="performance"in self?performance.now():Date.now();o>n?postMessage({id:null,method:"call",params:{timerId:t}}):e.set(t,setTimeout(c,n-o,e,t,n))},a=(e,t,n)=>{const{expected:o,remainingDelay:i}=f(e,n);r.set(t,setTimeout(c,i,r,t,o))},d=(e,t,n)=>{const{expected:r,remainingDelay:i}=f(e,n);o.set(t,setTimeout(c,i,o,t,r))}},function(e,t,n){"use strict";n.r(t);var r=n(2);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);var i=n(3);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);var u=n(4);for(var o in u)"default"!==o&&function(e){n.d(t,e,(function(){return u[e]}))}(o);var f=n(5);for(var o in f)"default"!==o&&function(e){n.d(t,e,(function(){return f[e]}))}(o);var c=n(6);for(var o in c)"default"!==o&&function(e){n.d(t,e,(function(){return c[e]}))}(o);var a=n(7);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);var d=n(8);for(var o in d)"default"!==o&&function(e){n.d(t,e,(function(){return d[e]}))}(o);var s=n(9);for(var o in s)"default"!==o&&function(e){n.d(t,e,(function(){return s[e]}))}(o)},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){"use strict";n.r(t);var r=n(11);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);var i=n(12);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);var u=n(13);for(var o in u)"default"!==o&&function(e){n.d(t,e,(function(){return u[e]}))}(o)},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(1);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);var u=n(10);for(var i in u)"default"!==i&&function(e){n.d(t,e,(function(){return u[e]}))}(i);addEventListener("message",({data:e})=>{try{if("clear"===e.method){const{id:t,params:{timerId:n}}=e;Object(r.b)(n),postMessage({error:null,id:t})}else{if("set"!==e.method)throw new Error('The given method "'.concat(e.method,'" is not supported'));{const{params:{delay:t,now:n,timerId:o}}=e;Object(r.d)(t,o,n)}}}catch(t){postMessage({error:{message:t.message},id:e.id,result:null})}})}]);`;
        const workerUrl = "data:text/javascript;base64," + btoa(workerScript);
        const worker = new Worker(workerUrl);
        worker.addEventListener("message", ({ data }) => {
            if (Timeout.isCallNotification(data)) {
                const { params: { timerId } } = data;
                const idOrFunc = scheduledTimeoutFunctions.get(timerId);
                if (typeof idOrFunc === "number") {
                    const unhandledTimerId = unhandledRequests.get(idOrFunc);
                    if (unhandledTimerId === undefined ||
                        unhandledTimerId !== timerId) {
                        throw new Error("The timer is in an undefined state.");
                    }
                }
                else if (typeof idOrFunc !== "undefined") {
                    idOrFunc();
                    // A timeout can be safely deleted because it is only called once.
                    scheduledTimeoutFunctions.delete(timerId);
                }
                else {
                    throw new Error("The timer is in an undefined state.");
                }
            }
            else if (Timeout.isClearResponse(data)) {
                const { id } = data;
                const unhandledTimerId = unhandledRequests.get(id);
                if (unhandledTimerId === undefined) {
                    throw new Error("The timer is in an undefined state.");
                }
                unhandledRequests.delete(id);
                scheduledTimeoutFunctions.delete(unhandledTimerId);
            }
            else {
                const { error: { message } } = data;
                throw new Error(message);
            }
        });
        const clearTimeout = (timerId) => {
            const id = Math.random();
            unhandledRequests.set(id, timerId);
            scheduledTimeoutFunctions.set(timerId, id);
            worker.postMessage({
                id,
                method: "clear",
                params: { timerId }
            });
        };
        const setTimeout = (func, delay) => {
            const timerId = Math.random();
            scheduledTimeoutFunctions.set(timerId, func);
            worker.postMessage({
                id: null,
                method: "set",
                params: {
                    delay,
                    now: performance.now(),
                    timerId
                }
            });
            return timerId;
        };
        return {
            clearTimeout,
            setTimeout
        };
    }
    static loadWorkerTimers() {
        return () => {
            if (Timeout.workerTimers !== null) {
                return Timeout.workerTimers;
            }
            Timeout.workerTimers = Timeout.load();
            return Timeout.workerTimers;
        };
    }
    static isCallNotification(message) {
        return message.method !== undefined && message.method === "call";
    }
    static isClearResponse(message) {
        return message.error === null && typeof message.id === "number";
    }
}
exports.Timeout = Timeout;
Timeout.workerTimers = null;
Timeout.clearTimeout = (timerId) => Timeout.timers().clearTimeout(timerId);
Timeout.setTimeout = (func, delay) => Timeout.timers().setTimeout(func, delay);
Timeout.timers = Timeout.loadWorkerTimers();



/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OCSPCacheUpdateErrorEvent = exports.OCSPResponseRetrievedEvent = exports.OCSPCacheFetchErrorEvent = exports.OCSPVerificationFailedEvent = exports.OCSPCacheHitEvent = exports.OCSPCacheEntryNeedsRefreshEvent = exports.OCSPCacheEntryExpiredEvent = exports.OCSPWSUpgradeStartedEvent = exports.OCSPStapleReceivedEvent = exports.OCSPCacheUpdateCompleteEvent = exports.OCSPDiskCacheStoreEvent = exports.OCSPMemoryCacheStoreEvent = exports.OCSPCacheUpdateNeededEvent = exports.OCSPDiskCacheHitEvent = exports.OCSPCacheMissEvent = exports.OCSPMemoryCacheHitEvent = exports.OCSPEvent = void 0;
/* eslint-disable max-classes-per-file */
const PlatformEvent_js_1 = __webpack_require__(6);
class OCSPEvent extends PlatformEvent_js_1.PlatformEvent {
    constructor(eventName, eventType, signature) {
        super(eventName, eventType);
        this.privSignature = signature;
    }
}
exports.OCSPEvent = OCSPEvent;
class OCSPMemoryCacheHitEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPMemoryCacheHitEvent", PlatformEvent_js_1.EventType.Debug, signature);
    }
}
exports.OCSPMemoryCacheHitEvent = OCSPMemoryCacheHitEvent;
class OCSPCacheMissEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPCacheMissEvent", PlatformEvent_js_1.EventType.Debug, signature);
    }
}
exports.OCSPCacheMissEvent = OCSPCacheMissEvent;
class OCSPDiskCacheHitEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPDiskCacheHitEvent", PlatformEvent_js_1.EventType.Debug, signature);
    }
}
exports.OCSPDiskCacheHitEvent = OCSPDiskCacheHitEvent;
class OCSPCacheUpdateNeededEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPCacheUpdateNeededEvent", PlatformEvent_js_1.EventType.Debug, signature);
    }
}
exports.OCSPCacheUpdateNeededEvent = OCSPCacheUpdateNeededEvent;
class OCSPMemoryCacheStoreEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPMemoryCacheStoreEvent", PlatformEvent_js_1.EventType.Debug, signature);
    }
}
exports.OCSPMemoryCacheStoreEvent = OCSPMemoryCacheStoreEvent;
class OCSPDiskCacheStoreEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPDiskCacheStoreEvent", PlatformEvent_js_1.EventType.Debug, signature);
    }
}
exports.OCSPDiskCacheStoreEvent = OCSPDiskCacheStoreEvent;
class OCSPCacheUpdateCompleteEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPCacheUpdateCompleteEvent", PlatformEvent_js_1.EventType.Debug, signature);
    }
}
exports.OCSPCacheUpdateCompleteEvent = OCSPCacheUpdateCompleteEvent;
class OCSPStapleReceivedEvent extends OCSPEvent {
    constructor() {
        super("OCSPStapleReceivedEvent", PlatformEvent_js_1.EventType.Debug, "");
    }
}
exports.OCSPStapleReceivedEvent = OCSPStapleReceivedEvent;
class OCSPWSUpgradeStartedEvent extends OCSPEvent {
    constructor(serialNumber) {
        super("OCSPWSUpgradeStartedEvent", PlatformEvent_js_1.EventType.Debug, serialNumber);
    }
}
exports.OCSPWSUpgradeStartedEvent = OCSPWSUpgradeStartedEvent;
class OCSPCacheEntryExpiredEvent extends OCSPEvent {
    constructor(serialNumber, expireTime) {
        super("OCSPCacheEntryExpiredEvent", PlatformEvent_js_1.EventType.Debug, serialNumber);
        this.privExpireTime = expireTime;
    }
}
exports.OCSPCacheEntryExpiredEvent = OCSPCacheEntryExpiredEvent;
class OCSPCacheEntryNeedsRefreshEvent extends OCSPEvent {
    constructor(serialNumber, startTime, expireTime) {
        super("OCSPCacheEntryNeedsRefreshEvent", PlatformEvent_js_1.EventType.Debug, serialNumber);
        this.privExpireTime = expireTime;
        this.privStartTime = startTime;
    }
}
exports.OCSPCacheEntryNeedsRefreshEvent = OCSPCacheEntryNeedsRefreshEvent;
class OCSPCacheHitEvent extends OCSPEvent {
    constructor(serialNumber, startTime, expireTime) {
        super("OCSPCacheHitEvent", PlatformEvent_js_1.EventType.Debug, serialNumber);
        this.privExpireTime = expireTime;
        this.privExpireTimeString = new Date(expireTime).toLocaleDateString();
        this.privStartTime = startTime;
        this.privStartTimeString = new Date(startTime).toLocaleTimeString();
    }
}
exports.OCSPCacheHitEvent = OCSPCacheHitEvent;
class OCSPVerificationFailedEvent extends OCSPEvent {
    constructor(serialNumber, error) {
        super("OCSPVerificationFailedEvent", PlatformEvent_js_1.EventType.Debug, serialNumber);
        this.privError = error;
    }
}
exports.OCSPVerificationFailedEvent = OCSPVerificationFailedEvent;
class OCSPCacheFetchErrorEvent extends OCSPEvent {
    constructor(serialNumber, error) {
        super("OCSPCacheFetchErrorEvent", PlatformEvent_js_1.EventType.Debug, serialNumber);
        this.privError = error;
    }
}
exports.OCSPCacheFetchErrorEvent = OCSPCacheFetchErrorEvent;
class OCSPResponseRetrievedEvent extends OCSPEvent {
    constructor(serialNumber) {
        super("OCSPResponseRetrievedEvent", PlatformEvent_js_1.EventType.Debug, serialNumber);
    }
}
exports.OCSPResponseRetrievedEvent = OCSPResponseRetrievedEvent;
class OCSPCacheUpdateErrorEvent extends OCSPEvent {
    constructor(serialNumber, error) {
        super("OCSPCacheUpdateErrorEvent", PlatformEvent_js_1.EventType.Debug, serialNumber);
        this.privError = error;
    }
}
exports.OCSPCacheUpdateErrorEvent = OCSPCacheUpdateErrorEvent;



/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackgroundEvent = void 0;
const Exports_js_1 = __webpack_require__(4);
class BackgroundEvent extends Exports_js_1.PlatformEvent {
    constructor(error) {
        super("BackgroundEvent", Exports_js_1.EventType.Error);
        this.privError = error;
    }
    get error() {
        return this.privError;
    }
}
exports.BackgroundEvent = BackgroundEvent;



/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeaderNames = void 0;
class HeaderNames {
}
exports.HeaderNames = HeaderNames;
HeaderNames.AuthKey = "Ocp-Apim-Subscription-Key";
HeaderNames.Authorization = "Authorization";
HeaderNames.SpIDAuthKey = "Apim-Subscription-Id";
HeaderNames.ConnectionId = "X-ConnectionId";
HeaderNames.ContentType = "Content-Type";
HeaderNames.CustomCommandsAppId = "X-CommandsAppId";
HeaderNames.Path = "Path";
HeaderNames.RequestId = "X-RequestId";
HeaderNames.RequestStreamId = "X-StreamId";
HeaderNames.RequestTimestamp = "X-Timestamp";
// Reliable reconnect protocol (service-originated) headers. The service tag is not a
// header; it arrives in the turn.start body under "$.context.serviceTag".
HeaderNames.ContinuationToken = "X-Continuation-Token";
// Resume offset for the single audio stream (id "1"); the stream's position otherwise
// rides on X-Continuation-Token, so there is no per-primary-stream offset header.
HeaderNames.ContinuationAudioStreamOffset = "X-Continuation-Audio-Streams-1-Offset";



/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfo = void 0;
class AuthInfo {
    constructor(headerName, token) {
        this.privHeaderName = headerName;
        this.privToken = token;
    }
    get headerName() {
        return this.privHeaderName;
    }
    get token() {
        return this.privToken;
    }
}
exports.AuthInfo = AuthInfo;



/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitiveTokenAuthentication = void 0;
const Exports_js_1 = __webpack_require__(4);
const IAuthentication_js_1 = __webpack_require__(60);
const HeaderNames_js_1 = __webpack_require__(59);
class CognitiveTokenAuthentication {
    constructor(fetchCallback, fetchOnExpiryCallback) {
        if (!fetchCallback) {
            throw new Exports_js_1.ArgumentNullError("fetchCallback");
        }
        if (!fetchOnExpiryCallback) {
            throw new Exports_js_1.ArgumentNullError("fetchOnExpiryCallback");
        }
        this.privFetchCallback = fetchCallback;
        this.privFetchOnExpiryCallback = fetchOnExpiryCallback;
    }
    fetch(authFetchEventId) {
        return this.privFetchCallback(authFetchEventId).then((token) => new IAuthentication_js_1.AuthInfo(HeaderNames_js_1.HeaderNames.Authorization, token === undefined ? undefined : CognitiveTokenAuthentication.privTokenPrefix + token));
    }
    fetchOnExpiry(authFetchEventId) {
        return this.privFetchOnExpiryCallback(authFetchEventId).then((token) => new IAuthentication_js_1.AuthInfo(HeaderNames_js_1.HeaderNames.Authorization, token === undefined ? undefined : CognitiveTokenAuthentication.privTokenPrefix + token));
    }
}
exports.CognitiveTokenAuthentication = CognitiveTokenAuthentication;
CognitiveTokenAuthentication.privTokenPrefix = "Bearer ";



/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable max-classes-per-file */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RecognitionEndedEvent = exports.RecognitionCompletionStatus = exports.RecognitionStartedEvent = exports.ConnectingToServiceEvent = exports.ListeningStartedEvent = exports.RecognitionTriggeredEvent = exports.SpeechRecognitionEvent = void 0;
const Exports_js_1 = __webpack_require__(4);
class SpeechRecognitionEvent extends Exports_js_1.PlatformEvent {
    constructor(eventName, requestId, sessionId, eventType = Exports_js_1.EventType.Info) {
        super(eventName, eventType);
        this.privRequestId = requestId;
        this.privSessionId = sessionId;
    }
    get requestId() {
        return this.privRequestId;
    }
    get sessionId() {
        return this.privSessionId;
    }
}
exports.SpeechRecognitionEvent = SpeechRecognitionEvent;
class RecognitionTriggeredEvent extends SpeechRecognitionEvent {
    constructor(requestId, sessionId, audioSourceId, audioNodeId) {
        super("RecognitionTriggeredEvent", requestId, sessionId);
        this.privAudioSourceId = audioSourceId;
        this.privAudioNodeId = audioNodeId;
    }
    get audioSourceId() {
        return this.privAudioSourceId;
    }
    get audioNodeId() {
        return this.privAudioNodeId;
    }
}
exports.RecognitionTriggeredEvent = RecognitionTriggeredEvent;
class ListeningStartedEvent extends SpeechRecognitionEvent {
    constructor(requestId, sessionId, audioSourceId, audioNodeId) {
        super("ListeningStartedEvent", requestId, sessionId);
        this.privAudioSourceId = audioSourceId;
        this.privAudioNodeId = audioNodeId;
    }
    get audioSourceId() {
        return this.privAudioSourceId;
    }
    get audioNodeId() {
        return this.privAudioNodeId;
    }
}
exports.ListeningStartedEvent = ListeningStartedEvent;
class ConnectingToServiceEvent extends SpeechRecognitionEvent {
    constructor(requestId, authFetchEventid, sessionId) {
        super("ConnectingToServiceEvent", requestId, sessionId);
        this.privAuthFetchEventid = authFetchEventid;
    }
    get authFetchEventid() {
        return this.privAuthFetchEventid;
    }
}
exports.ConnectingToServiceEvent = ConnectingToServiceEvent;
class RecognitionStartedEvent extends SpeechRecognitionEvent {
    constructor(requestId, audioSourceId, audioNodeId, authFetchEventId, sessionId) {
        super("RecognitionStartedEvent", requestId, sessionId);
        this.privAudioSourceId = audioSourceId;
        this.privAudioNodeId = audioNodeId;
        this.privAuthFetchEventId = authFetchEventId;
    }
    get audioSourceId() {
        return this.privAudioSourceId;
    }
    get audioNodeId() {
        return this.privAudioNodeId;
    }
    get authFetchEventId() {
        return this.privAuthFetchEventId;
    }
}
exports.RecognitionStartedEvent = RecognitionStartedEvent;
var RecognitionCompletionStatus;
(function (RecognitionCompletionStatus) {
    RecognitionCompletionStatus[RecognitionCompletionStatus["Success"] = 0] = "Success";
    RecognitionCompletionStatus[RecognitionCompletionStatus["AudioSourceError"] = 1] = "AudioSourceError";
    RecognitionCompletionStatus[RecognitionCompletionStatus["AudioSourceTimeout"] = 2] = "AudioSourceTimeout";
    RecognitionCompletionStatus[RecognitionCompletionStatus["AuthTokenFetchError"] = 3] = "AuthTokenFetchError";
    RecognitionCompletionStatus[RecognitionCompletionStatus["AuthTokenFetchTimeout"] = 4] = "AuthTokenFetchTimeout";
    RecognitionCompletionStatus[RecognitionCompletionStatus["UnAuthorized"] = 5] = "UnAuthorized";
    RecognitionCompletionStatus[RecognitionCompletionStatus["ConnectTimeout"] = 6] = "ConnectTimeout";
    RecognitionCompletionStatus[RecognitionCompletionStatus["ConnectError"] = 7] = "ConnectError";
    RecognitionCompletionStatus[RecognitionCompletionStatus["ClientRecognitionActivityTimeout"] = 8] = "ClientRecognitionActivityTimeout";
    RecognitionCompletionStatus[RecognitionCompletionStatus["UnknownError"] = 9] = "UnknownError";
})(RecognitionCompletionStatus = exports.RecognitionCompletionStatus || (exports.RecognitionCompletionStatus = {}));
class RecognitionEndedEvent extends SpeechRecognitionEvent {
    constructor(requestId, audioSourceId, audioNodeId, authFetchEventId, sessionId, serviceTag, status, error) {
        super("RecognitionEndedEvent", requestId, sessionId, status === RecognitionCompletionStatus.Success ? Exports_js_1.EventType.Info : Exports_js_1.EventType.Error);
        this.privAudioSourceId = audioSourceId;
        this.privAudioNodeId = audioNodeId;
        this.privAuthFetchEventId = authFetchEventId;
        this.privStatus = status;
        this.privError = error;
        this.privServiceTag = serviceTag;
    }
    get audioSourceId() {
        return this.privAudioSourceId;
    }
    get audioNodeId() {
        return this.privAudioNodeId;
    }
    get authFetchEventId() {
        return this.privAuthFetchEventId;
    }
    get serviceTag() {
        return this.privServiceTag;
    }
    get status() {
        return this.privStatus;
    }
    get error() {
        return this.privError;
    }
}
exports.RecognitionEndedEvent = RecognitionEndedEvent;



/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceRecognizerBase = void 0;
const Exports_js_1 = __webpack_require__(66);
const Exports_js_2 = __webpack_require__(4);
const Exports_js_3 = __webpack_require__(85);
const Exports_js_4 = __webpack_require__(2);
const SpeechConnectionMessage_Internal_js_1 = __webpack_require__(188);
const Segmentation_js_1 = __webpack_require__(189);
const PhraseDetectionContext_js_1 = __webpack_require__(116);
const OnSuccess_js_1 = __webpack_require__(190);
const InterimResults_js_1 = __webpack_require__(191);
const LanguageIdContext_js_1 = __webpack_require__(192);
const OnSuccess_js_2 = __webpack_require__(193);
const OnUnknown_js_1 = __webpack_require__(194);
const InterimResults_js_2 = __webpack_require__(195);
const PhraseResults_js_1 = __webpack_require__(196);
const OnSuccess_js_3 = __webpack_require__(197);
const InteractiveEnrichmentOptions_js_1 = __webpack_require__(198);
const ConversationEnrichmentOptions_js_1 = __webpack_require__(199);
const DictationEnrichmentOptions_js_1 = __webpack_require__(200);
const DisfluencyMode_js_1 = __webpack_require__(201);
class ServiceRecognizerBase {
    constructor(authentication, connectionFactory, audioSource, recognizerConfig, recognizer) {
        // A promise for a configured connection.
        // Do not consume directly, call fetchConnection instead.
        this.privConnectionConfigurationPromise = undefined;
        // A promise for a connection, but one that has not had the speech context sent yet.
        // Do not consume directly, call fetchConnection instead.
        this.privConnectionPromise = undefined;
        this.privSetTimeout = setTimeout;
        this.privIsLiveAudio = false;
        this.privAverageBytesPerMs = 0;
        this.privEnableReliableReconnect = false;
        this.privEnableSpeakerId = false;
        this.privExpectContentAssessmentResponse = false;
        this.recognizeOverride = undefined;
        this.disconnectOverride = undefined;
        this.receiveMessageOverride = undefined;
        this.sendPrePayloadJSONOverride = undefined;
        this.postConnectImplOverride = undefined;
        this.configConnectionOverride = undefined;
        this.handleSpeechPhraseMessage = undefined;
        this.handleSpeechHypothesisMessage = undefined;
        if (!authentication) {
            throw new Exports_js_2.ArgumentNullError("authentication");
        }
        if (!connectionFactory) {
            throw new Exports_js_2.ArgumentNullError("connectionFactory");
        }
        if (!audioSource) {
            throw new Exports_js_2.ArgumentNullError("audioSource");
        }
        if (!recognizerConfig) {
            throw new Exports_js_2.ArgumentNullError("recognizerConfig");
        }
        this.privEnableSpeakerId = recognizerConfig.isSpeakerDiarizationEnabled;
        this.privMustReportEndOfStream = false;
        this.privAuthentication = authentication;
        this.privConnectionFactory = connectionFactory;
        this.privAudioSource = audioSource;
        this.privRecognizerConfig = recognizerConfig;
        this.privIsDisposed = false;
        this.privRecognizer = recognizer;
        this.privRequestSession = new Exports_js_4.RequestSession(this.privAudioSource.id());
        this.privConnectionEvents = new Exports_js_2.EventSource();
        this.privServiceEvents = new Exports_js_2.EventSource();
        this.privDynamicGrammar = new Exports_js_4.DynamicGrammarBuilder();
        this.privSpeechContext = new Exports_js_4.SpeechContext(this.privDynamicGrammar);
        this.privAgentConfig = new Exports_js_4.AgentConfig();
        // Multi-channel always relies on the continuation/resume protocol, so reliable reconnect
        // is enabled implicitly whenever multi-channel processing is active.
        this.privEnableReliableReconnect =
            this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.Speech_EnableMultiChannelProcessing, "false").toLowerCase() === "true";
        this.privContinuationState = new Exports_js_4.ReconnectContinuationState();
        const webWorkerLoadType = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.WebWorkerLoadType, "on").toLowerCase();
        if (webWorkerLoadType === "on" && typeof (Blob) !== "undefined" && typeof (Worker) !== "undefined") {
            this.privSetTimeout = Exports_js_2.Timeout.setTimeout;
        }
        else {
            if (typeof window !== "undefined") {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.privSetTimeout = window.setTimeout.bind(window);
            }
            if (typeof globalThis !== "undefined") {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.privSetTimeout = globalThis.setTimeout.bind(globalThis);
            }
        }
        this.connectionEvents.attach((connectionEvent) => {
            if (connectionEvent.name === "ConnectionClosedEvent") {
                const connectionClosedEvent = connectionEvent;
                if (connectionClosedEvent.statusCode === 1003 ||
                    connectionClosedEvent.statusCode === 1007 ||
                    connectionClosedEvent.statusCode === 1002 ||
                    connectionClosedEvent.statusCode === 4000 ||
                    this.privRequestSession.numConnectionAttempts > this.privRecognizerConfig.maxRetryCount) {
                    void this.cancelRecognitionLocal(Exports_js_3.CancellationReason.Error, connectionClosedEvent.statusCode === 1007 ? Exports_js_3.CancellationErrorCode.BadRequestParameters : Exports_js_3.CancellationErrorCode.ConnectionFailure, `${connectionClosedEvent.reason} websocket error code: ${connectionClosedEvent.statusCode}`);
                }
            }
        });
        if (this.privEnableSpeakerId) {
            this.privDiarizationSessionId = (0, Exports_js_2.createNoDashGuid)();
        }
    }
    setTranslationJson() {
        const targetLanguages = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationToLanguages, undefined);
        if (targetLanguages !== undefined) {
            const languages = targetLanguages.split(",");
            const translationVoice = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationVoice, undefined);
            const categoryId = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationCategoryId, undefined);
            const action = (translationVoice !== undefined) ? OnSuccess_js_1.NextAction.Synthesize : OnSuccess_js_1.NextAction.None;
            this.privSpeechContext.getContext().translation = {
                onPassthrough: { action },
                onSuccess: { action },
                output: {
                    includePassThroughResults: true,
                    interimResults: { mode: InterimResults_js_1.Mode.Always }
                },
                targetLanguages: languages,
            };
            // Add category if specified
            if (categoryId !== undefined) {
                this.privSpeechContext.getContext().translation.category = categoryId;
            }
            if (translationVoice !== undefined) {
                const languageToVoiceMap = {};
                for (const lang of languages) {
                    languageToVoiceMap[lang] = translationVoice;
                }
                this.privSpeechContext.getContext().synthesis = {
                    defaultVoices: languageToVoiceMap
                };
            }
            // Configure phrase detection for translation
            const phraseDetection = this.privSpeechContext.getContext().phraseDetection || {};
            phraseDetection.onSuccess = { action: OnSuccess_js_3.NextAction.Translate };
            phraseDetection.onInterim = { action: OnSuccess_js_3.NextAction.Translate };
            this.privSpeechContext.getContext().phraseDetection = phraseDetection;
        }
    }
    setSpeechSegmentationTimeoutJson() {
        const speechSegmentationSilenceTimeoutMs = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.Speech_SegmentationSilenceTimeoutMs, undefined);
        const speechSegmentationMaximumTimeMs = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.Speech_SegmentationMaximumTimeMs, undefined);
        const speechSegmentationStrategy = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.Speech_SegmentationStrategy, undefined);
        const segmentation = {
            mode: Segmentation_js_1.SegmentationMode.Normal,
        };
        let configuredSegment = false;
        if (speechSegmentationStrategy !== undefined) {
            configuredSegment = true;
            let segMode = Segmentation_js_1.SegmentationMode.Normal;
            switch (speechSegmentationStrategy.toLowerCase()) {
                case "default":
                    break;
                case "time":
                    segMode = Segmentation_js_1.SegmentationMode.Custom;
                    break;
                case "semantic":
                    segMode = Segmentation_js_1.SegmentationMode.Semantic;
                    break;
            }
            segmentation.mode = segMode;
        }
        if (speechSegmentationSilenceTimeoutMs !== undefined) {
            configuredSegment = true;
            const segmentationSilenceTimeoutMs = parseInt(speechSegmentationSilenceTimeoutMs, 10);
            segmentation.mode = Segmentation_js_1.SegmentationMode.Custom;
            segmentation.segmentationSilenceTimeoutMs = segmentationSilenceTimeoutMs;
        }
        if (speechSegmentationMaximumTimeMs !== undefined) {
            configuredSegment = true;
            const segmentationMaximumTimeMs = parseInt(speechSegmentationMaximumTimeMs, 10);
            segmentation.mode = Segmentation_js_1.SegmentationMode.Custom;
            segmentation.segmentationForcedTimeoutMs = segmentationMaximumTimeMs;
        }
        if (configuredSegment) {
            const phraseDetection = this.privSpeechContext.getContext().phraseDetection || {};
            phraseDetection.mode = this.recognitionMode;
            switch (this.recognitionMode) {
                case PhraseDetectionContext_js_1.RecognitionMode.Conversation:
                    phraseDetection.conversation = phraseDetection.conversation ?? { segmentation: {} };
                    phraseDetection.conversation.segmentation = segmentation;
                    break;
                case PhraseDetectionContext_js_1.RecognitionMode.Interactive:
                    phraseDetection.interactive = phraseDetection.interactive ?? { segmentation: {} };
                    phraseDetection.interactive.segmentation = segmentation;
                    break;
                case PhraseDetectionContext_js_1.RecognitionMode.Dictation:
                    phraseDetection.dictation = phraseDetection.dictation ?? {};
                    phraseDetection.dictation.segmentation = segmentation;
                    break;
            }
            this.privSpeechContext.getContext().phraseDetection = phraseDetection;
        }
    }
    setLanguageIdJson() {
        const phraseDetection = this.privSpeechContext.getContext().phraseDetection || {};
        if (this.privRecognizerConfig.autoDetectSourceLanguages !== undefined) {
            const sourceLanguages = this.privRecognizerConfig.autoDetectSourceLanguages.split(",");
            if (sourceLanguages.length === 1 && sourceLanguages[0] === Exports_js_4.AutoDetectSourceLanguagesOpenRangeOptionName) {
                sourceLanguages[0] = "UND";
            }
            let speechContextLidMode;
            if (this.privRecognizerConfig.languageIdMode === "Continuous") {
                speechContextLidMode = LanguageIdContext_js_1.LanguageIdDetectionMode.DetectContinuous;
            }
            else { // recognizerConfig.languageIdMode === "AtStart"
                speechContextLidMode = LanguageIdContext_js_1.LanguageIdDetectionMode.DetectAtAudioStart;
            }
            this.privSpeechContext.getContext().languageId = {
                languages: sourceLanguages,
                mode: speechContextLidMode,
                onSuccess: { action: OnSuccess_js_2.NextAction.Recognize },
                onUnknown: { action: OnUnknown_js_1.OnUnknownAction.None },
                priority: LanguageIdContext_js_1.LanguageIdDetectionPriority.PrioritizeLatency
            };
            this.privSpeechContext.getContext().phraseOutput = {
                interimResults: {
                    resultType: InterimResults_js_2.ResultType.Auto
                },
                phraseResults: {
                    resultType: PhraseResults_js_1.PhraseResultOutputType.Always
                }
            };
            const customModels = this.privRecognizerConfig.sourceLanguageModels;
            if (customModels !== undefined) {
                phraseDetection.customModels = customModels;
                phraseDetection.onInterim = { action: OnSuccess_js_3.NextAction.None };
                phraseDetection.onSuccess = { action: OnSuccess_js_3.NextAction.None };
            }
        }
        // No longer setting translation-specific configuration here
        // This is now handled in setTranslationJson and setupTranslationWithLanguageId methods
        this.privSpeechContext.getContext().phraseDetection = phraseDetection;
    }
    setOutputDetailLevelJson() {
        const requestWordLevelTimestamps = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceResponse_RequestWordLevelTimestamps, "false").toLowerCase();
        if (requestWordLevelTimestamps === "true") {
            this.privSpeechContext.setWordLevelTimings();
        }
        else {
            const outputFormat = this.privRecognizerConfig.parameters.getProperty(Exports_js_4.OutputFormatPropertyName, Exports_js_3.OutputFormat[Exports_js_3.OutputFormat.Simple]).toLowerCase();
            if (outputFormat === Exports_js_3.OutputFormat[Exports_js_3.OutputFormat.Detailed].toLocaleLowerCase()) {
                this.privSpeechContext.setDetailedOutputFormat();
            }
        }
    }
    setSpeechStartEventSensitivityJson() {
        const sensitivity = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.Speech_StartEventSensitivity, undefined);
        if (sensitivity !== undefined) {
            let configuredSensitivity = false;
            switch (sensitivity.toLowerCase()) {
                case PhraseDetectionContext_js_1.SpeechStartEventSensitivity.Low:
                case PhraseDetectionContext_js_1.SpeechStartEventSensitivity.Medium:
                case PhraseDetectionContext_js_1.SpeechStartEventSensitivity.High:
                    configuredSensitivity = true;
                    break;
            }
            if (configuredSensitivity) {
                const phraseDetection = this.privSpeechContext.getContext().phraseDetection || {};
                phraseDetection.voiceOnsetSensitivity = sensitivity.toLowerCase();
                this.privSpeechContext.getContext().phraseDetection = phraseDetection;
            }
        }
    }
    setPostProcessingOptionJson() {
        const postProcessingOption = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceResponse_PostProcessingOption, undefined);
        const phraseDetection = this.privSpeechContext.getContext().phraseDetection || {};
        phraseDetection.enrichment = phraseDetection.enrichment || {};
        // Clear stale postprocessing fields for the current mode before applying new value.
        // This prevents leftover fields when switching between truetext/non-truetext/absent across turns.
        const modeObj = this.recognitionMode === PhraseDetectionContext_js_1.RecognitionMode.Conversation
            ? phraseDetection.enrichment.conversation
            : this.recognitionMode === PhraseDetectionContext_js_1.RecognitionMode.Interactive
                ? phraseDetection.enrichment.interactive
                : phraseDetection.enrichment.dictation;
        if (modeObj) {
            delete modeObj.postprocessingoption;
            delete modeObj.punctuationMode;
            delete modeObj.disfluencyMode;
            delete modeObj.intermediatePunctuationMode;
            delete modeObj.intermediatedisfluencymode;
        }
        if (postProcessingOption !== undefined) {
            if (postProcessingOption.toLowerCase() === "truetext") {
                // Client-side expansion for "truetext" - set specific properties
                switch (this.recognitionMode) {
                    case PhraseDetectionContext_js_1.RecognitionMode.Conversation:
                        phraseDetection.enrichment.conversation = phraseDetection.enrichment.conversation || {};
                        phraseDetection.enrichment.conversation.punctuationMode = ConversationEnrichmentOptions_js_1.ConversationPunctuationMode.Implicit;
                        phraseDetection.enrichment.conversation.disfluencyMode = DisfluencyMode_js_1.DisfluencyMode.Removed;
                        phraseDetection.enrichment.conversation.intermediatePunctuationMode = ConversationEnrichmentOptions_js_1.ConversationPunctuationMode.Implicit;
                        phraseDetection.enrichment.conversation.intermediatedisfluencymode = DisfluencyMode_js_1.DisfluencyMode.Removed;
                        break;
                    case PhraseDetectionContext_js_1.RecognitionMode.Interactive:
                        phraseDetection.enrichment.interactive = phraseDetection.enrichment.interactive || {};
                        phraseDetection.enrichment.interactive.punctuationMode = InteractiveEnrichmentOptions_js_1.InteractivePunctuationMode.Implicit;
                        phraseDetection.enrichment.interactive.disfluencyMode = DisfluencyMode_js_1.DisfluencyMode.Removed;
                        phraseDetection.enrichment.interactive.intermediatePunctuationMode = InteractiveEnrichmentOptions_js_1.InteractivePunctuationMode.Implicit;
                        phraseDetection.enrichment.interactive.intermediatedisfluencymode = DisfluencyMode_js_1.DisfluencyMode.Removed;
                        break;
                    case PhraseDetectionContext_js_1.RecognitionMode.Dictation:
                        phraseDetection.enrichment.dictation = phraseDetection.enrichment.dictation || {};
                        phraseDetection.enrichment.dictation.punctuationMode = DictationEnrichmentOptions_js_1.DictationPunctuationMode.Implicit;
                        phraseDetection.enrichment.dictation.disfluencyMode = DisfluencyMode_js_1.DisfluencyMode.Removed;
                        phraseDetection.enrichment.dictation.intermediatePunctuationMode = DictationEnrichmentOptions_js_1.DictationPunctuationMode.Implicit;
                        phraseDetection.enrichment.dictation.intermediatedisfluencymode = DisfluencyMode_js_1.DisfluencyMode.Removed;
                        break;
                }
            }
            else {
                // Service-side handling for all other strings
                switch (this.recognitionMode) {
                    case PhraseDetectionContext_js_1.RecognitionMode.Conversation:
                        phraseDetection.enrichment.conversation = phraseDetection.enrichment.conversation || {};
                        phraseDetection.enrichment.conversation.postprocessingoption = postProcessingOption;
                        break;
                    case PhraseDetectionContext_js_1.RecognitionMode.Interactive:
                        phraseDetection.enrichment.interactive = phraseDetection.enrichment.interactive || {};
                        phraseDetection.enrichment.interactive.postprocessingoption = postProcessingOption;
                        break;
                    case PhraseDetectionContext_js_1.RecognitionMode.Dictation:
                        phraseDetection.enrichment.dictation = phraseDetection.enrichment.dictation || {};
                        phraseDetection.enrichment.dictation.postprocessingoption = postProcessingOption;
                        break;
                }
            }
        }
        this.privSpeechContext.getContext().phraseDetection = phraseDetection;
    }
    setLanguageJson() {
        const phraseDetection = this.privSpeechContext.getContext().phraseDetection || {};
        if (this.privRecognizerConfig.autoDetectSourceLanguages !== undefined) {
            // Auto-detect is configured — language is managed by the language ID subsystem, clear any stale value
            delete phraseDetection.language;
        }
        else {
            const language = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage, undefined);
            if (language !== undefined) {
                phraseDetection.language = language;
            }
            else {
                delete phraseDetection.language;
            }
        }
        this.privSpeechContext.getContext().phraseDetection = phraseDetection;
    }
    setInitialSilenceTimeoutJson() {
        const phraseDetection = this.privSpeechContext.getContext().phraseDetection || {};
        const value = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, undefined);
        if (value !== undefined) {
            phraseDetection.initialSilenceTimeout = parseInt(value, 10);
        }
        else {
            delete phraseDetection.initialSilenceTimeout;
        }
        this.privSpeechContext.getContext().phraseDetection = phraseDetection;
    }
    setEndSilenceTimeoutJson() {
        const phraseDetection = this.privSpeechContext.getContext().phraseDetection || {};
        const value = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs, undefined);
        if (value !== undefined) {
            phraseDetection.trailingSilenceTimeout = parseInt(value, 10);
        }
        else {
            delete phraseDetection.trailingSilenceTimeout;
        }
        this.privSpeechContext.getContext().phraseDetection = phraseDetection;
    }
    setProfanityOptionJson() {
        const phraseDetection = this.privSpeechContext.getContext().phraseDetection || {};
        const value = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceResponse_ProfanityOption, undefined);
        if (value !== undefined) {
            phraseDetection.enrichment = phraseDetection.enrichment || {};
            phraseDetection.enrichment.profanity = value;
        }
        else {
            if (phraseDetection.enrichment) {
                delete phraseDetection.enrichment.profanity;
            }
        }
        this.privSpeechContext.getContext().phraseDetection = phraseDetection;
    }
    setStableIntermediateThresholdJson() {
        const value = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceResponse_StablePartialResultThreshold, undefined);
        // Deep-merge into existing phraseOutput — setLanguageIdJson may have already initialized it
        const phraseOutput = this.privSpeechContext.getContext().phraseOutput || {};
        if (value !== undefined) {
            phraseOutput.interimResults = phraseOutput.interimResults || {};
            phraseOutput.interimResults.stableThreshold = parseInt(value, 10);
        }
        else {
            if (phraseOutput.interimResults) {
                delete phraseOutput.interimResults.stableThreshold;
            }
        }
        this.privSpeechContext.getContext().phraseOutput = phraseOutput;
    }
    get isSpeakerDiarizationEnabled() {
        return this.privEnableSpeakerId;
    }
    get audioSource() {
        return this.privAudioSource;
    }
    get speechContext() {
        return this.privSpeechContext;
    }
    get dynamicGrammar() {
        return this.privDynamicGrammar;
    }
    get agentConfig() {
        return this.privAgentConfig;
    }
    set authentication(auth) {
        this.privAuthentication = auth;
    }
    isDisposed() {
        return this.privIsDisposed;
    }
    async dispose(reason) {
        this.privIsDisposed = true;
        if (this.privConnectionPromise !== undefined) {
            try {
                const connection = await this.privConnectionPromise;
                await connection.dispose(reason);
            }
            catch (error) {
                // The connection is in a bad state. But we're trying to kill it, so...
                return;
            }
        }
    }
    get connectionEvents() {
        return this.privConnectionEvents;
    }
    get serviceEvents() {
        return this.privServiceEvents;
    }
    get recognitionMode() {
        return this.privRecognizerConfig.recognitionMode;
    }
    async recognize(recoMode, successCallback, errorCallBack) {
        if (this.recognizeOverride !== undefined) {
            await this.recognizeOverride(recoMode, successCallback, errorCallBack);
            return;
        }
        // Clear the existing configuration promise to force a re-transmission of config and context.
        this.privConnectionConfigurationPromise = undefined;
        this.privRecognizerConfig.recognitionMode = recoMode;
        if (this.privRecognizerConfig.recognitionEndpointVersion === "2") {
            const phraseDetection = this.privSpeechContext.getContext().phraseDetection || {};
            phraseDetection.mode = recoMode;
            this.privSpeechContext.getContext().phraseDetection = phraseDetection;
        }
        // Set language ID (if configured)
        this.setLanguageIdJson();
        // Then set translation (if configured)
        this.setTranslationJson();
        // Configure the integration between language ID and translation (if both are used)
        if (this.privRecognizerConfig.autoDetectSourceLanguages !== undefined &&
            this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationToLanguages, undefined) !== undefined) {
            this.setupTranslationWithLanguageId();
        }
        this.setLanguageJson();
        this.setInitialSilenceTimeoutJson();
        this.setEndSilenceTimeoutJson();
        this.setSpeechSegmentationTimeoutJson();
        this.setOutputDetailLevelJson();
        this.setSpeechStartEventSensitivityJson();
        this.setProfanityOptionJson();
        this.setPostProcessingOptionJson();
        this.setStableIntermediateThresholdJson();
        this.privSuccessCallback = successCallback;
        this.privErrorCallback = errorCallBack;
        this.privRequestSession.startNewRecognition();
        this.privRequestSession.listenForServiceTelemetry(this.privAudioSource.events);
        if (this.privEnableReliableReconnect) {
            this.privContinuationState.reset();
        }
        // Start the connection to the service. The promise this will create is stored and will be used by configureConnection().
        const conPromise = this.connectImpl();
        let audioNode;
        try {
            const audioStreamNode = await this.audioSource.attach(this.privRequestSession.audioNodeId);
            const format = await this.audioSource.format;
            const deviceInfo = await this.audioSource.deviceInfo;
            this.privIsLiveAudio = deviceInfo.type && deviceInfo.type === Exports_js_4.type.Microphones;
            // SeparateChannelProcessing activates per-channel processing and the reliable-reconnect
            // contract service-side.
            if (this.privEnableReliableReconnect) {
                deviceInfo.SeparateChannelProcessing = "true";
            }
            audioNode = new Exports_js_1.ReplayableAudioNode(audioStreamNode, format.avgBytesPerSec);
            await this.privRequestSession.onAudioSourceAttachCompleted(audioNode, false);
            this.privRecognizerConfig.SpeechServiceConfig.Context.audio = { source: deviceInfo };
        }
        catch (error) {
            await this.privRequestSession.onStopRecognizing();
            throw error;
        }
        try {
            await conPromise;
        }
        catch (error) {
            await this.cancelRecognitionLocal(Exports_js_3.CancellationReason.Error, Exports_js_3.CancellationErrorCode.ConnectionFailure, error);
            return;
        }
        const sessionStartEventArgs = new Exports_js_3.SessionEventArgs(this.privRequestSession.sessionId);
        if (!!this.privRecognizer.sessionStarted) {
            this.privRecognizer.sessionStarted(this.privRecognizer, sessionStartEventArgs);
        }
        void this.receiveMessage();
        const audioSendPromise = this.sendAudio(audioNode);
        audioSendPromise.catch(async (error) => {
            await this.cancelRecognitionLocal(Exports_js_3.CancellationReason.Error, Exports_js_3.CancellationErrorCode.RuntimeError, error);
        });
        return;
    }
    async stopRecognizing() {
        if (this.privRequestSession.isRecognizing) {
            try {
                await this.audioSource.turnOff();
                await this.sendFinalAudio();
                await this.privRequestSession.onStopRecognizing();
                await this.privRequestSession.turnCompletionPromise;
            }
            finally {
                await this.privRequestSession.dispose();
            }
        }
        return;
    }
    async connect() {
        await this.connectImpl();
        return Promise.resolve();
    }
    connectAsync(cb, err) {
        this.connectImpl().then(() => {
            try {
                if (!!cb) {
                    cb();
                }
            }
            catch (e) {
                if (!!err) {
                    err(e);
                }
            }
        }, (reason) => {
            try {
                if (!!err) {
                    err(reason);
                }
                /* eslint-disable no-empty */
            }
            catch (error) {
            }
        });
    }
    async disconnect() {
        await this.cancelRecognitionLocal(Exports_js_3.CancellationReason.Error, Exports_js_3.CancellationErrorCode.NoError, "Disconnecting");
        if (this.disconnectOverride !== undefined) {
            await this.disconnectOverride();
        }
        if (this.privConnectionPromise !== undefined) {
            try {
                await (await this.privConnectionPromise).dispose();
            }
            catch (error) {
            }
        }
        this.privConnectionPromise = undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendMessage(message) {
        return;
    }
    async sendNetworkMessage(path, payload) {
        const type = typeof payload === "string" ? Exports_js_2.MessageType.Text : Exports_js_2.MessageType.Binary;
        const contentType = typeof payload === "string" ? "application/json" : "";
        const connection = await this.fetchConnection();
        return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(type, path, this.privRequestSession.requestId, contentType, payload));
    }
    set activityTemplate(messagePayload) {
        this.privActivityTemplate = messagePayload;
    }
    get activityTemplate() {
        return this.privActivityTemplate;
    }
    set expectContentAssessmentResponse(value) {
        this.privExpectContentAssessmentResponse = value;
    }
    async sendTelemetryData() {
        const telemetryData = this.privRequestSession.getTelemetry();
        if (ServiceRecognizerBase.telemetryDataEnabled !== true ||
            this.privIsDisposed ||
            null === telemetryData) {
            return;
        }
        if (!!ServiceRecognizerBase.telemetryData) {
            try {
                ServiceRecognizerBase.telemetryData(telemetryData);
                /* eslint-disable no-empty */
            }
            catch { }
        }
        const connection = await this.fetchConnection();
        await connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_2.MessageType.Text, "telemetry", this.privRequestSession.requestId, "application/json", telemetryData));
    }
    // Cancels recognition.
    async cancelRecognitionLocal(cancellationReason, errorCode, error) {
        if (!!this.privRequestSession.isRecognizing) {
            await this.privRequestSession.onStopRecognizing();
            this.cancelRecognition(this.privRequestSession.sessionId, this.privRequestSession.requestId, cancellationReason, errorCode, error);
        }
    }
    async receiveMessage() {
        try {
            if (this.privIsDisposed) {
                // We're done.
                return;
            }
            let connection = await this.fetchConnection();
            const message = await connection.read();
            if (this.receiveMessageOverride !== undefined) {
                return this.receiveMessageOverride();
            }
            // indicates we are draining the queue and it came with no message;
            if (!message) {
                return this.receiveMessage();
            }
            this.privServiceHasSentMessage = true;
            const connectionMessage = SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage.fromConnectionMessage(message);
            if (connectionMessage.requestId.toLowerCase() === this.privRequestSession.requestId.toLowerCase()) {
                if (this.privEnableReliableReconnect) {
                    // Capture the continuation token + per-stream resume offset (the offset header
                    // is turn-relative and gets rebased onto the session-absolute timeline).
                    this.privContinuationState.updateFromHeaders(connectionMessage.additionalHeaders, this.privRequestSession.currentTurnAudioOffset);
                    // Trim the replay buffer to the service-acknowledged offset so a reconnect
                    // resends only unacknowledged audio.
                    const acknowledgedOffset = this.privContinuationState.streamOffset;
                    if (acknowledgedOffset !== undefined) {
                        this.privRequestSession.onServiceAcknowledgedAudio(acknowledgedOffset);
                    }
                }
                switch (connectionMessage.path.toLowerCase()) {
                    case "turn.start":
                        this.privMustReportEndOfStream = true;
                        this.privRequestSession.onServiceTurnStartResponse();
                        if (this.privEnableReliableReconnect) {
                            // The reliable-reconnect service tag is delivered in the
                            // turn.start body under "$.context.serviceTag" (not a header).
                            let turnStartServiceTag;
                            try {
                                if (connectionMessage.textBody && connectionMessage.textBody.length > 0) {
                                    const turnStartBody = JSON.parse(connectionMessage.textBody);
                                    turnStartServiceTag = turnStartBody?.context?.serviceTag;
                                }
                            }
                            catch {
                                turnStartServiceTag = undefined;
                            }
                            this.privContinuationState.onTurnStart(turnStartServiceTag);
                        }
                        break;
                    case "speech.startdetected":
                        const speechStartDetected = Exports_js_4.SpeechDetected.fromJSON(connectionMessage.textBody, this.privRequestSession.currentTurnAudioOffset);
                        const speechStartEventArgs = new Exports_js_3.RecognitionEventArgs(speechStartDetected.Offset, this.privRequestSession.sessionId);
                        if (!!this.privRecognizer.speechStartDetected) {
                            this.privRecognizer.speechStartDetected(this.privRecognizer, speechStartEventArgs);
                        }
                        break;
                    case "speech.enddetected":
                        let json;
                        if (connectionMessage.textBody.length > 0) {
                            json = connectionMessage.textBody;
                        }
                        else {
                            // If the request was empty, the JSON returned is empty.
                            json = "{ Offset: 0 }";
                        }
                        const speechStopDetected = Exports_js_4.SpeechDetected.fromJSON(json, this.privRequestSession.currentTurnAudioOffset);
                        const speechStopEventArgs = new Exports_js_3.RecognitionEventArgs(speechStopDetected.Offset + this.privRequestSession.currentTurnAudioOffset, this.privRequestSession.sessionId);
                        if (!!this.privRecognizer.speechEndDetected) {
                            this.privRecognizer.speechEndDetected(this.privRecognizer, speechStopEventArgs);
                        }
                        break;
                    case "turn.end":
                        await this.sendTelemetryData();
                        // Reliable reconnect: turn.end does NOT clear the continuation state; the
                        // token/offset/service tag persist for the session.
                        if (this.privRequestSession.isSpeechEnded && this.privMustReportEndOfStream) {
                            this.privMustReportEndOfStream = false;
                            await this.cancelRecognitionLocal(Exports_js_3.CancellationReason.EndOfStream, Exports_js_3.CancellationErrorCode.NoError, undefined);
                        }
                        const sessionStopEventArgs = new Exports_js_3.SessionEventArgs(this.privRequestSession.sessionId);
                        await this.privRequestSession.onServiceTurnEndResponse(this.privRecognizerConfig.isContinuousRecognition);
                        if (!this.privRecognizerConfig.isContinuousRecognition || this.privRequestSession.isSpeechEnded || !this.privRequestSession.isRecognizing) {
                            if (!!this.privRecognizer.sessionStopped) {
                                this.privRecognizer.sessionStopped(this.privRecognizer, sessionStopEventArgs);
                            }
                            return;
                        }
                        else {
                            connection = await this.fetchConnection();
                            await this.sendPrePayloadJSON(connection);
                        }
                        break;
                    default:
                        if (!await this.processTypeSpecificMessages(connectionMessage)) {
                            // here are some messages that the derived class has not processed, dispatch them to connect class
                            if (!!this.privServiceEvents) {
                                this.serviceEvents.onEvent(new Exports_js_2.ServiceEvent(connectionMessage.path.toLowerCase(), connectionMessage.textBody));
                            }
                        }
                }
            }
            return this.receiveMessage();
        }
        catch (error) {
            return null;
        }
    }
    updateSpeakerDiarizationAudioOffset() {
        const bytesSent = this.privRequestSession.recognitionBytesSent;
        const audioOffsetMs = this.privAverageBytesPerMs !== 0 ? bytesSent / this.privAverageBytesPerMs : 0;
        this.privSpeechContext.setSpeakerDiarizationAudioOffsetMs(audioOffsetMs);
    }
    // The stream id tagged onto outgoing audio messages when reliable reconnect is enabled.
    // Undefined disables the X-StreamId header, preserving legacy behavior.
    get audioStreamId() {
        return this.privEnableReliableReconnect ? this.privContinuationState.defaultStreamId : undefined;
    }
    // Injects the reliable-reconnect sections into speech.context: the audio.streams marker
    // (always present) and the continuation section (only when resuming an interrupted turn).
    applyReconnectContinuation() {
        const context = this.privSpeechContext.getContext();
        context.audio = this.privContinuationState.buildAudioStreamsMetadata();
        const continuation = this.privContinuationState.buildContinuationContext();
        if (continuation !== undefined) {
            context.continuation = continuation;
        }
        else {
            delete context.continuation;
        }
    }
    sendSpeechContext(connection, generateNewRequestId) {
        if (this.privEnableSpeakerId) {
            this.updateSpeakerDiarizationAudioOffset();
        }
        if (this.privEnableReliableReconnect) {
            this.applyReconnectContinuation();
        }
        const speechContextJson = this.speechContext.toJSON();
        if (generateNewRequestId) {
            this.privRequestSession.onSpeechContext();
        }
        if (speechContextJson) {
            return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_2.MessageType.Text, "speech.context", this.privRequestSession.requestId, "application/json", speechContextJson));
        }
        return;
    }
    setupTranslationWithLanguageId() {
        const targetLanguages = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationToLanguages, undefined);
        const hasLanguageId = this.privRecognizerConfig.autoDetectSourceLanguages !== undefined;
        if (targetLanguages !== undefined && hasLanguageId) {
            // Configure phraseOutput for translation + language ID scenario
            this.privSpeechContext.getContext().phraseOutput = {
                interimResults: {
                    resultType: InterimResults_js_2.ResultType.None
                },
                phraseResults: {
                    resultType: PhraseResults_js_1.PhraseResultOutputType.None
                }
            };
            // Handle custom language models and voice mapping
            const translationContext = this.privSpeechContext.getContext().translation;
            if (translationContext) {
                const customModels = this.privRecognizerConfig.sourceLanguageModels;
                if (customModels !== undefined && customModels.length > 0) {
                    const phraseDetection = this.privSpeechContext.getContext().phraseDetection || {};
                    phraseDetection.customModels = customModels;
                    this.privSpeechContext.getContext().phraseDetection = phraseDetection;
                }
                const translationVoice = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationVoice, undefined);
                if (translationVoice !== undefined) {
                    // Update translation actions for synthesis
                    translationContext.onSuccess = { action: OnSuccess_js_1.NextAction.Synthesize };
                    translationContext.onPassthrough = { action: OnSuccess_js_1.NextAction.Synthesize };
                }
            }
        }
    }
    noOp() {
        // operation not supported
        return;
    }
    // Encapsulated for derived service recognizers that need to send additional JSON
    async sendPrePayloadJSON(connection, generateNewRequestId = true) {
        if (this.sendPrePayloadJSONOverride !== undefined) {
            return this.sendPrePayloadJSONOverride(connection);
        }
        await this.sendSpeechContext(connection, generateNewRequestId);
        await this.sendWaveHeader(connection);
        return;
    }
    async sendWaveHeader(connection) {
        const format = await this.audioSource.format;
        // this.writeBufferToConsole(format.header);
        return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_2.MessageType.Binary, "audio", this.privRequestSession.requestId, "audio/x-wav", format.header, this.audioStreamId));
    }
    reconnect() {
        if (this.privConnectionPromise !== undefined && !this.privServiceHasSentMessage) {
            return this.privConnectionPromise;
        }
        this.privConnectionId = null;
        this.privConnectionPromise = undefined;
        this.privServiceHasSentMessage = false;
        return this.connectImpl();
    }
    // Establishes a websocket connection to the end point.
    connectImpl() {
        if (this.privConnectionPromise !== undefined) {
            return this.privConnectionPromise.then((connection) => {
                if (connection.state() === Exports_js_2.ConnectionState.Disconnected) {
                    return this.reconnect();
                }
                return this.privConnectionPromise;
            }, () => this.reconnect());
        }
        this.privConnectionPromise = this.retryableConnect();
        // Attach an empty handler to allow the promise to run in the background while
        // other startup events happen. It'll eventually be awaited on.
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.privConnectionPromise.catch(() => { });
        if (this.postConnectImplOverride !== undefined) {
            return this.postConnectImplOverride(this.privConnectionPromise);
        }
        return this.privConnectionPromise;
    }
    sendSpeechServiceConfig(connection, requestSession, SpeechServiceConfigJson) {
        requestSession.onSpeechContext();
        // filter out anything that is not required for the service to work.
        if (ServiceRecognizerBase.telemetryDataEnabled !== true) {
            const withTelemetry = JSON.parse(SpeechServiceConfigJson);
            const replacement = {
                context: {
                    system: withTelemetry.context.system,
                },
            };
            SpeechServiceConfigJson = JSON.stringify(replacement);
        }
        if (this.privRecognizerConfig.parameters.getProperty("f0f5debc-f8c9-4892-ac4b-90a7ab359fd2", "false").toLowerCase() === "true") {
            const json = JSON.parse(SpeechServiceConfigJson);
            json.context.DisableReferenceChannel = "True";
            json.context.MicSpec = "1_0_0";
            SpeechServiceConfigJson = JSON.stringify(json);
        }
        if (SpeechServiceConfigJson) {
            return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_2.MessageType.Text, "speech.config", requestSession.requestId, "application/json", SpeechServiceConfigJson));
        }
        return;
    }
    async fetchConnection() {
        if (this.privConnectionConfigurationPromise !== undefined) {
            return this.privConnectionConfigurationPromise.then((connection) => {
                if (connection.state() === Exports_js_2.ConnectionState.Disconnected) {
                    this.privConnectionConfigurationPromise = undefined;
                    return this.fetchConnection();
                }
                return this.privConnectionConfigurationPromise;
            }, () => {
                this.privConnectionConfigurationPromise = undefined;
                return this.fetchConnection();
            });
        }
        this.privConnectionConfigurationPromise = this.configureConnection();
        return await this.privConnectionConfigurationPromise;
    }
    async sendAudio(audioStreamNode) {
        const audioFormat = await this.audioSource.format;
        this.privAverageBytesPerMs = audioFormat.avgBytesPerSec / 1000;
        // The time we last sent data to the service.
        let nextSendTime = Date.now();
        // Max amount to send before we start to throttle
        const fastLaneSizeMs = this.privRecognizerConfig.parameters.getProperty("SPEECH-TransmitLengthBeforThrottleMs", "5000");
        const maxSendUnthrottledBytes = audioFormat.avgBytesPerSec / 1000 * parseInt(fastLaneSizeMs, 10);
        const startRecogNumber = this.privRequestSession.recogNumber;
        const readAndUploadCycle = async () => {
            // If speech is done, stop sending audio.
            if (!this.privIsDisposed &&
                !this.privRequestSession.isSpeechEnded &&
                this.privRequestSession.isRecognizing &&
                this.privRequestSession.recogNumber === startRecogNumber) {
                const connection = await this.fetchConnection();
                const audioStreamChunk = await audioStreamNode.read();
                // we have a new audio chunk to upload.
                if (this.privRequestSession.isSpeechEnded) {
                    // If service already recognized audio end then don't send any more audio
                    return;
                }
                let payload;
                let sendDelay;
                if (!audioStreamChunk || audioStreamChunk.isEnd) {
                    payload = null;
                    sendDelay = 0;
                }
                else {
                    payload = audioStreamChunk.buffer;
                    this.privRequestSession.onAudioSent(payload.byteLength);
                    if (maxSendUnthrottledBytes >= this.privRequestSession.bytesSent) {
                        sendDelay = 0;
                    }
                    else {
                        sendDelay = Math.max(0, nextSendTime - Date.now());
                    }
                }
                if (0 !== sendDelay) {
                    await this.delay(sendDelay);
                }
                if (payload !== null) {
                    nextSendTime = Date.now() + (payload.byteLength * 1000 / (audioFormat.avgBytesPerSec * 2));
                }
                // Are we still alive?
                if (!this.privIsDisposed &&
                    !this.privRequestSession.isSpeechEnded &&
                    this.privRequestSession.isRecognizing &&
                    this.privRequestSession.recogNumber === startRecogNumber) {
                    connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_2.MessageType.Binary, "audio", this.privRequestSession.requestId, null, payload, this.audioStreamId)).catch(() => {
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        this.privRequestSession.onServiceTurnEndResponse(this.privRecognizerConfig.isContinuousRecognition).catch(() => { });
                    });
                    if (!audioStreamChunk?.isEnd) {
                        // this.writeBufferToConsole(payload);
                        // Regardless of success or failure, schedule the next upload.
                        // If the underlying connection was broken, the next cycle will
                        // get a new connection and re-transmit missing audio automatically.
                        return readAndUploadCycle();
                    }
                    else {
                        // the audio stream has been closed, no need to schedule next
                        // read-upload cycle.
                        if (!this.privIsLiveAudio) {
                            this.privRequestSession.onSpeechEnded();
                        }
                    }
                }
            }
        };
        return readAndUploadCycle();
    }
    async retryableConnect() {
        let isUnAuthorized = false;
        this.privAuthFetchEventId = (0, Exports_js_2.createNoDashGuid)();
        const sessionId = this.privRequestSession.sessionId;
        this.privConnectionId = (sessionId !== undefined) ? sessionId : (0, Exports_js_2.createNoDashGuid)();
        this.privRequestSession.onPreConnectionStart(this.privAuthFetchEventId, this.privConnectionId);
        let lastStatusCode = 0;
        let lastReason = "";
        while (this.privRequestSession.numConnectionAttempts <= this.privRecognizerConfig.maxRetryCount) {
            this.privRequestSession.onRetryConnection();
            // Get the auth information for the connection. This is a bit of overkill for the current API surface, but leaving the plumbing in place to be able to raise a developer-customer
            // facing event when a connection fails to let them try and provide new auth information.
            const authPromise = isUnAuthorized ? this.privAuthentication.fetchOnExpiry(this.privAuthFetchEventId) : this.privAuthentication.fetch(this.privAuthFetchEventId);
            const auth = await authPromise;
            await this.privRequestSession.onAuthCompleted(false);
            // Create the connection
            const connection = await this.privConnectionFactory.create(this.privRecognizerConfig, auth, this.privConnectionId);
            // Attach the telemetry handlers.
            this.privRequestSession.listenForServiceTelemetry(connection.events);
            // Attach to the underlying event. No need to hold onto the detach pointers as in the event the connection goes away,
            // it'll stop sending events.
            connection.events.attach((event) => {
                this.connectionEvents.onEvent(event);
            });
            const response = await connection.open();
            // 200 == everything is fine.
            if (response.statusCode === 200) {
                await this.privRequestSession.onConnectionEstablishCompleted(response.statusCode);
                return Promise.resolve(connection);
            }
            else if (response.statusCode === 1006) {
                isUnAuthorized = true;
            }
            lastStatusCode = response.statusCode;
            lastReason = response.reason;
        }
        await this.privRequestSession.onConnectionEstablishCompleted(lastStatusCode, lastReason);
        return Promise.reject(`Unable to contact server. StatusCode: ${lastStatusCode}, ${this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_Endpoint)} Reason: ${lastReason}`);
    }
    delay(delayMs) {
        return new Promise((resolve) => this.privSetTimeout(resolve, delayMs));
    }
    writeBufferToConsole(buffer) {
        let out = "Buffer Size: ";
        if (null === buffer) {
            out += "null";
        }
        else {
            const readView = new Uint8Array(buffer);
            out += `${buffer.byteLength}\r\n`;
            for (let i = 0; i < buffer.byteLength; i++) {
                out += readView[i].toString(16).padStart(2, "0") + " ";
                if (((i + 1) % 16) === 0) {
                    // eslint-disable-next-line no-console
                    console.info(out);
                    out = "";
                }
            }
        }
        // eslint-disable-next-line no-console
        console.info(out);
    }
    async sendFinalAudio() {
        const connection = await this.fetchConnection();
        await connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_2.MessageType.Binary, "audio", this.privRequestSession.requestId, null, null, this.audioStreamId));
        return;
    }
    // Takes an established websocket connection to the endpoint and sends speech configuration information.
    async configureConnection() {
        const connection = await this.connectImpl();
        if (this.configConnectionOverride !== undefined) {
            return this.configConnectionOverride(connection);
        }
        await this.sendSpeechServiceConfig(connection, this.privRequestSession, this.privRecognizerConfig.SpeechServiceConfig.serialize());
        await this.sendPrePayloadJSON(connection, false);
        return connection;
    }
}
exports.ServiceRecognizerBase = ServiceRecognizerBase;
ServiceRecognizerBase.telemetryDataEnabled = true;



/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(67), exports);
__exportStar(__webpack_require__(71), exports);
__exportStar(__webpack_require__(72), exports);
__exportStar(__webpack_require__(74), exports);
__exportStar(__webpack_require__(75), exports);
__exportStar(__webpack_require__(76), exports);
__exportStar(__webpack_require__(77), exports);
__exportStar(__webpack_require__(83), exports);
__exportStar(__webpack_require__(84), exports);
__exportStar(__webpack_require__(184), exports);
__exportStar(__webpack_require__(187), exports);



/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConsoleLoggingListener = void 0;
const fs = __importStar(__webpack_require__(68));
const LogLevel_js_1 = __webpack_require__(69);
const Contracts_js_1 = __webpack_require__(70);
class ConsoleLoggingListener {
    constructor(logLevelFilter = LogLevel_js_1.LogLevel.None) {
        this.privLogPath = undefined;
        this.privEnableConsoleOutput = true;
        this.privLogLevelFilter = logLevelFilter;
    }
    set logPath(path) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(fs.openSync, "\nFile System access not available");
        this.privLogPath = path;
    }
    set enableConsoleOutput(enableOutput) {
        this.privEnableConsoleOutput = enableOutput;
    }
    onEvent(event) {
        if (event.eventType >= this.privLogLevelFilter) {
            const log = this.toString(event);
            if (!!this.logCallback) {
                this.logCallback(log);
            }
            if (!!this.privLogPath) {
                fs.writeFileSync(this.privLogPath, log + "\n", { flag: "a+" });
            }
            if (this.privEnableConsoleOutput) {
                switch (event.eventType) {
                    case LogLevel_js_1.LogLevel.Debug:
                        // eslint-disable-next-line no-console
                        console.debug(log);
                        break;
                    case LogLevel_js_1.LogLevel.Info:
                        // eslint-disable-next-line no-console
                        console.info(log);
                        break;
                    case LogLevel_js_1.LogLevel.Warning:
                        // eslint-disable-next-line no-console
                        console.warn(log);
                        break;
                    case LogLevel_js_1.LogLevel.Error:
                        // eslint-disable-next-line no-console
                        console.error(log);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(log);
                        break;
                }
            }
        }
    }
    toString(event) {
        const logFragments = [
            `${event.eventTime}`,
            `${event.name}`,
        ];
        const e = event;
        for (const prop in e) {
            if (prop && event.hasOwnProperty(prop) &&
                prop !== "eventTime" && prop !== "eventType" &&
                prop !== "eventId" && prop !== "name" &&
                prop !== "constructor") {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                const value = e[prop];
                let valueToLog = "<NULL>";
                if (value !== undefined && value !== null) {
                    if (typeof (value) === "number" || typeof (value) === "string") {
                        valueToLog = value.toString();
                    }
                    else {
                        valueToLog = JSON.stringify(value);
                    }
                }
                logFragments.push(`${prop}: ${valueToLog}`);
            }
        }
        return logFragments.join(" | ");
    }
}
exports.ConsoleLoggingListener = ConsoleLoggingListener;



/***/ }),
/* 68 */
/***/ (() => {

/* (ignored) */

/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogLevel = void 0;
const Exports_js_1 = __webpack_require__(4);
Object.defineProperty(exports, "LogLevel", ({ enumerable: true, get: function () { return Exports_js_1.EventType; } }));



/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Contracts = void 0;
/**
 * @class Contracts
 * @private
 */
class Contracts {
    static throwIfNullOrUndefined(param, name) {
        if (param === undefined || param === null) {
            throw new Error("throwIfNullOrUndefined:" + name);
        }
    }
    static throwIfNull(param, name) {
        if (param === null) {
            throw new Error("throwIfNull:" + name);
        }
    }
    static throwIfNullOrWhitespace(param, name) {
        Contracts.throwIfNullOrUndefined(param, name);
        if (("" + param).trim().length < 1) {
            throw new Error("throwIfNullOrWhitespace:" + name);
        }
    }
    static throwIfNullOrTooLong(param, name, maxLength) {
        Contracts.throwIfNullOrUndefined(param, name);
        if (("" + param).length > maxLength) {
            throw new Error("throwIfNullOrTooLong:" + name + " (more than " + maxLength.toString() + " characters)");
        }
    }
    static throwIfNullOrTooShort(param, name, minLength) {
        Contracts.throwIfNullOrUndefined(param, name);
        if (("" + param).length < minLength) {
            throw new Error("throwIfNullOrTooShort:" + name + " (less than " + minLength.toString() + " characters)");
        }
    }
    static throwIfDisposed(isDisposed) {
        if (isDisposed) {
            throw new Error("the object is already disposed");
        }
    }
    static throwIfArrayEmptyOrWhitespace(array, name) {
        Contracts.throwIfNullOrUndefined(array, name);
        if (array.length === 0) {
            throw new Error("throwIfArrayEmptyOrWhitespace:" + name);
        }
        for (const item of array) {
            Contracts.throwIfNullOrWhitespace(item, name);
        }
    }
    static throwIfFileDoesNotExist(param, name) {
        Contracts.throwIfNullOrWhitespace(param, name);
        // TODO check for file existence.
    }
    static throwIfNotUndefined(param, name) {
        if (param !== undefined) {
            throw new Error("throwIfNotUndefined:" + name);
        }
    }
    static throwIfNumberOutOfRange(value, name, rangeStart, rangeEnd) {
        Contracts.throwIfNullOrUndefined(value, name);
        if (value < rangeStart || value > rangeEnd) {
            throw new Error("throwIfNumberOutOfRange:" + name + " (must be between " + rangeStart.toString() + " and " + rangeEnd.toString() + ")");
        }
    }
}
exports.Contracts = Contracts;



/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MicAudioSource = exports.AudioWorkletSourceURLPropertyName = void 0;
const Exports_js_1 = __webpack_require__(2);
const Exports_js_2 = __webpack_require__(4);
const AudioStreamFormat_js_1 = __webpack_require__(73);
exports.AudioWorkletSourceURLPropertyName = "MICROPHONE-WorkletSourceUrl";
class MicAudioSource {
    constructor(privRecorder, deviceId, audioSourceId, mediaStream) {
        this.privRecorder = privRecorder;
        this.deviceId = deviceId;
        this.privStreams = {};
        this.privOutputChunkSize = MicAudioSource.AUDIOFORMAT.avgBytesPerSec / 10;
        this.privId = audioSourceId ? audioSourceId : (0, Exports_js_2.createNoDashGuid)();
        this.privEvents = new Exports_js_2.EventSource();
        this.privMediaStream = mediaStream || null;
        this.privIsClosing = false;
    }
    get format() {
        return Promise.resolve(MicAudioSource.AUDIOFORMAT);
    }
    turnOn() {
        if (this.privInitializeDeferral) {
            return this.privInitializeDeferral.promise;
        }
        this.privInitializeDeferral = new Exports_js_2.Deferred();
        try {
            this.createAudioContext();
        }
        catch (error) {
            if (error instanceof Error) {
                const typedError = error;
                this.privInitializeDeferral.reject(typedError.name + ": " + typedError.message);
            }
            else {
                this.privInitializeDeferral.reject(error);
            }
            return this.privInitializeDeferral.promise;
        }
        const nav = window.navigator;
        let getUserMedia = (
        // eslint-disable-next-line
        nav.getUserMedia ||
            nav.webkitGetUserMedia ||
            nav.mozGetUserMedia ||
            nav.msGetUserMedia);
        if (!!nav.mediaDevices) {
            getUserMedia = (constraints, successCallback, errorCallback) => {
                nav.mediaDevices
                    .getUserMedia(constraints)
                    .then(successCallback)
                    .catch(errorCallback);
            };
        }
        if (!getUserMedia) {
            const errorMsg = "Browser does not support getUserMedia.";
            this.privInitializeDeferral.reject(errorMsg);
            this.onEvent(new Exports_js_2.AudioSourceErrorEvent(errorMsg, "")); // mic initialized error - no streamid at this point
        }
        else {
            const next = () => {
                this.onEvent(new Exports_js_2.AudioSourceInitializingEvent(this.privId)); // no stream id
                if (this.privMediaStream && this.privMediaStream.active) {
                    this.onEvent(new Exports_js_2.AudioSourceReadyEvent(this.privId));
                    this.privInitializeDeferral.resolve();
                }
                else {
                    getUserMedia({ audio: this.deviceId ? { deviceId: this.deviceId } : true, video: false }, (mediaStream) => {
                        this.privMediaStream = mediaStream;
                        this.onEvent(new Exports_js_2.AudioSourceReadyEvent(this.privId));
                        this.privInitializeDeferral.resolve();
                    }, (error) => {
                        const errorMsg = `Error occurred during microphone initialization: ${error}`;
                        this.privInitializeDeferral.reject(errorMsg);
                        this.onEvent(new Exports_js_2.AudioSourceErrorEvent(this.privId, errorMsg));
                    });
                }
            };
            if (this.privContext.state === "suspended") {
                // NOTE: On iOS, the Web Audio API requires sounds to be triggered from an explicit user action.
                // https://github.com/WebAudio/web-audio-api/issues/790
                this.privContext.resume()
                    .then(next)
                    .catch((reason) => {
                    this.privInitializeDeferral.reject(`Failed to initialize audio context: ${reason}`);
                });
            }
            else {
                next();
            }
        }
        return this.privInitializeDeferral.promise;
    }
    id() {
        return this.privId;
    }
    attach(audioNodeId) {
        this.onEvent(new Exports_js_2.AudioStreamNodeAttachingEvent(this.privId, audioNodeId));
        return this.listen(audioNodeId).then((stream) => {
            this.onEvent(new Exports_js_2.AudioStreamNodeAttachedEvent(this.privId, audioNodeId));
            return {
                detach: async () => {
                    stream.readEnded();
                    delete this.privStreams[audioNodeId];
                    this.onEvent(new Exports_js_2.AudioStreamNodeDetachedEvent(this.privId, audioNodeId));
                    return this.turnOff();
                },
                id: () => audioNodeId,
                read: () => stream.read(),
            };
        });
    }
    detach(audioNodeId) {
        if (audioNodeId && this.privStreams[audioNodeId]) {
            this.privStreams[audioNodeId].close();
            delete this.privStreams[audioNodeId];
            this.onEvent(new Exports_js_2.AudioStreamNodeDetachedEvent(this.privId, audioNodeId));
        }
    }
    async turnOff() {
        for (const streamId in this.privStreams) {
            if (streamId) {
                const stream = this.privStreams[streamId];
                if (stream) {
                    stream.close();
                }
            }
        }
        this.onEvent(new Exports_js_2.AudioSourceOffEvent(this.privId)); // no stream now
        if (this.privInitializeDeferral) {
            // Correctly handle when browser forces mic off before turnOn() completes
            // eslint-disable-next-line @typescript-eslint/await-thenable
            await this.privInitializeDeferral;
            this.privInitializeDeferral = null;
        }
        await this.destroyAudioContext();
        return;
    }
    get events() {
        return this.privEvents;
    }
    get deviceInfo() {
        return this.getMicrophoneLabel().then((label) => ({
            bitspersample: MicAudioSource.AUDIOFORMAT.bitsPerSample,
            channelcount: MicAudioSource.AUDIOFORMAT.channels,
            connectivity: Exports_js_1.connectivity.Unknown,
            manufacturer: "Speech SDK",
            model: label,
            samplerate: MicAudioSource.AUDIOFORMAT.samplesPerSec,
            type: Exports_js_1.type.Microphones,
        }));
    }
    setProperty(name, value) {
        if (name === exports.AudioWorkletSourceURLPropertyName) {
            this.privRecorder.setWorkletUrl(value);
        }
        else {
            throw new Error("Property '" + name + "' is not supported on Microphone.");
        }
    }
    getMicrophoneLabel() {
        const defaultMicrophoneName = "microphone";
        // If we did this already, return the value.
        if (this.privMicrophoneLabel !== undefined) {
            return Promise.resolve(this.privMicrophoneLabel);
        }
        // If the stream isn't currently running, we can't query devices because security.
        if (this.privMediaStream === undefined || !this.privMediaStream.active) {
            return Promise.resolve(defaultMicrophoneName);
        }
        // Setup a default
        this.privMicrophoneLabel = defaultMicrophoneName;
        // Get the id of the device running the audio track.
        const microphoneDeviceId = this.privMediaStream.getTracks()[0].getSettings().deviceId;
        // If the browser doesn't support getting the device ID, set a default and return.
        if (undefined === microphoneDeviceId) {
            return Promise.resolve(this.privMicrophoneLabel);
        }
        const deferred = new Exports_js_2.Deferred();
        // Enumerate the media devices.
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            for (const device of devices) {
                if (device.deviceId === microphoneDeviceId) {
                    // Found the device
                    this.privMicrophoneLabel = device.label;
                    break;
                }
            }
            deferred.resolve(this.privMicrophoneLabel);
        }, () => deferred.resolve(this.privMicrophoneLabel));
        return deferred.promise;
    }
    async listen(audioNodeId) {
        await this.turnOn();
        const stream = new Exports_js_2.ChunkedArrayBufferStream(this.privOutputChunkSize, audioNodeId);
        this.privStreams[audioNodeId] = stream;
        try {
            this.privRecorder.record(this.privContext, this.privMediaStream, stream);
        }
        catch (error) {
            this.onEvent(new Exports_js_2.AudioStreamNodeErrorEvent(this.privId, audioNodeId, error));
            throw error;
        }
        const result = stream;
        return result;
    }
    onEvent(event) {
        this.privEvents.onEvent(event);
        Exports_js_2.Events.instance.onEvent(event);
    }
    createAudioContext() {
        if (!!this.privContext) {
            return;
        }
        this.privContext = AudioStreamFormat_js_1.AudioStreamFormatImpl.getAudioContext(MicAudioSource.AUDIOFORMAT.samplesPerSec);
    }
    async destroyAudioContext() {
        if (!this.privContext) {
            return;
        }
        this.privRecorder.releaseMediaResources(this.privContext);
        // This pattern brought to you by a bug in the TypeScript compiler where it
        // confuses the ("close" in this.privContext) with this.privContext always being null as the alternate.
        // https://github.com/Microsoft/TypeScript/issues/11498
        let hasClose = false;
        if ("close" in this.privContext) {
            hasClose = true;
        }
        if (hasClose) {
            if (!this.privIsClosing) {
                // The audio context close may take enough time that the close is called twice
                this.privIsClosing = true;
                await this.privContext.close();
                this.privContext = null;
                this.privIsClosing = false;
            }
        }
        else if (null !== this.privContext && this.privContext.state === "running") {
            // Suspend actually takes a callback, but analogous to the
            // resume method, it'll be only fired if suspend is called
            // in a direct response to a user action. The later is not always
            // the case, as TurnOff is also called, when we receive an
            // end-of-speech message from the service. So, doing a best effort
            // fire-and-forget here.
            await this.privContext.suspend();
        }
    }
}
exports.MicAudioSource = MicAudioSource;
MicAudioSource.AUDIOFORMAT = AudioStreamFormat_js_1.AudioStreamFormat.getDefaultInputFormat();



/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AudioStreamFormatImpl = exports.AudioStreamFormat = exports.AudioFormatTag = void 0;
// eslint-disable-next-line max-classes-per-file
var AudioFormatTag;
(function (AudioFormatTag) {
    AudioFormatTag[AudioFormatTag["PCM"] = 1] = "PCM";
    AudioFormatTag[AudioFormatTag["MuLaw"] = 2] = "MuLaw";
    AudioFormatTag[AudioFormatTag["Siren"] = 3] = "Siren";
    AudioFormatTag[AudioFormatTag["MP3"] = 4] = "MP3";
    AudioFormatTag[AudioFormatTag["SILKSkype"] = 5] = "SILKSkype";
    AudioFormatTag[AudioFormatTag["OGG_OPUS"] = 6] = "OGG_OPUS";
    AudioFormatTag[AudioFormatTag["WEBM_OPUS"] = 7] = "WEBM_OPUS";
    AudioFormatTag[AudioFormatTag["ALaw"] = 8] = "ALaw";
    AudioFormatTag[AudioFormatTag["FLAC"] = 9] = "FLAC";
    AudioFormatTag[AudioFormatTag["OPUS"] = 10] = "OPUS";
    AudioFormatTag[AudioFormatTag["AMR_WB"] = 11] = "AMR_WB";
    AudioFormatTag[AudioFormatTag["G722"] = 12] = "G722";
})(AudioFormatTag = exports.AudioFormatTag || (exports.AudioFormatTag = {}));
/**
 * Represents audio stream format used for custom audio input configurations.
 * @class AudioStreamFormat
 */
class AudioStreamFormat {
    /**
     * Creates an audio stream format object representing the default audio stream
     * format (16KHz 16bit mono PCM).
     * @member AudioStreamFormat.getDefaultInputFormat
     * @function
     * @public
     * @returns {AudioStreamFormat} The audio stream format being created.
     */
    static getDefaultInputFormat() {
        return AudioStreamFormatImpl.getDefaultInputFormat();
    }
    /**
     * Creates an audio stream format object with the specified format characteristics.
     * @member AudioStreamFormat.getWaveFormat
     * @function
     * @public
     * @param {number} samplesPerSecond - Sample rate, in samples per second (Hertz).
     * @param {number} bitsPerSample - Bits per sample, typically 16.
     * @param {number} channels - Number of channels in the waveform-audio data. Monaural data
     * uses one channel and stereo data uses two channels.
     * @param {AudioFormatTag} format - Audio format (PCM, alaw or mulaw).
     * @returns {AudioStreamFormat} The audio stream format being created.
     */
    static getWaveFormat(samplesPerSecond, bitsPerSample, channels, format) {
        return new AudioStreamFormatImpl(samplesPerSecond, bitsPerSample, channels, format);
    }
    /**
     * Creates an audio stream format object with the specified pcm waveformat characteristics.
     * @member AudioStreamFormat.getWaveFormatPCM
     * @function
     * @public
     * @param {number} samplesPerSecond - Sample rate, in samples per second (Hertz).
     * @param {number} bitsPerSample - Bits per sample, typically 16.
     * @param {number} channels - Number of channels in the waveform-audio data. Monaural data
     * uses one channel and stereo data uses two channels.
     * @returns {AudioStreamFormat} The audio stream format being created.
     */
    static getWaveFormatPCM(samplesPerSecond, bitsPerSample, channels) {
        return new AudioStreamFormatImpl(samplesPerSecond, bitsPerSample, channels);
    }
}
exports.AudioStreamFormat = AudioStreamFormat;
/**
 * @private
 * @class AudioStreamFormatImpl
 */
class AudioStreamFormatImpl extends AudioStreamFormat {
    /**
     * Creates an instance with the given values.
     * @constructor
     * @param {number} samplesPerSec - Samples per second.
     * @param {number} bitsPerSample - Bits per sample.
     * @param {number} channels - Number of channels.
     * @param {AudioFormatTag} format - Audio format (PCM, alaw or mulaw).
     */
    constructor(samplesPerSec = 16000, bitsPerSample = 16, channels = 1, format = AudioFormatTag.PCM) {
        super();
        let isWavFormat = true;
        /* 1 for PCM; 6 for alaw; 7 for mulaw */
        switch (format) {
            case AudioFormatTag.PCM:
                this.formatTag = 1;
                break;
            case AudioFormatTag.ALaw:
                this.formatTag = 6;
                break;
            case AudioFormatTag.MuLaw:
                this.formatTag = 7;
                break;
            default:
                isWavFormat = false;
        }
        this.bitsPerSample = bitsPerSample;
        this.samplesPerSec = samplesPerSec;
        this.channels = channels;
        this.avgBytesPerSec = this.samplesPerSec * this.channels * (this.bitsPerSample / 8);
        this.blockAlign = this.channels * Math.max(this.bitsPerSample, 8);
        if (isWavFormat) {
            this.privHeader = new ArrayBuffer(44);
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
            const view = new DataView(this.privHeader);
            /* RIFF identifier */
            this.setString(view, 0, "RIFF");
            /* file length */
            view.setUint32(4, 0, true);
            /* RIFF type & Format */
            this.setString(view, 8, "WAVEfmt ");
            /* format chunk length */
            view.setUint32(16, 16, true);
            /* audio format */
            view.setUint16(20, this.formatTag, true);
            /* channel count */
            view.setUint16(22, this.channels, true);
            /* sample rate */
            view.setUint32(24, this.samplesPerSec, true);
            /* byte rate (sample rate * block align) */
            view.setUint32(28, this.avgBytesPerSec, true);
            /* block align (channel count * bytes per sample) */
            view.setUint16(32, this.channels * (this.bitsPerSample / 8), true);
            /* bits per sample */
            view.setUint16(34, this.bitsPerSample, true);
            /* data chunk identifier */
            this.setString(view, 36, "data");
            /* data chunk length */
            view.setUint32(40, 0, true);
        }
    }
    /**
     * Retrieves the default input format.
     * @member AudioStreamFormatImpl.getDefaultInputFormat
     * @function
     * @public
     * @returns {AudioStreamFormatImpl} The default input format.
     */
    static getDefaultInputFormat() {
        return new AudioStreamFormatImpl();
    }
    /**
     * Creates an audio context appropriate to current browser
     * @member AudioStreamFormatImpl.getAudioContext
     * @function
     * @public
     * @returns {AudioContext} An audio context instance
     */
    /* eslint-disable */
    static getAudioContext(sampleRate) {
        // Workaround for Speech SDK bug in Safari.
        const AudioContext = window.AudioContext // our preferred impl
            || window.webkitAudioContext // fallback, mostly when on Safari
            || false; // could not find.
        // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
        if (!!AudioContext) {
            if (sampleRate !== undefined && navigator.mediaDevices.getSupportedConstraints().sampleRate) {
                return new AudioContext({ sampleRate });
            }
            else {
                return new AudioContext();
            }
        }
        else {
            throw new Error("Browser does not support Web Audio API (AudioContext is not available).");
        }
    }
    /* eslint-enable */
    /**
     * Closes the configuration object.
     * @member AudioStreamFormatImpl.prototype.close
     * @function
     * @public
     */
    close() {
        return;
    }
    get header() {
        return this.privHeader;
    }
    setString(view, offset, str) {
        for (let i = 0; i < str.length; i++) {
            view.setUint8(offset + i, str.charCodeAt(i));
        }
    }
}
exports.AudioStreamFormatImpl = AudioStreamFormatImpl;



/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileAudioSource = void 0;
const Exports_js_1 = __webpack_require__(2);
const Exports_js_2 = __webpack_require__(4);
const AudioStreamFormat_js_1 = __webpack_require__(73);
class FileAudioSource {
    constructor(file, filename, audioSourceId) {
        this.privStreams = {};
        this.privHeaderEnd = 44;
        this.privId = audioSourceId ? audioSourceId : (0, Exports_js_2.createNoDashGuid)();
        this.privEvents = new Exports_js_2.EventSource();
        this.privSource = file;
        if (typeof window !== "undefined" && typeof Blob !== "undefined" && this.privSource instanceof Blob) {
            this.privFilename = file.name;
        }
        else {
            this.privFilename = filename || "unknown.wav";
        }
        // Read the header.
        this.privAudioFormatPromise = this.readHeader();
    }
    get format() {
        return this.privAudioFormatPromise;
    }
    turnOn() {
        if (this.privFilename.lastIndexOf(".wav") !== this.privFilename.length - 4) {
            const errorMsg = this.privFilename + " is not supported. Only WAVE files are allowed at the moment.";
            this.onEvent(new Exports_js_2.AudioSourceErrorEvent(errorMsg, ""));
            return Promise.reject(errorMsg);
        }
        this.onEvent(new Exports_js_2.AudioSourceInitializingEvent(this.privId)); // no stream id
        this.onEvent(new Exports_js_2.AudioSourceReadyEvent(this.privId));
        return;
    }
    id() {
        return this.privId;
    }
    async attach(audioNodeId) {
        this.onEvent(new Exports_js_2.AudioStreamNodeAttachingEvent(this.privId, audioNodeId));
        const stream = await this.upload(audioNodeId);
        this.onEvent(new Exports_js_2.AudioStreamNodeAttachedEvent(this.privId, audioNodeId));
        return Promise.resolve({
            detach: async () => {
                stream.readEnded();
                delete this.privStreams[audioNodeId];
                this.onEvent(new Exports_js_2.AudioStreamNodeDetachedEvent(this.privId, audioNodeId));
                await this.turnOff();
            },
            id: () => audioNodeId,
            read: () => stream.read(),
        });
    }
    detach(audioNodeId) {
        if (audioNodeId && this.privStreams[audioNodeId]) {
            this.privStreams[audioNodeId].close();
            delete this.privStreams[audioNodeId];
            this.onEvent(new Exports_js_2.AudioStreamNodeDetachedEvent(this.privId, audioNodeId));
        }
    }
    turnOff() {
        for (const streamId in this.privStreams) {
            if (streamId) {
                const stream = this.privStreams[streamId];
                if (stream && !stream.isClosed) {
                    stream.close();
                }
            }
        }
        this.onEvent(new Exports_js_2.AudioSourceOffEvent(this.privId)); // no stream now
        return Promise.resolve();
    }
    get events() {
        return this.privEvents;
    }
    get deviceInfo() {
        return this.privAudioFormatPromise.then((result) => (Promise.resolve({
            bitspersample: result.bitsPerSample,
            channelcount: result.channels,
            connectivity: Exports_js_1.connectivity.Unknown,
            manufacturer: "Speech SDK",
            model: "File",
            samplerate: result.samplesPerSec,
            type: Exports_js_1.type.File,
        })));
    }
    readHeader() {
        // Read the wave header.
        const maxHeaderSize = 4296;
        const header = this.privSource.slice(0, maxHeaderSize);
        const headerResult = new Exports_js_2.Deferred();
        const processHeader = (header) => {
            const view = new DataView(header);
            const getWord = (index) => String.fromCharCode(view.getUint8(index), view.getUint8(index + 1), view.getUint8(index + 2), view.getUint8(index + 3));
            // RIFF 4 bytes.
            if ("RIFF" !== getWord(0)) {
                headerResult.reject("Invalid WAV header in file, RIFF was not found");
                return;
            }
            // length, 4 bytes
            // RIFF Type & fmt 8 bytes
            if ("WAVE" !== getWord(8) || "fmt " !== getWord(12)) {
                headerResult.reject("Invalid WAV header in file, WAVEfmt was not found");
                return;
            }
            const formatSize = view.getInt32(16, true);
            const channelCount = view.getUint16(22, true);
            const sampleRate = view.getUint32(24, true);
            const bitsPerSample = view.getUint16(34, true);
            // Confirm if header is 44 bytes long.
            let pos = 36 + Math.max(formatSize - 16, 0);
            for (; getWord(pos) !== "data"; pos += 2) {
                if (pos > maxHeaderSize - 8) {
                    headerResult.reject("Invalid WAV header in file, data block was not found");
                    return;
                }
            }
            this.privHeaderEnd = pos + 8;
            headerResult.resolve(AudioStreamFormat_js_1.AudioStreamFormat.getWaveFormatPCM(sampleRate, bitsPerSample, channelCount));
        };
        if (typeof window !== "undefined" && typeof Blob !== "undefined" && header instanceof Blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const header = event.target.result;
                processHeader(header);
            };
            reader.readAsArrayBuffer(header);
        }
        else {
            const h = header;
            processHeader(h.buffer.slice(h.byteOffset, h.byteOffset + h.byteLength));
        }
        return headerResult.promise;
    }
    async upload(audioNodeId) {
        const onerror = (error) => {
            const errorMsg = `Error occurred while processing '${this.privFilename}'. ${error}`;
            this.onEvent(new Exports_js_2.AudioStreamNodeErrorEvent(this.privId, audioNodeId, errorMsg));
            throw new Error(errorMsg);
        };
        try {
            await this.turnOn();
            const format = await this.privAudioFormatPromise;
            const stream = new Exports_js_2.ChunkedArrayBufferStream(format.avgBytesPerSec / 10, audioNodeId);
            this.privStreams[audioNodeId] = stream;
            const chunk = this.privSource.slice(this.privHeaderEnd);
            const processFile = (buff) => {
                if (stream.isClosed) {
                    return; // output stream was closed (somebody called TurnOff). We're done here.
                }
                stream.writeStreamChunk({
                    buffer: buff,
                    isEnd: false,
                    timeReceived: Date.now(),
                });
                stream.close();
            };
            if (typeof window !== "undefined" && typeof Blob !== "undefined" && chunk instanceof Blob) {
                const reader = new FileReader();
                reader.onerror = (ev) => onerror(ev.toString());
                reader.onload = (event) => {
                    const fileBuffer = event.target.result;
                    processFile(fileBuffer);
                };
                reader.readAsArrayBuffer(chunk);
            }
            else {
                const c = chunk;
                processFile(c.buffer.slice(c.byteOffset, c.byteOffset + c.byteLength));
            }
            return stream;
        }
        catch (e) {
            onerror(e);
        }
    }
    onEvent(event) {
        this.privEvents.onEvent(event);
        Exports_js_2.Events.instance.onEvent(event);
    }
}
exports.FileAudioSource = FileAudioSource;



/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PcmRecorder = void 0;
const Exports_1 = __webpack_require__(4);
class PcmRecorder {
    constructor(stopInputOnRelease) {
        this.privStopInputOnRelease = stopInputOnRelease;
    }
    record(context, mediaStream, outputStream) {
        const desiredSampleRate = 16000;
        const waveStreamEncoder = new Exports_1.RiffPcmEncoder(context.sampleRate, desiredSampleRate);
        const micInput = context.createMediaStreamSource(mediaStream);
        const attachScriptProcessor = () => {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const scriptNode = (() => {
                let bufferSize = 0;
                try {
                    return context.createScriptProcessor(bufferSize, 1, 1);
                }
                catch (error) {
                    // Webkit (<= version 31) requires a valid bufferSize.
                    bufferSize = 2048;
                    let audioSampleRate = context.sampleRate;
                    while (bufferSize < 16384 && audioSampleRate >= (2 * desiredSampleRate)) {
                        bufferSize <<= 1;
                        audioSampleRate >>= 1;
                    }
                    return context.createScriptProcessor(bufferSize, 1, 1);
                }
            })();
            scriptNode.onaudioprocess = (event) => {
                const inputFrame = event.inputBuffer.getChannelData(0);
                if (outputStream && !outputStream.isClosed) {
                    const waveFrame = waveStreamEncoder.encode(inputFrame);
                    if (!!waveFrame) {
                        outputStream.writeStreamChunk({
                            buffer: waveFrame,
                            isEnd: false,
                            timeReceived: Date.now(),
                        });
                    }
                }
            };
            micInput.connect(scriptNode);
            scriptNode.connect(context.destination);
            this.privMediaResources = {
                scriptProcessorNode: scriptNode,
                source: micInput,
                stream: mediaStream,
            };
        };
        // https://webaudio.github.io/web-audio-api/#audioworklet
        // Using AudioWorklet to improve audio quality and avoid audio glitches due to blocking the UI thread
        const skipAudioWorklet = !!this.privSpeechProcessorScript && this.privSpeechProcessorScript.toLowerCase() === "ignore";
        if (!!context.audioWorklet && !skipAudioWorklet) {
            if (!this.privSpeechProcessorScript) {
                const workletScript = `class SP extends AudioWorkletProcessor {
                    constructor(options) {
                      super(options);
                    }
                    process(inputs, outputs) {
                      const input = inputs[0];
                      const output = [];
                      for (let channel = 0; channel < input.length; channel += 1) {
                        output[channel] = input[channel];
                      }
                      this.port.postMessage(output[0]);
                      return true;
                    }
                  }
                  registerProcessor('speech-processor', SP);`;
                const blob = new Blob([workletScript], { type: "application/javascript; charset=utf-8" });
                this.privSpeechProcessorScript = URL.createObjectURL(blob);
            }
            context.audioWorklet
                .addModule(this.privSpeechProcessorScript)
                .then(() => {
                const workletNode = new AudioWorkletNode(context, "speech-processor");
                workletNode.port.onmessage = (ev) => {
                    const inputFrame = ev.data;
                    if (outputStream && !outputStream.isClosed) {
                        const waveFrame = waveStreamEncoder.encode(inputFrame);
                        if (!!waveFrame) {
                            outputStream.writeStreamChunk({
                                buffer: waveFrame,
                                isEnd: false,
                                timeReceived: Date.now(),
                            });
                        }
                    }
                };
                micInput.connect(workletNode);
                workletNode.connect(context.destination);
                this.privMediaResources = {
                    scriptProcessorNode: workletNode,
                    source: micInput,
                    stream: mediaStream,
                };
            })
                .catch(() => {
                attachScriptProcessor();
            });
        }
        else {
            try {
                attachScriptProcessor();
            }
            catch (err) {
                throw new Error(`Unable to start audio worklet node for PCMRecorder: ${err}`);
            }
        }
    }
    releaseMediaResources(context) {
        if (this.privMediaResources) {
            if (this.privMediaResources.scriptProcessorNode) {
                this.privMediaResources.scriptProcessorNode.disconnect(context.destination);
                this.privMediaResources.scriptProcessorNode = null;
            }
            if (this.privMediaResources.source) {
                this.privMediaResources.source.disconnect();
                if (this.privStopInputOnRelease) {
                    this.privMediaResources.stream.getTracks().forEach((track) => track.stop());
                }
                this.privMediaResources.source = null;
            }
        }
    }
    setWorkletUrl(url) {
        this.privSpeechProcessorScript = url;
    }
}
exports.PcmRecorder = PcmRecorder;



/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsocketConnection = void 0;
const Exports_js_1 = __webpack_require__(4);
const WebsocketMessageAdapter_js_1 = __webpack_require__(77);
class WebsocketConnection {
    constructor(uri, queryParameters, headers, messageFormatter, proxyInfo, enableCompression = false, connectionId) {
        this.privIsDisposed = false;
        if (!uri) {
            throw new Exports_js_1.ArgumentNullError("uri");
        }
        if (!messageFormatter) {
            throw new Exports_js_1.ArgumentNullError("messageFormatter");
        }
        this.privMessageFormatter = messageFormatter;
        let queryParams = "";
        let i = 0;
        if (queryParameters) {
            for (const paramName in queryParameters) {
                if (paramName) {
                    queryParams += ((i === 0) && (uri.indexOf("?") === -1)) ? "?" : "&";
                    const key = encodeURIComponent(paramName);
                    queryParams += key;
                    let val = queryParameters[paramName];
                    if (val) {
                        val = encodeURIComponent(val);
                        queryParams += `=${val}`;
                    }
                    i++;
                }
            }
        }
        if (headers) {
            for (const headerName in headers) {
                if (headerName) {
                    queryParams += ((i === 0) && (uri.indexOf("?") === -1)) ? "?" : "&";
                    const val = encodeURIComponent(headers[headerName]);
                    queryParams += `${headerName}=${val}`;
                    i++;
                }
            }
        }
        this.privUri = uri + queryParams;
        this.privId = connectionId ? connectionId : (0, Exports_js_1.createNoDashGuid)();
        this.privConnectionMessageAdapter = new WebsocketMessageAdapter_js_1.WebsocketMessageAdapter(this.privUri, this.id, this.privMessageFormatter, proxyInfo, headers, enableCompression);
    }
    async dispose() {
        this.privIsDisposed = true;
        if (this.privConnectionMessageAdapter) {
            await this.privConnectionMessageAdapter.close();
        }
    }
    isDisposed() {
        return this.privIsDisposed;
    }
    get id() {
        return this.privId;
    }
    get uri() {
        return this.privUri;
    }
    state() {
        return this.privConnectionMessageAdapter.state;
    }
    open() {
        return this.privConnectionMessageAdapter.open();
    }
    send(message) {
        return this.privConnectionMessageAdapter.send(message);
    }
    read() {
        return this.privConnectionMessageAdapter.read();
    }
    get events() {
        return this.privConnectionMessageAdapter.events;
    }
}
exports.WebsocketConnection = WebsocketConnection;



/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsocketMessageAdapter = void 0;
const net = __importStar(__webpack_require__(78));
const tls = __importStar(__webpack_require__(79));
const agent_base_1 = __importDefault(__webpack_require__(80));
const https_proxy_agent_1 = __importDefault(__webpack_require__(81));
const ws_1 = __importDefault(__webpack_require__(82));
const HeaderNames_js_1 = __webpack_require__(59);
const Exports_js_1 = __webpack_require__(4);
class WebsocketMessageAdapter {
    constructor(uri, connectionId, messageFormatter, proxyInfo, headers, enableCompression) {
        if (!uri) {
            throw new Exports_js_1.ArgumentNullError("uri");
        }
        if (!messageFormatter) {
            throw new Exports_js_1.ArgumentNullError("messageFormatter");
        }
        this.proxyInfo = proxyInfo;
        this.privConnectionEvents = new Exports_js_1.EventSource();
        this.privConnectionId = connectionId;
        this.privMessageFormatter = messageFormatter;
        this.privConnectionState = Exports_js_1.ConnectionState.None;
        this.privUri = uri;
        this.privHeaders = headers;
        this.privEnableCompression = enableCompression;
        // Add the connection ID to the headers
        this.privHeaders[HeaderNames_js_1.HeaderNames.ConnectionId] = this.privConnectionId;
        this.privHeaders.connectionId = this.privConnectionId;
        this.privLastErrorReceived = "";
    }
    get state() {
        return this.privConnectionState;
    }
    open() {
        if (this.privConnectionState === Exports_js_1.ConnectionState.Disconnected) {
            return Promise.reject(`Cannot open a connection that is in ${this.privConnectionState} state`);
        }
        if (this.privConnectionEstablishDeferral) {
            return this.privConnectionEstablishDeferral.promise;
        }
        this.privConnectionEstablishDeferral = new Exports_js_1.Deferred();
        this.privCertificateValidatedDeferral = new Exports_js_1.Deferred();
        this.privConnectionState = Exports_js_1.ConnectionState.Connecting;
        try {
            const proxyConfiguredInNode = typeof window === "undefined" && !!this.proxyInfo?.HostName;
            if (typeof WebSocket !== "undefined" && !WebsocketMessageAdapter.forceNpmWebSocket && !proxyConfiguredInNode) {
                // Browser handles cert checks.
                this.privCertificateValidatedDeferral.resolve();
                this.privWebsocketClient = new WebSocket(this.privUri);
            }
            else {
                // Workaround for https://github.com/microsoft/cognitive-services-speech-sdk-js/issues/465
                // Which is root caused by https://github.com/TooTallNate/node-agent-base/issues/61
                const uri = new URL(this.privUri);
                let protocol = uri.protocol;
                if (protocol?.toLocaleLowerCase() === "wss:") {
                    protocol = "https:";
                }
                else if (protocol?.toLocaleLowerCase() === "ws:") {
                    protocol = "http:";
                }
                const options = { headers: this.privHeaders, perMessageDeflate: this.privEnableCompression, followRedirects: protocol.toLocaleLowerCase() === "https:" };
                // The ocsp library will handle validation for us and fail the connection if needed.
                this.privCertificateValidatedDeferral.resolve();
                options.agent = this.getAgent();
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                options.agent.protocol = protocol;
                this.privWebsocketClient = new ws_1.default(this.privUri, options);
                this.privWebsocketClient.on("redirect", (redirectUrl) => {
                    const event = new Exports_js_1.ConnectionRedirectEvent(this.privConnectionId, redirectUrl, this.privUri, `Getting redirect URL from endpoint ${this.privUri} with redirect URL '${redirectUrl}'`);
                    Exports_js_1.Events.instance.onEvent(event);
                });
            }
            this.privWebsocketClient.binaryType = "arraybuffer";
            this.privReceivingMessageQueue = new Exports_js_1.Queue();
            this.privDisconnectDeferral = new Exports_js_1.Deferred();
            this.privSendMessageQueue = new Exports_js_1.Queue();
            this.processSendQueue().catch((reason) => {
                Exports_js_1.Events.instance.onEvent(new Exports_js_1.BackgroundEvent(reason));
            });
        }
        catch (error) {
            this.privConnectionEstablishDeferral.resolve(new Exports_js_1.ConnectionOpenResponse(500, error));
            return this.privConnectionEstablishDeferral.promise;
        }
        this.onEvent(new Exports_js_1.ConnectionStartEvent(this.privConnectionId, this.privUri));
        this.privWebsocketClient.onopen = () => {
            this.privCertificateValidatedDeferral.promise.then(() => {
                this.privConnectionState = Exports_js_1.ConnectionState.Connected;
                this.onEvent(new Exports_js_1.ConnectionEstablishedEvent(this.privConnectionId));
                this.privConnectionEstablishDeferral.resolve(new Exports_js_1.ConnectionOpenResponse(200, ""));
            }, (error) => {
                this.privConnectionEstablishDeferral.reject(error);
            });
        };
        this.privWebsocketClient.onerror = (e) => {
            this.onEvent(new Exports_js_1.ConnectionErrorEvent(this.privConnectionId, e.message, e.type));
            this.privLastErrorReceived = e.message;
        };
        this.privWebsocketClient.onclose = (e) => {
            if (this.privConnectionState === Exports_js_1.ConnectionState.Connecting) {
                this.privConnectionState = Exports_js_1.ConnectionState.Disconnected;
                // this.onEvent(new ConnectionEstablishErrorEvent(this.connectionId, e.code, e.reason));
                this.privConnectionEstablishDeferral.resolve(new Exports_js_1.ConnectionOpenResponse(e.code, e.reason + " " + this.privLastErrorReceived));
            }
            else {
                this.privConnectionState = Exports_js_1.ConnectionState.Disconnected;
                this.privWebsocketClient = null;
                this.onEvent(new Exports_js_1.ConnectionClosedEvent(this.privConnectionId, e.code, e.reason));
            }
            this.onClose(e.code, e.reason).catch((reason) => {
                Exports_js_1.Events.instance.onEvent(new Exports_js_1.BackgroundEvent(reason));
            });
        };
        this.privWebsocketClient.onmessage = (e) => {
            const networkReceivedTime = new Date().toISOString();
            if (this.privConnectionState === Exports_js_1.ConnectionState.Connected) {
                const deferred = new Exports_js_1.Deferred();
                // let id = ++this.idCounter;
                this.privReceivingMessageQueue.enqueueFromPromise(deferred.promise);
                if (e.data instanceof ArrayBuffer) {
                    const rawMessage = new Exports_js_1.RawWebsocketMessage(Exports_js_1.MessageType.Binary, e.data);
                    this.privMessageFormatter
                        .toConnectionMessage(rawMessage)
                        .then((connectionMessage) => {
                        this.onEvent(new Exports_js_1.ConnectionMessageReceivedEvent(this.privConnectionId, networkReceivedTime, connectionMessage));
                        deferred.resolve(connectionMessage);
                    }, (error) => {
                        // TODO: Events for these ?
                        deferred.reject(`Invalid binary message format. Error: ${error}`);
                    });
                }
                else {
                    const rawMessage = new Exports_js_1.RawWebsocketMessage(Exports_js_1.MessageType.Text, e.data);
                    this.privMessageFormatter
                        .toConnectionMessage(rawMessage)
                        .then((connectionMessage) => {
                        this.onEvent(new Exports_js_1.ConnectionMessageReceivedEvent(this.privConnectionId, networkReceivedTime, connectionMessage));
                        deferred.resolve(connectionMessage);
                    }, (error) => {
                        // TODO: Events for these ?
                        deferred.reject(`Invalid text message format. Error: ${error}`);
                    });
                }
            }
        };
        return this.privConnectionEstablishDeferral.promise;
    }
    send(message) {
        if (this.privConnectionState !== Exports_js_1.ConnectionState.Connected) {
            return Promise.reject(`Cannot send on connection that is in ${Exports_js_1.ConnectionState[this.privConnectionState]} state`);
        }
        const messageSendStatusDeferral = new Exports_js_1.Deferred();
        const messageSendDeferral = new Exports_js_1.Deferred();
        this.privSendMessageQueue.enqueueFromPromise(messageSendDeferral.promise);
        this.privMessageFormatter
            .fromConnectionMessage(message)
            .then((rawMessage) => {
            messageSendDeferral.resolve({
                Message: message,
                RawWebsocketMessage: rawMessage,
                sendStatusDeferral: messageSendStatusDeferral,
            });
        }, (error) => {
            messageSendDeferral.reject(`Error formatting the message. ${error}`);
        });
        return messageSendStatusDeferral.promise;
    }
    read() {
        if (this.privConnectionState !== Exports_js_1.ConnectionState.Connected) {
            return Promise.reject(`Cannot read on connection that is in ${this.privConnectionState} state`);
        }
        return this.privReceivingMessageQueue.dequeue();
    }
    close(reason) {
        if (this.privWebsocketClient) {
            if (this.privConnectionState !== Exports_js_1.ConnectionState.Disconnected) {
                this.privWebsocketClient.close(1000, reason ? reason : "Normal closure by client");
            }
        }
        else {
            return Promise.resolve();
        }
        return this.privDisconnectDeferral.promise;
    }
    get events() {
        return this.privConnectionEvents;
    }
    sendRawMessage(sendItem) {
        try {
            // indicates we are draining the queue and it came with no message;
            if (!sendItem) {
                return Promise.resolve();
            }
            this.onEvent(new Exports_js_1.ConnectionMessageSentEvent(this.privConnectionId, new Date().toISOString(), sendItem.Message));
            // add a check for the ws readystate in order to stop the red console error 'WebSocket is already in CLOSING or CLOSED state' appearing
            if (this.isWebsocketOpen) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                this.privWebsocketClient.send(sendItem.RawWebsocketMessage.payload);
            }
            else {
                return Promise.reject("websocket send error: Websocket not ready " + this.privConnectionId + " " + sendItem.Message.id + " " + new Error().stack);
            }
            return Promise.resolve();
        }
        catch (e) {
            return Promise.reject(`websocket send error: ${e}`);
        }
    }
    async onClose(code, reason) {
        const closeReason = `Connection closed. ${code}: ${reason}`;
        this.privConnectionState = Exports_js_1.ConnectionState.Disconnected;
        this.privDisconnectDeferral.resolve();
        await this.privReceivingMessageQueue.drainAndDispose(() => {
            // TODO: Events for these ?
            // Logger.instance.onEvent(new LoggingEvent(LogType.Warning, null, `Failed to process received message. Reason: ${closeReason}, Message: ${JSON.stringify(pendingReceiveItem)}`));
        }, closeReason);
        await this.privSendMessageQueue.drainAndDispose((pendingSendItem) => {
            pendingSendItem.sendStatusDeferral.reject(closeReason);
        }, closeReason);
    }
    async processSendQueue() {
        while (true) {
            const itemToSend = this.privSendMessageQueue.dequeue();
            const sendItem = await itemToSend;
            // indicates we are draining the queue and it came with no message;
            if (!sendItem) {
                return;
            }
            try {
                await this.sendRawMessage(sendItem);
                sendItem.sendStatusDeferral.resolve();
            }
            catch (sendError) {
                sendItem.sendStatusDeferral.reject(sendError);
            }
        }
    }
    onEvent(event) {
        this.privConnectionEvents.onEvent(event);
        Exports_js_1.Events.instance.onEvent(event);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAgent() {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const agent = new agent_base_1.default.Agent(this.createConnection);
        if (this.proxyInfo !== undefined &&
            this.proxyInfo.HostName !== undefined &&
            this.proxyInfo.Port > 0) {
            agent.proxyInfo = this.proxyInfo;
        }
        return agent;
    }
    static GetProxyAgent(proxyInfo) {
        const httpProxyOptions = {
            host: proxyInfo.HostName,
            port: proxyInfo.Port,
        };
        if (!!proxyInfo.UserName) {
            httpProxyOptions.headers = {
                "Proxy-Authentication": "Basic " + Buffer.from(`${proxyInfo.UserName}:${(proxyInfo.Password === undefined) ? "" : proxyInfo.Password}`).toString("base64"),
            };
        }
        else {
            httpProxyOptions.headers = {};
        }
        httpProxyOptions.headers.requestOCSP = "true";
        const httpProxyAgent = new https_proxy_agent_1.default(httpProxyOptions);
        return httpProxyAgent;
    }
    createConnection(request, options) {
        let socketPromise;
        options = {
            ...options,
            ...{
                requestOCSP: true,
                servername: options.host
            }
        };
        if (!!this.proxyInfo) {
            const httpProxyAgent = WebsocketMessageAdapter.GetProxyAgent(this.proxyInfo);
            const baseAgent = httpProxyAgent;
            socketPromise = new Promise((resolve, reject) => {
                baseAgent.callback(request, options, (error, socket) => {
                    if (!!error) {
                        reject(error);
                    }
                    else {
                        resolve(socket);
                    }
                });
            });
        }
        else {
            if (!!options.secureEndpoint) {
                socketPromise = Promise.resolve(tls.connect(options));
            }
            else {
                socketPromise = Promise.resolve(net.connect(options));
            }
        }
        return socketPromise;
    }
    get isWebsocketOpen() {
        return this.privWebsocketClient && this.privWebsocketClient.readyState === this.privWebsocketClient.OPEN;
    }
}
exports.WebsocketMessageAdapter = WebsocketMessageAdapter;
WebsocketMessageAdapter.forceNpmWebSocket = false;



/***/ }),
/* 78 */
/***/ (() => {

/* (ignored) */

/***/ }),
/* 79 */
/***/ (() => {

/* (ignored) */

/***/ }),
/* 80 */
/***/ (() => {

/* (ignored) */

/***/ }),
/* 81 */
/***/ (() => {

/* (ignored) */

/***/ }),
/* 82 */
/***/ (() => {

/* (ignored) */

/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReplayableAudioNode = void 0;
class ReplayableAudioNode {
    constructor(audioSource, bytesPerSecond) {
        this.privBuffers = [];
        this.privReplayOffset = 0;
        this.privLastShrinkOffset = 0;
        this.privBufferStartOffset = 0;
        this.privBufferSerial = 0;
        this.privBufferedBytes = 0;
        this.privReplay = false;
        this.privLastChunkAcquiredTime = 0;
        this.privAudioNode = audioSource;
        this.privBytesPerSecond = bytesPerSecond;
    }
    id() {
        return this.privAudioNode.id();
    }
    // Reads and returns the next chunk of audio buffer.
    // If replay of existing buffers are needed, read() will first seek and replay
    // existing content, and upoin completion it will read new content from the underlying
    // audio node, saving that content into the replayable buffers.
    read() {
        // if there is a replay request to honor.
        if (!!this.privReplay && this.privBuffers.length !== 0) {
            // Find the start point in the buffers.
            // Offsets are in 100ns increments.
            // So how many bytes do we need to seek to get the right offset?
            const offsetToSeek = this.privReplayOffset - this.privBufferStartOffset;
            let bytesToSeek = Math.round(offsetToSeek * this.privBytesPerSecond * 1e-7);
            if (0 !== (bytesToSeek % 2)) {
                bytesToSeek++;
            }
            let i = 0;
            while (i < this.privBuffers.length && bytesToSeek >= this.privBuffers[i].chunk.buffer.byteLength) {
                bytesToSeek -= this.privBuffers[i++].chunk.buffer.byteLength;
            }
            if (i < this.privBuffers.length) {
                const retVal = this.privBuffers[i].chunk.buffer.slice(bytesToSeek);
                this.privReplayOffset += (retVal.byteLength / this.privBytesPerSecond) * 1e+7;
                // If we've reached the end of the buffers, stop replaying.
                if (i === this.privBuffers.length - 1) {
                    this.privReplay = false;
                }
                return Promise.resolve({
                    buffer: retVal,
                    isEnd: false,
                    timeReceived: this.privBuffers[i].chunk.timeReceived,
                });
            }
        }
        return this.privAudioNode.read()
            .then((result) => {
            if (result && result.buffer && this.privBuffers) {
                this.privBuffers.push(new BufferEntry(result, this.privBufferSerial++, this.privBufferedBytes));
                this.privBufferedBytes += result.buffer.byteLength;
            }
            return result;
        });
    }
    detach() {
        this.privBuffers = undefined;
        return this.privAudioNode.detach();
    }
    replay() {
        if (this.privBuffers && 0 !== this.privBuffers.length) {
            this.privReplay = true;
            this.privReplayOffset = this.privLastShrinkOffset;
        }
    }
    // Shrinks the existing audio buffers to start at the new offset, or at the
    // beginning of the buffer closest to the requested offset.
    // A replay request will start from the last shrink point.
    shrinkBuffers(offset) {
        if (this.privBuffers === undefined || this.privBuffers.length === 0) {
            return;
        }
        // The shrink point must only ever advance; ignore a stale/duplicate offset so the
        // resume point never moves backwards.
        if (offset <= this.privLastShrinkOffset) {
            return;
        }
        this.privLastShrinkOffset = offset;
        // Find the start point in the buffers.
        // Offsets are in 100ns increments.
        // So how many bytes do we need to seek to get the right offset?
        const offsetToSeek = offset - this.privBufferStartOffset;
        let bytesToSeek = Math.round(offsetToSeek * this.privBytesPerSecond * 1e-7);
        let i = 0;
        while (i < this.privBuffers.length && bytesToSeek >= this.privBuffers[i].chunk.buffer.byteLength) {
            bytesToSeek -= this.privBuffers[i++].chunk.buffer.byteLength;
        }
        this.privBufferStartOffset = Math.round(offset - ((bytesToSeek / this.privBytesPerSecond) * 1e+7));
        this.privBuffers = this.privBuffers.slice(i);
    }
    // Finds the time a buffer of audio was first seen by offset.
    findTimeAtOffset(offset) {
        if (offset < this.privBufferStartOffset || this.privBuffers === undefined) {
            return 0;
        }
        for (const value of this.privBuffers) {
            const startOffset = (value.byteOffset / this.privBytesPerSecond) * 1e7;
            const endOffset = startOffset + ((value.chunk.buffer.byteLength / this.privBytesPerSecond) * 1e7);
            if (offset >= startOffset && offset <= endOffset) {
                return value.chunk.timeReceived;
            }
        }
        return 0;
    }
}
exports.ReplayableAudioNode = ReplayableAudioNode;
// Primary use of this class is to help debugging problems with the replay
// code. If the memory cost of alloc / dealloc gets too much, drop it and just use
// the ArrayBuffer directly.
class BufferEntry {
    constructor(chunk, serial, byteOffset) {
        this.chunk = chunk;
        this.serial = serial;
        this.byteOffset = byteOffset;
    }
}



/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProxyInfo = void 0;
const Exports_js_1 = __webpack_require__(85);
class ProxyInfo {
    constructor(proxyHostName, proxyPort, proxyUserName, proxyPassword) {
        this.privProxyHostName = proxyHostName;
        this.privProxyPort = proxyPort;
        this.privProxyUserName = proxyUserName;
        this.privProxyPassword = proxyPassword;
    }
    static fromParameters(parameters) {
        return new ProxyInfo(parameters.getProperty(Exports_js_1.PropertyId.SpeechServiceConnection_ProxyHostName), parseInt(parameters.getProperty(Exports_js_1.PropertyId.SpeechServiceConnection_ProxyPort), 10), parameters.getProperty(Exports_js_1.PropertyId.SpeechServiceConnection_ProxyUserName), parameters.getProperty(Exports_js_1.PropertyId.SpeechServiceConnection_ProxyPassword));
    }
    static fromRecognizerConfig(config) {
        return this.fromParameters(config.parameters);
    }
    get HostName() {
        return this.privProxyHostName;
    }
    get Port() {
        return this.privProxyPort;
    }
    get UserName() {
        return this.privProxyUserName;
    }
    get Password() {
        return this.privProxyPassword;
    }
}
exports.ProxyInfo = ProxyInfo;



/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomCommandsConfig = exports.BotFrameworkConfig = exports.DialogServiceConfig = exports.PhraseListGrammar = exports.Connection = exports.ServiceEventArgs = exports.ConnectionEventArgs = exports.CancellationErrorCode = exports.CancellationDetails = exports.CancellationDetailsBase = exports.TranslationRecognitionCanceledEventArgs = exports.NoMatchDetails = exports.NoMatchReason = exports.Translations = exports.TranslationRecognizer = exports.SpeechRecognizer = exports.Recognizer = exports.PropertyId = exports.PropertyCollection = exports.SpeechTranslationConfigImpl = exports.SpeechTranslationConfig = exports.SpeechConfigImpl = exports.SpeechConfig = exports.ResultReason = exports.TranslationSynthesisResult = exports.TranslationRecognitionResult = exports.TranslationSynthesisEventArgs = exports.TranslationRecognitionEventArgs = exports.SpeechRecognitionCanceledEventArgs = exports.MeetingTranscriptionEventArgs = exports.ConversationTranscriptionEventArgs = exports.SpeechRecognitionEventArgs = exports.SpeechRecognitionResult = exports.RecognitionResult = exports.OutputFormat = exports.RecognitionEventArgs = exports.SessionEventArgs = exports.KeywordRecognitionModel = exports.PushAudioOutputStreamCallback = exports.PullAudioInputStreamCallback = exports.CancellationReason = exports.PushAudioOutputStream = exports.PullAudioOutputStream = exports.AudioOutputStream = exports.PushAudioInputStream = exports.PullAudioInputStream = exports.AudioInputStream = exports.AudioFormatTag = exports.AudioStreamFormat = exports.AudioConfig = void 0;
exports.Diagnostics = exports.AvatarWebRTCConnectionResult = exports.Coordinate = exports.AvatarVideoFormat = exports.AvatarSynthesizer = exports.AvatarSceneConfig = exports.AvatarEventArgs = exports.AvatarConfig = exports.LanguageIdMode = exports.PronunciationAssessmentResult = exports.PronunciationAssessmentConfig = exports.PronunciationAssessmentGranularity = exports.PronunciationAssessmentGradingSystem = exports.MeetingTranscriptionCanceledEventArgs = exports.ConversationTranscriptionCanceledEventArgs = exports.SpeakerAudioDestination = exports.VoiceInfo = exports.SynthesisVoiceType = exports.SynthesisVoiceGender = exports.SynthesisVoicesResult = exports.SpeechSynthesisRequestInputType = exports.SpeechSynthesisRequestInputStream = exports.SpeechSynthesisRequest = exports.SpeechSynthesisBoundaryType = exports.SpeechSynthesisVisemeEventArgs = exports.SpeechSynthesisBookmarkEventArgs = exports.SpeechSynthesisWordBoundaryEventArgs = exports.SpeechSynthesisEventArgs = exports.SpeechSynthesisResult = exports.SynthesisResult = exports.SpeechSynthesizer = exports.SpeechSynthesisOutputFormat = exports.Synthesizer = exports.User = exports.Participant = exports.MeetingTranscriber = exports.Meeting = exports.ConversationTranscriptionResult = exports.ConversationTranscriber = exports.SourceLanguageConfig = exports.AutoDetectSourceLanguageResult = exports.AutoDetectSourceLanguageConfig = exports.ConnectionMessage = exports.ConnectionMessageEventArgs = exports.BaseAudioPlayer = exports.ProfanityOption = exports.ServicePropertyChannel = exports.TurnStatusReceivedEventArgs = exports.ActivityReceivedEventArgs = exports.DialogServiceConnector = void 0;
exports.LogLevel = void 0;
var AudioConfig_js_1 = __webpack_require__(86);
Object.defineProperty(exports, "AudioConfig", ({ enumerable: true, get: function () { return AudioConfig_js_1.AudioConfig; } }));
var AudioStreamFormat_js_1 = __webpack_require__(73);
Object.defineProperty(exports, "AudioStreamFormat", ({ enumerable: true, get: function () { return AudioStreamFormat_js_1.AudioStreamFormat; } }));
Object.defineProperty(exports, "AudioFormatTag", ({ enumerable: true, get: function () { return AudioStreamFormat_js_1.AudioFormatTag; } }));
var AudioInputStream_js_1 = __webpack_require__(89);
Object.defineProperty(exports, "AudioInputStream", ({ enumerable: true, get: function () { return AudioInputStream_js_1.AudioInputStream; } }));
Object.defineProperty(exports, "PullAudioInputStream", ({ enumerable: true, get: function () { return AudioInputStream_js_1.PullAudioInputStream; } }));
Object.defineProperty(exports, "PushAudioInputStream", ({ enumerable: true, get: function () { return AudioInputStream_js_1.PushAudioInputStream; } }));
var AudioOutputStream_js_1 = __webpack_require__(90);
Object.defineProperty(exports, "AudioOutputStream", ({ enumerable: true, get: function () { return AudioOutputStream_js_1.AudioOutputStream; } }));
Object.defineProperty(exports, "PullAudioOutputStream", ({ enumerable: true, get: function () { return AudioOutputStream_js_1.PullAudioOutputStream; } }));
Object.defineProperty(exports, "PushAudioOutputStream", ({ enumerable: true, get: function () { return AudioOutputStream_js_1.PushAudioOutputStream; } }));
var CancellationReason_js_1 = __webpack_require__(93);
Object.defineProperty(exports, "CancellationReason", ({ enumerable: true, get: function () { return CancellationReason_js_1.CancellationReason; } }));
var PullAudioInputStreamCallback_js_1 = __webpack_require__(94);
Object.defineProperty(exports, "PullAudioInputStreamCallback", ({ enumerable: true, get: function () { return PullAudioInputStreamCallback_js_1.PullAudioInputStreamCallback; } }));
var PushAudioOutputStreamCallback_js_1 = __webpack_require__(95);
Object.defineProperty(exports, "PushAudioOutputStreamCallback", ({ enumerable: true, get: function () { return PushAudioOutputStreamCallback_js_1.PushAudioOutputStreamCallback; } }));
var KeywordRecognitionModel_js_1 = __webpack_require__(96);
Object.defineProperty(exports, "KeywordRecognitionModel", ({ enumerable: true, get: function () { return KeywordRecognitionModel_js_1.KeywordRecognitionModel; } }));
var SessionEventArgs_js_1 = __webpack_require__(97);
Object.defineProperty(exports, "SessionEventArgs", ({ enumerable: true, get: function () { return SessionEventArgs_js_1.SessionEventArgs; } }));
var RecognitionEventArgs_js_1 = __webpack_require__(98);
Object.defineProperty(exports, "RecognitionEventArgs", ({ enumerable: true, get: function () { return RecognitionEventArgs_js_1.RecognitionEventArgs; } }));
var OutputFormat_js_1 = __webpack_require__(99);
Object.defineProperty(exports, "OutputFormat", ({ enumerable: true, get: function () { return OutputFormat_js_1.OutputFormat; } }));
var RecognitionResult_js_1 = __webpack_require__(100);
Object.defineProperty(exports, "RecognitionResult", ({ enumerable: true, get: function () { return RecognitionResult_js_1.RecognitionResult; } }));
var SpeechRecognitionResult_js_1 = __webpack_require__(101);
Object.defineProperty(exports, "SpeechRecognitionResult", ({ enumerable: true, get: function () { return SpeechRecognitionResult_js_1.SpeechRecognitionResult; } }));
var SpeechRecognitionEventArgs_js_1 = __webpack_require__(102);
Object.defineProperty(exports, "SpeechRecognitionEventArgs", ({ enumerable: true, get: function () { return SpeechRecognitionEventArgs_js_1.SpeechRecognitionEventArgs; } }));
Object.defineProperty(exports, "ConversationTranscriptionEventArgs", ({ enumerable: true, get: function () { return SpeechRecognitionEventArgs_js_1.ConversationTranscriptionEventArgs; } }));
Object.defineProperty(exports, "MeetingTranscriptionEventArgs", ({ enumerable: true, get: function () { return SpeechRecognitionEventArgs_js_1.MeetingTranscriptionEventArgs; } }));
var SpeechRecognitionCanceledEventArgs_js_1 = __webpack_require__(103);
Object.defineProperty(exports, "SpeechRecognitionCanceledEventArgs", ({ enumerable: true, get: function () { return SpeechRecognitionCanceledEventArgs_js_1.SpeechRecognitionCanceledEventArgs; } }));
var TranslationRecognitionEventArgs_js_1 = __webpack_require__(105);
Object.defineProperty(exports, "TranslationRecognitionEventArgs", ({ enumerable: true, get: function () { return TranslationRecognitionEventArgs_js_1.TranslationRecognitionEventArgs; } }));
var TranslationSynthesisEventArgs_js_1 = __webpack_require__(106);
Object.defineProperty(exports, "TranslationSynthesisEventArgs", ({ enumerable: true, get: function () { return TranslationSynthesisEventArgs_js_1.TranslationSynthesisEventArgs; } }));
var TranslationRecognitionResult_js_1 = __webpack_require__(107);
Object.defineProperty(exports, "TranslationRecognitionResult", ({ enumerable: true, get: function () { return TranslationRecognitionResult_js_1.TranslationRecognitionResult; } }));
var TranslationSynthesisResult_js_1 = __webpack_require__(108);
Object.defineProperty(exports, "TranslationSynthesisResult", ({ enumerable: true, get: function () { return TranslationSynthesisResult_js_1.TranslationSynthesisResult; } }));
var ResultReason_js_1 = __webpack_require__(109);
Object.defineProperty(exports, "ResultReason", ({ enumerable: true, get: function () { return ResultReason_js_1.ResultReason; } }));
var SpeechConfig_js_1 = __webpack_require__(110);
Object.defineProperty(exports, "SpeechConfig", ({ enumerable: true, get: function () { return SpeechConfig_js_1.SpeechConfig; } }));
Object.defineProperty(exports, "SpeechConfigImpl", ({ enumerable: true, get: function () { return SpeechConfig_js_1.SpeechConfigImpl; } }));
var SpeechTranslationConfig_js_1 = __webpack_require__(111);
Object.defineProperty(exports, "SpeechTranslationConfig", ({ enumerable: true, get: function () { return SpeechTranslationConfig_js_1.SpeechTranslationConfig; } }));
Object.defineProperty(exports, "SpeechTranslationConfigImpl", ({ enumerable: true, get: function () { return SpeechTranslationConfig_js_1.SpeechTranslationConfigImpl; } }));
var PropertyCollection_js_1 = __webpack_require__(112);
Object.defineProperty(exports, "PropertyCollection", ({ enumerable: true, get: function () { return PropertyCollection_js_1.PropertyCollection; } }));
var PropertyId_js_1 = __webpack_require__(113);
Object.defineProperty(exports, "PropertyId", ({ enumerable: true, get: function () { return PropertyId_js_1.PropertyId; } }));
var Recognizer_js_1 = __webpack_require__(114);
Object.defineProperty(exports, "Recognizer", ({ enumerable: true, get: function () { return Recognizer_js_1.Recognizer; } }));
var SpeechRecognizer_js_1 = __webpack_require__(115);
Object.defineProperty(exports, "SpeechRecognizer", ({ enumerable: true, get: function () { return SpeechRecognizer_js_1.SpeechRecognizer; } }));
var TranslationRecognizer_js_1 = __webpack_require__(117);
Object.defineProperty(exports, "TranslationRecognizer", ({ enumerable: true, get: function () { return TranslationRecognizer_js_1.TranslationRecognizer; } }));
var Translations_js_1 = __webpack_require__(120);
Object.defineProperty(exports, "Translations", ({ enumerable: true, get: function () { return Translations_js_1.Translations; } }));
var NoMatchReason_js_1 = __webpack_require__(121);
Object.defineProperty(exports, "NoMatchReason", ({ enumerable: true, get: function () { return NoMatchReason_js_1.NoMatchReason; } }));
var NoMatchDetails_js_1 = __webpack_require__(122);
Object.defineProperty(exports, "NoMatchDetails", ({ enumerable: true, get: function () { return NoMatchDetails_js_1.NoMatchDetails; } }));
var TranslationRecognitionCanceledEventArgs_js_1 = __webpack_require__(123);
Object.defineProperty(exports, "TranslationRecognitionCanceledEventArgs", ({ enumerable: true, get: function () { return TranslationRecognitionCanceledEventArgs_js_1.TranslationRecognitionCanceledEventArgs; } }));
var CancellationDetailsBase_js_1 = __webpack_require__(124);
Object.defineProperty(exports, "CancellationDetailsBase", ({ enumerable: true, get: function () { return CancellationDetailsBase_js_1.CancellationDetailsBase; } }));
var CancellationDetails_js_1 = __webpack_require__(125);
Object.defineProperty(exports, "CancellationDetails", ({ enumerable: true, get: function () { return CancellationDetails_js_1.CancellationDetails; } }));
var CancellationErrorCodes_js_1 = __webpack_require__(126);
Object.defineProperty(exports, "CancellationErrorCode", ({ enumerable: true, get: function () { return CancellationErrorCodes_js_1.CancellationErrorCode; } }));
var ConnectionEventArgs_js_1 = __webpack_require__(127);
Object.defineProperty(exports, "ConnectionEventArgs", ({ enumerable: true, get: function () { return ConnectionEventArgs_js_1.ConnectionEventArgs; } }));
var ServiceEventArgs_js_1 = __webpack_require__(128);
Object.defineProperty(exports, "ServiceEventArgs", ({ enumerable: true, get: function () { return ServiceEventArgs_js_1.ServiceEventArgs; } }));
var Connection_js_1 = __webpack_require__(118);
Object.defineProperty(exports, "Connection", ({ enumerable: true, get: function () { return Connection_js_1.Connection; } }));
var PhraseListGrammar_js_1 = __webpack_require__(129);
Object.defineProperty(exports, "PhraseListGrammar", ({ enumerable: true, get: function () { return PhraseListGrammar_js_1.PhraseListGrammar; } }));
var DialogServiceConfig_js_1 = __webpack_require__(130);
Object.defineProperty(exports, "DialogServiceConfig", ({ enumerable: true, get: function () { return DialogServiceConfig_js_1.DialogServiceConfig; } }));
var BotFrameworkConfig_js_1 = __webpack_require__(131);
Object.defineProperty(exports, "BotFrameworkConfig", ({ enumerable: true, get: function () { return BotFrameworkConfig_js_1.BotFrameworkConfig; } }));
var CustomCommandsConfig_js_1 = __webpack_require__(132);
Object.defineProperty(exports, "CustomCommandsConfig", ({ enumerable: true, get: function () { return CustomCommandsConfig_js_1.CustomCommandsConfig; } }));
var DialogServiceConnector_js_1 = __webpack_require__(133);
Object.defineProperty(exports, "DialogServiceConnector", ({ enumerable: true, get: function () { return DialogServiceConnector_js_1.DialogServiceConnector; } }));
var ActivityReceivedEventArgs_js_1 = __webpack_require__(137);
Object.defineProperty(exports, "ActivityReceivedEventArgs", ({ enumerable: true, get: function () { return ActivityReceivedEventArgs_js_1.ActivityReceivedEventArgs; } }));
var TurnStatusReceivedEventArgs_js_1 = __webpack_require__(138);
Object.defineProperty(exports, "TurnStatusReceivedEventArgs", ({ enumerable: true, get: function () { return TurnStatusReceivedEventArgs_js_1.TurnStatusReceivedEventArgs; } }));
var ServicePropertyChannel_js_1 = __webpack_require__(140);
Object.defineProperty(exports, "ServicePropertyChannel", ({ enumerable: true, get: function () { return ServicePropertyChannel_js_1.ServicePropertyChannel; } }));
var ProfanityOption_js_1 = __webpack_require__(141);
Object.defineProperty(exports, "ProfanityOption", ({ enumerable: true, get: function () { return ProfanityOption_js_1.ProfanityOption; } }));
var BaseAudioPlayer_js_1 = __webpack_require__(142);
Object.defineProperty(exports, "BaseAudioPlayer", ({ enumerable: true, get: function () { return BaseAudioPlayer_js_1.BaseAudioPlayer; } }));
var ConnectionMessageEventArgs_js_1 = __webpack_require__(143);
Object.defineProperty(exports, "ConnectionMessageEventArgs", ({ enumerable: true, get: function () { return ConnectionMessageEventArgs_js_1.ConnectionMessageEventArgs; } }));
var ConnectionMessage_js_1 = __webpack_require__(119);
Object.defineProperty(exports, "ConnectionMessage", ({ enumerable: true, get: function () { return ConnectionMessage_js_1.ConnectionMessage; } }));
var AutoDetectSourceLanguageConfig_js_1 = __webpack_require__(144);
Object.defineProperty(exports, "AutoDetectSourceLanguageConfig", ({ enumerable: true, get: function () { return AutoDetectSourceLanguageConfig_js_1.AutoDetectSourceLanguageConfig; } }));
var AutoDetectSourceLanguageResult_js_1 = __webpack_require__(146);
Object.defineProperty(exports, "AutoDetectSourceLanguageResult", ({ enumerable: true, get: function () { return AutoDetectSourceLanguageResult_js_1.AutoDetectSourceLanguageResult; } }));
var SourceLanguageConfig_js_1 = __webpack_require__(147);
Object.defineProperty(exports, "SourceLanguageConfig", ({ enumerable: true, get: function () { return SourceLanguageConfig_js_1.SourceLanguageConfig; } }));
var Exports_js_1 = __webpack_require__(148);
Object.defineProperty(exports, "ConversationTranscriber", ({ enumerable: true, get: function () { return Exports_js_1.ConversationTranscriber; } }));
Object.defineProperty(exports, "ConversationTranscriptionResult", ({ enumerable: true, get: function () { return Exports_js_1.ConversationTranscriptionResult; } }));
Object.defineProperty(exports, "Meeting", ({ enumerable: true, get: function () { return Exports_js_1.Meeting; } }));
Object.defineProperty(exports, "MeetingTranscriber", ({ enumerable: true, get: function () { return Exports_js_1.MeetingTranscriber; } }));
Object.defineProperty(exports, "Participant", ({ enumerable: true, get: function () { return Exports_js_1.Participant; } }));
Object.defineProperty(exports, "User", ({ enumerable: true, get: function () { return Exports_js_1.User; } }));
var Synthesizer_js_1 = __webpack_require__(155);
Object.defineProperty(exports, "Synthesizer", ({ enumerable: true, get: function () { return Synthesizer_js_1.Synthesizer; } }));
var SpeechSynthesisOutputFormat_js_1 = __webpack_require__(92);
Object.defineProperty(exports, "SpeechSynthesisOutputFormat", ({ enumerable: true, get: function () { return SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat; } }));
var SpeechSynthesizer_js_1 = __webpack_require__(156);
Object.defineProperty(exports, "SpeechSynthesizer", ({ enumerable: true, get: function () { return SpeechSynthesizer_js_1.SpeechSynthesizer; } }));
var SynthesisResult_js_1 = __webpack_require__(157);
Object.defineProperty(exports, "SynthesisResult", ({ enumerable: true, get: function () { return SynthesisResult_js_1.SynthesisResult; } }));
var SpeechSynthesisResult_js_1 = __webpack_require__(158);
Object.defineProperty(exports, "SpeechSynthesisResult", ({ enumerable: true, get: function () { return SpeechSynthesisResult_js_1.SpeechSynthesisResult; } }));
var SpeechSynthesisEventArgs_js_1 = __webpack_require__(159);
Object.defineProperty(exports, "SpeechSynthesisEventArgs", ({ enumerable: true, get: function () { return SpeechSynthesisEventArgs_js_1.SpeechSynthesisEventArgs; } }));
var SpeechSynthesisWordBoundaryEventArgs_js_1 = __webpack_require__(160);
Object.defineProperty(exports, "SpeechSynthesisWordBoundaryEventArgs", ({ enumerable: true, get: function () { return SpeechSynthesisWordBoundaryEventArgs_js_1.SpeechSynthesisWordBoundaryEventArgs; } }));
var SpeechSynthesisBookmarkEventArgs_js_1 = __webpack_require__(161);
Object.defineProperty(exports, "SpeechSynthesisBookmarkEventArgs", ({ enumerable: true, get: function () { return SpeechSynthesisBookmarkEventArgs_js_1.SpeechSynthesisBookmarkEventArgs; } }));
var SpeechSynthesisVisemeEventArgs_js_1 = __webpack_require__(162);
Object.defineProperty(exports, "SpeechSynthesisVisemeEventArgs", ({ enumerable: true, get: function () { return SpeechSynthesisVisemeEventArgs_js_1.SpeechSynthesisVisemeEventArgs; } }));
var SpeechSynthesisBoundaryType_js_1 = __webpack_require__(163);
Object.defineProperty(exports, "SpeechSynthesisBoundaryType", ({ enumerable: true, get: function () { return SpeechSynthesisBoundaryType_js_1.SpeechSynthesisBoundaryType; } }));
var SpeechSynthesisRequest_js_1 = __webpack_require__(164);
Object.defineProperty(exports, "SpeechSynthesisRequest", ({ enumerable: true, get: function () { return SpeechSynthesisRequest_js_1.SpeechSynthesisRequest; } }));
Object.defineProperty(exports, "SpeechSynthesisRequestInputStream", ({ enumerable: true, get: function () { return SpeechSynthesisRequest_js_1.SpeechSynthesisRequestInputStream; } }));
var SpeechSynthesisRequestInputType_js_1 = __webpack_require__(165);
Object.defineProperty(exports, "SpeechSynthesisRequestInputType", ({ enumerable: true, get: function () { return SpeechSynthesisRequestInputType_js_1.SpeechSynthesisRequestInputType; } }));
var SynthesisVoicesResult_js_1 = __webpack_require__(167);
Object.defineProperty(exports, "SynthesisVoicesResult", ({ enumerable: true, get: function () { return SynthesisVoicesResult_js_1.SynthesisVoicesResult; } }));
var VoiceInfo_js_1 = __webpack_require__(168);
Object.defineProperty(exports, "SynthesisVoiceGender", ({ enumerable: true, get: function () { return VoiceInfo_js_1.SynthesisVoiceGender; } }));
Object.defineProperty(exports, "SynthesisVoiceType", ({ enumerable: true, get: function () { return VoiceInfo_js_1.SynthesisVoiceType; } }));
Object.defineProperty(exports, "VoiceInfo", ({ enumerable: true, get: function () { return VoiceInfo_js_1.VoiceInfo; } }));
var SpeakerAudioDestination_js_1 = __webpack_require__(169);
Object.defineProperty(exports, "SpeakerAudioDestination", ({ enumerable: true, get: function () { return SpeakerAudioDestination_js_1.SpeakerAudioDestination; } }));
var ConversationTranscriptionCanceledEventArgs_js_1 = __webpack_require__(170);
Object.defineProperty(exports, "ConversationTranscriptionCanceledEventArgs", ({ enumerable: true, get: function () { return ConversationTranscriptionCanceledEventArgs_js_1.ConversationTranscriptionCanceledEventArgs; } }));
var MeetingTranscriptionCanceledEventArgs_js_1 = __webpack_require__(171);
Object.defineProperty(exports, "MeetingTranscriptionCanceledEventArgs", ({ enumerable: true, get: function () { return MeetingTranscriptionCanceledEventArgs_js_1.MeetingTranscriptionCanceledEventArgs; } }));
var PronunciationAssessmentGradingSystem_js_1 = __webpack_require__(172);
Object.defineProperty(exports, "PronunciationAssessmentGradingSystem", ({ enumerable: true, get: function () { return PronunciationAssessmentGradingSystem_js_1.PronunciationAssessmentGradingSystem; } }));
var PronunciationAssessmentGranularity_js_1 = __webpack_require__(173);
Object.defineProperty(exports, "PronunciationAssessmentGranularity", ({ enumerable: true, get: function () { return PronunciationAssessmentGranularity_js_1.PronunciationAssessmentGranularity; } }));
var PronunciationAssessmentConfig_js_1 = __webpack_require__(174);
Object.defineProperty(exports, "PronunciationAssessmentConfig", ({ enumerable: true, get: function () { return PronunciationAssessmentConfig_js_1.PronunciationAssessmentConfig; } }));
var PronunciationAssessmentResult_js_1 = __webpack_require__(175);
Object.defineProperty(exports, "PronunciationAssessmentResult", ({ enumerable: true, get: function () { return PronunciationAssessmentResult_js_1.PronunciationAssessmentResult; } }));
var LanguageIdMode_js_1 = __webpack_require__(145);
Object.defineProperty(exports, "LanguageIdMode", ({ enumerable: true, get: function () { return LanguageIdMode_js_1.LanguageIdMode; } }));
var AvatarConfig_js_1 = __webpack_require__(176);
Object.defineProperty(exports, "AvatarConfig", ({ enumerable: true, get: function () { return AvatarConfig_js_1.AvatarConfig; } }));
var AvatarEventArgs_js_1 = __webpack_require__(177);
Object.defineProperty(exports, "AvatarEventArgs", ({ enumerable: true, get: function () { return AvatarEventArgs_js_1.AvatarEventArgs; } }));
var AvatarSceneConfig_js_1 = __webpack_require__(178);
Object.defineProperty(exports, "AvatarSceneConfig", ({ enumerable: true, get: function () { return AvatarSceneConfig_js_1.AvatarSceneConfig; } }));
var AvatarSynthesizer_js_1 = __webpack_require__(179);
Object.defineProperty(exports, "AvatarSynthesizer", ({ enumerable: true, get: function () { return AvatarSynthesizer_js_1.AvatarSynthesizer; } }));
var AvatarVideoFormat_js_1 = __webpack_require__(181);
Object.defineProperty(exports, "AvatarVideoFormat", ({ enumerable: true, get: function () { return AvatarVideoFormat_js_1.AvatarVideoFormat; } }));
Object.defineProperty(exports, "Coordinate", ({ enumerable: true, get: function () { return AvatarVideoFormat_js_1.Coordinate; } }));
var AvatarWebRTCConnectionResult_js_1 = __webpack_require__(182);
Object.defineProperty(exports, "AvatarWebRTCConnectionResult", ({ enumerable: true, get: function () { return AvatarWebRTCConnectionResult_js_1.AvatarWebRTCConnectionResult; } }));
var Diagnostics_js_1 = __webpack_require__(183);
Object.defineProperty(exports, "Diagnostics", ({ enumerable: true, get: function () { return Diagnostics_js_1.Diagnostics; } }));
var LogLevel_js_1 = __webpack_require__(69);
Object.defineProperty(exports, "LogLevel", ({ enumerable: true, get: function () { return LogLevel_js_1.LogLevel; } }));



/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AudioOutputConfigImpl = exports.AudioConfigImpl = exports.AudioConfig = void 0;
const Exports_js_1 = __webpack_require__(66);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_2 = __webpack_require__(85);
const AudioFileWriter_js_1 = __webpack_require__(87);
const AudioInputStream_js_1 = __webpack_require__(89);
const AudioOutputStream_js_1 = __webpack_require__(90);
/**
 * Represents audio input configuration used for specifying what type of input to use (microphone, file, stream).
 * @class AudioConfig
 * Updated in version 1.11.0
 */
class AudioConfig {
    /**
     * Creates an AudioConfig object representing the default microphone on the system.
     * @member AudioConfig.fromDefaultMicrophoneInput
     * @function
     * @public
     * @returns {AudioConfig} The audio input configuration being created.
     */
    static fromDefaultMicrophoneInput() {
        const pcmRecorder = new Exports_js_1.PcmRecorder(true);
        return new AudioConfigImpl(new Exports_js_1.MicAudioSource(pcmRecorder));
    }
    /**
     * Creates an AudioConfig object representing a microphone with the specified device ID.
     * @member AudioConfig.fromMicrophoneInput
     * @function
     * @public
     * @param {string | undefined} deviceId - Specifies the device ID of the microphone to be used.
     * Default microphone is used the value is omitted.
     * @returns {AudioConfig} The audio input configuration being created.
     */
    static fromMicrophoneInput(deviceId) {
        const pcmRecorder = new Exports_js_1.PcmRecorder(true);
        return new AudioConfigImpl(new Exports_js_1.MicAudioSource(pcmRecorder, deviceId));
    }
    /**
     * Creates an AudioConfig object representing the specified file.
     * @member AudioConfig.fromWavFileInput
     * @function
     * @public
     * @param {File} fileName - Specifies the audio input file. Currently, only WAV / PCM is supported.
     * @returns {AudioConfig} The audio input configuration being created.
     */
    static fromWavFileInput(file, name = "unnamedBuffer.wav") {
        return new AudioConfigImpl(new Exports_js_1.FileAudioSource(file, name));
    }
    /**
     * Creates an AudioConfig object representing the specified stream.
     * @member AudioConfig.fromStreamInput
     * @function
     * @public
     * @param {AudioInputStream | PullAudioInputStreamCallback | MediaStream} audioStream - Specifies the custom audio input
     * stream. Currently, only WAV / PCM is supported.
     * @returns {AudioConfig} The audio input configuration being created.
     */
    static fromStreamInput(audioStream) {
        if (audioStream instanceof Exports_js_2.PullAudioInputStreamCallback) {
            return new AudioConfigImpl(new AudioInputStream_js_1.PullAudioInputStreamImpl(audioStream));
        }
        if (audioStream instanceof Exports_js_2.AudioInputStream) {
            return new AudioConfigImpl(audioStream);
        }
        if (typeof MediaStream !== "undefined" && audioStream instanceof MediaStream) {
            const pcmRecorder = new Exports_js_1.PcmRecorder(false);
            return new AudioConfigImpl(new Exports_js_1.MicAudioSource(pcmRecorder, null, null, audioStream));
        }
        throw new Error("Not Supported Type");
    }
    /**
     * Creates an AudioConfig object representing the default speaker.
     * @member AudioConfig.fromDefaultSpeakerOutput
     * @function
     * @public
     * @returns {AudioConfig} The audio output configuration being created.
     * Added in version 1.11.0
     */
    static fromDefaultSpeakerOutput() {
        return new AudioOutputConfigImpl(new Exports_js_2.SpeakerAudioDestination());
    }
    /**
     * Creates an AudioConfig object representing the custom IPlayer object.
     * You can use the IPlayer object to control pause, resume, etc.
     * @member AudioConfig.fromSpeakerOutput
     * @function
     * @public
     * @param {IPlayer} player - the IPlayer object for playback.
     * @returns {AudioConfig} The audio output configuration being created.
     * Added in version 1.12.0
     */
    static fromSpeakerOutput(player) {
        if (player === undefined) {
            return AudioConfig.fromDefaultSpeakerOutput();
        }
        if (player instanceof Exports_js_2.SpeakerAudioDestination) {
            return new AudioOutputConfigImpl(player);
        }
        throw new Error("Not Supported Type");
    }
    /**
     * Creates an AudioConfig object representing a specified output audio file
     * @member AudioConfig.fromAudioFileOutput
     * @function
     * @public
     * @param {PathLike} filename - the filename of the output audio file
     * @returns {AudioConfig} The audio output configuration being created.
     * Added in version 1.11.0
     */
    static fromAudioFileOutput(filename) {
        return new AudioOutputConfigImpl(new AudioFileWriter_js_1.AudioFileWriter(filename));
    }
    /**
     * Creates an AudioConfig object representing a specified audio output stream
     * @member AudioConfig.fromStreamOutput
     * @function
     * @public
     * @param {AudioOutputStream | PushAudioOutputStreamCallback} audioStream - Specifies the custom audio output
     * stream.
     * @returns {AudioConfig} The audio output configuration being created.
     * Added in version 1.11.0
     */
    static fromStreamOutput(audioStream) {
        if (audioStream instanceof Exports_js_2.PushAudioOutputStreamCallback) {
            return new AudioOutputConfigImpl(new AudioOutputStream_js_1.PushAudioOutputStreamImpl(audioStream));
        }
        if (audioStream instanceof Exports_js_2.PushAudioOutputStream) {
            return new AudioOutputConfigImpl(audioStream);
        }
        if (audioStream instanceof Exports_js_2.PullAudioOutputStream) {
            return new AudioOutputConfigImpl(audioStream);
        }
        throw new Error("Not Supported Type");
    }
}
exports.AudioConfig = AudioConfig;
/**
 * Represents audio input stream used for custom audio input configurations.
 * @private
 * @class AudioConfigImpl
 */
class AudioConfigImpl extends AudioConfig {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {IAudioSource} source - An audio source.
     */
    constructor(source) {
        super();
        this.privSource = source;
    }
    /**
     * Format information for the audio
     */
    get format() {
        return this.privSource.format;
    }
    /**
     * @member AudioConfigImpl.prototype.close
     * @function
     * @public
     */
    close(cb, err) {
        this.privSource.turnOff().then(() => {
            if (!!cb) {
                cb();
            }
        }, (error) => {
            if (!!err) {
                err(error);
            }
        });
    }
    /**
     * @member AudioConfigImpl.prototype.id
     * @function
     * @public
     */
    id() {
        return this.privSource.id();
    }
    /**
     * @member AudioConfigImpl.prototype.turnOn
     * @function
     * @public
     * @returns {Promise<void>} A promise.
     */
    turnOn() {
        return this.privSource.turnOn();
    }
    /**
     * @member AudioConfigImpl.prototype.attach
     * @function
     * @public
     * @param {string} audioNodeId - The audio node id.
     * @returns {Promise<IAudioStreamNode>} A promise.
     */
    attach(audioNodeId) {
        return this.privSource.attach(audioNodeId);
    }
    /**
     * @member AudioConfigImpl.prototype.detach
     * @function
     * @public
     * @param {string} audioNodeId - The audio node id.
     */
    detach(audioNodeId) {
        return this.privSource.detach(audioNodeId);
    }
    /**
     * @member AudioConfigImpl.prototype.turnOff
     * @function
     * @public
     * @returns {Promise<void>} A promise.
     */
    turnOff() {
        return this.privSource.turnOff();
    }
    /**
     * @member AudioConfigImpl.prototype.events
     * @function
     * @public
     * @returns {EventSource<AudioSourceEvent>} An event source for audio events.
     */
    get events() {
        return this.privSource.events;
    }
    setProperty(name, value) {
        Contracts_js_1.Contracts.throwIfNull(value, "value");
        if (undefined !== this.privSource.setProperty) {
            this.privSource.setProperty(name, value);
        }
        else {
            throw new Error("This AudioConfig instance does not support setting properties.");
        }
    }
    getProperty(name, def) {
        if (undefined !== this.privSource.getProperty) {
            return this.privSource.getProperty(name, def);
        }
        else {
            throw new Error("This AudioConfig instance does not support getting properties.");
        }
        // removed by dead control flow

    }
    get deviceInfo() {
        return this.privSource.deviceInfo;
    }
}
exports.AudioConfigImpl = AudioConfigImpl;
class AudioOutputConfigImpl extends AudioConfig {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {IAudioDestination} destination - An audio destination.
     */
    constructor(destination) {
        super();
        this.privDestination = destination;
    }
    set format(format) {
        this.privDestination.format = format;
    }
    write(buffer) {
        this.privDestination.write(buffer);
    }
    close() {
        this.privDestination.close();
    }
    id() {
        return this.privDestination.id();
    }
    setProperty() {
        throw new Error("This AudioConfig instance does not support setting properties.");
    }
    getProperty() {
        throw new Error("This AudioConfig instance does not support getting properties.");
    }
}
exports.AudioOutputConfigImpl = AudioOutputConfigImpl;



/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AudioFileWriter = void 0;
const fs = __importStar(__webpack_require__(88));
const Contracts_js_1 = __webpack_require__(70);
class AudioFileWriter {
    constructor(filename) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(fs.openSync, "\nFile System access not available, please use Push or PullAudioOutputStream");
        this.privFd = fs.openSync(filename, "w");
    }
    set format(format) {
        Contracts_js_1.Contracts.throwIfNotUndefined(this.privAudioFormat, "format is already set");
        this.privAudioFormat = format;
        let headerOffset = 0;
        if (this.privAudioFormat.hasHeader) {
            headerOffset = this.privAudioFormat.header.byteLength;
        }
        if (this.privFd !== undefined) {
            this.privWriteStream = fs.createWriteStream("", { fd: this.privFd, start: headerOffset, autoClose: false });
        }
    }
    write(buffer) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(this.privAudioFormat, "must set format before writing.");
        if (this.privWriteStream !== undefined) {
            this.privWriteStream.write(new Uint8Array(buffer.slice(0)));
        }
    }
    close() {
        if (this.privFd !== undefined) {
            this.privWriteStream.on("finish", () => {
                if (this.privAudioFormat.hasHeader) {
                    this.privAudioFormat.updateHeader(this.privWriteStream.bytesWritten);
                    fs.writeSync(this.privFd, new Int8Array(this.privAudioFormat.header), 0, this.privAudioFormat.header.byteLength, 0);
                }
                fs.closeSync(this.privFd);
                this.privFd = undefined;
            });
            this.privWriteStream.end();
        }
    }
    id() {
        return this.privId;
    }
}
exports.AudioFileWriter = AudioFileWriter;



/***/ }),
/* 88 */
/***/ (() => {

/* (ignored) */

/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PullAudioInputStreamImpl = exports.PullAudioInputStream = exports.PushAudioInputStreamImpl = exports.PushAudioInputStream = exports.AudioInputStream = void 0;
/* eslint-disable max-classes-per-file */
const Exports_js_1 = __webpack_require__(2);
const Exports_js_2 = __webpack_require__(4);
const Guid_js_1 = __webpack_require__(7);
const Exports_js_3 = __webpack_require__(85);
const AudioStreamFormat_js_1 = __webpack_require__(73);
/**
 * Represents audio input stream used for custom audio input configurations.
 * @class AudioInputStream
 */
class AudioInputStream {
    /**
     * Creates and initializes an instance.
     * @constructor
     */
    constructor() {
        return;
    }
    /**
     * Creates a memory backed PushAudioInputStream with the specified audio format.
     * @member AudioInputStream.createPushStream
     * @function
     * @public
     * @param {AudioStreamFormat} format - The audio data format in which audio will be
     * written to the push audio stream's write() method (Required if format is not 16 kHz 16bit mono PCM).
     * @returns {PushAudioInputStream} The audio input stream being created.
     */
    static createPushStream(format) {
        return PushAudioInputStream.create(format);
    }
    /**
     * Creates a PullAudioInputStream that delegates to the specified callback interface for read()
     * and close() methods.
     * @member AudioInputStream.createPullStream
     * @function
     * @public
     * @param {PullAudioInputStreamCallback} callback - The custom audio input object, derived from
     * PullAudioInputStreamCallback
     * @param {AudioStreamFormat} format - The audio data format in which audio will be returned from
     * the callback's read() method (Required if format is not 16 kHz 16bit mono PCM).
     * @returns {PullAudioInputStream} The audio input stream being created.
     */
    static createPullStream(callback, format) {
        return PullAudioInputStream.create(callback, format);
        // throw new Error("Oops");
    }
}
exports.AudioInputStream = AudioInputStream;
/**
 * Represents memory backed push audio input stream used for custom audio input configurations.
 * @class PushAudioInputStream
 */
class PushAudioInputStream extends AudioInputStream {
    /**
     * Creates a memory backed PushAudioInputStream with the specified audio format.
     * @member PushAudioInputStream.create
     * @function
     * @public
     * @param {AudioStreamFormat} format - The audio data format in which audio will be written to the
     * push audio stream's write() method (Required if format is not 16 kHz 16bit mono PCM).
     * @returns {PushAudioInputStream} The push audio input stream being created.
     */
    static create(format) {
        return new PushAudioInputStreamImpl(format);
    }
}
exports.PushAudioInputStream = PushAudioInputStream;
/**
 * Represents memory backed push audio input stream used for custom audio input configurations.
 * @private
 * @class PushAudioInputStreamImpl
 */
class PushAudioInputStreamImpl extends PushAudioInputStream {
    /**
     * Creates and initalizes an instance with the given values.
     * @constructor
     * @param {AudioStreamFormat} format - The audio stream format.
     */
    constructor(format) {
        super();
        if (format === undefined) {
            this.privFormat = AudioStreamFormat_js_1.AudioStreamFormatImpl.getDefaultInputFormat();
        }
        else {
            this.privFormat = format;
        }
        this.privEvents = new Exports_js_2.EventSource();
        this.privId = (0, Guid_js_1.createNoDashGuid)();
        this.privStream = new Exports_js_2.ChunkedArrayBufferStream(this.privFormat.avgBytesPerSec / 10);
    }
    /**
     * Format information for the audio
     */
    get format() {
        return Promise.resolve(this.privFormat);
    }
    /**
     * Writes the audio data specified by making an internal copy of the data.
     * @member PushAudioInputStreamImpl.prototype.write
     * @function
     * @public
     * @param {ArrayBuffer} dataBuffer - The audio buffer of which this function will make a copy.
     */
    write(dataBuffer) {
        this.privStream.writeStreamChunk({
            buffer: dataBuffer,
            isEnd: false,
            timeReceived: Date.now()
        });
    }
    /**
     * Closes the stream.
     * @member PushAudioInputStreamImpl.prototype.close
     * @function
     * @public
     */
    close() {
        this.privStream.close();
    }
    id() {
        return this.privId;
    }
    turnOn() {
        this.onEvent(new Exports_js_2.AudioSourceInitializingEvent(this.privId)); // no stream id
        this.onEvent(new Exports_js_2.AudioSourceReadyEvent(this.privId));
        return;
    }
    async attach(audioNodeId) {
        this.onEvent(new Exports_js_2.AudioStreamNodeAttachingEvent(this.privId, audioNodeId));
        await this.turnOn();
        const stream = this.privStream;
        this.onEvent(new Exports_js_2.AudioStreamNodeAttachedEvent(this.privId, audioNodeId));
        return {
            detach: async () => {
                this.onEvent(new Exports_js_2.AudioStreamNodeDetachedEvent(this.privId, audioNodeId));
                return this.turnOff();
            },
            id: () => audioNodeId,
            read: () => stream.read(),
        };
    }
    detach(audioNodeId) {
        this.onEvent(new Exports_js_2.AudioStreamNodeDetachedEvent(this.privId, audioNodeId));
    }
    turnOff() {
        return;
    }
    get events() {
        return this.privEvents;
    }
    get deviceInfo() {
        return Promise.resolve({
            bitspersample: this.privFormat.bitsPerSample,
            channelcount: this.privFormat.channels,
            connectivity: Exports_js_1.connectivity.Unknown,
            manufacturer: "Speech SDK",
            model: "PushStream",
            samplerate: this.privFormat.samplesPerSec,
            type: Exports_js_1.type.Stream,
        });
    }
    onEvent(event) {
        this.privEvents.onEvent(event);
        Exports_js_2.Events.instance.onEvent(event);
    }
    toBuffer(arrayBuffer) {
        const buf = Buffer.alloc(arrayBuffer.byteLength);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < buf.length; ++i) {
            buf[i] = view[i];
        }
        return buf;
    }
}
exports.PushAudioInputStreamImpl = PushAudioInputStreamImpl;
/*
 * Represents audio input stream used for custom audio input configurations.
 * @class PullAudioInputStream
 */
class PullAudioInputStream extends AudioInputStream {
    /**
     * Creates and initializes and instance.
     * @constructor
     */
    constructor() {
        super();
    }
    /**
     * Creates a PullAudioInputStream that delegates to the specified callback interface for
     * read() and close() methods, using the default format (16 kHz 16bit mono PCM).
     * @member PullAudioInputStream.create
     * @function
     * @public
     * @param {PullAudioInputStreamCallback} callback - The custom audio input object,
     * derived from PullAudioInputStreamCustomCallback
     * @param {AudioStreamFormat} format - The audio data format in which audio will be
     * returned from the callback's read() method (Required if format is not 16 kHz 16bit mono PCM).
     * @returns {PullAudioInputStream} The push audio input stream being created.
     */
    static create(callback, format) {
        return new PullAudioInputStreamImpl(callback, format);
    }
}
exports.PullAudioInputStream = PullAudioInputStream;
/**
 * Represents audio input stream used for custom audio input configurations.
 * @private
 * @class PullAudioInputStreamImpl
 */
class PullAudioInputStreamImpl extends PullAudioInputStream {
    /**
     * Creates a PullAudioInputStream that delegates to the specified callback interface for
     * read() and close() methods, using the default format (16 kHz 16bit mono PCM).
     * @constructor
     * @param {PullAudioInputStreamCallback} callback - The custom audio input object,
     * derived from PullAudioInputStreamCustomCallback
     * @param {AudioStreamFormat} format - The audio data format in which audio will be
     * returned from the callback's read() method (Required if format is not 16 kHz 16bit mono PCM).
     */
    constructor(callback, format) {
        super();
        if (undefined === format) {
            this.privFormat = Exports_js_3.AudioStreamFormat.getDefaultInputFormat();
        }
        else {
            this.privFormat = format;
        }
        this.privEvents = new Exports_js_2.EventSource();
        this.privId = (0, Guid_js_1.createNoDashGuid)();
        this.privCallback = callback;
        this.privIsClosed = false;
        this.privBufferSize = this.privFormat.avgBytesPerSec / 10;
    }
    /**
     * Format information for the audio
     */
    get format() {
        return Promise.resolve(this.privFormat);
    }
    /**
     * Closes the stream.
     * @member PullAudioInputStreamImpl.prototype.close
     * @function
     * @public
     */
    close() {
        this.privIsClosed = true;
        this.privCallback.close();
    }
    id() {
        return this.privId;
    }
    turnOn() {
        this.onEvent(new Exports_js_2.AudioSourceInitializingEvent(this.privId)); // no stream id
        this.onEvent(new Exports_js_2.AudioSourceReadyEvent(this.privId));
        return;
    }
    async attach(audioNodeId) {
        this.onEvent(new Exports_js_2.AudioStreamNodeAttachingEvent(this.privId, audioNodeId));
        await this.turnOn();
        this.onEvent(new Exports_js_2.AudioStreamNodeAttachedEvent(this.privId, audioNodeId));
        return {
            detach: () => {
                this.privCallback.close();
                this.onEvent(new Exports_js_2.AudioStreamNodeDetachedEvent(this.privId, audioNodeId));
                return this.turnOff();
            },
            id: () => audioNodeId,
            read: () => {
                let totalBytes = 0;
                let transmitBuff;
                // Until we have the minimum number of bytes to send in a transmission, keep asking for more.
                while (totalBytes < this.privBufferSize) {
                    // Sizing the read buffer to the delta between the perfect size and what's left means we won't ever get too much
                    // data back.
                    const readBuff = new ArrayBuffer(this.privBufferSize - totalBytes);
                    const pulledBytes = this.privCallback.read(readBuff);
                    // If there is no return buffer yet defined, set the return buffer to the that was just populated.
                    // This was, if we have enough data there's no copy penalty, but if we don't we have a buffer that's the
                    // preferred size allocated.
                    if (undefined === transmitBuff) {
                        transmitBuff = readBuff;
                    }
                    else {
                        // Not the first bite at the apple, so fill the return buffer with the data we got back.
                        const intView = new Int8Array(transmitBuff);
                        intView.set(new Int8Array(readBuff), totalBytes);
                    }
                    // If there are no bytes to read, just break out and be done.
                    if (0 === pulledBytes) {
                        break;
                    }
                    totalBytes += pulledBytes;
                }
                return Promise.resolve({
                    buffer: transmitBuff.slice(0, totalBytes),
                    isEnd: this.privIsClosed || totalBytes === 0,
                    timeReceived: Date.now(),
                });
            },
        };
    }
    detach(audioNodeId) {
        this.onEvent(new Exports_js_2.AudioStreamNodeDetachedEvent(this.privId, audioNodeId));
    }
    turnOff() {
        return;
    }
    get events() {
        return this.privEvents;
    }
    get deviceInfo() {
        return Promise.resolve({
            bitspersample: this.privFormat.bitsPerSample,
            channelcount: this.privFormat.channels,
            connectivity: Exports_js_1.connectivity.Unknown,
            manufacturer: "Speech SDK",
            model: "PullStream",
            samplerate: this.privFormat.samplesPerSec,
            type: Exports_js_1.type.Stream,
        });
    }
    onEvent(event) {
        this.privEvents.onEvent(event);
        Exports_js_2.Events.instance.onEvent(event);
    }
}
exports.PullAudioInputStreamImpl = PullAudioInputStreamImpl;



/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PushAudioOutputStreamImpl = exports.PushAudioOutputStream = exports.PullAudioOutputStreamImpl = exports.PullAudioOutputStream = exports.AudioOutputStream = void 0;
/* eslint-disable max-classes-per-file */
const Exports_js_1 = __webpack_require__(4);
const Contracts_js_1 = __webpack_require__(70);
const AudioOutputFormat_js_1 = __webpack_require__(91);
/**
 * Represents audio output stream used for custom audio output configurations.
 * @class AudioOutputStream
 */
class AudioOutputStream {
    /**
     * Creates and initializes an instance.
     * @constructor
     */
    constructor() {
        return;
    }
    /**
     * Creates a memory backed PullAudioOutputStream with the specified audio format.
     * @member AudioOutputStream.createPullStream
     * @function
     * @public
     * @returns {PullAudioOutputStream} The audio output stream being created.
     */
    static createPullStream() {
        return PullAudioOutputStream.create();
    }
}
exports.AudioOutputStream = AudioOutputStream;
/**
 * Represents memory backed push audio output stream used for custom audio output configurations.
 * @class PullAudioOutputStream
 */
class PullAudioOutputStream extends AudioOutputStream {
    /**
     * Creates a memory backed PullAudioOutputStream with the specified audio format.
     * @member PullAudioOutputStream.create
     * @function
     * @public
     * @returns {PullAudioOutputStream} The push audio output stream being created.
     */
    static create() {
        return new PullAudioOutputStreamImpl();
    }
}
exports.PullAudioOutputStream = PullAudioOutputStream;
/**
 * Represents memory backed push audio output stream used for custom audio output configurations.
 * @private
 * @class PullAudioOutputStreamImpl
 */
class PullAudioOutputStreamImpl extends PullAudioOutputStream {
    /**
     * Creates and initializes an instance with the given values.
     * @constructor
     */
    constructor() {
        super();
        this.privId = (0, Exports_js_1.createNoDashGuid)();
        this.privStream = new Exports_js_1.Stream();
    }
    /**
     * Sets the format information to the stream. For internal use only.
     * @param {AudioStreamFormat} format - the format to be set.
     */
    set format(format) {
        if (format === undefined || format === null) {
            this.privFormat = AudioOutputFormat_js_1.AudioOutputFormatImpl.getDefaultOutputFormat();
        }
        this.privFormat = format;
    }
    /**
     * Format information for the audio
     */
    get format() {
        return this.privFormat;
    }
    /**
     * Checks if the stream is closed
     * @member PullAudioOutputStreamImpl.prototype.isClosed
     * @property
     * @public
     */
    get isClosed() {
        return this.privStream.isClosed;
    }
    /**
     * Gets the id of the stream
     * @member PullAudioOutputStreamImpl.prototype.id
     * @property
     * @public
     */
    id() {
        return this.privId;
    }
    /**
     * Reads audio data from the internal buffer.
     * @member PullAudioOutputStreamImpl.prototype.read
     * @function
     * @public
     * @param {ArrayBuffer} dataBuffer - An ArrayBuffer to store the read data.
     * @returns {Promise<number>} - Audio buffer length has been read.
     */
    async read(dataBuffer) {
        const intView = new Int8Array(dataBuffer);
        let totalBytes = 0;
        if (this.privLastChunkView !== undefined) {
            if (this.privLastChunkView.length > dataBuffer.byteLength) {
                intView.set(this.privLastChunkView.slice(0, dataBuffer.byteLength));
                this.privLastChunkView = this.privLastChunkView.slice(dataBuffer.byteLength);
                return Promise.resolve(dataBuffer.byteLength);
            }
            intView.set(this.privLastChunkView);
            totalBytes = this.privLastChunkView.length;
            this.privLastChunkView = undefined;
        }
        // Until we have the minimum number of bytes to send in a transmission, keep asking for more.
        while (totalBytes < dataBuffer.byteLength && !this.privStream.isReadEnded) {
            const chunk = await this.privStream.read();
            if (chunk !== undefined && !chunk.isEnd) {
                let tmpBuffer;
                if (chunk.buffer.byteLength > dataBuffer.byteLength - totalBytes) {
                    tmpBuffer = chunk.buffer.slice(0, dataBuffer.byteLength - totalBytes);
                    this.privLastChunkView = new Int8Array(chunk.buffer.slice(dataBuffer.byteLength - totalBytes));
                }
                else {
                    tmpBuffer = chunk.buffer;
                }
                intView.set(new Int8Array(tmpBuffer), totalBytes);
                totalBytes += tmpBuffer.byteLength;
            }
            else {
                this.privStream.readEnded();
            }
        }
        return totalBytes;
    }
    /**
     * Writes the audio data specified by making an internal copy of the data.
     * @member PullAudioOutputStreamImpl.prototype.write
     * @function
     * @public
     * @param {ArrayBuffer} dataBuffer - The audio buffer of which this function will make a copy.
     */
    write(dataBuffer) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(this.privStream, "must set format before writing");
        this.privStream.writeStreamChunk({
            buffer: dataBuffer,
            isEnd: false,
            timeReceived: Date.now()
        });
    }
    /**
     * Closes the stream.
     * @member PullAudioOutputStreamImpl.prototype.close
     * @function
     * @public
     */
    close() {
        this.privStream.close();
    }
}
exports.PullAudioOutputStreamImpl = PullAudioOutputStreamImpl;
/*
 * Represents audio output stream used for custom audio output configurations.
 * @class PushAudioOutputStream
 */
class PushAudioOutputStream extends AudioOutputStream {
    /**
     * Creates and initializes and instance.
     * @constructor
     */
    constructor() {
        super();
    }
    /**
     * Creates a PushAudioOutputStream that delegates to the specified callback interface for
     * write() and close() methods.
     * @member PushAudioOutputStream.create
     * @function
     * @public
     * @param {PushAudioOutputStreamCallback} callback - The custom audio output object,
     * derived from PushAudioOutputStreamCallback
     * @returns {PushAudioOutputStream} The push audio output stream being created.
     */
    static create(callback) {
        return new PushAudioOutputStreamImpl(callback);
    }
}
exports.PushAudioOutputStream = PushAudioOutputStream;
/**
 * Represents audio output stream used for custom audio output configurations.
 * @private
 * @class PushAudioOutputStreamImpl
 */
class PushAudioOutputStreamImpl extends PushAudioOutputStream {
    /**
     * Creates a PushAudioOutputStream that delegates to the specified callback interface for
     * read() and close() methods.
     * @constructor
     * @param {PushAudioOutputStreamCallback} callback - The custom audio output object,
     * derived from PushAudioOutputStreamCallback
     */
    constructor(callback) {
        super();
        this.privId = (0, Exports_js_1.createNoDashGuid)();
        this.privCallback = callback;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    set format(format) { }
    write(buffer) {
        if (!!this.privCallback.write) {
            this.privCallback.write(buffer);
        }
    }
    close() {
        if (!!this.privCallback.close) {
            this.privCallback.close();
        }
    }
    id() {
        return this.privId;
    }
}
exports.PushAudioOutputStreamImpl = PushAudioOutputStreamImpl;



/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AudioOutputFormatImpl = void 0;
const SpeechSynthesisOutputFormat_js_1 = __webpack_require__(92);
const AudioStreamFormat_js_1 = __webpack_require__(73);
/**
 * @private
 * @class AudioOutputFormatImpl
 * Updated in version 1.17.0
 */
// eslint-disable-next-line max-classes-per-file
class AudioOutputFormatImpl extends AudioStreamFormat_js_1.AudioStreamFormatImpl {
    /**
     * Creates an instance with the given values.
     * @constructor
     * @param formatTag
     * @param {number} channels - Number of channels.
     * @param {number} samplesPerSec - Samples per second.
     * @param {number} avgBytesPerSec - Average bytes per second.
     * @param {number} blockAlign - Block alignment.
     * @param {number} bitsPerSample - Bits per sample.
     * @param {string} audioFormatString - Audio format string
     * @param {string} requestAudioFormatString - Audio format string sent to service.
     * @param {boolean} hasHeader - If the format has header or not.
     */
    constructor(formatTag, channels, samplesPerSec, avgBytesPerSec, blockAlign, bitsPerSample, audioFormatString, requestAudioFormatString, hasHeader) {
        super(samplesPerSec, bitsPerSample, channels, formatTag);
        this.formatTag = formatTag;
        this.avgBytesPerSec = avgBytesPerSec;
        this.blockAlign = blockAlign;
        this.priAudioFormatString = audioFormatString;
        this.priRequestAudioFormatString = requestAudioFormatString;
        this.priHasHeader = hasHeader;
    }
    static fromSpeechSynthesisOutputFormat(speechSynthesisOutputFormat) {
        if (speechSynthesisOutputFormat === undefined) {
            return AudioOutputFormatImpl.getDefaultOutputFormat();
        }
        return AudioOutputFormatImpl.fromSpeechSynthesisOutputFormatString(AudioOutputFormatImpl.SpeechSynthesisOutputFormatToString[speechSynthesisOutputFormat]);
    }
    static fromSpeechSynthesisOutputFormatString(speechSynthesisOutputFormatString) {
        switch (speechSynthesisOutputFormatString) {
            case "raw-8khz-8bit-mono-mulaw":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.MuLaw, 1, 8000, 8000, 1, 8, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "riff-16khz-16kbps-mono-siren":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.Siren, 1, 16000, 2000, 40, 0, speechSynthesisOutputFormatString, "audio-16khz-16kbps-mono-siren", true);
            case "audio-16khz-16kbps-mono-siren":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.Siren, 1, 16000, 2000, 40, 0, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "audio-16khz-32kbitrate-mono-mp3":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.MP3, 1, 16000, 32 << 7, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "audio-16khz-128kbitrate-mono-mp3":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.MP3, 1, 16000, 128 << 7, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "audio-16khz-64kbitrate-mono-mp3":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.MP3, 1, 16000, 64 << 7, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "audio-24khz-48kbitrate-mono-mp3":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.MP3, 1, 24000, 48 << 7, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "audio-24khz-96kbitrate-mono-mp3":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.MP3, 1, 24000, 96 << 7, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "audio-24khz-160kbitrate-mono-mp3":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.MP3, 1, 24000, 160 << 7, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "raw-16khz-16bit-mono-truesilk":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.SILKSkype, 1, 16000, 32000, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "riff-8khz-16bit-mono-pcm":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.PCM, 1, 8000, 16000, 2, 16, speechSynthesisOutputFormatString, "raw-8khz-16bit-mono-pcm", true);
            case "riff-24khz-16bit-mono-pcm":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.PCM, 1, 24000, 48000, 2, 16, speechSynthesisOutputFormatString, "raw-24khz-16bit-mono-pcm", true);
            case "riff-8khz-8bit-mono-mulaw":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.MuLaw, 1, 8000, 8000, 1, 8, speechSynthesisOutputFormatString, "raw-8khz-8bit-mono-mulaw", true);
            case "raw-16khz-16bit-mono-pcm":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.PCM, 1, 16000, 32000, 2, 16, speechSynthesisOutputFormatString, "raw-16khz-16bit-mono-pcm", false);
            case "raw-24khz-16bit-mono-pcm":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.PCM, 1, 24000, 48000, 2, 16, speechSynthesisOutputFormatString, "raw-24khz-16bit-mono-pcm", false);
            case "raw-8khz-16bit-mono-pcm":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.PCM, 1, 8000, 16000, 2, 16, speechSynthesisOutputFormatString, "raw-8khz-16bit-mono-pcm", false);
            case "ogg-16khz-16bit-mono-opus":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.OGG_OPUS, 1, 16000, 8192, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "ogg-24khz-16bit-mono-opus":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.OGG_OPUS, 1, 24000, 8192, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "raw-48khz-16bit-mono-pcm":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.PCM, 1, 48000, 96000, 2, 16, speechSynthesisOutputFormatString, "raw-48khz-16bit-mono-pcm", false);
            case "riff-48khz-16bit-mono-pcm":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.PCM, 1, 48000, 96000, 2, 16, speechSynthesisOutputFormatString, "raw-48khz-16bit-mono-pcm", true);
            case "audio-48khz-96kbitrate-mono-mp3":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.MP3, 1, 48000, 96 << 7, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "audio-48khz-192kbitrate-mono-mp3":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.MP3, 1, 48000, 192 << 7, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "ogg-48khz-16bit-mono-opus":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.OGG_OPUS, 1, 48000, 12000, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "webm-16khz-16bit-mono-opus":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.WEBM_OPUS, 1, 16000, 4000, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "webm-24khz-16bit-mono-opus":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.WEBM_OPUS, 1, 24000, 6000, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "webm-24khz-16bit-24kbps-mono-opus":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.WEBM_OPUS, 1, 24000, 3000, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "audio-16khz-16bit-32kbps-mono-opus":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.OPUS, 1, 16000, 4000, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "audio-24khz-16bit-48kbps-mono-opus":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.OPUS, 1, 24000, 6000, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "audio-24khz-16bit-24kbps-mono-opus":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.OPUS, 1, 24000, 3000, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "audio-24khz-16bit-mono-flac":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.FLAC, 1, 24000, 24000, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "audio-48khz-16bit-mono-flac":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.FLAC, 1, 48000, 30000, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "raw-24khz-16bit-mono-truesilk":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.SILKSkype, 1, 24000, 48000, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "raw-8khz-8bit-mono-alaw":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.ALaw, 1, 8000, 8000, 1, 8, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "riff-8khz-8bit-mono-alaw":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.ALaw, 1, 8000, 8000, 1, 8, speechSynthesisOutputFormatString, "raw-8khz-8bit-mono-alaw", true);
            case "raw-22050hz-16bit-mono-pcm":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.PCM, 1, 22050, 44100, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "riff-22050hz-16bit-mono-pcm":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.PCM, 1, 22050, 44100, 2, 16, speechSynthesisOutputFormatString, "raw-22050hz-16bit-mono-pcm", true);
            case "raw-44100hz-16bit-mono-pcm":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.PCM, 1, 44100, 88200, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "riff-44100hz-16bit-mono-pcm":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.PCM, 1, 44100, 88200, 2, 16, speechSynthesisOutputFormatString, "raw-44100hz-16bit-mono-pcm", true);
            case "amr-wb-16000h":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.AMR_WB, 1, 16000, 3052, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "g722-16khz-64kbps":
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.G722, 1, 16000, 8000, 2, 16, speechSynthesisOutputFormatString, speechSynthesisOutputFormatString, false);
            case "riff-16khz-16bit-mono-pcm":
            default:
                return new AudioOutputFormatImpl(AudioStreamFormat_js_1.AudioFormatTag.PCM, 1, 16000, 32000, 2, 16, "riff-16khz-16bit-mono-pcm", "raw-16khz-16bit-mono-pcm", true);
        }
    }
    static getDefaultOutputFormat() {
        return AudioOutputFormatImpl.fromSpeechSynthesisOutputFormatString((typeof window !== "undefined") ? "audio-24khz-48kbitrate-mono-mp3" : "riff-16khz-16bit-mono-pcm");
    }
    /**
     * Specifies if this audio output format has a header
     * @boolean AudioOutputFormatImpl.prototype.hasHeader
     * @function
     * @public
     */
    get hasHeader() {
        return this.priHasHeader;
    }
    /**
     * Specifies the header of this format
     * @ArrayBuffer AudioOutputFormatImpl.prototype.header
     * @function
     * @public
     */
    get header() {
        if (this.hasHeader) {
            return this.privHeader;
        }
        return undefined;
    }
    /**
     * Updates the header based on the audio length
     * @member AudioOutputFormatImpl.updateHeader
     * @function
     * @public
     * @param {number} audioLength - the audio length
     */
    updateHeader(audioLength) {
        if (this.priHasHeader) {
            const view = new DataView(this.privHeader);
            view.setUint32(4, audioLength + this.privHeader.byteLength - 8, true);
            view.setUint32(40, audioLength, true);
        }
    }
    /**
     * Specifies the audio format string to be sent to the service
     * @string AudioOutputFormatImpl.prototype.requestAudioFormatString
     * @function
     * @public
     */
    get requestAudioFormatString() {
        return this.priRequestAudioFormatString;
    }
    /**
     * Adds audio header
     * @param audio the raw audio without header
     * @returns the audio with header if applicable
     */
    addHeader(audio) {
        if (!this.hasHeader) {
            return audio;
        }
        this.updateHeader(audio.byteLength);
        const tmp = new Uint8Array(audio.byteLength + this.header.byteLength);
        tmp.set(new Uint8Array(this.header), 0);
        tmp.set(new Uint8Array(audio), this.header.byteLength);
        return tmp.buffer;
    }
}
exports.AudioOutputFormatImpl = AudioOutputFormatImpl;
AudioOutputFormatImpl.SpeechSynthesisOutputFormatToString = {
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Raw8Khz8BitMonoMULaw]: "raw-8khz-8bit-mono-mulaw",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Riff16Khz16KbpsMonoSiren]: "riff-16khz-16kbps-mono-siren",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Audio16Khz16KbpsMonoSiren]: "audio-16khz-16kbps-mono-siren",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3]: "audio-16khz-32kbitrate-mono-mp3",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Audio16Khz128KBitRateMonoMp3]: "audio-16khz-128kbitrate-mono-mp3",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Audio16Khz64KBitRateMonoMp3]: "audio-16khz-64kbitrate-mono-mp3",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3]: "audio-24khz-48kbitrate-mono-mp3",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Audio24Khz96KBitRateMonoMp3]: "audio-24khz-96kbitrate-mono-mp3",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Audio24Khz160KBitRateMonoMp3]: "audio-24khz-160kbitrate-mono-mp3",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Raw16Khz16BitMonoTrueSilk]: "raw-16khz-16bit-mono-truesilk",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Riff16Khz16BitMonoPcm]: "riff-16khz-16bit-mono-pcm",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Riff8Khz16BitMonoPcm]: "riff-8khz-16bit-mono-pcm",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm]: "riff-24khz-16bit-mono-pcm",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Riff8Khz8BitMonoMULaw]: "riff-8khz-8bit-mono-mulaw",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Raw16Khz16BitMonoPcm]: "raw-16khz-16bit-mono-pcm",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Raw24Khz16BitMonoPcm]: "raw-24khz-16bit-mono-pcm",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Raw8Khz16BitMonoPcm]: "raw-8khz-16bit-mono-pcm",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Ogg16Khz16BitMonoOpus]: "ogg-16khz-16bit-mono-opus",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Ogg24Khz16BitMonoOpus]: "ogg-24khz-16bit-mono-opus",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Raw48Khz16BitMonoPcm]: "raw-48khz-16bit-mono-pcm",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Riff48Khz16BitMonoPcm]: "riff-48khz-16bit-mono-pcm",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Audio48Khz96KBitRateMonoMp3]: "audio-48khz-96kbitrate-mono-mp3",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Audio48Khz192KBitRateMonoMp3]: "audio-48khz-192kbitrate-mono-mp3",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Ogg48Khz16BitMonoOpus]: "ogg-48khz-16bit-mono-opus",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Webm16Khz16BitMonoOpus]: "webm-16khz-16bit-mono-opus",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Webm24Khz16BitMonoOpus]: "webm-24khz-16bit-mono-opus",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Webm24Khz16Bit24KbpsMonoOpus]: "webm-24khz-16bit-24kbps-mono-opus",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Raw24Khz16BitMonoTrueSilk]: "raw-24khz-16bit-mono-truesilk",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Raw8Khz8BitMonoALaw]: "raw-8khz-8bit-mono-alaw",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Riff8Khz8BitMonoALaw]: "riff-8khz-8bit-mono-alaw",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Audio16Khz16Bit32KbpsMonoOpus]: "audio-16khz-16bit-32kbps-mono-opus",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Audio24Khz16Bit48KbpsMonoOpus]: "audio-24khz-16bit-48kbps-mono-opus",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Audio24Khz16Bit24KbpsMonoOpus]: "audio-24khz-16bit-24kbps-mono-opus",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Raw22050Hz16BitMonoPcm]: "raw-22050hz-16bit-mono-pcm",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Riff22050Hz16BitMonoPcm]: "riff-22050hz-16bit-mono-pcm",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Raw44100Hz16BitMonoPcm]: "raw-44100hz-16bit-mono-pcm",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.Riff44100Hz16BitMonoPcm]: "riff-44100hz-16bit-mono-pcm",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.AmrWb16000Hz]: "amr-wb-16000hz",
    [SpeechSynthesisOutputFormat_js_1.SpeechSynthesisOutputFormat.G72216Khz64Kbps]: "g722-16khz-64kbps",
};



/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechSynthesisOutputFormat = void 0;
/**
 * Define speech synthesis audio output formats.
 * @enum SpeechSynthesisOutputFormat
 * Updated in version 1.17.0
 */
var SpeechSynthesisOutputFormat;
(function (SpeechSynthesisOutputFormat) {
    /**
     * raw-8khz-8bit-mono-mulaw
     * @member SpeechSynthesisOutputFormat.Raw8Khz8BitMonoMULaw,
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Raw8Khz8BitMonoMULaw"] = 0] = "Raw8Khz8BitMonoMULaw";
    /**
     * riff-16khz-16kbps-mono-siren
     * @note Unsupported by the service. Do not use this value.
     * @member SpeechSynthesisOutputFormat.Riff16Khz16KbpsMonoSiren
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Riff16Khz16KbpsMonoSiren"] = 1] = "Riff16Khz16KbpsMonoSiren";
    /**
     * audio-16khz-16kbps-mono-siren
     * @note Unsupported by the service. Do not use this value.
     * @member SpeechSynthesisOutputFormat.Audio16Khz16KbpsMonoSiren
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Audio16Khz16KbpsMonoSiren"] = 2] = "Audio16Khz16KbpsMonoSiren";
    /**
     * audio-16khz-32kbitrate-mono-mp3
     * @member SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Audio16Khz32KBitRateMonoMp3"] = 3] = "Audio16Khz32KBitRateMonoMp3";
    /**
     * audio-16khz-128kbitrate-mono-mp3
     * @member SpeechSynthesisOutputFormat.Audio16Khz128KBitRateMonoMp3
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Audio16Khz128KBitRateMonoMp3"] = 4] = "Audio16Khz128KBitRateMonoMp3";
    /**
     * audio-16khz-64kbitrate-mono-mp3
     * @member SpeechSynthesisOutputFormat.Audio16Khz64KBitRateMonoMp3
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Audio16Khz64KBitRateMonoMp3"] = 5] = "Audio16Khz64KBitRateMonoMp3";
    /**
     * audio-24khz-48kbitrate-mono-mp3
     * @member SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Audio24Khz48KBitRateMonoMp3"] = 6] = "Audio24Khz48KBitRateMonoMp3";
    /**
     * audio-24khz-96kbitrate-mono-mp3
     * @member SpeechSynthesisOutputFormat.Audio24Khz96KBitRateMonoMp3
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Audio24Khz96KBitRateMonoMp3"] = 7] = "Audio24Khz96KBitRateMonoMp3";
    /**
     * audio-24khz-160kbitrate-mono-mp3
     * @member SpeechSynthesisOutputFormat.Audio24Khz160KBitRateMonoMp3
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Audio24Khz160KBitRateMonoMp3"] = 8] = "Audio24Khz160KBitRateMonoMp3";
    /**
     * raw-16khz-16bit-mono-truesilk
     * @member SpeechSynthesisOutputFormat.Raw16Khz16BitMonoTrueSilk
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Raw16Khz16BitMonoTrueSilk"] = 9] = "Raw16Khz16BitMonoTrueSilk";
    /**
     * riff-16khz-16bit-mono-pcm
     * @member SpeechSynthesisOutputFormat.Riff16Khz16BitMonoPcm
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Riff16Khz16BitMonoPcm"] = 10] = "Riff16Khz16BitMonoPcm";
    /**
     * riff-8khz-16bit-mono-pcm
     * @member SpeechSynthesisOutputFormat.Riff8Khz16BitMonoPcm
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Riff8Khz16BitMonoPcm"] = 11] = "Riff8Khz16BitMonoPcm";
    /**
     * riff-24khz-16bit-mono-pcm
     * @member SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Riff24Khz16BitMonoPcm"] = 12] = "Riff24Khz16BitMonoPcm";
    /**
     * riff-8khz-8bit-mono-mulaw
     * @member SpeechSynthesisOutputFormat.Riff8Khz8BitMonoMULaw
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Riff8Khz8BitMonoMULaw"] = 13] = "Riff8Khz8BitMonoMULaw";
    /**
     * raw-16khz-16bit-mono-pcm
     * @member SpeechSynthesisOutputFormat.Raw16Khz16BitMonoPcm
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Raw16Khz16BitMonoPcm"] = 14] = "Raw16Khz16BitMonoPcm";
    /**
     * raw-24khz-16bit-mono-pcm
     * @member SpeechSynthesisOutputFormat.Raw24Khz16BitMonoPcm
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Raw24Khz16BitMonoPcm"] = 15] = "Raw24Khz16BitMonoPcm";
    /**
     * raw-8khz-16bit-mono-pcm
     * @member SpeechSynthesisOutputFormat.Raw8Khz16BitMonoPcm
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Raw8Khz16BitMonoPcm"] = 16] = "Raw8Khz16BitMonoPcm";
    /**
     * ogg-16khz-16bit-mono-opus
     * @member SpeechSynthesisOutputFormat.Ogg16Khz16BitMonoOpus
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Ogg16Khz16BitMonoOpus"] = 17] = "Ogg16Khz16BitMonoOpus";
    /**
     * ogg-24khz-16bit-mono-opus
     * @member SpeechSynthesisOutputFormat.Ogg24Khz16BitMonoOpus
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Ogg24Khz16BitMonoOpus"] = 18] = "Ogg24Khz16BitMonoOpus";
    /**
     * raw-48khz-16bit-mono-pcm
     * @member SpeechSynthesisOutputFormat.Raw48Khz16BitMonoPcm
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Raw48Khz16BitMonoPcm"] = 19] = "Raw48Khz16BitMonoPcm";
    /**
     * riff-48khz-16bit-mono-pcm
     * @member SpeechSynthesisOutputFormat.Riff48Khz16BitMonoPcm
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Riff48Khz16BitMonoPcm"] = 20] = "Riff48Khz16BitMonoPcm";
    /**
     * audio-48khz-96kbitrate-mono-mp3
     * @member SpeechSynthesisOutputFormat.Audio48Khz96KBitRateMonoMp3
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Audio48Khz96KBitRateMonoMp3"] = 21] = "Audio48Khz96KBitRateMonoMp3";
    /**
     * audio-48khz-192kbitrate-mono-mp3
     * @member SpeechSynthesisOutputFormat.Audio48Khz192KBitRateMonoMp3
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Audio48Khz192KBitRateMonoMp3"] = 22] = "Audio48Khz192KBitRateMonoMp3";
    /**
     * ogg-48khz-16bit-mono-opus
     * Added in version 1.16.0
     * @member SpeechSynthesisOutputFormat.Ogg48Khz16BitMonoOpus
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Ogg48Khz16BitMonoOpus"] = 23] = "Ogg48Khz16BitMonoOpus";
    /**
     * webm-16khz-16bit-mono-opus
     * Added in version 1.16.0
     * @member SpeechSynthesisOutputFormat.Webm16Khz16BitMonoOpus
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Webm16Khz16BitMonoOpus"] = 24] = "Webm16Khz16BitMonoOpus";
    /**
     * webm-24khz-16bit-mono-opus
     * Added in version 1.16.0
     * @member SpeechSynthesisOutputFormat.Webm24Khz16BitMonoOpus
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Webm24Khz16BitMonoOpus"] = 25] = "Webm24Khz16BitMonoOpus";
    /**
     * raw-24khz-16bit-mono-truesilk
     * Added in version 1.17.0
     * @member SpeechSynthesisOutputFormat.Raw24Khz16BitMonoTrueSilk
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Raw24Khz16BitMonoTrueSilk"] = 26] = "Raw24Khz16BitMonoTrueSilk";
    /**
     * raw-8khz-8bit-mono-alaw
     * Added in version 1.17.0
     * @member SpeechSynthesisOutputFormat.Raw8Khz8BitMonoALaw
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Raw8Khz8BitMonoALaw"] = 27] = "Raw8Khz8BitMonoALaw";
    /**
     * riff-8khz-8bit-mono-alaw
     * Added in version 1.17.0
     * @member SpeechSynthesisOutputFormat.Riff8Khz8BitMonoALaw
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Riff8Khz8BitMonoALaw"] = 28] = "Riff8Khz8BitMonoALaw";
    /**
     * webm-24khz-16bit-24kbps-mono-opus
     * Audio compressed by OPUS codec in a webm container, with bitrate of 24kbps, optimized for IoT scenario.
     * Added in version 1.19.0
     * @member SpeechSynthesisOutputFormat.Webm24Khz16Bit24KbpsMonoOpus
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Webm24Khz16Bit24KbpsMonoOpus"] = 29] = "Webm24Khz16Bit24KbpsMonoOpus";
    /**
     * audio-16khz-16bit-32kbps-mono-opus
     * Audio compressed by OPUS codec without container, with bitrate of 32kbps.
     * Added in version 1.20.0
     * @member SpeechSynthesisOutputFormat.Audio16Khz16Bit32KbpsMonoOpus
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Audio16Khz16Bit32KbpsMonoOpus"] = 30] = "Audio16Khz16Bit32KbpsMonoOpus";
    /**
     * audio-24khz-16bit-48kbps-mono-opus
     * Audio compressed by OPUS codec without container, with bitrate of 48kbps.
     * Added in version 1.20.0
     * @member SpeechSynthesisOutputFormat.Audio24Khz16Bit48KbpsMonoOpus
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Audio24Khz16Bit48KbpsMonoOpus"] = 31] = "Audio24Khz16Bit48KbpsMonoOpus";
    /**
     * audio-24khz-16bit-24kbps-mono-opus
     * Audio compressed by OPUS codec without container, with bitrate of 24kbps.
     * Added in version 1.20.0
     * @member SpeechSynthesisOutputFormat.Audio24Khz16Bit24KbpsMonoOpus
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Audio24Khz16Bit24KbpsMonoOpus"] = 32] = "Audio24Khz16Bit24KbpsMonoOpus";
    /**
     * raw-22050hz-16bit-mono-pcm
     * Raw PCM audio at 22050Hz sampling rate and 16-bit depth.
     * Added in version 1.22.0
     * @member SpeechSynthesisOutputFormat.Raw22050Hz16BitMonoPcm
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Raw22050Hz16BitMonoPcm"] = 33] = "Raw22050Hz16BitMonoPcm";
    /**
     * riff-22050hz-16bit-mono-pcm
     * PCM audio at 22050Hz sampling rate and 16-bit depth, with RIFF header.
     * Added in version 1.22.0
     * @member SpeechSynthesisOutputFormat.Riff22050Hz16BitMonoPcm
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Riff22050Hz16BitMonoPcm"] = 34] = "Riff22050Hz16BitMonoPcm";
    /**
     * raw-44100hz-16bit-mono-pcm
     * Raw PCM audio at 44100Hz sampling rate and 16-bit depth.
     * Added in version 1.22.0
     * @member SpeechSynthesisOutputFormat.Raw44100Hz16BitMonoPcm
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Raw44100Hz16BitMonoPcm"] = 35] = "Raw44100Hz16BitMonoPcm";
    /**
     * riff-44100hz-16bit-mono-pcm
     * PCM audio at 44100Hz sampling rate and 16-bit depth, with RIFF header.
     * Added in version 1.22.0
     * @member SpeechSynthesisOutputFormat.Riff44100Hz16BitMonoPcm
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["Riff44100Hz16BitMonoPcm"] = 36] = "Riff44100Hz16BitMonoPcm";
    /**
     * amr-wb-16000hz
     * AMR-WB audio at 16kHz sampling rate.
     * Added in version 1.38.0
     * @member SpeechSynthesisOutputFormat.AmrWb16000Hz
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["AmrWb16000Hz"] = 37] = "AmrWb16000Hz";
    /**
     * g722-16khz-64kbps
     * G.722 audio at 16kHz sampling rate and 64kbps bitrate.
     * Added in version 1.38.0
     */
    SpeechSynthesisOutputFormat[SpeechSynthesisOutputFormat["G72216Khz64Kbps"] = 38] = "G72216Khz64Kbps";
})(SpeechSynthesisOutputFormat = exports.SpeechSynthesisOutputFormat || (exports.SpeechSynthesisOutputFormat = {}));



/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CancellationReason = void 0;
/**
 * Defines the possible reasons a recognition result might be canceled.
 * @class CancellationReason
 */
var CancellationReason;
(function (CancellationReason) {
    /**
     * Indicates that an error occurred during speech recognition.
     * @member CancellationReason.Error
     */
    CancellationReason[CancellationReason["Error"] = 0] = "Error";
    /**
     * Indicates that the end of the audio stream was reached.
     * @member CancellationReason.EndOfStream
     */
    CancellationReason[CancellationReason["EndOfStream"] = 1] = "EndOfStream";
})(CancellationReason = exports.CancellationReason || (exports.CancellationReason = {}));



/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PullAudioInputStreamCallback = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/**
 * An abstract base class that defines callback methods (read() and close()) for
 * custom audio input streams).
 * @class PullAudioInputStreamCallback
 */
class PullAudioInputStreamCallback {
}
exports.PullAudioInputStreamCallback = PullAudioInputStreamCallback;



/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PushAudioOutputStreamCallback = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/**
 * An abstract base class that defines callback methods (write() and close()) for
 * custom audio output streams).
 * @class PushAudioOutputStreamCallback
 */
class PushAudioOutputStreamCallback {
}
exports.PushAudioOutputStreamCallback = PushAudioOutputStreamCallback;



/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeywordRecognitionModel = void 0;
const Contracts_js_1 = __webpack_require__(70);
/**
 * Represents a keyword recognition model for recognizing when
 * the user says a keyword to initiate further speech recognition.
 * @class KeywordRecognitionModel
 */
class KeywordRecognitionModel {
    /**
     * Create and initializes a new instance.
     * @constructor
     */
    constructor() {
        this.privDisposed = false;
        return;
    }
    /**
     * Creates a keyword recognition model using the specified filename.
     * @member KeywordRecognitionModel.fromFile
     * @function
     * @public
     * @param {string} fileName - A string that represents file name for the keyword recognition model.
     * Note, the file can point to a zip file in which case the model
     * will be extracted from the zip.
     * @returns {KeywordRecognitionModel} The keyword recognition model being created.
     */
    static fromFile(fileName) {
        Contracts_js_1.Contracts.throwIfFileDoesNotExist(fileName, "fileName");
        throw new Error("Not yet implemented.");
    }
    /**
     * Creates a keyword recognition model using the specified filename.
     * @member KeywordRecognitionModel.fromStream
     * @function
     * @public
     * @param {string} file - A File that represents file for the keyword recognition model.
     * Note, the file can point to a zip file in which case the model will be extracted from the zip.
     * @returns {KeywordRecognitionModel} The keyword recognition model being created.
     */
    static fromStream(file) {
        Contracts_js_1.Contracts.throwIfNull(file, "file");
        throw new Error("Not yet implemented.");
    }
    /**
     * Dispose of associated resources.
     * @member KeywordRecognitionModel.prototype.close
     * @function
     * @public
     */
    close() {
        if (this.privDisposed) {
            return;
        }
        this.privDisposed = true;
    }
}
exports.KeywordRecognitionModel = KeywordRecognitionModel;



/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionEventArgs = void 0;
/**
 * Defines content for session events like SessionStarted/Stopped, SoundStarted/Stopped.
 * @class SessionEventArgs
 */
class SessionEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} sessionId - The session id.
     */
    constructor(sessionId) {
        this.privSessionId = sessionId;
    }
    /**
     * Represents the session identifier.
     * @member SessionEventArgs.prototype.sessionId
     * @function
     * @public
     * @returns {string} Represents the session identifier.
     */
    get sessionId() {
        return this.privSessionId;
    }
}
exports.SessionEventArgs = SessionEventArgs;



/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RecognitionEventArgs = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Defines payload for session events like Speech Start/End Detected
 * @class
 */
class RecognitionEventArgs extends Exports_js_1.SessionEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {number} offset - The offset.
     * @param {string} sessionId - The session id.
     */
    constructor(offset, sessionId) {
        super(sessionId);
        this.privOffset = offset;
    }
    /**
     * Represents the message offset
     * @member RecognitionEventArgs.prototype.offset
     * @function
     * @public
     */
    get offset() {
        return this.privOffset;
    }
}
exports.RecognitionEventArgs = RecognitionEventArgs;



/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OutputFormat = void 0;
/**
 * Define Speech Recognizer output formats.
 * @class OutputFormat
 */
var OutputFormat;
(function (OutputFormat) {
    /**
     * @member OutputFormat.Simple
     */
    OutputFormat[OutputFormat["Simple"] = 0] = "Simple";
    /**
     * @member OutputFormat.Detailed
     */
    OutputFormat[OutputFormat["Detailed"] = 1] = "Detailed";
})(OutputFormat = exports.OutputFormat || (exports.OutputFormat = {}));



/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RecognitionResult = void 0;
/**
 * Defines result of speech recognition.
 * @class RecognitionResult
 */
class RecognitionResult {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} resultId - The result id.
     * @param {ResultReason} reason - The reason.
     * @param {string} text - The recognized text.
     * @param {number} duration - The duration.
     * @param {number} offset - The offset into the stream.
     * @param {string} language - Primary Language detected, if provided.
     * @param {string} languageDetectionConfidence - Primary Language confidence ("Unknown," "Low," "Medium," "High"...), if provided.
     * @param {string} errorDetails - Error details, if provided.
     * @param {string} json - Additional Json, if provided.
     * @param {PropertyCollection} properties - Additional properties, if provided.
     * @param {number} channel - The audio channel the result was recognized on. Defaults to 0 in non-multichannel scenarios.
     */
    constructor(resultId, reason, text, duration, offset, language, languageDetectionConfidence, errorDetails, json, properties, channel) {
        this.privResultId = resultId;
        this.privReason = reason;
        this.privText = text;
        this.privDuration = duration;
        this.privOffset = offset;
        this.privLanguage = language;
        this.privLanguageDetectionConfidence = languageDetectionConfidence;
        this.privErrorDetails = errorDetails;
        this.privJson = json;
        this.privProperties = properties;
        this.privChannel = channel === undefined ? 0 : channel;
    }
    /**
     * Specifies the result identifier.
     * @member RecognitionResult.prototype.resultId
     * @function
     * @public
     * @returns {string} Specifies the result identifier.
     */
    get resultId() {
        return this.privResultId;
    }
    /**
     * Specifies status of the result.
     * @member RecognitionResult.prototype.reason
     * @function
     * @public
     * @returns {ResultReason} Specifies status of the result.
     */
    get reason() {
        return this.privReason;
    }
    /**
     * Presents the recognized text in the result.
     * @member RecognitionResult.prototype.text
     * @function
     * @public
     * @returns {string} Presents the recognized text in the result.
     */
    get text() {
        return this.privText;
    }
    /**
     * Duration of recognized speech in 100 nano second increments.
     * @member RecognitionResult.prototype.duration
     * @function
     * @public
     * @returns {number} Duration of recognized speech in 100 nano second increments.
     */
    get duration() {
        return this.privDuration;
    }
    /**
     * Offset of recognized speech in 100 nano second increments.
     * @member RecognitionResult.prototype.offset
     * @function
     * @public
     * @returns {number} Offset of recognized speech in 100 nano second increments.
     */
    get offset() {
        return this.privOffset;
    }
    /**
     * Primary Language detected.
     * @member RecognitionResult.prototype.language
     * @function
     * @public
     * @returns {string} language detected.
     */
    get language() {
        return this.privLanguage;
    }
    /**
     * Primary Language detection confidence (Unknown, Low, Medium, High).
     * @member RecognitionResult.prototype.languageDetectionConfidence
     * @function
     * @public
     * @returns {string} detection confidence strength.
     */
    get languageDetectionConfidence() {
        return this.privLanguageDetectionConfidence;
    }
    /**
     * In case of an unsuccessful recognition, provides details of the occurred error.
     * @member RecognitionResult.prototype.errorDetails
     * @function
     * @public
     * @returns {string} a brief description of an error.
     */
    get errorDetails() {
        return this.privErrorDetails;
    }
    /**
     * A string containing Json serialized recognition result as it was received from the service.
     * @member RecognitionResult.prototype.json
     * @function
     * @private
     * @returns {string} Json serialized representation of the result.
     */
    get json() {
        return this.privJson;
    }
    /**
     * The set of properties exposed in the result.
     * @member RecognitionResult.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The set of properties exposed in the result.
     */
    get properties() {
        return this.privProperties;
    }
    /**
     * The audio channel the result was recognized on. In non-multichannel
     * scenarios this defaults to 0.
     * @member RecognitionResult.prototype.channel
     * @function
     * @public
     * @returns {number} The zero-based audio channel index of the result.
     */
    get channel() {
        return this.privChannel;
    }
}
exports.RecognitionResult = RecognitionResult;



/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechRecognitionResult = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Defines result of speech recognition.
 * @class SpeechRecognitionResult
 */
class SpeechRecognitionResult extends Exports_js_1.RecognitionResult {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @public
     * @param {string} resultId - The result id.
     * @param {ResultReason} reason - The reason.
     * @param {string} text - The recognized text.
     * @param {number} duration - The duration.
     * @param {number} offset - The offset into the stream.
     * @param {string} language - Primary Language detected, if provided.
     * @param {string} languageDetectionConfidence - Primary Language confidence ("Unknown," "Low," "Medium," "High"...), if provided.
     * @param {string} speakerId - speaker id for conversation transcription, if provided.
     * @param {string} errorDetails - Error details, if provided.
     * @param {string} json - Additional Json, if provided.
     * @param {PropertyCollection} properties - Additional properties, if provided.
     * @param {number} channel - The audio channel the result was recognized on. Defaults to 0 in non-multichannel scenarios.
     */
    constructor(resultId, reason, text, duration, offset, language, languageDetectionConfidence, speakerId, errorDetails, json, properties, channel) {
        super(resultId, reason, text, duration, offset, language, languageDetectionConfidence, errorDetails, json, properties, channel);
        this.privSpeakerId = speakerId;
    }
    /**
     * speaker id from conversation transcription/id scenarios
     * @member SpeechRecognitionResult.prototype.speakerId
     * @function
     * @public
     * @returns {string} id of speaker in given result
     */
    get speakerId() {
        return this.privSpeakerId;
    }
}
exports.SpeechRecognitionResult = SpeechRecognitionResult;



/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingTranscriptionEventArgs = exports.ConversationTranscriptionEventArgs = exports.SpeechRecognitionEventArgs = void 0;
/* eslint-disable max-classes-per-file */
const Exports_js_1 = __webpack_require__(85);
/**
 * Defines contents of speech recognizing/recognized event.
 * @class SpeechRecognitionEventArgs
 */
class SpeechRecognitionEventArgs extends Exports_js_1.RecognitionEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {SpeechRecognitionResult} result - The speech recognition result.
     * @param {number} offset - The offset.
     * @param {string} sessionId - The session id.
     */
    constructor(result, offset, sessionId) {
        super(offset, sessionId);
        this.privResult = result;
    }
    /**
     * Specifies the recognition result.
     * @member SpeechRecognitionEventArgs.prototype.result
     * @function
     * @public
     * @returns {SpeechRecognitionResult} the recognition result.
     */
    get result() {
        return this.privResult;
    }
}
exports.SpeechRecognitionEventArgs = SpeechRecognitionEventArgs;
/**
 * Defines contents of conversation transcribed/transcribing event.
 * @class ConversationTranscriptionEventArgs
 */
class ConversationTranscriptionEventArgs extends Exports_js_1.RecognitionEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {ConversationTranscriptionResult} result - The conversation transcription result.
     * @param {number} offset - The offset.
     * @param {string} sessionId - The session id.
     */
    constructor(result, offset, sessionId) {
        super(offset, sessionId);
        this.privResult = result;
    }
    /**
     * Specifies the transcription result.
     * @member ConversationTranscription1EventArgs.prototype.result
     * @function
     * @public
     * @returns {ConversationTranscriptionResult} the recognition result.
     */
    get result() {
        return this.privResult;
    }
}
exports.ConversationTranscriptionEventArgs = ConversationTranscriptionEventArgs;
/**
 * Defines contents of meeting transcribed/transcribing event.
 * @class MeetingTranscriptionEventArgs
 */
class MeetingTranscriptionEventArgs extends SpeechRecognitionEventArgs {
}
exports.MeetingTranscriptionEventArgs = MeetingTranscriptionEventArgs;



/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechRecognitionCanceledEventArgs = void 0;
const CancellationEventArgsBase_js_1 = __webpack_require__(104);
class SpeechRecognitionCanceledEventArgs extends CancellationEventArgsBase_js_1.CancellationEventArgsBase {
}
exports.SpeechRecognitionCanceledEventArgs = SpeechRecognitionCanceledEventArgs;



/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CancellationEventArgsBase = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Defines content of a CancellationEvent.
 * @class CancellationEventArgsBase
 */
class CancellationEventArgsBase extends Exports_js_1.RecognitionEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {CancellationReason} reason - The cancellation reason.
     * @param {string} errorDetails - Error details, if provided.
     * @param {number} offset - The offset.
     * @param {string} sessionId - The session id.
     */
    constructor(reason, errorDetails, errorCode, offset, sessionId) {
        super(offset, sessionId);
        this.privReason = reason;
        this.privErrorDetails = errorDetails;
        this.privErrorCode = errorCode;
    }
    /**
     * The reason the recognition was canceled.
     * @member CancellationEventArgsBase.prototype.reason
     * @function
     * @public
     * @returns {CancellationReason} Specifies the reason canceled.
     */
    get reason() {
        return this.privReason;
    }
    /**
     * The error code in case of an unsuccessful operation.
     * @return An error code that represents the error reason.
     */
    get errorCode() {
        return this.privErrorCode;
    }
    /**
     * In case of an unsuccessful operation, provides details of the occurred error.
     * @member CancellationEventArgsBase.prototype.errorDetails
     * @function
     * @public
     * @returns {string} A String that represents the error details.
     */
    get errorDetails() {
        return this.privErrorDetails;
    }
}
exports.CancellationEventArgsBase = CancellationEventArgsBase;



/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationRecognitionEventArgs = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Translation text result event arguments.
 * @class TranslationRecognitionEventArgs
 */
class TranslationRecognitionEventArgs extends Exports_js_1.RecognitionEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {TranslationRecognitionResult} result - The translation recognition result.
     * @param {number} offset - The offset.
     * @param {string} sessionId - The session id.
     */
    constructor(result, offset, sessionId) {
        super(offset, sessionId);
        this.privResult = result;
    }
    /**
     * Specifies the recognition result.
     * @member TranslationRecognitionEventArgs.prototype.result
     * @function
     * @public
     * @returns {TranslationRecognitionResult} the recognition result.
     */
    get result() {
        return this.privResult;
    }
}
exports.TranslationRecognitionEventArgs = TranslationRecognitionEventArgs;



/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationSynthesisEventArgs = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Translation Synthesis event arguments
 * @class TranslationSynthesisEventArgs
 */
class TranslationSynthesisEventArgs extends Exports_js_1.SessionEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {TranslationSynthesisResult} result - The translation synthesis result.
     * @param {string} sessionId - The session id.
     */
    constructor(result, sessionId) {
        super(sessionId);
        this.privResult = result;
    }
    /**
     * Specifies the translation synthesis result.
     * @member TranslationSynthesisEventArgs.prototype.result
     * @function
     * @public
     * @returns {TranslationSynthesisResult} Specifies the translation synthesis result.
     */
    get result() {
        return this.privResult;
    }
}
exports.TranslationSynthesisEventArgs = TranslationSynthesisEventArgs;



/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationRecognitionResult = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Translation text result.
 * @class TranslationRecognitionResult
 */
class TranslationRecognitionResult extends Exports_js_1.SpeechRecognitionResult {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {Translations} translations - The translations.
     * @param {string} resultId - The result id.
     * @param {ResultReason} reason - The reason.
     * @param {string} text - The recognized text.
     * @param {number} duration - The duration.
     * @param {number} offset - The offset into the stream.
     * @param {string} language - Primary Language detected, if provided.
     * @param {string} languageDetectionConfidence - Primary Language confidence ("Unknown," "Low," "Medium," "High"...), if provided.
     * @param {string} errorDetails - Error details, if provided.
     * @param {string} json - Additional Json, if provided.
     * @param {PropertyCollection} properties - Additional properties, if provided.
     */
    constructor(translations, resultId, reason, text, duration, offset, language, languageDetectionConfidence, errorDetails, json, properties) {
        super(resultId, reason, text, duration, offset, language, languageDetectionConfidence, undefined, errorDetails, json, properties);
        this.privTranslations = translations;
    }
    static fromSpeechRecognitionResult(result) {
        return new TranslationRecognitionResult(undefined, result.resultId, result.reason, result.text, result.duration, result.offset, result.language, result.languageDetectionConfidence, result.errorDetails, result.json, result.properties);
    }
    /**
     * Presents the translation results. Each item in the dictionary represents
     * a translation result in one of target languages, where the key is the name
     * of the target language, in BCP-47 format, and the value is the translation
     * text in the specified language.
     * @member TranslationRecognitionResult.prototype.translations
     * @function
     * @public
     * @returns {Translations} the current translation map that holds all translations requested.
     */
    get translations() {
        return this.privTranslations;
    }
}
exports.TranslationRecognitionResult = TranslationRecognitionResult;



/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationSynthesisResult = void 0;
/**
 * Defines translation synthesis result, i.e. the voice output of the translated
 * text in the target language.
 * @class TranslationSynthesisResult
 */
class TranslationSynthesisResult {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {ResultReason} reason - The synthesis reason.
     * @param {ArrayBuffer} audio - The audio data.
     */
    constructor(reason, audio) {
        this.privReason = reason;
        this.privAudio = audio;
    }
    /**
     * Translated text in the target language.
     * @member TranslationSynthesisResult.prototype.audio
     * @function
     * @public
     * @returns {ArrayBuffer} Translated audio in the target language.
     */
    get audio() {
        return this.privAudio;
    }
    /**
     * The synthesis status.
     * @member TranslationSynthesisResult.prototype.reason
     * @function
     * @public
     * @returns {ResultReason} The synthesis status.
     */
    get reason() {
        return this.privReason;
    }
}
exports.TranslationSynthesisResult = TranslationSynthesisResult;



/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResultReason = void 0;
/**
 * Defines the possible reasons a recognition result might be generated.
 * @class ResultReason
 */
var ResultReason;
(function (ResultReason) {
    /**
     * Indicates speech could not be recognized. More details
     * can be found in the NoMatchDetails object.
     * @member ResultReason.NoMatch
     */
    ResultReason[ResultReason["NoMatch"] = 0] = "NoMatch";
    /**
     * Indicates that the recognition was canceled. More details
     * can be found using the CancellationDetails object.
     * @member ResultReason.Canceled
     */
    ResultReason[ResultReason["Canceled"] = 1] = "Canceled";
    /**
     * Indicates the speech result contains hypothesis text.
     * @member ResultReason.RecognizedSpeech
     */
    ResultReason[ResultReason["RecognizingSpeech"] = 2] = "RecognizingSpeech";
    /**
     * Indicates the speech result contains final text that has been recognized.
     * Speech Recognition is now complete for this phrase.
     * @member ResultReason.RecognizedSpeech
     */
    ResultReason[ResultReason["RecognizedSpeech"] = 3] = "RecognizedSpeech";
    /**
     * Indicates the speech result contains a finalized acceptance of a provided keyword.
     * Speech recognition will continue unless otherwise configured.
     * @member ResultReason.RecognizedKeyword
     */
    ResultReason[ResultReason["RecognizedKeyword"] = 4] = "RecognizedKeyword";
    /**
     * Indicates the translation result contains hypothesis text and its translation(s).
     * @member ResultReason.TranslatingSpeech
     */
    ResultReason[ResultReason["TranslatingSpeech"] = 5] = "TranslatingSpeech";
    /**
     * Indicates the translation result contains final text and corresponding translation(s).
     * Speech Recognition and Translation are now complete for this phrase.
     * @member ResultReason.TranslatedSpeech
     */
    ResultReason[ResultReason["TranslatedSpeech"] = 6] = "TranslatedSpeech";
    /**
     * Indicates the synthesized audio result contains a non-zero amount of audio data
     * @member ResultReason.SynthesizingAudio
     */
    ResultReason[ResultReason["SynthesizingAudio"] = 7] = "SynthesizingAudio";
    /**
     * Indicates the synthesized audio is now complete for this phrase.
     * @member ResultReason.SynthesizingAudioCompleted
     */
    ResultReason[ResultReason["SynthesizingAudioCompleted"] = 8] = "SynthesizingAudioCompleted";
    /**
     * Indicates the speech synthesis is now started
     * @member ResultReason.SynthesizingAudioStarted
     */
    ResultReason[ResultReason["SynthesizingAudioStarted"] = 9] = "SynthesizingAudioStarted";
    /**
     * Indicates synthesis voices list has been successfully retrieved.
     * @member ResultReason.VoicesListRetrieved
     */
    ResultReason[ResultReason["VoicesListRetrieved"] = 10] = "VoicesListRetrieved";
    /**
     * Indicates the transcription result contains hypothesis text and its translation(s) for
     * other participants in the conversation.
     * @member ResultReason.TranslatingParticipantSpeech
     */
    ResultReason[ResultReason["TranslatingParticipantSpeech"] = 11] = "TranslatingParticipantSpeech";
    /**
     * Indicates the transcription result contains final text and corresponding translation(s)
     * for other participants in the conversation. Speech Recognition and Translation are now
     * complete for this phrase.
     * @member ResultReason.TranslatedParticipantSpeech
     */
    ResultReason[ResultReason["TranslatedParticipantSpeech"] = 12] = "TranslatedParticipantSpeech";
    /**
     * <summary>
     * Indicates the transcription result contains the instant message and corresponding
     * translation(s).
     * @member ResultReason.TranslatedInstantMessage
     */
    ResultReason[ResultReason["TranslatedInstantMessage"] = 13] = "TranslatedInstantMessage";
    /**
     * Indicates the transcription result contains the instant message for other participants
     * in the conversation and corresponding translation(s).
     * @member ResultReason.TranslatedParticipantInstantMessage
     */
    ResultReason[ResultReason["TranslatedParticipantInstantMessage"] = 14] = "TranslatedParticipantInstantMessage";
})(ResultReason = exports.ResultReason || (exports.ResultReason = {}));



/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable max-classes-per-file */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechConfigImpl = exports.SpeechConfig = void 0;
const Exports_js_1 = __webpack_require__(2);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_2 = __webpack_require__(85);
/**
 * Speech configuration.
 * @class SpeechConfig
 */
class SpeechConfig {
    /**
     * Creates and initializes an instance.
     * @constructor
     */
    constructor() {
        return;
    }
    /**
     * Static instance of SpeechConfig returned by passing subscriptionKey and service region.
     * @member SpeechConfig.fromSubscription
     * @function
     * @public
     * @param {string} subscriptionKey - The subscription key.
     * @param {string} region - The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @returns {SpeechConfig} The speech factory
     */
    static fromSubscription(subscriptionKey, region) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(subscriptionKey, "subscriptionKey");
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(region, "region");
        const speechImpl = new SpeechConfigImpl();
        speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Region, region);
        speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Key, subscriptionKey);
        return speechImpl;
    }
    /**
     * Internal implementation of fromEndpoint() overloads. Accepts either a subscription key or a TokenCredential.
     * @private
     */
    static fromEndpoint(endpoint, auth) {
        Contracts_js_1.Contracts.throwIfNull(endpoint, "endpoint");
        const isValidString = typeof auth === "string" && auth.trim().length > 0;
        const isTokenCredential = typeof auth === "object" && auth !== null && typeof auth.getToken === "function";
        const isKeyCredential = typeof auth === "object" && auth !== null && typeof auth.key === "string";
        if (auth !== undefined && !isValidString && !isTokenCredential && !isKeyCredential) {
            throw new Error("Invalid 'auth' parameter: expected a non-empty API key string, a TokenCredential, or a KeyCredential.");
        }
        let speechImpl;
        if (typeof auth === "string") {
            speechImpl = new SpeechConfigImpl();
            speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Key, auth);
        }
        else if (typeof auth === "object" && typeof auth.getToken === "function") {
            speechImpl = new SpeechConfigImpl(auth);
        }
        else if (typeof auth === "object" && typeof auth.key === "string") {
            speechImpl = new SpeechConfigImpl();
            speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Key, auth.key);
        }
        else {
            speechImpl = new SpeechConfigImpl();
        }
        speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Endpoint, endpoint.href);
        return speechImpl;
    }
    /**
     * Creates an instance of the speech config with specified host and subscription key.
     * This method is intended only for users who use a non-default service host. Standard resource path will be assumed.
     * For services with a non-standard resource path or no path at all, use fromEndpoint instead.
     * Note: Query parameters are not allowed in the host URI and must be set by other APIs.
     * Note: To use an authorization token with fromHost, use fromHost(URL),
     * and then set the AuthorizationToken property on the created SpeechConfig instance.
     * Note: Added in version 1.9.0.
     * @member SpeechConfig.fromHost
     * @function
     * @public
     * @param {URL} host - The service endpoint to connect to. Format is "protocol://host:port" where ":port" is optional.
     * @param {string} subscriptionKey - The subscription key. If a subscription key is not specified, an authorization token must be set.
     * @returns {SpeechConfig} A speech factory instance.
     */
    static fromHost(hostName, subscriptionKey) {
        Contracts_js_1.Contracts.throwIfNull(hostName, "hostName");
        const speechImpl = new SpeechConfigImpl();
        speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Host, hostName.protocol + "//" + hostName.hostname + (hostName.port === "" ? "" : ":" + hostName.port));
        // Containers do not yet have /stt/speech/universal/v2 routes.
        speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_RecognitionEndpointVersion, "1");
        if (undefined !== subscriptionKey) {
            speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Key, subscriptionKey);
        }
        return speechImpl;
    }
    /**
     * Creates an instance of the speech factory with specified initial authorization token and region.
     * Note: The caller needs to ensure that the authorization token is valid. Before the authorization token
     * expires, the caller needs to refresh it by calling this setter with a new valid token.
     * Note: As configuration values are copied when creating a new recognizer,
     * the new token value will not apply to recognizers that have already been created. For recognizers
     * that have been created before, you need to set authorization token of the corresponding recognizer
     * to refresh the token. Otherwise, the recognizers will encounter errors during recognition.
     * @member SpeechConfig.fromAuthorizationToken
     * @function
     * @public
     * @param {string} authorizationToken - The initial authorization token.
     * @param {string} region - The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @returns {SpeechConfig} A speech factory instance.
     */
    static fromAuthorizationToken(authorizationToken, region) {
        Contracts_js_1.Contracts.throwIfNull(authorizationToken, "authorizationToken");
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(region, "region");
        const speechImpl = new SpeechConfigImpl();
        speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Region, region);
        speechImpl.authorizationToken = authorizationToken;
        return speechImpl;
    }
    /**
     * Closes the configuration.
     * @member SpeechConfig.prototype.close
     * @function
     * @public
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    close() { }
}
exports.SpeechConfig = SpeechConfig;
/**
 * @public
 * @class SpeechConfigImpl
 */
class SpeechConfigImpl extends SpeechConfig {
    constructor(tokenCredential) {
        super();
        this.privProperties = new Exports_js_2.PropertyCollection();
        this.speechRecognitionLanguage = "en-US"; // Should we have a default?
        this.outputFormat = Exports_js_2.OutputFormat.Simple;
        this.privTokenCredential = tokenCredential;
    }
    get properties() {
        return this.privProperties;
    }
    get endPoint() {
        return new URL(this.privProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Endpoint));
    }
    get subscriptionKey() {
        return this.privProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Key);
    }
    get region() {
        return this.privProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Region);
    }
    get authorizationToken() {
        return this.privProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceAuthorization_Token);
    }
    set authorizationToken(value) {
        this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceAuthorization_Token, value);
    }
    get speechRecognitionLanguage() {
        return this.privProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_RecoLanguage);
    }
    set speechRecognitionLanguage(value) {
        this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_RecoLanguage, value);
    }
    get autoDetectSourceLanguages() {
        return this.privProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages);
    }
    set autoDetectSourceLanguages(value) {
        this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages, value);
    }
    get outputFormat() {
        return Exports_js_2.OutputFormat[this.privProperties.getProperty(Exports_js_1.OutputFormatPropertyName, undefined)];
    }
    set outputFormat(value) {
        this.privProperties.setProperty(Exports_js_1.OutputFormatPropertyName, Exports_js_2.OutputFormat[value]);
    }
    get endpointId() {
        return this.privProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_EndpointId);
    }
    set endpointId(value) {
        this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_EndpointId, value);
    }
    get tokenCredential() {
        return this.privTokenCredential;
    }
    setProperty(name, value) {
        Contracts_js_1.Contracts.throwIfNull(value, "value");
        this.privProperties.setProperty(name, value);
    }
    getProperty(name, def) {
        return this.privProperties.getProperty(name, def);
    }
    setProxy(proxyHostName, proxyPort, proxyUserName, proxyPassword) {
        this.setProperty(Exports_js_2.PropertyId[Exports_js_2.PropertyId.SpeechServiceConnection_ProxyHostName], proxyHostName);
        this.setProperty(Exports_js_2.PropertyId[Exports_js_2.PropertyId.SpeechServiceConnection_ProxyPort], proxyPort);
        this.setProperty(Exports_js_2.PropertyId[Exports_js_2.PropertyId.SpeechServiceConnection_ProxyUserName], proxyUserName);
        this.setProperty(Exports_js_2.PropertyId[Exports_js_2.PropertyId.SpeechServiceConnection_ProxyPassword], proxyPassword);
    }
    setServiceProperty(name, value) {
        const currentProperties = JSON.parse(this.privProperties.getProperty(Exports_js_1.ServicePropertiesPropertyName, "{}"));
        currentProperties[name] = value;
        this.privProperties.setProperty(Exports_js_1.ServicePropertiesPropertyName, JSON.stringify(currentProperties));
    }
    setProfanity(profanity) {
        this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_ProfanityOption, Exports_js_2.ProfanityOption[profanity]);
    }
    enableAudioLogging() {
        this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_EnableAudioLogging, "true");
    }
    requestWordLevelTimestamps() {
        this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_RequestWordLevelTimestamps, "true");
        this.privProperties.setProperty(Exports_js_1.OutputFormatPropertyName, Exports_js_2.OutputFormat[Exports_js_2.OutputFormat.Detailed]);
    }
    enableDictation() {
        this.privProperties.setProperty(Exports_js_1.ForceDictationPropertyName, "true");
    }
    clone() {
        const ret = new SpeechConfigImpl(this.tokenCredential);
        ret.privProperties = this.privProperties.clone();
        return ret;
    }
    get speechSynthesisLanguage() {
        return this.privProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthLanguage);
    }
    set speechSynthesisLanguage(language) {
        this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthLanguage, language);
    }
    get speechSynthesisVoiceName() {
        return this.privProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthVoice);
    }
    set speechSynthesisVoiceName(voice) {
        this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthVoice, voice);
    }
    get speechSynthesisOutputFormat() {
        return Exports_js_2.SpeechSynthesisOutputFormat[this.privProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthOutputFormat, undefined)];
    }
    set speechSynthesisOutputFormat(format) {
        this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthOutputFormat, Exports_js_2.SpeechSynthesisOutputFormat[format]);
    }
}
exports.SpeechConfigImpl = SpeechConfigImpl;



/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechTranslationConfigImpl = exports.SpeechTranslationConfig = void 0;
const Exports_js_1 = __webpack_require__(2);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_2 = __webpack_require__(85);
/**
 * Speech translation configuration.
 * @class SpeechTranslationConfig
 */
class SpeechTranslationConfig extends Exports_js_2.SpeechConfig {
    /**
     * Creates an instance of recognizer config.
     */
    constructor() {
        super();
    }
    /**
     * Static instance of SpeechTranslationConfig returned by passing a subscription key and service region.
     * @member SpeechTranslationConfig.fromSubscription
     * @function
     * @public
     * @param {string} subscriptionKey - The subscription key.
     * @param {string} region - The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @returns {SpeechTranslationConfig} The speech translation config.
     */
    static fromSubscription(subscriptionKey, region) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(subscriptionKey, "subscriptionKey");
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(region, "region");
        const ret = new SpeechTranslationConfigImpl();
        ret.properties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Key, subscriptionKey);
        ret.properties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Region, region);
        return ret;
    }
    /**
     * Static instance of SpeechTranslationConfig returned by passing authorization token and service region.
     * Note: The caller needs to ensure that the authorization token is valid. Before the authorization token
     * expires, the caller needs to refresh it by setting the property authorizationToken with a new
     * valid token. Otherwise, all the recognizers created by this SpeechTranslationConfig instance
     * will encounter errors during recognition.
     * As configuration values are copied when creating a new recognizer, the new token value will not apply
     * to recognizers that have already been created.
     * For recognizers that have been created before, you need to set authorization token of the corresponding recognizer
     * to refresh the token. Otherwise, the recognizers will encounter errors during recognition.
     * @member SpeechTranslationConfig.fromAuthorizationToken
     * @function
     * @public
     * @param {string} authorizationToken - The authorization token.
     * @param {string} region - The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @returns {SpeechTranslationConfig} The speech translation config.
     */
    static fromAuthorizationToken(authorizationToken, region) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(authorizationToken, "authorizationToken");
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(region, "region");
        const ret = new SpeechTranslationConfigImpl();
        ret.properties.setProperty(Exports_js_2.PropertyId.SpeechServiceAuthorization_Token, authorizationToken);
        ret.properties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Region, region);
        return ret;
    }
    /**
     * Creates an instance of the speech config with specified host and subscription key.
     * This method is intended only for users who use a non-default service host. Standard resource path will be assumed.
     * For services with a non-standard resource path or no path at all, use fromEndpoint instead.
     * Note: Query parameters are not allowed in the host URI and must be set by other APIs.
     * Note: To use an authorization token with fromHost, use fromHost(URL),
     * and then set the AuthorizationToken property on the created SpeechConfig instance.
     * Note: Added in version 1.9.0.
     * @member SpeechConfig.fromHost
     * @function
     * @public
     * @param {URL} host - The service endpoint to connect to. Format is "protocol://host:port" where ":port" is optional.
     * @param {string} subscriptionKey - The subscription key. If a subscription key is not specified, an authorization token must be set.
     * @returns {SpeechConfig} A speech factory instance.
     */
    static fromHost(hostName, subscriptionKey) {
        Contracts_js_1.Contracts.throwIfNull(hostName, "hostName");
        const speechImpl = new SpeechTranslationConfigImpl();
        speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Host, hostName.protocol + "//" + hostName.hostname + (hostName.port === "" ? "" : ":" + hostName.port));
        if (undefined !== subscriptionKey) {
            speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Key, subscriptionKey);
        }
        return speechImpl;
    }
    /**
     * Internal implementation of fromEndpoint() overloads. Accepts either a subscription key or a TokenCredential.
     * @private
     */
    static fromEndpoint(endpoint, auth) {
        Contracts_js_1.Contracts.throwIfNull(endpoint, "endpoint");
        const isValidString = typeof auth === "string" && auth.trim().length > 0;
        const isTokenCredential = typeof auth === "object" && auth !== null && typeof auth.getToken === "function";
        const isKeyCredential = typeof auth === "object" && auth !== null && typeof auth.key === "string";
        if (auth !== undefined && !isValidString && !isTokenCredential && !isKeyCredential) {
            throw new Error("Invalid 'auth' parameter: expected a non-empty API key string, a TokenCredential, or a KeyCredential.");
        }
        let speechImpl;
        if (typeof auth === "string") {
            speechImpl = new SpeechTranslationConfigImpl();
            speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Key, auth);
        }
        else if (typeof auth === "object" && typeof auth.getToken === "function") {
            speechImpl = new SpeechTranslationConfigImpl(auth);
        }
        else if (typeof auth === "object" && typeof auth.key === "string") {
            speechImpl = new SpeechTranslationConfigImpl();
            speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Key, auth.key);
        }
        else {
            speechImpl = new SpeechTranslationConfigImpl();
        }
        speechImpl.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Endpoint, endpoint.href);
        return speechImpl;
    }
}
exports.SpeechTranslationConfig = SpeechTranslationConfig;
/**
 * @private
 * @class SpeechTranslationConfigImpl
 */
class SpeechTranslationConfigImpl extends SpeechTranslationConfig {
    constructor(tokenCredential) {
        super();
        this.privSpeechProperties = new Exports_js_2.PropertyCollection();
        this.outputFormat = Exports_js_2.OutputFormat.Simple;
        this.privTokenCredential = tokenCredential;
    }
    /**
     * Gets/Sets the authorization token.
     * If this is set, subscription key is ignored.
     * User needs to make sure the provided authorization token is valid and not expired.
     * @member SpeechTranslationConfigImpl.prototype.authorizationToken
     * @function
     * @public
     * @param {string} value - The authorization token.
     */
    set authorizationToken(value) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(value, "value");
        this.privSpeechProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceAuthorization_Token, value);
    }
    /**
     * Sets the speech recognition language.
     * @member SpeechTranslationConfigImpl.prototype.speechRecognitionLanguage
     * @function
     * @public
     * @param {string} value - The authorization token.
     */
    set speechRecognitionLanguage(value) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(value, "value");
        this.privSpeechProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_RecoLanguage, value);
    }
    /**
     * Gets the speech recognition language.
     * @member SpeechTranslationConfigImpl.prototype.speechRecognitionLanguage
     * @function
     * @public
     * @return {string} The speechRecognitionLanguage.
     */
    get speechRecognitionLanguage() {
        return this.privSpeechProperties.getProperty(Exports_js_2.PropertyId[Exports_js_2.PropertyId.SpeechServiceConnection_RecoLanguage]);
    }
    /**
     * @member SpeechTranslationConfigImpl.prototype.subscriptionKey
     * @function
     * @public
     */
    get subscriptionKey() {
        return this.privSpeechProperties.getProperty(Exports_js_2.PropertyId[Exports_js_2.PropertyId.SpeechServiceConnection_Key]);
    }
    /**
     * Gets the output format
     * @member SpeechTranslationConfigImpl.prototype.outputFormat
     * @function
     * @public
     */
    get outputFormat() {
        // eslint-disable-next-line
        return Exports_js_2.OutputFormat[this.privSpeechProperties.getProperty(Exports_js_1.OutputFormatPropertyName, undefined)];
    }
    /**
     * Gets/Sets the output format
     * @member SpeechTranslationConfigImpl.prototype.outputFormat
     * @function
     * @public
     */
    set outputFormat(value) {
        this.privSpeechProperties.setProperty(Exports_js_1.OutputFormatPropertyName, Exports_js_2.OutputFormat[value]);
    }
    /**
     * Gets the endpoint id.
     * @member SpeechTranslationConfigImpl.prototype.endpointId
     * @function
     * @public
     */
    get endpointId() {
        return this.privSpeechProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_EndpointId);
    }
    /**
     * Gets/Sets the endpoint id.
     * @member SpeechTranslationConfigImpl.prototype.endpointId
     * @function
     * @public
     */
    set endpointId(value) {
        this.privSpeechProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_EndpointId, value);
    }
    /**
     * Add a (text) target language to translate into.
     * @member SpeechTranslationConfigImpl.prototype.addTargetLanguage
     * @function
     * @public
     * @param {string} value - The language such as de-DE
     */
    addTargetLanguage(value) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(value, "value");
        const languages = this.targetLanguages;
        if (!languages.includes(value)) {
            languages.push(value);
            this.privSpeechProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_TranslationToLanguages, languages.join(","));
        }
    }
    /**
     * Gets the (text) target language to translate into.
     * @member SpeechTranslationConfigImpl.prototype.targetLanguages
     * @function
     * @public
     * @param {string} value - The language such as de-DE
     */
    get targetLanguages() {
        if (this.privSpeechProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_TranslationToLanguages, undefined) !== undefined) {
            return this.privSpeechProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_TranslationToLanguages).split(",");
        }
        else {
            return [];
        }
    }
    /**
     * Gets the voice name.
     * @member SpeechTranslationConfigImpl.prototype.voiceName
     * @function
     * @public
     */
    get voiceName() {
        return this.getProperty(Exports_js_2.PropertyId[Exports_js_2.PropertyId.SpeechServiceConnection_TranslationVoice]);
    }
    /**
     * Gets/Sets the voice of the translated language, enable voice synthesis output.
     * @member SpeechTranslationConfigImpl.prototype.voiceName
     * @function
     * @public
     * @param {string} value - The name of the voice.
     */
    set voiceName(value) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(value, "value");
        this.privSpeechProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_TranslationVoice, value);
    }
    /**
     * Provides the region.
     * @member SpeechTranslationConfigImpl.prototype.region
     * @function
     * @public
     * @returns {string} The region.
     */
    get region() {
        return this.privSpeechProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Region);
    }
    get tokenCredential() {
        return this.privTokenCredential;
    }
    setProxy(proxyHostName, proxyPort, proxyUserName, proxyPassword) {
        this.setProperty(Exports_js_2.PropertyId[Exports_js_2.PropertyId.SpeechServiceConnection_ProxyHostName], proxyHostName);
        this.setProperty(Exports_js_2.PropertyId[Exports_js_2.PropertyId.SpeechServiceConnection_ProxyPort], proxyPort);
        this.setProperty(Exports_js_2.PropertyId[Exports_js_2.PropertyId.SpeechServiceConnection_ProxyUserName], proxyUserName);
        this.setProperty(Exports_js_2.PropertyId[Exports_js_2.PropertyId.SpeechServiceConnection_ProxyPassword], proxyPassword);
    }
    /**
     * Gets an arbitrary property value.
     * @member SpeechTranslationConfigImpl.prototype.getProperty
     * @function
     * @public
     * @param {string} name - The name of the property.
     * @param {string} def - The default value of the property in case it is not set.
     * @returns {string} The value of the property.
     */
    getProperty(name, def) {
        return this.privSpeechProperties.getProperty(name, def);
    }
    /**
     * Gets/Sets an arbitrary property value.
     * @member SpeechTranslationConfigImpl.prototype.setProperty
     * @function
     * @public
     * @param {string | PropertyId} name - The name of the property to set.
     * @param {string} value - The value of the property.
     */
    setProperty(name, value) {
        this.privSpeechProperties.setProperty(name, value);
    }
    /**
     * Provides access to custom properties.
     * @member SpeechTranslationConfigImpl.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The properties.
     */
    get properties() {
        return this.privSpeechProperties;
    }
    /**
     * Dispose of associated resources.
     * @member SpeechTranslationConfigImpl.prototype.close
     * @function
     * @public
     */
    close() {
        return;
    }
    setServiceProperty(name, value) {
        const currentProperties = JSON.parse(this.privSpeechProperties.getProperty(Exports_js_1.ServicePropertiesPropertyName, "{}"));
        currentProperties[name] = value;
        this.privSpeechProperties.setProperty(Exports_js_1.ServicePropertiesPropertyName, JSON.stringify(currentProperties));
    }
    setProfanity(profanity) {
        this.privSpeechProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_ProfanityOption, Exports_js_2.ProfanityOption[profanity]);
    }
    enableAudioLogging() {
        this.privSpeechProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_EnableAudioLogging, "true");
    }
    requestWordLevelTimestamps() {
        this.privSpeechProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_RequestWordLevelTimestamps, "true");
    }
    enableDictation() {
        this.privSpeechProperties.setProperty(Exports_js_1.ForceDictationPropertyName, "true");
    }
    get speechSynthesisLanguage() {
        return this.privSpeechProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthLanguage);
    }
    set speechSynthesisLanguage(language) {
        this.privSpeechProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthLanguage, language);
    }
    get speechSynthesisVoiceName() {
        return this.privSpeechProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthVoice);
    }
    set speechSynthesisVoiceName(voice) {
        this.privSpeechProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthVoice, voice);
    }
    get speechSynthesisOutputFormat() {
        // eslint-disable-next-line
        return Exports_js_2.SpeechSynthesisOutputFormat[this.privSpeechProperties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthOutputFormat, undefined)];
    }
    set speechSynthesisOutputFormat(format) {
        this.privSpeechProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthOutputFormat, Exports_js_2.SpeechSynthesisOutputFormat[format]);
    }
}
exports.SpeechTranslationConfigImpl = SpeechTranslationConfigImpl;



/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PropertyCollection = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Represents collection of properties and their values.
 * @class PropertyCollection
 */
class PropertyCollection {
    constructor() {
        this.privKeys = [];
        this.privValues = [];
    }
    /**
     * Returns the property value in type String.
     * Currently only String, int and bool are allowed.
     * If the name is not available, the specified defaultValue is returned.
     * @member PropertyCollection.prototype.getProperty
     * @function
     * @public
     * @param {string} key - The parameter name.
     * @param {string | number | boolean} def - The default value which is returned if the parameter
     * is not available in the collection.
     * @returns {string} value of the parameter.
     */
    getProperty(key, def) {
        let keyToUse;
        if (typeof key === "string") {
            keyToUse = key;
        }
        else {
            keyToUse = Exports_js_1.PropertyId[key];
        }
        for (let n = 0; n < this.privKeys.length; n++) {
            if (this.privKeys[n] === keyToUse) {
                return this.privValues[n];
            }
        }
        if (def === undefined) {
            return undefined;
        }
        return String(def);
    }
    /**
     * Sets the String value of the parameter specified by name.
     * @member PropertyCollection.prototype.setProperty
     * @function
     * @public
     * @param {string} key - The parameter name.
     * @param {string} value - The value of the parameter.
     */
    setProperty(key, value) {
        let keyToUse;
        if (typeof key === "string") {
            keyToUse = key;
        }
        else {
            keyToUse = Exports_js_1.PropertyId[key];
        }
        for (let n = 0; n < this.privKeys.length; n++) {
            if (this.privKeys[n] === keyToUse) {
                this.privValues[n] = value;
                return;
            }
        }
        this.privKeys.push(keyToUse);
        this.privValues.push(value);
    }
    /**
     * Clones the collection.
     * @member PropertyCollection.prototype.clone
     * @function
     * @public
     * @returns {PropertyCollection} A copy of the collection.
     */
    clone() {
        const clonedMap = new PropertyCollection();
        for (let n = 0; n < this.privKeys.length; n++) {
            clonedMap.privKeys.push(this.privKeys[n]);
            clonedMap.privValues.push(this.privValues[n]);
        }
        return clonedMap;
    }
    /**
     * Merges this set of properties into another, no overwrites.
     * @member PropertyCollection.prototype.mergeTo
     * @function
     * @public
     * @param {PropertyCollection}  destinationCollection - The collection to merge into.
     */
    mergeTo(destinationCollection) {
        this.privKeys.forEach((key) => {
            if (destinationCollection.getProperty(key, undefined) === undefined) {
                const value = this.getProperty(key);
                destinationCollection.setProperty(key, value);
            }
        });
    }
    /**
     * Get the keys in Property Collection.
     * @member PropertyCollection.prototype.keys
     * @function
     * @public
     * @returns {string []} Keys in the collection.
     */
    get keys() {
        return this.privKeys;
    }
}
exports.PropertyCollection = PropertyCollection;



/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PropertyId = void 0;
/**
 * Defines speech property ids.
 * @class PropertyId
 */
var PropertyId;
(function (PropertyId) {
    /**
     * The Cognitive Services Speech Service subscription Key. Under normal circumstances, you shouldn't
     * have to use this property directly.
     * Instead, use [[SpeechConfig.fromSubscription]].
     * @member PropertyId.SpeechServiceConnection_Key
     */
    PropertyId[PropertyId["SpeechServiceConnection_Key"] = 0] = "SpeechServiceConnection_Key";
    /**
     * The Cognitive Services Speech Service endpoint (url). Under normal circumstances, you shouldn't
     * have to use this property directly.
     * Instead, use [[SpeechConfig.fromEndpoint]].
     * NOTE: This endpoint is not the same as the endpoint used to obtain an access token.
     * @member PropertyId.SpeechServiceConnection_Endpoint
     */
    PropertyId[PropertyId["SpeechServiceConnection_Endpoint"] = 1] = "SpeechServiceConnection_Endpoint";
    /**
     * The Cognitive Services Speech Service region. Under normal circumstances, you shouldn't have to
     * use this property directly.
     * Instead, use [[SpeechConfig.fromSubscription]], [[SpeechConfig.fromEndpoint]], [[SpeechConfig.fromAuthorizationToken]].
     * @member PropertyId.SpeechServiceConnection_Region
     */
    PropertyId[PropertyId["SpeechServiceConnection_Region"] = 2] = "SpeechServiceConnection_Region";
    /**
     * The Cognitive Services Speech Service authorization token (aka access token). Under normal circumstances,
     * you shouldn't have to use this property directly.
     * Instead, use [[SpeechConfig.fromAuthorizationToken]], [[SpeechRecognizer.authorizationToken]],
     * [[TranslationRecognizer.authorizationToken]], [[SpeakerRecognizer.authorizationToken]].
     * @member PropertyId.SpeechServiceAuthorization_Token
     */
    PropertyId[PropertyId["SpeechServiceAuthorization_Token"] = 3] = "SpeechServiceAuthorization_Token";
    /**
     * The Cognitive Services Speech Service authorization type. Currently unused.
     * @member PropertyId.SpeechServiceAuthorization_Type
     */
    PropertyId[PropertyId["SpeechServiceAuthorization_Type"] = 4] = "SpeechServiceAuthorization_Type";
    /**
     * The Cognitive Services Speech Service endpoint id. Under normal circumstances, you shouldn't
     * have to use this property directly.
     * Instead, use [[SpeechConfig.endpointId]].
     * NOTE: The endpoint id is available in the Speech Portal, listed under Endpoint Details.
     * @member PropertyId.SpeechServiceConnection_EndpointId
     */
    PropertyId[PropertyId["SpeechServiceConnection_EndpointId"] = 5] = "SpeechServiceConnection_EndpointId";
    /**
     * The list of comma separated languages (BCP-47 format) used as target translation languages. Under normal circumstances,
     * you shouldn't have to use this property directly.
     * Instead use [[SpeechTranslationConfig.addTargetLanguage]],
     * [[SpeechTranslationConfig.targetLanguages]], [[TranslationRecognizer.targetLanguages]].
     * @member PropertyId.SpeechServiceConnection_TranslationToLanguages
     */
    PropertyId[PropertyId["SpeechServiceConnection_TranslationToLanguages"] = 6] = "SpeechServiceConnection_TranslationToLanguages";
    /**
     * The name of the Cognitive Service Text to Speech Service Voice. Under normal circumstances, you shouldn't have to use this
     * property directly.
     * Instead, use [[SpeechTranslationConfig.voiceName]].
     * NOTE: Valid voice names can be found <a href="https://aka.ms/csspeech/voicenames">here</a>.
     * @member PropertyId.SpeechServiceConnection_TranslationVoice
     */
    PropertyId[PropertyId["SpeechServiceConnection_TranslationVoice"] = 7] = "SpeechServiceConnection_TranslationVoice";
    /**
     * Translation features.
     * @member PropertyId.SpeechServiceConnection_TranslationFeatures
     */
    PropertyId[PropertyId["SpeechServiceConnection_TranslationFeatures"] = 8] = "SpeechServiceConnection_TranslationFeatures";
    /**
     * The category ID for translation.
     * @member PropertyId.SpeechServiceConnection_TranslationCategoryId
     */
    PropertyId[PropertyId["SpeechServiceConnection_TranslationCategoryId"] = 9] = "SpeechServiceConnection_TranslationCategoryId";
    /**
     * The host name of the proxy server used to connect to the Cognitive Services Speech Service. Only relevant in Node.js environments.
     * You shouldn't have to use this property directly.
     * Instead use <see cref="SpeechConfig.SetProxy(string,int,string,string)"/>.
     * Added in version 1.4.0.
     */
    PropertyId[PropertyId["SpeechServiceConnection_ProxyHostName"] = 10] = "SpeechServiceConnection_ProxyHostName";
    /**
     * The port of the proxy server used to connect to the Cognitive Services Speech Service. Only relevant in Node.js environments.
     * You shouldn't have to use this property directly.
     * Instead use <see cref="SpeechConfig.SetProxy(string,int,string,string)"/>.
     * Added in version 1.4.0.
     */
    PropertyId[PropertyId["SpeechServiceConnection_ProxyPort"] = 11] = "SpeechServiceConnection_ProxyPort";
    /**
     * The user name of the proxy server used to connect to the Cognitive Services Speech Service. Only relevant in Node.js environments.
     * You shouldn't have to use this property directly.
     * Instead use <see cref="SpeechConfig.SetProxy(string,int,string,string)"/>.
     * Added in version 1.4.0.
     */
    PropertyId[PropertyId["SpeechServiceConnection_ProxyUserName"] = 12] = "SpeechServiceConnection_ProxyUserName";
    /**
     * The password of the proxy server used to connect to the Cognitive Services Speech Service. Only relevant in Node.js environments.
     * You shouldn't have to use this property directly.
     * Instead use <see cref="SpeechConfig.SetProxy(string,int,string,string)"/>.
     * Added in version 1.4.0.
     */
    PropertyId[PropertyId["SpeechServiceConnection_ProxyPassword"] = 13] = "SpeechServiceConnection_ProxyPassword";
    /**
     * The Cognitive Services Speech Service recognition Mode. Can be "INTERACTIVE", "CONVERSATION", "DICTATION".
     * This property is intended to be read-only. The SDK is using it internally.
     * @member PropertyId.SpeechServiceConnection_RecoMode
     */
    PropertyId[PropertyId["SpeechServiceConnection_RecoMode"] = 14] = "SpeechServiceConnection_RecoMode";
    /**
     * The spoken language to be recognized (in BCP-47 format). Under normal circumstances, you shouldn't have to use this property
     * directly.
     * Instead, use [[SpeechConfig.speechRecognitionLanguage]].
     * @member PropertyId.SpeechServiceConnection_RecoLanguage
     */
    PropertyId[PropertyId["SpeechServiceConnection_RecoLanguage"] = 15] = "SpeechServiceConnection_RecoLanguage";
    /**
     * The session id. This id is a universally unique identifier (aka UUID) representing a specific binding of an audio input stream
     * and the underlying speech recognition instance to which it is bound. Under normal circumstances, you shouldn't have to use this
     * property directly.
     * Instead use [[SessionEventArgs.sessionId]].
     * @member PropertyId.Speech_SessionId
     */
    PropertyId[PropertyId["Speech_SessionId"] = 16] = "Speech_SessionId";
    /**
     * The spoken language to be synthesized (e.g. en-US)
     * @member PropertyId.SpeechServiceConnection_SynthLanguage
     */
    PropertyId[PropertyId["SpeechServiceConnection_SynthLanguage"] = 17] = "SpeechServiceConnection_SynthLanguage";
    /**
     * The name of the TTS voice to be used for speech synthesis
     * @member PropertyId.SpeechServiceConnection_SynthVoice
     */
    PropertyId[PropertyId["SpeechServiceConnection_SynthVoice"] = 18] = "SpeechServiceConnection_SynthVoice";
    /**
     * The string to specify TTS output audio format
     * @member PropertyId.SpeechServiceConnection_SynthOutputFormat
     */
    PropertyId[PropertyId["SpeechServiceConnection_SynthOutputFormat"] = 19] = "SpeechServiceConnection_SynthOutputFormat";
    /**
     * The list of comma separated languages used as possible source languages
     * Added in version 1.13.0
     * @member PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages
     */
    PropertyId[PropertyId["SpeechServiceConnection_AutoDetectSourceLanguages"] = 20] = "SpeechServiceConnection_AutoDetectSourceLanguages";
    /**
     * The requested Cognitive Services Speech Service response output format (simple or detailed). Under normal circumstances, you shouldn't have
     * to use this property directly.
     * Instead use [[SpeechConfig.outputFormat]].
     * @member PropertyId.SpeechServiceResponse_RequestDetailedResultTrueFalse
     */
    PropertyId[PropertyId["SpeechServiceResponse_RequestDetailedResultTrueFalse"] = 21] = "SpeechServiceResponse_RequestDetailedResultTrueFalse";
    /**
     * The requested Cognitive Services Speech Service response output profanity level. Currently unused.
     * @member PropertyId.SpeechServiceResponse_RequestProfanityFilterTrueFalse
     */
    PropertyId[PropertyId["SpeechServiceResponse_RequestProfanityFilterTrueFalse"] = 22] = "SpeechServiceResponse_RequestProfanityFilterTrueFalse";
    /**
     * The Cognitive Services Speech Service response output (in JSON format). This property is available on recognition result objects only.
     * @member PropertyId.SpeechServiceResponse_JsonResult
     */
    PropertyId[PropertyId["SpeechServiceResponse_JsonResult"] = 23] = "SpeechServiceResponse_JsonResult";
    /**
     * The Cognitive Services Speech Service error details (in JSON format). Under normal circumstances, you shouldn't have to
     * use this property directly. Instead use [[CancellationDetails.errorDetails]].
     * @member PropertyId.SpeechServiceResponse_JsonErrorDetails
     */
    PropertyId[PropertyId["SpeechServiceResponse_JsonErrorDetails"] = 24] = "SpeechServiceResponse_JsonErrorDetails";
    /**
     * The cancellation reason. Currently unused.
     * @member PropertyId.CancellationDetails_Reason
     */
    PropertyId[PropertyId["CancellationDetails_Reason"] = 25] = "CancellationDetails_Reason";
    /**
     * The cancellation text. Currently unused.
     * @member PropertyId.CancellationDetails_ReasonText
     */
    PropertyId[PropertyId["CancellationDetails_ReasonText"] = 26] = "CancellationDetails_ReasonText";
    /**
     * The Cancellation detailed text. Currently unused.
     * @member PropertyId.CancellationDetails_ReasonDetailedText
     */
    PropertyId[PropertyId["CancellationDetails_ReasonDetailedText"] = 27] = "CancellationDetails_ReasonDetailedText";
    /**
     * The URL string built from speech configuration.
     * This property is intended to be read-only. The SDK is using it internally.
     * NOTE: Added in version 1.7.0.
     */
    PropertyId[PropertyId["SpeechServiceConnection_Url"] = 28] = "SpeechServiceConnection_Url";
    /**
     * The initial silence timeout value (in milliseconds) used by the service.
     * Added in version 1.7.0
     */
    PropertyId[PropertyId["SpeechServiceConnection_InitialSilenceTimeoutMs"] = 29] = "SpeechServiceConnection_InitialSilenceTimeoutMs";
    /**
     * This property is deprecated.
     * For current information about silence timeouts, please visit https://aka.ms/csspeech/timeouts.
     */
    PropertyId[PropertyId["SpeechServiceConnection_EndSilenceTimeoutMs"] = 30] = "SpeechServiceConnection_EndSilenceTimeoutMs";
    /**
     * A duration of detected silence, measured in milliseconds, after which speech-to-text will determine a spoken
     * phrase has ended and generate a final Recognized result. Configuring this timeout may be helpful in situations
     * where spoken input is significantly faster or slower than usual and default segmentation behavior consistently
     * yields results that are too long or too short. Segmentation timeout values that are inappropriately high or low
     * can negatively affect speech-to-text accuracy; this property should be carefully configured and the resulting
     * behavior should be thoroughly validated as intended.
     *
     * Refer to the documentation for valid value ranges and additional details:
     * https://aka.ms/csspeech/timeouts
     *
     * Added in version 1.42.0.
     */
    PropertyId[PropertyId["Speech_SegmentationSilenceTimeoutMs"] = 31] = "Speech_SegmentationSilenceTimeoutMs";
    /**
     * SegmentationMaximumTimeMs represents the maximum length of a spoken phrase when using the Time segmentation strategy.
     * @member Speech_SegmentationSilenceTimeoutMs must be set in order to use this setting.
     * As the length of a spoken phrase approaches this value, the @member Speech_SegmentationSilenceTimeoutMs will be reduced until either
     * the phrase silence timeout is reached or the phrase reaches the maximum length.
     *
     * Valid range: **20,000 to 70,000** milliseconds.
     *
     * Added in version 1.42.0.
     */
    PropertyId[PropertyId["Speech_SegmentationMaximumTimeMs"] = 32] = "Speech_SegmentationMaximumTimeMs";
    /**
     * Specifies the strategy used to determine when a spoken phrase has ended,
     * triggering the generation of a final recognition result.
     *
     * Supported values:
     * - "Default": Uses the Speech Service's default segmentation strategy. Recommended for most use cases.
     * - "Time": Uses a silence-based timeout. A final result is generated after a defined period of silence.
     * Requires @member Speech_SegmentationMaximumTimeMs to be configured appropriately.
     * Optional: Adjust @member Speech_SegmentationSilenceTimeoutMs to control how much silence ends a phrase.
     * - "Semantic": Uses an AI model to semantically infer phrase boundaries based on content.
     * No adjustable parameters are available for this strategy.
     *
     * Introduced in version 1.42.0.
     */
    PropertyId[PropertyId["Speech_SegmentationStrategy"] = 33] = "Speech_SegmentationStrategy";
    /**
     * The sensitivity of how soon a potential speech start can be signaled.
     * Allowed values are "low" (default), "medium" and "high".
     */
    PropertyId[PropertyId["Speech_StartEventSensitivity"] = 34] = "Speech_StartEventSensitivity";
    /**
     * A boolean value specifying whether to process stereo input channels separately (instead of downmixing).
     * Default is false.
     */
    PropertyId[PropertyId["Speech_EnableMultiChannelProcessing"] = 35] = "Speech_EnableMultiChannelProcessing";
    /**
     * A boolean value specifying whether audio logging is enabled in the service or not.
     * Audio and content logs are stored either in Microsoft-owned storage, or in your own storage account linked
     * to your Cognitive Services subscription (Bring Your Own Storage (BYOS) enabled Speech resource).
     * The logs will be removed after 30 days.
     * Added in version 1.7.0
     */
    PropertyId[PropertyId["SpeechServiceConnection_EnableAudioLogging"] = 36] = "SpeechServiceConnection_EnableAudioLogging";
    /**
     * The speech service connection language identifier mode.
     * Can be "AtStart" (the default), or "Continuous". See Language
     * Identification document https://aka.ms/speech/lid?pivots=programming-language-javascript
     * for more details.
     * Added in 1.25.0
     **/
    PropertyId[PropertyId["SpeechServiceConnection_LanguageIdMode"] = 37] = "SpeechServiceConnection_LanguageIdMode";
    /**
     * A string value representing the desired endpoint version to target for Speech Recognition.
     * Added in version 1.21.0
     */
    PropertyId[PropertyId["SpeechServiceConnection_RecognitionEndpointVersion"] = 38] = "SpeechServiceConnection_RecognitionEndpointVersion";
    /**
     * The requested Cognitive Services Speech Service response output profanity setting.
     * Allowed values are "masked", "removed", and "raw".
     * Added in version 1.7.0.
     */
    PropertyId[PropertyId["SpeechServiceResponse_ProfanityOption"] = 39] = "SpeechServiceResponse_ProfanityOption";
    /**
     * A string value specifying which post processing option should be used by service.
     * Allowed values are "TrueText".
     * Added in version 1.7.0
     */
    PropertyId[PropertyId["SpeechServiceResponse_PostProcessingOption"] = 40] = "SpeechServiceResponse_PostProcessingOption";
    /**
     * A boolean value specifying whether to include word-level timestamps in the response result.
     * Added in version 1.7.0
     */
    PropertyId[PropertyId["SpeechServiceResponse_RequestWordLevelTimestamps"] = 41] = "SpeechServiceResponse_RequestWordLevelTimestamps";
    /**
     * The number of times a word has to be in partial results to be returned.
     * Added in version 1.7.0
     */
    PropertyId[PropertyId["SpeechServiceResponse_StablePartialResultThreshold"] = 42] = "SpeechServiceResponse_StablePartialResultThreshold";
    /**
     * A string value specifying the output format option in the response result. Internal use only.
     * Added in version 1.7.0.
     */
    PropertyId[PropertyId["SpeechServiceResponse_OutputFormatOption"] = 43] = "SpeechServiceResponse_OutputFormatOption";
    /**
     * A boolean value to request for stabilizing translation partial results by omitting words in the end.
     * Added in version 1.7.0.
     */
    PropertyId[PropertyId["SpeechServiceResponse_TranslationRequestStablePartialResult"] = 44] = "SpeechServiceResponse_TranslationRequestStablePartialResult";
    /**
     * A boolean value specifying whether to request WordBoundary events.
     * @member PropertyId.SpeechServiceResponse_RequestWordBoundary
     * Added in version 1.21.0.
     */
    PropertyId[PropertyId["SpeechServiceResponse_RequestWordBoundary"] = 45] = "SpeechServiceResponse_RequestWordBoundary";
    /**
     * A boolean value specifying whether to request punctuation boundary in WordBoundary Events. Default is true.
     * @member PropertyId.SpeechServiceResponse_RequestPunctuationBoundary
     * Added in version 1.21.0.
     */
    PropertyId[PropertyId["SpeechServiceResponse_RequestPunctuationBoundary"] = 46] = "SpeechServiceResponse_RequestPunctuationBoundary";
    /**
     * A boolean value specifying whether to request sentence boundary in WordBoundary Events. Default is false.
     * @member PropertyId.SpeechServiceResponse_RequestSentenceBoundary
     * Added in version 1.21.0.
     */
    PropertyId[PropertyId["SpeechServiceResponse_RequestSentenceBoundary"] = 47] = "SpeechServiceResponse_RequestSentenceBoundary";
    /**
     * Determines if intermediate results contain speaker identification.
     * Allowed values are "true" or "false". If set to "true", the intermediate results will contain speaker identification.
     * The default value if unset or set to an invalid value is "false".
     * This is currently only supported for scenarios using the ConversationTranscriber".
     * @member PropertyId.SpeechServiceResponse_DiarizeIntermediateResults
     * Adding in version 1.41.
     */
    PropertyId[PropertyId["SpeechServiceResponse_DiarizeIntermediateResults"] = 48] = "SpeechServiceResponse_DiarizeIntermediateResults";
    /**
     * Identifier used to connect to the backend service.
     * @member PropertyId.Conversation_ApplicationId
     */
    PropertyId[PropertyId["Conversation_ApplicationId"] = 49] = "Conversation_ApplicationId";
    /**
     * Type of dialog backend to connect to.
     * @member PropertyId.Conversation_DialogType
     */
    PropertyId[PropertyId["Conversation_DialogType"] = 50] = "Conversation_DialogType";
    /**
     * Silence timeout for listening
     * @member PropertyId.Conversation_Initial_Silence_Timeout
     */
    PropertyId[PropertyId["Conversation_Initial_Silence_Timeout"] = 51] = "Conversation_Initial_Silence_Timeout";
    /**
     * From Id to add to speech recognition activities.
     * @member PropertyId.Conversation_From_Id
     */
    PropertyId[PropertyId["Conversation_From_Id"] = 52] = "Conversation_From_Id";
    /**
     * ConversationId for the session.
     * @member PropertyId.Conversation_Conversation_Id
     */
    PropertyId[PropertyId["Conversation_Conversation_Id"] = 53] = "Conversation_Conversation_Id";
    /**
     * Comma separated list of custom voice deployment ids.
     * @member PropertyId.Conversation_Custom_Voice_Deployment_Ids
     */
    PropertyId[PropertyId["Conversation_Custom_Voice_Deployment_Ids"] = 54] = "Conversation_Custom_Voice_Deployment_Ids";
    /**
     * Speech activity template, stamp properties from the template on the activity generated by the service for speech.
     * @member PropertyId.Conversation_Speech_Activity_Template
     * Added in version 1.10.0.
     */
    PropertyId[PropertyId["Conversation_Speech_Activity_Template"] = 55] = "Conversation_Speech_Activity_Template";
    /**
     * Enables or disables the receipt of turn status messages as obtained on the turnStatusReceived event.
     * @member PropertyId.Conversation_Request_Bot_Status_Messages
     * Added in version 1.15.0.
     */
    PropertyId[PropertyId["Conversation_Request_Bot_Status_Messages"] = 56] = "Conversation_Request_Bot_Status_Messages";
    /**
     * Specifies the connection ID to be provided in the Agent configuration message, e.g. a Direct Line token for
     * channel authentication.
     * Added in version 1.15.1.
     */
    PropertyId[PropertyId["Conversation_Agent_Connection_Id"] = 57] = "Conversation_Agent_Connection_Id";
    /**
     * The Cognitive Services Speech Service host (url). Under normal circumstances, you shouldn't have to use this property directly.
     * Instead, use [[SpeechConfig.fromHost]].
     */
    PropertyId[PropertyId["SpeechServiceConnection_Host"] = 58] = "SpeechServiceConnection_Host";
    /**
     * The reference text of the audio for pronunciation evaluation.
     * For this and the following pronunciation assessment parameters, see
     * https://docs.microsoft.com/azure/cognitive-services/speech-service/rest-speech-to-text#pronunciation-assessment-parameters for details.
     * Under normal circumstances, you shouldn't have to use this property directly.
     * Added in version 1.15.0
     */
    PropertyId[PropertyId["PronunciationAssessment_ReferenceText"] = 59] = "PronunciationAssessment_ReferenceText";
    /**
     * The point system for pronunciation score calibration (FivePoint or HundredMark).
     * Under normal circumstances, you shouldn't have to use this property directly.
     * Added in version 1.15.0
     */
    PropertyId[PropertyId["PronunciationAssessment_GradingSystem"] = 60] = "PronunciationAssessment_GradingSystem";
    /**
     * The pronunciation evaluation granularity (Phoneme, Word, or FullText).
     * Under normal circumstances, you shouldn't have to use this property directly.
     * Added in version 1.15.0
     */
    PropertyId[PropertyId["PronunciationAssessment_Granularity"] = 61] = "PronunciationAssessment_Granularity";
    /**
     * Defines if enable miscue calculation.
     * With this enabled, the pronounced words will be compared to the reference text,
     * and will be marked with omission/insertion based on the comparison. The default setting is False.
     * Under normal circumstances, you shouldn't have to use this property directly.
     * Added in version 1.15.0
     */
    PropertyId[PropertyId["PronunciationAssessment_EnableMiscue"] = 62] = "PronunciationAssessment_EnableMiscue";
    /**
     * The json string of pronunciation assessment parameters
     * Under normal circumstances, you shouldn't have to use this property directly.
     * Added in version 1.15.0
     */
    PropertyId[PropertyId["PronunciationAssessment_Json"] = 63] = "PronunciationAssessment_Json";
    /**
     * Pronunciation assessment parameters.
     * This property is intended to be read-only. The SDK is using it internally.
     * Added in version 1.15.0
     */
    PropertyId[PropertyId["PronunciationAssessment_Params"] = 64] = "PronunciationAssessment_Params";
    /**
     * Specifies whether to allow load of data URL for web worker
     * Allowed values are "off" and "on". Default is "on".
     * Added in version 1.32.0
     */
    PropertyId[PropertyId["WebWorkerLoadType"] = 65] = "WebWorkerLoadType";
    /**
     * Talking avatar service WebRTC session description protocol.
     * This property is intended to be read-only. The SDK is using it internally.
     * Added in version 1.33.0
     */
    PropertyId[PropertyId["TalkingAvatarService_WebRTC_SDP"] = 66] = "TalkingAvatarService_WebRTC_SDP";
    /**
     * The timeout (in milliseconds) for stopping a recognizer.
     * When set, if stopContinuousRecognitionAsync() doesn't complete within this time
     * (due to the service being behind in processing audio), the operation will be
     * cancelled and an error will be thrown.
     *
     * If not set or set to 0, the stop operation will wait indefinitely for the service
     * to complete (existing behavior).
     *
     * Note: This timeout only applies to the graceful stop operation. It does not affect
     * the disconnect() method which always cancels immediately.
     *
     * Added in version 1.48.0
     */
    PropertyId[PropertyId["Recognizer_StopTimeoutMs"] = 67] = "Recognizer_StopTimeoutMs";
    /**
     * The recognition latency in milliseconds. Read-only, available on speech/translation recognition results.
     * This measures the latency between when an audio input is received by the SDK, and the moment the result
     * is received from the service.
     * The SDK computes the time difference between the last audio fragment from the audio input that is
     * contributing to the result, and the time the result is received from the speech service.
     * Added in version 1.48.0
     */
    PropertyId[PropertyId["SpeechServiceResponse_RecognitionLatencyMs"] = 68] = "SpeechServiceResponse_RecognitionLatencyMs";
    /**
     * The speech synthesis first byte latency in milliseconds. Read-only, available on speech synthesis results.
     * This measures the time from when the synthesis request is sent to when the first audio byte is received
     * from the service, including network latency.
     */
    PropertyId[PropertyId["SpeechServiceResponse_SynthesisFirstByteLatencyMs"] = 69] = "SpeechServiceResponse_SynthesisFirstByteLatencyMs";
    /**
     * The speech synthesis finish latency in milliseconds. Read-only, available on speech synthesis results.
     * This measures the time from when the synthesis request is sent to when the full synthesized audio is
     * received from the service, including network latency.
     */
    PropertyId[PropertyId["SpeechServiceResponse_SynthesisFinishLatencyMs"] = 70] = "SpeechServiceResponse_SynthesisFinishLatencyMs";
    /**
     * The speech synthesis connection latency in milliseconds. Read-only, available on speech synthesis results.
     * This measures the time to establish the WebSocket connection to the service.
     * If the connection is reused from a previous synthesis, this value is 0.
     */
    PropertyId[PropertyId["SpeechServiceResponse_SynthesisConnectionLatencyMs"] = 71] = "SpeechServiceResponse_SynthesisConnectionLatencyMs";
    /**
     * The speech synthesis network latency in milliseconds. Read-only, available on speech synthesis results.
     * This measures the network round-trip time between the client and the Azure TTS service.
     */
    PropertyId[PropertyId["SpeechServiceResponse_SynthesisNetworkLatencyMs"] = 72] = "SpeechServiceResponse_SynthesisNetworkLatencyMs";
    /**
     * The speech synthesis service latency in milliseconds. Read-only, available on speech synthesis results.
     * This measures the time from when the Azure TTS service receives the synthesis request to when it sends
     * back the first audio chunk.
     */
    PropertyId[PropertyId["SpeechServiceResponse_SynthesisServiceLatencyMs"] = 73] = "SpeechServiceResponse_SynthesisServiceLatencyMs";
    /*
     * The pitch of the voice for a speech synthesis request.
     * @member PropertyId.SpeechSynthesisRequest_Pitch
     */
    PropertyId[PropertyId["SpeechSynthesisRequest_Pitch"] = 74] = "SpeechSynthesisRequest_Pitch";
    /**
     * The speaking rate of the voice for a speech synthesis request.
     * @member PropertyId.SpeechSynthesisRequest_Rate
     */
    PropertyId[PropertyId["SpeechSynthesisRequest_Rate"] = 75] = "SpeechSynthesisRequest_Rate";
    /**
     * The volume of the voice for a speech synthesis request.
     * @member PropertyId.SpeechSynthesisRequest_Volume
     */
    PropertyId[PropertyId["SpeechSynthesisRequest_Volume"] = 76] = "SpeechSynthesisRequest_Volume";
    /**
     * The style of the voice for a speech synthesis request.
     * @member PropertyId.SpeechSynthesisRequest_Style
     */
    PropertyId[PropertyId["SpeechSynthesisRequest_Style"] = 77] = "SpeechSynthesisRequest_Style";
    /**
     * The temperature of the voice synthesis for a speech synthesis request.
     * @member PropertyId.SpeechSynthesisRequest_Temperature
     */
    PropertyId[PropertyId["SpeechSynthesisRequest_Temperature"] = 78] = "SpeechSynthesisRequest_Temperature";
    /**
     * The custom lexicon URL for a speech synthesis request.
     * @member PropertyId.SpeechSynthesisRequest_CustomLexiconUrl
     */
    PropertyId[PropertyId["SpeechSynthesisRequest_CustomLexiconUrl"] = 79] = "SpeechSynthesisRequest_CustomLexiconUrl";
    /**
     * The preferred locales for a speech synthesis request.
     * @member PropertyId.SpeechSynthesisRequest_PreferLocales
     */
    PropertyId[PropertyId["SpeechSynthesisRequest_PreferLocales"] = 80] = "SpeechSynthesisRequest_PreferLocales";
    /**
     * The frame timeout interval (in ticks) for speech synthesis.
     * @member PropertyId.SpeechSynthesis_FrameTimeoutInterval
     */
    PropertyId[PropertyId["SpeechSynthesis_FrameTimeoutInterval"] = 81] = "SpeechSynthesis_FrameTimeoutInterval";
    /**
     * The RTF (Real-Time Factor) timeout threshold for speech synthesis.
     * @member PropertyId.SpeechSynthesis_RtfTimeoutThreshold
     */
    PropertyId[PropertyId["SpeechSynthesis_RtfTimeoutThreshold"] = 82] = "SpeechSynthesis_RtfTimeoutThreshold";
})(PropertyId = exports.PropertyId || (exports.PropertyId = {}));



/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Recognizer = void 0;
const Exports_js_1 = __webpack_require__(2);
const Exports_js_2 = __webpack_require__(4);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_3 = __webpack_require__(85);
/**
 * Defines the base class Recognizer which mainly contains common event handlers.
 * @class Recognizer
 */
class Recognizer {
    /**
     * Creates and initializes an instance of a Recognizer
     * @constructor
     * @param {AudioConfig} audioInput - An optional audio input stream associated with the recognizer
     * @param {PropertyCollection} properties - A set of properties to set on the recognizer
     * @param {IConnectionFactory} connectionFactory - The factory class used to create a custom IConnection for the recognizer
     */
    constructor(audioConfig, properties, connectionFactory, tokenCredential) {
        this.audioConfig = (audioConfig !== undefined) ? audioConfig : Exports_js_3.AudioConfig.fromDefaultMicrophoneInput();
        this.privDisposed = false;
        this.privProperties = properties.clone();
        this.privConnectionFactory = connectionFactory;
        this.tokenCredential = tokenCredential;
        this.implCommonRecognizerSetup();
    }
    /**
     * Dispose of associated resources.
     * @member Recognizer.prototype.close
     * @function
     * @public
     */
    close(cb, errorCb) {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposed);
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.dispose(true), cb, errorCb);
    }
    /**
     * @Internal
     * Internal data member to support fromRecognizer* pattern methods on other classes.
     * Do not use externally, object returned will change without warning or notice.
     */
    get internalData() {
        return this.privReco;
    }
    /**
     * This method performs cleanup of resources.
     * The Boolean parameter disposing indicates whether the method is called
     * from Dispose (if disposing is true) or from the finalizer (if disposing is false).
     * Derived classes should override this method to dispose resource if needed.
     * @member Recognizer.prototype.dispose
     * @function
     * @public
     * @param {boolean} disposing - Flag to request disposal.
     */
    async dispose(disposing) {
        if (this.privDisposed) {
            return;
        }
        this.privDisposed = true;
        if (disposing) {
            if (this.privReco) {
                await this.privReco.audioSource.turnOff();
                await this.privReco.dispose();
            }
        }
    }
    /**
     * This method returns the current state of the telemetry setting.
     * @member Recognizer.prototype.telemetryEnabled
     * @function
     * @public
     * @returns true if the telemetry is enabled, false otherwise.
     */
    static get telemetryEnabled() {
        return Exports_js_1.ServiceRecognizerBase.telemetryDataEnabled;
    }
    /**
     * This method globally enables or disables telemetry.
     * @member Recognizer.prototype.enableTelemetry
     * @function
     * @public
     * @param enabled - Global setting for telemetry collection.
     * If set to true, telemetry information like microphone errors,
     * recognition errors are collected and sent to Microsoft.
     * If set to false, no telemetry is sent to Microsoft.
     */
    static enableTelemetry(enabled) {
        Exports_js_1.ServiceRecognizerBase.telemetryDataEnabled = enabled;
    }
    // Does the generic recognizer setup that is common across all recognizer types.
    implCommonRecognizerSetup() {
        let osPlatform = (typeof window !== "undefined") ? "Browser" : "Node";
        let osName = "unknown";
        let osVersion = "unknown";
        if (typeof navigator !== "undefined") {
            osPlatform = osPlatform + "/" + navigator.platform;
            osName = navigator.userAgent;
            osVersion = navigator.appVersion;
        }
        const recognizerConfig = this.createRecognizerConfig(new Exports_js_1.SpeechServiceConfig(new Exports_js_1.Context(new Exports_js_1.OS(osPlatform, osName, osVersion))));
        this.privReco = this.createServiceRecognizer(Recognizer.getAuth(this.privProperties, this.tokenCredential), this.privConnectionFactory, this.audioConfig, recognizerConfig);
    }
    async recognizeOnceAsyncImpl(recognitionMode) {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposed);
        const ret = new Exports_js_2.Deferred();
        await this.implRecognizerStop();
        await this.privReco.recognize(recognitionMode, ret.resolve, ret.reject);
        const result = await ret.promise;
        await this.implRecognizerStop();
        return result;
    }
    async startContinuousRecognitionAsyncImpl(recognitionMode) {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposed);
        await this.implRecognizerStop();
        await this.privReco.recognize(recognitionMode, undefined, undefined);
    }
    async stopContinuousRecognitionAsyncImpl() {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposed);
        await this.implRecognizerStop();
    }
    async implRecognizerStop() {
        if (this.privReco) {
            // Get timeout property - undefined/empty means no timeout (existing behavior)
            const timeoutProperty = this.privProperties.getProperty(Exports_js_3.PropertyId.Recognizer_StopTimeoutMs, undefined);
            // Only apply timeout if explicitly set to a positive value
            if (timeoutProperty !== undefined && timeoutProperty !== "") {
                const timeoutMs = parseInt(timeoutProperty, 10);
                if (timeoutMs > 0) {
                    // User wants timeout protection
                    try {
                        await this.withTimeout(this.privReco.stopRecognizing(), timeoutMs, `Stop operation timed out after ${timeoutMs}ms waiting for service to complete turn`);
                    }
                    catch (error) {
                        // On timeout, use existing disconnect() which cancels immediately
                        await this.privReco.disconnect();
                        throw error;
                    }
                    return;
                }
            }
            // No timeout configured - use existing behavior (wait indefinitely)
            await this.privReco.stopRecognizing();
        }
        return;
    }
    withTimeout(promise, timeoutMs, errorMessage) {
        return Promise.race([
            promise,
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error(errorMessage));
                }, timeoutMs);
            })
        ]);
    }
    static getAuth(properties, tokenCredential) {
        const subscriptionKey = properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_Key, undefined);
        if (subscriptionKey && subscriptionKey !== "") {
            return new Exports_js_1.CognitiveSubscriptionKeyAuthentication(subscriptionKey);
        }
        if (tokenCredential) {
            return new Exports_js_1.CognitiveTokenAuthentication(async () => {
                try {
                    const tokenResponse = await tokenCredential.getToken("https://cognitiveservices.azure.com/.default");
                    return tokenResponse?.token ?? "";
                }
                catch (err) {
                    throw err;
                }
            }, async () => {
                try {
                    const tokenResponse = await tokenCredential.getToken("https://cognitiveservices.azure.com/.default");
                    return tokenResponse?.token ?? "";
                }
                catch (err) {
                    throw err;
                }
            });
        }
        return new Exports_js_1.CognitiveTokenAuthentication(() => {
            const authorizationToken = properties.getProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token, undefined);
            return Promise.resolve(authorizationToken);
        }, () => {
            const authorizationToken = properties.getProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token, undefined);
            return Promise.resolve(authorizationToken);
        });
    }
}
exports.Recognizer = Recognizer;



/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechRecognizer = void 0;
const Exports_js_1 = __webpack_require__(2);
const PhraseDetectionContext_js_1 = __webpack_require__(116);
const Exports_js_2 = __webpack_require__(4);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_3 = __webpack_require__(85);
/**
 * Performs speech recognition from microphone, file, or other audio input streams, and gets transcribed text as result.
 * @class SpeechRecognizer
 */
class SpeechRecognizer extends Exports_js_3.Recognizer {
    /**
     * SpeechRecognizer constructor.
     * @constructor
     * @param {SpeechConfig} speechConfig - an set of initial properties for this recognizer
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the recognizer
     */
    constructor(speechConfig, audioConfig) {
        const speechConfigImpl = speechConfig;
        Contracts_js_1.Contracts.throwIfNull(speechConfigImpl, "speechConfig");
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(speechConfigImpl.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage), Exports_js_3.PropertyId[Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage]);
        super(audioConfig, speechConfigImpl.properties, new Exports_js_1.SpeechConnectionFactory(), speechConfig.tokenCredential);
        this.privDisposedRecognizer = false;
    }
    /**
     * SpeechRecognizer constructor.
     * @constructor
     * @param {SpeechConfig} speechConfig - an set of initial properties for this recognizer
     * @param {AutoDetectSourceLanguageConfig} autoDetectSourceLanguageConfig - An source language detection configuration associated with the recognizer
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the recognizer
     */
    static FromConfig(speechConfig, autoDetectSourceLanguageConfig, audioConfig) {
        const speechConfigImpl = speechConfig;
        autoDetectSourceLanguageConfig.properties.mergeTo(speechConfigImpl.properties);
        const recognizer = new SpeechRecognizer(speechConfig, audioConfig);
        return recognizer;
    }
    /**
     * Gets the endpoint id of a customized speech model that is used for speech recognition.
     * @member SpeechRecognizer.prototype.endpointId
     * @function
     * @public
     * @returns {string} the endpoint id of a customized speech model that is used for speech recognition.
     */
    get endpointId() {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedRecognizer);
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_EndpointId, "00000000-0000-0000-0000-000000000000");
    }
    /**
     * Gets the authorization token used to communicate with the service.
     * @member SpeechRecognizer.prototype.authorizationToken
     * @function
     * @public
     * @returns {string} Authorization token.
     */
    get authorizationToken() {
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token);
    }
    /**
     * Gets/Sets the authorization token used to communicate with the service.
     * @member SpeechRecognizer.prototype.authorizationToken
     * @function
     * @public
     * @param {string} token - Authorization token.
     */
    set authorizationToken(token) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(token, "token");
        this.properties.setProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token, token);
    }
    /**
     * Gets the spoken language of recognition.
     * @member SpeechRecognizer.prototype.speechRecognitionLanguage
     * @function
     * @public
     * @returns {string} The spoken language of recognition.
     */
    get speechRecognitionLanguage() {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedRecognizer);
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage);
    }
    /**
     * Gets the output format of recognition.
     * @member SpeechRecognizer.prototype.outputFormat
     * @function
     * @public
     * @returns {OutputFormat} The output format of recognition.
     */
    get outputFormat() {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedRecognizer);
        if (this.properties.getProperty(Exports_js_1.OutputFormatPropertyName, Exports_js_3.OutputFormat[Exports_js_3.OutputFormat.Simple]) === Exports_js_3.OutputFormat[Exports_js_3.OutputFormat.Simple]) {
            return Exports_js_3.OutputFormat.Simple;
        }
        else {
            return Exports_js_3.OutputFormat.Detailed;
        }
    }
    /**
     * The collection of properties and their values defined for this SpeechRecognizer.
     * @member SpeechRecognizer.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The collection of properties and their values defined for this SpeechRecognizer.
     */
    get properties() {
        return this.privProperties;
    }
    /**
     * Starts speech recognition, and stops after the first utterance is recognized.
     * The task returns the recognition text as result.
     * Note: RecognizeOnceAsync() returns when the first utterance has been recognized,
     * so it is suitable only for single shot recognition
     * like command or query. For long-running recognition, use StartContinuousRecognitionAsync() instead.
     * @member SpeechRecognizer.prototype.recognizeOnceAsync
     * @function
     * @public
     * @param cb - Callback that received the SpeechRecognitionResult.
     * @param err - Callback invoked in case of an error.
     */
    recognizeOnceAsync(cb, err) {
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.recognizeOnceAsyncImpl(PhraseDetectionContext_js_1.RecognitionMode.Interactive), cb, err);
    }
    /**
     * Starts speech recognition, until stopContinuousRecognitionAsync() is called.
     * User must subscribe to events to receive recognition results.
     * @member SpeechRecognizer.prototype.startContinuousRecognitionAsync
     * @function
     * @public
     * @param cb - Callback invoked once the recognition has started.
     * @param err - Callback invoked in case of an error.
     */
    startContinuousRecognitionAsync(cb, err) {
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.startContinuousRecognitionAsyncImpl(this.properties.getProperty(Exports_js_1.ForceDictationPropertyName, undefined) === undefined ? PhraseDetectionContext_js_1.RecognitionMode.Conversation : PhraseDetectionContext_js_1.RecognitionMode.Dictation), cb, err);
    }
    /**
     * Stops continuous speech recognition.
     * @member SpeechRecognizer.prototype.stopContinuousRecognitionAsync
     * @function
     * @public
     * @param cb - Callback invoked once the recognition has stopped.
     * @param err - Callback invoked in case of an error.
     */
    stopContinuousRecognitionAsync(cb, err) {
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.stopContinuousRecognitionAsyncImpl(), cb, err);
    }
    /**
     * Starts speech recognition with keyword spotting, until
     * stopKeywordRecognitionAsync() is called.
     * User must subscribe to events to receive recognition results.
     * Note: Key word spotting functionality is only available on the
     * Speech Devices SDK. This functionality is currently not included in the SDK itself.
     * @member SpeechRecognizer.prototype.startKeywordRecognitionAsync
     * @function
     * @public
     * @param {KeywordRecognitionModel} model The keyword recognition model that
     * specifies the keyword to be recognized.
     * @param cb - Callback invoked once the recognition has started.
     * @param err - Callback invoked in case of an error.
     */
    startKeywordRecognitionAsync(model, cb, err) {
        Contracts_js_1.Contracts.throwIfNull(model, "model");
        if (!!err) {
            err("Not yet implemented.");
        }
    }
    /**
     * Stops continuous speech recognition.
     * Note: Key word spotting functionality is only available on the
     * Speech Devices SDK. This functionality is currently not included in the SDK itself.
     * @member SpeechRecognizer.prototype.stopKeywordRecognitionAsync
     * @function
     * @public
     * @param cb - Callback invoked once the recognition has stopped.
     * @param err - Callback invoked in case of an error.
     */
    stopKeywordRecognitionAsync(cb) {
        if (!!cb) {
            cb();
        }
    }
    /**
     * closes all external resources held by an instance of this class.
     * @member SpeechRecognizer.prototype.close
     * @function
     * @public
     */
    close(cb, errorCb) {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedRecognizer);
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.dispose(true), cb, errorCb);
    }
    /**
     * Disposes any resources held by the object.
     * @member SpeechRecognizer.prototype.dispose
     * @function
     * @public
     * @param {boolean} disposing - true if disposing the object.
     */
    async dispose(disposing) {
        if (this.privDisposedRecognizer) {
            return;
        }
        if (disposing) {
            this.privDisposedRecognizer = true;
            await this.implRecognizerStop();
        }
        await super.dispose(disposing);
    }
    createRecognizerConfig(speechConfig) {
        return new Exports_js_1.RecognizerConfig(speechConfig, this.privProperties);
    }
    createServiceRecognizer(authentication, connectionFactory, audioConfig, recognizerConfig) {
        const configImpl = audioConfig;
        return new Exports_js_1.SpeechServiceRecognizer(authentication, connectionFactory, configImpl, recognizerConfig, this);
    }
}
exports.SpeechRecognizer = SpeechRecognizer;



/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechStartEventSensitivity = exports.RecognitionMode = void 0;
/**
 * The Recognition modes
 */
var RecognitionMode;
(function (RecognitionMode) {
    RecognitionMode["Interactive"] = "Interactive";
    RecognitionMode["Dictation"] = "Dictation";
    RecognitionMode["Conversation"] = "Conversation";
    RecognitionMode["None"] = "None";
})(RecognitionMode = exports.RecognitionMode || (exports.RecognitionMode = {}));
/**
 * The speech start event sensitivity.
 */
var SpeechStartEventSensitivity;
(function (SpeechStartEventSensitivity) {
    SpeechStartEventSensitivity["Low"] = "low";
    SpeechStartEventSensitivity["Medium"] = "medium";
    SpeechStartEventSensitivity["High"] = "high";
})(SpeechStartEventSensitivity = exports.SpeechStartEventSensitivity || (exports.SpeechStartEventSensitivity = {}));



/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationRecognizer = void 0;
const Exports_js_1 = __webpack_require__(2);
const PhraseDetectionContext_js_1 = __webpack_require__(116);
const Exports_js_2 = __webpack_require__(4);
const Connection_js_1 = __webpack_require__(118);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_3 = __webpack_require__(85);
/**
 * Translation recognizer
 * @class TranslationRecognizer
 */
class TranslationRecognizer extends Exports_js_3.Recognizer {
    /**
     * Initializes an instance of the TranslationRecognizer.
     * @constructor
     * @param {SpeechTranslationConfig} speechConfig - Set of properties to configure this recognizer.
     * @param {AudioConfig} audioConfig - An optional audio config associated with the recognizer
     * @param {IConnectionFactory} connectionFactory - An optional connection factory to use to generate the endpoint URIs, headers to set, etc...
     */
    constructor(speechConfig, audioConfig, connectionFactory) {
        const configImpl = speechConfig;
        Contracts_js_1.Contracts.throwIfNull(configImpl, "speechConfig");
        super(audioConfig, configImpl.properties, connectionFactory || new Exports_js_1.TranslationConnectionFactory(), speechConfig.tokenCredential);
        this.privDisposedTranslationRecognizer = false;
        if (this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationVoice, undefined) !== undefined) {
            Contracts_js_1.Contracts.throwIfNullOrWhitespace(this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationVoice), Exports_js_3.PropertyId[Exports_js_3.PropertyId.SpeechServiceConnection_TranslationVoice]);
        }
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationToLanguages), Exports_js_3.PropertyId[Exports_js_3.PropertyId.SpeechServiceConnection_TranslationToLanguages]);
        if (this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages, undefined) === undefined) {
            Contracts_js_1.Contracts.throwIfNullOrWhitespace(this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage), Exports_js_3.PropertyId[Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage]);
        }
    }
    /**
     * TranslationRecognizer constructor.
     * @constructor
     * @param {SpeechTranslationConfig} speechTranslationConfig - an set of initial properties for this recognizer
     * @param {AutoDetectSourceLanguageConfig} autoDetectSourceLanguageConfig - An source language detection configuration associated with the recognizer
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the recognizer
     */
    static FromConfig(speechTranslationConfig, autoDetectSourceLanguageConfig, audioConfig) {
        const speechTranslationConfigImpl = speechTranslationConfig;
        autoDetectSourceLanguageConfig.properties.mergeTo(speechTranslationConfigImpl.properties);
        if (autoDetectSourceLanguageConfig.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages, undefined) === Exports_js_1.AutoDetectSourceLanguagesOpenRangeOptionName) {
            speechTranslationConfigImpl.properties.setProperty(Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage, "en-US");
        }
        return new TranslationRecognizer(speechTranslationConfig, audioConfig);
    }
    /**
     * Gets the language name that was set when the recognizer was created.
     * @member TranslationRecognizer.prototype.speechRecognitionLanguage
     * @function
     * @public
     * @returns {string} Gets the language name that was set when the recognizer was created.
     */
    get speechRecognitionLanguage() {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedTranslationRecognizer);
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage);
    }
    /**
     * Gets target languages for translation that were set when the recognizer was created.
     * The language is specified in BCP-47 format. The translation will provide translated text for each of language.
     * @member TranslationRecognizer.prototype.targetLanguages
     * @function
     * @public
     * @returns {string[]} Gets target languages for translation that were set when the recognizer was created.
     */
    get targetLanguages() {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedTranslationRecognizer);
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationToLanguages).split(",");
    }
    /**
     * Gets the name of output voice.
     * @member TranslationRecognizer.prototype.voiceName
     * @function
     * @public
     * @returns {string} the name of output voice.
     */
    get voiceName() {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedTranslationRecognizer);
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationVoice, undefined);
    }
    /**
     * The collection of properties and their values defined for this TranslationRecognizer.
     * @member TranslationRecognizer.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The collection of properties and their values defined for this TranslationRecognizer.
     */
    get properties() {
        return this.privProperties;
    }
    /**
     * Gets the authorization token used to communicate with the service.
     * @member TranslationRecognizer.prototype.authorizationToken
     * @function
     * @public
     * @returns {string} Authorization token.
     */
    get authorizationToken() {
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token);
    }
    /**
     * Gets/Sets the authorization token used to communicate with the service.
     * @member TranslationRecognizer.prototype.authorizationToken
     * @function
     * @public
     * @param {string} value - Authorization token.
     */
    set authorizationToken(value) {
        this.properties.setProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token, value);
    }
    /**
     * Starts recognition and translation, and stops after the first utterance is recognized.
     * The task returns the translation text as result.
     * Note: recognizeOnceAsync returns when the first utterance has been recognized, so it is suitable only
     * for single shot recognition like command or query. For long-running recognition,
     * use startContinuousRecognitionAsync() instead.
     * @member TranslationRecognizer.prototype.recognizeOnceAsync
     * @function
     * @public
     * @param cb - Callback that received the result when the translation has completed.
     * @param err - Callback invoked in case of an error.
     */
    recognizeOnceAsync(cb, err) {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedTranslationRecognizer);
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.recognizeOnceAsyncImpl(PhraseDetectionContext_js_1.RecognitionMode.Interactive), cb, err);
    }
    /**
     * Starts recognition and translation, until stopContinuousRecognitionAsync() is called.
     * User must subscribe to events to receive translation results.
     * @member TranslationRecognizer.prototype.startContinuousRecognitionAsync
     * @function
     * @public
     * @param cb - Callback that received the translation has started.
     * @param err - Callback invoked in case of an error.
     */
    startContinuousRecognitionAsync(cb, err) {
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.startContinuousRecognitionAsyncImpl(PhraseDetectionContext_js_1.RecognitionMode.Conversation), cb, err);
    }
    /**
     * Stops continuous recognition and translation.
     * @member TranslationRecognizer.prototype.stopContinuousRecognitionAsync
     * @function
     * @public
     * @param cb - Callback that received the translation has stopped.
     * @param err - Callback invoked in case of an error.
     */
    stopContinuousRecognitionAsync(cb, err) {
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.stopContinuousRecognitionAsyncImpl(), cb, err);
    }
    /**
     * dynamically remove a language from list of target language
     * (can be used while recognition is ongoing)
     * @member TranslationRecognizer.prototype.removeTargetLanguage
     * @function
     * @param lang - language to be removed
     * @public
     */
    removeTargetLanguage(lang) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(lang, "language to be removed");
        if (this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationToLanguages, undefined) !== undefined) {
            const languages = this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationToLanguages).split(",");
            const index = languages.indexOf(lang);
            if (index > -1) {
                languages.splice(index, 1);
                this.properties.setProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationToLanguages, languages.join(","));
                this.updateLanguages(languages);
            }
        }
    }
    /**
     * dynamically add a language to list of target language
     * (can be used while recognition is ongoing)
     * @member TranslationRecognizer.prototype.addTargetLanguage
     * @function
     * @param lang - language to be added
     * @public
     */
    addTargetLanguage(lang) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(lang, "language to be added");
        let languages = [];
        if (this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationToLanguages, undefined) !== undefined) {
            languages = this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationToLanguages).split(",");
            if (!languages.includes(lang)) {
                languages.push(lang);
                this.properties.setProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationToLanguages, languages.join(","));
            }
        }
        else {
            this.properties.setProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationToLanguages, lang);
            languages = [lang];
        }
        this.updateLanguages(languages);
    }
    /**
     * closes all external resources held by an instance of this class.
     * @member TranslationRecognizer.prototype.close
     * @function
     * @public
     */
    close(cb, errorCb) {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedTranslationRecognizer);
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.dispose(true), cb, errorCb);
    }
    /**
     * handles ConnectionEstablishedEvent for conversation translation scenarios.
     * @member TranslationRecognizer.prototype.onConnection
     * @function
     * @public
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onConnection() { }
    async dispose(disposing) {
        if (this.privDisposedTranslationRecognizer) {
            return;
        }
        this.privDisposedTranslationRecognizer = true;
        if (disposing) {
            await this.implRecognizerStop();
            await super.dispose(disposing);
        }
    }
    createRecognizerConfig(speechConfig) {
        return new Exports_js_1.RecognizerConfig(speechConfig, this.privProperties);
    }
    createServiceRecognizer(authentication, connectionFactory, audioConfig, recognizerConfig) {
        const configImpl = audioConfig;
        return new Exports_js_1.TranslationServiceRecognizer(authentication, connectionFactory, configImpl, recognizerConfig, this);
    }
    updateLanguages(languages) {
        const conn = Connection_js_1.Connection.fromRecognizer(this);
        if (!!conn) {
            conn.setMessageProperty("speech.context", "translationcontext", { to: languages });
            const voiceName = this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_TranslationVoice, undefined);
            let payload;
            if (!!voiceName) {
                const languageToVoiceMap = {};
                for (const lang of languages) {
                    languageToVoiceMap[lang] = voiceName;
                }
                payload = JSON.stringify({
                    id: "translation",
                    name: "updateLanguage",
                    synthesis: { defaultVoices: languageToVoiceMap },
                    to: languages,
                });
            }
            else {
                payload = JSON.stringify({
                    id: "translation",
                    name: "updateLanguage",
                    to: languages
                });
            }
            conn.sendMessageAsync("event", payload);
        }
    }
}
exports.TranslationRecognizer = TranslationRecognizer;



/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Connection = void 0;
const Exports_js_1 = __webpack_require__(2);
const Exports_js_2 = __webpack_require__(4);
const ConnectionMessage_js_1 = __webpack_require__(119);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_3 = __webpack_require__(85);
/**
 * Connection is a proxy class for managing connection to the speech service of the specified Recognizer.
 * By default, a Recognizer autonomously manages connection to service when needed.
 * The Connection class provides additional methods for users to explicitly open or close a connection and
 * to subscribe to connection status changes.
 * The use of Connection is optional, and mainly for scenarios where fine tuning of application
 * behavior based on connection status is needed. Users can optionally call Open() to manually set up a connection
 * in advance before starting recognition on the Recognizer associated with this Connection.
 * If the Recognizer needs to connect or disconnect to service, it will
 * setup or shutdown the connection independently. In this case the Connection will be notified by change of connection
 * status via Connected/Disconnected events.
 * Added in version 1.2.1.
 */
class Connection {
    /**
     * Gets the Connection instance from the specified recognizer.
     * @param recognizer The recognizer associated with the connection.
     * @return The Connection instance of the recognizer.
     */
    static fromRecognizer(recognizer) {
        const recoBase = recognizer.internalData;
        const ret = new Connection();
        ret.privInternalData = recoBase;
        ret.setupEvents();
        return ret;
    }
    /**
     * Gets the Connection instance from the specified synthesizer.
     * @param synthesizer The synthesizer associated with the connection.
     * @return The Connection instance of the synthesizer.
     */
    static fromSynthesizer(synthesizer) {
        const synthBase = synthesizer.internalData;
        const ret = new Connection();
        ret.privInternalData = synthBase;
        ret.setupEvents();
        return ret;
    }
    /**
     * Starts to set up connection to the service.
     * Users can optionally call openConnection() to manually set up a connection in advance before starting recognition on the
     * Recognizer associated with this Connection. After starting recognition, calling Open() will have no effect
     *
     * Note: On return, the connection might not be ready yet. Please subscribe to the Connected event to
     * be notified when the connection is established.
     */
    openConnection(cb, err) {
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.privInternalData.connect(), cb, err);
    }
    /**
     * Closes the connection the service.
     * Users can optionally call closeConnection() to manually shutdown the connection of the associated Recognizer.
     *
     * If closeConnection() is called during recognition, recognition will fail and cancel with an error.
     */
    closeConnection(cb, err) {
        if (this.privInternalData instanceof Exports_js_1.SynthesisAdapterBase) {
            throw new Error("Disconnecting a synthesizer's connection is currently not supported");
        }
        else {
            (0, Exports_js_2.marshalPromiseToCallbacks)(this.privInternalData.disconnect(), cb, err);
        }
    }
    /**
     * Appends a parameter in a message to service.
     * Added in version 1.12.1.
     * @param path The path of the network message.
     * @param propertyName Name of the property
     * @param propertyValue Value of the property. This is a json string.
     */
    setMessageProperty(path, propertyName, propertyValue) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(propertyName, "propertyName");
        if (this.privInternalData instanceof Exports_js_1.ServiceRecognizerBase) {
            if (path.toLowerCase() !== "speech.context") {
                throw new Error("Only speech.context message property sets are currently supported for recognizer");
            }
            else {
                const context = this.privInternalData.speechContext.getContext();
                context[propertyName] = propertyValue;
            }
        }
        else if (this.privInternalData instanceof Exports_js_1.SynthesisAdapterBase) {
            if (path.toLowerCase() !== "speech.config" && path.toLowerCase() !== "synthesis.context") {
                throw new Error("Only speech.config and synthesis.context message paths are currently supported for synthesizer");
            }
            else if (path.toLowerCase() === "speech.config") {
                if (propertyName.toLowerCase() !== "context") {
                    throw new Error("Only context property is currently supported for speech.config message path for synthesizer");
                }
                else {
                    this.privInternalData.synthesizerConfig.setContextFromJson(propertyValue);
                }
            }
            else {
                this.privInternalData.synthesisContext.setSection(propertyName, propertyValue);
            }
        }
    }
    /**
     * Sends a message to the speech service.
     * Added in version 1.13.0.
     * @param path The WebSocket path of the message
     * @param payload The payload of the message. This is a json string or a ArrayBuffer.
     * @param success A callback to indicate success.
     * @param error A callback to indicate an error.
     */
    sendMessageAsync(path, payload, success, error) {
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.privInternalData.sendNetworkMessage(path, payload), success, error);
    }
    /**
     * Dispose of associated resources.
     */
    close() {
        /* eslint-disable no-empty */
    }
    setupEvents() {
        this.privEventListener = this.privInternalData.connectionEvents.attach((connectionEvent) => {
            if (connectionEvent.name === "ConnectionEstablishedEvent") {
                if (!!this.connected) {
                    this.connected(new Exports_js_3.ConnectionEventArgs(connectionEvent.connectionId));
                }
            }
            else if (connectionEvent.name === "ConnectionClosedEvent") {
                if (!!this.disconnected) {
                    this.disconnected(new Exports_js_3.ConnectionEventArgs(connectionEvent.connectionId));
                }
            }
            else if (connectionEvent.name === "ConnectionMessageSentEvent") {
                if (!!this.messageSent) {
                    this.messageSent(new Exports_js_3.ConnectionMessageEventArgs(new ConnectionMessage_js_1.ConnectionMessageImpl(connectionEvent.message)));
                }
            }
            else if (connectionEvent.name === "ConnectionMessageReceivedEvent") {
                if (!!this.messageReceived) {
                    this.messageReceived(new Exports_js_3.ConnectionMessageEventArgs(new ConnectionMessage_js_1.ConnectionMessageImpl(connectionEvent.message)));
                }
            }
        });
        this.privServiceEventListener = this.privInternalData.serviceEvents.attach((e) => {
            if (!!this.receivedServiceMessage) {
                this.receivedServiceMessage(new Exports_js_3.ServiceEventArgs(e.jsonString, e.name));
            }
        });
    }
}
exports.Connection = Connection;



/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionMessageImpl = exports.ConnectionMessage = void 0;
// eslint-disable-next-line max-classes-per-file
const HeaderNames_js_1 = __webpack_require__(59);
const Exports_js_1 = __webpack_require__(4);
const PropertyCollection_js_1 = __webpack_require__(112);
const PropertyId_js_1 = __webpack_require__(113);
/**
 * ConnectionMessage represents implementation specific messages sent to and received from
 * the speech service. These messages are provided for debugging purposes and should not
 * be used for production use cases with the Azure Cognitive Services Speech Service.
 * Messages sent to and received from the Speech Service are subject to change without
 * notice. This includes message contents, headers, payloads, ordering, etc.
 * Added in version 1.11.0.
 */
class ConnectionMessage {
}
exports.ConnectionMessage = ConnectionMessage;
class ConnectionMessageImpl {
    constructor(message) {
        this.privConnectionMessage = message;
        this.privProperties = new PropertyCollection_js_1.PropertyCollection();
        if (!!this.privConnectionMessage.headers[HeaderNames_js_1.HeaderNames.ConnectionId]) {
            this.privProperties.setProperty(PropertyId_js_1.PropertyId.Speech_SessionId, this.privConnectionMessage.headers[HeaderNames_js_1.HeaderNames.ConnectionId]);
        }
        Object.keys(this.privConnectionMessage.headers).forEach((header) => {
            this.privProperties.setProperty(header, this.privConnectionMessage.headers[header]);
        });
    }
    /**
     * The message path.
     */
    get path() {
        return this.privConnectionMessage.headers[Object.keys(this.privConnectionMessage.headers).find((key) => key.toLowerCase() === "path".toLowerCase())];
    }
    /**
     * Checks to see if the ConnectionMessage is a text message.
     * See also IsBinaryMessage().
     */
    get isTextMessage() {
        return this.privConnectionMessage.messageType === Exports_js_1.MessageType.Text;
    }
    /**
     * Checks to see if the ConnectionMessage is a binary message.
     * See also GetBinaryMessage().
     */
    get isBinaryMessage() {
        return this.privConnectionMessage.messageType === Exports_js_1.MessageType.Binary;
    }
    /**
     * Gets the text message payload. Typically the text message content-type is
     * application/json. To determine other content-types use
     * Properties.GetProperty("Content-Type").
     */
    get TextMessage() {
        return this.privConnectionMessage.textBody;
    }
    /**
     * Gets the binary message payload.
     */
    get binaryMessage() {
        return this.privConnectionMessage.binaryBody;
    }
    /**
     * A collection of properties and their values defined for this <see cref="ConnectionMessage"/>.
     * Message headers can be accessed via this collection (e.g. "Content-Type").
     */
    get properties() {
        return this.privProperties;
    }
    /**
     * Returns a string that represents the connection message.
     */
    toString() {
        return "";
    }
}
exports.ConnectionMessageImpl = ConnectionMessageImpl;



/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Translations = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Represents collection of parameters and their values.
 * @class Translations
 */
class Translations {
    constructor() {
        // Use an PropertyCollection internally, just wrapping it to hide the | enum syntax it has.
        this.privMap = new Exports_js_1.PropertyCollection();
    }
    /**
     * Get the languages in the object in a String array.
     * @member Translations.prototype.languages
     * @function
     * @public
     * @returns {string[]} languages in translations object.
     */
    get languages() {
        return this.privMap.keys;
    }
    /**
     * Returns the parameter value in type String. The parameter must have the same type as String.
     * Currently only String, int and bool are allowed.
     * If the name is not available, the specified defaultValue is returned.
     * @member Translations.prototype.get
     * @function
     * @public
     * @param {string} key - The parameter name.
     * @param {string} def - The default value which is returned if the parameter is not available in the collection.
     * @returns {string} value of the parameter.
     */
    get(key, def) {
        return this.privMap.getProperty(key, def);
    }
    /**
     * Sets the String value of the parameter specified by name.
     * @member Translations.prototype.set
     * @function
     * @public
     * @param {string} key - The parameter name.
     * @param {string} value - The value of the parameter.
     */
    set(key, value) {
        this.privMap.setProperty(key, value);
    }
}
exports.Translations = Translations;



/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoMatchReason = void 0;
/**
 * Defines the possible reasons a recognition result might not be recognized.
 * @class NoMatchReason
 */
var NoMatchReason;
(function (NoMatchReason) {
    /**
     * Indicates that speech was detected, but not recognized.
     * @member NoMatchReason.NotRecognized
     */
    NoMatchReason[NoMatchReason["NotRecognized"] = 0] = "NotRecognized";
    /**
     * Indicates that the start of the audio stream contained only silence,
     * and the service timed out waiting for speech.
     * @member NoMatchReason.InitialSilenceTimeout
     */
    NoMatchReason[NoMatchReason["InitialSilenceTimeout"] = 1] = "InitialSilenceTimeout";
    /**
     * Indicates that the start of the audio stream contained only noise,
     * and the service timed out waiting for speech.
     * @member NoMatchReason.InitialBabbleTimeout
     */
    NoMatchReason[NoMatchReason["InitialBabbleTimeout"] = 2] = "InitialBabbleTimeout";
})(NoMatchReason = exports.NoMatchReason || (exports.NoMatchReason = {}));



/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoMatchDetails = void 0;
const Exports_js_1 = __webpack_require__(2);
const Exports_js_2 = __webpack_require__(85);
/**
 * Contains detailed information for NoMatch recognition results.
 * @class NoMatchDetails
 */
class NoMatchDetails {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {NoMatchReason} reason - The no-match reason.
     */
    constructor(reason) {
        this.privReason = reason;
    }
    /**
     * Creates an instance of NoMatchDetails object for the NoMatch SpeechRecognitionResults.
     * @member NoMatchDetails.fromResult
     * @function
     * @public
     * @param {SpeechRecognitionResult | TranslationRecognitionResult}
     * result - The recognition result that was not recognized.
     * @returns {NoMatchDetails} The no match details object being created.
     */
    static fromResult(result) {
        const simpleSpeech = Exports_js_1.SimpleSpeechPhrase.fromJSON(result.json, 0); // Offset fixups are already done.
        let reason = Exports_js_2.NoMatchReason.NotRecognized;
        switch (simpleSpeech.RecognitionStatus) {
            case Exports_js_1.RecognitionStatus.BabbleTimeout:
                reason = Exports_js_2.NoMatchReason.InitialBabbleTimeout;
                break;
            case Exports_js_1.RecognitionStatus.InitialSilenceTimeout:
                reason = Exports_js_2.NoMatchReason.InitialSilenceTimeout;
                break;
            default:
                reason = Exports_js_2.NoMatchReason.NotRecognized;
                break;
        }
        return new NoMatchDetails(reason);
    }
    /**
     * The reason the recognition was canceled.
     * @member NoMatchDetails.prototype.reason
     * @function
     * @public
     * @returns {NoMatchReason} Specifies the reason canceled.
     */
    get reason() {
        return this.privReason;
    }
}
exports.NoMatchDetails = NoMatchDetails;



/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationRecognitionCanceledEventArgs = void 0;
/**
 * Define payload of speech recognition canceled result events.
 * @class TranslationRecognitionCanceledEventArgs
 */
class TranslationRecognitionCanceledEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} sessionid - The session id.
     * @param {CancellationReason} cancellationReason - The cancellation reason.
     * @param {string} errorDetails - Error details, if provided.
     * @param {TranslationRecognitionResult} result - The result.
     */
    constructor(sessionid, cancellationReason, errorDetails, errorCode, result) {
        this.privCancelReason = cancellationReason;
        this.privErrorDetails = errorDetails;
        this.privResult = result;
        this.privSessionId = sessionid;
        this.privErrorCode = errorCode;
    }
    /**
     * Specifies the recognition result.
     * @member TranslationRecognitionCanceledEventArgs.prototype.result
     * @function
     * @public
     * @returns {TranslationRecognitionResult} the recognition result.
     */
    get result() {
        return this.privResult;
    }
    /**
     * Specifies the session identifier.
     * @member TranslationRecognitionCanceledEventArgs.prototype.sessionId
     * @function
     * @public
     * @returns {string} the session identifier.
     */
    get sessionId() {
        return this.privSessionId;
    }
    /**
     * The reason the recognition was canceled.
     * @member TranslationRecognitionCanceledEventArgs.prototype.reason
     * @function
     * @public
     * @returns {CancellationReason} Specifies the reason canceled.
     */
    get reason() {
        return this.privCancelReason;
    }
    /**
     * The error code in case of an unsuccessful recognition.
     * Added in version 1.1.0.
     * @return An error code that represents the error reason.
     */
    get errorCode() {
        return this.privErrorCode;
    }
    /**
     * In case of an unsuccessful recognition, provides details of the occurred error.
     * @member TranslationRecognitionCanceledEventArgs.prototype.errorDetails
     * @function
     * @public
     * @returns {string} A String that represents the error details.
     */
    get errorDetails() {
        return this.privErrorDetails;
    }
}
exports.TranslationRecognitionCanceledEventArgs = TranslationRecognitionCanceledEventArgs;



/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CancellationDetailsBase = void 0;
/**
 * Contains detailed information about why a result was canceled.
 * @class CancellationDetailsBase
 */
class CancellationDetailsBase {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {CancellationReason} reason - The cancellation reason.
     * @param {string} errorDetails - The error details, if provided.
     */
    constructor(reason, errorDetails, errorCode) {
        this.privReason = reason;
        this.privErrorDetails = errorDetails;
        this.privErrorCode = errorCode;
    }
    /**
     * The reason the recognition was canceled.
     * @member CancellationDetailsBase.prototype.reason
     * @function
     * @public
     * @returns {CancellationReason} Specifies the reason canceled.
     */
    get reason() {
        return this.privReason;
    }
    /**
     * In case of an unsuccessful recognition, provides details of the occurred error.
     * @member CancellationDetailsBase.prototype.errorDetails
     * @function
     * @public
     * @returns {string} A String that represents the error details.
     */
    get errorDetails() {
        return this.privErrorDetails;
    }
    /**
     * The error code in case of an unsuccessful recognition.
     * Added in version 1.1.0.
     * @return An error code that represents the error reason.
     */
    get ErrorCode() {
        return this.privErrorCode;
    }
}
exports.CancellationDetailsBase = CancellationDetailsBase;



/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CancellationDetails = void 0;
const Exports_js_1 = __webpack_require__(2);
const CancellationDetailsBase_js_1 = __webpack_require__(124);
const Exports_js_2 = __webpack_require__(85);
/**
 * Contains detailed information about why a result was canceled.
 * @class CancellationDetails
 */
class CancellationDetails extends CancellationDetailsBase_js_1.CancellationDetailsBase {
    constructor(reason, errorDetails, errorCode) {
        super(reason, errorDetails, errorCode);
    }
    /**
     * Creates an instance of CancellationDetails object for the canceled RecognitionResult.
     * @member CancellationDetails.fromResult
     * @function
     * @public
     * @param {RecognitionResult | SpeechSynthesisResult} result - The result that was canceled.
     * @returns {CancellationDetails} The cancellation details object being created.
     */
    static fromResult(result) {
        let reason = Exports_js_2.CancellationReason.Error;
        let errorCode = Exports_js_2.CancellationErrorCode.NoError;
        if (result instanceof Exports_js_2.RecognitionResult && !!result.json) {
            const simpleSpeech = Exports_js_1.SimpleSpeechPhrase.fromJSON(result.json, 0); // Offset fixups are already done.
            reason = Exports_js_1.EnumTranslation.implTranslateCancelResult(simpleSpeech.RecognitionStatus);
        }
        if (!!result.properties) {
            errorCode = Exports_js_2.CancellationErrorCode[result.properties.getProperty(Exports_js_1.CancellationErrorCodePropertyName, Exports_js_2.CancellationErrorCode[Exports_js_2.CancellationErrorCode.NoError])];
        }
        return new CancellationDetails(reason, result.errorDetails || Exports_js_1.EnumTranslation.implTranslateErrorDetails(errorCode), errorCode);
    }
}
exports.CancellationDetails = CancellationDetails;



/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CancellationErrorCode = void 0;
/**
 * Defines error code in case that CancellationReason is Error.
 * Added in version 1.1.0.
 */
var CancellationErrorCode;
(function (CancellationErrorCode) {
    /**
     * Indicates that no error occurred during speech recognition.
     */
    CancellationErrorCode[CancellationErrorCode["NoError"] = 0] = "NoError";
    /**
     * Indicates an authentication error.
     */
    CancellationErrorCode[CancellationErrorCode["AuthenticationFailure"] = 1] = "AuthenticationFailure";
    /**
     * Indicates that one or more recognition parameters are invalid.
     */
    CancellationErrorCode[CancellationErrorCode["BadRequestParameters"] = 2] = "BadRequestParameters";
    /**
     * Indicates that the number of parallel requests exceeded the number of allowed
     * concurrent transcriptions for the subscription.
     */
    CancellationErrorCode[CancellationErrorCode["TooManyRequests"] = 3] = "TooManyRequests";
    /**
     * Indicates a connection error.
     */
    CancellationErrorCode[CancellationErrorCode["ConnectionFailure"] = 4] = "ConnectionFailure";
    /**
     * Indicates a time-out error when waiting for response from service.
     */
    CancellationErrorCode[CancellationErrorCode["ServiceTimeout"] = 5] = "ServiceTimeout";
    /**
     * Indicates that an error is returned by the service.
     */
    CancellationErrorCode[CancellationErrorCode["ServiceError"] = 6] = "ServiceError";
    /**
     * Indicates an unexpected runtime error.
     */
    CancellationErrorCode[CancellationErrorCode["RuntimeError"] = 7] = "RuntimeError";
    /**
     * Indicates an quota overrun on existing key.
     */
    CancellationErrorCode[CancellationErrorCode["Forbidden"] = 8] = "Forbidden";
})(CancellationErrorCode = exports.CancellationErrorCode || (exports.CancellationErrorCode = {}));



/***/ }),
/* 127 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionEventArgs = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Defines payload for connection events like Connected/Disconnected.
 * Added in version 1.2.0
 */
class ConnectionEventArgs extends Exports_js_1.SessionEventArgs {
}
exports.ConnectionEventArgs = ConnectionEventArgs;



/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceEventArgs = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Defines payload for any Service message event
 * Added in version 1.9.0
 */
class ServiceEventArgs extends Exports_js_1.SessionEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} json - json payload of the USP message.
     */
    constructor(json, name, sessionId) {
        super(sessionId);
        this.privJsonResult = json;
        this.privEventName = name;
    }
    get jsonString() {
        return this.privJsonResult;
    }
    get eventName() {
        return this.privEventName;
    }
}
exports.ServiceEventArgs = ServiceEventArgs;



/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhraseListGrammar = void 0;
const Contracts_js_1 = __webpack_require__(70);
/**
 * Allows additions of new phrases to improve speech recognition.
 *
 * Phrases added to the recognizer are effective at the start of the next recognition, or the next time the SpeechSDK must reconnect
 * to the speech service.
 */
class PhraseListGrammar {
    constructor(recogBase) {
        this.privGrammerBuilder = recogBase.dynamicGrammar;
    }
    /**
     * Creates a PhraseListGrammar from a given speech recognizer. Will accept any recognizer that derives from @class Recognizer.
     * @param recognizer The recognizer to add phrase lists to.
     */
    static fromRecognizer(recognizer) {
        const recoBase = recognizer.internalData;
        return new PhraseListGrammar(recoBase);
    }
    /**
     * Adds a single phrase to the current recognizer.
     * @param phrase Phrase to add.
     */
    addPhrase(phrase) {
        this.privGrammerBuilder.addPhrase(phrase);
    }
    /**
     * Adds multiple phrases to the current recognizer.
     * @param phrases Array of phrases to add.
     */
    addPhrases(phrases) {
        this.privGrammerBuilder.addPhrase(phrases);
    }
    /**
     * Clears all phrases added to the current recognizer.
     */
    clear() {
        this.privGrammerBuilder.clearPhrases();
    }
    /**
     * Sets the phrase list grammar biasing weight.
     * The allowed range is [0.0, 2.0].
     * The default weight is 1.0. Value zero disables the phrase list.
     * @param weight Phrase list grammar biasing weight.
     */
    setWeight(weight) {
        Contracts_js_1.Contracts.throwIfNumberOutOfRange(weight, "weight", 0.0, 2.0);
        this.privGrammerBuilder.setWeight(weight);
    }
}
exports.PhraseListGrammar = PhraseListGrammar;



/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DialogServiceConfigImpl = exports.DialogServiceConfig = void 0;
/* eslint-disable max-classes-per-file */
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_1 = __webpack_require__(85);
/**
 * Class that defines base configurations for dialog service connector
 * @class DialogServiceConfig
 */
class DialogServiceConfig {
    /**
     * Creates an instance of DialogService config.
     * @constructor
     */
    constructor() {
        return;
    }
    /**
     * Sets the corresponding backend application identifier.
     * @member DialogServiceConfig.prototype.Conversation_ApplicationId
     * @function
     * @public
     * @param {string} value - The application identifier to set.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    set applicationId(value) { }
    static get DialogTypes() {
        return {
            BotFramework: "bot_framework",
            CustomCommands: "custom_commands"
        };
    }
}
exports.DialogServiceConfig = DialogServiceConfig;
/**
 * Dialog Service configuration.
 * @class DialogServiceConfigImpl
 */
class DialogServiceConfigImpl extends DialogServiceConfig {
    /**
     * Creates an instance of dialogService config.
     */
    constructor() {
        super();
        this.privSpeechConfig = new Exports_js_1.SpeechConfigImpl();
    }
    /**
     * Provides access to custom properties.
     * @member DialogServiceConfigImpl.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The properties.
     */
    get properties() {
        return this.privSpeechConfig.properties;
    }
    /**
     * Gets the speech recognition language.
     * @member DialogServiceConfigImpl.prototype.speechRecognitionLanguage
     * @function
     * @public
     */
    get speechRecognitionLanguage() {
        return this.privSpeechConfig.speechRecognitionLanguage;
    }
    /**
     * Sets the speech recognition language.
     * @member DialogServiceConfigImpl.prototype.speechRecognitionLanguage
     * @function
     * @public
     * @param {string} value - The language to set.
     */
    set speechRecognitionLanguage(value) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(value, "value");
        this.privSpeechConfig.speechRecognitionLanguage = value;
    }
    get outputFormat() {
        return this.privSpeechConfig.outputFormat;
    }
    set outputFormat(value) {
        this.privSpeechConfig.outputFormat = value;
    }
    /**
     * Sets a named property as value
     * @member DialogServiceConfigImpl.prototype.setProperty
     * @function
     * @public
     * @param {PropertyId | string} name - The property to set.
     * @param {string} value - The value.
     */
    setProperty(name, value) {
        this.privSpeechConfig.setProperty(name, value);
    }
    /**
     * Sets a named property as value
     * @member DialogServiceConfigImpl.prototype.getProperty
     * @function
     * @public
     * @param {PropertyId | string} name - The property to get.
     * @param {string} def - The default value to return in case the property is not known.
     * @returns {string} The current value, or provided default, of the given property.
     */
    getProperty(name, def) {
        void def;
        return this.privSpeechConfig.getProperty(name);
    }
    /**
     * Sets the proxy configuration.
     * Only relevant in Node.js environments.
     * Added in version 1.4.0.
     * @param proxyHostName The host name of the proxy server, without the protocol scheme (http://)
     * @param proxyPort The port number of the proxy server.
     * @param proxyUserName The user name of the proxy server.
     * @param proxyPassword The password of the proxy server.
     */
    setProxy(proxyHostName, proxyPort, proxyUserName, proxyPassword) {
        this.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_ProxyHostName, proxyHostName);
        this.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_ProxyPort, `${proxyPort}`);
        if (proxyUserName) {
            this.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_ProxyUserName, proxyUserName);
        }
        if (proxyPassword) {
            this.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_ProxyPassword, proxyPassword);
        }
    }
    setServiceProperty(name, value, channel) {
        void channel;
        this.privSpeechConfig.setServiceProperty(name, value);
    }
    /**
     * Dispose of associated resources.
     * @member DialogServiceConfigImpl.prototype.close
     * @function
     * @public
     */
    close() {
        return;
    }
}
exports.DialogServiceConfigImpl = DialogServiceConfigImpl;



/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BotFrameworkConfig = void 0;
const Contracts_js_1 = __webpack_require__(70);
const DialogServiceConfig_js_1 = __webpack_require__(130);
const Exports_js_1 = __webpack_require__(85);
/**
 * Class that defines configurations for the dialog service connector object for using a Bot Framework backend.
 * @class BotFrameworkConfig
 */
class BotFrameworkConfig extends DialogServiceConfig_js_1.DialogServiceConfigImpl {
    /**
     * Creates an instance of BotFrameworkConfig.
     */
    constructor() {
        super();
    }
    /**
     * Creates a bot framework configuration instance with the provided subscription information.
     * @member BotFrameworkConfig.fromSubscription
     * @function
     * @public
     * @param subscription Subscription key associated with the bot
     * @param region The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @param botId Optional. Identifier for using a specific bot within an Azure resource group. Equivalent to the
     * resource name.
     * @returns {BotFrameworkConfig} A new bot framework configuration instance.
     */
    static fromSubscription(subscription, region, botId) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(subscription, "subscription");
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(region, "region");
        const botFrameworkConfig = new DialogServiceConfig_js_1.DialogServiceConfigImpl();
        botFrameworkConfig.setProperty(Exports_js_1.PropertyId.Conversation_DialogType, DialogServiceConfig_js_1.DialogServiceConfig.DialogTypes.BotFramework);
        botFrameworkConfig.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_Key, subscription);
        botFrameworkConfig.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_Region, region);
        if (botId) {
            botFrameworkConfig.setProperty(Exports_js_1.PropertyId.Conversation_ApplicationId, botId);
        }
        return botFrameworkConfig;
    }
    /**
     * Creates a bot framework configuration instance for the specified authorization token and region.
     * Note: The caller must ensure that an authorization token is valid. Before an authorization token expires, the
     * caller must refresh it by setting the authorizationToken property on the corresponding
     * DialogServiceConnector instance created with this config. The contents of configuration objects are copied
     * when connectors are created, so setting authorizationToken on a DialogServiceConnector will not update the
     * original configuration's authorization token. Create a new configuration instance or set the
     * SpeechServiceAuthorization_Token property to update an existing instance if it will be used to create
     * further DialogServiceConnectors.
     * @member BotFrameworkConfig.fromAuthorizationToken
     * @function
     * @public
     * @param authorizationToken The authorization token associated with the bot
     * @param region The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @param botId Optional. Identifier for using a specific bot within an Azure resource group. Equivalent to the
     * resource name.
     * @returns {BotFrameworkConfig} A new bot framework configuration instance.
     */
    static fromAuthorizationToken(authorizationToken, region, botId) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(authorizationToken, "authorizationToken");
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(region, "region");
        const botFrameworkConfig = new DialogServiceConfig_js_1.DialogServiceConfigImpl();
        botFrameworkConfig.setProperty(Exports_js_1.PropertyId.Conversation_DialogType, DialogServiceConfig_js_1.DialogServiceConfig.DialogTypes.BotFramework);
        botFrameworkConfig.setProperty(Exports_js_1.PropertyId.SpeechServiceAuthorization_Token, authorizationToken);
        botFrameworkConfig.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_Region, region);
        if (botId) {
            botFrameworkConfig.setProperty(Exports_js_1.PropertyId.Conversation_ApplicationId, botId);
        }
        return botFrameworkConfig;
    }
    /**
     * Creates an instance of a BotFrameworkConfig.
     * This method is intended only for users who use a non-default service host. The standard resource path will be
     * assumed. For services with a non-standard resource path or no path at all, use fromEndpoint instead.
     * Note: Query parameters are not allowed in the host URI and must be set by other APIs.
     * Note: To use an authorization token with fromHost, use fromHost(URL) and then set the AuthorizationToken
     * property on the created BotFrameworkConfig instance.
     * Note: Added in version 1.15.0.
     * @member BotFrameworkConfig.fromHost
     * @function
     * @public
     * @param {URL | string} host - If a URL is provided, the fully-qualified host with protocol (e.g.
     * wss://your.host.com:1234) will be used. If a string is provided, it will be embedded in
     * wss://{host}.convai.speech.azure.us.
     * @param {string} subscriptionKey - The subscription key. If a subscription key is not specified, an authorization
     * token must be set.
     * @param botId Optional. Identifier for using a specific bot within an Azure resource group. Equivalent to the
     * resource name.
     * @returns {BotFrameworkConfig} A new bot framework configuration instance.
     */
    static fromHost(host, subscriptionKey, botId) {
        void botId;
        Contracts_js_1.Contracts.throwIfNullOrUndefined(host, "host");
        const resolvedHost = host instanceof URL ? host : new URL(`wss://${host}.convai.speech.azure.us`);
        Contracts_js_1.Contracts.throwIfNullOrUndefined(resolvedHost, "resolvedHost");
        const botFrameworkConfig = new DialogServiceConfig_js_1.DialogServiceConfigImpl();
        botFrameworkConfig.setProperty(Exports_js_1.PropertyId.Conversation_DialogType, DialogServiceConfig_js_1.DialogServiceConfig.DialogTypes.BotFramework);
        botFrameworkConfig.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_Host, resolvedHost.toString());
        if (undefined !== subscriptionKey) {
            botFrameworkConfig.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_Key, subscriptionKey);
        }
        return botFrameworkConfig;
    }
    /**
     * Creates an instance of a BotFrameworkConfig.
     * This method is intended only for users who use a non-standard service endpoint or parameters.
     * Note: The query parameters specified in the endpoint URL are not changed, even if they are set by any other APIs.
     * Note: To use authorization token with fromEndpoint, pass an empty string to the subscriptionKey in the
     * fromEndpoint method, and then set authorizationToken="token" on the created BotFrameworkConfig instance to
     * use the authorization token.
     * Note: Added in version 1.15.0.
     * @member BotFrameworkConfig.fromEndpoint
     * @function
     * @public
     * @param {URL} endpoint - The service endpoint to connect to.
     * @param {string} subscriptionKey - The subscription key. If a subscription key is not specified, an authorization
     * token must be set.
     * @returns {BotFrameworkConfig} - A new bot framework configuration instance using the provided endpoint.
     */
    static fromEndpoint(endpoint, subscriptionKey) {
        Contracts_js_1.Contracts.throwIfNull(endpoint, "endpoint");
        const botFrameworkConfig = new DialogServiceConfig_js_1.DialogServiceConfigImpl();
        botFrameworkConfig.setProperty(Exports_js_1.PropertyId.Conversation_DialogType, DialogServiceConfig_js_1.DialogServiceConfig.DialogTypes.BotFramework);
        botFrameworkConfig.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_Endpoint, endpoint.toString());
        if (undefined !== subscriptionKey) {
            botFrameworkConfig.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_Key, subscriptionKey);
        }
        return botFrameworkConfig;
    }
}
exports.BotFrameworkConfig = BotFrameworkConfig;



/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomCommandsConfig = void 0;
const Contracts_js_1 = __webpack_require__(70);
const DialogServiceConfig_js_1 = __webpack_require__(130);
const Exports_js_1 = __webpack_require__(85);
/**
 * Class that defines configurations for the dialog service connector object for using a CustomCommands backend.
 * @class CustomCommandsConfig
 */
class CustomCommandsConfig extends DialogServiceConfig_js_1.DialogServiceConfigImpl {
    /**
     * Creates an instance of CustomCommandsConfig.
     */
    constructor() {
        super();
    }
    /**
     * Creates an instance of the bot framework config with the specified subscription and region.
     * @member CustomCommandsConfig.fromSubscription
     * @function
     * @public
     * @param applicationId Speech Commands application id.
     * @param subscription Subscription key associated with the bot
     * @param region The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @returns {CustomCommandsConfig} A new bot framework config.
     */
    static fromSubscription(applicationId, subscription, region) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(applicationId, "applicationId");
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(subscription, "subscription");
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(region, "region");
        const customCommandsConfig = new DialogServiceConfig_js_1.DialogServiceConfigImpl();
        customCommandsConfig.setProperty(Exports_js_1.PropertyId.Conversation_DialogType, DialogServiceConfig_js_1.DialogServiceConfig.DialogTypes.CustomCommands);
        customCommandsConfig.setProperty(Exports_js_1.PropertyId.Conversation_ApplicationId, applicationId);
        customCommandsConfig.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_Key, subscription);
        customCommandsConfig.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_Region, region);
        return customCommandsConfig;
    }
    /**
     * Creates an instance of the bot framework config with the specified Speech Commands application id, authorization token and region.
     * Note: The caller needs to ensure that the authorization token is valid. Before the authorization token
     * expires, the caller needs to refresh it by calling this setter with a new valid token.
     * As configuration values are copied when creating a new recognizer, the new token value will not apply to recognizers that have already been created.
     * For recognizers that have been created before, you need to set authorization token of the corresponding recognizer
     * to refresh the token. Otherwise, the recognizers will encounter errors during recognition.
     * @member CustomCommandsConfig.fromAuthorizationToken
     * @function
     * @public
     * @param applicationId Speech Commands application id.
     * @param authorizationToken The authorization token associated with the application.
     * @param region The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @returns {CustomCommandsConfig} A new speech commands config.
     */
    static fromAuthorizationToken(applicationId, authorizationToken, region) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(applicationId, "applicationId");
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(authorizationToken, "authorizationToken");
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(region, "region");
        const customCommandsConfig = new DialogServiceConfig_js_1.DialogServiceConfigImpl();
        customCommandsConfig.setProperty(Exports_js_1.PropertyId.Conversation_DialogType, DialogServiceConfig_js_1.DialogServiceConfig.DialogTypes.CustomCommands);
        customCommandsConfig.setProperty(Exports_js_1.PropertyId.Conversation_ApplicationId, applicationId);
        customCommandsConfig.setProperty(Exports_js_1.PropertyId.SpeechServiceAuthorization_Token, authorizationToken);
        customCommandsConfig.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_Region, region);
        return customCommandsConfig;
    }
    /**
     * Sets the corresponding backend application identifier.
     * @member CustomCommandsConfig.prototype.Conversation_ApplicationId
     * @function
     * @public
     * @param {string} value - The application identifier to set.
     */
    set applicationId(value) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(value, "value");
        this.setProperty(Exports_js_1.PropertyId.Conversation_ApplicationId, value);
    }
    /**
     * Gets the corresponding backend application identifier.
     * @member CustomCommandsConfig.prototype.Conversation_ApplicationId
     * @function
     * @public
     * @param {string} value - The application identifier to get.
     */
    get applicationId() {
        return this.getProperty(Exports_js_1.PropertyId.Conversation_ApplicationId);
    }
}
exports.CustomCommandsConfig = CustomCommandsConfig;



/***/ }),
/* 133 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DialogServiceConnector = void 0;
const DialogConnectorFactory_js_1 = __webpack_require__(134);
const Exports_js_1 = __webpack_require__(2);
const PhraseDetectionContext_js_1 = __webpack_require__(116);
const Exports_js_2 = __webpack_require__(4);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_3 = __webpack_require__(85);
const PropertyId_js_1 = __webpack_require__(113);
/**
 * Dialog Service Connector
 * @class DialogServiceConnector
 */
class DialogServiceConnector extends Exports_js_3.Recognizer {
    /**
     * Initializes an instance of the DialogServiceConnector.
     * @constructor
     * @param {DialogServiceConfig} dialogConfig - Set of properties to configure this recognizer.
     * @param {AudioConfig} audioConfig - An optional audio config associated with the recognizer
     */
    constructor(dialogConfig, audioConfig) {
        const dialogServiceConfigImpl = dialogConfig;
        Contracts_js_1.Contracts.throwIfNull(dialogConfig, "dialogConfig");
        super(audioConfig, dialogServiceConfigImpl.properties, new DialogConnectorFactory_js_1.DialogConnectionFactory());
        this.isTurnComplete = true;
        this.privIsDisposed = false;
        this.privProperties = dialogServiceConfigImpl.properties.clone();
        const agentConfig = this.buildAgentConfig();
        this.privReco.agentConfig.set(agentConfig);
    }
    /**
     * Starts a connection to the service.
     * Users can optionally call connect() to manually set up a connection in advance, before starting interactions.
     *
     * Note: On return, the connection might not be ready yet. Please subscribe to the Connected event to
     * be notified when the connection is established.
     * @member DialogServiceConnector.prototype.connect
     * @function
     * @public
     */
    connect(cb, err) {
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.privReco.connect(), cb, err);
    }
    /**
     * Closes the connection the service.
     * Users can optionally call disconnect() to manually shutdown the connection of the associated DialogServiceConnector.
     *
     * If disconnect() is called during a recognition, recognition will fail and cancel with an error.
     */
    disconnect(cb, err) {
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.privReco.disconnect(), cb, err);
    }
    /**
     * Gets the authorization token used to communicate with the service.
     * @member DialogServiceConnector.prototype.authorizationToken
     * @function
     * @public
     * @returns {string} Authorization token.
     */
    get authorizationToken() {
        return this.properties.getProperty(PropertyId_js_1.PropertyId.SpeechServiceAuthorization_Token);
    }
    /**
     * Sets the authorization token used to communicate with the service.
     * @member DialogServiceConnector.prototype.authorizationToken
     * @function
     * @public
     * @param {string} token - Authorization token.
     */
    set authorizationToken(token) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(token, "token");
        this.properties.setProperty(PropertyId_js_1.PropertyId.SpeechServiceAuthorization_Token, token);
    }
    /**
     * The collection of properties and their values defined for this DialogServiceConnector.
     * @member DialogServiceConnector.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The collection of properties and their values defined for this DialogServiceConnector.
     */
    get properties() {
        return this.privProperties;
    }
    /** Gets the template for the activity generated by service from speech.
     * Properties from the template will be stamped on the generated activity.
     * It can be empty
     */
    get speechActivityTemplate() {
        return this.properties.getProperty(PropertyId_js_1.PropertyId.Conversation_Speech_Activity_Template);
    }
    /** Sets the template for the activity generated by service from speech.
     * Properties from the template will be stamped on the generated activity.
     * It can be null or empty.
     * Note: it has to be a valid Json object.
     */
    set speechActivityTemplate(speechActivityTemplate) {
        this.properties.setProperty(PropertyId_js_1.PropertyId.Conversation_Speech_Activity_Template, speechActivityTemplate);
    }
    /**
     * Starts recognition and stops after the first utterance is recognized.
     * @member DialogServiceConnector.prototype.listenOnceAsync
     * @function
     * @public
     * @param cb - Callback that received the result when the reco has completed.
     * @param err - Callback invoked in case of an error.
     */
    listenOnceAsync(cb, err) {
        if (this.isTurnComplete) {
            Contracts_js_1.Contracts.throwIfDisposed(this.privIsDisposed);
            const callbackHolder = async () => {
                await this.privReco.connect();
                await this.implRecognizerStop();
                this.isTurnComplete = false;
                const ret = new Exports_js_2.Deferred();
                await this.privReco.recognize(PhraseDetectionContext_js_1.RecognitionMode.Conversation, ret.resolve, ret.reject);
                const e = await ret.promise;
                await this.implRecognizerStop();
                return e;
            };
            const retPromise = callbackHolder();
            retPromise.catch(() => {
                // Destroy the recognizer.
                // We've done all we can here.
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                this.dispose(true).catch(() => { });
            });
            (0, Exports_js_2.marshalPromiseToCallbacks)(retPromise.finally(() => {
                this.isTurnComplete = true;
            }), cb, err);
        }
    }
    sendActivityAsync(activity, cb, errCb) {
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.privReco.sendMessage(activity), cb, errCb);
    }
    /**
     * closes all external resources held by an instance of this class.
     * @member DialogServiceConnector.prototype.close
     * @function
     * @public
     */
    close(cb, err) {
        Contracts_js_1.Contracts.throwIfDisposed(this.privIsDisposed);
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.dispose(true), cb, err);
    }
    async dispose(disposing) {
        if (this.privIsDisposed) {
            return;
        }
        if (disposing) {
            this.privIsDisposed = true;
            await this.implRecognizerStop();
            await super.dispose(disposing);
        }
    }
    createRecognizerConfig(speechConfig) {
        return new Exports_js_1.RecognizerConfig(speechConfig, this.privProperties);
    }
    createServiceRecognizer(authentication, connectionFactory, audioConfig, recognizerConfig) {
        const audioSource = audioConfig;
        return new Exports_js_1.DialogServiceAdapter(authentication, connectionFactory, audioSource, recognizerConfig, this);
    }
    buildAgentConfig() {
        const communicationType = this.properties.getProperty("Conversation_Communication_Type", "Default");
        return {
            botInfo: {
                commType: communicationType,
                commandsCulture: undefined,
                connectionId: this.properties.getProperty(PropertyId_js_1.PropertyId.Conversation_Agent_Connection_Id),
                conversationId: this.properties.getProperty(PropertyId_js_1.PropertyId.Conversation_Conversation_Id, undefined),
                fromId: this.properties.getProperty(PropertyId_js_1.PropertyId.Conversation_From_Id, undefined),
                ttsAudioFormat: this.properties.getProperty(PropertyId_js_1.PropertyId.SpeechServiceConnection_SynthOutputFormat, undefined)
            },
            version: 0.2
        };
    }
}
exports.DialogServiceConnector = DialogServiceConnector;



/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DialogConnectionFactory = void 0;
/* eslint-disable max-classes-per-file */
const Exports_js_1 = __webpack_require__(66);
const Exports_js_2 = __webpack_require__(2);
const Exports_js_3 = __webpack_require__(85);
const ConnectionFactoryBase_js_1 = __webpack_require__(135);
const Exports_js_4 = __webpack_require__(2);
const HeaderNames_js_1 = __webpack_require__(59);
const QueryParameterNames_js_1 = __webpack_require__(136);
class DialogConnectionFactory extends ConnectionFactoryBase_js_1.ConnectionFactoryBase {
    create(config, authInfo, connectionId) {
        const applicationId = config.parameters.getProperty(Exports_js_3.PropertyId.Conversation_ApplicationId, "");
        const dialogType = config.parameters.getProperty(Exports_js_3.PropertyId.Conversation_DialogType);
        const region = config.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_Region);
        const language = config.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage, "en-US");
        const requestTurnStatus = config.parameters.getProperty(Exports_js_3.PropertyId.Conversation_Request_Bot_Status_Messages, "true");
        const queryParams = {};
        queryParams[HeaderNames_js_1.HeaderNames.ConnectionId] = connectionId;
        queryParams[QueryParameterNames_js_1.QueryParameterNames.Format] = config.parameters.getProperty(Exports_js_2.OutputFormatPropertyName, Exports_js_3.OutputFormat[Exports_js_3.OutputFormat.Simple]).toLowerCase();
        queryParams[QueryParameterNames_js_1.QueryParameterNames.Language] = language;
        queryParams[QueryParameterNames_js_1.QueryParameterNames.RequestBotStatusMessages] = requestTurnStatus;
        if (applicationId) {
            queryParams[QueryParameterNames_js_1.QueryParameterNames.BotId] = applicationId;
            if (dialogType === Exports_js_3.DialogServiceConfig.DialogTypes.CustomCommands) {
                queryParams[HeaderNames_js_1.HeaderNames.CustomCommandsAppId] = applicationId;
            }
        }
        const resourceInfix = dialogType === Exports_js_3.DialogServiceConfig.DialogTypes.CustomCommands ? "commands/"
            : "";
        const version = dialogType === Exports_js_3.DialogServiceConfig.DialogTypes.CustomCommands ? "v1"
            : dialogType === Exports_js_3.DialogServiceConfig.DialogTypes.BotFramework ? "v3"
                : "v0";
        const headers = {};
        if (authInfo.token != null && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        // The URL used for connection is chosen in a priority order of specification:
        //  1. If a custom endpoint is provided, that URL is used verbatim.
        //  2. If a custom host is provided (e.g. "wss://my.custom.endpoint.com:1123"), a URL is constructed from it.
        //  3. If no custom connection details are provided, a URL is constructed from default values.
        let endpoint = config.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_Endpoint, "");
        if (!endpoint) {
            const hostSuffix = ConnectionFactoryBase_js_1.ConnectionFactoryBase.getHostSuffix(region);
            const host = config.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_Host, `wss://${region}.${DialogConnectionFactory.BaseUrl}${hostSuffix}`);
            const standardizedHost = host.endsWith("/") ? host : host + "/";
            endpoint = `${standardizedHost}${resourceInfix}${DialogConnectionFactory.ApiKey}/${version}`;
        }
        this.setCommonUrlParams(config, queryParams, endpoint);
        const enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        return Promise.resolve(new Exports_js_1.WebsocketConnection(endpoint, queryParams, headers, new Exports_js_4.WebsocketMessageFormatter(), Exports_js_1.ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId));
    }
}
exports.DialogConnectionFactory = DialogConnectionFactory;
DialogConnectionFactory.ApiKey = "api";
DialogConnectionFactory.BaseUrl = "convai.speech";



/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionFactoryBase = void 0;
const Exports_js_1 = __webpack_require__(2);
const Exports_js_2 = __webpack_require__(4);
const Exports_js_3 = __webpack_require__(85);
const QueryParameterNames_js_1 = __webpack_require__(136);
class ConnectionFactoryBase {
    static getHostSuffix(region) {
        if (!!region) {
            if (region.toLowerCase().startsWith("china")) {
                return ".azure.cn";
            }
            if (region.toLowerCase().startsWith("usgov")) {
                return ".azure.us";
            }
        }
        return ".microsoft.com";
    }
    setCommonUrlParams(config, queryParams, endpoint) {
        const propertyIdToParameterMap = new Map([
            [Exports_js_3.PropertyId.Speech_SegmentationSilenceTimeoutMs, QueryParameterNames_js_1.QueryParameterNames.SegmentationSilenceTimeoutMs],
            [Exports_js_3.PropertyId.SpeechServiceConnection_EnableAudioLogging, QueryParameterNames_js_1.QueryParameterNames.EnableAudioLogging],
            [Exports_js_3.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs, QueryParameterNames_js_1.QueryParameterNames.EndSilenceTimeoutMs],
            [Exports_js_3.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, QueryParameterNames_js_1.QueryParameterNames.InitialSilenceTimeoutMs],
            [Exports_js_3.PropertyId.SpeechServiceResponse_ProfanityOption, QueryParameterNames_js_1.QueryParameterNames.Profanity],
            [Exports_js_3.PropertyId.SpeechServiceResponse_RequestWordLevelTimestamps, QueryParameterNames_js_1.QueryParameterNames.EnableWordLevelTimestamps],
            [Exports_js_3.PropertyId.SpeechServiceResponse_StablePartialResultThreshold, QueryParameterNames_js_1.QueryParameterNames.StableIntermediateThreshold],
        ]);
        propertyIdToParameterMap.forEach((parameterName, propertyId) => {
            this.setUrlParameter(propertyId, parameterName, config, queryParams, endpoint);
        });
        const serviceProperties = JSON.parse(config.parameters.getProperty(Exports_js_1.ServicePropertiesPropertyName, "{}"));
        Object.keys(serviceProperties).forEach((value) => {
            queryParams[value] = serviceProperties[value];
        });
    }
    setUrlParameter(propId, parameterName, config, queryParams, endpoint) {
        const value = config.parameters.getProperty(propId, undefined);
        // FIXME: The .search() check will incorrectly match parameter name anywhere in the string
        //        including e.g. the path portion, or even as a substring of other query parameters
        if (value && (!endpoint || endpoint.search(parameterName) === -1)) {
            queryParams[parameterName] = value.toLocaleLowerCase();
        }
    }
    static async getRedirectUrlFromEndpoint(endpoint, useWebSocketProtocol = true) {
        // make a rest call to the endpoint to get the redirect url
        const redirectUrl = new URL(endpoint);
        redirectUrl.protocol = "https:";
        redirectUrl.port = "443";
        const params = redirectUrl.searchParams;
        params.append("GenerateRedirectResponse", "true");
        const redirectedUrlString = redirectUrl.toString();
        Exports_js_2.Events.instance.onEvent(new Exports_js_2.ConnectionRedirectEvent("", redirectedUrlString, undefined, "ConnectionFactoryBase: redirectUrl request"));
        const redirectResponse = await fetch(redirectedUrlString);
        if (redirectResponse.status !== 200) {
            return endpoint;
        }
        // Fix: properly read the response text
        const redirectUrlString = await redirectResponse.text();
        Exports_js_2.Events.instance.onEvent(new Exports_js_2.ConnectionRedirectEvent("", redirectUrlString, endpoint, "ConnectionFactoryBase: redirectUrlString"));
        try {
            // Validate the URL before returning
            const redirectUrl = new URL(redirectUrlString.trim());
            // WebSocket callers need the ws(s) scheme; REST callers (e.g. voices/list) must keep http(s).
            if (useWebSocketProtocol) {
                if (redirectUrl.protocol === "https:") {
                    redirectUrl.protocol = "wss:";
                }
                else if (redirectUrl.protocol === "http:") {
                    redirectUrl.protocol = "ws:";
                }
            }
            return redirectUrl.toString();
        }
        catch (error) {
            return endpoint; // Return original endpoint if the redirect URL is invalid
        }
    }
}
exports.ConnectionFactoryBase = ConnectionFactoryBase;



/***/ }),
/* 136 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryParameterNames = void 0;
class QueryParameterNames {
}
exports.QueryParameterNames = QueryParameterNames;
QueryParameterNames.BotId = "botid";
QueryParameterNames.CustomSpeechDeploymentId = "cid";
QueryParameterNames.CustomVoiceDeploymentId = "deploymentId";
QueryParameterNames.EnableAudioLogging = "storeAudio";
QueryParameterNames.EnableLanguageId = "lidEnabled";
QueryParameterNames.EnableWordLevelTimestamps = "wordLevelTimestamps";
QueryParameterNames.EndSilenceTimeoutMs = "endSilenceTimeoutMs";
QueryParameterNames.SegmentationSilenceTimeoutMs = "segmentationSilenceTimeoutMs";
QueryParameterNames.SegmentationMaximumTimeMs = "segmentationMaximumTimeMs";
QueryParameterNames.SegmentationStrategy = "segmentationStrategy";
QueryParameterNames.Format = "format";
QueryParameterNames.InitialSilenceTimeoutMs = "initialSilenceTimeoutMs";
QueryParameterNames.Language = "language";
QueryParameterNames.Profanity = "profanity";
QueryParameterNames.RequestBotStatusMessages = "enableBotMessageStatus";
QueryParameterNames.StableIntermediateThreshold = "stableIntermediateThreshold";
QueryParameterNames.StableTranslation = "stableTranslation";
QueryParameterNames.TestHooks = "testhooks";
QueryParameterNames.Postprocessing = "postprocessing";
QueryParameterNames.CtsMeetingId = "meetingId";
QueryParameterNames.CtsDeviceId = "deviceId";
QueryParameterNames.CtsIsParticipant = "isParticipant";
QueryParameterNames.EnableAvatar = "enableTalkingAvatar";



/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivityReceivedEventArgs = void 0;
/**
 * Defines contents of received message/events.
 * @class ActivityReceivedEventArgs
 */
class ActivityReceivedEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {any} activity - The activity..
     */
    constructor(activity, audioStream) {
        this.privActivity = activity;
        this.privAudioStream = audioStream;
    }
    /**
     * Gets the received activity
     * @member ActivityReceivedEventArgs.prototype.activity
     * @function
     * @public
     * @returns {any} the received activity.
     */
    get activity() {
        return this.privActivity;
    }
    get audioStream() {
        return this.privAudioStream;
    }
}
exports.ActivityReceivedEventArgs = ActivityReceivedEventArgs;



/***/ }),
/* 138 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TurnStatusReceivedEventArgs = void 0;
const TurnStatusPayload_js_1 = __webpack_require__(139);
/**
 * Defines contents of received message/events.
 * @class TurnStatusReceivedEventArgs
 */
class TurnStatusReceivedEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} turnStatus - The JSON-encoded turn status message.
     */
    constructor(turnStatus) {
        this.privTurnStatus = TurnStatusPayload_js_1.TurnStatusResponsePayload.fromJSON(turnStatus);
    }
    /**
     * Gets the interaction identifier associated with this turn status event.
     * @member TurnStatusReceivedEventArgs.prototype.interactionId
     * @function
     * @public
     * @returns {any} the received interaction id.
     */
    get interactionId() {
        return this.privTurnStatus.interactionId;
    }
    /**
     * Gets the conversation identifier associated with this turn status event.
     * @member TurnStatusReceivedEventArgs.prototype.conversationId
     * @function
     * @public
     * @returns {any} the received conversation id.
     */
    get conversationId() {
        return this.privTurnStatus.conversationId;
    }
    /**
     * Gets the received turn status code.
     * @member TurnStatusReceivedEventArgs.prototype.statusCode
     * @function
     * @public
     * @returns {number} the received turn status.
     */
    get statusCode() {
        return this.privTurnStatus.statusCode; // eslint-disable-line @typescript-eslint/no-unsafe-return
    }
}
exports.TurnStatusReceivedEventArgs = TurnStatusReceivedEventArgs;



/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TurnStatusResponsePayload = void 0;
class TurnStatusResponsePayload {
    constructor(json) {
        this.privMessageStatusResponse = JSON.parse(json);
    }
    static fromJSON(json) {
        return new TurnStatusResponsePayload(json);
    }
    get interactionId() {
        return this.privMessageStatusResponse.interactionId;
    }
    get conversationId() {
        return this.privMessageStatusResponse.conversationId;
    }
    get statusCode() {
        // Payloads may contain a limited set of textual representations or a numeric status
        // code. The textual values are here converted into numeric ones.
        switch (this.privMessageStatusResponse.statusCode) {
            case "Success":
                return 200;
            case "Failed":
                return 400;
            case "TimedOut":
                return 429;
            default:
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return this.privMessageStatusResponse.statusCode;
        }
    }
}
exports.TurnStatusResponsePayload = TurnStatusResponsePayload;



/***/ }),
/* 140 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicePropertyChannel = void 0;
/**
 * Defines channels used to pass property settings to service.
 * Added in version 1.7.0.
 */
var ServicePropertyChannel;
(function (ServicePropertyChannel) {
    /**
     * Uses URI query parameter to pass property settings to service.
     */
    ServicePropertyChannel[ServicePropertyChannel["UriQueryParameter"] = 0] = "UriQueryParameter";
})(ServicePropertyChannel = exports.ServicePropertyChannel || (exports.ServicePropertyChannel = {}));



/***/ }),
/* 141 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfanityOption = void 0;
/**
 * Profanity option.
 * Added in version 1.7.0.
 */
var ProfanityOption;
(function (ProfanityOption) {
    ProfanityOption[ProfanityOption["Masked"] = 0] = "Masked";
    ProfanityOption[ProfanityOption["Removed"] = 1] = "Removed";
    ProfanityOption[ProfanityOption["Raw"] = 2] = "Raw";
})(ProfanityOption = exports.ProfanityOption || (exports.ProfanityOption = {}));



/***/ }),
/* 142 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseAudioPlayer = void 0;
const Error_js_1 = __webpack_require__(31);
const Exports_js_1 = __webpack_require__(85);
const AudioStreamFormat_js_1 = __webpack_require__(73);
/**
 * Base audio player class
 * TODO: Plays only PCM for now.
 * @class
 */
class BaseAudioPlayer {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {AudioStreamFormat} audioFormat audio stream format recognized by the player.
     */
    constructor(audioFormat) {
        this.audioContext = null;
        this.gainNode = null;
        this.autoUpdateBufferTimer = 0;
        if (audioFormat === undefined) {
            audioFormat = Exports_js_1.AudioStreamFormat.getDefaultInputFormat();
        }
        this.init(audioFormat);
    }
    /**
     * play Audio sample
     * @param newAudioData audio data to be played.
     */
    playAudioSample(newAudioData, cb, err) {
        try {
            this.ensureInitializedContext();
            const audioData = this.formatAudioData(newAudioData);
            const newSamplesData = new Float32Array(this.samples.length + audioData.length);
            newSamplesData.set(this.samples, 0);
            newSamplesData.set(audioData, this.samples.length);
            this.samples = newSamplesData;
            if (!!cb) {
                cb();
            }
        }
        catch (e) {
            if (!!err) {
                err(e);
            }
        }
    }
    /**
     * stops audio and clears the buffers
     */
    stopAudio(cb, err) {
        if (this.audioContext !== null) {
            this.samples = new Float32Array();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            clearInterval(this.autoUpdateBufferTimer);
            this.audioContext.close().then(() => {
                if (!!cb) {
                    cb();
                }
            }, (error) => {
                if (!!err) {
                    err(error);
                }
            });
            this.audioContext = null;
        }
    }
    init(audioFormat) {
        this.audioFormat = audioFormat;
        this.samples = new Float32Array();
    }
    ensureInitializedContext() {
        if (this.audioContext === null) {
            this.createAudioContext();
            const timerPeriod = 200;
            this.autoUpdateBufferTimer = setInterval(() => {
                this.updateAudioBuffer();
            }, timerPeriod);
        }
    }
    createAudioContext() {
        // new ((window as any).AudioContext || (window as any).webkitAudioContext)();
        this.audioContext = AudioStreamFormat_js_1.AudioStreamFormatImpl.getAudioContext();
        // TODO: Various examples shows this gain node, it does not seem to be needed unless we plan
        // to control the volume, not likely
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = 1;
        this.gainNode.connect(this.audioContext.destination);
        this.startTime = this.audioContext.currentTime;
    }
    formatAudioData(audioData) {
        switch (this.audioFormat.bitsPerSample) {
            case 8:
                return this.formatArrayBuffer(new Int8Array(audioData), 128);
            case 16:
                return this.formatArrayBuffer(new Int16Array(audioData), 32768);
            case 32:
                return this.formatArrayBuffer(new Int32Array(audioData), 2147483648);
            default:
                throw new Error_js_1.InvalidOperationError("Only WAVE_FORMAT_PCM (8/16/32 bps) format supported at this time");
        }
    }
    formatArrayBuffer(audioData, maxValue) {
        const float32Data = new Float32Array(audioData.length);
        for (let i = 0; i < audioData.length; i++) {
            float32Data[i] = audioData[i] / maxValue;
        }
        return float32Data;
    }
    updateAudioBuffer() {
        if (this.samples.length === 0) {
            return;
        }
        const channelCount = this.audioFormat.channels;
        const bufferSource = this.audioContext.createBufferSource();
        const frameCount = this.samples.length / channelCount;
        const audioBuffer = this.audioContext.createBuffer(channelCount, frameCount, this.audioFormat.samplesPerSec);
        // TODO: Should we do the conversion in the pushAudioSample instead?
        for (let channel = 0; channel < channelCount; channel++) {
            // Fill in individual channel data
            let channelOffset = channel;
            const audioData = audioBuffer.getChannelData(channel);
            for (let i = 0; i < this.samples.length; i++, channelOffset += channelCount) {
                audioData[i] = this.samples[channelOffset];
            }
        }
        if (this.startTime < this.audioContext.currentTime) {
            this.startTime = this.audioContext.currentTime;
        }
        bufferSource.buffer = audioBuffer;
        bufferSource.connect(this.gainNode);
        bufferSource.start(this.startTime);
        // Make sure we play the next sample after the current one.
        this.startTime += audioBuffer.duration;
        // Clear the samples for the next pushed data.
        this.samples = new Float32Array();
    }
    async playAudio(audioData) {
        if (this.audioContext === null) {
            this.createAudioContext();
        }
        const source = this.audioContext.createBufferSource();
        const destination = this.audioContext.destination;
        await this.audioContext.decodeAudioData(audioData, (newBuffer) => {
            source.buffer = newBuffer;
            source.connect(destination);
            source.start(0);
        });
    }
}
exports.BaseAudioPlayer = BaseAudioPlayer;



/***/ }),
/* 143 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionMessageEventArgs = void 0;
class ConnectionMessageEventArgs {
    constructor(message) {
        this.privConnectionMessage = message;
    }
    /**
     * Gets the <see cref="ConnectionMessage"/> associated with this <see cref="ConnectionMessageEventArgs"/>.
     */
    get message() {
        return this.privConnectionMessage;
    }
    /**
     * Returns a string that represents the connection message event.
     */
    toString() {
        return "Message: " + this.privConnectionMessage.toString();
    }
}
exports.ConnectionMessageEventArgs = ConnectionMessageEventArgs;



/***/ }),
/* 144 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutoDetectSourceLanguageConfig = void 0;
const Exports_js_1 = __webpack_require__(2);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_2 = __webpack_require__(85);
const LanguageIdMode_js_1 = __webpack_require__(145);
/**
 * Language auto detect configuration.
 * @class AutoDetectSourceLanguageConfig
 * Added in version 1.13.0.
 */
class AutoDetectSourceLanguageConfig {
    constructor() {
        this.privProperties = new Exports_js_2.PropertyCollection();
        this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_LanguageIdMode, "AtStart");
        this.privLanguageIdMode = LanguageIdMode_js_1.LanguageIdMode.AtStart;
    }
    /**
     * @member AutoDetectSourceLanguageConfig.fromOpenRange
     * @function
     * @public
     * Only [[SpeechSynthesizer]] supports source language auto detection from open range,
     * for [[Recognizer]], please use AutoDetectSourceLanguageConfig with specific source languages.
     * @return {AutoDetectSourceLanguageConfig} Instance of AutoDetectSourceLanguageConfig
     * @summary Creates an instance of the AutoDetectSourceLanguageConfig with open range.
     */
    static fromOpenRange() {
        const config = new AutoDetectSourceLanguageConfig();
        config.properties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages, Exports_js_1.AutoDetectSourceLanguagesOpenRangeOptionName);
        config.properties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_RecoLanguage, "en-US");
        return config;
    }
    /**
     * @member AutoDetectSourceLanguageConfig.fromLanguages
     * @function
     * @public
     * @param {string[]} languages Comma-separated string of languages (eg. "en-US,fr-FR") to populate properties of config.
     * @return {AutoDetectSourceLanguageConfig} Instance of AutoDetectSourceLanguageConfig
     * @summary Creates an instance of the AutoDetectSourceLanguageConfig with given languages.
     */
    static fromLanguages(languages) {
        Contracts_js_1.Contracts.throwIfArrayEmptyOrWhitespace(languages, "languages");
        const config = new AutoDetectSourceLanguageConfig();
        config.properties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages, languages.join());
        return config;
    }
    /**
     * @member AutoDetectSourceLanguageConfig.fromSourceLanguageConfigs
     * @function
     * @public
     * @param {SourceLanguageConfig[]} configs SourceLanguageConfigs to populate properties of config.
     * @return {AutoDetectSourceLanguageConfig} Instance of AutoDetectSourceLanguageConfig
     * @summary Creates an instance of the AutoDetectSourceLanguageConfig with given SourceLanguageConfigs.
     */
    static fromSourceLanguageConfigs(configs) {
        if (configs.length < 1) {
            throw new Error("Expected non-empty SourceLanguageConfig array.");
        }
        const autoConfig = new AutoDetectSourceLanguageConfig();
        const langs = [];
        configs.forEach((config) => {
            langs.push(config.language);
            if (config.endpointId !== undefined && config.endpointId !== "") {
                const customProperty = config.language + Exports_js_2.PropertyId.SpeechServiceConnection_EndpointId.toString();
                autoConfig.properties.setProperty(customProperty, config.endpointId);
            }
        });
        autoConfig.properties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages, langs.join());
        return autoConfig;
    }
    /**
     * @member AutoDetectSourceLanguageConfig.prototype.properties
     * @function
     * @public
     * @return {PropertyCollection} Properties of the config.
     * @summary Gets an auto detected language config properties
     */
    get properties() {
        return this.privProperties;
    }
    /**
     * @member AutoDetectSourceLanguageConfig.prototype.mode
     * @function
     * @public
     * @param {LanguageIdMode} mode LID mode desired.
     * @summary Sets LID operation to desired mode
     */
    set mode(mode) {
        if (mode === LanguageIdMode_js_1.LanguageIdMode.Continuous) {
            this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_RecognitionEndpointVersion, "2");
            this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_LanguageIdMode, "Continuous");
        }
        else { // LanguageIdMode.AtStart
            this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_RecognitionEndpointVersion, "1");
            this.privProperties.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_LanguageIdMode, "AtStart");
        }
        this.privLanguageIdMode = mode;
    }
}
exports.AutoDetectSourceLanguageConfig = AutoDetectSourceLanguageConfig;



/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LanguageIdMode = void 0;
/**
 * Language Identification mode
 * @class LanguageIdMode
 */
var LanguageIdMode;
(function (LanguageIdMode) {
    /**
     * Detect language at audio start
     * @member LanguageIdMode.AtStart
     */
    LanguageIdMode[LanguageIdMode["AtStart"] = 0] = "AtStart";
    /**
     * Continuously detect language
     * @member LanguageIdMode.Continuous
     */
    LanguageIdMode[LanguageIdMode["Continuous"] = 1] = "Continuous";
})(LanguageIdMode = exports.LanguageIdMode || (exports.LanguageIdMode = {}));



/***/ }),
/* 146 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutoDetectSourceLanguageResult = void 0;
const Contracts_js_1 = __webpack_require__(70);
/**
 * Output format
 * @class AutoDetectSourceLanguageResult
 */
class AutoDetectSourceLanguageResult {
    constructor(language, languageDetectionConfidence) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(language, "language");
        Contracts_js_1.Contracts.throwIfNullOrUndefined(languageDetectionConfidence, "languageDetectionConfidence");
        this.privLanguage = language;
        this.privLanguageDetectionConfidence = languageDetectionConfidence;
    }
    /**
     * Creates an instance of AutoDetectSourceLanguageResult object from a SpeechRecognitionResult instance.
     * @member AutoDetectSourceLanguageResult.fromResult
     * @function
     * @public
     * @param {SpeechRecognitionResult} result - The recognition result.
     * @returns {AutoDetectSourceLanguageResult} AutoDetectSourceLanguageResult object being created.
     */
    static fromResult(result) {
        return new AutoDetectSourceLanguageResult(result.language, result.languageDetectionConfidence);
    }
    /**
     * Creates an instance of AutoDetectSourceLanguageResult object from a ConversationTranscriptionResult instance.
     * @member AutoDetectSourceLanguageResult.fromConversationTranscriptionResult
     * @function
     * @public
     * @param {ConversationTranscriptionResult} result - The transcription result.
     * @returns {AutoDetectSourceLanguageResult} AutoDetectSourceLanguageResult object being created.
     */
    static fromConversationTranscriptionResult(result) {
        return new AutoDetectSourceLanguageResult(result.language, result.languageDetectionConfidence);
    }
    get language() {
        return this.privLanguage;
    }
    get languageDetectionConfidence() {
        return this.privLanguageDetectionConfidence;
    }
}
exports.AutoDetectSourceLanguageResult = AutoDetectSourceLanguageResult;



/***/ }),
/* 147 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SourceLanguageConfig = void 0;
const Contracts_js_1 = __webpack_require__(70);
/**
 * Source Language configuration.
 * @class SourceLanguageConfig
 */
class SourceLanguageConfig {
    constructor(language, endpointId) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(language, "language");
        this.privLanguage = language;
        this.privEndpointId = endpointId;
    }
    /**
     * @member SourceLanguageConfig.fromLanguage
     * @function
     * @public
     * @param {string} language language (eg. "en-US") value of config.
     * @param {string?} endpointId endpointId of model bound to given language of config.
     * @return {SourceLanguageConfig} Instance of SourceLanguageConfig
     * @summary Creates an instance of the SourceLanguageConfig with the given language and optional endpointId.
     * Added in version 1.13.0.
     */
    static fromLanguage(language, endpointId) {
        return new SourceLanguageConfig(language, endpointId);
    }
    get language() {
        return this.privLanguage;
    }
    get endpointId() {
        return this.privEndpointId;
    }
}
exports.SourceLanguageConfig = SourceLanguageConfig;



/***/ }),
/* 148 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConversationTranscriptionResult = exports.MeetingTranscriber = exports.MeetingTranscriptionCanceledEventArgs = exports.MeetingImpl = exports.Meeting = exports.User = exports.Participant = exports.ConversationTranscriber = void 0;
var ConversationTranscriber_js_1 = __webpack_require__(149);
Object.defineProperty(exports, "ConversationTranscriber", ({ enumerable: true, get: function () { return ConversationTranscriber_js_1.ConversationTranscriber; } }));
var IParticipant_js_1 = __webpack_require__(150);
Object.defineProperty(exports, "Participant", ({ enumerable: true, get: function () { return IParticipant_js_1.Participant; } }));
Object.defineProperty(exports, "User", ({ enumerable: true, get: function () { return IParticipant_js_1.User; } }));
var Meeting_js_1 = __webpack_require__(151);
Object.defineProperty(exports, "Meeting", ({ enumerable: true, get: function () { return Meeting_js_1.Meeting; } }));
Object.defineProperty(exports, "MeetingImpl", ({ enumerable: true, get: function () { return Meeting_js_1.MeetingImpl; } }));
var MeetingTranscriptionCanceledEventArgs_js_1 = __webpack_require__(152);
Object.defineProperty(exports, "MeetingTranscriptionCanceledEventArgs", ({ enumerable: true, get: function () { return MeetingTranscriptionCanceledEventArgs_js_1.MeetingTranscriptionCanceledEventArgs; } }));
var MeetingTranscriber_js_1 = __webpack_require__(153);
Object.defineProperty(exports, "MeetingTranscriber", ({ enumerable: true, get: function () { return MeetingTranscriber_js_1.MeetingTranscriber; } }));
var ConversationTranscriptionResult_js_1 = __webpack_require__(154);
Object.defineProperty(exports, "ConversationTranscriptionResult", ({ enumerable: true, get: function () { return ConversationTranscriptionResult_js_1.ConversationTranscriptionResult; } }));



/***/ }),
/* 149 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConversationTranscriber = void 0;
const Exports_js_1 = __webpack_require__(2);
const PhraseDetectionContext_js_1 = __webpack_require__(116);
const Exports_js_2 = __webpack_require__(4);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_3 = __webpack_require__(85);
/**
 * Performs speech recognition with speaker separation from microphone, file, or other audio input streams, and gets transcribed text as result.
 * @class ConversationTranscriber
 */
class ConversationTranscriber extends Exports_js_3.Recognizer {
    /**
     * ConversationTranscriber constructor.
     * @constructor
     * @param {SpeechConfig} speechConfig - an set of initial properties for this recognizer
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the recognizer
     */
    constructor(speechConfig, audioConfig) {
        const speechConfigImpl = speechConfig;
        Contracts_js_1.Contracts.throwIfNull(speechConfigImpl, "speechConfig");
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(speechConfigImpl.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage), Exports_js_3.PropertyId[Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage]);
        super(audioConfig, speechConfigImpl.properties, new Exports_js_1.ConversationTranscriberConnectionFactory(), speechConfig.tokenCredential);
        this.privProperties.setProperty(Exports_js_3.PropertyId.SpeechServiceConnection_RecognitionEndpointVersion, "2");
        this.privDisposedRecognizer = false;
    }
    /**
     * ConversationTranscriber constructor.
     * @constructor
     * @param {SpeechConfig} speechConfig - an set of initial properties for this recognizer
     * @param {AutoDetectSourceLanguageConfig} autoDetectSourceLanguageConfig - An source language detection configuration associated with the recognizer
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the recognizer
     */
    static FromConfig(speechConfig, autoDetectSourceLanguageConfig, audioConfig) {
        const speechConfigImpl = speechConfig;
        autoDetectSourceLanguageConfig.properties.mergeTo(speechConfigImpl.properties);
        const recognizer = new ConversationTranscriber(speechConfig, audioConfig);
        return recognizer;
    }
    /**
     * Gets the endpoint id of a customized speech model that is used for transcription.
     * @member ConversationTranscriber.prototype.endpointId
     * @function
     * @public
     * @returns {string} the endpoint id of a customized speech model that is used for speech recognition.
     */
    get endpointId() {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedRecognizer);
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_EndpointId, "00000000-0000-0000-0000-000000000000");
    }
    /**
     * Gets the authorization token used to communicate with the service.
     * @member ConversationTranscriber.prototype.authorizationToken
     * @function
     * @public
     * @returns {string} Authorization token.
     */
    get authorizationToken() {
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token);
    }
    /**
     * Gets/Sets the authorization token used to communicate with the service.
     * @member ConversationTranscriber.prototype.authorizationToken
     * @function
     * @public
     * @param {string} token - Authorization token.
     */
    set authorizationToken(token) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(token, "token");
        this.properties.setProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token, token);
    }
    /**
     * Gets the spoken language of transcription.
     * @member ConversationTranscriber.prototype.speechRecognitionLanguage
     * @function
     * @public
     * @returns {string} The spoken language of transcription.
     */
    get speechRecognitionLanguage() {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedRecognizer);
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage);
    }
    /**
     * Gets the output format of transcription.
     * @member ConversationTranscriber.prototype.outputFormat
     * @function
     * @public
     * @returns {OutputFormat} The output format of transcription.
     */
    get outputFormat() {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedRecognizer);
        if (this.properties.getProperty(Exports_js_1.OutputFormatPropertyName, Exports_js_3.OutputFormat[Exports_js_3.OutputFormat.Simple]) === Exports_js_3.OutputFormat[Exports_js_3.OutputFormat.Simple]) {
            return Exports_js_3.OutputFormat.Simple;
        }
        else {
            return Exports_js_3.OutputFormat.Detailed;
        }
    }
    /**
     * The collection of properties and their values defined for this conversation transcriber.
     * @member ConversationTranscriber.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The collection of properties and their values defined for this SpeechRecognizer.
     */
    get properties() {
        return this.privProperties;
    }
    /**
     * Starts conversation transcription, until stopTranscribingAsync() is called.
     * User must subscribe to events to receive transcription results.
     * @member ConversationTranscriber.prototype.startTranscribingAsync
     * @function
     * @public
     * @param cb - Callback invoked once the transcription has started.
     * @param err - Callback invoked in case of an error.
     */
    startTranscribingAsync(cb, err) {
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.startContinuousRecognitionAsyncImpl(PhraseDetectionContext_js_1.RecognitionMode.Conversation), cb, err);
    }
    /**
     * Stops conversation transcription.
     * @member ConversationTranscriber.prototype.stopTranscribingAsync
     * @function
     * @public
     * @param cb - Callback invoked once the transcription has stopped.
     * @param err - Callback invoked in case of an error.
     */
    stopTranscribingAsync(cb, err) {
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.stopContinuousRecognitionAsyncImpl(), cb, err);
    }
    /**
     * closes all external resources held by an instance of this class.
     * @member ConversationTranscriber.prototype.close
     * @function
     * @public
     */
    close(cb, errorCb) {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedRecognizer);
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.dispose(true), cb, errorCb);
    }
    /**
     * Disposes any resources held by the object.
     * @member SpeechRecognizer.prototype.dispose
     * @function
     * @public
     * @param {boolean} disposing - true if disposing the object.
     */
    async dispose(disposing) {
        if (this.privDisposedRecognizer) {
            return;
        }
        if (disposing) {
            this.privDisposedRecognizer = true;
            await this.implRecognizerStop();
        }
        await super.dispose(disposing);
    }
    createRecognizerConfig(speechConfig) {
        return new Exports_js_1.RecognizerConfig(speechConfig, this.privProperties);
    }
    createServiceRecognizer(authentication, connectionFactory, audioConfig, recognizerConfig) {
        const configImpl = audioConfig;
        recognizerConfig.isSpeakerDiarizationEnabled = true;
        return new Exports_js_1.ConversationTranscriptionServiceRecognizer(authentication, connectionFactory, configImpl, recognizerConfig, this);
    }
}
exports.ConversationTranscriber = ConversationTranscriber;



/***/ }),
/* 150 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Participant = exports.User = void 0;
/* eslint-disable max-classes-per-file */
const Exports_js_1 = __webpack_require__(85);
class User {
    constructor(userId) {
        this.privUserId = userId;
    }
    get userId() {
        return this.privUserId;
    }
}
exports.User = User;
class Participant {
    constructor(id, preferredLanguage, voice) {
        this.privId = id;
        this.privPreferredLanguage = preferredLanguage;
        this.privVoice = voice;
        this.privProperties = new Exports_js_1.PropertyCollection();
    }
    get id() {
        return this.privId;
    }
    get preferredLanguage() {
        return this.privPreferredLanguage;
    }
    get voice() {
        return this.privVoice;
    }
    get properties() {
        return this.privProperties;
    }
    static From(id, language, voice) {
        return new Participant(id, language, voice);
    }
}
exports.Participant = Participant;



/***/ }),
/* 151 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingImpl = exports.Meeting = void 0;
/* eslint-disable max-classes-per-file */
const Exports_js_1 = __webpack_require__(2);
const Exports_js_2 = __webpack_require__(4);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_3 = __webpack_require__(85);
class Meeting {
    constructor() {
        return;
    }
    /**
     * Create a meeting
     * @param speechConfig
     * @param meetingId
     * @param cb
     * @param err
     */
    static createMeetingAsync(speechConfig, meetingId, arg3, arg4) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(speechConfig, Exports_js_1.ConversationConnectionConfig.restErrors.invalidArgs.replace("{arg}", "config"));
        Contracts_js_1.Contracts.throwIfNullOrUndefined(speechConfig.region, Exports_js_1.ConversationConnectionConfig.restErrors.invalidArgs.replace("{arg}", "SpeechServiceConnection_Region"));
        Contracts_js_1.Contracts.throwIfNull(meetingId, "meetingId");
        if (meetingId.length === 0) {
            throw new Error("meetingId cannot be empty");
        }
        if (!speechConfig.subscriptionKey && !speechConfig.getProperty(Exports_js_3.PropertyId[Exports_js_3.PropertyId.SpeechServiceAuthorization_Token])) {
            Contracts_js_1.Contracts.throwIfNullOrUndefined(speechConfig.subscriptionKey, Exports_js_1.ConversationConnectionConfig.restErrors.invalidArgs.replace("{arg}", "SpeechServiceConnection_Key"));
        }
        const meetingImpl = new MeetingImpl(speechConfig, meetingId);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        (0, Exports_js_2.marshalPromiseToCallbacks)((async () => { })(), arg3, arg4);
        return meetingImpl;
    }
}
exports.Meeting = Meeting;
class MeetingImpl extends Meeting {
    /**
     * Create a Meeting impl
     * @param speechConfig
     * @param {string} id - meetingId
     */
    constructor(speechConfig, id) {
        super();
        this.privErrors = Exports_js_1.ConversationConnectionConfig.restErrors;
        this.privIsDisposed = false;
        this.privMeetingId = "";
        this.privProperties = new Exports_js_3.PropertyCollection();
        // check the speech language
        const language = speechConfig.getProperty(Exports_js_3.PropertyId[Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage]);
        if (!language) {
            speechConfig.setProperty(Exports_js_3.PropertyId[Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage], Exports_js_1.ConversationConnectionConfig.defaultLanguageCode);
        }
        this.privLanguage = speechConfig.getProperty(Exports_js_3.PropertyId[Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage]);
        this.privMeetingId = id;
        // save the speech config for future usage
        this.privConfig = speechConfig;
        // save the config properties
        const configImpl = speechConfig;
        Contracts_js_1.Contracts.throwIfNull(configImpl, "speechConfig");
        this.privProperties = configImpl.properties.clone();
        this.privParticipants = new Exports_js_1.InternalParticipants();
    }
    // get the config
    get config() {
        return this.privConfig;
    }
    // get the meeting Id
    get meetingId() {
        return this.privMeetingId;
    }
    // get the properties
    get properties() {
        return this.privProperties;
    }
    // get the speech language
    get speechRecognitionLanguage() {
        return this.privLanguage;
    }
    get participants() {
        return this.privParticipants.participants.map((p) => this.toParticipant(p));
    }
    get transcriberRecognizer() {
        return this.privTranscriberRecognizer;
    }
    get meetingInfo() {
        const meetingId = this.meetingId;
        const p = this.participants.map((part) => ({
            id: part.id,
            preferredLanguage: part.preferredLanguage,
            voice: part.voice
        }));
        const props = {};
        for (const key of Exports_js_1.ConversationConnectionConfig.transcriptionEventKeys) {
            const val = this.properties.getProperty(key, "");
            if (val !== "") {
                props[key] = val;
            }
        }
        const info = { id: meetingId, participants: p, meetingProperties: props };
        return info;
    }
    // get / set the speech auth token
    // eslint-disable-next-line @typescript-eslint/member-ordering
    get authorizationToken() {
        return this.privToken;
    }
    set authorizationToken(value) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(value, "authorizationToken");
        this.privToken = value;
    }
    /**
     * Add a participant to the meeting.
     * @param { IParticipant } participant - participant to add
     * @param cb
     * @param err
     */
    addParticipantAsync(participant, cb, err) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(participant, "Participant");
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.addParticipantImplAsync(participant), cb, err);
    }
    /**
     * Remove a participant from the meeting.
     * @param userId
     * @param cb
     * @param err
     */
    removeParticipantAsync(userId, cb, err) {
        Contracts_js_1.Contracts.throwIfDisposed(this.privIsDisposed);
        Contracts_js_1.Contracts.throwIfNullOrUndefined(this.privTranscriberRecognizer, "Recognizer");
        Contracts_js_1.Contracts.throwIfNullOrUndefined(userId, this.privErrors.invalidArgs.replace("{arg}", "userId"));
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.removeParticipantImplAsync(userId), cb, err);
    }
    isDisposed() {
        return this.privIsDisposed;
    }
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this.privIsDisposed = true;
        if (!!this.config) {
            this.config.close();
        }
        this.privConfig = undefined;
        this.privLanguage = undefined;
        this.privProperties = undefined;
        this.privToken = undefined;
        this.privParticipants = undefined;
    }
    async connectTranscriberRecognizer(recognizer) {
        if (!!this.privTranscriberRecognizer) {
            await this.privTranscriberRecognizer.close();
        }
        await recognizer.enforceAudioGating();
        this.privTranscriberRecognizer = recognizer;
        this.privTranscriberRecognizer.meeting = this;
    }
    addParticipantImplAsync(participant) {
        const newParticipant = this.privParticipants.addOrUpdateParticipant(participant);
        if (newParticipant !== undefined) {
            if (!!this.privTranscriberRecognizer) {
                const meetingInfo = this.meetingInfo;
                meetingInfo.participants = [participant];
                return this.privTranscriberRecognizer.pushMeetingEvent(meetingInfo, "join");
            }
        }
    }
    removeParticipantImplAsync(participant) {
        this.privParticipants.deleteParticipant(participant.id);
        const meetingInfo = this.meetingInfo;
        meetingInfo.participants = [participant];
        return this.privTranscriberRecognizer.pushMeetingEvent(meetingInfo, "leave");
    }
    /** Participant Helpers */
    toParticipant(p) {
        return new Exports_js_3.Participant(p.id, p.preferredLanguage, p.voice);
    }
}
exports.MeetingImpl = MeetingImpl;



/***/ }),
/* 152 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// Multi-device Conversation is a Preview feature.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingTranscriptionCanceledEventArgs = void 0;
const CancellationEventArgsBase_js_1 = __webpack_require__(104);
class MeetingTranscriptionCanceledEventArgs extends CancellationEventArgsBase_js_1.CancellationEventArgsBase {
}
exports.MeetingTranscriptionCanceledEventArgs = MeetingTranscriptionCanceledEventArgs;



/***/ }),
/* 153 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingTranscriber = void 0;
const Exports_js_1 = __webpack_require__(2);
const Exports_js_2 = __webpack_require__(4);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_3 = __webpack_require__(85);
const Exports_js_4 = __webpack_require__(148);
class MeetingTranscriber {
    /**
     * MeetingTranscriber constructor.
     * @constructor
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the recognizer
     */
    constructor(audioConfig) {
        this.privAudioConfig = audioConfig;
        this.privProperties = new Exports_js_3.PropertyCollection();
        this.privRecognizer = undefined;
        this.privDisposedRecognizer = false;
    }
    /**
     * Gets the spoken language of recognition.
     * @member MeetingTranscriber.prototype.speechRecognitionLanguage
     * @function
     * @public
     * @returns {string} The spoken language of recognition.
     */
    get speechRecognitionLanguage() {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedRecognizer);
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage);
    }
    /**
     * The collection of properties and their values defined for this MeetingTranscriber.
     * @member MeetingTranscriber.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The collection of properties and their values defined for this MeetingTranscriber.
     */
    get properties() {
        return this.privProperties;
    }
    /**
     * @Internal
     * Internal data member to support fromRecognizer* pattern methods on other classes.
     * Do not use externally, object returned will change without warning or notice.
     */
    get internalData() {
        return this.privRecognizer.internalData;
    }
    /**
     * @Deprecated
     * @Obsolete
     * Please use the Connection.fromRecognizer pattern to obtain a connection object
     */
    get connection() {
        return Exports_js_3.Connection.fromRecognizer(this.privRecognizer);
    }
    /**
     * Gets the authorization token used to communicate with the service.
     * @member MeetingTranscriber.prototype.authorizationToken
     * @function
     * @public
     * @returns {string} Authorization token.
     */
    get authorizationToken() {
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token);
    }
    /**
     * Gets/Sets the authorization token used to communicate with the service.
     * @member MeetingTranscriber.prototype.authorizationToken
     * @function
     * @public
     * @param {string} token - Authorization token.
     */
    set authorizationToken(token) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(token, "token");
        this.properties.setProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token, token);
    }
    /**
     * @param {Meeting} meeting - meeting to be recognized
     */
    joinMeetingAsync(meeting, cb, err) {
        /* eslint-disable no-console */
        // console.log(">> MeetingTranscriber::joinMeetingAsync");
        /* eslint-enable no-console */
        const meetingImpl = meeting;
        Contracts_js_1.Contracts.throwIfNullOrUndefined(Exports_js_4.MeetingImpl, "Meeting");
        // ref the meeting object
        // create recognizer and subscribe to recognizer events
        this.privRecognizer = new Exports_js_1.TranscriberRecognizer(meeting.config, this.privAudioConfig);
        Contracts_js_1.Contracts.throwIfNullOrUndefined(this.privRecognizer, "Recognizer");
        this.privRecognizer.connectMeetingCallbacks(this);
        (0, Exports_js_2.marshalPromiseToCallbacks)(meetingImpl.connectTranscriberRecognizer(this.privRecognizer), cb, err);
    }
    /**
     * Starts meeting transcription, until stopTranscribingAsync() is called.
     * User must subscribe to events to receive transcription results.
     * @member MeetingTranscriber.prototype.startTranscribingAsync
     * @function
     * @public
     * @param cb - Callback invoked once the transcription has started.
     * @param err - Callback invoked in case of an error.
     */
    startTranscribingAsync(cb, err) {
        this.privRecognizer.startContinuousRecognitionAsync(cb, err);
    }
    /**
     * Starts meeting transcription, until stopTranscribingAsync() is called.
     * User must subscribe to events to receive transcription results.
     * @member MeetingTranscriber.prototype.stopTranscribingAsync
     * @function
     * @public
     * @param cb - Callback invoked once the transcription has started.
     * @param err - Callback invoked in case of an error.
     */
    stopTranscribingAsync(cb, err) {
        this.privRecognizer.stopContinuousRecognitionAsync(cb, err);
    }
    /**
     * Leave the current meeting. After this is called, you will no longer receive any events.
     */
    leaveMeetingAsync(cb, err) {
        this.privRecognizer.disconnectCallbacks();
        // eslint-disable-next-line
        (0, Exports_js_2.marshalPromiseToCallbacks)((async () => { return; })(), cb, err);
    }
    /**
     * closes all external resources held by an instance of this class.
     * @member MeetingTranscriber.prototype.close
     * @function
     * @public
     */
    close(cb, errorCb) {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedRecognizer);
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.dispose(true), cb, errorCb);
    }
    /**
     * Disposes any resources held by the object.
     * @member MeetingTranscriber.prototype.dispose
     * @function
     * @public
     * @param {boolean} disposing - true if disposing the object.
     */
    async dispose(disposing) {
        if (this.privDisposedRecognizer) {
            return;
        }
        if (!!this.privRecognizer) {
            await this.privRecognizer.close();
            this.privRecognizer = undefined;
        }
        if (disposing) {
            this.privDisposedRecognizer = true;
        }
    }
}
exports.MeetingTranscriber = MeetingTranscriber;



/***/ }),
/* 154 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConversationTranscriptionResult = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Defines result of conversation transcription.
 * @class ConversationTranscriptionResult
 */
class ConversationTranscriptionResult extends Exports_js_1.RecognitionResult {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @public
     * @param {string} resultId - The result id.
     * @param {ResultReason} reason - The reason.
     * @param {string} text - The recognized text.
     * @param {number} duration - The duration.
     * @param {number} offset - The offset into the stream.
     * @param {string} language - Primary Language detected, if provided.
     * @param {string} languageDetectionConfidence - Primary Language confidence ("Unknown," "Low," "Medium," "High"...), if provided.
     * @param {string} speakerId - speaker id for conversation transcription.
     * @param {string} errorDetails - Error details, if provided.
     * @param {string} json - Additional Json, if provided.
     * @param {PropertyCollection} properties - Additional properties, if provided.
     */
    constructor(resultId, reason, text, duration, offset, language, languageDetectionConfidence, speakerId, errorDetails, json, properties) {
        super(resultId, reason, text, duration, offset, language, languageDetectionConfidence, errorDetails, json, properties);
        this.privSpeakerId = speakerId;
    }
    /**
     * speaker id
     * @member ConversationTranscriptionResult.prototype.speakerId
     * @function
     * @public
     * @returns {string} id of speaker in given result
     */
    get speakerId() {
        return this.privSpeakerId;
    }
}
exports.ConversationTranscriptionResult = ConversationTranscriptionResult;



/***/ }),
/* 155 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StreamingSynthesisRequest = exports.SynthesisRequest = exports.Synthesizer = void 0;
const Exports_js_1 = __webpack_require__(2);
const Exports_js_2 = __webpack_require__(4);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_3 = __webpack_require__(85);
class Synthesizer {
    /**
     * Creates and initializes an instance of a Recognizer
     * @constructor
     * @param {SpeechConfig} speechConfig - The speech config to initialize the synthesizer.
     */
    constructor(speechConfig) {
        const speechConfigImpl = speechConfig;
        Contracts_js_1.Contracts.throwIfNull(speechConfigImpl, "speechConfig");
        this.privProperties = speechConfigImpl.properties.clone();
        this.privDisposed = false;
        this.privSynthesizing = false;
        this.synthesisRequestQueue = new Exports_js_2.Queue();
        this.tokenCredential = speechConfig.tokenCredential;
    }
    /**
     * Gets the authorization token used to communicate with the service.
     * @member Synthesizer.prototype.authorizationToken
     * @function
     * @public
     * @returns {string} Authorization token.
     */
    get authorizationToken() {
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token);
    }
    /**
     * Gets/Sets the authorization token used to communicate with the service.
     * @member Synthesizer.prototype.authorizationToken
     * @function
     * @public
     * @param {string} token - Authorization token.
     */
    set authorizationToken(token) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(token, "token");
        this.properties.setProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token, token);
    }
    /**
     * The collection of properties and their values defined for this Synthesizer.
     * @member Synthesizer.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The collection of properties and their values defined for this SpeechSynthesizer.
     */
    get properties() {
        return this.privProperties;
    }
    /**
     * Indicates if auto detect source language is enabled
     * @member Synthesizer.prototype.autoDetectSourceLanguage
     * @function
     * @public
     * @returns {boolean} if auto detect source language is enabled
     */
    get autoDetectSourceLanguage() {
        return this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages) === Exports_js_1.AutoDetectSourceLanguagesOpenRangeOptionName;
    }
    buildSsml(text) {
        const languageToDefaultVoice = {
            ["af-ZA"]: "af-ZA-AdriNeural",
            ["am-ET"]: "am-ET-AmehaNeural",
            ["ar-AE"]: "ar-AE-FatimaNeural",
            ["ar-BH"]: "ar-BH-AliNeural",
            ["ar-DZ"]: "ar-DZ-AminaNeural",
            ["ar-EG"]: "ar-EG-SalmaNeural",
            ["ar-IQ"]: "ar-IQ-BasselNeural",
            ["ar-JO"]: "ar-JO-SanaNeural",
            ["ar-KW"]: "ar-KW-FahedNeural",
            ["ar-LY"]: "ar-LY-ImanNeural",
            ["ar-MA"]: "ar-MA-JamalNeural",
            ["ar-QA"]: "ar-QA-AmalNeural",
            ["ar-SA"]: "ar-SA-HamedNeural",
            ["ar-SY"]: "ar-SY-AmanyNeural",
            ["ar-TN"]: "ar-TN-HediNeural",
            ["ar-YE"]: "ar-YE-MaryamNeural",
            ["bg-BG"]: "bg-BG-BorislavNeural",
            ["bn-BD"]: "bn-BD-NabanitaNeural",
            ["bn-IN"]: "bn-IN-BashkarNeural",
            ["ca-ES"]: "ca-ES-JoanaNeural",
            ["cs-CZ"]: "cs-CZ-AntoninNeural",
            ["cy-GB"]: "cy-GB-AledNeural",
            ["da-DK"]: "da-DK-ChristelNeural",
            ["de-AT"]: "de-AT-IngridNeural",
            ["de-CH"]: "de-CH-JanNeural",
            ["de-DE"]: "de-DE-KatjaNeural",
            ["el-GR"]: "el-GR-AthinaNeural",
            ["en-AU"]: "en-AU-NatashaNeural",
            ["en-CA"]: "en-CA-ClaraNeural",
            ["en-GB"]: "en-GB-LibbyNeural",
            ["en-HK"]: "en-HK-SamNeural",
            ["en-IE"]: "en-IE-ConnorNeural",
            ["en-IN"]: "en-IN-NeerjaNeural",
            ["en-KE"]: "en-KE-AsiliaNeural",
            ["en-NG"]: "en-NG-AbeoNeural",
            ["en-NZ"]: "en-NZ-MitchellNeural",
            ["en-PH"]: "en-PH-JamesNeural",
            ["en-SG"]: "en-SG-LunaNeural",
            ["en-TZ"]: "en-TZ-ElimuNeural",
            ["en-US"]: "en-US-AvaMultilingualNeural",
            ["en-ZA"]: "en-ZA-LeahNeural",
            ["es-AR"]: "es-AR-ElenaNeural",
            ["es-BO"]: "es-BO-MarceloNeural",
            ["es-CL"]: "es-CL-CatalinaNeural",
            ["es-CO"]: "es-CO-GonzaloNeural",
            ["es-CR"]: "es-CR-JuanNeural",
            ["es-CU"]: "es-CU-BelkysNeural",
            ["es-DO"]: "es-DO-EmilioNeural",
            ["es-EC"]: "es-EC-AndreaNeural",
            ["es-ES"]: "es-ES-AlvaroNeural",
            ["es-GQ"]: "es-GQ-JavierNeural",
            ["es-GT"]: "es-GT-AndresNeural",
            ["es-HN"]: "es-HN-CarlosNeural",
            ["es-MX"]: "es-MX-DaliaNeural",
            ["es-NI"]: "es-NI-FedericoNeural",
            ["es-PA"]: "es-PA-MargaritaNeural",
            ["es-PE"]: "es-PE-AlexNeural",
            ["es-PR"]: "es-PR-KarinaNeural",
            ["es-PY"]: "es-PY-MarioNeural",
            ["es-SV"]: "es-SV-LorenaNeural",
            ["es-US"]: "es-US-AlonsoNeural",
            ["es-UY"]: "es-UY-MateoNeural",
            ["es-VE"]: "es-VE-PaolaNeural",
            ["et-EE"]: "et-EE-AnuNeural",
            ["fa-IR"]: "fa-IR-DilaraNeural",
            ["fi-FI"]: "fi-FI-SelmaNeural",
            ["fil-PH"]: "fil-PH-AngeloNeural",
            ["fr-BE"]: "fr-BE-CharlineNeural",
            ["fr-CA"]: "fr-CA-SylvieNeural",
            ["fr-CH"]: "fr-CH-ArianeNeural",
            ["fr-FR"]: "fr-FR-DeniseNeural",
            ["ga-IE"]: "ga-IE-ColmNeural",
            ["gl-ES"]: "gl-ES-RoiNeural",
            ["gu-IN"]: "gu-IN-DhwaniNeural",
            ["he-IL"]: "he-IL-AvriNeural",
            ["hi-IN"]: "hi-IN-MadhurNeural",
            ["hr-HR"]: "hr-HR-GabrijelaNeural",
            ["hu-HU"]: "hu-HU-NoemiNeural",
            ["id-ID"]: "id-ID-ArdiNeural",
            ["is-IS"]: "is-IS-GudrunNeural",
            ["it-IT"]: "it-IT-IsabellaNeural",
            ["ja-JP"]: "ja-JP-NanamiNeural",
            ["jv-ID"]: "jv-ID-DimasNeural",
            ["kk-KZ"]: "kk-KZ-AigulNeural",
            ["km-KH"]: "km-KH-PisethNeural",
            ["kn-IN"]: "kn-IN-GaganNeural",
            ["ko-KR"]: "ko-KR-SunHiNeural",
            ["lo-LA"]: "lo-LA-ChanthavongNeural",
            ["lt-LT"]: "lt-LT-LeonasNeural",
            ["lv-LV"]: "lv-LV-EveritaNeural",
            ["mk-MK"]: "mk-MK-AleksandarNeural",
            ["ml-IN"]: "ml-IN-MidhunNeural",
            ["mr-IN"]: "mr-IN-AarohiNeural",
            ["ms-MY"]: "ms-MY-OsmanNeural",
            ["mt-MT"]: "mt-MT-GraceNeural",
            ["my-MM"]: "my-MM-NilarNeural",
            ["nb-NO"]: "nb-NO-PernilleNeural",
            ["nl-BE"]: "nl-BE-ArnaudNeural",
            ["nl-NL"]: "nl-NL-ColetteNeural",
            ["pl-PL"]: "pl-PL-AgnieszkaNeural",
            ["ps-AF"]: "ps-AF-GulNawazNeural",
            ["pt-BR"]: "pt-BR-FranciscaNeural",
            ["pt-PT"]: "pt-PT-DuarteNeural",
            ["ro-RO"]: "ro-RO-AlinaNeural",
            ["ru-RU"]: "ru-RU-SvetlanaNeural",
            ["si-LK"]: "si-LK-SameeraNeural",
            ["sk-SK"]: "sk-SK-LukasNeural",
            ["sl-SI"]: "sl-SI-PetraNeural",
            ["so-SO"]: "so-SO-MuuseNeural",
            ["sr-RS"]: "sr-RS-NicholasNeural",
            ["su-ID"]: "su-ID-JajangNeural",
            ["sv-SE"]: "sv-SE-SofieNeural",
            ["sw-KE"]: "sw-KE-RafikiNeural",
            ["sw-TZ"]: "sw-TZ-DaudiNeural",
            ["ta-IN"]: "ta-IN-PallaviNeural",
            ["ta-LK"]: "ta-LK-KumarNeural",
            ["ta-SG"]: "ta-SG-AnbuNeural",
            ["te-IN"]: "te-IN-MohanNeural",
            ["th-TH"]: "th-TH-PremwadeeNeural",
            ["tr-TR"]: "tr-TR-AhmetNeural",
            ["uk-UA"]: "uk-UA-OstapNeural",
            ["ur-IN"]: "ur-IN-GulNeural",
            ["ur-PK"]: "ur-PK-AsadNeural",
            ["uz-UZ"]: "uz-UZ-MadinaNeural",
            ["vi-VN"]: "vi-VN-HoaiMyNeural",
            ["zh-CN"]: "zh-CN-XiaoxiaoNeural",
            ["zh-HK"]: "zh-HK-HiuMaanNeural",
            ["zh-TW"]: "zh-TW-HsiaoChenNeural",
            ["zu-ZA"]: "zu-ZA-ThandoNeural",
        };
        let language = this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_SynthLanguage, "en-US");
        let voice = this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_SynthVoice, "");
        let ssml = Synthesizer.XMLEncode(text);
        if (this.autoDetectSourceLanguage) {
            language = "en-US";
        }
        else {
            voice = voice || languageToDefaultVoice[language];
        }
        if (voice) {
            ssml = `<voice name='${voice}'>${ssml}</voice>`;
        }
        ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts' xmlns:emo='http://www.w3.org/2009/10/emotionml' xml:lang='${language}'>${ssml}</speak>`;
        return ssml;
    }
    /**
     * This method performs cleanup of resources.
     * The Boolean parameter disposing indicates whether the method is called
     * from Dispose (if disposing is true) or from the finalizer (if disposing is false).
     * Derived classes should override this method to dispose resource if needed.
     * @member Synthesizer.prototype.dispose
     * @function
     * @public
     * @param {boolean} disposing - Flag to request disposal.
     */
    async dispose(disposing) {
        if (this.privDisposed) {
            return;
        }
        if (disposing) {
            if (this.privAdapter) {
                await this.privAdapter.dispose();
            }
        }
        this.privDisposed = true;
    }
    async adapterSpeak() {
        if (!this.privDisposed && !this.privSynthesizing) {
            this.privSynthesizing = true;
            const request = await this.synthesisRequestQueue.dequeue();
            if (request instanceof StreamingSynthesisRequest) {
                return this.privAdapter.SpeakStream(request.speechSynthesisRequest, request.requestId, request.cb, request.err, request.dataStream);
            }
            return this.privAdapter.Speak(request.text, request.isSSML, request.requestId, request.cb, request.err, request.dataStream);
        }
    }
    createSynthesizerConfig(speechConfig) {
        return new Exports_js_1.SynthesizerConfig(speechConfig, this.privProperties);
    }
    // Does the generic synthesizer setup that is common across all synthesizer types.
    implCommonSynthesizeSetup() {
        let osPlatform = (typeof window !== "undefined") ? "Browser" : "Node";
        let osName = "unknown";
        let osVersion = "unknown";
        if (typeof navigator !== "undefined") {
            osPlatform = osPlatform + "/" + navigator.platform;
            osName = navigator.userAgent;
            osVersion = navigator.appVersion;
        }
        const synthesizerConfig = this.createSynthesizerConfig(new Exports_js_1.SpeechServiceConfig(new Exports_js_1.Context(new Exports_js_1.OS(osPlatform, osName, osVersion))));
        const subscriptionKey = this.privProperties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_Key, undefined);
        const authentication = (subscriptionKey && subscriptionKey !== "")
            ? new Exports_js_1.CognitiveSubscriptionKeyAuthentication(subscriptionKey)
            : (this.tokenCredential)
                ? new Exports_js_1.CognitiveTokenAuthentication(async () => {
                    try {
                        const tokenResponse = await this.tokenCredential.getToken("https://cognitiveservices.azure.com/.default");
                        return tokenResponse?.token ?? "";
                    }
                    catch (err) {
                        throw err;
                    }
                }, async () => {
                    try {
                        const tokenResponse = await this.tokenCredential.getToken("https://cognitiveservices.azure.com/.default");
                        return tokenResponse?.token ?? "";
                    }
                    catch (err) {
                        throw err;
                    }
                })
                : new Exports_js_1.CognitiveTokenAuthentication(() => {
                    const authorizationToken = this.privProperties.getProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token, undefined);
                    return Promise.resolve(authorizationToken);
                }, () => {
                    const authorizationToken = this.privProperties.getProperty(Exports_js_3.PropertyId.SpeechServiceAuthorization_Token, undefined);
                    return Promise.resolve(authorizationToken);
                });
        this.privAdapter = this.createSynthesisAdapter(authentication, this.privConnectionFactory, synthesizerConfig);
        this.privRestAdapter = this.createRestSynthesisAdapter(authentication, synthesizerConfig);
    }
    static XMLEncode(text) {
        return text.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    }
}
exports.Synthesizer = Synthesizer;
class SynthesisRequest {
    constructor(requestId, text, isSSML, cb, err, dataStream) {
        this.requestId = requestId;
        this.text = text;
        this.isSSML = isSSML;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.cb = cb ?? (() => { });
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.err = err ?? (() => { });
        this.dataStream = dataStream ?? undefined;
    }
}
exports.SynthesisRequest = SynthesisRequest;
class StreamingSynthesisRequest {
    constructor(requestId, speechSynthesisRequest, cb, err, dataStream) {
        this.requestId = requestId;
        this.speechSynthesisRequest = speechSynthesisRequest;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.cb = cb ?? (() => { });
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.err = err ?? (() => { });
        this.dataStream = dataStream ?? undefined;
    }
}
exports.StreamingSynthesisRequest = StreamingSynthesisRequest;



/***/ }),
/* 156 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechSynthesizer = void 0;
const Exports_js_1 = __webpack_require__(2);
const Exports_js_2 = __webpack_require__(4);
const AudioFileWriter_js_1 = __webpack_require__(87);
const AudioOutputFormat_js_1 = __webpack_require__(91);
const AudioOutputStream_js_1 = __webpack_require__(90);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_3 = __webpack_require__(85);
const Synthesizer_js_1 = __webpack_require__(155);
/**
 * Defines the class SpeechSynthesizer for text to speech.
 * Updated in version 1.16.0
 * @class SpeechSynthesizer
 */
class SpeechSynthesizer extends Exports_js_3.Synthesizer {
    /**
     * SpeechSynthesizer constructor.
     * @constructor
     * @param {SpeechConfig} speechConfig - An set of initial properties for this synthesizer.
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the synthesizer.
     */
    constructor(speechConfig, audioConfig) {
        super(speechConfig);
        if (audioConfig !== null) {
            if (audioConfig === undefined) {
                this.audioConfig = (typeof window === "undefined") ? undefined : Exports_js_3.AudioConfig.fromDefaultSpeakerOutput();
            }
            else {
                this.audioConfig = audioConfig;
            }
        }
        this.privConnectionFactory = new Exports_js_1.SpeechSynthesisConnectionFactory();
        this.implCommonSynthesizeSetup();
    }
    /**
     * SpeechSynthesizer constructor.
     * @constructor
     * @param {SpeechConfig} speechConfig - an set of initial properties for this synthesizer
     * @param {AutoDetectSourceLanguageConfig} autoDetectSourceLanguageConfig - An source language detection configuration associated with the synthesizer
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the synthesizer
     */
    static FromConfig(speechConfig, autoDetectSourceLanguageConfig, audioConfig) {
        const speechConfigImpl = speechConfig;
        autoDetectSourceLanguageConfig.properties.mergeTo(speechConfigImpl.properties);
        return new SpeechSynthesizer(speechConfig, audioConfig);
    }
    /**
     * Executes speech synthesis on plain text.
     * The task returns the synthesis result.
     * @member SpeechSynthesizer.prototype.speakTextAsync
     * @function
     * @public
     * @param text - Text to be synthesized.
     * @param cb - Callback that received the SpeechSynthesisResult.
     * @param err - Callback invoked in case of an error.
     * @param stream - AudioOutputStream to receive the synthesized audio.
     */
    speakTextAsync(text, cb, err, stream) {
        this.speakImpl(text, false, cb, err, stream);
    }
    /**
     * Executes speech synthesis on SSML.
     * The task returns the synthesis result.
     * @member SpeechSynthesizer.prototype.speakSsmlAsync
     * @function
     * @public
     * @param ssml - SSML to be synthesized.
     * @param cb - Callback that received the SpeechSynthesisResult.
     * @param err - Callback invoked in case of an error.
     * @param stream - AudioOutputStream to receive the synthesized audio.
     */
    speakSsmlAsync(ssml, cb, err, stream) {
        this.speakImpl(ssml, true, cb, err, stream);
    }
    /**
     * Performs synthesis using a SpeechSynthesisRequest, which supports text streaming.
     * This method is in preview and may be subject to change in future versions.
     * @member SpeechSynthesizer.prototype.speakAsync
     * @function
     * @public
     * @param request - The speech synthesis request (supports text streaming input).
     * @param cb - Callback that received the SpeechSynthesisResult.
     * @param err - Callback invoked in case of an error.
     * @param stream - AudioOutputStream to receive the synthesized audio.
     */
    speakAsync(request, cb, err, stream) {
        try {
            Contracts_js_1.Contracts.throwIfDisposed(this.privDisposed);
            const requestId = (0, Exports_js_2.createNoDashGuid)();
            const audioDestination = this.resolveAudioDestination(stream);
            const { onSuccess, onError } = this.createSynthesisCallbacks(cb, err, () => {
                /* eslint-disable no-empty */
                this.adapterSpeak().catch(() => { });
            });
            this.synthesisRequestQueue.enqueue(new Synthesizer_js_1.StreamingSynthesisRequest(requestId, request, onSuccess, onError, audioDestination));
            /* eslint-disable no-empty-function */
            this.adapterSpeak().catch(() => { });
        }
        catch (error) {
            this.handleSpeakError(error, err);
        }
    }
    /**
     * Get list of synthesis voices available.
     * The task returns the synthesis voice result.
     * @member SpeechSynthesizer.prototype.getVoicesAsync
     * @function
     * @async
     * @public
     * @param locale - Locale of voices in BCP-47 format; if left empty, get all available voices.
     * @return {Promise<SynthesisVoicesResult>} - Promise of a SynthesisVoicesResult.
     */
    async getVoicesAsync(locale = "") {
        return this.getVoices(locale);
    }
    /**
     * Dispose of associated resources.
     * @member SpeechSynthesizer.prototype.close
     * @function
     * @public
     */
    close(cb, err) {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposed);
        (0, Exports_js_2.marshalPromiseToCallbacks)(this.dispose(true), cb, err);
    }
    /**
     * @Internal
     * Do not use externally, object returned will change without warning or notice.
     */
    get internalData() {
        return this.privAdapter;
    }
    //
    // ################################################################################################################
    // IMPLEMENTATION.
    // ################################################################################################################
    //
    // Creates the synthesis adapter
    createSynthesisAdapter(authentication, connectionFactory, synthesizerConfig) {
        return new Exports_js_1.SpeechSynthesisAdapter(authentication, connectionFactory, synthesizerConfig, this, this.audioConfig);
    }
    createRestSynthesisAdapter(authentication, synthesizerConfig) {
        return new Exports_js_1.SynthesisRestAdapter(synthesizerConfig, authentication);
    }
    implCommonSynthesizeSetup() {
        super.implCommonSynthesizeSetup();
        this.privAdapter.audioOutputFormat = AudioOutputFormat_js_1.AudioOutputFormatImpl.fromSpeechSynthesisOutputFormat(Exports_js_3.SpeechSynthesisOutputFormat[this.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_SynthOutputFormat, undefined)]);
    }
    speakImpl(text, IsSsml, cb, err, dataStream) {
        try {
            Contracts_js_1.Contracts.throwIfDisposed(this.privDisposed);
            const requestId = (0, Exports_js_2.createNoDashGuid)();
            const audioDestination = this.resolveAudioDestination(dataStream);
            const { onSuccess, onError } = this.createSynthesisCallbacks(cb, err, () => {
                /* eslint-disable no-empty */
                this.adapterSpeak().catch(() => { });
            });
            this.synthesisRequestQueue.enqueue(new Synthesizer_js_1.SynthesisRequest(requestId, text, IsSsml, onSuccess, onError, audioDestination));
            /* eslint-disable no-empty-function */
            this.adapterSpeak().catch(() => { });
        }
        catch (error) {
            this.handleSpeakError(error, err);
        }
    }
    resolveAudioDestination(stream) {
        if (stream instanceof Exports_js_3.PushAudioOutputStreamCallback) {
            return new AudioOutputStream_js_1.PushAudioOutputStreamImpl(stream);
        }
        else if (stream instanceof Exports_js_3.PullAudioOutputStream) {
            return stream;
        }
        else if (stream !== undefined) {
            return new AudioFileWriter_js_1.AudioFileWriter(stream);
        }
        return undefined;
    }
    createSynthesisCallbacks(cb, err, processNext) {
        let successCb = cb;
        return {
            onError: (e) => {
                this.privSynthesizing = false;
                if (!!err) {
                    err(e);
                }
                if (processNext) {
                    processNext();
                }
            },
            onSuccess: (e) => {
                this.privSynthesizing = false;
                if (!!successCb) {
                    try {
                        successCb(e);
                    }
                    catch (e) {
                        if (!!err) {
                            err(e);
                        }
                    }
                }
                successCb = undefined;
                if (processNext) {
                    processNext();
                }
            }
        };
    }
    handleSpeakError(error, err) {
        if (!!err) {
            if (error instanceof Error) {
                const typedError = error;
                err(typedError.name + ": " + typedError.message);
            }
            else {
                err(error);
            }
        }
        // Destroy the synthesizer.
        /* eslint-disable no-empty */
        this.dispose(true).catch(() => { });
    }
    async getVoices(locale) {
        const requestId = (0, Exports_js_2.createNoDashGuid)();
        const response = await this.privRestAdapter.getVoicesList(requestId);
        if (response.ok && Array.isArray(response.json)) {
            let json = response.json;
            if (!!locale && locale.length > 0) {
                json = json.filter((item) => !!item.Locale && item.Locale.toLowerCase() === locale.toLowerCase());
            }
            return new Exports_js_3.SynthesisVoicesResult(requestId, json, undefined);
        }
        else {
            return new Exports_js_3.SynthesisVoicesResult(requestId, undefined, `Error: ${response.status}: ${response.statusText}`);
        }
    }
}
exports.SpeechSynthesizer = SpeechSynthesizer;



/***/ }),
/* 157 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SynthesisResult = void 0;
/**
 * Base class for synthesis results
 * @class SynthesisResult
 * Added in version 1.20.0
 */
class SynthesisResult {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} resultId - The result id.
     * @param {ResultReason} reason - The reason.
     * @param {string} errorDetails - Error details, if provided.
     * @param {PropertyCollection} properties - Additional properties, if provided.
     */
    constructor(resultId, reason, errorDetails, properties) {
        this.privResultId = resultId;
        this.privReason = reason;
        this.privErrorDetails = errorDetails;
        this.privProperties = properties;
    }
    /**
     * Specifies the result identifier.
     * @member SynthesisResult.prototype.resultId
     * @function
     * @public
     * @returns {string} Specifies the result identifier.
     */
    get resultId() {
        return this.privResultId;
    }
    /**
     * Specifies status of the result.
     * @member SynthesisResult.prototype.reason
     * @function
     * @public
     * @returns {ResultReason} Specifies status of the result.
     */
    get reason() {
        return this.privReason;
    }
    /**
     * In case of an unsuccessful synthesis, provides details of the occurred error.
     * @member SynthesisResult.prototype.errorDetails
     * @function
     * @public
     * @returns {string} a brief description of an error.
     */
    get errorDetails() {
        return this.privErrorDetails;
    }
    /**
     * The set of properties exposed in the result.
     * @member SynthesisResult.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The set of properties exposed in the result.
     */
    get properties() {
        return this.privProperties;
    }
}
exports.SynthesisResult = SynthesisResult;



/***/ }),
/* 158 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechSynthesisResult = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Defines result of speech synthesis.
 * @class SpeechSynthesisResult
 * Added in version 1.11.0
 */
class SpeechSynthesisResult extends Exports_js_1.SynthesisResult {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} resultId - The result id.
     * @param {ResultReason} reason - The reason.
     * @param {ArrayBuffer} audioData - The synthesized audio binary.
     * @param {string} errorDetails - Error details, if provided.
     * @param {PropertyCollection} properties - Additional properties, if provided.
     * @param {number} audioDuration - The audio duration.
     */
    constructor(resultId, reason, audioData, errorDetails, properties, audioDuration) {
        super(resultId, reason, errorDetails, properties);
        this.privAudioData = audioData;
        this.privAudioDuration = audioDuration;
    }
    /**
     * The synthesized audio data
     * @member SpeechSynthesisResult.prototype.audioData
     * @function
     * @public
     * @returns {ArrayBuffer} The synthesized audio data.
     */
    get audioData() {
        return this.privAudioData;
    }
    /**
     * The time duration of synthesized audio, in ticks (100 nanoseconds).
     * @member SpeechSynthesisResult.prototype.audioDuration
     * @function
     * @public
     * @returns {number} The time duration of synthesized audio.
     */
    get audioDuration() {
        return this.privAudioDuration;
    }
}
exports.SpeechSynthesisResult = SpeechSynthesisResult;



/***/ }),
/* 159 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechSynthesisEventArgs = void 0;
/**
 * Defines contents of speech synthesis events.
 * @class SpeechSynthesisEventArgs
 * Added in version 1.11.0
 */
class SpeechSynthesisEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {SpeechSynthesisResult} result - The speech synthesis result.
     */
    constructor(result) {
        this.privResult = result;
    }
    /**
     * Specifies the synthesis result.
     * @member SpeechSynthesisEventArgs.prototype.result
     * @function
     * @public
     * @returns {SpeechSynthesisResult} the synthesis result.
     */
    get result() {
        return this.privResult;
    }
}
exports.SpeechSynthesisEventArgs = SpeechSynthesisEventArgs;



/***/ }),
/* 160 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechSynthesisWordBoundaryEventArgs = void 0;
/**
 * Defines contents of speech synthesis word boundary event.
 * @class SpeechSynthesisWordBoundaryEventArgs
 * Added in version 1.11.0
 */
class SpeechSynthesisWordBoundaryEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {number} audioOffset - The audio offset.
     * @param {number} duration - The audio duration.
     * @param {string} text - The text.
     * @param {number} wordLength - The length of the word.
     * @param {number} textOffset - The text offset.
     * @param {SpeechSynthesisBoundaryType} boundaryType - The boundary type
     */
    constructor(audioOffset, duration, text, wordLength, textOffset, boundaryType) {
        this.privAudioOffset = audioOffset;
        this.privDuration = duration;
        this.privText = text;
        this.privWordLength = wordLength;
        this.privTextOffset = textOffset;
        this.privBoundaryType = boundaryType;
    }
    /**
     * Specifies the audio offset.
     * @member SpeechSynthesisWordBoundaryEventArgs.prototype.audioOffset
     * @function
     * @public
     * @returns {number} the audio offset.
     */
    get audioOffset() {
        return this.privAudioOffset;
    }
    /**
     * Specifies the duration, in ticks (100 nanoseconds).
     * @member SpeechSynthesisWordBoundaryEventArgs.prototype.duration
     * @function
     * @public
     * @returns {number} Duration in 100 nanosecond increments.
     */
    get duration() {
        return this.privDuration;
    }
    /**
     * Specifies the text of the word boundary event.
     * @member SpeechSynthesisWordBoundaryEventArgs.prototype.text
     * @function
     * @public
     * @returns {string} the text.
     */
    get text() {
        return this.privText;
    }
    /**
     * Specifies the word length
     * @member SpeechSynthesisWordBoundaryEventArgs.prototype.wordLength
     * @function
     * @public
     * @returns {number} the word length
     */
    get wordLength() {
        return this.privWordLength;
    }
    /**
     * Specifies the text offset.
     * @member SpeechSynthesisWordBoundaryEventArgs.prototype.textOffset
     * @function
     * @public
     * @returns {number} the text offset.
     */
    get textOffset() {
        return this.privTextOffset;
    }
    /**
     * Specifies the boundary type.
     * @member SpeechSynthesisWordBoundaryEventArgs.prototype.boundaryType
     * @function
     * @public
     * @returns {SpeechSynthesisBoundaryType} the boundary type.
     */
    get boundaryType() {
        return this.privBoundaryType;
    }
}
exports.SpeechSynthesisWordBoundaryEventArgs = SpeechSynthesisWordBoundaryEventArgs;



/***/ }),
/* 161 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechSynthesisBookmarkEventArgs = void 0;
/**
 * Defines contents of speech synthesis bookmark event.
 * @class SpeechSynthesisBookmarkEventArgs
 * Added in version 1.16.0
 */
class SpeechSynthesisBookmarkEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {number} audioOffset - The audio offset.
     * @param {string} text - The bookmark text.
     */
    constructor(audioOffset, text) {
        this.privAudioOffset = audioOffset;
        this.privText = text;
    }
    /**
     * Specifies the audio offset.
     * @member SpeechSynthesisBookmarkEventArgs.prototype.audioOffset
     * @function
     * @public
     * @returns {number} the audio offset.
     */
    get audioOffset() {
        return this.privAudioOffset;
    }
    /**
     * Specifies the bookmark.
     * @member SpeechSynthesisBookmarkEventArgs.prototype.text
     * @function
     * @public
     * @returns {string} the bookmark text.
     */
    get text() {
        return this.privText;
    }
}
exports.SpeechSynthesisBookmarkEventArgs = SpeechSynthesisBookmarkEventArgs;



/***/ }),
/* 162 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechSynthesisVisemeEventArgs = void 0;
/**
 * Defines contents of speech synthesis viseme event.
 * @class SpeechSynthesisVisemeEventArgs
 * Added in version 1.16.0
 */
class SpeechSynthesisVisemeEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {number} audioOffset - The audio offset.
     * @param {number} visemeId - The viseme ID.
     * @param {string} animation - The animation, could be in svg or other format.
     */
    constructor(audioOffset, visemeId, animation) {
        this.privAudioOffset = audioOffset;
        this.privVisemeId = visemeId;
        this.privAnimation = animation;
    }
    /**
     * Specifies the audio offset.
     * @member SpeechSynthesisVisemeEventArgs.prototype.audioOffset
     * @function
     * @public
     * @returns {number} the audio offset.
     */
    get audioOffset() {
        return this.privAudioOffset;
    }
    /**
     * Specifies the viseme ID.
     * @member SpeechSynthesisVisemeEventArgs.prototype.visemeId
     * @function
     * @public
     * @returns {number} the viseme ID.
     */
    get visemeId() {
        return this.privVisemeId;
    }
    /**
     * Specifies the animation.
     * @member SpeechSynthesisVisemeEventArgs.prototype.animation
     * @function
     * @public
     * @returns {string} the animation, could be in svg or other format.
     */
    get animation() {
        return this.privAnimation;
    }
}
exports.SpeechSynthesisVisemeEventArgs = SpeechSynthesisVisemeEventArgs;



/***/ }),
/* 163 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechSynthesisBoundaryType = void 0;
/**
 * Defines the boundary type of speech synthesis boundary event.
 * @class SpeechSynthesisBoundaryType
 * Added in version 1.21.0
 */
var SpeechSynthesisBoundaryType;
(function (SpeechSynthesisBoundaryType) {
    /**
     * Indicates the boundary text is a word.
     * @member SpeechSynthesisBoundaryType.Word
     */
    SpeechSynthesisBoundaryType["Word"] = "WordBoundary";
    /**
     * Indicates the boundary text is a punctuation.
     * @member SpeechSynthesisBoundaryType.Punctuation
     */
    SpeechSynthesisBoundaryType["Punctuation"] = "PunctuationBoundary";
    /**
     * Indicates the boundary text is a sentence.
     * @member SpeechSynthesisBoundaryType.Sentence
     */
    SpeechSynthesisBoundaryType["Sentence"] = "SentenceBoundary";
})(SpeechSynthesisBoundaryType = exports.SpeechSynthesisBoundaryType || (exports.SpeechSynthesisBoundaryType = {}));



/***/ }),
/* 164 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechSynthesisRequest = exports.SpeechSynthesisRequestInputStream = void 0;
const Exports_js_1 = __webpack_require__(85);
const SpeechSynthesisRequestInputType_js_1 = __webpack_require__(165);
const SpeechSynthesisRequestInputStream_js_1 = __webpack_require__(166);
var SpeechSynthesisRequestInputStream_js_2 = __webpack_require__(166);
Object.defineProperty(exports, "SpeechSynthesisRequestInputStream", ({ enumerable: true, get: function () { return SpeechSynthesisRequestInputStream_js_2.SpeechSynthesisRequestInputStream; } }));
/**
 * Represents a speech synthesis request with support for text streaming.
 * Note: This class is in preview and may be subject to change in future versions.
 * @class SpeechSynthesisRequest
 */
class SpeechSynthesisRequest {
    /**
     * Creates a speech synthesis request.
     * @param inputType The input type for the speech synthesis request.
     */
    constructor(inputType) {
        this.privBufferedTextPieces = [];
        this.privStreamClosedBeforeReady = false;
        if (inputType !== SpeechSynthesisRequestInputType_js_1.SpeechSynthesisRequestInputType.TextStream) {
            throw new Error("Only TextStream input type is supported in this version.");
        }
        this.privInputType = inputType;
        this.privInputStream = new SpeechSynthesisRequestInputStream_js_1.SpeechSynthesisRequestInputStream(this);
        this.privProperties = new Exports_js_1.PropertyCollection();
    }
    /**
     * Gets the input type of this request.
     */
    get inputType() {
        return this.privInputType;
    }
    /**
     * Gets the input stream for writing text pieces.
     */
    get inputStream() {
        return this.privInputStream;
    }
    /**
     * Gets the properties collection for this request.
     */
    get properties() {
        return this.privProperties;
    }
    /**
     * Sets the pitch of the voice.
     */
    set pitch(value) {
        this.privProperties.setProperty(Exports_js_1.PropertyId.SpeechSynthesisRequest_Pitch, value);
    }
    /**
     * Sets the speaking rate of the voice.
     */
    set rate(value) {
        this.privProperties.setProperty(Exports_js_1.PropertyId.SpeechSynthesisRequest_Rate, value);
    }
    /**
     * Sets the volume of the voice.
     */
    set volume(value) {
        this.privProperties.setProperty(Exports_js_1.PropertyId.SpeechSynthesisRequest_Volume, value);
    }
    /**
     * Sets the style of the voice.
     */
    set style(value) {
        this.privProperties.setProperty(Exports_js_1.PropertyId.SpeechSynthesisRequest_Style, value);
    }
    /**
     * Sets the temperature of the voice synthesis.
     */
    set temperature(value) {
        this.privProperties.setProperty(Exports_js_1.PropertyId.SpeechSynthesisRequest_Temperature, value.toString());
    }
    /**
     * Sets the custom lexicon URL.
     */
    set customLexiconUrl(value) {
        this.privProperties.setProperty(Exports_js_1.PropertyId.SpeechSynthesisRequest_CustomLexiconUrl, value);
    }
    /**
     * Sets the preferred locales for the voice.
     */
    set preferLocales(value) {
        this.privProperties.setProperty(Exports_js_1.PropertyId.SpeechSynthesisRequest_PreferLocales, value);
    }
    /**
     * @internal
     * Called by InputStream when a text piece is written.
     * Buffers text if no callback is registered yet.
     */
    onTextPieceReceived(text) {
        if (this.privTextPieceCallback) {
            this.privTextPieceCallback(text);
        }
        else {
            this.privBufferedTextPieces.push(text);
        }
    }
    /**
     * @internal
     * Called by InputStream when it is closed.
     * Buffers close event if no callback is registered yet.
     */
    onInputStreamClosed() {
        if (this.privStreamCloseCallback) {
            this.privStreamCloseCallback();
        }
        else {
            this.privStreamClosedBeforeReady = true;
        }
    }
    /**
     * @internal
     * Sets the callback for receiving text pieces.
     * Flushes any buffered text pieces immediately.
     */
    set onTextPiece(callback) {
        this.privTextPieceCallback = callback;
        // Flush buffered text pieces
        for (const text of this.privBufferedTextPieces) {
            callback(text);
        }
        this.privBufferedTextPieces = [];
    }
    /**
     * @internal
     * Sets the callback for stream close events.
     * Fires immediately if stream was already closed.
     */
    set onClose(callback) {
        this.privStreamCloseCallback = callback;
        // Fire if stream was already closed before callback was set
        if (this.privStreamClosedBeforeReady) {
            this.privStreamClosedBeforeReady = false;
            callback();
        }
    }
}
exports.SpeechSynthesisRequest = SpeechSynthesisRequest;



/***/ }),
/* 165 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechSynthesisRequestInputType = void 0;
/**
 * Defines the input type of speech synthesis request.
 * @enum SpeechSynthesisRequestInputType
 */
var SpeechSynthesisRequestInputType;
(function (SpeechSynthesisRequestInputType) {
    /**
     * Plain text input.
     */
    SpeechSynthesisRequestInputType[SpeechSynthesisRequestInputType["Text"] = 1] = "Text";
    /**
     * SSML (Speech Synthesis Markup Language) input.
     */
    SpeechSynthesisRequestInputType[SpeechSynthesisRequestInputType["SSML"] = 2] = "SSML";
    /**
     * Text stream input, for streaming text to the synthesizer.
     */
    SpeechSynthesisRequestInputType[SpeechSynthesisRequestInputType["TextStream"] = 3] = "TextStream";
})(SpeechSynthesisRequestInputType = exports.SpeechSynthesisRequestInputType || (exports.SpeechSynthesisRequestInputType = {}));



/***/ }),
/* 166 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechSynthesisRequestInputStream = void 0;
/**
 * Represents an input stream for speech synthesis request text streaming.
 * Note: This class is in preview and may be subject to change in future versions.
 * @class SpeechSynthesisRequestInputStream
 */
class SpeechSynthesisRequestInputStream {
    /**
     * Constructor for internal use.
     * @param parent The parent SpeechSynthesisRequest.
     */
    constructor(parent) {
        this.privClosed = false;
        this.privParent = parent;
    }
    /**
     * Writes the specified text to the input stream.
     * @param text The text to be written to the input stream.
     */
    write(text) {
        if (this.privClosed) {
            throw new Error("Cannot write to a closed input stream.");
        }
        this.privParent.onTextPieceReceived(text);
    }
    /**
     * Closes the input stream, signaling that no more text will be written.
     */
    close() {
        if (!this.privClosed) {
            this.privClosed = true;
            this.privParent.onInputStreamClosed();
        }
    }
    /**
     * Gets whether the input stream is closed.
     */
    get isClosed() {
        return this.privClosed;
    }
}
exports.SpeechSynthesisRequestInputStream = SpeechSynthesisRequestInputStream;



/***/ }),
/* 167 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SynthesisVoicesResult = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Defines result of speech synthesis.
 * @class SynthesisVoicesResult
 * Added in version 1.20.0
 */
class SynthesisVoicesResult extends Exports_js_1.SynthesisResult {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param requestId - result id for request.
     * @param json - json payload from endpoint.
     */
    constructor(requestId, json, errorDetails) {
        if (Array.isArray(json)) {
            super(requestId, Exports_js_1.ResultReason.VoicesListRetrieved, undefined, new Exports_js_1.PropertyCollection());
            this.privVoices = [];
            for (const item of json) {
                this.privVoices.push(new Exports_js_1.VoiceInfo(item));
            }
        }
        else {
            super(requestId, Exports_js_1.ResultReason.Canceled, errorDetails ? errorDetails : "Error information unavailable", new Exports_js_1.PropertyCollection());
        }
    }
    /**
     * The list of voices
     * @member SynthesisVoicesResult.prototype.voices
     * @function
     * @public
     * @returns {VoiceInfo[]} List of synthesized voices.
     */
    get voices() {
        return this.privVoices;
    }
}
exports.SynthesisVoicesResult = SynthesisVoicesResult;



/***/ }),
/* 168 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VoiceInfo = exports.SynthesisVoiceType = exports.SynthesisVoiceGender = void 0;
/**
 * Defines the gender of synthesis voices.
 * Added in version 1.20.0.
 */
var SynthesisVoiceGender;
(function (SynthesisVoiceGender) {
    /** Gender unknown */
    SynthesisVoiceGender[SynthesisVoiceGender["Unknown"] = 0] = "Unknown";
    /** Female voice */
    SynthesisVoiceGender[SynthesisVoiceGender["Female"] = 1] = "Female";
    /** Male voice */
    SynthesisVoiceGender[SynthesisVoiceGender["Male"] = 2] = "Male";
    /** Neutral voice */
    SynthesisVoiceGender[SynthesisVoiceGender["Neutral"] = 3] = "Neutral";
})(SynthesisVoiceGender = exports.SynthesisVoiceGender || (exports.SynthesisVoiceGender = {}));
var SynthesisVoiceType;
(function (SynthesisVoiceType) {
    /**
     * Voice type is not known.
     */
    SynthesisVoiceType[SynthesisVoiceType["Unknown"] = 0] = "Unknown";
    /**
     * Online neural voices.
     */
    SynthesisVoiceType[SynthesisVoiceType["OnlineNeural"] = 1] = "OnlineNeural";
    /**
     * Online standard voices. These voices are deprecated.
     */
    SynthesisVoiceType[SynthesisVoiceType["OnlineStandard"] = 2] = "OnlineStandard";
    /**
     * Offline neural voices.
     */
    SynthesisVoiceType[SynthesisVoiceType["OfflineNeural"] = 3] = "OfflineNeural";
    /**
     * Offline standard voices.
     */
    SynthesisVoiceType[SynthesisVoiceType["OfflineStandard"] = 4] = "OfflineStandard";
    /**
     * High definition (HD) voices. Refer to https://learn.microsoft.com/azure/ai-services/speech-service/high-definition-voices
     */
    SynthesisVoiceType[SynthesisVoiceType["OnlineNeuralHD"] = 5] = "OnlineNeuralHD";
})(SynthesisVoiceType = exports.SynthesisVoiceType || (exports.SynthesisVoiceType = {}));
const GENDER_LOOKUP = {
    [SynthesisVoiceGender[SynthesisVoiceGender.Neutral]]: SynthesisVoiceGender.Neutral,
    [SynthesisVoiceGender[SynthesisVoiceGender.Male]]: SynthesisVoiceGender.Male,
    [SynthesisVoiceGender[SynthesisVoiceGender.Female]]: SynthesisVoiceGender.Female,
};
const VOICE_TYPE_LOOKUP = {
    Neural: SynthesisVoiceType.OnlineNeural,
    NeuralHD: SynthesisVoiceType.OnlineNeuralHD,
};
/**
 * Information about Speech Synthesis voice
 * Added in version 1.20.0.
 * @class VoiceInfo
 */
class VoiceInfo {
    constructor(json) {
        this.privStyleList = [];
        if (!!json) {
            this.privName = json.Name;
            this.privLocale = json.Locale;
            this.privShortName = json.ShortName;
            this.privLocaleName = json.LocaleName;
            this.privDisplayName = json.DisplayName;
            this.privLocalName = json.LocalName;
            this.privVoiceType = VOICE_TYPE_LOOKUP[json.VoiceType] || SynthesisVoiceType.Unknown;
            this.privGender = GENDER_LOOKUP[json.Gender] || SynthesisVoiceGender.Unknown;
            if (!!json.StyleList && Array.isArray(json.StyleList)) {
                for (const style of json.StyleList) {
                    this.privStyleList.push(style);
                }
            }
            this.privSampleRateHertz = json.SampleRateHertz;
            this.privStatus = json.Status;
            if (json.ExtendedPropertyMap) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.privExtendedPropertyMap = json.ExtendedPropertyMap;
            }
            this.privWordsPerMinute = json.WordsPerMinute;
            if (Array.isArray(json.SecondaryLocaleList)) {
                this.privSecondaryLocaleList = [...json.SecondaryLocaleList];
            }
            if (Array.isArray(json.RolePlayList)) {
                this.privRolePlayList = [...json.RolePlayList];
            }
            if (json.VoiceTag) {
                this.privVoiceTag = json.VoiceTag;
            }
        }
    }
    get name() {
        return this.privName;
    }
    get locale() {
        return this.privLocale;
    }
    get shortName() {
        return this.privShortName;
    }
    get displayName() {
        return this.privDisplayName;
    }
    get localName() {
        return this.privLocalName;
    }
    get localeName() {
        return this.privLocaleName;
    }
    get gender() {
        return this.privGender;
    }
    get voiceType() {
        return this.privVoiceType;
    }
    get styleList() {
        return this.privStyleList;
    }
    get sampleRateHertz() {
        return this.privSampleRateHertz;
    }
    get status() {
        return this.privStatus;
    }
    get extendedPropertyMap() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.privExtendedPropertyMap;
    }
    get wordsPerMinute() {
        return this.privWordsPerMinute;
    }
    get secondaryLocaleList() {
        return this.privSecondaryLocaleList;
    }
    get rolePlayList() {
        return this.privRolePlayList;
    }
    get voiceTag() {
        return this.privVoiceTag;
    }
}
exports.VoiceInfo = VoiceInfo;



/***/ }),
/* 169 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeakerAudioDestination = void 0;
const Exports_js_1 = __webpack_require__(4);
const AudioOutputStream_js_1 = __webpack_require__(90);
const AudioStreamFormat_js_1 = __webpack_require__(73);
const MediaDurationPlaceholderSeconds = 60 * 30;
const AudioFormatToMimeType = {
    [AudioStreamFormat_js_1.AudioFormatTag.PCM]: "audio/wav",
    [AudioStreamFormat_js_1.AudioFormatTag.MuLaw]: "audio/x-wav",
    [AudioStreamFormat_js_1.AudioFormatTag.MP3]: "audio/mpeg",
    [AudioStreamFormat_js_1.AudioFormatTag.OGG_OPUS]: "audio/ogg",
    [AudioStreamFormat_js_1.AudioFormatTag.WEBM_OPUS]: "audio/webm; codecs=opus",
    [AudioStreamFormat_js_1.AudioFormatTag.ALaw]: "audio/x-wav",
    [AudioStreamFormat_js_1.AudioFormatTag.FLAC]: "audio/flac",
    [AudioStreamFormat_js_1.AudioFormatTag.AMR_WB]: "audio/amr-wb",
    [AudioStreamFormat_js_1.AudioFormatTag.G722]: "audio/G722",
};
/**
 * Represents the speaker playback audio destination, which only works in browser.
 * Note: the SDK will try to use <a href="https://www.w3.org/TR/media-source/">Media Source Extensions</a> to play audio.
 * Mp3 format has better supports on Microsoft Edge, Chrome and Safari (desktop), so, it's better to specify mp3 format for playback.
 * @class SpeakerAudioDestination
 * Updated in version 1.17.0
 */
class SpeakerAudioDestination {
    constructor(audioDestinationId) {
        this.privPlaybackStarted = false;
        this.privAppendingToBuffer = false;
        this.privMediaSourceOpened = false;
        this.privBytesReceived = 0;
        this.privId = audioDestinationId ? audioDestinationId : (0, Exports_js_1.createNoDashGuid)();
        this.privIsPaused = false;
        this.privIsClosed = false;
    }
    id() {
        return this.privId;
    }
    write(buffer, cb, err) {
        if (this.privAudioBuffer !== undefined) {
            this.privAudioBuffer.push(buffer);
            this.updateSourceBuffer().then(() => {
                if (!!cb) {
                    cb();
                }
            }, (error) => {
                if (!!err) {
                    err(error);
                }
            });
        }
        else if (this.privAudioOutputStream !== undefined) {
            this.privAudioOutputStream.write(buffer);
            this.privBytesReceived += buffer.byteLength;
        }
    }
    close(cb, err) {
        this.privIsClosed = true;
        if (this.privSourceBuffer !== undefined) {
            this.handleSourceBufferUpdateEnd().then(() => {
                if (!!cb) {
                    cb();
                }
            }, (error) => {
                if (!!err) {
                    err(error);
                }
            });
        }
        else if (this.privAudioOutputStream !== undefined && typeof window !== "undefined") {
            if ((this.privFormat.formatTag === AudioStreamFormat_js_1.AudioFormatTag.PCM || this.privFormat.formatTag === AudioStreamFormat_js_1.AudioFormatTag.MuLaw
                || this.privFormat.formatTag === AudioStreamFormat_js_1.AudioFormatTag.ALaw) && this.privFormat.hasHeader === false) {
                // eslint-disable-next-line no-console
                console.warn("Play back is not supported for raw PCM, mulaw or alaw format without header.");
                if (!!this.onAudioEnd) {
                    this.onAudioEnd(this);
                }
            }
            else {
                let receivedAudio = new ArrayBuffer(this.privBytesReceived);
                this.privAudioOutputStream.read(receivedAudio).then(() => {
                    receivedAudio = this.privFormat.addHeader(receivedAudio);
                    const audioBlob = new Blob([receivedAudio], { type: AudioFormatToMimeType[this.privFormat.formatTag] });
                    this.privAudio.src = window.URL.createObjectURL(audioBlob);
                    this.notifyPlayback().then(() => {
                        if (!!cb) {
                            cb();
                        }
                    }, (error) => {
                        if (!!err) {
                            err(error);
                        }
                    });
                }, (error) => {
                    if (!!err) {
                        err(error);
                    }
                });
            }
        }
        else {
            // unsupported format, call onAudioEnd directly.
            if (!!this.onAudioEnd) {
                this.onAudioEnd(this);
            }
        }
    }
    set format(format) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (typeof (AudioContext) !== "undefined" || (typeof (window) !== "undefined" && typeof (window.webkitAudioContext) !== "undefined")) {
            this.privFormat = format;
            const mimeType = AudioFormatToMimeType[this.privFormat.formatTag];
            if (mimeType === undefined) {
                // eslint-disable-next-line no-console
                console.warn(`Unknown mimeType for format ${AudioStreamFormat_js_1.AudioFormatTag[this.privFormat.formatTag]}; playback is not supported.`);
            }
            else if (typeof (MediaSource) !== "undefined" && MediaSource.isTypeSupported(mimeType)) {
                this.privAudio = new Audio();
                this.privAudioBuffer = [];
                this.privMediaSource = new MediaSource();
                this.privAudio.src = URL.createObjectURL(this.privMediaSource);
                this.privAudio.load();
                this.privMediaSource.onsourceopen = () => {
                    this.privMediaSourceOpened = true;
                    this.privMediaSource.duration = MediaDurationPlaceholderSeconds;
                    this.privSourceBuffer = this.privMediaSource.addSourceBuffer(mimeType);
                    this.privSourceBuffer.onupdate = () => {
                        this.updateSourceBuffer().catch((reason) => {
                            Exports_js_1.Events.instance.onEvent(new Exports_js_1.BackgroundEvent(reason));
                        });
                    };
                    this.privSourceBuffer.onupdateend = () => {
                        this.handleSourceBufferUpdateEnd().catch((reason) => {
                            Exports_js_1.Events.instance.onEvent(new Exports_js_1.BackgroundEvent(reason));
                        });
                    };
                    this.privSourceBuffer.onupdatestart = () => {
                        this.privAppendingToBuffer = false;
                    };
                };
                this.updateSourceBuffer().catch((reason) => {
                    Exports_js_1.Events.instance.onEvent(new Exports_js_1.BackgroundEvent(reason));
                });
            }
            else {
                // eslint-disable-next-line no-console
                console.warn(`Format ${AudioStreamFormat_js_1.AudioFormatTag[this.privFormat.formatTag]} could not be played by MSE, streaming playback is not enabled.`);
                this.privAudioOutputStream = new AudioOutputStream_js_1.PullAudioOutputStreamImpl();
                this.privAudioOutputStream.format = this.privFormat;
                this.privAudio = new Audio();
            }
        }
    }
    get volume() {
        return this.privAudio?.volume ?? -1;
    }
    set volume(volume) {
        if (!!this.privAudio) {
            this.privAudio.volume = volume;
        }
    }
    mute() {
        if (!!this.privAudio) {
            this.privAudio.muted = true;
        }
    }
    unmute() {
        if (!!this.privAudio) {
            this.privAudio.muted = false;
        }
    }
    get isClosed() {
        return this.privIsClosed;
    }
    get currentTime() {
        if (this.privAudio !== undefined) {
            return this.privAudio.currentTime;
        }
        return -1;
    }
    pause() {
        if (!this.privIsPaused && this.privAudio !== undefined) {
            this.privAudio.pause();
            this.privIsPaused = true;
        }
    }
    resume(cb, err) {
        if (this.privIsPaused && this.privAudio !== undefined) {
            this.privAudio.play().then(() => {
                if (!!cb) {
                    cb();
                }
            }, (error) => {
                if (!!err) {
                    err(error);
                }
            });
            this.privIsPaused = false;
        }
    }
    get internalAudio() {
        return this.privAudio;
    }
    async updateSourceBuffer() {
        if (this.privAudioBuffer !== undefined && (this.privAudioBuffer.length > 0) && this.sourceBufferAvailable()) {
            this.privAppendingToBuffer = true;
            const binary = this.privAudioBuffer.shift();
            try {
                this.privSourceBuffer.appendBuffer(binary);
            }
            catch (error) {
                this.privAudioBuffer.unshift(binary);
                // eslint-disable-next-line no-console
                console.log("buffer filled, pausing addition of binaries until space is made");
                return;
            }
            await this.notifyPlayback();
        }
        else if (this.canEndStream()) {
            await this.handleSourceBufferUpdateEnd();
        }
    }
    async handleSourceBufferUpdateEnd() {
        if (this.canEndStream() && this.sourceBufferAvailable()) {
            this.privMediaSource.endOfStream();
            await this.notifyPlayback();
        }
    }
    async notifyPlayback() {
        if (!this.privPlaybackStarted && this.privAudio !== undefined) {
            this.privPlaybackStarted = true;
            if (!!this.onAudioStart) {
                this.onAudioStart(this);
            }
            this.privAudio.onended = () => {
                if (!!this.onAudioEnd) {
                    this.onAudioEnd(this);
                }
            };
            if (!this.privIsPaused) {
                await this.privAudio.play();
            }
        }
    }
    canEndStream() {
        return (this.isClosed && this.privSourceBuffer !== undefined && (this.privAudioBuffer.length === 0)
            && this.privMediaSourceOpened && !this.privAppendingToBuffer && this.privMediaSource.readyState === "open");
    }
    sourceBufferAvailable() {
        return (this.privSourceBuffer !== undefined && !this.privSourceBuffer.updating);
    }
}
exports.SpeakerAudioDestination = SpeakerAudioDestination;



/***/ }),
/* 170 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConversationTranscriptionCanceledEventArgs = void 0;
const CancellationEventArgsBase_js_1 = __webpack_require__(104);
/**
 * Defines content of a RecognitionErrorEvent.
 * @class ConversationTranscriptionCanceledEventArgs
 */
class ConversationTranscriptionCanceledEventArgs extends CancellationEventArgsBase_js_1.CancellationEventArgsBase {
}
exports.ConversationTranscriptionCanceledEventArgs = ConversationTranscriptionCanceledEventArgs;



/***/ }),
/* 171 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingTranscriptionCanceledEventArgs = void 0;
const CancellationEventArgsBase_js_1 = __webpack_require__(104);
/**
 * Defines content of a MeetingTranscriptionCanceledEvent.
 * @class MeetingTranscriptionCanceledEventArgs
 */
class MeetingTranscriptionCanceledEventArgs extends CancellationEventArgsBase_js_1.CancellationEventArgsBase {
}
exports.MeetingTranscriptionCanceledEventArgs = MeetingTranscriptionCanceledEventArgs;



/***/ }),
/* 172 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PronunciationAssessmentGradingSystem = void 0;
/**
 * Defines the point system for pronunciation score calibration; default value is FivePoint.
 * Added in version 1.15.0
 * @class PronunciationAssessmentGradingSystem
 */
var PronunciationAssessmentGradingSystem;
(function (PronunciationAssessmentGradingSystem) {
    /**
     * Five point calibration
     * @member PronunciationAssessmentGradingSystem.FivePoint
     */
    PronunciationAssessmentGradingSystem[PronunciationAssessmentGradingSystem["FivePoint"] = 1] = "FivePoint";
    /**
     * Hundred mark
     * @member PronunciationAssessmentGradingSystem.HundredMark
     */
    PronunciationAssessmentGradingSystem[PronunciationAssessmentGradingSystem["HundredMark"] = 2] = "HundredMark";
})(PronunciationAssessmentGradingSystem = exports.PronunciationAssessmentGradingSystem || (exports.PronunciationAssessmentGradingSystem = {}));



/***/ }),
/* 173 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PronunciationAssessmentGranularity = void 0;
/**
 * Defines the pronunciation evaluation granularity; default value is Phoneme.
 * Added in version 1.15.0
 * @class PronunciationAssessmentGranularity
 */
var PronunciationAssessmentGranularity;
(function (PronunciationAssessmentGranularity) {
    /**
     * Shows the score on the full text, word and phoneme level
     * @member PronunciationAssessmentGranularity.Phoneme
     */
    PronunciationAssessmentGranularity[PronunciationAssessmentGranularity["Phoneme"] = 1] = "Phoneme";
    /**
     * Shows the score on the full text and word level
     * @member PronunciationAssessmentGranularity.Word
     */
    PronunciationAssessmentGranularity[PronunciationAssessmentGranularity["Word"] = 2] = "Word";
    /**
     * Shows the score on the full text level only
     * @member PronunciationAssessmentGranularity.FullText
     */
    PronunciationAssessmentGranularity[PronunciationAssessmentGranularity["FullText"] = 3] = "FullText";
})(PronunciationAssessmentGranularity = exports.PronunciationAssessmentGranularity || (exports.PronunciationAssessmentGranularity = {}));



/***/ }),
/* 174 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PronunciationAssessmentConfig = void 0;
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_1 = __webpack_require__(85);
/**
 * Pronunciation assessment configuration.
 * @class PronunciationAssessmentConfig
 * Added in version 1.15.0.
 */
class PronunciationAssessmentConfig {
    /**
     * PronunciationAssessmentConfig constructor.
     * @constructor
     * @param {string} referenceText
     * @param gradingSystem
     * @param granularity
     * @param enableMiscue
     */
    constructor(referenceText, gradingSystem = Exports_js_1.PronunciationAssessmentGradingSystem.FivePoint, granularity = Exports_js_1.PronunciationAssessmentGranularity.Phoneme, enableMiscue = false) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(referenceText, "referenceText");
        this.privProperties = new Exports_js_1.PropertyCollection();
        this.privProperties.setProperty(Exports_js_1.PropertyId.PronunciationAssessment_ReferenceText, referenceText);
        this.privProperties.setProperty(Exports_js_1.PropertyId.PronunciationAssessment_GradingSystem, Exports_js_1.PronunciationAssessmentGradingSystem[gradingSystem]);
        this.privProperties.setProperty(Exports_js_1.PropertyId.PronunciationAssessment_Granularity, Exports_js_1.PronunciationAssessmentGranularity[granularity]);
        this.privProperties.setProperty(Exports_js_1.PropertyId.PronunciationAssessment_EnableMiscue, String(enableMiscue));
    }
    /**
     * @member PronunciationAssessmentConfig.fromJSON
     * @function
     * @public
     * @param {string} json The json string containing the pronunciation assessment parameters.
     * @return {PronunciationAssessmentConfig} Instance of PronunciationAssessmentConfig
     * @summary Creates an instance of the PronunciationAssessmentConfig from json.
     * This method is designed to support the pronunciation assessment parameters still in preview.
     * Under normal circumstances, use the constructor instead.
     */
    static fromJSON(json) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(json, "json");
        const config = new PronunciationAssessmentConfig("");
        config.privProperties = new Exports_js_1.PropertyCollection();
        config.properties.setProperty(Exports_js_1.PropertyId.PronunciationAssessment_Json, json);
        return config;
    }
    toJSON() {
        this.updateJson();
        return this.privProperties.getProperty(Exports_js_1.PropertyId.PronunciationAssessment_Params);
    }
    applyTo(recognizer) {
        this.updateJson();
        const recoBase = recognizer.internalData;
        recoBase.speechContext.setPronunciationAssessmentParams(this.properties.getProperty(Exports_js_1.PropertyId.PronunciationAssessment_Params), recoBase.isSpeakerDiarizationEnabled);
    }
    /**
     * Gets the reference text.
     * @member PronunciationAssessmentConfig.prototype.referenceText
     * @function
     * @public
     * @returns {string} Reference text.
     */
    get referenceText() {
        return this.properties.getProperty(Exports_js_1.PropertyId.PronunciationAssessment_ReferenceText);
    }
    /**
     * Gets/Sets the reference text.
     * @member PronunciationAssessmentConfig.prototype.referenceText
     * @function
     * @public
     * @param {string} referenceText - Reference text.
     */
    set referenceText(referenceText) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(referenceText, "referenceText");
        this.properties.setProperty(Exports_js_1.PropertyId.PronunciationAssessment_ReferenceText, referenceText);
    }
    /**
     * Sets the phoneme alphabet.
     * The valid values are "SAPI" (default) and "IPA".
     * Added in version 1.20.0
     * @member PronunciationAssessmentConfig.prototype.phonemeAlphabet
     * @function
     * @public
     * @param {string} phonemeAlphabet - Phoneme alphabet.
     */
    set phonemeAlphabet(phonemeAlphabet) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(phonemeAlphabet, "phonemeAlphabet");
        this.privPhonemeAlphabet = phonemeAlphabet;
    }
    /**
     * Sets the boolean enableMiscue property.
     * Added in version 1.26.0
     * @member PronunciationAssessmentConfig.prototype.enableMiscue
     * @function
     * @public
     * @param {boolean} enableMiscue - enable miscue.
     */
    set enableMiscue(enableMiscue) {
        const enableMiscueString = enableMiscue ? "true" : "false";
        this.properties.setProperty(Exports_js_1.PropertyId.PronunciationAssessment_EnableMiscue, enableMiscueString);
    }
    /**
     * Gets the boolean enableMiscue property.
     * Added in version 1.26.0
     * @member PronunciationAssessmentConfig.prototype.enableMiscue
     * @function
     * @public
     * @return {boolean} enableMiscue - enable miscue.
     */
    get enableMiscue() {
        const enableMiscueString = this.properties.getProperty(Exports_js_1.PropertyId.PronunciationAssessment_EnableMiscue, "false");
        return (enableMiscueString.toLowerCase() === "true");
    }
    /**
     * Sets the nbest phoneme count
     * Added in version 1.20.0
     * @member PronunciationAssessmentConfig.prototype.nbestPhonemeCount
     * @function
     * @public
     * @param {number} nbestPhonemeCount - NBest phoneme count.
     */
    set nbestPhonemeCount(nbestPhonemeCount) {
        this.privNBestPhonemeCount = nbestPhonemeCount;
    }
    /**
     * Enables the prosody assessment.
     * Added in version 1.34.0
     * @member PronunciationAssessmentConfig.prototype.enableProsodyAssessment
     * @function
     * @public
     * @param {boolean} enableProsodyAssessment - enable prosody assessment.
     */
    set enableProsodyAssessment(enableProsodyAssessment) {
        this.privEnableProsodyAssessment = enableProsodyAssessment;
    }
    /**
     * @member PronunciationAssessmentConfig.prototype.properties
     * @function
     * @public
     * @return {PropertyCollection} Properties of the config.
     * @summary Gets a pronunciation assessment config properties
     */
    get properties() {
        return this.privProperties;
    }
    updateJson() {
        const jsonString = this.privProperties.getProperty(Exports_js_1.PropertyId.PronunciationAssessment_Json, "{}");
        const paramsJson = JSON.parse(jsonString);
        const referenceText = this.privProperties.getProperty(Exports_js_1.PropertyId.PronunciationAssessment_ReferenceText);
        if (referenceText) {
            paramsJson.referenceText = referenceText;
        }
        const gradingSystem = this.privProperties.getProperty(Exports_js_1.PropertyId.PronunciationAssessment_GradingSystem);
        if (gradingSystem) {
            paramsJson.gradingSystem = gradingSystem;
        }
        const granularity = this.privProperties.getProperty(Exports_js_1.PropertyId.PronunciationAssessment_Granularity);
        if (granularity) {
            paramsJson.granularity = granularity;
        }
        if (this.privPhonemeAlphabet) {
            paramsJson.phonemeAlphabet = this.privPhonemeAlphabet;
        }
        if (this.privNBestPhonemeCount) {
            paramsJson.nbestPhonemeCount = this.privNBestPhonemeCount;
        }
        paramsJson.enableProsodyAssessment = this.privEnableProsodyAssessment;
        // always set dimension to Comprehensive
        paramsJson.dimension = "Comprehensive";
        const enableMiscueString = this.privProperties.getProperty(Exports_js_1.PropertyId.PronunciationAssessment_EnableMiscue);
        if (enableMiscueString) {
            paramsJson.enableMiscue = this.enableMiscue;
        }
        this.privProperties.setProperty(Exports_js_1.PropertyId.PronunciationAssessment_Params, JSON.stringify(paramsJson));
    }
}
exports.PronunciationAssessmentConfig = PronunciationAssessmentConfig;



/***/ }),
/* 175 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PronunciationAssessmentResult = void 0;
/* eslint-disable max-classes-per-file */
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_1 = __webpack_require__(85);
/**
 * Pronunciation assessment results.
 * @class PronunciationAssessmentResult
 * Added in version 1.15.0.
 */
class PronunciationAssessmentResult {
    constructor(jsonString) {
        const j = JSON.parse(jsonString);
        Contracts_js_1.Contracts.throwIfNullOrUndefined(j.NBest[0], "NBest");
        this.privPronJson = j.NBest[0];
    }
    /**
     * @member PronunciationAssessmentResult.fromResult
     * @function
     * @public
     * @param {RecognitionResult} result The recognition result.
     * @return {PronunciationAssessmentConfig} Instance of PronunciationAssessmentConfig
     * @summary Creates an instance of the PronunciationAssessmentResult from recognition result.
     */
    static fromResult(result) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(result, "result");
        const json = result.properties.getProperty(Exports_js_1.PropertyId.SpeechServiceResponse_JsonResult);
        Contracts_js_1.Contracts.throwIfNullOrUndefined(json, "json");
        return new PronunciationAssessmentResult(json);
    }
    /**
     * Gets the detail result of pronunciation assessment.
     * @member PronunciationAssessmentConfig.prototype.detailResult
     * @function
     * @public
     * @returns {DetailResult} detail result.
     */
    get detailResult() {
        return this.privPronJson;
    }
    /**
     * The score indicating the pronunciation accuracy of the given speech, which indicates
     * how closely the phonemes match a native speaker's pronunciation.
     * @member PronunciationAssessmentResult.prototype.accuracyScore
     * @function
     * @public
     * @returns {number} Accuracy score.
     */
    get accuracyScore() {
        return this.detailResult.PronunciationAssessment?.AccuracyScore;
    }
    /**
     * The overall score indicating the pronunciation quality of the given speech.
     * This is calculated from AccuracyScore, FluencyScore and CompletenessScore with weight.
     * @member PronunciationAssessmentResult.prototype.pronunciationScore
     * @function
     * @public
     * @returns {number} Pronunciation score.
     */
    get pronunciationScore() {
        return this.detailResult.PronunciationAssessment?.PronScore;
    }
    /**
     * The score indicating the completeness of the given speech by calculating the ratio of pronounced words towards entire input.
     * @member PronunciationAssessmentResult.prototype.completenessScore
     * @function
     * @public
     * @returns {number} Completeness score.
     */
    get completenessScore() {
        return this.detailResult.PronunciationAssessment?.CompletenessScore;
    }
    /**
     * The score indicating the fluency of the given speech.
     * @member PronunciationAssessmentResult.prototype.fluencyScore
     * @function
     * @public
     * @returns {number} Fluency score.
     */
    get fluencyScore() {
        return this.detailResult.PronunciationAssessment?.FluencyScore;
    }
    /**
     * The prosody score, which indicates how nature of the given speech, including stress, intonation, speaking speed and rhythm.
     * @member PronunciationAssessmentResult.prototype.prosodyScore
     * @function
     * @public
     * @returns {number} Prosody score.
     */
    get prosodyScore() {
        return this.detailResult.PronunciationAssessment?.ProsodyScore;
    }
}
exports.PronunciationAssessmentResult = PronunciationAssessmentResult;



/***/ }),
/* 176 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvatarConfig = void 0;
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_1 = __webpack_require__(85);
/**
 * Defines the talking avatar configuration.
 * @class AvatarConfig
 * Added in version 1.33.0
 *
 * @experimental This feature is experimental and might change or have limited support.
 */
class AvatarConfig {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} character - The avatar character.
     * @param {string} style - The avatar style.
     * @param {AvatarVideoFormat} videoFormat - The talking avatar output video format.
     */
    constructor(character, style, videoFormat) {
        this.privCustomized = false;
        this.privUseBuiltInVoice = false;
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(character, "character");
        this.character = character;
        this.style = style;
        if (videoFormat === undefined) {
            videoFormat = new Exports_js_1.AvatarVideoFormat();
        }
        this.videoFormat = videoFormat;
    }
    /**
     * Indicates if the talking avatar is customized.
     */
    get customized() {
        return this.privCustomized;
    }
    /**
     * Sets if the talking avatar is customized.
     */
    set customized(value) {
        this.privCustomized = value;
    }
    /**
     * Indicates whether to use built-in voice for custom avatar.
     */
    get useBuiltInVoice() {
        return this.privUseBuiltInVoice;
    }
    /**
     * Sets whether to use built-in voice for custom avatar.
     */
    set useBuiltInVoice(value) {
        this.privUseBuiltInVoice = value;
    }
    /**
     * Gets the photo avatar base model name.
     */
    get photoAvatarBaseModel() {
        return this.privPhotoAvatarBaseModel;
    }
    /**
     * Sets the photo avatar base model name.
     */
    set photoAvatarBaseModel(value) {
        this.privPhotoAvatarBaseModel = value;
    }
    /**
     * Gets the background color.
     */
    get backgroundColor() {
        return this.privBackgroundColor;
    }
    /**
     * Sets the background color.
     */
    set backgroundColor(value) {
        this.privBackgroundColor = value;
    }
    /**
     * Gets the background image.
     */
    get backgroundImage() {
        return this.privBackgroundImage;
    }
    /**
     * Sets the background image.
     * @param {URL} value - The background image.
     */
    set backgroundImage(value) {
        this.privBackgroundImage = value;
    }
    /**
     * Gets the remote ICE servers.
     * @remarks This method is designed to be used internally in the SDK.
     * @returns {RTCIceServer[]} The remote ICE servers.
     */
    get remoteIceServers() {
        return this.privRemoteIceServers;
    }
    /**
     * Sets the remote ICE servers.
     * @remarks Normally, the ICE servers are gathered from the PeerConnection,
     * set this property to override the ICE servers. E.g., the ICE servers are
     * different in client and server side.
     * @param {RTCIceServer[]} value - The remote ICE servers.
     */
    set remoteIceServers(value) {
        this.privRemoteIceServers = value;
    }
    /**
     * Gets the scene configuration for avatar positioning and orientation.
     * @returns {AvatarSceneConfig} The scene configuration.
     */
    get scene() {
        return this.privScene;
    }
    /**
     * Sets the scene configuration for avatar positioning and orientation.
     * @param {AvatarSceneConfig} value - The scene configuration.
     */
    set scene(value) {
        this.privScene = value;
    }
}
exports.AvatarConfig = AvatarConfig;



/***/ }),
/* 177 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvatarEventArgs = exports.AvatarEventTypes = void 0;
var AvatarEventTypes;
(function (AvatarEventTypes) {
    AvatarEventTypes["SwitchedToSpeaking"] = "SwitchedToSpeaking";
    AvatarEventTypes["SwitchedToIdle"] = "SwitchedToIdle";
    AvatarEventTypes["SessionClosed"] = "SessionClosed";
})(AvatarEventTypes = exports.AvatarEventTypes || (exports.AvatarEventTypes = {}));
/**
 * Defines content for talking avatar events.
 * @class AvatarEventArgs
 * Added in version 1.33.0
 *
 * @experimental This feature is experimental and might change or have limited support.
 */
class AvatarEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {number} audioOffset - The audio offset.
     * @param {string} description - The description of the event.
     */
    constructor(audioOffset, description) {
        this.privOffset = audioOffset;
        this.privDescription = description;
    }
    /**
     * The type of the event.
     * @public
     * @returns {AvatarEventTypes} The type of the event.
     */
    get type() {
        return this.privType;
    }
    /**
     * The time offset associated with this event.
     * @public
     * @returns {number} The time offset associated with this event.
     */
    get offset() {
        return this.privOffset;
    }
    /**
     * The description of the event.
     * @public
     * @returns {string} The description of the event.
     */
    get description() {
        return this.privDescription;
    }
}
exports.AvatarEventArgs = AvatarEventArgs;



/***/ }),
/* 178 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvatarSceneConfig = void 0;
/**
 * Defines the avatar scene configuration for controlling avatar positioning and orientation.
 * @class AvatarSceneConfig
 * Added in version 1.44.0
 *
 * @experimental This feature is experimental and might change or have limited support.
 */
class AvatarSceneConfig {
    /**
     * Creates and initializes an instance of this class with default values.
     * @constructor
     * @param {number} zoom - The zoom level (0-1, default 1.0).
     * @param {number} positionX - The horizontal position offset (-1 to 1, default 0.0).
     * @param {number} positionY - The vertical position offset (-1 to 1, default 0.0).
     * @param {number} rotationX - The rotation around the X axis in radians (default 0.0).
     * @param {number} rotationY - The rotation around the Y axis in radians (default 0.0).
     * @param {number} rotationZ - The rotation around the Z axis in radians (default 0.0).
     * @param {number} amplitude - The amplitude of the avatar's movements (0 to 1, default 1.0).
     */
    constructor(zoom = 1.0, positionX = 0.0, positionY = 0.0, rotationX = 0.0, rotationY = 0.0, rotationZ = 0.0, amplitude = 1.0) {
        this.zoom = zoom;
        this.positionX = positionX;
        this.positionY = positionY;
        this.rotationX = rotationX;
        this.rotationY = rotationY;
        this.rotationZ = rotationZ;
        this.amplitude = amplitude;
    }
}
exports.AvatarSceneConfig = AvatarSceneConfig;



/***/ }),
/* 179 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvatarSynthesizer = void 0;
const SpeechSynthesisConnectionFactory_js_1 = __webpack_require__(180);
const Exports_js_1 = __webpack_require__(2);
const Exports_js_2 = __webpack_require__(4);
const AudioOutputFormat_js_1 = __webpack_require__(91);
const Exports_js_3 = __webpack_require__(85);
const Contracts_js_1 = __webpack_require__(70);
const Synthesizer_js_1 = __webpack_require__(155);
/**
 * Defines the avatar synthesizer.
 * @class AvatarSynthesizer
 * Added in version 1.33.0
 *
 * @experimental This feature is experimental and might change or have limited support.
 */
class AvatarSynthesizer extends Exports_js_3.Synthesizer {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {SpeechConfig} speechConfig - The speech config.
     * @param {AvatarConfig} avatarConfig - The talking avatar config.
     */
    constructor(speechConfig, avatarConfig) {
        super(speechConfig);
        Contracts_js_1.Contracts.throwIfNullOrUndefined(avatarConfig, "avatarConfig");
        this.privConnectionFactory = new SpeechSynthesisConnectionFactory_js_1.SpeechSynthesisConnectionFactory();
        this.privAvatarConfig = avatarConfig;
        this.implCommonSynthesizeSetup();
    }
    implCommonSynthesizeSetup() {
        super.implCommonSynthesizeSetup();
        // The service checks the audio format setting while it ignores it in avatar synthesis.
        this.privAdapter.audioOutputFormat = AudioOutputFormat_js_1.AudioOutputFormatImpl.fromSpeechSynthesisOutputFormat(Exports_js_3.SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm);
    }
    /**
     * Starts the talking avatar session and establishes the WebRTC connection.
     * @member AvatarSynthesizer.prototype.startAvatarAsync
     * @function
     * @public
     * @param {AvatarWebRTCConnectionInfo} peerConnection - The peer connection.
     * @returns {Promise<SynthesisResult>} The promise of the connection result.
     */
    async startAvatarAsync(peerConnection) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(peerConnection, "peerConnection");
        this.privIceServers = peerConnection.getConfiguration().iceServers;
        Contracts_js_1.Contracts.throwIfNullOrUndefined(this.privIceServers, "Ice servers must be set.");
        const iceGatheringDone = new Exports_js_2.Deferred();
        // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/icegatheringstatechange_event
        peerConnection.onicegatheringstatechange = () => {
            Exports_js_2.Events.instance.onEvent(new Exports_js_2.PlatformEvent("peer connection: ice gathering state: " + peerConnection.iceGatheringState, Exports_js_2.EventType.Debug));
            if (peerConnection.iceGatheringState === "complete") {
                Exports_js_2.Events.instance.onEvent(new Exports_js_2.PlatformEvent("peer connection: ice gathering complete.", Exports_js_2.EventType.Info));
                iceGatheringDone.resolve();
            }
        };
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                Exports_js_2.Events.instance.onEvent(new Exports_js_2.PlatformEvent("peer connection: ice candidate: " + event.candidate.candidate, Exports_js_2.EventType.Debug));
            }
            else {
                Exports_js_2.Events.instance.onEvent(new Exports_js_2.PlatformEvent("peer connection: ice candidate: complete", Exports_js_2.EventType.Debug));
                iceGatheringDone.resolve();
            }
        };
        // Set a timeout for ice gathering, currently 2 seconds.
        setTimeout(() => {
            if (peerConnection.iceGatheringState !== "complete") {
                Exports_js_2.Events.instance.onEvent(new Exports_js_2.PlatformEvent("peer connection: ice gathering timeout.", Exports_js_2.EventType.Warning));
                iceGatheringDone.resolve();
            }
        }, 2000);
        const sdp = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(sdp);
        await iceGatheringDone.promise;
        Exports_js_2.Events.instance.onEvent(new Exports_js_2.PlatformEvent("peer connection: got local SDP.", Exports_js_2.EventType.Info));
        this.privProperties.setProperty(Exports_js_3.PropertyId.TalkingAvatarService_WebRTC_SDP, JSON.stringify(peerConnection.localDescription));
        const result = await this.speak("", false);
        if (result.reason !== Exports_js_3.ResultReason.SynthesizingAudioCompleted) {
            return new Exports_js_3.SynthesisResult(result.resultId, result.reason, result.errorDetails, result.properties);
        }
        const sdpAnswerString = atob(result.properties.getProperty(Exports_js_3.PropertyId.TalkingAvatarService_WebRTC_SDP));
        const sdpAnswer = new RTCSessionDescription(JSON.parse(sdpAnswerString));
        await peerConnection.setRemoteDescription(sdpAnswer);
        return new Exports_js_3.SynthesisResult(result.resultId, result.reason, undefined, result.properties);
    }
    /**
     * Speaks plain text asynchronously. The rendered audio and video will be sent via the WebRTC connection.
     * @member AvatarSynthesizer.prototype.speakTextAsync
     * @function
     * @public
     * @param {string} text - The plain text to speak.
     * @returns {Promise<SynthesisResult>} The promise of the synthesis result.
     */
    async speakTextAsync(text) {
        const r = await this.speak(text, false);
        return new Exports_js_3.SynthesisResult(r.resultId, r.reason, r.errorDetails, r.properties);
    }
    /**
     * Speaks SSML asynchronously. The rendered audio and video will be sent via the WebRTC connection.
     * @member AvatarSynthesizer.prototype.speakSsmlAsync
     * @function
     * @public
     * @param {string} ssml - The SSML text to speak.
     * @returns {Promise<SynthesisResult>} The promise of the synthesis result.
     */
    async speakSsmlAsync(ssml) {
        const r = await this.speak(ssml, true);
        return new Exports_js_3.SynthesisResult(r.resultId, r.reason, r.errorDetails, r.properties);
    }
    /**
     * Speaks text asynchronously. The avatar will switch to idle state.
     * @member AvatarSynthesizer.prototype.stopSpeakingAsync
     * @function
     * @public
     * @returns {Promise<void>} The promise of the void result.
     */
    async stopSpeakingAsync() {
        while (this.synthesisRequestQueue.length() > 0) {
            const request = await this.synthesisRequestQueue.dequeue();
            request.err("Synthesis is canceled by user.");
        }
        return this.privAdapter.stopSpeaking();
    }
    /**
     * Updates the avatar scene configuration at runtime.
     * This allows changing the avatar's zoom, position, amplitude, and rotation while the session is active.
     * @member AvatarSynthesizer.prototype.updateSceneAsync
     * @function
     * @public
     * @param {AvatarSceneConfig} sceneConfig - The new scene configuration to apply.
     * @returns {Promise<void>} The promise of the void result.
     */
    async updateSceneAsync(sceneConfig) {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposed);
        Contracts_js_1.Contracts.throwIfNullOrUndefined(sceneConfig, "sceneConfig");
        const sceneMessage = {
            avatarScene: {
                amplitude: sceneConfig.amplitude,
                positionX: sceneConfig.positionX,
                positionY: sceneConfig.positionY,
                rotationX: sceneConfig.rotationX,
                rotationY: sceneConfig.rotationY,
                rotationZ: sceneConfig.rotationZ,
                zoom: sceneConfig.zoom,
            }
        };
        return this.privAdapter.sendNetworkMessage("synthesis.control", JSON.stringify(sceneMessage));
    }
    /**
     * Stops the talking avatar session and closes the WebRTC connection.
     * For now, this is the same as close().
     * You need to create a new AvatarSynthesizer instance to start a new session.
     * @member AvatarSynthesizer.prototype.stopAvatarAsync
     * @function
     * @public
     * @returns {Promise<void>} The promise of the void result.
     */
    async stopAvatarAsync() {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposed);
        return this.dispose(true);
    }
    /**
     * Dispose of associated resources.
     * @member AvatarSynthesizer.prototype.close
     * @function
     * @public
     */
    async close() {
        if (this.privDisposed) {
            return;
        }
        return this.dispose(true);
    }
    /**
     * Gets the ICE servers. Internal use only.
     */
    get iceServers() {
        return this.privIceServers;
    }
    // Creates the synthesis adapter
    createSynthesisAdapter(authentication, connectionFactory, synthesizerConfig) {
        return new Exports_js_1.AvatarSynthesisAdapter(authentication, connectionFactory, synthesizerConfig, this, this.privAvatarConfig);
    }
    createRestSynthesisAdapter(_authentication, _synthesizerConfig) {
        return undefined;
    }
    createSynthesizerConfig(speechConfig) {
        const config = super.createSynthesizerConfig(speechConfig);
        config.avatarEnabled = true;
        return config;
    }
    async speak(text, isSSML) {
        const requestId = (0, Exports_js_2.createNoDashGuid)();
        const deferredResult = new Exports_js_2.Deferred();
        this.synthesisRequestQueue.enqueue(new Synthesizer_js_1.SynthesisRequest(requestId, text, isSSML, (e) => {
            deferredResult.resolve(e);
            this.privSynthesizing = false;
            void this.adapterSpeak();
        }, (e) => {
            deferredResult.reject(e);
            this.privSynthesizing = false;
        }));
        void this.adapterSpeak();
        return deferredResult.promise;
    }
}
exports.AvatarSynthesizer = AvatarSynthesizer;



/***/ }),
/* 180 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechSynthesisConnectionFactory = void 0;
const Exports_js_1 = __webpack_require__(66);
const Exports_js_2 = __webpack_require__(85);
const ConnectionFactoryBase_js_1 = __webpack_require__(135);
const Exports_js_3 = __webpack_require__(2);
const HeaderNames_js_1 = __webpack_require__(59);
const QueryParameterNames_js_1 = __webpack_require__(136);
class SpeechSynthesisConnectionFactory {
    constructor() {
        this.synthesisUri = "/tts/cognitiveservices/websocket/v1";
    }
    async create(config, authInfo, connectionId) {
        let endpoint = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Endpoint, undefined);
        const region = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Region, undefined);
        const hostSuffix = ConnectionFactoryBase_js_1.ConnectionFactoryBase.getHostSuffix(region);
        const endpointId = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_EndpointId, undefined);
        const hostPrefix = (endpointId === undefined) ? "tts" : "voice";
        const host = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Host, "wss://" + region + "." + hostPrefix + ".speech" + hostSuffix);
        const queryParams = {};
        const headers = {};
        if (authInfo.token !== undefined && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        headers[HeaderNames_js_1.HeaderNames.ConnectionId] = connectionId;
        if (endpointId !== undefined && endpointId !== "") {
            if (!endpoint || endpoint.search(QueryParameterNames_js_1.QueryParameterNames.CustomVoiceDeploymentId) === -1) {
                queryParams[QueryParameterNames_js_1.QueryParameterNames.CustomVoiceDeploymentId] = endpointId;
            }
        }
        if (config.avatarEnabled) {
            if (!endpoint || endpoint.search(QueryParameterNames_js_1.QueryParameterNames.EnableAvatar) === -1) {
                queryParams[QueryParameterNames_js_1.QueryParameterNames.EnableAvatar] = "true";
            }
        }
        if (!!endpoint) {
            const endpointUrl = new URL(endpoint);
            const pathName = endpointUrl.pathname;
            if (pathName === "" || pathName === "/" || pathName.toLowerCase() === this.synthesisUri) {
                // We need to generate the path, and we need to check for a redirect.
                endpointUrl.pathname = this.synthesisUri;
                endpoint = await ConnectionFactoryBase_js_1.ConnectionFactoryBase.getRedirectUrlFromEndpoint(endpointUrl.toString());
            }
        }
        if (!endpoint) {
            endpoint = host + this.synthesisUri;
        }
        config.parameters.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Url, endpoint);
        const enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        return new Exports_js_1.WebsocketConnection(endpoint, queryParams, headers, new Exports_js_3.WebsocketMessageFormatter(), Exports_js_1.ProxyInfo.fromParameters(config.parameters), enableCompression, connectionId);
    }
}
exports.SpeechSynthesisConnectionFactory = SpeechSynthesisConnectionFactory;



/***/ }),
/* 181 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvatarVideoFormat = exports.Coordinate = void 0;
/* eslint-disable max-classes-per-file */
/**
 * Defines a coordinate in 2D space.
 * @class Coordinate
 * Added in version 1.33.0
 */
class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Coordinate = Coordinate;
/**
 * Defines the avatar output video format.
 * @class AvatarVideoFormat
 * Added in version 1.33.0
 *
 * @experimental This feature is experimental and might change in the future.
 */
class AvatarVideoFormat {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} codec - The video codec.
     * @param {number} bitrate - The video bitrate.
     * @param {number} width - The video width.
     * @param {number} height - The video height.
     */
    constructor(codec = "H264", bitrate = 2000000, width = 1920, height = 1080) {
        this.codec = codec;
        this.bitrate = bitrate;
        this.width = width;
        this.height = height;
    }
    /**
     * Sets the video crop range.
     */
    setCropRange(topLeft, bottomRight) {
        this.cropRange = {
            bottomRight,
            topLeft,
        };
    }
}
exports.AvatarVideoFormat = AvatarVideoFormat;



/***/ }),
/* 182 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvatarWebRTCConnectionResult = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Defines the avatar WebRTC connection result.
 * @class AvatarWebRTCConnectionResult
 * Added in version 1.33.0
 *
 * @experimental This feature is experimental and might change in the future.
 */
class AvatarWebRTCConnectionResult extends Exports_js_1.SynthesisResult {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {RTCSessionDescriptionInit} SDPAnswer - The SDP answer of WebRTC connection.
     * @param {string} resultId - The result id.
     * @param {ResultReason} reason - The reason.
     * @param {string} errorDetails - Error details, if provided.
     * @param {PropertyCollection} properties - Additional properties, if provided.
     */
    constructor(SDPAnswer, resultId, reason, errorDetails, properties) {
        super(resultId, reason, errorDetails, properties);
        this.privSDPAnswer = SDPAnswer;
    }
    /**
     * Specifies SDP (Session Description Protocol) answer of WebRTC connection.
     * @member AvatarWebRTCConnectionResult.prototype.SDPAnswer
     * @function
     * @public
     * @returns {RTCSessionDescriptionInit} Specifies the SDP answer of WebRTC connection.
     */
    get SDPAnswer() {
        return this.privSDPAnswer;
    }
}
exports.AvatarWebRTCConnectionResult = AvatarWebRTCConnectionResult;



/***/ }),
/* 183 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Diagnostics = void 0;
const Exports_js_1 = __webpack_require__(66);
const Exports_js_2 = __webpack_require__(4);
/**
 * Defines diagnostics API for managing console output
 * Added in version 1.21.0
 */
class Diagnostics {
    static SetLoggingLevel(logLevel) {
        this.privListener = new Exports_js_1.ConsoleLoggingListener(logLevel);
        Exports_js_2.Events.instance.attachConsoleListener(this.privListener);
    }
    static StartConsoleOutput() {
        if (!!this.privListener) {
            this.privListener.enableConsoleOutput = true;
        }
    }
    static StopConsoleOutput() {
        if (!!this.privListener) {
            this.privListener.enableConsoleOutput = false;
        }
    }
    static SetLogOutputPath(path) {
        if (typeof window === "undefined") {
            if (!!this.privListener) {
                this.privListener.logPath = path;
            }
        }
        else {
            throw new Error("File system logging not available in browser.");
        }
    }
    static set onLogOutput(callback) {
        if (!!this.privListener) {
            this.privListener.logCallback = callback;
        }
    }
}
exports.Diagnostics = Diagnostics;
Diagnostics.privListener = undefined;



/***/ }),
/* 184 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RestMessageAdapter = exports.RestRequestType = void 0;
const bent_1 = __importDefault(__webpack_require__(185));
const Exports_js_1 = __webpack_require__(4);
var RestRequestType;
(function (RestRequestType) {
    RestRequestType["Get"] = "GET";
    RestRequestType["Post"] = "POST";
    RestRequestType["Delete"] = "DELETE";
    RestRequestType["File"] = "file";
})(RestRequestType = exports.RestRequestType || (exports.RestRequestType = {}));
// accept rest operations via request method and return abstracted objects from server response
class RestMessageAdapter {
    constructor(configParams) {
        if (!configParams) {
            throw new Exports_js_1.ArgumentNullError("configParams");
        }
        this.privHeaders = configParams.headers;
        this.privIgnoreCache = configParams.ignoreCache;
    }
    static extractHeaderValue(headerKey, headers) {
        let headerValue = "";
        try {
            const arr = headers.trim().split(/[\r\n]+/);
            const headerMap = {};
            arr.forEach((line) => {
                const parts = line.split(": ");
                const header = parts.shift().toLowerCase();
                const value = parts.join(": ");
                headerMap[header] = value;
            });
            headerValue = headerMap[headerKey.toLowerCase()];
        }
        catch (e) {
            // ignore the error
        }
        return headerValue;
    }
    set options(configParams) {
        this.privHeaders = configParams.headers;
        this.privIgnoreCache = configParams.ignoreCache;
    }
    setHeaders(key, value) {
        this.privHeaders[key] = value;
    }
    request(method, uri, queryParams = {}, body = null) {
        const responseReceivedDeferral = new Exports_js_1.Deferred();
        const requestCommand = method === RestRequestType.File ? "POST" : method;
        const handleRestResponse = (data, j = {}) => {
            const d = data;
            return {
                data: JSON.stringify(j),
                headers: JSON.stringify(data.headers),
                json: j,
                ok: data.statusCode >= 200 && data.statusCode < 300,
                status: data.statusCode,
                statusText: j.error ? j.error.message : d.statusText ? d.statusText : d.statusMessage
            };
        };
        const send = (postData) => {
            const sendRequest = (0, bent_1.default)(uri, requestCommand, this.privHeaders, 200, 201, 202, 204, 400, 401, 402, 403, 404);
            const params = this.queryParams(queryParams) === "" ? "" : `?${this.queryParams(queryParams)}`;
            sendRequest(params, postData).then(async (data) => {
                if (method === RestRequestType.Delete || data.statusCode === 204) {
                    // No JSON from Delete and reset (204) operations
                    responseReceivedDeferral.resolve(handleRestResponse(data));
                }
                else {
                    try {
                        const j = await data.json();
                        responseReceivedDeferral.resolve(handleRestResponse(data, j));
                    }
                    catch {
                        responseReceivedDeferral.resolve(handleRestResponse(data));
                    }
                }
            }).catch((error) => {
                responseReceivedDeferral.reject(error);
            });
        };
        if (this.privIgnoreCache) {
            this.privHeaders["Cache-Control"] = "no-cache";
        }
        if (method === RestRequestType.Post && body) {
            this.privHeaders["content-type"] = "application/json";
            this.privHeaders["Content-Type"] = "application/json";
        }
        send(body);
        return responseReceivedDeferral.promise;
    }
    queryParams(params = {}) {
        return Object.keys(params)
            .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
            .join("&");
    }
}
exports.RestMessageAdapter = RestMessageAdapter;



/***/ }),
/* 185 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* global fetch, btoa, Headers */
const core = __webpack_require__(186)

class StatusError extends Error {
  constructor (res, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, StatusError)
    }

    this.name = 'StatusError'
    this.message = res.statusMessage
    this.statusCode = res.status
    this.res = res
    this.json = res.json.bind(res)
    this.text = res.text.bind(res)
    this.arrayBuffer = res.arrayBuffer.bind(res)
    let buffer
    const get = () => {
      if (!buffer) buffer = this.arrayBuffer()
      return buffer
    }
    Object.defineProperty(this, 'responseBody', { get })
    // match Node.js headers object
    this.headers = {}
    for (const [key, value] of res.headers.entries()) {
      this.headers[key.toLowerCase()] = value
    }
  }
}

const mkrequest = (statusCodes, method, encoding, headers, baseurl) => async (_url, body, _headers = {}) => {
  _url = baseurl + (_url || '')
  let parsed = new URL(_url)

  if (!headers) headers = {}
  if (parsed.username) {
    headers.Authorization = 'Basic ' + btoa(parsed.username + ':' + parsed.password)
    parsed = new URL(parsed.protocol + '//' + parsed.host + parsed.pathname + parsed.search)
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error(`Unknown protocol, ${parsed.protocol}`)
  }

  if (body) {
    if (body instanceof ArrayBuffer ||
      ArrayBuffer.isView(body) ||
      typeof body === 'string'
    ) {
      // noop
    } else if (typeof body === 'object') {
      body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    } else {
      throw new Error('Unknown body type.')
    }
  }

  _headers = new Headers({ ...(headers || {}), ..._headers })

  const resp = await fetch(parsed, { method, headers: _headers, body })
  resp.statusCode = resp.status

  if (!statusCodes.has(resp.status)) {
    throw new StatusError(resp)
  }

  if (encoding === 'json') return resp.json()
  else if (encoding === 'buffer') return resp.arrayBuffer()
  else if (encoding === 'string') return resp.text()
  else return resp
}

module.exports = core(mkrequest)


/***/ }),
/* 186 */
/***/ ((module) => {

"use strict";

const encodings = new Set(['json', 'buffer', 'string'])

module.exports = mkrequest => (...args) => {
  const statusCodes = new Set()
  let method
  let encoding
  let headers
  let baseurl = ''

  args.forEach(arg => {
    if (typeof arg === 'string') {
      if (arg.toUpperCase() === arg) {
        if (method) {
          const msg = `Can't set method to ${arg}, already set to ${method}.`
          throw new Error(msg)
        } else {
          method = arg
        }
      } else if (arg.startsWith('http:') || arg.startsWith('https:')) {
        baseurl = arg
      } else {
        if (encodings.has(arg)) {
          encoding = arg
        } else {
          throw new Error(`Unknown encoding, ${arg}`)
        }
      }
    } else if (typeof arg === 'number') {
      statusCodes.add(arg)
    } else if (typeof arg === 'object') {
      if (Array.isArray(arg) || arg instanceof Set) {
        arg.forEach(code => statusCodes.add(code))
      } else {
        if (headers) {
          throw new Error('Cannot set headers twice.')
        }
        headers = arg
      }
    } else {
      throw new Error(`Unknown type: ${typeof arg}`)
    }
  })

  if (!method) method = 'GET'
  if (statusCodes.size === 0) {
    statusCodes.add(200)
  }

  return mkrequest(statusCodes, method, encoding, headers, baseurl)
}


/***/ }),
/* 187 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RestConfigBase = void 0;
class RestConfigBase {
    static get requestOptions() {
        return RestConfigBase.privDefaultRequestOptions;
    }
    static get configParams() {
        return RestConfigBase.privDefaultParams;
    }
    static get restErrors() {
        return RestConfigBase.privRestErrors;
    }
}
exports.RestConfigBase = RestConfigBase;
RestConfigBase.privDefaultRequestOptions = {
    headers: {
        Accept: "application/json",
    },
    ignoreCache: false,
    timeout: 10000,
};
RestConfigBase.privRestErrors = {
    authInvalidSubscriptionKey: "You must specify either an authentication token to use, or a Cognitive Speech subscription key.",
    authInvalidSubscriptionRegion: "You must specify the Cognitive Speech region to use.",
    invalidArgs: "Required input not found: {arg}.",
    invalidCreateJoinConversationResponse: "Creating/Joining conversation failed with HTTP {status}.",
    invalidParticipantRequest: "The requested participant was not found.",
    permissionDeniedConnect: "Required credentials not found.",
    permissionDeniedConversation: "Invalid operation: only the host can {command} the conversation.",
    permissionDeniedParticipant: "Invalid operation: only the host can {command} a participant.",
    permissionDeniedSend: "Invalid operation: the conversation is not in a connected state.",
    permissionDeniedStart: "Invalid operation: there is already an active conversation.",
};
RestConfigBase.privDefaultParams = {
    apiVersion: "api-version",
    authorization: "Authorization",
    clientAppId: "X-ClientAppId",
    contentTypeKey: "Content-Type",
    correlationId: "X-CorrelationId",
    languageCode: "language",
    nickname: "nickname",
    profanity: "profanity",
    requestId: "X-RequestId",
    roomId: "roomid",
    sessionToken: "token",
    subscriptionKey: "Ocp-Apim-Subscription-Key",
    subscriptionRegion: "Ocp-Apim-Subscription-Region",
    token: "X-CapitoToken",
};



/***/ }),
/* 188 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechConnectionMessage = void 0;
const Exports_js_1 = __webpack_require__(4);
const HeaderNames_js_1 = __webpack_require__(59);
class SpeechConnectionMessage extends Exports_js_1.ConnectionMessage {
    constructor(messageType, path, requestId, contentType, body, streamId, additionalHeaders, id) {
        if (!path) {
            throw new Exports_js_1.ArgumentNullError("path");
        }
        if (!requestId) {
            throw new Exports_js_1.ArgumentNullError("requestId");
        }
        const headers = {};
        headers[HeaderNames_js_1.HeaderNames.Path] = path;
        headers[HeaderNames_js_1.HeaderNames.RequestId] = requestId;
        headers[HeaderNames_js_1.HeaderNames.RequestTimestamp] = new Date().toISOString();
        if (contentType) {
            headers[HeaderNames_js_1.HeaderNames.ContentType] = contentType;
        }
        if (streamId) {
            headers[HeaderNames_js_1.HeaderNames.RequestStreamId] = streamId;
        }
        if (additionalHeaders) {
            for (const headerName in additionalHeaders) {
                if (headerName) {
                    headers[headerName] = additionalHeaders[headerName];
                }
            }
        }
        if (id) {
            super(messageType, body, headers, id);
        }
        else {
            super(messageType, body, headers);
        }
        this.privPath = path;
        this.privRequestId = requestId;
        this.privContentType = contentType;
        this.privStreamId = streamId;
        this.privAdditionalHeaders = additionalHeaders;
    }
    get path() {
        return this.privPath;
    }
    get requestId() {
        return this.privRequestId;
    }
    get contentType() {
        return this.privContentType;
    }
    get streamId() {
        return this.privStreamId;
    }
    get additionalHeaders() {
        return this.privAdditionalHeaders;
    }
    static fromConnectionMessage(message) {
        let path = null;
        let requestId = null;
        let contentType = null;
        // let requestTimestamp = null;
        let streamId = null;
        const additionalHeaders = {};
        if (message.headers) {
            for (const headerName in message.headers) {
                if (headerName) {
                    if (headerName.toLowerCase() === HeaderNames_js_1.HeaderNames.Path.toLowerCase()) {
                        path = message.headers[headerName];
                    }
                    else if (headerName.toLowerCase() === HeaderNames_js_1.HeaderNames.RequestId.toLowerCase()) {
                        requestId = message.headers[headerName];
                        // } else if (headerName.toLowerCase() === HeaderNames.RequestTimestamp.toLowerCase()) {
                        //  requestTimestamp = message.headers[headerName];
                    }
                    else if (headerName.toLowerCase() === HeaderNames_js_1.HeaderNames.ContentType.toLowerCase()) {
                        contentType = message.headers[headerName];
                    }
                    else if (headerName.toLowerCase() === HeaderNames_js_1.HeaderNames.RequestStreamId.toLowerCase()) {
                        streamId = message.headers[headerName];
                    }
                    else {
                        additionalHeaders[headerName] = message.headers[headerName];
                    }
                }
            }
        }
        return new SpeechConnectionMessage(message.messageType, path, requestId, contentType, message.body, streamId, additionalHeaders, message.id);
    }
}
exports.SpeechConnectionMessage = SpeechConnectionMessage;



/***/ }),
/* 189 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SegmentationMode = void 0;
/**
 * The segmentation mode.
 */
var SegmentationMode;
(function (SegmentationMode) {
    SegmentationMode["Normal"] = "Normal";
    SegmentationMode["Disabled"] = "Disabled";
    SegmentationMode["Custom"] = "Custom";
    SegmentationMode["Semantic"] = "Semantic";
})(SegmentationMode = exports.SegmentationMode || (exports.SegmentationMode = {}));



/***/ }),
/* 190 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NextAction = void 0;
/**
 * The action to take on success
 */
var NextAction;
(function (NextAction) {
    NextAction["None"] = "None";
    NextAction["Synthesize"] = "Synthesize";
})(NextAction = exports.NextAction || (exports.NextAction = {}));



/***/ }),
/* 191 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mode = void 0;
/**
 * Result type
 */
var Mode;
(function (Mode) {
    Mode["None"] = "None";
    Mode["Always"] = "Always";
})(Mode = exports.Mode || (exports.Mode = {}));



/***/ }),
/* 192 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LanguageIdDetectionPriority = exports.LanguageIdDetectionMode = void 0;
/**
 * The enum that represents which mode will language detection take place
 * There is only detectAtAudioStart mode for now as language detection models are not trained for different modes
 * This enum can be extended in future to support different modes
 */
var LanguageIdDetectionMode;
(function (LanguageIdDetectionMode) {
    LanguageIdDetectionMode["DetectAtAudioStart"] = "DetectAtAudioStart";
    LanguageIdDetectionMode["DetectContinuous"] = "DetectContinuous";
    LanguageIdDetectionMode["DetectSegments"] = "DetectSegments";
})(LanguageIdDetectionMode = exports.LanguageIdDetectionMode || (exports.LanguageIdDetectionMode = {}));
/**
 * The language id detection mode, setting this will load the detection setting of MaxAudioDuration and MaxSpeechDuration
 * If the maxAudioDuration and maxSpeechDuration is set in the speech.context, then this detection mode will be ignored
 */
var LanguageIdDetectionPriority;
(function (LanguageIdDetectionPriority) {
    /**
     * default, Service decides the best mode to use.
     */
    LanguageIdDetectionPriority["Auto"] = "Auto";
    /**
     * Offers lower latency via a trade-off of accuracy.
     */
    LanguageIdDetectionPriority["PrioritizeLatency"] = "PrioritizeLatency";
    /**
     * Offers higher accuracy via a trade-off of latency.
     */
    LanguageIdDetectionPriority["PrioritizeAccuracy"] = "PrioritizeAccuracy";
})(LanguageIdDetectionPriority = exports.LanguageIdDetectionPriority || (exports.LanguageIdDetectionPriority = {}));



/***/ }),
/* 193 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NextAction = void 0;
/**
 * The action to take on successful language detection
 */
var NextAction;
(function (NextAction) {
    NextAction["Recognize"] = "Recognize";
    NextAction["None"] = "None";
})(NextAction = exports.NextAction || (exports.NextAction = {}));



/***/ }),
/* 194 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnUnknownAction = void 0;
/**
 * An enum that defines actions that can be taken on unknown language detection
 */
var OnUnknownAction;
(function (OnUnknownAction) {
    OnUnknownAction["RecognizeWithDefaultLanguage"] = "RecognizeWithDefaultLanguage";
    OnUnknownAction["None"] = "None";
})(OnUnknownAction = exports.OnUnknownAction || (exports.OnUnknownAction = {}));



/***/ }),
/* 195 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResultType = void 0;
/**
 * The result type enum
 */
var ResultType;
(function (ResultType) {
    ResultType["Auto"] = "Auto";
    ResultType["StableFragment"] = "StableFragment";
    ResultType["Hypothesis"] = "Hypothesis";
    ResultType["None"] = "None";
})(ResultType = exports.ResultType || (exports.ResultType = {}));



/***/ }),
/* 196 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhraseResultOutputType = void 0;
/**
 * The phrase result output type
 */
var PhraseResultOutputType;
(function (PhraseResultOutputType) {
    PhraseResultOutputType["Always"] = "Always";
    PhraseResultOutputType["None"] = "None";
})(PhraseResultOutputType = exports.PhraseResultOutputType || (exports.PhraseResultOutputType = {}));



/***/ }),
/* 197 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NextAction = void 0;
/**
 * The action enum when speech recognition return a final phrase result
 */
var NextAction;
(function (NextAction) {
    NextAction["None"] = "None";
    NextAction["Translate"] = "Translate";
})(NextAction = exports.NextAction || (exports.NextAction = {}));



/***/ }),
/* 198 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InteractivePunctuationMode = void 0;
/**
 * The interactive punctuation mode.
 */
var InteractivePunctuationMode;
(function (InteractivePunctuationMode) {
    InteractivePunctuationMode["None"] = "None";
    InteractivePunctuationMode["Implicit"] = "Implicit";
    InteractivePunctuationMode["Explicit"] = "Explicit";
    InteractivePunctuationMode["Intelligent"] = "Intelligent";
})(InteractivePunctuationMode = exports.InteractivePunctuationMode || (exports.InteractivePunctuationMode = {}));



/***/ }),
/* 199 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConversationPunctuationMode = void 0;
/**
 * The conversation punctuation mode.
 */
var ConversationPunctuationMode;
(function (ConversationPunctuationMode) {
    ConversationPunctuationMode["None"] = "None";
    ConversationPunctuationMode["Intelligent"] = "Intelligent";
    ConversationPunctuationMode["Implicit"] = "Implicit";
    ConversationPunctuationMode["Explicit"] = "Explicit";
})(ConversationPunctuationMode = exports.ConversationPunctuationMode || (exports.ConversationPunctuationMode = {}));



/***/ }),
/* 200 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DictationPunctuationMode = void 0;
/**
 * The dictation punctuation mode.
 */
var DictationPunctuationMode;
(function (DictationPunctuationMode) {
    DictationPunctuationMode["None"] = "None";
    DictationPunctuationMode["Intelligent"] = "Intelligent";
    DictationPunctuationMode["Implicit"] = "Implicit";
    DictationPunctuationMode["Explicit"] = "Explicit";
})(DictationPunctuationMode = exports.DictationPunctuationMode || (exports.DictationPunctuationMode = {}));



/***/ }),
/* 201 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DisfluencyMode = void 0;
/**
 * Disfluency handling options.
 */
var DisfluencyMode;
(function (DisfluencyMode) {
    /**
     * The Microsoft Speech Service does not remove disfluencies from all results.
     */
    DisfluencyMode["Raw"] = "Raw";
    /**
     * The Microsoft Speech Service removes disfluencies from all results.
     */
    DisfluencyMode["Removed"] = "Removed";
    /**
     * The Microsoft Speech Service tags disfluencies in the phrase result.
     */
    DisfluencyMode["Labeled"] = "Labeled";
})(DisfluencyMode = exports.DisfluencyMode || (exports.DisfluencyMode = {}));



/***/ }),
/* 202 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConversationServiceRecognizer = void 0;
const Exports_js_1 = __webpack_require__(85);
const Exports_js_2 = __webpack_require__(2);
class ConversationServiceRecognizer extends Exports_js_2.ServiceRecognizerBase {
    constructor(authentication, connectionFactory, audioSource, recognizerConfig, recognizer) {
        super(authentication, connectionFactory, audioSource, recognizerConfig, recognizer);
        this.handleSpeechPhraseMessage = async (textBody) => this.handleSpeechPhrase(textBody);
        this.handleSpeechHypothesisMessage = (textBody) => this.handleSpeechHypothesis(textBody);
    }
    processTypeSpecificMessages(connectionMessage) {
        void connectionMessage;
        return;
    }
    handleRecognizedCallback(result, offset, sessionId) {
        void result;
        void offset;
        void sessionId;
        return;
    }
    handleRecognizingCallback(result, duration, sessionId) {
        void result;
        void duration;
        void sessionId;
        return;
    }
    async processSpeechMessages(connectionMessage) {
        let processed = false;
        switch (connectionMessage.path.toLowerCase()) {
            case "speech.hypothesis":
            case "speech.fragment":
                if (!!this.handleSpeechHypothesisMessage) {
                    this.handleSpeechHypothesisMessage(connectionMessage.textBody);
                }
                processed = true;
                break;
            case "speech.phrase":
                if (!!this.handleSpeechPhraseMessage) {
                    await this.handleSpeechPhraseMessage(connectionMessage.textBody);
                }
                processed = true;
                break;
            default:
                break;
        }
        return processed;
    }
    cancelRecognition(sessionId, requestId, cancellationReason, errorCode, error) {
        // Implementing to allow inheritance
        void sessionId;
        void requestId;
        void cancellationReason;
        void errorCode;
        void error;
    }
    async handleSpeechPhrase(textBody) {
        const simple = Exports_js_2.SimpleSpeechPhrase.fromJSON(textBody, this.privRequestSession.currentTurnAudioOffset);
        const resultReason = Exports_js_2.EnumTranslation.implTranslateRecognitionResult(simple.RecognitionStatus);
        let result;
        const resultProps = new Exports_js_1.PropertyCollection();
        resultProps.setProperty(Exports_js_1.PropertyId.SpeechServiceResponse_JsonResult, textBody);
        this.privRequestSession.onPhraseRecognized(simple.Offset + simple.Duration);
        if (Exports_js_1.ResultReason.Canceled === resultReason) {
            const cancelReason = Exports_js_2.EnumTranslation.implTranslateCancelResult(simple.RecognitionStatus);
            const cancellationErrorCode = Exports_js_2.EnumTranslation.implTranslateCancelErrorCode(simple.RecognitionStatus);
            await this.cancelRecognitionLocal(cancelReason, cancellationErrorCode, Exports_js_2.EnumTranslation.implTranslateErrorDetails(cancellationErrorCode));
        }
        else {
            if (simple.RecognitionStatus !== Exports_js_2.RecognitionStatus.EndOfDictation) {
                if (this.privRecognizerConfig.parameters.getProperty(Exports_js_2.OutputFormatPropertyName) === Exports_js_1.OutputFormat[Exports_js_1.OutputFormat.Simple]) {
                    result = new Exports_js_1.SpeechRecognitionResult(this.privRequestSession.requestId, resultReason, simple.DisplayText, simple.Duration, simple.Offset, simple.Language, simple.LanguageDetectionConfidence, simple.SpeakerId, undefined, simple.asJson(), resultProps);
                }
                else {
                    const detailed = Exports_js_2.DetailedSpeechPhrase.fromJSON(textBody, this.privRequestSession.currentTurnAudioOffset);
                    result = new Exports_js_1.SpeechRecognitionResult(this.privRequestSession.requestId, resultReason, detailed.Text, detailed.Duration, detailed.Offset, detailed.Language, detailed.LanguageDetectionConfidence, detailed.SpeakerId, undefined, detailed.asJson(), resultProps);
                }
                this.handleRecognizedCallback(result, result.offset, this.privRequestSession.sessionId);
            }
        }
    }
    handleSpeechHypothesis(textBody) {
        const hypothesis = Exports_js_2.SpeechHypothesis.fromJSON(textBody, this.privRequestSession.currentTurnAudioOffset);
        const resultProps = new Exports_js_1.PropertyCollection();
        resultProps.setProperty(Exports_js_1.PropertyId.SpeechServiceResponse_JsonResult, textBody);
        const result = new Exports_js_1.SpeechRecognitionResult(this.privRequestSession.requestId, Exports_js_1.ResultReason.RecognizingSpeech, hypothesis.Text, hypothesis.Duration, hypothesis.Offset, hypothesis.Language, hypothesis.LanguageDetectionConfidence, hypothesis.SpeakerId, undefined, hypothesis.asJson(), resultProps);
        this.privRequestSession.onHypothesis(hypothesis.Offset);
        this.handleRecognizingCallback(result, hypothesis.Duration, this.privRequestSession.sessionId);
    }
}
exports.ConversationServiceRecognizer = ConversationServiceRecognizer;



/***/ }),
/* 203 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RecognizerConfig = exports.SpeechResultFormat = void 0;
/* eslint-disable max-classes-per-file */
const Exports_js_1 = __webpack_require__(85);
const Exports_js_2 = __webpack_require__(2);
const PhraseDetectionContext_js_1 = __webpack_require__(116);
var SpeechResultFormat;
(function (SpeechResultFormat) {
    SpeechResultFormat[SpeechResultFormat["Simple"] = 0] = "Simple";
    SpeechResultFormat[SpeechResultFormat["Detailed"] = 1] = "Detailed";
})(SpeechResultFormat = exports.SpeechResultFormat || (exports.SpeechResultFormat = {}));
class RecognizerConfig {
    constructor(speechServiceConfig, parameters) {
        this.privSpeechServiceConfig = speechServiceConfig ? speechServiceConfig : new Exports_js_2.SpeechServiceConfig(new Exports_js_2.Context(null));
        this.privParameters = parameters;
        this.privMaxRetryCount = parseInt(parameters.getProperty("SPEECH-Error-MaxRetryCount", "4"), 10);
        this.privLanguageIdMode = parameters.getProperty(Exports_js_1.PropertyId.SpeechServiceConnection_LanguageIdMode, undefined);
        this.privEnableSpeakerId = false;
    }
    get parameters() {
        return this.privParameters;
    }
    get recognitionMode() {
        return this.privRecognitionMode;
    }
    set recognitionMode(value) {
        this.privRecognitionMode = value;
        this.privRecognitionActivityTimeout = value === PhraseDetectionContext_js_1.RecognitionMode.Interactive ? 8000 : 25000;
        this.privSpeechServiceConfig.Recognition = PhraseDetectionContext_js_1.RecognitionMode[value];
    }
    get SpeechServiceConfig() {
        return this.privSpeechServiceConfig;
    }
    get recognitionActivityTimeout() {
        return this.privRecognitionActivityTimeout;
    }
    get isContinuousRecognition() {
        return this.privRecognitionMode !== PhraseDetectionContext_js_1.RecognitionMode.Interactive;
    }
    get languageIdMode() {
        return this.privLanguageIdMode;
    }
    get autoDetectSourceLanguages() {
        return this.parameters.getProperty(Exports_js_1.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages, undefined);
    }
    get recognitionEndpointVersion() {
        return this.parameters.getProperty(Exports_js_1.PropertyId.SpeechServiceConnection_RecognitionEndpointVersion, "2");
    }
    set recognitionEndpointVersion(version) {
        this.parameters.setProperty(Exports_js_1.PropertyId.SpeechServiceConnection_RecognitionEndpointVersion, version);
    }
    get sourceLanguageModels() {
        const models = [];
        let modelsExist = false;
        if (this.autoDetectSourceLanguages !== undefined) {
            for (const language of this.autoDetectSourceLanguages.split(",")) {
                const customProperty = language + Exports_js_1.PropertyId.SpeechServiceConnection_EndpointId.toString();
                const modelId = this.parameters.getProperty(customProperty, undefined);
                if (modelId !== undefined) {
                    models.push({ language, endpoint: modelId });
                    modelsExist = true;
                }
                else {
                    models.push({ language, endpoint: "" });
                }
            }
        }
        return modelsExist ? models : undefined;
    }
    get maxRetryCount() {
        return this.privMaxRetryCount;
    }
    get isSpeakerDiarizationEnabled() {
        return this.privEnableSpeakerId;
    }
    set isSpeakerDiarizationEnabled(value) {
        this.privEnableSpeakerId = value;
    }
}
exports.RecognizerConfig = RecognizerConfig;



/***/ }),
/* 204 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));



/***/ }),
/* 205 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsocketMessageFormatter = void 0;
const Exports_js_1 = __webpack_require__(4);
const CRLF = "\r\n";
class WebsocketMessageFormatter {
    toConnectionMessage(message) {
        const deferral = new Exports_js_1.Deferred();
        try {
            if (message.messageType === Exports_js_1.MessageType.Text) {
                const textMessage = message.textContent;
                let headers = {};
                let body = null;
                if (textMessage) {
                    const headerBodySplit = textMessage.split("\r\n\r\n");
                    if (headerBodySplit && headerBodySplit.length > 0) {
                        headers = this.parseHeaders(headerBodySplit[0]);
                        if (headerBodySplit.length > 1) {
                            body = headerBodySplit[1];
                        }
                    }
                }
                deferral.resolve(new Exports_js_1.ConnectionMessage(message.messageType, body, headers, message.id));
            }
            else if (message.messageType === Exports_js_1.MessageType.Binary) {
                const binaryMessage = message.binaryContent;
                let headers = {};
                let body = null;
                if (!binaryMessage || binaryMessage.byteLength < 2) {
                    throw new Error("Invalid binary message format. Header length missing.");
                }
                const dataView = new DataView(binaryMessage);
                const headerLength = dataView.getInt16(0);
                if (binaryMessage.byteLength < headerLength + 2) {
                    throw new Error("Invalid binary message format. Header content missing.");
                }
                let headersString = "";
                for (let i = 0; i < headerLength; i++) {
                    headersString += String.fromCharCode((dataView).getInt8(i + 2));
                }
                headers = this.parseHeaders(headersString);
                if (binaryMessage.byteLength > headerLength + 2) {
                    body = binaryMessage.slice(2 + headerLength);
                }
                deferral.resolve(new Exports_js_1.ConnectionMessage(message.messageType, body, headers, message.id));
            }
        }
        catch (e) {
            deferral.reject(`Error formatting the message. Error: ${e}`);
        }
        return deferral.promise;
    }
    fromConnectionMessage(message) {
        const deferral = new Exports_js_1.Deferred();
        try {
            if (message.messageType === Exports_js_1.MessageType.Text) {
                const payload = `${this.makeHeaders(message)}${CRLF}${message.textBody ? message.textBody : ""}`;
                deferral.resolve(new Exports_js_1.RawWebsocketMessage(Exports_js_1.MessageType.Text, payload, message.id));
            }
            else if (message.messageType === Exports_js_1.MessageType.Binary) {
                const headersString = this.makeHeaders(message);
                const content = message.binaryBody;
                const headerBuffer = this.stringToArrayBuffer(headersString);
                const headerInt8Array = new Int8Array(headerBuffer);
                const headerLength = headerInt8Array.byteLength;
                const payloadInt8Array = new Int8Array(2 + headerLength + (content ? content.byteLength : 0));
                payloadInt8Array[0] = ((headerLength >> 8) & 0xff);
                payloadInt8Array[1] = headerLength & 0xff;
                payloadInt8Array.set(headerInt8Array, 2);
                if (content) {
                    const bodyInt8Array = new Int8Array(content);
                    payloadInt8Array.set(bodyInt8Array, 2 + headerLength);
                }
                const payload = payloadInt8Array.buffer;
                deferral.resolve(new Exports_js_1.RawWebsocketMessage(Exports_js_1.MessageType.Binary, payload, message.id));
            }
        }
        catch (e) {
            deferral.reject(`Error formatting the message. ${e}`);
        }
        return deferral.promise;
    }
    makeHeaders(message) {
        let headersString = "";
        if (message.headers) {
            for (const header in message.headers) {
                if (header) {
                    headersString += `${header}: ${message.headers[header]}${CRLF}`;
                }
            }
        }
        return headersString;
    }
    parseHeaders(headersString) {
        const headers = {};
        if (headersString) {
            const headerMatches = headersString.match(/[^\r\n]+/g);
            if (headers) {
                for (const header of headerMatches) {
                    if (header) {
                        const separatorIndex = header.indexOf(":");
                        const headerName = separatorIndex > 0 ? header.substr(0, separatorIndex).trim().toLowerCase() : header;
                        const headerValue = separatorIndex > 0 && header.length > (separatorIndex + 1) ?
                            header.substr(separatorIndex + 1).trim() :
                            "";
                        headers[headerName] = headerValue;
                    }
                }
            }
        }
        return headers;
    }
    stringToArrayBuffer(str) {
        const buffer = new ArrayBuffer(str.length);
        const view = new DataView(buffer);
        for (let i = 0; i < str.length; i++) {
            view.setUint8(i, str.charCodeAt(i));
        }
        return buffer;
    }
}
exports.WebsocketMessageFormatter = WebsocketMessageFormatter;



/***/ }),
/* 206 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechConnectionFactory = void 0;
const Exports_js_1 = __webpack_require__(66);
const Exports_js_2 = __webpack_require__(2);
const Exports_js_3 = __webpack_require__(85);
const ConnectionFactoryBase_js_1 = __webpack_require__(135);
const Exports_js_4 = __webpack_require__(2);
const HeaderNames_js_1 = __webpack_require__(59);
const QueryParameterNames_js_1 = __webpack_require__(136);
const PhraseDetectionContext_js_1 = __webpack_require__(116);
class SpeechConnectionFactory extends ConnectionFactoryBase_js_1.ConnectionFactoryBase {
    constructor() {
        super(...arguments);
        this.interactiveRelativeUri = "/speech/recognition/interactive/cognitiveservices/v1";
        this.conversationRelativeUri = "/speech/recognition/conversation/cognitiveservices/v1";
        this.dictationRelativeUri = "/speech/recognition/dictation/cognitiveservices/v1";
        this.universalUri = "/stt/speech/universal/v";
    }
    async create(config, authInfo, connectionId) {
        let endpoint = config.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_Endpoint, undefined);
        const region = config.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_Region, undefined);
        const hostSuffix = ConnectionFactoryBase_js_1.ConnectionFactoryBase.getHostSuffix(region);
        const host = config.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_Host, "wss://" + region + ".stt.speech" + hostSuffix);
        const queryParams = {};
        const endpointId = config.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_EndpointId, undefined);
        const language = config.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage, undefined);
        // The multichannel reliable-reconnect protocol expects a bare v2 URL: the service omits
        // continuation headers when "format"/"language" query params are present, so drop them
        // here and let the language travel inside speech.config / speech.context instead.
        const multiChannelReconnect = config.parameters.getProperty(Exports_js_3.PropertyId.Speech_EnableMultiChannelProcessing, "false").toLowerCase() === "true";
        if (endpointId) {
            if (!endpoint || endpoint.search(QueryParameterNames_js_1.QueryParameterNames.CustomSpeechDeploymentId) === -1) {
                queryParams[QueryParameterNames_js_1.QueryParameterNames.CustomSpeechDeploymentId] = endpointId;
            }
        }
        else if (language && !multiChannelReconnect) {
            if (!endpoint || endpoint.search(QueryParameterNames_js_1.QueryParameterNames.Language) === -1) {
                queryParams[QueryParameterNames_js_1.QueryParameterNames.Language] = language;
            }
        }
        if (!multiChannelReconnect && (!endpoint || endpoint.search(QueryParameterNames_js_1.QueryParameterNames.Format) === -1)) {
            queryParams[QueryParameterNames_js_1.QueryParameterNames.Format] = config.parameters.getProperty(Exports_js_2.OutputFormatPropertyName, Exports_js_3.OutputFormat[Exports_js_3.OutputFormat.Simple]).toLowerCase();
        }
        if (config.autoDetectSourceLanguages !== undefined) {
            queryParams[QueryParameterNames_js_1.QueryParameterNames.EnableLanguageId] = "true";
        }
        this.setCommonUrlParams(config, queryParams, endpoint);
        if (!!endpoint) {
            const endpointUrl = new URL(endpoint);
            const pathName = endpointUrl.pathname;
            if (pathName === "" || pathName === "/") {
                // We need to generate the path, and we need to check for a redirect.
                endpointUrl.pathname = this.universalUri + config.recognitionEndpointVersion;
                endpoint = await ConnectionFactoryBase_js_1.ConnectionFactoryBase.getRedirectUrlFromEndpoint(endpointUrl.toString());
            }
        }
        if (!endpoint) {
            switch (config.recognitionMode) {
                case PhraseDetectionContext_js_1.RecognitionMode.Conversation:
                    if (config.parameters.getProperty(Exports_js_2.ForceDictationPropertyName, "false") === "true") {
                        endpoint = host + this.dictationRelativeUri;
                    }
                    else {
                        if (config.recognitionEndpointVersion !== undefined && parseInt(config.recognitionEndpointVersion, 10) > 1) {
                            endpoint = `${host}${this.universalUri}${config.recognitionEndpointVersion}`;
                        }
                        else {
                            endpoint = host + this.conversationRelativeUri;
                        }
                    }
                    break;
                case PhraseDetectionContext_js_1.RecognitionMode.Dictation:
                    endpoint = host + this.dictationRelativeUri;
                    break;
                default:
                    if (config.recognitionEndpointVersion !== undefined && parseInt(config.recognitionEndpointVersion, 10) > 1) {
                        endpoint = `${host}${this.universalUri}${config.recognitionEndpointVersion}`;
                    }
                    else {
                        endpoint = host + this.interactiveRelativeUri; // default is interactive
                    }
                    break;
            }
        }
        const headers = {};
        if (authInfo.token !== undefined && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        headers[HeaderNames_js_1.HeaderNames.ConnectionId] = connectionId;
        headers.connectionId = connectionId;
        const enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        const webSocketConnection = new Exports_js_1.WebsocketConnection(endpoint, queryParams, headers, new Exports_js_4.WebsocketMessageFormatter(), Exports_js_1.ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
        // Set the value of SpeechServiceConnection_Url to webSocketConnection.uri (and not to `endpoint`), since this value is the final
        // URI that was used to make the connection (including query parameters).
        const uri = webSocketConnection.uri;
        config.parameters.setProperty(Exports_js_3.PropertyId.SpeechServiceConnection_Url, uri);
        return webSocketConnection;
    }
}
exports.SpeechConnectionFactory = SpeechConnectionFactory;



/***/ }),
/* 207 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConversationTranscriberConnectionFactory = void 0;
const Exports_js_1 = __webpack_require__(66);
const Exports_js_2 = __webpack_require__(85);
const Exports_js_3 = __webpack_require__(2);
const ConnectionFactoryBase_js_1 = __webpack_require__(135);
const Exports_js_4 = __webpack_require__(2);
const HeaderNames_js_1 = __webpack_require__(59);
const QueryParameterNames_js_1 = __webpack_require__(136);
class ConversationTranscriberConnectionFactory extends ConnectionFactoryBase_js_1.ConnectionFactoryBase {
    constructor() {
        super(...arguments);
        this.universalUri = "/stt/speech/universal/v2";
        this.conversationRelativeUriV1 = "/speech/recognition/conversation/cognitiveservices/v1";
    }
    async create(config, authInfo, connectionId) {
        let endpoint = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Endpoint, undefined);
        const region = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Region, undefined);
        const hostSuffix = ConnectionFactoryBase_js_1.ConnectionFactoryBase.getHostSuffix(region);
        const host = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Host, "wss://" + region + ".stt.speech" + hostSuffix);
        const queryParams = {};
        const endpointId = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_EndpointId, undefined);
        const language = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_RecoLanguage, undefined);
        if (endpointId) {
            if (!endpoint || endpoint.search(QueryParameterNames_js_1.QueryParameterNames.CustomSpeechDeploymentId) === -1) {
                queryParams[QueryParameterNames_js_1.QueryParameterNames.CustomSpeechDeploymentId] = endpointId;
            }
        }
        else if (language) {
            if (!endpoint || endpoint.search(QueryParameterNames_js_1.QueryParameterNames.Language) === -1) {
                queryParams[QueryParameterNames_js_1.QueryParameterNames.Language] = language;
            }
        }
        if (config.autoDetectSourceLanguages !== undefined) {
            queryParams[QueryParameterNames_js_1.QueryParameterNames.EnableLanguageId] = "true";
        }
        const apiVersion = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_RecognitionEndpointVersion, undefined);
        if (apiVersion === "1") {
            endpoint = `${host}${this.universalUri}`;
        }
        else {
            this.setV2UrlParams(config, queryParams, endpoint);
            if (!!endpoint) {
                const endpointUrl = new URL(endpoint);
                const pathName = endpointUrl.pathname;
                if (pathName === "" || pathName === "/") {
                    // We need to generate the path, and we need to check for a redirect.
                    endpointUrl.pathname = this.universalUri;
                    endpoint = await ConnectionFactoryBase_js_1.ConnectionFactoryBase.getRedirectUrlFromEndpoint(endpointUrl.toString());
                }
            }
            if (!endpoint) {
                endpoint = `${host}${this.conversationRelativeUriV1}`;
            }
        }
        const headers = {};
        if (authInfo.token !== undefined && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        headers[HeaderNames_js_1.HeaderNames.ConnectionId] = connectionId;
        const enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        const webSocketConnection = new Exports_js_1.WebsocketConnection(endpoint, queryParams, headers, new Exports_js_4.WebsocketMessageFormatter(), Exports_js_1.ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
        // Set the value of SpeechServiceConnection_Url to webSocketConnection.uri (and not to `endpoint`), since this value is the final
        // URI that was used to make the connection (including query parameters).
        const uri = webSocketConnection.uri;
        config.parameters.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Url, uri);
        return webSocketConnection;
    }
    setV2UrlParams(config, queryParams, endpoint) {
        const propertyIdToParameterMap = new Map([
            [Exports_js_2.PropertyId.Speech_SegmentationSilenceTimeoutMs, QueryParameterNames_js_1.QueryParameterNames.SegmentationSilenceTimeoutMs],
            [Exports_js_2.PropertyId.SpeechServiceConnection_EnableAudioLogging, QueryParameterNames_js_1.QueryParameterNames.EnableAudioLogging],
            [Exports_js_2.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs, QueryParameterNames_js_1.QueryParameterNames.EndSilenceTimeoutMs],
            [Exports_js_2.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, QueryParameterNames_js_1.QueryParameterNames.InitialSilenceTimeoutMs],
            [Exports_js_2.PropertyId.SpeechServiceResponse_ProfanityOption, QueryParameterNames_js_1.QueryParameterNames.Profanity],
            [Exports_js_2.PropertyId.SpeechServiceResponse_StablePartialResultThreshold, QueryParameterNames_js_1.QueryParameterNames.StableIntermediateThreshold],
        ]);
        propertyIdToParameterMap.forEach((parameterName, propertyId) => {
            this.setUrlParameter(propertyId, parameterName, config, queryParams, endpoint);
        });
        const serviceProperties = JSON.parse(config.parameters.getProperty(Exports_js_3.ServicePropertiesPropertyName, "{}"));
        Object.keys(serviceProperties).forEach((value) => {
            queryParams[value] = serviceProperties[value];
        });
    }
}
exports.ConversationTranscriberConnectionFactory = ConversationTranscriberConnectionFactory;



/***/ }),
/* 208 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranscriberConnectionFactory = void 0;
const Exports_js_1 = __webpack_require__(66);
const Exports_js_2 = __webpack_require__(85);
const ConnectionFactoryBase_js_1 = __webpack_require__(135);
const Exports_js_3 = __webpack_require__(2);
const HeaderNames_js_1 = __webpack_require__(59);
const QueryParameterNames_js_1 = __webpack_require__(136);
class TranscriberConnectionFactory extends ConnectionFactoryBase_js_1.ConnectionFactoryBase {
    constructor() {
        super(...arguments);
        this.multiaudioRelativeUri = "/speech/recognition/multiaudio";
    }
    create(config, authInfo, connectionId) {
        let endpoint = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Endpoint, undefined);
        const region = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Region, "centralus");
        const hostSuffix = ConnectionFactoryBase_js_1.ConnectionFactoryBase.getHostSuffix(region);
        const hostDefault = "wss://transcribe." + region + ".cts.speech" + hostSuffix + this.multiaudioRelativeUri;
        const host = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Host, hostDefault);
        const queryParams = {};
        this.setQueryParams(queryParams, config, endpoint);
        if (!endpoint) {
            endpoint = host;
        }
        const headers = {};
        if (authInfo.token !== undefined && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        headers[HeaderNames_js_1.HeaderNames.ConnectionId] = connectionId;
        config.parameters.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Url, endpoint);
        const enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        return Promise.resolve(new Exports_js_1.WebsocketConnection(endpoint, queryParams, headers, new Exports_js_3.WebsocketMessageFormatter(), Exports_js_1.ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId));
    }
    setQueryParams(queryParams, config, endpointUrl) {
        const endpointId = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_EndpointId, undefined);
        const language = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_RecoLanguage, undefined);
        if (endpointId && !(QueryParameterNames_js_1.QueryParameterNames.CustomSpeechDeploymentId in queryParams)) {
            queryParams[QueryParameterNames_js_1.QueryParameterNames.CustomSpeechDeploymentId] = endpointId;
        }
        if (language && !(QueryParameterNames_js_1.QueryParameterNames.Language in queryParams)) {
            queryParams[QueryParameterNames_js_1.QueryParameterNames.Language] = language;
        }
        const wordLevelTimings = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceResponse_RequestWordLevelTimestamps, "false").toLowerCase() === "true";
        const detailed = config.parameters.getProperty(Exports_js_3.OutputFormatPropertyName, Exports_js_2.OutputFormat[Exports_js_2.OutputFormat.Simple]) !== Exports_js_2.OutputFormat[Exports_js_2.OutputFormat.Simple];
        if (wordLevelTimings || detailed) {
            queryParams[QueryParameterNames_js_1.QueryParameterNames.Format] = Exports_js_2.OutputFormat[Exports_js_2.OutputFormat.Detailed].toLowerCase();
        }
        this.setCommonUrlParams(config, queryParams, endpointUrl);
    }
}
exports.TranscriberConnectionFactory = TranscriberConnectionFactory;



/***/ }),
/* 209 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationConnectionFactory = void 0;
const Exports_js_1 = __webpack_require__(66);
const StringUtils_js_1 = __webpack_require__(210);
const Exports_js_2 = __webpack_require__(85);
const ConnectionFactoryBase_js_1 = __webpack_require__(135);
const Exports_js_3 = __webpack_require__(2);
const HeaderNames_js_1 = __webpack_require__(59);
const QueryParameterNames_js_1 = __webpack_require__(136);
const PhraseDetectionContext_js_1 = __webpack_require__(116);
class TranslationConnectionFactory extends ConnectionFactoryBase_js_1.ConnectionFactoryBase {
    constructor() {
        super(...arguments);
        this.universalUri = "/stt/speech/universal/v2";
        this.translationV1Uri = "/speech/translation/cognitiveservices/v1";
    }
    async create(config, authInfo, connectionId) {
        let endpoint = this.getEndpointUrl(config);
        const queryParams = {};
        // Determine if we're using V1 or V2 endpoint
        this.setQueryParams(queryParams, config, endpoint);
        if (!!endpoint) {
            const endpointUrl = new URL(endpoint);
            const pathName = endpointUrl.pathname;
            if (pathName === "" || pathName === "/") {
                // We need to generate the path, and we need to check for a redirect.
                endpointUrl.pathname = this.universalUri;
                endpoint = await ConnectionFactoryBase_js_1.ConnectionFactoryBase.getRedirectUrlFromEndpoint(endpointUrl.toString());
            }
        }
        const headers = {};
        if (authInfo.token !== undefined && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        headers[HeaderNames_js_1.HeaderNames.ConnectionId] = connectionId;
        config.parameters.setProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Url, endpoint);
        const enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        const webSocketConnection = new Exports_js_1.WebsocketConnection(endpoint, queryParams, headers, new Exports_js_3.WebsocketMessageFormatter(), Exports_js_1.ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
        return webSocketConnection;
    }
    getEndpointUrl(config, returnRegionPlaceholder) {
        const region = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Region);
        const hostSuffix = ConnectionFactoryBase_js_1.ConnectionFactoryBase.getHostSuffix(region);
        // First check for an explicitly specified endpoint
        let endpointUrl = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Endpoint, undefined);
        // If an explicit endpoint is provided, use it
        if (endpointUrl) {
            if (returnRegionPlaceholder === true) {
                return endpointUrl;
            }
            return StringUtils_js_1.StringUtils.formatString(endpointUrl, { region });
        }
        // Check if V1 endpoint is explicitly requested
        const forceV1Endpoint = config.parameters.getProperty("SPEECH-ForceV1Endpoint", "false") === "true";
        if (forceV1Endpoint) {
            // Use V1 endpoint with s2s.speech host
            const host = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Host, "wss://{region}.s2s.speech" + hostSuffix);
            endpointUrl = host + this.translationV1Uri;
        }
        else {
            // Default to V2 endpoint with stt.speech host
            const host = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Host, "wss://{region}.stt.speech" + hostSuffix);
            endpointUrl = host + this.universalUri;
        }
        if (returnRegionPlaceholder === true) {
            return endpointUrl;
        }
        return StringUtils_js_1.StringUtils.formatString(endpointUrl, { region });
    }
    setQueryParams(queryParams, config, endpointUrl) {
        // Common parameters for both V1 and V2 endpoints
        queryParams.from = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_RecoLanguage);
        queryParams.to = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_TranslationToLanguages);
        queryParams.scenario = config.recognitionMode === PhraseDetectionContext_js_1.RecognitionMode.Interactive ? "interactive" :
            config.recognitionMode === PhraseDetectionContext_js_1.RecognitionMode.Conversation ? "conversation" : "";
        // Set common parameters
        this.setCommonUrlParams(config, queryParams, endpointUrl);
        this.setUrlParameter(Exports_js_2.PropertyId.SpeechServiceResponse_TranslationRequestStablePartialResult, QueryParameterNames_js_1.QueryParameterNames.StableTranslation, config, queryParams, endpointUrl);
        // Handle translation voice if specified
        const translationVoice = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_TranslationVoice, undefined);
        if (translationVoice !== undefined) {
            queryParams.voice = translationVoice;
            queryParams.features = "requireVoice";
        }
    }
}
exports.TranslationConnectionFactory = TranslationConnectionFactory;



/***/ }),
/* 210 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StringUtils = void 0;
/**
 * String helper functions
 */
class StringUtils {
    /**
     * Formats a string by replacing the named {keys} in the string with the values contained in the replacement dictionary.
     * @param format The format string that contains the parts to replace surrounded by {}. For example: "wss://{region}.cts.speech.microsoft.com".
     * If your string needs to contain a { or } you can use the {{ and }} escape sequences respectively.
     * @param replacements The dictionary of replacements. If a replacement is not found, it is replaced with an empty string
     * @returns The formatted string. If you pass in a null or undefined format string, an empty string will be returned
     */
    static formatString(format, replacements) {
        if (!format) {
            return "";
        }
        if (!replacements) {
            return format;
        }
        let formatted = "";
        let key = "";
        const appendToFormatted = (str) => {
            formatted += str;
        };
        const appendToKey = (str) => {
            key += str;
        };
        let appendFunc = appendToFormatted;
        for (let i = 0; i < format.length; i++) {
            const c = format[i];
            const next = i + 1 < format.length ? format[i + 1] : "";
            switch (c) {
                case "{":
                    if (next === "{") {
                        appendFunc("{");
                        i++;
                    }
                    else {
                        appendFunc = appendToKey;
                    }
                    break;
                case "}":
                    if (next === "}") {
                        appendFunc("}");
                        i++;
                    }
                    else {
                        if (replacements.hasOwnProperty(key)) {
                            formatted += replacements[key];
                        }
                        appendFunc = appendToFormatted;
                        key = "";
                    }
                    break;
                default:
                    appendFunc(c);
                    break;
            }
        }
        return formatted;
    }
}
exports.StringUtils = StringUtils;



/***/ }),
/* 211 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnumTranslation = void 0;
const Exports_js_1 = __webpack_require__(85);
const Exports_js_2 = __webpack_require__(2);
class EnumTranslation {
    static implTranslateRecognitionResult(recognitionStatus, expectEndOfDictation = false) {
        let reason = Exports_js_1.ResultReason.Canceled;
        switch (recognitionStatus) {
            case Exports_js_2.RecognitionStatus.Success:
                reason = Exports_js_1.ResultReason.RecognizedSpeech;
                break;
            case Exports_js_2.RecognitionStatus.EndOfDictation:
                // If we need the result in EndOfDictation (typically some session level result),
                // translate into RecognizedSpeech, otherwise NoMatch
                reason = expectEndOfDictation ? Exports_js_1.ResultReason.RecognizedSpeech : Exports_js_1.ResultReason.NoMatch;
                break;
            case Exports_js_2.RecognitionStatus.NoMatch:
            case Exports_js_2.RecognitionStatus.InitialSilenceTimeout:
            case Exports_js_2.RecognitionStatus.BabbleTimeout:
                reason = Exports_js_1.ResultReason.NoMatch;
                break;
            case Exports_js_2.RecognitionStatus.Error:
            case Exports_js_2.RecognitionStatus.BadRequest:
            case Exports_js_2.RecognitionStatus.Forbidden:
            default:
                reason = Exports_js_1.ResultReason.Canceled;
                break;
        }
        return reason;
    }
    static implTranslateCancelResult(recognitionStatus) {
        let reason = Exports_js_1.CancellationReason.EndOfStream;
        switch (recognitionStatus) {
            case Exports_js_2.RecognitionStatus.Success:
            case Exports_js_2.RecognitionStatus.EndOfDictation:
            case Exports_js_2.RecognitionStatus.NoMatch:
                reason = Exports_js_1.CancellationReason.EndOfStream;
                break;
            case Exports_js_2.RecognitionStatus.InitialSilenceTimeout:
            case Exports_js_2.RecognitionStatus.BabbleTimeout:
            case Exports_js_2.RecognitionStatus.Error:
            case Exports_js_2.RecognitionStatus.BadRequest:
            case Exports_js_2.RecognitionStatus.Forbidden:
            default:
                reason = Exports_js_1.CancellationReason.Error;
                break;
        }
        return reason;
    }
    static implTranslateCancelErrorCode(recognitionStatus) {
        let reason = Exports_js_1.CancellationErrorCode.NoError;
        switch (recognitionStatus) {
            case Exports_js_2.RecognitionStatus.Error:
                reason = Exports_js_1.CancellationErrorCode.ServiceError;
                break;
            case Exports_js_2.RecognitionStatus.TooManyRequests:
                reason = Exports_js_1.CancellationErrorCode.TooManyRequests;
                break;
            case Exports_js_2.RecognitionStatus.BadRequest:
                reason = Exports_js_1.CancellationErrorCode.BadRequestParameters;
                break;
            case Exports_js_2.RecognitionStatus.Forbidden:
                reason = Exports_js_1.CancellationErrorCode.Forbidden;
                break;
            default:
                reason = Exports_js_1.CancellationErrorCode.NoError;
                break;
        }
        return reason;
    }
    static implTranslateErrorDetails(cancellationErrorCode) {
        let errorDetails = "The speech service encountered an internal error and could not continue.";
        switch (cancellationErrorCode) {
            case Exports_js_1.CancellationErrorCode.Forbidden:
                errorDetails = "The recognizer is using a free subscription that ran out of quota.";
                break;
            case Exports_js_1.CancellationErrorCode.BadRequestParameters:
                errorDetails = "Invalid parameter or unsupported audio format in the request.";
                break;
            case Exports_js_1.CancellationErrorCode.TooManyRequests:
                errorDetails = "The number of parallel requests exceeded the number of allowed concurrent transcriptions.";
                break;
            default:
                break;
        }
        return errorDetails;
    }
}
exports.EnumTranslation = EnumTranslation;



/***/ }),
/* 212 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RecognitionStatus = exports.SynthesisStatus = void 0;
/**
 * @class SynthesisStatus
 * @private
 */
var SynthesisStatus;
(function (SynthesisStatus) {
    /**
     * The response contains valid audio data.
     * @member SynthesisStatus.Success
     */
    SynthesisStatus[SynthesisStatus["Success"] = 0] = "Success";
    /**
     * Indicates the end of audio data. No valid audio data is included in the message.
     * @member SynthesisStatus.SynthesisEnd
     */
    SynthesisStatus[SynthesisStatus["SynthesisEnd"] = 1] = "SynthesisEnd";
    /**
     * Indicates an error occurred during synthesis data processing.
     * @member SynthesisStatus.Error
     */
    SynthesisStatus[SynthesisStatus["Error"] = 2] = "Error";
})(SynthesisStatus = exports.SynthesisStatus || (exports.SynthesisStatus = {}));
var RecognitionStatus;
(function (RecognitionStatus) {
    RecognitionStatus[RecognitionStatus["Success"] = 0] = "Success";
    RecognitionStatus[RecognitionStatus["NoMatch"] = 1] = "NoMatch";
    RecognitionStatus[RecognitionStatus["InitialSilenceTimeout"] = 2] = "InitialSilenceTimeout";
    RecognitionStatus[RecognitionStatus["BabbleTimeout"] = 3] = "BabbleTimeout";
    RecognitionStatus[RecognitionStatus["Error"] = 4] = "Error";
    RecognitionStatus[RecognitionStatus["EndOfDictation"] = 5] = "EndOfDictation";
    RecognitionStatus[RecognitionStatus["TooManyRequests"] = 6] = "TooManyRequests";
    RecognitionStatus[RecognitionStatus["BadRequest"] = 7] = "BadRequest";
    RecognitionStatus[RecognitionStatus["Forbidden"] = 8] = "Forbidden";
})(RecognitionStatus = exports.RecognitionStatus || (exports.RecognitionStatus = {}));



/***/ }),
/* 213 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationSynthesisEnd = void 0;
const Exports_js_1 = __webpack_require__(2);
class TranslationSynthesisEnd {
    constructor(json) {
        this.privSynthesisEnd = JSON.parse(json);
        if (!!this.privSynthesisEnd.SynthesisStatus) {
            this.privSynthesisEnd.SynthesisStatus = Exports_js_1.SynthesisStatus[this.privSynthesisEnd.SynthesisStatus];
        }
        if (!!this.privSynthesisEnd.Status) {
            this.privSynthesisEnd.SynthesisStatus = Exports_js_1.SynthesisStatus[this.privSynthesisEnd.Status];
        }
    }
    static fromJSON(json) {
        return new TranslationSynthesisEnd(json);
    }
    get SynthesisStatus() {
        return this.privSynthesisEnd.SynthesisStatus;
    }
    get FailureReason() {
        return this.privSynthesisEnd.FailureReason;
    }
}
exports.TranslationSynthesisEnd = TranslationSynthesisEnd;



/***/ }),
/* 214 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationHypothesis = void 0;
const Contracts_js_1 = __webpack_require__(70);
const TranslationStatus_js_1 = __webpack_require__(53);
class TranslationHypothesis {
    constructor(hypothesis, baseOffset) {
        this.privTranslationHypothesis = hypothesis;
        this.privTranslationHypothesis.Offset += baseOffset;
        this.privTranslationHypothesis.Translation.TranslationStatus = this.mapTranslationStatus(this.privTranslationHypothesis.Translation.TranslationStatus);
    }
    static fromJSON(json, baseOffset) {
        return new TranslationHypothesis(JSON.parse(json), baseOffset);
    }
    static fromTranslationResponse(translationHypothesis, baseOffset) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(translationHypothesis, "translationHypothesis");
        const hypothesis = translationHypothesis.SpeechHypothesis;
        translationHypothesis.SpeechHypothesis = undefined;
        hypothesis.Translation = translationHypothesis;
        return new TranslationHypothesis(hypothesis, baseOffset);
    }
    get Duration() {
        return this.privTranslationHypothesis.Duration;
    }
    get Offset() {
        return this.privTranslationHypothesis.Offset;
    }
    get Text() {
        return this.privTranslationHypothesis.Text;
    }
    get Translation() {
        return this.privTranslationHypothesis.Translation;
    }
    get Language() {
        return this.privTranslationHypothesis.PrimaryLanguage?.Language;
    }
    asJson() {
        const jsonObj = { ...this.privTranslationHypothesis };
        // Convert the enum value to its string representation for serialization purposes.
        return jsonObj.Translation !== undefined ? JSON.stringify({
            ...jsonObj,
            TranslationStatus: TranslationStatus_js_1.TranslationStatus[jsonObj.Translation.TranslationStatus]
        }) : JSON.stringify(jsonObj);
    }
    mapTranslationStatus(status) {
        if (typeof status === "string") {
            return TranslationStatus_js_1.TranslationStatus[status];
        }
        else if (typeof status === "number") {
            return status;
        }
    }
}
exports.TranslationHypothesis = TranslationHypothesis;



/***/ }),
/* 215 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationPhrase = void 0;
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_1 = __webpack_require__(2);
const TranslationStatus_js_1 = __webpack_require__(53);
class TranslationPhrase {
    constructor(phrase, baseOffset) {
        this.privTranslationPhrase = phrase;
        this.privTranslationPhrase.Offset += baseOffset;
        this.privTranslationPhrase.RecognitionStatus = this.mapRecognitionStatus(this.privTranslationPhrase.RecognitionStatus);
        if (this.privTranslationPhrase.Translation !== undefined) {
            this.privTranslationPhrase.Translation.TranslationStatus = this.mapTranslationStatus(this.privTranslationPhrase.Translation.TranslationStatus);
        }
    }
    static fromJSON(json, baseOffset) {
        return new TranslationPhrase(JSON.parse(json), baseOffset);
    }
    static fromTranslationResponse(translationResponse, baseOffset) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(translationResponse, "translationResponse");
        const phrase = translationResponse.SpeechPhrase;
        translationResponse.SpeechPhrase = undefined;
        phrase.Translation = translationResponse;
        phrase.Text = phrase.DisplayText;
        return new TranslationPhrase(phrase, baseOffset);
    }
    get RecognitionStatus() {
        return this.privTranslationPhrase.RecognitionStatus;
    }
    get Offset() {
        return this.privTranslationPhrase.Offset;
    }
    get Duration() {
        return this.privTranslationPhrase.Duration;
    }
    get Text() {
        return this.privTranslationPhrase.Text;
    }
    get Language() {
        return this.privTranslationPhrase.PrimaryLanguage?.Language;
    }
    get Confidence() {
        return this.privTranslationPhrase.PrimaryLanguage?.Confidence;
    }
    get Translation() {
        return this.privTranslationPhrase.Translation;
    }
    asJson() {
        const jsonObj = { ...this.privTranslationPhrase };
        // Convert the enum values to their string representations for serialization
        const serializedObj = {
            ...jsonObj,
            RecognitionStatus: Exports_js_1.RecognitionStatus[jsonObj.RecognitionStatus]
        };
        if (jsonObj.Translation) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            serializedObj.Translation = {
                ...jsonObj.Translation,
                TranslationStatus: TranslationStatus_js_1.TranslationStatus[jsonObj.Translation.TranslationStatus]
            };
        }
        return JSON.stringify(serializedObj);
    }
    mapRecognitionStatus(status) {
        if (typeof status === "string") {
            return Exports_js_1.RecognitionStatus[status];
        }
        else if (typeof status === "number") {
            return status;
        }
    }
    mapTranslationStatus(status) {
        if (typeof status === "string") {
            return TranslationStatus_js_1.TranslationStatus[status];
        }
        else if (typeof status === "number") {
            return status;
        }
    }
}
exports.TranslationPhrase = TranslationPhrase;



/***/ }),
/* 216 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationServiceRecognizer = void 0;
const Exports_js_1 = __webpack_require__(4);
const Exports_js_2 = __webpack_require__(85);
const Exports_js_3 = __webpack_require__(2);
// eslint-disable-next-line max-classes-per-file
class TranslationServiceRecognizer extends Exports_js_3.ConversationServiceRecognizer {
    constructor(authentication, connectionFactory, audioSource, recognizerConfig, translationRecognizer) {
        super(authentication, connectionFactory, audioSource, recognizerConfig, translationRecognizer);
        this.privTranslationRecognizer = translationRecognizer;
        this.connectionEvents.attach((connectionEvent) => {
            if (connectionEvent.name === "ConnectionEstablishedEvent") {
                this.privTranslationRecognizer.onConnection();
            }
        });
    }
    async processTypeSpecificMessages(connectionMessage) {
        const resultProps = new Exports_js_2.PropertyCollection();
        let processed = await this.processSpeechMessages(connectionMessage);
        if (processed) {
            return true;
        }
        const handleTranslationPhrase = async (translatedPhrase) => {
            resultProps.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_JsonResult, translatedPhrase.asJson());
            const phraseLatencyMs = this.privRequestSession.onPhraseRecognized(translatedPhrase.Offset + translatedPhrase.Duration);
            if (phraseLatencyMs > 0) {
                resultProps.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_RecognitionLatencyMs, phraseLatencyMs.toString());
            }
            if (translatedPhrase.RecognitionStatus === Exports_js_3.RecognitionStatus.Success) {
                // OK, the recognition was successful. How'd the translation do?
                const result = this.fireEventForResult(translatedPhrase, resultProps);
                if (!!this.privTranslationRecognizer.recognized) {
                    try {
                        this.privTranslationRecognizer.recognized(this.privTranslationRecognizer, result);
                        /* eslint-disable no-empty */
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                // report result to promise.
                if (!!this.privSuccessCallback) {
                    try {
                        this.privSuccessCallback(result.result);
                    }
                    catch (e) {
                        if (!!this.privErrorCallback) {
                            this.privErrorCallback(e);
                        }
                    }
                    // Only invoke the call back once.
                    // and if it's successful don't invoke the
                    // error after that.
                    this.privSuccessCallback = undefined;
                    this.privErrorCallback = undefined;
                }
            }
            else {
                const reason = Exports_js_3.EnumTranslation.implTranslateRecognitionResult(translatedPhrase.RecognitionStatus);
                const result = new Exports_js_2.TranslationRecognitionResult(undefined, this.privRequestSession.requestId, reason, translatedPhrase.Text, translatedPhrase.Duration, translatedPhrase.Offset, translatedPhrase.Language, translatedPhrase.Confidence, undefined, translatedPhrase.asJson(), resultProps);
                if (reason === Exports_js_2.ResultReason.Canceled) {
                    const cancelReason = Exports_js_3.EnumTranslation.implTranslateCancelResult(translatedPhrase.RecognitionStatus);
                    const cancellationErrorCode = Exports_js_3.EnumTranslation.implTranslateCancelErrorCode(translatedPhrase.RecognitionStatus);
                    await this.cancelRecognitionLocal(cancelReason, cancellationErrorCode, Exports_js_3.EnumTranslation.implTranslateErrorDetails(cancellationErrorCode));
                }
                else {
                    if (translatedPhrase.RecognitionStatus !== Exports_js_3.RecognitionStatus.EndOfDictation) {
                        const ev = new Exports_js_2.TranslationRecognitionEventArgs(result, result.offset, this.privRequestSession.sessionId);
                        if (!!this.privTranslationRecognizer.recognized) {
                            try {
                                this.privTranslationRecognizer.recognized(this.privTranslationRecognizer, ev);
                                /* eslint-disable no-empty */
                            }
                            catch (error) {
                                // Not going to let errors in the event handler
                                // trip things up.
                            }
                        }
                        // report result to promise.
                        if (!!this.privSuccessCallback) {
                            try {
                                this.privSuccessCallback(result);
                            }
                            catch (e) {
                                if (!!this.privErrorCallback) {
                                    this.privErrorCallback(e);
                                }
                            }
                            // Only invoke the call back once.
                            // and if it's successful don't invoke the
                            // error after that.
                            this.privSuccessCallback = undefined;
                            this.privErrorCallback = undefined;
                        }
                    }
                }
                processed = true;
            }
        };
        const handleTranslationHypothesis = (hypothesis) => {
            resultProps.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_JsonResult, hypothesis.asJson());
            const hypothesisLatencyMs = this.privRequestSession.onHypothesis(hypothesis.Offset);
            if (hypothesisLatencyMs > 0) {
                resultProps.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_RecognitionLatencyMs, hypothesisLatencyMs.toString());
            }
            const result = this.fireEventForResult(hypothesis, resultProps);
            if (!!this.privTranslationRecognizer.recognizing) {
                try {
                    this.privTranslationRecognizer.recognizing(this.privTranslationRecognizer, result);
                    /* eslint-disable no-empty */
                }
                catch (error) {
                    // Not going to let errors in the event handler
                    // trip things up.
                }
            }
            processed = true;
        };
        if (connectionMessage.messageType === Exports_js_1.MessageType.Text) {
            resultProps.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_JsonResult, connectionMessage.textBody);
        }
        switch (connectionMessage.path.toLowerCase()) {
            case "translation.hypothesis":
                handleTranslationHypothesis(Exports_js_3.TranslationHypothesis.fromJSON(connectionMessage.textBody, this.privRequestSession.currentTurnAudioOffset));
                break;
            case "translation.response":
                const phrase = JSON.parse(connectionMessage.textBody);
                if (!!phrase.SpeechPhrase) {
                    await handleTranslationPhrase(Exports_js_3.TranslationPhrase.fromTranslationResponse(phrase, this.privRequestSession.currentTurnAudioOffset));
                }
                else {
                    const hypothesis = JSON.parse(connectionMessage.textBody);
                    if (!!hypothesis.SpeechHypothesis) {
                        handleTranslationHypothesis(Exports_js_3.TranslationHypothesis.fromTranslationResponse(hypothesis, this.privRequestSession.currentTurnAudioOffset));
                    }
                }
                break;
            case "translation.phrase":
                await handleTranslationPhrase(Exports_js_3.TranslationPhrase.fromJSON(connectionMessage.textBody, this.privRequestSession.currentTurnAudioOffset));
                break;
            case "translation.synthesis":
            case "audio":
                this.sendSynthesisAudio(connectionMessage.binaryBody, this.privRequestSession.sessionId);
                processed = true;
                break;
            case "audio.end":
            case "translation.synthesis.end":
                const synthEnd = Exports_js_3.TranslationSynthesisEnd.fromJSON(connectionMessage.textBody);
                switch (synthEnd.SynthesisStatus) {
                    case Exports_js_3.SynthesisStatus.Error:
                        if (!!this.privTranslationRecognizer.synthesizing) {
                            const result = new Exports_js_2.TranslationSynthesisResult(Exports_js_2.ResultReason.Canceled, undefined);
                            const retEvent = new Exports_js_2.TranslationSynthesisEventArgs(result, this.privRequestSession.sessionId);
                            try {
                                this.privTranslationRecognizer.synthesizing(this.privTranslationRecognizer, retEvent);
                                /* eslint-disable no-empty */
                            }
                            catch (error) {
                                // Not going to let errors in the event handler
                                // trip things up.
                            }
                        }
                        if (!!this.privTranslationRecognizer.canceled) {
                            // And raise a canceled event to send the rich(er) error message back.
                            const canceledResult = new Exports_js_2.TranslationRecognitionCanceledEventArgs(this.privRequestSession.sessionId, Exports_js_2.CancellationReason.Error, synthEnd.FailureReason, Exports_js_2.CancellationErrorCode.ServiceError, null);
                            try {
                                this.privTranslationRecognizer.canceled(this.privTranslationRecognizer, canceledResult);
                                /* eslint-disable no-empty */
                            }
                            catch (error) {
                                // Not going to let errors in the event handler
                                // trip things up.
                            }
                        }
                        break;
                    case Exports_js_3.SynthesisStatus.Success:
                        this.sendSynthesisAudio(undefined, this.privRequestSession.sessionId);
                        break;
                    default:
                        break;
                }
                processed = true;
                break;
            default:
                break;
        }
        return processed;
    }
    // Cancels recognition.
    cancelRecognition(sessionId, requestId, cancellationReason, errorCode, error) {
        const properties = new Exports_js_2.PropertyCollection();
        properties.setProperty(Exports_js_3.CancellationErrorCodePropertyName, Exports_js_2.CancellationErrorCode[errorCode]);
        if (!!this.privTranslationRecognizer.canceled) {
            const cancelEvent = new Exports_js_2.TranslationRecognitionCanceledEventArgs(sessionId, cancellationReason, error, errorCode, undefined);
            try {
                this.privTranslationRecognizer.canceled(this.privTranslationRecognizer, cancelEvent);
                /* eslint-disable no-empty */
            }
            catch { }
        }
        if (!!this.privSuccessCallback) {
            const result = new Exports_js_2.TranslationRecognitionResult(undefined, // Translations
            requestId, Exports_js_2.ResultReason.Canceled, undefined, // Text
            undefined, // Druation
            undefined, // Offset
            undefined, // Language
            undefined, // LanguageDetectionConfidence
            error, undefined, // Json
            properties);
            try {
                this.privSuccessCallback(result);
                /* eslint-disable no-empty */
                this.privSuccessCallback = undefined;
            }
            catch { }
        }
    }
    handleRecognizingCallback(result, offset, sessionId) {
        try {
            const ev = new Exports_js_2.TranslationRecognitionEventArgs(Exports_js_2.TranslationRecognitionResult.fromSpeechRecognitionResult(result), offset, sessionId);
            this.privTranslationRecognizer.recognizing(this.privTranslationRecognizer, ev);
            /* eslint-disable no-empty */
        }
        catch (error) {
            // Not going to let errors in the event handler
            // trip things up.
        }
    }
    handleRecognizedCallback(result, offset, sessionId) {
        try {
            const ev = new Exports_js_2.TranslationRecognitionEventArgs(Exports_js_2.TranslationRecognitionResult.fromSpeechRecognitionResult(result), offset, sessionId);
            this.privTranslationRecognizer.recognized(this.privTranslationRecognizer, ev);
        }
        catch (error) {
            // Not going to let errors in the event handler
            // trip things up.
        }
    }
    fireEventForResult(serviceResult, properties) {
        let translations;
        if (undefined !== serviceResult.Translation.Translations) {
            translations = new Exports_js_2.Translations();
            for (const translation of serviceResult.Translation.Translations) {
                translations.set(translation.Language, translation.Text || translation.DisplayText);
            }
        }
        let resultReason;
        let confidence;
        if (serviceResult instanceof Exports_js_3.TranslationPhrase) {
            if (!!serviceResult.Translation && serviceResult.Translation.TranslationStatus === Exports_js_1.TranslationStatus.Success) {
                resultReason = Exports_js_2.ResultReason.TranslatedSpeech;
            }
            else {
                resultReason = Exports_js_2.ResultReason.RecognizedSpeech;
            }
            confidence = serviceResult.Confidence;
        }
        else {
            resultReason = Exports_js_2.ResultReason.TranslatingSpeech;
        }
        const language = serviceResult.Language;
        const result = new Exports_js_2.TranslationRecognitionResult(translations, this.privRequestSession.requestId, resultReason, serviceResult.Text, serviceResult.Duration, serviceResult.Offset, language, confidence, serviceResult.Translation.FailureReason, serviceResult.asJson(), properties);
        const ev = new Exports_js_2.TranslationRecognitionEventArgs(result, serviceResult.Offset, this.privRequestSession.sessionId);
        return ev;
    }
    sendSynthesisAudio(audio, sessionId) {
        const reason = (undefined === audio) ? Exports_js_2.ResultReason.SynthesizingAudioCompleted : Exports_js_2.ResultReason.SynthesizingAudio;
        const result = new Exports_js_2.TranslationSynthesisResult(reason, audio);
        const retEvent = new Exports_js_2.TranslationSynthesisEventArgs(result, sessionId);
        if (!!this.privTranslationRecognizer.synthesizing) {
            try {
                this.privTranslationRecognizer.synthesizing(this.privTranslationRecognizer, retEvent);
                /* eslint-disable no-empty */
            }
            catch (error) {
                // Not going to let errors in the event handler
                // trip things up.
            }
        }
    }
}
exports.TranslationServiceRecognizer = TranslationServiceRecognizer;



/***/ }),
/* 217 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechDetected = void 0;
class SpeechDetected {
    constructor(json, baseOffset) {
        this.privSpeechStartDetected = JSON.parse(json);
        this.privSpeechStartDetected.Offset += baseOffset;
    }
    static fromJSON(json, baseOffset) {
        return new SpeechDetected(json, baseOffset);
    }
    get Offset() {
        return this.privSpeechStartDetected.Offset;
    }
}
exports.SpeechDetected = SpeechDetected;



/***/ }),
/* 218 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechHypothesis = void 0;
class SpeechHypothesis {
    constructor(json, baseOffset) {
        this.privSpeechHypothesis = JSON.parse(json);
        this.updateOffset(baseOffset);
    }
    static fromJSON(json, baseOffset) {
        return new SpeechHypothesis(json, baseOffset);
    }
    updateOffset(baseOffset) {
        this.privSpeechHypothesis.Offset += baseOffset;
    }
    asJson() {
        return JSON.stringify(this.privSpeechHypothesis);
    }
    get Text() {
        return this.privSpeechHypothesis.Text;
    }
    get Offset() {
        return this.privSpeechHypothesis.Offset;
    }
    get Duration() {
        return this.privSpeechHypothesis.Duration;
    }
    get Language() {
        return this.privSpeechHypothesis.PrimaryLanguage === undefined ? undefined : this.privSpeechHypothesis.PrimaryLanguage.Language;
    }
    get LanguageDetectionConfidence() {
        return this.privSpeechHypothesis.PrimaryLanguage === undefined ? undefined : this.privSpeechHypothesis.PrimaryLanguage.Confidence;
    }
    get SpeakerId() {
        return this.privSpeechHypothesis.SpeakerId;
    }
}
exports.SpeechHypothesis = SpeechHypothesis;



/***/ }),
/* 219 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechKeyword = void 0;
class SpeechKeyword {
    constructor(json, baseOffset) {
        this.privSpeechKeyword = JSON.parse(json);
        this.privSpeechKeyword.Offset += baseOffset;
    }
    static fromJSON(json, baseOffset) {
        return new SpeechKeyword(json, baseOffset);
    }
    get Status() {
        return this.privSpeechKeyword.Status;
    }
    get Text() {
        return this.privSpeechKeyword.Text;
    }
    get Offset() {
        return this.privSpeechKeyword.Offset;
    }
    get Duration() {
        return this.privSpeechKeyword.Duration;
    }
    asJson() {
        return JSON.stringify(this.privSpeechKeyword);
    }
}
exports.SpeechKeyword = SpeechKeyword;



/***/ }),
/* 220 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechServiceRecognizer = void 0;
const Exports_js_1 = __webpack_require__(85);
const Exports_js_2 = __webpack_require__(2);
// eslint-disable-next-line max-classes-per-file
class SpeechServiceRecognizer extends Exports_js_2.ServiceRecognizerBase {
    constructor(authentication, connectionFactory, audioSource, recognizerConfig, speechRecognizer) {
        super(authentication, connectionFactory, audioSource, recognizerConfig, speechRecognizer);
        this.privSpeechRecognizer = speechRecognizer;
    }
    async processTypeSpecificMessages(connectionMessage) {
        let result;
        const resultProps = new Exports_js_1.PropertyCollection();
        let processed = false;
        switch (connectionMessage.path.toLowerCase()) {
            case "speech.hypothesis":
            case "speech.fragment":
                const hypothesis = Exports_js_2.SpeechHypothesis.fromJSON(connectionMessage.textBody, this.privRequestSession.currentTurnAudioOffset);
                resultProps.setProperty(Exports_js_1.PropertyId.SpeechServiceResponse_JsonResult, hypothesis.asJson());
                const hypothesisLatencyMs = this.privRequestSession.onHypothesis(hypothesis.Offset);
                if (hypothesisLatencyMs > 0) {
                    resultProps.setProperty(Exports_js_1.PropertyId.SpeechServiceResponse_RecognitionLatencyMs, hypothesisLatencyMs.toString());
                }
                result = new Exports_js_1.SpeechRecognitionResult(this.privRequestSession.requestId, Exports_js_1.ResultReason.RecognizingSpeech, hypothesis.Text, hypothesis.Duration, hypothesis.Offset, hypothesis.Language, hypothesis.LanguageDetectionConfidence, undefined, // Speaker Id
                undefined, hypothesis.asJson(), resultProps);
                const ev = new Exports_js_1.SpeechRecognitionEventArgs(result, hypothesis.Offset, this.privRequestSession.sessionId);
                if (!!this.privSpeechRecognizer.recognizing) {
                    try {
                        this.privSpeechRecognizer.recognizing(this.privSpeechRecognizer, ev);
                        /* eslint-disable no-empty */
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                processed = true;
                break;
            case "speech.phrase":
                const simple = Exports_js_2.SimpleSpeechPhrase.fromJSON(connectionMessage.textBody, this.privRequestSession.currentTurnAudioOffset);
                resultProps.setProperty(Exports_js_1.PropertyId.SpeechServiceResponse_JsonResult, simple.asJson());
                const resultReason = Exports_js_2.EnumTranslation.implTranslateRecognitionResult(simple.RecognitionStatus, this.privExpectContentAssessmentResponse);
                const phraseLatencyMs = this.privRequestSession.onPhraseRecognized(simple.Offset + simple.Duration);
                if (phraseLatencyMs > 0) {
                    resultProps.setProperty(Exports_js_1.PropertyId.SpeechServiceResponse_RecognitionLatencyMs, phraseLatencyMs.toString());
                }
                if (Exports_js_1.ResultReason.Canceled === resultReason) {
                    const cancelReason = Exports_js_2.EnumTranslation.implTranslateCancelResult(simple.RecognitionStatus);
                    const cancellationErrorCode = Exports_js_2.EnumTranslation.implTranslateCancelErrorCode(simple.RecognitionStatus);
                    await this.cancelRecognitionLocal(cancelReason, cancellationErrorCode, Exports_js_2.EnumTranslation.implTranslateErrorDetails(cancellationErrorCode));
                }
                else {
                    // Don't event / return an EndOfDictation message.
                    if (simple.RecognitionStatus === Exports_js_2.RecognitionStatus.EndOfDictation) {
                        break;
                    }
                    if (this.privRecognizerConfig.parameters.getProperty(Exports_js_2.OutputFormatPropertyName) === Exports_js_1.OutputFormat[Exports_js_1.OutputFormat.Simple]) {
                        result = new Exports_js_1.SpeechRecognitionResult(this.privRequestSession.requestId, resultReason, simple.DisplayText, simple.Duration, simple.Offset, simple.Language, simple.LanguageDetectionConfidence, undefined, // Speaker Id
                        undefined, simple.asJson(), resultProps, simple.Channel);
                    }
                    else {
                        const detailed = Exports_js_2.DetailedSpeechPhrase.fromJSON(connectionMessage.textBody, this.privRequestSession.currentTurnAudioOffset);
                        resultProps.setProperty(Exports_js_1.PropertyId.SpeechServiceResponse_JsonResult, detailed.asJson());
                        result = new Exports_js_1.SpeechRecognitionResult(this.privRequestSession.requestId, resultReason, detailed.RecognitionStatus === Exports_js_2.RecognitionStatus.Success ? detailed.NBest[0].Display : "", detailed.Duration, detailed.Offset, detailed.Language, detailed.LanguageDetectionConfidence, undefined, // Speaker Id
                        undefined, detailed.asJson(), resultProps, detailed.Channel);
                    }
                    const event = new Exports_js_1.SpeechRecognitionEventArgs(result, result.offset, this.privRequestSession.sessionId);
                    if (!!this.privSpeechRecognizer.recognized) {
                        try {
                            this.privSpeechRecognizer.recognized(this.privSpeechRecognizer, event);
                            /* eslint-disable no-empty */
                        }
                        catch (error) {
                            // Not going to let errors in the event handler
                            // trip things up.
                        }
                    }
                    if (!!this.privSuccessCallback) {
                        try {
                            this.privSuccessCallback(result);
                        }
                        catch (e) {
                            if (!!this.privErrorCallback) {
                                this.privErrorCallback(e);
                            }
                        }
                        // Only invoke the call back once.
                        // and if it's successful don't invoke the
                        // error after that.
                        this.privSuccessCallback = undefined;
                        this.privErrorCallback = undefined;
                    }
                }
                processed = true;
                break;
            default:
                break;
        }
        return processed;
    }
    // Cancels recognition.
    cancelRecognition(sessionId, requestId, cancellationReason, errorCode, error) {
        const properties = new Exports_js_1.PropertyCollection();
        properties.setProperty(Exports_js_2.CancellationErrorCodePropertyName, Exports_js_1.CancellationErrorCode[errorCode]);
        if (!!this.privSpeechRecognizer.canceled) {
            const cancelEvent = new Exports_js_1.SpeechRecognitionCanceledEventArgs(cancellationReason, error, errorCode, undefined, sessionId);
            try {
                this.privSpeechRecognizer.canceled(this.privSpeechRecognizer, cancelEvent);
                /* eslint-disable no-empty */
            }
            catch { }
        }
        if (!!this.privSuccessCallback) {
            const result = new Exports_js_1.SpeechRecognitionResult(requestId, Exports_js_1.ResultReason.Canceled, undefined, // Text
            undefined, // Duration
            undefined, // Offset
            undefined, // Language
            undefined, // Language Detection Confidence
            undefined, // Speaker Id
            error, undefined, // Json
            properties);
            try {
                this.privSuccessCallback(result);
                this.privSuccessCallback = undefined;
                /* eslint-disable no-empty */
            }
            catch { }
        }
    }
}
exports.SpeechServiceRecognizer = SpeechServiceRecognizer;



/***/ }),
/* 221 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConversationTranscriptionServiceRecognizer = void 0;
const Exports_js_1 = __webpack_require__(85);
const Exports_js_2 = __webpack_require__(2);
const SpeakerDiarization_js_1 = __webpack_require__(222);
const PhraseDetectionContext_js_1 = __webpack_require__(116);
// eslint-disable-next-line max-classes-per-file
class ConversationTranscriptionServiceRecognizer extends Exports_js_2.ServiceRecognizerBase {
    constructor(authentication, connectionFactory, audioSource, recognizerConfig, conversationTranscriber) {
        super(authentication, connectionFactory, audioSource, recognizerConfig, conversationTranscriber);
        this.privConversationTranscriber = conversationTranscriber;
        this.setSpeakerDiarizationJson();
    }
    setSpeakerDiarizationJson() {
        if (this.privEnableSpeakerId) {
            const phraseDetection = this.privSpeechContext.getContext().phraseDetection || {};
            phraseDetection.mode = PhraseDetectionContext_js_1.RecognitionMode.Conversation;
            const speakerDiarization = {};
            speakerDiarization.mode = SpeakerDiarization_js_1.SpeakerDiarizationMode.Anonymous;
            speakerDiarization.audioSessionId = this.privDiarizationSessionId;
            speakerDiarization.audioOffsetMs = 0;
            speakerDiarization.diarizeIntermediates = this.privRecognizerConfig.parameters.getProperty(Exports_js_1.PropertyId.SpeechServiceResponse_DiarizeIntermediateResults, "false") === "true";
            phraseDetection.speakerDiarization = speakerDiarization;
            this.privSpeechContext.getContext().phraseDetection = phraseDetection;
        }
    }
    async processTypeSpecificMessages(connectionMessage) {
        let result;
        const resultProps = new Exports_js_1.PropertyCollection();
        resultProps.setProperty(Exports_js_1.PropertyId.SpeechServiceResponse_JsonResult, connectionMessage.textBody);
        let processed = false;
        switch (connectionMessage.path.toLowerCase()) {
            case "speech.hypothesis":
            case "speech.fragment":
                const hypothesis = Exports_js_2.SpeechHypothesis.fromJSON(connectionMessage.textBody, this.privRequestSession.currentTurnAudioOffset);
                const hypothesisLatencyMs = this.privRequestSession.onHypothesis(hypothesis.Offset);
                if (hypothesisLatencyMs > 0) {
                    resultProps.setProperty(Exports_js_1.PropertyId.SpeechServiceResponse_RecognitionLatencyMs, hypothesisLatencyMs.toString());
                }
                result = new Exports_js_1.ConversationTranscriptionResult(this.privRequestSession.requestId, Exports_js_1.ResultReason.RecognizingSpeech, hypothesis.Text, hypothesis.Duration, hypothesis.Offset, hypothesis.Language, hypothesis.LanguageDetectionConfidence, hypothesis.SpeakerId, undefined, hypothesis.asJson(), resultProps);
                const ev = new Exports_js_1.ConversationTranscriptionEventArgs(result, hypothesis.Duration, this.privRequestSession.sessionId);
                if (!!this.privConversationTranscriber.transcribing) {
                    try {
                        this.privConversationTranscriber.transcribing(this.privConversationTranscriber, ev);
                        /* eslint-disable no-empty */
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                processed = true;
                break;
            case "speech.phrase":
                const simple = Exports_js_2.SimpleSpeechPhrase.fromJSON(connectionMessage.textBody, this.privRequestSession.currentTurnAudioOffset);
                const resultReason = Exports_js_2.EnumTranslation.implTranslateRecognitionResult(simple.RecognitionStatus);
                const phraseLatencyMs = this.privRequestSession.onPhraseRecognized(simple.Offset + simple.Duration);
                if (phraseLatencyMs > 0) {
                    resultProps.setProperty(Exports_js_1.PropertyId.SpeechServiceResponse_RecognitionLatencyMs, phraseLatencyMs.toString());
                }
                if (Exports_js_1.ResultReason.Canceled === resultReason) {
                    const cancelReason = Exports_js_2.EnumTranslation.implTranslateCancelResult(simple.RecognitionStatus);
                    const cancellationErrorCode = Exports_js_2.EnumTranslation.implTranslateCancelErrorCode(simple.RecognitionStatus);
                    await this.cancelRecognitionLocal(cancelReason, cancellationErrorCode, Exports_js_2.EnumTranslation.implTranslateErrorDetails(cancellationErrorCode));
                }
                else {
                    if (!(this.privRequestSession.isSpeechEnded && resultReason === Exports_js_1.ResultReason.NoMatch && simple.RecognitionStatus !== Exports_js_2.RecognitionStatus.InitialSilenceTimeout)) {
                        if (this.privRecognizerConfig.parameters.getProperty(Exports_js_2.OutputFormatPropertyName) === Exports_js_1.OutputFormat[Exports_js_1.OutputFormat.Simple]) {
                            result = new Exports_js_1.ConversationTranscriptionResult(this.privRequestSession.requestId, resultReason, simple.DisplayText, simple.Duration, simple.Offset, simple.Language, simple.LanguageDetectionConfidence, simple.SpeakerId, undefined, simple.asJson(), resultProps);
                        }
                        else {
                            const detailed = Exports_js_2.DetailedSpeechPhrase.fromJSON(connectionMessage.textBody, this.privRequestSession.currentTurnAudioOffset);
                            result = new Exports_js_1.ConversationTranscriptionResult(this.privRequestSession.requestId, resultReason, detailed.RecognitionStatus === Exports_js_2.RecognitionStatus.Success ? detailed.NBest[0].Display : undefined, detailed.Duration, detailed.Offset, detailed.Language, detailed.LanguageDetectionConfidence, simple.SpeakerId, undefined, detailed.asJson(), resultProps);
                        }
                        const event = new Exports_js_1.ConversationTranscriptionEventArgs(result, result.offset, this.privRequestSession.sessionId);
                        if (!!this.privConversationTranscriber.transcribed) {
                            try {
                                this.privConversationTranscriber.transcribed(this.privConversationTranscriber, event);
                                /* eslint-disable no-empty */
                            }
                            catch (error) {
                                // Not going to let errors in the event handler
                                // trip things up.
                            }
                        }
                    }
                }
                processed = true;
                break;
            default:
                break;
        }
        return processed;
    }
    // Cancels recognition.
    cancelRecognition(sessionId, requestId, cancellationReason, errorCode, error) {
        const properties = new Exports_js_1.PropertyCollection();
        properties.setProperty(Exports_js_2.CancellationErrorCodePropertyName, Exports_js_1.CancellationErrorCode[errorCode]);
        if (!!this.privConversationTranscriber.canceled) {
            const cancelEvent = new Exports_js_1.ConversationTranscriptionCanceledEventArgs(cancellationReason, error, errorCode, undefined, sessionId);
            try {
                this.privConversationTranscriber.canceled(this.privConversationTranscriber, cancelEvent);
                /* eslint-disable no-empty */
            }
            catch { }
        }
    }
}
exports.ConversationTranscriptionServiceRecognizer = ConversationTranscriptionServiceRecognizer;



/***/ }),
/* 222 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdentityProvider = exports.SpeakerDiarizationMode = void 0;
/**
 * The speaker diarization mode
 */
var SpeakerDiarizationMode;
(function (SpeakerDiarizationMode) {
    SpeakerDiarizationMode["None"] = "None";
    SpeakerDiarizationMode["Identity"] = "Identity";
    SpeakerDiarizationMode["Anonymous"] = "Anonymous";
})(SpeakerDiarizationMode = exports.SpeakerDiarizationMode || (exports.SpeakerDiarizationMode = {}));
/**
 * The identity provider
 */
var IdentityProvider;
(function (IdentityProvider) {
    IdentityProvider["CallCenter"] = "CallCenter";
})(IdentityProvider = exports.IdentityProvider || (exports.IdentityProvider = {}));



/***/ }),
/* 223 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranscriptionServiceRecognizer = void 0;
const Exports_js_1 = __webpack_require__(4);
const Exports_js_2 = __webpack_require__(85);
const Exports_js_3 = __webpack_require__(2);
const SpeechConnectionMessage_Internal_js_1 = __webpack_require__(188);
// eslint-disable-next-line max-classes-per-file
class TranscriptionServiceRecognizer extends Exports_js_3.ConversationServiceRecognizer {
    constructor(authentication, connectionFactory, audioSource, recognizerConfig, transcriber) {
        super(authentication, connectionFactory, audioSource, recognizerConfig, transcriber);
        this.privTranscriberRecognizer = transcriber;
        this.sendPrePayloadJSONOverride = (connection) => this.sendTranscriptionStartJSON(connection);
        if (this.privRecognizerConfig.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceResponse_RequestWordLevelTimestamps) === "true") {
            this.privSpeechContext.setWordLevelTimings();
        }
    }
    async sendMeetingSpeechEventAsync(info, command) {
        if (!!this.privRequestSession.isRecognizing) {
            const connection = await this.fetchConnection();
            await this.sendSpeechEvent(connection, this.createMeetingSpeechEventPayload(info, command));
        }
    }
    processTypeSpecificMessages(connectionMessage) {
        return this.processSpeechMessages(connectionMessage);
    }
    handleRecognizedCallback(result, offset, sessionId) {
        try {
            const event = new Exports_js_2.SpeechRecognitionEventArgs(result, offset, sessionId);
            this.privTranscriberRecognizer.recognized(this.privTranscriberRecognizer, event);
            if (!!this.privSuccessCallback) {
                try {
                    this.privSuccessCallback(result);
                }
                catch (e) {
                    if (!!this.privErrorCallback) {
                        this.privErrorCallback(e);
                    }
                }
                // Only invoke the call back once.
                // and if it's successful don't invoke the
                // error after that.
                this.privSuccessCallback = undefined;
                this.privErrorCallback = undefined;
            }
            /* eslint-disable no-empty */
        }
        catch (error) {
            // Not going to let errors in the event handler
            // trip things up.
        }
    }
    handleRecognizingCallback(result, duration, sessionId) {
        try {
            const ev = new Exports_js_2.SpeechRecognitionEventArgs(result, duration, sessionId);
            this.privTranscriberRecognizer.recognizing(this.privTranscriberRecognizer, ev);
            /* eslint-disable no-empty */
        }
        catch (error) {
            // Not going to let errors in the event handler
            // trip things up.
        }
    }
    // Cancels recognition.
    cancelRecognition(sessionId, requestId, cancellationReason, errorCode, error) {
        const properties = new Exports_js_2.PropertyCollection();
        properties.setProperty(Exports_js_3.CancellationErrorCodePropertyName, Exports_js_2.CancellationErrorCode[errorCode]);
        if (!!this.privTranscriberRecognizer.canceled) {
            const cancelEvent = new Exports_js_2.MeetingTranscriptionCanceledEventArgs(cancellationReason, error, errorCode, undefined, sessionId);
            try {
                this.privTranscriberRecognizer.canceled(this.privTranscriberRecognizer, cancelEvent);
                /* eslint-disable no-empty */
            }
            catch { }
        }
        if (!!this.privSuccessCallback) {
            const result = new Exports_js_2.SpeechRecognitionResult(requestId, Exports_js_2.ResultReason.Canceled, undefined, // Text
            undefined, // Duration
            undefined, // Offset
            undefined, // Language
            undefined, // Language Detection Confidence
            undefined, // Speaker Id
            error, undefined, // Json
            properties);
            try {
                this.privSuccessCallback(result);
                this.privSuccessCallback = undefined;
                /* eslint-disable no-empty */
            }
            catch { }
        }
    }
    // Encapsulated for derived service recognizers that need to send additional JSON
    async sendTranscriptionStartJSON(connection) {
        await this.sendSpeechContext(connection, true);
        const info = this.privTranscriberRecognizer.getMeetingInfo();
        const payload = this.createMeetingSpeechEventPayload(info, "start");
        await this.sendSpeechEvent(connection, payload);
        await this.sendWaveHeader(connection);
        return;
    }
    sendSpeechEvent(connection, payload) {
        const speechEventJson = JSON.stringify(payload);
        if (speechEventJson) {
            return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_1.MessageType.Text, "speech.event", this.privRequestSession.requestId, "application/json", speechEventJson));
        }
        return;
    }
    createMeetingSpeechEventPayload(info, command) {
        const eventDict = { id: "meeting", name: command, meeting: info.meetingProperties };
        eventDict.meeting.id = info.id;
        eventDict.meeting.attendees = info.participants;
        return eventDict;
    }
}
exports.TranscriptionServiceRecognizer = TranscriptionServiceRecognizer;



/***/ }),
/* 224 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DetailedSpeechPhrase = void 0;
const Exports_js_1 = __webpack_require__(2);
class DetailedSpeechPhrase {
    constructor(json, baseOffset) {
        this.privDetailedSpeechPhrase = JSON.parse(json);
        this.privDetailedSpeechPhrase.RecognitionStatus = this.mapRecognitionStatus(this.privDetailedSpeechPhrase.RecognitionStatus);
        this.updateOffsets(baseOffset);
    }
    static fromJSON(json, baseOffset) {
        return new DetailedSpeechPhrase(json, baseOffset);
    }
    updateOffsets(baseOffset) {
        this.privDetailedSpeechPhrase.Offset += baseOffset;
        if (!!this.privDetailedSpeechPhrase.NBest) {
            for (const phrase of this.privDetailedSpeechPhrase.NBest) {
                if (!!phrase.Words) {
                    for (const word of phrase.Words) {
                        word.Offset += baseOffset;
                    }
                }
                if (!!phrase.DisplayWords) {
                    for (const word of phrase.DisplayWords) {
                        word.Offset += baseOffset;
                    }
                }
            }
        }
    }
    asJson() {
        const jsonObj = { ...this.privDetailedSpeechPhrase };
        // Convert the enum value to its string representation for serialization purposes.
        return JSON.stringify({
            ...jsonObj,
            RecognitionStatus: Exports_js_1.RecognitionStatus[jsonObj.RecognitionStatus]
        });
    }
    get RecognitionStatus() {
        return this.privDetailedSpeechPhrase.RecognitionStatus;
    }
    get NBest() {
        return this.privDetailedSpeechPhrase.NBest;
    }
    get Duration() {
        return this.privDetailedSpeechPhrase.Duration;
    }
    get Offset() {
        return this.privDetailedSpeechPhrase.Offset;
    }
    get Language() {
        return this.privDetailedSpeechPhrase.PrimaryLanguage === undefined ? undefined : this.privDetailedSpeechPhrase.PrimaryLanguage.Language;
    }
    get LanguageDetectionConfidence() {
        return this.privDetailedSpeechPhrase.PrimaryLanguage === undefined ? undefined : this.privDetailedSpeechPhrase.PrimaryLanguage.Confidence;
    }
    get Text() {
        if (!!this.privDetailedSpeechPhrase.NBest && this.privDetailedSpeechPhrase.NBest[0]) {
            return this.privDetailedSpeechPhrase.NBest[0].Display || this.privDetailedSpeechPhrase.NBest[0].DisplayText;
        }
        return this.privDetailedSpeechPhrase.DisplayText;
    }
    get SpeakerId() {
        return this.privDetailedSpeechPhrase.SpeakerId;
    }
    get Channel() {
        return this.privDetailedSpeechPhrase.Channel === undefined ? 0 : this.privDetailedSpeechPhrase.Channel;
    }
    mapRecognitionStatus(status) {
        if (typeof status === "string") {
            return Exports_js_1.RecognitionStatus[status];
        }
        else if (typeof status === "number") {
            return status;
        }
    }
}
exports.DetailedSpeechPhrase = DetailedSpeechPhrase;



/***/ }),
/* 225 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SimpleSpeechPhrase = void 0;
const Exports_js_1 = __webpack_require__(2);
class SimpleSpeechPhrase {
    constructor(json, baseOffset = 0) {
        this.privSimpleSpeechPhrase = JSON.parse(json);
        this.privSimpleSpeechPhrase.RecognitionStatus = this.mapRecognitionStatus(this.privSimpleSpeechPhrase.RecognitionStatus); // RecognitionStatus[this.privSimpleSpeechPhrase.RecognitionStatus as unknown as keyof typeof RecognitionStatus];
        this.updateOffset(baseOffset);
    }
    static fromJSON(json, baseOffset) {
        return new SimpleSpeechPhrase(json, baseOffset);
    }
    updateOffset(baseOffset) {
        this.privSimpleSpeechPhrase.Offset += baseOffset;
    }
    asJson() {
        const jsonObj = { ...this.privSimpleSpeechPhrase };
        // Convert the enum value to its string representation for serialization purposes.
        return JSON.stringify({
            ...jsonObj,
            RecognitionStatus: Exports_js_1.RecognitionStatus[jsonObj.RecognitionStatus]
        });
    }
    get RecognitionStatus() {
        return this.privSimpleSpeechPhrase.RecognitionStatus;
    }
    get DisplayText() {
        return this.privSimpleSpeechPhrase.DisplayText;
    }
    get Offset() {
        return this.privSimpleSpeechPhrase.Offset;
    }
    get Duration() {
        return this.privSimpleSpeechPhrase.Duration;
    }
    get Language() {
        return this.privSimpleSpeechPhrase.PrimaryLanguage === undefined ? undefined : this.privSimpleSpeechPhrase.PrimaryLanguage.Language;
    }
    get LanguageDetectionConfidence() {
        return this.privSimpleSpeechPhrase.PrimaryLanguage === undefined ? undefined : this.privSimpleSpeechPhrase.PrimaryLanguage.Confidence;
    }
    get SpeakerId() {
        return this.privSimpleSpeechPhrase.SpeakerId;
    }
    get Channel() {
        return this.privSimpleSpeechPhrase.Channel === undefined ? 0 : this.privSimpleSpeechPhrase.Channel;
    }
    mapRecognitionStatus(status) {
        if (typeof status === "string") {
            return Exports_js_1.RecognitionStatus[status];
        }
        else if (typeof status === "number") {
            return status;
        }
    }
}
exports.SimpleSpeechPhrase = SimpleSpeechPhrase;



/***/ }),
/* 226 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestSession = void 0;
const Exports_js_1 = __webpack_require__(4);
const RecognitionEvents_js_1 = __webpack_require__(64);
const ServiceTelemetryListener_Internal_js_1 = __webpack_require__(227);
class RequestSession {
    constructor(audioSourceId) {
        this.privIsDisposed = false;
        this.privDetachables = new Array();
        this.privIsAudioNodeDetached = false;
        this.privIsRecognizing = false;
        this.privIsSpeechEnded = false;
        this.privTurnStartAudioOffset = 0;
        this.privLastRecoOffset = 0;
        this.privHypothesisReceived = false;
        this.privBytesSent = 0;
        this.privRecognitionBytesSent = 0;
        this.privRecogNumber = 0;
        this.privInTurn = false;
        this.privConnectionAttempts = 0;
        this.privAudioSourceId = audioSourceId;
        this.privRequestId = (0, Exports_js_1.createNoDashGuid)();
        this.privAudioNodeId = (0, Exports_js_1.createNoDashGuid)();
        this.privTurnDeferral = new Exports_js_1.Deferred();
        // We're not in a turn, so resolve.
        this.privTurnDeferral.resolve();
    }
    get sessionId() {
        return this.privSessionId;
    }
    get requestId() {
        return this.privRequestId;
    }
    get audioNodeId() {
        return this.privAudioNodeId;
    }
    get turnCompletionPromise() {
        return this.privTurnDeferral.promise;
    }
    get isSpeechEnded() {
        return this.privIsSpeechEnded;
    }
    get isRecognizing() {
        return this.privIsRecognizing;
    }
    get currentTurnAudioOffset() {
        return this.privTurnStartAudioOffset;
    }
    get recogNumber() {
        return this.privRecogNumber;
    }
    get numConnectionAttempts() {
        return this.privConnectionAttempts;
    }
    // The number of bytes sent for the current connection.
    // Counter is reset to 0 each time a connection is established.
    get bytesSent() {
        return this.privBytesSent;
    }
    // The number of bytes sent for the current recognition.
    // Counter is reset to 0 each time recognition is started.
    get recognitionBytesSent() {
        return this.privRecognitionBytesSent;
    }
    listenForServiceTelemetry(eventSource) {
        if (!!this.privServiceTelemetryListener) {
            this.privDetachables.push(eventSource.attachListener(this.privServiceTelemetryListener));
        }
    }
    startNewRecognition() {
        this.privRecognitionBytesSent = 0;
        this.privIsSpeechEnded = false;
        this.privIsRecognizing = true;
        this.privTurnStartAudioOffset = 0;
        this.privLastRecoOffset = 0;
        this.privRecogNumber++;
        this.privServiceTelemetryListener = new ServiceTelemetryListener_Internal_js_1.ServiceTelemetryListener(this.privRequestId, this.privAudioSourceId, this.privAudioNodeId);
        this.onEvent(new RecognitionEvents_js_1.RecognitionTriggeredEvent(this.requestId, this.privSessionId, this.privAudioSourceId, this.privAudioNodeId));
    }
    async onAudioSourceAttachCompleted(audioNode, isError) {
        this.privAudioNode = audioNode;
        this.privIsAudioNodeDetached = false;
        if (isError) {
            await this.onComplete();
        }
        else {
            this.onEvent(new RecognitionEvents_js_1.ListeningStartedEvent(this.privRequestId, this.privSessionId, this.privAudioSourceId, this.privAudioNodeId));
        }
    }
    onPreConnectionStart(authFetchEventId, connectionId) {
        this.privAuthFetchEventId = authFetchEventId;
        this.privSessionId = connectionId;
        this.onEvent(new RecognitionEvents_js_1.ConnectingToServiceEvent(this.privRequestId, this.privAuthFetchEventId, this.privSessionId));
    }
    async onAuthCompleted(isError) {
        if (isError) {
            await this.onComplete();
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async onConnectionEstablishCompleted(statusCode, reason) {
        if (statusCode === 200) {
            this.onEvent(new RecognitionEvents_js_1.RecognitionStartedEvent(this.requestId, this.privAudioSourceId, this.privAudioNodeId, this.privAuthFetchEventId, this.privSessionId));
            if (!!this.privAudioNode) {
                this.privAudioNode.replay();
            }
            this.privTurnStartAudioOffset = this.privLastRecoOffset;
            this.privBytesSent = 0;
            return;
        }
        else if (statusCode === 403) {
            await this.onComplete();
        }
    }
    async onServiceTurnEndResponse(continuousRecognition) {
        this.privTurnDeferral.resolve();
        if (!continuousRecognition || this.isSpeechEnded) {
            await this.onComplete();
            this.privInTurn = false;
        }
        else {
            // Start a new request set.
            this.privTurnStartAudioOffset = this.privLastRecoOffset;
            this.privAudioNode.replay();
        }
    }
    onSpeechContext() {
        this.privRequestId = (0, Exports_js_1.createNoDashGuid)();
    }
    onServiceTurnStartResponse() {
        if (!!this.privTurnDeferral && !!this.privInTurn) {
            // What? How are we starting a turn with another not done?
            this.privTurnDeferral.reject("Another turn started before current completed.");
            // Avoid UnhandledPromiseRejection if privTurnDeferral is not being awaited
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            this.privTurnDeferral.promise.then().catch(() => { });
        }
        this.privInTurn = true;
        this.privTurnDeferral = new Exports_js_1.Deferred();
    }
    onHypothesis(offset) {
        const audioReceivedTime = this.privAudioNode.findTimeAtOffset(offset);
        if (!this.privHypothesisReceived) {
            this.privHypothesisReceived = true;
            this.privServiceTelemetryListener.hypothesisReceived(audioReceivedTime);
        }
        return audioReceivedTime > 0 ? Date.now() - audioReceivedTime : 0;
    }
    onPhraseRecognized(offset) {
        const audioReceivedTime = this.privAudioNode.findTimeAtOffset(offset);
        this.privServiceTelemetryListener.phraseReceived(audioReceivedTime);
        this.onServiceRecognized(offset);
        return audioReceivedTime > 0 ? Date.now() - audioReceivedTime : 0;
    }
    onServiceRecognized(offset) {
        this.privLastRecoOffset = offset;
        this.privHypothesisReceived = false;
        this.privAudioNode.shrinkBuffers(offset);
        this.privConnectionAttempts = 0;
    }
    /**
     * The service has acknowledged audio up to `offset` (session-absolute, 100ns ticks); trim
     * the replay buffer to that point so a reconnect resends only unacknowledged audio
     * (shrinkBuffers is monotonic).
     */
    onServiceAcknowledgedAudio(offset) {
        if (!!this.privAudioNode) {
            this.privAudioNode.shrinkBuffers(offset);
        }
    }
    onAudioSent(bytesSent) {
        this.privBytesSent += bytesSent;
        this.privRecognitionBytesSent += bytesSent;
    }
    onRetryConnection() {
        this.privConnectionAttempts++;
    }
    async dispose() {
        if (!this.privIsDisposed) {
            // we should have completed by now. If we did not its an unknown error.
            this.privIsDisposed = true;
            for (const detachable of this.privDetachables) {
                await detachable.detach();
            }
            if (!!this.privServiceTelemetryListener) {
                this.privServiceTelemetryListener.dispose();
            }
            this.privIsRecognizing = false;
        }
    }
    getTelemetry() {
        if (this.privServiceTelemetryListener.hasTelemetry) {
            return this.privServiceTelemetryListener.getTelemetry();
        }
        else {
            return null;
        }
    }
    async onStopRecognizing() {
        await this.onComplete();
    }
    // Should be called with the audioNode for this session has indicated that it is out of speech.
    onSpeechEnded() {
        this.privIsSpeechEnded = true;
    }
    onEvent(event) {
        if (!!this.privServiceTelemetryListener) {
            this.privServiceTelemetryListener.onEvent(event);
        }
        Exports_js_1.Events.instance.onEvent(event);
    }
    async onComplete() {
        if (!!this.privIsRecognizing) {
            this.privIsRecognizing = false;
            await this.detachAudioNode();
        }
    }
    async detachAudioNode() {
        if (!this.privIsAudioNodeDetached) {
            this.privIsAudioNodeDetached = true;
            if (this.privAudioNode) {
                await this.privAudioNode.detach();
            }
        }
    }
}
exports.RequestSession = RequestSession;



/***/ }),
/* 227 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceTelemetryListener = void 0;
/* eslint-disable max-classes-per-file */
const Exports_js_1 = __webpack_require__(4);
const RecognitionEvents_js_1 = __webpack_require__(64);
class ServiceTelemetryListener {
    constructor(requestId, audioSourceId, audioNodeId) {
        this.privIsDisposed = false;
        this.privListeningTriggerMetric = null;
        this.privMicMetric = null;
        this.privConnectionEstablishMetric = null;
        this.privRequestId = requestId;
        this.privAudioSourceId = audioSourceId;
        this.privAudioNodeId = audioNodeId;
        this.privReceivedMessages = {};
        this.privPhraseLatencies = [];
        this.privHypothesisLatencies = [];
    }
    phraseReceived(audioReceivedTime) {
        if (audioReceivedTime > 0) { // 0 indicates the time is unknown. Drop it.
            this.privPhraseLatencies.push(Date.now() - audioReceivedTime);
        }
    }
    hypothesisReceived(audioReceivedTime) {
        if (audioReceivedTime > 0) { // 0 indicates the time is unknown. Drop it.
            this.privHypothesisLatencies.push(Date.now() - audioReceivedTime);
        }
    }
    onEvent(e) {
        if (this.privIsDisposed) {
            return;
        }
        if (e instanceof RecognitionEvents_js_1.RecognitionTriggeredEvent && e.requestId === this.privRequestId) {
            this.privListeningTriggerMetric = {
                End: e.eventTime,
                Name: "ListeningTrigger",
                Start: e.eventTime,
            };
        }
        if (e instanceof Exports_js_1.AudioStreamNodeAttachingEvent && e.audioSourceId === this.privAudioSourceId && e.audioNodeId === this.privAudioNodeId) {
            this.privMicStartTime = e.eventTime;
        }
        if (e instanceof Exports_js_1.AudioStreamNodeAttachedEvent && e.audioSourceId === this.privAudioSourceId && e.audioNodeId === this.privAudioNodeId) {
            this.privMicStartTime = e.eventTime;
        }
        if (e instanceof Exports_js_1.AudioSourceErrorEvent && e.audioSourceId === this.privAudioSourceId) {
            if (!this.privMicMetric) {
                this.privMicMetric = {
                    End: e.eventTime,
                    Error: e.error,
                    Name: "Microphone",
                    Start: this.privMicStartTime,
                };
            }
        }
        if (e instanceof Exports_js_1.AudioStreamNodeErrorEvent && e.audioSourceId === this.privAudioSourceId && e.audioNodeId === this.privAudioNodeId) {
            if (!this.privMicMetric) {
                this.privMicMetric = {
                    End: e.eventTime,
                    Error: e.error,
                    Name: "Microphone",
                    Start: this.privMicStartTime,
                };
            }
        }
        if (e instanceof Exports_js_1.AudioStreamNodeDetachedEvent && e.audioSourceId === this.privAudioSourceId && e.audioNodeId === this.privAudioNodeId) {
            if (!this.privMicMetric) {
                this.privMicMetric = {
                    End: e.eventTime,
                    Name: "Microphone",
                    Start: this.privMicStartTime,
                };
            }
        }
        if (e instanceof RecognitionEvents_js_1.ConnectingToServiceEvent && e.requestId === this.privRequestId) {
            this.privConnectionId = e.sessionId;
        }
        if (e instanceof Exports_js_1.ConnectionStartEvent && e.connectionId === this.privConnectionId) {
            this.privConnectionStartTime = e.eventTime;
        }
        if (e instanceof Exports_js_1.ConnectionEstablishedEvent && e.connectionId === this.privConnectionId) {
            if (!this.privConnectionEstablishMetric) {
                this.privConnectionEstablishMetric = {
                    End: e.eventTime,
                    Id: this.privConnectionId,
                    Name: "Connection",
                    Start: this.privConnectionStartTime,
                };
            }
        }
        if (e instanceof Exports_js_1.ConnectionEstablishErrorEvent && e.connectionId === this.privConnectionId) {
            if (!this.privConnectionEstablishMetric) {
                this.privConnectionEstablishMetric = {
                    End: e.eventTime,
                    Error: this.getConnectionError(e.statusCode),
                    Id: this.privConnectionId,
                    Name: "Connection",
                    Start: this.privConnectionStartTime,
                };
            }
        }
        if (e instanceof Exports_js_1.ConnectionMessageReceivedEvent && e.connectionId === this.privConnectionId) {
            if (e.message && e.message.headers && e.message.headers.path) {
                if (!this.privReceivedMessages[e.message.headers.path]) {
                    this.privReceivedMessages[e.message.headers.path] = new Array();
                }
                const maxMessagesToSend = 50;
                if (this.privReceivedMessages[e.message.headers.path].length < maxMessagesToSend) {
                    this.privReceivedMessages[e.message.headers.path].push(e.networkReceivedTime);
                }
            }
        }
    }
    getTelemetry() {
        const metrics = new Array();
        if (this.privListeningTriggerMetric) {
            metrics.push(this.privListeningTriggerMetric);
        }
        if (this.privMicMetric) {
            metrics.push(this.privMicMetric);
        }
        if (this.privConnectionEstablishMetric) {
            metrics.push(this.privConnectionEstablishMetric);
        }
        if (this.privPhraseLatencies.length > 0) {
            metrics.push({
                PhraseLatencyMs: this.privPhraseLatencies,
            });
        }
        if (this.privHypothesisLatencies.length > 0) {
            metrics.push({
                FirstHypothesisLatencyMs: this.privHypothesisLatencies,
            });
        }
        const telemetry = {
            Metrics: metrics,
            ReceivedMessages: this.privReceivedMessages,
        };
        const json = JSON.stringify(telemetry);
        // We dont want to send the same telemetry again. So clean those out.
        this.privReceivedMessages = {};
        this.privListeningTriggerMetric = null;
        this.privMicMetric = null;
        this.privConnectionEstablishMetric = null;
        this.privPhraseLatencies = [];
        this.privHypothesisLatencies = [];
        return json;
    }
    // Determines if there are any telemetry events to send to the service.
    get hasTelemetry() {
        return (Object.keys(this.privReceivedMessages).length !== 0 ||
            this.privListeningTriggerMetric !== null ||
            this.privMicMetric !== null ||
            this.privConnectionEstablishMetric !== null ||
            this.privPhraseLatencies.length !== 0 ||
            this.privHypothesisLatencies.length !== 0);
    }
    dispose() {
        this.privIsDisposed = true;
    }
    getConnectionError(statusCode) {
        /*
        -- Websocket status codes --
        NormalClosure = 1000,
        EndpointUnavailable = 1001,
        ProtocolError = 1002,
        InvalidMessageType = 1003,
        Empty = 1005,
        InvalidPayloadData = 1007,
        PolicyViolation = 1008,
        MessageTooBig = 1009,
        MandatoryExtension = 1010,
        InternalServerError = 1011
        */
        switch (statusCode) {
            case 400:
            case 1002:
            case 1003:
            case 1005:
            case 1007:
            case 1008:
            case 1009: return "BadRequest";
            case 401: return "Unauthorized";
            case 403: return "Forbidden";
            case 503:
            case 1001: return "ServerUnavailable";
            case 500:
            case 1011: return "ServerError";
            case 408:
            case 504: return "Timeout";
            default: return "statuscode:" + statusCode.toString();
        }
    }
}
exports.ServiceTelemetryListener = ServiceTelemetryListener;



/***/ }),
/* 228 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechContext = void 0;
const PhraseDetectionContext_js_1 = __webpack_require__(116);
const PhraseOutput_js_1 = __webpack_require__(229);
/**
 * Represents the JSON used in the speech.context message sent to the speech service.
 * The dynamic grammar is always refreshed from the encapsulated dynamic grammar object.
 */
class SpeechContext {
    constructor(dynamicGrammar) {
        this.privContext = {};
        this.privDynamicGrammar = dynamicGrammar;
    }
    getContext() {
        return this.privContext;
    }
    /**
     * @Internal
     * This is only used by pronunciation assessment config.
     * Do not use externally, object returned will change without warning or notice.
     */
    setPronunciationAssessmentParams(params, isSpeakerDiarizationEnabled = false) {
        if (this.privContext.phraseDetection === undefined) {
            this.privContext.phraseDetection = {
                enrichment: {
                    pronunciationAssessment: {}
                }
            };
        }
        if (this.privContext.phraseDetection.enrichment === undefined) {
            this.privContext.phraseDetection.enrichment = {
                pronunciationAssessment: {}
            };
        }
        this.privContext.phraseDetection.enrichment.pronunciationAssessment = JSON.parse(params) || {};
        if (isSpeakerDiarizationEnabled) {
            this.privContext.phraseDetection.mode = PhraseDetectionContext_js_1.RecognitionMode.Conversation;
        }
        this.setWordLevelTimings();
        this.privContext.phraseOutput.detailed.options.push(PhraseOutput_js_1.PhraseOption.PronunciationAssessment);
        if (this.privContext.phraseOutput.detailed.options.indexOf(PhraseOutput_js_1.PhraseOption.SNR) === -1) {
            this.privContext.phraseOutput.detailed.options.push(PhraseOutput_js_1.PhraseOption.SNR);
        }
    }
    setDetailedOutputFormat() {
        if (this.privContext.phraseOutput === undefined) {
            this.privContext.phraseOutput = {
                detailed: {
                    options: []
                }
            };
        }
        if (this.privContext.phraseOutput.detailed === undefined) {
            this.privContext.phraseOutput.detailed = {
                options: []
            };
        }
        this.privContext.phraseOutput.format = PhraseOutput_js_1.OutputFormat.Detailed;
    }
    setWordLevelTimings() {
        if (this.privContext.phraseOutput === undefined) {
            this.privContext.phraseOutput = {
                detailed: {
                    options: []
                }
            };
        }
        if (this.privContext.phraseOutput.detailed === undefined) {
            this.privContext.phraseOutput.detailed = {
                options: []
            };
        }
        this.privContext.phraseOutput.format = PhraseOutput_js_1.OutputFormat.Detailed;
        if (this.privContext.phraseOutput.detailed.options.indexOf(PhraseOutput_js_1.PhraseOption.WordTimings) === -1) {
            this.privContext.phraseOutput.detailed.options.push(PhraseOutput_js_1.PhraseOption.WordTimings);
        }
    }
    setSpeakerDiarizationAudioOffsetMs(audioOffsetMs) {
        this.privContext.phraseDetection.speakerDiarization.audioOffsetMs = audioOffsetMs;
    }
    toJSON() {
        const dgi = this.privDynamicGrammar.generateGrammarObject();
        this.privContext.dgi = dgi;
        const ret = JSON.stringify(this.privContext);
        return ret;
    }
}
exports.SpeechContext = SpeechContext;



/***/ }),
/* 229 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TentativePhraseResultsOption = exports.OutputFormat = exports.PhraseExtension = exports.PhraseOption = void 0;
/**
 * The detailed output options.
 */
var PhraseOption;
(function (PhraseOption) {
    PhraseOption["WordTimings"] = "WordTimings";
    PhraseOption["SNR"] = "SNR";
    PhraseOption["Pronunciation"] = "Pronunciation";
    PhraseOption["WordPronunciation"] = "WordPronunciation";
    PhraseOption["WordConfidence"] = "WordConfidence";
    PhraseOption["Words"] = "Words";
    PhraseOption["Sentiment"] = "Sentiment";
    PhraseOption["PronunciationAssessment"] = "PronunciationAssessment";
    PhraseOption["ContentAssessment"] = "ContentAssessment";
    PhraseOption["PhraseAMScore"] = "PhraseAMScore";
    PhraseOption["PhraseLMScore"] = "PhraseLMScore";
    PhraseOption["WordAMScore"] = "WordAMScore";
    PhraseOption["WordLMScore"] = "WordLMScore";
    PhraseOption["RuleTree"] = "RuleTree";
    PhraseOption["NBestTimings"] = "NBestTimings";
    PhraseOption["DecoderDiagnostics"] = "DecoderDiagnostics";
    PhraseOption["DisplayWordTimings"] = "DisplayWordTimings";
    PhraseOption["DisplayWords"] = "DisplayWords";
})(PhraseOption = exports.PhraseOption || (exports.PhraseOption = {}));
/**
 * The detailed output extensions.
 */
var PhraseExtension;
(function (PhraseExtension) {
    PhraseExtension["Graph"] = "Graph";
    PhraseExtension["Corrections"] = "Corrections";
    PhraseExtension["Sentiment"] = "Sentiment";
})(PhraseExtension = exports.PhraseExtension || (exports.PhraseExtension = {}));
/**
 * The Recognition modes
 */
var OutputFormat;
(function (OutputFormat) {
    OutputFormat["Simple"] = "Simple";
    OutputFormat["Detailed"] = "Detailed";
})(OutputFormat = exports.OutputFormat || (exports.OutputFormat = {}));
/**
 * The Tentative Phrase Results option
 */
var TentativePhraseResultsOption;
(function (TentativePhraseResultsOption) {
    TentativePhraseResultsOption["None"] = "None";
    TentativePhraseResultsOption["Always"] = "Always";
})(TentativePhraseResultsOption = exports.TentativePhraseResultsOption || (exports.TentativePhraseResultsOption = {}));



/***/ }),
/* 230 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReconnectContinuationState = void 0;
const HeaderNames_js_1 = __webpack_require__(59);
/**
 * Tracks the per-turn state required by the reliable reconnect protocol.
 *
 * The service issues a continuation token, per-stream resume offsets and a service tag on its
 * responses. When a turn is interrupted before "turn.end", the client echoes these values back
 * in the next "speech.context" so the service can suppress duplicate results, correct media
 * offsets and correlate the reconnected turn.
 *
 * Intentionally dependency-free so it can be unit tested in isolation.
 */
class ReconnectContinuationState {
    constructor(defaultStreamId = "1") {
        this.privDefaultStreamId = defaultStreamId;
    }
    /**
     * The stream id used for the single logical audio stream the SDK currently sends.
     */
    get defaultStreamId() {
        return this.privDefaultStreamId;
    }
    /**
     * The session-absolute resume offset (100ns ticks) most recently acknowledged by the
     * service, or undefined if none has arrived. Used both to populate the outgoing
     * continuation block and to trim the replay buffer.
     */
    get streamOffset() {
        return this.privStreamOffset;
    }
    /**
     * True when the continuation block must be emitted. The block is emitted whenever any of
     * the three signals is present (token, service tag or stream offset). The signals persist
     * for the whole session, so the block keeps being
     * emitted on reconnects and subsequent turns once the first turn.start has been seen.
     */
    get hasPendingContinuation() {
        return this.privToken !== undefined
            || this.privServiceTag !== undefined
            || this.privStreamOffset !== undefined;
    }
    /**
     * Resets all state. Called when a brand new recognition (session) starts.
     */
    reset() {
        this.privToken = undefined;
        this.privServiceTag = undefined;
        this.privStreamOffset = undefined;
    }
    /**
     * A turn has started ("turn.start"). The service tag arrives in the turn.start body (under
     * "$.context.serviceTag"), not a header. The tag is stored unconditionally
     * (empty string when absent) and the token/offset are NOT cleared: the offset is
     * session-global and the token persists until the service issues a new one.
     */
    onTurnStart(serviceTag) {
        this.privServiceTag = serviceTag ?? "";
    }
    /**
     * Captures the reliable-reconnect headers (continuation token and stream resume offset)
     * from an inbound message. Header names are case-insensitive, so matching is too. The
     * service tag is not a header; it comes from the turn.start body via onTurnStart().
     *
     * The per-stream offset header is turn-relative. It is rebased onto the session-absolute
     * timeline using `turnStartOffset`
     * (RequestSession.currentTurnAudioOffset) - the same base used to rebase every other
     * service offset - so the stored offset stays in the same frame as results and replay.
     */
    updateFromHeaders(headers, turnStartOffset = 0) {
        if (!headers) {
            return;
        }
        const tokenHeader = HeaderNames_js_1.HeaderNames.ContinuationToken.toLowerCase();
        const offsetHeader = HeaderNames_js_1.HeaderNames.ContinuationAudioStreamOffset.toLowerCase();
        for (const headerName in headers) {
            if (!headerName) {
                continue;
            }
            const lowerName = headerName.toLowerCase();
            const value = headers[headerName];
            if (lowerName === tokenHeader) {
                this.privToken = value;
            }
            else if (lowerName === offsetHeader) {
                const relativeOffset = parseInt(value, 10);
                if (!isNaN(relativeOffset)) {
                    // Rebase onto the session-absolute timeline and store only when it advances,
                    // so an out-of-order offset never regresses the resume position.
                    const absoluteOffset = turnStartOffset + relativeOffset;
                    if (this.privStreamOffset === undefined || absoluteOffset > this.privStreamOffset) {
                        this.privStreamOffset = absoluteOffset;
                    }
                }
            }
        }
    }
    /**
     * Builds the "$.audio.streams" metadata section. This is always sent when the feature is
     * enabled and is the prerequisite for the service to return continuation headers.
     */
    buildAudioStreamsMetadata() {
        const streams = {};
        // The stream is opted in with "<id>":null (not an empty object); only the null marker
        // enables the continuation contract service-side.
        streams[this.privDefaultStreamId] = null;
        return { streams };
    }
    /**
     * Builds the "$.continuation" section to resume an aborted turn, or undefined when this
     * is a fresh turn (and therefore must not carry a continuation).
     */
    buildContinuationContext() {
        if (!this.hasPendingContinuation) {
            return undefined;
        }
        // Always emit "token" and "previousServiceTag" (defaulting to "") and add the
        // audio stream offset only when one is known.
        const continuation = {
            previousServiceTag: this.privServiceTag ?? "",
            token: this.privToken ?? ""
        };
        if (this.privStreamOffset !== undefined) {
            continuation.audio = {
                streams: { [this.privDefaultStreamId]: { offset: this.privStreamOffset } }
            };
        }
        return continuation;
    }
}
exports.ReconnectContinuationState = ReconnectContinuationState;



/***/ }),
/* 231 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DynamicGrammarBuilder = void 0;
const Group_js_1 = __webpack_require__(232);
/**
 * Responsible for building the object to be sent to the speech service to support dynamic grammars.
 * @class DynamicGrammarBuilder
 */
class DynamicGrammarBuilder {
    constructor() {
        this.privWeight = 1.0;
    }
    // Adds one more reference phrases to the dynamic grammar to send.
    // All added phrases are generic phrases.
    addPhrase(phrase) {
        if (!this.privPhrases) {
            this.privPhrases = [];
        }
        if (phrase instanceof Array) {
            this.privPhrases = this.privPhrases.concat(phrase);
        }
        else {
            this.privPhrases.push(phrase);
        }
    }
    // Clears all phrases stored in the current object.
    clearPhrases() {
        this.privPhrases = undefined;
    }
    // Adds one or more reference grammars to the current grammar.
    addReferenceGrammar(grammar) {
        if (!this.privGrammars) {
            this.privGrammars = [];
        }
        if (grammar instanceof Array) {
            this.privGrammars = this.privGrammars.concat(grammar);
        }
        else {
            this.privGrammars.push(grammar);
        }
    }
    // clears all grammars stored on the recognizer.
    clearGrammars() {
        this.privGrammars = undefined;
    }
    // Sets the weight for the dynamic grammar.
    setWeight(weight) {
        this.privWeight = weight;
    }
    // Generates an object that represents the dynamic grammar used by the Speech Service.
    // This is done by building an object with the correct layout based on the phrases and reference grammars added to this instance
    // of a DynamicGrammarBuilder
    generateGrammarObject() {
        if (this.privGrammars === undefined && this.privPhrases === undefined) {
            return undefined;
        }
        const retObj = {};
        retObj.referenceGrammars = this.privGrammars;
        if (undefined !== this.privPhrases && 0 !== this.privPhrases.length) {
            const retPhrases = [];
            this.privPhrases.forEach((value) => {
                retPhrases.push({
                    text: value,
                });
            });
            retObj.groups = [{ type: Group_js_1.GroupType.Generic, items: retPhrases }];
            retObj.bias = this.privWeight;
        }
        return retObj;
    }
}
exports.DynamicGrammarBuilder = DynamicGrammarBuilder;



/***/ }),
/* 232 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubstringMatchType = exports.GroupType = void 0;
/**
 * Represents the type of the Intent.
 */
var GroupType;
(function (GroupType) {
    GroupType["IntentText"] = "IntentText";
    GroupType["IntentEntity"] = "IntentEntity";
    GroupType["Generic"] = "Generic";
    GroupType["People"] = "People";
    GroupType["Place"] = "Place";
    GroupType["DynamicEntity"] = "DynamicEntity";
})(GroupType = exports.GroupType || (exports.GroupType = {}));
/**
 * Represents the type of the substring match.
 */
var SubstringMatchType;
(function (SubstringMatchType) {
    SubstringMatchType["None"] = "None";
    SubstringMatchType["LeftRooted"] = "LeftRooted";
    SubstringMatchType["PartialName"] = "PartialName";
    SubstringMatchType["MiddleOfSentence"] = "MiddleOfSentence";
})(SubstringMatchType = exports.SubstringMatchType || (exports.SubstringMatchType = {}));



/***/ }),
/* 233 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DialogServiceAdapter = void 0;
const Exports_js_1 = __webpack_require__(66);
const DialogEvents_js_1 = __webpack_require__(34);
const Exports_js_2 = __webpack_require__(4);
const AudioOutputFormat_js_1 = __webpack_require__(91);
const Exports_js_3 = __webpack_require__(85);
const DialogServiceTurnStateManager_js_1 = __webpack_require__(234);
const Exports_js_4 = __webpack_require__(2);
const ActivityResponsePayload_js_1 = __webpack_require__(236);
const InvocationSource_js_1 = __webpack_require__(237);
const KeywordDetection_js_1 = __webpack_require__(238);
const SpeechConnectionMessage_Internal_js_1 = __webpack_require__(188);
class DialogServiceAdapter extends Exports_js_4.ServiceRecognizerBase {
    constructor(authentication, connectionFactory, audioSource, recognizerConfig, dialogServiceConnector) {
        super(authentication, connectionFactory, audioSource, recognizerConfig, dialogServiceConnector);
        this.privEvents = new Exports_js_2.EventSource();
        this.privDialogServiceConnector = dialogServiceConnector;
        this.receiveMessageOverride = () => this.receiveDialogMessageOverride();
        this.privTurnStateManager = new DialogServiceTurnStateManager_js_1.DialogServiceTurnStateManager();
        this.recognizeOverride =
            (recoMode, successCallback, errorCallback) => this.listenOnce(recoMode, successCallback, errorCallback);
        this.postConnectImplOverride = (connection) => this.dialogConnectImpl(connection);
        this.configConnectionOverride = (connection) => this.configConnection(connection);
        this.disconnectOverride = () => this.privDisconnect();
        this.privDialogAudioSource = audioSource;
        this.agentConfigSent = false;
        this.privLastResult = null;
        this.connectionEvents.attach((connectionEvent) => {
            if (connectionEvent.name === "ConnectionClosedEvent") {
                this.terminateMessageLoop = true;
            }
        });
    }
    async sendMessage(message) {
        const interactionGuid = (0, Exports_js_2.createGuid)();
        const requestId = (0, Exports_js_2.createNoDashGuid)();
        const agentMessage = {
            context: {
                interactionId: interactionGuid
            },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            messagePayload: JSON.parse(message),
            version: 0.5
        };
        const agentMessageJson = JSON.stringify(agentMessage);
        const connection = await this.fetchConnection();
        await connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_2.MessageType.Text, "agent", requestId, "application/json", agentMessageJson));
    }
    async privDisconnect() {
        await this.cancelRecognition(this.privRequestSession.sessionId, this.privRequestSession.requestId, Exports_js_3.CancellationReason.Error, Exports_js_3.CancellationErrorCode.NoError, "Disconnecting");
        this.terminateMessageLoop = true;
        this.agentConfigSent = false;
        return;
    }
    processTypeSpecificMessages(connectionMessage) {
        const resultProps = new Exports_js_3.PropertyCollection();
        if (connectionMessage.messageType === Exports_js_2.MessageType.Text) {
            resultProps.setProperty(Exports_js_3.PropertyId.SpeechServiceResponse_JsonResult, connectionMessage.textBody);
        }
        let result;
        let processed;
        switch (connectionMessage.path.toLowerCase()) {
            case "speech.phrase":
                const speechPhrase = Exports_js_4.SimpleSpeechPhrase.fromJSON(connectionMessage.textBody, this.privRequestSession.currentTurnAudioOffset);
                this.privRequestSession.onPhraseRecognized(speechPhrase.Offset + speechPhrase.Duration);
                if (speechPhrase.RecognitionStatus !== Exports_js_4.RecognitionStatus.TooManyRequests && speechPhrase.RecognitionStatus !== Exports_js_4.RecognitionStatus.Error) {
                    const args = this.fireEventForResult(speechPhrase, resultProps);
                    this.privLastResult = args.result;
                    if (!!this.privDialogServiceConnector.recognized) {
                        try {
                            this.privDialogServiceConnector.recognized(this.privDialogServiceConnector, args);
                            /* eslint-disable no-empty */
                        }
                        catch (error) {
                            // Not going to let errors in the event handler
                            // trip things up.
                        }
                    }
                }
                processed = true;
                break;
            case "speech.hypothesis":
                const hypothesis = Exports_js_4.SpeechHypothesis.fromJSON(connectionMessage.textBody, this.privRequestSession.currentTurnAudioOffset);
                result = new Exports_js_3.SpeechRecognitionResult(this.privRequestSession.requestId, Exports_js_3.ResultReason.RecognizingSpeech, hypothesis.Text, hypothesis.Duration, hypothesis.Offset, hypothesis.Language, hypothesis.LanguageDetectionConfidence, undefined, undefined, hypothesis.asJson(), resultProps);
                this.privRequestSession.onHypothesis(hypothesis.Offset);
                const ev = new Exports_js_3.SpeechRecognitionEventArgs(result, hypothesis.Offset, this.privRequestSession.sessionId);
                if (!!this.privDialogServiceConnector.recognizing) {
                    try {
                        this.privDialogServiceConnector.recognizing(this.privDialogServiceConnector, ev);
                        /* eslint-disable no-empty */
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                processed = true;
                break;
            case "speech.keyword":
                const keyword = Exports_js_4.SpeechKeyword.fromJSON(connectionMessage.textBody, this.privRequestSession.currentTurnAudioOffset);
                result = new Exports_js_3.SpeechRecognitionResult(this.privRequestSession.requestId, keyword.Status === "Accepted" ? Exports_js_3.ResultReason.RecognizedKeyword : Exports_js_3.ResultReason.NoMatch, keyword.Text, keyword.Duration, keyword.Offset, undefined, undefined, undefined, undefined, keyword.asJson(), resultProps);
                if (keyword.Status !== "Accepted") {
                    this.privLastResult = result;
                }
                const event = new Exports_js_3.SpeechRecognitionEventArgs(result, result.duration, result.resultId);
                if (!!this.privDialogServiceConnector.recognized) {
                    try {
                        this.privDialogServiceConnector.recognized(this.privDialogServiceConnector, event);
                        /* eslint-disable no-empty */
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                processed = true;
                break;
            case "audio":
                {
                    const audioRequestId = connectionMessage.requestId.toUpperCase();
                    const turn = this.privTurnStateManager.GetTurn(audioRequestId);
                    try {
                        // Empty binary message signals end of stream.
                        if (!connectionMessage.binaryBody) {
                            turn.endAudioStream();
                        }
                        else {
                            turn.audioStream.write(connectionMessage.binaryBody);
                        }
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                processed = true;
                break;
            case "response":
                {
                    this.handleResponseMessage(connectionMessage);
                }
                processed = true;
                break;
            default:
                break;
        }
        const defferal = new Exports_js_2.Deferred();
        defferal.resolve(processed);
        return defferal.promise;
    }
    // Cancels recognition.
    async cancelRecognition(sessionId, requestId, cancellationReason, errorCode, error) {
        this.terminateMessageLoop = true;
        if (!!this.privRequestSession.isRecognizing) {
            await this.privRequestSession.onStopRecognizing();
        }
        if (!!this.privDialogServiceConnector.canceled) {
            const properties = new Exports_js_3.PropertyCollection();
            properties.setProperty(Exports_js_4.CancellationErrorCodePropertyName, Exports_js_3.CancellationErrorCode[errorCode]);
            const cancelEvent = new Exports_js_3.SpeechRecognitionCanceledEventArgs(cancellationReason, error, errorCode, undefined, sessionId);
            try {
                this.privDialogServiceConnector.canceled(this.privDialogServiceConnector, cancelEvent);
                /* eslint-disable no-empty */
            }
            catch { }
            if (!!this.privSuccessCallback) {
                const result = new Exports_js_3.SpeechRecognitionResult(undefined, // ResultId
                Exports_js_3.ResultReason.Canceled, undefined, // Text
                undefined, // Duration
                undefined, // Offset
                undefined, // Language
                undefined, // Language Detection Confidence
                undefined, // Speaker Id
                error, undefined, // Json
                properties);
                try {
                    this.privSuccessCallback(result);
                    this.privSuccessCallback = undefined;
                    /* eslint-disable no-empty */
                }
                catch { }
            }
        }
    }
    async listenOnce(recoMode, successCallback, errorCallback) {
        this.privRecognizerConfig.recognitionMode = recoMode;
        this.privSuccessCallback = successCallback;
        this.privErrorCallback = errorCallback;
        this.privRequestSession.startNewRecognition();
        this.privRequestSession.listenForServiceTelemetry(this.privDialogAudioSource.events);
        this.privRecognizerConfig.parameters.setProperty(Exports_js_3.PropertyId.Speech_SessionId, this.privRequestSession.sessionId);
        // Start the connection to the service. The promise this will create is stored and will be used by configureConnection().
        const conPromise = this.connectImpl();
        const preAudioPromise = this.sendPreAudioMessages();
        const node = await this.privDialogAudioSource.attach(this.privRequestSession.audioNodeId);
        const format = await this.privDialogAudioSource.format;
        const deviceInfo = await this.privDialogAudioSource.deviceInfo;
        const audioNode = new Exports_js_1.ReplayableAudioNode(node, format.avgBytesPerSec);
        await this.privRequestSession.onAudioSourceAttachCompleted(audioNode, false);
        this.privRecognizerConfig.SpeechServiceConfig.Context.audio = { source: deviceInfo };
        try {
            await conPromise;
            await preAudioPromise;
        }
        catch (error) {
            await this.cancelRecognition(this.privRequestSession.sessionId, this.privRequestSession.requestId, Exports_js_3.CancellationReason.Error, Exports_js_3.CancellationErrorCode.ConnectionFailure, error);
            return Promise.resolve();
        }
        const sessionStartEventArgs = new Exports_js_3.SessionEventArgs(this.privRequestSession.sessionId);
        if (!!this.privRecognizer.sessionStarted) {
            this.privRecognizer.sessionStarted(this.privRecognizer, sessionStartEventArgs);
        }
        const audioSendPromise = this.sendAudio(audioNode);
        // /* eslint-disable no-empty */
        audioSendPromise.then(() => { }, async (error) => {
            await this.cancelRecognition(this.privRequestSession.sessionId, this.privRequestSession.requestId, Exports_js_3.CancellationReason.Error, Exports_js_3.CancellationErrorCode.RuntimeError, error);
        });
    }
    // Establishes a websocket connection to the end point.
    dialogConnectImpl(connection) {
        this.privConnectionLoop = this.startMessageLoop();
        return connection;
    }
    receiveDialogMessageOverride() {
        // we won't rely on the cascading promises of the connection since we want to continually be available to receive messages
        const communicationCustodian = new Exports_js_2.Deferred();
        const loop = async () => {
            try {
                const isDisposed = this.isDisposed();
                const terminateMessageLoop = (!this.isDisposed() && this.terminateMessageLoop);
                if (isDisposed || terminateMessageLoop) {
                    // We're done.
                    communicationCustodian.resolve(undefined);
                    return;
                }
                const connection = await this.fetchConnection();
                const message = await connection.read();
                if (!message) {
                    return loop();
                }
                const connectionMessage = SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage.fromConnectionMessage(message);
                switch (connectionMessage.path.toLowerCase()) {
                    case "turn.start":
                        {
                            const turnRequestId = connectionMessage.requestId.toUpperCase();
                            const audioSessionReqId = this.privRequestSession.requestId.toUpperCase();
                            // turn started by the service
                            if (turnRequestId !== audioSessionReqId) {
                                this.privTurnStateManager.StartTurn(turnRequestId);
                            }
                            else {
                                this.privRequestSession.onServiceTurnStartResponse();
                            }
                        }
                        break;
                    case "speech.startdetected":
                        const speechStartDetected = Exports_js_4.SpeechDetected.fromJSON(connectionMessage.textBody, this.privRequestSession.currentTurnAudioOffset);
                        const speechStartEventArgs = new Exports_js_3.RecognitionEventArgs(speechStartDetected.Offset, this.privRequestSession.sessionId);
                        if (!!this.privRecognizer.speechStartDetected) {
                            this.privRecognizer.speechStartDetected(this.privRecognizer, speechStartEventArgs);
                        }
                        break;
                    case "speech.enddetected":
                        let json;
                        if (connectionMessage.textBody.length > 0) {
                            json = connectionMessage.textBody;
                        }
                        else {
                            // If the request was empty, the JSON returned is empty.
                            json = "{ Offset: 0 }";
                        }
                        const speechStopDetected = Exports_js_4.SpeechDetected.fromJSON(json, this.privRequestSession.currentTurnAudioOffset);
                        this.privRequestSession.onServiceRecognized(speechStopDetected.Offset);
                        const speechStopEventArgs = new Exports_js_3.RecognitionEventArgs(speechStopDetected.Offset, this.privRequestSession.sessionId);
                        if (!!this.privRecognizer.speechEndDetected) {
                            this.privRecognizer.speechEndDetected(this.privRecognizer, speechStopEventArgs);
                        }
                        break;
                    case "turn.end":
                        {
                            const turnEndRequestId = connectionMessage.requestId.toUpperCase();
                            const audioSessionReqId = this.privRequestSession.requestId.toUpperCase();
                            // turn started by the service
                            if (turnEndRequestId !== audioSessionReqId) {
                                this.privTurnStateManager.CompleteTurn(turnEndRequestId);
                            }
                            else {
                                // Audio session turn
                                const sessionStopEventArgs = new Exports_js_3.SessionEventArgs(this.privRequestSession.sessionId);
                                await this.privRequestSession.onServiceTurnEndResponse(false);
                                if (!this.privRecognizerConfig.isContinuousRecognition || this.privRequestSession.isSpeechEnded || !this.privRequestSession.isRecognizing) {
                                    if (!!this.privRecognizer.sessionStopped) {
                                        this.privRecognizer.sessionStopped(this.privRecognizer, sessionStopEventArgs);
                                    }
                                }
                                // report result to promise.
                                if (!!this.privSuccessCallback && this.privLastResult) {
                                    try {
                                        this.privSuccessCallback(this.privLastResult);
                                        this.privLastResult = null;
                                    }
                                    catch (e) {
                                        if (!!this.privErrorCallback) {
                                            this.privErrorCallback(e);
                                        }
                                    }
                                    // Only invoke the call back once.
                                    // and if it's successful don't invoke the
                                    // error after that.
                                    this.privSuccessCallback = undefined;
                                    this.privErrorCallback = undefined;
                                }
                            }
                        }
                        break;
                    default:
                        try {
                            const processed = await this.processTypeSpecificMessages(connectionMessage);
                            if (!processed) {
                                if (!!this.serviceEvents) {
                                    this.serviceEvents.onEvent(new Exports_js_2.ServiceEvent(connectionMessage.path.toLowerCase(), connectionMessage.textBody));
                                }
                            }
                        }
                        catch (e) {
                            //
                        }
                }
                const ret = loop();
                return ret;
            }
            catch (error) {
                this.terminateMessageLoop = true;
                communicationCustodian.resolve();
            }
        };
        loop().catch((reason) => {
            Exports_js_2.Events.instance.onEvent(new Exports_js_2.BackgroundEvent(reason));
        });
        return communicationCustodian.promise;
    }
    async startMessageLoop() {
        this.terminateMessageLoop = false;
        try {
            await this.receiveDialogMessageOverride();
        }
        catch (error) {
            await this.cancelRecognition(this.privRequestSession.sessionId, this.privRequestSession.requestId, Exports_js_3.CancellationReason.Error, Exports_js_3.CancellationErrorCode.RuntimeError, error);
        }
        return Promise.resolve();
    }
    // Takes an established websocket connection to the endpoint and sends speech configuration information.
    async configConnection(connection) {
        if (this.terminateMessageLoop) {
            this.terminateMessageLoop = false;
            return Promise.reject("Connection to service terminated.");
        }
        await this.sendSpeechServiceConfig(connection, this.privRequestSession, this.privRecognizerConfig.SpeechServiceConfig.serialize());
        await this.sendAgentConfig(connection);
        return connection;
    }
    async sendPreAudioMessages() {
        const connection = await this.fetchConnection();
        this.addKeywordContextData();
        await this.sendSpeechContext(connection, true);
        await this.sendAgentContext(connection);
        await this.sendWaveHeader(connection);
    }
    sendAgentConfig(connection) {
        if (this.agentConfig && !this.agentConfigSent) {
            if (this.privRecognizerConfig
                .parameters
                .getProperty(Exports_js_3.PropertyId.Conversation_DialogType) === Exports_js_3.DialogServiceConfig.DialogTypes.CustomCommands) {
                const config = this.agentConfig.get();
                config.botInfo.commandsCulture = this.privRecognizerConfig.parameters.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_RecoLanguage, "en-us");
                this.agentConfig.set(config);
            }
            this.onEvent(new DialogEvents_js_1.SendingAgentContextMessageEvent(this.agentConfig));
            const agentConfigJson = this.agentConfig.toJsonString();
            // guard against sending this multiple times on one connection
            this.agentConfigSent = true;
            return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_2.MessageType.Text, "agent.config", this.privRequestSession.requestId, "application/json", agentConfigJson));
        }
        return;
    }
    sendAgentContext(connection) {
        const guid = (0, Exports_js_2.createGuid)();
        const speechActivityTemplate = this.privDialogServiceConnector.properties.getProperty(Exports_js_3.PropertyId.Conversation_Speech_Activity_Template);
        const agentContext = {
            channelData: "",
            context: {
                interactionId: guid
            },
            messagePayload: typeof speechActivityTemplate === undefined ? undefined : speechActivityTemplate,
            version: 0.5
        };
        const agentContextJson = JSON.stringify(agentContext);
        return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_2.MessageType.Text, "speech.agent.context", this.privRequestSession.requestId, "application/json", agentContextJson));
    }
    fireEventForResult(serviceResult, properties) {
        const resultReason = Exports_js_4.EnumTranslation.implTranslateRecognitionResult(serviceResult.RecognitionStatus);
        const result = new Exports_js_3.SpeechRecognitionResult(this.privRequestSession.requestId, resultReason, serviceResult.DisplayText, serviceResult.Duration, serviceResult.Offset, serviceResult.Language, serviceResult.LanguageDetectionConfidence, undefined, undefined, serviceResult.asJson(), properties);
        const ev = new Exports_js_3.SpeechRecognitionEventArgs(result, serviceResult.Offset, this.privRequestSession.sessionId);
        return ev;
    }
    handleResponseMessage(responseMessage) {
        // "response" messages can contain either "message" (activity) or "MessageStatus" data. Fire the appropriate
        // event according to the message type that's specified.
        const responsePayload = JSON.parse(responseMessage.textBody);
        switch (responsePayload.messageType.toLowerCase()) {
            case "message":
                const responseRequestId = responseMessage.requestId.toUpperCase();
                const activityPayload = ActivityResponsePayload_js_1.ActivityPayloadResponse.fromJSON(responseMessage.textBody);
                const turn = this.privTurnStateManager.GetTurn(responseRequestId);
                // update the conversation Id
                if (activityPayload.conversationId) {
                    const updateAgentConfig = this.agentConfig.get();
                    updateAgentConfig.botInfo.conversationId = activityPayload.conversationId;
                    this.agentConfig.set(updateAgentConfig);
                }
                const pullAudioOutputStream = turn.processActivityPayload(activityPayload, AudioOutputFormat_js_1.AudioOutputFormatImpl.fromSpeechSynthesisOutputFormatString(this.privDialogServiceConnector.properties.getProperty(Exports_js_3.PropertyId.SpeechServiceConnection_SynthOutputFormat, undefined)));
                const activity = new Exports_js_3.ActivityReceivedEventArgs(activityPayload.messagePayload, pullAudioOutputStream);
                if (!!this.privDialogServiceConnector.activityReceived) {
                    try {
                        this.privDialogServiceConnector.activityReceived(this.privDialogServiceConnector, activity);
                        /* eslint-disable-next-line no-empty */
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                break;
            case "messagestatus":
                if (!!this.privDialogServiceConnector.turnStatusReceived) {
                    try {
                        this.privDialogServiceConnector.turnStatusReceived(this.privDialogServiceConnector, new Exports_js_3.TurnStatusReceivedEventArgs(responseMessage.textBody));
                        /* eslint-disable-next-line no-empty */
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                break;
            default:
                Exports_js_2.Events.instance.onEvent(new Exports_js_2.BackgroundEvent(`Unexpected response of type ${responsePayload.messageType}. Ignoring.`));
                break;
        }
    }
    onEvent(event) {
        this.privEvents.onEvent(event);
        Exports_js_2.Events.instance.onEvent(event);
    }
    addKeywordContextData() {
        const keywordPropertyValue = this.privRecognizerConfig.parameters.getProperty("SPEECH-KeywordsToDetect");
        if (keywordPropertyValue === undefined) {
            return;
        }
        const keywordOffsetPropertyValue = this.privRecognizerConfig.parameters
            .getProperty("SPEECH-KeywordsToDetect-Offsets");
        const keywordDurationPropertyValue = this.privRecognizerConfig.parameters
            .getProperty("SPEECH-KeywordsToDetect-Durations");
        const keywords = keywordPropertyValue.split(";");
        const keywordOffsets = keywordOffsetPropertyValue === undefined ? [] : keywordOffsetPropertyValue.split(";");
        const keywordDurations = keywordDurationPropertyValue === undefined ? [] : keywordDurationPropertyValue.split(";");
        const keywordDefinitionArray = [];
        for (let i = 0; i < keywords.length; i++) {
            const definition = {
                text: keywords[i]
            };
            if (i < keywordOffsets.length) {
                definition.startOffset = Number(keywordOffsets[i]);
            }
            if (i < keywordDurations.length) {
                definition.duration = Number(keywordDurations[i]);
            }
            keywordDefinitionArray.push(definition);
        }
        this.speechContext.getContext().invocationSource = InvocationSource_js_1.InvocationSource.VoiceActivationWithKeyword;
        this.speechContext.getContext().keywordDetection = [{
                clientDetectedKeywords: keywordDefinitionArray,
                onReject: { action: KeywordDetection_js_1.OnRejectAction.EndOfTurn },
                type: KeywordDetection_js_1.KeywordDetectionType.StartTrigger
            }];
    }
}
exports.DialogServiceAdapter = DialogServiceAdapter;



/***/ }),
/* 234 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DialogServiceTurnStateManager = void 0;
const Error_js_1 = __webpack_require__(31);
const DialogServiceTurnState_js_1 = __webpack_require__(235);
class DialogServiceTurnStateManager {
    constructor() {
        this.privTurnMap = new Map();
        return;
    }
    StartTurn(id) {
        if (this.privTurnMap.has(id)) {
            throw new Error_js_1.InvalidOperationError("Service error: There is already a turn with id:" + id);
        }
        const turnState = new DialogServiceTurnState_js_1.DialogServiceTurnState(this, id);
        this.privTurnMap.set(id, turnState);
        return this.privTurnMap.get(id);
    }
    GetTurn(id) {
        return this.privTurnMap.get(id);
    }
    CompleteTurn(id) {
        if (!this.privTurnMap.has(id)) {
            throw new Error_js_1.InvalidOperationError("Service error: Received turn end for an unknown turn id:" + id);
        }
        const turnState = this.privTurnMap.get(id);
        turnState.complete();
        this.privTurnMap.delete(id);
        return turnState;
    }
}
exports.DialogServiceTurnStateManager = DialogServiceTurnStateManager;



/***/ }),
/* 235 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DialogServiceTurnState = void 0;
const AudioOutputFormat_js_1 = __webpack_require__(91);
const AudioOutputStream_js_1 = __webpack_require__(90);
const ActivityResponsePayload_js_1 = __webpack_require__(236);
class DialogServiceTurnState {
    constructor(manager, requestId) {
        this.privRequestId = requestId;
        this.privIsCompleted = false;
        this.privAudioStream = null;
        this.privTurnManager = manager;
        this.resetTurnEndTimeout();
    }
    get audioStream() {
        // Called when is needed to stream.
        this.resetTurnEndTimeout();
        return this.privAudioStream;
    }
    processActivityPayload(payload, audioFormat) {
        if (payload.messageDataStreamType === ActivityResponsePayload_js_1.MessageDataStreamType.TextToSpeechAudio) {
            this.privAudioStream = AudioOutputStream_js_1.AudioOutputStream.createPullStream();
            this.privAudioStream.format = (audioFormat !== undefined) ? audioFormat : AudioOutputFormat_js_1.AudioOutputFormatImpl.getDefaultOutputFormat();
        }
        return this.privAudioStream;
    }
    endAudioStream() {
        if (this.privAudioStream !== null && !this.privAudioStream.isClosed) {
            this.privAudioStream.close();
        }
    }
    complete() {
        if (this.privTimeoutToken !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            clearTimeout(this.privTimeoutToken);
        }
        this.endAudioStream();
    }
    resetTurnEndTimeout() {
        if (this.privTimeoutToken !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            clearTimeout(this.privTimeoutToken);
        }
        this.privTimeoutToken = setTimeout(() => {
            this.privTurnManager.CompleteTurn(this.privRequestId);
            return;
        }, 2000);
    }
}
exports.DialogServiceTurnState = DialogServiceTurnState;



/***/ }),
/* 236 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// response
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageDataStreamType = exports.ActivityPayloadResponse = void 0;
class ActivityPayloadResponse {
    constructor(json) {
        this.privActivityResponse = JSON.parse(json);
    }
    static fromJSON(json) {
        return new ActivityPayloadResponse(json);
    }
    get conversationId() {
        return this.privActivityResponse.conversationId;
    }
    get messageDataStreamType() {
        return this.privActivityResponse.messageDataStreamType;
    }
    get messagePayload() {
        return this.privActivityResponse.messagePayload;
    }
    get version() {
        return this.privActivityResponse.version;
    }
}
exports.ActivityPayloadResponse = ActivityPayloadResponse;
var MessageDataStreamType;
(function (MessageDataStreamType) {
    MessageDataStreamType[MessageDataStreamType["None"] = 0] = "None";
    MessageDataStreamType[MessageDataStreamType["TextToSpeechAudio"] = 1] = "TextToSpeechAudio";
})(MessageDataStreamType = exports.MessageDataStreamType || (exports.MessageDataStreamType = {}));



/***/ }),
/* 237 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvocationSource = void 0;
/**
 * Represents the source of speech recognition invocation.
 */
var InvocationSource;
(function (InvocationSource) {
    /**
     * No invocation source specified.
     */
    InvocationSource["None"] = "None";
    /**
     * Voice activation with a keyword.
     */
    InvocationSource["VoiceActivationWithKeyword"] = "VoiceActivationWithKeyword";
})(InvocationSource = exports.InvocationSource || (exports.InvocationSource = {}));



/***/ }),
/* 238 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnRejectAction = exports.KeywordDetectionType = void 0;
/**
 * Represents the type of keyword detection.
 */
var KeywordDetectionType;
(function (KeywordDetectionType) {
    /**
     * Triggered at the start of input.
     */
    KeywordDetectionType["StartTrigger"] = "StartTrigger";
})(KeywordDetectionType = exports.KeywordDetectionType || (exports.KeywordDetectionType = {}));
/**
 * The action to take when a keyword is rejected.
 */
var OnRejectAction;
(function (OnRejectAction) {
    /**
     * End the current turn.
     */
    OnRejectAction["EndOfTurn"] = "EndOfTurn";
    /**
     * Continue processing.
     */
    OnRejectAction["Continue"] = "Continue";
})(OnRejectAction = exports.OnRejectAction || (exports.OnRejectAction = {}));



/***/ }),
/* 239 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AgentConfig = void 0;
/**
 * Represents the JSON used in the agent.config message sent to the speech service.
 */
class AgentConfig {
    toJsonString() {
        return JSON.stringify(this.iPrivConfig);
    }
    get() {
        return this.iPrivConfig;
    }
    /**
     * Setter for the agent.config object.
     * @param value a JSON serializable object.
     */
    set(value) {
        this.iPrivConfig = value;
    }
}
exports.AgentConfig = AgentConfig;



/***/ }),
/* 240 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InternalParticipants = exports.TranscriberRecognizer = exports.ConversationConnectionConfig = void 0;
var ConversationConnectionConfig_js_1 = __webpack_require__(241);
Object.defineProperty(exports, "ConversationConnectionConfig", ({ enumerable: true, get: function () { return ConversationConnectionConfig_js_1.ConversationConnectionConfig; } }));
var TranscriberRecognizer_js_1 = __webpack_require__(242);
Object.defineProperty(exports, "TranscriberRecognizer", ({ enumerable: true, get: function () { return TranscriberRecognizer_js_1.TranscriberRecognizer; } }));
var InternalParticipants_js_1 = __webpack_require__(243);
Object.defineProperty(exports, "InternalParticipants", ({ enumerable: true, get: function () { return InternalParticipants_js_1.InternalParticipants; } }));



/***/ }),
/* 241 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConversationConnectionConfig = void 0;
const RestConfigBase_js_1 = __webpack_require__(187);
class ConversationConnectionConfig extends RestConfigBase_js_1.RestConfigBase {
    static get defaultLanguageCode() {
        return ConversationConnectionConfig.privDefaultLanguageCode;
    }
    static get transcriptionEventKeys() {
        return ConversationConnectionConfig.privTranscriptionEventKeys;
    }
}
exports.ConversationConnectionConfig = ConversationConnectionConfig;
ConversationConnectionConfig.privDefaultLanguageCode = "en-US";
ConversationConnectionConfig.privTranscriptionEventKeys = ["iCalUid", "callId", "organizer", "FLAC", "MTUri", "DifferentiateGuestSpeakers", "audiorecording", "Threadid", "OrganizerMri", "OrganizerTenantId", "UserToken"];



/***/ }),
/* 242 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranscriberRecognizer = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const Exports_js_1 = __webpack_require__(4);
const Contracts_js_1 = __webpack_require__(70);
const Exports_js_2 = __webpack_require__(85);
const Exports_js_3 = __webpack_require__(2);
const PhraseDetectionContext_js_1 = __webpack_require__(116);
class TranscriberRecognizer extends Exports_js_2.Recognizer {
    /**
     * TranscriberRecognizer constructor.
     * @constructor
     * @param {SpeechTranslationConfig} speechTranslationConfig - Non-audio configuration associated with the recognizer
     * @param {AudioConfig} audioConfig - An audio configuration associated with the recognizer
     */
    constructor(speechTranslationConfig, audioConfig) {
        const speechTranslationConfigImpl = speechTranslationConfig;
        Contracts_js_1.Contracts.throwIfNull(speechTranslationConfigImpl, "speechTranslationConfig");
        const audioConfigImpl = audioConfig;
        Contracts_js_1.Contracts.throwIfNull(audioConfigImpl, "audioConfigImpl");
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(speechTranslationConfigImpl.speechRecognitionLanguage, Exports_js_2.PropertyId[Exports_js_2.PropertyId.SpeechServiceConnection_RecoLanguage]);
        super(audioConfig, speechTranslationConfigImpl.properties, new Exports_js_3.TranscriberConnectionFactory());
        this.privDisposedRecognizer = false;
    }
    get speechRecognitionLanguage() {
        Contracts_js_1.Contracts.throwIfDisposed(this.privDisposedRecognizer);
        return this.properties.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_RecoLanguage);
    }
    get properties() {
        return this.privProperties;
    }
    get authorizationToken() {
        return this.properties.getProperty(Exports_js_2.PropertyId.SpeechServiceAuthorization_Token);
    }
    set authorizationToken(token) {
        Contracts_js_1.Contracts.throwIfNullOrWhitespace(token, "token");
        this.properties.setProperty(Exports_js_2.PropertyId.SpeechServiceAuthorization_Token, token);
    }
    set meeting(m) {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(m, "Meeting");
        this.privMeeting = m;
    }
    getMeetingInfo() {
        Contracts_js_1.Contracts.throwIfNullOrUndefined(this.privMeeting, "Meeting");
        return this.privMeeting.meetingInfo;
    }
    startContinuousRecognitionAsync(cb, err) {
        (0, Exports_js_1.marshalPromiseToCallbacks)(this.startContinuousRecognitionAsyncImpl(PhraseDetectionContext_js_1.RecognitionMode.Conversation), cb, err);
    }
    stopContinuousRecognitionAsync(cb, err) {
        (0, Exports_js_1.marshalPromiseToCallbacks)(this.stopContinuousRecognitionAsyncImpl(), cb, err);
    }
    async close() {
        if (!this.privDisposedRecognizer) {
            await this.dispose(true);
        }
    }
    // Push async join/leave meeting message via serviceRecognizer
    async pushMeetingEvent(meetingInfo, command) {
        const reco = (this.privReco);
        Contracts_js_1.Contracts.throwIfNullOrUndefined(reco, "serviceRecognizer");
        await reco.sendMeetingSpeechEventAsync(meetingInfo, command);
    }
    async enforceAudioGating() {
        const audioConfigImpl = this.audioConfig;
        const format = await audioConfigImpl.format;
        const channels = format.channels;
        if (channels === 1) {
            if (this.properties.getProperty("f0f5debc-f8c9-4892-ac4b-90a7ab359fd2", "false").toLowerCase() !== "true") {
                throw new Error("Single channel audio configuration for MeetingTranscriber is currently under private preview, please contact diarizationrequest@microsoft.com for more details");
            }
        }
        else if (channels !== 8) {
            throw new Error(`Unsupported audio configuration: Detected ${channels}-channel audio`);
        }
        return;
    }
    connectMeetingCallbacks(transcriber) {
        this.canceled = (s, e) => {
            if (!!transcriber.canceled) {
                transcriber.canceled(transcriber, e);
            }
        };
        this.recognizing = (s, e) => {
            if (!!transcriber.transcribing) {
                transcriber.transcribing(transcriber, e);
            }
        };
        this.recognized = (s, e) => {
            if (!!transcriber.transcribed) {
                transcriber.transcribed(transcriber, e);
            }
        };
        this.sessionStarted = (s, e) => {
            if (!!transcriber.sessionStarted) {
                transcriber.sessionStarted(transcriber, e);
            }
        };
        this.sessionStopped = (s, e) => {
            if (!!transcriber.sessionStopped) {
                transcriber.sessionStopped(transcriber, e);
            }
        };
    }
    disconnectCallbacks() {
        this.canceled = undefined;
        this.recognizing = undefined;
        this.recognized = undefined;
        this.sessionStarted = undefined;
        this.sessionStopped = undefined;
    }
    /**
     * Disposes any resources held by the object.
     * @member ConversationTranscriber.prototype.dispose
     * @function
     * @public
     * @param {boolean} disposing - true if disposing the object.
     */
    async dispose(disposing) {
        if (this.privDisposedRecognizer) {
            return;
        }
        if (disposing) {
            this.privDisposedRecognizer = true;
            await this.implRecognizerStop();
        }
        await super.dispose(disposing);
    }
    createRecognizerConfig(speechConfig) {
        return new Exports_js_3.RecognizerConfig(speechConfig, this.properties);
    }
    createServiceRecognizer(authentication, connectionFactory, audioConfig, recognizerConfig) {
        const configImpl = audioConfig;
        return new Exports_js_3.TranscriptionServiceRecognizer(authentication, connectionFactory, configImpl, recognizerConfig, this);
    }
}
exports.TranscriberRecognizer = TranscriberRecognizer;



/***/ }),
/* 243 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InternalParticipants = void 0;
/** Users participating in the meeting */
class InternalParticipants {
    constructor(participants = []) {
        this.participants = participants;
    }
    /**
     * Add or update a participant
     * @param value
     */
    addOrUpdateParticipant(value) {
        if (value === undefined) {
            return;
        }
        const exists = this.getParticipantIndex(value.id);
        if (exists > -1) {
            this.participants.splice(exists, 1, value);
        }
        else {
            this.participants.push(value);
        }
        // ensure it was added ok
        return this.getParticipant(value.id);
    }
    /**
     * Find the participant's position in the participants list.
     * @param id
     */
    getParticipantIndex(id) {
        return this.participants.findIndex((p) => p.id === id);
    }
    /**
     * Find the participant by id.
     * @param id
     */
    getParticipant(id) {
        return this.participants.find((p) => p.id === id);
    }
    /**
     * Remove a participant from the participants list.
     */
    deleteParticipant(id) {
        this.participants = this.participants.filter((p) => p.id !== id);
    }
}
exports.InternalParticipants = InternalParticipants;



/***/ }),
/* 244 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SynthesisAudioMetadata = exports.MetadataType = void 0;
var MetadataType;
(function (MetadataType) {
    MetadataType["WordBoundary"] = "WordBoundary";
    MetadataType["Bookmark"] = "Bookmark";
    MetadataType["Viseme"] = "Viseme";
    MetadataType["SentenceBoundary"] = "SentenceBoundary";
    MetadataType["SessionEnd"] = "SessionEnd";
    MetadataType["AvatarSignal"] = "TalkingAvatarSignal";
})(MetadataType = exports.MetadataType || (exports.MetadataType = {}));
class SynthesisAudioMetadata {
    constructor(json) {
        this.privSynthesisAudioMetadata = JSON.parse(json);
    }
    static fromJSON(json) {
        return new SynthesisAudioMetadata(json);
    }
    get Metadata() {
        return this.privSynthesisAudioMetadata.Metadata;
    }
}
exports.SynthesisAudioMetadata = SynthesisAudioMetadata;



/***/ }),
/* 245 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SynthesisTurn = void 0;
const Exports_js_1 = __webpack_require__(4);
const AudioOutputStream_js_1 = __webpack_require__(90);
const Exports_js_2 = __webpack_require__(85);
const SynthesisAudioMetadata_js_1 = __webpack_require__(244);
const SynthesisEvents_js_1 = __webpack_require__(246);
class SynthesisTurn {
    constructor() {
        this.privIsDisposed = false;
        this.privIsSynthesizing = false;
        this.privIsSynthesisEnded = false;
        this.privBytesReceived = 0;
        this.privInTurn = false;
        this.privTextOffset = 0;
        this.privNextSearchTextIndex = 0;
        this.privSentenceOffset = 0;
        this.privNextSearchSentenceIndex = 0;
        // Latency tracking
        this.privSynthesisStartTime = 0;
        this.privConnectionLatency = -1;
        this.privNetworkLatency = -1;
        this.privFirstByteLatency = -1;
        this.privServiceLatency = -1;
        this.privRequestId = (0, Exports_js_1.createNoDashGuid)();
        this.privTurnDeferral = new Exports_js_1.Deferred();
        // We're not in a turn, so resolve.
        this.privTurnDeferral.resolve();
    }
    get requestId() {
        return this.privRequestId;
    }
    get streamId() {
        return this.privStreamId;
    }
    set streamId(value) {
        this.privStreamId = value;
    }
    get audioOutputFormat() {
        return this.privAudioOutputFormat;
    }
    set audioOutputFormat(format) {
        this.privAudioOutputFormat = format;
    }
    get turnCompletionPromise() {
        return this.privTurnDeferral.promise;
    }
    get isSynthesisEnded() {
        return this.privIsSynthesisEnded;
    }
    get isSynthesizing() {
        return this.privIsSynthesizing;
    }
    get currentTextOffset() {
        return this.privTextOffset;
    }
    get currentSentenceOffset() {
        return this.privSentenceOffset;
    }
    // The number of bytes received for current turn
    get bytesReceived() {
        return this.privBytesReceived;
    }
    get audioDuration() {
        return this.privAudioDuration;
    }
    get extraProperties() {
        if (!!this.privWebRTCSDP) {
            const properties = new Exports_js_2.PropertyCollection();
            properties.setProperty(Exports_js_2.PropertyId.TalkingAvatarService_WebRTC_SDP, this.privWebRTCSDP);
            return properties;
        }
        return undefined;
    }
    async getAllReceivedAudio() {
        if (!!this.privReceivedAudio) {
            return Promise.resolve(this.privReceivedAudio);
        }
        if (!this.privIsSynthesisEnded) {
            return null;
        }
        await this.readAllAudioFromStream();
        return Promise.resolve(this.privReceivedAudio);
    }
    async getAllReceivedAudioWithHeader() {
        if (!!this.privReceivedAudioWithHeader) {
            return this.privReceivedAudioWithHeader;
        }
        if (!this.privIsSynthesisEnded) {
            return null;
        }
        if (this.audioOutputFormat.hasHeader) {
            const audio = await this.getAllReceivedAudio();
            this.privReceivedAudioWithHeader = this.audioOutputFormat.addHeader(audio);
            return this.privReceivedAudioWithHeader;
        }
        else {
            return this.getAllReceivedAudio();
        }
    }
    startNewSynthesis(requestId, rawText, isSSML, audioDestination) {
        this.privIsSynthesisEnded = false;
        this.privIsSynthesizing = true;
        this.privRequestId = requestId;
        this.privRawText = rawText;
        this.privIsSSML = isSSML;
        this.privAudioOutputStream = new AudioOutputStream_js_1.PullAudioOutputStreamImpl();
        this.privAudioOutputStream.format = this.privAudioOutputFormat;
        this.privReceivedAudio = null;
        this.privReceivedAudioWithHeader = null;
        this.privBytesReceived = 0;
        this.privTextOffset = 0;
        this.privNextSearchTextIndex = 0;
        this.privSentenceOffset = 0;
        this.privNextSearchSentenceIndex = 0;
        this.privPartialVisemeAnimation = "";
        this.privWebRTCSDP = "";
        // Reset latency tracking for this synthesis request
        this.privSynthesisStartTime = Date.now();
        this.privConnectionLatency = -1;
        this.privNetworkLatency = -1;
        this.privFirstByteLatency = -1;
        this.privServiceLatency = -1;
        if (audioDestination !== undefined) {
            this.privTurnAudioDestination = audioDestination;
            this.privTurnAudioDestination.format = this.privAudioOutputFormat;
        }
        this.onEvent(new SynthesisEvents_js_1.SynthesisTriggeredEvent(this.requestId, undefined, audioDestination === undefined ? undefined : audioDestination.id()));
    }
    onPreConnectionStart(authFetchEventId) {
        this.privAuthFetchEventId = authFetchEventId;
        this.onEvent(new SynthesisEvents_js_1.ConnectingToSynthesisServiceEvent(this.privRequestId, this.privAuthFetchEventId));
    }
    onAuthCompleted(isError) {
        if (isError) {
            this.onComplete();
        }
    }
    onConnectionEstablishCompleted(statusCode) {
        if (statusCode === 200) {
            this.privConnectionLatency = Date.now() - this.privSynthesisStartTime;
            this.onEvent(new SynthesisEvents_js_1.SynthesisStartedEvent(this.requestId, this.privAuthFetchEventId));
            this.privBytesReceived = 0;
            return;
        }
        else if (statusCode === 403) {
            this.onComplete();
        }
    }
    onServiceResponseMessage(responseJson) {
        const response = JSON.parse(responseJson);
        this.streamId = response.audio.streamId;
    }
    onServiceTurnEndResponse() {
        this.privInTurn = false;
        this.privTurnDeferral.resolve();
        this.onComplete();
    }
    onServiceTurnStartResponse(responseJson) {
        if (!!this.privTurnDeferral && !!this.privInTurn) {
            // What? How are we starting a turn with another not done?
            this.privTurnDeferral.reject("Another turn started before current completed.");
            // Avoid UnhandledPromiseRejection if privTurnDeferral is not being awaited
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            this.privTurnDeferral.promise.then().catch(() => { });
        }
        this.privInTurn = true;
        this.privTurnDeferral = new Exports_js_1.Deferred();
        // If connection was reused, onConnectionEstablishCompleted was never called; treat as 0.
        if (this.privConnectionLatency < 0) {
            this.privConnectionLatency = 0;
        }
        this.privNetworkLatency = Date.now() - this.privSynthesisStartTime - this.privConnectionLatency;
        const response = JSON.parse(responseJson);
        if (!!response.webrtc) {
            this.privWebRTCSDP = response.webrtc.connectionString;
        }
    }
    onAudioChunkReceived(data) {
        if (this.isSynthesizing) {
            if (this.privFirstByteLatency < 0) {
                this.privFirstByteLatency = Date.now() - this.privSynthesisStartTime;
                if (this.privNetworkLatency >= 0) {
                    this.privServiceLatency = this.privFirstByteLatency - this.privConnectionLatency - this.privNetworkLatency;
                }
            }
            this.privAudioOutputStream.write(data);
            this.privBytesReceived += data.byteLength;
            if (this.privTurnAudioDestination !== undefined) {
                this.privTurnAudioDestination.write(data);
            }
        }
    }
    onTextBoundaryEvent(metadata) {
        this.updateTextOffset(metadata.Data.text.Text, metadata.Type);
    }
    onVisemeMetadataReceived(metadata) {
        if (metadata.Data.AnimationChunk !== undefined) {
            this.privPartialVisemeAnimation += metadata.Data.AnimationChunk;
        }
    }
    onSessionEnd(metadata) {
        this.privAudioDuration = metadata.Data.Offset;
    }
    async constructSynthesisResult() {
        const finishLatency = Date.now() - this.privSynthesisStartTime;
        const audioBuffer = await this.getAllReceivedAudioWithHeader();
        const properties = new Exports_js_2.PropertyCollection();
        if (!!this.privWebRTCSDP) {
            properties.setProperty(Exports_js_2.PropertyId.TalkingAvatarService_WebRTC_SDP, this.privWebRTCSDP);
        }
        properties.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_SynthesisFirstByteLatencyMs, String(Math.max(0, this.privFirstByteLatency)));
        properties.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_SynthesisFinishLatencyMs, String(finishLatency));
        properties.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_SynthesisConnectionLatencyMs, String(Math.max(0, this.privConnectionLatency)));
        properties.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_SynthesisNetworkLatencyMs, String(Math.max(0, this.privNetworkLatency)));
        properties.setProperty(Exports_js_2.PropertyId.SpeechServiceResponse_SynthesisServiceLatencyMs, String(Math.max(0, this.privServiceLatency)));
        return new Exports_js_2.SpeechSynthesisResult(this.requestId, Exports_js_2.ResultReason.SynthesizingAudioCompleted, audioBuffer, undefined, properties, this.audioDuration);
    }
    dispose() {
        if (!this.privIsDisposed) {
            // we should have completed by now. If we did not its an unknown error.
            this.privIsDisposed = true;
        }
    }
    onStopSynthesizing() {
        this.onComplete();
    }
    /**
     * Gets the viseme animation string (merged from animation chunk), and clears the internal
     * partial animation.
     */
    getAndClearVisemeAnimation() {
        const animation = this.privPartialVisemeAnimation;
        this.privPartialVisemeAnimation = "";
        return animation;
    }
    onEvent(event) {
        Exports_js_1.Events.instance.onEvent(event);
    }
    /**
     * Check if the text is an XML(SSML) tag
     * @param text
     * @private
     */
    static isXmlTag(text) {
        return text.length >= 2 && text[0] === "<" && text[text.length - 1] === ">";
    }
    updateTextOffset(text, type) {
        if (type === SynthesisAudioMetadata_js_1.MetadataType.WordBoundary) {
            this.privTextOffset = this.privRawText.indexOf(text, this.privNextSearchTextIndex);
            if (this.privTextOffset >= 0) {
                this.privNextSearchTextIndex = this.privTextOffset + text.length;
                if (this.privIsSSML) {
                    if (this.withinXmlTag(this.privTextOffset) && !SynthesisTurn.isXmlTag(text)) {
                        this.updateTextOffset(text, type);
                    }
                }
            }
        }
        else {
            this.privSentenceOffset = this.privRawText.indexOf(text, this.privNextSearchSentenceIndex);
            if (this.privSentenceOffset >= 0) {
                this.privNextSearchSentenceIndex = this.privSentenceOffset + text.length;
                if (this.privIsSSML) {
                    if (this.withinXmlTag(this.privSentenceOffset) && !SynthesisTurn.isXmlTag(text)) {
                        this.updateTextOffset(text, type);
                    }
                }
            }
        }
    }
    onComplete() {
        if (this.privIsSynthesizing) {
            this.privIsSynthesizing = false;
            this.privIsSynthesisEnded = true;
            this.privAudioOutputStream.close();
            this.privInTurn = false;
            if (this.privTurnAudioDestination !== undefined) {
                this.privTurnAudioDestination.close();
                this.privTurnAudioDestination = undefined;
            }
        }
    }
    async readAllAudioFromStream() {
        if (this.privIsSynthesisEnded) {
            this.privReceivedAudio = new ArrayBuffer(this.bytesReceived);
            try {
                await this.privAudioOutputStream.read(this.privReceivedAudio);
            }
            catch (e) {
                this.privReceivedAudio = new ArrayBuffer(0);
            }
        }
    }
    /**
     * Check if current idx is in XML(SSML) tag
     * @param idx
     * @private
     */
    withinXmlTag(idx) {
        return this.privRawText.indexOf("<", idx + 1) > this.privRawText.indexOf(">", idx + 1);
    }
}
exports.SynthesisTurn = SynthesisTurn;



/***/ }),
/* 246 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SynthesisStartedEvent = exports.ConnectingToSynthesisServiceEvent = exports.SynthesisTriggeredEvent = exports.SpeechSynthesisEvent = void 0;
/* eslint-disable max-classes-per-file */
const Exports_js_1 = __webpack_require__(4);
class SpeechSynthesisEvent extends Exports_js_1.PlatformEvent {
    constructor(eventName, requestId, eventType = Exports_js_1.EventType.Info) {
        super(eventName, eventType);
        this.privRequestId = requestId;
    }
    get requestId() {
        return this.privRequestId;
    }
}
exports.SpeechSynthesisEvent = SpeechSynthesisEvent;
class SynthesisTriggeredEvent extends SpeechSynthesisEvent {
    constructor(requestId, sessionAudioDestinationId, turnAudioDestinationId) {
        super("SynthesisTriggeredEvent", requestId);
        this.privSessionAudioDestinationId = sessionAudioDestinationId;
        this.privTurnAudioDestinationId = turnAudioDestinationId;
    }
    get audioSessionDestinationId() {
        return this.privSessionAudioDestinationId;
    }
    get audioTurnDestinationId() {
        return this.privTurnAudioDestinationId;
    }
}
exports.SynthesisTriggeredEvent = SynthesisTriggeredEvent;
class ConnectingToSynthesisServiceEvent extends SpeechSynthesisEvent {
    constructor(requestId, authFetchEventId) {
        super("ConnectingToSynthesisServiceEvent", requestId);
        this.privAuthFetchEventId = authFetchEventId;
    }
    get authFetchEventId() {
        return this.privAuthFetchEventId;
    }
}
exports.ConnectingToSynthesisServiceEvent = ConnectingToSynthesisServiceEvent;
class SynthesisStartedEvent extends SpeechSynthesisEvent {
    constructor(requestId, authFetchEventId) {
        super("SynthesisStartedEvent", requestId);
        this.privAuthFetchEventId = authFetchEventId;
    }
    get authFetchEventId() {
        return this.privAuthFetchEventId;
    }
}
exports.SynthesisStartedEvent = SynthesisStartedEvent;



/***/ }),
/* 247 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SynthesisAdapterBase = void 0;
const Exports_js_1 = __webpack_require__(4);
const Exports_js_2 = __webpack_require__(85);
const Exports_js_3 = __webpack_require__(2);
const SpeechConnectionMessage_Internal_js_1 = __webpack_require__(188);
class SynthesisAdapterBase {
    constructor(authentication, connectionFactory, synthesizerConfig, audioDestination) {
        this.speakOverride = undefined;
        this.receiveMessageOverride = undefined;
        this.connectImplOverride = undefined;
        this.configConnectionOverride = undefined;
        // A promise for a configured connection.
        // Do not consume directly, call fetchConnection instead.
        this.privConnectionConfigurationPromise = undefined;
        if (!authentication) {
            throw new Exports_js_1.ArgumentNullError("authentication");
        }
        if (!connectionFactory) {
            throw new Exports_js_1.ArgumentNullError("connectionFactory");
        }
        if (!synthesizerConfig) {
            throw new Exports_js_1.ArgumentNullError("synthesizerConfig");
        }
        this.privAuthentication = authentication;
        this.privConnectionFactory = connectionFactory;
        this.privSynthesizerConfig = synthesizerConfig;
        this.privIsDisposed = false;
        this.privSessionAudioDestination = audioDestination;
        this.privSynthesisTurn = new Exports_js_3.SynthesisTurn();
        this.privConnectionEvents = new Exports_js_1.EventSource();
        this.privServiceEvents = new Exports_js_1.EventSource();
        this.privSynthesisContext = new Exports_js_3.SynthesisContext();
        this.privAgentConfig = new Exports_js_3.AgentConfig();
        this.connectionEvents.attach((connectionEvent) => {
            if (connectionEvent.name === "ConnectionClosedEvent") {
                const connectionClosedEvent = connectionEvent;
                if (connectionClosedEvent.statusCode !== 1000) {
                    this.cancelSynthesisLocal(Exports_js_2.CancellationReason.Error, connectionClosedEvent.statusCode === 1007 ? Exports_js_2.CancellationErrorCode.BadRequestParameters : Exports_js_2.CancellationErrorCode.ConnectionFailure, `${connectionClosedEvent.reason} websocket error code: ${connectionClosedEvent.statusCode}`);
                }
            }
        });
    }
    get synthesizerConfig() {
        return this.privSynthesizerConfig;
    }
    get synthesisContext() {
        return this.privSynthesisContext;
    }
    get agentConfig() {
        return this.privAgentConfig;
    }
    get connectionEvents() {
        return this.privConnectionEvents;
    }
    get serviceEvents() {
        return this.privServiceEvents;
    }
    set activityTemplate(messagePayload) {
        this.privActivityTemplate = messagePayload;
    }
    get activityTemplate() {
        return this.privActivityTemplate;
    }
    set audioOutputFormat(format) {
        this.privAudioOutputFormat = format;
        this.privSynthesisTurn.audioOutputFormat = format;
        if (this.privSessionAudioDestination !== undefined) {
            this.privSessionAudioDestination.format = format;
        }
        if (this.synthesisContext !== undefined) {
            this.synthesisContext.audioOutputFormat = format;
        }
    }
    isDisposed() {
        return this.privIsDisposed;
    }
    async dispose(reason) {
        this.privIsDisposed = true;
        if (this.privSessionAudioDestination !== undefined) {
            this.privSessionAudioDestination.close();
        }
        if (this.privConnectionConfigurationPromise !== undefined) {
            try {
                const connection = await this.privConnectionConfigurationPromise;
                await connection.dispose(reason);
            }
            catch {
                // Connection was never successfully established, nothing to dispose
            }
        }
    }
    async connect() {
        await this.connectImpl();
    }
    async sendNetworkMessage(path, payload) {
        const type = typeof payload === "string" ? Exports_js_1.MessageType.Text : Exports_js_1.MessageType.Binary;
        const contentType = typeof payload === "string" ? "application/json" : "";
        const connection = await this.fetchConnection();
        return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(type, path, this.privSynthesisTurn.requestId, contentType, payload));
    }
    async Speak(text, isSSML, requestId, successCallback, errorCallBack, audioDestination) {
        let ssml;
        if (isSSML) {
            ssml = text;
        }
        else {
            ssml = this.privSynthesizer.buildSsml(text);
        }
        if (this.speakOverride !== undefined) {
            return this.speakOverride(ssml, requestId, successCallback, errorCallBack);
        }
        this.privSuccessCallback = successCallback;
        this.privErrorCallback = errorCallBack;
        this.privSynthesisTurn.startNewSynthesis(requestId, text, isSSML, audioDestination);
        try {
            const connection = await this.fetchConnection();
            await this.sendSynthesisContext(connection);
            await this.sendSsmlMessage(connection, ssml, requestId);
            this.onSynthesisStarted(requestId);
            void this.receiveMessage();
        }
        catch (e) {
            this.cancelSynthesisLocal(Exports_js_2.CancellationReason.Error, Exports_js_2.CancellationErrorCode.ConnectionFailure, e);
            return Promise.reject(e);
        }
    }
    async stopSpeaking() {
        const connection = await this.fetchConnection();
        return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_1.MessageType.Text, "synthesis.control", this.privSynthesisTurn.requestId, "application/json", JSON.stringify({
            action: "stop"
        })));
    }
    /**
     * Performs text streaming synthesis using a SpeechSynthesisRequest.
     * Text pieces are sent over WebSocket as they arrive via the request's input stream.
     */
    async SpeakStream(request, requestId, successCallback, errorCallBack, audioDestination) {
        this.privSuccessCallback = successCallback;
        this.privErrorCallback = errorCallBack;
        this.privSynthesisTurn.startNewSynthesis(requestId, "", false, audioDestination);
        try {
            const connection = await this.fetchConnection();
            // Send synthesis.context with streaming input section embedded
            await this.sendStreamingSynthesisContext(connection, request, requestId);
            this.onSynthesisStarted(requestId);
            // Set up text piece callback - each piece is sent as a text.piece message
            request.onTextPiece = (text) => {
                this.sendTextPiece(connection, text, requestId).catch((e) => {
                    this.cancelSynthesisLocal(Exports_js_2.CancellationReason.Error, Exports_js_2.CancellationErrorCode.ConnectionFailure, e);
                });
            };
            // Set up close callback - sends the finish signal
            request.onClose = () => {
                this.sendTextStreamEnd(connection, requestId).catch((e) => {
                    this.cancelSynthesisLocal(Exports_js_2.CancellationReason.Error, Exports_js_2.CancellationErrorCode.ConnectionFailure, e);
                });
            };
            void this.receiveMessage();
        }
        catch (e) {
            this.cancelSynthesisLocal(Exports_js_2.CancellationReason.Error, Exports_js_2.CancellationErrorCode.ConnectionFailure, e);
            return Promise.reject(e);
        }
    }
    // Cancels synthesis.
    cancelSynthesis(requestId, _cancellationReason, errorCode, error) {
        const properties = new Exports_js_2.PropertyCollection();
        properties.setProperty(Exports_js_3.CancellationErrorCodePropertyName, Exports_js_2.CancellationErrorCode[errorCode]);
        const result = new Exports_js_2.SpeechSynthesisResult(requestId, Exports_js_2.ResultReason.Canceled, undefined, error, properties);
        this.onSynthesisCancelled(result);
        if (!!this.privSuccessCallback) {
            try {
                this.privSuccessCallback(result);
                /* eslint-disable no-empty */
            }
            catch { }
        }
    }
    // Cancels synthesis.
    cancelSynthesisLocal(cancellationReason, errorCode, error) {
        if (!!this.privSynthesisTurn.isSynthesizing) {
            this.privSynthesisTurn.onStopSynthesizing();
            this.cancelSynthesis(this.privSynthesisTurn.requestId, cancellationReason, errorCode, error);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processTypeSpecificMessages(_connectionMessage) {
        return true;
    }
    async receiveMessage() {
        try {
            const connection = await this.fetchConnection();
            const message = await connection.read();
            if (this.receiveMessageOverride !== undefined) {
                return this.receiveMessageOverride();
            }
            if (this.privIsDisposed) {
                // We're done.
                return;
            }
            // indicates we are draining the queue and it came with no message;
            if (!message) {
                if (!this.privSynthesisTurn.isSynthesizing) {
                    return;
                }
                else {
                    return this.receiveMessage();
                }
            }
            const connectionMessage = SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage.fromConnectionMessage(message);
            if (connectionMessage.requestId.toLowerCase() === this.privSynthesisTurn.requestId.toLowerCase()) {
                switch (connectionMessage.path.toLowerCase()) {
                    case "turn.start":
                        this.privSynthesisTurn.onServiceTurnStartResponse(connectionMessage.textBody);
                        break;
                    case "response":
                        this.privSynthesisTurn.onServiceResponseMessage(connectionMessage.textBody);
                        break;
                    case "audio":
                        if (this.privSynthesisTurn.streamId.toLowerCase() === connectionMessage.streamId.toLowerCase()
                            && !!connectionMessage.binaryBody) {
                            this.privSynthesisTurn.onAudioChunkReceived(connectionMessage.binaryBody);
                            this.onSynthesizing(connectionMessage.binaryBody);
                            if (this.privSessionAudioDestination !== undefined) {
                                this.privSessionAudioDestination.write(connectionMessage.binaryBody);
                            }
                        }
                        break;
                    case "audio.metadata":
                        const metadataList = Exports_js_3.SynthesisAudioMetadata.fromJSON(connectionMessage.textBody).Metadata;
                        for (const metadata of metadataList) {
                            switch (metadata.Type) {
                                case Exports_js_3.MetadataType.WordBoundary:
                                case Exports_js_3.MetadataType.SentenceBoundary:
                                    this.privSynthesisTurn.onTextBoundaryEvent(metadata);
                                    const wordBoundaryEventArgs = new Exports_js_2.SpeechSynthesisWordBoundaryEventArgs(metadata.Data.Offset, metadata.Data.Duration, metadata.Data.text.Text, metadata.Data.text.Length, metadata.Type === Exports_js_3.MetadataType.WordBoundary
                                        ? this.privSynthesisTurn.currentTextOffset : this.privSynthesisTurn.currentSentenceOffset, metadata.Data.text.BoundaryType);
                                    this.onWordBoundary(wordBoundaryEventArgs);
                                    break;
                                case Exports_js_3.MetadataType.Bookmark:
                                    const bookmarkEventArgs = new Exports_js_2.SpeechSynthesisBookmarkEventArgs(metadata.Data.Offset, metadata.Data.Bookmark);
                                    this.onBookmarkReached(bookmarkEventArgs);
                                    break;
                                case Exports_js_3.MetadataType.Viseme:
                                    this.privSynthesisTurn.onVisemeMetadataReceived(metadata);
                                    if (metadata.Data.IsLastAnimation) {
                                        const visemeEventArgs = new Exports_js_2.SpeechSynthesisVisemeEventArgs(metadata.Data.Offset, metadata.Data.VisemeId, this.privSynthesisTurn.getAndClearVisemeAnimation());
                                        this.onVisemeReceived(visemeEventArgs);
                                    }
                                    break;
                                case Exports_js_3.MetadataType.AvatarSignal:
                                    this.onAvatarEvent(metadata);
                                    break;
                                case Exports_js_3.MetadataType.SessionEnd:
                                    this.privSynthesisTurn.onSessionEnd(metadata);
                                    break;
                            }
                        }
                        break;
                    case "turn.end":
                        this.privSynthesisTurn.onServiceTurnEndResponse();
                        let result;
                        try {
                            result = await this.privSynthesisTurn.constructSynthesisResult();
                            this.onSynthesisCompleted(result);
                            if (!!this.privSuccessCallback) {
                                this.privSuccessCallback(result);
                            }
                        }
                        catch (error) {
                            if (!!this.privErrorCallback) {
                                this.privErrorCallback(error);
                            }
                        }
                        break;
                    default:
                        if (!this.processTypeSpecificMessages(connectionMessage)) {
                            // here are some messages that the derived class has not processed, dispatch them to connect class
                            if (!!this.privServiceEvents) {
                                this.serviceEvents.onEvent(new Exports_js_1.ServiceEvent(connectionMessage.path.toLowerCase(), connectionMessage.textBody));
                            }
                        }
                }
            }
            return this.receiveMessage();
        }
        catch (e) {
            // TODO: What goes here?
        }
    }
    sendSynthesisContext(connection) {
        this.setSynthesisContextSynthesisSection();
        const synthesisContextJson = this.synthesisContext.toJSON();
        if (synthesisContextJson) {
            return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_1.MessageType.Text, "synthesis.context", this.privSynthesisTurn.requestId, "application/json", synthesisContextJson));
        }
        return;
    }
    setSpeechConfigSynthesisSection() {
        return;
    }
    connectImpl(isUnAuthorized = false) {
        if (this.privConnectionPromise != null) {
            return this.privConnectionPromise.then((connection) => {
                if (connection.state() === Exports_js_1.ConnectionState.Disconnected) {
                    this.privConnectionId = null;
                    this.privConnectionPromise = null;
                    return this.connectImpl();
                }
                return this.privConnectionPromise;
            }, () => {
                this.privConnectionId = null;
                this.privConnectionPromise = null;
                return this.connectImpl();
            });
        }
        this.privAuthFetchEventId = (0, Exports_js_1.createNoDashGuid)();
        this.privConnectionId = (0, Exports_js_1.createNoDashGuid)();
        this.privSynthesisTurn.onPreConnectionStart(this.privAuthFetchEventId);
        const authPromise = isUnAuthorized ? this.privAuthentication.fetchOnExpiry(this.privAuthFetchEventId) : this.privAuthentication.fetch(this.privAuthFetchEventId);
        this.privConnectionPromise = authPromise.then(async (result) => {
            this.privSynthesisTurn.onAuthCompleted(false);
            const connection = await this.privConnectionFactory.create(this.privSynthesizerConfig, result, this.privConnectionId);
            // Attach to the underlying event. No need to hold onto the detach pointers as in the event the connection goes away,
            // it'll stop sending events.
            connection.events.attach((event) => {
                this.connectionEvents.onEvent(event);
            });
            const response = await connection.open();
            if (response.statusCode === 200) {
                this.privSynthesisTurn.onConnectionEstablishCompleted(response.statusCode);
                return Promise.resolve(connection);
            }
            else if (response.statusCode === 403 && !isUnAuthorized) {
                return this.connectImpl(true);
            }
            else {
                this.privSynthesisTurn.onConnectionEstablishCompleted(response.statusCode);
                return Promise.reject(`Unable to contact server. StatusCode: ${response.statusCode},
                    ${this.privSynthesizerConfig.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Url)} Reason: ${response.reason}`);
            }
        }, (error) => {
            this.privSynthesisTurn.onAuthCompleted(true);
            throw new Error(error);
        });
        // Attach an empty handler to allow the promise to run in the background while
        // other startup events happen. It'll eventually be awaited on.
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.privConnectionPromise.catch(() => { });
        return this.privConnectionPromise;
    }
    sendSpeechServiceConfig(connection, SpeechServiceConfigJson) {
        if (SpeechServiceConfigJson) {
            return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_1.MessageType.Text, "speech.config", this.privSynthesisTurn.requestId, "application/json", SpeechServiceConfigJson));
        }
    }
    sendSsmlMessage(connection, ssml, requestId) {
        return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_1.MessageType.Text, "ssml", requestId, "application/ssml+xml", ssml));
    }
    /**
     * Sends the synthesis.context message for text streaming mode.
     * Includes the standard audio/language sections plus an input section
     * with bidirectionalStreamingMode, voice name, and per-request properties.
     */
    async sendStreamingSynthesisContext(connection, request, requestId) {
        // Build the standard synthesis context first
        this.setSynthesisContextSynthesisSection();
        // Build the streaming input section
        const inputSection = {
            bidirectionalStreamingMode: true,
        };
        // Add voice name and language from synthesizer properties
        const voiceName = this.privSynthesizerConfig.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthVoice, "");
        const language = this.privSynthesizerConfig.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_SynthLanguage, "en-US");
        if (voiceName) {
            inputSection.voiceName = voiceName;
        }
        inputSection.language = language;
        // Add per-request voice properties
        const pitch = request.properties.getProperty(Exports_js_2.PropertyId.SpeechSynthesisRequest_Pitch, undefined);
        const rate = request.properties.getProperty(Exports_js_2.PropertyId.SpeechSynthesisRequest_Rate, undefined);
        const volume = request.properties.getProperty(Exports_js_2.PropertyId.SpeechSynthesisRequest_Volume, undefined);
        const style = request.properties.getProperty(Exports_js_2.PropertyId.SpeechSynthesisRequest_Style, undefined);
        const temperature = request.properties.getProperty(Exports_js_2.PropertyId.SpeechSynthesisRequest_Temperature, undefined);
        const customLexiconUrl = request.properties.getProperty(Exports_js_2.PropertyId.SpeechSynthesisRequest_CustomLexiconUrl, undefined);
        const preferLocales = request.properties.getProperty(Exports_js_2.PropertyId.SpeechSynthesisRequest_PreferLocales, undefined);
        if (pitch !== undefined) {
            inputSection.pitch = pitch;
        }
        if (rate !== undefined) {
            inputSection.rate = rate;
        }
        if (volume !== undefined) {
            inputSection.volume = volume;
        }
        if (style !== undefined) {
            inputSection.style = style;
        }
        if (temperature !== undefined) {
            inputSection.temperature = temperature;
        }
        if (customLexiconUrl !== undefined) {
            inputSection.customLexiconUrl = customLexiconUrl;
        }
        if (preferLocales !== undefined) {
            inputSection.preferLocales = preferLocales;
        }
        // Add the input section to the synthesis context
        const existingSynthesis = this.privSynthesisContext.getSection("synthesis") ?? {};
        this.privSynthesisContext.setSection("synthesis", {
            ...existingSynthesis,
            input: inputSection,
        });
        const synthesisContextJson = this.privSynthesisContext.toJSON();
        if (synthesisContextJson) {
            return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_1.MessageType.Text, "synthesis.context", requestId, "application/json", synthesisContextJson));
        }
    }
    /**
     * Sends a text piece for streaming synthesis.
     * Path: text.piece, Content-Type: text/plain, Body: raw text
     */
    async sendTextPiece(connection, text, requestId) {
        return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_1.MessageType.Text, "text.piece", requestId, "text/plain", text));
    }
    /**
     * Sends the end-of-stream signal for text streaming synthesis.
     * Path: text.end, Content-Type: text/plain, Body: empty
     */
    async sendTextStreamEnd(connection, requestId) {
        return connection.send(new SpeechConnectionMessage_Internal_js_1.SpeechConnectionMessage(Exports_js_1.MessageType.Text, "text.end", requestId, "text/plain", ""));
    }
    async fetchConnection() {
        if (this.privConnectionConfigurationPromise !== undefined) {
            return this.privConnectionConfigurationPromise.then((connection) => {
                if (connection.state() === Exports_js_1.ConnectionState.Disconnected) {
                    this.privConnectionId = null;
                    this.privConnectionConfigurationPromise = undefined;
                    return this.fetchConnection();
                }
                return this.privConnectionConfigurationPromise;
            }, () => {
                this.privConnectionId = null;
                this.privConnectionConfigurationPromise = undefined;
                return this.fetchConnection();
            });
        }
        this.privConnectionConfigurationPromise = this.configureConnection();
        return await this.privConnectionConfigurationPromise;
    }
    // Takes an established websocket connection to the endpoint and sends speech configuration information.
    async configureConnection() {
        const connection = await this.connectImpl();
        if (this.configConnectionOverride !== undefined) {
            return this.configConnectionOverride(connection);
        }
        this.setSpeechConfigSynthesisSection();
        await this.sendSpeechServiceConfig(connection, this.privSynthesizerConfig.SpeechServiceConfig.serialize());
        return connection;
    }
    onAvatarEvent(_metadata) {
        return;
    }
    onSynthesisStarted(_requestId) {
        return;
    }
    onSynthesizing(_audio) {
        return;
    }
    onSynthesisCancelled(_result) {
        return;
    }
    onSynthesisCompleted(_result) {
        return;
    }
    onWordBoundary(_wordBoundaryEventArgs) {
        return;
    }
    onVisemeReceived(_visemeEventArgs) {
        return;
    }
    onBookmarkReached(_bookmarkEventArgs) {
        return;
    }
}
exports.SynthesisAdapterBase = SynthesisAdapterBase;
SynthesisAdapterBase.telemetryDataEnabled = true;



/***/ }),
/* 248 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvatarSynthesisAdapter = void 0;
const Exports_js_1 = __webpack_require__(85);
const Exports_js_2 = __webpack_require__(2);
class AvatarSynthesisAdapter extends Exports_js_2.SynthesisAdapterBase {
    constructor(authentication, connectionFactory, synthesizerConfig, avatarSynthesizer, avatarConfig) {
        super(authentication, connectionFactory, synthesizerConfig, undefined);
        this.privAvatarSynthesizer = avatarSynthesizer;
        this.privSynthesizer = avatarSynthesizer;
        this.privAvatarConfig = avatarConfig;
    }
    setSynthesisContextSynthesisSection() {
        this.privSynthesisContext.setSynthesisSection(undefined);
    }
    setSpeechConfigSynthesisSection() {
        const talkingAvatarConfig = {
            background: {
                color: this.privAvatarConfig.backgroundColor,
                image: {
                    url: this.privAvatarConfig.backgroundImage?.toString(),
                }
            },
            character: this.privAvatarConfig.character,
            customized: this.privAvatarConfig.customized,
            photoAvatarBaseModel: this.privAvatarConfig.photoAvatarBaseModel,
            style: this.privAvatarConfig.style,
            useBuiltInVoice: this.privAvatarConfig.useBuiltInVoice,
        };
        // Add scene configuration if provided
        if (this.privAvatarConfig.scene) {
            talkingAvatarConfig.scene = {
                amplitude: this.privAvatarConfig.scene.amplitude,
                positionX: this.privAvatarConfig.scene.positionX,
                positionY: this.privAvatarConfig.scene.positionY,
                rotationX: this.privAvatarConfig.scene.rotationX,
                rotationY: this.privAvatarConfig.scene.rotationY,
                rotationZ: this.privAvatarConfig.scene.rotationZ,
                zoom: this.privAvatarConfig.scene.zoom,
            };
        }
        this.privSynthesizerConfig.synthesisVideoSection = {
            format: {
                bitrate: this.privAvatarConfig.videoFormat?.bitrate,
                codec: this.privAvatarConfig.videoFormat?.codec,
                crop: {
                    bottomRight: {
                        x: this.privAvatarConfig.videoFormat?.cropRange?.bottomRight?.x,
                        y: this.privAvatarConfig.videoFormat?.cropRange?.bottomRight?.y,
                    },
                    topLeft: {
                        x: this.privAvatarConfig.videoFormat?.cropRange?.topLeft?.x,
                        y: this.privAvatarConfig.videoFormat?.cropRange?.topLeft?.y,
                    },
                },
                resolution: {
                    height: this.privAvatarConfig.videoFormat?.height,
                    width: this.privAvatarConfig.videoFormat?.width,
                },
            },
            protocol: {
                name: "WebRTC",
                webrtcConfig: {
                    clientDescription: btoa(this.privSynthesizerConfig.parameters.getProperty(Exports_js_1.PropertyId.TalkingAvatarService_WebRTC_SDP)),
                    iceServers: this.privAvatarConfig.remoteIceServers ?? this.privAvatarSynthesizer.iceServers,
                },
            },
            talkingAvatar: talkingAvatarConfig,
        };
    }
    onAvatarEvent(metadata) {
        if (!!this.privAvatarSynthesizer.avatarEventReceived) {
            const avatarEventArgs = new Exports_js_1.AvatarEventArgs(metadata.Data.Offset, metadata.Data.Name);
            try {
                this.privAvatarSynthesizer.avatarEventReceived(this.privAvatarSynthesizer, avatarEventArgs);
            }
            catch (error) {
                // Not going to let errors in the event handler
                // trip things up.
            }
        }
    }
}
exports.AvatarSynthesisAdapter = AvatarSynthesisAdapter;



/***/ }),
/* 249 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpeechSynthesisAdapter = void 0;
const Exports_js_1 = __webpack_require__(85);
const Exports_js_2 = __webpack_require__(2);
class SpeechSynthesisAdapter extends Exports_js_2.SynthesisAdapterBase {
    constructor(authentication, connectionFactory, synthesizerConfig, speechSynthesizer, audioDestination) {
        super(authentication, connectionFactory, synthesizerConfig, audioDestination);
        this.privSpeechSynthesizer = speechSynthesizer;
        this.privSynthesizer = speechSynthesizer;
    }
    setSynthesisContextSynthesisSection() {
        this.privSynthesisContext.setSynthesisSection(this.privSpeechSynthesizer);
    }
    onSynthesisStarted(requestId) {
        const synthesisStartEventArgs = new Exports_js_1.SpeechSynthesisEventArgs(new Exports_js_1.SpeechSynthesisResult(requestId, Exports_js_1.ResultReason.SynthesizingAudioStarted));
        if (!!this.privSpeechSynthesizer.synthesisStarted) {
            this.privSpeechSynthesizer.synthesisStarted(this.privSpeechSynthesizer, synthesisStartEventArgs);
        }
    }
    onSynthesizing(audio) {
        if (!!this.privSpeechSynthesizer.synthesizing) {
            try {
                const audioWithHeader = this.privSynthesisTurn.audioOutputFormat.addHeader(audio);
                const ev = new Exports_js_1.SpeechSynthesisEventArgs(new Exports_js_1.SpeechSynthesisResult(this.privSynthesisTurn.requestId, Exports_js_1.ResultReason.SynthesizingAudio, audioWithHeader));
                this.privSpeechSynthesizer.synthesizing(this.privSpeechSynthesizer, ev);
            }
            catch (error) {
                // Not going to let errors in the event handler
                // trip things up.
            }
        }
    }
    onSynthesisCancelled(result) {
        if (!!this.privSpeechSynthesizer.SynthesisCanceled) {
            const cancelEvent = new Exports_js_1.SpeechSynthesisEventArgs(result);
            try {
                this.privSpeechSynthesizer.SynthesisCanceled(this.privSpeechSynthesizer, cancelEvent);
                /* eslint-disable no-empty */
            }
            catch { }
        }
    }
    onSynthesisCompleted(result) {
        if (this.privSpeechSynthesizer.synthesisCompleted) {
            try {
                this.privSpeechSynthesizer.synthesisCompleted(this.privSpeechSynthesizer, new Exports_js_1.SpeechSynthesisEventArgs(result));
            }
            catch (e) {
                // Not going to let errors in the event handler
                // trip things up.
            }
        }
    }
    onWordBoundary(wordBoundaryEventArgs) {
        if (!!this.privSpeechSynthesizer.wordBoundary) {
            try {
                this.privSpeechSynthesizer.wordBoundary(this.privSpeechSynthesizer, wordBoundaryEventArgs);
            }
            catch (error) {
                // Not going to let errors in the event handler
                // trip things up.
            }
        }
    }
    onVisemeReceived(visemeEventArgs) {
        if (!!this.privSpeechSynthesizer.visemeReceived) {
            try {
                this.privSpeechSynthesizer.visemeReceived(this.privSpeechSynthesizer, visemeEventArgs);
            }
            catch (error) {
                // Not going to let errors in the event handler
                // trip things up.
            }
        }
    }
    onBookmarkReached(bookmarkEventArgs) {
        if (!!this.privSpeechSynthesizer.bookmarkReached) {
            try {
                this.privSpeechSynthesizer.bookmarkReached(this.privSpeechSynthesizer, bookmarkEventArgs);
            }
            catch (error) {
                // Not going to let errors in the event handler
                // trip things up.
            }
        }
    }
}
exports.SpeechSynthesisAdapter = SpeechSynthesisAdapter;



/***/ }),
/* 250 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SynthesisRestAdapter = void 0;
const Exports_js_1 = __webpack_require__(66);
const Exports_js_2 = __webpack_require__(85);
const ConnectionFactoryBase_js_1 = __webpack_require__(135);
const HeaderNames_js_1 = __webpack_require__(59);
/**
 * Implements methods for speech synthesis classes, sending requests to endpoint
 * and parsing response into expected format
 * @class SynthesisRestAdapter
 */
class SynthesisRestAdapter {
    constructor(config, authentication) {
        let endpoint = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Endpoint, undefined);
        this.privIsCustomEndpoint = !!endpoint;
        if (!endpoint) {
            const region = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Region, "westus");
            const hostSuffix = ConnectionFactoryBase_js_1.ConnectionFactoryBase.getHostSuffix(region);
            endpoint = config.parameters.getProperty(Exports_js_2.PropertyId.SpeechServiceConnection_Host, `https://${region}.tts.speech${hostSuffix}`);
        }
        this.privEndpoint = endpoint;
        const options = Exports_js_1.RestConfigBase.requestOptions;
        this.privRestAdapter = new Exports_js_1.RestMessageAdapter(options);
        this.privAuthentication = authentication;
    }
    /**
     * Sends list voices request to endpoint.
     * @function
     * @public
     * @param connectionId - guid for connectionId
     * @returns {Promise<IRestResponse>} rest response to status request
     */
    async getVoicesList(connectionId) {
        const uri = await this.getVoicesListUri();
        this.privRestAdapter.setHeaders(HeaderNames_js_1.HeaderNames.ConnectionId, connectionId);
        const authInfo = await this.privAuthentication.fetch(connectionId);
        this.privRestAdapter.setHeaders(authInfo.headerName, authInfo.token);
        return this.privRestAdapter.request(Exports_js_1.RestRequestType.Get, uri);
    }
    /**
     * Builds (and caches) the voices/list URI. When the caller supplied a custom endpoint with no path
     * (e.g. a custom-domain or private-link host via fromEndpoint), the host may not serve the voices/list
     * route directly and AAD token auth requires the regional host with the ocp-apim-custom-domain-name
     * query parameter. In that case we resolve the service redirect (which is exposed on the synthesis
     * route) to discover the regional host and custom-domain parameter, then retarget it to the
     * voices/list path, keeping the http(s) scheme for this REST call.
     */
    async getVoicesListUri() {
        if (this.privUri !== undefined) {
            return this.privUri;
        }
        const voicesPath = "/cognitiveservices/voices/list";
        const endpointUrl = new URL(this.privEndpoint);
        const pathName = endpointUrl.pathname;
        const hasNoPath = pathName === "" || pathName === "/";
        if (this.privIsCustomEndpoint && hasNoPath) {
            // The redirect handler is exposed on the synthesis route. Resolving it returns the regional
            // host together with the Ocp-Apim-Custom-Domain-Name parameter (or, when no redirect applies,
            // falls back to the original host). We then point the resolved URL at the voices/list path.
            endpointUrl.pathname = "/tts/cognitiveservices/websocket/v1";
            const resolved = await ConnectionFactoryBase_js_1.ConnectionFactoryBase.getRedirectUrlFromEndpoint(endpointUrl.toString(), false);
            const resolvedUrl = new URL(resolved);
            resolvedUrl.pathname = voicesPath;
            resolvedUrl.searchParams.delete("GenerateRedirectResponse");
            this.privUri = resolvedUrl.toString();
        }
        else if (hasNoPath) {
            endpointUrl.pathname = voicesPath;
            this.privUri = endpointUrl.toString();
        }
        else {
            // The endpoint already carries a path; preserve the legacy behavior of appending the voices route.
            this.privUri = `${this.privEndpoint}${voicesPath}`;
        }
        return this.privUri;
    }
}
exports.SynthesisRestAdapter = SynthesisRestAdapter;



/***/ }),
/* 251 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SynthesizerConfig = exports.SynthesisServiceType = void 0;
const Exports_js_1 = __webpack_require__(2);
var SynthesisServiceType;
(function (SynthesisServiceType) {
    SynthesisServiceType[SynthesisServiceType["Standard"] = 0] = "Standard";
    SynthesisServiceType[SynthesisServiceType["Custom"] = 1] = "Custom";
})(SynthesisServiceType = exports.SynthesisServiceType || (exports.SynthesisServiceType = {}));
class SynthesizerConfig {
    constructor(speechServiceConfig, parameters) {
        this.privSynthesisServiceType = SynthesisServiceType.Standard;
        this.avatarEnabled = false;
        this.privSpeechServiceConfig = speechServiceConfig ? speechServiceConfig : new Exports_js_1.SpeechServiceConfig(new Exports_js_1.Context(null));
        this.privParameters = parameters;
    }
    get parameters() {
        return this.privParameters;
    }
    get synthesisServiceType() {
        return this.privSynthesisServiceType;
    }
    set synthesisServiceType(value) {
        this.privSynthesisServiceType = value;
    }
    set synthesisVideoSection(value) {
        this.privSpeechServiceConfig.Context.synthesis = {
            video: value
        };
    }
    get SpeechServiceConfig() {
        return this.privSpeechServiceConfig;
    }
    setContextFromJson(contextJson) {
        const context = JSON.parse(contextJson);
        if (context.system) {
            this.privSpeechServiceConfig.Context.system = context.system;
        }
        if (context.os) {
            this.privSpeechServiceConfig.Context.os = context.os;
        }
        if (context.audio) {
            this.privSpeechServiceConfig.Context.audio = context.audio;
        }
        if (context.synthesis) {
            this.privSpeechServiceConfig.Context.synthesis = context.synthesis;
        }
    }
}
exports.SynthesizerConfig = SynthesizerConfig;



/***/ }),
/* 252 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SynthesisContext = void 0;
const Exports_js_1 = __webpack_require__(85);
/**
 * Represents the JSON used in the synthesis.context message sent to the speech service.
 * The dynamic grammar is always refreshed from the encapsulated dynamic grammar object.
 */
class SynthesisContext {
    constructor() {
        this.privContext = {};
    }
    /**
     * Adds a section to the synthesis.context object.
     * @param sectionName Name of the section to add.
     * @param value JSON serializable object that represents the value.
     */
    setSection(sectionName, value) {
        this.privContext[sectionName] = value;
    }
    /**
     * Sets the audio output format for synthesis context generation.
     * @param format {AudioOutputFormatImpl} the output format
     */
    set audioOutputFormat(format) {
        this.privAudioOutputFormat = format;
    }
    toJSON() {
        return JSON.stringify(this.privContext);
    }
    /**
     * Gets a previously set section by name.
     * @param sectionName Name of the section to retrieve.
     */
    getSection(sectionName) {
        return this.privContext[sectionName];
    }
    setSynthesisSection(speechSynthesizer) {
        const synthesisSection = this.buildSynthesisContext(speechSynthesizer);
        this.setSection("synthesis", synthesisSection);
    }
    buildSynthesisContext(speechSynthesizer) {
        return {
            audio: {
                metadataOptions: {
                    bookmarkEnabled: (!!speechSynthesizer?.bookmarkReached),
                    punctuationBoundaryEnabled: speechSynthesizer?.properties.getProperty(Exports_js_1.PropertyId.SpeechServiceResponse_RequestPunctuationBoundary, (!!speechSynthesizer?.wordBoundary)),
                    sentenceBoundaryEnabled: speechSynthesizer?.properties.getProperty(Exports_js_1.PropertyId.SpeechServiceResponse_RequestSentenceBoundary, false),
                    sessionEndEnabled: true,
                    visemeEnabled: (!!speechSynthesizer?.visemeReceived),
                    wordBoundaryEnabled: speechSynthesizer?.properties.getProperty(Exports_js_1.PropertyId.SpeechServiceResponse_RequestWordBoundary, (!!speechSynthesizer?.wordBoundary)),
                },
                outputFormat: this.privAudioOutputFormat.requestAudioFormatString,
            },
            language: {
                autoDetection: speechSynthesizer?.autoDetectSourceLanguage
            }
        };
    }
}
exports.SynthesisContext = SynthesisContext;



/***/ }),
/* 253 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.type = exports.connectivity = exports.Device = exports.OS = exports.System = exports.Context = exports.SpeechServiceConfig = void 0;
/* eslint-disable max-classes-per-file */
// The config is serialized and sent as the Speech.Config
class SpeechServiceConfig {
    constructor(context) {
        this.context = context;
    }
    serialize() {
        return JSON.stringify(this, (key, value) => {
            if (value && typeof value === "object" && !Array.isArray(value)) {
                const replacement = {};
                for (const k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        // SeparateChannelProcessing must keep its PascalCase form to match the
                        // server-side (case-sensitive) multichannel/continuation contract.
                        const outKey = k === "SeparateChannelProcessing" ? k : (k && k.charAt(0).toLowerCase() + k.substring(1));
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        replacement[outKey] = value[k];
                    }
                }
                return replacement;
            }
            return value;
        });
    }
    get Context() {
        return this.context;
    }
    get Recognition() {
        return this.recognition;
    }
    set Recognition(value) {
        this.recognition = value.toLowerCase();
    }
}
exports.SpeechServiceConfig = SpeechServiceConfig;
class Context {
    constructor(os) {
        this.system = new System();
        this.os = os;
    }
}
exports.Context = Context;
class System {
    constructor() {
        // Note: below will be patched for official builds.
        const SPEECHSDK_CLIENTSDK_VERSION = "1.51.0";
        this.name = "SpeechSDK";
        this.version = SPEECHSDK_CLIENTSDK_VERSION;
        this.build = "JavaScript";
        this.lang = "JavaScript";
    }
}
exports.System = System;
class OS {
    constructor(platform, name, version) {
        this.platform = platform;
        this.name = name;
        this.version = version;
    }
}
exports.OS = OS;
class Device {
    constructor(manufacturer, model, version) {
        this.manufacturer = manufacturer;
        this.model = model;
        this.version = version;
    }
}
exports.Device = Device;
var connectivity;
(function (connectivity) {
    connectivity["Bluetooth"] = "Bluetooth";
    connectivity["Wired"] = "Wired";
    connectivity["WiFi"] = "WiFi";
    connectivity["Cellular"] = "Cellular";
    connectivity["InBuilt"] = "InBuilt";
    connectivity["Unknown"] = "Unknown";
})(connectivity = exports.connectivity || (exports.connectivity = {}));
var type;
(function (type) {
    type["Phone"] = "Phone";
    type["Speaker"] = "Speaker";
    type["Car"] = "Car";
    type["Headset"] = "Headset";
    type["Thermostat"] = "Thermostat";
    type["Microphones"] = "Microphones";
    type["Deskphone"] = "Deskphone";
    type["RemoteControl"] = "RemoteControl";
    type["Unknown"] = "Unknown";
    type["File"] = "File";
    type["Stream"] = "Stream";
})(type = exports.type || (exports.type = {}));



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _distrib_lib_microsoft_cognitiveservices_speech_sdk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _distrib_lib_microsoft_cognitiveservices_speech_sdk_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_distrib_lib_microsoft_cognitiveservices_speech_sdk_js__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.


window.SpeechSDK = _distrib_lib_microsoft_cognitiveservices_speech_sdk_js__WEBPACK_IMPORTED_MODULE_0__;

})();

/******/ })()
;
//# sourceMappingURL=microsoft.cognitiveservices.speech.sdk.bundle.js.map