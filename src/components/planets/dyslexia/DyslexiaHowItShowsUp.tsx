"use client";

import React, { useState, useEffect } from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { dyslexiaPlanetMobile } from "@/data/planets/dyslexia-mobile";
import { useSound } from "@/contexts/SoundContext";

function TypewriterText({ text, delay = 0, onSkip, soundEnabled, skipAll }: { text: string; delay?: number; onSkip?: () => void; soundEnabled?: boolean; skipAll?: boolean }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const lastTapRef = React.useRef<number>(0);

  // Initialize audio context once
  React.useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      // Audio not supported
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play a typewriter click sound
  const playTypeSound = () => {
    if (!audioContextRef.current || !soundEnabled) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      // Very gentle, subtle typewriter click
      oscillator.frequency.value = 800; // Higher, softer frequency
      oscillator.type = 'sine'; // Sine wave for smooth, gentle sound

      const now = audioContextRef.current.currentTime;
      gainNode.gain.setValueAtTime(0.05, now); // Very gentle volume
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      oscillator.start(now);
      oscillator.stop(now + 0.03);
    } catch (e) {
      // Silently fail if audio playback fails
    }
  };

  useEffect(() => {
    // Start after delay
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  // Watch for skipAll prop
  useEffect(() => {
    if (skipAll) {
      setIsSkipped(true);
      setDisplayedText(text);
      setCurrentIndex(text.length);
    }
  }, [skipAll, text]);

  useEffect(() => {
    if (!hasStarted) return;

    if (isSkipped) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
      return;
    }

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        // Play sound first, then update text
        playTypeSound();
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 60); // 60ms per character = slower, therapeutic pace

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, hasStarted, isSkipped]);

  return (
    <span
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      {displayedText}
      {currentIndex < text.length && (
        <span style={{
          borderRight: "2px solid #FF6B9D",
          animation: "blink 1s step-end infinite"
        }}>
          &nbsp;
        </span>
      )}
    </span>
  );
}

export function DyslexiaHowItShowsUp() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isMuted } = useSound();
  const soundEnabled = !isMuted;
  const [skipAll, setSkipAll] = useState(false);

  const handleNext = () => {
    router.push('/planets/dyslexia/strengths');
  };

  const handlePrev = () => {
    router.push('/planets/dyslexia/understanding');
  };

  const goToNext = () => {
    if (currentIndex < dyslexiaPlanetMobile.howItShowsUp.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlePageClick = () => {
    setSkipAll(true);
  };

  const currentSection = dyslexiaPlanetMobile.howItShowsUp[currentIndex];

  return (
    <PlanetLayout
      currentStep={4}
      totalSteps={6}
      primaryColor="#FF6B9D"
      accentColor="#FF8FAB"
      nextRoute="/planets/dyslexia/strengths"
      prevRoute="/planets/dyslexia/understanding"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
    >
      {/* Carousel container */}
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-6" style={{ maxWidth: "600px", margin: "0 auto" }} onClick={handlePageClick}>
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            className="text-5xl mb-6 inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            🌌
          </motion.span>
          <h2 className="text-3xl font-light text-slate-100 mb-4" style={{ letterSpacing: "0.02em" }}>
            How Dyslexia Shows Up
          </h2>
          <p className="text-slate-400 text-base" style={{ lineHeight: "1.6", opacity: 0.7 }}>
            How dyslexia might affect your life
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex gap-2 mb-8">
          {dyslexiaPlanetMobile.howItShowsUp.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => setCurrentIndex(idx)}
              className="transition-all duration-200"
              style={{
                width: currentIndex === idx ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: currentIndex === idx
                  ? section.accentColor
                  : `${section.accentColor}30`,
                opacity: currentIndex === idx ? 1 : 0.4,
                border: "none",
                cursor: "pointer"
              }}
              aria-label={`Go to ${section.title}`}
            />
          ))}
        </div>

        {/* Carousel content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {/* Section header */}
            <div className="text-center mb-8">
              <div
                className="text-5xl mb-4 inline-block"
                style={{
                  color: currentSection.accentColor,
                  filter: `drop-shadow(0 0 8px ${currentSection.accentColor}60)`,
                  textShadow: `0 0 16px ${currentSection.accentColor}40`
                }}
              >
                {currentSection.icon}
              </div>
              <h3
                className="text-2xl font-light tracking-wide"
                style={{
                  color: "#E6F0EB",
                  lineHeight: "1.4"
                }}
              >
                {currentSection.title}
              </h3>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Preview lines with therapeutic typewriter */}
              {currentSection.preview.map((line, lineIdx) => {
                // Calculate cumulative delay for therapeutic pacing
                // Each line waits for previous lines to finish typing
                let totalDelay = 0;
                for (let i = 0; i < lineIdx; i++) {
                  totalDelay += currentSection.preview[i].length * 60 + 800; // typing time + pause
                }

                return (
                  <p
                    key={lineIdx}
                    className="text-center"
                    style={{
                      color: "#CBD5E1",
                      fontSize: "1.0625rem",
                      lineHeight: "1.8em",
                      fontWeight: 300
                    }}
                  >
                    <TypewriterText text={line} delay={totalDelay} soundEnabled={soundEnabled} skipAll={skipAll} />
                  </p>
                );
              })}

              {/* Expanded content with typewriter */}
              {currentSection.expanded.map((line, lineIdx) => {
                // Calculate delay after all preview lines
                let totalDelay = 0;
                currentSection.preview.forEach(prevLine => {
                  totalDelay += prevLine.length * 60 + 800;
                });
                for (let i = 0; i < lineIdx; i++) {
                  totalDelay += currentSection.expanded[i].length * 60 + 800;
                }

                return (
                  <p
                    key={lineIdx}
                    className="text-center"
                    style={{
                      color: "#94A3B8",
                      fontSize: "1rem",
                      lineHeight: "1.8em",
                      fontWeight: 300
                    }}
                  >
                    <TypewriterText text={line} delay={totalDelay} soundEnabled={soundEnabled} skipAll={skipAll} />
                  </p>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="flex items-center justify-between w-full mt-12" style={{ maxWidth: "400px" }}>
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="transition-all duration-200"
            style={{
              opacity: currentIndex === 0 ? 0.3 : 0.6,
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              background: "none",
              border: "none",
              fontSize: "2rem",
              color: currentSection.accentColor,
              filter: currentIndex === 0 ? "none" : `drop-shadow(0 0 4px ${currentSection.accentColor}40)`
            }}
            aria-label="Previous section"
          >
            ←
          </button>

          <div className="text-center">
            <p className="text-slate-400 text-sm" style={{ opacity: 0.7 }}>
              {currentIndex + 1} of {dyslexiaPlanetMobile.howItShowsUp.length}
            </p>
          </div>

          <button
            onClick={goToNext}
            disabled={currentIndex === dyslexiaPlanetMobile.howItShowsUp.length - 1}
            className="transition-all duration-200"
            style={{
              opacity: currentIndex === dyslexiaPlanetMobile.howItShowsUp.length - 1 ? 0.3 : 0.6,
              cursor: currentIndex === dyslexiaPlanetMobile.howItShowsUp.length - 1 ? "not-allowed" : "pointer",
              background: "none",
              border: "none",
              fontSize: "2rem",
              color: currentSection.accentColor,
              filter: currentIndex === dyslexiaPlanetMobile.howItShowsUp.length - 1 ? "none" : `drop-shadow(0 0 4px ${currentSection.accentColor}40)`
            }}
            aria-label="Next section"
          >
            →
          </button>
        </div>
      </div>
    </PlanetLayout>
  );
}
