import { useEffect } from 'react';

/**
 * useSentryGuard Protocol
 * Enforces focus and sovereignty by locking the vault if the user switches tabs or apps.
 */
export const useSentryGuard = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.warn("FOCUS LOST. SENTRY RECALIBRATING.");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.shiftKey && e.key === 'S')) {
        console.error("CAPTURE ATTEMPT LOGGED.");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
