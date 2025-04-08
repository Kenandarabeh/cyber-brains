import React from 'react';
import { Box, alpha } from '@mui/material';

interface GlowBackgroundProps {
  colors: {
    isDarkMode: boolean;
    primaryBlue: string;
    secondaryColor: string;
    bgPrimary: string;
  };
}

const GlowBackground: React.FC<GlowBackgroundProps> = ({ colors }) => {
  // استخدام اللون الفوشيا المطلوب بشكل محدد
  const spotlightColor = '#f600b9';
  
  return (
    <>
      {/* تأثير المصباح الرئيسي - مركز قوي من الأعلى */}
      <Box
        sx={{
          position: 'absolute',
          top: '-25%',
          left: '50%',
          width: '650px',
          height: '800px',
          transform: 'translateX(-50%) translateZ(0)',
          background: `conic-gradient(
            from 90deg at 50% 0%, 
            ${alpha(spotlightColor, 0.03)} 0deg,
            ${alpha(spotlightColor, 0.25)} 90deg,
            ${alpha(spotlightColor, 0.03)} 180deg,
            transparent 360deg
          )`,
          zIndex: 1,
          opacity: 0.9,
          mixBlendMode: colors.isDarkMode ? 'screen' : 'multiply',
          filter: 'blur(3px)',
          animation: 'pulseSpotlight 8s infinite alternate ease-in-out',
          '@keyframes pulseSpotlight': {
            '0%': { opacity: 0.8, filter: 'blur(3px)' },
            '50%': { opacity: 1, filter: 'blur(2px)' },
            '100%': { opacity: 0.8, filter: 'blur(3px)' }
          }
        }}
      />
      
      {/* مصباح ثانوي أقل حدة للعمق */}
      <Box
        sx={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          width: '500px',
          height: '600px',
          transform: 'translateX(-50%) translateZ(0)',
          background: `conic-gradient(
            from 90deg at 50% 0%, 
            ${alpha(spotlightColor, 0.01)} 0deg,
            ${alpha(spotlightColor, 0.15)} 90deg,
            ${alpha(spotlightColor, 0.01)} 180deg,
            transparent 360deg
          )`,
          zIndex: 1,
          opacity: 0.7,
          mixBlendMode: 'screen',
          filter: 'blur(8px)',
          animation: 'pulseSecondary 10s infinite alternate ease-in-out',
          '@keyframes pulseSecondary': {
            '0%': { opacity: 0.5, width: '500px' },
            '50%': { opacity: 0.7, width: '550px' },
            '100%': { opacity: 0.5, width: '500px' }
          }
        }}
      />

      {/* توهج دائري في منطقة الكرة الأرضية والكود */}
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          width: '550px',
          height: '550px',
          transform: 'translate(-50%, -15%)',
          background: `radial-gradient(circle, ${alpha(spotlightColor, 0.3)} 0%, ${alpha(spotlightColor, 0.05)} 40%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 0,
          opacity: 0.7,
          mixBlendMode: colors.isDarkMode ? 'screen' : 'color-dodge',
          animation: 'pulseGlow 5s infinite ease-in-out alternate',
          '@keyframes pulseGlow': {
            '0%': { opacity: 0.6, transform: 'translate(-50%, -15%) scale(0.95)' },
            '100%': { opacity: 0.8, transform: 'translate(-50%, -15%) scale(1.05)' }
          }
        }}
      />
      
      {/* تأثير خطوط ضوء جانبية - مثل أشعة ضوء خارجة من المصباح */}
      <Box
        sx={{
          position: 'absolute',
          top: '0%',
          left: '35%',
          width: '3px',
          height: '150px',
          background: `linear-gradient(to bottom, ${spotlightColor}80, transparent)`,
          transform: 'rotate(25deg)',
          opacity: 0.6,
          filter: 'blur(2px)',
          animation: 'flickerBeam 3s infinite alternate ease-in-out',
          '@keyframes flickerBeam': {
            '0%': { opacity: 0.3 },
            '50%': { opacity: 0.6 },
            '100%': { opacity: 0.3 }
          }
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '0%',
          left: '65%',
          width: '2px',
          height: '120px',
          background: `linear-gradient(to bottom, ${spotlightColor}80, transparent)`,
          transform: 'rotate(-25deg)',
          opacity: 0.5,
          filter: 'blur(2px)',
          animation: 'flickerBeam2 4s infinite alternate-reverse ease-in-out',
          '@keyframes flickerBeam2': {
            '0%': { opacity: 0.2 },
            '50%': { opacity: 0.5 },
            '100%': { opacity: 0.2 }
          }
        }}
      />
      
      {/* تأثير الضباب السفلي - تأثير ضبابي للتمتزج مع الخلفية */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-5%',
          left: '45%',
          width: '550px',
          height: '300px',
          transform: 'translateX(-50%)',
          background: `radial-gradient(ellipse at center, ${alpha(spotlightColor, 0.2)} 0%, transparent 70%)`,
          filter: 'blur(50px)',
          zIndex: 0,
          mixBlendMode: 'overlay',
          opacity: 0.6
        }}
      />
      
      {/* نقاط ضوء صغيرة متلألئة - تعزز الشعور بالعمق */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            borderRadius: '50%',
            backgroundColor: spotlightColor,
            opacity: Math.random() * 0.5 + 0.3,
            filter: 'blur(1px)',
            animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate ease-in-out`,
            '@keyframes twinkle': {
              '0%': { opacity: 0.2, transform: 'scale(0.8)' },
              '100%': { opacity: 0.7, transform: 'scale(1.2)' }
            }
          }}
        />
      ))}

      {/* غشاوة ضوئية خفيفة في الأعلى */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: `linear-gradient(to bottom, ${alpha(spotlightColor, 0.05)} 0%, transparent 100%)`,
          zIndex: 0,
          opacity: 0.7,
        }}
      />
    </>
  );
};

export default GlowBackground;
