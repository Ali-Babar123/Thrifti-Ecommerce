import React, { useEffect, useContext, useState } from "react";
import "./Messages.css";
import { useForm } from "react-hook-form";

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

/** Contexts */
import { ChatContext } from "../contexts/ChatProvider";
import { AuthContext } from "../contexts/AuthProvider";
import { MessageContext } from "../contexts/MessageProvider";

const Messages = () => {
  const { register, handleSubmit,setValue } = useForm();
  const { SendMessage } = useSendMessage();

  const [filteredChats, setFilteredChats] = useState([]);

  /** Contexts */
  const { selectedChat, setSelectChat } = useContext(ChatContext);
  const { Data, chatMessages, setChatMessages } = useContext(MessageContext);
  const { user } = useContext(AuthContext);

  const { Chats, ChatsError, ChatsLoading } = useChats();
  const { JoinChat, NewMessage } = useSockets();

  useEffect(() => {
    if (Chats?.length > 0 && !selectedChat) {
      setSelectChat(Chats[0]);
      JoinChat(Chats[0]._id);
      setFilteredChats(Chats);
    }
  }, [Chats]);

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
    }
  }, [NewMessage]);

  const HandleJoinChat = (chat) => {
    setSelectChat(chat);
    JoinChat(chat._id);
  };

  const HandleSubmitMessage = (data) => {
    if (!selectedChat) return;

    SendMessage({
      content: data.messageInput,
      chatId: selectedChat._id
    });
    setValue("messageInput","");
  };
  
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
                <img
                  src={c?.profileImage || userEmptyState}
                  onError={(e) => (e.target.src = user1)}
                  alt={c?.member?.fullname}
                />
                <div>
                  <p style={{marginBottom:"2px"}} className="chat-name">
                    {c?.member?.fullname ||
                      c?.member?.username ||
                      "Unknown User"}
                  </p>
                  <p style={{marginTop:"5px"}} className="chat-snippet">Last message: {c?.lastMessage?.content}</p>
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
              <span className="active-status">Active Now</span>
            </div>
          </div>

          <div className="chat-actions">
            <button className="cancel-offer">Cancel Offer</button>
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
                {...register("messageInput", { required: true })}
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
