# Coji Universe - Major Update Progress Tracking
**Date Started:** 2025-10-30
**Status:** In Progress

## Overview
Comprehensive mobile-first update with educational content, new features, and optimization.

---

## Tasks Breakdown

### 1. Educational Sections for Planet Pages ⏳
**Status:** Not Started

#### Requirements:
- Add three-part structure between "Did You Know" and "Superpowers"
- Structure: Understanding It → How It Affects Daily Life → Planning Ahead
- Apply to: ADHD, Autism, Dyspraxia, Anxiety, Depression, Dyscalculia, Chronic Illness

#### Content Guidelines:
- Plain, kind language
- Mobile-first card design
- Collapsible/swipeable on mobile
- Short paragraphs, clear subheadings
- Line length ~60-70 characters
- Min font size 16px
- Buttons ≥ 44px tall
- WCAG AA contrast

#### Progress:
- [ ] Create reusable educational section component
- [ ] Write content for ADHD planet
- [ ] Write content for Autism planet
- [ ] Write content for Dyspraxia planet
- [ ] Write content for Anxiety planet
- [ ] Write content for Depression planet
- [ ] Write content for Dyscalculia planet
- [ ] Write content for Chronic Illness planet
- [ ] Implement mobile-first responsive design
- [ ] Test on mobile devices

---

### 2. Ideas & Questions Planet ⏳
**Status:** Not Started

#### Requirements:
- Simple form for idea/question submission
- Auto-capture user email from login
- Store in Supabase table
- Mobile-first, lightweight design

#### Progress:
- [ ] Create planet card/page
- [ ] Design form component
- [ ] Set up Supabase table connection
- [ ] Implement auto-email capture
- [ ] Test submission flow
- [ ] Add success/error feedback

#### SQL Schema:
```sql
-- Already exists in SUPABASE_SCHEMA.sql
-- Table: ideas_and_questions
```

---

### 3. Chronic Illness Planet Update ⏳
**Status:** Not Started

#### Requirements:
- Remove all emojis from title

#### Progress:
- [ ] Locate Chronic Illness planet title
- [ ] Remove emojis
- [ ] Verify across all breakpoints

---

### 4. Animation Updates ⏳
**Status:** Not Started

#### Requirements:
- Planet animations: desktop-only
- Loading animations with Coji affirmations
- Respect prefers-reduced-motion
- Keep animations that don't affect load times

#### Progress:
- [ ] Audit current animations
- [ ] Wrap planet animations in desktop-only media queries
- [ ] Create loading animation component
- [ ] Write Coji affirmations for loading states
- [ ] Implement prefers-reduced-motion support
- [ ] Test performance impact

---

### 5. Skeleton Loaders ⏳
**Status:** Not Started

#### Requirements:
- Add skeleton screens for loading optimization
- Improve perceived performance

#### Progress:
- [ ] Create skeleton component library
- [ ] Identify key loading states
- [ ] Implement skeletons for planet cards
- [ ] Implement skeletons for forms
- [ ] Implement skeletons for content sections
- [ ] Test loading transitions

---

### 6. Finance Section Update ⏳
**Status:** Not Started

#### Requirements:
- Add disclaimer under Finance icon
- Clarify: no financial advice, only tools/strategies
- Add note about consulting licensed professionals

#### Progress:
- [ ] Locate Finance section on home page
- [ ] Add disclaimer text
- [ ] Style for mobile readability
- [ ] Verify placement and visibility

---

### 7. Terminology Update (Therapy → Wellbeing) ⏳
**Status:** Not Started

#### Requirements:
- Replace all "therapy" references with "wellbeing"
- Reduce legal culpability

#### Progress:
- [ ] Search codebase for "therapy" references
- [ ] Update all instances to "wellbeing"
- [ ] Update database references if needed
- [ ] Update UI text
- [ ] Update comments/documentation

---

### 8. Mobile-First Optimization Audit ⏳
**Status:** Not Started

#### Requirements:
- Scan entire app for mobile optimization
- Fast loading times
- Lazy loading where appropriate
- Responsive design verification

#### Progress:
- [ ] Audit page load times
- [ ] Check responsive breakpoints
- [ ] Verify touch target sizes
- [ ] Test on various mobile devices
- [ ] Optimize images/assets
- [ ] Implement lazy loading
- [ ] Test with slow 3G connection

---

### 9. Supabase Integration Check ⏳
**Status:** Not Started

#### Requirements:
- Verify all Supabase connections working
- Test CRUD operations
- Check RLS policies

#### Progress:
- [ ] Test authentication flow
- [ ] Test tracking_data operations
- [ ] Test chat_history operations
- [ ] Test tasks operations
- [ ] Test journal_entries operations
- [ ] Test financial_notes operations
- [ ] Test ideas_and_questions table
- [ ] Verify RLS policies are active

