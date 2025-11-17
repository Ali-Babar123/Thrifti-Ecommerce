import React from "react";
import SettingsImage from "../assets/settingsimage.svg";
import "./ProfileDetails.css";

const SellingProfileDetails = () => {
  return (
    <div className="selling-profile-content">

      <h2>Settings</h2>

      <div className="selling-profile-section">
        <h3>Profile Details</h3>
        <div className="selling-profile-header">
          <img
            src={SettingsImage}
            alt="Profile"
            className="selling-profile-image"
          />
          <span className="selling-profile-name">Sophia Bennett</span>
        </div>

        <button className="selling-profile-btn selling-profile-choose-btn">Choose photo</button>

        <label>User Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="selling-profile-input"
        />

        <button className="selling-profile-btn selling-profile-change-btn">
          Change username
        </button>

        <label>About</label>
        <textarea
          placeholder="Enter about yourself"
          className="selling-profile-textarea"
        ></textarea>
      </div>

      <div className="selling-profile-section">
        <h3>Location</h3>

        <label>Location</label>
        <input
          type="text"
          placeholder="Enter your location"
          className="selling-profile-input"
        />

        <label>City</label>
        <input
          type="text"
          placeholder="Enter your city"
          className="selling-profile-input"
        />

        <label>Language</label>
        <select className="selling-profile-input">
          <option>Select</option>
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>

      <div className="selling-profile-btn-group">
        <button className="selling-profile-btn selling-profile-update-btn">
          Update Profile
        </button>
        <button className="selling-profile-btn selling-profile-cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SellingProfileDetails;
