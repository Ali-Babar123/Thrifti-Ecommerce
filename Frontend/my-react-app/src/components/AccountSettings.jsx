import React from "react";
import "./AccountSettings.css";

function SellingAccountSettings() {
  return (
    <div className="selling-acc-container">
      <div className="selling-acc-content">
        <h3>Account settings</h3>

        <form>
          <label>Email</label>
          <div className="selling-acc-input-group">
            <input placeholder="John Doe" readOnly />
            <button className="selling-acc-small-btn">Change</button>
          </div>

          <label>Phone Number</label>
          <div className="selling-acc-input-group">
            <input placeholder="Phone Number" readOnly />
            <button className="selling-acc-small-btn">Verify</button>
          </div>

          <label>Full Name</label>
          <input className="selling-acc-input" placeholder="Full Name" />

          <label>Gender</label>
          <select className="selling-acc-input">
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <label>Birthday</label>
          <input type="date" className="selling-acc-input" />

          <div className="selling-acc-toggle-row">
            <label>Holiday Mode</label>
            <label className="selling-acc-switch">
              <input type="checkbox" />
              <span className="selling-acc-slider"></span>
            </label>
          </div>

          <div className="selling-acc-linked-box">
            <span>Facebook</span>
            <button className="selling-acc-small-btn">Link</button>
          </div>

          <div className="selling-acc-linked-box">
            <span>Google</span>
            <button className="selling-acc-small-btn selling-acc-gray">
              Linked
            </button>
          </div>

          <div className="selling-acc-para">
            <p>
              Link to your other accounts to become a trusted, verified member.
            </p>
          </div>

          <div className="selling-acc-input-group">
            <span>Change password</span>
            <button className="selling-acc-small-btn">Change</button>
          </div>

          <div className="delete-button">
            <button className="selling-acc-delete-btn">Delete My Account</button>
          </div>

          <div className="selling-acc-bottom-buttons">
            <button className="selling-acc-save-btn">Save</button>
            <button className="selling-acc-cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellingAccountSettings;
