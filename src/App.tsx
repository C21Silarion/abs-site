import { Route, Routes } from "react-router-dom";
import ComingSoon from "@/pages/ComingSoon";
import Orienter from "@/pages/Orienter";
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
      <Route path="/" element={<ComingSoon />} />

      {/* Orientation par une structure tierce — URL « need-to-know », non liée. */}
      <Route path="/orienter" element={<Orienter />} />

      {/* Maquettes — accès interne uniquement */}
      <Route path="/test" element={<HomePage />} />
      <Route path="/test/test1" element={<Test1 />} />
      <Route path="/test/test2" element={<Test2Layout />}>
        <Route index element={<Accueil />} />
        <Route path="heberger" element={<Heberger />} />
        <Route path="referent" element={<Referent />} />
        <Route path="ressources" element={<Ressources />} />
      </Route>
    </Routes>
  );
}
