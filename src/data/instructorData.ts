export type PricingTier =
  | 'Free'
  | 'Standard'
  | 'Premium';

export interface InstructorCourse {
  id: string;
  title: string;
  description?: string;
  category: string;
  thumbnail?: string;
  pricingTier?: PricingTier;
  learners: number;
  lessons: number;
  completionRate: number;
  rating: number;
  status: 'published' | 'draft';
  updatedAt: string;
}

export interface AssignmentReview {
  id: string;
  studentName: string;
  courseTitle: string;
  assignmentTitle: string;
  submittedAt: string;
  status:
    | 'pending'
    | 'approved'
    | 'changes-requested';
}

export interface CourseAnalytics {
  label: string;
  value: number;
}

export interface AIQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface AIQuizDraft {
  id: string;
  courseTitle: string;
  lectureTitle: string;
  title: string;
  generatedAt: string;
  status:
    | 'pending'
    | 'approved'
    | 'changes-requested';
  questions: AIQuizQuestion[];
}

export const instructorCourses: InstructorCourse[] = [
  {
    id: 'instructor-react',
    title: 'React Foundations',
    description:
      'Build a strong foundation in React components, props, state and reusable UI development.',
    category: 'Web Development',
    pricingTier: 'Standard',
    learners: 68,
    lessons: 24,
    completionRate: 78,
    rating: 4.8,
    status: 'published',
    updatedAt: 'Sep 16, 2026',
  },
  {
    id: 'instructor-python',
    title: 'Python for Data Science',
    description:
      'Learn Python, NumPy and pandas for practical data analysis workflows.',
    category: 'Data Science',
    pricingTier: 'Premium',
    learners: 51,
    lessons: 32,
    completionRate: 71,
    rating: 4.7,
    status: 'published',
    updatedAt: 'Sep 15, 2026',
  },
  {
    id: 'instructor-ml',
    title: 'Machine Learning Essentials',
    description:
      'Understand supervised learning, regression and model evaluation fundamentals.',
    category: 'Artificial Intelligence',
    pricingTier: 'Premium',
    learners: 43,
    lessons: 28,
    completionRate: 66,
    rating: 4.9,
    status: 'published',
    updatedAt: 'Sep 16, 2026',
  },
  {
    id: 'instructor-typescript',
    title: 'TypeScript for Modern Apps',
    description:
      'Use TypeScript to build safer and more maintainable modern web applications.',
    category: 'Web Development',
    pricingTier: 'Standard',
    learners: 24,
    lessons: 22,
    completionRate: 58,
    rating: 4.6,
    status: 'draft',
    updatedAt: 'Sep 17, 2026',
  },
];

export const assignmentReviews: AssignmentReview[] = [
  {
    id: 'review-1',
    studentName: 'Aarav Mehta',
    courseTitle: 'React Foundations',
    assignmentTitle:
      'Build a Reusable Profile Card',
    submittedAt: 'Today, 9:42 AM',
    status: 'pending',
  },
  {
    id: 'review-2',
    studentName: 'Riya Kapoor',
    courseTitle:
      'Machine Learning Essentials',
    assignmentTitle:
      'Regression Model Exercise',
    submittedAt: 'Today, 8:20 AM',
    status: 'pending',
  },
  {
    id: 'review-3',
    studentName: 'Kabir Singh',
    courseTitle:
      'Python for Data Science',
    assignmentTitle:
      'Analyze a Small Dataset',
    submittedAt: 'Yesterday, 7:45 PM',
    status: 'pending',
  },
  {
    id: 'review-4',
    studentName: 'Meera Joshi',
    courseTitle: 'React Foundations',
    assignmentTitle:
      'Build a Reusable Profile Card',
    submittedAt: 'Yesterday, 5:18 PM',
    status: 'approved',
  },
];

