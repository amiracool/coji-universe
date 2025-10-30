"use client";

import React, { useState, lazy, Suspense } from "react";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { autismPlanetMobile } from "@/data/planets/autism-mobile";
import { getPlanetTheme } from "@/lib/planetThemes";
import FactCarousel from "@/components/FactCarousel";

interface AutismPlanetMobileProps {
  onBack?: () => void;
}

// Section Components
function UnderstandingItSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
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

          {isExpanded && (
            <div className="space-y-4 pt-2">
              {autismPlanetMobile.understandingIt.fullContent.map((para, idx) => (
                <p key={idx} className="text-base" style={{ lineHeight: "1.6" }}>
                  {para}
                </p>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200 mt-3"
            style={{ minHeight: "44px", minWidth: "44px" }}
          >
            {isExpanded ? (
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
  );
}

function HowItShowsUpSection() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
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
              onClick={() => toggleSection(section.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-left transition-all duration-200 hover:bg-teal-950/20"
              style={{ minHeight: "44px" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{section.icon}</span>
                <h3 className="text-lg font-medium text-slate-200">{section.title}</h3>
              </div>
              {openSection === section.id ? (
                <ChevronUp size={20} className="text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />
              )}
            </button>

            {openSection === section.id && (
              <div
                className="px-5 pb-5 space-y-3 animate-fadeIn"
                style={{ animation: "fadeIn 0.3s ease-in-out" }}
              >
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
  );
}

function StrengthsSection() {
  const [expandedTile, setExpandedTile] = useState<string | null>(null);

  const toggleTile = (id: string) => {
    setExpandedTile(expandedTile === id ? null : id);
  };

  return (
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
            onClick={() => toggleTile(strength.id)}
            className="p-4 rounded-xl text-left transition-all duration-300 hover:scale-105"
            style={{
              background: expandedTile === strength.id
                ? "linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(13, 148, 136, 0.1) 100%)"
                : "linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.05) 100%)",
              border: "1px solid rgba(20, 184, 166, 0.2)",
              boxShadow: expandedTile === strength.id ? "0 4px 12px rgba(20, 184, 166, 0.2)" : "0 2px 6px rgba(0, 0, 0, 0.1)",
              minHeight: "44px"
            }}
          >
            <h3 className="text-sm font-semibold text-teal-300 mb-2">{strength.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed" style={{ lineHeight: "1.5" }}>
              {expandedTile === strength.id ? strength.fullDesc : strength.shortDesc}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

function PlanningAheadSection() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
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

            {expandedSection === section.id && (
              <div className="space-y-3 animate-fadeIn">
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
              onClick={() => toggleSection(section.id)}
              className="flex items-center gap-2 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200 mt-3"
              style={{ minHeight: "44px", minWidth: "44px" }}
            >
              {expandedSection === section.id ? (
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
  );
}

// Main Component
export function AutismPlanetMobile({ onBack }: AutismPlanetMobileProps = {}) {
  const theme = getPlanetTheme('autism-support');

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Simple teal gradient background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #0f2027 0%, #203a43 30%, #2c5364 100%)"
        }}
      />

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
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
              {autismPlanetMobile.icon}
            </div>
          </div>

          <h1
            className="text-3xl font-bold mb-3 text-slate-100"
            style={{ lineHeight: "1.4" }}
          >
            {autismPlanetMobile.name}
          </h1>

          <p
            className="text-base text-slate-300 leading-relaxed max-w-xl mx-auto"
            style={{ lineHeight: "1.6" }}
          >
            {autismPlanetMobile.tagline}
          </p>

          <div
            className="h-1 w-24 mx-auto mt-5 rounded-full opacity-40"
            style={{ background: "linear-gradient(90deg, #14b8a6, #0d9488)" }}
          />
        </header>

        {/* Main sections - lazy loaded */}
        <Suspense fallback={<div className="text-center text-slate-400">Loading...</div>}>
          <UnderstandingItSection />
          <HowItShowsUpSection />
          <StrengthsSection />
          <PlanningAheadSection />
        </Suspense>

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

        {/* Footer */}
        <footer className="text-center pb-8">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(13, 148, 136, 0.15) 100%)",
              border: "1px solid rgba(20, 184, 166, 0.4)",
              color: "#14b8a6",
              minHeight: "44px"
            }}
          >
            <ArrowLeft size={20} />
            Return to Universe
          </button>
        </footer>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
