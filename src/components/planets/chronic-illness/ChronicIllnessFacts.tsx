"use client";

import React from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";
import FactCarousel from "@/components/FactCarousel";
import { chronicillnessPlanetMobile } from "@/data/planets/chronic-illness-mobile";

export function ChronicIllnessFacts() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/planets/chronic-illness/understanding');
  };

  const handlePrev = () => {
    router.push('/planets/chronic-illness');
  };

  return (
    <PlanetLayout
      currentStep={2}
      totalSteps={6}
      nextRoute="/planets/chronic-illness/understanding"
      prevRoute="/planets/chronic-illness"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
      primaryColor="#4DBB90"
      accentColor="#2E8B6F"
    >
      <div className="space-y-8 py-6">
        {/* Header */}
        <div className="text-center">
          <span className="text-5xl mb-4 inline-block">✨</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Did You Know?
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Quick insights to note on your journey through Chronic Illness
          </p>
        </div>

        {/* Carousel - cute and low-pressure */}
        <div className="py-4">
          <FactCarousel facts={chronicillnessPlanetMobile.didYouKnowFacts} colour="#4DBB90" />
        </div>

        {/* Light encouragement */}
        <div className="text-center pt-4">
          <p className="text-slate-300 text-base italic">
            Ready to go deeper?
          </p>
        </div>
      </div>
    </PlanetLayout>
  );
}
