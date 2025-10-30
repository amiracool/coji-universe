# Coji Universe Planet Refactor Guide

## Overview

This document explains the new planet page structure designed for:
- **Holistic content** - complete coverage for self-recognition
- **Digestible presentation** - progressive disclosure respects cognitive load
- **Empathic tone** - validating, warm, human (not clinical)
- **Performance** - lazy loading, minimal DOM, <2s load times

---

## The Coji Voice

Every planet uses the same tone principles:

### Core Rules
1. **Plain over polished** - No academic language
2. **Warm, factual, never fluffy** - Kind but realistic
3. **Human, not helper-bot** - Like a perceptive friend
4. **Present-tense empathy** - "You might find..." not "Individuals may experience..."
5. **Balance** - Every challenge has a counter-strength or strategy

### Sentence Style
- Average 10-18 words
- Use contractions ("you're," "don't")
- One metaphor per section max
- Short bullets (max 2 lines each)

### Vocabulary Guide

**Use:**
- "tend to," "often," "sometimes" (not absolutes)
- "energy," "bandwidth," "capacity" (not "motivation")
- "focus drift," "time slippage," "brain fog," "overload"
- "plan," "design," "adapt," "balance" (not "fix," "manage," "control")

**Avoid:**
- "disorder," "impairment," "deficit," "abnormal"
- "should," "must," "need to" (use "could," "might find it easier to")
- Any framing that implies brokenness

---

## Planet Template Structure

Each planet follows this consistent 6-part layout:

### 1. Header
**Purpose:** One-line reassurance + brief summary

**Components:**
- Static planet orb (no animation for performance)
- Planet name
- One-sentence validation (not clinical, not fluffy)

**Example:**
```tsx
<h1>Autism</h1>
<p>Autism shapes how you sense, think, and connect with the world — and your wiring isn't wrong, just different.</p>
```

---

### 2. Quick Self-Recognition
**Purpose:** Fast self-recognition with holistic depth on tap

**Components:**
- `<QuickRecognition>` component
- Shows 4-6 relatable bullets by default
- "Show full list" expands to complete trait coverage
- Uses plain "you" language

**Data Structure:**
```typescript
quickRecognitionTraits: [
  "You notice patterns, textures, and details others miss.",
  "Social situations can feel like reading a language you're still learning.",
  // 3-5 more quick traits
],
fullRecognitionTraits: [
  "You prefer direct communication — hints and subtext feel exhausting.",
  "You might mask or mirror others to fit in, but it costs energy.",
  // 8-12 more comprehensive traits
]
```

**Tone Example:**
- ✅ "You need time to recharge after being around people, even people you like."
- ❌ "Individuals with autism may experience social fatigue following interpersonal interactions."

---

### 3. Did You Know? Carousel
**Purpose:** Visual/cognitive break, reframe strengths

**Components:**
- `<FactCarousel>` (existing component)
- Short facts, strengths, reframes
- 3-5 slides max

**Example Content:**
"People with dyspraxia often develop strong creative problem-solving because of early adaptation."

---

### 4. How It Affects Daily Life
**Purpose:** Holistic mapping with accordion + lazy loading

**Components:**
- `<DailyLifeImpact>` component
- 5 universal sub-sections (adapt wording per planet):
  1. Sensory & Physical
  2. Thinking & Focus
  3. Social & Communication
  4. Emotional & Energy
  5. Daily Routines & Planning

**Each section includes:**
- **Intro** (1-2 sentences explaining why it happens)
- **Quick impacts** (3-4 bullets, always visible when accordion opens)
- **Full impacts** (5-8 more bullets, shown on "View full list")
- **Reframe** (optional validating note about strengths)

**Data Structure:**
```typescript
interface DailyLifeCategory {
  title: string;
  icon: React.ReactNode;
  intro: string;
  quickImpacts: string[];
  fullImpacts?: string[];
  reframe?: string;
}
```

**Tone Pattern (Recognition → Why → Strategy):**
```
Recognition: "You lose time in deep focus and forget to eat."
Why: "Your attention system locks on to high-interest tasks and mutes background noise — including hunger."
Strategy/Reframe: "Use alarms or visual cues for breaks; curiosity can coexist with care."
```

---

### 5. Planning Ahead
**Purpose:** Practical strategies in 4 universal areas

**Components:**
- `<PlanningAhead>` component
- 4 categories:
  1. Jobs & Hobbies
  2. Accessibility & Environment
  3. Communication & Relationships
  4. Healthcare & Self-Advocacy

**Each category includes:**
- **Quick strategies** (3-4 bullets, always visible)
- **Full strategies** (5-8 more, shown on "See more strategies")

**Data Structure:**
```typescript
interface StrategyCategory {
  title: string;
  icon: React.ReactNode;
  quickStrategies: string[];
  fullStrategies?: string[];
}
```

**Tone Example:**
- ✅ "Look for roles with clear expectations, predictable routines, and minimal ambiguity."
- ❌ "Seek employment in structured environments with well-defined parameters."

---

### 6. Bottom Navigation
**Simple back button + "Can't find what you need?" message**

---

## Performance Optimizations

