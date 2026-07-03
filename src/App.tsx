import { Route, Routes } from "react-router-dom";
import ComingSoon from "@/pages/ComingSoon";
import Orienter from "@/pages/Orienter";
import ViePrivee from "@/pages/ViePrivee";
import HomePage from "@/pages/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ComingSoon />} />

      {/* Orientation par une structure tierce — URL « need-to-know », non liée. */}
      <Route path="/orienter" element={<Orienter />} />

      {/* Notice RGPD — liée depuis les mentions sous les formulaires publics. */}
      <Route path="/vie-privee" element={<ViePrivee />} />

      {/* Site monopage — accès interne uniquement en attendant le lancement */}
      <Route path="/test" element={<HomePage />} />
    </Routes>
  );
}
