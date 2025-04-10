import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IconArrowLeft } from '@tabler/icons-react';

import PageContainer from 'src/components/container/PageContainer';
import HpHeader from 'src/components/frontend-pages/shared/header/HpHeader';
import Footer from 'src/components/frontend-pages/shared/footer';
import ScrollToTop from 'src/components/frontend-pages/shared/scroll-to-top';
import PageBanner from 'src/components/frontend-pages/shared/page-banner/PageBanner';
import SupervisorDetailSection from 'src/components/frontend-pages/shared/supervisors/SupervisorDetailSection';

// Import local images
import supervisor1Image from 'src/assets/images/gallery/image1.jpg';
import supervisor2Image from 'src/assets/images/gallery/image2.jpg';
import supervisor3Image from 'src/assets/images/gallery/image3.jpg';
import defaultImage from 'src/assets/images/gallery/image 2.png';
import Character3D from 'src/components/frontend-pages/homepage/3d-character/Character3D';

const SupervisorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isMounted = useRef(true);

  // Create array of supervisor images with fallbacks
  const supervisorImages = [
    supervisor1Image || defaultImage,
    supervisor2Image || defaultImage,
    supervisor3Image || defaultImage,
  ];
  
  // State management
  const [supervisor, setSupervisor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Handle language changes to prevent stale data
  useEffect(() => {
    if (id) {
      loadSupervisorData();
    }
  }, [id, i18n.language]);

  // Function to load supervisor data
  const loadSupervisorData = () => {
    try {
      setLoading(true);
      setError(null);
      
      // استرجاع بيانات المشرفين من الترجمة
      const supervisors = t('supervisors.supervisors', { returnObjects: true }) || [];
      const parsedId = parseInt(id as string, 10);
      
      // البحث عن المشرف باستخدام المعرف
      const foundSupervisor = supervisors.find((s: any) => s.id === parsedId);
      
      if (foundSupervisor) {
        // Use imported image instead of path string
        const imageIndex = (parsedId - 1) % supervisorImages.length;
        const supervisorIndex = parsedId - 1; // Index 0-based pour les tableaux
        
        const enhancedSupervisor = {
          ...foundSupervisor,
          image: supervisorImages[imageIndex] || defaultImage, // Use actual imported image
          extendedBio: t('supervisorDetail.extendedBio', { returnObjects: true })[supervisorIndex] || "",
        };
        
        if (isMounted.current) {
          setSupervisor(enhancedSupervisor);
        }
      } else {
        setError(t('supervisorDetail.notFound.message'));
      }
    } catch (err) {
      setError(t('error.generic'));
      console.error('Error loading supervisor data:', err);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  // If still loading, show loading indicator
  if (loading) {
    return (
      <PageContainer title={t('loading')} description={t('loading')}>
        <HpHeader />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '70vh', 
          flexDirection: 'column'
        }}>
          <CircularProgress size={40} thickness={4} />
          <Typography sx={{ mt: 2 }}>{t('loading')}</Typography>
        </Box>
        <Footer />
      </PageContainer>
    );
  }

  // في حالة عدم العثور على المشرف
  if (error || !supervisor) {
    return (
      <PageContainer title={t('supervisorDetail.notFound.title')} description={t('supervisorDetail.notFound.description')}>
        <HpHeader />
        <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h3" gutterBottom>
            {t('supervisorDetail.notFound.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {error || t('supervisorDetail.notFound.message')}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              onClick={() => navigate('/team')}
              startIcon={<IconArrowLeft />}
              size="large"
            >
              {t('supervisorDetail.backToTeam')}
            </Button>
          </Box>
        </Container>
        <Footer />
        <ScrollToTop />
      </PageContainer>
    );
  }

  return (
    <PageContainer title={`${supervisor.name} - ${t('supervisorDetail.title')}`} description={supervisor.bio}>
      <HpHeader />
      <PageBanner 
        title={supervisor.name}
        subtitle={supervisor.role}
        path={[t('team.path.team'), t('team.sections.supervisors'), supervisor.name]}
      />
        <Character3D />

      {/* Supervisor detail section */}
      <SupervisorDetailSection supervisor={supervisor} />

      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default SupervisorDetail;
