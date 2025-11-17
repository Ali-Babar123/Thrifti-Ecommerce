import React from "react";
import "./Reserved.css";
import DummyImage from "../assets/shirtofmen.svg"; // your item image

const MarkAsReserved = () => {
  return (
    <div className="reserved-container">
      <h2 className="reserved-title">Reserve</h2>

      {/* Dropdown */}
      <div className="reserved-group">
        <label>Item reserved for</label>
        <select className="reserved-select">
          <option>Shoes</option>
          <option>Caps</option>
          <option>Dress</option>
        </select>
      </div>

      {/* Item Box */}
      <div className="reserved-group">
        <label>Item</label>
        <div className="reserved-item-box">
          <img src={DummyImage} alt="item" className="reserved-item-img" />
          <span className="reserved-item-name">Nike one size</span>
        </div>
      </div>

      {/* Price Row */}
      <div className="reserved-price-row">
        <span className="reserved-price-label">Price</span>
        <span className="reserved-price-value">$68.00</span>
      </div>

      <p className="reserved-info-text">
        This item will be marked as reserved for your selected buyer.
      </p>

      <button className="reserved-submit-btn">Reservation</button>
    </div>
  );
};

export default MarkAsReserved;
