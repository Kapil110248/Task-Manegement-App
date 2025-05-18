import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebarAdmin.css"; 

function SidebarAdmin({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="sidebar-container">
      <ul
        className="list-unstyled"
        style={{ marginTop: "60px", cursor: "pointer", marginLeft: "20px" }}
      >
        <li className="nav-item">
          <NavLink to="/admin/dashboard" className="nav-link text-dark">
            <i className="bi bi-speedometer2"></i> Dashboard
          </NavLink>
        </li>
        <li style={{ marginTop: "30px" }} className="nav-item">
          <NavLink to="/admin/pending-tasks" className="nav-link text-dark">
            <i className="bi bi-bar-chart-line"></i> Pending Tasks
          </NavLink>
        </li>
        <li style={{ marginTop: "30px" }} className="nav-item">
          <NavLink to="/admin/progress-tasks" className="nav-link text-dark">
            <i className="bi bi-hourglass-split"></i> Progress Tasks
          </NavLink>
        </li>
        <li style={{ marginTop: "30px" }} className="nav-item">
          <NavLink to="/admin/completed-tasks" className="nav-link text-dark">
            <i className="bi bi-check-circle-fill"></i> Completed Tasks
          </NavLink>
        </li>
        <li style={{ marginTop: "30px" }} className="nav-item">
          <NavLink to="/admin/add-developer" className="nav-link text-dark">
            <i className="bi bi-person-plus-fill"></i> Add Developer
          </NavLink>
        </li>
        <li style={{ marginTop: "30px" }} className="nav-item">
          <NavLink to="/admin/all-developers" className="nav-link text-dark">
            <i className="bi bi-people-fill"></i> All Developers
          </NavLink>
        </li>
        <li style={{ marginTop: "30px" }} className="nav-item">
          <NavLink to="/admin/add-task" className="nav-link text-dark">
            <i className="bi bi-plus-circle-fill"></i> Add Task
          </NavLink>
        </li>
        <li style={{ marginTop: "30px" }} className="nav-item">
          <NavLink to="/admin/all-tasks" className="nav-link text-dark">
            <i className="bi bi-card-list"></i> All Tasks
          </NavLink>
        </li>
        <li
          style={{ marginTop: "120px", marginLeft: "10px", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => alert("Logout functionality to be implemented")}
        >
          <i className="fas fa-sign-out-alt me-2"></i> Logout
        </li>
      </ul>
    </div>
  );
}

export default SidebarAdmin;
