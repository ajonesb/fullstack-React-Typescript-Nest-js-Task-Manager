import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Home from "../../pages/Home";
import { useAuth } from "../../hooks/useAuth";
import { useTasks } from "../../hooks/useTasks";

// Mock the hooks
jest.mock("../../hooks/useAuth");
jest.mock("../../hooks/useTasks");

describe("TaskManagement Integration", () => {
  const mockUser = { id: 1, username: "testuser" };
  const mockTasks = [
    { id: 1, title: "Task 1", completed: false, userId: 1 },
    { id: 2, title: "Task 2", completed: true, userId: 1 },
  ];

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    });

    (useTasks as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      loading: false,
      error: null,
      addTask: jest.fn(),
      toggleTask: jest.fn(),
      deleteTask: jest.fn(),
    });
  });

  it("renders the task management system when user is logged in", () => {
    render(<Home />);
    expect(screen.getByText("Task Management System")).toBeInTheDocument();
    expect(
      screen.getByText(`Welcome, ${mockUser.username}!`)
    ).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("allows adding a new task", async () => {
    const mockAddTask = jest.fn();
    (useTasks as jest.Mock).mockReturnValue({
      ...useTasks(),
      addTask: mockAddTask,
    });

    render(<Home />);

    const input = screen.getByPlaceholderText("Enter a new task");
    const addButton = screen.getByRole("button", { name: "Add Task" });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith("New Task");
    });
  });

  it("allows toggling a task", async () => {
    const mockToggleTask = jest.fn();
    (useTasks as jest.Mock).mockReturnValue({
      ...useTasks(),
      toggleTask: mockToggleTask,
    });

    render(<Home />);

    const toggleButtons = screen.getAllByText("Toggle");
    fireEvent.click(toggleButtons[0]);

    await waitFor(() => {
      expect(mockToggleTask).toHaveBeenCalledWith(1);
    });
  });

  it("allows deleting a task", async () => {
    const mockDeleteTask = jest.fn();
    (useTasks as jest.Mock).mockReturnValue({
      ...useTasks(),
      deleteTask: mockDeleteTask,
    });

    render(<Home />);

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockDeleteTask).toHaveBeenCalledWith(1);
    });
  });

  it("shows login form when user is not logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({
      ...useAuth(),
      user: null,
    });

    render(<Home />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Need to register? Sign up")).toBeInTheDocument();
    expect(screen.queryByText("Welcome")).not.toBeInTheDocument();
  });

  it("allows user to log out", () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      ...useAuth(),
      logout: mockLogout,
    });

    render(<Home />);

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});
