import React, { useState, useContext } from 'react';
import { DeveloperContext } from '../Context/DeveloperContext';

function AddDeveloper() {
  const { addDeveloper } = useContext(DeveloperContext);
  const [developer, setDeveloper] = useState({
    developerId: '',
    fullName: '',
    email: '',
    phone: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeveloper((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDeveloper = () => {
    const { developerId, fullName, email, phone, role } = developer;
    if (developerId && fullName && email && phone && role) {
      addDeveloper(developer); // Save to context
      setDeveloper({ developerId: '', fullName: '', email: '', phone: '', role: '' });
    } else {
      alert("Please fill all the fields.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">👨‍💻 Add Developer</h2>

      <div className="mb-4">
        <label className="block font-medium">Developer ID *</label>
        <input
          type="text"
          name="developerId"
          value={developer.developerId}
          onChange={handleChange}
          placeholder="Enter Developer ID"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={developer.fullName}
          onChange={handleChange}
          placeholder="Enter Developer Full Name"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Email *</label>
        <input
          type="email"
          name="email"
          value={developer.email}
          onChange={handleChange}
          placeholder="Enter Developer Email"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Phone *</label>
        <input
          type="tel"
          name="phone"
          value={developer.phone}
          onChange={handleChange}
          placeholder="Enter Developer Phone Number"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Role *</label>
        <input
          type="text"
          name="role"
          value={developer.role}
          onChange={handleChange}
          placeholder="Enter Developer Role"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={handleAddDeveloper}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Add Developer
      </button>
    </div>
  );
}

export default AddDeveloper;
