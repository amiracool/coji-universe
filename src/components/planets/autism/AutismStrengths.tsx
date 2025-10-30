"use client";

import React, { useState } from "react";
import { AutismPlanetLayout } from "./AutismPlanetLayout";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { autismPlanetMobile } from "@/data/planets/autism-mobile";

export function AutismStrengths() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const handleNext = () => {
    router.push('/planets/autism/planning');
  };

  const handlePrev = () => {
    router.push('/planets/autism/how-it-shows-up');
  };

  const openModal = (id: string) => {
    setModalOpen(id);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  const activeStrength = autismPlanetMobile.strengthsAndSensitivities.find(
    s => s.id === modalOpen
  );

  return (
    <AutismPlanetLayout
      currentStep={5}
      totalSteps={6}
      nextRoute="/planets/autism/planning"
      prevRoute="/planets/autism/how-it-shows-up"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
    >
      <div className="space-y-6 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 inline-block">🌿</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Strengths & Sensitivities
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Tap a card to learn more
          </p>
        </div>

        {/* Staggered tiles - 2 lines only, tap to expand */}
        <div className="grid grid-cols-2 gap-4">
          {autismPlanetMobile.strengthsAndSensitivities.map((strength) => (
            <button
              key={strength.id}
              onClick={() => openModal(strength.id)}
              className="p-4 rounded-xl text-left transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.05) 100%)",
                border: "1px solid rgba(20, 184, 166, 0.2)",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                minHeight: "44px"
              }}
            >
              <h3 className="text-sm font-semibold text-teal-300 mb-2">
                {strength.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2" style={{ lineHeight: "1.5" }}>
                {strength.shortDesc}
              </p>
            </button>
          ))}
        </div>

        {/* Transition hint */}
        <div className="text-center pt-6">
          <p className="text-slate-400 text-sm">
            Next: Plan around it
          </p>
        </div>
      </div>

      {/* Modal for full description */}
      {modalOpen && activeStrength && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="max-w-lg w-full p-6 rounded-2xl relative"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(13, 148, 136, 0.1) 100%)",
              border: "2px solid rgba(20, 184, 166, 0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
              style={{ minHeight: "44px", minWidth: "44px" }}
            >
              <X size={24} />
            </button>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-teal-300">
                {activeStrength.title}
              </h3>
              <p className="text-base text-slate-300 leading-relaxed" style={{ lineHeight: "1.6" }}>
                {activeStrength.fullDesc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CSS for line-clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </AutismPlanetLayout>
  );
}
