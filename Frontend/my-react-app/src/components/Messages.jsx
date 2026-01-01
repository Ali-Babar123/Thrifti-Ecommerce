import React from "react";
import "./Messages.css";
import user1 from "../assets/user1.svg";
import user2 from "../assets/user2.svg";
import {
  Mic,
  Link as LinkIcon,
  Smile,
  Search,
  MessageCircle,
} from "lucide-react";

const Messages = () => {
  return (
    <div className="messages-container">
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <p className="breadcrumb">Home / Messages</p>
        <h3 className="sidebar-title">Messages </h3>

        <div className="search-box">
  <Search className="search-icon" size={18} />
  <input type="text" placeholder="Search" />
</div>


        <div className="all-chats-heading">
            <MessageCircle className="message-icon" size={16} />
          
          <p>All Chats</p>
        </div>

        <div className="chat-list">
          <div className="chat-item active">
            <img src={user1} alt="Fashion House" />
            <div>
              <p className="chat-name">Fashion House</p>
              <p className="chat-snippet">Thanks for offering to...</p>
            </div>
            <span className="chat-time">04:24 AM</span>
          </div>

          <div className="chat-item">
            <img src={user2} alt="Mango" />
            <div>
              <p className="chat-name">Mango</p>
              <p className="chat-snippet">Perfect! The payment...</p>
            </div>
            <span className="chat-time">04:24 AM</span>
          </div>
        </div>
      </aside>

      {/* Chat Section */}
      <main className="chat-main">
        <div className="chat-header">
          <div className="chat-user">
            <img src={user1} alt="Fashion House" />
            <div>
              <h4>Fashion House</h4>
              <p>Help with grocery shopping</p>
              <span className="active-status">Active Now</span>
            </div>
          </div>

          <div className="chat-actions">
            <button className="cancel-offer">Cancel Offer</button>
            <button className="payment-btn">Make a Payment</button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-body">
          <div className="chat-message sender">
            <img src={user2} alt="You" />
            <div className="message-bubble">
              <p>Hey! I’m ready to help you with the grocery shopping.</p>
              <span>12:42 PM</span>
            </div>
          </div>

          <div className="chat-message receiver">
            <div className="message-bubble">
              <p>That’s great! Thank you so much 😊</p>
              <span>12:45 PM</span>
            </div>
            <img src={user1} alt="Fashion House" />
          </div>

          <div className="chat-message sender">
            <img src={user2} alt="You" />
            <div className="message-bubble">
              <p>What time should I come tomorrow?</p>
              <span>01:12 PM</span>
            </div>
          </div>

          <div className="chat-message receiver">
            <div className="message-bubble">
              <p>Let’s plan for 2 PM, I’ll share the list before that.</p>
              <span>01:15 PM</span>
            </div>
            <img src={user1} alt="Fashion House" />
          </div>
        </div>

        {/* Input Section with icons inside */}
        <div className="chat-input">
          <div className="input-wrapper">
            <Mic className="input-icon left-icon" size={16} />
            <input type="text" placeholder="Write a message..." />
            <div className="right-icons">
              <LinkIcon className="input-icon" size={16} />
              <Smile className="input-icon" size={16} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
