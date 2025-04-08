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
import LeaderDetailSection from 'src/components/frontend-pages/shared/leaders/LeaderDetailSection';

// Import local images
import leaderImage1 from 'src/assets/images/gallery/image_alumni2.jpg';
import leaderImage2 from 'src/assets/images/gallery/image_alumni3.jpg';
import leaderImage3 from 'src/assets/images/gallery/leader_image3.jpg';
import leaderImage4 from 'src/assets/images/gallery/leader_image4.png';
import leaderImage5 from 'src/assets/images/gallery/leader_image5.png';
import leaderImage6 from 'src/assets/images/gallery/leader_image1.jpg';
import leaderImage7 from 'src/assets/images/gallery/leader_image2.jpg';
import leaderImage8 from 'src/assets/images/gallery/leader_image6.jpg';
import alumniImage1 from 'src/assets/images/gallery/image_alumni1.jpg';
import alumniImage2 from 'src/assets/images/gallery/image_alumni2.jpg';
import alumniImage3 from 'src/assets/images/gallery/image_alumni3.jpg';
import alumniImage4 from 'src/assets/images/gallery/image_alumni4.jpg';
import projectImage1 from 'src/assets/images/gallery/image 2.png';
import projectImage2 from 'src/assets/images/gallery/image 2.png';
import defaultImage from 'src/assets/images/gallery/image 2.png';

const LeaderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isMounted = useRef(true);
  
  // Arrays for leader images
  const teamLeaderImages = [leaderImage1, leaderImage2, leaderImage3, leaderImage4, leaderImage5, leaderImage6, leaderImage7,leaderImage8];
  const alumniLeaderImages = [alumniImage1, alumniImage2, alumniImage3, alumniImage4];
  const projectImages = [projectImage1, projectImage2];
  
  // State management
  const [leader, setLeader] = useState<any>(null);
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
      loadLeaderData();
    }
  }, [id, i18n.language]);
  
  // Function to load leader data
  const loadLeaderData = () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get data from translations
      const currentLeaders = t('leadershipCarousel.leaders', { returnObjects: true }) || [];
      const alumniLeaders = t('alumniLeaders.leaders', { returnObjects: true }) || [];
      
      // Combine all leader data
      const allLeaders = [...currentLeaders, ...alumniLeaders];
      const parsedId = parseInt(id as string, 10);
      
      // Find the specific leader
      const foundLeader = allLeaders.find((l: any) => l.id === parsedId);
      
      if (foundLeader) {
        const isAlumni = parsedId > 100; // Alumni leader IDs start from 101
        
        // Improved image selection logic:
        // For regular leaders, IDs are 1-based but arrays are 0-based, so subtract 1
        // For alumni, subtract 101 to get a 0-based index for their array
        let imageIndex;
        
        if (isAlumni) {
          // Alumni: Convert IDs like 101, 102, 103, 104 to indices 0, 1, 2, 3
          imageIndex = (parsedId - 101) % alumniLeaderImages.length;
        } else {
          // Current leaders: Convert IDs like 1, 2, 3, 4, 5, 6, 7 to indices 0, 1, 2, 3, 4, 5, 6
          imageIndex = (parsedId - 1) % teamLeaderImages.length;
        }
        
        // Extra safety check to ensure index is within bounds
        if (imageIndex < 0) imageIndex = 0;
        
        // Set image based on leader type
        const leaderImage = isAlumni 
          ? (imageIndex < alumniLeaderImages.length ? alumniLeaderImages[imageIndex] : defaultImage)
          : (imageIndex < teamLeaderImages.length ? teamLeaderImages[imageIndex] : defaultImage);
        
        // Enhance leader data with additional information
        const enhancedLeader = {
          ...foundLeader,
          image: leaderImage,
          // Remove projects array and only keep about
          about: t('leaderDetail.extendedBio', { returnObjects: true })[parsedId % 4],
        };
        
        if (isMounted.current) {
          setLeader(enhancedLeader);
        }
      } else {
        setError(t('leaderDetail.notFound.message'));
      }
    } catch (err) {
      setError(t('error.generic'));
      console.error('Error loading leader data:', err);
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

  // If error or leader not found, show error message
  if (error || !leader) {
    return (
      <PageContainer title={t('leaderDetail.notFound.title')} description={t('leaderDetail.notFound.description')}>
        <HpHeader />
        <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h3" gutterBottom>
            {t('leaderDetail.notFound.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {error || t('leaderDetail.notFound.message')}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              onClick={() => navigate('/team')}
              startIcon={<IconArrowLeft />}
              size="large"
            >
              {t('leaderDetail.backToTeam')}
            </Button>
          </Box>
        </Container>
        <Footer />
        <ScrollToTop />
      </PageContainer>
    );
  }

  return (
    <PageContainer title={`${leader.name} - ${t('leaderDetail.title')}`} description={leader.bio}>
      <HpHeader />
      <PageBanner 
        title={leader.name}
        subtitle={leader.role}
        path={[t('team.path.team'), t('leadership.title'), leader.name]}
      />

      {/* Utilisation du composant séparé pour les détails du leader */}
      <LeaderDetailSection leader={leader} />

      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default LeaderDetail;
