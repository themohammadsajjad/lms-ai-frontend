export interface Lesson {
  id: string;
  title: string;
  duration: string;
  module: string;
  videoUrl: string;
}

export const lessonsByCourse: Record<string, Lesson[]> = {
  'react-foundations': [
    {
      id: 'react-intro',
      title: 'Introduction to React',
      duration: '12 min',
      module: 'Getting Started with React',
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 'react-components',
      title: 'Understanding Components',
      duration: '18 min',
      module: 'Components and Props',
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 'react-props',
      title: 'Working with Props',
      duration: '15 min',
      module: 'Components and Props',
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 'react-state',
      title: 'State and User Events',
      duration: '20 min',
      module: 'State and Events',
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
  ],

  'python-data-science': [
    {
      id: 'python-intro',
      title: 'Python for Data Analysis',
      duration: '14 min',
      module: 'Python Essentials',
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 'numpy-basics',
      title: 'NumPy Basics',
      duration: '19 min',
      module: 'NumPy Fundamentals',
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 'pandas-intro',
      title: 'Introduction to pandas',
      duration: '22 min',
      module: 'Data Analysis with pandas',
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
  ],

  'machine-learning': [
    {
      id: 'ml-intro',
      title: 'What is Machine Learning?',
      duration: '16 min',
      module: 'Machine Learning Foundations',
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 'ml-regression',
      title: 'Understanding Regression',
      duration: '21 min',
      module: 'Regression Models',
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
  ],
};