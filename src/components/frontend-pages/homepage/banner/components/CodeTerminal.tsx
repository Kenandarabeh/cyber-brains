import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, alpha } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import { IconTerminal2 } from '@tabler/icons-react';

interface CodeTerminalProps {
  title: string;
  content: string;
  delay: number;
  colors: any;
  isRtl: boolean;
  codeText?: string; // إضافة خاصية جديدة لتمرير النص المخصص
  footer?: string; // إضافة خاصية للمحتوى الإضافي
}

const CodeTerminal: React.FC<CodeTerminalProps> = ({ title, content, delay, colors, isRtl, codeText, footer }) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(terminalRef, { once: true, threshold: 0.3 });
  const controls = useAnimation();
  const [showContent, setShowContent] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [showReady, setShowReady] = useState(false);
  
  // استخدام النص المخصص إذا كان موجودًا، وإلا استخدام النص المعطى من content
  const displayContent = codeText || content;
  
  // Initialize animation when terminal comes into view
  useEffect(() => {
    if (inView) {
      // Start animation sequence
      controls.start({ 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, delay: delay } 
      });
      
      // Simple loading/typing simulation with timeouts
      const loadingTimeout = setTimeout(() => {
        setShowContent(true); // Show content immediately after delay
        
        // After content is shown, hide cursor and show "Ready" message
        const cursorTimeout = setTimeout(() => {
          setShowCursor(false);
          setShowReady(true);
        }, 2000);
        
        return () => clearTimeout(cursorTimeout);
      }, delay * 1000 + 500); // Added small offset for smooth entry
      
      return () => clearTimeout(loadingTimeout);
    }
  }, [inView, delay, controls, displayContent]);
  
  return (
    <Box
      ref={terminalRef}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      sx={{
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
        lineHeight: 1.6,
        backgroundColor: colors.bgSecondary,
        border: `1px solid ${colors.borderColor}`,
        boxShadow: `0 8px 30px ${alpha('#000', colors.isDarkMode ? 0.5 : 0.2)}`,
        direction: 'ltr', // Always LTR for code
        transform: isRtl ? 'rotateY(0deg)' : 'rotateY(0deg)',
        transformStyle: 'preserve-3d',
        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 12px 40px ${alpha('#000', colors.isDarkMode ? 0.6 : 0.25)}`,
        },
        position: 'relative',
        zIndex: 1,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          background: `linear-gradient(45deg, ${colors.primaryBlue}40, transparent, ${colors.secondaryColor}40)`,
          borderRadius: '10px',
          zIndex: -1,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover::before': {
          opacity: 1,
        },
      }}
    >
      {/* Terminal header */}
      <Box sx={{ 
        backgroundColor: colors.isDarkMode ? '#0d1117' : '#f1f1f1',
        borderBottom: `1px solid ${colors.borderColor}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        py: 1.2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              backgroundColor: '#ff5f56',
              border: '1px solid rgba(0,0,0,0.1)',
            }} />
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              backgroundColor: '#ffbd2e',
              mx: 0.8,
              border: '1px solid rgba(0,0,0,0.1)',
            }} />
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              backgroundColor: '#27c93f',
              border: '1px solid rgba(0,0,0,0.1)',
            }} />
          </Box>
          <IconTerminal2 
            size={16} 
            style={{ 
              color: colors.isDarkMode ? '#8b949e' : '#57606a',
              opacity: 0.8,
            }}
          />
        </Box>
        
        <Typography 
          variant="caption" 
          sx={{ 
            color: colors.textSecondary,
            fontSize: '0.75rem',
            fontWeight: 500,
            userSelect: 'none',
          }}
        >
          {title}
        </Typography>
        
        <Box sx={{ width: 42 }} />
      </Box>
      
      {/* Terminal content */}
      <Box
        sx={{
          backgroundColor: colors.isDarkMode ? '#0d1117' : '#ffffff',
          p: 2,
          minHeight: '240px',
          maxHeight: '240px',
          overflowX: 'auto',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'inherit',
          lineHeight: 'inherit',
          position: 'relative',
        }}
      >
        {/* Main content that appears after delay */}
        {showContent && (
          <Box component={motion.div} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <pre 
              style={{ 
                margin: 0, 
                padding: 0, 
                fontFamily: 'inherit',
                fontSize: 'inherit',
                lineHeight: 'inherit'
              }} 
              dangerouslySetInnerHTML={{ __html: displayContent }}
            />

            {/* إضافة المحتوى الإضافي بعد المحتوى الرئيسي */}
            {footer && (
              <Box 
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                dangerouslySetInnerHTML={{ __html: footer }}
              />
            )}
          </Box>
        )}
        
        {/* Blinking cursor - shows at beginning, then disappears */}
        {showCursor && (
          <Box
            component={motion.span}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
            sx={{
              display: 'inline-block',
              width: '0.6em',
              height: '1.2em',
              backgroundColor: colors.isDarkMode ? '#c9d1d9' : '#24292f',
              verticalAlign: 'bottom',
              ml: '2px',
            }}
          />
        )}
        
        {/* Ready message that appears at the end */}
        {showReady && (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
              position: 'absolute',
              right: '8px',
              bottom: '8px',
              color: colors.primaryBlue,
              fontWeight: 500,
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(CodeTerminal);
