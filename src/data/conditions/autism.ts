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
export const autismDidYouKnow = [
  "Autism is a spectrum — every autistic person experiences it differently",
  "Sensory sensitivities can change day-to-day based on energy and stress levels",
  "Masking (hiding autistic traits) is exhausting and can lead to autistic burnout",
  "Many autistic people have heightened pattern recognition and attention to detail",
  "Special interests aren't obsessions — they're sources of joy and expertise"
];

export const autismCategories: Category[] = [
  {
    id: "communication",
    title: "Communication",
    subtitle: "Understanding & expressing language",
    didYouKnow: [
      "Many autistic people think in pictures rather than words",
      "Literal interpretation isn't a deficit — it's a different processing style",
      "Some autistic people are hyperlexic (reading ability beyond age level)"
    ],
    traits: [
      {
        id: "scripting",
        title: "Scripting conversations",
        summary: "Rehearsed phrases help reduce ambiguity in social exchanges.",
        tools: [
          "Keep 3–5 go-to phrases for small talk",
          "Practice opening lines before events",
          "Use text templates for common replies",
          "Record yourself to refine delivery"
        ],
        icon: "💬"
      },
      {
        id: "figurative",
        title: "Figurative language hard",
        summary: "Metaphors and idioms may need unpacking to understand meaning.",
        tools: [
          "Ask 'What does that mean literally?'",
          "Keep a list of common idioms",
          "Use literal language when possible",
          "Request clarification without shame"
        ],
        icon: "📖"
      },
      {
        id: "tone",
        title: "Tone misreading",
        summary: "Prosody cues like sarcasm or anger are easy to miss or overread.",
        tools: [
          "Ask: 'Do you mean...?' to double-check",
          "Prefer text with emojis for clarity",
          "Use 1–5 tone scale in chats",
          "Repeat back key ask in plain words"
        ],
        links: [{ label: "Tone & prosody guide", href: "/library/tone" }],
        icon: "🗣️"
      },
      {
        id: "eye-contact",
        title: "Eye contact draining",
        summary: "Maintaining eye contact feels uncomfortable or requires intense effort.",
        tools: [
          "Look at eyebrows or nose instead",
          "Brief glances count as engagement",
          "Explain preference upfront if safe",
          "Focus on listening, not looking"
        ],
        icon: "👁️"
      },
      {
        id: "interrupting",
        title: "Turn-taking confusion",
        summary: "Conversation rhythm and knowing when to speak can be unclear.",
        tools: [
          "Count 2 seconds before speaking",
          "Watch for body language pauses",
          "Say 'Can I add something?' first",
          "Prefer structured formats like Q&A"
        ],
        icon: "⏱️"
      }
    ]
  },
  {
    id: "sensory",
    title: "Sensory Processing",
    subtitle: "How you experience sound, touch, light & texture",
    didYouKnow: [
      "Sensory sensitivity can fluctuate based on stress, tiredness, or hormones",
      "Some autistic people are hyposensitive (seek more input) instead of hypersensitive",
      "Sensory overload can cause physical pain, not just discomfort"
    ],
    traits: [
      {
        id: "noise-sensitivity",
        title: "Background noise overwhelm",
        summary: "Filtering out background sounds feels impossible; everything competes.",
        tools: [
          "Loop earplugs or noise-cancelling headphones",
          "Book quiet spaces for work/calls",
          "Use brown noise to mask chaos",
          "Leave busy environments early"
        ],
        icon: "🔇"
      },
      {
        id: "textures",
        title: "Texture aversions",
        summary: "Certain fabrics, foods or surfaces feel intolerable to touch.",
        tools: [
          "Cut tags out of clothing",
          "Choose soft natural fibres only",
          "Keep safe foods list handy",
          "Prep textures separately in meals"
        ],
        icon: "✋"
      },
      {
        id: "lights",
        title: "Light sensitivity",
        summary: "Bright or flickering lights cause discomfort or fatigue.",
        tools: [
          "Wear tinted glasses indoors",
          "Use desk lamps instead of overhead",
          "Request dimmer switches at work",
          "Close blinds during peak sun"
        ],
        icon: "💡"
      },
      {
        id: "smells",
        title: "Smell overload",
        summary: "Strong scents like perfume or cleaning products trigger distress.",
        tools: [
          "Ask for fragrance-free zones",
          "Carry scent you like to reset",
          "Use unscented products only",
          "Leave space if overwhelmed"
        ],
        icon: "👃"
      },
      {
        id: "crowds",
        title: "Crowd overwhelm",
        summary: "Too many people, sounds and movements drain energy fast.",
        tools: [
          "Visit places during off-peak hours",
          "Plan exit routes in advance",
          "Use headphones as a barrier",
          "Take sensory breaks every 30 min"
        ],
        icon: "👥"
      }
    ]
  },
  {
    id: "executive",
    title: "Executive Function",
    subtitle: "Planning, organising & task switching",
    didYouKnow: [
      "Executive dysfunction isn't laziness — it's neurological",
      "Task initiation difficulty often needs external triggers (timers, body doubling)",
      "Visual planning tools work better than text lists for many autistic people"
    ],
    traits: [
      {
        id: "task-switching",
        title: "Task switching difficulty",
        summary: "Changing focus between tasks feels jarring and exhausting.",
        tools: [
          "Use timers to signal transitions",
          "Batch similar tasks together",
          "Build in 5-min buffer between tasks",
          "Finish one thing before starting next"
        ],
        icon: "🔄"
      },
      {
        id: "planning",
        title: "Planning paralysis",
        summary: "Too many steps make starting feel impossible.",
        tools: [
          "Break tasks into 3-step chunks",
          "Use visual flowcharts or lists",
          "Start with easiest step first",
          "Set micro-deadlines for each step"
        ],
        icon: "📋"
      },
      {
        id: "time-blindness",
        title: "Time blindness",
        summary: "Hours vanish; hard to estimate how long tasks take.",
        tools: [
          "Set alarms every 30 minutes",
          "Use visual timers (Time Timer app)",
          "Track actual time spent on tasks",
          "Build in 50% buffer for estimates"
        ],
        icon: "⏰"
      },
      {
        id: "decision-fatigue",
        title: "Decision fatigue",
        summary: "Too many choices lead to shutdown or avoidance.",
        tools: [
          "Limit options to 2–3 max",
          "Use same outfit/meal rotation",
          "Decide in advance when possible",
          "Delegate decisions when tired"
        ],
        icon: "🤔"
      },
      {
        id: "working-memory",
        title: "Working memory gaps",
        summary: "Forgetting mid-task what you were doing or why.",
        tools: [
          "Write down every step as you go",
          "Use sticky notes for active tasks",
          "Voice memo your thoughts",
          "Keep workspace clutter-free"
        ],
        icon: "🧠"
      }
    ]
  },
  {
    id: "social",
    title: "Social Navigation",
    subtitle: "Unwritten rules & group dynamics",
    didYouKnow: [
      "Autistic social skills aren't missing — they're different from neurotypical norms",
      "Many autistic people prefer deep, focused conversations over small talk",
      "Masking takes enormous energy and can lead to autistic burnout"
    ],
    traits: [
      {
        id: "small-talk",
        title: "Small talk exhausting",
        summary: "Surface-level chat feels pointless and draining.",
        tools: [
          "Redirect to shared interests fast",
          "Have 2–3 stock questions ready",
          "Time-box social chat to 5 min",
          "Prefer deeper 1-on-1 conversations"
        ],
        icon: "☕"
      },
      {
        id: "group-dynamics",
        title: "Group dynamics confusing",
        summary: "Who's in charge, who's joking, what's expected—all unclear.",
        tools: [
          "Ask a trusted person to decode",
          "Observe quietly before engaging",
          "Stick to 1-on-1 when possible",
          "Write down group norms you notice"
        ],
        icon: "👫"
      },
      {
        id: "masking",
        title: "Masking exhaustion",
        summary: "Hiding autistic traits to fit in drains energy completely.",
        tools: [
          "Schedule recovery time after social events",
          "Be open about needs with safe people",
          "Reduce masking in low-stakes spaces",
          "Track energy cost of different settings"
        ],
        icon: "🎭"
      },
      {
        id: "reading-signals",
        title: "Reading social signals",
        summary: "Body language, hints and subtle cues often get missed.",
        tools: [
          "Ask direct questions instead of guessing",
          "Request explicit feedback",
          "Use emoji reactions in text",
          "Clarify: 'Are you upset or just tired?'"
        ],
        icon: "🔍"
      },
      {
        id: "rejection-sensitivity",
        title: "Rejection sensitivity",
        summary: "Perceived rejection or criticism feels intensely painful.",
        tools: [
          "Check facts before assuming intent",
          "Write down evidence for/against",
          "Talk to someone you trust",
          "Remember: not all 'no' is rejection"
        ],
        icon: "💔"
      }
    ]
  },
  {
    id: "routine",
    title: "Routine & Change",
    subtitle: "Predictability & managing transitions",
    didYouKnow: [
      "Routines aren't rigidity — they're a strategy to reduce cognitive load",
      "Unexpected changes can trigger fight/flight/freeze responses",
      "Special interests often provide comfort and regulation"
    ],
    traits: [
      {
        id: "routine-dependency",
        title: "Routine dependency",
        summary: "Same order, same time, same way—changes feel destabilising.",
        tools: [
          "Build flexibility into routine slowly",
          "Keep core anchors consistent",
          "Plan changes in advance when possible",
          "Use visual schedules to preview day"
        ],
        icon: "📅"
      },
      {
        id: "unexpected-changes",
        title: "Unexpected changes",
        summary: "Surprise plan shifts trigger anxiety or shutdowns.",
        tools: [
          "Request advance notice for changes",
          "Keep backup plans ready",
          "Allow time to process adjustments",
          "Name the emotion: 'I need time to adapt'"
        ],
        icon: "⚠️"
      },
      {
        id: "transitions",
        title: "Transition difficulty",
        summary: "Moving between activities or locations feels abrupt and hard.",
        tools: [
          "Use 5-minute warnings before switching",
          "Create transition rituals (music, stretch)",
          "Carry comfort item when moving spaces",
          "Build in extra time between events"
        ],
        icon: "🚪"
      },
      {
        id: "sameness-comfort",
        title: "Sameness as comfort",
        summary: "Repeating media, routes or routines brings regulation.",
        tools: [
          "Embrace safe repetition without shame",
          "Explain to others it's self-care",
          "Balance sameness with small novelty",
          "Track what soothes vs drains you"
        ],
        icon: "🔁"
      },
      {
        id: "hyperfocus-interruption",
        title: "Hyperfocus interruption",
        summary: "Being pulled away from deep focus feels jarring.",
        tools: [
          "Set boundaries around focus time",
          "Use 'Do Not Disturb' mode",
          "Finish thought before responding",
          "Communicate need for uninterrupted blocks"
        ],
        icon: "🎯"
      }
    ]
  }
] as const;
