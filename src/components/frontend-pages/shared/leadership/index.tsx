import React from 'react';
import { Box, Grid, Typography, Container, Stack, useTheme, Paper, alpha } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import LeadershipCard from './LeadershipCard';
import LeadershipCarousel from './LeadershipCarousel';
import RTLFix from './RTLFix';
import { IconUsers, IconCode } from '@tabler/icons-react';

import leader1Image from 'src/assets/images/gallery/image3.jpg';
import leader2Image from 'src/assets/images/gallery/image1.jpg';
import leader3Image from 'src/assets/images/gallery/image2.jpg';
import leader4Image from 'src/assets/images/gallery/image_alumni1.jpg';
import defaultLeaderImage from 'src/assets/images/gallery/image 2.png';

const Leadership = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const customizer = useSelector((state: any) => state.customizer);
  const isDarkMode = customizer.activeMode === 'dark';

  // GitHub-styled colors - updated with dark blue like Footer
  const colors = {
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff', // زرقاء داكنة قليلاً مثل الـ Footer
    bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
    primaryGreen: isDarkMode ? '#2ea043' : '#2da44e',
    gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
  };

  React.useEffect(() => {
    // тут будем хранить основные цвета для использования в стилях точек
    document.documentElement.style.setProperty(
      '--primary-color',
      colors.primaryBlue
    );
    
    // перезагружаем при изменении темы
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 800);
    
    return () => clearTimeout(timer);
  }, [customizer.activeMode, theme.palette.primary]);

  const translatedLeaders = t('leadershipCarousel.leaders', { returnObjects: true }) || [];
  
  const leaderImages = [
    leader1Image,
    leader2Image || defaultLeaderImage,
    leader3Image || defaultLeaderImage,
    leader4Image || defaultLeaderImage
  ];
  
  const leaders = translatedLeaders.map((leader: any, idx: number) => ({
    ...leader,
    image: leaderImages[idx % leaderImages.length],
    social: {
      linkedin: 'https://linkedin.com/in/sarah',
      instagram: 'https://instagram.com/sarah',
      youtube: idx % 2 === 0 ? 'https://youtube.com/@sarah' : undefined
    }
  }));
  
  const useCarousel = leaders.length > 3;

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 8, lg: 12 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.bgPrimary,
        overflow: 'hidden',
        pb: { xs: 12, md: 16 },
        borderBottom: `1px solid ${colors.borderColor}`,
      }}
    >
      {/* نمط الشبكة بتصميم متطابق مع التذييل */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(${colors.gridLines} 1px, transparent 1px), 
                           linear-gradient(90deg, ${colors.gridLines} 1px, transparent 1px)`,
          backgroundSize: '50px 50px', // نفس الحجم المستخدم في التذييل
          opacity: 0.4, // نفس مستوى الشفافية المستخدم في التذييل
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      
      {/* تأثير ضبابي في زوايا الشبكة متطابق مع التذييل */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          left: -100,
          right: -100,
          bottom: -100,
          background: `radial-gradient(
            circle at 50% 50%, 
            transparent 20%, 
            ${colors.bgPrimary}
          )`,
          opacity: 0.8,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <RTLFix />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* GitHub-style section heading badge */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ 
            width: '100%',
            display: 'flex', 
            justifyContent: 'center', 
            mb: 4
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              bgcolor: alpha(colors.primaryBlue, isDarkMode ? 0.15 : 0.08),
              color: colors.primaryBlue,
              py: 0.8,
              px: 2.5,
              borderRadius: '2rem',
              border: `1px solid ${alpha(colors.primaryBlue, isDarkMode ? 0.3 : 0.15)}`,
              boxShadow: `0 4px 20px ${alpha(colors.primaryBlue, isDarkMode ? 0.25 : 0.1)}`,
            }}
          >
            <IconUsers size={18} style={{ marginRight: '8px', opacity: 0.9 }} />
            <Typography
              variant="body2"
              sx={{ 
                fontWeight: 600,
                fontSize: '0.95rem',
              }}
            >
              {t('leadership.badgeText', {defaultValue: "Cyber Brains Team"})}
            </Typography>
          </Box>
        </Box>

        <Stack
          spacing={2}
          alignItems="center"
          mb={6}
          sx={{
            textAlign: 'center',
            width: '100%',
            zIndex: 10
          }}
        >
          {/* Main title with GitHub style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 800,
                color: colors.text,
                mb: 2,
                letterSpacing: '-0.025em',
                textShadow: isDarkMode ? '0 2px 10px rgba(0,0,0,0.5)' : 'none', // Add shadow for better visibility on dark
              }}
            >
              {t('leadership.title')}
            </Typography>
            
            {/* Gradient subtitle - GitHub style */}
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                fontWeight: 700,
                mb: 3,
                background: `linear-gradient(135deg, ${colors.primaryBlue}, ${colors.secondaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
              }}
            >
              {t('leadership.subtitle')}
            </Typography>
            
            {/* Description text with GitHub styling */}
            <Typography 
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6,
                maxWidth: '750px',
                mx: 'auto',
                color: colors.textSecondary,
                mb: 3,
              }}
            >
              {t('leadership.description', {defaultValue: "Our team of technology experts and innovators leads Cyber Brains towards excellence in computer science, artificial intelligence, and digital innovation."})}
            </Typography>
          </motion.div>
        </Stack>

        {/* Leadership cards section */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          sx={{ 
            '& a': { textDecoration: 'none' },
            mb: { xs: 4, md: 2 },
            '& .slick-slider': { direction: 'ltr' },
            '& .slick-track': { direction: 'ltr' },
            zIndex: 5,
            position: 'relative',
          }}
        >
          {useCarousel ? (
            <LeadershipCarousel />
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {leaders.map((leader: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={leader.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box 
                      component="a" 
                      href={`/leader/${leader.id}`}
                      sx={{ 
                        textDecoration: 'none',
                        display: 'block',
                        height: '100%'
                      }}
                    >
                      <LeadershipCard {...leader} />
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        
        {/* Bottom code icon decoration - GitHub style */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          sx={{
            position: 'absolute',
            bottom: '-60px',
            right: { xs: '-30px', md: '50px' },
            opacity: 0.1,
            zIndex: 0,
            color: colors.textSecondary,
            transform: 'rotate(10deg)',
            display: { xs: 'none', md: 'block' }
          }}
        >
          <IconCode size={260} />
        </Box>
      </Container>
    </Box>
  );
};

export default Leadership;