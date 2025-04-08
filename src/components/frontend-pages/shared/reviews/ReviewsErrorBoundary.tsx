import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Button, alpha, useTheme, 
  Stack, Tooltip, useMediaQuery, Chip 
} from '@mui/material';
import { 
  IconAlertTriangle, IconRefresh, IconBug, 
  IconExclamationCircle, IconTerminal 
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

/**
 * ErrorBoundary للتعامل مع أخطاء مكون المراجعات
 */
class ReviewsErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorInfo: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorInfo: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { 
      hasError: true, 
      errorInfo: error.message || 'An unknown error occurred'
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error rendering reviews:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorDisplay 
        onRetry={() => this.setState({ hasError: false })} 
        errorInfo={this.state.errorInfo}
      />;
    }

    return this.props.children;
  }
}

/**
 * استخراج ألوان GitHub المشتركة
 */
const useGitHubColors = (isDarkMode) => ({
  text: isDarkMode ? '#e6edf3' : '#24292f',
  textSecondary: isDarkMode ? '#8b949e' : '#57606a',
  bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
  bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
  borderColor: isDarkMode ? '#30363d' : '#d0d7de',
  error: isDarkMode ? '#f85149' : '#cf222e',
  warning: isDarkMode ? '#d29922' : '#bf8700',
  gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
});

/**
 * مكون عرض الخطأ المنفصل بتصميم GitHub
 */
