export interface CourseModule {
  id: string;
  title: string;
  lessons: number;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  lessons: number;
  duration: string;
  enrolled: boolean;
  description: string;
  rating: number;
  students: number;
  modules: CourseModule[];
}

export const courses: Course[] = [
  {
    id: 'react-foundations',
    title: 'React Foundations',
    category: 'Web Development',
    instructor: 'Arjun Mehta',
    level: 'Beginner',
    progress: 68,
    lessons: 24,
    duration: '8h 40m',
    enrolled: true,
    description:
      'Learn the core concepts of React including components, props, state, hooks and reusable UI patterns.',
    rating: 4.8,
    students: 1240,
    modules: [
      { id: 'r1', title: 'Getting Started with React', lessons: 5 },
      { id: 'r2', title: 'Components and Props', lessons: 6 },
      { id: 'r3', title: 'State and Events', lessons: 6 },
      { id: 'r4', title: 'Hooks and Reusability', lessons: 7 },
    ],
  },
  {
    id: 'python-data-science',
    title: 'Python for Data Science',
    category: 'Data Science',
    instructor: 'Neha Sharma',
    level: 'Intermediate',
    progress: 42,
    lessons: 32,
    duration: '11h 20m',
    enrolled: true,
    description:
      'Build practical data analysis skills using Python, NumPy, pandas and visualization workflows.',
    rating: 4.7,
    students: 980,
    modules: [
      { id: 'p1', title: 'Python Essentials', lessons: 7 },
      { id: 'p2', title: 'NumPy Fundamentals', lessons: 7 },
      { id: 'p3', title: 'Data Analysis with pandas', lessons: 10 },
      { id: 'p4', title: 'Data Visualization', lessons: 8 },
    ],
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Essentials',
    category: 'Artificial Intelligence',
    instructor: 'Rahul Verma',
    level: 'Intermediate',
    progress: 0,
    lessons: 28,
    duration: '10h 15m',
    enrolled: false,
    description:
      'Understand supervised learning, model evaluation and the foundations of practical machine learning.',
    rating: 4.9,
    students: 1560,
    modules: [
      { id: 'm1', title: 'Machine Learning Foundations', lessons: 6 },
      { id: 'm2', title: 'Regression Models', lessons: 7 },
      { id: 'm3', title: 'Classification', lessons: 8 },
      { id: 'm4', title: 'Model Evaluation', lessons: 7 },
    ],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Fundamentals',
    category: 'Design',
    instructor: 'Aisha Khan',
    level: 'Beginner',
    progress: 0,
    lessons: 20,
    duration: '7h 30m',
    enrolled: false,
    description:
      'Learn user research, wireframing, visual hierarchy and interface design fundamentals.',
    rating: 4.6,
    students: 720,
    modules: [
      { id: 'u1', title: 'Introduction to UX', lessons: 5 },
      { id: 'u2', title: 'User Research', lessons: 5 },
      { id: 'u3', title: 'Wireframes and Prototypes', lessons: 5 },
      { id: 'u4', title: 'Visual Design', lessons: 5 },
    ],
  },
  {
    id: 'typescript-modern-apps',
    title: 'TypeScript for Modern Apps',
    category: 'Web Development',
    instructor: 'Vikram Singh',
    level: 'Intermediate',
    progress: 0,
    lessons: 22,
    duration: '8h 10m',
    enrolled: false,
    description:
      'Write safer JavaScript applications using TypeScript types, interfaces, generics and modern patterns.',
    rating: 4.7,
    students: 840,
    modules: [
      { id: 't1', title: 'TypeScript Basics', lessons: 5 },
      { id: 't2', title: 'Types and Interfaces', lessons: 6 },
      { id: 't3', title: 'Generics', lessons: 5 },
      { id: 't4', title: 'Application Patterns', lessons: 6 },
    ],
  },
  {
    id: 'ai-productivity',
    title: 'AI Tools for Productivity',
    category: 'Artificial Intelligence',
    instructor: 'Priya Kapoor',
    level: 'Beginner',
    progress: 0,
    lessons: 18,
    duration: '6h 25m',
    enrolled: false,
    description:
      'Use modern AI tools effectively for research, ideation, documentation and everyday productivity.',
    rating: 4.8,
    students: 1320,
    modules: [
      { id: 'a1', title: 'AI Tool Fundamentals', lessons: 4 },
      { id: 'a2', title: 'Prompting Techniques', lessons: 5 },
      { id: 'a3', title: 'Research Workflows', lessons: 4 },
      { id: 'a4', title: 'Productivity Workflows', lessons: 5 },
    ],
  },
];

export const recentActivity = [
  {
    id: 1,
    title: 'Completed: React Components',
    course: 'React Foundations',
    time: '2 hours ago',
  },
  {
    id: 2,
    title: 'Quiz score: 8/10',
    course: 'Python for Data Science',
    time: 'Yesterday',
  },
  {
    id: 3,
    title: 'Added a new course note',
    course: 'React Foundations',
    time: '2 days ago',
  },
];