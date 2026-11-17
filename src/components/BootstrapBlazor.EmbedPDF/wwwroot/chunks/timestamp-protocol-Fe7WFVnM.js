import { T as c, I as u, M as f, t as o, O as d, A as h, a as p, f as g, b as w } from "./wasm-url-asset-C3FjD8P-.js";
import { C as I } from "./error-CbfoSMwv.js";
import { c as v, r as A } from "./splice-DZQMGiQI.js";
function B(e) {
  const s = new c({
    version: 1,
    messageImprint: new f({
      hashAlgorithm: new h({
        algorithmId: p[e.algorithm]
      }),
      hashedMessage: new d({ valueHex: o(e.digest) })
    }),
    ...e.policy ? { reqPolicy: e.policy } : {},
    nonce: new u({ valueHex: o(e.nonce) }),
    certReq: !0
  });
  return new Uint8Array(s.toSchema().toBER(!1));
}
const R = {
  0: "badAlg",
  2: "badRequest",
  5: "badDataFormat",
  14: "timeNotAvailable",
  15: "unacceptedPolicy",
  16: "unacceptedExtension",
  17: "addInfoNotAvailable",
  25: "systemFailure"
};
function S(e) {
  let s, l;
  try {
    const a = g(o(e));
    if (a.offset === -1) throw new Error("not valid BER");
    s = new w({ schema: a.result });
    const t = v(e, A(e, 0, e.byteLength));
    l = t[1] ? e.slice(t[1].start, t[1].end) : null;
  } catch (a) {
    throw new I(
      "malformed",
      `the reply is not a timestamp response: ${a.message}`
    );
  }
  const r = Number(s.status.status), i = s.status.failInfo;
  let n = null;
  if (i) {
    const a = new Uint8Array(i.valueBlock.valueHexView);
    for (let t = 0; t < a.byteLength * 8 && n === null; t++)
      a[t >> 3] & 128 >> (t & 7) && (n = R[t] ?? `failure ${t}`);
  }
  const m = (s.status.statusStrings ?? []).map((a) => a.valueBlock.value).filter(Boolean).join("; ") || null;
  return { granted: r === 0 || r === 1, status: r, failInfo: n, statusText: m, token: l };
}
export {
  B as buildTimestampRequest,
  S as readTimestampResponse
};
//# sourceMappingURL=timestamp-protocol-Fe7WFVnM.js.map
