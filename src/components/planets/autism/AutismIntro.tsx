"use client";

import React from "react";
import { AutismPlanetLayout } from "./AutismPlanetLayout";
import { useRouter } from "next/navigation";

export function AutismIntro() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/planets/autism/facts');
  };

  return (
    <AutismPlanetLayout
      currentStep={1}
      totalSteps={6}
      nextRoute="/planets/autism/facts"
      onSwipeLeft={handleNext}
      hideBottomNav={true}
    >
      {/* Hero content - feather-light */}
      <div className="text-center space-y-6 py-12">
        {/* Planet icon with subtle float */}
        <div className="flex justify-center mb-8">
          <div
            className="text-8xl"
            style={{
              animation: "float 6s ease-in-out infinite",
              filter: "drop-shadow(0 4px 12px rgba(20, 184, 166, 0.3))"
            }}
          >
            🧩
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
          Autism Planet
        </h1>

        {/* Description - 1-2 lines only */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed" style={{ lineHeight: "1.6" }}>
          Understanding how autistic minds experience the world — deeply, vividly, and differently.
        </p>

        {/* Gradient divider */}
        <div
          className="h-1 w-24 mx-auto mt-8 rounded-full opacity-40"
          style={{ background: "linear-gradient(90deg, #14b8a6, #0d9488)" }}
        />

        {/* CTA - prominent */}
        <div className="pt-8">
          <button
            onClick={handleNext}
            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.25) 0%, rgba(13, 148, 136, 0.2) 100%)",
              border: "2px solid rgba(20, 184, 166, 0.4)",
              color: "#14b8a6",
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
    </AutismPlanetLayout>
  );
}
