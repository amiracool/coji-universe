"use client";

import React, { useState } from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { anxietyPlanetMobile } from "@/data/planets/anxiety-mobile";

export function AnxietyPlanning() {
  const router = useRouter();
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const categories = anxietyPlanetMobile.planningAhead;

  const handlePrev = () => {
    router.push('/planets/anxiety/strengths');
  };

  const toggleCard = (cardId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <PlanetLayout
      currentStep={6}
      totalSteps={6}
      prevRoute="/planets/anxiety/strengths"
      onSwipeRight={handlePrev}
      primaryColor="#5C9EFF"
      accentColor="#4178D0"
    >
      <div className="space-y-10 py-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Planning Ahead
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto" style={{ lineHeight: "1.6" }}>
            Practical strategies for navigating life with Anxiety
          </p>
          <p className="text-blue-300 text-sm max-w-md mx-auto mt-4" style={{ lineHeight: "1.6", opacity: 0.9 }}>
            Search the Library for more tips and hacks, or speak to Coji Buddy
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8 max-w-xl mx-auto">
          {categories.map((category) => (
            <div key={category.id} className="space-y-4">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-xl font-semibold text-slate-100">
                  {category.title}
                </h3>
              </div>

              {/* Cards in this category */}
              <div className="space-y-3">
                {category.cards.map((card) => {
                  const isExpanded = expandedCards.has(card.id);

                  return (
                    <div
                      key={card.id}
                      className="rounded-xl overflow-hidden transition-all duration-200"
                      style={{
                        background: "linear-gradient(135deg, rgba(92, 158, 255, 0.12) 0%, rgba(65, 120, 208, 0.08) 100%)",
                        border: "1px solid rgba(92, 158, 255, 0.25)",
                        boxShadow: isExpanded ? "0 6px 20px rgba(0, 0, 0, 0.2)" : "0 3px 10px rgba(0, 0, 0, 0.15)"
                      }}
                    >
                      {/* Card header - always visible */}
                      <button
                        onClick={() => toggleCard(card.id)}
                        className="w-full p-4 flex items-start justify-between text-left transition-colors duration-200"
                        style={{ minHeight: "44px" }}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-2xl mt-1">{card.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-slate-100 mb-1">
                              {card.title}
                            </h4>
                            <p className="text-sm text-slate-300" style={{ lineHeight: "1.6" }}>
                              {card.summary}
                            </p>
                          </div>
                        </div>
                        <div className="text-blue-400 ml-2 mt-1">
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </button>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div
                          className="px-4 pb-4"
                          style={{
                            borderTop: "1px solid rgba(92, 158, 255, 0.15)",
                            animation: "fadeIn 0.2s ease-in"
                          }}
                        >
                          <p className="text-sm text-slate-400 leading-relaxed pt-3" style={{ lineHeight: "1.6" }}>
                            {card.detail}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Final encouragement */}
        <div
          className="text-center p-6 rounded-xl max-w-lg mx-auto"
          style={{
            background: "linear-gradient(135deg, rgba(65, 120, 208, 0.15) 0%, rgba(92, 158, 255, 0.1) 100%)",
            border: "1px solid rgba(65, 120, 208, 0.3)"
          }}
        >
          <p className="text-slate-200 leading-relaxed" style={{ lineHeight: "1.7" }}>
            Your caring nature and thoughtfulness are gifts. With the right strategies and support, you can thrive alongside your anxiety.
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </PlanetLayout>
  );
}
