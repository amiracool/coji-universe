"use client";

import React, { useState } from "react";
import { AutismPlanetLayout } from "./AutismPlanetLayout";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { autismPlanetMobile } from "@/data/planets/autism-mobile";

export function AutismHowItShowsUp() {
  const router = useRouter();
  // Default open: Sensory Processing
  const [activeId, setActiveId] = useState("sensory");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const handleNext = () => {
    router.push('/planets/autism/strengths');
  };

  const handlePrev = () => {
    router.push('/planets/autism/understanding');
  };

  const toggleSection = (id: string) => {
    setActiveId(activeId === id ? "" : id);
    // Reset expanded state when switching sections
    setExpandedSections(new Set());
  };

  const toggleShowMore = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  // Find the active section data
  const activeSection = autismPlanetMobile.howItShowsUp.find(s => s.id === activeId);

  return (
    <AutismPlanetLayout
      currentStep={4}
      totalSteps={6}
      nextRoute="/planets/autism/strengths"
      prevRoute="/planets/autism/understanding"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
    >
      <div className="space-y-6 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 inline-block">🧠</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            How It Shows Up
          </h2>
          <p className="text-slate-400 text-base max-w-md mx-auto" style={{ lineHeight: "1.6" }}>
            Tap a category to explore
          </p>
        </div>

        {/* Categories - only render active one's content */}
        <div className="space-y-3">
          {autismPlanetMobile.howItShowsUp.map((section) => {
            const isExpanded = expandedSections.has(section.id);
            const isActive = activeId === section.id;
            const previewFragments = section.fragments.slice(0, section.previewCount);
            const remainingFragments = section.fragments.slice(section.previewCount);
            const hasMore = remainingFragments.length > 0;

            return (
              <div
                key={section.id}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(20, 184, 166, 0.12) 0%, rgba(13, 148, 136, 0.08) 100%)"
                    : "linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.05) 100%)",
                  border: "1px solid rgba(20, 184, 166, 0.2)",
                  maxWidth: "600px",
                  margin: "0 auto"
                }}
              >
                {/* Header button */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left transition-all duration-150 hover:bg-teal-950/20"
                  style={{ minHeight: "44px" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{section.icon}</span>
                    <h3 className="text-lg font-medium text-slate-200">{section.title}</h3>
                  </div>
                  {isActive ? (
                    <ChevronUp size={20} className="text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {/* Content - only render if active (unmount when closed) */}
                <AnimatePresence>
                  {isActive && activeSection && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5"
                    >
                      {/* Preview fragments */}
                      <div className="space-y-4">
                        {previewFragments.map((fragment, idx) => {
                          const prevFragment = idx > 0 ? previewFragments[idx - 1] : null;
                          const showDivider = prevFragment && prevFragment.cluster !== fragment.cluster;

                          return (
                            <React.Fragment key={idx}>
                              {/* Cluster divider */}
                              {showDivider && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.2, delay: idx * 0.15 }}
                                  className="text-center"
                                  style={{ marginBlock: "1rem" }}
                                >
                                  <span className="text-slate-600 text-sm">✴</span>
                                </motion.div>
                              )}

                              {/* Fragment */}
                              <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: idx * 0.15 }}
                                className="text-base"
                                style={{
                                  lineHeight: "1.8",
                                  color: "#cbd5e1", // softer slate-300
                                  marginBlock: "1rem"
                                }}
                              >
                                {fragment.text}
                              </motion.p>
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Remaining fragments (Show More) */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4 mt-4"
                          >
                            {remainingFragments.map((fragment, idx) => {
                              const prevFragment = idx > 0 ? remainingFragments[idx - 1] : previewFragments[previewFragments.length - 1];
                              const showDivider = prevFragment && prevFragment.cluster !== fragment.cluster;

                              return (
                                <React.Fragment key={`more-${idx}`}>
                                  {/* Cluster divider */}
                                  {showDivider && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ duration: 0.2, delay: idx * 0.15 }}
                                      className="text-center"
                                      style={{ marginBlock: "1rem" }}
                                    >
                                      <span className="text-slate-600 text-sm">✴</span>
                                    </motion.div>
                                  )}

                                  {/* Fragment */}
                                  <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: idx * 0.15 }}
                                    className="text-base"
                                    style={{
                                      lineHeight: "1.8",
                                      color: "#cbd5e1", // softer slate-300
                                      marginBlock: "1rem"
                                    }}
                                  >
                                    {fragment.text}
                                  </motion.p>
                                </React.Fragment>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Show More / Show Less button */}
                      {hasMore && (
                        <div className="text-center mt-6">
                          <button
                            onClick={() => toggleShowMore(section.id)}
                            className="text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors px-4 py-2"
                            style={{ minHeight: "44px" }}
                          >
                            {isExpanded ? "Show less" : "Show more"}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Transition hint */}
        <div className="text-center pt-6">
          <p className="text-slate-400 text-sm">
            Next: Discover your strengths
          </p>
        </div>
      </div>
    </AutismPlanetLayout>
  );
}
