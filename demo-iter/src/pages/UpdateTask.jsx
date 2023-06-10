import React, { useEffect, useState } from "react";
import TaskService from "../services/taskService";
import { useParams } from "react-router-dom";
import TaskEdit from "../components/TaskEdit";

export const UpdateTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({});

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        let response = await TaskService.getTask(taskId);
        setTask(response.data);
      } catch (err) {
        setTask({
          taskId: 3,
          taskTitle: "This is not a real task",
          taskAdded: "09/06/2222",
          taskPriority: "Super High",
          taskStatus: "to do",
        });
        console.log("No task found with that ID or server error", err);
      }
    };
    fetchTaskDetails();
  }, []);

  return (
    <div>
      <h3 className="text-white">Edit Task</h3>
      <TaskEdit task={task} onSubmit={TaskService.updateTask}></TaskEdit>
    </div>
  );
};
