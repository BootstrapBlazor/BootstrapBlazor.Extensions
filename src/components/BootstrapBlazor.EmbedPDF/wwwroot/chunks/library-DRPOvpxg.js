const l = [
  {
    key: "noto-sans-hebrew",
    familyName: "Noto Sans Hebrew",
    weight: 400,
    italic: !1,
    file: "NotoSansHebrew-Regular.ttf"
  },
  {
    key: "noto-sans-hebrew-bold",
    familyName: "Noto Sans Hebrew",
    weight: 700,
    italic: !1,
    file: "NotoSansHebrew-Bold.ttf"
  },
  {
    key: "noto-naskh-arabic",
    familyName: "Noto Naskh Arabic",
    weight: 400,
    italic: !1,
    file: "NotoNaskhArabic-Regular.ttf"
  },
  {
    key: "noto-naskh-arabic-bold",
    familyName: "Noto Naskh Arabic",
    weight: 700,
    italic: !1,
    file: "NotoNaskhArabic-Bold.ttf"
  }
], n = {
  "noto-sans-hebrew": () => import("./noto-sans-hebrew-BBTTI8mL.js"),
  "noto-sans-hebrew-bold": () => import("./noto-sans-hebrew-bold-Bh9_uc6R.js"),
  "noto-naskh-arabic": () => import("./noto-naskh-arabic-BUvztQBA.js"),
  "noto-naskh-arabic-bold": () => import("./noto-naskh-arabic-bold-27kzfb_N.js")
};
async function r(a) {
  const o = n[a];
  if (!o) throw new Error(`@embedpdf/default-fallback-fonts: no font "${a}"`);
  const { default: t } = await o();
  return i(t);
}
function i(a) {
  const o = atob(a), t = new Uint8Array(o.length);
  for (let e = 0; e < o.length; e++) t[e] = o.charCodeAt(e);
  return t;
}
export {
  l as DEFAULT_FALLBACK_FONTS,
  r as loadFallbackFont
};
//# sourceMappingURL=library-DRPOvpxg.js.map
