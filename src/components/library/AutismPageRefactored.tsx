"use client";

import React from "react";
import { RotatingPlanet } from "./RotatingPlanet";
import FactCarousel from "@/components/FactCarousel";
import { QuickRecognition } from "./QuickRecognition";
import { DailyLifeImpact } from "./DailyLifeImpact";
import { PlanningAhead } from "./PlanningAhead";
import { autismDidYouKnow } from "@/data/conditions/autism";
import { autismPlanetData } from "@/data/planets/autism-refactored";
import { getPlanetTheme } from "@/lib/planetThemes";

interface AutismPageRefactoredProps {
  onBack?: () => void;
}

export function AutismPageRefactored({ onBack }: AutismPageRefactoredProps = {}) {
  const theme = getPlanetTheme('autism-support');

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const allRecognitionTraits = [
    ...autismPlanetData.quickRecognitionTraits,
    ...autismPlanetData.fullRecognitionTraits
  ];

  return (
    <div className="relative min-h-screen">
      {/* Simplified atmospheric background - removed 50 star elements for performance */}
      <div
        className="fixed inset-0 -z-10"
        style={{ background: theme.atmosphere.background }}
      >
        {/* Subtle bottom glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(ellipse at bottom, ${theme.colours.primary}40 0%, transparent 70%)`
          }}
        />
      </div>

      {/* Simplified overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${theme.colours.primary}15 0%, transparent 100%)`,
          zIndex: 1
        }}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 relative" style={{ zIndex: 10 }}>

        {/* Header - one-line reassurance + brief summary */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          {/* Static planet orb - no animation for performance */}
          <div className="flex justify-center mb-6">
            <RotatingPlanet emoji="🧩" colour={theme.colours.primary} size="large" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-100">
            Autism
          </h1>

          {/* One-line reassurance */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-2">
            {autismPlanetData.headerReassurance}
          </p>

          {/* Atmospheric glow line */}
          <div
            className="h-1 w-24 mx-auto mt-6 rounded-full opacity-40"
            style={{ background: `linear-gradient(90deg, ${theme.colours.primary}, ${theme.colours.secondary})` }}
          />
        </div>

        {/* Quick Self-Recognition - visible by default */}
        <QuickRecognition
          traits={allRecognitionTraits}
          accentColor="teal"
          quickCount={5}
        />

        {/* Did You Know Carousel - visual/cognitive break */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-slate-200">
            Did you know?
          </h2>
          <FactCarousel facts={autismDidYouKnow} colour={theme.colours.primary} />
        </div>

        {/* How It Affects Daily Life - accordion with lazy loading */}
        <DailyLifeImpact
          categories={autismPlanetData.dailyLifeCategories}
          accentColor="teal"
        />

        {/* Planning Ahead - actionable section */}
        <PlanningAhead
          categories={autismPlanetData.planningCategories}
          accentColor="teal"
          intro={autismPlanetData.planningIntro}
        />

        {/* Bottom navigation */}
        <div className="text-center mt-8">
          <div
            className="inline-block px-4 py-3 rounded-xl max-w-xl mx-auto"
            style={{
              background: `linear-gradient(135deg, ${theme.colours.primary}08 0%, ${theme.colours.tertiary}05 100%)`,
              border: `1px solid ${theme.colours.primary}20`
            }}
          >
            <p className="text-slate-300 text-sm mb-2">
              Can't find what you're looking for?
            </p>
            <p className="text-slate-400 text-xs mb-3">
              Try the main Library — it might be under a different category.
            </p>
            <button
              onClick={handleBackClick}
              className="px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${theme.colours.primary}20 0%, ${theme.colours.tertiary}15 100%)`,
                border: `1px solid ${theme.colours.primary}40`,
                color: theme.colours.primary,
                minHeight: "44px"
              }}
            >
              Back to Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
