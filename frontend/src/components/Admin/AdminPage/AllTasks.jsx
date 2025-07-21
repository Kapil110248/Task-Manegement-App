import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../Context/TaskContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllTasks() {
  const { tasks, getAllTasks } = useContext(TaskContext);

  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");

  useEffect(() => {
    getAllTasks();
  }, []);

  const toggleMenu = (taskId) => {
    setMenuOpenId(menuOpenId === taskId ? null : taskId);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditedTitle(task.taskTitle);
    setEditedDeadline(task.taskDeadline?.split("T")[0]);
    setMenuOpenId(null);
  };

  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:4000/api/admin/update-task/${editingTask._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            taskTitle: editedTitle,
            taskDeadline: editedDeadline,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("✅ Task updated successfully!");
        setEditingTask(null);
        getAllTasks();
      } else {
        toast.error("❌ Failed to update: " + data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("❌ Error while updating task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:4000/api/admin/delete-task/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("🗑️ Task deleted successfully!");
        getAllTasks();
      } else {
        toast.error("❌ Failed to delete: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("❌ Error while deleting task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:4000/api/admin/update-task-status/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("✅ Status updated!");
        getAllTasks();
      } else {
        toast.error("❌ Failed to update status: " + data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("❌ Error while updating status");
    }
  };

  if (!Array.isArray(tasks)) {
    return (
      <p className="text-red-500 text-center mt-6">
        ❌ Tasks data is invalid or not loaded.
      </p>
    );
  }

  const filteredTasks = tasks.filter((task) =>
    ["Pending", "In Progress", "Completed"].includes(task.status)
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-black-600 mb-6 text-center">
        📋 All Tasks Overview
      </h1>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="relative border rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 bg-white"
            >
              {/* 3-dot menu */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => toggleMenu(task._id)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v.01M12 12v.01M12 18v.01"
                    />
                  </svg>
                </button>

                {menuOpenId === task._id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-xl z-20">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-blue-600"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>

              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                📝 {task.taskTitle}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-gray-700">Task ID:</span>{" "}
                {task.taskId}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-gray-700">Developer:</span>{" "}
                {task.developerName || task?.developerId?.fullName}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-gray-700">Deadline:</span>{" "}
                {task.taskDeadline?.split("T")[0]}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium text-gray-700">
                  Current Status:
                </span>{" "}
                <span
                  className={`font-semibold ${
                    task.status === "Completed"
                      ? "text-green-600"
                      : task.status === "In Progress"
                      ? "text-blue-600"
                      : "text-orange-600"
                  }`}
                >
                  {task.status}
                </span>
              </p>

              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                className="w-full mt-2 border rounded-md px-3 py-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">📝 Edit Task</h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              value={editedDeadline}
              onChange={(e) => setEditedDeadline(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                ❌ Cancel
              </button>
              <button
                onClick={handleUpdateTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                💾 Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllTasks;
