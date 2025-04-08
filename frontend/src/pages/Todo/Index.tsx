import React, { useState } from "react";
import "./styles.css";
import { Todo, TodoStatus } from "../../types";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.title.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: newTodo.title.trim(),
          description: newTodo.description.trim(),
          status: TodoStatus.TODO,
        },
      ]);
      setNewTodo({ title: "", description: "" });
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <div className="todo-input-group">
          <input
            type="text"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            placeholder="Add a new todo title..."
            className="todo-input"
          />
          <input
            type="text"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            placeholder="Add description..."
            className="todo-input"
          />
        </div>
        <button type="submit" className="todo-button">
          Add Todo
        </button>
      </form>

      <ul className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className="todo-content">
                <div className="todo-info">
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <span className={`status-badge ${todo.status.toLowerCase()}`}>
                    {todo.status}
                  </span>
                </div>
                <div className="todo-actions">
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <h1>No todos yet</h1>
        )}
      </ul>
    </div>
  );
};

export default Index;
