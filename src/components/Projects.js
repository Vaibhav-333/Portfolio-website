// src/components/Projects.js
import React from "react";
import "./Projects.css";

const Projects = () => (
  <div className="projects-section">
    <h2>🚀 Projects</h2>
    <div className="project-cards">
      <div className="project">
        <h3>Credit Card Fraud Detection</h3>
        <p>Used ML models like Logistic Regression, Random Forest for fraud detection on imbalanced data. EDA with Seaborn & Matplotlib.</p>
      </div>
      <div className="project">
        <h3>Telegram AI Chat Bot</h3>
        <p>Deployed a Telegram bot using OpenAI GPT for real-time smart replies via webhook hosting.</p>
      </div>
      <div className="project">
        <h3>Sign Language Detection</h3>
        <p>Built an ASL classifier using CNN + Mediapipe achieving 90%+ accuracy in real-time recognition.</p>
      </div>
    </div>
  </div>
);

export default Projects;
