import { useState, useEffect, useCallback } from "react";
import { User } from "../types";
import { api, setAuthToken } from "../services/api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      try {
        const { data } = await api.get<User>("/auth/me");
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user", error);
        localStorage.removeItem("token");
        setAuthToken("");
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (username: string, password: string) => {
    try {
      const { data } = await api.post<{ access_token: string; user: User }>(
        "/auth/login",
        { username, password }
      );
      localStorage.setItem("token", data.access_token);
      setAuthToken(data.access_token);
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const { data } = await api.post<{ access_token: string; user: User }>(
        "/auth/register",
        { username, password }
      );
      setUser(data.user);
      localStorage.setItem("token", data.access_token);
      setAuthToken(data.access_token);
      return data.user;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = async () => {
    // Immediately clear user state and token
    setUser(null);
    localStorage.removeItem("token");
    setAuthToken("");

    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout request failed", error);
    }
  };

  return { user, loading, login, logout, register, fetchUser };
}
