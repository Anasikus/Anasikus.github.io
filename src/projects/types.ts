export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;

  shortDescription: string;
  description: string;

  technologies: string[];

  previewImage?: string;
  gallery?: string[];

  githubUrl?: string;
  liveUrl?: string;

  featured?: boolean;
}