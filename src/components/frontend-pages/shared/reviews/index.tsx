import React from 'react';
import { Box, Container, Typography, alpha, useTheme, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import ReviewCarousel from './ReviewCarousel';
import { IconMessageCircle2 } from '@tabler/icons-react';

const Reviews = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const isDarkMode = customizer.activeMode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // GitHub-styled colors
  const colors = {
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
    bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
    gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
  };

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 4, sm: 6, lg: 10 },
        bgcolor: colors.bgPrimary,
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: colors.borderColor,
        overflow: 'hidden'
      }}
      id="testimonials"
    >
      {/* Background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          [isRtl ? 'left' : 'right']: '10%',
          width: { xs: '200px', sm: '300px' },
          height: { xs: '200px', sm: '300px' },
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
          width: { xs: '180px', sm: '250px' },
          height: { xs: '180px', sm: '250px' },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(colors.secondaryColor, 0.06)} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      
      {/* GitHub-style grid background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(${colors.gridLines} 1px, transparent 1px), 
                         linear-gradient(90deg, ${colors.gridLines} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          opacity: 0.2,
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            px: { xs: 1, sm: 2, md: 4 }
          }}
        >
          {/* Section header with GitHub styling */}
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ 
              mb: { xs: 3, sm: 5 }, 
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center'
            }}
          >
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2
            }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  bgcolor: alpha(colors.primaryBlue, isDarkMode ? 0.15 : 0.08),
                  color: colors.primaryBlue,
                  py: { xs: 0.6, sm: 0.8 },
                  px: { xs: 1.8, sm: 2.5 },
                  borderRadius: '2rem',
                  border: `1px solid ${alpha(colors.primaryBlue, isDarkMode ? 0.3 : 0.15)}`,
                  boxShadow: `0 4px 20px ${alpha(colors.primaryBlue, isDarkMode ? 0.25 : 0.1)}`,
                }}
              >
                <IconMessageCircle2 
                  size={isMobile ? 16 : 18} 
                  style={{ 
                    marginRight: isRtl ? 0 : '8px',
                    marginLeft: isRtl ? '8px' : 0, 
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  }}
                >
                  {t('reviews.subtitle')}
                </Typography>
              </Box>
            </Box>
            
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' },
                mb: { xs: 2, sm: 3 },
                color: colors.text,
                background: `linear-gradient(135deg, ${colors.primaryBlue}, ${colors.secondaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('reviews.title')}
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: colors.textSecondary,
                fontSize: { xs: '0.95rem', sm: '1.1rem' },
                mb: { xs: 3, sm: 5 },
                maxWidth: '700px',
                mx: 'auto',
              }}
            >
              {t('reviews.description')}
            </Typography>
          </Box>
          
          <ReviewCarousel />
          
          {/* زر عرض الكل تم حذفه حسب الطلب */}
        </Box>
      </Container>
    </Box>
  );
};

export default Reviews;
