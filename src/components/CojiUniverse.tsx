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
} from "lucide-react";
import { supabase, DEMO_USER_ID } from "@/lib/supabase";

interface TrackingData {
  id?: string;
  date: string;
  battery: number;
  feeling: string;
  sleep: number;
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

const CojiUniverse = () => {
  const [activeTab, setActiveTab] = useState("landing");
  const [batteryLevel, setBatteryLevel] = useState(10);
  const [todayFeeling, setTodayFeeling] = useState("");
  const [sleepHours, setSleepHours] = useState(7);
  const [trackingData, setTrackingData] = useState<TrackingData[]>([]);
  const [hasTrackedToday, setHasTrackedToday] = useState(false);
  const [cojiMessage, setCojiMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [superpowers, setSuperpowers] = useState<Superpower[]>([]);
  const [newSuperpower, setNewSuperpower] = useState("");
  const [supportNeeds, setSupportNeeds] = useState<SupportNeed[]>([]);
  const [newSupportNeed, setNewSupportNeed] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskEnergy, setNewTaskEnergy] = useState(3);
  const [newTaskDate, setNewTaskDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [showEisenpowerPrompt, setShowEisenpowerPrompt] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const feelings = [
    { emoji: "\u{1F60A}", label: "Great", value: "great" },
    { emoji: "\u{1F642}", label: "Good", value: "good" },
    { emoji: "\u{1F610}", label: "Okay", value: "okay" },
    { emoji: "\u{1F614}", label: "Low", value: "struggling" },
    { emoji: "\u{1F62B}", label: "Hard", value: "difficult" },
  ];

  const getBatteryIcon = (level: number) => {
    if (level >= 8) return <Battery className="text-teal-400" size={24} />;
    if (level >= 4)
      return <BatteryMedium className="text-amber-400" size={24} />;
    return <BatteryLow className="text-red-400" size={24} />;
  };

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

      const today = new Date().toISOString().split("T")[0];
      const { data: todayTracking } = await supabase
        .from("tracking_data")
        .select("*")
        .eq("user_id", DEMO_USER_ID)
        .eq("date", today)
        .single();

      if (todayTracking) {
        setBatteryLevel(todayTracking.battery);
        setHasTrackedToday(true);
      }
    } catch (error) {
      console.log("Loading data:", error);
    }
  };

