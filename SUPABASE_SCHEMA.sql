-- Coji Universe - Supabase Schema for Ideas & Questions
-- Date: 2025-10-30
-- Purpose: Store user-submitted ideas and questions for Coji

-- ============================================================
-- EXISTING TABLES (for reference)
-- ============================================================
-- The following tables are already in use:
-- - tracking_data (mood/energy/sleep tracking)
-- - chat_history (Coji buddy conversations)
-- - superpowers (user strengths)
-- - support_needs (user needs)
-- - tasks (todo/task management)
-- - user_profiles (user settings and profile data)
-- - journal_entries (journal/reflection entries)
-- - financial_notes (sticky notes for wants/needs)
-- - finance_profile (monthly income data)
-- - therapist_bookings (appointment bookings)

-- ============================================================
-- NEW TABLE: ideas_and_questions
-- ============================================================

CREATE TABLE IF NOT EXISTS ideas_and_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  idea_text TEXT NOT NULL,
  category TEXT CHECK (category IN ('feature_request', 'question', 'feedback', 'bug_report', 'other')) DEFAULT 'other',
  status TEXT CHECK (status IN ('new', 'reviewed', 'in_progress', 'implemented', 'declined', 'duplicate')) DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster queries by user_id
CREATE INDEX IF NOT EXISTS idx_ideas_user_id ON ideas_and_questions(user_id);

-- Add index for status filtering (admin view)
CREATE INDEX IF NOT EXISTS idx_ideas_status ON ideas_and_questions(status);

-- Add index for created_at sorting
CREATE INDEX IF NOT EXISTS idx_ideas_created_at ON ideas_and_questions(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS
ALTER TABLE ideas_and_questions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own ideas
DROP POLICY IF EXISTS "Users can insert their own ideas" ON ideas_and_questions;
CREATE POLICY "Users can insert their own ideas"
ON ideas_and_questions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can view their own ideas
DROP POLICY IF EXISTS "Users can view their own ideas" ON ideas_and_questions;
CREATE POLICY "Users can view their own ideas"
ON ideas_and_questions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Users can update their own ideas (only if status is 'new')
DROP POLICY IF EXISTS "Users can update their own new ideas" ON ideas_and_questions;
CREATE POLICY "Users can update their own new ideas"
ON ideas_and_questions
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND status = 'new')
WITH CHECK (auth.uid() = user_id AND status = 'new');

-- Policy: Users can delete their own ideas (only if status is 'new')
DROP POLICY IF EXISTS "Users can delete their own new ideas" ON ideas_and_questions;
CREATE POLICY "Users can delete their own new ideas"
ON ideas_and_questions
FOR DELETE
TO authenticated
USING (auth.uid() = user_id AND status = 'new');

-- ============================================================
-- ADMIN POLICIES (Optional - set up admin role)
-- ============================================================
-- If you have an admin role in your auth system, add:
--
-- CREATE POLICY "Admins can view all ideas"
-- ON ideas_and_questions
-- FOR SELECT
-- TO authenticated
-- USING (is_admin(auth.uid()));
--
-- CREATE POLICY "Admins can update all ideas"
-- ON ideas_and_questions
-- FOR UPDATE
-- TO authenticated
-- USING (is_admin(auth.uid()));
--
-- Where is_admin() is a function that checks if user has admin role

-- ============================================================
-- AUTOMATIC TIMESTAMP UPDATE TRIGGER
-- ============================================================

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for ideas_and_questions table
DROP TRIGGER IF EXISTS update_ideas_updated_at ON ideas_and_questions;
CREATE TRIGGER update_ideas_updated_at
BEFORE UPDATE ON ideas_and_questions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- USAGE NOTES
-- ============================================================
--
-- To insert a new idea:
-- INSERT INTO ideas_and_questions (user_id, email, idea_text, category)
-- VALUES (auth.uid(), user_email, 'My idea text', 'feature_request');
--
-- To query user's own ideas:
-- SELECT * FROM ideas_and_questions WHERE user_id = auth.uid() ORDER BY created_at DESC;
--
-- To query by status (admin view):
-- SELECT * FROM ideas_and_questions WHERE status = 'new' ORDER BY created_at DESC;

-- ============================================================
-- NEW TABLE: eisenhower_matrix_tasks
-- ============================================================
-- Purpose: Store Eisenhower Matrix tasks with energy values for analysis

