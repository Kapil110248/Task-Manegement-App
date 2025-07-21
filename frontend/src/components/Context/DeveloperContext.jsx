import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DeveloperContext = createContext();

export const DeveloperProvider = ({ children }) => {
  const [developers, setDevelopers] = useState([]);

  // ✅ Fetch only current admin's developers
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get(
          "http://localhost:4000/api/admin/developers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDevelopers(res.data);
      } catch (error) {
        console.error(
          "❌ Error fetching developers:",
          error.response?.data || error.message
        );
      }
    };

    fetchDevelopers();
  }, []);

  const addDeveloper = (newDev) => {
    setDevelopers((prev) => [...prev, newDev]);
  };

  return (
    <DeveloperContext.Provider value={{ developers, addDeveloper }}>
      {children}
    </DeveloperContext.Provider>
  );
};
