"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PlanetOrb from "@/components/PlanetOrb";

interface PlanetCardProps {
  id: string;
  title: string;
  description: string;
  emoji: string;
  colour: string;
  route: string;
}

export function PlanetCard({ id, title, description, emoji, colour, route }: PlanetCardProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(route)}
      className="bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all hover:scale-[1.02] text-left w-full focus:outline-none focus:ring-2 focus:ring-opacity-50"
      style={{
        borderColor: colour,
        boxShadow: `0 0 15px ${colour}10`,
      }}
      aria-label={`Navigate to ${title}`}
    >
      <div className="flex justify-center mb-4">
        <PlanetOrb
          emoji={emoji}
          colour={colour}
          size="small"
          showOrbitRing={false}
        />
      </div>
      <h3
        className="text-lg font-bold mb-2 text-center"
        style={{ color: colour }}
      >
        {title}
      </h3>
      <p className="text-sm text-slate-400 text-center leading-relaxed">
        {description}
      </p>
    </button>
  );
}
