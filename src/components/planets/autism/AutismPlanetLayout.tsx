"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AutismPlanetLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  nextRoute?: string;
  prevRoute?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function AutismPlanetLayout({
  children,
  currentStep,
  totalSteps,
  nextRoute,
  prevRoute,
  onSwipeLeft,
  onSwipeRight
}: AutismPlanetLayoutProps) {
  const router = useRouter();

  // Prefetch next route on mount
  useEffect(() => {
    if (nextRoute) {
      router.prefetch(nextRoute);
    }
  }, [nextRoute, router]);

  // Swipe handling for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && onSwipeLeft) {
          // Swipe left (next)
          onSwipeLeft();
        } else if (diff < 0 && onSwipeRight) {
          // Swipe right (prev)
          onSwipeRight();
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight]);

  const handleBack = () => {
    router.push('/');
  };

  const handleNext = () => {
    if (nextRoute) router.push(nextRoute);
  };

  const handlePrev = () => {
    if (prevRoute) router.push(prevRoute);
  };

  return (
    <div className="relative min-h-screen">
      {/* Simplified teal gradient background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #0f2027 0%, #203a43 30%, #2c5364 100%)"
        }}
      />

      {/* Content container */}
      <div className="max-w-2xl mx-auto px-4 py-6 relative" style={{ zIndex: 10 }}>
        {/* Top navigation */}
        <div className="flex items-center justify-between mb-6">
          {/* Back to Library button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors duration-200"
            style={{ minHeight: "44px", minWidth: "44px" }}
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back to Library</span>
          </button>

          {/* Progress indicator */}
          <div className="text-sm text-slate-400">
            {currentStep} / {totalSteps}
          </div>
        </div>

        {/* Page content */}
        <main className="mb-20">
          {children}
        </main>

        {/* Bottom navigation - fixed */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent py-6 px-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            {/* Previous button */}
            {prevRoute ? (
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(13, 148, 136, 0.1) 100%)",
                  border: "1px solid rgba(20, 184, 166, 0.3)",
                  color: "#14b8a6",
                  minHeight: "44px"
                }}
              >
                <ArrowLeft size={20} />
                Back
              </button>
            ) : (
              <div /> // Spacer
            )}

            {/* Next button */}
            {nextRoute && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(20, 184, 166, 0.25) 0%, rgba(13, 148, 136, 0.2) 100%)",
                  border: "1px solid rgba(20, 184, 166, 0.4)",
                  color: "#14b8a6",
                  minHeight: "44px"
                }}
              >
                Next
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
