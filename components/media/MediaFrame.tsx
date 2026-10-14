import type { IllustrationName } from "@/types/content";
import Illustration from "./Illustration";

/**
 * An image slot that shows the real photo when `src` is set, or the matching SVG drawing until then.
 * Swapping in a warehouse photo is just filling `src` in content/about.ts.
 */
export default function MediaFrame({
  src,
  alt,
  caption,
  fallback,
  ratio,
  priority,
  fit = "cover",
  className = "",
}: {
  src?: string;
  alt: string;
  caption?: string;
  fallback: IllustrationName;
  /** CSS aspect-ratio, e.g. "4 / 3". Omit to let the parent decide the height. */
  ratio?: string;
  priority?: boolean;
  /** "contain" shows the whole image, e.g. a map. */
  fit?: "cover" | "contain";
  className?: string;
}) {
  return (
    <figure className={`media ${className}`}>
      <div className="media__frame" style={ratio ? { aspectRatio: ratio } : undefined}>
        {src ? (
          <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" style={{ objectFit: fit }} />
        ) : (
          <Illustration name={fallback} title={alt} fit={fit} />
        )}
      </div>
      {caption && <figcaption className="media__cap">{caption}</figcaption>}
    </figure>
  );
}
