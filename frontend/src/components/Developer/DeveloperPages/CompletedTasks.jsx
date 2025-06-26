// ✅ CompletedPage.jsx — Shows only logged-in developer's completed tasks
import React, { useEffect, useState } from "react";
import axios from "axios";

function CompletedPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("developerToken");
        const response = await axios.get("http://localhost:4000/api/developer/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          const completedTasks = response.data.filter(
            (task) => task.status === "Completed"
          );
          setTasks(completedTasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-600">
        ✅ Completed Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks completed yet.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-xl border border-gray-200">
          <table className="min-w-full bg-white text-sm rounded-xl">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Task No</th>
                <th className="py-3 px-4 text-left">Task ID</th>
                <th className="py-3 px-4 text-left">Task</th>
                <th className="py-3 px-4 text-left">Created</th>
                <th className="py-3 px-4 text-left">Completed Time</th>
                <th className="py-3 px-4 text-left">Deadline</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={task.taskId}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{task.taskId}</td>
                  <td className="py-3 px-4">{task.taskTitle}</td>
                  <td className="py-3 px-4">{new Date(task.createdDateTime).toLocaleString()}</td>
                  <td className="py-3 px-4">{new Date(task.taskCompletionDateTime).toLocaleString()}</td>
                  <td className="py-3 px-4">{new Date(task.taskDeadline).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-500 text-white px-3 py-1 text-xs rounded-full font-semibold">
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

export default CompletedPage;
