
import { Domain } from './types';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Interviews', path: '/interviews' },
  { name: 'Progress Tracker', path: '/progress' },
  { name: 'About', path: '/about' },
];

export const INTERVIEW_DOMAINS: Domain[] = [
  {
    name: 'Tech & Engineering',
    icon: 'fa-microchip',
    specializations: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'DevOps Engineer', 'Data Scientist'],
  },
  {
    name: 'Business & Management',
    icon: 'fa-briefcase',
    specializations: ['Product Manager', 'Project Manager', 'Business Analyst', 'Marketing Manager', 'Sales Director'],
  },
  {
    name: 'Creativity & Communication',
    icon: 'fa-lightbulb',
    specializations: ['UI/UX Designer', 'Content Strategist', 'Public Relations', 'Technical Writer', 'Graphic Designer'],
  },
  {
    name: 'Specialized Fields',
    icon: 'fa-user-doctor',
    specializations: ['Healthcare Professional', 'Legal Advisor', 'Educator', 'Customer Support Rep', 'Government Official'],
  },
];
