import { Box, Grid, Typography, Container, Stack, useTheme, IconButton, alpha } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { IconArrowRight, IconArrowLeft, IconUsers } from '@tabler/icons-react';
import Slider from 'react-slick';
import { useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './alumni-carousel.css'; // استخدام ملف CSS المخصص
import AlumniLeaderCard from './AlumniLeaderCard';

// Import local alumni images
import alumni1Image from 'src/assets/images/gallery/image_alumni1.jpg';
import alumni2Image from 'src/assets/images/gallery/image_alumni2.jpg';
import alumni3Image from 'src/assets/images/gallery/image_alumni3.jpg';
import alumni4Image from 'src/assets/images/gallery/image_alumni4.jpg';
import defaultImage from 'src/assets/images/gallery/image 2.png';

interface ArrowProps {
  direction: 'next' | 'prev';
  onClick?: () => void;
}

function SampleArrow({ direction, onClick }: ArrowProps) {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const customizer = useSelector((state: any) => state.customizer);
  const isDarkMode = customizer.activeMode === 'dark';
  
  // GitHub-styled colors
  const colors = {
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff', // تصحيح هنا أيضاً
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
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
          color: 'white',
        }
      }}
    >
      {direction === 'next' ? 
        <IconArrowRight size={22} style={{ color: 'inherit' }} /> : 
        <IconArrowLeft size={22} style={{ color: 'inherit' }} />
      }
    </Box>
  );
}

const AlumniLeaders = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const customizer = useSelector((state: any) => state.customizer);
  const sliderRef = useRef<Slider | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isDarkMode = customizer.activeMode === 'dark';

  // GitHub-styled colors - using dark blue color like Footer
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

  // معالج CSS متغيرات لاستخدامها في ملف CSS
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', colors.primaryBlue);
    document.documentElement.style.setProperty('--dot-color', colors.textSecondary);
    document.documentElement.style.setProperty('--bg-color', colors.bgPrimary);
  }, [isDarkMode]);

  // Array of alumni images with fallbacks
  const alumniImages = [
    alumni1Image || defaultImage,
    alumni2Image || defaultImage,
    alumni3Image || defaultImage,
    alumni4Image || defaultImage
  ];

  // استخدام بيانات أبرز الشخصيات من الترجمات
  const alumniLeaders = t('alumniLeaders.leaders', { returnObjects: true }) || [];

  // إضافة الصور لكل شخصية
  const leadersWithImages = alumniLeaders.map((leader: any, idx: number) => ({
    ...leader,
    image: alumniImages[idx % alumniImages.length]
  }));

  // Effect to monitor window resizing
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (sliderRef.current) {
        // Force re-initialize slider on resize
        setTimeout(() => {
          if (sliderRef.current) {
            const slider = sliderRef.current as any;
            if (slider.innerSlider && slider.innerSlider.onWindowResized) {
              slider.innerSlider.onWindowResized();
            }
          }
        }, 10);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to handle language/direction changes
  useEffect(() => {
    // Reset carousel state when direction or language changes
    if (sliderRef.current) {
      const slider = sliderRef.current as any;
      
      // Force a complete remount/reinit of the slider
      if (slider) {
        setTimeout(() => {
          if (sliderRef.current) {
            // Go to first slide
            if (sliderRef.current.slickGoTo) {
              sliderRef.current.slickGoTo(0);
            }
            
            // Force update
            if (sliderRef.current.innerSlider) {
              sliderRef.current.innerSlider.forceUpdate();
              
              // Re-init
              if (sliderRef.current.innerSlider.onWindowResized) {
                sliderRef.current.innerSlider.onWindowResized();
              }
            }
          }
        }, 100);
      }
    }
  }, [isRtl, windowWidth]);

  // Set the number of slides to show based on screen width
  const slidesToShow = windowWidth < 768 ? 1 : windowWidth < 1200 ? 2 : 3;

  // Carousel settings with improved configuration for pagination
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: windowWidth < 768 ? 1 : slidesToShow,
    rtl: isRtl,
    nextArrow: <SampleArrow direction="next" />,
    prevArrow: <SampleArrow direction="prev" />,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    accessibility: true,
    adaptiveHeight: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          arrows: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: false
        }
      }
    ],
    className: "alumni-carousel"
  };

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 10, md: 14 },
        backgroundColor: colors.bgPrimary,
        borderTop: '1px solid',
        borderTopColor: colors.borderColor,
        overflow: 'hidden',
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
            mb: 5
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
              {t('alumniLeaders.badgeText', {defaultValue: "Cyber Brains Alumni"})}
            </Typography>
          </Box>
        </Box>

        <Stack
          direction="column"
          alignItems="center"
          sx={{ mb: 6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* تنسيق العنوان الرئيسي مع نمط GitHub */}
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 800,
                color: colors.text,
                mb: 2,
                letterSpacing: '-0.025em',
                textAlign: 'center',
                textShadow: isDarkMode ? '0 2px 10px rgba(0,0,0,0.5)' : 'none'
              }}
            >
              {t('alumniLeaders.title')}
            </Typography>

            {/* العنوان الفرعي مع تدرج لوني مثل Banner.tsx */}
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                fontWeight: 700,
                mb: 3,
                textAlign: 'center',
                background: `linear-gradient(135deg, ${colors.primaryBlue}, ${colors.secondaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
              }}
            >
              {t('alumniLeaders.subtitle')}
            </Typography>

            {/* نص الوصف مع نمط GitHub */}
            <Typography
              variant="body1"
              sx={{
                mb: 6,
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto',
                color: colors.textSecondary,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6
              }}
            >
              {t('alumniLeaders.description', {defaultValue: "Past leaders who contributed to establishing the foundations of Cyber Brains and set the path for its future digital achievements."})}
            </Typography>
          </motion.div>

          {/* Carousel container with improved styling */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            sx={{
              width: '100%',
              maxWidth: '1100px',
              mx: 'auto',
              px: { xs: 2, sm: 0, md: 5 },
              position: 'relative',
              '& .slick-slider': {
                position: 'static',
                overflow: 'visible'
              },
              '& .slick-dots': {
                '.slick-active button': {
                  boxShadow: isDarkMode ? `0 0 5px ${alpha(colors.primaryBlue, 0.7)}` : 'none',
                }
              }
            }}
          >
            <Slider ref={sliderRef} {...settings}>
              {leadersWithImages.map((leader: any, index: number) => (
                <Box 
                  key={leader.id} 
                  key={leader.id} 
                  sx={{ 
                    height: '100%', 
                    p: 1,
                    '&:focus': { outline: 'none' },
                    direction: isRtl ? 'rtl' : 'ltr' // نضيف هذا للبوكس الخاص بكل شريحة
                  }}
                >
                  <AlumniLeaderCard
                    id={leader.id}
                    name={leader.name}
                    role={leader.role}
                    period={leader.period}
                    bio={leader.bio}
                    achievements={leader.achievements}
                    skills={leader.skills}
                    image={leader.image}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default AlumniLeaders;
