import type { Project } from '@/types/project';
import type { TimelineItem } from '@/types/experience';
import type { Skill } from '@/types/skill';

// ── Navigation ───────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
] as const;

// ── Social Links ─────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/omkar-kambli-b86549b6/', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/omkar_kambli_19/',          icon: 'instagram' },
  { label: 'Email',     href: 'mailto:barcaomkarkambli@gmail.com',                   icon: 'mail'     },
] as const;

// ── Projects ─────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Union Budget 2026-27 Webpage',
    description:
      'A fast, responsive, and user-friendly government budget webpage built for SBI Securities. Focused on clarity of financial data presentation with optimised performance and accessibility.',
    tags: ['Angular', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Design'],
    liveUrl: 'https://sbisec.co.in',
    imageSrc: '/images/projects/budget.jpg',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'DemandData — Analytics Platform',
    description:
      'A B2B analytics web platform for demand forecasting. Built responsive CMS pages and admin dashboards with complex data visualisation and interactive filters.',
    tags: ['Angular', 'TypeScript', 'Bootstrap', 'REST API', 'Figma'],
    imageSrc: '/images/projects/demanddata.jpg',
    featured: false,
  },
  {
    id: 'project-3',
    title: 'MentorMyBoard — EdTech Platform',
    description:
      'An online mentorship and learning management system connecting students with industry mentors. Built the full frontend including authentication flows, dashboards, and course UI.',
    tags: ['Angular', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
    imageSrc: '/images/projects/mentormyboard.jpg',
    featured: false,
  },
  {
    id: 'project-4',
    title: 'GuardTrac — Security Dashboard',
    description:
      'A real-time security monitoring and tracking web application. Developed pixel-perfect responsive UI components and admin interfaces with live data feeds.',
    tags: ['React', 'JavaScript', 'CSS3', 'Bootstrap', 'REST API'],
    imageSrc: '/images/projects/guardtrac.jpg',
    featured: false,
  },
  {
    id: 'project-5',
    title: 'EasyTutor — Online Tutoring',
    description:
      'A cross-device tutoring platform with scheduling, video sessions, and progress tracking. Led the UI design and implementation from wireframes to production.',
    tags: ['Angular', 'Figma', 'Adobe XD', 'CSS3', 'JavaScript'],
    imageSrc: '/images/projects/easytutor.jpg',
    featured: false,
  },
];

// ── Skills ───────────────────────────────────────────────────
// Levels based on Omkar's self-assessed proficiencies from his portfolio
export const SKILLS: Skill[] = [
  // Frontend
  { name: 'HTML5',       icon: '/icons/html.svg',        level: 100, category: 'frontend' },
  { name: 'CSS3',        icon: '/icons/css.svg',         level: 90,  category: 'frontend' },
  { name: 'Bootstrap',   icon: '/icons/bootstrap.svg',   level: 90,  category: 'frontend' },
  { name: 'JavaScript',  icon: '/icons/javascript.svg',  level: 65,  category: 'frontend' },
  { name: 'Angular',     icon: '/icons/angular.svg',     level: 75,  category: 'frontend' },
  { name: 'React',       icon: '/icons/react.svg',       level: 55,  category: 'frontend' },
  // Design
  { name: 'Figma',       icon: '/icons/figma.svg',       level: 65,  category: 'design' },
  { name: 'Adobe XD',    icon: '/icons/adobexd.svg',     level: 55,  category: 'design' },
  { name: 'Photoshop',   icon: '/icons/photoshop.svg',   level: 40,  category: 'design' },
  // DevOps & Tools
  { name: 'WordPress',   icon: '/icons/wordpress.svg',   level: 55,  category: 'devops' },
  { name: 'Git/GitHub',  icon: '/icons/git.svg',         level: 80,  category: 'devops' },
  { name: 'Netlify',     icon: '/icons/vercel.svg',      level: 70,  category: 'devops' },
];

// ── Experience ───────────────────────────────────────────────
export const EXPERIENCE: TimelineItem[] = [
  {
    id: 'exp-1',
    company: 'SBI Securities Ltd.',
    role: 'Senior Frontend Developer',
    period: '2024 – Present',
    location: 'Mumbai, India',
    description: [
      'Developing and maintaining client-facing web applications for India\'s leading securities broker, serving millions of investors.',
      'Built the Union Budget 2026-27 webpage — praised for being fast, responsive, and user-friendly with a focus on clarity.',
      'Collaborating with design and backend teams to implement Angular-based UI components with high performance standards.',
    ],
    technologies: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap'],
  },
  {
    id: 'exp-2',
    company: 'UI/UX Web Developer',
    role: 'UI/UX Web Developer',
    period: '2021 – 2024',
    location: 'Andheri, Mumbai',
    description: [
      'Led frontend development for DemandData, Veritx-Fortis, and GuardTrac — building responsive CMS pages, admin dashboards, and landing pages.',
      'Collaborated closely with UI/UX designers using Figma and Adobe XD to translate wireframes into pixel-perfect web interfaces.',
      'Improved page load performance and mobile responsiveness across all client projects, reducing bounce rate by 30%.',
    ],
    technologies: ['Angular', 'React', 'Bootstrap', 'Figma', 'Adobe XD', 'JavaScript'],
  },
  {
    id: 'exp-3',
    company: 'Myrsa Technology Solutions Ltd.',
    role: 'Web Developer',
    period: '2019 – 2021',
    location: 'Mumbai, India',
    description: [
      'Developed and maintained frontend for EdTech products — MentorMyBoard, DirectM, and EasyTutor — serving thousands of students and mentors.',
      'Built reusable component libraries in Angular and integrated REST APIs for authentication, scheduling, and content management.',
      'Progressed from intern to permanent team member through consistent performance and quick adoption of new technologies.',
    ],
    technologies: ['Angular', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'WordPress'],
  },
  {
    id: 'exp-4',
    company: 'Webenetics',
    role: 'Junior Web Developer',
    period: 'Early 2019 (3 months)',
    location: 'Wadala, Mumbai',
    description: [
      'Completed an intensive internship building landing pages and responsive websites for GlobalPharma and PracticalAnxiety.',
      'Gained foundational experience in responsive web design, cross-browser compatibility, and CMS integrations.',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'WordPress', 'Bootstrap'],
  },
];

// ── Tech Stack (for About section) ──────────────────────────
export const TECH_STACK = [
  'Angular', 'React', 'JavaScript', 'TypeScript',
  'HTML5', 'CSS3', 'Bootstrap', 'Figma',
  'Adobe XD', 'WordPress', 'Git', 'Photoshop',
];

// ── Personal Info ────────────────────────────────────────────
export const PERSONAL_INFO = {
  name: 'Omkar Kambli',
  title: 'Frontend Developer & UI/UX Engineer',
  location: 'Mumbai, India',
  email: 'barcaomkarkambli@gmail.com',
  phone: '+91 9768630661',
} as const;
