import React from 'react';
import { 
  Box, 
  Grid, 
  Container, 
  Typography, 
  useTheme, 
  alpha,
  Chip,
  Paper,
  Divider,
  Badge
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  IconCode,
  IconBrandPython,
  IconBinaryTree,
  IconDeviceDesktopAnalytics,
  IconBrain,
  IconWorldWww,
  IconBrandGithub,
  IconBraces,
  IconTerminal,
  IconGitPullRequest,
  IconGitCommit,
  IconDeviceDesktop, // Changed from IconDeviceLaptopCode which doesn't exist
  IconBug,
  IconServer,
  IconShieldLock,
  IconNetwork
} from '@tabler/icons-react';

// Map of icons for computer science topics
const iconMap = [
  IconCode, // Programming
  IconBinaryTree, // Algorithms
  IconDeviceDesktopAnalytics, // Software Development
  IconBrain, // AI/ML
  IconWorldWww, // Web Development
  IconShieldLock // Cybersecurity
];

const Features = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const customizer = useSelector((state: any) => state.customizer);
  const isRtl = i18n.dir() === 'rtl';
  const isDarkMode = customizer.activeMode === 'dark';
  
  // Get features from translations
  const features = t('features.items', { returnObjects: true }) || [];
  
  // Update to use translation keys instead of hardcoded strings
  // Note: We've removed the isRtl conditional and now use the translation system
  const csTitle = t('features.csTitle');
  const csSubtitle = t('features.csSubtitle');
  
  // Map media terms to computer science terms
  const csTerms = {
    "Photography": isRtl ? "البرمجة والخوارزميات" : "Programming & Algorithms",
    "Video Production": isRtl ? "تطوير البرمجيات" : "Software Development",
    "Journalism": isRtl ? "الذكاء الاصطناعي" : "Artificial Intelligence",
    "Broadcasting": isRtl ? "تطوير الويب" : "Web Development",
    "Digital Media": isRtl ? "أمن المعلومات" : "Cybersecurity",
    "Community": isRtl ? "مجتمع المطورين" : "Developer Community",
    
    "التصوير الفوتوغرافي": "البرمجة والخوارزميات",
    "إنتاج الفيديو": "تطوير البرمجيات",
    "الصحافة": "الذكاء الاصطناعي",
    "البث المباشر": "تطوير الويب",
    "الإعلام الرقمي": "أمن المعلومات",
    "المجتمع": "مجتمع المطورين",
    
    "Photographie": "Programmation & Algorithmes",
    "Production Vidéo": "Développement Logiciel",
    "Journalisme": "Intelligence Artificielle",
    "Diffusion": "Développement Web",
    "Média Numérique": "Cybersécurité",
    "Communauté": "Communauté de Développeurs"
  };
  
  // Modified descriptions for computer science context
  const csDescriptions = {
    "Professional photography services for university events, student portraits, and campus activities": 
      isRtl ? "دورات تعليمية في لغات البرمجة المختلفة وتدريب على حل المشكلات الخوارزمية وهياكل البيانات" : 
      "Educational workshops on various programming languages and training in algorithmic problem-solving and data structures",
      
    "Creating compelling video content and documentaries showcasing student life and university achievements": 
      isRtl ? "مشاريع تطوير البرمجيات بالتعاون مع الطلاب، من التصميم الأولي إلى المنتج النهائي" : 
      "Collaborative software development projects with students, from initial design to final product",
      
    "Covering campus events and writing engaging stories about the University Center of Naama community": 
      isRtl ? "استكشاف تقنيات الذكاء الاصطناعي وتعلم الآلة مع مشاريع عملية وتطبيقات حقيقية" : 
      "Exploring AI and machine learning technologies with hands-on projects and real-world applications",
      
    "Live streaming and event coverage for university lectures, conferences, and special occasions": 
      isRtl ? "تطوير تطبيقات الويب والموبايل باستخدام أحدث التقنيات والأطر البرمجية" : 
      "Web and mobile application development using the latest technologies and frameworks",
      
    "Web content and social media management to promote university activities and student achievements": 
      isRtl ? "ورش عمل في أمن المعلومات، اختبار الاختراق، وحماية البيانات والشبكات" : 
      "Workshops in information security, penetration testing, and data & network protection",
      
    "Join a creative team of media enthusiasts dedicated to building the university's media presence": 
      isRtl ? "انضم إلى مجتمع من المبرمجين والمطورين لتبادل المعرفة والخبرات في مجال علوم الكمبيوتر" : 
      "Join a community of programmers and developers to exchange knowledge and expertise in computer science"
  };
  
  // Map Arabic and French descriptions too (simplified for brevity)
  for (const key in csDescriptions) {
    // Add additional mappings for Arabic and French if needed
    // This is a simplified version - the real implementation would map all descriptions
  }
  
  // GitHub-styled colors matching other components
  const colors = {
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
    bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
    keywordColor: isDarkMode ? '#ff7b72' : '#cf222e',
    functionColor: isDarkMode ? '#d2a8ff' : '#8250df',
    commentColor: isDarkMode ? '#8b949e' : '#6e7781',
    stringColor: isDarkMode ? '#a5d6ff' : '#0a3069',
    merged: isDarkMode ? '#a371f7' : '#8250df',
    gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
    success: isDarkMode ? '#3fb950' : '#2da44e',
    python: isDarkMode ? '#3573A5' : '#3573A5',
    javascript: isDarkMode ? '#F7DF1E' : '#F0DB4F',
    java: isDarkMode ? '#E76F00' : '#E76F00',
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  // Function to get programming language based on index
  const getProgrammingLanguage = (index) => {
    const languages = ['Python', 'JavaScript', 'Python', 'JavaScript', 'Python', 'JavaScript'];
    return languages[index % languages.length];
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 12 },
        backgroundColor: colors.bgPrimary,
        position: 'relative',
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

      {/* Hexagon/Binary pattern overlay - unique to this component */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${isDarkMode ? '30363d' : 'd0d7de'}' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          {/* GitHub-like header with branch and commit info */}
          <motion.div variants={itemVariants}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', md: 'center' },
                mb: 4,
                pb: 2,
                borderBottom: `1px solid ${colors.borderColor}`,
                textAlign: isRtl ? 'right' : 'left',
              }}
            >
              {/* Left section with GitHub icon and repo path */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: { xs: 2, md: 0 },
                  flexDirection: 'row',
                }}
              >
                <Box sx={{ order: isRtl ? 1 : 0 }}>
                  <IconBrandGithub 
                    size={24} 
                    style={{ 
                      color: colors.textSecondary,
                      marginRight: '12px',
                    }} 
                  />
                </Box>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: colors.text,
                    display: 'flex',
                    alignItems: 'center',
                    order: isRtl ? 0 : 1,
                    mx: 0,
                  }}
                >
                  <Box component="span">cyber-brains /</Box>
                  <Box 
                    component="span" 
                    sx={{ 
                      color: colors.primaryBlue,
                      mx: 0.5,
                    }}
                  >
                    features
                  </Box>
                </Typography>
              </Box>

              {/* Right section with version and commit info */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: isRtl ? 0 : 1,
                  ml: isRtl ? 0 : 'auto',
                  mr: isRtl ? 'auto' : 0,
                }}
              >
                <Box sx={{ order: isRtl ? 1 : 0, mx: 1 }}>
                  <Chip
                    icon={<IconGitPullRequest size={16} />}
                    label={`v${new Date().getFullYear()}.${new Date().getMonth() + 1}.0`}
                    size="small"
                    sx={{
                      bgcolor: alpha(colors.merged, 0.15),
                      color: colors.merged,
                      border: `1px solid ${alpha(colors.merged, 0.3)}`,
                      fontFamily: 'monospace',
                      '& .MuiChip-icon': {
                        color: colors.merged,
                        mr: isRtl ? 0 : 1,
                        ml: isRtl ? 1 : 0,
                      }
                    }}
                  />
                </Box>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: colors.textSecondary,
                    fontSize: '0.85rem',
                    fontFamily: 'monospace',
                    order: isRtl ? 0 : 1,
                    mx: 1,
                  }}
                >
                  <Box sx={{ order: isRtl ? 1 : 0, display: 'flex', alignItems: 'center' }}>
                    <IconGitCommit size={16} />
                  </Box>
                  
                  <Box 
                    component="span" 
                    sx={{ 
                      mx: 1,
                      display: { xs: 'none', sm: 'inline' },
                      order: isRtl ? 0 : 1,
                    }}
                  >
                    {isRtl ? ":آخر تحديث" : "latest commit:"}
                  </Box>
                  
                  <Box sx={{ order: isRtl ? 2 : 2 }}>
                    {new Date().toISOString().substring(0, 10)}
                  </Box>
                </Box>
              </Box>
            </Box>
          </motion.div>

          {/* Code Editor style header - variation from terminal window */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                mb: 6,
                overflow: 'hidden',
                border: `1px solid ${colors.borderColor}`,
                borderRadius: '6px',
                bgcolor: alpha(colors.bgSecondary, 0.7),
              }}
            >
              {/* Code editor tabs and header */}
              <Box
                sx={{
                  py: 1,
                  px: 2,
                  bgcolor: alpha(colors.borderColor, 0.3),
                  borderBottom: `1px solid ${colors.borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: isRtl ? 'row-reverse' : 'row',
                }}
              >
                {/* IDE-style tabs instead of macOS dots - different from other components */}
                <Box 
                  sx={{
                    display: 'flex',
                    mr: isRtl ? 0 : 'auto',
                    ml: isRtl ? 'auto' : 0,
                  }}
                >
                  <Box 
                    sx={{
                      py: 0.5,
                      px: 2,
                      borderTopLeftRadius: 6,
                      borderTopRightRadius: 6,
                      bgcolor: alpha(colors.primaryBlue, 0.1),
                      color: colors.primaryBlue,
                      borderTop: `1px solid ${alpha(colors.primaryBlue, 0.3)}`,
                      borderLeft: `1px solid ${alpha(colors.primaryBlue, 0.3)}`,
                      borderRight: `1px solid ${alpha(colors.primaryBlue, 0.3)}`,
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      fontFamily: 'monospace',
                      marginBottom: '-1px',
                    }}
                  >
                    <IconDeviceDesktop size={14} style={{ marginRight: 5 }} /> {/* Changed from IconDeviceLaptopCode */}
                    <Typography component="span" sx={{ fontSize: '0.8rem' }}>
                      features.tsx
                    </Typography>
                  </Box>
                </Box>
                
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.textSecondary,
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <IconBrandPython 
                    size={16} 
                    style={{ 
                      marginRight: 5, 
                      color: colors.python
                    }} 
                  />
                  CyberBrains.py
                </Typography>
              </Box>

              {/* Editor content with line numbers - unique to this component */}
              <Box 
                sx={{ 
                  display: 'flex',
                  position: 'relative',
                }}
              >
                {/* Line numbers */}
                <Box 
                  sx={{
                    width: 40,
                    py: 3,
                    bgcolor: alpha(colors.borderColor, 0.2),
                    color: colors.textSecondary,
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    textAlign: 'right',
                    borderRight: `1px solid ${colors.borderColor}`,
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <Box key={num} sx={{ pr: 2, lineHeight: 1.7 }}>{num}</Box>
                  ))}
                </Box>
                
                {/* Code content */}
                <Box 
                  sx={{ 
                    px: 3, 
                    py: 3,
                    flex: 1,
                    textAlign: isRtl ? 'right' : 'left',
                    fontFamily: 'monospace',
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '1.8rem', sm: '2.5rem' },
                      fontWeight: 700,
                      color: colors.text,
                      mb: 2,
                      background: `linear-gradient(135deg, ${colors.primaryBlue}, ${colors.secondaryColor})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {csTitle}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      color: colors.textSecondary,
                      lineHeight: 1.8,
                      mb: 3,
                    }}
                  >
                    {csSubtitle}
                  </Typography>

                  {/* Code comment block - different style from other components */}
                  <Box 
                    sx={{
                      my: 3,
                      p: 2,
                      bgcolor: alpha(colors.bgPrimary, 0.4),
                      borderLeft: `3px solid ${colors.commentColor}`,
                      borderRadius: '0 4px 4px 0',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      color: colors.commentColor,
                    }}
                  >
                    <Box component="span" sx={{ display: 'block', mb: 1 }}>
                      # {isRtl ? "تعلم. ابتكر. طور." : "Learn. Innovate. Develop."}
                    </Box>
                    <Box component="span" sx={{ display: 'block' }}>
                      # {isRtl ? "نادي علوم الكمبيوتر - بناء مستقبل رقمي" : "Computer Science Club - Building a digital future"}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </motion.div>

          {/* Activity Counter - with code class style */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 3,
                flexDirection: isRtl ? 'row-reverse' : 'row',
                bgcolor: alpha(colors.bgSecondary, 0.5),
                p: 2,
                borderRadius: 1,
                border: `1px dashed ${colors.borderColor}`,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: isRtl ? 0 : 2,
                  ml: isRtl ? 2 : 0,
                }}
              >
                <IconTerminal 
                  size={20} 
                  style={{ 
                    color: colors.keywordColor
                  }} 
                />
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'monospace',
                    color: colors.text,
                    fontSize: '0.9rem',
                  }}
                >
                  <Box component="span" sx={{ color: colors.keywordColor }}>class</Box>{' '}
                  <Box component="span" sx={{ color: colors.functionColor }}>Activities</Box>{' '}
                  {'{'} <Box component="span" sx={{ color: colors.commentColor }}>//</Box>{' '}
                  {features.length} {isRtl ? "أنشطة متوفرة" : "available activities"} {'}'}
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Features grid as code snippets - different style from packages in other components */}
          <Grid container spacing={3} direction={isRtl ? 'row-reverse' : 'row'}>
            {features.map((feature, index) => {
              const csTitle = csTerms[feature.title] || feature.title;
              const csDescription = csDescriptions[feature.description] || feature.description;
              const language = getProgrammingLanguage(index);
              
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    variants={itemVariants}
                    viewport={{ once: true }}
                  >
                    <Paper
                      sx={{
                        height: '100%',
                        borderRadius: '6px',
                        bgcolor: alpha(colors.bgSecondary, 0.5),
                        border: `1px solid ${colors.borderColor}`,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: `0 8px 24px ${alpha(colors.bgSecondary, 0.5)}`,
                          borderColor: alpha(colors.primaryBlue, 0.4),
                          '& .code-header': {
                            bgcolor: alpha(colors.primaryBlue, 0.1),
                          }
                        },
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {/* Snippet header - IDE style */}
                      <Box 
                        className="code-header"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          py: 1,
                          px: 2,
                          bgcolor: alpha(colors.borderColor, 0.2),
                          borderBottom: `1px solid ${colors.borderColor}`,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: 'monospace',
                            fontSize: '0.8rem',
                            color: colors.text,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {React.createElement(iconMap[index % iconMap.length], { 
                            size: 16,
                            style: { marginRight: 5 }
                          })}
                          {csTitle.toLowerCase().replace(/\s+/g, '_')}.{index % 2 === 0 ? 'py' : 'js'}
                        </Typography>
                        
                        <Chip
                          label={language}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            bgcolor: alpha(colors.borderColor, 0.4),
                            color: colors.textSecondary,
                          }}
                        />
                      </Box>

                      {/* Code content */}
                      <Box 
                        sx={{
                          p: 2,
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        {/* Function declaration with title */}
                        <Box 
                          sx={{ 
                            mb: 2,
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
                            color: colors.text,
                            textAlign: 'left', // Always LTR for code
                            direction: 'ltr', // Always LTR for code
                          }}
                        >
                          <Box component="span" sx={{ color: colors.keywordColor }}>
                            {index % 2 === 0 ? 'def' : 'function'}
                          </Box>{' '}
                          <Box component="span" sx={{ color: colors.functionColor }}>
                            {csTitle.toLowerCase().replace(/\s+|\/+|&+/g, '_')}
                          </Box>
                          <Box component="span">
                            {index % 2 === 0 ? '():' : '() {'}
                          </Box>
                        </Box>
                        
                        {/* Activity title */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            fontSize: '1.15rem',
                            color: colors.text,
                            mb: 2,
                            textAlign: isRtl ? 'right' : 'left',
                            direction: isRtl ? 'rtl' : 'ltr',
                          }}
                        >
                          {csTitle}
                        </Typography>
                        
                        {/* Description box with code-like styling */}
                        <Box
                          sx={{
                            bgcolor: alpha(colors.bgPrimary, 0.4),
                            p: 2,
                            borderRadius: '4px',
                            border: `1px solid ${alpha(colors.borderColor, 0.6)}`,
                            mb: 2,
                            flex: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: colors.text,
                              fontSize: '0.9rem',
                              lineHeight: 1.6,
                              textAlign: isRtl ? 'right' : 'left',
                              direction: isRtl ? 'rtl' : 'ltr',
                            }}
                          >
                            {csDescription}
                          </Typography>
                        </Box>

                        {/* Footer code section */}
                        <Box
                          sx={{
                            mt: 'auto',
                            pt: 1.5,
                            borderTop: `1px dashed ${colors.borderColor}`,
                            fontFamily: 'monospace',
                            fontSize: '0.85rem',
                            color: colors.textSecondary,
                            textAlign: 'left', // Always LTR for code
                            direction: 'ltr', // Always LTR for code
                          }}
                        >
                          <Box component="span" sx={{ color: colors.commentColor, display: 'block', mb: 1 }}>
                            # {isRtl ? "للتسجيل" : "To register"}: 
                          </Box>
                          <Box component="span" sx={{ color: colors.keywordColor, display: 'block' }}>
                            {index % 2 === 0 ? 'return' : 'return'} 
                            <Box component="span" sx={{ color: colors.success }}> True</Box>
                            {index % 2 === 0 ? '' : ';'}
                          </Box>
                          {index % 2 === 0 ? '' : <Box component="span">{'}'}</Box>}
                        </Box>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>

          {/* Footer section with code braces */}
          <motion.div variants={itemVariants}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mt: 6,
                pt: 3,
                borderTop: `1px dashed ${colors.borderColor}`,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    height: '2px',
                    width: '20px',
                    bgcolor: colors.borderColor,
                  }}
                />
                <IconBraces 
                  size={24} 
                  color={colors.textSecondary} 
                />
                <Box
                  sx={{
                    height: '2px',
                    width: '20px',
                    bgcolor: colors.borderColor,
                  }}
                />
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default React.memo(Features);
