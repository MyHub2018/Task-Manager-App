import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddEditTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // task id if we're in edit mode

  // Load task details if in edit mode
  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setTitle(res.data.title || "");
          setDescription(res.data.description || "");
          setDueDate(res.data.due_date ? res.data.due_date.slice(0, 10) : "");
        } catch (err) {
          console.error("Failed to fetch task:", err);
        }
      };
      fetchTask();
    }
  }, [id]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { title, description, due_date: dueDate };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      if (id) {
        await axios.put(`http://localhost:5000/tasks/${id}`, payload, config);
      } 
      else {
        // Create new task
        await axios.post('http://localhost:5000/tasks', payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Task submission failed:", err);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Task" : "Add New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit">{id ? "Update Task" : "Create Task"}</button>
      </form>
    </div>
  );
}

export default AddEditTask;
