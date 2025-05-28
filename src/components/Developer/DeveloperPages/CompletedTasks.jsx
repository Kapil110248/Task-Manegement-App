import React, { useContext } from "react";
import { TaskContext } from "../../Context/TaskContext";

function CompletedPage() {
  const { tasks } = useContext(TaskContext);
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center text-success">Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <p className="text-center">No tasks completed</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Task No</th>
                <th>Task ID</th>
                <th>Task</th>
                <th>Date Time</th>
                <th>Completed Time</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task, index) => (
                <tr key={task.taskId}>
                  <td>{index + 1}</td>
                  <td>{task.taskId}</td>
                  <td>{task.title}</td>
                  <td>{task.date}</td>
                  <td>{task.completedDate || "N/A"}</td>
                  <td>{task.deadline}</td>
                  <td className="text-success">{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CompletedPage;
