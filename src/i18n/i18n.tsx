import i18n from "i18next";
import { cloneDeep } from "lodash";
import { initReactI18next } from "react-i18next";
import de from "./locales/de.json";
import en from "./locales/en.json";

export const FALLBACK_LANGUAGE = "en";

export interface Language {
  locale: string;
  name: string;
  icon: JSX.Element;
}

const getBrowserLanguage = () => {
  // @ts-ignore
  const userLang = navigator.language || navigator.userLanguage;

  return userLang ? userLang.split("-")[0] : FALLBACK_LANGUAGE;
};

const browserLanguage = getBrowserLanguage();

export const LANGUAGE_STORAGE_KEY = "appLanguage";

const getStoredLanguage = (): string | null => {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return null;
  }
};

const getInitialLanguage = () =>
  getStoredLanguage() || browserLanguage || FALLBACK_LANGUAGE;

export const defaultTranslationModules = [
  { locale: "de", texts: de },
  { locale: "en", texts: en }
] as const;
export const defaultLanguages = defaultTranslationModules.map((m) => m.locale);

export type Locale = (typeof defaultTranslationModules)[number]["locale"];

const resources = cloneDeep(
  Object.fromEntries(
    defaultTranslationModules.map((m) => [m.locale, { app: m.texts }])
  )
);

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
  } catch {}
});

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)

  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    ns: ["common", "app"],
    defaultNS: "app",
    lng: getInitialLanguage(),
    fallbackLng: FALLBACK_LANGUAGE,
    supportedLngs: defaultLanguages,
    load: "languageOnly",
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;
