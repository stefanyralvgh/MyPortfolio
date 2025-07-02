export interface Level {
  id: number;
  title: string;
  description: string;
  tech: string[];
  title_es?: string;
  title_en?: string;
  title_fr?: string;
  description_es?: string;
  description_en?: string;
  description_fr?: string;
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
