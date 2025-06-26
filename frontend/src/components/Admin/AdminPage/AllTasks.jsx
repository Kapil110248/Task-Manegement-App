// src/components/Admin/AdminPage/AllTasks.jsx

import React, { useContext } from "react";
import { TaskContext } from "../../Context/TaskContext";

function AllTasks() {
  const { tasks } = useContext(TaskContext);

  const filteredTasks = tasks.filter(task =>
    ['Pending', 'In Progress', 'Completed'].includes(task.status)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 All Tasks</h1>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Task ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Developer</th>
                <th className="border p-2">Deadline</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.taskId}>
                  <td className="border p-2 text-center">{task.taskId}</td>
                  <td className="border p-2 text-center">{task.taskTitle}</td> {/* ✅ Fixed */}
                  <td className="border p-2 text-center">{task.developerName}</td>
                  <td className="border p-2 text-center">
                    {task.taskDeadline?.split("T")[0]} {/* ✅ Date only */}
                  </td>
                  <td className="border p-2 text-center">{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllTasks;
