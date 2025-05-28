import React, { useContext } from 'react';
import { TaskContext } from '../../Context/TaskContext';

function PendingPage() {
  const { tasks } = useContext(TaskContext);
  const pendingTask = tasks.filter((task) => task.status === "Pending");

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center text-warning">Pending Tasks</h2>
      {pendingTask.length === 0 ? (
        <p className="text-center">No tasks in pending</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Task No</th>
                <th>Task ID</th>
                <th>Task</th>
                <th>Date Time</th>
                <th>Pending Time</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingTask.map((task, index) => (
                <tr key={task.taskId}>
                  <td>{index + 1}</td>
                  <td>{task.taskId}</td>
                  <td>{task.title}</td>
                  <td>{task.date}</td>
                  <td>{task.pendingDate || "N/A"}</td>
                  <td>{task.deadline}</td>
                  <td className='text-warning'>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PendingPage;
