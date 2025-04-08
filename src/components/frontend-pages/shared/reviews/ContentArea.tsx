import { Box, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { IconStarFilled } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const ContentArea = () => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      sx={{
        textAlign: 'center',
        mb: 8
      }}
    >
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          mb: 2
        }}
      >
        {[1,2,3,4,5].map((star) => (
          <IconStarFilled 
            key={star}
            size={24}
            style={{ 
              color: theme.palette.warning.main,
              filter: 'drop-shadow(0 0 8px rgba(255,159,0,0.3))'
            }}
          />
        ))}
      </Box>
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
        What Our Members Say
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: customizer.activeMode === 'dark' ? 'grey.400' : 'grey.700',
          maxWidth: '600px',
          mx: 'auto',
          lineHeight: 1.6
        }}
      >
        Discover how our media club has impacted the journeys of our talented members
      </Typography>
    </Box>
  );
};

export default ContentArea;
