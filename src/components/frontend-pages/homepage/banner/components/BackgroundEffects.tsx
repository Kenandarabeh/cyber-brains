import React from 'react';
import { Box, alpha, keyframes } from '@mui/material';

interface BackgroundEffectsProps {
  colors: {
    isDarkMode: boolean;
    secondaryColor: string;
    gridLines?: string;
    primaryBlue?: string;
    merged?: string;
  };
  isRtl?: boolean;
}

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 0.85; }
  100% { transform: scale(1); opacity: 0.7; }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const shimmer = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 0.8; }
  100% { opacity: 0.5; }
`;

const drift = keyframes`
  0% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(-10px) translateY(10px); }
  100% { transform: translateX(0) translateY(0); }
`;

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ colors, isRtl = false }) => {
  const isDarkMode = colors.isDarkMode;
  const pinkColor = '#f600b9'; // استخدام اللون الوردي الثابت بدلاً من colors.secondaryColor
  
  return (
    <>
      {/* شبكة خلفية بنمط GitHub */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(${colors.gridLines || 'rgba(48, 54, 61, 0.3)'} 1px, transparent 1px), 
                           linear-gradient(90deg, ${colors.gridLines || 'rgba(48, 54, 61, 0.3)'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          opacity: 0.2,
          zIndex: 0
        }}
      />
      
      {/* أشكال متدرجة للاهتمام البصري */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          [isRtl ? 'left' : 'right']: '15%',
          width: { xs: '200px', sm: '300px', md: '400px' },
          height: { xs: '200px', sm: '300px', md: '400px' },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(colors.primaryBlue, 0.08)} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          [isRtl ? 'right' : 'left']: '8%',
          width: { xs: '180px', sm: '250px', md: '350px' },
          height: { xs: '180px', sm: '250px', md: '350px' },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(colors.secondaryColor, 0.06)} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />

      {/* شكل متدرج إضافي للتعزيز البصري */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          [isRtl ? 'left' : 'right']: '25%',
          width: { xs: '150px', sm: '200px' },
          height: { xs: '150px', sm: '200px' },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(colors.merged || colors.primaryBlue, 0.05)} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      
      {/* توهج دائري علوي */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '10%',
          width: '35%',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(pinkColor, isDarkMode ? 0.16 : 0.08)} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: isDarkMode ? 0.7 : 0.5,
          animation: `${pulse} 8s infinite ease-in-out`,
        }}
      />
      
      {/* توهج دائري في المنتصف */}
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '5%',
          width: '25%',
          height: '350px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(pinkColor, isDarkMode ? 0.14 : 0.07)} 0%, transparent 70%)`,
          filter: 'blur(70px)',
          opacity: isDarkMode ? 0.6 : 0.4,
          animation: `${float} 12s infinite ease-in-out`,
        }}
      />
      
      {/* توهج مستطيل للجانب */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '15%',
          width: '40%',
          height: '200px',
          background: `radial-gradient(ellipse, ${alpha(pinkColor, isDarkMode ? 0.1 : 0.05)} 0%, transparent 80%)`,
          filter: 'blur(80px)',
          transform: 'rotate(-15deg)',
          opacity: isDarkMode ? 0.5 : 0.3,
          animation: `${drift} 15s infinite ease-in-out alternate`,
        }}
      />

      {/* شريط ضوئي رفيع */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '20%',
          width: '1px',
          height: '150px',
          background: `linear-gradient(to bottom, ${alpha(pinkColor, 0.7)}, transparent)`,
          filter: 'blur(1px)',
          opacity: isDarkMode ? 0.5 : 0.3,
          animation: `${shimmer} 4s infinite ease-in-out`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-15px',
            width: '30px',
            height: '1px',
            background: `linear-gradient(to right, transparent, ${alpha(pinkColor, 0.7)}, transparent)`,
            filter: 'blur(2px)',
          }
        }}
      />
      
      {/* نقاط ضوئية صغيرة متفرقة */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            borderRadius: '50%',
            backgroundColor: pinkColor,
            opacity: Math.random() * 0.4 + 0.1,
            filter: 'blur(2px)',
            animation: `${shimmer} ${Math.random() * 3 + 3}s infinite ease-in-out alternate`,
          }}
        />
      ))}
      
      {/* زخرفة نيون خطية خفية */}
      <Box
        sx={{
          position: 'absolute',
          top: '70%',
          left: '50%',
          width: '180px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${alpha(pinkColor, isDarkMode ? 0.4 : 0.2)}, transparent)`,
          opacity: 0.5,
          filter: 'blur(1px)',
          transform: 'translateX(-50%)',
        }}
      />
      
      {/* توهج بقعي للزاوية */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          background: `radial-gradient(ellipse, ${alpha(pinkColor, isDarkMode ? 0.08 : 0.04)} 0%, transparent 70%)`,
          filter: 'blur(50px)',
          opacity: isDarkMode ? 0.6 : 0.4,
          animation: `${drift} 10s infinite ease-in-out alternate-reverse`,
          transform: 'rotate(30deg)',
        }}
      />
    </>
  );
};

export default BackgroundEffects;
