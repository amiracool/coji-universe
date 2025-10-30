"use client";

import React, { useState, useEffect, useRef } from "react";
import { PlanetLayout } from "../PlanetLayout";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { chronicillnessPlanetMobile } from "@/data/planets/chronic-illness-mobile";

export function ChronicIllnessStrengths() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleNext = () => {
    router.push('/planets/chronic-illness/planning');
  };

  const handlePrev = () => {
    router.push('/planets/chronic-illness/how-it-shows-up');
  };

  const openModal = (id: string) => {
    setModalOpen(id);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  const activeStrength = chronicillnessPlanetMobile.strengthsAndSensitivities.find(
    s => s.id === modalOpen
  );

  // Scroll lock when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      // Focus close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  // Esc key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modalOpen]);

  // Focus trap
  useEffect(() => {
    if (!modalOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTab as any);
    return () => modal.removeEventListener('keydown', handleTab as any);
  }, [modalOpen]);

  return (
    <PlanetLayout
      currentStep={5}
      totalSteps={6}
      primaryColor="#6EBD8E"
      accentColor="#8ECDA7"
      nextRoute="/planets/chronic-illness/planning"
      prevRoute="/planets/chronic-illness/how-it-shows-up"
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
    >
      <div className="space-y-6 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 inline-block">🌿</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Strengths & Sensitivities of ChronicIllness
          </h2>
          <p className="text-slate-400 text-base max-w-md mx-auto" style={{ lineHeight: "1.6" }}>
            Tap a card to learn more
          </p>
        </div>

        {/* Staggered tiles - 2 lines only, tap to expand */}
        <div className="grid grid-cols-2 gap-4">
          {chronicillnessPlanetMobile.strengthsAndSensitivities.map((strength) => (
            <button
              key={strength.id}
              onClick={() => openModal(strength.id)}
              className="p-4 rounded-xl text-left transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(110, 189, 142, 0.08) 0%, rgba(110, 189, 142, 0.05) 100%)",
                border: "1px solid rgba(110, 189, 142, 0.2)",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                minHeight: "44px"
              }}
            >
              <h3 className="text-sm font-semibold text-emerald-300 mb-2">
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

      {/* Modal with backdrop blur */}
      <AnimatePresence>
        {modalOpen && activeStrength && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            style={{
              backdropFilter: "blur(8px) brightness(0.6)",
              WebkitBackdropFilter: "blur(8px) brightness(0.6)"
            }}
            onClick={closeModal}
          >
            {/* Translucent overlay */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            />

            {/* Modal container */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-full"
              style={{
                background: "rgba(10, 25, 25, 0.95)",
                borderRadius: "1rem",
                padding: "1.5rem",
                maxWidth: "600px",
                border: "1px solid rgba(110, 189, 142, 0.3)",
                boxShadow: "inset 0 0 0 1px rgba(110, 189, 142, 0.15)"
              }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close button */}
              <button
                ref={closeButtonRef}
                onClick={closeModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors rounded-lg"
                style={{ minHeight: "44px", minWidth: "44px" }}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="space-y-4 pr-8">
                <h3
                  id="modal-title"
                  className="text-2xl font-bold text-emerald-300"
                  style={{ lineHeight: "1.4" }}
                >
                  {activeStrength.title}
                </h3>
                <p
                  className="text-lg text-slate-200"
                  style={{ lineHeight: "1.6" }}
                >
                  {activeStrength.fullDesc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for line-clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </PlanetLayout>
  );
}
