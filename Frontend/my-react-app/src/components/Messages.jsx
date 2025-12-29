import React, { useEffect, useContext, useState } from "react";
import "./Messages.css";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import user1 from "../assets/user1.svg";
import userEmptyState from "../../public/user-empty-state.svg";

import {
  Mic,
  Link as LinkIcon,
  Smile,
  Search,
  MessageCircle,
  ArrowRight
} from "lucide-react";

/** Hooks */
import useChats from "../hooks/useChats";
import useSockets from "../hooks/useSockets";
import useSendMessage from "../hooks/useSendMessage";
import API from "../api/api";

/** Contexts */
import { ChatContext } from "../contexts/ChatProvider";
import { AuthContext } from "../contexts/AuthProvider";
import { MessageContext } from "../contexts/MessageProvider";

const Messages = () => {
  const { register, handleSubmit,setValue } = useForm();
  const { SendMessage } = useSendMessage();
  const location = useLocation();

  const [filteredChats, setFilteredChats] = useState([]);

  /** Contexts */
  const { selectedChat, setSelectChat, chats, setChats } = useContext(ChatContext);
  const { Data, chatMessages, setChatMessages } = useContext(MessageContext);
  const { user } = useContext(AuthContext);

  const { Chats, ChatsError, ChatsLoading } = useChats();
  const { JoinChat, NewMessage, onlineStatusUpdates, typingUsers, emitTypingStart, emitTypingStop } = useSockets();
  
  // Track online status for the selected chat member
  const [selectedChatMemberStatus, setSelectedChatMemberStatus] = useState(null);
  
  // Typing indicator debounce timer
  const typingTimeoutRef = React.useRef(null);
  const isTypingRef = React.useRef(false);

  // Handle navigation state (when coming from Ask Seller button)
  useEffect(() => {
    const chatIdFromState = location.state?.chatId;
    
    if (chatIdFromState && Chats?.length > 0) {
      const targetChat = Chats.find(c => c._id === chatIdFromState);
      if (targetChat) {
        setSelectChat(targetChat);
        JoinChat(targetChat._id);
        setFilteredChats(Chats);
        // Clear the state to avoid re-triggering
        window.history.replaceState({}, document.title);
        return;
      }
    }
    
    // Default behavior: select first chat if no selection
    if (Chats?.length > 0 && !selectedChat && !chatIdFromState) {
      setSelectChat(Chats[0]);
      JoinChat(Chats[0]._id);
      setFilteredChats(Chats);
    }
  }, [Chats, location.state]);

  // Update selected chat member's online status from socket updates
  useEffect(() => {
    if (selectedChat?.member?._id) {
      const memberId = selectedChat.member._id.toString();
      const statusUpdate = onlineStatusUpdates[memberId];
      if (statusUpdate) {
        setSelectedChatMemberStatus(statusUpdate.isOnline);
      } else {
        // Use the isOnline from the chat data
        setSelectedChatMemberStatus(selectedChat.member.isOnline);
      }
    }
  }, [selectedChat, onlineStatusUpdates]);

  // Get online status for a chat member (with real-time updates)
  const getMemberOnlineStatus = (member) => {
    if (!member?._id) return false;
    const memberId = member._id.toString();
    const statusUpdate = onlineStatusUpdates[memberId];
    if (statusUpdate) {
      return statusUpdate.isOnline;
    }
    return member.isOnline || false;
  };

  const HandleSearchChat = (e) => {
    const value = e.target.value.toLowerCase();

    if (!value) {
      setFilteredChats(Chats);
      return;
    }

    const filtered = Chats?.filter(chat =>
      chat?.member?.fullname?.toLowerCase().includes(value) ||
      chat?.member?.username?.toLowerCase().includes(value) ||
      chat?.member?.email?.toLowerCase().includes(value)
    );

    setFilteredChats(filtered);
  };

  useEffect(() => {
    if (NewMessage) {
      setChatMessages(prev => [...prev, NewMessage]);
      // Stop typing indicator when a new message arrives (other user sent a message)
      if (selectedChat && NewMessage.chatId === selectedChat._id) {
        // Clear typing state for this chat when message arrives
        if (typingUsers[selectedChat._id]) {
          // The typing state will be cleared by the socket event, but we can also clear it here
        }
      }
    }
  }, [NewMessage, selectedChat, typingUsers]);

  const HandleJoinChat = (chat) => {
    setSelectChat(chat);
    JoinChat(chat._id);
  };

  const HandleSubmitMessage = (data) => {
    if (!selectedChat) return;

    // Stop typing indicator when message is sent
    if (isTypingRef.current) {
      emitTypingStop(selectedChat._id);
      isTypingRef.current = false;
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    SendMessage({
      content: data.messageInput,
      chatId: selectedChat._id
    });
    setValue("messageInput","");
  };

  // Handle typing detection with debouncing
  const handleInputChange = (e) => {
    if (!selectedChat) return;
    
    const value = e.target.value;
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // If user is typing and we haven't sent typing-start yet
    if (value.length > 0 && !isTypingRef.current) {
      emitTypingStart(selectedChat._id);
      isTypingRef.current = true;
    }
    
    // Set timeout to stop typing indicator after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      if (isTypingRef.current) {
        emitTypingStop(selectedChat._id);
        isTypingRef.current = false;
      }
    }, 3000);
  };

  // Cleanup typing indicator on unmount or chat change
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (isTypingRef.current && selectedChat) {
        emitTypingStop(selectedChat._id);
        isTypingRef.current = false;
      }
    };
  }, [selectedChat, emitTypingStop]);
  
  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  return (
    <div className="messages-container">
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <p className="breadcrumb">Home / Messages</p>
        <h3 className="sidebar-title">Messages</h3>

        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search"
            onChange={HandleSearchChat}
          />
        </div>

        <div className="all-chats-heading">
          <MessageCircle className="message-icon" size={16} />
          <p>All Chats</p>
        </div>

        <div className="chat-list">
          {!ChatsLoading &&
            ChatsError === null &&
            filteredChats?.map((c, idx) => (
              <div
                key={c?._id || idx}
                className={`chat-item ${
                  selectedChat?._id === c?._id ? "active" : ""
                }`}
                onClick={() => HandleJoinChat(c)}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={c?.member?.profileImage || userEmptyState}
                    onError={(e) => (e.target.src = user1)}
                    alt={c?.member?.fullname}
                  />
                  {/* Online status indicator */}
                  {getMemberOnlineStatus(c?.member) && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#10b981',
                        border: '2px solid white',
                        borderRadius: '50%',
                        display: 'block'
                      }}
                    />
                  )}
                </div>
                <div>
                  <p style={{marginBottom:"2px"}} className="chat-name">
                    {c?.member?.fullname ||
                      c?.member?.username ||
                      "Unknown User"}
                  </p>
                  <p style={{marginTop:"5px"}} className="chat-snippet">
                    {typingUsers[c?._id] && Object.keys(typingUsers[c._id]).length > 0
                      ? "Typing..."
                      : (c?.lastMessage?.content ? `Last message: ${c.lastMessage.content}` : "No messages yet")
                    }
                  </p>
                </div>
                <span className="chat-time">{formatTime(c?.lastMessage?.createdAt)}</span>
              </div>
            ))}
        </div>
      </aside>

      {/* Chat Section */}
      <main className="chat-main">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-user">
            <img
              src={selectedChat?.member?.profileImage || userEmptyState}
              alt="user"
            />
            <div>
              <h4>
                {selectedChat?.member?.fullname ||
                  selectedChat?.member?.username ||
                  selectedChat?.member?.email}
              </h4>
              <span className="active-status">
                {selectedChatMemberStatus !== null 
                  ? (selectedChatMemberStatus ? "Active Now" : "Offline")
                  : (selectedChat?.member?.isOnline ? "Active Now" : "Offline")
                }
              </span>
            </div>
          </div>

          <div className="chat-actions">
            <button 
              className="cancel-offer"
              onClick={async () => {
                if (!selectedChat?._id) return;
                try {
                  await API.delete(`/api/chats/delete-chat/${selectedChat._id}`);
                  // Remove chat from local state
                  const updatedChats = Chats.filter(c => c._id !== selectedChat._id);
                  setFilteredChats(updatedChats);
                  // Update chats in context
                  setChats(updatedChats);
                  // Select first chat if available, otherwise null
                  if (updatedChats.length > 0) {
                    setSelectChat(updatedChats[0]);
                    JoinChat(updatedChats[0]._id);
                  } else {
                    setSelectChat(null);
                  }
                } catch (error) {
                  console.error("Error deleting chat:", error);
                  alert("Failed to delete chat. Please try again.");
                }
              }}
            >
              Close Deal
            </button>
            <button className="payment-btn">Make a Payment</button>
          </div>
        </div>

        {/* Messages */}
        {!Data.ChatMessagesLoading && (
          <div className="chat-body">
            {chatMessages?.map((message, idx) => (
              <div key={idx}>
                {message?.sender?._id === user?._id ? (
                  <div className="chat-message receiver">
                    <div className="message-bubble">
                      <p>{message.content}</p>
                      <span>Now</span>
                    </div>
                    <img
                      src={user?.profileImage || userEmptyState}
                      onError={ (e) => e.target.src = userEmptyState}
                      alt="you"
                    />
                  </div>
                ) : (
                  <div className="chat-message sender">
                    <img
                      src={
                        message?.sender?.profileImage || userEmptyState
                      }
                      onError={ (e) => e.target.src = userEmptyState}
                      alt="sender"
                    />
                    <div className="message-bubble">
                      <p>{message.content}</p>
                      <span>Now</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Typing indicator */}
            {selectedChat && typingUsers[selectedChat._id] && Object.keys(typingUsers[selectedChat._id]).length > 0 && (
              <div className="chat-message sender">
                <img
                  src={selectedChat?.member?.profileImage || userEmptyState}
                  onError={(e) => (e.target.src = userEmptyState)}
                  alt="typing"
                />
                <div className="message-bubble">
                  <p style={{ fontStyle: "italic", color: "#666" }}>Typing...</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit(HandleSubmitMessage)}>
          <div className="chat-input">
            <div className="input-wrapper">
              <Mic className="left-icon" size={16} />
              <input
                autoComplete="off"
                type="text"
                placeholder="Write a message..."
                {...register("messageInput", { 
                  required: true,
                  onChange: (e) => {
                    handleInputChange(e);
                  }
                })}
              />
              <div className="right-icons" style={{display:"flex",alignItems:"center",}} >
                <LinkIcon className="input-icon" size={16} />
                <Smile size={16} className="input-icon" />
                <button type="submit" style={{ background: "transparent" }}>
                  <ArrowRight size={16} className="input-icon"/>
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Messages;