  const saveTracking = async () => {
    if (!todayFeeling) {
      alert("Please select how you're feeling today! \u{1F60A}");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    const { error } = await supabase.from("tracking_data").upsert({
      user_id: DEMO_USER_ID,
      date: today,
      battery: batteryLevel,
      feeling: todayFeeling,
      sleep: sleepHours,
      timestamp: new Date().toISOString(),
    });

    if (!error) {
      setHasTrackedToday(true);
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
      setShowEisenpowerPrompt(true);
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

  const todaysTasks = tasks.filter(
    (t) => t.date === new Date().toISOString().split("T")[0] && !t.eisenpowered,
  );
  const totalEnergyRequired = todaysTasks.reduce(
    (sum, task) => sum + task.energy_required,
    0,
  );
  const remainingBattery = batteryLevel - totalEnergyRequired;

  const tabs = [
    { id: "landing", icon: Home, label: "Home" },
    { id: "dashboard", icon: TrendingUp, label: "Dashboard" },
    { id: "calendar", icon: Calendar, label: "Calendar" },
    { id: "cojiBuddy", icon: Sparkles, label: "Coji Buddy" },
    { id: "library", icon: Brain, label: "ND Library" },
    { id: "mentalhealth", icon: Heart, label: "Mental Health" },
    { id: "forum", icon: Users, label: "Forum" },
    { id: "clipboard", icon: Clipboard, label: "Clipboard" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white">
      <div className="bg-slate-950 bg-opacity-80 backdrop-blur-md border-b border-teal-500 border-opacity-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{"\u{2601}\u{FE0F}"}</div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-fuchsia-400">
                Coji Universe
              </h1>
            </div>
            {activeTab !== "landing" && (
              <div className="flex items-center gap-4">
                {getBatteryIcon(batteryLevel)}
                <span className="text-sm font-medium">{batteryLevel}/12</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {activeTab !== "landing" && (
        <div className="bg-slate-950 bg-opacity-50 border-b border-teal-500 border-opacity-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-1 overflow-x-auto py-3">
              {tabs.slice(1).map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm whitespace-nowrap ${
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
                <p className="text-sm text-slate-300">
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
                  className="flex-1 bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-3 rounded-lg font-bold transition-all"
                >
                  Add Task
                </button>
                <button
                  onClick={() => {
                    setShowTaskModal(false);
                    setNewTaskTitle("");
                  }}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEisenpowerPrompt && tasks.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full border border-amber-500 border-opacity-50">
            <div className="text-center mb-6">
              <Zap className="mx-auto mb-4 text-amber-400" size={48} />
              <h3 className="text-2xl font-bold mb-2 text-amber-300">
                Battery Low! {"\u{26A0}\u{FE0F}"}
              </h3>
              <p className="text-slate-300">
                This task needs more energy than you have. Let's break it down!
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => eisenpowerTask(tasks[tasks.length - 1].id)}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-6 py-4 rounded-lg font-bold transition-all"
              >
                {"\u{1F50B}"} Use Eisenpower (Break into 3 steps)
              </button>
              <button
                onClick={() => {
                  setShowEisenpowerPrompt(false);
                  setActiveTab("cojiBuddy");
                }}
                className="w-full bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-4 rounded-lg font-bold transition-all"
              >
                {"\u{2601}\u{FE0F}"} Ask Coji Buddy for Help
              </button>
              <button
                onClick={() => setShowEisenpowerPrompt(false)}
                className="w-full bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium transition-all"
              >
                Keep Task As Is
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "landing" && (
          <div>
            <div className="text-center mb-16">
              <div className="text-7xl mb-6">{"\u{2601}\u{FE0F}"}</div>
              <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-fuchsia-400 to-teal-300">
                Welcome to Coji Universe
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Your all-in-one neurodivergent life management hub {"\u{1F49C}"}
              </p>

              <div className="flex gap-4 justify-center mb-8">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
                >
                  Get Started
                </button>
              </div>

              <div className="inline-block bg-teal-500 bg-opacity-10 border border-teal-400 border-opacity-40 px-8 py-4 rounded-xl">
                <p className="text-2xl font-bold text-teal-300">
                  {"\u{00A3}"}3/month annually or {"\u{00A3}"}4.99/month
                </p>
                <p className="text-sm text-slate-400">14-day free trial</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-slate-800 bg-opacity-50 p-8 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-all">
                <div className="text-4xl mb-4">{"\u{1F50B}"}</div>
                <h3 className="text-xl font-bold mb-3 text-teal-300">
                  Battery Tracking
                </h3>
                <p className="text-sm text-slate-400">
                  Track your energy like a battery. See patterns and earn badges{" "}
                  {"\u{1F3C6}"}
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-8 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-all">
                <div className="text-4xl mb-4">{"\u{2601}\u{FE0F}"}</div>
                <h3 className="text-xl font-bold mb-3 text-fuchsia-300">
                  Coji Buddy
                </h3>
                <p className="text-sm text-slate-400">
                  Your AI companion for support and breaking down tasks{" "}
                  {"\u{1F4AC}"}
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-8 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-all">
                <div className="text-4xl mb-4">{"\u{1F4C5}"}</div>
                <h3 className="text-xl font-bold mb-3 text-teal-300">
                  Smart Calendar
                </h3>
                <p className="text-sm text-slate-400">
                  Sync with Google & Outlook, manage tasks with battery logic{" "}
                  {"\u{1F4C6}"}
                </p>
              </div>
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
              <button
                onClick={() => setShowTaskModal(true)}
                className="bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-3 rounded-lg font-bold transition-all shadow-lg flex items-center gap-2"
              >
                <Plus size={20} />
                Add Task
              </button>
            </div>

            {!hasTrackedToday && (
              <div className="mb-8 bg-slate-800 bg-opacity-50 p-8 rounded-xl border border-fuchsia-500 border-opacity-30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">{"\u{2601}\u{FE0F}"}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-fuchsia-300">
                      How are you feeling today?
                    </h3>
                    <p className="text-sm text-slate-400">
                      Let's check in before we start
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="font-semibold mb-3 text-slate-300">
                      Select your feeling
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      {feelings.map((feeling) => (
                        <button
                          key={feeling.value}
                          onClick={() => setTodayFeeling(feeling.value)}
                          className={`px-5 py-4 rounded-xl transition-all ${
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
                      Battery level today {"\u{1F50B}"}
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

                  <button
                    onClick={saveTracking}
                    className="w-full bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-4 rounded-xl font-bold transition-all shadow-lg"
                  >
                    Save Check-in {"\u{1F49C}"}
                  </button>
                </div>
              </div>
            )}

            {hasTrackedToday && (
              <div className="mb-8 bg-teal-500 bg-opacity-10 p-6 rounded-xl border border-teal-400 border-opacity-30">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-teal-400" size={28} />
                  <div>
                    <h3 className="text-lg font-bold text-teal-300">
                      You've tracked today!
                    </h3>
                    <p className="text-sm text-slate-400">
                      Battery: {batteryLevel}/12 | Tasks planned:{" "}
                      {todaysTasks.length} | Energy remaining:{" "}
                      {remainingBattery}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
                <h3 className="text-xl font-bold mb-4 text-teal-300">
                  Today's Tasks
                </h3>
                {todaysTasks.length === 0 ? (
                  <p className="text-slate-400 text-sm">
                    No tasks yet. Click "Add Task" to get started! {"\u{1F680}"}
                  </p>
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
                                className="bg-amber-500 hover:bg-amber-600 px-2 py-1 rounded text-xs transition-all"
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
                  <p className="text-slate-400 text-sm">
                    Start tracking to see patterns {"\u{1F31F}"}
                  </p>
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

            <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
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
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 rounded-lg font-medium transition-all">
                  Connect Google Calendar
                </button>
                <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 px-6 py-3 rounded-lg font-medium transition-all">
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
                <div className="text-6xl">{"\u{2601}\u{FE0F}"}</div>
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
                  <div className="text-7xl mb-4">{"\u{2601}\u{FE0F}"}</div>
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
                        {chat.role === "user"
                          ? `${"\u{1F64B}"} You`
                          : `${"\u{2601}\u{FE0F}"} Coji`}
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
                className="bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-3 rounded-xl font-medium transition-all shadow-lg flex items-center gap-2"
              >
                <MessageCircle size={20} />
                Send
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Voice notes coming soon! {"\u{1F3A4}"}
            </p>
          </div>
        )}

        {activeTab === "library" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-teal-300">
              ND Library
            </h2>
            <p className="text-slate-400 mb-8">
              Resources and strategies for neurodivergent life {"\u{1F4DA}"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F3AF}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  ADHD Support
                </h3>
                <p className="text-sm text-slate-400">
                  Body doubling, time blocking, dopamine menus
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F308}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Autism Support
                </h3>
                <p className="text-sm text-slate-400">
                  Sensory tools, social scripts, stim acceptance
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F630}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  Anxiety Tools
                </h3>
                <p className="text-sm text-slate-400">
                  Grounding, breathing, worry management
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F46A}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Parenting Hub
                </h3>
                <p className="text-sm text-slate-400">
                  EHCP, SEND law, advocacy, local offer
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F4BC}"}</div>
                <h3 className="text-lg font-bold mb-2 text-teal-300">
                  ND & Work
                </h3>
                <p className="text-sm text-slate-400">
                  Benefits, workplace rights, interviews
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20 hover:border-opacity-40 transition-all cursor-pointer">
                <div className="text-4xl mb-3">{"\u{1F499}"}</div>
                <h3 className="text-lg font-bold mb-2 text-fuchsia-300">
                  Depression Support
                </h3>
                <p className="text-sm text-slate-400">
                  No zero days, minimum baseline
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
                <h3 className="text-xl font-bold mb-4 text-fuchsia-300">
                  {"\u{1F4F9}"} Helpful Videos
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-700 bg-opacity-30 p-3 rounded-lg hover:bg-opacity-50 transition-all cursor-pointer">
                    <p className="font-semibold text-sm">
                      Understanding Attachment Styles {"\u{1F495}"}
                    </p>
                    <p className="text-xs text-slate-400">
                      How relationships shape patterns (12 min)
                    </p>
                  </div>
                  <div className="bg-slate-700 bg-opacity-30 p-3 rounded-lg hover:bg-opacity-50 transition-all cursor-pointer">
                    <p className="font-semibold text-sm">
                      Emotional Regulation {"\u{1F9D8}"}
                    </p>
                    <p className="text-xs text-slate-400">
                      Self-soothing techniques (15 min)
                    </p>
                  </div>
                  <div className="bg-slate-700 bg-opacity-30 p-3 rounded-lg hover:bg-opacity-50 transition-all cursor-pointer">
                    <p className="font-semibold text-sm">
                      Should I Get Diagnosed? {"\u{1F914}"}
                    </p>
                    <p className="text-xs text-slate-400">
                      Pros and cons (20 min)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20">
                <h3 className="text-xl font-bold mb-4 text-teal-300">
                  {"\u{1F9E0}"} Types of Therapy
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-700 bg-opacity-30 p-3 rounded-lg">
                    <p className="font-semibold text-sm">CBT {"\u{1F4AD}"}</p>
                    <p className="text-xs text-slate-400">
                      Changing thought patterns
                    </p>
                  </div>
                  <div className="bg-slate-700 bg-opacity-30 p-3 rounded-lg">
                    <p className="font-semibold text-sm">DBT {"\u{1F31F}"}</p>
                    <p className="text-xs text-slate-400">
                      Emotional regulation skills
                    </p>
                  </div>
                  <div className="bg-slate-700 bg-opacity-30 p-3 rounded-lg">
                    <p className="font-semibold text-sm">
                      EMDR {"\u{1F441}\u{FE0F}"}
                    </p>
                    <p className="text-xs text-slate-400">
                      Trauma processing therapy
                    </p>
                  </div>
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
                <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg text-sm transition-all">
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
                <button className="bg-fuchsia-500 hover:bg-fuchsia-600 px-4 py-2 rounded-lg text-sm transition-all">
                  Submit Ideas
                </button>
              </div>
            </div>

            <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20 mb-6">
              <h3 className="text-xl font-bold mb-4 text-teal-300">
                Forum Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-teal-500 border-opacity-10 hover:border-opacity-30 transition-all cursor-pointer">
                  <p className="font-semibold mb-1 text-teal-300">
                    {"\u{1F46A}"} Parenting
                  </p>
                  <p className="text-xs text-slate-400">
                    EHCP and school strategies
                  </p>
                </div>
                <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-fuchsia-500 border-opacity-10 hover:border-opacity-30 transition-all cursor-pointer">
                  <p className="font-semibold mb-1 text-fuchsia-300">
                    {"\u{1F4BC}"} Work & Career
                  </p>
                  <p className="text-xs text-slate-400">
                    Accommodations and job hunting
                  </p>
                </div>
                <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-teal-500 border-opacity-10 hover:border-opacity-30 transition-all cursor-pointer">
                  <p className="font-semibold mb-1 text-teal-300">
                    {"\u{1F9E0}"} Coping Strategies
                  </p>
                  <p className="text-xs text-slate-400">
                    Share what works for you
                  </p>
                </div>
                <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-fuchsia-500 border-opacity-10 hover:border-opacity-30 transition-all cursor-pointer">
                  <p className="font-semibold mb-1 text-fuchsia-300">
                    {"\u{1F496}"} Self-Care
                  </p>
                  <p className="text-xs text-slate-400">
                    Mental health and wellbeing
                  </p>
                </div>
                <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-teal-500 border-opacity-10 hover:border-opacity-30 transition-all cursor-pointer">
                  <p className="font-semibold mb-1 text-teal-300">
                    {"\u{1F3A8}"} Creative Corner
                  </p>
                  <p className="text-xs text-slate-400">
                    Share your creative projects
                  </p>
                </div>
                <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-fuchsia-500 border-opacity-10 hover:border-opacity-30 transition-all cursor-pointer">
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
                <button className="bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-8 py-3 rounded-xl font-bold transition-all">
                  Share Your Creative Work
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "clipboard" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-teal-300">Clipboard</h2>
            <p className="text-slate-400 mb-8">
              Save important notes, EHCP reviews, appointments {"\u{1F4CC}"}
            </p>

            <div className="mb-8 bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20">
              <h3 className="font-bold mb-4 text-fuchsia-300">
                Create New Clip
              </h3>
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
                <button className="bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2">
                  <Plus size={18} />
                  Save Clip
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-teal-300">
                Your Clips
              </h3>
              <p className="text-slate-400 text-sm">
                No clips yet. Start saving important info! {"\u{1F49C}"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CojiUniverse;
