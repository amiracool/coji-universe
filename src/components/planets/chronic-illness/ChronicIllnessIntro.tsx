"use client";

import React from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";

export function ChronicIllnessIntro() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/planets/chronic-illness/facts');
  };

  return (
    <PlanetLayout
      currentStep={1}
      totalSteps={6}
      nextRoute="/planets/chronic-illness/facts"
      onSwipeLeft={handleNext}
      hideBottomNav={true}
      primaryColor="#4DBB90"
      accentColor="#2E8B6F"
    >
      <div className="text-center space-y-6 py-12">
        <div className="flex justify-center mb-8">
          <div
            className="text-8xl"
            style={{
              animation: "float 6s ease-in-out infinite",
              filter: "drop-shadow(0 4px 12px #4DBB9040)"
            }}
          >
            🌿
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
          ChronicIllness Planet
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed" style={{ lineHeight: "1.6" }}>
          Understanding life with conditions that affect your body, energy, and daily experience.
        </p>
        <div className="h-1 w-24 mx-auto mt-8 rounded-full opacity-40" style={{ background: "linear-gradient(90deg, #4DBB90, #2E8B6F)" }} />
        <div className="pt-8">
          <button onClick={handleNext} className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105" style={{ background: "linear-gradient(135deg, #4DBB9040 0%, #2E8B6F33 100%)", border: "2px solid #4DBB9066", color: "#4DBB90", minHeight: "44px" }}>
            Start exploring →
          </button>
        </div>
      </div>
      <style jsx>{`@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); }}`}</style>
    </PlanetLayout>
  );
}
