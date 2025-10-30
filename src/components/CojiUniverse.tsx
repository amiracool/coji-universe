"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Sparkles,
  Brain,
  Heart,
  Users,
  Clipboard,
  Calendar,
  TrendingUp,
  Plus,
  Trash2,
  Star,
  Shield,
  MessageCircle,
  CheckCircle,
  Zap,
  Battery,
  BatteryMedium,
  BatteryLow,
  BarChart,
  Maximize,
  Minimize,
  BookOpen,
  Activity,
  DollarSign,
  Menu,
  X,
  LogOut,
  LayoutGrid,
  ArrowLeft,
  Search,
  Copy,
  Bookmark,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import FeatureIcon from "@/components/FeatureIcon";
import PlanetOrb from "@/components/PlanetOrb";
import PlanetPage from "@/components/PlanetPage";
import { getPlanetTheme } from "@/lib/planetThemes";
import { AutismPage } from "@/components/library/AutismPage";
import { AdhdPage } from "@/components/library/AdhdPage";
import { AnxietyPage } from "@/components/library/AnxietyPage";
import { DepressionPage } from "@/components/library/DepressionPage";
import { ParentingPage } from "@/components/library/ParentingPage";
import { DyscalculiaPage } from "@/components/library/DyscalculiaPage";
import { DyslexiaDyscalculiaPage } from "@/components/library/DyslexiaDyscalculiaPage";
import { DyspraxiaPage } from "@/components/library/DyspraxiaPage";
import { ChronicIllnessPage } from "@/components/library/ChronicIllnessPage";
import { CojiLoader } from "@/components/CojiLoader";

interface TrackingData {
  id?: string;
  date: string;
  battery: number;
  feeling: string;
  sleep: number;
  pain?: number;
  pain_note?: string;
  timestamp?: string;
}

interface Task {
  id: string;
  title: string;
  energy_required: number;
  date: string;
  completed: boolean;
  eisenpowered: boolean;
  created_at?: string;
}

interface ChatMessage {
  id?: string;
  role: string;
  message: string;
  timestamp?: string;
}

interface Superpower {
  id: string;
  text: string;
}

interface SupportNeed {
  id: string;
  text: string;
}

interface JournalEntry {
  id?: string;
  date: string;
  questionIndex: number;
  question: string;
  answer: string;
  timestamp?: string;
}

interface TherapistBooking {
  id?: string;
  user_name: string;
  date: string;
  time: string;
  reason: string;
  timestamp?: string;
}

interface StickyNote {
  id?: string;
  text: string;
  type: "want" | "need";
  plannedDate?: string | null; // for wants
  created_at?: string;
}

interface UserProfile {
  id?: string;
  user_id: string;
  preferred_name: string;
  age?: number;
  country?: string;
  city?: string;
  created_at?: string;
  updated_at?: string;
}

