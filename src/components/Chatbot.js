// src/components/Chatbot.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Chatbot.css";

const Chatbot = ({ theme }) => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([
    { 
      sender: "bot", 
      message: "Hi! I'm Vaibhav's AI assistant. Ask me anything about his background, skills, or projects! 🤖",
      timestamp: new Date().toISOString()
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showHistory, setShowHistory] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const audioRef = useRef(null);

  // Initialize audio for notifications
  useEffect(() => {
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBzyU3PKmaSARTKHi7r9hGggzmduS1O2kWBML');
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current && autoScroll) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat, autoScroll]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ESC to close/minimize
      if (e.key === 'Escape') {
        if (isOpen && !isMinimized) {
          setIsMinimized(true);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
      
      // Ctrl/Cmd + Enter to send
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleSend();
      }
      
      // Ctrl/Cmd + R to restart conversation
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        handleRestartChat();
      }
      
      // Ctrl/Cmd + S to save chat
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveChat();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, isMinimized, input]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {}); // Ignore errors
    }
  }, [soundEnabled]);

  // Show notification popup
  const showNotificationPopup = useCallback((message) => {
    if (!isOpen || isMinimized) {
      setShowNotification(true);
      setUnreadCount(prev => prev + 1);
      playNotificationSound();
      
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
    }
  }, [isOpen, isMinimized, playNotificationSound]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const timestamp = new Date().toISOString();
    const newMessage = { sender: "user", message: userMessage, timestamp };
    const newChat = [...chat, newMessage];
    
    setChat(newChat);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Simulate typing delay for better UX
      setTimeout(() => {
        const botMessage = { 
          sender: "bot", 
          message: data.reply, 
          timestamp: new Date().toISOString() 
        };
        setChat([...newChat, botMessage]);
        setIsTyping(false);
        showNotificationPopup(data.reply);
      }, 1000);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        sender: "bot", 
        message: "Sorry, I'm having trouble connecting right now. Please try again later or contact Vaibhav directly!",
        timestamp: new Date().toISOString()
      };
      setChat([...newChat, errorMessage]);
      setIsTyping(false);
      showNotificationPopup(errorMessage.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setUnreadCount(0);
    }
  };

  const handleRestartChat = () => {
    const initialMessage = {
      sender: "bot",
      message: "Hi! I'm Vaibhav's AI assistant. Ask me anything about his background, skills, or projects! 🤖",
      timestamp: new Date().toISOString()
    };
    
    // Save current chat to history
    if (chat.length > 1) {
      setChatHistory(prev => [...prev, {
        id: Date.now(),
        messages: chat,
        date: new Date().toLocaleDateString(),
        preview: chat[1]?.message.substring(0, 50) + "..." || "Chat session"
      }]);
    }
    
    setChat([initialMessage]);
    setInput("");
    setIsTyping(false);
  };

  const handleSaveChat = () => {
    const chatText = chat.map(msg => 
      `${msg.sender.toUpperCase()}: ${msg.message}\n${new Date(msg.timestamp).toLocaleString()}\n\n`
    ).join('');
    
    const blob = new Blob([
      `Vaibhav's AI Assistant - Chat Session\n`,
      `Generated on: ${new Date().toLocaleString()}\n`,
      `${'-'.repeat(50)}\n\n`,
      chatText
    ], { type: 'text/plain' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vaibhav-ai-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadChatHistory = (historyItem) => {
    setChat(historyItem.messages);
    setChatHistory(prev => prev.filter(item => item.id !== historyItem.id));
    setShowHistory(false);
  };

  const deleteChatHistory = (historyId) => {
    setChatHistory(prev => prev.filter(item => item.id !== historyId));
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const chatVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transformOrigin: "bottom right"
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transformOrigin: "bottom right"
    },
    minimized: {
      opacity: 1,
      scale: 0.3,
      y: 200,
      transformOrigin: "bottom right"
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Notification Popup */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className={`notification-popup ${theme}-theme`}
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="notification-content">
              <div className="notification-header">
                <span className="bot-avatar">🤖</span>
                <span>New message from AI Assistant</span>
              </div>
              <div className="notification-preview">
                {chat[chat.length - 1]?.message.substring(0, 60)}...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.div
        className={`chat-toggle-button ${theme}-theme`}
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: isOpen 
            ? "0 0 0 0 rgba(75, 108, 183, 0.4)" 
            : ["0 0 0 0 rgba(75, 108, 183, 0.4)", "0 0 0 20px rgba(75, 108, 183, 0)"]
        }}
        transition={{ 
          boxShadow: {
            duration: 2,
            repeat: isOpen ? 0 : Infinity,
            ease: "easeOut"
          }
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? "✕" : "💬"}
        </motion.div>
        
        {unreadCount > 0 && (
          <motion.div 
            className="unread-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {unreadCount}
          </motion.div>
        )}
        
        {!isOpen && (
          <motion.div 
            className="chat-notification"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            Ask me anything!
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chatbot-container ${theme}-theme ${fontSize}-font`}
            variants={chatVariants}
            initial="hidden"
            animate={isMinimized ? "minimized" : "visible"}
            exit="hidden"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="header-info">
                <div className="bot-avatar">🤖</div>
                <div className="bot-details">
                  <h4>Vaibhav's AI Assistant</h4>
                  <span className="status">Online</span>
                </div>
              </div>
              
              <div className="header-controls">
                {/* Settings Button */}
                <motion.button
                  className="control-button"
                  onClick={() => setShowSettings(!showSettings)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Settings"
                >
                  ⚙️
                </motion.button>
                
                {/* Save Button */}
                <motion.button
                  className="control-button"
                  onClick={handleSaveChat}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Save Chat (Ctrl+S)"
                >
                  💾
                </motion.button>
                
                {/* Restart Button */}
                <motion.button
                  className="control-button"
                  onClick={handleRestartChat}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Restart Conversation (Ctrl+R)"
                >
                  🔄
                </motion.button>
                
                {/* Minimize Button */}
                <motion.button
                  className="control-button"
                  onClick={toggleMinimize}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Minimize"
                >
                  {isMinimized ? "🔲" : "➖"}
                </motion.button>
                
                {/* Close Button */}
                <motion.button
                  className="close-button"
                  onClick={toggleChat}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  title="Close (Esc)"
                >
                  ✕
                </motion.button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Settings Panel */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      className="settings-panel"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="settings-group">
                        <label>
                          <input
                            type="checkbox"
                            checked={soundEnabled}
                            onChange={(e) => setSoundEnabled(e.target.checked)}
                          />
                          🔔 Sound notifications
                        </label>
                        
                        <label>
                          <input
                            type="checkbox"
                            checked={autoScroll}
                            onChange={(e) => setAutoScroll(e.target.checked)}
                          />
                          📜 Auto-scroll messages
                        </label>
                      </div>
                      
                      <div className="settings-group">
                        <label>Font size:</label>
                        <select 
                          value={fontSize} 
                          onChange={(e) => setFontSize(e.target.value)}
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* History Toggle */}
                {chatHistory.length > 0 && (
                  <div className="history-toggle">
                    <motion.button
                      onClick={() => setShowHistory(!showHistory)}
                      className="history-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      📚 Chat History ({chatHistory.length})
                      <span className={`arrow ${showHistory ? 'up' : 'down'}`}>▼</span>
                    </motion.button>
                  </div>
                )}

                {/* Chat History */}
                <AnimatePresence>
                  {showHistory && chatHistory.length > 0 && (
                    <motion.div
                      className="chat-history"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {chatHistory.map(item => (
                        <div key={item.id} className="history-item">
                          <div className="history-info" onClick={() => loadChatHistory(item)}>
                            <div className="history-date">{item.date}</div>
                            <div className="history-preview">{item.preview}</div>
                          </div>
                          <button 
                            className="delete-history"
                            onClick={() => deleteChatHistory(item.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Chat Messages */}
                <div className="chat-messages" ref={chatContainerRef}>
                  <AnimatePresence>
                    {chat.map((entry, idx) => (
                      <motion.div
                        key={idx}
                        className={`message ${entry.sender}`}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="message-content">
                          <div className="message-bubble">
                            {entry.message}
                          </div>
                          <div className="message-time">
                            {formatTime(entry.timestamp)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      className="message bot typing"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="message-content">
                        <div className="message-bubble">
                          <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input Area */}
                <div className="chat-input-container">
                  <div className="input-wrapper">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about Vaibhav's skills, projects, or experience..."
                      className="chat-input"
                      disabled={isTyping}
                    />
                    <motion.button
                      onClick={handleSend}
                      className="send-button"
                      disabled={!input.trim() || isTyping}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Send message (Enter)"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.button>
                  </div>
                  
                  <div className="quick-questions">
                    {["Tell me about Vaibhav", "His projects?", "Skills?"].map((question, idx) => (
                      <motion.button
                        key={idx}
                        className="quick-question"
                        onClick={() => setInput(question)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="keyboard-shortcuts">
                    <small>💡 Tips: Enter to send • Esc to close • Ctrl+R to restart • Ctrl+S to save</small>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;