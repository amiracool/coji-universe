import { Trait } from './autism';

// Category represents a grouping of traits
export interface Category {
  id: string;
  title: string;
  subtitle: string;
  didYouKnow: string[];
  traits: Trait[];
}

// Top-level "Did You Know" facts for carousel
export const dyspraxiaDidYouKnow = [
  "Dyspraxia affects motor planning—your brain struggles to plan and coordinate movements",
  "It's not just 'being clumsy'—it's a neurological processing difference",
  "Many people with dyspraxia have poor proprioception—you don't always know where your body is in space",
  "Dyspraxia can affect speech (verbal dyspraxia) and make coordinating mouth movements hard",
  "You might be able to think through movements but your body won't cooperate",
  "Your coordination struggles are real—you're not lazy or not trying hard enough"
];

export const dyspraxiaCategories: Category[] = [
  {
    id: "gross-motor",
    title: "Gross Motor Skills & Balance",
    subtitle: "Walking, running, balance, coordination",
    didYouKnow: [
      "Balance and vestibular issues are common—you might feel dizzy or unsteady often",
      "You might bump into things constantly—your brain misjudges spatial distances",
      "Many people with dyspraxia are hypermobile—loose joints make coordination harder"
    ],
    traits: [
      {
        id: "clumsy-constantly",
        title: "Clumsy constantly, bump into everything",
        summary: "You walk into doorframes, furniture, and people regularly.",
        tools: [
          "Clear walkways of obstacles and clutter",
          "Use bright tape or markers on glass doors and corners",
          "Walk slowly and deliberately in crowded spaces",
          "Wear protective gear (knee pads, wrist guards) if needed",
          "Practice spatial awareness exercises with a physio"
        ],
        icon: "🚶"
      },
      {
        id: "balance-problems",
        title: "Balance problems and feeling unsteady",
        summary: "You feel dizzy, off-balance, or like you might fall often.",
        tools: [
          "Use handrails on stairs always",
          "Wear shoes with good grip and ankle support",
          "Practice balance exercises (standing on one foot, yoga)",
          "See a vestibular physiotherapist for assessment",
          "Request accommodations to avoid ladders/heights at work"
        ],
        icon: "⚖️"
      },
      {
        id: "stairs-escalators",
        title: "Stairs and escalators are scary",
        summary: "Navigating stairs or escalators feels dangerous and overwhelming.",
        tools: [
          "Always use the handrail and go at your own pace",
          "Take one step at a time—no rushing",
          "Use lifts/elevators when available without shame",
          "Practice on quiet staircases to build confidence",
          "Look for buildings with ramps or alternative access"
        ],
        icon: "🪜"
      },
      {
        id: "trip-over-nothing",
        title: "Trip over nothing, fall frequently",
        summary: "Your feet don't clear the ground properly and you trip on flat surfaces.",
        tools: [
          "Wear supportive shoes that fit well",
          "Practice lifting your feet higher when walking",
          "Use trekking poles for extra stability on uneven ground",
          "Remove trip hazards (rugs, cables) from your space",
          "See a physio for gait analysis and exercises"
        ],
        icon: "🩹"
      }
    ]
  },
  {
    id: "fine-motor",
    title: "Fine Motor Skills & Hand Coordination",
    subtitle: "Handwriting, buttons, typing, precise movements",
    didYouKnow: [
      "Handwriting can be physically exhausting and painful with dyspraxia",
      "Fine motor struggles are neurological, not a lack of effort",
      "Many successful people with dyspraxia use assistive technology instead of handwriting"
    ],
    traits: [
      {
        id: "handwriting-messy",
        title: "Handwriting is messy and painful",
        summary: "Writing by hand is slow, illegible, and causes hand cramps.",
        tools: [
          "Use a laptop or tablet for note-taking and writing",
          "Try ergonomic pens or pencil grips",
          "Practice finger strengthening exercises (therapy putty)",
          "Request typing accommodations for exams and work",
          "Use speech-to-text instead of handwriting"
        ],
        icon: "✍️"
      },
      {
        id: "buttons-zips",
        title: "Buttons, zips, and shoelaces are nightmares",
        summary: "Getting dressed takes forever because fastenings are so difficult.",
        tools: [
          "Choose clothes with elastic waists, velcro, or magnetic closures",
          "Use slip-on shoes or elastic laces",
          "Try zip pulls or button hooks for assistance",
          "Buy slightly larger sizes for easier dressing",
          "Set out clothes the night before to reduce morning stress"
        ],
        icon: "👕"
      },
      {
        id: "drop-things",
        title: "Drop things and spill constantly",
        summary: "Your grip fails and you drop cups, plates, and objects regularly.",
        tools: [
          "Use cups with handles and non-slip grips",
          "Choose plastic or unbreakable dishes",
          "Keep a cloth nearby for inevitable spills",
          "Use two hands to carry things",
          "Practice grip strengthening exercises"
        ],
        icon: "💧"
      },
      {
        id: "typing-difficult",
        title: "Typing is difficult and slow",
        summary: "Your fingers hit the wrong keys or don't coordinate properly.",
        tools: [
          "Use typing tutors to practice (TypingClub, Keybr)",
          "Try larger keyboards or ergonomic split keyboards",
          "Use voice typing for longer documents",
          "Enable autocorrect and predictive text",
          "Practice touch typing at your own pace"
        ],
        icon: "⌨️",
        link: "https://www.typingclub.com/"
      }
    ]
  },
  {
    id: "spatial-awareness",
    title: "Spatial Awareness & Proprioception",
    subtitle: "Body position, distances, spatial relationships",
    didYouKnow: [
      "Poor proprioception means your brain doesn't always know where your body is in space",
      "Spatial awareness difficulties are a core feature of dyspraxia",
      "Your brain misjudges distances constantly—it's processing, not carelessness"
    ],
    traits: [
      {
        id: "misjudge-distances",
        title: "Misjudge distances constantly",
        summary: "You reach for things that are further away than you thought, or hit objects you thought you'd cleared.",
        tools: [
          "Move slowly and deliberately in tight spaces",
          "Use your hand to gauge distance before reaching",
          "Practice depth perception exercises",
          "Clear extra space around your workspace",
          "Accept that this takes extra time and energy"
        ],
        icon: "📏"
      },
      {
        id: "where-is-body",
        title: "Don't know where your body is in space",
        summary: "You can't tell if your limbs are straight, bent, or where they are without looking.",
        tools: [
          "Use mirrors to check body position",
          "Try proprioceptive activities (weighted blankets, compression clothing)",
          "Practice body awareness exercises (yoga, tai chi)",
          "See an occupational therapist for sensory integration work",
          "Use tactile cues (hand on wall) to orient yourself"
        ],
        icon: "🧍"
      },
      {
        id: "parking-driving",
        title: "Parking and spatial judgement while driving",
        summary: "You can't judge distances when parking or driving in tight spaces.",
        tools: [
          "Use parking sensors or backup cameras",
          "Park in end spots with more space",
          "Practice in empty car parks",
          "Use guide marks or cones when practicing",
          "Consider public transport when possible"
        ],
        icon: "🚗"
      }
    ]
  },
  {
    id: "sports-physical-activity",
    title: "Sports & Physical Activities",
    subtitle: "Catching, throwing, team sports, rhythm",
    didYouKnow: [
      "Timing and rhythm difficulties mean dancing, catching balls, and sports are challenging",
      "School sports can be traumatic for dyspraxic people—your struggles were real",
      "Individual activities often work better than team sports"
    ],
    traits: [
      {
        id: "catching-balls",
        title: "Catching balls is impossible",
        summary: "Your brain can't coordinate eyes, hands, and timing to catch.",
        tools: [
          "Choose non-ball sports (swimming, cycling, walking)",
          "Use larger, softer balls if you want to practice",
          "Try solo activities instead of team sports",
          "Remember: PE trauma was real, not your fault",
          "You don't have to be good at sports to be valid"
        ],
        icon: "⚽"
      },
      {
        id: "sports-humiliation",
        title: "Sports were/are humiliating",
        summary: "Team sports make you feel incompetent and anxious.",
        tools: [
          "Choose individual activities you enjoy (yoga, walking, swimming)",
          "Movement for joy, not performance, is valid",
          "Try gentle exercise like stretching or dance at home",
          "Advocate for PE accommodations if in school",
          "Your worth isn't tied to athletic ability"
        ],
        icon: "🏃"
      },
      {
        id: "rhythm-timing",
        title: "Rhythm and timing are off",
        summary: "Dancing, clapping in time, or coordinating movements to music is hard.",
        tools: [
          "Practice with metronome apps at slow speeds",
          "Try drumming or rhythm games at your own pace",
          "Accept that you might not 'have rhythm'—that's okay",
          "Enjoy music without needing to move to it",
          "Solo dancing at home with no judgement"
        ],
        icon: "🎵"
      }
    ]
  },
  {
    id: "motor-planning",
    title: "Motor Planning & Sequencing",
    subtitle: "Planning movements, learning new skills, multi-step actions",
    didYouKnow: [
      "Dyspraxia affects motor planning—your brain struggles to plan and sequence movements",
      "You might understand instructions but your body can't execute them",
      "Learning new motor skills takes much longer than for neurotypical people"
    ],
    traits: [
      {
        id: "planning-movements",
        title: "Planning and executing movements is hard",
        summary: "Your brain knows what to do but your body won't cooperate.",
        tools: [
          "Break movements into tiny steps",
          "Practice each step separately before combining",
          "Use verbal cues or counting to guide movements",
          "See an occupational therapist for motor planning strategies",
          "Be patient—motor learning takes longer for you"
        ],
        icon: "🧩"
      },
      {
        id: "sequencing-hard",
        title: "Sequencing movements or steps is difficult",
        summary: "Multi-step physical tasks feel overwhelming and confusing.",
        tools: [
          "Write out step-by-step instructions for complex tasks",
          "Use visual guides (photos, diagrams) for sequences",
          "Practice the same routine until it becomes automatic",
          "Ask for demonstrations and extra practice time",
          "Use checklists for physical tasks"
        ],
        icon: "🔢"
      },
      {
        id: "learning-new-skills",
        title: "Learning new physical skills takes forever",
        summary: "Everyone else picks up new activities quickly but you need much more practice.",
        tools: [
          "Accept that you need more repetitions—it's your brain, not effort",
          "Break skills into smaller components",
          "Practice little and often rather than long sessions",
          "Celebrate tiny progress—it counts",
          "Choose activities you enjoy so practice feels less tedious"
        ],
        icon: "🎓"
      }
    ]
  },
  {
    id: "verbal-dyspraxia",
    title: "Verbal Dyspraxia & Speech",
    subtitle: "Speech coordination, pronunciation, mouth movements",
    didYouKnow: [
      "Dyspraxia can affect speech (verbal dyspraxia) and make coordinating mouth movements hard",
      "Verbal dyspraxia is different from stuttering—it's motor planning for speech",
      "Speech therapy can help with verbal dyspraxia"
    ],
    traits: [
      {
        id: "speech-coordination",
        title: "Coordinating mouth movements for speech is hard",
        summary: "You know what you want to say but your mouth won't form the sounds properly.",
        tools: [
          "See a speech and language therapist who understands dyspraxia",
          "Practice speech exercises (tongue twisters, mouth movements)",
          "Slow down your speech—clarity over speed",
          "Use written communication when speech is too effortful",
          "Accept that some sounds or words may always be harder"
        ],
        icon: "🗣️"
      },
      {
        id: "pronunciation-difficult",
        title: "Pronunciation is difficult or inconsistent",
        summary: "You mispronounce words even though you know how they should sound.",
        tools: [
          "Practice difficult words slowly and repeatedly",
          "Use phonetic spelling to guide pronunciation",
          "Don't apologise for mispronunciation—it's neurological",
          "Use alternative words if some are too difficult",
          "Speech therapy can target specific sounds"
        ],
        icon: "🔤"
      },
      {
        id: "eating-drinking",
        title: "Eating and drinking require concentration",
        summary: "Chewing, swallowing, and coordinating eating feels effortful.",
        tools: [
          "Eat slowly and in quiet spaces to focus",
          "Choose foods that are easier to chew and swallow",
          "Use straws for drinks if swallowing liquids is hard",
          "Take small bites and chew thoroughly",
          "See a speech therapist if swallowing is unsafe"
        ],
        icon: "🍽️"
      }
    ]
  },
  {
    id: "organisation-planning",
    title: "Organisation & Executive Function",
    subtitle: "Planning, time management, organisation",
    didYouKnow: [
      "Dyspraxia often comes with organisational and planning difficulties",
      "Executive function struggles overlap with ADHD in many dyspraxic people",
      "Motor planning difficulties extend to mental planning too"
    ],
    traits: [
      {
        id: "organisation-struggles",
        title: "Organisation is a constant struggle",
        summary: "You lose things, forget tasks, and can't keep spaces tidy.",
        tools: [
          "Use labels, clear containers, and designated spots for everything",
          "Digital reminders and alarms for important tasks",
          "Keep duplicates of frequently lost items (keys, phone chargers)",
          "Use checklists and routines to reduce cognitive load",
          "Accept that organisation takes extra effort for you"
        ],
        icon: "📋"
      },
      {
        id: "time-management",
        title: "Time management and planning are hard",
        summary: "You underestimate how long tasks take or lose track of time.",
        tools: [
          "Use visual timers to see time passing",
          "Set alarms for task transitions",
          "Build in buffer time for everything",
          "Break tasks into timed chunks (Pomodoro technique)",
          "Accept that you may need more time than others"
        ],
        icon: "⏰"
      },
      {
        id: "multi-tasking",
        title: "Multi-tasking is overwhelming",
        summary: "Doing more than one thing at once makes everything fall apart.",
        tools: [
          "Focus on one task at a time—mono-tasking is valid",
          "Write down interruptions to return to later",
          "Use noise-cancelling headphones to reduce distractions",
          "Create quiet, focused work periods",
          "Remember: single-tasking is more efficient for you"
        ],
        icon: "🎯"
      }
    ]
  },
  {
    id: "hypermobility-pain",
    title: "Hypermobility & Physical Pain",
    subtitle: "Joint pain, loose joints, fatigue, chronic pain",
    didYouKnow: [
      "Many people with dyspraxia are hypermobile—loose joints make coordination harder",
      "Hypermobility and dyspraxia often co-occur",
      "Joint pain and fatigue from movement are real physical symptoms"
    ],
    traits: [
      {
        id: "hypermobility",
        title: "Hypermobile joints (bend too far)",
        summary: "Your joints are very flexible but unstable and prone to injury.",
        tools: [
          "See a rheumatologist or hypermobility specialist for assessment",
          "Do strengthening exercises to support joints",
          "Avoid overstretching—flexibility isn't always good",
          "Use braces or supports for unstable joints",
          "Learn about Ehlers-Danlos Syndrome (EDS) if relevant"
        ],
        icon: "🦴",
        link: "https://www.hypermobility.org/"
      },
      {
        id: "joint-pain",
        title: "Joint pain and achiness",
        summary: "Your joints hurt regularly, especially after activity.",
        tools: [
          "Rest when you need to—pain is a signal",
          "Use heat pads or ice packs for pain relief",
          "Take pain relief as needed (discuss with GP)",
          "Try gentle movement (swimming, yoga) to strengthen without strain",
          "Pace activities to avoid flare-ups"
        ],
        icon: "💊"
      },
      {
        id: "fatigue-movement",
        title: "Fatigue from movement and coordination",
        summary: "Physical tasks exhaust you more than they should.",
        tools: [
          "Rest after physically demanding tasks",
          "Break activities into smaller chunks with breaks",
          "Use mobility aids (walking stick, wheelchair) if needed",
          "Prioritise energy for essential tasks",
          "Accept that movement costs you more energy"
        ],
        icon: "🔋"
      },
      {
        id: "chronic-pain",
        title: "Chronic pain from poor posture or repetitive strain",
        summary: "Your coordination difficulties lead to long-term pain and injuries.",
        tools: [
          "See a physiotherapist who understands dyspraxia and hypermobility",
          "Use ergonomic furniture and workstation setup",
          "Take regular movement breaks to prevent stiffness",
          "Practice good posture with prompts and reminders",
          "Consider occupational health assessment at work"
        ],
        icon: "🩺"
      }
    ]
  }
];
