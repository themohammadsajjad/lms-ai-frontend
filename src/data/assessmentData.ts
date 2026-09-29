export interface Assignment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
}

export type QuizQuestionType =
  | 'single'
  | 'multiple'
  | 'short';

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuizQuestionType;
  options?: string[];
  correctAnswer?: number;
  correctAnswers?: number[];
  acceptedAnswers?: string[];
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
        type: 'single',
        question:
          'What is a React component?',
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
        type: 'multiple',
        question:
          'Which of these are React hooks?',
        options: [
          'useState',
          'useEffect',
          'useDatabase',
          'useStyleSheet',
        ],
        correctAnswers: [0, 1],
      },
      {
        id: 'rq3',
        type: 'short',
        question:
          'What do we call data passed from a parent component to a child component?',
        acceptedAnswers: [
          'props',
          'prop',
          'properties',
        ],
      },
      {
        id: 'rq4',
        type: 'single',
        question:
          'Which hook is commonly used for component state?',
        options: [
          'useRoute',
          'useState',
          'useServer',
          'useStyle',
        ],
        correctAnswer: 1,
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
        type: 'single',
        question:
          'Supervised learning uses:',
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
        type: 'multiple',
        question:
          'Which of these can be used to evaluate a regression model?',
        options: [
          'Mean Absolute Error',
          'Mean Squared Error',
          'Screen resolution',
          'CSS specificity',
        ],
        correctAnswers: [0, 1],
      },
      {
        id: 'mq3',
        type: 'short',
        question:
          'What type of values does regression generally predict?',
        acceptedAnswers: [
          'continuous',
          'continuous values',
          'numerical values',
          'numeric values',
        ],
      },
    ],
  },
];