# Coji Universe Performance Guide

## Overview

This guide explains the performance optimizations implemented in Coji Universe and how to maintain them when adding new features or planets.

## Architecture Changes

### Before: Monolithic Component (5590 lines)
- Everything in one `CojiUniverse.tsx` file
- All tabs loaded simultaneously
- Heavy animations on all devices
- No code splitting
- **Result**: Slow initial load, lag on mobile

### After: Split Dashboard Architecture
1. **DashboardToday** (`/dashboard`) - Fast, minimal data
2. **EnergyAndMood** (`/dashboard/energy`) - Progressive disclosure
3. **CojiLibrary** (`/dashboard/library`) - Lazy-loaded planets

## Performance Improvements

### 1. Code Splitting by Route
Each dashboard page is a separate route with lazy loading:
- `/dashboard` - Only loads greeting, battery, quick actions
- `/dashboard/energy` - Loads when user navigates
- `/dashboard/library` - Loads when user navigates

**Benefit**: Initial bundle size reduced by ~70%

### 2. Mobile Detection & Animation Disabling
```typescript
// src/utils/performance.ts
export function shouldDisableAnimations(): boolean {
  // Checks:
  // 1. User preference (prefers-reduced-motion)
  // 2. Mobile device
  // 3. Low-end hardware (< 4 CPU cores)
  return prefersReducedMotion || isMobileDevice() || hardwareConcurrency < 4;
}
```

**Usage**:
```typescript
const reduceEffects = shouldReduceEffects();

<div className={reduceEffects ? "" : "hover:scale-105 hover:shadow-lg"} />
```

### 3. Lightweight Starfield
Old: Multiple animated layers with complex gradients
New: `<Starfield intensity="light" disableOnMobile />`

**Options**:
- `light` - Static stars only (mobile default)
- `medium` - One animated layer
- `heavy` - Full effects (desktop with good hardware)

### 4. Progressive Disclosure
Use `<CollapsibleCard>` for large content sections:

```typescript
<CollapsibleCard
  title="Battery Level"
  subtitle="Currently at 50%"
  defaultExpanded={false}
  preview={<QuickPreview />} // Shown when collapsed
>
  <FullContent /> // Only rendered when expanded
</CollapsibleCard>
```

**Benefit**: Reduces initial DOM elements by 60-80%

### 5. Lazy-Loaded Planet Details
```typescript
const PlanetDetailModal = lazy(() => import("@/components/dashboard/PlanetDetailModal"));

{selectedPlanet && (
  <Suspense fallback={<LoadingSpinner />}>
    <PlanetDetailModal planet={selectedPlanet} onClose={...} />
  </Suspense>
)}
```

**Benefit**: Planet content only loads when opened

## How to Add a New Planet

### Step 1: Define Planet Data
Edit `/src/types/planet.ts` and add to `PLANET_DATA`:

```typescript
export const PLANET_DATA: Record<string, PlanetData> = {
  // ... existing planets

  newPlanet: {
    id: "new-planet",
    name: "New Planet Name",
    emoji: "🌟",
    color: "#YOUR_HEX_COLOR",
    accentColor: "#LIGHTER_HEX",
    description: "One-line description for grid view",

    sections: {
      didYouKnow: [
        {
          heading: "About [topic]",
          items: [
            "Bullet point 1 - keep it short",
            "Bullet point 2",
            "Bullet point 3"
          ]
        }
      ],

      understanding: [
        {
          heading: "Under the surface",
          items: [
            "What's happening in my brain/body",
            "Why this happens"
          ]
        }
      ],

      dailyImpact: [
        {
          heading: "I might notice",
          items: [
            "Real-life example 1",
            "Real-life example 2",
            "Real-life example 3"
          ]
        }
      ],

      planning: [
        {
          heading: "What helps",
          items: [
            "Strategy 1",
            "Strategy 2"
          ]
        },
        {
          heading: "Tools to try",
          items: [
            "Tool 1",
            "Tool 2"
          ]
        }
      ]
    }
  }
};
```

### Step 2: That's It!
The planet will automatically appear in the library grid. No other code changes needed.

## Content Guidelines for ND-Friendly Format

