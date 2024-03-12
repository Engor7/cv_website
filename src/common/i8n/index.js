import { createI18n } from 'vue-i18n';
import ru from './ru.js';
import en from './en.js';

const getLanguage = () => {
  const languageStorage = localStorage.getItem('language');
  if (languageStorage === 'ru' || languageStorage === 'en')
    return languageStorage;

  const userLanguage = navigator.language;
  const validLanguages = [
    'ru',
    'ru-BY',
    'ru-KG',
    'ru-KZ',
    'ru-MD',
    'ru-RU',
    'ru-UA',
    'be',
    'be-BY',
    'tt-RU',
    'sah-RU',
    'ce',
    'ce-RU',
    'os-RU',
    'uk-UA',
    'uk',
  ];

  if (validLanguages.includes(userLanguage)) return 'ru';
  return 'en';
};

export const i18n = createI18n({
  locale: getLanguage(),
  globalInjection: true,
  fallbackLocale: 'ru',
  messages: { ru, en },
});
