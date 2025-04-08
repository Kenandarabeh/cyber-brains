import React from 'react';
import { Box, Container, Typography, useTheme, useMediaQuery, alpha } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { IconArrowRight, IconArrowLeft, IconBuildingCommunity } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import SupervisorCard from './SupervisorCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './supervisors-carousel.css';

// Import local images
import supervisor1Image from 'src/assets/images/gallery/image1.jpg';
import supervisor2Image from 'src/assets/images/gallery/image2.jpg';
import supervisor3Image from 'src/assets/images/gallery/image3.jpg';
import defaultImage from 'src/assets/images/gallery/image 2.png';

interface SupervisorData {
  id: number;
  name: string;
  role: string;
  department: string;
  bio: string;
  image?: string;
}

interface ArrowProps {
  direction: 'next' | 'prev';
  onClick?: () => void;
}

function SampleArrow({ direction, onClick }: ArrowProps) {
  const theme = useTheme();
  const Icon = direction === 'next' ? IconArrowRight : IconArrowLeft;
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const customizer = useSelector((state: any) => state.customizer);
  const isDarkMode = customizer.activeMode === 'dark';
  
  // GitHub-styled colors
  const colors = {
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff', // زرقاء داكنة قليلاً مثل الـ Footer
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
  };

  return (
    <Box
      onClick={onClick}
      aria-label={direction === 'next' ? 'Next slide' : 'Previous slide'}
      sx={{
        position: 'absolute',
        top: '40%',
        transform: 'translateY(-50%)',
        [direction === 'next' ? 'right' : 'left']: { xs: '10px', sm: '0px', md: '-40px' },
        zIndex: 1000,
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
        width: 46,
        height: 46,
        bgcolor: colors.bgPrimary,
        color: colors.primaryBlue,
        borderRadius: '50%',
        border: `2px solid ${colors.primaryBlue}`,
        boxShadow: isDarkMode 
          ? `0 4px 14px rgba(0,0,0,0.25)` 
          : `0 4px 14px rgba(0,0,0,0.15)`,
        cursor: 'pointer',
        '&:hover': {
          bgcolor: colors.primaryBlue,
          '& svg': {
            color: 'white'
          }
        }
      }}
    >
      <Icon size={22} color="inherit" />
    </Box>
  );
}

const Supervisors = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const customizer = useSelector((state: any) => state.customizer);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = customizer.activeMode === 'dark';
  
  // GitHub-styled colors
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
  
  const sliderRef = React.useRef<Slider | null>(null);

  // Set CSS root variables for carousel styling
  React.useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', colors.primaryBlue);
    document.documentElement.style.setProperty('--dot-color', colors.textSecondary);
  }, [isDarkMode]);

  React.useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        const slider = sliderRef.current as any;
        if (slider && slider.innerSlider && slider.innerSlider.onWindowResized) {
          slider.innerSlider.onWindowResized();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (sliderRef.current) {
        const slider = sliderRef.current as any;
        if (slider && slider.slickGoTo) {
          slider.slickGoTo(0);
        }
      }
      window.dispatchEvent(new Event('resize'));
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const supervisorImages = [
    supervisor1Image || defaultImage,
    supervisor2Image || defaultImage,
    supervisor3Image || defaultImage
  ];

  const supervisorsData: SupervisorData[] = t('supervisors.supervisors', { returnObjects: true }) || [];

  const supervisors = supervisorsData.map((supervisor, index) => ({
    ...supervisor,
    image: supervisorImages[index % supervisorImages.length]
  }));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: isRTL,
    nextArrow: <SampleArrow direction="next" />,
    prevArrow: <SampleArrow direction="prev" />,
    swipe: true,
    centerMode: false,
    variableWidth: false,
    adaptiveHeight: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        }
      }
    ],
    className: "supervisors-carousel"
  };

  return (
    <Box 
      sx={{ 
        py: { xs: 10, md: 15 },
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: colors.bgPrimary,
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: colors.borderColor,
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
          backgroundSize: '50px 50px',
          opacity: 0.4,
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
            <IconBuildingCommunity size={18} style={{ marginRight: '8px', opacity: 0.9 }} />
            <Typography
              variant="body2"
              sx={{ 
                fontWeight: 600,
                fontSize: '0.95rem',
              }}
            >
              {t('supervisors.badgeText', {defaultValue: "University Mentors"})}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 800,
              color: colors.text,
              mb: 2,
              letterSpacing: '-0.025em',
              textShadow: isDarkMode ? '0 2px 10px rgba(0,0,0,0.5)' : 'none',
            }}
          >
            {t('supervisors.title')}
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
            {t('supervisors.subtitle')}
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: colors.textSecondary,
              maxWidth: '800px',
              mx: 'auto',
              mt: 2,
              mb: 4,
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.6,
              direction: isRTL ? 'rtl' : 'ltr',
              px: { xs: 2, md: 0 }
            }}
          >
            {t('supervisors.description', {defaultValue: "Distinguished professors guiding our journey in computer science and innovation"})}
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          sx={{
            position: 'relative',
            px: { xs: 2, sm: 0, md: 5 },
            mt: 4,
            mb: { xs: 6, md: 6 },
            direction: isRTL ? 'rtl' : 'ltr',
            '& .slick-slider': {
              position: 'static',
              overflow: 'visible'
            },
            '& .slick-list': { 
              overflow: 'visible !important',
              minHeight: { xs: '600px', sm: '500px', md: '520px' }
            },
            '& .slick-dots': {
              '.slick-active button': {
                boxShadow: isDarkMode ? `0 0 5px ${alpha(colors.primaryBlue, 0.7)}` : 'none',
              }
            }
          }}
        >
          <Slider ref={sliderRef} {...settings}>
            {supervisors.map((supervisor) => (
              <div key={supervisor.id} style={{ height: '100%', minHeight: isMobile ? '600px' : '520px' }}>
                <Box sx={{ px: 0.5, height: '100%' }}>
                  <SupervisorCard {...supervisor} />
                </Box>
              </div>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default Supervisors;
