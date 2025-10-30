# Lightweight Planet Pages - Implementation Guide

## Overview

The Autism Planet has been broken down into **6 separate lightweight pages** to eliminate scroll fatigue, reduce initial load, and provide better progressive disclosure on mobile devices.

---

## Route Structure

All autism planet pages live under `/planets/autism/`:

1. **`/planets/autism/intro`** - Hero/Intro
2. **`/planets/autism/facts`** - Did You Know (3 facts max)
3. **`/planets/autism/understanding`** - Understanding Autism narrative
4. **`/planets/autism/how-it-shows-up`** - 5 accordion sections (only one renders at a time)
5. **`/planets/autism/strengths`** - Strengths & Sensitivities (modal expansion)
6. **`/planets/autism/planning`** - Planning Ahead (tap-to-load sections)

---

## Navigation System (3 Ways to Move - ND-Friendly)

### 1. Bottom CTA Buttons
- **"Next →"** button (right side)
- **"← Back"** button (left side)
- Fixed to bottom of screen
- 44px+ minimum touch targets
- Gradient teal styling

### 2. Swipe Gestures (Mobile)
- Swipe **left** = Next page
- Swipe **right** = Previous page
- 50px swipe threshold
- Built into `AutismPlanetLayout`

### 3. Top-Left Back Button
- **"← Back to Library"** button
- Always visible
- Returns to `/library`

### 4. Progress Indicator
- **"2 / 6"** format (top-right)
- Shows current step and total steps
- Updates on each page

---

## Page-by-Page Breakdown

### Page 1: Intro `/planets/autism/intro`

**Goal:** Feather-light hero page

**Content:**
- Floating puzzle icon 🧩
- Title: "Autism Planet"
- 1-2 line description
- Prominent CTA: "Start exploring →"

**Performance:**
- Prefetches `/facts` on mount
- No accordions
- Minimal DOM

**Component:** `AutismIntro.tsx`

---

### Page 2: Facts `/planets/autism/facts`

**Goal:** Dopamine starter - quick wins

**Content:**
- 3 facts maximum (not 4, not 5 - exactly 3)
- Uses existing `FactCarousel` component
- Light, cute, low-pressure tone

**Performance:**
- Carousel only
- Prefetches `/understanding` on mount

**Component:** `AutismFacts.tsx`

---

### Page 3: Understanding `/planets/autism/understanding`

**Goal:** Narrative depth with progressive disclosure

**Content:**
- 2 paragraphs visible by default
- "Read more ↓" reveals 3 additional paragraphs
- Full content only loaded when user taps

**Performance:**
- Long copy **not loaded** until "Read more" is tapped
- Uses conditional render (not CSS `display: none`)
- Prefetches `/how-it-shows-up` on mount

**Component:** `AutismUnderstanding.tsx`

---

### Page 4: How It Shows Up `/planets/autism/how-it-shows-up`

**Goal:** Chunky content, memory-efficient rendering

**Content:**
- 5 category cards:
  1. Sensory Processing 👂
  2. Social & Communication 💬
  3. Cognition & Focus 🧠
  4. Emotion & Regulation ❤️
  5. Physical & Health 🩺
- **Default open:** Sensory Processing
- **Only renders the active accordion's content**

**Performance:**
- When user taps another category, **unmount** the previous one
- React doesn't hold 5 big text blocks in memory
- Only 1 section's content in DOM at a time
- Prefetches `/strengths` on mount

**Component:** `AutismHowItShowsUp.tsx`

**Technical Detail:**
```tsx
// Find active section
const activeSection = data.find(s => s.id === activeId);

// Only render if active
{activeId === section.id && activeSection && (
  <div>{activeSection.content}</div>
)}
```

---

### Page 5: Strengths `/planets/autism/strengths`

**Goal:** Swipeable cards with modal expansion

**Content:**
- 6 strength tiles in 2-column grid
- Each tile: **2 lines only** (short description)
- Tap → opens **modal** with full description

**Performance:**
- Main page stays thin (no scroll novel)
- Full descriptions only loaded in modal
- Modal unmounts when closed
- Prefetches `/planning` on mount

**Component:** `AutismStrengths.tsx`

**Modal Features:**
- Click outside to close
- X button to close
- Full description with proper spacing
- Semi-transparent black backdrop

---

### Page 6: Planning `/planets/autism/planning`

**Goal:** Practical strategies with tap-to-load

**Content:**
- 4 sections:
  1. Jobs & Hobbies 💼
  2. Environment & Accessibility 🏠
  3. Healthcare & Support 🩺
  4. Relationships & Community 👥
- Each section shows **preview** by default
- Tap "Read more" → loads full content + examples

