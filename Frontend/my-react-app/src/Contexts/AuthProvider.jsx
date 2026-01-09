import React, { createContext, useEffect, useState } from "react";
import API from "../api/api";
import Loader from "../components/loader";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(null); // null = checking, true/false = determined
    const [error, setError] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  
  /** Delay Function */
  const Delay = (fc,ms) => {
    return new Promise( (resolve,reject) => {
      setTimeout( async () => {
        try {
          const result = await fc();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      },ms )
    })
  };

    useEffect(() => {
      // Check if user is authenticated using cookies
      (async () => {
        try {
          setLoading(true);
          
          // Cookies are automatically sent with withCredentials: true
          const res = await Delay( () =>  API.get("/api/auth/current-user"),2000);
          if (res?.data?.statusCode === 200) {
            // Check if user is authenticated
            if (res.data.isAuthenticated && res.data.user) {
              setUser(res.data.user);
              setLoading(false);
              setIsLoggedIn(true);
            } else {
              setLoading(false);
              // No user authenticated, which is fine for public access
              setUser(null);
              setIsLoggedIn(false);
            }
          } else {
            setLoading(false);
            setUser(null);
            setIsLoggedIn(false);
          }
        } catch (err) {
          // If request fails, assume not authenticated (this is fine for public access)
          setLoading(false);
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
            { loading ? <Loader /> : children}
        </AuthContext.Provider>
    )

};