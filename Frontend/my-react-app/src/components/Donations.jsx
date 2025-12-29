// RecurringDonations.jsx
import React, { useState } from "react";
import "./Donations.css";
import { X, ChevronRight, ChevronDown, CheckCircle } from "lucide-react";

const charity = {
  name: "Médecins du Monde (MDM, or Doctors of the World)",
  desc: "A humanitarian organisation providing assistance and health services to those affected by the war in Ukraine.",
  img: "https://i.imgur.com/0y0y0y0.png",
};

const RecurringDonations = () => {
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);
  const [rate, setRate] = useState(10);

  return (
    <>
      {/* TOP SECTION */}
      {!active ? (
        <div className="recurring-donations-container">
          <h2 className="recurring-donations-title">Recurring donations</h2>

          <p className="recurring-donations-text">
            Donate a portion of your proceeds when you sell on Vinted.{" "}
            <a href="#" className="recurring-donations-link">Learn more</a>
          </p>

          <button
            className="recurring-donations-button"
            onClick={() => setStep(1)}
          >
            Set up Recurring donations
          </button>
        </div>
      ) : (
        <div className="recurring-donations-container">

          <h2 className="recurring-donations-title">Recurring donations</h2>

          <p className="recurring-donations-text">
            Donate a portion of your proceeds when you sell on Vinted.{" "}
            <a href="#" className="recurring-donations-link">Learn more</a>
          </p>

          {/* ACTIVE BOX */}
          <div className="recurring-donations-active-box">
            <div className="recurring-donations-active-left">
              <CheckCircle className="recurring-donations-active-icon" size={40} />

              <div>
                <h3 className="recurring-donations-active-title">Active</h3>
                <p className="recurring-donations-active-desc">
                  {rate}% of future sales will be donated to {charity.name}
                </p>
              </div>
              
            </div>
            <div className="manage-btn">
               <button
              className="recurring-donations-manage-btn"
              onClick={() => setStep(3)}
            >
              Manage
            </button>
            </div>

           
          </div>
          

          {/* DONATION TOTAL */}
          <div className="recurring-donations-total-box">
            <span>Total you’ve donated</span>
            <strong>£0.00</strong>
          </div>
        </div>
      )}

      {/* STEP 1 — SELECT CHARITY */}
      {step === 1 && (
        <div className="recurring-donations-modal-overlay">
          <div className="recurring-donations-modal-box">
            <div className="recurring-donations-modal-header">
              <h3>Set up Recurring donations</h3>

              <X
                size={18}
                onClick={() => setStep(0)}
                className="recurring-donations-close-icon"
              />
            </div>

            <p className="recurring-donations-modal-label">Select a charity</p>

            <div
              className="recurring-donations-charity-card"
              onClick={() => setStep(2)}
            >
              <img
                src={charity.img}
                alt="charity"
                className="recurring-donations-charity-img"
              />

              <div className="recurring-donations-charity-info">
                <h4>{charity.name}</h4>
                <p>{charity.desc}</p>
              </div>

              <ChevronRight className="recurring-donations-arrow-right" />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 — SET RATE */}
      {step === 2 && (
        <div className="recurring-donations-modal-overlay">
          <div className="recurring-donations-modal-box">
            <div className="recurring-donations-modal-header">
              <h3>Set up Recurring donations</h3>

              <X
                size={18}
                onClick={() => setStep(0)}
                className="recurring-donations-close-icon"
              />
            </div>

            <p className="recurring-donations-modal-label">Donation</p>

            <div className="recurring-donations-charity-card">
              <img
                src={charity.img}
                alt="charity"
                className="recurring-donations-charity-img"
              />

              <div className="recurring-donations-charity-info">
                <h4>{charity.name}</h4>
                <p>{charity.desc}</p>
              </div>
            </div>

            <p className="recurring-donations-modal-label">Donation rate</p>

           <div className="recurring-donations-dropdown">
              <select
                className="recurring-donations-rate-select"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              >
                {[...Array(10)].map((_, i) => {
                  const val = (i + 1) * 10;
                  return (
                    <option key={val} value={val}>
                      {val}%
                    </option>
                  );
                })}
              </select>
            </div>

            <p className="recurring-donations-modal-note">
              This is the percentage of all future sales that will be donated to
              the charity.
            </p>

            <button
              className="recurring-donations-start-btn"
              onClick={() => {
                setActive(true);
                setStep(0);
              }}
            >
              Start Recurring donations
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — MANAGE */}
      {step === 3 && (
        <div className="recurring-donations-modal-overlay">
          <div className="recurring-donations-modal-box recurring-donations-manage-modal">
            <div className="recurring-donations-modal-header">
              <h3>Manage Recurring donations</h3>

              <X
                size={18}
                onClick={() => setStep(0)}
                className="recurring-donations-close-icon"
              />
            </div>

            <p className="recurring-donations-modal-label">Donation</p>

            <div className="recurring-donations-charity-card recurring-donations-charity-large">
              <img
                src={charity.img}
                alt="charity"
                className="recurring-donations-charity-img-large"
              />

              <div className="recurring-donations-charity-info">
                <h4>{charity.name}</h4>
                <p>{charity.desc}</p>
              </div>
            </div>

            <button className="recurring-donations-black-btn">
              Change My Charity
            </button>

            <p className="recurring-donations-modal-label">Donation rate</p>

            <div className="recurring-donations-dropdown">
              <select
                className="recurring-donations-rate-select"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              >
                {[...Array(10)].map((_, i) => {
                  const val = (i + 1) * 10;
                  return (
                    <option key={val} value={val}>
                      {val}%
                    </option>
                  );
                })}
              </select>
            </div>

            <p className="recurring-donations-modal-note">
              This is the percentage of all future sales that will be donated to
              the charity.
            </p>

            <button
              className="recurring-donations-stop-btn"
              onClick={() => {
                setActive(false);
                setStep(0);
              }}
            >
              Stop Recurring donations
            </button>

            <button
              className="recurring-donations-save-btn"
              onClick={() => setStep(0)}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecurringDonations;
