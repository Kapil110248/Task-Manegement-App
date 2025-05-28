import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // import useNavigate

export default function Admin() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate(); // initialize navigate

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // redirect to /admin if form is valid
      navigate("/admin");
    }

    setValidated(true);
  };

  return (
    <>
      {/* LOGIN FORM */}
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
            borderRadius: "15px",
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <h4 className="text-center mb-4" style={{ fontWeight: "bold" }}>
            Admin Login
          </h4>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter username"
                style={{ borderRadius: "20px", padding: "10px" }}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
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
    </>
  );
}
