import {
  courseApprovals,
  platformUsers,
  type AdminUserStatus,
  type CourseApproval,
  type CourseApprovalStatus,
  type PlatformUser,
} from '../data/adminData';

const USERS_KEY = 'lms_admin_users';
const APPROVALS_KEY = 'lms_admin_course_approvals';

function readUsers(): PlatformUser[] {
  const stored = localStorage.getItem(USERS_KEY);

  if (!stored) {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(platformUsers),
    );

    return platformUsers;
  }

  try {
    return JSON.parse(stored) as PlatformUser[];
  } catch {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(platformUsers),
    );

    return platformUsers;
  }
}

function saveUsers(users: PlatformUser[]) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users),
  );
}

function readApprovals(): CourseApproval[] {
  const stored = localStorage.getItem(APPROVALS_KEY);

  if (!stored) {
    localStorage.setItem(
      APPROVALS_KEY,
      JSON.stringify(courseApprovals),
    );

    return courseApprovals;
  }

  try {
    return JSON.parse(stored) as CourseApproval[];
  } catch {
    localStorage.setItem(
      APPROVALS_KEY,
      JSON.stringify(courseApprovals),
    );

    return courseApprovals;
  }
}

function saveApprovals(approvals: CourseApproval[]) {
  localStorage.setItem(
    APPROVALS_KEY,
    JSON.stringify(approvals),
  );
}

export const adminService = {
  getUsers(): PlatformUser[] {
    return readUsers();
  },

  updateUserStatus(
    userId: string,
    status: AdminUserStatus,
  ): PlatformUser[] {
    const updated = readUsers().map((user) => {
      if (user.id !== userId) {
        return user;
      }

      return {
        ...user,
        status,
      };
    });

    saveUsers(updated);

    return updated;
  },

  getCourseApprovals(): CourseApproval[] {
    return readApprovals();
  },

  updateCourseApproval(
    courseId: string,
    status: CourseApprovalStatus,
  ): CourseApproval[] {
    const updated = readApprovals().map((course) => {
      if (course.id !== courseId) {
        return course;
      }

      return {
        ...course,
        status,
      };
    });

    saveApprovals(updated);

    return updated;
  },

  getActiveUserCount(): number {
    return readUsers().filter(
      (user) => user.status === 'active',
    ).length;
  },

  getInstructorCount(): number {
    return readUsers().filter(
      (user) => user.role === 'instructor',
    ).length;
  },

  getPendingApprovalCount(): number {
    return readApprovals().filter(
      (course) => course.status === 'pending',
    ).length;
  },

  getApprovedCourseCount(): number {
    return readApprovals().filter(
      (course) => course.status === 'approved',
    ).length;
  },
};