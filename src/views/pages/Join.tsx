import PageContainer from 'src/components/container/PageContainer';
import HeaderAlert from '../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import C2a from '../../components/frontend-pages/shared/c2a';
import Footer from '../../components/frontend-pages/shared/footer';
import Banner from '../../components/frontend-pages/contact/banner';
import ScrollToTop from '../../components/frontend-pages/shared/scroll-to-top';
import PageBanner from 'src/components/frontend-pages/shared/page-banner/PageBanner';
import CommitteeForm from '../../components/frontend-pages/shared/committee-form';
import { useTranslation } from 'react-i18next';
import Character3D from 'src/components/frontend-pages/homepage/3d-character/Character3D';

const Join = () => {
    const { t } = useTranslation();
    
    return (
        <PageContainer title={t('join.title')} description={t('join.subtitle')}>
            <HpHeader />
            <Character3D />

            <PageBanner
                title={t('join.title')}
                subtitle={t('join.subtitle')}
                path={[t('join.path.join')]}
            />  
            <CommitteeForm />
            <Footer />
            <ScrollToTop />
        </PageContainer>
    );
};

export default Join;
