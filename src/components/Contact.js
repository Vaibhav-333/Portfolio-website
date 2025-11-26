// src/components/Contact.js
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs.sendForm("service_j3wn4or", "template_11vu05g", form.current, "U5Z0pqZRDguX6I1Pa")
      .then(() => {
        setSubmitStatus('success');
        e.target.reset();
      })
      .catch(() => {
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Navigation handler for smooth scrolling
const handleNavigation = (pageName) => {
  const routes = {
    'home': '/',
    'projects': '/projects',
    'experience': '/experience', 
    'certifications': '/certifications'
  };
  
  navigate(routes[pageName] || '/');
};

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/vaibhav-awasthi-5a3b28202/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: "#0077B5"
    },
    {
      name: "GitHub",
      url: "https://github.com/Vaibhav-333",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: "#333"
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/httpsvaibhav",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
        </svg>
      ),
      color: "#000"
    },
    {
      name: "Email",
      url: "mailto:awasthivaibhav333@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z"/>
        </svg>
      ),
      color: "#EA4335"
    },
    {
      name: "Telegram",
      url: "https://t.me/Liveeverymomentoflifee",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      color: "#0088CC"
    }
  ];

const quickLinks = [
  { name: "Home", id: "home" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Certifications", id: "certifications" }
];

  const currentYear = new Date().getFullYear();

  return (
    <div className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2>📨 Let's Connect</h2>
          <p className="contact-subtitle">
            I'd love to hear from you! Whether you have a project in mind, want to collaborate, 
            or just want to say hello, feel free to reach out.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <h3>🚀 Ready to Work Together?</h3>
              <p>I'm always excited to work on new projects and collaborate with amazing people. Let's build something great together!</p>
            </div>

            <div className="social-links">
              <h4>Connect with me:</h4>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ '--social-color': social.color }}
                    title={`Connect on ${social.name}`}
                  >
                    {social.icon}
                    <span className="social-tooltip">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-stats">
              <div className="stat-item">
                <span className="stat-number">24h</span>
                <span className="stat-label">Response Time</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Ideas</span>
              </div>
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="form-group">
              <input 
                type="text" 
                name="user_name" 
                placeholder="Your Name" 
                required 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="user_email" 
                placeholder="Your Email" 
                required 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                name="subject" 
                placeholder="Subject" 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea 
                name="message" 
                placeholder="Your Message" 
                required 
                rows="6"
                className="form-textarea"
              />
            </div>
            
            <button 
              type="submit" 
              className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && (
                <svg className="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="m22 2-7 20-4-9-9-4 20-7z"/>
                  <path d="M22 2L11 13"/>
                </svg>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="status-message success">
                ✅ Thanks for connecting with me! I will get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="status-message error">
                ❌ Error sending message. Please try again or contact me directly.
              </div>
            )}
          </form>
        </div>
      </div>

      <footer className="contact-footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="brand-logo">
                <h3>Vaibhav Awasthi</h3>
                <div className="brand-accent"></div>
              </div>
              <p className="brand-description">
                Passionate Data Science Enthusiast crafting innovative data solutions 
                with modern technologies and creative problem-solving.
              </p>
              <div className="brand-stats">
                <div className="brand-stat">
                  <span className="stat-value">12+</span>
                  <span className="stat-text">Projects</span>
                </div>
                <div className="brand-stat">
                  <span className="stat-value">3+</span>
                  <span className="stat-text">Years</span>
                </div>
                <div className="brand-stat">
                  <span className="stat-value">100%</span>
                  <span className="stat-text">Dedicated</span>
                </div>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>Navigation</h4>
                <ul>
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <button 
                        onClick={() => handleNavigation(link.id)}
                        className="footer-nav-link"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h4>Services</h4>
                <ul>
                  <li>Machine Learning</li>
                  <li>Deep Learning </li>
                  <li>Data Analytics</li>
                  <li>Statistical Models</li>
                  <li>OpenCV Models</li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Technologies</h4>
                <ul>
                  <li>Python & Jupyter</li>
                  <li>PowerBI & Tableau</li>
                  <li>MongoDB & SQL</li>
                  <li>AWS & Scikit</li>
                  <li>YOLOv8 & YOLOv7</li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Get In Touch</h4>
                <div className="contact-info-footer">
                  <div className="contact-item">
                    <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <a href="mailto:awasthivaibhav333@gmail.com">awasthivaibhav333@gmail.com</a>
                  </div>
                  <div className="contact-item">
                    <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>Kanpur, Uttar Pradesh, IN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p className="footer-copyright">
                © {currentYear} Vaibhav Awasthi. All rights reserved.
              </p>
              <div className="footer-legal">
                <button className="legal-link">Privacy Policy</button>
                <span className="legal-separator">•</span>
                <button className="legal-link">Terms of Service</button>
              </div>
            </div>

            <div className="footer-bottom-center">
              <p className="footer-tagline">
                <span className="tagline-icon">💡</span>
                Building the future, one line of code at a time
              </p>
            </div>

            <div className="footer-bottom-right">
              <div className="footer-social">
                {socialLinks.slice(0, 4).map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    style={{ '--social-color': social.color }}
                    title={`Follow on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;