import { useState, useCallback, useEffect } from "react";

interface Subtask {
  id: string;
  text: string;
  done: boolean;
}

type SubtaskMap = Record<string, Subtask[]>;

/**
 * Manage subtasks for todo items.
 * Each todo can have unlimited subtasks with independent completion state.
 */
export function useSubtasks() {
  const [subtasks, setSubtasks] = useState<SubtaskMap>(() => {
    const saved = localStorage.getItem("subtasks");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("subtasks", JSON.stringify(subtasks));
  }, [subtasks]);

  const addSubtask = useCallback((todoId: string, text: string) => {
    setSubtasks(prev => ({
      ...prev,
      [todoId]: [...(prev[todoId] || []), { id: crypto.randomUUID(), text, done: false }],
    }));
  }, []);

  const toggleSubtask = useCallback((todoId: string, subtaskId: string) => {
    setSubtasks(prev => ({
      ...prev,
      [todoId]: (prev[todoId] || []).map(s =>
        s.id === subtaskId ? { ...s, done: !s.done } : s
      ),
    }));
  }, []);

  const deleteSubtask = useCallback((todoId: string, subtaskId: string) => {
    setSubtasks(prev => ({
      ...prev,
      [todoId]: (prev[todoId] || []).filter(s => s.id !== subtaskId),
    }));
  }, []);

  const getSubtasks = useCallback((todoId: string): Subtask[] => {
    return subtasks[todoId] || [];
  }, [subtasks]);

  const getProgress = useCallback((todoId: string): { done: number; total: number; percentage: number } => {
    const subs = subtasks[todoId] || [];
    const done = subs.filter(s => s.done).length;
    const total = subs.length;
    return { done, total, percentage: total > 0 ? Math.round((done / total) * 100) : 0 };
  }, [subtasks]);

  const clearSubtasks = useCallback((todoId: string) => {
    setSubtasks(prev => {
      const copy = { ...prev };
      delete copy[todoId];
      return copy;
    });
  }, []);

  return { addSubtask, toggleSubtask, deleteSubtask, getSubtasks, getProgress, clearSubtasks };
}
