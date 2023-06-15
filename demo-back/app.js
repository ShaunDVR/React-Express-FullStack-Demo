const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/taskdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define task schema
const taskSchema = new mongoose.Schema({
  taskId: Number,
  taskTitle: String,
  taskAdded: String,
  taskPriority: String,
  taskStatus: String,
  comments: [
    {
      id: Number,
      author: String,
      date: String,
      text: String,
    },
  ],
});

// Create task model
const Task = mongoose.model("Task", taskSchema);

// Function to initialize dummy data
const initializeDummyData = () => {
  const dummyData = [
    {
      taskId: 1,
      taskTitle: "Eat",
      taskAdded: "07/06/2023",
      taskPriority: "High",
      taskStatus: "Doing",
      comments: [
        { id: 1, author: "John", date: "07/06/2023", text: "Great task!" },
        { id: 2, author: "Jane", date: "08/06/2023", text: "Keep it up!" },
      ],
    },
    {
      taskId: 2,
      taskTitle: "Sleep",
      taskAdded: "08/06/2023",
      taskPriority: "Medium",
      taskStatus: "To Do",
      comments: [
        {
          id: 1,
          author: "Mark",
          date: "08/06/2023",
          text: "Interesting task.",
        },
      ],
    },
    {
      taskId: 3,
      taskTitle: "Repeat",
      taskAdded: "06/06/2023",
      taskPriority: "Medium",
      taskStatus: "Done",
      comments: [
        { id: 1, author: "Sarah", date: "06/06/2023", text: "Well done!" },
        { id: 2, author: "Mike", date: "07/06/2023", text: "Impressive work!" },
      ],
    },
  ];

  Task.insertMany(dummyData)
    .then((savedTasks) => {
      console.log("Tasks saved:", savedTasks);
    })
    .catch((error) => {
      console.error("Failed to save tasks:", error);
    });
};

// Initialize dummy data on server start
initializeDummyData();

// Shutdown handler to clear the database
const shutdownHandler = () => {
  mongoose.connection.db
    .dropDatabase()
    .then(() => {
      console.log("Database cleared successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Failed to clear the database:", error);
    });
};

// Graceful shutdown on SIGINT signal
process.on("SIGINT", () => {
  console.log("Shutting down server...");

  // Call the shutdown handler
  shutdownHandler();
});

// GET /api/tasks - Get all tasks
app.get("/api/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch tasks" });
    });
});

// GET /api/task/:taskId - Get a single task
app.get("/api/task/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  Task.findOne({ taskId: taskId })
    .then((task) => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch task" });
    });
});

// GET /api/tasks/:taskId/comments - Get all comments for a task
app.get("/api/tasks/:taskId/comments", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  Task.findOne({ taskId: taskId })
    .then((task) => {
      if (task) {
        res.json(task.comments);
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch comments" });
    });
});

// GET /api/tasks/:taskId/comments/:commentId - Get a single comment by ID
app.get("/api/tasks/:taskId/comments/:commentId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const commentId = parseInt(req.params.commentId);
  Task.findOne({ taskId: taskId })
    .then((task) => {
      if (task) {
        const comment = task.comments.find((c) => c.id === commentId);
        if (comment) {
          res.json(comment);
        } else {
          res.status(404).json({ error: "Comment not found" });
        }
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch comment" });
    });
});

// POST /api/tasks - Create a new task
app.post("/api/tasks", (req, res) => {
  const taskData = req.body;
  const newTask = new Task({
    ...taskData,
    comments: [],
  });

  newTask
    .save()
    .then((savedTask) => {
      res.status(201).json(savedTask);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create task" });
    });
});

// PUT /api/tasks/:taskId - Update a task
app.put("/api/tasks/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const taskData = req.body;

  Task.findOneAndUpdate({ taskId: taskId }, taskData, { new: true })
    .then((updatedTask) => {
      if (updatedTask) {
        res.json(updatedTask);
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update task" });
    });
});

// DELETE /api/tasks/:taskId - Delete a task
app.delete("/api/tasks/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId);

  Task.findOneAndDelete({ taskId: taskId })
    .then((deletedTask) => {
      if (deletedTask) {
        res.json(deletedTask);
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete task" });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
