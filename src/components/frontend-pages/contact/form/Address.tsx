import React from 'react';
import { Box, Typography, Stack, Paper, Divider, Grid, Link, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  IconMapPin, 
  IconMail, 
  IconPhone, 
  IconClock, 
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandGithub
} from '@tabler/icons-react';

interface AddressProps {
  colors?: any;
  isRTL?: boolean;
}

const Address = ({ colors, isRTL }: AddressProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Use passed colors or default to theme colors
  const addressColors = colors || {
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
    bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
    primaryGreen: isDarkMode ? '#2ea043' : '#2da44e',
  };
  
  // Fixed phone number display with Unicode LTR marker to prevent RTL reversal
  const phoneNumber = '\u202A+213 770 12 34 56\u202C'; // LTR mark wrapping
  
  const contactInfo = [
    { 
      icon: <IconMapPin size={22} />, 
      title: t('contactAddress.address'), 
      value: t('contactAddress.addressValue') 
    },
    { 
      icon: <IconMail size={22} />, 
      title: t('contactAddress.email'), 
      value: 'info@cyberbrains.tech',
      isLink: true,
      href: 'mailto:info@cyberbrains.tech'
    },
    { 
      icon: <IconPhone size={22} />, 
      title: t('contactAddress.phone'), 
      value: phoneNumber,
      isLink: true,
      href: 'tel:+2137701234567'
    },
    { 
      icon: <IconClock size={22} />, 
      title: t('contactAddress.hours'), 
      value: t('contactAddress.hoursValue') 
    }
  ];
  
  const socialLinks = [
    { icon: IconBrandFacebook, href: 'https://facebook.com/cyberbrains' },
    { icon: IconBrandInstagram, href: 'https://instagram.com/cyberbrains' },
    { icon: IconBrandGithub, href: 'https://github.com/cyberbrains' }
  ];

  // Animation variants for staggered items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        height: '100%',
        borderRadius: 3,
        bgcolor: addressColors.bgPrimary,
        border: `1px solid ${addressColors.borderColor}`,
        direction: isRTL ? 'rtl' : 'ltr',
        boxShadow: '0 8px 30px -10px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background grid pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(${addressColors.borderColor} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          opacity: 0.2,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Title */}
        <Typography 
          variant="h5"
          sx={{ 
            mb: 3, 
            fontWeight: 600, 
            color: addressColors.text,
            borderBottom: `1px solid ${addressColors.borderColor}`,
            pb: 2
          }}
        >
          {t('contactAddress.getInTouch')}
        </Typography>
        
        {/* Contact information */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <Stack spacing={3} sx={{ mb: 4 }}>
            {contactInfo.map((info, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2 
                  }}
                >
                  <Box 
                    sx={{ 
                      color: addressColors.primaryBlue, 
                      mt: 0.5 
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      fontWeight={600} 
                      sx={{ mb: 0.5, color: addressColors.text }}
                    >
                      {info.title}
                    </Typography>
                    {info.isLink ? (
                      <Link 
                        href={info.href} 
                        sx={{ 
                          color: addressColors.primaryBlue,
                          textDecoration: 'none',
                          direction: info.icon === <IconPhone size={22} /> ? 'ltr' : 'inherit', // Force LTR for phone numbers
                          unicodeBidi: info.icon === <IconPhone size={22} /> ? 'embed' : 'normal', // Additional direction control
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {info.value}
                      </Link>
                    ) : (
                      <Typography variant="body2" sx={{ color: addressColors.textSecondary }}>
                        {info.value}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Stack>
        </motion.div>
        
        <Divider sx={{ my: 3, borderColor: addressColors.borderColor }} />
        
        {/* Social media links */}
        <Box>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 2, 
              fontWeight: 600,
              color: addressColors.text 
            }}
          >
            {t('contactAddress.followUs')}
          </Typography>
          
          <Grid container spacing={1}>
            {socialLinks.map((social, index) => (
              <Grid item key={index}>
                <Link 
                  href={social.href} 
                  target="_blank"
                  sx={{
                    bgcolor: addressColors.bgSecondary,
                    color: addressColors.text,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: '6px',
                    border: `1px solid ${addressColors.borderColor}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: addressColors.primaryBlue,
                      color: '#fff',
                      transform: 'translateY(-3px)',
                      boxShadow: `0 4px 10px rgba(0,0,0,0.15)`
                    }
                  }}
                >
                  <social.icon size={18} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default Address;
