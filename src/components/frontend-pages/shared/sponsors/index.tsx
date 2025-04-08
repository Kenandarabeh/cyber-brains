import { Box, Container, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { keyframes } from '@mui/system';
import { useState, useEffect, useRef } from 'react';

// Import sponsor images directly
import defaultImage from 'src/assets/images/gallery/image 2.png';
import fajer from 'src/assets/images/gallery/fajer.png';
import dou_naama from 'src/assets/images/gallery/dou_naama.png';
import cun from 'src/assets/images/gallery/cun.png';
import radio_naama from 'src/assets/images/gallery/radio-naama.png';
import chami from 'src/assets/images/gallery/chami.png';

const Sponsors = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const isDarkMode = theme.palette.mode === 'dark';
  const pinkColor = isDarkMode ? '#f778ba' : '#f600b9'; // اللون الوردي/البنفسجي حسب الtheme

  // Animation keyframes with adjusted calculations for larger logos
  const scroll = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-300px * 5)); }
  `;
  
  const scrollRTL = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(300px * 5)); }
  `;

  // Define sponsors with direct image references
  // This guarantees that images will display regardless of translation state
  const sponsors = [
    { id: 1, name: 'المركز الجامعي النعامة', image: cun },
    { id: 2, name: 'جمعية الفجر', image: fajer },
    { id: 3, name: 'دار الثقافة', image: chami },
    { id: 4, name: 'الخدمات الجامعية النعامة', image: dou_naama },
    { id: 5, name: 'اداعة النعامة', image: radio_naama },
  ];
  
  // Try to get translated sponsor names if available
  try {
    const translatedSponsors = t('sponsors.sponsors', { returnObjects: true });
    if (Array.isArray(translatedSponsors) && translatedSponsors.length > 0) {
      // Update only the names from translations, keep our direct image references
      translatedSponsors.forEach((item, index) => {
        if (index < sponsors.length && item.name) {
          sponsors[index].name = item.name;
        }
      });
    }
  } catch (error) {
    console.error("Error loading sponsor translations:", error);
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Image failed to load:", e.currentTarget.src);
    e.currentTarget.src = defaultImage;
  };

  // GitHub-style colors for dark and light modes
  const colors = {
    background: isDarkMode ? '#0d1117' : '#ffffff',
    border: isDarkMode ? '#30363d' : '#d0d7de',
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    fadedStart: isDarkMode ? 'rgba(13, 17, 23, 1)' : 'rgba(255, 255, 255, 1)',
    fadedEnd: isDarkMode ? 'rgba(13, 17, 23, 0)' : 'rgba(255, 255, 255, 0)',
    shadow: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(140, 149, 159, 0.15)',
    gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
  };

  return (
    <Box
      sx={{
        py: 6,
        bgcolor: colors.background,
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`,
        position: 'relative', // المطلوب للخلفية المطلقة
        overflow: 'hidden', // منع تجاوز العناصر
      }}
    >
      {/* نمط الشبكة بنمط GitHub */}
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

      <Container maxWidth="lg" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 700,
            mb: 6,
            color: colors.text,
            position: 'relative',
               '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              height: '3px',
              width: '80px',
              background: `linear-gradient(90deg, transparent, ${pinkColor}, transparent)`,
              borderRadius: '2px',
            }
          }}
        >
          {t('sponsors.title')}
        </Typography>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '150px', // Increased height from 100px to 150px
            overflow: 'hidden',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              height: '100%',
              width: '100px',
              zIndex: 2,
            },
            '&::before': {
              left: 0,
              background: `linear-gradient(to right, ${colors.fadedStart}, ${colors.fadedEnd})`,
            },
            '&::after': {
              right: 0,
              background: `linear-gradient(to left, ${colors.fadedStart}, ${colors.fadedEnd})`,
            },
          }}
        >
          <Box
            className="slider"
            sx={{
              display: 'flex',
              width: 'fit-content',
              animation: `${isRTL ? scrollRTL : scroll} 25s linear infinite`,
              '&:hover': {
                animationPlayState: 'paused',
              },
            }}
          >
            {/* First set of sponsors */}
            {sponsors.map((sponsor) => (
              <Box
                key={sponsor.id}
                sx={{
                  width: '300px', // Increased from 250px to 300px
                  height: '150px', // Increased from 100px to 150px
                  padding: '15px', // Slightly reduced padding to allow for bigger image
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: colors.background,
                  justifyContent: 'center',
        borderRadius: '20px',

                  flexShrink: 0,
                }}
              >
                <img
                  src={sponsor.image}
                  alt={sponsor.name}
                  onError={handleImageError}
                  style={{
                    maxWidth: '90%', // Allow image to take up more space
                    maxHeight: '90%', // Allow image to take up more space
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: isDarkMode ? 'brightness(0.8) grayscale(1)' : 'grayscale(1)',
                    opacity: isDarkMode ? 0.65 : 0.7,
                    transition: 'all 0.3s ease',
                    borderRadius: '20px',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = isDarkMode ? 'brightness(1.1) grayscale(0)' : 'grayscale(0)';
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = `0 8px 24px ${colors.shadow}`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = isDarkMode ? 'brightness(0.8) grayscale(1)' : 'grayscale(1)';
                    e.currentTarget.style.opacity = isDarkMode ? '0.65' : '0.7';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </Box>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {sponsors.map((sponsor) => (
              <Box
                key={`${sponsor.id}-duplicate`}
                sx={{
                  width: '300px', // Increased from 250px to 300px
                  height: '150px', // Increased from 100px to 150px
                  padding: '15px', // Slightly reduced padding
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <img
                  src={sponsor.image}
                  alt={sponsor.name}
                  onError={handleImageError}
                  style={{
                    maxWidth: '90%', // Allow image to take up more space
                    maxHeight: '90%', // Allow image to take up more space
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: isDarkMode ? 'brightness(0.8) grayscale(1)' : 'grayscale(1)',
                    opacity: isDarkMode ? 0.65 : 0.7,
                    transition: 'all 0.3s ease',
                    borderRadius: '4px',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = isDarkMode ? 'brightness(1.1) grayscale(0)' : 'grayscale(0)';
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = `0 8px 24px ${colors.shadow}`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = isDarkMode ? 'brightness(0.8) grayscale(1)' : 'grayscale(1)';
                    e.currentTarget.style.opacity = isDarkMode ? '0.65' : '0.7';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Sponsors;
