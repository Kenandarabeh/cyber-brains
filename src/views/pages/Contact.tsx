import PageContainer from 'src/components/container/PageContainer';
import HeaderAlert from '../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import Footer from '../../components/frontend-pages/shared/footer';
import Banner from '../../components/frontend-pages/contact/banner';
import Form from '../../components/frontend-pages/contact/form';
import ScrollToTop from '../../components/frontend-pages/shared/scroll-to-top';
import { useTranslation } from 'react-i18next';
import Character3D from 'src/components/frontend-pages/homepage/3d-character/Character3D';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <PageContainer title={t('contact.title')} description={t('contact.description')}>
               <Character3D />
       
            <HpHeader />
            
            <Banner />
            <Form />
            <Footer />
            <ScrollToTop />
        </PageContainer>
    );
};

export default Contact;
