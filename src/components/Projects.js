import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useModalA11y from '../hooks/useModalA11y';
import ProjectCard from './ProjectCard';
import './projects.css';

const projects = [
  {
    id: 0,
    title: '⚡ ZeroCode - Cyberpunk Coding Academy',
    desc: 'Next-generation interactive coding platform with 19 complete courses, browser-based Monaco IDE, multi-engine execution (Python/Pyodide, React, Terminal), gamification system with XP & leaderboards, and virtual Git environment.',
    image: 'zerocode.jpg',
    tech: ['React 19', 'Vite', 'PostgreSQL', 'Monaco Editor', 'Pyodide', 'Google Gemini AI', 'Framer Motion', 'TailwindCSS'],
    links: { demo: 'https://zerocode.web.id', code: 'https://github.com/dkycdr/ZeroCode' },
    role: '🏆 Founder & Lead Architect',
    jobDesc: 'Founding architect and lead developer of ZeroCode, a revolutionary cyberpunk-themed coding academy. Built complete platform from ground up featuring 19 comprehensive courses (280+ hours content), AI-powered chatbot using Google Gemini for context-aware assistance, browser-based Monaco Editor with syntax highlighting, multi-engine code execution supporting Python (Pyodide WASM), React/TypeScript live preview, and virtual terminal. Implemented sophisticated gamification system with XP, levels, 365-day activity heatmap, and global leaderboards. Engineered virtual Git environment with 50+ commands for risk-free learning. Designed and developed cyberpunk/futuristic UI with neon aesthetics, glitch effects, and scanline overlays. Architected PostgreSQL database (Neon) handling user progress, course completion, and community forum. Deployed on Vercel with serverless functions for authentication (JWT), OAuth (Google/GitHub), and real-time leaderboard. Currently serving 1,247+ active users with 43% average course completion rate. Platform processes 24,567+ code submissions and 15,234+ AI queries.',
    featured: true,
    size: 'flagship'
  },
  {
    id: 2,
    title: 'Career Pods Explorer',
    desc: 'Full-stack career guidance platform serving 500+ President University students. Reduced career resource discovery time by 60% through intelligent categorization and real-time mentorship matching.',
    image: 'project2.jpg',
    tech: ['React', 'Node.js', 'Next.js', 'PostgreSQL', 'Socket.io'],
    links: { demo: 'https://career-podsv1.vercel.app', code: '#' },
    role: 'Project Manager & Lead Developer',
    jobDesc: 'Led 4-person cross-functional team through full SDLC. Architected scalable PostgreSQL database schema handling 500+ user profiles and 1000+ career resources. Implemented real-time WebSocket connections for instant mentorship notifications. Reduced page load time from 3.2s to 1.1s through code splitting and lazy loading. Managed sprint cycles using Agile methodology, conducted code reviews, and delivered MVP 2 weeks ahead of schedule.',
    size: 'large'
  },
  {
    id: 3,
    title: 'President FoodConnect',
    desc: 'Multi-platform food ordering system processing 200+ daily orders across campus. Achieved 95% order accuracy rate and reduced average delivery time by 40% through optimized vendor-student matching algorithm.',
    image: 'project3.jpg',
    tech: ['React', 'Next.js', 'Flutter', 'Node.js', 'PostgreSQL'],
    links: { demo: '#', code: '#' },
    role: 'Project Manager & Backend Architect',
    jobDesc: 'Coordinated 6-person team across web (React/Next.js) and mobile (Flutter) platforms. Designed and implemented RESTful API architecture handling 200+ concurrent requests with 99.5% uptime. Built real-time order tracking system using WebSockets, reducing customer support inquiries by 35%. Architected PostgreSQL database with optimized indexing strategies, achieving sub-100ms query response times. Implemented JWT-based authentication system securing 800+ user accounts. Delivered production-ready MVP in 12 weeks with zero critical bugs post-launch.',
    size: 'large'
  },
  {
    id: 4,
    title: 'Z Studio',
    desc: 'Full-stack creative services platform managing 50+ client projects. Automated project workflow reducing administrative overhead by 45% and improved client communication response time by 60%.',
    image: 'project4.jpg',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Socket.io'],
    links: { demo: 'https://zeekkk246.github.io/ZstudiO', code: 'https://zeekkk246.github.io/ZstudiO' },
    role: 'Full-Stack Developer',
    jobDesc: 'Architected end-to-end TypeScript application with strict type safety, reducing runtime errors by 80%. Implemented real-time client-designer collaboration system using Socket.io, enabling instant feedback on 100+ design iterations. Built custom file upload system handling 50MB+ assets with progress tracking and automatic compression. Designed RESTful API with Express.js serving 15+ endpoints with comprehensive error handling. Integrated Stripe payment gateway processing $10K+ in transactions. Optimized bundle size from 2.1MB to 450KB through code splitting and tree shaking, achieving 90+ Lighthouse performance score.',
    size: 'medium'
  },
  {
    id: 1,
    title: 'AI-Powered Landing Page',
    desc: 'A modern landing page featuring an AI chat assistant and smooth animations.',
    image: 'project1.jpg',
    tech: ['React', 'Framer Motion', 'TailwindCSS', 'OpenAI'],
    links: { demo: 'https://dkycdr.github.io/dwiky-candra/ai-landing.html', code: '#' },
    role: 'Personal Project',
    jobDesc: 'Full ownership of project design and implementation. Responsible for UI/UX design, component architecture, API integration with OpenAI, and deployment.',
    size: 'small'
  },
  {
    id: 5,
    title: 'Digital Notes',
    desc: 'Digital Notes is a personal project for managing notes with real-time collaboration features.',
    image: 'project5.jpg',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    links: { demo: 'https://digital-notes-beige.vercel.app', code: '#' },
    role: 'Personal Project',
    jobDesc: 'Designed and implemented a note-taking application with real-time collaboration. Developed frontend using React/Next.js, backend with Node.js, and integrated WebSocket for live updates. Focused on user authentication, note sharing, and responsive design.',
    size: 'small'
  }
];

