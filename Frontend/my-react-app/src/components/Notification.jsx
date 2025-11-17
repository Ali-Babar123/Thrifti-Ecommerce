import React from "react";
import "./Notifications.css";
import {
  CheckCircle,
  MessageSquare,
  Info,
  Gift,
} from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      icon: <CheckCircle />,
      title: "Booking Confirmation",
      message: "Your ride to 123 Elm Street has been booked for tomorrow at 9:00 AM.",
      time: "2h",
      active: true,
    },
    {
      icon: <MessageSquare />,
      title: "New Message",
      message: 'New message from Alex: "I’m running 5 minutes late."',
      time: "1h",
    },
    {
      icon: <Info />,
      title: "System Alert",
      message: "System maintenance scheduled for tonight between 1:00 AM and 3:00 AM.",
      time: "3h",
    },
    {
      icon: <Gift />,
      title: "Promotion",
      message: "Get 20% off your next ride with promo code SPRING20.",
      time: "4h",
    },
    {
      icon: <CheckCircle />,
      title: "Booking Confirmation",
      message: "Your ride to 456 Oak Avenue has been booked for tomorrow at 10:00 AM.",
      time: "5h",
    },
    {
      icon: <MessageSquare />,
      title: "New Message",
      message: 'New message from Ben: "I’m at the pickup location."',
      time: "6h",
    },
    {
      icon: <Info />,
      title: "System Alert",
      message: "System maintenance scheduled for tonight between 2:00 AM and 4:00 AM.",
      time: "7h",
    },
    {
      icon: <Gift />,
      title: "Promotion",
      message: "Get 15% off your next ride with promo code SUMMER15.",
      time: "8h",
    },
  ];

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <p className="breadcrumb-notification">Home / Messages</p>
        <button className="mark-read-btn">Mark all as read</button>
      </div>

      <div className="notification-list">
        {notifications.map((n, index) => (
          <div
            key={index}
            className={`notification-item ${n.active ? "active" : ""}`}
          >
            <div className="notification-left">
              <div className="notification-icon">{n.icon}</div>
              <div className="notification-text">
                <h4>{n.title}</h4>
                <p>{n.message}</p>
              </div>
            </div>
            <span className="notification-time">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
