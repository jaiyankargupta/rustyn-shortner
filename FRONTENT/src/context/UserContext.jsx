import React, { createContext, useState, useEffect } from "react";
import { fetchUserDetails } from "../api/fetchProfile";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  const refetchUser = async () => {
    setLoading(true);
    try {
      const data = await fetchUserDetails();
      setUser(data);
    } catch (error) {
      setUser({ name: "", email: "" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refetchUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
