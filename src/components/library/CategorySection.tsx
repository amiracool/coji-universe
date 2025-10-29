"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { TraitCard } from "./TraitCard";
import type { Category } from "@/data/conditions/autism";

interface CategorySectionProps {
  category: Category;
}

export function CategorySection({ category }: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for lazy rendering
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        rootMargin: "200px", // Start loading 200px before visible
        threshold: 0
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Only render content when visible OR expanded
  useEffect(() => {
    if (isVisible || isExpanded) {
      setShouldRender(true);
    }
  }, [isVisible, isExpanded]);

  const toggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);

    if (newState) {
      console.log(`[Analytics] Category expanded: ${category.id}`, {
        categoryId: category.id,
        traitCount: category.traits.length,
        timestamp: Date.now()
      });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="mb-4"
      data-category-id={category.id}
    >
      {/* Category Header */}
      <button
        onClick={toggleExpand}
        className="w-full flex items-center justify-between p-4 rounded-xl border hover:bg-opacity-50 transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900"
        style={{
          backgroundColor: "var(--planet-bg)",
          borderColor: "var(--planet-border)",
          minHeight: "60px"
        }}
        aria-expanded={isExpanded}
        aria-controls={`category-content-${category.id}`}
      >
        <div className="text-left flex-1">
          <h2 className="text-lg font-bold mb-1" style={{ color: "var(--planet-primary)" }}>
            {category.title}
          </h2>
          {category.subtitle && (
            <p className="text-sm text-slate-400">
              {category.subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          <span className="text-xs text-slate-500 font-mono">
            {category.traits.length}
          </span>
          <ChevronDown
            size={20}
            className={`text-slate-500 transition-transform duration-150 ${
              isExpanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Category Content - Lazy rendered */}
      {isExpanded && (
        <div
          id={`category-content-${category.id}`}
          className="mt-3 animate-fade-in"
        >
          {!shouldRender ? (
            // Skeleton loaders
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[...Array(Math.min(6, category.traits.length))].map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl bg-slate-700 bg-opacity-20 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              {/* Did You Know Box - Per Category */}
              {category.didYouKnow && category.didYouKnow.length > 0 && (
                <div
                  className="mb-4 p-4 rounded-xl border"
                  style={{
                    backgroundColor: "var(--planet-bg)",
                    borderColor: "var(--planet-border)"
                  }}
                >
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "var(--planet-primary)" }}>
                    <Sparkles size={16} />
                    Did You Know?
                  </h3>
                  <ul className="space-y-1 text-sm text-slate-300">
                    {category.didYouKnow.map((fact, index) => (
                      <li key={index}>• {fact}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actual trait cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {category.traits.map((trait) => (
                  <TraitCard
                    key={trait.id}
                    trait={trait}
                    categoryId={category.id}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
