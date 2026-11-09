import { e as u, C as l, I as f, A as m, U as y, B as w, a as b, E as c } from "./engine-CcsIvE98.js";
import { ai as s, aj as p } from "./wasm-url-asset-DQFmMC86.js";
async function A(t) {
  u();
  const e = new l();
  e.version = 2;
  const a = new Uint8Array(8);
  globalThis.crypto.getRandomValues(a), a[0] &= 127, e.serialNumber = new f({ valueHex: a.buffer });
  const r = new m({
    type: s.commonName,
    value: new y({ value: t.commonName })
  });
  e.issuer.typesAndValues.push(r), e.subject.typesAndValues.push(r);
  const o = Date.now();
  e.notBefore.value = new Date(o - 24 * 3600 * 1e3), e.notAfter.value = new Date(o + (t.validityDays ?? 365) * 24 * 3600 * 1e3);
  const n = new w({ cA: !0 }), i = new b({ valueHex: new Uint8Array([132]).buffer, unusedBits: 2 });
  return e.extensions = [
    new c({
      extnID: s.basicConstraints,
      critical: !0,
      extnValue: n.toSchema().toBER(!1),
      parsedValue: n
    }),
    new c({ extnID: s.keyUsage, critical: !0, extnValue: i.toBER(!1) })
  ], await e.subjectPublicKeyInfo.importKey(t.publicKey), await e.sign(t.privateKey, p[t.hash]), new Uint8Array(e.toSchema(!0).toBER(!1));
}
function B(t) {
  u();
  const e = new Uint8Array(t.byteLength);
  e.set(t);
  const n = l.fromBER(e.buffer).subject.typesAndValues.find((i) => i.type === s.commonName)?.value?.valueBlock?.value;
  return typeof n == "string" && n.length > 0 ? n : null;
}
export {
  B as certificateCommonName,
  A as selfSignedCertificate
};
//# sourceMappingURL=self-signed-DGAIwro5.js.map
