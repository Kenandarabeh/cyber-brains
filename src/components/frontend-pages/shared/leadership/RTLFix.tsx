import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// مكون مساعد لإصلاح مشكلات RTL في مكتبة Slick
const RTLFix = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  // إضافة نمط CSS ديناميكي لإصلاح مشاكل RTL في مكتبة Slick
  useEffect(() => {
    // إنشاء عنصر نمط
    const styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'rtl-leadership-fix');
    
    // إضافة قواعد CSS لإصلاح العرض في وضع RTL
    if (isRTL) {
      const cssRules = `
        .leadership-carousel .slick-slider { direction: ltr !important; }
        .leadership-carousel .slick-track { direction: ltr !important; }
        .leadership-carousel .slick-slide { float: left !important; }
        .leadership-carousel .slick-slide > div { direction: rtl; }
        .leadership-carousel .slick-slide .MuiPaper-root { direction: rtl; text-align: right; }
      `;
      
      styleElement.textContent = cssRules;
      document.head.appendChild(styleElement);
    }
    
    // تنظيف عند إلغاء تحميل المكون
    return () => {
      const existingStyle = document.getElementById('rtl-leadership-fix');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [isRTL]);
  
  return null; // هذا المكون لا يعرض أي شيء في DOM
};

export default RTLFix;
