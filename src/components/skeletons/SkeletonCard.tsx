/**
 * Skeleton Card Component
 * Mobile-first skeleton loader for card-based content
 * Respects prefers-reduced-motion
 */

import React from 'react';

interface SkeletonCardProps {
  variant?: 'default' | 'planet' | 'educational' | 'finance';
  showImage?: boolean;
  lines?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  variant = 'default',
  showImage = false,
  lines = 3
}) => {
  return (
    <div
      className="bg-slate-800 bg-opacity-50 p-4 md:p-6 rounded-xl border border-slate-700 border-opacity-20"
      role="status"
      aria-label="Loading content"
    >
      {/* Icon/Image Skeleton */}
      {showImage && (
        <div className="mb-4">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-700" />
        </div>
      )}

      {/* Title Skeleton */}
      <div className="mb-3">
        <div className="h-5 md:h-6 bg-slate-700 rounded w-3/4" />
      </div>

      {/* Content Lines Skeleton */}
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`h-4 bg-slate-700 rounded ${
              i === lines - 1 ? 'w-2/3' : 'w-full'
            }`}
          />
        ))}
      </div>

      {/* Variant-specific elements */}
      {variant === 'planet' && (
        <div className="mt-4 flex gap-2">
          <div className="h-8 w-20 bg-slate-700 rounded" />
          <div className="h-8 w-24 bg-slate-700 rounded" />
        </div>
      )}

      {variant === 'educational' && (
        <div className="mt-4">
          <div className="h-10 bg-slate-700 rounded w-full" />
        </div>
      )}

      <span className="sr-only">Loading...</span>
    </div>
  );
};
