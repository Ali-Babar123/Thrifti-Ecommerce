import React, { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import "./AddPayment.css";

const AddPayment = () => {
  const [activeSection, setActiveSection] = useState(null);

  const paymentIcons = (
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
  );

  return (
    <div className="addpayment-container">
      <h2 className="addpayment-title">Payments</h2>

      {/* Default View */}
      {!activeSection && (
        <>
          <div className="addpayment-section">
            <h4 className="addpayment-subtitle">Payment Options</h4>
            <div className="addpayment-box">
              <div
                className="addpayment-item"
                onClick={() => setActiveSection("card")}
              >
                <span className="addpayment-text">Add Card</span>
                <ChevronRight size={18} className="addpayment-arrow" />
              </div>
            </div>
          </div>

          <div className="addpayment-section">
            <h4 className="addpayment-subtitle">Withdrawal Options</h4>
            <div className="addpayment-box">
              <div
                className="addpayment-item"
                onClick={() => setActiveSection("bank")}
              >
                <span className="addpayment-text">Add Bank Account</span>
                <ChevronRight size={18} className="addpayment-arrow" />
              </div>

              <div
                className="addpayment-item"
                onClick={() => setActiveSection("billing")}
              >
                <span className="addpayment-text">Billing Address</span>
                <ChevronRight size={18} className="addpayment-arrow" />
              </div>

              <div
                className="addpayment-item"
                onClick={() => setActiveSection("hmrc")}
              >
                <span className="addpayment-text">HMRC Reporting Centre</span>
                <ChevronRight size={18} className="addpayment-arrow" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add Card */}
      {activeSection === "card" && (
        <div className="popup-card">
          <div className="popup-header">
            <h3>Card Details</h3>
            <X onClick={() => setActiveSection(null)} className="close-icon" />
            <p>Your card information is securely encrypted</p>
          </div>
          {paymentIcons}
          <form className="form">
            <label>Card Holder's Name</label>
            <input type="text" placeholder="John Doe" />
            <label>Card Number</label>
            <input type="text" placeholder="e.g., 1234 1234 1234 1234" />
            <div className="form-row">
              <input type="text" placeholder="MM/YYYY" />
              <input type="text" placeholder="CVV" />
            </div>
            <button>Use this Card</button>
            <button
              type="button"
              className="cancel"
              onClick={() => setActiveSection(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Add Bank Account */}
      {activeSection === "bank" && (
        <div className="popup-card">
          <div className="popup-header">
            <h3>Add Bank Account</h3>
            <X onClick={() => setActiveSection(null)} className="close-icon" />
            <p>Your card information is securely encrypted</p>
          </div>
          {paymentIcons}
          <form className="form">
            <label>Card Holder's Name</label>
            <input type="text" placeholder="John Doe" />
            <label>Card Number</label>
            <input type="text" placeholder="e.g., 1234 1234 1234 1234" />
            <div className="form-row">
              <input type="text" placeholder="MM/YYYY" />
              <input type="text" placeholder="CVV" />
            </div>
            <label>Billing Address</label>
            <input type="text" placeholder="Add Address" />
            <button>Save</button>
            <button
              type="button"
              className="cancel"
              onClick={() => setActiveSection(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Billing Address */}
      {activeSection === "billing" && (
        <div className="popup-card">
          <div className="popup-header">
            <h3>Billing Address</h3>
            <X onClick={() => setActiveSection(null)} className="close-icon" />
          </div>
          <form className="form">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" />
            <label>Country</label>
            <select>
              <option>United Kingdom</option>
              <option>United States</option>
            </select>
            <input type="text" placeholder="Address line 1" />
            <input type="text" placeholder="Address line 2" />
            <input type="text" placeholder="Post Code" />
            <button>Save Address</button>
            <button
              type="button"
              className="cancel"
              onClick={() => setActiveSection(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* HMRC Reporting Centre */}
      {activeSection === "hmrc" && (
        <div className="popup-card">
          <div className="popup-header">
            <h3>HMRC Reporting Centre</h3>
            <X onClick={() => setActiveSection(null)} className="close-icon" />
          </div>
          <div className="hmrc-empty">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
              alt="Empty"
            />
            <p>No information to show</p>
            <span>We’ll let you know if anything changes.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPayment;
