"use client";

import React from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useIsDesktop } from '@/hooks/useMediaQuery';

interface PlanetOrbProps {
  emoji: string;
  colour: string;
  size?: 'small' | 'medium' | 'large';
  showOrbitRing?: boolean;
}

export default function PlanetOrb({
  emoji,
  colour,
  size = 'large',
  showOrbitRing = true
}: PlanetOrbProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const sizes = {
    small: 'w-20 h-20 text-4xl',
    medium: 'w-32 h-32 text-6xl',
    large: 'w-40 h-40 md:w-48 md:h-48 text-7xl md:text-8xl'
  };

  // Animations disabled for performance
  const shouldAnimate = false;

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      {/* Orbit ring glow */}
      {showOrbitRing && (
        <div
          className={`absolute inset-0 rounded-full opacity-30 blur-2xl ${shouldAnimate ? 'animate-pulse-slow' : ''}`}
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
          className={`absolute rounded-full border border-opacity-20 ${shouldAnimate ? 'animate-orbit' : ''}`}
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
        className={`
          ${sizes[size]}
          rounded-full
          flex items-center justify-center
          relative z-10
          backdrop-blur-sm
          ${shouldAnimate ? 'animate-float' : ''}
        `}
        style={{
          background: `linear-gradient(135deg, ${colour}30 0%, ${colour}10 100%)`,
          boxShadow: `0 0 40px ${colour}40, inset 0 0 20px ${colour}20`,
          border: `1px solid ${colour}30`
        }}
      >
        {/* Rotating emoji */}
        <span
          className={`${shouldAnimate ? 'animate-spin-very-slow' : ''}`}
          style={{ display: 'block' }}
        >
          {emoji}
        </span>
      </div>

      {/* Atmospheric shimmer */}
      {shouldAnimate && (
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