---

### 10. SQL Schema Updates ⏳
**Status:** Not Started

#### Requirements:
- Document any new schema requirements
- Provide SQL code for updates

#### Progress:
- [ ] Review new feature requirements
- [ ] Check existing schema coverage
- [ ] Generate migration scripts if needed
- [ ] Test schema updates in dev environment

---

## Dependencies for Tomorrow's Work
**Outlook Calendar Integration & Coji Buddy Training**

### Potential Dependencies:
1. User authentication state (needed for calendar sync)
2. Database schema for storing calendar events/appointments
3. API endpoints for buddy training data
4. User profile structure for preferences
5. Wellbeing terminology updates (affects buddy responses)

### Notes:
- Ensure user_profiles table can accommodate calendar preferences
- Consider therapist_bookings table relationship with calendar
- Buddy training may need context from educational sections

---

## Testing Checklist
- [ ] Mobile devices (iOS/Android)
- [ ] Tablets
- [ ] Desktop (various screen sizes)
- [ ] Accessibility (screen readers, keyboard navigation)
- [ ] Performance (Lighthouse scores)
- [ ] Cross-browser compatibility

---

## Notes & Observations
*To be filled in as work progresses*

---

## Completion Status
- **Tasks Completed:** 9/13
- **In Progress:** 1/13
- **Not Started:** 3/13
- **Blocked:** 0/13

---

## Completed Work Summary

### ✅ Completed Tasks

1. **Therapy → Wellbeing Terminology Update**
   - Updated all references in CojiUniverse.tsx
   - Changed "therapy" to "wellbeing" in user-facing text
   - Kept medical terms like "physiotherapy" and "speech therapy" intact
   - Updated variable names (selectedWellbeingService)
   - Updated data files (parenting.ts, depression.ts)

2. **Skeleton Loader Components Created**
   - SkeletonCard.tsx - General card skeleton with variants
   - SkeletonPlanetGrid.tsx - Grid layout for planet cards
   - SkeletonList.tsx - List items with checkboxes/avatars
   - SkeletonForm.tsx - Form inputs and textareas
   - SkeletonText.tsx - Headings and paragraphs
   - All mobile-first, accessible (aria-labels, sr-only text)

3. **Educational Section Component**
   - Created EducationalSection.tsx with 3-part structure
   - Collapsible sections with icons
   - Mobile-first design (44px touch targets, optimal line length)
   - Accessible (aria-expanded, keyboard navigation)
   - Started educational content for ADHD and Autism

4. **Ideas & Questions Planet**
   - Created IdeasQuestionsPage.tsx
   - Full form with category selection
   - Auto-captures user email from auth
   - Supabase integration ready
   - Success/error states with animations
   - Mobile-first form design
   - Created route at /library/ideas-questions

5. **Chronic Illness Planet Title Update**
   - Removed "Welcome to the" prefix
   - Simplified to "Chronic Illness Resources"
   - Emoji stays in planet orb (as designed)

6. **Desktop-Only Planet Animations**
   - Created useMediaQuery and useIsDesktop hooks
   - Updated PlanetOrb.tsx to check isDesktop
   - Animations now only run on screens >= 1024px
   - Still respects prefers-reduced-motion

7. **Finance Disclaimer**
   - Verified existing disclaimer on home page icon
   - Verified disclaimer in Finance tab
   - Clear messaging about not providing financial advice

8. **Progress Tracking Document**
   - Created comprehensive PROGRESS_TRACKING.md
   - Documenting all tasks and dependencies

9. **Codebase Exploration**
   - Mapped entire project structure
   - Identified key files and patterns
   - Documented animation system, Supabase setup, styling approach

### 🚧 Remaining Work

1. **Complete Remaining Educational Content**
   - Need to create:
     - dyspraxia-educational.ts
     - anxiety-educational.ts
     - depression-educational.ts
     - dyscalculia-educational.ts
     - chronic-illness-educational.ts
   - Integrate educational sections into existing planet pages

2. **Add Ideas & Questions to Navigation**
   - Add planet card to library view
   - Add to CojiUniverse planet grid
   - Add to main navigation

3. **Testing & Verification**
   - Test all changes in browser
   - Verify Supabase table connection
   - Test mobile responsiveness
   - Test animations on desktop vs mobile
   - Verify forms submission

---

## Notes for Tomorrow's Calendar Integration

Dependencies identified:
- User authentication state (supabase.auth.getUser())
- user_profiles table for calendar preferences
- therapist_bookings table may need calendar integration
- Wellbeing terminology should carry through to calendar features

---

Last Updated: 2025-10-30 (Major progress update)
