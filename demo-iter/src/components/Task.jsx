import React from "react";
import { Link } from "react-router-dom";

const Task = ({ task, handleDelete, completedTaskDisplayOption }) => {
  // Conditional style based on task priority
  const dynamicPriorityStyle =
    task.taskPriority === "High" ? "text-red-600" : "";

  return (
    <>
      {/* Conditionally render the task based on completedTaskDisplayOption */}
      {completedTaskDisplayOption || task.taskStatus !== "Done" ? (
        <div className="mb-4 bg-slate-500 rounded-lg w-1/2 flex justify-center items-center">
          <div className="infoContainer">
            <h3>{task.taskTitle}</h3>
            <p>Task added on {task.taskAdded.substring(0, 10)}</p>
            <p className={dynamicPriorityStyle}>
              Priority: {task.taskPriority}
            </p>
            {/* Conditionally style the task status */}
            <p
              className={`${
                task.taskStatus === "Done" ? "text-green-500" : ""
              }`}
            >
              Status: {task.taskStatus}
            </p>
          </div>
          <div className="buttonsContainer ml-8">
            {/* Link to mark task as complete */}
            <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link to={`/edit/${task.taskId}`}>✓</Link>
            </button>
            {/* Link to edit task */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8">
              <Link to={`/edit/${task.taskId}`}>Edit Task</Link>
            </button>
            {/* Button to delete task */}
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8"
              onClick={handleDelete}
            >
              Delete Task
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Task;
