import {
  assignmentReviews,
  instructorCourses,
  type AssignmentReview,
  type InstructorCourse,
} from '../data/instructorData';

const COURSES_KEY = 'lms_instructor_courses';
const REVIEWS_KEY = 'lms_instructor_reviews';

function readCourses(): InstructorCourse[] {
  const stored = localStorage.getItem(COURSES_KEY);

  if (!stored) {
    localStorage.setItem(
      COURSES_KEY,
      JSON.stringify(instructorCourses),
    );

    return instructorCourses;
  }

  try {
    return JSON.parse(stored) as InstructorCourse[];
  } catch {
    localStorage.setItem(
      COURSES_KEY,
      JSON.stringify(instructorCourses),
    );

    return instructorCourses;
  }
}

function saveCourses(courses: InstructorCourse[]) {
  localStorage.setItem(
    COURSES_KEY,
    JSON.stringify(courses),
  );
}

function readReviews(): AssignmentReview[] {
  const stored = localStorage.getItem(REVIEWS_KEY);

  if (!stored) {
    localStorage.setItem(
      REVIEWS_KEY,
      JSON.stringify(assignmentReviews),
    );

    return assignmentReviews;
  }

  try {
    return JSON.parse(stored) as AssignmentReview[];
  } catch {
    localStorage.setItem(
      REVIEWS_KEY,
      JSON.stringify(assignmentReviews),
    );

    return assignmentReviews;
  }
}

function saveReviews(reviews: AssignmentReview[]) {
  localStorage.setItem(
    REVIEWS_KEY,
    JSON.stringify(reviews),
  );
}

export const instructorService = {
  getCourses(): InstructorCourse[] {
    return readCourses();
  },

  toggleCourseStatus(
    courseId: string,
  ): InstructorCourse[] {
    const updated = readCourses().map((course) => {
      if (course.id !== courseId) {
        return course;
      }

      return {
        ...course,
        status:
          course.status === 'published'
            ? 'draft'
            : 'published',
        updatedAt: 'Just now',
      } as InstructorCourse;
    });

    saveCourses(updated);

    return updated;
  },

  getReviews(): AssignmentReview[] {
    return readReviews();
  },

  updateReviewStatus(
    reviewId: string,
    status: AssignmentReview['status'],
  ): AssignmentReview[] {
    const updated = readReviews().map((review) => {
      if (review.id !== reviewId) {
        return review;
      }

      return {
        ...review,
        status,
      };
    });

    saveReviews(updated);

    return updated;
  },

  getPendingReviewCount(): number {
    return readReviews().filter(
      (review) => review.status === 'pending',
    ).length;
  },

  getTotalLearners(): number {
    return readCourses().reduce(
      (total, course) => total + course.learners,
      0,
    );
  },

  getAverageCompletion(): number {
    const courses = readCourses();

    if (courses.length === 0) {
      return 0;
    }

    return Math.round(
      courses.reduce(
        (total, course) =>
          total + course.completionRate,
        0,
      ) / courses.length,
    );
  },
};