"use client";

import React from "react";
import { AutismPlanetLayout } from "./AutismPlanetLayout";
import { useRouter } from "next/navigation";
import FactCarousel from "@/components/FactCarousel";

// Max 3 facts for dopamine starter
const quickFacts = [
  "Many autistic people excel in fields requiring pattern recognition, like music, mathematics, coding, and research.",
  "Autistic brains often have more synaptic connections, leading to both heightened perception and sensory overwhelm.",
  "Special interests aren't obsessions — they're sources of joy, expertise, and genuine passion."
];

export function AutismFacts() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/planets/autism/understanding');
  };

  const handlePrev = () => {
    router.push('/planets/autism/intro');
  };

  return (
    <AutismPlanetLayout
      currentStep={2}
      totalSteps={6}
      nextRoute="/planets/autism/understanding"
      prevRoute="/planets/autism/intro"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
    >
      <div className="space-y-8 py-6">
        {/* Header */}
        <div className="text-center">
          <span className="text-5xl mb-4 inline-block">✨</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Did You Know?
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Quick insights to start your journey
          </p>
        </div>

        {/* Carousel - cute and low-pressure */}
        <div className="py-4">
          <FactCarousel facts={quickFacts} colour="#14b8a6" />
        </div>

        {/* Light encouragement */}
        <div className="text-center pt-4">
          <p className="text-slate-300 text-base italic">
            Ready to go deeper?
          </p>
        </div>
      </div>
    </AutismPlanetLayout>
  );
}
