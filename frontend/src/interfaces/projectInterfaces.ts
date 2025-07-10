export interface Project {
  id: number;
  title: {
    en: string;
    es: string;
    fr: string;
  };
  role: {
    en: string;
    es: string;
    fr: string;
  };
  tech: {
    en: string;
    es: string;
    fr: string;
  };
  description: {
    en: string;
    es: string;
    fr: string;
  };
  status: {
    en: string;
    es: string;
    fr: string;
  };
  link: {
    en: string;
    es: string;
    fr: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ProjectDisplay {
  id: number;
  title: string;
  role: string;
  tech: string;
  description: string;
  status: string;
  link: string;
  created_at: string;
  updated_at: string;
}