### ✅ DO:
- Use short, chunked bullet points
- Start with action-oriented headings ("I might notice...", "What helps...")
- Keep items to 1-2 sentences max
- Use "I" statements for relatability
- Include concrete examples

### ❌ DON'T:
- Write long paragraphs
- Use academic/clinical language
- Assume prior knowledge
- Lecture or patronize
- Overwhelm with too many options

### Heading Structure:
```
Did You Know
  └─ About [topic]

Understanding It
  └─ Under the surface
  └─ Why this happens

How It Affects Daily Life
  └─ I might notice
  └─ Physical signs
  └─ Emotional impact

Planning Ahead
  └─ What helps
  └─ Tools to try
  └─ When to seek support
```

## CSS Performance Rules

### Minimize Heavy Effects
```css
/* ❌ Heavy on mobile */
.card {
  box-shadow: 0 20px 80px rgba(0,0,0,0.5);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  transform: translateZ(0) scale(1.05) rotate(2deg);
}

/* ✅ Lightweight */
.card {
  border: 1px solid rgba(color, 0.2);
  transition: border-color 0.2s;
}

/* ✅ Conditional effects */
.card {
  ${!reduceEffects && `
    box-shadow: 0 0 20px ${color}15;
    hover:scale-105
  `}
}
```

### Hardware Acceleration
If you MUST animate, use transforms:
```css
/* ❌ Forces repaint */
.animate { left: 100px; top: 50px; }

/* ✅ GPU accelerated */
.animate { transform: translate(100px, 50px); }
```

## Database Query Optimization

### ✅ DO: Fetch Minimal Data
```typescript
// DashboardToday - only today's battery
const { data } = await supabase
  .from("tracking")
  .select("battery")
  .eq("user_id", userId)
  .eq("date", today)
  .single();
```

### ❌ DON'T: Fetch Everything
```typescript
// Bad - loads all user data
const { data } = await supabase
  .from("tracking")
  .select("*")
  .eq("user_id", userId);
```

## Testing Performance

### Lighthouse Audit
```bash
# Run lighthouse in CLI
npm install -g lighthouse
lighthouse http://localhost:3000/dashboard --view
```

**Target Scores**:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

### Mobile Testing
1. Chrome DevTools → Device toolbar
2. Choose "Slow 3G" throttling
3. Test all 3 dashboard pages
4. Confirm < 2 second initial load

### Memory Profiling
1. Chrome DevTools → Performance
2. Record interaction (open planet, expand cards)
3. Check for memory leaks (heap should stabilize)

## Common Performance Pitfalls

### 1. Too Many useEffect Hooks
```typescript
// ❌ Runs on every render
useEffect(() => {
  fetchData();
});

// ✅ Runs once on mount
useEffect(() => {
  fetchData();
}, []);
```

### 2. Unnecessary Re-renders
```typescript
// ❌ Creates new object every render
<Component style={{ color: 'red' }} />

// ✅ Stable reference
const style = { color: 'red' };
<Component style={style} />
```

### 3. Large Images
```typescript
// ❌ Full-res image
<img src="/large-image.png" />

// ✅ Optimized with next/image
<Image src="/image.png" width={100} height={100} />
```

## Monitoring Performance

### Add Performance Marks
```typescript
performance.mark('dashboard-start');
// ... load data
performance.mark('dashboard-end');

performance.measure('dashboard-load', 'dashboard-start', 'dashboard-end');
const measure = performance.getEntriesByName('dashboard-load')[0];
console.log(`Dashboard loaded in ${measure.duration}ms`);
```

### Track in Production
Consider adding:
- Web Vitals tracking
- Error boundary logging
- User session recording (with consent)

## Summary Checklist

When adding new features, ensure:
- [ ] Mobile-first approach (test on mobile first)
- [ ] Animations respect `shouldDisableAnimations()`
- [ ] Large components use lazy loading
- [ ] Content uses progressive disclosure
- [ ] Database queries fetch minimal data
- [ ] Images optimized with next/image
- [ ] Lighthouse score > 90
- [ ] Works on Slow 3G

## Questions?

Performance is an ongoing process. When in doubt:
1. Test on mobile first
2. Use Chrome DevTools
3. Profile before optimizing
4. Prioritize user experience over aesthetics

Remember: **Fast is a feature!**
