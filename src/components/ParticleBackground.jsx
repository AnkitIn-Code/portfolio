import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 25), 80); // Responsive density

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.8 + 0.3; // white stars varying size
        this.speedX = Math.random() * 0.15 - 0.075; // slower drift for stars
        this.speedY = Math.random() * 0.15 - 0.075;
        this.color = Math.random() > 0.4 ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.4)';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections (subtle white star constellation lines)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-dark-bg pointer-events-none">
      {/* Canvas for fine star/node particles */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full opacity-60" />

      {/* Massive Neon Glowing Blobs (Green & White) */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] rounded-full bg-brand-green/5 blur-[100px] animate-blob-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] min-w-[350px] min-h-[350px] rounded-full bg-white/4 blur-[120px] animate-blob-medium" />
      <div className="absolute top-1/2 right-1/3 w-[25vw] h-[25vw] min-w-[250px] min-h-[250px] rounded-full bg-brand-green-light/5 blur-[90px] animate-blob-slow" />
      
      {/* Dark overlay grid for futuristic technical look */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />
    </div>
  );
}
