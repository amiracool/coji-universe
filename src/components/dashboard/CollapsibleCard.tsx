"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { shouldReduceEffects } from "@/utils/performance";

interface CollapsibleCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  iconColor?: string;
  borderColor?: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  preview?: React.ReactNode; // Short version shown when collapsed
}

export function CollapsibleCard({
  title,
  subtitle,
  icon: Icon,
  iconColor = "text-teal-400",
  borderColor = "border-teal-500",
  defaultExpanded = false,
  children,
  preview,
}: CollapsibleCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const reduceEffects = shouldReduceEffects();

  return (
    <div
      className={`
        bg-slate-800 bg-opacity-50 rounded-xl border ${borderColor} border-opacity-20
        transition-all duration-300
        ${reduceEffects ? "" : "hover:border-opacity-40"}
        ${isExpanded ? "border-opacity-40" : ""}
      `}
    >
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-3 flex-1">
          {Icon && <Icon size={24} className={iconColor} />}
          <div>
            <h3 className="text-xl font-bold text-slate-100">{title}</h3>
            {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden sm:block">
            {isExpanded ? "Collapse" : "Expand"}
          </span>
          {isExpanded ? (
            <ChevronUp className="text-slate-400" size={20} />
          ) : (
            <ChevronDown className="text-slate-400" size={20} />
          )}
        </div>
      </button>

      {/* Preview - shown when collapsed */}
      {!isExpanded && preview && (
        <div className="px-6 pb-6 pt-0">
          <div className="border-t border-slate-700 pt-4">{preview}</div>
        </div>
      )}

      {/* Full content - shown when expanded */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-0">
          <div className="border-t border-slate-700 pt-4">{children}</div>
        </div>
      )}
    </div>
  );
}
