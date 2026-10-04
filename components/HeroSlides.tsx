"use client";

import { useEffect, useState } from "react";
import { brandById, productById } from "@/lib/data";
import { photoSrc } from "./Photo";
import { showBrand } from "./Collection";

const INTERVAL = 5000;

const SLIDES = [
  { p: productById("p09"), src: "/img/hero.jpg" },
  ...["p05", "p17", "p19", "p11", "p03"].map((id) => ({ p: productById(id), src: photoSrc(productById(id)) })),
];

export default function HeroSlides() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(t);
  }, []);

  const { p } = SLIDES[i];
  const b = brandById(p.brandId);

  return (
    <div className="hero__photo">
      {SLIDES.map((s, n) => (
        <img
          key={s.src}
          src={s.src}
          alt={n === i ? `${brandById(s.p.brandId).name} ${s.p.name}` : ""}
          aria-hidden={n !== i}
          className={n === i ? "is-on" : ""}
          loading={n === 0 ? "eager" : "lazy"}
          fetchPriority={n === 0 ? "high" : undefined}
        />
      ))}

      <a
        href="#collection"
        className="hero__cap"
        key={p.id}
        onClick={(e) => { e.preventDefault(); showBrand(b.id); }}
        aria-label={`See ${b.name} in the collection`}
      >
        <span>{b.name} {p.name}</span><span className="hero__arrow">→</span>
      </a>
    </div>
  );
}
