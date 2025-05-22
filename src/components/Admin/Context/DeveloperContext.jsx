// src/DeveloperContext/DeveloperContext.js
import React, { createContext, useState } from "react";

export const DeveloperContext = createContext();

export const DeveloperProvider = ({ children }) => {
  const [developers, setDevelopers] = useState([]);

  const addDeveloper = (newDev) => {
    setDevelopers((prev) => [...prev, newDev]);
  };

  return (
    <DeveloperContext.Provider value={{ developers, addDeveloper }}>
      {children}
    </DeveloperContext.Provider>
  );
};
