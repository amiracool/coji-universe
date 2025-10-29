-- Coji Universe Database Setup
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/vjfkxeoefilcqbuihcef/editor

-- Create tracking_data table for battery levels and check-ins
CREATE TABLE IF NOT EXISTS tracking_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  battery INT,
  battery_level INT, -- Alias for clarity
  feeling TEXT,
  sleep DECIMAL,
  pain INT,
  pain_note TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
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

-- Create user_profiles table for user information
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_name TEXT NOT NULL,
  age INT,
  country TEXT,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create beta_signups table for early access signups
CREATE TABLE IF NOT EXISTS beta_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'web',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Enable Row Level Security for beta_signups
ALTER TABLE beta_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert signups (public access)
CREATE POLICY "Anyone can sign up for beta" ON beta_signups
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can view signups (admin access)
CREATE POLICY "Authenticated users can view beta signups" ON beta_signups
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create eisenpower_tasks table for Eisenhower Matrix tasks
CREATE TABLE IF NOT EXISTS eisenpower_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  task_text TEXT NOT NULL,
  energy_required INT NOT NULL DEFAULT 3,
  quadrant TEXT NOT NULL CHECK (quadrant IN ('urgentImportant', 'urgentNotImportant', 'notUrgentImportant', 'notUrgentNotImportant')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create health data tables
CREATE TABLE IF NOT EXISTS menstrual_cycles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS medications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  time TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prescription_reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  medication TEXT NOT NULL,
  days_remaining TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS screening_reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  screening_type TEXT NOT NULL,
  screening_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pregnancy_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  is_pregnant BOOLEAN DEFAULT FALSE,
  due_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS eat_reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  reminder_time TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  calories INT DEFAULT 0,
  steps INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS health_card_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  menstrual BOOLEAN DEFAULT TRUE,
  appointments BOOLEAN DEFAULT TRUE,
  prescriptions BOOLEAN DEFAULT TRUE,
  pregnancy BOOLEAN DEFAULT TRUE,
  activity BOOLEAN DEFAULT TRUE,
  water BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for health tables
CREATE INDEX IF NOT EXISTS eisenpower_tasks_user_idx ON eisenpower_tasks(user_id);
CREATE INDEX IF NOT EXISTS menstrual_cycles_user_idx ON menstrual_cycles(user_id);
CREATE INDEX IF NOT EXISTS appointments_user_idx ON appointments(user_id);
CREATE INDEX IF NOT EXISTS medications_user_idx ON medications(user_id);
CREATE INDEX IF NOT EXISTS prescription_reminders_user_idx ON prescription_reminders(user_id);
CREATE INDEX IF NOT EXISTS screening_reminders_user_idx ON screening_reminders(user_id);
CREATE INDEX IF NOT EXISTS eat_reminders_user_idx ON eat_reminders(user_id);
CREATE INDEX IF NOT EXISTS activity_tracking_user_date_idx ON activity_tracking(user_id, date);

-- Enable Row Level Security for all new tables
ALTER TABLE eisenpower_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE menstrual_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescription_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE screening_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE pregnancy_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE eat_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_card_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for eisenpower_tasks
CREATE POLICY "Users can view their own eisenpower tasks" ON eisenpower_tasks
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own eisenpower tasks" ON eisenpower_tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own eisenpower tasks" ON eisenpower_tasks
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own eisenpower tasks" ON eisenpower_tasks
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for menstrual_cycles
CREATE POLICY "Users can view their own cycles" ON menstrual_cycles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own cycles" ON menstrual_cycles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own cycles" ON menstrual_cycles
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own cycles" ON menstrual_cycles
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for appointments
CREATE POLICY "Users can view their own appointments" ON appointments
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own appointments" ON appointments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own appointments" ON appointments
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own appointments" ON appointments
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for medications
CREATE POLICY "Users can view their own medications" ON medications
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own medications" ON medications
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own medications" ON medications
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own medications" ON medications
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for prescription_reminders
CREATE POLICY "Users can view their own prescription reminders" ON prescription_reminders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own prescription reminders" ON prescription_reminders
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own prescription reminders" ON prescription_reminders
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own prescription reminders" ON prescription_reminders
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for screening_reminders
CREATE POLICY "Users can view their own screening reminders" ON screening_reminders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own screening reminders" ON screening_reminders
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own screening reminders" ON screening_reminders
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own screening reminders" ON screening_reminders
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for pregnancy_tracking
CREATE POLICY "Users can view their own pregnancy tracking" ON pregnancy_tracking
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own pregnancy tracking" ON pregnancy_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own pregnancy tracking" ON pregnancy_tracking
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own pregnancy tracking" ON pregnancy_tracking
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for eat_reminders
CREATE POLICY "Users can view their own eat reminders" ON eat_reminders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own eat reminders" ON eat_reminders
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own eat reminders" ON eat_reminders
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own eat reminders" ON eat_reminders
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for activity_tracking
CREATE POLICY "Users can view their own activity tracking" ON activity_tracking
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own activity tracking" ON activity_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own activity tracking" ON activity_tracking
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own activity tracking" ON activity_tracking
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for health_card_preferences
CREATE POLICY "Users can view their own preferences" ON health_card_preferences
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own preferences" ON health_card_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own preferences" ON health_card_preferences
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Success message
SELECT 'Database tables created successfully! 🎉' as message;
