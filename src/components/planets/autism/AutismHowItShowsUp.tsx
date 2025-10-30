"use client";

import React, { useState } from "react";
import { AutismPlanetLayout } from "./AutismPlanetLayout";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { autismPlanetMobile } from "@/data/planets/autism-mobile";

export function AutismHowItShowsUp() {
  const router = useRouter();
  const [activeId, setActiveId] = useState("sensory");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const handleNext = () => {
    router.push('/planets/autism/strengths');
  };

  const handlePrev = () => {
    router.push('/planets/autism/understanding');
  };

  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <AutismPlanetLayout
      currentStep={4}
      totalSteps={6}
      nextRoute="/planets/autism/strengths"
      prevRoute="/planets/autism/understanding"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
    >
      {/* Centered container */}
      <div className="flex flex-col items-center py-8 px-4" style={{ gap: "2rem" }}>
        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-5xl mb-4 inline-block">🌌</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            How It Shows Up
          </h2>
          <p className="text-slate-400 text-base max-w-md mx-auto" style={{ lineHeight: "1.6" }}>
            Five constellations of experience
          </p>
        </div>

        {/* Category cards - centered constellation */}
        <div className="flex flex-col items-center w-full" style={{ gap: "1rem" }}>
          {autismPlanetMobile.howItShowsUp.map((section, idx) => {
            const isExpanded = expandedCards.has(section.id);

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.08 }}
                className="w-full"
                style={{ maxWidth: "600px" }}
              >
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg"
                  style={{
                    background: "linear-gradient(180deg, #0D2621 0%, #13342D 100%)",
                    border: `1px solid ${section.accentColor}40`,
                    boxShadow: isExpanded
                      ? `0 0 16px ${section.accentColor}30`
                      : `0 0 8px ${section.accentColor}15`
                  }}
                >
                  {/* Card header */}
                  <div className="px-6 py-5 flex items-center gap-4">
                    {/* Soft glowing icon */}
                    <div
                      className="text-3xl flex-shrink-0"
                      style={{
                        color: section.accentColor,
                        filter: `drop-shadow(0 0 6px ${section.accentColor}50)`,
                        textShadow: `0 0 12px ${section.accentColor}40`
                      }}
                    >
                      {section.icon}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg font-medium flex-1"
                      style={{
                        color: "#E6F0EB",
                        lineHeight: "1.4"
                      }}
                    >
                      {section.title}
                    </h3>
                  </div>

                  {/* Preview content - always visible */}
                  <div className="px-6 pb-5 space-y-3">
                    {section.preview.map((line, lineIdx) => (
                      <p
                        key={lineIdx}
                        className="text-left"
                        style={{
                          color: "#CBD5E1",
                          fontSize: "1.0625rem", // +10%
                          lineHeight: "1.8em"
                        }}
                      >
                        {line}
                      </p>
                    ))}

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3 pt-4 mt-4"
                          style={{
                            borderTop: `1px solid ${section.accentColor}20`
                          }}
                        >
                          {section.expanded.map((line, lineIdx) => (
                            <p
                              key={lineIdx}
                              className="text-left"
                              style={{
                                color: "#94A3B8",
                                fontSize: "1rem",
                                lineHeight: "1.8em"
                              }}
                            >
                              {line}
                            </p>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Show more toggle */}
                    <button
                      onClick={() => toggleCard(section.id)}
                      className="mt-4 text-sm font-medium transition-colors duration-200"
                      style={{
                        color: section.accentColor,
                        minHeight: "44px",
                        opacity: 0.8
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = "0.8"}
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Gentle transition hint */}
        <div className="text-center pt-8">
          <p className="text-slate-400 text-sm" style={{ lineHeight: "1.6" }}>
            Next: Discover your strengths
          </p>
        </div>
      </div>
    </AutismPlanetLayout>
  );
}
