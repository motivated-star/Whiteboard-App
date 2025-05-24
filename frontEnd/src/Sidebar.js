
import { useRef, useState, useEffect } from "react"

const Sidebar = ({ users, user, socket }) => {
  const sideBarRef = useRef(null)
  const [activeTab, setActiveTab] = useState("users")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const openSideBar = () => {
    sideBarRef.current.style.left = 0
  }

  const closeSideBar = () => {
    sideBarRef.current.style.left = -100 + "%"
  }

  useEffect(() => {
    const handleIncomingMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("chat-message", handleIncomingMessage);

    return () => {
      socket.off("chat-message", handleIncomingMessage);
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        username: user.userName,
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, newMessage])
      socket.emit("chat-message", newMessage)
      setMessage("")
    }
  }

  return (
    <>
      <button className="btn sidebar-trigger" onClick={openSideBar}>
        👥 Users & Chat
      </button>
      <div className="sidebar-container" ref={sideBarRef}>
        <div className="sidebar-header">
          <div className="sidebar-tabs">
            <button
              className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              👥 Users
            </button>
            <button className={`tab-btn ${activeTab === "chat" ? "active" : ""}`} onClick={() => setActiveTab("chat")}>
              💬 Chat
            </button>
          </div>
          <button className="close-btn" onClick={closeSideBar}>
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          {activeTab === "users" && (
            <div className="users-section">
              <div className="section-title">Online Users ({users.length})</div>
              <div className="users-list">
                {users.map((usr, index) => (
                  <div key={index} className="user-item">
                    <div className="user-avatar">{usr.username.charAt(0).toUpperCase()}</div>
                    <div className="user-info">
                      <span className="username">{usr.username}</span>
                      {usr.id === socket.id && <span className="you-badge">You</span>}
                    </div>
                    <div className="user-status"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "chat" && (
            <div className="chat-section">
              <div className="section-title">Room Chat</div>
              <div className="messages-container">
                {messages.length === 0 ? (
                  <div className="no-messages">No messages yet. Start the conversation!</div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.username === user.userName ? "own-message" : ""}`}>
                      <div className="message-header">
                        <span className="message-username">{msg.username}</span>
                        <span className="message-time">{msg.timestamp}</span>
                      </div>
                      <div className="message-text">{msg.message}</div>
                    </div>
                  ))
                )}
              </div>
              <form onSubmit={sendMessage} className="chat-input-form">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="chat-input"
                  maxLength={200}
                />
                <button type="submit" className="send-btn" disabled={!message.trim()}>
                  📤
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .sidebar-trigger {
          position: absolute;
          top: 5%;
          left: 5%;
          background: rgba(102, 126, 234, 0.9);
          backdrop-filter: blur(10px);
          color: #fff;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          padding: 10px 15px;
          font-weight: 600;
          transition: all 0.3s ease;
          z-index: 10000;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .sidebar-trigger:hover {
          background: rgba(118, 75, 162, 0.9);
          transform: translateY(-2px);
          color: #fff;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
        }

        .sidebar-container {
          position: fixed;
          top: 0;
          left: -100%;
          width: 320px;
          height: 100vh;
          background: rgba(102, 126, 234, 0.95);
          backdrop-filter: blur(20px);
          border-right: 2px solid rgba(255, 255, 255, 0.3);
          transition: 0.3s ease;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          box-shadow: 5px 0 25px rgba(0, 0, 0, 0.3);
        }

        .sidebar-header {
          padding: 20px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(118, 75, 162, 0.3);
        }

        .sidebar-tabs {
          display: flex;
          gap: 8px;
        }

        .tab-btn {
          background: rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          color: #fff;
          transform: translateY(-1px);
        }

        .tab-btn.active {
          background: rgba(255, 255, 255, 0.9);
          color: #667eea;
          border-color: rgba(255, 255, 255, 0.8);
          font-weight: 700;
        }

        .close-btn {
          background: rgba(231, 76, 60, 0.8);
          color: #fff;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: bold;
        }

        .close-btn:hover {
          background: rgba(192, 57, 43, 0.9);
          transform: scale(1.1);
        }

        .sidebar-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .section-title {
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          padding: 20px 20px 15px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.2);
          background: rgba(118, 75, 162, 0.2);
        }

        .users-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .users-list {
          flex: 1;
          overflow-y: auto;
          padding: 15px;
          min-height: 0;
          -webkit-overflow-scrolling: touch;
        }

        .user-item {
          display: flex;
          align-items: center;
          padding: 15px;
          margin-bottom: 10px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .user-item:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateX(8px);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          color: #667eea;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          margin-right: 15px;
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .user-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .username {
          color: #fff;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .you-badge {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.75rem;
          margin-top: 3px;
          font-weight: 500;
        }

        .user-status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #2ecc71;
          margin-left: 10px;
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .chat-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 15px;
          min-height: 0;
          -webkit-overflow-scrolling: touch;
        }

        .no-messages {
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
          padding: 30px 20px;
          font-weight: 500;
        }

        .message {
          margin-bottom: 15px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .message.own-message {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
          margin-left: 20px;
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .message-username {
          color: #fff;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .message-time {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .message-text {
          color: #fff;
          font-size: 0.9rem;
          line-height: 1.4;
          font-weight: 500;
        }

        .chat-input-form {
          padding: 20px;
          border-top: 2px solid rgba(255, 255, 255, 0.2);
          display: flex;
          gap: 12px;
          background: rgba(118, 75, 162, 0.2);
        }

        .chat-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          padding: 12px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .chat-input:focus {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.6);
          outline: none;
        }

        .chat-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        .send-btn {
          background: rgba(255, 255, 255, 0.9);
          color: #667eea;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 10px;
          padding: 12px 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 700;
        }

        .send-btn:hover:not(:disabled) {
          background: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .sidebar-container {
            width: 280px;
          }
          
          .sidebar-trigger {
            font-size: 0.8rem;
            padding: 8px 12px;
          }
        }
      `}</style>
    </>
  )
}

export default Sidebar
