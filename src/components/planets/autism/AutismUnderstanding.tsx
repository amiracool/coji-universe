"use client";

import React, { useState, useEffect } from "react";
import { AutismPlanetLayout } from "./AutismPlanetLayout";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { autismPlanetMobile } from "@/data/planets/autism-mobile";

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start after delay
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 25); // 25ms per character = smooth typewriter feel

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, hasStarted]);

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <span className="cursor-blink" style={{
          borderRight: "2px solid #14b8a6",
          animation: "blink 0.7s step-end infinite"
        }}>
          &nbsp;
        </span>
      )}
    </span>
  );
}

export function AutismUnderstanding() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/planets/autism/how-it-shows-up');
  };

  const handlePrev = () => {
    router.push('/planets/autism/facts');
  };

  return (
    <AutismPlanetLayout
      currentStep={3}
      totalSteps={6}
      nextRoute="/planets/autism/how-it-shows-up"
      prevRoute="/planets/autism/facts"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
    >
      <div className="py-6 flex flex-col min-h-[70vh]">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 inline-block">🌍</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Understanding It
          </h2>
        </div>

        {/* Relational content container */}
        <div
          className="flex-1 mx-auto w-full"
          style={{
            maxWidth: "600px",
            background: "rgba(10, 25, 25, 0.9)",
            borderRadius: "1rem",
            padding: "2rem",
            border: "1px solid rgba(20, 184, 166, 0.15)"
          }}
        >
          {/* Text blocks - typewriter effect */}
          <div className="space-y-6">
            {autismPlanetMobile.understandingIt.blocks.map((block, idx) => {
              // Calculate cumulative delay: wait for all previous blocks to finish typing
              const charsBeforeThis = autismPlanetMobile.understandingIt.blocks
                .slice(0, idx)
                .reduce((sum, b) => sum + b.length, 0);
              const delay = (charsBeforeThis * 25) + (idx * 400); // 25ms per char + 400ms pause between blocks

              return (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: delay / 1000 }}
                  className="text-left"
                  style={{
                    lineHeight: "1.8em",
                    color: "#E6F0EB",
                    fontSize: "1.0625rem", // 17px
                    whiteSpace: "pre-line" // Preserve line breaks
                  }}
                >
                  <TypewriterText text={block} delay={delay} />
                </motion.p>
              );
            })}
          </div>
        </div>

        {/* Gentle transition hint with generous spacing */}
        <div className="text-center pt-12 mt-auto">
          <p className="text-slate-400 text-sm" style={{ lineHeight: "1.6" }}>
            Next: See how autism shows up in daily life
          </p>
        </div>
      </div>

      {/* Cursor blink animation */}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </AutismPlanetLayout>
  );
}
