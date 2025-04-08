import { Box, Container, Grid, Typography, useTheme, useMediaQuery, Chip, Stack } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MemberCard from './MemberCard';
import { motion, AnimatePresence } from 'framer-motion';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CommitteeMembers = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const customizer = useSelector((state: any) => state.customizer);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const committees = t('committeeMembers.committees', { returnObjects: true }) || [
    {
      name: 'Media Production',
      members: [
        { name: 'عضو 1', role: 'مصور', image: '/images/members/1.jpg' },
        { name: 'عضو 2', role: 'مونتير', image: '/images/members/2.jpg' },
      ]
    },
    {
      name: 'Content Creation',
      members: [
        { name: 'عضو 3', role: 'كاتب محتوى', image: '/images/members/3.jpg' },
        { name: 'عضو 4', role: 'مدقق لغوي', image: '/images/members/4.jpg' },
      ]
    },
    {
      name: 'Social Media',
      members: [
        { name: 'عضو 5', role: 'مدير حسابات', image: '/images/members/5.jpg' },
      ]
    },
    {
      name: 'Graphics Design',
      members: [
        { name: 'عضو 6', role: 'مصمم جرافيك', image: '/images/members/6.jpg' },
      ]
    },
    {
      name: 'Public Relations',
      members: [
        { name: 'عضو 7', role: 'منسق علاقات', image: '/images/members/7.jpg' },
      ]
    },
  ];

  return (
    <Box sx={{ 
      py: { xs: 8, lg: 12 },
      bgcolor: theme.palette.background.default
    }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          mb: 6,
          textAlign: 'center' 
        }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { lg: '2rem', xs: '1.5rem' },
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 1,
              textAlign: 'center'
            }}
          >
            {t('committeeMembers.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: '800px',
              mx: 'auto',
              textAlign: 'center'
            }}
          >
            {t('committeeMembers.subtitle')}
          </Typography>
        </Box>

        <Box sx={{ 
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          direction: isRTL ? 'rtl' : 'ltr',
          overflow: 'hidden',
          boxShadow: customizer.activeMode === 'dark' 
            ? '0 4px 20px rgba(0,0,0,0.2)' 
            : '0 4px 20px rgba(0,0,0,0.05)'
        }}>
          <Box
            sx={{
              p: { xs: 2, md: 3 },
              borderBottom: `1px solid ${theme.palette.divider}`,
              background: customizer.activeMode === 'dark' 
                ? 'rgba(255,255,255,0.02)' 
                : 'rgba(0,0,0,0.01)',
              position: 'sticky',
              top: 0,
              zIndex: 5
            }}
          >
            <Stack 
              direction="row" 
              flexWrap="wrap" 
              justifyContent="center" 
              spacing={1}
              sx={{ 
                gap: 1,
                mb: -1
              }}
            >
              {committees.map((committee, index) => (
                <Chip
                  key={index}
                  label={committee.name}
                  clickable
                  color={value === index ? "primary" : "default"}
                  onClick={() => handleChange(index)}
                  variant={value === index ? "filled" : "outlined"}
                  sx={{
                    mb: 1,
                    px: 1,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    fontWeight: value === index ? 600 : 500,
                    borderRadius: '16px',
                    height: { xs: 32, md: 36 },
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    borderColor: value === index 
                      ? theme.palette.primary.main 
                      : theme.palette.divider,
                    '& .MuiChip-label': {
                      px: { xs: 1.5, sm: 2 },
                      py: 0.75,
                    },
                    '&:hover': {
                      backgroundColor: value === index 
                        ? theme.palette.primary.dark
                        : customizer.activeMode === 'dark'
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(0,0,0,0.05)',
                      transform: 'translateY(-2px)',
                      boxShadow: value === index 
                        ? '0 4px 8px rgba(0,0,0,0.15)'
                        : 'none'
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    boxShadow: value === index 
                      ? '0 2px 5px rgba(0,0,0,0.1)'
                      : 'none'
                  }}
                />
              ))}
            </Stack>
          </Box>

          <AnimatePresence mode="wait">
            {committees.map((committee, index) => (
              value === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box 
                    sx={{ 
                      p: { xs: 2, md: 3 },
                    }}
                  >
                    <Grid 
                      container 
                      spacing={3}
                      justifyContent="center"
                    >
                      {committee.members.map((member, mIndex) => (
                        <Grid item xs={12} sm={6} md={4} key={mIndex}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: mIndex * 0.1 }}
                          >
                            <MemberCard
                              name={member.name}
                              role={member.role}
                              image={member.image}
                              social={{
                                github: 'https://github.com',
                                linkedin: '#',
                                twitter: '#',
                              }}
                            />
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          
          {committees[value]?.members?.length === 0 && (
            <Box sx={{ 
              py: 10, 
              textAlign: 'center',
              color: 'text.secondary'
            }}>
              <Typography variant="body1">
                {t('committeeMembers.noMembers')}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default CommitteeMembers;
