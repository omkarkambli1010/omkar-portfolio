export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageSrc: string;
  logoSrc?: string;
  featured?: boolean;
}
