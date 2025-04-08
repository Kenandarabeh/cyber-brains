import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  alpha,
  Paper,
  Grid,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  IconBrandDiscord,
} from '@tabler/icons-react';

const DiscordInvite = () => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const isDarkMode = customizer.activeMode === 'dark';

  // Discord invitation URL - replace with your actual Discord invite
  const discordInviteUrl = "https://discord.gg/G8B4UvPr";

  // GitHub-styled colors matching Reviews.tsx
  const colors = {
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
    bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
    discordColor: isDarkMode ? '#5865F2' : '#5865F2',
    hoverBg: isDarkMode ? '#30363d' : '#f3f4f6',
    gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
    success: isDarkMode ? '#3fb950' : '#2da44e',
    discordBlurple: '#5865F2',
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
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
        py: { xs: 4, sm: 6, lg: 10 },
        bgcolor: colors.bgPrimary,
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: colors.borderColor,
        overflow: 'hidden'
      }}
      id="discord"
    >
      {/* Background elements - similar to Reviews.tsx */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          [isRtl ? 'left' : 'right']: '10%',
          width: { xs: '200px', sm: '300px' },
          height: { xs: '200px', sm: '300px' },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(colors.discordBlurple, 0.08)} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          [isRtl ? 'right' : 'left']: '8%',
          width: { xs: '180px', sm: '250px' },
          height: { xs: '180px', sm: '250px' },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(colors.secondaryColor, 0.06)} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      
      {/* GitHub-style grid background */}
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
          opacity: 0.2,
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header styled like Reviews.tsx */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ 
            mb: { xs: 3, sm: 5 }, 
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center'
          }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 2
          }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(colors.discordBlurple, isDarkMode ? 0.15 : 0.08),
                color: colors.discordBlurple,
                width: { xs: 56, sm: 64 },
                height: { xs: 56, sm: 64 },
                borderRadius: '50%',
                border: `1px solid ${alpha(colors.discordBlurple, isDarkMode ? 0.3 : 0.15)}`,
                boxShadow: `0 4px 20px ${alpha(colors.discordBlurple, isDarkMode ? 0.25 : 0.1)}`,
              }}
            >
              <IconBrandDiscord size={32} />
            </Box>
          </Box>
          
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' },
              mb: { xs: 2, sm: 3 },
              color: colors.text,
              background: `linear-gradient(135deg, ${colors.discordBlurple}, ${colors.secondaryColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('discord.title')}
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: colors.textSecondary,
              fontSize: { xs: '0.95rem', sm: '1.1rem' },
              mb: { xs: 3, sm: 5 },
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            {t('discord.subtitle')}
          </Typography>
        </Box>

        {/* Main content */}
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" direction={isRtl ? 'row-reverse' : 'row'}>
          {/* Left side - Terminal */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {/* Terminal-style code box showing Discord invite */}
              <Paper
                elevation={0}
                sx={{
                  overflow: 'hidden',
                  border: `1px solid ${colors.borderColor}`,
                  borderRadius: '6px',
                  bgcolor: alpha(colors.bgSecondary, 0.7),
                  mb: { xs: 3, md: 0 }
                }}
              >
                <Box
                  sx={{
                    py: 1,
                    px: 2,
                    bgcolor: alpha(colors.borderColor, 0.3),
                    borderBottom: `1px solid ${colors.borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: isRtl ? 'row-reverse' : 'row',
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      gap: 1, 
                      mr: isRtl ? 0 : 'auto',
                      ml: isRtl ? 'auto' : 0,
                    }}
                  >
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f57' }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#28c941' }} />
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.textSecondary,
                      fontFamily: 'monospace',
                    }}
                  >
                    terminal
                  </Typography>
                </Box>

                <Box 
                  sx={{ 
                    px: 3, 
                    py: 2,
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      mb: 1,
                      alignItems: 'center',
                    }}
                    dir="ltr" // Always LTR for terminal commands
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.success,
                        fontFamily: 'monospace',
                        mr: 1,
                      }}
                    >
                      $
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.text,
                        fontFamily: 'monospace',
                      }}
                    >
                      join discord-server
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: alpha(colors.bgPrimary, 0.4),
                      p: 1.5,
                      fontFamily: 'monospace',
                      color: colors.discordBlurple,
                      borderRadius: '4px',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        color: colors.text,
                        fontSize: '0.9rem',
                        mb: 1,
                      }}
                    >
                      {t('discord.connecting')}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        color: colors.discordBlurple,
                        fontSize: '0.9rem',
                      }}
                    >
                      {t('discord.serverFound')}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Right side - Discord invite card */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Paper
                elevation={0}
                sx={{
                  overflow: 'hidden',
                  border: `1px solid ${alpha(colors.discordBlurple, 0.3)}`,
                  borderRadius: '12px',
                  bgcolor: alpha(colors.bgPrimary, 0.8),
                  boxShadow: `0 12px 24px ${alpha(colors.discordBlurple, 0.15)}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 18px 30px ${alpha(colors.discordBlurple, 0.25)}`,
                  },
                }}
              >
                {/* Discord server header */}
                <Box
                  sx={{
                    bgcolor: colors.discordBlurple,
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: '#fff',
                  }}
                >
                  <IconBrandDiscord size={80} style={{ marginBottom: '16px' }} />
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      textAlign: 'center',
                    }}
                  >
                    CyberBrains
                  </Typography>
                  <Chip
                    label={isRtl ? "خادم رسمي" : "Official Server"}
                    size="small"
                    sx={{
                      bgcolor: '#fff',
                      color: colors.discordBlurple,
                      fontWeight: 600,
                    }}
                  />
                </Box>

                {/* Discord server content */}
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      color: colors.text,
                    }}
                  >
                    {t('discord.joinServer')}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: colors.textSecondary,
                      mb: 4,
                    }}
                  >
                    {t('discord.membersOnline', { count: 324 })}
                  </Typography>

                  <Button
                    variant="contained"
                    href={discordInviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: colors.discordBlurple,
                      color: '#fff',
                      py: 1.5,
                      px: 4,
                      borderRadius: '28px',
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: alpha(colors.discordBlurple, 0.9),
                      }
                    }}
                  >
                    {t('discord.joinNow')}
                  </Button>

                  {/* Discord stats */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      mt: 4,
                      pt: 3,
                      borderTop: `1px solid ${colors.borderColor}`,
                    }}
                  >
                    {[
                      { count: '1.2K+', label: t('discord.members') },
                      { count: '10+', label: t('discord.channels') },
                      { count: '24/7', label: t('discord.support') },
                    ].map((stat, index) => (
                      <Box key={index} sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: colors.discordBlurple,
                          }}
                        >
                          {stat.count}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.textSecondary,
                            fontSize: '0.85rem',
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DiscordInvite;
