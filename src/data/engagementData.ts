export interface Certificate {
  id: string;
  courseTitle: string;
  issuedDate: string;
  credentialId: string;
  status: 'earned' | 'in-progress';
  progress: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: string;
  earned: boolean;
}

export const certificates: Certificate[] = [
  {
    id: 'cert-react',
    courseTitle: 'React Foundations',
    issuedDate: 'Sep 10, 2026',
    credentialId: 'VL-RCT-2026-1048',
    status: 'earned',
    progress: 100,
  },
  {
    id: 'cert-python',
    courseTitle: 'Python for Data Science',
    issuedDate: 'Sep 12, 2026',
    credentialId: 'VL-PY-2026-1182',
    status: 'earned',
    progress: 100,
  },
  {
    id: 'cert-uiux',
    courseTitle: 'UI/UX Design Fundamentals',
    issuedDate: 'Sep 14, 2026',
    credentialId: 'VL-UX-2026-1204',
    status: 'earned',
    progress: 100,
  },
  {
    id: 'cert-ml',
    courseTitle: 'Machine Learning Essentials',
    issuedDate: '',
    credentialId: '',
    status: 'in-progress',
    progress: 72,
  },
];

export const badges: Badge[] = [
  {
    id: 'badge-streak',
    title: '7 Day Streak',
    description: 'Studied for seven consecutive days.',
    category: 'Consistency',
    earned: true,
  },
  {
    id: 'badge-quiz',
    title: 'Quiz Explorer',
    description: 'Completed your first course quiz.',
    category: 'Assessment',
    earned: true,
  },
  {
    id: 'badge-notes',
    title: 'Active Note Taker',
    description: 'Saved personal notes while learning.',
    category: 'Learning',
    earned: true,
  },
  {
    id: 'badge-ai',
    title: 'AI Study Partner',
    description: 'Used the AI Tutor to explore a course concept.',
    category: 'AI Learning',
    earned: true,
  },
  {
    id: 'badge-master',
    title: 'Flashcard Master',
    description: 'Master all flashcards in a study set.',
    category: 'Study Tools',
    earned: false,
  },
  {
    id: 'badge-perfect',
    title: 'Perfect Score',
    description: 'Score 100% on a course quiz.',
    category: 'Assessment',
    earned: false,
  },
];