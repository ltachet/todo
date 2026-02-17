"use client";

import { FormEvent, useMemo, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type Filter = "all" | "active" | "done";

const initialTodos: Todo[] = [
  { id: 1, title: "Outline weekly priorities", completed: true },
  { id: 2, title: "Review pull requests", completed: false },
  { id: 3, title: "Plan tomorrow's tasks", completed: false }
];

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const completedCount = todos.filter((todo) => todo.completed).length;
  const progress = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  const visibleTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === "done") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [filter, todos]);

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = newTodo.trim();
    if (!value) {
      return;
    }

    setTodos((current) => [{ id: Date.now(), title: value, completed: false }, ...current]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const removeTodo = (id: number) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return (
    <section className="todo-card">
      <div className="stats">
        <div>
          <strong>{todos.length}</strong>
          <span>Total</span>
        </div>
        <div>
          <strong>{completedCount}</strong>
          <span>Done</span>
        </div>
        <div>
          <strong>{todos.length - completedCount}</strong>
          <span>Remaining</span>
        </div>
      </div>

      <div className="progress">
        <span>{progress}% complete</span>
        <div aria-hidden="true" className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <form className="add-form" onSubmit={addTodo}>
        <input
          aria-label="Task title"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters" role="tablist" aria-label="Task filter">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
          type="button"
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
          type="button"
        >
          Active
        </button>
        <button
          className={filter === "done" ? "active" : ""}
          onClick={() => setFilter("done")}
          type="button"
        >
          Done
        </button>
      </div>

      <ul className="todo-list">
        {visibleTodos.length === 0 ? (
          <li className="empty">No tasks for this view.</li>
        ) : (
          visibleTodos.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  type="checkbox"
                />
                <span className={todo.completed ? "done" : ""}>{todo.title}</span>
              </label>
              <button onClick={() => removeTodo(todo.id)} type="button">
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
