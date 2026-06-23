import { PageHeader } from "@/components/site/ui/PageHeader";
import { Ressources as RessourcesSection } from "@/components/site/sections/Ressources";
import { GalerieMedias } from "@/components/site/sections/GalerieMedias";

/* Page 4 — Médiathèque & ressources (CDC §5) : armoire à archives statique. */
export default function Ressources() {
  return (
    <>
      <PageHeader
        surtitre="Médiathèque"
        titre="Ressources & boîte à outils"
        intro="Tout pour s'informer, diffuser et soutenir ABS : livret, kit de communication, newsletter et médias."
      />

      <RessourcesSection title="La boîte à outils des militant·es" />
      <GalerieMedias title="Grand angle : médias & souvenirs" count={4} withVideo />
    </>
  );
}
