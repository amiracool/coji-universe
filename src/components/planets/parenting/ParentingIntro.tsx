"use client";

import React from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";

export function ParentingIntro() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/planets/parenting/facts');
  };

  return (
    <PlanetLayout
      currentStep={1}
      totalSteps={6}
      nextRoute="/planets/parenting/facts"
      onSwipeLeft={handleNext}
      hideBottomNav={true}
      primaryColor="#FFB6A3"
      accentColor="#FF847C"
    >
      <div className="text-center space-y-6 py-12">
        <div className="flex justify-center mb-8">
          <div
            className="text-8xl"
            style={{
              animation: "float 6s ease-in-out infinite",
              filter: "drop-shadow(0 4px 12px #FFB6A340)"
            }}
          >
            🌸
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
          Parenting Planet
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed" style={{ lineHeight: "1.6" }}>
          Supporting neurodiverse children while managing your own needs and challenges.
        </p>
        <div className="h-1 w-24 mx-auto mt-8 rounded-full opacity-40" style={{ background: "linear-gradient(90deg, #FFB6A3, #FF847C)" }} />
        <div className="pt-8">
          <button onClick={handleNext} className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105" style={{ background: "linear-gradient(135deg, #FFB6A340 0%, #FF847C33 100%)", border: "2px solid #FFB6A366", color: "#FFB6A3", minHeight: "44px" }}>
            Start exploring →
          </button>
        </div>
      </div>
      <style jsx>{`@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); }}`}</style>
    </PlanetLayout>
  );
}
