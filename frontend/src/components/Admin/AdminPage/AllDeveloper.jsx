import React, { useEffect, useState } from "react";

function AllDeveloper() {
  const [developers, setDevelopers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDevelopers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://localhost:4000/api/admin/developers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setDevelopers(data);
      } else {
        console.error("Error fetching developers:", data.message);
      }
    } catch (err) {
      console.error("Fetch Developer Error:", err);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:4000/api/admin/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(data);
      } else {
        console.error("Error fetching tasks:", data.message);
      }
    } catch (err) {
      console.error("Fetch Task Error:", err);
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

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">
        👨‍💻 All Developers
      </h2>

      {loading ? (
        <p className="text-gray-600 text-center">
          🔄 Loading developers and tasks...
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="min-w-full bg-white rounded-xl overflow-hidden">
            <thead className="bg-orange-100 text-sm uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3 border">Developer ID</th>
                <th className="px-4 py-3 border">Full Name</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border">Phone</th>
                <th className="px-4 py-3 border">Role</th>
                <th className="px-4 py-3 border">Joining Date</th>
                <th className="px-4 py-3 border">Tasks Completed</th>
              </tr>
            </thead>
            <tbody>
              {developers.map((dev, index) => {
                const completedTasks = tasks.filter(
                  (task) =>
                   task.developerUniqueId === dev.developerId &&
                    task.status === "Completed"
                ).length;

                return (
                  <tr
                    key={index}
                    className="text-center hover:bg-gray-50 border-t"
                  >
                    <td className="px-4 py-2 border">{dev.developerId}</td>
                    <td className="px-4 py-2 border">{dev.fullName}</td>
                    <td className="px-4 py-2 border">{dev.email}</td>
                    <td className="px-4 py-2 border">{dev.phone}</td>
                    <td className="px-4 py-2 border">{dev.role}</td>
                    <td className="px-4 py-2 border">
                      {dev.joiningDate?.slice(0, 10) || "N/A"}
                    </td>
                    <td className="px-4 py-2 border font-semibold text-green-700">
                      {completedTasks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllDeveloper;
