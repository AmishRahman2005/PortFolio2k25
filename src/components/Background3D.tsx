import React, { useRef, useEffect } from 'react';

interface Background3DProps {
  isDarkMode: boolean;
}

export const Background3D: React.FC<Background3DProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    size: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(50, Math.floor((width * height) / 25000)); // Responsive particle count
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Set background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      if (isDarkMode) {
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
        gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.9)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      } else {
        gradient.addColorStop(0, 'rgba(248, 250, 252, 0.95)');
        gradient.addColorStop(0.5, 'rgba(241, 245, 249, 0.9)');
        gradient.addColorStop(1, 'rgba(248, 250, 252, 0.95)');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
        if (particle.z < 0) particle.z = 1000;
        if (particle.z > 1000) particle.z = 0;

        // Calculate perspective
        const scale = 1000 / (1000 + particle.z);
        const x2d = particle.x * scale;
        const y2d = particle.y * scale;
        const size = particle.size * scale;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity * scale;
        
        // Create subtle glow effect
        const glowGradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 3);
        if (isDarkMode) {
          glowGradient.addColorStop(0, 'rgba(56, 189, 248, 0.6)');
          glowGradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.3)');
          glowGradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
        } else {
          glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
          glowGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.2)');
          glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        }

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = isDarkMode ? 'rgba(56, 189, 248, 0.8)' : 'rgba(59, 130, 246, 0.6)';
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Connect nearby particles
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const scale1 = 1000 / (1000 + particle.z);
            const scale2 = 1000 / (1000 + other.z);
            const x1 = particle.x * scale1;
            const y1 = particle.y * scale1;
            const x2 = other.x * scale2;
            const y2 = other.y * scale2;

            ctx.save();
            ctx.globalAlpha = (1 - distance / 150) * 0.1 * Math.min(scale1, scale2);
            ctx.strokeStyle = isDarkMode ? 'rgba(56, 189, 248, 0.3)' : 'rgba(59, 130, 246, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};