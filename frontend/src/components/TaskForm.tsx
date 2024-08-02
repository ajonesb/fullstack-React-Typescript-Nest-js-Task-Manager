import React, { useState } from "react";

interface TaskFormProps {
  addTask: (title: string) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }
    setError("");
    await addTask(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new task"
        className="mr-2 p-2 border rounded"
        data-testid="task-input"
      />
      <button
        data-testid="add-task-button"
        type="submit"
        className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-base rounded"
      >
        ADD TASK
      </button>
      {error && (
        <p className="text-red-500 mt-2" data-testid="task-error">
          {error}
        </p>
      )}
    </form>
  );
};

export default TaskForm;
