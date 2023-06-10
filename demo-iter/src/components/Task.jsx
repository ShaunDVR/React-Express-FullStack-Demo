import React from "react";
import { Link } from "react-router-dom";

const Task = ({ task, handleDelete, completedTaskDisplayOption }) => {
  //First option for conditional Style
  const dynamicPriorityStyle =
    task.taskPriority === "High" ? "text-red-600" : "";

  return (
    <>
      {completedTaskDisplayOption || task.taskStatus !== "Done" ? (
        <div className=" mb-4  bg-slate-500  rounded-lg w-1/2 flex justify-center items-center">
          <div className="infoContainer">
            <h3>{task.taskTitle}</h3>
            <p>Task added on {task.taskAdded.substring(0, 10)}</p>
            <p className={dynamicPriorityStyle}>
              Priority: {task.taskPriority}{" "}
            </p>
            {/* Second option for conditional style */}
            <p
              className={`${
                task.taskStatus === "Done" ? "text-green-500" : ""
              } `}
            >
              Status: {task.taskStatus}
            </p>
          </div>
          <div className="buttonsContainer ml-8">
            <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link to={`/edit/${task.taskId}`}>✓</Link>
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8">
              <Link to={`/edit/${task.taskId}`}>Edit Task</Link>
            </button>
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
