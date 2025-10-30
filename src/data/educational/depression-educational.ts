/**
 * Depression Educational Content
 */

import { EducationalContent } from '@/components/library/EducationalSection';
import { Briefcase, Home, Stethoscope, Calendar } from 'lucide-react';
import React from 'react';

export const depressionEducationalContent: EducationalContent = {
  understandingIt: {
    intro: `Depression is not sadness, laziness, or weakness. It's a real medical condition affecting your brain chemistry, energy, and ability to function. It's like your brain's motivation and emotion systems are running on a flat battery—everything feels harder, heavier, and less meaningful.`,
    traits: [
      "Persistent low mood, emptiness, or numbness (not just sadness)",
      "Loss of interest in things you used to enjoy (anhedonia)",
      "Extreme fatigue—even small tasks feel impossible",
      "Sleep problems (insomnia or sleeping too much)",
      "Difficulty concentrating, making decisions, or remembering things",
      "Feelings of worthlessness, guilt, or hopelessness",
      "Physical symptoms (aches, digestive issues, headaches)",
      "Suicidal thoughts or self-harm urges (please seek help if this is you)"
    ],
    strengths: [
      "Deep empathy and understanding of suffering",
      "Resilience from surviving difficult times",
      "Ability to appreciate small moments of relief or joy",
      "Insight into mental health that helps others",
      "Strength that comes from fighting invisible battles daily"
    ]
  },

  dailyLife: {
    intro: `Depression affects every aspect of life—work, relationships, self-care, and even basic functioning. Here's how it shows up day-to-day.`,
    challenges: [
      {
        area: "Energy & Motivation",
        description: "Even basic tasks feel overwhelming and exhausting.",
        examples: [
          "Getting out of bed feels like climbing a mountain",
          "Showering, brushing teeth, or eating feel like too much effort",
          "You know what you should do, but you physically can't make yourself do it",
          "Rest doesn't restore energy—you wake up already exhausted",
          "Procrastination isn't laziness—it's paralysis"
        ]
      },
      {
        area: "Emotional Numbness",
        description: "You don't feel sad—you feel nothing at all.",
        examples: [
          "Things that used to bring joy now feel meaningless",
          "You go through the motions but feel disconnected",
          "You can't cry even when you want to",
          "You feel emotionally flat, like you're watching life through glass",
          "You struggle to care about anything, including yourself"
        ]
      },
      {
        area: "Cognitive Function",
        description: "Depression affects memory, focus, and decision-making.",
        examples: [
          "You forget conversations, appointments, or tasks",
          "Concentrating on work or reading is nearly impossible",
          "Making decisions (even small ones) feels overwhelming",
          "Your mind feels foggy or slow",
          "You struggle to process or retain information"
        ]
      },
      {
        area: "Relationships & Social Life",
        description: "Depression makes connection feel impossible or exhausting.",
        examples: [
          "You isolate because you don't have energy for people",
          "You feel like a burden to others",
          "You cancel plans because facing people feels impossible",
          "You struggle to express emotions or ask for help",
          "Relationships suffer because you can't show up the way you want to"
        ]
      }
    ],
    adaptiveTraits: [
      "You understand suffering in a way that makes you deeply compassionate",
      "You appreciate small wins because you know how hard they are",
      "You're resilient—surviving depression takes strength people don't see",
      "You're honest about pain in ways that help reduce stigma",
      "You notice others struggling and offer empathy without judgment"
    ]
  },

  planningAhead: {
    intro: `These strategies help you manage depression by reducing demands, building tiny habits, and accessing support when you need it most.`,
    categories: [
      {
        title: "Jobs & Hobbies",
        icon: React.createElement(Briefcase, { className: "w-5 h-5" }),
        strategies: [
          "Choose flexible work with understanding employers",
          "Avoid high-stress, deadline-heavy environments if possible",
          "Request accommodations (flexible hours, remote work, mental health days)",
          "Start with part-time or reduced hours if full-time is overwhelming",
          "Choose hobbies that don't require energy (audiobooks, podcasts, gentle walks)",
          "Let go of productivity guilt—rest is not laziness"
        ]
      },
      {
        title: "Accessibility & Environment",
        icon: React.createElement(Home, { className: "w-5 h-5" }),
        strategies: [
          "Keep essentials within reach (water, snacks, meds by your bed)",
          "Lower your standards—clean dishes in the sink is better than dirty ones piled up",
          "Use paper plates, pre-cut vegetables, or meal delivery if cooking is too much",
          "Set up your space for low-energy days (charging cables nearby, easy-access clothing)",
          "Open curtains or use a light therapy lamp (light affects mood)",
          "Keep a crisis plan visible (helpline numbers, trusted contacts, coping strategies)"
        ]
      },
      {
        title: "Healthcare Communication",
        icon: React.createElement(Stethoscope, { className: "w-5 h-5" }),
        strategies: [
          "Tell your doctor about depression—it affects physical health too",
          "Be honest about suicidal thoughts—it's not attention-seeking, it's survival",
          "Discuss medication options (SSRIs, SNRIs) if you're open to it",
          "Request professional support referrals (CBT, DBT, support groups)",
          "If one treatment doesn't work, try another—depression is treatable",
          "Use crisis lines: 988 (Suicide & Crisis Lifeline) or text HELLO to 741741"
        ]
      },
      {
        title: "Planning & Organisation",
        icon: React.createElement(Calendar, { className: "w-5 h-5" }),
        strategies: [
          "Use 'behavioral activation'—do small things even when you don't feel like it",
          "Start with micro-habits: brush teeth, drink water, open curtains",
          "Action before motivation—motivation follows action, not the other way around",
          "Use alarms/reminders for meals, meds, and self-care",
          "Track small wins (showered, ate, went outside)—they matter",
          "Build a support network—let trusted people know you're struggling",
          "Plan for bad days—create a 'can't cope' kit (comfort items, easy meals, distractions)",
          "Be kind to yourself—depression lies, and you're doing better than you think"
        ]
      }
    ]
  }
};
