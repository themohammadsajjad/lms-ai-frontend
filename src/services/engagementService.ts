import {
  certificates,
  type Certificate,
} from '../data/engagementData';
import { lessonsByCourse } from '../data/learningData';
import { learningService } from './learningService';

const CERTIFICATE_VIEWS_KEY =
  'lms_certificate_views';

const GENERATED_CERTIFICATES_KEY =
  'lms_generated_certificates';

interface GeneratedCertificate {
  courseId: string;
  issuedDate: string;
  credentialId: string;
}

function readViewedCertificates():
  string[] {
  const stored =
    localStorage.getItem(
      CERTIFICATE_VIEWS_KEY,
    );

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(
      stored,
    ) as string[];
  } catch {
    return [];
  }
}

function readGeneratedCertificates():
  GeneratedCertificate[] {
  const stored =
    localStorage.getItem(
      GENERATED_CERTIFICATES_KEY,
    );

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(
      stored,
    ) as GeneratedCertificate[];
  } catch {
    return [];
  }
}

function saveGeneratedCertificates(
  items: GeneratedCertificate[],
) {
  localStorage.setItem(
    GENERATED_CERTIFICATES_KEY,
    JSON.stringify(items),
  );
}

function getCourseProgress(
  certificate: Certificate,
) {
  const lessons =
    lessonsByCourse[
      certificate.courseId
    ] ?? [];

  if (
    lessons.length === 0
  ) {
    return certificate.progress;
  }

  const completedCount =
    lessons.filter(
      (lesson) =>
        learningService.isCompleted(
          certificate.courseId,
          lesson.id,
        ),
    ).length;

  return Math.round(
    (completedCount /
      lessons.length) *
      100,
  );
}

function formatIssuedDate() {
  return new Date().toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    },
  );
}

function createCredentialId(
  certificate: Certificate,
) {
  const prefix =
    certificate.courseTitle
      .split(' ')
      .filter(Boolean)
      .slice(0, 3)
      .map(
        (word) =>
          word[0]
            ?.toUpperCase() ??
          '',
      )
      .join('') || 'CRS';

  const year =
    new Date().getFullYear();

  const code =
    crypto.randomUUID()
      .replace(/-/g, '')
      .slice(0, 6)
      .toUpperCase();

  return `VL-${prefix}-${year}-${code}`;
}

function getOrCreateGeneratedCertificate(
  certificate: Certificate,
): GeneratedCertificate {
  const generated =
    readGeneratedCertificates();

  const existing =
    generated.find(
      (item) =>
        item.courseId ===
        certificate.courseId,
    );

  if (existing) {
    return existing;
  }

  const created:
    GeneratedCertificate = {
    courseId:
      certificate.courseId,
    issuedDate:
      formatIssuedDate(),
    credentialId:
      createCredentialId(
        certificate,
      ),
  };

  saveGeneratedCertificates([
    ...generated,
    created,
  ]);

  return created;
}

function resolveCertificate(
  certificate: Certificate,
): Certificate {
  if (
    certificate.status ===
    'earned'
  ) {
    return certificate;
  }

  const progress =
    getCourseProgress(
      certificate,
    );

  if (progress < 100) {
    return {
      ...certificate,
      progress,
      status:
        'in-progress',
      issuedDate: '',
      credentialId: '',
    };
  }

  const generated =
    getOrCreateGeneratedCertificate(
      certificate,
    );

  return {
    ...certificate,
    progress: 100,
    status: 'earned',
    issuedDate:
      generated.issuedDate,
    credentialId:
      generated.credentialId,
  };
}

export const engagementService = {
  getCertificates():
    Certificate[] {
    return certificates.map(
      resolveCertificate,
    );
  },

  markCertificateViewed(
    certificateId: string,
  ): void {
    const viewed =
      readViewedCertificates();

    if (
      !viewed.includes(
        certificateId,
      )
    ) {
      localStorage.setItem(
        CERTIFICATE_VIEWS_KEY,
        JSON.stringify([
          ...viewed,
          certificateId,
        ]),
      );
    }
  },

  hasViewedCertificate(
    certificateId: string,
  ): boolean {
    return readViewedCertificates().includes(
      certificateId,
    );
  },
};