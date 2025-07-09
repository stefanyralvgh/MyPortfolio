export interface Challenge {
  scenario: string;
  error?: string;
  brokenUrl?: string;
  query?: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanations?: string[];
}

export interface Story {
  title: string;
  description: string;
  tech: string[];
}

export interface AdventureLevelProps {
  level: {
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
  };
  onComplete: (levelId: number) => void;
}
