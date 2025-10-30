"use client";

import React from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";
import FactCarousel from "@/components/FactCarousel";
import { ideasQuestionsPlanetMobile } from "@/data/planets/ideas-questions-mobile";

export function IdeasQuestionsFacts() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/planets/ideas-questions/understanding');
  };

  const handlePrev = () => {
    router.push('/planets/ideas-questions');
  };

  return (
    <PlanetLayout
      currentStep={2}
      totalSteps={6}
      nextRoute="/planets/ideas-questions/understanding"
      prevRoute="/planets/ideas-questions"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
      primaryColor="#A78BFA"
      accentColor="#C4B5FD"
    >
      <div className="space-y-8 py-6">
        {/* Header */}
        <div className="text-center">
          <span className="text-5xl mb-4 inline-block">✨</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Did You Know?
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Quick insights to note on your journey through Ideas & Questions
          </p>
        </div>

        {/* Carousel - cute and low-pressure */}
        <div className="py-4">
          <FactCarousel facts={ideasQuestionsPlanetMobile.didYouKnowFacts} colour="#A78BFA" />
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
