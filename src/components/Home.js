import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { X, Github, Linkedin, Download, Eye, ZoomIn, ZoomOut, ExternalLink, Mail } from "lucide-react";
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
        this.x += this.vx; this.y += this.vy;
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

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(op => {
          const dx = p.x - op.x, dy = p.y - op.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(op.x, op.y);
            ctx.strokeStyle = `rgba(100, 120, 180, ${0.05 * (1 - d / 80)})`; ctx.stroke();
          }
        });
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 15 } }
  };

  const skillIcons = [
    { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776ab", level: 90 },
    { name: "PyTorch", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", color: "#ee4c2c", level: 85 },
    { name: "OpenCV", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", color: "#5c3ee8", level: 80 },
    { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#00758f", level: 82 },
    { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#f05032", level: 85 },
    { name: "TensorFlow", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", color: "#ff6f00", level: 78 },
    { name: "Power BI", src: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg", color: "#f2c811", level: 78 }
  ];

  const connectOptions = [
    { name: "LinkedIn", icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/vaibhav-awasthi-5a3b28202/", color: "#0077b5", description: "Professional Network" },
    { name: "GitHub", icon: <Github size={20} />, url: "https://github.com/Vaibhav-333", color: "#333", description: "Code Repository" },
    { name: "X (Twitter)", icon: <X size={20} />, url: "https://x.com/httpsvaibhav", color: "#1da1f2", description: "Latest Updates" },
    { name: "Email", icon: <Mail size={20} />, url: "mailto:vaibhav@example.com", color: "#ea4335", description: "Direct Contact" }
  ];

  const handleZoomIn = () => setResumeZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setResumeZoom(prev => Math.max(prev - 0.2, 0.5));

  return (
    <div className={`home-wrapper ${theme}-theme`} ref={ref}>

      {/* Particles — still local to Home page only */}
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
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }} className="main-title"
            >
              <span className="gradient-text">Vaibhav Awasthi</span>
              <motion.span className="wave-emoji"
                animate={{ rotate: [0, 15, -15, 15, 0], transition: { duration: 2.5, repeat: Infinity, repeatDelay: 6 } }}
              >👋</motion.span>
            </motion.h1>
            <motion.p className="professional-subtitle"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Aspiring Data Scientist & ML Engineer, IIT Patna '27
            </motion.p>
          </motion.div>

          <motion.div className="type-container" variants={itemVariants}>
            <TypeAnimation
              sequence={[
                "Building intelligent solutions with data 📊", 2500,
                "Senior Year Student at IIT Patna 🎓", 2500,
                "Machine Learning & AI Enthusiast 🤖", 2500,
                "I am a Data Scientist 💻", 2500,
              ]}
              wrapper="span" speed={65} className="type-animation" repeat={Infinity}
            />
          </motion.div>

          <motion.div className="cta-container" variants={itemVariants}>
            <div className="resume-buttons">
              <motion.button onClick={() => setShowResumeModal(true)} className="resume-button preview-btn"
                whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(75,108,183,0.3)" }} whileTap={{ scale: 0.98 }}
              >
                <Eye size={18} /><span>Preview Resume</span>
              </motion.button>
              <motion.a href="/VaibhavAwasthii-Resume.pdf" download className="resume-button download-btn"
                whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(34,197,94,0.3)" }} whileTap={{ scale: 0.98 }}
              >
                <Download size={18} /><span>Download Resume</span>
              </motion.a>
            </div>

            <div className="connect-dropdown-container">
              <motion.button className="connect-button"
                onClick={() => setShowConnectDropdown(!showConnectDropdown)}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(99,102,241,0.3)" }} whileTap={{ scale: 0.98 }}
              >
                <span>Let's Connect</span><ExternalLink size={18} />
              </motion.button>
              <AnimatePresence>
                {showConnectDropdown && (
                  <motion.div className="connect-dropdown"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }}
                  >
                    {connectOptions.map((option, index) => (
                      <motion.a key={option.name} href={option.url} target="_blank" rel="noopener noreferrer"
                        className="connect-option"
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 5, backgroundColor: `${option.color}15` }}
                      >
                        <div className="option-icon" style={{ color: option.color }}>{option.icon}</div>
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
      </motion.div>

      {/* ── RESUME SECTION ────────────────────────────────────────────────── */}
      <motion.section className="resume-inline-section glass-card"
        initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <motion.h2 className="section-title">📄 Resume</motion.h2>

        <div className="resume-inline-body">

          {/* ── Header ── */}
          <div className="ri-header">
            <div className="ri-header-left">
              <h1 className="ri-name">Vaibhav Awasthi</h1>
              <p className="ri-degree">B.S. (Computer Science and Data Analysis)</p>
              <p className="ri-institute">Indian Institute of Technology Patna</p>
            </div>
            <div className="ri-header-right">
              <a href="https://vawasthi-data.onrender.com/" target="_blank" rel="noopener noreferrer" className="ri-contact-item">🌐 vawasthi-data.onrender.com</a>
              <span className="ri-contact-item">📞 +91-9151742739</span>
              <a href="mailto:awasthivaibhav333@gmail.com" className="ri-contact-item">✉️ awasthivaibhav333@gmail.com</a>
              <a href="https://www.linkedin.com/in/vaibhav-awasthi-5a3b28202/" target="_blank" rel="noopener noreferrer" className="ri-contact-item">🔗 linkedin.com/in/vaibhav-awasthi</a>
              <a href="https://github.com/Vaibhav-333" target="_blank" rel="noopener noreferrer" className="ri-contact-item">💻 github.com/Vaibhav-333</a>
            </div>
          </div>

          <div className="ri-divider" />

          {/* ── Summary ── */}
          <div className="ri-section">
            <h3 className="ri-section-title">❖ Summary</h3>
            <p className="ri-paragraph">
              Aspiring Data Scientist and B.S. Computer Science student at IIT Patna with hands-on experience in ML, deep learning, NLP.
              Proven track record in project execution and cross-functional collaboration through internships and freelance work.
            </p>
          </div>

          <div className="ri-divider" />

          {/* ── Education ── */}
          <div className="ri-section">
            <h3 className="ri-section-title">❖ Education</h3>
            <table className="ri-table">
              <thead>
                <tr>
                  <th>Degree / Certificate</th>
                  <th>Institute / Board</th>
                  <th>CGPA / Percentage</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>B.S. (CSDA)</td><td>IIT PATNA</td><td>8.43 (Current)</td><td>2023–2027</td></tr>
                <tr><td>HSC (XII)</td><td>Shivaji Group of Institutions (SGOI)</td><td>80%</td><td>2022</td></tr>
                <tr><td>SSC (X)</td><td>Shivaji Group of Institutions (SGOI)</td><td>87.8%</td><td>2020</td></tr>
              </tbody>
            </table>
          </div>

          <div className="ri-divider" />

          {/* ── Experience ── */}
          <div className="ri-section">
            <h3 className="ri-section-title">❖ Experience</h3>

            <div className="ri-exp-block">
              <p className="ri-exp-role"><span className="ri-exp-company">Heleum</span> — <em>Data Science Intern (Apr 2025 – Jun 2025)</em></p>
              <ul className="ri-list">
                <li>Built and optimized ML models for fraud detection and predictive analytics.</li>
                <li>Conducted data cleaning, EDA, feature engineering, and model evaluation on large datasets.</li>
              </ul>
            </div>

            <div className="ri-exp-block">
              <p className="ri-exp-role"><span className="ri-exp-company">Chegg (India)</span> — <em>Subject Matter Expert (Nov 2023 – Present)</em></p>
              <ul className="ri-list">
                <li>Delivered 1000+ high-quality academic solutions weekly across CS, Data Science, Data Analytics, DBMS, ML and DL domains.</li>
                <li>Spearheaded peer review sessions, improving solution accuracy and student engagement.</li>
              </ul>
            </div>

            <div className="ri-exp-block">
              <p className="ri-exp-role"><span className="ri-exp-company">Good Enough Energy</span> — <em>ML Intern (Feb 2025 – Apr 2025)</em></p>
              <ul className="ri-list">
                <li>Gained hands-on experience in end-to-end project execution, from data cleaning to deployment, while consistently meeting deadlines with quality results.</li>
              </ul>
            </div>
          </div>

          <div className="ri-divider" />

          {/* ── Projects ── */}
          <div className="ri-section">
            <h3 className="ri-section-title">❖ Projects</h3>

            <div className="ri-exp-block">
              <p className="ri-exp-role"><span className="ri-exp-company">Educational LLM Training using RLHF (IIT-GN)  </span> <em>— Tech Stack: Python, Pytorch, Hugging Face Transformers, Matplotlib</em></p>
              <ul className="ri-list">
                <li>Developed a mini RLHF pipeline to improve LLM- generated educational responses using Supervised Fine-Tuning (SFT). </li>
                <li>Implemented human-feedback simulation via reward model training and applied KL-regularized PPO to refine GPT-2 outputs. </li>
              </ul>
            </div>

            <div className="ri-exp-block">
              <p className="ri-exp-role"><span className="ri-exp-company">Telegram AI Chat Bot</span> <em>— Tech Stack: Python, Telegram Bot API, OpenAI GPT</em></p>
              <ul className="ri-list">
                <li>Developed an intelligent conversational chatbot with Telegram that answers user queries in real-time using AI language models.</li>
                <li>Designed webhook deployment and set up secure server hosting, enabling dynamic, 24/7 NLP-based interaction through Telegram.</li>
              </ul>
            </div>

            <div className="ri-exp-block">
              <p className="ri-exp-role"><span className="ri-exp-company">Sign Language Detection</span> <em>— Tech Stack: Python, OpenCV, Mediapipe, TensorFlow / Keras</em></p>
              <ul className="ri-list">
                <li>Developed real-time ASL detection system using CNN and hand tracking via Mediapipe.</li>
                <li>Achieved 90%+ classification accuracy, enhancing accessibility in education tool.</li>
              </ul>
            </div>
          </div>

          <div className="ri-divider" />

          {/* ── Key Courses ── */}
          <div className="ri-section">
            <h3 className="ri-section-title">❖ Key Courses Taken</h3>
            <p className="ri-paragraph">
              Python, JavaScript, HTML, OOPS, MATLAB, MySQL, Machine Learning, Deep Learning, OpenCV, Data Visualization, Data Analysis
            </p>
          </div>

          <div className="ri-divider" />

          {/* ── Technical Skills ── */}
          <div className="ri-section">
            <h3 className="ri-section-title">❖ Technical Skills &amp; Interest</h3>
            <div className="ri-skills-grid">
              <div className="ri-skill-row"><span className="ri-skill-label">AI/ML & Deep Learning:</span><span className="ri-skill-value">Python, PyTorch, TensorFlow, Keras, OpenCV, Scikit-learn</span></div>
              <div className="ri-skill-row"><span className="ri-skill-label">Generative AI:</span><span className="ri-skill-value">Pandas, Numpy, SQL, PowerBI, Tableau, FASTapi, Streamlit</span></div>
              <div className="ri-skill-row"><span className="ri-skill-label">IT Skills</span><span className="ri-skill-value">Git, VS Code, Jupyter Notebook, Google Colab</span></div>
              <div className="ri-skill-row"><span className="ri-skill-label">Generative AI:</span><span className="ri-skill-value">Langchain, Hugging Face Transformers,OpenAI</span></div>
              <div className="ri-skill-row"><span className="ri-skill-label">Cloud and DevOps:</span><span className="ri-skill-value">AWS, Azure, Docker, Google Cloud</span></div>
              <div className="ri-skill-row"><span className="ri-skill-label">Web Development:</span><span className="ri-skill-value">HTML, CSS, JavaScript, React</span></div>
            </div>
          </div>

          <div className="ri-divider" />

          {/* ── Achievements ── */}
          <div className="ri-section">
            <h3 className="ri-section-title">❖ Achievements and Responsibilities</h3>
            <ul className="ri-list">
              <li><strong>NTSE Scholar (2020)</strong> — Cleared the examination and secured a CRL under 500.</li>
              <li><strong>Team Head</strong> — Headed a team of 30 volunteers to organize the Inter College Sport Competition at IIT Patna.</li>
              <li><strong>Coordinator – SPANDAN</strong> (College fest at IIT P) — Led the planning, organization, and execution of the event, ensuring smooth operations and engaging activities for participants.</li>
              <li><strong>Inter College Debate Participant</strong> — Participated in inter college debates and extempore competitions and won prizes. Earned a competitive All India scholarship (ANTHE) during intermediate studies, achieving a top 5% score nationally.</li>
            </ul>
          </div>

          <div className="ri-divider" />

          {/* ── Certifications ── */}
          <div className="ri-section">
            <h3 className="ri-section-title">❖ Certifications</h3>
            <ul className="ri-list">
              <li><strong>Google CloudReady Program – Google</strong> <em>(Jul 2025)</em> — Developed GenAI applications using Google Cloud Tools, earning recognition for completing quests. Received official Google Cloud merchandise as an award.</li>
              <li><strong>Data Science Trainee – Guvi-IIT Patna</strong> <em>(Jul 2025 – Sept 2025)</em> — Successfully completed a structured 90 days, project based internship in Data Science and ML. Build real world analytical Workflows for optimized performance and efficient operation.</li>
              <li><strong>Data Science Masters 2.0 – Physics Wallah</strong> <em>(Aug 2023 – May 2025)</em> — Completed a full-cycle program in Python, ML, SQL, CV, DL, and real-world deployments.</li>
            </ul>
          </div>

        </div>{/* end ri-body */}
      </motion.section>

      {/* Education */}
      <motion.section className="education-section glass-card"
        initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2 className="section-title">🎓 Academic Excellence</motion.h2>
        <div className="education-timeline">
          {[
            { degree: "Bachelor of Science in Computer Science & Data Analytics", institution: "Indian Institute of Technology, Patna", year: "2023–2027", result: "CGPA: 8.26/10", color: "#4b6cb7", details: "Specializing in Data Science, Machine Learning, and Statistical Analysis" },
            { degree: "Higher Secondary Certificate (XII)", institution: "SGOI, Kanpur", year: "2022", result: "80%", color: "#e74c3c", details: "Physics, Chemistry, Mathematics, Computer Science" },
            { degree: "Secondary School Certificate (X)", institution: "SGOI, Kanpur", year: "2020", result: "87.8%", color: "#2ecc71", details: "All India Secondary School Examination" }
          ].map((edu, index) => (
            <motion.div key={index} className="education-card enhanced"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
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

      {/* Skills */}
      <motion.section className="skills-section glass-card"
        initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.h2 className="section-title">💼 Technical Expertise</motion.h2>
        <div className="skills-grid enhanced">
          {skillIcons.map((skill, index) => (
            <motion.div key={skill.name} className="skill-card enhanced"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -5 }}
            >
              <div className="skill-icon-wrapper">
                <img src={skill.src} alt={skill.name} className="skill-icon" />
                <motion.div className="skill-glow" style={{ backgroundColor: skill.color }} initial={{ opacity: 0 }} whileHover={{ opacity: 0.2 }} />
              </div>
              <span className="skill-name">{skill.name}</span>
              <div className="skill-level">
                <div className="skill-level-bar">
                  <motion.div className="skill-level-fill" style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }} animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.2, delay: index * 0.1 + 0.5 }}
                  />
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Connect */}
      <motion.section className="connect-section glass-card enhanced"
        initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.h2 className="section-title">🤝 Let's Connect!</motion.h2>
        <motion.p className="connect-text enhanced"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          I'm always excited to discuss new opportunities, collaborate on innovative projects,
          or simply connect with fellow tech enthusiasts. Let's create something extraordinary together! 🚀
        </motion.p>
      </motion.section>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div className="resume-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowResumeModal(false)}
          >
            <motion.div className="resume-modal"
              initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="resume-modal-header">
                <h3>Resume Preview</h3>
                <div className="resume-controls">
                  <button onClick={handleZoomOut} className="zoom-btn"><ZoomOut size={18} /></button>
                  <span className="zoom-level">{Math.round(resumeZoom * 100)}%</span>
                  <button onClick={handleZoomIn} className="zoom-btn"><ZoomIn size={18} /></button>
                  <a href="/VaibhavAwasthii-Resume.pdf" download className="download-btn-modal"><Download size={18} /></a>
                  <button onClick={() => setShowResumeModal(false)} className="close-btn"><X size={18} /></button>
                </div>
              </div>
              <div className="resume-content">
                <div className="resume-viewer" style={{ transform: `scale(${resumeZoom})` }}>
                  <iframe src="/VaibhavAwasthii-Resume.pdf" title="Resume Preview" width="100%" height="100%" />
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