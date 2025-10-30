"use client";

import React, { useState } from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { adhdPlanetMobile } from "@/data/planets/adhd-mobile";

export function ADHDPlanning() {
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(0);

  const handlePrev = () => {
    router.push('/planets/adhd/strengths');
  };

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const nextCategory = () => {
    if (focusedCategoryIndex < adhdPlanetMobile.planningAhead.length - 1) {
      setFocusedCategoryIndex(focusedCategoryIndex + 1);
    }
  };

  const prevCategory = () => {
    if (focusedCategoryIndex > 0) {
      setFocusedCategoryIndex(focusedCategoryIndex - 1);
    }
  };

  const currentCategory = adhdPlanetMobile.planningAhead[focusedCategoryIndex];

  return (
    <PlanetLayout
      currentStep={6}
      totalSteps={6}
      primaryColor="#F96E46"
      accentColor="#FFAA5C"
      prevRoute="/planets/adhd/strengths"
      onSwipeRight={handlePrev}
    >
      <div className="space-y-8 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 inline-block">🧭</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Planning Ahead
          </h2>
          <p className="text-slate-400 text-base max-w-md mx-auto" style={{ lineHeight: "1.8" }}>
            Practical strategies for daily life, one idea at a time
          </p>
          <p className="text-sm max-w-md mx-auto mt-4" style={{ lineHeight: "1.6", opacity: 0.9, color: "#FFAA5C" }}>
            Search the Library for more tips and hacks, or speak to Coji Buddy
          </p>
        </div>

        {/* Focus Mode Navigation */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <button
            onClick={prevCategory}
            disabled={focusedCategoryIndex === 0}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30"
            style={{
              background: "linear-gradient(135deg, rgba(100, 116, 139, 0.15) 0%, rgba(71, 85, 105, 0.1) 100%)",
              border: "1px solid rgba(100, 116, 139, 0.3)",
              color: "#94a3b8"
            }}
          >
            ← Previous
          </button>
          <span className="text-slate-400 text-sm">
            {focusedCategoryIndex + 1} / {adhdPlanetMobile.planningAhead.length}
          </span>
          <button
            onClick={nextCategory}
            disabled={focusedCategoryIndex === adhdPlanetMobile.planningAhead.length - 1}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30"
            style={{
              background: "linear-gradient(135deg, rgba(100, 116, 139, 0.15) 0%, rgba(71, 85, 105, 0.1) 100%)",
              border: "1px solid rgba(100, 116, 139, 0.3)",
              color: "#94a3b8"
            }}
          >
            Next →
          </button>
        </div>

        {/* Categories & Cards */}
        <div
          className="flex flex-col mx-auto"
          style={{
            gap: "1.5rem",
            maxWidth: "600px"
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{currentCategory.icon}</span>
                <h3 className="text-xl font-semibold text-slate-200">
                  {currentCategory.title}
                </h3>
              </div>

              {/* Micro-cards */}
              <div className="flex flex-col" style={{ gap: "1rem" }}>
                {currentCategory.cards.map((card, cardIdx) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: cardIdx * 0.15
                    }}
                    className="rounded-xl p-5 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                    style={{
                      background: expandedCard === card.id
                        ? "linear-gradient(135deg, rgba(249, 110, 70, 0.12) 0%, rgba(255, 170, 92, 0.08) 100%)"
                        : "linear-gradient(135deg, rgba(249, 110, 70, 0.08) 0%, rgba(255, 170, 92, 0.05) 100%)",
                      border: "1px solid rgba(249, 110, 70, 0.2)"
                    }}
                    onClick={() => toggleCard(card.id)}
                  >
                    {/* Card Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{card.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-slate-200 mb-2" style={{ lineHeight: "1.5" }}>
                          {card.title}
                        </h4>
                        <p
                          className="text-base text-slate-300"
                          style={{ lineHeight: "1.8" }}
                        >
                          {card.summary}
                        </p>
                      </div>
                    </div>

                    {/* Expanded Detail - lazy loaded */}
                    <AnimatePresence>
                      {expandedCard === card.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pt-3 mt-3"
                          style={{ borderTop: "1px solid rgba(249, 110, 70, 0.2)" }}
                        >
                          <p
                            className="text-sm text-slate-400"
                            style={{ lineHeight: "1.8" }}
                          >
                            {card.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Show More/Less indicator */}
                    <div className="text-right mt-2">
                      <span className="text-xs font-medium" style={{ color: "#FFAA5C" }}>
                        {expandedCard === card.id ? "Tap to collapse" : "Tap for more"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Completion message */}
        <div className="text-center pt-8 space-y-4">
          <p className="text-slate-300 text-lg" style={{ lineHeight: "1.6" }}>
            You've explored the ADHD Planet
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(249, 110, 70, 0.25) 0%, rgba(255, 170, 92, 0.2) 100%)",
              border: "1px solid rgba(249, 110, 70, 0.4)",
              color: "#F96E46",
              minHeight: "44px"
            }}
          >
            Back to Library
          </button>
        </div>
      </div>
    </PlanetLayout>
  );
}
