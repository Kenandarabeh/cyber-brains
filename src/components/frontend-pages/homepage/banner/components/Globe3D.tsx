import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface Globe3DProps {
  colors: {
    isDarkMode: boolean;
    bgPrimary: string;
  };
}

const Globe3D: React.FC<Globe3DProps> = ({ colors }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDarkMode = colors.isDarkMode;
  const requestRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Make the canvas responsive
    const updateCanvasSize = () => {
      if (!containerRef.current) return;
      const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
      canvas.width = containerWidth;
      canvas.height = containerHeight;
    };
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    // Points on the globe
    const points = [];
    for (let i = 0; i < 800; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
      });
    }
    
    // Add connections between some points
    const connections = [];
    for (let i = 0; i < 200; i++) {
      const p1 = Math.floor(Math.random() * points.length);
      const p2 = Math.floor(Math.random() * points.length);
      
      const dist = Math.sqrt(
        Math.pow(points[p1].x - points[p2].x, 2) +
        Math.pow(points[p1].y - points[p2].y, 2) +
        Math.pow(points[p1].z - points[p2].z, 2)
      );
      
      if (dist < radius * 0.8) {
        connections.push([p1, p2]);
      }
    }
    
    // Add highlight points that glow more intensely
    const highlightPoints = [];
    for (let i = 0; i < 15; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      highlightPoints.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        r: Math.random() * 3 + 2,
        intensity: Math.random() * 0.5 + 0.5,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }
    
    let rotation = 0;
    let rotationSpeed = 0.001;
    let mouseX = 0, mouseY = 0;
    let targetRotationX = 0, targetRotationY = 0;
    let currentRotationX = 0, currentRotationY = 0;
    
    // Add mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      targetRotationX = mouseY * 0.5;
      targetRotationY = mouseX * 0.5;
    };
    
    const handleMouseLeave = () => {
      targetRotationX = 0;
      targetRotationY = 0;
    };
    
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    // Handle touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length < 1) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = (e.touches[0].clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseY = (e.touches[0].clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      targetRotationX = mouseY * 0.5;
      targetRotationY = mouseX * 0.5;
      
      // Prevent scrolling while interacting with the globe
      e.preventDefault();
    };
    
    containerRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    let time = 0;
    
    function animate() {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;
      
      // Smooth interpolation of rotation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      
      // Auto rotation plus user interaction
      rotation += rotationSpeed;
      
      // Apply the rotations to create a complete transformation matrix
      function transformPoint(point: any) {
        // First rotate around Y axis (auto rotation)
        let x = point.x * Math.cos(rotation) - point.z * Math.sin(rotation);
        let z = point.z * Math.cos(rotation) + point.x * Math.sin(rotation);
        
        // Then apply user interaction rotations
        // Rotate around X axis (up/down tilt)
        let y = point.y * Math.cos(currentRotationX) - z * Math.sin(currentRotationX);
        z = z * Math.cos(currentRotationX) + point.y * Math.sin(currentRotationX);
        
        // Rotate around Y axis (left/right pan)
        x = x * Math.cos(currentRotationY) - z * Math.sin(currentRotationY);
        z = z * Math.cos(currentRotationY) + x * Math.sin(currentRotationY);
        
        return { x, y, z };
      }
      
      // Sort points by z-index for proper rendering
      const sortedPoints = [...points].map(p => {
        const transformed = transformPoint(p);
        return {
          ...p,
          x: transformed.x,
          y: transformed.y,
          z: transformed.z
        };
      }).sort((a, b) => a.z - b.z);
      
      // Draw connections
      ctx.beginPath();
      for (const [i, j] of connections) {
        const p1 = sortedPoints[i];
        const p2 = sortedPoints[j];
        
        // Skip if either point is behind the globe
        if (p1.z < 0 || p2.z < 0) continue;
        
        const alpha = Math.min(((p1.z + p2.z) / (2 * radius) + 1) / 2, 0.8);
        ctx.strokeStyle = isDarkMode 
          ? `rgba(88, 166, 255, ${alpha * 0.4})` 
          : `rgba(9, 105, 218, ${alpha * 0.25})`;
        ctx.lineWidth = 0.5;
        
        ctx.moveTo(centerX + p1.x, centerY + p1.y);
        ctx.lineTo(centerX + p2.x, centerY + p2.y);
      }
      ctx.stroke();
      
      // Draw highlight points with glow
      highlightPoints.forEach(point => {
        const transformed = transformPoint(point);
        if (transformed.z < 0) return; // Skip if behind globe
        
        // Create pulsing effect
        const pulse = 0.7 + Math.sin(time * point.pulseSpeed * Math.PI * 2) * 0.3;
        const size = point.r * pulse;
        
        const alpha = (transformed.z / radius + 1) / 2 * point.intensity;
        const gradient = ctx.createRadialGradient(
          centerX + transformed.x, centerY + transformed.y, 0,
          centerX + transformed.x, centerY + transformed.y, size * 3
        );
        
        const color = isDarkMode ? '88, 166, 255' : '9, 105, 218';
        gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        
        // Draw glow
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(centerX + transformed.x, centerY + transformed.y, size * 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw point
        ctx.beginPath();
        ctx.fillStyle = isDarkMode 
          ? `rgba(88, 166, 255, ${alpha * 0.9})` 
          : `rgba(9, 105, 218, ${alpha * 0.8})`;
        ctx.arc(centerX + transformed.x, centerY + transformed.y, size, 0, 2 * Math.PI);
        ctx.fill();
      });
      
      // Draw regular points
      sortedPoints.forEach(point => {
        if (point.z < 0) return; // Skip points behind the globe
        
        const alpha = (point.z / radius + 1) / 2 * 0.9;
        ctx.fillStyle = isDarkMode 
          ? `rgba(88, 166, 255, ${alpha * 0.75})` 
          : `rgba(9, 105, 218, ${alpha * 0.65})`;
        
        ctx.beginPath();
        ctx.arc(centerX + point.x, centerY + point.y, point.r * alpha, 0, 2 * Math.PI);
        ctx.fill();
      });
      
      requestRef.current = requestAnimationFrame(animate);
    }
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
        containerRef.current.removeEventListener('touchmove', handleTouchMove);
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [colors.isDarkMode]);
  
  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: '340px',
        opacity: 0.95,
        cursor: 'move',
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{
          filter: 'blur(0.5px)',
          width: '100%',
          height: '100%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at center, transparent 60%, ${colors.bgPrimary} 100%)`,
          zIndex: 2,
        }}
      />
    </Box>
  );
};

export default Globe3D;
