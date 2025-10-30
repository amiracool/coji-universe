/**
 * Skeleton List Component
 * Loading state for list-based content (tasks, journal entries, etc.)
 * Mobile-first design with compact spacing
 */

import React from 'react';

interface SkeletonListProps {
  count?: number;
  showCheckbox?: boolean;
  showAvatar?: boolean;
}

export const SkeletonList: React.FC<SkeletonListProps> = ({
  count = 5,
  showCheckbox = false,
  showAvatar = false
}) => {
  return (
    <div className="space-y-3" role="status" aria-label="Loading list">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 md:p-4 bg-slate-800 bg-opacity-30 rounded-lg border border-slate-700 border-opacity-20"
        >
          {/* Checkbox Skeleton */}
          {showCheckbox && (
            <div className="w-5 h-5 rounded border-2 border-slate-700 animate-pulse flex-shrink-0" />
          )}

          {/* Avatar Skeleton */}
          {showAvatar && (
            <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse flex-shrink-0" />
          )}

          {/* Content Skeleton */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-700 rounded animate-pulse w-4/5" />
            <div className="h-3 bg-slate-700 rounded animate-pulse w-1/2" />
          </div>

          {/* Action Button Skeleton */}
          <div className="w-8 h-8 rounded bg-slate-700 animate-pulse flex-shrink-0" />
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
