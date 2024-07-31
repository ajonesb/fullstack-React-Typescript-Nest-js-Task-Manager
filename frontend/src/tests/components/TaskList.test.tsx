import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskList from "../../components/TaskList";

const mockTasks = [
  { id: 1, title: "Task 1", completed: false, userId: 1 },
  { id: 2, title: "Task 2", completed: true, userId: 1 },
];

describe("TaskList", () => {
  it("renders tasks correctly", () => {
    const mockToggleTask = jest.fn();
    const mockDeleteTask = jest.fn();
    render(
      <TaskList
        tasks={mockTasks}
        toggleTask={mockToggleTask}
        deleteTask={mockDeleteTask}
      />
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getAllByText("Toggle")).toHaveLength(2);
    expect(screen.getAllByText("Delete")).toHaveLength(2);
  });

  it("calls toggleTask when Toggle button is clicked", () => {
    const mockToggleTask = jest.fn();
    const mockDeleteTask = jest.fn();
    render(
      <TaskList
        tasks={mockTasks}
        toggleTask={mockToggleTask}
        deleteTask={mockDeleteTask}
      />
    );

    fireEvent.click(screen.getAllByText("Toggle")[0]);
    expect(mockToggleTask).toHaveBeenCalledWith(1);
  });

  it("calls deleteTask when Delete button is clicked", () => {
    const mockToggleTask = jest.fn();
    const mockDeleteTask = jest.fn();
    render(
      <TaskList
        tasks={mockTasks}
        toggleTask={mockToggleTask}
        deleteTask={mockDeleteTask}
      />
    );

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(mockDeleteTask).toHaveBeenCalledWith(1);
  });
});
