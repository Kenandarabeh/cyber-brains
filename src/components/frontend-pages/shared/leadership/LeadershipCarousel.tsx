import React from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css';
import { useTranslation } from 'react-i18next';

// استيراد مكون البطاقة
import LeadershipCard from './LeadershipCard';
import RTLFix from './RTLFix'; // استيراد مكون إصلاح RTL

// Import local images for leaders - updated with correct paths
import leader1Image from 'src/assets/images/gallery/image_alumni2.jpg';
import leader2Image from 'src/assets/images/gallery/image_alumni3.jpg';
import leader3Image from 'src/assets/images/gallery/leader_image3.jpg';
import leader4Image from 'src/assets/images/gallery/leader_image4.png';
import leader5Image from 'src/assets/images/gallery/leader_image5.png';
import leader6Image from 'src/assets/images/gallery/leader_image1.jpg';
import leader7Image from 'src/assets/images/gallery/leader_image2.jpg';
import leader8Image from 'src/assets/images/gallery/leader_image6.jpg';

import defaultLeaderImage from 'src/assets/images/gallery/image 2.png';

interface LeaderType {
  id: number;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  image: string;
  social: {
    [key: string]: string;
  };
  achievements: string;
}

interface ArrowProps {
  direction: 'next' | 'prev';
  onClick?: () => void;
}

function SampleArrow({ direction, onClick }: ArrowProps) {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const Icon = direction === 'next' ? IconArrowRight : IconArrowLeft;

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [direction === 'next' ? 'right' : 'left']: '-20px',
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        cursor: 'pointer',
        bgcolor: theme.palette.background.paper,
        border: '2px solid',
        borderColor: theme.palette.primary.main,
        transition: 'all 0.3s ease',
        zIndex: 2,
        '&:hover': {
          bgcolor: theme.palette.primary.main,
          '& svg': {
            color: 'white'
          }
        }
      }}
    >
      <Icon size={20} color={theme.palette.primary.main} />
    </Box>
  );
}

const LeadershipCarousel = () => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const isDarkMode = customizer.activeMode === 'dark';

  // GitHub-styled colors - updated to match Footer
  const colors = {
    text: isDarkMode ? '#e6edf3' : '#24292f',
    textSecondary: isDarkMode ? '#8b949e' : '#57606a',
    bgPrimary: isDarkMode ? '#0d1117' : '#ffffff', // زرقاء داكنة قليلاً مثل الـ Footer
    bgSecondary: isDarkMode ? '#161b22' : '#f6f8fa',
    borderColor: isDarkMode ? '#30363d' : '#d0d7de',
    primaryBlue: isDarkMode ? '#58a6ff' : '#0969da',
    primaryGreen: isDarkMode ? '#2ea043' : '#2da44e',
  };

  // Error handler for image loading
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Leader image failed to load, using fallback image");
    e.currentTarget.src = defaultLeaderImage;
  };

  // الحصول على بيانات القادة من ملف الترجمة
  const translatedLeaders = t('leadershipCarousel.leaders', { returnObjects: true }) as LeaderType[];

  // Define leader images array with the correct images
  const leaderImagesArray = [
    leader1Image,
    leader2Image,
    leader3Image,
    leader4Image,
    leader5Image,
    leader6Image,
    leader7Image,leader8Image
  ];

  // Add proper error handling for images
  const leaders = translatedLeaders.map((leader, index) => {
    // Select the appropriate image or use default if not available
    const leaderImage = index < leaderImagesArray.length 
      ? leaderImagesArray[index] 
      : defaultLeaderImage;
    
    return {
      ...leader,
      image: leaderImage // Use the selected image
      // Remove social property completely
    };
  });

  // إضافة مرجع للسلايدر
  const sliderRef = React.useRef<Slider | null>(null);

  // إضافة معالجة لإعادة تهيئة السلايدر عند تغيير حجم النافذة
  React.useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        const slider = sliderRef.current as any;
        if (slider && slider.innerSlider && slider.innerSlider.onWindowResized) {
          slider.innerSlider.onWindowResized();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // إعادة تهيئة السلايدر بعد التحميل
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (sliderRef.current) {
        const slider = sliderRef.current as any;
        if (slider && slider.slickGoTo) {
          slider.slickGoTo(0);
        }
      }
      window.dispatchEvent(new Event('resize'));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3, // Changed from 1 to 3 to match slidesToShow for desktop
    rtl: false, // تعيين إلى false دائمًا، وسيتم التعامل مع RTL من خلال CSS
    nextArrow: <SampleArrow direction="next" />,
    prevArrow: <SampleArrow direction="prev" />,
    appendDots: (dots: React.ReactNode) => (
      <Box
        className="leadership-pagination"
        sx={{
          position: 'absolute',
          bottom: '-40px',
          width: '100%',
          padding: 0,
          margin: 0,
          textAlign: 'center',
          zIndex: 10
        }}
      >
        <ul
          style={{
            margin: '0',
            padding: '0',
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            listStyle: 'none'
          }}
        >
          {dots}
        </ul>
      </Box>
    ),
    customPaging: () => (
      <Box
        component="button"
        sx={{
          width: '10px',
          height: '10px',
          padding: 0,
          margin: 0,
          borderRadius: '50%',
          border: 'none',
          backgroundColor: isDarkMode
            ? 'rgba(255,255,255,0.2)'
            : 'rgba(0,0,0,0.2)',
          display: 'block',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.3s ease',
          '&.slick-active': {
            backgroundColor: colors.primaryBlue
          }
        }}
      />
    ),
    swipe: true,
    centerMode: false,
    variableWidth: false,
    draggable: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2, 
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1, // Keep 1 for mobile
          arrows: false,
          dots: true
        }
      }
    ],
    className: "leadership-carousel"
  };

  return (
    <Box
      data-mode={customizer.activeMode}
      data-direction={isRtl ? 'rtl' : 'ltr'}
      sx={{
        position: 'relative',
        px: { xs: 0, sm: 1, md: 3 },
        pb: { xs: 8, md: 8 },
        pt: { xs: 1, md: 2 },
        direction: isRtl ? 'rtl' : 'ltr',
        overflow: 'visible',
        '.slick-dots': {
          position: 'absolute !important',
          bottom: '-40px !important',
          display: 'flex !important',
          width: '100%',
          zIndex: 5,
          '.slick-active button': {
            backgroundColor: `${colors.primaryBlue} !important`,
            boxShadow: isDarkMode ? '0 0 5px rgba(88, 166, 255, 0.5)' : 'none',
          }
        }
      }}
    >
      <style>
        {`
        .leadership-carousel .slick-dots li.slick-active button {
          background-color: ${colors.primaryBlue} !important;
          ${isDarkMode ? 'box-shadow: 0 0 5px rgba(88, 166, 255, 0.5);' : ''}
        }
        `}
      </style>
      {/* إضافة مكون إصلاح RTL */}
      <RTLFix />
      
      <Slider ref={sliderRef} {...settings}>
        {leaders.map((leader, index) => (
          <div key={leader.id} style={{ height: 'auto', width: '100%' }}>
            <Box 
              sx={{ 
                height: '100%', 
                width: '100%', 
                p: { xs: 1, md: 2 },
                direction: isRtl ? 'rtl' : 'ltr', // تطبيق الاتجاه الصحيح على المستوى الداخلي
                textAlign: isRtl ? 'right' : 'left' // تطبيق محاذاة النص الصحيحة
              }}
            >
              <LeadershipCard {...leader} />
            </Box>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default LeadershipCarousel;