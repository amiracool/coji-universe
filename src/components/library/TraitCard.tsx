"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Star } from "lucide-react";
import type { Trait } from "@/data/conditions/autism";

interface TraitCardProps {
  trait: Trait;
  categoryId: string;
}

export const TraitCard = React.memo(function TraitCard({ trait, categoryId }: TraitCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  // Restore expand/collapse state from localStorage
  useEffect(() => {
    const storageKey = `trait-${trait.id}-expanded`;
    const favKey = `trait-${trait.id}-favourite`;
    const savedExpanded = localStorage.getItem(storageKey) === "true";
    const savedFav = localStorage.getItem(favKey) === "true";
    setIsExpanded(savedExpanded);
    setIsFavourite(savedFav);
  }, [trait.id]);

  const toggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    localStorage.setItem(`trait-${trait.id}-expanded`, String(newState));

    // Analytics
    if (newState) {
      console.log(`[Analytics] Trait expanded: ${trait.id}`, {
        traitId: trait.id,
        categoryId,
        timestamp: Date.now()
      });
    }
  };

  const toggleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !isFavourite;
    setIsFavourite(newState);
    localStorage.setItem(`trait-${trait.id}-favourite`, String(newState));

    console.log(`[Analytics] Trait ${newState ? 'starred' : 'unstarred'}: ${trait.id}`);
  };

  const handleToolClick = (tool: string, index: number) => {
    console.log(`[Analytics] Tool clicked: ${trait.id}`, {
      traitId: trait.id,
      categoryId,
      toolIndex: index,
      tool,
      timestamp: Date.now()
    });
  };

  return (
    <div
      className="rounded-2xl border shadow-sm overflow-hidden"
      style={{
        backgroundColor: "var(--planet-bg)",
        borderColor: "var(--planet-border)"
      }}
      data-trait-id={trait.id}
      data-category-id={categoryId}
    >
      {/* Card Header - Always visible */}
      <button
        onClick={toggleExpand}
        className="w-full p-3 flex items-start gap-3 text-left transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none hover:bg-slate-700 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        aria-expanded={isExpanded}
        aria-controls={`trait-details-${trait.id}`}
        style={{ minHeight: "44px" }}
      >
        {/* Icon */}
        <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">
          {trait.icon || "✨"}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-200 mb-1 line-clamp-1">
            {trait.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2">
            {trait.summary}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleFavourite}
            className="p-1 hover:scale-110 transition-transform focus:outline-none"
            aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
            tabIndex={0}
          >
            <Star
              size={16}
              className={isFavourite ? "fill-amber-400 text-amber-400" : "text-slate-500"}
            />
          </button>
          <ChevronDown
            size={18}
            className={`text-slate-500 transition-transform duration-150 ${
              isExpanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Details Panel - Conditionally rendered */}
      {isExpanded && (
        <div
          id={`trait-details-${trait.id}`}
          className="px-3 pb-3 pt-1 border-t border-slate-700 border-opacity-30 animate-fade-in"
        >
          {/* Tools Section */}
          {trait.tools && trait.tools.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-teal-400 mb-2 flex items-center gap-1">
                <span className="sr-only">Coping strategies</span>
                Try this:
              </h4>
              <ul className="space-y-1.5">
                {trait.tools.map((tool, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleToolClick(tool, idx)}
                      className="w-full text-left text-xs bg-slate-700 bg-opacity-40 px-2.5 py-1.5 rounded-lg text-slate-300 hover:bg-opacity-60 transition-colors focus:outline-none focus:ring-1 focus:ring-teal-500"
                      style={{ minHeight: "32px" }}
                    >
                      • {tool}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links Section */}
          {trait.links && trait.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {trait.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-xs px-3 py-1 bg-teal-500 bg-opacity-20 text-teal-300 rounded-full hover:bg-opacity-30 transition-colors border border-teal-500 border-opacity-30 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  onClick={() => console.log(`[Analytics] Link clicked: ${link.label}`, { traitId: trait.id })}
                >
                  {link.label} →
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
});
