import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  Terminal,
  Cpu,
  Database,
  Flame,
  FileCode2,
} from "lucide-react";

const typingTexts = [
  "Full Stack Developer",
  "React Developer",
  "Problem Solver",
];

const CustomGithub = ({ size = 20, className }) => (
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




export default function Hero() {
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullText = typingTexts[typingIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setTypingIndex((prev) => (prev + 1) % typingTexts.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? fullText.substring(0, currentText.length - 1)
            : fullText.substring(0, currentText.length + 1),
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typingIndex]);

  const handleScrollTo = (targetId) => {
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Tag */}
          <div className="inline-flex items-center space-x-2 bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-brand-green uppercase">
            <Terminal size={14} className="animate-pulse" />
            <span>Available for Opportunities</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h4 className="text-lg md:text-xl font-display font-medium text-brand-green-light tracking-wide">
              Hi, I'm Ankit Kumar
            </h4>
            <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
              A passionate <br />
              <span className="bg-gradient-to-r from-white to-brand-green bg-clip-text text-transparent">
                {currentText}
              </span>
              <span className="text-brand-green animate-pulse">|</span>
            </h1>
          </div>

          {/* Intro Description */}
          <p className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed">
            Computer Science Engineering student passionate about building
            scalable web applications, modern user experiences, and AI-powered
            solutions.
          </p>

          {/* Buttons Row */}
          <div className="flex flex-wrap gap-4 pt-4">
            {/* View Projects */}
            <button
              onClick={() => handleScrollTo("#projects")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-white to-brand-green text-slate-950 font-semibold shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 group cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight
                size={18}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </button>

            {/* Contact Me */}
            <button
              onClick={() => handleScrollTo("#contact")}
              className="px-6 py-3 rounded-xl glass border border-white/10 text-white font-medium hover:bg-white/5 hover:border-brand-green/50 hover:scale-105 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <Mail size={18} className="text-brand-green" />
              <span>Contact Me</span>
            </button>

            {/* Download Resume */}
            <a
              href="https://drive.google.com/uc?export=download&id=1jq_Trs9ybu4LPt6rHPUcNo1kfyG7pYoF"
              
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 hover:border-white/15 hover:scale-105 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <Download size={18} className="text-brand-green" />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>

        {/* Right Graphic Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative mt-12 lg:mt-0"
        >
          {/* Main Visual Circle */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-white/10 via-brand-green/10 to-white/5 p-[2px] ">
            {/* Background glowing rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white to-brand-green opacity-20 blur-2xl -z-10 animate-pulse" />

            {/* Inner avatar background */}
            {/* Profile Photo */}
            <div className="w-full h-full rounded-full overflow-hidden relative bg-[#030303]">
              <img
                src="./images.jpg" // your image path
                alt="Aman"
                className="w-full h-full object-cover"
              />

              {/* Optional dark overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Border */}
              <div className="absolute inset-0 border border-white/10 rounded-full pointer-events-none" />
            </div>
          </div>

          
        </motion.div>
      </div>
    </section>
  );
}
