"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Battery, BatteryMedium, BatteryLow, Calendar, Zap, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { Starfield } from "@/components/Starfield";
import { shouldReduceEffects } from "@/utils/performance";
import type { UserProfile, TrackingData } from "@/types/dashboard";

// Lightweight skeleton for loading state
function QuickSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-slate-700 rounded w-48 mb-4"></div>
      <div className="h-16 bg-slate-700 rounded w-full"></div>
    </div>
  );
}

export default function DashboardToday() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [todayBattery, setTodayBattery] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const reduceEffects = shouldReduceEffects();

  // Fast initial load - only fetch critical data
  useEffect(() => {
    let mounted = true;

    async function loadMinimalData() {
      try {
        // Check auth first
        const { data: { user: currentUser } } = await supabase.auth.getUser();

        if (!mounted) return;

        if (!currentUser) {
          router.push("/");
          return;
        }

        setUser(currentUser);

        // Fetch profile and today's battery in parallel
        const [profileRes, batteryRes] = await Promise.all([
          supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", currentUser.id)
            .single(),
          supabase
            .from("tracking")
            .select("battery")
            .eq("user_id", currentUser.id)
            .eq("date", new Date().toISOString().split("T")[0])
            .order("timestamp", { ascending: false })
            .limit(1)
            .single()
        ]);

        if (!mounted) return;

        if (profileRes.data) {
          setUserProfile(profileRes.data);
        }

        if (batteryRes.data) {
          setTodayBattery(batteryRes.data.battery);
        }
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadMinimalData();

    return () => {
      mounted = false;
    };
  }, [router]);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Get battery icon
  const getBatteryIcon = () => {
    if (todayBattery === null) return Battery;
    if (todayBattery >= 60) return Battery;
    if (todayBattery >= 30) return BatteryMedium;
    return BatteryLow;
  };

  // Get battery color
  const getBatteryColor = () => {
    if (todayBattery === null) return "text-slate-400";
    if (todayBattery >= 60) return "text-green-400";
    if (todayBattery >= 30) return "text-amber-400";
    return "text-red-400";
  };

  const BatteryIcon = getBatteryIcon();
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <Starfield intensity="light" disableOnMobile />
        <DashboardNav />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <QuickSkeleton />
        </div>
      </div>
    );
  }

  const preferredName = userProfile?.preferred_name || user?.email?.split("@")[0] || "friend";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative">
      <Starfield intensity="light" disableOnMobile />

      <DashboardNav />

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Greeting Section */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {getGreeting()}, {preferredName} 💜
          </h1>
          <p className="text-slate-400 text-lg flex items-center justify-center md:justify-start gap-2">
            <Calendar size={18} />
            {today}
          </p>
        </div>

        {/* Battery Level Card */}
        <div
          className={`
            bg-slate-800 bg-opacity-50 p-6 md:p-8 rounded-2xl border border-teal-500 border-opacity-20
            mb-6 transition-all
            ${reduceEffects ? "" : "hover:border-opacity-40 hover:shadow-lg hover:shadow-teal-500/10"}
          `}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-teal-300 flex items-center gap-3">
              <BatteryIcon size={28} className={getBatteryColor()} />
              Energy Level
            </h2>
          </div>

          {todayBattery !== null ? (
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-4 text-center md:text-left">
                <span className={getBatteryColor()}>{todayBattery}%</span>
              </div>
              <p className="text-slate-300 text-center md:text-left mb-4">
                {todayBattery >= 70 && "You're energised today! Great time for important tasks."}
                {todayBattery >= 40 && todayBattery < 70 && "Moderate energy. Pace yourself with breaks."}
                {todayBattery < 40 && "Low energy today. Prioritise rest and essential tasks only."}
              </p>
              <button
                onClick={() => router.push("/dashboard/energy")}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-xl transition-colors"
              >
                Update Energy
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-300 mb-4">You haven't logged your energy today yet</p>
              <button
                onClick={() => router.push("/dashboard/energy")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-8 py-4 rounded-xl font-semibold transition-all"
              >
                <Zap size={20} />
                Log Energy Now
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => router.push("/dashboard/energy")}
            className={`
              bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-fuchsia-500 border-opacity-20
              text-left transition-all
              ${reduceEffects ? "" : "hover:border-opacity-40 hover:scale-105"}
            `}
          >
            <div className="flex items-center gap-3 mb-2">
              <Battery className="text-fuchsia-400" size={24} />
              <h3 className="text-lg font-bold text-fuchsia-300">Energy & Mood</h3>
            </div>
            <p className="text-slate-400 text-sm">
              Track battery, spoons, mood, and get personalised insights
            </p>
          </button>

          <button
            onClick={() => router.push("/dashboard/library")}
            className={`
              bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-teal-500 border-opacity-20
              text-left transition-all
              ${reduceEffects ? "" : "hover:border-opacity-40 hover:scale-105"}
            `}
          >
            <div className="flex items-center gap-3 mb-2">
              <Zap className="text-teal-400" size={24} />
              <h3 className="text-lg font-bold text-teal-300">Explore Library</h3>
            </div>
            <p className="text-slate-400 text-sm">
              Strategies for ADHD, autism, anxiety, and more
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
