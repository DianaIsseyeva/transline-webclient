import { useTranslation } from 'react-i18next';

export default function LanguageSwitch() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage;
  const change = (lng: 'ru' | 'en') => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('lang', lng);
    } catch {}
  };

  return (
    <div className='flex items-center gap-2 ml-auto'>
      <button
        type='button'
        aria-pressed={current === 'ru'}
        disabled={current === 'ru'}
        className={`px-2 py-2 text-sm rounded ${
          current === 'ru' ? 'bg-gray-200 cursor-default' : 'hover:bg-gray-100'
        }`}
        onClick={() => change('ru')}
      >
        RU
      </button>
      <button
        type='button'
        aria-pressed={current === 'en'}
        disabled={current === 'en'}
        className={`px-2 py-2 text-sm rounded ${
          current === 'en' ? 'bg-gray-200 cursor-default' : 'hover:bg-gray-100'
        }`}
        onClick={() => change('en')}
      >
        EN
      </button>
    </div>
  );
}
