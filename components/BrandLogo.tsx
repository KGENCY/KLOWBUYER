import type { CSSProperties } from "react";
import { Brand } from "@/lib/data";

/** Placeholder wordmark styling until real logo files are dropped into /public/logos. */
const MARK: Record<string, CSSProperties> = {
  haeum: { fontWeight: 600, letterSpacing: "-.04em" },
  morae: { fontWeight: 400, letterSpacing: ".32em", textTransform: "uppercase", fontSize: ".72em" },
  sooan: { fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", fontSize: ".82em" },
  gyeol: { fontWeight: 400, letterSpacing: "-.02em", fontStyle: "italic" },
  bom: { fontWeight: 600, letterSpacing: "-.05em", textTransform: "lowercase" },
  ilmi: { fontFamily: "var(--mono)", fontWeight: 500, letterSpacing: ".04em", textTransform: "lowercase" },
  nokdu: { fontWeight: 500, letterSpacing: ".2em", textTransform: "uppercase", fontSize: ".7em" },
  yeon: { fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", fontSize: ".86em" },
  ondo: { fontWeight: 400, letterSpacing: "-.03em", textTransform: "lowercase", fontSize: "1.1em" },
  seorin: { fontWeight: 500, letterSpacing: ".28em", textTransform: "uppercase", fontSize: ".74em" },
  dain: { fontFamily: "var(--mono)", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", fontSize: ".72em" },
  purehan: { fontWeight: 400, letterSpacing: ".04em", fontStyle: "italic" },
};

export default function BrandLogo({ b }: { b: Brand }) {
  if (b.logo) return <img className="blogo blogo--img" src={b.logo} alt={b.name} loading="lazy" />;
  return <span className="blogo" style={MARK[b.id]}>{b.name}</span>;
}
