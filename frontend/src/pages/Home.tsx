import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import UserAuth from "../components/UserAuth";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";

const Home: React.FC = () => {
  const { user, loading: authLoading, login, logout, register } = useAuth();
  const {
    tasks,
    loading: tasksLoading,
    error,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();
  const [authMessage, setAuthMessage] = useState<string>("");

  if (authLoading) return <div>Loading authentication...</div>;

  const handleAuthSuccess = (message: string) => {
    setAuthMessage(message);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Management System</h1>
      {authMessage && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
          role="alert"
        >
          {authMessage}
        </div>
      )}
      {user ? (
        <>
          <p className="mb-4">Welcome, {user.username}!</p>
          <button
            onClick={logout}
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
          <TaskForm addTask={addTask} />
          {tasksLoading ? (
            <div>Loading tasks...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <TaskList
              tasks={tasks}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          )}
        </>
      ) : (
        <UserAuth
          login={login}
          register={register}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default Home;
