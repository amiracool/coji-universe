/**
 * Performance-optimized scroll utilities
 * Prevents main thread blocking during scroll events
 */

/**
 * Throttle function calls to prevent excessive execution
 * @param fn Function to throttle
 * @param wait Milliseconds to wait between calls (default 100ms)
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  wait = 100
): (...args: Parameters<T>) => void {
  let lastTime = 0;

  return (...args: Parameters<T>) => {
    const now = performance.now();

    if (now - lastTime >= wait) {
      lastTime = now;
      fn(...args);
    }
  };
}

/**
 * Debounce function calls to wait until user stops action
 * @param fn Function to debounce
 * @param wait Milliseconds to wait (default 300ms)
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait = 300
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, wait);
  };
}

/**
 * Request animation frame throttle for scroll-linked animations
 * Ensures updates only happen at display refresh rate
 * @param fn Function to execute
 * @returns RAF-throttled function
 */
export function rafThrottle<T extends (...args: any[]) => void>(
  fn: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return (...args: Parameters<T>) => {
    if (rafId !== null) {
      return;
    }

    rafId = requestAnimationFrame(() => {
      fn(...args);
      rafId = null;
    });
  };
}

/**
 * Add passive scroll listener (improves scroll performance)
 * @param element Element to attach listener to
 * @param handler Scroll handler function
 * @returns Cleanup function
 */
export function addPassiveScrollListener(
  element: Window | HTMLElement,
  handler: (event: Event) => void
): () => void {
  element.addEventListener('scroll', handler, { passive: true });

  return () => {
    element.removeEventListener('scroll', handler);
  };
}

/**
 * Observe element visibility with IntersectionObserver
 * More performant than scroll listeners for visibility checks
 * @param element Element to observe
 * @param callback Function to call when visibility changes
 * @param options IntersectionObserver options
 * @returns Cleanup function
 */
export function observeVisibility(
  element: Element,
  callback: (isVisible: boolean) => void,
  options?: IntersectionObserverInit
): () => void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        callback(entry.isIntersecting);
      });
    },
    {
      threshold: 0.1,
      ...options,
    }
  );

  observer.observe(element);

  return () => {
    observer.disconnect();
  };
}
