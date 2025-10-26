"use client";

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmbientMusic() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set to 30% volume for subtlety
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleMute}
        className="bg-slate-900 bg-opacity-95 border border-teal-500 border-opacity-40 p-3 rounded-full hover:bg-opacity-100 shadow-lg hover:shadow-teal-500/50"
        style={{
          transition: 'background-color 0.3s ease-out, box-shadow 0.3s ease-out',
        }}
        title={isMuted ? "Play ambient music" : "Mute ambient music"}
      >
        {isMuted ? (
          <VolumeX size={24} className="text-slate-400" />
        ) : (
          <Volume2 size={24} className="text-teal-400" />
        )}
      </button>

      {/* Using a royalty-free ambient space music URL */}
      <audio
        ref={audioRef}
        loop
        src="https://www.bensound.com/bensound-music/bensound-slowmotion.mp3"
      />
    </div>
  );
}
