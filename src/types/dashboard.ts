// Shared types for dashboard pages

export interface TrackingData {
  id?: string;
  date: string;
  battery: number;
  feeling: string;
  sleep: number;
  pain?: number;
  pain_note?: string;
  timestamp?: string;
}

export interface Task {
  id: string;
  title: string;
  energy_required: number;
  date: string;
  completed: boolean;
  eisenpowered: boolean;
  created_at?: string;
}

export interface UserProfile {
  id?: string;
  user_id: string;
  preferred_name: string;
  age?: number;
  country?: string;
  city?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MoodOption {
  emoji: string;
  label: string;
  value: string;
  color: string;
}

export const MOOD_OPTIONS: MoodOption[] = [
  { emoji: "😊", label: "Great", value: "great", color: "#10b981" },
  { emoji: "🙂", label: "Good", value: "good", color: "#14b8a6" },
  { emoji: "😐", label: "Okay", value: "okay", color: "#f59e0b" },
  { emoji: "😔", label: "Low", value: "low", color: "#f97316" },
  { emoji: "😰", label: "Struggling", value: "struggling", color: "#ef4444" },
];
