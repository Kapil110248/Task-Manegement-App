import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./sidebarAdmin.css";

function SidebarAdmin({ isOpen, onToggle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from Admin panel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminToken");
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      }
    });
  };

  return (
    <>
      <div
        className={`sidebar-toggle-icon-admin ${isOpen ? "open" : ""}`}
        onClick={onToggle}
      >
        <i className="bi bi-list"></i>
      </div>

      <div className={`sidebar-admin-container ${isOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/admin/dashboard">
              <i className="bi bi-speedometer2"></i> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/pending-tasks">
              <i className="bi bi-hourglass-split"></i> Pending Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/progress-tasks">
              <i className="bi bi-bar-chart-line"></i> Progress Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/completed-tasks">
              <i className="bi bi-check-circle-fill"></i> Completed Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-developer">
              <i className="bi bi-person-plus-fill"></i> Add Developer
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-developers">
              <i className="bi bi-people-fill"></i> All Developers
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-task">
              <i className="bi bi-plus-circle-fill"></i> Add Task
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-tasks">
              <i className="bi bi-card-list"></i> All Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/adminProfile">
              <i className="bi bi-person-circle"></i> Profile
            </NavLink>
          </li>
          <li className="logout-btn-admin" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </li>
        </ul>
      </div>
    </>
  );
}

export default SidebarAdmin;
 