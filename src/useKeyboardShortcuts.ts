import { useEffect } from "react";

interface Shortcuts {
  onNew?: () => void;
  onSearch?: () => void;
  onClearDone?: () => void;
}

/**
 * Global keyboard shortcuts:
 * - Ctrl+N / Cmd+N: New task
 * - Ctrl+K / Cmd+K: Focus search
 * - Ctrl+Shift+D: Clear done
 */
export function useKeyboardShortcuts({ onNew, onSearch, onClearDone }: Shortcuts) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      
      if (mod && e.key === "n") {
        e.preventDefault();
        onNew?.();
      }
      
      if (mod && e.key === "k") {
        e.preventDefault();
        onSearch?.();
      }
      
      if (mod && e.shiftKey && e.key === "D") {
        e.preventDefault();
        onClearDone?.();
      }
    }
    
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onNew, onSearch, onClearDone]);
}
