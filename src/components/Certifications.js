import React, { useState, useEffect } from "react";
import { Eye, Download, X, ZoomIn, ZoomOut, RotateCw, Award, Calendar, ExternalLink, CheckCircle, Star, ChevronLeft, ChevronRight } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "Certified Data Scientist",
    name: "Vaibhav Awasthi",
    issuer: "PW",
    date: "8th May 2025",
    file: "/certificates/data-science-masters.pdf",
    skills: ["Python", "Machine Learning", "Statistics", "Data Analysis"],
    credentialId: "5284f9b9-d2dc-46e5-8df7-7a731e0eb630",
    status: "verified",
    rating: 4.9,
    type: "pw",
    images: [
      "/certificates/DS1.png",
      "/certificates/DS2.jpg"
    ]
  },
  {
    id: 2,
    title: "AWS Cloud Computing",
    name: "Vaibhav Awasthi",
    issuer: "Amazon Web Services",
    date: "2023",
    file: "/certificates/aws-cloud.pdf",
    skills: ["AWS", "Cloud Architecture", "DevOps", "Security"],
    credentialId: "AWS-2023-456",
    status: "verified",
    rating: 4.8,
    type: "aws",
    images: [
      "/certificates/AWS1.png"
    ]
  },
  {
    id: 3,
    title: "Excel for Finance",
    name: "Vaibhav Awasthi",
    issuer: "Corporate Finance Institute",
    date: "2023",
    file: "/certificates/excel-finance.pdf",
    skills: ["Excel", "Financial Modeling", "Data Analysis", "VBA"],
    credentialId: "78813746",
    status: "verified",
    rating: 4.7,
    type: "Corporate Finance Institute",
    images: [
      "/certificates/Excel1.png",
      "/certificates/Excel2.png"
    ]
  },
];

// Function to get the appropriate icon based on certificate type
const getCertificateIcon = (type) => {
  const iconConfigs = {
    pw: {
      src: "https://img.icons8.com/?size=64&id=PKVbGZdcJ1Fp&format=png",
      alt: "Physics Wallah Logo",
      link: "https://pwskills.com/learn/certificate/5284f9b9-d2dc-46e5-8df7-7a731e0eb630/"
    },
    aws: {
      src: "https://img.icons8.com/?size=64&id=33039&format=png",
      alt: "Amazon Web Services Logo",
      link: "https://icons8.com/icon/33039/amazon-web-services"
    },
    coursera: {
      src: "https://img.icons8.com/?size=64&id=HnQYftvo88pe&format=png",
      alt: "Coursera Logo", 
      link: "https://www.credential.net/0ebf581c-b982-4c83-9098-204fff936909#acc.fwtjc05U"
    }
  };
  
  return iconConfigs[type] || iconConfigs.pw;
};

