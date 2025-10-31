/**
 * Autism Planet - Mobile-First Content
 * Designed for calm, validating experience with low cognitive load
 */

export const autismPlanetMobile = {
  // Header
  name: "Autism Planet",
  tagline: "Understanding how autistic minds experience the world — deeply, vividly, and differently.",
  icon: "🧩",

  // Understanding It (visual, emotional, validating)
  understandingIt: {
    sections: [
      {
        icon: "🧠",
        visual: "✨",
        title: "You process deeply",
        text: "You don't process the world \"wrong.\"\nYou just process it deeply.",
        color: "#A78BFA"
      },
      {
        icon: "🔍",
        visual: "🌐",
        title: "You see patterns",
        text: "Your mind catches patterns that others miss —\nconnections between things most people walk past.",
        color: "#60A5FA"
      },
      {
        icon: "💫",
        visual: "🎨",
        title: "You feel in full colour",
        text: "Joy hits brighter,\nbut overwhelm does too.",
        color: "#F472B6"
      },
      {
        icon: "💬",
        visual: "✨",
        title: "You value authenticity",
        text: "Small talk might drain you;\ntruth feels lighter.",
        color: "#34D399"
      },
      {
        icon: "🎵",
        visual: "🌊",
        title: "Routines are rhythm",
        text: "They're not rigidness — they're rhythm.\nThey help you move through a world built for different wiring.",
        color: "#FBBF24"
      },
      {
        icon: "✨",
        visual: "💝",
        title: "You're not broken",
        text: "You're wired differently.\nAnd that's not something to fix.",
        color: "#14B8A6"
      }
    ]
  },

  // How It Shows Up (clear, literal, visual breaks)
  howItShowsUp: [
    {
      id: "sensory",
      title: "Senses",
      icon: "👂",
      accentColor: "#FFD88A",
      preview: [
        "Sounds are louder than they should be.",
        "Certain textures feel uncomfortable on your skin.",
        "Bright lights can hurt your eyes."
      ],
      expanded: [
        "You might need headphones in noisy places.",
        "Tags in shirts or tight clothes can be painful.",
        "Fluorescent lights give you headaches.",
        "Strong smells bother you more than others."
      ]
    },
    {
      id: "social",
      title: "Talking & Listening",
      icon: "💬",
      accentColor: "#FFD88A",
      preview: [
        "You prefer clear, direct communication.",
        "Sarcasm and hints are confusing.",
        "Eye contact feels uncomfortable."
      ],
      expanded: [
        "Small talk is exhausting.",
        "You take what people say literally.",
        "Pretending to be 'normal' drains your energy.",
        "You show care in your own way."
      ]
    },
    {
      id: "cognition",
      title: "Thinking & Focus",
      icon: "🧠",
      accentColor: "#FFD88A",
      preview: [
        "You can focus deeply on topics you love.",
        "Starting new tasks is difficult.",
        "Making decisions takes extra time."
      ],
      expanded: [
        "You lose track of time when doing something interesting.",
        "Planning steps and organizing is hard.",
        "You notice patterns others miss.",
        "Switching between tasks is exhausting."
      ]
    },
    {
      id: "emotion",
      title: "Feelings",
      icon: "❤️",
      accentColor: "#FFD88A",
      preview: [
        "Emotions feel very strong.",
        "Unfairness and sudden changes are upsetting.",
        "Sometimes you shut down or have meltdowns."
      ],
      expanded: [
        "Naming how you feel is hard.",
        "Shutdowns: you go quiet and withdraw.",
        "Meltdowns: crying, anger, or feeling overwhelmed.",
        "These happen when you're at your limit."
      ]
    },
    {
      id: "physical",
      title: "Body & Health",
      icon: "💪",
      accentColor: "#FFD88A",
      preview: [
        "You might have pain, tiredness, or stomach issues.",
        "You don't always notice hunger or thirst.",
        "Routines and repetitive movements help you feel calm."
      ],
      expanded: [
        "Your body sends delayed signals.",
        "You might forget to eat or drink.",
        "Rocking, fidgeting, or pacing helps you regulate.",
        "Sleep problems are common."
      ]
    }
  ],

  // Strengths & Sensitivities (interactive tiles)
  strengthsAndSensitivities: [
    {
      id: "pattern",
      title: "Pattern Recognition",
      shortDesc: "You spot connections and systems others overlook.",
      fullDesc: "Your brain naturally identifies patterns in data, music, language, or behaviour. This makes you excellent at analysis, coding, research, and creative problem-solving."
    },
    {
      id: "authenticity",
      title: "Authenticity",
      shortDesc: "You value honesty and struggle with pretense.",
      fullDesc: "You're direct and genuine, often speaking truth when others stay silent. This integrity is a strength, even when others mistake it for bluntness."
    },
    {
      id: "depth",
      title: "Depth Over Breadth",
      shortDesc: "You dive deep into what fascinates you.",
      fullDesc: "Your special interests aren't hobbies — they're passions. You develop expertise, mastery, and genuine love for your chosen subjects."
    },
    {
      id: "loyalty",
      title: "Loyalty & Consistency",
      shortDesc: "You're reliable and value fairness deeply.",
      fullDesc: "You keep your word, show up for people you care about, and have a strong moral compass. Injustice genuinely bothers you."
    },
    {
      id: "perception",
      title: "Sensory Perception",
      shortDesc: "You notice details most people miss.",
      fullDesc: "Your sensory awareness picks up subtleties in sound, light, texture, and taste. This richness can be overwhelming but also beautiful."
    },
    {
      id: "creativity",
      title: "Creative Thinking",
      shortDesc: "You approach problems from unexpected angles.",
      fullDesc: "Your different wiring leads to innovative solutions, unique perspectives, and original ideas. Conformity isn't your default."
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
          icon: "🎯",
          title: "Choose clarity over chaos",
          summary: "Look for roles with clear expectations and predictable routines.",
          detail: "Consider fields that value your strengths: tech, research, creative work, systems design, data analysis, or independent trades. Remote work can reduce sensory overload."
        },
        {
          id: "jobs-2",
          icon: "🛠️",
          title: "Ask for accommodations",
          summary: "Negotiate for noise-cancelling headphones, quiet spaces, or flexible hours.",
          detail: "Request written instructions instead of verbal check-ins. Ask for written project briefs instead of ambiguous verbal directions. Accommodations help you perform at your best."
        },
        {
          id: "jobs-3",
          icon: "🏡",
          title: "Consider self-employment",
          summary: "Freelancing gives you control over environment and schedule.",
          detail: "Self-employment or contract work reduces masking demands and lets you structure your day around your needs, not neurotypical expectations."
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
          icon: "💡",
          title: "Control sensory input",
          summary: "Dim lights, blackout curtains, or tinted glasses manage light sensitivity.",
          detail: "Noise-cancelling headphones or earpluels buffer overwhelming sound. Remove sensory irritants: scratchy fabrics, strong scents, clutter."
        },
        {
          id: "env-2",
          icon: "📅",
          title: "Make routines visible",
          summary: "Use whiteboards, apps, or calendars to externalise schedules.",
          detail: "Visual reminders reduce executive function load. Keep daily routines predictable where possible to conserve energy for unexpected changes."
        },
        {
          id: "env-3",
          icon: "🛌",
          title: "Build in buffer time",
          summary: "Schedule recharge time after social or overstimulating events.",
          detail: "Weighted blankets, compression clothing, or fidget tools support sensory regulation. Sunglasses indoors if fluorescent lights drain your energy."
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
          icon: "📝",
          title: "Bring notes to appointments",
          summary: "Write down symptoms, questions, and what you need beforehand.",
          detail: "Ask for written summaries of appointments. Use phrases like 'I process information better in writing' or 'I need predictability to function well.'"
        },
        {
          id: "health-2",
          icon: "🔇",
          title: "Request sensory accommodations",
          summary: "Ask for dim lights, quieter waiting areas, or first/last appointments.",
          detail: "Find providers who understand autistic presentation. Avoid crowded waiting rooms by requesting specific appointment times."
        },
        {
          id: "health-3",
          icon: "📊",
          title: "Track patterns",
          summary: "Note shutdowns, meltdowns, and sensory triggers.",
          detail: "Connect with autistic-led organisations for peer support. Remember: stimming, avoiding eye contact, and needing routine aren't things to fix — they're regulation tools."
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
          title: "Ask for directness",
          summary: "Tell people you prefer clear communication over hints.",
          detail: "Ask for clarity instead of guessing implied meanings. Script or rehearse tricky conversations beforehand if it helps you feel prepared."
        },
        {
          id: "rel-2",
          icon: "✉️",
          title: "Use text over calls",
          summary: "Text or email when phone calls feel overwhelming.",
          detail: "Let friends know you care even if you don't check in often. Your care shows up differently, and that's valid."
        },
        {
          id: "rel-3",
          icon: "🌐",
          title: "Find your community",
          summary: "Seek neurodivergent-friendly spaces where depth is valued.",
          detail: "Online or in-person communities where honesty and special interests are celebrated, not judged. It's okay to say 'I need time alone' or 'I'm at capacity.'"
        }
      ]
    }
  ],

  // Did You Know carousel facts
  didYouKnowFacts: [
    "Many autistic people excel in fields requiring pattern recognition, like music, mathematics, coding, and research.",
    "Autistic brains often have more synaptic connections, leading to both heightened perception and sensory overwhelm.",
    "Masking (hiding autistic traits) is common but exhausting. Unmasking in safe spaces is an act of self-care.",
    "Special interests aren't obsessions — they're sources of joy, expertise, and genuine passion."
  ],

  // Superpowers carousel
  superpowersFacts: [
    "Your attention to detail catches errors and patterns others miss entirely.",
    "Your honesty and directness build trust, even when others find it surprising.",
    "Your deep focus creates mastery in areas you love.",
    "Your loyalty and consistency make you a reliable, caring presence in others' lives."
  ]
};
