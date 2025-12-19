import React from "react";
import { Search, Clock } from "lucide-react";
import "./ManageAccountData.css";

const ManageAccountData = ({ onBack }) => {
  return (
    <div className="manage-container">
      <div className="manage-header">
        <h2>Manage your Account Data</h2>
        <button className="request-btn">Request Data</button>
      </div>
      <p className="manage-desc">
        Request and download a copy of your Vinted account data. <br />
        <span className="learn-more">Learn more about account data</span>
      </p>

      <div className="manage-card">
        <Search className="manage-icon" />
        <div>
          <h4>What's include in your data?</h4>
          <p>
            It includes your profile details, items, messages, and a broad range of other data
            related to your account.
          </p>
          <p className="contact">
            Want more information on why we collect and use your data, who we share it with, or how
            long we keep it? <span>Contact us</span>
          </p>
        </div>
      </div>

      <div className="manage-card">
        <Clock className="manage-icon" />
        <div>
          <h4>How is your Data formatted?</h4>
          <p>
            A copy of your data will be provided as a Zip archive of HTML files, photos, and PDFs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageAccountData;
