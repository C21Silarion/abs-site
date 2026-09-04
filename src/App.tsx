import { Route, Routes } from "react-router-dom";
import Orienter from "@/pages/Orienter";
import ViePrivee from "@/pages/ViePrivee";
import HomePage from "@/pages/HomePage";
import { Analytics } from "@/components/site/Analytics";

export default function App() {
  return (
    <>
      <Analytics />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Orientation par une structure tierce — URL « need-to-know », non liée. */}
        <Route path="/orienter" element={<Orienter />} />

        {/* Notice RGPD — liée depuis les mentions sous les formulaires publics. */}
        <Route path="/vie-privee" element={<ViePrivee />} />
      </Routes>
    </>
  );
}
