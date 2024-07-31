import { useState, useEffect } from "react";
import { Task } from "../types";
import { taskService } from "../services/taskService";
import { useAuth } from "./useAuth";
import { api } from "../services/api";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;
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
  };

  const addTask = async (title: string) => {
    if (!user) return;
    try {
      const { data } = await taskService.createTask({
        title,
        completed: false,
        userId: user.id,
      });
      setTasks([...tasks, data]);
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const toggleTask = async (id: number) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      const { data } = await taskService.updateTask(id, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t.id === id ? data : t)));
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  return { tasks, loading, error, addTask, toggleTask, deleteTask };
}
