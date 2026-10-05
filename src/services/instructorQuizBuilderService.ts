export type ManualQuizQuestionType =
  | 'single'
  | 'multiple'
  | 'short';

export type ManualQuizStatus =
  | 'draft'
  | 'published';

export interface ManualQuizQuestion {
  id: string;
  type: ManualQuizQuestionType;
  question: string;
  options: string[];
  correctAnswer?: number;
  correctAnswers?: number[];
  acceptedAnswers?: string[];
}

export interface InstructorManualQuiz {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  questions: ManualQuizQuestion[];
  status: ManualQuizStatus;
  createdAt: string;
}

export interface CreateManualQuizData {
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  questions: ManualQuizQuestion[];
}

const QUIZZES_KEY =
  'lms_instructor_manual_quizzes';

function readQuizzes():
  InstructorManualQuiz[] {
  const stored =
    localStorage.getItem(
      QUIZZES_KEY,
    );

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(
      stored,
    ) as InstructorManualQuiz[];
  } catch {
    return [];
  }
}

function saveQuizzes(
  quizzes: InstructorManualQuiz[],
) {
  localStorage.setItem(
    QUIZZES_KEY,
    JSON.stringify(quizzes),
  );
}

export const instructorQuizBuilderService = {
  getQuizzes():
    InstructorManualQuiz[] {
    return readQuizzes();
  },

  getQuizzesForCourse(
    courseId: string,
  ): InstructorManualQuiz[] {
    return readQuizzes().filter(
      (quiz) =>
        quiz.courseId === courseId,
    );
  },

  createQuiz(
    data: CreateManualQuizData,
  ): InstructorManualQuiz[] {
    const quizzes =
      readQuizzes();

    const newQuiz:
      InstructorManualQuiz = {
      id: crypto.randomUUID(),
      courseId:
        data.courseId,
      courseTitle:
        data.courseTitle,
      title:
        data.title.trim(),
      description:
        data.description.trim(),
      questions:
        data.questions,
      status: 'draft',
      createdAt:
        new Date().toISOString(),
    };

    const updated = [
      newQuiz,
      ...quizzes,
    ];

    saveQuizzes(updated);

    return updated;
  },

  toggleStatus(
    quizId: string,
  ): InstructorManualQuiz[] {
    const updated:
      InstructorManualQuiz[] =
      readQuizzes().map(
        (quiz):
          InstructorManualQuiz => {
          if (
            quiz.id !== quizId
          ) {
            return quiz;
          }

          const nextStatus:
            ManualQuizStatus =
            quiz.status === 'draft'
              ? 'published'
              : 'draft';

          return {
            ...quiz,
            status: nextStatus,
          };
        },
      );

    saveQuizzes(updated);

    return updated;
  },

  deleteQuiz(
    quizId: string,
  ): InstructorManualQuiz[] {
    const updated =
      readQuizzes().filter(
        (quiz) =>
          quiz.id !== quizId,
      );

    saveQuizzes(updated);

    return updated;
  },
};