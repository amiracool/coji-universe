"use client";

import React, { useState, Suspense, lazy } from "react";
import { Search, X } from "lucide-react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { Starfield } from "@/components/Starfield";
import { shouldReduceEffects } from "@/utils/performance";
import { PLANET_DATA, type PlanetData } from "@/types/planet";

// Lazy load the planet detail modal for better initial load
const PlanetDetailModal = lazy(() => import("@/components/dashboard/PlanetDetailModal"));

interface PlanetCardProps {
  planet: PlanetData;
  onClick: () => void;
}

function PlanetCard({ planet, onClick }: PlanetCardProps) {
  const reduceEffects = shouldReduceEffects();

  return (
    <button
      onClick={onClick}
      className={`
        bg-slate-800 bg-opacity-50 p-6 rounded-2xl border-2
        text-left w-full transition-all duration-200
        ${reduceEffects ? "" : "hover:scale-105"}
      `}
      style={{
        borderColor: planet.color + "40",
        ...(reduceEffects ? {} : {
          boxShadow: `0 0 20px ${planet.color}15`
        })
      }}
      aria-label={`Open ${planet.name} details`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="text-5xl">{planet.emoji}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1" style={{ color: planet.color }}>
            {planet.name}
          </h3>
          <p className="text-sm text-slate-400">{planet.description}</p>
        </div>
      </div>

      <div
        className="text-center text-sm font-medium py-2 px-4 rounded-lg transition-colors"
        style={{
          backgroundColor: planet.color + "20",
          color: planet.color
        }}
      >
        Explore →
      </div>
    </button>
  );
}

export default function LibraryPage() {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const reduceEffects = shouldReduceEffects();

  // Get all planets as array
  const planets = Object.values(PLANET_DATA);

  // Filter planets by search
  const filteredPlanets = searchQuery
    ? planets.filter(
        (planet) =>
          planet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          planet.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : planets;

  const selectedPlanet = selectedPlanetId ? PLANET_DATA[selectedPlanetId] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative">
      <Starfield intensity="light" disableOnMobile />

      <DashboardNav />

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Coji Library</h1>
          <p className="text-slate-400 text-lg">
            Evidence-based strategies and support for neurodivergent brains
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search planets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-slate-800 bg-opacity-50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* No Results */}
        {filteredPlanets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No planets found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-teal-400 hover:text-teal-300"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Planet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlanets.map((planet) => (
            <PlanetCard
              key={planet.id}
              planet={planet}
              onClick={() => setSelectedPlanetId(planet.id)}
            />
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-12 bg-teal-900 bg-opacity-20 border border-teal-500 border-opacity-30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-teal-300 mb-2">About the Library</h3>
          <p className="text-slate-300 leading-relaxed">
            Each planet contains research-backed strategies, practical tools, and lived experience insights.
            Content is designed to be ND-friendly: short sections, bullet points, and clear headings.
            Tap any planet to explore its full content.
          </p>
        </div>
      </div>

      {/* Planet Detail Modal - Lazy Loaded */}
      {selectedPlanet && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"><div className="text-white">Loading...</div></div>}>
          <PlanetDetailModal
            planet={selectedPlanet}
            onClose={() => setSelectedPlanetId(null)}
          />
        </Suspense>
      )}
    </div>
  );
}
