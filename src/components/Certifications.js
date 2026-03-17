import React, { useState, useEffect } from "react";
import {
  Eye, Download, X, ZoomIn, ZoomOut, RotateCw,
  Award, Calendar, ExternalLink, CheckCircle, Star,
  ChevronLeft, ChevronRight, Trophy, Users, Mic, Link
} from "lucide-react";

// ─── Certificate Data ────────────────────────────────────────────────────────
const certifications = [
  {
    id: 1,
    title: "Certified Data Scientist",
    name: "Vaibhav Awasthi",
    issuer: "PW Skills",
    date: "8th May 2025",
    file: "/certificates/data-science-masters.pdf",
    skills: ["Python", "Machine Learning", "Statistics", "Data Analysis"],
    credentialId: "5284f9b9-d2dc-46e5-8df7-7a731e0eb630",
    status: "verified",
    rating: 4.9,
    type: "pw",
    images: ["/certificates/DS1.png", "/certificates/DS2.jpg"],
    color: "#667eea"
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
    images: ["/certificates/AWS1.png"],
    color: "#FF9900"
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
    type: "cfi",
    images: ["/certificates/Excel1.png", "/certificates/Excel2.png"],
    color: "#217346"
  },
  {
    id: 4,
    title: "Google CloudReady – GenAI with Gemini",
    name: "Vaibhav Awasthi",
    issuer: "Google Cloud",
    date: "15th July 2025",
    file: "/certificates/google-cloudready.pdf",
    skills: ["GenAI", "Google Cloud", "Gemini API", "Cloud Computing"],
    credentialId: "GCR-VAIBHAV-2025",
    status: "verified",
    rating: 4.9,
    type: "google",
    images: ["/certificates/google-cloudready-1.png", "/certificates/google-cloudready-2.png"],
    color: "#4285F4"
  },
  {
    id: 5,
    title: "Gemini API in Vertex AI – Cloud Run",
    name: "Vaibhav Awasthi",
    issuer: "Google Cloud Platform",
    date: "July 2025",
    file: "/certificates/vertex-ai-gemini.pdf",
    skills: ["Vertex AI", "Gemini 2.5 Flash", "Model Deployment", "Cloud Run"],
    credentialId: "vertex-llm-app-2025",
    status: "verified",
    rating: 4.8,
    type: "google",
    images: ["/certificates/vertex-ai-1.png", "/certificates/vertex-ai-2.png"],
    color: "#34A853"
  },
  {
    id: 6,
    title: "Data Science Bootcamp",
    name: "Vaibhav Awasthi",
    issuer: "GUVI × HCL × IIT Patna",
    date: "30th September 2025",
    file: "/certificates/hcl-guvi-internship.pdf",
    skills: ["Python", "ML", "Data Science", "Data Visualization"],
    credentialId: "4E695606KL0mOe197S",
    status: "verified",
    rating: 5,
    type: "guvi",
    images: ["/certificates/guvi-hcl-1.png"],
    color: "#e91e8c"
  }
];

// ─── Seminars & Competitions Data ────────────────────────────────────────────
const seminars = [
  {
    id: 1,
    title: "National Conference on Data Science",
    description: "Presented research on ML-based anomaly detection at a national-level conference.",
    image: "/seminars/seminar1.jpeg",
    type: "Conference",
    date: "2024",
  },
  {
    id: 2,
    title: "Inter-College Hackathon",
    description: "Competed in 24-hour hackathon, building an AI-powered solution for real-world problems.",
    image: "/seminars/seminar2.jpeg",
    type: "Competition",
    date: "2024",
  },
  {
    id: 3,
    title: "Data Science Workshop – IIT Patna",
    description: "Attended an intensive workshop on deep learning and neural architectures.",
    image: "/seminars/seminar3.jpeg",
    type: "Workshop",
    date: "2023",
  },
  {
    id: 4,
    title: "AI Summit 2026",
    description: "Participated in panel discussions and technical sessions on applied machine learning.",
    image: "/seminars/seminar4.jpeg",
    type: "Seminar",
    date: "2024",
  },
  {
    id: 5,
    title: "Cloud & AI Bootcamp",
    description: "Hands-on training in cloud-native AI deployment using GCP and AWS services.",
    image: "/seminars/seminar5.jpeg",
    type: "Workshop",
    date: "2025",
  },
];

