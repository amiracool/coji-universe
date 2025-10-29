export type Trait = {
  id: string;
  title: string;
  summary: string;
  tools?: string[];
  links?: { label: string; href: string }[];
  icon?: string;
};

export type Category = {
  id: string;
  title: string;
  subtitle?: string;
  didYouKnow?: string[];
  traits: Trait[];
};

// Top-level "Did You Know" facts for carousel
export const parentingDidYouKnow = [
  "Therapeutic parenting focuses on connection before correction",
  "Children's challenging behaviour is often communication of an unmet need",
  "Co-regulation helps children develop their own self-regulation skills",
  "Play is a child's primary language for processing emotions and experiences",
  "Consistent routines provide safety and predictability for developing brains"
];

export const parentingCategories: Category[] = [
  {
    id: "emotional-regulation",
    title: "Emotional Regulation",
    subtitle: "Supporting big feelings & meltdowns",
    didYouKnow: [
      "A child's brain can't process logic during a meltdown",
      "Co-regulation must come before self-regulation",
      "Naming emotions helps children process them"
    ],
    traits: [
      {
        id: "meltdowns",
        title: "Managing meltdowns",
        summary: "When emotions overflow, safety and connection come first.",
        tools: [
          "Stay calm and provide a quiet space",
          "Use minimal words during the peak",
          "Offer physical comfort if wanted",
          "Talk through it once calm returns",
          "Create a 'calm down kit' together"
        ],
        icon: "🌊"
      },
      {
        id: "big-feelings",
        title: "Big feelings",
        summary: "Intense emotions need validation before problem-solving.",
        tools: [
          "Name the emotion: 'You seem really frustrated'",
          "Validate: 'It's okay to feel upset'",
          "Wait for calm before discussing solutions",
          "Model your own emotion regulation",
          "Use emotion charts or zones of regulation"
        ],
        icon: "💥"
      },
      {
        id: "emotional-literacy",
        title: "Building emotional vocabulary",
        summary: "Helping children identify and express their feelings.",
        tools: [
          "Read books about emotions together",
          "Label your own feelings aloud",
          "Use feelings charts with faces",
          "Play emotion charades",
          "Create a feelings wheel for reference"
        ],
        icon: "📚"
      }
    ]
  },
  {
    id: "behaviour-management",
    title: "Behaviour Management",
    subtitle: "Understanding what's behind the behaviour",
    didYouKnow: [
      "All behaviour is communication",
      "Punishments don't teach new skills",
      "Connection strengthens cooperation"
    ],
    traits: [
      {
        id: "challenging-behaviour",
        title: "Challenging behaviour",
        summary: "Look for the unmet need beneath the behaviour.",
        tools: [
          "Ask: Is my child hungry, tired, overstimulated?",
          "Use ABC tracking (Antecedent, Behaviour, Consequence)",
          "Focus on teaching replacement behaviours",
          "Stay curious, not furious",
          "Repair after conflict with connection"
        ],
        icon: "🔍"
      },
      {
        id: "boundaries",
        title: "Setting boundaries",
        summary: "Firm limits with warmth build safety and respect.",
        tools: [
          "Be clear and consistent with rules",
          "Explain the 'why' behind limits",
          "Offer choices within boundaries",
          "Follow through calmly",
          "Revisit rules as children grow"
        ],
        icon: "🛡️"
      },
      {
        id: "positive-reinforcement",
        title: "Positive reinforcement",
        summary: "Catch them being good to encourage desired behaviours.",
        tools: [
          "Notice and name specific behaviours",
          "Use descriptive praise, not just 'good job'",
          "Create reward charts for younger children",
          "Celebrate effort, not just outcomes",
          "Use natural consequences when appropriate"
        ],
        icon: "⭐"
      }
    ]
  },
  {
    id: "communication",
    title: "Communication Strategies",
    subtitle: "Connecting through clear & respectful language",
    didYouKnow: [
      "Children respond better to 'do' than 'don't'",
      "Getting down to eye level increases connection",
      "Listening is more powerful than lecturing"
    ],
    traits: [
      {
        id: "active-listening",
        title: "Active listening",
        summary: "Show your child they're heard and understood.",
        tools: [
          "Make eye contact at their level",
          "Reflect back what you hear",
          "Avoid interrupting or fixing immediately",
          "Ask open-ended questions",
          "Validate feelings before problem-solving"
        ],
        icon: "👂"
      },
      {
        id: "clear-instructions",
        title: "Giving clear instructions",
        summary: "Simple, specific directions work best for young brains.",
        tools: [
          "Use short, concrete sentences",
          "Give one instruction at a time",
          "Make requests, not questions ('Time to...' not 'Can you...')",
          "Use visual supports or timers",
          "Check for understanding"
        ],
        icon: "📋"
      },
      {
        id: "collaborative-problem-solving",
        title: "Collaborative problem-solving",
        summary: "Involve children in finding solutions to build skills.",
        tools: [
          "Start with curiosity: 'I noticed... what's up?'",
          "Brainstorm solutions together",
          "Let them choose the approach",
          "Try it and review together",
          "Celebrate the process, not perfection"
        ],
        icon: "🤝"
      }
    ]
  },
  {
    id: "school-support",
    title: "School Support",
    subtitle: "Advocating & supporting learning needs",
    didYouKnow: [
      "You are the expert on your child",
      "Schools must provide reasonable adjustments",
      "Keep written records of all communications"
    ],
    traits: [
      {
        id: "advocacy",
        title: "Advocating at school",
        summary: "Being your child's voice in educational settings.",
        tools: [
          "Request meetings in writing",
          "Bring evidence and examples",
          "Know your child's rights (SEND Code of Practice)",
          "Build relationships with teachers",
          "Follow up in writing after meetings"
        ],
        icon: "📢"
      },
      {
        id: "homework-battles",
        title: "Homework struggles",
        summary: "Making homework time less stressful for everyone.",
        tools: [
          "Create a consistent homework routine",
          "Break tasks into smaller chunks",
          "Use timers and movement breaks",
          "Advocate for reasonable adjustments",
          "Communicate with teachers about struggles"
        ],
        icon: "📝"
      },
      {
        id: "transitions",
        title: "School transitions",
        summary: "Supporting changes in school settings or routines.",
        tools: [
          "Visit new settings in advance",
          "Create visual schedules",
          "Read social stories about the change",
          "Identify a safe person at school",
          "Allow extra processing time at home"
        ],
        icon: "🏫"
      }
    ]
  },
  {
    id: "routines-structure",
    title: "Routines & Structure",
    subtitle: "Creating predictability & reducing stress",
    didYouKnow: [
      "Routines reduce decision fatigue for everyone",
      "Visual schedules help children anticipate what's next",
      "Flexibility within structure builds resilience"
    ],
    traits: [
      {
        id: "morning-routine",
        title: "Morning routines",
        summary: "Start the day calmly with consistent structures.",
        tools: [
          "Create visual morning checklists",
          "Prepare the night before",
          "Build in buffer time",
          "Use timers for time-blind children",
          "Celebrate successful mornings"
        ],
        icon: "🌅"
      },
      {
        id: "bedtime-routine",
        title: "Bedtime struggles",
        summary: "Calm, consistent bedtime routines support sleep.",
        tools: [
          "Start wind-down 30-60 minutes early",
          "Create a calming sensory environment",
          "Use visual bedtime schedules",
          "Avoid screens 1 hour before bed",
          "Stay consistent even on weekends"
        ],
        icon: "🌙"
      },
      {
        id: "transitions-home",
        title: "Managing transitions",
        summary: "Prepare children for changes to reduce resistance.",
        tools: [
          "Give advance warnings (5-minute countdowns)",
          "Use visual timers",
          "Offer transition objects",
          "Create transition songs or rituals",
          "Validate difficulty with change"
        ],
        icon: "⏰"
      }
    ]
  },
  {
    id: "sensory-needs",
    title: "Sensory Needs",
    subtitle: "Understanding & supporting sensory differences",
    didYouKnow: [
      "Sensory processing differences affect behaviour",
      "Children can be sensory-seeking or sensory-avoiding",
      "Sensory diets can improve regulation throughout the day"
    ],
    traits: [
      {
        id: "sensory-overload",
        title: "Sensory overload",
        summary: "Too much sensory input can trigger overwhelm.",
        tools: [
          "Create a calm-down space at home",
          "Use noise-cancelling headphones",
          "Dim lights or use sunglasses",
          "Reduce background noise",
          "Plan sensory breaks during outings"
        ],
        icon: "🎧"
      },
      {
        id: "sensory-seeking",
        title: "Sensory-seeking behaviour",
        summary: "Some children need more sensory input to feel regulated.",
        tools: [
          "Provide heavy work activities (pushing, pulling, carrying)",
          "Use chewy jewelry or gum",
          "Create a sensory bin",
          "Offer fidgets during focus time",
          "Schedule active play breaks"
        ],
        icon: "🏃"
      },
      {
        id: "food-selectivity",
        title: "Food selectivity",
        summary: "Sensory sensitivities often impact eating habits.",
        tools: [
          "Avoid pressure or forcing food",
          "Offer new foods alongside safe foods",
          "Involve children in meal preparation",
          "Focus on food exploration, not eating",
          "Consult OT if nutrition is impacted"
        ],
        icon: "🍽️"
      }
    ]
  },
  {
    id: "self-care",
    title: "Parental Self-Care",
    subtitle: "You can't pour from an empty cup",
    didYouKnow: [
      "Parental burnout is real and valid",
      "Taking breaks makes you a better parent",
      "Self-compassion improves parenting outcomes"
    ],
    traits: [
      {
        id: "burnout",
        title: "Recognizing burnout",
        summary: "Chronic stress impacts your ability to parent with compassion.",
        tools: [
          "Notice signs: irritability, exhaustion, detachment",
          "Ask for help without guilt",
          "Schedule regular breaks, even small ones",
          "Connect with other parents who understand",
          "Consider therapy or support groups"
        ],
        icon: "🔥"
      },
      {
        id: "guilt",
        title: "Parental guilt",
        summary: "Letting go of perfectionism and embracing 'good enough'.",
        tools: [
          "Challenge the 'perfect parent' narrative",
          "Focus on repair after mistakes",
          "Practice self-compassion statements",
          "Celebrate small wins",
          "Remember: you're doing your best"
        ],
        icon: "💚"
      },
      {
        id: "support-network",
        title: "Building support",
        summary: "Parenting wasn't meant to be done alone.",
        tools: [
          "Join local or online parent groups",
          "Identify trusted respite caregivers",
          "Ask family/friends for specific help",
          "Access community resources",
          "Connect with parents of similar children"
        ],
        icon: "🤗"
      }
    ]
  },
  {
    id: "neurodivergent-parenting",
    title: "Neurodivergent-Affirming Parenting",
    subtitle: "Celebrating differences & supporting strengths",
    didYouKnow: [
      "Neurodivergent children need acceptance, not fixing",
      "Masking harms mental health in the long term",
      "Strengths-based approaches build resilience and self-esteem"
    ],
    traits: [
      {
        id: "acceptance",
        title: "Neurodivergent acceptance",
        summary: "Embracing your child's neurotype, not just managing it.",
        tools: [
          "Learn from neurodivergent adults",
          "Use identity-first language if your child prefers",
          "Challenge ableist narratives",
          "Celebrate neurodivergent strengths",
          "Avoid forcing neurotypical masks"
        ],
        icon: "🌈"
      },
      {
        id: "accommodations",
        title: "Home accommodations",
        summary: "Adapting your environment to meet your child's needs.",
        tools: [
          "Create sensory-friendly spaces",
          "Use visual supports everywhere",
          "Allow stimming without shame",
          "Respect need for alone time",
          "Adjust expectations to fit capacity"
        ],
        icon: "🏠"
      },
      {
        id: "identity",
        title: "Supporting identity",
        summary: "Helping neurodivergent children build positive self-concept.",
        tools: [
          "Talk openly about neurodivergence",
          "Introduce them to neurodivergent role models",
          "Validate their experiences",
          "Teach self-advocacy skills",
          "Celebrate what makes them unique"
        ],
        icon: "✨"
      }
    ]
  }
];
