import { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  PlayCircle,
  Star,
  Users,
} from 'lucide-react';
import {
  Link,
  useParams,
} from 'react-router-dom';
import { lessonsByCourse } from '../data/learningData';
import { courseCatalogService } from '../services/courseCatalogService';
import { courseService } from '../services/courseService';

function CourseDetails() {
  const { courseId } =
    useParams();

  const course =
    courseId
      ? courseCatalogService.getCourseById(
          courseId,
        )
      : undefined;

  const [enrolled, setEnrolled] =
    useState(
      course
        ? courseService.isEnrolled(
            course,
          )
        : false,
    );

  if (!course) {
    return (
      <section className="course-not-found">
        <h1>
          Course not found
        </h1>

        <Link to="/courses">
          Return to courses
        </Link>
      </section>
    );
  }

  const activeCourse =
    course;

  function handleEnroll() {
    courseService.enroll(
      activeCourse.id,
    );

    setEnrolled(true);
  }

  const firstLesson =
    lessonsByCourse[
      activeCourse.id
    ]?.[0];

  return (
    <section className="course-details-page">
      <Link
        to="/courses"
        className="back-link"
      >
        <ArrowLeft
          size={16}
        />

        Back to courses
      </Link>

      <div className="course-hero">
        <div className="course-hero-content">
          <div className="course-detail-badges">
            <span>
              {
                activeCourse.category
              }
            </span>

            <span>
              {
                activeCourse.level
              }
            </span>
          </div>

          <h1>
            {
              activeCourse.title
            }
          </h1>

          <p>
            {
              activeCourse.description
            }
          </p>

          <div className="course-hero-meta">
            <span>
              <Star
                size={16}
                fill={
                  activeCourse.rating >
                  0
                    ? 'currentColor'
                    : 'none'
                }
              />

              {activeCourse.rating >
              0
                ? `${activeCourse.rating} rating`
                : 'New course'}
            </span>

            <span>
              <Users
                size={16}
              />

              {activeCourse.students.toLocaleString()}{' '}
              students
            </span>

            <span>
              <Clock3
                size={16}
              />

              {
                activeCourse.duration
              }
            </span>

            <span>
              <BookOpen
                size={16}
              />

              {
                activeCourse.lessons
              }{' '}
              lessons
            </span>
          </div>

          <p className="course-instructor-detail">
            Instructor:{' '}
            <strong>
              {
                activeCourse.instructor
              }
            </strong>
          </p>
        </div>

        <div className="course-enroll-card">
          <div className="course-preview">
            <PlayCircle
              size={48}
            />

            <span>
              Course preview
            </span>
          </div>

          {enrolled ? (
            <>
              <div className="enrollment-success">
                <CheckCircle2
                  size={18}
                />

                You are enrolled
              </div>

              {firstLesson ? (
                <Link
                  to={`/learn/${activeCourse.id}/${firstLesson.id}`}
                  className="course-primary-action course-learning-link"
                >
                  Continue learning
                </Link>
              ) : (
                <button
                  type="button"
                  className="course-primary-action"
                  disabled
                >
                  Lessons coming
                  soon
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              className="course-primary-action"
              onClick={
                handleEnroll
              }
            >
              Enroll in course
            </button>
          )}

          <small>
            Learn at your own
            pace and track your
            progress.
          </small>
        </div>
      </div>

      <div className="course-detail-grid">
        <div className="course-curriculum">
          <div className="course-section-heading">
            <h2>
              Course curriculum
            </h2>

            <p>
              {
                activeCourse.modules
                  .length
              }{' '}
              modules ·{' '}
              {
                activeCourse.lessons
              }{' '}
              lessons
            </p>
          </div>

          {activeCourse.modules.length >
          0 ? (
            <div className="module-list">
              {activeCourse.modules.map(
                (
                  module,
                  index,
                ) => (
                  <article
                    className="module-row"
                    key={
                      module.id
                    }
                  >
                    <div className="module-number">
                      {String(
                        index +
                          1,
                      ).padStart(
                        2,
                        '0',
                      )}
                    </div>

                    <div>
                      <h3>
                        {
                          module.title
                        }
                      </h3>

                      <span>
                        {
                          module.lessons
                        }{' '}
                        lessons
                      </span>
                    </div>

                    <BookOpen
                      size={
                        18
                      }
                    />
                  </article>
                ),
              )}
            </div>
          ) : (
            <div className="catalog-empty">
              <BookOpen
                size={28}
              />

              <h3>
                Curriculum
                coming soon
              </h3>

              <p>
                The instructor
                has not added
                modules to this
                course yet.
              </p>
            </div>
          )}
        </div>

        <aside className="course-learning-card">
          <h3>
            What you will get
          </h3>

          <ul>
            <li>
              <CheckCircle2
                size={16}
              />

              Structured video
              lessons
            </li>

            <li>
              <CheckCircle2
                size={16}
              />

              Course notes and
              bookmarks
            </li>

            <li>
              <CheckCircle2
                size={16}
              />

              Quizzes and
              assignments
            </li>

            <li>
              <CheckCircle2
                size={16}
              />

              AI-powered
              learning support
            </li>

            <li>
              <CheckCircle2
                size={16}
              />

              Progress tracking
            </li>

            <li>
              <CheckCircle2
                size={16}
              />

              Completion
              certificate
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

export default CourseDetails;