import {
  courseApprovals,
  type CourseApproval,
} from '../data/adminData';
import {
  aiQuizDrafts,
  assignmentReviews,
  instructorCourses,
  type AIQuizDraft,
  type AssignmentReview,
  type InstructorCourse,
  type PricingTier,
} from '../data/instructorData';
import { authService } from './authService';

const COURSES_KEY =
  'lms_instructor_courses';

const REVIEWS_KEY =
  'lms_instructor_reviews';

const AI_QUIZZES_KEY =
  'lms_instructor_ai_quizzes';

const APPROVALS_KEY =
  'lms_admin_course_approvals';

export interface CreateCourseData {
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  pricingTier: PricingTier;
}

function readCourses():
  InstructorCourse[] {
  const stored =
    localStorage.getItem(
      COURSES_KEY,
    );

  if (!stored) {
    localStorage.setItem(
      COURSES_KEY,
      JSON.stringify(
        instructorCourses,
      ),
    );

    return instructorCourses;
  }

  try {
    return JSON.parse(
      stored,
    ) as InstructorCourse[];
  } catch {
    localStorage.setItem(
      COURSES_KEY,
      JSON.stringify(
        instructorCourses,
      ),
    );

    return instructorCourses;
  }
}

function saveCourses(
  courses: InstructorCourse[],
) {
  localStorage.setItem(
    COURSES_KEY,
    JSON.stringify(courses),
  );
}

function readCourseApprovals():
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

function saveCourseApprovals(
  approvals: CourseApproval[],
) {
  localStorage.setItem(
    APPROVALS_KEY,
    JSON.stringify(approvals),
  );
}

function readReviews():
  AssignmentReview[] {
  const stored =
    localStorage.getItem(
      REVIEWS_KEY,
    );

  if (!stored) {
    localStorage.setItem(
      REVIEWS_KEY,
      JSON.stringify(
        assignmentReviews,
      ),
    );

    return assignmentReviews;
  }

  try {
    return JSON.parse(
      stored,
    ) as AssignmentReview[];
  } catch {
    localStorage.setItem(
      REVIEWS_KEY,
      JSON.stringify(
        assignmentReviews,
      ),
    );

    return assignmentReviews;
  }
}

function saveReviews(
  reviews: AssignmentReview[],
) {
  localStorage.setItem(
    REVIEWS_KEY,
    JSON.stringify(reviews),
  );
}

function readAIQuizDrafts():
  AIQuizDraft[] {
  const stored =
    localStorage.getItem(
      AI_QUIZZES_KEY,
    );

  if (!stored) {
    localStorage.setItem(
      AI_QUIZZES_KEY,
      JSON.stringify(
        aiQuizDrafts,
      ),
    );

    return aiQuizDrafts;
  }

  try {
    return JSON.parse(
      stored,
    ) as AIQuizDraft[];
  } catch {
    localStorage.setItem(
      AI_QUIZZES_KEY,
      JSON.stringify(
        aiQuizDrafts,
      ),
    );

    return aiQuizDrafts;
  }
}

function saveAIQuizDrafts(
  quizzes: AIQuizDraft[],
) {
  localStorage.setItem(
    AI_QUIZZES_KEY,
    JSON.stringify(quizzes),
  );
}

function createOrUpdateApproval(
  course: InstructorCourse,
) {
  const approvals =
    readCourseApprovals();

  const currentUser =
    authService.getCurrentUser();

  const instructorName =
    currentUser?.role ===
    'instructor'
      ? currentUser.name
      : 'Instructor';

  const existing =
    approvals.find(
      (approval) =>
        approval.sourceCourseId ===
        course.id,
    );

  if (existing) {
    const updated =
      approvals.map(
        (approval) => {
          if (
            approval.sourceCourseId !==
            course.id
          ) {
            return approval;
          }

          return {
            ...approval,
            title:
              course.title,
            instructor:
              instructorName,
            category:
              course.category,
            lessons:
              course.lessons,
            submittedAt:
              new Date().toLocaleString(),
            status:
              'pending' as const,
          };
        },
      );

    saveCourseApprovals(
      updated,
    );

    return;
  }

  const newApproval:
    CourseApproval = {
    id: crypto.randomUUID(),
    sourceCourseId:
      course.id,
    title:
      course.title,
    instructor:
      instructorName,
    category:
      course.category,
    lessons:
      course.lessons,
    submittedAt:
      new Date().toLocaleString(),
    status: 'pending',
  };

  saveCourseApprovals([
    newApproval,
    ...approvals,
  ]);
}

