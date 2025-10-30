# Autism Planet - Mobile-First Implementation Guide

## Overview

A calm, validating, mobile-first planet page designed for low cognitive load with rich educational content delivered through progressive disclosure.

**Location:** `/src/components/library/AutismPlanetMobile.tsx`
**Data:** `/src/data/planets/autism-mobile.ts`

---

## Design Principles Implemented

### 1. Mobile-First Layout
- **Max width:** 2xl (672px) for comfortable reading
- **Typography:** 16-18px for headers, 16px for body text
- **Line spacing:** 1.6 for readability
- **Touch targets:** All buttons 44px+ height/width
- **Grid:** 2-column for strength tiles, stacked elsewhere

### 2. Low Cognitive Load
- **Preview-first:** Each section shows 1-3 key points initially
- **Progressive disclosure:** "Read more" toggles reveal full depth
- **One accordion open:** Only one "How It Shows Up" section expands at a time
- **Short line lengths:** Natural text wrapping at 60-70 characters
- **Generous spacing:** 6-8 spacing units between major sections

### 3. Calm, Validating Tone
- **Colors:** Soft teal gradient background, off-white text
- **Motion:** Gentle fade-in (0.3s), subtle float animation on planet icon
- **No bouncing:** Smooth slide/fade transitions only
- **Accent icons:** Rendered as glowing section markers (💫, 🧠, 🌿, 🧭)
- **Visual hierarchy:** Clear separation with subtle gradient dividers

---

## Component Structure

### Header
```tsx
- 🧩 Floating planet icon (6s ease-in-out float)
- Title: "Autism Planet"
- Tagline: "Understanding how autistic minds experience..."
- Gradient divider line
```

**Performance:** Static background gradient (no 50-star DOM elements)

---

### 💫 Understanding It Section

**Preview (always visible):**
- 2 short paragraphs introducing autism as different wiring
- "Read more" button

**Expanded (on tap):**
- 3 additional paragraphs with deeper explanation
- Information about masking, hyperfocus, sensory processing
- "Show less" button

**Technical details:**
- `useState` for expansion state
- Fade-in animation (0.3s) on expand
- Gradient divider at bottom

---

### 🧠 How It Shows Up (Accordion)

**5 Collapsible Sections:**
1. **Sensory Processing** 👂 - Sounds, lights, textures
2. **Social & Communication** 💬 - Directness, masking, eye contact
3. **Cognition & Focus** 🧠 - Hyperfocus, executive function
4. **Emotion & Regulation** ❤️ - Intense feelings, shutdowns, meltdowns
5. **Physical & Health** 🩺 - Chronic pain, interoception, routines

**Behavior:**
- Only one section opens at a time (reduces overwhelm)
- Tap header to toggle
- Content fades in (0.3s) on open
- Each section has icon + title in header
- 2-3 sentences per section when open

**Technical details:**
- `useState` tracks which section is open (string | null)
- Toggle closes previous section when opening new one
- Hover state: bg-teal-950/20 on button

---

### 🌿 Strengths & Sensitivities (Interactive Tiles)

**6 Tiles in 2-column grid:**
1. Pattern Recognition
2. Authenticity
3. Depth Over Breadth
4. Loyalty & Consistency
5. Sensory Perception
6. Creative Thinking

**Behavior:**
- Each tile shows **short description** by default
- Tap to reveal **full description**
- Expanded tile: slightly brighter background, subtle glow shadow
- Smooth scale-105 hover effect

**Technical details:**
- `useState` tracks expanded tile ID
- Toggle collapses previous tile when opening new one
- Mobile: 2 columns, responsive padding
- Desktop: Same 2-column layout (scales up nicely)

---

### 🧭 Planning Ahead (Vertical Stacked)

**4 Expandable Sections:**
1. **Jobs & Hobbies** 💼
2. **Environment & Accessibility** 🏠
3. **Healthcare & Support** 🩺
4. **Relationships & Community** 👥

