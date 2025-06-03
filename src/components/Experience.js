// src/components/Experience.js
import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./Experience.css";

const Experience = () => (
  <div className="timeline-section">
    <h2>📊 Experience Timeline</h2>
    <VerticalTimeline>
      <VerticalTimelineElement date="Apr 2025 - Present" iconStyle={{ background: "#4b6cb7", color: "#fff" }}>
        <h3>Data Science Intern – Heleum</h3>
        <p>Built and optimized ML models for fraud detection and analytics.</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement date="Nov 2023 – Present" iconStyle={{ background: "#4b6cb7", color: "#fff" }}>
        <h3>SME – Chegg</h3>
        <p>Delivered 1000+ academic solutions across CS and Data Science.</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement date="Mar 2022 - May 2023" iconStyle={{ background: "#4b6cb7", color: "#fff" }}>
        <h3>Content Writer – Coursera</h3>
        <p>Created educational content that increased course popularity by 10%.</p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  </div>
);

export default Experience;
