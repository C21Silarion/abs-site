import { PlayCircle } from "lucide-react";
import { Section } from "@/components/site/ui/Section";
import { DuotonePhoto } from "@/components/site/brand/DuotonePhoto";
import { Button } from "@/components/site/ui/Button";
import { galerie } from "@/components/site/content";

/*
 * Galerie de photos (bichromie + tramées) et bloc vidéo statique (ex. reportage
 * France 3). `withVideo` et `more` permettent d'adapter au monopage ou à la
 * mini-galerie de la page d'accueil multipage.
 */
export function GalerieMedias({
  id,
  title = "La vie de l'association",
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
    <Section id={id} className="bg-peach/40">
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
          <div className="relative flex aspect-video items-center justify-center bg-aubergine text-creme">
            <div className="text-center">
              <PlayCircle className="mx-auto h-14 w-14 text-orange" />
              <p className="mt-3 font-display text-xl">Reportage France 3 Haute-Vienne</p>
              <p className="text-sm text-creme/70">Bloc vidéo statique (maquette)</p>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
