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
export const adhdDidYouKnow = [
  "ADHD brains have lower dopamine levels, making motivation and focus harder to regulate naturally",
  "Time blindness isn't laziness — ADHD affects your brain's ability to perceive and estimate time",
  "Hyperfocus is real! ADHD brains can become completely absorbed in activities they find stimulating",
  "Working memory challenges mean you might forget things seconds after thinking them",
  "Interest-based nervous system: ADHD brains are motivated by interest, challenge, novelty, and urgency"
];

export const adhdCategories: Category[] = [
  {
    id: "focus-attention",
    title: "Focus & Attention",
    subtitle: "Managing concentration and distractibility",
    didYouKnow: [
      "ADHD isn't a deficit of attention — it's difficulty regulating where attention goes",
      "Background noise can sometimes help ADHD brains focus by occupying the 'distraction center'",
      "The two-minute rule: if it takes less than 2 minutes, do it now before you forget"
    ],
    traits: [
      {
        id: "easy-distraction",
        title: "Easy distraction",
        summary: "External stimuli constantly pull your attention away from tasks.",
        tools: [
          "Use noise-cancelling headphones or brown noise",
          "Work in 15-25 minute Pomodoro sprints",
          "Remove visual clutter from your workspace",
          "Put phone in another room or use app blockers"
        ],
        icon: "🎯"
      },
      {
        id: "hyperfocus",
        title: "Hyperfocus episodes",
        summary: "Getting so absorbed you forget to eat, drink, or notice time passing.",
        tools: [
          "Set hourly body-check alarms (water, food, bathroom)",
          "Use time-timer visual clocks",
          "Schedule hyperfocus for low-stakes tasks",
          "Have snacks and water at your desk"
        ],
        icon: "🔥"
      },
      {
        id: "starting-tasks",
        title: "Can't start tasks",
        summary: "Knowing what to do but unable to begin, even simple things.",
        tools: [
          "Use the 5-minute rule: commit to just 5 minutes",
          "Body double: work alongside someone else",
          "Make it a game or add music",
          "Break into the smallest possible first step"
        ],
        icon: "🚀"
      },
      {
        id: "finishing-tasks",
        title: "Trouble finishing",
        summary: "Starting strong but losing steam before completion.",
        tools: [
          "Do the last 10% first while motivated",
          "Set a 'finishing time' before starting",
          "Reward yourself after completion",
          "Use external accountability (tell someone)"
        ],
        icon: "🏁"
      },
      {
        id: "task-switching",
        title: "Task-switching struggles",
        summary: "Difficulty transitioning between activities or contexts.",
        tools: [
          "Use transition warnings: 10-min, 5-min, 1-min",
          "Physical movement between tasks (walk, stretch)",
          "Have a transition ritual (song, tea, etc.)",
          "Leave breadcrumbs for where you left off"
        ],
        icon: "🔄"
      }
    ]
  },
  {
    id: "time-planning",
    title: "Time & Planning",
    subtitle: "Executive function and organization",
    didYouKnow: [
      "Time blindness means 'now' and 'not now' — past and future feel equally distant",
      "Planning paralysis happens when too many options overwhelm your decision-making",
      "External structure (alarms, calendars, routines) replaces internal time sense"
    ],
    traits: [
      {
        id: "time-blindness",
        title: "Time blindness",
        summary: "No internal sense of how much time has passed or remains.",
        tools: [
          "Use visual timers (Time Timer app)",
          "Set alarms for transitions, not just deadlines",
          "Add buffer time (1.5x your estimate)",
          "Track how long tasks actually take"
        ],
        icon: "⏰"
      },
      {
        id: "chronic-lateness",
        title: "Always running late",
        summary: "Underestimating time needed and forgetting preparation steps.",
        tools: [
          "Set 'leave-by' alarms, not 'event' alarms",
          "Prep everything the night before",
          "Aim to arrive 15 minutes 'early'",
          "Use backwards planning from arrival time"
        ],
        icon: "⏱️"
      },
      {
        id: "planning-paralysis",
        title: "Planning paralysis",
        summary: "Overwhelmed by options, can't choose where to start.",
        tools: [
          "Flip a coin to break the tie",
          "Use '2-minute brain dump' then pick one",
          "Follow someone else's system/template",
          "Start with whatever's most urgent"
        ],
        icon: "🧩"
      },
      {
        id: "deadline-panic",
        title: "Deadline-driven only",
        summary: "Can only work when urgency creates pressure.",
        tools: [
          "Create artificial deadlines with accountability",
          "Use body doubling for motivation",
          "Schedule 'fake' deadlines 2 days early",
          "Break into mini-deadlines (daily goals)"
        ],
        icon: "⚡"
      },
      {
        id: "forgetting-appointments",
        title: "Forgetting appointments",
        summary: "Missing meetings, plans, or commitments you intended to keep.",
        tools: [
          "Use calendar apps with multiple reminders",
          "Set day-before, morning-of, and 1-hour warnings",
          "Write everything in one place immediately",
          "Use location-based reminders (phone)"
        ],
        icon: "📅"
      }
    ]
  },
  {
    id: "emotional-regulation",
    title: "Emotional Regulation",
    subtitle: "Managing feelings and reactions",
    didYouKnow: [
      "Rejection sensitivity dysphoria (RSD) causes extreme emotional pain from perceived rejection",
      "Emotional impulsivity isn't a character flaw — it's delayed development of emotional brakes",
      "ADHD emotions are often more intense but also pass more quickly"
    ],
    traits: [
      {
        id: "emotional-overwhelm",
        title: "Emotional overwhelm",
        summary: "Feelings hit hard and fast, difficult to regulate intensity.",
        tools: [
          "Name the emotion out loud to reduce intensity",
          "Use ice or cold water for instant reset",
          "Take a 'feelings walk' to process",
          "Practice 4-7-8 breathing (4 in, 7 hold, 8 out)"
        ],
        icon: "🌊"
      },
      {
        id: "rejection-sensitivity",
        title: "Rejection sensitivity (RSD)",
        summary: "Extreme emotional pain from perceived criticism or rejection.",
        tools: [
          "Remind yourself: 'This is my ADHD talking'",
          "Wait 24 hours before reacting",
          "Ask for clarification before assuming",
          "Practice self-compassion scripts"
        ],
        icon: "💔"
      },
      {
        id: "impulsive-reactions",
        title: "Impulsive reactions",
        summary: "Saying or doing things without thinking, then regretting.",
        tools: [
          "Use the STOP method: Stop, Take a breath, Observe, Proceed",
          "Practice 'say it in your head first' rule",
          "Walk away before responding to big emotions",
          "Set a 10-minute 'cooling off' timer"
        ],
        icon: "💥"
      },
      {
        id: "mood-swings",
        title: "Rapid mood changes",
        summary: "Emotions shift quickly in response to external triggers.",
        tools: [
          "Track mood patterns to spot triggers",
          "Keep a 'mood first aid kit' (comfort items)",
          "Communicate: 'I need a minute to regulate'",
          "Use grounding techniques (5-4-3-2-1 senses)"
        ],
        icon: "🎭"
      }
    ]
  },
  {
    id: "working-memory",
    title: "Working Memory",
    subtitle: "Holding and using information",
    didYouKnow: [
      "ADHD working memory is like a whiteboard that erases itself every few seconds",
      "You can forget something between thinking it and writing it down",
      "Visual reminders work better than mental notes for ADHD brains"
    ],
    traits: [
      {
        id: "forgetting-thoughts",
        title: "Forgetting mid-thought",
        summary: "Losing your train of thought mid-sentence or task.",
        tools: [
          "Speak thoughts out loud immediately",
          "Keep a capture tool open (notes app, voice memo)",
          "Use 'parking lot' lists for later",
          "Pause and backtrack: 'What was I just thinking?'"
        ],
        icon: "💭"
      },
      {
        id: "losing-items",
        title: "Constantly losing items",
        summary: "Keys, phone, wallet disappear because you don't remember placing them.",
        tools: [
          "Assign permanent homes for essentials",
          "Use Tile/AirTag trackers",
          "Say out loud: 'I'm putting my keys on the hook'",
          "Take a photo of where you parked/placed items"
        ],
        icon: "🔑"
      },
      {
        id: "following-instructions",
        title: "Trouble following multi-step directions",
        summary: "Losing steps in verbal instructions or recipes.",
        tools: [
          "Ask for written instructions",
          "Repeat back what you heard",
          "Break into one step at a time",
          "Use checklists you can cross off"
        ],
        icon: "📝"
      },
      {
        id: "remembering-to-remember",
        title: "Forgetting to check reminders",
        summary: "Setting reminders but then not noticing or acting on them.",
        tools: [
          "Use multiple reminder types (sound, vibrate, visual)",
          "Put items in your path (shoes by door)",
          "Set reminders 10 minutes before the actual time",
          "Use location-based alerts (phone)"
        ],
        icon: "🔔"
      }
    ]
  },
  {
    id: "body-energy",
    title: "Body & Energy",
    subtitle: "Physical restlessness and regulation",
    didYouKnow: [
      "Fidgeting isn't distraction — it actually helps ADHD brains focus",
      "Exercise is one of the most effective ADHD treatments (boosts dopamine)",
      "Many ADHD people have delayed sleep phase (natural night owls)"
    ],
    traits: [
      {
        id: "physical-restlessness",
        title: "Physical restlessness",
        summary: "Need to move, fidget, or pace to feel comfortable.",
        tools: [
          "Use fidget tools (spinner, putty, cube)",
          "Take movement breaks every 30 minutes",
          "Try standing desk or wobble cushion",
          "Walk while thinking or on phone calls"
        ],
        icon: "🏃"
      },
      {
        id: "sleep-struggles",
        title: "Sleep difficulties",
        summary: "Trouble falling asleep, staying asleep, or waking up.",
        tools: [
          "Set a 'wind-down' alarm 1 hour before bed",
          "Use white noise or sleep sounds",
          "Keep the same wake time (even weekends)",
          "Avoid screens 30 minutes before bed"
        ],
        icon: "😴"
      },
      {
        id: "sensory-seeking",
        title: "Sensory seeking",
        summary: "Craving intense sensations, textures, sounds, or movement.",
        tools: [
          "Keep sensory tools accessible (squishy ball, gum)",
          "Use intense flavors (mints, sour candy)",
          "Listen to loud or rhythmic music",
          "Try weighted blanket or compression clothing"
        ],
        icon: "🎵"
      },
      {
        id: "eating-irregularly",
        title: "Irregular eating",
        summary: "Forgetting meals or only eating when hyper-focused on food.",
        tools: [
          "Set 'meal time' alarms",
          "Keep grab-and-go snacks visible",
          "Use meal-prep or routine meals",
          "Pair eating with another routine (podcast time)"
        ],
        icon: "🍎"
      }
    ]
  },
  {
    id: "social-communication",
    title: "Social & Communication",
    subtitle: "Interaction and relationship patterns",
    didYouKnow: [
      "Interrupting isn't rude — ADHD makes it hard to hold thoughts until someone finishes",
      "Over-sharing happens because ADHD struggles with filtering and inhibition",
      "Many ADHD people are highly empathetic but struggle with showing it consistently"
    ],
    traits: [
      {
        id: "interrupting",
        title: "Interrupting others",
        summary: "Jumping in mid-sentence because thoughts feel urgent.",
        tools: [
          "Jot down your thought to hold it",
          "Use a hand signal: 'I have something'",
          "Practice counting to 3 before speaking",
          "Explain: 'I'm working on waiting my turn'"
        ],
        icon: "💬"
      },
      {
        id: "oversharing",
        title: "Over-sharing or TMI",
        summary: "Sharing too much personal info without a filter.",
        tools: [
          "Pause and ask: 'Is this mine to share?'",
          "Use the 'stoplight' method (red/yellow/green topics)",
          "Save deeper shares for close friends",
          "Practice brief responses first"
        ],
        icon: "📣"
      },
      {
        id: "zoning-out",
        title: "Zoning out in conversation",
        summary: "Mind wanders while someone is talking, missing what they said.",
        tools: [
          "Repeat back key points to stay engaged",
          "Take notes during important talks",
          "Ask to move somewhere less distracting",
          "Be honest: 'Can you repeat that? I lost focus'"
        ],
        icon: "🌫️"
      },
      {
        id: "forgetting-to-reply",
        title: "Forgetting to reply",
        summary: "Reading messages but forgetting to respond for days or weeks.",
        tools: [
          "Mark messages unread until replied",
          "Use 'quick reply' templates",
          "Set a daily 'reply hour'",
          "Respond immediately or schedule it"
        ],
        icon: "📱"
      },
      {
        id: "rejection-sensitive-friendships",
        title: "Rejection-sensitive friendships",
        summary: "Perceiving distance or disinterest as personal rejection.",
        tools: [
          "Communicate openly: 'I'm feeling disconnected'",
          "Remind yourself: people are busy, not upset",
          "Check facts before assuming",
          "Practice secure attachment affirmations"
        ],
        icon: "🤝"
      }
    ]
  }
];
