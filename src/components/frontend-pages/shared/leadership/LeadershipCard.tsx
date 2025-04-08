import React from 'react';
import { Box, Typography, Stack, useTheme, Paper, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import defaultLeaderImage from 'src/assets/images/gallery/image 2.png';
import { IconCode, IconBrain, IconDeviceDesktop, IconRobot } from '@tabler/icons-react';

interface LeadershipCardProps {
  id: number;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  achievements: string;
  image: string;
}

const LeadershipCard = (props: LeadershipCardProps) => {
  const { id, name, role, bio, skills, achievements, image } = props;
  const theme = useTheme();
  const { i18n, t } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const customizer = useSelector((state: any) => state.customizer);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const isDarkMode = customizer.activeMode === 'dark';

  // GitHub-styled colors - updated to match Footer
  const colors = {
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff', // زرقاء داكنة قليلاً مثل الـ Footer
    bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
    primaryGreen: isDarkMode ? '#2ea043' : '#2da44e',
    gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
    merged: isDarkMode ? '#a371f7' : '#8250df',
  };

  // Enhanced error handler for image loading
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Leader image failed to load, using fallback image");
    e.currentTarget.src = defaultLeaderImage;
  };
  
  // Apply proper image adjustments after load
  React.useEffect(() => {
    if (imageRef.current) {
      const img = imageRef.current;
      img.style.objectFit = 'cover';
      img.style.objectPosition = 'center top';
    }
  }, []);

  // Choose tech icon based on ID
  const getTechIcon = () => {
    const iconIndex = id % 4;
    const icons = [
      <IconCode size={18} stroke={1.5} color={colors.primaryBlue} />,
      <IconBrain size={18} stroke={1.5} color={colors.primaryBlue} />,
      <IconDeviceDesktop size={18} stroke={1.5} color={colors.primaryBlue} />,
      <IconRobot size={18} stroke={1.5} color={colors.primaryBlue} />
    ];
    return icons[iconIndex];
  };

  return (
    <Paper
      elevation={0}
      component={Link}
      to={`/leader/${id}`}
      dir={isRtl ? 'rtl' : 'ltr'}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        cursor: 'pointer',
        bgcolor: colors.bgPrimary,
        border: `1px solid ${colors.borderColor}`,
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        outline: 'none',
        boxShadow: isDarkMode 
          ? `0 3px 12px ${alpha('#000000', 0.3)}` 
          : `0 3px 6px ${alpha('#0d1117', 0.1)}`,
        textDirection: isRtl ? 'rtl' : 'ltr',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: isDarkMode 
            ? `0 8px 24px ${alpha('#000000', 0.4)}` 
            : `0 8px 24px ${alpha('#0d1117', 0.2)}`,
          borderColor: colors.primaryBlue,
          '& .card-grid-overlay': {
            opacity: 0.7,
          },
          '& .tech-badge': {
            transform: 'translateY(0)',
            opacity: 1,
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${colors.primaryBlue}, ${colors.secondaryColor})`,
        }
      }}
    >
      {/* GitHub-style grid background pattern */}
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
          opacity: 0.3,
          zIndex: 1,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Image section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 200, sm: 220 },
          overflow: 'hidden',
          zIndex: 2
        }}
      >
        <img
          ref={imageRef}
          src={image}
          alt={name}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block'
          }}
          loading="lazy"
        />

        {/* Technology badge - GitHub style */}
        <Box 
          className="tech-badge"
          sx={{
            position: 'absolute',
            top: 12,
            [isRtl ? 'left' : 'right']: 12,
            bgcolor: alpha(colors.bgPrimary, 0.9),
            border: `1px solid ${colors.borderColor}`,
            borderRadius: '16px',
            px: 1.5,
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            transform: 'translateY(-10px)',
            opacity: 0,
            transition: 'all 0.3s ease',
            zIndex: 3
          }}
        >
          {getTechIcon()}
          <Typography variant="caption" sx={{ color: colors.text, fontWeight: 600 }}>
            {t('leadership.techBadge')}
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
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))',
            zIndex: 2
          }}
        />
      </Box>

      {/* Content section */}
      <Box 
        dir={isRtl ? 'rtl' : 'ltr'}
        sx={{ 
          p: { xs: 2, md: 2.5 },
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 2,
          bgcolor: colors.bgPrimary,
          borderTop: `1px solid ${colors.borderColor}`,
          textAlign: isRtl ? 'right' : 'left',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            color: colors.text,
            textAlign: isRtl ? 'right' : 'left',
            mb: 0.5
          }}
        >
          {name}
        </Typography>
        
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            color: colors.primaryBlue,
            textAlign: isRtl ? 'right' : 'left',
            mb: 1.5
          }}
        >
          {role}
        </Typography>
        
        <Typography
          variant="body2"
          sx={{
            color: colors.textSecondary,
            textAlign: isRtl ? 'right' : 'left',
            display: '-webkit-box',
            WebkitLineClamp: { xs: 2, md: 3 },
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: { xs: '0.75rem', md: '0.875rem' },
            mb: 1.5
          }}
        >
          {bio}
        </Typography>

        {/* Skills section - GitHub tag style */}
        <Typography
          variant="caption"
          sx={{
            textTransform: 'uppercase',
            fontWeight: 600,
            color: colors.textSecondary,
            mb: 0.5,
            display: 'block',
            textAlign: isRtl ? 'right' : 'left'
          }}
        >
          {t('leadership.leader.skillsLabel')}:
        </Typography>
        
        <Stack
          direction={isRtl ? 'row-reverse' : 'row'}
          flexWrap="wrap"
          gap={0.7}
          mb={1.5}
          sx={{
            justifyContent: isRtl ? 'flex-end' : 'flex-start',
            direction: isRtl ? 'rtl' : 'ltr'
          }}
        >
          {skills.slice(0, 4).map((skill) => (
            <Box
              key={skill}
              sx={{
                px: 1.2,
                py: 0.3,
                borderRadius: '20px',
                fontSize: '0.7rem',
                bgcolor: alpha(isDarkMode ? '#30363d' : '#f6f8fa', 0.7),
                color: colors.textSecondary,
                border: `1px solid ${colors.borderColor}`,
              }}
            >
              {skill}
            </Box>
          ))}
        </Stack>

        {/* Achievements - GitHub PR style */}
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
              textTransform: 'uppercase',
              fontWeight: 600,
              color: colors.textSecondary,
              mb: 0.5,
              display: 'block',
              textAlign: isRtl ? 'right' : 'left'
            }}
          >
            {t('leadership.leader.achievementsLabel')}:
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: colors.textSecondary,
              textAlign: isRtl ? 'right' : 'left',
              display: '-webkit-box',
              WebkitLineClamp: { xs: 2, md: 2 },
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: { xs: '0.75rem', md: '0.825rem' }
            }}
          >
            {achievements}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default LeadershipCard;
