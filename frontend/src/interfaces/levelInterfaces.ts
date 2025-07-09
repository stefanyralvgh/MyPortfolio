export interface Level {
  id: number;
  titles: {
    en: string;
    es: string;
    fr: string;
  };
  descriptions: {
    en: string;
    es: string;
    fr: string;
  };
  question: {
    en: string;
    es: string;
    fr: string;
  };
  options: {
    A: {
      en: string;
      es: string;
      fr: string;
    };
    B: {
      en: string;
      es: string;
      fr: string;
    };
  };
  correct_option: string;
  explanation: {
    en: string;
    es: string;
    fr: string;
  };
  created_at: string;
  updated_at: string;
}

export interface AdventureLevel {
  id: number;
  title: {
    en: string;
    es: string;
    fr: string;
  };
  type: string;
  challenge: {
    scenario: {
      en: string;
      es: string;
      fr: string;
    };
    options: string[];
    correctAnswer: number;
    explanation: {
      en: string;
      es: string;
      fr: string;
    };
  };
  story: {
    title: {
      en: string;
      es: string;
      fr: string;
    };
    description: {
      en: string;
      es: string;
      fr: string;
    };
    tech: string[];
  };
}
