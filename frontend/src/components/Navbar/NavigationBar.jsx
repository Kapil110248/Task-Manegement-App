import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function NavigationBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Check login status
  const isDeveloperLoggedIn = !!localStorage.getItem("developerToken");
  const isAdminLoggedIn = !!localStorage.getItem("adminToken");

  // Disable login links if someone is logged in
  const isLoggedIn = isDeveloperLoggedIn || isAdminLoggedIn;

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#2980B9" }} sticky="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            color: "white",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="https://cdn-icons-png.freepik.com/256/8980/8980628.png?semt=ais_hybrid"
            alt="logo"
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          Task Management System
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Admin Login Link */}
            <Nav.Link
              as={Link}
              to={isLoggedIn ? "#" : "/adminLogin"}
              style={{
                color: currentPath.includes("admin") ? "#FFD700" : "white",
                fontWeight: "bold",
                pointerEvents: isLoggedIn ? "none" : "auto",
                opacity: isLoggedIn ? 0.5 : 1,
                cursor: isLoggedIn ? "not-allowed" : "pointer",
              }}
            >
              Admin Login
            </Nav.Link>

            {/* Developer Login Link */}
            <Nav.Link
              as={Link}
              to={isLoggedIn ? "#" : "/developerLogin"}
              style={{
                color: currentPath.includes("developer") ? "#FFD700" : "white",
                fontWeight: "bold",
                pointerEvents: isLoggedIn ? "none" : "auto",
                opacity: isLoggedIn ? 0.5 : 1,
                cursor: isLoggedIn ? "not-allowed" : "pointer",
              }}
            >
              Developer Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
