import React, { useState } from "react";
import "./BundleDiscounts.css";

const BundleDiscount = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="bundle-container">
      <h2 className="bundle-title">Bundle discounts</h2>

      <div className="bundle-switch-row">
       
        <span className="switch-label">Enable Bundle Discount</span>
         <label className="bundle-switch">
          <input
            type="checkbox"
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <p className="bundle-desc">
        Encourage people to buy more items from you with bundle discounts. Set
        rates based on the number of items per order. Learn more at the{" "}
        <a href="#" className="help-link">
          Help Centre.
        </a>
      </p>
    </div>
  );
};

export default BundleDiscount;
