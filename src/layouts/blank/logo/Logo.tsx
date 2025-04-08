import { FC } from 'react';
import { useSelector } from 'src/store/Store';
import { Link } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoDarkRTL } from 'src/assets/images/logos/dark-rtl-logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoLight } from 'src/assets/images/logos/light-logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoLightRTL } from 'src/assets/images/logos/light-logo-rtl.svg';

// Changed from ReactComponent import to regular image import
import LogoRisingMedia from 'src/assets/images/logos/logo.png';
import LogoRisingMediaLTR from 'src/assets/images/logos/logo ltr.png';
import LogoRisingMediaLight from 'src/assets/images/logos/logo-Light.png';
import LogoRisingMediaLTRLight from 'src/assets/images/logos/logo ltr-Light.png';

import { styled } from '@mui/material';
import { AppState } from 'src/store/Store';
import useMediaQuery from '@mui/material/useMediaQuery';

const Logo: FC = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const savedLanguage = localStorage.getItem('language') || 'en';
  const dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
  const isDarkMode = customizer.activeMode === 'dark';
  
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: isMobile 
      ? (customizer.isCollapse ? '60px' : '200px')
      : (customizer.isCollapse ? '80px' : '280px'),
    overflow: 'hidden',
    display: 'block',
  }));

  const logoStyle = {
    width: isMobile 
      ? (customizer.isCollapse ? '50px' : '180px')
      : (customizer.isCollapse ? '60px' : '260px'),
    height: 'auto'
  };

  // Select the appropriate logo based on both direction and theme mode
  const getLogoSrc = () => {
    if (dir === 'rtl') {
      return isDarkMode ? LogoRisingMediaLight : LogoRisingMedia;
    } else {
      return isDarkMode ? LogoRisingMediaLTRLight : LogoRisingMediaLTR;
    }
  };

  return (
    <LinkStyled
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img 
        src={getLogoSrc()} 
        alt="Cyber Brains Logo" 
        style={logoStyle} 
      />
    </LinkStyled>
  );
};

export default Logo;
