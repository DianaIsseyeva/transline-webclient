import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/locales/en/common.json';
import ru from '@/locales/ru/common.json';

const saved = localStorage.getItem('lang') || undefined;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: saved,
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
