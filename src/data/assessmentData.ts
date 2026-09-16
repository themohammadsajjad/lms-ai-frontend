export interface Assignment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  duration: string;
  questions: QuizQuestion[];
}

export const assignments: Assignment[] = [
  {
    id: 'react-assignment-1',
    courseId: 'react-foundations',
    courseTitle: 'React Foundations',
    title: 'Build a Reusable Profile Card',
    description:
      'Create a reusable React component using props and basic component composition.',
    dueDate: 'Sep 20, 2026',
    points: 100,
  },
  {
    id: 'python-assignment-1',
    courseId: 'python-data-science',
    courseTitle: 'Python for Data Science',
    title: 'Analyze a Small Dataset',
    description:
      'Use pandas to inspect, clean and summarize a sample dataset.',
    dueDate: 'Sep 23, 2026',
    points: 100,
  },
  {
    id: 'ml-assignment-1',
    courseId: 'machine-learning',
    courseTitle: 'Machine Learning Essentials',
    title: 'Regression Model Exercise',
    description:
      'Explain a regression workflow and identify suitable evaluation metrics.',
    dueDate: 'Sep 26, 2026',
    points: 80,
  },
];

export const quizzes: Quiz[] = [
  {
    id: 'react-quiz-1',
    courseId: 'react-foundations',
    courseTitle: 'React Foundations',
    title: 'React Fundamentals Quiz',
    duration: '10 min',
    questions: [
      {
        id: 'rq1',
        question: 'What is a React component?',
        options: [
          'A reusable piece of UI',
          'A database table',
          'A CSS framework',
          'A server process',
        ],
        correctAnswer: 0,
      },
      {
        id: 'rq2',
        question: 'Which hook is commonly used for component state?',
        options: [
          'useRoute',
          'useState',
          'useServer',
          'useStyle',
        ],
        correctAnswer: 1,
      },
      {
        id: 'rq3',
        question: 'Props are mainly used to:',
        options: [
          'Pass data to components',
          'Create databases',
          'Install packages',
          'Compile TypeScript',
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 'ml-quiz-1',
    courseId: 'machine-learning',
    courseTitle: 'Machine Learning Essentials',
    title: 'Machine Learning Basics',
    duration: '8 min',
    questions: [
      {
        id: 'mq1',
        question: 'Supervised learning uses:',
        options: [
          'Labeled training data',
          'Only images',
          'No data',
          'Only databases',
        ],
        correctAnswer: 0,
      },
      {
        id: 'mq2',
        question: 'Regression is generally used to predict:',
        options: [
          'Continuous values',
          'CSS classes',
          'File names',
          'Passwords',
        ],
        correctAnswer: 0,
      },
      {
        id: 'mq3',
        question: 'Model evaluation helps us understand:',
        options: [
          'How well a model performs',
          'How large the monitor is',
          'Which editor is installed',
          'Which browser is open',
        ],
        correctAnswer: 0,
      },
    ],
  },
];