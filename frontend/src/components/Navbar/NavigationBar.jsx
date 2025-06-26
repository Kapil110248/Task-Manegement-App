import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const [loginType, setLoginType] = useState("developer");

  return (
    <>
      {/* NAVBAR */}
      <Navbar expand="lg" style={{ backgroundColor: "#2980B9" }}>
        <Container> 
          <Navbar.Brand
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
              <Nav.Link
                as={Link}
                to="/adminLogin"
                onClick={() => setLoginType("admin")}
                style={{
                  color: loginType === "admin" ? "#FFD700" : "white",
                  fontWeight: "bold",
                }}
              >
                Admin Login
              </Nav.Link>
           
              <Nav.Link
                as={Link}
                to="/developerLogin"
                onClick={() => setLoginType("developer")} style={{
                  color: loginType === "developer" ? "#FFD700" : "white",
                  fontWeight: "bold",
                }}>
                Developer Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
