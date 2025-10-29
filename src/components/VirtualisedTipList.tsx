"use client";

import React, { useCallback, useRef, useEffect } from 'react';
import { List, type ListImperativeAPI } from 'react-window';

interface Tip {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  energy?: string;
  planetName?: string;
  planetColour?: string;
}

interface VirtualisedTipListProps {
  tips: Tip[];
  onTipClick: (tip: Tip) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

const ITEM_HEIGHT = 140;

function TipRow({ tips, onTipClick, index, style }: any) {
  const tip = tips[index];

  if (!tip) return <div style={style} />;

  return (
    <div style={style} className="px-4 py-2">
      <div className="bg-slate-800 bg-opacity-50 p-4 rounded-xl border border-slate-700 border-opacity-30 hover:border-opacity-60 transition-colors">
        <div className="flex items-center justify-between mb-2">
          {tip.planetName && (
            <span className="text-xs px-2 py-1 rounded-full bg-slate-700 bg-opacity-50 text-slate-400">
              {tip.planetName}
            </span>
          )}
          {tip.energy && (
            <span className="text-xs px-2 py-1 rounded-full bg-slate-700 bg-opacity-50 text-slate-400">
              {tip.energy} energy
            </span>
          )}
        </div>
        <h4 className="text-base font-bold mb-2 text-teal-300">
          {tip.title}
        </h4>
        <p className="text-sm text-slate-300 mb-3 leading-relaxed line-clamp-2">
          {tip.summary}
        </p>
        <button
          onClick={() => onTipClick(tip)}
          className="text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
        >
          View Full Strategy →
        </button>
      </div>
    </div>
  );
}

export default function VirtualisedTipList({
  tips,
  onTipClick,
  onLoadMore,
  hasMore,
  isLoading
}: VirtualisedTipListProps) {
  const listRef = useRef<ListImperativeAPI>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!hasMore || isLoading || !onLoadMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  const itemData = {
    tips,
    onTipClick
  };

  return (
    <div>
      <List
        listRef={listRef}
        rowComponent={TipRow}
        rowCount={tips.length}
        rowHeight={ITEM_HEIGHT}
        rowProps={itemData}
        style={{ height: '600px', width: '100%' }}
      />
      {hasMore && (
        <div ref={sentinelRef} className="h-10 flex items-center justify-center">
          {isLoading ? (
            <div className="text-sm text-slate-400">Loading more...</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
