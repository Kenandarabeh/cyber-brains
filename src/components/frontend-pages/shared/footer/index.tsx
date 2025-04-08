import React from 'react';
import { Box, Typography, Container, Stack, IconButton, Divider, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { 
  IconBrandFacebook, 
  IconBrandTwitter, 
  IconBrandInstagram, 
  IconBrandYoutube,
  IconBrandGithub,
  IconHeart
} from '@tabler/icons-react';
import LogoIcon from 'src/assets/images/logos/icon.png';

// تجميع جميع روابط التنقل في مصفوفة واحدة
const navLinks = [
  { text: 'footer.links.home', link: '/home' },
  { text: 'footer.links.about', link: '/about' },
  { text: 'footer.links.team', link: '/team' },
  { text: 'footer.links.join', link: '/join' },
  { text: 'footer.links.contact', link: '/contact' },
];

// تعريف روابط وسائل التواصل الاجتماعي
const socialLinks = [
  { icon: IconBrandFacebook, name: 'Facebook', url: 'https://www.facebook.com/clubmedia4' },
  { icon: IconBrandInstagram, name: 'Instagram', url: 'https://www.instagram.com/Media.club_naama' },
];

const Footer = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const customizer = useSelector((state: any) => state.customizer);
  const isRtl = i18n.dir() === 'rtl';
  const currentYear = new Date().getFullYear();
  
  // إضافة وضع داكن لاستخدامه في نمط الشبكة
  const isDarkMode = customizer.activeMode === 'dark';
  
  // تعريف ألوان GitHub بنفس نمط Banner
  const colors = {
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
    bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
    gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
  };

  return (
    <Box
      sx={{
        bgcolor: colors.bgPrimary, // تغيير إلى ألوان متطابقة مع البانر
        borderTop: '1px solid',
        borderColor: colors.borderColor, // استخدام نفس لون الحدود مثل البانر
        direction: isRtl ? 'rtl' : 'ltr',
        pt: 6,
        position: 'relative', // مطلوب لخلفية الشبكة المطلقة
        overflow: 'hidden', // لمنع تجاوز الشبكة للحدود
      }}
    >
      {/* نمط الشبكة بتصميم GitHub متطابق مع البانر */}
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
          opacity: 0.4, // زيادة طفيفة في وضوح الشبكة
          zIndex: 0,
          pointerEvents: 'none', // لضمان عدم تداخلها مع عناصر التفاعل
        }}
      />

      {/* إضافة تأثير ضبابي في زوايا الشبكة */}
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
        {/* Logo & Social Media Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'space-between',
            mb: 4
          }}
        >
          {/* Logo & Club Name - تعديل موضع الشعار في RTL */}
          <Box sx={{ textAlign: { xs: 'center', md: isRtl ? 'right' : 'left' }, mb: { xs: 3, md: 0 } }}>
            <Box
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                flexDirection: isRtl ? 'row-reverse' : 'row', // ترتيب العناصر في RTL
                gap: 2
              }}
            >
              {/* الشعار - سيتم وضعه في ترتيب CSS */}
              <Box 
                component="img"
                src={LogoIcon}
                alt="Rising Media Club"
                sx={{ 
                  width: 45, 
                  height: 45, 
                  filter: isDarkMode ? 'brightness(0.8)' : 'none',
                  order: isRtl ? 1 : 0, // في RTL، سيظهر الشعار أولاً (على اليمين)
                }}
              />
              
              {/* النص */}
              <Box sx={{ order: isRtl ? 0 : 1 }}> {/* في RTL، سيظهر النص ثانيًا (على اليسار) */}
                <Typography 
                  variant="h5" 
                  fontWeight={700} 
                  color="primary.main"
                  sx={{ mb: 0.5 }}
                >
                  {t('footer.title')}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ maxWidth: 300, display: { xs: 'none', sm: 'block' } }}
                >
                  {t('footer.subtitle')}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Social Media Icons */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{ 
                mb: 2, 
                textAlign: { xs: 'center', md: isRtl ? 'right' : 'left' },
                color: colors.text // استخدام نفس لون النص كما في البانر
              }}
            >
              {t('footer.social')}
            </Typography>
            
            <Stack 
              direction="row" 
              spacing={1.5} 
              justifyContent={{ xs: 'center', md: isRtl ? 'flex-end' : 'flex-start' }}
              sx={{
                '& > *': { 
                  mx: 0.75,  // Add horizontal margin to each child
                  '&:first-of-type': { 
                    mr: isRtl ? 0 : 0.75, 
                    ml: isRtl ? 0.75 : 0 
                  },
                  '&:last-of-type': { 
                    ml: isRtl ? 0 : 0.75, 
                    mr: isRtl ? 0.75 : 0 
                  }
                }
              }}
            >
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={social.name}
                  sx={{
                    bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    color: isDarkMode ? colors.text : 'grey.700',
                    transition: 'all 0.2s ease',
                    m: 0, // Reset margin to ensure our custom spacing works
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      bgcolor: 'primary.main',
                      color: 'white'
                    }
                  }}
                >
                  <social.icon size={18} />
                </IconButton>
              ))}
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ 
          mb: 4,
          borderColor: colors.borderColor // استخدام نفس لون الحدود مثل البانر
        }} />

        {/* تصميم جديد للروابط - مركزة في المنتصف */}
        <Box sx={{ mb: 5 }}>
          <Box 
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 2, md: 3 },
              justifyContent: 'center', // مركز الروابط في المنتصف
              mx: 'auto'
            }}
          >
            {navLinks.map((link, index) => (
              <Button
                key={index}
                component={Link}
                to={link.link}
                variant="text"
                color="inherit"
                sx={{
                  color: colors.textSecondary,
                  fontWeight: 500,
                  textTransform: 'none',
                  px: 1.5,
                  py: 0.75,
                  fontSize: '0.9rem',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    color: colors.primaryBlue,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {t(link.text)}
              </Button>
            ))}
          </Box>
        </Box>
        
        {/* خط الاعتماد السفلي مع حقوق النشر */}
        <Box 
          sx={{ 
            py: 2, 
            textAlign: 'center',
            borderTop: '1px solid',
            borderColor: colors.borderColor // استخدام نفس لون الحدود مثل البانر
          }}
        >
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 1, sm: 2 }}
            alignItems="center"
            justifyContent="center"
          >
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography
                variant="caption"
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  color: colors.textSecondary
                }}
              >
                {t('footer.developed')}{' '}
                <Box 
                  size={12} 
                  sx={{ color: 'error.main', mx: 0.5 }} 
                />
                <a
                  href="https://kenanda-rabah.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    textDecoration: 'none',
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {t('footer.developer')}
                </a>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
