import React from 'react';
import { Box, Container, Grid, Typography, Button, useTheme, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconCalendar, IconMapPin, IconUsers, IconClock } from '@tabler/icons-react';

const upcomingEvents = [
  {
    id: 1,
    title: "Introduction to DSLR Photography",
    date: "2024-03-20",
    time: "14:00",
    location: "Media Lab Room 101",
    category: "Workshop",
    capacity: 25,
    registeredCount: 15,
    image: "/path/to/image1.jpg",
    status: "Open"
  },
  {
    id: 2,
    title: "News Writing Workshop",
    date: "2024-03-25",
    time: "15:30",
    location: "Journalism Center",
    category: "Training",
    capacity: 30,
    registeredCount: 28,
    image: "/path/to/image2.jpg",
    status: "Almost Full"
  },
  {
    id: 3,
    title: "Video Editing Masterclass",
    date: "2024-04-01",
    time: "13:00",
    location: "Digital Studio",
    category: "Masterclass",
    capacity: 20,
    registeredCount: 20,
    image: "/path/to/image3.jpg",
    status: "Full"
  }
];

const EventCard = ({ event }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const customizer = useSelector((state: any) => state.customizer);

  const getStatusColor = () => {
    if (event.status === 'Full') return 'error';
    if (event.status === 'Almost Full') return 'warning';
    return 'success';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: customizer.activeMode === 'dark' 
            ? 'rgba(0,0,0,0.2)' 
            : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: customizer.activeMode === 'dark' 
            ? 'rgba(255,255,255,0.05)' 
            : 'rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: customizer.activeMode === 'dark'
              ? '0 8px 30px rgba(0,0,0,0.6)'
              : '0 8px 30px rgba(0,0,0,0.1)',
            borderColor: customizer.activeMode === 'dark'
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(0,0,0,0.1)'
          }
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip 
            label={event.category}
            color="primary"
            size="small"
            sx={{ borderRadius: 1 }}
          />
          <Chip 
            label={t(`upcomingEvents.status.${event.status.toLowerCase()}`)}
            color={getStatusColor()}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 1 }}
          />
        </Box>

        <Typography
          variant="h5"
          gutterBottom
          sx={{ 
            fontWeight: 600,
            color: customizer.activeMode === 'dark' ? 'text.primary' : 'text.secondary',
            mb: 2
          }}
        >
          {event.title}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconCalendar size={18} color={theme.palette.primary.main} />
              <Typography variant="body2" color="text.secondary">
                {new Date(event.date).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconClock size={18} color={theme.palette.primary.main} />
              <Typography variant="body2" color="text.secondary">
                {event.time}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconMapPin size={18} color={theme.palette.primary.main} />
              <Typography variant="body2" color="text.secondary">
                {event.location}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconUsers size={18} color={theme.palette.primary.main} />
              <Typography variant="body2" color="text.secondary">
                {`${event.registeredCount}/${event.capacity} ${t('upcomingEvents.capacity')}`}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          fullWidth
          disabled={event.status === 'Full'}
          sx={{
            py: 1,
            bgcolor: theme.palette.primary.main,
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            }
          }}
        >
          {t('upcomingEvents.register')}
        </Button>
      </Box>
    </motion.div>
  );
};

const UpcomingEvents = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const customizer = useSelector((state: any) => state.customizer);

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: customizer.activeMode === 'dark' 
          ? 'rgba(0,0,0,0.95)' 
          : 'rgba(245,245,245,0.9)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: customizer.activeMode === 'dark'
            ? 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 800,
                mb: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {t('upcomingEvents.title')}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: customizer.activeMode === 'dark' ? 'grey.400' : 'grey.600',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              {t('upcomingEvents.subtitle')}
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {upcomingEvents.map((event) => (
            <Grid item xs={12} md={4} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default UpcomingEvents;

