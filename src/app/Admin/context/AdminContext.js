"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
  
    try {
      if (storedAdmin) {
        const parsed = JSON.parse(storedAdmin);
        setAdmin(parsed);
      }
    } catch (err) {
      console.error("Invalid admin JSON in localStorage:", err);
      localStorage.removeItem("admin"); 
    }
  }, []);
  

  const login = (adminObj) => {
    localStorage.setItem("admin", JSON.stringify(adminObj));
    setAdmin(adminObj);
  };
  
  
  const logout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin,login, logout}}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
