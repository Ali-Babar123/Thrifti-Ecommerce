import React, { useState } from "react";
import "./Postage.css";
import { ChevronDown } from "lucide-react";


const Postage = () => {
  const [showAddressOptions, setShowAddressOptions] = useState(false);
  const [showDropOptions, setShowDropOptions] = useState(false);

  const addressOptions = [
    { name: "AnyVan", desc: "Home to home delivery. Includes tracking" },
    { name: "Yodel Door to Door", desc: "Prepaid label (print-at-home only). Parcel collected from your address." },
  ];

  const dropOffOptions = [
    { name: "24/7 InPost Locker | Shop Pick-up", desc: "Prepaid label. Find your nearest drop-off point here." },
    { name: "DPD Pickup", desc: "Prepaid drop-off QR code. Find your nearest drop-off point here." },
    { name: "Evri Home Delivery", desc: "Prepaid label. Find your nearest drop-off point here." },
    { name: "Evri ParcelShop", desc: "Prepaid label. Find your nearest drop-off point here." },
    { name: "InPost Home Delivery", desc: "Prepaid label (print-at-home only). Find your nearest drop-off point here." },
    { name: "Relay Home Delivery", desc: "Prepaid drop-off QR code. Find your nearest drop-off point here." },
    { name: "Relay Shop Pick-up", desc: "Prepaid drop-off QR code. Find your nearest drop-off point here." },
    { name: "Royal Mail", desc: "Prepaid drop-off QR code. Find your nearest drop-off point here. (excluding Postboxes)" },
    { name: "Yodel Store to Door", desc: "Prepaid drop-off only. Find your nearest drop-off point here." },
    { name: "Yodel Store to Store", desc: "Prepaid label. Find your nearest drop-off point here." },
  ];

  return (
    <div className="postage-container">

      <h2>Postage</h2>

      {/* Address Input */}
      <label>Your Address</label>
      <div className="postage-input-wrapper">
        <input type="text" placeholder="Add your Address" />
        <button className="postage-add-btn">+</button>
      </div>

      <p className="postage-subtext">
        Where couriers will collect or deliver orders, and what we'll use to process returns.
      </p>

      {/* Info Box */}
      <div className="postage-info-box">
        <span>⚠</span>
        <p>
          Disabling shipping options may reduce sales. If a member can only buy from you with
          a disabled option, we may still offer it.
          <a href="#"> Learn more about disabled options.</a>
        </p>
      </div>

      <h4>Shipping as a seller</h4>
      <p className="postage-subtext">Choose which options you'd like to use for each shipping type.</p>

      {/* ADDRESS SHIPPING */}
      <div className="postage-card" onClick={() => setShowAddressOptions(!showAddressOptions)}>
        <div>
          <h5>From your Address</h5>
          <span>A Courier collects the order from you.</span>
        </div>
       <ChevronDown
  className={`postage-dropdown-btn ${showAddressOptions ? "rotate" : ""}`}
/>

      </div>

      {showAddressOptions && (
        <div className="postage-options">
          {addressOptions.map((item) => (
            <div key={item.name} className="postage-option-row">
              <div>
                <p className="option-title">{item.name}</p>
                <p className="option-desc">{item.desc}</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
      )}

      {/* DROP OFF POINT SHIPPING */}
      <div className="postage-card" onClick={() => setShowDropOptions(!showDropOptions)}>
        <div>
          <h5>From a drop-off point</h5>
          <span>You take the order to a location like a locker or parcel shop.</span>
        </div>
        <ChevronDown
  className={`postage-dropdown-btn ${showAddressOptions ? "rotate" : ""}`}
/>

      </div>

      {showDropOptions && (
        <div className="postage-options">
          {dropOffOptions.map((item) => (
            <div key={item.name} className="postage-option-row">
              <div>
                <p className="option-title">{item.name}</p>
                <p className="option-desc">{item.desc}</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
      )}

      <p className="postage-small-note">
        Some shipping options are enabled for all sellers on our platform and can't be turned off.
      </p>
      <a className="postage-link" href="#">See compensation information</a>

      <div className="postage-btn-group">
        <button className="postage-save-btn">Save</button>
        <button className="postage-cancel-btn">Cancel</button>
      </div>

    </div>
  );
};

export default Postage;
