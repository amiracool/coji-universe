/**
 * ADHD Planet - Mobile-First Content
 * Colour: #F96E46 (warm coral) / #FFAA5C (accent)
 * Designed for calm, validating experience with low cognitive load
 */

export const adhdPlanetMobile = {
  // Header
  name: "ADHD Planet",
  tagline: "Understanding a brain that moves fast, feels deeply, and creates brilliantly.",
  icon: "⚡",
  primaryColor: "#F96E46",
  accentColor: "#FFAA5C",

  // Understanding It (visual, emotional, validating)
  understandingIt: {
    sections: [
      {
        icon: "🧠",
        visual: "⚡",
        title: "Your brain moves differently",
        text: "You're not lazy or careless.\nYour brain prioritises interest, urgency, and novelty — not importance.",
        color: "#F96E46"
      },
      {
        icon: "💡",
        visual: "✨",
        title: "You think in connections",
        text: "Your mind makes leaps others don't see —\ncreative, intuitive, and fast.",
        color: "#FFAA5C"
      },
      {
        icon: "🎯",
        visual: "🌀",
        title: "Focus isn't a switch",
        text: "You hyperfocus on what lights you up,\nand struggle with tasks that don't.",
        color: "#FF6B9D"
      },
      {
        icon: "⏰",
        visual: "🌊",
        title: "Time feels fluid",
        text: "Hours vanish when you're engaged.\nMinutes drag when you're bored.",
        color: "#FFD93D"
      },
      {
        icon: "❤️",
        visual: "🔥",
        title: "Emotions hit hard",
        text: "Joy, frustration, excitement — you feel everything at full volume.",
        color: "#FF6B6B"
      },
      {
        icon: "✨",
        visual: "🚀",
        title: "You're not broken",
        text: "You're wired for creativity, adaptability, and passion.\nYou just need the right environment.",
        color: "#4ECDC4"
      }
    ]
  },

  // How It Shows Up (clear, literal, visual breaks)
  howItShowsUp: [
    {
      id: "attention",
      title: "Focus & Attention",
      icon: "🎯",
      accentColor: "#FFAA5C",
      preview: [
        "You can hyperfocus for hours on things you love.",
        "Starting boring tasks feels impossible.",
        "You lose things constantly — keys, phone, wallet."
      ],
      expanded: [
        "Your mind wanders even when you try to listen.",
        "You interrupt people or finish their sentences.",
        "Sustaining attention on dull tasks drains you fast.",
        "You notice everything or nothing — no in-between."
      ]
    },
    {
      id: "time",
      title: "Time & Planning",
      icon: "⏰",
      accentColor: "#FFAA5C",
      preview: [
        "You're always late or ridiculously early.",
        "Time blindness makes deadlines sneak up on you.",
        "You underestimate how long things take."
      ],
      expanded: [
        "You work best under pressure (hello, deadline panic).",
        "Planning feels overwhelming, so you wing it.",
        "You forget appointments even when you write them down.",
        "Multi-step tasks are hard to sequence."
      ]
    },
    {
      id: "emotion",
      title: "Emotions & Rejection",
      icon: "💔",
      accentColor: "#FFAA5C",
      preview: [
        "Rejection or criticism hits you hard.",
        "You feel emotions intensely and immediately.",
        "Waiting for responses creates anxious spiraling."
      ],
      expanded: [
        "Rejection Sensitive Dysphoria (RSD) is real and painful.",
        "You replay conversations, analyzing what went wrong.",
        "Anger or frustration flares fast, then fades.",
        "You're deeply empathetic but struggle to regulate big feelings."
      ]
    },
    {
      id: "tasks",
      title: "Tasks & Routines",
      icon: "📋",
      accentColor: "#FFAA5C",
      preview: [
        "You start ten projects and finish two.",
        "Boring tasks feel physically painful.",
        "You need urgency or interest to get moving."
      ],
      expanded: [
        "Task-switching is exhausting but constant.",
        "You thrive on novelty, struggle with repetition.",
        "You forget mid-task what you were doing.",
        "Routines help but feel impossible to maintain."
      ]
    },
    {
      id: "energy",
      title: "Energy & Rest",
      icon: "⚡",
      accentColor: "#FFAA5C",
      preview: [
        "You have bursts of intense energy, then crash.",
        "Sleep is hard — your brain won't turn off.",
        "You fidget, pace, or need movement to think."
      ],
      expanded: [
        "Sitting still feels uncomfortable or painful.",
        "You need stimulation to stay awake or focused.",
        "Burnout sneaks up fast when you overcommit.",
        "Rest doesn't feel restful unless you're fully engaged."
      ]
    }
  ],

  // Strengths & Sensitivities (interactive tiles)
  strengthsAndSensitivities: [
    {
      id: "creativity",
      title: "Creative Problem-Solving",
      shortDesc: "You think outside the box effortlessly.",
      fullDesc: "Your brain makes unexpected connections, generating innovative ideas and solutions. You excel at brainstorming, improvisation, and finding unconventional approaches."
    },
    {
      id: "hyperfocus",
      title: "Hyperfocus",
      shortDesc: "When you're interested, you're unstoppable.",
      fullDesc: "You can dive deep into topics you love, achieving flow states that produce incredible work. Your passion projects benefit from this intense, sustained focus."
    },
    {
      id: "adaptability",
      title: "Adaptability",
      shortDesc: "You thrive in dynamic, fast-paced environments.",
      fullDesc: "Change doesn't scare you — it energises you. You're quick to pivot, think on your feet, and handle chaos better than most."
    },
    {
      id: "enthusiasm",
      title: "Enthusiasm & Energy",
      shortDesc: "Your excitement is contagious.",
      fullDesc: "You bring energy and passion to everything you care about. Your enthusiasm motivates others and creates momentum in projects."
    },
    {
      id: "intuition",
      title: "Intuitive Thinking",
      shortDesc: "You sense patterns and make fast connections.",
      fullDesc: "Your brain processes information quickly, often arriving at insights before you can explain how. This makes you great at reading situations and people."
    },
    {
      id: "empathy",
      title: "Deep Empathy",
      shortDesc: "You feel others' emotions intensely.",
      fullDesc: "Your emotional sensitivity makes you compassionate, understanding, and deeply connected to others. You notice when people are struggling."
    }
  ],

  // Planning Ahead (micro-cards for ND cognitive ease)
  planningAhead: [
    {
      id: "jobs",
      title: "Jobs & Hobbies",
      icon: "💼",
      cards: [
        {
          id: "jobs-1",
          icon: "🎨",
          title: "Choose variety over monotony",
          summary: "Look for roles with novelty, autonomy, and creative problem-solving.",
          detail: "Consider careers in creative fields, tech, entrepreneurship, sales, emergency services, or project-based work. Avoid repetitive, detail-heavy roles unless they deeply interest you."
        },
        {
          id: "jobs-2",
          icon: "⏰",
          title: "Use external structure",
          summary: "Timers, body-doubling, and accountability partners help you stay on track.",
          detail: "Work with coaches, use co-working spaces, or schedule regular check-ins. Pomodoro timers, visual progress trackers, and deadline reminders compensate for time blindness."
        },
        {
          id: "jobs-3",
          icon: "🚀",
          title: "Leverage urgency",
          summary: "Deadlines and pressure can be your productivity fuel.",
          detail: "Don't fight your need for urgency — build it into your workflow. Set artificial deadlines, work in sprints, or schedule public accountability."
        }
      ]
    },
    {
      id: "environment",
      title: "Environment & Accessibility",
      icon: "🏠",
      cards: [
        {
          id: "env-1",
          icon: "🧹",
          title: "Reduce decision fatigue",
          summary: "Simplify choices: capsule wardrobe, meal prep, default routines.",
          detail: "Keep essentials visible (keys, wallet, phone go in one spot). Use clear bins, labelled storage, and visual reminders to reduce memory load."
        },
        {
          id: "env-2",
          icon: "📱",
          title: "Externalize your brain",
          summary: "Use apps, alarms, and lists to remember everything.",
          detail: "Calendar notifications, habit trackers, and voice memos offload working memory. Set location-based reminders (e.g., 'buy milk when near grocery store')."
        },
        {
          id: "env-3",
          icon: "🎧",
          title: "Manage stimulation",
          summary: "Fidget tools, background noise, or music help you focus.",
          detail: "Brown noise, lo-fi beats, or silence — experiment with what works. Fidget jewelry, stress balls, or standing desks give you movement while working."
        }
      ]
    },
    {
      id: "healthcare",
      title: "Healthcare & Support",
      icon: "🩺",
      cards: [
        {
          id: "health-1",
          icon: "💊",
          title: "Medication is a tool, not a failure",
          summary: "ADHD meds help many people function without constant struggle.",
          detail: "Stimulants, non-stimulants, or therapy — find what works for you. Medication doesn't change who you are; it clears the fog so you can show up as yourself."
        },
        {
          id: "health-2",
          icon: "🧠",
          title: "Therapy helps with strategies",
          summary: "CBT, DBT, or ADHD coaching teach you practical systems.",
          detail: "Find a therapist who understands ADHD (not someone who'll just tell you to 'try harder'). Peer support groups validate your experiences."
        },
        {
          id: "health-3",
          icon: "📊",
          title: "Track your patterns",
          summary: "Notice when you're productive, what derails you, and what helps.",
          detail: "Log energy levels, focus times, and emotional triggers. Self-awareness helps you design days that work with your brain, not against it."
        }
      ]
    },
    {
      id: "relationships",
      title: "Relationships & Community",
      icon: "👥",
      cards: [
        {
          id: "rel-1",
          icon: "💬",
          title: "Communicate your needs",
          summary: "Tell people how your brain works so they understand you better.",
          detail: "Explain time blindness, rejection sensitivity, or why you interrupt. Most people want to support you — they just need to know how."
        },
        {
          id: "rel-2",
          icon: "📝",
          title: "Use reminders for people you love",
          summary: "Set calendar reminders to check in, send messages, or plan hangouts.",
          detail: "Forgetting doesn't mean you don't care. Systems help you show up consistently for the people who matter."
        },
        {
          id: "rel-3",
          icon: "🎉",
          title: "Find your people",
          summary: "Seek communities that value spontaneity, depth, and realness.",
          detail: "ADHD-friendly spaces where tangents are welcome, last-minute plans are okay, and your energy is celebrated, not criticized."
        }
      ]
    }
  ],

  // Did You Know carousel facts
  didYouKnowFacts: [
    "ADHD brains have lower dopamine levels, which is why you seek stimulation and novelty constantly.",
    "Many entrepreneurs, artists, and innovators have ADHD — your brain is wired for creative risk-taking.",
    "Time blindness is a real symptom: your brain struggles to estimate and track time passing."
  ],

  // Superpowers carousel
  superpowersFacts: [
    "Your ability to hyperfocus creates bursts of incredible productivity.",
    "Your creativity and adaptability make you excellent in fast-paced, dynamic environments.",
    "Your enthusiasm and passion inspire others and drive projects forward.",
    "Your intuition helps you read people and situations with surprising accuracy."
  ]
};
