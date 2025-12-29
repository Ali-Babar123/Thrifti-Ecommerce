import React from "react";
import "./Payment.css";

const PaymentSuccess = () => {
  return (
    <div className="payment-success-container">
      <div className="payment-box">
        <div className="checkmark">&#10004;</div>
        <h2 className="success-title">Payment Successful</h2>
        <p className="success-text">
          Thank You For Choosing <strong>Modimal</strong>, Your Order Will Be
          Generated Based On Your Delivery Request.
        </p>
        <p className="success-text">
          The Receipt Has Been Sent To Your Email.
        </p>
        <p className="contact-text">Please Contact Us For Any Query</p>
        <p className="contact-number">+1(929)460-3208</p>
        <p className="or-text">OR</p>
        <p className="email-text">Hello @ Modimal.Com</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
