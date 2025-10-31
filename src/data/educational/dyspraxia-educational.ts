/**
 * Dyspraxia Educational Content
 */

import { EducationalContent } from '@/components/library/EducationalSection';
import { Briefcase, Home, Stethoscope, Calendar } from 'lucide-react';
import React from 'react';

export const dyspraxiaEducationalContent: EducationalContent = {
  understandingIt: {
    intro: `Dyspraxia (also called Developmental Coordination Disorder or DCD) affects how your brain plans and coordinates physical movements. It's not about being clumsy or lazy—it's a neurological difference in motor planning. Your brain knows what it wants to do, but the signal doesn't translate smoothly into coordinated action.`,
    traits: [
      "Difficulty with fine motor skills (handwriting, buttons, tying laces)",
      "Poor spatial awareness—bumping into things, misjudging distances",
      "Coordination challenges (catching balls, riding bikes, dancing)",
      "Slow processing of physical instructions",
      "Difficulty with sequencing multi-step movements",
      "Struggles with balance and posture",
      "Poor hand-eye coordination",
      "Fatigue from extra effort required for physical tasks"
    ],
    strengths: [
      "Creative problem-solving and thinking differently",
      "Strong verbal skills and empathy",
      "Determination and resilience from navigating challenges",
      "Innovative approaches to tasks",
      "Ability to think holistically rather than step-by-step"
    ]
  },

  dailyLife: {
    intro: `Dyspraxia affects everyday physical tasks, from getting dressed to typing, cooking, and navigating spaces. Here's how it shows up in daily life.`,
    challenges: [
      {
        area: "Fine Motor Skills",
        description: "Tasks requiring precise hand movements are exhausting and slow.",
        examples: [
          "Handwriting is messy, slow, or painful",
          "Buttons, zippers, and shoelaces are frustrating",
          "Using cutlery properly takes concentration",
          "Typing is slow or requires looking at keys"
        ]
      },
      {
        area: "Gross Motor Coordination",
        description: "Large movements like walking, running, or sports are challenging.",
        examples: [
          "You trip over your own feet or nothing at all",
          "Catching or throwing a ball feels impossible",
          "Dancing or following choreography is overwhelming",
          "You avoid sports or physical group activities"
        ]
      },
      {
        area: "Spatial Awareness",
        description: "Judging distances, navigating spaces, and parking are difficult.",
        examples: [
          "You bump into door frames, furniture, or people",
          "You misjudge how much space you need",
          "Parking a car is stressful",
          "You struggle with left/right directions"
        ]
      },
      {
        area: "Organisation & Sequencing",
        description: "Planning and executing multi-step tasks takes extra effort.",
        examples: [
          "Following recipes or instructions is overwhelming",
          "You forget steps halfway through a task",
          "Getting ready in the morning takes forever",
          "You struggle to organise physical spaces"
        ]
      }
    ],
    adaptiveTraits: [
      "You find creative workarounds for physical challenges",
      "You develop strong verbal and conceptual thinking skills",
      "You're empathetic and aware of others' struggles",
      "You're resilient from navigating a world not built for you"
    ]
  },

  planningAhead: {
    intro: `These strategies help you work with your dyspraxia, reducing physical strain and making daily tasks more manageable.`,
    categories: [
      {
        title: "Jobs & Hobbies",
        icon: React.createElement(Briefcase, { className: "w-5 h-5" }),
        strategies: [
          "Choose roles that don't require fast manual dexterity (tech, writing, research)",
          "Avoid jobs with heavy physical coordination (surgery, athletics, manufacturing)",
          "Use assistive tech (speech-to-text, ergonomic tools, keyboard shortcuts)",
          "Request accommodations (extra time, written instructions, flexible workspaces)",
          "Choose hobbies that don't require coordination (reading, music listening, gaming with adaptive controllers)"
        ]
      },
      {
        title: "Accessibility & Environment",
        icon: React.createElement(Home, { className: "w-5 h-5" }),
        strategies: [
          "Use elastic laces, Velcro, or slip-on shoes",
          "Choose clothing with easy fastenings (zippers over buttons)",
          "Use voice-to-text for writing instead of handwriting",
          "Set up your space to minimise obstacles (clear pathways, organised surfaces)",
          "Use grip aids for jars, pens, and utensils",
          "Keep essentials in consistent, easy-to-reach places"
        ]
      },
      {
        title: "Healthcare Communication",
        icon: React.createElement(Stethoscope, { className: "w-5 h-5" }),
        strategies: [
          "Tell clinicians you need extra time for physical tasks (blood pressure cuffs, physical exams)",
          "Request written or visual instructions rather than verbal-only",
          "Ask for accommodations during procedures (support for balance, gentle touch)",
          "Bring a list of medications/conditions—writing quickly is hard",
          "Advocate for occupational therapy referrals if available"
        ]
      },
      {
        title: "Planning & Organisation",
        icon: React.createElement(Calendar, { className: "w-5 h-5" }),
        strategies: [
          "Use checklists and visual routines for multi-step tasks",
          "Break tasks into tiny steps (not 'get dressed,' but '1. socks 2. pants 3. shirt')",
          "Use timers to track how long tasks actually take",
          "Practice tasks in low-pressure situations before doing them publicly",
          "Allow extra time for physical tasks—rushing makes coordination worse",
          "Use assistive tech everywhere (dictation, calculators, GPS)",
          "Build in rest breaks—physical tasks are exhausting"
        ]
      }
    ]
  }
};
