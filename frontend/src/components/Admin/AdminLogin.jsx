import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Admin() {
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [validated, setValidated] = useState(false);

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    contact: "",
    username: "",
    password: "",
  });

  const [otpData, setOtpData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) navigate("/admin/dashboard");
  }, [navigate]);

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
        const res = await fetch(
          "http://localhost:4000/api/admin/create-admin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(adminData),
          }
        );
        const data = await res.json();
        if (res.ok) {
          await Swal.fire(
            "Registered ✅",
            "Now login with your credentials",
            "success"
          );
          setIsRegister(false);
          setAdminData({
            name: "",
            email: "",
            contact: "",
            username: "",
            password: "",
          });
        } else {
          Swal.fire("Error", data.message || "Registration failed", "error");
        }
      } else {
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
          await Swal.fire(
            "Welcome 👋",
            "You have logged in successfully!",
            "success"
          );
          navigate("/admin/dashboard");
        } else {
          Swal.fire(
            "Login Failed ❌",
            data.message || "Invalid credentials",
            "error"
          );
        }
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Something went wrong", "error");
    }

    setValidated(true);
  };

  const handleSendOtp = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire("OTP Sent ✅", "Check your email", "success");
        setOtpSent(true);
      } else {
        Swal.fire("Error", data.message || "Failed to send OTP", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/auth/verify-otp-reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(otpData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        Swal.fire("Success ✅", "Password updated. Now login.", "success");
        setIsForgotPassword(false);
        setOtpSent(false);
        setOtpData({ email: "", otp: "", newPassword: "" });
      } else {
        Swal.fire("Error", data.message || "Reset failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
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
          {isRegister
            ? "Admin Registration"
            : isForgotPassword
            ? "Reset Password"
            : "Admin Login"}
        </h4>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {isForgotPassword ? (
            !otpSent ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter registered email"
                    value={otpData.email}
                    onChange={(e) =>
                      setOtpData((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </Form.Group>

                <Button
                  onClick={handleSendOtp}
                  className="mb-3"
                  variant="primary"
                  block
                >
                  Send OTP
                </Button>
              </>
            ) : (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>OTP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otpData.otp}
                    onChange={(e) =>
                      setOtpData((prev) => ({ ...prev, otp: e.target.value }))
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={otpData.newPassword}
                    onChange={(e) =>
                      setOtpData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                  />
                </Form.Group>

                <Button onClick={handleResetPassword} variant="success" block>
                  Reset Password
                </Button>
              </>
            )
          ) : (
            <>
              {isRegister && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
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
                    onClick={() => {
                      setIsRegister(!isRegister);
                      setIsForgotPassword(false);
                      setOtpSent(false);
                    }}
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

              {!isRegister && (
                <div className="text-center mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setIsRegister(false);
                      setOtpSent(false);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#007bff",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </>
          )}
        </Form>
      </div>
    </div>
  );
}
