import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Paper,
  Stack,
  Divider,
  useTheme,
  alpha,
  Button,
  Link as MuiLink,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultImage from 'src/assets/images/gallery/image 2.png';
import { 
  IconBrandGithub, 
  IconBrandLinkedin, 
  IconMail, 
  IconPhone, 
  IconBrandTwitter,
  IconCode, 
  IconDeviceDesktop,
  IconArrowLeft,
  IconArrowRight,
  IconRobot,
  IconAward,
  IconBrandReact,
  IconBrandNodejs,
  IconBrandJavascript,
  IconBrandPython,
  IconBrandPhp,
  IconFolderCode,
  IconCodeCircle,
  IconStars,
  IconDeviceLaptop,
  IconCertificate,
  IconTrophy,
  IconBrandFigma,
  IconHeartHandshake,
  IconBulb,
  IconStar,
  IconChecks,
  IconBriefcase
} from '@tabler/icons-react';

interface LeaderDetailSectionProps {
  leader: any;
}

const LeaderDetailSection: React.FC<LeaderDetailSectionProps> = ({ leader }) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const customizer = useSelector((state: any) => state.customizer);
  const navigate = useNavigate();
  const isDarkMode = customizer.activeMode === 'dark';
  
  // State for tabs
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
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
  
  const getTechIcon = () => {
    const iconIndex = (leader.id || 1) % 3;
    const icons = [
      <IconCode size={20} stroke={1.5} color={colors.primaryBlue} />,
      <IconDeviceDesktop size={20} stroke={1.5} color={colors.primaryBlue} />,
      <IconRobot size={20} stroke={1.5} color={colors.primaryBlue} />
    ];
    return icons[iconIndex];
  };
  
  // Update the frameworks access to handle both structures
  const getFrameworks = () => {
    // Try technologiesData.frameworks first
    const fromData = t('leaderDetail.technologiesData.frameworks', { returnObjects: true });
    if (Array.isArray(fromData) && fromData.length > 0) {
      return fromData;
    }
    
    // Fallback to technologies.frameworks
    const fromTech = t('leaderDetail.technologies.frameworks', { returnObjects: true });
    if (Array.isArray(fromTech) && fromTech.length > 0) {
      return fromTech;
    }
    
    // Default frameworks if neither path works
    return [
      { name: 'React.js', icon: 'react' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Python', icon: 'python' },
      { name: 'PHP', icon: 'php' },
      { name: 'Figma', icon: 'figma' }
    ];
  };

  const frameworks = getFrameworks();
  
  // دالة للحصول على أيقونة مناسبة لكل تقنية
  const getFrameworkIcon = (iconType: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'react': <IconBrandReact size={20} color={isDarkMode ? '#61DAFB' : '#61DAFB'} />,
      'nodejs': <IconBrandNodejs size={20} color={isDarkMode ? '#6CC24A' : '#6CC24A'} />,
      'javascript': <IconBrandJavascript size={20} color={isDarkMode ? '#F7DF1E' : '#F7DF1E'} />,
      'python': <IconBrandPython size={20} color={isDarkMode ? '#3776AB' : '#3776AB'} />,
      'php': <IconBrandPhp size={20} color={isDarkMode ? '#777BB4' : '#777BB4'} />,
      'figma': <IconBrandFigma size={20} color={isDarkMode ? '#F24E1E' : '#F24E1E'} />,
    };
    
    return iconMap[iconType] || <IconCode size={20} color={colors.primaryBlue} />;
  };
  
  // الحصول على الإنجازات من ملف الترجمة
  const achievements = t('leaderDetail.achievements', { returnObjects: true }) || [];
  
  // مصفوفة أيقونات الإنجازات
  const achievementIcons = [
    <IconTrophy size={20} color={colors.primaryGreen} />,
    <IconCertificate size={20} color={colors.primaryBlue} />,
    <IconHeartHandshake size={20} color={colors.secondaryColor} />,
    <IconStars size={20} color={colors.merged} />
  ];
  
  // الحصول على الشهادات من ملف الترجمة
  const certifications = t('leaderDetail.certifications', { returnObjects: true }) || [];
  
  // الحصول على المشاريع من ملف الترجمة
  const projects = t('leaderDetail.projects', { returnObjects: true }) || [];

  // الحصول على وسائل التواصل الاجتماعي
  const socialLinks = [
    { icon: <IconBrandGithub size={20} />, url: "#" },
    { icon: <IconBrandLinkedin size={20} />, url: "#" },
    { icon: <IconBrandTwitter size={20} />, url: "#" }
  ];

  // معلومات الاتصال
  const contactInfo = [
    { icon: <IconMail size={18} />, value: "leader@cyberbrains.dz" },
    { icon: <IconPhone size={18} />, value: "+213 00 00 00 00" }
  ];

  // علامات التبويب من ملف الترجمة
  const tabs = [
    { icon: <IconCodeCircle size={18} />, label: t('leaderDetail.tabs.about') },
    { icon: <IconFolderCode size={18} />, label: t('leaderDetail.tabs.projects') },
    { icon: <IconAward size={18} />, label: t('leaderDetail.tabs.achievements') }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Image failed to load, using fallback");
    e.currentTarget.src = defaultImage;
  };

  const getProjectImage = (index: number) => {
    return leader.image || defaultImage;
  };

  // المهارات المهنية الإضافية
  const additionalSkills = [
    "Team Leadership",
    "Project Management",
    "Creative Direction",
    "Strategic Planning",
    "Design Thinking"
  ];

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
            {t('leaderDetail.backToTeam')}
          </Button>
        </Box>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={4}>
            {/* Left column - Profile card */}
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
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
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={leader.image}
                      alt={leader.name}
                      onError={handleImageError}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block'
                      }}
                    />
                    
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
                      {getTechIcon()}
                      <Typography variant="caption" sx={{ 
                        color: colors.text,
                        fontSize: '0.75rem'
                      }}>
                        {t('leadership.techBadge')}
                      </Typography>
                    </Box>

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
                      sx={{ 
                        fontWeight: 700,
                        color: colors.text,
                        direction: isRTL ? 'rtl' : 'ltr',
                        textAlign: isRTL ? 'right' : 'left',
                        mb: 0.5
                      }}
                    >
                      {leader.name}
                    </Typography>
                    
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: colors.primaryBlue,
                        fontWeight: 600,
                        mb: 2,
                        direction: isRTL ? 'rtl' : 'ltr',
                        textAlign: isRTL ? 'right' : 'left'
                      }}
                    >
                      {leader.role}
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
                      {t('leadership.leader.skillsLabel')}
                    </Typography>
                    <Box sx={{ 
                      mb: 3, 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 1,
                      direction: isRTL ? 'rtl' : 'ltr'
                    }}>
                      {leader.skills.map((skill: string, index: number) => (
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
                      {t('leadership.leader.achievementsLabel')}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: colors.text,
                        direction: isRTL ? 'rtl' : 'ltr',
                        textAlign: isRTL ? 'right' : 'left',
                        fontSize: '0.875rem',
                        lineHeight: 1.6
                      }}
                    >
                      {leader.achievements}
                    </Typography>

                    <Divider sx={{ my: 2, borderColor: colors.borderColor }} />
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        mb: 1.5,
                        fontWeight: 600,
                        color: colors.textSecondary,
                        direction: isRTL ? 'rtl' : 'ltr',
                        textAlign: isRTL ? 'right' : 'left',
                        textTransform: 'uppercase',
                        fontSize: '0.75rem'
                      }}
                    >
                      {t('leaderDetail.contact')}
                    </Typography>

                    <Stack 
                      direction="row"
                      spacing={1}
                      sx={{ 
                        mb: 1,
                        gap: 1,
                      }}
                    >
                      {socialLinks.map((link, index) => (
                        <MuiLink key={index} href={link.url} underline="none">
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '6px',
                              bgcolor: isDarkMode ? alpha(colors.primaryBlue, 0.2) : alpha(colors.primaryBlue, 0.1),
                              color: colors.primaryBlue,
                              '&:hover': { 
                                bgcolor: isDarkMode ? alpha(colors.primaryBlue, 0.3) : alpha(colors.primaryBlue, 0.15),
                              }
                            }}
                          >
                            {link.icon}
                          </Box>
                        </MuiLink>
                      ))}
                    </Stack>

                    <Stack spacing={1.5} sx={{ mt: 2 }}>
                      {contactInfo.map((contact, index) => (
                        <Box 
                          key={index}
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              minWidth: 36,
                              height: 36,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '6px',
                              bgcolor: isDarkMode ? alpha('#30363d', 0.7) : alpha('#f6f8fa', 0.7),
                              color: colors.textSecondary
                            }}
                          >
                            {contact.icon}
                          </Box>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: colors.text,
                              direction: isRTL ? 'rtl' : 'ltr',
                              textAlign: isRTL ? 'right' : 'left'
                            }}
                          >
                            {contact.value}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Paper>
              </Stack>
            </Grid>

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
                <Box 
                  sx={{ 
                    borderBottom: 1,
                    borderColor: colors.borderColor,
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                      '& .MuiTab-root': {
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: colors.textSecondary,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        minHeight: '48px',
                        px: 2,
                        '&:hover': {
                          color: colors.primaryBlue,
                        },
                        '&.Mui-selected': {
                          color: colors.text,
                          fontWeight: 600,
                        }
                      },
                      '& .MuiTabs-indicator': {
                        backgroundColor: colors.primaryBlue,
                        height: 2,
                      }
                    }}
                  >
                    {tabs.map((tab, index) => (
                      <Tab 
                        key={index}
                        icon={tab.icon} 
                        iconPosition="start"
                        label={tab.label} 
                      />
                    ))}
                  </Tabs>
                </Box>
                
                <Box 
                  role="tabpanel"
                  hidden={tabValue !== 0}
                  sx={{ p: 3, position: 'relative', zIndex: 2 }}
                >
                  {tabValue === 0 && (
                    <Box>
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
                        <IconCodeCircle size={20} />
                        {t('leaderDetail.about')}
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
                        {leader.bio}
                      </Typography>
                      
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mb: 3,
                          lineHeight: 1.7,
                          color: colors.text,
                          direction: isRTL ? 'rtl' : 'ltr',
                          textAlign: isRTL ? 'right' : 'left'
                        }}
                      >
                        {leader.about}
                      </Typography>
                      
                      <Typography 
                        variant="h6"
                        sx={{ 
                          mb: 2, 
                          fontWeight: 600,
                          color: colors.text,
                          direction: isRTL ? 'rtl' : 'ltr',
                          textAlign: isRTL ? 'right' : 'left',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <IconDeviceLaptop size={18} />
                        {t('leaderDetail.technologies')}
                      </Typography>
                      
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        {frameworks.map((framework: any, index: number) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                              sx={{
                                p: 1.5,
                                bgcolor: alpha(isDarkMode ? '#161b22' : '#f6f8fa', 0.7),
                                borderRadius: 1,
                                border: `1px solid ${colors.borderColor}`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                              }}
                            >
                              {getFrameworkIcon(framework.icon)}
                              <Typography variant="body2" sx={{ 
                                fontWeight: 500,
                                color: colors.text
                              }}>
                                {framework.name}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </Box>
                
                <Box 
                  role="tabpanel"
                  hidden={tabValue !== 1}
                  sx={{ p: 3, position: 'relative', zIndex: 2 }}
                >
                  {tabValue === 1 && (
                    <Box>
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
                        <IconFolderCode size={20} />
                        {t('leaderDetail.featuredProjects')}
                      </Typography>

                      {Object.entries(projects).map(([key, project]: [string, any], index: number) => (
                        <React.Fragment key={key}>
                          {index > 0 && <Divider sx={{ my: 3, borderColor: colors.borderColor }} />}
                          <Box sx={{ mb: index === Object.entries(projects).length - 1 ? 0 : 4 }}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={4}>
                                <Box
                                  sx={{
                                    height: 140,
                                    width: '100%',
                                    borderRadius: 1,
                                    overflow: 'hidden',
                                    border: `1px solid ${colors.borderColor}`
                                  }}
                                >
                                  <img 
                                    src={getProjectImage(index)}
                                    alt={project.title}
                                    style={{ 
                                      width: '100%', 
                                      height: '100%', 
                                      objectFit: 'cover' 
                                    }}
                                    onError={handleImageError}
                                  />
                                </Box>
                              </Grid>
                              <Grid item xs={12} md={8}>
                                <Typography 
                                  variant="h6" 
                                  gutterBottom
                                  sx={{ 
                                    fontWeight: 600,
                                    color: colors.text,
                                    direction: isRTL ? 'rtl' : 'ltr',
                                    textAlign: isRTL ? 'right' : 'left'
                                  }}
                                >
                                  {project.title}
                                </Typography>
                                <Typography 
                                  variant="body2"
                                  sx={{ 
                                    color: colors.textSecondary, 
                                    mb: 2,
                                    direction: isRTL ? 'rtl' : 'ltr',
                                    textAlign: isRTL ? 'right' : 'left'
                                  }}
                                >
                                  {project.description}
                                </Typography>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderColor: colors.borderColor,
                                    color: colors.text,
                                    textTransform: 'none',
                                    '&:hover': {
                                      borderColor: colors.primaryBlue,
                                      bgcolor: alpha(colors.primaryBlue, 0.1),
                                    },
                                    direction: isRTL ? 'rtl' : 'ltr',
                                  }}
                                  startIcon={isRTL ? null : <IconCode size={16} />}
                                  endIcon={isRTL ? <IconCode size={16} /> : null}
                                >
                                  {t('leaderDetail.viewProject')}
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </React.Fragment>
                      ))}
                    </Box>
                  )}
                </Box>
                
                <Box 
                  role="tabpanel"
                  hidden={tabValue !== 2}
                  sx={{ p: 3, position: 'relative', zIndex: 2 }}
                >
                  {tabValue === 2 && (
                    <Box>
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
                        <IconAward size={20} />
                        {t('leaderDetail.tabs.achievements')}
                      </Typography>
                      
                      <List sx={{ mb: 4 }}>
                        {Object.entries(achievements).map(([key, achievement], index) => (
                          <ListItem 
                            key={key}
                            alignItems="flex-start"
                            sx={{
                              px: 0.5,
                              py: 2,
                              borderBottom: index < Object.entries(achievements).length - 1 ? `1px solid ${colors.borderColor}` : 'none',
                            }}
                          >
                            <ListItemIcon 
                              sx={{ 
                                minWidth: 36, 
                                mr: isRTL ? 0 : 2,
                                ml: isRTL ? 2 : 0
                              }}
                            >
                              {achievementIcons[index % achievementIcons.length]}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography 
                                  variant="h6" 
                                  sx={{ 
                                    fontSize: '1rem', 
                                    fontWeight: 600, 
                                    color: colors.text,
                                    mb: 0.5,
                                    textAlign: isRTL ? 'right' : 'left'
                                  }}
                                >
                                  {achievement.title}
                                </Typography>
                              }
                              secondary={
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    color: colors.textSecondary,
                                    textAlign: isRTL ? 'right' : 'left'
                                  }}
                                >
                                  {achievement.description}
                                </Typography>
                              }
                              sx={{
                                margin: 0,
                                direction: isRTL ? 'rtl' : 'ltr',
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      
                      <Typography 
                        variant="h6"
                        sx={{ 
                          my: 2, 
                          fontWeight: 600,
                          color: colors.text,
                          direction: isRTL ? 'rtl' : 'ltr',
                          textAlign: isRTL ? 'right' : 'left',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <IconBulb size={18} />
                        {t('leaderDetail.professionalSkills')}
                      </Typography>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 1,
                        mb: 4,
                      }}>
                        {leader.skills.concat(additionalSkills).map((skill: string, index: number) => (
                          <Chip 
                            key={index}
                            icon={<IconStar size={14} />}
                            label={skill} 
                            sx={{
                              bgcolor: alpha(isDarkMode ? '#30363d' : '#f6f8fa', 0.7),
                              color: colors.text,
                              border: `1px solid ${colors.borderColor}`,
                              '& .MuiChip-icon': {
                                color: index % 2 === 0 ? colors.primaryBlue : colors.secondaryColor,
                                mr: isRTL ? 0 : 0.5,
                                ml: isRTL ? 0.5 : 0,
                              }
                            }}
                          />
                        ))}
                      </Box>
                      
                      <Typography 
                        variant="h6"
                        sx={{ 
                          mb: 2, 
                          fontWeight: 600,
                          color: colors.text,
                          direction: isRTL ? 'rtl' : 'ltr',
                          textAlign: isRTL ? 'right' : 'left',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          borderTop: `1px solid ${colors.borderColor}`,
                          pt: 3
                        }}
                      >
                        <IconCertificate size={18} />
                        {t('leaderDetail.certificationsTitle') || t('leaderDetail.certifications')}
                      </Typography>
                      
                      <List>
                        {Object.entries(typeof certifications === 'object' ? certifications : {}).map(([key, cert]: [string, any], index: number) => (
                          <ListItem 
                            key={key}
                            alignItems="flex-start"
                            sx={{
                              px: 0.5,
                              py: 1,
                            }}
                          >
                            <ListItemIcon 
                              sx={{ 
                                minWidth: 32, 
                                mr: isRTL ? 0 : 2,
                                ml: isRTL ? 2 : 0
                              }}
                            >
                              <IconChecks size={18} color={colors.primaryGreen} />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography 
                                  variant="body1" 
                                  sx={{ 
                                    fontWeight: 500, 
                                    color: colors.text,
                                    mb: 0,
                                    textAlign: isRTL ? 'right' : 'left'
                                  }}
                                >
                                  {cert.name}
                                </Typography>
                              }
                              secondary={
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    color: colors.textSecondary,
                                    display: 'block',
                                    mt: 0.5,
                                    textAlign: isRTL ? 'right' : 'left'
                                  }}
                                >
                                  {cert.issuer} &bull; {cert.year}
                                </Typography>
                              }
                              sx={{
                                margin: 0,
                                direction: isRTL ? 'rtl' : 'ltr',
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
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

export default LeaderDetailSection;
