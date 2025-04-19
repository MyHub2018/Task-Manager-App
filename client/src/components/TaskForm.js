import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TaskForm = () => {
  const { id } = useParams();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (id) {
      // Fetch existing task data for editing
      axios
        .get(`/tasks/${id}`)
        .then((response) => {
          setTask({
            title: response.data.title,
            description: response.data.description,
            dueDate: response.data.due_date,
          });
        })
        .catch((error) => console.error("Error fetching task:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing task
        await axios.put(`/tasks/${id}`, task);
        console.log("Task updated:", task);
      } else {
        // Create new task
        await axios.post("/tasks", task);
        console.log("Task created:", task);
      }
      // Redirect or update UI as needed
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        required
      />
      <button type="submit">{id ? "Update Task" : "Create Task"}</button>
    </form>
  );
};

export default TaskForm;
