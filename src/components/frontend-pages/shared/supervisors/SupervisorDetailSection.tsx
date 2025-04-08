import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  useTheme, 
  alpha, 
  Divider,
  Chip,
  Button
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultImage from 'src/assets/images/gallery/image 2.png';
import { 
  IconSchool, 
  IconCode, 
  IconBuildingCommunity, 
  IconDeviceDesktop,
  IconBook,
  IconArrowLeft,
  IconArrowRight
} from '@tabler/icons-react';

interface SupervisorDetailProps {
  supervisor: any;
}

const SupervisorDetailSection: React.FC<SupervisorDetailProps> = ({ supervisor }) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const customizer = useSelector((state: any) => state.customizer);
  const isDarkMode = customizer.activeMode === 'dark';
  const navigate = useNavigate();

  // GitHub-styled colors
  const colors = {
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
    bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
    primaryGreen: isDarkMode ? '#2ea043' : '#2da44e',
    gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
    merged: isDarkMode ? '#a371f7' : '#8250df',
  };

  // Image error handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Image failed to load, using fallback");
    e.currentTarget.src = defaultImage;
  };

  // Get appropriate icon for supervisor department
  const getDepartmentIcon = () => {
    if (supervisor.department.toLowerCase().includes('media') || 
        supervisor.department.toLowerCase().includes('إعلام')) {
      return <IconDeviceDesktop size={20} color={colors.primaryBlue} />;
    } else if (supervisor.department.toLowerCase().includes('islamic') || 
               supervisor.department.toLowerCase().includes('إسلامية')) {
      return <IconBook size={20} color={colors.primaryBlue} />;
    } else if (supervisor.department.toLowerCase().includes('law') || 
               supervisor.department.toLowerCase().includes('حقوق')) {
      return <IconBuildingCommunity size={20} color={colors.primaryBlue} />;
    } else {
      return <IconSchool size={20} color={colors.primaryBlue} />;
    }
  };

  // Get random skills related to the department
  const getRelatedSkills = () => {
    if (supervisor.department.toLowerCase().includes('media') || 
        supervisor.department.toLowerCase().includes('إعلام')) {
      return ['Digital Media', 'Media Production', 'Content Creation'];
    } else if (supervisor.department.toLowerCase().includes('islamic') || 
               supervisor.department.toLowerCase().includes('إسلامية')) {
      return ['Academic Leadership', 'Research', 'Educational Strategy'];
    } else if (supervisor.department.toLowerCase().includes('law') || 
               supervisor.department.toLowerCase().includes('حقوق')) {
      return ['Legal Expertise', 'Constitutional Law', 'Research'];
    } else {
      return ['Academic Guidance', 'Student Development', 'Mentorship'];
    }
  };

  return (
    <Box 
      sx={{
        position: 'relative',
        py: { xs: 5, md: 8 },
        overflow: 'hidden',
        bgcolor: colors.bgPrimary,
        color: colors.text
      }}
    >
      {/* Grid pattern background - GitHub style */}
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
      
      {/* Radial gradient overlay - GitHub style */}
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
        {/* Back to Team button */}
        <Box 
          sx={{ 
            display: 'flex', 
            mb: 4
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate('/team')}
            sx={{
              borderColor: colors.borderColor,
              color: colors.text,
              '&:hover': {
                borderColor: colors.primaryBlue,
                bgcolor: alpha(colors.primaryBlue, 0.1),
              },
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
            startIcon={isRTL ? <IconArrowRight size={16} /> : <IconArrowLeft size={16} />}
          >
            {t('supervisorDetail.backToTeam')}
          </Button>
        </Box>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={4}>
            {/* Supervisor image and basic info - enhanced with GitHub style */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  overflow: 'hidden',
                  position: 'relative',
                  border: `1px solid ${colors.borderColor}`,
                  bgcolor: colors.bgPrimary,
                  borderRadius: 2,
                  boxShadow: isDarkMode 
                    ? `0 8px 24px ${alpha('#000000', 0.4)}` 
                    : `0 8px 24px ${alpha('#0d1117', 0.15)}`,
                }}
              >
                {/* GitHub-style grid overlay */}
                <Box 
                  className="card-grid-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
                      linear-gradient(to right, ${colors.gridLines} 1px, transparent 1px),
                      linear-gradient(to bottom, ${colors.gridLines} 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                    opacity: 0.2,
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}
                />
                
                {/* Accent bar - gradient style */}
                <Box 
                  sx={{
                    height: '4px',
                    width: '100%',
                    background: `linear-gradient(90deg, ${colors.primaryBlue}, ${colors.secondaryColor})`,
                  }}
                />

                <Box
                  sx={{
                    width: '100%',
                    height: 320,
                    borderRadius: 0,
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <img
                    src={supervisor.image}
                    alt={supervisor.name}
                    onError={handleImageError}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                    }}
                  />

                  {/* Department badge - GitHub style */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: isRTL ? 'auto' : 16,
                      left: isRTL ? 16 : 'auto',
                      bgcolor: alpha(colors.bgPrimary, 0.85),
                      color: colors.text,
                      py: 0.5,
                      px: 1.5,
                      borderRadius: '16px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      border: `1px solid ${colors.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      backdropFilter: 'blur(4px)',
                      zIndex: 5
                    }}
                  >
                    {getDepartmentIcon()}
                    <Typography variant="caption" sx={{ 
                      color: colors.text,
                      fontSize: '0.75rem'
                    }}>
                      {t('supervisorDetail.departmentLabel', {defaultValue: "Department"})}
                    </Typography>
                  </Box>

                  {/* Dark gradient overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '50%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      zIndex: 2,
                      pointerEvents: 'none'
                    }}
                  />
                </Box>
                
                <Box sx={{ p: 3, position: 'relative', zIndex: 2 }}>
                  <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 700,
                      color: colors.text,
                      direction: isRTL ? 'rtl' : 'ltr',
                      textAlign: isRTL ? 'right' : 'left',
                      mb: 0.5
                    }}
                  >
                    {supervisor.name}
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    color="primary" 
                    sx={{ 
                      color: colors.primaryBlue,
                      fontWeight: 600,
                      mb: 2,
                      direction: isRTL ? 'rtl' : 'ltr',
                      textAlign: isRTL ? 'right' : 'left'
                    }}
                  >
                    {supervisor.role}
                  </Typography>
                  
                  <Divider sx={{ my: 2, borderColor: colors.borderColor }} />

                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: 1,
                      fontWeight: 600,
                      color: colors.textSecondary,
                      direction: isRTL ? 'rtl' : 'ltr',
                      textAlign: isRTL ? 'right' : 'left',
                      textTransform: 'uppercase',
                      fontSize: '0.75rem'
                    }}
                  >
                    {t('supervisorDetail.departmentLabel', {defaultValue: "Department"})}
                  </Typography>

                  <Typography 
                    variant="body1"
                    sx={{ 
                      mb: 2,
                      direction: isRTL ? 'rtl' : 'ltr',
                      textAlign: isRTL ? 'right' : 'left',
                      color: colors.text,
                      fontWeight: 500
                    }}
                  >
                    {supervisor.department}
                  </Typography>

                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: 1,
                      fontWeight: 600,
                      color: colors.textSecondary,
                      direction: isRTL ? 'rtl' : 'ltr',
                      textAlign: isRTL ? 'right' : 'left',
                      textTransform: 'uppercase',
                      fontSize: '0.75rem'
                    }}
                  >
                    {t('supervisorDetail.expertise', {defaultValue: "Areas of Expertise"})}
                  </Typography>

                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1,
                    mb: 1,
                    direction: isRTL ? 'rtl' : 'ltr'
                  }}>
                    {getRelatedSkills().map((skill, index) => (
                      <Chip 
                        key={index} 
                        label={skill} 
                        size="small" 
                        sx={{
                          bgcolor: alpha(isDarkMode ? '#30363d' : '#f6f8fa', 0.7),
                          color: colors.textSecondary,
                          border: `1px solid ${colors.borderColor}`,
                          height: { xs: 24, sm: 26 },
                          borderRadius: '16px',
                          '& .MuiChip-label': {
                            fontSize: '0.75rem',
                            px: 1
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Supervisor biography - enhanced with GitHub style */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                sx={{
                  overflow: 'hidden',
                  position: 'relative',
                  border: `1px solid ${colors.borderColor}`,
                  bgcolor: colors.bgPrimary,
                  borderRadius: 2,
                  boxShadow: isDarkMode 
                    ? `0 4px 16px ${alpha('#000000', 0.3)}` 
                    : `0 4px 16px ${alpha('#0d1117', 0.1)}`,
                }}
              >
                <Box sx={{ p: 3, position: 'relative', zIndex: 2 }}>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 700, 
                      color: colors.primaryBlue,
                      mb: 3,
                      pb: 1,
                      borderBottom: `1px solid ${colors.borderColor}`,
                      direction: isRTL ? 'rtl' : 'ltr',
                      textAlign: isRTL ? 'right' : 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <IconCode size={20} />
                    {t('supervisorDetail.about')}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 2, 
                      lineHeight: 1.7,
                      color: colors.text,
                      direction: isRTL ? 'rtl' : 'ltr',
                      textAlign: isRTL ? 'right' : 'left'
                    }}
                  >
                    {supervisor.bio}
                  </Typography>
                  
                  {supervisor.extendedBio && (
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        lineHeight: 1.7,
                        color: colors.text,
                        direction: isRTL ? 'rtl' : 'ltr',
                        textAlign: isRTL ? 'right' : 'left'
                      }}
                    >
                      {supervisor.extendedBio}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SupervisorDetailSection;
