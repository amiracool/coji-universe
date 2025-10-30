"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface StrategyCategory {
  title: string;
  icon: React.ReactNode;
  quickStrategies: string[]; // 3-4 strategies shown by default
  fullStrategies?: string[]; // Additional strategies, shown on expand
}

interface PlanningAheadProps {
  categories: StrategyCategory[];
  accentColor: string;
  intro?: string; // Optional intro text
}

function StrategyGroup({
  category,
  accentColor
}: {
  category: StrategyCategory;
  accentColor: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMore = category.fullStrategies && category.fullStrategies.length > 0;

  return (
    <div
      className="p-5 sm:p-6 rounded-xl"
      style={{
        background: `linear-gradient(135deg, var(--planet-primary)08 0%, var(--planet-secondary)05 100%)`,
        border: `1px solid var(--planet-primary)20`
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-2xl"
          style={{ color: `var(--planet-${accentColor})` }}
        >
          {category.icon}
        </span>
        <h3 className="text-lg sm:text-xl font-semibold text-slate-200">
          {category.title}
        </h3>
      </div>

      {/* Quick strategies (always visible) */}
      <ul className="space-y-2.5 mb-3">
        {category.quickStrategies.map((strategy, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-slate-300 text-sm sm:text-base"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: `var(--planet-${accentColor})` }}
            />
            <span className="leading-relaxed">{strategy}</span>
          </li>
        ))}
      </ul>

      {/* Expandable full strategies */}
      {hasMore && (
        <>
          {isExpanded && (
            <ul className="space-y-2.5 mb-3">
              {category.fullStrategies!.map((strategy, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-slate-300 text-sm sm:text-base"
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: `var(--planet-${accentColor})` }}
                  />
                  <span className="leading-relaxed">{strategy}</span>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-medium transition-all duration-200 hover:underline"
            style={{ color: `var(--planet-${accentColor})` }}
          >
            {isExpanded ? "Show less" : `See more strategies (${category.fullStrategies!.length} more)`}
          </button>
        </>
      )}
    </div>
  );
}

export function PlanningAhead({ categories, accentColor, intro }: PlanningAheadProps) {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-slate-200">
        Planning ahead
      </h2>

      {intro && (
        <p className="text-slate-300 text-base sm:text-lg text-center mb-6 max-w-3xl mx-auto leading-relaxed">
          {intro}
        </p>
      )}

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {categories.map((category, index) => (
          <StrategyGroup
            key={index}
            category={category}
            accentColor={accentColor}
          />
        ))}
      </div>
    </div>
  );
}
