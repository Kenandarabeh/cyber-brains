import React, { useRef, useEffect } from 'react';
import { Box, Typography, Paper, Chip, Divider, useTheme, alpha, Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import defaultImage from 'src/assets/images/gallery/image 2.png';
import { IconCode, IconDeviceLaptop, IconDatabase, IconBrandGithub, IconRobot, IconCalendarEvent } from '@tabler/icons-react';

interface AlumniLeaderCardProps {
  id: number;
  name: string;
  role: string;
  period: string;
  bio: string;
  achievements: string;
  skills: string[];
  image: string;
}

const AlumniLeaderCard = ({
  id,
  name,
  role,
  period,
  bio,
  achievements,
  skills,
  image
}: AlumniLeaderCardProps) => {
  const theme = useTheme();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const customizer = useSelector((state: any) => state.customizer);
  const isDarkMode = customizer.activeMode === 'dark';
  
  // GitHub-styled colors
  const colors = {
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff', // زرقاء داكنة قليلاً مثل التذييل
    bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
    primaryGreen: isDarkMode ? '#2ea043' : '#2da44e',
    gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
    merged: isDarkMode ? '#a371f7' : '#8250df',
  };

  // Add refs and effects to handle image loading and positioning
  const imageRef = useRef<HTMLImageElement>(null);

  // Solution améliorée pour gérer les problèmes de l'image
  useEffect(() => {
    if (imageRef.current) {
      const img = imageRef.current;
      img.style.objectFit = 'cover';
      img.style.objectPosition = 'center top';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.display = 'block';
    }
  }, [image]); // Réappliquer après changement d'image

  // Add error handler for image loading issues
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Alumni leader image failed to load, using fallback image");
    e.currentTarget.src = defaultImage;
  };
  
  // Get tech icon based on ID
  const getTechIcon = () => {
    const iconIndex = id % 5;
    const icons = [
      <IconCode size={20} stroke={1.5} color={colors.primaryBlue} />,
      <IconDeviceLaptop size={20} stroke={1.5} color={colors.primaryBlue} />,
      <IconBrandGithub size={20} stroke={1.5} color={colors.primaryBlue} />,
      <IconDatabase size={20} stroke={1.5} color={colors.primaryBlue} />,
      <IconRobot size={20} stroke={1.5} color={colors.primaryBlue} />
    ];
    return icons[iconIndex];
  };

  return (
    <Paper
      elevation={0}
      component={motion.div}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        window.location.href = `/leader/${id}`;
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
      sx={{
        height: '100%',
        minHeight: '450px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${colors.borderColor}`,
        color: 'inherit',
        position: 'relative',
        backgroundColor: colors.bgPrimary,
        // تعديل الظل للتوافق مع الخلفية السوداء
        boxShadow: isDarkMode 
          ? `0 3px 15px ${alpha('#000000', 0.45)}` 
          : `0 3px 8px ${alpha('#0d1117', 0.12)}`,
        '&:hover': {
          boxShadow: isDarkMode 
            ? `0 8px 30px ${alpha('#000000', 0.6)}` 
            : `0 8px 28px ${alpha('#0d1117', 0.25)}`,
          borderColor: colors.primaryBlue,
          '& .leader-image': {
            transform: 'scale(1.05)'
          },
          '& .tech-badge': {
            transform: 'translateY(0)',
            opacity: 1
          },
          '& .card-grid-overlay': {
            opacity: 0.7
          }
        }
      }}
    >
      {/* GitHub-style grid background pattern - تحسين الشبكة لتتناسب مع التذييل */}
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
          backgroundSize: '25px 25px', // تعديل حجم الشبكة
          opacity: 0.25, // تعديل الشفافية
          zIndex: 1,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}
      />

      {/* Image container with improved styling */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '200px', sm: '200px', md: '220px' },
          overflow: 'hidden',
          zIndex: 2
        }}
      >
        <img
          ref={imageRef}
          className="leader-image"
          src={image}
          alt={name}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            transition: 'transform 0.6s ease',
            display: 'block'
          }}
        />

        {/* Period badge - GitHub style */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: isRTL ? 'auto' : 12,
            left: isRTL ? 12 : 'auto',
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
            zIndex: 3
          }}
        >
          <IconCalendarEvent size={14} style={{ opacity: 0.9 }} />
          {period}
        </Box>
        
        {/* Technology badge - GitHub style */}
        <Box 
          className="tech-badge"
          sx={{
            position: 'absolute',
            bottom: 12,
            [isRTL ? 'right' : 'left']: 12,
            bgcolor: alpha(colors.bgPrimary, 0.9),
            border: `1px solid ${colors.borderColor}`,
            borderRadius: '16px',
            px: 1.5,
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            transform: 'translateY(10px)',
            opacity: 0,
            transition: 'all 0.3s ease',
            zIndex: 3
          }}
        >
          {getTechIcon()}
          <Typography variant="caption" sx={{ color: colors.text, fontWeight: 600 }}>
            {t('alumniLeaders.techBadge', {defaultValue: "Tech Expert"})}
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

      {/* Content */}
      <Box
        sx={{
          p: { xs: 2, md: 2.5 },
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          textAlign: isRTL ? 'right' : 'left',
          direction: isRTL ? 'rtl' : 'ltr',
          position: 'relative',
          zIndex: 2,
          borderTop: `1px solid ${colors.borderColor}`
        }}
      >
        {/* Name & Role */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 0.5,
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            color: colors.text,
            lineHeight: 1.3
          }}
        >
          {name}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            color: colors.primaryBlue,
            mb: 1.5,
            fontWeight: 600,
            fontSize: { xs: '0.8rem', sm: '0.85rem' }
          }}
        >
          {role}
        </Typography>

        {/* Bio */}
        <Typography
          variant="body2"
          sx={{
            mb: 1.5,
            color: colors.textSecondary,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: { xs: 2, sm: 3, md: 3 },
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: { xs: '0.75rem', sm: '0.8rem' }
          }}
        >
          {bio}
        </Typography>

        <Divider sx={{ 
          my: 1.5,
          borderColor: colors.borderColor,
          opacity: 0.6
        }} />

        {/* Skills - GitHub tag style */}
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mb: 0.7,
              fontWeight: 600,
              color: colors.textSecondary,
              textTransform: 'uppercase',
            }}
          >
            {t('alumniLeaders.skillsLabel', {defaultValue: "Skills"})}:
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.7,
              justifyContent: isRTL ? 'flex-end' : 'flex-start'
            }}
          >
            {skills.slice(0, 3).map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  bgcolor: alpha(isDarkMode ? '#30363d' : '#f6f8fa', 0.7),
                  color: colors.textSecondary,
                  border: `1px solid ${colors.borderColor}`,
                  height: { xs: 22, sm: 24 },
                  borderRadius: '16px',
                  '& .MuiChip-label': {
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                    px: 1
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Achievements - Bottom section with GitHub PR style */}
        <Box
          sx={{
            mt: 'auto',
            pt: 1,
            borderTop: `1px solid ${colors.borderColor}`,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mb: 0.5,
              fontWeight: 600,
              color: colors.textSecondary,
              textTransform: 'uppercase'
            }}
          >
            {t('alumniLeaders.achievementsLabel', {defaultValue: "Achievements"})}:
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: colors.textSecondary,
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.5
            }}
          >
            {achievements.split(',')[0]}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default AlumniLeaderCard;
