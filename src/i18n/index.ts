import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en/common.json';
import ru from '@/locales/ru/common.json';

const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;

void i18n.use(initReactI18next).init({
  lng: stored || 'ru',
  fallbackLng: 'ru',
  debug: false,
  resources: {
    en: { common: en },
    ru: { common: ru },
  },
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
