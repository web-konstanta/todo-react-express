import React, { useEffect } from "react";
import "./styles.css";
import { Todo } from "../../types";
import { AuthService } from "../../api/auth";
import { TodoService } from "../../api/todo";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router";
import { useTodos } from "../../hooks/useTodos";

const Index = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const { todos, setTodos, loading, setLoading, error, setError, fetchTodos } =
    useTodos();

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.title.trim()) {
      try {
        setLoading(true);
        const todo = await TodoService.create({
          title: newTodo.title.trim(),
          description: newTodo.description.trim(),
        });
        await fetchTodos();
        setNewTodo({ title: "", description: "" });
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to create todo");
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      setLoading(true);
      await TodoService.delete(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete todo");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuth(false);
    navigate("/sign-in");
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Todo List</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {error && <div className="todo-error">{error}</div>}

      <form onSubmit={handleSubmit} className="todo-form">
        <div className="todo-input-group">
          <input
            type="text"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            placeholder="Add a new todo title..."
            className="todo-input"
            disabled={loading}
          />
          <input
            type="text"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            placeholder="Add description..."
            className="todo-input"
            disabled={loading}
          />
        </div>
        <button type="submit" className="todo-button" disabled={loading}>
          {loading ? "Adding..." : "Add Todo"}
        </button>
      </form>

      {loading && <div className="todo-loading">Loading...</div>}

      <ul className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className="todo-content">
                <div className="todo-info">
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <span
                    className={`status-badge ${todo.status?.toLowerCase()}`}
                  >
                    {todo.status}
                  </span>
                </div>
                <div className="todo-actions">
                  <button
                    onClick={() => navigate(`/todo/${todo.id}`)}
                    className="edit-button"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-button"
                    disabled={loading}
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
