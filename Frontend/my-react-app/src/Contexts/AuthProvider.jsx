import React, { createContext, useEffect, useState } from "react";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null); // null = checking, true/false = determined
    const [error, setError] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  
    useEffect(() => {
      // Check if user is authenticated using cookies
      (async () => {
        try {
          // Cookies are automatically sent with withCredentials: true
          const res = await API.get("/api/auth/current-user");
          if (res?.data?.statusCode === 200) {
            // Check if user is authenticated
            if (res.data.isAuthenticated && res.data.user) {
              setUser(res.data.user);
              setIsLoggedIn(true);
            } else {
              // No user authenticated, which is fine for public access
              setUser(null);
              setIsLoggedIn(false);
            }
          } else {
            setUser(null);
            setIsLoggedIn(false);
          }
        } catch (err) {
          // If request fails, assume not authenticated (this is fine for public access)
          setUser(null);
          setIsLoggedIn(false);
          // Clear any leftover localStorage tokens
          localStorage.removeItem("token");
        } finally {
          setIsCheckingAuth(false);
        }
      })();
  }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, isCheckingAuth }}>
            {children}
        </AuthContext.Provider>
    )

};