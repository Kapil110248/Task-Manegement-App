import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarDevelopment from "./sidebarDeveloper";
import "./sidebarDevelopment.css"; // Ensure CSS is included

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <SidebarDevelopment isOpen={isSidebarOpen} />

      {/* Toggle Button */}
      <div
  style={{
    position: "fixed",
    top: "70px",
    left: isSidebarOpen ? "220px" : "10px",
    zIndex: 1100,
    cursor: "pointer",
    fontSize: "31px",  // 👈 Bigger icon
    transition: "left 0.3s ease-in-out",
  }}
  onClick={() => setSidebarOpen(!isSidebarOpen)}
>
  <i className="bi bi-list"></i>
</div>


      {/* Main Content */}
      <div
        style={{
          marginLeft: isSidebarOpen ? "250px" : "60px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
          width: "100%",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
