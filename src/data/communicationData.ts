export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'assignment' | 'quiz' | 'course' | 'achievement';
  path: string;
}

export interface DiscussionReply {
  id: string;
  author: string;
  message: string;
  createdAt: string;
}

export interface DiscussionPost {
  id: string;
  courseTitle: string;
  author: string;
  title: string;
  message: string;
  createdAt: string;
  replies: DiscussionReply[];
}

export const notifications: AppNotification[] = [
  {
    id: 'notification-1',
    title: 'Assignment deadline approaching',
    message:
      'Analyze a Small Dataset is due soon. Review the task before submitting.',
    time: '20 minutes ago',
    type: 'assignment',
    path: '/assignments',
  },
  {
    id: 'notification-2',
    title: 'New quiz available',
    message:
      'Machine Learning Basics is ready. Complete the quiz to check your understanding.',
    time: '2 hours ago',
    type: 'quiz',
    path: '/quizzes',
  },
  {
    id: 'notification-3',
    title: 'Learning progress updated',
    message:
      'Your Machine Learning Essentials certificate progress is now 72%.',
    time: 'Yesterday',
    type: 'course',
    path: '/achievements',
  },
  {
    id: 'notification-4',
    title: 'Achievement unlocked',
    message:
      'You earned the AI Study Partner badge for using the AI Tutor.',
    time: '2 days ago',
    type: 'achievement',
    path: '/achievements',
  },
];

export const discussionSeedPosts: DiscussionPost[] = [
  {
    id: 'discussion-1',
    courseTitle: 'React Foundations',
    author: 'Aarav Mehta',
    title: 'When should we use props instead of state?',
    message:
      'I understand the basic definitions, but I am still confused about deciding between props and state in a real component.',
    createdAt: 'Today, 10:24 AM',
    replies: [
      {
        id: 'reply-1',
        author: 'Neha Sharma',
        message:
          'A useful rule is that props come from the parent, while state belongs to the component and can change over time.',
        createdAt: 'Today, 10:46 AM',
      },
    ],
  },
  {
    id: 'discussion-2',
    courseTitle: 'Machine Learning Essentials',
    author: 'Riya Kapoor',
    title: 'Why is regression considered supervised learning?',
    message:
      'Can someone explain how labeled data is involved when the target is a continuous value?',
    createdAt: 'Yesterday, 6:15 PM',
    replies: [
      {
        id: 'reply-2',
        author: 'Rahul Verma',
        message:
          'The continuous target value acts as the label. The model learns from input-output pairs during training.',
        createdAt: 'Yesterday, 7:02 PM',
      },
      {
        id: 'reply-3',
        author: 'Kabir Singh',
        message:
          'Think of house-price prediction: the historical prices are the labels used during training.',
        createdAt: 'Yesterday, 7:18 PM',
      },
    ],
  },
];