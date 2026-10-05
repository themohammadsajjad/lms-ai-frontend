import {
  aiQuizDrafts,
  assignmentReviews,
  instructorCourses,
  type AIQuizDraft,
  type AssignmentReview,
  type InstructorCourse,
  type PricingTier,
} from '../data/instructorData';

const COURSES_KEY =
  'lms_instructor_courses';

const REVIEWS_KEY =
  'lms_instructor_reviews';

const AI_QUIZZES_KEY =
  'lms_instructor_ai_quizzes';

export interface CreateCourseData {
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  pricingTier: PricingTier;
}

function readCourses(): InstructorCourse[] {
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

function readReviews(): AssignmentReview[] {
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

function readAIQuizDrafts(): AIQuizDraft[] {
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

export const instructorService = {
  getCourses(): InstructorCourse[] {
    return readCourses();
  },

  createCourse(
    data: CreateCourseData,
  ): InstructorCourse[] {
    const courses =
      readCourses();

    const newCourse: InstructorCourse = {
      id: crypto.randomUUID(),
      title: data.title.trim(),
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

    saveCourses(updated);

    return updated;
  },

  toggleCourseStatus(
    courseId: string,
  ): InstructorCourse[] {
    const updated =
      readCourses().map(
        (course) => {
          if (
            course.id !== courseId
          ) {
            return course;
          }

          return {
            ...course,
            status:
              course.status ===
              'published'
                ? 'draft'
                : 'published',
            updatedAt: 'Just now',
          } as InstructorCourse;
        },
      );

    saveCourses(updated);

    return updated;
  },

  getReviews(): AssignmentReview[] {
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

    saveReviews(updated);

    return updated;
  },

  getPendingReviewCount(): number {
    return readReviews().filter(
      (review) =>
        review.status ===
        'pending',
    ).length;
  },

  getAIQuizDrafts(): AIQuizDraft[] {
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
            quiz.id !== quizId
          ) {
            return quiz;
          }

          return {
            ...quiz,
            status,
          };
        },
      );

    saveAIQuizDrafts(updated);

    return updated;
  },

  getPendingAIQuizCount(): number {
    return readAIQuizDrafts().filter(
      (quiz) =>
        quiz.status ===
        'pending',
    ).length;
  },

  getTotalLearners(): number {
    return readCourses().reduce(
      (total, course) =>
        total + course.learners,
      0,
    );
  },

  getAverageCompletion(): number {
    const courses =
      readCourses();

    if (
      courses.length === 0
    ) {
      return 0;
    }

    return Math.round(
      courses.reduce(
        (total, course) =>
          total +
          course.completionRate,
        0,
      ) / courses.length,
    );
  },
};