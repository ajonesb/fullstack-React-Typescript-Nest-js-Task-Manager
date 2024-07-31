import { api } from './api';
import { Task } from '../types';

export const taskService = {
  getTasks: (userId: number) => api.get<Task[]>(`/tasks/${userId}`),
  createTask: (task: Omit<Task, 'id'>) => api.post<Task>('/tasks', task),
  updateTask: (id: number, task: Partial<Task>) => api.put<Task>(`/tasks/${id}`, task),
  deleteTask: (id: number) => api.delete(`/tasks/${id}`),
};
