import React from 'react';
import { 
  Avatar, Box, Typography, Paper, useTheme, 
  alpha, Stack, Tooltip, Chip, useMediaQuery
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  IconThumbUp, IconMessageCircle, IconStar, IconStarFilled, 
  IconGitBranch, IconGitCommit, IconGitPullRequest, 
  IconCheck, IconCodeCircle, IconHash, IconGitMerge
} from '@tabler/icons-react';

// استيراد محلي
import ReviewsErrorBoundary from './ReviewsErrorBoundary';

// استخراج ثوابت الألوان للاستخدام المشترك
const useGitHubColors = (isDarkMode) => ({
  text: isDarkMode ? '#e6edf3' : '#24292f',
  textSecondary: isDarkMode ? '#8b949e' : '#57606a',
  bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
  bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
  borderColor: isDarkMode ? '#30363d' : '#d0d7de',
  primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
  secondaryColor: isDarkMode ? '#f778ba' : '#f600b9', 
  approved: isDarkMode ? '#2ea043' : '#2da44e',
  commented: isDarkMode ? '#bf8700' : '#bf8700',
  requested: isDarkMode ? '#f85149' : '#cf222e',
  merged: isDarkMode ? '#a371f7' : '#8250df',
  gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
});

/**
 * مكون رأس المستودع
 */
const RepoHeader = React.memo(({ colors, isRtl, isMobile, reviewsCount, t }) => (
  <Box
    sx={{
      mb: { xs: 2, sm: 3 },
      p: { xs: 1.5, sm: 2 },
      border: `1px solid ${colors.borderColor}`,
      borderRadius: '6px',
      bgcolor: colors.bgSecondary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      direction: isRtl ? 'rtl' : 'ltr',
      flexWrap: isMobile ? 'wrap' : 'nowrap'
    }}
  >
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      flexDirection: isRtl ? 'row-reverse' : 'row',
      mb: isMobile ? 1 : 0,
      width: isMobile ? '100%' : 'auto'
    }}>
      <Box sx={{ 
        mr: isRtl ? 0 : 2,
        ml: isRtl ? 2 : 0,
        display: 'flex'
      }}>
        <IconCodeCircle size={isMobile ? 20 : 22} style={{ color: colors.merged }} />
      </Box>
      
      <Box>
        <Stack 
          direction={isRtl ? 'row-reverse' : 'row'} 
          spacing={1} 
          alignItems="center"
        >
          <Typography
            variant="h6"
            sx={{
              color: colors.text,
              fontWeight: 600,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            cyberbrains
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: colors.text,
              fontWeight: 600,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            /
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: colors.primaryBlue,
              fontWeight: 600,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            {t('reviews.repository')}
          </Typography>
        </Stack>
        
        {!isMobile && (
          <Typography 
            variant="caption" 
            sx={{ 
              color: colors.textSecondary,
              display: 'block',
              mt: 0.5
            }}
          >
            {t('reviews.activity')}
          </Typography>
        )}
      </Box>
    </Box>
    
    <Box sx={{ 
      display: 'flex',
      gap: { xs: 1, sm: 2 },
      alignItems: 'center',
      flexDirection: isRtl ? 'row-reverse' : 'row',
      width: isMobile ? '100%' : 'auto',
      justifyContent: isMobile ? 'flex-start' : 'flex-end'
    }}>
      <Chip
        size="small"
        icon={!isMobile && <IconHash size={14} />}
        label={t('reviews.reviewsCount', { count: reviewsCount })}
        sx={{
          bgcolor: alpha(colors.primaryBlue, 0.1),
          color: colors.primaryBlue,
          fontWeight: 500,
          fontSize: { xs: '0.7rem', sm: '0.75rem' },
          height: { xs: '20px', sm: '22px' },
          border: `1px solid ${alpha(colors.primaryBlue, 0.2)}`,
          '& .MuiChip-label': {
            px: { xs: 0.5, sm: 1 },
          },
          '& .MuiChip-icon': {
            color: colors.primaryBlue,
            mr: 0.5,
            ml: isRtl ? 0 : 'initial'
          }
        }}
      />
      
      <Chip
        size="small"
        icon={!isMobile && <IconCheck size={14} />}
        label={t('reviews.merged')}
        sx={{
          bgcolor: alpha(colors.merged, 0.1),
          color: colors.merged,
          fontWeight: 500,
          fontSize: { xs: '0.7rem', sm: '0.75rem' },
          height: { xs: '20px', sm: '22px' },
          border: `1px solid ${alpha(colors.merged, 0.2)}`,
          '& .MuiChip-label': {
            px: { xs: 0.5, sm: 1 }
          },
          '& .MuiChip-icon': {
            color: colors.merged,
            mr: 0.5,
            ml: isRtl ? 0 : 'initial'
          }
        }}
      />
    </Box>
  </Box>
));

