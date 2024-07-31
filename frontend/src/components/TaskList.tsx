import React from "react";
import TaskItem from "./TaskItem";
import { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTask,
  deleteTask,
}) => {
  if (tasks.length === 0) {
    return <p>There are no tasks. Please add a task.</p>;
  }

  return (
    <ul className="mt-4 text-white">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
