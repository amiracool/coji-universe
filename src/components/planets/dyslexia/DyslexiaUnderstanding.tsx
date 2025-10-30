"use client";

import React, { useContext } from "react";
import { PlanetLayout } from "../PlanetLayout";
import { TypewriterText } from "../TypewriterText";
import { useRouter } from "next/navigation";
import { SoundContext } from "@/contexts/SoundContext";
import { dyslexiaPlanetMobile } from "@/data/planets/dyslexia-mobile";

export function DyslexiaUnderstanding() {
  const router = useRouter();
  const { soundEnabled } = useContext(SoundContext);

  const handleNext = () => {
    router.push('/planets/dyslexia/how-it-shows-up');
  };

  const handlePrev = () => {
    router.push('/planets/dyslexia/facts');
  };

  const sections = dyslexiaPlanetMobile.understandingIt.sections;

  return (
    <PlanetLayout
      currentStep={3}
      totalSteps={6}
      nextRoute="/planets/dyslexia/how-it-shows-up"
      prevRoute="/planets/dyslexia/facts"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
      primaryColor="#FF6B9D"
      accentColor="#FF8FAB"
    >
      <div className="space-y-8 py-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-bold text-slate-100">
            Understanding Dyslexia
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            What Dyslexia really means — in your own words
          </p>
        </div>

        {/* Typewriter sections */}
        <div className="space-y-8 max-w-xl mx-auto">
          {sections.map((section, index) => (
            <div
              key={index}
              className="rounded-xl p-6"
              style={{
                background: `linear-gradient(135deg, ${section.color}15 0%, ${section.color}08 100%)`,
                border: `1px solid ${section.color}30`,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
              }}
            >
              {/* Icon and visual */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl" style={{ filter: `drop-shadow(0 2px 8px ${section.color}40)` }}>
                  {section.icon}
                </span>
                <span className="text-3xl opacity-60">
                  {section.visual}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-slate-100 mb-3">
                <TypewriterText
                  text={section.title}
                  delay={index * 200}
                  soundEnabled={soundEnabled}
                />
              </h3>

              {/* Text with typewriter effect */}
              <p className="text-slate-300 leading-relaxed" style={{ lineHeight: "1.7" }}>
                <TypewriterText
                  text={section.text}
                  delay={index * 200 + 800}
                  soundEnabled={soundEnabled}
                />
              </p>
            </div>
          ))}
        </div>

        {/* Subtle hint about skipping */}
        <p className="text-center text-slate-500 text-xs mt-8">
          Tap to skip typewriter effect
        </p>
      </div>
    </PlanetLayout>
  );
}
