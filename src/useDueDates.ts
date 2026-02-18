import { useMemo } from "react";

interface Todo {
  id: string;
  text: string;
  done: boolean;
  dueDate?: string;
}

export interface DueDateInfo {
  isOverdue: boolean;
  isDueToday: boolean;
  isDueSoon: boolean; // within 2 days
  daysUntil: number;
  label: string;
}

export function getDueDateInfo(dueDate: string | undefined): DueDateInfo | null {
  if (!dueDate) return null;
  
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const diffMs = due.getTime() - now.getTime();
  const daysUntil = Math.ceil(diffMs / 86400000);
  
  const isOverdue = daysUntil < 0;
  const isDueToday = daysUntil === 0;
  const isDueSoon = daysUntil > 0 && daysUntil <= 2;
  
  let label: string;
  if (isOverdue) label = `Overdue by ${Math.abs(daysUntil)} day${Math.abs(daysUntil) !== 1 ? "s" : ""}`;
  else if (isDueToday) label = "Due today";
  else if (daysUntil === 1) label = "Due tomorrow";
  else if (isDueSoon) label = `Due in ${daysUntil} days`;
  else label = `Due ${due.toLocaleDateString()}`;
  
  return { isOverdue, isDueToday, isDueSoon, daysUntil, label };
}

export function useOverdueTodos(todos: Todo[]): Todo[] {
  return useMemo(() => 
    todos.filter(t => !t.done && t.dueDate && getDueDateInfo(t.dueDate)?.isOverdue)
  , [todos]);
}

export function useDueSoonTodos(todos: Todo[]): Todo[] {
  return useMemo(() =>
    todos.filter(t => !t.done && t.dueDate && (getDueDateInfo(t.dueDate)?.isDueSoon || getDueDateInfo(t.dueDate)?.isDueToday))
  , [todos]);
}
