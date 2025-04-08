import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  useTheme, 
  alpha, 
  Chip,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  IconTarget,
  IconPencil,
  IconUsers,
  IconBrandGithub,
  IconCode,
  IconBraces,
  IconGitCommit,
  IconGitPullRequest
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

// Map of icons to use
const iconMap = [IconTarget, IconPencil, IconUsers];

const OurMission = () => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const isDarkMode = customizer.activeMode === 'dark';
  
  // Get missions from translations
  const missions = t('ourMission.missions', { returnObjects: true }) || [];
  
  // GitHub-styled colors matching WhoWeAre component
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
                    mission
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

          {/* Header Section */}
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <motion.div variants={itemVariants}>
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
                    justifyContent: 'space-between'
                  }}
                >
                  {/* macOS-like control dots */}
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    order: isRtl ? 1 : 0,
                    flexDirection: 'row',
                  }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f57' }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#28c941' }} />
                  </Box>
                  
                  {/* File name */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.textSecondary,
                      fontFamily: 'monospace',
                      fontSize: '0.8rem',
                      order: isRtl ? 0 : 1,
                      ml: isRtl ? 0 : 'auto',
                      mr: isRtl ? 'auto' : 0
                    }}
                  >
                    mission.md
                  </Typography>
                </Box>

                {/* Terminal content */}
                <Box sx={{ 
                  px: 3, 
                  py: 3,
                  textAlign: isRtl ? 'right' : 'left',
                }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '1.8rem', sm: '2.5rem' },
                      fontWeight: 700,
                      color: colors.text,
                      mb: 3,
                      background: `linear-gradient(135deg, ${colors.primaryBlue}, ${colors.secondaryColor})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {t('ourMission.title')}
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
                    {t('ourMission.subtitle')}
                  </Typography>

                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 3, 
                      color: colors.commentColor,
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                      borderTop: `1px dashed ${colors.borderColor}`,
                      pt: 2,
                      flexDirection: isRtl ? 'row-reverse' : 'row',
                    }}
                  >
                    <IconCode size={16} style={{ marginRight: isRtl ? 0 : 8, marginLeft: isRtl ? 8 : 0 }} />
                    <Box component="span">
                      {t('ourMission.coreObjectives')}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Box>

          {/* Mission Cards Row */}
          <Grid container spacing={3}>
            {missions.map((mission, index) => (
              <Grid 
                item 
                xs={12} 
                md={4} 
                key={index} 
                sx={{ 
                  order: isRtl ? missions.length - index : index 
                }}
              >
                <motion.div
                  variants={itemVariants}
                  viewport={{ once: true }}
                >
                  <Paper
                    sx={{
                      p: 3,
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
                    }}
                  >
                    {/* Module version badge */}
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
                        v1.0.{index+1}
                      </Typography>
                    </Box>

                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        gap: 2,
                        textAlign: 'center'
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          background: alpha(colors.primaryBlue, 0.15),
                          color: colors.primaryBlue,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${alpha(colors.primaryBlue, 0.3)}`,
                        }}
                      >
                        {React.createElement(iconMap[index % iconMap.length], { size: 30 })}
                      </Box>
                      
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: '1.25rem',
                          color: colors.text,
                          textAlign: 'center',
                        }}
                      >
                        <Box component="span" sx={{ color: colors.keywordColor }}>
                          {'<'}
                        </Box>
                        <Box component="span" sx={{ color: colors.functionColor }}>
                          {mission.title}
                        </Box>
                        <Box component="span" sx={{ color: colors.keywordColor }}>
                          {' />'}
                        </Box>
                      </Typography>
                    </Box>

                    {/* Description box with code-like styling */}
                    <Box
                      sx={{
                        bgcolor: alpha(colors.borderColor, 0.2),
                        p: 2,
                        borderRadius: '4px',
                        mb: 2,
                        border: `1px solid ${alpha(colors.borderColor, 0.4)}`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'system-ui',
                          color: colors.textSecondary,
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          textAlign: isRtl ? 'right' : 'left',
                          direction: isRtl ? 'rtl' : 'ltr',
                        }}
                      >
                        {mission.description}
                      </Typography>
                    </Box>

                    {/* Status label */}
                    <Box 
                      sx={{ 
                        display: 'flex',
                        justifyContent: isRtl ? 'flex-end' : 'flex-start',
                        mt: 'auto'
                      }}
                    >
                      <Chip
                        label={isRtl ? "قيد التنفيذ" : "In Progress"}
                        size="small"
                        sx={{
                          bgcolor: alpha(colors.success, 0.1),
                          color: colors.success,
                          border: `1px solid ${alpha(colors.success, 0.3)}`,
                          fontFamily: 'monospace',
                        }}
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
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

export default OurMission;
