"use client";

import React, { Suspense } from "react";
import { Sparkles } from "lucide-react";
import { CategorySection } from "./CategorySection";
import { RotatingPlanet } from "./RotatingPlanet";
import FactCarousel from "@/components/FactCarousel";
import { EducationalSection } from "./EducationalSection";
import { chronicIllnessCategories, chronicIllnessDidYouKnow } from "@/data/conditions/chronic-illness";
import { chronicIllnessEducationalContent } from "@/data/educational";
import { getPlanetTheme } from "@/lib/planetThemes";

interface ChronicIllnessPageProps {
  onBack?: () => void;
}

export function ChronicIllnessPage({ onBack }: ChronicIllnessPageProps = {}) {
  const theme = getPlanetTheme('chronic-illness');

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Atmospheric background */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-1000"
        style={{ background: theme.atmosphere.background }}
      >
        {/* Twinkling stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-pulse-slow"
              style={{
                background: theme.atmosphere.stars,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          ))}
        </div>

        {/* Bottom atmospheric glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none opacity-30 blur-3xl"
          style={{
            background: `radial-gradient(ellipse at bottom, ${theme.colours.primary}40 0%, transparent 70%)`
          }}
        />
      </div>

      {/* Planet-themed overlay - covers entire viewport but lets stars show through */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at top, ${theme.colours.primary}35 0%, ${theme.colours.tertiary}25 30%, ${theme.colours.secondary}30 60%, transparent 100%),
            linear-gradient(180deg, ${theme.colours.primary}20 0%, ${theme.colours.tertiary}15 50%, transparent 100%)
          `,
          zIndex: 1
        }}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 planet-chronic-illness relative" style={{ zIndex: 10 }}>
        {/* Header section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 animate-slide-up" style={{ zIndex: 1 }}>
        {/* Planet orb */}
        <div className="flex justify-center mb-8">
          <RotatingPlanet emoji="💊" colour="var(--planet-primary)" size="large" />
        </div>

        {/* Welcome text */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-100">
          Chronic Illness Resources
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-4">
          Pacing, energy management, physiotherapy, and living well with chronic conditions
        </p>

        <p className="text-base text-slate-400 max-w-xl mx-auto italic">
          For navigating life with chronic physical health conditions
        </p>

        {/* Atmospheric glow line */}
        <div
          className="h-1 w-32 mx-auto mt-8 rounded-full opacity-50 animate-pulse-slow"
          style={{ background: "linear-gradient(90deg, var(--planet-primary), var(--planet-secondary))" }}
        />
        </div>

        {/* Did You Know Carousel */}
        <div className="relative mb-8 sm:mb-10 md:mb-12 lg:mb-16 animate-slide-up" style={{ animationDelay: '200ms', zIndex: 10 }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 sm:mb-7 md:mb-8 text-center text-slate-200">
            Did You Know?
          </h2>
          <FactCarousel facts={chronicIllnessDidYouKnow} colour="var(--planet-primary)" />
        </div>

        {/* Educational Content Section */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '300ms', zIndex: 1 }}>
          <EducationalSection
            content={chronicIllnessEducationalContent}
            accentColor="cyan"
          />
        </div>

        {/* Your Superpowers in Disguise */}
        <div className="relative mb-6 sm:mb-8 md:mb-12 lg:mb-16 animate-slide-up" style={{ animationDelay: '400ms', zIndex: 10 }}>
          <div
            className="p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, var(--planet-primary)10 0%, var(--planet-secondary)05 100%)`,
              border: `1px solid var(--planet-primary)20`
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={28} style={{ color: "var(--planet-primary)" }} />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-200">
                Your Superpowers in Disguise
              </h2>
            </div>

            <p className="text-slate-300 mb-8 text-lg">
              These are the everyday experiences you might not have realised have names, or tools to help with.
            </p>

            {/* Categories */}
            <Suspense
              fallback={
                <div className="space-y-4">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 rounded-xl bg-slate-700 bg-opacity-20 animate-pulse"
                    />
                  ))}
                </div>
              }
            >
              <div className="space-y-3">
                {chronicIllnessCategories.map((category) => (
                  <CategorySection key={category.id} category={category} />
                ))}
              </div>
            </Suspense>
          </div>
        </div>

        {/* Bottom Message - Link to Main Library */}
        <div className="relative mb-1 sm:mb-2 md:mb-4 text-center" style={{ zIndex: 1 }}>
          <div
            className="inline-block px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3.5 rounded-lg sm:rounded-xl max-w-xl mx-auto"
            style={{
              background: `linear-gradient(135deg, ${theme.colours.primary}08 0%, ${theme.colours.tertiary}05 100%)`,
              border: `1px solid ${theme.colours.primary}20`
            }}
          >
            <p className="text-slate-300 text-xs sm:text-sm mb-1.5 sm:mb-2 md:mb-2.5">
              Couldn't find what you're looking for?
            </p>
            <p className="text-slate-400 text-xs mb-2.5 sm:mb-3 md:mb-3.5">
              Try searching our main Library — it might be under a different category.
            </p>
            <button
              onClick={handleBackClick}
              className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${theme.colours.primary}20 0%, ${theme.colours.tertiary}15 100%)`,
                border: `1px solid ${theme.colours.primary}40`,
                color: theme.colours.primary,
                boxShadow: `0 2px 8px ${theme.colours.primary}15`
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
