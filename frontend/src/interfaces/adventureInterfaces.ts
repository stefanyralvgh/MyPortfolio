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
    title: string;
    type: string;
    challenge: Challenge;
    story: Story;
  };
  onComplete: (levelId: number) => void;
}