**Performance:**
- Content loaded **on tap**, not on initial render
- Each section independently expandable
- No prefetch (last page in flow)

**Component:** `AutismPlanning.tsx`

**Completion Message:**
- "You've explored the Autism Planet"
- Reminds user to use "Back to Library" button

---

## Shared Layout Component

**`AutismPlanetLayout.tsx`** wraps all 6 pages

**Features:**
- Simplified teal gradient background
- Top navigation (back to library + progress)
- Bottom fixed navigation (prev/next buttons)
- Swipe handling (left/right)
- Route prefetching on mount
- Max-width 2xl (672px) for readability

**Props:**
```tsx
interface AutismPlanetLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  nextRoute?: string;
  prevRoute?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}
```

---

## Performance Optimizations

### What Was Done

1. **Dynamic Imports (Not Yet Implemented, Optional):**
   ```tsx
   const AutismHowItShowsUp = dynamic(
     () => import('@/components/planets/autism/AutismHowItShowsUp'),
     { ssr: false }
   );
   ```

2. **Route Prefetching:**
   ```tsx
   useEffect(() => {
     if (nextRoute) {
       router.prefetch(nextRoute);
     }
   }, [nextRoute, router]);
   ```

3. **Conditional Rendering (Not CSS hiding):**
   ```tsx
   // WRONG (loads content but hides it):
   <div style={{ display: expanded ? 'block' : 'none' }}>...</div>

   // RIGHT (doesn't render content until needed):
   {expanded && <div>...</div>}
   ```

4. **Single Accordion Active:**
   - Only 1 accordion renders content at a time
   - Previous accordion unmounts when new one opens

5. **Modal Pattern:**
   - Full descriptions in modal (not inline)
   - Keeps main page light
   - Modal unmounts when closed

6. **CSS Transforms (Not JS Animations):**
   ```css
   transition: transform 150ms ease-in-out, opacity 200ms;
   ```

---

## UI Consistency

