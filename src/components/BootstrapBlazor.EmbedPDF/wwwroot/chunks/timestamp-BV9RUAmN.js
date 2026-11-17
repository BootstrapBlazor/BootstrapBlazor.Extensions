import { bj as j, aR as v, b0 as p, t as i, b8 as V, A as o, bk as T, a as y, bl as q, bm as d, aW as a, bn as K, bo as Y, aS as E, bp as m, b6 as D, O as g, bq as z, br as H, bs as R, bt as B, b9 as u, bu as N, b7 as P, b2 as x, bv as k, b1 as O, bw as _, I as F, M as Z, aT as J, f as Q, b3 as X } from "./wasm-url-asset-C3FjD8P-.js";
import { d as ee } from "./splice-DZQMGiQI.js";
import { parseCmsInternal as te } from "./parse-Cavr6pEI.js";
import { C as b } from "./error-CbfoSMwv.js";
function C(e) {
  const n = new j({
    value: (e.signedAttrs?.attributes ?? []).map((t) => t.toSchema())
  });
  return new Uint8Array(n.toBER(!1));
}
async function ce(e) {
  let n;
  try {
    n = e instanceof Uint8Array ? te(e) : e;
  } catch (r) {
    return r instanceof b && r.reason === "unsupported" ? "unsupported" : "invalid";
  }
  const t = await ne(n);
  if (t === "invalid") return "invalid";
  const s = await se(n);
  return s !== "valid" ? s : t === "unsupported" ? "unsupported" : "valid";
}
async function ne(e) {
  if (e.bindings.length === 0) return "absent";
  const n = v();
  let t = !1;
  for (const s of e.bindings) {
    if (!s.algorithm) continue;
    const r = new Uint8Array(
      await n.digest(
        p[s.algorithm],
        i(e.parsed.signerCertificate)
      )
    );
    if (!V(r, s.certHash)) return "invalid";
    t = !0;
  }
  return t ? "valid" : "unsupported";
}
async function se(e) {
  const n = v(), { signerInfo: t, signerCertificate: s, digestAlgorithm: r } = e;
  try {
    return await n.verifyWithPublicKey(
      i(C(t)),
      t.signature,
      s.subjectPublicKeyInfo,
      t.signatureAlgorithm,
      p[r]
    ) ? "valid" : "invalid";
  } catch (h) {
    const c = h.message ?? "";
    return /unsupported|unknown|not supported|not implemented/i.test(c) ? "unsupported" : "invalid";
  }
}
function $(e) {
  const n = e.map((t) => ({ attribute: t, der: new Uint8Array(t.toSchema().toBER(!1)) })).sort((t, s) => ee(t.der, s.der)).map(({ attribute: t }) => t);
  return new K({ type: 0, attributes: n });
}
async function le(e) {
  const n = v();
  if (e.digest.byteLength !== d[e.hash])
    throw new Error(
      `digest is ${e.digest.byteLength} bytes; ${e.hash} needs ${d[e.hash]}`
    );
  if (e.signer.hash !== e.hash)
    throw new Error(
      `the signer hashes with ${e.signer.hash}, the document was prepared with ${e.hash}`
    );
  if (e.signer.certificateChain.length === 0)
    throw new Error("the signer carries no certificate");
  const t = e.signer.certificateChain.map(
    (l) => E.fromBER(i(l))
  ), s = t[0], r = [
    new m({
      type: a.contentType,
      values: [new D({ value: a.data })]
    }),
    new m({
      type: a.messageDigest,
      values: [new g({ valueHex: i(e.digest) })]
    })
  ];
  if (e.profile === "pkcs7" && e.signingTime && r.push(
    new m({
      type: a.signingTime,
      values: [z(new Date(e.signingTime))]
    })
  ), e.profile === "cades-b") {
    const l = await n.digest(
      "SHA-256",
      i(e.signer.certificateChain[0])
    ), A = new H({
      issuer: new R({
        names: [new B({ type: 4, value: s.issuer })]
      }),
      serialNumber: s.serialNumber
    }), f = new u({
      value: [new g({ valueHex: l }), A.toSchema()]
    });
    r.push(
      new m({
        type: a.signingCertificateV2,
        values: [new u({ value: [new u({ value: [f] })] })]
      })
    );
  }
  const h = new o({ algorithmId: y[e.hash] }), c = new N({
    version: 1,
    sid: new P({
      issuer: s.issuer,
      serialNumber: s.serialNumber
    }),
    digestAlgorithm: h,
    signedAttrs: $(r),
    signatureAlgorithm: L(e.signer.algorithm, e.hash)
  }), S = await e.signer.sign(C(c));
  c.signature = new g({
    valueHex: U(e.signer.algorithm, S)
  });
  const I = new x({
    version: 1,
    digestAlgorithms: [h],
    encapContentInfo: new k({ eContentType: a.data }),
    certificates: t,
    signerInfos: [c]
  }), w = new O({
    contentType: a.signedData,
    content: I.toSchema(!0)
  });
  return new Uint8Array(w.toSchema().toBER(!1));
}
function U(e, n) {
  return e === "ECDSA" ? Y(i(n)) : i(n);
}
function L(e, n) {
  switch (e) {
    case "RSA-PKCS1-v1_5":
      return new o({
        algorithmId: {
          sha256: a.sha256WithRsa,
          sha384: a.sha384WithRsa,
          sha512: a.sha512WithRsa
        }[n],
        algorithmParams: new T()
      });
    case "ECDSA":
      return new o({
        algorithmId: { sha256: a.ecdsaSha256, sha384: a.ecdsaSha384, sha512: a.ecdsaSha512 }[n]
      });
    case "RSA-PSS": {
      const t = new o({
        algorithmId: y[n],
        algorithmParams: new T()
      }), s = new q({
        hashAlgorithm: t,
        maskGenAlgorithm: new o({
          algorithmId: a.mgf1,
          algorithmParams: t.toSchema()
        }),
        saltLength: d[n]
      });
      return new o({
        algorithmId: a.rsaPss,
        algorithmParams: s.toSchema()
      });
    }
  }
}
function ae(e) {
  const n = Q(i(e));
  if (n.offset === -1) throw new b("malformed", "TSTInfo is not valid BER");
  let t;
  try {
    t = new _({ schema: n.result });
  } catch (r) {
    throw new b("malformed", `TSTInfo does not parse: ${r.message}`);
  }
  const s = X[t.messageImprint.hashAlgorithm.algorithmId];
  if (!s)
    throw new b(
      "unsupported",
      `message imprint algorithm ${t.messageImprint.hashAlgorithm.algorithmId}`
    );
  return {
    imprintAlgorithm: s,
    imprint: new Uint8Array(t.messageImprint.hashedMessage.valueBlock.valueHexView),
    genTime: t.genTime,
    policy: t.policy,
    nonce: t.nonce ? G(t.nonce.valueBlock.valueHexView) : null
  };
}
function G(e) {
  let n = 0;
  for (; n < e.byteLength - 1 && e[n] === 0; ) n++;
  return new Uint8Array(e.subarray(n));
}
async function re(e) {
  const n = v();
  if (e.digest.byteLength !== d[e.hash])
    throw new Error(
      `digest is ${e.digest.byteLength} bytes; ${e.hash} needs ${d[e.hash]}`
    );
  const t = E.fromBER(
    i(e.authority.certificateChain[0])
  ), r = new _({
    version: 1,
    policy: "1.3.6.1.4.1.57264.1.1",
    messageImprint: new Z({
      hashAlgorithm: new o({ algorithmId: y[e.hash] }),
      hashedMessage: new g({ valueHex: i(e.digest) })
    }),
    serialNumber: new F({ valueHex: i(J()) }),
    genTime: e.genTime ?? /* @__PURE__ */ new Date()
  }).toSchema().toBER(!1), h = await n.digest(p[e.authority.hash], r), c = await n.digest(
    "SHA-256",
    i(e.authority.certificateChain[0])
  ), S = new H({
    issuer: new R({
      names: [new B({ type: 4, value: t.issuer })]
    }),
    serialNumber: t.serialNumber
  }), I = [
    new m({
      type: a.contentType,
      values: [new D({ value: a.tstInfo })]
    }),
    new m({
      type: a.messageDigest,
      values: [new g({ valueHex: h })]
    }),
    new m({
      type: a.signingCertificateV2,
      values: [
        new u({
          value: [
            new u({
              value: [
                new u({
                  value: [new g({ valueHex: c }), S.toSchema()]
                })
              ]
            })
          ]
        })
      ]
    })
  ], w = new o({
    algorithmId: y[e.authority.hash]
  }), l = new N({
    version: 1,
    sid: new P({
      issuer: t.issuer,
      serialNumber: t.serialNumber
    }),
    digestAlgorithm: w,
    signedAttrs: $(I),
    signatureAlgorithm: L(e.authority.algorithm, e.authority.hash)
  }), A = await e.authority.sign(C(l));
  l.signature = new g({
    valueHex: U(e.authority.algorithm, A)
  });
  const f = new k({ eContentType: a.tstInfo });
  f.eContent = new g({ valueHex: r });
  const M = new x({
    version: 3,
    digestAlgorithms: [w],
    encapContentInfo: f,
    certificates: [t],
    signerInfos: [l]
  }), W = new O({
    contentType: a.signedData,
    content: M.toSchema(!0)
  });
  return new Uint8Array(W.toSchema().toBER(!1));
}
const me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buildTimestampToken: re,
  readTimestampInfo: ae,
  withoutLeadingZeros: G
}, Symbol.toStringTag, { value: "Module" }));
export {
  ce as a,
  le as b,
  ne as c,
  ae as r,
  me as t,
  se as v
};
//# sourceMappingURL=timestamp-BV9RUAmN.js.map
