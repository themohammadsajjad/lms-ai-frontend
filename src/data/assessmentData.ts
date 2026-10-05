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

export type QuizDifficulty =
  | 'beginner'
  | 'intermediate'
  | 'advanced';

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuizQuestionType;
  difficulty: QuizDifficulty;
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
    title:
      'Build a Reusable Profile Card',
    description:
      'Create a reusable React component using props and basic component composition.',
    dueDate: 'Sep 20, 2026',
    points: 100,
  },
  {
    id: 'python-assignment-1',
    courseId: 'python-data-science',
    courseTitle:
      'Python for Data Science',
    title:
      'Analyze a Small Dataset',
    description:
      'Use pandas to inspect, clean and summarize a sample dataset.',
    dueDate: 'Sep 23, 2026',
    points: 100,
  },
  {
    id: 'ml-assignment-1',
    courseId: 'machine-learning',
    courseTitle:
      'Machine Learning Essentials',
    title:
      'Regression Model Exercise',
    description:
      'Explain a regression workflow and identify suitable evaluation metrics.',
    dueDate: 'Sep 26, 2026',
    points: 80,
  },
];

export const quizzes: Quiz[] = [
  {
    id: 'react-quiz-1',
    courseId:
      'react-foundations',
    courseTitle:
      'React Foundations',
    title:
      'React Fundamentals Quiz',
    duration: '10 min',
    questions: [
      {
        id: 'rq-b1',
        difficulty:
          'beginner',
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
        id: 'rq-b2',
        difficulty:
          'beginner',
        type: 'multiple',
        question:
          'Which of these are commonly used in React components?',
        options: [
          'Props',
          'State',
          'SQL tables',
          'Server ports',
        ],
        correctAnswers: [
          0,
          1,
        ],
      },
      {
        id: 'rq-b3',
        difficulty:
          'beginner',
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
        id: 'rq-i1',
        difficulty:
          'intermediate',
        type: 'single',
        question:
          'Which React hook is commonly used to manage component state?',
        options: [
          'useRoute',
          'useState',
          'useServer',
          'useStyle',
        ],
        correctAnswer: 1,
      },
      {
        id: 'rq-i2',
        difficulty:
          'intermediate',
        type: 'multiple',
        question:
          'Which statements about React state are correct?',
        options: [
          'State can change over time',
          'Updating state can trigger a re-render',
          'State can only contain strings',
          'State must always come from a parent',
        ],
        correctAnswers: [
          0,
          1,
        ],
      },
      {
        id: 'rq-i3',
        difficulty:
          'intermediate',
        type: 'short',
        question:
          'Which hook is used for side effects in a React component?',
        acceptedAnswers: [
          'useeffect',
          'use effect',
          'useEffect',
        ],
      },

      {
        id: 'rq-a1',
        difficulty:
          'advanced',
        type: 'single',
        question:
          'Why should state generally not be mutated directly in React?',
        options: [
          'React relies on state updates to detect changes and re-render correctly',
          'JavaScript does not allow object mutation',
          'React state can only store numbers',
          'Direct mutation automatically reloads the browser',
        ],
        correctAnswer: 0,
      },
      {
        id: 'rq-a2',
        difficulty:
          'advanced',
        type: 'multiple',
        question:
          'Which practices can help make React components more reusable?',
        options: [
          'Passing configurable data through props',
          'Extracting repeated logic into custom hooks',
          'Hard-coding all values inside every component',
          'Separating responsibilities into focused components',
        ],
        correctAnswers: [
          0,
          1,
          3,
        ],
      },
      {
        id: 'rq-a3',
        difficulty:
          'advanced',
        type: 'short',
        question:
          'What do we call a reusable function whose name starts with "use" and contains React hook logic?',
        acceptedAnswers: [
          'custom hook',
          'custom hooks',
          'a custom hook',
        ],
      },
    ],
  },

  {
    id: 'ml-quiz-1',
    courseId:
      'machine-learning',
    courseTitle:
      'Machine Learning Essentials',
    title:
      'Machine Learning Basics',
    duration: '8 min',
    questions: [
      {
        id: 'mq-b1',
        difficulty:
          'beginner',
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
        id: 'mq-b2',
        difficulty:
          'beginner',
        type: 'multiple',
        question:
          'Which are examples of supervised learning tasks?',
        options: [
          'Classification',
          'Regression',
          'Random file deletion',
          'CSS styling',
        ],
        correctAnswers: [
          0,
          1,
        ],
      },
      {
        id: 'mq-b3',
        difficulty:
          'beginner',
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

      {
        id: 'mq-i1',
        difficulty:
          'intermediate',
        type: 'single',
        question:
          'What is the main purpose of a regression model?',
        options: [
          'Predict a continuous numerical target',
          'Create HTML pages',
          'Store passwords',
          'Resize images',
        ],
        correctAnswer: 0,
      },
      {
        id: 'mq-i2',
        difficulty:
          'intermediate',
        type: 'multiple',
        question:
          'Which of these can be used to evaluate a regression model?',
        options: [
          'Mean Absolute Error',
          'Mean Squared Error',
          'Screen resolution',
          'CSS specificity',
        ],
        correctAnswers: [
          0,
          1,
        ],
      },
      {
        id: 'mq-i3',
        difficulty:
          'intermediate',
        type: 'short',
        question:
          'What do we call the expected output attached to a supervised training example?',
        acceptedAnswers: [
          'label',
          'labels',
          'target',
          'target value',
        ],
      },

      {
        id: 'mq-a1',
        difficulty:
          'advanced',
        type: 'single',
        question:
          'Why should a machine-learning model be evaluated on data it did not train on?',
        options: [
          'To estimate how well it generalizes to unseen data',
          'To make the dataset larger automatically',
          'To remove all model parameters',
          'To convert regression into CSS',
        ],
        correctAnswer: 0,
      },
      {
        id: 'mq-a2',
        difficulty:
          'advanced',
        type: 'multiple',
        question:
          'Which issues can cause poor generalization?',
        options: [
          'Overfitting',
          'Biased training data',
          'Data leakage',
          'Using semantic HTML',
        ],
        correctAnswers: [
          0,
          1,
          2,
        ],
      },
      {
        id: 'mq-a3',
        difficulty:
          'advanced',
        type: 'short',
        question:
          'What is the term for a model learning the training data too closely and performing poorly on unseen data?',
        acceptedAnswers: [
          'overfitting',
          'over fitting',
        ],
      },
    ],
  },
];