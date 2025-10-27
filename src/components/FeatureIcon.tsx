"use client";

import React, { useState, memo } from "react";
import { LucideIcon } from "lucide-react";

interface FeatureIconProps {
  icon: LucideIcon;
  label: string;
  description: string;
  color: "teal" | "fuchsia" | "amber" | "blue" | "purple" | "green";
  onClick?: () => void;
  emoji?: string;
}

/**
 * Performance-optimized feature icon component
 * - Lazy-loaded via parent
 * - GPU-accelerated hover animations (transform only)
 * - Mobile-friendly touch interactions
 * - Memoized to prevent unnecessary re-renders
 */
const FeatureIcon = memo(({ icon: Icon, label, description, color, onClick, emoji }: FeatureIconProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Color mappings for icons and borders
  const colorMap = {
    teal: {
      icon: "text-teal-400",
      border: "border-teal-500",
      bg: "bg-teal-500",
      tooltip: "bg-teal-500",
    },
    fuchsia: {
      icon: "text-fuchsia-400",
      border: "border-fuchsia-500",
      bg: "bg-fuchsia-500",
      tooltip: "bg-fuchsia-500",
    },
    amber: {
      icon: "text-amber-400",
      border: "border-amber-500",
      bg: "bg-amber-500",
      tooltip: "bg-amber-500",
    },
    blue: {
      icon: "text-blue-400",
      border: "border-blue-500",
      bg: "bg-blue-500",
      tooltip: "bg-blue-500",
    },
    purple: {
      icon: "text-purple-400",
      border: "border-purple-500",
      bg: "bg-purple-500",
      tooltip: "bg-purple-500",
    },
    green: {
      icon: "text-green-400",
      border: "border-green-500",
      bg: "bg-green-500",
      tooltip: "bg-green-500",
    },
  };

  const colors = colorMap[color];
  const showTooltip = isHovered || isTouched;

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    // Keep tooltip visible for 2 seconds on mobile
    setTimeout(() => setIsTouched(false), 2000);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
    >
      {/* Icon Container */}
      <div
        className={`
          relative
          w-20 h-20 md:w-24 md:h-24
          flex items-center justify-center
          rounded-2xl
          ${colors.bg} bg-opacity-10
          ${colors.border} border-2 border-opacity-30
          cursor-pointer
          will-animate
        `}
        style={{
          transform: showTooltip ? 'scale(1.1) translateY(-4px)' : 'scale(1) translateY(0)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Emoji or Icon */}
        {emoji ? (
          <span className="text-4xl md:text-5xl">{emoji}</span>
        ) : (
          <Icon
            size={40}
            className={`${colors.icon}`}
            style={{
              filter: 'drop-shadow(0 0 8px currentColor)',
            }}
          />
        )}

        {/* Glow effect on hover */}
        {showTooltip && (
          <div
            className={`absolute inset-0 ${colors.bg} opacity-20 rounded-2xl blur-xl`}
            style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
        )}
      </div>

      {/* Label - Always visible on mobile, show on hover on desktop */}
      <div
        className="mt-3 text-center"
        style={{
          opacity: showTooltip ? 1 : 0.7,
          transform: showTooltip ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
        }}
      >
        <p className={`text-sm md:text-base font-semibold ${colors.icon}`}>
          {label}
        </p>
      </div>

      {/* Tooltip - Description on hover/touch */}
      {showTooltip && (
        <div
          className="fixed z-50 pointer-events-none px-2"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '280px',
            maxWidth: 'calc(100vw - 32px)',
          }}
        >
          <div
            className={`
              ${colors.tooltip} bg-opacity-98
              text-white text-sm md:text-base
              px-5 py-4
              rounded-2xl
              shadow-2xl
              border-2 ${colors.border} border-opacity-60
            `}
            style={{
              animation: 'fadeInUp 0.3s ease-out forwards',
            }}
          >
            <p className="leading-relaxed font-medium">{description}</p>

            {/* Close hint for mobile */}
            <p className="text-xs opacity-70 mt-2 md:hidden">Tap anywhere to close</p>
          </div>

          {/* Semi-transparent backdrop on mobile to make text more readable */}
          <div
            className="fixed inset-0 bg-slate-900 bg-opacity-70 -z-10 md:hidden"
            style={{
              animation: 'fadeIn 0.2s ease-out',
            }}
          />
        </div>
      )}
    </div>
  );
});

FeatureIcon.displayName = "FeatureIcon";

export default FeatureIcon;
