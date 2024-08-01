import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import TaskItem from "../../components/TaskItem";
import { Task } from "../../types";

describe("TaskItem", () => {
  const mockTask: Task = {
    id: 1,
    title: "Test Task",
    completed: false,
    userId: 1,
  };
  const mockToggleTask = jest.fn().mockResolvedValue(undefined);
  const mockDeleteTask = jest.fn().mockResolvedValue(undefined);

  it("renders correctly", () => {
    render(
      <TaskItem
        task={mockTask}
        toggleTask={mockToggleTask}
        deleteTask={mockDeleteTask}
      />
    );
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /toggle/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("calls toggleTask when Toggle button is clicked", async () => {
    render(
      <TaskItem
        task={mockTask}
        toggleTask={mockToggleTask}
        deleteTask={mockDeleteTask}
      />
    );
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /toggle/i }));
    });
    expect(mockToggleTask).toHaveBeenCalledWith(1);
  });

  it("calls deleteTask when Delete button is clicked", async () => {
    render(
      <TaskItem
        task={mockTask}
        toggleTask={mockToggleTask}
        deleteTask={mockDeleteTask}
      />
    );
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    });
    expect(mockDeleteTask).toHaveBeenCalledWith(1);
  });
});
