import React, { createContext, useEffect, useState } from "react";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);

  
    useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setIsLoggedIn(false);
    setUser(null);
    return;
  }

  (async () => {
    try {
      const res = await API.get("/api/auth/current-user", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });

      if (res?.data?.statusCode === 200) {
        setUser(res.data.user);
        setIsLoggedIn(true);   // ✅ THIS FIXES RELOAD ISSUE
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (err) {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
    }
  })();
}, []);

    if (error !== null) {
        console.log(error)
    }
    return (
        <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )

};