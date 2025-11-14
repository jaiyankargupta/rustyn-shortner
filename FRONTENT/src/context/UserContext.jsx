import React, { createContext, useState, useEffect } from "react";
import { fetchUserDetails } from "../api/fetchProfile";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "" });

  const refetchUser = async () => {
    try {
      const data = await fetchUserDetails();
      setUser(data);
    } catch (error) {
      // If fetch fails, set default user (not logged in)
      setUser({ name: "", email: "" });
    }
  };

  useEffect(() => {
    refetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
