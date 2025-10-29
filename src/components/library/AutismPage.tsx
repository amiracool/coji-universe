"use client";

import React, { useState, useMemo, Suspense } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { CategorySection } from "./CategorySection";
import { RotatingPlanet } from "./RotatingPlanet";
import FactCarousel from "@/components/FactCarousel";
import { autismCategories, autismDidYouKnow, type Category } from "@/data/conditions/autism";
import { getPlanetTheme } from "@/lib/planetThemes";

export function AutismPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = getPlanetTheme('autism-support');

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return autismCategories;
    }

    const query = searchQuery.toLowerCase();

    return autismCategories
      .map((category) => {
        const matchingTraits = category.traits.filter((trait) => {
          return (
            trait.title.toLowerCase().includes(query) ||
            trait.summary.toLowerCase().includes(query) ||
            trait.tools?.some((tool) => tool.toLowerCase().includes(query))
          );
        });

        if (matchingTraits.length > 0) {
          return {
            ...category,
            traits: matchingTraits
          } as Category;
        }

        return null;
      })
      .filter(Boolean) as Category[];
  }, [searchQuery]);

  const totalTraits = useMemo(() => {
    return filteredCategories.reduce((sum, cat) => sum + cat.traits.length, 0);
  }, [filteredCategories]);

  const clearSearch = () => {
    setSearchQuery("");
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
      <div className="max-w-7xl mx-auto px-4 py-6 planet-autism-support relative z-10">
        {/* Header section */}
        <div className="text-center mb-16 animate-slide-up">
        {/* Planet orb */}
        <div className="flex justify-center mb-8">
          <RotatingPlanet emoji="🌈" colour="var(--planet-primary)" size="large" />
        </div>

        {/* Welcome text */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-100">
          Welcome to the Autism Support Planet 🌈
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-4">
          Understanding and celebrating neurodivergent experiences on the autism spectrum
        </p>

        <p className="text-base text-slate-400 max-w-xl mx-auto italic">
          Gentle guidance and sensory-kind strategies live here
        </p>

        {/* Atmospheric glow line */}
        <div
          className="h-1 w-32 mx-auto mt-8 rounded-full opacity-50 animate-pulse-slow"
          style={{ background: "linear-gradient(90deg, var(--planet-primary), var(--planet-secondary))" }}
        />
        </div>

        {/* Did You Know Carousel */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-slate-200">
            Did You Know?
          </h2>
          <FactCarousel facts={autismDidYouKnow} colour="var(--planet-primary)" />
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search traits, tools, or strategies..."
              className="w-full pl-10 pr-10 py-3 bg-slate-800 bg-opacity-50 border border-slate-700 border-opacity-30 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
              aria-label="Search autism traits"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {searchQuery && (
            <p className="mt-2 text-xs text-slate-500">
              {totalTraits === 0 ? (
                "No results found"
              ) : (
                `Found ${totalTraits} trait${totalTraits === 1 ? "" : "s"}`
              )}
            </p>
          )}
        </div>

        {/* Your Superpowers in Disguise */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div
            className="p-8 md:p-10 rounded-2xl"
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
                {filteredCategories.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <p className="text-lg mb-2">No traits match your search</p>
                    <p className="text-sm">Try different keywords or browse all categories</p>
                  </div>
                ) : (
                  filteredCategories.map((category) => (
                    <CategorySection key={category.id} category={category} />
                  ))
                )}
              </div>
            </Suspense>
          </div>
        </div>

        {/* Performance Logging */}
        {typeof window !== "undefined" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (performance.mark) {
                  performance.mark('autism-page-rendered');
                  performance.measure('autism-page-load', 'navigationStart', 'autism-page-rendered');
                  const measure = performance.getEntriesByName('autism-page-load')[0];
                  if (measure) {
                    console.log('[Performance] Autism page load time:', measure.duration.toFixed(2) + 'ms');
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
