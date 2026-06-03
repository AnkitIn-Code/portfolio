import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

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

const Linkedin = ({ size = 24, className }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | sending | success
  
  const containerRef = useRef(null);
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
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitStatus('sending');
    
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_ee87eqh',
          template_id: 'template_ffdzrbp',
          user_id: 'io7CT9dqajkTXranM',
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset success banner after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        const errorText = await response.text();
        console.error('EmailJS submission failed response:', errorText);
        setSubmitStatus('error');
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 6000);
      }
    } catch (error) {
      console.error('Error sending email through EmailJS:', error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 6000);
    }
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-10"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <h3 className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-2">Get In Touch</h3>
        <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
          Contact Me
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-white to-brand-green mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        {/* Left Side: Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-8 text-left"
        >
          <div className="space-y-4">
            <h4 className="text-2xl font-bold font-display text-white">
              Let's build something epic!
            </h4>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Have an idea, project, or full-time position you'd like to discuss? Reach out and let's coordinate. I am available for internships, contract roles, and developer assignments.
            </p>
          </div>

          {/* Details list */}
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-green/20 transition-all">
              <div className="p-3 rounded-lg bg-brand-green/10 text-brand-green">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Email Me</p>
                <a href="mailto:ankit176y@gmail.com" className="text-sm font-semibold text-slate-200 hover:text-brand-green transition-colors">
                  ankit176y@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
              <div className="p-3 rounded-lg bg-white/10 text-white">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Call Me</p>
                <a href="tel:8955336368" className="text-sm font-semibold text-slate-200 hover:text-white transition-colors">
                  +91 8955336368
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-green/20 transition-all">
              <div className="p-3 rounded-lg bg-brand-green/10 text-brand-green">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Location</p>
                <span className="text-sm font-semibold text-slate-200">
                  Chandigarh, India
                </span>
              </div>
            </div>
          </div>

          {/* Social Links buttons */}
          <div className="pt-6">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Connect with me</h5>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/in/ankit-kumar"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-green hover:text-brand-green text-slate-300 font-semibold flex items-center space-x-2 transition-all cursor-pointer"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/AnkitIn-Code"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white hover:text-white text-slate-300 font-semibold flex items-center space-x-2 transition-all cursor-pointer"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="glass p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative bg-[#030303]">
            
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {/* Row: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-green outline-none text-white text-sm transition-colors ${
                      formErrors.name ? 'border-red-500/50 focus:border-red-500' : ''
                    }`}
                    placeholder="Enter your name"
                  />
                  {formErrors.name && (
                    <p className="text-[10px] text-red-400 font-semibold flex items-center space-x-1">
                      <AlertCircle size={10} />
                      <span>{formErrors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-green outline-none text-white text-sm transition-colors ${
                      formErrors.email ? 'border-red-500/50 focus:border-red-500' : ''
                    }`}
                    placeholder="example@mail.com"
                  />
                  {formErrors.email && (
                    <p className="text-[10px] text-red-400 font-semibold flex items-center space-x-1">
                      <AlertCircle size={10} />
                      <span>{formErrors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-green outline-none text-white text-sm transition-colors ${
                    formErrors.subject ? 'border-red-500/50 focus:border-red-500' : ''
                  }`}
                  placeholder="What is this regarding?"
                />
                {formErrors.subject && (
                  <p className="text-[10px] text-red-400 font-semibold flex items-center space-x-1">
                    <AlertCircle size={10} />
                    <span>{formErrors.subject}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-green outline-none text-white text-sm transition-colors resize-none ${
                    formErrors.message ? 'border-red-500/50 focus:border-red-500' : ''
                  }`}
                  placeholder="Tell me about your project..."
                />
                {formErrors.message && (
                  <p className="text-[10px] text-red-400 font-semibold flex items-center space-x-1">
                    <AlertCircle size={10} />
                    <span>{formErrors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitStatus === 'sending'}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-white to-brand-green text-slate-950 font-bold shadow-lg shadow-green-500/10 hover:scale-[1.01] hover:shadow-green-500/20 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus === 'sending' ? (
                  <>
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Success or Error notification banner overlay */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8 glass border border-emerald-500/30 p-4 rounded-2xl flex items-center space-x-3 bg-slate-950/90 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="text-left">
                    <h5 className="text-sm font-bold text-white">Transmission Successful</h5>
                    <p className="text-xs text-slate-400">Thank you! Your message has been received. I will reply shortly.</p>
                  </div>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8 glass border border-red-500/30 p-4 rounded-2xl flex items-center space-x-3 bg-slate-950/90 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                >
                  <div className="p-2 rounded-lg bg-red-500/15 text-red-400">
                    <AlertCircle size={18} />
                  </div>
                  <div className="text-left">
                    <h5 className="text-sm font-bold text-white">Transmission Failed</h5>
                    <p className="text-xs text-slate-400">Could not transmit message. Please check connection or try again.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
