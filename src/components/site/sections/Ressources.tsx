import { FileDown } from "lucide-react";
import { Section } from "@/components/site/ui/Section";
import { ressources } from "@/components/site/content";

/* Zone de téléchargement de PDF statiques (boîte à outils des militant·es). */
export function Ressources({
  id,
  title = "Ressources & boîte à outils",
}: {
  id?: string;
  title?: string;
}) {
  return (
    <Section id={id}>
      <h2 className="text-3xl text-aubergine sm:text-4xl">{title}</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {ressources.map((r) => (
          <a
            key={r.fichier}
            href={`/${r.fichier}`}
            download
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-orange"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-peach text-orange transition-colors group-hover:bg-orange group-hover:text-creme">
              <FileDown className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-xl text-aubergine">{r.titre}</h3>
            <p className="mt-2 grow text-sm text-foreground/75">{r.desc}</p>
            <span className="mt-4 text-sm font-semibold text-orange">
              Télécharger le PDF
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
