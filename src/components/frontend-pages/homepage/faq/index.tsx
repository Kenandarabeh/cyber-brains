import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  alpha,
  Paper,
  Chip,
  Avatar,
  Stack,
  useMediaQuery
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconPlus,
  IconMinus,
  IconMarkdown,
  IconBrandGithub,
  IconTerminal,
  IconCode,
  IconBraces,
  IconCodeCircle,
  IconHash
} from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

/**
 * استخراج ألوان GitHub المشتركة
 */
const useGitHubColors = (isDarkMode) => ({
  text: isDarkMode ? '#e6edf3' : '#24292f',
  textSecondary: isDarkMode ? '#8b949e' : '#57606a',
  bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
  bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
  borderColor: isDarkMode ? '#30363d' : '#d0d7de',
  primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
  secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
  primaryGreen: isDarkMode ? '#2ea043' : '#2da44e',
  hoverBg: isDarkMode ? '#30363d' : '#f3f4f6',
  gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
  merged: isDarkMode ? '#a371f7' : '#8250df',
});

/**
 * رأس المستودع بنمط GitHub
 */
const RepoHeader = React.memo(({ colors, isRTL, isMobile, faqData, t }) => (
  <Box sx={{
    p: { xs: 1.5, sm: 2 },
    bgcolor: colors.bgSecondary,
    borderBottom: `1px solid ${colors.borderColor}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    direction: isRTL ? 'rtl' : 'ltr',
    flexWrap: isMobile ? 'wrap' : 'nowrap'
  }}>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      mb: isMobile ? 1 : 0,
      width: isMobile ? '100%' : 'auto'
    }}>


      <Box>
        <Stack
          direction={isRTL ? 'row-reverse' : 'row'}
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
            docs
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
            {t('faq.docsRepo')}
          </Typography>
        )}
      </Box>
    </Box>

    <Box sx={{
      display: 'flex',
      gap: { xs: 1, sm: 2 },
      alignItems: 'center',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      width: isMobile ? '100%' : 'auto',
      justifyContent: isMobile ? 'flex-start' : 'flex-end'
    }}>
      <Chip
        size="small"
        icon={!isMobile && <IconHash size={14} />}
        label={`${faqData.length} ${t('faq.questions')}`}
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
            ml: isRTL ? 0 : 'initial'
          }
        }}
      />

      <Chip
        size="small"
        icon={!isMobile && <IconMarkdown size={14} />}
        label="README.md"
        sx={{
          bgcolor: alpha(colors.secondaryColor, 0.1),
          color: colors.secondaryColor,
          fontWeight: 500,
          fontSize: { xs: '0.7rem', sm: '0.75rem' },
          height: { xs: '20px', sm: '22px' },
          border: `1px solid ${alpha(colors.secondaryColor, 0.2)}`,
          '& .MuiChip-label': {
            px: { xs: 0.5, sm: 1 }
          },
          '& .MuiChip-icon': {
            color: colors.secondaryColor,
            mr: 0.5,
            ml: isRTL ? 0 : 'initial'
          }
        }}
      />
    </Box>
  </Box>
));

/**
 * عرض محتوى الإجابة على السؤال
 */
const FaqAnswer = React.memo(({ answer, colors, isRTL, t }) => (
  <Box sx={{ 
    p: { xs: 2, sm: 3 },
    pt: { xs: 0, sm: 1 },
    direction: isRTL ? 'rtl' : 'ltr'
  }}>
    <Box sx={{ 
      display: 'flex',
      mt: 2,
      // إعادة تصميم التخطيط للتوافق الكامل مع RTL
      flexDirection: isRTL ? 'row-reverse' : 'row',
    }}>
      {/* Avatar المستخدم الذي أجاب - إصلاح كامل لـ RTL */}
      <Box 
  sx={{ 
    flexShrink: 0,
    position: 'relative',
    textAlign: isRTL ? 'right' : 'left',
    order: isRTL ? 2 : 0, // تغيير ترتيب العناصر في RTL
    mr: isRTL ? 0 : '12px',
    ml: isRTL ? '12px' : 0
  }}
>
        <Avatar
          sx={{
            width: { xs: 32, sm: 36 },
            height: { xs: 32, sm: 36 },
            bgcolor: colors.primaryBlue,
            border: `2px solid ${colors.borderColor}`
          }}
        >
          CB
        </Avatar>
      </Box>

      {/* محتوى الإجابة مع تنسيق RTL محسّن */}
      <Box sx={{ 
        flex: 1,
        order: isRTL ? 1 : 0, 
        textAlign: isRTL ? 'right' : 'left',
        pr: isRTL ? 2 : 0,
        pl: isRTL ? 0 : 2
      }}>
        <Box sx={{
          p: { xs: 1.5, sm: 2 },
          borderRadius: '6px',
          border: `1px solid ${colors.borderColor}`,
          bgcolor: colors.bgSecondary,
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 12,
            [isRTL ? 'right' : 'left']: -8,
            width: 16,
            height: 16,
            bgcolor: colors.bgSecondary,
            border: `1px solid ${colors.borderColor}`,
            borderRight: isRTL ? '1px solid' : 'none',
            borderBottom: 'none',
            borderLeft: isRTL ? 'none' : '1px solid',
            transform: 'rotate(45deg)',
            borderColor: colors.borderColor,
            zIndex: 0
          }
        }}>
          {/* رأس الإجابة */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1.5,
            pb: 1,
            borderBottom: `1px dashed ${alpha(colors.borderColor, 0.5)}`
          }}>
            <Typography
              sx={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: colors.text
              }}
            >
              CyberBrains{" "}
              <Box component="span" sx={{ fontWeight: 400, color: colors.textSecondary }}>
                {t('faq.answered')}
              </Box>
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: colors.textSecondary }}
            >
              {t('faq.supportTeam')}
            </Typography>
          </Box>

          {/* محتوى الإجابة بنمط توثيق الكود */}
          <Typography
            sx={{
              color: colors.text,
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              lineHeight: 1.7,
              position: 'relative',
              zIndex: 1
            }}
          >
            <Box component="span" sx={{ 
              color: colors.secondaryColor, 
              fontWeight: 500
            }}>
              {isRTL ? "//" : "// "}{t('faq.answer')}
            </Box>
            <br />
            {answer}
          </Typography>

          {/* وسوم GitHub للكود */}
          <Box sx={{ 
            mt: 2, 
            display: 'flex', 
            gap: 1,
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            <Chip
              size="small"
              icon={<IconCode size={12} />}
              label="docs"
              sx={{
                height: '20px',
                fontSize: '0.65rem',
                bgcolor: alpha(colors.textSecondary, 0.1),
                color: colors.textSecondary,
                border: `1px solid ${alpha(colors.borderColor, 0.6)}`,
                '& .MuiChip-icon': {
                  color: colors.textSecondary,
                  fontSize: '0.7rem'
                }
              }}
            />
            <Chip
              size="small"
              icon={<IconBrandGithub size={12} />}
              label="cyberbrains"
              sx={{
                height: '20px',
                fontSize: '0.65rem',
                bgcolor: alpha(colors.textSecondary, 0.1),
                color: colors.textSecondary,
                border: `1px solid ${alpha(colors.borderColor, 0.6)}`,
                '& .MuiChip-icon': {
                  color: colors.textSecondary,
                  fontSize: '0.7rem'
                }
              }}
            />
          </Box>
        </Box>

        {/* شريط التفاعلات بنمط GitHub */}
        <Box sx={{ 
          mt: 1.5, 
          display: 'flex',
          justifyContent: isRTL ? 'flex-start' : 'flex-end', // ضبط محاذاة التفاعلات حسب اتجاه اللغة
          opacity: 0.7
        }}>
          <Typography
            variant="caption"
            sx={{ color: colors.textSecondary }}
          >
            {t('faq.helpfulAnswer')}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
));

/**
 * مكون عنصر سؤال في FAQ
 */
const FaqQuestion = React.memo(({ item, index, activeIndex, setActiveIndex, colors, isRTL, isMobile, isDarkMode, t }) => {
  const isActive = activeIndex === index;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeInOut" 
      }}
    >
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          border: `1px solid ${isActive 
            ? alpha(colors.primaryBlue, 0.5) 
            : colors.borderColor}`,
          borderRadius: '6px',
          overflow: 'hidden',
          bgcolor: isActive
            ? alpha(colors.primaryBlue, isDarkMode ? 0.05 : 0.02)
            : colors.bgPrimary,
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: alpha(colors.primaryBlue, 0.5),
            boxShadow: `0 4px 12px ${alpha(colors.primaryBlue, 0.1)}`
          }
        }}
      >
        {/* رأس السؤال بنمط عنوان مشكلة GitHub */}
        <Box
          onClick={() => setActiveIndex(isActive ? null : index)}
          sx={{
            p: { xs: 2, sm: 3 },
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            borderBottom: isActive 
              ? `1px solid ${colors.borderColor}` 
              : 'none',
            direction: isRTL ? 'rtl' : 'ltr',
            position: 'relative',  // مهم للأيقونة المطلقة +/-
            minHeight: '60px' // إضافة ارتفاع أدنى للحصول على مساحة متناسقة
          }}
        >
          {/* الصندوق الذي يحتوي على أيقونة السؤال والعنوان مع تعديل العرض */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'flex-start',
            width: 'calc(100% - 40px)', // إعطاء مساحة للأيقونة +/-
            flexDirection: isRTL ? 'row-reverse' : 'row', // تغيير الاتجاه حسب اللغة
            gap: 2, // المسافة بين الأيقونة والنص
          }}>
            {/* أيقونة الطرفية مع position مناسب */}
            <Box sx={{ 
              color: isActive ? colors.primaryBlue : colors.textSecondary,
              pt: 0.5,
              display: 'flex',
              flexShrink: 0, // منع الانكماش
              order: isRTL ? 1 : 0, // هنا نجعلها تبدأ من اليمين في حالة RTL
            }}>
              <IconTerminal size={isMobile ? 18 : 22} />
            </Box>

            {/* نص السؤال */}
            <Box sx={{ 
              width: '100%',
              // تأكد من وجود مساحة كافية من الجانبين لتجنب التداخل مع زر التوسعة
              pr: isRTL ? 1 : 4, 
              pl: isRTL ? 4 : 1
            }}> 
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1.1rem' },
                  fontWeight: 600,
                  color: isActive ? colors.primaryBlue : colors.text,
                  mb: 0.5,
                  fontFamily: isDarkMode ? 
                    "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace" : 
                    "inherit",
                  textAlign: isRTL ? 'right' : 'left', // ضمان محاذاة النص للاتجاه الصحيح
                }}
              >
                {item.question}
              </Typography>

              {/* بيانات المشكلة بنمط GitHub */}
              {isActive && (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                  mt: 0.5,
                  justifyContent: isRTL ? 'flex-end' : 'flex-start', // محاذاة العناصر حسب اتجاه اللغة
                }}>
                  <Chip
                    size="small"
                    label={t('faq.answered')}
                    sx={{
                      height: '18px',
                      fontSize: '0.65rem',
                      bgcolor: alpha(colors.primaryGreen, 0.1),
                      color: colors.primaryGreen,
                      border: `1px solid ${alpha(colors.primaryGreen, 0.3)}`,
                      fontWeight: 500
                    }}
                  />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: colors.textSecondary,
                      fontSize: '0.7rem'
                    }}
                  >
                    #{index + 1}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* أيقونة + / - تعديل وتصحيح المركز والحدود */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              // تصحيح موضع الدائرة حسب اتجاه اللغة
              right: isRTL ? 'auto' : '16px',
              left: isRTL ? '16px' : 'auto',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              boxSizing: 'content-box', // منع تأثير الحدود على حجم العنصر
 
              color: isActive ? colors.primaryBlue : colors.textSecondary,
            }}
          >
            {/* إضافة مربع داخلي لضمان المركزية */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: isActive ? 180 : 0,
                  scale: isActive ? 1.1 : 1
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isActive ? <IconMinus size={16} /> : <IconPlus size={16} />}
              </motion.div>
            </Box>
          </Box>
        </Box>

        {/* محتوى الإجابة */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <FaqAnswer 
                answer={item.answer} 
                colors={colors} 
                isRTL={isRTL} 
                t={t} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </motion.div>
  );
});

/**
 * مكون تأثيرات الخلفية
 */
const BackgroundEffects = React.memo(({ colors, isRTL }) => (
  <>
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
        backgroundSize: '50px 50px',
        opacity: 0.2,
        zIndex: 0
      }}
    />
    
    {/* أشكال مجردة للاهتمام البصري */}
    <Box
      sx={{
        position: 'absolute',
        top: '10%',
        [isRTL ? 'left' : 'right']: '10%',
        width: { xs: '200px', sm: '300px' },
        height: { xs: '200px', sm: '300px' },
        borderRadius: '50%',
        background: `radial-gradient(circle, ${alpha(colors.primaryBlue, 0.08)} 0%, transparent 70%)`,
        zIndex: 0,
      }}
    />
    
    <Box
      sx={{
        position: 'absolute',
        top: '60%',
        [isRTL ? 'right' : 'left']: '8%',
        width: { xs: '180px', sm: '250px' },
        height: { xs: '180px', sm: '250px' },
        borderRadius: '50%',
        background: `radial-gradient(circle, ${alpha(colors.secondaryColor, 0.06)} 0%, transparent 70%)`,
        zIndex: 0,
      }}
    />
  </>
));

/**
 * مكون رأس القسم
 */
const SectionHeader = React.memo(({ colors, isDarkMode, t, isRTL }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    sx={{
      mb: { xs: 4, sm: 6 },
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center'
    }}
  >
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      mb: 2
    }}>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          bgcolor: alpha(colors.merged, isDarkMode ? 0.15 : 0.08),
          color: colors.merged,
          py: { xs: 0.6, sm: 0.8 },
          px: { xs: 1.8, sm: 2.5 },
          borderRadius: '2rem',
          border: `1px solid ${alpha(colors.merged, isDarkMode ? 0.3 : 0.15)}`,
          boxShadow: `0 4px 20px ${alpha(colors.merged, isDarkMode ? 0.25 : 0.1)}`,
        }}
      >
        <IconCodeCircle
          size="1.1rem"
          style={{
            marginRight: isRTL ? 0 : '8px',
            marginLeft: isRTL ? '8px' : 0,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '0.85rem', sm: '0.95rem' },
          }}
        >
          {t('faq.subtitle')}
        </Typography>
      </Box>
    </Box>

    <Typography
      variant="h2"
      sx={{
        fontWeight: 800,
        fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' },
        mb: { xs: 2, sm: 3 },
        color: colors.text,
        background: `linear-gradient(135deg, ${colors.primaryBlue}, ${colors.merged})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {t('faq.title')}
    </Typography>

    <Typography
      variant="body1"
      sx={{
        color: colors.textSecondary,
        fontSize: { xs: '0.95rem', sm: '1.1rem' },
        maxWidth: '700px',
        mx: 'auto',
      }}
    >
      {t('faq.description')}
    </Typography>
  </Box>
));

/**
 * المكون الرئيسي للأسئلة الشائعة (FAQ)
 */
const FAQ = () => {
  const theme = useTheme();
  const customizer = useSelector((state) => state.customizer);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(i18n.dir() === 'rtl');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';
  
  // الحصول على بيانات FAQ من الترجمات
  const faqData = t('faq.faqs', { returnObjects: true }) || [];
  
  // ألوان بنمط GitHub - متطابقة مع المكونات الأخرى
  const colors = useGitHubColors(isDarkMode);

  // تحديث حالة RTL عند تغيير اللغة
  useEffect(() => {
    setIsRTL(i18n.dir() === 'rtl');
  }, [i18n.language]);

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        position: 'relative',
        bgcolor: colors.bgPrimary,
        borderBottom: `1px solid ${colors.borderColor}`,
        overflow: 'hidden',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
      id="faq"
    >
      <BackgroundEffects colors={colors} isRTL={isRTL} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader colors={colors} isDarkMode={isDarkMode} t={t} isRTL={isRTL} />

        {/* ورقة مستودع بنمط GitHub */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            border: `1px solid ${colors.borderColor}`,
            borderRadius: '6px',
            overflow: 'hidden',
            maxWidth: '850px',
            mx: 'auto'
          }}
        >
          <RepoHeader 
            colors={colors} 
            isRTL={isRTL} 
            isMobile={isMobile} 
            faqData={faqData} 
            t={t} 
          />

          {/* أسئلة وأجوبة FAQ */}
          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {faqData.map((item, index) => (
              <FaqQuestion
                key={index}
                item={item}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                colors={colors}
                isRTL={isRTL}
                isMobile={isMobile}
                isDarkMode={isDarkMode}
                t={t}
              />
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FAQ;
