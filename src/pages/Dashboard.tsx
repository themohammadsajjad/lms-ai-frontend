import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
  Play,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { courses, recentActivity } from '../data/mockData';
import { authService } from '../services/authService';

function Dashboard() {
  const user = authService.getCurrentUser();
  const enrolledCourses = courses.filter((course) => course.enrolled);
  const recommendations = courses.filter((course) => !course.enrolled);

  const averageProgress = Math.round(
    enrolledCourses.reduce((total, course) => total + course.progress, 0) /
      enrolledCourses.length,
  );

  return (
    <section className="dashboard-page">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">Student dashboard</span>
          <h1>Keep learning, {user?.name?.split(' ')[0]}</h1>
          <p>
            Pick up where you left off and stay on track with your learning
            goals.
          </p>
        </div>

        <Link to="/courses" className="dashboard-action">
          Browse courses
          <ArrowRight size={17} />
        </Link>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon purple">
            <BookOpen size={20} />
          </div>
          <div>
            <span>Active courses</span>
            <strong>{enrolledCourses.length}</strong>
            <small>Currently enrolled</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon blue">
            <TrendingUp size={20} />
          </div>
          <div>
            <span>Average progress</span>
            <strong>{averageProgress}%</strong>
            <small>Across your courses</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon orange">
            <Flame size={20} />
          </div>
          <div>
            <span>Learning streak</span>
            <strong>7 days</strong>
            <small>Keep it going</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon green">
            <Award size={20} />
          </div>
          <div>
            <span>Certificates</span>
            <strong>3</strong>
            <small>Courses completed</small>
          </div>
        </article>
      </div>

      <div className="dashboard-main-grid">
        <div className="dashboard-column">
          <div className="section-heading">
            <div>
              <h2>Continue learning</h2>
              <p>Resume your most recent courses.</p>
            </div>

            <Link to="/courses">View all</Link>
          </div>

          <div className="continue-grid">
            {enrolledCourses.map((course, index) => (
              <article className="continue-card" key={course.id}>
                <div className={`course-cover course-cover-${index + 1}`}>
                  <span>{course.category}</span>

                  <button
                    type="button"
                    className="play-button"
                    aria-label={`Continue ${course.title}`}
                  >
                    <Play size={18} fill="currentColor" />
                  </button>
                </div>

                <div className="continue-card-body">
                  <div className="course-meta">
                    <span>{course.level}</span>
                    <span>
                      <Clock3 size={13} />
                      {course.duration}
                    </span>
                  </div>

                  <h3>{course.title}</h3>
                  <p>By {course.instructor}</p>

                  <div className="progress-row">
                    <div>
                      <span>Course progress</span>
                      <strong>{course.progress}%</strong>
                    </div>

                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <button type="button" className="continue-button">
                    Continue learning
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="dashboard-side-column">
          <article className="streak-card">
            <div className="streak-top">
              <div className="streak-icon">
                <Flame size={23} />
              </div>

              <div>
                <span>Current streak</span>
                <strong>7 days</strong>
              </div>
            </div>

            <div className="streak-days">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <div key={`${day}-${index}`}>
                  <span>{day}</span>
                  <div className={index < 7 ? 'completed' : ''}>
                    <CheckCircle2 size={14} />
                  </div>
                </div>
              ))}
            </div>

            <p>Great work. You studied every day this week.</p>
          </article>

          <article className="ai-dashboard-card">
            <div className="ai-dashboard-icon">
              <Sparkles size={21} />
            </div>

            <span>AI study assistant</span>
            <h3>Need help with a lesson?</h3>
            <p>
              Ask course-aware questions and get explanations based on your
              learning material.
            </p>

            <button type="button">
              Open AI Tutor
              <ArrowRight size={15} />
            </button>
          </article>
        </aside>
      </div>

      <div className="dashboard-bottom-grid">
        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <h2>Recommended for you</h2>
              <p>Courses based on your learning activity.</p>
            </div>

            <Link to="/courses">Explore all</Link>
          </div>

          <div className="recommended-list">
            {recommendations.map((course, index) => (
              <article className="recommended-course" key={course.id}>
                <div className={`recommended-thumb thumb-${index + 1}`}>
                  <BookOpen size={21} />
                </div>

                <div className="recommended-info">
                  <span>{course.category}</span>
                  <h3>{course.title}</h3>
                  <p>
                    {course.level} · {course.lessons} lessons · {course.duration}
                  </p>
                </div>

                <button type="button">View course</button>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <h2>Recent activity</h2>
              <p>Your latest learning updates.</p>
            </div>
          </div>

          <div className="activity-list">
            {recentActivity.map((activity) => (
              <article className="activity-item" key={activity.id}>
                <div className="activity-icon">
                  <CheckCircle2 size={17} />
                </div>

                <div>
                  <strong>{activity.title}</strong>
                  <span>{activity.course}</span>
                </div>

                <time>{activity.time}</time>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default Dashboard;