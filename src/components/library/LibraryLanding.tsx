"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { PlanetCard } from "./PlanetCard";
import { libraryCategories, searchPlanets } from "@/data/library-categories";

export function LibraryLanding() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const searchResults = searchQuery.trim() ? searchPlanets(searchQuery) : null;

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-100">
            Welcome to the Coji Library
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Explore neurodivergent-friendly resources organised by category
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search across all planets..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 bg-slate-800 bg-opacity-50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchResults && searchResults.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-200">
              Search Results ({searchResults.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((planet) => (
                <PlanetCard key={planet.id} {...planet} />
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {searchResults && searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              No planets found matching "{searchQuery}"
            </p>
          </div>
        )}

        {/* Category Sections - only show when not searching */}
        {!searchQuery.trim() && (
          <div className="space-y-16">
            {libraryCategories.map((category) => (
              <section key={category.id} className="animate-slide-up">
                {/* Category Header */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2 text-slate-100">
                    {category.title}
                  </h2>
                  <p className="text-slate-400 text-lg">
                    {category.description}
                  </p>
                </div>

                {/* Preview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {category.planets.slice(0, 3).map((planet) => (
                    <PlanetCard key={planet.id} {...planet} />
                  ))}
                </div>

                {/* View All Button */}
                {category.planets.length > 3 && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => router.push(category.route)}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-800 bg-opacity-50 border border-slate-700 rounded-xl text-slate-200 hover:bg-opacity-70 hover:border-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                      aria-label={`View all planets in ${category.title}`}
                    >
                      <span>View all in {category.title}</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
