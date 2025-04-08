const baselightTheme = {
  direction: 'ltr',
  palette: {
    primary: {
      main: '#5960fe',     // أزرق أساسي جديد
      light: '#a7aaff',    // أزرق فاتح معدل
      dark: '#3035e0',     // أزرق داكن معدل
    },
    secondary: {
      main: '#f600b9',     // وردي/فوشيا أساسي
      light: '#ff9ee6',    // وردي فاتح
      dark: '#c4008f',     // وردي داكن
    },
    success: {
      main: '#4caf50',     // أخضر
      light: '#e8f5e9',    // أخضر فاتح
      dark: '#3b8a3f',     // أخضر داكن
      contrastText: '#ffffff',
    },
    info: {
      main: '#5960fe',     // نفس اللون الأساسي الجديد
      light: '#e1e1ff',    // أزرق فاتح جداً معدل
      dark: '#3035e0',     // أزرق داكن معدل
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336',     // أحمر
      light: '#ffebee',    // أحمر فاتح
      dark: '#c62828',     // أحمر داكن
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',     // برتقالي
      light: '#fff3e0',    // برتقالي فاتح
      dark: '#e65100',     // برتقالي داكن
      contrastText: '#ffffff',
    },
    grey: {
      100: '#F9F9F9',
      200: '#EFEFEF',
      300: '#DCDCDC',
      400: '#B8B8B8',
      500: '#8F8F8F',
      600: '#636363',
    },
    text: {
      primary: '#2A3547',
      secondary: '#5A6A85',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F9F9F9',
    },
  },
};

const baseDarkTheme = {
  direction: 'ltr',
  palette: {
    primary: {
      main: '#5960fe',     // أزرق أساسي جديد
      light: '#8186ff',    // أزرق أفتح قليلاً معدل
      dark: '#3035e0',     // أزرق داكن معدل
    },
    secondary: {
      main: '#f600b9',     // وردي/فوشيا أساسي
      light: '#ff40c8',    // وردي أفتح قليلاً
      dark: '#c4008f',     // وردي داكن
    },
    success: {
      main: '#4caf50',     // أخضر
      light: '#2e3b2e',    // أخضر داكن فاتح
      dark: '#357a38',     // أخضر داكن
      contrastText: '#ffffff',
    },
    info: {
      main: '#5960fe',     // نفس اللون الأساسي الجديد
      light: '#1e2047',    // أزرق داكن خفيف معدل
      dark: '#3035e0',     // أزرق داكن معدل
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336',     // أحمر
      light: '#352a2a',    // أحمر داكن خفيف
      dark: '#c62828',     // أحمر داكن
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',     // برتقالي
      light: '#33302c',    // برتقالي داكن خفيف
      dark: '#e65100',     // برتقالي داكن
      contrastText: '#ffffff',
    },
    grey: {
      100: '#2C2C2C',      // خلفية داكنة
      200: '#383838',      // عناصر ثانوية
      300: '#4A4A4A',      // حدود وفواصل
      400: '#777777',      // نصوص ثانوية
      500: '#9C9C9C',      // نصوص معطلة
      600: '#BEBEBE',      // تأثيرات خفيفة
    },
    text: {
      primary: '#EAEFF4',
      secondary: '#B8B8B8',
    },
    background: {
      default: '#1C1C1C',
      dark: '#141414',
      paper: '#2A2A2A',    // خلفية القوائم
      menuHover: '#333333'  // تأثير التمرير فوق عناصر القائمة
    },
    divider: '#404040',    // لون الفاصل في الوضع الداكن
  },
};

export { baseDarkTheme, baselightTheme };