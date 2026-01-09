import React, { useState } from "react";
import { Mail, Lock, Shield, Activity, ChevronRight, X } from "lucide-react";
import "./Security.css";
import { useForm } from "react-hook-form";
import API from "../api/api";
import { toast } from "sonner";


const Security = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [selected, setSelected] = useState(null);

  const onSendEmailChange = async () => {
    try {
      const res = await API.post(
        "/api/security/email/change",
        {},
        { withCredentials: true }
      );
      console.log(res);

      toast.success(res.data.message || "Confirmation email sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  const onChangePassword = async (data) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await API.post(
        "/api/security/password/password-change",
        { currentPassword, newPassword },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Your password has been changed successfully");

      reset(); // clears inputs
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    }
  };




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

            <p>You need to confirm  is your email address before you can update it.</p>

            <button className="btn-primary" onClick={onSendEmailChange}>
              Send Confirmation Email
            </button>

            <button
              className="btn-secondary"
              onClick={() => setSelected(null)}
            >
             i don't have access to this email
            </button>
          </div>
        );


      case "password":
        return (
          <div className="security-detail">
            <div className="security-detail-header">
              <h3>Change password</h3>
              <X onClick={() => setSelected(null)} className="close-icon" />
            </div>
           <p>To create a secure password:</p>
           <ul> 
            <li>When setting up a password, go for something that is not too obvious. It can be a combination of numbers, special characters, capital and lower case letters. The length of the password should be at least 8 characters.</li>
          <li>Don’t use your name or date of birth when setting up a password.</li>
           <li>Memorize your password. Do not keep any record of it, do not tell other people about it. Try to change it regularly.</li>
           <li>Make sure no one can see you entering the password.</li>
           </ul>

            <form onSubmit={handleSubmit(onChangePassword)}>
  <input
    type="password"
    placeholder="Current password"
    {...register("currentPassword", {
      required: "Current password is required",
    })}
  />
  {errors.currentPassword && (
    <small className="error">{errors.currentPassword.message}</small>
  )}

  <input
    type="password"
    placeholder="New password"
    {...register("newPassword", {
      required: "New password is required",
      minLength: { value: 8, message: "At least 8 characters" },
    })}
  />
  {errors.newPassword && (
    <small className="error">{errors.newPassword.message}</small>
  )}

  <input
    type="password"
    placeholder="Confirm new password"
    {...register("confirmPassword", {
      required: "Please confirm your new password",
    })}
  />
  {errors.confirmPassword && (
    <small className="error">{errors.confirmPassword.message}</small>
  )}

  <button type="submit" className="btn-primary" disabled={isSubmitting}>
    {isSubmitting ? "Updating..." : "Change password"}
  </button>
</form>

          </div>
        );


      case "verification":
        return (
          <div className="security-detail">
            <div className="security-detail-header">
              <h3>Verify your phone number</h3>
              <X onClick={() => setSelected(null)} className="close-icon" />
            </div>
              <p>We’ll send a confirmation message or give you a call to verify that this is your number.</p>
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
              <li> Islamabad, Pakistan — Logged in recently</li>
              <li> Rawalpindi, Pakistan — Logged in recently</li>
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
