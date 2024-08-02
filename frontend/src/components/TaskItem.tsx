import React, { useState } from "react";
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
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    setIsUpdating(true);
    setError(null);
    try {
      await toggleTask(task.id);
    } catch (err) {
      setError("Failed to update task");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setError(null);
    try {
      await deleteTask(task.id);
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  return (
    <li className="flex items-center justify-between p-2 border-b border-zinc-400	text-lg p-5">
      <span className={task.completed ? "line-through" : ""}>{task.title}</span>
      <div>
        <button
          data-testid="toggle-task"
          onClick={handleToggle}
          disabled={isUpdating}
          className="mr-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold	text-base	rounded"
        >
          {isUpdating ? "Updating..." : "TOGGLE"}
        </button>
        <button
          data-testid="delete-task"
          onClick={handleDelete}
          className="px-2 py-2 bg-gradient-to-r bg-red-500 text-white font-bold	text-base rounded"
        >
          DELETE
        </button>
      </div>
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </li>
  );
};

export default TaskItem;
