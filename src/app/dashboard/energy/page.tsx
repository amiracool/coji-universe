"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Battery, Heart, Sparkles, Save, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { CollapsibleCard } from "@/components/dashboard/CollapsibleCard";
import { Starfield } from "@/components/Starfield";
import { shouldReduceEffects } from "@/utils/performance";
import type { MOOD_OPTIONS } from "@/types/dashboard";

const MOOD_OPTIONS = [
  { emoji: "😊", label: "Great", value: "great", color: "#10b981" },
  { emoji: "🙂", label: "Good", value: "good", color: "#14b8a6" },
  { emoji: "😐", label: "Okay", value: "okay", color: "#f59e0b" },
  { emoji: "😔", label: "Low", value: "low", color: "#f97316" },
  { emoji: "😰", label: "Struggling", value: "struggling", color: "#ef4444" },
];

export default function EnergyAndMood() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Form state
  const [batteryLevel, setBatteryLevel] = useState(50);
  const [spoons, setSpoons] = useState(12);
  const [totalSpoons, setTotalSpoons] = useState(12);
  const [mood, setMood] = useState("");
  const [sleepHours, setSleepHours] = useState(7);
  const [painScore, setPainScore] = useState(0);
  const [painNote, setPainNote] = useState("");

  const reduceEffects = shouldReduceEffects();

  // Load user and today's data
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();

        if (!mounted) return;

        if (!currentUser) {
          router.push("/");
          return;
        }

        setUser(currentUser);

        // Load today's tracking data if it exists
        const today = new Date().toISOString().split("T")[0];
        const { data: trackingData } = await supabase
          .from("tracking")
          .select("*")
          .eq("user_id", currentUser.id)
          .eq("date", today)
          .single();

        if (mounted && trackingData) {
          setBatteryLevel(trackingData.battery || 50);
          setMood(trackingData.feeling || "");
          setSleepHours(trackingData.sleep || 7);
          setPainScore(trackingData.pain || 0);
          setPainNote(trackingData.pain_note || "");
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setSaveMessage("");

    try {
      const today = new Date().toISOString().split("T")[0];

      const { error } = await supabase.from("tracking").upsert(
        {
          user_id: user.id,
          date: today,
          battery: batteryLevel,
          feeling: mood,
          sleep: sleepHours,
          pain: painScore,
          pain_note: painNote,
          timestamp: new Date().toISOString(),
        },
        {
          onConflict: "user_id,date",
        }
      );

      if (error) throw error;

      setSaveMessage("Saved successfully! 💜");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Error saving:", error);
      setSaveMessage("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const getBatteryColor = () => {
    if (batteryLevel >= 70) return "bg-green-500";
    if (batteryLevel >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  const getSpoonsColor = () => {
    const percentage = (spoons / totalSpoons) * 100;
    if (percentage >= 70) return "text-green-400";
    if (percentage >= 40) return "text-amber-400";
    return "text-red-400";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <Starfield intensity="light" disableOnMobile />
        <DashboardNav />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded w-48 mb-4"></div>
            <div className="h-32 bg-slate-700 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative">
      <Starfield intensity="light" disableOnMobile />

      <DashboardNav />

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Energy & Mood Tracking</h1>
        <p className="text-slate-400 mb-8">
          Track your energy, spoons, and wellbeing for today
        </p>

        {/* Save button at top for mobile convenience */}
        <div className="mb-6 sticky top-20 z-40 bg-slate-900 bg-opacity-95 backdrop-blur-sm p-4 -mx-4 px-8 rounded-lg border border-slate-700">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`
              w-full md:w-auto flex items-center justify-center gap-2
              bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600
              px-6 py-3 rounded-xl font-semibold transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              ${reduceEffects ? "" : "hover:scale-105 hover:shadow-lg"}
            `}
          >
            <Save size={20} />
            {isSaving ? "Saving..." : "Save Progress"}
          </button>
          {saveMessage && (
            <p className="text-center md:text-left text-sm text-teal-300 mt-2">{saveMessage}</p>
          )}
        </div>

        <div className="space-y-6">
          {/* Battery Level */}
          <CollapsibleCard
            title="Battery Level"
            subtitle={`Currently at ${batteryLevel}%`}
            icon={Battery}
            iconColor="text-teal-400"
            borderColor="border-teal-500"
            defaultExpanded={true}
            preview={
              <div className="space-y-2">
                <div className="w-full bg-slate-700 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${getBatteryColor()}`}
                    style={{ width: `${batteryLevel}%` }}
                  />
                </div>
              </div>
            }
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  How much energy do you have today? ({batteryLevel}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={batteryLevel}
                  onChange={(e) => setBatteryLevel(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Empty</span>
                  <span>Full</span>
                </div>
              </div>

              <div className="bg-slate-900 bg-opacity-50 p-4 rounded-lg border border-teal-500 border-opacity-20">
                <p className="text-sm text-slate-300 mb-2">
                  <strong>What this means:</strong>
                </p>
                <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                  {batteryLevel >= 70 && (
                    <>
                      <li>Good time for challenging or important tasks</li>
                      <li>You can handle social interactions</li>
                      <li>Consider planning ahead for lower-energy days</li>
                    </>
                  )}
                  {batteryLevel >= 40 && batteryLevel < 70 && (
                    <>
                      <li>Moderate tasks are manageable</li>
                      <li>Take regular breaks</li>
                      <li>Avoid over-committing</li>
                    </>
                  )}
                  {batteryLevel < 40 && (
                    <>
                      <li>Focus on essential tasks only</li>
                      <li>Prioritise rest and recovery</li>
                      <li>It's okay to say no or reschedule</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </CollapsibleCard>

          {/* Spoons / Capacity */}
          <CollapsibleCard
            title="Spoons for Today"
            subtitle={`${spoons} out of ${totalSpoons} spoons available`}
            icon={Sparkles}
            iconColor="text-fuchsia-400"
            borderColor="border-fuchsia-500"
            preview={
              <p className={`text-2xl font-bold ${getSpoonsColor()}`}>
                {spoons} / {totalSpoons} spoons
              </p>
            }
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Total spoons today: {totalSpoons}
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={totalSpoons}
                  onChange={(e) => {
                    const newTotal = parseInt(e.target.value);
                    setTotalSpoons(newTotal);
                    if (spoons > newTotal) setSpoons(newTotal);
                  }}
                  className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Spoons remaining: {spoons}
                </label>
                <input
                  type="range"
                  min="0"
                  max={totalSpoons}
                  value={spoons}
                  onChange={(e) => setSpoons(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                />
              </div>

              <div className="bg-slate-900 bg-opacity-50 p-4 rounded-lg border border-fuchsia-500 border-opacity-20">
                <p className="text-sm text-slate-300 mb-2">
                  <strong>About spoon theory:</strong>
                </p>
                <p className="text-sm text-slate-400">
                  Each "spoon" represents a unit of energy needed for tasks. Start your day with
                  a set number and track how many you use. This helps visualise capacity and plan
                  your day realistically.
                </p>
              </div>
            </div>
          </CollapsibleCard>

          {/* Mood Selector */}
          <CollapsibleCard
            title="How are you feeling?"
            subtitle={mood ? `Currently: ${MOOD_OPTIONS.find(m => m.value === mood)?.label}` : "Not set yet"}
            icon={Heart}
            iconColor="text-pink-400"
            borderColor="border-pink-500"
            preview={
              mood ? (
                <div className="flex items-center gap-2">
                  <span className="text-3xl">
                    {MOOD_OPTIONS.find((m) => m.value === mood)?.emoji}
                  </span>
                  <span className="text-lg font-medium">
                    {MOOD_OPTIONS.find((m) => m.value === mood)?.label}
                  </span>
                </div>
              ) : (
                <p className="text-slate-400">Tap to select your mood</p>
              )
            }
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {MOOD_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setMood(option.value)}
                    className={`
                      p-4 rounded-xl border-2 transition-all
                      ${mood === option.value
                        ? "border-pink-500 bg-pink-500 bg-opacity-20"
                        : "border-slate-700 hover:border-pink-500 hover:border-opacity-50"
                      }
                      ${reduceEffects ? "" : "hover:scale-105"}
                    `}
                  >
                    <div className="text-4xl mb-2">{option.emoji}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Sleep last night: {sleepHours} hours
                </label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                  className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>
            </div>
          </CollapsibleCard>

          {/* Pain / Chronic Illness (Optional) */}
          <CollapsibleCard
            title="Pain or Discomfort (Optional)"
            subtitle={painScore > 0 ? `Pain level: ${painScore}/10` : "No pain recorded"}
            icon={AlertCircle}
            iconColor="text-amber-400"
            borderColor="border-amber-500"
            preview={
              painScore > 0 ? (
                <div className="flex items-center gap-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-amber-500"
                      style={{ width: `${(painScore / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-amber-400 font-bold">{painScore}/10</span>
                </div>
              ) : (
                <p className="text-slate-400">No pain tracked today</p>
              )
            }
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Pain level: {painScore}/10
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={painScore}
                  onChange={(e) => setPainScore(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>No pain</span>
                  <span>Severe</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={painNote}
                  onChange={(e) => setPainNote(e.target.value)}
                  placeholder="Where is the pain? What helps? Any patterns?"
                  className="w-full bg-slate-700 bg-opacity-50 rounded-lg px-4 py-3 text-white placeholder-slate-500 border border-slate-600 focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                />
              </div>
            </div>
          </CollapsibleCard>
        </div>

        {/* Save button at bottom too */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`
              w-full md:w-auto flex items-center justify-center gap-2 mx-auto
              bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600
              px-8 py-4 rounded-xl font-semibold text-lg transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              ${reduceEffects ? "" : "hover:scale-105 hover:shadow-lg"}
            `}
          >
            <Save size={24} />
            {isSaving ? "Saving..." : "Save All Changes"}
          </button>
          {saveMessage && (
            <p className="text-sm text-teal-300 mt-3">{saveMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
