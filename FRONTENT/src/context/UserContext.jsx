import React, { createContext, useState, useEffect } from "react";
import { fetchUserDetails } from "../api/fetchProfile";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUserDetails()
      .then((data) => setUser(data))
      .catch(() => setUser({ name: "User", email: "user@example.com" }));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
