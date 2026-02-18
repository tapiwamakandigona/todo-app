import { useCallback } from "react";

interface Todo {
  id: string;
  text: string;
  done: boolean;
  category: string;
  priority: "low" | "medium" | "high";
  createdAt: number;
}

/**
 * Batch operations for todo items.
 * Select multiple todos and apply actions to all at once.
 */
export function useBatchOperations(
  todos: Todo[],
  setTodos: (todos: Todo[]) => void
) {
  const selectAll = useCallback((filter?: (t: Todo) => boolean) => {
    return filter ? todos.filter(filter).map(t => t.id) : todos.map(t => t.id);
  }, [todos]);

  const markDone = useCallback((ids: string[]) => {
    setTodos(todos.map(t => ids.includes(t.id) ? { ...t, done: true } : t));
  }, [todos, setTodos]);

  const markUndone = useCallback((ids: string[]) => {
    setTodos(todos.map(t => ids.includes(t.id) ? { ...t, done: false } : t));
  }, [todos, setTodos]);

  const deleteMany = useCallback((ids: string[]) => {
    setTodos(todos.filter(t => !ids.includes(t.id)));
  }, [todos, setTodos]);

  const moveToCategory = useCallback((ids: string[], category: string) => {
    setTodos(todos.map(t => ids.includes(t.id) ? { ...t, category } : t));
  }, [todos, setTodos]);

  const setPriorityBatch = useCallback((ids: string[], priority: Todo["priority"]) => {
    setTodos(todos.map(t => ids.includes(t.id) ? { ...t, priority } : t));
  }, [todos, setTodos]);

  return {
    selectAll,
    markDone,
    markUndone,
    deleteMany,
    moveToCategory,
    setPriorityBatch,
  };
}
