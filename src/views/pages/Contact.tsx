import PageContainer from 'src/components/container/PageContainer';
import HeaderAlert from '../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import Footer from '../../components/frontend-pages/shared/footer';
import Banner from '../../components/frontend-pages/contact/banner';
import Form from '../../components/frontend-pages/contact/form';
import ScrollToTop from '../../components/frontend-pages/shared/scroll-to-top';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <PageContainer title={t('contact.title')} description={t('contact.description')}>
            <HpHeader />
            <Banner />
            <Form />
            <Footer />
            <ScrollToTop />
        </PageContainer>
    );
};

export default Contact;
