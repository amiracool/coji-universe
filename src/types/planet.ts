// Standardized planet data structure for reusable, ND-friendly content

export interface PlanetSection {
  heading: string; // Short, action-oriented heading
  items: string[]; // Bullet points, not long paragraphs
}

export interface PlanetData {
  id: string;
  name: string;
  emoji: string;
  color: string; // Primary color
  accentColor: string; // Secondary color
  description: string; // One-liner for grid view

  // Main sections - all use consistent headings
  sections: {
    didYouKnow: PlanetSection[]; // Fun facts, statistics
    understanding: PlanetSection[]; // "What's happening in my brain/body"
    dailyImpact: PlanetSection[]; // "I might notice..." real-life effects
    planning: PlanetSection[]; // "What to plan for..." strategies
  };
}

// Example planets following the required format
export const PLANET_DATA: Record<string, PlanetData> = {
  autism: {
    id: "autism",
    name: "Autism Support",
    emoji: "🧩",
    color: "#14b8a6", // teal
    accentColor: "#2dd4bf",
    description: "Sensory tools, social scripts, stim acceptance",
    sections: {
      didYouKnow: [
        {
          heading: "About autism",
          items: [
            "Autism is a neurotype, not a disorder to fix",
            "Stimming is self-regulation, not something to suppress",
            "Sensory differences are real and valid",
            "Masking takes enormous energy"
          ]
        }
      ],
      understanding: [
        {
          heading: "Under the surface",
          items: [
            "My brain processes sensory input differently",
            "I might need more time to process social cues",
            "Routines help me feel safe and grounded",
            "Direct communication works better than hints"
          ]
        }
      ],
      dailyImpact: [
        {
          heading: "I might notice",
          items: [
            "Feeling overwhelmed by bright lights, loud sounds, or crowds",
            "Needing time alone to recharge after social situations",
            "Difficulty with unexpected changes to plans",
            "Strong focus and deep interests in specific topics",
            "Stimming (rocking, hand-flapping, humming) to self-regulate"
          ]
        }
      ],
      planning: [
        {
          heading: "What helps",
          items: [
            "Create sensory-friendly spaces with dim lighting and quiet areas",
            "Use noise-cancelling headphones or earplugs in overwhelming environments",
            "Build predictable routines and give advance notice for changes",
            "Practice scripts for common social situations",
            "Allow yourself to stim without judgment",
            "Schedule downtime after social events"
          ]
        },
        {
          heading: "Tools to try",
          items: [
            "Visual schedules and timers",
            "Weighted blankets or compression clothing",
            "Fidget tools and stim toys",
            "Social scripts for phone calls, meetings, appointments",
            "Communication cards for non-verbal moments"
          ]
        }
      ]
    }
  },

  adhd: {
    id: "adhd",
    name: "ADHD Support",
    emoji: "🚀",
    color: "#F96E46", // orange-red
    accentColor: "#fb923c",
    description: "Body doubling, time blocking, dopamine menus",
    sections: {
      didYouKnow: [
        {
          heading: "About ADHD",
          items: [
            "ADHD brains need more dopamine to feel motivated",
            "It's not laziness - it's executive dysfunction",
            "Hyperfocus is real and can be a superpower",
            "Time blindness makes estimating time really hard"
          ]
        }
      ],
      understanding: [
        {
          heading: "Under the surface",
          items: [
            "My brain seeks novelty and stimulation",
            "Working memory challenges make following multi-step tasks difficult",
            "Emotional regulation can be intense (rejection sensitive dysphoria)",
            "Task initiation is often the hardest part"
          ]
        }
      ],
      dailyImpact: [
        {
          heading: "I might notice",
          items: [
            "Procrastinating even when I want to start",
            "Losing track of time or underestimating how long things take",
            "Difficulty focusing unless it's highly interesting",
            "Forgetting important tasks or appointments",
            "Feeling restless and needing to move",
            "Starting many projects but struggling to finish them"
          ]
        }
      ],
      planning: [
        {
          heading: "What helps",
          items: [
            "Break tasks into tiny, manageable chunks",
            "Use external timers and alarms (visual timers work great)",
            "Create dopamine menus - lists of quick mood-boosting activities",
            "Try body doubling (working alongside someone else)",
            "Build in movement breaks every 25-30 minutes",
            "Use apps or planners to offload working memory"
          ]
        },
        {
          heading: "Tools to try",
          items: [
            "Pomodoro technique (25 min work, 5 min break)",
            "Colour-coded calendars and task lists",
            "Fidget tools for focus",
            "White noise or lo-fi music",
            "Habit stacking (link new habits to existing ones)",
            "Digital reminders with location triggers"
          ]
        }
      ]
    }
  },

  anxiety: {
    id: "anxiety",
    name: "Anxiety Tools",
    emoji: "🌊",
    color: "#9B86E8", // purple
    accentColor: "#c4b5fd",
    description: "Grounding, breathing, worry management",
    sections: {
      didYouKnow: [
        {
          heading: "About anxiety",
          items: [
            "Anxiety is your brain trying to protect you",
            "It's not weakness - it's your nervous system being alert",
            "Anxiety often lives in the body, not just the mind",
            "You can acknowledge anxiety without letting it control you"
          ]
        }
      ],
      understanding: [
        {
          heading: "Under the surface",
          items: [
            "My body is in 'threat detection' mode",
            "My brain is predicting worst-case scenarios",
            "My nervous system needs help calming down",
            "Avoidance gives short-term relief but reinforces fear"
          ]
        }
      ],
      dailyImpact: [
        {
          heading: "I might notice",
          items: [
            "Racing thoughts or constant worrying",
            "Physical sensations: tight chest, shallow breathing, nausea",
            "Difficulty sleeping or relaxing",
            "Avoiding situations that trigger anxiety",
            "Feeling on edge or easily startled",
            "Second-guessing decisions or needing reassurance"
          ]
        }
      ],
      planning: [
        {
          heading: "What helps",
          items: [
            "Practice grounding techniques (5-4-3-2-1 senses)",
            "Use box breathing (4 counts in, hold 4, out 4, hold 4)",
            "Name your anxiety (e.g., 'Hello, worry brain')",
            "Challenge catastrophic thoughts gently",
            "Move your body - walk, stretch, shake",
            "Create a worry window (15 min designated worry time)"
          ]
        },
        {
          heading: "Tools to try",
          items: [
            "Weighted blankets or pressure therapy",
            "Guided meditation or body scan apps",
            "Journalling to externalise worries",
            "Worry stones or fidget tools",
            "Cold water on face or ice cubes (vagus nerve reset)",
            "Progressive muscle relaxation"
          ]
        }
      ]
    }
  },

  depression: {
    id: "depression",
    name: "Depression Support",
    emoji: "🌙",
    color: "#7D6B9D", // muted purple
    accentColor: "#a78bfa",
    description: "Motivation, energy, self-compassion",
    sections: {
      didYouKnow: [
        {
          heading: "About depression",
          items: [
            "Depression is not laziness or weakness",
            "Small wins count - getting out of bed is an achievement",
            "It's okay to not be okay",
            "Recovery isn't linear - setbacks are part of the process"
          ]
        }
      ],
      understanding: [
        {
          heading: "Under the surface",
          items: [
            "My brain chemistry is affecting motivation and mood",
            "Everything feels heavier and harder",
            "Self-care tasks can feel impossible",
            "Negative thoughts feel like facts, but they're not"
          ]
        }
      ],
      dailyImpact: [
        {
          heading: "I might notice",
          items: [
            "Low energy and constant fatigue",
            "Loss of interest in things I used to enjoy",
            "Difficulty getting out of bed or basic self-care",
            "Feeling numb, empty, or disconnected",
            "Negative self-talk and hopelessness",
            "Changes in appetite or sleep"
          ]
        }
      ],
      planning: [
        {
          heading: "What helps",
          items: [
            "Lower the bar - celebrate tiny wins",
            "Use 'can't do, CAN do' lists (focus on what's possible)",
            "Break tasks into the smallest possible steps",
            "Practice radical self-compassion",
            "Move your body gently (even 5 minutes counts)",
            "Reach out to someone, even with a simple 'I'm struggling'"
          ]
        },
        {
          heading: "Tools to try",
          items: [
            "Behavioural activation (one small activity per day)",
            "Mood tracking to spot patterns",
            "Sunlight or light therapy",
            "Permission to rest without guilt",
            "Crisis helplines or text support",
            "Professional support (therapy, medication)"
          ]
        }
      ]
    }
  },

  dyspraxia: {
    id: "dyspraxia",
    name: "Dyspraxia Support",
    emoji: "🤸",
    color: "#5DADE2", // light blue
    accentColor: "#60a5fa",
    description: "Coordination, movement, spatial awareness",
    sections: {
      didYouKnow: [
        {
          heading: "About dyspraxia",
          items: [
            "Dyspraxia affects motor planning, not intelligence",
            "It's also called Developmental Coordination Disorder (DCD)",
            "Fine and gross motor skills can both be affected",
            "Many people with dyspraxia are highly creative"
          ]
        }
      ],
      understanding: [
        {
          heading: "Under the surface",
          items: [
            "My brain takes longer to plan and execute movements",
            "Spatial awareness and judging distances is challenging",
            "Multi-step physical tasks need extra concentration",
            "Balance and coordination require conscious effort"
          ]
        }
      ],
      dailyImpact: [
        {
          heading: "I might notice",
          items: [
            "Bumping into things or misjudging distances",
            "Difficulty with handwriting or using tools",
            "Challenges with balance, sports, or dancing",
            "Taking longer to learn physical tasks",
            "Fatigue from concentrating on coordination",
            "Difficulty with fine motor tasks (buttons, tying laces)"
          ]
        }
      ],
      planning: [
        {
          heading: "What helps",
          items: [
            "Break physical tasks into clear, sequential steps",
            "Use assistive tools (ergonomic pens, keyboard shortcuts)",
            "Practice movements slowly and with repetition",
            "Minimise obstacles and clutter in spaces",
            "Use colour-coding and visual markers",
            "Allow extra time for tasks requiring coordination"
          ]
        },
        {
          heading: "Tools to try",
          items: [
            "Occupational therapy for motor skills",
            "Assistive technology (speech-to-text, dictation)",
            "Weighted utensils or pens for better control",
            "Non-slip mats and grip tools",
            "Clear labels and organisation systems",
            "Low-impact exercises (swimming, yoga)"
          ]
        }
      ]
    }
  },

  dyscalculia: {
    id: "dyscalculia",
    name: "Dyscalculia Support",
    emoji: "🔢",
    color: "#FFD966", // yellow
    accentColor: "#fbbf24",
    description: "Number sense, maths strategies, visual aids",
    sections: {
      didYouKnow: [
        {
          heading: "About dyscalculia",
          items: [
            "Dyscalculia is like dyslexia, but for numbers",
            "It's not about being 'bad at maths' - it's neurological",
            "Number sense, not intelligence, is affected",
            "Visual and hands-on methods often work better"
          ]
        }
      ],
      understanding: [
        {
          heading: "Under the surface",
          items: [
            "My brain processes numbers and quantities differently",
            "Mental maths and number estimation are challenging",
            "I might struggle with sequences, patterns, or time",
            "Anxiety around maths can make it even harder"
          ]
        }
      ],
      dailyImpact: [
        {
          heading: "I might notice",
          items: [
            "Difficulty with mental arithmetic",
            "Trouble telling time or managing schedules",
            "Challenges with money, budgeting, or counting change",
            "Confusion with measurements, directions, or distances",
            "Forgetting number sequences (phone numbers, PINs)",
            "Anxiety when faced with maths tasks"
          ]
        }
      ],
      planning: [
        {
          heading: "What helps",
          items: [
            "Use visual aids and manipulatives (counters, number lines)",
            "Rely on calculators and apps without guilt",
            "Break problems into smaller, visual steps",
            "Colour-code numbers and operations",
            "Use real-world objects to make maths tangible",
            "Allow extra time and reduce pressure"
          ]
        },
        {
          heading: "Tools to try",
          items: [
            "Calculator apps with large, clear buttons",
            "Visual timers and clock apps",
            "Budgeting apps with visual breakdowns",
            "Graph paper for aligning numbers",
            "Multiplication charts and reference sheets",
            "Games and apps that build number sense"
          ]
        }
      ]
    }
  },

  dyslexia: {
    id: "dyslexia",
    name: "Dyslexia Support",
    emoji: "📖",
    color: "#FF6B9D", // pink
    accentColor: "#f472b6",
    description: "Reading tools, fonts, visual thinking",
    sections: {
      didYouKnow: [
        {
          heading: "About dyslexia",
          items: [
            "Dyslexia is a difference in how the brain processes language",
            "Many dyslexic people are visual thinkers and creative problem-solvers",
            "It's not about intelligence - Albert Einstein was dyslexic",
            "Dyslexia varies - no two people experience it the same way"
          ]
        }
      ],
      understanding: [
        {
          heading: "Under the surface",
          items: [
            "My brain processes written language differently",
            "Phonological processing (sounds to letters) is challenging",
            "Reading requires extra effort and concentration",
            "I might think in pictures rather than words"
          ]
        }
      ],
      dailyImpact: [
        {
          heading: "I might notice",
          items: [
            "Slow or effortful reading",
            "Difficulty spelling or mixing up similar-looking letters",
            "Trouble with phonics or sounding out words",
            "Losing place when reading or skipping lines",
            "Strong listening comprehension but weaker reading",
            "Fatigue after reading tasks"
          ]
        }
      ],
      planning: [
        {
          heading: "What helps",
          items: [
            "Use dyslexia-friendly fonts (OpenDyslexic, Comic Sans)",
            "Adjust text: larger font, more spacing, off-white backgrounds",
            "Try coloured overlays or tinted glasses",
            "Use text-to-speech and audiobooks",
            "Break reading into short chunks with breaks",
            "Use a ruler or finger to track lines"
          ]
        },
        {
          heading: "Tools to try",
          items: [
            "Screen readers and text-to-speech software",
            "Speech-to-text for writing",
            "Audiobooks and podcasts",
            "Digital highlighters and annotation tools",
            "Mind mapping software for visual organisation",
            "Reading rulers or tracking guides"
          ]
        }
      ]
    }
  },

  chronicIllness: {
    id: "chronic-illness",
    name: "Chronic Illness",
    emoji: "💚",
    color: "#6EBD8E", // green
    accentColor: "#4ade80",
    description: "Pacing, energy management, pain strategies",
    sections: {
      didYouKnow: [
        {
          heading: "About chronic illness",
          items: [
            "Chronic illness is real, even if it's invisible",
            "Flare-ups and 'good days/bad days' are unpredictable",
            "Pacing prevents crashes and payback",
            "You're not lazy - you're managing limited energy"
          ]
        }
      ],
      understanding: [
        {
          heading: "Under the surface",
          items: [
            "My body's energy envelope is smaller than others'",
            "Pain, fatigue, and symptoms fluctuate daily",
            "Pushing through causes crashes and longer recovery",
            "Rest is treatment, not giving up"
          ]
        }
      ],
      dailyImpact: [
        {
          heading: "I might notice",
          items: [
            "Fluctuating energy levels throughout the day",
            "Needing to cancel plans due to flare-ups",
            "Pain or fatigue that limits daily activities",
            "Post-exertional malaise (feeling worse after activity)",
            "Brain fog and difficulty concentrating",
            "Feeling misunderstood or invalidated"
          ]
        }
      ],
      planning: [
        {
          heading: "What helps",
          items: [
            "Practice pacing - stop before you hit your limit",
            "Use the 50% rule (do half of what you think you can)",
            "Plan rest days after busy periods",
            "Track symptoms and energy to spot patterns",
            "Communicate limits clearly and without guilt",
            "Adapt activities rather than avoiding them entirely"
          ]
        },
        {
          heading: "Tools to try",
          items: [
            "Energy tracking apps and symptom diaries",
            "Timers to enforce rest breaks",
            "Mobility aids without stigma (canes, wheelchairs)",
            "Meal prep and batch cooking on good days",
            "Online communities for support and validation",
            "Pain management techniques (heat, ice, TENS)"
          ]
        }
      ]
    }
  },

  parenting: {
    id: "parenting",
    name: "Parenting Hub",
    emoji: "👨‍👩‍👧‍👦",
    color: "#FDCB6E", // warm yellow
    accentColor: "#fbbf24",
    description: "Neurodivergent parenting, school support",
    sections: {
      didYouKnow: [
        {
          heading: "About ND parenting",
          items: [
            "Parenting whilst neurodivergent comes with unique strengths",
            "You can advocate for your child whilst respecting their autonomy",
            "Co-regulation is more effective than demanding self-regulation",
            "Neurodivergent parents often deeply understand their ND children"
          ]
        }
      ],
      understanding: [
        {
          heading: "Under the surface",
          items: [
            "My own sensory/energy needs compete with parenting demands",
            "Juggling routines and flexibility is exhausting",
            "I worry about passing on struggles or not doing enough",
            "Finding support that 'gets it' is hard"
          ]
        }
      ],
      dailyImpact: [
        {
          heading: "I might notice",
          items: [
            "Sensory overwhelm from noise, mess, and constant demands",
            "Executive dysfunction making routines and organisation difficult",
            "Needing time alone to recharge, but not getting it",
            "Guilt about masking less around children",
            "Feeling judged by other parents or professionals",
            "Navigating school systems and advocating for accommodations"
          ]
        }
      ],
      planning: [
        {
          heading: "What helps",
          items: [
            "Build in sensory breaks for yourself and children",
            "Use visual schedules and timers for routines",
            "Teach emotional regulation by modelling and co-regulating",
            "Simplify where possible - lower the bar without guilt",
            "Connect with other neurodivergent parents",
            "Advocate assertively but respectfully at school"
          ]
        },
        {
          heading: "Tools to try",
          items: [
            "Visual schedules and reward charts",
            "Noise-cancelling headphones for overstimulation",
            "Scripts for school meetings and advocacy",
            "Calm-down corners or quiet spaces",
            "Online parenting communities and resources",
            "Self-compassion practices and therapy"
          ]
        }
      ]
    }
  },

  ideasQuestions: {
    id: "ideas-questions",
    name: "Ideas & Questions",
    emoji: "💭",
    color: "#A78BFA", // lavender
    accentColor: "#c4b5fd",
    description: "Curiosity, exploration, self-advocacy",
    sections: {
      didYouKnow: [
        {
          heading: "About curiosity",
          items: [
            "Deep curiosity is a neurodivergent strength",
            "Questions are how we understand the world",
            "There's no such thing as a 'stupid question'",
            "Seeking clarity and information is self-advocacy"
          ]
        }
      ],
      understanding: [
        {
          heading: "Under the surface",
          items: [
            "My brain thrives on understanding 'why' and 'how'",
            "I might need explicit explanations for social norms",
            "Curiosity helps me feel in control and prepared",
            "Sometimes I'm told I 'ask too much' or 'think too deeply'"
          ]
        }
      ],
      dailyImpact: [
        {
          heading: "I might notice",
          items: [
            "Wanting to research topics in-depth",
            "Asking questions that others think are 'obvious'",
            "Feeling frustrated by vague or incomplete answers",
            "Hyperfocusing on new interests or problems",
            "Seeking patterns and connections others miss",
            "Feeling dismissed when exploring ideas"
          ]
        }
      ],
      planning: [
        {
          heading: "What helps",
          items: [
            "Follow your curiosity - it's a strength, not a flaw",
            "Find safe spaces to explore ideas without judgment",
            "Practice asking questions respectfully and clearly",
            "Keep idea journals or voice notes",
            "Connect with people who share your interests",
            "Remember: not everyone will engage at your depth, and that's okay"
          ]
        },
        {
          heading: "Tools to try",
          items: [
            "Note-taking apps for capturing ideas",
            "Online forums and communities for deep dives",
            "Books, podcasts, and documentaries",
            "Mind mapping software",
            "Question scripts for self-advocacy",
            "Creative outlets (writing, art, making)"
          ]
        }
      ]
    }
  }
};
