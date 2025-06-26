import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Admin() {
  const [isRegister, setIsRegister] = useState(false);
  const [validated, setValidated] = useState(false);
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    contact: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      if (isRegister) {
        // ✅ REGISTER
        const res = await fetch("http://localhost:4000/api/admin/create-admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(adminData),
        });

        const data = await res.json();
        if (res.ok) {
          await Swal.fire({
            icon: "success",
            title: "Registered Successfully ✅",
            text: "Now login with your credentials.",
            confirmButtonColor: "#3085d6",
          });

          setIsRegister(false);
          setAdminData({
            name: "",
            email: "",
            contact: "",
            username: "",
            password: "",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Registration Failed ❌",
            text: data.message || "Something went wrong",
          });
        }
      } else {
        // ✅ LOGIN
        const res = await fetch("http://localhost:4000/api/auth/admin-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: adminData.username,
            password: adminData.password,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("adminToken", data.token);

          await Swal.fire({
            icon: "success",
            title: "Welcome Admin 👋",
            text: "You have logged in successfully!",
            timer: 1500,
            showConfirmButton: false,
          });

          navigate("/admin");
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed ❌",
            text: data.message || "Invalid credentials",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message || "Please try again later",
      });
    }

    setValidated(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <h4 className="text-center mb-3" style={{ fontWeight: "bold" }}>
          {isRegister ? "Admin Registration" : "Admin Login"}
        </h4>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={adminData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={adminData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter contact number"
                  name="contact"
                  value={adminData.contact}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter username"
              name="username"
              value={adminData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter password"
              name="password"
              value={adminData.password}
              onChange={handleChange}
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
            {isRegister ? "Register" : "Login"}
          </Button>

          <div className="text-center mt-3">
            <span>
              {isRegister
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {isRegister ? "Login" : "Register"}
              </button>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