/**
 * مكون شبكة الخلفية بنمط GitHub
 */
const BackgroundGrid = React.memo(({ colors }) => (
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
));

/**
 * مكون المساهمين
 */
const Contributors = React.memo(({ colors, isRtl, theme, t }) => (
  <Box sx={{
    mb: 4,
    p: 2,
    borderBottom: `1px solid ${colors.borderColor}`,
    direction: isRtl ? 'rtl' : 'ltr'
  }}>
    <Typography 
      variant="subtitle2" 
      sx={{ 
        color: colors.text,
        fontWeight: 600,
        fontSize: '0.85rem',
        mb: 1.5
      }}
    >
      {t('reviews.contributors')}
    </Typography>
    
    <Stack direction="row" spacing={-1}>
      {/* صور المساهمين */}
      {[...Array(4)].map((_, i) => (
        <Avatar
          key={i}
          sx={{
            width: 24,
            height: 24,
            fontSize: '0.8rem',
            border: `2px solid ${colors.bgPrimary}`,
            bgcolor: i === 0 ? theme.palette.primary.main :
                    i === 1 ? theme.palette.secondary.main :
                    i === 2 ? theme.palette.success.main :
                    theme.palette.warning.main
          }}
        >
          {String.fromCharCode(65 + i)}
        </Avatar>
      ))}
    </Stack>
  </Box>
));

/**
 * مكون تذييل بطاقة المراجعة
 */
