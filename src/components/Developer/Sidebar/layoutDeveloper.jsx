import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SidebarDevelopment from "./sidebarDeveloper"; 

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // ✅ Fixed import

  return (
    <div style={{ display:"flex" }}>
      {/* Toggle Icon */}
      <div
        style={{
          position: "fixed",
          top: "15px",
          left: "10px",
          cursor: "pointer",
          fontSize: "24px",
        }}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <i className="bi bi-list"></i>
      </div>

      {/* Sidebar */}
      <SidebarDevelopment isOpen={isSidebarOpen} />

      {/* Main content */}
      <div
        style={{
          marginLeft: "200px" ,
          transition: "0.3s",
          padding: "20px",
          width: "100%",
         }}>
          <div style={{ marginLeft: "250px",marginRight:"200px", marginTop: "50px" }}>
        
      
        <Outlet />
      </div>
      </div>
    </div>
    
  );
}

export default Layout;
