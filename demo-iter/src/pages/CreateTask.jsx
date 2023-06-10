import React from "react";
import TaskEdit from "../components/TaskEdit";
import TaskService from "../services/taskService";

export const CreateTask = () => {
  return (
    <div className="">
      <h3 className="text-white">Create New Task</h3>
      <TaskEdit task={{}} onSubmit={TaskService.createTask}></TaskEdit>
    </div>
  );
};
