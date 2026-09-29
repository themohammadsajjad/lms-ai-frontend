export type InstructorAssignmentStatus =
  | 'draft'
  | 'published';

export interface InstructorAssignment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  rubric: string;
  status: InstructorAssignmentStatus;
  createdAt: string;
}

export interface CreateInstructorAssignmentData {
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  rubric: string;
}

const ASSIGNMENTS_KEY =
  'lms_instructor_created_assignments';

function readAssignments(): InstructorAssignment[] {
  const stored =
    localStorage.getItem(
      ASSIGNMENTS_KEY,
    );

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(
      stored,
    ) as InstructorAssignment[];
  } catch {
    return [];
  }
}

function saveAssignments(
  assignments: InstructorAssignment[],
) {
  localStorage.setItem(
    ASSIGNMENTS_KEY,
    JSON.stringify(assignments),
  );
}

export const instructorAssignmentService = {
  getAssignments(): InstructorAssignment[] {
    return readAssignments();
  },

  getAssignmentsForCourse(
    courseId: string,
  ): InstructorAssignment[] {
    return readAssignments().filter(
      (assignment) =>
        assignment.courseId ===
        courseId,
    );
  },

  createAssignment(
    data: CreateInstructorAssignmentData,
  ): InstructorAssignment[] {
    const assignments =
      readAssignments();

    const newAssignment: InstructorAssignment = {
      id: crypto.randomUUID(),
      courseId:
        data.courseId,
      courseTitle:
        data.courseTitle,
      title:
        data.title.trim(),
      description:
        data.description.trim(),
      dueDate:
        data.dueDate,
      points:
        data.points,
      rubric:
        data.rubric.trim(),
      status: 'draft',
      createdAt:
        new Date().toISOString(),
    };

    const updated: InstructorAssignment[] = [
      newAssignment,
      ...assignments,
    ];

    saveAssignments(updated);

    return updated;
  },

  toggleStatus(
    assignmentId: string,
  ): InstructorAssignment[] {
    const assignments =
      readAssignments();

    const updated: InstructorAssignment[] =
      assignments.map(
        (
          assignment,
        ): InstructorAssignment => {
          if (
            assignment.id !==
            assignmentId
          ) {
            return assignment;
          }

          const nextStatus: InstructorAssignmentStatus =
            assignment.status ===
            'draft'
              ? 'published'
              : 'draft';

          return {
            ...assignment,
            status: nextStatus,
          };
        },
      );

    saveAssignments(updated);

    return updated;
  },

  deleteAssignment(
    assignmentId: string,
  ): InstructorAssignment[] {
    const updated: InstructorAssignment[] =
      readAssignments().filter(
        (assignment) =>
          assignment.id !==
          assignmentId,
      );

    saveAssignments(updated);

    return updated;
  },
};