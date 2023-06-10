import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TaskEdit = ({ task, onSubmit }) => {
  const [taskTitle, setTaskTitle] = useState("Your Title here...");
  const [taskPriority, setTaskPriority] = useState("Task Priority here...");
  const [taskStatus, setTaskStatus] = useState("Task Status here...");
  const formUse = useRef("");

  // useEffect to set initial form values and determine form usage
  useEffect(() => {
    if (task.taskTitle) {
      // If task details exist, set the form values accordingly
      setTaskTitle(task.taskTitle);
      setTaskPriority(task.taskPriority);
      setTaskStatus(task.taskStatus);
      formUse.current = "update";
    } else {
      // If task details don't exist, form is for creating a new task
      formUse.current = "create";
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedTask;

      if (!task.taskId) {
        // If taskId doesn't exist, it's a new task to be created
        updatedTask = {
          taskTitle: taskTitle,
          taskAdded: new Date(),
          taskPriority: taskPriority,
          taskStatus: taskStatus,
        };
        await onSubmit(updatedTask);
      } else {
        // If taskId exists, it's an existing task to be updated
        updatedTask = {
          ...task,
          taskTitle,
          taskPriority,
          taskStatus,
        };
        await onSubmit(task.taskId, updatedTask);
      }

      // Navigate back to the root page
      window.location.href = "/";
    } catch (error) {
      console.error("An error occurred during form submission:", error);
      // Handle the error or display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="taskTitle" className="text-white">
          Task Title:
        </label>
        <input
          type="text"
          id="taskTitle"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="taskPriority" className="text-white">
          Task Priority:
        </label>
        <input
          type="text"
          id="taskPriority"
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="taskStatus" className="text-white">
          Task Status:
        </label>
        <input
          type="text"
          id="taskStatus"
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-primary">
        {formUse.current === "update" ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskEdit;
