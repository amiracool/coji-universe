"use client";

import React from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";

export function DyscalculiaIntro() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/planets/dyscalculia/facts');
  };

  return (
    <PlanetLayout
      currentStep={1}
      totalSteps={6}
      nextRoute="/planets/dyscalculia/facts"
      onSwipeLeft={handleNext}
      hideBottomNav={true}
      primaryColor="#FFD966"
      accentColor="#F5C542"
    >
      {/* Hero content - feather-light */}
      <div className="text-center space-y-6 py-12">
        {/* Planet icon with subtle float */}
        <div className="flex justify-center mb-8">
          <div
            className="text-8xl"
            style={{
              animation: "float 6s ease-in-out infinite",
              filter: "drop-shadow(0 4px 12px rgba(255, 217, 102, 0.3))"
            }}
          >
            🔢
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
          Dyscalculia Planet
        </h1>

        {/* Description - 1-2 lines only */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed" style={{ lineHeight: "1.6" }}>
          Understanding a brain that processes numbers, quantities, and mathematical concepts differently.
        </p>

        {/* Gradient divider */}
        <div
          className="h-1 w-24 mx-auto mt-8 rounded-full opacity-40"
          style={{ background: "linear-gradient(90deg, #FFD966, #F5C542)" }}
        />

        {/* CTA - prominent */}
        <div className="pt-8">
          <button
            onClick={handleNext}
            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(255, 217, 102, 0.25) 0%, rgba(245, 197, 66, 0.2) 100%)",
              border: "2px solid rgba(255, 217, 102, 0.4)",
              color: "#FFD966",
              minHeight: "44px"
            }}
          >
            Start exploring →
          </button>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </PlanetLayout>
  );
}
