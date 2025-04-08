import React from 'react';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { IconCalendarEvent, IconUsers, IconMapPin } from '@tabler/icons-react';

const featuredEvents = [
  {
    id: 1,
    title: "Photography Workshop 2024",
    date: "2024-03-15",
    location: "Media Lab",
    attendees: 30,
    category: "Workshop",
    image: "/images/events/photo-workshop.jpg",
    description: "Learn advanced photography techniques with professional equipment"
  },
  {
    id: 2,
    title: "Documentary Film Festival",
    date: "2024-04-20",
    location: "Main Auditorium",
    attendees: 150,
    category: "Festival",
    image: "/images/events/film-festival.jpg",
    description: "Annual showcase of student-produced documentaries"
  },
  // Add more events as needed
];

const EventCard = ({ event }) => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: customizer.activeMode === 'dark' ? 'rgba(255,255,255,0.03)' : 'white',
          boxShadow: customizer.activeMode === 'dark'
            ? '0 8px 32px rgba(0,0,0,0.5)'
            : '0 8px 32px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)'
          }
        }}
      >
        {/* Event Image */}
        <Box
          sx={{
            height: 200,
            background: `url(${event.image}) no-repeat center center`,
            backgroundSize: 'cover'
          }}
        />

        {/* Event Content */}
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: customizer.activeMode === 'dark' ? 'grey.100' : 'grey.900'
            }}
          >
            {event.title}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconCalendarEvent size={18} color={theme.palette.primary.main} />
                <Typography variant="body2" color="text.secondary">
                  {new Date(event.date).toLocaleDateString()}
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
                  {event.attendees} Participants
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Typography variant="body1" color="text.secondary">
            {event.description}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

const EventsShowcase = () => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: customizer.activeMode === 'dark' ? 'grey.900' : 'grey.50',
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sx={{ mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                align="center"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  mb: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Featured Events
              </Typography>
              <Typography
                variant="h5"
                align="center"
                sx={{
                  color: customizer.activeMode === 'dark' ? 'grey.400' : 'grey.600',
                  maxWidth: '800px',
                  mx: 'auto'
                }}
              >
                Join our upcoming events and workshops to enhance your media skills
              </Typography>
            </motion.div>
          </Grid>

          {featuredEvents.map((event) => (
            <Grid item xs={12} md={4} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default EventsShowcase;
