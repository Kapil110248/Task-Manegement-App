import React, { createContext, useState } from "react";
import axios from "axios";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // ✅ Fetch all tasks from backend
  const getAllTasks = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:4000/api/admin/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data.tasks); // ✅ Make sure your backend sends { tasks: [...] }
    } catch (error) {
      console.error("❌ Failed to fetch tasks:", error.message);
    }
  };

  // ✅ Add new task to state (local update)
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, getAllTasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};
