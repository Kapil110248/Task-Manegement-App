import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../Context/UserContext";
import Swal from "sweetalert2";

export default function Developer() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields ⚠️",
        text: "Please enter email and password",
      });
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:4000/api/auth/developer-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token and developer details in localStorage
        localStorage.setItem("developerToken", data.token);
        localStorage.setItem("developerId", data.developer._id);
        localStorage.setItem("developerName", data.developer.fullName);

        // ✅ Save in UserContext for global access
        setUser({
          developerId: data.developer._id,
          developerName: data.developer.fullName,
          email: data.developer.email,
        });

        // ✅ Success popup
        await Swal.fire({
          icon: "success",
          title: "Welcome Developer 👨‍💻",
          text: "Login successful!",
          timer: 1500,
          showConfirmButton: false,
        });

        // ✅ Navigate to dashboard
        navigate("/developer/Dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed ❌",
          text: data.message || "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong 😢",
        text: error.message || "Please try again later",
      });
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("developerToken");
    if (token) {
      navigate("/developer/Dashboard");
    }
  }, [navigate]);

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
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
