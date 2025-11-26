// src/components/Experience.js
import React, { useState, useRef, useEffect } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./Experience.css";

const Experience = () => {
  const [showCredentials, setShowCredentials] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Zoom states
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Zoom configuration
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 5;
  const ZOOM_STEP = 0.5;

  // Credentials data with proper paths for your setup
  const credentials = {
    heleum: [
      "/Credentials/Heleum.png"
    ],
    chegg: [
      "/Credentials/Chegg1.png",
      "/Credentials/Chegg2.png"
    ],
    coursera: [
      "/Credentials/Coursera1.png",
      "/Credentials/Coursera2.jpeg"
    ]
  };

  const experiences = [
    {
      id: "heleum",
      date: "Apr 2025 - Present",
      title: "Data Science Intern – Heleum",
      description: "Built and optimized ML models for fraud detection and analytics.",
      skills: ["Machine Learning", "Python", "Data Analysis", "Fraud Detection"],
      achievements: ["Improved model accuracy by 15%", "Reduced false positives by 25%"],
      icon: "🔬"
    },
    {
      id: "chegg",
      date: "Nov 2023 – Present",
      title: "SME – Chegg",
      description: "Delivered 1000+ academic solutions across CS and Data Science.",
      skills: ["Teaching", "Computer Science", "Data Science", "Problem Solving"],
      achievements: ["1000+ solutions delivered", "4.8/5 average rating", "Expert status achieved"],
      icon: "📚"
    },
    {
      id: "coursera",
      date: "Mar 2022 - May 2023",
      title: "Content Analyst – Coursera",
      description: "Created educational content that increased course popularity by 10%.",
      skills: ["Content Creation", "Educational Design", "Analytics", "Quality Assurance"],
      achievements: ["10% increase in course popularity", "Created 50+ learning modules"],
      icon: "🎓"
    }
  ];

  // Reset zoom when image changes
  useEffect(() => {
    resetZoom();
  }, [currentImageIndex, currentExperience]);

  // Handle wheel zoom
  useEffect(() => {
    const handleWheel = (e) => {
      if (!showCredentials || !containerRef.current) return;
      
      if (containerRef.current.contains(e.target)) {
        e.preventDefault();
        
        const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
        const newZoom = Math.min(Math.max(zoomLevel + delta, MIN_ZOOM), MAX_ZOOM);
        
        if (newZoom !== zoomLevel) {
          setZoomLevel(newZoom);
          
          // Reset position if zooming out to 1x
          if (newZoom === MIN_ZOOM) {
            setImagePosition({ x: 0, y: 0 });
          }
        }
      }
    };

    if (showCredentials) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, [showCredentials, zoomLevel]);

  const resetZoom = () => {
    setZoomLevel(MIN_ZOOM);
    setImagePosition({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + ZOOM_STEP, MAX_ZOOM);
    setZoomLevel(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - ZOOM_STEP, MIN_ZOOM);
    setZoomLevel(newZoom);
    
    // Reset position if zooming out to 1x
    if (newZoom === MIN_ZOOM) {
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > MIN_ZOOM) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y
      });
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > MIN_ZOOM) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Optional: Add boundaries to prevent dragging too far
      const container = containerRef.current;
      const image = imageRef.current;
      
      if (container && image) {
        const containerRect = container.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        
        const maxX = Math.max(0, (imageRect.width * zoomLevel - containerRect.width) / 2);
        const maxY = Math.max(0, (imageRect.height * zoomLevel - containerRect.height) / 2);
        
        const boundedX = Math.min(Math.max(newX, -maxX), maxX);
        const boundedY = Math.min(Math.max(newY, -maxY), maxY);
        
        setImagePosition({ x: boundedX, y: boundedY });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1 && zoomLevel > MIN_ZOOM) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - imagePosition.x,
        y: touch.clientY - imagePosition.y
      });
      e.preventDefault();
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length === 1 && zoomLevel > MIN_ZOOM) {
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;
      setImagePosition({ x: newX, y: newY });
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleShowCredentials = (experienceId) => {
    setCurrentExperience(experienceId);
    setCurrentImageIndex(0);
    setShowCredentials(true);
    resetZoom();
  };

  const handleCloseModal = () => {
    setShowCredentials(false);
    setCurrentExperience(null);
    setCurrentImageIndex(0);
    resetZoom();
  };

  const handleNextImage = () => {
    if (currentExperience && credentials[currentExperience]) {
      setCurrentImageIndex((prev) => 
        prev < credentials[currentExperience].length - 1 ? prev + 1 : 0
      );
    }
  };

  const handlePrevImage = () => {
    if (currentExperience && credentials[currentExperience]) {
      setCurrentImageIndex((prev) => 
        prev > 0 ? prev - 1 : credentials[currentExperience].length - 1
      );
    }
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const getImageTransform = () => {
    return {
      transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
      cursor: zoomLevel > MIN_ZOOM ? (isDragging ? 'grabbing' : 'grab') : 'default'
    };
  };

  return (
    <div className="timeline-section">
      <div className="section-header">
        <h2>🚀 Professional Journey</h2>
        <p className="section-subtitle">Transforming ideas into impactful solutions</p>
      </div>

      <div className="experience-stats">
        <div className="stat-card">
          <div className="stat-number">3+</div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">1000+</div>
          <div className="stat-label">Solutions Delivered</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">3</div>
          <div className="stat-label">Companies</div>
        </div>
      </div>

      <VerticalTimeline>
        {experiences.map((exp, index) => (
          <VerticalTimelineElement
            key={exp.id}
            date={exp.date}
            iconStyle={{ 
              background: hoveredCard === exp.id ? "#6366f1" : "#4b6cb7", 
              color: "#fff",
              transform: hoveredCard === exp.id ? "scale(1.1)" : "scale(1)",
              transition: "all 0.3s ease"
            }}
            contentStyle={{
              transform: hoveredCard === exp.id ? "translateY(-5px)" : "translateY(0)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={() => setHoveredCard(exp.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="timeline-content">
              <div className="content-header">
                <h3>{exp.title}</h3>
                <span className="experience-icon">{exp.icon}</span>
              </div>
              
              <p className="experience-description">{exp.description}</p>
              
              <div className="skills-section">
                <h4>Key Skills:</h4>
                <div className="skills-tags">
                  {exp.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="achievements-section">
                <h4>Achievements:</h4>
                <ul className="achievements-list">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <button 
                className="credentials-btn"
                onClick={() => handleShowCredentials(exp.id)}
              >
                <span className="btn-icon">🏆</span>
                Show Credentials
              </button>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>

      {/* Credentials Modal */}
      {showCredentials && currentExperience && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {experiences.find(exp => exp.id === currentExperience)?.title} - Credentials
              </h3>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="image-viewer">
              <div 
                className="main-image-container" 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Zoom Level Indicator */}
                <div className="zoom-level">
                  {Math.round(zoomLevel * 100)}%
                </div>

                {/* Zoom Controls */}
                <div className="zoom-controls">
                  <button 
                    className="zoom-btn"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= MAX_ZOOM}
                    title="Zoom In"
                  >
                    +
                  </button>
                  <button 
                    className="zoom-btn"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= MIN_ZOOM}
                    title="Zoom Out"
                  >
                    −
                  </button>
                </div>

                {/* Reset Zoom Button */}
                <button 
                  className={`reset-zoom-btn ${zoomLevel > MIN_ZOOM ? 'visible' : ''}`}
                  onClick={resetZoom}
                  title="Reset Zoom"
                >
                  Reset
                </button>

                <img 
                  ref={imageRef}
                  src={credentials[currentExperience][currentImageIndex]} 
                  alt={`Credential ${currentImageIndex + 1}`}
                  className={`main-credential-image ${zoomLevel > MIN_ZOOM ? 'zoomed' : ''}`}
                  style={getImageTransform()}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  draggable={false}
                />
                
                {credentials[currentExperience].length > 1 && (
                  <>
                    <button className="nav-btn prev-btn" onClick={handlePrevImage}>
                      ‹
                    </button>
                    <button className="nav-btn next-btn" onClick={handleNextImage}>
                      ›
                    </button>
                  </>
                )}
              </div>

              {credentials[currentExperience].length > 1 && (
                <div className="thumbnail-container">
                  {credentials[currentExperience].map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              )}

              <div className="image-counter">
                {currentImageIndex + 1} / {credentials[currentExperience].length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;