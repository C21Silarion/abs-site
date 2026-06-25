import { useEffect, useState } from "react";
import { getPublicFormToken } from "@/lib/publicApi";

/**
 * Récupère au montage le jeton anti-abus d'un formulaire public (nonce +
 * horloge serveur), à renvoyer lors de la soumission. Le récupérer au
 * chargement (pas à l'envoi) est essentiel : ce délai sert de piège temporel
 * contre les bots. Renvoie "" tant qu'il n'est pas chargé.
 */
export function usePublicFormToken(): string {
  const [token, setToken] = useState("");
  useEffect(() => {
    let alive = true;
    getPublicFormToken().then((t) => { if (alive) setToken(t); });
    return () => { alive = false; };
  }, []);
  return token;
}
