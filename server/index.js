const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// ✅ JSON Body Parser Middleware
app.use(cors());
app.use(express.json()); // This is the correct middleware

// Connect to DB
const pool = require("./models/db");

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch((err) => console.error("❌ Failed to connect to DB:", err));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API");
});

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
