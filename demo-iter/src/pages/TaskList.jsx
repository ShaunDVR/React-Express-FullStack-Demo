import React, { useEffect, useState } from "react";
import TaskService from "../services/taskService";
import Task from "../components/Task";
import { Link } from "react-router-dom";

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTaskDisplayOption, setCompletedTaskDisplayOption] =
    useState(false);

  // useEffect to fetch tasks from backend or fallback to exampleTasks.json
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await TaskService.getAllTasks();
        setTasks(response.data);
      } catch {
        // Using dynamic import to load exampleTasks.json
        import("../data/exampleTasks.json")
          .then((data) => {
            setTasks(data.tasks);
          })
          .catch((error) => {
            console.error("Error importing exampleTasks.json:", error);
          });
      }
    };

    fetchTasks();

    return () => {
      setTasks([]);
    };
  }, []);

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="bg-slate-500 w-1/2 mb-4">My Task List</div>

      {/* Buttons for creating tasks and toggling completed task display */}
      <div className="flex mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8">
          <Link to={"/create"}>Create Task</Link>
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8"
          onClick={() => setCompletedTaskDisplayOption((prev) => !prev)}
        >
          Show Completed Tasks
        </button>
      </div>

      {/* Rendering tasks using the Task component */}
      {tasks.map((task) => {
        return (
          <Task
            key={task.taskId}
            task={task}
            handleDelete={() => TaskService.deleteTask(task.taskId)}
            completedTaskDisplayOption={completedTaskDisplayOption}
          />
        );
      })}
    </div>
  );
};
