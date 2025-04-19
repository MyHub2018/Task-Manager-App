// server/controllers/taskController.js

const pool = require("../models/db");

// ✅ Get all tasks for a user
const getTasks = async (req, res) => {
  const userId = req.userId;
  const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
  res.json(tasks.rows);
};

// ✅ Create a new task
const createTask = async (req, res) => {
  const { title, description, due_date } = req.body;
  const userId = req.userId;
  await pool.query(
    "INSERT INTO tasks (user_id, title, description, due_date) VALUES ($1, $2, $3, $4)",
    [userId, title, description, due_date]
  );
  res.status(201).json({ message: "Task created" });
};

// ✅ Update a task
const updateTask = async (req, res) => {
  const { title, description, is_done, due_date } = req.body;
  let { id } = req.params;

  id = parseInt(id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  try {
    await pool.query(
      "UPDATE tasks SET title=$1, description=$2, is_done=$3, due_date=$4 WHERE id=$5",
      [title, description, is_done, due_date, id]
    );
    res.json({ message: "Task updated" });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
};

// ✅ Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
  res.json({ message: "Task deleted" });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
