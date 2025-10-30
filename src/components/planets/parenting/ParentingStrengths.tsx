"use client";

import React, { useState } from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parentingPlanetMobile } from "@/data/planets/parenting-mobile";

export function ParentingStrengths() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSuperpowerIndex, setCurrentSuperpowerIndex] = useState(0);
  const strengths = parentingPlanetMobile.strengthsAndSensitivities;
  const superpowers = parentingPlanetMobile.superpowersFacts;
  const currentStrength = strengths[currentIndex];

  const handleNext = () => router.push('/planets/parenting/planning');
  const handlePrev = () => router.push('/planets/parenting/how-it-shows-up');
  const nextStrength = () => setCurrentIndex((prev) => (prev + 1) % strengths.length);
  const prevStrength = () => setCurrentIndex((prev) => (prev - 1 + strengths.length) % strengths.length);
  const nextSuperpower = () => setCurrentSuperpowerIndex((prev) => (prev + 1) % superpowers.length);
  const prevSuperpower = () => setCurrentSuperpowerIndex((prev) => (prev - 1 + superpowers.length) % superpowers.length);

  return (
    <PlanetLayout currentStep={5} totalSteps={6} nextRoute="/planets/parenting/planning" prevRoute="/planets/parenting/how-it-shows-up" onSwipeLeft={handleNext} onSwipeRight={handlePrev} primaryColor="#FFB6A3" accentColor="#FF847C">
      <div className="space-y-10 py-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-slate-100 mb-3">Strengths & Sensitivities of Neurodivergent Parenting</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">Your unique wiring brings both gifts and challenges</p>
        </div>
        <div className="relative max-w-lg mx-auto">
          <div className="rounded-2xl p-8 min-h-[280px]" style={{ background: "linear-gradient(135deg, #FFB6A326 0%, #FF847C1A 100%)", border: "1px solid #FFB6A333", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)" }}>
            <h3 className="text-2xl font-bold text-slate-100 mb-4">{currentStrength.title}</h3>
            <p className="text-lg text-slate-300 mb-4 leading-relaxed" style={{ lineHeight: "1.7" }}>{currentStrength.shortDesc}</p>
            <p className="text-base text-slate-400 leading-relaxed" style={{ lineHeight: "1.6" }}>{currentStrength.fullDesc}</p>
          </div>
          <button onClick={prevStrength} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full transition-all duration-200 hover:scale-110" style={{ background: "#FFB6A333", border: "1px solid #FFB6A34D", color: "#FFB6A3", minHeight: "44px", minWidth: "44px" }} aria-label="Previous strength"><ChevronLeft size={24} /></button>
          <button onClick={nextStrength} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full transition-all duration-200 hover:scale-110" style={{ background: "#FFB6A333", border: "1px solid #FFB6A34D", color: "#FFB6A3", minHeight: "44px", minWidth: "44px" }} aria-label="Next strength"><ChevronRight size={24} /></button>
        </div>
        <div className="flex justify-center gap-2">
          {strengths.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className="w-2 h-2 rounded-full transition-all duration-200" style={{ background: index === currentIndex ? "#FFB6A3" : "#FFB6A34D", transform: index === currentIndex ? "scale(1.2)" : "scale(1)", minHeight: "44px", minWidth: "44px" }} aria-label={`Go to strength ${index + 1}`} />
          ))}
        </div>
        <div className="pt-8">
          <h3 className="text-2xl font-bold text-slate-100 text-center mb-6">Your Parenting Superpowers</h3>
          <div className="relative max-w-lg mx-auto">
            <div className="rounded-xl p-6 min-h-[120px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF847C33 0%, #FFB6A326 100%)", border: "1px solid #FF847C4D", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)" }}>
              <p className="text-lg text-slate-200 text-center leading-relaxed" style={{ lineHeight: "1.7" }}>{superpowers[currentSuperpowerIndex]}</p>
            </div>
            <button onClick={prevSuperpower} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 rounded-full transition-all duration-200 hover:scale-110" style={{ background: "#FF847C33", border: "1px solid #FF847C4D", color: "#FF847C", minHeight: "44px", minWidth: "44px" }} aria-label="Previous superpower"><ChevronLeft size={20} /></button>
            <button onClick={nextSuperpower} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 rounded-full transition-all duration-200 hover:scale-110" style={{ background: "#FF847C33", border: "1px solid #FF847C4D", color: "#FF847C", minHeight: "44px", minWidth: "44px" }} aria-label="Next superpower"><ChevronRight size={20} /></button>
          </div>
          <div className="flex justify-center gap-2 pt-4">
            {superpowers.map((_, index) => (
              <button key={index} onClick={() => setCurrentSuperpowerIndex(index)} className="w-2 h-2 rounded-full transition-all duration-200" style={{ background: index === currentSuperpowerIndex ? "#FF847C" : "#FF847C4D", transform: index === currentSuperpowerIndex ? "scale(1.2)" : "scale(1)", minHeight: "44px", minWidth: "44px" }} aria-label={`Go to superpower ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </PlanetLayout>
  );
}
