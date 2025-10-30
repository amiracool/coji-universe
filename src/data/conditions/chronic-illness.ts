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
export const chronicIllnessDidYouKnow = [
  "Chronic illness is often invisible—you don't 'look sick' but you're still genuinely ill",
  "Spoon theory helps explain limited energy: you start each day with limited 'spoons'",
  "Pacing (balancing activity and rest) prevents boom-bust cycles",
  "Post-exertional malaise (PEM) means activity makes you worse days later—not immediately",
  "Chronic pain and fatigue are real, physical symptoms—not 'in your head'",
  "Rest is not laziness—it's medical management",
  "Your illness is real even if doctors haven't found answers yet"
];

export const chronicIllnessCategories: Category[] = [
  {
    id: "energy-management",
    title: "Energy Management & Pacing",
    subtitle: "Spoon theory, boom-bust cycles, activity planning",
    didYouKnow: [
      "Spoon theory helps explain that you start each day with limited energy 'spoons'",
      "Pacing prevents the boom-bust cycle where you do too much and crash",
      "Energy accounting (tracking what depletes/replenishes you) helps manage limited capacity"
    ],
    traits: [
      {
        id: "chronic-fatigue",
        title: "Chronic fatigue and no energy",
        summary: "You wake up exhausted and everything depletes your limited energy.",
        tools: [
          "Use spoon theory to explain your energy limits to others",
          "Track your energy levels in a diary to identify patterns",
          "Rest before you're completely depleted, not after",
          "Accept that rest is medical management, not laziness",
          "Plan one main activity per day maximum during flares"
        ],
        icon: "🔋"
      },
      {
        id: "pacing",
        title: "Pacing is hard but essential",
        summary: "Balancing activity and rest to avoid crashes feels impossible.",
        tools: [
          "Break tasks into 5-10 minute chunks with rest between",
          "Use timers to remind you to stop and rest",
          "Plan activities around your energy peaks (often mornings)",
          "Say no to activities that will cost too many spoons",
          "Build in rest days after planned activities"
        ],
        icon: "⏱️"
      },
      {
        id: "boom-bust-cycle",
        title: "Boom-bust cycle (do too much, then crash)",
        summary: "On good days you overdo it, then pay for it with a flare-up.",
        tools: [
          "Set limits on good days—don't do everything at once",
          "Keep a baseline activity level even on good days",
          "Track crashes to identify your activity triggers",
          "Ask someone to help you pace if you can't do it yourself",
          "Remember: consistency beats intensity"
        ],
        icon: "📉"
      },
      {
        id: "post-exertional-malaise",
        title: "Post-exertional malaise (PEM)",
        summary: "Activity makes you worse 24-72 hours later, not immediately.",
        tools: [
          "Learn your PEM threshold and stay well below it",
          "Track delayed symptoms to identify PEM triggers",
          "Rest immediately after unavoidable exertion",
          "Explain PEM to doctors—many don't understand it",
          "Advocate for accommodations that prevent PEM"
        ],
        icon: "⚠️"
      },
      {
        id: "energy-accounting",
        title: "Energy accounting and planning",
        summary: "Tracking what depletes and replenishes your energy.",
        tools: [
          "Use an energy diary or app to track spoons used/gained",
          "Identify which activities are worth the energy cost",
          "Notice what replenishes you (not always rest—sometimes joy)",
          "Plan ahead for high-energy events (doctor visits, social events)",
          "Be honest about what you can't afford energetically"
        ],
        icon: "📊"
      }
    ]
  },
  {
    id: "pain-management",
    title: "Pain Management",
    subtitle: "Chronic pain, flare-ups, pain relief strategies",
    didYouKnow: [
      "Chronic pain is real, physical pain—not 'in your head' or psychosomatic",
      "Pain doesn't always have a visible cause but it's still valid",
      "Pain management is about reducing pain, not eliminating it entirely"
    ],
    traits: [
      {
        id: "chronic-pain",
        title: "Chronic pain that never stops",
        summary: "Pain is your constant companion, varying in intensity but always there.",
        tools: [
          "Use heat pads, ice packs, or alternating hot/cold",
          "Try TENS machines for drug-free pain relief",
          "Gentle movement can help—but respect your limits",
          "Medication management with GP or pain clinic",
          "Track pain levels to identify triggers and patterns"
        ],
        icon: "💊"
      },
      {
        id: "flare-ups",
        title: "Flare-ups and unpredictable symptoms",
        summary: "Your symptoms suddenly worsen for days or weeks at a time.",
        tools: [
          "Create a flare-up emergency kit (comfort items, medications, ready meals)",
          "Lower all expectations during flares—survival mode is valid",
          "Track flare-ups to identify triggers (weather, stress, activity)",
          "Tell loved ones what helps during flares",
          "Remember: flare-ups don't mean you've failed"
        ],
        icon: "🔥"
      },
      {
        id: "pain-management-strategies",
        title: "Pain management strategies",
        summary: "Finding what helps reduce or manage your pain levels.",
        tools: [
          "Try distraction techniques (audiobooks, gentle games, TV)",
          "Use relaxation breathing to reduce pain tension",
          "Adjust positioning regularly—support with cushions",
          "Consider pain management programs or physiotherapy",
          "Explore gentle movement (swimming, chair yoga) when possible"
        ],
        icon: "🧘"
      }
    ]
  },
  {
    id: "medical-system",
    title: "Navigating the Medical System",
    subtitle: "Doctors, appointments, advocacy, medical trauma",
    didYouKnow: [
      "Medical gaslighting is real—many chronically ill people are dismissed by doctors",
      "You are the expert on your own body and symptoms",
      "It's okay to change doctors if they don't listen or believe you"
    ],
    traits: [
      {
        id: "medical-gaslighting",
        title: "Medical gaslighting and being dismissed",
        summary: "Doctors tell you it's anxiety, in your head, or just need to exercise more.",
        tools: [
          "Keep a detailed symptom diary to show doctors",
          "Bring a support person to appointments for advocacy",
          "Ask for notes to be added if doctor dismisses you",
          "Seek second opinions—you deserve to be believed",
          "Find patient advocacy groups for your condition"
        ],
        icon: "🩺"
      },
      {
        id: "medical-appointments-exhausting",
        title: "Medical appointments are exhausting",
        summary: "The travel, waiting, explaining, and advocacy drain all your energy.",
        tools: [
          "Schedule appointments at your best time of day",
          "Rest before and after appointments",
          "Prepare notes beforehand so you don't forget points",
          "Request phone or video appointments when possible",
          "Ask for help with transport if travel is too exhausting"
        ],
        icon: "🏥"
      },
      {
        id: "advocating-for-yourself",
        title: "Advocating for yourself is hard",
        summary: "Explaining symptoms, requesting tests, and pushing for answers is exhausting.",
        tools: [
          "Write down your key points before appointments",
          "Use phrases like 'I need this documented' if dismissed",
          "Bring research or guidelines if helpful",
          "Join condition-specific support groups for advice",
          "Consider a healthcare advocate if you struggle alone"
        ],
        icon: "📋"
      },
      {
        id: "treatment-decisions",
        title: "Treatment decisions and medication management",
        summary: "Weighing side effects, trying new treatments, managing multiple medications.",
        tools: [
          "Use a pill organiser to track daily medications",
          "Set phone alarms for medication times",
          "Keep a medication side effects diary",
          "Research treatments but don't let it overwhelm you",
          "It's okay to refuse treatments that don't feel right"
        ],
        icon: "💉"
      }
    ]
  },
  {
    id: "invisible-illness",
    title: "Invisible Illness & Being Believed",
    subtitle: "Looking fine, explaining yourself, proving you're ill",
    didYouKnow: [
      "Chronic illness is often invisible—you don't 'look sick' but you're still genuinely ill",
      "You don't owe anyone an explanation or proof of your illness",
      "Good days don't invalidate bad days—fluctuation is part of chronic illness"
    ],
    traits: [
      {
        id: "invisible-illness",
        title: "Invisible illness—'but you don't look sick'",
        summary: "People don't believe you're ill because you look healthy.",
        tools: [
          "You don't owe anyone explanations about your illness",
          "Use analogies (spoon theory, phone battery) to explain",
          "Set boundaries with people who question your illness",
          "Connect with others who understand invisible illness",
          "Remember: you know your body, they don't"
        ],
        icon: "👁️"
      },
      {
        id: "good-days-bad-days",
        title: "Good days and bad days confuse people",
        summary: "You can do something one day but not the next, and people don't understand.",
        tools: [
          "Explain fluctuation: 'My illness changes day to day'",
          "Don't feel guilty for having good days",
          "Don't push through on bad days to 'prove' your illness",
          "Use your good days wisely—but don't overdo it",
          "Block out people who use good days against you"
        ],
        icon: "📅"
      },
      {
        id: "guilt-about-resting",
        title: "Guilt about resting and not being productive",
        summary: "You feel lazy or worthless when you rest, even though you need it.",
        tools: [
          "Remind yourself: rest is medical management, not laziness",
          "Redefine productivity—resting is productive for your health",
          "Challenge the voice that says you're not doing enough",
          "Unfollow productivity content that makes you feel worse",
          "Celebrate small wins—getting through the day is enough"
        ],
        icon: "🛌"
      }
    ]
  },
  {
    id: "cognitive-symptoms",
    title: "Brain Fog & Cognitive Symptoms",
    subtitle: "Memory, concentration, thinking clearly",
    didYouKnow: [
      "Brain fog is a real symptom of many chronic illnesses, not just tiredness",
      "Cognitive dysfunction can be as disabling as physical symptoms",
      "Brain fog often worsens with physical exertion or flare-ups"
    ],
    traits: [
      {
        id: "brain-fog",
        title: "Brain fog and cognitive dysfunction",
        summary: "Your thinking is slow, fuzzy, and you can't process information properly.",
        tools: [
          "Use external memory aids (notes, alarms, lists)",
          "Simplify tasks when brain fog is bad",
          "Rest your brain—reduce sensory input and decisions",
          "Accept you can't think clearly during flares",
          "Don't make important decisions during brain fog"
        ],
        icon: "🌫️"
      },
      {
        id: "memory-problems",
        title: "Memory problems and forgetting everything",
        summary: "You forget conversations, tasks, and what you were doing constantly.",
        tools: [
          "Use your phone for everything (reminders, notes, voice memos)",
          "Write things down immediately—don't trust you'll remember",
          "Use visual reminders (sticky notes, objects in odd places)",
          "Ask people to send written messages, not just verbal",
          "Be kind to yourself—it's your illness, not your fault"
        ],
        icon: "🧠"
      },
      {
        id: "word-finding",
        title: "Word-finding difficulties and speech problems",
        summary: "You can't find words, lose your train of thought mid-sentence.",
        tools: [
          "Pause and take your time—don't rush to speak",
          "Use hand gestures or descriptions when words won't come",
          "Accept that brain fog affects speech too",
          "Use written communication when verbal is too hard",
          "People who care will wait for you to find the words"
        ],
        icon: "💬"
      }
    ]
  },
  {
    id: "emotional-impact",
    title: "Emotional Impact & Grief",
    subtitle: "Loss, identity, isolation, mental health",
    didYouKnow: [
      "Grief for your pre-illness life is real and deserves space",
      "You're allowed to grieve your old life whilst building a new one",
      "Depression and anxiety are common with chronic illness—it's not weakness"
    ],
    traits: [
      {
        id: "grief-for-old-life",
        title: "Grief for your old life and identity loss",
        summary: "You mourn the person you were before illness changed everything.",
        tools: [
          "Allow yourself to grieve—it's a valid response to loss",
          "Talk to a therapist who understands chronic illness",
          "Connect with others experiencing similar losses",
          "Explore new identities and interests within your limits",
          "Remember: you're still you, even if life looks different"
        ],
        icon: "💔"
      },
      {
        id: "isolation",
        title: "Isolation and losing friendships",
        summary: "You can't keep up with social life and people drift away.",
        tools: [
          "Find online communities of people with chronic illness",
          "Communicate your needs to friends who care",
          "Accept that some people won't understand—let them go",
          "Suggest low-energy activities (video calls, sitting together)",
          "Quality friendships matter more than quantity"
        ],
        icon: "🏝️"
      },
      {
        id: "cancelled-plans",
        title: "Cancelled plans and unreliable body",
        summary: "You commit to things but have to cancel last-minute when you crash.",
        tools: [
          "Be upfront: 'I may need to cancel on the day'",
          "Suggest flexible plans (at home, easy to reschedule)",
          "Don't over-commit—say no more often",
          "Keep a small circle of people who understand cancellations",
          "Release guilt—your body is unpredictable, not your fault"
        ],
        icon: "📆"
      },
      {
        id: "fear-of-worsening",
        title: "Fear of worsening or never improving",
        summary: "You worry your condition will deteriorate or you'll never feel better.",
        tools: [
          "Focus on what you can control (pacing, management, support)",
          "Take it day by day—don't project too far into the future",
          "Connect with people living well with chronic illness",
          "Talk to a therapist about health anxiety",
          "Remember: many people adapt and find new normal"
        ],
        icon: "😟"
      }
    ]
  },
  {
    id: "adaptive-equipment",
    title: "Mobility Aids & Adaptive Equipment",
    subtitle: "Wheelchairs, walking aids, assistive devices",
    didYouKnow: [
      "Mobility aids give you freedom, not take it away",
      "You don't have to be 'disabled enough' to use aids—if they help, use them",
      "Many chronically ill people use aids part-time or on bad days only"
    ],
    traits: [
      {
        id: "mobility-aids",
        title: "Mobility aids (wheelchair, walking stick, crutches)",
        summary: "You need help moving but worry about judgement or 'not being disabled enough'.",
        tools: [
          "If an aid helps you, you're 'disabled enough' to use it",
          "Part-time wheelchair use is valid—ambulatory wheelchair users exist",
          "Walking sticks/crutches can prevent falls and reduce pain",
          "Ignore judgement from strangers—they don't know your body",
          "Mobility aids give you freedom to do more, not less"
        ],
        icon: "🦽",
        link: "https://www.motability.co.uk/"
      },
      {
        id: "adaptive-equipment",
        title: "Adaptive equipment for daily tasks",
        summary: "Jar openers, sock aids, reaching tools make life easier.",
        tools: [
          "Use jar openers, electric can openers, pre-cut vegetables",
          "Try sock aids, shoe horns, dressing sticks for getting dressed",
          "Use reaching tools to avoid bending or stretching",
          "Consider shower chairs, raised toilet seats, grab rails",
          "Occupational therapy can assess and recommend equipment"
        ],
        icon: "🔧"
      },
      {
        id: "gentle-movement",
        title: "Gentle movement and physiotherapy",
        summary: "Moving helps but it has to respect your limits, not push through.",
        tools: [
          "Find a physio who understands chronic illness and pacing",
          "Gentle movement (chair yoga, slow walking, swimming) can help",
          "Stop if it makes you worse—'push through' doesn't work",
          "Movement should feel manageable, not exhausting",
          "Rest days are part of any movement plan"
        ],
        icon: "🧘",
        link: "https://www.nhs.uk/conditions/chronic-fatigue-syndrome-cfs/"
      }
    ]
  },
  {
    id: "daily-living",
    title: "Daily Living & Practical Support",
    subtitle: "Self-care, household tasks, asking for help",
    didYouKnow: [
      "Asking for help isn't failure—it's adapting to your reality",
      "Many chronic illnesses have no cure—learning to live well with illness is valid",
      "Lowering standards isn't giving up—it's surviving"
    ],
    traits: [
      {
        id: "self-care-impossible",
        title: "Self-care feels impossible",
        summary: "Showering, brushing teeth, and basic hygiene drain all your energy.",
        tools: [
          "Dry shampoo, body wipes, and 'good enough' hygiene count",
          "Shower chairs, grab rails, and sitting down help conserve energy",
          "Break tasks down (wash hair one day, body the next)",
          "Lower standards—clean enough is good enough",
          "Ask for help with tasks that are too exhausting"
        ],
        icon: "🚿"
      },
      {
        id: "household-tasks",
        title: "Household tasks are overwhelming",
        summary: "Cooking, cleaning, laundry pile up and you can't keep up.",
        tools: [
          "Use ready meals, delivery, or ask others to cook",
          "Clean one small thing per day—that's enough",
          "Use paper plates and disposables to reduce washing up",
          "Hire help if you can afford it (cleaners, meal prep)",
          "Lower standards—a messy house is okay"
        ],
        icon: "🧹"
      },
      {
        id: "asking-for-help",
        title: "Asking for help feels like failure",
        summary: "You struggle alone because you feel you should cope independently.",
        tools: [
          "Asking for help is adapting to reality, not failing",
          "Be specific when asking: 'Can you cook dinner Tuesday?'",
          "Accept help when offered—people want to support you",
          "Look into formal support (carers, benefits, equipment)",
          "You deserve help—chronic illness is hard"
        ],
        icon: "🤝"
      },
      {
        id: "benefits-support",
        title: "Accessing benefits and support",
        summary: "Navigating PIP, ESA, or other benefits feels impossible.",
        tools: [
          "Contact Citizens Advice for benefits application help",
          "Use condition-specific charities for support and guidance",
          "Be detailed in applications—describe your worst days",
          "Ask your GP for supporting medical evidence",
          "Consider appealing rejections—many succeed on appeal"
        ],
        icon: "💷",
        link: "https://www.citizensadvice.org.uk/"
      }
    ]
  }
];
