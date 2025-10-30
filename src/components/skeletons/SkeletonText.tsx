/**
 * Skeleton Text Component
 * Loading state for text content blocks
 * Configurable for headings, paragraphs, and multi-line text
 */

import React from 'react';

interface SkeletonTextProps {
  variant?: 'heading' | 'paragraph' | 'caption';
  lines?: number;
  width?: 'full' | '3/4' | '1/2' | '1/3';
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  variant = 'paragraph',
  lines = 1,
  width = 'full'
}) => {
  const heightMap = {
    heading: 'h-8 md:h-10',
    paragraph: 'h-4',
    caption: 'h-3'
  };

  const widthMap = {
    full: 'w-full',
    '3/4': 'w-3/4',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3'
  };

  const height = heightMap[variant];
  const widthClass = widthMap[width];

  if (lines === 1) {
    return (
      <div
        className={`${height} ${widthClass} bg-slate-700 rounded`}
        role="status"
        aria-label="Loading text"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="space-y-2" role="status" aria-label="Loading text">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`${height} ${
            i === lines - 1 ? 'w-2/3' : 'w-full'
          } bg-slate-700 rounded`}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
