import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useModalA11y from '../hooks/useModalA11y';
import './hero.css';
import { FiGithub, FiCode, FiLayout, FiZap, FiArrowRight, FiServer, FiDatabase } from 'react-icons/fi';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedSkill(null);
      setIsClosing(false);
    }, 400); // Match animation duration
  };
  const skillModalRef = useModalA11y(!!selectedSkill, handleCloseModal);

  const skillDetails = [
    {
      id: 1,
      title: 'Clean Code',
      subtitle: 'Modern & Maintainable',
      description: 'I follow best practices and coding standards to write clean, readable, and maintainable code. Using modern JavaScript patterns, proper naming conventions, and modular architecture ensures that code is easy to understand and modify.',
      details: [
        'ES6+ JavaScript patterns',
        'Component-based architecture',
        'DRY and SOLID principles',
        'Code documentation & comments',
        'Proper error handling'
      ]
    },
    {
      id: 2,
      title: 'UI/UX Focus',
      subtitle: 'Beautiful & Intuitive',
      description: 'Creating visually appealing and user-friendly interfaces is my passion. I focus on responsive design, accessibility, and smooth animations to deliver an exceptional user experience across all devices.',
      details: [
        'Responsive design',
        'Accessibility (A11y)',
        'Smooth animations & transitions',
        'Mobile-first approach',
        'User experience optimization'
      ]
    },
    {
      id: 3,
      title: 'Performance',
      subtitle: 'Fast & Optimized',
      description: 'I optimize applications for speed and efficiency. Through code splitting, lazy loading, caching strategies, and performance monitoring, I ensure applications load quickly and run smoothly.',
      details: [
        'Code splitting & lazy loading',
        'Image optimization',
        'Bundle size optimization',
        'Performance monitoring',
        'Caching strategies'
      ]
    },
    {
      id: 4,
      title: 'Full Stack',
      subtitle: 'React & Node.js',
      description: 'I develop complete end-to-end applications using React on the frontend and Node.js with Express on the backend. This full-stack capability allows me to build scalable, modern web applications.',
      details: [
        'React hooks & state management',
        'Express.js server development',
        'REST API design',
        'Authentication & authorization',
        'Real-time data handling'
      ]
    },
    {
      id: 5,
      title: 'Database',
      subtitle: 'MongoDB & SQL',
      description: 'Proficient with both NoSQL (MongoDB) and relational (SQL) databases. I design efficient database schemas, write optimized queries, and ensure data integrity and security.',
      details: [
        'MongoDB aggregation & queries',
        'SQL database design',
        'Query optimization',
        'Data modeling',
        'Database security practices'
      ]
    }
  ];

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-grid">
          {/* Left side */}
          <div className="hero-text">
            <div className={`hero-badge ${isVisible ? 'visible' : ''}`}>
              <FiGithub />
              Available for Projects
            </div>
            
            <h1 className={`hero-heading ${isVisible ? 'visible' : ''}`}>
              Full-Stack Developer<br/>
              React & AI Integration Specialist
            </h1>
            
            <p className={`hero-bio ${isVisible ? 'visible' : ''}`}>
              Hi, I'm Dwiky Candra — a Full-Stack Developer specializing in building scalable, 
              high-performance web applications with React, Next.js, and Node.js. 
              Currently architecting AI-powered solutions and leading cross-functional teams 
              to deliver production-ready applications. Based in Cikarang, Indonesia.
            </p>
            
            <div className={`hero-stats ${isVisible ? 'visible' : ''}`}>
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Production Projects</span>
              </div>
              <div className="stat">
                <span className="stat-number">3</span>
                <span className="stat-label">Teams Led</span>
              </div>
            </div>
            
            <div className={`hero-links ${isVisible ? 'visible' : ''}`}>
              <a href="#projects" className="hero-link primary">
                View Projects <FiArrowRight />
              </a>
              <a href="#contact" className="hero-link secondary">
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className={`hero-cards ${isVisible ? 'visible' : ''}`}>
            <h2 className="sr-only">My Skills</h2>
            {skillDetails.map((skill) => (
              <div 
                key={skill.id}
                className="floating-card skill"
                onClick={() => setSelectedSkill(skill)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedSkill(skill);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details about ${skill.title}`}
                style={{ cursor: 'pointer' }}
              >
                <div className="skill-icon">
                  {skill.id === 1 && <FiCode />}
                  {skill.id === 2 && <FiLayout />}
                  {skill.id === 3 && <FiZap />}
                  {skill.id === 4 && <FiServer />}
                  {skill.id === 5 && <FiDatabase />}
                </div>
                <div className="skill-text">
                  <h3>{skill.title}</h3>
                  <p>{skill.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup - Rendered via Portal */}
      {selectedSkill && createPortal(
        <div
          className={`skill-modal-overlay ${isClosing ? 'closing' : ''}`}
          onClick={handleCloseModal}
          role="presentation"
        >
          <div
            ref={skillModalRef}
            className={`skill-modal ${isClosing ? 'closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedSkill.title}
            tabIndex={-1}
          >
            <button 
              className="modal-close"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="modal-header">
              <div className="modal-icon">
                {selectedSkill.id === 1 && <FiCode />}
                {selectedSkill.id === 2 && <FiLayout />}
                {selectedSkill.id === 3 && <FiZap />}
                {selectedSkill.id === 4 && <FiServer />}
                {selectedSkill.id === 5 && <FiDatabase />}
              </div>
              <div>
                <h2>{selectedSkill.title}</h2>
                <p className="modal-subtitle">{selectedSkill.subtitle}</p>
              </div>
            </div>

            <p className="modal-description">
              {selectedSkill.description}
            </p>

            <div className="modal-details">
              <h3>Key Skills:</h3>
              <ul>
                {selectedSkill.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
