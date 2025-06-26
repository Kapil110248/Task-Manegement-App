import React, { createContext, useState } from "react";
import axios from "axios";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // ✅ Fetch all tasks for the current admin
  const getAllTasks = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:4000/api/admin/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch tasks:", error.message);
    }
  };

  // ✅ Add task to the list (local update)
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, getAllTasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};
