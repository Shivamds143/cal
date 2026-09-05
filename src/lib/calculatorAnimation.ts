/**
 * SPPU Academic Calculation & Number Animation Utilities
 * Provides smooth requestAnimationFrame transitions, easing, and official SPPU formulas.
 */

export interface NumberAnimationOptions {
  from: number;
  to: number;
  duration?: number; // in milliseconds (default 550ms)
  onUpdate: (current: number, progress: number) => void;
  onComplete?: () => void;
}

/**
 * Smoothly animates a numeric value from start to target using requestAnimationFrame
 * and cubic ease-out smoothing. Returns a cancellation function.
 */
export function animateNumber({
  from,
  to,
  duration = 550,
  onUpdate,
  onComplete,
}: NumberAnimationOptions): () => void {
  // If values are identical, immediately update and complete
  if (Math.abs(from - to) < 0.0001) {
    onUpdate(to, 1);
    if (onComplete) onComplete();
    return () => {};
  }

  const startTime = performance.now();
  let animId: number;

  // Cubic ease-out: starts fast, lands smoothly
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const step = (now: number) => {
    const elapsed = now - startTime;
    const rawProgress = Math.min(elapsed / duration, 1);
    const easeProgress = easeOutCubic(rawProgress);
    const current = from + (to - from) * easeProgress;

    onUpdate(current, easeProgress);

    if (rawProgress < 1) {
      animId = requestAnimationFrame(step);
    } else {
      onUpdate(to, 1);
      if (onComplete) onComplete();
    }
  };

  animId = requestAnimationFrame(step);
  return () => {
    if (animId) cancelAnimationFrame(animId);
  };
}

/**
 * Calculates official SPPU CBCS Percentage based on CGPA
 * Formula: Pune University official range-based piecewise table
 */
export function calculateSppuPercentage(cgpa: number): number {
  if (isNaN(cgpa) || cgpa <= 0) return 0;
  if (cgpa > 10) cgpa = 10;

  if (cgpa >= 9.75) {
    return 95.0 + (cgpa - 9.75) * 20;
  } else if (cgpa >= 9.25) {
    return 85.0 + (cgpa - 9.25) * 20;
  } else if (cgpa >= 8.25) {
    return 75.0 + (cgpa - 8.25) * 10;
  } else if (cgpa >= 7.25) {
    return 65.0 + (cgpa - 7.25) * 10;
  } else if (cgpa >= 6.75) {
    return 60.0 + (cgpa - 6.75) * 10;
  } else if (cgpa >= 5.75) {
    return 50.0 + (cgpa - 5.75) * 10;
  } else if (cgpa >= 4.75) {
    return 40.0 + (cgpa - 4.75) * 10;
  } else {
    // Below 4.75 linear fallback
    return Math.max(0, cgpa * 8.4);
  }
}

/**
 * Formats a float to clean 2 decimal places with fixed width
 */
export function formatScore(num: number): string {
  return num.toFixed(2);
}
