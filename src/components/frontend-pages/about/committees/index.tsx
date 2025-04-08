import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  useTheme, 
  alpha, 
  Paper,
  Chip,
  Divider,
  Avatar
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  IconBrandGithub,
  IconCode,
  IconBraces,
  IconTerminal,
  IconGitPullRequest,
  IconGitCommit,
  IconDatabase,
  IconDeviceDesktop,
  IconBrandPython,
  IconWorldWww,
  IconBrain,
  IconShieldLock,
  IconServer,
  IconUsers,
  IconCloudComputing
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

// Map updated icons specific to computer science
const iconMap = {
  'programming': IconCode,
  'database': IconDatabase,
  'ai': IconBrain,
  'web': IconWorldWww,
  'security': IconShieldLock,
  'cloud': IconCloudComputing,
  'hardware': IconDeviceDesktop,
  'network': IconServer,
  'community': IconUsers
};

// CS department color scheme
const departmentColors = {
  'programming': '#3178c6', // TypeScript blue
  'database': '#f29111', // MySQL orange
  'ai': '#41cd52', // Python green
  'web': '#61dafb', // React blue
  'security': '#e53935', // Security red
  'cloud': '#0078d4', // Azure blue
  'hardware': '#ff6b6b',
  'network': '#00a1e0',
  'community': '#6c63ff'
};

