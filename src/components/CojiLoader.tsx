"use client";

import React, { useState, useEffect } from 'react';

interface CojiLoaderProps {
  isLoading: boolean;
}

const affirmations = [
  "Getting your space ready... 🌟",
  "Loading your support tools... 💜",
  "Preparing something helpful... ✨",
  "Almost there, you're doing great... 🌈",
  "Setting up your sanctuary... 🏡",
  "Gathering resources for you... 📚",
  "Making things just right... 💙",
  "One moment while we prepare... 🌸",
  "Creating your safe space... 🛡️",
  "Loading with care... 💝",
  "Your tools are on their way... 🎯",
  "Building your toolkit... 🔧",
  "Preparing your planet... 🪐",
  "Getting things organized for you... 📋",
  "Almost ready! Hang in there... 🌺"
];

export function CojiLoader({ isLoading }: CojiLoaderProps) {
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);

  useEffect(() => {
    if (!isLoading) return;

    // Pick a random affirmation
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(affirmations[randomIndex]);

    // Rotate affirmations every 2 seconds while loading
    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * affirmations.length);
      setCurrentAffirmation(affirmations[nextIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300"
      style={{
        background: 'radial-gradient(ellipse at center, #0f172a 0%, #020617 100%)'
      }}
    >
      <div className="text-center px-6">
        {/* Coji character */}
        <div className="mb-6 animate-bounce">
          <span className="text-6xl sm:text-7xl md:text-8xl">🌟</span>
        </div>

        {/* Affirmation text */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-slate-200 font-light animate-fade-in"
          key={currentAffirmation}
        >
          {currentAffirmation}
        </p>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div
            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-teal-400 animate-pulse"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-fuchsia-400 animate-pulse"
            style={{ animationDelay: '200ms' }}
          />
          <div
            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-400 animate-pulse"
            style={{ animationDelay: '400ms' }}
          />
        </div>
      </div>
    </div>
  );
}
