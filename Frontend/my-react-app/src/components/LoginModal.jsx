import React, { useState, useEffect, useContext } from "react";
import "./LoginModal.css";
import API from "../api/api";
import { auth, provider } from "./firebase"; 
import { signInWithPopup } from "firebase/auth";


import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { AuthContext } from "../Contexts/AuthProvider";



const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {

  
  const [isSignUp, setIsSignUp] = useState(false);
  const [useEmailForm, setUseEmailForm] = useState(false);

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setIsLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    city: null,
    country: null,
  });

  // ================= GET BROWSER LOCATION =================
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => setError("Location permission denied")
    );
  }, []);

  // ================= CONVERT LAT/LON → CITY/COUNTRY =================
  useEffect(() => {
    if (!location) return;

    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lon}`
          )}`
        );

        const data = await res.json();
        const result = JSON.parse(data.contents);
        const address = result.address || {};

        setFormData((prev) => ({
          ...prev,
          country: address.country || null,
          city:
            address.city ||
            address.state ||
            address.village ||
            address.municipality ||
            address.suburb ||
            null,
        }));
      } catch (err) {
        console.error("Location fetch error:", err);
      }
    };

    fetchAddress();
  }, [location]);

  // ================= INPUT HANDLER =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= SIGNUP =================
  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");

      if (!formData.city || !formData.country) {
        setError("Detecting your location, please wait...");
        setLoading(false);
        return;
      }

      const res = await API.post("/api/auth/signup", formData);

      localStorage.setItem("token", res.data.token);

      if (onLoginSuccess) onLoginSuccess();
      onClose();

      setFormData({
        username: "",
        email: "",
        password: "",
        city: null,
        country: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      if (onLoginSuccess) {
  onLoginSuccess(res.data.user);
}

      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
const handleGoogleLogin = async () => {
  try {
    // console.log("Google login started");
    setLoading(true);
    setError("");

    let city = null;
    let country = null;

    // 1️⃣ Get user position
    try {
      // console.log("Requesting geolocation...");
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      console.log("Geolocation success:", pos);

      // 2️⃣ Reverse geocode to get city & country
      const geoUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`;
      // console.log("Fetching reverse geocode from:", geoUrl);

      const res = await fetch(geoUrl);
      const data = await res.json();
      console.log("Reverse geocode data:", data);

      const address = data.address || {};
      console.log("Parsed address:", address);

      city = address.city || address.town || address.village || address.state || null;
      country = address.country || null;
      console.log("Resolved city & country:", { city, country });

      // Update formData for display or debugging
      setFormData(prev => ({ ...prev, city, country }));
    } catch (err) {
      console.error("Could not fetch location:", err);
      setError("Could not fetch location for Google login");
      return; // stop login if location is mandatory
    }

    // 3️⃣ Perform Google login
    console.log("Opening Google login popup...");
    const result = await signInWithPopup(auth, provider);
    console.log("Google login result:", result);

    const token = await result.user.getIdToken();
    const picture = result.user.photoURL;
    console.log("Google token & picture:", { token, picture });

    // 4️⃣ Send to backend
    console.log("Sending data to backend...", { token, picture, city, country });
    const backendRes = await API.post("/api/auth/google", {
      token,
      picture,
      city,
      country,
    });
    console.log("Backend response:", backendRes.data);

    localStorage.setItem("token", backendRes.data.token);

   setUser(backendRes.data.user);
   setIsLoggedIn(true);

if (onLoginSuccess) onLoginSuccess();

    console.log("Login successful, closing modal");
    onClose();
  } catch (err) {
    console.error("Google login failed:", err);
    setError("Google login failed");
  } finally {
    setLoading(false);
  }
};



  if (!isOpen) return null;

  const renderEmailForm = () => {
    if (isSignUp) {
      // Sign up form
      return (
        <>
          <h2 className="modal-title">Sign up with email</h2>
          <input
  type="text"
  name="username"
  placeholder="Username"
  className="modal-input"
  value={formData.username}
  onChange={handleChange}
/>
          <small className="modal-note">
            Use letters, numbers, or both. Other users will see this name.
          </small>
          <input
  type="email"
  name="email"
  placeholder="Email"
  className="modal-input"
  value={formData.email}
  onChange={handleChange}
/>
         <input
  type="password"
  name="password"
  placeholder="Password"
  className="modal-input"
  value={formData.password}
  onChange={handleChange}
/>
          <small className="modal-note">
            At least 7 characters, with one letter and one number.
          </small>

          <label className="checkbox-label">
            <input type="checkbox" /> I'd like to receive personalised offers.
          </label>
          <label className="checkbox-label">
            <input type="checkbox" /> I accept the{" "}
            <a href="#">Terms and Conditions</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </label>

          {error && <p className="error-msg">{error}</p>}

          <button className="modal-submit" onClick={handleSignup} disabled={loading}>
  {loading ? "Creating Account..." : "Continue"}
</button>
          <p className="modal-footer-link">
            <a href="#">Having trouble?</a>
          </p>
        </>
      );
    } else {
      // Login form
      return (
        <>
          <h2 className="modal-title">Log in</h2>
         <input
  type="email"
  name="email"
  placeholder="Email"
  className="modal-input"
  value={formData.email}
  onChange={handleChange}
/>
          <input
  type="password"
  name="password"
  placeholder="Password"
  className="modal-input"
  value={formData.password}
  onChange={handleChange}
/>
          {error && <p className="error-msg">{error}</p>}

<button
  className="modal-submit"
  onClick={handleLogin}
  disabled={loading}
>
  {loading ? "Logging in..." : "Continue"}
</button>
          <p className="modal-footer-link">
            <a href="#">Forgotten your password?</a><br />
            <a href="#">Having trouble?</a>
          </p>
        </>
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>✕</button>

        {!useEmailForm ? (
          <>
            <h2 className="modal-title">
              {isSignUp
                ? "Join and sell pre-loved clothes with no fees"
                : "Welcome back!"}
            </h2>

            <button className="auth-btn" onClick={handleGoogleLogin}>
              <FcGoogle /> Continue with Google
            </button>
            <button className="auth-btn">
              <FaApple /> Continue with Apple
            </button>
            <button className="auth-btn">
              <FaFacebook color="#1877F2" /> Continue with Facebook
            </button>

            <div className="modal-footer">
              <p>
                Or {isSignUp ? "register" : "log in"} with{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setUseEmailForm(true);
                  }}
                >
                  email
                </a>
              </p>
              <p>
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsSignUp(false);
                      }}
                    >
                      Log in
                    </a>
                  </>
                ) : (
                  <>
                    Don’t have an account yet?{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsSignUp(true);
                      }}
                    >
                      Sign up
                    </a>
                  </>
                )}
              </p>
            </div>
          </>
        ) : (
          <>
            {renderEmailForm()}
            <div className="modal-footer">
              <p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setUseEmailForm(false);
                  }}
                >
                  ← Back to options
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal; 