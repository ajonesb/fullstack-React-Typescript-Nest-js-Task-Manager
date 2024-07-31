// src/tests/components/UserAuth.test.tsx
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UserAuth from "../../components/UserAuth";

describe("UserAuth", () => {
  it("renders login form by default", () => {
    const mockLogin = jest.fn();
    const mockRegister = jest.fn();
    const mockOnAuthSuccess = jest.fn();
    render(
      <UserAuth
        login={mockLogin}
        register={mockRegister}
        onAuthSuccess={mockOnAuthSuccess}
      />
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Need to register? Sign up")).toBeInTheDocument();
  });

  it('switches to registration form when "Sign up" is clicked', () => {
    const mockLogin = jest.fn();
    const mockRegister = jest.fn();
    const mockOnAuthSuccess = jest.fn();
    render(
      <UserAuth
        login={mockLogin}
        register={mockRegister}
        onAuthSuccess={mockOnAuthSuccess}
      />
    );

    fireEvent.click(screen.getByText("Need to register? Sign up"));
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(
      screen.getByText("Already have an account? Login")
    ).toBeInTheDocument();
  });

  it("calls login function when login form is submitted", () => {
    const mockLogin = jest.fn();
    const mockRegister = jest.fn();
    const mockOnAuthSuccess = jest.fn();
    render(
      <UserAuth
        login={mockLogin}
        register={mockRegister}
        onAuthSuccess={mockOnAuthSuccess}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Login"));

    expect(mockLogin).toHaveBeenCalledWith("testuser", "password123");
  });

  it("calls register function when registration form is submitted", () => {
    const mockLogin = jest.fn();
    const mockRegister = jest.fn();
    const mockOnAuthSuccess = jest.fn();
    render(
      <UserAuth
        login={mockLogin}
        register={mockRegister}
        onAuthSuccess={mockOnAuthSuccess}
      />
    );

    fireEvent.click(screen.getByText("Need to register? Sign up"));
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "newuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Register"));

    expect(mockRegister).toHaveBeenCalledWith("newuser", "password123");
  });

  it("shows error message for short passwords", () => {
    const mockLogin = jest.fn();
    const mockRegister = jest.fn();
    const mockOnAuthSuccess = jest.fn();
    render(
      <UserAuth
        login={mockLogin}
        register={mockRegister}
        onAuthSuccess={mockOnAuthSuccess}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "short" },
    });
    fireEvent.click(screen.getByText("Login"));

    expect(
      screen.getByText("Password must be at least 6 characters long")
    ).toBeInTheDocument();
  });

  it("calls onAuthSuccess after successful login", async () => {
    const mockLogin = jest.fn().mockResolvedValue(undefined);
    const mockRegister = jest.fn();
    const mockOnAuthSuccess = jest.fn();
    render(
      <UserAuth
        login={mockLogin}
        register={mockRegister}
        onAuthSuccess={mockOnAuthSuccess}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Login"));

    await screen.findByText("Login successful!");
    expect(mockOnAuthSuccess).toHaveBeenCalledWith("Login successful!");
  });
});
