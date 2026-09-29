import {
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Trophy,
  Upload,
  X,
} from 'lucide-react';
import {
  useRef,
  useState,
} from 'react';
import type { ChangeEvent } from 'react';
import { assignments } from '../data/assessmentData';
import { assessmentService } from '../services/assessmentService';

function formatFileSize(
  size: number,
) {
  if (size === 0) {
    return '';
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(
      size / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    size /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

function Assignments() {
  const [, setVersion] =
    useState(0);

  const [
    selectedFiles,
    setSelectedFiles,
  ] = useState<
    Record<string, File | null>
  >({});

  const inputRefs =
    useRef<
      Record<
        string,
        HTMLInputElement | null
      >
    >({});

  function handleFileSelect(
    assignmentId: string,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0] ??
      null;

    setSelectedFiles(
      (current) => ({
        ...current,
        [assignmentId]: file,
      }),
    );
  }

  function removeSelectedFile(
    assignmentId: string,
  ) {
    setSelectedFiles(
      (current) => ({
        ...current,
        [assignmentId]: null,
      }),
    );

    const input =
      inputRefs.current[
        assignmentId
      ];

    if (input) {
      input.value = '';
    }
  }

  function handleSubmit(
    assignmentId: string,
  ) {
    const file =
      selectedFiles[
        assignmentId
      ];

    if (!file) {
      return;
    }

    assessmentService.submitAssignment(
      assignmentId,
      file,
    );

    setSelectedFiles(
      (current) => ({
        ...current,
        [assignmentId]: null,
      }),
    );

    setVersion(
      (value) => value + 1,
    );
  }

  const submittedCount =
    assignments.filter(
      (assignment) =>
        assessmentService.isAssignmentSubmitted(
          assignment.id,
        ),
    ).length;

  return (
    <section className="assessment-page">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">
            Assignments
          </span>

          <h1>
            Your assignments
          </h1>

          <p>
            Review course tasks,
            attach your work and
            submit before the deadline.
          </p>
        </div>

        <div className="assessment-summary">
          <strong>
            {submittedCount}/
            {assignments.length}
          </strong>

          <span>
            Submitted
          </span>
        </div>
      </div>

      <div className="assignment-grid">
        {assignments.map(
          (assignment) => {
            const submitted =
              assessmentService.isAssignmentSubmitted(
                assignment.id,
              );

            const submission =
              assessmentService.getAssignmentSubmission(
                assignment.id,
              );

            const selectedFile =
              selectedFiles[
                assignment.id
              ];

            return (
              <article
                className="assignment-card"
                key={assignment.id}
              >
                <div className="assignment-card-top">
                  <div className="assignment-icon">
                    <ClipboardCheck
                      size={21}
                    />
                  </div>

                  {submitted ? (
                    <span className="assignment-status submitted">
                      <CheckCircle2
                        size={14}
                      />
                      Submitted
                    </span>
                  ) : (
                    <span className="assignment-status pending">
                      Pending
                    </span>
                  )}
                </div>

                <span className="assignment-course">
                  {
                    assignment.courseTitle
                  }
                </span>

                <h2>
                  {assignment.title}
                </h2>

                <p>
                  {
                    assignment.description
                  }
                </p>

                <div className="assignment-meta">
                  <span>
                    <CalendarDays
                      size={15}
                    />
                    Due{' '}
                    {
                      assignment.dueDate
                    }
                  </span>

                  <span>
                    <Trophy
                      size={15}
                    />
                    {
                      assignment.points
                    }{' '}
                    points
                  </span>
                </div>

                {!submitted && (
                  <div className="assignment-upload-area">
                    <input
                      ref={(element) => {
                        inputRefs.current[
                          assignment.id
                        ] = element;
                      }}
                      type="file"
                      accept=".pdf,.zip,.js,.jsx,.ts,.tsx,.py,.txt,.doc,.docx"
                      id={`assignment-file-${assignment.id}`}
                      onChange={(
                        event,
                      ) =>
                        handleFileSelect(
                          assignment.id,
                          event,
                        )
                      }
                    />

                    {!selectedFile ? (
                      <label
                        htmlFor={`assignment-file-${assignment.id}`}
                        className="assignment-file-picker"
                      >
                        <Upload
                          size={20}
                        />

                        <div>
                          <strong>
                            Choose file
                          </strong>

                          <span>
                            PDF, ZIP,
                            code or
                            document
                          </span>
                        </div>
                      </label>
                    ) : (
                      <div className="selected-assignment-file">
                        <FileText
                          size={19}
                        />

                        <div>
                          <strong>
                            {
                              selectedFile.name
                            }
                          </strong>

                          <span>
                            {formatFileSize(
                              selectedFile.size,
                            )}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeSelectedFile(
                              assignment.id,
                            )
                          }
                          aria-label="Remove selected file"
                        >
                          <X
                            size={16}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {submitted &&
                  submission && (
                    <div className="assignment-submission-details">
                      <FileText
                        size={17}
                      />

                      <div>
                        <span>
                          Submitted
                          file
                        </span>

                        <strong>
                          {
                            submission.fileName
                          }
                        </strong>

                        {submission.fileSize >
                          0 && (
                          <small>
                            {formatFileSize(
                              submission.fileSize,
                            )}
                          </small>
                        )}
                      </div>
                    </div>
                  )}

                <div className="assignment-footer">
                  <div>
                    <FileText
                      size={16}
                    />

                    <span>
                      Course
                      assignment
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={
                      submitted ||
                      !selectedFile
                    }
                    className={
                      submitted
                        ? 'submitted'
                        : ''
                    }
                    onClick={() =>
                      handleSubmit(
                        assignment.id,
                      )
                    }
                  >
                    {submitted
                      ? 'Submitted'
                      : 'Submit assignment'}
                  </button>
                </div>
              </article>
            );
          },
        )}
      </div>
    </section>
  );
}

export default Assignments;