import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  useTheme, 
  alpha, 
  Chip,
  Divider,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  IconUsers, 
  IconBulb, 
  IconHeart, 
  IconStars,
  IconBrandGithub,
  IconCode,
  IconTerminal,
  IconBraces,
  IconGitPullRequest,
  IconGitCommit
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

// Map of icons to use
const iconMap = {
  0: IconUsers,
  1: IconBulb,
  2: IconHeart,
  3: IconStars
};

const WhoWeAre = () => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const isDarkMode = customizer.activeMode === 'dark';
  
  // Get values from translations
  const values = t('whoWeAre.values', { returnObjects: true }) || [];

  // GitHub-styled colors matching other components
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
    success: isDarkMode ? '#3fb950' : '#2da44e',
  };

  // Type effect for subtitle
  const [displayedText, setDisplayedText] = useState("");
  const descriptionText = t('whoWeAre.description');
  
  React.useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < descriptionText.length) {
        setDisplayedText(prev => prev + descriptionText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [descriptionText]);

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
                  flexDirection: 'row', // Always keep row direction
                }}
              >
                {/* Container for icon and adjust its position based on RTL */}
                <Box sx={{ order: isRtl ? 1 : 0 }}>
                  <IconBrandGithub 
                    size={24} 
                    style={{ 
                      color: colors.textSecondary,
                      marginRight: '12px',
                    }} 
                  />
                </Box>
                
                {/* Text content with consistent ordering */}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: colors.text,
                    display: 'flex',
                    alignItems: 'center',
                    order: isRtl ? 0 : 1,
                    mx: 0, // Reset any margin that might affect alignment
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
                    about
                  </Box>
                </Typography>
              </Box>

              {/* Right section with version and commit info */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: isRtl ? 0 : 1, // Adjust gap for RTL
                  ml: isRtl ? 0 : 'auto',
                  mr: isRtl ? 'auto' : 0,
                }}
              >
                {/* Wrap chip and status in containers to control their order */}
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
                        // Fixed icon spacing
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
                  {/* Wrap icon and text in separate containers to control their order */}
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

          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            {/* Left side - Title and description as code */}
            <Grid 
              item 
              xs={12} 
              md={5} 
              order={{ xs: 1, md: isRtl ? 2 : 1 }}
              sx={{ 
                pr: isRtl ? { md: 0, xs: 0 } : { md: 4, xs: 0 }, 
                pl: isRtl ? { md: 4, xs: 0 } : { md: 0, xs: 0 },
              }}
            >
              <Box>
                <motion.div variants={itemVariants}>
                  {/* Terminal-like window for title */}
                  <Paper
                    elevation={0}
                    sx={{
                      mb: 4,
                      overflow: 'hidden',
                      border: `1px solid ${colors.borderColor}`,
                      borderRadius: '6px',
                      bgcolor: alpha(colors.bgSecondary, 0.7),
                    }}
                  >
                    {/* Terminal header */}
                    <Box
                      sx={{
                        py: 1,
                        px: 2,
                        bgcolor: alpha(colors.borderColor, 0.3),
                        borderBottom: `1px solid ${colors.borderColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: isRtl ? 'row-reverse' : 'row',
                        justifyContent: 'space-between' // إضافة هذه الخاصية لضمان توزيع العناصر بشكل صحيح
                      }}
                    >
                      {/* دائرة التحكم الشبيهة بـ macOS */}
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 1, 
                        order: isRtl ? 1 : 0, // تغيير ترتيب العناصر في RTL
                        flexDirection: 'row', // دائما من اليسار لليمين بغض النظر عن اللغة
                      }}>
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            bgcolor: '#ff5f57' 
                          }} 
                        />
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            bgcolor: '#ffbd2e' 
                          }} 
                        />
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            bgcolor: '#28c941' 
                          }} 
                        />
                      </Box>
                      
                      {/* اسم الملف about-us.js */}
                      <Typography
                        variant="caption"
                        sx={{
                          color: colors.textSecondary,
                          fontFamily: 'monospace',
                          fontSize: '0.8rem',
                          order: isRtl ? 0 : 1, // تغيير ترتيب العناصر في RTL
                          ml: isRtl ? 0 : 'auto', // تعديل الهوامش بناءً على الاتجاه
                          mr: isRtl ? 'auto' : 0
                        }}
                      >
                        about-us.js
                      </Typography>
                    </Box>

                    {/* Terminal content - always LTR for code */}
                    <Box sx={{ 
                      px: 3, 
                      py: 2,
                      textAlign: isRtl ? 'right' : 'left',
                    }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.commentColor,
                          fontFamily: 'monospace',
                          mb: 2,
                          textAlign: isRtl ? 'right' : 'left',
                        }}
                      >
                        // {t('whoWeAre.title')}
                      </Typography>

                      {/* Code block always LTR */}
                      <Typography
                        component="pre"
                        dir="ltr"
                        sx={{
                          fontFamily: 'monospace',
                          color: colors.text,
                          fontSize: '0.9rem',
                          mb: 2,
                          whiteSpace: 'pre-wrap',
                          lineHeight: 1.6,
                          textAlign: 'left',
                        }}
                      >
                        <Box component="span" sx={{ color: colors.keywordColor }}>class</Box>{' '}
                        <Box component="span" sx={{ color: colors.functionColor }}>CyberBrains</Box> {'{'}
                        <br />
                        {'  '}
                        <Box component="span" sx={{ color: colors.keywordColor }}>constructor</Box>() {'{'}
                        <br />
                        {'    '}
                        <Box component="span" sx={{ color: colors.text }}>this</Box>.
                        <Box component="span" sx={{ color: colors.functionColor }}>name</Box> = 
                        <Box component="span" sx={{ color: colors.stringColor }}> "{t('footer.title')}"</Box>;
                        <br />
                        {'    '}
                        <Box component="span" sx={{ color: colors.text }}>this</Box>.
                        <Box component="span" sx={{ color: colors.functionColor }}>mission</Box> = 
                        <Box component="span" sx={{ color: colors.stringColor }}> "{t('whoWeAre.description')}"</Box>;
                        <br />
                        {'    '}
                        <Box component="span" sx={{ color: colors.text }}>this</Box>.
                        <Box component="span" sx={{ color: colors.functionColor }}>founded</Box> = 
                        <Box component="span" sx={{ color: colors.keywordColor }}> 2021</Box>;
                        <br />
                        {'  }'}
                        <br />
                        <br />
                        {'  '}
                        <Box component="span" sx={{ color: colors.keywordColor }}>getDescription</Box>() {'{'}
                        <br />
                        {'    '}
                        <Box component="span" sx={{ color: colors.commentColor }}>// Our primary focus</Box>
                        <br />
                        {'    '}
                        <Box component="span" sx={{ color: colors.keywordColor }}>return</Box> 
                        <Box component="span" sx={{ color: colors.stringColor }}> `{t('whoWeAre.content')||''}`</Box>;
                        <br />
                        {'  }'}
                        <br />
                        {'}'}
                      </Typography>

                      {/* Interactive typing effect - showing output */}
                      <Divider sx={{ my: 2, borderColor: colors.borderColor }} />
                      
                      <Box sx={{ 
                        display: 'flex', 
                        mb: 1,
                        flexDirection: isRtl ? 'row-reverse' : 'row',
                        textAlign: isRtl ? 'right' : 'left',
                      }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.success,
                            fontFamily: 'monospace',
                            mr: isRtl ? 0 : 1,
                            ml: isRtl ? 1 : 0,
                          }}
                        >
                          $
                        </Typography>
                        <Typography
                          variant="body2"
                          dir="ltr"
                          sx={{
                            color: colors.text,
                            fontFamily: 'monospace',
                          }}
                        >
                          node about-us.js
                        </Typography>
                      </Box>

                      <Box 
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                          color: colors.stringColor,
                          whiteSpace: 'wrap',
                          display: 'flex',
                          borderLeft: isRtl ? 'none' : `2px solid ${colors.secondaryColor}`,
                          borderRight: isRtl ? `2px solid ${colors.secondaryColor}` : 'none',
                          pl: isRtl ? 0 : 2,
                          pr: isRtl ? 2 : 0,
                          py: 1,
                          textAlign: isRtl ? 'right' : 'left',
                          direction: isRtl ? 'rtl' : 'ltr', // هنا نسمح بتغيير الاتجاه لأنه نص عادي وليس شفرة برمجية
                        }}
                      >
                        {displayedText}
                        <Box 
                          component="span" 
                          sx={{ 
                            width: '2px', 
                            height: '1.2em', 
                            bgcolor: colors.primaryBlue,
                            display: displayedText.length < descriptionText.length ? 'inline-block' : 'none',
                            animation: 'blink 1s step-end infinite',
                            verticalAlign: 'middle',
                            ml: isRtl ? 0 : 0.5,
                            mr: isRtl ? 0.5 : 0,
                            '@keyframes blink': {
                              'from, to': { opacity: 0 },
                              '50%': { opacity: 1 },
                            },
                          }} 
                        />
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Box>
            </Grid>

            {/* Right side - Value cards as code components */}
            <Grid 
              item 
              xs={12} 
              md={7} 
              order={{ xs: 2, md: isRtl ? 1 : 2 }}
            >
              <Box sx={{ position: 'relative' }}>
                {/* حذف الخط العمودي حسب طلبك */}

                {/* Header commit - مع حذف "من نحن" */}
                <motion.div variants={itemVariants}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 3,
                      flexDirection: isRtl ? 'row-reverse' : 'row',
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        bgcolor: colors.primaryBlue,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: isRtl ? 0 : 2,
                        ml: isRtl ? 2 : 0,
                        zIndex: 1,
                      }}
                    >
                      <IconCode size={14} color="#fff" />
                    </Box>
                    
                    <Box>
                      <Typography
                        variant="body2"
                        dir="ltr"
                        sx={{
                          color: colors.textSecondary,
                          mb: 2,
                          fontFamily: 'monospace',
                          fontSize: '0.85rem',
                          textAlign: 'left', // دائماً محاذاة لليسار لأنها شفرة برمجية
                        }}
                      >
                        import {'{'} <Box component="span" sx={{ color: colors.primaryBlue }}>Values</Box> {'}'} from 'cyber-brains'
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>

                {/* Value components as imports/modules */}
                <Grid container spacing={3}>
                  {values.map((value, index) => {
                    const IconComponent = iconMap[index] || IconUsers;
                    
                    return (
                      <Grid item xs={12} sm={6} key={index}>
                        <motion.div
                          variants={itemVariants}
                          viewport={{ once: true }}
                        >
                          <Paper
                            sx={{
                              p: { xs: 2, md: 3 },
                              height: '100%',
                              borderRadius: '6px',
                              bgcolor: alpha(colors.bgSecondary, 0.5),
                              border: `1px solid ${colors.borderColor}`,
                              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: `0 8px 24px ${alpha(colors.bgSecondary, 0.5)}`,
                              },
                              position: 'relative',
                              overflow: 'hidden',
                              textAlign: 'center', // توسيط المحتوى في البطاقة
                            }}
                          >
                            {/* Module name for top corner */}
                            <Box 
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: isRtl ? 0 : 'auto',
                                right: isRtl ? 'auto' : 0,
                                bgcolor: alpha(colors.borderColor, 0.4),
                                py: 0.5,
                                px: 1.5,
                                borderBottomLeftRadius: isRtl ? 0 : '6px',
                                borderBottomRightRadius: isRtl ? '6px' : 0,
                                borderTopLeftRadius: isRtl ? '6px' : 0,
                                borderTopRightRadius: isRtl ? 0 : '6px',
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  fontFamily: 'monospace',
                                  fontSize: '0.7rem',
                                  color: colors.textSecondary,
                                }}
                              >
                                v1.2.0
                              </Typography>
                            </Box>

                            {/* زيادة المسافة بين الأيقونة والنص وجعل المحتوى في المنتصف */}
                            <Box sx={{ 
                              display: 'flex', 
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 2,
                              gap: 2, // زيادة المسافة بين الأيقونة والنص
                            }}>
                              <Box
                                sx={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: '50%',
                                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <IconComponent size={20} color="#fff" />
                              </Box>
                              
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: { xs: '1rem', md: '1.25rem' },
                                  color: colors.text,
                                  textAlign: 'center',
                                }}
                              >
                                <Box component="span" sx={{ color: colors.keywordColor }}>
                                  {'<'}
                                </Box>
                                <Box component="span" sx={{ color: colors.functionColor }}>
                                  {value.title}
                                </Box>
                                <Box component="span" sx={{ color: colors.keywordColor }}>
                                  {' />'}
                                </Box>
                              </Typography>
                            </Box>

                            {/* Code snippet representing the value - always LTR */}
                            <Box
                              sx={{
                                bgcolor: alpha(colors.borderColor, 0.2),
                                p: 1.5,
                                borderRadius: '4px',
                                mb: 2,
                                fontFamily: 'monospace',
                                fontSize: '0.8rem',
                                color: colors.text,
                                direction: 'ltr', // دائماً LTR للشفرة البرمجية
                                textAlign: 'left', // دائماً محاذاة لليسار للشفرة البرمجية
                              }}
                            >
                              <Box component="pre" sx={{ 
                                m: 0, 
                                whiteSpace: 'pre-wrap',
                                direction: 'ltr', // ضمان اتجاه LTR
                                textAlign: 'left', // ضمان محاذاة يسار
                              }}>
                                <Box component="span" sx={{ color: colors.commentColor }}>
                                  // {value.description}
                                </Box>
                                <br />
                                <Box component="span" sx={{ color: colors.keywordColor }}>
                                  function
                                </Box>{' '}
                                <Box component="span" sx={{ color: colors.functionColor }}>
                                  {`handle${value.title.replace(/\s+/g, '')}`}
                                </Box>
                                <Box component="span" sx={{ color: colors.text }}>
                                  () {'{'}
                                </Box>
                                <br />
                                {"  "}
                                <Box component="span" sx={{ color: colors.keywordColor }}>
                                  return
                                </Box>{' '}
                                <Box component="span" sx={{ color: colors.success }}>
                                  true
                                </Box>
                                <Box component="span" sx={{ color: colors.text }}>
                                  ;
                                </Box>
                                <br />
                                <Box component="span" sx={{ color: colors.text }}>
                                  {'}'}
                                </Box>
                              </Box>
                            </Box>

                            <Typography
                              variant="body2"
                              sx={{
                                color: colors.textSecondary,
                                fontFamily: 'system-ui',
                                fontSize: { xs: '0.8rem', md: '0.875rem' },
                                textAlign: 'center', // توسيط النص
                              }}
                            >
                              {value.description}
                            </Typography>
                          </Paper>
                        </motion.div>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {/* Footer section with braces */}
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

export default WhoWeAre;