const CojiUniverse = () => {
  // Hydration control - prevent flash on initial load
  const [isHydrated, setIsHydrated] = useState(false);

  const [activeTab, setActiveTab] = useState("landing");
  const [batteryLevel, setBatteryLevel] = useState(10);
  const [todayFeeling, setTodayFeeling] = useState("");
  const [sleepHours, setSleepHours] = useState(7);
  const [painScore, setPainScore] = useState(0);
  const [painNote, setPainNote] = useState("");
  const [lastCheckin, setLastCheckin] = useState<TrackingData | null>(null);
  const [trackingData, setTrackingData] = useState<TrackingData[]>([]);
  const [hasTrackedToday, setHasTrackedToday] = useState(false);
  const [cojiMessage, setCojiMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [superpowers, setSuperpowers] = useState<Superpower[]>([]);
  const [newSuperpower, setNewSuperpower] = useState("");
  const [supportNeeds, setSupportNeeds] = useState<SupportNeed[]>([]);
  const [newSupportNeed, setNewSupportNeed] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [journalAnswer, setJournalAnswer] = useState("");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [bookingName, setBookingName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingReason, setBookingReason] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedTherapy, setSelectedTherapy] = useState<string | null>(null);
  // Finances state
  const [monthlyIncome, setMonthlyIncome] = useState<number | string>("");
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteType, setNewNoteType] = useState<"want" | "need">("want");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskEnergy, setNewTaskEnergy] = useState(3);
  const [newTaskDate, setNewTaskDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [showEisenpowerPrompt, setShowEisenpowerPrompt] = useState(false);
  const [pendingTask, setPendingTask] = useState<{title: string; energy: number; date: string} | null>(null);
  const [showEisenpowerMatrix, setShowEisenpowerMatrix] = useState(false);
  const [eisenhowerTasks, setEisenpowerTasks] = useState<{
    urgentImportant: string[];
    urgentNotImportant: string[];
    notUrgentImportant: string[];
    notUrgentNotImportant: string[];
  }>({
    urgentImportant: [],
    urgentNotImportant: [],
    notUrgentImportant: [],
    notUrgentNotImportant: []
  });
  const [newEisenpowerTask, setNewEisenpowerTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // User profile state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileAge, setProfileAge] = useState('');
  const [profileCountry, setProfileCountry] = useState('');
  const [profileCity, setProfileCity] = useState('');

  // Library state
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [libraryData, setLibraryData] = useState<any>(null);
  const [libraryTips, setLibraryTips] = useState<any[]>([]);
  const [librarySearch, setLibrarySearch] = useState('');
  const [selectedTip, setSelectedTip] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Health state
  const [menstrualCycles, setMenstrualCycles] = useState<{ id: string; start: string; end?: string }[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('cycles');
    return stored ? JSON.parse(stored) : [];
  });
  const [appointments, setAppointments] = useState<{ id: string; title: string; date: string }[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('appts');
    return stored ? JSON.parse(stored) : [];
  });
  const [medications, setMedications] = useState<{ id: string; name: string; time?: string }[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('meds');
    return stored ? JSON.parse(stored) : [];
  });
  const [prescriptionReminders, setPrescriptionReminders] = useState<{ id: string; med: string; days: string }[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('presc');
    return stored ? JSON.parse(stored) : [];
  });
  const [screeningReminders, setScreeningReminders] = useState<{ id: string; type: string; date: string }[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('screens');
    return stored ? JSON.parse(stored) : [];
  });
  const [pregnancy, setPregnancy] = useState<{ preg: boolean; due?: string }>(() => {
    if (typeof window === 'undefined') return { preg: false };
    const stored = localStorage.getItem('pregnancy');
    return stored ? JSON.parse(stored) : { preg: false };
  });
  const [caloriesToday, setCaloriesToday] = useState<number>(0);
  const [stepsToday, setStepsToday] = useState<number>(0);

  // Google Calendar state
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);

  // Analysis state
  const [analysisPeriod, setAnalysisPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [eatReminders, setEatReminders] = useState<{ id: string; time: string }[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('eats');
    return stored ? JSON.parse(stored) : [];
  });

  // Health card visibility toggles
  const [healthCardVisibility, setHealthCardVisibility] = useState<{
    menstrual: boolean;
    appointments: boolean;
    prescriptions: boolean;
    pregnancy: boolean;
    activity: boolean;
    water: boolean;
  }>(() => {
    if (typeof window === 'undefined') return {
      menstrual: true,
      appointments: true,
      prescriptions: true,
      pregnancy: true,
      activity: true,
      water: true,
    };
    const stored = localStorage.getItem('healthCardVisibility');
    return stored ? JSON.parse(stored) : {
      menstrual: true,
      appointments: true,
      prescriptions: true,
      pregnancy: true,
      activity: true,
      water: true,
    };
  });

  const toggleHealthCard = (cardName: keyof typeof healthCardVisibility) => {
    const newVisibility = { ...healthCardVisibility, [cardName]: !healthCardVisibility[cardName] };
    setHealthCardVisibility(newVisibility);
    localStorage.setItem('healthCardVisibility', JSON.stringify(newVisibility));
  };

  const feelings = [
    { emoji: "\u{1F60A}", label: "Great", value: "great" },
    { emoji: "\u{1F642}", label: "Good", value: "good" },
    { emoji: "\u{1F610}", label: "Okay", value: "okay" },
    { emoji: "\u{1F614}", label: "Low", value: "low" },
    { emoji: "\u{1F62B}", label: "Hard", value: "hard" },
    { emoji: "\u{1F912}", label: "Sick", value: "sick" },
    { emoji: "\u{1F621}", label: "Angry", value: "angry" },
    { emoji: "\u{1F628}", label: "Anxious", value: "anxious" },
    { emoji: "\u{1F4A4}", label: "Tired", value: "tired" },
    { emoji: "\u{1F622}", label: "Sad", value: "sad" },
    { emoji: "\u{1F635}", label: "Overwhelmed", value: "overwhelmed" },
    { emoji: "\u{1F973}", label: "Excited", value: "excited" },
    { emoji: "\u{1F60C}", label: "Calm", value: "calm" },
    { emoji: "\u{1F62C}", label: "Stressed", value: "stressed" },
    { emoji: "\u{1F62D}", label: "Distraught", value: "distraught" },
    { emoji: "\u{1F9D0}", label: "Curious", value: "curious" },
    { emoji: "\u{1F970}", label: "Loved", value: "loved" },
    { emoji: "\u{1F634}", label: "Sleepy", value: "sleepy" },
    { emoji: "\u{1F644}", label: "Frustrated", value: "frustrated" },
    { emoji: "\u{1F929}", label: "Proud", value: "proud" },
    { emoji: "\u{1F60D}", label: "Happy", value: "happy" },
    { emoji: "\u{1F92F}", label: "Mindblown", value: "mindblown" },
    { emoji: "\u{1F614}", label: "Pensive", value: "pensive" },
    { emoji: "\u{1F917}", label: "Hopeful", value: "hopeful" },
  ];

  const getBatteryIcon = (level: number) => {
    if (level >= 8) return <Battery className="text-teal-400" size={24} />;
    if (level >= 4)
      return <BatteryMedium className="text-amber-400" size={24} />;
    return <BatteryLow className="text-red-400" size={24} />;
  };

  // Mark body as hydrated after client-side render to enable transitions
  useEffect(() => {
    document.body.classList.add('hydrated');
    setIsHydrated(true);
  }, []);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsAuthLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Redirect logged-in users from landing/login to dashboard
  useEffect(() => {
    if (user && (activeTab === "login" || activeTab === "landing")) {
      setActiveTab("dashboard");
    }
  }, [user]);

  // Load user data when user is available
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  // Handle loading state when changing planets
  useEffect(() => {
    if (selectedPlanet) {
      setIsLoading(true);
      // Show loading for minimum 800ms for smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [selectedPlanet]);

  const loadData = async () => {
    try {
      const { data: trackData } = await supabase
        .from("tracking_data")
        .select("*")
        .eq("user_id", user?.id)
        .order("date", { ascending: true });
      if (trackData) setTrackingData(trackData);

      const { data: chatData } = await supabase
        .from("chat_history")
        .select("*")
        .eq("user_id", user?.id)
        .order("timestamp", { ascending: true });
      if (chatData) setChatHistory(chatData);

      const { data: powerData } = await supabase
        .from("superpowers")
        .select("*")
        .eq("user_id", user?.id);
      if (powerData) setSuperpowers(powerData);

      const { data: supportData } = await supabase
        .from("support_needs")
        .select("*")
        .eq("user_id", user?.id);
      if (supportData) setSupportNeeds(supportData);

      const { data: tasksData } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user?.id)
        .order("date", { ascending: true });
      if (tasksData) setTasks(tasksData);

      // load the most recent check-in (allow multiple check-ins per day)
      const { data: lastTracking } = await supabase
        .from("tracking_data")
        .select("*")
        .eq("user_id", user?.id)
        .order("timestamp", { ascending: false })
        .limit(1);

      if (lastTracking && Array.isArray(lastTracking) && lastTracking.length > 0) {
        const recent = lastTracking[0] as any;
        setLastCheckin(recent as TrackingData);
        setBatteryLevel(recent.battery);
        setTodayFeeling(recent.feeling || "");
        setSleepHours(typeof recent.sleep === "number" ? recent.sleep : parseFloat(recent.sleep || "0"));
        setPainScore(typeof recent.pain === "number" ? recent.pain : parseFloat(recent.pain || "0"));
        setPainNote(recent.pain_note || "");
        setHasTrackedToday(true);
      }
  // load journal entries (supabase or local)
  await loadJournalEntries();

  // load finances notes and income
  await loadFinancialData();

  // load user profile
  await loadUserProfile();

      // try loading any local therapist bookings (fallback)
      try {
        const rawBk = localStorage.getItem("coji_therapist_bookings");
        if (rawBk) {
          const parsed = JSON.parse(rawBk);
          if (parsed && parsed.length > 0) {
            // prefill last booking name as convenience
            setBookingName(parsed[0].user_name || "");
          }
        }
      } catch (e) {
        // ignore
      }
    } catch (error) {
      console.log("Loading data:", error);
    }
  };

  // Load user profile from database
  const loadUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 means no rows returned, which is expected for new users
        console.error('Error loading user profile:', error);
        return;
      }

      if (data) {
        setUserProfile(data);
      } else {
        // No profile found, show profile setup modal for new users
        setShowProfileSetup(true);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  // Save user profile to database
  const saveUserProfile = async () => {
    if (!user || !profileName.trim()) {
      alert('Please enter your name');
      return;
    }

    try {
      const profileData: UserProfile = {
        user_id: user.id,
        preferred_name: profileName.trim(),
        age: profileAge ? parseInt(profileAge) : undefined,
        country: profileCountry.trim() || undefined,
        city: profileCity.trim() || undefined,
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .upsert(profileData, { onConflict: 'user_id' })
        .select()
        .single();

      if (error) {
        console.error('Error saving user profile:', error);
        alert('Failed to save profile. Please try again.');
        return;
      }

      if (data) {
        setUserProfile(data);
        setShowProfileSetup(false);
        alert('Profile saved successfully!');
      }
    } catch (error) {
      console.error('Error saving user profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`,
        scopes: 'email profile https://www.googleapis.com/auth/calendar'
      }
    });
    if (error) {
      console.error('Error logging in:', error.message);
      alert('Failed to sign in with Google. Please try again.');
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      setUser(null);
      setActiveTab('landing');
    }
  };

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!email || !password) {
      setAuthError('Please enter both email and password');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
    }
  };

  const signUpWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!email || !password) {
      setAuthError('Please enter both email and password');
      return;
    }

    if (password.length < 6) {
      setAuthError('Password must be at least 6 characters');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}`
      }
    });

    if (error) {
      setAuthError(error.message);
    } else {
      setAuthError('');
      alert('Check your email to confirm your account! 📧');
    }
  };

  // Google Calendar Functions
  const fetchCalendarEvents = async () => {
    if (!user) return;

    setIsLoadingCalendar(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.provider_token) {
        console.log('No provider token available for Calendar API');
        setIsLoadingCalendar(false);
        return;
      }

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${new Date().toISOString()}&maxResults=20&singleEvents=true&orderBy=startTime`,
        {
          headers: {
            Authorization: `Bearer ${session.provider_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCalendarEvents(data.items || []);
      } else {
        console.error('Failed to fetch calendar events:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    } finally {
      setIsLoadingCalendar(false);
    }
  };

  const addTaskToCalendar = async (task: Task) => {
    if (!user) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.provider_token) {
        alert('Please sign in with Google to use Calendar features');
        return;
      }

      // Create event for the task date
      const startDate = new Date(task.date);
      startDate.setHours(9, 0, 0); // Default to 9 AM
      const endDate = new Date(startDate);
      endDate.setHours(10, 0, 0); // 1 hour duration

      const event = {
        summary: task.title,
        description: `Energy required: ${task.energy_required}/12\nCreated from Coji Universe`,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      };

      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.provider_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        }
      );

      if (response.ok) {
        alert('Task added to Google Calendar! 🎉');
        fetchCalendarEvents(); // Refresh calendar events
      } else {
        const error = await response.text();
        console.error('Failed to add event to calendar:', error);
        alert('Failed to add task to calendar. Please try again.');
      }
    } catch (error) {
      console.error('Error adding task to calendar:', error);
      alert('Failed to add task to calendar. Please try again.');
    }
  };

  const importCalendarEventToTask = async (event: any) => {
    if (!user) return;

    try {
      // Extract event date
      const eventDate = event.start?.dateTime
        ? new Date(event.start.dateTime).toISOString().split('T')[0]
        : event.start?.date
        ? event.start.date
        : new Date().toISOString().split('T')[0];

      // Default energy to 3 (medium)
      const energyRequired = 3;

      await supabase.from("tasks").insert({
        user_id: user?.id,
        title: event.summary || 'Untitled Event',
        energy_required: energyRequired,
        date: eventDate,
        completed: false,
        eisenpowered: false,
      });

      alert('Event imported to Today\'s Tasks! ✅');
      loadData();
    } catch (error) {
      console.error('Error importing event to tasks:', error);
      alert('Failed to import event. Please try again.');
    }
  };

  const saveTracking = async () => {
    const today = new Date().toISOString().split("T")[0];

    // Insert a new check-in row so users can check in multiple times per day
    const { error } = await supabase.from("tracking_data").insert({
      user_id: user?.id,
      date: today,
      battery: batteryLevel,
      feeling: todayFeeling || "neutral",
      sleep: sleepHours,
      pain: painScore,
      pain_note: painNote,
      timestamp: new Date().toISOString(),
    });

    if (!error) {
      setHasTrackedToday(true);
      // set lastCheckin locally to reflect the newly inserted record (optimistic)
      const recent: TrackingData = {
        date: today,
        battery: batteryLevel,
        feeling: todayFeeling || "neutral",
        sleep: sleepHours,
        pain: painScore,
        timestamp: new Date().toISOString(),
      } as any;
      setLastCheckin(recent);
      loadData();
      alert("Saved! \u{1F389}");
    }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;

    const todayBattery = batteryLevel;
    const todaysTasks = tasks.filter(
      (t) => t.date === new Date().toISOString().split("T")[0] && !t.completed,
    );
    const totalEnergyUsed = todaysTasks.reduce(
      (sum, t) => sum + t.energy_required,
      0,
    );
    const remainingBattery = todayBattery - totalEnergyUsed;

    if (newTaskEnergy > remainingBattery) {
      // Store pending task and show warning
      setPendingTask({
        title: newTaskTitle,
        energy: newTaskEnergy,
        date: newTaskDate
      });
      setShowEisenpowerPrompt(true);
      return; // Don't add task yet - wait for user decision
    }

    const { data, error } = await supabase.from("tasks").insert({
      user_id: user?.id,
      title: newTaskTitle,
      energy_required: newTaskEnergy,
      date: newTaskDate,
      completed: false,
      eisenpowered: false,
    }).select();

    // Automatically sync to Google Calendar if connected
    if (!error && data && data.length > 0 && user?.app_metadata?.provider === 'google') {
      await addTaskToCalendar(data[0]);
    }

    setNewTaskTitle("");
    setNewTaskEnergy(3);
    setShowTaskModal(false);
    loadData();
  };

  const eisenpowerTask = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    await supabase
      .from("tasks")
      .update({ eisenpowered: true })
      .eq("id", taskId);

    const subtasks = [
      {
        user_id: user?.id,
        title: `${task.title} - Step 1`,
        energy_required: Math.ceil(task.energy_required / 3),
        date: task.date,
        completed: false,
        eisenpowered: false,
      },
      {
        user_id: user?.id,
        title: `${task.title} - Step 2`,
        energy_required: Math.ceil(task.energy_required / 3),
        date: task.date,
        completed: false,
        eisenpowered: false,
      },
      {
        user_id: user?.id,
        title: `${task.title} - Step 3`,
        energy_required: Math.floor(task.energy_required / 3),
        date: task.date,
        completed: false,
        eisenpowered: false,
      },
    ];

    await supabase.from("tasks").insert(subtasks);

    setShowEisenpowerPrompt(false);
    loadData();
  };

  const toggleTask = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", taskId);

    loadData();
  };

  const deleteTask = async (taskId: string) => {
    await supabase.from("tasks").delete().eq("id", taskId);

    loadData();
  };

  const sendMessage = async () => {
    if (!cojiMessage.trim()) return;

    const userMsg = {
      user_id: user?.id,
      role: "user",
      message: cojiMessage,
    };
    const cojiResponse = {
      user_id: user?.id,
      role: "coji",
      message: getCojiResponse(cojiMessage),
    };

    await supabase.from("chat_history").insert([userMsg, cojiResponse]);

    setCojiMessage("");
    loadData();
  };

  const getCojiResponse = (msg: string) => {
    const text = msg.toLowerCase();

    if (text.includes("superpower") || text.includes("good at")) {
      return "That's amazing! \u{1F31F} Your superpowers make you unique. Have you added them to your Superpowers section? What are you really good at? \u{1F49C}";
    }
    if (
      text.includes("support") ||
      text.includes("help") ||
      text.includes("struggle")
    ) {
      return "I'm here for you \u{1F49C} Everyone needs support sometimes. Have you checked the ND Library for strategies? What's feeling hard right now? \u{1F917}";
    }
    if (
      text.includes("energy") ||
      text.includes("tired") ||
      text.includes("battery")
    ) {
      return "I hear you're low on battery \u{1F50B} Have you tracked your energy today? Have you had water, food, and rest? \u{1F499}";
    }
    if (text.includes("task") || text.includes("overwhelm")) {
      return "Tasks feeling too big? \u{1F3AF} Let's make them tiny! What if you just did ONE small thing? Want me to help break it down with Eisenpower? \u{2728}";
    }

    return "I'm here to help! \u{1F308} Tell me more about what's on your mind. We can work through it together \u{1F4AA}";
  };

  const addSuperpower = async () => {
    if (!newSuperpower.trim()) return;

    await supabase
      .from("superpowers")
      .insert({ user_id: user?.id, text: newSuperpower });

    setNewSuperpower("");
    loadData();
  };

  const addSupportNeed = async () => {
    if (!newSupportNeed.trim()) return;

    await supabase
      .from("support_needs")
      .insert({ user_id: user?.id, text: newSupportNeed });

    setNewSupportNeed("");
    loadData();
  };

  const getEnergyReserveData = () => {
    const last7Days = trackingData.slice(-7);
    return last7Days.map((day) => ({
      date: new Date(day.date).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      battery: day.battery,
    }));
  };

  // --- Analysis helpers ---
  const hourFromTimestamp = (ts?: string) => {
    try {
      if (!ts) return null;
      return new Date(ts).getHours();
    } catch (e) {
      return null;
    }
  };

  const averageByHour = (field: "battery" | "pain") => {
    const sums = new Array(24).fill(0);
    const counts = new Array(24).fill(0);
    trackingData.forEach((t) => {
      const h = hourFromTimestamp(t.timestamp) ?? 0;
      const val = field === "battery" ? (t.battery ?? 0) : (t.pain ?? 0);
      sums[h] += val || 0;
      counts[h] += val !== undefined ? 1 : 0;
    });
    return sums.map((s, i) => (counts[i] ? s / counts[i] : 0));
  };

  const happiestByHour = () => {
    const happyValues = new Set(["great", "excited", "good"]);
    const counts = new Array(24).fill(0);
    trackingData.forEach((t) => {
      const h = hourFromTimestamp(t.timestamp) ?? 0;
      if (happyValues.has(t.feeling)) counts[h] += 1;
    });
    return counts;
  };

  const recentSleepSeries = (n = 14) => {
    const sorted = [...trackingData].sort((a, b) => {
      const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return ta - tb;
    });
    const last = sorted.slice(-n);
    return last.map((t) => ({ label: new Date(t.timestamp || t.date).toLocaleDateString(), value: t.sleep || 0 }));
  };

  // --- Small inline chart components (no extra deps) ---
  const EnergyByHourChart = ({ data, colorStart = "#06b6d4", colorEnd = "#d946ef", width = 400, height = 120 }: { data: number[]; colorStart?: string; colorEnd?: string; width?: number; height?: number }) => {
    const max = Math.max(...data, 1);
    const barWidth = Math.floor(width / data.length) - 2;
    return (
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-32">
        {data.map((v, i) => {
          const h = (v / max) * (height - 20);
          const x = i * (barWidth + 2) + 4;
          const y = height - h - 10;
          const gradId = `g-${i}`;
          return (
            <g key={i}>
              <defs>
                <linearGradient id={gradId} x1="0" x2="1">
                  <stop offset="0%" stopColor={colorStart} />
                  <stop offset="100%" stopColor={colorEnd} />
                </linearGradient>
              </defs>
              <rect x={x} y={y} width={barWidth} height={h} fill={`url(#${gradId})`} rx={4} />
            </g>
          );
        })}
      </svg>
    );
  };

  const SleepSparkline = ({ series }: { series: { label: string; value: number }[] }) => {
    const w = Math.max(200, series.length * 20);
    const h = 60;
    const max = Math.max(...series.map((s) => s.value), 1);
    const points = series.map((s, i) => `${(i / (series.length - 1 || 1)) * w},${h - (s.value / max) * (h - 8)}`).join(" ");
    return (
      <div>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-16">
          <polyline fill="none" stroke="#8b5cf6" strokeWidth={2} points={points} />
        </svg>
        <div className="text-xs text-slate-400 mt-2">Showing last {series.length} check-ins</div>
      </div>
    );
  };

  const BarChartCounts = ({ counts }: { counts: number[] }) => {
    const w = 400;
    const h = 120;
    const max = Math.max(...counts, 1);
    const barWidth = Math.floor(w / counts.length) - 2;
    return (
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-32">
        {counts.map((c, i) => {
          const H = (c / max) * (h - 20);
          const x = i * (barWidth + 2) + 4;
          const y = h - H - 10;
          return <rect key={i} x={x} y={y} width={barWidth} height={H} fill="#06b6d4" rx={3} />;
        })}
      </svg>
    );
  };

  const todaysTasks = tasks.filter(
    (t) => t.date === new Date().toISOString().split("T")[0] && !t.eisenpowered,
  );
  const totalEnergyRequired = todaysTasks.reduce(
    (sum, task) => sum + task.energy_required,
    0,
  );
  const remainingBattery = batteryLevel - totalEnergyRequired;

  // Fullscreen toggle function
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Enter fullscreen
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes (in case user exits with ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto-fetch calendar events when calendar tab is active
  useEffect(() => {
    if (activeTab === 'calendar' && user?.app_metadata?.provider === 'google' && calendarEvents.length === 0) {
      fetchCalendarEvents();
    }
  }, [activeTab, user]);

  // Auto-redirect logged-in users from landing page to Energy Management
  useEffect(() => {
    if (user && activeTab === 'landing') {
      setActiveTab('dashboard');
    }
  }, [user]);

  // Load library data
  useEffect(() => {
    const loadLibrary = async () => {
      try {
        const response = await fetch('/data/neuro_library.json');
        const data = await response.json();
        setLibraryData(data);
      } catch (error) {
        console.error('Error loading library:', error);
      }
    };
    loadLibrary();
  }, []);

  // Load ADHD tips when ADHD planet is selected
  useEffect(() => {
    const loadPlanetTips = async () => {
      if (selectedPlanet === 'adhd-support') {
        try {
          const response = await fetch('/data/library/adhd_tips.json');
          const tips = await response.json();
          setLibraryTips(tips);
        } catch (error) {
          console.error('Error loading tips:', error);
          setLibraryTips([]);
        }
      }
    };
    if (selectedPlanet) {
      loadPlanetTips();
    }
  }, [selectedPlanet]);

  // --- Journal helpers ---
  const journalQuestions = [
    // Sample prompts (expand to 365 as you like). The index is used to allocate a question each day.
    "What made you smile today?",
    "What's one thing you did well this week?",
    "What's a small pleasure you enjoyed recently?",
    "Describe a moment you felt proud.",
    "What would make tomorrow better?",
    "What's something you want to remember from this year?",
    "Who helped you recently and how?",
    "What's a challenge you're working through?",
    "What's a skill you'd like to practice?",
    "What book or show inspired you?",
    "When did you feel calm this week?",
    "What sensory environment do you prefer to work in?",
  ];

  const getDayOfYear = (d = new Date()) => {
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = +d - +start + (start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const currentQuestionIndex = getDayOfYear() % journalQuestions.length;
  const currentQuestion = journalQuestions[currentQuestionIndex];

  const loadJournalEntries = async () => {
    try {
      // Try loading from Supabase if table exists
      const { data } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", user?.id)
        .order("date", { ascending: false });
      if (data) {
        setJournalEntries(data as JournalEntry[]);
        const today = new Date().toISOString().split("T")[0];
        const todayEntry = (data as JournalEntry[]).find((e) => e.date === today);
        if (todayEntry) setJournalAnswer(todayEntry.answer);
      }
    } catch (err) {
      // fallback to localStorage
      try {
        const raw = localStorage.getItem("coji_journal");
        if (raw) {
          const parsed: JournalEntry[] = JSON.parse(raw);
          setJournalEntries(parsed);
          const today = new Date().toISOString().split("T")[0];
          const todayEntry = parsed.find((e) => e.date === today);
          if (todayEntry) setJournalAnswer(todayEntry.answer);
        }
      } catch (e) {
        console.log("loadJournalEntries fallback error", e);
      }
    }
  };

  const saveJournalEntry = async (answer: string) => {
    const date = new Date().toISOString().split("T")[0];
    const entry: JournalEntry = {
      date,
      questionIndex: currentQuestionIndex,
      question: currentQuestion,
      answer,
      timestamp: new Date().toISOString(),
    };

    // update local state + localStorage
    const updated = [entry, ...journalEntries.filter((e) => e.date !== date)];
    setJournalEntries(updated);
    try {
      localStorage.setItem("coji_journal", JSON.stringify(updated));
    } catch (e) {
      console.log("localStorage save failed", e);
    }

    // try saving to Supabase (optional if table exists)
    try {
      await supabase.from("journal_entries").upsert({
        user_id: user?.id,
        date: entry.date,
        question_index: entry.questionIndex,
        question: entry.question,
        answer: entry.answer,
        timestamp: entry.timestamp,
      });
    } catch (err) {
      // ignore - optional feature
      console.log("supabase journal save failed", err);
    }
  };

  // --- Therapist booking ---
  const submitBooking = async () => {
    if (!bookingName || !bookingDate || !bookingTime) {
      alert("Please provide name, date and time for the booking.");
      return;
    }

    const booking: TherapistBooking = {
      user_name: bookingName,
      date: bookingDate,
      time: bookingTime,
      reason: bookingReason,
      timestamp: new Date().toISOString(),
    };

    // try supabase first
    try {
      await supabase.from("therapist_bookings").insert({
        user_id: user?.id,
        user_name: booking.user_name,
        date: booking.date,
        time: booking.time,
        reason: booking.reason,
        timestamp: booking.timestamp,
      });
      setBookingConfirmed(true);
    } catch (err) {
      // fallback: save locally
      try {
        const raw = localStorage.getItem("coji_therapist_bookings");
        const parsed: TherapistBooking[] = raw ? JSON.parse(raw) : [];
        parsed.unshift(booking);
        localStorage.setItem("coji_therapist_bookings", JSON.stringify(parsed));
        setBookingConfirmed(true);
      } catch (e) {
        console.log("booking fallback failed", e);
        alert("Unable to save booking right now. Please try again later.");
      }
    }
  };

  // --- Finances helpers ---
  const loadFinancialData = async () => {
    try {
      // load sticky notes from Supabase if available
      const { data } = await supabase
        .from("financial_notes")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });
      if (data) {
        setNotes(data as StickyNote[]);
      }
    } catch (err) {
      // fallback to localStorage
      try {
        const raw = localStorage.getItem("coji_finance_notes");
        if (raw) setNotes(JSON.parse(raw));
      } catch (e) {
        console.log("loadFinancialData fallback error", e);
      }
    }

    // load monthly income
    try {
      const { data } = await supabase
        .from("finance_profile")
        .select("monthly_income")
        .eq("user_id", user?.id)
        .single();
      if (data && data.monthly_income !== undefined) {
        setMonthlyIncome(data.monthly_income);
        return;
      }
    } catch (e) {
      // ignore
    }

    try {
      const raw = localStorage.getItem("coji_finance_profile");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.monthlyIncome !== undefined) setMonthlyIncome(parsed.monthlyIncome);
      }
    } catch (e) {
      // ignore
    }
  };

  const persistNotesLocal = (arr: StickyNote[]) => {
    try {
      localStorage.setItem("coji_finance_notes", JSON.stringify(arr));
    } catch (e) {
      console.log("persistNotesLocal failed", e);
    }
  };

  const addStickyNote = async () => {
    if (!newNoteText.trim()) return;
    const note: StickyNote = {
      text: newNoteText.trim(),
      type: newNoteType,
      plannedDate: newNoteType === "want" ? null : null,
      created_at: new Date().toISOString(),
    };

    // optimistic update
    const updated = [note, ...notes];
    setNotes(updated);
    persistNotesLocal(updated);

    // try to save to supabase (optional)
    try {
      await supabase.from("financial_notes").insert({
        user_id: user?.id,
        text: note.text,
        type: note.type,
        planned_date: note.plannedDate,
        created_at: note.created_at,
      });
    } catch (err) {
      // ignore
      console.log("save note supabase failed", err);
    }

    setNewNoteText("");
  };

  const moveNote = async (idx: number) => {
    const copy = [...notes];
    const note = copy[idx];
    if (!note) return;
    note.type = note.type === "want" ? "need" : "want";
    setNotes(copy);
    persistNotesLocal(copy);

    // try updating supabase if note has id
    try {
      if (note.id) {
        await supabase.from("financial_notes").update({ type: note.type }).eq("id", note.id);
      }
    } catch (e) {
      console.log("moveNote supabase failed", e);
    }
  };

  const setPlannedDateForNote = async (idx: number, date: string | null) => {
    const copy = [...notes];
    const note = copy[idx];
    if (!note) return;
    note.plannedDate = date;
    setNotes(copy);
    persistNotesLocal(copy);
    try {
      if (note.id) await supabase.from("financial_notes").update({ planned_date: date }).eq("id", note.id);
    } catch (e) {
      console.log("setPlannedDateForNote supabase failed", e);
    }
  };

  const deleteNote = async (idx: number) => {
    const copy = [...notes];
    const note = copy[idx];
    if (!note) return;
    copy.splice(idx, 1);
    setNotes(copy);
    persistNotesLocal(copy);
    try {
      if (note.id) await supabase.from("financial_notes").delete().eq("id", note.id);
    } catch (e) {
      console.log("deleteNote supabase failed", e);
    }
  };

  const saveMonthlyIncome = async (val: number | string) => {
    setMonthlyIncome(val);
    try {
      localStorage.setItem("coji_finance_profile", JSON.stringify({ monthlyIncome: val }));
    } catch (e) {
      console.log("saving monthly income failed", e);
    }
    try {
      await supabase.from("finance_profile").upsert({ user_id: user?.id, monthly_income: val });
    } catch (e) {
      // ignore
    }
  };

  const tabs = [
    { id: "landing", icon: Home, label: "Home" },
    { id: "dashboard", icon: Battery, label: "Energy Management" },
    { id: "calendar", icon: Calendar, label: "Calendar" },
    { id: "analysis", icon: TrendingUp, label: "Analysis" },
    { id: "cojiBuddy", icon: Sparkles, label: "Coji Buddy" },
    { id: "library", icon: Brain, label: "Library" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white relative overflow-hidden">
      {/* Loading overlay with Coji affirmations */}
      <CojiLoader isLoading={isLoading} />
      {/* Subtle starfield background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layer 1 - white stars scattered */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(2px 2px at 17% 23%, rgba(255, 255, 255, 0.4), transparent),
            radial-gradient(1.5px 1.5px at 89% 67%, rgba(255, 255, 255, 0.35), transparent),
            radial-gradient(2px 2px at 43% 12%, rgba(255, 255, 255, 0.38), transparent),
            radial-gradient(1.5px 1.5px at 71% 89%, rgba(255, 255, 255, 0.32), transparent),
            radial-gradient(2px 2px at 5% 55%, rgba(255, 255, 255, 0.36), transparent)
          `,
          backgroundSize: '800px 800px',
          backgroundRepeat: 'repeat',
          animation: 'twinkle1 2.7s ease-in-out infinite, drift1 120s linear infinite'
        }} />

        {/* Layer 2 - white stars scattered */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 62% 41%, rgba(255, 255, 255, 0.3), transparent),
            radial-gradient(2px 2px at 28% 78%, rgba(255, 255, 255, 0.38), transparent),
            radial-gradient(1.5px 1.5px at 95% 19%, rgba(255, 255, 255, 0.28), transparent),
            radial-gradient(2px 2px at 51% 94%, rgba(255, 255, 255, 0.4), transparent),
            radial-gradient(1.5px 1.5px at 14% 31%, rgba(255, 255, 255, 0.33), transparent)
          `,
          backgroundSize: '900px 900px',
          backgroundRepeat: 'repeat',
          animation: 'twinkle2 3.4s ease-in-out infinite 0.7s, drift2 150s linear infinite'
        }} />

        {/* Layer 3 - white stars scattered */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(2px 2px at 38% 58%, rgba(255, 255, 255, 0.32), transparent),
            radial-gradient(1.5px 1.5px at 76% 7%, rgba(255, 255, 255, 0.36), transparent),
            radial-gradient(2px 2px at 9% 84%, rgba(255, 255, 255, 0.31), transparent),
            radial-gradient(1.5px 1.5px at 84% 46%, rgba(255, 255, 255, 0.37), transparent)
          `,
          backgroundSize: '1000px 1000px',
          backgroundRepeat: 'repeat',
          animation: 'twinkle3 4.1s ease-in-out infinite 1.8s, drift3 180s linear infinite'
        }} />

        {/* Layer 4 - white stars scattered */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 47% 72%, rgba(255, 255, 255, 0.28), transparent),
            radial-gradient(2px 2px at 22% 15%, rgba(255, 255, 255, 0.4), transparent),
            radial-gradient(1.5px 1.5px at 68% 91%, rgba(255, 255, 255, 0.29), transparent),
            radial-gradient(2px 2px at 91% 33%, rgba(255, 255, 255, 0.35), transparent)
          `,
          backgroundSize: '950px 950px',
          backgroundRepeat: 'repeat',
          animation: 'twinkle4 3.9s ease-in-out infinite 2.5s, drift4 210s linear infinite'
        }} />

        {/* Layer 5 - teal stars scattered */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(2.5px 2.5px at 34% 27%, rgba(45, 212, 191, 0.35), transparent),
            radial-gradient(2px 2px at 79% 61%, rgba(45, 212, 191, 0.32), transparent),
            radial-gradient(2.5px 2.5px at 11% 49%, rgba(45, 212, 191, 0.3), transparent)
          `,
          backgroundSize: '1100px 1100px',
          backgroundRepeat: 'repeat',
          animation: 'twinkle5 4.6s ease-in-out infinite 0.9s, drift5 240s linear infinite'
        }} />

        {/* Layer 6 - fuchsia stars scattered */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(3px 3px at 56% 38%, rgba(217, 70, 239, 0.3), transparent),
            radial-gradient(2.5px 2.5px at 24% 81%, rgba(217, 70, 239, 0.25), transparent),
            radial-gradient(2.5px 2.5px at 87% 14%, rgba(217, 70, 239, 0.28), transparent)
          `,
          backgroundSize: '1050px 1050px',
          backgroundRepeat: 'repeat',
          animation: 'twinkle6 5.2s ease-in-out infinite 2.1s, drift6 270s linear infinite'
        }} />

        {/* Layer 7 - white medium stars scattered */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(3px 3px at 41% 69%, rgba(255, 255, 255, 0.28), transparent),
            radial-gradient(2.5px 2.5px at 73% 22%, rgba(255, 255, 255, 0.26), transparent),
            radial-gradient(3px 3px at 18% 44%, rgba(255, 255, 255, 0.3), transparent)
          `,
          backgroundSize: '1200px 1200px',
          backgroundRepeat: 'repeat',
          animation: 'twinkle7 3.8s ease-in-out infinite 1.4s, drift7 300s linear infinite'
        }} />

        {/* Layer 8 - large white stars scattered */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(3px 3px at 64% 53%, rgba(255, 255, 255, 0.25), transparent),
            radial-gradient(3.5px 3.5px at 31% 9%, rgba(255, 255, 255, 0.23), transparent)
          `,
          backgroundSize: '1400px 1400px',
          backgroundRepeat: 'repeat',
          animation: 'twinkle8 5.7s ease-in-out infinite 3.2s, drift8 330s linear infinite'
        }} />

        {/* Layer 9 - large teal stars scattered */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(3.5px 3.5px at 82% 76%, rgba(45, 212, 191, 0.22), transparent),
            radial-gradient(3px 3px at 49% 18%, rgba(45, 212, 191, 0.24), transparent)
          `,
          backgroundSize: '1300px 1300px',
          backgroundRepeat: 'repeat',
          animation: 'twinkle9 4.4s ease-in-out infinite 1.1s, drift9 360s linear infinite'
        }} />

        {/* Layer 10 - large fuchsia stars scattered */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(3px 3px at 37% 62%, rgba(217, 70, 239, 0.2), transparent),
            radial-gradient(3.5px 3.5px at 93% 29%, rgba(217, 70, 239, 0.18), transparent)
          `,
          backgroundSize: '1500px 1500px',
          backgroundRepeat: 'repeat',
          animation: 'twinkle10 6.1s ease-in-out infinite 2.9s, drift10 390s linear infinite'
        }} />

        {/* Comet 1 - white comet */}
        <div style={{
          position: 'absolute',
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 0 6px 2px rgba(255, 255, 255, 0.5), -50px 0 30px 10px rgba(255, 255, 255, 0.15), -80px 0 50px 15px rgba(255, 255, 255, 0.08)',
          animation: 'comet1 45s linear infinite'
        }} />

        {/* Comet 2 - teal comet */}
        <div style={{
          position: 'absolute',
          width: '2.5px',
          height: '2.5px',
          borderRadius: '50%',
          background: 'rgba(45, 212, 191, 0.8)',
          boxShadow: '0 0 6px 2px rgba(45, 212, 191, 0.4), -40px 0 25px 8px rgba(45, 212, 191, 0.12), -70px 0 45px 12px rgba(45, 212, 191, 0.06)',
          animation: 'comet2 60s linear infinite 15s'
        }} />

        {/* Comet 3 - fuchsia comet */}
        <div style={{
          position: 'absolute',
          width: '2px',
          height: '2px',
          borderRadius: '50%',
          background: 'rgba(217, 70, 239, 0.75)',
          boxShadow: '0 0 5px 2px rgba(217, 70, 239, 0.35), -35px 0 20px 7px rgba(217, 70, 239, 0.1), -60px 0 40px 10px rgba(217, 70, 239, 0.05)',
          animation: 'comet3 75s linear infinite 30s'
        }} />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes twinkle1 {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes twinkle2 {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.95; }
        }
        @keyframes twinkle3 {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        @keyframes twinkle4 {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.9; }
        }
        @keyframes twinkle5 {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
        @keyframes twinkle6 {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.85; }
        }
        @keyframes twinkle7 {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.95; }
        }
        @keyframes twinkle8 {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.9; }
        }
        @keyframes twinkle9 {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @keyframes twinkle10 {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.75; }
        }
        @keyframes drift1 {
          0% { background-position: 0 0; }
          100% { background-position: 150px 150px; }
        }
        @keyframes drift2 {
          0% { background-position: 0 0; }
          100% { background-position: -150px 150px; }
        }
        @keyframes drift3 {
          0% { background-position: 0 0; }
          100% { background-position: 150px -150px; }
        }
        @keyframes drift4 {
          0% { background-position: 0 0; }
          100% { background-position: -150px -150px; }
        }
        @keyframes drift5 {
          0% { background-position: 0 0; }
          100% { background-position: 350px 350px; }
        }
        @keyframes drift6 {
          0% { background-position: 0 0; }
          100% { background-position: -350px 350px; }
        }
        @keyframes drift7 {
          0% { background-position: 0 0; }
          100% { background-position: 350px -350px; }
        }
        @keyframes drift8 {
          0% { background-position: 0 0; }
          100% { background-position: 700px 700px; }
        }
        @keyframes drift9 {
          0% { background-position: 0 0; }
          100% { background-position: -700px 700px; }
        }
        @keyframes drift10 {
          0% { background-position: 0 0; }
          100% { background-position: 700px -700px; }
        }
        @keyframes comet1 {
          0% {
            top: -5%;
            left: 110%;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            top: 110%;
            left: -5%;
            opacity: 0;
          }
        }
        @keyframes comet2 {
          0% {
            top: 110%;
            left: -5%;
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            top: -5%;
            left: 110%;
            opacity: 0;
          }
        }
        @keyframes comet3 {
          0% {
            top: 50%;
            left: -5%;
            opacity: 0;
          }
          5% {
            opacity: 0.7;
          }
          95% {
            opacity: 0.7;
          }
          100% {
            top: -5%;
            left: 110%;
            opacity: 0;
          }
        }
      `}} />

      <div className="bg-slate-950 bg-opacity-95 border-b border-teal-500 border-opacity-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveTab("landing")}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img
                src="/coji- logo.png"
                alt="Coji"
                width="48"
                height="48"
                className="w-12 h-12 object-contain"
                loading="eager"
              />
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-fuchsia-400">
                Coji Universe
              </h1>
            </button>
            <div className="flex items-center gap-4">
              {activeTab !== "landing" && activeTab !== "login" && (
                <>
                  {getBatteryIcon(batteryLevel)}
                  <span className="text-sm font-medium">{batteryLevel}/12</span>
                  <button
                    onClick={() => setShowEisenpowerMatrix(true)}
                    className="p-2 hover:bg-amber-500 hover:bg-opacity-20 rounded-lg transition-colors"
                    title="Open Eisenpower Matrix"
                  >
                    <LayoutGrid size={20} className="text-amber-400" />
                  </button>
                </>
              )}
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-teal-500 hover:bg-opacity-20 rounded-lg transition-colors"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize size={20} className="text-teal-400" />
                ) : (
                  <Maximize size={20} className="text-teal-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeTab !== "landing" && (
        <>
          {/* Desktop Navigation - Hidden on Mobile */}
          <div
            className="hidden md:block bg-opacity-50 border-b border-opacity-10"
            style={{
              backgroundColor: selectedPlanet ? `${getPlanetTheme(selectedPlanet).colours.primary}10` : 'rgba(2, 6, 23, 0.5)',
              borderColor: selectedPlanet ? getPlanetTheme(selectedPlanet).colours.primary : 'rgb(20, 184, 166)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between gap-1 overflow-x-auto py-3">
                <div className="flex items-center gap-1">
                  {tabs.slice(1).map((tab) => {
                    const Icon = tab.icon;
                    const planetTheme = selectedPlanet ? getPlanetTheme(selectedPlanet) : null;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap ${
                          activeTab === tab.id
                            ? "text-white shadow-lg"
                            : "hover:bg-opacity-10"
                        }`}
                        style={{
                          background: activeTab === tab.id
                            ? planetTheme
                              ? `linear-gradient(to right, ${planetTheme.colours.primary}, ${planetTheme.colours.secondary})`
                              : 'linear-gradient(to right, rgb(20, 184, 166), rgb(217, 70, 239))'
                            : 'transparent',
                          color: activeTab === tab.id
                            ? '#fff'
                            : planetTheme
                              ? planetTheme.colours.primary
                              : 'rgb(94, 234, 212)'
                        }}
                        onMouseEnter={(e) => {
                          if (activeTab !== tab.id) {
                            e.currentTarget.style.backgroundColor = planetTheme
                              ? `${planetTheme.colours.primary}10`
                              : 'rgba(20, 184, 166, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeTab !== tab.id) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <Icon size={16} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
                {user && (
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap text-red-300 hover:bg-red-500 hover:bg-opacity-10 border border-red-500 border-opacity-30"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Hamburger Menu - Shows only Dashboard, Calendar, Coji Buddy, Library */}
          <div
            className="md:hidden bg-opacity-50 border-b border-opacity-10 relative"
            style={{
              backgroundColor: selectedPlanet ? `${getPlanetTheme(selectedPlanet).colours.primary}10` : 'rgba(2, 6, 23, 0.5)',
              borderColor: selectedPlanet ? getPlanetTheme(selectedPlanet).colours.primary : 'rgb(20, 184, 166)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
              <span
                className="font-medium"
                style={{
                  color: selectedPlanet ? getPlanetTheme(selectedPlanet).colours.primary : 'rgb(94, 234, 212)'
                }}
              >
                {tabs.find(t => t.id === activeTab)?.label || "Menu"}
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg transition-colors"
                style={{
                  color: selectedPlanet ? getPlanetTheme(selectedPlanet).colours.primary : 'rgb(94, 234, 212)'
                }}
                onMouseEnter={(e) => {
                  const planetTheme = selectedPlanet ? getPlanetTheme(selectedPlanet) : null;
                  e.currentTarget.style.backgroundColor = planetTheme
                    ? `${planetTheme.colours.primary}10`
                    : 'rgba(20, 184, 166, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div
                className="absolute top-full left-0 right-0 bg-opacity-98 border-b border-opacity-20 z-50 shadow-2xl"
                style={{
                  backgroundColor: selectedPlanet ? `${getPlanetTheme(selectedPlanet).colours.primary}05` : 'rgba(15, 23, 42, 0.98)',
                  borderColor: selectedPlanet ? getPlanetTheme(selectedPlanet).colours.primary : 'rgb(20, 184, 166)',
                  backdropFilter: 'blur(16px)'
                }}
              >
                <div className="px-6 py-4 space-y-2">
                  {[
                    { id: "dashboard", icon: Battery, label: "Energy Management" },
                    { id: "calendar", icon: Calendar, label: "Calendar" },
                    { id: "cojiBuddy", icon: Sparkles, label: "Coji Buddy" },
                    { id: "library", icon: Brain, label: "Library" },
                    { id: "comingsoon", icon: Star, label: "Coming Soon" },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const planetTheme = selectedPlanet ? getPlanetTheme(selectedPlanet) : null;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-base ${
                          activeTab === tab.id
                            ? "text-white shadow-lg"
                            : ""
                        }`}
                        style={{
                          background: activeTab === tab.id
                            ? planetTheme
                              ? `linear-gradient(to right, ${planetTheme.colours.primary}, ${planetTheme.colours.secondary})`
                              : 'linear-gradient(to right, rgb(20, 184, 166), rgb(217, 70, 239))'
                            : 'transparent',
                          color: activeTab === tab.id
                            ? '#fff'
                            : planetTheme
                              ? planetTheme.colours.primary
                              : 'rgb(94, 234, 212)'
                        }}
                        onMouseEnter={(e) => {
                          if (activeTab !== tab.id) {
                            e.currentTarget.style.backgroundColor = planetTheme
                              ? `${planetTheme.colours.primary}10`
                              : 'rgba(20, 184, 166, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeTab !== tab.id) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <Icon size={20} />
                        {tab.label}
                      </button>
                    );
                  })}
                  {user && (
                    <>
                      <div className="border-t border-slate-700 my-2"></div>
                      <button
                        onClick={() => {
                          signOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-base text-red-300 hover:bg-red-500 hover:bg-opacity-10 border border-red-500 border-opacity-30"
                      >
                        <LogOut size={20} />
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {showProfileSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full border border-teal-500 border-opacity-30">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold mb-2 text-teal-300">
                Welcome to Coji Universe!
              </h3>
              <p className="text-slate-400">
                Let's get to know you better
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  What would you like us to call you? <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Your preferred name"
                  className="w-full bg-slate-700 bg-opacity-50 rounded-lg px-4 py-2 text-white placeholder-slate-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  How old are you?
                </label>
                <input
                  type="number"
                  value={profileAge}
                  onChange={(e) => setProfileAge(e.target.value)}
                  placeholder="Your age (optional)"
                  min="1"
                  max="150"
                  className="w-full bg-slate-700 bg-opacity-50 rounded-lg px-4 py-2 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Where are you from?
                </label>
                <input
                  type="text"
                  value={profileCountry}
                  onChange={(e) => setProfileCountry(e.target.value)}
                  placeholder="Country (optional)"
                  className="w-full bg-slate-700 bg-opacity-50 rounded-lg px-4 py-2 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Which city?
                </label>
                <input
                  type="text"
                  value={profileCity}
                  onChange={(e) => setProfileCity(e.target.value)}
                  placeholder="City (optional)"
                  className="w-full bg-slate-700 bg-opacity-50 rounded-lg px-4 py-2 text-white placeholder-slate-500"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={saveUserProfile}
                  className="w-full bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Let's Get Started!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full border border-teal-500 border-opacity-30">
            <h3 className="text-2xl font-bold mb-4 text-teal-300">
              Add New Task
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full bg-slate-700 bg-opacity-50 rounded-lg px-4 py-2 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  className="w-full bg-slate-700 bg-opacity-50 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  How much battery will this take? {"\u{1F50B}"}
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={newTaskEnergy}
                  onChange={(e) => setNewTaskEnergy(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-slate-500">Light (1)</span>
                  <span className="font-bold text-xl text-teal-300">
                    {newTaskEnergy} {"\u{1F50B}"}
                  </span>
                  <span className="text-slate-500">Heavy (12)</span>
                </div>
              </div>

              <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg">
                <p className="text-sm text-slate-400">
                  <strong>Your battery:</strong> {batteryLevel}/12
                  <br />
                  <strong>Already planned:</strong> {totalEnergyRequired} energy
                  <br />
                  <strong>Remaining:</strong> {remainingBattery} energy
                  <br />
                  {newTaskEnergy > remainingBattery && (
                    <span className="text-amber-400 font-semibold">
                      {"\u{26A0}\u{FE0F}"} This task needs more battery than you
                      have!
                    </span>
                  )}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={addTask}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Add Task
                </button>
                <button
                  onClick={() => {
                    setShowTaskModal(false);
                    setNewTaskTitle("");
                  }}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEisenpowerPrompt && pendingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full border border-amber-500 border-opacity-50">
            <div className="text-center mb-6">
              <Zap className="mx-auto mb-4 text-amber-400" size={48} />
              <h3 className="text-2xl font-bold mb-2 text-amber-300">
                Battery Low! {"\u{26A0}\u{FE0F}"}
              </h3>
              <p className="text-slate-300 mb-2">
                This task needs more energy than you have. Let's break it down!
              </p>
              <p className="text-sm text-amber-200 font-semibold">
                Task: "{pendingTask.title}"
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => {
                  setShowEisenpowerPrompt(false);
                  setShowEisenpowerMatrix(true);
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-6 py-4 rounded-lg font-bold transition-colors"
              >
                {"\u{1F50B}"} Use Eisenpower Matrix
              </button>
              <button
                onClick={() => {
                  setShowEisenpowerPrompt(false);
                  setActiveTab("cojiBuddy");
                }}
                className="w-full bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
              >
                <img src="/coji- logo.png" alt="Coji" className="w-6 h-6 object-contain" />
                Ask Coji Buddy for Help
              </button>
              <button
                onClick={async () => {
                  // Add task anyway
                  if (pendingTask) {
                    await supabase.from("tasks").insert({
                      user_id: user?.id,
                      title: pendingTask.title,
                      energy_required: pendingTask.energy,
                      date: pendingTask.date,
                      completed: false,
                      eisenpowered: false,
                    });
                    setNewTaskTitle("");
                    setNewTaskEnergy(3);
                    setShowTaskModal(false);
                    setPendingTask(null);
                    loadData();
                  }
                  setShowEisenpowerPrompt(false);
                }}
                className="w-full bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Keep Task As Is
              </button>
            </div>
          </div>
        </div>
      )}

      {showEisenpowerMatrix && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-800 rounded-xl p-6 max-w-6xl w-full border border-amber-500 border-opacity-50 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-amber-300">
                {"\u{1F50B}"} Eisenpower Matrix
              </h2>
              <button
                onClick={() => {
                  setShowEisenpowerMatrix(false);
                  // Clean up pending task and reset form
                  setPendingTask(null);
                  setNewTaskTitle("");
                  setNewTaskEnergy(3);
                  setShowTaskModal(false);
                }}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {pendingTask && (
              <div className="bg-amber-900 bg-opacity-30 border border-amber-500 rounded-lg p-4 mb-4">
                <p className="text-amber-200 text-sm">
                  <strong>High-energy task to organise:</strong> "{pendingTask.title}"
                </p>
                <p className="text-amber-300 text-xs mt-1">
                  Add this task to one of the quadrants below to help break it down and prioritise it.
                </p>
              </div>
            )}

            <p className="text-slate-300 mb-6 text-center">
              Organise your tasks by urgency and importance. This helps you prioritise what to do first!
            </p>

            {/* Input for new task */}
            <div className="mb-6 bg-slate-700 bg-opacity-50 p-4 rounded-xl">
              <input
                type="text"
                value={newEisenpowerTask}
                onChange={(e) => setNewEisenpowerTask(e.target.value)}
                placeholder="Type a task and click a quadrant below to add it..."
                className="w-full bg-slate-600 px-4 py-3 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newEisenpowerTask.trim()) {
                    e.preventDefault();
                  }
                }}
              />
            </div>

            {/* 4-Quadrant Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Quadrant 1: DO NOW */}
              <div className="bg-red-900 bg-opacity-30 border-2 border-red-500 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-red-300">
                    {"\u{1F525}"} DO NOW
                  </h3>
                  <button
                    onClick={() => {
                      if (newEisenpowerTask.trim()) {
                        setEisenpowerTasks(prev => ({
                          ...prev,
                          urgentImportant: [...prev.urgentImportant, newEisenpowerTask.trim()]
                        }));
                        setNewEisenpowerTask("");
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs font-bold transition-colors"
                  >
                    + Add Here
                  </button>
                </div>
                <p className="text-xs text-red-200 mb-3">Urgent & Important - Do immediately!</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {eisenhowerTasks.urgentImportant.map((task, idx) => (
                    <div key={idx} className="bg-slate-800 bg-opacity-50 p-3 rounded-lg flex justify-between items-start">
                      <input
                        type="text"
                        value={task}
                        onChange={(e) => {
                          setEisenpowerTasks(prev => ({
                            ...prev,
                            urgentImportant: prev.urgentImportant.map((t, i) => i === idx ? e.target.value : t)
                          }));
                        }}
                        className="text-sm text-white flex-1 bg-transparent border-none outline-none focus:bg-slate-700 focus:bg-opacity-50 px-2 py-1 rounded"
                        placeholder="Edit task..."
                      />
                      <button
                        onClick={() => {
                          setEisenpowerTasks(prev => ({
                            ...prev,
                            urgentImportant: prev.urgentImportant.filter((_, i) => i !== idx)
                          }));
                        }}
                        className="text-red-400 hover:text-red-300 ml-2 text-lg flex-shrink-0"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {eisenhowerTasks.urgentImportant.length === 0 && (
                    <p className="text-slate-500 text-sm italic text-center py-4">No tasks yet</p>
                  )}
                </div>
              </div>

              {/* Quadrant 2: DEFER */}
              <div className="bg-amber-900 bg-opacity-30 border-2 border-amber-500 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-amber-300">
                    {"\u{1F4C5}"} DEFER
                  </h3>
                  <button
                    onClick={() => {
                      if (newEisenpowerTask.trim()) {
                        setEisenpowerTasks(prev => ({
                          ...prev,
                          notUrgentImportant: [...prev.notUrgentImportant, newEisenpowerTask.trim()]
                        }));
                        setNewEisenpowerTask("");
                      }
                    }}
                    className="bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded text-xs font-bold transition-colors"
                  >
                    + Add Here
                  </button>
                </div>
                <p className="text-xs text-amber-200 mb-3">Important but not urgent - Schedule these</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {eisenhowerTasks.notUrgentImportant.map((task, idx) => (
                    <div key={idx} className="bg-slate-800 bg-opacity-50 p-3 rounded-lg flex justify-between items-start">
                      <input
                        type="text"
                        value={task}
                        onChange={(e) => {
                          setEisenpowerTasks(prev => ({
                            ...prev,
                            notUrgentImportant: prev.notUrgentImportant.map((t, i) => i === idx ? e.target.value : t)
                          }));
                        }}
                        className="text-sm text-white flex-1 bg-transparent border-none outline-none focus:bg-slate-700 focus:bg-opacity-50 px-2 py-1 rounded"
                        placeholder="Edit task..."
                      />
                      <button
                        onClick={() => {
                          setEisenpowerTasks(prev => ({
                            ...prev,
                            notUrgentImportant: prev.notUrgentImportant.filter((_, i) => i !== idx)
                          }));
                        }}
                        className="text-amber-400 hover:text-amber-300 ml-2 text-lg flex-shrink-0"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {eisenhowerTasks.notUrgentImportant.length === 0 && (
                    <p className="text-slate-500 text-sm italic text-center py-4">No tasks yet</p>
                  )}
                </div>
              </div>

              {/* Quadrant 3: DELEGATE */}
              <div className="bg-blue-900 bg-opacity-30 border-2 border-blue-500 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-blue-300">
                    {"\u{1F4E9}"} DELEGATE
                  </h3>
                  <button
                    onClick={() => {
                      if (newEisenpowerTask.trim()) {
                        setEisenpowerTasks(prev => ({
                          ...prev,
                          urgentNotImportant: [...prev.urgentNotImportant, newEisenpowerTask.trim()]
                        }));
                        setNewEisenpowerTask("");
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs font-bold transition-colors"
                  >
                    + Add Here
                  </button>
                </div>
                <p className="text-xs text-blue-200 mb-3">Urgent but not important - Ask for help!</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {eisenhowerTasks.urgentNotImportant.map((task, idx) => (
                    <div key={idx} className="bg-slate-800 bg-opacity-50 p-3 rounded-lg flex justify-between items-start">
                      <input
                        type="text"
                        value={task}
                        onChange={(e) => {
                          setEisenpowerTasks(prev => ({
                            ...prev,
                            urgentNotImportant: prev.urgentNotImportant.map((t, i) => i === idx ? e.target.value : t)
                          }));
                        }}
                        className="text-sm text-white flex-1 bg-transparent border-none outline-none focus:bg-slate-700 focus:bg-opacity-50 px-2 py-1 rounded"
                        placeholder="Edit task..."
                      />
                      <button
                        onClick={() => {
                          setEisenpowerTasks(prev => ({
                            ...prev,
                            urgentNotImportant: prev.urgentNotImportant.filter((_, i) => i !== idx)
                          }));
                        }}
                        className="text-blue-400 hover:text-blue-300 ml-2 text-lg flex-shrink-0"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {eisenhowerTasks.urgentNotImportant.length === 0 && (
                    <p className="text-slate-500 text-sm italic text-center py-4">No tasks yet</p>
                  )}
                </div>
              </div>

              {/* Quadrant 4: DELETE */}
              <div className="bg-slate-700 bg-opacity-50 border-2 border-slate-500 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-slate-300">
                    {"\u{1F5D1}\u{FE0F}"} DELETE
                  </h3>
                  <button
                    onClick={() => {
                      if (newEisenpowerTask.trim()) {
                        setEisenpowerTasks(prev => ({
                          ...prev,
                          notUrgentNotImportant: [...prev.notUrgentNotImportant, newEisenpowerTask.trim()]
                        }));
                        setNewEisenpowerTask("");
                      }
                    }}
                    className="bg-slate-500 hover:bg-slate-600 px-3 py-1 rounded text-xs font-bold transition-colors"
                  >
                    + Add Here
                  </button>
                </div>
                <p className="text-xs text-slate-400 mb-3">Not urgent or important - Eliminate!</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {eisenhowerTasks.notUrgentNotImportant.map((task, idx) => (
                    <div key={idx} className="bg-slate-800 bg-opacity-50 p-3 rounded-lg flex justify-between items-start">
                      <input
                        type="text"
                        value={task}
                        onChange={(e) => {
                          setEisenpowerTasks(prev => ({
                            ...prev,
                            notUrgentNotImportant: prev.notUrgentNotImportant.map((t, i) => i === idx ? e.target.value : t)
                          }));
                        }}
                        className="text-sm text-white flex-1 bg-transparent border-none outline-none focus:bg-slate-700 focus:bg-opacity-50 px-2 py-1 rounded"
                        placeholder="Edit task..."
                      />
                      <button
                        onClick={() => {
                          setEisenpowerTasks(prev => ({
                            ...prev,
                            notUrgentNotImportant: prev.notUrgentNotImportant.filter((_, i) => i !== idx)
                          }));
                        }}
                        className="text-slate-400 hover:text-slate-300 ml-2 text-lg flex-shrink-0"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {eisenhowerTasks.notUrgentNotImportant.length === 0 && (
                    <p className="text-slate-500 text-sm italic text-center py-4">No tasks yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  // Clear all tasks
                  setEisenpowerTasks({
                    urgentImportant: [],
                    urgentNotImportant: [],
                    notUrgentImportant: [],
                    notUrgentNotImportant: []
                  });
                }}
                className="flex-1 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  setShowEisenpowerMatrix(false);
                  // Clean up pending task and reset form
                  setPendingTask(null);
                  setNewTaskTitle("");
                  setNewTaskEnergy(3);
                  setShowTaskModal(false);
                }}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "landing" && (
          <div>
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <img src="/coji- logo.png" alt="Coji" className="w-28 h-28 object-contain" />
              </div>
              <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-fuchsia-400 to-teal-300 pb-2">
                {user ? (
                  <>Welcome back, {userProfile?.preferred_name || user.email?.split('@')[0] || user.user_metadata?.name || 'friend'} {"\u{1F49C}"}</>
                ) : (
                  'Welcome to Coji Universe'
                )}
              </h1>
              <p className="text-xl text-slate-300 mb-3 max-w-2xl mx-auto">
                Your all-in-one neurodivergent life management hub {"\u{1F49C}"}
              </p>
              <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto italic">
                Helping you make sense of chaos: plan life, not burnout
              </p>

              {!user ? (
                <div className="flex gap-4 justify-center mb-12">
                  <button
                    onClick={() => setActiveTab("login")}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      setActiveTab("login");
                    }}
                    className="relative bg-gradient-to-br from-teal-400 via-fuchsia-400 to-teal-500 hover:from-teal-500 hover:via-fuchsia-500 hover:to-teal-600 px-12 py-5 rounded-2xl font-bold text-xl text-white transition-all shadow-2xl hover:shadow-fuchsia-500/50 hover:scale-105 cursor-pointer touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span className="relative z-10 pointer-events-none">
                      Free for my first friends {"\u{1F496}"}{"\u{2601}\u{FE0F}"}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 justify-center mb-12">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      setActiveTab("dashboard");
                    }}
                    className="relative bg-gradient-to-br from-teal-400 via-fuchsia-400 to-teal-500 hover:from-teal-500 hover:via-fuchsia-500 hover:to-teal-600 px-12 py-5 rounded-2xl font-bold text-xl text-white transition-all shadow-2xl hover:shadow-fuchsia-500/50 hover:scale-105 cursor-pointer touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span className="relative z-10 pointer-events-none">
                      Enter Coji Universe {"\u{2728}"}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Feature Icons Grid - 3 columns on mobile, 4 on tablet+  */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-6 md:gap-10 mb-16 px-4 max-w-4xl mx-auto">
              <FeatureIcon
                icon={Battery}
                label="Energy"
                description="Track your daily energy levels, understand patterns, and plan tasks around your battery capacity"
                color="teal"
              />

              <FeatureIcon
                icon={Sparkles}
                label="Coji Buddy"
                description="Your neurodivergent-friendly AI companion for task breakdown, emotional support, and life strategies"
                color="fuchsia"
              />

              <FeatureIcon
                icon={Heart}
                label="Mental Health"
                description="Access therapy tools, mindfulness exercises, digital worksheets, and daily check-ins for wellbeing"
                color="amber"
              />

              <FeatureIcon
                icon={CheckCircle}
                label="Tasks"
                description="Eisenpower Matrix prioritisation with Do Now, Defer, Delegate, Delete quadrants for energy-aware task management"
                color="teal"
              />

              <FeatureIcon
                icon={BookOpen}
                label="Library"
                description="Comprehensive guides on ADHD, autism, dyslexia, dyspraxia, chronic illness, parenting, and relationships"
                color="blue"
              />

              <FeatureIcon
                icon={Activity}
                label="Health"
                description="Track appointments, medications, menstrual cycles, pregnancy, daily activity, and water intake"
                color="purple"
              />

              <FeatureIcon
                icon={BarChart}
                label="Analytics"
                description="Visualise mood patterns, productivity hours, energy trends, and busiest days with actionable insights"
                color="purple"
              />

              <FeatureIcon
                icon={DollarSign}
                label="Finances"
                description="Wellbeing-focused budgeting and planning tools (not financial advice — consult a licensed professional for investments or debt management)"
                color="green"
              />

              <FeatureIcon
                icon={Star}
                label="Journal"
                description="Daily journalling, thought capturing, gratitude tracking, and personal reflection space"
                color="amber"
              />

              <FeatureIcon
                icon={Calendar}
                label="Calendar"
                description="Sync with Google & Outlook calendars, manage events with energy-aware scheduling"
                color="blue"
              />

              <FeatureIcon
                icon={Users}
                label="Community"
                description="Connect with others, share experiences, get support, and build meaningful relationships"
                color="fuchsia"
              />

              <FeatureIcon
                icon={TrendingUp}
                label="Dashboard"
                description="Your central hub for tracking battery, tasks, mood, and accessing all Coji Universe features"
                color="teal"
              />
            </div>
          </div>
        )}

        {activeTab === "login" && (
          <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="max-w-md w-full">
              <div className="text-center mb-6 md:mb-8">
                <div className="flex justify-center mb-4 md:mb-6">
                  <img src="/coji- logo.png" alt="Coji" className="w-20 h-20 md:w-24 md:h-24 object-contain" loading="eager" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-fuchsia-400 to-teal-300">
                  Welcome Back
                </h1>
                <p className="text-base md:text-lg text-slate-300 mb-6 md:mb-8 px-4">
                  Sign in to access your Coji Universe
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 md:p-8 rounded-xl border border-teal-500 border-opacity-30 shadow-2xl">
                {/* Email/Password Form */}
                <form onSubmit={authMode === 'signin' ? signInWithEmail : signUpWithEmail} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {authError && (
                    <div className="p-3 bg-red-900 bg-opacity-30 border border-red-500 border-opacity-30 rounded-lg">
                      <p className="text-red-300 text-sm">{authError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
                  </button>
                </form>

                {/* Toggle between Sign In / Sign Up */}
                <div className="mt-4 text-center">
                  <button
                    onClick={() => {
                      setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                      setAuthError('');
                    }}
                    className="text-sm text-slate-400 hover:text-teal-300 transition-colors"
                  >
                    {authMode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                  </button>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-800 text-slate-400">Or continue with</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <button
                  onClick={signInWithGoogle}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    signInWithGoogle();
                  }}
                  className="w-full bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 font-bold py-3 md:py-4 px-4 md:px-6 rounded-xl transition-all shadow-lg hover:shadow-xl active:shadow-md flex items-center justify-center gap-3 touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Google</span>
                </button>

                <div className="mt-5 md:mt-6 text-center">
                  <button
                    onClick={() => setActiveTab("landing")}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      setActiveTab("landing");
                    }}
                    className="text-teal-300 hover:text-teal-200 text-sm transition-colors touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    Back to landing page
                  </button>
                </div>
              </div>

              <p className="text-center text-slate-500 text-xs md:text-sm mt-6 md:mt-8 px-4">
                By signing in, you agree to our terms and privacy policy
              </p>
            </div>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-teal-300">
                  Hey {userProfile?.preferred_name || user?.email?.split('@')[0] || user?.user_metadata?.name || 'friend'}! {"\u{1F49C}"}
                </h2>
                <p className="text-slate-400">
                  I'm Coji, and I'm here to help you navigate today with care. Let's see how you're feeling and plan your day around what you can actually handle {"\u{2728}"}
                </p>
              </div>
            </div>

              <div className="mb-8 bg-slate-800 bg-opacity-50 p-8 rounded-xl border border-fuchsia-500 border-opacity-30">
                <div className="flex items-center gap-4 mb-6">
                  <img src="/coji- logo.png" alt="Coji" className="w-24 h-24 object-contain" />
                  <div>
                    <h3 className="text-2xl font-bold text-fuchsia-300">
                      Battery level {"\u{1F50B}"}
                    </h3>
                    <p className="text-sm text-slate-400">
                      How charged do you feel?
                    </p>
                  </div>
                </div>

                {/* Recent Check-ins - Show last 3 */}
                {trackingData.length > 0 && (
                  <div className="mb-6 space-y-2">
                    <h4 className="text-sm font-semibold text-slate-400 mb-3">Recent Check-ins</h4>
                    {trackingData.slice(0, 3).map((checkin, idx) => {
                      const timeAgo = new Date(checkin.timestamp || checkin.date).toLocaleString('en-GB', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      });

                      // Color coding based on battery level
                      const getBatteryColors = (level: number) => {
                        if (level >= 9) return {
                          border: 'border-green-500',
                          bg: 'bg-green-900',
                          text: 'text-green-300',
                          badgeBg: 'bg-green-500'
                        };
                        if (level >= 6) return {
                          border: 'border-teal-500',
                          bg: 'bg-teal-900',
                          text: 'text-teal-300',
                          badgeBg: 'bg-teal-500'
                        };
                        if (level >= 3) return {
                          border: 'border-amber-500',
                          bg: 'bg-amber-900',
                          text: 'text-amber-300',
                          badgeBg: 'bg-amber-500'
                        };
                        return {
                          border: 'border-red-500',
                          bg: 'bg-red-900',
                          text: 'text-red-300',
                          badgeBg: 'bg-red-500'
                        };
                      };

                      const colors = getBatteryColors(checkin.battery);

                      return (
                        <div
                          key={idx}
                          className={`p-3 ${colors.bg} bg-opacity-30 rounded-lg border ${colors.border} border-opacity-30`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {getBatteryIcon(checkin.battery)}
                              <div>
                                <span className={`font-bold ${colors.text} text-lg`}>
                                  {checkin.battery}/12
                                </span>
                                <span className="text-slate-500 text-xs ml-2">
                                  {timeAgo}
                                </span>
                              </div>
                            </div>
                            {idx === 0 && (
                              <span className={`text-xs ${colors.badgeBg} bg-opacity-20 ${colors.text} px-2 py-1 rounded`}>
                                Latest
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-3">
                      <span className="text-slate-500">Empty</span>
                      <div className="flex items-center gap-2">
                        {getBatteryIcon(batteryLevel)}
                        <span className="font-bold text-2xl text-teal-300">
                          {batteryLevel}/12
                        </span>
                      </div>
                      <span className="text-slate-500">Full</span>
                    </div>

                    {/* Custom slider with gradient fill */}
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="12"
                        value={batteryLevel}
                        onChange={(e) =>
                          setBatteryLevel(parseInt(e.target.value))
                        }
                        className="w-full h-6 bg-slate-700 rounded-lg appearance-none cursor-pointer relative z-10"
                        style={{
                          background: `linear-gradient(to right,
                            #2DD4BF 0%,
                            #E879F9 ${(batteryLevel / 12) * 100}%,
                            #334155 ${(batteryLevel / 12) * 100}%,
                            #334155 100%)`
                        }}
                      />
                    </div>

                    {/* Emotional copy for low energy */}
                    {batteryLevel <= 3 && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-amber-900/30 to-red-900/30 border border-amber-500/30 rounded-xl">
                        <p className="text-amber-200 text-sm leading-relaxed">
                          {batteryLevel === 0 ? (
                            <>💙 You've done your best today — maybe it's time to rest. You deserve care and softness right now.</>
                          ) : batteryLevel === 1 ? (
                            <>🌙 Running on empty isn't sustainable, friend. Let's protect your energy and prioritise rest.</>
                          ) : batteryLevel === 2 ? (
                            <>✨ You're doing your best with what you have. Be gentle with yourself today — that's more than enough.</>
                          ) : (
                            <>🌸 Low energy doesn't mean low worth. You're still showing up, and that's beautiful.</>
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={saveTracking}
                    className="w-full bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg"
                  >
                    Save Battery Level
                  </button>
                </div>
              </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-teal-300">
                    Today's Tasks
                  </h3>
                  <button
                    onClick={() => setShowTaskModal(true)}
                    className="bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-4 py-2 rounded-lg font-bold transition-colors shadow-lg flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Add Task
                  </button>
                </div>
                {todaysTasks.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400 text-lg mb-2">No tasks yet for today</p>
                    <p className="text-slate-500 text-sm">Click "Add Task" to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {todaysTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-3 bg-slate-700 bg-opacity-30 rounded-lg"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                              task.completed
                                ? "bg-teal-500 border-teal-500"
                                : "border-slate-500"
                            }`}
                          >
                            {task.completed && (
                              <CheckCircle size={16} className="text-white" />
                            )}
                          </button>
                          <span
                            className={
                              task.completed
                                ? "line-through text-slate-500"
                                : ""
                            }
                          >
                            {task.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-teal-300">
                            {task.energy_required}
                            {"\u{1F50B}"}
                          </span>
                          {!task.completed && user?.app_metadata?.provider === 'google' && (
                            <button
                              onClick={() => addTaskToCalendar(task)}
                              className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-xs transition-colors flex items-center gap-1"
                              title="Add to Google Calendar"
                            >
                              <Calendar size={14} />
                              Calendar
                            </button>
                          )}
                          {task.energy_required > batteryLevel &&
                            !task.completed && (
                              <button
                                onClick={() => eisenpowerTask(task.id)}
                                className="bg-amber-500 hover:bg-amber-600 px-2 py-1 rounded text-xs transition-colors"
                              >
                                Eisenpower
                              </button>
                            )}
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "calendar" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-teal-300">
              Calendar & Events {"\u{1F4C5}"}
            </h2>

            {/* Calendar Integration Box */}
            <div className="mb-8 bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
              <h3 className="text-xl font-bold mb-4 text-fuchsia-300">
                Calendar Integration
              </h3>

              {user?.app_metadata?.provider === 'google' ? (
                // Connected with Google
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-slate-300">Connected with Google Calendar</p>
                  </div>
                  <button
                    onClick={fetchCalendarEvents}
                    disabled={isLoadingCalendar}
                    className="bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingCalendar ? 'Loading...' : 'Refresh Calendar Events'}
                  </button>
                </div>
              ) : (
                // Not connected
                <div>
                  <p className="text-slate-400 mb-4">
                    Connect your calendar to sync tasks and view upcoming events
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-blue-500 border-opacity-20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Calendar size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Google Calendar</h4>
                          <p className="text-xs text-slate-400">Sync with Google</p>
                        </div>
                      </div>
                      <button
                        onClick={signInWithGoogle}
                        className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Connect Google
                      </button>
                    </div>

                    <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-cyan-500 border-opacity-20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                          <Calendar size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Outlook Calendar</h4>
                          <p className="text-xs text-slate-400">Sync with Microsoft</p>
                        </div>
                      </div>
                      <button
                        disabled
                        className="w-full bg-slate-600 px-4 py-2 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-fuchsia-300">
                  {new Date(selectedDate).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-slate-700 bg-opacity-50 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-semibold text-slate-400 text-sm py-2"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              {calendarEvents.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Calendar size={48} className="mx-auto mb-4 text-teal-400" />
                  <p>
                    {user?.app_metadata?.provider === 'google'
                      ? 'Click "Load Calendar Events" to see your Google Calendar here'
                      : 'Your events and tasks will appear here once you connect your calendars'} {"\u{1F4C6}"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-teal-300 mb-4">
                    Upcoming Events
                  </h4>
                  {calendarEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-slate-700 bg-opacity-50 p-4 rounded-lg border border-teal-500 border-opacity-20"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h5 className="font-medium text-white mb-1">
                            {event.summary || 'Untitled Event'}
                          </h5>
                          <p className="text-sm text-slate-400">
                            {event.start?.dateTime
                              ? new Date(event.start.dateTime).toLocaleString('en-GB', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: 'numeric',
                                  minute: '2-digit',
                                })
                              : event.start?.date
                              ? new Date(event.start.date).toLocaleDateString('en-GB', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : 'No date'}
                          </p>
                          {event.description && (
                            <p className="text-sm text-slate-500 mt-2">
                              {event.description}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => importCalendarEventToTask(event)}
                            className="bg-teal-500 hover:bg-teal-600 px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap"
                            title="Import to Today's Tasks"
                          >
                            Import to Tasks
                          </button>
                          {event.htmlLink && (
                            <a
                              href={event.htmlLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal-400 hover:text-teal-300 text-xs text-center"
                            >
                              View in Google
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "analysis" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-teal-300">
              Analysis & Insights {"\u{1F4CA}"}
            </h2>

            {/* Energy Tracking Graph */}
            <div className="mb-8 bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-fuchsia-300">
                  Energy Levels Over Time
                </h3>
                {/* Time Period Toggle - Inside Box */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setAnalysisPeriod('day')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      analysisPeriod === 'day'
                        ? 'bg-gradient-to-r from-teal-500 to-fuchsia-500'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setAnalysisPeriod('week')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      analysisPeriod === 'week'
                        ? 'bg-gradient-to-r from-teal-500 to-fuchsia-500'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setAnalysisPeriod('month')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      analysisPeriod === 'month'
                        ? 'bg-gradient-to-r from-teal-500 to-fuchsia-500'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setAnalysisPeriod('year')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      analysisPeriod === 'year'
                        ? 'bg-gradient-to-r from-teal-500 to-fuchsia-500'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    Year
                  </button>
                </div>
              </div>
              <div className="h-64 flex items-end justify-around gap-2">
                {(() => {
                  const now = new Date();
                  let dataPoints: { label: string; value: number }[] = [];

                  if (analysisPeriod === 'day') {
                    // Last 24 hours - show tracking data from today with timestamps
                    const todayData = trackingData.filter(
                      (d) => d.date === new Date().toISOString().split('T')[0]
                    );
                    if (todayData.length > 0) {
                      dataPoints = todayData.map((d) => {
                        const timestamp = d.timestamp ? new Date(d.timestamp) : new Date();
                        return {
                          label: timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                          value: d.battery,
                        };
                      });
                    } else {
                      const now = new Date();
                      dataPoints = [{
                        label: now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                        value: batteryLevel
                      }];
                    }
                  } else if (analysisPeriod === 'week') {
                    // Last 7 days with dates
                    for (let i = 6; i >= 0; i--) {
                      const date = new Date(now);
                      date.setDate(date.getDate() - i);
                      const dateStr = date.toISOString().split('T')[0];
                      const dayData = trackingData.filter((d) => d.date === dateStr);
                      const avgBattery =
                        dayData.length > 0
                          ? dayData.reduce((sum, d) => sum + d.battery, 0) / dayData.length
                          : 0;
                      dataPoints.push({
                        label: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
                        value: Math.round(avgBattery),
                      });
                    }
                  } else if (analysisPeriod === 'month') {
                    // Last 30 days - grouped by weeks with date ranges
                    for (let week = 4; week >= 0; week--) {
                      const startDate = new Date(now);
                      startDate.setDate(startDate.getDate() - (week * 7 + 6));
                      const endDate = new Date(now);
                      endDate.setDate(endDate.getDate() - week * 7);

                      const weekData = trackingData.filter((d) => {
                        const dDate = new Date(d.date);
                        return dDate >= startDate && dDate <= endDate;
                      });

                      const avgBattery =
                        weekData.length > 0
                          ? weekData.reduce((sum, d) => sum + d.battery, 0) / weekData.length
                          : 0;

                      dataPoints.push({
                        label: `${startDate.getDate()}/${startDate.getMonth() + 1}`,
                        value: Math.round(avgBattery),
                      });
                    }
                  } else {
                    // Last year - grouped by months with month names
                    for (let monthOffset = 11; monthOffset >= 0; monthOffset--) {
                      const date = new Date(now);
                      date.setMonth(date.getMonth() - monthOffset);
                      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
                      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                      const monthData = trackingData.filter((d) => {
                        const dDate = new Date(d.date);
                        return dDate >= monthStart && dDate <= monthEnd;
                      });

                      const avgBattery =
                        monthData.length > 0
                          ? monthData.reduce((sum, d) => sum + d.battery, 0) / monthData.length
                          : 0;

                      dataPoints.push({
                        label: date.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }),
                        value: Math.round(avgBattery),
                      });
                    }
                  }

                  const maxValue = 12;

                  return dataPoints.map((point, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-slate-700 rounded-lg overflow-hidden h-48 flex items-end">
                        <div
                          className="w-full bg-gradient-to-t from-teal-500 to-fuchsia-500 rounded-t-lg transition-all duration-500"
                          style={{
                            height: `${(point.value / maxValue) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">{point.label}</span>
                      <span className="text-sm font-bold text-teal-300">
                        {point.value > 0 ? point.value : '-'}
                      </span>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* Task Impact Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Depleting Tasks */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-red-500 border-opacity-20">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  {"\u{1F4C9}"} Tasks That Deplete You
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  I've noticed these tasks drain your energy:
                </p>
                {(() => {
                  // Find high-energy tasks
                  const depletingTasks = tasks
                    .filter((t) => t.energy_required >= 6)
                    .slice(0, 8);

                  if (depletingTasks.length === 0) {
                    return (
                      <p className="text-slate-500 text-center py-8">
                        No high-energy tasks tracked yet
                      </p>
                    );
                  }

                  // Create word cloud effect with different sizes
                  return (
                    <div className="flex flex-wrap gap-3 justify-center">
                      {depletingTasks.map((task, idx) => {
                        const size = task.energy_required >= 9 ? 'text-lg' : 'text-base';
                        const opacity = task.energy_required >= 9 ? 'opacity-100' : 'opacity-75';
                        return (
                          <span
                            key={idx}
                            className={`${size} ${opacity} font-medium text-red-300 bg-red-500 bg-opacity-10 px-3 py-1 rounded-lg`}
                          >
                            {task.title}
                          </span>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Energising Tasks */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-green-500 border-opacity-20">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  {"\u{1F4C8}"} Tasks That Energise You
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  I've noticed these tasks energise you:
                </p>
                {(() => {
                  // Find low-energy completed tasks (things you did easily)
                  const energizingTasks = tasks
                    .filter((t) => t.completed && t.energy_required <= 3)
                    .slice(0, 8);

                  if (energizingTasks.length === 0) {
                    return (
                      <p className="text-slate-500 text-center py-8">
                        Complete some low-energy tasks to see patterns
                      </p>
                    );
                  }

                  return (
                    <div className="flex flex-wrap gap-3 justify-center">
                      {energizingTasks.map((task, idx) => {
                        const size = task.energy_required <= 1 ? 'text-lg' : 'text-base';
                        const opacity = task.energy_required <= 1 ? 'opacity-100' : 'opacity-75';
                        return (
                          <span
                            key={idx}
                            className={`${size} ${opacity} font-medium text-green-300 bg-green-500 bg-opacity-10 px-3 py-1 rounded-lg`}
                          >
                            {task.title}
                          </span>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Eisenpower Savings */}
            <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-amber-500 border-opacity-20">
              <h3 className="text-2xl font-bold mb-4 text-amber-300">
                {"\u{26A1}"} Eisenpower Savings
              </h3>
              <p className="text-slate-400 mb-6">
                You've saved this amount of energy from Eisenpower (delegate, delete, and defer)
              </p>
              {(() => {
                // Count tasks in each Eisenpower quadrant
                const delegated = eisenhowerTasks.urgentNotImportant.length;
                const deferred = eisenhowerTasks.notUrgentImportant.length;
                const deleted = eisenhowerTasks.notUrgentNotImportant.length;

                // Estimate energy saved (assuming each task would have used ~5 energy)
                const totalSaved = (delegated + deferred + deleted) * 5;

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-amber-400 mb-2">
                        {totalSaved}
                      </div>
                      <div className="text-lg text-slate-300">
                        Energy Units Saved
                      </div>
                      <div className="text-sm text-slate-500 mt-2">
                        Equivalent to {Math.floor(totalSaved / 12)} full battery charges
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-slate-700 bg-opacity-30 p-3 rounded-lg">
                        <span className="text-slate-300">Delegated Tasks:</span>
                        <span className="font-bold text-teal-300">{delegated}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-700 bg-opacity-30 p-3 rounded-lg">
                        <span className="text-slate-300">Deferred Tasks:</span>
                        <span className="font-bold text-fuchsia-300">{deferred}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-700 bg-opacity-30 p-3 rounded-lg">
                        <span className="text-slate-300">Deleted Tasks:</span>
                        <span className="font-bold text-amber-300">{deleted}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {activeTab === "cojiBuddy" && (
          <div>
            <div className="mb-6 bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-30">
              <div className="flex items-center gap-4">
                <img src="/coji- logo.png" alt="Coji" className="w-24 h-24 object-contain" />
                <div>
                  <h2 className="text-3xl font-bold text-fuchsia-300">
                    Coji Buddy
                  </h2>
                  <p className="text-slate-400">
                    Your AI companion for support and strategizing {"\u{1F49C}"}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="mb-4 bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20"
              style={{
                minHeight: "400px",
                maxHeight: "500px",
                overflowY: "auto",
              }}
            >
              {chatHistory.length === 0 ? (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <img src="/coji- logo.png" alt="Coji" className="w-28 h-28 object-contain" />
                  </div>
                  <p className="text-slate-300 text-lg mb-6">
                    Let's chat! I'm here to help {"\u{1F4AC}"}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                    <div className="bg-teal-500 bg-opacity-10 p-4 rounded-lg border border-teal-500 border-opacity-20">
                      <p className="font-semibold mb-2 text-teal-300">
                        I can help with:
                      </p>
                      <ul className="text-sm space-y-1 text-slate-400">
                        <li>
                          {"\u{2022}"} Breaking down tasks {"\u{1F3AF}"}
                        </li>
                        <li>
                          {"\u{2022}"} Managing battery levels {"\u{26A1}"}
                        </li>
                        <li>
                          {"\u{2022}"} Emotional support {"\u{1F495}"}
                        </li>
                        <li>
                          {"\u{2022}"} Finding superpowers {"\u{2B50}"}
                        </li>
                      </ul>
                    </div>
                    <div className="bg-fuchsia-500 bg-opacity-10 p-4 rounded-lg border border-fuchsia-500 border-opacity-20">
                      <p className="font-semibold mb-2 text-fuchsia-300">
                        Try saying:
                      </p>
                      <ul className="text-sm space-y-1 text-slate-400">
                        <li>{"\u{2022}"} "I'm feeling overwhelmed"</li>
                        <li>{"\u{2022}"} "Help break down this task"</li>
                        <li>{"\u{2022}"} "My battery is low"</li>
                        <li>{"\u{2022}"} "What are my superpowers?"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {chatHistory.map((chat, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl ${chat.role === "user" ? "bg-teal-500 bg-opacity-20 ml-8 border border-teal-500 border-opacity-30" : "bg-fuchsia-500 bg-opacity-20 mr-8 border border-fuchsia-500 border-opacity-30"}`}
                    >
                      <p className="text-xs font-semibold mb-2 flex items-center gap-2">
                        {chat.role === "user" ? (
                          <>{"\u{1F64B}"} You</>
                        ) : (
                          <>
                            <img src="/coji- logo.png" alt="Coji" className="w-4 h-4 object-contain inline" />
                            {" "}Coji
                          </>
                        )}
                      </p>
                      <p className="text-sm text-slate-200">{chat.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder={`Type your message... ${"\u{1F4AC}"}`}
                value={cojiMessage}
                onChange={(e) => setCojiMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-slate-800 bg-opacity-50 rounded-xl px-4 py-3 text-white placeholder-slate-500 border border-teal-500 border-opacity-20"
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-3 rounded-xl font-medium transition-colors shadow-lg flex items-center gap-2"
              >
                <MessageCircle size={20} />
                Send
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Voice notes coming soon! {"\u{1F3A4}"}
            </p>

            <div className="mt-6 bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
              <h3 className="text-xl font-bold mb-4 text-teal-300">
                Superpowers & Support
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-amber-300">
                    <Star size={18} />
                    Your Superpowers
                  </h4>
                  <div className="space-y-2 mb-3">
                    {superpowers.map((power) => (
                      <div
                        key={power.id}
                        className="bg-amber-500 bg-opacity-10 p-3 rounded-lg text-sm border border-amber-500 border-opacity-20"
                      >
                        {"\u{2B50}"} {power.text}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add superpower..."
                      value={newSuperpower}
                      onChange={(e) => setNewSuperpower(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSuperpower()}
                      className="flex-1 bg-slate-700 bg-opacity-50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500"
                    />
                    <button
                      onClick={addSuperpower}
                      className="bg-amber-500 hover:bg-amber-600 p-2 rounded-lg"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-300">
                    <Shield size={18} />
                    Support Needs
                  </h4>
                  <div className="space-y-2 mb-3">
                    {supportNeeds.map((need) => (
                      <div
                        key={need.id}
                        className="bg-blue-500 bg-opacity-10 p-3 rounded-lg text-sm border border-blue-500 border-opacity-20"
                      >
                        {"\u{1F499}"} {need.text}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add support need..."
                      value={newSupportNeed}
                      onChange={(e) => setNewSupportNeed(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSupportNeed()}
                      className="flex-1 bg-slate-700 bg-opacity-50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500"
                    />
                    <button
                      onClick={addSupportNeed}
                      className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "library" && (
          <div>
            {!selectedPlanet ? (
              // Library Home - Grid of Planet Cards
              <>
                <h2 className="text-3xl font-bold mb-4 text-teal-300">
                  Superpowers Library
                </h2>
                <p className="text-slate-400 mb-6">
                  Every quirk is a feature, not a bug. Find your strengths & strategies ✨
                </p>

                {/* Search Bar */}
                <div className="mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search symptoms, feelings, or struggles... (typos welcome!)"
                      value={librarySearch}
                      onChange={(e) => setLibrarySearch(e.target.value)}
                      className="w-full px-4 py-3 pl-12 bg-slate-800 bg-opacity-50 border border-teal-500 border-opacity-30 rounded-xl text-slate-300 placeholder-slate-500 focus:outline-none focus:border-opacity-60 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-30 transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                  </div>
                  {librarySearch && (
                    <div className="mt-3 text-sm text-slate-400">
                      Searching for: <span className="text-teal-300 font-medium">{librarySearch}</span>
                    </div>
                  )}
                </div>

                {/* Search Results */}
                {librarySearch && libraryData?.planets && (() => {
                  const searchLower = librarySearch.toLowerCase();
                  let allMatchingTips: any[] = [];

                  // Search through all planets and tips
                  libraryData.planets.forEach((planet: any) => {
                    planet.tips?.forEach((tip: any) => {
                      const matches =
                        tip.title?.toLowerCase().includes(searchLower) ||
                        tip.summary?.toLowerCase().includes(searchLower) ||
                        tip.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower)) ||
                        tip.what_happens?.toLowerCase().includes(searchLower) ||
                        planet.orbit_tags?.some((tag: string) => tag.toLowerCase().includes(searchLower));

                      if (matches) {
                        allMatchingTips.push({ ...tip, planetName: planet.title, planetColour: planet.colour });
                      }
                    });
                  });

                  if (allMatchingTips.length > 0) {
                    return (
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-teal-300">
                            Found {allMatchingTips.length} {allMatchingTips.length === 1 ? 'Strategy' : 'Strategies'}
                          </h3>
                          <button
                            onClick={() => setLibrarySearch('')}
                            className="text-sm text-slate-400 hover:text-teal-300 transition-colors"
                          >
                            Clear Search
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          {allMatchingTips.slice(0, 12).map((tip: any, idx: number) => (
                            <div
                              key={idx}
                              className="bg-slate-800 bg-opacity-50 p-5 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all hover:scale-[1.02]"
                              style={{ borderColor: tip.planetColour }}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <span className="text-xs px-2 py-1 rounded-full bg-slate-700 bg-opacity-50 text-slate-400">
                                  {tip.planetName}
                                </span>
                                {tip.energy && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-slate-700 bg-opacity-50 text-slate-400">
                                    {tip.energy} energy
                                  </span>
                                )}
                              </div>
                              <h4 className="text-lg font-bold mb-2 text-teal-300">
                                {tip.title}
                              </h4>
                              <p className="text-sm text-slate-300 mb-3 leading-relaxed">
                                {tip.summary}
                              </p>
                              <button
                                onClick={() => {
                                  setSelectedTip(tip);
                                }}
                                className="text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
                              >
                                View Full Strategy →
                              </button>
                            </div>
                          ))}
                        </div>
                        {allMatchingTips.length > 12 && (
                          <div className="text-center text-sm text-slate-400">
                            Showing first 12 results. Refine your search for more specific results.
                          </div>
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <div className="mb-8 text-center py-12 bg-slate-800 bg-opacity-30 rounded-xl border border-slate-700 border-opacity-30">
                        <p className="text-slate-400 mb-2">
                          No matches found for "{librarySearch}"
                        </p>
                        <p className="text-sm text-slate-500">
                          Try different keywords or browse the planets below
                        </p>
                      </div>
                    );
                  }
                })()}

                {/* Tip Detail Modal */}
                {selectedTip && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-start sm:items-center justify-center z-50 p-0 sm:p-4 overflow-y-auto"
                    onClick={(e) => {
                      // Close modal if clicking on backdrop
                      if (e.target === e.currentTarget) {
                        setSelectedTip(null);
                      }
                    }}
                  >
                    <div className="bg-slate-900 border-0 sm:border border-teal-500 border-opacity-30 rounded-none sm:rounded-2xl max-w-3xl w-full min-h-screen sm:min-h-0 sm:max-h-[90vh] overflow-y-auto sm:my-8">
                      {/* Modal Header */}
                      <div className="sticky top-0 bg-slate-900 border-b border-slate-700 border-opacity-50 p-6 flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2 mb-2">
                            {selectedTip.planetName && (
                              <span className="text-xs px-2 py-1 rounded-full bg-slate-700 bg-opacity-50 text-slate-400">
                                {selectedTip.planetName}
                              </span>
                            )}
                            {selectedTip.energy && (
                              <span className="text-xs px-2 py-1 rounded-full bg-slate-700 bg-opacity-50 text-slate-400">
                                {selectedTip.energy} energy
                              </span>
                            )}
                          </div>
                          <h3 className="text-2xl font-bold text-teal-300 mb-2">
                            {selectedTip.title}
                          </h3>
                          {selectedTip.tags && selectedTip.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {selectedTip.tags.map((tag: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 rounded-full bg-slate-800 bg-opacity-50 text-slate-400 border border-slate-700"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedTip(null)}
                          className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
                        >
                          <X size={24} />
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="p-6 space-y-6">
                        {/* Summary */}
                        {selectedTip.summary && (
                          <div>
                            <p className="text-lg text-slate-300 leading-relaxed">
                              {selectedTip.summary}
                            </p>
                          </div>
                        )}

                        {/* What Happens */}
                        {selectedTip.what_happens && (
                          <div className="bg-slate-800 bg-opacity-50 p-5 rounded-xl border border-slate-700 border-opacity-50">
                            <h4 className="text-lg font-bold text-teal-300 mb-3 flex items-center gap-2">
                              <Brain size={20} />
                              What's Happening
                            </h4>
                            <p className="text-slate-300 leading-relaxed">
                              {selectedTip.what_happens}
                            </p>
                          </div>
                        )}

                        {/* Try This */}
                        {selectedTip.try_this && selectedTip.try_this.length > 0 && (
                          <div className="bg-slate-800 bg-opacity-50 p-5 rounded-xl border border-slate-700 border-opacity-50">
                            <h4 className="text-lg font-bold text-teal-300 mb-4 flex items-center gap-2">
                              <Sparkles size={20} />
                              Try This
                            </h4>
                            <div className="space-y-3">
                              {selectedTip.try_this.map((step: string, idx: number) => (
                                <div key={idx} className="flex gap-3">
                                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 bg-opacity-20 flex items-center justify-center text-teal-300 text-sm font-bold">
                                    {idx + 1}
                                  </div>
                                  <p className="text-slate-300 leading-relaxed flex-1">
                                    {step}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Why It Helps */}
                        {selectedTip.why_it_helps && (
                          <div className="bg-slate-800 bg-opacity-50 p-5 rounded-xl border border-slate-700 border-opacity-50">
                            <h4 className="text-lg font-bold text-fuchsia-300 mb-3 flex items-center gap-2">
                              <Heart size={20} />
                              Why This Helps
                            </h4>
                            <p className="text-slate-300 leading-relaxed">
                              {selectedTip.why_it_helps}
                            </p>
                          </div>
                        )}

                        {/* Variations */}
                        {selectedTip.variations && (
                          <div className="bg-slate-800 bg-opacity-50 p-5 rounded-xl border border-slate-700 border-opacity-50">
                            <h4 className="text-lg font-bold text-teal-300 mb-4 flex items-center gap-2">
                              <Zap size={20} />
                              Variations
                            </h4>
                            {Array.isArray(selectedTip.variations) ? (
                              <div className="space-y-3">
                                {selectedTip.variations.map((variation: string, idx: number) => (
                                  <div key={idx} className="flex gap-3">
                                    <div className="text-teal-400">•</div>
                                    <p className="text-slate-300 leading-relaxed flex-1">
                                      {variation}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-slate-300 leading-relaxed">
                                {selectedTip.variations}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Pitfalls */}
                        {selectedTip.pitfalls && (
                          <div className="bg-slate-800 bg-opacity-50 p-5 rounded-xl border border-amber-600 border-opacity-30">
                            <h4 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                              <Shield size={20} />
                              Watch Out For
                            </h4>
                            {Array.isArray(selectedTip.pitfalls) ? (
                              <div className="space-y-3">
                                {selectedTip.pitfalls.map((pitfall: string, idx: number) => (
                                  <div key={idx} className="flex gap-3">
                                    <div className="text-amber-400">⚠</div>
                                    <p className="text-slate-300 leading-relaxed flex-1">
                                      {pitfall}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex gap-3">
                                <div className="text-amber-400">⚠</div>
                                <p className="text-slate-300 leading-relaxed flex-1">
                                  {selectedTip.pitfalls}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Copy to Clipboard Button */}
                        {selectedTip.copy_to_clipboard && (
                          <div className="border-t border-slate-700 border-opacity-50 pt-6">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(selectedTip.copy_to_clipboard);
                                alert('Copied to clipboard!');
                              }}
                              className="w-full bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                            >
                              <Copy size={20} />
                              Copy Strategy to Clipboard
                            </button>
                          </div>
                        )}

                        {/* Close Button */}
                        <div className="text-center">
                          <button
                            onClick={() => setSelectedTip(null)}
                            className="text-slate-400 hover:text-white transition-colors text-sm"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Planet Grid - Hidden when searching */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${librarySearch ? 'opacity-50' : ''}`}>
                  <div
                    onClick={() => setSelectedPlanet('adhd-support')}
                    className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer hover:scale-105 hover:shadow-lg"
                    style={{
                      borderColor: getPlanetTheme('adhd-support').colours.primary,
                      boxShadow: `0 0 20px ${getPlanetTheme('adhd-support').colours.primary}10`
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <PlanetOrb
                        emoji={getPlanetTheme('adhd-support').emoji}
                        colour={getPlanetTheme('adhd-support').colours.primary}
                        size="small"
                        showOrbitRing={false}
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-center" style={{ color: getPlanetTheme('adhd-support').colours.primary }}>
                      ADHD Support
                    </h3>
                    <p className="text-sm text-slate-400 text-center">
                      Body doubling, time blocking, dopamine menus
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedPlanet('autism-support')}
                    className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer hover:scale-105 hover:shadow-lg"
                    style={{
                      borderColor: getPlanetTheme('autism-support').colours.primary,
                      boxShadow: `0 0 20px ${getPlanetTheme('autism-support').colours.primary}10`
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <PlanetOrb
                        emoji={getPlanetTheme('autism-support').emoji}
                        colour={getPlanetTheme('autism-support').colours.primary}
                        size="small"
                        showOrbitRing={false}
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-center" style={{ color: getPlanetTheme('autism-support').colours.primary }}>
                      Autism Support
                    </h3>
                    <p className="text-sm text-slate-400 text-center">
                      Sensory tools, social scripts, stim acceptance
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedPlanet('anxiety-tools')}
                    className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer hover:scale-105 hover:shadow-lg"
                    style={{
                      borderColor: getPlanetTheme('anxiety-tools').colours.primary,
                      boxShadow: `0 0 20px ${getPlanetTheme('anxiety-tools').colours.primary}10`
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <PlanetOrb
                        emoji={getPlanetTheme('anxiety-tools').emoji}
                        colour={getPlanetTheme('anxiety-tools').colours.primary}
                        size="small"
                        showOrbitRing={false}
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-center" style={{ color: getPlanetTheme('anxiety-tools').colours.primary }}>
                      Anxiety Tools
                    </h3>
                    <p className="text-sm text-slate-400 text-center">
                      Grounding, breathing, worry management
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedPlanet('parenting-hub')}
                    className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer hover:scale-105 hover:shadow-lg"
                    style={{
                      borderColor: getPlanetTheme('parenting-hub').colours.primary,
                      boxShadow: `0 0 20px ${getPlanetTheme('parenting-hub').colours.primary}10`
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <PlanetOrb
                        emoji={getPlanetTheme('parenting-hub').emoji}
                        colour={getPlanetTheme('parenting-hub').colours.primary}
                        size="small"
                        showOrbitRing={false}
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-center" style={{ color: getPlanetTheme('parenting-hub').colours.primary }}>
                      Parenting Hub
                    </h3>
                    <p className="text-sm text-slate-400 text-center">
                      Therapeutic parenting, school support, managing behaviours
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedPlanet('depression-support')}
                    className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer hover:scale-105 hover:shadow-lg"
                    style={{
                      borderColor: getPlanetTheme('depression-support').colours.primary,
                      boxShadow: `0 0 20px ${getPlanetTheme('depression-support').colours.primary}10`
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <PlanetOrb
                        emoji={getPlanetTheme('depression-support').emoji}
                        colour={getPlanetTheme('depression-support').colours.primary}
                        size="small"
                        showOrbitRing={false}
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-center" style={{ color: getPlanetTheme('depression-support').colours.primary }}>
                      Depression Support
                    </h3>
                    <p className="text-sm text-slate-400 text-center">
                      No zero days, minimum baseline
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedPlanet('dyslexia-dyscalculia')}
                    className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer hover:scale-105 hover:shadow-lg"
                    style={{
                      borderColor: getPlanetTheme('dyslexia-dyscalculia').colours.primary,
                      boxShadow: `0 0 20px ${getPlanetTheme('dyslexia-dyscalculia').colours.primary}10`
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <PlanetOrb
                        emoji={getPlanetTheme('dyslexia-dyscalculia').emoji}
                        colour={getPlanetTheme('dyslexia-dyscalculia').colours.primary}
                        size="small"
                        showOrbitRing={false}
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-center" style={{ color: getPlanetTheme('dyslexia-dyscalculia').colours.primary }}>
                      Dyslexia & Dyscalculia
                    </h3>
                    <p className="text-sm text-slate-400 text-center">
                      Reading tools, maths support, assistive tech
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedPlanet('chronic-illness')}
                    className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer hover:scale-105 hover:shadow-lg"
                    style={{
                      borderColor: getPlanetTheme('chronic-illness').colours.primary,
                      boxShadow: `0 0 20px ${getPlanetTheme('chronic-illness').colours.primary}10`
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <PlanetOrb
                        emoji={getPlanetTheme('chronic-illness').emoji}
                        colour={getPlanetTheme('chronic-illness').colours.primary}
                        size="small"
                        showOrbitRing={false}
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-center" style={{ color: getPlanetTheme('chronic-illness').colours.primary }}>
                      Chronic Illness Resources
                    </h3>
                    <p className="text-sm text-slate-400 text-center">
                      Pacing, exercise, physiotherapy, daily management
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedPlanet('dyspraxia')}
                    className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer hover:scale-105 hover:shadow-lg"
                    style={{
                      borderColor: getPlanetTheme('dyspraxia').colours.primary,
                      boxShadow: `0 0 20px ${getPlanetTheme('dyspraxia').colours.primary}10`
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <PlanetOrb
                        emoji={getPlanetTheme('dyspraxia').emoji}
                        colour={getPlanetTheme('dyspraxia').colours.primary}
                        size="small"
                        showOrbitRing={false}
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-center" style={{ color: getPlanetTheme('dyspraxia').colours.primary }}>
                      Dyspraxia
                    </h3>
                    <p className="text-sm text-slate-400 text-center">
                      Motor skills, coordination, movement support
                    </p>
                  </div>
                </div>
              </>
            ) : (
              // Planet View - Modular library pages
              (() => {
                // Back button component for reuse
                const BackButton = () => {
                  const planetTheme = selectedPlanet ? getPlanetTheme(selectedPlanet) : null;
                  return (
                    <button
                      onClick={() => setSelectedPlanet(null)}
                      className="mb-6 flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg relative z-20"
                      style={{
                        background: planetTheme
                          ? `linear-gradient(135deg, ${planetTheme.colours.primary}25, ${planetTheme.colours.tertiary}20)`
                          : 'rgba(71, 85, 105, 0.2)',
                        border: planetTheme
                          ? `1.5px solid ${planetTheme.colours.primary}50`
                          : '1.5px solid rgba(148, 163, 184, 0.3)',
                        color: planetTheme ? planetTheme.colours.primary : '#cbd5e1',
                        boxShadow: planetTheme
                          ? `0 4px 12px ${planetTheme.colours.primary}20, 0 0 20px ${planetTheme.colours.tertiary}15`
                          : '0 4px 12px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(8px)'
                      }}
                    >
                      <ArrowLeft size={20} />
                      Back to Library
                    </button>
                  );
                };

                // Use new modular library pages for main support planets
                if (selectedPlanet === 'autism-support') {
                  return (
                    <div>
                      <BackButton />
                      <AutismPage />
                    </div>
                  );
                }

                if (selectedPlanet === 'adhd-support') {
                  return (
                    <div>
                      <BackButton />
                      <AdhdPage />
                    </div>
                  );
                }

                if (selectedPlanet === 'anxiety-tools') {
                  return (
                    <div>
                      <BackButton />
                      <AnxietyPage onBack={() => setSelectedPlanet(null)} />
                    </div>
                  );
                }

                if (selectedPlanet === 'depression-support') {
                  return (
                    <div>
                      <BackButton />
                      <DepressionPage onBack={() => setSelectedPlanet(null)} />
                    </div>
                  );
                }

                if (selectedPlanet === 'parenting-hub') {
                  return (
                    <div>
                      <BackButton />
                      <ParentingPage onBack={() => setSelectedPlanet(null)} />
                    </div>
                  );
                }

                if (selectedPlanet === 'dyscalculia') {
                  return (
                    <div>
                      <BackButton />
                      <DyscalculiaPage onBack={() => setSelectedPlanet(null)} />
                    </div>
                  );
                }

                if (selectedPlanet === 'dyslexia-dyscalculia') {
                  return (
                    <div>
                      <BackButton />
                      <DyslexiaDyscalculiaPage onBack={() => setSelectedPlanet(null)} />
                    </div>
                  );
                }

                if (selectedPlanet === 'dyspraxia') {
                  return (
                    <div>
                      <BackButton />
                      <DyspraxiaPage onBack={() => setSelectedPlanet(null)} />
                    </div>
                  );
                }

                if (selectedPlanet === 'chronic-illness') {
                  return (
                    <div>
                      <BackButton />
                      <ChronicIllnessPage onBack={() => setSelectedPlanet(null)} />
                    </div>
                  );
                }

                // Fallback to old PlanetPage for other planets
                const planet = libraryData?.planets?.find((p: any) => p.slug === selectedPlanet);
                if (!planet) return null;

                return (
                  <PlanetPage
                    planetId={selectedPlanet}
                    planetData={planet}
                    onBack={() => setSelectedPlanet(null)}
                    onTagClick={(tag: string) => {
                      setLibrarySearch(tag);
                      setSelectedPlanet(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                );
              })()
            )}
          </div>
        )}

        {activeTab === "comingsoon" && (
          <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full text-center">
              <div className="mb-8">
                <img
                  src="/coji- logo.png"
                  alt="Coji"
                  className="w-32 h-32 md:w-40 md:h-40 mx-auto object-contain mb-6"
                  style={{ animation: 'spin 3s linear infinite' }}
                />
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-fuchsia-400 to-teal-300">
                  Coming Soon!
                </h1>
                <p className="text-lg md:text-xl text-slate-300 mb-8">
                  Coji is still growing {"\u{1F331}"} — here's what's on the way
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
                  <div className="text-3xl mb-3">{"\u{1F469}\u{200D}\u{2695}\u{FE0F}"}</div>
                  <h3 className="text-lg font-bold text-teal-300 mb-2">Healthcare Hub</h3>
                  <p className="text-sm text-slate-400">Track appointments, medications, and menstrual cycles</p>
                </div>

                <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
                  <div className="text-3xl mb-3">{"\u{1F4B8}"}</div>
                  <h3 className="text-lg font-bold text-fuchsia-300 mb-2">Finances Manager</h3>
                  <p className="text-sm text-slate-400">Budget tracking, sticky notes for wants & needs</p>
                </div>

                <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
                  <div className="text-3xl mb-3">{"\u{1F4DD}"}</div>
                  <h3 className="text-lg font-bold text-teal-300 mb-2">Journaling</h3>
                  <p className="text-sm text-slate-400">Daily prompts & reflection tools for self-discovery</p>
                </div>

                <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
                  <div className="text-3xl mb-3">{"\u{1F468}\u{200D}\u{2696}\u{FE0F}"}</div>
                  <h3 className="text-lg font-bold text-fuchsia-300 mb-2">Therapist Booking</h3>
                  <p className="text-sm text-slate-400">Schedule sessions and manage therapy appointments</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-900/30 to-fuchsia-900/30 border border-teal-500 border-opacity-30 rounded-xl p-8">
                <p className="text-teal-200 text-base md:text-lg leading-relaxed mb-4">
                  ✨ Want early access when these features launch?
                </p>
                <p className="text-slate-400 text-sm mb-6">
                  Join my early circle and I'll let you know when new features are ready. You'll be the first to try them!
                </p>
                <button
                  className="bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Join My Early Circle
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "mentalhealth" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-teal-300">
              Mental Health Resources
            </h2>
            <p className="text-slate-400 mb-8">
              Videos, therapy info, and support {"\u{1F496}"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Helpful Videos Card */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F4F9}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Helpful Videos
                </h3>
                <p className="text-sm text-slate-400">
                  Attachment styles, emotional regulation, diagnosis info
                </p>
              </div>

              {/* Types of Therapy Card */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F9E0}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  Types of Therapy
                </h3>
                <p className="text-sm text-slate-400">
                  CBT, DBT, EMDR, NVR, Systemic, Somatic
                </p>
              </div>

              {/* Book in with a Therapist Card */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F4C5}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Book in with a Therapist
                </h3>
                <p className="text-sm text-slate-400">
                  Schedule sessions with vetted professionals
                </p>
              </div>

              {/* Romance Roulette Card */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F491}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  Romance Roulette
                </h3>
                <p className="text-sm text-slate-400">
                  A game about healthy relationships
                </p>
              </div>

              {/* Digital Worksheets Card - Combined */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F4DD}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Digital Worksheets
                </h3>
                <p className="text-sm text-slate-400">
                  Self-esteem, perfectionism, and growth exercises
                </p>
              </div>

              {/* Daily Check-in Card - Interactive */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{2728}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  Three Things I Did Well
                </h3>
                <p className="text-sm text-slate-400">
                  Daily check-in to celebrate your wins
                </p>
              </div>

              {/* Mindfulness Card */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F9D8}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Mindfulness
                </h3>
                <p className="text-sm text-slate-400">
                  Breathing exercises, meditation, and grounding
                </p>
              </div>

              {/* Spirituality Card */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F52E}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  Spirituality
                </h3>
                <p className="text-sm text-slate-400">
                  Explore meaning, purpose, and connection
                </p>
              </div>

              {/* Be in Nature Card */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F333}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Be in Nature
                </h3>
                <p className="text-sm text-slate-400">
                  Nature walks, outdoor activities, eco-therapy
                </p>
              </div>

              {/* Family Mapping Card */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F465}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  Family Mapping
                </h3>
                <p className="text-sm text-slate-400">
                  Visualise family relationships and connections
                </p>
              </div>

              {/* Ecosystem Card */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F30D}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Ecosystem
                </h3>
                <p className="text-sm text-slate-400">
                  Map your support network and community
                </p>
              </div>

              {/* My Life Story Card */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F4D6}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  My Life Story
                </h3>
                <p className="text-sm text-slate-400">
                  Create a timeline of your life journey
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "finances" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-teal-300">Finances</h2>
            <p className="text-slate-400 mb-4">Track budgets, use the 50/30/20 rule, and organise wants vs needs with a simple whiteboard.</p>

            <div className="bg-amber-900 bg-opacity-20 border border-amber-500 border-opacity-30 rounded-lg p-4 mb-6">
              <p className="text-amber-200 text-sm leading-relaxed">
                <strong className="font-semibold">Important:</strong> Coji does not offer financial advice, but rather tools and strategies for wellbeing, budgeting, and planning.
                For debt management, investments, or financial advice, please consult a licensed financial professional.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
                <h3 className="text-xl font-bold mb-4 text-teal-300">50 / 30 / 20 Calculator</h3>
                <p className="text-slate-400 text-sm mb-3">Enter your monthly income to see suggested allocations.</p>
                <div className="flex gap-2 mb-3">
                  <input
                    type="number"
                    value={monthlyIncome as any}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    placeholder="Monthly income"
                    className="flex-1 bg-slate-700 bg-opacity-50 rounded-lg px-3 py-2 text-white"
                  />
                  <button
                    onClick={() => saveMonthlyIncome(Number(monthlyIncome) || 0)}
                    className="bg-gradient-to-r from-teal-500 to-fuchsia-500 px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                </div>

                <div className="space-y-2">
                  {Number(monthlyIncome) > 0 ? (
                    (() => {
                      const val = Number(monthlyIncome) || 0;
                      const needs = Math.round(val * 0.5 * 100) / 100;
                      const wants = Math.round(val * 0.3 * 100) / 100;
                      const savings = Math.round(val * 0.2 * 100) / 100;
                      return (
                        <div>
                          <div className="text-sm text-slate-300 mb-2">Monthly: £{val}</div>
                          <div className="bg-slate-700 bg-opacity-30 p-3 rounded mb-2">
                            <div className="flex justify-between text-sm text-teal-300">Needs (50%) <span>£{needs}</span></div>
                            <div className="w-full bg-slate-600 rounded h-3 mt-2"><div className="bg-teal-400 h-3 rounded" style={{width: '50%'}} /></div>
                          </div>
                          <div className="bg-slate-700 bg-opacity-30 p-3 rounded mb-2">
                            <div className="flex justify-between text-sm text-fuchsia-300">Wants (30%) <span>£{wants}</span></div>
                            <div className="w-full bg-slate-600 rounded h-3 mt-2"><div className="bg-fuchsia-400 h-3 rounded" style={{width: '30%'}} /></div>
                          </div>
                          <div className="bg-slate-700 bg-opacity-30 p-3 rounded">
                            <div className="flex justify-between text-sm text-amber-300">Savings (20%) <span>£{savings}</span></div>
                            <div className="w-full bg-slate-600 rounded h-3 mt-2"><div className="bg-amber-400 h-3 rounded" style={{width: '20%'}} /></div>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <p className="text-slate-400 text-sm">Enter an income to calculate allocations.</p>
                  )}
                </div>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
                <h3 className="text-xl font-bold mb-4 text-fuchsia-300">Quick trackers</h3>
                <p className="text-slate-400 text-sm mb-3">Savings goals, debt tracker, subscriptions — quick links to manage your money.</p>
                <div className="space-y-3">
                  <button className="w-full bg-teal-500 px-4 py-2 rounded-lg">Savings Goals</button>
                  <button className="w-full bg-fuchsia-500 px-4 py-2 rounded-lg">Subscriptions</button>
                  <button className="w-full bg-amber-500 px-4 py-2 rounded-lg">Debt Tracker</button>
                  <button className="w-full bg-teal-500 px-4 py-2 rounded-lg">Cash Flow Sheet</button>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-teal-300">Want vs Need Whiteboard</h3>
              <p className="text-slate-400 mb-4">Add sticky notes and drag them (or use the buttons) between Wants and Needs. For Wants, add a planned purchase date and a note when you'll get it.</p>

              <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Add a sticky note..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="flex-1 bg-slate-700 bg-opacity-50 rounded-lg px-3 py-2 text-white"
                />
                <select value={newNoteType} onChange={(e) => setNewNoteType(e.target.value as any)} className="bg-slate-700 px-3 py-2 rounded-lg">
                  <option value="want">Want</option>
                  <option value="need">Need</option>
                </select>
                <button onClick={addStickyNote} className="bg-gradient-to-r from-teal-500 to-fuchsia-500 px-4 py-2 rounded-lg">Add</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800 bg-opacity-50 p-4 rounded-xl border border-teal-500 border-opacity-10 hover:border-opacity-30 transition-colors cursor-pointer">
                  <h4 className="font-semibold mb-3 text-teal-300">Needs</h4>
                  <div className="space-y-2 min-h-[120px]">
                    {notes.filter((n) => n.type === "need").length === 0 && (
                      <div className="text-slate-400 text-sm">No needs yet.</div>
                    )}
                    {notes.map((note, idx) => note.type === "need" ? (
                      <div key={idx} className="p-3 bg-slate-700 rounded shadow-sm flex justify-between items-start">
                        <div>
                          <div className="text-sm text-slate-200">{note.text}</div>
                          {note.plannedDate && <div className="text-xs text-slate-400">Planned: {note.plannedDate}</div>}
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <button onClick={() => moveNote(notes.indexOf(note))} className="text-xs px-2 py-1 bg-teal-500 rounded">Mark Want</button>
                          <button onClick={() => deleteNote(notes.indexOf(note))} className="text-xs px-2 py-1 bg-red-600 rounded">Delete</button>
                        </div>
                      </div>
                    ) : null)}
                  </div>
                </div>

                <div className="bg-slate-800 bg-opacity-50 p-4 rounded-xl border border-fuchsia-500 border-opacity-10 hover:border-opacity-30 transition-colors cursor-pointer">
                  <h4 className="font-semibold mb-3 text-fuchsia-300">Wants</h4>
                  <div className="space-y-2 min-h-[120px]">
                    {notes.filter((n) => n.type === "want").length === 0 && (
                      <div className="text-slate-400 text-sm">No wants yet.</div>
                    )}
                    {notes.map((note, idx) => note.type === "want" ? (
                      <div key={idx} className="p-3 bg-slate-700 rounded shadow-sm flex justify-between items-start">
                        <div className="flex-1">
                          <div className="text-sm text-slate-200">{note.text}</div>
                          <div className="mt-2 flex items-center gap-2">
                            <input type="date" value={note.plannedDate || ""} onChange={(e) => setPlannedDateForNote(notes.indexOf(note), e.target.value || null)} className="bg-slate-700 px-2 py-1 rounded text-sm text-white" />
                          </div>
                          {note.plannedDate && <div className="text-xs text-slate-400 mt-2">You'll get it: {note.plannedDate}</div>}
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <button onClick={() => moveNote(notes.indexOf(note))} className="text-xs px-2 py-1 bg-amber-500 rounded">Mark Need</button>
                          <button onClick={() => deleteNote(notes.indexOf(note))} className="text-xs px-2 py-1 bg-red-600 rounded">Delete</button>
                        </div>
                      </div>
                    ) : null)}
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-slate-800 bg-opacity-40 p-4 rounded-lg border border-teal-500 border-opacity-10">
                <h4 className="font-semibold text-teal-300 mb-2">Plan for your Wants</h4>
                <p className="text-slate-400 text-sm">Below are your wants with planned dates so you can track when you'll get them.</p>
                <div className="mt-3 space-y-2">
                  {notes.filter((n) => n.type === "want" && n.plannedDate).map((n, i) => (
                    <div key={i} className="p-2 bg-slate-700 rounded flex justify-between items-center">
                      <div className="text-sm text-slate-200">{n.text}</div>
                      <div className="text-xs text-slate-400">Planned: {n.plannedDate}</div>
                    </div>
                  ))}
                  {notes.filter((n) => n.type === "want" && n.plannedDate).length === 0 && (
                    <div className="text-slate-400 text-sm">No planned wants yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "forum" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-teal-300">
              Coji Forum
            </h2>
            <p className="text-slate-400 mb-8">
              Connect, share, support {"\u{1F91D}"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
                <Users className="mb-3 text-teal-400" size={32} />
                <h3 className="text-xl font-bold mb-2 text-teal-300">
                  Community
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Connect with others who understand your journey
                </p>
                <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg text-sm transition-colors">
                  Join Discussions
                </button>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
                <MessageCircle className="mb-3 text-fuchsia-400" size={32} />
                <h3 className="text-xl font-bold mb-2 text-fuchsia-300">
                  Feature Requests
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Share ideas and vote on suggestions
                </p>
                <button className="bg-fuchsia-500 hover:bg-fuchsia-600 px-4 py-2 rounded-lg text-sm transition-colors">
                  Submit Ideas
                </button>
              </div>
            </div>

            <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 mb-6">
              <h3 className="text-xl font-bold mb-4 text-teal-300">
                Forum Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-teal-500 border-opacity-10 hover:border-opacity-30 transition-colors cursor-pointer">
                  <p className="font-semibold mb-1 text-teal-300">
                    {"\u{1F46A}"} Parenting
                  </p>
                  <p className="text-xs text-slate-400">
                    School support and strategies
                  </p>
                </div>
                <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-fuchsia-500 border-opacity-10 hover:border-opacity-30 transition-colors cursor-pointer">
                  <p className="font-semibold mb-1 text-fuchsia-300">
                    {"\u{1F4BC}"} Work & Career
                  </p>
                  <p className="text-xs text-slate-400">
                    Accommodations and job hunting
                  </p>
                </div>
                <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-teal-500 border-opacity-10 hover:border-opacity-30 transition-colors cursor-pointer">
                  <p className="font-semibold mb-1 text-teal-300">
                    {"\u{1F9E0}"} Coping Strategies
                  </p>
                  <p className="text-xs text-slate-400">
                    Share what works for you
                  </p>
                </div>
                <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-fuchsia-500 border-opacity-10 hover:border-opacity-30 transition-colors cursor-pointer">
                  <p className="font-semibold mb-1 text-fuchsia-300">
                    {"\u{1F496}"} Self-Care
                  </p>
                  <p className="text-xs text-slate-400">
                    Mental health and wellbeing
                  </p>
                </div>
                <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-teal-500 border-opacity-10 hover:border-opacity-30 transition-colors cursor-pointer">
                  <p className="font-semibold mb-1 text-teal-300">
                    {"\u{1F3A8}"} Creative Corner
                  </p>
                  <p className="text-xs text-slate-400">
                    Share your creative projects
                  </p>
                </div>
                <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-fuchsia-500 border-opacity-10 hover:border-opacity-30 transition-colors cursor-pointer">
                  <p className="font-semibold mb-1 text-fuchsia-300">
                    {"\u{1F308}"} Success Stories
                  </p>
                  <p className="text-xs text-slate-400">
                    Celebrate wins together
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-500 to-fuchsia-500 bg-opacity-10 p-8 rounded-xl border border-fuchsia-400 border-opacity-20">
              <h3 className="text-2xl font-bold mb-4 text-center text-fuchsia-300">
                Creative Corner - ND & Creative {"\u{1F3A8}"}
              </h3>
              <p className="text-center text-slate-400 mb-6">
                Celebrate neurodivergent creativity! Share projects, get
                feedback, and connect with other ND creators {"\u{1F31F}"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl">
                  <h4 className="text-lg font-bold mb-3 text-fuchsia-300">
                    {"\u{1F4AB}"} Creative Strengths
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>
                      {"\u{2022}"} Unique perspectives & pattern recognition
                    </li>
                    <li>{"\u{2022}"} Hyperfocus on creative projects</li>
                    <li>{"\u{2022}"} Outside-the-box thinking</li>
                    <li>{"\u{2022}"} Deep passion and intensity</li>
                  </ul>
                </div>

                <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl">
                  <h4 className="text-lg font-bold mb-3 text-teal-300">
                    {"\u{2728}"} Creative Tips
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>{"\u{2022}"} Work during peak battery times</li>
                    <li>{"\u{2022}"} Use timers to prevent burnout</li>
                    <li>{"\u{2022}"} Create sensory-friendly workspace</li>
                    <li>{"\u{2022}"} Keep inspiration boards</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button className="bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-8 py-3 rounded-xl font-bold transition-colors">
                  Share Your Creative Work
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "journal" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-teal-300">Journal</h2>
            <p className="text-slate-400 mb-8">
              A daily question prompt — answer once per day and browse past answers over the years.
            </p>

            <div className="mb-8 bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
              <h3 className="font-bold mb-4 text-fuchsia-300">Today's Question</h3>
              <p className="text-slate-200 mb-4">{currentQuestion}</p>
              <textarea
                placeholder="Write your answer here..."
                value={journalAnswer}
                onChange={(e) => setJournalAnswer(e.target.value)}
                className="w-full h-40 bg-slate-700 bg-opacity-50 rounded-lg px-4 py-3 text-white placeholder-slate-500 resize-none border border-teal-500 border-opacity-20"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    saveJournalEntry(journalAnswer);
                  }}
                  className="bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  Save Answer
                </button>
                <button
                  onClick={() => {
                    setJournalAnswer("");
                  }}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
              <h3 className="font-bold mb-4 text-teal-300">Past Entries</h3>
              {journalEntries.length === 0 ? (
                <p className="text-slate-400 text-sm">No journal entries yet.</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {journalEntries.map((entry) => (
                    <div key={entry.date} className="p-3 bg-slate-700 bg-opacity-30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold text-teal-300">{new Date(entry.date).toLocaleDateString()}</div>
                        <div className="text-xs text-slate-400">Q#{entry.questionIndex}</div>
                      </div>
                      <div className="text-sm text-slate-200">{entry.question}</div>
                      <div className="mt-2 text-sm text-slate-300">{entry.answer}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Clipboard Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-teal-300">Clipboard</h3>
              <p className="text-slate-400 mb-6">
                Save important notes, school reviews, appointments {"\u{1F4CC}"}
              </p>

              <div className="mb-8 bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
                <h4 className="font-bold mb-4 text-fuchsia-300">
                  Create New Clip
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Title (e.g., School Annual Review Notes)"
                    className="w-full bg-slate-700 bg-opacity-50 rounded-lg px-4 py-2 text-white placeholder-slate-500 border border-teal-500 border-opacity-20"
                  />
                  <textarea
                    placeholder="Content..."
                    className="w-full h-32 bg-slate-700 bg-opacity-50 rounded-lg px-4 py-2 text-white placeholder-slate-500 resize-none border border-teal-500 border-opacity-20"
                  />
                  <button className="bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <Plus size={18} />
                    Save Clip
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4 text-teal-300">
                  Your Clips
                </h4>
                <p className="text-slate-400 text-sm">
                  No clips yet. Start saving important info! {"\u{1F49C}"}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analysis" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-teal-300">Analysis & Insights {"\u{1F4CA}"}</h2>
            <p className="text-slate-400 mb-8">Quick insights about when you have the most energy and your busiest days of the week.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
                <h3 className="text-lg font-bold text-teal-300 mb-3">Energy by Time of Day</h3>
                <EnergyByHourChart data={averageByHour("battery")} />
                {/* Mock Data Summary */}
                <div className="mt-4 p-3 bg-slate-700 bg-opacity-30 rounded-lg">
                  <div className="text-xs text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Peak Energy:</span>
                      <span className="text-teal-300 font-semibold">10:00 (85%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lowest Energy:</span>
                      <span className="text-amber-300 font-semibold">15:00 (35%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Busiest Day of the Week */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
                <h3 className="text-lg font-bold text-teal-300 mb-3">Busiest Day of the Week</h3>
                <div className="space-y-2">
                  {[
                    { day: 'Monday', tasks: 12, color: 'bg-red-500', width: 100 },
                    { day: 'Tuesday', tasks: 8, color: 'bg-amber-500', width: 67 },
                    { day: 'Wednesday', tasks: 10, color: 'bg-orange-500', width: 83 },
                    { day: 'Thursday', tasks: 7, color: 'bg-yellow-500', width: 58 },
                    { day: 'Friday', tasks: 9, color: 'bg-amber-500', width: 75 },
                    { day: 'Saturday', tasks: 4, color: 'bg-teal-500', width: 33 },
                    { day: 'Sunday', tasks: 3, color: 'bg-teal-400', width: 25 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">{item.day}</span>
                        <span className="text-teal-300">{item.tasks} tasks/appointments</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.width}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-slate-700 bg-opacity-30 rounded-lg text-xs text-slate-300">
                  🏆 Busiest: Monday | 🌴 Most relaxed: Sunday
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "health" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-teal-300">Health</h2>

            {/* Card Visibility Toggles */}
            <div className="mb-6 bg-slate-800 bg-opacity-50 p-4 rounded-xl border border-teal-500 border-opacity-20">
              <h3 className="text-sm font-bold text-teal-300 mb-3">Customize Your Health Cards</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { key: 'menstrual', label: 'Menstrual' },
                  { key: 'appointments', label: 'Appointments' },
                  { key: 'prescriptions', label: 'Prescriptions' },
                  { key: 'pregnancy', label: 'Pregnancy' },
                  { key: 'activity', label: 'Activity' },
                  { key: 'water', label: 'Water' },
                ].map((card) => (
                  <button
                    key={card.key}
                    onClick={() => toggleHealthCard(card.key as keyof typeof healthCardVisibility)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      healthCardVisibility[card.key as keyof typeof healthCardVisibility]
                        ? 'bg-teal-500 text-white'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {healthCardVisibility[card.key as keyof typeof healthCardVisibility] ? '✓ ' : ''}
                    {card.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Menstrual Tracking */}
              {healthCardVisibility.menstrual && (
              <div className="bg-slate-800 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
                <h3 className="font-bold text-fuchsia-300 mb-4">Menstrual Tracking</h3>

                {/* Mock Data Visualization - Cycle Calendar */}
                <div className="mb-4 bg-slate-700 bg-opacity-30 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-fuchsia-200 mb-3">Cycle Overview (Last 3 Months)</h4>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <div key={i} className="text-center text-slate-400 font-semibold">{day}</div>
                    ))}
                    {Array.from({ length: 28 }, (_, i) => (
                      <div
                        key={i}
                        className={`h-8 rounded flex items-center justify-center ${
                          i % 28 < 5 ? 'bg-fuchsia-500' :
                          i % 28 < 14 ? 'bg-teal-500 bg-opacity-20' :
                          'bg-slate-600 bg-opacity-20'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-fuchsia-500 rounded"></div>
                      <span>Period</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-teal-500 bg-opacity-40 rounded"></div>
                      <span>Fertile</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-400">
                    Average cycle: 28 days | Next period: Dec 15
                  </div>
                </div>

                <form className="flex gap-2 mb-2" onSubmit={e => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const start = (form.elements.namedItem('start') as HTMLInputElement).value;
                  const end = (form.elements.namedItem('end') as HTMLInputElement).value;
                  if (start) {
                    const cycles = [{ id: Date.now().toString(), start, end }, ...menstrualCycles];
                    localStorage.setItem('cycles', JSON.stringify(cycles));
                    form.reset();
                    setMenstrualCycles(cycles);
                  }
                }}>
                  <input name="start" type="date" className="bg-slate-700 rounded px-2 py-1 text-sm" required />
                  <input name="end" type="date" className="bg-slate-700 rounded px-2 py-1 text-sm" placeholder="End (optional)" />
                  <button className="bg-fuchsia-500 px-3 py-1 rounded text-white text-sm">Add</button>
                </form>
                <ul className="text-xs">
                  {menstrualCycles.map((c, i) => (
                    <li key={c.id}>Start: {c.start} {c.end && `- End: ${c.end}`}</li>
                  ))}
                </ul>
              </div>
              )}

              {/* Appointments & Medications */}
              {healthCardVisibility.appointments && (
              <div className="bg-slate-800 p-6 rounded-xl border border-teal-500 border-opacity-20">
                <h3 className="font-bold text-teal-300 mb-4">Appointments & Medications</h3>

                {/* Mock Data Visualization - Upcoming Timeline */}
                <div className="mb-4 bg-slate-700 bg-opacity-30 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-teal-200 mb-3">This Week</h4>
                  <div className="space-y-2">
                    {[
                      { day: 'Mon', time: '10:00', event: 'GP Checkup', type: 'appt' },
                      { day: 'Wed', time: '08:00', event: 'Ibuprofen', type: 'med' },
                      { day: 'Wed', time: '20:00', event: 'Ibuprofen', type: 'med' },
                      { day: 'Fri', time: '14:30', event: 'Therapist', type: 'appt' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs">
                        <div className={`px-2 py-1 rounded ${item.type === 'appt' ? 'bg-teal-500' : 'bg-amber-500'}`}>
                          {item.day}
                        </div>
                        <div className="text-slate-400">{item.time}</div>
                        <div className="flex-1">{item.event}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-teal-500 rounded"></div>
                      <span>Appointment</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-amber-500 rounded"></div>
                      <span>Medication</span>
                    </div>
                  </div>
                </div>

                {/* Appointments */}
                <form className="flex gap-2 mb-2" onSubmit={e => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const title = (form.elements.namedItem('appt') as HTMLInputElement).value;
                  const date = (form.elements.namedItem('apptdate') as HTMLInputElement).value;
                  if (title && date) {
                    const appts = [{ id: Date.now().toString(), title, date }, ...appointments];
                    localStorage.setItem('appts', JSON.stringify(appts));
                    form.reset();
                    setAppointments(appts);
                  }
                }}>
                  <input name="appt" placeholder="Appointment" className="bg-slate-700 rounded px-2 py-1" required />
                  <input name="apptdate" type="datetime-local" className="bg-slate-700 rounded px-2 py-1" required />
                  <button className="bg-teal-500 px-3 py-1 rounded text-white">Add</button>
                </form>
                <ul className="text-xs">
                  {appointments.map((a, i) => (
                    <li key={a.id}>{a.title} — {a.date}</li>
                  ))}
                </ul>
                {/* Medications */}
                <form className="flex gap-2 mt-4 mb-2" onSubmit={e => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (form.elements.namedItem('med') as HTMLInputElement).value;
                  const time = (form.elements.namedItem('medtime') as HTMLInputElement).value;
                  if (name) {
                    const meds = [{ id: Date.now().toString(), name, time }, ...medications];
                    localStorage.setItem('meds', JSON.stringify(meds));
                    form.reset();
                    setMedications(meds);
                  }
                }}>
                  <input name="med" placeholder="Medication" className="bg-slate-700 rounded px-2 py-1" required />
                  <input name="medtime" type="time" className="bg-slate-700 rounded px-2 py-1" />
                  <button className="bg-teal-500 px-3 py-1 rounded text-white">Add</button>
                </form>
                <ul className="text-xs">
                  {medications.map((m, i) => (
                    <li key={m.id}>{m.name} {m.time && `at ${m.time}`}</li>
                  ))}
                </ul>
              </div>
              )}

              {/* Prescription & Screening Reminders */}
              {healthCardVisibility.prescriptions && (
              <div className="bg-slate-800 p-6 rounded-xl border border-amber-500 border-opacity-20">
                <h3 className="font-bold text-amber-300 mb-4">Prescription & Screening Reminders</h3>

                {/* Mock Data Visualization - Status Bars */}
                <div className="mb-4 bg-slate-700 bg-opacity-30 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-amber-200 mb-3">Prescription Status</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Sertraline', days: 7, total: 30 },
                      { name: 'Vitamin D', days: 15, total: 30 },
                      { name: 'Omeprazole', days: 3, total: 30 },
                    ].map((med, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{med.name}</span>
                          <span className="text-amber-300">{med.days} days left</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${med.days < 7 ? 'bg-red-500' : med.days < 14 ? 'bg-amber-500' : 'bg-teal-500'}`}
                            style={{ width: `${(med.days / med.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-xs text-slate-400">
                    <div>Next screening: Cervical smear - Jan 2025</div>
                    <div>Due: Dental checkup - Dec 2024</div>
                  </div>
                </div>

                {/* Prescription */}
                <form className="flex gap-2 mb-2" onSubmit={e => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const med = (form.elements.namedItem('presc') as HTMLInputElement).value;
                  const days = (form.elements.namedItem('days') as HTMLInputElement).value;
                  if (med && days) {
                    const presc = [{ id: Date.now().toString(), med, days }, ...prescriptionReminders];
                    localStorage.setItem('presc', JSON.stringify(presc));
                    form.reset();
                    setPrescriptionReminders(presc);
                  }
                }}>
                  <input name="presc" placeholder="Medication" className="bg-slate-700 rounded px-2 py-1" required />
                  <input name="days" type="number" min="1" placeholder="Days left" className="bg-slate-700 rounded px-2 py-1" required />
                  <button className="bg-amber-500 px-3 py-1 rounded text-white">Add</button>
                </form>
                <ul className="text-xs">
                  {prescriptionReminders.map((p, i) => (
                    <li key={p.id}>{p.med} — reorder at {p.days} days left</li>
                  ))}
                </ul>
                {/* Screening */}
                <form className="flex gap-2 mt-4 mb-2" onSubmit={e => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const type = (form.elements.namedItem('screen') as HTMLInputElement).value;
                  const date = (form.elements.namedItem('sdate') as HTMLInputElement).value;
                  if (type && date) {
                    const screens = [{ id: Date.now().toString(), type, date }, ...screeningReminders];
                    localStorage.setItem('screens', JSON.stringify(screens));
                    form.reset();
                    setScreeningReminders(screens);
                  }
                }}>
                  <input name="screen" placeholder="Screening type" className="bg-slate-700 rounded px-2 py-1" required />
                  <input name="sdate" type="date" className="bg-slate-700 rounded px-2 py-1" required />
                  <button className="bg-amber-500 px-3 py-1 rounded text-white">Add</button>
                </form>
                <ul className="text-xs">
                  {screeningReminders.map((s, i) => (
                    <li key={s.id}>{s.type} — due {s.date}</li>
                  ))}
                </ul>
                <div className="text-xs mt-2 text-slate-400">Include reminders for breast/testicular cancer, cervical, bowel, etc.</div>
              </div>
              )}

              {/* Pregnancy Tracking */}
              {healthCardVisibility.pregnancy && (
              <div className="bg-slate-800 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
                <h3 className="font-bold text-fuchsia-300 mb-4">Pregnancy Tracking</h3>

                {/* Mock Data Visualization - Pregnancy Progress */}
                <div className="mb-4 bg-slate-700 bg-opacity-30 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-fuchsia-200 mb-3">Pregnancy Progress</h4>
                  <div className="text-center mb-3">
                    <div className="text-3xl font-bold text-fuchsia-300">24</div>
                    <div className="text-xs text-slate-400">Weeks</div>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-3 mb-2">
                    <div className="bg-gradient-to-r from-fuchsia-500 to-pink-400 h-3 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Week 1</span>
                    <span>Week 40</span>
                  </div>
                  <div className="mt-3 text-xs text-slate-300">
                    <div>Due Date: June 15, 2025</div>
                    <div>Trimester: 2nd (24/40 weeks)</div>
                    <div className="mt-2 text-fuchsia-200">Baby size: ~30cm (corn)</div>
                  </div>
                </div>

                <form className="flex gap-2 mb-2" onSubmit={e => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const preg = (form.elements.namedItem('preg') as HTMLInputElement).checked;
                  const due = (form.elements.namedItem('duedate') as HTMLInputElement).value;
                  localStorage.setItem('pregnancy', JSON.stringify({ preg, due }));
                  setPregnancy({ preg, due });
                }}>
                  <label className="flex items-center gap-2 text-sm">
                    <input name="preg" type="checkbox" className="accent-pink-500" />
                    Pregnant
                  </label>
                  <input name="duedate" type="date" className="bg-slate-700 rounded px-2 py-1 text-sm" />
                  <button className="bg-fuchsia-500 px-3 py-1 rounded text-white text-sm">Save</button>
                </form>
              </div>
              )}

              {/* Daily Activity */}
              {healthCardVisibility.activity && (
              <div className="bg-slate-800 p-6 rounded-xl border border-teal-500 border-opacity-20">
                <h3 className="font-bold text-teal-300 mb-4">Daily Activity</h3>

                {/* Mock Data Visualization - Activity Stats */}
                <div className="mb-4 bg-slate-700 bg-opacity-30 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-teal-200 mb-3">Today's Activity</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-600 bg-opacity-30 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-teal-300">1,847</div>
                      <div className="text-xs text-slate-400">Calories</div>
                      <div className="w-full bg-slate-600 rounded-full h-1.5 mt-2">
                        <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Goal: 2,000</div>
                    </div>
                    <div className="bg-slate-600 bg-opacity-30 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-fuchsia-300">7,234</div>
                      <div className="text-xs text-slate-400">Steps</div>
                      <div className="w-full bg-slate-600 rounded-full h-1.5 mt-2">
                        <div className="bg-fuchsia-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Goal: 10,000</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs">
                    <div className="font-semibold text-teal-200 mb-1">Meal Reminders:</div>
                    <div className="flex gap-2 flex-wrap">
                      {['08:00', '13:00', '18:00'].map((time, i) => (
                        <div key={i} className="px-2 py-1 bg-teal-500 bg-opacity-20 rounded text-xs">
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calories */}
                <div className="mb-2">
                  <label className="block text-xs mb-1">Calories today</label>
                  <input type="number" className="bg-slate-700 rounded px-2 py-1 w-32 text-sm" value={caloriesToday} onChange={e => {
                    setCaloriesToday(Number(e.target.value));
                    localStorage.setItem('calories', e.target.value);
                  }} />
                </div>
                {/* Steps */}
                <div className="mb-2">
                  <label className="block text-xs mb-1">Steps today</label>
                  <input type="number" className="bg-slate-700 rounded px-2 py-1 w-32 text-sm" value={stepsToday} onChange={e => {
                    setStepsToday(Number(e.target.value));
                    localStorage.setItem('steps', e.target.value);
                  }} />
                </div>
                {/* Eat Reminders */}
                <form className="flex gap-2 mt-2 mb-2" onSubmit={e => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const time = (form.elements.namedItem('eattime') as HTMLInputElement).value;
                  if (time) {
                    const eats = [{ id: Date.now().toString(), time }, ...eatReminders];
                    localStorage.setItem('eats', JSON.stringify(eats));
                    form.reset();
                    setEatReminders(eats);
                  }
                }}>
                  <input name="eattime" type="time" className="bg-slate-700 rounded px-2 py-1 text-sm" required />
                  <button className="bg-teal-500 px-3 py-1 rounded text-white text-sm">Add Eat Reminder</button>
                </form>
                <ul className="text-xs">
                  {eatReminders.map((e, i) => (
                    <li key={e.id}>{e.time}</li>
                  ))}
                </ul>
              </div>
              )}

              {/* Water Tracker */}
              {healthCardVisibility.water && (
              <div className="bg-slate-800 p-6 rounded-xl border border-blue-500 border-opacity-20">
                <h3 className="font-bold text-blue-300 mb-4">Water Tracker</h3>

                {/* Mock Data Visualization - Water Intake */}
                <div className="mb-4 bg-slate-700 bg-opacity-30 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-200 mb-3">Today's Hydration</h4>

                  {/* Visual Water Glass */}
                  <div className="flex justify-center mb-4">
                    <div className="relative w-24 h-32 border-4 border-blue-400 rounded-b-lg bg-slate-900">
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-b-lg transition-colors duration-500"
                        style={{ height: '62.5%' }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center z-10">
                          <div className="text-xl font-bold text-white drop-shadow-lg">5/8</div>
                          <div className="text-xs text-white drop-shadow-lg">glasses</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Stats */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Daily Goal: 2000ml (8 glasses)</span>
                      <span className="text-blue-300 font-semibold">1250ml</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: '62.5%' }}></div>
                    </div>
                    <div className="text-xs text-slate-400">
                      You're 62.5% of the way to your goal!
                    </div>
                  </div>

                  {/* Water Glass Counters */}
                  <div className="mt-4 grid grid-cols-8 gap-1">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        key={i}
                        className={`h-8 rounded ${i < 5 ? 'bg-blue-400' : 'bg-slate-600 bg-opacity-30'}`}
                        title={`Glass ${i + 1}`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Water Input */}
                <div className="space-y-2">
                  <label className="block text-xs mb-1">Log water intake (ml)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="250"
                      className="bg-slate-700 rounded px-3 py-2 w-32 text-sm"
                    />
                    <button className="bg-blue-500 px-4 py-2 rounded text-white text-sm hover:bg-blue-600 transition-colors">
                      Add
                    </button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-slate-700 px-3 py-2 rounded text-xs hover:bg-slate-600">
                      +250ml (1 glass)
                    </button>
                    <button className="flex-1 bg-slate-700 px-3 py-2 rounded text-xs hover:bg-slate-600">
                      +500ml (bottle)
                    </button>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="text-sm text-slate-400">
                © {new Date().getFullYear()} Coji Universe. All rights reserved.
              </div>
              <div className="flex items-center gap-3 text-xs">
                <a
                  href="/privacy"
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Privacy Policy
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href="/terms"
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Terms & Conditions
                </a>
              </div>
            </div>

            <a
              href="https://sidething.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 bg-opacity-40 border border-slate-600 border-opacity-30 hover:bg-opacity-60 hover:border-teal-400 hover:border-opacity-50 transition-colors duration-300"
            >
              <span className="text-xs text-slate-400 group-hover:text-slate-300">Like this? Check out</span>
              <span className="text-sm font-semibold text-teal-400 group-hover:text-teal-300">Sidething</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CojiUniverse;
