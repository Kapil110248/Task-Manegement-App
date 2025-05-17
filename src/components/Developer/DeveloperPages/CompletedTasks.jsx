import React from "react";

function CompletedTaskPage({ tasks }) {
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <div className="container mt-4 d-flex justify-content-center" style={{ marginRight:"500px", marginLeft:"-300px" }} >
      <div style={{ width: "90%" }}>
        <h2 className="mb-3 text-center">Completed Tasks</h2>
        {completedTasks.length === 0 ? (
          <p className="text-center">No tasks completed yet</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-light">
                <tr>
                  <th>Task No</th>
                  <th>Task ID</th>
                  <th>Task</th>
                  <th>Date Time</th>
                  <th>Deadline</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {completedTasks.map((task, index) => (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.id}</td>
                    <td>{task.task}</td>
                    <td>{task.dateTime}</td>
                    <td>{task.deadline}</td>
                    <td>{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompletedTaskPage;
