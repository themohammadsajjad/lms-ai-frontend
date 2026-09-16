import type { Course } from '../data/mockData';

const ENROLLMENT_KEY = 'lms_extra_enrollments';

function getExtraEnrollments(): string[] {
  const stored = localStorage.getItem(ENROLLMENT_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as string[];
  } catch {
    localStorage.removeItem(ENROLLMENT_KEY);
    return [];
  }
}

export const courseService = {
  isEnrolled(course: Course): boolean {
    return course.enrolled || getExtraEnrollments().includes(course.id);
  },

  enroll(courseId: string): void {
    const current = getExtraEnrollments();

    if (current.includes(courseId)) {
      return;
    }

    localStorage.setItem(
      ENROLLMENT_KEY,
      JSON.stringify([...current, courseId]),
    );
  },
};