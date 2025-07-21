import React, { useContext, useEffect } from "react";
import { TaskContext } from "../../Context/TaskContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const { tasks, setTasks } = useContext(TaskContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch("http://localhost:4000/api/admin/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(Array.isArray(data.tasks) ? data.tasks : []);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (!Array.isArray(tasks) || tasks.length === 0) {
      fetchTasks();
    }
  }, [setTasks, tasks]);

  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const progressCount = tasks.filter((t) => t.status === "In Progress").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  const stats = [
    {
      label: "Pending",
      count: pendingCount,
      color: "bg-yellow-100",
      text: "text-yellow-800",
    },
    {
      label: "In Progress",
      count: progressCount,
      color: "bg-blue-100",
      text: "text-blue-800",
    },
    {
      label: "Completed",
      count: completedCount,
      color: "bg-green-100",
      text: "text-green-800",
    },
  ];

  const chartData = [
    { name: "Pending", value: pendingCount },
    { name: "In Progress", value: progressCount },
    { name: "Completed", value: completedCount },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        📊 Admin Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-6 rounded-2xl shadow-md ${stat.color} ${stat.text} text-center transition-all hover:scale-105`}
          >
            <h2 className="text-md font-semibold">{stat.label}</h2>
            <p className="text-3xl font-bold">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mb-10 bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          📈 Task Distribution
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#fb923c" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tasks Table */}
      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-orange-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">S.No.</th>
              <th className="px-4 py-3 text-left">Task ID</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-left">Deadline</th>
              <th className="px-4 py-3 text-left">Dev Code</th>
              <th className="px-4 py-3 text-left">Developer</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={task.taskId} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{task.taskId}</td>
                  <td className="px-4 py-3">
                    {new Date(task.createdDateTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {task.taskDeadline?.split("T")[0]}
                  </td>
                  <td className="px-4 py-3">{task.developerUniqueId}</td>
                  <td className="px-4 py-3">{task.developerName}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : task.status === "In Progress"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-3 text-center" colSpan="7">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
