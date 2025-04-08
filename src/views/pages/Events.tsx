import PageContainer from 'src/components/container/PageContainer';
import HeaderAlert from '../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import Footer from '../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../components/frontend-pages/shared/scroll-to-top';
import PageBanner from 'src/components/frontend-pages/shared/page-banner/PageBanner';
import { 
  EventsShowcase,
  UpcomingEvents, 
  PastEvents, 
  EventCategories 
} from 'src/components/frontend-pages/events';
import { useTranslation } from 'react-i18next';

const Events = () => {
  const {t} = useTranslation();
  return (
    <PageContainer title="Events" description="Media Club Events and Activities">
      <HpHeader />
      <PageBanner
        title={t('events.title')}
        subtitle={t('events.subtitle')}
        path={[t('events.path.events')]}
      />  
      <EventCategories />
      {/* <UpcomingEvents /> */}
      <PastEvents />
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default Events;
