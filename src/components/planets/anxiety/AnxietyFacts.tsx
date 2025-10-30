"use client";

import React from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";
import FactCarousel from "@/components/FactCarousel";
import { anxietyPlanetMobile } from "@/data/planets/anxiety-mobile";

export function AnxietyFacts() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/planets/anxiety/understanding');
  };

  const handlePrev = () => {
    router.push('/planets/anxiety');
  };

  return (
    <PlanetLayout
      currentStep={2}
      totalSteps={6}
      nextRoute="/planets/anxiety/understanding"
      prevRoute="/planets/anxiety"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
      primaryColor="#5C9EFF"
      accentColor="#4178D0"
    >
      <div className="space-y-8 py-6">
        {/* Header */}
        <div className="text-center">
          <span className="text-5xl mb-4 inline-block">✨</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Did You Know?
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Quick insights to note on your journey through Anxiety
          </p>
        </div>

        {/* Carousel - cute and low-pressure */}
        <div className="py-4">
          <FactCarousel facts={anxietyPlanetMobile.didYouKnowFacts} colour="#5C9EFF" />
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
