"use client";

import React, { useEffect } from "react";
import { X, Sparkles, Brain, Eye, Calendar } from "lucide-react";
import { shouldReduceEffects } from "@/utils/performance";
import type { PlanetData, PlanetSection } from "@/types/planet";

interface PlanetDetailModalProps {
  planet: PlanetData;
  onClose: () => void;
}

function SectionContent({ section }: { section: PlanetSection }) {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-slate-200 mb-3">{section.heading}</h4>
      <ul className="space-y-2">
        {section.items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-teal-400 mt-1">•</span>
            <span className="text-slate-300 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ContentSectionProps {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
  sections: PlanetSection[];
  planetColor: string;
}

function ContentSection({ title, icon: Icon, iconColor, sections, planetColor }: ContentSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
        <Icon className={iconColor} size={24} />
        <h3 className="text-2xl font-bold" style={{ color: planetColor }}>
          {title}
        </h3>
      </div>
      <div className="space-y-6">
        {sections.map((section, index) => (
          <SectionContent key={index} section={section} />
        ))}
      </div>
    </div>
  );
}

export default function PlanetDetailModal({ planet, onClose }: PlanetDetailModalProps) {
  const reduceEffects = shouldReduceEffects();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-0 md:p-4 overflow-y-auto"
      onClick={(e) => {
        // Close if clicking backdrop
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-slate-900 w-full max-w-4xl min-h-screen md:min-h-0 md:max-h-[90vh] md:rounded-2xl overflow-y-auto relative"
        style={{
          borderColor: planet.color + "40",
          ...(reduceEffects ? {} : { border: `2px solid ${planet.color}40` })
        }}
      >
        {/* Sticky Header */}
        <div
          className="sticky top-0 z-10 p-6 md:p-8 border-b border-slate-700 backdrop-blur-sm"
          style={{
            backgroundColor: planet.color + "10"
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{planet.emoji}</div>
              <div>
                <h2
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: planet.color }}
                >
                  {planet.name}
                </h2>
                <p className="text-slate-300 text-lg">{planet.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="text-slate-400 hover:text-white" size={28} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Did You Know */}
          <ContentSection
            title="Did You Know"
            icon={Sparkles}
            iconColor="text-amber-400"
            sections={planet.sections.didYouKnow}
            planetColor={planet.color}
          />

          {/* Understanding It */}
          <ContentSection
            title="Understanding It"
            icon={Brain}
            iconColor="text-purple-400"
            sections={planet.sections.understanding}
            planetColor={planet.color}
          />

          {/* How It Affects Daily Life */}
          <ContentSection
            title="How It Affects Daily Life"
            icon={Eye}
            iconColor="text-blue-400"
            sections={planet.sections.dailyImpact}
            planetColor={planet.color}
          />

          {/* Planning Ahead */}
          <ContentSection
            title="Planning Ahead"
            icon={Calendar}
            iconColor="text-green-400"
            sections={planet.sections.planning}
            planetColor={planet.color}
          />

          {/* Reminder */}
          <div
            className="mt-8 p-6 rounded-xl border"
            style={{
              backgroundColor: planet.color + "15",
              borderColor: planet.color + "40"
            }}
          >
            <p className="text-slate-300 leading-relaxed">
              <strong style={{ color: planet.color }}>Remember:</strong> This information is for
              guidance and self-understanding. It's not a substitute for professional support.
              What works varies by person - trust yourself to know what feels right for you.
            </p>
          </div>
        </div>

        {/* Bottom Close Button */}
        <div className="sticky bottom-0 p-6 md:p-8 border-t border-slate-700 bg-slate-900 backdrop-blur-sm">
          <button
            onClick={onClose}
            className={`
              w-full md:w-auto px-8 py-4 rounded-xl font-semibold text-lg transition-all
              ${reduceEffects ? "" : "hover:scale-105"}
            `}
            style={{
              backgroundColor: planet.color + "30",
              color: planet.color,
              border: `2px solid ${planet.color}`
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
