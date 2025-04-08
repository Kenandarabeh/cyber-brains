import {
  Box,
  Container,
  Typography,
  MenuItem,
  Button,
  Paper,
  useTheme,
  Stack,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  Grid,
  alpha,
  Chip,
  Divider
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';
import { 
  IconBrandGithub, 
  IconCode, 
  IconDeviceLaptop, 
  IconUsers, 
  IconUser, 
  IconMail, 
  IconPhone,
  IconChevronRight,
  IconChevronLeft,
  IconSend
} from '@tabler/icons-react';

// استيراد المكونات المخصصة كما في form
import CustomFormLabel from '../../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../forms/theme-elements/CustomTextField';
import CustomSelect from '../../../forms/theme-elements/CustomSelect';

const CommitteeForm = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const customizer = useSelector((state: any) => state.customizer);
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const isDarkMode = theme.palette.mode === 'dark';

  // GitHub-styled colors similar to Banner.tsx
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

  // استخدام الترجمات للخطوات
  const steps = t('committeeForm.steps', { returnObjects: true }) || [
    'Personal Information',
    'Committee Selection',
    'Experience & Motivation'
  ];

  // استخدام خيارات اللجان من الترجمات
  const committees = t('committeeForm.form.committee.options', { returnObjects: true }) || [];

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      committee: '',
      experience: '',
      motivation: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('committeeForm.form.name.error')),
      email: Yup.string().email(t('committeeForm.form.email.invalid')).required(t('committeeForm.form.email.error')),
      phone: Yup.string().required(t('committeeForm.form.phone.error')),
      committee: Yup.string().required(t('committeeForm.form.committee.error')),
      experience: Yup.string().required(t('committeeForm.form.experience.error')),
      motivation: Yup.string().required(t('committeeForm.form.motivation.error'))
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        await emailjs.send(
          'service_ks8qzxr',
          'template_nmb9wdi',
          {
            from_name: values.name,
            reply_to: values.email,
            phone: values.phone,
            committee: values.committee,
            experience: values.experience,
            motivation: values.motivation
          },
          '7bQ9zI4Q4F4P2fGfZ'
        );
        setSubmitStatus('success');
        resetForm();
        setActiveStep(0);
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleNext = () => {
    const currentStep = activeStep;
    let isStepValid = true;
    
    if (currentStep === 0) {
      ['name', 'email', 'phone'].forEach(field => {
        if (!formik.values[field]) {
          formik.setFieldTouched(field, true, true);
          isStepValid = false;
        }
      });
    } else if (currentStep === 1) {
      if (!formik.values.committee) {
        formik.setFieldTouched('committee', true, true);
        isStepValid = false;
      }
    }
    
    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Get committee icon based on value
  const getCommitteeIcon = (value: string) => {
    switch(value) {
      case 'press': return <IconUsers size={18} />;
      case 'digital': return <IconDeviceLaptop size={18} />;
      case 'relations': return <IconUsers size={18} />;
      case 'training': return <IconCode size={18} />;
      case 'documentation': return <IconBrandGithub size={18} />;
      case 'resources': return <IconUsers size={18} />;
      default: return <IconUsers size={18} />;
    }
  };

  // Define animated transitions
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

  // حقول النموذج مع استخدام المكونات المخصصة
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid 
            container 
            spacing={3} 
            component={motion.div} 
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <Grid item xs={12} component={motion.div} variants={itemVariants}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                mb: 2,
                color: colors.primaryBlue
              }}>
                <IconUser size={22} />
                <Typography variant="h6" fontWeight={600}>
                  {t('committeeForm.form.name.label')}
                </Typography>
              </Box>
              <CustomTextField
                id="name"
                name="name"
                placeholder={t('committeeForm.form.name.label')}
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                dir={isRTL ? 'rtl' : 'ltr'}
                inputProps={{
                  style: { textAlign: isRTL ? 'right' : 'left' }
                }}
                required
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
                mb: 2,
                color: colors.primaryBlue
              }}>
                <IconMail size={22} />
                <Typography variant="h6" fontWeight={600}>
                  {t('committeeForm.form.email.label')}
                </Typography>
              </Box>
              <CustomTextField
                id="email"
                name="email"
                type="email"
                placeholder={t('committeeForm.form.email.label')}
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                dir={isRTL ? 'rtl' : 'ltr'}
                inputProps={{
                  style: { textAlign: isRTL ? 'right' : 'left' }
                }}
                required
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
                mb: 2,
                color: colors.primaryBlue
              }}>
                <IconPhone size={22} />
                <Typography variant="h6" fontWeight={600}>
                  {t('committeeForm.form.phone.label')}
                </Typography>
              </Box>
              <CustomTextField
                id="phone"
                name="phone"
                placeholder={t('committeeForm.form.phone.label')}
                fullWidth
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                dir={isRTL ? 'rtl' : 'ltr'}
                inputProps={{
                  style: { textAlign: isRTL ? 'right' : 'left' }
                }}
                required
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
          </Grid>
        );
      case 1:
        return (
          <Grid 
            container 
            spacing={3}
            component={motion.div} 
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <Grid item xs={12} component={motion.div} variants={itemVariants}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                mb: 2,
                color: colors.primaryBlue
              }}>
                <IconUsers size={22} />
                <Typography variant="h6" fontWeight={600}>
                  {t('committeeForm.form.committee.label')}
                </Typography>
              </Box>
              <Box 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: `1px solid ${colors.borderColor}`,
                  bgcolor: colors.bgSecondary
                }}
              >
                <Grid container spacing={2}>
                  {committees.map((option) => (
                    <Grid item xs={12} sm={6} key={option.value} component={motion.div} variants={itemVariants}>
                      <Box
                        sx={{
                          p: 2,
                          border: `2px solid ${formik.values.committee === option.value ? 
                            colors.primaryBlue : colors.borderColor}`,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          bgcolor: formik.values.committee === option.value ? 
                            alpha(colors.primaryBlue, 0.08) : 'transparent',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: colors.primaryBlue,
                            bgcolor: alpha(colors.primaryBlue, 0.05),
                          }
                        }}
                        onClick={() => formik.setFieldValue('committee', option.value)}
                      >
                        <Stack direction="row" spacing={1} alignItems="center">
                          {getCommitteeIcon(option.value)}
                          <Typography fontWeight={600}>{option.label}</Typography>
                        </Stack>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                {formik.touched.committee && formik.errors.committee && (
                  <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1.5, textAlign: isRTL ? 'right' : 'left' }}>
                    {formik.errors.committee}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid 
            container 
            spacing={3}
            component={motion.div} 
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <Grid item xs={12} component={motion.div} variants={itemVariants}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                mb: 2,
                color: colors.primaryBlue
              }}>
                <IconCode size={22} />
                <Typography variant="h6" fontWeight={600}>
                  {t('committeeForm.form.experience.label')}
                </Typography>
              </Box>
              <CustomTextField
                id="experience"
                name="experience"
                placeholder={t('committeeForm.form.experience.label')}
                multiline
                rows={4}
                fullWidth
                value={formik.values.experience}
                onChange={formik.handleChange}
                error={formik.touched.experience && Boolean(formik.errors.experience)}
                helperText={formik.touched.experience && formik.errors.experience}
                dir={isRTL ? 'rtl' : 'ltr'}
                inputProps={{
                  style: { textAlign: isRTL ? 'right' : 'left' }
                }}
                required
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
            <Grid item xs={12} component={motion.div} variants={itemVariants}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                mb: 2,
                color: colors.primaryBlue
              }}>
                <IconBrandGithub size={22} />
                <Typography variant="h6" fontWeight={600}>
                  {t('committeeForm.form.motivation.label')}
                </Typography>
              </Box>
              <CustomTextField
                id="motivation"
                name="motivation"
                placeholder={t('committeeForm.form.motivation.label')}
                multiline
                rows={4}
                fullWidth
                value={formik.values.motivation}
                onChange={formik.handleChange}
                error={formik.touched.motivation && Boolean(formik.errors.motivation)}
                helperText={formik.touched.motivation && formik.errors.motivation}
                dir={isRTL ? 'rtl' : 'ltr'}
                inputProps={{
                  style: { textAlign: isRTL ? 'right' : 'left' }
                }}
                required
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
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        bgcolor: colors.bgPrimary,
        backgroundImage: `linear-gradient(180deg, ${theme.palette.primary.main}15 0%, ${colors.bgPrimary} 100%)`,
        overflow: 'hidden', // Added to prevent grid overflow
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

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* GitHub-like centered header badge */}
          <Box
            sx={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 6 
            }}
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
                {t('committeeForm.subtitle')}
              </Typography>
            </Box>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              bgcolor: colors.bgPrimary,
              border: `1px solid ${colors.borderColor}`,
              direction: isRTL ? 'rtl' : 'ltr',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
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
            
            {/* Form Header */}
            <Box sx={{ mb: 6, textAlign: 'center', position: 'relative', zIndex: 1 }}>
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
                {t('committeeForm.title')}
              </Typography>
              <Typography color="text.secondary">
                {t('committeeForm.subtitle')}
              </Typography>
              
              {/* Selected committee badge */}
              {formik.values.committee && (
                <Chip
                  icon={getCommitteeIcon(formik.values.committee)}
                  label={committees.find(c => c.value === formik.values.committee)?.label}
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 2 }}
                />
              )}
            </Box>

            {/* Stepper - GitHub styled */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Stepper 
                activeStep={activeStep} 
                sx={{ mb: 5, mt: 2, }}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconProps={{
                        sx: {
                          color: colors.borderColor,
                          '&.Mui-active': {
                            color: colors.primaryBlue,
                          },
                          '&.Mui-completed': {
                            color: colors.primaryGreen,
                          }
                        },
                      }}
                      sx={{
                        '& .MuiStepLabel-label': {
                          color: index === activeStep ? colors.primaryBlue : colors.textSecondary,
                          fontWeight: index === activeStep ? 600 : 400,
                        },
                      }}
                    >{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {/* Form content with a code block appearance */}
            <Box
              dir={isRTL ? 'rtl' : 'ltr'}
              sx={{
                position: 'relative',
                zIndex: 1,
                bgcolor: alpha(colors.bgSecondary, 0.5),
                borderRadius: 2,
                border: `1px solid ${colors.borderColor}`,
                p: { xs: 2, md: 3 },
                mb: 4
              }}
            >
              <form onSubmit={formik.handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderStepContent(activeStep)}
                  </motion.div>
                </AnimatePresence>
              </form>
            </Box>
            
            {/* GitHub-like footer with buttons */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Divider sx={{ my: 3, borderColor: colors.borderColor }} />
              
              {/* Navigation Buttons - Complete fix for RTL spacing issues */}
              <Box 
                sx={{ 
                  mt: 3,
                  display: 'flex', 
                  gap: 2,
                }}
              >
                {activeStep > 0 && (
                  <Button
                    onClick={handleBack}
                    variant="outlined"
                    size="large"
                    startIcon={isRTL ? <IconChevronRight /> : null}
                    endIcon={!isRTL ? <IconChevronLeft /> : null}
                    sx={{ 
                      minWidth: 130,
                      borderRadius: '6px',
                      borderColor: colors.borderColor,
                      color: colors.text,
                      '&:hover': {
                        borderColor: colors.primaryBlue,
                        bgcolor: alpha(colors.primaryBlue, 0.05),
                      }
                    }}
                  >
                    {t('committeeForm.form.buttons.back')}
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? formik.submitForm : handleNext}
                  disabled={isSubmitting}
                  size="large"
                  sx={{
                    minWidth: 130,
                    borderRadius: '6px',
                    bgcolor: activeStep === steps.length - 1 ? colors.primaryGreen : colors.primaryBlue,
                    '&:hover': {
                      bgcolor: activeStep === steps.length - 1 ? colors.hoverGreen : colors.primaryBlue,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 12px ${alpha(
                        activeStep === steps.length - 1 ? colors.primaryGreen : colors.primaryBlue, 
                        0.3
                      )}`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : activeStep === steps.length - 1 ? (
                    t('committeeForm.form.buttons.submit')
                  ) : (
                    t('committeeForm.form.buttons.next')
                  )}
                </Button>
              </Box>

              {/* Status Messages */}
              {submitStatus && (
                <Box sx={{ mt: 3 }}>
                  <Alert 
                    severity={submitStatus}
                    sx={{
                      borderRadius: '6px',
                      border: `1px solid ${colors.borderColor}`,
                    }}
                  >
                    {submitStatus === 'success' 
                      ? t('committeeForm.form.success')
                      : t('committeeForm.form.error')}
                  </Alert>
                </Box>
              )}
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CommitteeForm;
