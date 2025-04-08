import React, { useRef, useState } from 'react';
import { Box, Typography, Chip, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { IconChevronRight, IconStarFilled, IconGitBranch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface RepoCardProps {
  repo: {
    name: string;
    description: string;
    stars: number;
    forks: number;
    tags: string[];
    icon: React.ReactNode;
  };
  index: number;
  colors: any;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, index, colors }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [hovering, setHovering] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate rotation based on mouse position
    const rotationX = (centerY - mouseY) / 15; // More rotation when mouse is far from center
    const rotationY = (mouseX - centerX) / 15;
    
    setRotateX(rotationX);
    setRotateY(rotationY);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setHovering(false);
  };
  
  return (
    <Box
      ref={cardRef}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        borderRadius: '8px',
        backgroundColor: colors.bgSecondary,
        border: `1px solid ${colors.borderColor}`,
        overflow: 'hidden',
        p: 3,
        height: '100%',
        transform: hovering ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)` : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'all 0.3s ease',
        boxShadow: hovering 
          ? `0 20px 40px ${alpha('#000', colors.isDarkMode ? 0.4 : 0.15)}` 
          : `0 6px 24px ${alpha('#000', colors.isDarkMode ? 0.25 : 0.08)}`,
      }}
    >
      {/* Repository name and icon */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 2, 
        gap: 1.5,
        flexDirection: isRtl ? 'row-reverse' : 'row' 
      }}>
        <Box 
          sx={{ 
            p: 1, 
            borderRadius: '6px',
            backgroundColor: colors.isDarkMode 
              ? 'rgba(88, 166, 255, 0.1)' 
              : 'rgba(9, 105, 218, 0.08)',
            color: colors.primaryBlue,
            order: isRtl ? 1 : 0
          }}
        >
          {repo.icon}
        </Box>
        
        <Typography 
          variant="h6" 
          sx={{
            fontWeight: 600,
            fontSize: '1.1rem',
            color: colors.text,
            textAlign: isRtl ? 'right' : 'left',
            width: '100%'
          }}
        >
          {repo.name}
        </Typography>
      </Box>
      
      {/* Repository description */}
      <Typography 
        variant="body2" 
        sx={{ 
          color: colors.textSecondary,
          mb: 2.5,
          lineHeight: 1.6,
          minHeight: '4.8rem',
          textAlign: isRtl ? 'right' : 'left',
          direction: isRtl ? 'rtl' : 'ltr'
        }}
      >
        {repo.description}
      </Typography>
      
      {/* Tags */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 1, 
        mb: 2,
        justifyContent: isRtl ? 'flex-end' : 'flex-start',
      }}>
        {repo.tags.map((tag, i) => (
          <Chip
            key={i}
            label={tag}
            size="small"
            sx={{
              bgcolor: colors.isDarkMode ? 'rgba(56, 139, 253, 0.1)' : 'rgba(9, 105, 218, 0.08)',
              color: colors.primaryBlue,
              fontWeight: 500,
              fontSize: '0.7rem',
              border: `1px solid ${colors.isDarkMode ? 'rgba(56, 139, 253, 0.2)' : 'rgba(9, 105, 218, 0.15)'}`,
              '& .MuiChip-label': {
                px: 1,
                textAlign: isRtl ? 'right' : 'left',
              },
            }}
          />
        ))}
      </Box>
      
      {/* Stats */}
      <Box 
        sx={{ 
          mt: 'auto', 
          pt: 2, 
          display: 'flex', 
          justifyContent: 'space-between',
          borderTop: `1px solid ${colors.borderColor}`,
          flexDirection: isRtl ? 'row-reverse' : 'row',
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          flexDirection: isRtl ? 'row-reverse' : 'row',
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5,
            flexDirection: isRtl ? 'row-reverse' : 'row',
          }}>
            <IconStarFilled size={16} style={{ color: colors.textSecondary }} />
            <Typography variant="caption" sx={{ color: colors.textSecondary }}>
              {repo.stars}
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5,
            flexDirection: isRtl ? 'row-reverse' : 'row',
          }}>
            <IconGitBranch size={16} style={{ color: colors.textSecondary }} />
            <Typography variant="caption" sx={{ color: colors.textSecondary }}>
              {repo.forks}
            </Typography>
          </Box>
        </Box>
        
        <Box 
          component={motion.div}
          animate={hovering ? { x: isRtl ? -3 : 3 } : { x: 0 }}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: colors.primaryBlue,
            gap: 0.5,
            cursor: 'pointer',
            flexDirection: isRtl ? 'row-reverse' : 'row',
          }}
        >
          <Typography 
            variant="caption"
            sx={{ 
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          >
            {t('HeaderBanner.viewDetails', 'Details')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RepoCard;
