# Coji Universe UX Redesign Guide

## 🌌 Concept: Cosmic, Emotionally Safe Exploration

The Coji Universe is designed as a calm, breathing space where neurodivergent users explore self-understanding through planetary metaphors. Each neurodivergence is a planet with its own atmosphere, colour palette, and gentle rhythm.

---

## 🎨 Design Principles

### 1. **Breathing Space**
- Large margins and padding (min 24px mobile, 40px desktop)
- Maximum 3 elements per visual cluster
- White space is sacred — never fill every pixel

### 2. **Gentle Motion**
- All animations: `ease-in-out` with durations 400ms–8s
- Respect `prefers-reduced-motion` — show static alternatives
- Pause animations when off-screen (battery/CPU friendly)

### 3. **Cognitive Kindness**
- Maximum 2 font sizes per section
- Maximum 3 colours per planet
- Icons with labels, never icons alone

### 4. **Accessibility First**
- Minimum 44px tap targets
- 4.5:1 contrast ratios
- Clear focus states (2px outline in planet colour)

---

## 🪐 Planet-Specific Atmospheres

### Autism Support 🌈
**Colours:** Lavender (`#a78bfa`), Cyan (`#06b6d4`), Indigo (`#6366f1`)

**Mood:** Gentle, structured, sensory-aware

**Background:** Deep purple-blue space with soft star twinkling

**Motion:** Slow orbit (20s), gentle float (6s)

### ADHD Support 🎯
**Colours:** Tangerine (`#fb923c`), Coral (`#f472b6`), Gold (`#fbbf24`)

**Mood:** Energetic but not overwhelming, warm

**Background:** Warm orange-amber space

**Motion:** Slightly faster orbit (18s), bouncy float

### Dyspraxia 🌊
**Colours:** Teal (`#14b8a6`), Mint (`#6ee7b7`), Blue-green (`#2dd4bf`)

**Mood:** Flowing, adaptive, patient

**Background:** Ocean-deep teal space

**Motion:** Wave-like float, smooth orbit

### Dyslexia & Dyscalculia 📚
**Colours:** Berry Pink (`#ec4899`), Deep Purple (`#a855f7`), Rose (`#f472b6`)

**Mood:** Creative, pattern-oriented, celebratory

**Background:** Magenta-purple space

**Motion:** Gentle spin, soft glow pulse

### Anxiety Tools 🧘
**Colours:** Soft Grey-Blue (`#94a3b8`), Silver (`#cbd5e1`), Slate (`#64748b`)

**Mood:** Calm, grounding, meditative

**Background:** Misty grey-blue space

**Motion:** Very slow, minimal — emphasis on stillness

---

## 📐 Component Specifications

### PlanetOrb Component

**Purpose:** Animated celestial body representing each neurodivergence

**Sizes:**
- Small: 80px (for cards/lists)
- Medium: 128px (for modals)
- Large: 160px mobile, 192px desktop (for planet pages)

**Animation Layers:**
1. **Orbit Ring:** Rotates 360° in 20s, has single dot marker
2. **Glow Halo:** Pulsates opacity 30–50% in 4s
3. **Planet Sphere:** Floats up/down 10px in 6s
4. **Emoji:** Rotates 360° in 30s
5. **Shimmer:** Background gradient shifts in 8s

**Performance:**
- CSS-only transforms (GPU accelerated)
- Pauses when `document.hidden` or off-screen
- Disabled entirely if `prefers-reduced-motion: reduce`

**Code Example:**
```tsx
<PlanetOrb
  emoji="🌈"
  colour="#a78bfa"
  size="large"
  showOrbitRing={true}
/>
```

---

### FactCarousel Component

**Purpose:** Showcase "Did You Know?" facts with smooth transitions

**Layout:**
- Single fact visible at a time
- Minimum height: 280px mobile, 240px desktop
- Icon above text (Sparkles with planet colour)
- Optional "Learn Strategies" button below

**Navigation:**
- Left/right arrow buttons (24px icons)
- Dot indicators below (8px inactive, 32px×8px active)
- Auto-advances every 8 seconds (pauses on manual interaction)

**Transitions:**
- Fade + translate (700ms ease-in-out)
- Previous slide: `-translate-x-full opacity-0`
- Current slide: `translate-x-0 opacity-100`
- Next slide: `translate-x-full opacity-0`

**Accessibility:**
- Arrow buttons have `aria-label`
- Dots have `aria-label="Go to fact N"`
- Can be navigated with keyboard arrows

**Code Example:**
```tsx
<FactCarousel
  facts={planet.mindgram.did_you_know}
  colour="#a78bfa"
  onLearnMore={() => scrollToStrategies()}
/>
```

---

### SuperpowersClusters Component

**Purpose:** Group 60+ experiences into 5 calm, explorable clusters

