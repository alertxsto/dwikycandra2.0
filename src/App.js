import { useEffect, lazy, Suspense } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Team from './components/Team';
import Contact from './components/Contact';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

// Lazy load heavy WebGL background (three.js) - keeps main bundle lean
const GlobalBackground = lazy(() => import('./components/GlobalBackground'));
// Lazy load ChatBot - only loads when needed
const ChatBot = lazy(() => import('./components/ChatBot'));

function App() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
          // Don't remove class - keep it visible once seen for better performance
        });
      },
      { threshold: 0.15, rootMargin: '50px' } // Trigger earlier, less frequent checks
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // 3D Mouse tracking for interactive elements (throttled)
  useEffect(() => {
    let throttleTimer = null;
    const handleMouseMove = (e) => {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        throttleTimer = null;
      }, 32); // ~30fps throttle for CSS variables
      
      const mouseX = (e.clientX / window.innerWidth) * 30 - 15;
      const mouseY = (e.clientY / window.innerHeight) * 30 - 15;
      document.documentElement.style.setProperty('--mouse-x', `${mouseX}deg`);
      document.documentElement.style.setProperty('--mouse-y', `${mouseY}deg`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="App">
      <Suspense fallback={null}>
        <GlobalBackground />
      </Suspense>
      <NavBar />
      <Hero />
      <main>
        <About />
        <Projects />
        <Team />
        <Contact />
      </main>
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div>© {new Date().getFullYear()} Dwiky Candra — Built with React</div>
            <div className="social-links">
              <a href="https://github.com/dkycdr" target="_blank" rel="noopener noreferrer" title="GitHub" className="social-link">
                <FiGithub />
              </a>
              <a href="https://linkedin.com/in/dwiky-candra" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-link">
                <FiLinkedin />
              </a>
              <a href="https://instagram.com/dky_cdr" target="_blank" rel="noopener noreferrer" title="Instagram" className="social-link">
                <FiInstagram />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
