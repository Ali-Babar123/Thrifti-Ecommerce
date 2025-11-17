import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const location = useLocation();

  // ✅ Load product from Router or from localStorage
  const [product, setProduct] = useState(
    location.state || JSON.parse(localStorage.getItem("checkoutProduct")) || {}
  );

  const [delivery, setDelivery] = useState("pickup");

  // ✅ Save to localStorage if product is passed via navigate()
  useEffect(() => {
    if (location.state) {
      localStorage.setItem("checkoutProduct", JSON.stringify(location.state));
      setProduct(location.state);
    }
  }, [location.state]);

  console.log("Checkout Product:", product);

  return (
    <div className="checkout-container">
      {/* LEFT SIDE */}
      <div className="checkout-left">
        <p className="checkout-path">
          Home / Men / All / {product.name || "Product"} / Checkout
        </p>
        <h2 className="checkout-heading">Order of 1 item</h2>

        <div className="product-card">
          <img
            src={product.image}
            alt={product.name || "Product"}
            className="product-image"
          />
          <div className="product-info">
            <p className="product-name">{product.name || "Product Name"}</p>
            <p className="product-price">{product.price || "£0.00"}</p>
          </div>
        </div>

        {/* Address */}
        <div className="checkout-box">
          <p>Your Complete Address...</p>
          <span>+</span>
        </div>

        {/* Delivery Option */}
        <h3 className="section-title">Delivery Option</h3>
        <div className="delivery-options">
          <div
            className={`delivery-option ${
              delivery === "pickup" ? "active" : ""
            }`}
            onClick={() => setDelivery("pickup")}
          >
            <div className="delivery-text">
              <p>📦 Ship To Pick-Up Point</p>
              <span>from £2.00</span>
            </div>
            <input
              type="radio"
              checked={delivery === "pickup"}
              onChange={() => setDelivery("pickup")}
            />
          </div>

          <div
            className={`delivery-option ${delivery === "home" ? "active" : ""}`}
            onClick={() => setDelivery("home")}
          >
            <div className="delivery-text">
              <p>🏠 Ship To Home</p>
              <span>from £4.00</span>
            </div>
            <input
              type="radio"
              checked={delivery === "home"}
              onChange={() => setDelivery("home")}
            />
          </div>
        </div>

        {/* Delivery details */}
        <h3 className="section-title">Delivery Option</h3>
        <div className="checkout-box">
          <p>Choose A Pick-Up Point</p>
          <span>+</span>
        </div>

        {/* Payment */}
        <div className="checkout-box">
          <div className="payment-methods">
            <p>Use a debit card / credit card</p>
            <div className="payment-icons">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/39/PayPal_logo.svg"
                alt="PayPal"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                alt="Stripe"
              />
            </div>
          </div>
          <span>+</span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="checkout-right">
        <div className="summary-card">
          <h3 className="summary-title">Price summary</h3>
          <h4 className="summary-subtitle">Payment Details</h4>

          <div className="summary-row">
            <span>Order</span>
            <span>{product.price || "$0.00"}</span>
          </div>
          <div className="summary-row">
            <span>Buyer Protection fee</span>
            <span>$2.00</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>$2.00</span>
          </div>

          <div className="summary-saving">
            <p>💸 You Saved £2.39 On Shipping</p>
          </div>
          <hr className="summary-saving-hr" />
          <div className="summary-row total">
            <span>Total</span>
            <span>
              {product.price
                ? `$${(
                    parseFloat(product.price.replace(/[^0-9.]/g, "")) + 4
                  ).toFixed(2)}`
                : "$68.00"}
            </span>
          </div>
          <Link to='/payment'>
          <button className="pay-btn">Pay</button>
          </Link>
          <p className="secure-note">
            🔒 Your Payment Details Are Encrypted And Secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
