"use client";

import React from "react";
import { AutismPlanetLayout } from "./AutismPlanetLayout";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { autismPlanetMobile } from "@/data/planets/autism-mobile";

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
          {/* Text blocks - gentle fade + slide with typewriter reveal */}
          <div className="space-y-6">
            {autismPlanetMobile.understandingIt.blocks.map((block, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.3,
                  ease: "easeOut"
                }}
                className="text-left typewriter-text"
                style={{
                  lineHeight: "1.8em",
                  color: "#E6F0EB",
                  fontSize: "1.0625rem", // 17px
                  whiteSpace: "pre-line", // Preserve line breaks
                  animationDelay: `${idx * 0.3}s`
                }}
              >
                {block}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Gentle transition hint with generous spacing */}
        <div className="text-center pt-12 mt-auto">
          <p className="text-slate-400 text-sm" style={{ lineHeight: "1.6" }}>
            Next: See how autism shows up in daily life
          </p>
        </div>
      </div>

      {/* Typewriter CSS animation */}
      <style jsx>{`
        @keyframes typewriter {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        .typewriter-text {
          overflow: hidden;
          display: inline-block;
          animation: typewriter 0.8s steps(40) forwards;
          animation-play-state: paused;
          opacity: 0;
        }

        .typewriter-text {
          animation-play-state: running;
        }
      `}</style>
    </AutismPlanetLayout>
  );
}
