"use client";

import React, { useState } from 'react';
import {
  Home,
  Briefcase,
  Users,
  Heart,
  Brain,
  X,
  Sparkles
} from 'lucide-react';

interface Cluster {
  id: string;
  title: string;
  icon: React.ReactNode;
  colour: string;
  experiences: Experience[];
}

interface Experience {
  symptom: string;
  strength: string;
  strategies: string[];
}

interface SuperpowersClustersProps {
  onExperienceClick?: (experience: Experience) => void;
}

const clusters: Cluster[] = [
  {
    id: 'daily-life',
    title: 'Daily Life',
    icon: <Home size={28} />,
    colour: '#14b8a6', // teal
    experiences: [
      {
        symptom: 'Forgetting appointments',
        strength: 'Your strength is adaptability — you handle unexpected changes brilliantly',
        strategies: [
          'Use phone calendar with 3 reminders (1 day before, 1 hour before, 15 mins before)',
          'Set a "prep the night before" alarm',
          'Keep a visual wall calendar in high-traffic area'
        ]
      },
      {
        symptom: 'Losing things constantly',
        strength: 'Your mind prioritises big picture over details — that\'s creative thinking',
        strategies: [
          'Designated "landing zones" by each door',
          'Tile trackers on keys, wallet, phone',
          'Photo your parking spot before leaving car'
        ]
      },
      {
        symptom: 'Struggle with morning routines',
        strength: 'You question inefficient systems — that\'s innovation',
        strategies: [
          'Lay out clothes the night before',
          'Keep grab-and-go breakfast options ready',
          'Set multiple gentle alarms with different tones'
        ]
      }
    ]
  },
  {
    id: 'work-study',
    title: 'Work & Study',
    icon: <Briefcase size={28} />,
    colour: '#f97316', // orange
    experiences: [
      {
        symptom: 'Procrastinating on tasks',
        strength: 'You work in bursts of hyperfocus — that\'s productivity superpowers',
        strategies: [
          '5-minute timer trick: "I\'ll just do 5 minutes"',
          'Body doubling: work alongside someone (virtual or in-person)',
          'Break tasks into tiny, ridiculous steps'
        ]
      },
      {
        symptom: 'Getting overwhelmed by emails',
        strength: 'Your brain saves energy by filtering noise — that\'s efficiency',
        strategies: [
          'Batch-check emails 2x daily (10am, 3pm)',
          'Use templates for common responses',
          'Unsubscribe ruthlessly from newsletters'
        ]
      }
    ]
  },
  {
    id: 'social',
    title: 'Social & Communication',
    icon: <Users size={28} />,
    colour: '#d946ef', // fuchsia
    experiences: [
      {
        symptom: 'Interrupting people',
        strength: 'Your excitement is contagious — you bring energy to conversations',
        strategies: [
          'Jot down your thought on paper while they\'re talking',
          'Silently count to 3 after they stop speaking',
          'Use "that reminds me..." as a transition phrase'
        ]
      },
      {
        symptom: 'Social exhaustion',
        strength: 'You\'re deeply empathetic — you absorb others\' emotions (that\'s a gift)',
        strategies: [
          'Schedule alone time after social events',
          'Noise-cancelling headphones as a boundary tool',
          'Give yourself permission to leave early'
        ]
      }
    ]
  },
  {
    id: 'self-care',
    title: 'Self-Care & Health',
    icon: <Heart size={28} />,
    colour: '#ec4899', // pink
    experiences: [
      {
        symptom: 'Forgetting to eat/drink',
        strength: 'Your focus is so deep, you transcend basic needs — that\'s dedication',
        strategies: [
          'Hourly phone alarms: "Sip water"',
          'Keep snacks at desk (nuts, protein bars)',
          'Pair meals with a favourite show/podcast'
        ]
      },
      {
        symptom: 'Difficulty falling asleep',
        strength: 'Your mind is exploring ideas at night — that\'s when creativity peaks',
        strategies: [
          'Keep a "brain dump" notebook by bed',
          'White noise or brown noise app',
          'No screens 1 hour before bed (use blue-light glasses if needed)'
        ]
      }
    ]
  },
  {
    id: 'memory-focus',
    title: 'Memory & Focus',
    icon: <Brain size={28} />,
    colour: '#8b5cf6', // purple
    experiences: [
      {
        symptom: 'Losing train of thought mid-sentence',
        strength: 'Your brain makes lightning-fast connections — that\'s genius',
        strategies: [
          'Say "hold on, let me finish this thought" and pause',
          'Use voice memos to capture fleeting ideas',
          'Practice one-sentence-at-a-time communication'
        ]
      },
      {
        symptom: 'Can\'t focus with background noise',
        strength: 'Your sensory awareness is heightened — you notice what others miss',
        strategies: [
          'Noise-cancelling headphones or earplugs',
          'Request a quiet workspace or noise accommodation',
          'Brown noise or lo-fi music to mask distractions'
        ]
      }
    ]
  }
];

