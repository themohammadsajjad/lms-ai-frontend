import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileQuestion,
  Plus,
  Save,
  Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { instructorService } from '../../services/instructorService';
import {
  instructorQuizBuilderService,
  type InstructorManualQuiz,
  type ManualQuizQuestion,
  type ManualQuizQuestionType,
} from '../../services/instructorQuizBuilderService';

function createQuestion(
  type: ManualQuizQuestionType = 'single',
): ManualQuizQuestion {
  if (type === 'short') {
    return {
      id: crypto.randomUUID(),
      type,
      question: '',
      options: [],
      acceptedAnswers: [''],
    };
  }

  return {
    id: crypto.randomUUID(),
    type,
    question: '',
    options: ['', '', '', ''],
    ...(type === 'single'
      ? {
          correctAnswer: 0,
        }
      : {
          correctAnswers: [],
        }),
  };
}

function InstructorQuizBuilder() {
  const courses =
    instructorService.getCourses();

  const [courseId, setCourseId] =
    useState(
      courses[0]?.id ?? '',
    );

  const [title, setTitle] =
    useState('');

  const [description, setDescription] =
    useState('');

  const [questions, setQuestions] =
    useState<ManualQuizQuestion[]>([
      createQuestion(),
    ]);

  const [quizzes, setQuizzes] =
    useState<InstructorManualQuiz[]>(
      () =>
        instructorQuizBuilderService.getQuizzes(),
    );

  const selectedCourse =
    courses.find(
      (course) =>
        course.id === courseId,
    );

  const courseQuizzes = useMemo(
    () =>
      quizzes.filter(
        (quiz) =>
          quiz.courseId === courseId,
      ),
    [quizzes, courseId],
  );

  function resetBuilder() {
    setTitle('');
    setDescription('');
    setQuestions([
      createQuestion(),
    ]);
  }

  function addQuestion() {
    setQuestions(
      (current) => [
        ...current,
        createQuestion(),
      ],
    );
  }

  function removeQuestion(
    questionId: string,
  ) {
    setQuestions((current) => {
      if (current.length === 1) {
        return current;
      }

      return current.filter(
        (question) =>
          question.id !==
          questionId,
      );
    });
  }

  function updateQuestionText(
    questionId: string,
    value: string,
  ) {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId
          ? {
              ...question,
              question: value,
            }
          : question,
      ),
    );
  }

  function changeQuestionType(
    questionId: string,
    type: ManualQuizQuestionType,
  ) {
    setQuestions((current) =>
      current.map((question) => {
        if (
          question.id !==
          questionId
        ) {
          return question;
        }

        const replacement =
          createQuestion(type);

        return {
          ...replacement,
          id: question.id,
          question:
            question.question,
        };
      }),
    );
  }

  function updateOption(
    questionId: string,
    optionIndex: number,
    value: string,
  ) {
    setQuestions((current) =>
      current.map((question) => {
        if (
          question.id !==
          questionId
        ) {
          return question;
        }

        const updatedOptions = [
          ...question.options,
        ];

        updatedOptions[
          optionIndex
        ] = value;

        return {
          ...question,
          options:
            updatedOptions,
        };
      }),
    );
  }

  function setSingleCorrectAnswer(
    questionId: string,
    optionIndex: number,
  ) {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId
          ? {
              ...question,
              correctAnswer:
                optionIndex,
            }
          : question,
      ),
    );
  }

  function toggleMultipleAnswer(
    questionId: string,
    optionIndex: number,
  ) {
    setQuestions((current) =>
      current.map((question) => {
        if (
          question.id !==
          questionId
        ) {
          return question;
        }

        const existing =
          question.correctAnswers ??
          [];

        const updated =
          existing.includes(
            optionIndex,
          )
            ? existing.filter(
                (index) =>
                  index !==
                  optionIndex,
              )
            : [
                ...existing,
                optionIndex,
              ];

        return {
          ...question,
          correctAnswers:
            updated,
        };
      }),
    );
  }

  function updateShortAnswers(
    questionId: string,
    value: string,
  ) {
    const answers =
      value
        .split(',')
        .map((answer) =>
          answer.trim(),
        );

    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId
          ? {
              ...question,
              acceptedAnswers:
                answers,
            }
          : question,
      ),
    );
  }

  function isQuestionValid(
    question: ManualQuizQuestion,
  ) {
    if (
      !question.question.trim()
    ) {
      return false;
    }

    if (
      question.type === 'short'
    ) {
      return (
        question.acceptedAnswers ??
        []
      ).some(
        (answer) =>
          answer.trim().length >
          0,
      );
    }

    const allOptionsFilled =
      question.options.length ===
        4 &&
      question.options.every(
        (option) =>
          option.trim().length >
          0,
      );

    if (!allOptionsFilled) {
      return false;
    }

    if (
      question.type ===
      'single'
    ) {
      return (
        typeof question.correctAnswer ===
        'number'
      );
    }

    return (
      question.correctAnswers ??
      []
    ).length > 0;
  }

  const canCreateQuiz =
    Boolean(selectedCourse) &&
    title.trim().length > 0 &&
    description.trim().length >
      0 &&
    questions.length > 0 &&
    questions.every(
      isQuestionValid,
    );

  function handleCreateQuiz() {
    if (
      !selectedCourse ||
      !canCreateQuiz
    ) {
      return;
    }

    const cleanedQuestions =
      questions.map(
        (question) => ({
          ...question,
          question:
            question.question.trim(),
          options:
            question.options.map(
              (option) =>
                option.trim(),
            ),
          acceptedAnswers:
            question.acceptedAnswers?.filter(
              (answer) =>
                answer.trim()
                  .length > 0,
            ),
        }),
      );

    const updated =
      instructorQuizBuilderService.createQuiz(
        {
          courseId:
            selectedCourse.id,
          courseTitle:
            selectedCourse.title,
          title,
          description,
          questions:
            cleanedQuestions,
        },
      );

    setQuizzes(updated);
    resetBuilder();
  }

  function handleToggleStatus(
    quizId: string,
  ) {
    setQuizzes(
      instructorQuizBuilderService.toggleStatus(
        quizId,
      ),
    );
  }

  function handleDelete(
    quizId: string,
  ) {
    setQuizzes(
      instructorQuizBuilderService.deleteQuiz(
        quizId,
      ),
    );
  }

  function formatDate(
    value: string,
  ) {
    return new Date(
      value,
    ).toLocaleString();
  }

  return (
    <section className="instructor-quiz-builder-section">
      <div className="instructor-section-heading">
        <div>
          <span className="eyebrow">
            Assessment authoring
          </span>

          <h2>
            Manual quiz builder
          </h2>

          <p>
            Create quizzes with
            single-answer, multi-select
            and short-answer questions.
          </p>
        </div>

        <div className="course-status-summary">
          <strong>
            {
              courseQuizzes.length
            }
          </strong>

          <span>
            Quizzes
          </span>
        </div>
      </div>

      <div className="quiz-builder-layout">
        <section className="quiz-builder-panel">
          <div className="quiz-builder-heading">
            <div className="quiz-builder-heading-icon">
              <FileQuestion
                size={20}
              />
            </div>

            <div>
              <span>
                New quiz
              </span>

              <h3>
                Quiz details
              </h3>
            </div>
          </div>

          <div className="quiz-builder-basic-form">
            <label className="quiz-builder-field">
              <span>
                Course
              </span>

              <select
                value={courseId}
                onChange={(event) => {
                  setCourseId(
                    event.target.value,
                  );

                  resetBuilder();
                }}
              >
                {courses.map(
                  (course) => (
                    <option
                      key={
                        course.id
                      }
                      value={
                        course.id
                      }
                    >
                      {
                        course.title
                      }
                    </option>
                  ),
                )}
              </select>
            </label>

            <label className="quiz-builder-field">
              <span>
                Quiz title
              </span>

              <input
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(
                    event.target.value,
                  )
                }
                placeholder="e.g. JavaScript Functions Quiz"
              />
            </label>

            <label className="quiz-builder-field quiz-builder-full">
              <span>
                Description
              </span>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value,
                  )
                }
                placeholder="Describe what this quiz evaluates..."
                rows={3}
              />
            </label>
          </div>

          <div className="quiz-question-builder-heading">
            <div>
              <span>
                Questions
              </span>

              <h3>
                Build assessment
              </h3>
            </div>

            <button
              type="button"
              onClick={
                addQuestion
              }
            >
              <Plus size={14} />
              Add question
            </button>
          </div>

          <div className="quiz-question-builder-list">
            {questions.map(
              (
                question,
                questionIndex,
              ) => (
                <article
                  className="quiz-builder-question-card"
                  key={
                    question.id
                  }
                >
                  <div className="quiz-builder-question-header">
                    <div>
                      <div className="quiz-question-number">
                        {questionIndex +
                          1}
                      </div>

                      <div>
                        <span>
                          Question{' '}
                          {questionIndex +
                            1}
                        </span>

                        <strong>
                          {question.type ===
                          'single'
                            ? 'Single answer'
                            : question.type ===
                                'multiple'
                              ? 'Multi-select'
                              : 'Short answer'}
                        </strong>
                      </div>
                    </div>

                    <div className="quiz-question-header-actions">
                      <select
                        value={
                          question.type
                        }
                        onChange={(
                          event,
                        ) =>
                          changeQuestionType(
                            question.id,
                            event
                              .target
                              .value as ManualQuizQuestionType,
                          )
                        }
                        aria-label={`Question ${questionIndex + 1} type`}
                      >
                        <option value="single">
                          Single answer
                        </option>

                        <option value="multiple">
                          Multi-select
                        </option>

                        <option value="short">
                          Short answer
                        </option>
                      </select>

                      <button
                        type="button"
                        disabled={
                          questions.length ===
                          1
                        }
                        onClick={() =>
                          removeQuestion(
                            question.id,
                          )
                        }
                        aria-label={`Remove question ${questionIndex + 1}`}
                      >
                        <Trash2
                          size={14}
                        />
                      </button>
                    </div>
                  </div>

                  <label className="quiz-builder-field quiz-builder-full">
                    <span>
                      Question
                    </span>

                    <input
                      type="text"
                      value={
                        question.question
                      }
                      onChange={(
                        event,
                      ) =>
                        updateQuestionText(
                          question.id,
                          event.target
                            .value,
                        )
                      }
                      placeholder="Enter your question..."
                    />
                  </label>

                  {question.type ===
                  'short' ? (
                    <label className="quiz-builder-field quiz-builder-full quiz-short-answer-field">
                      <span>
                        Accepted answers
                      </span>

                      <input
                        type="text"
                        value={(
                          question.acceptedAnswers ??
                          []
                        ).join(
                          ', ',
                        )}
                        onChange={(
                          event,
                        ) =>
                          updateShortAnswers(
                            question.id,
                            event.target
                              .value,
                          )
                        }
                        placeholder="e.g. props, properties"
                      />

                      <small>
                        Separate multiple
                        accepted answers
                        with commas.
                      </small>
                    </label>
                  ) : (
                    <div className="quiz-option-builder-list">
                      {question.options.map(
                        (
                          option,
                          optionIndex,
                        ) => {
                          const isSingle =
                            question.type ===
                            'single';

                          const checked =
                            isSingle
                              ? question.correctAnswer ===
                                optionIndex
                              : (
                                  question.correctAnswers ??
                                  []
                                ).includes(
                                  optionIndex,
                                );

                          return (
                            <div
                              className={`quiz-option-builder-row ${
                                checked
                                  ? 'correct'
                                  : ''
                              }`}
                              key={`${question.id}-${optionIndex}`}
                            >
                              <span className="quiz-option-letter">
                                {String.fromCharCode(
                                  65 +
                                    optionIndex,
                                )}
                              </span>

                              <input
                                className="quiz-option-text-input"
                                type="text"
                                value={
                                  option
                                }
                                onChange={(
                                  event,
                                ) =>
                                  updateOption(
                                    question.id,
                                    optionIndex,
                                    event
                                      .target
                                      .value,
                                  )
                                }
                                placeholder={`Option ${String.fromCharCode(
                                  65 +
                                    optionIndex,
                                )}`}
                              />

                              <label className="quiz-correct-control">
                                <input
                                  type={
                                    isSingle
                                      ? 'radio'
                                      : 'checkbox'
                                  }
                                  name={
                                    isSingle
                                      ? `correct-${question.id}`
                                      : undefined
                                  }
                                  checked={
                                    checked
                                  }
                                  onChange={() => {
                                    if (
                                      isSingle
                                    ) {
                                      setSingleCorrectAnswer(
                                        question.id,
                                        optionIndex,
                                      );
                                    } else {
                                      toggleMultipleAnswer(
                                        question.id,
                                        optionIndex,
                                      );
                                    }
                                  }}
                                />

                                <span>
                                  Correct
                                </span>
                              </label>
                            </div>
                          );
                        },
                      )}
                    </div>
                  )}
                </article>
              ),
            )}
          </div>

          <div className="quiz-builder-footer">
            <button
              type="button"
              className="quiz-add-question-secondary"
              onClick={
                addQuestion
              }
            >
              <Plus size={14} />
              Add another question
            </button>

            <button
              type="button"
              className="quiz-save-button"
              disabled={
                !canCreateQuiz
              }
              onClick={
                handleCreateQuiz
              }
            >
              <Save size={15} />
              Save quiz as draft
            </button>
          </div>

          <p className="quiz-builder-note">
            Quizzes created in this
            frontend demo are stored
            locally and can be published
            or returned to draft status.
          </p>
        </section>

        <aside className="quiz-builder-course-summary">
          <div className="quiz-builder-course-icon">
            <BookOpen
              size={20}
            />
          </div>

          <span>
            Selected course
          </span>

          <h3>
            {selectedCourse?.title ??
              'No course selected'}
          </h3>

          <p>
            {selectedCourse?.description ??
              'Choose a course to build a quiz.'}
          </p>

          <div className="quiz-builder-summary-stat">
            <strong>
              {questions.length}
            </strong>

            <span>
              Questions in builder
            </span>
          </div>

          <div className="quiz-builder-summary-stat">
            <strong>
              {
                courseQuizzes.length
              }
            </strong>

            <span>
              Saved course quizzes
            </span>
          </div>
        </aside>
      </div>

      <section className="manual-quiz-library">
        <div className="section-heading">
          <div>
            <h2>
              Manual quiz library
            </h2>

            <p>
              Quizzes created for{' '}
              <strong>
                {
                  selectedCourse?.title
                }
              </strong>
              .
            </p>
          </div>
        </div>

        {courseQuizzes.length >
        0 ? (
          <div className="manual-quiz-library-list">
            {courseQuizzes.map(
              (quiz) => (
                <article
                  className="manual-quiz-library-card"
                  key={quiz.id}
                >
                  <div className="manual-quiz-card-icon">
                    <ClipboardList
                      size={19}
                    />
                  </div>

                  <div className="manual-quiz-card-main">
                    <div className="manual-quiz-card-heading">
                      <div>
                        <span>
                          {
                            quiz.courseTitle
                          }
                        </span>

                        <h3>
                          {
                            quiz.title
                          }
                        </h3>
                      </div>

                      <span
                        className={`manual-quiz-status ${quiz.status}`}
                      >
                        <CheckCircle2
                          size={12}
                        />

                        {quiz.status ===
                        'published'
                          ? 'Published'
                          : 'Draft'}
                      </span>
                    </div>

                    <p>
                      {
                        quiz.description
                      }
                    </p>

                    <div className="manual-quiz-card-meta">
                      <span>
                        {
                          quiz.questions
                            .length
                        }{' '}
                        questions
                      </span>

                      <span>
                        Created{' '}
                        {formatDate(
                          quiz.createdAt,
                        )}
                      </span>
                    </div>

                    <div className="manual-quiz-type-summary">
                      <span>
                        {
                          quiz.questions.filter(
                            (
                              question,
                            ) =>
                              question.type ===
                              'single',
                          ).length
                        }{' '}
                        single
                      </span>

                      <span>
                        {
                          quiz.questions.filter(
                            (
                              question,
                            ) =>
                              question.type ===
                              'multiple',
                          ).length
                        }{' '}
                        multi-select
                      </span>

                      <span>
                        {
                          quiz.questions.filter(
                            (
                              question,
                            ) =>
                              question.type ===
                              'short',
                          ).length
                        }{' '}
                        short-answer
                      </span>
                    </div>
                  </div>

                  <div className="manual-quiz-card-actions">
                    <button
                      type="button"
                      className="manual-quiz-status-button"
                      onClick={() =>
                        handleToggleStatus(
                          quiz.id,
                        )
                      }
                    >
                      {quiz.status ===
                      'draft'
                        ? 'Publish quiz'
                        : 'Move to draft'}
                    </button>

                    <button
                      type="button"
                      className="manual-quiz-delete-button"
                      onClick={() =>
                        handleDelete(
                          quiz.id,
                        )
                      }
                      aria-label={`Delete ${quiz.title}`}
                    >
                      <Trash2
                        size={15}
                      />
                    </button>
                  </div>
                </article>
              ),
            )}
          </div>
        ) : (
          <div className="manual-quiz-empty-state">
            <FileQuestion
              size={29}
            />

            <h3>
              No manual quizzes yet
            </h3>

            <p>
              Build the first quiz for
              this course.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}

export default InstructorQuizBuilder;