import {
  BarChart3,
  Clock3,
  Eye,
  Gauge,
  TrendingDown,
  Trophy,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { instructorAnalyticsData } from '../../data/instructorAnalyticsData';

function InstructorAnalytics() {
  const [courseTitle, setCourseTitle] =
    useState(
      instructorAnalyticsData[0]
        ?.courseTitle ?? '',
    );

  const selectedAnalytics =
    useMemo(
      () =>
        instructorAnalyticsData.find(
          (course) =>
            course.courseTitle ===
            courseTitle,
        ),
      [courseTitle],
    );

  if (!selectedAnalytics) {
    return (
      <section className="instructor-analytics-section">
        <div className="analytics-empty-state">
          <BarChart3 size={30} />

          <h3>
            No analytics available
          </h3>

          <p>
            Analytics will appear once
            learner activity is available.
          </p>
        </div>
      </section>
    );
  }

  const highestDropOffLecture =
    [...selectedAnalytics.lectures].sort(
      (a, b) =>
        b.dropOffRate -
        a.dropOffRate,
    )[0];

  const averageDropOff =
    selectedAnalytics.lectures.length >
    0
      ? Math.round(
          selectedAnalytics.lectures.reduce(
            (total, lecture) =>
              total +
              lecture.dropOffRate,
            0,
          ) /
            selectedAnalytics.lectures
              .length,
        )
      : 0;

  return (
    <section className="instructor-analytics-section">
      <div className="instructor-section-heading">
        <div>
          <span className="eyebrow">
            Learning analytics
          </span>

          <h2>
            Course performance
          </h2>

          <p>
            Monitor learner engagement,
            quiz performance and
            lecture-level drop-off.
          </p>
        </div>

        <label className="analytics-course-selector">
          <span>
            Course
          </span>

          <select
            value={courseTitle}
            onChange={(event) =>
              setCourseTitle(
                event.target.value,
              )
            }
          >
            {instructorAnalyticsData.map(
              (course) => (
                <option
                  key={
                    course.courseTitle
                  }
                  value={
                    course.courseTitle
                  }
                >
                  {
                    course.courseTitle
                  }
                </option>
              ),
            )}
          </select>
        </label>
      </div>

      <div className="analytics-metric-grid">
        <article className="analytics-metric-card">
          <div className="analytics-metric-icon purple">
            <Trophy size={19} />
          </div>

          <div>
            <span>
              Avg. quiz score
            </span>

            <strong>
              {
                selectedAnalytics.averageQuizScore
              }
              %
            </strong>

            <small>
              Across course quizzes
            </small>
          </div>
        </article>

        <article className="analytics-metric-card">
          <div className="analytics-metric-icon blue">
            <Clock3 size={19} />
          </div>

          <div>
            <span>
              Avg. time-on-task
            </span>

            <strong>
              {
                selectedAnalytics.averageTimeOnTaskMinutes
              }{' '}
              min
            </strong>

            <small>
              Per active learner
            </small>
          </div>
        </article>

        <article className="analytics-metric-card">
          <div className="analytics-metric-icon green">
            <Gauge size={19} />
          </div>

          <div>
            <span>
              Completion rate
            </span>

            <strong>
              {
                selectedAnalytics.completionRate
              }
              %
            </strong>

            <small>
              Course completion
            </small>
          </div>
        </article>

        <article className="analytics-metric-card">
          <div className="analytics-metric-icon orange">
            <TrendingDown
              size={19}
            />
          </div>

          <div>
            <span>
              Avg. drop-off
            </span>

            <strong>
              {averageDropOff}%
            </strong>

            <small>
              Across lectures
            </small>
          </div>
        </article>
      </div>

      <div className="analytics-content-grid">
        <section className="analytics-dropoff-panel">
          <div className="analytics-panel-heading">
            <div>
              <span>
                Lecture engagement
              </span>

              <h3>
                Per-lecture drop-off
              </h3>

              <p>
                Identify where learners
                stop progressing through
                the course.
              </p>
            </div>

            <div className="analytics-learner-count">
              <Users size={15} />

              <strong>
                {
                  selectedAnalytics.totalLearners
                }
              </strong>

              <span>
                learners
              </span>
            </div>
          </div>

          <div className="lecture-dropoff-list">
            {selectedAnalytics.lectures.map(
              (
                lecture,
                index,
              ) => (
                <article
                  className="lecture-dropoff-row"
                  key={lecture.id}
                >
                  <div className="lecture-dropoff-number">
                    {index + 1}
                  </div>

                  <div className="lecture-dropoff-main">
                    <div className="lecture-dropoff-title">
                      <div>
                        <h4>
                          {
                            lecture.title
                          }
                        </h4>

                        <span>
                          {
                            lecture.completed
                          }{' '}
                          of{' '}
                          {
                            lecture.viewers
                          }{' '}
                          viewers completed
                        </span>
                      </div>

                      <strong
                        className={
                          lecture.dropOffRate >=
                          20
                            ? 'high'
                            : lecture.dropOffRate >=
                                10
                              ? 'medium'
                              : 'low'
                        }
                      >
                        {
                          lecture.dropOffRate
                        }
                        % drop-off
                      </strong>
                    </div>

                    <div className="lecture-dropoff-track">
                      <div
                        style={{
                          width: `${Math.min(
                            lecture.dropOffRate,
                            100,
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="lecture-dropoff-meta">
                      <span>
                        <Eye
                          size={13}
                        />

                        {
                          lecture.viewers
                        }{' '}
                        viewers
                      </span>

                      <span>
                        <Clock3
                          size={13}
                        />

                        {
                          lecture.averageWatchMinutes
                        }{' '}
                        min avg. watch
                      </span>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <aside className="analytics-insight-panel">
          <div className="analytics-insight-icon">
            <TrendingDown
              size={22}
            />
          </div>

          <span>
            Needs attention
          </span>

          <h3>
            Highest learner drop-off
          </h3>

          {highestDropOffLecture && (
            <>
              <strong className="analytics-insight-value">
                {
                  highestDropOffLecture.dropOffRate
                }
                %
              </strong>

              <h4>
                {
                  highestDropOffLecture.title
                }
              </h4>

              <p>
                {
                  highestDropOffLecture.completed
                }{' '}
                of{' '}
                {
                  highestDropOffLecture.viewers
                }{' '}
                viewers completed this
                lecture.
              </p>

              <div className="analytics-insight-watch">
                <Clock3
                  size={14}
                />

                Average watch time:{' '}
                <strong>
                  {
                    highestDropOffLecture.averageWatchMinutes
                  }{' '}
                  min
                </strong>
              </div>
            </>
          )}
        </aside>
      </div>

      <section className="analytics-summary-panel">
        <div>
          <BarChart3 size={20} />

          <div>
            <span>
              Analytics summary
            </span>

            <h3>
              {
                selectedAnalytics.courseTitle
              }
            </h3>
          </div>
        </div>

        <p>
          Learners currently average{' '}
          <strong>
            {
              selectedAnalytics.averageQuizScore
            }
            %
          </strong>{' '}
          on quizzes and spend about{' '}
          <strong>
            {
              selectedAnalytics.averageTimeOnTaskMinutes
            }{' '}
            minutes
          </strong>{' '}
          on learning tasks. The highest
          lecture drop-off is{' '}
          <strong>
            {
              highestDropOffLecture?.dropOffRate ??
              0
            }
            %
          </strong>
          .
        </p>
      </section>
    </section>
  );
}

export default InstructorAnalytics;