import React from 'react';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  IconCamera, 
  IconVideo, 
  IconWriting, 
  IconDeviceTv,
  IconMovie,
  IconPhotoEdit 
} from '@tabler/icons-react';

const EventCategories = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const customizer = useSelector((state: any) => state.customizer);

  const categories = [
    {
      icon: IconCamera,
      key: "photography",
      color: theme.palette.primary.main,
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)'
    },
    {
      icon: IconVideo,
      key: "videoProduction",
      color: theme.palette.secondary.main,
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #556270 100%)'
    },
    {
      icon: IconWriting,
      key: "journalism",
      color: '#45B7D1'
    },
    {
      icon: IconDeviceTv,
      key: "broadcasting",
      color: '#96CEB4'
    },
    {
      icon: IconMovie,
      key: "filmMaking",
      color: '#D4A5A5'
    },
    {
      icon: IconPhotoEdit,
      key: "digitalMedia",
      color: '#9B59B6'
    }
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: customizer.activeMode === 'dark' ? 'grey.900' : 'grey.50',
        borderBottom: '1px solid',
        borderColor: customizer.activeMode === 'dark' 
          ? 'rgba(255,255,255,0.1)' 
          : 'rgba(0,0,0,0.1)'
      }}
    >
      <Container maxWidth="lg">
        {/* Title Section */}
        <Box textAlign="center" mb={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 800,
                mb: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {t('eventCategories.title')}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: customizer.activeMode === 'dark' ? 'grey.400' : 'grey.600',
                maxWidth: '600px',
                mx: 'auto',
                mb: 6
              }}
            >
              {t('eventCategories.subtitle')}
            </Typography>
          </motion.div>
        </Box>

        {/* Categories Grid */}
        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={category.key}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    bgcolor: customizer.activeMode === 'dark' 
                      ? 'rgba(255,255,255,0.03)' 
                      : 'white',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: customizer.activeMode === 'dark'
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      borderColor: category.color,
                      '& .category-icon': {
                        transform: 'scale(1.1)'
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: category.gradient
                    }
                  }}
                >
                  <Box
                    className="category-icon"
                    sx={{
                      mb: 3,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <category.icon 
                      size={40} 
                      style={{
                        color: category.color,
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: customizer.activeMode === 'dark' 
                        ? 'grey.100' 
                        : 'grey.900'
                    }}
                  >
                    {t(`eventCategories.categories.${category.key}.title`)}
                  </Typography>

                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 2,
                      py: 0.5,
                      borderRadius: '30px',
                      bgcolor: `${category.color}15`,
                      color: category.color
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {t(`eventCategories.categories.${category.key}.count`)}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default EventCategories;
