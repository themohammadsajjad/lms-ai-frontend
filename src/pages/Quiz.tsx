import {
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { quizzes } from '../data/assessmentData';
import { assessmentService } from '../services/assessmentService';

function Quiz() {
  const { quizId } = useParams();

  const quiz = quizzes.find((item) => item.id === quizId);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number | null>(null);

  if (!quiz) {
    return (
      <section className="learning-empty-state">
        <h1>Quiz not found</h1>
        <Link to="/quizzes">Return to quizzes</Link>
      </section>
    );
  }

  const activeQuiz = quiz;
  const answeredCount = Object.keys(answers).length;

  function selectAnswer(questionId: string, optionIndex: number) {
    if (score !== null) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [questionId]: optionIndex,
    }));
  }

  function handleSubmit() {
    if (answeredCount !== activeQuiz.questions.length) {
      return;
    }

    const finalScore = activeQuiz.questions.reduce(
      (total, question) => {
        return answers[question.id] === question.correctAnswer
          ? total + 1
          : total;
      },
      0,
    );

    assessmentService.saveQuizAttempt(
      activeQuiz.id,
      finalScore,
      activeQuiz.questions.length,
    );

    setScore(finalScore);
  }

  function handleRetake() {
    setAnswers({});
    setScore(null);
  }

  const percentage =
    score !== null
      ? Math.round((score / activeQuiz.questions.length) * 100)
      : 0;

  return (
    <section className="quiz-page">
      <Link to="/quizzes" className="back-link">
        <ArrowLeft size={16} />
        Back to quizzes
      </Link>

      <div className="quiz-header-card">
        <div>
          <span className="eyebrow">
            {activeQuiz.courseTitle}
          </span>

          <h1>{activeQuiz.title}</h1>

          <p>
            Answer all questions and submit when you are ready.
          </p>
        </div>

        <div className="quiz-progress-info">
          <strong>
            {answeredCount}/{activeQuiz.questions.length}
          </strong>
          <span>Answered</span>
        </div>
      </div>

      {score !== null && (
        <div className="quiz-result-card">
          <div className="quiz-result-icon">
            <Trophy size={30} />
          </div>

          <div>
            <span>Quiz completed</span>
            <h2>{percentage}% score</h2>
            <p>
              You answered {score} out of{' '}
              {activeQuiz.questions.length} questions correctly.
            </p>
          </div>

          <button type="button" onClick={handleRetake}>
            <RotateCcw size={16} />
            Retake quiz
          </button>
        </div>
      )}

      <div className="quiz-questions">
        {activeQuiz.questions.map((question, questionIndex) => (
          <article className="quiz-question-card" key={question.id}>
            <div className="quiz-question-number">
              {questionIndex + 1}
            </div>

            <div className="quiz-question-content">
              <h2>{question.question}</h2>

              <div className="quiz-options">
                {question.options.map((option, optionIndex) => {
                  const selected =
                    answers[question.id] === optionIndex;

                  const correct =
                    score !== null &&
                    question.correctAnswer === optionIndex;

                  const wrong =
                    score !== null &&
                    selected &&
                    question.correctAnswer !== optionIndex;

                  return (
                    <button
                      type="button"
                      key={option}
                      className={[
                        'quiz-option',
                        selected ? 'selected' : '',
                        correct ? 'correct' : '',
                        wrong ? 'wrong' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() =>
                        selectAnswer(question.id, optionIndex)
                      }
                    >
                      <span>{String.fromCharCode(65 + optionIndex)}</span>

                      <strong>{option}</strong>

                      {correct && (
                        <CheckCircle2 size={17} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>

      {score === null && (
        <div className="quiz-submit-row">
          <span>
            {answeredCount === activeQuiz.questions.length
              ? 'All questions answered.'
              : `${
                  activeQuiz.questions.length - answeredCount
                } questions remaining.`}
          </span>

          <button
            type="button"
            disabled={
              answeredCount !== activeQuiz.questions.length
            }
            onClick={handleSubmit}
          >
            Submit quiz
          </button>
        </div>
      )}
    </section>
  );
}

export default Quiz;