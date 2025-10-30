"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface QuickRecognitionProps {
  traits: string[];
  accentColor: string;
  quickCount?: number; // How many to show before "Show full list"
}

export function QuickRecognition({
  traits,
  accentColor,
  quickCount = 5
}: QuickRecognitionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickTraits = traits.slice(0, quickCount);
  const remainingTraits = traits.slice(quickCount);
  const hasMore = remainingTraits.length > 0;

  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-slate-200">
        You might notice...
      </h2>

      <div
        className="p-6 sm:p-7 md:p-8 rounded-xl"
        style={{
          background: `linear-gradient(135deg, var(--planet-primary)08 0%, var(--planet-secondary)05 100%)`,
          border: `1px solid var(--planet-primary)20`
        }}
      >
        {/* Always visible traits */}
        <ul className="space-y-3 mb-4">
          {quickTraits.map((trait, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-slate-300 text-base sm:text-lg"
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: `var(--planet-${accentColor})` }}
              />
              <span className="leading-relaxed">{trait}</span>
            </li>
          ))}
        </ul>

        {/* Expandable section */}
        {hasMore && (
          <>
            {isExpanded && (
              <ul className="space-y-3 mb-4">
                {remainingTraits.map((trait, index) => (
                  <li
                    key={index + quickCount}
                    className="flex items-start gap-3 text-slate-300 text-base sm:text-lg"
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: `var(--planet-${accentColor})` }}
                    />
                    <span className="leading-relaxed">{trait}</span>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                color: `var(--planet-${accentColor})`,
                background: `linear-gradient(135deg, var(--planet-primary)15 0%, var(--planet-secondary)10 100%)`,
                border: `1px solid var(--planet-primary)30`
              }}
            >
              {isExpanded ? (
                <>
                  Show less
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Show full list ({remainingTraits.length} more)
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
