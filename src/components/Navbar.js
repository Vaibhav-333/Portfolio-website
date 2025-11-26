// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/projects", label: "Projects", icon: "🚀" },
    { path: "/experience", label: "Experience", icon: "💼" },
    { path: "/certifications", label: "Certifications", icon: "📜" },
    { path: "/contact", label: "Contact", icon: "📬" }
  ];

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren"
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${theme}-theme`}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="navbar-container">
          <motion.div 
            className="navbar-brand"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="logo">
              <motion.span 
                className="logo-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Vaibhav
              </motion.span>
              <motion.span 
                className="logo-dot"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                .
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="navbar-desktop">
            <ul className="nav-links">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    <motion.span 
                      className="nav-icon"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="nav-text">{item.label}</span>
                    {location.pathname === item.path && (
                      <motion.div 
                        className="active-indicator"
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.button 
              className="theme-toggle"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                key={theme}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </motion.span>
              <span className="theme-text">
                {theme === "light" ? "Dark" : "Light"}
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="hamburger"
              animate={isMobileMenuOpen ? "open" : "closed"}
            >
              <motion.span
                className="hamburger-line"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="hamburger-line"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="hamburger-line"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="navbar-mobile"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.ul className="mobile-nav-links">
                {navItems.map((item) => (
                  <motion.li 
                    key={item.path}
                    variants={mobileItemVariants}
                  >
                    <Link 
                      to={item.path} 
                      className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-text">{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
                <motion.li variants={mobileItemVariants}>
                  <motion.button 
                    className="mobile-theme-toggle"
                    onClick={() => {
                      toggleTheme();
                      setIsMobileMenuOpen(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="theme-icon">
                      {theme === "light" ? "🌙" : "☀️"}
                    </span>
                    <span className="theme-text">
                      {theme === "light" ? "Dark Mode" : "Light Mode"}
                    </span>
                  </motion.button>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;