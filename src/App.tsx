import { useState, useEffect } from "react";

interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos(prev => [...prev, { id: crypto.randomUUID(), text, done: false, createdAt: Date.now() }]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const clearDone = () => setTodos(prev => prev.filter(t => !t.done));

  const filtered = todos.filter(t => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const activeCount = todos.filter(t => !t.done).length;

  return (
    <div className="app">
      <header>
        <h1>Todo</h1>
        <p className="subtitle">{activeCount} task{activeCount !== 1 ? "s" : ""} remaining</p>
      </header>

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

      <div className="filters">
        {(["all", "active", "done"] as const).map(f => (
          <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="todo-list">
        {filtered.length === 0 && (
          <li className="empty">
            {filter === "done" ? "No completed tasks" : filter === "active" ? "All done!" : "Add your first task"}
          </li>
        )}
        {filtered.map(todo => (
          <li key={todo.id} className={todo.done ? "done" : ""}>
            <button className="check" onClick={() => toggleTodo(todo.id)}>
              {todo.done ? "\u2713" : ""}
            </button>
            <span className="text">{todo.text}</span>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>\u00d7</button>
          </li>
        ))}
      </ul>

      {todos.some(t => t.done) && (
        <button className="clear-btn" onClick={clearDone}>Clear completed</button>
      )}
    </div>
  );
}

export default App;
