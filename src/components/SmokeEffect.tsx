import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  angle: number;
  angleSpeed: number;
}

const SmokeEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Устанавливаем размер canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Отслеживание движения мыши
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Вычисляем скорость движения мыши
      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Создаем больше частиц при быстром движении
      const particleCount = Math.min(Math.max(Math.floor(speed * 0.3), 1), 8);
      
      for (let i = 0; i < particleCount; i++) {
        createParticle(e.clientX, e.clientY, speed);
      }
    };

    // Создание частицы
    const createParticle = (x: number, y: number, speed: number) => {
      const particle: Particle = {
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 3 + (mouseRef.current.x - mouseRef.current.prevX) * 0.1,
        vy: (Math.random() - 0.5) * 3 + (mouseRef.current.y - mouseRef.current.prevY) * 0.1 - 0.5,
        life: 0,
        maxLife: 80 + Math.random() * 60,
        size: Math.random() * 8 + 3,
        opacity: 0.6 + Math.random() * 0.4,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02
      };
      particlesRef.current.push(particle);
    };

    // Анимация частиц
    const animate = () => {
      // Очищаем canvas с небольшим затуханием для создания следа
      ctx.fillStyle = 'rgba(17, 24, 38, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Обновляем и рисуем частицы
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life++;
        
        // Обновляем позицию с турбулентностью
        particle.angle += particle.angleSpeed;
        particle.x += particle.vx + Math.sin(particle.angle) * 0.5;
        particle.y += particle.vy + Math.cos(particle.angle) * 0.3;
        
        // Применяем сопротивление воздуха
        particle.vx *= 0.985;
        particle.vy *= 0.985;
        particle.vy -= 0.02; // Легкий подъем вверх
        
        // Увеличиваем размер и уменьшаем прозрачность
        particle.size += 0.15;
        const lifeRatio = particle.life / particle.maxLife;
        particle.opacity = Math.max(0, (1 - lifeRatio) * 0.8);

        // Рисуем частицу с более реалистичным дымом
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        
        // Создаем более натуральный градиент дыма
        gradient.addColorStop(0, `rgba(200, 200, 200, ${particle.opacity * 0.8})`);
        gradient.addColorStop(0.3, `rgba(180, 180, 180, ${particle.opacity * 0.4})`);
        gradient.addColorStop(0.6, `rgba(160, 160, 160, ${particle.opacity * 0.2})`);
        gradient.addColorStop(1, `rgba(140, 140, 140, 0)`);

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Добавляем второй слой для объема
        const innerGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        
        innerGradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity * 0.3})`);
        innerGradient.addColorStop(0.5, `rgba(240, 240, 240, ${particle.opacity * 0.1})`);
        innerGradient.addColorStop(1, `rgba(220, 220, 220, 0)`);

        ctx.save();
        ctx.globalCompositeOperation = 'soft-light';
        ctx.fillStyle = innerGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return particle.life < particle.maxLife;
      });

      // Ограничиваем количество частиц для производительности
      if (particlesRef.current.length > 150) {
        particlesRef.current = particlesRef.current.slice(-150);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
      style={{ mixBlendMode: 'normal' }}
    />
  );
};

export default SmokeEffect;