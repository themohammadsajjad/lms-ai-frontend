export interface InstructorAnnouncement {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  message: string;
  createdAt: string;
}

export interface CreateAnnouncementData {
  courseId: string;
  courseTitle: string;
  title: string;
  message: string;
}

const ANNOUNCEMENTS_KEY =
  'lms_instructor_announcements';

function readAnnouncements():
  InstructorAnnouncement[] {
  const stored =
    localStorage.getItem(
      ANNOUNCEMENTS_KEY,
    );

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(
      stored,
    ) as InstructorAnnouncement[];
  } catch {
    return [];
  }
}

function saveAnnouncements(
  announcements:
    InstructorAnnouncement[],
) {
  localStorage.setItem(
    ANNOUNCEMENTS_KEY,
    JSON.stringify(
      announcements,
    ),
  );
}

export const instructorAnnouncementService = {
  getAnnouncements():
    InstructorAnnouncement[] {
    return readAnnouncements();
  },

  getAnnouncementsForCourse(
    courseId: string,
  ): InstructorAnnouncement[] {
    return readAnnouncements().filter(
      (announcement) =>
        announcement.courseId ===
        courseId,
    );
  },

  createAnnouncement(
    data: CreateAnnouncementData,
  ): InstructorAnnouncement[] {
    const announcements =
      readAnnouncements();

    const newAnnouncement:
      InstructorAnnouncement = {
      id: crypto.randomUUID(),
      courseId: data.courseId,
      courseTitle:
        data.courseTitle,
      title: data.title.trim(),
      message:
        data.message.trim(),
      createdAt:
        new Date().toISOString(),
    };

    const updated:
      InstructorAnnouncement[] = [
      newAnnouncement,
      ...announcements,
    ];

    saveAnnouncements(updated);

    return updated;
  },

  deleteAnnouncement(
    announcementId: string,
  ): InstructorAnnouncement[] {
    const updated =
      readAnnouncements().filter(
        (announcement) =>
          announcement.id !==
          announcementId,
      );

    saveAnnouncements(updated);

    return updated;
  },
};