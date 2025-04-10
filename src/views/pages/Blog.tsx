import PageContainer from 'src/components/container/PageContainer';
import HeaderAlert from '../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import C2a from '../../components/frontend-pages/shared/c2a';
import Footer from '../../components/frontend-pages/shared/footer';
import Banner from '../../components/frontend-pages/blog/banner';
import ScrollToTop from '../../components/frontend-pages/shared/scroll-to-top';
import BlogListing from 'src/components/blog/BlogListing';
import { Container } from '@mui/system';
import Character3D from 'src/components/frontend-pages/homepage/3d-character/Character3D';

const BlogPage = () => {
  return (
    <>
      <PageContainer title="Blog" description="this is Blog">
                <Character3D />
        
        <HpHeader />
        <Banner />
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <BlogListing />
        </Container>
        <C2a />
        <Footer />
        <ScrollToTop />
      </PageContainer>
    </>
  );
};

export default BlogPage;
