import { Section } from "@/components/site/ui/Section";
import { DuotonePhoto } from "@/components/site/brand/DuotonePhoto";
import { Button } from "@/components/site/ui/Button";
import { galerie, video } from "@/components/site/content";

/*
 * Galerie de photos (bichromie + tramées) et vidéo de présentation (YouTube).
 * `withVideo` et `more` permettent d'adapter au monopage ou à la mini-galerie
 * de la page d'accueil multipage.
 */
export function GalerieMedias({
  id,
  title = "Médias & souvenirs",
  count = 4,
  withVideo = true,
  more,
}: {
  id?: string;
  title?: string;
  count?: number;
  withVideo?: boolean;
  more?: { label: string; to?: string; href?: string };
}) {
  const photos = galerie.slice(0, count);

  return (
    <Section id={id} band>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-3xl text-aubergine sm:text-4xl">{title}</h2>
        {more && (
          <Button variant="outline" size="sm" to={more.to} href={more.href}>
            {more.label}
          </Button>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((label) => (
          <DuotonePhoto key={label} label={label} />
        ))}
      </div>

      {withVideo && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-lavande-soft">
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}`}
            title={video.titre}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
    </Section>
  );
}
