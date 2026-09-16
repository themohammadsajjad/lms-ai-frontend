import {
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Users,
} from 'lucide-react';

function InstructorDashboard() {
  return (
    <section className="dashboard-page">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">Instructor workspace</span>
          <h1>Teaching overview</h1>
          <p>
            Manage courses, monitor learners and review student activity.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon purple">
            <BookOpen size={20} />
          </div>
          <div>
            <span>Published courses</span>
            <strong>4</strong>
            <small>Currently active</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon blue">
            <Users size={20} />
          </div>
          <div>
            <span>Active learners</span>
            <strong>186</strong>
            <small>Across all courses</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon orange">
            <ClipboardCheck size={20} />
          </div>
          <div>
            <span>Pending reviews</span>
            <strong>12</strong>
            <small>Assignments submitted</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon green">
            <TrendingUp size={20} />
          </div>
          <div>
            <span>Avg. completion</span>
            <strong>72%</strong>
            <small>Learner completion rate</small>
          </div>
        </article>
      </div>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <h2>Instructor overview</h2>
            <p>Your course management workspace.</p>
          </div>
        </div>

        <p className="role-dashboard-text">
          Course authoring, learner analytics, assignment reviews and quiz
          management will be available from this workspace.
        </p>
      </section>
    </section>
  );
}

export default InstructorDashboard;