"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type YouTubeVideo = { id: string; title: string; vertical: boolean };

/**
 * "Brand in action" from klow.kr: a scrolling row of the brand's YouTube videos.
 * A click opens the video in a lightbox (Esc / ← → / outside click), not a new tab.
 */
export default function VideoStrip({ videos, brandName, label = "Brand in action" }: { videos: YouTubeVideo[]; brandName: string; label?: string }) {
  const [at, setAt] = useState<number | null>(null);
  const row = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const measure = useCallback(() => {
    const el = row.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const scroll = (dir: 1 | -1) => row.current?.scrollBy({ left: dir * row.current.clientWidth * 0.8, behavior: "smooth" });

  if (!videos.length) return null;
  return (
    <section className="pdp__sec vids" aria-label={`${brandName} marketing videos`}>
      <div className="pdp__sechead">
        <span className="eyebrow">{label}</span>
        <div className="pdp__sechead-r">
          <p className="muted">Marketing content from {brandName} · {videos.length} {videos.length === 1 ? "video" : "videos"}</p>
          {!(edges.start && edges.end) && (
            <span className="vids__arrows">
              <button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-label="Previous videos">←</button>
              <button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-label="More videos">→</button>
            </span>
          )}
        </div>
      </div>
      <div className="vids__row" ref={row} onScroll={measure}>
        {videos.map((v, i) => (
          <button key={v.id} type="button" className={`vid ${v.vertical ? "vid--v" : ""}`} aria-label={`Play ${v.title}`} onClick={() => setAt(i)}>
            <span className="vid__frame">
              <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
              <span className="vid__play" aria-hidden="true" />
              <span className="vid__chip">{v.vertical ? "Shorts" : "YouTube"}</span>
            </span>
            <span className="vid__title">{v.title}</span>
          </button>
        ))}
      </div>
      {at !== null && <VideoModal videos={videos} at={at} onMove={setAt} onClose={() => setAt(null)} />}
    </section>
  );
}

function VideoModal({ videos, at, onMove, onClose }: { videos: YouTubeVideo[]; at: number; onMove: (i: number) => void; onClose: () => void }) {
  const v = videos[at];
  const many = videos.length > 1;
  const go = useCallback((d: number) => onMove((at + d + videos.length) % videos.length), [at, onMove, videos.length]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (many && e.key === "ArrowRight") go(1);
      if (many && e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", key); };
  }, [go, many, onClose]);

  const watch = v.vertical ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`;
  return (
    <div className="vmodal" role="dialog" aria-modal="true" aria-label={v.title}>
      <div className="vmodal__scrim" onClick={onClose} />
      {many && <button type="button" className="vmodal__nav vmodal__nav--prev" onClick={() => go(-1)} aria-label="Previous video">‹</button>}
      <div className={`vmodal__win ${v.vertical ? "vmodal__win--v" : "vmodal__win--h"}`} key={v.id}>
        <button type="button" className="vmodal__x" onClick={onClose} aria-label="Close">×</button>
        <div className="vmodal__frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1`}
            title={v.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="vmodal__cap">
          <span className="vmodal__title">{v.title}</span>
          <span className="vmodal__meta">
            {many && <span className="mono">{at + 1} / {videos.length}</span>}
            <a href={watch} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
          </span>
        </div>
      </div>
      {many && <button type="button" className="vmodal__nav vmodal__nav--next" onClick={() => go(1)} aria-label="Next video">›</button>}
    </div>
  );
}
