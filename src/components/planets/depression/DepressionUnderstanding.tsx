"use client";

import React, { useContext } from "react";
import { PlanetLayout } from "../PlanetLayout";
import { TypewriterText } from "../TypewriterText";
import { useRouter } from "next/navigation";
import { SoundContext } from "@/contexts/SoundContext";
import { depressionPlanetMobile } from "@/data/planets/depression-mobile";

export function DepressionUnderstanding() {
  const router = useRouter();
  const { soundEnabled } = useContext(SoundContext);
  const sections = depressionPlanetMobile.understandingIt.sections;

  const handleNext = () => router.push('/planets/depression/how-it-shows-up');
  const handlePrev = () => router.push('/planets/depression/facts');

  return (
    <PlanetLayout currentStep={3} totalSteps={6} nextRoute="/planets/depression/how-it-shows-up" prevRoute="/planets/depression/facts" onSwipeLeft={handleNext} onSwipeRight={handlePrev} primaryColor="#6B7A8F" accentColor="#4C5B6E">
      <div className="space-y-8 py-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-bold text-slate-100">Understanding Depression</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">What Depression really means — in your own words</p>
        </div>
        <div className="space-y-8 max-w-xl mx-auto">
          {sections.map((section, index) => (
            <div key={index} className="rounded-xl p-6" style={{ background: `linear-gradient(135deg, ${section.color}15 0%, ${section.color}08 100%)`, border: `1px solid ${section.color}30`, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl" style={{ filter: `drop-shadow(0 2px 8px ${section.color}40)` }}>{section.icon}</span>
                <span className="text-3xl opacity-60">{section.visual}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">
                <TypewriterText text={section.title} delay={index * 200} soundEnabled={soundEnabled} />
              </h3>
              <p className="text-slate-300 leading-relaxed" style={{ lineHeight: "1.7" }}>
                <TypewriterText text={section.text} delay={index * 200 + 800} soundEnabled={soundEnabled} />
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-500 text-xs mt-8">Tap to skip typewriter effect</p>
      </div>
    </PlanetLayout>
  );
}
