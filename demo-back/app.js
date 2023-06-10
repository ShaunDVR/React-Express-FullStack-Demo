const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// CORS setup
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the frontend URL
    allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Sample tasks data
let tasks = [
  {
    taskId: 1,
    taskTitle: "Task 1",
    taskAdded: "07/06/2023",
    taskPriority: "High",
    taskStatus: "Doing",
  },
  {
    taskId: 2,
    taskTitle: "Task 2",
    taskAdded: "08/06/2023",
    taskPriority: "Medium",
    taskStatus: "To Do",
  },
];

// GET /api/tasks - Get all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// GET /api/task/:taskId - Get a single task
app.get("/api/task/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const task = tasks.find((t) => t.taskId === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// POST /api/tasks - Create a new task
app.post("/api/tasks", (req, res) => {
  const taskData = req.body;
  const newTaskId = tasks.length + 1;
  const newTask = { taskId: newTaskId, ...taskData };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// PUT /api/tasks/:taskId - Update a task
app.put("/api/tasks/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const taskData = req.body;
  const taskIndex = tasks.findIndex((t) => t.taskId === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// DELETE /api/tasks/:taskId - Delete a task
app.delete("/api/tasks/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const taskIndex = tasks.findIndex((t) => t.taskId === taskId);

  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1);
    res.json(deletedTask[0]);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
