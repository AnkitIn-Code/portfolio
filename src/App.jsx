import React, { useEffect, useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillsGalaxy from './components/SkillsGalaxy';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-brand-green/35 selection:text-white antialiased overflow-x-hidden">
      
      {/* Interactive Cyber Background */}
      <ParticleBackground />

      {/* Floating Active Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-white to-brand-green z-55 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Shell Elements */}
      <Navbar />

      {/* Main Container */}
      <main className="relative z-10 w-full">
        {/* Sections */}
        <Hero />
        <About />
        <SkillsGalaxy />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
