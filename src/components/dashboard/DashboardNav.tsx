"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, Battery, BookOpen, ArrowLeft } from "lucide-react";
import { shouldReduceEffects } from "@/utils/performance";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "today", label: "Today", icon: Home, path: "/dashboard" },
  { id: "energy", label: "Energy & Mood", icon: Battery, path: "/dashboard/energy" },
  { id: "library", label: "Library", icon: BookOpen, path: "/dashboard/library" },
];

interface DashboardNavProps {
  showBackButton?: boolean;
  backPath?: string;
  backLabel?: string;
}

export function DashboardNav({
  showBackButton = false,
  backPath = "/",
  backLabel = "Back to Home",
}: DashboardNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceEffects = shouldReduceEffects();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 bg-opacity-95 backdrop-blur-sm border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {showBackButton && (
          <button
            onClick={() => router.push(backPath)}
            className="flex items-center gap-2 text-slate-300 hover:text-teal-300 transition-colors mb-3 text-sm"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </button>
        )}

        {/* Mobile: Horizontal scroll tabs */}
        <div className="flex md:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap
                  transition-all duration-200
                  ${active
                    ? "bg-teal-500 bg-opacity-20 text-teal-300 border border-teal-500 border-opacity-40"
                    : "bg-slate-800 bg-opacity-50 text-slate-400 border border-slate-700 hover:text-teal-300 hover:border-teal-500 hover:border-opacity-30"
                  }
                  ${reduceEffects ? "" : "hover:scale-105"}
                `}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop: Horizontal nav */}
        <div className="hidden md:flex gap-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl
                  transition-all duration-200
                  ${active
                    ? "bg-teal-500 bg-opacity-20 text-teal-300 border-2 border-teal-500 border-opacity-40"
                    : "bg-slate-800 bg-opacity-50 text-slate-400 border-2 border-slate-700 hover:text-teal-300 hover:border-teal-500 hover:border-opacity-30"
                  }
                  ${reduceEffects ? "" : "hover:scale-105 hover:shadow-lg hover:shadow-teal-500/20"}
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
