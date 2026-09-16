const CERTIFICATE_VIEWS_KEY = 'lms_certificate_views';

function readViewedCertificates(): string[] {
  const stored = localStorage.getItem(CERTIFICATE_VIEWS_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

export const engagementService = {
  markCertificateViewed(certificateId: string): void {
    const viewed = readViewedCertificates();

    if (!viewed.includes(certificateId)) {
      localStorage.setItem(
        CERTIFICATE_VIEWS_KEY,
        JSON.stringify([...viewed, certificateId]),
      );
    }
  },

  hasViewedCertificate(certificateId: string): boolean {
    return readViewedCertificates().includes(certificateId);
  },
};