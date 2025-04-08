import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  useTheme, 
  IconButton,
  Modal,
  Paper,
  Chip,
  alpha,
  Button,
  Avatar,
  Tooltip,
  useMediaQuery,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  IconX, 
  IconArrowRight,
  IconArrowLeft,
  IconArrowsMaximize,
  IconChevronRight,
  IconChevronLeft,
  IconCalendar,
  IconUsers,
  IconCamera,
  IconCode,
  IconFileCode,
  IconExternalLink,
  IconFolder
} from '@tabler/icons-react';

// Import images
import image1 from '../../../../assets/images/gallery/صورة 1.jpg';
import image2 from '../../../../assets/images/gallery/image 2.png';
import news1 from '../../../../assets/images/gallery/news.jpg';
import live1 from '../../../../assets/images/gallery/live.png';
import doc1 from '../../../../assets/images/gallery/radio.jpg';
import social1 from '../../../../assets/images/gallery/media.png';

// Member photo gallery settings - random scattered layout
const memberPhotoSettings = [
  // First row photos with rotation angles
  { 
    top: '0%', left: '2%', width: '30%', height: '35%', rotate: '-3deg', zIndex: 5,
    event: 'تدريب برمجة الذكاء الاصطناعي', date: '2023/05/15', fileId: 'AI-training'
  },
  { 
    top: '8%', left: '28%', width: '25%', height: '30%', rotate: '2deg', zIndex: 3,
    event: 'ورشة تصميم واجهات', date: '2023/06/22', fileId: 'UI-workshop'
  },
  { 
    top: '3%', left: '58%', width: '38%', height: '42%', rotate: '-2deg', zIndex: 4,
    event: 'حفل تكريم المتميزين', date: '2023/07/10', fileId: 'award-ceremony'
  },
  
  // Second row photos
  { 
    top: '42%', left: '0%', width: '35%', height: '38%', rotate: '3deg', zIndex: 2,
    event: 'مسابقة المشاريع التقنية', date: '2023/08/05', fileId: 'tech-competition'
  },
  { 
    top: '50%', left: '38%', width: '28%', height: '32%', rotate: '-1deg', zIndex: 6,
    event: 'لقاء خريجي النادي', date: '2023/09/18', fileId: 'alumni-meeting'
  },
  { 
    top: '45%', left: '65%', width: '32%', height: '45%', rotate: '2deg', zIndex: 3,
    event: 'زيارة شركات التقنية', date: '2023/10/25', fileId: 'industry-visit'
  },
];

