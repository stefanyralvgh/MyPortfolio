export interface Level {
  id: number;
  titles: Record<string, string>;
  descriptions: Record<string, string>;
  question: Record<string, string>;
  options: {
    [key: string]: Record<string, string>;
  };
  correct_option: string;
  explanation: Record<string, string>;
}

export interface Challenge {
  scenario: string;
  error?: string;
  brokenUrl?: string;
  query?: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Story {
  title: string;
  description: string;
  tech: string[];
}

export interface AdventureLevel {
  id: number;
  title: string;
  type: string;
  challenge: Challenge;
  story: Story;
}

export interface TerminalCommand {
  command: string;
  output: string;
  delay?: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
