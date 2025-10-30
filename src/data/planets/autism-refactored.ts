import React from "react";
import { Waves, Users, Lightbulb, Zap, Heart } from "lucide-react";
import { DailyLifeCategory } from "@/components/library/DailyLifeImpact";
import { StrategyCategory } from "@/components/library/PlanningAhead";

/**
 * Autism Planet - Refactored Content
 * Following Coji's voice: warm, factual, human, empathic
 * Structure: Recognition → Understanding → Planning
 */

export const autismPlanetData = {
  // Header
  headerReassurance:
    "Autism shapes how you sense, think, and connect with the world — and your wiring isn't wrong, just different.",

  // Quick Recognition (short, relatable "you" language)
  quickRecognitionTraits: [
    "You notice patterns, textures, and details others miss.",
    "Social situations can feel like reading a language you're still learning.",
    "You need time to recharge after being around people, even people you like.",
    "Routines and predictability help you feel steady.",
    "Certain sounds, lights, or fabrics can feel overwhelming or even painful.",
  ],

  // Full recognition list (holistic coverage for self-recognition)
  fullRecognitionTraits: [
    "You prefer direct communication — hints and subtext feel exhausting.",
    "You might mask or mirror others to fit in, but it costs energy.",
    "Eye contact can feel uncomfortable or distracting.",
    "You hyperfocus on interests that light you up, sometimes losing track of time.",
    "Transitions between tasks or places can feel jarring.",
    "You process emotions deeply, but expressing them verbally can be hard.",
    "You're often told you're 'too much' or 'not enough' in social settings.",
    "Sensory input (noise, crowds, tags in clothing) affects your mood and energy.",
    "You find comfort in repetitive movements or familiar rituals.",
    "You value honesty and fairness, and inconsistency feels destabilising.",
  ],

  // Daily Life Impact (accordion sections with intro, quick bullets, full list, reframe)
  dailyLifeCategories: [
    {
      title: "Sensory & Physical",
      icon: <Waves />,
      intro:
        "Your nervous system picks up more detail than most. Sounds, textures, lights, and smells can feel amplified.",
      quickImpacts: [
        "Background noise (humming fridges, overlapping conversations) can feel overwhelming.",
        "Certain fabrics, seams, or labels can be unbearable against your skin.",
        "Fluorescent lights or flickering screens can drain your energy fast.",
      ],
      fullImpacts: [
        "You might crave deep pressure (weighted blankets, tight hugs) or need to avoid touch entirely.",
        "Strong smells (perfumes, cleaning products) can trigger nausea or headaches.",
        "Temperature changes can feel extreme — you're always too hot or too cold.",
        "You may need to stim (rock, tap, fidget) to regulate sensory input.",
        "Crowded or chaotic spaces can lead to shutdown or meltdown.",
      ],
      reframe:
        "Your sensory awareness isn't a flaw — it's perceptiveness. You experience richness others don't notice.",
    },
    {
      title: "Thinking & Focus",
      icon: <Lightbulb />,
      intro:
        "Your brain processes information differently. You connect patterns, think in systems, and can hyperfocus on what fascinates you.",
      quickImpacts: [
        "You think in vivid images, patterns, or concepts rather than words.",
        "You can focus intensely on special interests, often losing track of time.",
        "Instructions need to be clear and specific — vague directions feel confusing.",
      ],
      fullImpacts: [
        "You notice inconsistencies and details others overlook.",
        "Open-ended tasks or too many options can feel paralysing.",
        "You prefer depth over breadth — knowing everything about one topic instead of skimming many.",
        "Executive function struggles (planning, starting tasks, switching focus) are common.",
        "You might miss social cues because you're focused on content, not tone or body language.",
      ],
      reframe:
        "Your focus is a superpower. When something matters to you, you bring precision and dedication.",
    },
    {
      title: "Social & Communication",
      icon: <Users />,
      intro:
        "You can connect deeply, but social conventions and unspoken rules can feel like guesswork.",
      quickImpacts: [
        "You prefer honest, direct conversation — small talk feels pointless or draining.",
        "You might miss sarcasm, idioms, or implied meanings.",
        "Group conversations are hard to follow because everyone talks over each other.",
      ],
      fullImpacts: [
        "You care deeply but might not show it in expected ways (eye contact, facial expressions).",
        "Masking (acting 'normal') helps you fit in but leaves you exhausted.",
        "You struggle to know when to speak, how much to share, or when someone's done listening.",
        "You're often misunderstood as rude, cold, or uninterested when you're just being honest.",
        "You form fewer but deeper friendships, valuing loyalty and shared interests.",
        "Phone calls or unexpected social demands can feel overwhelming.",
      ],
      reframe:
        "You're not bad at social — you're fluent in a different social language. Find people who speak it too.",
    },
    {
      title: "Emotional & Energy",
      icon: <Heart />,
      intro:
        "You feel emotions intensely, but expressing or regulating them can be tricky. Energy management is key.",
      quickImpacts: [
        "You feel joy, grief, and frustration more deeply than others expect.",
        "After social situations, you need quiet time to recharge, even if you enjoyed yourself.",
        "Emotional overwhelm can lead to shutdowns (numbness, withdrawal) or meltdowns (crying, anger).",
      ],
      fullImpacts: [
        "You might not recognise your own emotions until they're very strong (alexithymia).",
        "Injustice, inconsistency, or unfairness can feel unbearable.",
        "You absorb others' emotions intensely, especially in tense environments.",
        "Change, even positive change, can feel destabilising.",
        "You have a 'social battery' — it drains faster than non-autistic people expect.",
      ],
      reframe:
        "Your emotional depth is real. Honouring your energy limits isn't weakness — it's wisdom.",
    },
    {
      title: "Daily Routines & Planning",
      icon: <Zap />,
      intro:
        "Structure helps you function. Transitions, surprises, and changes to routine can feel disruptive.",
      quickImpacts: [
        "You prefer knowing what's happening and when — surprises feel stressful.",
        "Morning and evening routines help you feel grounded.",
        "Switching between tasks takes extra mental energy.",
      ],
      fullImpacts: [
        "Last-minute plan changes can derail your whole day.",
        "You might struggle with time blindness or lose hours to hyperfocus.",
        "Decision fatigue is real — too many choices drain you.",
        "You need visual schedules, lists, or reminders to stay on track.",
        "Everyday tasks (showering, cooking, phone calls) can feel monumental when you're low on energy.",
      ],
      reframe:
        "Routines aren't rigidity — they're scaffolding. They free up energy for what matters.",
    },
  ] as DailyLifeCategory[],

  // Planning Ahead (practical strategies in 4 areas)
  planningCategories: [
    {
      title: "Jobs & Hobbies",
      icon: <Lightbulb />,
      quickStrategies: [
        "Look for roles with clear expectations, predictable routines, and minimal ambiguity.",
        "Remote or hybrid work can reduce sensory overload from open offices.",
        "Consider fields that align with special interests (tech, research, creative work, systems).",
      ],
      fullStrategies: [
        "Negotiate for noise-cancelling headphones, quiet spaces, or flexible hours.",
        "Written instructions and feedback work better than vague verbal check-ins.",
        "Jobs with pattern recognition, detail work, or independent focus often suit autistic strengths.",
        "Freelancing or self-employment can offer more control over sensory environment and schedule.",
        "Disclose your needs if it feels safe — many workplaces now have neurodiversity support.",
      ],
    },
    {
      title: "Accessibility & Environment",
      icon: <Waves />,
      quickStrategies: [
        "Dim lights, reduce noise (earplugs, noise-cancelling headphones), and control temperature where possible.",
        "Remove sensory irritants (scratchy fabrics, bright lights, strong scents).",
        "Create a sensory-safe space at home where you can retreat and recharge.",
      ],
      fullStrategies: [
        "Use weighted blankets, compression clothing, or fidget tools for regulation.",
        "Sunglasses indoors, tinted lenses, or blue light filters can ease light sensitivity.",
        "Keep routines visible (whiteboards, apps, calendars) to reduce mental load.",
        "Batch similar tasks together to minimise transitions.",
        "Build in 'buffer time' after social events or overstimulating activities.",
      ],
    },
    {
      title: "Communication & Relationships",
      icon: <Users />,
      quickStrategies: [
        "Tell people you prefer direct communication — it's okay to ask for clarity.",
        "It's fine to say 'I need time alone' or 'I'm at capacity' without explaining further.",
        "Find communities (online or in-person) built around shared interests, not small talk.",
      ],
      fullStrategies: [
        "Script or rehearse tricky conversations beforehand if it helps you feel prepared.",
        "Use text or email when phone calls feel overwhelming.",
        "Let friends know that you care, even if you don't show it in typical ways (eye contact, frequent check-ins).",
        "Set boundaries around masking — you don't have to perform 'normal' for everyone.",
        "Seek out neurodivergent-friendly spaces where honesty and directness are valued.",
      ],
    },
    {
      title: "Healthcare & Self-Advocacy",
      icon: <Heart />,
      quickStrategies: [
        "Bring notes or lists to appointments — verbal processing under pressure is hard.",
        "Ask for written summaries of medical advice instead of relying on memory.",
        "If a provider dismisses you, find one who understands autistic presentation (especially for AFAB people).",
      ],
      fullStrategies: [
        "Use phrases like 'I process information better in writing' or 'I need predictability to function.'",
        "Request sensory accommodations (dim lights, quieter waiting areas, first/last appointments).",
        "Track patterns (meltdowns, shutdowns, sensory triggers) to identify what helps or harms.",
        "Connect with autistic-led organisations for peer support and advocacy resources.",
        "Remember: stimming, avoiding eye contact, and needing routine aren't things to fix — they're part of how you regulate.",
      ],
    },
  ] as StrategyCategory[],

  // Optional intro for planning section
  planningIntro:
    "These strategies help you design a life that works with your brain, not against it.",
};
