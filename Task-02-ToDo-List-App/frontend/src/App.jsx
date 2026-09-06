import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setError("");

      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setError("Unable to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (event) => {
    event.preventDefault();

    if (!task.trim()) {
      setError("Please enter a task.");
      return;
    }

    try {
      setAdding(true);
      setError("");

      const response = await axios.post(`${API_URL}/add`, {
        text: task.trim(),
      });

      setTasks((currentTasks) => [response.data, ...currentTasks]);
      setTask("");
    } catch (error) {
      console.error("Failed to add task:", error);
      setError("Unable to add task. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const deleteTask = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await axios.delete(`${API_URL}/tasks/${id}`);

      setTasks((currentTasks) =>
        currentTasks.filter((item) => item._id !== id),
      );
    } catch (error) {
      console.error("Failed to delete task:", error);
      setError("Unable to delete task. Please try again.");
    }
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>To-Do List</h1>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(event) => setTask(event.target.value)}
          />

          <button type="submit" disabled={adding}>
            {adding ? "Adding..." : "Add Task"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="task-list">
          <h2>Tasks</h2>

          {loading ? (
            <p className="status-message">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="status-message">No tasks yet.</p>
          ) : (
            tasks.map((item) => (
              <div className="task-item" key={item._id}>
                <span>{item.text}</span>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(item._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
