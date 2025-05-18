import React, { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard({ tasks, setTasks }) {
  const [taskText, setTaskText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleAddTask = () => {
    if (!taskText.trim() || !deadline) return;

    const newTask = {
      id: Date.now(),
      task: taskText,
      dateTime: new Date().toLocaleString(),
      deadline,
      status,
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
    setDeadline("");
    setStatus("Pending");
  };

  const getTaskCount = (type) =>
    tasks.filter((task) => task.status === type).length;

  const getStatusClass = (status) => {
    if (status === "Pending") return "bg-warning";
    if (status === "Progress") return "bg-info";
    if (status === "Completed") return "bg-success";
    return "";
  };

  return (
    <div className="container-fluid px-5 py-4"style={{ marginRight:"400px", marginLeft:"-300px" }}>
      <div className="mx-auto" style={{ maxWidth: "1400px" }}>
        {/* Task Input Form */}
        <div className="card p-3 mb-4 shadow-sm">
          <h3 className="mb-3">Add New Task</h3>
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Task</label>
              <input
                type="text"
                className="form-control"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Enter your task"
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Deadline</label>
              <input
                type="datetime-local"
                className="form-control"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Progress">Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="col-md-2">
              <button onClick={handleAddTask} className="btn btn-primary w-100">
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Summary Boxes */}
        <div className="row text-center mb-4">
          <div className="col-md-4">
            <div className="bg-warning p-3 rounded text-white">
              <h5>Pending</h5>
              <h2>{getTaskCount("Pending")}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-info p-3 rounded text-white">
              <h5>In Progress</h5>
              <h2>{getTaskCount("In Progress")}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-success p-3 rounded text-white">
              <h5>Completed</h5>
              <h2>{getTaskCount("Completed")}</h2>
            </div>
          </div>
        </div>

        {/* Link to In Progress Page */}
     

        {/* Task Table */}
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
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="6">No tasks added yet</td>
                </tr>
              ) : (
                tasks.map((task, index) => (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.id}</td>
                    <td>{task.task}</td>
                    <td>{task.dateTime}</td>
                    <td>{task.deadline}</td>
                    <td>
                      <span
                        className={`badge text-white ${getStatusClass(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;      