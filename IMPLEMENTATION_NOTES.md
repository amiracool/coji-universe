# Coji Universe Implementation Notes

## Changes Made - 28 October 2025

### 1. Database Schema (supabase-setup.sql) ✅
- Added `eisenpower_tasks` table for Eisenhower Matrix tasks with energy fields
- Added health data tables:
  - `menstrual_cycles`
  - `appointments`
  - `medications`
  - `prescription_reminders`
  - `screening_reminders`
  - `pregnancy_tracking`
  - `eat_reminders`
  - `activity_tracking`
  - `health_card_preferences`
- All tables have Row Level Security (RLS) enabled
- Proper indexes created for performance

### 2. Legal Pages Created ✅
- `/privacy` - Privacy Policy page (British English)
- `/terms` - Terms & Conditions page (British English)
- Both pages styled consistently with the app
- Footer updated with links to both pages

### 3. British English Changes ✅ (PARTIALLY COMPLETE)
Completed conversions in CojiUniverse.tsx:
- "prioritize" → "prioritise" (3 instances)
- "Organize" → "Organise" (1 instance)
- "prioritization" → "prioritisation" (1 instance)

Note: "color" appears mostly in CSS props (colorStart, colorEnd) which should remain as-is
Note: "Calendar" remains as proper noun for Google/Outlook Calendar

### 4. TODO - Eisenpower Matrix Enhancements
Current state: Tasks stored in local state as arrays of strings
Needed changes:
1. Update interface to include energy field for each task
2. Change storage from state arrays to Supabase `eisenpower_tasks` table
3. Make all quadrants directly editable (inline input)
4. Remove need for separate "add task" input - type directly in boxes

### 5. Library Universe Navigation ✅ COMPLETED
Implemented full planet navigation system:
- ✅ Added onClick handlers to all 12 library cards with hover effects
- ✅ Conditional rendering based on `selectedPlanet` state
- ✅ Planet view features:
  - Spinning planet with radial gradient (uses existing `spin` animation)
  - Orbit ring around planet
  - Dynamic colour theming per planet from JSON data
  - "Did You Know" facts grid (displays first 6 facts)
  - Orbit tags showing common experiences/symptoms as chips
  - "Often Overlaps With" section showing condition overlaps
  - Back button navigation at top and bottom
  - Hover scale and shadow effects on cards
- ✅ Loads all data from `neuro_library.json`
- Each planet has unique icon, colour, description from JSON

**Files Affected:** `src/components/CojiUniverse.tsx` (lines 3628-3920)

### 6. TODO - Calendar Integration
Current state: `addTaskToCalendar` function exists at line 601 but may have issues
Needed investigation:
1. Check OAuth token persistence
2. Verify Google Calendar API requests
3. Add proper error handling and user feedback
4. Test the complete flow

### 7. TODO - Migrate localStorage to Supabase
All health data currently uses localStorage as fallback. Need to:
1. Remove localStorage reads for health data
2. Implement Supabase CRUD operations for all health tables
3. Update all `useState` initializations to load from Supabase
4. Remove localStorage setItem calls throughout

### 8. TODO - Outlook Calendar
Add alongside Google Calendar:
1. Sign in with Microsoft OAuth
2. Similar integration flow as Google
3. Calendar view and task syncing

### 9. Analysis Data Logging
Ensure all tracking_data saves properly log to Supabase with timestamps

## Next Steps Priority
1. British English conversion (quick wins)
2. Eisenpower Matrix rebuild with Supabase
3. Library planet navigation
4. Health data Supabase migration
5. Outlook calendar prep
6. Test calendar integration
