import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import UserAuth from "../components/UserAuth";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";

const Home: React.FC = () => {
  const {
    user,
    loading: authLoading,
    login,
    logout,
    register,
    fetchUser,
  } = useAuth();
  const {
    tasks,
    loading: tasksLoading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    fetchTasks,
  } = useTasks();
  const [authMessage, setAuthMessage] = useState<string>("");

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const handleAuthSuccess = async (message: string) => {
    setAuthMessage(message);
    await fetchUser();
    if (user) {
      await fetchTasks();
    }
    // Clear the message after 3 seconds
    setTimeout(() => setAuthMessage(""), 3000);
  };

  const handleLogout = async () => {
    await logout();
    setAuthMessage("Logged out successfully");
    // Clear the message after 3 seconds
    setTimeout(() => setAuthMessage(""), 3000);
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          data-testid="loading-spinner"
          className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 mt-20 text-center text-white">
        TASK MANAGEMENT SYSTEM
      </h1>
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
          <p data-testid="welcome-message" className="mb-4 text-white">
            Welcome, {user.username}!
          </p>
          <button
            data-testid="logout-button"
            onClick={handleLogout}
            className="mb-4 px-4 py-2 bg-red-500 text-white font-bold text-base rounded"
          >
            LOGOUT
          </button>
          <TaskForm addTask={addTask} />
          {tasksLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500">Error: {error}</div>
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
