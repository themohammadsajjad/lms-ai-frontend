export type AdminUserRole = 'student' | 'instructor' | 'admin';
export type AdminUserStatus = 'active' | 'suspended';

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  joinedAt: string;
}

export type CourseApprovalStatus =
  | 'pending'
  | 'approved'
  | 'rejected';

export interface CourseApproval {
  id: string;
  title: string;
  instructor: string;
  category: string;
  lessons: number;
  submittedAt: string;
  status: CourseApprovalStatus;
}

export interface PlatformActivity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'user' | 'course' | 'system';
}

export const platformUsers: PlatformUser[] = [
  {
    id: 'user-1',
    name: 'Aarav Mehta',
    email: 'aarav@student.com',
    role: 'student',
    status: 'active',
    joinedAt: 'Sep 10, 2026',
  },
  {
    id: 'user-2',
    name: 'Riya Kapoor',
    email: 'riya@student.com',
    role: 'student',
    status: 'active',
    joinedAt: 'Sep 11, 2026',
  },
  {
    id: 'user-3',
    name: 'Rahul Verma',
    email: 'rahul@vertexlearn.com',
    role: 'instructor',
    status: 'active',
    joinedAt: 'Aug 28, 2026',
  },
  {
    id: 'user-4',
    name: 'Neha Sharma',
    email: 'neha@vertexlearn.com',
    role: 'instructor',
    status: 'active',
    joinedAt: 'Aug 30, 2026',
  },
  {
    id: 'user-5',
    name: 'Kabir Singh',
    email: 'kabir@student.com',
    role: 'student',
    status: 'suspended',
    joinedAt: 'Sep 5, 2026',
  },
  {
    id: 'user-6',
    name: 'Aisha Khan',
    email: 'aisha@vertexlearn.com',
    role: 'instructor',
    status: 'active',
    joinedAt: 'Sep 2, 2026',
  },
];

export const courseApprovals: CourseApproval[] = [
  {
    id: 'approval-1',
    title: 'Advanced React Patterns',
    instructor: 'Arjun Mehta',
    category: 'Web Development',
    lessons: 18,
    submittedAt: 'Today, 9:35 AM',
    status: 'pending',
  },
  {
    id: 'approval-2',
    title: 'Practical Deep Learning',
    instructor: 'Rahul Verma',
    category: 'Artificial Intelligence',
    lessons: 26,
    submittedAt: 'Today, 8:10 AM',
    status: 'pending',
  },
  {
    id: 'approval-3',
    title: 'Design Systems for Products',
    instructor: 'Aisha Khan',
    category: 'Design',
    lessons: 14,
    submittedAt: 'Yesterday, 6:42 PM',
    status: 'pending',
  },
  {
    id: 'approval-4',
    title: 'SQL Analytics Essentials',
    instructor: 'Neha Sharma',
    category: 'Data Science',
    lessons: 20,
    submittedAt: 'Sep 16, 2026',
    status: 'approved',
  },
  {
    id: 'approval-5',
    title: 'Legacy JavaScript Techniques',
    instructor: 'Vikram Singh',
    category: 'Web Development',
    lessons: 12,
    submittedAt: 'Sep 15, 2026',
    status: 'rejected',
  },
];

export const platformActivity: PlatformActivity[] = [
  {
    id: 'activity-1',
    title: 'New instructor joined',
    description:
      'Aisha Khan joined the instructor workspace.',
    time: '35 minutes ago',
    type: 'user',
  },
  {
    id: 'activity-2',
    title: 'Course submitted for approval',
    description:
      'Advanced React Patterns is waiting for admin review.',
    time: '1 hour ago',
    type: 'course',
  },
  {
    id: 'activity-3',
    title: 'Platform health check completed',
    description:
      'Core learning services are operating normally.',
    time: '3 hours ago',
    type: 'system',
  },
  {
    id: 'activity-4',
    title: 'New learner registration',
    description:
      'A new student account was created successfully.',
    time: 'Yesterday',
    type: 'user',
  },
];