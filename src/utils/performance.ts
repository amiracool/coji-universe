// Performance utilities for mobile optimization

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
}

export function shouldDisableAnimations(): boolean {
  if (typeof window === 'undefined') return true;

  // Check user preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return true;

  // Disable heavy animations on mobile
  if (isMobileDevice()) return true;

  // Check for low-end device indicators
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;
  if (hardwareConcurrency < 4) return true;

  return false;
}

export function shouldReduceEffects(): boolean {
  if (typeof window === 'undefined') return true;
  return isMobileDevice() || shouldDisableAnimations();
}

// Utility to conditionally apply animation classes
export function animationClass(animationClassName: string, fallback: string = ''): string {
  return shouldDisableAnimations() ? fallback : animationClassName;
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility for scroll/resize events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
