import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../../../layouts/blank/logo/Logo';
import { NavLinks } from './Navigations';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  width: '100%',
  color: theme.palette.mode === 'dark' ? '#c9d1d9' : '#24292f',
  textDecoration: 'none',
  borderRadius: '6px',
  transition: 'all 0.2s ease-in-out',
  marginBottom: '2px',
  
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#58a6ff' : '#0969da',
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(56, 139, 253, 0.15)'
      : 'rgba(9, 105, 218, 0.08)',
    '& button': {
      color: theme.palette.mode === 'dark' ? '#58a6ff' : '#0969da',
      fontWeight: 600,
    }
  },

  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? '#21262d'
      : '#f6f8fa',
    '& button': {
      color: theme.palette.mode === 'dark'
        ? '#c9d1d9'
        : '#24292f',
    }
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 400,
  color: theme.palette.mode === 'dark' ? '#c9d1d9' : '#24292f',
  '&:hover': {
    backgroundColor: 'transparent',
  }
}));

const MobileSidebar = ({ onClose }) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const theme = useTheme();

  return (
    <>
      <Box 
        px={3} 
        pt={2} 
        pb={1.5}
        borderBottom={1}
        borderColor={theme.palette.mode === 'dark' ? '#30363d' : '#d0d7de'}
        bgcolor={theme.palette.mode === 'dark' ? '#161b22' : '#ffffff'}
      >
        <Logo />
      </Box>
      
      <Box 
        p={2.5} 
        sx={{ 
          direction: isRTL ? 'rtl' : 'ltr',
          bgcolor: theme.palette.mode === 'dark' ? '#0d1117' : '#ffffff'
        }}
      >
        <Stack direction="column" spacing={1}>
          {NavLinks.map((navlink, i) => (
            <StyledNavLink
              key={i}
              to={navlink.to}
              className={location.pathname === navlink.to ? 'active' : ''}
            >
              <StyledButton
                fullWidth
                color="inherit"
                sx={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                {t(`${navlink.title}`)}
              </StyledButton>
            </StyledNavLink>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default MobileSidebar;
