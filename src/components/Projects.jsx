import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck, BarChart3, Brain, SearchCode } from 'lucide-react';

const Github = ({ size = 24, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projects = [
  {
    title: 'Ticket-Booking Concurrency Platform',
    desc: 'Built a full-stack web application integrating NLP and LLM APIs to analyze resumes, extract skills, and recommend internships.',
    features: ['Resume parsing', 'Skill extraction', 'Internship recommendations', 'AI insights'],
    tech: ['React', 'Spring Boot', 'LLM APIs', 'SQL'],
    image: '/ai_resume_analyzer.png',
    github: 'https://github.com/AnkitIn-Code',
    demo: '#',
    accent: 'from-white to-brand-green'
  },
  {
    title: 'AI-Powered Internship Recommendation & Resume Analysis System',
    desc: 'Built a full-stack web application integrating NLP and LLM APIs to analyze resumes, extract skills, and recommend internships.',
    features: ['Resume parsing', 'Skill extraction', 'Internship recommendations', 'AI insights'],
    tech: ['React', 'Spring Boot', 'LLM APIs', 'SQL'],
    image: '/ai_resume_analyzer.png',
    github: 'https://github.com/AnkitIn-Code',
    demo: '#',
    accent: 'from-white to-brand-green'
  },
  {
    title: 'Disaster Prediction System',
    desc: 'Developed a full-stack application with integrated ML models and real-time weather APIs to predict disaster probabilities.',
    features: ['Weather API integration', 'Prediction engine', 'Uncertainty analysis', 'Location-based forecasts'],
    tech: ['React', 'Spring Boot', 'Machine Learning', 'APIs'],
    image: '/disaster_prediction.png',
    github: 'https://github.com/AnkitIn-Code',
    demo: '#',
    accent: 'from-brand-green to-white'
  }
];

function ProjectCard({ project, isInView }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    
    const rotateX = -(y / (height / 2)) * 8;
    const rotateY = (x / (width / 2)) * 8;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 shadow-2xl transition-all duration-150 ease-out flex flex-col group relative bg-[#030303]"
    >
      {/* 3D layer for shadows and glows */}
      <div 
        className={`absolute inset-0 bg-gradient-to-tr ${project.accent} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`} 
      />

      {/* Project Thumbnail Image wrapper */}
      <div className="relative h-48 md:h-56 overflow-hidden shrink-0">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Glow tint on top */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-60" />
        
        {/* Technical tag */}
        <span className="absolute top-4 right-4 bg-slate-900/90 border border-white/15 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-brand-green uppercase">
          Full Stack
        </span>
      </div>

      {/* Content wrapper */}
      <div className="p-6 md:p-8 flex flex-col flex-grow text-left" style={{ transform: 'translateZ(30px)' }}>
        <h4 className="text-xl md:text-2xl font-bold font-display text-white group-hover:text-brand-green transition-colors line-clamp-2">
          {project.title}
        </h4>
        
        <p className="text-sm text-slate-400 mt-3 leading-relaxed">
          {project.desc}
        </p>

        {/* Features Checklist */}
        <div className="mt-5 flex-grow">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
            Key Features
          </h5>
          <div className="grid grid-cols-2 gap-2">
            {project.features.map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Badges */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tech.map((t, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-semibold bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions Row */}
        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer group/link"
          >
            <Github size={16} className="text-slate-400 group-hover/link:text-white transition-colors" />
            <span>GitHub Repository</span>
          </a>

          <a
            href={project.demo}
            onClick={(e) => {
              if (project.demo === '#') {
                e.preventDefault();
                alert(`Demo for ${project.title} is coming soon!`);
              }
            }}
            className="flex items-center space-x-1 text-xs font-semibold text-brand-green hover:text-white transition-colors cursor-pointer group/link"
          >
            <span>Live Demo</span>
            <ExternalLink size={14} className="transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-10"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <h3 className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-2">My Creative Works</h3>
        <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
          Featured Projects
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-white to-brand-green mx-auto mt-4 rounded-full" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {projects.map((proj, idx) => (
          <ProjectCard key={idx} project={proj} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}
