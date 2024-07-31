import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskItem from "../../components/TaskItem";
import { Task } from "../../types";

describe("TaskItem", () => {
  const mockTask: Task = {
    id: 1,
    title: "Test Task",
    completed: false,
    userId: 1,
  };

  const mockToggleTask = jest.fn();
  const mockDeleteTask = jest.fn();

  beforeEach(() => {
    render(
      <TaskItem
        task={mockTask}
        toggleTask={mockToggleTask}
        deleteTask={mockDeleteTask}
      />
    );
  });

  it("renders the task title", () => {
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("calls toggleTask when Toggle button is clicked", () => {
    fireEvent.click(screen.getByTestId("toggle-task"));
    expect(mockToggleTask).toHaveBeenCalledWith(1);
  });

  it("calls deleteTask when Delete button is clicked", () => {
    fireEvent.click(screen.getByTestId("delete-task"));
    expect(mockDeleteTask).toHaveBeenCalledWith(1);
  });

  it("applies line-through style when task is completed", () => {
    const completedTask: Task = { ...mockTask, completed: true };
    render(
      <TaskItem
        task={completedTask}
        toggleTask={mockToggleTask}
        deleteTask={mockDeleteTask}
      />
    );
    const taskText = screen.getByText("Test Task");
    expect(taskText).toHaveClass("line-through");
  });
});
