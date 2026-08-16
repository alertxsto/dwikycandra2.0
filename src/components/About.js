import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './about.css';
import Stats from './Stats';
import Testimonials from './Testimonials';
import ProfileCard from './ProfileCard';

export default function About() {
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Animate skill bars
            setTimeout(() => {
              const bars = entry.target.querySelectorAll('.skill-bar');
              bars.forEach((bar) => {
                const percent = bar.getAttribute('data-percent');
                bar.style.setProperty('--skill-width', `${percent}%`);
              });
            }, 100);
          }
        });
      },
      { threshold: 0.25 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedInfo(null);
      setIsClosing(false);
    }, 400);
  };

  const infoDetails = {
    education: {
      title: 'Education',
      subtitle: 'President University',
      description: 'Currently pursuing a Bachelor\'s degree in Informatics at President University\'s Faculty of Computer Science. The program provides comprehensive knowledge in software engineering, algorithms, data structures, and modern web technologies.',
      details: [
        'Major: Informatics / Information Technology',
        'Faculty: Computer Science',
        'Focus: Software Engineering & Web Development',
        'Relevant Coursework: Data Structures, Algorithms, Database Systems, Web Programming',
        'Active participation in tech communities and coding competitions'
      ]
    },
    focus: {
      title: 'Focus Area',
      subtitle: 'Full Stack Web Dev & AI',
      description: 'Specializing in full stack web development with a strong emphasis on modern JavaScript frameworks and AI integration. Building scalable, performant applications that leverage both traditional web technologies and cutting-edge AI capabilities.',
      details: [
        'Frontend: React.js, Next.js, Responsive Design',
        'Backend: Node.js, Express.js, RESTful APIs',
        'Database: PostgreSQL, MongoDB',
        'AI/ML: Python, TensorFlow, Generative AI models',
        'Cloud: AWS, Vercel deployment'
      ]
    },
    mentorship: {
      title: 'Mentorship',
      subtitle: 'Self-learner — Tech Community',
      description: 'Primarily self-taught through online resources, documentation, and hands-on projects. Actively engaged with tech communities, participating in bootcamps, workshops, and collaborative learning environments to continuously expand knowledge and skills.',
      details: [
        'Self-directed learning through official documentation and tutorials',
        'Active member of developer communities and forums',
        'Participated in IDCamp 2025 (Generative AI Engineering)',
        'Attended workshops and bootcamps (DBS Foundation, AWS Academy)',
        'Continuous learning through real-world project experience'
      ]
    },
    availability: {
      title: 'Availability',
      subtitle: 'Freelance & Weekends',
      description: 'Available for freelance projects and part-time opportunities, particularly on weekends and flexible hours. Open to remote work, contract-based projects, and collaborative development opportunities that align with my skills and interests.',
      details: [
        'Freelance web development projects',
        'Weekend availability for project work',
        'Flexible hours for remote collaboration',
        'Open to short-term and long-term contracts',
        'Available for consultations and code reviews'
      ]
    },
    // Professional Courses
    pijak: {
      title: 'Pijak x IBM SkillsBuild',
      subtitle: 'AI Course',
      description: 'Comprehensive AI fundamentals course in collaboration with IBM SkillsBuild. Applied AI concepts to build intelligent chatbot prototype, reducing response time by 40% through optimized model selection and prompt engineering.',
      details: [
        'AI fundamentals and core concepts',
        'Introduction to machine learning algorithms',
        'Practical AI applications in software',
        'IBM Watson AI services overview',
        'Achievement: Built AI chatbot prototype with 40% faster response time'
      ]
    },
    idcamp: {
      title: 'ID Camp 2025',
      subtitle: 'Generative AI Engineering',
      description: 'Intensive bootcamp by Indosat Ooredoo focusing on Generative AI Engineering. Integrated LLM capabilities into Career Pods platform, enabling semantic search that improved job discovery accuracy by 60% for 500+ students.',
      details: [
        'Large Language Models (LLMs) architecture',
        'Prompt engineering best practices',
        'Fine-tuning and model optimization',
        'AI integration in web applications',
        'Achievement: Deployed semantic search feature serving 500+ active users'
      ]
    },
    codingcamp: {
      title: 'Coding Camp 2026 by DBS Foundation',
      subtitle: 'Full Stack Web Development',
      description: 'Comprehensive full stack web development bootcamp covering modern JavaScript frameworks, backend development, and database management. Graduated top 10% of cohort, built 3 production-ready applications deployed to 200+ users.',
      details: [
        'React.js and modern frontend development',
        'Node.js and Express.js backend',
        'RESTful API design and implementation',
        'Database design (SQL and NoSQL)',
        'Achievement: Top 10% graduate, deployed 3 apps to 200+ users'
      ]
    },
    aws: {
      title: 'AWS Backend Academy',
      subtitle: 'Cloud Backend Development',
      description: 'AWS-focused backend development program covering cloud architecture, serverless computing, and scalable backend systems. Architected serverless API achieving 99.5% uptime and handling 10K+ daily requests with 200ms avg response time.',
      details: [
        'AWS core services (EC2, S3, Lambda)',
        'Serverless architecture patterns',
        'API Gateway and microservices',
        'Database services (RDS, DynamoDB)',
        'Achievement: Built serverless API with 99.5% uptime, 10K+ daily requests'
      ]
    },
    // Skills
    htmlcss: {
      title: 'HTML/CSS',
      subtitle: '90% Confidence',
      description: 'Expert-level proficiency in HTML5 and CSS3, including modern layout techniques, animations, and responsive design. Capable of building pixel-perfect, accessible, and performant user interfaces.',
      details: [
        'Semantic HTML5 markup',
        'Advanced CSS (Flexbox, Grid, Custom Properties)',
        'CSS animations and transitions',
        'Responsive design and media queries',
        'Cross-browser compatibility'
      ]
    },
    javascript: {
      title: 'JavaScript (ES6+)',
      subtitle: '85% Confidence',
      description: 'Strong command of modern JavaScript including ES6+ features, asynchronous programming, and functional programming concepts. Experienced in writing clean, maintainable, and efficient JavaScript code.',
      details: [
        'ES6+ syntax (arrow functions, destructuring, spread/rest)',
        'Async/await and Promises',
        'Array methods and functional programming',
        'DOM manipulation and event handling',
        'Module systems (ES6 modules)'
      ]
    },
    react: {
      title: 'React.js',
      subtitle: '88% Confidence',
      description: 'Proficient in building modern React applications using hooks, context API, and component composition. Experienced with React ecosystem including routing, state management, and performance optimization.',
      details: [
        'React Hooks (useState, useEffect, custom hooks)',
        'Component lifecycle and optimization',
        'React Router for navigation',
        'Context API and state management',
        'Performance optimization techniques'
      ]
    },
    responsive: {
      title: 'Responsive Design',
      subtitle: '92% Confidence',
      description: 'Expert in creating responsive, mobile-first designs that work seamlessly across all devices. Strong understanding of breakpoints, fluid layouts, and adaptive design patterns.',
      details: [
        'Mobile-first design approach',
        'Flexible grid systems',
        'Media queries and breakpoints',
        'Responsive images and assets',
        'Touch-friendly interfaces'
      ]
    },
    nodejs: {
      title: 'Node.js',
      subtitle: '70% Confidence',
      description: 'Solid foundation in Node.js for backend development. Capable of building RESTful APIs, handling authentication, and working with databases. Continuously improving through hands-on projects.',
      details: [
        'Express.js framework',
        'RESTful API design',
        'Middleware and routing',
        'Authentication (JWT, sessions)',
        'File system and streams'
      ]
    },
    nextjs: {
      title: 'Next.js',
      subtitle: '70% Confidence',
      description: 'Working knowledge of Next.js for building server-side rendered and static React applications. Familiar with routing, API routes, and deployment strategies.',
      details: [
        'Pages and App Router',
        'Server-side rendering (SSR)',
        'Static site generation (SSG)',
        'API routes',
        'Deployment on Vercel'
      ]
    },
    postgresql: {
      title: 'PostgreSQL',
      subtitle: '70% Confidence',
      description: 'Competent in designing and querying PostgreSQL databases. Understanding of relational database concepts, SQL queries, and database optimization techniques.',
      details: [
        'Database schema design',
        'SQL queries (SELECT, JOIN, subqueries)',
        'Indexes and query optimization',
        'Transactions and ACID properties',
        'Database migrations'
      ]
    },
    python: {
      title: 'Python (AI/ML)',
      subtitle: '75% Confidence',
      description: 'Proficient in Python for AI/ML applications. Experienced with popular libraries for data processing, machine learning, and working with AI models.',
      details: [
        'NumPy and Pandas for data processing',
        'TensorFlow and PyTorch basics',
        'Working with pre-trained models',
        'Data visualization (Matplotlib, Seaborn)',
        'API integration for AI services'
      ]
    },
    git: {
      title: 'Git & Version Control',
      subtitle: '80% Confidence',
      description: 'Strong understanding of Git workflows, branching strategies, and collaborative development. Experienced with GitHub for code hosting and project management.',
      details: [
        'Git commands and workflows',
        'Branching and merging strategies',
        'Pull requests and code reviews',
        'Conflict resolution',
        'GitHub Actions for CI/CD'
      ]
    },
    uiux: {
      title: 'UI/UX Design Thinking',
      subtitle: '78% Confidence',
      description: 'Good grasp of UI/UX principles and design thinking methodology. Focused on creating intuitive, user-centered interfaces with attention to accessibility and usability.',
      details: [
        'User-centered design principles',
        'Wireframing and prototyping',
        'Color theory and typography',
        'Accessibility (WCAG guidelines)',
        'Usability testing and iteration'
      ]
    },
    dockeraws: {
      title: 'Docker & AWS',
      subtitle: 'Familiar',
      description: 'Working knowledge of containerization with Docker and cloud services with AWS. Familiar with deployment workflows, container orchestration basics, and core AWS services for hosting web applications.',
      details: [
        'Docker containerization basics',
        'Docker Compose for multi-container apps',
        'AWS EC2 and S3 fundamentals',
        'AWS Lambda for serverless functions',
        'Basic CI/CD with Docker and AWS'
      ]
    }
  };



  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <h2>About Me</h2>
          
          {/* Intro section with text on left and photo on right */}
          <div className="intro-section">
            <div className="intro-text">
              <p>
                I'm Dwiky Candra, a Full-Stack Developer and Informatics student at President University. 
                I architect scalable web applications using React, Next.js, and Node.js, with proven experience 
                leading cross-functional teams to deliver production-ready solutions. Currently specializing in 
                AI integration through IDCamp 2025 (Generative AI Engineering), building intelligent systems 
                that serve 500+ active users across multiple platforms.
              </p>
            </div>
            <div className="intro-photo">
              <ProfileCard 
                onContactClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
            </div>
          </div>

          <div className="about-grid">
            <div className="bio">
              <h3>Professional Background</h3>
              <p>
                I am pursuing my Bachelor’s degree at President University.
                I joined the Indosat Ooredoo IDCamp 2025 bootcamp (Gen AI Engineering track)
                to deepen my understanding of generative models and their integration into web applications.
              </p>
              <p>
                My primary focus is on React.js, responsive UI design, and performance optimization. I also have solid experience building RESTful APIs with Node.js and experimenting with Python for ML prototyping.
              </p>

              <div className="info-grid">
                <div className="info-card" onClick={() => setSelectedInfo(infoDetails.education)}>
                  <span className="info-label">Education</span>
                  <p>President University</p>
                </div>
                <div className="info-card" onClick={() => setSelectedInfo(infoDetails.focus)}>
                  <span className="info-label">Focus Area</span>
                  <p>Full Stack Web Dev & AI</p>
                </div>
                <div className="info-card" onClick={() => setSelectedInfo(infoDetails.mentorship)}>
                  <span className="info-label">Mentorship</span>
                  <p>Self-learner — Tech Community</p>
                </div>
                <div className="info-card" onClick={() => setSelectedInfo(infoDetails.availability)}>
                  <span className="info-label">Availability</span>
                  <p>Freelance & weekends</p>
                </div>
              </div>

              <div className="courses-section">
                <h4>Professional Courses</h4>
                <div className="courses-list">
                  <div className="course-item" onClick={() => setSelectedInfo(infoDetails.pijak)}>
                    <span className="course-name">Pijak in Collaboration with IBM SkillsBuild</span>
                    <span className="course-type">AI Course</span>
                  </div>
                  <div className="course-item" onClick={() => setSelectedInfo(infoDetails.idcamp)}>
                    <span className="course-name">ID Camp 2025</span>
                    <span className="course-type">Generative AI Engineering</span>
                  </div>
                  <div className="course-item" onClick={() => setSelectedInfo(infoDetails.codingcamp)}>
                    <span className="course-name">Coding Camp 2026 by DBS Foundation</span>
                    <span className="course-type">Full Stack Web Development</span>
                  </div>
                  <div className="course-item" onClick={() => setSelectedInfo(infoDetails.aws)}>
                    <span className="course-name">AWS Backend Academy</span>
                    <span className="course-type">Cloud Backend Development</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="skills" ref={skillsRef}>
              <h3>Technical Skills</h3>

              {/* Expert / Proficient */}
              <div className="skill-category">
                <h4>Expert / Proficient</h4>
                <div className="skill-item expert" onClick={() => setSelectedInfo(infoDetails.react)}>
                  <span className="skill-name">React.js</span>
                  <span className="skill-badge">Expert</span>
                </div>

                <div className="skill-item expert" onClick={() => setSelectedInfo(infoDetails.javascript)}>
                  <span className="skill-name">JavaScript (ES6+)</span>
                  <span className="skill-badge">Expert</span>
                </div>

                <div className="skill-item expert" onClick={() => setSelectedInfo(infoDetails.htmlcss)}>
                  <span className="skill-name">HTML/CSS</span>
                  <span className="skill-badge">Expert</span>
                </div>

                <div className="skill-item expert" onClick={() => setSelectedInfo(infoDetails.responsive)}>
                  <span className="skill-name">Responsive Design</span>
                  <span className="skill-badge">Expert</span>
                </div>
              </div>

              {/* Intermediate / Working Knowledge */}
              <div className="skill-category">
                <h4>Intermediate / Working Knowledge</h4>
                <div className="skill-item intermediate" onClick={() => setSelectedInfo(infoDetails.nodejs)}>
                  <span className="skill-name">Node.js & Express</span>
                  <span className="skill-badge">Intermediate</span>
                </div>

                <div className="skill-item intermediate" onClick={() => setSelectedInfo(infoDetails.nextjs)}>
                  <span className="skill-name">Next.js</span>
                  <span className="skill-badge">Intermediate</span>
                </div>

                <div className="skill-item intermediate" onClick={() => setSelectedInfo(infoDetails.postgresql)}>
                  <span className="skill-name">PostgreSQL</span>
                  <span className="skill-badge">Intermediate</span>
                </div>

                <div className="skill-item intermediate" onClick={() => setSelectedInfo(infoDetails.python)}>
                  <span className="skill-name">Python (AI/ML)</span>
                  <span className="skill-badge">Intermediate</span>
                </div>
              </div>

              {/* Familiar / Tools */}
              <div className="skill-category">
                <h4>Familiar / Tools</h4>
                <div className="skill-item familiar" onClick={() => setSelectedInfo(infoDetails.git)}>
                  <span className="skill-name">Git & Version Control</span>
                  <span className="skill-badge">Proficient</span>
                </div>

                <div className="skill-item familiar" onClick={() => setSelectedInfo(infoDetails.uiux)}>
                  <span className="skill-name">UI/UX Design Thinking</span>
                  <span className="skill-badge">Proficient</span>
                </div>

                <div className="skill-item familiar" onClick={() => setSelectedInfo(infoDetails.dockeraws)}>
                  <span className="skill-name">Docker & AWS</span>
                  <span className="skill-badge">Familiar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stats />
      <Testimonials />

      {/* Info Modal - Rendered via Portal */}
      {selectedInfo && createPortal(
        <div className={`info-modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleCloseModal}>
          <div className={`info-modal ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="modal-header">
              <div>
                <h2>{selectedInfo.title}</h2>
                <p className="modal-subtitle">{selectedInfo.subtitle}</p>
              </div>
            </div>

            <p className="modal-description">
              {selectedInfo.description}
            </p>

            <div className="modal-details">
              <h3>Details:</h3>
              <ul>
                {selectedInfo.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

