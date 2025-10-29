"use client";

import React from 'react';
import { ArrowLeft, Activity } from 'lucide-react';
import PlanetOrb from './PlanetOrb';
import FactCarousel from './FactCarousel';
import { getPlanetTheme } from '@/lib/planetThemes';

interface PlanetPageProps {
  planetId: string;
  planetData: {
    title: string;
    description: string;
    mindgram?: {
      did_you_know?: string[];
      overlaps?: string[];
    };
    orbit_tags?: string[];
  };
  onBack: () => void;
  onTagClick?: (tag: string) => void;
}

export default function PlanetPage({
  planetId,
  planetData,
  onBack,
  onTagClick
}: PlanetPageProps) {
  const theme = getPlanetTheme(planetId);

  return (
    <div
      className="min-h-screen transition-all duration-1000 animate-fade-in"
      style={{ background: theme.atmosphere.background }}
    >
      {/* Twinkling stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse-slow"
            style={{
              background: theme.atmosphere.stars,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 group"
          style={{
            background: `${theme.colours.primary}15`,
            border: `1px solid ${theme.colours.primary}30`
          }}
        >
          <ArrowLeft size={20} style={{ color: theme.colours.primary }} className="group-hover:-translate-x-1 transition-transform" />
          <span style={{ color: theme.colours.primary }} className="font-medium">
            Back to Library
          </span>
        </button>

        {/* Header section */}
        <div className="text-center mb-16 animate-slide-up">
          {/* Planet orb */}
          <div className="flex justify-center mb-8">
            <PlanetOrb
              emoji={theme.emoji}
              colour={theme.colours.primary}
              size="large"
              showOrbitRing={true}
            />
          </div>

          {/* Welcome text */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-100">
            Welcome to the {planetData.title} Planet {theme.emoji}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-4">
            {planetData.description}
          </p>

          <p className="text-base text-slate-400 max-w-xl mx-auto italic">
            Gentle guidance and sensory-kind strategies live here
          </p>

          {/* Atmospheric glow line */}
          <div
            className="h-1 w-32 mx-auto mt-8 rounded-full opacity-50 animate-pulse-slow"
            style={{ background: theme.colours.gradient }}
          />
        </div>

        {/* Did You Know carousel */}
        {planetData.mindgram?.did_you_know && planetData.mindgram.did_you_know.length > 0 && (
          <div className="mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-slate-200">
              Did You Know?
            </h2>
            <FactCarousel
              facts={planetData.mindgram.did_you_know}
              colour={theme.colours.primary}
              onLearnMore={() => {
                // Scroll to strategies section
                const strategiesSection = document.getElementById('strategies');
                if (strategiesSection) {
                  strategiesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </div>
        )}

        {/* Superpowers in Disguise section */}
        {planetData.orbit_tags && planetData.orbit_tags.length > 0 && (
          <div id="strategies" className="mb-16 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div
              className="p-8 md:p-10 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${theme.colours.primary}10 0%, ${theme.colours.secondary}05 100%)`,
                border: `1px solid ${theme.colours.primary}20`
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Activity size={28} style={{ color: theme.colours.primary }} />
                <h2 className="text-2xl md:text-3xl font-bold text-slate-200">
                  Your Superpowers in Disguise
                </h2>
              </div>

              <p className="text-slate-300 mb-8 text-lg">
                Click any experience to find strategies & strengths 💪
              </p>

              {/* Experience tags - grouped and spaced */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {planetData.orbit_tags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => onTagClick?.(tag)}
                    className="group px-5 py-4 rounded-xl text-left transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                    style={{
                      background: `${theme.colours.primary}12`,
                      border: `1px solid ${theme.colours.primary}25`
                    }}
                  >
                    <span className="text-slate-200 font-medium group-hover:text-teal-300 transition-colors">
                      {tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Overlaps section */}
        {planetData.mindgram?.overlaps && planetData.mindgram.overlaps.length > 0 && (
          <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
            <div
              className="p-8 md:p-10 rounded-2xl"
              style={{
                background: `${theme.colours.secondary}08`,
                border: `1px solid ${theme.colours.secondary}20`
              }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-slate-200">
                Often Overlaps With
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {planetData.mindgram.overlaps.map((overlap, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg"
                    style={{
                      background: `${theme.colours.secondary}10`,
                      border: `1px solid ${theme.colours.secondary}20`
                    }}
                  >
                    <p className="text-slate-300">{overlap}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <button
            onClick={onBack}
            className="px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105"
            style={{
              background: theme.colours.gradient,
              color: 'white',
              boxShadow: `0 10px 40px ${theme.colours.primary}30`
            }}
          >
            Explore Another Planet
          </button>
        </div>
      </div>

      {/* Atmospheric bottom glow */}
      <div
        className="fixed bottom-0 left-0 right-0 h-64 pointer-events-none opacity-30 blur-3xl"
        style={{
          background: `radial-gradient(ellipse at bottom, ${theme.colours.primary}40 0%, transparent 70%)`
        }}
      />
    </div>
  );
}
