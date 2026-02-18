import { useState, useEffect, useCallback } from "react";

interface Tag {
  id: string;
  name: string;
  color: string;
}

const DEFAULT_COLORS = [
  "#6366f1", "#ec4899", "#f59e0b", "#22c55e", "#06b6d4",
  "#8b5cf6", "#ef4444", "#14b8a6", "#f97316", "#64748b",
];

export function useTags() {
  const [tags, setTags] = useState<Tag[]>(() => {
    const saved = localStorage.getItem("todo-tags");
    return saved ? JSON.parse(saved) : [
      { id: "1", name: "urgent", color: "#ef4444" },
      { id: "2", name: "important", color: "#f59e0b" },
      { id: "3", name: "later", color: "#64748b" },
    ];
  });

  useEffect(() => {
    localStorage.setItem("todo-tags", JSON.stringify(tags));
  }, [tags]);

  const addTag = useCallback((name: string) => {
    const color = DEFAULT_COLORS[tags.length % DEFAULT_COLORS.length];
    setTags(prev => [...prev, { id: crypto.randomUUID(), name, color }]);
  }, [tags.length]);

  const removeTag = useCallback((id: string) => {
    setTags(prev => prev.filter(t => t.id !== id));
  }, []);

  const updateTag = useCallback((id: string, updates: Partial<Tag>) => {
    setTags(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  return { tags, addTag, removeTag, updateTag };
}
