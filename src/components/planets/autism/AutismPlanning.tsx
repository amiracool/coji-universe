"use client";

import React, { useState } from "react";
import { AutismPlanetLayout } from "./AutismPlanetLayout";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { autismPlanetMobile } from "@/data/planets/autism-mobile";

export function AutismPlanning() {
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(0);

  const handlePrev = () => {
    router.push('/planets/autism/strengths');
  };

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const nextCategory = () => {
    if (focusedCategoryIndex < autismPlanetMobile.planningAhead.length - 1) {
      setFocusedCategoryIndex(focusedCategoryIndex + 1);
    }
  };

  const prevCategory = () => {
    if (focusedCategoryIndex > 0) {
      setFocusedCategoryIndex(focusedCategoryIndex - 1);
    }
  };

  const currentCategory = autismPlanetMobile.planningAhead[focusedCategoryIndex];
  const categoriesToShow = focusMode
    ? [currentCategory]
    : autismPlanetMobile.planningAhead;

  return (
    <AutismPlanetLayout
      currentStep={6}
      totalSteps={6}
      prevRoute="/planets/autism/strengths"
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
        </div>

        {/* Focus Mode Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setFocusMode(!focusMode)}
            className="flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
            style={{
              background: focusMode
                ? "linear-gradient(135deg, rgba(20, 184, 166, 0.25) 0%, rgba(13, 148, 136, 0.2) 100%)"
                : "linear-gradient(135deg, rgba(100, 116, 139, 0.15) 0%, rgba(71, 85, 105, 0.1) 100%)",
              border: focusMode
                ? "1px solid rgba(20, 184, 166, 0.4)"
                : "1px solid rgba(100, 116, 139, 0.3)",
              color: focusMode ? "#14b8a6" : "#94a3b8",
              minHeight: "44px"
            }}
          >
            {focusMode ? <Eye size={20} /> : <EyeOff size={20} />}
            <span>{focusMode ? "Focus Mode: ON" : "Focus Mode: OFF"}</span>
          </button>
        </div>

        {/* Focus Mode Navigation */}
        {focusMode && (
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
              {focusedCategoryIndex + 1} / {autismPlanetMobile.planningAhead.length}
            </span>
            <button
              onClick={nextCategory}
              disabled={focusedCategoryIndex === autismPlanetMobile.planningAhead.length - 1}
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
        )}

        {/* Categories & Cards */}
        <div
          className="flex flex-col mx-auto"
          style={{
            gap: "1.5rem",
            maxWidth: "600px"
          }}
        >
          <AnimatePresence mode="wait">
            {categoriesToShow.map((category, categoryIdx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-slate-200">
                    {category.title}
                  </h3>
                </div>

                {/* Micro-cards */}
                <div className="flex flex-col" style={{ gap: "1rem" }}>
                  {category.cards.map((card, cardIdx) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: focusMode ? cardIdx * 0.15 : (categoryIdx * 0.1) + (cardIdx * 0.1)
                      }}
                      className="rounded-xl p-5 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                      style={{
                        background: expandedCard === card.id
                          ? "linear-gradient(135deg, rgba(20, 184, 166, 0.12) 0%, rgba(13, 148, 136, 0.08) 100%)"
                          : "linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.05) 100%)",
                        border: "1px solid rgba(20, 184, 166, 0.2)"
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
                            className="pt-3 mt-3 border-t border-teal-500/20"
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
                        <span className="text-xs text-teal-400 font-medium">
                          {expandedCard === card.id ? "Tap to collapse" : "Tap for more"}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Completion message */}
        <div className="text-center pt-8 space-y-4">
          <p className="text-slate-300 text-lg" style={{ lineHeight: "1.6" }}>
            You've explored the Autism Planet
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.25) 0%, rgba(13, 148, 136, 0.2) 100%)",
              border: "1px solid rgba(20, 184, 166, 0.4)",
              color: "#14b8a6",
              minHeight: "44px"
            }}
          >
            Back to Library
          </button>
        </div>
      </div>
    </AutismPlanetLayout>
  );
}
