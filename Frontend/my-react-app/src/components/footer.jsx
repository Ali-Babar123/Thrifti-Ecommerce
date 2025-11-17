import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section email-section">
        <p>
          This is a community-driven marketplace. We don’t hold or sell
          inventory. All items are listed by independent sellers.
        </p>
        <div className="email-input">
          <input type="email" placeholder="Your Email" />
          <button>&#9654;</button>
        </div>
      </div>

      <div className="footer-section links-section">
        <h4>Home</h4>
        <ul>
          <li>About Us</li>
          <li>How it Works</li>
          <li>Careers</li>
          <li>Selling</li>
          <li>Buying</li>
        </ul>
      </div>

      <div className="footer-section links-section">
        <h4>Customer Support</h4>
        <ul>
          <li>Complaint Center</li>
          <li>Dealing Partners</li>
          <li>Privacy Policy</li>
          <li>Terms of Use</li>
          <li>Trust and Safety</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
