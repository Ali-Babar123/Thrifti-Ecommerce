import React from "react";
import "./NewAlerts.css";
import { CheckCircle, MessageSquare, Info, Gift } from "lucide-react";

const NewAlerts = () => {
  const alerts = [
    {
      icon: <CheckCircle />,
      title: "Booking Confirmation",
      message:
        "Your ride to 123 Elm Street has been booked for tomorrow at 9:00 AM.",
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
      message:
        "System maintenance scheduled for tonight between 1:00 AM and 3:00 AM.",
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
      message:
        "Your ride to 456 Oak Avenue has been booked for tomorrow at 10:00 AM.",
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
      message:
        "System maintenance scheduled for tonight between 2:00 AM and 4:00 AM.",
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
    <div className="alerts-container">
      <div className="alerts-header">
        <p className="alerts-breadcrumb">Notifications</p>
        <button className="alerts-mark-btn">Mark all as read</button>
      </div>

      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`alerts-item ${alert.active ? "active" : ""}`}
          >
            <div className="alerts-left">
              <div className="alerts-icon">{alert.icon}</div>
              <div className="alerts-text">
                <h4>{alert.title}</h4>
                <p>{alert.message}</p>
              </div>
            </div>
            <span className="alerts-time">{alert.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewAlerts;
