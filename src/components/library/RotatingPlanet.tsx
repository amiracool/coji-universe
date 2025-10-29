"use client";

import React, { useEffect, useRef, useState } from "react";

interface RotatingPlanetProps {
  emoji: string;
  colour: string;
  size?: "small" | "medium" | "large";
  showOrbitRing?: boolean;
}

export function RotatingPlanet({ emoji, colour, size = "large", showOrbitRing = true }: RotatingPlanetProps) {
  const planetRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for mobile and reduced motion
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener("resize", checkMobile);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", checkReducedMotion);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", checkReducedMotion);
    };
  }, []);

  // IntersectionObserver to pause animation when offscreen
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return; // No animation on mobile or reduced motion

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsPaused(!entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    if (planetRef.current) {
      observer.observe(planetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isMobile, prefersReducedMotion]);

  const sizeClasses = {
    small: "w-16 h-16 text-3xl",
    medium: "w-24 h-24 text-5xl",
    large: "w-32 h-32 md:w-40 md:h-40 text-6xl md:text-7xl"
  };

  const shouldAnimate = !isMobile && !prefersReducedMotion;

  return (
    <div ref={planetRef} className="relative flex items-center justify-center" aria-hidden="true">
      {/* Orbit ring glow */}
      {showOrbitRing && (
        <div
          className={`absolute inset-0 rounded-full opacity-30 blur-2xl ${shouldAnimate && !isPaused ? 'animate-pulse-slow' : ''}`}
          style={{
            background: `radial-gradient(circle, ${colour}40 0%, transparent 70%)`,
            width: '140%',
            height: '140%',
            left: '-20%',
            top: '-20%'
          }}
        />
      )}

      {/* Rotating orbit ring */}
      {showOrbitRing && (
        <div
          className={`absolute rounded-full border border-opacity-20 ${shouldAnimate && !isPaused ? 'animate-orbit' : ''}`}
          style={{
            borderColor: colour,
            width: '120%',
            height: '120%'
          }}
        >
          <div
            className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -translate-x-1/2"
            style={{ backgroundColor: colour }}
          />
        </div>
      )}

      {/* Planet sphere */}
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center relative z-10 ${
          shouldAnimate && !isPaused ? "planet-orb animate-float" : ""
        }`}
        style={{
          background: `linear-gradient(135deg, ${colour}30 0%, ${colour}10 100%)`,
          boxShadow: `0 0 40px ${colour}40, inset 0 0 20px ${colour}20`,
          border: `1px solid ${colour}30`
        }}
      >
        {/* Rotating emoji */}
        <span
          className={`${shouldAnimate && !isPaused ? 'animate-spin-very-slow' : ''}`}
          style={{ display: 'block' }}
        >
          {emoji}
        </span>
      </div>

      {/* Atmospheric shimmer */}
      {shouldAnimate && !isPaused && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none animate-shimmer"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${colour}15 50%, transparent 70%)`,
            backgroundSize: '200% 200%'
          }}
        />
      )}
    </div>
  );
}
