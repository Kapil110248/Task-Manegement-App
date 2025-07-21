import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllDeveloper() {
  const [developers, setDevelopers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingDev, setEditingDev] = useState(null);
  const [editData, setEditData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
  });

  const token = localStorage.getItem("adminToken");

  const fetchDevelopers = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/admin/developers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (response.ok) setDevelopers(Array.isArray(data) ? data : []);
      else toast.error("❌ Error fetching developers: " + data.message);
    } catch (err) {
      toast.error("❌ Fetch Developer Error");
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/admin/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setTasks(Array.isArray(data) ? data : []);
      else toast.error("❌ Error fetching tasks: " + data.message);
    } catch (err) {
      toast.error("❌ Fetch Task Error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchDevelopers();
      await fetchTasks();
      setLoading(false);
    };
    fetchData();
  }, []);

  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const handleEditClick = (dev) => {
    setEditingDev(dev);
    setEditData({
      fullName: dev.fullName,
      email: dev.email,
      phone: dev.phone,
      role: dev.role,
    });
    setMenuOpenId(null);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdateDeveloper = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/admin/update-developer/${editingDev._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("✅ Developer updated successfully!");
        setEditingDev(null);
        fetchDevelopers();
      } else {
        toast.error("❌ Update failed: " + data.message);
      }
    } catch (err) {
      toast.error("❌ Error updating developer");
    }
  };

  const handleDeleteDeveloper = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this developer?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/admin/delete-developer/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("🗑️ Developer deleted successfully!");
        fetchDevelopers();
      } else {
        toast.error("❌ Failed to delete: " + data.message);
      }
    } catch (err) {
      toast.error("❌ Delete error");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-4xl font-bold mb-8 text-center text-orange-600">
        👨‍💻 All Developers
      </h2>

      {loading ? (
        <p className="text-gray-600 text-center">
          🔄 Loading developers and tasks...
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-2xl bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
            <thead className="bg-orange-100 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Dev ID</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Joining</th>
                <th className="px-6 py-4 text-left">Tasks Done</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {developers.map((dev) => {
                const completedTasks = tasks.filter(
                  (task) =>
                    task.developerId === dev.developerId &&
                    task.status === "Completed"
                ).length;

                return (
                  <tr
                    key={dev._id}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-6 py-3">{dev.developerId}</td>
                    <td className="px-6 py-3">{dev.fullName}</td>
                    <td className="px-6 py-3">{dev.email}</td>
                    <td className="px-6 py-3">{dev.phone}</td>
                    <td className="px-6 py-3">{dev.role}</td>
                    <td className="px-6 py-3">
                      {dev.joiningDate?.slice(0, 10) || "N/A"}
                    </td>
                    <td className="px-6 py-3 font-semibold text-green-700">
                      {completedTasks}
                    </td>
                    <td className="px-6 py-3 text-center relative">
                      <button
                        onClick={() => toggleMenu(dev._id)}
                        className="text-gray-500 hover:text-gray-800 transition"
                      >
                        ⋮
                      </button>
                      {menuOpenId === dev._id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-xl z-50">
                          <button
                            onClick={() => handleEditClick(dev)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteDeveloper(dev._id)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingDev && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-center text-orange-500">
              ✏️ Edit Developer
            </h2>
            {["fullName", "email", "phone", "role"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block mb-1 text-sm font-medium capitalize text-gray-700">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={editData[field]}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>
            ))}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingDev(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateDeveloper}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllDeveloper;
