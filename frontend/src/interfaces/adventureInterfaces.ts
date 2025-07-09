export interface AdventureLevelData {
  id: number;
  titles: string;
  descriptions: string;
  question: string;
  options: Record<string, string>;
  correct_option: string;
  explanation: string;
}

export interface AdventureLevelProps {
  level: AdventureLevelData;
  onComplete: (id: number) => void;
}
