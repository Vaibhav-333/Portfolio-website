// src/components/Chatbot.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Chatbot.css";

// ── AI Orb Avatar SVG ────────────────────────────────────────────────────────
const AIOrb = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" className="ai-orb-avatar" aria-hidden="true">
    <defs>
      <radialGradient id="coreGrad" cx="40%" cy="40%">
        <stop offset="0%"   stopColor="#a5f3fc" />
        <stop offset="50%"  stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4b6cb7" />
      </radialGradient>
      <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    {/* Outer spinning ring */}
    <circle cx="19" cy="19" r="17" stroke="url(#avatarGrad)" strokeWidth="1.2"
      fill="none" strokeDasharray="8 4" className="orb-outer-ring" />
    {/* Mid pulsing ring */}
    <circle cx="19" cy="19" r="12" stroke="rgba(6,182,212,0.55)" strokeWidth="1"
      fill="none" className="orb-mid-ring" />
    {/* Core */}
    <circle cx="19" cy="19" r="7.5" fill="url(#coreGrad)" />
    {/* Specular highlight */}
    <circle cx="16.5" cy="16.5" r="2.2" fill="rgba(255,255,255,0.55)" />
  </svg>
);

// ── Neural Wave Typing Indicator ─────────────────────────────────────────────
const NeuralTyping = () => (
  <div className="neural-typing-wrapper">
    <div className="neural-wave">
      {[0, 1, 2, 3, 4].map(i => (
        <span key={i} className="neural-dot" style={{ animationDelay: `${i * 80}ms` }} />
      ))}
    </div>
    <span className="neural-thinking-text">AI is thinking...</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────

const Chatbot = ({ theme }) => {
  const [input, setInput]               = useState("");
  const [chat, setChat]                 = useState([
    {
      sender: "bot",
      message: "Hi! I'm Vaibhav's AI assistant. Ask me anything about his background, skills, or projects!",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [isOpen, setIsOpen]             = useState(false);
  const [isMinimized, setIsMinimized]   = useState(false);
  const [isTyping, setIsTyping]         = useState(false);

  // Streaming state
  const [streamingIdx, setStreamingIdx] = useState(null);   // index in chat of streaming msg
  const [isStreaming, setIsStreaming]   = useState(false);
  const streamIntervalRef               = useRef(null);

  const [showNotification, setShowNotification] = useState(false);
  const [unreadCount, setUnreadCount]   = useState(0);
  const [showHistory, setShowHistory]   = useState(true);
  const [chatHistory, setChatHistory]   = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoScroll, setAutoScroll]     = useState(true);
  const [fontSize, setFontSize]         = useState("medium");

  const chatContainerRef = useRef(null);
  const inputRef         = useRef(null);
  const audioRef         = useRef(null);

  // ── Audio init ───────────────────────────────────────────
  useEffect(() => {
    audioRef.current = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBzyU3PKmaSARTKHi7r9hGggzmduS1O2kWBML"
    );
  }, []);

  // ── Auto-scroll ──────────────────────────────────────────
  useEffect(() => {
    if (chatContainerRef.current && autoScroll) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat, autoScroll]);

  // ── Cleanup streaming on unmount ─────────────────────────
  useEffect(() => {
    return () => { if (streamIntervalRef.current) clearInterval(streamIntervalRef.current); };
  }, []);

  // ── Keyboard shortcuts ───────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isOpen && !isMinimized) setIsMinimized(true);
        else if (isOpen) setIsOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleSend();
      if ((e.ctrlKey || e.metaKey) && e.key === "r") { e.preventDefault(); handleRestartChat(); }
      if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); handleSaveChat(); }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, isMinimized, input]);

  // ── Focus input on open ──────────────────────────────────
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // ── Sound ────────────────────────────────────────────────
  const playNotificationSound = useCallback(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [soundEnabled]);

  // ── Notification popup ───────────────────────────────────
  const showNotificationPopup = useCallback(() => {
    if (!isOpen || isMinimized) {
      setShowNotification(true);
      setUnreadCount(prev => prev + 1);
      playNotificationSound();
      setTimeout(() => setShowNotification(false), 4000);
    }
  }, [isOpen, isMinimized, playNotificationSound]);

  // ── Stream text into the last bot message ────────────────
  const streamBotMessage = useCallback((fullText, chatSnapshot) => {
    const botMsg = { sender: "bot", message: "", timestamp: new Date().toISOString(), streaming: true };
    const newChat = [...chatSnapshot, botMsg];
    const msgIdx  = newChat.length - 1;
    setChat(newChat);
    setStreamingIdx(msgIdx);
    setIsStreaming(true);

    let charIdx = 0;
    streamIntervalRef.current = setInterval(() => {
      charIdx++;
      setChat(prev => {
        const updated = [...prev];
        if (updated[msgIdx]) {
          updated[msgIdx] = {
            ...updated[msgIdx],
            message:   fullText.slice(0, charIdx),
            streaming: charIdx < fullText.length,
          };
        }
        return updated;
      });
      if (charIdx >= fullText.length) {
        clearInterval(streamIntervalRef.current);
        setIsStreaming(false);
        setStreamingIdx(null);
        showNotificationPopup();
      }
    }, 15);
  }, [showNotificationPopup]);

  // ── Send message ─────────────────────────────────────────
  const handleSend = async () => {
    if (!input.trim() || isTyping || isStreaming) return;

    const userMessage = input.trim();
    const timestamp   = new Date().toISOString();
    const newChat     = [...chat, { sender: "user", message: userMessage, timestamp }];
    setChat(newChat);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("https://vaibhav-chatbot-backend.onrender.com/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ message: userMessage }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      setTimeout(() => {
        setIsTyping(false);
        streamBotMessage(data.reply, newChat);
      }, 900);

    } catch {
      setTimeout(() => {
        setIsTyping(false);
        streamBotMessage(
          "Sorry, I'm having trouble connecting right now. Please try again later or contact Vaibhav directly!",
          newChat
        );
      }, 900);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) { setUnreadCount(0); setIsMinimized(false); }
  };

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
    if (isMinimized) setUnreadCount(0);
  };

  const handleRestartChat = () => {
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    setIsStreaming(false);
    setStreamingIdx(null);
    const initial = {
      sender: "bot",
      message: "Hi! I'm Vaibhav's AI assistant. Ask me anything about his background, skills, or projects!",
      timestamp: new Date().toISOString(),
    };
    if (chat.length > 1) {
      setChatHistory(prev => [...prev, {
        id:      Date.now(),
        messages: chat,
        date:    new Date().toLocaleDateString(),
        preview: (chat[1]?.message.substring(0, 50) || "Chat session") + "...",
      }]);
    }
    setChat([initial]);
    setInput("");
    setIsTyping(false);
  };

  const handleSaveChat = () => {
    const chatText = chat
      .map(m => `${m.sender.toUpperCase()}: ${m.message}\n${new Date(m.timestamp).toLocaleString()}\n\n`)
      .join("");
    const blob = new Blob(
      [`Vaibhav's AI Assistant - Chat Session\nGenerated: ${new Date().toLocaleString()}\n${"─".repeat(50)}\n\n`, chatText],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a   = document.createElement("a");
    a.href     = url;
    a.download = `vaibhav-ai-chat-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadChatHistory   = (item) => { setChat(item.messages); setChatHistory(prev => prev.filter(h => h.id !== item.id)); setShowHistory(false); };
  const deleteChatHistory = (id)   => setChatHistory(prev => prev.filter(h => h.id !== id));
  const formatTime        = (ts)   => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ── Animation variants ───────────────────────────────────
  const chatVariants = {
    hidden:    { opacity: 0, scale: 0.85, y: 40, transformOrigin: "bottom right" },
    visible:   { opacity: 1, scale: 1,    y: 0,  transformOrigin: "bottom right" },
    minimized: { opacity: 1, scale: 0.3,  y: 200, transformOrigin: "bottom right" },
  };

  const messageVariants = {
    hidden:  { opacity: 0, y: 18, scale: 0.95 },
    visible: { opacity: 1, y: 0,  scale: 1    },
  };

  const quickQuestions = [
    "Tell me about Vaibhav",
    "His ML projects?",
    "Skills & tech stack?",
    "Work experience?",
    "How to contact him?",
  ];

  return (
    <>
      {/* ── Notification Popup ── */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className={`notification-popup ${theme}-theme`}
            initial={{ opacity: 0, y: 40, x: 30 }}
            animate={{ opacity: 1, y: 0,  x: 0 }}
            exit={{    opacity: 0, y: 40, x: 30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="notification-content">
              <div className="notification-header">
                <AIOrb />
                <span>New message from AI Assistant</span>
              </div>
              <div className="notification-preview">
                {chat[chat.length - 1]?.message.substring(0, 70)}...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Chat Button ── */}
      <motion.div
        className={`chat-toggle-button ${theme}-theme`}
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{   scale: 0.9 }}
        animate={{
          boxShadow: isOpen
            ? "0 0 0 0 rgba(124,58,237,0.4)"
            : ["0 0 0 0 rgba(124,58,237,0.4)", "0 0 0 22px rgba(124,58,237,0)"],
        }}
        transition={{ boxShadow: { duration: 2, repeat: isOpen ? 0 : Infinity, ease: "easeOut" } }}
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>
          {isOpen ? "✕" : <span className="chat-btn-icon">💬</span>}
        </motion.div>
        {unreadCount > 0 && (
          <motion.div className="unread-badge" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            {unreadCount}
          </motion.div>
        )}
        {!isOpen && (
          <motion.div className="chat-notification" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
            Ask me anything!
          </motion.div>
        )}
      </motion.div>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chatbot-container ${theme}-theme ${fontSize}-font`}
            variants={chatVariants}
            initial="hidden"
            animate={isMinimized ? "minimized" : "visible"}
            exit="hidden"
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              boxShadow: "0 0 40px rgba(124,58,237,0.18), 0 20px 60px rgba(0,0,0,0.35)",
            }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="header-info">
                <div className="bot-avatar-wrap">
                  <AIOrb />
                </div>
                <div className="bot-details">
                  <h4>Vaibhav's AI Assistant</h4>
                  <span className="status">Online</span>
                </div>
              </div>

              <div className="header-controls">
                <motion.button className="control-button" onClick={() => setShowSettings(!showSettings)}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="Settings">⚙️</motion.button>
                <motion.button className="control-button" onClick={handleSaveChat}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="Save Chat (Ctrl+S)">💾</motion.button>
                <motion.button className="control-button" onClick={handleRestartChat}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="Restart (Ctrl+R)">🔄</motion.button>
                <motion.button className="control-button" onClick={toggleMinimize}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="Minimize">
                  {isMinimized ? "🔲" : "➖"}
                </motion.button>
                <motion.button className="close-button" onClick={toggleChat}
                  whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }} title="Close (Esc)">✕</motion.button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Settings Panel */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div className="settings-panel"
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <div className="settings-group">
                        <label>
                          <input type="checkbox" checked={soundEnabled} onChange={e => setSoundEnabled(e.target.checked)} />
                          🔔 Sound notifications
                        </label>
                        <label>
                          <input type="checkbox" checked={autoScroll} onChange={e => setAutoScroll(e.target.checked)} />
                          📜 Auto-scroll messages
                        </label>
                      </div>
                      <div className="settings-group">
                        <label>Font size:</label>
                        <select value={fontSize} onChange={e => setFontSize(e.target.value)}>
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Chat History toggle */}
                {chatHistory.length > 0 && (
                  <div className="history-toggle">
                    <motion.button className="history-button" onClick={() => setShowHistory(!showHistory)}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      📚 Chat History ({chatHistory.length})
                      <span className={`arrow ${showHistory ? "up" : "down"}`}>▼</span>
                    </motion.button>
                  </div>
                )}

                <AnimatePresence>
                  {showHistory && chatHistory.length > 0 && (
                    <motion.div className="chat-history"
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      {chatHistory.map(item => (
                        <div key={item.id} className="history-item">
                          <div className="history-info" onClick={() => loadChatHistory(item)}>
                            <div className="history-date">{item.date}</div>
                            <div className="history-preview">{item.preview}</div>
                          </div>
                          <button className="delete-history" onClick={() => deleteChatHistory(item.id)}>🗑️</button>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Messages */}
                <div className="chat-messages" ref={chatContainerRef}>
                  <AnimatePresence>
                    {chat.map((entry, idx) => (
                      <motion.div
                        key={idx}
                        className={`message ${entry.sender}`}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ type: "spring", stiffness: 280, damping: 22, delay: idx === 0 ? 0 : 0 }}
                      >
                        {entry.sender === "bot" && <div className="bot-dot" />}
                        <div className="message-content">
                          <div className="message-bubble">
                            {entry.message}
                            {entry.streaming && <span className="stream-cursor">|</span>}
                          </div>
                          <div className="message-time">{formatTime(entry.timestamp)}</div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Neural typing indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div className="message bot typing"
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                        transition={{ type: "spring", stiffness: 280, damping: 22 }}>
                        <div className="bot-dot" />
                        <div className="message-content">
                          <div className="message-bubble">
                            <NeuralTyping />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input area */}
                <div className="chat-input-container">
                  <div className="input-wrapper">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about Vaibhav's skills, projects, or experience..."
                      className="chat-input"
                      disabled={isTyping || isStreaming}
                    />
                    <motion.button
                      onClick={handleSend}
                      className="send-button"
                      disabled={!input.trim() || isTyping || isStreaming}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{   scale: 0.93 }}
                      title="Send (Enter)"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.button>
                  </div>

                  <div className="quick-questions">
                    {quickQuestions.map((q, idx) => (
                      <motion.button key={idx} className="quick-question" onClick={() => setInput(q)}
                        whileHover={{ scale: 1.04, boxShadow: "0 0 12px rgba(124,58,237,0.3)" }}
                        whileTap={{ scale: 0.96 }}>
                        {q}
                      </motion.button>
                    ))}
                  </div>

                  <div className="keyboard-shortcuts">
                    <small>💡 Enter to send · Esc to close · Ctrl+R restart · Ctrl+S save</small>
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
