import React from "react";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleTask,
  deleteTask,
}) => {
  return (
    <li
      className="flex items-center justify-between p-2 border-b"
      data-testid="task-item"
    >
      <span className={task.completed ? "line-through" : ""}>{task.title}</span>
      <div>
        <button
          onClick={() => toggleTask(task.id)}
          className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
          data-testid="toggle-task"
        >
          Toggle
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="px-2 py-1 bg-red-500 text-white rounded"
          data-testid="delete-task"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
