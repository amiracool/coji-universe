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
export const dyscalculiaDidYouKnow = [
  "Dyscalculia affects number sense, not intelligence — many have strengths in creative or verbal areas",
  "Visual-spatial strategies can make math concepts more accessible",
  "Dyscalculia often overlaps with dyslexia, but they're distinct learning differences",
  "Multi-sensory math approaches help build number confidence",
  "Real-world contexts make abstract math more meaningful"
];

export const dyscalculiaCategories: Category[] = [
  {
    id: "number-sense",
    title: "Number Sense & Recognition",
    subtitle: "Understanding quantities & number relationships",
    didYouKnow: [
      "Number sense is like phonemic awareness for math",
      "Visual representations help bridge abstract concepts",
      "Subitizing (instant recognition of small quantities) can be practiced"
    ],
    traits: [
      {
        id: "quantity-confusion",
        title: "Difficulty estimating quantities",
        summary: "Comparing amounts or judging 'more than' and 'less than' feels unclear.",
        tools: [
          "Use physical objects to represent numbers",
          "Practice with money and real-world items",
          "Draw visual models (bar models, number lines)",
          "Use estimation jars to develop number sense",
          "Play comparison games with cards or dice"
        ],
        icon: "🔢"
      },
      {
        id: "number-symbols",
        title: "Mixing up number symbols",
        summary: "Numbers like 6 and 9, or 12 and 21 get confused visually.",
        tools: [
          "Color-code similar-looking numbers",
          "Use multisensory writing (sand, clay, finger paint)",
          "Create anchor images for each number",
          "Practice with large tactile numbers",
          "Use number formation rhymes or songs"
        ],
        icon: "6️⃣"
      },
      {
        id: "sequencing",
        title: "Counting sequence struggles",
        summary: "Remembering number order, especially counting backwards.",
        tools: [
          "Use visual number ladders or staircases",
          "Practice skip counting with rhythm",
          "Create personalized number lines to reference",
          "Play games that involve counting (board games)",
          "Use counting songs and rhymes"
        ],
        icon: "📊"
      }
    ]
  },
  {
    id: "arithmetic",
    title: "Arithmetic & Calculation",
    subtitle: "Addition, subtraction, times tables",
    didYouKnow: [
      "Finger counting is a valid math strategy, not something to 'grow out of'",
      "Many successful mathematicians struggle with mental arithmetic",
      "Calculators are accommodations, just like glasses for reading"
    ],
    traits: [
      {
        id: "times-tables",
        title: "Times tables won't stick",
        summary: "Memorizing multiplication facts feels impossible despite practice.",
        tools: [
          "Use multiplication grids as references",
          "Focus on patterns (2s, 5s, 10s first)",
          "Create visual arrays (rows and columns)",
          "Use songs, rhymes, or movement",
          "Allow calculator use for higher-level problems",
          "Practice with skip counting instead of rote"
        ],
        icon: "✖️"
      },
      {
        id: "mental-math",
        title: "Mental math anxiety",
        summary: "Calculating in your head feels overwhelming or slow.",
        tools: [
          "Use jottings or visual models",
          "Break problems into smaller steps",
          "Allow extra time for processing",
          "Use number bonds and part-whole diagrams",
          "Practice with concrete objects first",
          "Try alternative strategies (counting on, compensation)"
        ],
        icon: "🧠"
      },
      {
        id: "borrowing-carrying",
        title: "Borrowing & carrying confusion",
        summary: "Multi-step processes like regrouping are hard to track.",
        tools: [
          "Use color coding for place value",
          "Practice with base-10 blocks",
          "Write out each step explicitly",
          "Use graph paper for alignment",
          "Try expanded form first",
          "Use visual place value charts"
        ],
        icon: "➕"
      }
    ]
  },
  {
    id: "word-problems",
    title: "Word Problems & Application",
    subtitle: "Translating words into math operations",
    didYouKnow: [
      "Language processing and math often overlap in the brain",
      "Breaking word problems into steps reduces overwhelm",
      "Drawing pictures makes abstract problems concrete"
    ],
    traits: [
      {
        id: "word-problem-panic",
        title: "Word problems cause panic",
        summary: "Too much text makes the math feel impossible to extract.",
        tools: [
          "Highlight or underline key information",
          "Draw diagrams or pictures of the scenario",
          "Rewrite in simpler language",
          "Use CUBES strategy (Circle, Underline, Box, Evaluate, Solve)",
          "Break into smaller questions",
          "Practice identifying operation keywords"
        ],
        icon: "📝"
      },
      {
        id: "operation-choice",
        title: "Choosing the wrong operation",
        summary: "Knowing whether to add, subtract, multiply, or divide is unclear.",
        tools: [
          "Create operation keyword lists",
          "Act out problems physically",
          "Use real-world contexts (shopping, cooking)",
          "Try working backwards from the answer",
          "Ask: 'What am I trying to find?'",
          "Use visual models for each operation type"
        ],
        icon: "❓"
      },
      {
        id: "multi-step",
        title: "Multi-step problems overwhelm",
        summary: "Keeping track of multiple operations in sequence is exhausting.",
        tools: [
          "Number each step clearly",
          "Solve one step at a time, write it down",
          "Use flowcharts or checklists",
          "Color-code different operations",
          "Check each step before moving forward",
          "Break into separate mini-problems"
        ],
        icon: "🪜"
      }
    ]
  },
  {
    id: "time-money",
    title: "Time & Money",
    subtitle: "Real-world math applications",
    didYouKnow: [
      "Analog clocks require multiple skills at once (sequencing, spatial, memory)",
      "Digital tools are valid supports for time management",
      "Money math is one of the most practical skills to prioritize"
    ],
    traits: [
      {
        id: "telling-time",
        title: "Telling time on analog clocks",
        summary: "Reading clock faces with hands feels confusing or slow.",
        tools: [
          "Use digital clocks as primary reference",
          "Practice with geared learning clocks",
          "Focus on 'quarter past/to' language",
          "Use time timers for visual countdowns",
          "Learn digital time first, analog later",
          "Color-code hour and minute hands"
        ],
        icon: "🕐"
      },
      {
        id: "elapsed-time",
        title: "Calculating elapsed time",
        summary: "Working out how long something took or will take is hard.",
        tools: [
          "Use number lines for time jumps",
          "Draw timeline diagrams",
          "Count forward in chunks (hours, then minutes)",
          "Use visual schedules with time blocks",
          "Practice with real events (TV shows, meals)",
          "Try countdown timers for concrete reference"
        ],
        icon: "⏱️"
      },
      {
        id: "money-counting",
        title: "Counting money & making change",
        summary: "Combining coins or calculating change causes confusion.",
        tools: [
          "Sort coins by type first",
          "Practice counting up from purchase price",
          "Use coin value charts for reference",
          "Round to nearest dollar for estimation",
          "Use apps that simulate cash transactions",
          "Start with notes/bills before coins"
        ],
        icon: "💰"
      }
    ]
  },
  {
    id: "spatial-geometry",
    title: "Spatial Reasoning & Geometry",
    subtitle: "Shapes, measurement, directions",
    didYouKnow: [
      "Spatial skills can be strengths for some with dyscalculia",
      "Hands-on geometry activities build understanding",
      "Mental rotation tasks are separate from calculation ability"
    ],
    traits: [
      {
        id: "left-right",
        title: "Left-right confusion",
        summary: "Directional language feels unreliable or needs extra thought.",
        tools: [
          "Use physical markers (watch, bracelet)",
          "Practice with 'your left/my left' explicitly",
          "Use visual arrows or labels in space",
          "Try kinesthetic learning (turn your body)",
          "Write L and R on hands when needed",
          "Use landmarks instead of directions"
        ],
        icon: "↔️"
      },
      {
        id: "measurement",
        title: "Measurement & units",
        summary: "Reading rulers, converting units, or estimating lengths is hard.",
        tools: [
          "Use pre-marked rulers with clear increments",
          "Practice with real objects (hand spans, steps)",
          "Create conversion charts for reference",
          "Focus on one unit system at a time",
          "Use digital measuring tools when available",
          "Practice estimation with familiar objects"
        ],
        icon: "📏"
      },
      {
        id: "geometry-vocabulary",
        title: "Geometry vocabulary confusion",
        summary: "Terms like 'parallel,' 'perpendicular,' or 'acute' are hard to recall.",
        tools: [
          "Create visual vocabulary cards",
          "Use color coding for different concepts",
          "Build shapes with manipulatives",
          "Create anchor charts with examples",
          "Use gestures or movements for terms",
          "Practice in real-world contexts (architecture)"
        ],
        icon: "△"
      }
    ]
  },
  {
    id: "memory-processing",
    title: "Working Memory & Processing",
    subtitle: "Mental load and cognitive demands",
    didYouKnow: [
      "Working memory challenges are core to dyscalculia",
      "Offloading information onto paper reduces cognitive load",
      "Processing speed doesn't reflect mathematical understanding"
    ],
    traits: [
      {
        id: "mental-overload",
        title: "Mental calculations cause overload",
        summary: "Holding numbers in mind while calculating feels impossible.",
        tools: [
          "Write everything down immediately",
          "Use scratch paper liberally",
          "Break into tiny steps",
          "Allow calculator use",
          "Reduce number of steps in problems",
          "Use visual organizers (grids, tables)"
        ],
        icon: "🤯"
      },
      {
        id: "formula-recall",
        title: "Forgetting formulas or procedures",
        summary: "Even practiced methods slip away when you need them.",
        tools: [
          "Keep formula sheets accessible",
          "Create personalized reference cards",
          "Use the same method consistently",
          "Practice retrieval, not just recognition",
          "Connect formulas to visual models",
          "Teach formulas to someone else to embed"
        ],
        icon: "📐"
      },
      {
        id: "timed-tests",
        title: "Timed tests cause panic",
        summary: "Pressure to work quickly makes everything harder.",
        tools: [
          "Request extended time accommodations",
          "Practice with untimed problems first",
          "Use relaxation techniques before tests",
          "Focus on accuracy over speed",
          "Break tests into smaller chunks",
          "Advocate for alternative assessment formats"
        ],
        icon: "⏰"
      }
    ]
  },
  {
    id: "emotional-support",
    title: "Math Anxiety & Confidence",
    subtitle: "Building a positive relationship with numbers",
    didYouKnow: [
      "Math anxiety is real and impacts performance",
      "Many brilliant people struggle with math",
      "Mistakes are part of the learning process, not failures"
    ],
    traits: [
      {
        id: "math-anxiety",
        title: "Math triggers anxiety or shutdown",
        summary: "Even seeing numbers can cause stress or avoidance.",
        tools: [
          "Practice growth mindset language",
          "Celebrate effort over correct answers",
          "Use low-stakes, playful math activities",
          "Take breaks when frustration builds",
          "Connect math to personal interests",
          "Work with supportive tutors or peers"
        ],
        icon: "😰"
      },
      {
        id: "comparison",
        title: "Comparing to peers",
        summary: "Feeling 'behind' or 'slower' than classmates hurts confidence.",
        tools: [
          "Focus on personal progress, not others",
          "Track your own growth over time",
          "Find math role models with similar challenges",
          "Celebrate small wins regularly",
          "Remember: speed ≠ understanding",
          "Seek out strengths-based learning environments"
        ],
        icon: "📈"
      },
      {
        id: "giving-up",
        title: "Giving up too quickly",
        summary: "Frustration leads to 'I can't do this' thoughts.",
        tools: [
          "Add 'yet' to negative statements",
          "Break tasks into achievable micro-goals",
          "Use visual progress trackers",
          "Practice self-compassion",
          "Build in success experiences",
          "Remind yourself of past math wins"
        ],
        icon: "💪"
      }
    ]
  },
  {
    id: "accommodations",
    title: "School & Workplace Accommodations",
    subtitle: "Support strategies and tools",
    didYouKnow: [
      "Accommodations level the playing field, they're not 'cheating'",
      "Technology can bypass barriers to show true understanding",
      "Self-advocacy is a crucial skill to develop"
    ],
    traits: [
      {
        id: "calculator-use",
        title: "Calculator access",
        summary: "Using calculators for arithmetic frees up brain space for concepts.",
        tools: [
          "Request calculator accommodations",
          "Learn calculator functions thoroughly",
          "Use talking calculators if helpful",
          "Practice estimation first, then verify",
          "Use calculator for multi-step problems",
          "Focus learning on concepts, not computation"
        ],
        icon: "🔢"
      },
      {
        id: "extra-time",
        title: "Extended time on tests",
        summary: "Processing numbers takes longer and shouldn't be penalized.",
        tools: [
          "Request formal extended time (1.5x or 2x)",
          "Take tests in quiet, low-pressure environments",
          "Use time for checking work carefully",
          "Break tests into multiple sessions if allowed",
          "Practice pacing with extended time",
          "Advocate for untimed assessments when appropriate"
        ],
        icon: "⏳"
      },
      {
        id: "assistive-tech",
        title: "Assistive technology",
        summary: "Apps, software, and tools can support math learning.",
        tools: [
          "Use math apps with visual representations",
          "Try speech-to-text for word problems",
          "Use graphing calculators or software",
          "Explore virtual manipulatives",
          "Use text-to-speech for reading problems",
          "Try specialized dyscalculia apps and games"
        ],
        links: [
          { label: "ModMath (handwriting support)", href: "#" },
          { label: "Photomath (step-by-step solutions)", href: "#" }
        ],
        icon: "💻"
      },
      {
        id: "alternative-formats",
        title: "Alternative assessment formats",
        summary: "Showing understanding through projects, oral explanations, or portfolios.",
        tools: [
          "Request project-based assessments",
          "Explain thinking verbally instead of written",
          "Create visual demonstrations of concepts",
          "Use portfolios to show growth over time",
          "Try hands-on practical assessments",
          "Negotiate modified success criteria with teachers"
        ],
        icon: "🎨"
      }
    ]
  }
];
