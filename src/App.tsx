import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Test1 from "@/pages/Test1";
import Test2Layout from "@/pages/test2/Test2Layout";
import Accueil from "@/pages/test2/Accueil";
import Heberger from "@/pages/test2/Heberger";
import Referent from "@/pages/test2/Referent";
import Ressources from "@/pages/test2/Ressources";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Maquette monopage (CDC §4) */}
      <Route path="/test1" element={<Test1 />} />

      {/* Maquette multipage (CDC §5) */}
      <Route path="/test2" element={<Test2Layout />}>
        <Route index element={<Accueil />} />
        <Route path="heberger" element={<Heberger />} />
        <Route path="referent" element={<Referent />} />
        <Route path="ressources" element={<Ressources />} />
      </Route>
    </Routes>
  );
}
