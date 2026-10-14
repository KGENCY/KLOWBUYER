"use client";

import { useEffect, useRef, useState } from "react";
import type { IllustrationName } from "@/types/content";
import MediaFrame from "@/components/media/MediaFrame";

type Img = { src?: string; alt: string; fallback: IllustrationName };

/**
 * Magazine grid (mixed tile sizes) that opens a lightbox: arrows / ← → keys to move, Esc or the backdrop to close.
 * Focus returns to the tile that opened it.
 */
export default function BrandGallery({ images, ctaPrefix }: { images: Img[]; ctaPrefix: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);

  const isOpen = open !== null;

  const close = () => {
    const i = open;
    setOpen(null);
    if (i !== null) tiles.current[i]?.focus();
  };

  // Move focus into the lightbox once, when it opens.
  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <>
      <ul className="gal">
        {images.map((img, i) => (
          <li key={i} className={`gal__tile gal__tile--${(i % 6) + 1}`}>
            <button
              ref={(el) => { tiles.current[i] = el; }}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photo: ${img.alt}`}
              data-cta-id={`${ctaPrefix}_open`}
            >
              <MediaFrame src={img.src} alt={img.alt} fallback={img.fallback} />
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={images[open].alt}>
          <div className="lightbox__scrim" onClick={close} />
          <div className="lightbox__win">
            <MediaFrame src={images[open].src} alt={images[open].alt} fallback={images[open].fallback} ratio="4 / 3" caption={`${open + 1} / ${images.length}`} />
            <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={close} aria-label="Close">×</button>
            <button type="button" className="lightbox__btn lightbox__prev" onClick={() => setOpen((open - 1 + images.length) % images.length)} aria-label="Previous photo">←</button>
            <button type="button" className="lightbox__btn lightbox__next" onClick={() => setOpen((open + 1) % images.length)} aria-label="Next photo">→</button>
          </div>
        </div>
      )}
    </>
  );
}
