import React, {useState} from "react";
import "./Settings.css";
import ProfileDetails from "./ProfileDetails";
import AccountSettings from "./AccountSettings";
import Postage from './Postage'
import BundleDiscount from "./BundleDiscounts";
import PrivacySettings from "./PrivacySettings";
import NewNotifications from "./NewNotification";
import ManageAccountData from "./ManageAccountData";
import Security from "./Security";
import AddPayment from "./AddPayment";
const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
     
    <div className="settings-container">
      
      {/* Sidebar */}
      <div className="settings-sidebar">
        <ul>
          <li 
            className={activeTab === "profile" ? "settings-active" : ""} 
            onClick={() => setActiveTab("profile")}
          >
            Profile details
          </li>

          <li 
            className={activeTab === "account" ? "settings-active" : ""} 
            onClick={() => setActiveTab("account")}
          >
            Account settings
          </li>

          <li className={activeTab === "postage" ? "settings-active" : ""} 
            onClick={() => setActiveTab("postage")}
            >
              Postage</li>
          <li
          className={activeTab === "add-payment" ? "settings-active" : ""} 
            onClick={() => setActiveTab("add-payment")}>Payments</li>
          <li
          className={activeTab === "bundle-discounts" ? "settings-active" : ""} 
            onClick={() => setActiveTab("bundle-discounts")}>Bundle discounts</li>
          <li
          className={activeTab === "notification" ? "settings-active" : ""} 
            onClick={() => setActiveTab("notification")}
            >Notifications</li>
          <li
            className={activeTab === "privacy-setting" ? "settings-active" : ""} 
            onClick={() => setActiveTab("privacy-setting")}>Privacy settings</li>
          <li
           className={activeTab === "security" ? "settings-active" : ""} 
            onClick={() => setActiveTab("security")}>Security</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="settings-content">

        {activeTab === "profile" && <ProfileDetails />}
        {activeTab === "account" && <AccountSettings />}
          {activeTab === "postage" && <Postage/>}
          {activeTab === "bundle-discounts" && <BundleDiscount/>}
          {activeTab === "notification" && <NewNotifications/>}
          

         {activeTab === "privacy-setting" && (
    <PrivacySettings onManageData={() => setActiveTab("manage-data")} />
  )}
  {activeTab === "manage-data" && (
    <ManageAccountData onBack={() => setActiveTab("privacy-setting")} />
  )}
          {activeTab === "security" && <Security/>}

          {activeTab === "add-payment" && <AddPayment/>}
      
      </div>

    </div>

  );
};

export default Settings;
