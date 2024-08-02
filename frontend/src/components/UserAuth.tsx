import React, { useState } from "react";
import { User } from "../types"; // Make sure to import the User type

interface UserAuthProps {
  login: (username: string, password: string) => Promise<User>;
  register: (username: string, password: string) => Promise<User>;
  onAuthSuccess: (message: string) => void;
}

const UserAuth: React.FC<UserAuthProps> = ({
  login,
  register,
  onAuthSuccess,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    try {
      if (isRegistering) {
        await register(username, password);
        onAuthSuccess("Registration successful!");
      } else {
        await login(username, password);
        onAuthSuccess("Login successful!");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-800 mt-20 border rounded border-stone-600 p-10">
      <h2 className="text-2xl font-bold mb-4 text-white">
        {isRegistering ? "Register" : "Login"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          data-testid="username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border rounded"
          required
        />
        <input
          data-testid="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
          minLength={6}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          data-testid="auth-submit-button"
          type="submit"
          className="w-full p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold	text-base rounded"
        >
          {isRegistering ? "REGISTER" : "LOGIN"}
        </button>
      </form>
      <button
        data-testid="auth-toggle-button"
        onClick={() => setIsRegistering(!isRegistering)}
        className="mt-4 text-blue-500 underline"
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Need to register? Sign up"}
      </button>
    </div>
  );
};

export default UserAuth;
