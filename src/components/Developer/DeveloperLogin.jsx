// src/Pages/Developer.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../Context/UserContext";

export default function Developer() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Optional: for future use
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault(); // prevent reload
      setUser({ developerName: username });
      navigate("/");
    }

    setValidated(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#d9d9d9",
          padding: "40px",
          borderRadius: "25px",
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <h4 className="text-center mb-4" style={{ fontWeight: "bold" }}>
          Developer Login
        </h4>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ borderRadius: "20px", padding: "10px" }}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "20px", padding: "10px" }}
            />
          </Form.Group>
          <Button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#2980B9",
              border: "none",
              borderRadius: "30px",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