export default function SuperpowersClusters({ onExperienceClick }: SuperpowersClustersProps) {
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  const handleExperienceClick = (experience: Experience) => {
    setSelectedExperience(experience);
    if (onExperienceClick) {
      onExperienceClick(experience);
    }
  };

  return (
    <div className="w-full">
      {/* Cluster cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clusters.map((cluster, index) => (
          <button
            key={cluster.id}
            onClick={() => setSelectedCluster(cluster)}
            className="group relative p-8 rounded-2xl text-left transition-all duration-500 hover:scale-105 animate-fade-in"
            style={{
              background: `linear-gradient(135deg, ${cluster.colour}15 0%, ${cluster.colour}05 100%)`,
              border: `2px solid ${cluster.colour}30`,
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Floating icon */}
            <div
              className="inline-flex p-4 rounded-2xl mb-4 group-hover:animate-float transition-all duration-300"
              style={{
                background: `${cluster.colour}20`,
                color: cluster.colour
              }}
            >
              {cluster.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2 text-slate-200">
              {cluster.title}
            </h3>

            {/* Count */}
            <p className="text-sm text-slate-400">
              {cluster.experiences.length} experiences
            </p>

            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
              style={{ background: `${cluster.colour}20` }}
            />
          </button>
        ))}
      </div>

      {/* Cluster detail modal */}
      {selectedCluster && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setSelectedCluster(null)}
        >
          <div
            className="bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto animate-scale-in"
            style={{
              border: `2px solid ${selectedCluster.colour}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              className="sticky top-0 p-6 border-b z-10"
              style={{
                background: `linear-gradient(135deg, ${selectedCluster.colour}10 0%, ${selectedCluster.colour}05 100%)`,
                borderColor: `${selectedCluster.colour}20`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: `${selectedCluster.colour}20`,
                      color: selectedCluster.colour
                    }}
                  >
                    {selectedCluster.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-200">
                    {selectedCluster.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedCluster(null)}
                  className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>
            </div>

            {/* Experiences list */}
            <div className="p-6 space-y-4">
              {selectedCluster.experiences.map((experience, index) => (
                <button
                  key={index}
                  onClick={() => handleExperienceClick(experience)}
                  className="w-full text-left p-5 rounded-xl transition-all duration-300 hover:scale-102 group"
                  style={{
                    background: `${selectedCluster.colour}08`,
                    border: `1px solid ${selectedCluster.colour}20`
                  }}
                >
                  <p className="font-medium text-slate-200 mb-2 group-hover:text-teal-300 transition-colors">
                    {experience.symptom}
                  </p>
                  <p className="text-sm text-slate-400 flex items-start gap-2">
                    <Sparkles size={16} style={{ color: selectedCluster.colour, flexShrink: 0, marginTop: '2px' }} />
                    <span>{experience.strength}</span>
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Experience detail modal */}
      {selectedExperience && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] p-4 animate-fade-in"
          onClick={() => setSelectedExperience(null)}
        >
          <div
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 animate-scale-in border-2"
            style={{
              borderColor: `${selectedCluster?.colour || '#14b8a6'}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedExperience(null)}
              className="float-right p-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <X size={20} className="text-slate-400" />
            </button>

            {/* Experience symptom */}
            <h3 className="text-2xl font-bold text-slate-200 mb-4 pr-12">
              {selectedExperience.symptom}
            </h3>

            {/* Strength validation */}
            <div
              className="p-5 rounded-xl mb-6"
              style={{
                background: `${selectedCluster?.colour || '#14b8a6'}15`,
                border: `1px solid ${selectedCluster?.colour || '#14b8a6'}30`
              }}
            >
              <div className="flex items-start gap-3">
                <Sparkles size={24} style={{ color: selectedCluster?.colour || '#14b8a6', flexShrink: 0 }} />
                <p className="text-lg text-slate-200 leading-relaxed">
                  {selectedExperience.strength}
                </p>
              </div>
            </div>

            {/* Strategies */}
            <h4 className="text-lg font-bold text-slate-300 mb-4">
              Try These Strategies
            </h4>
            <div className="space-y-3">
              {selectedExperience.strategies.map((strategy, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 rounded-lg bg-slate-800 bg-opacity-50"
                >
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: `${selectedCluster?.colour || '#14b8a6'}30`,
                      color: selectedCluster?.colour || '#14b8a6'
                    }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-slate-300 leading-relaxed flex-1">
                    {strategy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
