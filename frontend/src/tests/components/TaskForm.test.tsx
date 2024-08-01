import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import TaskForm from '../../components/TaskForm';

describe('TaskForm', () => {
  it('renders correctly', () => {
    const mockAddTask = jest.fn();
    render(<TaskForm addTask={mockAddTask} />);
    expect(screen.getByPlaceholderText('Enter a new task')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('calls addTask when form is submitted', async () => {
    const mockAddTask = jest.fn().mockResolvedValue(undefined);
    render(<TaskForm addTask={mockAddTask} />);
    const input = screen.getByPlaceholderText('Enter a new task');
    const button = screen.getByRole('button', { name: /add task/i });

    await act(async () => {
      fireEvent.change(input, { target: { value: 'New Task' } });
      fireEvent.click(button);
    });

    expect(mockAddTask).toHaveBeenCalledWith('New Task');
  });
});