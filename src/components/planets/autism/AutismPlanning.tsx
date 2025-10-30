"use client";

import React, { useState } from "react";
import { AutismPlanetLayout } from "./AutismPlanetLayout";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { autismPlanetMobile } from "@/data/planets/autism-mobile";

export function AutismPlanning() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handlePrev = () => {
    router.push('/planets/autism/strengths');
  };

  const toggleSection = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <AutismPlanetLayout
      currentStep={6}
      totalSteps={6}
      prevRoute="/planets/autism/strengths"
      onSwipeRight={handlePrev}
    >
      <div className="space-y-6 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 inline-block">🧭</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Planning Ahead
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Practical strategies for daily life
          </p>
        </div>

        {/* Sections - load content on tap */}
        <div className="space-y-3">
          {autismPlanetMobile.planningAhead.map((section) => (
            <div
              key={section.id}
              className="rounded-xl p-5 transition-all duration-200"
              style={{
                background: expandedId === section.id
                  ? "linear-gradient(135deg, rgba(20, 184, 166, 0.12) 0%, rgba(13, 148, 136, 0.08) 100%)"
                  : "linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.05) 100%)",
                border: "1px solid rgba(20, 184, 166, 0.2)"
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{section.icon}</span>
                <h3 className="text-lg font-medium text-slate-200">{section.title}</h3>
              </div>

              {/* Preview - always visible */}
              <p className="text-base text-slate-300 leading-relaxed mb-3" style={{ lineHeight: "1.6" }}>
                {section.preview}
              </p>

              {/* Expanded content - only loaded when tapped */}
              {expandedId === section.id && (
                <div className="space-y-3 pt-3 border-t border-teal-500/20 animate-fadeIn">
                  {section.fullContent.map((text, idx) => (
                    <p key={idx} className="text-sm text-slate-300 leading-relaxed" style={{ lineHeight: "1.6" }}>
                      {text}
                    </p>
                  ))}

                  {/* Examples */}
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

              {/* Toggle button */}
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center gap-2 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200 mt-3"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                {expandedId === section.id ? (
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

        {/* Completion message */}
        <div className="text-center pt-8">
          <div
            className="inline-block px-6 py-4 rounded-xl"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.05) 100%)",
              border: "1px solid rgba(20, 184, 166, 0.2)"
            }}
          >
            <p className="text-slate-300 text-base mb-2">
              You've explored the Autism Planet
            </p>
            <p className="text-slate-400 text-sm">
              Use the "Back to Library" button to explore more planets
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
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
          animation: fadeIn 0.2s ease-in-out;
        }
      `}</style>
    </AutismPlanetLayout>
  );
}
