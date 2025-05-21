import React from "react";

function InProgressPage({ tasks }) {
  const inProgressTasks = tasks.filter((task) => task.status === "Progress");

  return (
    <div className="container mt-4" >
      <h2 className="mb-3 text-center text-primary">Progress Tasks</h2>
      {inProgressTasks.length === 0 ? (
        <p>No tasks in progress</p>
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
              {inProgressTasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.id}</td>
                  <td>{task.task}</td>
                  <td>{task.dateTime}</td>
                  <td>{task.deadline}</td>
                  <td style={{color:'rgb(15 171 202) '}}>{task.status}</td>
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