**Each section includes:**
- **Preview:** 1-2 sentence summary (always visible)
- **Full content:** 2-3 detailed paragraphs (expandable)
- **Examples:** Bulleted practical tips with left border accent

**Behavior:**
- Each section independently expandable (not mutually exclusive)
- "Read more" / "Show less" toggle per section
- Examples shown as italic text with left teal border

**Technical details:**
- `useState` tracks expanded section ID
- Fade-in animation on expand
- Border-left accent on examples for visual separation

---

### Did You Know? Carousel

**Content:**
- 4 rotating facts about autism
- Uses existing `FactCarousel` component
- Teal accent color (#14b8a6)

**Facts include:**
- Pattern recognition excellence
- Synaptic connections science
- Masking exhaustion validation
- Special interests as joy sources

---

### Superpowers Carousel

**Content:**
- 4 rotating strength affirmations
- Same `FactCarousel` component
- Lighter, empowering tone

**Affirmations:**
- Attention to detail
- Honesty and trust-building
- Deep focus mastery
- Loyalty and reliability

---

### Footer

**Components:**
- "Return to Universe" button with left arrow icon
- Teal gradient button style
- 44px minimum touch target
- Hover scale-105 effect

---

## Performance Optimizations

### What We Removed
- ❌ 50 twinkling star DOM elements
- ❌ Heavy gradient overlays
- ❌ Multiple competing animations
- ❌ All content visible at once (long scroll)

### What We Added
- ✅ Simple gradient background
- ✅ Progressive disclosure (expand on demand)
- ✅ Lazy loading with React Suspense
- ✅ Single float animation (planet icon only)
- ✅ Accordion pattern (one open at a time for "How It Shows Up")

### Performance Targets
- **Initial load:** <2 seconds
- **Interaction:** <100ms response
- **Expansion:** Instant (content already in DOM, just hidden)
- **Total initial text:** ~400 words visible (under 1000 word target)

---

## Typography & Spacing

### Font Sizes
- **H1 (Planet name):** 3xl (1.875rem / 30px)
- **H2 (Section headers):** xl (1.25rem / 20px)
- **H3 (Subsection headers):** lg (1.125rem / 18px)
- **Body text:** base (1rem / 16px)
- **Small text (tiles):** sm (0.875rem / 14px), xs (0.75rem / 12px)

### Line Heights
- **All body text:** 1.6 (relaxed reading)
- **Tile text:** 1.5
- **Headers:** 1.4

### Spacing
- **Between major sections:** mb-6 (1.5rem / 24px)
- **Inside cards:** p-5 (1.25rem / 20px)
- **Between paragraphs:** space-y-3 or space-y-4
- **Grid gap:** gap-3 (0.75rem / 12px)

---

## Color Palette

### Background
```css
background: linear-gradient(180deg, #0f2027 0%, #203a43 30%, #2c5364 100%)
```
Dark teal/blue gradient, calm and spacious.

### Text
- **Primary:** slate-100 (headers)
- **Secondary:** slate-200 (subheaders)
- **Body:** slate-300 (main text)
- **Muted:** slate-400 (examples, less emphasis)

### Accent (Teal)
- **Primary:** #14b8a6 (teal-500)
- **Secondary:** #0d9488 (teal-600)
- **Hover:** teal-300
- **Backgrounds:** rgba(20, 184, 166, 0.08) to rgba(13, 148, 136, 0.05)

### Borders
- `rgba(20, 184, 166, 0.2)` for card outlines
- `rgba(20, 184, 166, 0.4)` for interactive buttons

---

## Animations

### Defined Animations
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Where Applied
- **Float:** Planet icon (6s infinite ease-in-out)
- **FadeIn:** Accordion content (0.3s on expand)
- **Scale:** Strength tiles (scale-105 on hover)
- **Color transition:** All buttons (duration-200 or duration-300)

**No bouncing, no rapid transitions** - all motion is gentle and purposeful.

---

## Accessibility Features

### Touch Targets
- All interactive elements: **minimum 44px height/width**
- Includes: buttons, accordion headers, tiles, carousel controls

### Keyboard Navigation
- All sections tabbable
- Enter/Space to expand/collapse
- Focus states visible (default browser or custom)

### Screen Readers
- Semantic HTML: `<header>`, `<section>`, `<button>`
- Icon text in section headers for context
- "Read more" / "Show less" provides clear state

### Color Contrast
- Off-white text on dark teal: **exceeds WCAG AA**
- Teal accent on dark background: high contrast
- No text smaller than 14px (except examples at 12px with sufficient spacing)

---

## Content Structure

### Understanding It
**Word count:** ~150 preview, ~250 expanded = **400 total**

**Tone:**
- Direct, validating
- "You" language throughout
- Reframes autism as different wiring, not deficit

**Key messages:**
- Autism is a different operating system
- Sensory amplification is perceptiveness
- Masking is exhausting but common
- Need for routines and predictability is valid

---

### How It Shows Up
**Word count:** ~50-70 per section × 5 = **250-350 total**

**Structure per section:**
- 2-3 short sentences
- Plain language, no jargon
- Balance challenges with validation

**Sections:**
1. **Sensory:** Amplified input, regulation needs
2. **Social:** Direct communication preference, masking cost
3. **Cognition:** Hyperfocus, executive function, pattern thinking
4. **Emotion:** Intense feelings, shutdowns/meltdowns as regulation
5. **Physical:** Chronic conditions, interoception differences

---

### Strengths & Sensitivities
**Word count:** ~15 short, ~30 full per tile × 6 = **270 total**

**Tone:**
- Affirming, strength-based
- No toxic positivity
- Realistic about challenges, celebrates gifts

**Balance:**
- Pattern recognition (strength)
- Authenticity (strength with social cost)
- Depth (strength in mastery)
- Loyalty (relational strength)
- Sensory perception (strength + challenge)
- Creative thinking (innovation strength)

---

### Planning Ahead
**Word count:** ~30 preview, ~100-150 full per section × 4 = **520-720 total**

**Structure per section:**
- Preview: What to consider
- Full content: Specific strategies
- Examples: Concrete actions (2-3 bullets)

**Sections:**
1. **Jobs:** Remote work, clear expectations, special interest alignment
2. **Environment:** Sensory control, routines, buffer time
3. **Healthcare:** Written communication, accommodations, tracking
4. **Relationships:** Directness, ND-friendly spaces, boundaries

---

### Carousels
**Did You Know:** 4 facts × ~20 words = **~80 words**
**Superpowers:** 4 affirmations × ~15 words = **~60 words**

---

## Total Initial Word Count

- **Header/tagline:** ~20 words
- **Understanding It (preview only):** ~150 words
- **How It Shows Up (headers only, no content):** ~30 words
- **Strengths tiles (short descriptions only):** ~90 words
- **Planning Ahead (previews only):** ~120 words
- **Did You Know carousel:** ~80 words
- **Superpowers carousel:** ~60 words

**Total visible on load:** ~550 words

**Total with all expansions:** ~1900 words

**Result:** Well under 1000-word target for initial load. Full depth available on demand.

---

## Integration Instructions

### To Use This Component

1. **Import in routing:**
```tsx
import { AutismPlanetMobile } from "@/components/library/AutismPlanetMobile";
```

2. **Add route (example):**
```tsx
// In your router or page component
<Route path="/library/autism-mobile" element={<AutismPlanetMobile />} />
```

3. **Or render conditionally:**
```tsx
{selectedPlanet === 'autism' && <AutismPlanetMobile onBack={handleBack} />}
```

### Props
```tsx
interface AutismPlanetMobileProps {
  onBack?: () => void; // Optional callback for "Return to Universe" button
}
```

If `onBack` is not provided, uses `window.history.back()`.

---

## Future Enhancements

### Possible Additions
1. **Save progress:** Remember which sections user has expanded
2. **Personalization:** Let users mark relevant strengths/challenges
3. **Share feature:** Export personal insights to PDF or text
4. **Audio version:** Text-to-speech for low-vision or reading-fatigued users
5. **Translations:** Multi-language support for global accessibility

### Performance Monitoring
- Track page load time
- Monitor scroll depth (which sections get expanded most)
- A/B test different "Read more" button placements
- Measure user engagement with interactive tiles

---

## Testing Checklist

### Mobile (Primary)
- [ ] Page loads in <2 seconds on 3G
- [ ] All touch targets are 44px+
- [ ] Text is readable without zooming
- [ ] Accordions expand/collapse smoothly
- [ ] Tiles respond to tap with visual feedback
- [ ] Carousels swipe naturally
- [ ] "Return to Universe" button works

### Tablet
- [ ] 2-column strength grid looks balanced
- [ ] Text line length remains comfortable (not stretched)
- [ ] Spacing scales appropriately

### Desktop
- [ ] Max-width 672px keeps content centered
- [ ] Hover states work on tiles and buttons
- [ ] Text remains readable on large screens

### Accessibility
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Screen reader announces section states
- [ ] Color contrast meets WCAG AA
- [ ] No motion sickness from float animation (gentle movement only)

### Content
- [ ] Tone is validating, not clinical
- [ ] No ableist language
- [ ] Balance of challenges and strengths
- [ ] Practical strategies are actionable

---

## File Structure

```
/src
  /components
    /library
      AutismPlanetMobile.tsx (main component)
  /data
    /planets
      autism-mobile.ts (content data)
```

### Data Export
```typescript
export const autismPlanetMobile = {
  name: string,
  tagline: string,
  icon: string,
  understandingIt: { preview: string[], fullContent: string[] },
  howItShowsUp: Array<{ id, title, icon, content: string[] }>,
  strengthsAndSensitivities: Array<{ id, title, shortDesc, fullDesc }>,
  planningAhead: Array<{ id, title, icon, preview, fullContent, examples }>,
  didYouKnowFacts: string[],
  superpowersFacts: string[]
}
```

---

## Design System Consistency

This pattern can be replicated for **all planet pages**:

### Planet-Specific Customization
- **Icon:** Change emoji (🧩 → 💜 for ADHD, etc.)
- **Color scheme:** Swap teal for planet-specific color
- **Content:** Update data file with planet-specific information
- **Section titles:** Adjust "How It Shows Up" categories if needed

### Universal Elements (Keep Consistent)
- Header structure
- Understanding It section with Read More
- 5-section accordion for daily life impacts
- 6-tile grid for strengths (2 columns)
- 4-section planning with examples
- 2 carousels (Did You Know + Superpowers)
- Footer with Return button

**Goal:** User learns the pattern once, then navigates all planets confidently.

---

## Questions or Issues?

### Common Problems

**Issue:** Accordion sections don't close previous one
**Fix:** Ensure `openSection === id ? null : id` logic in toggle function

**Issue:** Tiles stay expanded when tapping another
**Fix:** Same pattern - `expandedTile === id ? null : id`

**Issue:** Text feels too dense
**Fix:** Increase `space-y-4` spacing or reduce paragraph length

**Issue:** Load time >2 seconds
**Fix:** Check if carousels are loading heavy images, ensure Suspense boundary works

---

## Summary

The Autism Planet Mobile page delivers:
- ✅ Calm, validating UX with teal gradient and gentle motion
- ✅ Mobile-first layout (max 672px, 44px+ touch targets)
- ✅ Low cognitive load (550 words initial, progressive disclosure)
- ✅ Information-rich depth (1900 words total when fully expanded)
- ✅ Performant (simple gradient, lazy loading, <2s target)
- ✅ Accessible (keyboard nav, screen readers, WCAG AA contrast)
- ✅ Repeatable pattern for all planet pages

**Ready for user testing and iteration.**
