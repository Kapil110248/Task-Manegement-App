import React, { useState, useContext } from "react";
import { TaskContext } from "../../Context/TaskContext";
import { DeveloperContext } from "../../Context/DeveloperContext";

function AddTasks() {
  const { addTask } = useContext(TaskContext);
  const { developers } = useContext(DeveloperContext);

  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [developerId, setDeveloperId] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [status] = useState("Pending"); // fixed status

  const handleAdd = () => {
    if (taskName && date && developerId && developerName && status) {
      const newTask = {
        taskNo: Date.now(),
        taskId: `T${Math.floor(Math.random() * 10000)}`,
        date: new Date().toLocaleString(),
        deadline: date,
        developerId,
        developerName,
        status,
        title: taskName,
      };

      addTask(newTask);

      // Clear input fields
      setTaskName("");
      setDate("");
      setDeveloperId("");
      setDeveloperName("");
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
        <label className="block mb-1 font-medium">Assign Developer</label>
        <select
          value={JSON.stringify({ id: developerId, name: developerName })}
          onChange={(e) => {
            const selectedDev = JSON.parse(e.target.value);
            setDeveloperId(selectedDev.id);
            setDeveloperName(selectedDev.name);
          }}
          className="w-full border px-3 py-2 rounded bg-white"
        >
          <option value="">Select Developer</option>
          {developers.map((dev) => (
            <option
              key={dev.developerId}
              value={JSON.stringify({
                id: dev.developerId,
                name: dev.fullName,
              })}
            >
              {dev.fullName} ({dev.developerId}) - {dev.role}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Status</label>
        <input
          type="text"
          value={status}
          disabled
          className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
        />
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
