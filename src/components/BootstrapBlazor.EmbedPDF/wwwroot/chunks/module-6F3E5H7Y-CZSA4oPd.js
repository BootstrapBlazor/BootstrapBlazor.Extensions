var v = { JS_EVAL_TYPE_GLOBAL: 0, JS_EVAL_TYPE_MODULE: 1, JS_EVAL_FLAG_STRICT: 8, JS_EVAL_FLAG_STRIP: 16, JS_EVAL_FLAG_COMPILE_ONLY: 32, JS_EVAL_FLAG_BACKTRACE_BARRIER: 64 }, C = { BaseObjects: 1, Date: 2, Eval: 4, StringNormalize: 8, RegExp: 16, RegExpCompiler: 32, JSON: 64, Proxy: 128, MapSet: 256, TypedArrays: 512, Promise: 1024, BigInt: 2048, BigFloat: 4096, BigDecimal: 8192, OperatorOverloading: 16384, BignumExt: 32768 }, P = { Pending: 0, Fulfilled: 1, Rejected: 2 }, y = { JS_GPN_STRING_MASK: 1, JS_GPN_SYMBOL_MASK: 2, JS_GPN_PRIVATE_MASK: 4, JS_GPN_ENUM_ONLY: 16, QTS_GPN_NUMBER_MASK: 64, QTS_STANDARD_COMPLIANT_NUMBER: 128 }, g = { IsStrictlyEqual: 0, IsSameValue: 1, IsSameValueZero: 2 }, z = Object.defineProperty, K = (e, t) => {
  for (var r in t) z(e, r, { get: t[r], enumerable: !0 });
};
function _(...e) {
}
var q = {};
K(q, { QuickJSAsyncifyError: () => O, QuickJSAsyncifySuspended: () => F, QuickJSEmptyGetOwnPropertyNames: () => j, QuickJSEmscriptenModuleError: () => W, QuickJSMemoryLeakDetected: () => Y, QuickJSNotImplemented: () => R, QuickJSPromisePending: () => B, QuickJSUnknownIntrinsic: () => V, QuickJSUnwrapError: () => E, QuickJSUseAfterFree: () => T, QuickJSWrongOwner: () => N });
var E = class extends Error {
  constructor(e, t) {
    let r = typeof e == "object" && e && "message" in e ? String(e.message) : String(e);
    super(r), this.cause = e, this.context = t, this.name = "QuickJSUnwrapError";
  }
}, N = class extends Error {
  constructor() {
    super(...arguments), this.name = "QuickJSWrongOwner";
  }
}, T = class extends Error {
  constructor() {
    super(...arguments), this.name = "QuickJSUseAfterFree";
  }
}, R = class extends Error {
  constructor() {
    super(...arguments), this.name = "QuickJSNotImplemented";
  }
}, O = class extends Error {
  constructor() {
    super(...arguments), this.name = "QuickJSAsyncifyError";
  }
}, F = class extends Error {
  constructor() {
    super(...arguments), this.name = "QuickJSAsyncifySuspended";
  }
}, Y = class extends Error {
  constructor() {
    super(...arguments), this.name = "QuickJSMemoryLeakDetected";
  }
}, W = class extends Error {
  constructor() {
    super(...arguments), this.name = "QuickJSEmscriptenModuleError";
  }
}, V = class extends TypeError {
  constructor() {
    super(...arguments), this.name = "QuickJSUnknownIntrinsic";
  }
}, B = class extends Error {
  constructor() {
    super(...arguments), this.name = "QuickJSPromisePending";
  }
}, j = class extends Error {
  constructor() {
    super(...arguments), this.name = "QuickJSEmptyGetOwnPropertyNames";
  }
};
function* G(e) {
  return yield e;
}
function Z(e) {
  return G(k(e));
}
var Q = G;
Q.of = Z;
function H(e, t) {
  return (...r) => {
    let i = t.call(e, Q, ...r);
    return k(i);
  };
}
function X(e, t) {
  let r = t.call(e, Q);
  return k(r);
}
function k(e) {
  function t(r) {
    return r.done ? r.value : r.value instanceof Promise ? r.value.then((i) => t(e.next(i)), (i) => t(e.throw(i))) : t(e.next(r.value));
  }
  return t(e.next());
}
var m = class {
  [Symbol.dispose]() {
    return this.dispose();
  }
}, M = Symbol.dispose ?? Symbol.for("Symbol.dispose"), L = m.prototype;
L[M] || (L[M] = function() {
  return this.dispose();
});
var h = class U extends m {
  constructor(t, r, i, s) {
    super(), this._value = t, this.copier = r, this.disposer = i, this._owner = s, this._alive = !0, this._constructorStack = void 0;
  }
  get alive() {
    return this._alive;
  }
  get value() {
    return this.assertAlive(), this._value;
  }
  get owner() {
    return this._owner;
  }
  get dupable() {
    return !!this.copier;
  }
  dup() {
    if (this.assertAlive(), !this.copier) throw new Error("Non-dupable lifetime");
    return new U(this.copier(this._value), this.copier, this.disposer, this._owner);
  }
  consume(t) {
    this.assertAlive();
    let r = t(this);
    return this.dispose(), r;
  }
  map(t) {
    return this.assertAlive(), t(this);
  }
  tap(t) {
    return t(this), this;
  }
  dispose() {
    this.assertAlive(), this.disposer && this.disposer(this._value), this._alive = !1;
  }
  assertAlive() {
    if (!this.alive) throw this._constructorStack ? new T(`Lifetime not alive
${this._constructorStack}
Lifetime used`) : new T("Lifetime not alive");
  }
}, f = class extends h {
  constructor(e, t) {
    super(e, void 0, void 0, t);
  }
  get dupable() {
    return !0;
  }
  dup() {
    return this;
  }
  dispose() {
  }
}, I = class extends h {
  constructor(e, t, r, i) {
    super(e, t, r, i);
  }
  dispose() {
    this._alive = !1;
  }
};
function A(e, t) {
  let r;
  try {
    e.dispose();
  } catch (i) {
    r = i;
  }
  if (t && r) throw Object.assign(t, { message: `${t.message}
 Then, failed to dispose scope: ${r.message}`, disposeError: r }), t;
  if (t || r) throw t || r;
}
var c = class b extends m {
  constructor() {
    super(...arguments), this._disposables = new h(/* @__PURE__ */ new Set()), this.manage = (t) => (this._disposables.value.add(t), t);
  }
  static withScope(t) {
    let r = new b(), i;
    try {
      return t(r);
    } catch (s) {
      throw i = s, s;
    } finally {
      A(r, i);
    }
  }
  static withScopeMaybeAsync(t, r) {
    return X(void 0, function* (i) {
      let s = new b(), n;
      try {
        return yield* i.of(r.call(t, i, s));
      } catch (a) {
        throw n = a, a;
      } finally {
        A(s, n);
      }
    });
  }
  static async withScopeAsync(t) {
    let r = new b(), i;
    try {
      return await t(r);
    } catch (s) {
      throw i = s, s;
    } finally {
      A(r, i);
    }
  }
  get alive() {
    return this._disposables.alive;
  }
  dispose() {
    let t = Array.from(this._disposables.value.values()).reverse();
    for (let r of t) r.alive && r.dispose();
    this._disposables.dispose();
  }
};
function ee(e) {
  let t = e ? Array.from(e) : [];
  function r() {
    return t.forEach((s) => s.alive ? s.dispose() : void 0);
  }
  function i() {
    return t.some((s) => s.alive);
  }
  return Object.defineProperty(t, M, { configurable: !0, enumerable: !1, value: r }), Object.defineProperty(t, "dispose", { configurable: !0, enumerable: !1, value: r }), Object.defineProperty(t, "alive", { configurable: !0, enumerable: !1, get: i }), t;
}
function x(e) {
  return !!(e && (typeof e == "object" || typeof e == "function") && "alive" in e && typeof e.alive == "boolean" && "dispose" in e && typeof e.dispose == "function");
}
var J = class D extends m {
  static success(t) {
    return new te(t);
  }
  static fail(t, r) {
    return new re(t, r);
  }
  static is(t) {
    return t instanceof D;
  }
}, te = class extends J {
  constructor(e) {
    super(), this.value = e;
  }
  get alive() {
    return x(this.value) ? this.value.alive : !0;
  }
  dispose() {
    x(this.value) && this.value.dispose();
  }
  unwrap() {
    return this.value;
  }
  unwrapOr(e) {
    return this.value;
  }
}, re = class extends J {
  constructor(e, t) {
    super(), this.error = e, this.onUnwrap = t;
  }
  get alive() {
    return x(this.error) ? this.error.alive : !0;
  }
  dispose() {
    x(this.error) && this.error.dispose();
  }
  unwrap() {
    throw this.onUnwrap(this), this.error;
  }
  unwrapOr(e) {
    return e;
  }
}, S = J, ie = class extends m {
  constructor(e) {
    super(), this.resolve = (t) => {
      this.resolveHandle.alive && (this.context.unwrapResult(this.context.callFunction(this.resolveHandle, this.context.undefined, t || this.context.undefined)).dispose(), this.disposeResolvers(), this.onSettled());
    }, this.reject = (t) => {
      this.rejectHandle.alive && (this.context.unwrapResult(this.context.callFunction(this.rejectHandle, this.context.undefined, t || this.context.undefined)).dispose(), this.disposeResolvers(), this.onSettled());
    }, this.dispose = () => {
      this.handle.alive && this.handle.dispose(), this.disposeResolvers();
    }, this.context = e.context, this.owner = e.context.runtime, this.handle = e.promiseHandle, this.settled = new Promise((t) => {
      this.onSettled = t;
    }), this.resolveHandle = e.resolveHandle, this.rejectHandle = e.rejectHandle;
  }
  get alive() {
    return this.handle.alive || this.resolveHandle.alive || this.rejectHandle.alive;
  }
  disposeResolvers() {
    this.resolveHandle.alive && this.resolveHandle.dispose(), this.rejectHandle.alive && this.rejectHandle.dispose();
  }
}, $ = class {
  constructor(e) {
    this.module = e;
  }
  toPointerArray(e) {
    let t = new Int32Array(e.map((s) => s.value)), r = t.length * t.BYTES_PER_ELEMENT, i = this.module._malloc(r);
    return new Uint8Array(this.module.HEAPU8.buffer, i, r).set(new Uint8Array(t.buffer)), new h(i, void 0, (s) => this.module._free(s));
  }
  newTypedArray(e, t) {
    let r = new e(new Array(t).fill(0)), i = r.length * r.BYTES_PER_ELEMENT, s = this.module._malloc(i), n = new e(this.module.HEAPU8.buffer, s, t);
    return n.set(r), new h({ typedArray: n, ptr: s }, void 0, (a) => this.module._free(a.ptr));
  }
  newMutablePointerArray(e) {
    return this.newTypedArray(Int32Array, e);
  }
  newHeapCharPointer(e) {
    let t = this.module.lengthBytesUTF8(e), r = t + 1, i = this.module._malloc(r);
    return this.module.stringToUTF8(e, i, r), new h({ ptr: i, strlen: t }, void 0, (s) => this.module._free(s.ptr));
  }
  newHeapBufferPointer(e) {
    let t = e.byteLength, r = this.module._malloc(t);
    return this.module.HEAPU8.set(e, r), new h({ pointer: r, numBytes: t }, void 0, (i) => this.module._free(i.pointer));
  }
  consumeHeapCharPointer(e) {
    let t = this.module.UTF8ToString(e);
    return this.module._free(e), t;
  }
};
function se(e) {
  if (!e) return 0;
  let t = 0;
  for (let [r, i] of Object.entries(e)) {
    if (!(r in C)) throw new V(r);
    i && (t |= C[r]);
  }
  return t;
}
function ne(e) {
  if (typeof e == "number") return e;
  if (e === void 0) return 0;
  let { type: t, strict: r, strip: i, compileOnly: s, backtraceBarrier: n } = e, a = 0;
  return t === "global" && (a |= v.JS_EVAL_TYPE_GLOBAL), t === "module" && (a |= v.JS_EVAL_TYPE_MODULE), r && (a |= v.JS_EVAL_FLAG_STRICT), i && (a |= v.JS_EVAL_FLAG_STRIP), s && (a |= v.JS_EVAL_FLAG_COMPILE_ONLY), n && (a |= v.JS_EVAL_FLAG_BACKTRACE_BARRIER), a;
}
function oe(e) {
  if (typeof e == "number") return e;
  if (e === void 0) return 0;
  let { strings: t, symbols: r, quickjsPrivate: i, onlyEnumerable: s, numbers: n, numbersAsStrings: a } = e, o = 0;
  return t && (o |= y.JS_GPN_STRING_MASK), r && (o |= y.JS_GPN_SYMBOL_MASK), i && (o |= y.JS_GPN_PRIVATE_MASK), s && (o |= y.JS_GPN_ENUM_ONLY), n && (o |= y.QTS_GPN_NUMBER_MASK), a && (o |= y.QTS_STANDARD_COMPLIANT_NUMBER), o;
}
function ae(...e) {
  let t = [];
  for (let r of e) r !== void 0 && (t = t.concat(r));
  return t;
}
var ue = class extends m {
  constructor(e, t) {
    super(), this.handle = e, this.context = t, this._isDone = !1, this.owner = t.runtime;
  }
  [Symbol.iterator]() {
    return this;
  }
  next(e) {
    if (!this.alive || this._isDone) return { done: !0, value: void 0 };
    let t = this._next ?? (this._next = this.context.getProp(this.handle, "next"));
    return this.callIteratorMethod(t, e);
  }
  return(e) {
    if (!this.alive) return { done: !0, value: void 0 };
    let t = this.context.getProp(this.handle, "return");
    if (t === this.context.undefined && e === void 0) return this.dispose(), { done: !0, value: void 0 };
    let r = this.callIteratorMethod(t, e);
    return t.dispose(), this.dispose(), r;
  }
  throw(e) {
    if (!this.alive) return { done: !0, value: void 0 };
    let t = e instanceof h ? e : this.context.newError(e), r = this.context.getProp(this.handle, "throw"), i = this.callIteratorMethod(r, e);
    return t.alive && t.dispose(), r.dispose(), this.dispose(), i;
  }
  get alive() {
    return this.handle.alive;
  }
  dispose() {
    this._isDone = !0, this.handle.dispose(), this._next?.dispose();
  }
  callIteratorMethod(e, t) {
    let r = t ? this.context.callFunction(e, this.handle, t) : this.context.callFunction(e, this.handle);
    if (r.error) return this.dispose(), { value: r };
    let i = this.context.getProp(r.value, "done").consume((n) => this.context.dump(n));
    if (i) return r.value.dispose(), this.dispose(), { done: i, value: void 0 };
    let s = this.context.getProp(r.value, "value");
    return r.value.dispose(), { value: S.success(s), done: i };
  }
}, le = class extends $ {
  constructor(e) {
    super(e.module), this.scope = new c(), this.copyJSValue = (t) => this.ffi.QTS_DupValuePointer(this.ctx.value, t), this.freeJSValue = (t) => {
      this.ffi.QTS_FreeValuePointer(this.ctx.value, t);
    }, e.ownedLifetimes?.forEach((t) => this.scope.manage(t)), this.owner = e.owner, this.module = e.module, this.ffi = e.ffi, this.rt = e.rt, this.ctx = this.scope.manage(e.ctx);
  }
  get alive() {
    return this.scope.alive;
  }
  dispose() {
    return this.scope.dispose();
  }
  [Symbol.dispose]() {
    return this.dispose();
  }
  manage(e) {
    return this.scope.manage(e);
  }
  consumeJSCharPointer(e) {
    let t = this.module.UTF8ToString(e);
    return this.ffi.QTS_FreeCString(this.ctx.value, e), t;
  }
  heapValueHandle(e) {
    return new h(e, this.copyJSValue, this.freeJSValue, this.owner);
  }
  staticHeapValueHandle(e) {
    return this.manage(this.heapValueHandle(e)), new f(e, this.owner);
  }
}, he = class extends m {
  constructor(e) {
    super(), this._undefined = void 0, this._null = void 0, this._false = void 0, this._true = void 0, this._global = void 0, this._BigInt = void 0, this._Symbol = void 0, this._SymbolIterator = void 0, this._SymbolAsyncIterator = void 0, this.fnNextId = -32768, this.fnMaps = /* @__PURE__ */ new Map(), this.cToHostCallbacks = { callFunction: (t, r, i, s, n) => {
      if (t !== this.ctx.value) throw new Error("QuickJSContext instance received C -> JS call with mismatched ctx");
      let a = this.getFunction(n);
      if (!a) throw new Error(`QuickJSContext had no callback with id ${n}`);
      return c.withScopeMaybeAsync(this, function* (o, u) {
        let d = u.manage(new I(r, this.memory.copyJSValue, this.memory.freeJSValue, this.runtime)), p = new Array(i);
        for (let l = 0; l < i; l++) {
          let w = this.ffi.QTS_ArgvGetJSValueConstPointer(s, l);
          p[l] = u.manage(new I(w, this.memory.copyJSValue, this.memory.freeJSValue, this.runtime));
        }
        try {
          let l = yield* o(a.apply(d, p));
          if (l) {
            if ("error" in l && l.error) throw this.runtime.debugLog("throw error", l.error), l.error;
            let w = u.manage(l instanceof h ? l : l.value);
            return this.ffi.QTS_DupValuePointer(this.ctx.value, w.value);
          }
          return 0;
        } catch (l) {
          return this.errorToHandle(l).consume((w) => this.ffi.QTS_Throw(this.ctx.value, w.value));
        }
      });
    } }, this.runtime = e.runtime, this.module = e.module, this.ffi = e.ffi, this.rt = e.rt, this.ctx = e.ctx, this.memory = new le({ ...e, owner: this.runtime }), e.callbacks.setContextCallbacks(this.ctx.value, this.cToHostCallbacks), this.dump = this.dump.bind(this), this.getString = this.getString.bind(this), this.getNumber = this.getNumber.bind(this), this.resolvePromise = this.resolvePromise.bind(this), this.uint32Out = this.memory.manage(this.memory.newTypedArray(Uint32Array, 1));
  }
  get alive() {
    return this.memory.alive;
  }
  dispose() {
    this.memory.dispose();
  }
  get undefined() {
    if (this._undefined) return this._undefined;
    let e = this.ffi.QTS_GetUndefined();
    return this._undefined = new f(e);
  }
  get null() {
    if (this._null) return this._null;
    let e = this.ffi.QTS_GetNull();
    return this._null = new f(e);
  }
  get true() {
    if (this._true) return this._true;
    let e = this.ffi.QTS_GetTrue();
    return this._true = new f(e);
  }
  get false() {
    if (this._false) return this._false;
    let e = this.ffi.QTS_GetFalse();
    return this._false = new f(e);
  }
  get global() {
    if (this._global) return this._global;
    let e = this.ffi.QTS_GetGlobalObject(this.ctx.value);
    return this._global = this.memory.staticHeapValueHandle(e), this._global;
  }
  newNumber(e) {
    return this.memory.heapValueHandle(this.ffi.QTS_NewFloat64(this.ctx.value, e));
  }
  newString(e) {
    let t = this.memory.newHeapCharPointer(e).consume((r) => this.ffi.QTS_NewString(this.ctx.value, r.value.ptr));
    return this.memory.heapValueHandle(t);
  }
  newUniqueSymbol(e) {
    let t = (typeof e == "symbol" ? e.description : e) ?? "", r = this.memory.newHeapCharPointer(t).consume((i) => this.ffi.QTS_NewSymbol(this.ctx.value, i.value.ptr, 0));
    return this.memory.heapValueHandle(r);
  }
  newSymbolFor(e) {
    let t = (typeof e == "symbol" ? e.description : e) ?? "", r = this.memory.newHeapCharPointer(t).consume((i) => this.ffi.QTS_NewSymbol(this.ctx.value, i.value.ptr, 1));
    return this.memory.heapValueHandle(r);
  }
  getWellKnownSymbol(e) {
    return this._Symbol ?? (this._Symbol = this.memory.manage(this.getProp(this.global, "Symbol"))), this.getProp(this._Symbol, e);
  }
  newBigInt(e) {
    if (!this._BigInt) {
      let i = this.getProp(this.global, "BigInt");
      this.memory.manage(i), this._BigInt = new f(i.value, this.runtime);
    }
    let t = this._BigInt, r = String(e);
    return this.newString(r).consume((i) => this.unwrapResult(this.callFunction(t, this.undefined, i)));
  }
  newObject(e) {
    e && this.runtime.assertOwned(e);
    let t = e ? this.ffi.QTS_NewObjectProto(this.ctx.value, e.value) : this.ffi.QTS_NewObject(this.ctx.value);
    return this.memory.heapValueHandle(t);
  }
  newArray() {
    let e = this.ffi.QTS_NewArray(this.ctx.value);
    return this.memory.heapValueHandle(e);
  }
  newArrayBuffer(e) {
    let t = new Uint8Array(e), r = this.memory.newHeapBufferPointer(t), i = this.ffi.QTS_NewArrayBuffer(this.ctx.value, r.value.pointer, t.length);
    return this.memory.heapValueHandle(i);
  }
  newPromise(e) {
    let t = c.withScope((r) => {
      let i = r.manage(this.memory.newMutablePointerArray(2)), s = this.ffi.QTS_NewPromiseCapability(this.ctx.value, i.value.ptr), n = this.memory.heapValueHandle(s), [a, o] = Array.from(i.value.typedArray).map((u) => this.memory.heapValueHandle(u));
      return new ie({ context: this, promiseHandle: n, resolveHandle: a, rejectHandle: o });
    });
    return e && typeof e == "function" && (e = new Promise(e)), e && Promise.resolve(e).then(t.resolve, (r) => r instanceof h ? t.reject(r) : this.newError(r).consume(t.reject)), t;
  }
  newFunction(e, t) {
    let r = ++this.fnNextId;
    return this.setFunction(r, t), this.memory.heapValueHandle(this.ffi.QTS_NewFunction(this.ctx.value, r, e));
  }
  newError(e) {
    let t = this.memory.heapValueHandle(this.ffi.QTS_NewError(this.ctx.value));
    return e && typeof e == "object" ? (e.name !== void 0 && this.newString(e.name).consume((r) => this.setProp(t, "name", r)), e.message !== void 0 && this.newString(e.message).consume((r) => this.setProp(t, "message", r))) : typeof e == "string" ? this.newString(e).consume((r) => this.setProp(t, "message", r)) : e !== void 0 && this.newString(String(e)).consume((r) => this.setProp(t, "message", r)), t;
  }
  typeof(e) {
    return this.runtime.assertOwned(e), this.memory.consumeHeapCharPointer(this.ffi.QTS_Typeof(this.ctx.value, e.value));
  }
  getNumber(e) {
    return this.runtime.assertOwned(e), this.ffi.QTS_GetFloat64(this.ctx.value, e.value);
  }
  getString(e) {
    return this.runtime.assertOwned(e), this.memory.consumeJSCharPointer(this.ffi.QTS_GetString(this.ctx.value, e.value));
  }
  getSymbol(e) {
    this.runtime.assertOwned(e);
    let t = this.memory.consumeJSCharPointer(this.ffi.QTS_GetSymbolDescriptionOrKey(this.ctx.value, e.value));
    return this.ffi.QTS_IsGlobalSymbol(this.ctx.value, e.value) ? Symbol.for(t) : Symbol(t);
  }
  getBigInt(e) {
    this.runtime.assertOwned(e);
    let t = this.getString(e);
    return BigInt(t);
  }
  getArrayBuffer(e) {
    this.runtime.assertOwned(e);
    let t = this.ffi.QTS_GetArrayBufferLength(this.ctx.value, e.value), r = this.ffi.QTS_GetArrayBuffer(this.ctx.value, e.value);
    if (!r) throw new Error("Couldn't allocate memory to get ArrayBuffer");
    return new h(this.module.HEAPU8.subarray(r, r + t), void 0, () => this.module._free(r));
  }
  getPromiseState(e) {
    this.runtime.assertOwned(e);
    let t = this.ffi.QTS_PromiseState(this.ctx.value, e.value);
    if (t < 0) return { type: "fulfilled", value: e, notAPromise: !0 };
    if (t === P.Pending) return { type: "pending", get error() {
      return new B("Cannot unwrap a pending promise");
    } };
    let r = this.ffi.QTS_PromiseResult(this.ctx.value, e.value), i = this.memory.heapValueHandle(r);
    if (t === P.Fulfilled) return { type: "fulfilled", value: i };
    if (t === P.Rejected) return { type: "rejected", error: i };
    throw i.dispose(), new Error(`Unknown JSPromiseStateEnum: ${t}`);
  }
  resolvePromise(e) {
    this.runtime.assertOwned(e);
    let t = c.withScope((r) => {
      let i = r.manage(this.getProp(this.global, "Promise")), s = r.manage(this.getProp(i, "resolve"));
      return this.callFunction(s, i, e);
    });
    return t.error ? Promise.resolve(t) : new Promise((r) => {
      c.withScope((i) => {
        let s = i.manage(this.newFunction("resolve", (u) => {
          r(this.success(u && u.dup()));
        })), n = i.manage(this.newFunction("reject", (u) => {
          r(this.fail(u && u.dup()));
        })), a = i.manage(t.value), o = i.manage(this.getProp(a, "then"));
        this.callFunction(o, a, s, n).unwrap().dispose();
      });
    });
  }
  isEqual(e, t, r = g.IsStrictlyEqual) {
    if (e === t) return !0;
    this.runtime.assertOwned(e), this.runtime.assertOwned(t);
    let i = this.ffi.QTS_IsEqual(this.ctx.value, e.value, t.value, r);
    if (i === -1) throw new R("WASM variant does not expose equality");
    return !!i;
  }
  eq(e, t) {
    return this.isEqual(e, t, g.IsStrictlyEqual);
  }
  sameValue(e, t) {
    return this.isEqual(e, t, g.IsSameValue);
  }
  sameValueZero(e, t) {
    return this.isEqual(e, t, g.IsSameValueZero);
  }
  getProp(e, t) {
    this.runtime.assertOwned(e);
    let r;
    return typeof t == "number" && t >= 0 ? r = this.ffi.QTS_GetPropNumber(this.ctx.value, e.value, t) : r = this.borrowPropertyKey(t).consume((i) => this.ffi.QTS_GetProp(this.ctx.value, e.value, i.value)), this.memory.heapValueHandle(r);
  }
  getLength(e) {
    if (this.runtime.assertOwned(e), !(this.ffi.QTS_GetLength(this.ctx.value, this.uint32Out.value.ptr, e.value) < 0)) return this.uint32Out.value.typedArray[0];
  }
  getOwnPropertyNames(e, t = { strings: !0, numbersAsStrings: !0 }) {
    this.runtime.assertOwned(e), e.value;
    let r = oe(t);
    if (r === 0) throw new j("No options set, will return an empty array");
    return c.withScope((i) => {
      let s = i.manage(this.memory.newMutablePointerArray(1)), n = this.ffi.QTS_GetOwnPropertyNames(this.ctx.value, s.value.ptr, this.uint32Out.value.ptr, e.value, r);
      if (n) return this.fail(this.memory.heapValueHandle(n));
      let a = this.uint32Out.value.typedArray[0], o = s.value.typedArray[0], u = new Uint32Array(this.module.HEAP8.buffer, o, a), d = Array.from(u).map((p) => this.memory.heapValueHandle(p));
      return this.ffi.QTS_FreeVoidPointer(this.ctx.value, o), this.success(ee(d));
    });
  }
  getIterator(e) {
    let t = this._SymbolIterator ?? (this._SymbolIterator = this.memory.manage(this.getWellKnownSymbol("iterator")));
    return c.withScope((r) => {
      let i = r.manage(this.getProp(e, t)), s = this.callFunction(i, e);
      return s.error ? s : this.success(new ue(s.value, this));
    });
  }
  setProp(e, t, r) {
    this.runtime.assertOwned(e), this.borrowPropertyKey(t).consume((i) => this.ffi.QTS_SetProp(this.ctx.value, e.value, i.value, r.value));
  }
  defineProp(e, t, r) {
    this.runtime.assertOwned(e), c.withScope((i) => {
      let s = i.manage(this.borrowPropertyKey(t)), n = r.value || this.undefined, a = !!r.configurable, o = !!r.enumerable, u = !!r.value, d = r.get ? i.manage(this.newFunction(r.get.name, r.get)) : this.undefined, p = r.set ? i.manage(this.newFunction(r.set.name, r.set)) : this.undefined;
      this.ffi.QTS_DefineProp(this.ctx.value, e.value, s.value, n.value, d.value, p.value, a, o, u);
    });
  }
  callFunction(e, t, ...r) {
    this.runtime.assertOwned(e);
    let i, s = r[0];
    s === void 0 || Array.isArray(s) ? i = s ?? [] : i = r;
    let n = this.memory.toPointerArray(i).consume((o) => this.ffi.QTS_Call(this.ctx.value, e.value, t.value, i.length, o.value)), a = this.ffi.QTS_ResolveException(this.ctx.value, n);
    return a ? (this.ffi.QTS_FreeValuePointer(this.ctx.value, n), this.fail(this.memory.heapValueHandle(a))) : this.success(this.memory.heapValueHandle(n));
  }
  callMethod(e, t, r = []) {
    return this.getProp(e, t).consume((i) => this.callFunction(i, e, r));
  }
  evalCode(e, t = "eval.js", r) {
    let i = r === void 0 ? 1 : 0, s = ne(r), n = this.memory.newHeapCharPointer(e).consume((o) => this.ffi.QTS_Eval(this.ctx.value, o.value.ptr, o.value.strlen, t, i, s)), a = this.ffi.QTS_ResolveException(this.ctx.value, n);
    return a ? (this.ffi.QTS_FreeValuePointer(this.ctx.value, n), this.fail(this.memory.heapValueHandle(a))) : this.success(this.memory.heapValueHandle(n));
  }
  throw(e) {
    return this.errorToHandle(e).consume((t) => this.ffi.QTS_Throw(this.ctx.value, t.value));
  }
  borrowPropertyKey(e) {
    return typeof e == "number" ? this.newNumber(e) : typeof e == "string" ? this.newString(e) : new f(e.value, this.runtime);
  }
  getMemory(e) {
    if (e === this.rt.value) return this.memory;
    throw new Error("Private API. Cannot get memory from a different runtime");
  }
  dump(e) {
    this.runtime.assertOwned(e);
    let t = this.typeof(e);
    if (t === "string") return this.getString(e);
    if (t === "number") return this.getNumber(e);
    if (t === "bigint") return this.getBigInt(e);
    if (t === "undefined") return;
    if (t === "symbol") return this.getSymbol(e);
    let r = this.getPromiseState(e);
    if (r.type === "fulfilled" && !r.notAPromise) return e.dispose(), { type: r.type, value: r.value.consume(this.dump) };
    if (r.type === "pending") return e.dispose(), { type: r.type };
    if (r.type === "rejected") return e.dispose(), { type: r.type, error: r.error.consume(this.dump) };
    let i = this.memory.consumeJSCharPointer(this.ffi.QTS_Dump(this.ctx.value, e.value));
    try {
      return JSON.parse(i);
    } catch {
      return i;
    }
  }
  unwrapResult(e) {
    if (e.error) {
      let t = "context" in e.error ? e.error.context : this, r = e.error.consume((i) => this.dump(i));
      if (r && typeof r == "object" && typeof r.message == "string") {
        let { message: i, name: s, stack: n, ...a } = r, o = new E(r, t);
        typeof s == "string" && (o.name = r.name), o.message = i;
        let u = o.stack;
        throw typeof n == "string" && (o.stack = `${s}: ${i}
${r.stack}Host: ${u}`), Object.assign(o, a), o;
      }
      throw new E(r);
    }
    return e.value;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.alive ? `${this.constructor.name} { ctx: ${this.ctx.value} rt: ${this.rt.value} }` : `${this.constructor.name} { disposed }`;
  }
  getFunction(e) {
    let t = e >> 8, r = this.fnMaps.get(t);
    if (r) return r.get(e);
  }
  setFunction(e, t) {
    let r = e >> 8, i = this.fnMaps.get(r);
    return i || (i = /* @__PURE__ */ new Map(), this.fnMaps.set(r, i)), i.set(e, t);
  }
  errorToHandle(e) {
    return e instanceof h ? e : this.newError(e);
  }
  encodeBinaryJSON(e) {
    let t = this.ffi.QTS_bjson_encode(this.ctx.value, e.value);
    return this.memory.heapValueHandle(t);
  }
  decodeBinaryJSON(e) {
    let t = this.ffi.QTS_bjson_decode(this.ctx.value, e.value);
    return this.memory.heapValueHandle(t);
  }
  success(e) {
    return S.success(e);
  }
  fail(e) {
    return S.fail(e, (t) => this.unwrapResult(t));
  }
}, ce = class extends m {
  constructor(e) {
    super(), this.scope = new c(), this.contextMap = /* @__PURE__ */ new Map(), this._debugMode = !1, this.cToHostCallbacks = { shouldInterrupt: (t) => {
      if (t !== this.rt.value) throw new Error("QuickJSContext instance received C -> JS interrupt with mismatched rt");
      let r = this.interruptHandler;
      if (!r) throw new Error("QuickJSContext had no interrupt handler");
      return r(this) ? 1 : 0;
    }, loadModuleSource: H(this, function* (t, r, i, s) {
      let n = this.moduleLoader;
      if (!n) throw new Error("Runtime has no module loader");
      if (r !== this.rt.value) throw new Error("Runtime pointer mismatch");
      let a = this.contextMap.get(i) ?? this.newContext({ contextPointer: i });
      try {
        let o = yield* t(n(s, a));
        if (typeof o == "object" && "error" in o && o.error) throw this.debugLog("cToHostLoadModule: loader returned error", o.error), o.error;
        let u = typeof o == "string" ? o : "value" in o ? o.value : o;
        return this.memory.newHeapCharPointer(u).value.ptr;
      } catch (o) {
        return this.debugLog("cToHostLoadModule: caught error", o), a.throw(o), 0;
      }
    }), normalizeModule: H(this, function* (t, r, i, s, n) {
      let a = this.moduleNormalizer;
      if (!a) throw new Error("Runtime has no module normalizer");
      if (r !== this.rt.value) throw new Error("Runtime pointer mismatch");
      let o = this.contextMap.get(i) ?? this.newContext({ contextPointer: i });
      try {
        let u = yield* t(a(s, n, o));
        if (typeof u == "object" && "error" in u && u.error) throw this.debugLog("cToHostNormalizeModule: normalizer returned error", u.error), u.error;
        let d = typeof u == "string" ? u : u.value;
        return o.getMemory(this.rt.value).newHeapCharPointer(d).value.ptr;
      } catch (u) {
        return this.debugLog("normalizeModule: caught error", u), o.throw(u), 0;
      }
    }) }, e.ownedLifetimes?.forEach((t) => this.scope.manage(t)), this.module = e.module, this.memory = new $(this.module), this.ffi = e.ffi, this.rt = e.rt, this.callbacks = e.callbacks, this.scope.manage(this.rt), this.callbacks.setRuntimeCallbacks(this.rt.value, this.cToHostCallbacks), this.executePendingJobs = this.executePendingJobs.bind(this);
  }
  get alive() {
    return this.scope.alive;
  }
  dispose() {
    return this.scope.dispose();
  }
  newContext(e = {}) {
    let t = se(e.intrinsics), r = new h(e.contextPointer || this.ffi.QTS_NewContext(this.rt.value, t), void 0, (s) => {
      this.contextMap.delete(s), this.callbacks.deleteContext(s), this.ffi.QTS_FreeContext(s);
    }), i = new he({ module: this.module, ctx: r, ffi: this.ffi, rt: this.rt, ownedLifetimes: e.ownedLifetimes, runtime: this, callbacks: this.callbacks });
    return this.contextMap.set(r.value, i), i;
  }
  setModuleLoader(e, t) {
    this.moduleLoader = e, this.moduleNormalizer = t, this.ffi.QTS_RuntimeEnableModuleLoader(this.rt.value, this.moduleNormalizer ? 1 : 0);
  }
  removeModuleLoader() {
    this.moduleLoader = void 0, this.ffi.QTS_RuntimeDisableModuleLoader(this.rt.value);
  }
  hasPendingJob() {
    return !!this.ffi.QTS_IsJobPending(this.rt.value);
  }
  setInterruptHandler(e) {
    let t = this.interruptHandler;
    this.interruptHandler = e, t || this.ffi.QTS_RuntimeEnableInterruptHandler(this.rt.value);
  }
  removeInterruptHandler() {
    this.interruptHandler && (this.ffi.QTS_RuntimeDisableInterruptHandler(this.rt.value), this.interruptHandler = void 0);
  }
  executePendingJobs(e = -1) {
    let t = this.memory.newMutablePointerArray(1), r = this.ffi.QTS_ExecutePendingJob(this.rt.value, e ?? -1, t.value.ptr), i = t.value.typedArray[0];
    if (t.dispose(), i === 0) return this.ffi.QTS_FreeValuePointerRuntime(this.rt.value, r), S.success(0);
    let s = this.contextMap.get(i) ?? this.newContext({ contextPointer: i }), n = s.getMemory(this.rt.value).heapValueHandle(r);
    if (s.typeof(n) === "number") {
      let a = s.getNumber(n);
      return n.dispose(), S.success(a);
    } else {
      let a = Object.assign(n, { context: s });
      return S.fail(a, (o) => s.unwrapResult(o));
    }
  }
  setMemoryLimit(e) {
    if (e < 0 && e !== -1) throw new Error("Cannot set memory limit to negative number. To unset, pass -1");
    this.ffi.QTS_RuntimeSetMemoryLimit(this.rt.value, e);
  }
  computeMemoryUsage() {
    let e = this.getSystemContext().getMemory(this.rt.value);
    return e.heapValueHandle(this.ffi.QTS_RuntimeComputeMemoryUsage(this.rt.value, e.ctx.value));
  }
  dumpMemoryUsage() {
    return this.memory.consumeHeapCharPointer(this.ffi.QTS_RuntimeDumpMemoryUsage(this.rt.value));
  }
  setMaxStackSize(e) {
    if (e < 0) throw new Error("Cannot set memory limit to negative number. To unset, pass 0.");
    this.ffi.QTS_RuntimeSetMaxStackSize(this.rt.value, e);
  }
  assertOwned(e) {
    if (e.owner && e.owner.rt !== this.rt) throw new N(`Handle is not owned by this runtime: ${e.owner.rt.value} != ${this.rt.value}`);
  }
  setDebugMode(e) {
    this._debugMode = e, this.ffi.DEBUG && this.rt.alive && this.ffi.QTS_SetDebugLogEnabled(this.rt.value, e ? 1 : 0);
  }
  isDebugMode() {
    return this._debugMode;
  }
  debugLog(...e) {
    this._debugMode && console.log("quickjs-emscripten:", ...e);
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.alive ? `${this.constructor.name} { rt: ${this.rt.value} }` : `${this.constructor.name} { disposed }`;
  }
  getSystemContext() {
    return this.context || (this.context = this.scope.manage(this.newContext())), this.context;
  }
}, me = class {
  constructor(e) {
    this.callFunction = e.callFunction, this.shouldInterrupt = e.shouldInterrupt, this.loadModuleSource = e.loadModuleSource, this.normalizeModule = e.normalizeModule;
  }
}, de = class {
  constructor(e) {
    this.contextCallbacks = /* @__PURE__ */ new Map(), this.runtimeCallbacks = /* @__PURE__ */ new Map(), this.suspendedCount = 0, this.cToHostCallbacks = new me({ callFunction: (t, r, i, s, n, a) => this.handleAsyncify(t, () => {
      try {
        let o = this.contextCallbacks.get(r);
        if (!o) throw new Error(`QuickJSContext(ctx = ${r}) not found for C function call "${a}"`);
        return o.callFunction(r, i, s, n, a);
      } catch (o) {
        return console.error("[C to host error: returning null]", o), 0;
      }
    }), shouldInterrupt: (t, r) => this.handleAsyncify(t, () => {
      try {
        let i = this.runtimeCallbacks.get(r);
        if (!i) throw new Error(`QuickJSRuntime(rt = ${r}) not found for C interrupt`);
        return i.shouldInterrupt(r);
      } catch (i) {
        return console.error("[C to host interrupt: returning error]", i), 1;
      }
    }), loadModuleSource: (t, r, i, s) => this.handleAsyncify(t, () => {
      try {
        let n = this.runtimeCallbacks.get(r);
        if (!n) throw new Error(`QuickJSRuntime(rt = ${r}) not found for C module loader`);
        let a = n.loadModuleSource;
        if (!a) throw new Error(`QuickJSRuntime(rt = ${r}) does not support module loading`);
        return a(r, i, s);
      } catch (n) {
        return console.error("[C to host module loader error: returning null]", n), 0;
      }
    }), normalizeModule: (t, r, i, s, n) => this.handleAsyncify(t, () => {
      try {
        let a = this.runtimeCallbacks.get(r);
        if (!a) throw new Error(`QuickJSRuntime(rt = ${r}) not found for C module loader`);
        let o = a.normalizeModule;
        if (!o) throw new Error(`QuickJSRuntime(rt = ${r}) does not support module loading`);
        return o(r, i, s, n);
      } catch (a) {
        return console.error("[C to host module loader error: returning null]", a), 0;
      }
    }) }), this.module = e, this.module.callbacks = this.cToHostCallbacks;
  }
  setRuntimeCallbacks(e, t) {
    this.runtimeCallbacks.set(e, t);
  }
  deleteRuntime(e) {
    this.runtimeCallbacks.delete(e);
  }
  setContextCallbacks(e, t) {
    this.contextCallbacks.set(e, t);
  }
  deleteContext(e) {
    this.contextCallbacks.delete(e);
  }
  handleAsyncify(e, t) {
    if (e) return e.handleSleep((i) => {
      try {
        let s = t();
        if (!(s instanceof Promise)) {
          _("asyncify.handleSleep: not suspending:", s), i(s);
          return;
        }
        if (this.suspended) throw new O(`Already suspended at: ${this.suspended.stack}
Attempted to suspend at:`);
        this.suspended = new F(`(${this.suspendedCount++})`), _("asyncify.handleSleep: suspending:", this.suspended), s.then((n) => {
          this.suspended = void 0, _("asyncify.handleSleep: resolved:", n), i(n);
        }, (n) => {
          _("asyncify.handleSleep: rejected:", n), console.error("QuickJS: cannot handle error in suspended function", n), this.suspended = void 0;
        });
      } catch (s) {
        throw this.suspended = void 0, s;
      }
    });
    let r = t();
    if (r instanceof Promise) throw new Error("Promise return value not supported in non-asyncify context.");
    return r;
  }
};
function fe(e, t) {
  t.interruptHandler && e.setInterruptHandler(t.interruptHandler), t.maxStackSizeBytes !== void 0 && e.setMaxStackSize(t.maxStackSizeBytes), t.memoryLimitBytes !== void 0 && e.setMemoryLimit(t.memoryLimitBytes);
}
function pe(e, t) {
  t.moduleLoader && e.setModuleLoader(t.moduleLoader), t.shouldInterrupt && e.setInterruptHandler(t.shouldInterrupt), t.memoryLimitBytes !== void 0 && e.setMemoryLimit(t.memoryLimitBytes), t.maxStackSizeBytes !== void 0 && e.setMaxStackSize(t.maxStackSizeBytes);
}
var ve = class {
  constructor(e, t) {
    this.module = e, this.ffi = t, this.callbacks = new de(e);
  }
  newRuntime(e = {}) {
    let t = new h(this.ffi.QTS_NewRuntime(), void 0, (i) => {
      this.callbacks.deleteRuntime(i), this.ffi.QTS_FreeRuntime(i);
    }), r = new ce({ module: this.module, callbacks: this.callbacks, ffi: this.ffi, rt: t });
    return fe(r, e), e.moduleLoader && r.setModuleLoader(e.moduleLoader), r;
  }
  newContext(e = {}) {
    let t = this.newRuntime(), r = t.newContext({ ...e, ownedLifetimes: ae(t, e.ownedLifetimes) });
    return t.context = r, r;
  }
  evalCode(e, t = {}) {
    return c.withScope((r) => {
      let i = r.manage(this.newContext());
      pe(i.runtime, t);
      let s = i.evalCode(e, "eval.js");
      if (t.memoryLimitBytes !== void 0 && i.runtime.setMemoryLimit(-1), s.error) throw i.dump(r.manage(s.error));
      return i.dump(r.manage(s.value));
    });
  }
  getWasmMemory() {
    let e = this.module.quickjsEmscriptenInit?.(() => {
    })?.getWasmMemory?.();
    if (!e) throw new Error("Variant does not support getting WebAssembly.Memory");
    return e;
  }
  getFFI() {
    return this.ffi;
  }
};
export {
  de as QuickJSModuleCallbacks,
  ve as QuickJSWASMModule,
  fe as applyBaseRuntimeOptions,
  pe as applyModuleEvalRuntimeOptions
};
//# sourceMappingURL=module-6F3E5H7Y-CZSA4oPd.js.map
