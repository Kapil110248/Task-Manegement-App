import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../Context/TaskContext";
import { UserContext } from "../../Context/UserContext";

function Dashboard() {
  const { tasks, setTasks } = useContext(TaskContext);
  const { user } = useContext(UserContext);

  const developerId = user?.developerId || localStorage.getItem("developerId");
  const developerName = user?.developerName || localStorage.getItem("developerName") || "Developer";

  const [myTasks, setMyTasks] = useState([]);
  const [editStatusId, setEditStatusId] = useState(null);

  // ✅ Fetch tasks from backend on refresh
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("developerToken");
        const res = await fetch("http://localhost:4000/api/developer/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setTasks(data); // ✅ Update TaskContext
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (!tasks.length) {
      fetchTasks(); // ✅ Only call API if tasks are empty
    }
  }, [tasks.length, setTasks]);

  // ✅ Filter developer's own tasks
  useEffect(() => {
    const assignedTasks = tasks.filter((task) => {
      const devId = typeof task.developerId === "object" ? task.developerId._id : task.developerId;
      return String(devId) === String(developerId);
    });
    setMyTasks(assignedTasks);
  }, [tasks, developerId]);

  // ✅ Status Change Handler
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:4000/api/developer/tasks-status/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("developerToken")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.taskId === taskId ? { ...t, status: newStatus } : t
          )
        );
        setEditStatusId(null);
      } else {
        console.error("Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const pendingCount = myTasks.filter((t) => t.status === "Pending").length;
  const inProgressCount = myTasks.filter((t) => t.status === "In Progress").length;
  const completedCount = myTasks.filter((t) => t.status === "Completed").length;

  const getStatusClass = (status) => {
    if (status === "Pending") return "bg-yellow-400";
    if (status === "In Progress") return "bg-blue-400";
    if (status === "Completed") return "bg-green-500";
    return "bg-gray-300";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        👨‍💻 {developerName}'s Task Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold text-yellow-700">Pending</h3>
          <p className="text-2xl font-bold text-yellow-800">{pendingCount}</p>
        </div>
        <div className="bg-blue-100 border border-blue-400 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold text-blue-700">In Progress</h3>
          <p className="text-2xl font-bold text-blue-800">{inProgressCount}</p>
        </div>
        <div className="bg-green-100 border border-green-400 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold text-green-700">Completed</h3>
          <p className="text-2xl font-bold text-green-800">{completedCount}</p>
        </div>
      </div>

      {myTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks assigned yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">No.</th>
                <th className="border p-2">Task ID</th>
                <th className="border p-2">Task</th>
                <th className="border p-2">Created</th>
                <th className="border p-2">Deadline</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {myTasks.map((task, index) => (
                <tr key={task.taskId}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">{task.taskId}</td>
                  <td className="border p-2 text-center">{task.taskTitle}</td>
                  <td className="border p-2 text-center">
                    {new Date(task.createdDateTime).toLocaleString()}
                  </td>
                  <td className="border p-2 text-center">
                    {new Date(task.taskDeadline).toLocaleString()}
                  </td>
                  <td className="border p-2 text-center">
                    {editStatusId === task.taskId ? (
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.taskId, e.target.value)
                        }
                        onBlur={() => setEditStatusId(null)}
                        className="px-2 py-1 rounded border text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      <span
                        onClick={() => setEditStatusId(task.taskId)}
                        className={`text-white px-2 py-1 rounded cursor-pointer ${getStatusClass(
                          task.status
                        )}`}
                        title="Click to change status"
                      >
                        {task.status}
                      </span>
                    )}
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

export default Dashboard;
