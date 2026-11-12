import { f as H, t as h, b as x, S as k, C as R, O as u, c as z, G as le, d as I, g as U, h as V, i as W, e as K, j as y, k as J, l as Q, m as X, n as d, o as Z, p as ee, q as te, r as se, N as F, R as ce, s as ge, T as ne, I as he, M as me } from "./engine-CcsIvE98.js";
import { aH as t, aS as ae, aT as C, aU as b, aI as ue } from "./wasm-url-asset-BJXsMWLm.js";
class i extends Error {
  constructor(n, s) {
    super(s), this.reason = n, this.name = "CmsError";
  }
}
function Ce(e) {
  return fe(e).parsed;
}
function fe(e, n = "detached") {
  if (e.byteLength === 0) throw new i("malformed", "empty CMS");
  const s = H(h(e));
  if (s.offset === -1) throw new i("malformed", "CMS is not valid BER");
  let r, a;
  try {
    if (r = new x({ schema: s.result }), r.contentType !== t.signedData)
      throw new i(
        "unsupported",
        `CMS content type ${r.contentType} is not SignedData`
      );
    a = new k({ schema: r.content });
  } catch (o) {
    throw o instanceof i ? o : new i(
      "malformed",
      `CMS does not parse as SignedData: ${o.message}`
    );
  }
  const c = a.encapContentInfo, m = n === "tst-info" ? t.tstInfo : t.data;
  let f = null;
  if (n === "detached") {
    if (c.eContent)
      throw new i(
        "unsupported",
        "CMS carries encapsulated content; a PDF signature is detached"
      );
  } else {
    if (c.eContentType !== t.tstInfo || !c.eContent)
      throw new i("malformed", "a timestamp token must carry a TSTInfo");
    f = new Uint8Array(c.eContent.getValue());
  }
  if (a.signerInfos.length !== 1)
    throw new i(
      "unsupported",
      `CMS has ${a.signerInfos.length} signers; exactly one is expected`
    );
  const g = a.signerInfos[0], v = ae[g.digestAlgorithm.algorithmId];
  if (!v)
    throw new i("unsupported", `digest algorithm ${g.digestAlgorithm.algorithmId}`);
  const S = (a.certificates ?? []).filter(
    (o) => o instanceof R
  ), l = we(g, S);
  if (!l)
    throw new i("malformed", "the signer certificate is not carried by the CMS");
  const A = g.signedAttrs?.attributes ?? [];
  if (A.length === 0)
    throw new i(
      "unsupported",
      "CMS has no signed attributes; a PDF signature needs message-digest"
    );
  const w = (o) => A.find((G) => G.type === o), T = w(t.contentType);
  if (T) {
    const o = T.values[0];
    if (!o || o.valueBlock.toString() !== m)
      throw new i(
        "unsupported",
        `CMS content-type attribute is not ${n === "tst-info" ? "id-ct-TSTInfo" : "id-data"}`
      );
  }
  const p = w(t.messageDigest)?.values[0];
  if (!p || !(p instanceof u))
    throw new i("malformed", "CMS has no message-digest attribute");
  const oe = new Uint8Array(p.valueBlock.valueHexView);
  let M = null;
  const D = w(t.signingTime)?.values[0];
  (D instanceof z || D instanceof le) && (M = D.toDate().toISOString());
  const B = w(t.signingCertificateV2);
  let $ = null;
  if (B) {
    const L = B.values[0]?.valueBlock?.value?.[0]?.valueBlock?.value?.[0]?.valueBlock?.value ?? [];
    let q = 0;
    const E = L[0];
    if (E instanceof I && E.valueBlock.value[0] instanceof U) {
      if (E.valueBlock.value[0].valueBlock.toString() !== t.sha256)
        throw new i("unsupported", "signing-certificate-v2 uses a hash other than SHA-256");
      q = 1;
    }
    const j = L[q];
    if (!(j instanceof u))
      throw new i("malformed", "signing-certificate-v2 carries no certHash");
    $ = new Uint8Array(j.valueBlock.valueHexView);
  }
  let P = null;
  const O = g.unsignedAttrs?.attributes.find(
    (o) => o.type === t.timestampToken
  );
  O?.values[0] && (P = new Uint8Array(O.values[0].toBER(!1)));
  const _ = [
    l,
    ...S.filter((o) => o !== l)
  ];
  return {
    parsed: {
      digestAlgorithm: v,
      messageDigest: oe,
      signingTime: M,
      signerCertificate: Y(l),
      certificates: _.map(Y),
      signatureAlgorithm: g.signatureAlgorithm.algorithmId,
      signingCertificateV2: B !== void 0,
      timestampToken: P
    },
    signedData: a,
    signerInfo: g,
    signerCertificate: l,
    certificates: _,
    essCertHash: $,
    eContent: f
  };
}
function Y(e) {
  return new Uint8Array(e.toSchema(!0).toBER(!1));
}
function we(e, n) {
  const s = e.sid;
  if (s instanceof V) {
    for (const a of n)
      if (a.issuer.isEqual(s.issuer) && W(
        new Uint8Array(a.serialNumber.valueBlock.valueHexView),
        new Uint8Array(s.serialNumber.valueBlock.valueHexView)
      ))
        return a;
    return null;
  }
  const r = s?.valueBlock?.valueHexView;
  if (!r) return null;
  for (const a of n) {
    const c = a.extensions?.find((g) => g.extnID === t.subjectKeyIdentifier), m = c ? H(c.extnValue.valueBlock.valueHexView) : null, f = m && m.offset !== -1 ? m.result : null;
    if (f && W(new Uint8Array(f.valueBlock.valueHexView), new Uint8Array(r)))
      return a;
  }
  return null;
}
async function Te(e) {
  const n = K();
  if (e.digest.byteLength !== C[e.hash])
    throw new Error(
      `digest is ${e.digest.byteLength} bytes; ${e.hash} needs ${C[e.hash]}`
    );
  if (e.signer.hash !== e.hash)
    throw new Error(
      `the signer hashes with ${e.signer.hash}, the document was prepared with ${e.hash}`
    );
  if (e.signer.certificateChain.length === 0)
    throw new Error("the signer carries no certificate");
  const s = e.signer.certificateChain.map(
    (l) => R.fromBER(h(l))
  ), r = s[0], a = [
    new y({
      type: t.contentType,
      values: [new U({ value: t.data })]
    }),
    new y({
      type: t.messageDigest,
      values: [new u({ valueHex: h(e.digest) })]
    })
  ];
  if (e.profile === "pkcs7" && e.signingTime && a.push(
    new y({
      type: t.signingTime,
      values: [new z({ valueDate: new Date(e.signingTime) })]
    })
  ), e.profile === "cades-b") {
    const l = await n.digest(
      "SHA-256",
      h(e.signer.certificateChain[0])
    ), A = new J({
      issuer: new Q({
        names: [new X({ type: 4, value: r.issuer })]
      }),
      serialNumber: r.serialNumber
    }), w = new I({
      value: [new u({ valueHex: l }), A.toSchema()]
    });
    a.push(
      new y({
        type: t.signingCertificateV2,
        values: [new I({ value: [new I({ value: [w] })] })]
      })
    );
  }
  const c = new d({ algorithmId: b[e.hash] }), m = new Z({
    version: 1,
    sid: new V({
      issuer: r.issuer,
      serialNumber: r.serialNumber
    }),
    digestAlgorithm: c,
    signedAttrs: new ee({ type: 0, attributes: a }),
    signatureAlgorithm: ie(e.signer.algorithm, e.hash)
  }), f = new te({
    value: a.map((l) => l.toSchema())
  }).toBER(!1), g = await e.signer.sign(new Uint8Array(f));
  m.signature = new u({
    valueHex: re(e.signer.algorithm, g)
  });
  const v = new k({
    version: 1,
    digestAlgorithms: [c],
    encapContentInfo: new se({ eContentType: t.data }),
    certificates: s,
    signerInfos: [m]
  }), S = new x({
    contentType: t.signedData,
    content: v.toSchema(!0)
  });
  return new Uint8Array(S.toSchema().toBER(!1));
}
function re(e, n) {
  return e === "ECDSA" ? ge(h(n)) : h(n);
}
function ie(e, n) {
  switch (e) {
    case "RSA-PKCS1-v1_5":
      return new d({
        algorithmId: {
          sha256: t.sha256WithRsa,
          sha384: t.sha384WithRsa,
          sha512: t.sha512WithRsa
        }[n],
        algorithmParams: new F()
      });
    case "ECDSA":
      return new d({
        algorithmId: { sha256: t.ecdsaSha256, sha384: t.ecdsaSha384, sha512: t.ecdsaSha512 }[n]
      });
    case "RSA-PSS": {
      const s = new d({
        algorithmId: b[n],
        algorithmParams: new F()
      }), r = new ce({
        hashAlgorithm: s,
        maskGenAlgorithm: new d({
          algorithmId: t.mgf1,
          algorithmParams: s.toSchema()
        }),
        saltLength: C[n]
      });
      return new d({
        algorithmId: t.rsaPss,
        algorithmParams: r.toSchema()
      });
    }
  }
}
function de(e) {
  const n = H(h(e));
  if (n.offset === -1) throw new i("malformed", "TSTInfo is not valid BER");
  let s;
  try {
    s = new ne({ schema: n.result });
  } catch (a) {
    throw new i("malformed", `TSTInfo does not parse: ${a.message}`);
  }
  const r = ae[s.messageImprint.hashAlgorithm.algorithmId];
  if (!r)
    throw new i(
      "unsupported",
      `message imprint algorithm ${s.messageImprint.hashAlgorithm.algorithmId}`
    );
  return {
    imprintAlgorithm: r,
    imprint: new Uint8Array(s.messageImprint.hashedMessage.valueBlock.valueHexView),
    genTime: s.genTime
  };
}
async function ve(e) {
  const n = K();
  if (e.digest.byteLength !== C[e.hash])
    throw new Error(
      `digest is ${e.digest.byteLength} bytes; ${e.hash} needs ${C[e.hash]}`
    );
  const s = R.fromBER(
    h(e.authority.certificateChain[0])
  ), r = globalThis.crypto.getRandomValues(new Uint8Array(8));
  r[0] &= 127;
  const c = new ne({
    version: 1,
    policy: "1.3.6.1.4.1.57264.1.1",
    messageImprint: new me({
      hashAlgorithm: new d({ algorithmId: b[e.hash] }),
      hashedMessage: new u({ valueHex: h(e.digest) })
    }),
    serialNumber: new he({ valueHex: h(r) }),
    genTime: e.genTime ?? /* @__PURE__ */ new Date()
  }).toSchema().toBER(!1), m = await n.digest(ue[e.authority.hash], c), f = await n.digest(
    "SHA-256",
    h(e.authority.certificateChain[0])
  ), g = new J({
    issuer: new Q({
      names: [new X({ type: 4, value: s.issuer })]
    }),
    serialNumber: s.serialNumber
  }), v = [
    new y({
      type: t.contentType,
      values: [new U({ value: t.tstInfo })]
    }),
    new y({
      type: t.messageDigest,
      values: [new u({ valueHex: m })]
    }),
    new y({
      type: t.signingCertificateV2,
      values: [
        new I({
          value: [
            new I({
              value: [
                new I({
                  value: [new u({ valueHex: f }), g.toSchema()]
                })
              ]
            })
          ]
        })
      ]
    })
  ], S = new d({
    algorithmId: b[e.authority.hash]
  }), l = new Z({
    version: 1,
    sid: new V({
      issuer: s.issuer,
      serialNumber: s.serialNumber
    }),
    digestAlgorithm: S,
    signedAttrs: new ee({ type: 0, attributes: v }),
    signatureAlgorithm: ie(e.authority.algorithm, e.authority.hash)
  }), A = new te({
    value: v.map((p) => p.toSchema())
  }).toBER(!1), w = await e.authority.sign(new Uint8Array(A));
  l.signature = new u({
    valueHex: re(e.authority.algorithm, w)
  });
  const T = new k({
    version: 3,
    digestAlgorithms: [S],
    encapContentInfo: new se({
      eContentType: t.tstInfo,
      eContent: new u({ valueHex: c })
    }),
    certificates: [s],
    signerInfos: [l]
  }), N = new x({
    contentType: t.signedData,
    content: T.toSchema(!0)
  });
  return new Uint8Array(N.toSchema().toBER(!1));
}
const be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buildTimestampToken: ve,
  readTimestampInfo: de
}, Symbol.toStringTag, { value: "Module" }));
export {
  i as C,
  Ce as a,
  Te as b,
  fe as p,
  de as r,
  be as t
};
//# sourceMappingURL=timestamp-CjD6uYGV.js.map
