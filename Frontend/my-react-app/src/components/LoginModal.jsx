import React, { useState } from "react";
import "./LoginModal.css";
import API from "../api/api";
import { auth, provider } from "./firebase"; 
import { signInWithPopup } from "firebase/auth";


import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";



const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false); // default to login
  const [useEmailForm, setUseEmailForm] = useState(false); // email form view
  const [formData, setFormData] = useState({
  username: "",
  email: "",
  password: "",
});
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");


const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSignup = async () => {
  try {
    setLoading(true);
    setError("");
    const res = await API.post("/api/auth/signup", formData);
    console.log("Signup success:", res.data);
    // alert("Account created successfully!");
    setFormData({ username: "", email: "", password: "" });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("loggedIn", "true");
      if (onLoginSuccess) onLoginSuccess();
  } catch (err) {
    console.error("Signup failed:", err.response?.data || err.message);
    setError(err.response?.data?.message || "Signup failed. Please try again.");
  } finally {
    setLoading(false);
  }
};
   

const handleGoogleLogin = async () => {
  try {
    // Step 1: Sign in with Google Popup
    const result = await signInWithPopup(auth, provider);

    // Step 2: Get Firebase Google Token (ID Token)
    const token = await result.user.getIdToken();
    console.log("✅ Firebase Token:", token);
    const picture = result.user.photoURL;
    // Step 3: Send token to backend
    const res = await API.post("/api/auth/google", { token , picture});

    // Step 4: Store your backend JWT
    localStorage.setItem("token", res.data.token);
     localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("loggedIn", "true");

    if (onLoginSuccess) onLoginSuccess(res.data.user);
    onClose();
  } catch (err) {
    console.error("❌ Google login failed:", err);
    setError("Google login failed, try again.");
  }
};

const handleLogin = async () => {
  try {
    setLoading(true);
    setError("");

    // Send login request
    const res = await API.post("/api/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    console.log("Login success:", res.data);
    // alert("Login successful!");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("loggedIn", "true");
      if (onLoginSuccess) onLoginSuccess();

    setFormData({ username: "", email: "", password: "" });
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    setError(err.response?.data?.message || "Login failed. Please try again.");
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
