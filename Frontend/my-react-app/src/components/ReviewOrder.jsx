import React from "react";
import "./ReviewOrder.css";
import DummyImage from "../assets/shirtofmen.svg"; // replace with your image

const ReviewOrder = () => {
  return (
    <div className="review-container">
      <h2 className="review-title">Review Order</h2>

      <div className="review-wrapper">
        {/* Left Product Box */}
        <div className="review-product">
          <img src={DummyImage} alt="product" className="review-image" />
          <p className="product-name">Nike one size</p>
          <p className="product-price">£20.00</p>
        </div>

        {/* Right Price Summary */}
        <div className="review-summary">
          <h3 className="summary-title">Price summary</h3>

          <div className="summary-row">
            <span>3 Day Bump</span>
            <span>$66.00</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>$68.00</span>
          </div>

          <button className="pay-btn">Pay</button>

          <p className="secure-text">
            🔒 Your Payment Details Are Encrypted And Secure
          </p>
        </div>
      </div>

      {/* Payment Box */}
      <div className="payment-box">
        <p className="payment-label">Payment</p>
        <div className="payment-method">
          <p>Use a debit card or credit card</p>

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
      </div>

    </div>
  );
};

export default ReviewOrder;
