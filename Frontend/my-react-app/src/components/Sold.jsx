import React from "react";
import "./Sold.css";
import DummyImage from "../assets/shirtofmen.svg"; // your item image

const MarkAsSold = () => {
  return (
    <div className="sold-container">
      <h2 className="sold-title">Mark as Sold</h2>

      {/* Dropdown */}
      <div className="sold-group">
        <label>Item sold to</label>
        <select className="sold-select">
          <option>Shoes</option>
          <option>Caps</option>
          <option>Dress</option>
        </select>
      </div>

      {/* Item Box */}
      <div className="sold-group">
        <label>Item</label>
        <div className="sold-item-box">
          <img src={DummyImage} alt="item" className="sold-item-img" />
          <span className="sold-item-name">Nike one size</span>
        </div>
      </div>

      {/* Price Row */}
      <div className="sold-price-row">
        <span className="sold-price-label">Price</span>
        <span className="sold-price-value">$68.00</span>
      </div>

      <p className="sold-info-text">
        All sales come with 0% fees, so you'll keep all you make
      </p>

      <button className="sold-submit-btn">Submit</button>
    </div>
  );
};

export default MarkAsSold;
