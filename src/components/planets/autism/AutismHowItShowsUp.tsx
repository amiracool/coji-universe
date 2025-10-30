"use client";

import React, { useState } from "react";
import { AutismPlanetLayout } from "./AutismPlanetLayout";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { autismPlanetMobile } from "@/data/planets/autism-mobile";

export function AutismHowItShowsUp() {
  const router = useRouter();
  // Default open: Sensory Processing
  const [activeId, setActiveId] = useState("sensory");

  const handleNext = () => {
    router.push('/planets/autism/strengths');
  };

  const handlePrev = () => {
    router.push('/planets/autism/understanding');
  };

  const toggleSection = (id: string) => {
    setActiveId(activeId === id ? "" : id);
  };

  // Find the active section data
  const activeSection = autismPlanetMobile.howItShowsUp.find(s => s.id === activeId);

  return (
    <AutismPlanetLayout
      currentStep={4}
      totalSteps={6}
      nextRoute="/planets/autism/strengths"
      prevRoute="/planets/autism/understanding"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
    >
      <div className="space-y-6 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 inline-block">🧠</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            How It Shows Up
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Tap a category to explore
          </p>
        </div>

        {/* Categories - only render active one's content */}
        <div className="space-y-3">
          {autismPlanetMobile.howItShowsUp.map((section) => (
            <div
              key={section.id}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{
                background: activeId === section.id
                  ? "linear-gradient(135deg, rgba(20, 184, 166, 0.12) 0%, rgba(13, 148, 136, 0.08) 100%)"
                  : "linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.05) 100%)",
                border: "1px solid rgba(20, 184, 166, 0.2)"
              }}
            >
              {/* Header button */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left transition-all duration-150 hover:bg-teal-950/20"
                style={{ minHeight: "44px" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <h3 className="text-lg font-medium text-slate-200">{section.title}</h3>
                </div>
                {activeId === section.id ? (
                  <ChevronUp size={20} className="text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />
                )}
              </button>

              {/* Content - only render if active (unmount when closed) */}
              {activeId === section.id && activeSection && (
                <div className="px-5 pb-5 space-y-3 animate-fadeIn">
                  {activeSection.content.map((text, idx) => (
                    <p key={idx} className="text-base text-slate-300 leading-relaxed" style={{ lineHeight: "1.6" }}>
                      {text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Transition hint */}
        <div className="text-center pt-6">
          <p className="text-slate-400 text-sm">
            Next: Discover your strengths
          </p>
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
