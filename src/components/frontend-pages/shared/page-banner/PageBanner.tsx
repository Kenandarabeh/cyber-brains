import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Breadcrumbs, Link, useTheme, alpha, Chip, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { 
  IconHome,
  IconChevronRight, 
  IconChevronLeft, 
  IconBrandGithub,
  IconCode,
  IconTerminal2,
  IconBraces
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  path: string[];
  codePrefix?: string;
  codeSuffix?: string;
}

// Path utilities function
const getValidPath = (item: string): string => {
  const pathMap: Record<string, string> = {
    // Arabic -> Latin
    'الرئيسية': 'home',
    'الصفحة الرئيسية': 'home',
    'من نحن': 'about',
    'حول': 'about',
    'فريق': 'team',
    'الفريق': 'team',
    'فريقنا': 'team',
    'مشرفين': 'team',
    'المشرفين': 'team',
    'المشرفون': 'team',
    'مشرف': 'team',
    'المشرف': 'team',
    'قادة': 'team', 
    'قائد': 'team',
    'اتصل بنا': 'contact',
    'تواصل': 'contact',
    'الأنشطة': 'activities',
    'نشاطات': 'activities',
    'انضم': 'join',
    'انضم إلينا': 'join',

    // French -> Latin
    'Accueil': 'home',
    'À propos': 'about',
    'Équipe': 'team',
    'Notre équipe': 'team',
    'Superviseurs': 'team',
    'Superviseur': 'team',
    'Leaders': 'team',
    'Leader': 'team',
    'Contact': 'contact',
    'Contactez-nous': 'contact',
    'Activités': 'activities',
    'Nous rejoindre': 'join',

    // English
    'Home': 'home',
    'About': 'about',
    'About us': 'about',
    'Team': 'team',
    'Our team': 'team',
    'Supervisors': 'team',
    'Supervisor': 'team',
    'Leaders': 'team', 
    'Leader': 'team',
    'Contact us': 'contact',
    'Activities': 'activities',
    'Join': 'join',
    'Join us': 'join'
  };

  if (pathMap[item]) return pathMap[item];
  
  if (/^[A-Za-z0-9\s-_]+$/.test(item)) {
    return item.toLowerCase().replace(/\s+/g, '-');
  }
  
  return 'team';
};

// Typing animation component
const TypedText: React.FC<{text: string, delay?: number}> = ({text, delay = 0}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  
  useEffect(() => {
    // Start animation after delay
    const timeout = setTimeout(() => {
      setStartAnimation(true);
    }, delay * 1000);
    
    return () => clearTimeout(timeout);
  }, [delay]);
  
  useEffect(() => {
    if (!startAnimation) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 30 + (Math.random() * 50)); // Random typing speed for realistic effect
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, startAnimation]);
  
  return (
    <Box component="span" sx={{ position: 'relative' }}>
      {displayText}
      {currentIndex < text.length && (
        <Box 
          component="span" 
          sx={{ 
            borderRight: '2px solid', 
            animation: 'blink-caret 0.75s step-end infinite',
            '@keyframes blink-caret': {
              'from, to': { borderColor: 'transparent' },
              '50%': { borderColor: 'currentColor' }
            }
          }} 
        />
      )}
    </Box>
  );
};

