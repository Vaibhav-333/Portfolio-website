// src/components/Certifications.js
import React from "react";
import "./Certifications.css";

const certifications = [
  {
    title: "Data Science Masters – PW Skills",
    file: "/certificates/data-science-masters.pdf",
  },
  {
    title: "AWS Cloud Computing – Amazon",
    file: "/certificates/aws-cloud.pdf",
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
      <table className="cert-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {certifications.map((cert, index) => (
            <tr key={index}>
              <td>{cert.title}</td>
              <td>
                <a href={cert.file} download className="download-btn">
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Certifications;
