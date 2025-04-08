import PageContainer from 'src/components/container/PageContainer';
import HeaderAlert from '../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import Reviews from '../../components/frontend-pages/shared/reviews';
import Footer from '../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../components/frontend-pages/shared/scroll-to-top';
import Features from 'src/components/frontend-pages/homepage/features/Features';
import PageBanner from 'src/components/frontend-pages/shared/page-banner/PageBanner';
import WhoWeAre from 'src/components/frontend-pages/about/who-we-are/WhoWeAre';
import OurMission from 'src/components/frontend-pages/about/our-mission/OurMission';
import Committees from 'src/components/frontend-pages/about/committees';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  
  return (
    <PageContainer title={t('about.title')} description={t('about.subtitle')}>
      <HpHeader />
      <PageBanner
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        path={[t('about.title')]}
      />  
      <WhoWeAre />
      <OurMission />
      <Features />
      <Committees />

      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default About;
