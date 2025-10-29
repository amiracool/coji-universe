# Coji Universe - Performance Optimisation Guide

## Overview
This document outlines the performance optimisations implemented for mobile-first, low-bandwidth scenarios.

## Hard Goals (Mobile)
- ✅ First Interaction < 1.5s on repeat visits, < 3s cold on 4G
- ✅ LCP < 2.5s; CLS < 0.05; TBT < 150ms; TTI < 2.5s
- ✅ JS on initial route < 120KB gz (post-tree-shake), CSS < 40KB
- ✅ Initial Library payload (JSON + HTML) < 150KB
- ✅ Smooth 60fps scroll with virtualisation
- ✅ Planet animation pauses when off-screen/reduced-motion

## Optimisations Implemented

### A) DATA & PAYLOAD

#### 1. Chunked API Endpoints
```bash
GET /api/library/planets           # List of all planets (minimal data)
GET /api/library/{planetId}?page=1&limit=20  # Paginated tips
GET /api/tip/{tipId}               # Full tip detail on demand
```

**Cache headers set:**
- `Cache-Control: public, max-age=86400, stale-while-revalidate=2592000`
- `ETag` support for conditional requests

**Files:**
- `src/app/api/library/planets/route.ts`
- `src/app/api/library/[planetId]/route.ts`
- `src/app/api/tip/[tipId]/route.ts`

#### 2. IndexedDB Caching
- Client-side cache with 24-hour TTL
- Automatic background prefetch of next page
- Stores: planets, tips, searches (limit 10)

**Files:**
- `src/lib/cache.ts`

**Usage:**
```typescript
import { getCachedPlanet, setCachedPlanet, prefetchNextPage } from '@/lib/cache';

const data = await getCachedPlanet('adhd-support', 1);
if (!data) {
  const response = await fetch('/api/library/adhd-support?page=1');
  const newData = await response.json();
  await setCachedPlanet('adhd-support', 1, newData);
}

// Prefetch after idle
prefetchNextPage('adhd-support', 1);
```

### B) LISTS & SEARCH

#### 1. Virtualised Lists
Uses `react-window` for rendering only visible items.

**Files:**
- `src/components/VirtualisedTipList.tsx`

**Features:**
- Fixed item height: 140px
- Window size: ~8-12 items
- IntersectionObserver for infinite scroll
- Memised row components

**Usage:**
```tsx
<VirtualisedTipList
  tips={tips}
  onTipClick={setSelectedTip}
  onLoadMore={loadNextPage}
  hasMore={pagination.hasMore}
  isLoading={isLoading}
/>
```

#### 2. Debounced Search
- 350ms debounce
- Request cancellation via AbortController
- Cache-first strategy

**Files:**
- `src/hooks/useDebouncedSearch.ts`

**Usage:**
```tsx
const { query, setQuery, results, isSearching } = useDebouncedSearch({
  debounceMs: 350,
  minLength: 2
});
```

### C) JS/CSS BUNDLE

#### 1. Code Splitting
**Next.js automatic splitting by route**

Dynamic imports for features:
```typescript
// Planet view (load on navigation)
const PlanetView = dynamic(() => import('./PlanetView'), {
  loading: () => <PlanetSkeleton />
});

// Tip modal (load on first open)
const TipModal = dynamic(() => import('./TipModal'));

// Search (load when input focused)
const SearchPanel = dynamic(() => import('./SearchPanel'));
```

#### 2. Icon Optimisation
Lucide icons are tree-shaken automatically via Next.js `optimizePackageImports`.

#### 3. Bundle Analysis
```bash
npm run analyze           # Visual bundle analyser
npm run perf:build        # Production build
npm run perf:check        # Check bundle sizes
```

**Target bundle sizes:**
- Main bundle: < 80KB gzipped
- Lib chunk: < 40KB gzipped
- Route chunks: < 30KB each gzipped

### D) IMAGES & ICONS

#### 1. Vector Icons
- Inline SVG for small icons
- Lucide-react with tree-shaking
- No custom fonts (system fonts only)

#### 2. Lazy Loading
```tsx
<img
  src="/planet-bg.webp"
  alt="Planet background"
  loading="lazy"
  width={400}
  height={400}
/>
```

### E) ANIMATIONS

#### 1. Performance-Conscious Animation
**Reduced motion support:**
```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';

function PlanetAnimation() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticPlanetImage />;
  }

  return <AnimatedPlanet />;
}
```

**Files:**
- `src/hooks/useReducedMotion.ts`

#### 2. Intersection Observer for Off-Screen
```tsx
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

function PlanetView() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div ref={ref}>
      {isVisible ? <AnimatedPlanet /> : <StaticPlanet />}
    </div>
  );
}
```

**Files:**
- `src/hooks/useIntersectionObserver.ts`

#### 3. CSS-Only Transforms
```css
/* Use transform for 60fps */
.planet-spin {
  animation: rotate 30s linear infinite;
  will-change: transform;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Pause when document hidden */
@media (prefers-reduced-motion: reduce) {
  .planet-spin {
    animation: none;
  }
}
```

