const ASSIGNMENT_KEY = 'lms_assignment_submissions';
const QUIZ_KEY = 'lms_quiz_attempts';

export interface AssignmentSubmission {
  assignmentId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  submittedAt: string;
}

interface QuizAttempt {
  quizId: string;
  score: number;
  total: number;
  completedAt: string;
}

function readAssignmentSubmissions(): AssignmentSubmission[] {
  const stored = localStorage.getItem(
    ASSIGNMENT_KEY,
  );

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);

    // Supports submissions saved by the older version.
    if (
      Array.isArray(parsed) &&
      parsed.every(
        (item) => typeof item === 'string',
      )
    ) {
      return parsed.map(
        (assignmentId: string) => ({
          assignmentId,
          fileName: 'Previously submitted file',
          fileSize: 0,
          fileType: '',
          submittedAt: '',
        }),
      );
    }

    return parsed as AssignmentSubmission[];
  } catch {
    return [];
  }
}

function readQuizAttempts(): QuizAttempt[] {
  const stored =
    localStorage.getItem(QUIZ_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(
      stored,
    ) as QuizAttempt[];
  } catch {
    return [];
  }
}

export const assessmentService = {
  isAssignmentSubmitted(
    assignmentId: string,
  ): boolean {
    return readAssignmentSubmissions().some(
      (submission) =>
        submission.assignmentId ===
        assignmentId,
    );
  },

  getAssignmentSubmission(
    assignmentId: string,
  ): AssignmentSubmission | null {
    return (
      readAssignmentSubmissions().find(
        (submission) =>
          submission.assignmentId ===
          assignmentId,
      ) ?? null
    );
  },

  submitAssignment(
    assignmentId: string,
    file: File,
  ): void {
    const submissions =
      readAssignmentSubmissions();

    const nextSubmission: AssignmentSubmission =
      {
        assignmentId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        submittedAt:
          new Date().toISOString(),
      };

    const updated = [
      ...submissions.filter(
        (submission) =>
          submission.assignmentId !==
          assignmentId,
      ),
      nextSubmission,
    ];

    localStorage.setItem(
      ASSIGNMENT_KEY,
      JSON.stringify(updated),
    );
  },

  saveQuizAttempt(
    quizId: string,
    score: number,
    total: number,
  ): void {
    const attempts =
      readQuizAttempts();

    const nextAttempt: QuizAttempt = {
      quizId,
      score,
      total,
      completedAt:
        new Date().toISOString(),
    };

    const updated = [
      ...attempts.filter(
        (attempt) =>
          attempt.quizId !== quizId,
      ),
      nextAttempt,
    ];

    localStorage.setItem(
      QUIZ_KEY,
      JSON.stringify(updated),
    );
  },

  getQuizAttempt(
    quizId: string,
  ): QuizAttempt | null {
    return (
      readQuizAttempts().find(
        (attempt) =>
          attempt.quizId === quizId,
      ) ?? null
    );
  },
};