const ReviewCardFooter = React.memo(({ review, theme, isRtl, colors, isMobile, stats, t }) => (
  <Box sx={{
    p: { xs: 1.5, sm: 2 },
    borderTop: `1px solid ${colors.borderColor}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: isRtl ? 'row-reverse' : 'row',
    bgcolor: colors.bgSecondary
  }}>
    <Stack 
      direction={isRtl ? 'row-reverse' : 'row'} 
      spacing={1.5} 
      alignItems="center"
    >
      <Avatar
        src={review.image}
        alt={review.name}
        sx={{
          width: { xs: 24, sm: 28 },
          height: { xs: 24, sm: 28 },
          border: '2px solid',
          borderColor: theme.palette.primary.main,
          bgcolor: theme.palette.primary.light
        }}
      >
        {review.name?.charAt(0)}
      </Avatar>
      <Box>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600,
            color: colors.text,
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            textAlign: isRtl ? 'right' : 'left'
          }}
        >
          {review.role}
        </Typography>
      </Box>
    </Stack>
    
    {/* إخفاء الإحصائيات على الجوال لتوفير المساحة */}
    {!isMobile && (
      <Stack direction={isRtl ? 'row-reverse' : 'row'} spacing={2}>
        <Tooltip title={t('reviews.likes', { count: stats.stars })}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: colors.textSecondary,
            flexDirection: isRtl ? 'row-reverse' : 'row'
          }}>
            <IconThumbUp size={16} style={{ margin: isRtl ? '0 0 0 4px' : '0 4px 0 0' }} />
            <Typography variant="caption">{stats.stars}</Typography>
          </Box>
        </Tooltip>
        
        <Tooltip title={t('reviews.comments', { count: stats.comments })}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: colors.textSecondary,
            flexDirection: isRtl ? 'row-reverse' : 'row'
          }}>
            <IconMessageCircle size={16} style={{ margin: isRtl ? '0 0 0 4px' : '0 4px 0 0' }} />
            <Typography variant="caption">{stats.comments}</Typography>
          </Box>
        </Tooltip>
        
        <Tooltip title={t('reviews.commits', { count: stats.approvals })}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: colors.textSecondary,
            flexDirection: isRtl ? 'row-reverse' : 'row'
          }}>
            <IconGitBranch size={16} style={{ margin: isRtl ? '0 0 0 4px' : '0 4px 0 0' }} />
            <Typography variant="caption">{stats.approvals}</Typography>
          </Box>
        </Tooltip>
      </Stack>
    )}
  </Box>
));

/**
 * بطاقة مراجعة على طراز GitHub PR
 */
const GitHubReviewCard = React.memo(({ review, theme, isRtl }) => {
  const customizer = useSelector((state) => state.customizer);
  const isDarkMode = customizer.activeMode === 'dark';
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // ألوان بنمط GitHub للتناسق
  const colors = useGitHubColors(isDarkMode);

  // إنشاء رقم PR فريد ومتناسق بناءً على معرّف المراجعة
  const prNumber = review.id ? (review.id + 100) : Math.floor(Math.random() * 900) + 100;
  
  // إنشاء هاش commit عشوائي (في تطبيق حقيقي سيكون من البيانات)
  const commitHash = React.useMemo(() => 
    Math.random().toString(16).substring(2, 10), []);
  
  // إنشاء إحصائيات عشوائية
  const stats = React.useMemo(() => ({
    stars: Math.floor(Math.random() * 10) + 1,
    comments: Math.floor(Math.random() * 15),
    approvals: Math.floor(Math.random() * 5)
  }), []);
  
  // تحويل درجة المراجعة إلى حالة PR
  const getReviewStatus = (score) => {
    if (score >= 4.5) return 'approved';
    if (score >= 3.5) return 'commented';
    return 'requested';
  };
  
  const reviewStatus = getReviewStatus(review.rating || 5);
  
  return (
    <Paper
      elevation={0}
      sx={{
        m: { xs: 0.5, sm: 1 },
        borderRadius: '6px',
        direction: isRtl ? 'rtl' : 'ltr',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: colors.borderColor,
        bgcolor: colors.bgPrimary,
        boxShadow: '0 3px 12px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          borderColor: alpha(theme.palette.primary.main, 0.4)
        }
      }}
    >
      {/* رأس بنمط GitHub - مشابه لرأس PR */}
      <Box sx={{
        p: { xs: 1.5, sm: 2 }, 
        bgcolor: colors.bgSecondary,
        borderBottom: `1px solid ${colors.borderColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          maxWidth: '75%' 
        }}>
          {reviewStatus === 'approved' ? (
            <IconGitMerge 
              size={isMobile ? 16 : 20} 
              style={{ 
                marginRight: isRtl ? 0 : '8px',
                marginLeft: isRtl ? '8px' : 0,
                color: colors.merged
              }} 
            />
          ) : (
            <IconGitPullRequest 
              size={isMobile ? 16 : 20} 
              style={{ 
                marginRight: isRtl ? 0 : '8px',
                marginLeft: isRtl ? '8px' : 0,
                color: reviewStatus === 'approved' ? colors.approved :
                        reviewStatus === 'commented' ? colors.commented : 
                        colors.requested
              }} 
            />
          )}
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600, 
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              color: colors.text,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {review.name} • PR #{prNumber}
          </Typography>
        </Box>
        
        <Chip
          size="small"
          label={
            reviewStatus === 'approved' ? t('reviews.approved') :
            reviewStatus === 'commented' ? t('reviews.commented') :
            t('reviews.changes')
          }
          icon={!isMobile && (
            reviewStatus === 'approved' ? <IconCheck size={14} /> :
            reviewStatus === 'commented' ? <IconMessageCircle size={14} /> :
            <IconGitPullRequest size={14} />
          )}
          sx={{
            height: { xs: '18px', sm: '20px' },
            bgcolor: alpha(
              reviewStatus === 'approved' ? colors.approved :
              reviewStatus === 'commented' ? colors.commented :
              colors.requested, 
              0.15
            ),
            color: reviewStatus === 'approved' ? colors.approved :
                  reviewStatus === 'commented' ? colors.commented :
                  colors.requested,
            border: '1px solid',
            borderColor: alpha(
              reviewStatus === 'approved' ? colors.approved :
              reviewStatus === 'commented' ? colors.commented :
              colors.requested,
              0.3
            ),
            fontWeight: 600,
            fontSize: { xs: '0.65rem', sm: '0.7rem' },
            '& .MuiChip-icon': {
              color: 'inherit'
            }
          }}
        />
      </Box>
      
      {/* قسم التعليق */}
      <Box sx={{ 
        p: { xs: 2, sm: 3 }, 
        position: 'relative' 
      }}>
        {/* خلفية كتلة الكود */}
        <Box sx={{
          position: 'absolute',
          top: 12,
          [isRtl ? 'right' : 'left']: { xs: 10, sm: 16 },
          bottom: 'auto',
          width: '4px',
          height: '85%',
          bgcolor: alpha(colors.borderColor, 0.5),
          borderRadius: '4px'
        }} />
        
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' },
            lineHeight: 1.6,
            mb: 3,
            [isRtl ? 'pr' : 'pl']: { xs: 3, sm: 4 },
            color: colors.text,
            whiteSpace: 'pre-line'
          }}
        >
          {review.text}
        </Typography>
        
        {/* وسم commit بنمط GitHub */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 2,
          [isRtl ? 'pr' : 'pl']: { xs: 3, sm: 4 },
          flexDirection: isRtl ? 'row-reverse' : 'row'
        }}>
          <IconGitCommit size={isMobile ? 14 : 16} style={{ color: colors.textSecondary }} />
          <Typography 
            variant="caption" 
            sx={{ 
              color: colors.textSecondary,
              fontFamily: 'monospace',
              bgcolor: alpha(colors.borderColor, 0.2),
              px: 1,
              py: 0.5,
              borderRadius: '4px',
              fontSize: { xs: '0.7rem', sm: '0.8rem' }
            }}
          >
            {commitHash}
          </Typography>
        </Box>
        
        {/* التقييم معروض كنجوم */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          [isRtl ? 'pr' : 'pl']: { xs: 3, sm: 4 },
          flexDirection: isRtl ? 'row-reverse' : 'row'
        }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Box component="span" key={star} sx={{ color: colors.commented }}>
              {star <= (review.rating || 5) ? (
                <IconStarFilled size={isMobile ? 14 : 16} />
              ) : (
                <IconStar size={isMobile ? 14 : 16} />
              )}
            </Box>
          ))}
        </Box>
      </Box>
      
      {/* تذييل مع تفاعلات بنمط GitHub */}
      <ReviewCardFooter 
        review={review}
        theme={theme}
        isRtl={isRtl}
        colors={colors}
        isMobile={isMobile}
        stats={stats}
        t={t}
      />
    </Paper>
  );
});

