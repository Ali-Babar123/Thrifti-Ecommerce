import React from "react";
import { Shirt, Baby, User } from "lucide-react";
import "./Personalization.css";

const Personalization = () => {
  const categories = [
    { id: 1, name: "Women", icon: <User size={22} />, sub: "Sizes" },
    { id: 2, name: "Men", icon: <Shirt size={22} />, sub: "Sizes" },
    { id: 3, name: "Kids", icon: <Baby size={22} />, sub: "Sizes" },
  ];

  return (
    <div className="personalization-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li className="active">Categories and sizes</li>
          <li>Brands</li>
          <li>History</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>Select categories and sizes</h2>
        <p>Select the categories and sizes you want to see in your feed.</p>

        <div className="category-list">
          {categories.map((cat) => (
            <div key={cat.id} className="category-item">
              <div className="icon-box">{cat.icon}</div>
              <div className="text-box">
                <span className="category-name">{cat.name}</span>
                <span className="category-sub">{cat.sub}</span>
              </div>
              <input type="checkbox" className="checkbox" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Personalization;