const ErrorDisplay = ({ onRetry, errorInfo }) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [isRtl, setIsRtl] = useState(i18n.dir() === 'rtl');
  const customizer = useSelector((state: any) => state.customizer);
  const isDarkMode = customizer.activeMode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // ألوان GitHub
  const colors = useGitHubColors(isDarkMode);

  // تحديث حالة RTL عند تغيير اللغة
  useEffect(() => {
    setIsRtl(i18n.dir() === 'rtl');
  }, [i18n.language]);

  // تأثير الحركة للكارت
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <Box 
      sx={{
        position: 'relative',
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      {/* شبكة خلفية بنمط GitHub */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(${colors.gridLines} 1px, transparent 1px), 
                         linear-gradient(90deg, ${colors.gridLines} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          opacity: 0.4,
          zIndex: 0
        }}
      />
      
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Paper
          elevation={0}
          sx={{
            p: 0, 
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid',
            borderColor: alpha(colors.error, 0.5),
            borderRadius: '6px',
            bgcolor: colors.bgPrimary,
            boxShadow: `0 3px 12px ${alpha(colors.error, 0.2)}`
          }}
        >
          {/* رأس مشكلة بنمط GitHub */}
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: alpha(colors.error, 0.08),
              borderBottom: `1px solid ${alpha(colors.error, 0.3)}`,
              flexDirection: isRtl ? 'row-reverse' : 'row'
            }}
          >
            <Stack 
              direction={isRtl ? 'row-reverse' : 'row'} 
              spacing={1.5} 
              alignItems="center"
              sx={{ flexWrap: isMobile ? 'wrap' : 'nowrap' }}
            >
              <IconExclamationCircle 
                size={isMobile ? 20 : 24} 
                style={{ color: colors.error }} 
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  color: colors.text,
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                {t('reviews.errorTitle')}
              </Typography>
              
              <Chip
                label={t('reviews.openIssue')}
                size="small"
                sx={{
                  ml: { xs: 0, sm: 2 },
                  mt: { xs: isMobile ? 1 : 0 },
                  bgcolor: alpha(colors.error, 0.15),
                  color: colors.error,
                  border: `1px solid ${alpha(colors.error, 0.3)}`,
                  height: { xs: '18px', sm: '20px' },
                  fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  fontWeight: 600
                }}
              />
            </Stack>
            
            {!isMobile && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: colors.textSecondary,
                  fontFamily: "monospace"
                }}
              >
                #ERROR-404
              </Typography>
            )}
          </Box>
          
          {/* محتوى الخطأ الرئيسي */}
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="body1"
              sx={{
                mb: 3,
                color: colors.text,
                fontSize: { xs: '0.85rem', sm: '0.95rem' }
              }}
            >
              {t('reviews.errorMessage')}
            </Typography>
            
            {/* نص الخطأ بنمط Terminal - تبسيط أو إخفاء على الشاشات الصغيرة جداً */}
            {!isMobile ? (
              <Box
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: '6px',
                  bgcolor: isDarkMode ? '#0d1117' : '#f6f8fa',
                  border: `1px solid ${colors.borderColor}`,
                  fontFamily: 'monospace',
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  color: isDarkMode ? '#e6edf3' : '#24292f',
                  position: 'relative',
                  overflow: 'hidden',
                  direction: 'ltr' // كود دائمًا من اليسار لليمين
                }}
              >
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '24px',
                  bgcolor: isDarkMode ? '#161b22' : '#dfe1e4',
                  borderBottom: `1px solid ${colors.borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  px: 1
                }}>
                  <IconTerminal size={14} style={{ marginRight: '6px' }} />
                  <Typography variant="caption" fontFamily="monospace">
                    error-log.txt
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 3 }}>
                  <Typography 
                    variant="body2" 
                    fontFamily="monospace" 
                    sx={{ 
                      color: colors.error,
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {`Error: Failed to fetch reviews data\n> ${errorInfo || 'Connection error'}`}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  p: 1.5,
                  mb: 3,
                  borderRadius: '6px',
                  bgcolor: alpha(colors.error, 0.1),
                  border: `1px solid ${alpha(colors.error, 0.2)}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  flexDirection: isRtl ? 'row-reverse' : 'row'
                }}
              >
                <IconAlertTriangle size={16} style={{ color: colors.error }} />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: colors.error,
                    fontWeight: 500
                  }}
                >
                  {t('reviews.connectionError')}
                </Typography>
              </Box>
            )}
            
            <Stack
              direction={isMobile ? 'column' : isRtl ? 'row-reverse' : 'row'}
              spacing={2}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <Button
                fullWidth={isMobile}
                variant="contained"
                startIcon={<IconRefresh size={isMobile ? 16 : 18} style={{
                  transform: isRtl ? 'scaleX(-1)' : 'none',
                }} />}
                onClick={onRetry}
                sx={{
                  bgcolor: colors.error,
                  textTransform: 'none',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                  py: { xs: 0.8, sm: 1 },
                  '&:hover': {
                    bgcolor: alpha(colors.error, 0.8)
                  }
                }}
              >
                {t('reviews.retry')}
              </Button>
              
              {!isMobile && (
                <Tooltip title={t('reviews.reportBugTooltip')}>
                  <Button
                    variant="outlined"
                    startIcon={<IconBug size={18} />}
                    sx={{
                      borderColor: colors.borderColor,
                      color: colors.text,
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: colors.textSecondary,
                        bgcolor: alpha(colors.borderColor, 0.1)
                      }
                    }}
                  >
                    {t('reviews.reportBug')}
                  </Button>
                </Tooltip>
              )}
            </Stack>
          </Box>
          
          {/* تذييل مع خط زمني - تبسيط للجوال */}
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderTop: `1px solid ${colors.borderColor}`,
              bgcolor: isDarkMode ? '#161b22' : '#f6f8fa',
              display: 'flex',
              alignItems: 'center',
              flexDirection: isMobile ? 'column' : isRtl ? 'row-reverse' : 'row',
              justifyContent: isMobile ? 'center' : 'space-between',
              gap: isMobile ? 1 : 0
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                color: colors.textSecondary,
                textAlign: isMobile ? 'center' : isRtl ? 'right' : 'left'
              }}
            >
              <Box component="span" sx={{ fontWeight: 600 }}>cyberbrain-bot</Box> {t('reviews.openedIssue')}
            </Typography>
            
            {!isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  flexDirection: isRtl ? 'row-reverse' : 'row'
                }}
              >
                <IconAlertTriangle size={14} style={{ color: colors.warning }} />
                <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                  {t('reviews.autoRetry')}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ReviewsErrorBoundary;
