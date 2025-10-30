/**
 * Dyscalculia Educational Content
 */

import { EducationalContent } from '@/components/library/EducationalSection';
import { Briefcase, Home, Stethoscope, Calendar } from 'lucide-react';
import React from 'react';

export const dyscalculiaEducationalContent: EducationalContent = {
  understandingIt: {
    intro: `Dyscalculia is a neurological difference affecting how your brain processes numbers, quantities, and mathematical concepts. It's not about being "bad at math"—it's about your brain interpreting numerical information differently. Numbers can feel abstract, slippery, or meaningless in ways that others don't experience.`,
    traits: [
      "Difficulty understanding number concepts (bigger/smaller, more/less)",
      "Trouble memorizing math facts (times tables, formulas)",
      "Struggles with mental math and estimation",
      "Difficulty reading clocks (especially analog)",
      "Confusion with sequences and patterns",
      "Problems with money management and making change",
      "Spatial reasoning challenges (left/right, directions)",
      "Math anxiety from repeated failure despite effort"
    ],
    strengths: [
      "Strong verbal and creative thinking skills",
      "Intuitive understanding of concepts over formulas",
      "Problem-solving through alternative methods",
      "Resilience from navigating a number-heavy world",
      "Empathy and understanding of learning differences"
    ]
  },

  dailyLife: {
    intro: `Dyscalculia affects everyday tasks involving numbers, time, money, and spatial reasoning. Here's how it shows up in daily life.`,
    challenges: [
      {
        area: "Time Management",
        description: "Understanding and tracking time is confusing.",
        examples: [
          "Analog clocks are impossible to read quickly",
          "You struggle to estimate how long tasks will take",
          "You're often late because time 'disappears'",
          "Schedules and timetables are overwhelming",
          "You mix up dates, times, or appointment days"
        ]
      },
      {
        area: "Money & Finances",
        description: "Handling money, budgeting, and making change are stressful.",
        examples: [
          "Calculating tips or splitting bills causes panic",
          "You avoid cash because counting change is hard",
          "Budgeting feels impossible—numbers don't stick",
          "You struggle to compare prices or calculate discounts",
          "You use cards to avoid counting money"
        ]
      },
      {
        area: "Directions & Navigation",
        description: "Spatial reasoning and left/right confusion make navigation difficult.",
        examples: [
          "You confuse left and right, even as an adult",
          "Following directions with numbers (turn at the 3rd light) is hard",
          "Reading maps or GPS instructions is overwhelming",
          "You get lost easily, even in familiar places",
          "Parking or reversing a car is stressful"
        ]
      },
      {
        area: "Everyday Math",
        description: "Basic calculations in daily life feel impossible.",
        examples: [
          "You can't do mental math without a calculator",
          "Cooking with measurements is confusing (doubling recipes, conversions)",
          "You avoid activities that require math (sports scores, board games)",
          "You struggle with sequences (phone numbers, PINs)",
          "You rely on fingers or tools for simple calculations"
        ]
      }
    ],
    adaptiveTraits: [
      "You find creative, non-numerical ways to solve problems",
      "You develop strong visual or verbal memory to compensate",
      "You're resourceful and use tools without shame",
      "You empathize with others who struggle academically",
      "You think holistically rather than in rigid formulas"
    ]
  },

  planningAhead: {
    intro: `These strategies help you navigate a number-heavy world by using tools, visual aids, and alternative methods that work with your brain.`,
    categories: [
      {
        title: "Jobs & Hobbies",
        icon: React.createElement(Briefcase, { className: "w-5 h-5" }),
        strategies: [
          "Choose careers that don't rely heavily on math (writing, design, social work, arts)",
          "Avoid jobs with constant calculations (accounting, engineering, finance)",
          "Use calculators, spreadsheets, and apps without shame—they're accessibility tools",
          "Request accommodations (extra time, calculators, written instructions)",
          "Choose hobbies that don't involve scorekeeping or measurements",
          "Use technology to automate number-based tasks wherever possible"
        ]
      },
      {
        title: "Accessibility & Environment",
        icon: React.createElement(Home, { className: "w-5 h-5" }),
        strategies: [
          "Use digital clocks instead of analog",
          "Set phone alarms with labels for appointments",
          "Use budgeting apps that visualize spending (not just numbers)",
          "Keep a calculator on your phone home screen",
          "Use GPS with voice directions (not turn-by-turn numbers)",
          "Color-code calendars and schedules",
          "Use visual timers (Time Timer) instead of counting minutes",
          "Automate bill payments to avoid late fees"
        ]
      },
      {
        title: "Healthcare Communication",
        icon: React.createElement(Stethoscope, { className: "w-5 h-5" }),
        strategies: [
          "Tell clinicians you struggle with numbers—ask for written medication instructions",
          "Request visual aids for dosing (pill organizers with days labeled)",
          "Use medication reminder apps (Medisafe, MyTherapy)",
          "Bring a calculator or support person to appointments involving numbers",
          "Ask for clarification on measurements (weight, blood pressure numbers)",
          "Request accommodations if medical forms require complex calculations"
        ]
      },
      {
        title: "Planning & Organisation",
        icon: React.createElement(Calendar, { className: "w-5 h-5" }),
        strategies: [
          "Use visual calendars with color-coding (not just numbered dates)",
          "Set recurring reminders for regular tasks",
          "Use contactless payment to avoid counting cash",
          "Use tip calculators or pre-set percentages (15%, 20%)",
          "Practice estimating in low-pressure situations",
          "Use measurement conversion apps for cooking",
          "Write down directions or save them in your phone",
          "Use landmarks instead of street numbers for navigation",
          "Build routines that don't rely on time estimation (alarms for transitions)"
        ]
      }
    ]
  }
};
