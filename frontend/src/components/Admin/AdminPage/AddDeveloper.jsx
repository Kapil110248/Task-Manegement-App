// src/components/Admin/AdminPage/AddDeveloper.jsx

import React, { useState, useContext } from "react";
import { DeveloperContext } from "../../Context/DeveloperContext";

function AddDeveloper() {
  const { addDeveloper } = useContext(DeveloperContext);

  const [developer, setDeveloper] = useState({
    developerId: "",
    fullName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeveloper((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDeveloper = async () => {
    let {
      developerId,
      fullName,
      email,
      phone,
      role,
      password,
    } = developer;

    developerId = developerId.trim();
    fullName = fullName.trim();
    email = email.trim();

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!developerId || !fullName || !email || !phone || !role || !password) {
      return alert("⚠️ Please fill all fields");
    }
    if (!emailRegex.test(email)) {
      return alert("⚠️ Invalid email format");
    }

    const token = localStorage.getItem("adminToken"); // ✅ Fetch admin token
    if (!token) {
      return alert("❌ Admin token missing. Please login again.");
    }

    try {
      const res = await fetch("http://localhost:4000/api/admin/add-developer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Pass token correctly
        },
        body: JSON.stringify({
          developerId,
          fullName,
          email,
          phone,
          role,
          password,
          joiningDate: new Date().toLocaleDateString(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        addDeveloper(data);
        setDeveloper({
          developerId: "",
          fullName: "",
          email: "",
          phone: "",
          role: "",
          password: "",
        });
        alert("✅ Developer added successfully!");
      } else {
        alert(`❌ ${data.message || "Failed to add developer"}`);
      }
    } catch (err) {
      console.error("Add Developer Error:", err);
      alert("❌ Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">👨‍💻 Add Developer</h2>

      {["developerId", "fullName", "email", "phone", "role", "password"].map(
        (field) => (
          <div key={field} className="mb-4">
            <label className="block font-medium capitalize mb-1">{field}</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={developer[field]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`Enter ${field}`}
            />
          </div>
        )
      )}

      <button
        onClick={handleAddDeveloper}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full"
      >
        ➕ Add Developer
      </button>
    </div>
  );
}

export default AddDeveloper;
