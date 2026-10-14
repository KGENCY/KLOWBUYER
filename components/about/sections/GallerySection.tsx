import { t } from "@/content/sections";
import MediaFrame from "@/components/media/MediaFrame";
import { SectionAddons, SectionHead, type SectionProps } from "../parts";

/** One large image beside two smaller ones, each with a mono caption. */
export default function GallerySection({ s, locale }: SectionProps) {
  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <div className="about-row">
          <SectionHead s={s} locale={locale} />
          {s.body && <p className="about-row__body">{t(s.body, locale)}</p>}
        </div>
        <div className="about-gallery">
          {s.images?.map((img, i) => (
            <MediaFrame
              key={i}
              src={img.src}
              alt={t(img.alt, locale)}
              caption={t(img.caption, locale)}
              fallback={img.fallback}
              ratio={i === 0 ? undefined : "4 / 3"}
              className={i === 0 ? "about-gallery__main" : ""}
            />
          ))}
        </div>
        <SectionAddons s={s} locale={locale} />
      </div>
    </section>
  );
}
