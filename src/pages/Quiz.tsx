import {
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Trophy,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';
import {
  quizzes,
  type QuizQuestion,
} from '../data/assessmentData';
import { assessmentService } from '../services/assessmentService';

type AnswerValue =
  | number
  | number[]
  | string;

function normalizeAnswer(
  value: string,
) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function isQuestionCorrect(
  question: QuizQuestion,
  answer: AnswerValue | undefined,
) {
  if (
    question.type === 'single'
  ) {
    return (
      typeof answer === 'number' &&
      answer ===
        question.correctAnswer
    );
  }

  if (
    question.type === 'multiple'
  ) {
    if (
      !Array.isArray(answer) ||
      !question.correctAnswers
    ) {
      return false;
    }

    const selected = [
      ...answer,
    ].sort(
      (a, b) => a - b,
    );

    const correct = [
      ...question.correctAnswers,
    ].sort(
      (a, b) => a - b,
    );

    return (
      selected.length ===
        correct.length &&
      selected.every(
        (value, index) =>
          value === correct[index],
      )
    );
  }

  if (
    question.type === 'short'
  ) {
    if (
      typeof answer !== 'string'
    ) {
      return false;
    }

    const normalized =
      normalizeAnswer(answer);

    return (
      question.acceptedAnswers?.some(
        (accepted) =>
          normalizeAnswer(
            accepted,
          ) === normalized,
      ) ?? false
    );
  }

  return false;
}

function Quiz() {
  const { quizId } =
    useParams();

  const quiz = quizzes.find(
    (item) =>
      item.id === quizId,
  );

  const [answers, setAnswers] =
    useState<
      Record<
        string,
        AnswerValue
      >
    >({});

  const [score, setScore] =
    useState<number | null>(
      null,
    );

  if (!quiz) {
    return (
      <section className="learning-empty-state">
        <h1>Quiz not found</h1>

        <Link to="/quizzes">
          Return to quizzes
        </Link>
      </section>
    );
  }

  const activeQuiz = quiz;

  function isAnswered(
    question: QuizQuestion,
  ) {
    const answer =
      answers[question.id];

    if (
      question.type ===
      'single'
    ) {
      return typeof answer ===
        'number';
    }

    if (
      question.type ===
      'multiple'
    ) {
      return (
        Array.isArray(
          answer,
        ) &&
        answer.length > 0
      );
    }

    return (
      typeof answer ===
        'string' &&
      answer.trim().length >
        0
    );
  }

  const answeredCount =
    activeQuiz.questions.filter(
      isAnswered,
    ).length;

  function selectSingle(
    questionId: string,
    optionIndex: number,
  ) {
    if (score !== null) {
      return;
    }

    setAnswers(
      (current) => ({
        ...current,
        [questionId]:
          optionIndex,
      }),
    );
  }

  function toggleMultiple(
    questionId: string,
    optionIndex: number,
  ) {
    if (score !== null) {
      return;
    }

    setAnswers(
      (current) => {
        const existing =
          current[
            questionId
          ];

        const selected =
          Array.isArray(
            existing,
          )
            ? existing
            : [];

        const next =
          selected.includes(
            optionIndex,
          )
            ? selected.filter(
                (item) =>
                  item !==
                  optionIndex,
              )
            : [
                ...selected,
                optionIndex,
              ];

        return {
          ...current,
          [questionId]:
            next,
        };
      },
    );
  }

  function updateShortAnswer(
    questionId: string,
    value: string,
  ) {
    if (score !== null) {
      return;
    }

    setAnswers(
      (current) => ({
        ...current,
        [questionId]: value,
      }),
    );
  }

  function handleSubmit() {
    if (
      answeredCount !==
      activeQuiz.questions
        .length
    ) {
      return;
    }

    const finalScore =
      activeQuiz.questions.reduce(
        (
          total,
          question,
        ) => {
          return isQuestionCorrect(
            question,
            answers[
              question.id
            ],
          )
            ? total + 1
            : total;
        },
        0,
      );

    assessmentService.saveQuizAttempt(
      activeQuiz.id,
      finalScore,
      activeQuiz.questions
        .length,
    );

    setScore(finalScore);
  }

  function handleRetake() {
    setAnswers({});
    setScore(null);
  }

  const percentage =
    score !== null
      ? Math.round(
          (score /
            activeQuiz.questions
              .length) *
            100,
        )
      : 0;

  return (
    <section className="quiz-page">
      <Link
        to="/quizzes"
        className="back-link"
      >
        <ArrowLeft
          size={16}
        />
        Back to quizzes
      </Link>

      <div className="quiz-header-card">
        <div>
          <span className="eyebrow">
            {
              activeQuiz.courseTitle
            }
          </span>

          <h1>
            {
              activeQuiz.title
            }
          </h1>

          <p>
            Complete the MCQ,
            multi-select and
            short-answer questions.
          </p>
        </div>

        <div className="quiz-progress-info">
          <strong>
            {answeredCount}/
            {
              activeQuiz
                .questions.length
            }
          </strong>

          <span>
            Answered
          </span>
        </div>
      </div>

      {score !== null && (
        <div className="quiz-result-card">
          <div className="quiz-result-icon">
            <Trophy
              size={30}
            />
          </div>

          <div>
            <span>
              Quiz completed
            </span>

            <h2>
              {percentage}% score
            </h2>

            <p>
              You answered{' '}
              {score} out of{' '}
              {
                activeQuiz
                  .questions
                  .length
              }{' '}
              questions correctly.
            </p>
          </div>

          <button
            type="button"
            onClick={
              handleRetake
            }
          >
            <RotateCcw
              size={16}
            />
            Retake quiz
          </button>
        </div>
      )}

      <div className="quiz-questions">
        {activeQuiz.questions.map(
          (
            question,
            questionIndex,
          ) => {
            const answer =
              answers[
                question.id
              ];

            const questionCorrect =
              score !== null &&
              isQuestionCorrect(
                question,
                answer,
              );

            return (
              <article
                className="quiz-question-card"
                key={
                  question.id
                }
              >
                <div className="quiz-question-number">
                  {questionIndex +
                    1}
                </div>

                <div className="quiz-question-content">
                  <div className="quiz-question-heading">
                    <h2>
                      {
                        question.question
                      }
                    </h2>

                    <span className="quiz-question-type">
                      {question.type ===
                      'single'
                        ? 'Single choice'
                        : question.type ===
                            'multiple'
                          ? 'Select all that apply'
                          : 'Short answer'}
                    </span>
                  </div>

                  {question.type ===
                    'short' ? (
                    <div className="quiz-short-answer">
                      <input
                        type="text"
                        value={
                          typeof answer ===
                          'string'
                            ? answer
                            : ''
                        }
                        onChange={(
                          event,
                        ) =>
                          updateShortAnswer(
                            question.id,
                            event
                              .target
                              .value,
                          )
                        }
                        disabled={
                          score !==
                          null
                        }
                        placeholder="Type your answer..."
                      />

                      {score !==
                        null && (
                        <div
                          className={`quiz-answer-feedback ${
                            questionCorrect
                              ? 'correct'
                              : 'wrong'
                          }`}
                        >
                          {questionCorrect ? (
                            <CheckCircle2
                              size={
                                15
                              }
                            />
                          ) : (
                            <XCircle
                              size={
                                15
                              }
                            />
                          )}

                          <span>
                            {questionCorrect
                              ? 'Correct answer'
                              : `Accepted answer: ${
                                  question
                                    .acceptedAnswers?.[0] ??
                                  ''
                                }`}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="quiz-options">
                      {question.options?.map(
                        (
                          option,
                          optionIndex,
                        ) => {
                          const selected =
                            question.type ===
                            'multiple'
                              ? Array.isArray(
                                  answer,
                                ) &&
                                answer.includes(
                                  optionIndex,
                                )
                              : answer ===
                                optionIndex;

                          const correct =
                            score !==
                              null &&
                            (question.type ===
                            'multiple'
                              ? question.correctAnswers?.includes(
                                  optionIndex,
                                )
                              : question.correctAnswer ===
                                optionIndex);

                          const wrong =
                            score !==
                              null &&
                            selected &&
                            !correct;

                          return (
                            <button
                              type="button"
                              key={
                                option
                              }
                              className={[
                                'quiz-option',
                                selected
                                  ? 'selected'
                                  : '',
                                correct
                                  ? 'correct'
                                  : '',
                                wrong
                                  ? 'wrong'
                                  : '',
                              ]
                                .filter(
                                  Boolean,
                                )
                                .join(
                                  ' ',
                                )}
                              onClick={() =>
                                question.type ===
                                'multiple'
                                  ? toggleMultiple(
                                      question.id,
                                      optionIndex,
                                    )
                                  : selectSingle(
                                      question.id,
                                      optionIndex,
                                    )
                              }
                            >
                              <span>
                                {question.type ===
                                'multiple'
                                  ? selected
                                    ? '✓'
                                    : '□'
                                  : String.fromCharCode(
                                      65 +
                                        optionIndex,
                                    )}
                              </span>

                              <strong>
                                {
                                  option
                                }
                              </strong>

                              {correct && (
                                <CheckCircle2
                                  size={
                                    17
                                  }
                                />
                              )}
                            </button>
                          );
                        },
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          },
        )}
      </div>

      {score === null && (
        <div className="quiz-submit-row">
          <span>
            {answeredCount ===
            activeQuiz.questions
              .length
              ? 'All questions answered.'
              : `${
                  activeQuiz
                    .questions
                    .length -
                  answeredCount
                } questions remaining.`}
          </span>

          <button
            type="button"
            disabled={
              answeredCount !==
              activeQuiz.questions
                .length
            }
            onClick={
              handleSubmit
            }
          >
            Submit quiz
          </button>
        </div>
      )}
    </section>
  );
}

export default Quiz;