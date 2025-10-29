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
export const depressionDidYouKnow = [
  "Depression is not sadness — it's a medical condition affecting your brain chemistry",
  "Small actions count: brushing teeth, drinking water, opening curtains — all matter",
  "Depression lies: the negative thoughts are symptoms, not truth",
  "You can have depression and still smile, laugh, or seem 'fine' to others",
  "Recovery isn't linear — setbacks are part of the process, not failure"
];

export const depressionCategories: Category[] = [
  {
    id: "low-energy",
    title: "Low Energy & Motivation",
    subtitle: "When everything feels impossible",
    didYouKnow: [
      "Depression physically changes brain chemistry, making motivation harder",
      "The smallest task can feel enormous — that's the illness, not you",
      "Rest is not laziness when you have depression"
    ],
    traits: [
      {
        id: "no-energy",
        title: "No energy at all",
        summary: "Exhausted even after sleep, everything feels effortful.",
        tools: [
          "Break tasks into micro-steps (1 minute each)",
          "Celebrate tiny wins (got out of bed = victory)",
          "Set one small goal per day",
          "Ask: 'What's the smallest version of this?'"
        ],
        icon: "🔋"
      },
      {
        id: "cant-start",
        title: "Can't start anything",
        summary: "Knowing you should do something but unable to begin.",
        tools: [
          "Use the '3-2-1 GO' countdown to start",
          "Do just 2 minutes, then allow yourself to stop",
          "Put on 'getting ready' music or podcast",
          "Move your body first (1 stretch, 5 steps)"
        ],
        icon: "🚪"
      },
      {
        id: "everything-pointless",
        title: "Everything feels pointless",
        summary: "Loss of interest in things you used to enjoy.",
        tools: [
          "Do it anyway (action before motivation)",
          "Start with activities that require no decision (walk, shower)",
          "Try for 5 minutes, then reassess",
          "Remember: this feeling is temporary"
        ],
        icon: "🌫️"
      },
      {
        id: "oversleeping",
        title: "Sleeping too much",
        summary: "Staying in bed for hours, using sleep to escape.",
        tools: [
          "Set one non-negotiable wake time",
          "Put alarm across the room",
          "Open curtains immediately when you wake",
          "Have one thing to get up for (coffee, pet, shower)"
        ],
        icon: "😴"
      },
      {
        id: "cant-sleep",
        title: "Can't sleep at night",
        summary: "Lying awake ruminating or feeling restless despite exhaustion.",
        tools: [
          "Keep the same wake time even if tired",
          "Avoid naps during the day",
          "Use sleep sounds or white noise",
          "Try progressive muscle relaxation"
        ],
        icon: "🌙"
      }
    ]
  },
  {
    id: "self-care-basics",
    title: "Self-Care Basics",
    subtitle: "When hygiene and routine feel impossible",
    didYouKnow: [
      "Skipping showers or brushing teeth is a symptom, not laziness",
      "Depression makes executive function harder — planning is exhausting",
      "Lowering standards is survival, not failure"
    ],
    traits: [
      {
        id: "hygiene-hard",
        title: "Hygiene feels impossible",
        summary: "Showering, brushing teeth, or changing clothes feels overwhelming.",
        tools: [
          "Use dry shampoo instead of full shower",
          "Keep wipes, mouthwash, deodorant by bed",
          "Sit in shower if standing is too hard",
          "Something is always better than nothing"
        ],
        icon: "🚿"
      },
      {
        id: "forgetting-to-eat",
        title: "Forgetting to eat",
        summary: "No appetite or forgetting meals entirely.",
        tools: [
          "Set meal alarms on your phone",
          "Keep easy snacks visible (granola bars, nuts)",
          "Use meal replacements (shakes, smoothies)",
          "Eat with someone else (body doubling)"
        ],
        icon: "🍽️"
      },
      {
        id: "eating-too-much",
        title: "Eating too much",
        summary: "Using food for comfort or numbing emotions.",
        tools: [
          "Keep nourishing snacks accessible",
          "Practice gentle awareness, not restriction",
          "Ask: 'Am I hungry or feeling something?'",
          "Remove judgment — you're coping, not failing"
        ],
        icon: "🍕"
      },
      {
        id: "messy-space",
        title: "Living space chaotic",
        summary: "Clutter and mess building up, adding to overwhelm.",
        tools: [
          "Set timer for 2 minutes, clean what you can",
          "Focus on one surface (nightstand, desk)",
          "Use 'one-touch rule': touch it, deal with it",
          "Ask for help if available"
        ],
        icon: "🗑️"
      }
    ]
  },
  {
    id: "negative-thoughts",
    title: "Negative Thoughts",
    subtitle: "When your brain lies to you",
    didYouKnow: [
      "Depression creates cognitive distortions — believable but false thoughts",
      "Thoughts aren't facts, even when they feel true",
      "Your brain is sick right now — don't trust its harsh judgments"
    ],
    traits: [
      {
        id: "self-hatred",
        title: "Self-hatred and guilt",
        summary: "Constant negative self-talk and feeling like a burden.",
        tools: [
          "Write down harsh thoughts, then counter with facts",
          "Ask: 'Would I say this to a friend?'",
          "Use a mantra: 'I'm doing my best with what I have'",
          "Practice self-compassion, not self-judgment"
        ],
        icon: "💔"
      },
      {
        id: "hopelessness",
        title: "Feeling hopeless",
        summary: "Believing nothing will ever get better.",
        tools: [
          "Remind yourself: 'This is depression talking'",
          "Look for tiny evidence of change (one good moment)",
          "Connect with someone, even briefly",
          "Remember: depression lies about the future"
        ],
        icon: "🕳️"
      },
      {
        id: "worthlessness",
        title: "Feeling worthless",
        summary: "Believing you have no value or purpose.",
        tools: [
          "List 3 small things you did today (breathing counts)",
          "Ask someone who cares about you why they do",
          "Your worth isn't based on productivity",
          "You are valuable simply by existing"
        ],
        icon: "🪨"
      },
      {
        id: "intrusive-thoughts",
        title: "Intrusive dark thoughts",
        summary: "Unwanted thoughts about harm, death, or ending things.",
        tools: [
          "Notice: 'This is a thought, not a plan'",
          "Call a crisis line or text HELLO to 741741",
          "Tell someone you trust",
          "Distract: count objects, name colors, cold water"
        ],
        links: [{ label: "Crisis resources", href: "tel:988" }],
        icon: "⚠️"
      }
    ]
  },
  {
    id: "social-isolation",
    title: "Social Isolation",
    subtitle: "Withdrawing from others",
    didYouKnow: [
      "Isolation makes depression worse, but connection feels impossible",
      "You don't have to explain — just existing near someone helps",
      "Parallel play counts: being in the same space without talking"
    ],
    traits: [
      {
        id: "canceling-plans",
        title: "Canceling plans",
        summary: "Avoiding social contact because it feels too hard.",
        tools: [
          "Start with low-effort contact (text, not call)",
          "Suggest short, simple plans (coffee, walk)",
          "Be honest: 'I'm struggling but want to see you'",
          "Even 10 minutes of connection helps"
        ],
        icon: "📵"
      },
      {
        id: "feeling-alone",
        title: "Feeling completely alone",
        summary: "Believing no one understands or cares.",
        tools: [
          "Reach out to one person, even briefly",
          "Join online support groups",
          "Remember: others care, depression makes you forget",
          "Connection doesn't require explanation"
        ],
        icon: "🏝️"
      },
      {
        id: "burden-to-others",
        title: "Feeling like a burden",
        summary: "Believing others would be better off without you.",
        tools: [
          "Ask someone directly: 'Am I a burden to you?'",
          "Remember: depression distorts reality",
          "People who care want to help",
          "Needing support is human, not weakness"
        ],
        icon: "⚖️"
      },
      {
        id: "no-one-understands",
        title: "No one understands",
        summary: "Feeling isolated because others don't 'get it'.",
        tools: [
          "Find depression support communities online",
          "Share a resource: 'This describes how I feel'",
          "You don't need perfect understanding to receive support",
          "Validation helps, but connection helps more"
        ],
        icon: "🗣️"
      }
    ]
  },
  {
    id: "daily-coping",
    title: "Daily Coping Strategies",
    subtitle: "Small tools that help",
    didYouKnow: [
      "Tiny habits stack better than big goals when depressed",
      "Sunlight and movement genuinely help brain chemistry",
      "You don't have to feel like doing it for it to help"
    ],
    traits: [
      {
        id: "one-thing",
        title: "The 'One Thing' method",
        summary: "Commit to one small task per day, that's enough.",
        tools: [
          "Choose something concrete (shower, walk, call someone)",
          "Make it genuinely small (5-10 minutes max)",
          "Celebrate when done — that's your win",
          "Tomorrow's another chance"
        ],
        icon: "1️⃣"
      },
      {
        id: "sunlight-movement",
        title: "Sunlight and movement",
        summary: "Light and exercise change brain chemistry (even a little).",
        tools: [
          "Open curtains first thing in the morning",
          "Step outside for 5 minutes (or sit by window)",
          "Walk around your house or room",
          "Any movement > no movement"
        ],
        icon: "☀️"
      },
      {
        id: "routine-anchor",
        title: "One routine anchor",
        summary: "Pick one non-negotiable daily habit to ground you.",
        tools: [
          "Examples: morning coffee, brush teeth, feed pet",
          "Keep it simple and achievable",
          "This is your 'North Star' when everything else fails",
          "Build from there when you can"
        ],
        icon: "⚓"
      },
      {
        id: "safe-person",
        title: "Identify a safe person",
        summary: "One trusted person who you can text when it's bad.",
        tools: [
          "Tell them: 'Can I reach out when I'm struggling?'",
          "They don't need to fix it, just witness",
          "Use a code word if talking is hard",
          "Having this connection reduces crisis risk"
        ],
        icon: "🆘"
      },
      {
        id: "opposite-action",
        title: "Opposite action",
        summary: "Do the opposite of what depression tells you to do.",
        tools: [
          "Depression says 'stay in bed' → Get up",
          "Depression says 'isolate' → Text someone",
          "Depression says 'give up' → Do one small thing",
          "Action before motivation"
        ],
        icon: "↩️"
      },
      {
        id: "medication-therapy",
        title: "Medication and therapy",
        summary: "Professional support is a tool, not a failure.",
        tools: [
          "Talk to a doctor about medication options",
          "Try therapy (CBT, DBT especially helpful)",
          "Use crisis lines when needed: 988 or text HELLO to 741741",
          "Treatment is courage, not weakness"
        ],
        links: [
          { label: "Find a therapist", href: "https://www.psychologytoday.com/us/therapists" },
          { label: "Crisis line: 988", href: "tel:988" }
        ],
        icon: "💊"
      }
    ]
  }
];
