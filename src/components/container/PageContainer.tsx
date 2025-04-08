import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => {
  const { t, i18n } = useTranslation();

  // إضافة معالج لتحديثات الترجمة
  useEffect(() => {
    // تعيين عنوان الصفحة بناءً على اتجاه اللغة
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <html lang={i18n.language} />
      </Helmet>
      {children}
    </div>
  );
};

export default PageContainer;