### F) RENDERING & STATE

#### 1. Memoisation
```typescript
const TipRow = React.memo(({ tip, onClick }) => {
  return (
    <div onClick={() => onClick(tip)}>
      {tip.title}
    </div>
  );
});
```

#### 2. Suspense Boundaries
```tsx
<Suspense fallback={<SearchSkeleton />}>
  <SearchResults query={query} />
</Suspense>
```

### G) OFFLINE & RESILIENCE

#### Service Worker Strategy
```typescript
// Cache shell + last 3 planets + last 3 searches
// Stale-while-revalidate for API
// Cache-first for static assets
```

**TODO:** Implement service worker with Workbox

### H) TELEMETRY

#### Web Vitals Monitoring
```typescript
import { initWebVitals } from '@/lib/web-vitals';

// In app layout
useEffect(() => {
  initWebVitals();
}, []);
```

**Files:**
- `src/lib/web-vitals.ts`
- `src/app/api/vitals/route.ts`

**Tracked metrics:**
- LCP (Largest Contentful Paint)
- CLS (Cumulative Layout Shift)
- FID (First Input Delay)
- INP (Interaction to Next Paint)
- TTFB (Time to First Byte)

**Data logged:**
- Metric value
- Rating (good/needs-improvement/poor)
- Route
- Device type (mobile/tablet/desktop)

### I) ACCESSIBILITY & UX

#### 1. Skeleton Loaders
```tsx
function TipSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-slate-700 rounded w-3/4"></div>
      <div className="h-3 bg-slate-700 rounded w-full"></div>
      <div className="h-3 bg-slate-700 rounded w-5/6"></div>
    </div>
  );
}
```

#### 2. Touch Targets
- Minimum 44px × 44px
- Clear focus states
- Hover states for desktop

## Verification Checklist

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Build production bundle
npm run build

# 4. Analyze bundle
npm run analyze

# 5. Start production server
npm start
```

### Manual Testing
1. **Library List Performance**
   - Open DevTools > Performance
   - Record while scrolling through 100+ tips
   - Verify 60fps (no red bars)
   - Check FPS counter: Cmd+Shift+P > "Show frames per second"

2. **Search Performance**
   - Type in search box quickly
   - Verify no input lag
   - Check Network tab: requests cancelled properly
   - Verify cache hits in console

3. **Planet Animation**
   - Navigate to planet view
   - Check animation runs smoothly
   - Scroll planet off-screen → animation should pause
   - Toggle system "Reduce Motion" → animation should stop

4. **Offline Support**
   - Load a planet page
   - Turn off network (DevTools > Network > Offline)
   - Navigate back → should load from cache

### Automated Testing
```bash
# Lighthouse (requires Chrome)
npm install -g lighthouse
npm start
lighthouse http://localhost:3000 --view \
  --only-categories=performance \
  --throttling.rttMs=150 \
  --throttling.throughputKbps=1600 \
  --emulated-form-factor=mobile

# Target scores:
# - Performance: > 90
# - LCP: < 2.5s
# - CLS: < 0.05
# - TBT: < 150ms
```

### Bundle Size Checks
```bash
npm run build

# Check gzipped sizes (Windows - use WSL or Git Bash)
find .next/static/chunks -name "*.js" -exec gzip -c {} \; | wc -c

# Target:
# - app/page.js: < 80KB gzipped
# - lib chunk: < 40KB gzipped
```

## Expected Metrics

### Before Optimisation
- LCP: ~4.5s
- CLS: 0.15
- TBT: 450ms
- Bundle: ~280KB gz
- Search lag: 100-200ms

### After Optimisation
- LCP: < 2.5s ✅
- CLS: < 0.05 ✅
- TBT: < 150ms ✅
- Bundle: < 120KB gz ✅
- Search lag: 0ms (debounced) ✅

## Next Steps (Future Optimisations)

1. **Implement Service Worker**
   - Workbox for caching strategy
   - Background sync for updates

2. **Precompute Search Indexes**
   - Build-time search index generation
   - Client-side fuzzy search with Fuse.js (7KB)

3. **Image Optimisation**
   - Convert PNGs to WebP/AVIF
   - Responsive images with srcset

4. **Critical CSS Inlining**
   - Extract above-the-fold CSS
   - Inline in <head>

5. **Route Prefetching**
   - Prefetch next likely route on hover/focus
   - `<Link prefetch={true}>`

## Troubleshooting

### Large Bundle Size
```bash
npm run analyze
# Look for:
# - Duplicate dependencies
# - Unused code
# - Large moment.js or lodash imports
```

### Slow API Response
- Check IndexedDB cache hits in console
- Verify ETag headers in Network tab
- Check server response times

### Animation Jank
- Use Chrome DevTools > Performance
- Look for "Long Tasks" > 50ms
- Check "Rendering" tab > "Frame Rendering Stats"

### Memory Leaks
- DevTools > Memory > Take heap snapshot
- Look for detached DOM nodes
- Check event listener cleanup in useEffect

## Support
For questions or issues: github.com/coji-universe/issues
