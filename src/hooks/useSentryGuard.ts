import { useEffect } from 'react';

/**
 * useSentryGuard Protocol
 * Enforces focus and sovereignty by locking the vault if the user switches tabs or apps.
 */
export const useSentryGuard = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // If they switch tabs/apps, we wipe the current view to ensure containment
        console.warn("BREACH DETECTED: FOCUS LOST. LOCKING VAULT.");
        // We use a simple reload to reset the application state
        window.location.reload(); 
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Simulate "Recording Breach" detection for PrintScreen or common capture shortcuts
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.shiftKey && e.key === 'S')) {
        console.error("HARDWARE SECURITY BREACH: RECORDING DETECTED. BLACKLISTING PRINCIPAL.");
        alert("SECURITY BREACH DETECTED. HARDWARE STAKE FORFEITED.");
        window.location.href = "about:blank";
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
