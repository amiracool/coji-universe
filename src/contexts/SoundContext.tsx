"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SoundContextType {
  isMuted: boolean;
  soundEnabled: boolean;
  setIsMuted: (muted: boolean) => void;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Export the context so it can be used with useContext
export { SoundContext };

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <SoundContext.Provider value={{ isMuted, soundEnabled: !isMuted, setIsMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
