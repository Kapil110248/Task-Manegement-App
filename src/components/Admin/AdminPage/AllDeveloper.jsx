import React, { useContext } from 'react';
import { DeveloperContext } from '../../Context/DeveloperContext';

function AllDeveloper() {
  const { developers } = useContext(DeveloperContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">👨‍💻 All Developers</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Developer ID</th>
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {developers.map((dev, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{dev.developerId}</td>
                <td className="border px-4 py-2">{dev.fullName}</td>
                <td className="border px-4 py-2">{dev.email}</td>
                <td className="border px-4 py-2">{dev.phone}</td>
                <td className="border px-4 py-2">{dev.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllDeveloper;
