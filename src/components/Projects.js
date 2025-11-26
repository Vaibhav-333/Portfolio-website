// src/components/Projects.js
import React, { useState, useEffect } from "react";
import "./Projects.css";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [animateCards, setAnimateCards] = useState(false);

  const projectsData = [
    // Machine Learning Projects
    {
      id: 1,
      title: "Credit Card Fraud Detection",
      description: "Built a binary classification model to detect fraudulent transactions using logistic regression and random forest. Handled imbalanced data using SMOTE and implemented feature scaling and model interpretability.",
      category: "Machine Learning",
      technologies: ["Python", "Scikit-learn", "SMOTE", "Pandas", "Matplotlib"],
      githubLink: "https://github.com/Vaibhav-333/Credit-Card-Fraud-Detection.git",
      featured: true
    },
    {
      id: 2,
      title: "Cement Strength Prediction",
      description: "Developed a regression model to predict compressive strength of concrete using linear regression and ensemble methods. Integrated the model into a full deployment pipeline using Flask and MongoDB.",
      category: "Machine Learning",
      technologies: ["Python", "Flask", "MongoDB", "Linear Regression", "Ensemble Methods"],
      githubLink: "https://github.com/Vaibhav-333/Cement-Strength-Prediction.git",
      featured: false
    },
    {
      id: 3,
      title: "Phishing Classifier",
      description: "Created a phishing website detector based on URL data using NLP and decision trees. Extracted relevant features and achieved high accuracy on test data.",
      category: "Machine Learning",
      technologies: ["Python", "NLP", "Decision Trees", "Feature Engineering"],
      githubLink: "https://github.com/Vaibhav-333/Phishing-Website-Classifier.git",
      featured: false
    },
    // Natural Language Processing Projects
    {
      id: 4,
      title: "Speech Emotion Recognition",
      description: "Processed audio data to classify emotions using MFCC features and LSTM/CNN models for accurate emotion detection from speech patterns.",
      category: "Natural Language Processing",
      technologies: ["Python", "LSTM", "CNN", "MFCC", "TensorFlow"],
      githubLink: "https://github.com/Vaibhav-333/Speech-Emotion-Recognition.git",
      featured: true
    },
    {
      id: 5,
      title: "Telegram AI Chat Bot",
      description: "Built an intelligent Telegram bot using Hugging Face Transformers to generate natural responses and handle user queries with advanced NLP capabilities.",
      category: "Natural Language Processing",
      technologies: ["Python", "Telegram API", "Hugging Face", "Transformers"],
      githubLink: "https://github.com/Vaibhav-333/Telegram-bot-Project.git",
      featured: false
    },
    {
      id: 6,
      title: "Movie Recommendation System",
      description: "Developed a content-based movie recommender using TF-IDF and cosine similarity on movie metadata for personalized recommendations.",
      category: "Natural Language Processing",
      technologies: ["Python", "TF-IDF", "Cosine Similarity", "Pandas", "Scikit-learn"],
      githubLink: "https://github.com/Vaibhav-333/Movie-Recommendation-System.git",
      featured: false
    },
    {
      id: 7,
      title: "Chat with Your Documents (RAG)",
      description: "Streamlit application that allows users to upload multiple documents and chat with them using Retrieval Augmented Generation approach with FAISS for efficient vector-based retrieval.",
      category: "Natural Language Processing",
      technologies: ["Streamlit", "FAISS", "RAG", "Hugging Face", "Vector Database"],
      githubLink: "https://github.com/Vaibhav-333/RAGstreamlitapp.git",
      featured: true
    },
    // Computer Vision Projects
    {
      id: 8,
      title: "Sign Language Detection",
      description: "Implemented a real-time hand gesture recognition system using OpenCV and CNNs to detect sign language alphabets with high accuracy.",
      category: "Computer Vision",
      technologies: ["OpenCV", "CNN", "Python", "Real-time Processing"],
      githubLink: "https://github.com/Vaibhav-333/Sign-Language-Detection.git",
      featured: true
    },
    {
      id: 9,
      title: "Car Number Plate Detection",
      description: "Applied YOLO object detection to identify and extract number plates from images and videos with high precision and speed.",
      category: "Computer Vision",
      technologies: ["YOLO", "OpenCV", "Python", "Object Detection"],
      githubLink: "https://github.com/Vaibhav-333/Car-Number-Plate-Detection.git",
      featured: false
    },
    {
      id: 10,
      title: "Image Classification",
      description: "Trained CNN models on CIFAR-10 and Fashion MNIST datasets with data augmentation and transfer learning techniques for improved accuracy.",
      category: "Computer Vision",
      technologies: ["CNN", "Transfer Learning", "Data Augmentation", "TensorFlow"],
      githubLink: "https://github.com/Vaibhav-333/Image-Classifier.git",
      featured: false
    },
    {
      id: 11,
      title: "Vision-Based Attendance System",
      description: "Created a facial recognition attendance system using OpenCV and face embeddings to automate attendance tracking with high accuracy.",
      category: "Computer Vision",
      technologies: ["OpenCV", "Face Recognition", "Python", "Face Embeddings"],
      githubLink: "https://github.com/Vaibhav-333/Vision-based-Attendance-System.git",
      featured: false
    },
    {
      id: 12,
      title: "OCR Image Text Extractor",
      description: "A Streamlit web app that extracts text from images using Tesseract OCR with support for English and Hindi languages.",
      category: "Computer Vision",
      technologies: ["Streamlit", "Tesseract OCR", "Python", "Image Processing"],
      githubLink: "https://github.com/Vaibhav-333/OCR-Extract-text-from-image-.git",
      featured: false
    }
  ];

  const categories = ['All', 'Machine Learning', 'Natural Language Processing', 'Computer Vision'];

  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = activeFilter === 'All' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setAnimateCards(true);
    setTimeout(() => setAnimateCards(false), 300);
  };

  const handleDemoClick = (githubLink) => {
    window.open(githubLink, '_blank', 'noopener,noreferrer');
  };

  const projectCount = filteredProjects.length;
  const featuredCount = filteredProjects.filter(p => p.featured).length;

  return (
    <div className="projects-section">
      <div className="projects-header">
        <h2>🚀 Featured Projects</h2>
        <p className="projects-subtitle">
          Explore my portfolio of {projectsData.length} projects spanning Machine Learning, NLP, and Computer Vision
        </p>
        
        <div className="projects-stats">
          <div className="stat-item">
            <span className="stat-number">{projectCount}</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{featuredCount}</span>
            <span className="stat-label">Featured</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{categories.length - 1}</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
      </div>

      <div className="projects-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search projects or technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => handleFilterChange(category)}
            >
              {category}
              {category !== 'All' && (
                <span className="filter-count">
                  {projectsData.filter(p => p.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={`project-cards ${animateCards ? 'animate' : ''}`}>
        {filteredProjects.length === 0 ? (
          <div className="no-projects">
            <p>No projects found matching your criteria</p>
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project ${project.featured ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {project.featured && <div className="featured-badge">⭐ Featured</div>}
              
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className="project-category">{project.category}</span>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <div className="project-actions">
                <button 
                  className="demo-btn"
                  onClick={() => handleDemoClick(project.githubLink)}
                >
                  <span className="btn-icon">🔗</span>
                  Show Demo
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredProjects.length > 0 && (
        <div className="projects-footer">
          <p>Want to see more? Check out my <a href="https://github.com/Vaibhav-333" target="_blank" rel="noopener noreferrer">GitHub profile</a> for additional projects!</p>
        </div>
      )}
    </div>
  );
};

export default Projects;