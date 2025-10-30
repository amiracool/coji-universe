"use client";

import React, { useState } from "react";
import { AutismPlanetLayout } from "./AutismPlanetLayout";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { autismPlanetMobile } from "@/data/planets/autism-mobile";

export function AutismUnderstanding() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNext = () => {
    router.push('/planets/autism/how-it-shows-up');
  };

  const handlePrev = () => {
    router.push('/planets/autism/facts');
  };

  return (
    <AutismPlanetLayout
      currentStep={3}
      totalSteps={6}
      nextRoute="/planets/autism/how-it-shows-up"
      prevRoute="/planets/autism/facts"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
    >
      <div className="space-y-6 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 inline-block">💫</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Understanding It
          </h2>
        </div>

        {/* Content card */}
        <div
          className="p-6 rounded-xl"
          style={{
            background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.05) 100%)",
            border: "1px solid rgba(20, 184, 166, 0.2)"
          }}
        >
          {/* Initial 2 paragraphs */}
          <div className="space-y-4 text-slate-300 leading-relaxed">
            {autismPlanetMobile.understandingIt.preview.map((para, idx) => (
              <p key={idx} className="text-base" style={{ lineHeight: "1.6" }}>
                {para}
              </p>
            ))}

            {/* Expanded content - only loaded when user taps */}
            {isExpanded && (
              <div className="space-y-4 pt-4 border-t border-teal-500/20">
                {autismPlanetMobile.understandingIt.fullContent.map((para, idx) => (
                  <p key={idx} className="text-base" style={{ lineHeight: "1.6" }}>
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Read more button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 mx-auto mt-6 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200"
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
        </div>

        {/* Gentle transition hint */}
        <div className="text-center pt-6">
          <p className="text-slate-400 text-sm">
            Next: See how autism shows up in daily life
          </p>
        </div>
      </div>
    </AutismPlanetLayout>
  );
}
