/**
 * Educational Section Component
 * Three-part structured education: Understanding It → Daily Life → Planning Ahead
 * Mobile-first, collapsible sections with accessibility support
 */

'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Book, Calendar, Lightbulb, Briefcase, Home, Heart } from 'lucide-react';

export interface EducationalContent {
  understandingIt: {
    intro: string;
    traits: string[];
    strengths: string[];
  };
  dailyLife: {
    intro: string;
    challenges: Array<{
      area: string;
      description: string;
      examples: string[];
    }>;
    adaptiveTraits: string[];
  };
  planningAhead: {
    intro: string;
    categories: Array<{
      title: string;
      icon: React.ReactNode;
      strategies: string[];
    }>;
  };
}

interface EducationalSectionProps {
  content: EducationalContent;
  accentColor?: string;
}

const CollapsibleSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accentColor: string;
}> = ({ title, icon, children, defaultOpen = false, accentColor }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-700 border-opacity-30 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 md:p-6 bg-slate-800 bg-opacity-40 hover:bg-opacity-60 transition-all ${
          isOpen ? 'border-b border-slate-700 border-opacity-30' : ''
        }`}
        style={{ minHeight: '44px' }}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className={`text-${accentColor}-400 flex-shrink-0`}>{icon}</div>
          <h3 className="text-xl md:text-2xl font-bold text-left" style={{ lineHeight: '1.4' }}>
            {title}
          </h3>
        </div>
        <div className="flex-shrink-0 ml-2">
          {isOpen ? (
            <ChevronUp className={`w-6 h-6 text-${accentColor}-400`} />
          ) : (
            <ChevronDown className="w-6 h-6 text-slate-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 md:p-6 bg-slate-800 bg-opacity-20 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

export const EducationalSection: React.FC<EducationalSectionProps> = ({
  content,
  accentColor = 'teal'
}) => {
  return (
    <section className="space-y-4 md:space-y-6 my-8 md:my-12">
      {/* Section 1: Understanding It */}
      <CollapsibleSection
        title="Understanding It"
        icon={<Book className="w-6 h-6" />}
        defaultOpen={true}
        accentColor={accentColor}
      >
        <div className="space-y-4 md:space-y-6">
          {/* Intro */}
          <p
            className="text-base md:text-lg text-slate-300 leading-relaxed"
            style={{ maxWidth: '70ch' }}
          >
            {content.understandingIt.intro}
          </p>

          {/* Traits */}
          {content.understandingIt.traits.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 text-slate-200">
                Common Traits & Patterns
              </h4>
              <ul className="space-y-2">
                {content.understandingIt.traits.map((trait, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-slate-300"
                  >
                    <span className={`text-${accentColor}-400 mt-1 flex-shrink-0`}>•</span>
                    <span style={{ maxWidth: '65ch' }}>{trait}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Strengths */}
          {content.understandingIt.strengths.length > 0 && (
            <div className="mt-4 p-4 bg-slate-700 bg-opacity-20 rounded-lg border border-slate-600 border-opacity-30">
              <h4 className="text-lg font-semibold mb-3 text-slate-200 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                Strengths & Sensitivities
              </h4>
              <ul className="space-y-2">
                {content.understandingIt.strengths.map((strength, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-slate-300"
                  >
                    <span className="text-yellow-400 mt-1 flex-shrink-0">✓</span>
                    <span style={{ maxWidth: '65ch' }}>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Section 2: How It Affects Daily Life */}
      <CollapsibleSection
        title="How It Affects Daily Life"
        icon={<Calendar className="w-6 h-6" />}
        accentColor={accentColor}
      >
        <div className="space-y-4 md:space-y-6">
          {/* Intro */}
          <p
            className="text-base md:text-lg text-slate-300 leading-relaxed"
            style={{ maxWidth: '70ch' }}
          >
            {content.dailyLife.intro}
          </p>

          {/* Challenges by Area */}
          <div className="space-y-4">
            {content.dailyLife.challenges.map((challenge, index) => (
              <div
                key={index}
                className="p-4 bg-slate-700 bg-opacity-20 rounded-lg border border-slate-600 border-opacity-30"
              >
                <h4 className="text-lg font-semibold mb-2 text-slate-200">
                  {challenge.area}
                </h4>
                <p className="text-slate-300 mb-3" style={{ maxWidth: '65ch' }}>
                  {challenge.description}
                </p>
                {challenge.examples.length > 0 && (
                  <ul className="space-y-1 text-sm">
                    {challenge.examples.map((example, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-slate-400"
                      >
                        <span className="mt-1 flex-shrink-0">→</span>
                        <span style={{ maxWidth: '60ch' }}>{example}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Adaptive Traits */}
          {content.dailyLife.adaptiveTraits.length > 0 && (
            <div className="mt-4 p-4 bg-green-900 bg-opacity-10 rounded-lg border border-green-500 border-opacity-20">
              <h4 className="text-lg font-semibold mb-3 text-green-300 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Adaptive Traits
              </h4>
              <ul className="space-y-2">
                {content.dailyLife.adaptiveTraits.map((trait, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-slate-300"
                  >
                    <span className="text-green-400 mt-1 flex-shrink-0">+</span>
                    <span style={{ maxWidth: '65ch' }}>{trait}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Section 3: Planning Ahead */}
      <CollapsibleSection
        title="Planning Ahead"
        icon={<Briefcase className="w-6 h-6" />}
        accentColor={accentColor}
      >
        <div className="space-y-4 md:space-y-6">
          {/* Intro */}
          <p
            className="text-base md:text-lg text-slate-300 leading-relaxed"
            style={{ maxWidth: '70ch' }}
          >
            {content.planningAhead.intro}
          </p>

          {/* Strategy Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.planningAhead.categories.map((category, index) => (
              <div
                key={index}
                className="p-4 bg-slate-700 bg-opacity-20 rounded-lg border border-slate-600 border-opacity-30 hover:border-opacity-50 transition-colors"
              >
                <h4 className="text-lg font-semibold mb-3 text-slate-200 flex items-center gap-2">
                  <span className={`text-${accentColor}-400`}>
                    {category.icon}
                  </span>
                  {category.title}
                </h4>
                <ul className="space-y-2">
                  {category.strategies.map((strategy, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <span className={`text-${accentColor}-400 mt-1 flex-shrink-0`}>
                        →
                      </span>
                      <span style={{ maxWidth: '60ch' }}>{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>
    </section>
  );
};
