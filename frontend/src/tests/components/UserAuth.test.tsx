import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import UserAuth from "../../components/UserAuth";

describe("UserAuth", () => {
  const mockLogin = jest.fn();
  const mockRegister = jest.fn();
  const mockOnAuthSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls login function when login form is submitted", async () => {
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
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("testuser", "password123");
    });
  });

  it("calls register function when registration form is submitted", async () => {
    render(
      <UserAuth
        login={mockLogin}
        register={mockRegister}
        onAuthSuccess={mockOnAuthSuccess}
      />
    );

    fireEvent.click(screen.getByText(/need to register/i));
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "newuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith("newuser", "password123");
    });
  });
});
