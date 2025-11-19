import React, { useState } from "react";
import "./InviteFriends.css";
import { ChevronRight, Copy, Users } from "lucide-react";
import Links from '../assets/links.svg'
import Friends from '../assets/Friends.svg'
import Vouchers from '../assets/vouchers.svg'

const InviteFriends = () => {
  const inviteLink = "http://www.thrifti.co.uk/invite/";
  const [openModal, setOpenModal] = useState(false);


  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied!");
  };

  return (
    <>
    
    <div className="invite-wrapper">

  {/* CARD HOLDER (gets padding) */}
  <div className="card-holder">
    <div className="invite-card">
      <h2 className="invite-title">Invite friends and<br />earn up to £15</h2>

      <p className="invite-desc">
        Get £5 to shop on Vinted when your friend lists 3 items
        within 7 days of signing up. Get £10 more when they sell an
        item within the first 30 days.
      </p>

      <p className="invite-terms">
        The referral program is subject to <a href="#">terms.</a>
      </p>

      <input type="text" value={inviteLink} readOnly className="invite-input" />

      <button className="copy-btn" onClick={copyLink}>
        Copy Invite Link
      </button>

      <div className="your-referrals-row" onClick={() => setOpenModal(true)}>
        <div className="ref-left">
          <Users size={20} />
          <span>Your referrals</span>
        </div>
        <ChevronRight size={20} />
      </div>
    </div>
  </div>

  {/* RIGHT IMAGE FULL WIDTH */}
  <div className="invite-image"></div>

</div>


      <h2 className="referrals-heading">How referrals work</h2>
     <div className="referral-container">


      <div className="referral-box">
        <img src={Links} alt="Share" className="referral-icon" />
        <h3>Share your link</h3>
        <p>
          Invite people to join Vinted by sharing your link with them.
        </p>
      </div>

      <div className="referral-box">
        <img src={Friends} alt="Friends list" className="referral-icon" />
        <h3>Tell your friends to list</h3>
        <p>
          If they list 3 items within 7 days of joining Vinted, you’ll get  
          2 vouchers worth £2.50 each. If they sell an item within 30 days of 
          joining, you’ll get another 5 vouchers worth £2.00 each.
        </p>
      </div>

      <div className="referral-box">
        <img src={Vouchers} alt="Vouchers" className="referral-icon" />
        <h3>Spend your vouchers</h3>
        <p>
          Buy an item that costs £15.00 or more (not including shipping), and 
          one of your vouchers will be automatically deducted from the item price.
        </p>
      </div>

    </div>


    {openModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <button className="modal-close" onClick={() => setOpenModal(false)}>×</button>

      <h2 className="modal-title">Your referrals</h2>

      <div className="modal-icon">
        <Users size={50} strokeWidth={1.2} />
      </div>

      <p className="modal-bold-text">No friends have joined yet</p>

      <p className="modal-light-text">
        Earn up to £15 to spend on Vinted – share your invite link with friends
      </p>
    </div>
  </div>
)}


    </>
  );
};

export default InviteFriends;