export const instructorService = {
  getCourses():
    InstructorCourse[] {
    return readCourses();
  },

  createCourse(
    data: CreateCourseData,
  ): InstructorCourse[] {
    const courses =
      readCourses();

    const newCourse:
      InstructorCourse = {
      id: crypto.randomUUID(),
      title:
        data.title.trim(),
      description:
        data.description.trim(),
      category:
        data.category.trim(),
      thumbnail:
        data.thumbnail.trim(),
      pricingTier:
        data.pricingTier,
      learners: 0,
      lessons: 0,
      completionRate: 0,
      rating: 0,
      status: 'draft',
      updatedAt: 'Just now',
    };

    const updated = [
      newCourse,
      ...courses,
    ];

    saveCourses(
      updated,
    );

    return updated;
  },

  submitCourseForApproval(
    courseId: string,
  ): InstructorCourse[] {
    const courses =
      readCourses();

    const selectedCourse =
      courses.find(
        (course) =>
          course.id ===
          courseId,
      );

    if (
      !selectedCourse ||
      selectedCourse.status ===
        'pending' ||
      selectedCourse.status ===
        'published'
    ) {
      return courses;
    }

    createOrUpdateApproval(
      selectedCourse,
    );

    const updated =
      courses.map(
        (course) => {
          if (
            course.id !==
            courseId
          ) {
            return course;
          }

          return {
            ...course,
            status:
              'pending',
            updatedAt:
              'Just now',
          } as InstructorCourse;
        },
      );

    saveCourses(
      updated,
    );

    return updated;
  },

  moveCourseToDraft(
    courseId: string,
  ): InstructorCourse[] {
    const updated =
      readCourses().map(
        (course) => {
          if (
            course.id !==
            courseId
          ) {
            return course;
          }

          if (
            course.status !==
            'published'
          ) {
            return course;
          }

          return {
            ...course,
            status:
              'draft',
            updatedAt:
              'Just now',
          } as InstructorCourse;
        },
      );

    saveCourses(
      updated,
    );

    return updated;
  },

  /*
   * Temporary compatibility for the
   * current InstructorDashboard UI.
   * The next step replaces the old
   * direct-publish button labels.
   */
  toggleCourseStatus(
    courseId: string,
  ): InstructorCourse[] {
    const course =
      readCourses().find(
        (item) =>
          item.id ===
          courseId,
      );

    if (!course) {
      return readCourses();
    }

    if (
      course.status ===
      'published'
    ) {
      return this.moveCourseToDraft(
        courseId,
      );
    }

    if (
      course.status ===
        'draft' ||
      course.status ===
        'rejected'
    ) {
      return this.submitCourseForApproval(
        courseId,
      );
    }

    return readCourses();
  },

  getReviews():
    AssignmentReview[] {
    return readReviews();
  },

  updateReviewStatus(
    reviewId: string,
    status:
      AssignmentReview['status'],
  ): AssignmentReview[] {
    const updated =
      readReviews().map(
        (review) => {
          if (
            review.id !==
            reviewId
          ) {
            return review;
          }

          return {
            ...review,
            status,
          };
        },
      );

    saveReviews(
      updated,
    );

    return updated;
  },

  getPendingReviewCount():
    number {
    return readReviews().filter(
      (review) =>
        review.status ===
        'pending',
    ).length;
  },

  getAIQuizDrafts():
    AIQuizDraft[] {
    return readAIQuizDrafts();
  },

  updateAIQuizStatus(
    quizId: string,
    status:
      AIQuizDraft['status'],
  ): AIQuizDraft[] {
    const updated =
      readAIQuizDrafts().map(
        (quiz) => {
          if (
            quiz.id !==
            quizId
          ) {
            return quiz;
          }

          return {
            ...quiz,
            status,
          };
        },
      );

    saveAIQuizDrafts(
      updated,
    );

    return updated;
  },

  getPendingAIQuizCount():
    number {
    return readAIQuizDrafts().filter(
      (quiz) =>
        quiz.status ===
        'pending',
    ).length;
  },

  getTotalLearners():
    number {
    return readCourses().reduce(
      (
        total,
        course,
      ) =>
        total +
        course.learners,
      0,
    );
  },

  getAverageCompletion():
    number {
    const courses =
      readCourses();

    if (
      courses.length ===
      0
    ) {
      return 0;
    }

    return Math.round(
      courses.reduce(
        (
          total,
          course,
        ) =>
          total +
          course.completionRate,
        0,
      ) /
        courses.length,
    );
  },
};