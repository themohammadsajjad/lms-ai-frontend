import {
  Award,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Download,
  Flame,
  Medal,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import {
  badges,
  type Certificate,
} from '../data/engagementData';
import { authService } from '../services/authService';
import { engagementService } from '../services/engagementService';

function Certificates() {
  const [, setVersion] =
    useState(0);

  const resolvedCertificates =
    engagementService.getCertificates();

  const earnedCertificates =
    resolvedCertificates.filter(
      (certificate) =>
        certificate.status ===
        'earned',
    );

  const inProgressCertificates =
    resolvedCertificates.filter(
      (certificate) =>
        certificate.status ===
        'in-progress',
    );

  const earnedBadges =
    badges.filter(
      (badge) =>
        badge.earned,
    );

  function handleViewCertificate(
    certificateId: string,
  ) {
    engagementService.markCertificateViewed(
      certificateId,
    );

    setVersion(
      (value) =>
        value + 1,
    );
  }

  async function handleDownloadCertificate(
    certificate: Certificate,
  ) {
    const user =
      authService.getCurrentUser();

    const studentName =
      user?.name ||
      'VertexLearn Student';

    const {
      PDFDocument,
      StandardFonts,
      rgb,
    } = await import(
      'pdf-lib'
    );

    const pdfDocument =
      await PDFDocument.create();

    const page =
      pdfDocument.addPage([
        842,
        595,
      ]);

    const regularFont =
      await pdfDocument.embedFont(
        StandardFonts.Helvetica,
      );

    const boldFont =
      await pdfDocument.embedFont(
        StandardFonts.HelveticaBold,
      );

    const width =
      page.getWidth();

    const height =
      page.getHeight();

    const purple =
      rgb(
        0.4,
        0.35,
        0.85,
      );

    const navy =
      rgb(
        0.08,
        0.09,
        0.18,
      );

    const gray =
      rgb(
        0.38,
        0.4,
        0.48,
      );

    function drawCenteredText(
      text: string,
      y: number,
      size: number,
      font = regularFont,
      color = navy,
    ) {
      const textWidth =
        font.widthOfTextAtSize(
          text,
          size,
        );

      page.drawText(
        text,
        {
          x:
            (width -
              textWidth) /
            2,
          y,
          size,
          font,
          color,
        },
      );
    }

    page.drawRectangle({
      x: 20,
      y: 20,
      width:
        width - 40,
      height:
        height - 40,
      borderWidth: 4,
      borderColor:
        purple,
    });

    page.drawRectangle({
      x: 32,
      y: 32,
      width:
        width - 64,
      height:
        height - 64,
      borderWidth: 1,
      borderColor:
        rgb(
          0.78,
          0.76,
          0.92,
        ),
    });

    drawCenteredText(
      'VERTEXLEARN',
      height - 100,
      28,
      boldFont,
      purple,
    );

    drawCenteredText(
      'CERTIFICATE OF COMPLETION',
      height - 155,
      20,
      boldFont,
      navy,
    );

    drawCenteredText(
      'This certificate is proudly presented to',
      height - 205,
      12,
      regularFont,
      gray,
    );

    drawCenteredText(
      studentName,
      height - 250,
      26,
      boldFont,
      navy,
    );

    drawCenteredText(
      'for successfully completing',
      height - 295,
      12,
      regularFont,
      gray,
    );

    drawCenteredText(
      certificate.courseTitle,
      height - 335,
      22,
      boldFont,
      purple,
    );

    drawCenteredText(
      `Issued: ${certificate.issuedDate}`,
      height - 395,
      11,
      regularFont,
      gray,
    );

    drawCenteredText(
      `Credential ID: ${certificate.credentialId}`,
      height - 420,
      11,
      regularFont,
      gray,
    );

    drawCenteredText(
      'VertexLearn Learning Platform',
      85,
      11,
      boldFont,
      navy,
    );

    drawCenteredText(
      'Achievement verified through the VertexLearn demo learning experience.',
      62,
      9,
      regularFont,
      gray,
    );

    const pdfBytes =
      await pdfDocument.save();

    const buffer =
      new ArrayBuffer(
        pdfBytes.byteLength,
      );

    new Uint8Array(
      buffer,
    ).set(
      pdfBytes,
    );

    const pdfBlob =
      new Blob(
        [buffer],
        {
          type:
            'application/pdf',
        },
      );

    const downloadUrl =
      URL.createObjectURL(
        pdfBlob,
      );

    const safeCourseName =
      certificate.courseTitle
        .toLowerCase()
        .replace(
          /[^a-z0-9]+/g,
          '-',
        )
        .replace(
          /^-|-$/g,
          '',
        );

    const link =
      document.createElement(
        'a',
      );

    link.href =
      downloadUrl;

    link.download =
      `${safeCourseName}-certificate.pdf`;

    document.body.appendChild(
      link,
    );

    link.click();

    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(
        downloadUrl,
      );
    }, 1000);

    engagementService.markCertificateViewed(
      certificate.id,
    );

    setVersion(
      (value) =>
        value + 1,
    );
  }

  return (
    <section className="certificates-page">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">
            Achievements
          </span>

          <h1>
            Certificates & badges
          </h1>

          <p>
            Track your learning
            milestones, earned
            credentials and
            achievement progress.
          </p>
        </div>

        <div className="achievement-score">
          <div>
            <Award
              size={20}
            />
          </div>

          <section>
            <strong>
              {
                earnedCertificates.length
              }
            </strong>

            <span>
              Certificates earned
            </span>
          </section>
        </div>
      </div>

      <div className="achievement-stats-grid">
        <article>
          <div className="achievement-stat-icon purple">
            <Award
              size={20}
            />
          </div>

          <div>
            <span>
              Certificates
            </span>

            <strong>
              {
                earnedCertificates.length
              }
            </strong>

            <small>
              Completed
              credentials
            </small>
          </div>
        </article>

        <article>
          <div className="achievement-stat-icon green">
            <BadgeCheck
              size={20}
            />
          </div>

          <div>
            <span>
              Badges earned
            </span>

            <strong>
              {
                earnedBadges.length
              }
            </strong>

            <small>
              Learning
              achievements
            </small>
          </div>
        </article>

        <article>
          <div className="achievement-stat-icon orange">
            <Flame
              size={20}
            />
          </div>

          <div>
            <span>
              Current streak
            </span>

            <strong>
              7 days
            </strong>

            <small>
              Keep your momentum
            </small>
          </div>
        </article>

        <article>
          <div className="achievement-stat-icon blue">
            <ShieldCheck
              size={20}
            />
          </div>

          <div>
            <span>
              Learning points
            </span>

            <strong>
              1,480
            </strong>

            <small>
              Total achievement
              score
            </small>
          </div>
        </article>
      </div>

      <section className="certificate-section">
        <div className="section-heading">
          <div>
            <h2>
              Your certificates
            </h2>

            <p>
              Certificates unlock
              automatically when
              course completion
              reaches 100%.
            </p>
          </div>
        </div>

        <div className="certificate-grid">
          {earnedCertificates.map(
            (
              certificate,
              index,
            ) => {
              const viewed =
                engagementService.hasViewedCertificate(
                  certificate.id,
                );

              return (
                <article
                  className={`certificate-card certificate-${
                    index + 1
                  }`}
                  key={
                    certificate.id
                  }
                >
                  <div className="certificate-card-top">
                    <div className="certificate-logo">
                      <Award
                        size={23}
                      />
                    </div>

                    <span className="certificate-earned-badge">
                      <CheckCircle2
                        size={13}
                      />

                      Earned
                    </span>
                  </div>

                  <div className="certificate-content">
                    <span>
                      Certificate
                      of completion
                    </span>

                    <h3>
                      {
                        certificate.courseTitle
                      }
                    </h3>

                    <p>
                      Awarded after
                      reaching 100%
                      completion for
                      the available
                      course learning
                      content.
                    </p>
                  </div>

                  <div className="certificate-details">
                    <div>
                      <span>
                        Issued
                      </span>

                      <strong>
                        {
                          certificate.issuedDate
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        Credential ID
                      </span>

                      <strong>
                        {
                          certificate.credentialId
                        }
                      </strong>
                    </div>
                  </div>

                  <div className="certificate-actions">
                    <button
                      type="button"
                      onClick={() =>
                        handleViewCertificate(
                          certificate.id,
                        )
                      }
                    >
                      <Award
                        size={15}
                      />

                      {viewed
                        ? 'Certificate viewed'
                        : 'View certificate'}
                    </button>

                    <button
                      type="button"
                      className="certificate-download-button"
                      onClick={() =>
                        handleDownloadCertificate(
                          certificate,
                        )
                      }
                    >
                      <Download
                        size={15}
                      />

                      Download PDF
                    </button>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </section>

      {inProgressCertificates.length >
        0 && (
        <section className="certificate-progress-section">
          <div className="section-heading">
            <div>
              <h2>
                In progress
              </h2>

              <p>
                Complete all
                available course
                lessons to unlock
                the certificate.
              </p>
            </div>
          </div>

          <div className="certificate-progress-list">
            {inProgressCertificates.map(
              (
                certificate,
              ) => (
                <article
                  className="certificate-progress-card"
                  key={
                    certificate.id
                  }
                >
                  <div className="certificate-progress-icon">
                    <Clock3
                      size={21}
                    />
                  </div>

                  <div className="certificate-progress-info">
                    <span>
                      Certificate
                      in progress
                    </span>

                    <h3>
                      {
                        certificate.courseTitle
                      }
                    </h3>

                    <div
                      className="certificate-progress-track"
                      aria-label={`${certificate.courseTitle} completion ${certificate.progress}%`}
                    >
                      <div
                        style={{
                          width: `${certificate.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <strong>
                    {
                      certificate.progress
                    }
                    %
                  </strong>
                </article>
              ),
            )}
          </div>
        </section>
      )}

      <section className="badges-section">
        <div className="section-heading">
          <div>
            <h2>
              Achievement badges
            </h2>

            <p>
              Milestones earned
              through learning
              activity and
              progress.
            </p>
          </div>

          <span className="badge-count">
            {
              earnedBadges.length
            }
            /{badges.length}{' '}
            unlocked
          </span>
        </div>

        <div className="badge-grid">
          {badges.map(
            (
              badge,
              index,
            ) => (
              <article
                className={`badge-card ${
                  badge.earned
                    ? 'earned'
                    : 'locked'
                }`}
                key={
                  badge.id
                }
              >
                <div
                  className={`badge-icon badge-icon-${
                    (index % 4) +
                    1
                  }`}
                >
                  {index %
                    3 ===
                  0 ? (
                    <Flame
                      size={22}
                    />
                  ) : index %
                      3 ===
                    1 ? (
                    <Medal
                      size={22}
                    />
                  ) : (
                    <Sparkles
                      size={22}
                    />
                  )}
                </div>

                <span>
                  {
                    badge.category
                  }
                </span>

                <h3>
                  {
                    badge.title
                  }
                </h3>

                <p>
                  {
                    badge.description
                  }
                </p>

                <div className="badge-state">
                  {badge.earned ? (
                    <>
                      <CheckCircle2
                        size={14}
                      />

                      Unlocked
                    </>
                  ) : (
                    <>
                      <ShieldCheck
                        size={14}
                      />

                      Locked
                    </>
                  )}
                </div>
              </article>
            ),
          )}
        </div>
      </section>
    </section>
  );
}

export default Certificates;