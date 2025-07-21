import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function DeveloperProfile() {
  const [profile, setProfile] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("developerToken");
        const res = await axios.get(
          "http://localhost:4000/api/developer/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching developer profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("developerToken");

    try {
      const res = await axios.put(
        "http://localhost:4000/api/developer/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire("✅ Success", res.data.message, "success");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      Swal.fire(
        "❌ Error",
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  if (!profile)
    return (
      <div className="p-6 text-center text-gray-600">Loading profile...</div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          👤 Developer Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <ProfileField label="Developer ID" value={profile.developerId} />
          <ProfileField label="Full Name" value={profile.fullName} />
          <ProfileField label="Email" value={profile.email} />
          <ProfileField label="Phone" value={profile.phone} />
          <ProfileField label="Role" value={profile.role} />
          <ProfileField
            label="Joining Date"
            value={new Date(profile.joiningDate).toLocaleDateString()}
          />
          <ProfileField label="Status" value={profile.status} />
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          🔒 Change Password
        </h3>
        <form onSubmit={handleChangePassword} className="space-y-5">
          <InputField
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <InputField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

// Reusable component for profile field
const ProfileField = ({ label, value }) => (
  <div>
    <p className="text-sm font-semibold text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-800">{value}</p>
  </div>
);

// Reusable component for input fields
const InputField = ({ label, type, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default DeveloperProfile;