### What We Removed
1. **50 twinkling star elements** → Simplified background gradient
2. **Heavy animations** → Static planet orb, no DOM-heavy effects
3. **All content loaded at once** → Progressive disclosure with accordions
4. **Excessive emoji usage** → 1-2 per header max

### What We Added
1. **Lazy loading** → Accordion sections only render when opened
2. **Expandable sections** → "Show more" buttons instead of long scrolling pages
3. **Mobile-first layout** → 60-70 char line length, short paragraphs
4. **Single planet data loading** → Not all planets at once

### Performance Goals
- Initial load: <2 seconds
- Interaction responsiveness: <100ms
- Expandable sections load instantly (already in DOM, just hidden)

---

## Component API Reference

### QuickRecognition
```tsx
<QuickRecognition
  traits={allTraits} // Array of strings
  accentColor="teal" // Planet theme color
  quickCount={5} // How many to show before "Show full list"
/>
```

### DailyLifeImpact
```tsx
<DailyLifeImpact
  categories={dailyLifeCategories} // Array of DailyLifeCategory
  accentColor="teal"
/>
```

### PlanningAhead
```tsx
<PlanningAhead
  categories={strategyCategories} // Array of StrategyCategory
  accentColor="teal"
  intro="Optional intro text for the whole section"
/>
```

---

## Migration Checklist

To convert an existing planet to the new structure:

### Data Layer
- [ ] Create `/src/data/planets/{planet-name}-refactored.ts`
- [ ] Write header reassurance (1 sentence, Coji voice)
- [ ] Write 5 quick recognition traits
- [ ] Write 8-12 full recognition traits
- [ ] Create 5 DailyLifeCategory objects (Sensory, Thinking, Social, Emotional, Routines)
- [ ] Create 4 StrategyCategory objects (Jobs, Accessibility, Communication, Healthcare)
- [ ] Write planning intro (1-2 sentences)

### Component Layer
- [ ] Create `{PlanetName}PageRefactored.tsx`
- [ ] Import new components (QuickRecognition, DailyLifeImpact, PlanningAhead)
- [ ] Import refactored data
- [ ] Simplify atmospheric background (remove heavy DOM elements)
- [ ] Add static planet orb (no animation)
- [ ] Use refactored components in order: Header → QuickRecognition → DidYouKnow → DailyLifeImpact → PlanningAhead → Navigation

### Testing
- [ ] Check page loads in <2 seconds
- [ ] Verify accordion sections open/close smoothly
- [ ] Test "Show more" expansions work correctly
- [ ] Confirm mobile responsiveness (44px touch targets, readable text)
- [ ] Validate tone matches Coji voice guidelines

---

## Planet Personality Palette

Each planet can have slightly different flavour while staying in the Coji voice family:

- **ADHD:** lively, forgiving, curious
- **Autism:** structured, observant, quietly humorous
- **Dyspraxia:** gentle, practical, a touch self-deprecating
- **Anxiety:** soothing, grounding, slow
- **Depression:** calm, steady, validating
- **Dyscalculia/Dyslexia:** inventive, lateral, affirming
- **Chronic Illness:** spacious, realistic, honouring energy
- **PMDD:** understanding, cyclical, body-aware

---

## Example: Autism Planet

### Before (Technical, Wordy)
"Individuals with autism spectrum disorder may experience sensory processing differences which can manifest as hypersensitivity to auditory, visual, or tactile stimuli."

### After (Coji Voice)
**Intro:** "Your nervous system picks up more detail than most. Sounds, textures, lights, and smells can feel amplified."

**Quick impact:** "Background noise (humming fridges, overlapping conversations) can feel overwhelming."

**Reframe:** "Your sensory awareness isn't a flaw — it's perceptiveness. You experience richness others don't notice."

---

## Narrative Arc

Every planet leads the user through:

**Recognition** → **Understanding** → **Strategy** → **Self-kindness**

If a paragraph doesn't move them along that arc, it doesn't belong.

---

## The Simplest Test

For every sentence, ask:

> "Would a neurodivergent reader in low energy still feel understood and not patronised if they only read this line?"

If yes — keep it.
If no — rewrite or cut.

---

## Files Reference

### New Components
- `/src/components/library/QuickRecognition.tsx`
- `/src/components/library/DailyLifeImpact.tsx`
- `/src/components/library/PlanningAhead.tsx`

### Example Implementation
- `/src/data/planets/autism-refactored.ts` (data)
- `/src/components/library/AutismPageRefactored.tsx` (component)

### Existing Components (Keep)
- `FactCarousel` (Did You Know section)
- `RotatingPlanet` (static orb)
- `getPlanetTheme` (theme colours)

---

## Next Steps

1. **Test the Autism refactor** in browser
2. **Apply pattern to ADHD** (next planet)
3. **Create migration script** to batch-convert remaining planets
4. **Future feature:** "Pick What's You" chip/toggle system for filtered content

---

## Questions?

If something doesn't make sense, ask:
- Does this help the user see themselves clearly?
- Does it then help them do something kind for themselves with that insight?

If yes, you're aligned with Coji's mission.