**Clusters:**
1. **Daily Life** 🏠 — Teal (`#14b8a6`)
2. **Work & Study** 💼 — Orange (`#f97316`)
3. **Social & Communication** 👥 — Fuchsia (`#d946ef`)
4. **Self-Care & Health** ❤️ — Pink (`#ec4899`)
5. **Memory & Focus** 🧠 — Purple (`#8b5cf6`)

**Layout:**
- Grid: 1 column mobile, 2 columns tablet, 3 columns desktop
- Card size: Min 200px height, flexible width
- Gap: 24px

**Card States:**
- **Default:** Subtle gradient background, 2px border
- **Hover:** Scale 105%, glow shadow, floating icon
- **Active/Clicked:** Opens modal

**Modal Flow:**
1. **Cluster Modal:** Lists all experiences in that cluster
   - Experience buttons: Large (min 64px height), clear text
   - Each shows symptom + strength preview
2. **Experience Modal:** Shows full validation + strategies
   - Validation message in coloured card
   - Numbered strategy list (1, 2, 3...)
   - Close button (X) top-right

**Micro-Interactions:**
- Cards animate in sequentially (100ms delay each)
- Hover triggers gentle float animation
- Click has 400ms scale-in modal appearance

**Code Example:**
```tsx
<SuperpowersClusters
  onExperienceClick={(exp) => console.log(exp)}
/>
```

---

### PlanetPage Component

**Purpose:** Immersive landing page for each planet

**Structure:**
```
[Twinkling Stars Background]
  ↓
[Back Button] ← small, top-left
  ↓
[Header Section]
  - Large PlanetOrb (animated)
  - Welcome headline
  - Description paragraph
  - Tagline (italic, smaller)
  - Horizontal glow line
  ↓
[Did You Know Carousel]
  - Title: "Did You Know?"
  - Fact carousel (auto-playing)
  ↓
[Superpowers in Disguise Section]
  - Title + Activity icon
  - Grid of clickable experience tags
  ↓
[Overlaps Section]
  - "Often Overlaps With" title
  - Grid of overlap cards
  ↓
[Footer]
  - "Explore Another Planet" button
```

**Background:**
- Radial gradient from planet colour to deep space
- 50 twinkling stars (randomised positions)
- Bottom atmospheric glow (blur-3xl)

**Animations:**
- Header: `animate-slide-up`
- Carousel: `animate-slide-up` with 200ms delay
- Superpowers: `animate-slide-up` with 400ms delay
- Overlaps: `animate-slide-up` with 600ms delay

**Code Example:**
```tsx
<PlanetPage
  planetId="autism-support"
  planetData={planet}
  onBack={() => navigate('/library')}
  onTagClick={(tag) => searchFor(tag)}
/>
```

---

## 🎭 Micro-Interaction Specifications

### Hover States

**Buttons/Cards:**
- Transition duration: 300ms
- Scale: 105% (use `transform: scale(1.05)`)
- Shadow: Add coloured glow (`0 10px 40px ${colour}30`)
- Cursor: `cursor: pointer`

**Icons:**
- Transition: 300ms
- Transform: Slight movement (e.g., ArrowLeft moves -4px on hover)

### Focus States

**All interactive elements:**
- Outline: 2px solid planet colour
- Outline offset: 2px
- Transition: 200ms
- Border radius: Match element radius

### Click/Tap Feedback

**Cards:**
- Scale down to 98% for 100ms
- Then scale to 105% and open modal

**Buttons:**
- Slight darken effect (reduce opacity to 90%)
- Ripple effect (optional, only if reduced motion off)

### Loading States

**Skeletons:**
- Use `animate-pulse` (2s duration)
- Background: `${colour}10`
- No shimmer effect (battery drain)

---

## 🎨 Typography Scale

### Headings
- **H1 (Planet Title):** 40px mobile, 48px desktop — font-bold
- **H2 (Section Title):** 24px mobile, 32px desktop — font-bold
- **H3 (Subsection):** 20px mobile, 24px desktop — font-bold
- **H4 (Card Title):** 18px mobile, 20px desktop — font-semibold

### Body Text
- **Large:** 18–20px — used for descriptions
- **Base:** 16px — default body text
- **Small:** 14px — meta information
- **Tiny:** 12px — timestamps, labels

### Line Height
- Headings: 1.2
- Body: 1.6 (relaxed reading)

### Font Stack
```css
font-family: system-ui, -apple-system, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
.container {
  padding: 16px; /* Mobile */
}

@media (min-width: 640px) { /* sm */
  .container {
    padding: 24px;
  }
}

@media (min-width: 768px) { /* md */
  .container {
    padding: 32px;
  }
  /* Switch from 1 column to 2 columns */
}

@media (min-width: 1024px) { /* lg */
  .container {
    padding: 40px;
  }
  /* Switch to 3 columns */
}

@media (min-width: 1280px) { /* xl */
  /* Max width container: 1280px */
}
```

