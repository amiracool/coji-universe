/**
 * Chronic Illness Educational Content
 */

import { EducationalContent } from '@/components/library/EducationalSection';
import { Briefcase, Home, Stethoscope, Calendar } from 'lucide-react';
import React from 'react';

export const chronicIllnessEducationalContent: EducationalContent = {
  understandingIt: {
    intro: `Chronic illness means living with ongoing physical health conditions that significantly impact your daily life. It's not about being dramatic or weak—your body genuinely functions differently, and managing symptoms takes constant energy. Chronic illnesses often overlap with neurodivergence (EDS, POTS, ME/CFS, fibromyalgia, autoimmune conditions).`,
    traits: [
      "Persistent pain, fatigue, or physical symptoms that don't go away",
      "Fluctuating symptoms—good days and bad days without warning",
      "Need for pacing and energy management (spoons theory)",
      "Invisible symptoms that others don't see or understand",
      "Medical appointments, tests, and treatments take up significant time",
      "Grief for the life you had before illness",
      "Difficulty with activities others take for granted",
      "Uncertainty about prognosis, flare-ups, or progression"
    ],
    strengths: [
      "Resilience from navigating daily challenges most people never face",
      "Deep empathy for others' suffering",
      "Resourcefulness in adapting to limitations",
      "Appreciation for small moments of relief or joy",
      "Ability to advocate for yourself and set boundaries"
    ]
  },

  dailyLife: {
    intro: `Chronic illness affects energy, mobility, pain levels, and the ability to plan ahead. Here's how it shows up in everyday life.`,
    challenges: [
      {
        area: "Energy & Fatigue",
        description: "Fatigue isn't tiredness—it's a physical barrier to functioning.",
        examples: [
          "You wake up exhausted even after 10 hours of sleep",
          "Basic tasks (showering, cooking) drain your energy for hours",
          "Post-exertional malaise (PEM)—overdoing it causes crashes",
          "You need to ration energy carefully (spoons theory)",
          "Rest doesn't always restore energy"
        ]
      },
      {
        area: "Pain Management",
        description: "Chronic pain is constant and affects everything.",
        examples: [
          "Pain interferes with sleep, focus, and mood",
          "Movement can worsen pain, but staying still causes stiffness",
          "Pain is invisible—people don't see your struggle",
          "Medications help but have side effects or don't fully work",
          "Pain flares unpredictably"
        ]
      },
      {
        area: "Mobility & Physical Limitations",
        description: "Your body doesn't cooperate the way it used to.",
        examples: [
          "Stairs, long walks, or standing for long periods are impossible",
          "You need mobility aids (wheelchair, cane, walker) but face stigma",
          "You can't carry heavy items or lift things",
          "Coordination and balance may be affected",
          "You avoid activities because you know your body can't handle them"
        ]
      },
      {
        area: "Social & Emotional Impact",
        description: "Chronic illness affects relationships, work, and identity.",
        examples: [
          "You cancel plans because your body won't cooperate",
          "People don't understand why you're sick if you 'look fine'",
          "You feel guilty for not being able to do what others can",
          "You grieve the life you had before illness",
          "Medical gaslighting—doctors dismiss or minimize your symptoms"
        ]
      }
    ],
    adaptiveTraits: [
      "You've learned to pace yourself and listen to your body's limits",
      "You're excellent at advocating for your needs",
      "You appreciate small wins (getting dressed, making a meal)",
      "You've developed patience and acceptance",
      "You understand suffering in a way that makes you deeply compassionate"
    ]
  },

  planningAhead: {
    intro: `These strategies help you manage chronic illness by pacing, reducing physical demands, and advocating for support.`,
    categories: [
      {
        title: "Jobs & Hobbies",
        icon: React.createElement(Briefcase, { className: "w-5 h-5" }),
        strategies: [
          "Choose flexible, remote work if possible (reduces physical strain)",
          "Avoid physically demanding jobs (standing all day, heavy lifting)",
          "Request accommodations (flexible hours, work-from-home, medical leave)",
          "Consider part-time or freelance work if full-time is unsustainable",
          "Choose low-energy hobbies (reading, podcasts, gentle crafts, watching shows)",
          "Let go of productivity guilt—rest is a necessity, not laziness"
        ]
      },
      {
        title: "Accessibility & Environment",
        icon: React.createElement(Home, { className: "w-5 h-5" }),
        strategies: [
          "Use mobility aids without shame (wheelchairs, canes, shower chairs)",
          "Set up your home for low-energy days (essentials within reach, grab bars)",
          "Use meal delivery, grocery delivery, or pre-cut vegetables",
          "Keep a 'crash kit' nearby (water, snacks, meds, heating pad, entertainment)",
          "Use voice assistants to control lights, thermostats, and reminders",
          "Prioritize energy for what matters—outsource or skip the rest"
        ]
      },
      {
        title: "Healthcare Communication",
        icon: React.createElement(Stethoscope, { className: "w-5 h-5" }),
        strategies: [
          "Track symptoms in a journal or app (pain levels, triggers, patterns)",
          "Bring symptom logs to appointments—doctors take data seriously",
          "Advocate firmly: 'This is affecting my quality of life—I need help'",
          "Request referrals to specialists (rheumatology, neurology, pain management)",
          "Ask about pacing strategies, physiotherapy, or occupational therapy",
          "If a doctor dismisses you, find a new one—you deserve care",
          "Bring a support person to appointments to advocate for you"
        ]
      },
      {
        title: "Planning & Organisation",
        icon: React.createElement(Calendar, { className: "w-5 h-5" }),
        strategies: [
          "Use spoons theory to budget energy (assign 'spoons' to tasks)",
          "Pace yourself—do less than you think you can to avoid crashes",
          "Plan rest days after high-energy activities",
          "Use timers to prevent overexertion (rest every 20 minutes)",
          "Build routines that minimize energy use (meal prep, simplified chores)",
          "Accept help—asking for help is strength, not weakness",
          "Grieve the life you had, but build a new one within your limits",
          "Join support groups—connect with others who understand"
        ]
      }
    ]
  }
};
