"use client";

import React, { useState, lazy, Suspense } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface DailyLifeCategory {
  title: string;
  icon: React.ReactNode;
  intro: string; // Short explanation (1-2 sentences)
  quickImpacts: string[]; // 3-4 bullets shown by default
  fullImpacts?: string[]; // Additional bullets, shown on expand
  reframe?: string; // Optional validating/strength-based note
}

interface DailyLifeImpactProps {
  categories: DailyLifeCategory[];
  accentColor: string;
}

function CategoryAccordion({
  category,
  accentColor,
  isOpen,
  onToggle
}: {
  category: DailyLifeCategory;
  accentColor: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [showFullList, setShowFullList] = useState(false);
  const hasMoreImpacts = category.fullImpacts && category.fullImpacts.length > 0;

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: `linear-gradient(135deg, var(--planet-primary)08 0%, var(--planet-secondary)05 100%)`,
        border: `1px solid var(--planet-primary)20`
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between text-left transition-all duration-200 hover:bg-slate-800/20"
        style={{ minHeight: "44px" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xl"
            style={{ color: `var(--planet-${accentColor})` }}
          >
            {category.icon}
          </span>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-200">
            {category.title}
          </h3>
        </div>
        {isOpen ? (
          <ChevronUp size={20} className="text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />
        )}
      </button>

      {/* Content - only rendered when open */}
      {isOpen && (
        <div className="px-5 pb-5 space-y-4">
          {/* Intro */}
          <p className="text-slate-300 text-base leading-relaxed">
            {category.intro}
          </p>

          {/* Quick impacts (always visible when accordion is open) */}
          <ul className="space-y-2.5">
            {category.quickImpacts.map((impact, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-slate-300 text-sm sm:text-base"
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: `var(--planet-${accentColor})` }}
                />
                <span className="leading-relaxed">{impact}</span>
              </li>
            ))}
          </ul>

          {/* Expandable full list */}
          {hasMoreImpacts && (
            <>
              {showFullList && (
                <ul className="space-y-2.5 pt-2">
                  {category.fullImpacts!.map((impact, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-300 text-sm sm:text-base"
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: `var(--planet-${accentColor})` }}
                      />
                      <span className="leading-relaxed">{impact}</span>
                    </li>
                  ))}
                </ul>
              )}

              <button
                onClick={() => setShowFullList(!showFullList)}
                className="text-sm font-medium transition-all duration-200 hover:underline"
                style={{ color: `var(--planet-${accentColor})` }}
              >
                {showFullList ? "Show less" : `View full list (${category.fullImpacts!.length} more)`}
              </button>
            </>
          )}

          {/* Reframe/strength note */}
          {category.reframe && (
            <div
              className="mt-4 px-4 py-3 rounded-lg text-sm italic"
              style={{
                background: `linear-gradient(135deg, var(--planet-primary)10 0%, var(--planet-secondary)08 100%)`,
                borderLeft: `3px solid var(--planet-${accentColor})`
              }}
            >
              <p className="text-slate-300 leading-relaxed">{category.reframe}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function DailyLifeImpact({ categories, accentColor }: DailyLifeImpactProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-slate-200">
        How it affects daily life
      </h2>

      <div className="space-y-3">
        {categories.map((category, index) => (
          <CategoryAccordion
            key={index}
            category={category}
            accentColor={accentColor}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
}
