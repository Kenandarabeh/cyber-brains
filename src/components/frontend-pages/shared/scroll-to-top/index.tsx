import { useEffect, useState } from 'react';
import { IconArrowUp } from '@tabler/icons-react';
import { Box, useTheme, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const isDarkMode = customizer.activeMode === 'dark';

  // GitHub-styled colors matching Banner and Footer
  const colors = {
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    text: isDarkMode ? '#e6edf3' : '#24292f',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    hoverBg: isDarkMode ? '#30363d' : '#f3f4f6',
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Toggle visibility on scroll
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            zIndex: 1000,
          }}
        >
          <Box
            onClick={scrollToTop}
            component="button"
            aria-label="Scroll to top"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '6px',
              cursor: 'pointer',
              border: `1px solid ${colors.borderColor}`,
              backgroundColor: colors.bgPrimary,
              color: colors.text,
              boxShadow: `0 3px 12px ${alpha('#000000', isDarkMode ? 0.2 : 0.1)}`,
              transition: 'all 0.3s ease',
              outline: 'none',
              padding: 0,
              '&:hover': {
                transform: 'translateY(-3px)',
                backgroundColor: colors.hoverBg,
                borderColor: isDarkMode ? '#8b949e' : '#afb8c1',
                boxShadow: `0 6px 16px ${alpha('#000000', isDarkMode ? 0.3 : 0.15)}`,
                color: colors.primaryBlue,
              },
              '&:active': {
                transform: 'translateY(-1px)',
              },
            }}
          >
            <IconArrowUp 
              size={20} 
              stroke={1.5}
              style={{ 
                transition: 'transform 0.3s ease',
              }} 
            />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
