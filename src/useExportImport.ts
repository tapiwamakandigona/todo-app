import { useCallback } from "react";

interface Todo {
  id: string;
  text: string;
  done: boolean;
  category: string;
  priority: "low" | "medium" | "high";
  createdAt: number;
}

export function useExportImport(todos: Todo[], setTodos: (t: Todo[]) => void) {
  const exportJson = useCallback(() => {
    const data = JSON.stringify(todos, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "todos-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [todos]);

  const importJson = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
          setTodos(data);
        }
      } catch {
        alert("Invalid file format");
      }
    };
    input.click();
  }, [setTodos]);

  const exportCsv = useCallback(() => {
    const rows = ["ID,Text,Done,Category,Priority,Created"];
    todos.forEach(t => {
      rows.push([t.id, '"' + t.text + '"', t.done, t.category, t.priority, new Date(t.createdAt).toISOString()].join(","));
    });
    const blob = new Blob([rows.join("
")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "todos.csv";
    a.click();
  }, [todos]);

  return { exportJson, importJson, exportCsv };
}
