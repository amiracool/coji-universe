/**
 * Autism Educational Content
 * Three-part structure: Understanding It → Daily Life → Planning Ahead
 */

import { EducationalContent } from '@/components/library/EducationalSection';
import { Briefcase, Home, Stethoscope, Calendar } from 'lucide-react';
import React from 'react';

export const autismEducationalContent: EducationalContent = {
  understandingIt: {
    intro: `Autism is a neurological difference in how you process information, communicate, and experience the world. It's not something to "fix" or "overcome"—it's a fundamental part of who you are. Autistic brains work differently, not deficiently. You might experience the world more intensely, need more processing time, or communicate in ways that don't match neurotypical expectations—and that's okay.`,
    traits: [
      "Sensory sensitivities—lights, sounds, textures, smells can be overwhelming or under-stimulating",
      "Preference for routine and predictability—unexpected changes can be distressing",
      "Deep, focused interests that bring joy and expertise",
      "Difficulty reading social cues, body language, or unspoken rules",
      "Honest, direct communication—saying what you mean without hidden agendas",
      "Need for alone time to recharge after social interaction",
      "Stimming (self-stimulatory behavior) to regulate emotions or sensory input",
      "Strong sense of justice and fairness",
      "Thinking in patterns, systems, or visual details"
    ],
    strengths: [
      "Exceptional pattern recognition and attention to detail",
      "Deep expertise in areas of special interest",
      "Honesty and authenticity in communication",
      "Loyalty and commitment in relationships",
      "Creative problem-solving from unique perspectives",
      "Strong sense of justice and ethical consistency"
    ]
  },

  dailyLife: {
    intro: `Autism affects how you navigate social situations, sensory environments, communication, and daily routines. Here's how it shows up in real life, with both challenges and strengths.`,
    challenges: [
      {
        area: "Sensory Processing",
        description: "You experience sensory input more intensely or differently than others.",
        examples: [
          "Fluorescent lights cause headaches or make you feel drained",
          "Background noise (air conditioning, chatter) makes it impossible to concentrate",
          "Certain textures (clothing tags, wet fabric) are physically painful",
          "Strong smells (perfume, food) can be overwhelming or nauseating",
          "You seek out deep pressure or specific textures for comfort"
        ]
      },
      {
        area: "Social Communication",
        description: "Navigating unspoken social rules and reading between the lines can be exhausting.",
        examples: [
          "You don't know when to speak in group conversations",
          "You miss sarcasm or take things literally",
          "Eye contact feels uncomfortable or overwhelming",
          "You struggle with small talk but excel at deep, meaningful conversations",
          "You're unsure if someone is joking or serious"
        ]
      },
      {
        area: "Routine & Change",
        description: "Unexpected changes or disruptions to routine can be deeply unsettling.",
        examples: [
          "A cancelled plan throws off your whole day",
          "You need time to mentally prepare before transitions",
          "You eat the same foods or follow the same routes because they feel safe",
          "Spontaneity feels stressful rather than exciting"
        ]
      },
      {
        area: "Emotional Regulation",
        description: "Big emotions can be overwhelming, and meltdowns or shutdowns happen when you're overloaded.",
        examples: [
          "Too much sensory input leads to shutdown (going non-verbal, withdrawing)",
          "Frustration or change triggers meltdowns (emotional overwhelm)",
          "You need time alone to process emotions before you can talk about them",
          "Masking (hiding autistic traits) leads to burnout"
        ]
      },
      {
        area: "Executive Function",
        description: "Planning, organising, and starting tasks can be difficult.",
        examples: [
          "You struggle to start tasks even when you know what to do",
          "Multitasking feels impossible—you need to focus on one thing at a time",
          "You lose track of time when hyperfocused",
          "Decision-making is exhausting when there are too many options"
        ]
      }
    ],
    adaptiveTraits: [
      "You notice details others miss, which leads to precision and thoroughness",
      "Your special interests give you deep expertise and joy",
      "You're honest and reliable—people know where they stand with you",
      "You think differently, which leads to creative solutions",
      "You're loyal and committed in relationships once trust is built"
    ]
  },

  planningAhead: {
    intro: `These strategies help you create environments and systems that work with your autistic brain, reducing overwhelm and making daily life more manageable.`,
    categories: [
      {
        title: "Jobs & Hobbies",
        icon: React.createElement(Briefcase, { className: "w-5 h-5" }),
        strategies: [
          "Look for roles with clear structure, written instructions, and minimal ambiguity",
          "Consider remote work to control sensory environment",
          "Seek jobs that align with special interests (IT, research, art, engineering, data analysis)",
          "Avoid jobs with high social demands (sales, networking-heavy roles) unless that's your strength",
          "Choose hobbies that provide deep focus and mastery (coding, art, music, collecting)"
        ]
      },
      {
        title: "Accessibility & Environment",
        icon: React.createElement(Home, { className: "w-5 h-5" }),
        strategies: [
          "Use noise-cancelling headphones or earplugs in overwhelming environments",
          "Wear comfortable clothing (soft fabrics, no tags, same style daily if needed)",
          "Dim or control lighting (blackout curtains, warm lamps instead of overhead lights)",
          "Create a sensory-safe space at home for recharging",
          "Use visual schedules or planners to reduce uncertainty",
          "Stock safe foods and have meal routines to reduce decision fatigue"
        ]
      },
      {
        title: "Healthcare Communication",
        icon: React.createElement(Stethoscope, { className: "w-5 h-5" }),
        strategies: [
          "Tell doctors you need clear, direct communication—no vague language",
          "Request written instructions or summaries",
          "Bring a list of questions or concerns to appointments",
          "Ask for accommodations (dimmed lights, quiet waiting room, advance warning for procedures)",
          "Advocate for your sensory needs during medical procedures (e.g., gentler touch, verbal warnings)"
        ]
      },
      {
        title: "Planning & Organisation",
        icon: React.createElement(Calendar, { className: "w-5 h-5" }),
        strategies: [
          "Use visual schedules, timers, and checklists to reduce cognitive load",
          "Build in transition time between activities",
          "Batch similar tasks together (all phone calls in one block, all emails at once)",
          "Set up routines that reduce daily decisions (same breakfast, same commute route)",
          "Use alarms and reminders for tasks and appointments",
          "Allow time for special interests as a reward and recharge activity",
          "Plan recovery time after social events or overwhelming days"
        ]
      }
    ]
  }
};
