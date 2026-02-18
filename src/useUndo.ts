import { useState, useCallback, useRef } from "react";

export function useUndo<T>(initial: T) {
  const [state, setState] = useState<T>(initial);
  const history = useRef<T[]>([initial]);
  const idx = useRef(0);

  const set = useCallback((val: T | ((p: T) => T)) => {
    setState(prev => {
      const next = typeof val === "function" ? (val as (p: T) => T)(prev) : val;
      history.current = history.current.slice(0, idx.current + 1);
      history.current.push(next);
      if (history.current.length > 50) history.current.shift();
      else idx.current++;
      return next;
    });
  }, []);

  const undo = useCallback(() => {
    if (idx.current > 0) { idx.current--; setState(history.current[idx.current]); }
  }, []);

  const redo = useCallback(() => {
    if (idx.current < history.current.length - 1) { idx.current++; setState(history.current[idx.current]); }
  }, []);

  return { state, set, undo, redo, canUndo: idx.current > 0, canRedo: idx.current < history.current.length - 1 };
}
