import PageContainer from 'src/components/container/PageContainer';
import HeaderAlert from '../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import C2a from '../../components/frontend-pages/shared/c2a';
import Footer from '../../components/frontend-pages/shared/footer';
import Banner from '../../components/frontend-pages/portfolio/Banner';
import ScrollToTop from '../../components/frontend-pages/shared/scroll-to-top';
import GalleryCard from 'src/components/userprofile/gallery/GalleryCard';
import { Box, Container } from '@mui/material';
import Character3D from 'src/components/frontend-pages/homepage/3d-character/Character3D';

const PricingPage = () => {
  return (
    <PageContainer title="Portfolio" description="this is Portfolio">
      <HpHeader />
              <Character3D />
      
      <Banner />
      <Box my={3}>
        <Container maxWidth="lg">
          <GalleryCard />
        </Container>
      </Box>
      <C2a />
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default PricingPage;
