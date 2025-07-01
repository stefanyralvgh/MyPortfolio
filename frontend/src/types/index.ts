export interface Level {
  id: number;
  title: string;
  description: string;
  tech: string[];
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
} 