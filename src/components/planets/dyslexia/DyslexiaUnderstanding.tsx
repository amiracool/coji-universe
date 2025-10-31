"use client";

import React, { useState, useEffect } from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
      }, 25); // 25ms per character = smooth typewriter feel

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

export function DyslexiaUnderstanding() {
  const router = useRouter();
  const { isMuted } = useSound();
  const soundEnabled = !isMuted;
  const [skipAll, setSkipAll] = useState(false);

  const handleNext = () => {
    router.push('/planets/dyslexia/how-it-shows-up');
  };

  const handlePrev = () => {
    router.push('/planets/dyslexia/facts');
  };

  const handlePageClick = () => {
    setSkipAll(true);
  };

  return (
    <PlanetLayout
      currentStep={3}
      totalSteps={6}
      primaryColor="#FF6B9D"
      accentColor="#FF8FAB"
      nextRoute="/planets/dyslexia/how-it-shows-up"
      prevRoute="/planets/dyslexia/facts"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
    >
      <div className="py-6 flex flex-col min-h-screen" onClick={handlePageClick}>
        {/* Header */}
        <div className="text-center mb-8">
          <motion.span
            className="text-6xl mb-4 inline-block"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            🌍
          </motion.span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Understanding Dyslexia
          </h2>
        </div>

        {/* Visual cards with icons and colors */}
        <div className="space-y-6 px-4 pb-12">
          {dyslexiaPlanetMobile.understandingIt.sections.map((section, idx) => {
            const delay = idx * 600; // Stagger each card

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: delay / 1000,
                  ease: "easeOut"
                }}
                className="mx-auto w-full"
                style={{
                  maxWidth: "600px",
                  background: `linear-gradient(135deg, ${section.color}15 0%, ${section.color}08 100%)`,
                  borderRadius: "1.25rem",
                  padding: "2rem",
                  border: `1px solid ${section.color}30`,
                  boxShadow: `0 4px 20px ${section.color}10`
                }}
              >
                {/* Icon row */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span
                    className="text-5xl"
                    style={{
                      filter: `drop-shadow(0 0 12px ${section.color}60)`
                    }}
                  >
                    {section.icon}
                  </span>
                  <span
                    className="text-4xl opacity-60"
                  >
                    {section.visual}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-center text-xl font-semibold mb-4"
                  style={{
                    color: section.color,
                    textShadow: `0 0 20px ${section.color}40`
                  }}
                >
                  {section.title}
                </h3>

                {/* Text with typewriter */}
                <div className="text-center">
                  <p
                    className="text-lg"
                    style={{
                      lineHeight: "1.8em",
                      color: "#E6F0EB",
                      whiteSpace: "pre-line"
                    }}
                  >
                    <TypewriterText text={section.text} delay={delay + 300} soundEnabled={soundEnabled} skipAll={skipAll} />
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Gentle transition hint */}
        <div className="text-center pt-8 pb-6">
          <p className="text-slate-400 text-sm" style={{ lineHeight: "1.6" }}>
            Next: See how dyslexia shows up in daily life
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
    </PlanetLayout>
  );
}
