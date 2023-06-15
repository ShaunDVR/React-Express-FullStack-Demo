import React, { useEffect, useState } from "react";
import TaskService from "../services/taskService";
import Task from "../components/Task";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTaskDisplayOption, setCompletedTaskDisplayOption] =
    useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await TaskService.getAllTasks();
        setTasks(response.data);
      } catch {
        import("../data/exampleTasks.json")
          .then((data) => {
            setTasks(data.tasks);
          })
          .catch((error) => {
            console.error("Error importing exampleTasks.json:", error);
          });
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
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

      {loading ? (
        <div className="flex justify-center items-center">
          <BarLoader color="#123abc" loading={true} />
        </div>
      ) : (
        tasks.map((task) => (
          <Task
            key={task.taskId}
            task={task}
            handleDelete={() => TaskService.deleteTask(task.taskId)}
            completedTaskDisplayOption={completedTaskDisplayOption}
          />
        ))
      )}
    </div>
  );
};
