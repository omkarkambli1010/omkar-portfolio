export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'design';

export interface Skill {
  name: string;
  icon: string;
  level: number; // 0-100
  category: SkillCategory;
}