// Main PageBanner component
const PageBanner: React.FC<PageBannerProps> = ({ 
  title, 
  subtitle, 
  path,
  codePrefix = "const ", 
  codeSuffix = " = () => {" 
}) => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const isDarkMode = customizer.activeMode === 'dark';

  // GitHub-styled colors matching Banner and Footer components
  const colors = {
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
    bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
    gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
    merged: isDarkMode ? '#a371f7' : '#8250df',
    keywordColor: isDarkMode ? '#ff7b72' : '#cf222e',
    functionColor: isDarkMode ? '#d2a8ff' : '#8250df',
    commentColor: isDarkMode ? '#8b949e' : '#6e7781',
    stringColor: isDarkMode ? '#a5d6ff' : '#0a3069',
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 8, md: 10 },
        backgroundColor: colors.bgPrimary,
        overflow: 'hidden',
        borderBottom: `1px solid ${colors.borderColor}`,
      }}
    >
      {/* Grid pattern background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(${colors.gridLines} 1px, transparent 1px), 
            linear-gradient(90deg, ${colors.gridLines} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.4,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Radial gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          left: -100,
          right: -100,
          bottom: -100,
          background: `radial-gradient(
            circle at 50% 50%, 
            transparent 30%, 
            ${colors.bgPrimary}
          )`,
          opacity: 0.8,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >

          {/* Breadcrumbs navigation */}
          <motion.div variants={itemVariants}>
            <Breadcrumbs
              separator={isRtl 
                ? <IconChevronLeft size={16} color={colors.textSecondary} /> 
                : <IconChevronRight size={16} color={colors.textSecondary} />
              }
              sx={{ 
                mb: 4,
                display: 'flex',
                justifyContent: 'center',
                direction: isRtl ? 'rtl' : 'ltr',
                '& .MuiBreadcrumbs-separator': {
                  color: colors.textSecondary
                }
              }}
            >
              <Link
                component={RouterLink}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: colors.textSecondary,
                  textDecoration: 'none',
                  '&:hover': {
                    color: colors.primaryBlue,
                    textDecoration: 'underline'
                  }
                }}
              >
                <IconHome size={16} style={{ marginRight: isRtl ? 0 : '4px', marginLeft: isRtl ? '4px' : 0 }} />
                {t('navigation.home')}
              </Link>
              {path.map((item, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={`/${getValidPath(item)}`}
                  sx={{
                    color: index === path.length - 1 
                      ? colors.primaryBlue
                      : colors.textSecondary,
                    textDecoration: 'none',
                    fontWeight: index === path.length - 1 ? 600 : 400,
                    '&:hover': {
                      color: colors.primaryBlue,
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {item}
                </Link>
              ))}
            </Breadcrumbs>
          </motion.div>

          {/* Main title with code decorations */}
          <Box sx={{ textAlign: 'center', mb: subtitle ? 5 : 3 }}>
            <motion.div variants={itemVariants}>
              {/* Code terminal-like header */}
              <Box
                sx={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  maxWidth: '850px',
                  mx: 'auto',
                }}
              >
                <Box
                  sx={{
                    padding: '8px 16px',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: alpha(colors.borderColor, 0.3),
                    borderBottom: `1px solid ${colors.borderColor}`,
                  }}
                >
                  <Box
                    component={IconTerminal2}
                    sx={{
                      mr: 1.5,
                      color: colors.textSecondary,
                      fontSize: '0.9rem',
                    }}
                    size={16}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.8rem',
                      color: colors.textSecondary,
                      fontFamily: 'monospace',
                    }}
                  >
                    {path[path.length - 1].toLowerCase().replace(/\s+/g, '-')}.tsx
                  </Typography>
                </Box>

                <Box
                  sx={{
                    textAlign: 'left',
                    padding: { xs: '1.5rem', sm: '2rem' },
                    bgcolor: alpha(colors.bgSecondary, 0.4),
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px',
                    border: `1px solid ${colors.borderColor}`,
                    borderTop: 'none',
                    lineHeight: 1.6,
                  }}
                >
                  {/* Code decoration for title */}
                  <Box
                    sx={{
                      mb: 2,
                      fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                      whiteSpace: 'nowrap',
                      overflowX: 'auto',
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      color: colors.commentColor,
                    }}
                  >
                    {/* Comment line */}
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1,
                        color: colors.commentColor,
                        fontFamily: 'inherit',
                        fontWeight: 400,
                      }}
                    >
                      {`// ${t('pageBanner.executing')} ${path[path.length - 1]}`}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      direction: isRtl ? 'rtl' : 'ltr',
                    }}
                  >
                    {/* Keyword - const/function */}
                    <Typography
                      component="span"
                      sx={{
                        color: colors.keywordColor,
                        fontFamily: 'Consolas, Monaco, monospace',
                        mr: 1,
                      }}
                    >
                      {codePrefix}
                    </Typography>

                    {/* Main title */}
                    <Typography
                      variant="h1"
                      component="h1"
                      sx={{
                        fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                        fontWeight: 800,
                        color: colors.functionColor,
                        display: 'inline',
                        fontFamily: 'inherit',
                      }}
                    >
                      {title}
                    </Typography>

                    {/* Function parenthesis */}
                    <Typography
                      component="span"
                      sx={{
                        color: colors.text,
                        fontFamily: 'Consolas, Monaco, monospace',
                        ml: 1,
                      }}
                    >
                      {codeSuffix}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Box>

          {/* Subtitle with typing animation */}
          {subtitle && (
            <motion.div variants={itemVariants}>
              <Box 
                sx={{ 
                  maxWidth: '700px',
                  mx: 'auto',
                  textAlign: 'center',
                  mt: 3,
                  bgcolor: alpha(colors.bgSecondary, 0.7),
                  py: 2,
                  px: 3,
                  borderRadius: '8px',
                  border: `1px dashed ${alpha(colors.borderColor, 0.6)}`,
                  position: 'relative'
                }}
              >
                <Box 
                  sx={{
                    position: 'absolute',
                    top: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: colors.bgPrimary,
                    px: 2,
                    py: 0.5,
                    borderRadius: '4px',
                    zIndex: 2
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: 'monospace',
                      color: colors.merged,
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <IconCode size={14} />
                    {t('pageBanner.description')}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: colors.text,
                    fontFamily: 'monospace',
                    lineHeight: 1.8,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    position: 'relative',
                    '&::before': {
                      content: '"\'"',
                      color: colors.stringColor,
                      mr: 0.5,
                      fontSize: '1.2em',
                    },
                    '&::after': {
                      content: '"\'"',
                      color: colors.stringColor,
                      ml: 0.5,
                      fontSize: '1.2em',
                    },
                  }}
                >
                  <TypedText text={subtitle} delay={0.5} />
                </Typography>
              </Box>
            </motion.div>
          )}

        </motion.div>
      </Container>
    </Box>
  );
};

export default PageBanner;
