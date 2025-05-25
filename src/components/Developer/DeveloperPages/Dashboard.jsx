import React, { useContext } from "react";
import { TaskContext } from "../../Context/TaskContext";
import { UserContext } from "../../Context/UserContext";

function Dashboard() {
  const { tasks } = useContext(TaskContext);
  const { user } = useContext(UserContext);
  const developerName = user.developerName;

  const myTasks = tasks.filter(task => task.developerName === developerName);

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

      {myTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks assigned yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Task ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Deadline</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {myTasks.map((task) => (
                <tr key={task.taskId}>
                  <td className="border p-2 text-center">{task.taskId}</td>
                  <td className="border p-2 text-center">{task.title}</td>
                  <td className="border p-2 text-center">{task.deadline}</td>
                  <td className="border p-2 text-center">
                    <span className={`text-white px-2 py-1 rounded ${getStatusClass(task.status)}`}>
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
