import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Logo from '../../../../layouts/blank/logo/Logo';
import Navigations from './Navigations';
import MobileSidebar from './MobileSidebar';
import { IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from 'src/store/customizer/CustomizerSlice';
import Box from '@mui/material/Box';
import Language from './Language';
import 'src/components/spinner/spinner.css'; // Import the spinner CSS
import 'src/assets/css/theme-loader.css'; // Import specific theme loader CSS

// Create a global loading element that exists outside React's lifecycle - follows exact pattern from Language.tsx
const createGlobalThemeLoader = (theme) => {
  // Remove any existing loading element
  const existingLoader = document.getElementById('global-theme-loader');
  if (existingLoader) {
    document.body.removeChild(existingLoader);
  }
  
  // Create new loading element
  const loaderElement = document.createElement('div');
  loaderElement.id = 'global-theme-loader';
  
  // Apply dark/light mode class
  if (theme.palette.mode === 'dark') {
    loaderElement.classList.add('spinner-dark-mode');
  }
  
  // Add the new GitHub-style spinner - identical to Language.tsx pattern
  const spinnerHTML = `
    <div class="fallback-spinner">
      <div class="loading-container">
        <div class="code-brackets left-bracket">&lt;</div>
        
        <div class="loading-spinner">
          <div class="effect-1 effects"></div>
          <div class="effect-2 effects"></div>
          <div class="effect-3 effects"></div>
          
          <div class="spinner-icon">
            <span class="code-symbol">{ }</span>
          </div>
        </div>
        
        <div class="code-brackets right-bracket">/&gt;</div>
        
        <div class="loading-text">
          <span class="comment-line">// Changing theme...</span>
        </div>
      </div>
      
      <div class="code-typing">
        <div class="typed-code theme-changer"></div>
      </div>
    </div>
  `;
  
  loaderElement.innerHTML = spinnerHTML;
  document.body.appendChild(loaderElement);
  
  return loaderElement;
};

const HpHeader = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const customizer = useSelector((state: any) => state.customizer);
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // تسريع تحميل مكون الهيدر باستخدام useLayoutEffect بدل useEffect
  // هذا يضمن أن الهيدر سيظهر قبل أي تحديثات أخرى في الصفحة
  useLayoutEffect(() => {
    // قراءة السمة من localStorage فوراً عند بدء التحميل
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && savedTheme !== customizer.activeMode) {
        dispatch(setDarkMode(savedTheme));
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }

    // تعيين حالة mounted إلى true لإظهار الهيدر الكامل
    setMounted(true);
  }, []);

  // تحميل مستمع التمرير بعد عرض المكون
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    // تنفيذ handleScroll مرة واحدة لتحديد الحالة الأولية
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check that i18n is initialized before using it
  const isRtl = i18n.language === 'ar';
  const isDarkMode = theme.palette.mode === 'dark';

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      minHeight: '62px',
    },
    backgroundColor: alpha(
      theme.palette.mode === 'dark' ? '#0d1117' : '#ffffff',
      scrolled ? 0.9 : 0.85
    ),
    backdropFilter: `blur(${scrolled ? '10px' : '8px'})`,
    WebkitBackdropFilter: `blur(${scrolled ? '10px' : '8px'})`,
    color: theme.palette.mode === 'dark' ? '#f0f6fc' : '#24292f',
    borderBottom: `1px solid ${
      alpha(
        theme.palette.mode === 'dark' ? '#30363d' : '#d0d7de',
        scrolled ? 0.5 : 0.3
      )
    }`,
    boxShadow: scrolled 
      ? `0 4px 20px ${alpha('#000', theme.palette.mode === 'dark' ? 0.2 : 0.1)}` 
      : 'none',
    transition: 'all 0.3s ease',
    position: 'fixed',
    zIndex: theme.zIndex.appBar + 10,
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    color: theme.palette.mode === 'dark' ? '#f0f6fc' : '#24292f',
    justifyContent: 'space-between',
    minHeight: '62px !important',
  }));

  // Responsive sidebar
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // Dark Mode toggle with error handling - optimize for immediate feedback
  const toggleDarkMode = useCallback(() => {
    try {
      // Calculate new theme value (opposite of current)
      const newTheme = customizer.activeMode === 'dark' ? 'light' : 'dark';
      
      // First immediately create and show spinner - do this before any state changes
      const loaderElement = createGlobalThemeLoader(theme);
      
      // Force a reflow to ensure the spinner appears immediately
      void loaderElement.offsetWidth;
      
      // Just save to localStorage - don't update Redux state
      localStorage.setItem('theme', newTheme);
      
      // Reload immediately with minimal delay
      setTimeout(() => {
        window.location.reload();
      }, 500); // Reduced to 500ms for faster response
      
    } catch (error) {
      console.error('Error changing theme:', error);
      const existingLoader = document.getElementById('global-theme-loader');
      if (existingLoader) {
        document.body.removeChild(existingLoader);
      }
    }
  }, [customizer.activeMode, theme]);

  // Handle drawer close on language change
  useEffect(() => {
    setOpen(false);
  }, [i18n.language]);

  // تعديل الشرط لعرض الهيدر حتى قبل اكتمال التحميل
  // بدلا من return placeholder فارغ، سنعرض الهيدر الأساسي
  if (!mounted) {
    return (
      <>
        <Box sx={{ height: '62px', width: '100%' }} />
        <AppBar position="fixed" elevation={0} 
          sx={{ 
            backgroundColor: theme.palette.mode === 'dark' 
              ? alpha('#0d1117', 0.9) 
              : alpha('#ffffff', 0.9),
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderBottom: `1px solid ${
              alpha(
                theme.palette.mode === 'dark' ? '#30363d' : '#d0d7de',
                0.5
              )
            }`,
            zIndex: theme.zIndex.appBar + 10,
            height: '62px',
            display: 'flex',
            justifyContent: 'center'
          }} 
        >
          <Container
            sx={{
              maxWidth: '1400px !important',
            }}
          >
            <Toolbar sx={{
              width: '100%',
              paddingLeft: '0 !important',
              paddingRight: '0 !important',
              justifyContent: 'space-between',
              minHeight: '62px !important',
            }}>
              <Logo />
              {/* عدم عرض العناصر المتبقية حتى يتم تحميل المكون بالكامل */}
            </Toolbar>
          </Container>
        </AppBar>
      </>
    );
  }

  // تحديد خلفية الدرج لتتماشى مع تأثير glassmorphism
  const drawerBgColor = isDarkMode 
    ? alpha('#0d1117', 0.95) 
    : alpha('#ffffff', 0.95);

  return (
    <>
      {/* عنصر مساحة لمنع ظهور محتوى الصفحة خلف الـ header المثبت */}
      <Box sx={{ height: '62px', width: '100%' }} />
      
      <AppBarStyled position="fixed" elevation={0}>
        <Container
          sx={{
            maxWidth: '1400px !important',
          }}
        >
          <ToolbarStyled>
            <Logo />
              {lgDown ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton 
                  onClick={toggleDarkMode}    
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#e6edf3' : '#24292f',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark'
                        ? alpha('#30363d', 0.7)
                        : alpha('#f6f8fa', 0.7)
                    }
                  }}
                  aria-label={t('header.darkMode')}
                >
                  {customizer.activeMode === 'dark' ? (
                    <IconSun size="20" />
                  ) : (
                    <IconMoon size="20" />
                  )}
                </IconButton>
                {mounted ? <Language /> : null}
                <IconButton 
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#e6edf3' : '#24292f',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark'
                        ? alpha('#30363d', 0.7)
                        : alpha('#f6f8fa', 0.7)
                    }
                  }}
                  aria-label={t('header.menuOpen')}
                  onClick={handleDrawerOpen}
                >
                  <IconMenu2 size="20" />
                </IconButton>
              </Stack>
            ) : null}
            {lgUp ? (
              <>
                <Stack spacing={1} direction="row" alignItems="center">
                  <Navigations />
                </Stack>
                <Stack direction="row" spacing={1}>
                  {mounted ? <Language /> : null}
                  <IconButton 
                    onClick={toggleDarkMode} 
                    aria-label={t('header.darkMode')}
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#e6edf3' : '#24292f',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark'
                          ? alpha('#30363d', 0.7)
                          : alpha('#f6f8fa', 0.7)
                      }
                    }}
                  >
                    {customizer.activeMode === 'dark' ? (
                      <IconSun size="20" />
                    ) : (
                      <IconMoon size="20" />
                    )}
                  </IconButton>
                </Stack>
              </>
            ) : null}
          </ToolbarStyled>
        </Container>
      </AppBarStyled>
      <Drawer
        anchor={isRtl ? 'right' : 'left'}
        open={open}
        variant="temporary"
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 270,
            border: '0 !important',
            boxShadow: (theme) => theme.shadows[8],
            backgroundColor: drawerBgColor,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          },
        }}
      >
        <MobileSidebar onClose={() => setOpen(false)} />
      </Drawer>
    </>
  );
};

// تصدير المكون باستخدام React.memo لتحسين الأداء
export default React.memo(HpHeader);
