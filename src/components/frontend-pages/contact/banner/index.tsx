import { Box, Container, Grid, Typography, useTheme, Paper, alpha, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  IconMapPin, 
  IconCode, 
  IconBrandGithub,
  IconServer,
  IconWorldWww,
  IconTerminal
} from '@tabler/icons-react';

const Banner = () => {
    const theme = useTheme();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';
    const customizer = useSelector((state: any) => state.customizer);
    const isDarkMode = customizer.activeMode === 'dark';

    // GitHub-styled colors similar to features.tsx
    const colors = {
        bgPrimary: isDarkMode ? '#0d1117' : '#ffffff',
        bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
        borderColor: isDarkMode ? '#30363d' : '#d0d7de',
        text: isDarkMode ? '#e6edf3' : '#24292f',
        textSecondary: isDarkMode ? '#8b949e' : '#57606a',
        primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
        secondaryColor: isDarkMode ? '#f778ba' : '#f600b9',
        keywordColor: isDarkMode ? '#ff7b72' : '#cf222e',
        functionColor: isDarkMode ? '#d2a8ff' : '#8250df',
        commentColor: isDarkMode ? '#8b949e' : '#6e7781',
        stringColor: isDarkMode ? '#a5d6ff' : '#0a3069',
        merged: isDarkMode ? '#a371f7' : '#8250df',
        gridLines: isDarkMode ? 'rgba(48, 54, 61, 0.3)' : 'rgba(208, 215, 222, 0.3)',
    };

    // Animation variants from features.tsx
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
                overflow: 'hidden',
                bgcolor: colors.bgPrimary,
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

            {/* Hexagon/Binary pattern overlay - similar to features.tsx */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${isDarkMode ? '30363d' : 'd0d7de'}' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    opacity: 0.5,
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

            {/* Top section with title and description */}
            <Box
                sx={{
                    bgcolor: 'transparent',
                    position: 'relative',
                    zIndex: 1,
                    pt: { xs: 8, lg: 12 },
                    pb: { xs: 6, lg: 8 },
                }}
            >
                <Container maxWidth="lg">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        viewport={{ once: true }}
                    >
                        {/* GitHub-like header with repo path - similar to features.tsx */}
                        <motion.div variants={itemVariants}>
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    flexDirection: { xs: 'column', md: 'row' },
                                    justifyContent: 'space-between',
                                    alignItems: { xs: 'flex-start', md: 'center' },
                                    mb: 3,
                                    pb: 2,
                                    borderBottom: `1px solid ${colors.borderColor}`,
                                    textAlign: isRTL ? 'right' : 'left',
                                }}
                            >
                                {/* Left section with GitHub icon and repo path */}
                                <Box 
                                    sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        mb: { xs: 2, md: 0 },
                                        flexDirection: isRTL ? 'row-reverse' : 'row',
                                    }}
                                >
                                    <IconBrandGithub 
                                        size={24} 
                                        style={{ 
                                            color: colors.textSecondary,
                                            marginRight: isRTL ? 0 : '12px',
                                            marginLeft: isRTL ? '12px' : 0,
                                        }} 
                                    />
                                    
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            fontWeight: 600,
                                            color: colors.text,
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: isRTL ? 'row-reverse' : 'row',
                                        }}
                                    >
                                        <Box component="span">cyber-brains /</Box>
                                        <Box 
                                            component="span" 
                                            sx={{ 
                                                color: colors.primaryBlue,
                                                mx: 0.5,
                                            }}
                                        >
                                            contact
                                        </Box>
                                    </Typography>
                                </Box>

                                {/* Right section with terminal chip */}
                                <Box>
                                    <Chip
                                        icon={<IconTerminal size={16} />}
                                        label={isRTL ? "إتصل بنا" : "Contact Us"}
                                        size="small"
                                        sx={{
                                            bgcolor: alpha(colors.primaryBlue, 0.15),
                                            color: colors.primaryBlue,
                                            border: `1px solid ${alpha(colors.primaryBlue, 0.3)}`,
                                            fontFamily: 'monospace',
                                            '& .MuiChip-icon': {
                                                color: colors.primaryBlue,
                                                mr: isRTL ? 0 : 0.5,
                                                ml: isRTL ? 0.5 : 0,
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                        </motion.div>

                        {/* Main content */}
                        <Grid container spacing={3} justifyContent="center">
                            <Grid item xs={12} md={8} lg={7}>
                                <motion.div variants={itemVariants}>
                                    <Box sx={{ 
                                        textAlign: 'center', 
                                        mb: 5,
                                        direction: isRTL ? 'rtl' : 'ltr'
                                    }}>
                                        <Box 
                                            sx={{ 
                                                display: 'inline-flex', 
                                                alignItems: 'center',
                                                mb: 2,
                                                bgcolor: alpha(colors.primaryBlue, isDarkMode ? 0.15 : 0.08),
                                                color: colors.primaryBlue,
                                                py: 0.5,
                                                px: 2,
                                                borderRadius: '2rem',
                                                border: `1px solid ${alpha(colors.primaryBlue, isDarkMode ? 0.3 : 0.15)}`,
                                            }}
                                        >
                                            <IconMapPin size={18} style={{ marginRight: '8px' }} />
                                            <Typography
                                                variant="body2"
                                                sx={{ 
                                                    fontWeight: 600,
                                                    fontSize: '0.9rem',
                                                }}
                                            >
                                                {t('contactBanner.subtitle')}
                                            </Typography>
                                        </Box>
                                        
                                        <Typography
                                            variant="h1"
                                            fontWeight={800}
                                            sx={{
                                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                                lineHeight: 1.2,
                                                mb: 2,
                                                color: colors.text,
                                            }}
                                        >
                                            {t('contactBanner.title')}
                                        </Typography>

                                        {/* Code-styled subtitle */}
                                        <Box 
                                            sx={{ 
                                                display: 'flex',
                                                justifyContent: 'center',
                                                mb: 3,
                                            }}
                                        >
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    px: 2,
                                                    py: 1,
                                                    display: 'inline-flex',
                                                    bgcolor: alpha(colors.bgSecondary, 0.7),
                                                    border: `1px solid ${colors.borderColor}`,
                                                    borderRadius: '4px',
                                                    fontFamily: 'monospace',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Box component="span" sx={{ color: colors.keywordColor, mr: 1 }}>
                                                    function
                                                </Box>
                                                <Box component="span" sx={{ color: colors.functionColor }}>
                                                    contactUs
                                                </Box>
                                                <Box component="span" sx={{ color: colors.text }}>() {'{}'}</Box>
                                            </Paper>
                                        </Box>
                                        
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: colors.textSecondary,
                                                maxWidth: '700px',
                                                mx: 'auto',
                                            }}
                                        >
                                            {t('contactBanner.description')}
                                        </Typography>
                                    </Box>
                                </motion.div>
                            </Grid>
                        </Grid>

                        {/* Tech icons row */}
                        <motion.div variants={itemVariants}>
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center',
                                    gap: 5,
                                    mb: 4,
                                    flexWrap: 'wrap'
                                }}
                            >
                                <IconCode size={24} style={{ color: colors.textSecondary, opacity: 0.7 }} />
                                <IconServer size={24} style={{ color: colors.textSecondary, opacity: 0.7 }} />
                                <IconBrandGithub size={24} style={{ color: colors.textSecondary, opacity: 0.7 }} />
                                <IconWorldWww size={24} style={{ color: colors.textSecondary, opacity: 0.7 }} />
                            </Box>
                        </motion.div>
                    </motion.div>
                </Container>
            </Box>

            {/* Map section with GitHub-style container */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    mb: { xs: 5, lg: 8 },
                }}
            >
                <Container maxWidth="lg">
                    <motion.div 
                        variants={itemVariants}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                p: 1,
                                borderRadius: '8px',
                                border: `1px solid ${colors.borderColor}`,
                                overflow: 'hidden',
                                bgcolor: colors.bgPrimary,
                                position: 'relative',
                            }}
                        >
                            {/* Map header - GitHub style */}
                            <Box
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                    borderBottom: `1px solid ${colors.borderColor}`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    bgcolor: alpha(colors.bgSecondary, 0.5),
                                }}
                            >
                                <Box sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    flexDirection: isRTL ? 'row-reverse' : 'row',
                                }}>
                                    <IconMapPin 
                                        size={18} 
                                        style={{ 
                                            color: colors.primaryBlue,
                                        }} 
                                    />
                                    <Typography 
                                        variant="subtitle2" 
                                        sx={{ 
                                            color: colors.text,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {isRTL ? 'المركز الجامعي صالحي أحمد - النعامة' : 'University Center Salhi Ahmed - Naama'}
                                    </Typography>
                                </Box>
                                
                                <Box>
                                    <Typography 
                                        variant="caption"
                                        sx={{
                                            color: colors.textSecondary,
                                            fontFamily: 'monospace',
                                        }}
                                    >
                                        33°16'35.6"N 0°19'04.3"W
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Map iframe with better styling */}
                            <Box sx={{ height: '450px' }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d843.2653830455575!2d-0.31786526077810493!3d33.27655128797548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDE2JzM1LjYiTiAwwrAxOScwNC4zIlc!5e0!3m2!1sen!2sdz!4v1709913408893!5m2!1sen!2sdz"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, display: 'block' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={isRTL ? 'موقع المركز الجامعي صالحي أحمد - النعامة' : 'Centre Universitaire Salhi Ahmed de Naama Location'}
                                />
                            </Box>
                        </Paper>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
};

export default Banner;
