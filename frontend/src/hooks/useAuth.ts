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
      }
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
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await api.post<{ user: User; token: string }>("/users", {
        username,
        password,
      });
      setUser(data.user);
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setAuthToken("");
  };

  return { user, loading, login, logout, register, fetchUser };
}
