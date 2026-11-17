import { aR as f, aS as y, I as p, t as x, aT as d, aU as b, aV as v, aW as a, aX as l, aY as A, aZ as m, a_ as c, a$ as B, b0 as h } from "./wasm-url-asset-C3FjD8P-.js";
async function U(e) {
  return g(e, "signing");
}
async function V(e) {
  return g(e, "timestamping");
}
async function g(e, s) {
  f();
  const t = new y();
  t.version = 2, t.serialNumber = new p({ valueHex: x(d()) });
  const r = new b({
    type: a.commonName,
    value: new v({ value: e.commonName })
  });
  t.issuer.typesAndValues.push(r), t.subject.typesAndValues.push(r);
  const o = Date.now();
  t.notBefore = l(new Date(o - 24 * 3600 * 1e3)), t.notAfter = l(new Date(o + (e.validityDays ?? 365) * 24 * 3600 * 1e3));
  const n = s === "timestamping", i = new A({ cA: !n }), w = n ? new m({ valueHex: new Uint8Array([128]).buffer, unusedBits: 7 }) : new m({ valueHex: new Uint8Array([132]).buffer, unusedBits: 2 });
  if (t.extensions = [
    new c({
      extnID: a.basicConstraints,
      critical: !0,
      extnValue: i.toSchema().toBER(!1),
      parsedValue: i
    }),
    new c({ extnID: a.keyUsage, critical: !0, extnValue: w.toBER(!1) })
  ], n) {
    const u = new B({ keyPurposes: [a.timeStamping] });
    t.extensions.push(
      new c({
        extnID: a.extendedKeyUsage,
        critical: !0,
        extnValue: u.toSchema().toBER(!1),
        parsedValue: u
      })
    );
  }
  return await t.subjectPublicKeyInfo.importKey(e.publicKey), await t.sign(e.privateKey, h[e.hash]), new Uint8Array(t.toSchema(!0).toBER(!1));
}
function C(e) {
  f();
  const s = new Uint8Array(e.byteLength);
  s.set(e);
  const n = y.fromBER(s.buffer).subject.typesAndValues.find((i) => i.type === a.commonName)?.value?.valueBlock?.value;
  return typeof n == "string" && n.length > 0 ? n : null;
}
export {
  C as certificateCommonName,
  U as selfSignedCertificate,
  V as timestampAuthorityCertificate
};
//# sourceMappingURL=self-signed-DW1GYTMc.js.map
