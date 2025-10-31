/**
 * Anxiety Educational Content
 */

import { EducationalContent } from '@/components/library/EducationalSection';
import { Briefcase, Home, Stethoscope, Calendar } from 'lucide-react';
import React from 'react';

export const anxietyEducationalContent: EducationalContent = {
  understandingIt: {
    intro: `Anxiety is your brain's alarm system being hypersensitive—it's trying to protect you, but it's firing warnings for threats that aren't actually dangerous. It's not weakness or overthinking on purpose. Anxiety disorders are real, physical conditions affecting how your nervous system processes safety and danger.`,
    traits: [
      "Constant worry that feels impossible to control",
      "Physical symptoms: racing heart, tight chest, nausea, dizziness",
      "Catastrophic thinking—imagining worst-case scenarios",
      "Avoidance of situations that trigger anxiety",
      "Difficulty relaxing or feeling 'on edge' constantly",
      "Sleep problems (trouble falling asleep, racing thoughts at night)",
      "Hypervigilance—scanning for threats or problems",
      "Perfectionism driven by fear of failure or judgment"
    ],
    strengths: [
      "High attention to detail and risk awareness",
      "Preparedness and thorough planning",
      "Empathy and emotional sensitivity",
      "Strong intuition about people and situations",
      "Motivation to prevent problems before they occur"
    ]
  },

  dailyLife: {
    intro: `Anxiety affects how you navigate decisions, social situations, work, and even basic tasks. Here's how it shows up in everyday life.`,
    challenges: [
      {
        area: "Physical Symptoms",
        description: "Anxiety lives in your body, not just your mind.",
        examples: [
          "Racing heart, sweating, or shaking in normal situations",
          "Nausea or stomach issues before or during stressful events",
          "Tight chest, shallow breathing, or feeling like you can't breathe",
          "Headaches, muscle tension, or jaw clenching",
          "Fatigue from constant hypervigilance"
        ]
      },
      {
        area: "Thought Patterns",
        description: "Anxious thoughts spiral and feel impossible to stop.",
        examples: [
          "Catastrophizing—'What if the worst happens?'",
          "Ruminating on past mistakes or future worries",
          "Black-and-white thinking—things are perfect or disasters",
          "Constant second-guessing and self-doubt",
          "Intrusive thoughts that feel disturbing or irrational"
        ]
      },
      {
        area: "Social Situations",
        description: "Social anxiety makes interactions feel threatening.",
        examples: [
          "Fear of judgment or saying something embarrassing",
          "Avoiding eye contact or speaking in groups",
          "Replaying conversations afterward, analyzing every word",
          "Canceling plans due to anticipatory anxiety",
          "Physical symptoms (blushing, sweating, trembling) in social settings"
        ]
      },
      {
        area: "Avoidance & Safety Behaviours",
        description: "Anxiety leads to avoiding situations that feel unsafe.",
        examples: [
          "Avoiding places, people, or activities that trigger anxiety",
          "Over-preparing or seeking constant reassurance",
          "Procrastinating on tasks that feel overwhelming",
          "Using substances, food, or behaviours to cope",
          "Staying in your comfort zone even when it limits your life"
        ]
      }
    ],
    adaptiveTraits: [
      "You're excellent at anticipating problems and planning ahead",
      "You notice details others miss, which can prevent mistakes",
      "You're deeply empathetic and aware of others' feelings",
      "You're cautious in ways that can protect you and others",
      "You're motivated to prepare thoroughly and avoid risks"
    ]
  },

  planningAhead: {
    intro: `These strategies help you manage anxiety by calming your nervous system, challenging anxious thoughts, and building resilience over time.`,
    categories: [
      {
        title: "Jobs & Hobbies",
        icon: React.createElement(Briefcase, { className: "w-5 h-5" }),
        strategies: [
          "Look for structured, predictable work environments",
          "Avoid high-pressure, chaotic, or unpredictable roles (emergency services, sales with aggressive targets)",
          "Choose remote work if social anxiety is significant",
          "Seek roles with clear expectations and feedback",
          "Engage in calming hobbies (art, gardening, reading, walking in nature)",
          "Avoid hobbies that increase adrenaline if you're already anxious (extreme sports, horror media)"
        ]
      },
      {
        title: "Accessibility & Environment",
        icon: React.createElement(Home, { className: "w-5 h-5" }),
        strategies: [
          "Create a calm, clutter-free space at home",
          "Use noise-cancelling headphones or white noise to reduce overstimulation",
          "Keep a 'calm kit' (fidget tools, essential oils, weighted blanket, calming music)",
          "Dim lighting and soft textures can reduce sensory overwhelm",
          "Establish routines to reduce daily uncertainty",
          "Limit caffeine and alcohol—they worsen anxiety",
          "Use grounding techniques (5-4-3-2-1 senses, cold water, breathing exercises)"
        ]
      },
      {
        title: "Healthcare Communication",
        icon: React.createElement(Stethoscope, { className: "w-5 h-5" }),
        strategies: [
          "Tell doctors about your anxiety—it affects physical health (heart rate, blood pressure)",
          "Request written instructions or recordings of appointments",
          "Ask for longer appointments if you need time to process information",
          "Bring a support person if medical settings trigger anxiety",
          "Discuss medication options (SSRIs, beta-blockers) if needed",
          "Request therapy referrals (CBT is evidence-based for anxiety)"
        ]
      },
      {
        title: "Planning & Organisation",
        icon: React.createElement(Calendar, { className: "w-5 h-5" }),
        strategies: [
          "Use exposure therapy principles—gradually face fears in small steps",
          "Challenge catastrophic thoughts: 'Is this likely? What's the evidence?'",
          "Practice grounding techniques daily (box breathing, progressive muscle relaxation)",
          "Schedule worry time—set aside 15 minutes to worry, then move on",
          "Build a support network—people who understand and validate your anxiety",
          "Use apps for guided meditation, breathing, or CBT exercises",
          "Prioritise sleep, exercise, and nutrition—they directly affect anxiety",
          "Limit news/social media if it fuels anxious thoughts"
        ]
      }
    ]
  }
};
