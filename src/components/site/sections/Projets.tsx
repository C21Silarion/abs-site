import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/site/ui/Section";
import { Button } from "@/components/site/ui/Button";
import { DuotonePhoto } from "@/components/site/brand/DuotonePhoto";
import { projets, video, type Projet } from "@/components/site/content";

/*
 * Projets / collectes HelloAsso. Chaque carte renvoie vers la collecte ; la
 * vignette utilise l'image fournie (public/projets/) avec repli sur le
 * placeholder bichromie si absente. `withVideo` ajoute la vidéo de présentation.
 */
function ProjetCard({ projet }: { projet: Projet }) {
  const [imgError, setImgError] = useState(false);
  const showImage = projet.image && !imgError;

  return (
    <a
      href={projet.href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
    >
      {showImage ? (
        <img
          src={projet.image}
          alt={projet.titre}
          loading="lazy"
          onError={() => setImgError(true)}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : (
        <DuotonePhoto ratio="aspect-[4/3]" className="rounded-none border-0" />
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-lg text-aubergine">{projet.titre}</h3>
        <p className="flex-1 text-sm text-foreground/75">{projet.desc}</p>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-orange transition-all group-hover:gap-2.5">
          {projet.cta} <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

export function Projets({
  id,
  title = "Projets",
  withVideo = false,
  more,
}: {
  id?: string;
  title?: string;
  withVideo?: boolean;
  more?: { label: string; to?: string; href?: string };
}) {
  return (
    <Section
      id={id}
      style={{
        backgroundImage:
          "linear-gradient(to bottom, transparent 0, rgb(253 231 223 / 0.4) 30px, rgb(253 231 223 / 0.4) calc(100% - 30px), transparent 100%)",
      }}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-3xl text-aubergine sm:text-4xl">{title}</h2>
        {more && (
          <Button variant="outline" size="sm" to={more.to} href={more.href}>
            {more.label}
          </Button>
        )}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projets.map((p) => (
          <ProjetCard key={p.href} projet={p} />
        ))}
      </div>

      {withVideo && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-lavande-soft">
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
