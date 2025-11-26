import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import profileImg from "../assets/photo_2023-12-30_13-16-19.jpg";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { X, Github, Linkedin, Download, Eye, ZoomIn, ZoomOut, ExternalLink, Mail, Phone } from "lucide-react";
import Chatbot from "./Chatbot";

const Home = ({ theme }) => {
  const { scrollYProgress } = useScroll();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showConnectDropdown, setShowConnectDropdown] = useState(false);
  const [resumeZoom, setResumeZoom] = useState(1);

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Particle animation setup
  useEffect(() => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 120, 180, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw subtle connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(100, 120, 180, ${0.05 * (1 - distance / 80)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  const skillIcons = [
    { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776ab", level: 90 },
    { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#f7df1e", level: 85 },
    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61dafb", level: 88 },
    { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#00758f", level: 82 },
    { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#f05032", level: 85 },
    { name: "TensorFlow", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", color: "#ff6f00", level: 78 }
  ];

  const connectOptions = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      url: "https://www.linkedin.com/in/vaibhav-awasthi-5a3b28202/",
      color: "#0077b5",
      description: "Professional Network"
    },
    {
      name: "GitHub",
      icon: <Github size={20} />,
      url: "https://github.com/Vaibhav-333",
      color: "#333",
      description: "Code Repository"
    },
    {
      name: "X (Twitter)",
      icon: <X size={20} />,
      url: "https://x.com/httpsvaibhav",
      color: "#1da1f2",
      description: "Latest Updates"
    },
    {
      name: "Email",
      icon: <Mail size={20} />,
      url: "mailto:vaibhav@example.com",
      color: "#ea4335",
      description: "Direct Contact"
    }
  ];

  const handleZoomIn = () => {
    setResumeZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setResumeZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className={`home-wrapper ${theme}-theme`} ref={ref}>
      <canvas id="particles-canvas" className="particles-background"></canvas>

      <motion.div
        className="hero-section"
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section className="intro-text" variants={itemVariants}>
          <motion.div className="greeting-container">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="main-title"
            >
              <span className="gradient-text">Vaibhav Awasthi</span>
              <motion.span
                className="wave-emoji"
                animate={{
                  rotate: [0, 15, -15, 15, 0],
                  transition: {
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 6
                  }
                }}
              >
                👋
              </motion.span>
            </motion.h1>
            <motion.p
              className="professional-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Aspiring Data Scientist & Full Stack Developer
            </motion.p>
          </motion.div>

          <motion.div className="type-container" variants={itemVariants}>
            <TypeAnimation
              sequence={[
                "Building intelligent solutions with data 📊",
                2500,
                "CSDA Student at IIT Patna 🎓",
                2500,
                "Machine Learning & AI Enthusiast 🤖",
                2500,
                "Creating impactful web applications 💻",
                2500,
              ]}
              wrapper="span"
              speed={65}
              className="type-animation"
              repeat={Infinity}
            />
          </motion.div>

          <motion.div className="cta-container" variants={itemVariants}>
            <div className="resume-buttons">
              <motion.button
                onClick={() => setShowResumeModal(true)}
                className="resume-button preview-btn"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 25px rgba(75, 108, 183, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye size={18} />
                <span>Preview Resume</span>
              </motion.button>

              <motion.a
                href="/VaibhavAwasthii-Resume.pdf"
                download
                className="resume-button download-btn"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={18} />
                <span>Download Resume</span>
              </motion.a>
            </div>

            <div className="connect-dropdown-container">
              <motion.button
                className="connect-button"
                onClick={() => setShowConnectDropdown(!showConnectDropdown)}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Let's Connect</span>
                <ExternalLink size={18} />
              </motion.button>

              <AnimatePresence>
                {showConnectDropdown && (
                  <motion.div
                    className="connect-dropdown"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {connectOptions.map((option, index) => (
                      <motion.a
                        key={option.name}
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="connect-option"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{
                          x: 5,
                          backgroundColor: `${option.color}15`
                        }}
                      >
                        <div className="option-icon" style={{ color: option.color }}>
                          {option.icon}
                        </div>
                        <div className="option-content">
                          <span className="option-name">{option.name}</span>
                          <span className="option-desc">{option.description}</span>
                        </div>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.section>

        <motion.div
          className="profile-container"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="profile-image-wrapper">
            <motion.div
              className="profile-glow"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.img
              src={profileImg}
              alt="Vaibhav Awasthi"
              className="profile-image"
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.3 }
              }}
            />
            <div className="profile-border"></div>
            <div className="profile-status">
              <div className="status-dot"></div>
              <span>Available for opportunities</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Education Section */}
      <motion.section
        className="education-section glass-card"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2 className="section-title">
          🎓 Academic Excellence
        </motion.h2>

        <div className="education-timeline">
          {[
            {
              degree: "Bachelor of Science in Computer Science & Data Analytics",
              institution: "Indian Institute of Technology, Patna",
              year: "2023–2027",
              result: "CGPA: 8.26/10",
              color: "#4b6cb7",
              details: "Specializing in Data Science, Machine Learning, and Statistical Analysis"
            },
            {
              degree: "Higher Secondary Certificate (XII)",
              institution: "SGOI, Kanpur",
              year: "2022",
              result: "80%",
              color: "#e74c3c",
              details: "Physics, Chemistry, Mathematics, Computer Science"
            },
            {
              degree: "Secondary School Certificate (X)",
              institution: "SGOI, Kanpur",
              year: "2020",
              result: "87.8%",
              color: "#2ecc71",
              details: "All India Secondary School Examination"
            }
          ].map((edu, index) => (
            <motion.div
              key={index}
              className="education-card enhanced"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                y: -8,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
              }}
            >
              <div className="card-accent" style={{ backgroundColor: edu.color }}></div>
              <div className="card-content">
                <h3>{edu.degree}</h3>
                <p className="institution">{edu.institution}</p>
                <div className="edu-meta">
                  <span className="year">{edu.year}</span>
                  <span className="result">{edu.result}</span>
                </div>
                <p className="details">{edu.details}</p>
              </div>
              <div className="card-number">{index + 1}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Enhanced Skills Section */}
      <motion.section
        className="skills-section glass-card"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.h2 className="section-title">
          💼 Technical Expertise
        </motion.h2>

        <div className="skills-grid enhanced">
          {skillIcons.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card enhanced"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{
                scale: 1.08,
                y: -5
              }}
            >
              <div className="skill-icon-wrapper">
                <img src={skill.src} alt={skill.name} className="skill-icon" />
                <motion.div
                  className="skill-glow"
                  style={{ backgroundColor: skill.color }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                />
              </div>
              <span className="skill-name">{skill.name}</span>
              <div className="skill-level">
                <div className="skill-level-bar">
                  <motion.div
                    className="skill-level-fill"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.2, delay: index * 0.1 + 0.5 }}
                  />
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Enhanced Connect Section */}
      <motion.section
        className="connect-section glass-card enhanced"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.h2 className="section-title">
          🌐 Professional Network
        </motion.h2>

        <div className="social-container enhanced">
          <motion.a
            href="https://github.com/Vaibhav-333"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link github"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="social-icon" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28" style={{ display: 'block' }}>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div className="social-content">
              <span className="social-name">GitHub</span>
              <span className="social-desc">View my code repositories</span>
            </div>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/vaibhav-awasthi-5a3b28202/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link linkedin"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="social-icon" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0077b5' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28" style={{ display: 'block' }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div className="social-content">
              <span className="social-name">LinkedIn</span>
              <span className="social-desc">Professional connections</span>
            </div>
          </motion.a>

          <motion.a
            href="https://x.com/httpsvaibhav"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link twitter"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="social-icon" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1da1f2' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28" style={{ display: 'block' }}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div className="social-content">
              <span className="social-name">X (Twitter)</span>
              <span className="social-desc">Latest thoughts & updates</span>
            </div>
          </motion.a>
        </div>

        <motion.p
          className="connect-text enhanced"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          I'm always excited to discuss new opportunities, collaborate on innovative projects,
          or simply connect with fellow tech enthusiasts. Let's create something extraordinary together! 🚀
        </motion.p>
      </motion.section>

      {/* Resume Preview Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            className="resume-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResumeModal(false)}
          >
            <motion.div
              className="resume-modal"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="resume-modal-header">
                <h3>Resume Preview</h3>
                <div className="resume-controls">
                  <button onClick={handleZoomOut} className="zoom-btn">
                    <ZoomOut size={18} />
                  </button>
                  <span className="zoom-level">{Math.round(resumeZoom * 100)}%</span>
                  <button onClick={handleZoomIn} className="zoom-btn">
                    <ZoomIn size={18} />
                  </button>
                  <a
                    href="/VaibhavAwasthii-Resume.pdf"
                    download
                    className="download-btn-modal"
                  >
                    <Download size={18} />
                  </a>
                  <button
                    onClick={() => setShowResumeModal(false)}
                    className="close-btn"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="resume-content">
                <div
                  className="resume-viewer"
                  style={{ transform: `scale(${resumeZoom})` }}
                >
                  <iframe
                    src="/VaibhavAwasthii-Resume.pdf"
                    title="Resume Preview"
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Chatbot theme={theme} />
    </div>
  );
};

export default Home;