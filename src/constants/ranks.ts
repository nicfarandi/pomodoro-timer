import { RankDef } from '../types';

export const RANKS: RankDef[] = [
  { title: 'Intern',     minXP: 0 },
  { title: 'Associate',  minXP: 150 },
  { title: 'Analyst',    minXP: 400,   themeUnlock: 'dark' },
  { title: 'Specialist', minXP: 800 },
  { title: 'Senior',     minXP: 1400,  themeUnlock: 'amber' },
  { title: 'Lead',       minXP: 2200 },
  { title: 'Manager',    minXP: 3200 },
  { title: 'Director',   minXP: 4500,  themeUnlock: 'navy' },
  { title: 'VP',         minXP: 6500 },
  { title: 'C-Suite',    minXP: 9500 },
  { title: 'CEO',        minXP: 15000 },
];
