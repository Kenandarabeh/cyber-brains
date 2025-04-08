import React from 'react';
import { Box, Container, Grid, Typography, Button, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  IconSchool,  // Changed from IconGraduationCap to IconSchool
  IconBuilding,
  IconWorld,
  IconShield,
  IconBulb,
  IconUsers
} from '@tabler/icons-react';

// Map icons to their keys - fixed to use available icons
const iconMap = {
  graduation: IconSchool,  // Changed to IconSchool which is available in the library
  building: IconBuilding,
  world: IconWorld,
  shield: IconShield,
  bulb: IconBulb,
  users: IconUsers
};

const Commitments = () => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  
  // Get commitments from translations
  const commitments = t('commitments.items', { returnObjects: true }) || [];
  
  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        background: customizer.activeMode === 'dark' 
          ? `linear-gradient(145deg, ${alpha(theme.palette.primary.dark, 0.8)}, ${alpha(theme.palette.grey[900], 0.95)})` 
          : `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.2)}, ${alpha(theme.palette.grey[50], 0.7)})`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/static/images/backgrounds/pattern-dot.svg")',
          backgroundSize: '40px 40px',
          backgroundRepeat: 'repeat',
          opacity: customizer.activeMode === 'dark' ? 0.03 : 0.05,
          zIndex: 1
        }
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: -100, md: -150 },
          right: { xs: -100, md: -150 },
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)}, transparent 70%)`,
          zIndex: 0
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: -100, md: -150 },
          left: { xs: -100, md: -150 },
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)}, transparent 70%)`,
          zIndex: 0
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Typography
              component="span"
              variant="overline"
              sx={{
                fontSize: '1rem',
                fontWeight: 500,
                color: theme.palette.primary.main,
                mb: 1,
                display: 'block'
              }}
            >
              {t('commitments.subtitle')}
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 100,
                  height: 4,
                  borderRadius: 2,
                  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }
              }}
            >
              {t('commitments.title')}
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                maxWidth: 800,
                mx: 'auto',
                color: customizer.activeMode === 'dark' ? 'grey.400' : 'grey.700',
                mb: 6,
                lineHeight: 1.7,
                textAlign: isRtl ? 'right' : 'center'
              }}
            >
              {t('commitments.description')}
            </Typography>
          </motion.div>
        </Box>

        <Grid 
          container 
          spacing={4} 
          justifyContent="center"
          direction={isRtl ? 'row-reverse' : 'row'}
        >
          {commitments.map((commitment, index) => {
            // Get the appropriate icon component
            const IconComponent = iconMap[commitment.icon] || IconBulb;
            
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 3,
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isRtl ? 'flex-end' : 'flex-start',
                      background: customizer.activeMode === 'dark'
                        ? alpha(theme.palette.background.paper, 0.7)
                        : alpha(theme.palette.background.paper, 0.9),
                      backdropFilter: 'blur(10px)',
                      boxShadow: customizer.activeMode === 'dark'
                        ? '0 8px 30px rgba(0,0,0,0.3)'
                        : '0 8px 30px rgba(0,0,0,0.06)',
                      border: '1px solid',
                      borderColor: customizer.activeMode === 'dark'
                        ? alpha(theme.palette.divider, 0.1)
                        : alpha(theme.palette.divider, 0.7),
                      transition: 'all 0.4s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: customizer.activeMode === 'dark'
                          ? '0 15px 40px rgba(0,0,0,0.4)'
                          : '0 15px 40px rgba(0,0,0,0.1)',
                        '& .icon-container': {
                          transform: 'scale(1.1)'
                        }
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover::after': {
                        opacity: 1
                      }
                    }}
                  >
                    <Box
                      className="icon-container"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60,
                        height: 60,
                        mb: 3,
                        borderRadius: '16px',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}`
                      }}
                    >
                      <IconComponent size={28} />
                    </Box>

                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        mb: 2,
                        color: customizer.activeMode === 'dark' ? 'white' : 'grey.900',
                        textAlign: isRtl ? 'right' : 'left'
                      }}
                    >
                      {commitment.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: customizer.activeMode === 'dark' ? 'grey.400' : 'grey.700',
                        lineHeight: 1.8,
                        textAlign: isRtl ? 'right' : 'left'
                      }}
                    >
                      {commitment.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: customizer.activeMode === 'dark'
                  ? `0 10px 30px ${alpha(theme.palette.primary.main, 0.5)}`
                  : `0 10px 30px ${alpha(theme.palette.primary.main, 0.2)}`,
                borderRadius: '50px',
                textTransform: 'none',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: customizer.activeMode === 'dark'
                    ? `0 15px 30px ${alpha(theme.palette.primary.main, 0.7)}`
                    : `0 15px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
                },
              }}
            >
              {t('commitments.cta')}
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Commitments;
