import React, { useContext } from "react";
import { TaskContext } from "../../Context/TaskContext";
import { UserContext } from "../../Context/UserContext";

function Dashboard() {
  const { tasks, setTasks } = useContext(TaskContext);
  const { user } = useContext(UserContext);
  const developerName = user?.developerName || "Developer";

  const myTasks = tasks.filter(task => task.developerName === developerName);

  const handleStatusClick = (taskId) => {
    const now = new Date().toLocaleString();

    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.taskId === taskId) {
          if (task.status === "Pending") {
            return { ...task, status: "In Progress", inProgressAt: now };
          }
          if (task.status === "In Progress") {
            return { ...task, status: "Completed", completedAt: now };
          }
        }
        return task;
      })
    );
  };

  const pendingCount = myTasks.filter(task => task.status === "Pending").length;
  const inProgressCount = myTasks.filter(task => task.status === "In Progress").length;
  const completedCount = myTasks.filter(task => task.status === "Completed").length;

  const getStatusClass = (status) => {
    if (status === "Pending") return "bg-yellow-400";
    if (status === "In Progress") return "bg-blue-400";
    if (status === "Completed") return "bg-green-400";
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
                <th className="border p-2">Date Time</th>
                <th className="border p-2">Deadline</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {myTasks.map((task, index) => (
                <tr key={task.taskId}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">{task.taskId}</td>
                  <td className="border p-2 text-center">{task.title}</td>
                  <td className="border p-2 text-center">{task.date}</td>
                  <td className="border p-2 text-center">{task.deadline}</td>
                  <td className="border p-2 text-center">
                    <span
                      onClick={() => handleStatusClick(task.taskId)}
                      className={`text-white px-2 py-1 rounded cursor-pointer ${getStatusClass(task.status)}`}
                      title="Click to change status"
                    >
                      {task.status}
                    </span>
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
