import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FiEdit, FiTrash2, FiSave, FiX, FiEye, FiEyeOff, FiKey } from "react-icons/fi";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [editData, setEditData] = useState({});
  const [editing, setEditing] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch("http://localhost:4000/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setAdmin(data);
          setEditData(data);
        } else {
          Swal.fire("Error", data.message || "Failed to fetch profile", "error");
        }
      } catch (err) {
        Swal.fire("Error", err.message || "Server error", "error");
      }
    };

    fetchAdminProfile();
  }, []);

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.put(
        "http://localhost:4000/api/admin/update-profile",
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        Swal.fire("Success", "Profile updated successfully!", "success");
        setAdmin(res.data.admin);
        setEditing(false);
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Update failed", "error");
    }
  };

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwords;

    if (newPassword !== confirmPassword) {
      return Swal.fire("Error", "New passwords do not match", "error");
    }

    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.put(
        "http://localhost:4000/api/admin/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        Swal.fire("Success", "Password changed successfully!", "success");
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Password update failed", "error");
    }
  };

  const handleDeleteProfile = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your profile!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.delete("http://localhost:4000/api/admin/delete-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          Swal.fire("Deleted!", "Your profile has been deleted.", "success");
          localStorage.removeItem("adminToken");
          window.location.href = "/";
        }
      } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Delete failed", "error");
      }
    }
  };

  if (!admin) return <p className="text-center text-gray-500 mt-10">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-2xl rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Admin Profile
      </h2>

      <div className="space-y-6">
        {editing ? (
          <>
            <Input label="Name" name="name" value={editData.name} onChange={handleInputChange} />
            <Input label="Username" name="username" value={editData.username} onChange={handleInputChange} disabled />
            <Input label="Email" name="email" value={editData.email} onChange={handleInputChange} />
            <Input label="Contact" name="contact" value={editData.contact} onChange={handleInputChange} />

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleProfileUpdate}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
              >
                <FiSave /> Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg transition"
              >
                <FiX /> Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-2 text-gray-700">
            <ProfileField label="Name" value={admin.name} />
            <ProfileField label="Username" value={admin.username} />
            <ProfileField label="Email" value={admin.email} />
            <ProfileField label="Contact" value={admin.contact} />

            <div className="text-center mt-4">
              <button
                onClick={() => setEditing(true)}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                <FiEdit /> Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>

      <hr className="my-8" />

      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <FiKey /> Change Password
        </h3>
        <div className="space-y-4">
          <Input
            label="Old Password"
            name="oldPassword"
            type={showPassword ? "text" : "password"}
            value={passwords.oldPassword}
            onChange={handlePasswordChange}
          />
          <Input
            label="New Password"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            value={passwords.newPassword}
            onChange={handlePasswordChange}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
          />

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            {showPassword ? <FiEyeOff /> : <FiEye />} Show Passwords
          </label>

          <button
            onClick={handleChangePassword}
            className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded-lg transition"
          >
            Update Password
          </button>
        </div>
      </div>

      <hr className="my-8" />

      <div className="text-center mt-6">
        <button
          onClick={handleDeleteProfile}
          className="flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg transition"
        >
          <FiTrash2 /> Delete Profile
        </button>
      </div>
    </div>
  );
};

// Reusable Input component
const Input = ({ label, name, value, onChange, type = "text", disabled = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
        disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
      }`}
    />
  </div>
);

// Read-only field
const ProfileField = ({ label, value }) => (
  <p className="text-base">
    <span className="font-medium text-gray-800">{label}:</span> {value}
  </p>
);

export default AdminProfile;
