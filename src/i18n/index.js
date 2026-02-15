import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import am from "./locales/am.json";

const defaultLocale = "am";
const storedLocale = localStorage.getItem("locale");
const activeLocale = storedLocale || defaultLocale;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    am: { translation: am }
  },
  lng: activeLocale,
  fallbackLng: defaultLocale,
  interpolation: {
    escapeValue: false
  },
  returnNull: false,
  returnEmptyString: false,
  parseMissingKeyHandler: () => "Demo"
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("locale", lng);
});

export default i18n;
