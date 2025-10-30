"use client";

import React, { useState } from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { dyspraxiaPlanetMobile } from "@/data/planets/dyspraxia-mobile";

export function DyspraxiaHowItShowsUp() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sections = dyspraxiaPlanetMobile.howItShowsUp;

  const handleNext = () => {
    router.push('/planets/dyspraxia/strengths');
  };

  const handlePrev = () => {
    router.push('/planets/dyspraxia/understanding');
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <PlanetLayout
      currentStep={4}
      totalSteps={6}
      nextRoute="/planets/dyspraxia/strengths"
      prevRoute="/planets/dyspraxia/understanding"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
      primaryColor="#C58AFF"
      accentColor="#8C52FF"
    >
      <div className="space-y-6 py-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <h2 className="text-3xl font-bold text-slate-100">
            How Dyspraxia Shows Up
          </h2>
          <p className="text-slate-400 text-base" style={{ lineHeight: "1.6", opacity: 0.7 }}>
            How Dyspraxia might affect your life
          </p>
        </div>

        {/* Accordion sections */}
        <div className="space-y-4 max-w-xl mx-auto">
          {sections.map((section) => {
            const isExpanded = expandedId === section.id;

            return (
              <div
                key={section.id}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${section.accentColor}15 0%, ${section.accentColor}08 100%)`,
                  border: `1px solid ${section.accentColor}30`,
                  boxShadow: isExpanded ? "0 8px 24px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.15)"
                }}
              >
                {/* Header - always visible */}
                <button
                  onClick={() => toggleExpand(section.id)}
                  className="w-full p-5 flex items-center justify-between text-left transition-colors duration-200"
                  style={{ minHeight: "44px" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{section.icon}</span>
                    <h3 className="text-lg font-semibold text-slate-100">
                      {section.title}
                    </h3>
                  </div>
                  <div style={{ color: section.accentColor }}>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {/* Preview - always visible */}
                <div className="px-5 pb-3">
                  <ul className="space-y-2">
                    {section.preview.map((item, index) => (
                      <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                        <span style={{ color: section.accentColor, marginTop: "2px" }}>•</span>
                        <span style={{ lineHeight: "1.6" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div
                    className="px-5 pb-5 pt-2"
                    style={{
                      borderTop: `1px solid ${section.accentColor}20`,
                      animation: "fadeIn 0.2s ease-in"
                    }}
                  >
                    <ul className="space-y-2">
                      {section.expanded.map((item, index) => (
                        <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                          <span style={{ color: section.accentColor, marginTop: "2px" }}>•</span>
                          <span style={{ lineHeight: "1.6" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </PlanetLayout>
  );
}
