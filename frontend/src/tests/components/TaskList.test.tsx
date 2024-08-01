import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "../../components/TaskList";

describe("TaskList", () => {
  const mockTasks = [
    { id: 1, title: "Task 1", completed: false, userId: 1 },
    { id: 2, title: "Task 2", completed: true, userId: 1 },
  ];
  const mockToggleTask = jest.fn();
  const mockDeleteTask = jest.fn();

  it("renders tasks correctly", () => {
    render(
      <TaskList
        tasks={mockTasks}
        toggleTask={mockToggleTask}
        deleteTask={mockDeleteTask}
      />
    );
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("displays message when there are no tasks", () => {
    render(
      <TaskList
        tasks={[]}
        toggleTask={mockToggleTask}
        deleteTask={mockDeleteTask}
      />
    );
    expect(
      screen.getByText("There are no tasks. Please add a task.")
    ).toBeInTheDocument();
  });
});
