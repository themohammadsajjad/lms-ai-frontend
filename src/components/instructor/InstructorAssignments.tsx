import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  Plus,
  Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { instructorService } from '../../services/instructorService';
import {
  instructorAssignmentService,
  type InstructorAssignmentStatus,
} from '../../services/instructorAssignmentService';

function InstructorAssignments() {
  const courses = instructorService.getCourses();

  const [courseId, setCourseId] = useState(
    courses[0]?.id ?? '',
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] =
    useState('');
  const [dueDate, setDueDate] =
    useState('');
  const [points, setPoints] =
    useState(100);
  const [rubric, setRubric] =
    useState('');

  const [assignments, setAssignments] =
    useState(() =>
      instructorAssignmentService.getAssignments(),
    );

  const selectedCourse = courses.find(
    (course) => course.id === courseId,
  );

  const courseAssignments = useMemo(
    () =>
      assignments.filter(
        (assignment) =>
          assignment.courseId === courseId,
      ),
    [assignments, courseId],
  );

  function resetForm() {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPoints(100);
    setRubric('');
  }

  function handleCreateAssignment() {
    if (
      !selectedCourse ||
      !title.trim() ||
      !description.trim() ||
      !dueDate ||
      points <= 0 ||
      !rubric.trim()
    ) {
      return;
    }

    const updated =
      instructorAssignmentService.createAssignment({
        courseId:
          selectedCourse.id,
        courseTitle:
          selectedCourse.title,
        title,
        description,
        dueDate,
        points,
        rubric,
      });

    setAssignments(updated);
    resetForm();
  }

  function handleToggleStatus(
    assignmentId: string,
  ) {
    setAssignments(
      instructorAssignmentService.toggleStatus(
        assignmentId,
      ),
    );
  }

  function handleDelete(
    assignmentId: string,
  ) {
    setAssignments(
      instructorAssignmentService.deleteAssignment(
        assignmentId,
      ),
    );
  }

  function getStatusLabel(
    status: InstructorAssignmentStatus,
  ) {
    return status === 'published'
      ? 'Published'
      : 'Draft';
  }

  return (
    <section className="instructor-assignment-section">
      <div className="instructor-section-heading">
        <div>
          <span className="eyebrow">
            Assignment authoring
          </span>

          <h2>
            Create assignments
          </h2>

          <p>
            Build course assignments with
            deadlines, points and grading
            rubrics.
          </p>
        </div>

        <div className="course-status-summary">
          <strong>
            {courseAssignments.length}
          </strong>

          <span>
            Assignments
          </span>
        </div>
      </div>

      <div className="assignment-authoring-layout">
        <section className="assignment-authoring-panel">
          <div className="assignment-authoring-heading">
            <div className="assignment-authoring-icon">
              <ClipboardList
                size={20}
              />
            </div>

            <div>
              <span>
                New assignment
              </span>

              <h3>
                Assignment details
              </h3>
            </div>
          </div>

          <div className="assignment-authoring-form">
            <label className="assignment-authoring-field assignment-authoring-full">
              <span>
                Course
              </span>

              <select
                value={courseId}
                onChange={(event) => {
                  setCourseId(
                    event.target.value,
                  );

                  resetForm();
                }}
              >
                {courses.map(
                  (course) => (
                    <option
                      key={course.id}
                      value={course.id}
                    >
                      {course.title}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label className="assignment-authoring-field assignment-authoring-full">
              <span>
                Assignment title
              </span>

              <input
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(
                    event.target.value,
                  )
                }
                placeholder="e.g. Build a reusable dashboard component"
              />
            </label>

            <label className="assignment-authoring-field assignment-authoring-full">
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
                placeholder="Explain the task and expected outcome..."
                rows={4}
              />
            </label>

            <label className="assignment-authoring-field">
              <span>
                Due date
              </span>

              <input
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(
                    event.target.value,
                  )
                }
              />
            </label>

            <label className="assignment-authoring-field">
              <span>
                Points
              </span>

              <input
                type="number"
                min="1"
                max="1000"
                value={points}
                onChange={(event) =>
                  setPoints(
                    Number(
                      event.target.value,
                    ),
                  )
                }
              />
            </label>

            <label className="assignment-authoring-field assignment-authoring-full">
              <span>
                Rubric
              </span>

              <textarea
                value={rubric}
                onChange={(event) =>
                  setRubric(
                    event.target.value,
                  )
                }
                placeholder="Example: Functionality 40%, Code quality 30%, UI 20%, Documentation 10%"
                rows={4}
              />
            </label>
          </div>

          <button
            type="button"
            className="assignment-create-button"
            disabled={
              !selectedCourse ||
              !title.trim() ||
              !description.trim() ||
              !dueDate ||
              points <= 0 ||
              !rubric.trim()
            }
            onClick={
              handleCreateAssignment
            }
          >
            <Plus size={15} />
            Create draft assignment
          </button>

          <p className="assignment-authoring-note">
            Frontend demo: assignment
            details are saved locally.
            Backend persistence and file
            delivery are outside the
            current scope.
          </p>
        </section>

        <aside className="assignment-course-summary">
          <div className="assignment-course-summary-icon">
            <FileText size={20} />
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
              'Select a course to create an assignment.'}
          </p>

          <div className="assignment-course-count">
            <strong>
              {courseAssignments.length}
            </strong>

            <span>
              Course assignments
            </span>
          </div>
        </aside>
      </div>

      <section className="assignment-library-section">
        <div className="section-heading">
          <div>
            <h2>
              Assignment library
            </h2>

            <p>
              Assignments created for{' '}
              <strong>
                {selectedCourse?.title}
              </strong>
              .
            </p>
          </div>
        </div>

        {courseAssignments.length >
        0 ? (
          <div className="assignment-library-list">
            {courseAssignments.map(
              (assignment) => (
                <article
                  className="assignment-library-card"
                  key={assignment.id}
                >
                  <div className="assignment-library-card-top">
                    <div>
                      <span>
                        {
                          assignment.courseTitle
                        }
                      </span>

                      <h3>
                        {
                          assignment.title
                        }
                      </h3>
                    </div>

                    <span
                      className={`assignment-authoring-status ${assignment.status}`}
                    >
                      <CheckCircle2
                        size={13}
                      />
                      {getStatusLabel(
                        assignment.status,
                      )}
                    </span>
                  </div>

                  <p className="assignment-library-description">
                    {
                      assignment.description
                    }
                  </p>

                  <div className="assignment-library-meta">
                    <span>
                      <CalendarDays
                        size={14}
                      />
                      Due{' '}
                      {
                        assignment.dueDate
                      }
                    </span>

                    <span>
                      {
                        assignment.points
                      }{' '}
                      points
                    </span>
                  </div>

                  <div className="assignment-rubric-preview">
                    <span>
                      Rubric
                    </span>

                    <p>
                      {
                        assignment.rubric
                      }
                    </p>
                  </div>

                  <div className="assignment-library-actions">
                    <button
                      type="button"
                      className="assignment-status-toggle"
                      onClick={() =>
                        handleToggleStatus(
                          assignment.id,
                        )
                      }
                    >
                      {assignment.status ===
                      'draft'
                        ? 'Publish assignment'
                        : 'Move to draft'}
                    </button>

                    <button
                      type="button"
                      className="assignment-delete-button"
                      onClick={() =>
                        handleDelete(
                          assignment.id,
                        )
                      }
                      aria-label={`Delete ${assignment.title}`}
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
          <div className="assignment-authoring-empty">
            <ClipboardList
              size={28}
            />

            <h3>
              No assignments yet
            </h3>

            <p>
              Create the first assignment
              for this course.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}

export default InstructorAssignments;