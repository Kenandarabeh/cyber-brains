import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, useTheme, useMediaQuery, alpha, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import defaultImage from 'src/assets/images/gallery/image 2.png';
import { IconBuildingCommunity, IconBrain, IconSchool, IconBook } from '@tabler/icons-react';

interface SupervisorCardProps {
  id: number;
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
}

const SupervisorCard = ({ id, name, role, department, image, bio }: SupervisorCardProps) => {
  const theme = useTheme();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
  
  // Référence à l'élément image
  const imgRef = useRef<HTMLImageElement>(null);
  
  // État pour suivre si l'image est chargée
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageHeight, setImageHeight] = useState('240px');
  const [objectPosition, setObjectPosition] = useState('top center');
  
  // Gérer le chargement des images
  const handleImageLoad = () => {
    setImageLoaded(true);
    updateImageDisplayProperties();
  };
  
  // Gérer les erreurs d'images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Supervisor image failed to load, using fallback");
    e.currentTarget.src = defaultImage;
    setImageLoaded(true);
  };

  // Choose an icon based on the supervisor's ID or department
  const getDepartmentIcon = () => {
    const iconIndex = id % 4;
    const icons = [
      <IconBuildingCommunity size={18} stroke={1.5} color={colors.primaryBlue} />,
      <IconBrain size={18} stroke={1.5} color={colors.primaryBlue} />,
      <IconSchool size={18} stroke={1.5} color={colors.primaryBlue} />,
      <IconBook size={18} stroke={1.5} color={colors.primaryBlue} />
    ];
    return icons[iconIndex];
  };

  // Fonction pour mettre à jour les propriétés d'affichage de l'image en fonction de la taille de l'écran
  const updateImageDisplayProperties = () => {
    if (isMobile) {
      setImageHeight('260px'); // Plus grande pour mobile
      setObjectPosition('top center');
    } else {
      setImageHeight('220px');
      setObjectPosition('center center');
    }
  };
  
  // Mettre à jour les propriétés lorsque la taille de l'écran change
  useEffect(() => {
    updateImageDisplayProperties();
    
    // Ajouter un écouteur de redimensionnement pour gérer les transitions de taille d'écran
    const handleResize = () => {
      updateImageDisplayProperties();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);
  
  // Assurer que l'image est correctement affichée après le chargement
  useEffect(() => {
    // Appliquer des styles initiaux
    if (imgRef.current) {
      imgRef.current.style.objectFit = 'cover';
      imgRef.current.style.height = '100%';
      imgRef.current.style.width = '100%';
      imgRef.current.style.objectPosition = objectPosition;
    }
  }, [imageLoaded, objectPosition]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      style={{ height: '100%', minHeight: '300px' }}
    >
      <Paper
        elevation={0}
        component="div"
        onClick={() => {
          window.location.href = `/supervisor/${id}`;
        }}
        sx={{
          width: '100%',
          height: '100%',
          minHeight: { xs: '460px', sm: '320px' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${colors.borderColor}`,
          backgroundColor: colors.bgPrimary,
          transition: 'all 0.3s ease',
          color: 'inherit',
          cursor: 'pointer',
          boxShadow: isDarkMode 
            ? `0 3px 12px ${alpha('#000000', 0.4)}` 
            : `0 3px 8px ${alpha('#0d1117', 0.12)}`,
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: isDarkMode 
              ? `0 8px 30px ${alpha('#000000', 0.55)}` 
              : `0 8px 28px ${alpha('#0d1117', 0.2)}`,
            borderColor: colors.primaryBlue,
            '& .supervisor-image': {
              transform: 'scale(1.05)'
            },
            '& .card-grid-overlay': {
              opacity: 0.7
            }
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
            backgroundSize: '25px 25px',
            opacity: 0.3,
            zIndex: 1,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
          }}
        />

        {/* Image container with improved styling */}
        <Box
          className="supervisor-image-container"
          sx={{
            width: '100%',
            height: { xs: imageHeight, sm: '220px', md: '250px' },
            position: 'relative',
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          {/* Department badge - GitHub style */}
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
              zIndex: 5
            }}
          >
            {getDepartmentIcon()}
            <Typography variant="caption" sx={{ 
              color: colors.text,
              maxWidth: '140px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'block',
              fontSize: { xs: '0.65rem', sm: '0.75rem' }
            }}>
              {t('supervisors.departmentLabel')}
            </Typography>
          </Box>

          {/* Image with enhanced styling */}
          <img
            ref={imgRef}
            src={image}
            alt={name}
            className="supervisor-image"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: objectPosition,
              transition: 'transform 0.6s ease',
              display: 'block'
            }}
          />

          {/* Dark gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              zIndex: 3,
              pointerEvents: 'none'
            }}
          />
        </Box>

        <Box
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
            width: '100%',
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
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: colors.text,
              textAlign: isRTL ? 'right' : 'left',
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' },
              lineHeight: 1.3
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              mb: 0.5,
              color: colors.primaryBlue,
              fontWeight: 600,
              textAlign: isRTL ? 'right' : 'left',
              fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' }
            }}
          >
            {role}
          </Typography>

          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={department}
              size="small"
              sx={{
                bgcolor: alpha(isDarkMode ? '#30363d' : '#f6f8fa', 0.7),
                color: colors.textSecondary,
                border: `1px solid ${colors.borderColor}`,
                height: { xs: 24, sm: 26 },
                borderRadius: '16px',
                '& .MuiChip-label': {
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  px: 1
                },
                maxWidth: '100%',
                '& .MuiChip-label': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }
              }}
            />
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: colors.textSecondary,
              textAlign: isRTL ? 'right' : 'left',
              direction: isRTL ? 'rtl' : 'ltr',
              display: '-webkit-box',
              WebkitLineClamp: { xs: 3, sm: 3, md: 4 },
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
              lineHeight: 1.5,
              mb: 1,
              mt: 'auto'
            }}
          >
            {bio}
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default SupervisorCard;