---

## ♿ Accessibility Checklist

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Focus order follows visual order
- [ ] Escape key closes modals
- [ ] Arrow keys navigate carousels
- [ ] Tab/Shift+Tab moves through elements

### Screen Readers
- [ ] All images have alt text
- [ ] Buttons have descriptive labels
- [ ] Modals announce when opened
- [ ] Loading states announced
- [ ] Error messages associated with inputs

### Motion & Animation
- [ ] `prefers-reduced-motion` respected
- [ ] Alternative static content provided
- [ ] No auto-playing videos
- [ ] Animations can be paused

### Colour & Contrast
- [ ] 4.5:1 contrast for body text
- [ ] 3:1 contrast for large text (18px+)
- [ ] Information not conveyed by colour alone
- [ ] Focus indicators visible

---

## 🧪 Component Usage Examples

### Complete Planet Page Integration

```tsx
import PlanetPage from '@/components/PlanetPage';
import { getPlanetTheme } from '@/lib/planetThemes';

function AutismSupportPage() {
  const planetData = {
    title: "Autism Support",
    description: "Gentle guidance for sensory needs, communication, and daily life",
    mindgram: {
      did_you_know: [
        "Stimming isn't 'bad behaviour' — it's self-regulation",
        "Many autistic people think in pictures, not words",
        "Eye contact can feel physically painful for some"
      ],
      overlaps: [
        "ADHD (AuDHD)",
        "Anxiety",
        "Sensory Processing Disorder"
      ]
    },
    orbit_tags: [
      "Sensory overload",
      "Social exhaustion",
      "Need for routine",
      "Masking fatigue"
    ]
  };

  return (
    <PlanetPage
      planetId="autism-support"
      planetData={planetData}
      onBack={() => router.push('/library')}
      onTagClick={(tag) => {
        router.push(`/search?q=${tag}`);
      }}
    />
  );
}
```

### Superpowers Clusters in Library

```tsx
import SuperpowersClusters from '@/components/SuperpowersClusters';

function LibraryPage() {
  return (
    <div>
      <h1>Your Superpowers in Disguise</h1>
      <p>Every quirk is a feature, not a bug</p>

      <SuperpowersClusters
        onExperienceClick={(experience) => {
          // Track analytics
          console.log('Experience clicked:', experience.symptom);

          // Could also open a separate detail page
          router.push(`/strategy/${experience.symptom}`);
        }}
      />
    </div>
  );
}
```

---

## 🎯 Design Tokens

### Animation Durations
```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;
--duration-float: 6s;
--duration-orbit: 20s;
--duration-spin: 30s;
```

### Spacing Scale
```css
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 32px;
--space-xl: 48px;
--space-2xl: 64px;
```

### Border Radius
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;
```

---

## 📦 Component File Structure

```
src/
├── components/
│   ├── PlanetOrb.tsx           // Animated planet sphere
│   ├── FactCarousel.tsx        // Did You Know carousel
│   ├── SuperpowersClusters.tsx // Clustered experiences
│   ├── PlanetPage.tsx          // Complete planet page
│   └── VirtualisedTipList.tsx  // Performance-optimised list
├── hooks/
│   ├── useReducedMotion.ts    // Detects motion preference
│   └── useIntersectionObserver.ts // Visibility detection
├── lib/
│   └── planetThemes.ts         // Colour palettes & themes
└── app/
    └── planet/[id]/page.tsx    // Planet route
```

---

## 🚀 Implementation Checklist

### Phase 1: Core Components
- [x] PlanetOrb with animations
- [x] FactCarousel with transitions
- [x] SuperpowersClusters with modals
- [x] Planet themes configuration
- [x] Tailwind animations

### Phase 2: Integration
- [ ] Replace existing planet view with PlanetPage
- [ ] Replace orbit tags section with SuperpowersClusters
- [ ] Add FactCarousel to planet pages
- [ ] Update Library grid with PlanetOrb

### Phase 3: Polish
- [ ] Add loading skeletons
- [ ] Test keyboard navigation
- [ ] Test screen reader announcements
- [ ] Performance audit (60fps check)
- [ ] Cross-browser testing

### Phase 4: Testing
- [ ] Test on real mobile devices
- [ ] Test with reduced motion enabled
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] User testing with neurodivergent users

---

## 💡 Future Enhancements

1. **Parallax scrolling** on planet pages (gentle, < 20% movement)
2. **Constellation lines** connecting related experiences
3. **Planet rotation on scroll** (tied to scroll position)
4. **Personalisation** — remember favorite planets
5. **Dark/light mode toggle** (though dark is primary)
6. **Custom planet creation** — users design their own
7. **Collaborative features** — share experiences with others

---

**Status:** Design System Complete ✨
**Version:** 1.0
**Last Updated:** 2025-10-29