### Colors
- **Background:** `linear-gradient(180deg, #0f2027 0%, #203a43 30%, #2c5364 100%)`
- **Accent:** Teal (#14b8a6, #0d9488)
- **Text:** Slate (100, 200, 300, 400)
- **Cards:** `rgba(20, 184, 166, 0.08)` backgrounds
- **Borders:** `rgba(20, 184, 166, 0.2)`

### Spacing
- Between sections: `mb-6` (24px)
- Inside cards: `p-5` or `p-6`
- Bottom CTA padding: `py-6`

### Icons
- Header icons: `text-5xl` (80px)
- Section icons: `text-2xl` (32px)
- Lucide icons: `size={20}` or `size={24}`

### Border Radius
- Cards: `rounded-xl` (12px)
- Buttons: `rounded-xl` (12px)
- Modal: `rounded-2xl` (16px)

---

## File Structure

```
/src
  /app
    /planets
      /autism
        /intro/page.tsx
        /facts/page.tsx
        /understanding/page.tsx
        /how-it-shows-up/page.tsx
        /strengths/page.tsx
        /planning/page.tsx

  /components
    /planets
      /autism
        AutismPlanetLayout.tsx (shared layout)
        AutismIntro.tsx
        AutismFacts.tsx
        AutismUnderstanding.tsx
        AutismHowItShowsUp.tsx
        AutismStrengths.tsx
        AutismPlanning.tsx

  /data
    /planets
      autism-mobile.ts (content data)
```

---

## Content Tone Guidelines

### Summary View (Default)
- **2 lines max** per item
- Short, punchy, clear
- "You might notice..." language
- No jargon

### Full View (On Tap)
- Full paragraphs with breathing room
- 1.6 line height
- Max 60-70 characters per line
- Examples in italics with left border

### Never on First Load
- 5 long paragraphs
- All 5 accordions open
- Full strategy lists
- Heavy text blocks

---

## Replicating for Other Planets

To apply this pattern to **ADHD, Dyspraxia, Anxiety, Depression, etc.:**

### Step 1: Create Data File
```tsx
// /src/data/planets/adhd-mobile.ts
export const adhdPlanetMobile = {
  name: "ADHD Planet",
  tagline: "...",
  understandingIt: { preview: [...], fullContent: [...] },
  howItShowsUp: [{ id, title, icon, content }, ...],
  strengthsAndSensitivities: [{ id, title, shortDesc, fullDesc }, ...],
  planningAhead: [{ id, title, icon, preview, fullContent, examples }, ...],
  didYouKnowFacts: [...],
  superpowersFacts: [...]
};
```

### Step 2: Create 6 Components
Copy `autism/` folder structure:
- `AdhdIntro.tsx`
- `AdhdFacts.tsx`
- `AdhdUnderstanding.tsx`
- `AdhdHowItShowsUp.tsx`
- `AdhdStrengths.tsx`
- `AdhdPlanning.tsx`
- `AdhdPlanetLayout.tsx` (or reuse with props)

### Step 3: Create App Routes
```
/app/planets/adhd/intro/page.tsx
/app/planets/adhd/facts/page.tsx
...
```

### Step 4: Update Colors
Replace teal with planet-specific color:
- ADHD: Purple
- Dyspraxia: Indigo
- Anxiety: Amber
- Depression: Blue
- etc.

---

## Testing Checklist

### Performance
- [ ] Each page loads in <1 second
- [ ] Swipe gestures work smoothly
- [ ] Next route prefetches on mount
- [ ] Only active accordion content in DOM
- [ ] Modal unmounts when closed

### UX
- [ ] Progress indicator updates correctly (1/6, 2/6, etc.)
- [ ] Bottom CTA buttons are 44px+ touch targets
- [ ] "Back to Library" button always visible
- [ ] Swipe threshold (50px) feels natural
- [ ] Transition hints are clear

### Content
- [ ] Facts page has exactly 3 facts (not more)
- [ ] Understanding preview is 2 paragraphs max
- [ ] How It Shows Up defaults to Sensory open
- [ ] Strengths tiles are 2 lines only
- [ ] Planning sections show preview first

### Mobile
- [ ] Text is readable without zooming
- [ ] Cards don't feel cramped
- [ ] Modals fit on small screens
- [ ] Swipe works on all pages

---

## Routes Summary

| Step | Route | Component | Content |
|------|-------|-----------|---------|
| 1/6 | `/planets/autism/intro` | `AutismIntro` | Hero + CTA |
| 2/6 | `/planets/autism/facts` | `AutismFacts` | 3 facts carousel |
| 3/6 | `/planets/autism/understanding` | `AutismUnderstanding` | Narrative with Read More |
| 4/6 | `/planets/autism/how-it-shows-up` | `AutismHowItShowsUp` | 5 accordions (1 active) |
| 5/6 | `/planets/autism/strengths` | `AutismStrengths` | 6 tiles + modal |
| 6/6 | `/planets/autism/planning` | `AutismPlanning` | 4 sections tap-to-load |

---

## Key Decisions

### Why 6 Pages?
- Eliminates scroll fatigue
- One idea per screen
- Clear progress (1/6, 2/6, etc.)
- Mobile-friendly bite-sized chunks

### Why Prefetch?
- Next route loads in background
- Instant transition when user taps "Next"
- Feels snappy and responsive

### Why Swipe?
- ND-friendly (3 ways to navigate)
- Natural gesture on mobile
- No need to reach for bottom buttons

### Why Modal for Strengths?
- Keeps main page thin
- Full description gets focus
- Easy to close (click outside or X)

### Why Single Accordion?
- Reduces memory usage
- Forces focus on one topic
- No overwhelming wall of text

---

## Future Enhancements

### Possible Additions
1. **Save Progress:** Remember which pages user has visited
2. **Bookmarks:** Let users mark favorite sections
3. **Share:** Export specific pages as PDF or image
4. **Audio:** Text-to-speech for low-vision users
5. **Offline:** Cache pages for offline reading

### A/B Testing Ideas
- Test 3 facts vs 4 facts (dopamine impact)
- Test swipe threshold (50px vs 75px)
- Test default accordion (Sensory vs Social)
- Test progress indicator position (top-right vs top-center)

---

## Troubleshooting

### Issue: Swipe not working
**Fix:** Check touch event listeners in `AutismPlanetLayout.tsx`. Ensure `onSwipeLeft` and `onSwipeRight` props are passed.

### Issue: Accordion content not unmounting
**Fix:** Use conditional render `{activeId === section.id && <Content />}`, not CSS `display: none`.

### Issue: Modal not closing
**Fix:** Ensure `onClick={closeModal}` on backdrop and `onClick={(e) => e.stopPropagation()}` on modal content.

### Issue: Prefetch not working
**Fix:** Verify `router.prefetch(nextRoute)` is called in `useEffect` hook.

---

## Summary

The lightweight planet system provides:
- ✅ **Progressive disclosure** - one idea per screen
- ✅ **Performance** - <1s load per page
- ✅ **Mobile-friendly** - swipe, large touch targets
- ✅ **ND-friendly** - 3 ways to navigate
- ✅ **Memory-efficient** - single accordion active
- ✅ **Predictable UX** - consistent across all planets

**Pattern is ready to replicate for ADHD, Dyspraxia, Anxiety, Depression, Dyscalculia, Chronic Illness, and future planets.**
