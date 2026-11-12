var ci = (e) => {
  throw TypeError(e);
};
var ir = (e, t, n) => t.has(e) || ci("Cannot " + n);
var $ = (e, t, n) => (ir(e, t, "read from private field"), n ? n.call(e) : t.get(e)), ge = (e, t, n) => t.has(e) ? ci("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), pe = (e, t, n, o) => (ir(e, t, "write to private field"), o ? o.call(e, n) : t.set(e, n), n), fe = (e, t, n) => (ir(e, t, "access private method"), n);
import { CommandsToken as $e, resolvedCommandsEqual as au, unknownCommandWarning as iu, boundCommandOf as su, unregisteredCommand as lu, commandsPlugin as cu } from "@embedpdf/plugin-commands";
import { formatShortcut as al, modesOf as il, barsInMode as du, modeCommandOf as mo, panelCommandOf as It, createLayout as uu, EXPANDED_MIN_WIDTH_PX as pu, barsAt as fu, menuOf as sl, compileBar as ll, sameShortcut as mu, normalizeBar as ra, stripGroupsOf as hu, sameStripGroups as gu, layoutToolbar as bu, groupMenuView as Tn, VIEW_MODE_COMMAND as cl, resolveLayout as vu, tabsOf as wu, edgeStackOf as yu, hostOf as _u, sizeOf as xu, omittedCommandsOf as ku, validateLayout as Su, floatStackOf as Mu, barsInPanel as Ou, panelPresentationsOf as Pu, hideWhenIdleOf as Tu, panelWidthFieldsOf as Cu, hasVisibleUnits as Eu, commandOfUnit as Au, didYouMean as Nu } from "@embedpdf/core-ui";
import { CommandsToken as aa } from "@embedpdf/plugin-commands/contract/host";
import { createStandardCommands as Lu } from "@embedpdf/plugin-commands/standard";
import { browserTextMeasurer as Iu, browserPrinter as Ru, browserClock as Du, observeAnchoredFit as $u, sameAnchoredFit as zu, projectAnchoredTarget as Fu, scrollbarLayout as di, createScrollbarPresses as Bu, paintDefault as Cn, stageViewProjector as Ku, createStageSurface as ju, pageSurfaceLayout as Hu, makePageContext as Uu, stagePageDemand as Gu, paint as We, ZOOM_BOX_DASH as Wu, zoomBoxPaint as Vu, pageLayersOf as Io, rectInPixels as Qt, SNAPSHOT_BOX_DASH as qu, snapshotBoxPaint as Yu, pictureLayerOptionsOf as dl, partsDrawnTwice as Xu, whenPresented as Zu, bindPaintedImage as Ju, toolCursorsOf as Qu, wireSelectionClipboard as ep, mixAccent as tp, svgPoints as np, quadInPixels as op, attachSelectionHandle as rp, samePageBounds as ap, sameSelectionEndpoints as ip, createFontMounts as sp, fontProgramsOf as lp, sameSelectionAnchor as cp, sameRotationAnchor as dp, pickRequestedFile as up, installFilePickerProvider as pp, loadAppearanceUrls as ul, editingTextKeyOf as fp, pictureOrPainting as pl, shownAppearance as fl, rasterInFrame as mp, annotationDrawingOf as hp, layerTextBoxesOf as gp, frameInPixels as ml, bakedAppearanceOf as bp, lookFrameOf as vp, registerRendererBehaviors as wp, sceneViewBox as yp, svgShapesOf as hl, ghostOpacity as gl, freeTextBoxOf as _p, loadObjectUrl as xp, chromeInPixels as kp, annotationChromePaint as Sp, createTextBoxEditorFollower as Mp, createShownUrls as bl, enrichCommentThreads as Op, objectUrlOf as Pp, isolateWheel as Tp, createOptimisticSelection as Cp, formFocusRingStyleOf as Ep, formColorsOf as Ap, FORM_CONTROL_FILL as ia, listBoxControlStyleOf as Np, createTextFieldEditor as Lp, textFieldEditorStyleOf as Ip, bindFieldFocus as Rp, widgetBoxStyleOf as Dp, pressToggle as $p, isolatePointerDown as sa, navigableLinksOf as zp, linkAnchorOf as Fp, linkActivateContextOf as Bp, sendLinkEvent as Hn, hoverLink as Kp, isModifiedClick as jp, openExternalUri as Hp, bindCommandShortcuts as ui, isMacPlatform as Ro, standardCommandsBrowser as Up, createSurfaceFocusFollower as Gp, copySelection as Wp, copyImage as Vp, saveFile as la, pickFile as ca, deepActiveElementOf as kn, moveFocusInto as qp, attachFocusTrap as Yp, observeClientGeometry as Do, directionOf as da, anchoredViewOf as vl, fitAnchoredRect as Xp, indexedDbByteStore as Zp, observeOutsidePress as ua, computeReleaseVelocity as Jp, observeContentLength as Qp, attachToolbarFocus as ef, toolbarMeasureKey as pi, TOOLBAR_ITEM_ATTRIBUTE as wl, focusablesIn as tf, attachMenuKeys as pa, observeLength as yl, observeOwnLength as nf, createToolbarLengths as of, ownLengthOf as rf, isUnavailable as af, createDefaultActionsUiAdapter as sf, searchHighlightsOf as lf, createClickDetector as cf, observeWidth as fa, isFromTextField as df, observeHeight as uf, vibrationFeedback as pf } from "@embedpdf/web";
import { standInFor as ff, documentsState as fi, DocumentsToken as Pe, documentState as mi, shallowEqual as En, viewerSettingsOf as mf, isLocalEngine as _l, createKernel as hf, toPageRef as ho, annotationKey as sr, createCapabilityToken as gf, mergeSettings as bf, isPluginError as hi, isReadMember as vf, PluginError as go, isPdf as wf } from "@embedpdf/core";
import { ShellToken as H, shellState as yf, shellPlugin as _f } from "@embedpdf/plugin-shell";
import { interactionState as xf, InteractionToken as An, interactionPlugin as kf, feedbackPlugin as Sf } from "@embedpdf/plugin-interaction";
import { createScrollHandler as Mf, createZoomDragHandler as Of, stageState as gi, ZoomMode as lr, StageToken as ct, stagePlugin as bi } from "@embedpdf/plugin-stage";
import { RenderToken as en, SNAPSHOT_TOOL as cr, renderPlugin as Pf } from "@embedpdf/plugin-render";
import { RedactionToken as ht, redactionPlugin as Tf } from "@embedpdf/plugin-redaction";
import { measurementState as Cf, NO_PAGE_SCALE as Ef, MeasurementToken as _t, measurementPlugin as Af } from "@embedpdf/plugin-measurement";
import { StampToken as Oe, stampState as Nf, persistStampLibraries as Lf, restoreStampLibraries as If, stampPlugin as Rf } from "@embedpdf/plugin-stamp";
import { i18nState as Df, I18nToken as $o, negotiateLocale as zo, i18nPlugin as $f } from "@embedpdf/plugin-i18n";
import { LinkToken as bo, linkPlugin as zf } from "@embedpdf/plugin-link";
import { HistoryToken as Un, historyPlugin as Ff } from "@embedpdf/plugin-history";
import { FormToken as tn, formState as Bf, formPlugin as Kf } from "@embedpdf/plugin-form";
import { annotationKey as jt, AnnotationToken as ye, annotationPlugin as jf } from "@embedpdf/plugin-annotation";
import { armSelectionHandle as Hf, selectionHandleViewOf as vi, SelectionToken as Nn, selectionState as Uf, selectionHandleEndpointsOf as Gf, selectionHandleGeometry as Wf, HANDLE_BAR as Gn, HANDLE_PAD as Pt, HANDLE_HEAD as dn, selectionPlugin as Vf } from "@embedpdf/plugin-selection";
import { outlineState as qf, OutlineToken as Fo, outlinePlugin as Yf } from "@embedpdf/plugin-outline";
import { attachmentState as Xf, AttachmentToken as Bo, attachmentPlugin as Zf } from "@embedpdf/plugin-attachment";
import { PageEditToken as Ko, pageEditState as Jf, pageEditPlugin as Qf } from "@embedpdf/plugin-page-edit";
import { SignatureToken as nn, signatureState as em, SIGNATURES_LIBRARY_KIND as tm, signerRowsOf as nm, signaturePlugin as om } from "@embedpdf/plugin-signature";
import { LOCALES as rm, loadDefaultLibrary as am } from "@embedpdf/default-stamps/library";
import { InteractionToken as Er } from "@embedpdf/plugin-interaction/contract";
import { InteractionToken as jo } from "@embedpdf/plugin-interaction/contract/host";
import { StageToken as xl } from "@embedpdf/plugin-stage/contract";
import { resolvedCommandsEqual as im, unregisteredCommand as sm } from "@embedpdf/plugin-commands/contract";
import { fontProgramFamily as lm } from "@embedpdf/core-fonts";
import { DEFAULT_SIGNATURE_FONTS as cm, loadSignatureFont as dm } from "@embedpdf/default-signature-fonts/library";
import { RenderToken as Ke } from "@embedpdf/plugin-render/contract/host";
import { SelectionToken as Ht } from "@embedpdf/plugin-selection/contract/host";
import { hasLiveDrawing as um, scene as pm, MITER_LIMIT as kl } from "@embedpdf/core-annotation";
import { AnnotationToken as Ue, previewBucket as fm } from "@embedpdf/plugin-annotation/contract/host";
import { annotationState as mm, AnnotationToken as Sl } from "@embedpdf/plugin-annotation/contract";
import { ActionsToken as Ml, actionsPlugin as hm } from "@embedpdf/plugin-actions";
import { FontsToken as gm } from "@embedpdf/plugin-fonts/contract";
import { FormToken as Te } from "@embedpdf/plugin-form/contract/host";
import { SignatureToken as wi } from "@embedpdf/plugin-signature/contract";
import { createHoverPump as bm, ActionsToken as vm } from "@embedpdf/plugin-actions/contract";
import { LinkToken as Ol } from "@embedpdf/plugin-link/contract/host";
import { searchState as wm, SearchToken as on, searchPlugin as ym } from "@embedpdf/plugin-search";
import { FontsToken as _m, fontsPlugin as xm } from "@embedpdf/plugin-fonts";
import { MetadataToken as km, metadataPlugin as Sm } from "@embedpdf/plugin-metadata";
var Ln, N, Pl, ft, yi, Tl, Cl, dr, ao, gn, El, ma, Ar, Nr, Al, vo = {}, wo = [], Mm = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, In = Array.isArray;
function Ge(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function ha(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
function Ee(e, t, n) {
  var o, r, a, s = {};
  for (a in t) a == "key" ? o = t[a] : a == "ref" ? r = t[a] : s[a] = t[a];
  if (arguments.length > 2 && (s.children = arguments.length > 3 ? Ln.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (a in e.defaultProps) s[a] === void 0 && (s[a] = e.defaultProps[a]);
  return bn(e, s, o, r, null);
}
function bn(e, t, n, o, r) {
  var a = { type: e, props: t, key: n, ref: o, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: r ?? ++Pl, __i: -1, __u: 0 };
  return r == null && N.vnode != null && N.vnode(a), a;
}
function Om() {
  return { current: null };
}
function D(e) {
  return e.children;
}
function xe(e, t) {
  this.props = e, this.context = t;
}
function qt(e, t) {
  if (t == null) return e.__ ? qt(e.__, e.__i + 1) : null;
  for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
  return typeof e.type == "function" ? qt(e) : null;
}
function Pm(e) {
  if (e.__P && e.__d) {
    var t = e.__v, n = t.__e, o = [], r = [], a = Ge({}, t);
    a.__v = t.__v + 1, N.vnode && N.vnode(a), ga(e.__P, a, t, e.__n, e.__P.namespaceURI, 32 & t.__u ? [n] : null, o, n ?? qt(t), !!(32 & t.__u), r), a.__v = t.__v, a.__.__k[a.__i] = a, Dl(o, a, r), t.__e = t.__ = null, a.__e != n && Nl(a);
  }
}
function Nl(e) {
  if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
    if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
  }), Nl(e);
}
function Lr(e) {
  (!e.__d && (e.__d = !0) && ft.push(e) && !yo.__r++ || yi != N.debounceRendering) && ((yi = N.debounceRendering) || Tl)(yo);
}
function yo() {
  try {
    for (var e, t = 1; ft.length; ) ft.length > t && ft.sort(Cl), e = ft.shift(), t = ft.length, Pm(e);
  } finally {
    ft.length = yo.__r = 0;
  }
}
function Ll(e, t, n, o, r, a, s, l, d, c, p) {
  var f, u, m, g, h, b, y, v = o && o.__k || wo, _ = t.length;
  for (d = Tm(n, t, v, d, _), f = 0; f < _; f++) (m = n.__k[f]) != null && (u = m.__i != -1 && v[m.__i] || vo, m.__i = f, b = ga(e, m, u, r, a, s, l, d, c, p), g = m.__e, m.ref && u.ref != m.ref && (u.ref && ba(u.ref, null, m), p.push(m.ref, m.__c || g, m)), h == null && g != null && (h = g), (y = !!(4 & m.__u)) || u.__k === m.__k ? (d = Il(m, d, e, y), y && u.__e && (u.__e = null)) : typeof m.type == "function" && b !== void 0 ? d = b : g && (d = g.nextSibling), m.__u &= -7);
  return n.__e = h, d;
}
function Tm(e, t, n, o, r) {
  var a, s, l, d, c, p = n.length, f = p, u = 0;
  for (e.__k = new Array(r), a = 0; a < r; a++) (s = t[a]) != null && typeof s != "boolean" && typeof s != "function" ? (typeof s == "string" || typeof s == "number" || typeof s == "bigint" || s.constructor == String ? s = e.__k[a] = bn(null, s, null, null, null) : In(s) ? s = e.__k[a] = bn(D, { children: s }, null, null, null) : s.constructor === void 0 && s.__b > 0 ? s = e.__k[a] = bn(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : e.__k[a] = s, d = a + u, s.__ = e, s.__b = e.__b + 1, l = null, (c = s.__i = Cm(s, n, d, f)) != -1 && (f--, (l = n[c]) && (l.__u |= 2)), l == null || l.__v == null ? (c == -1 && (r > p ? u-- : r < p && u++), typeof s.type != "function" && (s.__u |= 4)) : c != d && (c == d - 1 ? u-- : c == d + 1 ? u++ : (c > d ? u-- : u++, s.__u |= 4))) : e.__k[a] = null;
  if (f) for (a = 0; a < p; a++) (l = n[a]) != null && (2 & l.__u) == 0 && (l.__e == o && (o = qt(l)), zl(l, l));
  return o;
}
function Il(e, t, n, o) {
  var r, a;
  if (typeof e.type == "function") {
    for (r = e.__k, a = 0; r && a < r.length; a++) r[a] && (r[a].__ = e, t = Il(r[a], t, n, o));
    return t;
  }
  e.__e != t && (o && (t && e.type && !t.parentNode && (t = qt(e)), n.insertBefore(e.__e, t || null)), t = e.__e);
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType == 8);
  return t;
}
function Re(e, t) {
  return t = t || [], e == null || typeof e == "boolean" || (In(e) ? e.some(function(n) {
    Re(n, t);
  }) : t.push(e)), t;
}
function Cm(e, t, n, o) {
  var r, a, s, l = e.key, d = e.type, c = t[n], p = c != null && (2 & c.__u) == 0;
  if (c === null && l == null || p && l == c.key && d == c.type) return n;
  if (o > (p ? 1 : 0)) {
    for (r = n - 1, a = n + 1; r >= 0 || a < t.length; ) if ((c = t[s = r >= 0 ? r-- : a++]) != null && (2 & c.__u) == 0 && l == c.key && d == c.type) return s;
  }
  return -1;
}
function _i(e, t, n) {
  t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || Mm.test(t) ? n : n + "px";
}
function Wn(e, t, n, o, r) {
  var a, s;
  e: if (t == "style") if (typeof n == "string") e.style.cssText = n;
  else {
    if (typeof o == "string" && (e.style.cssText = o = ""), o) for (t in o) n && t in n || _i(e.style, t, "");
    if (n) for (t in n) o && n[t] == o[t] || _i(e.style, t, n[t]);
  }
  else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(El, "$1")), s = t.toLowerCase(), t = s in e || t == "onFocusOut" || t == "onFocusIn" ? s.slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + a] = n, n ? o ? n[gn] = o[gn] : (n[gn] = ma, e.addEventListener(t, a ? Nr : Ar, a)) : e.removeEventListener(t, a ? Nr : Ar, a);
  else {
    if (r == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
      e[t] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
  }
}
function xi(e) {
  return function(t) {
    if (this.l) {
      var n = this.l[t.type + e];
      if (t[ao] == null) t[ao] = ma++;
      else if (t[ao] < n[gn]) return;
      return n(N.event ? N.event(t) : t);
    }
  };
}
function ga(e, t, n, o, r, a, s, l, d, c) {
  var p, f, u, m, g, h, b, y, v, _, P, S, x, O, M, T, L = t.type;
  if (t.constructor !== void 0) return null;
  128 & n.__u && (d = !!(32 & n.__u), a = [l = t.__e = n.__e]), (p = N.__b) && p(t);
  e: if (typeof L == "function") {
    f = s.length;
    try {
      if (v = t.props, _ = L.prototype && L.prototype.render, P = (p = L.contextType) && o[p.__c], S = p ? P ? P.props.value : p.__ : o, n.__c ? y = (u = t.__c = n.__c).__ = u.__E : (_ ? t.__c = u = new L(v, S) : (t.__c = u = new xe(v, S), u.constructor = L, u.render = Am), P && P.sub(u), u.state || (u.state = {}), u.__n = o, m = u.__d = !0, u.__h = [], u._sb = []), _ && u.__s == null && (u.__s = u.state), _ && L.getDerivedStateFromProps != null && (u.__s == u.state && (u.__s = Ge({}, u.__s)), Ge(u.__s, L.getDerivedStateFromProps(v, u.__s))), g = u.props, h = u.state, u.__v = t, m) _ && L.getDerivedStateFromProps == null && u.componentWillMount != null && u.componentWillMount(), _ && u.componentDidMount != null && u.__h.push(u.componentDidMount);
      else {
        if (_ && L.getDerivedStateFromProps == null && v !== g && u.componentWillReceiveProps != null && u.componentWillReceiveProps(v, S), t.__v == n.__v || !u.__e && u.shouldComponentUpdate != null && u.shouldComponentUpdate(v, u.__s, S) === !1) {
          t.__v != n.__v && (u.props = v, u.state = u.__s, u.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(B) {
            B && (B.__ = t);
          }), wo.push.apply(u.__h, u._sb), u._sb = [], u.__h.length && s.push(u);
          break e;
        }
        u.componentWillUpdate != null && u.componentWillUpdate(v, u.__s, S), _ && u.componentDidUpdate != null && u.__h.push(function() {
          u.componentDidUpdate(g, h, b);
        });
      }
      if (u.context = S, u.props = v, u.__P = e, u.__e = !1, x = N.__r, O = 0, _) u.state = u.__s, u.__d = !1, x && x(t), p = u.render(u.props, u.state, u.context), wo.push.apply(u.__h, u._sb), u._sb = [];
      else do
        u.__d = !1, x && x(t), p = u.render(u.props, u.state, u.context), u.state = u.__s;
      while (u.__d && ++O < 25);
      u.state = u.__s, u.getChildContext != null && (o = Ge(Ge({}, o), u.getChildContext())), _ && !m && u.getSnapshotBeforeUpdate != null && (b = u.getSnapshotBeforeUpdate(g, h)), M = p != null && p.type === D && p.key == null ? $l(p.props.children) : p, l = Ll(e, In(M) ? M : [M], t, n, o, r, a, s, l, d, c), u.base = t.__e, t.__u &= -161, u.__h.length && s.push(u), y && (u.__E = u.__ = null);
    } catch (B) {
      if (s.length = f, t.__v = null, d || a != null) {
        if (B.then) {
          for (t.__u |= d ? 160 : 128; l && l.nodeType == 8 && l.nextSibling; ) l = l.nextSibling;
          a != null && (a[a.indexOf(l)] = null), t.__e = l;
        } else if (a != null) for (T = a.length; T--; ) ha(a[T]);
      } else t.__e = n.__e;
      t.__k == null && (t.__k = n.__k || []), B.then || Rl(t), N.__e(B, t, n);
    }
  } else a == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : l = t.__e = Em(n.__e, t, n, o, r, a, s, d, c);
  return (p = N.diffed) && p(t), 128 & t.__u ? void 0 : l;
}
function Rl(e) {
  e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(Rl));
}
function Dl(e, t, n) {
  for (var o = 0; o < n.length; o++) ba(n[o], n[++o], n[++o]);
  N.__c && N.__c(t, e), e.some(function(r) {
    try {
      e = r.__h, r.__h = [], e.some(function(a) {
        a.call(r);
      });
    } catch (a) {
      N.__e(a, r.__v);
    }
  });
}
function $l(e) {
  return typeof e != "object" || e == null || e.__b > 0 ? e : In(e) ? e.map($l) : e.constructor !== void 0 ? null : Ge({}, e);
}
function Em(e, t, n, o, r, a, s, l, d) {
  var c, p, f, u, m, g, h, b = n.props || vo, y = t.props, v = t.type;
  if (v == "svg" ? r = "http://www.w3.org/2000/svg" : v == "math" ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), a != null) {
    for (c = 0; c < a.length; c++) if ((m = a[c]) && "setAttribute" in m == !!v && (v ? m.localName == v : m.nodeType == 3)) {
      e = m, a[c] = null;
      break;
    }
  }
  if (e == null) {
    if (v == null) return document.createTextNode(y);
    e = document.createElementNS(r, v, y.is && y), l && (N.__m && N.__m(t, a), l = !1), a = null;
  }
  if (v == null) b === y || l && e.data == y || (e.data = y);
  else {
    if (a = v == "textarea" && y.defaultValue != null ? null : a && Ln.call(e.childNodes), !l && a != null) for (b = {}, c = 0; c < e.attributes.length; c++) b[(m = e.attributes[c]).name] = m.value;
    for (c in b) m = b[c], c == "dangerouslySetInnerHTML" ? f = m : c == "children" || c in y || c == "value" && "defaultValue" in y || c == "checked" && "defaultChecked" in y || Wn(e, c, null, m, r);
    for (c in y) m = y[c], c == "children" ? u = m : c == "dangerouslySetInnerHTML" ? p = m : c == "value" ? g = m : c == "checked" ? h = m : l && typeof m != "function" || b[c] === m || Wn(e, c, m, b[c], r);
    if (p) l || f && (p.__html == f.__html || p.__html == e.innerHTML) || (e.innerHTML = p.__html), t.__k = [];
    else if (f && (e.innerHTML = ""), Ll(t.type == "template" ? e.content : e, In(u) ? u : [u], t, n, o, v == "foreignObject" ? "http://www.w3.org/1999/xhtml" : r, a, s, a ? a[0] : n.__k && qt(n, 0), l, d), a != null) for (c = a.length; c--; ) ha(a[c]);
    l && v != "textarea" || (c = "value", v == "progress" && g == null ? e.removeAttribute("value") : g != null && (g !== e[c] || v == "progress" && !g || v == "option" && g != b[c]) && Wn(e, c, g, b[c], r), c = "checked", h != null && h != e[c] && Wn(e, c, h, b[c], r));
  }
  return e;
}
function ba(e, t, n) {
  try {
    if (typeof e == "function") {
      var o = typeof e.__u == "function";
      o && e.__u(), o && t == null || (e.__u = e(t));
    } else e.current = t;
  } catch (r) {
    N.__e(r, n);
  }
}
function zl(e, t, n) {
  var o, r;
  if (N.unmount && N.unmount(e), (o = e.ref) && (o.current && o.current != e.__e || ba(o, null, t)), (o = e.__c) != null) {
    if (o.componentWillUnmount) try {
      o.componentWillUnmount();
    } catch (a) {
      N.__e(a, t);
    }
    o.base = o.__P = o.__n = null;
  }
  if (o = e.__k) for (r = 0; r < o.length; r++) o[r] && zl(o[r], t, n || typeof e.type != "function");
  n || ha(e.__e), e.__c = e.__ = e.__e = void 0;
}
function Am(e, t, n) {
  return this.constructor(e, n);
}
function Rt(e, t, n) {
  var o, r, a, s;
  t == document && (t = document.documentElement), N.__ && N.__(e, t), r = (o = typeof n == "function") ? null : n && n.__k || t.__k, a = [], s = [], ga(t, e = (!o && n || t).__k = Ee(D, null, [e]), r || vo, vo, t.namespaceURI, !o && n ? [n] : r ? null : t.firstChild ? Ln.call(t.childNodes) : null, a, !o && n ? n : r ? r.__e : t.firstChild, o, s), Dl(a, e, s), e.props.children = null;
}
function Fl(e, t) {
  Rt(e, t, Fl);
}
function Nm(e, t, n) {
  var o, r, a, s, l = Ge({}, e.props);
  for (a in e.type && e.type.defaultProps && (s = e.type.defaultProps), t) a == "key" ? o = t[a] : a == "ref" ? r = t[a] : l[a] = t[a] === void 0 && s != null ? s[a] : t[a];
  return arguments.length > 2 && (l.children = arguments.length > 3 ? Ln.call(arguments, 2) : n), bn(e.type, l, o || e.key, r || e.ref, null);
}
function be(e) {
  function t(n) {
    var o, r;
    return this.getChildContext || (o = /* @__PURE__ */ new Set(), (r = {})[t.__c] = this, this.getChildContext = function() {
      return r;
    }, this.componentWillUnmount = function() {
      o = null;
    }, this.shouldComponentUpdate = function(a) {
      this.props.value != a.value && o.forEach(function(s) {
        s.__e = !0, Lr(s);
      });
    }, this.sub = function(a) {
      o.add(a);
      var s = a.componentWillUnmount;
      a.componentWillUnmount = function() {
        o && o.delete(a), s && s.call(a);
      };
    }), n.children;
  }
  return t.__c = "__cC" + Al++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(n, o) {
    return n.children(o);
  }).contextType = t, t;
}
Ln = wo.slice, N = { __e: function(e, t, n, o) {
  for (var r, a, s; t = t.__; ) if ((r = t.__c) && !r.__) try {
    if ((a = r.constructor) && a.getDerivedStateFromError != null && (r.setState(a.getDerivedStateFromError(e)), s = r.__d), r.componentDidCatch != null && (r.componentDidCatch(e, o || {}), s = r.__d), s) return r.__E = r;
  } catch (l) {
    e = l;
  }
  throw e;
} }, Pl = 0, xe.prototype.setState = function(e, t) {
  var n;
  n = this.__s != null && this.__s != this.state ? this.__s : this.__s = Ge({}, this.state), typeof e == "function" && (e = e(Ge({}, n), this.props)), e && Ge(n, e), e != null && this.__v && (t && this._sb.push(t), Lr(this));
}, xe.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), Lr(this));
}, xe.prototype.render = D, ft = [], Tl = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Cl = function(e, t) {
  return e.__v.__b - t.__v.__b;
}, yo.__r = 0, dr = Math.random().toString(8), ao = "__d" + dr, gn = "__a" + dr, El = /(PointerCapture)$|Capture$/i, ma = 0, Ar = xi(!1), Nr = xi(!0), Al = 0;
var xt, se, ur, ki, Yt = 0, Bl = [], ue = N, Si = ue.__b, Mi = ue.__r, Oi = ue.diffed, Pi = ue.__c, Ti = ue.unmount, Ci = ue.__;
function rn(e, t) {
  ue.__h && ue.__h(se, e, Yt || t), Yt = 0;
  var n = se.__H || (se.__H = { __: [], __h: [] });
  return e >= n.__.length && n.__.push({}), n.__[e];
}
function C(e) {
  return Yt = 1, kt(jl, e);
}
function kt(e, t, n) {
  var o = rn(xt++, 2);
  if (o.t = e, !o.__c && (o.__ = [n ? n(t) : jl(void 0, t), function(l) {
    var d = o.__N ? o.__N[0] : o.__[0], c = o.t(d, l);
    d !== c && (o.__N = [c, o.__[1]], o.__c.setState({}));
  }], o.__c = se, !se.__f)) {
    var r = function(l, d, c) {
      if (!o.__c.__H) return !0;
      var p = !1, f = o.__c.props !== l;
      if (o.__c.__H.__.some(function(m) {
        if (m.__N) {
          p = !0;
          var g = m.__[0];
          m.__ = m.__N, m.__N = void 0, g !== m.__[0] && (f = !0);
        }
      }), a) {
        var u = a.call(this, l, d, c);
        return p ? u || f : u;
      }
      return !p || f;
    };
    se.__f = !0;
    var a = se.shouldComponentUpdate, s = se.componentWillUpdate;
    se.componentWillUpdate = function(l, d, c) {
      if (this.__e) {
        var p = a;
        a = void 0, r(l, d, c), a = p;
      }
      s && s.call(this, l, d, c);
    }, se.shouldComponentUpdate = r;
  }
  return o.__N || o.__;
}
function E(e, t) {
  var n = rn(xt++, 3);
  !ue.__s && wa(n.__H, t) && (n.__ = e, n.u = t, se.__H.__h.push(n));
}
function R(e, t) {
  var n = rn(xt++, 4);
  !ue.__s && wa(n.__H, t) && (n.__ = e, n.u = t, se.__h.push(n));
}
function k(e) {
  return Yt = 5, j(function() {
    return { current: e };
  }, []);
}
function va(e, t, n) {
  Yt = 6, R(function() {
    if (typeof e == "function") {
      var o = e(t());
      return function() {
        e(null), o && typeof o == "function" && o();
      };
    }
    if (e) return e.current = t(), function() {
      return e.current = null;
    };
  }, n == null ? n : n.concat(e));
}
function j(e, t) {
  var n = rn(xt++, 7);
  return wa(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Ve(e, t) {
  return Yt = 8, j(function() {
    return e;
  }, t);
}
function X(e) {
  var t = se.context[e.__c], n = rn(xt++, 9);
  return n.c = e, t ? (n.__ == null && (n.__ = !0, t.sub(se)), t.props.value) : e.__;
}
function Kl(e, t) {
  ue.useDebugValue && ue.useDebugValue(t ? t(e) : e);
}
function Je() {
  var e = rn(xt++, 11);
  if (!e.__) {
    for (var t = se.__v; t !== null && !t.__m && t.__ !== null; ) t = t.__;
    var n = t.__m || (t.__m = [0, 0]);
    e.__ = "P" + n[0] + "-" + n[1]++;
  }
  return e.__;
}
function Lm() {
  for (var e; e = Bl.shift(); ) {
    var t = e.__H;
    if (e.__P && t) try {
      t.__h.some(io), t.__h.some(Ir), t.__h = [];
    } catch (n) {
      t.__h = [], ue.__e(n, e.__v);
    }
  }
}
ue.__b = function(e) {
  se = null, Si && Si(e);
}, ue.__ = function(e, t) {
  e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Ci && Ci(e, t);
}, ue.__r = function(e) {
  Mi && Mi(e), xt = 0;
  var t = (se = e.__c).__H;
  t && (ur === se ? (t.__h = [], se.__h = [], t.__.some(function(n) {
    n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
  })) : (t.__h.some(io), t.__h.some(Ir), t.__h = [], xt = 0)), ur = se;
}, ue.diffed = function(e) {
  Oi && Oi(e);
  var t = e.__c;
  t && t.__H && (t.__H.__h.length && (Bl.push(t) !== 1 && ki === ue.requestAnimationFrame || ((ki = ue.requestAnimationFrame) || Im)(Lm)), t.__H.__.some(function(n) {
    n.u && (n.__H = n.u, n.u = void 0);
  })), ur = se = null;
}, ue.__c = function(e, t) {
  t.some(function(n) {
    try {
      n.__h.some(io), n.__h = n.__h.filter(function(o) {
        return !o.__ || Ir(o);
      });
    } catch (o) {
      t.some(function(r) {
        r.__h && (r.__h = []);
      }), t = [], ue.__e(o, n.__v);
    }
  }), Pi && Pi(e, t);
}, ue.unmount = function(e) {
  Ti && Ti(e);
  var t, n = e.__c;
  n && n.__H && (n.__H.__.some(function(o) {
    try {
      io(o);
    } catch (r) {
      t = r;
    }
  }), n.__H = void 0, t && ue.__e(t, n.__v));
};
var Ei = typeof requestAnimationFrame == "function";
function Im(e) {
  var t, n = function() {
    clearTimeout(o), Ei && cancelAnimationFrame(t), setTimeout(e);
  }, o = setTimeout(n, 35);
  Ei && (t = requestAnimationFrame(n));
}
function io(e) {
  var t = se, n = e.__c;
  typeof n == "function" && (e.__c = void 0, n()), se = t;
}
function Ir(e) {
  var t = se;
  e.__c = e.__(), se = t;
}
function wa(e, t) {
  return !e || e.length !== t.length || t.some(function(n, o) {
    return n !== e[o];
  });
}
function jl(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Hl(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Rr(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var o in t) if (o !== "__source" && e[o] !== t[o]) return !0;
  return !1;
}
function Xe(e, t) {
  var n = t(), o = C({ t: { __: n, u: t } }), r = o[0].t, a = o[1];
  return R(function() {
    r.__ = n, r.u = t, pr(r) && a({ t: r });
  }, [e, n, t]), E(function() {
    return pr(r) && a({ t: r }), e(function() {
      pr(r) && a({ t: r });
    });
  }, [e]), n;
}
function pr(e) {
  try {
    return !((t = e.__) === (n = e.u()) && (t !== 0 || 1 / t == 1 / n) || t != t && n != n);
  } catch {
    return !0;
  }
  var t, n;
}
function Ul(e) {
  e();
}
function Gl(e) {
  return e;
}
function Wl() {
  return [!1, Ul];
}
var ya = R;
function Dr(e, t) {
  this.props = e, this.context = t;
}
function Rm(e, t) {
  function n(r) {
    var a = this.props.ref;
    return a != r.ref && a && (typeof a == "function" ? a(null) : a.current = null), t ? !t(this.props, r) || a != r.ref : Rr(this.props, r);
  }
  function o(r) {
    return this.shouldComponentUpdate = n, Ee(e, r);
  }
  return o.displayName = "Memo(" + (e.displayName || e.name) + ")", o.__f = o.prototype.isReactComponent = !0, o.type = e, o;
}
(Dr.prototype = new xe()).isPureReactComponent = !0, Dr.prototype.shouldComponentUpdate = function(e, t) {
  return Rr(this.props, e) || Rr(this.state, t);
};
var Ai = N.__b;
N.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Ai && Ai(e);
};
var Dm = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function Vl(e) {
  function t(n) {
    var o = Hl({}, n);
    return delete o.ref, e(o, n.ref || null);
  }
  return t.$$typeof = Dm, t.render = e, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
}
var Ni = function(e, t) {
  return e == null ? null : Re(Re(e).map(t));
}, $m = { map: Ni, forEach: Ni, count: function(e) {
  return e ? Re(e).length : 0;
}, only: function(e) {
  var t = Re(e);
  if (t.length !== 1) throw "Children.only";
  return t[0];
}, toArray: Re }, zm = N.__e;
N.__e = function(e, t, n, o) {
  if (e.then) {
    for (var r, a = t; a = a.__; ) if ((r = a.__c) && r.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k || []), r.__c(e, t);
  }
  zm(e, t, n, o);
};
var Li = N.unmount;
function ql(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(o) {
    typeof o.__c == "function" && o.__c();
  }), e.__c.__H = null), (e = Hl({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(o) {
    return ql(o, t, n);
  })), e;
}
function Yl(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(o) {
    return Yl(o, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function vn() {
  this.__u = 0, this.o = null, this.__b = null;
}
function Xl(e) {
  var t = e.__ && e.__.__c;
  return t && t.__a && t.__a(e);
}
function Zl(e) {
  var t, n, o, r = null;
  function a(s) {
    if (t || (t = e()).then(function(l) {
      l && (r = l.default || l), o = !0;
    }, function(l) {
      n = l, o = !0;
    }), n) throw n;
    if (!o) throw t;
    return r ? Ee(r, s) : null;
  }
  return a.displayName = "Lazy", a.__f = !0, a;
}
function hn() {
  this.i = null, this.l = null;
}
N.unmount = function(e) {
  var t = e.__c;
  t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), Li && Li(e);
}, (vn.prototype = new xe()).__c = function(e, t) {
  var n = t.__c, o = this;
  o.o == null && (o.o = []), o.o.push(n);
  var r = Xl(o.__v), a = !1, s = function() {
    a || o.__z || (a = !0, n.__R = null, r ? r(d) : d());
  };
  n.__R = s;
  var l = n.__P;
  n.__P = null;
  var d = function() {
    if (!--o.__u) {
      if (o.state.__a) {
        var c = o.state.__a;
        o.__v.__k[0] = Yl(c, c.__c.__P, c.__c.__O);
      }
      var p;
      for (o.setState({ __a: o.__b = null }); p = o.o.pop(); ) p.__P = l, p.forceUpdate();
    }
  };
  o.__u++ || 32 & t.__u || o.setState({ __a: o.__b = o.__v.__k[0] }), e.then(s, s);
}, vn.prototype.componentWillUnmount = function() {
  this.o = [];
}, vn.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), o = this.__v.__k[0].__c;
      this.__v.__k[0] = ql(this.__b, n, o.__O = o.__P);
    }
    this.__b = null;
  }
  var r = t.__a && Ee(D, null, e.fallback);
  return r && (r.__u &= -33), [Ee(D, null, t.__a ? null : e.children), r];
};
var Ii = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
function Fm(e) {
  return this.getChildContext = function() {
    return e.context;
  }, e.children;
}
function Bm(e) {
  var t = this, n = e.h;
  if (t.componentWillUnmount = function() {
    Rt(null, t.v), t.v = null, t.h = null;
  }, t.h && t.h !== n && t.componentWillUnmount(), !t.v) {
    for (var o = t.__v; o !== null && !o.__m && o.__ !== null; ) o = o.__;
    t.h = n, t.v = { nodeType: 1, parentNode: n, childNodes: [], __k: { __m: o.__m }, contains: function() {
      return !0;
    }, namespaceURI: n.namespaceURI, insertBefore: function(r, a) {
      this.childNodes.push(r), t.h.insertBefore(r, a);
    }, removeChild: function(r) {
      this.childNodes.splice(this.childNodes.indexOf(r) >>> 1, 1), t.h.removeChild(r);
    } };
  }
  Rt(Ee(Fm, { context: t.context }, e.__v), t.v);
}
function _a(e, t) {
  var n = Ee(Bm, { __v: e, h: t });
  return n.containerInfo = t, n;
}
(hn.prototype = new xe()).__a = function(e) {
  var t = this, n = Xl(t.__v), o = t.l.get(e);
  return o[0]++, function(r) {
    var a = function() {
      t.props.revealOrder ? (o.push(r), Ii(t, e, o)) : r();
    };
    n ? n(a) : a();
  };
}, hn.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = Re(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, hn.prototype.componentDidUpdate = hn.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    Ii(e, n, t);
  });
};
var Jl = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Km = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, jm = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Hm = /[A-Z0-9]/g, Um = typeof document < "u", Gm = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
function Wm(e, t, n) {
  return t.__k == null && (t.textContent = ""), Rt(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
function Vm(e, t, n) {
  return Fl(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
xe.prototype.isReactComponent = !0, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(xe.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var Ri = N.event;
N.event = function(e) {
  return Ri && (e = Ri(e)), e.persist = function() {
  }, e.isPropagationStopped = function() {
    return this.cancelBubble;
  }, e.isDefaultPrevented = function() {
    return this.defaultPrevented;
  }, e.nativeEvent = e;
};
var xa, qm = { configurable: !0, get: function() {
  return this.class;
} }, Di = N.vnode;
N.vnode = function(e) {
  typeof e.type == "string" && (function(t) {
    var n = t.props, o = t.type, r = {}, a = o.indexOf("-") == -1;
    for (var s in n) {
      var l = n[s];
      if (!(s === "value" && "defaultValue" in n && l == null || Um && s === "children" && o === "noscript" || s === "class" || s === "className")) {
        var d = s.toLowerCase();
        s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && l === !0 ? l = "" : d === "translate" && l === "no" ? l = !1 : d[0] === "o" && d[1] === "n" ? d === "ondoubleclick" ? s = "ondblclick" : d !== "onchange" || o !== "input" && o !== "textarea" || Gm(n.type) ? d === "onfocus" ? s = "onfocusin" : d === "onblur" ? s = "onfocusout" : jm.test(s) && (s = d) : d = s = "oninput" : a && Km.test(s) ? s = s.replace(Hm, "-$&").toLowerCase() : l === null && (l = void 0), d === "oninput" && r[s = d] && (s = "oninputCapture"), r[s] = l;
      }
    }
    o == "select" && (r.multiple && Array.isArray(r.value) && (r.value = Re(n.children).forEach(function(c) {
      c.props.selected = r.value.indexOf(c.props.value) != -1;
    })), r.defaultValue != null && (r.value = Re(n.children).forEach(function(c) {
      c.props.selected = r.multiple ? r.defaultValue.indexOf(c.props.value) != -1 : r.defaultValue == c.props.value;
    }))), n.class && !n.className ? (r.class = n.class, Object.defineProperty(r, "className", qm)) : n.className && (r.class = r.className = n.className), t.props = r;
  })(e), e.$$typeof = Jl, Di && Di(e);
};
var $i = N.__r;
N.__r = function(e) {
  $i && $i(e), xa = e.__c;
};
var zi = N.diffed;
N.diffed = function(e) {
  zi && zi(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value), xa = null;
};
var Ym = { ReactCurrentDispatcher: { current: { readContext: function(e) {
  return xa.__n[e.__c].props.value;
}, useCallback: Ve, useContext: X, useDebugValue: Kl, useDeferredValue: Gl, useEffect: E, useId: Je, useImperativeHandle: va, useInsertionEffect: ya, useLayoutEffect: R, useMemo: j, useReducer: kt, useRef: k, useState: C, useSyncExternalStore: Xe, useTransition: Wl } } }, Xm = "18.3.1";
function Zm(e) {
  return Ee.bind(null, e);
}
function Ho(e) {
  return !!e && e.$$typeof === Jl;
}
function Jm(e) {
  return Ho(e) && e.type === D;
}
function Qm(e) {
  return !!e && typeof e.displayName == "string" && e.displayName.indexOf("Memo(") == 0;
}
function eh(e) {
  return Ho(e) ? Nm.apply(null, arguments) : e;
}
function th(e) {
  return !!e.__k && (Rt(null, e), !0);
}
function nh(e) {
  return e && (e.base || e.nodeType === 1 && e) || null;
}
var oh = function(e, t) {
  return e(t);
}, rh = function(e, t) {
  var n = N.debounceRendering;
  N.debounceRendering = function(r) {
    return r();
  };
  var o = e(t);
  return N.debounceRendering = n, o;
}, ah = Ho, ih = { useState: C, useId: Je, useReducer: kt, useEffect: E, useLayoutEffect: R, useInsertionEffect: ya, useTransition: Wl, useDeferredValue: Gl, useSyncExternalStore: Xe, startTransition: Ul, useRef: k, useImperativeHandle: va, useMemo: j, useCallback: Ve, useContext: X, useDebugValue: Kl, version: "18.3.1", Children: $m, render: Wm, hydrate: Vm, unmountComponentAtNode: th, createPortal: _a, createElement: Ee, createContext: be, createFactory: Zm, cloneElement: eh, createRef: Om, Fragment: D, isValidElement: Ho, isElement: ah, isFragment: Jm, isMemo: Qm, findDOMNode: nh, Component: xe, PureComponent: Dr, memo: Rm, forwardRef: Vl, flushSync: rh, unstable_batchedUpdates: oh, StrictMode: D, Suspense: vn, SuspenseList: hn, lazy: Zl, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Ym };
function sh(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Fi(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var o in t) if (o !== "__source" && e[o] !== t[o]) return !0;
  return !1;
}
function Bi(e, t) {
  this.props = e, this.context = t;
}
(Bi.prototype = new xe()).isPureReactComponent = !0, Bi.prototype.shouldComponentUpdate = function(e, t) {
  return Fi(this.props, e) || Fi(this.state, t);
};
var Ki = N.__b;
N.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Ki && Ki(e);
};
var lh = N.__e;
N.__e = function(e, t, n, o) {
  if (e.then) {
    for (var r, a = t; a = a.__; ) if ((r = a.__c) && r.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k || []), r.__c(e, t);
  }
  lh(e, t, n, o);
};
var ji = N.unmount;
function Ql(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(o) {
    typeof o.__c == "function" && o.__c();
  }), e.__c.__H = null), (e = sh({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(o) {
    return Ql(o, t, n);
  })), e;
}
function ec(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(o) {
    return ec(o, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function fr() {
  this.__u = 0, this.o = null, this.__b = null;
}
function tc(e) {
  var t = e.__ && e.__.__c;
  return t && t.__a && t.__a(e);
}
function Vn() {
  this.i = null, this.l = null;
}
N.unmount = function(e) {
  var t = e.__c;
  t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), ji && ji(e);
}, (fr.prototype = new xe()).__c = function(e, t) {
  var n = t.__c, o = this;
  o.o == null && (o.o = []), o.o.push(n);
  var r = tc(o.__v), a = !1, s = function() {
    a || o.__z || (a = !0, n.__R = null, r ? r(d) : d());
  };
  n.__R = s;
  var l = n.__P;
  n.__P = null;
  var d = function() {
    if (!--o.__u) {
      if (o.state.__a) {
        var c = o.state.__a;
        o.__v.__k[0] = ec(c, c.__c.__P, c.__c.__O);
      }
      var p;
      for (o.setState({ __a: o.__b = null }); p = o.o.pop(); ) p.__P = l, p.forceUpdate();
    }
  };
  o.__u++ || 32 & t.__u || o.setState({ __a: o.__b = o.__v.__k[0] }), e.then(s, s);
}, fr.prototype.componentWillUnmount = function() {
  this.o = [];
}, fr.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), o = this.__v.__k[0].__c;
      this.__v.__k[0] = Ql(this.__b, n, o.__O = o.__P);
    }
    this.__b = null;
  }
  var r = t.__a && Ee(D, null, e.fallback);
  return r && (r.__u &= -33), [Ee(D, null, t.__a ? null : e.children), r];
};
var Hi = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
(Vn.prototype = new xe()).__a = function(e) {
  var t = this, n = tc(t.__v), o = t.l.get(e);
  return o[0]++, function(r) {
    var a = function() {
      t.props.revealOrder ? (o.push(r), Hi(t, e, o)) : r();
    };
    n ? n(a) : a();
  };
}, Vn.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = Re(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, Vn.prototype.componentDidUpdate = Vn.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    Hi(e, n, t);
  });
};
var ch = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, dh = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, uh = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, ph = /[A-Z0-9]/g, fh = typeof document < "u", mh = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
function hh(e, t, n) {
  return t.__k == null && (t.textContent = ""), Rt(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
xe.prototype.isReactComponent = !0, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(xe.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var Ui = N.event;
N.event = function(e) {
  return Ui && (e = Ui(e)), e.persist = function() {
  }, e.isPropagationStopped = function() {
    return this.cancelBubble;
  }, e.isDefaultPrevented = function() {
    return this.defaultPrevented;
  }, e.nativeEvent = e;
};
var gh = { configurable: !0, get: function() {
  return this.class;
} }, Gi = N.vnode;
N.vnode = function(e) {
  typeof e.type == "string" && (function(t) {
    var n = t.props, o = t.type, r = {}, a = o.indexOf("-") == -1;
    for (var s in n) {
      var l = n[s];
      if (!(s === "value" && "defaultValue" in n && l == null || fh && s === "children" && o === "noscript" || s === "class" || s === "className")) {
        var d = s.toLowerCase();
        s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && l === !0 ? l = "" : d === "translate" && l === "no" ? l = !1 : d[0] === "o" && d[1] === "n" ? d === "ondoubleclick" ? s = "ondblclick" : d !== "onchange" || o !== "input" && o !== "textarea" || mh(n.type) ? d === "onfocus" ? s = "onfocusin" : d === "onblur" ? s = "onfocusout" : uh.test(s) && (s = d) : d = s = "oninput" : a && dh.test(s) ? s = s.replace(ph, "-$&").toLowerCase() : l === null && (l = void 0), d === "oninput" && r[s = d] && (s = "oninputCapture"), r[s] = l;
      }
    }
    o == "select" && (r.multiple && Array.isArray(r.value) && (r.value = Re(n.children).forEach(function(c) {
      c.props.selected = r.value.indexOf(c.props.value) != -1;
    })), r.defaultValue != null && (r.value = Re(n.children).forEach(function(c) {
      c.props.selected = r.multiple ? r.defaultValue.indexOf(c.props.value) != -1 : r.defaultValue == c.props.value;
    }))), n.class && !n.className ? (r.class = n.class, Object.defineProperty(r, "className", gh)) : n.className && (r.class = r.className = n.className), t.props = r;
  })(e), e.$$typeof = ch, Gi && Gi(e);
};
var Wi = N.__r;
N.__r = function(e) {
  Wi && Wi(e), e.__c;
};
var Vi = N.diffed;
N.diffed = function(e) {
  Vi && Vi(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
function bh(e) {
  return !!e.__k && (Rt(null, e), !0);
}
function vh(e) {
  return {
    // eslint-disable-next-line
    render: function(t) {
      hh(t, e);
    },
    // eslint-disable-next-line
    unmount: function() {
      bh(e);
    }
  };
}
var wh = 0;
function i(e, t, n, o, r, a) {
  t || (t = {});
  var s, l, d = t;
  if ("ref" in d) for (l in d = {}, t) l == "ref" ? s = t[l] : d[l] = t[l];
  var c = { type: e, props: d, key: n, ref: s, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --wh, __i: -1, __u: 0, __source: r, __self: a };
  if (typeof e == "function" && (s = e.defaultProps)) for (l in s) d[l] === void 0 && (d[l] = s[l]);
  return N.vnode && N.vnode(c), c;
}
const qi = /* @__PURE__ */ new Set();
function nc() {
  try {
    return !1;
  } catch {
    return !0;
  }
}
function Rn(e, t) {
  !nc() || qi.has(e) || (qi.add(e), console.warn(`[embedpdf] ${t}`));
}
const oc = be(null), yh = be(null);
function dt() {
  const e = X(oc);
  if (!e) throw new Error("useKernel must be used within <Viewer>/<EmbedPDF>");
  return e;
}
const qe = (e, t) => e === t || e.length === t.length && e.every((n, o) => n === t[o]);
function le(e, t = Object.is) {
  const n = dt(), o = k(null), r = () => {
    const a = e(n);
    return o.current && t(o.current.v, a) ? o.current.v : (o.current = { v: a }, a);
  };
  return Xe(n.subscribe, r);
}
function _h() {
  return le((e) => e.documents.getActiveId());
}
function _e() {
  const e = Ze(), t = _h();
  return e ?? t;
}
function Ze() {
  return X(yh);
}
function xh({ fallback: e = null, locked: t, error: n, children: o }) {
  const r = _o();
  return r.status === "ready" ? /* @__PURE__ */ i(D, { children: o }) : r.status === "locked" && t ? /* @__PURE__ */ i(D, { children: t(r) }) : r.status === "error" && n ? /* @__PURE__ */ i(D, { children: n(r) }) : /* @__PURE__ */ i(D, { children: e });
}
function U(e) {
  const t = dt(), n = ee(e);
  return n || (t.scopeOf(e) === "document" ? ff(t, e) : t.capability(e));
}
function ee(e) {
  const t = Ze();
  return le((n) => n.tryCapability(e, t ?? void 0));
}
function V(e, t, n = Object.is) {
  const o = dt(), r = Ze(), a = ee(e) ?? o.capability(e, r ?? void 0), s = k(null), l = () => {
    const d = t(a);
    return s.current && n(s.current.v, d) ? s.current.v : (s.current = { v: d }, d);
  };
  return Xe(o.subscribe, l);
}
function ae(e, t, n, o = Object.is) {
  const r = dt(), a = ee(e), s = k(null), l = () => {
    let d;
    if (a === null)
      d = n;
    else
      try {
        d = t(a);
      } catch {
        d = n;
      }
    return s.current && o(s.current.v, d) ? s.current.v : (s.current = { v: d }, d);
  };
  return Xe(r.subscribe, l);
}
function ka(e, t, n) {
  const o = ee(e), r = k(n);
  r.current = n;
  const a = k(t);
  a.current = t, E(() => {
    if (o)
      return a.current(o)((s) => r.current(s));
  }, [o]);
}
function Sa() {
  return U(Pe);
}
function rc(e, t, n, o) {
  const r = Ze();
  return le((a) => {
    const s = a.tryCapability(e, r ?? void 0), l = s ? t(s) : n;
    return o ? o(l) : l;
  }, En);
}
function _o(e) {
  return rc(Pe, mi.read, mi.empty, e);
}
function Uo(e) {
  return rc(Pe, fi.read, fi.empty, e);
}
const kh = Object.freeze([]);
function Sh() {
  const e = _e();
  return le(
    (t) => e ? t.documents.listPages(e) : kh
  );
}
function Dt(e) {
  return le((t) => {
    const n = t.getSettings();
    return e ? e(n) : n;
  }, En);
}
const Mh = Vl(function({
  engine: t,
  plugins: n,
  initialDocuments: o,
  fallback: r,
  renderError: a,
  onReady: s,
  identity: l,
  scope: d,
  accent: c,
  page: p,
  fetch: f,
  children: u
}, m) {
  const g = k({ engine: t, plugins: n, initialDocuments: o }), h = mf({ identity: l, scope: d, accent: c, page: p }), b = k(h);
  b.current = h;
  const y = k(!1);
  nc() && !y.current && (g.current.engine !== t || g.current.plugins !== n) && (y.current = !0, console.warn(
    "[embedpdf] <Viewer> engine/plugins are init-only. A changed identity is ignored — pass stable references (module scope, useState, or useMemo). An inline `plugins={[...]}` array recreates its identity every render."
  ));
  const [v, _] = C({ phase: "booting", kernel: null }), P = k(s);
  P.current = s;
  const S = k(f);
  S.current = f, va(
    m,
    () => v.phase === "ready" ? v.kernel : null,
    [v]
  ), E(() => {
    const O = g.current, M = typeof O.engine == "function", T = M ? O.engine() : O.engine;
    _l(T) && T.warmup();
    let L;
    try {
      L = hf({
        engine: T,
        plugins: O.plugins,
        settings: b.current,
        clock: Du(),
        printer: Ru(),
        measurer: Iu(),
        fetch: (I, K) => (S.current ?? globalThis.fetch)(I, K)
      });
    } catch (I) {
      _({ phase: "error", error: I }), M && T.destroy();
      return;
    }
    let B = !0;
    return _({ phase: "booting", kernel: L }), L.start().then(
      () => {
        B && (P.current?.(L), _({ phase: "ready", kernel: L }), L.documents.openAll(O.initialDocuments ?? []));
      },
      (I) => {
        B && _({ phase: "error", error: I });
      }
    ), () => {
      B = !1, L.destroy().then(() => {
        M && T.destroy();
      });
    };
  }, []);
  const x = v.phase === "error" ? null : v.kernel;
  return E(() => {
    x?.updateSettings(b.current);
  }), v.phase === "error" ? /* @__PURE__ */ i(D, { children: a ? a(v.error) : null }) : v.kernel ? /* @__PURE__ */ i(oc.Provider, { value: v.kernel, children: v.phase === "ready" ? u : r ?? null }) : null;
}), ac = be(null), Oh = ac.Provider;
function ze() {
  const e = X(ac);
  if (!e) throw new Error("usePage must be used inside <PageView> or a <Stage> page");
  return e;
}
const Ma = be(null), Ph = Ma.Provider, ic = be(null), Th = ic.Provider;
function Ch() {
  return X(Ma);
}
function sc() {
  const e = X(Ma);
  if (!e)
    throw new Error(
      "No ViewProjector in scope: mount anchored UI under <Stage> (overlay slot) or <PageView>."
    );
  return e;
}
function Go(e) {
  const t = X(ic);
  return !e.anchor?.bounds || t && !t.has(e.anchor.page.objectNumber) ? null : /* @__PURE__ */ i(Eh, { ...e });
}
function Eh({
  anchor: e,
  placement: t = "top",
  gap: n = 8,
  pinned: o = !1,
  children: r
}) {
  const { projector: a, subscribe: s } = sc(), [l, d] = C(null), [c, p] = C(null), [, f] = kt((g) => g + 1, 0);
  if (R(() => s ? s(f) : void 0, [s]), R(() => {
    a.space === "client" && f();
  }, [a, e]), R(() => {
    if (l)
      return $u(
        l,
        a.space,
        (g) => p((h) => zu(h, g) ? h : g)
      );
  }, [l, a.space]), E(() => {
    if (!l) return;
    const g = (h) => h.stopPropagation();
    return l.addEventListener("pointerdown", g), () => l.removeEventListener("pointerdown", g);
  }, [l]), !e?.bounds) return null;
  const u = Fu(
    a,
    { ...e, bounds: e.bounds },
    { placement: t, gap: n, pinned: o },
    c
  );
  if (!u) return null;
  const m = /* @__PURE__ */ i(
    "div",
    {
      ref: d,
      "data-placement": u.placement,
      style: {
        position: a.space === "client" ? "fixed" : "absolute",
        left: u.left,
        top: u.top,
        // Its own width, wherever it sits: the size the placement measured.
        width: "max-content",
        transform: u.transform,
        pointerEvents: "auto"
      },
      children: r
    }
  );
  return a.space === "client" ? typeof document > "u" ? null : _a(m, document.body) : m;
}
const lc = be(null);
function Ah({ token: e, children: t }) {
  return /* @__PURE__ */ i(lc.Provider, { value: e, children: t });
}
function $t(e) {
  const t = X(lc);
  return e ?? t ?? xl;
}
const Nh = Object.freeze({
  scrollLeft: 0,
  scrollTop: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  clientWidth: 0,
  clientHeight: 0,
  scrollableX: !1,
  scrollableY: !1
});
function Lh(e) {
  const t = cc($t(e)), n = Ze();
  return le(
    (o) => o.tryCapability(t, n ?? void 0)?.getScrollMetrics() ?? Nh
  );
}
const cc = (e) => e;
function $r({
  axis: e,
  token: t,
  autoHide: n = 1200,
  minThumbSize: o = 24,
  trackPress: r = "page",
  className: a,
  style: s,
  thumbClassName: l,
  thumbStyle: d
}) {
  const c = $t(t), p = U(cc(c)), f = Lh(c), u = e === "y", m = u ? f.scrollableY : f.scrollableX, g = k(null), [h, b] = C(0), [y, v] = C(!1), [_, P] = C(!1), [S, x] = C(!0), O = di(f, u, h, o), M = n === !1 ? 0 : n;
  E(() => {
    if (!M) return;
    x(!0);
    const te = setTimeout(() => x(!1), M);
    return () => clearTimeout(te);
  }, [f, M]);
  const T = !M || S || _ || y;
  E(() => {
    const te = g.current;
    if (!te) return;
    const Fe = () => b(u ? te.clientHeight : te.clientWidth), ne = new ResizeObserver(Fe);
    return ne.observe(te), Fe(), () => ne.disconnect();
  }, [u, m]);
  const L = j(() => Bu(v), []), B = () => ({
    stage: p,
    vertical: u,
    element: g.current,
    layout: O,
    // Fresh geometry for paging steps — read from the capability, never a stale render.
    liveLayout: () => di(p.getScrollMetrics(), u, h, o)
  });
  if (E(() => () => L.release(), [L]), !m) return null;
  const I = u ? { position: "absolute", top: 0, right: 0, bottom: 0, width: 12 } : { position: "absolute", left: 0, right: 0, bottom: 0, height: 12 }, K = u ? {
    position: "absolute",
    left: 2,
    right: 2,
    top: O.thumbPosition,
    height: O.thumbLength
  } : {
    position: "absolute",
    top: 2,
    bottom: 2,
    left: O.thumbPosition,
    width: O.thumbLength
  };
  return /* @__PURE__ */ i(
    "div",
    {
      ref: g,
      role: "scrollbar",
      "aria-orientation": u ? "vertical" : "horizontal",
      "aria-valuemin": 0,
      "aria-valuemax": Math.round(O.maxOffset),
      "aria-valuenow": Math.round(O.offset),
      "data-embedpdf-scrollbar": "",
      "data-axis": e,
      "data-state": T ? "visible" : "hidden",
      "data-dragging": y ? "" : void 0,
      className: a,
      style: {
        ...I,
        touchAction: "none",
        userSelect: "none",
        opacity: T ? 1 : 0,
        transition: "opacity 200ms",
        // a hidden overlay bar must not eat the clicks under it
        pointerEvents: T ? "auto" : "none",
        ...s
      },
      onPointerDown: (te) => L.pressTrack(te, B(), r),
      onPointerMove: (te) => L.move(te, B()),
      onPointerUp: () => L.release(),
      onPointerCancel: () => L.release(),
      onPointerEnter: () => P(!0),
      onPointerLeave: () => P(!1),
      children: /* @__PURE__ */ i(
        "div",
        {
          "data-embedpdf-scrollbar-thumb": "",
          className: l,
          style: {
            ...K,
            borderRadius: 6,
            background: Cn("scrollbar-thumb"),
            ...d
          },
          onPointerDown: (te) => L.pressThumb(te, B())
        }
      )
    }
  );
}
function Ih({
  documentId: e,
  page: t,
  frame: n,
  stage: o,
  render: r,
  chrome: a
}) {
  const s = k(null), l = t.transform, d = Dt((m) => m.page), c = Hu(l, n, { x: t.screenX, y: t.screenY }), p = t.ref.objectNumber, f = j(() => ho(p), [p]), u = j(
    () => Uu(
      e,
      // the hosting lens — per-view raster planning keys tile state by it,
      // so a thumbnail rail and the main view never fight over one plan
      o.getLensId(),
      f,
      t.pageIndex,
      n,
      l,
      () => s.current.getBoundingClientRect(),
      () => Gu(o, p, l.deviceWidth)
    ),
    [e, f, p, t.pageIndex, n, l, o]
  );
  return /* @__PURE__ */ i("div", { style: { position: "absolute", ...c.outer }, children: /* @__PURE__ */ i(Oh, { value: u, children: [
    /* @__PURE__ */ i(
      "div",
      {
        style: {
          position: "absolute",
          ...c.shadow,
          boxShadow: We("page-shadow", d.shadow)
        }
      }
    ),
    /* @__PURE__ */ i(
      "div",
      {
        ref: s,
        style: {
          position: "absolute",
          ...c.content,
          background: We("page-background", d.background),
          transform: c.turn ?? void 0,
          // We render our own selection highlights — suppress native text/image
          // selection (and the double-click image grab) on the whole page subtree.
          userSelect: "none",
          WebkitUserSelect: "none"
        },
        children: r(u)
      }
    ),
    a?.(u)
  ] }) });
}
function Rh({ token: e }) {
  const n = V(e, (a) => a.getZoomBox()), o = V(e, (a) => a.getSettings().zoomBox), r = Dt((a) => a.accent);
  return n ? /* @__PURE__ */ i(
    "svg",
    {
      "aria-hidden": !0,
      width: n.width,
      height: n.height,
      style: {
        position: "absolute",
        left: n.x,
        top: n.y,
        overflow: "visible",
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ i(
        "rect",
        {
          width: n.width,
          height: n.height,
          strokeWidth: 1,
          strokeDasharray: Wu,
          style: Vu(o, r)
        }
      )
    }
  ) : null;
}
function dc({
  children: e,
  pageChrome: t,
  overlay: n,
  tool: o,
  onToolChange: r,
  token: a,
  className: s,
  style: l
}) {
  const d = $t(a), c = U(d), p = ee(jo);
  E(() => {
    o === void 0 || !p || p.getActiveToolId() !== o && p.activateTool(o);
  }, [o, p]), ka(
    Er,
    (M) => M.onToolChanged,
    (M) => r?.(M.toolId)
  );
  const f = V(d, (M) => M.getSettings().interaction), u = V(d, (M) => M.getSettings().panFallback), m = V(d, (M) => M.getSettings().zoomGestures), g = f && !!p, h = le(() => p?.getCursor() ?? "default"), b = k(null), y = _e(), v = V(d, (M) => M.listVisiblePages()), _ = V(
    d,
    (M) => M.getSettings().pageFrame,
    (M, T) => M.top === T.top && M.right === T.right && M.bottom === T.bottom && M.left === T.left
  ), P = j(() => Ku(() => c), [c]), S = j(
    () => ({ projector: P, revision: v }),
    [P, v]
  ), x = v.map((M) => M.ref.objectNumber).join(","), O = j(
    () => new Set(x ? x.split(",").map(Number) : []),
    [x]
  );
  return R(() => {
    const M = b.current, T = ju(M, c, {
      hub: g ? p : null,
      source: c.getLensId(),
      zoomGestures: m
    }), L = g && p ? p.registerHandler(Mf(c, p, { panFallback: u }), {
      source: c.getLensId()
    }) : null, B = g && p ? p.registerHandler(Of(c, p), { source: c.getLensId() }) : null;
    return () => {
      B?.(), L?.(), T();
    };
  }, [c, p, g, m, u]), /* @__PURE__ */ i(
    "div",
    {
      ref: b,
      className: s,
      style: {
        position: "relative",
        overflow: "hidden",
        touchAction: "none",
        ...g ? { cursor: h } : null,
        ...l
      },
      children: /* @__PURE__ */ i(Ah, { token: d, children: [
        v.map((M) => /* @__PURE__ */ i(
          Ih,
          {
            documentId: y ?? "",
            page: M,
            frame: _,
            stage: c,
            render: e,
            chrome: t
          },
          M.ref.objectNumber
        )),
        /* @__PURE__ */ i(Rh, { token: d }),
        /* @__PURE__ */ i(Th, { value: O, children: /* @__PURE__ */ i(Ph, { value: S, children: n }) })
      ] })
    }
  );
}
function Yi(e) {
  return U($t(e));
}
function Xt(e, t) {
  const n = $t(t), o = Ze();
  return le((r) => {
    const a = r.tryCapability(n, o ?? void 0), s = a ? gi.read(a) : gi.empty;
    return e ? e(s) : s;
  }, En);
}
function uc(e, t) {
  ya(() => Io(e).paint(t), [e, t]);
}
function Dh(e) {
  const t = Io(e);
  return Xe(t.subscribe, t.painted, t.painted);
}
function Ae(e) {
  const { ensure: t } = e, n = function(r) {
    const a = Ze();
    return le((s) => {
      const l = s.tryCapability(e.token, a ?? void 0), d = l ? e.read(l) : e.empty;
      return r ? r(d) : d;
    }, En);
  };
  return t ? function(r) {
    const a = Ze(), s = le(
      (l) => l.tryCapability(e.token, a ?? void 0),
      Object.is
    );
    return E(() => {
      s && t(s).catch(() => {
      });
    }, [s]), n(r);
  } : n;
}
function an(e) {
  return function(n) {
    return le((o) => {
      const r = o.settingsOf(e).getSettings();
      return n ? n(r) : r;
    }, En);
  };
}
const $h = an(en), zh = Object.freeze({ status: "idle", slow: !1 });
function Fh() {
  const e = ze();
  return ae(
    en,
    (t) => t.getPictureState(e.ref, e.view),
    zh
  );
}
let Xi = !1;
function pc(e = {}) {
  const t = ze(), n = V(Ke, (o) => o.getPicturePainter());
  return n?.paints(t.view) ? /* @__PURE__ */ i(Bh, { painter: n }) : /* @__PURE__ */ i(Kh, { ...e });
}
function Bh({ painter: e }) {
  const t = ze(), n = k(null), o = U(Ke), r = k(null);
  return R(() => {
    const a = o.reportPicture(t.view, t.ref);
    return r.current = { picture: e.paint(n.current, t, a), page: t }, () => {
      r.current?.picture.destroy(), r.current = null, a.close();
    };
  }, [o, e, t.ref]), R(() => {
    const a = r.current;
    !a || a.page === t || (a.page = t, a.picture.update(t));
  }, [t]), /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }
    }
  );
}
function Kh({
  annotations: e,
  formFields: t,
  tiles: n = !0,
  thumbnail: o = !1
}) {
  const r = ze(), a = U(Ke), s = V(Ke, (h) => h.getPaintSettings()), l = k(null), d = k(null), c = { annotations: e, formFields: t }, p = Dh(r.ref), f = V(Ke, (h) => h.getLayerRights()), u = dl(p, c, f);
  Xu(p, c).length > 0 && Rn(
    "render-layer-draws-what-a-layer-paints",
    "<RenderLayer annotations> or <RenderLayer formFields> draws what an <AnnotationLayer> or a <FormLayer> on the page paints too, so it shows twice. Leave the prop out: the picture leaves out what a layer paints."
  );
  const m = o ? { thumbnail: !0 } : {}, g = V(
    Ke,
    (h) => h.getSourceKey(r.ref, { scale: r.transform.renderScale, ...m, ...u })
  );
  return R(() => {
    const h = a.reportPicture(r.view, r.ref);
    d.current = h;
    const b = Zu(l.current, () => h.shown());
    return () => {
      b(), h.close(), d.current === h && (d.current = null);
    };
  }, [a, r.view, r.ref]), E(() => {
    if (Io(r.ref).painted() !== p) return;
    const h = new AbortController();
    let b;
    return (async () => {
      try {
        const v = await (await a.renderSource(r.ref, {
          scale: r.transform.renderScale,
          ...m,
          ...u,
          view: r.view,
          signal: h.signal
        })).objectUrl().abortWith(h.signal);
        if (h.signal.aborted) {
          v.revoke();
          return;
        }
        b = v.revoke, l.current && (l.current.src = v.url);
      } catch (y) {
        h.signal.aborted || d.current?.failed(y);
      }
    })(), () => {
      h.abort(), b?.();
    };
  }, [a, r.ref, g, p]), /* @__PURE__ */ i(D, { children: [
    /* @__PURE__ */ i(
      "img",
      {
        ref: l,
        alt: "",
        draggable: !1,
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }
      }
    ),
    n && !o && s.tiles ? /* @__PURE__ */ i(jh, { parts: c }) : null
  ] });
}
function jh({ parts: e }) {
  const t = ze(), n = U(Ke), o = t.getViewDemand?.() ?? {
    desiredDeviceWidth: t.transform.deviceWidth
  }, r = j(() => n.createViewDemand(t.view), [n, t.view]);
  E(() => () => r.destroy(), [r]), R(() => {
    const d = Io(t.ref).painted(), c = dl(d, e, n.getLayerRights());
    r.setDemand(t.ref, o, c);
  });
  const a = V(Ke, () => r.getPlan(t.ref));
  if (E(() => () => r.release(t.ref), [r, t.ref]), a.paint.length === 0) return null;
  const s = t.transform, l = s.viewScale;
  return /* @__PURE__ */ i(
    "div",
    {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: s.contentWidth,
        height: s.contentHeight,
        pointerEvents: "none",
        // Stacking contract: tile <img>s carry zIndex ranks (coarse under
        // fine) that exist only while generations are mixed — mid-zoom. This
        // container must be a stacking context so those ranks stay internal;
        // without it they join the Stage's context and paint above every
        // z-auto sibling (annotations, page chrome, menus) exactly while
        // zooming. The old scaled container created one implicitly via its
        // transform; `isolation` is the explicit, no-side-effect way.
        isolation: "isolate"
      },
      children: a.paint.map((d) => /* @__PURE__ */ i(
        Hh,
        {
          source: d,
          view: {
            x: d.rect.x * l,
            y: d.rect.y * l,
            width: d.rect.width * l,
            height: d.rect.height * l
          },
          onPainted: () => r.markPainted(t.ref, d.key),
          onUnpainted: () => r.markUnpainted(t.ref, d.key)
        },
        d.key
      ))
    }
  );
}
function Hh({
  source: e,
  view: t,
  onPainted: n,
  onUnpainted: o
}) {
  const r = k(null);
  return R(() => {
    if (r.current)
      return Ju(r.current, e.handle, { onPainted: n, onUnpainted: o });
  }, [e.handle]), /* @__PURE__ */ i(
    "img",
    {
      ref: r,
      alt: "",
      draggable: !1,
      onLoad: (a) => {
        const s = a.currentTarget.naturalWidth;
        if (s > 0 && !Xi) {
          const l = Math.round(e.rect.width * e.scale);
          Math.abs(s - l) > 1 && (Xi = !0, console.warn(
            `[render] tile bitmap ${s}px wide does not match its rect (expected ~${l}px) — stale raster identity? key=${e.key}`
          ));
        }
      },
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.width,
        height: t.height,
        zIndex: e.z
      }
    }
  );
}
function Uh() {
  return ae(en, (e) => e.getSnapshot(), null);
}
function Gh({ children: e, gap: t = 8, placement: n = "bottom" }) {
  const o = Uh(), r = j(
    () => o && { page: o.page, bounds: o.rect },
    [o]
  );
  return r ? /* @__PURE__ */ i(Go, { anchor: r, placement: n, gap: t, children: e }) : null;
}
function Wh() {
  const e = ze(), t = ae(Ke, (d) => d.getSnapshotBox(e.ref), null), n = $h((d) => d.snapshot.box), o = Dt((d) => d.accent);
  if (!t) return null;
  const { left: r, top: a, width: s, height: l } = Qt(t, e.transform);
  return /* @__PURE__ */ i(
    "svg",
    {
      "aria-hidden": !0,
      width: s,
      height: l,
      style: { position: "absolute", left: r, top: a, overflow: "visible", pointerEvents: "none" },
      children: /* @__PURE__ */ i(
        "rect",
        {
          width: s,
          height: l,
          strokeWidth: 1,
          strokeDasharray: qu,
          style: Yu(n, o)
        }
      )
    }
  );
}
function Vh() {
  return U(Ko);
}
const qh = Ae(Jf);
function W_() {
  return U(Fo);
}
const Yh = Ae(qf);
function V_() {
  return U(Bo);
}
const fc = Ae(Xf), Xh = Ae(xf);
function Zh(e) {
  const t = ee(jo), n = e && JSON.stringify(e), o = k(e);
  o.current = e, E(() => {
    const r = o.current;
    if (!(!r || !t))
      return t.setToolCursor(r.toolId, Qu(r.cursors)), () => t.setToolCursor(r.toolId, null);
  }, [t, n]);
}
function Jh() {
  const e = ze(), t = U(Ht), n = V(
    Ht,
    (l) => l.listSegments(e.ref),
    qe
  ), o = V(Ht, (l) => l.isHighlightVisible()), r = hc((l) => l.color), a = Dt((l) => l.accent);
  if (E(() => {
    t.ensureLoaded(e.ref);
  }, [t, e.ref]), !o) return null;
  const s = We("text-selection", r ?? tp("text-selection", a));
  return /* @__PURE__ */ i(
    "svg",
    {
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none"
      },
      children: n.map((l, d) => (
        // Page space → the page layer's pixels, which ride the page's CSS
        // rotation: mapping the four corners is exact, for turned text too.
        /* @__PURE__ */ i(
          "polygon",
          {
            points: np(op(l.quad, e.transform)),
            style: { fill: s }
          },
          d
        )
      ))
    }
  );
}
const mc = Ae(Uf), hc = an(Nn);
function Qh({ children: e, gap: t = 8, placement: n = "top" }) {
  const o = mc((a) => a.isSelecting), r = V(Nn, (a) => a.getAnchor(), ap);
  return o || !r ? null : /* @__PURE__ */ i(Go, { anchor: r, placement: n, gap: t, children: e });
}
function eg({ token: e } = {}) {
  const t = $t(e), n = U(Ht), o = ee(t), r = Ch();
  (!r || r.projector.space !== "overlay") && Rn(
    "selection-handles-outside-stage",
    "<SelectionHandles> renders nothing here: mount it in the <Stage> overlay slot (a <PageView> has no camera to project the handles through)."
  );
  const a = mc((v) => v.isSelecting), s = V(Ht, (v) => v.isHighlightVisible()), l = hc((v) => v.handles), d = Dt((v) => v.accent), c = V(
    Ht,
    (v) => Gf(v.getSnapshot()),
    ip
  );
  le(() => o?.listVisiblePages() ?? null);
  const [p, f] = C(null), u = k(
    null
  );
  u.current = o && c ? { stage: o, endpoints: c } : null;
  const m = j(() => {
    const v = {}, _ = (P) => (S) => {
      v[P]?.(), delete v[P], S && (v[P] = rp(S, {
        arm: () => {
          const x = u.current;
          if (!x) return null;
          const O = Hf(
            n,
            vi(x.stage),
            x.endpoints,
            P
          );
          return O ? (f(P), {
            // the point the user grabbed: the bar's midpoint
            base: O.base,
            session: {
              move: O.drag.move,
              end: () => {
                O.drag.end(), f(null);
              }
            }
          }) : null;
        }
      }));
    };
    return { start: _("start"), end: _("end") };
  }, [n]);
  if (!o || !c || !s || a && !p) return null;
  const g = vi(o), h = We("text-selection-handle", l.color ?? d), b = We("text-selection-handle-shadow", l.shadow), y = (v) => {
    const _ = Wf(g, c[v], v);
    if (!_) return null;
    const P = Pt + (v === "start" ? dn : 0), S = Pt + Gn / 2;
    return /* @__PURE__ */ i(
      "div",
      {
        ref: m[v],
        style: {
          position: "absolute",
          left: _.bar.from.x - S,
          top: _.bar.from.y - P,
          width: Gn + 2 * Pt,
          height: _.length + dn + 2 * Pt,
          // Upright text carries no transform — pixel-identical to an
          // axis-aligned box (the geometry's float-noise guard decides).
          ..._.upright ? null : {
            transform: `rotate(${_.rotation}deg)`,
            transformOrigin: `${S}px ${P}px`
          },
          touchAction: "none",
          cursor: "grab",
          pointerEvents: "auto"
        },
        children: [
          /* @__PURE__ */ i(
            "div",
            {
              style: {
                position: "absolute",
                left: Pt,
                top: P,
                width: Gn,
                height: _.length,
                background: h,
                borderRadius: Gn / 2
              }
            }
          ),
          /* @__PURE__ */ i(
            "div",
            {
              style: {
                position: "absolute",
                left: S - dn / 2,
                top: v === "start" ? Pt : Pt + _.length,
                width: dn,
                height: dn,
                borderRadius: "50%",
                background: h,
                boxShadow: b
              }
            }
          )
        ]
      },
      v
    );
  };
  return /* @__PURE__ */ i(D, { children: [
    y("start"),
    y("end")
  ] });
}
function tg({ prefetch: e, onRefused: t, target: n } = {}) {
  const o = ee(Nn), r = k(t);
  return r.current = t, E(() => {
    const a = n ? n.current : void 0;
    if (!(!o || a === null))
      return ep(o, {
        ...e === void 0 ? {} : { prefetch: e },
        ...a ? { target: a } : {},
        onRefused: () => r.current?.()
      });
  }, [o, e, n]), null;
}
function Wo(e) {
  const [t] = C(() => sp());
  E(() => () => t.release(), [t]), E(() => t.mount(e));
}
const ng = Ae(mm), gc = an(Sl), bc = Number.parseInt(Xm, 10) >= 19 ? { inert: !0 } : { inert: "true" };
function vc({ shapes: e }) {
  return Wo(lp(e)), /* @__PURE__ */ i(D, { children: yc(e) });
}
const wc = (e) => e.replace(/-([a-z])/g, (t, n) => n.toUpperCase());
function og(e) {
  return Object.fromEntries(
    Object.entries(e).map(([t, n]) => [wc(t), n])
  );
}
function rg(e) {
  return Object.fromEntries(
    Object.entries(e).map(([t, n]) => [wc(t), n])
  );
}
function yc(e) {
  return e.map(
    (t, n) => ih.createElement(
      t.tag,
      {
        key: n,
        ...og(t.attributes),
        ...t.style ? { style: rg(t.style) } : {}
      },
      t.children ? yc(t.children) : t.text
    )
  );
}
function ag({ children: e, gap: t = 15, placement: n = "top" }) {
  const { projector: o } = sc(), r = ae(
    Ue,
    (a) => {
      const s = a.selection.getAnchor();
      if (!s) return null;
      const l = o.viewEnv(s.page);
      return l ? a.getSelectionAnchorIn(l) : s;
    },
    null,
    cp
  );
  return r ? /* @__PURE__ */ i(
    Go,
    {
      anchor: {
        page: r.page,
        bounds: r.bounds,
        ...r.rotationHandle ? { avoid: [r.rotationHandle] } : {}
      },
      placement: n,
      gap: t,
      children: e
    }
  ) : null;
}
function ig({
  children: e,
  gap: t = 16,
  placement: n = "right"
}) {
  const o = ae(
    Sl,
    (a) => a.selection.getRotationAnchor(),
    null,
    dp
  ), r = gc((a) => a.chrome.readout);
  return !o || !e && !r.enabled ? null : /* @__PURE__ */ i(
    Go,
    {
      anchor: { page: o.page, bounds: { ...o.at, width: 0, height: 0 } },
      placement: n,
      gap: t,
      children: e ? e(o) : /* @__PURE__ */ i(
        "div",
        {
          style: {
            pointerEvents: "none",
            whiteSpace: "nowrap",
            borderRadius: 4,
            padding: "2px 6px",
            fontFamily: Cn("font-mono"),
            fontSize: 12,
            background: We("readout-background", r.background),
            color: We("readout-color", r.color)
          },
          children: [
            o.angle,
            "°"
          ]
        }
      )
    }
  );
}
const sg = be(1);
function lg({
  item: e,
  page: t,
  interactive: n = !1,
  inert: o = !1,
  children: r
}) {
  const a = ml(e.frame, t.transform);
  return /* @__PURE__ */ i(
    "div",
    {
      ...o ? bc : {},
      style: {
        position: "absolute",
        left: a.left,
        top: a.top,
        width: a.width,
        height: a.height,
        transform: a.transform,
        transformOrigin: "center",
        // On the frame: a turned frame groups what is inside it, so blending on
        // an inner element would stop blending with the page.
        mixBlendMode: e.blend,
        // An interactive renderer takes the pointer: the layer's own `none` ends here.
        pointerEvents: n ? "auto" : "none"
      },
      children: r
    }
  );
}
function cg({ item: e }) {
  const t = yp(e.box);
  return t ? /* @__PURE__ */ i(
    "svg",
    {
      viewBox: t,
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none",
        // A ghost is see-through as a whole, so its fill and stroke don't stack.
        ...e.source === "ghost" ? { opacity: gl(e.ghostOpacity ?? 0.5) } : {}
      },
      children: /* @__PURE__ */ i(vc, { shapes: hl(pm(e), { miterLimit: kl }) })
    }
  ) : null;
}
function dg({ url: e, box: t }) {
  return /* @__PURE__ */ i(
    "img",
    {
      src: e,
      alt: "",
      draggable: !1,
      style: {
        position: "absolute",
        left: t.left,
        top: t.top,
        width: t.width,
        height: t.height,
        // The AP box is sized in content units; a global `img { max-width: 100% }`
        // reset would otherwise clamp it to the containing block and distort the
        // aspect. This bites specifically when the box is wider than that block —
        // a landscape stamp whose unrotated box overhangs a view-rotated (portrait)
        // page — so honour the explicit size.
        maxWidth: "none",
        maxHeight: "none",
        pointerEvents: "none",
        // The turn the engine took out of the raster, put back about its middle.
        transform: t.transform,
        transformOrigin: "center"
      }
    }
  );
}
function ug({ page: e }) {
  const t = U(Ue), n = V(
    Ue,
    (d) => d.getImageGhost(e.ref)
  ), o = V(Ue, (d) => d.getArmedStamp()), [r, a] = C(null), s = n ? fm(n.box.width * e.transform.renderScale) : 0;
  if (E(() => {
    if (!s) {
      a(null);
      return;
    }
    return xp(() => t.renderArmedStampPreview(s), a);
  }, [t, o, s]), !n || !r) return null;
  const l = Qt(n.box, e.transform);
  return /* @__PURE__ */ i(
    "img",
    {
      src: r,
      alt: "",
      draggable: !1,
      style: {
        position: "absolute",
        left: l.left,
        top: l.top,
        width: l.width,
        height: l.height,
        // Same explicit-size rule as BakedImage: never let a global img reset
        // clamp the box and distort the aspect.
        maxWidth: "none",
        maxHeight: "none",
        pointerEvents: "none",
        opacity: gl(n.opacity),
        ...n.rot ? { transform: `rotate(${n.rot}deg)`, transformOrigin: "center" } : {}
      }
    }
  );
}
function _c() {
  const e = gc((o) => o.chrome), t = Dt((o) => o.accent), n = j(() => Sp(e, t), [e, t]);
  return { chrome: e, painted: n };
}
function pg({
  at: e,
  size: t,
  rotation: n,
  shape: o,
  style: r
}) {
  return o === "circle" ? /* @__PURE__ */ i("circle", { cx: e.x, cy: e.y, r: t / 2, strokeWidth: 1.5, style: r }) : /* @__PURE__ */ i(
    "rect",
    {
      x: e.x - t / 2,
      y: e.y - t / 2,
      width: t,
      height: t,
      strokeWidth: 1.5,
      style: r,
      ...n ? { transform: `rotate(${n} ${e.x} ${e.y})` } : {}
    }
  );
}
function fg({
  page: e,
  components: t
}) {
  const n = e.transform.viewScale, o = e.transform.rotation, r = e.transform.zoom, a = V(
    Ue,
    (u) => u.listChromeNodes(e.ref, n, o, r),
    qe
  ), { chrome: s, painted: l } = _c(), d = t?.Handle, c = t?.RotationHandle, p = [], f = kp(a, e.transform).map((u, m) => {
    switch (u.kind) {
      case "handle":
        return d ? (p.push(
          /* @__PURE__ */ i(
            d,
            {
              at: u.at,
              size: s.handles.size,
              rotation: u.rotation,
              kind: u.role,
              active: u.active
            },
            m
          )
        ), null) : /* @__PURE__ */ i(
          pg,
          {
            at: u.at,
            size: s.handles.size,
            rotation: u.rotation,
            shape: s.handles.shape,
            style: l.handle
          },
          m
        );
      case "guide":
        return /* @__PURE__ */ i(
          "line",
          {
            x1: u.from.x,
            y1: u.from.y,
            x2: u.to.x,
            y2: u.to.y,
            shapeRendering: "crispEdges",
            style: l.guide
          },
          m
        );
      case "turned-outline":
        return /* @__PURE__ */ i("polygon", { points: u.points, fill: "none", style: l.outline }, m);
      case "rotation-guides":
        return /* @__PURE__ */ i("g", { children: u.lines.map((g, h) => /* @__PURE__ */ i(
          "line",
          {
            x1: g.from.x,
            y1: g.from.y,
            x2: g.to.x,
            y2: g.to.y,
            opacity: g.opacity,
            style: l.rotationGuide
          },
          h
        )) }, m);
      case "rotation-handle":
        return c ? (p.push(
          /* @__PURE__ */ i(
            c,
            {
              at: u.at,
              from: u.from,
              size: s.rotationHandle.size,
              rotation: 0,
              active: !1
            },
            m
          )
        ), null) : /* @__PURE__ */ i("g", { children: [
          s.rotationHandle.stalk && /* @__PURE__ */ i(
            "line",
            {
              x1: u.from.x,
              y1: u.from.y,
              x2: u.at.x,
              y2: u.at.y,
              strokeWidth: 1,
              style: { stroke: l.rotationHandle.stroke }
            }
          ),
          /* @__PURE__ */ i(
            "circle",
            {
              cx: u.at.x,
              cy: u.at.y,
              r: s.rotationHandle.size / 2,
              strokeWidth: 1.5,
              style: l.rotationHandle
            }
          )
        ] }, m);
      // The box dragged to select keeps its own look (a see-through accent
      // fill, always dashed); the selection outline follows the settings.
      case "marquee":
        return /* @__PURE__ */ i(
          "rect",
          {
            x: u.box.left,
            y: u.box.top,
            width: u.box.width,
            height: u.box.height,
            strokeWidth: 1,
            strokeDasharray: "4 3",
            style: l.marquee
          },
          m
        );
      case "outline":
        return /* @__PURE__ */ i(
          "rect",
          {
            x: u.box.left,
            y: u.box.top,
            width: u.box.width,
            height: u.box.height,
            fill: "none",
            style: l.outline
          },
          m
        );
    }
  });
  return /* @__PURE__ */ i(D, { children: [
    /* @__PURE__ */ i("svg", { style: { position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }, children: f }),
    p.length > 0 && /* @__PURE__ */ i("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: p })
  ] });
}
function mg(e, t) {
  const n = U(Ue), [o, r] = C(null), [a] = C(() => Mp());
  return E(
    () => a.follow(o, n, e, t),
    [a, n, o, e, t]
  ), E(() => () => a.detach(), [a]), r;
}
function hg({ item: e, page: t }) {
  const { painted: n } = _c();
  Wo(e.programs);
  const o = _p(e, t.transform, n.textOutline), r = mg(e, o.scale);
  return /* @__PURE__ */ i("div", { ref: r, suppressContentEditableWarning: !0, style: o.style });
}
function gg(e, t, n) {
  const o = k(t);
  o.current = t;
  const [, r] = C(0);
  E(() => {
    if (!n) return;
    const a = wp(e, n, () => o.current());
    return r((s) => s + 1), a;
  }, [e, n]);
}
function bg({ renderers: e, components: t } = {}) {
  const n = ze(), o = U(Ue);
  ae(Er, (b) => b.getActiveToolId(), "");
  const r = ee(Er), a = n.transform.zoom, s = n.transform.rotation, l = V(
    Ue,
    (b) => b.listPageItems(n.ref, { zoom: a, rotation: s }),
    qe
  ), d = V(
    Ue,
    (b) => b.listTextItems(n.ref, { zoom: a, rotation: s }),
    qe
  ), [c, p] = C(null), [f] = C(bl);
  E(() => () => f.release(), [f]), gg(o, () => r?.getActiveToolId() ?? "", e), uc(n.ref, "annotations");
  const u = k(e);
  e && u.current && e !== u.current && qe(e, u.current) && Rn(
    "annotation-renderers-inline",
    "<AnnotationLayer renderers> was given a new array with the same entries — define it outside render (module scope or useMemo), because entry identity keys the behavior registration."
  ), u.current = e;
  const m = V(
    Ue,
    (b) => b.getAppearanceEpoch(n.ref)
  ), g = ae(
    Ke,
    (b) => b.getAppearanceScale(n.transform.renderScale),
    n.transform.renderScale
  );
  E(
    () => ul(
      f,
      (b) => o.renderAppearances(n.ref, g, b),
      jt,
      p
    ),
    [f, o, n.ref, g, m]
  );
  const h = fp(d, jt);
  return /* @__PURE__ */ i("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: [
    l.map((b) => {
      const y = b.annotation?.appearanceState ?? null, v = pl({
        pending: b.source !== "baked",
        picture: c && fl(c, b.id, y),
        version: b.pictureVersion ?? 0,
        loaded: c !== null,
        paint: () => um(b) ? b : null
      }), _ = v?.kind === "painting" ? (
        // shapes, cloudy, markup: all painted via scene()
        /* @__PURE__ */ i(cg, { item: b })
      ) : v?.kind === "picture" && b.raster ? /* @__PURE__ */ i(dg, { url: v.picture.url, box: mp(b.raster, b.frame) }) : null, P = (T, L) => /* @__PURE__ */ i(lg, { item: b, page: n, ...L, children: T }, b.id), S = b.annotation;
      if (!S) return P(_);
      const x = (T, L) => {
        const B = ml(b.frame, n.transform), I = T.scale !== !1, K = T.component, te = /* @__PURE__ */ i(
          K,
          {
            annotation: S,
            frame: vp(B, I),
            native: _,
            appearance: c && bp(c, b.id, y),
            hovered: b.hovered ?? !1,
            selected: b.selected,
            interactive: L
          }
        );
        return I ? /* @__PURE__ */ i(
          "div",
          {
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              width: B.design.width,
              height: B.design.height,
              transform: `scale(${B.scale})`,
              transformOrigin: "0 0"
            },
            children: /* @__PURE__ */ i(sg.Provider, { value: B.scale, children: te })
          }
        ) : te;
      }, O = h !== null && jt(S.ref) === h, M = hp(S, o, e, O);
      switch (M.kind) {
        case "owned": {
          const T = M.entry.component;
          return /* @__PURE__ */ i(
            T,
            {
              annotation: S,
              item: b,
              page: n,
              native: P(_),
              hovered: b.hovered ?? !1,
              selected: b.selected,
              interactive: !0
            },
            b.id
          );
        }
        case "look":
          return P(x(M.entry, M.interactive), {
            interactive: M.interactive,
            inert: M.inert
          });
        case "native":
          return P(_, { inert: M.inert });
      }
    }),
    gp(d, l, e, jt).map((b) => /* @__PURE__ */ i(hg, { item: b, page: n }, b.id)),
    /* @__PURE__ */ i(ug, { page: n }),
    /* @__PURE__ */ i(fg, { page: n, components: t })
  ] });
}
const vg = up;
function wg(e = vg) {
  const t = ee(ye);
  E(() => {
    if (t)
      return pp(
        t,
        e,
        () => Rn(
          "file-picker-provider-twice",
          "useFilePickerProvider() is called from two mounted components for the same document — the later one wins. Call it once, at a document-scoped spot."
        )
      );
  }, [t, e]);
}
function yg() {
  return U(ye);
}
const _g = {};
function xg(e) {
  return ae(
    ye,
    (t) => t.tools.getDefaults(e),
    _g
  );
}
const kg = { properties: [], values: {}, mixed: [] };
function q_(e) {
  return ae(
    ye,
    (t) => e === void 0 ? t.selection.getProperties() : t.tools.getProperties(e),
    kg
  );
}
function Y_() {
  return U(ye).comments;
}
const Sg = [], Mg = [];
function X_() {
  const e = _e(), t = ae(
    ye,
    (o) => o.comments.listThreads(),
    Mg
  ), n = le(
    (o) => e ? o.documents.listPages(e) : Sg
  );
  return j(() => Op(t, n), [t, n]);
}
function Oa() {
  return U(Oe);
}
const Og = Ae(Nf);
function Pg(e) {
  const t = e?.kind === void 0 ? void 0 : [].concat(e.kind).join("\0");
  return V(
    Oe,
    (n) => n.listLibraries(t === void 0 ? void 0 : { kind: t.split("\0") }),
    qe
  );
}
function xc(e) {
  const t = e?.libraryId, n = e?.kind, o = e?.category;
  return V(
    Oe,
    (r) => r.listAssets({ libraryId: t, kind: n, category: o }),
    qe
  );
}
function Tg(e) {
  const t = Oa(), [n, o] = C(null);
  return E(() => {
    const r = e ? t.getAssetPreview(e) : null;
    if (!r) {
      o(null);
      return;
    }
    const a = Pp(r);
    return o(a.url), () => {
      a.revoke(), o(null);
    };
  }, [t, e]), n;
}
function Z_() {
  return U(_t);
}
const Cg = Ae(Cf);
function Eg(e) {
  const t = Ze();
  return le((n) => e === null ? null : n.tryCapability(_t, t ?? void 0)?.getPageScale(e) ?? Ef);
}
function Ag({
  ariaLabel: e,
  disabled: t,
  multi: n,
  options: o,
  selected: r,
  onSelect: a,
  onFocus: s,
  onBlur: l,
  style: d
}) {
  const [c] = C(() => Cp(r)), p = Xe(c.subscribe, c.get, c.get), f = k(null);
  return E(() => f.current ? Tp(f.current) : void 0, []), E(() => c.setConfirmed(r), [c, r]), /* @__PURE__ */ i(
    "select",
    {
      ref: f,
      "aria-label": e,
      multiple: n,
      size: Math.max(2, o.length),
      disabled: t,
      value: n ? p : p[0] ?? "",
      onFocus: s,
      onBlur: l,
      onChange: (u) => c.choose(
        Array.from(u.currentTarget.selectedOptions).map((m) => m.value),
        a
      ),
      style: d,
      children: o.map((u, m) => /* @__PURE__ */ i("option", { value: u.value, children: u.label }, m))
    }
  );
}
function Pa({ visible: e, color: t }) {
  return e ? /* @__PURE__ */ i("span", { "aria-hidden": "true", "data-embedpdf-form-focus-ring": "", style: Ep(t) }) : null;
}
function Ng() {
  const e = Dt((o) => o.accent), t = Zi((o) => o.focus), n = Zi((o) => o.fields);
  return j(() => Ap({ focus: t, fields: n }, e), [e, t, n]);
}
function Lg(e) {
  const t = k(null), n = k(e);
  return n.current = e, E(
    () => t.current ? sa(t.current, () => n.current?.()) : void 0,
    []
  ), t;
}
function Ig(e, t) {
  const n = U(Te), o = k(t);
  return o.current = t, j(() => {
    const r = (a) => {
      const s = o.current;
      s && n.notifyWidgetEvent(e, s, a);
    };
    return {
      onPointerEnter: () => r("cursorEnter"),
      onPointerLeave: () => r("cursorExit"),
      // The press, from the box's native listener (`useIsolated`).
      onPress: () => r("mouseDown"),
      onPointerUp: () => r("mouseUp"),
      // React focus and blur bubble, so the inner control's focus reaches the
      // box; blur fires after the control's own commit, so a blur script
      // always sees the committed value.
      onFocus: () => r("focus"),
      onBlur: () => r("blur")
    };
  }, [n, e]);
}
function Dn(e) {
  const t = U(Te), n = k(e);
  return n.current = e, Ve(() => {
    const o = n.current;
    o && t.activateWidget(o);
  }, [t]);
}
function sn({
  item: e,
  page: t,
  colors: n,
  edge: o = !0,
  focusable: r = !0,
  onClick: a,
  children: s,
  ...l
}) {
  const d = U(Te), { onPress: c, ...p } = Ig(e.fieldRef, e.annotationRef), f = Lg(c), u = Qt(e.box, t.transform), m = e.annotationRef, g = r && !e.disabled, h = e.control === "toggle" && e.kind === "radio";
  return E(
    () => f.current && m && g ? Rp(f.current, d, m, { radio: h }) : void 0,
    [f, d, m, g, h]
  ), /* @__PURE__ */ i(
    "div",
    {
      ref: f,
      ...p,
      ...l,
      onFocus: (b) => {
        p.onFocus?.(b), l.onFocus?.(b);
      },
      onBlur: (b) => {
        p.onBlur?.(b), l.onBlur?.(b);
      },
      onClick: a,
      style: { ...Dp(e, u, n, { edge: o }), ...l.style },
      children: s
    }
  );
}
function Rg({ item: e, page: t, colors: n }) {
  const o = U(Te), r = Dn(e.annotationRef), a = j(
    () => Lp(o, e.fieldRef, e.value),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [o, e.key]
  ), { focused: s, draft: l } = Xe(
    a.subscribe,
    a.getState,
    a.getState
  );
  E(() => a.setValue(e.value), [a, e.value]);
  const d = Qt(e.box, t.transform);
  ae(gm, (f) => f.getPaintFontsEpoch(), 0);
  const c = e.annotationRef ? o.getTextEditorLayout(e.annotationRef, l) : null;
  Wo(c ? c.programs : kc);
  const p = {
    value: l,
    maxLength: e.maxLength ?? void 0,
    "aria-label": e.label,
    disabled: e.disabled,
    onFocus: a.focus,
    onChange: (f) => a.input(f.target.value),
    onBlur: a.blur,
    onKeyDown: (f) => {
      a.keyDown(f.key, e.multiline) && f.currentTarget.blur();
    },
    style: Ip(e, d, n, s, c)
  };
  return (
    // A click runs the widget's action too, as in Acrobat: the editor's
    // focus click bubbles here, a read-only field's lands here directly.
    /* @__PURE__ */ i(sn, { item: e, page: t, colors: n, onClick: r, children: e.multiline ? /* @__PURE__ */ i("textarea", { ...p }) : /* @__PURE__ */ i("input", { ...p, type: e.password ? "password" : "text" }) })
  );
}
function Dg({ item: e, page: t, colors: n }) {
  const o = U(Te), r = Dn(e.annotationRef), [a, s] = C(!1), l = () => $p(o, e, r);
  return /* @__PURE__ */ i(
    sn,
    {
      item: e,
      page: t,
      colors: n,
      role: e.kind === "checkbox" ? "checkbox" : "radio",
      "aria-checked": e.checked,
      "aria-label": e.label,
      tabIndex: e.disabled ? -1 : 0,
      onClick: l,
      onFocus: () => s(!0),
      onBlur: () => s(!1),
      onKeyDown: (d) => {
        (d.key === " " || d.key === "Enter") && (d.preventDefault(), l());
      },
      style: { cursor: e.disabled ? "default" : "pointer", outline: "none" },
      children: /* @__PURE__ */ i(Pa, { visible: a, color: n.focus })
    }
  );
}
function $g({ item: e, page: t, colors: n }) {
  const o = U(Te), r = Dn(e.annotationRef), [a, s] = C(!1);
  return /* @__PURE__ */ i(sn, { item: e, page: t, colors: n, onClick: r, children: [
    /* @__PURE__ */ i(
      "select",
      {
        defaultValue: e.selected[0] ?? "",
        "aria-label": e.label,
        disabled: e.disabled,
        onFocus: () => s(!0),
        onBlur: () => s(!1),
        onChange: (l) => void o.setValue(e.fieldRef, { value: l.currentTarget.value || null }),
        style: {
          ...ia,
          opacity: 0,
          cursor: e.disabled ? "default" : "pointer",
          ...e.disabled ? { pointerEvents: "none" } : {}
        },
        children: [
          e.selected.length === 0 && /* @__PURE__ */ i("option", { value: "" }),
          e.options.map((l, d) => /* @__PURE__ */ i("option", { value: l.value, children: l.label }, d))
        ]
      },
      e.selected.join("\0")
    ),
    /* @__PURE__ */ i(Pa, { visible: a, color: n.focus })
  ] });
}
function zg({ item: e, page: t, colors: n }) {
  const o = U(Te), r = Dn(e.annotationRef), [a, s] = C(!1), l = Qt(e.box, t.transform), d = V(
    Te,
    (c) => e.annotationRef ? c.getWidgetFontCss(e.annotationRef) : null
  );
  return Wo(d ? d.programs : kc), /* @__PURE__ */ i(sn, { item: e, page: t, colors: n, edge: !1, onClick: r, children: [
    /* @__PURE__ */ i(
      Ag,
      {
        ariaLabel: e.label,
        disabled: e.disabled,
        multi: e.multi,
        options: e.options,
        selected: e.selected,
        onFocus: () => s(!0),
        onBlur: () => s(!1),
        onSelect: async (c) => {
          await o.setValue(e.fieldRef, { selectedValues: c });
        },
        style: Np(e, l, n, d)
      }
    ),
    /* @__PURE__ */ i(Pa, { visible: a, color: n.focus })
  ] });
}
function Fg({ item: e, page: t, colors: n }) {
  const o = Dn(e.annotationRef);
  return /* @__PURE__ */ i(
    sn,
    {
      item: e,
      page: t,
      colors: n,
      edge: !1,
      style: { cursor: e.disabled ? "default" : "pointer" },
      children: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          "aria-label": e.label,
          disabled: e.disabled,
          onClick: o,
          style: {
            ...ia,
            padding: 0,
            border: 0,
            background: "transparent",
            cursor: "inherit",
            // The box is the event surface; a disabled button must not swallow the pointer.
            pointerEvents: e.disabled ? "none" : "auto"
          }
        }
      )
    }
  );
}
function Bg({ item: e, page: t, colors: n }) {
  const o = ee(wi), r = e.fieldRef, a = ae(
    wi,
    (l) => l.getSignature(r)?.signed ?? e.signed,
    e.signed
  ), s = o !== null && (a || !e.disabled);
  return /* @__PURE__ */ i(
    sn,
    {
      item: e,
      page: t,
      colors: n,
      focusable: s,
      style: { cursor: s ? "pointer" : "default" },
      children: s ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          "aria-label": e.label,
          "data-signed": a ? "" : void 0,
          onClick: () => a ? o.requestInspection(r) : o.setTarget(r),
          style: {
            ...ia,
            padding: 0,
            border: 0,
            background: "transparent",
            cursor: "inherit"
          }
        }
      ) : null
    }
  );
}
function Kg() {
  const e = ze(), t = U(Te), n = Ng(), o = V(
    jo,
    (a) => a.activeToolEnables("form-fill")
  );
  uc(e.ref, "formFields"), E(() => {
    t.ensureLoaded(e.ref);
  }, [t, e.ref]);
  const r = V(
    Te,
    (a) => a.listWidgets(e.ref),
    qe
  );
  return /* @__PURE__ */ i("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: [
    /* @__PURE__ */ i(jg, { page: e }),
    (o ? r : []).map((a) => {
      const s = `${a.key}:${a.annotObjectNumber}`;
      switch (a.control) {
        case "text":
          return /* @__PURE__ */ i(Rg, { item: a, page: e, colors: n }, s);
        case "toggle":
          return /* @__PURE__ */ i(Dg, { item: a, page: e, colors: n }, s);
        case "choice":
          return a.kind === "list" ? /* @__PURE__ */ i(zg, { item: a, page: e, colors: n }, s) : /* @__PURE__ */ i($g, { item: a, page: e, colors: n }, s);
        case "button":
          return /* @__PURE__ */ i(Fg, { item: a, page: e, colors: n }, s);
        case "signature":
          return /* @__PURE__ */ i(Bg, { item: a, page: e, colors: n }, s);
      }
    })
  ] });
}
function jg({ page: e }) {
  const t = U(Te), n = V(
    Te,
    (c) => c.listShownWidgets(e.ref),
    qe
  ), o = V(Te, (c) => c.getAppearanceEpoch(e.ref)), r = ae(
    Ke,
    (c) => c.getAppearanceScale(e.transform.renderScale),
    0
  ), [a, s] = C(null), [l] = C(bl);
  E(() => () => l.release(), [l]), E(() => {
    if (r)
      return ul(
        l,
        (c) => t.renderAppearances(e.ref, r, c),
        sr,
        s
      );
  }, [l, t, e.ref, r, o]);
  const d = n.map(
    (c) => pl({
      pending: c.pending,
      picture: a && fl(a, sr(c.ref), c.appearanceState),
      version: c.pictureVersion,
      loaded: a !== null,
      paint: () => t.getWidgetPainting(c.ref)
    })
  );
  return /* @__PURE__ */ i(D, { children: n.map((c, p) => {
    const f = d[p];
    if (!f) return null;
    const u = sr(c.ref), m = Qt(c.rect, e.transform);
    if (f.kind === "painting") {
      const { x: g, y: h, width: b, height: y } = c.rect;
      return /* @__PURE__ */ i(
        "svg",
        {
          viewBox: `${g} ${h} ${b} ${y}`,
          style: {
            position: "absolute",
            left: m.left,
            top: m.top,
            width: m.width,
            height: m.height,
            overflow: "visible",
            pointerEvents: "none"
          },
          children: /* @__PURE__ */ i(vc, { shapes: hl(f.painting.scene, { miterLimit: kl }) })
        },
        u
      );
    }
    return /* @__PURE__ */ i(
      "img",
      {
        src: f.picture.url,
        alt: "",
        draggable: !1,
        style: {
          position: "absolute",
          left: m.left,
          top: m.top,
          width: m.width,
          height: m.height,
          // A global `img { max-width: 100% }` reset would clamp it.
          maxWidth: "none",
          maxHeight: "none",
          pointerEvents: "none"
        }
      },
      u
    );
  }) });
}
const kc = Object.freeze([]);
Ae(Bf);
const Zi = an(tn);
function J_() {
  return U(nn);
}
const Q_ = Ae(em);
function qn(e, t) {
  ka(nn, e, t);
}
function ex() {
  const e = Pg({ kind: tm }), t = xc();
  return j(() => nm(e, t), [e, t]);
}
function Hg({
  onPress: e,
  ...t
}) {
  const n = k(null), o = k(e);
  return o.current = e, E(
    () => n.current ? sa(n.current, () => o.current()) : void 0,
    []
  ), /* @__PURE__ */ i("a", { ref: n, ...t });
}
function Ug() {
  const e = ee(Ol);
  E(() => e?.registerUriOpener(Hp), [e]);
}
function Gg({ renderLink: e } = {}) {
  const t = ze(), n = U(bo);
  Ug();
  const o = ee($t()), r = ee(vm), a = j(() => r ? bm(r.dispatch) : null, [r]), s = V(bo, (p) => p.listLinks(t.ref), qe), l = V(Ol, (p) => p.isNavigationEngaged()), d = ae(
    jo,
    (p) => p.activeToolEnables("annotation-edit"),
    !1
  );
  if (E(() => {
    n.ensureLoaded(t.ref);
  }, [n, t.ref]), !l || !s.length) return null;
  const c = zp(s, d);
  return c.length ? /* @__PURE__ */ i("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: c.map((p) => {
    const { box: f, href: u, label: m } = Fp(
      p,
      t.transform,
      (y) => n.getLabel(y)
    ), g = Bp(p, t.ref, o), h = /* @__PURE__ */ i(
      Hg,
      {
        onPress: () => Hn(r, p, t.ref, "mouseDown"),
        href: u ?? void 0,
        target: "_blank",
        rel: "noopener noreferrer",
        role: "link",
        tabIndex: 0,
        title: m,
        "aria-label": m,
        onClick: (y) => {
          u && jp(y) || (y.preventDefault(), n.activate(p, g));
        },
        onKeyDown: (y) => {
          (y.key === "Enter" || y.key === " ") && (y.preventDefault(), n.activate(p, g));
        },
        onPointerEnter: () => Kp(a, p, t.ref),
        onPointerLeave: () => a?.hover(null),
        onPointerUp: () => Hn(r, p, t.ref, "mouseUp"),
        onFocus: () => Hn(r, p, t.ref, "focus"),
        onBlur: () => Hn(r, p, t.ref, "blur"),
        style: {
          position: "absolute",
          left: f.left,
          top: f.top,
          width: f.width,
          height: f.height,
          cursor: "pointer",
          pointerEvents: "auto"
        }
      }
    ), b = e?.({ link: p, native: h }) ?? h;
    return /* @__PURE__ */ i(D, { children: b }, p.id);
  }) }) : null;
}
const xo = Ae(Df);
function Q() {
  return V($o, (e) => e.getTranslator());
}
const Wg = /* @__PURE__ */ Lu(Up);
function ke() {
  return U($e);
}
const Vg = an($e);
function Sc(e, t = {}) {
  return al(e, { isMac: t.isMac ?? Ro() });
}
function Ce(e) {
  const t = U($e), n = _e() ?? void 0, o = le(
    () => t.resolveCommand(e, n),
    au
  );
  return o === null && Rn(`useCommand:${e}`, `useCommand(): ${iu(e, t.listCommandIds())}`), j(
    () => su(
      o ?? lu(e),
      (r) => t.execute(r, { documentId: n }),
      { isMac: Ro() }
    ),
    [o, t, n, e]
  );
}
function qg(e) {
  const t = U(aa), n = e?.isMac, o = e?.target, r = k(e?.onRefused);
  r.current = e?.onRefused, E(() => {
    const a = (s, l) => r.current?.(s, l);
    return o ? o.current ? ui(t, { isMac: n, target: o.current, onRefused: a }) : void 0 : ui(t, { isMac: n, onRefused: a });
  }, [t, n, o]);
}
function Yg() {
  return U(H);
}
function Xg(e, t) {
  ka(H, e, t);
}
const Zg = Ae(yf), Ji = Object.freeze({});
function Qe(e) {
  const t = ee(H), n = ae(H, (r) => r.isOpen(e), !1), o = ae(
    H,
    (r) => r.getSurface(e)?.props ?? Ji,
    Ji
  );
  return j(
    () => ({
      isOpen: n,
      props: o,
      open: (r) => t?.open(e, r),
      close: () => t?.close(e),
      toggle: (r) => t?.toggle(e, r)
    }),
    [t, e, n, o]
  );
}
function tx(e, t, n = {}) {
  const o = ee(H), r = ae(
    H,
    (l) => l.getSurface(e)?.focusRequest ?? 0,
    0
  ), [a] = C(Gp), s = n.select ?? !1;
  E(() => a.follow(t.current, o, r, { select: s }));
}
const Jg = "attachments", Qg = "attachment-item", He = (e) => e.tryGet(Bo), Tt = (e) => He(e)?.getSelected()[0] ?? null;
async function Qi(e, t) {
  const { bytes: n, name: o, mimeType: r } = await e.download(t);
  la(n, o, r ?? void 0);
}
const es = (e) => {
  const t = e.tryGet(ye)?.selection.getSelected() ?? [], [n] = t;
  if (t.length !== 1 || n?.subtype !== "file-attachment") return null;
  const o = jt(n.ref);
  return (He(e)?.list() ?? []).find((r) => r.home.kind === "page" && jt(r.home.ref) === o) ?? null;
}, ts = {
  categories: ["documents.download"],
  allowed: (e) => He(e)?.canDownload() ?? !0,
  notAllowedKey: "commands.notAllowed.doc-download"
}, ns = {
  categories: ["attachments.adding"],
  allowed: (e) => He(e)?.canCreate() ?? !0,
  notAllowedKey: "commands.notAllowed.doc-attachments-modify"
}, eb = [
  {
    id: "attachment:add",
    labelKey: "commands.attachment.add",
    icon: "plus",
    ...ns,
    run: async (e) => {
      const t = He(e);
      if (!t) return;
      const n = e.args?.files ?? [await ca()].filter((o) => o !== null);
      n.length !== 0 && (e.tryGet(H)?.open(Jg), await t.create(n.map((o) => ({ data: o }))));
    }
  },
  {
    id: "attachment:save",
    labelKey: "commands.attachment.save",
    icon: "download",
    ...ts,
    enabled: (e) => Tt(e) !== null,
    run: async (e) => {
      const t = He(e), n = Tt(e);
      t && n && await Qi(t, n);
    }
  },
  {
    id: "attachment:go-to",
    labelKey: "commands.attachment.goTo",
    visible: (e) => Tt(e)?.home.kind === "page",
    run: (e) => {
      const t = Tt(e);
      t && He(e)?.reveal(t);
    }
  },
  {
    id: "attachment:delete",
    labelKey: "commands.attachment.delete",
    icon: "trash",
    ...ns,
    allowed: (e) => {
      const t = He(e), n = Tt(e);
      return t ? n ? t.canDelete(n) : t.canCreate() : !0;
    },
    enabled: (e) => Tt(e) !== null,
    run: async (e) => {
      const t = He(e), n = Tt(e);
      t && n && await t.delete(n);
    }
  },
  {
    id: "menu:attachment-item",
    labelKey: "commands.attachment.more",
    icon: "dots",
    menu: Qg,
    categories: ["attachments"]
  },
  {
    id: "annotation:save-file",
    labelKey: "commands.annotate.saveFile",
    icon: "download",
    ...ts,
    visible: (e) => es(e) !== null,
    run: async (e) => {
      const t = He(e), n = es(e);
      t && n && await Qi(t, n);
    }
  }
], tb = "comment-item", nb = [
  "accepted",
  "rejected",
  "cancelled",
  "completed",
  "none"
], ob = {
  none: "comments.statusNone",
  accepted: "comments.statusAccepted",
  rejected: "comments.statusRejected",
  cancelled: "comments.statusCancelled",
  completed: "comments.statusCompleted"
}, rb = (e) => !!e.root.contents?.trim() || e.replies.length > 0, ab = (e) => e.review.lastChange?.state ?? "none", ko = (e) => e.tryGet(ye)?.comments ?? null, Sn = (e) => {
  const t = e.tryGet(ye), [n] = t?.selection.getSelected() ?? [];
  return n ? t?.comments.getThread(n.ref) ?? null : null;
}, ib = (e) => {
  const t = Sn(e);
  return t !== null && rb(t) && !!ko(e)?.canSetStatus(t.root.ref);
}, sb = (e) => ({
  id: `comment:status-${e}`,
  labelKey: ob[e],
  categories: ["comments.writing"],
  visible: ib,
  active: (t) => {
    const n = Sn(t);
    return n !== null && ab(n) === e;
  },
  run: async (t) => {
    const n = Sn(t);
    n && await ko(t)?.setStatus(n.root.ref, e);
  }
}), lb = [
  ...nb.map(sb),
  {
    id: "comment:delete-thread",
    labelKey: "comments.deleteThread",
    icon: "trash",
    categories: ["comments.writing"],
    enabled: (e) => {
      const t = Sn(e);
      return t !== null && !!ko(e)?.canDeleteThread(t.root.ref);
    },
    run: async (e) => {
      const t = Sn(e);
      t && await ko(e)?.deleteThread(t.root.ref);
    }
  },
  {
    id: "menu:comment-item",
    labelKey: "commands.commentThread.more",
    icon: "dots",
    menu: tb,
    categories: ["comments.writing"]
  }
], cb = "mode";
function So(e) {
  return e.listOpenSurfaces().find((t) => t.exclusive === "mode")?.id ?? null;
}
function db(e) {
  return il(e).map((t) => {
    const n = du(e, t).map((o) => e.bars[o]).find((o) => o.title !== void 0 || o.titleKey !== void 0);
    return {
      mode: t,
      title: n?.title,
      titleKey: n?.titleKey
    };
  });
}
const ub = (e, t) => e.length === t.length && e.every((n, o) => n.mode === t[o].mode && n.title === t[o].title && n.titleKey === t[o].titleKey);
function pb(e, t) {
  return e.filter((n) => !t(mo(n.mode))).map((n) => {
    const o = mo(n.mode);
    return {
      id: o,
      label: n.title ?? (n.titleKey === void 0 ? n.mode : void 0),
      labelKey: n.titleKey,
      run: (r) => {
        r.tryGet(H)?.toggle(o, { exclusive: cb }), r.tryGet(An)?.activateTool("pointer");
      },
      active: (r) => r.tryGet(H)?.isOpen(o) ?? !1
    };
  });
}
const zr = "document:open", Ta = "application/pdf", Ca = (e) => e.type === Ta || /\.pdf$/i.test(e.name);
function Mc(e) {
  if (!e || !Array.from(e.types).includes("Files")) return !1;
  const t = Array.from(e.items ?? []).filter((n) => n.kind === "file");
  return t.length === 0 || t.some((n) => n.type === Ta || n.type === "");
}
const fb = (e) => {
  const t = e?.files;
  return Array.isArray(t) ? t : null;
}, mb = () => ca({ accept: `.pdf,${Ta}` }).then((e) => e ? [e] : []);
function hb(e, t) {
  e.openAll(t.map((n) => ({
    name: n.name.replace(/\.pdf$/i, "") || n.name,
    source: async () => ({
      kind: "bytes",
      bytes: new Uint8Array(await n.arrayBuffer())
    })
  })));
}
const gb = {
  id: zr,
  labelKey: "commands.open",
  icon: "fileImport",
  shortcut: "Mod+O",
  categories: ["documents.open"],
  visible: (e) => e.tryGet(Pe)?.canOpenFiles() ?? !1,
  run: async (e) => {
    const t = e.tryGet(Pe);
    t && hb(t, fb(e.args) ?? await mb());
  }
}, bb = "outline", Fr = "outline-rename", Oc = "outline-properties", vb = "outline-item", gt = (e) => e.tryGet(Fo), wn = (e) => {
  const t = gt(e), [n] = t?.getSelected() ?? [];
  return n ? t?.get(n) ?? null : null;
}, un = (e) => wn(e) !== null, Ct = {
  categories: ["outline.editing"],
  allowed: (e) => gt(e)?.canEdit() ?? !0,
  notAllowedKey: "commands.notAllowed.doc-outline-modify"
};
async function os(e, t) {
  const n = gt(e);
  if (!n) return;
  const o = e.tryGet(H), r = wn(e);
  o?.open(bb), o?.open(Fr, { props: { after: r?.ref.objectNumber ?? null } });
  try {
    await n.create(t(r), { select: !0 });
  } catch (a) {
    throw o?.close(Fr), a;
  }
}
const wb = [
  {
    id: "outline:add",
    labelKey: "commands.outline.add",
    icon: "plus",
    shortcut: "Mod+B",
    ...Ct,
    run: (e) => os(e, (t) => t ? {
      parent: t.parent,
      position: { after: t.ref }
    } : {})
  },
  {
    id: "outline:add-child",
    labelKey: "commands.outline.addChild",
    ...Ct,
    enabled: un,
    run: (e) => os(e, (t) => t ? { parent: t.ref } : {})
  },
  {
    id: "outline:rename",
    labelKey: "commands.outline.rename",
    ...Ct,
    enabled: un,
    run: (e) => {
      const t = wn(e);
      t && e.tryGet(H)?.open(Fr, { props: { item: t.ref.objectNumber } });
    }
  },
  {
    id: "outline:set-destination",
    labelKey: "commands.outline.setDestination",
    ...Ct,
    enabled: (e) => un(e) && gt(e)?.getCurrentViewTarget() != null,
    run: async (e) => {
      const t = gt(e), n = wn(e), o = t?.getCurrentViewTarget() ?? null;
      t && n && o && await t.update(n.ref, { target: o });
    }
  },
  {
    id: "outline:properties",
    labelKey: "commands.outline.properties",
    ...Ct,
    enabled: un,
    run: (e) => {
      const t = wn(e);
      t && e.tryGet(H)?.open(Oc, {
        exclusive: "modal",
        props: { item: t.ref.objectNumber }
      });
    }
  },
  {
    id: "outline:delete",
    labelKey: "commands.outline.delete",
    icon: "trash",
    ...Ct,
    enabled: un,
    run: async (e) => {
      const t = gt(e), n = t?.getSelected() ?? [];
      t && n.length > 0 && await t.delete(n);
    }
  },
  {
    id: "menu:outline-item",
    labelKey: "commands.outline.more",
    icon: "dots",
    menu: vb,
    ...Ct
  },
  {
    id: "outline:expand-all",
    labelKey: "commands.outline.expandAll",
    icon: "chevronsDown",
    categories: ["outline"],
    run: (e) => gt(e)?.expandAll()
  },
  {
    id: "outline:collapse-all",
    labelKey: "commands.outline.collapseAll",
    icon: "chevronsUp",
    categories: ["outline"],
    run: (e) => gt(e)?.collapseAll()
  }
], yb = "page", Pc = "application/pdf", je = (e) => e.tryGet(Ko), bt = (e) => je(e)?.getSelected() ?? [], Br = (e) => bt(e).length > 0, so = (e) => e.tryGet(Pe)?.listPages(e.documentId ?? void 0) ?? [], Tc = (e) => e.args ?? {}, Et = {
  categories: ["pages"],
  allowed: (e) => je(e)?.canEdit() ?? !0,
  notAllowedKey: "commands.notAllowed.doc-pages-assemble"
};
function rs(e) {
  const t = Tc(e).position;
  if (t) return t;
  const n = new Set(bt(e).map((r) => r.objectNumber)), o = so(e).filter((r) => n.has(r.ref.objectNumber)).pop();
  return o ? { after: o.ref } : "end";
}
async function _b(e) {
  const t = Tc(e).files;
  if (t) return t.filter(Ca);
  const n = await ca({ accept: `.pdf,${Pc}` });
  return n ? [n] : [];
}
function xb(e) {
  const t = e.documentId ?? void 0;
  return `${e.tryGet(Pe)?.get(t)?.name?.replace(/\.pdf$/i, "") || "document"}-pages.pdf`;
}
const as = (e, t, n, o) => ({
  id: e,
  labelKey: t,
  icon: n,
  ...Et,
  enabled: Br,
  run: async (r) => {
    const a = bt(r);
    a.length > 0 && await je(r)?.rotateBy(a, o);
  }
}), kb = [
  as("page:rotate-clockwise", "commands.pages.rotateClockwise", "pageRotateClockwise", 90),
  as("page:rotate-counterclockwise", "commands.pages.rotateCounterclockwise", "pageRotateCounterClockwise", -90),
  {
    id: "page:delete",
    labelKey: "commands.pages.delete",
    icon: "trash",
    ...Et,
    enabled: (e) => {
      const t = bt(e).length;
      return t > 0 && t < so(e).length;
    },
    run: async (e) => {
      const t = bt(e);
      t.length > 0 && await je(e)?.delete(t);
    }
  },
  {
    id: "page:duplicate",
    labelKey: "commands.pages.duplicate",
    icon: "copy",
    ...Et,
    enabled: Br,
    run: async (e) => {
      const t = je(e), n = bt(e);
      if (!t || n.length === 0) return;
      const { pages: o } = await t.duplicate(n);
      t.select(o);
    }
  },
  {
    id: "page:insert-blank",
    labelKey: "commands.pages.insertBlank",
    icon: "filePlus",
    ...Et,
    run: async (e) => {
      const t = je(e);
      if (!t) return;
      const { pages: n } = await t.insertBlank({ position: rs(e) });
      t.select(n);
    }
  },
  {
    id: "page:insert-file",
    labelKey: "commands.pages.insertFile",
    icon: "fileImport",
    ...Et,
    run: async (e) => {
      const t = je(e);
      if (!t) return;
      let n = rs(e);
      const o = await _b(e), r = [];
      for (const a of o) {
        const { pages: s } = await t.insertFromBytes(new Uint8Array(await a.arrayBuffer()), { position: n });
        r.push(...s);
        const l = s[s.length - 1];
        l && (n = { after: l });
      }
      r.length > 0 && t.select(r);
    }
  },
  {
    id: "page:extract",
    labelKey: "commands.pages.extract",
    icon: "fileExport",
    categories: ["documents.download"],
    allowed: (e) => je(e)?.canExtract() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-download",
    enabled: Br,
    run: async (e) => {
      const t = bt(e), n = je(e);
      !n || t.length === 0 || la(await n.extract(t), xb(e), Pc);
    }
  },
  {
    id: "page:select-all",
    labelKey: "commands.pages.selectAll",
    categories: Et.categories,
    enabled: (e) => bt(e).length < so(e).length,
    run: (e) => je(e)?.select(so(e).map((t) => t.ref))
  },
  {
    id: "menu:page",
    labelKey: "commands.pages.more",
    icon: "dots",
    menu: yb,
    ...Et
  }
], Cc = "go-to-page", Ec = "shortcuts", is = "redact-confirm", Sb = "print", ss = "form-design", Mb = "form-edit", Ob = [
  "form-text",
  "form-checkbox",
  "form-radio",
  "form-combobox",
  "form-listbox",
  "form-button",
  "form-signature"
], Pb = (e) => e === "form-edit" || e != null && Ob.includes(e), ls = (e) => Pb(e.tryGet(An)?.getActiveToolId()), Tb = "embedpdf-custom", z = (e) => e.tryGet(ct), Yn = (e) => (z(e)?.getPageCount() ?? 0) > 1, he = (e) => e.tryGet(An), de = (e) => e.tryGet(ye), lo = (e) => e.tryGet(Nn), co = (e) => e.tryGet(en), Xn = (e) => co(e)?.getSnapshot() ?? null, Cb = Wg.find((e) => "id" in e && e.id === "document:download"), Eb = (e, t) => {
  const n = e.tryGet(Pe), o = e.documentId ?? void 0;
  return `${(n?.get(o)?.name ?? "document").replace(/\.pdf$/i, "")} p${(n?.listPages(o).findIndex((r) => r.ref.objectNumber === t.objectNumber) ?? -1) + 1}.png`;
}, re = {
  allowed: (e) => de(e)?.canCreate() ?? !0,
  notAllowedKey: "commands.notAllowed.annotations-create"
}, pt = {
  allowed: (e) => e.tryGet(tn)?.canDesign() ?? !0,
  notAllowedKey: "commands.notAllowed.doc-forms-modify"
}, cs = {
  allowed: (e) => e.tryGet(Oe)?.canPlace(e.documentId ?? void 0) ?? !0,
  notAllowedKey: "commands.notAllowed.annotations-create"
}, Ab = (e, t) => e === t || !!e && !!t && e.start.page.objectNumber === t.start.page.objectNumber && e.start.index === t.start.index && e.end.page.objectNumber === t.end.page.objectNumber && e.end.index === t.end.index, Zn = (e, t) => ({
  run: (n) => n.tryGet($e)?.execute(It(e), { documentId: n.documentId ?? void 0 }),
  active: (n) => n.tryGet(H)?.isOpen(e) ?? !1,
  visible: (n) => (n.tryGet($e)?.hasCommand(It(e)) ?? !1) && (t?.(n) ?? !0)
}), mr = (e) => {
  const t = z(e)?.getCurrentPage();
  return t != null && (e.tryGet(_t)?.canMeasure(t) ?? !1);
}, hr = (e) => (de(e)?.selection.getSelected().length ?? 0) > 0, gr = (e) => {
  const t = de(e);
  return (t?.selection.getSelected() ?? []).every(({ ref: n }) => t.isEditable(n));
}, br = (e) => new Set((de(e)?.selection.getSelected() ?? []).map((t) => t.subtype)), vr = (e) => {
  const t = de(e)?.selection.getSelected() ?? [];
  return t.every((n) => n.subtype === "redact") ? t.map((n) => n.ref) : [];
}, Jn = (e) => {
  const t = de(e)?.selection.getProperties();
  if (!(!t || !t.properties.some((n) => n.key === "link") || t.mixed.includes("link")))
    return t.values.link ?? null;
}, Ut = {};
Ut.stamp = { icon: "rubberStamp" };
const Ac = (e, t, n) => {
  if (!n) return null;
  const o = e.tryGet(ye);
  if (!o) return null;
  const r = o.tools.getDefaults(t), a = (s) => r[s] ?? void 0;
  return {
    primary: a(n.primary),
    secondary: n.secondary ? a(n.secondary) : void 0
  };
}, Nc = {}, Lc = (e, t, n, { feature: o, check: r, accent: a }) => (n && (Ut[t] = {
  icon: n,
  ...a ? { accent: a } : {}
}), Nc[t] = o, {
  id: e,
  ...n ? { icon: n } : {},
  categories: [o],
  ...r,
  run: (s) => he(s)?.activateTool(t),
  active: (s) => he(s)?.getActiveToolId() === t,
  enabled: (s) => he(s) != null,
  iconAccent: (s) => Ac(s, t, a)
}), Z = (e, t, n, o, r) => ({
  ...Lc(e, t, o, r),
  labelKey: n
}), wr = (e, t, n, o, r) => ({
  id: e,
  labelKey: n,
  icon: o,
  categories: [r],
  ...re,
  visible: (a) => lo(a)?.hasSelection() ?? !1,
  run: (a) => de(a)?.createFromSelection(t),
  iconAccent: (a) => Ac(a, t, { primary: "color" })
}), Nb = (e) => {
  const t = e?.page;
  return typeof t == "number" && Number.isFinite(t) ? Math.round(t) : null;
}, pn = (e, t, n) => ({
  id: e,
  labelKey: n,
  run: (o) => z(o)?.zoomTo({ level: t }),
  enabled: (o) => z(o) != null
}), yr = (e, t, n, o) => ({
  id: e,
  labelKey: n,
  icon: o,
  run: (r) => z(r)?.updateSettings({ spread: t }),
  active: (r) => z(r)?.getSettings().spread === t,
  enabled: (r) => z(r) != null,
  locked: (r) => z(r)?.getLock("spread") ?? null
}), ds = (e, t, n, o) => ({
  id: e,
  labelKey: n,
  icon: o,
  run: (r) => z(r)?.updateSettings({
    flow: "continuous",
    layout: t
  }),
  active: (r) => {
    const a = z(r)?.getSettings();
    return a?.flow === "continuous" && a.layout === t;
  },
  enabled: (r) => z(r) != null,
  locked: (r) => z(r)?.getLock("flow") ?? z(r)?.getLock("layout") ?? null
}), us = [
  {
    id: "zoom:in",
    labelKey: "commands.zoom.in",
    icon: "zoomIn",
    shortcut: ["Mod+=", "Mod+NumpadAdd"],
    run: (e) => z(e)?.zoomIn(),
    enabled: (e) => z(e)?.canZoomIn() ?? !1
  },
  {
    id: "zoom:out",
    labelKey: "commands.zoom.out",
    icon: "zoomOut",
    shortcut: ["Mod+-", "Mod+NumpadSubtract"],
    run: (e) => z(e)?.zoomOut(),
    enabled: (e) => z(e)?.canZoomOut() ?? !1
  },
  {
    id: "zoom:fit-page",
    labelKey: "commands.zoom.fitPage",
    icon: "fitToPage",
    shortcut: "Mod+0",
    run: (e) => z(e)?.fitPage(),
    active: (e) => z(e)?.getZoomMode() === lr.FitPage,
    enabled: (e) => z(e) != null
  },
  {
    id: "zoom:fit-width",
    labelKey: "commands.zoom.fitWidth",
    icon: "fitToWidth",
    shortcut: "Mod+1",
    run: (e) => z(e)?.fitWidth(),
    active: (e) => z(e)?.getZoomMode() === lr.FitWidth,
    enabled: (e) => z(e) != null
  },
  {
    id: "zoom:automatic",
    labelKey: "commands.zoom.automatic",
    run: (e) => z(e)?.fitAutomatic(),
    active: (e) => z(e)?.getZoomMode() === lr.Automatic,
    enabled: (e) => z(e) != null
  },
  pn("zoom:50", 0.5, "commands.zoom.p50"),
  pn("zoom:100", 1, "commands.zoom.p100"),
  pn("zoom:150", 1.5, "commands.zoom.p150"),
  pn("zoom:200", 2, "commands.zoom.p200"),
  pn("zoom:400", 4, "commands.zoom.p400"),
  {
    id: "menu:zoom",
    labelKey: "commands.zoom.menu",
    icon: "zoomIn",
    menu: "zoom"
  },
  {
    id: "page:next",
    labelKey: "commands.page.next",
    icon: "chevronRight",
    shortcut: "ArrowRight",
    run: (e) => z(e)?.nextPage(),
    enabled: (e) => z(e)?.canGoNext() ?? !1,
    visible: Yn
  },
  {
    id: "page:previous",
    labelKey: "commands.page.previous",
    icon: "chevronLeft",
    shortcut: "ArrowLeft",
    run: (e) => z(e)?.previousPage(),
    enabled: (e) => z(e)?.canGoPrevious() ?? !1,
    visible: Yn
  },
  {
    id: "page:first",
    labelKey: "commands.page.first",
    shortcut: "Home",
    run: (e) => z(e)?.goToFirstPage(),
    enabled: (e) => z(e)?.canGoPrevious() ?? !1,
    visible: Yn
  },
  {
    id: "page:last",
    labelKey: "commands.page.last",
    shortcut: "End",
    run: (e) => z(e)?.goToLastPage(),
    enabled: (e) => z(e)?.canGoNext() ?? !1,
    visible: Yn
  },
  {
    id: "page:go-to",
    labelKey: "commands.page.goTo",
    run: (e) => {
      const t = z(e);
      if (!t) return;
      const n = Nb(e.args);
      if (n === null) {
        e.tryGet(H)?.open(Cc, { exclusive: "modal" });
        return;
      }
      t.goToPage(Math.min(Math.max(n, 1), t.getPageCount()) - 1);
    },
    enabled: (e) => (z(e)?.getPageCount() ?? 0) > 0
  },
  {
    id: "tool:pan",
    labelKey: "commands.pan",
    icon: "hand",
    run: (e) => he(e)?.activateTool("pan"),
    active: (e) => he(e)?.getActiveToolId() === "pan",
    enabled: (e) => he(e) != null
  },
  {
    id: "tool:pointer",
    labelKey: "commands.pointer",
    icon: "pointer",
    run: (e) => he(e)?.activateTool("pointer"),
    active: (e) => he(e)?.getActiveToolId() === "pointer",
    enabled: (e) => he(e) != null
  },
  {
    id: "tool:zoom",
    labelKey: "commands.zoom.marquee",
    icon: "zoomInArea",
    run: (e) => he(e)?.activateTool("zoom"),
    active: (e) => he(e)?.getActiveToolId() === "zoom",
    enabled: (e) => he(e) != null
  },
  {
    id: "tool:snapshot",
    labelKey: "commands.snapshot.tool",
    icon: "screenshot",
    categories: ["snapshots"],
    allowed: (e) => co(e)?.canSnapshot() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-content-copy",
    run: (e) => he(e)?.activateTool(cr),
    active: (e) => he(e)?.getActiveToolId() === cr,
    enabled: (e) => he(e)?.hasTool(cr) ?? !1
  },
  {
    id: "menu:document",
    labelKey: "commands.menu",
    icon: "menu",
    menu: "document"
  },
  {
    id: "menu:view",
    labelKey: "commands.viewControls",
    icon: "viewSettings",
    menu: "view"
  },
  ...wb,
  ...eb,
  ...lb,
  ...kb,
  gb,
  {
    id: "document:download",
    labelKey: "commands.download",
    icon: "download",
    shortcut: "Mod+S",
    categories: ["documents.download"],
    allowed: (e) => e.tryGet(Pe)?.canDownload() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-download",
    run: (e) => {
      e.tryGet(Pe) && Promise.resolve(Cb.run?.(e)).catch((t) => console.warn("[embedpdf] download failed", t));
    },
    enabled: (e) => e.documentId != null
  },
  {
    id: "document:print",
    labelKey: "commands.print",
    icon: "print",
    shortcut: "Mod+P",
    categories: ["documents.print"],
    allowed: (e) => e.tryGet(Pe)?.canPrint() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-print",
    modal: Sb,
    enabled: (e) => e.documentId != null
  },
  yr("view:single-page", "none", "commands.spread.none", "singlePage"),
  yr("view:two-pages", "odd", "commands.spread.odd", "doublePage"),
  yr("view:cover-page", "even", "commands.spread.even", "book2"),
  ds("view:scroll-vertical", "vertical", "commands.scroll.vertical", "vertical"),
  ds("view:scroll-horizontal", "horizontal", "commands.scroll.horizontal", "horizontal"),
  {
    id: "view:scroll-paged",
    labelKey: "commands.scroll.paged",
    icon: "pageByPage",
    run: (e) => z(e)?.updateSettings({ flow: "paged" }),
    active: (e) => z(e)?.getSettings().flow === "paged",
    enabled: (e) => z(e) != null,
    locked: (e) => z(e)?.getLock("flow") ?? null
  },
  {
    id: "view:rotate-clockwise",
    labelKey: "commands.rotate.clockwise",
    icon: "rotateClockwise",
    run: (e) => z(e)?.rotateViewBy(90),
    enabled: (e) => z(e) != null,
    locked: (e) => z(e)?.getLock("viewRotation") ?? null
  },
  {
    id: "view:rotate-counterclockwise",
    labelKey: "commands.rotate.counterclockwise",
    icon: "rotateCounterClockwise",
    run: (e) => z(e)?.rotateViewBy(-90),
    enabled: (e) => z(e) != null,
    locked: (e) => z(e)?.getLock("viewRotation") ?? null
  },
  {
    id: "mode:view",
    labelKey: "commands.mode.view",
    run: (e) => {
      const t = e.tryGet(H), n = t ? So(t) : null;
      n && t?.close(n), he(e)?.activateTool("pointer");
    },
    active: (e) => {
      const t = e.tryGet(H);
      return t ? So(t) === null : !0;
    }
  },
  zt("mode:annotate", "commands.mode.annotate", { feature: "annotations" }),
  zt("mode:shapes", "commands.mode.shapes", { feature: "shapes" }),
  zt("mode:insert", "commands.mode.insert"),
  zt("mode:form", "commands.mode.form", { feature: "forms.building" }),
  zt("mode:redact", "commands.mode.redact", { feature: "redaction" }),
  zt("mode:measure", "commands.mode.measure", { feature: "measurement" }),
  Z("tool:highlight", "highlight", "commands.annotate.highlight", "highlight", {
    feature: "annotations.highlight",
    check: re,
    accent: { primary: "color" }
  }),
  Z("tool:strikeout", "strikeout", "commands.annotate.strikeout", "strikethrough", {
    feature: "annotations.markup",
    check: re,
    accent: { primary: "color" }
  }),
  Z("tool:underline", "underline", "commands.annotate.underline", "underline", {
    feature: "annotations.markup",
    check: re,
    accent: { primary: "color" }
  }),
  Z("tool:squiggly", "squiggly", "commands.annotate.squiggly", "squiggly", {
    feature: "annotations.markup",
    check: re,
    accent: { primary: "color" }
  }),
  Z("tool:ink", "ink", "commands.annotate.ink", "pencilMarker", {
    feature: "annotations.drawing",
    check: re,
    accent: { primary: "color" }
  }),
  Z("tool:ink-highlight", "ink-highlight", "commands.annotate.inkHighlight", "inkHighlighter", {
    feature: "annotations.drawing",
    check: re,
    accent: { primary: "color" }
  }),
  Z("tool:free-text", "free-text", "commands.annotate.text", "freeText", {
    feature: "annotations.text",
    check: re,
    accent: { primary: "fontColor" }
  }),
  Z("tool:insert-text", "insert-text", "commands.annotate.insertText", "insertText", {
    feature: "annotations.text",
    check: re,
    accent: { primary: "color" }
  }),
  Z("tool:replace-text", "replace-text", "commands.annotate.replaceText", "replaceText", {
    feature: "annotations.text",
    check: re,
    accent: { primary: "color" }
  }),
  Z("tool:callout", "free-text-callout", "commands.annotate.callout", "callout", {
    feature: "annotations.text",
    check: re,
    accent: {
      primary: "color",
      secondary: "interiorColor"
    }
  }),
  Z("tool:note", "note", "commands.annotate.note", "message", {
    feature: "annotations.notes",
    check: re
  }),
  Z("tool:link", "link", "commands.annotate.link", "link", {
    feature: "annotations.links",
    check: re
  }),
  Z("tool:square", "square", "commands.shapes.rectangle", "square", {
    feature: "shapes",
    check: re,
    accent: {
      primary: "color",
      secondary: "interiorColor"
    }
  }),
  Z("tool:circle", "circle", "commands.shapes.circle", "circle", {
    feature: "shapes",
    check: re,
    accent: {
      primary: "color",
      secondary: "interiorColor"
    }
  }),
  Z("tool:line", "line", "commands.shapes.line", "line", {
    feature: "shapes",
    check: re,
    accent: { primary: "color" }
  }),
  Z("tool:arrow", "arrow", "commands.shapes.arrow", "lineArrow", {
    feature: "shapes",
    check: re,
    accent: { primary: "color" }
  }),
  Z("tool:polygon", "polygon", "commands.shapes.polygon", "polygon", {
    feature: "shapes",
    check: re,
    accent: {
      primary: "color",
      secondary: "interiorColor"
    }
  }),
  Z("tool:polyline", "polyline", "commands.shapes.polyline", "zigzag", {
    feature: "shapes",
    check: re,
    accent: { primary: "color" }
  }),
  {
    id: "tool:stamp",
    labelKey: "commands.insert.stamp",
    icon: "rubberStamp",
    categories: ["stamps"],
    ...cs,
    ...Zn("stamps", (e) => e.tryGet(Oe) != null)
  },
  Z("tool:attachment", "attachment", "commands.insert.attachment", "paperclip", {
    feature: "attachments.adding",
    check: re
  }),
  {
    id: "tool:signature",
    labelKey: "commands.insert.signature",
    icon: "signature",
    categories: ["signatures.signing"],
    ...cs,
    ...Zn("signatures", (e) => e.tryGet(Oe) != null && e.tryGet(nn) != null)
  },
  Z("tool:image", "image", "commands.insert.image", "photo", {
    feature: "stamps",
    check: re
  }),
  {
    id: "form:design",
    labelKey: "commands.form.design",
    icon: "formDesign",
    categories: ["forms.building"],
    ...pt,
    run: (e) => {
      const t = he(e), n = e.tryGet(H);
      if (t) {
        if (ls(e)) {
          t.activateTool("pointer"), n?.close(ss);
          return;
        }
        n && !n.isOpen("mode:form") && n.open("mode:form", { exclusive: "mode" }), t.activateTool(Mb), n?.open(ss);
      }
    },
    active: ls,
    enabled: (e) => he(e) != null
  },
  Z("tool:text-field", "form-text", "commands.form.textfield", "formTextfield", {
    feature: "forms.building",
    check: pt
  }),
  Z("tool:checkbox", "form-checkbox", "commands.form.checkbox", "formCheckbox", {
    feature: "forms.building",
    check: pt
  }),
  Z("tool:radio", "form-radio", "commands.form.radio", "formRadio", {
    feature: "forms.building",
    check: pt
  }),
  Z("tool:combo-box", "form-combobox", "commands.form.select", "formSelect", {
    feature: "forms.building",
    check: pt
  }),
  Z("tool:list-box", "form-listbox", "commands.form.listbox", "formListbox", {
    feature: "forms.building",
    check: pt
  }),
  Z("tool:button", "form-button", "commands.form.button", "formButton", {
    feature: "forms.building",
    check: pt
  }),
  Z("tool:signature-field", "form-signature", "commands.form.signature", "signature", {
    feature: "forms.building",
    check: pt
  }),
  Z("tool:redact", "redact", "commands.redact.mark", "redactArea", {
    feature: "redaction",
    check: {
      allowed: (e) => e.tryGet(ht)?.canMark() ?? !0,
      notAllowedKey: "commands.notAllowed.annotations-create"
    }
  }),
  {
    id: "redaction:apply",
    labelKey: "commands.redact.applyAll",
    icon: "redact",
    categories: ["redaction"],
    allowed: (e) => e.tryGet(ht)?.canApply() ?? !0,
    modal: is,
    enabled: (e) => {
      const t = e.tryGet(ht);
      return !!t && t.getPendingCount() > 0 && !t.isApplying();
    }
  },
  {
    id: "annotation:apply-redaction",
    labelKey: "commands.redact.apply",
    labelParams: (e) => ({ count: vr(e).length }),
    icon: "check",
    categories: ["redaction"],
    allowed: (e) => e.tryGet(ht)?.canApply() ?? !0,
    run: (e) => e.tryGet(H)?.open(is, {
      exclusive: "modal",
      props: { refs: vr(e) }
    }),
    visible: (e) => vr(e).length > 0,
    enabled: (e) => {
      const t = e.tryGet(ht);
      return !!t && !t.isApplying();
    }
  },
  {
    ...Z("tool:distance", "distance", "measurement.distance", "distance", {
      feature: "measurement",
      check: re,
      accent: { primary: "color" }
    }),
    enabled: mr
  },
  {
    ...Z("tool:perimeter", "perimeter", "measurement.perimeter", "perimeter", {
      feature: "measurement",
      check: re,
      accent: { primary: "color" }
    }),
    enabled: mr
  },
  {
    ...Z("tool:area", "area", "measurement.area", "area", {
      feature: "measurement",
      check: re,
      accent: { primary: "color" }
    }),
    enabled: mr
  },
  {
    id: "measurement:calibrate",
    labelKey: "measurement.calibrate",
    icon: "calibrate",
    categories: ["measurement"],
    allowed: (e) => e.tryGet(_t)?.canCalibrate() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-annotate-modify",
    enabled: (e) => e.tryGet(_t) != null,
    active: (e) => he(e)?.getActiveToolId() === "calibrate",
    run: (e) => e.tryGet(_t)?.startCalibration()
  },
  {
    id: "annotation:cancel-creation",
    labelKey: "commands.annotate.cancelCreation",
    shortcut: "Escape",
    enabled: (e) => de(e)?.draft.get() != null,
    run: (e) => de(e)?.draft.cancel()
  },
  {
    id: "annotation:delete",
    labelKey: "commands.annotate.delete",
    icon: "trash",
    shortcut: ["Delete", "Backspace"],
    categories: ["annotations"],
    run: (e) => void de(e)?.selection.delete(),
    visible: hr,
    enabled: (e) => {
      const t = de(e), n = t?.selection.getSelected() ?? [];
      return n.length > 0 && n.every(({ ref: o }) => t.canDelete(o) && t.isEditable(o));
    }
  },
  {
    id: "annotation:comment",
    labelKey: "commands.comment",
    icon: "comment",
    categories: ["comments"],
    ...Zn("comments", (e) => hr(e) && !br(e).has("widget"))
  },
  {
    id: "annotation:style",
    labelKey: "commands.style",
    icon: "palette",
    categories: ["annotations"],
    ...Zn("style", (e) => (de(e)?.selection.getProperties().properties.length ?? 0) > 0)
  },
  {
    id: "annotation:stamp-from-selection",
    labelKey: "commands.annotate.stampFromSelection",
    icon: "rubberStampPlus",
    categories: ["stamps"],
    allowed: (e) => e.tryGet(Oe)?.canCreateFromAnnotations(e.documentId ?? void 0) ?? !0,
    notAllowedKey: "commands.notAllowed.doc-download",
    run: (e) => {
      const t = de(e), n = e.tryGet(Oe), o = e.documentId;
      if (!t || !n || o == null) return;
      const r = t.selection.getSelected(), a = r[0]?.ref.page;
      if (a === void 0) return;
      const s = e.tryGet($o), l = s?.t("demo.stampsCustomLabel") ?? "Custom stamp", d = s?.t("demo.stampsCustomLibrary") ?? "My stamps", c = Tb;
      (n.getLibrary(c) ? Promise.resolve(c) : n.createLibrary(d, {
        id: c,
        categories: ["custom"]
      }).then(({ library: p }) => p.id)).then((p) => n.createAssetFromAnnotations(a, r.map((f) => f.ref), {
        libraryId: p,
        label: `${l} ${n.listAssets({ libraryId: p }).length + 1}`
      }, { documentId: o })).then(async () => {
        const p = e.tryGet(H);
        p && (p.isOpen("stamps") || await e.tryGet($e)?.execute(It("stamps"), { documentId: o }), p.updateSurfaceProps("stamps", { libraryId: c }));
      }).catch((p) => console.warn("[embedpdf] stamp from selection failed", p));
    },
    visible: (e) => e.tryGet(Oe) != null && hr(e) && !br(e).has("widget") && !br(e).has("redact") && new Set((de(e)?.selection.getSelected() ?? []).map((t) => t.ref.page.objectNumber)).size === 1
  },
  {
    id: "annotation:duplicate",
    labelKey: "commands.annotate.duplicate",
    icon: "duplicate",
    shortcut: "Mod+D",
    categories: ["annotations"],
    allowed: (e) => {
      const t = de(e);
      return (t?.selection.getSelected() ?? []).some(({ subtype: n }) => n !== "widget") ? t?.canCreate() ?? !0 : !0;
    },
    notAllowedKey: re.notAllowedKey,
    run: (e) => void de(e)?.selection.duplicate().catch(() => {
    }),
    visible: (e) => {
      const t = de(e), n = t?.selection.getSelected() ?? [];
      return n.length > 0 && gr(e) && n.every(({ ref: o }) => t.isMovable(o));
    },
    enabled: (e) => de(e)?.selection.canDuplicate() ?? !1
  },
  {
    id: "annotation:group",
    labelKey: "commands.annotate.group",
    icon: "group",
    categories: ["annotations"],
    run: (e) => void de(e)?.selection.group(),
    visible: (e) => (de(e)?.selection.canGroup() ?? !1) && gr(e)
  },
  {
    id: "annotation:ungroup",
    labelKey: "commands.annotate.ungroup",
    icon: "ungroup",
    categories: ["annotations"],
    run: (e) => void de(e)?.selection.ungroup(),
    visible: (e) => (de(e)?.selection.canUngroup() ?? !1) && gr(e)
  },
  {
    id: "selection:copy",
    labelKey: "commands.selection.copy",
    icon: "copy",
    categories: ["text.copy"],
    allowed: (e) => lo(e)?.canCopy() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-text-copy",
    visible: (e) => lo(e)?.hasSelection() ?? !1,
    run: (e) => {
      const t = lo(e);
      if (!t) return;
      const n = t.getRange();
      Wp(t).then((o) => {
        o !== "" && Ab(t.getRange(), n) && t.clear();
      }, () => {
      });
    }
  },
  wr("selection:highlight", "highlight", "commands.annotate.highlight", "highlight", "annotations.highlight"),
  wr("selection:underline", "underline", "commands.annotate.underline", "underline", "annotations.markup"),
  wr("selection:strikeout", "strikeout", "commands.annotate.strikeout", "strikethrough", "annotations.markup"),
  {
    id: "snapshot:copy",
    labelKey: "commands.snapshot.copy",
    icon: "copy",
    shortcut: "Mod+C",
    categories: ["snapshots"],
    visible: (e) => Xn(e) != null,
    run: (e) => {
      const t = co(e), n = t?.getSnapshot();
      !t || !n || Vp(n.image).then(() => {
        t.getSnapshot() === n && t.clearSnapshot();
      }, () => {
      });
    }
  },
  {
    id: "snapshot:save",
    labelKey: "commands.snapshot.save",
    icon: "download",
    categories: ["snapshots"],
    visible: (e) => Xn(e) != null,
    run: (e) => {
      const t = Xn(e);
      if (!t) return;
      const n = Eb(e, t.page);
      t.image.then((o) => o.blob()).then((o) => la(o, n, "image/png")).catch((o) => console.warn("[snippet-react] snapshot save failed", o));
    }
  },
  {
    id: "snapshot:clear",
    labelKey: "commands.snapshot.clear",
    icon: "x",
    shortcut: "Escape",
    categories: ["snapshots"],
    visible: (e) => Xn(e) != null,
    run: (e) => co(e)?.clearSnapshot()
  },
  {
    id: "annotation:link",
    labelKey: "commands.annotate.link",
    icon: "link",
    categories: ["annotations.links"],
    run: (e) => e.tryGet(H)?.toggle("link-editor"),
    active: (e) => e.tryGet(H)?.isOpen("link-editor") ?? !1,
    visible: (e) => Jn(e) === null
  },
  {
    id: "annotation:goto-link",
    labelKey: "commands.annotate.gotoLink",
    icon: "externalLink",
    run: (e) => {
      const t = Jn(e);
      t && e.tryGet(bo)?.activate(t);
    },
    visible: (e) => Jn(e) != null
  },
  {
    id: "annotation:remove-link",
    labelKey: "commands.annotate.removeLink",
    icon: "linkOff",
    categories: ["annotations.links"],
    run: (e) => de(e)?.selection.updateLink(null),
    visible: (e) => Jn(e) != null
  },
  {
    id: "help:shortcuts",
    labelKey: "commands.shortcuts",
    shortcut: "?",
    modal: Ec,
    enabled: (e) => e.tryGet(H) != null
  },
  {
    id: "history:undo",
    labelKey: "commands.undo",
    icon: "arrowBackUp",
    shortcut: "Mod+z",
    run: (e) => e.tryGet(Un)?.undo(),
    enabled: (e) => e.tryGet(Un)?.canUndo() ?? !1
  },
  {
    id: "history:redo",
    labelKey: "commands.redo",
    icon: "arrowForwardUp",
    shortcut: ["Shift+Mod+z", "Mod+y"],
    run: (e) => e.tryGet(Un)?.redo(),
    enabled: (e) => e.tryGet(Un)?.canRedo() ?? !1
  }
];
function zt(e, t, { feature: n } = {}) {
  return {
    id: e,
    labelKey: t,
    ...n ? { categories: [n] } : {},
    run: (o) => {
      o.tryGet(H)?.toggle(e, { exclusive: "mode" }), he(o)?.activateTool("pointer");
    },
    active: (o) => o.tryGet(H)?.isOpen(e) ?? !1
  };
}
function Lb(e, t) {
  return e.flatMap((n) => {
    const o = `tool:${n.id}`;
    if (t(o)) return [];
    const r = n.extends, a = n.meta ?? {}, s = typeof a.icon == "string" ? a.icon : r && Ut[r]?.icon;
    return [{
      ...Lc(o, n.id, s || void 0, {
        feature: r && Nc[r] || "annotations",
        check: re,
        ...r && Ut[r]?.accent ? { accent: Ut[r].accent } : {}
      }),
      label: typeof a.label == "string" ? a.label : n.id
    }];
  });
}
const Ft = {
  id: "style",
  items: ["panel:style"],
  importance: 4,
  dependent: !0
}, Bt = {
  id: "history",
  items: ["history:undo", "history:redo"],
  importance: 3,
  dependent: !0
}, Ic = {
  bars: {
    main: {
      place: "top",
      start: [
        {
          id: "document",
          items: ["menu:document"],
          importance: 5
        },
        {
          id: "view",
          items: [{
            command: "panel:thumbnails",
            importance: 5
          }, "menu:view"],
          importance: 3
        },
        {
          id: "zoom",
          items: [{
            custom: "zoom",
            command: "menu:zoom",
            variants: ["inline", "button"]
          }],
          importance: 3
        },
        {
          id: "tools",
          items: ["tool:pan", "tool:pointer"],
          importance: 2
        }
      ],
      center: [{
        id: "modes",
        items: [],
        shed: !0,
        collapse: "select",
        importance: 4,
        titleKey: "commands.mode.group"
      }],
      end: [{
        id: "panels",
        items: ["panel:search", "panel:comments"],
        importance: 5
      }]
    },
    annotate: {
      place: { with: "main" },
      mode: "annotate",
      titleKey: "commands.mode.annotate",
      center: [
        {
          id: "comment",
          items: ["tool:note", "tool:link"],
          importance: 4
        },
        {
          id: "markup",
          items: [
            "tool:highlight",
            "tool:strikeout",
            "tool:underline",
            "tool:squiggly"
          ],
          importance: 4
        },
        {
          id: "draw",
          items: ["tool:ink", "tool:ink-highlight"],
          importance: 3
        },
        {
          id: "text",
          items: [
            "tool:free-text",
            "tool:insert-text",
            "tool:replace-text",
            "tool:callout"
          ],
          importance: 2
        },
        Ft,
        Bt
      ]
    },
    shapes: {
      place: { with: "main" },
      mode: "shapes",
      titleKey: "commands.mode.shapes",
      center: [
        {
          id: "shapes",
          items: [
            "tool:square",
            "tool:circle",
            "tool:line",
            "tool:arrow"
          ],
          importance: 4
        },
        {
          id: "polygons",
          items: ["tool:polygon", "tool:polyline"],
          importance: 2
        },
        Ft,
        Bt
      ]
    },
    insert: {
      place: { with: "main" },
      mode: "insert",
      titleKey: "commands.mode.insert",
      center: [
        {
          id: "stamps",
          items: [
            "tool:stamp",
            {
              custom: "quick-stamps",
              command: "tool:stamp",
              importance: 3
            },
            "tool:attachment",
            "tool:signature",
            "tool:image"
          ],
          importance: 4
        },
        Ft,
        Bt
      ]
    },
    form: {
      place: { with: "main" },
      mode: "form",
      titleKey: "commands.mode.form",
      center: [
        {
          id: "design",
          items: ["form:design"],
          importance: 5
        },
        {
          id: "fields",
          items: [
            "tool:text-field",
            "tool:checkbox",
            "tool:radio"
          ],
          importance: 4
        },
        {
          id: "choices",
          items: ["tool:combo-box", "tool:list-box"],
          importance: 2
        },
        {
          id: "buttons",
          items: ["tool:button"],
          importance: 2
        },
        {
          id: "signatures",
          items: ["tool:signature-field"],
          importance: 2
        },
        Ft,
        Bt
      ]
    },
    redact: {
      place: { with: "main" },
      mode: "redact",
      titleKey: "commands.mode.redact",
      center: [
        {
          id: "redact",
          items: ["tool:redact", "panel:redaction"],
          importance: 4
        },
        Ft,
        Bt
      ]
    },
    measure: {
      place: { with: "main" },
      mode: "measure",
      titleKey: "commands.mode.measure",
      center: [
        {
          id: "measure",
          items: [
            "tool:distance",
            "tool:perimeter",
            "tool:area",
            "measurement:calibrate"
          ],
          importance: 5
        },
        {
          id: "scale",
          items: [{
            custom: "measurement-scale",
            command: "panel:measurement",
            variants: ["inline"]
          }],
          importance: 4
        },
        Ft
      ]
    },
    pager: {
      place: { float: "bottom" },
      center: [{
        id: "pages",
        items: [
          "page:previous",
          { custom: "page-number" },
          "page:next"
        ],
        importance: 5
      }]
    },
    selection: {
      place: { at: "selection" },
      center: [{
        id: "selection",
        items: [
          "selection:copy",
          "selection:highlight",
          "selection:underline",
          "selection:strikeout"
        ],
        importance: 4
      }]
    },
    snapshot: {
      place: { at: "snapshot" },
      center: [{
        id: "snapshot",
        items: ["snapshot:copy", "snapshot:save"],
        importance: 4
      }]
    },
    annotation: {
      place: { at: "annotation" },
      center: [{
        id: "actions",
        items: [
          "annotation:comment",
          "annotation:style",
          "annotation:stamp-from-selection",
          "annotation:link",
          "annotation:goto-link",
          "annotation:save-file",
          "annotation:remove-link",
          "annotation:duplicate",
          "annotation:group",
          "annotation:ungroup"
        ],
        importance: 4
      }, {
        id: "danger",
        items: ["annotation:apply-redaction", "annotation:delete"],
        importance: 5
      }]
    },
    thumbnails: {
      place: { panel: "thumbnails" },
      start: [{
        id: "edit",
        items: [
          "page:insert-blank",
          "page:rotate-counterclockwise",
          "page:rotate-clockwise",
          "page:delete"
        ],
        importance: 4
      }, {
        id: "more",
        items: [
          "page:insert-file",
          "page:duplicate",
          "page:extract"
        ],
        importance: 1
      }],
      end: [Bt]
    },
    outline: {
      place: { panel: "outline" },
      start: [{
        id: "filter",
        items: [{
          custom: "outline-filter",
          variants: ["wide", "narrow"]
        }]
      }],
      end: [{
        id: "items",
        items: [
          "outline:add",
          "outline:expand-all",
          "outline:collapse-all"
        ]
      }]
    },
    attachments: {
      place: { panel: "attachments" },
      start: [{
        id: "count",
        items: [{ custom: "attachments-count" }],
        dependent: !0
      }],
      end: [{
        id: "files",
        items: ["attachment:add"]
      }]
    }
  },
  menus: {
    document: [[
      "document:open",
      "document:download",
      "document:print",
      "tool:snapshot"
    ], ["view:fullscreen"]],
    view: [
      {
        titleKey: "commands.spread.group",
        items: [
          "view:single-page",
          "view:two-pages",
          "view:cover-page"
        ]
      },
      {
        titleKey: "commands.scroll.group",
        items: [
          "view:scroll-vertical",
          "view:scroll-horizontal",
          "view:scroll-paged"
        ]
      },
      {
        titleKey: "commands.rotate.group",
        items: ["view:rotate-clockwise", "view:rotate-counterclockwise"]
      },
      ["view:fullscreen"]
    ],
    zoom: [
      {
        titleKey: "commands.zoom.level",
        items: [
          "zoom:50",
          "zoom:100",
          "zoom:150",
          "zoom:200",
          "zoom:400"
        ]
      },
      [
        "zoom:in",
        "zoom:out",
        "tool:zoom"
      ],
      [
        "zoom:fit-page",
        "zoom:fit-width",
        "zoom:automatic"
      ]
    ],
    "outline-item": [
      ["outline:add", "outline:add-child"],
      [
        "outline:rename",
        "outline:set-destination",
        "outline:properties"
      ],
      ["outline:delete"]
    ],
    "attachment-item": [["attachment:save", "attachment:go-to"], ["attachment:delete"]],
    "comment-item": [{
      titleKey: "comments.status",
      items: [
        "comment:status-accepted",
        "comment:status-rejected",
        "comment:status-cancelled",
        "comment:status-completed",
        "comment:status-none"
      ]
    }, ["comment:delete-thread"]],
    page: [
      ["page:rotate-clockwise", "page:rotate-counterclockwise"],
      [
        "page:insert-blank",
        "page:insert-file",
        "page:duplicate"
      ],
      ["page:extract"],
      ["page:delete"]
    ]
  },
  panels: {
    thumbnails: { side: "start" },
    outline: { side: "start" },
    attachments: { side: "start" },
    search: { side: "end" },
    comments: { side: "end" },
    style: { side: "end" },
    stamps: { side: "end" },
    signatures: { side: "end" },
    redaction: { side: "end" },
    measurement: { side: "end" },
    "form-design": { side: "end" }
  }
}, Ib = uu(Ic), Rb = [
  "iconAccent",
  "allowed",
  "enabled",
  "active",
  "visible",
  "labelParams",
  "run"
], Db = [["label", "labelKey"], [
  "run",
  "menu",
  "panel",
  "modal"
]];
function $b(e, t) {
  const n = (a) => typeof a != "string" ? a : Object.prototype.hasOwnProperty.call(t.plugins, a) ? t.plugins[a] ?? null : null, o = ((a) => {
    const s = n(a);
    if (!s) throw new Error(`[embedpdf] the viewer has no plugin named "${String(a)}". Its plugins: ${Object.keys(t.plugins).join(", ")}.`);
    return e.get(s);
  }), r = ((a) => {
    const s = n(a);
    return s ? e.tryGet(s) : null;
  });
  return {
    documentId: e.documentId,
    appState: e.appState,
    ...e.args === void 0 ? {} : { args: e.args },
    ...e.signal ? { signal: e.signal } : {},
    get: o,
    tryGet: r,
    get viewer() {
      const a = t.viewer();
      if (!a) throw new Error("[embedpdf] the viewer is not live yet");
      return a;
    }
  };
}
function zb(e, t) {
  const n = /* @__PURE__ */ new WeakMap(), o = (a) => {
    let s = n.get(a);
    return s || (s = $b(a, t), n.set(a, s)), s;
  }, r = { ...e };
  for (const a of Rb) {
    const s = e[a];
    s && (r[a] = (l) => s(o(l)));
  }
  return r;
}
function Fb(e, t) {
  const n = { ...e };
  for (const o of Db)
    if (o.some((r) => t[r] !== void 0))
      for (const r of o) delete n[r];
  for (const [o, r] of Object.entries(t)) r !== void 0 && (n[o] = r);
  return n;
}
const ps = (e) => e.shortcut === void 0 ? [] : [].concat(e.shortcut), Bb = {
  commands: [],
  isYours: () => !1,
  over: (e) => e
};
function Kb(e, t, n, o) {
  const r = /* @__PURE__ */ new Map();
  for (const c of t) r.set(c.id, zb(c, n));
  const a = [...r.values()].flatMap(ps), s = (c) => a.some((p) => {
    try {
      return mu(p, c, o);
    } catch {
      return !1;
    }
  }), l = (c) => {
    const p = ps(c), f = p.filter((g) => !s(g)), u = f.length === p.length ? c : {
      ...c,
      shortcut: f
    }, m = r.get(c.id);
    return m ? Fb(u, m) : u;
  }, d = new Set(e.map((c) => c.id));
  return {
    commands: [...e.map(l), ...[...r.values()].filter((c) => !d.has(c.id))],
    isYours: (c) => r.has(c) && !d.has(c),
    over: l
  };
}
const et = be({
  icons: {},
  viewerCommands: Bb,
  stamp: {},
  signature: {},
  fonts: [],
  warnBeforeLeaving: !0
}), jb = et.Provider;
function Hb() {
  return X(et).layout;
}
function Ub() {
  const { size: e, touch: t } = X(et);
  return {
    size: e,
    touch: t
  };
}
function Gb() {
  return X(et).warnBeforeLeaving;
}
function Rc() {
  const { onPanelResize: e } = X(et);
  return (t) => e?.(t);
}
const Ea = {
  size: "expanded",
  width: pu,
  touch: !1,
  dir: "ltr"
};
function uo(e, t, n) {
  const o = fu(e, t).map(n).filter((a) => a !== null);
  if (o.length <= 1) return o[0] ?? null;
  const r = {};
  for (const a of [
    "start",
    "center",
    "end"
  ]) {
    const s = o.flatMap((l) => (l.sections[a] ?? []).map((d) => ({
      ...d,
      id: `${l.id}.${d.id}`
    })));
    s.length > 0 && (r[a] = s);
  }
  return {
    id: t,
    sections: r
  };
}
function Wb(e, t) {
  const n = (o) => ll(e, o);
  return {
    data: e,
    env: t,
    bar: n,
    strip: (o) => uo(e, o, n),
    menu: (o) => sl(e, o)
  };
}
const $n = be(Wb(Ic, Ea)), Vb = $n.Provider;
function tt() {
  return X($n);
}
function ut() {
  return X($n).env;
}
function qb(e) {
  return X($n).menu(e);
}
function Aa(e) {
  return X($n).strip(e) ?? void 0;
}
function Na() {
  return X(et).viewerCommands;
}
function Dc() {
  return X(et).icons;
}
function Yb() {
  return X(et).stamp;
}
function nx() {
  return X(et).signature;
}
function Xb() {
  return X(et).fonts;
}
const Zb = (e) => Array.isArray(e);
function Jb(e) {
  if (typeof e == "string") return [e];
  if (Zb(e)) return e;
  const t = typeof e.paths == "string" ? [e.paths] : e.paths;
  return e.fill ? t.map((n) => typeof n == "string" ? {
    d: n,
    fill: !0
  } : n) : t;
}
const fs = [{
  d: "M5 4H19M20 5V19M19 20H5M4 19V5",
  stroke: "primary"
}, {
  d: "M3.1 3.1h1.8v1.8H3.1zM19.1 3.1h1.8v1.8h-1.8zM3.1 19.1h1.8v1.8H3.1zM19.1 19.1h1.8v1.8h-1.8z",
  stroke: "primary"
}], $c = {
  ruler: ["M3 8h18v8H3z", "M7 8v4M11 8v2M15 8v4M19 8v2"],
  distance: [{
    d: "M5 12H19",
    stroke: "primary",
    strokeDasharray: "2 2"
  }, {
    d: "M3.5 10.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 1 0 0-3M20.5 10.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 1 0 0-3",
    stroke: "primary",
    fill: "primary",
    fillOpacity: 0.25
  }],
  perimeter: fs,
  area: [
    {
      d: "M5 4H19V5H20V19H19V20H5V19H4V5H5Z",
      fill: "primary",
      fillOpacity: 0.08
    },
    {
      d: "M4.5 7.5L7.5 4.5M4.5 10.5L10.5 4.5M4.5 13.5L13.5 4.5M4.5 16.5L16.5 4.5M4.5 19.5L19.5 4.5M7.5 19.5L19.5 7.5M10.5 19.5L19.5 10.5M13.5 19.5L19.5 13.5M16.5 19.5L19.5 16.5",
      stroke: "primary",
      strokeWidth: 0.6,
      strokeOpacity: 0.5
    },
    ...fs
  ],
  alertTriangle: ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"],
  alignBottom: [
    "M3 19v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
    "M11 17h2",
    "M9 14h6",
    "M10 11h4"
  ],
  alignCenter: [
    "M4 6l16 0",
    "M8 12l8 0",
    "M6 18l12 0"
  ],
  alignLeft: [
    "M4 6l16 0",
    "M4 12l10 0",
    "M4 18l14 0"
  ],
  alignMiddle: [
    "M3 19v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
    "M11 15h2",
    "M9 12h6",
    "M10 9h4"
  ],
  alignRight: [
    "M4 6l16 0",
    "M10 12l10 0",
    "M6 18l14 0"
  ],
  alignTop: [
    "M3 19v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
    "M11 13h2",
    "M9 10h6",
    "M10 7h4"
  ],
  arrowBackUp: ["M9 14l-4 -4l4 -4", "M5 10h11a4 4 0 1 1 0 8h-1"],
  arrowForwardUp: ["M15 14l4 -4l-4 -4", "M19 10h-11a4 4 0 1 0 0 8h1"],
  bold: ["M7 5h6a3.5 3.5 0 0 1 0 7h-6z", "M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7"],
  book: [
    "M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0",
    "M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0",
    "M3 6l0 13",
    "M12 6l0 13",
    "M21 6l0 13"
  ],
  book2: [
    "M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z",
    "M19 16h-12a2 2 0 0 0 -2 2",
    "M9 8h6"
  ],
  calibrate: [
    "M12 12m-7.5 0a7.5 7.5 0 1 0 15 0a7.5 7.5 0 1 0 -15 0",
    "M12 2.75V7M12 17V21.25M2.75 12H7M17 12H21.25",
    "M12 12m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0"
  ],
  callout: [
    {
      d: "M20 6v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1",
      stroke: "primary",
      fill: "secondary"
    },
    {
      d: "M17 11v6h-9",
      stroke: "primary"
    },
    {
      d: "M8 15l-2 2l2 2",
      stroke: "primary"
    }
  ],
  check: ["M5 12l5 5l10 -10"],
  chevronDown: ["M6 9l6 6l6 -6"],
  chevronLeft: ["M15 6l-6 6l6 6"],
  chevronRight: ["M9 6l6 6l-6 6"],
  chevronsDown: ["M7 7l5 5l5 -5", "M7 13l5 5l5 -5"],
  chevronsUp: ["M7 11l5 -5l5 5", "M7 17l5 -5l5 5"],
  circle: [{
    d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
    stroke: "primary",
    fill: "secondary"
  }],
  circleCheck: ["M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M9 12l2 2l4 -4"],
  comment: [
    "M12 11v.01",
    "M8 11v.01",
    "M16 11v.01",
    "M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3z"
  ],
  copy: ["M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z", "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"],
  deviceFloppy: [
    "M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2",
    "M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M14 4l0 4l-6 0l0 -4"
  ],
  dots: [
    "M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
  ],
  doublePage: ["M3 3m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v16a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1zm9 -1v18"],
  download: [
    "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2",
    "M7 11l5 5l5 -5",
    "M12 4l0 12"
  ],
  duplicate: [
    "M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z",
    "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1",
    "M11 14h6",
    "M14 11v6"
  ],
  externalLink: [
    "M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6",
    "M11 13l9 -9",
    "M15 4h5v5"
  ],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"],
  file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"],
  fileExport: ["M14 3v4a1 1 0 0 0 1 1h4", "M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"],
  fileImport: ["M14 3v4a1 1 0 0 0 1 1h4", "M5 13v-8a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5.5m-9.5 -2h7m-3 -3l3 3l-3 3"],
  filePlus: [
    "M14 3v4a1 1 0 0 0 1 1h4",
    "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z",
    "M12 11l0 6",
    "M9 14l6 0"
  ],
  fitToPage: [
    "M12 20h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h6",
    "M18 14v7",
    "M18 3v7",
    "M15 18l3 3l3 -3",
    "M15 6l3 -3l3 3"
  ],
  fitToWidth: [
    "M4 12v-6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6",
    "M10 18h-7",
    "M21 18h-7",
    "M6 15l-3 3l3 3",
    "M18 15l3 3l-3 3"
  ],
  formButton: ["M3 8a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-8", "M8 12h8"],
  formCheckbox: ["M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14", "M9 12l2 2l4 -4"],
  formDesign: [
    "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2",
    "M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2",
    "M9 12l.01 0",
    "M13 12l2 0",
    "M9 16l.01 0",
    "M13 16l2 0"
  ],
  formListbox: [
    "M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14",
    "M11 8h6",
    "M11 12h6",
    "M11 16h6",
    "M7 8l0 .01",
    "M7 12l0 .01",
    "M7 16l0 .01"
  ],
  formRadio: [{
    d: "M9 12a2 2 0 1 0 6 0a2 2 0 1 0 -6 0",
    fill: !0
  }, "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"],
  formSelect: ["M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14", "M9 11l3 3l3 -3"],
  formTextfield: [
    "M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3",
    "M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3",
    "M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7",
    "M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1",
    "M17 12h.01",
    "M13 12h.01"
  ],
  freeText: [
    {
      d: "M4 7v-2h12v2",
      stroke: "primary"
    },
    {
      d: "M10 5v14",
      stroke: "primary"
    },
    {
      d: "M12 19h-4",
      stroke: "primary"
    },
    {
      d: "M15 13v-1h6v1",
      stroke: "primary"
    },
    {
      d: "M18 12v7",
      stroke: "primary"
    },
    {
      d: "M17 19h2",
      stroke: "primary"
    }
  ],
  fullscreen: [
    "M4 8v-2a2 2 0 0 1 2 -2h2",
    "M4 16v2a2 2 0 0 0 2 2h2",
    "M16 4h2a2 2 0 0 1 2 2v2",
    "M16 20h2a2 2 0 0 0 2 -2v-2"
  ],
  fullscreenExit: [
    "M4 8v-2c0 -.551 .223 -1.05 .584 -1.412",
    "M4 16v2a2 2 0 0 0 2 2h2",
    "M16 4h2a2 2 0 0 1 2 2v2",
    "M16 20h2c.545 0 1.04 -.218 1.4 -.572",
    "M3 3l18 18"
  ],
  group: [
    "M3 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M17 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M3 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M17 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M5 7v10",
    "M19 7v10",
    "M7 5h10",
    "M7 19h10",
    "M8 8H12.8V11.2H16V16H11.2V12.8H8V8Z"
  ],
  hand: [
    "M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5",
    "M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5",
    "M14 5.5a1.5 1.5 0 0 1 3 0v6.5",
    "M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"
  ],
  highlight: [
    {
      d: "M4 6h16a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2H4a2 2 0 0 1 -2 -2V8a2 2 0 0 1 2 -2z",
      fill: "primary"
    },
    "M8 16v-8a4 4 0 1 1 8 0v8",
    "M8 10h8"
  ],
  horizontal: [
    "M7 8l-4 4l4 4",
    "M17 8l4 4l-4 4",
    "M3 12l18 0"
  ],
  inkHighlighter: [
    "M3 19h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4",
    "M12.5 5.5l4 4",
    "M4.5 13.5l4 4",
    {
      d: "M21 15v4h-8l4 -4l4 0",
      stroke: "primary",
      fill: "primary"
    }
  ],
  insertText: [
    {
      d: "M3 7v-2h12v2",
      stroke: "primary"
    },
    {
      d: "M9 5v14",
      stroke: "primary"
    },
    {
      d: "M7 19h4",
      stroke: "primary"
    },
    {
      d: "M18 15l2 2h-5",
      stroke: "primary"
    },
    {
      d: "M18 19l2 -2",
      stroke: "primary"
    }
  ],
  italic: [
    "M11 5l6 0",
    "M7 19l6 0",
    "M14 5l-4 14"
  ],
  line: [{
    d: "M20 4l-16 16",
    stroke: "primary"
  }],
  lineArrow: [{
    d: "M20 4l-16 16",
    stroke: "primary"
  }, {
    d: "M16 3h5v5",
    stroke: "primary"
  }],
  link: [
    "M9 15l6 -6",
    "M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464",
    "M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"
  ],
  linkOff: [
    "M9 15l3 -3m2 -2l1 -1",
    "M11 6l.463 -.536a5 5 0 0 1 7.072 7.071l-.534 .464",
    "M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463",
    "M3 3l18 18"
  ],
  listTree: [
    "M9 6h11",
    "M12 12h8",
    "M15 18h5",
    "M5 6v.01",
    "M8 12v.01",
    "M11 18v.01"
  ],
  lock: ["M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2v-7a2 2 0 0 1 2 -2z", "M7 11V7a5 5 0 0 1 10 0v4"],
  marqueeSelect: [
    "M17 20h6",
    "M20 17v6",
    "M4 13v-2",
    "M4 6v-1a1 1 0 0 1 1 -1h1",
    "M6 20h-1a1 1 0 0 1 -1 -1v-1",
    "M11 4h2",
    "M11 20h2",
    "M18 4h1a1 1 0 0 1 1 1v1",
    "M20 11v2"
  ],
  menu: ["M4 8l16 0", "M4 16l16 0"],
  message: [
    "M8 9h8",
    "M8 13h6",
    "M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12"
  ],
  pageByPage: [
    "M8 4m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z",
    "M5 9l-3 3l3 3",
    "M19 9l3 3l-3 3"
  ],
  pageRotateClockwise: [
    "M5 9h7a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-7a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1z",
    "M9 4h5a5 5 0 0 1 5 5v4",
    "M16 10l3 3l3 -3"
  ],
  pageRotateCounterClockwise: [
    "M19 9h-7a1 1 0 0 0 -1 1v10a1 1 0 0 0 1 1h7a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1z",
    "M15 4h-5a5 5 0 0 0 -5 5v4",
    "M8 10l-3 3l-3 -3"
  ],
  palette: [
    "M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25",
    "M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
  ],
  paperclip: ["M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5"],
  pencilMarker: ["m9.109 16.275 8.856-8.097c.812-.743.87-2.014.127-2.826s-2.014-.869-2.826-.127L6.41 13.322l-.127 2.826zM13.79 6.575l2.7 2.952", {
    d: "M19.375 20.125c.569.063-4.05-.562-6.412-.437s-4.759 1.229-6.857 1.625c-1.764.687-3.404-.938-1.981-2.5",
    stroke: "primary"
  }],
  photo: [
    "M15 8h.01",
    "M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z",
    "M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5",
    "M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"
  ],
  plus: ["M12 5l0 14", "M5 12l14 0"],
  pointer: ["M7.904 17.563a1.2 1.2 0 0 0 2.228 .308l2.09 -3.093l4.907 4.907a1.067 1.067 0 0 0 1.509 0l1.047 -1.047a1.067 1.067 0 0 0 0 -1.509l-4.907 -4.907l3.113 -2.09a1.2 1.2 0 0 0 -.309 -2.228l-13.582 -3.904l3.904 13.563z"],
  polygon: [{
    d: "M13.163 2.168l8.021 5.828c.694 .504 .984 1.397 .719 2.212l-3.064 9.43a1.978 1.978 0 0 1 -1.881 1.367h-9.916a1.978 1.978 0 0 1 -1.881 -1.367l-3.064 -9.43a1.978 1.978 0 0 1 .719 -2.212l8.021 -5.828a1.978 1.978 0 0 1 2.326 0z",
    stroke: "primary",
    fill: "secondary"
  }],
  print: [
    "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2",
    "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4",
    "M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"
  ],
  redact: [
    "M7 4h10",
    "M12 4v8",
    "M-7 24l12 -12",
    "M-3 24l12 -12",
    "M1 24l12 -12",
    "M5 24l12 -12",
    "M9 24l12 -12",
    "M13 24l12 -12",
    "M17 24l12 -12",
    "M21 24l12 -12",
    "M25 24l12 -12"
  ],
  redactArea: [
    "M6 20h-1a2 2 0 0 1 -2 -2v-1",
    "M3 13v-3",
    "M3 6v-1a2 2 0 0 1 2 -2h1",
    "M10 3h3",
    "M17 3h1a2 2 0 0 1 2 2v1",
    "M12 10h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2z",
    "M10 12l2 -2",
    "M10 16l6 -6",
    "M10 20l10 -10",
    "M12 22l10 -10",
    "M16 22l6 -6",
    "M20 22l2 -2"
  ],
  redactCombined: [
    "M6 20h-1a2 2 0 0 1 -2 -2v-1",
    "M3 13v-3",
    "M20 13v-3",
    "M3 6v-1a2 2 0 0 1 2 -2h1",
    "M10 3h3",
    "M17 3h1a2 2 0 0 1 2 2v1",
    "M8 8h8",
    "M12 8v7",
    "M6 19l12 -12",
    "M6 23l12 -12",
    "M10 23l12 -12",
    "M14 27l12 -12",
    "M14 23l12 -12"
  ],
  redactionSidebar: [
    "M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z",
    "M15 4v16",
    "M7 8h5",
    "M7 11h5",
    "M7 14h4"
  ],
  replaceText: [
    {
      d: "M3 7v-2h12v2",
      stroke: "primary"
    },
    {
      d: "M9 5v14",
      stroke: "primary"
    },
    {
      d: "M7 19h4",
      stroke: "primary"
    },
    {
      d: "M20 14l2 2h-3",
      stroke: "primary"
    },
    {
      d: "M20 18l2 -2",
      stroke: "primary"
    },
    {
      d: "M19 16a3 3 0 1 0 2 5.236",
      stroke: "primary"
    }
  ],
  rotateClockwise: ["M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5"],
  rotateCounterClockwise: ["M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5"],
  rubberStamp: ["M21 17.85h-18c0 -4.05 1.421 -4.05 3.79 -4.05c5.21 0 1.21 -4.59 1.21 -6.8a4 4 0 1 1 8 0c0 2.21 -4 6.8 1.21 6.8c2.369 0 3.79 0 3.79 4.05", "M5 21h14"],
  rubberStampPlus: [
    "M21 17.85h-18c0 -4.05 1.421 -4.05 3.79 -4.05c5.21 0 1.21 -4.59 1.21 -6.8a4 4 0 0 1 4.9 -4.1",
    "M16 10c0 1.2 -4 3.8 1.21 3.8c2.369 0 3.79 0 3.79 4.05",
    "M5 21h14",
    "M16 5h6",
    "M19 2v6"
  ],
  save: [
    "M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2",
    "M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M14 4l0 4l-6 0l0 -4"
  ],
  screenshot: [
    "M7 19a2 2 0 0 1 -2 -2",
    "M5 13v-2",
    "M5 7a2 2 0 0 1 2 -2",
    "M11 5h2",
    "M17 5a2 2 0 0 1 2 2",
    "M19 11v2",
    "M19 17v4",
    "M21 19h-4",
    "M13 19h-2"
  ],
  search: ["M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", "M21 21l-6 -6"],
  send: ["M10 14l11 -11", "M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"],
  settings: ["M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z", "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"],
  sidebar: ["M4 18v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z", "M10 18v-12a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"],
  signature: ["M3 17c3.333 -3.333 5 -6 5 -8c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 4.877 2.5 6c1.5 2 2.5 2.5 3.5 1l2 -3c.333 2.667 1.333 4 3 4c.53 0 2.639 -2 3 -2c.517 0 1.517 .667 3 2"],
  singlePage: ["M5 3m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v16a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z"],
  square: [{
    d: "M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
    stroke: "primary",
    fill: "secondary"
  }],
  squares: ["M8 10a2 2 0 0 1 2 -2h9a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-9a2 2 0 0 1 -2 -2z", "M16 8v-3a2 2 0 0 0 -2 -2h-9a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h3"],
  squiggly: [
    "M8 16v-8a4 4 0 1 1 8 0v8",
    "M8 10h8",
    {
      d: "M4 20c1.5 -1.5 3.5 -1.5 5 0s3.5 1.5 5 0 3.5 -1.5 5 0",
      stroke: "primary"
    }
  ],
  strikethrough: ["M8 16v-8a4 4 0 1 1 8 0v8", {
    d: "M4 10h16",
    stroke: "primary"
  }],
  text: [
    "M6.5 15.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0",
    "M14 19v-10.5a3.5 3.5 0 0 1 7 0v10.5",
    "M14 13h7",
    "M10 12v7"
  ],
  trash: [
    "M4 7l16 0",
    "M10 11l0 6",
    "M14 11l0 6",
    "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12",
    "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
  ],
  underline: [
    {
      d: "M4 20h16",
      stroke: "primary"
    },
    "M8 16v-8a4 4 0 1 1 8 0v8",
    "M8 10h8"
  ],
  ungroup: ["M4 5a1 1 0 0 1 1 -1h5a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1z", "M13 14a1 1 0 0 1 1 -1h5a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1z"],
  unlock: ["M7 11V7a5 5 0 0 1 9.9-1"],
  updateScale: [
    "M3.5 13.5L18.5 7.5L21.25 14.5L6.25 20.5L3.5 13.5Z",
    "M8 12.8L9 15.2M11.5 11.4L12.2 13.2M15 10L16 12.4",
    "M4 9.39849C4.10585 8.34804 4.487 7.34411 5.10497 6.48809C5.72294 5.63207 6.55584 4.95427 7.51957 4.52312C8.4833 4.09198 9.54373 3.92277 10.5938 4.03257C11.6438 4.14237 12.6463 4.5273 13.5 5.14849M11.5 6.00003L13.5 5.14849L12.7807 2.96999"
  ],
  vertical: [
    "M8 7l4 -4l4 4",
    "M8 17l4 4l4 -4",
    "M12 3l0 18"
  ],
  viewSettings: [
    "M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M12 10.5v1.5",
    "M12 16v1.5",
    "M15.031 12.25l-1.299 .75",
    "M10.268 15l-1.3 .75",
    "M15 15.803l-1.285 -.773",
    "M10.285 12.97l-1.285 -.773",
    "M14 3v4a1 1 0 0 0 1 1h4",
    "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
  ],
  widgetEdit: [
    "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1",
    "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415",
    "M16 5l3 3"
  ],
  x: ["M18 6l-12 12", "M6 6l12 12"],
  zigzag: [{
    d: "M12 2.4L21.36 11.76L2.64 12.24L12 21.6",
    stroke: "primary"
  }],
  zoomIn: [
    "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",
    "M9 12h6",
    "M12 9v6"
  ],
  zoomInArea: [
    "M15 13v4",
    "M13 15h4",
    "M15 15m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0",
    "M22 22l-3 -3",
    "M6 18h-1a2 2 0 0 1 -2 -2v-1",
    "M3 11v-1",
    "M3 6v-1a2 2 0 0 1 2 -2h1",
    "M10 3h1",
    "M15 3h1a2 2 0 0 1 2 2v1"
  ],
  zoomOut: ["M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M9 12l6 0"]
}, zc = $c, Qb = (e) => Object.prototype.hasOwnProperty.call(zc, e);
function Fc(e, t) {
  const n = Object.prototype.hasOwnProperty.call(t, e) ? t[e] : void 0;
  return n !== void 0 ? Jb(n) : Qb(e) ? zc[e] : null;
}
const ev = /* @__PURE__ */ new Set(["chevronLeft", "chevronRight"]), Zt = (e) => ev.has(e) ? "rtl:-scale-x-100" : "";
function Y({ name: e, size: t = 20, strokeWidth: n = 2, className: o, title: r, accent: a }) {
  const s = Fc(e, Dc());
  return s ? /* @__PURE__ */ i("svg", {
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: n,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: o,
    role: "img",
    "aria-hidden": r ? void 0 : !0,
    "aria-label": r,
    children: s.map((l, d) => {
      if (typeof l == "string") return /* @__PURE__ */ i("path", { d: l }, d);
      const c = l.fill === !0 ? "currentColor" : l.fill ? a?.[l.fill] : void 0, p = l.stroke ? a?.[l.stroke] : l.fill ? "none" : void 0;
      return /* @__PURE__ */ i("path", {
        d: l.d,
        fill: c ?? "none",
        stroke: p,
        strokeWidth: l.strokeWidth,
        strokeDasharray: l.strokeDasharray,
        strokeOpacity: l.strokeOpacity,
        fillOpacity: l.fillOpacity
      }, d);
    })
  }) : null;
}
const ms = {
  code: "en",
  name: "English",
  translations: {
    measurement: {
      title: "Measurements",
      distance: "Distance",
      perimeter: "Perimeter",
      area: "Area",
      areaUnit: "Area unit",
      resetLabel: "Reset label position",
      calibrate: "Calibrate scale",
      scale: "Scale",
      custom: "Custom",
      unavailable: "Unavailable",
      instructions: "Drag to measure a distance, then click to place its dimension line. Click vertices for a perimeter or area and double-click to finish. Area boundaries must not cross; an unavailable preview cannot be finished. Press Escape to cancel. Drag the label itself to move it.",
      sessionOnly: "This engine keeps page calibration for this session only.",
      allPages: "Apply to all pages",
      recalculate: "Recalculate existing measurements",
      preset: "Scale preset",
      choosePreset: "Choose a preset",
      unit: "Unit",
      precision: "Precision",
      selection: "Selected measurements",
      report: "{updated} updated · {skipped} skipped · {failed} failed",
      knownLength: "Enter the real length represented by the line you just drew.",
      length: "Known length",
      apply: "Apply scale",
      applying: "Applying…"
    },
    commands: {
      zoom: {
        in: "Zoom In",
        out: "Zoom Out",
        fitPage: "Fit to Page",
        fitWidth: "Fit to Width",
        automatic: "Automatic",
        marquee: "Marquee Zoom",
        menu: "Zoom",
        level: "Zoom Level",
        p50: "50%",
        p100: "100%",
        p150: "150%",
        p200: "200%",
        p400: "400%"
      },
      pan: "Pan",
      pointer: "Pointer",
      comment: "Comment",
      style: "Style",
      menu: "Menu",
      viewControls: "View Controls",
      open: "Open",
      download: "Download",
      print: "Print",
      fullscreen: "Full Screen",
      spread: {
        group: "Page Layout",
        none: "Single Page",
        odd: "Two Page",
        even: "Cover Page"
      },
      scroll: {
        group: "Scrolling",
        vertical: "Vertical",
        horizontal: "Horizontal",
        paged: "Page by page"
      },
      rotate: {
        group: "Rotate",
        clockwise: "Rotate Clockwise",
        counterclockwise: "Rotate Counter-Clockwise"
      },
      mode: {
        measure: "Measure",
        group: "Mode",
        view: "View",
        annotate: "Annotate",
        shapes: "Shapes",
        insert: "Insert",
        form: "Form",
        redact: "Redact"
      },
      annotate: {
        cancelCreation: "Cancel drawing",
        highlight: "Highlight",
        strikeout: "Strikeout",
        underline: "Underline",
        squiggly: "Squiggly",
        ink: "Draw",
        inkHighlight: "Ink Highlighter",
        text: "Text",
        insertText: "Insert Text",
        replaceText: "Replace Text",
        callout: "Callout",
        note: "Comment",
        link: "Link",
        gotoLink: "Go to link",
        saveFile: "Save file",
        removeLink: "Remove link",
        delete: "Delete",
        duplicate: "Duplicate",
        group: "Group",
        ungroup: "Ungroup",
        stampFromSelection: "Make stamp",
        strip: "Annotation actions"
      },
      selection: {
        copy: "Copy",
        strip: "Text selection actions"
      },
      snapshot: {
        tool: "Take a Snapshot",
        copy: "Copy",
        save: "Save Image",
        clear: "Clear Snapshot",
        strip: "Snapshot actions"
      },
      shapes: {
        rectangle: "Rectangle",
        circle: "Circle",
        line: "Line",
        arrow: "Arrow",
        polygon: "Polygon",
        polyline: "Polyline"
      },
      insert: {
        stamp: "Rubber Stamp",
        attachment: "Attach File",
        signature: "Signature",
        image: "Image"
      },
      form: {
        textfield: "Text Field",
        checkbox: "Checkbox",
        radio: "Radio Button",
        select: "Dropdown",
        listbox: "List Box",
        button: "Button",
        signature: "Signature Field",
        design: "Form design"
      },
      redact: {
        mark: "Mark for Redaction",
        applyAll: "Apply Redactions",
        apply: {
          one: "Apply Redaction",
          other: "Apply {count} Redactions"
        },
        clearAll: "Clear Marks"
      },
      undo: "Undo",
      redo: "Redo",
      page: {
        next: "Next Page",
        previous: "Previous Page",
        first: "First Page",
        last: "Last Page",
        goTo: "Go to Page"
      },
      find: "Find",
      shortcuts: "Keyboard Shortcuts",
      notAllowed: {
        default: "{label} isn't allowed",
        "annotations-create": "Adding annotations isn't allowed",
        "doc-annotate-modify": "Changing annotations isn't allowed",
        "doc-annotate-read": "Viewing annotations isn't allowed",
        "doc-attachments-modify": "Adding files isn’t allowed",
        "doc-content-copy": "Taking snapshots isn't allowed",
        "doc-download": "Downloading isn't allowed",
        "doc-forms-modify": "Editing form fields isn't allowed",
        "doc-outline-modify": "Changing the outline isn’t allowed",
        "doc-pages-assemble": "Changing pages isn’t allowed",
        "doc-print": "Printing isn't allowed",
        "doc-render-thumbnail": "Showing thumbnails isn't allowed",
        "doc-text-copy": "Copying isn't allowed",
        "doc-text-search": "Searching isn't allowed"
      },
      commentThread: { more: "More options" },
      attachment: {
        add: "Add file",
        save: "Save",
        goTo: "Go to page",
        delete: "Delete",
        more: "More options"
      },
      outline: {
        add: "Add item",
        addChild: "Add child item",
        rename: "Rename",
        setDestination: "Set destination to current view",
        properties: "Properties…",
        delete: "Delete",
        expandAll: "Expand all",
        collapseAll: "Collapse all",
        more: "More options"
      },
      pages: {
        rotateClockwise: "Rotate Page Clockwise",
        rotateCounterclockwise: "Rotate Page Counter-Clockwise",
        delete: "Delete Pages",
        duplicate: "Duplicate Pages",
        insertBlank: "Insert Blank Page",
        insertFile: "Insert from File…",
        extract: "Extract Pages",
        selectAll: "Select All Pages",
        more: "Page Options"
      },
      turnedOff: "{label} isn't available",
      locked: { default: "{label} can't be changed in this document" }
    },
    passwordPrompt: {
      title: "Password required",
      required: "This document is password protected. Enter the password to open it.",
      incorrect: "The password was incorrect. Please try again.",
      incorrectWarning: "Incorrect password",
      label: "Password",
      placeholder: "Enter password",
      cancel: "Cancel",
      open: "Open",
      opening: "Opening…"
    },
    grantPrompt: {
      passphraseTitle: "Passphrase required",
      passphraseRequired: "This link is protected. Enter the passphrase you were given to open the document.",
      passphraseIncorrect: "That passphrase didn’t work. Please try again.",
      passphraseLabel: "Passphrase",
      openTitle: "Before you open this document",
      changeTitle: "Before you make changes",
      asks: "The owner of this document asks who you are.",
      shownOnChanges: "Your name is shown on what you add.",
      final: "You can’t change your answers later.",
      privacy: "Privacy notice",
      optional: "optional",
      invalid: "Check this answer.",
      invalidEmail: "Enter a valid email address.",
      fields: {
        displayName: "Name",
        email: "Email",
        title: "Job title",
        organization: "Organization",
        organizationalUnit: "Department"
      },
      open: "Open",
      cancel: "Cancel",
      continue: "Continue",
      saving: "Saving…",
      notNow: "Not now"
    },
    dropToOpen: { label: "Drop a PDF to open it" },
    documentError: {
      title: "Couldn’t open document",
      unknown: "The document could not be opened.",
      notFound: "The file wasn’t found.",
      notAllowed: "You don’t have access to this document.",
      damaged: "This file isn’t a PDF, or it’s damaged.",
      unsupported: "This viewer can’t open this kind of document.",
      retry: "Try again",
      close: "Close document"
    },
    tabs: {
      close: "Close {name}",
      loading: "Loading",
      untitled: "Document {id}"
    },
    closeUnsaved: {
      title: "Close without saving?",
      body: "“{name}” has changes that weren’t downloaded. They’ll be lost.",
      cancel: "Cancel",
      close: "Close without saving"
    },
    viewOnly: {
      label: "View only",
      turnedOff: "The tools that change this document are turned off",
      notAllowed: "You can read this document, but not change it"
    },
    panel: {
      close: "Close",
      resize: "Resize {title}"
    },
    menu: { back: "Back" },
    shortcuts: {
      document: "Document",
      viewing: "Viewing",
      editing: "Editing",
      other: "Other"
    },
    goToPage: { go: "Go" },
    print: {
      title: "Print",
      pages: "Pages",
      allPages: "All pages",
      currentPage: "Current page",
      range: "Custom",
      rangeLabel: "Pages to print",
      rangePlaceholder: "e.g. 1-3, 5",
      rangeInvalid: "Use page numbers from 1 to {total}, such as 1-3, 5",
      annotations: "Print annotations",
      preparing: "Preparing…",
      preparingPage: "Preparing page {page} of {total}…",
      ready: "Ready to print.",
      images: "Pages print as images at {dpi} DPI.",
      lowResolution: "This document allows only low-resolution printing ({dpi} DPI).",
      failed: "The printout couldn’t be prepared.",
      cancel: "Cancel",
      print: "Print"
    },
    panels: {
      thumbnails: "Thumbnails",
      outline: "Outline",
      attachments: "Attachments",
      search: "Search",
      comments: "Comments",
      style: "Style",
      stamps: "Stamps",
      signatures: "Signatures",
      redaction: "Redactions",
      measurement: "Measurements",
      formDesign: "Form design",
      switch: "Switch panel"
    },
    annotation: {
      comment: "Comment",
      highlight: "Highlight",
      underline: "Underline",
      squiggly: "Squiggly",
      strikeout: "Strikethrough",
      square: "Square",
      circle: "Circle",
      line: "Line",
      polygon: "Polygon",
      polyline: "Polyline",
      ink: "Ink",
      freeText: "Text",
      stamp: "Stamp",
      caret: "Caret",
      redact: "Redact",
      fileAttachment: "Attachment",
      style: {
        kind: "Type",
        opacity: "Opacity",
        stroke: "Stroke",
        fill: "Fill",
        color: "Color",
        strokeWidth: "Stroke width",
        border: "Border",
        borderStyle: "Border style",
        borderColor: "Border color",
        borderWidth: "Border width",
        background: "Background",
        outline: "Outline",
        lineEndings: "Line endings",
        blendMode: "Blend mode",
        font: "Font",
        fontSize: "Font size",
        textColor: "Text color",
        bold: "Bold",
        italic: "Italic",
        underline: "Underline",
        align: "Align",
        alignment: "Alignment",
        label: "Label",
        labelFont: "Label font",
        labelSize: "Label size",
        labelColor: "Label color",
        icon: "Icon",
        link: "Link"
      },
      flags: {
        print: "Print",
        hidden: "Hidden",
        noView: "No view",
        toggleNoView: "Toggle no view",
        readOnly: "Read only",
        locked: "Locked",
        lockedContents: "Locked contents",
        noZoom: "No zoom",
        noRotate: "No rotate",
        invisible: "Invisible"
      },
      borderStyles: {
        solid: "Solid",
        dashed: "Dashed",
        cloudy: "Cloudy"
      },
      lineEndings: {
        none: "None",
        square: "Square",
        circle: "Circle",
        diamond: "Diamond",
        openArrow: "Open arrow",
        closedArrow: "Closed arrow",
        butt: "Butt",
        reverseOpenArrow: "Reverse open arrow",
        reverseClosedArrow: "Reverse closed arrow",
        slash: "Slash"
      },
      blendModes: {
        normal: "Normal",
        multiply: "Multiply",
        screen: "Screen",
        overlay: "Overlay",
        darken: "Darken",
        lighten: "Lighten",
        colorDodge: "Color dodge",
        colorBurn: "Color burn",
        hardLight: "Hard light",
        softLight: "Soft light",
        difference: "Difference",
        exclusion: "Exclusion",
        hue: "Hue",
        saturation: "Saturation",
        color: "Color",
        luminosity: "Luminosity"
      },
      fonts: {
        courier: "Courier",
        courierBold: "Courier Bold",
        courierBoldOblique: "Courier Bold Oblique",
        courierOblique: "Courier Oblique",
        helvetica: "Helvetica",
        helveticaBold: "Helvetica Bold",
        helveticaBoldOblique: "Helvetica Bold Oblique",
        helveticaOblique: "Helvetica Oblique",
        timesRoman: "Times Roman",
        timesBold: "Times Bold",
        timesBoldItalic: "Times Bold Italic",
        timesItalic: "Times Italic",
        symbol: "Symbol",
        zapfDingbats: "Zapf Dingbats"
      },
      alignments: {
        left: "Left",
        center: "Center",
        right: "Right"
      },
      noteIcons: {
        comment: "Comment",
        key: "Key",
        note: "Note",
        help: "Help",
        newParagraph: "New paragraph",
        paragraph: "Paragraph",
        insert: "Insert"
      },
      attachmentIcons: {
        pushPin: "Push pin",
        paperclip: "Paperclip",
        graph: "Graph",
        tag: "Tag"
      }
    },
    form: { settings: {
      name: "Name",
      tooltip: "Tooltip",
      required: "Required",
      readOnly: "Read-only",
      noExport: "Don't export",
      defaultValue: "Default value",
      maxLength: "Maximum length",
      multiline: "Several lines",
      password: "Password",
      comb: "One character per box",
      radiosInUnison: "Buttons with one value turn on together",
      keepOneOn: "Keep one on",
      options: "Options",
      allowTyping: "Allow typing",
      multiSelect: "Several choices"
    } },
    thumbnails: { page: "Page {page}" },
    formDesign: {
      empty: "No fields yet. Pick a field tool to add one.",
      page: "Page {page}",
      allFields: "All fields",
      buttons: "Buttons",
      boxes: "Boxes",
      box: "Box {number}",
      addButton: "Add a button",
      addBox: "Add a box",
      duplicateGroup: "Duplicate group"
    },
    stylePanel: {
      mixed: "(mixed)",
      transparent: "Transparent",
      lineStart: "Start",
      lineEnd: "End",
      empty: "Pick a draw tool or select an annotation to edit its style.",
      selected: {
        one: "{count} selected",
        other: "{count} selected"
      },
      toolDefaults: "{tool} defaults",
      defaults: "Defaults",
      fontGroups: {
        document: "In this document",
        yours: "Your fonts",
        server: "Server fonts",
        standard: "Standard"
      },
      fontStyles: {
        bold: "Bold",
        italic: "Italic",
        boldItalic: "Bold Italic"
      },
      fontRestrictions: {
        notEmbedded: "The document only names it",
        subset: "The document holds only the characters it uses",
        previewAndPrint: "Its licence allows viewing and printing only",
        unsupportedFormat: "New text can’t be written in this kind of font",
        noUnicodeMap: "It doesn’t say which characters it draws",
        other: "New text can’t be written in it"
      }
    },
    attachments: {
      loading: "Loading attachments…",
      failed: "The attachments couldn’t be read.",
      empty: "This document has no attached files",
      drop: "Drop files to attach them",
      dropHint: "Or drop files here",
      adding: "Adding…",
      onPage: "Page {page}",
      count: {
        one: "{count} file",
        other: "{count} files"
      }
    },
    outline: {
      filter: "Filter outline",
      loading: "Loading outline…",
      failed: "The outline couldn’t be read.",
      empty: "This document has no outline",
      noMatches: "No items match",
      incomplete: "Part of the outline couldn’t be read.",
      untitled: "Untitled",
      properties: {
        title: "Item properties",
        name: "Title",
        color: "Color",
        noColor: "None",
        customColor: "Custom color",
        bold: "Bold",
        italic: "Italic",
        open: "Expanded when the document opens",
        target: "Destination",
        targetNone: "None",
        targetView: "Current view",
        targetNamed: "Page action",
        targetKept: "Kept as it is",
        keptNote: "This item runs a script or opens another file. It can’t be changed here.",
        fit: "Fit",
        fitKept: "As it is",
        save: "Save",
        cancel: "Cancel"
      }
    },
    linkEditor: {
      toUrl: "Link to a URL",
      url: "URL",
      toPage: "Link to a page",
      page: "Page",
      urlPlaceholder: "https://…",
      pagePlaceholder: "Page number",
      add: "Add link",
      update: "Update link"
    },
    pageNumber: {
      page: "{current} / {total}",
      pages: "{first}–{last} / {total}",
      goToPage: "Go to page"
    },
    comments: {
      forbidden: "You don’t have access to comments on this document.",
      loading: "Loading comments…",
      error: "Comments failed to load.",
      retry: "Retry",
      empty: "No comments yet. Use the note tool to start a thread.",
      emptyReadOnly: "No comments on this document.",
      anonymous: "Guest",
      page: "Page {page}",
      count: {
        one: "{count} comment",
        other: "{count} comments"
      },
      reply: "Reply",
      replyPlaceholder: "Reply…",
      addPlaceholder: "Add a comment…",
      delete: "Delete comment",
      deleteThread: "Delete thread",
      edit: "Edit comment",
      status: "Status",
      statusNone: "No status",
      statusAccepted: "Accepted",
      statusRejected: "Rejected",
      statusCancelled: "Cancelled",
      statusCompleted: "Completed",
      markCompleted: "Mark as completed"
    },
    demo: {
      starting: "Starting viewer…",
      opening: "Opening document…",
      pageLoading: "Loading page {page}…",
      pageError: "This page couldn’t load.",
      pageForbidden: "You don’t have access to this page.",
      more: "More",
      searchPlaceholder: "Search document…",
      searchCaseSensitive: "Case sensitive",
      searchWholeWord: "Whole word",
      searchRegex: "Regular expression",
      searchSearching: "Searching…",
      searchResults: {
        one: "{count} result found",
        other: "{count} results found"
      },
      searchNoResults: "No results",
      searchPrevious: "Previous result",
      searchNext: "Next result",
      searchPage: "Page {page}",
      searchHitOf: "{current} of {total}",
      searchResult: "Result {index}",
      searchOptions: "Search options",
      empty: "Nothing here yet in this demo panel.",
      cancel: "Cancel",
      pageBadge: "p. {page}",
      redactionEmpty: "No pending redactions. Use the Redact tool to mark text or areas.",
      redactionArea: "Area mark",
      redactionText: "Text mark",
      redactionRemove: "Remove mark",
      redactConfirmTitle: {
        one: "Apply redaction?",
        other: "Apply redactions?"
      },
      redactConfirmBody: {
        one: "Permanently remove the content under {count} redaction mark. This cannot be undone.",
        other: "Permanently remove the content under {count} redaction marks. This cannot be undone."
      },
      redactConfirmCollateral: {
        one: "{count} other annotation will also be removed.",
        other: "{count} other annotations will also be removed."
      },
      redactApply: "Apply",
      redactApplying: "Applying…",
      formatLabel: "Format",
      fieldSettingsTitle: "Field",
      fieldOptionLabel: "Label",
      fieldOptionValue: "Value",
      fieldOptionAdd: "Add option",
      fieldOptionRemove: "Remove option",
      fieldNone: "None",
      redactLabelTitle: "Redaction label",
      redactLabelPlaceholder: "e.g. REDACTED",
      redactLabelRepeat: "Repeat label across region",
      stampsAll: "All stamps",
      stampsLoading: "Loading stamps…",
      stampsEmpty: "No stamps yet. Import a PDF to turn each of its pages into a stamp.",
      stampsRemoveStamp: "Remove stamp",
      stampsArmedHint: "Click a page to place the stamp.",
      stampsImport: "Import PDF…",
      stampsImporting: "Importing…",
      stampsImportHint: "Import a PDF as a stamp library — each page becomes one stamp.",
      stampsRemoveLibrary: "Remove library",
      stampsExportLibrary: "Export library as PDF",
      stampsCustomLibrary: "My stamps",
      stampsCustomLabel: "Custom stamp",
      stampsError: "The built-in stamps could not be loaded.",
      stampsArmError: "That stamp could not be armed.",
      stampsImportError: "That PDF could not be imported as a stamp library.",
      quickStampsLabel: "Quick stamps",
      signaturesEmpty: "No signatures yet. Create one to sign with.",
      signaturesNew: "New signature…",
      signaturesArmedHint: "Click a signature field to sign it, or anywhere on a page to place the mark.",
      signaturesTargetHint: "Pick a mark for the selected field.",
      signaturesInDocument: "In this document",
      signaturesNone: "This document has no signature fields.",
      signaturesValidate: "Validate",
      signaturesValidating: "Validating…",
      signaturesSigned: "Signed",
      signaturesUnsigned: "Unsigned",
      signaturesRename: "Rename",
      signaturesRemove: "Remove",
      signaturesExport: "Export as PDF",
      signaturesAddInitials: "Add initials",
      signatureLabel: "Signature",
      initialsLabel: "Initials",
      makerTitle: "New signature",
      makerName: "Name",
      makerNamePlaceholder: "Your name",
      makerDraw: "Draw",
      makerType: "Type",
      makerUpload: "Upload",
      makerTypePlaceholder: "Type your name",
      makerFont: "Font",
      makerUploadHint: "Choose a PNG, JPEG, or one-page PDF",
      makerClear: "Clear",
      makerOptional: "(optional)",
      makerSave: "Save",
      makerSaving: "Saving…",
      makerError: "The signature could not be saved.",
      signTitle: "Sign this field",
      signReason: "Reason",
      signLocation: "Location",
      signKind: "What may change afterwards",
      signKindApproval: "Approval signature — form filling and more signatures stay valid",
      signKindCertifyAnnotate: "Certify — allow comments, form filling and signatures",
      signKindCertifyFill: "Certify — allow form filling and signatures only",
      signKindCertifyLocked: "Certify — allow no changes",
      signButton: "Sign",
      signSigning: "Signing…",
      signFill: "Place without signing",
      signError: "The field could not be signed.",
      inspectTitle: "Signature",
      inspectSigner: "Signed by",
      inspectReason: "Reason",
      inspectLocation: "Location",
      inspectTime: "Time",
      inspectIntegrity: "Document",
      inspectCryptography: "Signature",
      inspectTrust: "Signer",
      inspectChanges: "Changes since",
      inspectDownload: "Download signed version",
      verdictValid: "Valid",
      verdictValidUntrusted: "Valid, signer not trusted",
      verdictInvalid: "Invalid — modified after signing",
      verdictWillInvalidate: "Valid, invalid once saved",
      signaturesInvalidating: "This change will invalidate {field} when the document is saved. Undo it to keep the signature.",
      verdictIndeterminate: "Could not be verified",
      verdictUnchanged: "None",
      verdictRestored: "Changed, then restored",
      inspectLaterRevisions: "Revisions after signing",
      verdictPermitted: "Permitted",
      verdictForbidden: "Not permitted"
    }
  }
}, hs = {
  de: () => import("./de-DAeMkxx6-Bxe1Z0it.js").then((e) => e.de),
  fr: () => import("./fr-BgJ8dOAI-D1-gtQTu.js").then((e) => e.fr),
  es: () => import("./es-BrwadaBk-BGCvUgEY.js").then((e) => e.es),
  it: () => import("./it-BmmNdibU-CfnkmlJc.js").then((e) => e.it),
  nl: () => import("./nl-DNuIdcyV-Dte7eubE.js").then((e) => e.nl),
  pt: () => import("./pt-nD3P1M4h-BWUeQmPp.js").then((e) => e.pt),
  pl: () => import("./pl-ZVxF5BV2-CbfU8VmS.js").then((e) => e.pl),
  sv: () => import("./sv-CvLfpN-U-DJtc8253.js").then((e) => e.sv),
  ja: () => import("./ja-DYL0fhQg-DqJ--L75.js").then((e) => e.ja),
  "zh-CN": () => import("./zh-cn-C-XTtOHZ-sfngNd4o.js").then((e) => e.zhCN),
  "zh-TW": () => import("./zh-tw-CO5cxPs5-C70V5LyG.js").then((e) => e.zhTW),
  ko: () => import("./ko-D0EydnVj-gXBpgabc.js").then((e) => e.ko),
  ar: () => import("./ar-C75qD9T8-Wu6Q7ZC4.js").then((e) => e.ar),
  he: () => import("./he-DDOO6ydF-B5WmpXLy.js").then((e) => e.he)
}, Bc = () => typeof navigator < "u" ? navigator.languages ?? [] : [], gs = (e, t, n = "en") => zo(t, e !== "auto" ? [e] : Bc()) ?? n, tv = (e) => [...e !== "auto" ? [e] : [], ...Bc()];
function nv(e) {
  try {
    return new Intl.Locale(e).region;
  } catch {
    return;
  }
}
function ov(e, t, n) {
  const o = n.find((r) => nv(r) !== void 0 && zo(t, [r]) === e);
  try {
    return Intl.getCanonicalLocales(o ?? e)[0];
  } catch {
    return;
  }
}
const rv = (e, t) => e === void 0 ? "en" : zo(t, [e]), Kr = (e) => typeof e == "object" && e !== null;
function Mo(e, t) {
  const n = { ...e };
  for (const [o, r] of Object.entries(t)) {
    const a = o.split(".");
    let s = n;
    for (let c = 0; c < a.length - 1; c++) {
      const p = s[a[c]];
      s = s[a[c]] = Kr(p) ? { ...p } : {};
    }
    const l = a[a.length - 1], d = s[l];
    s[l] = typeof r == "string" ? r : Mo(Kr(d) ? d : {}, r);
  }
  return n;
}
const Qn = (e, t) => t ? {
  ...e,
  translations: Mo(e.translations, t)
} : e, _r = (e) => typeof e == "function", av = (e) => Kr(e.default) ? e.default : e;
function iv(e) {
  const t = e.filter((o) => !_r(o)).reduce((o, r) => Mo(o ?? {}, r), void 0);
  return e.some(_r) ? {
    words: t,
    load: () => Promise.all(e.map((o) => _r(o) ? o().then(av) : Promise.resolve(o))).then((o) => o.reduce(Mo, {}))
  } : {
    words: t,
    load: void 0
  };
}
const sv = /* @__PURE__ */ new Set([
  "Adlm",
  "Arab",
  "Aran",
  "Hebr",
  "Mand",
  "Mend",
  "Nkoo",
  "Rohg",
  "Samr",
  "Syrc",
  "Thaa",
  "Yezi"
]);
function lv(e) {
  try {
    const { script: t } = new Intl.Locale(e).maximize();
    return t !== void 0 && sv.has(t) ? "rtl" : "ltr";
  } catch {
    return "ltr";
  }
}
function cv(e) {
  try {
    return new Intl.DisplayNames([e], { type: "language" }).of(e) ?? e;
  } catch {
    return e;
  }
}
function dv(e = {}) {
  const t = ["en", ...Object.keys(hs)], n = (d) => t.find((c) => c.toLowerCase() === d.toLowerCase()), o = /* @__PURE__ */ new Map();
  for (const [d, c] of Object.entries(e)) {
    const p = n(d) ?? d;
    o.set(p, [...o.get(p) ?? [], c]);
  }
  const r = new Map([...o].map(([d, c]) => [d, iv(c)])), a = r.get("en"), s = [Qn(ms, a?.words)], l = {};
  if (a?.load) {
    const d = a.load;
    l.en = () => d().then((c) => Qn(ms, c));
  }
  for (const [d, c] of Object.entries(hs)) {
    const p = r.get(d), f = p?.load, u = p?.words;
    l[d] = f ? () => Promise.all([c(), f()]).then(([m, g]) => Qn(m, g)) : u ? () => c().then((m) => Qn(m, u)) : c;
  }
  for (const [d, { words: c, load: p }] of r) {
    if (n(d) !== void 0) continue;
    const f = {
      code: d,
      name: cv(d),
      direction: lv(d)
    };
    p ? l[d] = () => p().then((u) => ({
      ...f,
      translations: u
    })) : s.push({
      ...f,
      translations: c ?? {}
    });
  }
  return {
    locales: s,
    loaders: l,
    codes: [.../* @__PURE__ */ new Set([...t, ...o.keys()])]
  };
}
const Kc = be(void 0);
function uv({ locale: e, children: t }) {
  const n = xo((a) => a.locale), o = xo((a) => a.locales), r = j(() => ov(n, o.map((a) => a.code), tv(e)), [
    n,
    o,
    e
  ]);
  return /* @__PURE__ */ i(Kc.Provider, {
    value: r,
    children: t
  });
}
function ox() {
  return X(Kc);
}
const pv = {
  top: !1,
  right: !1,
  bottom: !1,
  left: !1
}, eo = 1;
function jc(e, t) {
  const n = e.right > 0 && e.left < t.width, o = e.bottom > 0 && e.top < t.height;
  return {
    top: n && e.top <= eo && e.bottom > 0,
    right: o && e.right >= t.width - eo && e.left < t.width,
    bottom: n && e.bottom >= t.height - eo && e.top < t.height,
    left: o && e.left <= eo && e.right > 0
  };
}
const fv = (e, t) => e.top === t.top && e.right === t.right && e.bottom === t.bottom && e.left === t.left, mv = {
  top: "paddingTop",
  right: "paddingRight",
  bottom: "paddingBottom",
  left: "paddingLeft"
};
function Hc(e, t = [
  "top",
  "right",
  "bottom",
  "left"
]) {
  const n = {};
  for (const o of t) e[o] && (n[mv[o]] = `env(safe-area-inset-${o}, 0px)`);
  return n;
}
function Uc(e) {
  const { clientWidth: t, clientHeight: n } = e.ownerDocument.documentElement;
  return {
    width: t,
    height: n
  };
}
const La = { popover: "manual" }, Gc = "text-fg m-0 overflow-clip border-0 bg-transparent", hv = "data-epdf-focus-root", jr = (e) => e.getRootNode().fullscreenElement === e;
function gv(e) {
  for (let t = e; t; ) {
    if (jr(t)) return !0;
    t = t.parentElement ?? t.getRootNode().host ?? null;
  }
  return !1;
}
function bv(e, t) {
  e.style.left = `${t.left}px`, e.style.top = `${t.top}px`, e.style.width = `${t.width}px`, e.style.height = `${t.height}px`;
  const n = e.getBoundingClientRect();
  (Math.abs(n.left - t.left) > 0.5 || Math.abs(n.top - t.top) > 0.5) && (e.style.left = `${2 * t.left - n.left}px`, e.style.top = `${2 * t.top - n.top}px`);
}
function Wc(e, t) {
  const n = e.parentElement?.closest("[data-embedpdf-root]") ?? null;
  typeof e.showPopover == "function" && e.showPopover();
  let o = "";
  const r = () => {
    const f = Uc(e), u = n?.getBoundingClientRect() ?? {
      left: 0,
      top: 0,
      right: f.width,
      bottom: f.height
    }, m = Math.max(0, u.left), g = Math.max(0, u.top), h = {
      left: m,
      top: g,
      width: Math.max(0, Math.min(f.width, u.right) - m),
      height: Math.max(0, Math.min(f.height, u.bottom) - g)
    }, b = `${h.left},${h.top},${h.width},${h.height},${f.width},${f.height}`;
    b !== o && (o = b, bv(e, h), t?.(jc(u, f)));
  };
  r();
  const a = new ResizeObserver(r);
  n && a.observe(n);
  const s = Do(r), l = e.ownerDocument, d = () => {
    if (typeof e.showPopover != "function" || !e.matches(":popover-open")) return;
    const f = kn(l);
    e.hidePopover(), e.showPopover(), f && f !== kn(l) && f.focus({ preventScroll: !0 });
  }, c = () => {
    n && gv(n) && d();
  }, p = (f) => {
    f.newState === "open" && d();
  };
  return l.addEventListener("fullscreenchange", c), n?.addEventListener("toggle", p), () => {
    l.removeEventListener("fullscreenchange", c), n?.removeEventListener("toggle", p), s(), a.disconnect(), typeof e.hidePopover == "function" && e.matches(":popover-open") && e.hidePopover();
  };
}
function Vo(e, t) {
  const n = e.ownerDocument, o = kn(n), r = (l) => {
    l.key !== "Escape" || l.defaultPrevented || (l.preventDefault(), l.stopPropagation(), t.onEscape());
  };
  e.addEventListener("keydown", r);
  let a = null;
  t.trap === !1 ? qp(e, t.initialFocus) : a = Yp(e, {
    initialFocus: t.initialFocus,
    returnFocus: !1
  });
  const s = () => {
    a?.(), a = null, e.removeEventListener("keydown", r);
  };
  return {
    standDown: s,
    release: () => {
      s();
      const l = kn(n), d = l === null || e.contains(l) || l.hasAttribute("data-epdf-focus-root");
      o?.isConnected && d && o.focus();
    }
  };
}
const Vc = be("top"), zn = Vc.Provider;
function Ia() {
  return X(Vc);
}
function qc(e, t, n = "start", o = "above") {
  return e === "start" || e === "end" ? `${e === "start" == (t === "ltr") ? "right" : "left"}-${n}` : `${e === "bottom" || e === "float-bottom" || e === "selection" && o === "above" ? "top" : "bottom"}-${n === "start" == (t === "ltr") ? "start" : "end"}`;
}
function Yc(e) {
  return e === "ltr" ? "right-start" : "left-start";
}
function vv(e, t, n = !1, o = "above") {
  return (n ? Yc(t) : qc(e, t, "start", o)).split("-")[0];
}
function Xc(e) {
  return e === "ltr" ? {
    open: "ArrowRight",
    close: "ArrowLeft"
  } : {
    open: "ArrowLeft",
    close: "ArrowRight"
  };
}
const Oo = (e) => {
  const t = e.getBoundingClientRect();
  return {
    x: t.left,
    y: t.top,
    width: t.width,
    height: t.height
  };
}, Zc = (e) => e.closest("[data-placement]")?.getAttribute("data-placement")?.startsWith("bottom") ? "below" : "above";
function Jc(e, t, n, o) {
  const r = vl(e, "client");
  if (!r) return;
  const { left: a, top: s } = Xp(t, n, o, {
    size: {
      width: e.offsetWidth,
      height: e.offsetHeight
    },
    view: r
  });
  e.style.left = `${a}px`, e.style.top = `${s}px`;
  const l = e.getBoundingClientRect();
  (Math.abs(l.left - a) > 0.5 || Math.abs(l.top - s) > 0.5) && (e.style.left = `${2 * a - l.left}px`, e.style.top = `${2 * s - l.top}px`);
}
let Kt = null, bs = Number.NEGATIVE_INFINITY;
const vs = (e) => e.pointerType === "touch";
function wv(e, t, n) {
  let o = null, r = !1, a = !1, s = !1, l = !1, d, c;
  const p = { hide: () => h() }, f = () => {
    clearTimeout(d), clearTimeout(c);
  }, u = () => e.getAttribute("aria-expanded") === "true", m = () => Kt !== null || Date.now() - bs < 300, g = (O) => {
    if (f(), !(o === O || o === "pointer")) {
      if (o === null) {
        if (t.canShow && !t.canShow()) return;
        Kt !== p && Kt?.hide(), Kt = p, n.addEventListener("keydown", x, !0);
      }
      o = O, t.show(O);
    }
  }, h = () => {
    f(), o !== null && (o = null, Kt === p && (Kt = null), bs = Date.now(), n.removeEventListener("keydown", x, !0), t.hide());
  }, b = () => {
    clearTimeout(c), c = setTimeout(h, 100);
  }, y = (O) => {
    vs(O) || (r = !0, clearTimeout(c), !(l || u()) && (o !== null || m() ? g("pointer") : d = setTimeout(() => g("pointer"), 500)));
  }, v = (O) => {
    vs(O) || (r = !1, clearTimeout(d), !s && (l = !1, o !== null && !a && b()));
  }, _ = () => {
    e.matches(":focus-visible") && (s = !0, !l && !u() && g("focus"));
  }, P = () => {
    s = !1, !(r || a) && (l = !1, h());
  }, S = () => {
    l = !0, h();
  }, x = (O) => {
    O.key === "Escape" && (l = !0, h());
  };
  return e.addEventListener("pointerenter", y), e.addEventListener("pointerleave", v), e.addEventListener("focus", _), e.addEventListener("blur", P), e.addEventListener("pointerdown", S), {
    enterTooltip() {
      a = !0, clearTimeout(c);
    },
    leaveTooltip() {
      a = !1, !r && !s && b();
    },
    detach() {
      e.removeEventListener("pointerenter", y), e.removeEventListener("pointerleave", v), e.removeEventListener("focus", _), e.removeEventListener("blur", P), e.removeEventListener("pointerdown", S), h();
    }
  };
}
const yv = 6, _v = '[inert], [aria-hidden="true"]', xv = "bg-tooltip text-tooltip-fg m-0 max-w-64 overflow-visible rounded-sm border border-transparent px-2 py-1 text-start text-xs font-normal leading-4 tracking-normal normal-case whitespace-normal shadow-md transition-opacity duration-100 starting:opacity-0 motion-reduce:transition-none", ws = (e) => e.label !== "" && (!e.labelShown || !!e.shortcut || !!e.reason), kv = (e) => e !== null && (e.scrollWidth > e.clientWidth || e.scrollHeight > e.clientHeight);
function we(e, t = {}) {
  const [n, o] = C(null), [r, a] = C(null), s = k(null), l = Ia(), d = Je(), c = t.clipped !== void 0 && e !== null && !ws(e), p = e !== null && (ws(e) || c && e.label !== ""), f = k(t.clipped);
  f.current = t.clipped, R(() => {
    if (!n || !p || n.closest(_v)) return;
    const g = n.ownerDocument.defaultView ?? n.ownerDocument, h = wv(n, {
      show: a,
      hide: () => a(null),
      canShow: c ? () => kv(f.current?.(n) ?? null) : void 0
    }, g);
    return s.current = h, () => {
      s.current = null, h.detach();
    };
  }, [
    n,
    p,
    c
  ]);
  const u = p && e !== null && r !== null && n !== null, m = u && (e.labelShown === !0 || t.clipped !== void 0 || n.getAttribute("aria-label") === e.label);
  return {
    trigger: {
      ref: o,
      "aria-describedby": u && (!m || e.shortcut || e.reason) ? d : void 0
    },
    element: u ? /* @__PURE__ */ i(Sv, {
      id: d,
      button: n,
      content: e,
      named: m,
      interactive: r === "pointer",
      placement: () => vv(l, da(n), t.inMenu === !0, l === "selection" ? Zc(n) : void 0),
      timing: s
    }) : null
  };
}
function qo({ content: e, options: t, children: n }) {
  const o = we(e, t);
  return /* @__PURE__ */ i(D, { children: [n(o.trigger), o.element] });
}
function Qc({ label: e, reason: t, inMenu: n, ...o }) {
  const r = we({
    label: e,
    reason: t
  }, { inMenu: n });
  return /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    type: "button",
    "aria-label": e,
    ...o,
    ...r.trigger
  }), r.element] });
}
function Sv({ id: e, button: t, content: n, named: o, interactive: r, placement: a, timing: s }) {
  const l = k(null), d = k(a);
  return d.current = a, R(() => {
    const c = l.current;
    if (!c) return;
    typeof c.showPopover == "function" && c.showPopover();
    const p = () => Jc(c, Oo(t), d.current(), yv);
    p();
    const f = new ResizeObserver(p);
    f.observe(c), f.observe(t);
    const u = Do(p);
    return () => {
      u(), f.disconnect(), typeof c.hidePopover == "function" && c.matches(":popover-open") && c.hidePopover();
    };
  }, [t]), /* @__PURE__ */ i("div", {
    ref: l,
    ...La,
    id: e,
    role: "tooltip",
    part: "tooltip",
    className: `${xv} ${r ? "pointer-events-auto" : "pointer-events-none"}`,
    style: {
      position: "fixed",
      right: "auto",
      bottom: "auto",
      fontFamily: "var(--epdf-font)"
    },
    onPointerEnter: () => s.current?.enterTooltip(),
    onPointerLeave: () => s.current?.leaveTooltip(),
    children: [
      /* @__PURE__ */ i("span", {
        className: "flex items-baseline gap-2",
        children: [
          /* @__PURE__ */ i("span", {
            "aria-hidden": o || void 0,
            children: n.label
          }),
          " ",
          n.shortcut && /* @__PURE__ */ i("kbd", {
            className: "opacity-75 [font-variant-emoji:text]",
            style: { fontFamily: "inherit" },
            children: n.shortcut
          })
        ]
      }),
      " ",
      n.reason && /* @__PURE__ */ i("span", {
        className: "mt-0.5 block opacity-80",
        children: n.reason
      })
    ]
  });
}
const Mn = "embedpdf-standard", Mv = "standard";
function Ov(e) {
  const t = `${Mv}:`;
  return e.startsWith(t) ? `${Mn}:${e.slice(t.length)}` : e;
}
function Pv(e) {
  return zo(rm, [e, ...typeof navigator < "u" ? navigator.languages ?? [] : []]) ?? "en";
}
const Tv = async (e) => {
  const t = await fetch(e);
  if (!t.ok) throw new Error(`${e}: HTTP ${t.status}`);
  return new Uint8Array(await t.arrayBuffer());
}, Cv = (e, t) => t ? Tv(t.replace("{locale}", e)) : am(e), ys = /* @__PURE__ */ new WeakMap();
function Ev(e, t, n) {
  if (n === !1) return Promise.resolve();
  const o = typeof n == "string" ? n : void 0, r = ys.get(e);
  if (r?.locale === t) return r.promise;
  const s = (async () => {
    await r?.promise.catch(() => {
    });
    const l = e.getLibrary(Mn);
    l?.locale !== t && (r && !l || (l && await e.deleteLibrary(Mn), await e.importLibrary(await Cv(t, o))));
  })();
  return ys.set(e, {
    locale: t,
    promise: s
  }), s;
}
const Po = typeof indexedDB > "u" ? null : Zp("embedpdf-stamps", { storeName: "libraries" }), _s = /* @__PURE__ */ new WeakMap(), ed = (e) => {
  let t = _s.get(e);
  return t || (t = Po ? If(e, Po) : Promise.resolve(), _s.set(e, t)), t;
};
function Av() {
  const e = Oa();
  return E(() => (ed(e), Po ? Lf(e, Po, { except: [Mn] }) : void 0), [e]), null;
}
const Nv = 0.5;
function Lv(e, t, n) {
  if (e.length === 0) return null;
  if (n >= 500) {
    const o = e.filter((r) => r < t - 1);
    return o.length > 0 ? o[o.length - 1] : null;
  }
  return n <= -500 ? e.find((o) => o > t + 1) ?? e[e.length - 1] : t < e[0] / 2 ? null : e.reduce((o, r) => Math.abs(r - t) < Math.abs(o - t) ? r : o);
}
function xs(e) {
  const t = Math.max(0, Math.round(e - 40)), n = Math.min(t, Math.round(e * Nv));
  return n < t ? [n, t] : [t];
}
const Iv = 'button, a[href], input, select, textarea, [role="tab"], [contenteditable]:not([contenteditable="false"])', Ra = "bg-black/30 transition-opacity duration-200 starting:opacity-0", td = () => {
}, nd = be(td), od = nd.Provider;
function Rv() {
  return X(nd);
}
const Dv = (e, t) => e.composedPath().some((n) => n instanceof Element && n !== t && n.matches('[aria-modal="true"]')), $v = (e) => Object.fromEntries(Object.entries(e ?? {}).map(([t, n]) => [`data-${t}`, n])), zv = 8;
function rd({ label: e, onClose: t, size: n = "content", list: o = !1, trapFocus: r = !0, header: a, width: s, part: l, data: d, children: c }) {
  const p = k(null), f = k(null), u = k(null), m = k(t);
  m.current = t;
  const g = k(0), h = k(null), b = () => n === "panel" ? xs(p.current?.offsetHeight ?? 0) : [u.current?.offsetHeight ?? 0], y = (S, x) => {
    const O = u.current;
    if (!O || x.length === 0) return;
    const M = x[0], T = x[x.length - 1];
    n === "panel" && (O.style.height = `${Math.min(T, Math.max(M, S))}px`);
    const L = Math.max(0, M - S);
    O.style.translate = L > 0 ? `0 ${L}px` : "", f.current && (f.current.style.opacity = L > 0 ? `${Math.max(0, 1 - L / M)}` : "");
  };
  R(() => {
    const S = p.current, x = u.current;
    if (!S || !x) return;
    const O = Wc(S, (L) => {
      const B = Hc(L, [
        "right",
        "bottom",
        "left"
      ]);
      if (x.style.paddingLeft = B.paddingLeft ?? "", x.style.paddingRight = B.paddingRight ?? "", x.style.paddingBottom = B.paddingBottom ?? "", x.style.maxHeight = `${Math.max(0, S.offsetHeight - 40)}px`, n === "panel" && !h.current) {
        const I = xs(S.offsetHeight);
        y(I[Math.min(g.current, I.length - 1)], I);
      }
    }), M = r ? Vo(x, { onEscape: () => m.current() }) : null, T = ua(S, (L) => {
      Dv(L, x) || m.current();
    });
    return () => {
      T(), M?.release(), O();
    };
  }, []);
  const v = (S) => {
    if (S.pointerType === "mouse" && S.button !== 0 || S.target.closest(Iv)) return;
    const x = u.current;
    if (!x) return;
    S.currentTarget.setPointerCapture(S.pointerId);
    const O = x.offsetHeight;
    h.current = {
      pointerId: S.pointerId,
      startY: S.clientY,
      startHeight: O,
      heights: b(),
      samples: [{
        t: S.timeStamp,
        x: S.clientX,
        y: S.clientY
      }],
      height: O
    }, p.current?.setAttribute("data-dragging", "");
  }, _ = (S) => {
    const x = h.current;
    !x || x.pointerId !== S.pointerId || (x.height = x.startHeight - (S.clientY - x.startY), x.samples.push({
      t: S.timeStamp,
      x: S.clientX,
      y: S.clientY
    }), x.samples.length > zv && x.samples.shift(), y(x.height, x.heights));
  }, P = (S) => {
    const x = h.current;
    if (!x || x.pointerId !== S.pointerId) return;
    h.current = null, p.current?.removeAttribute("data-dragging");
    const O = S.type === "pointercancel", M = O ? 0 : Jp(x.samples, S.timeStamp)?.vy ?? 0, T = O ? x.heights[g.current] : Lv(x.heights, x.height, M);
    if (T === null) {
      m.current();
      return;
    }
    g.current = Math.max(0, x.heights.indexOf(T)), y(T, x.heights);
  };
  return /* @__PURE__ */ i("div", {
    ref: p,
    ...La,
    "data-epdf-layer": "",
    className: `${Gc} p-0 open:flex open:flex-col open:justify-end`,
    style: {
      position: "fixed",
      inset: "auto",
      maxWidth: "none",
      maxHeight: "none"
    },
    children: [/* @__PURE__ */ i("div", {
      ref: f,
      "aria-hidden": "true",
      className: `absolute inset-0 ${Ra} in-data-dragging:transition-none`,
      onClick: () => m.current()
    }), /* @__PURE__ */ i("div", {
      ref: u,
      role: r ? "dialog" : void 0,
      "aria-modal": r ? !0 : void 0,
      "aria-label": r ? e : void 0,
      part: l,
      ...$v(d),
      "data-epdf-sheet": "",
      className: `border-border-subtle bg-elevated starting:translate-y-full in-data-dragging:transition-none relative flex shrink-0 flex-col rounded-t-2xl border-t shadow-2xl transition-[translate,height] duration-200 ease-out motion-reduce:transition-none ${s === void 0 ? "w-full" : "max-w-full self-center border-x"}`,
      style: s === void 0 ? void 0 : { width: s },
      children: [/* @__PURE__ */ i("div", {
        className: "shrink-0 touch-pan-x select-none",
        onPointerDown: v,
        onPointerMove: _,
        onPointerUp: P,
        onPointerCancel: P,
        children: [/* @__PURE__ */ i("div", {
          "data-epdf-sheet-handle": "",
          className: "flex h-6 cursor-grab items-center justify-center active:cursor-grabbing",
          children: /* @__PURE__ */ i("span", { className: "bg-border-strong h-1 w-10 rounded-full" })
        }), a]
      }), /* @__PURE__ */ i("div", {
        className: "flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-contain",
        children: /* @__PURE__ */ i(od, {
          value: o ? () => m.current() : td,
          children: c
        })
      })]
    })]
  });
}
const Fv = (e, t) => gu(e, t, im), Bv = [];
function Da(e) {
  const t = U(aa), n = _e(), o = j(() => e ? ra(e) : null, [e]), r = le(
    () => o ? hu(o, (a) => t.resolveCommand(a, n ?? void 0)) : Bv,
    Fv
  );
  return j(
    () => r.length === 0 ? null : {
      groups: r,
      execute: (a) => void t.execute(a, { documentId: n ?? void 0 })
    },
    [r, t, n]
  );
}
function ks({
  k: e,
  orientation: t,
  onLength: n,
  children: o
}) {
  const r = k(null);
  return R(
    () => r.current ? yl(r.current, t, (a) => n(e, a)) : void 0,
    [e, t, n]
  ), /* @__PURE__ */ i("span", { ref: r, style: { display: "inline-flex", flexShrink: 0 }, children: o });
}
function Kv({
  name: e,
  k: t,
  orientation: n,
  grow: o,
  onLength: r,
  children: a
}) {
  const s = k(null);
  return R(() => {
    const l = s.current;
    if (!l) return;
    const d = (c) => r(t, c);
    return o ? nf(l, n, d) : yl(l, n, d);
  }, [t, n, o, r]), /* @__PURE__ */ i(
    "slot",
    {
      ref: s,
      name: e,
      style: {
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
        flexGrow: o ? 1 : 0
      },
      children: a
    }
  );
}
const jv = (e) => ({
  position: "absolute",
  left: 0,
  top: 0,
  height: 0,
  overflow: "hidden",
  visibility: "hidden",
  pointerEvents: "none",
  display: "flex",
  whiteSpace: "nowrap",
  ...e === "vertical" ? { flexDirection: "column", alignItems: "flex-start" } : null
}), Ss = { [wl]: "" }, Hv = { display: "contents" }, Uv = (e) => ({
  display: "flex",
  flexDirection: e === "vertical" ? "column" : "row",
  alignItems: "center",
  flex: "1 0 auto"
}), ad = Cn("toolbar-surface"), Jt = Cn("toolbar-border"), $a = Cn("toolbar-active"), Gv = (e, t, n) => /* @__PURE__ */ i(
  "button",
  {
    type: "button",
    onClick: n,
    disabled: !e.enabled,
    "aria-pressed": e.pressable ? e.active : void 0,
    "aria-haspopup": e.menu ? "menu" : void 0,
    "aria-expanded": e.menu ? e.active : void 0,
    title: e.label,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "4px 8px",
      whiteSpace: "nowrap",
      color: "inherit",
      font: "inherit",
      background: e.active ? $a : "transparent",
      border: `1px solid ${Jt}`,
      borderRadius: 4,
      cursor: e.enabled ? "pointer" : "default",
      opacity: e.enabled ? 1 : 0.4
    },
    children: e.label
  }
);
function Wv({ orientation: e }) {
  return /* @__PURE__ */ i(
    "span",
    {
      style: { ...e === "vertical" ? { height: 1 } : { width: 1 }, alignSelf: "stretch", background: "currentColor", opacity: 0.2 }
    }
  );
}
const id = (e, t) => /* @__PURE__ */ i(
  "button",
  {
    type: "button",
    onClick: t,
    "aria-haspopup": "menu",
    "aria-expanded": e,
    title: "More",
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "4px 8px",
      color: "inherit",
      font: "inherit",
      border: `1px solid ${Jt}`,
      borderRadius: 4,
      background: e ? $a : "transparent",
      cursor: "pointer"
    },
    children: "⋯"
  }
), Vv = (e) => e === "vertical" ? { top: 0, insetInlineStart: "100%" } : { top: "100%", insetInlineEnd: 0 };
function za({
  view: e,
  orientation: t
}) {
  const n = k(null), o = k(e.close);
  return o.current = e.close, R(() => {
    const r = n.current;
    if (!e.isOpen || !r) return;
    const a = r.parentElement ?? r, s = tf(a).find((c) => !r.contains(c)) ?? null, l = ua(a, () => o.current()), d = pa(r, { trigger: s, close: () => o.current() });
    return () => {
      l(), d();
    };
  }, [e.isOpen]), e.isOpen ? /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      role: "menu",
      style: {
        position: "absolute",
        ...Vv(t),
        zIndex: 41,
        minWidth: 200,
        padding: 4,
        background: ad,
        border: `1px solid ${Jt}`,
        borderRadius: 6,
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
      },
      children: e.sections.map((r, a) => /* @__PURE__ */ i(D, { children: [
        a > 0 && /* @__PURE__ */ i("div", { style: { height: 1, background: Jt, margin: "4px 0" } }),
        r.rows.map((s) => {
          const l = e.resolve(s.command);
          if (!l) return null;
          const d = s.kind === "submenu";
          return /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              role: r.role === "radio" ? "menuitemradio" : "menuitem",
              "aria-checked": r.role === "radio" ? l.active : void 0,
              disabled: !l.enabled,
              tabIndex: -1,
              onClick: () => {
                e.execute(s.command), d || e.close();
              },
              style: {
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "6px 8px",
                border: "none",
                color: "inherit",
                font: "inherit",
                background: "transparent",
                cursor: l.enabled ? "pointer" : "default",
                opacity: l.enabled ? 1 : 0.4,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ i("span", { children: [
                  l.active && r.role === "radio" ? "• " : "",
                  l.label
                ] }),
                d ? /* @__PURE__ */ i("span", { children: "▸" }) : null
              ]
            },
            s.command
          );
        })
      ] }, a))
    }
  ) : null;
}
function qv({
  view: e,
  orientation: t
}) {
  if (e.collapse === "select") {
    const n = e.commands.find((o) => o.active);
    return /* @__PURE__ */ i(
      "select",
      {
        value: n?.id ?? "",
        onChange: (o) => e.execute(o.target.value),
        style: {
          padding: "4px 6px",
          font: "inherit",
          borderRadius: 4,
          border: `1px solid ${Jt}`,
          background: ad
        },
        children: e.commands.map((o) => /* @__PURE__ */ i("option", { value: o.id, disabled: !o.enabled, children: o.label }, o.id))
      }
    );
  }
  return /* @__PURE__ */ i(Yv, { view: e, orientation: t });
}
function Yv({
  view: e,
  orientation: t
}) {
  const [n, o] = C(!1);
  return /* @__PURE__ */ i("span", { style: { position: "relative", display: "inline-flex" }, children: [
    id(n, () => o((r) => !r)),
    /* @__PURE__ */ i(
      za,
      {
        view: Tn(e, n, () => o(!1)),
        orientation: t
      }
    )
  ] });
}
function Xv({
  view: e,
  orientation: t
}) {
  const [n, o] = C(!1), r = e.commands.some((a) => a.active);
  return /* @__PURE__ */ i("span", { style: { position: "relative", display: "inline-flex" }, children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => o((a) => !a),
        "aria-haspopup": "menu",
        "aria-expanded": n,
        title: "More",
        style: {
          display: "inline-flex",
          alignItems: "center",
          padding: "4px 6px",
          color: "inherit",
          font: "inherit",
          border: `1px solid ${Jt}`,
          borderRadius: 4,
          // A hint that the active item is in here.
          background: n || r ? $a : "transparent",
          cursor: "pointer"
        },
        children: "▾"
      }
    ),
    /* @__PURE__ */ i(
      za,
      {
        view: Tn(e, n, () => o(!1)),
        orientation: t
      }
    )
  ] });
}
function Zv({
  bar: e,
  orientation: t = "horizontal",
  gap: n = 8,
  separatorWidth: o = 1,
  "aria-label": r,
  className: a,
  style: s,
  renderCommand: l = Gv,
  renderCustom: d,
  renderCollapsed: c,
  renderGroupTrigger: p,
  renderSeparator: f,
  renderOverflowTrigger: u = id,
  renderOverflowMenu: m
}) {
  const g = dt(), h = U(aa), b = _e(), y = t === "vertical", [, v] = kt((A) => A + 1, 0);
  E(() => g.subscribe(v), [g]);
  const _ = k(null), [P, S] = C(0);
  R(
    () => _.current ? Qp(_.current, t, S) : void 0,
    [t]
  );
  const [x] = C(of), [, O] = kt((A) => A + 1, 0), M = j(
    () => (A, ie) => {
      x.report(t, A, ie) && O();
    },
    [x, t]
  ), T = k(null);
  R(() => {
    const A = _.current;
    if (!A) return;
    const ie = ef(A, t);
    return T.current = ie, () => {
      ie.detach(), T.current = null;
    };
  }, [t]), R(() => T.current?.refresh());
  const L = (A) => h.resolveCommand(A, b ?? void 0), B = (A) => void h.execute(A, { documentId: b ?? void 0 }), I = j(() => ra(e), [e]), K = bu({
    bar: I,
    resolve: L,
    unregistered: sm,
    execute: B,
    menuTarget: (A) => h.getMenuTarget(A),
    metrics: x.metrics(t, n, o),
    measureKey: pi,
    containerLength: P,
    orientation: t
  }), [te, Fe] = C(!1);
  E(() => {
    K.hasOverflow || Fe(!1);
  }, [K.hasOverflow]);
  const ne = (A) => A.kind === "custom" && !d?.[A.name], nt = (A, ie) => {
    switch (A.kind) {
      case "command":
        return l(A.command, A.variant, A.run);
      case "custom": {
        const ve = () => A.terminal ? l(A.terminal, "icon", A.runTerminal) : null, Se = d?.[A.name];
        if (Se) {
          const Mt = Se(A.variant, {
            layer: ie,
            measure: (Ot) => M(A.measureKey, Ot)
          });
          return Mt === void 0 ? ve() : Mt;
        }
        return ie === "measure" ? null : /* @__PURE__ */ i(
          Kv,
          {
            name: A.name,
            k: A.measureKey,
            orientation: t,
            grow: A.grow,
            onLength: M,
            children: ve()
          }
        );
      }
      case "collapsed": {
        const ve = c?.(A.view);
        return ve === void 0 ? /* @__PURE__ */ i(qv, { view: A.view, orientation: t }) : ve;
      }
      case "disclosure": {
        const ve = p?.(A.view);
        return ve === void 0 ? /* @__PURE__ */ i(Xv, { view: A.view, orientation: t }) : ve;
      }
    }
  }, ln = (A) => A.groups.map((ie, ve) => /* @__PURE__ */ i(D, { children: [
    ve > 0 && (f ? f() : /* @__PURE__ */ i(Wv, { orientation: t })),
    ie.parts.map((Se) => /* @__PURE__ */ i(
      "span",
      {
        ...Ss,
        style: Se.kind === "custom" && Se.grow ? Uv(t) : Hv,
        children: nt(Se, "live")
      },
      Se.key
    ))
  ] }, ie.id)), St = (A) => ({
    display: "flex",
    flexDirection: y ? "column" : "row",
    alignItems: "center",
    gap: n,
    flex: A.grows ? "1 0 auto" : "0 0 auto",
    ...A.spacing === "balance" ? y ? { marginTop: "auto", marginBottom: "auto" } : { marginLeft: "auto", marginRight: "auto" } : A.spacing === "gap" ? y ? { marginTop: n } : { marginInlineStart: n } : null
  }), ot = {
    sections: K.overflow,
    isOpen: te,
    close: () => Fe(!1),
    resolve: L,
    execute: B
  };
  return /* @__PURE__ */ i(
    "div",
    {
      ref: _,
      role: "toolbar",
      "aria-orientation": t,
      "aria-label": r,
      className: a,
      style: {
        position: "relative",
        display: "flex",
        flexDirection: y ? "column" : "row",
        alignItems: "center",
        ...s
      },
      children: [
        K.sections.map((A) => /* @__PURE__ */ i("div", { style: St(A), children: [
          ln(A),
          A.name === "end" && K.hasOverflow && /* @__PURE__ */ i("span", { ...Ss, style: { position: "relative", display: "inline-flex" }, children: [
            u(te, () => Fe((ie) => !ie)),
            m ? m(ot) : /* @__PURE__ */ i(za, { view: ot, orientation: t })
          ] })
        ] }, A.name)),
        /* @__PURE__ */ i("div", { "aria-hidden": !0, ...bc, style: jv(t), children: [
          K.measured.filter((A) => !ne(A)).map((A) => {
            const ie = nt(A, "measure");
            return A.kind === "custom" && ie === null ? null : /* @__PURE__ */ i(
              ks,
              {
                k: A.measureKey,
                orientation: t,
                onLength: M,
                children: ie
              },
              A.measureKey
            );
          }),
          /* @__PURE__ */ i(
            ks,
            {
              k: pi.overflowTrigger,
              orientation: t,
              onLength: M,
              children: u(!1, () => {
              })
            }
          )
        ] })
      ]
    }
  );
}
const sd = {
  annotations: [
    "highlight",
    "markup",
    "drawing",
    "text",
    "notes",
    "links"
  ],
  shapes: [],
  stamps: [],
  comments: ["writing"],
  forms: ["filling", "building"],
  signatures: ["signing", "checking"],
  redaction: [],
  measurement: [],
  pages: [],
  attachments: ["adding"],
  text: ["selection", "copy"],
  snapshots: [],
  search: [],
  thumbnails: [],
  outline: ["editing"],
  documents: [
    "open",
    "download",
    "print",
    "tabs"
  ]
}, Jv = [
  "forms.building",
  "redaction",
  "measurement",
  "snapshots"
], ld = [
  "annotations",
  "shapes",
  "stamps",
  "comments.writing",
  "forms",
  "signatures.signing",
  "redaction",
  "measurement",
  "pages",
  "attachments.adding",
  "outline.editing"
], Hr = (e, t) => e === t || e.startsWith(`${t}.`), Qv = (e) => ld.every(e), e0 = {
  "annotations.highlight": ["highlight"],
  "annotations.markup": [
    "underline",
    "strikeout",
    "squiggly"
  ],
  "annotations.drawing": ["ink"],
  "annotations.text": ["free-text", "caret"],
  "annotations.notes": ["text"],
  "annotations.links": ["link"],
  shapes: [
    "square",
    "circle",
    "line",
    "polygon",
    "polyline"
  ],
  stamps: ["stamp"],
  redaction: ["redact"],
  measurement: [
    "line-dimension",
    "polyline-dimension",
    "polygon-dimension"
  ],
  "attachments.adding": ["file-attachment"],
  "forms.building": ["widget"]
}, t0 = {
  "forms.filling": [
    "text",
    "checkbox",
    "radio",
    "combobox",
    "listbox",
    "pushbutton"
  ],
  "signatures.signing": ["signature"]
};
function Ms(e, t) {
  const n = Object.keys(e), o = n.filter((r) => !t.some((a) => Hr(r, a)));
  return o.length === n.length ? !0 : o.length === 0 ? !1 : o.flatMap((r) => e[r]);
}
const n0 = (e) => sd[e] ?? [];
function o0(e) {
  if (!e) return [];
  const t = e === !0 ? [] : e.except, n = [], o = (r) => {
    if (t.some((s) => Hr(r, s))) return;
    const a = n0(r);
    if (a.length === 0 || !t.some((s) => Hr(s, r))) {
      n.push(r);
      return;
    }
    for (const s of a) o(`${r}.${s}`);
  };
  for (const r of ld) o(r);
  return n;
}
const Fa = (e) => {
  const t = e.indexOf(".");
  return t < 0 ? [e, void 0] : [e.slice(0, t), e.slice(t + 1)];
};
function cd(e) {
  const t = new Map(Object.entries(sd).map(([n, o]) => [n, [...o]]));
  for (const n of e) {
    const [o, r] = Fa(n), a = t.get(o) ?? [];
    r !== void 0 && !a.includes(r) && a.push(r), t.set(o, a);
  }
  return t;
}
function dd({ features: e, disable: t, readOnly: n }, o) {
  const r = cd(o), a = /* @__PURE__ */ new Map(), s = (c) => {
    let p = a.get(c);
    if (!p) {
      const f = r.get(c) ?? [];
      p = {
        on: !0,
        parts: new Map(f.map((u) => [u, !0]))
      }, a.set(c, p);
    }
    return p;
  }, l = (c) => {
    const p = [...c].sort(([f], [u]) => Number(f.includes(".")) - Number(u.includes(".")));
    for (const [f, u] of p) {
      const [m, g] = Fa(f), h = s(m);
      if (g !== void 0) {
        h.parts.set(g, u);
        continue;
      }
      h.on = u;
      for (const b of h.parts.keys()) h.parts.set(b, u);
    }
  }, d = (c) => c.map((p) => [p, !1]);
  return l(d(Jv)), l(d((t ?? []).filter((c) => !c.includes(":")))), l(Object.entries(e ?? {}).filter((c) => typeof c[1] == "boolean")), l(d(o0(n))), [...r.keys(), ...a.keys()].filter((c, p, f) => f.indexOf(c) === p && a.has(c)).flatMap((c) => {
    const { on: p, parts: f } = a.get(c), u = [...f].filter(([, m]) => !m);
    return !p && u.length === f.size ? [c] : u.map(([m]) => `${c}.${m}`);
  });
}
function r0(e, t) {
  const n = cd(t);
  return Object.keys(e ?? {}).filter((o) => {
    const [r, a] = Fa(o), s = n.get(r);
    return !s || a !== void 0 && !s.includes(a);
  });
}
function a0(e, t = []) {
  const n = new Set((e.disable ?? []).filter((o) => o.includes(":")));
  return {
    disabledCategories: dd(e, t),
    disabledCommands: [...n]
  };
}
function i0(e, t = []) {
  const n = dd(e, t);
  return {
    editable: Ms(e0, n),
    fillable: Ms(t0, n)
  };
}
function Os(e, t) {
  return e === !0 ? t : t === !0 ? e : e === !1 || t === !1 ? !1 : e.filter((n) => t.includes(n));
}
const Ps = (e, t) => typeof e == "boolean" || typeof t == "boolean" ? e === t : e.length === t.length && e.every((n, o) => n === t[o]);
function s0() {
  const e = Q(), t = Eg(V(ct, (r) => r.getCurrentPage())), n = Qe("measurement"), o = we({ label: e("measurement.title") });
  return /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...o.trigger,
    type: "button",
    part: Me(n.isOpen),
    className: De(n.isOpen),
    "aria-pressed": n.isOpen,
    onClick: () => n.toggle(),
    children: /* @__PURE__ */ i("span", {
      className: "flex items-center whitespace-nowrap text-sm",
      children: [/* @__PURE__ */ i(Y, {
        name: "updateScale",
        size: 20,
        className: "me-1.5 shrink-0"
      }), /* @__PURE__ */ i("span", { children: [
        e("measurement.scale"),
        ":",
        " ",
        t?.measure?.subtype === "rectilinear" ? t.measure.ratio ?? e("measurement.custom") : e("measurement.unavailable")
      ] })]
    })
  }), o.element] });
}
function l0() {
  const e = Q(), { files: t } = fc();
  return /* @__PURE__ */ i("span", {
    className: "text-fg-muted whitespace-nowrap text-xs",
    children: e("attachments.count", { params: { count: t.length } })
  });
}
const Ba = be(null);
function c0({ children: e }) {
  const t = _e() ?? "", [n, o] = C(() => /* @__PURE__ */ new Map()), r = Ve((l) => o((d) => new Map(d).set(t, l)), [t]), a = n.get(t) ?? "", s = j(() => [a, r], [a, r]);
  return /* @__PURE__ */ i(Ba.Provider, {
    value: s,
    children: e
  });
}
const d0 = ["", () => {
}];
function rx() {
  return X(Ba) ?? d0;
}
function u0({ variant: e }) {
  const t = Q(), n = X(Ba);
  if (!n) return null;
  const [o, r] = n;
  return /* @__PURE__ */ i("div", {
    className: `relative ${e === "narrow" ? "w-24" : "w-36"}`,
    children: [/* @__PURE__ */ i("div", {
      className: "text-fg-muted pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2",
      children: /* @__PURE__ */ i(Y, {
        name: "search",
        size: 14
      })
    }), /* @__PURE__ */ i("input", {
      type: "search",
      value: o,
      placeholder: t("outline.filter"),
      "aria-label": t("outline.filter"),
      onChange: (a) => r(a.target.value),
      className: "border-border bg-surface text-fg focus:border-accent focus:ring-accent w-full rounded-md border py-1 pe-2 ps-7 text-sm outline-none focus:ring-1"
    })]
  });
}
function p0(e) {
  const t = e.listCurrentPages().map((n) => n.index + 1);
  return t.length ? {
    first: Math.min(...t),
    last: Math.max(...t)
  } : null;
}
const f0 = (e, t) => e?.first === t?.first && e?.last === t?.last;
function m0() {
  const e = Q(), t = ee(ct), n = Xt((P) => P.currentPageIndex + 1), o = Xt((P) => P.pageCount), r = ae(ct, p0, null, f0), a = r !== null && r.last > r.first, s = a ? r.first : n, [l, d] = C(null), c = k(null), p = k(null), f = k(!1), u = l !== null, m = we({ label: e("pageNumber.goToPage") }), g = m.trigger.ref, h = Ve((P) => {
    p.current = P, g(P);
  }, [g]);
  if (R(() => {
    u ? (c.current?.focus(), c.current?.select()) : f.current && (f.current = !1, p.current?.focus());
  }, [u]), o <= 1) return null;
  const b = () => {
    f.current = !0, d(null);
  }, y = () => {
    const P = Number.parseInt(l ?? "", 10);
    Number.isFinite(P) && t?.goToPage(Math.min(Math.max(P, 1), o) - 1), b();
  }, [v, _ = ""] = (a ? e("pageNumber.pages", { params: {
    first: "",
    last: r.last,
    total: o
  } }) : e("pageNumber.page", { params: {
    current: "",
    total: o
  } })).split("");
  return /* @__PURE__ */ i("span", {
    className: "text-fg-secondary flex whitespace-nowrap text-sm",
    children: u ? /* @__PURE__ */ i("span", {
      className: "block h-8 px-2 leading-8",
      children: [
        v,
        /* @__PURE__ */ i("input", {
          ref: c,
          type: "text",
          inputMode: "numeric",
          "aria-label": e("pageNumber.goToPage"),
          value: l,
          onChange: (P) => d(P.target.value.replace(/[^0-9]/g, "")),
          onKeyDown: (P) => {
            P.key === "Enter" ? (P.preventDefault(), y()) : P.key === "Escape" && (P.preventDefault(), b());
          },
          onBlur: () => d(null),
          style: { width: `${String(o).length + 1}ch` },
          className: "bg-hover ring-accent text-fg rounded text-center tabular-nums outline-none ring-1"
        }),
        _
      ]
    }) : /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
      ...m.trigger,
      ref: h,
      type: "button",
      onClick: () => d(String(s)),
      className: "hover:bg-hover hover:text-fg block h-8 cursor-pointer rounded-md px-2 tabular-nums leading-8",
      children: [
        v,
        s,
        _
      ]
    }), m.element] })
  });
}
function h0() {
  const e = Q(), t = Oa(), { standard: n, quick: o } = Yb(), { locale: r } = xo(), a = xc(), s = _e(), l = ae(An, (u) => u.getActiveToolId(), null), d = Og((u) => u.armedAsset?.id ?? null), c = (o ?? []).map(Ov), p = c.some((u) => u.startsWith(`${Mn}:`));
  E(() => {
    p && ed(t).then(() => Ev(t, Pv(r), n)).catch((u) => console.error("[embedpdf] quick stamps failed:", u));
  }, [
    t,
    r,
    p
  ]);
  const f = c.map((u) => a.find((m) => m.id === u)).filter((u) => !!u);
  return f.length === 0 || !s ? null : /* @__PURE__ */ i("div", {
    className: "flex items-center gap-1",
    role: "group",
    "aria-label": e("demo.quickStampsLabel"),
    children: f.map((u) => /* @__PURE__ */ i(g0, {
      asset: u,
      active: l === "stamp" && d === u.id,
      onArm: () => void t.armAsset(u.id).catch((m) => console.error("[embedpdf] arm failed", m))
    }, u.id))
  });
}
function g0({ asset: e, active: t, onArm: n }) {
  const o = Tg(e.id), r = we({
    label: e.label,
    labelShown: !o
  });
  return /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...r.trigger,
    type: "button",
    onClick: n,
    "aria-label": e.label,
    "aria-pressed": t,
    part: Me(t),
    className: De(t, !0),
    children: o ? /* @__PURE__ */ i("img", {
      src: o,
      alt: "",
      className: "h-5 w-5 object-contain",
      draggable: !1
    }) : /* @__PURE__ */ i("span", {
      className: "text-xs",
      children: e.label
    })
  }), r.element] });
}
function b0(e) {
  return e.canCreate() ? !0 : e.list().some(({ ref: t }) => e.canUpdate(t) || e.canDelete(t));
}
function v0(e, t) {
  return e.canDesign() ? !0 : e.list().some((n) => n.kind === "signature" ? t?.canSign(n.ref) ?? !1 : e.canFill(n.ref));
}
function w0() {
  const e = ee(ye) !== null, t = ee(nn), n = ae(ye, b0, !1), o = ae(tn, (s) => v0(s, t), !1), r = ae(Ko, (s) => s.canEdit(), !1), a = ae(ht, (s) => s.canApply(), !1);
  return e && !n && !o && !r && !a;
}
function y0({ compact: e = !1 }) {
  const t = Q(), n = ke();
  Vg((a) => a.disabledCategories);
  const o = Qv((a) => n.isCategoryDisabled(a)), r = w0();
  return !o && !r ? null : /* @__PURE__ */ i(qo, {
    content: { label: t(o ? "viewOnly.turnedOff" : "viewOnly.notAllowed") },
    children: (a) => /* @__PURE__ */ i("span", {
      ...a,
      className: "bg-hover text-fg-secondary flex h-7 shrink-0 select-none items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-xs font-medium",
      children: [/* @__PURE__ */ i(Y, {
        name: "eye",
        size: 16,
        className: "shrink-0"
      }), /* @__PURE__ */ i("span", {
        className: e ? "sr-only" : void 0,
        children: t("viewOnly.label")
      })]
    })
  });
}
const _0 = {
  orientation: "data-orientation",
  edge: "data-edge",
  variant: "data-variant",
  size: "data-size"
}, x0 = (e) => e === "float-top" || e === "float-bottom" ? "float" : e;
function k0(e, t) {
  for (const [n, o] of Object.entries(_0)) {
    const r = t[n];
    r === null ? e.removeAttribute(o) : e.getAttribute(o) !== r && e.setAttribute(o, r);
  }
}
const S0 = (e) => e.parentElement ?? e.getRootNode().host ?? null;
function ud() {
  const e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new Set();
  let n = 0;
  return {
    set(o, r) {
      if (e.get(o) !== r) {
        e.set(o, r), n += 1;
        for (const a of [...t]) a();
      }
    },
    edgeOf(o) {
      for (let r = o; r; r = S0(r)) {
        const a = e.get(r);
        if (a) return a;
      }
      return "top";
    },
    subscribe(o) {
      return t.add(o), () => {
        t.delete(o);
      };
    },
    version: () => n
  };
}
const pd = be(ud()), M0 = pd.Provider;
function fd() {
  return X(pd);
}
const md = {
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0
}, O0 = {
  ...md,
  flexGrow: 1
};
function P0({ id: e, variant: t, orientation: n, grow: o = !1, measure: r, children: a }) {
  const s = k(null), l = Ia(), { size: d } = ut(), c = fd(), p = k(r);
  p.current = r;
  const f = k(null), u = t !== null;
  return R(() => {
    const m = s.current;
    if (!m) return;
    const g = n === "vertical" ? "height" : "width", h = () => p.current(o ? rf(m, n) : m.getBoundingClientRect()[g]);
    u || h();
    const b = new ResizeObserver(h);
    return b.observe(m), f.current = b, () => {
      b.disconnect(), f.current = null;
    };
  }, [
    n,
    u,
    o
  ]), R(() => {
    const m = s.current, g = f.current;
    !m || !g || (g.unobserve(m), g.observe(m));
  }, [t]), R(() => {
    const m = s.current;
    if (!m) return;
    const g = {
      orientation: n,
      edge: x0(l),
      variant: t,
      size: d
    }, h = () => {
      for (const b of m.assignedElements())
        k0(b, g), c.set(b, l);
    };
    return h(), m.addEventListener("slotchange", h), () => m.removeEventListener("slotchange", h);
  }, [
    n,
    l,
    t,
    d,
    c
  ]), /* @__PURE__ */ i("slot", {
    ref: s,
    name: `item:${e}`,
    style: o ? O0 : md,
    children: a
  });
}
const hd = 4, T0 = { popover: "manual" }, C0 = '[role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"]', gd = '[inert], [aria-hidden="true"]', Ur = be(!1), yn = (e) => [...e.querySelectorAll(C0)].filter((t) => t.closest('[role="menu"]') === e), bd = (e) => e?.getAttribute("aria-label") || e?.textContent?.trim() || void 0, vd = (e, t) => [...e.querySelectorAll("[aria-haspopup]")].find((n) => !t.contains(n)) ?? null;
function E0(e, t) {
  const n = Oo(e), o = e.closest('[role="menu"]'), r = o ? Oo(o) : n, a = t.clientTop + parseFloat(getComputedStyle(t).paddingTop || "0");
  return {
    x: r.x,
    y: n.y - a,
    width: r.width,
    height: n.height
  };
}
function A0(e, t, n, o) {
  const r = vl(e, "client");
  r && (e.style.maxHeight = `${Math.max(0, r.height - 2 * hd)}px`, Jc(e, t, n, o));
}
function N0(e, t, n) {
  const { nested: o, close: r } = n, a = vd(t, e), s = da(t), l = n.placement(s), d = bd(a);
  d && e.setAttribute("aria-label", d), typeof e.showPopover == "function" && e.showPopover();
  const c = () => A0(e, o ? E0(t, e) : Oo(t), l, o ? 0 : hd);
  c();
  const p = new ResizeObserver(c);
  p.observe(e), p.observe(t);
  const f = Do(c), u = ua(e, (b) => {
    (!a || !b.composedPath().includes(a)) && r();
  }), m = pa(e, {
    trigger: a,
    close: r,
    items: () => yn(e)
  }), g = Xc(s), h = (b) => {
    const y = b.target, v = !b.defaultPrevented, _ = y.getAttribute("aria-haspopup") === "menu";
    if (v && b.key === g.open && _ && yn(e).includes(y))
      if (b.preventDefault(), y.getAttribute("aria-expanded") !== "true") y.click();
      else {
        const P = y.parentElement?.querySelector('[role="menu"]');
        P && yn(P)[0]?.focus();
      }
    else v && b.key === g.close && o && (b.preventDefault(), r(), a?.focus());
    o && b.key !== "Tab" && b.stopPropagation();
  };
  return e.addEventListener("keydown", h), () => {
    e.removeEventListener("keydown", h), m(), u(), f(), p.disconnect(), typeof e.hidePopover == "function" && e.matches(":popover-open") && e.hidePopover();
  };
}
function Fn(e) {
  const t = k(null), [n, o] = C(!1), r = ut().size === "compact";
  return R(() => {
    const a = t.current?.parentElement;
    a && !a.closest(gd) && o(!0);
  }, []), n ? r ? /* @__PURE__ */ i(R0, { ...e }) : /* @__PURE__ */ i(L0, { ...e }) : /* @__PURE__ */ i("span", {
    ref: t,
    hidden: !0
  });
}
function L0({ children: e, onClose: t, align: n = "start" }) {
  const o = k(null), r = Ia(), a = X(Ur), s = k(t);
  return s.current = t, R(() => {
    const l = o.current, d = l?.parentElement;
    if (!(!l || !d))
      return N0(l, d, {
        placement: (c) => a ? Yc(c) : qc(r, c, n, r === "selection" ? Zc(d) : void 0),
        nested: a,
        close: () => s.current()
      });
  }, []), /* @__PURE__ */ i("div", {
    ref: o,
    ...T0,
    role: "menu",
    part: "menu",
    className: "border-border-subtle bg-elevated text-fg z-50 overflow-y-auto rounded-lg border shadow-xl",
    style: {
      position: "fixed",
      right: "auto",
      bottom: "auto",
      margin: 0
    },
    children: /* @__PURE__ */ i(Ur.Provider, {
      value: !0,
      children: e
    })
  });
}
const wd = be(null);
function I0(e) {
  const t = e.closest("[data-epdf-layer]"), n = t?.parentElement;
  return t && n ? vd(n, t) : null;
}
function R0({ children: e, onClose: t }) {
  const [n, o] = C([]), r = k(n);
  r.current = n;
  const a = k(null), s = k(t);
  s.current = t;
  const l = (c) => o([...r.current, c]), d = () => {
    const c = r.current;
    c.length !== 0 && (a.current = c[c.length - 1].opener, o(c.slice(0, -1)));
  };
  return R(() => {
    a.current?.focus(), a.current = null;
  }, [n]), /* @__PURE__ */ i(rd, {
    label: "",
    onClose: t,
    trapFocus: !1,
    children: /* @__PURE__ */ i(wd.Provider, {
      value: l,
      children: /* @__PURE__ */ i("div", {
        className: "grid",
        children: [/* @__PURE__ */ i(Ts, {
          covered: n.length > 0,
          close: () => s.current(),
          children: e
        }), n.map((c, p) => /* @__PURE__ */ i(Ts, {
          covered: p < n.length - 1,
          close: d,
          opener: c.opener,
          label: c.label,
          onBack: d,
          children: /* @__PURE__ */ i(ja, {
            menuId: c.menuId,
            onRun: c.onRun
          })
        }, p))]
      })
    })
  });
}
function Ts({ covered: e, close: t, opener: n, label: o, onBack: r, children: a }) {
  const s = Q(), l = k(null), d = k({
    close: t,
    onBack: r
  });
  return d.current = {
    close: t,
    onBack: r
  }, R(() => {
    const c = l.current;
    if (!c) return;
    const p = n ?? I0(c), f = o ?? bd(p);
    f && c.setAttribute("aria-label", f);
    const u = pa(c, {
      trigger: p,
      close: () => d.current.close(),
      items: () => yn(c),
      initialFocus: "none"
    });
    queueMicrotask(() => {
      c.isConnected && !c.inert && yn(c).find((h) => !af(h))?.focus();
    });
    const m = Xc(da(c)), g = (h) => {
      if (h.defaultPrevented) return;
      const b = h.target;
      h.key === m.open && b.getAttribute("aria-haspopup") === "menu" ? (h.preventDefault(), b.click()) : h.key === m.close && d.current.onBack && (h.preventDefault(), d.current.onBack());
    };
    return c.addEventListener("keydown", g), () => {
      c.removeEventListener("keydown", g), u();
    };
  }, []), R(() => {
    l.current && (l.current.inert = e);
  }, [e]), /* @__PURE__ */ i("div", {
    ref: l,
    role: "menu",
    part: "menu",
    className: `bg-elevated isolate col-start-1 row-start-1 min-w-0 ${r ? "starting:translate-x-full rtl:starting:-translate-x-full transition-[translate] duration-200 ease-out motion-reduce:transition-none" : ""}`,
    children: [r && /* @__PURE__ */ i("div", {
      className: "p-1 pb-0",
      children: [/* @__PURE__ */ i("button", {
        type: "button",
        tabIndex: -1,
        role: "menuitem",
        part: "menu-item",
        "data-epdf-menu-back": "",
        onClick: r,
        className: Ka,
        children: [/* @__PURE__ */ i(Y, {
          name: "chevronLeft",
          size: 16,
          className: "text-fg-muted rtl:-scale-x-100"
        }), /* @__PURE__ */ i("span", {
          className: "flex-1 truncate",
          children: s("menu.back")
        })]
      }), o && /* @__PURE__ */ i("div", {
        className: "text-fg px-2.5 pb-1 pt-2 text-sm font-semibold",
        children: o
      })]
    }), /* @__PURE__ */ i(Ur.Provider, {
      value: !0,
      children: a
    })]
  });
}
const Cs = /* @__PURE__ */ new WeakMap();
function xr(e) {
  let t = Cs.get(e);
  return t || (t = /* @__PURE__ */ new Map(), Cs.set(e, t)), t;
}
function Yo({ menuId: e, className: t = "relative inline-flex", children: n }) {
  const o = ee(H), r = Zg((c) => c.openMenus.includes(e)), a = k(null), [, s] = kt((c) => c + 1, 0), l = o ? xr(o).get(e) : void 0, d = r && l !== void 0 && l === a.current;
  return R(() => {
    const c = a.current;
    if (!o || !c) return;
    const p = xr(o), f = p.get(e);
    if (!r) {
      f === c && p.delete(e);
      return;
    }
    !f?.isConnected && !c.closest(gd) && (p.set(e, c), s());
  }), /* @__PURE__ */ i("span", {
    ref: a,
    className: t,
    onClickCapture: (c) => {
      const p = c.target, f = p.closest("[aria-haspopup]") && !p.closest('[role="menu"]');
      o && a.current && f && xr(o).set(e, a.current);
    },
    children: [n(d), d && /* @__PURE__ */ i(Fn, {
      onClose: () => o?.closeMenu(e),
      children: /* @__PURE__ */ i(ja, {
        menuId: e,
        onRun: () => o?.closeMenu(e)
      })
    })]
  });
}
const yd = (e) => {
  const t = e.filter((o) => !o.menu), n = t.filter((o) => o.active).length;
  return n === 0 ? "none" : n === 1 && t.length > 1 ? "radio" : "checkbox";
}, D0 = {
  none: "menuitem",
  radio: "menuitemradio",
  checkbox: "menuitemcheckbox"
}, _d = "flex w-full items-center gap-3 rounded-md px-2.5 py-1.5 text-start text-sm outline-none transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-40", Ka = `${_d} text-fg-secondary hover:bg-hover focus-visible:bg-hover aria-disabled:hover:bg-transparent`, $0 = `${_d} bg-selected text-accent focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent forced-colors:outline-2 forced-colors:outline-solid forced-colors:-outline-offset-2`, xd = (e) => we(e.enabled ? null : {
  label: e.label,
  reason: e.disabledReason,
  labelShown: !0
}, { inMenu: !0 });
function Bn({ command: e, choice: t, onSelect: n }) {
  const o = t !== "none" && e.active, [r] = e.shortcuts, a = xd(e);
  return /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...a.trigger,
    type: "button",
    tabIndex: -1,
    role: D0[t],
    "aria-checked": t === "none" ? void 0 : e.active,
    "aria-disabled": e.enabled ? void 0 : !0,
    part: o ? "menu-item menu-item-active" : "menu-item",
    onClick: () => {
      e.enabled && n();
    },
    className: o ? $0 : Ka,
    children: [
      e.icon && /* @__PURE__ */ i(Y, {
        name: e.icon,
        size: 16,
        accent: e.iconAccent,
        className: `${o ? "text-accent" : "text-fg-muted"} ${Zt(e.icon)}`
      }),
      /* @__PURE__ */ i("span", {
        className: "flex-1 truncate",
        children: e.label
      }),
      r && /* @__PURE__ */ i("span", {
        className: "text-fg-muted ms-4 text-xs [font-variant-emoji:text]",
        children: Sc(r)
      })
    ]
  }), a.element] });
}
function kd({ command: e, menuId: t, onRun: n }) {
  const [o, r] = C(!1), a = X(wd), s = xd(e);
  return /* @__PURE__ */ i("div", {
    role: "none",
    className: "relative",
    children: [
      /* @__PURE__ */ i("button", {
        ...s.trigger,
        type: "button",
        tabIndex: -1,
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o,
        "aria-disabled": e.enabled ? void 0 : !0,
        part: "menu-item",
        onClick: (l) => {
          e.enabled && (a ? a({
            menuId: t,
            label: e.label,
            opener: l.currentTarget,
            onRun: n
          }) : r((d) => !d));
        },
        className: `${Ka} ${o ? "bg-hover" : ""}`,
        children: [
          e.icon && /* @__PURE__ */ i(Y, {
            name: e.icon,
            size: 16,
            accent: e.iconAccent,
            className: `text-fg-muted ${Zt(e.icon)}`
          }),
          /* @__PURE__ */ i("span", {
            className: "flex-1 truncate",
            children: e.label
          }),
          /* @__PURE__ */ i(Y, {
            name: "chevronRight",
            size: 16,
            className: "text-fg-muted rtl:-scale-x-100"
          })
        ]
      }),
      s.element,
      o && /* @__PURE__ */ i(Fn, {
        onClose: () => r(!1),
        children: /* @__PURE__ */ i(ja, {
          menuId: t,
          onRun: n
        })
      })
    ]
  });
}
function z0({ commandId: e, choice: t, onRun: n }) {
  const o = Ce(e);
  return o.visible ? o.menu ? /* @__PURE__ */ i(kd, {
    command: o,
    menuId: o.menu,
    onRun: n
  }) : /* @__PURE__ */ i(Bn, {
    command: o,
    choice: t,
    onSelect: () => {
      o.run(), n?.();
    }
  }) : null;
}
function Sd({ title: e, first: t, children: n }) {
  const o = Je();
  return /* @__PURE__ */ i(D, { children: [!t && /* @__PURE__ */ i("div", {
    role: "separator",
    className: "bg-border-subtle my-1 h-px"
  }), /* @__PURE__ */ i("div", {
    role: "group",
    "aria-labelledby": e ? o : void 0,
    children: [e && /* @__PURE__ */ i("div", {
      id: o,
      className: "text-fg-muted px-2.5 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide",
      children: e
    }), n]
  })] });
}
const F0 = (e, t) => e.length === t.length && e.every((n, o) => n === t[o]);
function ja({ menuId: e, onRun: t }) {
  const n = Q(), o = qb(e), r = ke(), a = _e() ?? void 0, s = le(() => (o ?? []).map((d) => {
    const c = d.items.map((p) => r.resolveCommand(p, a)).filter((p) => p?.visible === !0);
    return c.length === 0 ? null : yd(c);
  }), F0);
  if (!o) return null;
  const l = o.flatMap((d, c) => {
    const p = s[c];
    return p ? [{
      section: d,
      choice: p
    }] : [];
  });
  return l.length === 0 ? null : /* @__PURE__ */ i("div", {
    className: "min-w-52 p-1",
    children: l.map(({ section: d, choice: c }, p) => /* @__PURE__ */ i(Sd, {
      first: p === 0,
      title: d.title ?? (d.titleKey ? n(d.titleKey) : void 0),
      children: d.items.map((f) => /* @__PURE__ */ i(z0, {
        commandId: f,
        choice: c,
        onRun: t
      }, f))
    }, p))
  });
}
function Xo({ view: e, align: t }) {
  const n = Q();
  if (!e.isOpen) return null;
  const o = e.sections.map((r) => {
    const a = r.rows.flatMap((s) => {
      const l = e.resolve(s.command);
      return l ? [{
        row: s,
        command: l
      }] : [];
    });
    return {
      section: r,
      rows: a,
      choice: r.role === "radio" ? "radio" : yd(a.map(({ command: s }) => s))
    };
  });
  return /* @__PURE__ */ i(Fn, {
    onClose: e.close,
    align: t,
    children: /* @__PURE__ */ i("div", {
      className: "min-w-56 p-1",
      children: o.map(({ section: r, rows: a, choice: s }, l) => /* @__PURE__ */ i(Sd, {
        first: l === 0,
        title: r.labelKey ? n(r.labelKey) : void 0,
        children: a.map(({ row: d, command: c }) => d.kind === "submenu" ? /* @__PURE__ */ i(kd, {
          command: c,
          menuId: d.menu,
          onRun: e.close
        }, d.command) : /* @__PURE__ */ i(Bn, {
          command: c,
          choice: s,
          onSelect: () => {
            e.execute(d.command), e.close();
          }
        }, d.command))
      }, l))
    })
  });
}
const Es = "flex h-8 w-auto min-w-8 cursor-pointer items-center justify-center rounded-md p-[5px] transition-colors", B0 = "hover:bg-hover hover:ring hover:ring-accent", K0 = "border-none bg-selected text-accent shadow ring ring-accent", j0 = "cursor-not-allowed opacity-50 hover:bg-transparent hover:ring-0", H0 = "bg-accent text-on-accent hover:bg-accent-hover", U0 = "border-none bg-accent-active text-on-accent shadow", G0 = "cursor-not-allowed opacity-50 hover:bg-accent";
function De(e, t = !0, n) {
  return n === "primary" ? `${Es} ${e ? U0 : H0} ${t ? "" : G0}` : `${Es} ${e ? K0 : B0} ${t ? "" : j0}`;
}
const Me = (e, t) => [
  "toolbar-button",
  t === "primary" ? "toolbar-button-primary" : null,
  e ? "toolbar-button-active" : null
].filter(Boolean).join(" "), Zo = (e) => `toolbar toolbar-${e}`, Md = (e) => e ? "mode-tab mode-tab-active" : "mode-tab", W0 = "flex h-8 w-auto min-w-8 cursor-pointer items-center justify-center rounded-none border-b-2 px-2 py-1 text-sm transition-colors hover:bg-transparent hover:border-b-fg-muted", V0 = "border-b-accent text-accent hover:border-b-accent", q0 = "border-b-transparent", Od = (e, t = !0) => `${W0} ${e ? V0 : q0} ${t ? "" : "cursor-not-allowed opacity-50"}`;
function Gt(e, t = !1) {
  const [n] = e.shortcuts;
  return {
    label: e.label,
    shortcut: n === void 0 ? null : Sc(n),
    reason: e.enabled ? null : e.disabledReason ?? null,
    labelShown: t
  };
}
function Jo({ cmd: e, variant: t, run: n, emphasis: o }) {
  const r = t === "label", a = we(Gt(e, r || t === "icon+label" || !e.icon)), s = (l) => /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...a.trigger,
    type: "button",
    onClick: n,
    disabled: !e.enabled,
    "aria-pressed": e.pressable ? l : void 0,
    "aria-haspopup": e.menu ? "menu" : void 0,
    "aria-expanded": e.menu ? l : void 0,
    "aria-label": e.label,
    part: r ? Md(l) : Me(l, o),
    className: r ? Od(l, e.enabled) : `${De(l, e.enabled, o)} ${o === "primary" && t === "icon+label" ? "px-2.5" : ""}`,
    children: r ? /* @__PURE__ */ i("span", {
      className: "whitespace-nowrap px-1",
      children: e.label
    }) : t === "icon+label" ? /* @__PURE__ */ i("span", {
      className: "flex items-center whitespace-nowrap text-sm",
      children: [e.icon && /* @__PURE__ */ i(Y, {
        name: e.icon,
        size: 20,
        accent: e.iconAccent,
        className: `me-1.5 shrink-0 ${Zt(e.icon)}`
      }), /* @__PURE__ */ i("span", { children: e.label })]
    }) : e.icon ? /* @__PURE__ */ i(Y, {
      name: e.icon,
      size: 20,
      accent: e.iconAccent,
      className: Zt(e.icon)
    }) : /* @__PURE__ */ i("span", {
      className: "text-sm",
      children: e.label
    })
  }), a.element] });
  return e.menu ? /* @__PURE__ */ i(Yo, {
    menuId: e.menu,
    children: s
  }) : s(e.active);
}
const kr = {
  [wl]: "",
  className: "contents"
};
function Y0() {
  const e = Q(), t = ke(), n = Ce("zoom:in"), o = Ce("zoom:out"), r = Ce("menu:zoom"), a = we(Gt(n)), s = we(Gt(o)), l = we(Gt(r)), d = ee(H), c = ee(ct), p = ae(ct, (h) => h.getZoomLevel(), 1), f = Math.round((p ?? 1) * 100), [u, m] = C(String(f));
  E(() => m(String(f)), [f]);
  const g = (h) => {
    h.preventDefault();
    const b = parseFloat(u);
    !isNaN(b) && b > 0 && c?.zoomTo({ level: b / 100 });
  };
  return /* @__PURE__ */ i(Yo, {
    menuId: "zoom",
    className: "relative block",
    children: (h) => /* @__PURE__ */ i("div", {
      className: "bg-hover flex items-center rounded",
      children: [
        /* @__PURE__ */ i("form", {
          onSubmit: g,
          className: "flex min-w-0 flex-nowrap items-center overflow-hidden whitespace-nowrap",
          children: [/* @__PURE__ */ i("input", {
            name: "zoom",
            type: "text",
            inputMode: "numeric",
            pattern: "\\d*",
            "aria-label": e("commands.zoom.level"),
            className: "h-6 w-8 min-w-0 shrink border-0 bg-transparent p-0 text-end text-sm outline-none focus:outline-none",
            value: u,
            onChange: (b) => m(b.target.value.replace(/[^0-9]/g, "")),
            onBlur: () => {
              (!u || parseFloat(u) <= 0) && m(String(f));
            }
          }), /* @__PURE__ */ i("span", {
            className: "shrink-0 text-sm",
            children: "%"
          })]
        }),
        /* @__PURE__ */ i("span", {
          ...kr,
          children: [/* @__PURE__ */ i("button", {
            ...l.trigger,
            type: "button",
            "aria-haspopup": "menu",
            "aria-expanded": h,
            "aria-label": r.label,
            part: Me(!1),
            className: De(!1),
            onClick: () => d?.toggleMenu("zoom"),
            children: /* @__PURE__ */ i(Y, {
              name: "chevronDown",
              size: 20
            })
          }), l.element]
        }),
        /* @__PURE__ */ i("span", {
          ...kr,
          children: [/* @__PURE__ */ i("button", {
            ...s.trigger,
            type: "button",
            "aria-label": o.label,
            disabled: !o.enabled,
            part: Me(!1),
            className: De(!1, o.enabled),
            onClick: () => t.execute("zoom:out"),
            children: /* @__PURE__ */ i(Y, {
              name: "zoomOut",
              size: 20
            })
          }), s.element]
        }),
        /* @__PURE__ */ i("span", {
          ...kr,
          children: [/* @__PURE__ */ i("button", {
            ...a.trigger,
            type: "button",
            "aria-label": n.label,
            disabled: !n.enabled,
            part: Me(!1),
            className: De(!1, n.enabled),
            onClick: () => t.execute("zoom:in"),
            children: /* @__PURE__ */ i(Y, {
              name: "zoomIn",
              size: 20
            })
          }), a.element]
        })
      ]
    })
  });
}
function X0() {
  const e = ee(H), t = Ce("menu:zoom"), n = we(Gt(t));
  return /* @__PURE__ */ i(Yo, {
    menuId: "zoom",
    children: (o) => /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
      ...n.trigger,
      type: "button",
      "aria-label": t.label,
      "aria-haspopup": "menu",
      "aria-expanded": o,
      part: Me(o),
      className: De(o),
      onClick: () => e?.toggleMenu("zoom"),
      children: /* @__PURE__ */ i(Y, {
        name: "zoomIn",
        size: 20
      })
    }), n.element] })
  });
}
function Z0({ view: e }) {
  const [t, n] = C(!1), o = e.commands.some((r) => r.active);
  return /* @__PURE__ */ i("span", {
    className: "relative inline-flex",
    children: [/* @__PURE__ */ i("button", {
      type: "button",
      onClick: () => n((r) => !r),
      "aria-haspopup": "menu",
      "aria-expanded": t,
      part: e.id === "modes" ? Md(o) : Me(t),
      className: Od(o),
      children: /* @__PURE__ */ i(Y, {
        name: "chevronDown",
        size: 18
      })
    }), /* @__PURE__ */ i(Xo, { view: Tn(e, t, () => n(!1)) })]
  });
}
function J0({ view: e }) {
  const [t, n] = C(!1), o = e.commands.find((a) => a.active) ?? e.commands[0], r = !!(o?.active && o.id !== cl);
  return /* @__PURE__ */ i("div", {
    style: { width: 100 },
    className: "relative",
    children: [/* @__PURE__ */ i("button", {
      type: "button",
      onClick: () => n((a) => !a),
      "aria-haspopup": "menu",
      "aria-expanded": t,
      part: Me(t),
      className: "bg-surface hover:bg-hover flex w-full cursor-pointer appearance-none items-center rounded-md py-1.5 pe-2 ps-3 text-[13px] transition-colors",
      children: [/* @__PURE__ */ i("span", {
        className: `min-w-0 flex-1 truncate text-start ${r ? "text-accent" : "text-fg"}`,
        children: o?.label
      }), /* @__PURE__ */ i(Y, {
        name: "chevronDown",
        size: 16,
        className: r ? "text-accent" : "text-fg-secondary"
      })]
    }), /* @__PURE__ */ i(Xo, { view: Tn(e, t, () => n(!1)) })]
  });
}
function Q0({ view: e }) {
  const t = Q(), [n, o] = C(!1), r = e.commands.find((l) => l.active) ?? e.commands[0], a = e.labelKey ? t(e.labelKey) : r?.label, s = we(a ? {
    label: a,
    labelShown: !r?.icon
  } : null);
  return /* @__PURE__ */ i("span", {
    className: "relative inline-flex",
    children: [
      /* @__PURE__ */ i("button", {
        ...s.trigger,
        type: "button",
        onClick: () => o((l) => !l),
        "aria-haspopup": "menu",
        "aria-expanded": n,
        "aria-label": a,
        part: Me(n),
        className: De(n),
        children: [r?.icon ? /* @__PURE__ */ i(Y, {
          name: r.icon,
          size: 20,
          accent: r.iconAccent,
          className: Zt(r.icon)
        }) : /* @__PURE__ */ i("span", {
          className: "whitespace-nowrap px-1 text-sm",
          children: a
        }), /* @__PURE__ */ i(Y, {
          name: "chevronDown",
          size: 14,
          className: "text-fg-secondary"
        })]
      }),
      s.element,
      /* @__PURE__ */ i(Xo, { view: Tn(e, n, () => o(!1)) })
    ]
  });
}
function e1({ view: e }) {
  return /* @__PURE__ */ i(Xo, {
    view: e,
    align: "end"
  });
}
function t1({ isOpen: e, toggle: t }) {
  const n = Q()("demo.more"), o = we({ label: n });
  return /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...o.trigger,
    type: "button",
    onClick: t,
    "aria-haspopup": "menu",
    "aria-expanded": e,
    "aria-label": n,
    part: Me(e),
    className: De(e),
    children: /* @__PURE__ */ i(Y, {
      name: "dots",
      size: 20
    })
  }), o.element] });
}
const Pd = (e) => [
  ...e.sections.start ?? [],
  ...e.sections.center ?? [],
  ...e.sections.end ?? []
].flatMap((t) => t.items);
function n1(e) {
  return Pd(e).filter((t) => typeof t == "object" && "slot" in t);
}
function Td(e) {
  return new Set(Pd(e).flatMap((t) => typeof t == "object" && "command" in t && t.emphasis === "primary" ? [t.command] : []));
}
function o1({ commandId: e }) {
  const t = Ce(e);
  return t.visible ? /* @__PURE__ */ i(Jo, {
    cmd: t,
    variant: "icon",
    run: () => void t.run()
  }) : null;
}
function Ha({ bar: e, orientation: t = "horizontal", gap: n = 8, className: o }) {
  const r = t === "vertical", a = j(() => Td(e), [e]), s = {
    "measurement-scale": () => /* @__PURE__ */ i(s0, {}),
    zoom: (l) => l === "button" || r ? /* @__PURE__ */ i(X0, {}) : /* @__PURE__ */ i(Y0, {}),
    "quick-stamps": () => /* @__PURE__ */ i(h0, {}),
    "page-number": () => /* @__PURE__ */ i(m0, {}),
    "view-only": (l) => /* @__PURE__ */ i(y0, { compact: l === "icon" || r }),
    "outline-filter": (l) => /* @__PURE__ */ i(u0, { variant: l }),
    "attachments-count": () => /* @__PURE__ */ i(l0, {})
  };
  return /* @__PURE__ */ i(Zv, {
    bar: e,
    orientation: t,
    gap: n,
    separatorWidth: 1,
    className: o,
    renderCommand: (l, d, c) => /* @__PURE__ */ i(Jo, {
      cmd: l,
      variant: d,
      run: c,
      emphasis: a.has(l.id) ? "primary" : void 0
    }),
    renderCustom: {
      ...Object.fromEntries(n1(e).filter((l) => !Object.prototype.hasOwnProperty.call(s, l.slot)).map((l) => [l.slot, (d, c) => c.layer === "measure" ? null : /* @__PURE__ */ i(P0, {
        id: l.slot,
        variant: l.variants ? d : null,
        orientation: t,
        grow: l.grow === !0,
        measure: c.measure,
        children: l.terminal ? /* @__PURE__ */ i(o1, { commandId: l.terminal }) : null
      })])),
      ...s
    },
    renderCollapsed: (l) => l.id === "modes" ? /* @__PURE__ */ i(J0, { view: l }) : l.collapse === "menu" ? /* @__PURE__ */ i(Q0, { view: l }) : void 0,
    renderGroupTrigger: (l) => /* @__PURE__ */ i(Z0, { view: l }),
    renderSeparator: () => /* @__PURE__ */ i("span", { className: `bg-border self-center ${r ? "h-px w-6" : "h-6 w-px"}` }),
    renderOverflowTrigger: (l, d) => /* @__PURE__ */ i(t1, {
      isOpen: l,
      toggle: d
    }),
    renderOverflowMenu: (l) => /* @__PURE__ */ i(e1, { view: l })
  });
}
const r1 = [
  "accent",
  "background",
  "surface",
  "surface-raised",
  "text",
  "text-muted",
  "border",
  "hover",
  "canvas",
  "page-background",
  "page-shadow",
  "tooltip",
  "tooltip-text",
  "radius",
  "font"
], Cd = (e) => typeof e == "string" ? { preference: e } : e ?? {}, a1 = (e) => r1.includes(e);
function i1(e) {
  return Object.entries(e).filter(([t, n]) => n === void 0 ? !1 : a1(t) ? typeof n != "string" || /[{};]/.test(n) ? (console.warn(`[embedpdf] theme: ignoring the invalid value of "${t}"`), !1) : !0 : (console.warn(`[embedpdf] theme: "${t}" isn't a token, ignored`), !1)).map(([t, n]) => `--epdf-${t}:var(--embedpdf-host-${t},${n});`).join("");
}
function Sr(e, t) {
  const n = t ? i1(t) : "";
  return n ? `${e}{${n}}` : "";
}
function s1(e, t) {
  const { accent: n, tokens: o, light: r, dark: a } = Cd(e);
  return Sr(t, {
    ...n === void 0 ? null : { accent: n },
    ...o
  }) + Sr(`${t}:not(.dark)`, r) + Sr(`${t}.dark`, a);
}
const Ed = be(null), Ad = "(prefers-color-scheme: dark)", l1 = () => typeof window < "u" && window.matchMedia?.(Ad).matches ? "dark" : "light";
function c1({ children: e, preference: t = "system", target: n }) {
  const [o, r] = C(l1);
  E(() => {
    if (t !== "system" || typeof window > "u" || !window.matchMedia) return;
    const l = window.matchMedia(Ad), d = () => r(l.matches ? "dark" : "light");
    return d(), l.addEventListener("change", d), () => l.removeEventListener("change", d);
  }, [t]);
  const a = t === "system" ? o : t;
  R(() => {
    (n ?? document.documentElement).classList.toggle("dark", a === "dark");
  }, [a, n]);
  const s = j(() => ({ mode: a }), [a]);
  return /* @__PURE__ */ i(Ed.Provider, {
    value: s,
    children: e
  });
}
function ax() {
  const e = X(Ed);
  if (!e) throw new Error("useTheme must be used within <ThemeProvider>");
  return e;
}
function Ua({ labelledBy: e, onClose: t, className: n, children: o }) {
  const r = k(null), a = k(null), s = k(t);
  return s.current = t, R(() => {
    const l = r.current, d = a.current;
    if (!l || !d) return;
    const c = Wc(l), p = Vo(d, { onEscape: () => s.current() });
    return () => {
      p.release(), c();
    };
  }, []), /* @__PURE__ */ i("div", {
    ref: r,
    ...La,
    "data-epdf-layer": "",
    className: `${Gc} place-items-center p-4 open:grid`,
    style: {
      position: "fixed",
      inset: "auto",
      maxWidth: "none",
      maxHeight: "none"
    },
    children: [/* @__PURE__ */ i("div", {
      "aria-hidden": "true",
      className: `absolute inset-0 ${Ra}`
    }), /* @__PURE__ */ i("div", {
      ref: a,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": e,
      className: `relative max-h-full max-w-full overflow-y-auto ${n}`,
      children: o
    })]
  });
}
function Nd(e) {
  let t = null;
  return () => {
    if (!t) {
      const n = e();
      n.catch(() => {
        t === n && (t = null);
      }), t = n;
    }
    return t;
  };
}
const d1 = cm.map((e) => ({
  key: e.key,
  label: e.label,
  bytes: Nd(() => dm(e.key))
})), u1 = (e) => async () => {
  if (e.data) return new Uint8Array(e.data);
  if (!e.url) throw new Error(`[embedpdf] signature font "${e.key}" has no url or data`);
  const t = await fetch(e.url);
  if (!t.ok) throw new Error(`${e.url}: HTTP ${t.status}`);
  return new Uint8Array(await t.arrayBuffer());
}, As = /* @__PURE__ */ new WeakMap();
function p1(e) {
  if (!e) return d1;
  let t = As.get(e);
  return t || (t = e.map((n) => ({
    key: n.key,
    label: n.label,
    bytes: Nd(u1(n))
  })), As.set(e, t)), t;
}
const f1 = (e) => p1(e).map((t) => ({
  key: t.key,
  load: t.bytes
})), Mr = /* @__PURE__ */ new WeakMap();
function ix(e) {
  let t = Mr.get(e);
  return t || (t = (async () => {
    if (!globalThis.crypto?.subtle) return null;
    const n = await e.bytes(), o = new Uint8Array(await crypto.subtle.digest("SHA-256", n)), r = Array.from(o, (a) => a.toString(16).padStart(2, "0")).join("");
    return {
      hash: r,
      family: lm(r),
      weight: 400,
      style: "normal",
      load: async () => n
    };
  })(), Mr.set(e, t), t.catch(() => Mr.delete(e))), t;
}
function m1(e) {
  const t = ee(Ml), n = ee(xl), o = k(e);
  o.current = e, E(() => {
    if (!t) return;
    const r = sf({
      overrides: () => o.current,
      goToPage: (a) => n?.goToPage(a)
    });
    return t.setUiAdapter(r);
  }, [t, n]);
}
function h1({ onHitClick: e }) {
  const t = ze(), n = w1(t.ref), o = g1((u) => u.activeHit), r = b1((u) => u.highlight), [a] = C(cf);
  if (n.length === 0) return null;
  const s = We("search-highlight", r.color), l = We("search-highlight-active", r.activeColor), d = We(
    "search-blend-mode",
    r.blendMode
  ), c = e ? { pointerEvents: "auto", cursor: "pointer" } : null, p = (u) => e && {
    onPointerDown: (m) => a.press(m),
    onClick: (m) => {
      a.isClick(m) && e(u);
    }
  }, f = lf(n, {
    active: o,
    page: t.transform,
    color: s,
    activeColor: l
  });
  return /* @__PURE__ */ i("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: f.map(
    (u) => u.box ? /* @__PURE__ */ i(
      "div",
      {
        ...p(u.hit),
        style: {
          position: "absolute",
          left: u.box.left,
          top: u.box.top,
          width: u.box.width,
          height: u.box.height,
          backgroundColor: u.fill,
          mixBlendMode: d,
          borderRadius: 2,
          ...c
        }
      },
      u.key
    ) : /* @__PURE__ */ i(
      "svg",
      {
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          mixBlendMode: d
        },
        children: /* @__PURE__ */ i(
          "polygon",
          {
            points: u.points ?? void 0,
            ...p(u.hit),
            style: { fill: u.fill, ...c }
          }
        )
      },
      u.key
    )
  ) });
}
function sx() {
  return U(on);
}
const g1 = Ae(wm), b1 = an(on), v1 = Object.freeze([]);
function w1(e) {
  const t = Ze();
  return le(
    (n) => n.tryCapability(on, t ?? void 0)?.listHits(e === void 0 ? void 0 : { page: e }) ?? v1
  );
}
const _n = gf("stage-thumbs"), Ga = {
  stage: ct,
  thumbnails: _n,
  render: en,
  link: bo,
  selection: Nn,
  search: on,
  annotation: ye,
  stamp: Oe,
  measurement: _t,
  redaction: ht,
  form: tn,
  signature: nn,
  pageEdit: Ko,
  metadata: km,
  fonts: _m,
  outline: Fo,
  attachment: Bo,
  actions: Ml,
  documents: Pe,
  interaction: An,
  commands: $e,
  shell: H,
  i18n: $o
}, y1 = Symbol.for("@embedpdf/viewer/kernel"), _1 = "this viewer is gone: it was unmounted, or mounted again with a new config. Use the viewer the new onReady gives you.", x1 = /^(?:on|register)(?:[A-Z]|$)/, k1 = (e) => {
  if (typeof e != "object" || e === null) return !1;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
};
function S1(e, t) {
  let n = !1;
  const o = /* @__PURE__ */ new Set(), r = (h) => new go("instance-closed", h, _1), a = (h) => {
    const b = () => {
      o.delete(b), h();
    };
    return o.add(b), b;
  }, s = /* @__PURE__ */ new WeakMap(), l = (h, b) => {
    const y = s.get(h);
    if (y) return y;
    const v = /* @__PURE__ */ new Map(), _ = (x, O) => x1.test(x) ? (...M) => {
      if (n) return () => {
      };
      const T = O.apply(h, M);
      return typeof T == "function" ? a(T) : T;
    } : vf(x) ? (...M) => {
      if (n) throw r(b);
      return O.apply(h, M);
    } : (...M) => n ? Promise.reject(r(b)) : O.apply(h, M), P = (x) => {
      const O = Reflect.get(h, x, h);
      if (typeof x == "symbol") return O;
      if (k1(O)) return l(O, b);
      if (typeof O != "function") return O;
      const M = v.get(x);
      if (M?.value === O) return M.member;
      const T = _(x, O);
      return v.set(x, {
        value: O,
        member: T
      }), T;
    }, S = new Proxy({}, {
      get: (x, O) => P(O),
      has: (x, O) => Reflect.has(h, O),
      ownKeys: () => Reflect.ownKeys(h),
      getOwnPropertyDescriptor: (x, O) => {
        const M = Reflect.getOwnPropertyDescriptor(h, O);
        return M && {
          configurable: !0,
          enumerable: M.enumerable,
          value: P(O)
        };
      }
    });
    return s.set(h, S), S;
  }, d = (h) => Object.prototype.hasOwnProperty.call(t, h) ? t[h] ?? null : null, c = (h) => {
    if (typeof h != "string") return h;
    const b = d(h);
    if (!b) throw new Error(`[embedpdf] the viewer has no plugin named "${h}". Its plugins: ${Object.keys(t).join(", ")}.`);
    return b;
  }, p = (h, b) => {
    try {
      return e.capability(h, b);
    } catch (y) {
      if (hi(y) || e.scopeOf(h) !== "document") throw y;
      const v = y instanceof Error ? y.message : String(y);
      throw new go("not-ready", h.name, v, { cause: y });
    }
  }, f = (h) => {
    function b(v) {
      const _ = c(v);
      if (n) throw r(_.name);
      return l(p(_, h), _.name);
    }
    function y(v) {
      const _ = typeof v == "string" ? d(v) : v, P = _ && !n ? e.tryCapability(_, h) : null;
      return P === null ? null : l(P, _.name);
    }
    return {
      get: b,
      tryGet: y
    };
  }, u = (h, b, y = {}) => {
    if (n) return () => {
    };
    const { immediate: v = !1, isEqual: _ = Object.is } = y, P = b;
    let S = null;
    const x = () => {
      let O;
      try {
        O = h();
      } catch (T) {
        if (hi(T, "not-ready")) return;
        throw T;
      }
      if (S === null) {
        S = { value: O }, v && P(O, void 0);
        return;
      }
      if (_(S.value, O)) return;
      const M = S.value;
      S = { value: O }, P(O, M);
    };
    return x(), a(e.subscribe(x));
  }, m = {
    ...f(void 0),
    documents: l(e.documents, Pe.name),
    commands: l(e.capability($e), $e.name),
    forDocument: f,
    watch: u
  };
  return Object.defineProperty(m, y1, { value: e }), {
    viewer: m,
    destroy: () => {
      if (!n) {
        n = !0;
        for (const h of [...o]) h();
      }
    }
  };
}
function M1(e) {
  let t = null;
  return {
    attach: (n) => (t?.kernel !== n && (t?.lifetime.destroy(), t = {
      kernel: n,
      lifetime: S1(n, e)
    }), t.lifetime.viewer),
    current: () => t?.lifetime.viewer ?? null,
    release: (n) => {
      t?.kernel === n && (t.lifetime.destroy(), t = null);
    }
  };
}
const O1 = [
  "standard",
  "quick",
  "sidebar"
], P1 = [
  "kinds",
  "fonts",
  "libraries"
], T1 = /* @__PURE__ */ new Set([
  "link",
  "pageEdit",
  "metadata",
  "fonts",
  "outline",
  "attachment",
  "documents",
  "shell"
]), C1 = (e) => Object.prototype.hasOwnProperty.call(Ga, e), Ld = (e) => typeof e == "object" && e !== null;
function Ns(e) {
  if (!Ld(e)) return !1;
  const { id: t, create: n } = e;
  return typeof t == "string" && typeof n == "function";
}
function E1(e) {
  const t = {}, n = [], o = [];
  for (const [r, a] of Object.entries(e ?? {}))
    a !== void 0 && (C1(r) ? Ns(a) ? o.push(`"${r}" is the viewer's own ${r} plugin: give it settings, or give your plugin a name of its own`) : T1.has(r) ? o.push(`the ${r} plugin takes no settings`) : !Ld(a) || Array.isArray(a) ? o.push(`the ${r} plugin's settings are an object`) : t[r] = a : Ns(a) ? n.push({
      name: r,
      plugin: a
    }) : o.push(`"${r}" is not one of the viewer's plugins, and not a plugin definition` + Nu(r, Object.keys(Ga))));
  return t.i18n && (t.i18n = A1(t.i18n, o)), {
    settings: t,
    viewer: {
      stamp: Ls(t, "stamp", O1),
      signature: Ls(t, "signature", P1)
    },
    own: n,
    problems: o
  };
}
function A1(e, t) {
  const { fallbackLocale: n, ...o } = e;
  for (const r of Object.keys(o)) t.push(r === "locale" ? "the i18n plugin's locale is the viewer's `locale`" : `the i18n plugin's ${r} are the viewer's \`strings\`: give your words there`);
  return n === void 0 ? {} : { fallbackLocale: n };
}
function Ls(e, t, n) {
  const o = e[t];
  if (!o) return {};
  const r = {}, a = { ...o };
  for (const s of n)
    a[s] !== void 0 && (r[s] = a[s]), delete a[s];
  return e[t] = a, r;
}
function Is(e, t) {
  return bf(e, t);
}
function N1(e) {
  return e.screen ? "screen" : e.topLevel && e.popover ? "window" : null;
}
function Id(e) {
  const t = e.ownerDocument, n = t.defaultView;
  return {
    screen: t.fullscreenEnabled === !0 && typeof e.requestFullscreen == "function",
    topLevel: n !== null && n.top === n,
    popover: typeof e.showPopover == "function"
  };
}
const Rd = (e) => e.closest("[data-embedpdf-root]") ?? e, Wa = "data-epdf-fills-window";
function Wt(e) {
  if (e.hasAttribute(Wa)) return "window";
  const t = e.getRootNode().host ?? null;
  return jr(e) || t !== null && jr(t) ? "screen" : null;
}
async function L1(e) {
  if (Wt(e) !== null) return;
  const t = Id(e);
  if (t.screen) try {
    await e.requestFullscreen({ navigationUI: "hide" });
    return;
  } catch {
  }
  t.topLevel && t.popover && R1(e);
}
async function I1(e) {
  const t = Wt(e);
  t === "window" ? Gr(e) : t === "screen" && await e.ownerDocument.exitFullscreen();
}
function R1(e) {
  e.setAttribute(Wa, ""), e.setAttribute("popover", "manual"), e.showPopover();
}
function Gr(e) {
  e.matches(":popover-open") && e.hidePopover(), e.removeAttribute("popover"), e.removeAttribute(Wa);
}
const D1 = {
  way: null,
  current: null
};
function $1(e) {
  const [t, n] = C(D1);
  return R(() => {
    const o = e.current;
    if (!o) return;
    const r = Rd(o), a = N1(Id(r)), s = () => {
      const c = Wt(r);
      n((p) => p.way === a && p.current === c ? p : {
        way: a,
        current: c
      });
    }, l = (c) => {
      c.key !== "Escape" || c.defaultPrevented || df(c) || Wt(r) === "window" && (c.preventDefault(), Gr(r));
    }, d = r.ownerDocument;
    return s(), d.addEventListener("fullscreenchange", s), r.addEventListener("toggle", s), r.addEventListener("keydown", l), () => {
      d.removeEventListener("fullscreenchange", s), r.removeEventListener("toggle", s), r.removeEventListener("keydown", l), Wt(r) === "window" && Gr(r);
    };
  }, [e]), t;
}
const z1 = "view:fullscreen";
function F1(e, t, n) {
  const o = t.current !== null, r = o || t.way === "screen" || t.way === "window" && !n;
  return {
    id: z1,
    labelKey: "commands.fullscreen",
    icon: o ? "fullscreenExit" : "fullscreen",
    visible: () => r,
    active: () => o,
    run: () => Wt(e) === null ? L1(e) : I1(e)
  };
}
const Va = (e) => typeof e == "object" && e !== null, B1 = (e) => e.side === "start" ? "start" : "end";
function K1(e, t) {
  return Object.entries(e.panels ?? {}).filter(([, n]) => Va(n) && B1(n) === t).map(([n]) => n);
}
function j1(e, t, n) {
  const o = t.ids.filter((a) => t.shown.includes(a) && Va(e[a])), r = o.filter((a) => e[a].open === !0 && !n.has(a));
  return t.current !== null ? {
    open: null,
    started: r
  } : {
    open: o.find((a) => t.docks(a) && (e[a].closable === !1 || r.includes(a))) ?? null,
    started: r
  };
}
const Rs = (e, t, n, o) => t > 0 || n && !(e.tryGet($e)?.isCategoryDisabled(o) ?? !1), qa = "search", Dd = {
  categories: ["search"],
  allowed: (e) => e.tryGet(on)?.canSearch() ?? !0,
  notAllowedKey: "commands.notAllowed.doc-text-search"
}, Ds = {
  id: "search:find",
  labelKey: "commands.find",
  icon: "search",
  shortcut: "Mod+F",
  shortcutInTextFields: !0,
  ...Dd,
  run: (e) => e.tryGet(H)?.open(qa, { focus: !0 })
}, H1 = /* @__PURE__ */ new Map([
  ["thumbnails", {
    titleKey: "panels.thumbnails",
    icon: "sidebar",
    categories: ["thumbnails"],
    allowed: (e) => e.tryGet(en)?.canRenderThumbnail() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-render-thumbnail"
  }],
  ["outline", {
    titleKey: "panels.outline",
    icon: "listTree",
    categories: ["outline"],
    visible: (e) => {
      const t = e.tryGet(Fo);
      return t != null && Rs(e, t.list().length, t.canEdit(), "outline.editing");
    }
  }],
  ["attachments", {
    titleKey: "panels.attachments",
    icon: "paperclip",
    categories: ["attachments"],
    visible: (e) => {
      const t = e.tryGet(Bo);
      return t != null && Rs(e, t.list().length, t.canCreate(), "attachments.adding");
    }
  }],
  [qa, {
    titleKey: "panels.search",
    icon: "search",
    ...Dd,
    focus: !0
  }],
  ["comments", {
    titleKey: "panels.comments",
    icon: "comment",
    categories: ["comments"],
    allowed: (e) => e.tryGet(ye)?.canRead() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-annotate-read"
  }],
  ["style", {
    titleKey: "panels.style",
    icon: "palette",
    categories: ["annotations"]
  }],
  ["stamps", {
    titleKey: "panels.stamps",
    icon: "rubberStamp",
    categories: ["stamps"],
    allowed: (e) => e.tryGet(Oe)?.canPlace(e.documentId ?? void 0) ?? !0,
    notAllowedKey: "commands.notAllowed.annotations-create",
    visible: (e) => e.tryGet(Oe) != null
  }],
  ["signatures", {
    titleKey: "panels.signatures",
    icon: "signature",
    categories: ["signatures"],
    visible: (e) => e.tryGet(Oe) != null && e.tryGet(nn) != null
  }],
  ["redaction", {
    titleKey: "panels.redaction",
    icon: "redactionSidebar",
    categories: ["redaction"],
    allowed: (e) => {
      const t = e.tryGet(ht);
      return t ? t.canMark() || t.canApply() : !0;
    }
  }],
  ["measurement", {
    titleKey: "panels.measurement",
    icon: "updateScale",
    categories: ["measurement"],
    allowed: (e) => {
      const t = e.tryGet(_t), n = e.tryGet(ye);
      return t ? t.canCalibrate() || (n?.canCreate() ?? !0) : !0;
    }
  }],
  ["form-design", {
    titleKey: "panels.formDesign",
    icon: "formDesign",
    categories: ["forms.building"],
    allowed: (e) => e.tryGet(tn)?.canDesign() ?? !0,
    visible: (e) => e.tryGet(H)?.isOpen("mode:form") ?? !1
  }]
]), U1 = (e, t, n) => n ? { panel: t ? {
  id: e,
  focus: t
} : e } : {
  run: (o) => o.tryGet(H)?.open(e, t ? { focus: t } : void 0),
  active: (o) => o.tryGet(H)?.isOpen(e) ?? !1
};
function G1(e, t) {
  return Object.entries(e ?? {}).flatMap(([n, o]) => {
    const r = It(n);
    if (!Va(o)) return [];
    const a = n === qa && !t(Ds.id) ? [Ds] : [];
    if (t(r)) return a;
    const s = H1.get(n), { focus: l, titleKey: d, icon: c, ...p } = s ?? {}, f = o.titleKey ?? (o.title === void 0 ? s?.titleKey : void 0);
    return [{
      id: r,
      label: o.title ?? (f === void 0 ? n : void 0),
      labelKey: f,
      icon: o.icon ?? s?.icon,
      ...U1(n, l, o.closable !== !1),
      ...p
    }, ...a];
  });
}
const W1 = (e, t) => e === t || JSON.stringify(e ?? {}) === JSON.stringify(t ?? {}), V1 = 2e3;
function q1(e, t) {
  const { start: n = [], center: o = [], end: r = [] } = e.sections;
  return [
    ...n,
    ...o,
    ...r
  ].some((a) => a.items.some((s) => typeof s == "object" && "slot" in s && s.slot === t));
}
function Y1(e, t) {
  return t === null ? !1 : e ?? q1(t, "page-number");
}
function X1(e, t) {
  const n = ee(ct), [o, r] = C(!1);
  return E(() => {
    const a = t.current;
    if (!e || !a) return;
    let s = !1, l;
    const d = () => {
      const b = kn(a.ownerDocument);
      return s || b !== null && a.contains(b) && b.matches(":focus-visible") || a.querySelector('[aria-expanded="true"]') !== null;
    }, c = () => {
      r(!1), clearTimeout(l), l = setTimeout(p, V1);
    };
    function p() {
      d() ? c() : r(!0);
    }
    const f = () => {
      s = !0, c();
    }, u = () => {
      s = !1, c();
    }, m = a.closest("[data-float]")?.offsetParent ?? null, g = {
      capture: !0,
      passive: !0
    };
    m?.addEventListener("pointermove", c, g), m?.addEventListener("pointerdown", c, g), a.addEventListener("pointerenter", f), a.addEventListener("pointerleave", u), a.addEventListener("focusin", c);
    const h = n?.onCameraChanged(c);
    return c(), () => {
      h?.(), m?.removeEventListener("pointermove", c, g), m?.removeEventListener("pointerdown", c, g), a.removeEventListener("pointerenter", f), a.removeEventListener("pointerleave", u), a.removeEventListener("focusin", c), clearTimeout(l), r(!1);
    };
  }, [
    e,
    n,
    t
  ]), o;
}
function Z1(e) {
  const [t, n] = C(pv);
  return R(() => {
    const o = e.current;
    if (!o) return;
    const r = () => {
      const l = jc(o.getBoundingClientRect(), Uc(o));
      n((d) => fv(d, l) ? d : l);
    };
    r();
    const a = new ResizeObserver(r);
    a.observe(o);
    const s = Do(r);
    return () => {
      s(), a.disconnect();
    };
  }, [e]), t;
}
const $d = "(pointer: coarse)", J1 = () => typeof matchMedia == "function" && matchMedia($d).matches, $s = (e, t) => e.length === t.length && e.every((n, o) => n === t[o]);
function zs(e, t) {
  const n = k(e);
  return n.current !== e && !t(n.current, e) && (n.current = e), n.current;
}
const Fs = [
  "compact",
  "medium",
  "expanded"
];
function Q1(e, t) {
  const n = [], o = (r) => r === void 0 || r === "auto";
  return !o(e) && !Fs.includes(e) && n.push(`size: ${JSON.stringify(e)} is not auto, compact, medium or expanded; the viewer measures its width`), !o(t) && typeof t != "boolean" && n.push(`touch: ${JSON.stringify(t)} is not auto, true or false; the viewer asks the browser`), {
    size: Fs.includes(e) ? e : null,
    touch: typeof t == "boolean" ? t : null,
    problems: n
  };
}
function ew(e, t) {
  const n = xo((p) => p.direction), [o, r] = C(null), [a, s] = C(J1);
  R(() => {
    const p = e.current;
    return p ? fa(p, (f) => r(Math.round(f))) : void 0;
  }, [e]);
  const l = t.touch === null;
  E(() => {
    if (!l || typeof matchMedia != "function") return;
    const p = matchMedia($d), f = () => s(p.matches);
    return p.addEventListener("change", f), () => p.removeEventListener("change", f);
  }, [l]);
  const d = t.size, c = t.touch ?? a;
  return j(() => o === null ? null : {
    size: d ?? xu(o),
    width: o,
    touch: c,
    dir: n
  }, [
    o,
    d,
    c,
    n
  ]);
}
function tw({ className: e, rootRef: t, children: n }) {
  const o = k(null), r = t ?? o, a = Ub(), [s] = C(() => Q1(a.size, a.touch));
  E(() => {
    for (const _ of s.problems) console.warn(`[embedpdf] ${_}`);
  }, [s]);
  const l = ew(r, s), d = l ?? Ea, c = Hb(), p = j(() => vu(c, Ib, d), [c, d]), f = p.toJSON(), u = ke(), m = _e() ?? void 0, g = le(() => ku(f, (_) => u.resolveCommand(_, m), (_) => u.getCommand(_)), $s), h = k(/* @__PURE__ */ new Map()), b = j(() => {
    const _ = (T, L) => {
      const B = JSON.stringify(L), I = h.current.get(T);
      return I?.key === B ? I.value : (h.current.set(T, {
        key: B,
        value: L
      }), L);
    }, P = new Set(g), S = /* @__PURE__ */ new Map();
    for (const T of Object.keys(f.bars ?? {})) S.set(T, _(`bar:${T}`, ll(f, T, { omit: P })));
    const x = (T) => S.get(T) ?? null, O = {
      selection: _("strip:selection", uo(f, "selection", x)),
      annotation: _("strip:annotation", uo(f, "annotation", x)),
      snapshot: _("strip:snapshot", uo(f, "snapshot", x))
    }, M = /* @__PURE__ */ new Map();
    for (const T of Object.keys(f.menus ?? {})) M.set(T, _(`menu:${T}`, sl(f, T)));
    return {
      data: f,
      env: d,
      bar: x,
      strip: (T) => O[T],
      menu: (T) => M.get(T) ?? null
    };
  }, [
    f,
    d,
    g
  ]), y = le(() => il(f).map(mo).filter((_) => !g.includes(_) && u.resolveCommand(_, m)?.visible === !0), $s);
  nw(zs(db(f), ub)), ow(zs(f.panels, W1)), aw(y), iw(l === null ? null : p);
  const v = Z1(r);
  return rw(r, v.top && v.right && v.bottom && v.left), /* @__PURE__ */ i("div", {
    ref: r,
    tabIndex: -1,
    [hv]: "",
    dir: d.dir,
    "data-touch": d.touch ? "" : void 0,
    className: e,
    style: Hc(v),
    children: /* @__PURE__ */ i(Vb, {
      value: b,
      children: n
    })
  });
}
function nw(e) {
  const t = ke(), n = Na();
  R(() => {
    const o = pb(e, (r) => t.hasCommand(r) && !n.isYours(r)).map(n.over);
    return o.length > 0 ? t.registerCommands(o, { replace: !0 }) : void 0;
  }, [
    t,
    e,
    n
  ]);
}
function ow(e) {
  const t = ke(), n = Na();
  R(() => {
    const o = G1(e, (r) => t.hasCommand(r) && !n.isYours(r)).map(n.over);
    return o.length > 0 ? t.registerCommands(o, { replace: !0 }) : void 0;
  }, [
    t,
    e,
    n
  ]);
}
function rw(e, t) {
  const n = ke(), o = Na(), r = $1(e);
  R(() => {
    const a = e.current;
    if (!a) return;
    const s = F1(Rd(a), r, t);
    return n.registerCommands([o.over(s)], { replace: !0 });
  }, [
    n,
    o,
    e,
    r,
    t
  ]);
}
function aw(e) {
  const t = ke(), n = ee(H), o = ae(H, So, null);
  E(() => {
    o === null || e.includes(o) || (n?.close(o), t.execute(cl).catch(() => {
    }));
  }, [
    t,
    n,
    o,
    e
  ]);
}
function iw(e) {
  const t = ke(), n = k(/* @__PURE__ */ new Set());
  E(() => {
    if (e === null) return;
    const o = Su(e, {
      commands: t.listCommandIds(),
      hasCommand: (r) => t.hasCommand(r)
    });
    for (const r of o)
      n.current.has(r) || (n.current.add(r), console.warn(`[embedpdf] layout: ${r}`));
  }, [t, e]);
}
const sw = {
  top: {
    start: "top-start",
    middle: "top",
    end: "top-end"
  },
  sides: {
    start: "start",
    middle: null,
    end: "end"
  },
  bottom: {
    start: "bottom-start",
    middle: "bottom",
    end: "bottom-end"
  }
}, at = {
  insetStart: 0,
  insetEnd: 0,
  offset: 0
}, mt = (e) => e !== null && e.width > 0;
function lw(e, t, n, o) {
  const r = n + t / 2, a = e - o - t / 2;
  if (r > a) return null;
  const s = Math.min(Math.max(e / 2, r), a), l = Math.min(s - n, e - o - s);
  return {
    insetStart: s - l,
    insetEnd: e - s - l,
    offset: 0
  };
}
function cw({ length: e, gap: t, start: n, middle: o, end: r }) {
  const a = mt(n) ? n.width + t : 0, s = mt(r) ? r.width + t : 0, l = mt(o) ? lw(e, o.width, a, s) : null, d = mt(o) && l === null ? o.height + t : 0, c = mt(n) && mt(r) && n.width + t + r.width > e;
  return {
    start: {
      ...at,
      offset: d
    },
    middle: l ?? at,
    end: {
      ...at,
      offset: d + (c ? n.height + t : 0)
    }
  };
}
function dw({ length: e, gap: t, start: n, end: o }) {
  return mt(n) && mt(o) && n.width + t + o.width > e ? {
    start: {
      ...at,
      offset: o.height + t
    },
    middle: at,
    end: {
      ...at,
      offset: n.height + t
    }
  } : {
    start: at,
    middle: at,
    end: at
  };
}
function Ya(e) {
  const t = ke(), n = _e() ?? void 0, o = j(() => e ? ra(e) : null, [e]);
  return le(() => o !== null && Eu(o, (r) => {
    const a = Au(r);
    return a !== null && t.resolveCommand(a, n)?.visible === !0;
  }));
}
function Xa(e) {
  const { data: t } = tt(), n = ae(H, So, null);
  return e.filter((o) => {
    const r = t.bars?.[o]?.mode;
    return r === void 0 || n === mo(r);
  });
}
const uw = {
  top: "border-b",
  bottom: "border-t",
  start: "border-e",
  end: "border-s"
};
function pw({ id: e, edge: t, rides: n }) {
  const o = tt().bar(e), r = Ya(o);
  if (!o || !r) return null;
  const a = t === "start" || t === "end";
  return /* @__PURE__ */ i(zn, {
    value: t,
    children: /* @__PURE__ */ i("div", {
      part: Zo(e),
      "data-bar": e,
      className: `border-border flex shrink-0 ${a ? "flex-col px-2 py-4" : "items-center px-4 py-2"} ${n ? "bg-surface-alt" : "bg-surface"} ${uw[t]}`,
      children: /* @__PURE__ */ i(Ha, {
        bar: o,
        orientation: a ? "vertical" : "horizontal",
        className: a ? "min-h-0 flex-1" : "w-full"
      })
    })
  });
}
function to({ edge: e }) {
  const { data: t } = tt(), n = Xa(j(() => yu(t, e), [t, e]));
  return /* @__PURE__ */ i(D, { children: (e === "top" || e === "start" ? n : [...n].reverse()).map((o) => /* @__PURE__ */ i(pw, {
    id: o,
    edge: e,
    rides: _u(t.bars?.[o]?.place) !== null
  }, o)) });
}
const Bs = {
  "top-start": "start",
  top: "center",
  "top-end": "end",
  start: "start",
  end: "end",
  "bottom-start": "start",
  bottom: "center",
  "bottom-end": "end"
}, fw = [
  "start",
  "center",
  "end"
], mw = (e) => e.startsWith("bottom") ? "float-bottom" : "float-top";
function hw(e, t) {
  const n = [
    ...e.sections.start ?? [],
    ...e.sections.center ?? [],
    ...e.sections.end ?? []
  ];
  return {
    id: e.id,
    sections: { [t]: n }
  };
}
const zd = be(() => {
});
function gw({ id: e, position: t }) {
  const { data: n, bar: o } = tt(), r = o(e), a = Ya(r), s = j(() => r ? hw(r, Bs[t]) : null, [r, t]), l = k(null), d = s !== null && a;
  E(() => d && l.current ? sa(l.current) : void 0, [d]);
  const c = X1(d && Y1(Tu(n, e), r), l), p = X(zd);
  return R(() => {
    let f = null;
    if (l.current?.querySelectorAll(':scope > [role="toolbar"] > div')?.forEach((m, g) => {
      fw[g] === Bs[t] ? (m.setAttribute("part", Zo(e)), f = m) : m.removeAttribute("part");
    }), f === null) return;
    const u = fa(f, (m) => p(e, m));
    return () => {
      u(), p(e, null);
    };
  }, [
    d,
    t,
    e,
    p
  ]), d ? /* @__PURE__ */ i(zn, {
    value: mw(t),
    children: /* @__PURE__ */ i("div", {
      ref: l,
      "data-bar": e,
      "data-idle-hidden": c ? "" : void 0,
      className: "flex w-full",
      children: /* @__PURE__ */ i(Ha, {
        bar: s,
        className: "float-pill:pointer-events-auto float-pill:rounded-lg float-pill:border float-pill:border-border-subtle float-pill:bg-elevated/95 float-pill:p-0.5 float-pill:shadow-lg pointer-events-none w-full"
      })
    })
  }) : null;
}
const bw = 8, yt = 20, vw = [
  "top",
  "sides",
  "bottom"
], ww = [
  "start",
  "middle",
  "end"
], yw = {
  top: { top: yt },
  sides: {
    top: yt,
    bottom: yt,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  bottom: { bottom: yt }
}, _w = (e, t) => e === "top" || e === "sides" && t === "end" ? "paddingTop" : "paddingBottom";
function xw() {
  const e = k(null), [t, n] = C(0);
  return R(() => e.current ? fa(e.current, n) : void 0, []), /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("div", {
    ref: e,
    "aria-hidden": !0,
    className: "pointer-events-none absolute top-0 h-0",
    style: {
      insetInlineStart: yt,
      insetInlineEnd: yt
    }
  }), vw.map((o) => /* @__PURE__ */ i(Mw, {
    row: o,
    length: t
  }, o))] });
}
const kw = {
  start: null,
  middle: null,
  end: null
}, Sw = (e, t) => e === t || e !== null && t !== null && Math.abs(e.width - t.width) <= 0.5 && Math.abs(e.height - t.height) <= 0.5;
function Mw({ row: e, length: t }) {
  const { data: n } = tt(), o = sw[e], [r, a] = C(kw), s = Ve((d, c) => a((p) => Sw(p[d], c) ? p : {
    ...p,
    [d]: c
  }), []), l = (e === "sides" ? dw : cw)({
    length: t,
    gap: bw,
    ...r
  });
  return /* @__PURE__ */ i(D, { children: ww.map((d) => {
    const c = o[d];
    return c === null ? null : /* @__PURE__ */ i(Ow, {
      row: e,
      slot: d,
      position: c,
      stack: Mu(n, c),
      spot: l[d],
      onColumn: s
    }, c);
  }) });
}
function Ow({ row: e, slot: t, position: n, stack: o, spot: r, onColumn: a }) {
  const s = Xa(o), l = k(null), [d, c] = C(0), [p, f] = C(() => /* @__PURE__ */ new Map()), u = Ve((h, b) => f((y) => {
    const v = y.get(h);
    if (b === null ? v === void 0 : v !== void 0 && Math.abs(v - b) <= 0.5) return y;
    const _ = new Map(y);
    return b === null ? _.delete(h) : _.set(h, b), _;
  }), []), m = o.length > 0;
  R(() => m && l.current ? uf(l.current, c) : void 0, [m]);
  const g = Math.max(0, ...p.values());
  return R(() => {
    a(t, g > 0 ? {
      width: g,
      height: d
    } : null);
  }, [
    a,
    t,
    g,
    d
  ]), R(() => () => a(t, null), [a, t]), m ? /* @__PURE__ */ i("div", {
    "data-float": n,
    className: "pointer-events-none absolute",
    style: {
      ...yw[e],
      insetInlineStart: yt + r.insetStart,
      insetInlineEnd: yt + r.insetEnd,
      [_w(e, t)]: r.offset
    },
    children: /* @__PURE__ */ i("div", {
      ref: l,
      className: `flex gap-2 ${e === "bottom" ? "flex-col-reverse" : "flex-col"}`,
      children: /* @__PURE__ */ i(zd.Provider, {
        value: u,
        children: s.map((h) => /* @__PURE__ */ i(gw, {
          id: h,
          position: n
        }, h))
      })
    })
  }) : null;
}
function Pw({ id: e }) {
  const t = tt().bar(e), n = Ya(t);
  return !t || !n ? null : /* @__PURE__ */ i(zn, {
    value: "top",
    children: /* @__PURE__ */ i("div", {
      part: Zo(e),
      "data-bar": e,
      className: "border-border-subtle flex shrink-0 items-center border-b p-2",
      children: /* @__PURE__ */ i(Ha, {
        bar: t,
        gap: 4,
        className: "w-full"
      })
    })
  });
}
function Tw({ panel: e }) {
  const { data: t } = tt();
  return /* @__PURE__ */ i(D, { children: Xa(j(() => Ou(t, e), [t, e])).map((n) => /* @__PURE__ */ i(Pw, { id: n }, n)) });
}
async function Cw(e) {
  if (e.data) return new Uint8Array(e.data);
  if (!e.url) throw new Error("a font needs a url or its data");
  const t = await fetch(e.url);
  if (!t.ok) throw new Error(`${e.url}: HTTP ${t.status}`);
  return new Uint8Array(await t.arrayBuffer());
}
function Ew() {
  const e = dt(), t = Xb();
  return E(() => {
    if (!t.length) return;
    if (!_l(e.engine)) {
      console.warn("[embedpdf] the `fonts` setting is ignored: only a local engine takes an app’s fonts. A cloud engine’s fonts are its server’s.");
      return;
    }
    const n = e.engine.fonts;
    let o = !1;
    const r = t.map((a) => Cw(a));
    return (async () => {
      for (const [a, s] of t.entries()) try {
        const l = await r[a];
        if (o) return;
        await n.register({
          key: s.key,
          familyName: s.familyName,
          weight: s.weight,
          italic: s.italic,
          data: l
        });
      } catch (l) {
        console.warn(`[embedpdf] font "${s.key}" was not registered:`, l);
      }
    })(), () => {
      o = !0;
    };
  }, [e, t]), null;
}
const Fd = [];
function me(e, { shownWhile: t, prefetch: n = !0 } = {}) {
  let o = null;
  const r = () => o ?? (o = e().catch((l) => {
    throw o = null, l;
  }));
  n && Fd.push(r);
  const a = Zl(async () => ({ default: await r() })), s = (l) => /* @__PURE__ */ i(vn, {
    fallback: null,
    children: /* @__PURE__ */ i(a, { ...l })
  });
  return t ? function(d) {
    return t() ? /* @__PURE__ */ i(s, { ...d }) : null;
  } : s;
}
const Aw = 1e4, Nw = 1e3;
function Lw(e) {
  if (typeof requestIdleCallback == "function") {
    const n = requestIdleCallback(e, { timeout: Aw });
    return () => cancelIdleCallback(n);
  }
  const t = setTimeout(e, Nw);
  return () => clearTimeout(t);
}
let fn = "not-yet";
function Iw() {
  if (fn !== "not-yet") return () => {
  };
  fn = "running";
  const e = [...Fd];
  let t = () => {
  }, n = !1;
  const o = () => {
    const r = e.shift();
    if (!n) {
      if (!r) {
        fn = "done";
        return;
      }
      t = Lw(() => {
        r().catch(() => {
        }).finally(o);
      });
    }
  };
  return o(), () => {
    n = !0, t(), fn === "running" && (fn = "not-yet");
  };
}
function Rw() {
  return E(() => Iw(), []), null;
}
function Dw({ cmd: e, run: t, emphasis: n }) {
  const o = we(Gt(e)), r = (a) => /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...o.trigger,
    type: "button",
    onClick: t,
    disabled: !e.enabled,
    "aria-pressed": e.pressable ? a : void 0,
    "aria-haspopup": e.menu ? "menu" : void 0,
    "aria-expanded": e.menu ? a : void 0,
    "aria-label": e.label,
    part: Me(a, n),
    className: De(a, e.enabled, n),
    children: e.icon && /* @__PURE__ */ i(Y, {
      name: e.icon,
      size: 20,
      accent: e.iconAccent,
      className: Zt(e.icon)
    })
  }), o.element] });
  return e.menu ? /* @__PURE__ */ i(Yo, {
    menuId: e.menu,
    children: r
  }) : r(e.active);
}
function Za({ bar: e, view: t, label: n }) {
  const o = j(() => Td(e), [e]);
  return /* @__PURE__ */ i(zn, {
    value: "selection",
    children: /* @__PURE__ */ i("div", {
      role: "toolbar",
      "aria-label": n,
      part: Zo(e.id),
      className: "border-border-subtle bg-elevated flex items-center gap-1 rounded-lg border p-1 shadow-xl",
      children: t.groups.map((r, a) => /* @__PURE__ */ i(D, { children: [a > 0 && /* @__PURE__ */ i("span", {
        "aria-hidden": !0,
        className: "bg-border h-5 w-px"
      }), r.commands.map((s) => /* @__PURE__ */ i(Dw, {
        cmd: s,
        run: () => t.execute(s.id),
        emphasis: o.has(s.id) ? "primary" : void 0
      }, s.id))] }, r.id))
    })
  });
}
const $w = me(() => import("./link-editor-BQl5WwML-DV9l5HaH.js").then((e) => e.LinkEditorCard));
function zw() {
  const e = Q(), t = Aa("annotation"), n = Da(t), o = Qe("link-editor"), r = ng((a) => a.selected);
  return E(() => {
    !r.length && o.isOpen && o.close();
  }, [r.length, o.isOpen]), !t || !n ? null : /* @__PURE__ */ i(ag, {
    placement: "bottom",
    gap: 15,
    children: o.isOpen ? /* @__PURE__ */ i($w, { onClose: o.close }) : /* @__PURE__ */ i(Za, {
      bar: t,
      view: n,
      label: e("commands.annotate.strip")
    })
  });
}
function Fw() {
  const e = _e(), { unlock: t, close: n } = Sa(), o = Uo((g) => g.documents), r = Q(), [a, s] = C(""), [l, d] = C(!1), [c, p] = C(!1), f = o.find((g) => g.id === e);
  if (!e || !f) return null;
  const u = l || f.passwordProvided === !0, m = async () => {
    if (!(c || !a.trim())) {
      p(!0);
      try {
        await t(e, { password: a });
      } catch {
        d(!0), s("");
      } finally {
        p(!1);
      }
    }
  };
  return /* @__PURE__ */ i("div", {
    className: "bg-app flex h-full w-full items-center justify-center p-8",
    children: /* @__PURE__ */ i("div", {
      className: "bg-surface border-border w-full max-w-sm rounded-xl border p-6 shadow-lg",
      children: [
        /* @__PURE__ */ i("div", {
          className: "flex flex-col items-center text-center",
          children: [
            /* @__PURE__ */ i("div", {
              className: "bg-accent-light mb-4 rounded-full p-4",
              children: /* @__PURE__ */ i(Y, {
                name: "lock",
                size: 28,
                className: "text-accent"
              })
            }),
            /* @__PURE__ */ i("h3", {
              className: "text-fg text-lg font-semibold",
              children: r("passwordPrompt.title")
            }),
            f.name && /* @__PURE__ */ i("p", {
              className: "text-fg-muted mt-1 text-sm",
              children: f.name
            })
          ]
        }),
        /* @__PURE__ */ i("p", {
          className: "text-fg-secondary mt-4 text-center text-sm",
          children: r(u ? "passwordPrompt.incorrect" : "passwordPrompt.required")
        }),
        /* @__PURE__ */ i("div", {
          className: "mt-5",
          children: [/* @__PURE__ */ i("label", {
            className: "text-fg mb-1.5 block text-sm font-medium",
            htmlFor: "doc-password",
            children: r("passwordPrompt.label")
          }), /* @__PURE__ */ i("input", {
            id: "doc-password",
            type: "password",
            value: a,
            onChange: (g) => s(g.target.value),
            onKeyDown: (g) => g.key === "Enter" && void m(),
            disabled: c,
            placeholder: r("passwordPrompt.placeholder"),
            className: "bg-surface border-border focus:border-accent focus:ring-accent text-fg placeholder:text-fg-muted block w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-1 disabled:opacity-50",
            autoFocus: !0
          })]
        }),
        u && /* @__PURE__ */ i("div", {
          className: "mt-3 flex items-center gap-2 rounded-md border border-red-500/40 bg-red-500/10 p-3",
          children: [/* @__PURE__ */ i(Y, {
            name: "alertTriangle",
            size: 16,
            className: "flex-shrink-0 text-red-500"
          }), /* @__PURE__ */ i("p", {
            className: "text-sm text-red-500",
            children: r("passwordPrompt.incorrectWarning")
          })]
        }),
        /* @__PURE__ */ i("div", {
          className: "mt-6 flex gap-3",
          children: [/* @__PURE__ */ i("button", {
            type: "button",
            onClick: () => void n(e),
            disabled: c,
            className: "border-border text-fg-secondary hover:bg-hover flex-1 cursor-pointer rounded-md border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50",
            children: r("passwordPrompt.cancel")
          }), /* @__PURE__ */ i("button", {
            type: "button",
            onClick: () => void m(),
            disabled: c || !a.trim(),
            className: "bg-accent text-on-accent flex-1 cursor-pointer rounded-md px-4 py-2.5 text-sm font-medium transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
            children: r(c ? "passwordPrompt.opening" : "passwordPrompt.open")
          })]
        })
      ]
    })
  });
}
function Wr(e) {
  switch (e?.code) {
    case "not-found":
      return "documentError.notFound";
    case "permission-denied":
      return "documentError.notAllowed";
    case "invalid-input":
      return "documentError.damaged";
    case "unsupported":
      return "documentError.unsupported";
    default:
      return "documentError.unknown";
  }
}
function Bw() {
  const e = _e(), { close: t, retry: n } = Sa(), o = Uo((s) => s.documents), r = Q(), a = o.find((s) => s.id === e);
  return !e || !a ? null : /* @__PURE__ */ i("div", {
    className: "bg-app flex h-full w-full items-center justify-center p-8",
    children: /* @__PURE__ */ i("div", {
      role: "alert",
      className: "bg-surface border-border flex max-w-sm flex-col items-center rounded-xl border p-6 text-center shadow-lg",
      children: [
        /* @__PURE__ */ i("div", {
          className: "mb-4 rounded-full bg-red-500/10 p-4",
          children: /* @__PURE__ */ i(Y, {
            name: "alertTriangle",
            size: 28,
            className: "text-red-500"
          })
        }),
        /* @__PURE__ */ i("h3", {
          className: "text-fg text-lg font-semibold",
          children: r("documentError.title")
        }),
        a.name && /* @__PURE__ */ i("p", {
          className: "text-fg-muted mt-1 text-sm",
          children: a.name
        }),
        /* @__PURE__ */ i("p", {
          className: "text-fg-secondary mt-2 text-sm",
          "data-epdf-error-reason": "",
          children: r(Wr(a.error))
        }),
        /* @__PURE__ */ i("div", {
          className: "mt-5 flex w-full gap-3",
          children: [/* @__PURE__ */ i("button", {
            type: "button",
            onClick: () => void t(e),
            className: "border-border text-fg-secondary hover:bg-hover flex-1 cursor-pointer rounded-md border px-4 py-2.5 text-sm font-medium transition-colors",
            children: r("documentError.close")
          }), /* @__PURE__ */ i("button", {
            type: "button",
            onClick: () => void n(e).catch(() => {
            }),
            className: "bg-accent text-on-accent flex-1 cursor-pointer rounded-md px-4 py-2.5 text-sm font-medium transition-colors hover:opacity-90",
            children: r("documentError.retry")
          })]
        })
      ]
    })
  });
}
function Kw({ className: e, children: t }) {
  const n = Q(), o = ke(), r = Ce(zr), a = r.visible && r.enabled, s = k(0), [l, d] = C(!1), c = (f) => a && Mc(f.dataTransfer), p = () => {
    s.current = 0, d(!1);
  };
  return /* @__PURE__ */ i("div", {
    className: e,
    onDragEnter: (f) => {
      c(f) && (f.preventDefault(), s.current += 1, d(!0));
    },
    onDragOver: (f) => {
      c(f) && (f.preventDefault(), f.dataTransfer.dropEffect = "copy");
    },
    onDragLeave: () => {
      s.current !== 0 && (s.current -= 1, s.current === 0 && d(!1));
    },
    onDrop: (f) => {
      if (p(), !c(f)) return;
      f.preventDefault(), f.stopPropagation();
      const u = Array.from(f.dataTransfer.files).filter(Ca);
      if (u.length === 0) return;
      const m = { files: u };
      o.execute(zr, { args: m }).catch(() => {
      });
    },
    children: [t, l && /* @__PURE__ */ i("div", {
      "data-epdf-drop-target": "",
      className: "border-accent bg-accent-light/60 pointer-events-none absolute inset-2 z-40 grid place-items-center rounded-lg border-2 border-dashed",
      children: /* @__PURE__ */ i("span", {
        className: "bg-elevated text-fg rounded-full px-4 py-1.5 text-sm font-medium shadow-lg",
        children: n("dropToOpen.label", { fallback: "Drop a PDF to open it" })
      })
    })]
  });
}
function jw() {
  const e = Qe(Cc);
  return e.isOpen ? /* @__PURE__ */ i(Hw, { onClose: e.close }) : null;
}
function Hw({ onClose: e }) {
  const t = Q(), n = Je(), o = ee(ct), r = Xt((f) => f.currentPageIndex + 1), a = Xt((f) => f.pageCount), [s, l] = C(() => String(r)), d = () => {
    const f = Number.parseInt(s, 10);
    Number.isFinite(f) && a > 0 && o?.goToPage(Math.min(Math.max(f, 1), a) - 1), e();
  }, [c, p = ""] = t("pageNumber.page", { params: {
    current: "",
    total: a
  } }).split("");
  return /* @__PURE__ */ i(Ua, {
    labelledBy: n,
    onClose: e,
    className: "border-border bg-surface w-80 rounded-lg border p-4 shadow-xl",
    children: /* @__PURE__ */ i("form", {
      onSubmit: (f) => {
        f.preventDefault(), d();
      },
      children: [
        /* @__PURE__ */ i("h2", {
          id: n,
          className: "text-fg text-base font-semibold",
          children: t("commands.page.goTo")
        }),
        /* @__PURE__ */ i("label", {
          className: "text-fg-secondary mt-3 flex items-center gap-2 text-sm",
          children: [
            c,
            /* @__PURE__ */ i("input", {
              type: "text",
              inputMode: "numeric",
              "aria-label": t("pageNumber.goToPage"),
              value: s,
              onChange: (f) => l(f.target.value.replace(/[^0-9]/g, "")),
              onFocus: (f) => f.currentTarget.select(),
              style: { width: `${String(a).length + 2}ch` },
              className: "border-border bg-surface text-fg focus:border-accent focus:ring-accent rounded-md border px-1.5 py-1 text-center tabular-nums outline-none focus:ring-1"
            }),
            p
          ]
        }),
        /* @__PURE__ */ i("div", {
          className: "mt-4 flex justify-end gap-2",
          children: [/* @__PURE__ */ i("button", {
            type: "button",
            onClick: e,
            className: "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm",
            children: t("demo.cancel")
          }), /* @__PURE__ */ i("button", {
            type: "submit",
            className: "bg-accent text-on-accent hover:bg-accent-hover rounded-md px-3 py-1.5 text-sm",
            children: t("goToPage.go")
          })]
        })
      ]
    })
  });
}
function Bd({ small: e = !1 }) {
  const t = Q(), n = ze(), { status: o, slow: r } = Fh(), a = o === "loading" && r;
  if (!a && !(o === "error" || o === "forbidden")) return null;
  const { viewScale: s, rotation: l } = n.transform, d = n.getViewDemand?.().visibleRect, c = d && d.width > 0 && d.height > 0 ? {
    x: (d.x + d.width / 2) * s,
    y: (d.y + d.height / 2) * s
  } : {
    x: n.transform.contentWidth / 2,
    y: n.transform.contentHeight / 2
  }, p = {
    position: "absolute",
    left: c.x,
    top: c.y,
    transform: `translate(-50%, -50%) rotate(${-l}deg)`,
    pointerEvents: "none"
  };
  if (a) {
    const f = e ? "h-5 w-5" : "h-8 w-8";
    return /* @__PURE__ */ i("div", {
      style: p,
      children: /* @__PURE__ */ i("div", {
        part: "page-loading",
        role: "status",
        "aria-label": t("demo.pageLoading", { params: { page: n.pageIndex + 1 } }),
        className: `border-border-subtle border-t-accent ${f} rounded-full border-2 motion-safe:animate-spin`
      })
    });
  }
  return e ? null : /* @__PURE__ */ i("p", {
    part: "page-error",
    role: "status",
    className: "text-fg-muted m-0 max-w-[16rem] text-center text-sm",
    style: p,
    children: t(o === "forbidden" ? "demo.pageForbidden" : "demo.pageError")
  });
}
const Or = {
  initial: 288,
  min: 200,
  max: 640
}, Uw = {
  compact: "sheet",
  medium: "overlay",
  expanded: "dock"
};
function Kd(e, t) {
  return (t === void 0 ? void 0 : Pu(t)[e]) ?? Uw[e];
}
function Ja(e) {
  const t = e === void 0 ? {} : Cu(e), n = t.max ?? Or.max, o = Math.min(t.min ?? Or.min, n);
  return {
    initial: t.initial ?? Or.initial,
    min: o,
    max: n
  };
}
function Qa(e, t) {
  return Math.max(t.min, Math.min(t.max, Math.floor(e / 2)));
}
function Qo(e, t, n) {
  const o = Qa(t, n);
  return Math.round(Math.min(o, Math.max(n.min, e)));
}
function Gw(e, t) {
  return Math.round(Math.max(0, Math.min(e, t - 48)));
}
function Ww(e, t, n) {
  const o = Math.min(n.max, Math.max(n.min, e));
  return Math.round(Math.max(0, Math.min(o, t)));
}
const Vw = (e, t) => Kd(e, t) === "dock";
function qw(e, t) {
  return e === "start" == (t === "ltr") ? 1 : -1;
}
function Vr(e, t, n) {
  return Qo(e + t * qw(n.side, n.dir), n.viewerWidth, n.widths);
}
function Yw(e, t, n, o) {
  const r = 16 * (n ? 4 : 1);
  return t === "ArrowRight" ? Vr(e, r, o) : t === "ArrowLeft" ? Vr(e, -r, o) : t === "Home" ? Qo(o.widths.min, o.viewerWidth, o.widths) : t === "End" ? Qa(o.viewerWidth, o.widths) : null;
}
function Xw(e) {
  const { size: t } = ut(), n = Kd(t, e.present);
  return n === "sheet" ? /* @__PURE__ */ i(ty, { ...e }) : n === "overlay" ? /* @__PURE__ */ i(ey, { ...e }) : /* @__PURE__ */ i(Jw, { ...e });
}
function ei({ title: e, header: t, onClose: n }) {
  const o = Q();
  return /* @__PURE__ */ i("div", {
    part: "panel-header",
    "data-epdf-panel-header": "",
    className: "border-border-subtle flex min-h-11 shrink-0 items-center gap-2 border-b px-3 py-1.5",
    children: [/* @__PURE__ */ i("div", {
      className: "flex min-w-0 flex-1 items-center",
      children: t ?? /* @__PURE__ */ i("h2", {
        className: "text-fg truncate text-sm font-semibold",
        children: e
      })
    }), n && /* @__PURE__ */ i(qo, {
      content: { label: o("panel.close") },
      children: (r) => /* @__PURE__ */ i("button", {
        ...r,
        type: "button",
        onClick: n,
        "aria-label": o("panel.close"),
        className: "text-fg-muted hover:bg-hover grid h-7 w-7 shrink-0 place-items-center rounded-md",
        children: /* @__PURE__ */ i(Y, {
          name: "x",
          size: 16
        })
      })
    })]
  });
}
const Ks = /* @__PURE__ */ new WeakMap();
function Zw(e) {
  let t = Ks.get(e);
  return t || (t = /* @__PURE__ */ new Map(), Ks.set(e, t)), t;
}
function ti(e, t) {
  const n = Zw(dt()), [, o] = kt((s) => s + 1, 0);
  return [n.get(e) ?? t.initial, (s) => {
    n.get(e) !== s && (n.set(e, s), o());
  }];
}
function Jw({ id: e, side: t, width: n, resizable: o = !0, closable: r = !0, title: a, onClose: s, header: l, bars: d, children: c }) {
  const p = ut(), f = Je(), u = Ja(n), [m, g] = ti(e, u), h = Qo(m, p.width, u), b = Rc(), y = {
    side: t,
    dir: p.dir,
    viewerWidth: p.width,
    widths: u
  };
  return /* @__PURE__ */ i("section", {
    id: f,
    role: "region",
    "aria-label": a,
    part: "panel",
    "data-epdf-panel": e,
    "data-present": "dock",
    className: `bg-surface border-border-subtle relative z-[35] flex shrink-0 flex-col ${t === "start" ? "border-e" : "border-s"}`,
    style: { width: h },
    children: [
      /* @__PURE__ */ i(ei, {
        title: a,
        header: l,
        onClose: r ? s : void 0
      }),
      d,
      /* @__PURE__ */ i("div", {
        className: "flex min-h-0 flex-1 flex-col",
        children: c
      }),
      o && /* @__PURE__ */ i(jd, {
        regionId: f,
        edge: y,
        title: a,
        width: h,
        onWidth: g,
        onResized: (v) => b({
          id: e,
          width: v
        })
      })
    ]
  });
}
function jd({ regionId: e, edge: t, title: n, width: o, onWidth: r, onResized: a }) {
  const s = Q(), l = k(null), d = (f) => {
    f.pointerType === "mouse" && f.button !== 0 || (f.preventDefault(), f.currentTarget.setPointerCapture(f.pointerId), l.current = {
      pointerId: f.pointerId,
      startX: f.clientX,
      startWidth: o,
      width: o
    });
  }, c = (f) => {
    const u = l.current;
    !u || u.pointerId !== f.pointerId || (u.width = Vr(u.startWidth, f.clientX - u.startX, t), r(u.width));
  }, p = (f) => {
    const u = l.current;
    u?.pointerId === f.pointerId && (l.current = null, u.width !== u.startWidth && a(u.width));
  };
  return /* @__PURE__ */ i("div", {
    role: "separator",
    "aria-orientation": "vertical",
    "aria-controls": e,
    "aria-label": s("panel.resize", { params: { title: n } }),
    "aria-valuenow": o,
    "aria-valuemin": t.widths.min,
    "aria-valuemax": Qa(t.viewerWidth, t.widths),
    tabIndex: 0,
    "data-epdf-panel-edge": "",
    className: `focus-visible:bg-accent/40 hover:bg-accent/20 absolute inset-y-0 z-10 w-2 cursor-col-resize touch-none outline-none transition-colors ${t.side === "start" ? "-end-1" : "-start-1"}`,
    onPointerDown: d,
    onPointerMove: c,
    onPointerUp: p,
    onPointerCancel: p,
    onKeyDown: (f) => {
      const u = Yw(o, f.key, f.shiftKey, t);
      u !== null && (f.preventDefault(), u !== o && (r(u), a(u)));
    }
  });
}
const Qw = {
  start: "start-0 border-e starting:-translate-x-full rtl:starting:translate-x-full",
  end: "end-0 border-s starting:translate-x-full rtl:starting:-translate-x-full"
};
function ey({ id: e, side: t, width: n, resizable: o = !0, title: r, onClose: a, header: s, bars: l, list: d, children: c }) {
  const p = ut(), f = Je(), u = Ja(n), [m, g] = ti(e, u), h = Qo(m, p.width, u), b = Rc(), y = {
    side: t,
    dir: p.dir,
    viewerWidth: p.width,
    widths: u
  }, v = k(null), _ = k(a);
  return _.current = a, R(() => {
    const P = v.current;
    if (!P) return;
    const S = Vo(P, {
      onEscape: () => _.current(),
      trap: !1
    });
    return () => S.release();
  }, []), /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("div", {
    "aria-hidden": "true",
    "data-epdf-scrim": "",
    className: `absolute inset-0 z-30 ${Ra}`,
    onClick: () => _.current()
  }), /* @__PURE__ */ i("section", {
    ref: v,
    id: f,
    role: "dialog",
    "aria-label": r,
    part: "panel",
    "data-epdf-panel": e,
    "data-present": "overlay",
    className: `bg-surface border-border-subtle absolute inset-y-0 z-40 flex flex-col shadow-xl transition-[translate] duration-200 ease-out motion-reduce:transition-none ${Qw[t]}`,
    style: { width: Gw(h, p.width) },
    children: [
      /* @__PURE__ */ i(ei, {
        title: r,
        header: s,
        onClose: a
      }),
      l,
      /* @__PURE__ */ i("div", {
        className: "flex min-h-0 flex-1 flex-col",
        children: /* @__PURE__ */ i(od, {
          value: d ? () => _.current() : () => {
          },
          children: c
        })
      }),
      o && /* @__PURE__ */ i(jd, {
        regionId: f,
        edge: y,
        title: r,
        width: h,
        onWidth: g,
        onResized: (P) => b({
          id: e,
          width: P
        })
      })
    ]
  })] });
}
function ty({ id: e, width: t, title: n, onClose: o, header: r, bars: a, list: s, children: l }) {
  const d = ut(), c = Ja(t), [p] = ti(e, c);
  return /* @__PURE__ */ i(rd, {
    label: n,
    onClose: o,
    size: "panel",
    width: d.size === "compact" ? void 0 : Ww(p, d.width, c),
    list: s,
    part: "panel",
    data: {
      "epdf-panel": e,
      present: "sheet"
    },
    header: /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i(ei, {
      title: n,
      header: r,
      onClose: o
    }), a] }),
    children: l
  });
}
function ny({ id: e, side: t, title: n, onClose: o, children: r }) {
  const a = Q(), { size: s } = ut(), l = k(null), d = k(o);
  return d.current = o, R(() => {
    const c = l.current;
    if (!c) return;
    const p = Vo(c, {
      onEscape: () => d.current(),
      trap: !1
    });
    return () => p.release();
  }, []), /* @__PURE__ */ i("section", {
    ref: l,
    role: "dialog",
    "aria-label": n,
    part: "panel",
    "data-epdf-panel": e,
    "data-present": "bar",
    className: `bg-surface border-border-subtle absolute top-2 z-40 flex items-start gap-1 rounded-lg border p-2 shadow-xl ${s === "compact" ? "inset-x-2" : `w-[24rem] max-w-[calc(100%-1rem)] ${t === "start" ? "start-2" : "end-2"}`}`,
    children: [/* @__PURE__ */ i("div", {
      className: "min-w-0 flex-1",
      children: r
    }), /* @__PURE__ */ i(qo, {
      content: { label: a("panel.close") },
      children: (c) => /* @__PURE__ */ i("button", {
        ...c,
        type: "button",
        onClick: o,
        "aria-label": a("panel.close"),
        className: "text-fg-muted hover:bg-hover grid h-8 w-8 shrink-0 place-items-center rounded-md",
        children: /* @__PURE__ */ i(Y, {
          name: "x",
          size: 16
        })
      })
    })]
  });
}
function oy({ id: e, title: t, panels: n }) {
  const o = Q(), [r, a] = C(!1), s = we({ label: o("panels.switch") });
  return /* @__PURE__ */ i("div", {
    className: "relative flex min-w-0",
    children: [
      /* @__PURE__ */ i("button", {
        ...s.trigger,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": r,
        "data-epdf-panel-switcher": "",
        onClick: () => a((l) => !l),
        className: "text-fg hover:bg-hover -ms-1.5 flex min-w-0 items-center gap-1 rounded-md px-1.5 py-1 text-sm font-semibold",
        children: [/* @__PURE__ */ i("span", {
          className: "truncate",
          children: t
        }), /* @__PURE__ */ i(Y, {
          name: "chevronDown",
          size: 16,
          className: "text-fg-muted shrink-0"
        })]
      }),
      s.element,
      r && /* @__PURE__ */ i(Fn, {
        onClose: () => a(!1),
        children: /* @__PURE__ */ i("div", {
          className: "min-w-48 p-1",
          children: n.map((l) => /* @__PURE__ */ i(ry, {
            panel: l,
            current: l === e,
            onPicked: () => a(!1)
          }, l))
        })
      })
    ]
  });
}
function ry({ panel: e, current: t, onPicked: n }) {
  const o = Ce(It(e));
  return o.visible ? /* @__PURE__ */ i(Bn, {
    command: {
      ...o,
      active: t
    },
    choice: "radio",
    onSelect: () => {
      t || o.run(), n();
    }
  }) : null;
}
const no = 2;
function Hd(e) {
  const t = e[0];
  return t ? Math.max(1, e.filter((n) => Math.abs(n.y - t.y) < 1).length) : 1;
}
function js(e, t, n) {
  const o = Math.max(e.x - t, 0, t - (e.x + e.width)), r = Math.max(e.y - n, 0, n - (e.y + e.height));
  return Math.hypot(o, r);
}
function ay(e, t, n) {
  const o = e.filter((l) => !t.has(l)), r = "before" in n ? n.before : n.after, a = o.indexOf(r) + ("after" in n ? 1 : 0), s = e.filter((l) => t.has(l));
  return [
    ...o.slice(0, a),
    ...s,
    ...o.slice(a)
  ];
}
function iy(e, t, n, o, r) {
  let a = null;
  for (const p of e) (!a || js(p, t.x, t.y) < js(a, t.x, t.y)) && (a = p);
  if (!a || r.has(a.page)) return null;
  const s = Hd(e) > 1, l = s ? t.x < a.x + a.width / 2 : t.y < a.y + a.height / 2, d = l ? { before: a.page } : { after: a.page };
  if (r.size > 0 && ay(o, r, d).every((p, f) => p === o[f]))
    return null;
  const c = n.gap / 2;
  return {
    position: d,
    line: s ? {
      x: (l ? a.x - c : a.x + a.width + c) - no / 2,
      y: a.y,
      width: no,
      height: a.height
    } : {
      x: a.x,
      y: (l ? a.y - c : a.y + a.height + n.band + c) - no / 2,
      width: a.width,
      height: no
    }
  };
}
function sy(e, t, n) {
  const o = e.flatMap((r, a) => t.has(r) ? [a] : []);
  if (o.length === 0) return null;
  if (n < 0) {
    for (let r = o[0] - 1; r >= 0; r -= 1) if (!t.has(e[r])) return { before: e[r] };
    return null;
  }
  for (let r = o[o.length - 1] + 1; r < e.length; r += 1) if (!t.has(e[r])) return { after: e[r] };
  return null;
}
const ly = 4, cy = 450, Hs = 28, dy = 16;
function Us(e) {
  return e.listVisiblePages().map((t) => ({
    page: t.ref.objectNumber,
    x: t.screenX,
    y: t.screenY,
    width: t.transform.viewWidth,
    height: t.transform.viewHeight
  }));
}
const Pr = (e) => "before" in e ? { before: ho(e.before) } : { after: ho(e.after) };
function uy() {
  const e = Q(), t = Je(), n = Yi(), o = Yi(_n), r = Xt((w) => w.currentPageIndex), a = Sh(), s = Vh(), l = qh((w) => w.selected), d = ke(), c = Ce("page:insert-file"), p = Ce("page:insert-blank"), f = p.visible && p.enabled, u = Rv(), m = k(null), [g, h] = C(null), [b, y] = C(null), [v, _] = C(!1), [P, S] = C(null), x = k(null);
  x.current = P;
  const [O, M] = C(null), T = k(null), L = k(!1), B = a.map((w) => w.ref.objectNumber), I = (w) => w === null ? -1 : B.indexOf(w), K = new Set(l.map((w) => w.objectNumber)), te = I(g) >= 0 ? I(g) : r;
  E(() => o.reveal(r), [r, o]);
  const Fe = Xt((w) => w.pageCount, _n), ne = l[l.length - 1]?.objectNumber ?? null, nt = ne === null ? -1 : B.indexOf(ne);
  E(() => {
    nt >= 0 && nt < Fe && o.reveal(nt);
  }, [
    nt,
    Fe,
    o
  ]);
  const ln = () => {
    const { gap: w, pageFrame: F } = o.getSettings();
    return {
      gap: typeof w == "object" && w !== null && "px" in w ? w.px : dy,
      band: F.bottom
    };
  }, St = (w, F) => {
    const W = m.current?.getBoundingClientRect();
    return W ? {
      x: w - W.left,
      y: F - W.top
    } : null;
  }, ot = (w, F, W) => {
    const oe = St(w, F);
    return oe ? iy(Us(o), oe, ln(), B, W) : null;
  }, A = (w) => {
    n.goToPage(w), u();
  }, ie = (w) => s.select(w), ve = (w, F, W) => {
    if (L.current) {
      L.current = !1;
      return;
    }
    const oe = w.objectNumber;
    if (h(oe), f && (W.metaKey || W.ctrlKey)) {
      ie(K.has(oe) ? l.filter((G) => G.objectNumber !== oe) : [...l, w]), y(oe);
      return;
    }
    if (f && W.shiftKey && I(b) >= 0) {
      const G = I(b), [ce, q] = G < F ? [G, F] : [F, G];
      ie(a.slice(ce, q + 1).map((rr) => rr.ref));
      return;
    }
    y(oe), f && ie([w]), A(F);
  }, Se = (w) => {
    h(w.objectNumber), K.has(w.objectNumber) || ie([w]);
  }, Mt = (w) => m.current?.querySelector(`[data-epdf-page-menu="${w}"] button`)?.click(), Ot = () => {
    T.current !== null && clearTimeout(T.current), T.current = null;
  }, Kn = (w, F) => {
    if (!f || F.button !== 0 || F.target.closest("[data-epdf-page-menu]")) return;
    const W = w.objectNumber, oe = K.has(W) ? K : /* @__PURE__ */ new Set([W]);
    S({
      pointerId: F.pointerId,
      startX: F.clientX,
      startY: F.clientY,
      page: W,
      moving: oe,
      held: !1,
      active: !1,
      drop: null
    }), F.pointerType !== "mouse" && (T.current = setTimeout(() => {
      const G = x.current;
      G && !G.active && S({
        ...G,
        held: !0
      });
    }, cy));
  }, Ne = P?.active === !0, jn = P !== null;
  E(() => {
    if (!jn) return;
    const w = (G) => {
      const ce = x.current;
      if (!ce || G.pointerId !== ce.pointerId) return;
      if (!ce.active) {
        if (Math.hypot(G.clientX - ce.startX, G.clientY - ce.startY) <= ly) return;
        if (G.pointerType !== "mouse" && !ce.held) {
          Ot(), S(null);
          return;
        }
      }
      const q = m.current?.getBoundingClientRect();
      q && G.clientY < q.top + Hs ? o.scrollBy({ top: -8 }) : q && G.clientY > q.bottom - Hs && o.scrollBy({ top: 8 }), S({
        ...ce,
        active: !0,
        drop: ot(G.clientX, G.clientY, ce.moving)
      });
    }, F = (G, ce) => {
      Ot();
      const q = x.current;
      if (!q || G.pointerId !== q.pointerId) return;
      if (S(null), !q.active) {
        q.held && ce && (L.current = !0, Se(ho(q.page)), Mt(q.page));
        return;
      }
      if (L.current = !0, setTimeout(() => {
        L.current = !1;
      }, 0), !ce || !q.drop) return;
      const rr = a.filter((ar) => q.moving.has(ar.ref.objectNumber));
      s.reorder(rr.map((ar) => ar.ref), Pr(q.drop.position)).catch(() => {
      });
    }, W = (G) => F(G, !0), oe = (G) => F(G, !1);
    return window.addEventListener("pointermove", w), window.addEventListener("pointerup", W), window.addEventListener("pointercancel", oe), () => {
      window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", W), window.removeEventListener("pointercancel", oe);
    };
  }), E(() => {
    if (!Ne) return;
    const w = (F) => F.preventDefault();
    return document.addEventListener("touchmove", w, { passive: !1 }), () => document.removeEventListener("touchmove", w);
  }, [Ne]), E(() => Ot, []);
  const nr = (w) => f && c.visible && c.enabled && Mc(w.dataTransfer), si = (w) => {
    nr(w) && (w.preventDefault(), w.stopPropagation(), w.dataTransfer.dropEffect = "copy", M(ot(w.clientX, w.clientY, /* @__PURE__ */ new Set())));
  }, nu = (w) => {
    if (!nr(w)) return;
    w.stopPropagation();
    const F = w.relatedTarget;
    (!F || !m.current?.contains(F)) && M(null);
  }, ou = (w) => {
    if (!nr(w)) return;
    w.preventDefault(), w.stopPropagation();
    const F = ot(w.clientX, w.clientY, /* @__PURE__ */ new Set());
    M(null);
    const W = Array.from(w.dataTransfer.files).filter(Ca);
    if (W.length === 0) return;
    const oe = {
      files: W,
      ...F ? { position: Pr(F.position) } : {}
    };
    d.execute("page:insert-file", { args: oe }).catch(() => {
    });
  }, li = (w, F) => {
    const W = a[w];
    if (W) {
      if (h(W.ref.objectNumber), o.reveal(w), !f) {
        n.goToPage(w);
        return;
      }
      if (F && I(b) >= 0) {
        const oe = I(b), [G, ce] = oe < w ? [oe, w] : [w, oe];
        ie(a.slice(G, ce + 1).map((q) => q.ref));
        return;
      }
      y(W.ref.objectNumber), ie([W.ref]), n.goToPage(w);
    }
  }, ru = (w) => {
    if (w.target !== w.currentTarget || a.length === 0) return;
    _(!0);
    const F = Hd(Us(o)), W = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -F,
      ArrowDown: F
    }[w.key], oe = w.metaKey || w.ctrlKey;
    if (W !== void 0 && w.altKey && f) {
      w.preventDefault();
      const G = sy(B, K, W < 0 ? -1 : 1), ce = a.filter((q) => K.has(q.ref.objectNumber));
      G && ce.length > 0 && s.reorder(ce.map((q) => q.ref), Pr(G)).catch(() => {
      });
      return;
    }
    if (W !== void 0) {
      w.preventDefault(), li(Math.max(0, Math.min(a.length - 1, te + W)), w.shiftKey);
      return;
    }
    switch (w.key) {
      case "Home":
      case "End":
        w.preventDefault(), li(w.key === "Home" ? 0 : a.length - 1, w.shiftKey);
        return;
      case "Enter":
        w.preventDefault(), A(te);
        return;
      case " ": {
        if (!f) return;
        w.preventDefault();
        const G = a[te];
        if (!G) return;
        const ce = G.ref.objectNumber;
        y(ce), ie(K.has(ce) ? l.filter((q) => q.objectNumber !== ce) : [...l, G.ref]);
        return;
      }
      case "Delete":
      case "Backspace":
        if (!f) return;
        w.preventDefault(), d.execute("page:delete").catch(() => {
        });
        return;
      case "a":
      case "A":
        if (!oe || !f) return;
        w.preventDefault(), d.execute("page:select-all").catch(() => {
        });
        return;
    }
  }, or = a[te]?.ref ?? null, cn = Ne ? P.drop : O;
  return /* @__PURE__ */ i("div", {
    className: "flex min-h-0 flex-1 flex-col",
    children: /* @__PURE__ */ i("div", {
      ref: m,
      role: "listbox",
      "aria-label": e("panels.thumbnails"),
      "aria-multiselectable": f || void 0,
      tabIndex: 0,
      "aria-activedescendant": v && or ? `${t}-${or.objectNumber}` : void 0,
      onKeyDown: ru,
      onFocus: (w) => w.target === w.currentTarget && _(w.currentTarget.matches(":focus-visible")),
      onBlur: (w) => w.target === w.currentTarget && _(!1),
      onDragEnter: si,
      onDragOver: si,
      onDragLeave: nu,
      onDrop: ou,
      className: "focus-visible:ring-accent relative flex min-h-0 flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset",
      children: /* @__PURE__ */ i(dc, {
        token: _n,
        className: "flex-1",
        style: { position: "relative" },
        overlay: /* @__PURE__ */ i(D, { children: [cn && /* @__PURE__ */ i("div", {
          "aria-hidden": !0,
          className: "bg-accent pointer-events-none absolute rounded-full",
          style: {
            left: cn.line.x,
            top: cn.line.y,
            width: cn.line.width,
            height: cn.line.height
          }
        }), /* @__PURE__ */ i($r, { axis: "y" })] }),
        pageChrome: (w) => {
          const F = w.ref.objectNumber, W = f && K.has(F), oe = w.pageIndex === r, G = v && or?.objectNumber === F, ce = Ne && P.moving.has(F);
          return /* @__PURE__ */ i("div", {
            className: "group",
            style: {
              position: "absolute",
              inset: 0
            },
            children: [
              /* @__PURE__ */ i(Qc, {
                label: e("thumbnails.page", { params: { page: w.pageIndex + 1 } }),
                id: `${t}-${F}`,
                role: "option",
                "aria-selected": f ? W : oe,
                "aria-current": oe ? "page" : void 0,
                tabIndex: -1,
                onClick: (q) => ve(w.ref, w.pageIndex, q),
                onPointerDown: (q) => Kn(w.ref, q),
                onContextMenu: (q) => {
                  f && (q.preventDefault(), Se(w.ref), Mt(F));
                },
                className: `box-border cursor-pointer touch-manipulation rounded ${W || oe ? "border-accent border-2" : "border-border-subtle border"} ${oe ? "ring-accent-light ring-2" : ""} ${W ? "bg-accent/10" : ""} ${G ? "outline-accent outline outline-2 outline-offset-2" : ""} ${ce ? "bg-surface/60" : ""}`,
                style: {
                  position: "absolute",
                  top: w.frame.top,
                  left: w.frame.left,
                  right: w.frame.right,
                  bottom: w.frame.bottom
                }
              }),
              f && /* @__PURE__ */ i("span", {
                "data-epdf-page-menu": F,
                onClick: (q) => q.stopPropagation(),
                onPointerDownCapture: () => Se(w.ref),
                className: `bg-elevated absolute rounded shadow-sm ${W || G ? "" : "opacity-0 focus-within:opacity-100 group-hover:opacity-100"}`,
                style: {
                  top: w.frame.top + 4,
                  right: w.frame.right + 4
                },
                children: /* @__PURE__ */ i(py, {})
              }),
              /* @__PURE__ */ i("div", {
                style: {
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: w.frame.bottom,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  color: "var(--epdf-text-muted)",
                  pointerEvents: "none"
                },
                children: w.pageIndex + 1
              })
            ]
          });
        },
        children: () => /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i(pc, { thumbnail: !0 }), /* @__PURE__ */ i(Bd, { small: !0 })] })
      })
    })
  });
}
function py() {
  const e = Ce("menu:page");
  return e.visible ? /* @__PURE__ */ i(Jo, {
    cmd: e,
    variant: "icon",
    run: () => void e.run()
  }) : null;
}
const fy = me(() => import("./search-panel-Bg1iPcy6-DPYp_NzQ.js").then((e) => e.SearchPanel)), my = me(() => import("./search-panel-Bg1iPcy6-DPYp_NzQ.js").then((e) => e.FindBar)), hy = me(() => import("./comments-panel-DfUngPkF-BdOkNWgM.js").then((e) => e.CommentsPanel)), gy = me(() => import("./measurement-6M_KEsFK-Bw9_NzWx.js").then((e) => e.MeasurementSection)), by = me(() => import("./annotation-style-CNXq5gcp-C8ZPUht3.js").then((e) => e.AnnotationStylePanel)), vy = me(() => import("./stamps-panel-moG5l7rv-BeT889q9.js").then((e) => e.StampsPanel)), wy = me(() => import("./signatures-panel-QneSliC6-DeuWjIuE.js").then((e) => e.SignaturesPanel)), yy = me(() => import("./redaction-panel-Djm12Ydh-CzJptj00.js").then((e) => e.RedactionPanel)), _y = me(() => import("./outline-panel-qcEnzfex-CzT-23Th.js").then((e) => e.OutlinePanel)), xy = me(() => import("./attachments-panel-YtEhxrto-No2qmrx-.js").then((e) => e.AttachmentsPanel)), ky = me(() => import("./form-design-panel-BLoqGIJY-D9AquL8W.js").then((e) => e.FormDesignPanel)), Ud = /* @__PURE__ */ new Map([
  ["thumbnails", {
    draw: () => /* @__PURE__ */ i(uy, {}),
    list: !0
  }],
  ["outline", {
    draw: (e) => /* @__PURE__ */ i(_y, {}, e ?? "none"),
    list: !0,
    scope: c0
  }],
  ["attachments", {
    draw: (e) => /* @__PURE__ */ i(xy, {}, e ?? "none"),
    list: !0
  }],
  ["search", {
    draw: (e) => /* @__PURE__ */ i(fy, {}, e ?? "none"),
    list: !0,
    bar: {
      when: (e, t) => e.tryCapability(on, t ?? void 0)?.canSearch({ snippets: !0 }) === !1,
      draw: (e) => /* @__PURE__ */ i(my, {}, e ?? "none")
    }
  }],
  ["comments", { draw: (e) => /* @__PURE__ */ i(hy, {}, e ?? "none") }],
  ["measurement", { draw: (e) => /* @__PURE__ */ i(gy, {}, e ?? "none") }],
  ["style", { draw: () => /* @__PURE__ */ i(by, {}) }],
  ["stamps", { draw: () => /* @__PURE__ */ i(vy, {}) }],
  ["signatures", { draw: () => /* @__PURE__ */ i(wy, {}) }],
  ["redaction", { draw: () => /* @__PURE__ */ i(yy, {}) }],
  ["form-design", { draw: (e) => /* @__PURE__ */ i(ky, {}, e ?? "none") }]
]), Sy = [], oo = (e, t) => e.length === t.length && e.every((n, o) => n === t[o]), My = (e, t) => oo(e.shown, t.shown) && oo(e.off, t.off) && oo(e.open, t.open) && oo(e.bars, t.bars), Gs = /* @__PURE__ */ new WeakMap();
function Oy(e, t) {
  let n = Gs.get(e);
  return n || (n = {
    start: /* @__PURE__ */ new Set(),
    end: /* @__PURE__ */ new Set()
  }, Gs.set(e, n)), n[t];
}
function Ws({ side: e }) {
  const { data: t, env: n } = tt(), o = ke(), r = ee(H), a = _e(), s = j(() => K1(t, e), [t, e]), { shown: l, off: d, open: c, bars: p } = le((u) => {
    const m = (g) => o.resolveCommand(It(g), a ?? void 0)?.visible;
    return {
      shown: s.filter((g) => m(g) === !0),
      off: s.filter((g) => m(g) === !1),
      open: r ? s.filter((g) => r.isOpen(g)) : Sy,
      bars: s.filter((g) => Ud.get(g)?.bar?.when(u, a) === !0)
    };
  }, My);
  Xg((u) => u.onSurfaceOpened, (u) => {
    if (!(!r || !s.includes(u.id)))
      for (const m of s) m !== u.id && r.isOpen(m) && r.close(m);
  });
  const f = c.find((u) => l.includes(u)) ?? null;
  return R(() => {
    if (!r) return;
    for (const h of c) h !== f && (f !== null || d.includes(h)) && r.close(h);
    if (n === Ea) return;
    const u = t.panels ?? {}, m = Oy(r, e), g = j1(u, {
      ids: s,
      shown: l,
      current: f,
      docks: (h) => Vw(n.size, u[h]?.present) && !p.includes(h)
    }, m);
    for (const h of g.started) m.add(h);
    g.open !== null && r.open(g.open);
  }, [
    r,
    e,
    t,
    n,
    s,
    l,
    c,
    d,
    p,
    f
  ]), f === null ? null : /* @__PURE__ */ i(Py, {
    id: f,
    side: e,
    siblings: l
  }, f);
}
function Py({ id: e, side: t, siblings: n }) {
  const o = tt().data.panels?.[e], r = ke(), a = ee(H), s = _e(), l = Ud.get(e), d = le((f) => l?.bar?.when(f, s) === !0), c = le(() => r.resolveCommand(It(e), s ?? void 0)?.label ?? null);
  if (!o) return null;
  const p = c ?? o.title ?? e;
  return d ? /* @__PURE__ */ i(ny, {
    id: e,
    side: t,
    title: p,
    onClose: () => a?.close(e),
    children: /* @__PURE__ */ i("slot", {
      name: `panel:${e}`,
      children: l?.bar?.draw(s)
    })
  }) : /* @__PURE__ */ i(l?.scope ?? D, { children: /* @__PURE__ */ i(Xw, {
    id: e,
    side: t,
    present: o.present,
    width: o.width,
    resizable: o.resizable,
    closable: o.closable !== !1,
    title: p,
    header: n.length > 1 ? /* @__PURE__ */ i(oy, {
      id: e,
      title: p,
      panels: n
    }) : void 0,
    bars: /* @__PURE__ */ i(Tw, { panel: e }),
    list: l?.list,
    onClose: () => a?.close(e),
    children: /* @__PURE__ */ i("slot", {
      name: `panel:${e}`,
      children: l?.draw(s)
    })
  }) });
}
function Ty() {
  let e = [];
  const t = /* @__PURE__ */ new Set(), n = (o) => {
    e = o;
    for (const r of [...t]) r();
  };
  return {
    list: () => e,
    subscribe(o) {
      return t.add(o), () => {
        t.delete(o);
      };
    },
    place(o) {
      const r = e.findIndex((a) => a.host === o.host);
      n(r < 0 ? [...e, o] : e.map((a, s) => s === r ? o : a));
    },
    remove(o) {
      e.some((r) => r.host === o) && n(e.filter((r) => r.host !== o));
    }
  };
}
const Tr = /* @__PURE__ */ new WeakSet();
function Cy(e, t) {
  const { visible: n, enabled: o } = t;
  R(() => {
    !n && !e.hidden ? (e.hidden = !0, Tr.add(e)) : n && Tr.has(e) && (e.hidden = !1, Tr.delete(e)), o ? e.removeAttribute("aria-disabled") : e.setAttribute("aria-disabled", "true");
  }, [
    e,
    n,
    o
  ]);
}
function Gd({ icon: e, label: t }) {
  return e ? /* @__PURE__ */ i(Y, {
    name: e,
    size: 20
  }) : /* @__PURE__ */ i("span", {
    className: "whitespace-nowrap px-1 text-sm",
    children: t
  });
}
function Ey({ host: e, commandId: t, active: n }) {
  const o = Ce(t);
  return Cy(e, o), o.visible ? /* @__PURE__ */ i(Jo, {
    cmd: n ? {
      ...o,
      active: n
    } : o,
    variant: "icon",
    run: () => void o.run()
  }) : null;
}
function Ay({ icon: e, label: t, active: n }) {
  const o = we(t ? {
    label: t,
    labelShown: !e
  } : null);
  return /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...o.trigger,
    type: "button",
    "aria-label": t ?? void 0,
    "aria-pressed": n || void 0,
    part: Me(n),
    className: De(n),
    children: /* @__PURE__ */ i(Gd, {
      icon: e,
      label: t
    })
  }), o.element] });
}
function Ny({ button: e }) {
  return e.command ? /* @__PURE__ */ i(Ey, {
    host: e.host,
    commandId: e.command,
    active: e.active
  }) : /* @__PURE__ */ i(Ay, {
    icon: e.icon,
    label: e.label,
    active: e.active
  });
}
const Ly = (e) => ({
  id: "",
  label: e.label,
  icon: e.icon ?? void 0,
  shortcuts: [],
  enabled: !0,
  active: e.active,
  pressable: !1,
  visible: !0,
  categories: []
});
function Iy({ item: e, commandId: t, onPicked: n }) {
  const o = Ce(t);
  if (!o.visible) return null;
  const r = {
    ...o,
    label: e.label || o.label,
    icon: e.icon ?? o.icon,
    active: e.active || o.active
  };
  return /* @__PURE__ */ i(Bn, {
    command: r,
    choice: r.active ? "checkbox" : "none",
    onSelect: () => {
      o.run(), e.select(), n();
    }
  });
}
function Ry({ menu: e }) {
  const [t, n] = C(!1), o = () => n(!1), r = we(e.label ? {
    label: e.label,
    labelShown: !e.icon
  } : null);
  return /* @__PURE__ */ i("span", {
    className: "relative inline-flex",
    children: [
      /* @__PURE__ */ i("button", {
        ...r.trigger,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": t,
        "aria-label": e.label ?? void 0,
        part: Me(t),
        className: De(t),
        onClick: () => n((a) => !a),
        children: /* @__PURE__ */ i(Gd, {
          icon: e.icon,
          label: e.label
        })
      }),
      r.element,
      t && /* @__PURE__ */ i(Fn, {
        onClose: o,
        children: /* @__PURE__ */ i("div", {
          className: "min-w-52 p-1",
          children: e.items.map((a, s) => a.command ? /* @__PURE__ */ i(Iy, {
            item: a,
            commandId: a.command,
            onPicked: o
          }, s) : /* @__PURE__ */ i(Bn, {
            command: Ly(a),
            choice: a.active ? "checkbox" : "none",
            onSelect: () => {
              a.select(), o();
            }
          }, s))
        })
      })
    ]
  });
}
function Dy({ icon: e }) {
  return e.icon ? /* @__PURE__ */ i(Y, {
    name: e.icon,
    size: e.size ?? 20,
    title: e.label ?? void 0,
    className: "block"
  }) : null;
}
const Vs = /* @__PURE__ */ new WeakMap();
let $y = 0;
const zy = (e) => {
  let t = Vs.get(e);
  return t === void 0 && (t = $y++, Vs.set(e, t)), t;
};
function Fy({ components: e }) {
  const t = Xe(e.subscribe, e.list, e.list), n = fd();
  return Xe(n.subscribe, n.version, n.version), /* @__PURE__ */ i(D, { children: t.map((o) => /* @__PURE__ */ i(D, { children: _a(/* @__PURE__ */ i(zn, {
    value: n.edgeOf(o.host),
    children: o.kind === "button" ? /* @__PURE__ */ i(Ny, { button: o }) : o.kind === "menu" ? /* @__PURE__ */ i(Ry, { menu: o }) : /* @__PURE__ */ i(Dy, { icon: o })
  }), o.root) }, zy(o.host))) });
}
const By = 2500;
function Ky() {
  const e = Q(), [t, n] = C(null), o = Ve((r) => n((a) => ({
    message: r,
    count: (a?.count ?? 0) + 1
  })), []);
  return E(() => {
    if (!t) return;
    const r = setTimeout(() => n(null), By);
    return () => clearTimeout(r);
  }, [t]), {
    onShortcutRefused: Ve((r, a) => o(a.message), [o]),
    onCopyRefused: Ve(() => o(e("commands.notAllowed.doc-text-copy", { fallback: "Copying isn't allowed" })), [o, e]),
    element: /* @__PURE__ */ i("div", {
      role: "status",
      "aria-live": "polite",
      "data-epdf-refusal-notice": "",
      className: "pointer-events-none absolute inset-x-0 bottom-16 z-30 flex justify-center",
      children: t && /* @__PURE__ */ i("div", {
        className: "border-border-subtle bg-elevated/95 text-fg rounded-full border px-4 py-1.5 text-sm shadow-lg backdrop-blur",
        children: t.message
      }, t.count)
    })
  };
}
function jy() {
  return /* @__PURE__ */ i(ig, { children: ({ angle: e }) => /* @__PURE__ */ i("div", {
    className: "pointer-events-none whitespace-nowrap rounded bg-black/80 px-1.5 py-0.5 font-mono text-xs text-white",
    children: [e, "°"]
  }) });
}
const Hy = 12, Uy = 38;
function Gy() {
  const e = Q(), { touch: t } = ut(), n = Aa("selection"), o = Da(n);
  return !n || !o ? null : /* @__PURE__ */ i(Qh, {
    placement: "bottom",
    gap: t ? Uy : Hy,
    children: /* @__PURE__ */ i(Za, {
      bar: n,
      view: o,
      label: e("commands.selection.strip")
    })
  });
}
const Wy = 12;
function Vy() {
  const e = Q(), t = Aa("snapshot"), n = Da(t);
  return !t || !n ? null : /* @__PURE__ */ i(Gh, {
    placement: "bottom",
    gap: Wy,
    children: /* @__PURE__ */ i(Za, {
      bar: t,
      view: n,
      label: e("commands.snapshot.strip")
    })
  });
}
const qs = [
  {
    titleKey: "shortcuts.document",
    areas: ["document"]
  },
  {
    titleKey: "shortcuts.viewing",
    areas: [
      "page",
      "zoom",
      "view",
      "search",
      "panel",
      "menu",
      "mode",
      "help"
    ]
  },
  {
    titleKey: "shortcuts.editing",
    areas: [
      "history",
      "tool",
      "selection",
      "annotation",
      "snapshot",
      "redaction",
      "measurement",
      "outline"
    ]
  }
], Ys = "shortcuts.other", qy = /* @__PURE__ */ new Set([
  "selection",
  "annotation",
  "snapshot"
]), Xs = (e) => e.split(":")[0] ?? e;
function Yy(e, t) {
  const n = [...new Set(e.listShortcuts().map((r) => r.commandId))].flatMap((r) => {
    if (e.getRefusal(r, t)) return [];
    const a = e.resolveCommand(r, t);
    return !a || a.shortcuts.length === 0 ? [] : !a.visible && !qy.has(Xs(r)) ? [] : [{
      commandId: r,
      label: a.label,
      shortcuts: a.shortcuts
    }];
  }), o = (r) => qs.find((a) => a.areas.includes(Xs(r.commandId)))?.titleKey ?? Ys;
  return [...qs.map((r) => r.titleKey), Ys].map((r) => ({
    titleKey: r,
    rows: n.filter((a) => o(a) === r)
  })).filter((r) => r.rows.length > 0);
}
const Xy = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Zy() {
  const e = Qe(Ec);
  return e.isOpen ? /* @__PURE__ */ i(Jy, { onClose: e.close }) : null;
}
function Jy({ onClose: e }) {
  const t = Q(), n = Je(), o = ke(), r = _e() ?? void 0, a = le(() => Yy(o, r), Xy), s = Ro();
  return /* @__PURE__ */ i(Ua, {
    labelledBy: n,
    onClose: e,
    className: "border-border bg-surface w-96 rounded-lg border p-4 shadow-xl",
    children: /* @__PURE__ */ i("div", {
      "data-epdf-shortcuts": "",
      children: [/* @__PURE__ */ i("div", {
        className: "flex items-center justify-between gap-4",
        children: [/* @__PURE__ */ i("h2", {
          id: n,
          className: "text-fg text-base font-semibold",
          children: t("commands.shortcuts")
        }), /* @__PURE__ */ i(Qc, {
          label: t("panel.close"),
          onClick: e,
          className: "text-fg-muted hover:bg-hover hover:text-fg grid h-7 w-7 place-items-center rounded-md",
          children: /* @__PURE__ */ i(Y, {
            name: "x",
            size: 16
          })
        })]
      }), a.map((l) => /* @__PURE__ */ i("section", {
        className: "mt-4",
        children: [/* @__PURE__ */ i("h3", {
          className: "text-fg-muted text-xs font-semibold",
          children: t(l.titleKey)
        }), /* @__PURE__ */ i("dl", {
          className: "mt-1",
          children: l.rows.map((d) => /* @__PURE__ */ i("div", {
            "data-epdf-shortcut": "",
            className: "flex items-center justify-between gap-4 py-1 text-sm",
            children: [/* @__PURE__ */ i("dt", {
              className: "text-fg min-w-0 truncate",
              children: d.label
            }), /* @__PURE__ */ i("dd", {
              className: "flex shrink-0 gap-1",
              children: d.shortcuts.map((c) => /* @__PURE__ */ i("kbd", {
                className: "border-border-subtle bg-surface-alt text-fg-secondary rounded border px-1.5 py-0.5 font-sans text-xs",
                children: al(c, { isMac: s })
              }, c))
            })]
          }, d.commandId))
        })]
      }, l.titleKey))]
    })
  });
}
function Qy() {
  return Yh((e) => e.status), fc((e) => e.status), null;
}
function e2() {
  const e = Yg();
  return qn((t) => t.onTargetChanged, (t) => {
    t.field && e.open("signatures");
  }), qn((t) => t.onSignRequested, (t) => e.open("signature-sign", {
    exclusive: "modal",
    props: {
      field: t.field,
      mark: t.mark
    }
  })), qn((t) => t.onInspectionRequested, (t) => e.open("signature-inspector", { props: { field: t.field } })), qn((t) => t.onInvalidationPredicted, () => e.open("signatures")), null;
}
function t2() {
  const e = Gb(), t = Uo((n) => n.documents.some((o) => o.hasUnsavedChanges));
  return E(() => {
    if (!e || !t) return;
    const n = (o) => {
      o.preventDefault(), o.returnValue = "";
    };
    return window.addEventListener("beforeunload", n), () => window.removeEventListener("beforeunload", n);
  }, [e, t]), null;
}
function n2({ name: e, onCancel: t, onClose: n }) {
  const o = Q(), r = Je();
  return /* @__PURE__ */ i(Ua, {
    labelledBy: r,
    onClose: t,
    className: "border-border bg-surface w-96 rounded-lg border p-4 shadow-xl",
    children: [
      /* @__PURE__ */ i("h2", {
        id: r,
        className: "text-fg text-base font-semibold",
        children: o("closeUnsaved.title")
      }),
      /* @__PURE__ */ i("p", {
        className: "text-fg-muted mt-2 text-sm",
        children: o("closeUnsaved.body", { params: { name: e } })
      }),
      /* @__PURE__ */ i("div", {
        className: "mt-4 flex justify-end gap-2",
        children: [/* @__PURE__ */ i("button", {
          type: "button",
          onClick: t,
          className: "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm",
          children: o("closeUnsaved.cancel")
        }), /* @__PURE__ */ i("button", {
          type: "button",
          onClick: n,
          className: "rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700",
          children: o("closeUnsaved.close")
        })]
      })
    ]
  });
}
function o2({ visibility: e }) {
  const { setActive: t, close: n } = Sa(), { documents: o, activeId: r } = Uo(), a = Q(), [s, l] = C(null);
  if (!(e === "always" || e === "multiple" && o.length > 1)) return null;
  const d = (c, p) => {
    c.hasUnsavedChanges ? l({
      id: c.id,
      name: p
    }) : n(c.id);
  };
  return /* @__PURE__ */ i("div", {
    className: "bg-surface-alt flex items-end pr-2 pt-2",
    children: [/* @__PURE__ */ i("div", {
      className: "flex flex-1 items-end overflow-x-auto pl-4",
      children: o.map((c) => {
        const p = r === c.id, f = c.name ?? a("tabs.untitled", { params: { id: c.id.slice(0, 8) } });
        return /* @__PURE__ */ i("div", {
          onClick: () => t(c.id),
          role: "tab",
          part: p ? "tab tab-active" : "tab",
          tabIndex: 0,
          "aria-selected": p,
          onKeyDown: (u) => {
            (u.key === "Enter" || u.key === " ") && (u.preventDefault(), t(c.id));
          },
          className: `group relative flex min-w-[120px] max-w-[240px] cursor-pointer items-center gap-2 rounded-t-lg px-4 py-2 text-sm font-medium transition-all ${p ? "bg-surface text-fg z-10" : "bg-surface-alt text-fg-secondary hover:bg-hover hover:text-fg"}`,
          children: [
            c.status === "loading" && /* @__PURE__ */ i("span", {
              className: "border-border-subtle border-t-accent h-3 w-3 flex-shrink-0 animate-spin rounded-full border",
              "aria-label": a("tabs.loading")
            }),
            c.status === "locked" && /* @__PURE__ */ i(Y, {
              name: "lock",
              size: 13,
              className: "text-fg-muted flex-shrink-0"
            }),
            c.status === "error" && c.openRequest && /* @__PURE__ */ i(Y, {
              name: "lock",
              size: 13,
              className: "text-fg-muted flex-shrink-0"
            }),
            c.status === "error" && !c.openRequest && /* @__PURE__ */ i(qo, {
              content: { label: a(Wr(c.error)) },
              children: (u) => /* @__PURE__ */ i("span", {
                ...u,
                className: "flex flex-shrink-0",
                role: "img",
                "aria-label": a(Wr(c.error)),
                children: /* @__PURE__ */ i(Y, {
                  name: "alertTriangle",
                  size: 13,
                  className: "text-red-500"
                })
              })
            }),
            /* @__PURE__ */ i("span", {
              className: "min-w-0 flex-1 truncate",
              children: f
            }),
            p && o.length > 1 && /* @__PURE__ */ i("button", {
              type: "button",
              onClick: (u) => {
                u.stopPropagation(), d(c, f);
              },
              "aria-label": a("tabs.close", { params: { name: f } }),
              className: "hover:bg-hover flex-shrink-0 cursor-pointer rounded-full p-1 opacity-100 transition-all",
              children: /* @__PURE__ */ i(Y, {
                name: "x",
                size: 14
              })
            })
          ]
        }, c.id);
      })
    }), s && /* @__PURE__ */ i(n2, {
      name: s.name,
      onCancel: () => l(null),
      onClose: () => {
        l(null), n(s.id);
      }
    })]
  });
}
const ro = 40, Wd = {
  x: 8,
  y: 28
}, po = "#1a1a1a", xn = "#ffffff", r2 = "#34a853";
function a2(e, t, n) {
  const o = Fc(e, n);
  if (!o) return null;
  const r = [], a = [];
  for (const s of o) {
    const l = typeof s == "string" ? {
      d: s,
      fill: void 0,
      stroke: void 0
    } : s, d = l.fill === !0 ? po : l.fill ? t?.[l.fill] : void 0, c = l.stroke ? t?.[l.stroke] ?? po : l.fill ? "none" : po;
    r.push(`<path d="${l.d}" fill="none" stroke="${xn}" stroke-width="3.5"/>`);
    const p = [
      ["stroke-width", l.strokeWidth],
      ["stroke-dasharray", l.strokeDasharray],
      ["stroke-opacity", l.strokeOpacity],
      ["fill-opacity", l.fillOpacity]
    ].filter(([, f]) => f !== void 0).map(([f, u]) => `${f}="${u}"`).join(" ");
    a.push(`<path d="${l.d}" fill="${d ?? "none"}" stroke="${c}" ${p}/>`);
  }
  return r.join("") + a.join("");
}
const mn = (e, t, n, o) => `<line x1="${e}" y1="${t}" x2="${n}" y2="${o}" stroke="${xn}" stroke-width="3"/><line x1="${e}" y1="${t}" x2="${n}" y2="${o}" stroke="${po}" stroke-width="1.25"/>`;
function i2(e) {
  const { x: t, y: n } = Wd;
  return e === "crosshair" ? mn(t, n - 6, t, n + 6) + mn(t - 6, n, t + 6, n) : e === "ibeam" ? mn(t, n - 6.5, t, n + 6.5) + mn(t - 2.5, n - 6.5, t + 2.5, n - 6.5) + mn(t - 2.5, n + 6.5, t + 2.5, n + 6.5) : `<circle cx="${t}" cy="${n}" r="7.5" fill="${r2}" stroke="${xn}" stroke-width="1.5"/><line x1="${t}" y1="${n - 3.5}" x2="${t}" y2="${n + 3.5}" stroke="${xn}" stroke-width="2"/><line x1="${t - 3.5}" y1="${n}" x2="${t + 3.5}" y2="${n}" stroke="${xn}" stroke-width="2"/>`;
}
function s2(e, t, n, o) {
  const r = a2(t, n, o);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${ro}" height="${ro}" viewBox="0 0 ${ro} ${ro}" fill="none" stroke-linecap="round" stroke-linejoin="round">` + i2(e) + (r ? `<g transform="translate(17 3) scale(${(20 / 24).toFixed(4)})" stroke-width="2">${r}</g>` : "") + "</svg>";
}
const l2 = {
  crosshair: "crosshair",
  text: "ibeam",
  copy: "plus"
};
function c2() {
  const e = Xh((s) => s.activeToolId) ?? "pointer", t = xg(e), n = Dc(), o = yg().tools.get(e)?.ghost ? void 0 : Ut[e], r = (s) => t[s] ?? void 0, a = o?.accent ? {
    primary: r(o.accent.primary),
    secondary: o.accent.secondary ? r(o.accent.secondary) : void 0
  } : void 0;
  return Zh(o ? {
    toolId: e,
    cursors: Object.fromEntries(Object.entries(l2).map(([s, l]) => [s, {
      svg: s2(l, o.icon, a, n),
      hotspot: Wd
    }]))
  } : null), null;
}
const d2 = () => Qe("redact-confirm").isOpen, u2 = () => Cg((e) => e.calibrationRequest !== null), p2 = () => Qe("signature-sign").isOpen, f2 = () => Qe("signature-maker").isOpen, m2 = () => Qe("signature-inspector").isOpen, h2 = () => Qe("print").isOpen, g2 = me(() => import("./redact-confirm-C0AI8Tbt-Cbju2sek.js").then((e) => e.RedactConfirmModal), { shownWhile: d2 }), b2 = me(() => import("./measurement-6M_KEsFK-Bw9_NzWx.js").then((e) => e.CalibrationDialog), { shownWhile: u2 }), v2 = me(() => import("./sign-dialog-DETgmjof-CFdMBob_.js").then((e) => e.SignDialog), { shownWhile: p2 }), w2 = me(() => import("./signature-maker-CnLiLraV-CuBdj7zM.js").then((e) => e.SignatureMakerModal), { shownWhile: f2 }), y2 = me(() => import("./signature-inspector-PcOYwkvA-CNbyzJ36.js").then((e) => e.SignatureInspector), { shownWhile: m2 }), _2 = me(() => import("./print-dialog-Cx4W9E8--RwbM3d9Y.js").then((e) => e.PrintDialog), { shownWhile: h2 }), x2 = () => Qe(Oc).isOpen, Zs = me(() => import("./grant-prompt-Co4bzHaR-BWhYzDFb.js").then((e) => e.GrantPrompt), { prefetch: !1 }), k2 = () => _o((e) => e.identityRequest !== void 0), S2 = me(() => import("./grant-prompt-Co4bzHaR-BWhYzDFb.js").then((e) => e.VisitorIdentityDialog), {
  shownWhile: k2,
  prefetch: !1
}), M2 = me(() => import("./outline-properties-D8sxr4I4-DAOfIx49.js").then((e) => e.OutlinePropertiesDialog), { shownWhile: x2 });
function O2() {
  const e = wu(tt().data);
  return e === "never" ? null : /* @__PURE__ */ i("slot", {
    name: "tabs",
    children: /* @__PURE__ */ i(o2, { visibility: e })
  });
}
function P2() {
  const e = Q();
  return /* @__PURE__ */ i("div", {
    className: "grid h-full w-full place-items-center",
    children: /* @__PURE__ */ i("div", {
      className: "text-fg-muted flex flex-col items-center gap-3",
      children: [/* @__PURE__ */ i("div", { className: "border-border-subtle border-t-accent h-8 w-8 animate-spin rounded-full border-2" }), /* @__PURE__ */ i("div", {
        className: "text-sm",
        children: e("demo.opening")
      })]
    })
  });
}
function T2({ children: e }) {
  const t = _e(), n = _o((r) => r.status), o = _o((r) => r.openRequest !== void 0);
  return t === null ? /* @__PURE__ */ i("div", {
    className: "min-w-0 flex-1 overflow-auto",
    children: /* @__PURE__ */ i("slot", { name: "empty" })
  }) : n === "locked" ? /* @__PURE__ */ i(Fw, {}, t) : n === "error" ? o ? /* @__PURE__ */ i(Zs, {}, t) : /* @__PURE__ */ i(Bw, {}, t) : /* @__PURE__ */ i(xh, {
    fallback: /* @__PURE__ */ i(P2, {}),
    children: [e, o && /* @__PURE__ */ i("div", {
      className: "absolute inset-0 z-40",
      children: /* @__PURE__ */ i(Zs, {}, t)
    })]
  });
}
function C2({ children: e }) {
  const { dir: t } = ut();
  return /* @__PURE__ */ i("div", {
    dir: t,
    className: "contents",
    children: e
  });
}
function E2({ components: e }) {
  const t = Ky(), n = k(null);
  return qg({
    target: n,
    onRefused: t.onShortcutRefused
  }), wg(), m1(), /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i(Ew, {}), /* @__PURE__ */ i(tw, {
    rootRef: n,
    className: "bg-app text-fg flex h-full flex-col outline-none",
    children: [
      e && /* @__PURE__ */ i(Fy, { components: e }),
      /* @__PURE__ */ i(Av, {}),
      /* @__PURE__ */ i(t2, {}),
      /* @__PURE__ */ i("slot", { name: "header" }),
      /* @__PURE__ */ i(O2, {}),
      /* @__PURE__ */ i(to, { edge: "top" }),
      /* @__PURE__ */ i("div", {
        className: "relative flex min-h-0 flex-1",
        children: [
          t.element,
          /* @__PURE__ */ i(to, { edge: "start" }),
          /* @__PURE__ */ i(Kw, {
            className: "relative flex min-w-0 flex-1",
            children: /* @__PURE__ */ i(T2, { children: [
              /* @__PURE__ */ i(Ws, { side: "start" }),
              /* @__PURE__ */ i("div", {
                className: "relative min-w-0 flex-1",
                children: [
                  /* @__PURE__ */ i(c2, {}),
                  /* @__PURE__ */ i(tg, {
                    target: n,
                    onRefused: t.onCopyRefused
                  }),
                  /* @__PURE__ */ i(dc, {
                    overlay: /* @__PURE__ */ i(C2, { children: [
                      /* @__PURE__ */ i(xw, {}),
                      /* @__PURE__ */ i(zw, {}),
                      /* @__PURE__ */ i(jy, {}),
                      /* @__PURE__ */ i(Gy, {}),
                      /* @__PURE__ */ i(Vy, {}),
                      /* @__PURE__ */ i(y2, {}),
                      /* @__PURE__ */ i(eg, {}),
                      /* @__PURE__ */ i($r, { axis: "y" }),
                      /* @__PURE__ */ i($r, { axis: "x" })
                    ] }),
                    className: "h-full w-full",
                    style: {
                      background: "var(--epdf-canvas)",
                      direction: "ltr"
                    },
                    children: () => /* @__PURE__ */ i(D, { children: [
                      /* @__PURE__ */ i(pc, {}),
                      /* @__PURE__ */ i(Bd, {}),
                      /* @__PURE__ */ i(Jh, {}),
                      /* @__PURE__ */ i(h1, {}),
                      /* @__PURE__ */ i(Gg, {}),
                      /* @__PURE__ */ i(bg, {}),
                      /* @__PURE__ */ i(Kg, {}),
                      /* @__PURE__ */ i(Wh, {})
                    ] })
                  })
                ]
              }),
              /* @__PURE__ */ i(Ws, { side: "end" }),
              /* @__PURE__ */ i(g2, {}),
              /* @__PURE__ */ i(b2, {}),
              /* @__PURE__ */ i(jw, {}),
              /* @__PURE__ */ i(_2, {}),
              /* @__PURE__ */ i(M2, {}),
              /* @__PURE__ */ i(Zy, {}),
              /* @__PURE__ */ i(e2, {}),
              /* @__PURE__ */ i(Qy, {}),
              /* @__PURE__ */ i(Rw, {}),
              /* @__PURE__ */ i(v2, {}),
              /* @__PURE__ */ i(w2, {}),
              /* @__PURE__ */ i(S2, {})
            ] })
          }),
          /* @__PURE__ */ i(to, { edge: "end" })
        ]
      }),
      /* @__PURE__ */ i(to, { edge: "bottom" }),
      /* @__PURE__ */ i("slot", { name: "footer" })
    ]
  })] });
}
function A2({ slot: e, onReady: t, onDocumentChange: n }) {
  const o = dt();
  return R(() => {
    const r = e.attach(o);
    if (t?.(r), n) {
      r.watch(() => r.documents.getActiveId(), (s) => n(s));
      const a = r.documents.getActiveId();
      a !== null && n(a);
    }
    return () => e.release(o);
  }, [o]), null;
}
const Js = /* @__PURE__ */ new Set(), Qs = (e, t) => e.length === t.length && e.every((n, o) => n === t[o]);
function Vd(e, t, n) {
  const o = a0(e, t), r = i0(e, t), a = (s, l) => l?.length ? [.../* @__PURE__ */ new Set([...s, ...l])] : s;
  return {
    disabled: {
      disabledCategories: a(o.disabledCategories, n.commands?.disabledCategories),
      disabledCommands: a(o.disabledCommands, n.commands?.disabledCommands)
    },
    byHand: {
      editable: Os(n.annotation?.editable ?? !0, r.editable),
      fillable: Os(n.form?.fillable ?? !0, r.fillable)
    }
  };
}
function N2({ registered: e, settings: t, yours: n, locale: o, features: r, disable: a, readOnly: s, appState: l }) {
  const d = dt(), c = k(e);
  return R(() => {
    const { disabled: p, byHand: f } = Vd({
      features: r,
      disable: a,
      readOnly: s
    }, n, t), u = c.current;
    c.current = {
      locale: o,
      disabled: p,
      byHand: f,
      appState: l
    }, Object.is(u.appState, l) || d.capability($e).updateSettings({ appState: l }), Ps(u.byHand.editable, f.editable) || d.settingsOf(ye).updateSettings({ editable: f.editable }), Ps(u.byHand.fillable, f.fillable) || d.settingsOf(tn).updateSettings({ fillable: f.fillable }), (!Qs(u.disabled.disabledCategories, p.disabledCategories) || !Qs(u.disabled.disabledCommands, p.disabledCommands)) && d.capability($e).updateSettings(p), u.locale !== o && d.capability($o).setLocale(o).catch(() => {
    });
  }), null;
}
function L2() {
  return /* @__PURE__ */ i("div", {
    className: "bg-app text-fg-muted grid h-full place-items-center",
    children: /* @__PURE__ */ i("div", {
      className: "animate-pulse text-sm",
      children: Q()("demo.starting")
    })
  });
}
function el({ engine: e, initialDocuments: t, fetch: n, fallback: o, commands: r, appState: a, icons: s, strings: l, locale: d = "auto", features: c, disable: p, readOnly: f, scope: u, identity: m, notAllowed: g, layout: h, size: b, touch: y, plugins: v, fonts: _, warnBeforeLeaving: P, theme: S, themeTarget: x, components: O, onReady: M, onDocumentChange: T, onPanelResize: L }) {
  const [B] = C(ud), [I] = C(() => {
    const ne = E1(v), { locales: nt, loaders: ln, codes: St } = dv(l), ot = ne.settings.i18n?.fallbackLocale, A = rv(ot, St), ie = A === null ? [`the viewer has no language "${ot}" to fall back to, so it falls back to English: give its words in \`strings\``] : [], ve = { ...Ga };
    for (const { name: Ne, plugin: jn } of ne.own) jn.token && (ve[Ne] = jn.token);
    const Se = M1(ve), Mt = new Set(us.map((Ne) => Ne.id)), Ot = Kb([...us, ...Lb(ne.settings.annotation?.tools ?? [], (Ne) => Mt.has(Ne))], r ?? [], {
      plugins: ve,
      viewer: Se.current
    }, { isMac: Ro() }), Kn = (r ?? []).flatMap((Ne) => Ne.categories ?? []);
    return {
      slot: Se,
      viewerCommands: Ot,
      layout: h,
      size: b,
      touch: y,
      icons: s ?? {},
      stamp: ne.viewer.stamp,
      signature: ne.viewer.signature,
      fonts: _ ?? [],
      warnBeforeLeaving: P !== !1,
      onPanelResize: L,
      i18n: {
        locales: nt,
        loaders: ln,
        codes: St,
        fallback: A ?? "en",
        initial: gs(d, St, A ?? "en")
      },
      plugins: {
        ...ne,
        problems: [...ne.problems, ...ie]
      },
      tokens: ve,
      yourCategories: Kn,
      ...Vd({
        features: c,
        disable: p,
        readOnly: f
      }, Kn, ne.settings),
      appState: a
    };
  });
  E(() => {
  }, [I]), E(() => {
    for (const ne of I.plugins.problems) console.warn(`[embedpdf] plugins: ${ne}`);
  }, [I]), E(() => {
    for (const ne of r0(c, I.yourCategories))
      Js.has(ne) || (Js.add(ne), console.warn(`[embedpdf] features: no feature or part is called "${ne}"`));
  }, [c, I]);
  const { settings: K } = I.plugins, [te] = C(() => [
    bi(Is({ layout: "vertical" }, K.stage)),
    bi({
      layout: "grid",
      columns: "auto",
      sizing: "uniform",
      zoom: { pageWidth: 150 },
      padding: 20,
      responsive: [],
      gap: { px: 16 },
      pageFrame: {
        top: 0,
        right: 0,
        bottom: 20,
        left: 0
      },
      fitAlign: {
        x: "center",
        y: "start"
      },
      scrollBehavior: "instant",
      interaction: !1,
      zoomGestures: !1,
      ...K.thumbnails,
      id: "stage-thumbs",
      token: _n
    }),
    Pf(K.render),
    Qf(),
    Sm(),
    xm(),
    Yf(),
    Zf(),
    kf(K.interaction),
    Sf({ provider: pf }),
    Vf(K.selection),
    jf({
      ...K.annotation,
      tools: [
        {
          id: "square",
          ghost: !0
        },
        {
          id: "circle",
          ghost: !0
        },
        {
          id: "line",
          ghost: !0
        },
        {
          id: "arrow",
          extends: "line",
          defaults: { lineEndings: {
            start: "none",
            end: "open-arrow"
          } }
        },
        {
          id: "image",
          extends: "stamp",
          source: {
            kind: "prompt",
            accept: "image/png,image/jpeg"
          }
        },
        ...K.annotation?.tools ?? []
      ],
      editable: I.byHand.editable
    }),
    Ff(),
    Rf({
      fonts: f1(I.signature.fonts),
      ...K.stamp
    }),
    hm(Is({ javascript: { enabled: !0 } }, K.actions)),
    Kf({
      ...K.form,
      fillable: I.byHand.fillable
    }),
    om(K.signature),
    zf(),
    Tf(K.redaction),
    Af(K.measurement),
    ym(K.search),
    $f({
      locale: I.i18n.initial,
      fallbackLocale: I.i18n.fallback,
      locales: I.i18n.locales,
      loaders: I.i18n.loaders
    }),
    cu({
      ...K.commands,
      commands: [...I.viewerCommands.commands, ...K.commands?.commands ?? []],
      ...I.appState === void 0 ? {} : { appState: I.appState },
      ...I.disabled,
      ...g ? { notAllowed: g } : {}
    }),
    _f(),
    ...I.plugins.own.map(({ plugin: ne }) => ne)
  ]), Fe = I;
  return /* @__PURE__ */ i(c1, {
    preference: Cd(S).preference,
    target: x,
    children: /* @__PURE__ */ i(Mh, {
      engine: e,
      plugins: te,
      initialDocuments: t,
      fetch: n,
      scope: u,
      identity: m,
      fallback: o ?? /* @__PURE__ */ i(L2, {}),
      onReady: (ne) => void I.slot.attach(ne),
      children: /* @__PURE__ */ i(jb, {
        value: Fe,
        children: [
          /* @__PURE__ */ i(N2, {
            registered: {
              locale: I.i18n.initial,
              disabled: I.disabled,
              byHand: I.byHand,
              appState: I.appState
            },
            settings: K,
            yours: I.yourCategories,
            locale: gs(d, I.i18n.codes, I.i18n.fallback),
            features: c,
            disable: p,
            readOnly: f,
            appState: a
          }),
          /* @__PURE__ */ i(A2, {
            slot: I.slot,
            onReady: M,
            onDocumentChange: T
          }),
          /* @__PURE__ */ i(M0, {
            value: B,
            children: /* @__PURE__ */ i(uv, {
              locale: d,
              children: /* @__PURE__ */ i(E2, { components: O })
            })
          })
        ]
      })
    })
  });
}
const I2 = /* @__PURE__ */ new Set([
  "src",
  "theme",
  "locale",
  "features",
  "disable",
  "readOnly",
  "fetch",
  "appState"
]), R2 = (e) => I2.has(e), tl = (e) => {
  if (typeof e != "object" || e === null) return !1;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
};
function qr(e, t) {
  return Object.is(e, t) ? !0 : Array.isArray(e) && Array.isArray(t) ? e.length === t.length && e.every((n, o) => qr(n, t[o])) : tl(e) && tl(t) ? [.../* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)])].every((o) => qr(e[o], t[o])) : !1;
}
function D2(e, t) {
  const n = e, o = t;
  return [.../* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(o)])].filter((a) => !qr(n[a], o[a]));
}
function $2(e, t) {
  if (!e) return t;
  const n = { ...e };
  for (const [o, r] of Object.entries(t ?? {})) {
    const a = e[o];
    n[o] = a && r && Object.getPrototypeOf(r) === Object.prototype ? { ...a, ...r } : r;
  }
  return n;
}
const er = (e) => typeof e == "object" && "kind" in e, z2 = (e) => typeof e == "string" || e instanceof ArrayBuffer || e instanceof Uint8Array || typeof Blob < "u" && e instanceof Blob;
function F2(e) {
  return (typeof e == "string" ? decodeURIComponent(e.split("?")[0].split("/").pop() ?? "") : typeof File < "u" && e instanceof File ? e.name : "").replace(/\.pdf$/i, "") || "Document";
}
const qd = (e) => typeof e == "string" ? e : er(e) ? "id" in e && typeof e.id == "string" ? e.id : "document" : typeof File < "u" && e instanceof File ? e.name : "document";
function Yd(e, t, n = Promise.resolve()) {
  if (er(e))
    return {
      source: async () => (await n, e)
    };
  if (!z2(e))
    return {
      source: async () => {
        throw new go("invalid-input", "documents", "this viewer can't open that document");
      }
    };
  const o = F2(e);
  return typeof e == "string" ? { name: o, source: async () => ({ kind: "url", url: e, id: t }) } : {
    name: o,
    source: async () => {
      const r = e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : new Uint8Array(e);
      if (!wf(r)) throw new go("invalid-input", "documents", `${o} isn't a PDF`);
      return { kind: "bytes", id: t, bytes: r };
    }
  };
}
function B2(e, t = (n) => n) {
  const n = /* @__PURE__ */ new Set(), o = (r) => {
    let a = r;
    for (let s = 2; n.has(a); s++) a = `${r}#${s}`;
    return n.add(a), a;
  };
  return e.map(({ src: r, name: a, password: s, active: l }) => {
    const d = t(r);
    return {
      ...er(d) ? { source: d } : Yd(d, o(qd(d))),
      ...a !== void 0 ? { name: a } : {},
      ...s !== void 0 ? { password: s } : {},
      ...l ? { active: l } : {}
    };
  });
}
function K2(e, t) {
  if (!t) return e;
  const n = { ...e };
  for (const [o, r] of Object.entries(t)) r !== void 0 && (n[o] = r);
  return n;
}
function j2(e) {
  const t = {}, n = e.getAttribute("src"), o = e.getAttribute("locale"), r = e.getAttribute("theme");
  return n && (t.src = n), o && (t.locale = o), (r === "light" || r === "dark" || r === "system") && (t.theme = r), t;
}
const H2 = '/*! tailwindcss v4.1.18 | MIT License | https://tailwindcss.com */@layer properties{*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-pan-x:initial;--tw-pan-y:initial;--tw-pinch-zoom:initial;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-duration:initial;--tw-ease:initial;--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-red-400:oklch(70.4% .191 22.216);--color-red-500:oklch(63.7% .237 25.331);--color-red-600:oklch(57.7% .245 27.325);--color-red-700:oklch(50.5% .213 27.518);--color-amber-600:oklch(66.6% .179 58.318);--color-amber-700:oklch(55.5% .163 48.998);--color-green-600:oklch(62.7% .194 149.214);--color-black:#000;--color-white:#fff;--spacing:4px;--container-sm:384px;--text-xs:12px;--text-xs--line-height:calc(1/.75);--text-sm:14px;--text-sm--line-height:calc(1.25/.875);--text-base:16px;--text-base--line-height: 1.5 ;--text-lg:18px;--text-lg--line-height:calc(1.75/1.125);--font-weight-normal:400;--font-weight-medium:500;--font-weight-semibold:600;--tracking-normal:0em;--tracking-wide:.025em;--ease-out:cubic-bezier(0,0,.2,1);--animate-spin:spin 1s linear infinite;--animate-pulse:pulse 2s cubic-bezier(.4,0,.6,1)infinite;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.pointer-events-auto{pointer-events:auto}.pointer-events-none{pointer-events:none}.collapse{visibility:collapse}.invisible{visibility:hidden}.visible{visibility:visible}.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.sticky{position:sticky}.inset-0{inset:calc(var(--spacing)*0)}.inset-1{inset:calc(var(--spacing)*1)}.inset-2{inset:calc(var(--spacing)*2)}.inset-x-0{inset-inline:calc(var(--spacing)*0)}.inset-x-2{inset-inline:calc(var(--spacing)*2)}.inset-y-0{inset-block:calc(var(--spacing)*0)}.inset-y-1{inset-block:calc(var(--spacing)*1)}.-start-1{inset-inline-start:calc(var(--spacing)*-1)}.start-0{inset-inline-start:calc(var(--spacing)*0)}.start-2{inset-inline-start:calc(var(--spacing)*2)}.-end-1{inset-inline-end:calc(var(--spacing)*-1)}.end-0{inset-inline-end:calc(var(--spacing)*0)}.end-1{inset-inline-end:calc(var(--spacing)*1)}.end-2{inset-inline-end:calc(var(--spacing)*2)}.end-4{inset-inline-end:calc(var(--spacing)*4)}.top-0{top:calc(var(--spacing)*0)}.top-1{top:calc(var(--spacing)*1)}.top-2{top:calc(var(--spacing)*2)}.top-4{top:calc(var(--spacing)*4)}.bottom-16{bottom:calc(var(--spacing)*16)}.isolate{isolation:isolate}.z-10{z-index:10}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.z-\\[35\\]{z-index:35}.col-start-1{grid-column-start:1}.row-start-1{grid-row-start:1}.container{width:100%}@media(min-width:640px){.container{max-width:640px}}@media(min-width:768px){.container{max-width:768px}}@media(min-width:1024px){.container{max-width:1024px}}@media(min-width:1280px){.container{max-width:1280px}}@media(min-width:1536px){.container{max-width:1536px}}.m-0{margin:calc(var(--spacing)*0)}.my-1{margin-block:calc(var(--spacing)*1)}.-ms-1\\.5{margin-inline-start:calc(var(--spacing)*-1.5)}.ms-1{margin-inline-start:calc(var(--spacing)*1)}.ms-1\\.5{margin-inline-start:calc(var(--spacing)*1.5)}.ms-4{margin-inline-start:calc(var(--spacing)*4)}.me-1\\.5{margin-inline-end:calc(var(--spacing)*1.5)}.mt-0\\.5{margin-top:calc(var(--spacing)*.5)}.mt-1{margin-top:calc(var(--spacing)*1)}.mt-1\\.5{margin-top:calc(var(--spacing)*1.5)}.mt-2{margin-top:calc(var(--spacing)*2)}.mt-2\\.5{margin-top:calc(var(--spacing)*2.5)}.mt-3{margin-top:calc(var(--spacing)*3)}.mt-4{margin-top:calc(var(--spacing)*4)}.mt-5{margin-top:calc(var(--spacing)*5)}.mt-6{margin-top:calc(var(--spacing)*6)}.mb-1{margin-bottom:calc(var(--spacing)*1)}.mb-1\\.5{margin-bottom:calc(var(--spacing)*1.5)}.mb-2{margin-bottom:calc(var(--spacing)*2)}.mb-3{margin-bottom:calc(var(--spacing)*3)}.mb-4{margin-bottom:calc(var(--spacing)*4)}.mb-5{margin-bottom:calc(var(--spacing)*5)}.box-border{box-sizing:border-box}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-flex{display:inline-flex}.table{display:table}.aspect-square{aspect-ratio:1}.h-0{height:calc(var(--spacing)*0)}.h-0\\.5{height:calc(var(--spacing)*.5)}.h-1{height:calc(var(--spacing)*1)}.h-1\\.5{height:calc(var(--spacing)*1.5)}.h-3{height:calc(var(--spacing)*3)}.h-4{height:calc(var(--spacing)*4)}.h-5{height:calc(var(--spacing)*5)}.h-6{height:calc(var(--spacing)*6)}.h-7{height:calc(var(--spacing)*7)}.h-8{height:calc(var(--spacing)*8)}.h-9{height:calc(var(--spacing)*9)}.h-16{height:calc(var(--spacing)*16)}.h-24{height:calc(var(--spacing)*24)}.h-full{height:100%}.h-px{height:1px}.max-h-48{max-height:calc(var(--spacing)*48)}.max-h-60{max-height:calc(var(--spacing)*60)}.max-h-full{max-height:100%}.min-h-0{min-height:calc(var(--spacing)*0)}.min-h-5{min-height:calc(var(--spacing)*5)}.min-h-11{min-height:calc(var(--spacing)*11)}.w-0\\.5{width:calc(var(--spacing)*.5)}.w-2{width:calc(var(--spacing)*2)}.w-3{width:calc(var(--spacing)*3)}.w-4{width:calc(var(--spacing)*4)}.w-5{width:calc(var(--spacing)*5)}.w-6{width:calc(var(--spacing)*6)}.w-7{width:calc(var(--spacing)*7)}.w-8{width:calc(var(--spacing)*8)}.w-9{width:calc(var(--spacing)*9)}.w-10{width:calc(var(--spacing)*10)}.w-24{width:calc(var(--spacing)*24)}.w-36{width:calc(var(--spacing)*36)}.w-64{width:calc(var(--spacing)*64)}.w-72{width:calc(var(--spacing)*72)}.w-80{width:calc(var(--spacing)*80)}.w-96{width:calc(var(--spacing)*96)}.w-\\[24rem\\]{width:384px}.w-\\[26rem\\]{width:416px}.w-auto{width:auto}.w-full{width:100%}.w-px{width:1px}.max-w-64{max-width:calc(var(--spacing)*64)}.max-w-\\[16rem\\]{max-width:256px}.max-w-\\[180px\\]{max-width:180px}.max-w-\\[240px\\]{max-width:240px}.max-w-\\[calc\\(100\\%-1rem\\)\\]{max-width:calc(100% - 16px)}.max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 32px)}.max-w-full{max-width:100%}.max-w-sm{max-width:var(--container-sm)}.min-w-0{min-width:calc(var(--spacing)*0)}.min-w-8{min-width:calc(var(--spacing)*8)}.min-w-48{min-width:calc(var(--spacing)*48)}.min-w-52{min-width:calc(var(--spacing)*52)}.min-w-56{min-width:calc(var(--spacing)*56)}.min-w-\\[120px\\]{min-width:120px}.flex-1{flex:1}.flex-shrink-0{flex-shrink:0}.shrink{flex-shrink:1}.shrink-0{flex-shrink:0}.grow{flex-grow:1}.origin-top-left{transform-origin:0 0}.rotate-90{rotate:90deg}.transform{transform:var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,)}.animate-pulse{animation:var(--animate-pulse)}.animate-spin{animation:var(--animate-spin)}.cursor-col-resize{cursor:col-resize}.cursor-default{cursor:default}.cursor-grab{cursor:grab}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.touch-pan-x{--tw-pan-x:pan-x;touch-action:var(--tw-pan-x,)var(--tw-pan-y,)var(--tw-pinch-zoom,)}.touch-manipulation{touch-action:manipulation}.touch-none{touch-action:none}.resize{resize:both}.resize-none{resize:none}.appearance-none{appearance:none}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.grid-cols-\\[2fr_1fr\\]{grid-template-columns:2fr 1fr}.flex-col{flex-direction:column}.flex-col-reverse{flex-direction:column-reverse}.flex-nowrap{flex-wrap:nowrap}.flex-wrap{flex-wrap:wrap}.place-items-center{place-items:center}.items-baseline{align-items:baseline}.items-center{align-items:center}.items-end{align-items:flex-end}.items-start{align-items:flex-start}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.gap-0\\.5{gap:calc(var(--spacing)*.5)}.gap-1{gap:calc(var(--spacing)*1)}.gap-1\\.5{gap:calc(var(--spacing)*1.5)}.gap-2{gap:calc(var(--spacing)*2)}.gap-2\\.5{gap:calc(var(--spacing)*2.5)}.gap-3{gap:calc(var(--spacing)*3)}.gap-4{gap:calc(var(--spacing)*4)}.gap-5{gap:calc(var(--spacing)*5)}.gap-x-1{column-gap:calc(var(--spacing)*1)}.gap-x-1\\.5{column-gap:calc(var(--spacing)*1.5)}.gap-x-4{column-gap:calc(var(--spacing)*4)}.gap-y-0\\.5{row-gap:calc(var(--spacing)*.5)}.gap-y-2{row-gap:calc(var(--spacing)*2)}.gap-y-3{row-gap:calc(var(--spacing)*3)}.self-center{align-self:center}.self-start{align-self:flex-start}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-auto{overflow:auto}.overflow-clip{overflow:clip}.overflow-hidden{overflow:hidden}.overflow-visible{overflow:visible}.overflow-x-auto{overflow-x:auto}.overflow-x-hidden{overflow-x:hidden}.overflow-y-auto{overflow-y:auto}.overscroll-contain{overscroll-behavior:contain}.rounded{border-radius:calc(var(--epdf-radius)*2/3)}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:calc(var(--epdf-radius)*4/3)}.rounded-md{border-radius:var(--epdf-radius)}.rounded-none{border-radius:0}.rounded-sm{border-radius:calc(var(--epdf-radius)*2/3)}.rounded-xl{border-radius:calc(var(--epdf-radius)*2)}.rounded-xs{border-radius:calc(var(--epdf-radius)/2)}.rounded-t-2xl{border-top-left-radius:calc(var(--epdf-radius)*8/3);border-top-right-radius:calc(var(--epdf-radius)*8/3)}.rounded-t-lg{border-top-left-radius:calc(var(--epdf-radius)*4/3);border-top-right-radius:calc(var(--epdf-radius)*4/3)}.border{border-style:var(--tw-border-style);border-width:1px}.border-0{border-style:var(--tw-border-style);border-width:0}.border-2{border-style:var(--tw-border-style);border-width:2px}.border-x{border-inline-style:var(--tw-border-style);border-inline-width:1px}.border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-b-2{border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.border-dashed{--tw-border-style:dashed;border-style:dashed}.border-none{--tw-border-style:none;border-style:none}.border-accent{border-color:var(--epdf-accent)}.border-border,.border-border-strong{border-color:var(--epdf-border)}@supports (color:color-mix(in lab,red,red)){.border-border-strong{border-color:color-mix(in srgb,var(--epdf-border)75%,var(--epdf-text))}}.border-border-subtle{border-color:var(--epdf-border)}@supports (color:color-mix(in lab,red,red)){.border-border-subtle{border-color:color-mix(in srgb,var(--epdf-border)50%,var(--epdf-surface))}}.border-red-400{border-color:var(--color-red-400)}.border-red-500\\/40{border-color:#fb2c3666}@supports (color:color-mix(in lab,red,red)){.border-red-500\\/40{border-color:color-mix(in oklab,var(--color-red-500)40%,transparent)}}.border-transparent{border-color:#0000}.border-t-accent{border-top-color:var(--epdf-accent)}.border-b-accent{border-bottom-color:var(--epdf-accent)}.border-b-transparent{border-bottom-color:#0000}.bg-accent,.bg-accent-active{background-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.bg-accent-active{background-color:color-mix(in srgb,var(--epdf-accent)65%,black)}}.bg-accent-light,.bg-accent-light\\/60{background-color:var(--embedpdf-accent-tint)}@supports (color:color-mix(in lab,red,red)){.bg-accent-light\\/60{background-color:color-mix(in oklab,var(--embedpdf-accent-tint)60%,transparent)}}.bg-accent\\/10{background-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.bg-accent\\/10{background-color:color-mix(in oklab,var(--epdf-accent)10%,transparent)}}.bg-app{background-color:var(--epdf-background)}.bg-black\\/30{background-color:#0000004d}@supports (color:color-mix(in lab,red,red)){.bg-black\\/30{background-color:color-mix(in oklab,var(--color-black)30%,transparent)}}.bg-black\\/80{background-color:#000c}@supports (color:color-mix(in lab,red,red)){.bg-black\\/80{background-color:color-mix(in oklab,var(--color-black)80%,transparent)}}.bg-border,.bg-border-strong{background-color:var(--epdf-border)}@supports (color:color-mix(in lab,red,red)){.bg-border-strong{background-color:color-mix(in srgb,var(--epdf-border)75%,var(--epdf-text))}}.bg-border-subtle{background-color:var(--epdf-border)}@supports (color:color-mix(in lab,red,red)){.bg-border-subtle{background-color:color-mix(in srgb,var(--epdf-border)50%,var(--epdf-surface))}}.bg-elevated,.bg-elevated\\/95{background-color:var(--epdf-surface-raised)}@supports (color:color-mix(in lab,red,red)){.bg-elevated\\/95{background-color:color-mix(in oklab,var(--epdf-surface-raised)95%,transparent)}}.bg-hover{background-color:var(--epdf-hover)}.bg-red-500\\/10{background-color:#fb2c361a}@supports (color:color-mix(in lab,red,red)){.bg-red-500\\/10{background-color:color-mix(in oklab,var(--color-red-500)10%,transparent)}}.bg-red-600{background-color:var(--color-red-600)}.bg-selected{background-color:var(--embedpdf-accent-tint)}.bg-surface,.bg-surface-alt{background-color:var(--epdf-surface)}@supports (color:color-mix(in lab,red,red)){.bg-surface-alt{background-color:color-mix(in srgb,var(--epdf-surface),var(--epdf-text)6%)}}.bg-surface\\/60{background-color:var(--epdf-surface)}@supports (color:color-mix(in lab,red,red)){.bg-surface\\/60{background-color:color-mix(in oklab,var(--epdf-surface)60%,transparent)}}.bg-surface\\/80{background-color:var(--epdf-surface)}@supports (color:color-mix(in lab,red,red)){.bg-surface\\/80{background-color:color-mix(in oklab,var(--epdf-surface)80%,transparent)}}.bg-tooltip{background-color:var(--epdf-tooltip)}.bg-transparent{background-color:#0000}.object-contain{object-fit:contain}.p-0{padding:calc(var(--spacing)*0)}.p-1{padding:calc(var(--spacing)*1)}.p-2{padding:calc(var(--spacing)*2)}.p-3{padding:calc(var(--spacing)*3)}.p-4{padding:calc(var(--spacing)*4)}.p-5{padding:calc(var(--spacing)*5)}.p-6{padding:calc(var(--spacing)*6)}.p-8{padding:calc(var(--spacing)*8)}.p-\\[5px\\]{padding:5px}.px-1{padding-inline:calc(var(--spacing)*1)}.px-1\\.5{padding-inline:calc(var(--spacing)*1.5)}.px-2{padding-inline:calc(var(--spacing)*2)}.px-2\\.5{padding-inline:calc(var(--spacing)*2.5)}.px-3{padding-inline:calc(var(--spacing)*3)}.px-4{padding-inline:calc(var(--spacing)*4)}.py-0\\.5{padding-block:calc(var(--spacing)*.5)}.py-1{padding-block:calc(var(--spacing)*1)}.py-1\\.5{padding-block:calc(var(--spacing)*1.5)}.py-2{padding-block:calc(var(--spacing)*2)}.py-2\\.5{padding-block:calc(var(--spacing)*2.5)}.py-4{padding-block:calc(var(--spacing)*4)}.py-8{padding-block:calc(var(--spacing)*8)}.py-10{padding-block:calc(var(--spacing)*10)}.ps-2{padding-inline-start:calc(var(--spacing)*2)}.ps-2\\.5{padding-inline-start:calc(var(--spacing)*2.5)}.ps-3{padding-inline-start:calc(var(--spacing)*3)}.ps-7{padding-inline-start:calc(var(--spacing)*7)}.ps-8{padding-inline-start:calc(var(--spacing)*8)}.pe-1{padding-inline-end:calc(var(--spacing)*1)}.pe-2{padding-inline-end:calc(var(--spacing)*2)}.pe-2\\.5{padding-inline-end:calc(var(--spacing)*2.5)}.pe-7{padding-inline-end:calc(var(--spacing)*7)}.pe-9{padding-inline-end:calc(var(--spacing)*9)}.pt-1\\.5{padding-top:calc(var(--spacing)*1.5)}.pt-2{padding-top:calc(var(--spacing)*2)}.pt-3{padding-top:calc(var(--spacing)*3)}.pt-4{padding-top:calc(var(--spacing)*4)}.pr-2{padding-right:calc(var(--spacing)*2)}.pb-0{padding-bottom:calc(var(--spacing)*0)}.pb-1{padding-bottom:calc(var(--spacing)*1)}.pb-1\\.5{padding-bottom:calc(var(--spacing)*1.5)}.pb-3{padding-bottom:calc(var(--spacing)*3)}.pl-4{padding-left:calc(var(--spacing)*4)}.text-center{text-align:center}.text-end{text-align:end}.text-left{text-align:left}.text-start{text-align:start}.font-mono{font-family:var(--font-mono)}.font-sans{font-family:var(--font-sans)}.text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[11px\\]{font-size:11px}.text-\\[13px\\]{font-size:13px}.leading-4{--tw-leading:calc(var(--spacing)*4);line-height:calc(var(--spacing)*4)}.leading-8{--tw-leading:calc(var(--spacing)*8);line-height:calc(var(--spacing)*8)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-normal{--tw-font-weight:var(--font-weight-normal);font-weight:var(--font-weight-normal)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-normal{--tw-tracking:var(--tracking-normal);letter-spacing:var(--tracking-normal)}.tracking-wide{--tw-tracking:var(--tracking-wide);letter-spacing:var(--tracking-wide)}.whitespace-normal{white-space:normal}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-wrap{white-space:pre-wrap}.text-accent{color:var(--epdf-accent)}.text-amber-600{color:var(--color-amber-600)}.text-amber-700{color:var(--color-amber-700)}.text-fg{color:var(--epdf-text)}.text-fg-disabled{color:var(--epdf-text-muted)}@supports (color:color-mix(in lab,red,red)){.text-fg-disabled{color:color-mix(in srgb,var(--epdf-text-muted)60%,var(--epdf-surface))}}.text-fg-muted{color:var(--epdf-text-muted)}.text-fg-secondary{color:var(--epdf-text)}@supports (color:color-mix(in lab,red,red)){.text-fg-secondary{color:color-mix(in srgb,var(--epdf-text)65%,var(--epdf-text-muted))}}.text-green-600{color:var(--color-green-600)}.text-on-accent{color:var(--epdf-surface)}.text-red-500{color:var(--color-red-500)}.text-red-600{color:var(--color-red-600)}.text-tooltip-fg{color:var(--epdf-tooltip-text)}.text-white{color:var(--color-white)}.normal-case{text-transform:none}.uppercase{text-transform:uppercase}.italic{font-style:italic}.tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,)}.underline{text-decoration-line:underline}.accent-accent{accent-color:var(--epdf-accent)}.opacity-0{opacity:0}.opacity-40{opacity:.4}.opacity-50{opacity:.5}.opacity-60{opacity:.6}.opacity-75{opacity:.75}.opacity-80{opacity:.8}.opacity-100{opacity:1}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-2xl{--tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a),0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a),0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring,.ring-1{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-2{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-accent{--tw-ring-color:var(--epdf-accent)}.ring-accent-light{--tw-ring-color:var(--embedpdf-accent-tint)}.ring-accent\\/40{--tw-ring-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.ring-accent\\/40{--tw-ring-color:color-mix(in oklab,var(--epdf-accent)40%,transparent)}}.ring-accent\\/60{--tw-ring-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.ring-accent\\/60{--tw-ring-color:color-mix(in oklab,var(--epdf-accent)60%,transparent)}}.ring-offset-1{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,)0 0 0 var(--tw-ring-offset-width)var(--tw-ring-offset-color)}.\\!outline{outline-style:var(--tw-outline-style)!important;outline-width:1px!important}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.outline-2{outline-style:var(--tw-outline-style);outline-width:2px}.outline-offset-2{outline-offset:2px}.outline-accent{outline-color:var(--epdf-accent)}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.backdrop-blur{--tw-backdrop-blur:blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.transition-\\[translate\\,height\\]{transition-property:translate,height;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[translate\\]{transition-property:translate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.duration-100{--tw-duration:.1s;transition-duration:.1s}.duration-200{--tw-duration:.2s;transition-duration:.2s}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.outline-none{--tw-outline-style:none;outline-style:none}.select-none{-webkit-user-select:none;user-select:none}.\\[font-variant-emoji\\:text\\]{font-variant-emoji:text}.ring-inset{--tw-ring-inset:inset}@media(hover:hover){.group-hover\\:opacity-100:is(:where(.group):hover *),.group-hover\\/body\\:opacity-100:is(:where(.group\\/body):hover *){opacity:1}}.peer-checked\\:opacity-100:is(:where(.peer):checked~*){opacity:1}.selection\\:underline ::selection{text-decoration-line:underline}.selection\\:underline::selection{text-decoration-line:underline}.placeholder\\:text-fg-muted::placeholder{color:var(--epdf-text-muted)}.first\\:mt-0:first-child{margin-top:calc(var(--spacing)*0)}.open\\:flex:is([open],:popover-open,:open){display:flex}.open\\:grid:is([open],:popover-open,:open){display:grid}.open\\:flex-col:is([open],:popover-open,:open){flex-direction:column}.open\\:justify-end:is([open],:popover-open,:open){justify-content:flex-end}.checked\\:border-accent:checked{border-color:var(--epdf-accent)}.checked\\:bg-accent:checked{background-color:var(--epdf-accent)}.focus-within\\:opacity-100:focus-within{opacity:1}@media(hover:hover){.hover\\:border-border:hover{border-color:var(--epdf-border)}.hover\\:border-b-accent:hover{border-bottom-color:var(--epdf-accent)}.hover\\:border-b-fg-muted:hover{border-bottom-color:var(--epdf-text-muted)}.hover\\:bg-accent:hover,.hover\\:bg-accent-hover:hover{background-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-accent-hover:hover{background-color:color-mix(in srgb,var(--epdf-accent)80%,black)}}.hover\\:bg-accent\\/20:hover{background-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-accent\\/20:hover{background-color:color-mix(in oklab,var(--epdf-accent)20%,transparent)}}.hover\\:bg-hover:hover{background-color:var(--epdf-hover)}.hover\\:bg-red-700:hover{background-color:var(--color-red-700)}.hover\\:bg-transparent:hover{background-color:#0000}.hover\\:text-fg:hover,.hover\\:text-fg-secondary:hover{color:var(--epdf-text)}@supports (color:color-mix(in lab,red,red)){.hover\\:text-fg-secondary:hover{color:color-mix(in srgb,var(--epdf-text)65%,var(--epdf-text-muted))}}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:opacity-90:hover{opacity:.9}.hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:ring:hover{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:ring-0:hover{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(0px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:ring-accent:hover{--tw-ring-color:var(--epdf-accent)}}.focus\\:border-accent:focus{border-color:var(--epdf-accent)}.focus\\:border-red-400:focus{border-color:var(--color-red-400)}.focus\\:opacity-100:focus{opacity:1}.focus\\:ring-1:focus{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus\\:ring-accent:focus{--tw-ring-color:var(--epdf-accent)}.focus\\:ring-red-400:focus{--tw-ring-color:var(--color-red-400)}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.focus-visible\\:bg-accent\\/40:focus-visible{background-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.focus-visible\\:bg-accent\\/40:focus-visible{background-color:color-mix(in oklab,var(--epdf-accent)40%,transparent)}}.focus-visible\\:bg-hover:focus-visible{background-color:var(--epdf-hover)}.focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-accent:focus-visible{--tw-ring-color:var(--epdf-accent)}.focus-visible\\:ring-inset:focus-visible{--tw-ring-inset:inset}.active\\:cursor-grabbing:active{cursor:grabbing}.disabled\\:cursor-default:disabled{cursor:default}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-40:disabled{opacity:.4}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:opacity-60:disabled{opacity:.6}:where([data-dragging]) .in-data-dragging\\:transition-none{transition-property:none}.aria-disabled\\:cursor-not-allowed[aria-disabled=true]{cursor:not-allowed}.aria-disabled\\:opacity-40[aria-disabled=true]{opacity:.4}@media(hover:hover){.aria-disabled\\:hover\\:bg-transparent[aria-disabled=true]:hover{background-color:#0000}}.aria-\\[invalid\\=true\\]\\:border-red-600[aria-invalid=true]{border-color:var(--color-red-600)}@media(prefers-reduced-motion:no-preference){.motion-safe\\:animate-spin{animation:var(--animate-spin)}}@media(prefers-reduced-motion:reduce){.motion-reduce\\:transition-none{transition-property:none}}.rtl\\:origin-top-right:where(:dir(rtl),[dir=rtl],[dir=rtl] *){transform-origin:100% 0}.rtl\\:-scale-x-100:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-scale-x: -100% ;scale:var(--tw-scale-x)var(--tw-scale-y)}.rtl\\:-rotate-90:where(:dir(rtl),[dir=rtl],[dir=rtl] *){rotate:-90deg}@starting-style{.starting\\:-translate-x-full{--tw-translate-x:-100%;translate:var(--tw-translate-x)var(--tw-translate-y)}}@starting-style{.starting\\:translate-x-full{--tw-translate-x:100%;translate:var(--tw-translate-x)var(--tw-translate-y)}}@starting-style{.starting\\:translate-y-full{--tw-translate-y:100%;translate:var(--tw-translate-x)var(--tw-translate-y)}}@starting-style{.starting\\:opacity-0{opacity:0}}@starting-style{.rtl\\:starting\\:-translate-x-full:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-100%;translate:var(--tw-translate-x)var(--tw-translate-y)}}@starting-style{.rtl\\:starting\\:translate-x-full:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:100%;translate:var(--tw-translate-x)var(--tw-translate-y)}}@media(forced-colors:active){.forced-colors\\:outline-2{outline-style:var(--tw-outline-style);outline-width:2px}.forced-colors\\:-outline-offset-2{outline-offset:-2px}.forced-colors\\:outline-solid{--tw-outline-style:solid;outline-style:solid}}.float-pill\\:pointer-events-auto>div:has(>[data-epdf-toolbar-item]:not(:empty)){pointer-events:auto}.float-pill\\:rounded-lg>div:has(>[data-epdf-toolbar-item]:not(:empty)){border-radius:calc(var(--epdf-radius)*4/3)}.float-pill\\:border>div:has(>[data-epdf-toolbar-item]:not(:empty)){border-style:var(--tw-border-style);border-width:1px}.float-pill\\:border-border-subtle>div:has(>[data-epdf-toolbar-item]:not(:empty)){border-color:var(--epdf-border)}@supports (color:color-mix(in lab,red,red)){.float-pill\\:border-border-subtle>div:has(>[data-epdf-toolbar-item]:not(:empty)){border-color:color-mix(in srgb,var(--epdf-border)50%,var(--epdf-surface))}}.float-pill\\:bg-elevated\\/95>div:has(>[data-epdf-toolbar-item]:not(:empty)){background-color:var(--epdf-surface-raised)}@supports (color:color-mix(in lab,red,red)){.float-pill\\:bg-elevated\\/95>div:has(>[data-epdf-toolbar-item]:not(:empty)){background-color:color-mix(in oklab,var(--epdf-surface-raised)95%,transparent)}}.float-pill\\:p-0\\.5>div:has(>[data-epdf-toolbar-item]:not(:empty)){padding:calc(var(--spacing)*.5)}.float-pill\\:shadow-lg>div:has(>[data-epdf-toolbar-item]:not(:empty)){--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a),0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}}:host{--embedpdf-host-accent:var(--epdf-accent);--embedpdf-host-background:var(--epdf-background);--embedpdf-host-surface:var(--epdf-surface);--embedpdf-host-surface-raised:var(--epdf-surface-raised);--embedpdf-host-text:var(--epdf-text);--embedpdf-host-text-muted:var(--epdf-text-muted);--embedpdf-host-border:var(--epdf-border);--embedpdf-host-hover:var(--epdf-hover);--embedpdf-host-canvas:var(--epdf-canvas);--embedpdf-host-page-background:var(--epdf-page-background);--embedpdf-host-page-shadow:var(--epdf-page-shadow);--embedpdf-host-tooltip:var(--epdf-tooltip);--embedpdf-host-tooltip-text:var(--epdf-tooltip-text);--embedpdf-host-radius:var(--epdf-radius);--embedpdf-host-font:var(--epdf-font);--embedpdf-host-scrollbar-thumb:var(--epdf-scrollbar-thumb);--embedpdf-host-toolbar-surface:var(--epdf-toolbar-surface);--embedpdf-host-toolbar-border:var(--epdf-toolbar-border);--embedpdf-host-toolbar-active:var(--epdf-toolbar-active)}:root,[data-embedpdf-root]{--epdf-accent:var(--embedpdf-host-accent,#3b82f6);--epdf-background:var(--embedpdf-host-background,#f3f4f6);--epdf-surface:var(--embedpdf-host-surface,#fff);--epdf-surface-raised:var(--embedpdf-host-surface-raised,#fff);--epdf-text:var(--embedpdf-host-text,#111827);--epdf-text-muted:var(--embedpdf-host-text-muted,#6b7280);--epdf-border:var(--embedpdf-host-border,#d1d5db);--epdf-hover:var(--embedpdf-host-hover,#f3f4f6);--epdf-canvas:var(--embedpdf-host-canvas,#f3f4f6);--epdf-page-background:var(--embedpdf-host-page-background,#fff);--epdf-page-shadow:var(--embedpdf-host-page-shadow,0 6px 18px #0000002e);--epdf-tooltip:var(--embedpdf-host-tooltip,var(--epdf-text));--epdf-tooltip-text:var(--embedpdf-host-tooltip-text,var(--epdf-surface));--epdf-radius:var(--embedpdf-host-radius,6px);--epdf-font:var(--embedpdf-host-font,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");--epdf-scrollbar-thumb:var(--embedpdf-host-scrollbar-thumb,var(--epdf-text))}@supports (color:color-mix(in lab,red,red)){:root,[data-embedpdf-root]{--epdf-scrollbar-thumb:var(--embedpdf-host-scrollbar-thumb,color-mix(in srgb,var(--epdf-text)35%,transparent))}}:root,[data-embedpdf-root]{--epdf-toolbar-surface:var(--embedpdf-host-toolbar-surface,var(--epdf-surface-raised));--epdf-toolbar-border:var(--embedpdf-host-toolbar-border,var(--epdf-border));--epdf-toolbar-active:var(--embedpdf-host-toolbar-active,var(--epdf-hover))}@supports (color:color-mix(in lab,red,red)){:root,[data-embedpdf-root]{--epdf-toolbar-active:var(--embedpdf-host-toolbar-active,color-mix(in srgb,var(--epdf-hover)90%,var(--epdf-text)))}}:root,[data-embedpdf-root]{--embedpdf-accent-tint:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){:root,[data-embedpdf-root]{--embedpdf-accent-tint:color-mix(in srgb,var(--epdf-accent)8%,var(--epdf-surface))}}.dark{--epdf-accent:var(--embedpdf-host-accent,#60a5fa);--epdf-background:var(--embedpdf-host-background,#111827);--epdf-surface:var(--embedpdf-host-surface,#1f2937);--epdf-surface-raised:var(--embedpdf-host-surface-raised,#1f2937);--epdf-text:var(--embedpdf-host-text,#f9fafb);--epdf-text-muted:var(--embedpdf-host-text-muted,#9ca3af);--epdf-border:var(--embedpdf-host-border,#4b5563);--epdf-hover:var(--embedpdf-host-hover,#374151);--epdf-canvas:var(--embedpdf-host-canvas,#0d1117);--epdf-tooltip:var(--embedpdf-host-tooltip,var(--epdf-text));--epdf-tooltip-text:var(--embedpdf-host-tooltip-text,var(--epdf-surface));--epdf-scrollbar-thumb:var(--embedpdf-host-scrollbar-thumb,var(--epdf-text))}@supports (color:color-mix(in lab,red,red)){.dark{--epdf-scrollbar-thumb:var(--embedpdf-host-scrollbar-thumb,color-mix(in srgb,var(--epdf-text)28%,transparent))}}.dark{--embedpdf-accent-tint:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.dark{--embedpdf-accent-tint:color-mix(in srgb,var(--epdf-accent)25%,var(--epdf-surface))}}html,body,#root{height:100%;margin:0}body{font-family:var(--epdf-font);color:var(--epdf-text);background:var(--epdf-background)}[data-measure-layer]{pointer-events:none}[data-embedpdf-scrollbar-thumb]{transition:background .15s}[data-embedpdf-scrollbar-thumb]:hover,[data-embedpdf-scrollbar][data-dragging] [data-embedpdf-scrollbar-thumb]{background:var(--epdf-text-muted)}[data-epdf-fills-window]:popover-open{border:0;width:auto;max-width:none;height:auto;max-height:none;margin:0;padding:0;position:fixed;inset:0}[data-touch] [role=toolbar] button,[data-touch] [role=tab],[data-touch] [data-epdf-panel-header] button,[data-touch] [role=menu] :is([role=menuitem],[role=menuitemradio],[role=menuitemcheckbox]){min-height:44px}[data-touch] [role=toolbar] button,[data-touch] [data-epdf-panel-header] button{min-width:44px}[data-touch] :is(input,textarea,select){font-size:16px}[data-float] [data-bar]{transition:opacity .15s}[data-float] [data-idle-hidden]{opacity:0;transition:opacity .5s}[data-idle-hidden] *{pointer-events:none}@media(prefers-reduced-motion:reduce){[data-float] [data-bar]{transition:none}}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-pan-x{syntax:"*";inherits:false}@property --tw-pan-y{syntax:"*";inherits:false}@property --tw-pinch-zoom{syntax:"*";inherits:false}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-scale-x{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-y{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-z{syntax:"*";inherits:false;initial-value:1}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}';
function tr(e) {
  const t = new CSSStyleSheet();
  return t.replaceSync(e), t;
}
let nl = null;
function Xd() {
  return nl ?? (nl = tr(H2)), nl;
}
const Cr = Symbol.for("@embedpdf/viewer/placed-components");
function Yr(e) {
  const t = e;
  return t[Cr] || Object.defineProperty(t, Cr, { value: Ty() }), t[Cr];
}
function U2(e) {
  for (let t = e.parentNode; t; )
    if (t instanceof ShadowRoot) t = t.host;
    else {
      if (t instanceof Element && t.localName === "embedpdf-viewer") return t;
      t = t.parentNode;
    }
  return null;
}
const G2 = ":host{display:inline-flex;vertical-align:middle}:host([hidden]){display:none}";
let ol = null;
const W2 = () => (ol ?? (ol = [Xd(), tr(G2)]), ol), Zd = typeof HTMLElement > "u" ? class {
} : HTMLElement, Ie = (e, t) => e.getAttribute(t);
function Ye(e, t, n) {
  n === null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
const ni = (e) => e.hasAttribute("active"), Jd = (e, t) => {
  e.toggleAttribute("active", !!t);
};
var it, vt;
class oi extends Zd {
  constructor() {
    super(...arguments);
    ge(this, it, null);
    ge(this, vt, null);
  }
  /** Whether what it draws takes focus: a button does, an icon doesn't. */
  get focusable() {
    return !0;
  }
  connectedCallback() {
    $(this, vt) || (pe(this, vt, this.attachShadow({ mode: "open", delegatesFocus: this.focusable })), $(this, vt).adoptedStyleSheets = W2()), this.focusable && !this.hasAttribute("tabindex") && (this.tabIndex = 0), pe(this, it, U2(this)), this.changed();
  }
  disconnectedCallback() {
    $(this, it) && Yr($(this, it)).remove(this), pe(this, it, null);
  }
  attributeChangedCallback() {
    this.changed();
  }
  /** Tells the viewer what this element says now. */
  changed() {
    $(this, it) && $(this, vt) && Yr($(this, it)).place(this.describe($(this, vt)));
  }
}
it = new WeakMap(), vt = new WeakMap();
const ri = class ri extends oi {
  /** The command it is, by id. */
  get command() {
    return Ie(this, "command");
  }
  set command(t) {
    Ye(this, "command", t);
  }
  /** Its icon, by name: the viewer's or one of yours. */
  get icon() {
    return Ie(this, "icon");
  }
  set icon(t) {
    Ye(this, "icon", t);
  }
  /** Its name, for its tooltip and screen readers. */
  get label() {
    return Ie(this, "label");
  }
  set label(t) {
    Ye(this, "label", t);
  }
  /** Shown pressed: the `active` attribute, there or not. */
  get active() {
    return ni(this);
  }
  set active(t) {
    Jd(this, t);
  }
  describe(t) {
    return {
      kind: "button",
      host: this,
      root: t,
      command: this.command,
      icon: this.icon,
      label: this.label,
      active: this.active
    };
  }
};
ri.observedAttributes = ["command", "icon", "label", "active"];
let Xr = ri;
class V2 extends Zd {
  /** The command it is, by id. */
  get command() {
    return Ie(this, "command");
  }
  set command(t) {
    Ye(this, "command", t);
  }
  /** Its icon, by name: the viewer's or one of yours. */
  get icon() {
    return Ie(this, "icon");
  }
  set icon(t) {
    Ye(this, "icon", t);
  }
  /** Shown checked: the `active` attribute, there or not. */
  get active() {
    return ni(this);
  }
  set active(t) {
    Jd(this, t);
  }
}
var Vt;
const ai = class ai extends oi {
  constructor() {
    super(...arguments);
    ge(this, Vt, null);
  }
  /** Its icon, by name: the viewer's or one of yours. */
  get icon() {
    return Ie(this, "icon");
  }
  set icon(n) {
    Ye(this, "icon", n);
  }
  /** Its name, for its tooltip and screen readers. */
  get label() {
    return Ie(this, "label");
  }
  set label(n) {
    Ye(this, "label", n);
  }
  connectedCallback() {
    $(this, Vt) ?? pe(this, Vt, new MutationObserver(() => this.changed())), $(this, Vt).observe(this, {
      childList: !0,
      subtree: !0,
      characterData: !0,
      attributes: !0,
      attributeFilter: ["command", "icon", "active"]
    }), super.connectedCallback();
  }
  disconnectedCallback() {
    $(this, Vt)?.disconnect(), super.disconnectedCallback();
  }
  describe(n) {
    const o = [...this.children].filter((r) => r.localName === "epdf-menu-item").map(
      (r) => ({
        command: Ie(r, "command"),
        icon: Ie(r, "icon"),
        label: r.textContent?.trim() ?? "",
        active: ni(r),
        select: () => r.dispatchEvent(new CustomEvent("select", { bubbles: !0 }))
      })
    );
    return { kind: "menu", host: this, root: n, icon: this.icon, label: this.label, items: o };
  }
};
Vt = new WeakMap(), ai.observedAttributes = ["icon", "label"];
let Zr = ai;
const ii = class ii extends oi {
  get focusable() {
    return !1;
  }
  /** The icon, by name: the viewer's or one of yours. */
  get name() {
    return Ie(this, "name");
  }
  set name(t) {
    Ye(this, "name", t);
  }
  /** Its width and height in px; null for a toolbar button's. */
  get size() {
    const t = Number.parseFloat(Ie(this, "size") ?? "");
    return Number.isFinite(t) && t > 0 ? t : null;
  }
  set size(t) {
    Ye(this, "size", t == null ? null : String(t));
  }
  /** What it shows, for screen readers; without one, they skip it. */
  get label() {
    return Ie(this, "label");
  }
  set label(t) {
    Ye(this, "label", t);
  }
  describe(t) {
    return {
      kind: "icon",
      host: this,
      root: t,
      icon: this.name,
      size: this.size,
      label: this.label
    };
  }
};
ii.observedAttributes = ["name", "size", "label"];
let Jr = ii;
if (typeof customElements < "u") {
  const e = [
    ["epdf-button", Xr],
    ["epdf-menu", Zr],
    ["epdf-menu-item", V2],
    ["epdf-icon", Jr]
  ];
  for (const [t, n] of e)
    customElements.get(t) || customElements.define(t, n);
}
const Qd = "data-embedpdf-root", Qr = `[${Qd}]`, q2 = `:host{display:block;height:100%}${Qr}{all:initial;visibility:inherit;pointer-events:inherit;display:block;position:relative;isolation:isolate;contain:layout;box-sizing:border-box;height:100%;font-family:var(--epdf-font);font-size:16px;line-height:1.5;color:var(--epdf-text);color-scheme:light;tab-size:4;-webkit-text-size-adjust:100%;text-size-adjust:100%;-webkit-tap-highlight-color:transparent}${Qr}.dark{color-scheme:dark}`;
let rl = null;
const Y2 = () => (rl ?? (rl = [tr(q2), Xd()]), rl);
function X2(e) {
  const t = e.engine;
  if (typeof t == "function") return { engine: t };
  if (t && typeof t.open == "function") return { engine: t };
  const n = To.defaultEngineProvider;
  if (!n)
    throw new Error(
      "[embedpdf] no engine: this build has no default engine. Pass one in the config (`engine: () => yourEngine()`), or import '@embedpdf/viewer' (which bundles the bundled local engine) instead of '@embedpdf/viewer/core'."
    );
  return n(t);
}
function Z2(e) {
  try {
    for (const t of e.commands ?? [])
      t.icon && !(t.icon in $c) && !(e.icons && t.icon in e.icons) && console.warn(`[embedpdf] command "${t.id}": unknown icon "${t.icon}"`);
  } catch (t) {
    console.warn("[embedpdf] invalid config:", t);
  }
}
const J2 = typeof HTMLElement > "u" ? class {
} : HTMLElement, Q2 = [
  "config",
  "src",
  "theme",
  "locale",
  "features",
  "disable",
  "readOnly",
  "fetch",
  "appState"
], e_ = "data-epdf-wrapped";
var At, wt, Be, Le, st, On, Pn, lt, Nt, Lt, Co, J, rt, ea, ta, Eo, Ao, No, na, eu, tu, oa, fo;
const Lo = class Lo extends J2 {
  constructor() {
    super(...arguments);
    ge(this, J);
    ge(this, At, null);
    ge(this, wt, null);
    ge(this, Be, null);
    /** The config the running viewer shows, and the props it renders with. */
    ge(this, Le, null);
    ge(this, st, null);
    /** What the running viewer's door makes of a `src` (`DoorEngine.sourceOf`). */
    ge(this, On, (n) => n);
    /** Whether the running viewer's door keeps a document open under a new `src` (`DoorEngine.follows`). */
    ge(this, Pn);
    ge(this, lt, null);
    ge(this, Nt, null);
    /** The ids of `src` documents still closing, which a new one must not take. */
    ge(this, Lt, /* @__PURE__ */ new Set());
    /**
     * How the viewer downloads a URL: the shown config's `fetch`, read at each download, so a new
     * one needs no new viewer.
     */
    ge(this, Co, (n, o) => ($(this, Le)?.fetch ?? globalThis.fetch)(n, o));
    /** The viewer is live: `src` opens, then `epdf:ready` and the config's `onReady` say so. */
    ge(this, Eo, (n) => {
      pe(this, lt, n), fe(this, J, na).call(this), this.dispatchEvent(new CustomEvent("epdf:ready", { detail: { viewer: n } })), $(this, Le)?.onReady?.(n);
    });
    /** The active document changed: `epdf:documentchange` and the config's `onDocumentChange`. */
    ge(this, Ao, (n) => {
      this.dispatchEvent(new CustomEvent("epdf:documentchange", { detail: { documentId: n } })), $(this, Le)?.onDocumentChange?.(n);
    });
    /** The user resized a panel: `epdf:panelresize` and the config's `onPanelResize`. */
    ge(this, No, (n) => {
      this.dispatchEvent(new CustomEvent("epdf:panelresize", { detail: n })), $(this, Le)?.onPanelResize?.(n);
    });
  }
  /**
   * The config, over the declarative attributes. Set on a running viewer, the
   * live keys change in place and any other change builds a new viewer.
   */
  set config(n) {
    pe(this, At, n), fe(this, J, ea).call(this);
  }
  get config() {
    return K2(j2(this), $(this, At));
  }
  /**
   * The document: a URL, a `File`, or bytes (or what the door's engine opens). Another one opens
   * in its place, `null` closes it, and `undefined` goes back to the `src` attribute.
   */
  set src(n) {
    fe(this, J, rt).call(this, { src: n });
  }
  get src() {
    return this.config.src ?? null;
  }
  /** `'light'`, `'dark'`, `'system'`, or the theme config. */
  set theme(n) {
    fe(this, J, rt).call(this, { theme: n });
  }
  get theme() {
    return this.config.theme;
  }
  /** `'auto'` or a language code. */
  set locale(n) {
    fe(this, J, rt).call(this, { locale: n });
  }
  get locale() {
    return this.config.locale;
  }
  /** What people can do in this viewer: features and their parts, on or off. */
  set features(n) {
    fe(this, J, rt).call(this, { features: n });
  }
  get features() {
    return this.config.features;
  }
  /**
   * The features and commands this viewer doesn't have.
   * @deprecated Use `features`; goes in 4.0.
   */
  set disable(n) {
    fe(this, J, rt).call(this, { disable: n });
  }
  get disable() {
    return this.config.disable;
  }
  /** Every feature that changes the document off, or all but `except`. */
  set readOnly(n) {
    fe(this, J, rt).call(this, { readOnly: n });
  }
  get readOnly() {
    return this.config.readOnly;
  }
  /** How a document at a URL downloads: your own `fetch`. The next download uses a new one. */
  set fetch(n) {
    fe(this, J, rt).call(this, { fetch: n });
  }
  get fetch() {
    return this.config.fetch;
  }
  /** Your app's state, which your commands read: a new value, and every button asks again. */
  set appState(n) {
    fe(this, J, rt).call(this, { appState: n });
  }
  get appState() {
    return this.config.appState;
  }
  /**
   * The viewer in code: `get(name)`, `documents`, `commands`, `watch`. Null
   * until `epdf:ready` fires (once per mount); a new one after a config change
   * builds a new viewer.
   */
  get viewer() {
    return $(this, lt);
  }
  connectedCallback() {
    for (const n of Q2) {
      if (!Object.prototype.hasOwnProperty.call(this, n)) continue;
      const o = Reflect.get(this, n);
      Reflect.deleteProperty(this, n), Reflect.set(this, n, o);
    }
    this.hasAttribute(e_) && $(this, At) === null || queueMicrotask(() => {
      this.isConnected && !$(this, Be) && fe(this, J, fo).call(this);
    });
  }
  disconnectedCallback() {
    fe(this, J, ta).call(this);
  }
  attributeChangedCallback() {
    $(this, Be) && fe(this, J, ea).call(this);
  }
};
At = new WeakMap(), wt = new WeakMap(), Be = new WeakMap(), Le = new WeakMap(), st = new WeakMap(), On = new WeakMap(), Pn = new WeakMap(), lt = new WeakMap(), Nt = new WeakMap(), Lt = new WeakMap(), Co = new WeakMap(), J = new WeakSet(), rt = function(n) {
  this.config = { ...$(this, At), ...n };
}, /** Show the current config: in place when only live keys changed, else on a new viewer. */
ea = function() {
  if (!this.isConnected) return;
  const n = $(this, Le);
  if (!$(this, Be) || !n) {
    fe(this, J, fo).call(this);
    return;
  }
  const o = this.config, r = D2(n, o);
  if (r.length !== 0) {
    if (!r.every(R2)) {
      fe(this, J, fo).call(this);
      return;
    }
    if (pe(this, Le, o), r.includes("theme") && fe(this, J, oa).call(this, o.theme), r.some((a) => a !== "src" && a !== "fetch")) {
      const { theme: a, locale: s, features: l, disable: d, readOnly: c, appState: p } = o;
      pe(this, st, { ...$(this, st), theme: a, locale: s, features: l, disable: d, readOnly: c, appState: p }), $(this, Be).render(Ee(el, $(this, st)));
    }
    r.includes("src") && fe(this, J, na).call(this);
  }
}, ta = function() {
  pe(this, lt, null), pe(this, Nt, null), $(this, Lt).clear(), pe(this, Le, null), pe(this, st, null), $(this, Be)?.unmount(), pe(this, Be, null);
}, Eo = new WeakMap(), Ao = new WeakMap(), No = new WeakMap(), /**
 * Open the document `src` names in the place of the one the previous `src` opened, which
 * closes. `documents` takes over from `src` when the config has them.
 */
na = function() {
  var p;
  const n = $(this, lt), o = $(this, Le);
  if (!n || !o || o.documents) return;
  const { documents: r } = n, a = $(this, Nt);
  if (a && o.src != null && ((p = $(this, Pn)) != null && p.call(this, a.input, o.src))) return;
  pe(this, Nt, null);
  const s = a && r.has(a.id) ? a.id : a?.reserved, l = s ? r.getOrder().indexOf(s) : -1;
  let d = () => {
  };
  const c = new Promise((f) => d = f);
  if (o.src != null && fe(this, J, eu).call(this, o.src, l, a ? c : void 0), a) {
    const f = a.id;
    $(this, Lt).add(f);
    const u = /* @__PURE__ */ new Set([a.reserved, f]), m = () => {
      $(this, Lt).delete(f), d();
    };
    Promise.all([...u].map((g) => r.close(g))).then(() => a.opened).then((g) => g !== null && !u.has(g) ? r.close(g) : void 0).then(m, m);
  }
}, /** Open `src` as the `src` document, at `position` in the tabs, once `after` settles. */
eu = function(n, o, r) {
  const { documents: a } = $(this, lt), s = $(this, On).call(this, n), l = fe(this, J, tu).call(this, s), { source: d, name: c } = Yd(s, l, r), p = new Set(a.getOrder()), f = a.open(d, c !== void 0 ? { name: c } : {}), u = a.getOrder().find((h) => !p.has(h)), m = f.then(
    ({ document: h }) => h.id,
    () => null
  );
  if (!u) return;
  const g = {
    reserved: u,
    id: er(s) ? u : l,
    opened: m,
    input: s
  };
  pe(this, Nt, g), m.then((h) => {
    h !== null && (g.id = h);
  }), o >= 0 && a.move(u, o);
}, /** The id `src` asks for, or with a number after it while a document still has it. */
tu = function(n) {
  const o = qd(n), r = (s) => $(this, Lt).has(s) || !!$(this, lt)?.documents.has(s);
  let a = o;
  for (let s = 2; r(a); s++) a = `${o}#${s}`;
  return a;
}, /** The chrome's sheets, and the theme's tokens after them, so they win over its defaults. */
oa = function(n) {
  const o = s1(n, Qr);
  this.shadowRoot.adoptedStyleSheets = [...Y2(), ...o ? [tr(o)] : []];
}, fo = function() {
  if (!this.shadowRoot) {
    const m = this.attachShadow({ mode: "open" });
    pe(this, wt, document.createElement("div")), $(this, wt).setAttribute(Qd, ""), m.appendChild($(this, wt));
  }
  fe(this, J, ta).call(this);
  const n = this.config;
  Z2(n);
  const {
    src: o,
    documents: r,
    engine: a,
    theme: s,
    fetch: l,
    ...d
  } = n;
  fe(this, J, oa).call(this, s), pe(this, Le, n);
  const { engine: c, sourceOf: p = (m) => m, follows: f, plugins: u } = X2(n);
  pe(this, On, p), pe(this, Pn, f), pe(this, st, {
    engine: c,
    initialDocuments: r && B2(r, p),
    fetch: $(this, Co),
    theme: s,
    themeTarget: $(this, wt),
    // The viewer's own components among the children (`<epdf-button>`, `<epdf-menu>`).
    components: Yr(this),
    ...d,
    plugins: $2(u, d.plugins),
    // The element's own, which call the config's after its events.
    onReady: $(this, Eo),
    onDocumentChange: $(this, Ao),
    onPanelResize: $(this, No)
  }), pe(this, Be, vh($(this, wt))), $(this, Be).render(Ee(el, $(this, st)));
}, Lo.observedAttributes = ["src", "locale", "theme"], Lo.defaultEngineProvider = null;
let To = Lo;
typeof customElements < "u" && !customElements.get("embedpdf-viewer") && customElements.define("embedpdf-viewer", To);
function lx(e) {
  const { target: t, ...n } = e, o = typeof t == "string" ? document.querySelector(t) : t;
  if (!o) throw new Error(`[embedpdf] init: target not found: ${String(t)}`);
  const r = document.createElement("embedpdf-viewer");
  return r.config = n, o.appendChild(r), r;
}
export {
  Xb as $,
  k as A,
  U as B,
  ke as C,
  Vg as D,
  To as E,
  ut as F,
  rb as G,
  ab as H,
  $c as I,
  Me as J,
  ox as K,
  Ce as L,
  Jo as M,
  Z_ as N,
  Cg as O,
  V as P,
  Ua as Q,
  ob as R,
  D as S,
  Qc as T,
  Eg as U,
  _e as V,
  qo as W,
  Xh as X,
  xg as Y,
  le as Z,
  ee as _,
  Xr as a,
  ae as a0,
  Oa as a1,
  Yb as a2,
  Pg as a3,
  xc as a4,
  xo as a5,
  Qe as a6,
  ed as a7,
  Ev as a8,
  Pv as a9,
  Sb as aA,
  Sa as aB,
  Xt as aC,
  Uo as aD,
  _o as aE,
  Oc as aF,
  Mn as aa,
  Tg as ab,
  J_ as ac,
  nx as ad,
  ex as ae,
  Q_ as af,
  qn as ag,
  W_ as ah,
  Yh as ai,
  ax as aj,
  rx as ak,
  Fr as al,
  Je as am,
  R as an,
  V_ as ao,
  fc as ap,
  Sh as aq,
  Yi as ar,
  Pb as as,
  Mb as at,
  Ae as au,
  Ze as av,
  ix as aw,
  Wo as ax,
  p1 as ay,
  Go as az,
  Jr as b,
  Zr as c,
  V2 as d,
  us as e,
  Ib as f,
  dt as g,
  yg as h,
  lx as i,
  q_ as j,
  C as k,
  i as l,
  Y as m,
  we as n,
  w1 as o,
  Rv as p,
  j as q,
  De as r,
  sx as s,
  g1 as t,
  Q as u,
  E as v,
  tx as w,
  ng as x,
  Y_ as y,
  X_ as z
};
//# sourceMappingURL=init-tVr9KnGC.js.map
