import {
  BookOpenCheck,
  ShieldCheck,
  UserCheck,
  Users,
} from 'lucide-react';

function AdminDashboard() {
  return (
    <section className="dashboard-page">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">Admin workspace</span>
          <h1>Platform overview</h1>
          <p>
            Monitor users, courses and platform governance from one place.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon purple">
            <Users size={20} />
          </div>
          <div>
            <span>Total users</span>
            <strong>428</strong>
            <small>Across all roles</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon blue">
            <BookOpenCheck size={20} />
          </div>
          <div>
            <span>Active courses</span>
            <strong>18</strong>
            <small>Published courses</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon orange">
            <UserCheck size={20} />
          </div>
          <div>
            <span>Pending approvals</span>
            <strong>5</strong>
            <small>Courses awaiting review</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon green">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span>Platform status</span>
            <strong>Healthy</strong>
            <small>All services operational</small>
          </div>
        </article>
      </div>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <h2>Administration</h2>
            <p>Governance and platform management.</p>
          </div>
        </div>

        <p className="role-dashboard-text">
          User management, course approvals, platform analytics and governance
          controls will be managed from this workspace.
        </p>
      </section>
    </section>
  );
}

export default AdminDashboard;