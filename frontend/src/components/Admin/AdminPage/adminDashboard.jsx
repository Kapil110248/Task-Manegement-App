import React, { useContext } from 'react';
import { TaskContext } from '../../Context/TaskContext';

function AdminDashboard() {
  const { tasks } = useContext(TaskContext);

  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;
  const progressCount = tasks.filter((t) => t.status === 'In Progress').length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Top 3 Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-200 p-4 rounded shadow text-center">
          <h2>Pending Tasks</h2>
          <p className="text-3xl">{pendingCount}</p>
        </div>
        <div className="bg-blue-200 p-4 rounded shadow text-center">
          <h2>In Progress</h2>
          <p className="text-3xl">{progressCount}</p>
        </div>
        <div className="bg-green-200 p-4 rounded shadow text-center">
          <h2>Completed</h2>
          <p className="text-3xl">{completedCount}</p>
        </div>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">S.No.</th>
              <th className="border p-2">Task ID</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Deadline</th>
              <th className="border p-2">Developer Code</th>
              <th className="border p-2">Developer Name</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.taskId}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2 text-center">{task.taskId}</td>
                <td className="border p-2 text-center">
                  {new Date(task.createdDateTime).toLocaleString()}
                </td>
                <td className="border p-2 text-center">
                  {task.taskDeadline?.split("T")[0]}
                </td>
                <td className="border p-2 text-center">{task.developerUniqueId}</td>
                <td className="border p-2 text-center">{task.developerName}</td>
                <td className="border p-2 text-center">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
