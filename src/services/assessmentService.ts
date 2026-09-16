const ASSIGNMENT_KEY = 'lms_assignment_submissions';
const QUIZ_KEY = 'lms_quiz_attempts';

interface QuizAttempt {
  quizId: string;
  score: number;
  total: number;
  completedAt: string;
}

function readIds(key: string): string[] {
  const stored = localStorage.getItem(key);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

function readQuizAttempts(): QuizAttempt[] {
  const stored = localStorage.getItem(QUIZ_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as QuizAttempt[];
  } catch {
    return [];
  }
}

export const assessmentService = {
  isAssignmentSubmitted(assignmentId: string): boolean {
    return readIds(ASSIGNMENT_KEY).includes(assignmentId);
  },

  submitAssignment(assignmentId: string): void {
    const submitted = readIds(ASSIGNMENT_KEY);

    if (!submitted.includes(assignmentId)) {
      localStorage.setItem(
        ASSIGNMENT_KEY,
        JSON.stringify([...submitted, assignmentId]),
      );
    }
  },

  saveQuizAttempt(
    quizId: string,
    score: number,
    total: number,
  ): void {
    const attempts = readQuizAttempts();

    const nextAttempt: QuizAttempt = {
      quizId,
      score,
      total,
      completedAt: new Date().toISOString(),
    };

    const updated = [
      ...attempts.filter((attempt) => attempt.quizId !== quizId),
      nextAttempt,
    ];

    localStorage.setItem(QUIZ_KEY, JSON.stringify(updated));
  },

  getQuizAttempt(quizId: string): QuizAttempt | null {
    return (
      readQuizAttempts().find(
        (attempt) => attempt.quizId === quizId,
      ) ?? null
    );
  },
};