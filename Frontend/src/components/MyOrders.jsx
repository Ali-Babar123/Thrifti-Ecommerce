import React from "react";
import "./MyOrder.css";
import sampleImage from "../assets/Modern.svg";
import { Tag, ShoppingBag } from "lucide-react";

const MyOrder = () => {
  return (
    <div className="order-container">
      {/* Sidebar */}
      <aside className="order-sidebar">
        <p className="order-breadcrumb">Home / My order</p>
        <div className="order-menu">
          <button className="order-menu-item active">
            <Tag size={16} className="order-icon" /> Sold
          </button>
          <button className="order-menu-item">
            <ShoppingBag size={16} className="order-icon" /> Bought
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="order-main">
        {/* Tabs */}
        <div className="order-tabs">
          <button className="order-tab active">All Orders</button>
          <button className="order-tab">In progress</button>
          <button className="order-tab">Complete</button>
          <button className="order-tab">Cancel</button>
        </div>

        {/* Divider */}
        <hr className="order-divider" />

        {/* Product Section */}
        <div className="order-grid">
          <div className="order-card">
            <img src={sampleImage} alt="Product" className="order-image" />

            {/* Details below image */}
            <div className="order-details">
              <div className="order-top">
                <div className="order-info">
                  <p className="order-id">#1464665</p>
                  <p className="order-name">River Island</p>
                  <p className="order-condition">M30. Good</p>
                </div>
                <p className="order-price">$59.99</p>
              </div>

              <button className="order-btn">View Detail</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyOrder;
