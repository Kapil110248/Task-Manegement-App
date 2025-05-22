import React, { useState, useContext } from "react";
import { TaskContext } from "../Context/TaskContext";

function AddTasks() {
  const { addTask } = useContext(TaskContext);

  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [status, setStatus] = useState("");

  const handleAdd = () => {
    if (taskName && date && developerName && status) {
      const newTask = {
        taskNo: Date.now(),
        taskId: `T${Math.floor(Math.random() * 10000)}`,
        date: new Date().toLocaleString(),
        deadline: date,
        developerId: `D${Math.floor(Math.random() * 1000)}`, // dummy ID
        developerName,
        status,
        title: taskName,
      };

      addTask(newTask);

      // Clear input fields
      setTaskName("");
      setDate("");
      setDeveloperName("");
      setStatus("");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        📋 Create a New Task for Your Team
      </h2>

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

      <div className="mb-4">
        <label className="block mb-1 font-medium">Deadline Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Developer Name</label>
        <input
          type="text"
          value={developerName}
          onChange={(e) => setDeveloperName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter developer name"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border px-3 py-2 rounded bg-white"
        >
          <option value="">Select status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full"
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTasks;
