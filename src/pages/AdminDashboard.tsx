import {
  Activity,
  BookCheck,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
  UserX,
  XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { platformActivity } from '../data/adminData';
import { adminService } from '../services/adminService';

type AdminTab = 'overview' | 'approvals' | 'users';

function AdminDashboard() {
  const [activeTab, setActiveTab] =
    useState<AdminTab>('overview');

  const [users, setUsers] = useState(() =>
    adminService.getUsers(),
  );

  const [approvals, setApprovals] = useState(() =>
    adminService.getCourseApprovals(),
  );

  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const activeUsers = users.filter(
    (user) => user.status === 'active',
  ).length;

  const instructorCount = users.filter(
    (user) => user.role === 'instructor',
  ).length;

  const pendingApprovals = approvals.filter(
    (course) => course.status === 'pending',
  ).length;

  const approvedCourses = approvals.filter(
    (course) => course.status === 'approved',
  ).length;

  const filteredUsers = useMemo(() => {
    const query = userSearch.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === 'all' ||
        user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, userSearch, roleFilter]);

  function handleApproval(
    courseId: string,
    status: 'approved' | 'rejected',
  ) {
    setApprovals(
      adminService.updateCourseApproval(
        courseId,
        status,
      ),
    );
  }

  function handleUserStatus(
    userId: string,
    status: 'active' | 'suspended',
  ) {
    setUsers(
      adminService.updateUserStatus(userId, status),
    );
  }

  return (
    <section className="admin-page">
      <div className="admin-heading">
        <div>
          <span className="eyebrow">
            Administration workspace
          </span>

          <h1>Platform overview</h1>

          <p>
            Manage users, review course submissions and
            monitor platform activity.
          </p>
        </div>

        <div className="admin-health-pill">
          <span />
          Platform healthy
        </div>
      </div>

      <div className="admin-stats-grid">
        <article>
          <div className="admin-stat-icon purple">
            <Users size={20} />
          </div>

          <div>
            <span>Managed users</span>
            <strong>{users.length}</strong>
            <small>{activeUsers} active accounts</small>
          </div>
        </article>

        <article>
          <div className="admin-stat-icon blue">
            <GraduationCap size={20} />
          </div>

          <div>
            <span>Instructors</span>
            <strong>{instructorCount}</strong>
            <small>Teaching accounts</small>
          </div>
        </article>

        <article>
          <div className="admin-stat-icon orange">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Pending approvals</span>
            <strong>{pendingApprovals}</strong>
            <small>Courses awaiting review</small>
          </div>
        </article>

        <article>
          <div className="admin-stat-icon green">
            <BookCheck size={20} />
          </div>

          <div>
            <span>Approved courses</span>
            <strong>{approvedCourses}</strong>
            <small>Reviewed submissions</small>
          </div>
        </article>
      </div>

      <div className="admin-tabs">
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
            activeTab === 'approvals' ? 'active' : ''
          }
          onClick={() => setActiveTab('approvals')}
        >
          Course approvals

          {pendingApprovals > 0 && (
            <span>{pendingApprovals}</span>
          )}
        </button>

        <button
          type="button"
          className={
            activeTab === 'users' ? 'active' : ''
          }
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="admin-overview-grid">
          <section className="admin-panel admin-governance-panel">
            <div className="admin-panel-heading">
              <div>
                <span>Governance</span>
                <h2>Platform controls</h2>
                <p>
                  Key administrative areas requiring
                  regular review.
                </p>
              </div>

              <ShieldCheck size={20} />
            </div>

            <div className="admin-governance-grid">
              <button
                type="button"
                onClick={() =>
                  setActiveTab('approvals')
                }
              >
                <div className="governance-icon orange">
                  <BookOpen size={19} />
                </div>

                <section>
                  <strong>
                    Course moderation
                  </strong>

                  <span>
                    {pendingApprovals} submissions
                    waiting
                  </span>
                </section>

                <small>Review</small>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('users')}
              >
                <div className="governance-icon blue">
                  <Users size={19} />
                </div>

                <section>
                  <strong>User management</strong>

                  <span>
                    {users.length} accounts available
                  </span>
                </section>

                <small>Manage</small>
              </button>

              <article>
                <div className="governance-icon green">
                  <Activity size={19} />
                </div>

                <section>
                  <strong>System status</strong>
                  <span>Core services operating normally</span>
                </section>

                <small className="healthy-text">
                  Healthy
                </small>
              </article>
            </div>
          </section>

          <aside className="admin-panel admin-health-panel">
            <div className="admin-panel-heading">
              <div>
                <span>System health</span>
                <h2>Service status</h2>
              </div>
            </div>

            <div className="health-score">
              <div>
                <ShieldCheck size={28} />
              </div>

              <strong>Healthy</strong>

              <span>
                All core learning services are online.
              </span>
            </div>

            <div className="health-metrics">
              <div>
                <span>API status</span>
                <strong>Operational</strong>
              </div>

              <div>
                <span>Course delivery</span>
                <strong>Operational</strong>
              </div>

              <div>
                <span>Authentication</span>
                <strong>Operational</strong>
              </div>
            </div>
          </aside>

          <section className="admin-panel admin-activity-panel">
            <div className="admin-panel-heading">
              <div>
                <span>Recent activity</span>
                <h2>Platform events</h2>
                <p>
                  Latest administrative and learning
                  events.
                </p>
              </div>
            </div>

            <div className="admin-activity-list">
              {platformActivity.map((activity) => (
                <article key={activity.id}>
                  <div
                    className={`activity-type-icon ${activity.type}`}
                  >
                    {activity.type === 'user' && (
                      <Users size={16} />
                    )}

                    {activity.type === 'course' && (
                      <BookOpen size={16} />
                    )}

                    {activity.type === 'system' && (
                      <Activity size={16} />
                    )}
                  </div>

                  <div>
                    <strong>
                      {activity.title}
                    </strong>

                    <span>
                      {activity.description}
                    </span>
                  </div>

                  <small>{activity.time}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="admin-panel admin-approval-preview">
            <div className="admin-panel-heading">
              <div>
                <span>Moderation queue</span>
                <h2>Pending courses</h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveTab('approvals')
                }
              >
                View all
              </button>
            </div>

            <div className="admin-preview-list">
              {approvals
                .filter(
                  (course) =>
                    course.status === 'pending',
                )
                .slice(0, 3)
                .map((course) => (
                  <article key={course.id}>
                    <div>
                      <BookOpen size={17} />
                    </div>

                    <section>
                      <strong>{course.title}</strong>

                      <span>
                        By {course.instructor}
                      </span>
                    </section>

                    <small>
                      {course.lessons} lessons
                    </small>
                  </article>
                ))}

              {pendingApprovals === 0 && (
                <div className="admin-empty-state">
                  <CheckCircle2 size={24} />

                  <strong>Queue is clear</strong>

                  <span>
                    There are no courses waiting for
                    review.
                  </span>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'approvals' && (
        <section className="admin-management-section">
          <div className="admin-section-heading">
            <div>
              <span className="eyebrow">
                Course governance
              </span>

              <h2>Course approvals</h2>

              <p>
                Review instructor submissions before
                publishing them to learners.
              </p>
            </div>

            <div className="admin-summary-box">
              <strong>{pendingApprovals}</strong>
              <span>Pending</span>
            </div>
          </div>

          <div className="admin-approval-list">
            {approvals.map((course) => (
              <article
                className="admin-approval-card"
                key={course.id}
              >
                <div className="admin-course-icon">
                  <BookOpen size={21} />
                </div>

                <div className="admin-course-main">
                  <span>{course.category}</span>

                  <h3>{course.title}</h3>

                  <p>
                    Submitted by{' '}
                    <strong>
                      {course.instructor}
                    </strong>{' '}
                    · {course.lessons} lessons ·{' '}
                    {course.submittedAt}
                  </p>
                </div>

                <div
                  className={`admin-approval-status ${course.status}`}
                >
                  {course.status === 'pending' && (
                    <Clock3 size={13} />
                  )}

                  {course.status === 'approved' && (
                    <CheckCircle2 size={13} />
                  )}

                  {course.status === 'rejected' && (
                    <XCircle size={13} />
                  )}

                  {course.status}
                </div>

                {course.status === 'pending' && (
                  <div className="admin-approval-actions">
                    <button
                      type="button"
                      className="admin-reject-button"
                      onClick={() =>
                        handleApproval(
                          course.id,
                          'rejected',
                        )
                      }
                    >
                      <XCircle size={15} />
                      Reject
                    </button>

                    <button
                      type="button"
                      className="admin-approve-button"
                      onClick={() =>
                        handleApproval(
                          course.id,
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

      {activeTab === 'users' && (
        <section className="admin-management-section">
          <div className="admin-section-heading">
            <div>
              <span className="eyebrow">
                Identity management
              </span>

              <h2>Platform users</h2>

              <p>
                Search accounts and manage user access.
              </p>
            </div>

            <div className="admin-summary-box">
              <strong>{activeUsers}</strong>
              <span>Active</span>
            </div>
          </div>

          <div className="admin-user-toolbar">
            <div className="admin-user-search">
              <Search size={16} />

              <input
                type="search"
                value={userSearch}
                onChange={(event) =>
                  setUserSearch(event.target.value)
                }
                placeholder="Search name or email..."
              />
            </div>

            <select
              value={roleFilter}
              onChange={(event) =>
                setRoleFilter(event.target.value)
              }
            >
              <option value="all">All roles</option>
              <option value="student">
                Students
              </option>
              <option value="instructor">
                Instructors
              </option>
              <option value="admin">
                Admins
              </option>
            </select>
          </div>

          <div className="admin-user-table-wrapper">
            <table className="admin-user-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Access</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="admin-user-cell">
                        <div>
                          {user.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <section>
                          <strong>
                            {user.name}
                          </strong>

                          <span>
                            {user.email}
                          </span>
                        </section>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`admin-role-chip ${user.role}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>{user.joinedAt}</td>

                    <td>
                      <span
                        className={`admin-user-status ${user.status}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>
                      {user.status === 'active' ? (
                        <button
                          type="button"
                          className="suspend-user-button"
                          onClick={() =>
                            handleUserStatus(
                              user.id,
                              'suspended',
                            )
                          }
                        >
                          <UserX size={14} />
                          Suspend
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="activate-user-button"
                          onClick={() =>
                            handleUserStatus(
                              user.id,
                              'active',
                            )
                          }
                        >
                          <UserCheck size={14} />
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="admin-empty-state">
                <Users size={24} />

                <strong>No users found</strong>

                <span>
                  Try another search or role filter.
                </span>
              </div>
            )}
          </div>
        </section>
      )}
    </section>
  );
}

export default AdminDashboard;