CREATE TABLE IF NOT EXISTS eisenhower_matrix_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_text TEXT NOT NULL,
  quadrant TEXT NOT NULL CHECK (quadrant IN ('urgent_important', 'not_urgent_important', 'urgent_not_important', 'not_urgent_not_important')),
  energy_value INTEGER NOT NULL CHECK (energy_value >= 1 AND energy_value <= 12),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_eisenhower_user_id ON eisenhower_matrix_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_eisenhower_quadrant ON eisenhower_matrix_tasks(quadrant);
CREATE INDEX IF NOT EXISTS idx_eisenhower_completed ON eisenhower_matrix_tasks(completed);
CREATE INDEX IF NOT EXISTS idx_eisenhower_created_at ON eisenhower_matrix_tasks(created_at DESC);

-- Enable RLS
ALTER TABLE eisenhower_matrix_tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for eisenhower_matrix_tasks
DROP POLICY IF EXISTS "Users can insert their own tasks" ON eisenhower_matrix_tasks;
CREATE POLICY "Users can insert their own tasks"
ON eisenhower_matrix_tasks
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own tasks" ON eisenhower_matrix_tasks;
CREATE POLICY "Users can view their own tasks"
ON eisenhower_matrix_tasks
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own tasks" ON eisenhower_matrix_tasks;
CREATE POLICY "Users can update their own tasks"
ON eisenhower_matrix_tasks
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own tasks" ON eisenhower_matrix_tasks;
CREATE POLICY "Users can delete their own tasks"
ON eisenhower_matrix_tasks
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Add trigger for automatic updated_at timestamp
DROP TRIGGER IF EXISTS update_eisenhower_updated_at ON eisenhower_matrix_tasks;
CREATE TRIGGER update_eisenhower_updated_at
BEFORE UPDATE ON eisenhower_matrix_tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- VIEWS FOR ANALYSIS TAB
-- ============================================================

-- View: Energy expenditure summary by quadrant
CREATE OR REPLACE VIEW user_energy_by_quadrant AS
SELECT
  user_id,
  quadrant,
  COUNT(*) as task_count,
  SUM(energy_value) as total_energy,
  AVG(energy_value) as avg_energy,
  COUNT(CASE WHEN completed THEN 1 END) as completed_count,
  SUM(CASE WHEN completed THEN energy_value ELSE 0 END) as completed_energy
FROM eisenhower_matrix_tasks
GROUP BY user_id, quadrant;

-- View: Daily energy expenditure
CREATE OR REPLACE VIEW user_daily_energy AS
SELECT
  user_id,
  DATE(created_at) as date,
  COUNT(*) as tasks_created,
  SUM(energy_value) as total_energy_planned,
  COUNT(CASE WHEN completed THEN 1 END) as tasks_completed,
  SUM(CASE WHEN completed THEN energy_value ELSE 0 END) as total_energy_spent
FROM eisenhower_matrix_tasks
GROUP BY user_id, DATE(created_at);

-- View: Energy insights (identifies energy drains)
CREATE OR REPLACE VIEW user_energy_insights AS
SELECT
  user_id,
  quadrant,
  task_text,
  energy_value,
  completed,
  created_at,
  CASE
    WHEN quadrant = 'not_urgent_not_important' AND energy_value > 6 THEN 'High energy on low priority - consider delegating or eliminating'
    WHEN quadrant = 'urgent_not_important' AND energy_value > 8 THEN 'High energy on urgent but not important - consider delegation'
    WHEN quadrant = 'urgent_important' AND NOT completed AND created_at < NOW() - INTERVAL '3 days' THEN 'Important task overdue - may need support'
    ELSE NULL
  END as insight
FROM eisenhower_matrix_tasks
WHERE completed = FALSE;

-- ============================================================
-- USAGE NOTES FOR EISENHOWER MATRIX
-- ============================================================
--
-- To insert a new task:
-- INSERT INTO eisenhower_matrix_tasks (user_id, task_text, quadrant, energy_value)
-- VALUES (auth.uid(), 'Complete project report', 'urgent_important', 10);
--
-- To update task energy value:
-- UPDATE eisenhower_matrix_tasks
-- SET energy_value = 8
-- WHERE id = 'task_id' AND user_id = auth.uid();
--
-- To mark task as completed:
-- UPDATE eisenhower_matrix_tasks
-- SET completed = TRUE, completed_at = NOW()
-- WHERE id = 'task_id' AND user_id = auth.uid();
--
-- To get user's energy summary:
-- SELECT * FROM user_energy_by_quadrant WHERE user_id = auth.uid();
--
-- To get energy insights:
-- SELECT * FROM user_energy_insights
-- WHERE user_id = auth.uid() AND insight IS NOT NULL
-- ORDER BY created_at DESC;