// ─── Icon config ──────────────────────────────────────────────────────────────
const getCertificateIcon = (type) => {
  const configs = {
    pw: { src: "https://img.icons8.com/?size=64&id=PKVbGZdcJ1Fp&format=png", alt: "PW", link: "https://pwskills.com/learn/certificate/5284f9b9-d2dc-46e5-8df7-7a731e0eb630/" },
    aws: { src: "https://img.icons8.com/?size=64&id=33039&format=png", alt: "AWS", link: "https://aws.amazon.com/" },
    google: { src: "https://img.icons8.com/color/96/google-cloud.png", alt: "Google", link: "https://www.credly.com/badges/2e9c19f8-8e0d-496d-927a-70657e2eb689/linked_in_profile" },
    guvi: { src: "https://img.icons8.com/?size=80&id=112159&format=png", alt: "GUVI", link: "https://www.guvi.in/verify-certificate?id=4E695606KL0mOe197S" },
    cfi: { src: "https://img.icons8.com/?size=64&id=13441&format=png", alt: "CFI", link: "https://credentials.corporatefinanceinstitute.com/0ebf581c-b982-4c83-9098-204fff936909#acc.IDlAT38p" }
  };
  return configs[type] || configs.pw;
};

// ─── Certificate Modal ────────────────────────────────────────────────────────
const CertificateModal = ({ certificate, isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    if (isOpen) { setIdx(0); setZoom(1); setRotation(0); }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen || !certificate) return null;

  const iconConfig = getCertificateIcon(certificate.type);
  const hasImages = certificate.images?.length > 0;
  const hasMultiple = certificate.images?.length > 1;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <Award className="modal-icon" />
            <div>
              <h3>{certificate.title}</h3>
              <p>Issued by {certificate.issuer}</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        {/* Controls */}
        <div className="modal-controls">
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="control-btn"><ZoomOut size={18} /></button>
          <span className="zoom-level">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} className="control-btn"><ZoomIn size={18} /></button>
          <button onClick={() => setRotation(r => r + 90)} className="control-btn"><RotateCw size={18} /></button>
          <button onClick={() => { setZoom(1); setRotation(0); }} className="control-btn reset-btn">Reset</button>
          {hasMultiple && <div className="image-counter">{idx + 1} / {certificate.images.length}</div>}
        </div>

        {/* Viewer */}
        <div className="certificate-viewer">
          <div className="certificate-image-container">
            {hasMultiple && (
              <button className="nav-btn nav-btn-left" onClick={() => setIdx(i => i === 0 ? certificate.images.length - 1 : i - 1)}>
                <ChevronLeft size={24} />
              </button>
            )}
            <div className="certificate-image" style={{ transform: `scale(${zoom}) rotate(${rotation}deg)`, transition: "transform 0.3s ease" }}>
              {hasImages ? (
                <div className="actual-certificate-container">
                  <img src={certificate.images[idx]} alt={`${certificate.title} ${idx + 1}`} className="actual-certificate-image" onError={e => { e.target.style.display = "none"; }} />
                  <div className="certificate-verified-overlay"><CheckCircle size={20} /><span>VERIFIED</span></div>
                </div>
              ) : (
                <div className="certificate-placeholder">
                  <Award size={64} />
                  <h1>{certificate.name}</h1>
                  <h2>{certificate.title}</h2>
                  <p>Issued by {certificate.issuer} · {certificate.date}</p>
                  <p>ID: {certificate.credentialId}</p>
                  <div className="certificate-seal"><CheckCircle size={20} /><span>VERIFIED</span></div>
                </div>
              )}
            </div>
            {hasMultiple && (
              <button className="nav-btn nav-btn-right" onClick={() => setIdx(i => (i + 1) % certificate.images.length)}>
                <ChevronRight size={24} />
              </button>
            )}
          </div>
          {hasMultiple && (
            <div className="image-dots">
              {certificate.images.map((_, i) => (
                <button key={i} className={`dot ${i === idx ? "active" : ""}`} onClick={() => setIdx(i)} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <a href={iconConfig.link} target="_blank" rel="noopener noreferrer" className="verify-btn">
            <ExternalLink size={16} /> Verify Certificate
          </a>
          <a href={certificate.file} download className="download-btn-modal">
            <Download size={16} /> Download
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Static-image-style Certificate Card (like Shruti Priya's layout) ────────
const CertImageCard = ({ certificate, onView }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const previewImg = certificate.images?.[0];
  const iconConfig = getCertificateIcon(certificate.type);

  return (
    <div className="cert-img-card">
      {/* Image area */}
      <div className="cert-img-wrap">
        {previewImg && !imgFailed ? (
          <img
            src={previewImg}
            alt={certificate.title}
            className="cert-static-img"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className="cert-static-placeholder"
            style={{ background: `linear-gradient(135deg, ${certificate.color}18, ${certificate.color}35)` }}
          >
            <Award size={48} style={{ color: certificate.color }} />
            <span className="cert-static-placeholder-text">{certificate.issuer}</span>
          </div>
        )}

        {/* Hover action buttons — like Shruti Priya's + and link icons */}
        <div className="cert-img-hover-actions">
          <button
            className="cert-action-btn"
            title="View certificate"
            onClick={() => onView(certificate)}
          >
            <Eye size={20} />
          </button>
          <a
            className="cert-action-btn"
            href={iconConfig.link}
            target="_blank"
            rel="noopener noreferrer"
            title="Verify / Issuer"
          >
            <Link size={20} />
          </a>
        </div>

        {/* Multi-page badge */}
        {certificate.images?.length > 1 && (
          <div className="cert-page-badge">{certificate.images.length} pages</div>
        )}
      </div>

      {/* Caption below image */}
      <div className="cert-img-caption">
        <p className="cert-img-issuer" style={{ color: certificate.color }}>{certificate.issuer}</p>
        <h4 className="cert-img-title">{certificate.title}</h4>
        <p className="cert-img-date">{certificate.date}</p>
      </div>
    </div>
  );
};

// ─── Gallery Thumbnail Card (kept for Details view) ──────────────────────────
const CertGalleryCard = ({ certificate, onView }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const previewImg = certificate.images?.[0];

  return (
    <div className="gallery-card" onClick={() => onView(certificate)}>
      <div className="gallery-img-wrap" style={{ borderTop: `4px solid ${certificate.color}` }}>
        {previewImg && !imgFailed ? (
          <img
            src={previewImg}
            alt={certificate.title}
            className="gallery-cert-img"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="gallery-cert-placeholder" style={{ background: `linear-gradient(135deg, ${certificate.color}22, ${certificate.color}44)` }}>
            <Award size={40} style={{ color: certificate.color }} />
            <span className="gallery-placeholder-text">{certificate.issuer}</span>
          </div>
        )}
        <div className="gallery-overlay">
          <div className="gallery-view-btn"><Eye size={20} /><span>View Certificate</span></div>
        </div>
        {certificate.images?.length > 1 && (
          <div className="gallery-page-count">{certificate.images.length} pages</div>
        )}
      </div>
      <div className="gallery-card-info">
        <p className="gallery-card-issuer" style={{ color: certificate.color }}>{certificate.issuer}</p>
        <h4 className="gallery-card-title">{certificate.title}</h4>
        <div className="gallery-card-meta">
          <span className="gallery-card-date"><Calendar size={12} /> {certificate.date}</span>
          <span className="gallery-card-rating"><Star size={12} style={{ fill: "#ffd700", color: "#ffd700" }} /> {certificate.rating}</span>
        </div>
      </div>
    </div>
  );
};

// ─── Seminar Card — image + caption, placeholder if no image ─────────────────
const SeminarCard = ({ item }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="seminar-static-card">
      <div className="seminar-static-img-wrap">
        {!imgFailed ? (
          <img
            src={item.image}
            alt={item.title}
            className="seminar-static-img"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="seminar-static-placeholder">
            <div className="seminar-placeholder-icon">📷</div>
            <p className="seminar-placeholder-text">Photo coming soon</p>
          </div>
        )}
      </div>
      <div className="seminar-static-caption">
        <h4 className="seminar-static-title">{item.title}</h4>
        <p className="seminar-static-desc">{item.description}</p>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Certifications = () => {
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("gallery"); // "gallery" | "cards"

  const filtered = certifications.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCerts = certifications.length;
  const avgRating = (certifications.reduce((s, c) => s + c.rating, 0) / totalCerts).toFixed(1);

  return (
    <div className="certifications-section">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="section-header">
        <div className="header-content">
          <h2><Award className="section-icon" /> Professional Certifications</h2>
          <p className="section-description">Showcasing my commitment to continuous learning and professional development</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-number">{totalCerts}</div><div className="stat-label">Certifications</div></div>
          <div className="stat-card"><div className="stat-number">{avgRating}</div><div className="stat-label">Avg Rating</div></div>
          <div className="stat-card"><div className="stat-number">100%</div><div className="stat-label">Verified</div></div>
        </div>
      </div>

      {/* ── Search + Tab Toggle ─────────────────────────────────────────────── */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search certifications..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="view-toggle">
          <button className={`toggle-btn ${activeTab === "gallery" ? "active" : ""}`} onClick={() => setActiveTab("gallery")}>
            🖼️ Gallery
          </button>
          <button className={`toggle-btn ${activeTab === "cards" ? "active" : ""}`} onClick={() => setActiveTab("cards")}>
            📋 Details
          </button>
        </div>
      </div>

      {/* ── Static Image Grid View (Gallery) ───────────────────────────────── */}
      {activeTab === "gallery" && (
        <div className="cert-static-grid">
          {filtered.map(cert => (
            <CertImageCard
              key={cert.id}
              certificate={cert}
              onView={c => { setSelected(c); setModalOpen(true); }}
            />
          ))}
        </div>
      )}

      {/* ── Cards/Details View ──────────────────────────────────────────────── */}
      {activeTab === "cards" && (
        <div className="certifications-grid">
          {filtered.map(cert => (
            <div key={cert.id} className="cert-card">
              <div className="cert-card-top-bar" style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}99)` }} />
              <div className="cert-card-header">
                <div className="cert-badge" style={{ background: `linear-gradient(135deg, ${cert.color}, ${cert.color}99)` }}>
                  <Award size={22} color="white" />
                </div>
                <div className="cert-status"><CheckCircle size={14} className="status-icon" /><span>Verified</span></div>
              </div>
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer" style={{ color: cert.color }}>{cert.issuer}</p>
                <div className="cert-meta">
                  <div className="cert-date"><Calendar size={13} /><span>{cert.date}</span></div>
                  <div className="cert-rating"><Star size={13} className="star-icon" /><span>{cert.rating}</span></div>
                </div>
                <div className="cert-skills">
                  {cert.skills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
                </div>
                <div className="cert-id">ID: {cert.credentialId}</div>
              </div>
              <div className="cert-actions">
                <button className="license-btn" style={{ background: `linear-gradient(135deg, ${cert.color}, ${cert.color}bb)` }} onClick={() => { setSelected(cert); setModalOpen(true); }}>
                  <Eye size={16} /> Show License
                </button>
                <a href={cert.file} download className="download-btn"><Download size={16} /> Download</a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal ───────────────────────────────────────────────────────────── */}
      <CertificateModal certificate={selected} isOpen={modalOpen} onClose={() => { setModalOpen(false); setSelected(null); }} />

      {/* ═══════════════════════════════════════════════════════════════════════
          SEMINARS & COMPETITIONS SECTION
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="seminars-section">
        <div className="seminars-header">
          <h2 className="seminars-title"><Trophy className="seminars-icon" /> Seminars, Conferences &amp; Competitions</h2>
          <div className="seminars-title-bar" />
        </div>

        {/* 2-column static-image grid like reference */}
        <div className="seminars-static-grid">
          {seminars.map(item => (
            <SeminarCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* ── All Styles ─────────────────────────────────────────────────────── */}
      <style jsx>{`

        /* ── Page shell — matches Experience.css static bg pattern ──────── */
        .certifications-section {
          padding: 4rem 2rem 0;
          min-height: 100vh;
          background: linear-gradient(135deg, var(--bg-color) 0%, rgba(75, 108, 183, 0.05) 100%);
          position: relative;
          overflow: hidden;
        }

        /* Identical radial-gradient blobs used in Experience ::before */
        .certifications-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(75, 108, 183, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .certifications-section > * {
          position: relative;
          z-index: 1;
        }

        /* ── Section header ───────────────────────────────────────────────── */
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 1;
        }
        .header-content h2 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 2.6rem;
          font-weight: 800;
          color: var(--text-color);
          margin-bottom: 0.75rem;
        }
        .section-icon { color: #ffd700; }
        .section-description {
          font-size: 1.1rem;
          color: var(--text-color);
          opacity: 0.75;
          max-width: 550px;
          margin: 0 auto 2.5rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 500px;
          margin: 0 auto;
        }
        .stat-card {
          background: var(--card-bg);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 1.5rem;
          text-align: center;
          transition: transform 0.3s;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
        .stat-card:hover { transform: translateY(-4px); }
        .stat-number { font-size: 2rem; font-weight: 800; color: var(--text-color); }
        .stat-label  { font-size: 0.8rem; font-weight: 600; color: var(--text-color); opacity: 0.6; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 0.25rem; }

        /* ── Filters bar ──────────────────────────────────────────────────── */
        .filters-section {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .search-box { position: relative; max-width: 380px; width: 100%; }
        .search-input {
          width: 100%;
          padding: 0.85rem 1.5rem;
          border: 1.5px solid rgba(102,126,234,0.3);
          border-radius: 50px;
          background: var(--card-bg);
          color: var(--text-color);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .search-input:focus { border-color: #667eea; box-shadow: 0 0 0 3px rgba(102,126,234,0.15); }
        .view-toggle { display: flex; gap: 0.5rem; }
        .toggle-btn {
          padding: 0.6rem 1.2rem;
          border: 1.5px solid rgba(102,126,234,0.3);
          border-radius: 50px;
          background: var(--card-bg);
          color: var(--text-color);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .toggle-btn.active, .toggle-btn:hover {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-color: transparent;
        }

        /* ══════════════════════════════════════════════════════════════════
           STATIC IMAGE CERTIFICATE GRID  (like Shruti Priya's layout)
        ════════════════════════════════════════════════════════════════════ */
        .cert-static-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem 4rem;
          max-width: 1100px;
          margin: 0 auto 4rem;
          position: relative;
          z-index: 1;
        }

        /* Individual image card */
        .cert-img-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Image wrapper — fixed aspect ratio, no card chrome */
        .cert-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 6px;
          background: #e8ecf0;
          cursor: pointer;
        }

        .cert-static-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }
        .cert-img-wrap:hover .cert-static-img {
          transform: scale(1.04);
        }

        /* Placeholder when image fails */
        .cert-static-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        .cert-static-placeholder-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: #667eea;
          opacity: 0.75;
        }

        /* Hover action buttons (eye + link) — appear on hover */
        .cert-img-hover-actions {
          position: absolute;
          bottom: 14px;
          right: 14px;
          display: flex;
          gap: 0.6rem;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .cert-img-wrap:hover .cert-img-hover-actions {
          opacity: 1;
          transform: translateY(0);
        }
        .cert-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          border: none;
          color: #4a5568;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,0,0,0.18);
          transition: background 0.2s, color 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .cert-action-btn:hover {
          background: #667eea;
          color: white;
          transform: scale(1.1);
        }

        /* Multi-page badge */
        .cert-page-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(0,0,0,0.55);
          color: white;
          font-size: 0.72rem;
          padding: 0.2rem 0.65rem;
          border-radius: 20px;
          font-weight: 600;
        }

        /* Caption below image */
        .cert-img-caption {
          text-align: center;
        }
        .cert-img-issuer {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin: 0 0 0.25rem;
        }
        .cert-img-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-color);
          margin: 0 0 0.2rem;
          line-height: 1.35;
        }
        .cert-img-date {
          font-size: 0.82rem;
          color: var(--text-color);
          opacity: 0.5;
          margin: 0;
        }

        /* ── DETAILS/CARDS GRID ───────────────────────────────────────────── */
        .certifications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 2rem;
          max-width: 1300px;
          margin: 0 auto 3rem;
          position: relative;
          z-index: 1;
        }
        .cert-card {
          background: var(--card-bg);
          border-radius: 18px;
          padding: 0;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
          overflow: hidden;
          position: relative;
        }
        .cert-card:hover { transform: translateY(-8px); box-shadow: 0 18px 50px rgba(0,0,0,0.13); }
        .cert-card-top-bar   { height: 4px; width: 100%; }
        .cert-card-header    { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem 0; }
        .cert-badge          { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .cert-status         { display: flex; align-items: center; gap: 0.4rem; background: #e8f5e8; padding: 0.35rem 0.85rem; border-radius: 20px; color: #4caf50; font-size: 0.82rem; font-weight: 600; }
        .status-icon         { color: #4caf50; }
        .cert-content        { padding: 1rem 1.5rem 0.5rem; }
        .cert-title          { font-size: 1.15rem; font-weight: 700; color: var(--text-color); margin-bottom: 0.3rem; line-height: 1.3; }
        .cert-issuer         { font-weight: 600; font-size: 1rem; margin-bottom: 0.75rem; }
        .cert-meta           { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
        .cert-date, .cert-rating { display: flex; align-items: center; gap: 0.35rem; color: #718096; font-size: 0.9rem; }
        .star-icon           { color: #ffd700; fill: #ffd700; }
        .cert-skills         { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; }
        .skill-tag           { background: rgba(102,126,234,0.1); color: #667eea; padding: 0.2rem 0.65rem; border-radius: 10px; font-size: 0.78rem; font-weight: 500; border: 1px solid rgba(102,126,234,0.2); }
        .cert-id             { color: #a0aec0; font-size: 0.75rem; font-family: monospace; margin-bottom: 0.5rem; }
        .cert-actions        { display: flex; gap: 0.75rem; padding: 0.75rem 1.5rem 1.5rem; }
        .license-btn, .download-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.4rem;
          padding: 0.7rem 1rem; border-radius: 10px; font-weight: 600; font-size: 0.85rem;
          text-decoration: none; transition: all 0.3s; border: none; cursor: pointer;
        }
        .license-btn        { color: white; }
        .license-btn:hover  { opacity: 0.9; transform: translateY(-1px); }
        .download-btn       { background: var(--card-bg); color: var(--text-color); border: 1.5px solid rgba(102,126,234,0.25); }
        .download-btn:hover { background: rgba(102,126,234,0.08); transform: translateY(-1px); }

        /* ── Modal ────────────────────────────────────────────────────────── */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.82);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; padding: 1.5rem;
        }
        .modal-container {
          background: white; border-radius: 20px;
          max-width: 860px; width: 100%; max-height: 90vh;
          display: flex; flex-direction: column; overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.3);
        }
        .modal-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }
        .modal-title { display: flex; align-items: center; gap: 1rem; }
        .modal-icon  { width: 36px; height: 36px; color: #ffd700; }
        .modal-title h3 { font-size: 1.2rem; font-weight: 700; margin: 0 0 0.2rem; }
        .modal-title p  { margin: 0; opacity: 0.85; font-size: 0.9rem; }
        .close-btn  {
          background: rgba(255,255,255,0.2); border: none; border-radius: 50%;
          width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
          color: white; cursor: pointer; transition: all 0.3s;
        }
        .close-btn:hover { background: rgba(255,255,255,0.35); transform: scale(1.1); }
        .modal-controls {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.75rem 1.5rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0;
          flex-wrap: wrap;
        }
        .control-btn {
          background: white; border: 1px solid #e2e8f0; border-radius: 8px;
          padding: 0.4rem; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .control-btn:hover { background: #f1f5f9; }
        .reset-btn  { padding: 0.4rem 0.9rem; font-size: 0.85rem; font-weight: 600; color: #667eea; margin-left: auto; }
        .zoom-level { font-weight: 600; color: #4a5568; min-width: 45px; text-align: center; font-size: 0.9rem; }
        .image-counter { background: rgba(102,126,234,0.1); color: #667eea; padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 600; font-size: 0.85rem; }
        .certificate-viewer {
          flex: 1; overflow: auto; padding: 1.5rem;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          background: #f8fafc;
        }
        .certificate-image-container { position: relative; width: 100%; display: flex; align-items: center; justify-content: center; }
        .certificate-image { max-width: 100%; transition: transform 0.3s ease; }
        .actual-certificate-container { position: relative; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.18); }
        .actual-certificate-image     { width: 100%; height: auto; max-height: 500px; object-fit: contain; display: block; }
        .certificate-verified-overlay {
          position: absolute; top: 10px; right: 10px;
          display: flex; align-items: center; gap: 0.4rem;
          background: #e8f5e8; color: #4caf50;
          padding: 0.5rem 1rem; border-radius: 20px;
          font-weight: 700; font-size: 0.8rem; text-transform: uppercase;
          box-shadow: 0 4px 12px rgba(76,175,80,0.3);
        }
        .certificate-placeholder {
          background: white; border: 2px dashed #e2e8f0; border-radius: 12px;
          padding: 2.5rem; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
          min-width: 400px; color: #4a5568;
        }
        .certificate-seal { display: flex; align-items: center; gap: 0.5rem; background: #e8f5e8; color: #4caf50; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; font-size: 0.85rem; }
        .nav-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.92); border: none; border-radius: 50%;
          width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10; box-shadow: 0 4px 14px rgba(0,0,0,0.15); transition: all 0.3s;
        }
        .nav-btn:hover { background: white; transform: translateY(-50%) scale(1.1); }
        .nav-btn-left  { left: -22px; }
        .nav-btn-right { right: -22px; }
        .image-dots { display: flex; justify-content: center; gap: 0.5rem; margin-top: 1rem; }
        .dot { width: 10px; height: 10px; border-radius: 50%; border: none; background: #cbd5e0; cursor: pointer; transition: all 0.3s; }
        .dot.active { background: #667eea; transform: scale(1.25); }
        .modal-footer {
          display: flex; gap: 1rem; padding: 1.25rem 1.5rem;
          border-top: 1px solid #e2e8f0; background: #f8fafc;
        }
        .verify-btn, .download-btn-modal {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.65rem 1.25rem; border-radius: 10px;
          font-weight: 600; text-decoration: none; transition: all 0.3s;
          cursor: pointer; border: none; font-size: 0.875rem;
        }
        .verify-btn         { background: white; color: #667eea; border: 1.5px solid #667eea; }
        .verify-btn:hover   { background: #667eea; color: white; }
        .download-btn-modal { background: #667eea; color: white; }
        .download-btn-modal:hover { background: #5a6fd6; transform: translateY(-1px); }

        /* ═══════════════════════════════════════════════════════════════════
           SEMINARS & COMPETITIONS  — static 2-col photo grid
        ══════════════════════════════════════════════════════════════════ */
        .seminars-section {
          padding: 4rem 0 4rem;
          margin-top: 3rem;
          border-top: 1px solid rgba(102,126,234,0.15);
          position: relative;
          z-index: 1;
        }
        .seminars-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .seminars-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-color);
          margin: 0 0 1rem;
        }
        .seminars-icon { color: #f6ad55; }
        .seminars-title-bar {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
          margin: 0 auto;
        }

        /* 2-column grid matching reference layout */
        .seminars-static-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3.5rem 4rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Individual seminar card — image + text below, no card border */
        .seminar-static-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .seminar-static-img-wrap {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 6px;
          background: #dde3ea;
        }

        .seminar-static-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .seminar-static-card:hover .seminar-static-img {
          transform: scale(1.04);
        }

        /* Placeholder box when no image */
        .seminar-static-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, #e8ecf4, #d4dce8);
        }
        .seminar-placeholder-icon {
          font-size: 2.8rem;
          opacity: 0.45;
        }
        .seminar-placeholder-text {
          font-size: 0.85rem;
          color: #8897ab;
          font-weight: 500;
          margin: 0;
        }

        /* Caption */
        .seminar-static-caption {
          text-align: center;
        }
        .seminar-static-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-color);
          margin: 0 0 0.35rem;
          line-height: 1.4;
        }
        .seminar-static-desc {
          font-size: 0.87rem;
          color: var(--text-color);
          opacity: 0.6;
          line-height: 1.5;
          margin: 0;
        }

        /* ── Responsive ───────────────────────────────────────────────────── */
        @media (max-width: 900px) {
          .cert-static-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem 2.5rem;
          }
          .seminars-static-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem 2rem;
          }
        }

        @media (max-width: 600px) {
          .certifications-section { padding: 3rem 1rem 0; }
          .header-content h2 { font-size: 1.9rem; }
          .cert-static-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .certifications-grid { grid-template-columns: 1fr; gap: 1.25rem; }
          .filters-section { flex-direction: column; align-items: stretch; }
          .search-box { max-width: 100%; }
          .view-toggle { justify-content: center; }
          .seminars-static-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .seminars-title { font-size: 1.6rem; }
          .modal-container { max-height: 95vh; }
          .modal-footer { flex-direction: column; }
          .nav-btn-left  { left: 4px; }
          .nav-btn-right { right: 4px; }
        }

        /* ============================================================
   ADD THESE RULES inside the <style jsx> block in Certifications.jsx
   Paste them just before the closing backtick of the style block
   (after the existing @media (max-width: 600px) block)
   ============================================================ */

@media (max-width: 600px) {

  /* ── Page shell ── */
  .certifications-section {
    padding: 2rem 1rem 0;
    overflow-x: hidden;
  }

  /* ── Header title — stop it overflowing ── */
  .header-content h2 {
    font-size: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    word-break: break-word;
    gap: 0.5rem;
  }

  .section-description {
    font-size: 0.9rem;
    padding: 0 0.5rem;
  }

  /* ── Stats grid — fit all 3 cards on screen ── */
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
    max-width: 100%;
    padding: 0 0.25rem;
  }

  .stat-card {
    padding: 0.85rem 0.4rem;
    border-radius: 10px;
  }

  .stat-number {
    font-size: 1.4rem;
  }

  .stat-label {
    font-size: 0.6rem;
    letter-spacing: 0;
  }

  /* ── Search + toggle ── */
  .filters-section {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    padding: 0 0.25rem;
  }

  .search-box {
    max-width: 100%;
  }

  .search-input {
    font-size: 0.9rem;
    padding: 0.7rem 1.1rem;
  }

  .view-toggle {
    justify-content: center;
  }

  .toggle-btn {
    font-size: 0.82rem;
    padding: 0.5rem 1rem;
  }

  /* ── Certificate gallery grid ── */
  .cert-static-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 0.25rem;
  }

  /* ── Seminars section ── */
  .seminars-section {
    padding: 2.5rem 0 2.5rem;
  }

  .seminars-title {
    font-size: 1.35rem;
    flex-wrap: wrap;
    text-align: center;
    gap: 0.4rem;
    padding: 0 0.5rem;
  }

  .seminars-static-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 0.25rem;
  }

  /* ── Modal ── */
  .modal-overlay {
    padding: 0.5rem;
  }

  .modal-container {
    max-height: 96vh;
    border-radius: 14px;
  }

  .modal-header {
    padding: 1rem 1.1rem;
  }

  .modal-title h3 {
    font-size: 1rem;
  }

  .modal-title p {
    font-size: 0.8rem;
  }

  .modal-footer {
    flex-direction: column;
    gap: 0.6rem;
    padding: 1rem;
  }

  .nav-btn-left  { left: 4px; }
  .nav-btn-right { right: 4px; }
}

      `}</style>
    </div>
  );
};

export default Certifications;