"use client";

import React, { Suspense } from "react";
import { Sparkles, ArrowLeft } from "lucide-react";
import { CategorySection } from "./CategorySection";
import { RotatingPlanet } from "./RotatingPlanet";
import FactCarousel from "@/components/FactCarousel";
import { EducationalSection } from "./EducationalSection";
import { adhdCategories, adhdDidYouKnow } from "@/data/conditions/adhd";
import { adhdEducationalContent } from "@/data/educational";
import { getPlanetTheme } from "@/lib/planetThemes";

export function AdhdPage() {
  const theme = getPlanetTheme('adhd-support');

  return (
    <div className="relative min-h-screen">
      {/* Atmospheric background */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-1000"
        style={{ background: theme.atmosphere.background }}
      >
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
            radial-gradient(ellipse at top, ${theme.colours.primary}35 0%, ${theme.colours.tertiary}25 30%, rgba(88, 28, 14, 0.4) 60%, transparent 100%),
            linear-gradient(180deg, ${theme.colours.primary}20 0%, ${theme.colours.tertiary}15 50%, transparent 100%)
          `,
          zIndex: 1
        }}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 planet-adhd-support relative" style={{ zIndex: 10 }}>

      {/* Hero Banner Section - Combined Header + Carousel */}
      <div className="relative mb-16" style={{ zIndex: 1 }}>

        {/* Header section */}
        <div className="relative text-center mb-6 sm:mb-8 md:mb-10 pt-4 sm:pt-6 animate-slide-up" style={{ zIndex: 1 }}>
          {/* Planet orb */}
          <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
            <RotatingPlanet emoji="🎯" colour="var(--planet-primary)" size="large" />
          </div>

          {/* Welcome text */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-slate-100">
            Welcome to the ADHD Support Planet 🎯
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-3 sm:mb-4">
            Tools and strategies for navigating life with ADHD
          </p>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto italic">
            Gentle guidance and sensory-kind strategies live here
          </p>

          {/* Atmospheric glow line */}
          <div
            className="h-1 w-32 mx-auto mt-4 sm:mt-6 md:mt-8 rounded-full opacity-50 animate-pulse-slow"
            style={{ background: "linear-gradient(90deg, var(--planet-primary), var(--planet-secondary))" }}
          />
        </div>

        {/* Did You Know Carousel */}
        <div className="relative pb-4 sm:pb-6 animate-slide-up" style={{ animationDelay: '200ms', zIndex: 1 }}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-slate-200">
            Did You Know?
          </h2>
          <FactCarousel facts={adhdDidYouKnow} colour="var(--planet-primary)" />
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="relative mb-12 animate-slide-up" style={{ animationDelay: '300ms', zIndex: 1 }}>
        <EducationalSection
          content={adhdEducationalContent}
          accentColor="purple"
        />
      </div>

      {/* Your Superpowers in Disguise */}
      <div className="relative mb-6 sm:mb-8 md:mb-12 lg:mb-16 animate-slide-up" style={{ animationDelay: '400ms', zIndex: 1 }}>
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
            Explore traits by category to discover strategies & strengths
          </p>

          {/* Categories */}
          <Suspense
            fallback={
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 rounded-xl bg-slate-700 bg-opacity-20 animate-pulse"
                  />
                ))}
              </div>
            }
          >
            <div className="space-y-3">
              {adhdCategories.map((category) => (
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
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: `${theme.colours.primary}20`,
              border: `1px solid ${theme.colours.primary}40`,
              color: theme.colours.primary
            }}
          >
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
            Back to Main Library
          </button>
        </div>
      </div>

      {/* Performance Logging */}
      {typeof window !== "undefined" && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (performance.mark) {
                performance.mark('adhd-page-rendered');
                performance.measure('adhd-page-load', 'navigationStart', 'adhd-page-rendered');
                const measure = performance.getEntriesByName('adhd-page-load')[0];
                if (measure) {
                  console.log('[Performance] ADHD page load time:', measure.duration.toFixed(2) + 'ms');
                }
              }
            `
          }}
        />
      )}
      </div>
    </div>
  );
}
