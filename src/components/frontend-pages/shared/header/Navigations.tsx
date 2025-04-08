import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NavLinks = [
  {
    title: 'navigation.home',
    to: '/home',
  },
  {
    title: 'navigation.about',
    to: '/about',
  },

  {
    title: 'navigation.team',
    to: '/team',
  },
  {
    title: 'navigation.join',
    to: '/join',
  },
  {
    title: 'navigation.contact',
    to: '/contact',
  },
];

const Navigations = () => {
  const { t } = useTranslation();
  
  const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '15px',
    a: {
      color: theme.palette.text.primary,
    },
    fontWeight: 500,
    '&.active': {
      backgroundColor: theme.palette.background.paper,
      a: {
        color: theme.palette.primary.main,
      },
    },
  }));

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {NavLinks.map((navlink, i) => (
        <StyledButton
          color="inherit"
          className={pathname === navlink.to ? 'active' : 'not-active'}
          variant="text"
          key={i}
        >
          <NavLink to={navlink.to}>
            {t(navlink.title)}{' '}
            {navlink.new ? (
              <Chip
                label={t('new')}
                size="small"
                sx={{
                  ml: '6px',
                  borderRadius: '8px',
                  color: 'primary.main',
                  backgroundColor: 'rgba(93, 135, 255, 0.15)',
                }}
              />
            ) : null}
          </NavLink>
        </StyledButton>
      ))}
    </>
  );
};

export default Navigations;
