import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./languages/en.json";
import pl from "./languages/pl.json";

const savedLang = localStorage.getItem("language");

i18n
  .use(initReactI18next)
  .init({
    lng: savedLang || "pl", // domyślny język
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: en },
      pl: { translation: pl }
    }
  });

export default i18n;
