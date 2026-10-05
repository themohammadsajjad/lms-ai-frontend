import {
  Activity,
  BarChart3,
  BookOpen,
  CheckCircle2,
  CreditCard,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  adminAnalyticsTrend,
  adminPlatformMetrics,
  revenueBreakdown,
} from '../../data/adminAnalyticsData';

function AdminAnalytics() {
  const maxActiveUsers = Math.max(
    ...adminAnalyticsTrend.map(
      (item) => item.activeUsers,
    ),
  );

  const maxEnrollments = Math.max(
    ...adminAnalyticsTrend.map(
      (item) => item.enrollments,
    ),
  );

  const formattedRevenue =
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(
      adminPlatformMetrics.revenue,
    );

  return (
    <section className="admin-analytics-section">
      <div className="admin-section-heading">
        <div>
          <span className="eyebrow">
            Platform analytics
          </span>

          <h2>
            Platform performance
          </h2>

          <p>
            Monitor daily activity,
            enrollments, course completion
            and platform revenue.
          </p>
        </div>

        <div className="admin-analytics-period">
          <BarChart3 size={15} />
          Last 7 days
        </div>
      </div>

      <div className="admin-analytics-metric-grid">
        <article className="admin-analytics-metric-card">
          <div className="admin-analytics-metric-icon purple">
            <Activity size={20} />
          </div>

          <div>
            <span>
              Daily active users
            </span>

            <strong>
              {
                adminPlatformMetrics.dailyActiveUsers
              }
            </strong>

            <small>
              Active today
            </small>
          </div>
        </article>

        <article className="admin-analytics-metric-card">
          <div className="admin-analytics-metric-icon blue">
            <Users size={20} />
          </div>

          <div>
            <span>
              Total enrollments
            </span>

            <strong>
              {
                adminPlatformMetrics.totalEnrollments
              }
            </strong>

            <small>
              Across all courses
            </small>
          </div>
        </article>

        <article className="admin-analytics-metric-card">
          <div className="admin-analytics-metric-icon green">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>
              Completion rate
            </span>

            <strong>
              {
                adminPlatformMetrics.completionRate
              }
              %
            </strong>

            <small>
              Platform average
            </small>
          </div>
        </article>

        <article className="admin-analytics-metric-card">
          <div className="admin-analytics-metric-icon orange">
            <CreditCard size={20} />
          </div>

          <div>
            <span>
              Revenue
            </span>

            <strong>
              {formattedRevenue}
            </strong>

            <small>
              Current period
            </small>
          </div>
        </article>
      </div>

      <div className="admin-analytics-content-grid">
        <section className="admin-analytics-trend-panel">
          <div className="admin-analytics-panel-heading">
            <div>
              <span>
                Engagement trend
              </span>

              <h3>
                Daily platform activity
              </h3>

              <p>
                Compare active learners
                and new enrollments over
                the last seven days.
              </p>
            </div>

            <div className="admin-analytics-legend">
              <span>
                <i className="active-users" />
                Active users
              </span>

              <span>
                <i className="enrollments" />
                Enrollments
              </span>
            </div>
          </div>

          <div className="admin-analytics-chart">
            {adminAnalyticsTrend.map(
              (item) => {
                const activeHeight =
                  Math.max(
                    12,
                    Math.round(
                      (item.activeUsers /
                        maxActiveUsers) *
                        100,
                    ),
                  );

                const enrollmentHeight =
                  Math.max(
                    12,
                    Math.round(
                      (item.enrollments /
                        maxEnrollments) *
                        100,
                    ),
                  );

                return (
                  <div
                    className="admin-analytics-chart-column"
                    key={item.label}
                  >
                    <div className="admin-analytics-bars">
                      <div
                        className="admin-analytics-bar active-users"
                        style={{
                          height: `${activeHeight}%`,
                        }}
                        title={`${item.activeUsers} active users`}
                      >
                        <span>
                          {
                            item.activeUsers
                          }
                        </span>
                      </div>

                      <div
                        className="admin-analytics-bar enrollments"
                        style={{
                          height: `${enrollmentHeight}%`,
                        }}
                        title={`${item.enrollments} enrollments`}
                      >
                        <span>
                          {
                            item.enrollments
                          }
                        </span>
                      </div>
                    </div>

                    <small>
                      {item.label}
                    </small>
                  </div>
                );
              },
            )}
          </div>
        </section>

        <aside className="admin-revenue-panel">
          <div className="admin-revenue-panel-heading">
            <div className="admin-revenue-icon">
              <CreditCard size={21} />
            </div>

            <div>
              <span>
                Revenue overview
              </span>

              <h3>
                Revenue breakdown
              </h3>
            </div>
          </div>

          <strong className="admin-revenue-total">
            {formattedRevenue}
          </strong>

          <p className="admin-revenue-caption">
            Total platform revenue for
            the current reporting period.
          </p>

          <div className="admin-revenue-breakdown-list">
            {revenueBreakdown.map(
              (item) => (
                <div
                  className="admin-revenue-breakdown-item"
                  key={item.label}
                >
                  <div>
                    <span>
                      {item.label}
                    </span>

                    <strong>
                      {new Intl.NumberFormat(
                        'en-IN',
                        {
                          style:
                            'currency',
                          currency:
                            'INR',
                          maximumFractionDigits: 0,
                        },
                      ).format(
                        item.amount,
                      )}
                    </strong>
                  </div>

                  <div className="admin-revenue-progress">
                    <div
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>

                  <small>
                    {
                      item.percentage
                    }
                    %
                  </small>
                </div>
              ),
            )}
          </div>
        </aside>
      </div>

      <section className="admin-analytics-summary">
        <div className="admin-analytics-summary-icon">
          <TrendingUp size={20} />
        </div>

        <div>
          <span>
            Platform summary
          </span>

          <h3>
            Learning activity remains
            strong
          </h3>

          <p>
            The platform currently has{' '}
            <strong>
              {
                adminPlatformMetrics.dailyActiveUsers
              }
            </strong>{' '}
            daily active users and{' '}
            <strong>
              {
                adminPlatformMetrics.totalEnrollments
              }
            </strong>{' '}
            total enrollments, with a{' '}
            <strong>
              {
                adminPlatformMetrics.completionRate
              }
              %
            </strong>{' '}
            overall completion rate.
          </p>
        </div>

        <div className="admin-analytics-summary-badge">
          <BookOpen size={14} />

          {
            adminPlatformMetrics.totalEnrollments
          }{' '}
          enrollments
        </div>
      </section>
    </section>
  );
}

export default AdminAnalytics;