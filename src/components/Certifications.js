// src/components/Certifications.js
import React from "react";
import "./Certifications.css";

const certifications = [
  {
    title: "Data Science Masters – PW Skills",
    file: "/certificates/data-science-masters.pdf",
  },
  {
    title: "Excel for Finance – Coursera",
    file: "/certificates/excel-finance.pdf",
  },
];

const Certifications = () => {
  return (
    <div className="certifications-section">
      <h2>📜 My Certifications</h2>
      <ul>
        {certifications.map((cert, i) => (
          <li key={i}>
            <span>{cert.title}</span>
            <a href={cert.file} download className="download-btn">Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Certifications;
