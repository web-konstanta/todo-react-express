import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { TodoService } from "../../api/todo";
import { Todo, TodoStatus } from "../../types";
import "./styles.css";

const EditTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await TodoService.getById(Number(id));
      setTodo(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch todo");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo || !id) return;

    try {
      setLoading(true);
      await TodoService.update(Number(id), {
        title: todo.title,
        description: todo.description,
        status: todo.status,
      });
      navigate("/todo");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update todo");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!todo) return;
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  if (loading) return <div className="todo-loading">Loading...</div>;
  if (error) return <div className="todo-error">{error}</div>;
  if (!todo) return <div className="todo-error">Todo not found</div>;

  console.log(todo);
  
  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Edit Todo</h1>
        <button onClick={() => navigate("/todo")} className="back-button">
          Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="todo-form edit-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={todo.title}
            onChange={handleChange}
            className="todo-input"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={todo.description}
            onChange={handleChange}
            className="todo-textarea"
            disabled={loading}
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={todo.status}
            onChange={handleChange}
            className="status-select"
            disabled={loading}
          >
            {Object.values(TodoStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="todo-button" disabled={loading}>
            {loading ? "Updating..." : "Update Todo"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/todo")}
            className="cancel-button"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
