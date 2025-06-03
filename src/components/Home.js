// src/components/Home.js
import React from "react";
import "./Home.css";
import profileImg from "../assets/photo_2023-12-30_13-16-19.jpg";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Home = ({ theme }) => {
  return (
    <div className={`home-wrapper ${theme}-theme`}>
      <section className="intro-text">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Hi, I'm Vaibhav Awasthi 👋
        </motion.h1>
        <TypeAnimation
          sequence={[
            "Aspiring Data Scientist",
            2000,
            "CSDA @ IIT Patna",
            2000,
            "Machine Learning Enthusiast",
            2000,
          ]}
          wrapper="span"
          speed={50}
          className="type-animation"
          repeat={Infinity}
        />
        <a href="/VaibhavAwasthii-Resume.pdf" download className="resume-button">
          📄 Download My Resume
        </a>
      </section>

      <motion.div
        className="profile-image"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img src={profileImg} alt="Vaibhav" />
      </motion.div>

      <section className="about-section">
        <h2>🎓 Education</h2>
        <table className="education-table">
          <thead>
            <tr>
              <th>Degree</th>
              <th>Institution</th>
              <th>Year</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>B.S. CSDA</strong></td>
              <td>IIT Patna</td>
              <td>2023–2027</td>
              <td>CGPA: 8.26</td>
            </tr>
            <tr>
              <td><strong>HSC (XII)</strong></td>
              <td>SGOI</td>
              <td>2022</td>
              <td>80%</td>
            </tr>
            <tr>
              <td><strong>SSC (X)</strong></td>
              <td>SGOI</td>
              <td>2020</td>
              <td>87.8%</td>
            </tr>
          </tbody>
        </table>
      </section>


      <section className="skills-section">
  <h2>💼 Skills</h2>
  <div className="skills-grid">
    <img className="skill-icon" data-name="Python" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
    <img className="skill-icon" data-name="JavaScript" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
    <img className="skill-icon" data-name="React" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
    <img className="skill-icon" data-name="MySQL" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
    <img className="skill-icon" data-name="Git" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />
    <img className="skill-icon" data-name="TensorFlow" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" />
  </div>
</section>


      <section className="connect-section">
        <h2>🔗 Connect with Me</h2>
        <div className="social-links">
          <a href="https://github.com/Vaibhav-333" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/vaibhav-awasthi-5a3b28202/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" />
          </a>
        </div>
        <p>Feel free to reach out for collaborations or just to say hi!</p>
      </section>

      <section className="Testimonials-section">
        <h2>🌟 Testimonials</h2>
        <blockquote>
          "Vaibhav's dedication and expertise in data science are truly impressive. His contributions have significantly enhanced our projects." – Mentor at Heleum
        </blockquote>
        <blockquote>
          "A passionate learner and a great team player. Vaibhav's work ethic is commendable." – Professor at IIT Patna
        </blockquote>
      </section>
    </div>
  );
};

export default Home;