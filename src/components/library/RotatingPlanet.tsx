"use client";

import React from "react";

interface RotatingPlanetProps {
  emoji: string;
  colour: string;
  size?: "small" | "medium" | "large";
  showOrbitRing?: boolean;
}

export function RotatingPlanet({ emoji, colour, size = "large", showOrbitRing = true }: RotatingPlanetProps) {
  const sizeClasses = {
    small: "w-16 h-16 text-3xl",
    medium: "w-24 h-24 text-5xl",
    large: "w-32 h-32 md:w-40 md:h-40 text-6xl md:text-7xl"
  };

  return (
    <div className="relative flex items-center justify-center" aria-hidden="true">
      {/* Planet sphere */}
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center relative z-10`}
        style={{
          background: `linear-gradient(135deg, ${colour}30 0%, ${colour}10 100%)`,
          boxShadow: `0 0 40px ${colour}40, inset 0 0 20px ${colour}20`,
          border: `1px solid ${colour}30`
        }}
      >
        <span style={{ display: 'block' }}>
          {emoji}
        </span>
      </div>
    </div>
  );
}
