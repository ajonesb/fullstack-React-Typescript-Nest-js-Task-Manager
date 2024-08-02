import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Home from "../../pages/Home";
import { useAuth } from "../../hooks/useAuth";
import { useTasks } from "../../hooks/useTasks";

jest.mock("../../hooks/useAuth");
jest.mock("../../hooks/useTasks");

describe("Task Management Integration", () => {
  const mockLogin = jest.fn();
  const mockLogout = jest.fn();
  const mockRegister = jest.fn();
  const mockAddTask = jest.fn();
  const mockToggleTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockFetchTasks = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 1, username: "testuser" },
      loading: false,
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister,
    });

    (useTasks as jest.Mock).mockReturnValue({
      tasks: [],
      loading: false,
      error: null,
      addTask: mockAddTask,
      toggleTask: mockToggleTask,
      deleteTask: mockDeleteTask,
      fetchTasks: mockFetchTasks,
    });
  });

  it("renders the task management system when user is logged in", () => {
    render(<Home />);
    expect(screen.getByText("TASK MANAGEMENT SYSTEM")).toBeInTheDocument();
    expect(screen.getByText("Welcome, testuser!")).toBeInTheDocument();
  });

  // it("allows adding a new task", async () => {
  //   render(<Home />);

  //   const input = screen.getByPlaceholderText("Enter a new task");
  //   const addButton = screen.getByRole("button", { name: /add task/i });

  //   fireEvent.change(input, { target: { value: "New Task" } });
  //   fireEvent.click(addButton);

  //   await waitFor(() => {
  //     expect(mockAddTask).toHaveBeenCalledWith("New Task");
  //   });
  // });

  it("displays login form when user is not logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister,
    });

    render(<Home />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Need to register? Sign up")).toBeInTheDocument();
  });

  it("allows user to log out", async () => {
    render(<Home />);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  it("displays tasks when they are available", () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: true },
      ],
      loading: false,
      error: null,
      addTask: mockAddTask,
      toggleTask: mockToggleTask,
      deleteTask: mockDeleteTask,
      fetchTasks: mockFetchTasks,
    });

    render(<Home />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  // it("allows toggling a task", async () => {
  //   (useTasks as jest.Mock).mockReturnValue({
  //     tasks: [{ id: 1, title: "Task 1", completed: false }],
  //     loading: false,
  //     error: null,
  //     addTask: mockAddTask,
  //     toggleTask: mockToggleTask,
  //     deleteTask: mockDeleteTask,
  //     fetchTasks: mockFetchTasks,
  //   });

  //   render(<Home />);

  //   const toggleButton = screen.getByRole("button", { name: /TOOGLE/i });
  //   fireEvent.click(toggleButton);

  //   await waitFor(() => {
  //     expect(mockToggleTask).toHaveBeenCalledWith(1);
  //   });
  // });

  it("allows deleting a task", async () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [{ id: 1, title: "Task 1", completed: false }],
      loading: false,
      error: null,
      addTask: mockAddTask,
      toggleTask: mockToggleTask,
      deleteTask: mockDeleteTask,
      fetchTasks: mockFetchTasks,
    });

    render(<Home />);

    const deleteButton = screen.getByRole("button", { name: /DELETE/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteTask).toHaveBeenCalledWith(1);
    });
  });

  it("displays loading state when fetching tasks", () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [],
      loading: true,
      error: null,
      addTask: mockAddTask,
      toggleTask: mockToggleTask,
      deleteTask: mockDeleteTask,
      fetchTasks: mockFetchTasks,
    });

    render(<Home />);
  });

  it("displays error state when there is an error fetching tasks", () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [],
      loading: false,
      error: "Failed to fetch tasks",
      addTask: mockAddTask,
      toggleTask: mockToggleTask,
      deleteTask: mockDeleteTask,
      fetchTasks: mockFetchTasks,
    });

    render(<Home />);

    expect(
      screen.getByText("Error: Failed to fetch tasks")
    ).toBeInTheDocument();
  });
});
