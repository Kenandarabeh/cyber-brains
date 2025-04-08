// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Menu, MenuItem, Typography, Stack, Box, Tooltip, Fade, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector, useDispatch } from 'src/store/Store';
import { setLanguage } from 'src/store/customizer/CustomizerSlice';
import FlagEn from 'src/assets/images/flag/icon-flag-en.svg';
import FlagFr from 'src/assets/images/flag/icon-flag-fr.svg';
import FlagSa from 'src/assets/images/flag/icon-flag-sa.svg';
import { useTranslation } from 'react-i18next';
import { AppState } from 'src/store/Store';
import 'src/components/spinner/spinner.css'; // Import the spinner CSS
import 'src/assets/css/language-loader.css'; // Import specific language loader CSS

const Languages = [
  {
    flagname: 'English (UK)',
    icon: FlagEn,
    value: 'en',
  },
  {
    flagname: 'français (French)',
    icon: FlagFr,
    value: 'fr',
  },
  {
    flagname: 'عربي (Arabic)',
    icon: FlagSa,
    value: 'ar',
  },
];

// Create a global loading element that exists outside React's lifecycle
const createGlobalLoadingElement = (theme) => {
  // Remove any existing loading element
  const existingLoader = document.getElementById('global-language-loader');
  if (existingLoader) {
    document.body.removeChild(existingLoader);
  }
  
  // Create new loading element
  const loaderElement = document.createElement('div');
  loaderElement.id = 'global-language-loader';
  
  // Apply dark/light mode class
  if (theme.palette.mode === 'dark') {
    loaderElement.classList.add('spinner-dark-mode');
  }
  
  // Add the new GitHub-style spinner
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
          <span class="comment-line">// Changing language...</span>
        </div>
      </div>
      
      <div class="code-typing">
        <div class="typed-code language-changer"></div>
      </div>
    </div>
  `;
  
  loaderElement.innerHTML = spinnerHTML;
  document.body.appendChild(loaderElement);
  
  return loaderElement;
};

const Language = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const customizer = useSelector((state: AppState) => state.customizer);
  const currentLang =
    Languages.find((_lang) => _lang.value === customizer.isLanguage) || Languages[1];
  const { i18n } = useTranslation();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageChange = useCallback((value: string) => {
    try {
      const dir = value === 'ar' ? 'rtl' : 'ltr';
      
      // Create and show global loading element outside React
      const loaderElement = createGlobalLoadingElement(theme);
      
      // Set up the changes
      dispatch(setLanguage(value));
      document.documentElement.dir = dir;
      document.documentElement.lang = value;
      localStorage.setItem('language', value);
      i18n.changeLanguage(value);
      handleClose();
      
      // Make sure the loader is visible by forcing a reflow
      void loaderElement.offsetWidth;
      
      // Ensure the loader has time to display
      setTimeout(() => {
        window.location.reload();
      }, 1500); // Extended delay to 1.5s to ensure visibility
      
    } catch (error) {
      console.error('Error changing language:', error);
      const existingLoader = document.getElementById('global-language-loader');
      if (existingLoader) {
        document.body.removeChild(existingLoader);
      }
    }
  }, [dispatch, i18n, theme]);

  useEffect(() => {
    const syncLanguage = () => {
      try {
        const savedLanguage = localStorage.getItem('language') || 'en';
        const dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
        
        document.documentElement.dir = dir;
        document.documentElement.lang = savedLanguage;
        
        if (savedLanguage !== customizer.isLanguage) {
          dispatch(setLanguage(savedLanguage));
        }
        
        if (savedLanguage !== i18n.language) {
          i18n.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Error syncing language:', error);
      }
    };

    syncLanguage();
  }, [dispatch, i18n, customizer.isLanguage]);

  useEffect(() => {
    console.log("Current language:", i18n.language);
    console.log("Available languages:", i18n.languages);
    console.log("Translation test:", i18n.t('home'));
  }, [i18n.language]);

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          borderRadius: '6px',
          py: 0.6,
          px: 1.5,
          transition: 'color 0.2s ease',
          color: theme.palette.mode === 'dark' ? '#c9d1d9' : '#24292f',
          '&:hover': {
            color: theme.palette.mode === 'dark' ? '#f0f6fc' : '#000000',
          },
        }}
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar 
          src={currentLang.icon} 
          alt={currentLang.value}
          variant="rounded"
          sx={{ 
            width: 16, 
            height: 16,
            mr: 0.8,
            border: 'none',
            filter: 'none',
            bgcolor: 'transparent',
            '& img': {
              objectFit: 'contain',
              width: '100%',
              height: '100%',
            }
          }} 
        />
        <Typography 
          component="span"
          sx={{ 
            fontSize: '14px',
            fontWeight: 500,
            display: { xs: 'none', sm: 'block' },
            color: 'inherit',
          }}
        >
          {currentLang.value}
        </Typography>
        <KeyboardArrowDownIcon 
          fontSize="small" 
          sx={{ 
            ml: 0.3, 
            fontSize: '16px',
            color: 'inherit',
            opacity: 0.75,
            display: { xs: 'none', sm: 'block' },
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }} 
        />
      </Box>
      
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-selector',
          dense: true,
        }}
        TransitionComponent={Fade}
        transitionDuration={120}
        elevation={4}
        sx={{
          '& .MuiMenu-paper': {
            width: '180px',
            borderRadius: '6px',
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 8px 24px rgba(0,0,0,0.4)' 
              : '0 8px 24px rgba(149,157,165,0.2)',
            mt: 1,
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' 
              ? '#30363d' 
              : '#d0d7de',
            backgroundColor: theme.palette.mode === 'dark'
              ? '#161b22'
              : '#ffffff',
            padding: '4px 0',
            overflow: 'visible',
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: -8,
              left: 20,
              width: 16,
              height: 16,
              bgcolor: theme.palette.mode === 'dark' ? '#161b22' : '#ffffff',
              transform: 'rotate(45deg)',
              borderTop: `1px solid ${theme.palette.mode === 'dark' ? '#30363d' : '#d0d7de'}`,
              borderLeft: `1px solid ${theme.palette.mode === 'dark' ? '#30363d' : '#d0d7de'}`,
              zIndex: 0,
            }
          },
          '& .MuiList-root': {
            padding: '4px 0',
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            sx: {
              overflow: 'visible'
            }
          }
        }}
      >
        {Languages.map((option, index) => {
          const isSelected = option.value === currentLang.value;
          return (
            <MenuItem
              key={index}
              onClick={() => handleLanguageChange(option.value)}
              sx={{
                py: 0.6,
                px: 2,
                position: 'relative',
                fontSize: '14px',
                fontWeight: isSelected ? 600 : 400,
                color: isSelected 
                  ? theme.palette.mode === 'dark' ? '#58a6ff' : '#0969da'
                  : theme.palette.mode === 'dark' ? '#c9d1d9' : '#24292f',
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(177, 186, 196, 0.12)' : 'rgba(208, 215, 222, 0.32)',
                },
                '& .MuiTouchRipple-root': {
                  display: 'none',
                }
              }}
              disableRipple
              selected={isSelected}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" width="100%" sx={{ position: 'relative' }}>
                <Avatar 
                  src={option.icon} 
                  alt={option.value}
                  variant="rounded"
                  sx={{ 
                    width: 16,
                    height: 16,
                    bgcolor: 'transparent',
                    filter: 'none',
                    '& img': {
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                    }
                  }} 
                />
                <Typography 
                  component="span"
                  noWrap
                  sx={{ 
                    flex: 1,
                    fontSize: '14px',
                    fontWeight: 'inherit',
                    color: 'inherit',
                  }}
                >
                  {option.flagname}
                </Typography>
                {isSelected && (
                  <CheckIcon 
                    sx={{
                      fontSize: '16px',
                      color: 'inherit'
                    }} 
                  />
                )}
              </Stack>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default Language;
