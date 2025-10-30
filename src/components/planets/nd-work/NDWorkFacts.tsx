"use client";

import React, { useState } from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ndworkPlanetMobile } from "@/data/planets/nd-work-mobile";

export function NDWorkFacts() {
  const router = useRouter();
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const facts = ndworkPlanetMobile.didYouKnowFacts;

  const handleNext = () => router.push('/planets/nd-work/understanding');
  const handlePrev = () => router.push('/planets/nd-work');
  const nextFact = () => setCurrentFactIndex((prev) => (prev + 1) % facts.length);
  const prevFact = () => setCurrentFactIndex((prev) => (prev - 1 + facts.length) % facts.length);

  return (
    <PlanetLayout currentStep={2} totalSteps={6} nextRoute="/planets/nd-work/understanding" prevRoute="/planets/nd-work" onSwipeLeft={handleNext} onSwipeRight={handlePrev} primaryColor="#7CD2A1" accentColor="#52B788">
      <div className="text-center space-y-8 py-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-slate-100">Did You Know?</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">Quick insights to note on your journey through ND & Work</p>
        </div>
        <div className="relative max-w-lg mx-auto">
          <div className="rounded-2xl p-8 min-h-[240px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7CD2A126 0%, #52B7881A 100%)", border: "1px solid #7CD2A133", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)" }}>
            <p className="text-lg text-slate-200 leading-relaxed" style={{ lineHeight: "1.7" }}>{facts[currentFactIndex]}</p>
          </div>
          <button onClick={prevFact} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full transition-all duration-200 hover:scale-110" style={{ background: "#7CD2A133", border: "1px solid #7CD2A14D", color: "#7CD2A1", minHeight: "44px", minWidth: "44px" }} aria-label="Previous fact">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextFact} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full transition-all duration-200 hover:scale-110" style={{ background: "#7CD2A133", border: "1px solid #7CD2A14D", color: "#7CD2A1", minHeight: "44px", minWidth: "44px" }} aria-label="Next fact">
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex justify-center gap-2 pt-4">
          {facts.map((_, index) => (
            <button key={index} onClick={() => setCurrentFactIndex(index)} className="w-2 h-2 rounded-full transition-all duration-200" style={{ background: index === currentFactIndex ? "#7CD2A1" : "#7CD2A14D", transform: index === currentFactIndex ? "scale(1.2)" : "scale(1)", minHeight: "44px", minWidth: "44px" }} aria-label={`Go to fact ${index + 1}`} />
          ))}
        </div>
      </div>
    </PlanetLayout>
  );
}
