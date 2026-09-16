import {
  CheckCircle2,
  Clock3,
  HelpCircle,
  PlayCircle,
  Trophy,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { quizzes } from '../data/assessmentData';
import { assessmentService } from '../services/assessmentService';

function Quizzes() {
  return (
    <section className="assessment-page">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">Knowledge checks</span>
          <h1>Course quizzes</h1>
          <p>
            Test your understanding and track your assessment scores.
          </p>
        </div>
      </div>

      <div className="quiz-list-grid">
        {quizzes.map((quiz) => {
          const attempt = assessmentService.getQuizAttempt(quiz.id);

          return (
            <article className="quiz-list-card" key={quiz.id}>
              <div className="quiz-list-icon">
                <HelpCircle size={23} />
              </div>

              <div className="quiz-list-content">
                <span>{quiz.courseTitle}</span>
                <h2>{quiz.title}</h2>

                <div className="quiz-list-meta">
                  <span>
                    <HelpCircle size={14} />
                    {quiz.questions.length} questions
                  </span>

                  <span>
                    <Clock3 size={14} />
                    {quiz.duration}
                  </span>
                </div>

                {attempt && (
                  <div className="previous-score">
                    <CheckCircle2 size={15} />

                    Previous score:
                    <strong>
                      {attempt.score}/{attempt.total}
                    </strong>
                  </div>
                )}
              </div>

              <div className="quiz-list-action">
                {attempt && (
                  <div className="score-badge">
                    <Trophy size={15} />
                    {Math.round(
                      (attempt.score / attempt.total) * 100,
                    )}
                    %
                  </div>
                )}

                <Link to={`/quiz/${quiz.id}`}>
                  <PlayCircle size={16} />
                  {attempt ? 'Retake quiz' : 'Start quiz'}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Quizzes;