import { OG_IMAGE, SITE_URL } from "@/lib/site";

/*
 * S'appuie sur le hissage natif React 19 des balises <title>/<meta>/<link> :
 * pas besoin de react-helmet. Le canonical n'est géré qu'ici (pas de doublon
 * statique dans index.html, qui ne porte que le fallback OG/Twitter générique
 * pour les robots sociaux sans JS).
 */
type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  /*
   * Pour une page qui ne doit jamais remonter dans une recherche (ex.
   * /orienter, diffusée au cas par cas) : ne PAS combiner avec un
   * Disallow dans robots.txt — un Disallow empêcherait Googlebot de
   * crawler la page et donc de voir ce noindex, laissant l'URL nue
   * potentiellement listée sans extrait. Autoriser le crawl + noindex
   * est la méthode recommandée par Google pour garantir l'exclusion.
   */
  noindex?: boolean;
};

export function Seo({ title, description, path, image = OG_IMAGE, noindex = false }: SeoProps) {
  const url = `${SITE_URL}${path}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
