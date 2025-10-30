"use client";

import React, { useState, useMemo, Suspense } from "react";
import { Search, X, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { CategorySection } from "./CategorySection";
import { RotatingPlanet } from "./RotatingPlanet";
import FactCarousel from "@/components/FactCarousel";
import { EducationalSection } from "./EducationalSection";
import { autismCategories, autismDidYouKnow, type Category } from "@/data/conditions/autism";
import { autismEducationalContent } from "@/data/educational";
import { autismPlanetMobile } from "@/data/planets/autism-mobile";
import { getPlanetTheme } from "@/lib/planetThemes";

export function AutismPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = getPlanetTheme('autism-support');

  // Mobile-first progressive disclosure states
  const [understandingExpanded, setUnderstandingExpanded] = useState(false);
  const [howItShowsOpen, setHowItShowsOpen] = useState<string | null>(null);
  const [strengthExpanded, setStrengthExpanded] = useState<string | null>(null);
  const [planningExpanded, setPlanningExpanded] = useState<string | null>(null);

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
      {/* Simplified atmospheric background - mobile-first performance */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #0f2027 0%, #203a43 30%, #2c5364 100%)"
        }}
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

      {/* Content - max-width for mobile-first readability */}
      <div className="max-w-4xl mx-auto px-4 py-6 planet-autism-support relative" style={{ zIndex: 10 }}>
        {/* Header section - mobile-first */}
        <header className="text-center mb-8">
          {/* Planet icon with subtle float */}
          <div className="flex justify-center mb-4">
            <div
              className="text-6xl"
              style={{
                animation: "float 6s ease-in-out infinite",
                filter: "drop-shadow(0 4px 12px rgba(20, 184, 166, 0.3))"
              }}
            >
              🧩
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-slate-100" style={{ lineHeight: "1.4" }}>
            Autism Planet
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-2" style={{ lineHeight: "1.6" }}>
            {autismPlanetMobile.tagline}
          </p>

          <div
            className="h-1 w-24 mx-auto mt-5 rounded-full opacity-40"
            style={{ background: "linear-gradient(90deg, #14b8a6, #0d9488)" }}
          />
        </header>

        {/* 💫 Understanding It - Mobile-first collapsible section */}
        <section className="mb-6">
          <div
            className="p-5 rounded-xl"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.05) 100%)",
              border: "1px solid rgba(20, 184, 166, 0.2)"
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💫</span>
              <h2 className="text-xl font-semibold text-slate-100">Understanding It</h2>
            </div>

            <div className="space-y-4 text-slate-300 leading-relaxed">
              {autismPlanetMobile.understandingIt.preview.map((para, idx) => (
                <p key={idx} className="text-base" style={{ lineHeight: "1.6" }}>
                  {para}
                </p>
              ))}

              {understandingExpanded && (
                <div className="space-y-4 pt-2">
                  {autismPlanetMobile.understandingIt.fullContent.map((para, idx) => (
                    <p key={idx} className="text-base" style={{ lineHeight: "1.6" }}>
                      {para}
                    </p>
                  ))}
                </div>
              )}

              <button
                onClick={() => setUnderstandingExpanded(!understandingExpanded)}
                className="flex items-center gap-2 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200 mt-3"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                {understandingExpanded ? (
                  <>
                    Show less <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown size={16} />
                  </>
                )}
              </button>
            </div>

            <div
              className="h-px w-full mt-5 opacity-20"
              style={{ background: "linear-gradient(90deg, transparent, #14b8a6, transparent)" }}
            />
          </div>
        </section>

        {/* 🧠 How It Shows Up - Accordion with 5 sections */}
        <section className="mb-6">
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧠</span>
              <h2 className="text-xl font-semibold text-slate-100">How It Shows Up</h2>
            </div>
          </div>

          <div className="space-y-3">
            {autismPlanetMobile.howItShowsUp.map((section) => (
              <div
                key={section.id}
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.05) 100%)",
                  border: "1px solid rgba(20, 184, 166, 0.2)"
                }}
              >
                <button
                  onClick={() => setHowItShowsOpen(howItShowsOpen === section.id ? null : section.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left transition-all duration-200 hover:bg-teal-950/20"
                  style={{ minHeight: "44px" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{section.icon}</span>
                    <h3 className="text-lg font-medium text-slate-200">{section.title}</h3>
                  </div>
                  {howItShowsOpen === section.id ? (
                    <ChevronUp size={20} className="text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {howItShowsOpen === section.id && (
                  <div className="px-5 pb-5 space-y-3">
                    {section.content.map((text, idx) => (
                      <p key={idx} className="text-base text-slate-300 leading-relaxed" style={{ lineHeight: "1.6" }}>
                        {text}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 🌿 Strengths & Sensitivities - Interactive tiles */}
        <section className="mb-6">
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌿</span>
              <h2 className="text-xl font-semibold text-slate-100">Strengths & Sensitivities</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {autismPlanetMobile.strengthsAndSensitivities.map((strength) => (
              <button
                key={strength.id}
                onClick={() => setStrengthExpanded(strengthExpanded === strength.id ? null : strength.id)}
                className="p-4 rounded-xl text-left transition-all duration-300 hover:scale-105"
                style={{
                  background: strengthExpanded === strength.id
                    ? "linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(13, 148, 136, 0.1) 100%)"
                    : "linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.05) 100%)",
                  border: "1px solid rgba(20, 184, 166, 0.2)",
                  boxShadow: strengthExpanded === strength.id ? "0 4px 12px rgba(20, 184, 166, 0.2)" : "0 2px 6px rgba(0, 0, 0, 0.1)",
                  minHeight: "44px"
                }}
              >
                <h3 className="text-sm font-semibold text-teal-300 mb-2">{strength.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed" style={{ lineHeight: "1.5" }}>
                  {strengthExpanded === strength.id ? strength.fullDesc : strength.shortDesc}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* 🧭 Planning Ahead - Vertical stacked with expandable content */}
        <section className="mb-6">
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧭</span>
              <h2 className="text-xl font-semibold text-slate-100">Planning Ahead</h2>
            </div>
          </div>

          <div className="space-y-3">
            {autismPlanetMobile.planningAhead.map((section) => (
              <div
                key={section.id}
                className="rounded-xl p-5"
                style={{
                  background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.05) 100%)",
                  border: "1px solid rgba(20, 184, 166, 0.2)"
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{section.icon}</span>
                  <h3 className="text-lg font-medium text-slate-200">{section.title}</h3>
                </div>

                <p className="text-base text-slate-300 leading-relaxed mb-3" style={{ lineHeight: "1.6" }}>
                  {section.preview}
                </p>

                {planningExpanded === section.id && (
                  <div className="space-y-3">
                    {section.fullContent.map((text, idx) => (
                      <p key={idx} className="text-sm text-slate-300 leading-relaxed" style={{ lineHeight: "1.6" }}>
                        {text}
                      </p>
                    ))}

                    {section.examples.length > 0 && (
                      <div className="mt-3 pl-4 border-l-2 border-teal-500/30">
                        {section.examples.map((example, idx) => (
                          <p key={idx} className="text-sm text-slate-400 italic leading-relaxed mb-2" style={{ lineHeight: "1.5" }}>
                            {example}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={() => setPlanningExpanded(planningExpanded === section.id ? null : section.id)}
                  className="flex items-center gap-2 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200 mt-3"
                  style={{ minHeight: "44px", minWidth: "44px" }}
                >
                  {planningExpanded === section.id ? (
                    <>
                      Show less <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      Read more <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Did You Know Carousel */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-100 text-center mb-4">Did You Know?</h2>
          <FactCarousel facts={autismPlanetMobile.didYouKnowFacts} colour="#14b8a6" />
        </section>

        {/* Superpowers Carousel */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-100 text-center mb-4">Your Superpowers</h2>
          <FactCarousel facts={autismPlanetMobile.superpowersFacts} colour="#14b8a6" />
        </section>

        {/* Your Superpowers in Disguise - Keep existing category system */}
        <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 animate-slide-up" style={{ animationDelay: '400ms', zIndex: 1 }}>
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

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
