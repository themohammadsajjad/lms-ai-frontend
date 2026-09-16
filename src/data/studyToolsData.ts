export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface StudyTopic {
  title: string;
  status: 'strong' | 'review' | 'next';
  note: string;
}

export interface StudyResource {
  courseId: string;
  courseTitle: string;
  summary: string[];
  flashcards: Flashcard[];
  topics: StudyTopic[];
}

export const studyResources: StudyResource[] = [
  {
    courseId: 'react-foundations',
    courseTitle: 'React Foundations',
    summary: [
      'React applications are built using reusable UI components.',
      'Props allow data to move from parent components to child components.',
      'State stores values that can change during user interaction.',
      'Hooks such as useState help functional components manage state.',
    ],
    flashcards: [
      {
        id: 'react-card-1',
        front: 'What is a React component?',
        back: 'A reusable and independent piece of user interface.',
      },
      {
        id: 'react-card-2',
        front: 'What are props?',
        back: 'Values passed from a parent component to a child component.',
      },
      {
        id: 'react-card-3',
        front: 'What is state?',
        back: 'Data managed inside a component that can change over time.',
      },
    ],
    topics: [
      {
        title: 'Components and Props',
        status: 'strong',
        note: 'You have completed the main lessons in this topic.',
      },
      {
        title: 'State and Events',
        status: 'review',
        note: 'Review event handling and state updates.',
      },
      {
        title: 'Hooks and Reusability',
        status: 'next',
        note: 'Recommended as your next learning focus.',
      },
    ],
  },

  {
    courseId: 'python-data-science',
    courseTitle: 'Python for Data Science',
    summary: [
      'Python provides a flexible foundation for data analysis.',
      'NumPy offers efficient arrays and numerical operations.',
      'pandas provides DataFrames for working with structured datasets.',
      'Cleaning and transforming data are important steps before analysis.',
    ],
    flashcards: [
      {
        id: 'python-card-1',
        front: 'What is a DataFrame?',
        back: 'A two-dimensional labeled data structure provided by pandas.',
      },
      {
        id: 'python-card-2',
        front: 'What is NumPy mainly used for?',
        back: 'Efficient numerical computing and multidimensional arrays.',
      },
      {
        id: 'python-card-3',
        front: 'Why clean data?',
        back: 'To improve consistency and reliability before analysis.',
      },
    ],
    topics: [
      {
        title: 'Python Essentials',
        status: 'strong',
        note: 'Core Python concepts are progressing well.',
      },
      {
        title: 'NumPy Fundamentals',
        status: 'review',
        note: 'Spend more time practicing array operations.',
      },
      {
        title: 'Data Analysis with pandas',
        status: 'next',
        note: 'Continue with filtering and transformation exercises.',
      },
    ],
  },

  {
    courseId: 'machine-learning',
    courseTitle: 'Machine Learning Essentials',
    summary: [
      'Machine learning models learn patterns from data.',
      'Supervised learning uses labeled examples during training.',
      'Regression predicts continuous numerical values.',
      'Evaluation metrics help measure how well a trained model performs.',
    ],
    flashcards: [
      {
        id: 'ml-card-1',
        front: 'What is supervised learning?',
        back: 'Learning from labeled examples containing inputs and expected outputs.',
      },
      {
        id: 'ml-card-2',
        front: 'What does regression predict?',
        back: 'Continuous numerical values.',
      },
      {
        id: 'ml-card-3',
        front: 'Why evaluate a model?',
        back: 'To understand how accurately and reliably the model performs.',
      },
    ],
    topics: [
      {
        title: 'Machine Learning Foundations',
        status: 'strong',
        note: 'Your completed lessons show good progress here.',
      },
      {
        title: 'Regression Models',
        status: 'review',
        note: 'Review regression concepts before the next assessment.',
      },
      {
        title: 'Model Evaluation',
        status: 'next',
        note: 'Recommended next topic based on your course path.',
      },
    ],
  },
];