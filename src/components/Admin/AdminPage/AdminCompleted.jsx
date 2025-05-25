// src/pages/PendingTasks.js

import React, { useContext } from 'react';
import { TaskContext } from '../../Context/TaskContext';

function CompletedTasks() {
  const { tasks } = useContext(TaskContext);
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Completed Tasks</h1>
      {completedTasks.length === 0 ? (
        <p className="text-gray-600">No Completed tasks found.</p>
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
              {completedTasks.map(task => (
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

export default CompletedTasks;
