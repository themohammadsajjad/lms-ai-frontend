import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Flag,
  MessageCircle,
  MessageSquare,
  RotateCcw,
  ShieldCheck,
  Trash2,
  User,
} from 'lucide-react';
import {
  useMemo,
  useState,
} from 'react';
import type {
  ModerationStatus,
} from '../../data/adminModerationData';
import { adminModerationService } from '../../services/adminModerationService';

type ModerationFilter =
  | 'all'
  | ModerationStatus;

function AdminModeration() {
  const [reports, setReports] =
    useState(() =>
      adminModerationService.getReports(),
    );

  const [
    activeFilter,
    setActiveFilter,
  ] =
    useState<ModerationFilter>(
      'pending',
    );

  const pendingCount =
    reports.filter(
      (report) =>
        report.status === 'pending',
    ).length;

  const dismissedCount =
    reports.filter(
      (report) =>
        report.status ===
        'dismissed',
    ).length;

  const removedCount =
    reports.filter(
      (report) =>
        report.status === 'removed',
    ).length;

  const filteredReports =
    useMemo(() => {
      if (
        activeFilter === 'all'
      ) {
        return reports;
      }

      return reports.filter(
        (report) =>
          report.status ===
          activeFilter,
      );
    }, [
      reports,
      activeFilter,
    ]);

  function handleDismiss(
    reportId: string,
  ) {
    setReports(
      adminModerationService.dismissReport(
        reportId,
      ),
    );
  }

  function handleRemove(
    reportId: string,
  ) {
    const confirmed =
      window.confirm(
        'Remove this reported content from the discussion forum? This content will no longer be visible to learners.',
      );

    if (!confirmed) {
      return;
    }

    setReports(
      adminModerationService.removeContent(
        reportId,
      ),
    );
  }

  function handleReopen(
    reportId: string,
  ) {
    setReports(
      adminModerationService.restorePending(
        reportId,
      ),
    );
  }

  return (
    <section className="admin-moderation-section">
      <div className="admin-section-heading">
        <div>
          <span className="eyebrow">
            Content moderation
          </span>

          <h2>
            Reported discussions
          </h2>

          <p>
            Review reported forum posts
            and comments, dismiss valid
            content or remove content
            that requires moderation.
          </p>
        </div>

        <div className="admin-summary-box">
          <strong>
            {pendingCount}
          </strong>

          <span>
            Pending
          </span>
        </div>
      </div>

      <div className="admin-moderation-stats">
        <article>
          <div className="admin-moderation-stat-icon pending">
            <Flag size={18} />
          </div>

          <div>
            <span>
              Pending review
            </span>

            <strong>
              {pendingCount}
            </strong>
          </div>
        </article>

        <article>
          <div className="admin-moderation-stat-icon dismissed">
            <CheckCircle2
              size={18}
            />
          </div>

          <div>
            <span>
              Dismissed
            </span>

            <strong>
              {dismissedCount}
            </strong>
          </div>
        </article>

        <article>
          <div className="admin-moderation-stat-icon removed">
            <Trash2 size={18} />
          </div>

          <div>
            <span>
              Removed
            </span>

            <strong>
              {removedCount}
            </strong>
          </div>
        </article>
      </div>

      <div className="admin-moderation-toolbar">
        <div>
          <ShieldCheck
            size={16}
          />

          <span>
            Moderation queue
          </span>
        </div>

        <select
          value={activeFilter}
          onChange={(event) =>
            setActiveFilter(
              event.target
                .value as ModerationFilter,
            )
          }
          aria-label="Filter moderation reports"
        >
          <option value="pending">
            Pending
          </option>

          <option value="dismissed">
            Dismissed
          </option>

          <option value="removed">
            Removed
          </option>

          <option value="all">
            All reports
          </option>
        </select>
      </div>

      {filteredReports.length >
      0 ? (
        <div className="admin-moderation-list">
          {filteredReports.map(
            (report) => (
              <article
                className="admin-moderation-card"
                key={report.id}
              >
                <div className="admin-moderation-card-header">
                  <div className="admin-moderation-content-type">
                    <div
                      className={`admin-moderation-type-icon ${report.contentType}`}
                    >
                      {report.contentType ===
                      'post' ? (
                        <MessageSquare
                          size={18}
                        />
                      ) : (
                        <MessageCircle
                          size={18}
                        />
                      )}
                    </div>

                    <div>
                      <span>
                        Reported{' '}
                        {
                          report.contentType
                        }
                      </span>

                      <h3>
                        {
                          report.courseTitle
                        }
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`admin-moderation-status ${report.status}`}
                  >
                    {report.status ===
                      'pending' && (
                      <Clock3
                        size={12}
                      />
                    )}

                    {report.status ===
                      'dismissed' && (
                      <CheckCircle2
                        size={12}
                      />
                    )}

                    {report.status ===
                      'removed' && (
                      <Trash2
                        size={12}
                      />
                    )}

                    {report.status}
                  </span>
                </div>

                <div className="admin-moderation-author-row">
                  <span>
                    <User
                      size={13}
                    />

                    Posted by{' '}
                    <strong>
                      {report.author}
                    </strong>
                  </span>

                  <span>
                    <Clock3
                      size={13}
                    />

                    {
                      report.reportedAt
                    }
                  </span>
                </div>

                <div className="admin-moderation-content">
                  {report.contentTitle && (
                    <h4>
                      {
                        report.contentTitle
                      }
                    </h4>
                  )}

                  <p>
                    {report.content}
                  </p>
                </div>

                <div className="admin-moderation-report-box">
                  <div className="admin-moderation-report-icon">
                    <AlertTriangle
                      size={17}
                    />
                  </div>

                  <div>
                    <span>
                      Report reason
                    </span>

                    <p>
                      {report.reason}
                    </p>

                    <small>
                      Reported by{' '}
                      <strong>
                        {
                          report.reportedBy
                        }
                      </strong>
                    </small>
                  </div>
                </div>

                {report.status ===
                  'pending' && (
                  <div className="admin-moderation-actions">
                    <button
                      type="button"
                      className="admin-dismiss-report-button"
                      onClick={() =>
                        handleDismiss(
                          report.id,
                        )
                      }
                    >
                      <CheckCircle2
                        size={15}
                      />

                      Dismiss report
                    </button>

                    <button
                      type="button"
                      className="admin-remove-content-button"
                      onClick={() =>
                        handleRemove(
                          report.id,
                        )
                      }
                    >
                      <Trash2
                        size={15}
                      />

                      Remove{' '}
                      {
                        report.contentType
                      }
                    </button>
                  </div>
                )}

                {report.status ===
                  'dismissed' && (
                  <div className="admin-moderation-resolved">
                    <div>
                      <CheckCircle2
                        size={15}
                      />

                      Report dismissed.
                      Content remains
                      visible.
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleReopen(
                          report.id,
                        )
                      }
                    >
                      <RotateCcw
                        size={14}
                      />

                      Reopen
                    </button>
                  </div>
                )}

                {report.status ===
                  'removed' && (
                  <div className="admin-moderation-removed-message">
                    <Trash2
                      size={15}
                    />

                    Report resolved and
                    content removed from
                    the discussion forum.
                  </div>
                )}
              </article>
            ),
          )}
        </div>
      ) : (
        <div className="admin-moderation-empty">
          <ShieldCheck
            size={30}
          />

          <h3>
            No reports here
          </h3>

          <p>
            There are no moderation
            reports matching this
            filter.
          </p>
        </div>
      )}
    </section>
  );
}

export default AdminModeration;