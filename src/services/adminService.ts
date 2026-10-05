import {
  courseApprovals,
  platformUsers,
  type AdminUserRole,
  type AdminUserStatus,
  type CourseApproval,
  type CourseApprovalStatus,
  type PlatformUser,
} from '../data/adminData';
import type { InstructorCourse } from '../data/instructorData';

const USERS_KEY =
  'lms_admin_users';

const APPROVALS_KEY =
  'lms_admin_course_approvals';

const INSTRUCTOR_COURSES_KEY =
  'lms_instructor_courses';

function readUsers(): PlatformUser[] {
  const stored =
    localStorage.getItem(
      USERS_KEY,
    );

  if (!stored) {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(
        platformUsers,
      ),
    );

    return platformUsers;
  }

  try {
    return JSON.parse(
      stored,
    ) as PlatformUser[];
  } catch {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(
        platformUsers,
      ),
    );

    return platformUsers;
  }
}

function saveUsers(
  users: PlatformUser[],
) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users),
  );
}

function readApprovals():
  CourseApproval[] {
  const stored =
    localStorage.getItem(
      APPROVALS_KEY,
    );

  if (!stored) {
    localStorage.setItem(
      APPROVALS_KEY,
      JSON.stringify(
        courseApprovals,
      ),
    );

    return courseApprovals;
  }

  try {
    return JSON.parse(
      stored,
    ) as CourseApproval[];
  } catch {
    localStorage.setItem(
      APPROVALS_KEY,
      JSON.stringify(
        courseApprovals,
      ),
    );

    return courseApprovals;
  }
}

function saveApprovals(
  approvals: CourseApproval[],
) {
  localStorage.setItem(
    APPROVALS_KEY,
    JSON.stringify(approvals),
  );
}

function readInstructorCourses():
  InstructorCourse[] {
  const stored =
    localStorage.getItem(
      INSTRUCTOR_COURSES_KEY,
    );

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(
      stored,
    ) as InstructorCourse[];
  } catch {
    return [];
  }
}

function saveInstructorCourses(
  courses: InstructorCourse[],
) {
  localStorage.setItem(
    INSTRUCTOR_COURSES_KEY,
    JSON.stringify(courses),
  );
}

function syncInstructorCourseStatus(
  approval: CourseApproval,
  status: CourseApprovalStatus,
) {
  if (
    !approval.sourceCourseId
  ) {
    return;
  }

  const courses =
    readInstructorCourses();

  const updated =
    courses.map(
      (course) => {
        if (
          course.id !==
          approval.sourceCourseId
        ) {
          return course;
        }

        return {
          ...course,
          status:
            status ===
            'approved'
              ? 'published'
              : status ===
                  'rejected'
                ? 'rejected'
                : 'pending',
          updatedAt:
            'Just now',
        } as InstructorCourse;
      },
    );

  saveInstructorCourses(
    updated,
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
    const updated =
      readUsers().map(
        (user) => {
          if (
            user.id !==
            userId
          ) {
            return user;
          }

          return {
            ...user,
            status,
          };
        },
      );

    saveUsers(updated);

    return updated;
  },

  updateUserRole(
    userId: string,
    role: AdminUserRole,
  ): PlatformUser[] {
    const updated =
      readUsers().map(
        (user) => {
          if (
            user.id !==
            userId
          ) {
            return user;
          }

          return {
            ...user,
            role,
          };
        },
      );

    saveUsers(updated);

    return updated;
  },

  deleteUser(
    userId: string,
  ): PlatformUser[] {
    const updated =
      readUsers().filter(
        (user) =>
          user.id !== userId,
      );

    saveUsers(updated);

    return updated;
  },

  getCourseApprovals():
    CourseApproval[] {
    return readApprovals();
  },

  updateCourseApproval(
    courseId: string,
    status: CourseApprovalStatus,
  ): CourseApproval[] {
    const approvals =
      readApprovals();

    const selectedApproval =
      approvals.find(
        (course) =>
          course.id ===
          courseId,
      );

    const updated =
      approvals.map(
        (course) => {
          if (
            course.id !==
            courseId
          ) {
            return course;
          }

          return {
            ...course,
            status,
          };
        },
      );

    saveApprovals(
      updated,
    );

    if (
      selectedApproval
    ) {
      syncInstructorCourseStatus(
        selectedApproval,
        status,
      );
    }

    return updated;
  },

  getActiveUserCount():
    number {
    return readUsers().filter(
      (user) =>
        user.status ===
        'active',
    ).length;
  },

  getInstructorCount():
    number {
    return readUsers().filter(
      (user) =>
        user.role ===
        'instructor',
    ).length;
  },

  getPendingApprovalCount():
    number {
    return readApprovals().filter(
      (course) =>
        course.status ===
        'pending',
    ).length;
  },

  getApprovedCourseCount():
    number {
    return readApprovals().filter(
      (course) =>
        course.status ===
        'approved',
    ).length;
  },
};