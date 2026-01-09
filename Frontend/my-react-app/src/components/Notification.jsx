import React,{useContext, useEffect, useState} from "react";
import "./Notifications.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageSquare,
  Info,
  Gift,
  UserPlus,
  Heart,
  Package,
  Bell,
  UserMinus,
  Tag
} from "lucide-react";
import useNotifications from "../hooks/useNotifications";
import { Link } from "react-router-dom";
import API from "../api/api";

const ICON_MAP = {
  "message-square": MessageSquare,
  info: Info,
  gift: Gift,
  "user-plus": UserPlus,
  "user-minus": UserMinus,
  heart: Heart,
  package: Package,
  tag: Tag,
  bell: Bell
};

const NotificationIcon = ({ iconName }) => {
  const IconComponent = ICON_MAP[iconName] || Bell;

  return (
    <div className="notification-icon">
      <IconComponent size={20} className="icon-color" />
    </div>
  );
};

const processNotification = (notification) => {
  const { type, metaData } = notification;
  let message = "";
  let title = "";
  let iconName = "";
  const metadata = metaData || {};

  switch (type) {
    case "ITEM_LIKED":
      title = "New Like";
      message = `${metadata.actor_name} liked your item ${metadata.item_title}.`;
      iconName = "heart";
      break;

    case "NEW_MESSAGE":
      title = "New Message";
      message = `${metadata.actor_name} sent you a new message: ${
        metadata.item_title || "Check your inbox"
      }`;
      iconName = "message-square";
      break;

    case "ORDER_SHIPPED":
      title = "Order Shipped";
      message = `Your order #${metadata.order_id} has been shipped via ${metadata.courier_name}.`;
      iconName = "package";
      break;

    case "FOLLOWED_YOU":
      title = "New Follower";
      message = `${metadata.actor_name} started following you.`;
      iconName = "user-plus";
      break;

    case "UNFOLLOWED_YOU":
      title = "Unfollowed";
      message = `${metadata.actor_name} unfollowed you.`;
      iconName = "user-minus";
      break;

    case "PRICE_DROP":
      title = "Price Drop Alert";
      message = `The price of ${metadata.item_title} has dropped.`;
      iconName = "tag";
      break;

    default:
      title = "General Update";
      message = "You have a new update.";
      iconName = "bell";
  }
  console.log(notification);

  return {
    ...notification,
    title,
    message,
    icon: iconName
  };
};

const InlineLoader = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.65)",
          pointerEvents: "none",
          borderRadius: "12px"
        }}
      >
        <motion.div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "3px solid rgba(0,0,0,0.12)",
            borderTopColor: "#111",
            boxSizing: "border-box"
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        />
      </motion.div>
    )}
  </AnimatePresence>
);

const Notifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    Notifications: fetchedNotifications,
    NotificationsError,
    NotificationsLoading,
    totalPages
  } = useNotifications(currentPage, 8);

  const {user,setUser} = useContext(AuthContext);
  const Redirect = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [activeNotificationId, setActiveNotificationId] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (fetchedNotifications) {
      setNotifications(fetchedNotifications);
    }
  }, [fetchedNotifications]);

  if (NotificationsLoading) {
    return (
      <div className="notifications-container loading">
        Loading notifications...
      </div>
    );
  }

  if (NotificationsError) {
    return (
      <div className="notifications-container error">
        Error loading notifications. Please try again.
      </div>
    );
  }

  const notificationsToDisplay = notifications || [];
  const processedNotifications = notificationsToDisplay.map(processNotification);

  if (processedNotifications.length === 0) {
    return (
      <div className="notifications-container">
        <div className="notifications-header">
          <p className="breadcrumb-notification">Home / Notifications</p>
        </div>
        <div className="empty-state">No new notifications.</div>
      </div>
    );
  }

  const HandleClickSingleNotification = async (event, selectedNotification) => {
    event.preventDefault();
    event.stopPropagation();

    if (isNavigating || !selectedNotification?._id) return;

    setIsNavigating(true);
    setActiveNotificationId(selectedNotification._id);

    try {
      if (selectedNotification?.status !== "READ") {
        const updateNotificationReadStatus = {
          notificationId:selectedNotification?._id,
          status:"READ"
        };
        await API.patch("/api/notifications/update-notification-status",updateNotificationReadStatus,{withCredentials:true});

        // Update local notifications list
        setNotifications((prev) => prev.map((n) => 
          n._id === selectedNotification._id ? { ...n, status: "READ" } : n
        ));

        // Decrement unread count safely
        if (user && user.unread_notifications_count > 0) {
          setUser({
            ...user,
            unread_notifications_count: user.unread_notifications_count - 1
          });
        }
      }
      Redirect(selectedNotification?.linkUrl || "/", { replace:false });
    } catch (e) {
      console.log(e);
      setActiveNotificationId(null);
      setIsNavigating(false);
      return;
    }
  };

  const HandleReadAllNotifications = async () => {
    try {
      const checkUnreadMessagesExist = processedNotifications.filter( (n) => n.status === "UNREAD");
      if(checkUnreadMessagesExist.length < 1){
        return false;
      }
      const response = await API.get("/api/notifications/read-all-notifications",{withCredentials:true});
      // Mark all notifications as read locally
      setNotifications((prev) => prev.map((n) => ({ ...n, status: "READ" })));

      // Reset unread count on user
      if (user) {
        setUser({
          ...user,
          unread_notifications_count: 0
        });
      }
    } catch (e) {
      return console.log(e);
    }
  };
  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <p className="breadcrumb-notification">Home / Notifications</p>
        <button className="mark-read-btn" disabled={user?.unread_notifications_count > 0 ? false : true} onClick={HandleReadAllNotifications}>Mark all as read</button>
      </div>

      <div className="notification-list">
        {processedNotifications.map((n) => (
          <Link
            key={n?._id}
            to={n?.linkUrl || "/"}
            style={{textDecoration:"none"}}
            onClick={(event) => HandleClickSingleNotification(event, n)}
          >
            <div
              className={`notification-item ${n.status !== "READ" ? "active" : ""}`}
              style={{ position:"relative" }}
            >
              <div className="notification-left">
                <div className="notification-icon">
                  <NotificationIcon iconName={n.icon} />
                </div>
                <div className="notification-text">
                  <h4>{n?.title}</h4>
                  <p>{n.message}</p>
                </div>
              </div>
              <span className="notification-time">
                {new Date(n.createdAt).toLocaleTimeString()}
              </span>
              <InlineLoader visible={activeNotificationId === n._id} />
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="notifications-pagination">
          {Array.from({ length: totalPages }, (_, idx) => {
            const pageNumber = idx + 1;
            return (
              <button
                key={pageNumber}
                
                className={`notifications-page-button ${pageNumber === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;
