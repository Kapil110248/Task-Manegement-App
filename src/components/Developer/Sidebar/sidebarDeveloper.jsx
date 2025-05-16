import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebarDevelopment.css"

function Sidebar({isOpen}) {
  if (!isOpen) return null; // Don't render the sidebar if isOpen is false


  return (
    <div
      className="sidebar-container"
    >
      <ul
        className="list-unstyled "
        style={{ marginTop: "60px", cursor: "pointer", marginLeft: "20px" }}
      >
        <li className="nav-item">
          <NavLink to="/developerDashboard" className="nav-link text-dark">
          <i class="bi bi-speedometer2"></i>  Dashboard
          </NavLink>
        </li>
        <li style={{ marginTop: "30px" }}  className="nav-item">
          <NavLink to="/in-progress"className="nav-link text-dark" >
          <i className="bi bi-bar-chart-line"></i>   Progress Tasks
          </NavLink>
        </li>
        <li style={{ marginTop: "30px" }}  className="nav-item">
          <NavLink to="/PendingTask" className="nav-link text-dark">
          <i className="bi bi-hourglass-split"></i> Pending Task
          </NavLink>
        </li>
        <li style={{ marginTop: "30px" }}  className="nav-item">
          <NavLink to="/completed" className="nav-link text-dark">
          <i className="bi bi-check-circle-fill"></i> Completed Tasks
          </NavLink>
        </li>
        <li style={{ marginTop: "350px", marginLeft:"10px",fontWeight:"bold"}}>
        <i className="fas fa-sign-out-alt me-2"></i>

        Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;
