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
export const dyslexiaDyscalculiaDidYouKnow = [
  "Dyslexia affects about 10% of the population—you're not alone",
  "Dyslexic brains often excel at big-picture thinking, creativity, and problem-solving",
  "Reading difficulty doesn't mean low intelligence—dyslexia is a processing difference",
  "Dyscalculia is 'dyslexia for maths'—number sense difficulties are real",
  "Audio books 'count' as reading—absorbing stories matters, not how you do it",
  "Assistive technology (text-to-speech, speech-to-text) is a tool, not 'cheating'",
  "Your brain works differently—schools often aren't set up for you, but that's their failing, not yours"
];

export const dyslexiaDyscalculiaCategories: Category[] = [
  {
    id: "reading-decoding",
    title: "Reading & Decoding",
    subtitle: "Letter recognition, word decoding, reading fluency",
    didYouKnow: [
      "Many dyslexic people see letters/numbers moving, swapping, or jumping",
      "Reading difficulty is a processing difference, not an intelligence issue",
      "Phonics approaches don't work the same way for dyslexic brains"
    ],
    traits: [
      {
        id: "letters-move",
        title: "Letters move or swim on the page",
        summary: "Text appears to shift, blur, or move when you try to read.",
        tools: [
          "Use coloured overlays or tinted glasses to reduce visual stress",
          "Adjust screen brightness and background colour (cream or pale blue often helps)",
          "Try OpenDyslexic font or other dyslexia-friendly fonts",
          "Use a reading ruler or finger to track lines",
          "Take frequent breaks—visual stress is exhausting"
        ],
        icon: "👁️"
      },
      {
        id: "slow-reading",
        title: "Reading is slow and exhausting",
        summary: "You can read, but it takes enormous effort and energy.",
        tools: [
          "Use text-to-speech tools (Immersive Reader, NaturalReader, Voice Dream)",
          "Listen to audiobooks—absorption matters, not method",
          "Read in short bursts with breaks",
          "Preview headings and summaries before reading full text",
          "Don't force yourself to finish books—it's okay to stop"
        ],
        icon: "🐢",
        link: "https://www.naturalreaders.com/"
      },
      {
        id: "comprehension-problems",
        title: "Comprehension lags behind decoding",
        summary: "You can read the words aloud but struggle to understand meaning.",
        tools: [
          "Read aloud or listen while reading—dual input helps",
          "Summarise each paragraph in your own words",
          "Use visual aids—diagrams, mind maps, illustrations",
          "Re-read important sections multiple times without shame",
          "Discuss what you read with someone to check understanding"
        ],
        icon: "🤔"
      },
      {
        id: "reversing-letters",
        title: "Reversing letters (b/d, p/q confusion)",
        summary: "Certain letters look identical and you mix them up constantly.",
        tools: [
          "Use mnemonic tricks (b has a belly, d has a dog tail)",
          "Trace letters in sand, playdough, or on textured surfaces",
          "Practice with physical letter tiles you can rotate",
          "Use colour coding for commonly confused letters",
          "Be patient—this improves with age and practice"
        ],
        icon: "🔄"
      }
    ]
  },
  {
    id: "writing-spelling",
    title: "Writing & Spelling",
    subtitle: "Spelling accuracy, handwriting, written expression",
    didYouKnow: [
      "You can be highly articulate verbally but struggle to write—it's the processing, not the thinking",
      "Handwriting difficulties are often linked to dyslexia and dyspraxia",
      "Spelling struggles don't reflect your vocabulary or intelligence"
    ],
    traits: [
      {
        id: "spelling-impossible",
        title: "Spelling feels impossible",
        summary: "You know the word but can't spell it—even simple, familiar words.",
        tools: [
          "Use speech-to-text (Dragon, Google Docs Voice Typing, built-in phone features)",
          "Install browser spell-checkers (Grammarly, LanguageTool)",
          "Create a personal spelling dictionary of commonly used words",
          "Use predictive text and autocorrect without shame",
          "Remember: spelling is a skill, not a measure of intelligence"
        ],
        icon: "✍️",
        link: "https://www.nuance.com/dragon.html"
      },
      {
        id: "handwriting-messy",
        title: "Handwriting is messy or painful",
        summary: "Your writing is hard to read, and your hand hurts after writing.",
        tools: [
          "Use a laptop or tablet for written work",
          "Try different pen grips or ergonomic pens",
          "Request a scribe for exams or important documents",
          "Practice typing instead—it's a valid alternative",
          "Use lined or graph paper to guide letter formation"
        ],
        icon: "📝"
      },
      {
        id: "writing-organisation",
        title: "Organising written work is hard",
        summary: "You have ideas but can't structure them on paper.",
        tools: [
          "Use mind maps or bullet points before writing",
          "Dictate your ideas first, then organise later",
          "Use writing templates or paragraph frames",
          "Break tasks into: brainstorm → outline → draft → edit",
          "Ask for help structuring—collaboration is valid"
        ],
        icon: "🗂️"
      }
    ]
  },
  {
    id: "number-sense-maths",
    title: "Number Sense & Maths (Dyscalculia)",
    subtitle: "Number recognition, calculation, mathematical reasoning",
    didYouKnow: [
      "Dyscalculia can make telling time, handling money, and measuring difficult",
      "Times tables don't stick for many dyscalculic brains—it's not laziness",
      "Number sense difficulties are real and deserve accommodation"
    ],
    traits: [
      {
        id: "times-tables",
        title: "Can't memorise times tables",
        summary: "Multiplication facts won't stick no matter how many times you practice.",
        tools: [
          "Use a times table chart or calculator without shame",
          "Learn patterns instead of memorising (e.g., 5s end in 0 or 5)",
          "Use skip counting or rhythmic songs",
          "Focus on understanding multiplication concepts, not memorisation",
          "Remember: calculators exist for a reason"
        ],
        icon: "✖️"
      },
      {
        id: "number-reversals",
        title: "Number reversals (writing 24 as 42)",
        summary: "You know the number but write or say the digits backwards.",
        tools: [
          "Say numbers aloud as you write them",
          "Use place value charts (hundreds, tens, ones)",
          "Write numbers in expanded form (24 = 20 + 4)",
          "Double-check written numbers before submitting work",
          "Use graph paper to keep digits aligned"
        ],
        icon: "🔢"
      },
      {
        id: "telling-time",
        title: "Telling time is confusing",
        summary: "Analogue clocks don't make sense, and calculating time differences is hard.",
        tools: [
          "Use digital clocks and timers",
          "Set phone alarms with labels instead of calculating time",
          "Use visual schedules with exact times written out",
          "Practice with online analogue clock games at your own pace",
          "It's okay to use digital—time is time"
        ],
        icon: "⏰"
      },
      {
        id: "money-management",
        title: "Handling money and making change is stressful",
        summary: "Counting coins, calculating totals, and giving change feels overwhelming.",
        tools: [
          "Use contactless payment to avoid counting cash",
          "Use a calculator for totals and change",
          "Practice with play money in low-pressure settings",
          "Round prices up mentally for rough estimates",
          "Ask for help at tills—it's okay"
        ],
        icon: "💰"
      },
      {
        id: "maths-anxiety",
        title: "Maths causes severe anxiety",
        summary: "Even simple maths tasks trigger panic and brain fog.",
        tools: [
          "Take deep breaths before starting—anxiety blocks thinking",
          "Break problems into tiny steps",
          "Use manipulatives (blocks, counters) to visualise",
          "Request extra time and private space for maths work",
          "Challenge the belief that you're 'bad at maths'—it's a processing difference"
        ],
        icon: "😰"
      }
    ]
  },
  {
    id: "working-memory",
    title: "Working Memory & Sequencing",
    subtitle: "Remembering instructions, following steps, processing information",
    didYouKnow: [
      "Dyslexia affects working memory—you might forget instructions immediately",
      "Sequencing difficulties affect reading, writing, and maths",
      "Working memory struggles are a core feature, not a personal failing"
    ],
    traits: [
      {
        id: "instructions-forgotten",
        title: "Instructions vanish from your mind immediately",
        summary: "You're told what to do but forget before you start.",
        tools: [
          "Ask for written instructions or diagrams",
          "Repeat instructions back to confirm understanding",
          "Use voice memos to record instructions",
          "Break multi-step tasks into single steps",
          "Don't apologise for asking again—it's your brain, not your attitude"
        ],
        icon: "💭"
      },
      {
        id: "sequencing-problems",
        title: "Remembering sequences or steps is hard",
        summary: "Following recipes, directions, or routines in order feels impossible.",
        tools: [
          "Use visual step-by-step guides (flowcharts, numbered lists)",
          "Practice with the same routine until it becomes automatic",
          "Use checklists and tick off each step",
          "Take photos of each step for complex tasks",
          "Ask for help breaking tasks into smaller chunks"
        ],
        icon: "🔢"
      }
    ]
  },
  {
    id: "processing-speed",
    title: "Processing Speed",
    subtitle: "Reading speed, response time, information processing",
    didYouKnow: [
      "Slow processing speed doesn't mean slow thinking—it's about how your brain accesses information",
      "Many dyslexic brains excel at deep thinking but struggle with timed tasks",
      "Extra time isn't an unfair advantage—it levels the playing field"
    ],
    traits: [
      {
        id: "reading-exhausting",
        title: "Reading drains all your energy",
        summary: "After reading, you're mentally exhausted and need to recover.",
        tools: [
          "Schedule reading time with built-in breaks",
          "Use audiobooks or text-to-speech to reduce cognitive load",
          "Accept that you may read less or slower—quality over quantity",
          "Read in quiet spaces with minimal distractions",
          "Rest after reading—it's legitimate work"
        ],
        icon: "🔋"
      },
      {
        id: "timed-tests",
        title: "Timed tests cause panic and blanking",
        summary: "Time pressure makes your brain freeze completely.",
        tools: [
          "Request extra time accommodations (usually 25-50% more)",
          "Practice timed tasks in low-stakes environments",
          "Use timed breaks (work 10 mins, rest 2 mins)",
          "Focus on answering what you know first",
          "Remember: timed tests measure speed, not ability"
        ],
        icon: "⏱️"
      }
    ]
  },
  {
    id: "visual-stress",
    title: "Visual Stress & Screen Fatigue",
    subtitle: "Light sensitivity, visual discomfort, screen glare",
    didYouKnow: [
      "Overlays (coloured filters) genuinely help some people with visual stress",
      "Visual stress is physical discomfort, not 'just complaining'",
      "Certain fonts and spacing genuinely make text more readable"
    ],
    traits: [
      {
        id: "screen-glare",
        title: "Screen glare or white backgrounds hurt",
        summary: "Bright screens cause headaches, eye strain, or visual distortion.",
        tools: [
          "Use dark mode or sepia backgrounds",
          "Install blue light filters or use blue light glasses",
          "Adjust screen brightness to match ambient lighting",
          "Use the 20-20-20 rule (every 20 mins, look 20 feet away for 20 seconds)",
          "Increase text size and use dyslexia-friendly fonts"
        ],
        icon: "💡",
        link: "https://www.opendyslexic.org/"
      },
      {
        id: "coloured-overlays",
        title: "Coloured overlays reduce visual stress",
        summary: "Text is easier to read with a coloured filter over it.",
        tools: [
          "Try Irlen overlays or coloured reading rulers",
          "Experiment with different background colours digitally (cream, pale blue, mint)",
          "Use browser extensions like Midnight Lizard or Dark Reader",
          "Print important documents on coloured paper",
          "Ask for digital versions so you can adjust formatting"
        ],
        icon: "🌈",
        link: "https://irlen.com/"
      },
      {
        id: "font-spacing",
        title: "Font and spacing matter hugely",
        summary: "Certain fonts are unreadable, others make everything easier.",
        tools: [
          "Use OpenDyslexic, Comic Sans, or Arial fonts",
          "Increase line spacing (1.5 or double)",
          "Increase letter spacing slightly",
          "Use left-aligned text (not justified)",
          "Break text into shorter paragraphs"
        ],
        icon: "🔤",
        link: "https://www.opendyslexic.org/"
      }
    ]
  },
  {
    id: "assistive-technology",
    title: "Assistive Technology & Tools",
    subtitle: "Text-to-speech, speech-to-text, digital supports",
    didYouKnow: [
      "Assistive technology is a legitimate tool, not 'cheating'",
      "Many successful dyslexic people rely on assistive tech daily",
      "Using tools to access information doesn't diminish your intelligence"
    ],
    traits: [
      {
        id: "text-to-speech",
        title: "Text-to-speech for reading",
        summary: "Having text read aloud helps you understand and retain information.",
        tools: [
          "Use Immersive Reader (built into Microsoft products)",
          "Try NaturalReader or Voice Dream Reader apps",
          "Use browser extensions like Read Aloud or Speechify",
          "Enable system text-to-speech on phones and computers",
          "Audiobooks count as reading—method doesn't matter"
        ],
        icon: "🔊",
        link: "https://www.naturalreaders.com/"
      },
      {
        id: "speech-to-text",
        title: "Speech-to-text for writing",
        summary: "Dictating your thoughts is faster and easier than typing.",
        tools: [
          "Use Google Docs Voice Typing (free)",
          "Try Dragon NaturallySpeaking for advanced features",
          "Use phone voice-to-text for quick notes",
          "Practice speaking in full sentences—edit later",
          "Combine dictation with typing for best results"
        ],
        icon: "🎤",
        link: "https://www.nuance.com/dragon.html"
      },
      {
        id: "digital-organisation",
        title: "Digital tools for organisation",
        summary: "Apps and software help manage tasks and information.",
        tools: [
          "Use Notion or OneNote for visual note-taking",
          "Try mind mapping software (MindMeister, Coggle)",
          "Use Todoist or Trello for task management",
          "Install Grammarly or LanguageTool for writing support",
          "Explore assistive tech through Access to Work (UK) or similar programs"
        ],
        icon: "📱"
      }
    ]
  },
  {
    id: "accommodations",
    title: "School & Workplace Accommodations",
    subtitle: "Extra time, readers, scribes, alternative formats",
    didYouKnow: [
      "Exam accommodations level the playing field—they don't give you an unfair advantage",
      "You're entitled to reasonable adjustments in education and employment",
      "Asking for accommodations is advocating for yourself, not asking for special treatment"
    ],
    traits: [
      {
        id: "extra-time",
        title: "Extra time in exams and assessments",
        summary: "Time pressure makes your dyslexia/dyscalculia worse.",
        tools: [
          "Request 25-50% extra time through official assessments",
          "Use extra time to re-read questions carefully",
          "Take breaks during long exams if allowed",
          "Practice with timed work at home to build confidence",
          "Remember: extra time measures your actual ability, not just speed"
        ],
        icon: "⏰"
      },
      {
        id: "reader-scribe",
        title: "Reader or scribe support",
        summary: "Having someone read questions or write for you removes barriers.",
        tools: [
          "Request a reader to read exam questions aloud",
          "Request a scribe to write your spoken answers",
          "Use speech-to-text technology as an alternative",
          "Practice working with a scribe beforehand",
          "These accommodations are rights, not favours"
        ],
        icon: "📖"
      },
      {
        id: "alternative-formats",
        title: "Alternative formats for materials",
        summary: "Audio, large print, or digital versions make content accessible.",
        tools: [
          "Request lecture notes or handouts in advance",
          "Ask for digital versions you can adjust (font, colour, size)",
          "Use audiobooks or text-to-speech for textbooks",
          "Request visual aids and diagrams to supplement text",
          "Schools and workplaces must provide reasonable adjustments"
        ],
        icon: "📚"
      },
      {
        id: "workplace-support",
        title: "Workplace accommodations",
        summary: "Adjustments help you perform to your actual ability.",
        tools: [
          "Request assistive technology (text-to-speech, mind mapping software)",
          "Ask for written instructions instead of verbal-only",
          "Negotiate flexible deadlines for written reports",
          "Request quiet workspaces or noise-cancelling headphones",
          "UK: Access to Work can fund assistive tech and workplace assessments"
        ],
        icon: "💼",
        link: "https://www.gov.uk/access-to-work"
      }
    ]
  }
];
