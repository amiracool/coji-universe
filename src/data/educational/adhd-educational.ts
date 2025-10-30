/**
 * ADHD Educational Content
 * Three-part structure: Understanding It → Daily Life → Planning Ahead
 */

import { EducationalContent } from '@/components/library/EducationalSection';
import { Briefcase, Home, Stethoscope, Calendar } from 'lucide-react';
import React from 'react';

export const adhdEducationalContent: EducationalContent = {
  understandingIt: {
    intro: `ADHD (Attention Deficit Hyperactivity Disorder) isn't about being lazy or not trying hard enough. It's a neurological difference in how your brain regulates attention, impulse control, and executive function. Your brain seeks dopamine and novelty, which means what feels "interesting" gets done easily, but what feels "boring" can be nearly impossible—even if it's important.`,
    traits: [
      "Difficulty starting tasks, even when you know they're important (executive dysfunction)",
      "Hyperfocus on interesting activities, complete time blindness on boring ones",
      "Struggling to prioritise or estimate how long things will take",
      "Forgetfulness, losing things frequently, missing appointments",
      "Impulsivity—speaking before thinking, interrupting, making quick decisions",
      "Emotional dysregulation—big feelings that come on fast and strong",
      "Restlessness or constant need for movement (fidgeting, pacing, leg bouncing)",
      "Difficulty following multi-step instructions or completing tasks in sequence"
    ],
    strengths: [
      "Creativity and thinking outside the box",
      "Hyperfocus on passionate interests",
      "High energy and enthusiasm",
      "Quick problem-solving in crisis situations",
      "Empathy and emotional depth",
      "Ability to see connections others miss"
    ]
  },

  dailyLife: {
    intro: `ADHD affects how you navigate everyday tasks—from getting ready in the morning to managing work deadlines, maintaining relationships, and keeping track of responsibilities. Here's how it shows up in real life, with both challenges and adaptive strengths.`,
    challenges: [
      {
        area: "Executive Function & Time Management",
        description: "Starting tasks, prioritising, and tracking time can feel impossible.",
        examples: [
          "You know you need to do something, but you can't make yourself start",
          "Hours disappear when you're focused, but boring tasks feel endless",
          "You're always running late, even when you plan ahead",
          "Deadlines sneak up on you—everything feels urgent at the last minute"
        ]
      },
      {
        area: "Focus & Attention",
        description: "Attention is inconsistent—it's not that you can't focus, it's that you can't always control what you focus on.",
        examples: [
          "You can hyperfocus for hours on something interesting but can't read one boring email",
          "You start five tasks and finish none of them",
          "Distractions pull you away constantly (sounds, notifications, random thoughts)",
          "You forget what you were doing mid-task"
        ]
      },
      {
        area: "Emotional Regulation",
        description: "Emotions come on strong and fast, and they can be hard to manage.",
        examples: [
          "Small frustrations feel overwhelming",
          "Rejection sensitivity—criticism or perceived rejection hits hard",
          "Mood shifts quickly based on environment or stimulation",
          "Difficulty calming down once upset"
        ]
      },
      {
        area: "Communication & Relationships",
        description: "ADHD affects how you listen, respond, and manage social interactions.",
        examples: [
          "You interrupt people because thoughts leave your brain if you don't say them immediately",
          "You forget what someone just said because your mind wandered",
          "You struggle with small talk but thrive in deep, meaningful conversations",
          "You accidentally overshare or say things impulsively"
        ]
      },
      {
        area: "Memory & Organisation",
        description: "Working memory is unreliable, and keeping track of things is hard.",
        examples: [
          "You walk into a room and forget why you're there",
          "You lose your phone, keys, or wallet regularly",
          "You forget appointments, even important ones",
          "You have 20 browser tabs open because you'll forget if you close them"
        ]
      }
    ],
    adaptiveTraits: [
      "Crisis mode is your superpower—you work brilliantly under pressure",
      "You notice details others miss when you're interested",
      "You're adaptable and think creatively in unpredictable situations",
      "You bring energy and enthusiasm to projects you care about",
      "You connect ideas in unique ways that lead to innovation"
    ]
  },

  planningAhead: {
    intro: `These strategies help you work with your ADHD brain, not against it. The goal is to reduce friction, make tasks easier to start, and build systems that support your natural strengths.`,
    categories: [
      {
        title: "Jobs & Hobbies",
        icon: React.createElement(Briefcase, { className: "w-5 h-5" }),
        strategies: [
          "Choose work with variety, autonomy, and built-in deadlines (freelance, project-based, creative fields)",
          "Look for roles with physical movement or high stimulation (hospitality, healthcare, events)",
          "Avoid jobs that require sustained admin, repetitive tasks, or long periods of stillness",
          "Build in accountability—body doubling, co-working, or external deadlines help",
          "Use hobbies as dopamine fuel—rotate between several to avoid boredom"
        ]
      },
      {
        title: "Accessibility & Environment",
        icon: React.createElement(Home, { className: "w-5 h-5" }),
        strategies: [
          "Create a 'dopamine menu'—list of quick, energising activities to restart focus",
          "Use timers and alarms for everything (visual timers like Time Timer are great)",
          "Keep spaces simple—clutter overwhelms, so minimise what's visible",
          "Use noise-cancelling headphones or brown noise to block distractions",
          "Set up 'launching pads' for items you always lose (keys, wallet, phone)",
          "Automate what you can—recurring payments, meal delivery, calendar reminders"
        ]
      },
      {
        title: "Healthcare Communication",
        icon: React.createElement(Stethoscope, { className: "w-5 h-5" }),
        strategies: [
          "Tell clinicians you need written instructions—verbal info gets forgotten",
          "Ask for appointment reminders (text or email)",
          "Use apps like MyTherapy or Medisafe to track medication",
          "Be honest about struggles with routine—it's medical, not personal failure",
          "Request flexible appointment times if mornings are impossible for you"
        ]
      },
      {
        title: "Planning & Organisation",
        icon: React.createElement(Calendar, { className: "w-5 h-5" }),
        strategies: [
          "Use external brains—apps, sticky notes, voice memos, reminders",
          "Break tasks into tiny steps (not 'clean room,' but 'pick up 5 things')",
          "Use body doubling—work alongside someone, even virtually",
          "Schedule 'buffer time' between tasks—transitions are hard",
          "Front-load your day with hardest tasks if you're a morning person (or vice versa)",
          "Use visual cues—put things where you'll see them, not hidden in drawers",
          "Accept that routines will break—plan for chaos, not perfection"
        ]
      }
    ]
  }
};
