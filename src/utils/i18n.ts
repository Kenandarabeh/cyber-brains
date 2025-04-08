import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// استيراد ملفات الترجمة من index.js
import ar from 'src/utils/languages/ar/index';
import en from 'src/utils/languages/en/index';
import fr from 'src/utils/languages/fr/index';

// تعريف الموارد
const resources = {
  ar: {
    translation: ar
  },
  en: {
    translation: en
  },
  fr: {
    translation: fr
  }
};

// الحصول على اللغة المحفوظة أو استخدام الإنجليزية كلغة افتراضية
const savedLanguage = localStorage.getItem('language') || 'en';

// تهيئة i18n بشكل متزامن
i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: 'ar',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  debug: process.env.NODE_ENV === 'development',
});

// تطبيق اتجاه اللغة عند بدء التطبيق
document.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = savedLanguage;

// دالة للحصول على اللغة الحالية
export const getCurrentLanguage = () => {
  return i18n.language;
};

// دالة للتحقق مما إذا كانت اللغة الحالية RTL
export const isRTLLanguage = () => {
  return getCurrentLanguage() === 'ar';
};

// دالة للحصول على اتجاه اللغة
export const getDirection = () => {
  return isRTLLanguage() ? 'rtl' : 'ltr';
};

// دالة لتغيير لغة التطبيق
export const setAppLanguage = async (language) => {
  try {
    const shouldBeRTL = language === 'ar';
    
    // تحديث localStorage
    localStorage.setItem('language', language);
    
    // تحديث اتجاه الصفحة
    document.dir = shouldBeRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // تغيير اللغة في i18n
    await i18n.changeLanguage(language);
    
    // حدث مخصص لتحديث اللغة في المكونات
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language, direction: shouldBeRTL ? 'rtl' : 'ltr' }
    }));
    
    // إعادة تحميل الصفحة لتطبيق التغييرات (اختياري)
    // window.location.reload();
  } catch (error) {
    console.error('Error setting language:', error);
  }
};

// مراقب تغيير اللغة
i18n.on('languageChanged', (lng) => {
  try {
    const isRtl = lng === 'ar';
    localStorage.setItem('language', lng);
    document.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    
    // إرسال حدث تغيير الاتجاه
    window.dispatchEvent(new CustomEvent('directionchange', { 
      detail: { direction: isRtl ? 'rtl' : 'ltr' } 
    }));
  } catch (error) {
    console.error('Error in language change handler:', error);
  }
});

export default i18n;
