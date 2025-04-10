import { useTranslation } from 'react-i18next';
import PageContainer from 'src/components/container/PageContainer';
import Banner from 'src/components/frontend-pages/homepage/banner/Banner';
import HpHeader from 'src/components/frontend-pages/shared/header/HpHeader';
import Reviews from 'src/components/frontend-pages/shared/reviews';
import FAQ from 'src/components/frontend-pages/homepage/faq';
import Footer from 'src/components/frontend-pages/shared/footer';
import ScrollToTop from 'src/components/frontend-pages/shared/scroll-to-top';
import ActivitiesShowcase from 'src/components/frontend-pages/homepage/activities-showcase/ActivitiesShowcase';
import Sponsors from 'src/components/frontend-pages/shared/sponsors';
import DiscordInvite from 'src/components/frontend-pages/homepage/discord-invite/DiscordInvite';
import Character3D from 'src/components/frontend-pages/homepage/3d-character/Character3D';

const HomePage = () => {
  const { t } = useTranslation();
  
  // تحسين طريقة عرض الصفحة: وضع الهيدر خارج PageContainer لضمان تحميله أولاً
  return (
    <>
      <HpHeader />
      <PageContainer title={t('home.title')} description={t('home.description')}>
        {/* 3D Character added here */}
        <Character3D />
        <Banner />
        <ActivitiesShowcase />
        <DiscordInvite />
        <Sponsors />
        <Reviews />
        <FAQ />
        <Footer />
        <ScrollToTop />
      </PageContainer>
    </>
  );
};

export default HomePage;