export default function Projects() {
  const gridRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = gridRef.current?.querySelectorAll('.project-card') || [];
    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedRole) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedRole]);

  // Handle modal close with animation
  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedRole(null);
      setIsClosing(false);
    }, 400); // Match animation duration
  };
  const roleModalRef = useModalA11y(!!selectedRole, handleCloseModal);

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p className="section-desc">A selection of my top projects showcasing modern technology.</p>
        </div>

        <div className="grid" ref={gridRef}>
          {projects.map((p, index) => (
            <div
              key={p.id}
              className="project-wrapper"
              data-size={p.size}
              data-featured={p.featured || false}
            >
              <ProjectCard
                title={p.title}
                description={p.desc}
                techStack={p.tech}
                demoLink={p.links.demo}
                codeLink={p.links.code}
                role={p.role}
                onRoleClick={() => setSelectedRole(p)}
                delay={index * 0.1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Role Modal - Rendered via Portal to body */}
      {selectedRole && createPortal(
        <div
          className={`role-modal-overlay ${isClosing ? 'closing' : ''}`}
          onClick={handleCloseModal}
          role="presentation"
        >
          <div
            ref={roleModalRef}
            className={`role-modal ${isClosing ? 'closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedRole.title}
            tabIndex={-1}
          >
            <button
              className="modal-close"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="role-modal-header">
              <h2>{selectedRole.title}</h2>
              <p className="role-title">{selectedRole.role}</p>
            </div>

            <div className="role-modal-content">
              <h3>Job Description & Responsibilities</h3>
              <p>{selectedRole.jobDesc}</p>

              <div className="role-details">
                <h4>Project Details</h4>
                <p><strong>Technologies:</strong> {selectedRole.tech.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
