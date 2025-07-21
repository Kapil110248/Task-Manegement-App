import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./sidebarDevelopment.css";

function SidebarDeveloper({ isOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire({
          icon: "success",
          title: "Logged out successfully 👋",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    });
  };

  return (
    <div className={`sidebar-container-dev ${isOpen ? "open" : ""}`}>
      <ul className="sidebar-list-dev">
        <li>
          <NavLink to="/developer/Dashboard">
            <i className="bi bi-speedometer2"></i> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/developer/Progress">
            <i className="bi bi-bar-chart-line"></i> Progress Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/developer/PendingTask">
            <i className="bi bi-hourglass-split"></i> Pending Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/developer/completed">
            <i className="bi bi-check-circle-fill"></i> Completed Tasks
          </NavLink>
        </li>

        {/* ✅ New My Profile Link */}
        <li>
          <NavLink to="/developer/developerProfile">
            <i className="bi bi-person-circle"></i> Profile
          </NavLink>
        </li>

        <li className="logout-btn-dev" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </li>
      </ul>
    </div>
  );
}

export default SidebarDeveloper;
