/**
 * Skeleton Planet Grid Component
 * Loading state for planet library grid
 * Mobile-optimized with responsive columns
 */

import React from 'react';
import { SkeletonCard } from './SkeletonCard';

interface SkeletonPlanetGridProps {
  count?: number;
}

export const SkeletonPlanetGrid: React.FC<SkeletonPlanetGridProps> = ({
  count = 6
}) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      role="status"
      aria-label="Loading planets"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard
          key={i}
          variant="planet"
          showImage={true}
          lines={2}
        />
      ))}
      <span className="sr-only">Loading planet library...</span>
    </div>
  );
};
