"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface FactCarouselProps {
  facts: string[];
  colour: string;
  onLearnMore?: () => void;
}

export default function FactCarousel({ facts, colour, onLearnMore }: FactCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance every 8 seconds
  useEffect(() => {
    if (!isAutoPlaying || facts.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % facts.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, facts.length]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % facts.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + facts.length) % facts.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (facts.length === 0) return null;

  return (
    <div className="relative w-full">
      {/* Carousel container */}
      <div className="relative overflow-hidden rounded-2xl will-change-transform" style={{
        background: `linear-gradient(135deg, ${colour}10 0%, ${colour}05 100%)`,
        border: `1px solid ${colour}20`
      }}>
        {/* Fact cards */}
        <div className="relative min-h-[200px] sm:min-h-[220px] md:min-h-[240px] p-4 sm:p-6 md:p-8 lg:p-10 touch-pan-x" style={{ contain: 'layout' }}>
          {facts.map((fact, index) => (
            <div
              key={index}
              className={`absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 translate-x-0'
                  : index < currentIndex
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
              style={{ willChange: index === currentIndex ? 'opacity, transform' : 'auto' }}
            >
              <div className="flex flex-col items-center text-center h-full justify-center space-y-3 sm:space-y-4 md:space-y-6">
                {/* Icon */}
                <div
                  className="p-2 sm:p-3 md:p-4 rounded-full animate-pulse-slow"
                  style={{
                    background: `${colour}15`,
                    border: `2px solid ${colour}30`
                  }}
                >
                  <Sparkles size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" style={{ color: colour }} />
                </div>

                {/* Fact text */}
                <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl font-light">
                  {fact}
                </p>

                {/* Learn more button */}
                {onLearnMore && (
                  <button
                    onClick={onLearnMore}
                    className="mt-4 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: `${colour}20`,
                      border: `1px solid ${colour}40`,
                      color: colour
                    }}
                  >
                    Learn Strategies
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator - Bottom pagination */}
      {facts.length > 1 && (
        <div className="flex justify-center items-center gap-2.5 sm:gap-3 mt-4 sm:mt-5 md:mt-6">
          {facts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="transition-all duration-300 rounded-full hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95"
              style={{
                width: index === currentIndex ? '36px' : '10px',
                height: '10px',
                background: index === currentIndex ? colour : `${colour}25`,
                boxShadow: index === currentIndex
                  ? `0 0 12px ${colour}60, 0 0 20px ${colour}40, 0 2px 8px ${colour}50`
                  : `0 0 4px ${colour}20`,
                border: index === currentIndex ? `1.5px solid ${colour}80` : `1px solid ${colour}40`,
                filter: index === currentIndex ? 'brightness(1.2)' : 'brightness(0.8)'
              }}
              aria-label={`Go to fact ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
