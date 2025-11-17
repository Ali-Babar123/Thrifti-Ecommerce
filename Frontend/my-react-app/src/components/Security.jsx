import React, { useState } from "react";
import { Mail, Lock, Shield, Activity, ChevronRight, X } from "lucide-react";
import "./Security.css";

const Security = () => {
  const [selected, setSelected] = useState(null);

  const items = [
    {
      key: "email",
      icon: <Mail size={20} />,
      title: "Email",
      desc: "Keep your email up to date.",
    },
    {
      key: "password",
      icon: <Lock size={20} />,
      title: "Password",
      desc: "Protect your account with a stronger password.",
    },
    {
      key: "verification",
      icon: <Shield size={20} />,
      title: "2 step- Verification",
      desc: "Confirm new logins with a 4 digit code.",
    },
    {
      key: "activity",
      icon: <Activity size={20} />,
      title: "Login Activity",
      desc: "Manage your logged in devices.",
    },
  ];

  const renderContent = () => {
    switch (selected) {
      case "email":
        return (
          <div className="security-detail">
            <div className="security-detail-header">
              <h3>Confirm Change</h3>
              <X onClick={() => setSelected(null)} className="close-icon" />
            </div>
            <p>We’ll send a confirmation email to verify your change.</p>
            <button className="btn-primary">Send Confirmation Email</button>
            <button className="btn-secondary">I don’t have access to this email</button>
          </div>
        );

      case "password":
        return (
          <div className="security-detail">
            <div className="security-detail-header">
              <h3>Password Change</h3>
              <X onClick={() => setSelected(null)} className="close-icon" />
            </div>
            <ul>
              <li>Use a strong, unique password that you don’t use elsewhere.</li>
              <li>Never share your password with anyone.</li>
            </ul>
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm New Password" />
            <button className="btn-primary">Change Password</button>
            <button className="btn-secondary">Cancel</button>
          </div>
        );

      case "verification":
        return (
          <div className="security-detail">
            <div className="security-detail-header">
              <h3>Verify Your Phone Number</h3>
              <X onClick={() => setSelected(null)} className="close-icon" />
            </div>
            <input type="text" placeholder="Enter Your Phone Number" />
            <button className="btn-primary">Send</button>
            <button className="btn-secondary">Cancel</button>
          </div>
        );

      case "activity":
        return (
          <div className="security-detail">
            <div className="security-detail-header">
              <h3>Login Activity</h3>
              <X onClick={() => setSelected(null)} className="close-icon" />
            </div>
            <p>Here are your recent login locations:</p>
            <ul>
              <li>📍 Islamabad, Pakistan — Logged in recently</li>
              <li>📍 Rawalpindi, Pakistan — Logged in recently</li>
            </ul>
            <button className="btn-secondary">Log Out</button>
          </div>
        );

      default:
        return (
          <div className="security-box">
            {items.map((item) => (
              <div
                key={item.key}
                className="security-item"
                onClick={() => setSelected(item.key)}
              >
                <div className="security-item-left">
                  <span className="security-icon">{item.icon}</span>
                  <div>
                    <h4 className="security-item-title">{item.title}</h4>
                    <p className="security-item-desc">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="security-arrow" />
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="security-container">
      <h2 className="security-title">Security</h2>
      {renderContent()}
    </div>
  );
};

export default Security;
