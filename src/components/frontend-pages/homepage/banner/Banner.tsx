import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Button, useTheme, Stack, Link, alpha, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion } from 'framer-motion';
import { 
  IconArrowRight, IconBrandGithub, IconCircleCheck, IconChevronRight,
  IconBrain, IconWorldWww, IconChevronLeft
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Import separated components
import Globe3DThree from './components/Globe3DThree'; // Updated to Three.js version
import CodeTerminal from './components/CodeTerminal';
import RepoCard from './components/RepoCard';
import BackgroundEffects from './components/BackgroundEffects';

// Main Banner component
const Banner = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [isRtl, setIsRtl] = useState(i18n.language === 'ar');
  const isDarkMode = theme.palette.mode === 'dark';
  
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  // Update RTL state when language changes
  useEffect(() => {
    setIsRtl(i18n.language === 'ar');
  }, [i18n.language]);

  const handleJoinClick = () => {
    navigate('/join');
  };
  
  const handleAboutClick = () => {
    navigate('/about');
  };

  // GitHub-styled colors
  const colors = {
    isDarkMode,
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
    bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
    primaryGreen: isDarkMode ? '#2ea043' : '#2da44e',
    hoverGreen: isDarkMode ? '#3fb950' : '#2c974b',
    hoverBg: isDarkMode ? '#30363d' : '#f3f4f6',
    gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
    merged: isDarkMode ? '#a371f7' : '#8250df',
  };
  
  // Code snippets that will be typed
  const codeSnippet1 = `<span style="color: ${isDarkMode ? '#ff7b72' : '#cf222e'}">class</span> <span style="color: ${isDarkMode ? '#d2a8ff' : '#8250df'}">CyberBrains</span> {
  <span style="color: ${isDarkMode ? '#ff7b72' : '#cf222e'}">constructor</span>() {
    <span style="color: ${isDarkMode ? '#79c0ff' : '#0550ae'}">this</span>.name = <span style="color: ${isDarkMode ? '#a5d6ff' : '#0a3069'}">'CyberBrains'</span>;
    <span style="color: ${isDarkMode ? '#79c0ff' : '#0550ae'}">this</span>.mission = <span style="color: ${isDarkMode ? '#a5d6ff' : '#0a3069'}">'Computing Excellence'</span>;
    <span style="color: ${isDarkMode ? '#79c0ff' : '#0550ae'}">this</span>.members = <span style="color: ${isDarkMode ? '#79c0ff' : '#0550ae'}">2000</span>;
    <span style="color: ${isDarkMode ? '#79c0ff' : '#0550ae'}">this</span>.global = <span style="color: ${isDarkMode ? '#79c0ff' : '#0550ae'}">true</span>;
  }
  
  <span style="color: ${isDarkMode ? '#ff7b72' : '#cf222e'}">init</span>() {
    <span style="color: ${isDarkMode ? '#8b949e' : '#6e7781'}">// Defining the future</span>
    <span style="color: ${isDarkMode ? '#ff7b72' : '#cf222e'}">return</span> <span style="color: ${isDarkMode ? '#a5d6ff' : '#0a3069'}">'Ready to innovate!'</span>;
  }
}</span>`;

  const betterCodeSnippet = `<span style="color: ${isDarkMode ? '#ff7b72' : '#cf222e'}">import</span> <span style="color: ${isDarkMode ? '#d2a8ff' : '#8250df'}">sys</span>
  
  <span style="color: ${isDarkMode ? '#8b949e' : '#6e7781'}"># Cyber Brains Club - Computing Innovation Hub</span>
  <span style="color: ${isDarkMode ? '#8b949e' : '#6e7781'}"># Established 2022</span>
  
  <span style="color: ${isDarkMode ? '#d2a8ff' : '#8250df'}">print</span>(<span style="color: ${isDarkMode ? '#a5d6ff' : '#0a3069'}">"*** CYBER BRAINS CLUB ***"</span>)
  <span style="color: ${isDarkMode ? '#d2a8ff' : '#8250df'}">print</span>(<span style="color: ${isDarkMode ? '#a5d6ff' : '#0a3069'}">"Welcome to the future of technology!"</span>)`;


  // Featured projects data with translation support
  const featuredProjects = [
    {
      name: t('projects.ai.name', 'ai-innovations'),
      description: t('projects.ai.description', 'Advanced machine learning frameworks and tools for university research projects in artificial intelligence'),
      stars: 184,
      forks: 42,
      tags: [t('projects.ai.tag1', 'AI'), t('projects.ai.tag2', 'Machine Learning'), t('projects.ai.tag3', 'Python')],
      icon: <IconBrain size={20} style={{ color: colors.primaryBlue }} />
    },
    {
      name: t('projects.security.name', 'cyber-security-toolkit'),
      description: t('projects.security.description', 'Essential security tools and resources for university researchers and cybersecurity professionals'),
      stars: 129,
      forks: 36,
      tags: [t('projects.security.tag1', 'Security'), t('projects.security.tag2', 'Java'), t('projects.security.tag3', 'Networking')],
      icon: <IconWorldWww size={20} style={{ color: colors.primaryBlue }} />
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Key features
  const features = [
    {
      title: t('HeaderBanner.innovationLeadership'),
      icon: <IconCircleCheck size={20} style={{ color: colors.primaryGreen }} />
    },
    {
      title: t('HeaderBanner.learnFromExperts'),
      icon: <IconCircleCheck size={20} style={{ color: colors.primaryGreen }} />
    },
    {
      title: t('HeaderBanner.talentDevelopment'),
      icon: <IconCircleCheck size={20} style={{ color: colors.primaryGreen }} />
    }
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: colors.bgPrimary,
        overflow: 'hidden',
        py: { xs: 10, md: 12 },
        borderBottom: `1px solid ${colors.borderColor}`,
      }}
    >
      {/* إضافة تأثيرات الخلفية مع نمط الشبكة */}
      <BackgroundEffects colors={colors} isRtl={isRtl} />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* GitHub-like centered header badge */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          sx={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 6 
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
            <IconBrandGithub size={18} style={{ marginRight: '8px', opacity: 0.9 }} />
            <Typography
              variant="body2"
              sx={{ 
                fontWeight: 600,
                fontSize: '0.95rem',
              }}
            >
              {t('HeaderBanner.universityClub')}
            </Typography>
          </Box>
        </Box>

        {/* Main heading - centered */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          sx={{ 
            textAlign: 'center', 
            mb: 7,
            maxWidth: '850px',
            mx: 'auto',
            px: { xs: 2, md: 0 }
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.2rem' },
              fontWeight: 800,
              color: colors.text,
              lineHeight: 1.1,
              mb: 3,
              letterSpacing: '-0.025em',
            }}
          >
            {t('HeaderBanner.excellenceHeading')}
          </Typography>

          {/* Gradient subtitle */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.4rem', sm: '1.8rem' },
              fontWeight: 700,
              mb: 3,
              background: `linear-gradient(135deg, ${colors.primaryBlue}, ${colors.secondaryColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            {t('HeaderBanner.clubSlogan')}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: colors.textSecondary,
              mb: 4,
              lineHeight: 1.6,
              maxWidth: '700px',
              
              mx: 'auto',
            }}
          >
            {t('HeaderBanner.welcomeText')}
          </Typography>

          {/* Centered action buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ 
              mb: 5,
              justifyContent: isRtl ? 'center' : 'center',

                    flexDirection: { 
                      sm: isRtl ? 'row-reverse' : 'row' 
                    }
            }}
          >
            <Button
              variant="contained"

              onClick={handleJoinClick}
              sx={{
                bgcolor: colors.primaryGreen,
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                py: 1.5,
                px: 4,
                borderRadius: '6px',
                textTransform: 'none',
                boxShadow: `0 4px 12px ${alpha(colors.primaryGreen, 0.3)}`,
                '&:hover': {
                  bgcolor: colors.hoverGreen,
                  boxShadow: `0 6px 16px ${alpha(colors.primaryGreen, 0.4)}`,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {t('HeaderBanner.joinNow')}
            </Button>
            
            <Button
              variant="outlined"
              onClick={handleAboutClick}
              sx={{
                borderColor: colors.borderColor,
                color: colors.text,
                fontWeight: 600,
                fontSize: '1rem',
                py: 1.5,
                px: 4,
                borderRadius: '6px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: colors.textSecondary,
                  bgcolor: colors.hoverBg,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {t('HeaderBanner.learnMore')}
            </Button>
          </Stack>

          {/* Key features */}
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            sx={{ 
              display: 'inline-flex', 
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: { xs: 2, sm: 4 },
              mb: 2
            }}
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                {feature.icon}
                <Typography
                  sx={{
                    color: colors.text,
                    fontSize: '0.95rem',
                    fontWeight: 500,
                  }}
                >
                  {feature.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Interactive Globe and Code Terminal - Side by Side in better layout */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          sx={{ 
            position: 'relative', 
            mb: 10,
            maxWidth: { md: '940px' },
            mx: 'auto'
          }}
        >
          <Grid container spacing={1}>
            {/* Globe container - takes up vertical space along the side */}
            <Grid item xs={12} md={6} sx={{ 
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center', 
            }}>
              {/* Interactive 3D Globe */}
              <Box 
                sx={{ 
                  height: { xs: 300, md: 400 },
                  width: '100%',
                  position: 'relative',
                  zIndex: 3,
                }}
              >
                <Globe3DThree colors={colors} />
              </Box>
            </Grid>

            {/* Code terminal container */}
            <Grid item xs={12} md={6} sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Box
                sx={{
                  width: '100%',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <CodeTerminal 
                  title="cyberbrains-innovation.tsx" 
                  content={codeSnippet1}
                  codeText={betterCodeSnippet} // استخدام النص الجديد والأفضل
                  delay={0.3}
                  colors={colors}
                  isRtl={isRtl}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        {/* Featured projects section */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          sx={{ mb: 4 }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 3,
              borderBottom: `1px solid ${alpha(colors.borderColor, 0.6)}`,
              pb: 1.5,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: colors.text,
                fontSize: { xs: '1.3rem', md: '1.4rem' },
              }}
            >
              {t('HeaderBanner.featuredActivities')}
            </Typography>
            
            <Link
              component={motion.a}
              href="#"
              underline="none"
              whileHover={{ x: isRtl ? -5 : 5 }}
              sx={{
                color: colors.primaryBlue,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.9rem',
                justifyContent: isRtl ? 'flex-start' : 'flex-end',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              {isRtl && <IconChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />}
              {t('HeaderBanner.viewAll')}
              {!isRtl && <IconChevronRight size={16} />}
            </Link>
          </Box>
          
          <Grid container spacing={3}>
            {featuredProjects.map((project, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <RepoCard key={index} repo={project} index={index} colors={colors} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
