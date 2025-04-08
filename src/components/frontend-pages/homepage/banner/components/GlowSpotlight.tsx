import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface GlowSpotlightProps {
  colors: {
    isDarkMode: boolean;
    primaryBlue: string;
    secondaryColor: string;
  };
}

const GlowSpotlight: React.FC<GlowSpotlightProps> = ({ colors }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const spotlightColor = '#f600b9'; // الألوان الأساسية التي سنستخدمها
  const isDarkMode = colors.isDarkMode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // تعيين حجم الـ canvas لملء الشاشة
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // إنشاء تدرج نصف دائري للإضاءة من الأعلى
    const createSpotlightGradient = () => {
      // المصباح الرئيسي - إضاءة قوية من الأعلى
      ctx.save();
      const mainSpotX = canvas.width * 0.5;
      const mainSpotY = -50; // فوق الصفحة
      const mainSpotRadius = Math.max(canvas.width, canvas.height) * 0.7;
      
      // تدرج دائري للمصباح الرئيسي
      const mainGradient = ctx.createRadialGradient(
        mainSpotX, mainSpotY, 0,
        mainSpotX, mainSpotY, mainSpotRadius
      );
      
      // استخدام الألوان الرئيسية بشفافية متفاوتة
      mainGradient.addColorStop(0, `rgba(246, 0, 185, ${isDarkMode ? 0.35 : 0.2})`);
      mainGradient.addColorStop(0.4, `rgba(246, 0, 185, ${isDarkMode ? 0.15 : 0.07})`);
      mainGradient.addColorStop(0.7, `rgba(246, 0, 185, ${isDarkMode ? 0.05 : 0.02})`);
      mainGradient.addColorStop(1, 'rgba(246, 0, 185, 0)');
      
      ctx.fillStyle = mainGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      
      // مصباح ثانوي - منطقة مضيئة للعناصر الرئيسية
      ctx.save();
      const secondSpotX = canvas.width * 0.5;
      const secondSpotY = canvas.height * 0.3; // في وسط الصفحة تقريبًا
      const secondSpotRadius = Math.min(canvas.width, canvas.height) * 0.6;
      
      const secondGradient = ctx.createRadialGradient(
        secondSpotX, secondSpotY, 0,
        secondSpotX, secondSpotY, secondSpotRadius
      );
      
      secondGradient.addColorStop(0, `rgba(246, 0, 185, ${isDarkMode ? 0.3 : 0.15})`);
      secondGradient.addColorStop(0.3, `rgba(246, 0, 185, ${isDarkMode ? 0.1 : 0.05})`);
      secondGradient.addColorStop(0.7, `rgba(246, 0, 185, ${isDarkMode ? 0.03 : 0.01})`);
      secondGradient.addColorStop(1, 'rgba(246, 0, 185, 0)');
      
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = secondGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      
      // إضافة بعض خطوط الضوء للتأثير
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      
      // شعاع ضوء 1
      const beam1 = ctx.createLinearGradient(
        mainSpotX - 50, 0, 
        mainSpotX - 50, canvas.height * 0.6
      );
      beam1.addColorStop(0, `rgba(246, 0, 185, ${isDarkMode ? 0.5 : 0.3})`);
      beam1.addColorStop(1, 'rgba(246, 0, 185, 0)');
      
      ctx.beginPath();
      ctx.moveTo(mainSpotX - 100, 0);
      ctx.lineTo(mainSpotX, 0);
      ctx.lineTo(mainSpotX - 200, canvas.height * 0.6);
      ctx.lineTo(mainSpotX - 300, canvas.height * 0.6);
      ctx.closePath();
      ctx.fillStyle = beam1;
      ctx.fill();
      
      // شعاع ضوء 2
      const beam2 = ctx.createLinearGradient(
        mainSpotX + 50, 0, 
        mainSpotX + 50, canvas.height * 0.6
      );
      beam2.addColorStop(0, `rgba(246, 0, 185, ${isDarkMode ? 0.5 : 0.3})`);
      beam2.addColorStop(1, 'rgba(246, 0, 185, 0)');
      
      ctx.beginPath();
      ctx.moveTo(mainSpotX + 100, 0);
      ctx.lineTo(mainSpotX, 0);
      ctx.lineTo(mainSpotX + 200, canvas.height * 0.6);
      ctx.lineTo(mainSpotX + 300, canvas.height * 0.6);
      ctx.closePath();
      ctx.fillStyle = beam2;
      ctx.fill();
      
      ctx.restore();
      
      // إضافة نقاط ضوء متطايرة
      const particleCount = isDarkMode ? 30 : 15;
      for (let i = 0; i < particleCount; i++) {
        // حساب موقع النقطة ضمن مخروط الضوء
        const t = Math.random();
        const angle = ((Math.random() * 0.5) - 0.25) * Math.PI;
        const radius = Math.random() * secondSpotRadius * 0.8;
        
        const particleX = mainSpotX + Math.sin(angle) * radius;
        const particleY = mainSpotY + t * canvas.height * 0.8;
        const size = Math.random() * 3 + 1;
        
        // رسم النقطة الضوئية
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        const particleGradient = ctx.createRadialGradient(
          particleX, particleY, 0,
          particleX, particleY, size * 2
        );
        
        particleGradient.addColorStop(0, `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`);
        particleGradient.addColorStop(0.5, `rgba(246, 0, 185, ${Math.random() * 0.5 + 0.1})`);
        particleGradient.addColorStop(1, 'rgba(246, 0, 185, 0)');
        
        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(particleX, particleY, size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    // المتغيرات الزمنية للحركة والنبض
    let time = 0;
    let pulseTime = 0;

    // حلقة الرسم الرئيسية
    const animate = () => {
      time += 0.01;
      pulseTime += 0.02;
      
      // مسح الكانفاس قبل الرسم من جديد
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // إضافة نبضة للإضاءة
      const pulseFactor = (Math.sin(pulseTime) * 0.2 + 1);
      ctx.globalAlpha = 0.85 + Math.sin(pulseTime * 0.5) * 0.15;
      
      // رسم المصباح
      createSpotlightGradient();
      
      // استمرار الحلقة
      requestRef.current = requestAnimationFrame(animate);
    };
    
    // بدء حلقة الرسم
    requestRef.current = requestAnimationFrame(animate);
    
    // التنظيف عند تفكيك المكوّن
    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [colors, isDarkMode]);
  
  return (
    <Box sx={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none', // لتجنب مشاكل التفاعل
    }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isDarkMode ? 1 : 0.85,
          mixBlendMode: isDarkMode ? 'screen' : 'multiply',
        }}
      />
    </Box>
  );
};

export default GlowSpotlight;
