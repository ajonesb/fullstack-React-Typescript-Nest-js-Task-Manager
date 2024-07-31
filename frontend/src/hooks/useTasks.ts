import { useState, useCallback } from "react";
import { Task } from "../types";
import { api } from "../services/api";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Task[]>("/tasks");
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (title: string) => {
    try {
      const { data } = await api.post<Task>("/tasks", { title });
      setTasks([...tasks, data]);
    } catch (err) {
      console.error("Failed to add task", err);
      if ((err as any).response) {
        console.error("Error response:", (err as any).response.data);
      }
      setError("Failed to add task");
    }
  };

  const toggleTask = async (id: number) => {
    try {
      const taskToToggle = tasks.find((task) => task.id === id);
      if (!taskToToggle) throw new Error("Task not found");

      const { data } = await api.patch<Task>(`/tasks/${id}`, {
        completed: !taskToToggle.completed,
      });
      setTasks(tasks.map((task) => (task.id === id ? data : task)));
    } catch (err) {
      console.error("Failed to update task", err);
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task", err);
      setError("Failed to delete task");
    }
  };

  return { tasks, loading, error, addTask, toggleTask, deleteTask, fetchTasks };
}
