import React, { useContext } from "react";
import { TaskContext } from "../../Context/TaskContext";

function InProgressPage() {
  const { tasks } = useContext(TaskContext);

  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center text-primary">Progress Tasks</h2>
      {inProgressTasks.length === 0 ? (
        <p className="text-center">No tasks in progress</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Task No</th>
                <th>Task ID</th>
                <th>Task</th>
                <th>Date Created</th>
                <th>Progress Time</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inProgressTasks.map((task, index) => (
                <tr key={task.taskId}>
                  <td>{index + 1}</td>
                  <td>{task.taskId}</td>
                  <td>{task.title}</td>
                  <td>{task.date}</td>
                  <td>{task.inProgressAt || "Not recorded"}</td>
                  <td>{task.deadline}</td>
                  <td style={{ color: "rgb(15 171 202)" }}>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InProgressPage;
