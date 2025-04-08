import { Box, Container, Typography, Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { IconHome, IconRefresh } from '@tabler/icons-react';
import ErrorImg from 'src/assets/images/gallery/error.png';

const Error = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const isDark = customizer.activeMode === 'dark';

  // Animation variants for elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        duration: 0.6
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        duration: 0.8,
        delay: 0.2
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: isDark 
          ? `radial-gradient(circle at 50% 50%, ${theme.palette.background.paper}, ${theme.palette.background.default})`
          : `radial-gradient(circle at 50% 50%, ${theme.palette.grey[50]}, ${theme.palette.background.default})`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark 
            ? `radial-gradient(circle at 20% 30%, ${theme.palette.primary.dark}20 0%, transparent 100%),
               radial-gradient(circle at 80% 70%, ${theme.palette.secondary.dark}15 0%, transparent 100%)`
            : `radial-gradient(circle at 20% 30%, ${theme.palette.primary.light}20 0%, transparent 100%),
               radial-gradient(circle at 80% 70%, ${theme.palette.secondary.light}15 0%, transparent 100%)`,
          opacity: 0.7,
          zIndex: 0
        }
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          py: { xs: 4, md: 6 }
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Error number with animation */}
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '6rem', md: '10rem' },
                fontWeight: 900,
                color: theme.palette.primary.main,
                textShadow: `2px 2px 10px ${isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.15)'}`,
                lineHeight: 1,
                mb: 2,
                opacity: 0.9
              }}
            >
              404
            </Typography>
          </motion.div>

          {/* Main error title */}
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                lineHeight: 1.5,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                px: 2
              }}
            >
              {t('error.title')}
            </Typography>
          </motion.div>

          {/* Error image with animation */}
          <motion.div variants={imageVariants}>
            <Box 
              sx={{ 
                width: '100%', 
                maxWidth: '450px',
                mx: 'auto',
                transform: 'translateZ(0)',
                my: { xs: 4, md: 6 }
              }}
            >
              <motion.img 
                src={ErrorImg} 
                alt="404" 
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  filter: isDark ? 'drop-shadow(0 0 15px rgba(255,255,255,0.1))' : 'drop-shadow(0 0 15px rgba(0,0,0,0.1))'
                }}
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
              />
            </Box>
          </motion.div>

          {/* Error message */}
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: isDark ? 'grey.400' : 'grey.700',
                maxWidth: '600px',
                mx: 'auto',
                mb: 4,
                px: 2,
                lineHeight: 1.6
              }}
            >
              {t('error.message')}
            </Typography>
          </motion.div>

          {/* Action buttons */}
          <motion.div variants={itemVariants}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap'
              }}
            >
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to="/"
                size="large"
                startIcon={<IconHome />}
                sx={{ 
                  px: 3,
                  py: 1.5,
                  borderRadius: '12px',
                  boxShadow: `0 8px 30px ${isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)'}`,
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 10px 30px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}`,
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {t('error.backToHome')}
              </Button>

              <Button
                color="secondary"
                variant="outlined"
                onClick={() => window.history.back()}
                size="large"
                startIcon={<IconRefresh />}
                sx={{ 
                  px: 3, 
                  py: 1.5,
                  borderRadius: '12px',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {t('error.tryAgain')}
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Error;