const Committees = () => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const navigate = useNavigate();
  const isDarkMode = customizer.activeMode === 'dark';
  
  // Get committees from translations - this should now contain the updated computer science teams
  const committees = t('committees.items', { returnObjects: true }) || [];

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

  // Function to get CS team key from title for icon mapping
  const getTeamKey = (title) => {
    const titleLower = title.toLowerCase();
    
    // Use direct icon mapping based on team type patterns
    if (titleLower.includes('program') || titleLower.includes('البرمجة') || titleLower.includes('programmation')) return 'programming';
    if (titleLower.includes('data') || titleLower.includes('قواعد البيانات') || titleLower.includes('base de données')) return 'database';
    if (titleLower.includes('ai') || titleLower.includes('الذكاء') || titleLower.includes('ia') || titleLower.includes('intelligence')) return 'ai';
    if (titleLower.includes('web') || titleLower.includes('ويب') || titleLower.includes('développement web')) return 'web';
    if (titleLower.includes('security') || titleLower.includes('أمن') || titleLower.includes('cyber') || titleLower.includes('sécurité')) return 'security';
    if (titleLower.includes('cloud') || titleLower.includes('السحابية') || titleLower.includes('computing')) return 'cloud';
    
    return 'programming'; // Default
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

  const handleJoinClick = () => {
    navigate('/join');
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

      {/* Circuit board pattern overlay - unique to this component */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%23${isDarkMode ? '30363d' : 'd0d7de'}' fill-opacity='0.15' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 217.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`,
          opacity: 0.4,
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
                    committees
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

          {/* Section Header in Code File Style - variation from WhoWeAre */}
          <Box sx={{ mb: 6 }}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={0}
                sx={{
                  overflow: 'hidden',
                  border: `1px solid ${colors.borderColor}`,
                  borderRadius: '8px',
                  bgcolor: alpha(colors.bgSecondary, 0.7),
                }}
              >
                {/* File header with tabs - unique to this component */}
                <Box
                  sx={{
                    bgcolor: alpha(colors.borderColor, 0.3),
                    borderBottom: `1px solid ${colors.borderColor}`,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      px: 1,
                      borderBottom: 'none',
                    }}
                  >
                    {/* File tabs */}
                    <Box 
                      sx={{
                        py: 1,
                        px: 3,
                        bgcolor: colors.bgPrimary,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        borderTop: `1px solid ${colors.borderColor}`,
                        borderLeft: `1px solid ${colors.borderColor}`,
                        borderRight: `1px solid ${colors.borderColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        mr: 1,
                      }}
                    >
                      <IconCode size={16} style={{ color: colors.primaryBlue, marginRight: 6 }} />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontFamily: 'monospace',
                          color: colors.text 
                        }}
                      >
                        teams.tsx
                      </Typography>
                    </Box>
                    
                    <Box 
                      sx={{
                        py: 1,
                        px: 3,
                        opacity: 0.6,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <IconBraces size={16} style={{ color: colors.textSecondary, marginRight: 6 }} />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontFamily: 'monospace',
                          color: colors.textSecondary 
                        }}
                      >
                        README.md
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                {/* Content Header - Now using direct translations */}
                <Box sx={{ p: 4 }}>
                  <Typography
                    variant="h3"
                    align='center'
                    sx={{
                      fontSize: { xs: '1.8rem', sm: '2.5rem' },
                      fontWeight: 700,
                      mb: 2,
                      color: colors.text,
                      background: `linear-gradient(135deg, ${colors.primaryBlue}, ${colors.secondaryColor})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {t('committees.title')}
                  </Typography>
                  
                  <Typography
                    variant="h5"
                    align='center'
                    sx={{
                      color: colors.textSecondary,
                      maxWidth: '900px',
                      mx: 'auto',
                      mb: 3,
                      lineHeight: 1.6,
                      fontSize: { xs: '1.1rem', sm: '1.2rem' }
                    }}
                  >
                    {t('committees.subtitle')}
                  </Typography>

                  <Typography
                    variant="body1"
                    align='center'
                    sx={{
                      color: colors.textSecondary,
                      maxWidth: '800px',
                      mx: 'auto',
                      mb: 4,
                      lineHeight: 1.6,
                      fontSize: { xs: '0.95rem', sm: '1rem' }
                    }}
                  >
                    {t('committees.description')}
                  </Typography>

                  {/* Terminal line */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mt: 4,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(colors.bgPrimary, 0.6),
                      border: `1px dashed ${colors.borderColor}`,
                      maxWidth: '600px',
                      mx: 'auto'
                    }}
                  >
                    <Box 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        fontFamily: 'monospace',
                      }}
                      dir="ltr" // إضافة هذا لضمان أن الأمر يبقى دائمًا بالاتجاه LTR
                    >
                      <IconTerminal size={18} style={{ color: colors.primaryBlue, marginRight: '8px' }} />
                      <Box component="span" sx={{ color: colors.success, mr: 1 }}>
                        $
                      </Box>
                      <Box component="span" sx={{ color: colors.text }}>
                        npx cyber-brains-club list-teams
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Box>

          {/* Teams Grid - Styled as code repositories/projects */}
          <Grid container spacing={3}>
            {committees.map((committee, index) => {
              // Use the team information directly from translations
              const teamKey = getTeamKey(committee.title);
              const TeamIcon = iconMap[committee.icon] || iconMap[teamKey] || iconMap.programming;
              const teamColor = committee.color || departmentColors[teamKey] || theme.palette.primary.main;
              
              return (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  key={index} 
                  sx={{ 
                    display: 'flex',
                    flexDirection: isRtl ? 'row-reverse' : 'row' 
                  }}
                >
                  <motion.div
                    variants={itemVariants}
                    viewport={{ once: true }}
                    style={{ width: '100%' }}
                  >
                    <Paper
                      sx={{
                        height: '100%',
                        borderRadius: '8px',
                        bgcolor: alpha(colors.bgSecondary, 0.5),
                        border: `1px solid ${colors.borderColor}`,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: `0 8px 24px ${alpha(colors.borderColor, 0.4)}`,
                          borderColor: alpha(teamColor, 0.4), 
                        },
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      {/* Repository header with stars and fork count */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          px: 3,
                          py: 2,
                          borderBottom: `1px solid ${colors.borderColor}`,
                          bgcolor: alpha(colors.borderColor, 0.1),
                        }}
                      >
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: isRtl ? 'flex-end' : 'flex-start', // هنا نعدل لتكون الـ chips في الجهة الصحيحة

                        }}>
                          <TeamIcon 
                            size={18} 
                            color={teamColor} 
                            style={{ 
                              marginLeft: isRtl ? 0 : 0, 
                              marginRight: isRtl ? 8 : 8 
                            }} 
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              fontFamily: 'monospace',
                              color: colors.text,
                            }}
                          >
                            {committee.title.toLowerCase().replace(/\s+/g, '-')}
                          </Typography>
                        </Box>
                        
                        <Chip
                          label={`v${new Date().getFullYear()}`}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            bgcolor: alpha(teamColor, 0.1),
                            color: teamColor,
                            border: `1px solid ${alpha(teamColor, 0.3)}`,
                          }}
                        />
                      </Box>

                      {/* Content */}
                      <Box sx={{ p: 3 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            mb: 2, 
                            color: teamColor,
                            fontSize: '1.25rem',
                            textAlign: isRtl ? 'right' : 'left',
                          }}
                        >
                          {committee.title}
                        </Typography>
                        
                        <Typography
                          variant="body1"
                          sx={{
                            color: colors.textSecondary,
                            mb: 3,
                            lineHeight: 1.7,
                            fontSize: '0.95rem',
                            textAlign: isRtl ? 'right' : 'left',
                            direction: isRtl ? 'rtl' : 'ltr',
                          }}
                        >
                          {committee.description}
                        </Typography>
                        
                        {/* Tech stack tags */}
                        <Box
                          sx={{
                            mt: 'auto',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            pt: 2,
                            borderTop: `1px dashed ${colors.borderColor}`,
                            justifyContent: isRtl ? 'flex-end' : 'flex-start', // هنا نعدل لتكون الـ chips في الجهة الصحيحة
                            flexDirection: isRtl ? 'row-reverse' : 'row', // ضمان أن الـ chips متسلسلة بشكل صحيح
                          }}
                        >
                          {/* Generate unique tech stack tags based on team type */}
                          {teamKey === 'programming' && (
                            <>
                              <Chip size="small" label="Java" sx={{ fontSize: '0.7rem' }} />
                              <Chip size="small" label="Python" sx={{ fontSize: '0.7rem' }} />
                              <Chip size="small" label="C++" sx={{ fontSize: '0.7rem' }} />
                            </>
                          )}
                          {teamKey === 'database' && (
                            <>
                              <Chip size="small" label="SQL" sx={{ fontSize: '0.7rem' }} />
                              <Chip size="small" label="MongoDB" sx={{ fontSize: '0.7rem' }} />
                              <Chip size="small" label="Redis" sx={{ fontSize: '0.7rem' }} />
                            </>
                          )}
                          {teamKey === 'ai' && (
                            <>
                              <Chip size="small" label="TensorFlow" sx={{ fontSize: '0.7rem' }} />
                              <Chip size="small" label="PyTorch" sx={{ fontSize: '0.7rem' }} />
                              <Chip size="small" label="ML" sx={{ fontSize: '0.7rem' }} />
                            </>
                          )}
                          {teamKey === 'web' && (
                            <>
                              <Chip size="small" label="React" sx={{ fontSize: '0.7rem' }} />
                              <Chip size="small" label="Node.js" sx={{ fontSize: '0.7rem' }} />
                              <Chip size="small" label="HTML/CSS" sx={{ fontSize: '0.7rem' }} />
                            </>
                          )}
                          {teamKey === 'security' && (
                            <>
                              <Chip size="small" label="Kali" sx={{ fontSize: '0.7rem' }} />
                              <Chip size="small" label="Wireshark" sx={{ fontSize: '0.7rem' }} />
                              <Chip size="small" label="Nmap" sx={{ fontSize: '0.7rem' }} />
                            </>
                          )}
                          {teamKey === 'cloud' && (
                            <>
                              <Chip size="small" label="AWS" sx={{ fontSize: '0.7rem' }} />
                              <Chip size="small" label="Docker" sx={{ fontSize: '0.7rem' }} />
                              <Chip size="small" label="Kubernetes" sx={{ fontSize: '0.7rem' }} />
                            </>
                          )}
                        </Box>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
          
          {/* Join Button - GitHub PR style */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 6,
                pt: 4,
                borderTop: `1px dashed ${colors.borderColor}`,
              }}
            >
              <Button
                variant="contained"
                onClick={handleJoinClick}
                sx={{
                  bgcolor: colors.success,
                  color: "#fff",
                  px: 4,
                  py: 1.5,
                  borderRadius: '6px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  '&:hover': {
                    bgcolor: alpha(colors.success, 0.9),
                    transform: 'translateY(-3px)',
                    boxShadow: `0 4px 12px ${alpha(colors.success, 0.4)}`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {t('committees.joinCta')}
              </Button>
            </Box>
          </motion.div>
          
          {/* Footer section with braces */}
          <motion.div variants={itemVariants}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mt: 4,
                pt: 2,
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

export default Committees;
