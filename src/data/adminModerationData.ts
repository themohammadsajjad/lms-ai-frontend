export type ModerationContentType =
  | 'post'
  | 'comment';

export type ModerationStatus =
  | 'pending'
  | 'dismissed'
  | 'removed';

export interface ModerationReport {
  id: string;
  contentType: ModerationContentType;
  postId: string;
  replyId?: string;
  courseTitle: string;
  author: string;
  contentTitle?: string;
  content: string;
  reportedBy: string;
  reason: string;
  reportedAt: string;
  status: ModerationStatus;
}

export const moderationSeedReports:
  ModerationReport[] = [
  {
    id: 'report-1',
    contentType: 'post',
    postId: 'discussion-1',
    courseTitle:
      'React Foundations',
    author: 'Aarav Mehta',
    contentTitle:
      'When should we use props instead of state?',
    content:
      'I understand the basic definitions, but I am still confused about deciding between props and state in a real component.',
    reportedBy: 'Riya Kapoor',
    reason:
      'Reported as potentially off-topic for the lecture discussion.',
    reportedAt:
      'Today, 11:10 AM',
    status: 'pending',
  },
  {
    id: 'report-2',
    contentType: 'comment',
    postId: 'discussion-2',
    replyId: 'reply-3',
    courseTitle:
      'Machine Learning Essentials',
    author: 'Kabir Singh',
    content:
      'Think of house-price prediction: the historical prices are the labels used during training.',
    reportedBy: 'Aarav Mehta',
    reason:
      'Reported for review because the learner believes the explanation may be misleading.',
    reportedAt:
      'Today, 10:42 AM',
    status: 'pending',
  },
  {
    id: 'report-3',
    contentType: 'comment',
    postId: 'discussion-1',
    replyId: 'reply-1',
    courseTitle:
      'React Foundations',
    author: 'Neha Sharma',
    content:
      'A useful rule is that props come from the parent, while state belongs to the component and can change over time.',
    reportedBy: 'Kabir Singh',
    reason:
      'Reported for moderator review.',
    reportedAt:
      'Yesterday, 8:20 PM',
    status: 'pending',
  },
];