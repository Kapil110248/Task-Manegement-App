import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ SweetAlert2 import
import "./sidebarAdmin.css";

function SidebarAdmin({ isOpen }) {
  const navigate = useNavigate();

  // ✅ SweetAlert2 Logout Confirmation
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from Admin panel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
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
        navigate("/adminLogin");
      }
    });
  };

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

        {/* ✅ Logout Button with SweetAlert */}
        <li
          style={{
            marginTop: "120px",
            marginLeft: "10px",
            fontWeight: "bold",
            color: "#dc3545",
          }}
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt me-2"></i> Logout
        </li>
      </ul>
    </div>
  );
}

export default SidebarAdmin;
