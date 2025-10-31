"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PlanetCard } from "./PlanetCard";
import type { LibraryCategory } from "@/data/library-categories";

interface CategoryPageProps {
  category: LibraryCategory;
}

export function CategoryPage({ category }: CategoryPageProps) {
  const router = useRouter();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Intersection Observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleCards((prev) => new Set(prev).add(index));
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    // Observe all card placeholders
    cardRefs.current.forEach((ref) => {
      if (ref) {
        observerRef.current?.observe(ref);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 mb-8 px-4 py-2 bg-slate-800 bg-opacity-50 border border-slate-700 rounded-lg text-slate-300 hover:bg-opacity-70 hover:text-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-label="Back to library"
        >
          <ArrowLeft size={18} />
          <span>Back to Library</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-100">
            {category.title}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>

        {/* Planet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.planets.map((planet, index) => (
            <div
              key={planet.id}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className="min-h-[200px]"
            >
              {visibleCards.has(index) ? (
                <PlanetCard {...planet} />
              ) : (
                <div className="bg-slate-800 bg-opacity-30 h-full rounded-xl animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {category.planets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              No planets in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
