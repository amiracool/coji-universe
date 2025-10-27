"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
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
} from "lucide-react";
import { supabase, DEMO_USER_ID } from "@/lib/supabase";

// Lazy-load FeatureIcon component for better performance
const FeatureIcon = dynamic(() => import("@/components/FeatureIcon"), {
  ssr: false,
  loading: () => <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-800 bg-opacity-30 rounded-2xl animate-pulse" />,
});

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
  const [showEisenhowerMatrix, setShowEisenhowerMatrix] = useState(false);
  const [eisenhowerTasks, setEisenhowerTasks] = useState<{
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
  const [newEisenhowerTask, setNewEisenhowerTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: trackData } = await supabase
        .from("tracking_data")
        .select("*")
        .eq("user_id", DEMO_USER_ID)
        .order("date", { ascending: true });
      if (trackData) setTrackingData(trackData);

      const { data: chatData } = await supabase
        .from("chat_history")
        .select("*")
        .eq("user_id", DEMO_USER_ID)
        .order("timestamp", { ascending: true });
      if (chatData) setChatHistory(chatData);

      const { data: powerData } = await supabase
        .from("superpowers")
        .select("*")
        .eq("user_id", DEMO_USER_ID);
      if (powerData) setSuperpowers(powerData);

      const { data: supportData } = await supabase
        .from("support_needs")
        .select("*")
        .eq("user_id", DEMO_USER_ID);
      if (supportData) setSupportNeeds(supportData);

      const { data: tasksData } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", DEMO_USER_ID)
        .order("date", { ascending: true });
      if (tasksData) setTasks(tasksData);

      // load the most recent check-in (allow multiple check-ins per day)
      const { data: lastTracking } = await supabase
        .from("tracking_data")
        .select("*")
        .eq("user_id", DEMO_USER_ID)
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

  const saveTracking = async () => {
    if (!todayFeeling) {
      alert("Please select how you're feeling now! \u{1F60A}");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    // Insert a new check-in row so users can check in multiple times per day
    const { error } = await supabase.from("tracking_data").insert({
      user_id: DEMO_USER_ID,
      date: today,
      battery: batteryLevel,
      feeling: todayFeeling,
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
        feeling: todayFeeling,
        sleep: sleepHours,
        pain: painScore,
        timestamp: new Date().toISOString(),
      } as any;
      setLastCheckin(recent);
      loadData();
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

    await supabase.from("tasks").insert({
      user_id: DEMO_USER_ID,
      title: newTaskTitle,
      energy_required: newTaskEnergy,
      date: newTaskDate,
      completed: false,
      eisenpowered: false,
    });

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
        user_id: DEMO_USER_ID,
        title: `${task.title} - Step 1`,
        energy_required: Math.ceil(task.energy_required / 3),
        date: task.date,
        completed: false,
        eisenpowered: false,
      },
      {
        user_id: DEMO_USER_ID,
        title: `${task.title} - Step 2`,
        energy_required: Math.ceil(task.energy_required / 3),
        date: task.date,
        completed: false,
        eisenpowered: false,
      },
      {
        user_id: DEMO_USER_ID,
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
      user_id: DEMO_USER_ID,
      role: "user",
      message: cojiMessage,
    };
    const cojiResponse = {
      user_id: DEMO_USER_ID,
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
      .insert({ user_id: DEMO_USER_ID, text: newSuperpower });

    setNewSuperpower("");
    loadData();
  };

  const addSupportNeed = async () => {
    if (!newSupportNeed.trim()) return;

    await supabase
      .from("support_needs")
      .insert({ user_id: DEMO_USER_ID, text: newSupportNeed });

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
        .eq("user_id", DEMO_USER_ID)
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
        user_id: DEMO_USER_ID,
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
        user_id: DEMO_USER_ID,
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
        .eq("user_id", DEMO_USER_ID)
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
        .eq("user_id", DEMO_USER_ID)
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
        user_id: DEMO_USER_ID,
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
      await supabase.from("finance_profile").upsert({ user_id: DEMO_USER_ID, monthly_income: val });
    } catch (e) {
      // ignore
    }
  };

  const tabs = [
    { id: "landing", icon: Home, label: "Home" },
    { id: "dashboard", icon: TrendingUp, label: "Dashboard" },
    { id: "calendar", icon: Calendar, label: "Calendar" },
    { id: "cojiBuddy", icon: Sparkles, label: "Coji Buddy" },
    { id: "library", icon: Brain, label: "Library" },
    { id: "mentalhealth", icon: Heart, label: "Mental Health" },
    { id: "finances", icon: TrendingUp, label: "Finances" },
    { id: "forum", icon: Users, label: "Forum" },
    { id: "journal", icon: Star, label: "Journal" },
    { id: "analysis", icon: BarChart, label: "Analysis" },
    { id: "health", icon: Heart, label: "Health" }, // New Health tab
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white relative overflow-hidden">
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
              {activeTab !== "landing" && (
                <>
                  {getBatteryIcon(batteryLevel)}
                  <span className="text-sm font-medium">{batteryLevel}/12</span>
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
          <div className="hidden md:block bg-slate-950 bg-opacity-50 border-b border-teal-500 border-opacity-10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-1 overflow-x-auto py-3">
                {tabs.slice(1).map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-teal-500 to-fuchsia-500 text-white shadow-lg"
                          : "text-teal-300 hover:bg-teal-500 hover:bg-opacity-10"
                      }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Hamburger Menu - Shows only Dashboard, Calendar, Coji Buddy, Library */}
          <div className="md:hidden bg-slate-950 bg-opacity-50 border-b border-teal-500 border-opacity-10">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
              <span className="text-teal-300 font-medium">
                {tabs.find(t => t.id === activeTab)?.label || "Menu"}
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-teal-300 hover:bg-teal-500 hover:bg-opacity-10 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-slate-900 bg-opacity-98 border-b border-teal-500 border-opacity-20 z-50 shadow-2xl">
                <div className="max-w-7xl mx-auto px-6 py-4 space-y-2">
                  {[
                    { id: "dashboard", icon: Battery, label: "Energy Management" },
                    { id: "cojiBuddy", icon: Sparkles, label: "Coji Buddy" },
                    { id: "library", icon: Brain, label: "Library" },
                    { id: "comingsoon", icon: Star, label: "Coming Soon", disabled: true },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          if (!tab.disabled) {
                            setActiveTab(tab.id);
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        disabled={tab.disabled}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-base ${
                          tab.disabled
                            ? "text-slate-500 cursor-not-allowed opacity-50"
                            : activeTab === tab.id
                            ? "bg-gradient-to-r from-teal-500 to-fuchsia-500 text-white shadow-lg"
                            : "text-teal-300 hover:bg-teal-500 hover:bg-opacity-10"
                        }`}
                      >
                        <Icon size={20} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </>
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
                  setShowEisenhowerMatrix(true);
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
                      user_id: DEMO_USER_ID,
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

      {showEisenhowerMatrix && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-800 rounded-xl p-6 max-w-6xl w-full border border-amber-500 border-opacity-50 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-amber-300">
                {"\u{1F50B}"} Eisenhower Matrix
              </h2>
              <button
                onClick={() => {
                  setShowEisenhowerMatrix(false);
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
                  <strong>High-energy task to organize:</strong> "{pendingTask.title}"
                </p>
                <p className="text-amber-300 text-xs mt-1">
                  Add this task to one of the quadrants below to help break it down and prioritize it.
                </p>
              </div>
            )}

            <p className="text-slate-300 mb-6 text-center">
              Organize your tasks by urgency and importance. This helps you prioritize what to do first!
            </p>

            {/* Input for new task */}
            <div className="mb-6 bg-slate-700 bg-opacity-50 p-4 rounded-xl">
              <input
                type="text"
                value={newEisenhowerTask}
                onChange={(e) => setNewEisenhowerTask(e.target.value)}
                placeholder="Type a task and click a quadrant below to add it..."
                className="w-full bg-slate-600 px-4 py-3 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newEisenhowerTask.trim()) {
                    e.preventDefault();
                  }
                }}
              />
            </div>

            {/* 4-Quadrant Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Quadrant 1: Urgent & Important */}
              <div className="bg-red-900 bg-opacity-30 border-2 border-red-500 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-red-300">
                    {"\u{1F525}"} Urgent & Important
                  </h3>
                  <button
                    onClick={() => {
                      if (newEisenhowerTask.trim()) {
                        setEisenhowerTasks(prev => ({
                          ...prev,
                          urgentImportant: [...prev.urgentImportant, newEisenhowerTask.trim()]
                        }));
                        setNewEisenhowerTask("");
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs font-bold transition-colors"
                  >
                    + Add Here
                  </button>
                </div>
                <p className="text-xs text-red-200 mb-3">Do these tasks first!</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {eisenhowerTasks.urgentImportant.map((task, idx) => (
                    <div key={idx} className="bg-slate-800 bg-opacity-50 p-3 rounded-lg flex justify-between items-start">
                      <span className="text-sm text-white flex-1">{task}</span>
                      <button
                        onClick={() => {
                          setEisenhowerTasks(prev => ({
                            ...prev,
                            urgentImportant: prev.urgentImportant.filter((_, i) => i !== idx)
                          }));
                        }}
                        className="text-red-400 hover:text-red-300 ml-2 text-lg"
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

              {/* Quadrant 2: Not Urgent & Important */}
              <div className="bg-amber-900 bg-opacity-30 border-2 border-amber-500 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-amber-300">
                    {"\u{1F4C5}"} Not Urgent & Important
                  </h3>
                  <button
                    onClick={() => {
                      if (newEisenhowerTask.trim()) {
                        setEisenhowerTasks(prev => ({
                          ...prev,
                          notUrgentImportant: [...prev.notUrgentImportant, newEisenhowerTask.trim()]
                        }));
                        setNewEisenhowerTask("");
                      }
                    }}
                    className="bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded text-xs font-bold transition-colors"
                  >
                    + Add Here
                  </button>
                </div>
                <p className="text-xs text-amber-200 mb-3">Schedule these tasks</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {eisenhowerTasks.notUrgentImportant.map((task, idx) => (
                    <div key={idx} className="bg-slate-800 bg-opacity-50 p-3 rounded-lg flex justify-between items-start">
                      <span className="text-sm text-white flex-1">{task}</span>
                      <button
                        onClick={() => {
                          setEisenhowerTasks(prev => ({
                            ...prev,
                            notUrgentImportant: prev.notUrgentImportant.filter((_, i) => i !== idx)
                          }));
                        }}
                        className="text-amber-400 hover:text-amber-300 ml-2 text-lg"
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

              {/* Quadrant 3: Urgent & Not Important */}
              <div className="bg-blue-900 bg-opacity-30 border-2 border-blue-500 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-blue-300">
                    {"\u{1F4E9}"} Urgent & Not Important
                  </h3>
                  <button
                    onClick={() => {
                      if (newEisenhowerTask.trim()) {
                        setEisenhowerTasks(prev => ({
                          ...prev,
                          urgentNotImportant: [...prev.urgentNotImportant, newEisenhowerTask.trim()]
                        }));
                        setNewEisenhowerTask("");
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs font-bold transition-colors"
                  >
                    + Add Here
                  </button>
                </div>
                <p className="text-xs text-blue-200 mb-3">Delegate if possible</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {eisenhowerTasks.urgentNotImportant.map((task, idx) => (
                    <div key={idx} className="bg-slate-800 bg-opacity-50 p-3 rounded-lg flex justify-between items-start">
                      <span className="text-sm text-white flex-1">{task}</span>
                      <button
                        onClick={() => {
                          setEisenhowerTasks(prev => ({
                            ...prev,
                            urgentNotImportant: prev.urgentNotImportant.filter((_, i) => i !== idx)
                          }));
                        }}
                        className="text-blue-400 hover:text-blue-300 ml-2 text-lg"
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

              {/* Quadrant 4: Not Urgent & Not Important */}
              <div className="bg-slate-700 bg-opacity-50 border-2 border-slate-500 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-slate-300">
                    {"\u{1F4AD}"} Not Urgent & Not Important
                  </h3>
                  <button
                    onClick={() => {
                      if (newEisenhowerTask.trim()) {
                        setEisenhowerTasks(prev => ({
                          ...prev,
                          notUrgentNotImportant: [...prev.notUrgentNotImportant, newEisenhowerTask.trim()]
                        }));
                        setNewEisenhowerTask("");
                      }
                    }}
                    className="bg-slate-500 hover:bg-slate-600 px-3 py-1 rounded text-xs font-bold transition-colors"
                  >
                    + Add Here
                  </button>
                </div>
                <p className="text-xs text-slate-400 mb-3">Consider eliminating these</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {eisenhowerTasks.notUrgentNotImportant.map((task, idx) => (
                    <div key={idx} className="bg-slate-800 bg-opacity-50 p-3 rounded-lg flex justify-between items-start">
                      <span className="text-sm text-white flex-1">{task}</span>
                      <button
                        onClick={() => {
                          setEisenhowerTasks(prev => ({
                            ...prev,
                            notUrgentNotImportant: prev.notUrgentNotImportant.filter((_, i) => i !== idx)
                          }));
                        }}
                        className="text-slate-400 hover:text-slate-300 ml-2 text-lg"
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
                  setEisenhowerTasks({
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
                  setShowEisenhowerMatrix(false);
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
                Welcome to Coji Universe
              </h1>
              <p className="text-xl text-slate-300 mb-3 max-w-2xl mx-auto">
                Your all-in-one neurodivergent life management hub {"\u{1F49C}"}
              </p>
              <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto italic">
                Helping you make sense of chaos: plan life, not burnout
              </p>

              <div className="flex gap-4 justify-center mb-12">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="relative bg-gradient-to-br from-teal-400 via-fuchsia-400 to-teal-500 hover:from-teal-500 hover:via-fuchsia-500 hover:to-teal-600 px-12 py-5 rounded-2xl font-bold text-xl text-white transition-all shadow-2xl hover:shadow-fuchsia-500/50 hover:scale-105"
                >
                  <span className="relative z-10">
                    Free for my first friends {"\u{1F496}"}{"\u{2601}\u{FE0F}"}
                  </span>
                </button>
              </div>
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
                description="Eisenhower Matrix prioritisation, energy-aware scheduling, and automatic task breakdown"
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
                description="Track income, expenses, wants vs needs, budgets, and cash flow with neurodivergent-friendly tools"
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

        {activeTab === "dashboard" && (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-teal-300">
                  Your Energy Snapshot
                </h2>
                <p className="text-slate-400">
                  You're doing great! Here's how you're tracking {"\u{1F49C}"}
                </p>
              </div>
            </div>

              <div className="mb-8 bg-slate-800 bg-opacity-50 p-8 rounded-xl border border-fuchsia-500 border-opacity-30">
                <div className="flex items-center gap-4 mb-6">
                  <img src="/coji- logo.png" alt="Coji" className="w-24 h-24 object-contain" />
                  <div>
                    <h3 className="text-2xl font-bold text-fuchsia-300">
                      How are you feeling now?
                    </h3>
                    <p className="text-sm text-slate-400">
                      Let's check in before we start
                    </p>
                  </div>
                </div>

                {lastCheckin && (
                  <div className="mb-4 p-3 bg-teal-500 bg-opacity-10 rounded-lg text-sm text-slate-300">
                    Last check-in: {new Date(lastCheckin.timestamp || "").toLocaleString()} — Battery: {lastCheckin.battery}/12 | Sleep: {lastCheckin.sleep}h | Pain: {lastCheckin.pain}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <p className="font-semibold mb-3 text-slate-300">
                      Select your feeling
                    </p>
                    <div className="flex gap-3 overflow-x-auto md:flex-wrap md:overflow-visible whitespace-nowrap md:whitespace-normal pb-2">
                      {feelings.map((feeling) => (
                        <button
                          key={feeling.value}
                          onClick={() => setTodayFeeling(feeling.value)}
                          className={`px-5 py-4 rounded-xl transition-colors ${
                            todayFeeling === feeling.value
                              ? "bg-gradient-to-r from-teal-500 to-fuchsia-500 shadow-lg scale-105"
                              : "bg-slate-700 bg-opacity-50 hover:bg-opacity-70"
                          }`}
                        >
                          <div className="text-3xl mb-1">{feeling.emoji}</div>
                          <div className="text-xs">{feeling.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold mb-2 text-slate-300">
                      Battery level {"\u{1F50B}"}
                    </p>
                    <p className="text-xs text-slate-500 mb-3">
                      How charged do you feel? (Max 12 = fully charged)
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      value={batteryLevel}
                      onChange={(e) =>
                        setBatteryLevel(parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="text-slate-500">Empty</span>
                      <div className="flex items-center gap-2">
                        {getBatteryIcon(batteryLevel)}
                        <span className="font-bold text-xl text-teal-300">
                          {batteryLevel}/12
                        </span>
                      </div>
                      <span className="text-slate-500">Full</span>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold mb-2 text-slate-300">
                      Sleep hours {"\u{1F634}"}
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      step="0.5"
                      value={sleepHours}
                      onChange={(e) =>
                        setSleepHours(parseFloat(e.target.value))
                      }
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-center mt-2">
                      <span className="font-bold text-xl text-fuchsia-300">
                        {sleepHours} hours
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold mb-2 text-slate-300">Pain score (0–10)</p>
                    <p className="text-xs text-slate-500 mb-2">Track any physical pain right now — helps spot patterns.</p>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={painScore}
                      onChange={(e) => setPainScore(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-sm text-slate-400">No pain</div>
                      <div className="font-bold text-xl text-teal-300">{painScore}</div>
                      <div className="text-sm text-slate-400">Severe</div>
                    </div>

                    <div className="mt-3 flex gap-2 flex-wrap">
                      <button onClick={() => setPainScore(0)} className="px-3 py-1 rounded bg-slate-700 bg-opacity-50 text-xs">No pain</button>
                      <button onClick={() => setPainScore(2)} className="px-3 py-1 rounded bg-slate-700 bg-opacity-50 text-xs">Mild</button>
                      <button onClick={() => setPainScore(5)} className="px-3 py-1 rounded bg-slate-700 bg-opacity-50 text-xs">Moderate</button>
                      <button onClick={() => setPainScore(8)} className="px-3 py-1 rounded bg-slate-700 bg-opacity-50 text-xs">Severe</button>
                    </div>

                    <textarea
                      placeholder="Optional: notes about location/type of pain"
                      value={painNote}
                      onChange={(e) => setPainNote(e.target.value)}
                      className="w-full mt-3 bg-slate-700 bg-opacity-50 rounded-lg px-3 py-2 text-white placeholder-slate-500 resize-none"
                    />
                  </div>

                  <button
                    onClick={saveTracking}
                    className="w-full bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg"
                  >
                    Save Check-in {"\u{1F49C}"}
                  </button>
                </div>
              </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                  <div>
                    <p className="text-slate-400 text-sm mb-4">
                      Here's an example of how your tasks will look:
                    </p>
                    <div className="space-y-3">
                      {/* Mock task 1 - Completed */}
                      <div className="flex items-center justify-between p-3 bg-slate-700 bg-opacity-30 rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center bg-teal-500 border-teal-500">
                            <CheckCircle size={16} className="text-white" />
                          </div>
                          <span className="line-through text-slate-500">
                            Morning meditation
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-teal-300">
                            2{"\u{1F50B}"}
                          </span>
                        </div>
                      </div>

                      {/* Mock task 2 - Active */}
                      <div className="flex items-center justify-between p-3 bg-slate-700 bg-opacity-30 rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center border-slate-500">
                          </div>
                          <span>
                            Reply to important emails
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-teal-300">
                            4{"\u{1F50B}"}
                          </span>
                        </div>
                      </div>

                      {/* Mock task 3 - Active */}
                      <div className="flex items-center justify-between p-3 bg-slate-700 bg-opacity-30 rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center border-slate-500">
                          </div>
                          <span>
                            Prepare presentation slides
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-teal-300">
                            6{"\u{1F50B}"}
                          </span>
                        </div>
                      </div>

                      {/* Mock task 4 - High energy (shows Eisenpower button) */}
                      <div className="flex items-center justify-between p-3 bg-slate-700 bg-opacity-30 rounded-lg border border-amber-500 border-opacity-30">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center border-slate-500">
                          </div>
                          <span>
                            Deep work: Project research
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-amber-300">
                            10{"\u{1F50B}"}
                          </span>
                          <span className="bg-amber-500 bg-opacity-20 px-2 py-1 rounded text-xs text-amber-300 border border-amber-500 border-opacity-30">
                            High energy
                          </span>
                        </div>
                      </div>

                      {/* Mock task 5 - Active */}
                      <div className="flex items-center justify-between p-3 bg-slate-700 bg-opacity-30 rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center border-slate-500">
                          </div>
                          <span>
                            Grocery shopping
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-teal-300">
                            3{"\u{1F50B}"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Summary stats */}
                    <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between text-sm">
                      <span className="text-slate-400">5 tasks today</span>
                      <span className="text-teal-300 font-semibold">Total: 25{"\u{1F50B}"}</span>
                    </div>
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

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
                <h3 className="text-xl font-bold mb-4 text-teal-300">
                  Battery Over Time
                </h3>
                {trackingData.length === 0 ? (
                  <div>
                    <p className="text-slate-400 text-sm mb-6">
                      Here's a preview of your energy patterns over the past 14 days
                    </p>
                    {/* Mock line graph */}
                    <div className="relative h-64 bg-slate-900 bg-opacity-50 rounded-lg p-4">
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-500 pr-2">
                        <span>12</span>
                        <span>9</span>
                        <span>6</span>
                        <span>3</span>
                        <span>0</span>
                      </div>

                      {/* Graph area */}
                      <div className="ml-8 h-full relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                          <div className="border-t border-slate-700 border-opacity-50"></div>
                          <div className="border-t border-slate-700 border-opacity-50"></div>
                          <div className="border-t border-slate-700 border-opacity-50"></div>
                          <div className="border-t border-slate-700 border-opacity-50"></div>
                          <div className="border-t border-slate-700 border-opacity-50"></div>
                        </div>

                        {/* Line graph with mock data */}
                        <svg className="w-full h-full" viewBox="0 0 280 200" preserveAspectRatio="none">
                          {/* Gradient fill under line */}
                          <defs>
                            <linearGradient id="batteryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="rgb(45, 212, 191)" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="rgb(45, 212, 191)" stopOpacity="0" />
                            </linearGradient>
                          </defs>

                          {/* Area under the line */}
                          <path
                            d="M 0,120 L 20,100 L 40,110 L 60,80 L 80,95 L 100,70 L 120,85 L 140,60 L 160,75 L 180,50 L 200,65 L 220,55 L 240,70 L 260,45 L 280,60 L 280,200 L 0,200 Z"
                            fill="url(#batteryGradient)"
                          />

                          {/* The line itself */}
                          <path
                            d="M 0,120 L 20,100 L 40,110 L 60,80 L 80,95 L 100,70 L 120,85 L 140,60 L 160,75 L 180,50 L 200,65 L 220,55 L 240,70 L 260,45 L 280,60"
                            fill="none"
                            stroke="rgb(45, 212, 191)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          {/* Data points */}
                          <circle cx="0" cy="120" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="20" cy="100" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="40" cy="110" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="60" cy="80" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="80" cy="95" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="100" cy="70" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="120" cy="85" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="140" cy="60" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="160" cy="75" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="180" cy="50" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="200" cy="65" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="220" cy="55" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="240" cy="70" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="260" cy="45" r="4" fill="rgb(45, 212, 191)" />
                          <circle cx="280" cy="60" r="4" fill="rgb(45, 212, 191)" />
                        </svg>
                      </div>

                      {/* X-axis labels */}
                      <div className="flex justify-between text-xs text-slate-500 mt-2 ml-8">
                        <span>14d ago</span>
                        <span>7d ago</span>
                        <span>Today</span>
                      </div>
                    </div>

                    {/* Stats summary */}
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="bg-slate-900 bg-opacity-50 p-3 rounded-lg text-center">
                        <p className="text-xs text-slate-400">Average</p>
                        <p className="text-xl font-bold text-teal-300">7.2</p>
                      </div>
                      <div className="bg-slate-900 bg-opacity-50 p-3 rounded-lg text-center">
                        <p className="text-xs text-slate-400">Highest</p>
                        <p className="text-xl font-bold text-green-300">10</p>
                      </div>
                      <div className="bg-slate-900 bg-opacity-50 p-3 rounded-lg text-center">
                        <p className="text-xs text-slate-400">Lowest</p>
                        <p className="text-xl font-bold text-amber-300">4</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {getEnergyReserveData().map((day, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <span className="text-sm text-slate-400 w-12">
                          {day.date}
                        </span>
                        <div className="flex-1 bg-slate-700 bg-opacity-50 rounded-full h-6">
                          <div
                            className="bg-gradient-to-r from-teal-400 to-fuchsia-400 h-6 rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${(day.battery / 12) * 100}%` }}
                          >
                            <span className="text-xs font-bold">
                              {day.battery}
                            </span>
                          </div>
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

            <div className="mb-8 bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
              <h3 className="text-xl font-bold mb-4 text-fuchsia-300">
                Sync Your Calendars
              </h3>
              <p className="text-slate-400 mb-4">
                Connect Google Calendar and Microsoft Outlook to see all your
                events in one place
              </p>
              <div className="flex gap-4">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
                  Connect Google Calendar
                </button>
                <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 px-6 py-3 rounded-lg font-medium transition-colors">
                  Connect Outlook
                </button>
              </div>
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

              <div className="text-center py-12 text-slate-400">
                <Calendar size={48} className="mx-auto mb-4 text-teal-400" />
                <p>
                  Your events and tasks will appear here once you connect your
                  calendars {"\u{1F4C6}"}
                </p>
              </div>
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
            <h2 className="text-3xl font-bold mb-6 text-teal-300">
              Library
            </h2>
            <p className="text-slate-400 mb-8">
              Resources and strategies for neurodivergent life {"\u{1F4DA}"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F3AF}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  ADHD Support
                </h3>
                <p className="text-sm text-slate-400">
                  Body doubling, time blocking, dopamine menus
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F308}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Autism Support
                </h3>
                <p className="text-sm text-slate-400">
                  Sensory tools, social scripts, stim acceptance
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F630}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  Anxiety Tools
                </h3>
                <p className="text-sm text-slate-400">
                  Grounding, breathing, worry management
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F46A}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Parenting Hub
                </h3>
                <p className="text-sm text-slate-400">
                  EHCP, SEND law, therapeutic parenting, managing behaviours
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F4BC}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  ND & Work
                </h3>
                <p className="text-sm text-slate-400">
                  Benefits, workplace rights, interviews
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F499}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Depression Support
                </h3>
                <p className="text-sm text-slate-400">
                  No zero days, minimum baseline
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F491}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  Relationships
                </h3>
                <p className="text-sm text-slate-400">
                  Communication, boundaries, ND relationships
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F4D6}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Dyslexia & Dyscalculia
                </h3>
                <p className="text-sm text-slate-400">
                  Reading tools, math support, assistive tech
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F48A}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  Chronic Illness Resources
                </h3>
                <p className="text-sm text-slate-400">
                  Benefits, workplace rights, exercise, physiotherapy
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{23F0}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Time Management
                </h3>
                <p className="text-sm text-slate-400">
                  Scheduling, prioritization, time blocking tools
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F9E0}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  Memory Tools
                </h3>
                <p className="text-sm text-slate-400">
                  Working memory strategies, reminders, recall aids
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F3C3}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Dyspraxia
                </h3>
                <p className="text-sm text-slate-400">
                  Motor skills, coordination, movement support
                </p>
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
                  Visualize family relationships and connections
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
            <p className="text-slate-400 mb-6">Track budgets, use the 50/30/20 rule, and organise wants vs needs with a simple whiteboard.</p>

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
                    EHCP and school strategies
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
                Save important notes, EHCP reviews, appointments {"\u{1F4CC}"}
              </p>

              <div className="mb-8 bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
                <h4 className="font-bold mb-4 text-fuchsia-300">
                  Create New Clip
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Title (e.g., EHCP Annual Review Notes)"
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
            <h2 className="text-3xl font-bold mb-6 text-teal-300">Analysis</h2>
            <p className="text-slate-400 mb-8">Quick insights about when you have the most energy, sleep patterns, pain peaks, and happiest times of day.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
                <h3 className="text-lg font-bold text-teal-300 mb-3">Energy by Time of Day</h3>
                <EnergyByHourChart data={averageByHour("battery")} />
                {/* Mock Data Summary */}
                <div className="mt-4 p-3 bg-slate-700 bg-opacity-30 rounded-lg">
                  <div className="text-xs text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Peak Energy:</span>
                      <span className="text-teal-300 font-semibold">10:00 AM (85%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lowest Energy:</span>
                      <span className="text-amber-300 font-semibold">3:00 PM (35%)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
                <h3 className="text-lg font-bold text-fuchsia-300 mb-3">Sleep Patterns (Last 14 Days)</h3>
                <SleepSparkline series={recentSleepSeries(14)} />
                {/* Mock Data Summary */}
                <div className="mt-4 p-3 bg-slate-700 bg-opacity-30 rounded-lg">
                  <div className="text-xs text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Average Sleep:</span>
                      <span className="text-fuchsia-300 font-semibold">6.8 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Bedtime:</span>
                      <span className="text-fuchsia-300 font-semibold">11:45 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
                <h3 className="text-lg font-bold text-teal-300 mb-3">Pain Score by Time of Day</h3>
                <EnergyByHourChart data={averageByHour("pain")} colorStart="#F472B6" colorEnd="#EF4444" />
                {/* Mock Data Summary */}
                <div className="mt-4 p-3 bg-slate-700 bg-opacity-30 rounded-lg">
                  <div className="text-xs text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Highest Pain:</span>
                      <span className="text-red-400 font-semibold">Evening (7/10)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lowest Pain:</span>
                      <span className="text-teal-300 font-semibold">Morning (3/10)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
                <h3 className="text-lg font-bold text-fuchsia-300 mb-3">Happiest Time of Day</h3>
                <BarChartCounts counts={happiestByHour()} />
                {/* Mock Data Summary */}
                <div className="mt-4 p-3 bg-slate-700 bg-opacity-30 rounded-lg">
                  <div className="text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>Most positive mood:</span>
                      <span className="text-fuchsia-300 font-semibold">9:00 AM - 11:00 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* New Analysis Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Lowest Mood Times */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-amber-500 border-opacity-20">
                <h3 className="text-lg font-bold text-amber-300 mb-3">Lowest Mood Times</h3>
                <div className="space-y-3">
                  {[
                    { time: '2:00 PM - 4:00 PM', mood: 'Low', percentage: 45, color: 'bg-red-500' },
                    { time: '8:00 PM - 10:00 PM', mood: 'Okay', percentage: 35, color: 'bg-amber-500' },
                    { time: '6:00 AM - 8:00 AM', mood: 'Low', percentage: 30, color: 'bg-red-400' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{item.time}</span>
                        <span className="text-amber-300">{item.mood} mood {item.percentage}% of time</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-slate-700 bg-opacity-30 rounded-lg text-xs text-slate-300">
                  💡 Tip: Consider scheduling important tasks outside these times
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

            {/* Additional Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Most Productive Hours */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
                <h3 className="text-lg font-bold text-fuchsia-300 mb-3">Most Productive Hours</h3>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i;
                    const isProductive = hour >= 9 && hour <= 11;
                    const isMedium = (hour >= 14 && hour <= 16) || (hour >= 19 && hour <= 21);
                    return (
                      <div
                        key={i}
                        className={`h-12 rounded flex flex-col items-center justify-center text-xs ${
                          isProductive ? 'bg-teal-500' :
                          isMedium ? 'bg-amber-500 bg-opacity-40' :
                          'bg-slate-600 bg-opacity-20'
                        }`}
                      >
                        <span className="text-[10px]">{hour}:00</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-teal-500 rounded"></div>
                    <span>High</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-amber-500 bg-opacity-40 rounded"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-slate-600 bg-opacity-20 rounded"></div>
                    <span>Low</span>
                  </div>
                </div>
              </div>

              {/* Weekly Summary Stats */}
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
                <h3 className="text-lg font-bold text-teal-300 mb-3">Weekly Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-teal-300">68%</div>
                    <div className="text-xs text-slate-400">Average Mood</div>
                  </div>
                  <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-fuchsia-300">42</div>
                    <div className="text-xs text-slate-400">Tasks Completed</div>
                  </div>
                  <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-amber-300">6.8h</div>
                    <div className="text-xs text-slate-400">Avg Sleep</div>
                  </div>
                  <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-teal-300">5/7</div>
                    <div className="text-xs text-slate-400">Exercise Days</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-slate-700 bg-opacity-30 rounded-lg">
                  <div className="text-xs text-slate-300 mb-2 font-semibold">Trends this week:</div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <div>↗️ Mood improving (+12%)</div>
                    <div>↘️ Sleep slightly down (-0.3h)</div>
                    <div>→ Energy levels stable</div>
                  </div>
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
            <div className="text-sm text-slate-400">
              © {new Date().getFullYear()} Coji Universe. All rights reserved.
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