// GitHub-styled BackgroundEffects like in Banner.tsx
const BackgroundEffects = ({ colors }) => (
  <>
    {/* Abstract shapes for visual interest */}
    <Box
      sx={{
        position: 'absolute',
        top: '5%',
        right: '10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${alpha(colors.primaryBlue, 0.08)} 0%, transparent 70%)`,
        zIndex: 0,
      }}
    />
    
    <Box
      sx={{
        position: 'absolute',
        top: '60%',
        left: '8%',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${alpha(colors.secondaryColor, 0.06)} 0%, transparent 70%)`,
        zIndex: 0,
      }}
    />
    
    {/* Subtle grid pattern */}
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
        zIndex: 0
      }}
    />
  </>
);

// Style like GitHub card component (without GitHub branding)
const PhotoCard = ({ image, index, config, onClick, colors, isRtl, isMobile = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  
  // الإعدادات المختلفة لوضع الهاتف مقابل الوضع العادي
  const cardStyle = isMobile ? {
    marginBottom: '24px', // زيادة الهامش الأسفل بين البطاقات في وضع الهاتف
    position: 'relative',
    height: '300px', // ارتفاع ثابت للصور في وضع الهاتف
  } : { 
    position: 'absolute',
    top: config.top,
    left: config.left,
    width: config.width,
    height: config.height,
    zIndex: config.zIndex,
  };
  
  const rotateStyle = isMobile ? {} : { rotate: config.rotate };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, ...rotateStyle }}
      animate={{ opacity: 1, y: 0, ...rotateStyle }}
      transition={{ 
        duration: 0.6, 
        delay: index * (isMobile ? 0.1 : 0.15),
        type: 'spring',
        stiffness: 80,
        damping: 15
      }}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Paper
        elevation={isHovered ? 8 : 3}
        sx={{
          height: '100%',
          width: '100%',
          borderRadius: '6px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          border: `1px solid ${isHovered ? colors.primaryBlue : colors.borderColor}`,
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: colors.bgPrimary,
          boxShadow: isHovered
            ? `0 8px 24px ${alpha('#000000', colors.isDarkMode ? 0.3 : 0.15)}`
            : `0 4px 12px ${alpha('#000000', colors.isDarkMode ? 0.25 : 0.1)}`
        }}
        onClick={() => onClick(index)}
      >
        {/* Repository-style header */}
        <Box sx={{ 
          height: '28px', 
          bgcolor: colors.bgSecondary,
          borderBottom: `1px solid ${colors.borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1.5,
          direction: isRtl ? 'rtl' : 'ltr'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconFolder size={14} style={{ color: colors.primaryBlue }} />
            <Typography variant="caption" sx={{ ml: 1, color: colors.textSecondary, fontSize: '0.7rem' }}>
              {config.fileId}.jpg
            </Typography>
          </Box>
          
          <Tooltip title={t("activities.showDetails")}>
            <IconButton size="small" sx={{ color: colors.textSecondary, p: 0.3 }}>
              <IconFileCode size={14} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Main image section */}
        <Box sx={{ position: 'relative', height: 'calc(100% - 28px - 36px)' }}>
          <Box
            component="img"
            src={image}
            alt={`Club event: ${config.event}`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          
          {/* Zoom icon on hover */}
          {isHovered && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
                borderRadius: '6px',
                bgcolor: alpha(colors.bgPrimary, 0.8),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.text,
                boxShadow: '0 0 20px rgba(0,0,0,0.3)',
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <IconArrowsMaximize size={24} />
            </Box>
          )}
          
          {/* Event tag */}
          <Chip
            size="small"
            label={config.event}
            sx={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              height: '24px',
              fontSize: '0.7rem',
              bgcolor: alpha(colors.primaryBlue, 0.15),
              color: colors.primaryBlue,
              border: `1px solid ${alpha(colors.primaryBlue, 0.3)}`,
              '& .MuiChip-label': {
                px: 1
              }
            }}
          />
        </Box>
        
        {/* Footer */}
        <Box sx={{ 
          height: '36px', 
          borderTop: `1px solid ${colors.borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          bgcolor: colors.bgSecondary,
          direction: isRtl ? 'rtl' : 'ltr'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconCalendar size={14} style={{ color: colors.textSecondary }} />
            <Typography variant="caption" sx={{ ml: 1, color: colors.textSecondary, fontSize: '0.75rem' }}>
              {config.date}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconCode size={14} style={{ color: colors.textSecondary }} />
            <Typography variant="caption" sx={{ ml: 1, color: colors.textSecondary, fontSize: '0.75rem' }}>
              CyberBrains
            </Typography>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

// Full screen image modal - Consistent with Banner.tsx style
const PhotoModal = ({ open, handleClose, currentImage, currentConfig, handleNextImage, handlePrevImage, colors, isRtl }) => {
  const { t } = useTranslation();
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '1000px',
          height: '85vh',
          bgcolor: colors.bgPrimary,
          borderRadius: '6px',
          outline: 'none',
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: `0 8px 32px ${alpha('#000000', 0.3)}`,
          border: `1px solid ${colors.borderColor}`,
          direction: isRtl ? 'rtl' : 'ltr'
        }}
      >
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: `1px solid ${colors.borderColor}`,
          bgcolor: colors.bgSecondary
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconFolder size={16} style={{ color: colors.primaryBlue, marginRight: '8px' }} />
            <Typography sx={{ color: colors.text, fontWeight: 600, fontSize: '0.9rem' }}>
              {currentConfig?.fileId || 'image'}.jpg
            </Typography>
          </Box>
          <IconButton size="small" onClick={handleClose} sx={{ color: colors.text }}>
            <IconX size={18} />
          </IconButton>
        </Box>
        
        {/* Tabs - Styled like Banner.tsx tabs */}
        <Box sx={{ 
          borderBottom: `1px solid ${colors.borderColor}`,
          display: 'flex',
          bgcolor: colors.bgSecondary
        }}>
          <Box
            sx={{
              px: 3,
              py: 1.5,
              color: colors.text,
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <IconCamera size={16} style={{ marginRight: '8px', color: colors.primaryBlue }} />
            {t('activities.image')}
          </Box>
        </Box>
        
        {/* Image container with GitHub-style checkboard pattern */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            bgcolor: colors.bgSecondary,
            backgroundImage: `
              linear-gradient(45deg, ${alpha(colors.borderColor, 0.5)} 25%, transparent 25%),
              linear-gradient(-45deg, ${alpha(colors.borderColor, 0.5)} 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, ${alpha(colors.borderColor, 0.5)} 75%),
              linear-gradient(-45deg, transparent 75%, ${alpha(colors.borderColor, 0.5)} 75%)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        >
          <Box
            component="img"
            src={currentImage}
            alt={currentConfig?.event || t('activities.clubEvent')}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          />
          
          {/* Navigation buttons */}
          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: 'absolute',
              [isRtl ? 'right' : 'left']: 16,
              bgcolor: alpha(colors.bgPrimary, 0.8),
              color: colors.text,
              border: `1px solid ${colors.borderColor}`,
              '&:hover': { bgcolor: alpha(colors.bgPrimary, 0.95) }
            }}
          >
            {isRtl ? <IconArrowRight size={20} /> : <IconArrowLeft size={20} />}
          </IconButton>
          
          <IconButton
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              [isRtl ? 'left' : 'right']: 16,
              bgcolor: alpha(colors.bgPrimary, 0.8),
              color: colors.text,
              border: `1px solid ${colors.borderColor}`,
              '&:hover': { bgcolor: alpha(colors.bgPrimary, 0.95) }
            }}
          >
            {isRtl ? <IconArrowLeft size={20} /> : <IconArrowRight size={20} />}
          </IconButton>
        </Box>
        
        {/* Footer with file info - حذف زر "عرض بالحجم الكامل" */}
        <Box sx={{ 
          p: 2,
          borderTop: `1px solid ${colors.borderColor}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: colors.bgSecondary
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                bgcolor: colors.primaryBlue,
                fontSize: '0.8rem',
                mr: 1.5
              }}
            >
              CB
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: colors.text, fontSize: '0.8rem' }}>
                {currentConfig?.event || t('activities.clubEvent')}
              </Typography>
              <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                {t('activities.capturedOn')} {currentConfig?.date || "2023/01/01"}
              </Typography>
            </Box>
          </Box>
          
          {/* تم حذف زر "عرض بالحجم الكامل" من هنا */}
        </Box>
      </Box>
    </Modal>
  );
};

const ActivitiesShowcase = () => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const { t, i18n } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRtl, setIsRtl] = useState(i18n.language === 'ar');
  
  const isDarkMode = theme.palette.mode === 'dark';
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  
  // Update RTL state when language changes
  useEffect(() => {
    setIsRtl(i18n.language === 'ar');
  }, [i18n.language]);
  
  // GitHub-styled colors - identical to Banner.tsx
  const colors = {
    isDarkMode,
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
    bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
    primaryGreen: isDarkMode ? '#2ea043' : '#2da44e',
    hoverGreen: isDarkMode ? '#3fb950' : '#2c974b',
    hoverBg: isDarkMode ? '#30363d' : '#f3f4f6',
    gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
  };
  
  // Array of imported images
  const images = [image1, image2, news1, live1, doc1, social1];
  
  // Handle image click to open modal
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };
  
  // Handle next/previous image navigation
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
  };
  
  // إضافة متغير لتحديد ما إذا كنا في وضع الهاتف (شاشات صغيرة) أم لا
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        pt: { xs: 6, md: 10 },
        pb: { xs: 10, md: 12 },
        bgcolor: colors.bgPrimary,
        borderBottom: `1px solid ${colors.borderColor}`,
        overflow: 'hidden',
      }}
      id="gallery"
    >
      {/* Matching background effects with Banner.tsx */}
      <BackgroundEffects colors={colors} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section header - Styled like Banner.tsx with gradient text and centered content */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ 
            mb: 6, 
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center'
          }}
        >
          <Typography
            component="span"
            sx={{
              color: colors.primaryBlue,
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              mb: 2,
              display: 'block'
            }}
          >
            {t('activities.subtitle')}
          </Typography>
          
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              mb: 3,
              background: `linear-gradient(135deg, ${colors.primaryBlue}, ${colors.secondaryColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            {t('activities.title')}
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: colors.textSecondary,
              fontSize: '1.1rem',
              mb: 5,
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            {t('activities.description')}
          </Typography>
          
          {/* إزالة قسم الإحصائيات (عدد الفعاليات والأعضاء والسنة الدراسية) */}
        </Box>

        {/* Photo display area - عرض مختلف حسب حجم الشاشة */}
        {isMobile ? (
          // عرض عمودي للصور في وضع الهاتف
          <Box sx={{ 
            mb: 6,
            display: 'flex',
            flexDirection: 'column',
            gap: 1 // إضافة مسافة متساوية بين جميع العناصر
          }}>
            {images.map((image, index) => (
              <Box 
                key={`photo-container-${index}`} 
                sx={{ 
                  mb: 4, // هامش إضافي أسفل كل صورة
                  height: '320px' // ارتفاع موحد لكل حاوية
                }}
              >
                <PhotoCard
                  key={`photo-${index}`}
                  image={image}
                  index={index}
                  config={memberPhotoSettings[index]}
                  onClick={handleImageClick}
                  colors={colors}
                  isRtl={isRtl}
                  isMobile={true}
                />
              </Box>
            ))}
          </Box>
        ) : (
          // عرض مبعثر للصور في الوضع العادي
          <Box
            sx={{
              position: 'relative',
              height: { xs: '1100px', sm: '900px', md: '750px' },
              mb: 6,
              border: `1px solid ${colors.borderColor}`,
              borderRadius: '6px',
              p: 2,
              bgcolor: alpha(colors.bgSecondary, 0.3)
            }}
          >
            {images.map((image, index) => (
              <PhotoCard
                key={`photo-${index}`}
                image={image}
                index={index}
                config={memberPhotoSettings[index]}
                onClick={handleImageClick}
                colors={colors}
                isRtl={isRtl}
                isMobile={false}
              />
            ))}
          </Box>
        )}
        
        {/* View more button - Styled like Banner.tsx */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"

              sx={{
                background: `linear-gradient(135deg, ${colors.primaryBlue}, ${colors.secondaryColor})`,
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                py: 1.5,
                px: 4,
                borderRadius: '6px',
                boxShadow: `0 8px 20px ${alpha(colors.primaryBlue, 0.3)}`,
                '&:hover': {
                  boxShadow: `0 10px 25px ${alpha(colors.primaryBlue, 0.4)}`,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {t('activities.viewAll')}
            </Button>
          </motion.div>
        </Box>
      </Container>

      {/* Image modal */}
      <PhotoModal
        open={modalOpen}
        handleClose={handleModalClose}
        currentImage={images[currentImageIndex]}
        currentConfig={memberPhotoSettings[currentImageIndex]}
        handleNextImage={handleNextImage}
        handlePrevImage={handlePrevImage}
        colors={colors}
        isRtl={isRtl}
      />
    </Box>
  );
};

export default ActivitiesShowcase;
