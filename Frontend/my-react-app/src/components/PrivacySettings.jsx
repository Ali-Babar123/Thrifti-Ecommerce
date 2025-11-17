import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import "./PrivacySettings.css";

const PrivacySettings = ({ onManageData }) => {
  const [settings, setSettings] = useState({
    marketing: true,
    notify: true,
    tracking: true,
    personalize: true,
    recentlyViewed: true,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="privacy-container">
      <h2 className="privacy-title">Privacy Setting</h2>

      <div className="privacy-card">
        <div className="privacy-row">
          <div className="privacy-text">
            <h4>Feature my items in marketing campaigns for a chance to sell faster</h4>
            <p>
              This allows Vinted to showcase my items on social media and other websites. 
              The increased visibility could lead to quicker sales.
            </p>
          </div>
          <label className="privacy-switch">
            <input
              type="checkbox"
              checked={settings.marketing}
              onChange={() => toggleSetting("marketing")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="privacy-row">
          <div className="privacy-text">
            <h4>Notify owners when I favourite their items</h4>
          </div>
          <label className="privacy-switch">
            <input
              type="checkbox"
              checked={settings.notify}
              onChange={() => toggleSetting("notify")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="privacy-row">
          <div className="privacy-text">
            <h4>Allow third-party tracking</h4>
          </div>
          <label className="privacy-switch">
            <input
              type="checkbox"
              checked={settings.tracking}
              onChange={() => toggleSetting("tracking")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="privacy-row">
          <div className="privacy-text">
            <h4>
              Allow Vinted to personalise my feed and search results by evaluating my preferences,
              settings, previous purchases and usage of Vinted website and app
            </h4>
          </div>
          <label className="privacy-switch">
            <input
              type="checkbox"
              checked={settings.personalize}
              onChange={() => toggleSetting("personalize")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="privacy-row">
          <div className="privacy-text">
            <h4>Allow Vinted to display my recently viewed items on my Homepage.</h4>
            <p>
              If you turn this option off but allow personalised content, these items will still be
              used to personalise your feed.
            </p>
          </div>
          <label className="privacy-switch">
            <input
              type="checkbox"
              checked={settings.recentlyViewed}
              onChange={() => toggleSetting("recentlyViewed")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="privacy-row no-border" onClick={onManageData}>
          <div className="privacy-text">
            <h4>Manage your Account Data</h4>
            <p>Request and Download a copy of your Vinted account data.</p>
          </div>
          <ChevronRight className="arrow-icon" />
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
