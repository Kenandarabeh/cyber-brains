import PageContainer from 'src/components/container/PageContainer';
import HeaderAlert from '../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import Leadership from '../../components/frontend-pages/shared/leadership';
import AlumniLeaders from '../../components/frontend-pages/shared/alumni-leaders';
import Footer from '../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../components/frontend-pages/shared/scroll-to-top';
import PageBanner from 'src/components/frontend-pages/shared/page-banner/PageBanner';
import CommitteeMembers from '../../components/frontend-pages/shared/committee-members';
import Supervisors from '../../components/frontend-pages/shared/supervisors';
import { useTranslation } from 'react-i18next';
import React from 'react';
import Character3D from 'src/components/frontend-pages/homepage/3d-character/Character3D';

const Team = () => {
  const { t } = useTranslation();
  
  // تحسين معالجة إعادة التحميل
  React.useEffect(() => {
    // إعادة تهيئة مباشرة بعد التحميل
    window.dispatchEvent(new Event('resize'));
    
    // ثم بعد تحميل كامل الصفحة
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <PageContainer title={t('team.title')} description={t('team.subtitle')}>
      <HpHeader />
              <Character3D />
      
      <PageBanner
        title={t('team.title')}
        subtitle={t('team.subtitle')}
        path={[t('team.path.team')]}
      />
      <Leadership />
      <AlumniLeaders /> {/* إضافة القسم الجديد: أبرز الشخصيات */}
      <Supervisors />
      {/* <CommitteeMembers /> */}
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default Team;
