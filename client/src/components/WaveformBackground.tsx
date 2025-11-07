import { useEffect, useRef } from 'react';

export default function WaveformBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Gradient colors - Primary Blue to lighter shades
    const colors = {
      blue: { h: 217, s: 89, l: 53 },       // #1A62F2 - Primary
      blueLight: { h: 217, s: 89, l: 70 },  // Lighter blue
      blueVeryLight: { h: 217, s: 89, l: 85 }, // Very light blue
    };

    // Hexagon particles
    const hexagons: Array<{ x: number; y: number; size: number; opacity: number; speed: number }> = [];
    for (let i = 0; i < 15; i++) {
      hexagons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20 + Math.random() * 40,
        opacity: 0.1 + Math.random() * 0.2,
        speed: 0.2 + Math.random() * 0.5,
      });
    }

    // Dots/particles
    const particles: Array<{ x: number; y: number; size: number; opacity: number; speed: number }> = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1 + Math.random() * 3,
        opacity: 0.2 + Math.random() * 0.4,
        speed: 0.1 + Math.random() * 0.3,
      });
    }

    const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = `hsla(220, 15%, 80%, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawWaveform = (offset: number, amplitude: number, frequency: number, color: { h: number; s: number; l: number }, opacity: number) => {
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2 + Math.sin((x * frequency + offset) * 0.02) * amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity})`;
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    const drawSineWave = (offset: number, amplitude: number, color: { h: number; s: number; l: number }, opacity: number, layers: number = 3) => {
      for (let layer = 0; layer < layers; layer++) {
        ctx.beginPath();
        const layerAmplitude = amplitude * (1 - layer * 0.15);
        const layerOpacity = opacity * (1 - layer * 0.25);
        
        for (let x = 0; x < canvas.width; x += 1) {
          const y = canvas.height / 2 + Math.sin((x + offset * (1 + layer * 0.2)) * 0.01) * layerAmplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${layerOpacity})`;
        ctx.lineWidth = 4 - layer;
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw hexagons (geometric elements)
      hexagons.forEach((hex) => {
        drawHexagon(hex.x, hex.y, hex.size, hex.opacity);
        hex.y -= hex.speed;
        if (hex.y < -hex.size) {
          hex.y = canvas.height + hex.size;
          hex.x = Math.random() * canvas.width;
        }
      });

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(220, 15%, 90%, ${particle.opacity})`;
        ctx.fill();
        particle.y -= particle.speed;
        if (particle.y < -particle.size) {
          particle.y = canvas.height + particle.size;
          particle.x = Math.random() * canvas.width;
        }
      });

      // Draw waveform visualizations (like audio bars in center)
      const barCount = 50;
      const barWidth = canvas.width / barCount;
      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.abs(Math.sin(time * 0.05 + i * 0.3)) * 60 + 10;
        const x = i * barWidth + canvas.width / 2 - (barCount * barWidth) / 2;
        const y = canvas.height / 2 - barHeight / 2;
        
        // Gradient from dark blue to light blue
        let hue, sat, light;
        const progress = i / barCount;
        if (progress < 0.5) {
          hue = colors.blue.h;
          sat = colors.blue.s;
          light = colors.blue.l;
        } else {
          hue = colors.blueLight.h;
          sat = colors.blueLight.s;
          light = colors.blueLight.l + (progress - 0.5) * 30; // Fade to lighter
        }
        
        ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, 0.3)`;
        ctx.fillRect(x, y, barWidth - 2, barHeight);
      }

      // Draw layered sine waves with shades of blue
      drawSineWave(time * 2, 40, colors.blue, 0.4, 4);
      drawSineWave(-time * 1.5, 50, colors.blueLight, 0.35, 4);
      drawSineWave(time * 1.2, 45, colors.blueVeryLight, 0.3, 4);

      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
}

