// src/pages/PendingTasks.js

import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../../Context/TaskContext';

function PendingTasks() {
  const { tasks, getAllTasks } = useContext(TaskContext);

  useEffect(() => {
    getAllTasks(); // ✅ Fetch tasks from backend
  }, []);

  const pendingTasks = tasks.filter(task => task.status === 'Pending');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-yellow-600">📋 Pending Tasks</h1>
      {pendingTasks.length === 0 ? (
        <p className="text-gray-600">No pending tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-yellow-100">
              <tr>
                <th className="border p-2">Task ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Developer</th>
                <th className="border p-2">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {pendingTasks.map(task => (
                <tr key={task.taskId}>
                  <td className="border p-2 text-center">{task.taskId}</td>
                  <td className="border p-2 text-center">{task.taskTitle}</td> {/* ✅ Fixed */}
                  <td className="border p-2 text-center">{task.developerName}</td>
                  <td className="border p-2 text-center">
                    {task.taskDeadline ? new Date(task.taskDeadline).toLocaleDateString() : "—"}
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

export default PendingTasks;
