// src/components/Admin/AdminPage/AddTasks.jsx

import React, { useState, useContext } from "react";
import { TaskContext } from "../../Context/TaskContext";
import { DeveloperContext } from "../../Context/DeveloperContext";
import axios from "axios";

function AddTasks() {
  const { addTask } = useContext(TaskContext);
  const { developers } = useContext(DeveloperContext);

  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [developerId, setDeveloperId] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [developerCode, setDeveloperCode] = useState(""); // ✅ DeveloperID like DEV101
  const [status] = useState("Pending");

  const handleAdd = async () => {
    if (taskName && date && developerId && developerName && developerCode && status) {
      const newTask = {
        taskId: `T${Math.floor(Math.random() * 10000)}`,
        developerId,
        developerCode, // ✅ sending as developerCode
        developerName,
        taskTitle: taskName,
        taskDeadline: date,
        taskCompletionDateTime: "",
        taskProcessingDateTime: "",
        createdDateTime: new Date(),
        status,
      };

      console.log("🧾 Final Task Payload:", newTask);

      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.post(
          "http://localhost:4000/api/admin/add-task",
          newTask,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        addTask(response.data);

        // Reset all fields
        setTaskName("");
        setDate("");
        setDeveloperId("");
        setDeveloperName("");
        setDeveloperCode("");

        alert("✅ Task successfully added!");
      } catch (error) {
        console.error("❌ Error adding task:", error.response?.data || error.message);
        alert("❌ Failed to add task. Please try again.");
      }
    } else {
      alert("⚠️ Please fill in all fields.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        📋 Create a New Task for Your Team
      </h2>

      {/* Task Title */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Task Name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter task name"
        />
      </div>

      {/* Deadline */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Deadline Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Developer Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Assign Developer</label>
        <select
          value={developerId}
          onChange={(e) => {
            const selectedDev = developers.find((dev) => dev._id === e.target.value);
            if (selectedDev) {
              setDeveloperId(selectedDev._id);
              setDeveloperName(selectedDev.fullName);
              setDeveloperCode(selectedDev.developerId);
            }
          }}
          className="w-full border px-3 py-2 rounded bg-white"
        >
          <option value="">Select Developer</option>
          {developers.map((dev) => (
            <option key={dev._id} value={dev._id}>
              {dev.fullName} ({dev.developerId}) - {dev.role}
            </option>
          ))}
        </select>
      </div>

      {/* Status Field */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Status</label>
        <input
          type="text"
          value={status}
          disabled
          className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
        />
      </div>

      {/* Add Task Button */}
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full"
      >
        ➕ Add Task
      </button>
    </div>
  );
}

export default AddTasks;
