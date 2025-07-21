import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./sidebarAdmin";

function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      <SidebarAdmin
        isOpen={isSidebarOpen}
        onToggle={() => setSidebarOpen(!isSidebarOpen)}
      />

      <div
        style={{
          marginLeft: isSidebarOpen ? "250px" : "60px",
          marginTop: "60px",
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

export default AdminLayout;
