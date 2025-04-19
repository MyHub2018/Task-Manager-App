import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks.");
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>My Tasks</h2>
        <button onClick={() => navigate("/task/new")}>+ Add Task</button>
      </div>
      <div className="task-grid">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
