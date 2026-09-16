import {
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Trophy,
} from 'lucide-react';
import { useState } from 'react';
import { assignments } from '../data/assessmentData';
import { assessmentService } from '../services/assessmentService';

function Assignments() {
  const [, setVersion] = useState(0);

  function handleSubmit(assignmentId: string) {
    assessmentService.submitAssignment(assignmentId);
    setVersion((value) => value + 1);
  }

  const submittedCount = assignments.filter((assignment) =>
    assessmentService.isAssignmentSubmitted(assignment.id),
  ).length;

  return (
    <section className="assessment-page">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">Assignments</span>
          <h1>Your assignments</h1>
          <p>
            Review course tasks, track deadlines and submit your work.
          </p>
        </div>

        <div className="assessment-summary">
          <strong>
            {submittedCount}/{assignments.length}
          </strong>
          <span>Submitted</span>
        </div>
      </div>

      <div className="assignment-grid">
        {assignments.map((assignment) => {
          const submitted =
            assessmentService.isAssignmentSubmitted(assignment.id);

          return (
            <article
              className="assignment-card"
              key={assignment.id}
            >
              <div className="assignment-card-top">
                <div className="assignment-icon">
                  <ClipboardCheck size={21} />
                </div>

                {submitted ? (
                  <span className="assignment-status submitted">
                    <CheckCircle2 size={14} />
                    Submitted
                  </span>
                ) : (
                  <span className="assignment-status pending">
                    Pending
                  </span>
                )}
              </div>

              <span className="assignment-course">
                {assignment.courseTitle}
              </span>

              <h2>{assignment.title}</h2>

              <p>{assignment.description}</p>

              <div className="assignment-meta">
                <span>
                  <CalendarDays size={15} />
                  Due {assignment.dueDate}
                </span>

                <span>
                  <Trophy size={15} />
                  {assignment.points} points
                </span>
              </div>

              <div className="assignment-footer">
                <div>
                  <FileText size={16} />
                  <span>Course assignment</span>
                </div>

                <button
                  type="button"
                  disabled={submitted}
                  className={submitted ? 'submitted' : ''}
                  onClick={() => handleSubmit(assignment.id)}
                >
                  {submitted ? 'Submitted' : 'Submit assignment'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Assignments;