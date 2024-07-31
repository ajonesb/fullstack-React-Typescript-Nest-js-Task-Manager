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
    <li className="flex items-center justify-between p-2 border-b">
      <span className={task.completed ? "line-through" : ""}>{task.title}</span>
      <div>
        <button
          onClick={handleToggle}
          disabled={isUpdating}
          className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
        >
          {isUpdating ? "Updating..." : "Toggle"}
        </button>
        <button
          onClick={handleDelete}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </li>
  );
};

export default TaskItem;
