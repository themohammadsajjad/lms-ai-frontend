export interface LectureAnalytics {
  id: string;
  title: string;
  viewers: number;
  completed: number;
  dropOffRate: number;
  averageWatchMinutes: number;
}

export interface CourseAnalytics {
  courseTitle: string;
  averageQuizScore: number;
  averageTimeOnTaskMinutes: number;
  totalLearners: number;
  completionRate: number;
  lectures: LectureAnalytics[];
}

export const instructorAnalyticsData: CourseAnalytics[] = [
  {
    courseTitle: 'React Foundations',
    averageQuizScore: 78,
    averageTimeOnTaskMinutes: 42,
    totalLearners: 64,
    completionRate: 72,
    lectures: [
      {
        id: 'react-lecture-1',
        title: 'Introduction to React',
        viewers: 64,
        completed: 61,
        dropOffRate: 5,
        averageWatchMinutes: 18,
      },
      {
        id: 'react-lecture-2',
        title: 'Components and Props',
        viewers: 61,
        completed: 55,
        dropOffRate: 10,
        averageWatchMinutes: 24,
      },
      {
        id: 'react-lecture-3',
        title: 'State and Events',
        viewers: 55,
        completed: 46,
        dropOffRate: 16,
        averageWatchMinutes: 31,
      },
      {
        id: 'react-lecture-4',
        title: 'React Hooks',
        viewers: 46,
        completed: 35,
        dropOffRate: 24,
        averageWatchMinutes: 37,
      },
    ],
  },
  {
    courseTitle: 'Python for Data Science',
    averageQuizScore: 84,
    averageTimeOnTaskMinutes: 51,
    totalLearners: 58,
    completionRate: 76,
    lectures: [
      {
        id: 'python-lecture-1',
        title: 'Python Data Structures',
        viewers: 58,
        completed: 55,
        dropOffRate: 5,
        averageWatchMinutes: 26,
      },
      {
        id: 'python-lecture-2',
        title: 'NumPy Fundamentals',
        viewers: 55,
        completed: 49,
        dropOffRate: 11,
        averageWatchMinutes: 34,
      },
      {
        id: 'python-lecture-3',
        title: 'Working with pandas',
        viewers: 49,
        completed: 41,
        dropOffRate: 16,
        averageWatchMinutes: 43,
      },
    ],
  },
  {
    courseTitle: 'Machine Learning Essentials',
    averageQuizScore: 73,
    averageTimeOnTaskMinutes: 63,
    totalLearners: 42,
    completionRate: 58,
    lectures: [
      {
        id: 'ml-lecture-1',
        title: 'Introduction to Machine Learning',
        viewers: 42,
        completed: 39,
        dropOffRate: 7,
        averageWatchMinutes: 32,
      },
      {
        id: 'ml-lecture-2',
        title: 'Regression Fundamentals',
        viewers: 39,
        completed: 30,
        dropOffRate: 23,
        averageWatchMinutes: 46,
      },
      {
        id: 'ml-lecture-3',
        title: 'Model Evaluation',
        viewers: 30,
        completed: 21,
        dropOffRate: 30,
        averageWatchMinutes: 54,
      },
    ],
  },
  {
    courseTitle: 'TypeScript Essentials',
    averageQuizScore: 81,
    averageTimeOnTaskMinutes: 39,
    totalLearners: 22,
    completionRate: 66,
    lectures: [
      {
        id: 'ts-lecture-1',
        title: 'TypeScript Basics',
        viewers: 22,
        completed: 21,
        dropOffRate: 5,
        averageWatchMinutes: 20,
      },
      {
        id: 'ts-lecture-2',
        title: 'Types and Interfaces',
        viewers: 21,
        completed: 18,
        dropOffRate: 14,
        averageWatchMinutes: 28,
      },
      {
        id: 'ts-lecture-3',
        title: 'Generics and Utility Types',
        viewers: 18,
        completed: 14,
        dropOffRate: 22,
        averageWatchMinutes: 35,
      },
    ],
  },
];