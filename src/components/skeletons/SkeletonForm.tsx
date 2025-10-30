/**
 * Skeleton Form Component
 * Loading state for forms with inputs and buttons
 * Mobile-optimized with touch-friendly sizing
 */

import React from 'react';

interface SkeletonFormProps {
  fields?: number;
  showTextarea?: boolean;
  showButton?: boolean;
}

export const SkeletonForm: React.FC<SkeletonFormProps> = ({
  fields = 3,
  showTextarea = false,
  showButton = true
}) => {
  return (
    <div
      className="space-y-4 md:space-y-6"
      role="status"
      aria-label="Loading form"
    >
      {/* Input Fields Skeleton */}
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          {/* Label Skeleton */}
          <div className="h-4 bg-slate-700 rounded animate-pulse w-24" />
          {/* Input Skeleton */}
          <div
            className="h-11 md:h-12 bg-slate-800 border border-slate-700 rounded-lg animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        </div>
      ))}

      {/* Textarea Skeleton */}
      {showTextarea && (
        <div className="space-y-2">
          <div className="h-4 bg-slate-700 rounded animate-pulse w-32" />
          <div className="h-32 bg-slate-800 border border-slate-700 rounded-lg animate-pulse" />
        </div>
      )}

      {/* Button Skeleton */}
      {showButton && (
        <div className="h-12 md:h-14 bg-slate-700 rounded-lg animate-pulse w-full md:w-auto md:min-w-[200px]" />
      )}

      <span className="sr-only">Loading form...</span>
    </div>
  );
};
