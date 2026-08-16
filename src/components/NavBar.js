import React, { useEffect, useState, useRef, useCallback } from 'react';
import './navbar.css';

export default function NavBar(){
  const [active, setActive] = useState('hero');
  const navRef = useRef(null);
  const [activeHl, setActiveHl] = useState({left:0,width:0,opacity:0});
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // Only update if not programmatically scrolling
          if (entry.isIntersecting && !isScrollingRef.current) {
            setActive(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    function update() {
      const nav = navRef.current;
      if (!nav) return setActiveHl({left:0,width:0,opacity:0});
      const activeEl = nav.querySelector('a.active');
      if (!activeEl) return setActiveHl({left:0,width:0,opacity:0});
      const navRect = nav.getBoundingClientRect();
      const r = activeEl.getBoundingClientRect();
      const left = r.left - navRect.left + nav.scrollLeft;
      const width = r.width;
      setActiveHl({left, width, opacity:1});
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [active]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const hoverEl = nav.querySelector('.nav-highlight-hover');
    if (!hoverEl) return;
    
    let leaveTimer = null;
    const links = nav.querySelectorAll('a');

    function onLinkEnter(e){
      const target = e.currentTarget;
      const navRect = nav.getBoundingClientRect();
      const r = target.getBoundingClientRect();
      const left = r.left - navRect.left + nav.scrollLeft;
      const width = r.width;
      
      // Direct DOM manipulation - no React re-render
      hoverEl.style.left = `${left}px`;
      hoverEl.style.width = `${width}px`;
      hoverEl.style.opacity = '1';
      
      if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
    }

    function onNavLeave(){
      leaveTimer = setTimeout(()=>{
        hoverEl.style.opacity = '0';
      }, 150);
    }

    links.forEach(link => link.addEventListener('mouseenter', onLinkEnter));
    nav.addEventListener('mouseleave', onNavLeave);
    
    return () => {
      links.forEach(link => link.removeEventListener('mouseenter', onLinkEnter));
      nav.removeEventListener('mouseleave', onNavLeave);
      if (leaveTimer) clearTimeout(leaveTimer);
    }
  }, []);

  const handleNavClick = useCallback((e) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (!targetElement) return;
    
    // Lock active state during programmatic scroll
    isScrollingRef.current = true;
    setActive(targetId);
    
    const navbarHeight = 80;
    const targetRect = targetElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetPosition = targetRect.top + scrollTop - navbarHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Unlock after smooth scroll completes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
    
    window.history.replaceState(null, '', href);
  }, []);

  return (
    <header className="site-nav">
      <div className="container nav-inner">
        <div className="brand" aria-hidden={false}>
          {/* Animated brand: multi-layer with glowing accent */}
          <div className="brand-inner">
            <div className="brand-bg"></div>
            <div className="brand-text">
              <span className="glitch-text" data-text="Dwiky Candra">Dwiky Candra</span>
            </div>
            <div className="brand-accent">
              <span className="float-text">Dev</span>
              <span className="glow"></span>
            </div>
          </div>
        </div>
        <nav ref={navRef}>
          <span className="nav-highlight-active" style={{left: activeHl.left, width: activeHl.width, opacity: activeHl.opacity}} />
          <span className="nav-highlight-hover" style={{left: 0, width: 0, opacity: 0}} />
          <a className={active==='about' ? 'active': ''} href="#about" onClick={handleNavClick}>About</a>
          <a className={active==='projects' ? 'active': ''} href="#projects" onClick={handleNavClick}>Projects</a>
          <a className={active==='team' ? 'active': ''} href="#team" onClick={handleNavClick}>Team</a>
          <a className={active==='contact' ? 'active': ''} href="#contact" onClick={handleNavClick}>Contact</a>
        </nav>
      </div>
    </header>
  )
}