const CertificateModal = ({ certificate, isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleRotate = () => setRotation(prev => prev + 90);
  const resetView = () => {
    setZoom(1);
    setRotation(0);
  };

  const nextImage = () => {
    if (certificate?.images) {
      setCurrentImageIndex(prev => (prev + 1) % certificate.images.length);
    }
  };

  const prevImage = () => {
    if (certificate?.images) {
      setCurrentImageIndex(prev => 
        prev === 0 ? certificate.images.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0); // Reset to first image when modal opens
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !certificate) return null;

  const iconConfig = getCertificateIcon(certificate.type);
  const hasImages = certificate.images && certificate.images.length > 0;
  const hasMultipleImages = hasImages && certificate.images.length > 1;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title">
            <Award className="modal-icon" />
            <div>
              <h3>{certificate.title}</h3>
              <p>Issued by {certificate.issuer}</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-controls">
          <button onClick={handleZoomOut} className="control-btn">
            <ZoomOut size={18} />
          </button>
          <span className="zoom-level">{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} className="control-btn">
            <ZoomIn size={18} />
          </button>
          <button onClick={handleRotate} className="control-btn">
            <RotateCw size={18} />
          </button>
          <button onClick={resetView} className="control-btn reset-btn">
            Reset View
          </button>
          {hasMultipleImages && (
            <div className="image-counter">
              {currentImageIndex + 1} / {certificate.images.length}
            </div>
          )}
        </div>

        <div className="certificate-viewer">
          <div className="certificate-image-container">
            {hasMultipleImages && (
              <button 
                className="nav-btn nav-btn-left" 
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            
            <div 
              className="certificate-image"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease'
              }}
            >
              {hasImages ? (
                <div className="actual-certificate-container">
                  <img
                    src={certificate.images[currentImageIndex]}
                    alt={`${certificate.title} certificate ${currentImageIndex + 1}`}
                    className="actual-certificate-image"
                    onError={(e) => {
                      console.error('Image failed to load:', e.target.src);
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="certificate-verified-overlay">
                    <CheckCircle size={32} />
                    <span>VERIFIED</span>
                  </div>
                </div>
              ) : (
                <div className="certificate-placeholder">
                  <h2>Verify Here</h2>
                  
                  <a 
                    href={iconConfig.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="certificate-icon-link"
                  >
                    <img
                      src={iconConfig.src}
                      alt={iconConfig.alt}
                      width="74"
                      height="74"
                      className="certificate-icon"
                    />
                  </a>

                  <Award size={64} />
                  <h1>{certificate.name}</h1>
                  <h2>{certificate.title}</h2>
                  <p>Issued by {certificate.issuer}</p>
                  <p>Date: {certificate.date}</p>
                  <p>Credential ID: {certificate.credentialId}</p>
                  
                  <div className="certificate-seal">
                    <CheckCircle size={32} />
                    <span>VERIFIED</span>
                  </div>
                </div>
              )}
            </div>

            {hasMultipleImages && (
              <button 
                className="nav-btn nav-btn-right" 
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {hasMultipleImages && (
            <div className="image-dots">
              {certificate.images.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <a 
              href={iconConfig.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="verify-btn"
            >
              <ExternalLink size={18} />
              Verify Certificate
            </a>
          <a 
            href={certificate.file} 
            download 
            className="download-btn-modal"
          >
            <Download size={18} />
            Download Certificate
          </a>
        </div>
      </div>
    </div>
  );
};

const CertificationCard = ({ certificate, onShowLicense }) => {
  return (
    <div className="cert-card">
      <div className="cert-card-header">
        <div className="cert-badge">
          <Award className="cert-badge-icon" />
        </div>
        <div className="cert-status">
          <CheckCircle size={16} className="status-icon" />
          <span>Verified</span>
        </div>
      </div>

      <div className="cert-content">
        
        <h3 className="cert-title">{certificate.title}</h3>
        <p className="cert-issuer">{certificate.issuer}</p>
        
        <div className="cert-meta">
          <div className="cert-date">
            <Calendar size={14} />
            <span>{certificate.date}</span>
          </div>
          <div className="cert-rating">
            <Star size={14} className="star-icon" />
            <span>{certificate.rating}</span>
          </div>
        </div>

        <div className="cert-skills">
          {certificate.skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>

        <div className="cert-id">
          <span>ID: {certificate.credentialId}</span>
        </div>
      </div>

      <div className="cert-actions">
        <button 
          className="license-btn"
          onClick={() => onShowLicense(certificate)}
        >
          <Eye size={18} />
          Show License
        </button>
        <a 
          href={certificate.file} 
          download 
          className="download-btn"
        >
          <Download size={18} />
          Download
        </a>
      </div>
    </div>
  );
};

const Certifications = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowLicense = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalCertifications = certifications.length;
  const averageRating = (certifications.reduce((sum, cert) => sum + cert.rating, 0) / totalCertifications).toFixed(1);

  return (
    <div className="certifications-section">
      <div className="section-header">
        <div className="header-content">
          <h2>
            <Award className="section-icon" />
            Professional Certifications
          </h2>
          <p className="section-description">
            Showcasing my commitment to continuous learning and professional development
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{totalCertifications}</div>
            <div className="stat-label">Certifications</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{averageRating}</div>
            <div className="stat-label">Avg Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Verified</div>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search certifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="certifications-grid">
        {filteredCertifications.map((cert) => (
          <CertificationCard
            key={cert.id}
            certificate={cert}
            onShowLicense={handleShowLicense}
          />
        ))}
      </div>

      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <style jsx>{`
      /* New styles for image slider functionality */
        .certificate-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .actual-certificate-container {
          position: relative;
          max-width: 100%;
          max-height: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }

        .actual-certificate-image {
          width: 100%;
          height: auto;
          max-height: 500px;
          object-fit: contain;
          display: block;
          border-radius: 12px;
        }

        .certificate-verified-overlay {
          position: absolute;
          transparent: rgba(248, 248, 248, 0.5);
          top: 1px;
          right: 3px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background:  #e8f5e8;
          color: #4caf50;
          padding: 0.75rem 1.25rem;
          border-radius: 25px;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255,255,255,0.3);
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.9);
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .nav-btn:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .nav-btn-left {
          left: -25px;
        }

        .nav-btn-right {
          right: -25px;
        }

        .image-counter {
          margin-left: auto;
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .image-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0 2rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: #cbd5e0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #667eea;
          transform: scale(1.2);
        }

        .dot:hover {
          background: #a0aec0;
          transform: scale(1.1);
        }

        /* Responsive adjustments for mobile */
        @media (max-width: 768px) {
          .nav-btn {
            width: 40px;
            height: 40px;
          }

          .nav-btn-left {
            left: -20px;
          }

          .nav-btn-right {
            right: -20px;
          }

          .certificate-verified-overlay {
            top: 10px;
            right: 10px;
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }

          .actual-certificate-image {
            max-height: 300px;
          }
        }

        .certifications-section {
          padding: 6rem 2rem;
          min-height: 100vh;
          background: var(--bg-color);
          position: relative;
          overflow: hidden;
        }

        .certifications-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          pointer-events: none;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
          z-index: 1;
        }

        .header-content h2 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          font-size: 3rem;
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .section-icon {
          color: #ffd700;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }

        .section-description {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.9);
          max-width: 600px;
          margin: 0 auto 3rem;
          line-height: 1.6;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .stat-card {
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: transform 0.3s ease;
          box-shadow: 0 12px 24px rgba(0,0,0,0.1);
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-color);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--text-color);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 0.9rem;
        }

        .filters-section {
          margin-bottom: 3rem;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .search-box {
          position: relative;
          max-width: 400px;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 50px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .search-input:focus {
          background: white;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }

        .certifications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 5rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .cert-card {
          background: var(--card-bg);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cert-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
        }

        .cert-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        .cert-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .cert-badge {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .cert-badge-icon {
          width: 24px;
          height: 24px;
        }

        .cert-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #e8f5e8;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          color: #4caf50;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .status-icon {
          color: #4caf50;
        }

        .cert-content {
          margin-bottom: 2rem;
        }

        .cert-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-color);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .cert-issuer {
          color: #667eea;
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .cert-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .cert-date, .cert-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #718096;
          font-size: 1.2rem;
        }

        .star-icon {
          color: #ffd700;
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        .cert-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .skill-tag {
          background: #f7fafc;
          color: #4a5568;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid #e2e8f0;
        }

        .cert-id {
          color: #a0aec0;
          font-size: 0.8rem;
          font-family: monospace;
        }

        .cert-actions {
          display: flex;
          gap: 1rem;
        }

        .license-btn, .download-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .license-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .license-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .download-btn {
          background: #f7fafc;
          color: #4a5568;
          border: 2px solid #e2e8f0;
        }

        .download-btn:hover {
          background: #edf2f7;
          border-color: #cbd5e0;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-container {
          background: white;
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 25px 100px rgba(0,0,0,0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 1px solid #e2e8f0;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .modal-icon {
          width: 40px;
          height: 40px;
          color: #ffd700;
        }

        .modal-title h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .modal-title p {
          opacity: 0.9;
          font-size: 1rem;
        }

        .close-btn {
          background: rgba(255,255,255,0.2);
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.3);
          transform: scale(1.1);
        }

        .modal-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2rem;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .control-btn {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .control-btn:hover {
          background: #f1f5f9;
          border-color: #cbd5e0;
        }

        .reset-btn {
          margin-left: auto;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #667eea;
        }

        .zoom-level {
          font-weight: 600;
          color: #4a5568;
          min-width: 50px;
          text-align: center;
        }

        .certificate-viewer {
          flex: 1;
          overflow: auto;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
        }

        .certificate-image {
          max-width: 100%;
          max-height: 100%;
          transition: transform 0.3s ease;
        }

        .certificate-placeholder {
          background: white;
          border: 2px dashed #e2e8f0;
          border-radius: 12px;
          padding: 3rem;
          text-align: center;
          min-width: 500px;
          min-height: 350px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: #4a5568;
          position: relative;
        }

        .certificate-icon-link {
          transition: transform 0.3s ease;
          border-radius: 12px;
          padding: 0.5rem;
          display: inline-block;
        }

        .certificate-icon-link:hover {
          transform: scale(1.1);
          background: rgba(102, 126, 234, 0.1);
        }

        .certificate-icon {
          display: block;
          transition: all 0.3s ease;
        }

        .certificate-placeholder h1 {
          font-size: 2.2rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0;
        }

        .certificate-placeholder h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0;
        }

        .certificate-placeholder p {
          margin: 0.5rem 0;
          font-size: 1.1rem;
        }

        .certificate-seal {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #e8f5e8;
          color: #4caf50;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .modal-footer {
          padding: 2rem;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .verify-btn,
        .download-btn-modal {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
  cursor: pointer;
  border: none;
  font-size: 0.875rem;
}

.verify-btn {
  background: var(--bg-primary);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.verify-btn:hover {
  background: var(--primary-color);
  color: white;
}

.download-btn-modal {
  background: var(--success-color);
  color: white;
}

.download-btn-modal:hover {
  background:var(--primary-color);
  transform: translateY(-1px);
}

        /* Responsive Design */
        @media (max-width: 768px) {
          .certifications-section {
            padding: 3rem 1rem;
          }

          .header-content h2 {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }

          .stat-card {
            padding: 1rem;
          }

          .stat-number {
            font-size: 1.8rem;
          }

          .certifications-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .cert-card {
            padding: 1.5rem;
          }

          .cert-actions {
            flex-direction: column;
          }

          .modal-overlay {
            padding: 1rem;
          }

          .modal-header {
            padding: 1.5rem;
          }

          .modal-controls {
            flex-wrap: wrap;
            padding: 1rem;
          }

          .certificate-placeholder {
            min-width: auto;
            min-height: 250px;
            padding: 2rem;
          }

          .certificate-placeholder h1 {
            font-size: 1.8rem;
          }

          .certificate-placeholder h2 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Certifications;