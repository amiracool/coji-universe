"use client";

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  onSkip?: () => void;
  soundEnabled?: boolean;
}

export function TypewriterText({
  text,
  delay = 0,
  onSkip,
  soundEnabled = false
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const lastTapRef = React.useRef<number>(0);

  // Initialize audio context once
  React.useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      // Audio not supported
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play a typewriter click sound
  const playTypeSound = () => {
    if (!audioContextRef.current || !soundEnabled) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      // Very gentle, subtle typewriter click
      oscillator.frequency.value = 800; // Higher, softer frequency
      oscillator.type = 'sine'; // Sine wave for smooth, gentle sound

      const now = audioContextRef.current.currentTime;
      gainNode.gain.setValueAtTime(0.05, now); // Very gentle volume
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      oscillator.start(now);
      oscillator.stop(now + 0.03);
    } catch (e) {
      // Silently fail if audio playback fails
    }
  };

  useEffect(() => {
    // Start after delay
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (isSkipped) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
      return;
    }

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        // Play sound first, then update text
        playTypeSound();
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 60); // 60ms per character = slower, therapeutic pace

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, hasStarted, isSkipped]);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (currentIndex >= text.length) return;

    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    // On desktop: single click shows all text
    // On mobile: double tap (within 300ms) shows all text
    const isDoubleTab = timeSinceLastTap < 300;
    const isMobile = 'ontouchstart' in window;

    if (!isMobile || isDoubleTab) {
      setIsSkipped(true);
      setDisplayedText(text);
      setCurrentIndex(text.length);
      if (onSkip) onSkip();
    }

    lastTapRef.current = now;
  };

  return (
    <span
      onClick={handleClick}
      onTouchEnd={handleClick}
      style={{
        cursor: currentIndex < text.length ? 'pointer' : 'default',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      {displayedText}
      {currentIndex < text.length && (
        <span style={{
          borderRight: "2px solid currentColor",
          animation: "blink 1s step-end infinite",
          opacity: 0.7
        }}>
          &nbsp;
        </span>
      )}
    </span>
  );
}
