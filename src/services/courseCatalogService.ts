import {
  courses as staticCourses,
  type Course,
  type CourseModule,
} from '../data/mockData';
import type {
  CourseApproval,
} from '../data/adminData';
import type {
  InstructorCourse,
} from '../data/instructorData';

const INSTRUCTOR_COURSES_KEY =
  'lms_instructor_courses';

const APPROVALS_KEY =
  'lms_admin_course_approvals';

const MATERIALS_KEY =
  'lms_instructor_materials';

interface StoredMaterial {
  courseId: string;
  moduleName?: string;
  lectureName?: string;
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

function readApprovals():
  CourseApproval[] {
  const stored =
    localStorage.getItem(
      APPROVALS_KEY,
    );

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(
      stored,
    ) as CourseApproval[];
  } catch {
    return [];
  }
}

function readMaterials():
  StoredMaterial[] {
  const stored =
    localStorage.getItem(
      MATERIALS_KEY,
    );

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(
      stored,
    ) as StoredMaterial[];
  } catch {
    return [];
  }
}

function buildModules(
  courseId: string,
): CourseModule[] {
  const materials =
    readMaterials().filter(
      (material) =>
        material.courseId ===
        courseId,
    );

  const moduleNames =
    Array.from(
      new Set(
        materials
          .map(
            (material) =>
              material.moduleName?.trim(),
          )
          .filter(
            (
              value,
            ): value is string =>
              Boolean(value),
          ),
      ),
    );

  return moduleNames.map(
    (
      moduleName,
      index,
    ) => {
      const lectureNames =
        new Set(
          materials
            .filter(
              (material) =>
                material.moduleName ===
                moduleName,
            )
            .map(
              (material) =>
                material.lectureName?.trim(),
            )
            .filter(Boolean),
        );

      return {
        id: `${courseId}-module-${index + 1}`,
        title: moduleName,
        lessons:
          lectureNames.size,
      };
    },
  );
}

function getInstructorName(
  courseId: string,
) {
  const approval =
    readApprovals().find(
      (item) =>
        item.sourceCourseId ===
          courseId &&
        item.status ===
          'approved',
    );

  return (
    approval?.instructor ??
    'VertexLearn Instructor'
  );
}

function toCatalogCourse(
  course: InstructorCourse,
): Course {
  const modules =
    buildModules(
      course.id,
    );

  const materialLessonCount =
    modules.reduce(
      (
        total,
        module,
      ) =>
        total +
        module.lessons,
      0,
    );

  const lessonCount =
    materialLessonCount > 0
      ? materialLessonCount
      : course.lessons;

  return {
    id: course.id,
    title: course.title,
    category:
      course.category,
    instructor:
      getInstructorName(
        course.id,
      ),
    level: 'Beginner',
    progress: 0,
    lessons:
      lessonCount,
    duration:
      lessonCount > 0
        ? 'Self-paced'
        : 'Coming soon',
    enrolled: false,
    description:
      course.description ??
      'Explore this instructor-created course on VertexLearn.',
    rating:
      course.rating,
    students:
      course.learners,
    modules,
  };
}

function getApprovedInstructorCourses():
  Course[] {
  const approvals =
    readApprovals();

  const approvedCourseIds =
    new Set(
      approvals
        .filter(
          (approval) =>
            approval.status ===
              'approved' &&
            approval.sourceCourseId,
        )
        .map(
          (approval) =>
            approval.sourceCourseId as string,
        ),
    );

  const staticTitles =
    new Set(
      staticCourses.map(
        (course) =>
          course.title
            .trim()
            .toLowerCase(),
      ),
    );

  return readInstructorCourses()
    .filter(
      (course) =>
        course.status ===
          'published' &&
        approvedCourseIds.has(
          course.id,
        ),
    )
    .filter(
      (course) =>
        !staticTitles.has(
          course.title
            .trim()
            .toLowerCase(),
        ),
    )
    .map(
      toCatalogCourse,
    );
}

export const courseCatalogService = {
  getCatalogCourses():
    Course[] {
    return [
      ...staticCourses,
      ...getApprovedInstructorCourses(),
    ];
  },

  getCourseById(
    courseId: string,
  ): Course | undefined {
    return this
      .getCatalogCourses()
      .find(
        (course) =>
          course.id ===
          courseId,
      );
  },
};