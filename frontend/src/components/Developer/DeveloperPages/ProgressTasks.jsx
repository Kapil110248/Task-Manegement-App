import React, { useEffect, useState } from "react";
import axios from "axios";

function InProgressPage() {
  const [tasks, setTasks] = useState([]);
  const currentDeveloperId = localStorage.getItem("developerId");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("developerToken");
      const res = await axios.get("http://localhost:4000/api/developer/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const inProgressTasks = tasks.filter(
    (task) =>
      task.status === "In Progress" &&
      String(task.developerId) === String(currentDeveloperId)
  );

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleString() : "N/A";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-500">
        🚧 In Progress Tasks
      </h2>

      {inProgressTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks in progress</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-xl border border-gray-200">
          <table className="min-w-full bg-white text-sm rounded-xl">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Task No</th>
                <th className="py-3 px-4 text-left">Task ID</th>
                <th className="py-3 px-4 text-left">Task</th>
                <th className="py-3 px-4 text-left">Created Time</th>
                <th className="py-3 px-4 text-left">Progress Time</th>
                <th className="py-3 px-4 text-left">Deadline</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {inProgressTasks.map((task, index) => (
                <tr
                  key={task.taskId}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{task.taskId}</td>
                  <td className="py-3 px-4">{task.taskTitle}</td>
                  <td className="py-3 px-4">{formatDate(task.createdDateTime)}</td>
                  <td className="py-3 px-4">{formatDate(task.taskProcessingDateTime)}</td>
                  <td className="py-3 px-4">{formatDate(task.taskDeadline)}</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-400 text-white px-3 py-1 text-xs rounded-full font-semibold">
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InProgressPage;
