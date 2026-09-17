export interface InstructorCourse {
  id: string;
  title: string;
  category: string;
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
  status: 'pending' | 'approved' | 'changes-requested';
}

export interface CourseAnalytics {
  label: string;
  value: number;
}

export const instructorCourses: InstructorCourse[] = [
  {
    id: 'instructor-react',
    title: 'React Foundations',
    category: 'Web Development',
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
    category: 'Data Science',
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
    category: 'Artificial Intelligence',
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
    category: 'Web Development',
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
    assignmentTitle: 'Build a Reusable Profile Card',
    submittedAt: 'Today, 9:42 AM',
    status: 'pending',
  },
  {
    id: 'review-2',
    studentName: 'Riya Kapoor',
    courseTitle: 'Machine Learning Essentials',
    assignmentTitle: 'Regression Model Exercise',
    submittedAt: 'Today, 8:20 AM',
    status: 'pending',
  },
  {
    id: 'review-3',
    studentName: 'Kabir Singh',
    courseTitle: 'Python for Data Science',
    assignmentTitle: 'Analyze a Small Dataset',
    submittedAt: 'Yesterday, 7:45 PM',
    status: 'pending',
  },
  {
    id: 'review-4',
    studentName: 'Meera Joshi',
    courseTitle: 'React Foundations',
    assignmentTitle: 'Build a Reusable Profile Card',
    submittedAt: 'Yesterday, 5:18 PM',
    status: 'approved',
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