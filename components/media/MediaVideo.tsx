"use client";

import { useState } from "react";
import type { VideoRatio } from "@/types/content";

const RATIO: Record<VideoRatio, string> = { "16:9": "16 / 9", "9:16": "9 / 16", "1:1": "1 / 1" };

/** Drawn when there's no poster: a muted frame with a film strip edge. */
function PosterArt() {
  return (
    <svg className="video__art" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="160" height="90" fill="#dcd9d0" />
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i}>
          <rect x={4 + i * 13.4} y="4" width="7" height="5" fill="#cfc8ba" />
          <rect x={4 + i * 13.4} y="81" width="7" height="5" fill="#cfc8ba" />
        </g>
      ))}
      <rect x="0" y="13" width="160" height="64" fill="#e3e1da" />
    </svg>
  );
}

/**
 * A video slot in 16:9, 9:16 or 1:1. Shows the poster (or a drawn placeholder) with a play button;
 * it only becomes playable when `src` is set.
 */
export default function MediaVideo({
  src,
  poster,
  ratio,
  title,
  caption,
  ctaId,
}: {
  src?: string;
  poster?: string;
  ratio: VideoRatio;
  /** Accessible name of the video, e.g. "Haeum Lab — how the barrier cream is made". */
  title: string;
  caption?: string;
  ctaId?: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className={`media video video--${ratio.replace(":", "x")}`}>
      <div className="media__frame" style={{ aspectRatio: RATIO[ratio] }}>
        {playing && src ? (
          <video src={src} poster={poster} controls autoPlay playsInline title={title} />
        ) : (
          <>
            {poster ? <img src={poster} alt="" loading="lazy" /> : <PosterArt />}
            {src ? (
              <button className="video__play" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`} data-cta-id={ctaId}>
                <i aria-hidden />
              </button>
            ) : (
              <span className="video__play video__play--off" role="img" aria-label={`${title} — video coming soon`}>
                <i aria-hidden />
                <small>Video coming soon</small>
              </span>
            )}
          </>
        )}
      </div>
      {caption && <figcaption className="media__cap">{caption}</figcaption>}
    </figure>
  );
}
