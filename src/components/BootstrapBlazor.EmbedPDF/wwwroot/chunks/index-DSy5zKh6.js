import { p as f, C as g, r as E, b as I } from "./timestamp-D87vPTni.js";
import { a as _ } from "./timestamp-D87vPTni.js";
import { e as k, t as p, i as m, q as T, C as $, u as D } from "./engine-CcsIvE98.js";
import { aj as C, aW as v, aX as y } from "./wasm-url-asset-DQFmMC86.js";
import { aY as Z, aZ as G, a_ as J, a$ as Q, b0 as ee, b1 as te, b2 as ie, b3 as ne } from "./wasm-url-asset-DQFmMC86.js";
import { certificateCommonName as q } from "./self-signed-DGAIwro5.js";
import { selfSignedCertificate as se } from "./self-signed-DGAIwro5.js";
function x(t) {
  const n = new T({
    value: (t.signedAttrs?.attributes ?? []).map((e) => e.toSchema())
  });
  return new Uint8Array(n.toBER(!1));
}
async function b(t) {
  let n;
  try {
    n = t instanceof Uint8Array ? f(t) : t;
  } catch (a) {
    return a instanceof g && a.reason === "unsupported" ? "unsupported" : "invalid";
  }
  const e = k(), { signerInfo: r, signerCertificate: s, parsed: i, essCertHash: o } = n;
  if (o) {
    const a = new Uint8Array(
      await e.digest("SHA-256", p(i.signerCertificate))
    );
    if (!m(a, o)) return "invalid";
  }
  try {
    return await e.verifyWithPublicKey(
      p(x(r)),
      r.signature,
      s.subjectPublicKeyInfo,
      r.signatureAlgorithm,
      C[i.digestAlgorithm]
    ) ? "valid" : "invalid";
  } catch (a) {
    const d = a.message ?? "";
    return /unsupported|unknown|not supported|not implemented/i.test(d) ? "unsupported" : "invalid";
  }
}
async function R(t) {
  const { cms: n, prepared: e, profile: r } = t;
  if (n.byteLength > e.contentsSizeBytes)
    return {
      ok: !1,
      reason: "too-large",
      detail: `the CMS is ${n.byteLength} bytes; ${e.contentsSizeBytes} were reserved`
    };
  if (r === "timestamp") return F(n, e);
  let s;
  try {
    s = f(n);
  } catch (a) {
    return {
      ok: !1,
      reason: "malformed",
      detail: a instanceof g ? a.message : String(a)
    };
  }
  const i = s.parsed;
  if (i.digestAlgorithm !== e.algorithm)
    return {
      ok: !1,
      reason: "algorithm-mismatch",
      detail: `the CMS digests with ${i.digestAlgorithm}, the document was prepared with ${e.algorithm}`
    };
  if (!m(i.messageDigest, e.digest))
    return {
      ok: !1,
      reason: "digest-mismatch",
      detail: "the CMS message digest is not the prepared digest"
    };
  if (r === "cades-b") {
    if (!i.signingCertificateV2)
      return {
        ok: !1,
        reason: "profile-violation",
        detail: "CAdES requires the ESS signing-certificate-v2 attribute"
      };
    if (i.signingTime)
      return {
        ok: !1,
        reason: "profile-violation",
        detail: "PAdES forbids the CMS signing-time attribute"
      };
  }
  const o = await b(s);
  return o !== "valid" ? {
    ok: !1,
    reason: "signature-invalid",
    detail: o === "unsupported" ? "the signature algorithm is not supported" : "the signature does not verify"
  } : { ok: !0 };
}
async function F(t, n) {
  let e, r;
  try {
    e = f(t, "tst-info"), r = E(e.eContent);
  } catch (o) {
    return {
      ok: !1,
      reason: "malformed",
      detail: o instanceof g ? o.message : String(o)
    };
  }
  if (r.imprintAlgorithm !== n.algorithm)
    return {
      ok: !1,
      reason: "algorithm-mismatch",
      detail: `the token stamps a ${r.imprintAlgorithm} digest, the document was prepared with ${n.algorithm}`
    };
  if (!m(r.imprint, n.digest))
    return {
      ok: !1,
      reason: "digest-mismatch",
      detail: "the token's message imprint is not the prepared digest"
    };
  const s = new Uint8Array(
    await k().digest(
      C[e.parsed.digestAlgorithm],
      p(e.eContent)
    )
  );
  if (!m(s, e.parsed.messageDigest))
    return {
      ok: !1,
      reason: "signature-invalid",
      detail: "the token's message digest does not cover its TSTInfo"
    };
  const i = await b(e);
  return i !== "valid" ? {
    ok: !1,
    reason: "signature-invalid",
    detail: i === "unsupported" ? "the signature algorithm is not supported" : "the token signature does not verify"
  } : { ok: !0 };
}
async function j(t, n, e = { kind: "now" }) {
  if (!n) return { status: "unknown", reason: "no trust anchors configured" };
  const r = await n.anchors();
  if (r.length === 0) return { status: "unknown", reason: "no trust anchors configured" };
  k();
  let s;
  try {
    s = t instanceof Uint8Array ? f(t) : t;
  } catch (a) {
    return { status: "untrusted", reason: a.message };
  }
  const i = r.map((a) => $.fromBER(p(a))), o = new D({
    certs: s.certificates,
    trustedCerts: i,
    checkDate: e.kind === "now" ? /* @__PURE__ */ new Date() : new Date(e.genTime)
  });
  try {
    const a = await o.verify();
    return a.result ? {
      status: "trusted",
      path: (a.certificatePath ?? []).map(
        (d) => new Uint8Array(d.toSchema(!0).toBER(!1))
      )
    } : {
      status: "untrusted",
      reason: a.resultMessage || `chain validation code ${a.resultCode}`
    };
  } catch (a) {
    return { status: "untrusted", reason: a.message };
  }
}
function B(t, n) {
  return new v(
    y.SignatureRefused,
    `signing refused (${t}): ${n}`,
    {
      details: { reason: t }
    }
  );
}
function M(t) {
  switch (t) {
    case "adbe.pkcs7.detached":
      return "pkcs7";
    case "ETSI.CAdES.detached":
      return "cades-b";
    case "ETSI.RFC3161":
      return "timestamp";
    default:
      throw new v(
        y.InvalidArg,
        `unknown subFilter '${String(t)}'`,
        {
          details: { field: "subFilter" }
        }
      );
  }
}
async function z(t, n) {
  const { key: e, ...r } = n, s = r.kind === "timestamp";
  if (s && e.kind !== "cms")
    throw new v(
      y.InvalidArg,
      "a document timestamp needs a timestamp authority: a CMS key that returns an RFC 3161 token",
      { details: { field: "key" } }
    );
  const i = s ? "ETSI.RFC3161" : r.subFilter ?? "ETSI.CAdES.detached", o = M(i), a = r.digest ?? (e.kind === "raw" ? e.hash : "sha256"), d = await t.signatures.prepare({
    ...r,
    ...s ? {} : { subFilter: i },
    digest: a
  });
  try {
    const c = await P(e, d, i, o), u = await R({ cms: c, prepared: d, profile: o });
    if (!u.ok) throw B(u.reason, u.detail);
    return await t.signatures.complete({
      signingId: d.signingId,
      cms: c,
      expectedVersion: d.expectedVersion
    });
  } catch (c) {
    throw await t.signatures.cancel(d.signingId).catch(() => {
    }), c;
  }
}
async function P(t, n, e, r) {
  if (t.kind === "cms")
    return t.sign({ digest: n.digest, algorithm: n.algorithm, subFilter: e });
  if (r === "timestamp")
    throw new v(y.InvalidArg, "a raw key cannot make a timestamp token");
  return I({
    digest: n.digest,
    hash: n.algorithm,
    profile: r,
    signer: t,
    signingTime: r === "pkcs7" ? (/* @__PURE__ */ new Date()).toISOString() : void 0
  });
}
async function W(t, n = {}) {
  if (!t.signatures) throw new Error("this engine does not implement signatures");
  const e = await t.signatures.list(), r = [];
  for (const s of e.signatures)
    s.signed && r.push(await U(t, e, s, n));
  return r;
}
async function U(t, n, e, r) {
  const s = r.validationTime ?? { kind: "now" };
  let i = "indeterminate", o = "unsupported", a = "unknown", d, c = null, u = null;
  if (!n.chainValid || e.coverage === "malformed")
    i = n.chainValid ? "invalid" : "indeterminate";
  else
    try {
      const l = await t.signatures.getContents(e.field);
      c = f(l), u = c.parsed;
      const S = await t.signatures.getDigest(e.field, u.digestAlgorithm), A = m(S, u.messageDigest);
      i = e.coverage === "whole-revision" && A ? "valid" : "invalid";
    } catch (l) {
      i = l instanceof g && l.reason === "unsupported" ? "indeterminate" : "invalid", l instanceof g || (i = "indeterminate");
    }
  if (c) {
    o = await b(c);
    const l = await j(c, r.trust ?? null, s);
    a = l.status, d = l.reason;
  }
  const w = await V(
    t,
    n,
    e,
    r.until ?? "persisted"
  );
  let h;
  return i === "invalid" || o === "invalid" || w.verdict === "forbidden" ? h = "invalid" : i === "indeterminate" || o === "unsupported" || w.verdict === "indeterminate" ? h = "indeterminate" : h = a === "trusted" ? "valid" : "valid-untrusted", {
    signature: e,
    integrity: i,
    cryptography: o,
    trust: a,
    trustReason: d,
    validationTime: s,
    modifications: w,
    summary: h,
    cms: u
  };
}
async function V(t, n, e, r) {
  if (e.revisionIndex === null)
    return {
      verdict: "indeterminate",
      detail: "the signature seals no whole revision",
      basis: "persisted"
    };
  if (r === "persisted" && e.revisionIndex === n.revisions.length - 1)
    return { verdict: "unchanged", basis: "persisted" };
  try {
    const s = await t.signatures.analyze({
      since: { signatureIndex: e.index },
      until: r
    }), i = s.current.primary, o = i && i.verdict === "forbidden" ? `object ${i.objectNumber}, ${i.rule}${i.detail ? `: ${i.detail}` : ""}` : i && i.verdict === "incomplete" ? `object ${i.objectNumber}: ${i.detail ?? "incomplete evidence"}` : void 0;
    return {
      verdict: s.current.verdict,
      detail: o,
      basis: s.basis.source,
      ...s.later.revisionCount > 0 ? { laterRevisions: s.later.revisionCount } : {},
      ...s.later.undoneObjectNumbers.length > 0 ? { undone: !0 } : {}
    };
  } catch (s) {
    return {
      verdict: "indeterminate",
      detail: `analysis failed: ${s.message}`,
      basis: "persisted"
    };
  }
}
export {
  g as CmsError,
  I as buildDetachedCms,
  q as certificateCommonName,
  Z as createTestSigner,
  G as createTestTimestampAuthority,
  J as generateSigningKeyPair,
  Q as indexedDbKeyStore,
  ee as memoryKeyStore,
  _ as parseDetachedCms,
  te as personalSigner,
  M as profileFor,
  ie as remoteSigner,
  se as selfSignedCertificate,
  z as sign,
  j as validateChain,
  W as validateSignatures,
  b as verifyCmsSignature,
  R as verifyForCompletion,
  ne as webCryptoSigner
};
//# sourceMappingURL=index-DSy5zKh6.js.map
