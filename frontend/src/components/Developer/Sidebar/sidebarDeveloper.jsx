import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./sidebarDevelopment.css";

function Sidebar({ isOpen }) {
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
        // 🔓 Remove auth data
        localStorage.removeItem("developerToken");
        localStorage.removeItem("developerId");
        localStorage.removeItem("developerName");

        // ✅ SweetAlert success notification
        Swal.fire({
          icon: "success",
          title: "Logged out successfully 👋",
          showConfirmButton: false,
          timer: 1500,
        });

        // 🕐 Redirect after 1.5s
        setTimeout(() => {
          navigate("/developerLogin");
        }, 1500);
      }
    });
  };

  return (
    <div className={`sidebar-container ${!isOpen ? "sidebar-hidden" : ""}`}>
      <ul
        className="list-unstyled"
        style={{ marginTop: "60px", cursor: "pointer", marginLeft: "20px" }}
      >
        <li className="nav-item">
          <NavLink to="/developerDashboard" className="nav-link text-dark">
            <i className="bi bi-speedometer2"></i> Dashboard
          </NavLink>
        </li>
        <li style={{ marginTop: "30px" }} className="nav-item">
          <NavLink to="/Progress" className="nav-link text-dark">
            <i className="bi bi-bar-chart-line"></i> Progress Tasks
          </NavLink>
        </li>
        <li style={{ marginTop: "30px" }} className="nav-item">
          <NavLink to="/PendingTask" className="nav-link text-dark">
            <i className="bi bi-hourglass-split"></i> Pending Task
          </NavLink>
        </li>
        <li style={{ marginTop: "30px" }} className="nav-item">
          <NavLink to="/completed" className="nav-link text-dark">
            <i className="bi bi-check-circle-fill"></i> Completed Tasks
          </NavLink>
        </li>

        {/* Logout */}
        <li
          onClick={handleLogout}
          className="nav-item"
          style={{
            marginTop: "350px",
            marginLeft: "10px",
            fontWeight: "bold",
            color: "red",
          }}
        >
          <i className="fas fa-sign-out-alt me-2"></i>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
