-- Coji Universe Database Setup
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/vjfkxeoefilcqbuihcef/editor

-- Create tracking_data table for battery levels and check-ins
CREATE TABLE IF NOT EXISTS tracking_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  battery INT,
  feeling TEXT,
  sleep DECIMAL,
  pain INT,
  pain_note TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create tasks table for daily tasks
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  energy_required INT NOT NULL,
  date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  eisenpowered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS tracking_data_user_date_idx ON tracking_data(user_id, date);
CREATE INDEX IF NOT EXISTS tasks_user_date_idx ON tasks(user_id, date);
CREATE INDEX IF NOT EXISTS tasks_completed_idx ON tasks(completed);

-- Enable Row Level Security (RLS)
ALTER TABLE tracking_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policies to restrict data access to authenticated users
-- Users can only see and modify their own data
CREATE POLICY "Users can view their own tracking_data" ON tracking_data
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tracking_data" ON tracking_data
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tracking_data" ON tracking_data
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tracking_data" ON tracking_data
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own tasks" ON tasks
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks" ON tasks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" ON tasks
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks" ON tasks
  FOR DELETE
  USING (auth.uid() = user_id);

-- Insert a test battery level to verify it works
INSERT INTO tracking_data (user_id, date, battery, feeling, sleep, pain, timestamp)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  CURRENT_DATE,
  8,
  'good',
  7.5,
  2,
  NOW()
);

-- Success message
SELECT 'Database tables created successfully! 🎉' as message;
