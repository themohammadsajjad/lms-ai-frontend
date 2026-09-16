export type TutorMode = 'beginner' | 'standard' | 'advanced';

export interface TutorSource {
  id: string;
  title: string;
  section: string;
}

export interface TutorKnowledge {
  courseId: string;
  courseTitle: string;
  suggestions: string[];
  sources: TutorSource[];
}

export const tutorKnowledge: TutorKnowledge[] = [
  {
    courseId: 'react-foundations',
    courseTitle: 'React Foundations',
    suggestions: [
      'What is a React component?',
      'Explain props with an example',
      'What is the difference between props and state?',
      'When should I use useState?',
    ],
    sources: [
      {
        id: 'react-source-1',
        title: 'React Foundations',
        section: 'Components and Props',
      },
      {
        id: 'react-source-2',
        title: 'React Foundations',
        section: 'State and Events',
      },
      {
        id: 'react-source-3',
        title: 'React Foundations',
        section: 'Hooks and Reusability',
      },
    ],
  },
  {
    courseId: 'python-data-science',
    courseTitle: 'Python for Data Science',
    suggestions: [
      'What is pandas used for?',
      'Explain NumPy arrays',
      'How do I clean missing data?',
      'When should I use a DataFrame?',
    ],
    sources: [
      {
        id: 'python-source-1',
        title: 'Python for Data Science',
        section: 'Python Essentials',
      },
      {
        id: 'python-source-2',
        title: 'Python for Data Science',
        section: 'NumPy Fundamentals',
      },
      {
        id: 'python-source-3',
        title: 'Python for Data Science',
        section: 'Data Analysis with pandas',
      },
    ],
  },
  {
    courseId: 'machine-learning',
    courseTitle: 'Machine Learning Essentials',
    suggestions: [
      'What is supervised learning?',
      'Explain regression simply',
      'How is model performance evaluated?',
      'What is the difference between regression and classification?',
    ],
    sources: [
      {
        id: 'ml-source-1',
        title: 'Machine Learning Essentials',
        section: 'Machine Learning Foundations',
      },
      {
        id: 'ml-source-2',
        title: 'Machine Learning Essentials',
        section: 'Regression Models',
      },
      {
        id: 'ml-source-3',
        title: 'Machine Learning Essentials',
        section: 'Model Evaluation',
      },
    ],
  },
];