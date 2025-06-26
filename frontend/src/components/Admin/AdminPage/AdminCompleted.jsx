import React, { useEffect, useContext } from "react";
import { TaskContext } from "../../Context/TaskContext";

function CompletedTasks() {
  const { tasks, getAllTasks } = useContext(TaskContext);

  useEffect(() => {
    getAllTasks();
  }, []);

  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-600">
        ✅ Completed Tasks
      </h1>

      {completedTasks.length === 0 ? (
        <p className="text-gray-600">No completed tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow">
            <thead className="bg-green-200">
              <tr>
                <th className="border p-2">Task ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Developer ID</th>
                <th className="border p-2">Developer Name</th>
                <th className="border p-2">Deadline</th>
                <th className="border p-2">Completed At</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task) => (
                <tr key={task.taskId}>
                  <td className="border p-2 text-center">{task.taskId}</td>
                  <td className="border p-2 text-center">{task.taskTitle}</td>
                  <td className="border p-2 text-center">{task.developerUniqueId}</td>
                  <td className="border p-2 text-center">{task.developerName}</td>
                  <td className="border p-2 text-center">
                    {task.taskDeadline?.split("T")[0]}
                  </td>
                  <td className="border p-2 text-center">
                    {task.taskCompletionDateTime
                      ? new Date(task.taskCompletionDateTime).toLocaleString()
                      : "—"}
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

export default CompletedTasks;