export const aiQuizDrafts: AIQuizDraft[] = [
  {
    id: 'ai-quiz-react-hooks',
    courseTitle: 'React Foundations',
    lectureTitle:
      'Hooks and Reusability',
    title:
      'React Hooks Knowledge Check',
    generatedAt:
      'Sep 17, 2026 · 10:30 AM',
    status: 'pending',
    questions: [
      {
        id: 'ai-rq-1',
        question:
          'Which React hook is commonly used to manage local component state?',
        options: [
          'useState',
          'useEffect',
          'useRoute',
          'useServer',
        ],
        correctAnswer: 0,
      },
      {
        id: 'ai-rq-2',
        question:
          'What is the main purpose of useEffect?',
        options: [
          'Handle side effects',
          'Create CSS styles',
          'Define database tables',
          'Compile TypeScript',
        ],
        correctAnswer: 0,
      },
      {
        id: 'ai-rq-3',
        question:
          'Custom hooks are mainly used to:',
        options: [
          'Reuse stateful logic',
          'Replace React components',
          'Create HTML files',
          'Configure databases',
        ],
        correctAnswer: 0,
      },
      {
        id: 'ai-rq-4',
        question:
          'A React hook should normally be called:',
        options: [
          'At the top level of a component or custom hook',
          'Inside every loop',
          'Inside random conditions only',
          'Outside JavaScript files',
        ],
        correctAnswer: 0,
      },
      {
        id: 'ai-rq-5',
        question:
          'Which naming convention is used for custom hooks?',
        options: [
          'Start the function name with use',
          'End the name with Component',
          'Start with create',
          'Use only uppercase letters',
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 'ai-quiz-python-pandas',
    courseTitle:
      'Python for Data Science',
    lectureTitle:
      'Data Analysis with pandas',
    title:
      'pandas Data Analysis Review',
    generatedAt:
      'Sep 17, 2026 · 9:15 AM',
    status: 'pending',
    questions: [
      {
        id: 'ai-pq-1',
        question:
          'Which pandas structure is commonly used for tabular data?',
        options: [
          'DataFrame',
          'Canvas',
          'Router',
          'Component',
        ],
        correctAnswer: 0,
      },
      {
        id: 'ai-pq-2',
        question:
          'Which operation is commonly part of data cleaning?',
        options: [
          'Handling missing values',
          'Changing monitor brightness',
          'Installing a browser',
          'Editing CSS colors',
        ],
        correctAnswer: 0,
      },
      {
        id: 'ai-pq-3',
        question:
          'A DataFrame contains data arranged mainly in:',
        options: [
          'Rows and columns',
          'Only images',
          'Audio tracks',
          'Browser tabs',
        ],
        correctAnswer: 0,
      },
      {
        id: 'ai-pq-4',
        question:
          'Which library often works alongside pandas for numerical arrays?',
        options: [
          'NumPy',
          'React',
          'Express',
          'Vite',
        ],
        correctAnswer: 0,
      },
      {
        id: 'ai-pq-5',
        question:
          'Why should a dataset be inspected before analysis?',
        options: [
          'To understand its structure and quality',
          'To increase screen resolution',
          'To create CSS classes',
          'To install packages',
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 'ai-quiz-ml-regression',
    courseTitle:
      'Machine Learning Essentials',
    lectureTitle:
      'Regression Models',
    title:
      'Regression Concepts Quiz',
    generatedAt:
      'Sep 16, 2026 · 4:40 PM',
    status: 'approved',
    questions: [
      {
        id: 'ai-mq-1',
        question:
          'Regression is commonly used to predict:',
        options: [
          'Continuous numerical values',
          'Only file names',
          'CSS selectors',
          'Passwords',
        ],
        correctAnswer: 0,
      },
      {
        id: 'ai-mq-2',
        question:
          'Which metric can be used to evaluate regression?',
        options: [
          'Mean Absolute Error',
          'Screen width',
          'Font size',
          'HTTP port',
        ],
        correctAnswer: 0,
      },
      {
        id: 'ai-mq-3',
        question:
          'Supervised learning requires training examples with:',
        options: [
          'Labels or expected outputs',
          'No input data',
          'Only HTML',
          'Only video files',
        ],
        correctAnswer: 0,
      },
      {
        id: 'ai-mq-4',
        question:
          'A model prediction is compared against actual values mainly to:',
        options: [
          'Measure model performance',
          'Change the browser theme',
          'Create a component',
          'Start a server',
        ],
        correctAnswer: 0,
      },
      {
        id: 'ai-mq-5',
        question:
          'Regression belongs to which broad learning category?',
        options: [
          'Supervised learning',
          'CSS styling',
          'Database indexing',
          'UI routing',
        ],
        correctAnswer: 0,
      },
    ],
  },
];

export const weeklyAnalytics: CourseAnalytics[] = [
  {
    label: 'Mon',
    value: 58,
  },
  {
    label: 'Tue',
    value: 72,
  },
  {
    label: 'Wed',
    value: 64,
  },
  {
    label: 'Thu',
    value: 81,
  },
  {
    label: 'Fri',
    value: 74,
  },
  {
    label: 'Sat',
    value: 88,
  },
  {
    label: 'Sun',
    value: 79,
  },
];