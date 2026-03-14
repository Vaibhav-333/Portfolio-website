import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import profileImg from "../assets/photo_2023-12-30_13-16-19.jpg";
import bgImg from "../assets/20250927_112409.jpg.jpeg";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Linkedin, Mail, Home as HomeIcon, Briefcase, Award, User, FileText } from "lucide-react";
import "./AppLayout.css";

const AppLayout = ({ children, theme, onThemeToggle }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const navLinks = [
        { name: "Home", icon: <HomeIcon size={18} />, href: "/" },
        { name: "Projects", icon: <Briefcase size={18} />, href: "/projects" },
        { name: "Experience", icon: <User size={18} />, href: "/experience" },
        { name: "Certifications", icon: <Award size={18} />, href: "/certifications" },
        { name: "Contact", icon: <Mail size={18} />, href: "/contact" },
    ];

    return (
        <div className={`app-layout ${theme}-theme`}>

            {/* ── Global Background Image (all pages) ── */}
            <div className="global-bg-image">
                <img src={bgImg} alt="" aria-hidden="true" />
                <div className="global-bg-overlay" />
            </div>

            {/* ── Left Sidebar ── */}
            <motion.aside
                className="left-sidebar"
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Profile */}
                <div className="sidebar-profile">
                    <div className="sidebar-profile-img-wrapper">
                        <motion.div
                            className="sidebar-profile-glow"
                            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <img src={profileImg} alt="Vaibhav Awasthi" className="sidebar-profile-img" />
                    </div>
                    <p className="sidebar-name">Vaibhav.</p>
                    <div className="sidebar-status">
                        <div className="status-dot" />
                        <span>Available</span>
                    </div>
                </div>

                <div className="sidebar-divider" />

                {/* Nav */}
                <nav className="sidebar-nav">
                    {navLinks.map((link, i) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className={`sidebar-nav-link ${isActive ? "active" : ""}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i + 0.3 }}
                                whileHover={{ x: 6 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(link.href);
                                }}
                            >
                                <span className="sidebar-nav-icon">{link.icon}</span>
                                <span className="sidebar-nav-label">{link.name}</span>
                            </motion.a>
                        );
                    })}
                </nav>

                {/* Theme toggle */}
                {onThemeToggle && (
                    <button className="sidebar-theme-toggle" onClick={onThemeToggle}>
                        <span>{theme === "dark" ? "☀️" : "🌙"}</span>
                        <span className="sidebar-nav-label">{theme === "dark" ? "Light" : "Dark"}</span>
                    </button>
                )}

                {/* Socials */}
                <div className="sidebar-socials">
                    <a href="https://github.com/Vaibhav-333" target="_blank" rel="noopener noreferrer" title="GitHub">
                        <Github size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/vaibhav-awasthi-5a3b28202/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                        <Linkedin size={18} />
                    </a>
                    <a href="https://x.com/httpsvaibhav" target="_blank" rel="noopener noreferrer" title="X">
                        <X size={18} />
                    </a>
                    <a href="mailto:awasthivaibhav333@gmail.com" title="Email">
                        <Mail size={18} />
                    </a>
                </div>

                <p className="sidebar-copyright">© 2025 Vaibhav Awasthi</p>
            </motion.aside>

            {/* ── Page Content ── */}
            <div className="page-content">
                {children}
            </div>

        </div>
    );
};

export default AppLayout;