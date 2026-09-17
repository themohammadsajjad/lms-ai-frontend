import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Star,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { weeklyAnalytics } from '../data/instructorData';
import { instructorService } from '../services/instructorService';

type InstructorTab = 'overview' | 'courses' | 'reviews';

function InstructorDashboard() {
  const [activeTab, setActiveTab] =
    useState<InstructorTab>('overview');

  const [courses, setCourses] = useState(() =>
    instructorService.getCourses(),
  );

  const [reviews, setReviews] = useState(() =>
    instructorService.getReviews(),
  );

  const publishedCourses = courses.filter(
    (course) => course.status === 'published',
  ).length;

  const totalLearners = courses.reduce(
    (total, course) => total + course.learners,
    0,
  );

  const pendingReviews = reviews.filter(
    (review) => review.status === 'pending',
  ).length;

  const averageCompletion =
    courses.length > 0
      ? Math.round(
          courses.reduce(
            (total, course) =>
              total + course.completionRate,
            0,
          ) / courses.length,
        )
      : 0;

  const topCourse = [...courses].sort(
    (a, b) =>
      b.completionRate - a.completionRate,
  )[0];

  function handleCourseStatus(courseId: string) {
    setCourses(
      instructorService.toggleCourseStatus(courseId),
    );
  }

  function handleReview(
    reviewId: string,
    status: 'approved' | 'changes-requested',
  ) {
    setReviews(
      instructorService.updateReviewStatus(
        reviewId,
        status,
      ),
    );
  }

  return (
    <section className="instructor-page">
      <div className="instructor-heading">
        <div>
          <span className="eyebrow">
            Instructor workspace
          </span>

          <h1>Teaching overview</h1>

          <p>
            Manage courses, monitor learners and review
            student activity.
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
            <span>Published courses</span>
            <strong>{publishedCourses}</strong>
            <small>
              {courses.length} total courses
            </small>
          </div>
        </article>

        <article>
          <div className="instructor-stat-icon blue">
            <Users size={20} />
          </div>

          <div>
            <span>Active learners</span>
            <strong>{totalLearners}</strong>
            <small>Across all courses</small>
          </div>
        </article>

        <article>
          <div className="instructor-stat-icon orange">
            <ClipboardCheck size={20} />
          </div>

          <div>
            <span>Pending reviews</span>
            <strong>{pendingReviews}</strong>
            <small>Assignments awaiting review</small>
          </div>
        </article>

        <article>
          <div className="instructor-stat-icon green">
            <TrendingUp size={20} />
          </div>

          <div>
            <span>Avg. completion</span>
            <strong>{averageCompletion}%</strong>
            <small>Learner completion rate</small>
          </div>
        </article>
      </div>

      <div className="instructor-tabs">
        <button
          type="button"
          className={
            activeTab === 'overview' ? 'active' : ''
          }
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>

        <button
          type="button"
          className={
            activeTab === 'courses' ? 'active' : ''
          }
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </button>

        <button
          type="button"
          className={
            activeTab === 'reviews' ? 'active' : ''
          }
          onClick={() => setActiveTab('reviews')}
        >
          Reviews

          {pendingReviews > 0 && (
            <span>{pendingReviews}</span>
          )}
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="instructor-overview-grid">
          <section className="instructor-panel analytics-panel">
            <div className="instructor-panel-heading">
              <div>
                <span>Engagement analytics</span>
                <h2>Weekly learner activity</h2>
                <p>
                  Course engagement across the last
                  seven days.
                </p>
              </div>

              <div className="analytics-change">
                <TrendingUp size={14} />
                12.4%
              </div>
            </div>

            <div className="analytics-chart">
              {weeklyAnalytics.map((item) => (
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
                      <span>{item.value}</span>
                    </div>
                  </div>

                  <small>{item.label}</small>
                </div>
              ))}
            </div>
          </section>

          <aside className="instructor-panel top-course-panel">
            <div className="instructor-panel-heading">
              <div>
                <span>Top performance</span>
                <h2>Leading course</h2>
              </div>
            </div>

            {topCourse && (
              <>
                <div className="top-course-icon">
                  <BookOpen size={24} />
                </div>

                <span className="top-course-category">
                  {topCourse.category}
                </span>

                <h3>{topCourse.title}</h3>

                <div className="top-course-rating">
                  <Star
                    size={14}
                    fill="currentColor"
                  />
                  {topCourse.rating}
                </div>

                <div className="top-course-metrics">
                  <div>
                    <span>Learners</span>
                    <strong>
                      {topCourse.learners}
                    </strong>
                  </div>

                  <div>
                    <span>Completion</span>
                    <strong>
                      {topCourse.completionRate}%
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
                <span>Course portfolio</span>
                <h2>Course performance</h2>
                <p>
                  Current learner and completion data.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveTab('courses')
                }
              >
                View all
              </button>
            </div>

            <div className="instructor-course-overview-list">
              {courses.slice(0, 3).map((course) => (
                <article key={course.id}>
                  <div className="course-overview-icon">
                    <BookOpen size={18} />
                  </div>

                  <div className="course-overview-main">
                    <span>{course.category}</span>
                    <strong>{course.title}</strong>

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
                      {course.completionRate}%
                    </strong>
                    <span>
                      {course.learners} learners
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="instructor-panel review-preview-panel">
            <div className="instructor-panel-heading">
              <div>
                <span>Review queue</span>
                <h2>Needs your attention</h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveTab('reviews')
                }
              >
                Review all
              </button>
            </div>

            <div className="review-preview-list">
              {reviews
                .filter(
                  (review) =>
                    review.status === 'pending',
                )
                .slice(0, 3)
                .map((review) => (
                  <article key={review.id}>
                    <div className="review-student-avatar">
                      {review.studentName
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>
                        {review.studentName}
                      </strong>

                      <span>
                        {review.assignmentTitle}
                      </span>
                    </div>

                    <small>
                      {review.submittedAt}
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

              <h2>Your courses</h2>

              <p>
                Monitor learner activity and control
                publishing status.
              </p>
            </div>

            <div className="course-status-summary">
              <strong>
                {publishedCourses}
              </strong>
              <span>Published</span>
            </div>
          </div>

          <div className="instructor-course-grid">
            {courses.map((course) => (
              <article
                className="instructor-course-card"
                key={course.id}
              >
                <div className="instructor-course-card-header">
                  <div className="instructor-course-card-icon">
                    <BookOpen size={21} />
                  </div>

                  <span
                    className={`course-publish-status ${course.status}`}
                  >
                    {course.status}
                  </span>
                </div>

                <span className="instructor-course-category">
                  {course.category}
                </span>

                <h3>{course.title}</h3>

                <div className="instructor-course-card-meta">
                  <span>
                    <Users size={14} />
                    {course.learners} learners
                  </span>

                  <span>
                    <BookOpen size={14} />
                    {course.lessons} lessons
                  </span>

                  <span>
                    <Star
                      size={14}
                      fill="currentColor"
                    />
                    {course.rating}
                  </span>
                </div>

                <div className="instructor-course-progress">
                  <div>
                    <span>Completion</span>

                    <strong>
                      {course.completionRate}%
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
                    Updated {course.updatedAt}
                  </span>

                  <button
                    type="button"
                    className={
                      course.status === 'published'
                        ? 'unpublish'
                        : 'publish'
                    }
                    onClick={() =>
                      handleCourseStatus(course.id)
                    }
                  >
                    {course.status === 'published'
                      ? 'Move to draft'
                      : 'Publish course'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'reviews' && (
        <section className="instructor-review-section">
          <div className="instructor-section-heading">
            <div>
              <span className="eyebrow">
                Assignment reviews
              </span>

              <h2>Student submissions</h2>

              <p>
                Review submitted work and update
                assessment status.
              </p>
            </div>

            <div className="course-status-summary">
              <strong>
                {pendingReviews}
              </strong>
              <span>Pending</span>
            </div>
          </div>

          <div className="instructor-review-list">
            {reviews.map((review) => (
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
                      {review.courseTitle}
                    </span>

                    <h3>
                      {review.assignmentTitle}
                    </h3>

                    <p>
                      Submitted by{' '}
                      <strong>
                        {review.studentName}
                      </strong>{' '}
                      · {review.submittedAt}
                    </p>
                  </div>

                  <span
                    className={`review-status ${review.status}`}
                  >
                    {review.status === 'pending' && (
                      <Clock3 size={13} />
                    )}

                    {review.status === 'approved' && (
                      <CheckCircle2 size={13} />
                    )}

                    {review.status ===
                      'changes-requested' && (
                      <XCircle size={13} />
                    )}

                    {review.status ===
                    'changes-requested'
                      ? 'Changes requested'
                      : review.status}
                  </span>
                </div>

                {review.status === 'pending' && (
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
                      <XCircle size={15} />
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
                      <CheckCircle2 size={15} />
                      Approve
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

export default InstructorDashboard;