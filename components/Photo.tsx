import { Product, brandById } from "@/lib/data";

/** Crop focus per product photo (object-position). */
const POS: Record<string, string> = {
  p02: "50% 40%", p05: "50% 55%", p08: "60% 50%", p11: "50% 45%", p13: "50% 50%",
  p16: "50% 50%", p17: "50% 60%", p20: "50% 50%", p21: "50% 50%", p22: "50% 50%", p23: "50% 50%",
};

export function photoSrc(p: Product) { return `/img/${p.id}.jpg`; }

export default function Photo({ p, sizes, priority }: { p: Product; sizes?: string; priority?: boolean }) {
  const b = brandById(p.brandId);
  return (
    <img
      className="photo"
      src={photoSrc(p)}
      alt={`${b.name} ${p.name}`}
      style={{ objectPosition: POS[p.id] ?? "50% 50%" }}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
    />
  );
}
