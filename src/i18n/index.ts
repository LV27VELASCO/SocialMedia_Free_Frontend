import { labels, type Lang  } from './ui';


const defaultLang: Lang = 'es';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in labels) return lang as keyof typeof labels;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof labels) {
  return function t(key: keyof typeof labels[typeof defaultLang]) {
    return labels[lang][key] || labels[defaultLang][key];
  }
}

// 🧩 función global simplificada
export function useI18n(Astro: { currentLocale?: string }) {
  // 🔒 fuerza a Lang o fallback a "es"
  const currentLang = (Astro.currentLocale as Lang) || defaultLang;

  const translate = useTranslations(currentLang);
  return { translate, currentLang };
}