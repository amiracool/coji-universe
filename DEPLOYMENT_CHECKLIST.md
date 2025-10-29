# Coji Universe - Deployment Checklist

## ✅ COMPLETED (Ready to Deploy)

### 1. Database Schema
- [x] Created `supabase-setup.sql` with all necessary tables
- [x] Added `eisenpower_tasks` table with energy fields and quadrant tracking
- [x] Added health data tables (cycles, appointments, meds, etc.)
- [x] All RLS policies configured for user data security
- [x] Indexes created for performance

**Action Required:** Run the SQL file in your Supabase dashboard

### 2. Legal Compliance
- [x] Created Privacy Policy page at `/privacy`
- [x] Created Terms & Conditions page at `/terms`
- [x] Added footer with links to both pages
- [x] All pages use British English

### 3. British English Conversion
- [x] "prioritize" → "prioritise" (3 instances)
- [x] "Organize" → "Organise"
- [x] "prioritization" → "prioritisation"

## ⚠️ REQUIRES CODE CHANGES (Complex - Not Yet Implemented)

### 4. Eisenpower Matrix Enhancements
**Current State:** Working with inline editing, stores tasks as string arrays in component state

**Required Changes:**
1. Update `EisenpowerTask` interface to include:
   ```typescript
   interface EisenpowerTask {
     id?: string;
     text: string;
     energy_required: number;
     quadrant: 'urgentImportant' | 'urgentNotImportant' | 'notUrgentImportant' | 'notUrgentNotImportant';
   }
   ```

2. Change state from arrays of strings to arrays of objects:
   ```typescript
   const [eisenhowerTasks, setEisenpowerTasks] = useState<{
     urgentImportant: EisenpowerTask[];
     urgentNotImportant: EisenpowerTask[];
     notUrgentImportant: EisenpowerTask[];
     notUrgentNotImportant: EisenpowerTask[];
   }>({...});
   ```

3. Add energy input field to each task card in the matrix

4. Connect to Supabase:
   - Load tasks on component mount
   - Save/update/delete tasks via Supabase API
   - Implement `loadEisenpowerTasks()`, `saveEisenpowerTask()`, `updateEisenpowerTask()`, `deleteEisenpowerTask()`

5. Allow typing directly into empty boxes (add "click to add task" placeholder)

**Files Affected:** `src/components/CojiUniverse.tsx` (~lines 158-169, 2140-2445)

### 5. Library Universe Navigation
**Current State:** Static cards with no click handlers

**Required Changes:**
1. Add `onClick` to each library card (lines ~3638-3756)
2. Create planet view state: `const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);` (already exists!)
3. Load planet data from `neuro_library.json` when planet is selected
4. Create planet view UI with:
   - Spinning planet animation (CSS `@keyframes spin`)
   - Orbital display of symptoms/tools
   - Back button to return to library grid
   - Load tips from respective JSON files

**Files Affected:** `src/components/CojiUniverse.tsx` (~lines 1070-1099, 3628-3759)

### 6. Health Data Migration from localStorage to Supabase
**Current State:** Uses localStorage with Supabase fallback for some data

**Required Changes:**
1. Remove all localStorage reads for:
   - Menstrual cycles (line ~198-202)
   - Appointments (line ~203-207)
   - Medications (line ~208-212)
   - Prescription reminders (line ~213-217)
   - Screening reminders (line ~218-222)
   - Pregnancy tracking (line ~223-227)
   - Eat reminders (line ~237-242)
   - Activity tracking (calories/steps)
   - Health card preferences (line ~244-269)

2. Implement Supabase CRUD functions for each health data type
3. Load all data from Supabase on mount
4. Remove all `localStorage.setItem` calls
5. Replace with Supabase insert/update/delete operations

**Files Affected:** `src/components/CojiUniverse.tsx` (multiple sections throughout)

### 7. Calendar Integration Fixes
**Current State:** `addTaskToCalendar` function exists but may have issues

**Investigation Required:**
1. Test Google Calendar OAuth flow
2. Verify token persistence across sessions
3. Add better error handling and user feedback
4. Test task creation in Google Calendar

**Files Affected:** `src/components/CojiUniverse.tsx` (~lines 601-650)

### 8. Outlook Calendar Integration
**Required Changes:**
1. Add Microsoft OAuth provider configuration
2. Create `signInWithMicrosoft()` function similar to Google
3. Add Outlook calendar fetch function
4. Add Outlook integration UI similar to Google Calendar section
5. Handle Microsoft Graph API for calendar operations

**Files Affected:**
- `src/components/CojiUniverse.tsx`
- Supabase Auth configuration (dashboard)

### 9. Analysis Data Logging
**Required Changes:**
1. Verify all `tracking_data` inserts include proper timestamps
2. Ensure battery, feeling, sleep, and pain data saves consistently
3. Add error handling for failed saves

**Files Affected:** `src/components/CojiUniverse.tsx` (~lines 700-730, tracking functions)

## 📋 TESTING CHECKLIST

Before deployment:
- [ ] Run SQL schema in Supabase dashboard
- [ ] Test user authentication (sign up, sign in, sign out)
- [ ] Test Privacy Policy and Terms pages load correctly
- [ ] Test footer links work
- [ ] Test Eisenpower Matrix inline editing
- [ ] Verify British English throughout UI
- [ ] Test mobile responsiveness
- [ ] Test Google Calendar integration (if implemented)
- [ ] Test health data CRUD operations (if migrated to Supabase)
- [ ] Verify library navigation (if implemented)

## 🚀 DEPLOYMENT STEPS

1. **Supabase Setup:**
   ```bash
   # In Supabase Dashboard SQL Editor:
   # Paste and run contents of supabase-setup.sql
   ```

2. **Environment Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Build and Deploy:**
   ```bash
   npm run build
   npm start
   ```

## 📝 NOTES

- The current implementation is functional but not fully connected to Supabase for all features
- Major refactoring needed for health data migration (large time investment)
- Eisenpower Matrix needs interface changes and Supabase integration
- Library navigation requires significant new UI code
- All SQL schemas are ready - just need to run in Supabase dashboard
- Legal pages are complete and ready to use
