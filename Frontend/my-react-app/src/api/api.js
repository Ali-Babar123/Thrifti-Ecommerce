import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Always send cookies with requests
});

// Request interceptor - only add Authorization header if cookie is not available
// This allows fallback to Bearer token if needed, but prefers cookies
API.interceptors.request.use((config) => {
  // Check if we have a token in localStorage as fallback
  // But prefer cookies for authentication
  const token = localStorage.getItem("token");
  
  // Only add Authorization header if token exists AND we're not relying on cookies
  // In production, we should rely on cookies, but keep this as fallback
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Ensure withCredentials is always true
  config.withCredentials = true;
  
  return config;
});

// Response interceptor to handle token removal on logout
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized, clear localStorage token
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default API;
