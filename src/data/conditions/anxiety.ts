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
export const anxietyDidYouKnow = [
  "Anxiety is your brain's alarm system trying to protect you — it's not your fault",
  "Physical symptoms (racing heart, shallow breathing) are real responses to perceived threat",
  "Anxiety disorders are the most common mental health condition worldwide",
  "Grounding techniques work by pulling your attention back to the present moment",
  "You can't logic yourself out of anxiety — your nervous system needs calming, not convincing"
];

export const anxietyCategories: Category[] = [
  {
    id: "physical-symptoms",
    title: "Physical Symptoms",
    subtitle: "Body responses to anxiety",
    didYouKnow: [
      "Your sympathetic nervous system activates 'fight or flight' even when there's no real danger",
      "Chest tightness and shortness of breath are common but not dangerous",
      "The physical symptoms usually peak within 10 minutes and then decrease"
    ],
    traits: [
      {
        id: "racing-heart",
        title: "Racing heart",
        summary: "Heart pounds or beats irregularly when anxious or stressed.",
        tools: [
          "Practice 4-7-8 breathing (4 in, 7 hold, 8 out)",
          "Place hand on heart and breathe slowly",
          "Use cold water on face to activate dive reflex",
          "Remind yourself: 'This is anxiety, not danger'"
        ],
        icon: "💓"
      },
      {
        id: "shallow-breathing",
        title: "Shallow breathing",
        summary: "Breathing becomes quick and shallow, feeling like you can't get enough air.",
        tools: [
          "Try box breathing (4-4-4-4)",
          "Breathe into your belly, not chest",
          "Count your breaths to slow them down",
          "Use breathing apps (Breathe+, Calm)"
        ],
        icon: "🫁"
      },
      {
        id: "muscle-tension",
        title: "Muscle tension",
        summary: "Shoulders, jaw, or neck feel tight and painful.",
        tools: [
          "Progressive muscle relaxation (tense then release)",
          "Roll shoulders back 10 times",
          "Massage tension points (temples, jaw, neck)",
          "Use heat pad or warm shower"
        ],
        icon: "💪"
      },
      {
        id: "stomach-issues",
        title: "Stomach problems",
        summary: "Nausea, butterflies, or digestive upset when anxious.",
        tools: [
          "Sip peppermint or ginger tea",
          "Eat small, bland snacks (crackers, toast)",
          "Apply gentle pressure to belly",
          "Try the 'safe place' visualization"
        ],
        icon: "🫄"
      },
      {
        id: "sweating-shaking",
        title: "Sweating or shaking",
        summary: "Hands tremble, body sweats even when not hot.",
        tools: [
          "Shake it out intentionally (arms, legs)",
          "Hold something cold (ice pack, cold drink)",
          "Do grounding exercises (5-4-3-2-1)",
          "Remember: others notice less than you think"
        ],
        icon: "💦"
      }
    ]
  },
  {
    id: "thought-patterns",
    title: "Thought Patterns",
    subtitle: "Mental loops and worries",
    didYouKnow: [
      "Catastrophizing is when your brain jumps to worst-case scenarios automatically",
      "Thoughts aren't facts — anxiety creates believable but false narratives",
      "Rumination (replaying thoughts) increases anxiety rather than solving problems"
    ],
    traits: [
      {
        id: "catastrophizing",
        title: "Catastrophic thinking",
        summary: "Always imagining worst-case scenarios and disaster outcomes.",
        tools: [
          "Ask: 'What's the evidence for this thought?'",
          "Write down the best, worst, and most likely outcome",
          "Challenge: 'What would I tell a friend thinking this?'",
          "Practice the '10-10-10' rule (matters in 10 min/months/years?)"
        ],
        icon: "🌪️"
      },
      {
        id: "overthinking",
        title: "Overthinking everything",
        summary: "Analyzing every detail, conversation, or decision repeatedly.",
        tools: [
          "Set a 'worry time' (15 min daily) then move on",
          "Write thoughts down to get them out of your head",
          "Use thought-stopping: 'Stop!' then redirect",
          "Ask: 'Can I do anything about this right now?'"
        ],
        icon: "🔄"
      },
      {
        id: "what-if",
        title: "'What if' spirals",
        summary: "Mind generates endless anxious 'what if' questions.",
        tools: [
          "Counter with 'What if it goes well?'",
          "Limit yourself to 3 'what ifs' then stop",
          "Ground yourself: 'Right now, I am safe'",
          "Replace with 'I'll handle it if it happens'"
        ],
        icon: "❓"
      },
      {
        id: "rumination",
        title: "Ruminating on past",
        summary: "Replaying past mistakes or embarrassing moments constantly.",
        tools: [
          "Set a timer for 5 minutes to worry, then stop",
          "Practice self-compassion: 'I did my best'",
          "Ask: 'What can I learn?' then move forward",
          "Use distraction: exercise, puzzle, music"
        ],
        icon: "⏮️"
      },
      {
        id: "mind-reading",
        title: "Mind-reading assumptions",
        summary: "Assuming you know what others think (usually negative).",
        tools: [
          "Challenge: 'Do I have actual evidence?'",
          "Ask directly if safe: 'Did I upset you?'",
          "Remember: people are focused on themselves",
          "List 3 alternative explanations"
        ],
        icon: "🔮"
      }
    ]
  },
  {
    id: "social-anxiety",
    title: "Social Anxiety",
    subtitle: "Fear in social situations",
    didYouKnow: [
      "Social anxiety is more than shyness — it's intense fear of judgment or embarrassment",
      "The 'spotlight effect' makes us think others notice us more than they actually do",
      "Avoidance makes social anxiety worse over time — gradual exposure helps"
    ],
    traits: [
      {
        id: "fear-of-judgment",
        title: "Fear of judgment",
        summary: "Constant worry that others are judging or criticizing you.",
        tools: [
          "Remind yourself: 'Others are worried about themselves'",
          "Focus on curiosity about others, not performance",
          "Practice self-compassion mantras",
          "Challenge: 'Would I judge someone for this?'"
        ],
        icon: "👁️"
      },
      {
        id: "avoiding-social",
        title: "Avoiding social events",
        summary: "Declining invitations or making excuses to stay home.",
        tools: [
          "Start small: 30-minute coffee instead of party",
          "Bring a 'safety person' you trust",
          "Set a time limit: 'I'll stay 1 hour'",
          "Reward yourself after attending"
        ],
        icon: "🏠"
      },
      {
        id: "post-event-analysis",
        title: "Post-event rumination",
        summary: "Replaying social interactions, analyzing every word you said.",
        tools: [
          "Write it out, then throw it away",
          "Ask: 'Did anyone actually say something negative?'",
          "Practice: 'I did my best, that's enough'",
          "Set a 10-minute limit, then distract yourself"
        ],
        icon: "🔍"
      },
      {
        id: "performance-anxiety",
        title: "Performance anxiety",
        summary: "Fear of public speaking, presentations, or being watched.",
        tools: [
          "Practice in low-stakes situations first",
          "Use power poses before (hands on hips, 2 min)",
          "Breathe deeply before and during",
          "Focus on message, not perfection"
        ],
        icon: "🎤"
      },
      {
        id: "small-talk-dread",
        title: "Small talk feels impossible",
        summary: "Not knowing what to say in casual conversations.",
        tools: [
          "Prepare 3-5 go-to questions in advance",
          "Use FORD method (Family, Occupation, Recreation, Dreams)",
          "Ask follow-up questions to keep it going",
          "Remember: people love talking about themselves"
        ],
        icon: "💬"
      }
    ]
  },
  {
    id: "panic-overwhelm",
    title: "Panic & Overwhelm",
    subtitle: "Intense anxiety episodes",
    didYouKnow: [
      "Panic attacks peak within 10 minutes — they can't last forever",
      "You cannot die, go crazy, or lose control from a panic attack",
      "Accepting the panic (not fighting it) helps it pass faster"
    ],
    traits: [
      {
        id: "panic-attacks",
        title: "Panic attacks",
        summary: "Sudden intense fear with physical symptoms (racing heart, dizziness, feeling of doom).",
        tools: [
          "Use 5-4-3-2-1 grounding (5 see, 4 touch, 3 hear, 2 smell, 1 taste)",
          "Breathe slowly: 4 in, 4 hold, 6 out",
          "Say out loud: 'This is a panic attack, it will pass'",
          "Hold ice or splash cold water on face"
        ],
        icon: "🚨"
      },
      {
        id: "feeling-overwhelmed",
        title: "Feeling overwhelmed",
        summary: "Everything feels like too much, can't handle normal tasks.",
        tools: [
          "Break tasks into tiny steps (one at a time)",
          "Take a 5-minute reset break",
          "List only the next 3 things to do",
          "Ask for help or delegate if possible"
        ],
        icon: "🌊"
      },
      {
        id: "freeze-response",
        title: "Freezing up",
        summary: "Mind goes blank, can't think or move when anxious.",
        tools: [
          "Move your body: shake arms, stomp feet",
          "Count backwards from 100 by 7s",
          "Name 5 objects you can see",
          "Splash cold water on face or hold ice"
        ],
        icon: "🧊"
      },
      {
        id: "feeling-trapped",
        title: "Feeling trapped",
        summary: "Need to escape situations, can't stay in crowded or enclosed spaces.",
        tools: [
          "Identify exits when you enter",
          "Sit near doors or aisles",
          "Plan escape routes in advance",
          "Use grounding: feet on floor, breathe slowly"
        ],
        icon: "🚪"
      }
    ]
  },
  {
    id: "daily-coping",
    title: "Daily Coping Tools",
    subtitle: "Practices for managing anxiety",
    didYouKnow: [
      "Regular exercise reduces anxiety as effectively as medication for some people",
      "Sleep deprivation makes anxiety worse — rest is treatment",
      "Caffeine and sugar can trigger or worsen anxiety symptoms"
    ],
    traits: [
      {
        id: "grounding-techniques",
        title: "Grounding in the present",
        summary: "Techniques to pull yourself back to 'here and now' when spiraling.",
        tools: [
          "5-4-3-2-1 senses (describe what you see, touch, hear, smell, taste)",
          "Hold ice cube or something textured",
          "Stomp feet and feel the ground",
          "Say your name, age, location out loud"
        ],
        icon: "⚓"
      },
      {
        id: "breathing-exercises",
        title: "Calming breath work",
        summary: "Breathing patterns that activate the parasympathetic nervous system.",
        tools: [
          "Box breathing: 4-4-4-4 (in, hold, out, hold)",
          "4-7-8 method (in 4, hold 7, out 8)",
          "Belly breathing: hand on belly, breathe deep",
          "Use apps: Breathe+, Calm, Insight Timer"
        ],
        icon: "🫁"
      },
      {
        id: "safe-space-visualization",
        title: "Safe space visualization",
        summary: "Imagining a peaceful place to calm your nervous system.",
        tools: [
          "Picture a real or imagined safe place in detail",
          "Engage all senses: sights, sounds, smells",
          "Return to this image when anxious",
          "Practice when calm so it's easier when anxious"
        ],
        icon: "🏝️"
      },
      {
        id: "worry-journal",
        title: "Worry journaling",
        summary: "Writing down anxious thoughts to get them out of your head.",
        tools: [
          "Write for 5-10 minutes without editing",
          "Include worst fear, best outcome, likely outcome",
          "Review patterns to spot triggers",
          "Schedule 'worry time' to contain it"
        ],
        icon: "📝"
      },
      {
        id: "body-scan",
        title: "Body scan meditation",
        summary: "Noticing and releasing tension throughout your body.",
        tools: [
          "Lie down, close eyes, breathe slowly",
          "Notice each body part from toes to head",
          "Release tension as you go",
          "Use guided recordings (Insight Timer, Calm)"
        ],
        icon: "🧘"
      },
      {
        id: "movement-exercise",
        title: "Movement and exercise",
        summary: "Physical activity to burn off anxious energy.",
        tools: [
          "Walk for 10-20 minutes outside",
          "Try yoga or stretching",
          "Dance to upbeat music",
          "Any movement counts — even pacing"
        ],
        icon: "🏃"
      }
    ]
  }
];
