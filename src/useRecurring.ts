import { useCallback } from "react";

type Frequency = "daily" | "weekly" | "monthly";

interface RecurringTask {
  text: string;
  category: string;
  priority: "low" | "medium" | "high";
  frequency: Frequency;
  lastCreated: number;
}

const INTERVALS: Record<Frequency, number> = {
  daily: 86400000,
  weekly: 604800000,
  monthly: 2592000000,
};

export function useRecurring(
  recurringTasks: RecurringTask[],
  addTodo: (text: string, category: string, priority: "low" | "medium" | "high") => void
) {
  const checkAndCreate = useCallback(() => {
    const now = Date.now();
    for (const task of recurringTasks) {
      if (now - task.lastCreated >= INTERVALS[task.frequency]) {
        addTodo(task.text, task.category, task.priority);
        task.lastCreated = now;
      }
    }
  }, [recurringTasks, addTodo]);

  return { checkAndCreate };
}
