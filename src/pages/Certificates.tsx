import {
  Award,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Flame,
  Medal,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import {
  badges,
  certificates,
} from '../data/engagementData';
import { engagementService } from '../services/engagementService';

function Certificates() {
  const [, setVersion] = useState(0);

  const earnedCertificates = certificates.filter(
    (certificate) => certificate.status === 'earned',
  );

  const inProgressCertificates = certificates.filter(
    (certificate) => certificate.status === 'in-progress',
  );

  const earnedBadges = badges.filter((badge) => badge.earned);

  function handleViewCertificate(certificateId: string) {
    engagementService.markCertificateViewed(certificateId);
    setVersion((value) => value + 1);
  }

  return (
    <section className="certificates-page">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">Achievements</span>
          <h1>Certificates & badges</h1>
          <p>
            Track your learning milestones, earned credentials and
            achievement progress.
          </p>
        </div>

        <div className="achievement-score">
          <div>
            <Award size={20} />
          </div>

          <section>
            <strong>{earnedCertificates.length}</strong>
            <span>Certificates earned</span>
          </section>
        </div>
      </div>

      <div className="achievement-stats-grid">
        <article>
          <div className="achievement-stat-icon purple">
            <Award size={20} />
          </div>

          <div>
            <span>Certificates</span>
            <strong>{earnedCertificates.length}</strong>
            <small>Completed credentials</small>
          </div>
        </article>

        <article>
          <div className="achievement-stat-icon green">
            <BadgeCheck size={20} />
          </div>

          <div>
            <span>Badges earned</span>
            <strong>{earnedBadges.length}</strong>
            <small>Learning achievements</small>
          </div>
        </article>

        <article>
          <div className="achievement-stat-icon orange">
            <Flame size={20} />
          </div>

          <div>
            <span>Current streak</span>
            <strong>7 days</strong>
            <small>Keep your momentum</small>
          </div>
        </article>

        <article>
          <div className="achievement-stat-icon blue">
            <ShieldCheck size={20} />
          </div>

          <div>
            <span>Learning points</span>
            <strong>1,480</strong>
            <small>Total achievement score</small>
          </div>
        </article>
      </div>

      <section className="certificate-section">
        <div className="section-heading">
          <div>
            <h2>Your certificates</h2>
            <p>
              Credentials earned by completing learning paths.
            </p>
          </div>
        </div>

        <div className="certificate-grid">
          {earnedCertificates.map((certificate, index) => {
            const viewed =
              engagementService.hasViewedCertificate(
                certificate.id,
              );

            return (
              <article
                className={`certificate-card certificate-${index + 1}`}
                key={certificate.id}
              >
                <div className="certificate-card-top">
                  <div className="certificate-logo">
                    <Award size={23} />
                  </div>

                  <span className="certificate-earned-badge">
                    <CheckCircle2 size={13} />
                    Earned
                  </span>
                </div>

                <div className="certificate-content">
                  <span>Certificate of completion</span>

                  <h3>{certificate.courseTitle}</h3>

                  <p>
                    Awarded for successfully completing all required
                    learning activities and assessments.
                  </p>
                </div>

                <div className="certificate-details">
                  <div>
                    <span>Issued</span>
                    <strong>{certificate.issuedDate}</strong>
                  </div>

                  <div>
                    <span>Credential ID</span>
                    <strong>{certificate.credentialId}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleViewCertificate(certificate.id)
                  }
                >
                  <Award size={15} />
                  {viewed
                    ? 'Certificate viewed'
                    : 'View certificate'}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {inProgressCertificates.length > 0 && (
        <section className="certificate-progress-section">
          <div className="section-heading">
            <div>
              <h2>In progress</h2>
              <p>
                Complete the remaining learning activities to unlock
                your certificate.
              </p>
            </div>
          </div>

          <div className="certificate-progress-list">
            {inProgressCertificates.map((certificate) => (
              <article
                className="certificate-progress-card"
                key={certificate.id}
              >
                <div className="certificate-progress-icon">
                  <Clock3 size={21} />
                </div>

                <div className="certificate-progress-info">
                  <span>Certificate in progress</span>
                  <h3>{certificate.courseTitle}</h3>

                  <div className="certificate-progress-track">
                    <div
                      style={{
                        width: `${certificate.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <strong>{certificate.progress}%</strong>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="badges-section">
        <div className="section-heading">
          <div>
            <h2>Achievement badges</h2>
            <p>
              Milestones earned through learning activity and progress.
            </p>
          </div>

          <span className="badge-count">
            {earnedBadges.length}/{badges.length} unlocked
          </span>
        </div>

        <div className="badge-grid">
          {badges.map((badge, index) => (
            <article
              className={`badge-card ${
                badge.earned ? 'earned' : 'locked'
              }`}
              key={badge.id}
            >
              <div
                className={`badge-icon badge-icon-${(index % 4) + 1}`}
              >
                {index % 3 === 0 ? (
                  <Flame size={22} />
                ) : index % 3 === 1 ? (
                  <Medal size={22} />
                ) : (
                  <Sparkles size={22} />
                )}
              </div>

              <span>{badge.category}</span>

              <h3>{badge.title}</h3>

              <p>{badge.description}</p>

              <div className="badge-state">
                {badge.earned ? (
                  <>
                    <CheckCircle2 size={14} />
                    Unlocked
                  </>
                ) : (
                  <>
                    <ShieldCheck size={14} />
                    Locked
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Certificates;