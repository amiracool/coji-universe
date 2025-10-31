"use client";

import React from "react";
import { shouldDisableAnimations } from "@/utils/performance";

interface StarfieldProps {
  intensity?: "light" | "medium" | "heavy";
  disableOnMobile?: boolean;
}

export function Starfield({ intensity = "light", disableOnMobile = true }: StarfieldProps) {
  const [shouldRender, setShouldRender] = React.useState(true);

  React.useEffect(() => {
    if (disableOnMobile && shouldDisableAnimations()) {
      setShouldRender(false);
    }
  }, [disableOnMobile]);

  if (!shouldRender) {
    return null;
  }

  // Simplified starfield with fewer layers and less complex animations
  const lightStars = (
    <div
      className="absolute inset-0 pointer-events-none opacity-40"
      style={{
        backgroundImage: `
          radial-gradient(1px 1px at 20% 30%, white, transparent),
          radial-gradient(1px 1px at 60% 70%, white, transparent),
          radial-gradient(1px 1px at 80% 10%, white, transparent),
          radial-gradient(1px 1px at 40% 80%, white, transparent)
        `,
        backgroundSize: "200px 200px",
        backgroundRepeat: "repeat",
      }}
    />
  );

  if (intensity === "light") {
    return <div className="absolute inset-0 pointer-events-none">{lightStars}</div>;
  }

  // Medium adds one more layer with subtle animation
  if (intensity === "medium") {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {lightStars}
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              radial-gradient(1.5px 1.5px at 50% 50%, rgba(255,255,255,0.3), transparent),
              radial-gradient(1px 1px at 90% 20%, rgba(255,255,255,0.2), transparent)
            `,
            backgroundSize: "300px 300px",
            backgroundRepeat: "repeat",
            animationDuration: "4s",
          }}
        />
      </div>
    );
  }

  // Heavy - only use on desktop with good hardware
  return (
    <div className="absolute inset-0 pointer-events-none">
      {lightStars}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(2px 2px at 17% 23%, rgba(255, 255, 255, 0.4), transparent),
            radial-gradient(1.5px 1.5px at 89% 67%, rgba(255, 255, 255, 0.35), transparent),
            radial-gradient(2px 2px at 43% 12%, rgba(255, 255, 255, 0.38), transparent)
          `,
          backgroundSize: "800px 800px",
          backgroundRepeat: "repeat",
          animation: "twinkle 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// CSS for animations (add to globals.css)
export const starfieldStyles = `
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
`;