/**
 * مكون العرض الرئيسي
 */
const ReviewCarousel = () => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const isDarkMode = customizer.activeMode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // ألوان بنمط GitHub
  const colors = useGitHubColors(isDarkMode);

  // الحصول على المراجعات من الترجمات
  const reviews = t('reviews.reviews', { returnObjects: true }) || [];

  // إعدادات Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    pauseOnHover: true,
    adaptiveHeight: true,
    rtl: isRtl,
  };

  return (
    <ReviewsErrorBoundary>
      <Box sx={{ position: 'relative' }}>
        {/* شبكة خلفية بنمط GitHub */}
        <BackgroundGrid colors={colors} />
      
        {/* رأس مستودع بنمط GitHub - مبسط للجوال */}
        <RepoHeader 
          colors={colors}
          isRtl={isRtl}
          isMobile={isMobile}
          reviewsCount={reviews.length}
          t={t}
        />
        
        {/* قسم المساهمين - إخفاء على الجوال الصغير */}
        {!isMobile && (
          <Contributors colors={colors} isRtl={isRtl} theme={theme} t={t} />
        )}
        
        {/* شريحة المراجعات */}
        <Box
          sx={{
            direction: isRtl ? 'rtl' : 'ltr',
            '.slick-dots': {
              bottom: { xs: '-25px', sm: '-30px' },
              li: {
                button: {
                  '&:before': {
                    fontSize: { xs: '8px', sm: '10px' },
                    color: theme.palette.primary.main,
                    opacity: 0.4
                  }
                },
                '&.slick-active': {
                  button: {
                    '&:before': {
                      opacity: 1
                    }
                  }
                }
              }
            }
          }}
        >
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={review.id || index}>
                <Box sx={{ px: { xs: 0.5, sm: 1 } }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <GitHubReviewCard
                      review={review}
                      theme={theme}
                      isRtl={isRtl}
                    />
                  </motion.div>
                </Box>
              </div>
            ))}
          </Slider>
        </Box>
      </Box>
    </ReviewsErrorBoundary>
  );
};

export default React.memo(ReviewCarousel);