import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Plus,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import InstructorAssignments from '../components/instructor/InstructorAssignments';
import InstructorMaterials from '../components/instructor/InstructorMaterials';
import {
  weeklyAnalytics,
  type PricingTier,
} from '../data/instructorData';
import { instructorService } from '../services/instructorService';

type InstructorTab =
  | 'overview'
  | 'courses'
  | 'materials'
  | 'assignments'
  | 'reviews'
  | 'ai-quizzes';

function InstructorDashboard() {
  const [activeTab, setActiveTab] =
    useState<InstructorTab>('overview');

  const [courses, setCourses] = useState(() =>
    instructorService.getCourses(),
  );

  const [reviews, setReviews] = useState(() =>
    instructorService.getReviews(),
  );

  const [aiQuizzes, setAIQuizzes] = useState(() =>
    instructorService.getAIQuizDrafts(),
  );

  const [
    showCreateCourse,
    setShowCreateCourse,
  ] = useState(false);

  const [courseForm, setCourseForm] =
    useState<{
      title: string;
      description: string;
      category: string;
      thumbnail: string;
      pricingTier: PricingTier;
    }>({
      title: '',
      description: '',
      category: 'Web Development',
      thumbnail: '',
      pricingTier: 'Free',
    });

  const publishedCourses = courses.filter(
    (course) =>
      course.status === 'published',
  ).length;

  const totalLearners = courses.reduce(
    (total, course) =>
      total + course.learners,
    0,
  );

  const pendingReviews = reviews.filter(
    (review) =>
      review.status === 'pending',
  ).length;

  const pendingAIQuizzes = aiQuizzes.filter(
    (quiz) =>
      quiz.status === 'pending',
  ).length;

  const publishedCourseList =
    courses.filter(
      (course) =>
        course.status === 'published',
    );

  const averageCompletion =
    publishedCourseList.length > 0
      ? Math.round(
          publishedCourseList.reduce(
            (total, course) =>
              total +
              course.completionRate,
            0,
          ) /
            publishedCourseList.length,
        )
      : 0;

  const topCourse = [...courses]
    .filter(
      (course) =>
        course.status === 'published',
    )
    .sort(
      (a, b) =>
        b.completionRate -
        a.completionRate,
    )[0];

  function handleCourseStatus(
    courseId: string,
  ) {
    setCourses(
      instructorService.toggleCourseStatus(
        courseId,
      ),
    );
  }

  function handleReview(
    reviewId: string,
    status:
      | 'approved'
      | 'changes-requested',
  ) {
    setReviews(
      instructorService.updateReviewStatus(
        reviewId,
        status,
      ),
    );
  }

  function handleAIQuizReview(
    quizId: string,
    status:
      | 'approved'
      | 'changes-requested',
  ) {
    setAIQuizzes(
      instructorService.updateAIQuizStatus(
        quizId,
        status,
      ),
    );
  }

  function handleCreateCourse() {
    if (
      !courseForm.title.trim() ||
      !courseForm.description.trim() ||
      !courseForm.category.trim()
    ) {
      return;
    }

    setCourses(
      instructorService.createCourse(
        courseForm,
      ),
    );

    setCourseForm({
      title: '',
      description: '',
      category: 'Web Development',
      thumbnail: '',
      pricingTier: 'Free',
    });

    setShowCreateCourse(false);
    setActiveTab('courses');
  }

  function closeCreateCourse() {
    setShowCreateCourse(false);
  }

  return (
    <section className="instructor-page">
      <div className="instructor-heading">
        <div>
          <span className="eyebrow">
            Instructor workspace
          </span>

          <h1>
            Teaching overview
          </h1>

          <p>
            Manage courses, learning
            materials, assignments,
            learners, student submissions
            and AI-generated assessments.
          </p>
        </div>

        <div className="instructor-period">
          <BarChart3 size={16} />
          Current semester
        </div>
      </div>

      <div className="instructor-stats-grid">
        <article>
          <div className="instructor-stat-icon purple">
            <BookOpen size={20} />
          </div>

          <div>
            <span>
              Published courses
            </span>

            <strong>
              {publishedCourses}
            </strong>

            <small>
              {courses.length} total
              courses
            </small>
          </div>
        </article>

        <article>
          <div className="instructor-stat-icon blue">
            <Users size={20} />
          </div>

          <div>
            <span>
              Active learners
            </span>

            <strong>
              {totalLearners}
            </strong>

            <small>
              Across all courses
            </small>
          </div>
        </article>

        <article>
          <div className="instructor-stat-icon orange">
            <ClipboardCheck
              size={20}
            />
          </div>

          <div>
            <span>
              Pending reviews
            </span>

            <strong>
              {pendingReviews}
            </strong>

            <small>
              Assignments awaiting review
            </small>
          </div>
        </article>

        <article>
          <div className="instructor-stat-icon green">
            <TrendingUp
              size={20}
            />
          </div>

          <div>
            <span>
              Avg. completion
            </span>

            <strong>
              {averageCompletion}%
            </strong>

            <small>
              Published courses only
            </small>
          </div>
        </article>
      </div>

      <div className="instructor-tabs">
        <button
          type="button"
          className={
            activeTab === 'overview'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveTab('overview')
          }
        >
          Overview
        </button>

        <button
          type="button"
          className={
            activeTab === 'courses'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveTab('courses')
          }
        >
          Courses
        </button>

        <button
          type="button"
          className={
            activeTab === 'materials'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveTab('materials')
          }
        >
          Materials
        </button>

        <button
          type="button"
          className={
            activeTab === 'assignments'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveTab(
              'assignments',
            )
          }
        >
          Assignments
        </button>

        <button
          type="button"
          className={
            activeTab === 'reviews'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveTab('reviews')
          }
        >
          Reviews

          {pendingReviews > 0 && (
            <span>
              {pendingReviews}
            </span>
          )}
        </button>

        <button
          type="button"
          className={
            activeTab === 'ai-quizzes'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveTab(
              'ai-quizzes',
            )
          }
        >
          AI Quiz Review

          {pendingAIQuizzes > 0 && (
            <span>
              {pendingAIQuizzes}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="instructor-overview-grid">
          <section className="instructor-panel analytics-panel">
            <div className="instructor-panel-heading">
              <div>
                <span>
                  Engagement analytics
                </span>

                <h2>
                  Weekly learner activity
                </h2>

                <p>
                  Course engagement across
                  the last seven days.
                </p>
              </div>

              <div className="analytics-change">
                <TrendingUp
                  size={14}
                />
                12.4%
              </div>
            </div>

            <div className="analytics-chart">
              {weeklyAnalytics.map(
                (item) => (
                  <div
                    className="analytics-column"
                    key={item.label}
                  >
                    <div className="analytics-bar-area">
                      <div
                        className="analytics-bar"
                        style={{
                          height: `${item.value}%`,
                        }}
                      >
                        <span>
                          {item.value}
                        </span>
                      </div>
                    </div>

                    <small>
                      {item.label}
                    </small>
                  </div>
                ),
              )}
            </div>
          </section>

          <aside className="instructor-panel top-course-panel">
            <div className="instructor-panel-heading">
              <div>
                <span>
                  Top performance
                </span>

                <h2>
                  Leading course
                </h2>
              </div>
            </div>

            {topCourse && (
              <>
                <div className="top-course-icon">
                  <BookOpen
                    size={24}
                  />
                </div>

                <span className="top-course-category">
                  {
                    topCourse.category
                  }
                </span>

                <h3>
                  {topCourse.title}
                </h3>

                <div className="top-course-rating">
                  <Star
                    size={14}
                    fill="currentColor"
                  />

                  {topCourse.rating}
                </div>

                <div className="top-course-metrics">
                  <div>
                    <span>
                      Learners
                    </span>

                    <strong>
                      {
                        topCourse.learners
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Completion
                    </span>

                    <strong>
                      {
                        topCourse.completionRate
                      }
                      %
                    </strong>
                  </div>
                </div>

                <div className="top-course-progress">
                  <div
                    style={{
                      width: `${topCourse.completionRate}%`,
                    }}
                  />
                </div>
              </>
            )}
          </aside>

          <section className="instructor-panel recent-courses-panel">
            <div className="instructor-panel-heading">
              <div>
                <span>
                  Course portfolio
                </span>

                <h2>
                  Course performance
                </h2>

                <p>
                  Current learner and
                  completion data.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    'courses',
                  )
                }
              >
                View all
              </button>
            </div>

            <div className="instructor-course-overview-list">
              {courses
                .slice(0, 3)
                .map((course) => (
                  <article
                    key={course.id}
                  >
                    <div className="course-overview-icon">
                      <BookOpen
                        size={18}
                      />
                    </div>

                    <div className="course-overview-main">
                      <span>
                        {
                          course.category
                        }
                      </span>

                      <strong>
                        {
                          course.title
                        }
                      </strong>

                      <div>
                        <div
                          style={{
                            width: `${course.completionRate}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="course-overview-data">
                      <strong>
                        {
                          course.completionRate
                        }
                        %
                      </strong>

                      <span>
                        {
                          course.learners
                        }{' '}
                        learners
                      </span>
                    </div>
                  </article>
                ))}
            </div>
          </section>

          <section className="instructor-panel review-preview-panel">
            <div className="instructor-panel-heading">
              <div>
                <span>
                  Review queue
                </span>

                <h2>
                  Needs your attention
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    'reviews',
                  )
                }
              >
                Review all
              </button>
            </div>

            <div className="review-preview-list">
              {reviews
                .filter(
                  (review) =>
                    review.status ===
                    'pending',
                )
                .slice(0, 3)
                .map((review) => (
                  <article
                    key={review.id}
                  >
                    <div className="review-student-avatar">
                      {review.studentName
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>
                        {
                          review.studentName
                        }
                      </strong>

                      <span>
                        {
                          review.assignmentTitle
                        }
                      </span>
                    </div>

                    <small>
                      {
                        review.submittedAt
                      }
                    </small>
                  </article>
                ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'courses' && (
        <section className="instructor-course-management">
          <div className="instructor-section-heading">
            <div>
              <span className="eyebrow">
                Course management
              </span>

              <h2>
                Your courses
              </h2>

              <p>
                Create courses, monitor
                learner activity and
                control publishing status.
              </p>
            </div>

            <div className="instructor-course-heading-actions">
              <button
                type="button"
                className="create-course-button"
                onClick={() =>
                  setShowCreateCourse(
                    true,
                  )
                }
              >
                <Plus size={15} />
                Create course
              </button>

              <div className="course-status-summary">
                <strong>
                  {publishedCourses}
                </strong>

                <span>
                  Published
                </span>
              </div>
            </div>
          </div>

          <div className="instructor-course-grid">
            {courses.map(
              (course) => (
                <article
                  className="instructor-course-card"
                  key={course.id}
                >
                  <div className="instructor-course-card-header">
                    <div className="instructor-course-card-icon">
                      <BookOpen
                        size={21}
                      />
                    </div>

                    <span
                      className={`course-publish-status ${course.status}`}
                    >
                      {
                        course.status
                      }
                    </span>
                  </div>

                  <span className="instructor-course-category">
                    {
                      course.category
                    }
                  </span>

                  {course.pricingTier && (
                    <span className="course-pricing-tier">
                      {
                        course.pricingTier
                      }
                    </span>
                  )}

                  <h3>
                    {course.title}
                  </h3>

                  {course.description && (
                    <p className="instructor-course-description">
                      {
                        course.description
                      }
                    </p>
                  )}

                  <div className="instructor-course-card-meta">
                    <span>
                      <Users
                        size={14}
                      />

                      {
                        course.learners
                      }{' '}
                      learners
                    </span>

                    <span>
                      <BookOpen
                        size={14}
                      />

                      {
                        course.lessons
                      }{' '}
                      lessons
                    </span>

                    <span>
                      <Star
                        size={14}
                        fill={
                          course.rating >
                          0
                            ? 'currentColor'
                            : 'none'
                        }
                      />

                      {course.rating >
                      0
                        ? course.rating
                        : 'New'}
                    </span>
                  </div>

                  <div className="instructor-course-progress">
                    <div>
                      <span>
                        Completion
                      </span>

                      <strong>
                        {
                          course.completionRate
                        }
                        %
                      </strong>
                    </div>

                    <div className="instructor-progress-track">
                      <div
                        style={{
                          width: `${course.completionRate}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="instructor-course-footer">
                    <span>
                      Updated{' '}
                      {
                        course.updatedAt
                      }
                    </span>

                    <button
                      type="button"
                      className={
                        course.status ===
                        'published'
                          ? 'unpublish'
                          : 'publish'
                      }
                      onClick={() =>
                        handleCourseStatus(
                          course.id,
                        )
                      }
                    >
                      {course.status ===
                      'published'
                        ? 'Move to draft'
                        : 'Publish course'}
                    </button>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>
      )}

      {activeTab ===
        'materials' && (
        <InstructorMaterials />
      )}

      {activeTab ===
        'assignments' && (
        <InstructorAssignments />
      )}

      {activeTab === 'reviews' && (
        <section className="instructor-review-section">
          <div className="instructor-section-heading">
            <div>
              <span className="eyebrow">
                Assignment reviews
              </span>

              <h2>
                Student submissions
              </h2>

              <p>
                Review submitted work and
                update assessment status.
              </p>
            </div>

            <div className="course-status-summary">
              <strong>
                {pendingReviews}
              </strong>

              <span>
                Pending
              </span>
            </div>
          </div>

          <div className="instructor-review-list">
            {reviews.map(
              (review) => (
                <article
                  className="instructor-review-card"
                  key={review.id}
                >
                  <div className="review-student-avatar large">
                    {review.studentName
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="review-main-info">
                    <div>
                      <span>
                        {
                          review.courseTitle
                        }
                      </span>

                      <h3>
                        {
                          review.assignmentTitle
                        }
                      </h3>

                      <p>
                        Submitted by{' '}
                        <strong>
                          {
                            review.studentName
                          }
                        </strong>{' '}
                        ·{' '}
                        {
                          review.submittedAt
                        }
                      </p>
                    </div>

                    <span
                      className={`review-status ${review.status}`}
                    >
                      {review.status ===
                        'pending' && (
                        <Clock3
                          size={13}
                        />
                      )}

                      {review.status ===
                        'approved' && (
                        <CheckCircle2
                          size={13}
                        />
                      )}

                      {review.status ===
                        'changes-requested' && (
                        <XCircle
                          size={13}
                        />
                      )}

                      {review.status ===
                      'changes-requested'
                        ? 'Changes requested'
                        : review.status}
                    </span>
                  </div>

                  {review.status ===
                    'pending' && (
                    <div className="review-actions">
                      <button
                        type="button"
                        className="request-changes"
                        onClick={() =>
                          handleReview(
                            review.id,
                            'changes-requested',
                          )
                        }
                      >
                        <XCircle
                          size={15}
                        />
                        Request changes
                      </button>

                      <button
                        type="button"
                        className="approve-review"
                        onClick={() =>
                          handleReview(
                            review.id,
                            'approved',
                          )
                        }
                      >
                        <CheckCircle2
                          size={15}
                        />
                        Approve
                      </button>
                    </div>
                  )}
                </article>
              ),
            )}
          </div>
        </section>
      )}

      {activeTab ===
        'ai-quizzes' && (
        <section className="ai-quiz-review-section">
          <div className="instructor-section-heading">
            <div>
              <span className="eyebrow">
                AI-generated assessments
              </span>

              <h2>
                Quiz review queue
              </h2>

              <p>
                Review automatically
                generated quiz drafts
                before making them
                available to students.
              </p>
            </div>

            <div className="course-status-summary">
              <strong>
                {pendingAIQuizzes}
              </strong>

              <span>
                Pending
              </span>
            </div>
          </div>

          <div className="ai-quiz-review-list">
            {aiQuizzes.map(
              (quiz) => (
                <article
                  className="ai-quiz-review-card"
                  key={quiz.id}
                >
                  <div className="ai-quiz-review-header">
                    <div className="ai-quiz-review-title">
                      <div className="ai-quiz-review-icon">
                        <Sparkles
                          size={21}
                        />
                      </div>

                      <div>
                        <span>
                          {
                            quiz.courseTitle
                          }
                        </span>

                        <h3>
                          {quiz.title}
                        </h3>

                        <p>
                          Generated from{' '}
                          <strong>
                            {
                              quiz.lectureTitle
                            }
                          </strong>
                          {' · '}
                          {
                            quiz.generatedAt
                          }
                        </p>
                      </div>
                    </div>

                    <span
                      className={`ai-quiz-review-status ${quiz.status}`}
                    >
                      {quiz.status ===
                        'pending' && (
                        <Clock3
                          size={13}
                        />
                      )}

                      {quiz.status ===
                        'approved' && (
                        <CheckCircle2
                          size={13}
                        />
                      )}

                      {quiz.status ===
                        'changes-requested' && (
                        <XCircle
                          size={13}
                        />
                      )}

                      {quiz.status ===
                      'changes-requested'
                        ? 'Changes requested'
                        : quiz.status}
                    </span>
                  </div>

                  <div className="ai-generated-label">
                    <Sparkles
                      size={13}
                    />

                    AI-generated draft ·{' '}
                    {
                      quiz.questions
                        .length
                    }{' '}
                    questions
                  </div>

                  <div className="ai-quiz-question-list">
                    {quiz.questions.map(
                      (
                        question,
                        index,
                      ) => (
                        <div
                          className="ai-quiz-question-preview"
                          key={
                            question.id
                          }
                        >
                          <div className="ai-quiz-question-number">
                            {index +
                              1}
                          </div>

                          <div className="ai-quiz-question-body">
                            <h4>
                              {
                                question.question
                              }
                            </h4>

                            <div className="ai-quiz-option-preview">
                              {question.options.map(
                                (
                                  option,
                                  optionIndex,
                                ) => (
                                  <span
                                    className={
                                      optionIndex ===
                                      question.correctAnswer
                                        ? 'correct'
                                        : ''
                                    }
                                    key={
                                      option
                                    }
                                  >
                                    <b>
                                      {String.fromCharCode(
                                        65 +
                                          optionIndex,
                                      )}
                                    </b>

                                    {
                                      option
                                    }

                                    {optionIndex ===
                                      question.correctAnswer && (
                                      <CheckCircle2
                                        size={
                                          12
                                        }
                                      />
                                    )}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>

                  {quiz.status ===
                    'pending' ? (
                    <div className="ai-quiz-review-actions">
                      <button
                        type="button"
                        className="request-changes"
                        onClick={() =>
                          handleAIQuizReview(
                            quiz.id,
                            'changes-requested',
                          )
                        }
                      >
                        <XCircle
                          size={15}
                        />
                        Request changes
                      </button>

                      <button
                        type="button"
                        className="approve-review"
                        onClick={() =>
                          handleAIQuizReview(
                            quiz.id,
                            'approved',
                          )
                        }
                      >
                        <CheckCircle2
                          size={15}
                        />
                        Approve quiz
                      </button>
                    </div>
                  ) : (
                    <div className="ai-quiz-reviewed-message">
                      {quiz.status ===
                      'approved' ? (
                        <CheckCircle2
                          size={15}
                        />
                      ) : (
                        <XCircle
                          size={15}
                        />
                      )}

                      {quiz.status ===
                      'approved'
                        ? 'Quiz approved for student use.'
                        : 'Quiz returned for changes.'}
                    </div>
                  )}
                </article>
              ),
            )}
          </div>
        </section>
      )}

      {showCreateCourse && (
        <div
          className="course-modal-backdrop"
          role="presentation"
          onMouseDown={(
            event,
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeCreateCourse();
            }
          }}
        >
          <div
            className="course-create-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-course-title"
          >
            <div className="course-create-modal-header">
              <div>
                <span className="eyebrow">
                  Course authoring
                </span>

                <h2 id="create-course-title">
                  Create new course
                </h2>

                <p>
                  Add the basic course
                  information. New courses
                  begin as drafts.
                </p>
              </div>

              <button
                type="button"
                className="course-modal-close"
                onClick={
                  closeCreateCourse
                }
                aria-label="Close create course form"
              >
                <X size={18} />
              </button>
            </div>

            <div className="course-create-form">
              <label className="course-form-field course-form-full">
                <span>
                  Course title
                </span>

                <input
                  type="text"
                  value={
                    courseForm.title
                  }
                  onChange={(
                    event,
                  ) =>
                    setCourseForm(
                      (
                        current,
                      ) => ({
                        ...current,
                        title:
                          event
                            .target
                            .value,
                      }),
                    )
                  }
                  placeholder="e.g. Advanced React Patterns"
                />
              </label>

              <label className="course-form-field course-form-full">
                <span>
                  Description
                </span>

                <textarea
                  value={
                    courseForm.description
                  }
                  onChange={(
                    event,
                  ) =>
                    setCourseForm(
                      (
                        current,
                      ) => ({
                        ...current,
                        description:
                          event
                            .target
                            .value,
                      }),
                    )
                  }
                  placeholder="Describe what students will learn..."
                  rows={4}
                />
              </label>

              <label className="course-form-field">
                <span>
                  Category
                </span>

                <select
                  value={
                    courseForm.category
                  }
                  onChange={(
                    event,
                  ) =>
                    setCourseForm(
                      (
                        current,
                      ) => ({
                        ...current,
                        category:
                          event
                            .target
                            .value,
                      }),
                    )
                  }
                >
                  <option value="Web Development">
                    Web Development
                  </option>

                  <option value="Data Science">
                    Data Science
                  </option>

                  <option value="Artificial Intelligence">
                    Artificial
                    Intelligence
                  </option>

                  <option value="Design">
                    Design
                  </option>

                  <option value="Programming">
                    Programming
                  </option>
                </select>
              </label>

              <label className="course-form-field">
                <span>
                  Pricing tier
                </span>

                <select
                  value={
                    courseForm.pricingTier
                  }
                  onChange={(
                    event,
                  ) =>
                    setCourseForm(
                      (
                        current,
                      ) => ({
                        ...current,
                        pricingTier:
                          event
                            .target
                            .value as PricingTier,
                      }),
                    )
                  }
                >
                  <option value="Free">
                    Free
                  </option>

                  <option value="Standard">
                    Standard
                  </option>

                  <option value="Premium">
                    Premium
                  </option>
                </select>
              </label>

              <label className="course-form-field course-form-full">
                <span>
                  Thumbnail URL
                </span>

                <input
                  type="url"
                  value={
                    courseForm.thumbnail
                  }
                  onChange={(
                    event,
                  ) =>
                    setCourseForm(
                      (
                        current,
                      ) => ({
                        ...current,
                        thumbnail:
                          event
                            .target
                            .value,
                      }),
                    )
                  }
                  placeholder="https://example.com/course-thumbnail.jpg"
                />

                <small>
                  Optional for this
                  frontend demo.
                </small>
              </label>

              {courseForm.thumbnail.trim() && (
                <div className="course-thumbnail-preview course-form-full">
                  <span>
                    Thumbnail preview
                  </span>

                  <img
                    src={
                      courseForm.thumbnail
                    }
                    alt="Course thumbnail preview"
                  />
                </div>
              )}
            </div>

            <div className="course-create-modal-footer">
              <button
                type="button"
                className="course-create-cancel"
                onClick={
                  closeCreateCourse
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="course-create-submit"
                disabled={
                  !courseForm.title.trim() ||
                  !courseForm.description.trim() ||
                  !courseForm.category.trim()
                }
                onClick={
                  handleCreateCourse
                }
              >
                <Plus size={15} />
                Create draft
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default InstructorDashboard;