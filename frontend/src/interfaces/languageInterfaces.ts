export type Language = "es" | "en" | "fr";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export interface Translations {
  [key: string]: string;
}

export interface LanguageTranslations {
  es: Translations;
  en: Translations;
  fr: Translations;
}
