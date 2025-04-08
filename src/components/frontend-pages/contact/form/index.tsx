import React, { useRef, useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  MenuItem, 
  Button, 
  Alert, 
  Snackbar, 
  Typography, 
  Paper,
  useTheme,
  Divider,
  alpha,
  Stack,
  Chip
} from '@mui/material';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  IconBrandGithub, 
  IconMail, 
  IconPhone, 
  IconUser, 
  IconMessageCircle,
  IconSend,
  IconBuildingCommunity
} from '@tabler/icons-react';

import CustomFormLabel from '../../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../forms/theme-elements/CustomTextField';
import CustomSelect from '../../../forms/theme-elements/CustomSelect';
import Address from './Address';

const Form = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [number, setNumber] = React.useState('one');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const isDarkMode = theme.palette.mode === 'dark';

  // GitHub-styled colors from Banner.tsx
  const colors = {
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
    merged: isDarkMode ? '#a371f7' : '#8250df',
  };

  // استخدام خيارات الاستفسار من الترجمة
  const enquiryOptions = t('contactForm.enquiryOptions', { returnObjects: true }) || [
    {
      value: 'one',
      label: 'General Enquiry'
    },
    {
      value: 'two',
      label: 'General Enquiry 2'
    }
  ];

  const handleChange3 = (event: any) => {
    setNumber(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        'service_d9o6vmi',
        'template_z0jnkki',
        formRef.current,
        '--jJdrLcD1rXSa6ti'
      );
      setAlertType('success');
      setShowAlert(true);
      formRef.current.reset();
    } catch (error) {
      setAlertType('error');
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Animation variants
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
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: colors.bgPrimary,
        py: { xs: 8, md: 10 },
        overflow: 'hidden',
      }}
    >
      {/* Enhanced grid pattern with both horizontal and vertical lines */}
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
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Blurred gradient effect on edges */}
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
        {/* GitHub-like centered header badge */}
        <Box
          sx={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 6 
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                bgcolor: alpha(colors.primaryBlue, isDarkMode ? 0.15 : 0.08),
                color: colors.primaryBlue,
                py: 0.8,
                px: 2.5,
                borderRadius: '2rem',
                border: `1px solid ${alpha(colors.primaryBlue, isDarkMode ? 0.3 : 0.15)}`,
                boxShadow: `0 4px 20px ${alpha(colors.primaryBlue, isDarkMode ? 0.25 : 0.1)}`,
                mb: 2
              }}
            >
              <IconBrandGithub size={18} style={{ marginRight: '8px', opacity: 0.9 }} />
              <Typography
                variant="body2"
                sx={{ 
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                {t('contactForm.subtitle')}
              </Typography>
            </Box>
          </motion.div>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Form Header */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}
            >
              {t('contactForm.title')}
            </Typography>
            <Typography 
              color="text.secondary"
              sx={{ 
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              {t('contactForm.description')}
            </Typography>
          </Box>
          
          <Grid 
            container 
            spacing={4} 
            justifyContent="center"
          >
            {/* Contact Form */}
            <Grid 
              item 
              xs={12} 
              lg={8}
              component={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  bgcolor: colors.bgPrimary,
                  border: `1px solid ${colors.borderColor}`,
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
                    backgroundImage: `radial-gradient(${colors.gridLines} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                    opacity: 0.3,
                    zIndex: 0,
                    pointerEvents: 'none',
                  }}
                />
                
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1.5,
                          mb: 1,
                          color: colors.primaryBlue
                        }}>
                          <IconUser size={20} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            {t('contactForm.firstName')}
                          </Typography>
                        </Box>
                        <CustomTextField 
                          name="from_name" 
                          id="from_name" 
                          placeholder={t('contactForm.firstName')} 
                          fullWidth 
                          required 
                          dir={isRTL ? 'rtl' : 'ltr'}
                          inputProps={{
                            style: { textAlign: isRTL ? 'right' : 'left' }
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '6px',
                              backgroundColor: colors.bgSecondary,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.primaryBlue,
                              },
                            }
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1.5,
                          mb: 1,
                          color: colors.primaryBlue
                        }}>
                          <IconUser size={20} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            {t('contactForm.lastName')}
                          </Typography>
                        </Box>
                        <CustomTextField 
                          name="last_name" 
                          id="last_name" 
                          placeholder={t('contactForm.lastName')} 
                          fullWidth 
                          required 
                          dir={isRTL ? 'rtl' : 'ltr'}
                          inputProps={{
                            style: { textAlign: isRTL ? 'right' : 'left' }
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '6px',
                              backgroundColor: colors.bgSecondary,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.primaryBlue,
                              },
                            }
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1.5,
                          mb: 1,
                          color: colors.primaryBlue
                        }}>
                          <IconPhone size={20} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            {t('contactForm.phoneNumber')}
                          </Typography>
                        </Box>
                        <CustomTextField 
                          name="phone" 
                          id="phone" 
                          placeholder="xxx xxx xxxx" 
                          fullWidth 
                          required 
                          dir={isRTL ? 'rtl' : 'ltr'}
                          inputProps={{
                            style: { textAlign: isRTL ? 'right' : 'left' }
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '6px',
                              backgroundColor: colors.bgSecondary,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.primaryBlue,
                              },
                            }
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1.5,
                          mb: 1,
                          color: colors.primaryBlue
                        }}>
                          <IconMail size={20} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            {t('contactForm.email')}
                          </Typography>
                        </Box>
                        <CustomTextField 
                          name="reply_to" 
                          id="reply_to" 
                          type="email" 
                          placeholder={t('contactForm.email')} 
                          fullWidth 
                          required 
                          dir={isRTL ? 'rtl' : 'ltr'}
                          inputProps={{
                            style: { textAlign: isRTL ? 'right' : 'left' }
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '6px',
                              backgroundColor: colors.bgSecondary,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.primaryBlue,
                              },
                            }
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} component={motion.div} variants={itemVariants}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1.5,
                          mb: 1,
                          color: colors.primaryBlue
                        }}>
                          <IconBuildingCommunity size={20} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            {t('contactForm.enquiryRelatedTo')}
                          </Typography>
                        </Box>
                        <CustomSelect
                          fullWidth
                          id="txt-enquire"
                          variant="outlined"
                          value={number}
                          onChange={handleChange3}
                          dir={isRTL ? 'rtl' : 'ltr'}
                          sx={{
                            textAlign: isRTL ? 'right' : 'left',
                            '& .MuiSelect-select': {
                              textAlign: isRTL ? 'right' : 'left',
                              borderRadius: '6px',
                              backgroundColor: colors.bgSecondary,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderRadius: '6px',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: colors.primaryBlue,
                            },
                          }}
                        >
                          {enquiryOptions.map((option) => (
                            <MenuItem 
                              key={option.value} 
                              value={option.value}
                              dir={isRTL ? 'rtl' : 'ltr'}
                              style={{ textAlign: isRTL ? 'right' : 'left' }}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      </Grid>
                      
                      <Grid item xs={12} component={motion.div} variants={itemVariants}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1.5,
                          mb: 1,
                          color: colors.primaryBlue
                        }}>
                          <IconMessageCircle size={20} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            {t('contactForm.message')}
                          </Typography>
                        </Box>
                        <CustomTextField
                          name="message"
                          id="message"
                          multiline
                          rows={4}
                          variant="outlined"
                          placeholder={t('contactForm.message')}
                          fullWidth
                          required
                          dir={isRTL ? 'rtl' : 'ltr'}
                          inputProps={{
                            style: { textAlign: isRTL ? 'right' : 'left' }
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: colors.bgSecondary,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.primaryBlue,
                              },
                            }
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Divider sx={{ 
                          my: 2, 
                          borderColor: colors.borderColor 
                        }} />
                        
                        <Box 
                          sx={{ 
                            display: 'flex',
                            justifyContent: isRTL ? 'flex-start' : 'flex-end'
                          }}
                        >
                          <Button 
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                      sx={{
                              py: 1,
                              px: 3,
                              borderRadius: '6px',
                              bgcolor: colors.primaryGreen,
                              '&:hover': {
                                bgcolor: colors.hoverGreen,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 4px 12px ${alpha(colors.primaryGreen, 0.3)}`,
                              },
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {isSubmitting ? t('contactForm.sending') : t('contactForm.submit')}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Paper>
            </Grid>
            
            {/* Address Section */}
            <Grid 
              item 
              xs={12} 
              lg={4} 
              component={motion.div}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Address colors={colors} isRTL={isRTL} />
            </Grid>
          </Grid>
        </motion.div>
      </Container>
      
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
      >
        <Alert 
          severity={alertType} 
          sx={{ 
            width: '100%',
            borderRadius: '6px',
            border: `1px solid ${colors.borderColor}`,
          }}
        >
          {alertType === 'success' 
            ? t('contactForm.successMessage')
            : t('contactForm.errorMessage')}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Form;
