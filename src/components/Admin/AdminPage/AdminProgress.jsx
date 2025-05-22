// src/pages/PendingTasks.js

import React, { useContext } from 'react';
import { TaskContext } from '../Context/TaskContext';

function AdminProgress() {
  const { tasks } = useContext(TaskContext);
  const progressTasks = tasks.filter(task => task.status === 'In Progress');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Progress Tasks</h1>
      {progressTasks.length === 0 ? (
        <p className="text-gray-600">No progress tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Task ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Developer</th>
                <th className="border p-2">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {progressTasks.map(task => (
                <tr key={task.taskId}>
                  <td className="border p-2 text-center">{task.taskId}</td>
                  <td className="border p-2 text-center">{task.title}</td>
                  <td className="border p-2 text-center">{task.developerName}</td>
                  <td className="border p-2 text-center">{task.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminProgress;
