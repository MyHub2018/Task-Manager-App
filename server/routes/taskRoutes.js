const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.use(authenticate);

router.get("/", getTasks);
router.post('/', createTask); // Changed from '/tasks/new' to '/'
router.put('/:id', updateTask); // Changed from '/tasks/:id' to '/:id'
router.delete("/:id", deleteTask);

module.exports = router;
