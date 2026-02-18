import { useState, useEffect, useMemo } from "react";

interface Todo {
  id: string;
  text: string;
  done: boolean;
  category: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: number;
}

const CATEGORIES = ["Personal", "Work", "Shopping", "Health", "Other"];
const PRIORITY_COLORS = { low: "#22c55e", medium: "#eab308", high: "#ef4444" };

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos-v2");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "priority" | "name">("date");

  useEffect(() => {
    localStorage.setItem("todos-v2", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos(prev => [...prev, {
      id: crypto.randomUUID(),
      text,
      done: false,
      category,
      priority,
      createdAt: Date.now(),
    }]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const clearDone = () => setTodos(prev => prev.filter(t => !t.done));

  const filtered = useMemo(() => {
    let result = todos;
    
    // Status filter
    if (filter === "active") result = result.filter(t => !t.done);
    if (filter === "done") result = result.filter(t => t.done);
    
    // Category filter
    if (categoryFilter !== "all") result = result.filter(t => t.category === categoryFilter);
    
    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t => t.text.toLowerCase().includes(q));
    }
    
    // Sort
    if (sortBy === "priority") {
      const order = { high: 0, medium: 1, low: 2 };
      result = [...result].sort((a, b) => order[a.priority] - order[b.priority]);
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) => a.text.localeCompare(b.text));
    } else {
      result = [...result].sort((a, b) => b.createdAt - a.createdAt);
    }
    
    return result;
  }, [todos, filter, categoryFilter, search, sortBy]);

  const activeCount = todos.filter(t => !t.done).length;
  const doneCount = todos.filter(t => t.done).length;

  const stats = useMemo(() => {
    const byCat: Record<string, number> = {};
    const byPri: Record<string, number> = {};
    todos.forEach(t => {
      byCat[t.category] = (byCat[t.category] || 0) + 1;
      byPri[t.priority] = (byPri[t.priority] || 0) + 1;
    });
    return { byCat, byPri };
  }, [todos]);

  return (
    <div className="app">
      <header>
        <h1>Todo</h1>
        <div className="stats-row">
          <span className="stat">{activeCount} active</span>
          <span className="stat done-stat">{doneCount} done</span>
          <span className="stat">{todos.length} total</span>
        </div>
      </header>

      {/* Search */}
      <input
        type="search"
        className="search-input"
        placeholder="Search tasks..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Add todo */}
      <div className="input-row">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTodo()}
          autoFocus
        />
        <button className="add-btn" onClick={addTodo}>+</button>
      </div>

      {/* Category & Priority selectors */}
      <div className="options-row">
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={priority} onChange={e => setPriority(e.target.value as Todo["priority"])}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as "date" | "priority" | "name")}>
          <option value="date">Sort: Date</option>
          <option value="priority">Sort: Priority</option>
          <option value="name">Sort: Name</option>
        </select>
      </div>

      {/* Filters */}
      <div className="filters">
        {(["all", "active", "done"] as const).map(f => (
          <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Category filter pills */}
      <div className="category-pills">
        <button className={categoryFilter === "all" ? "active" : ""} onClick={() => setCategoryFilter("all")}>All</button>
        {CATEGORIES.map(c => (
          <button key={c} className={categoryFilter === c ? "active" : ""} onClick={() => setCategoryFilter(c)}>
            {c} ({stats.byCat[c] || 0})
          </button>
        ))}
      </div>

      {/* Todo list */}
      <ul className="todo-list">
        {filtered.length === 0 && (
          <li className="empty">
            {search ? "No matching tasks" : filter === "done" ? "No completed tasks" : "Add your first task"}
          </li>
        )}
        {filtered.map(todo => (
          <li key={todo.id} className={todo.done ? "done" : ""}>
            <button className="check" onClick={() => toggleTodo(todo.id)}>
              {todo.done ? "\u2713" : ""}
            </button>
            <div className="todo-content">
              <span className="text">{todo.text}</span>
              <div className="todo-meta">
                <span className="category-badge">{todo.category}</span>
                <span className="priority-dot" style={{ background: PRIORITY_COLORS[todo.priority] }} title={todo.priority} />
              </div>
            </div>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>\u00d7</button>
          </li>
        ))}
      </ul>

      {doneCount > 0 && (
        <button className="clear-btn" onClick={clearDone}>Clear {doneCount} completed</button>
      )}
    </div>
  );
}

export default App;
