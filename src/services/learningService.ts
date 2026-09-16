const BOOKMARK_KEY = 'lms_bookmarks';
const NOTE_KEY = 'lms_lesson_notes';
const COMPLETED_KEY = 'lms_completed_lessons';

function readArray(key: string): string[] {
  const stored = localStorage.getItem(key);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

function getLessonKey(courseId: string, lessonId: string) {
  return `${courseId}:${lessonId}`;
}

export const learningService = {
  isBookmarked(courseId: string, lessonId: string): boolean {
    return readArray(BOOKMARK_KEY).includes(
      getLessonKey(courseId, lessonId),
    );
  },

  toggleBookmark(courseId: string, lessonId: string): boolean {
    const key = getLessonKey(courseId, lessonId);
    const bookmarks = readArray(BOOKMARK_KEY);

    const updated = bookmarks.includes(key)
      ? bookmarks.filter((item) => item !== key)
      : [...bookmarks, key];

    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));

    return updated.includes(key);
  },

  getNote(courseId: string, lessonId: string): string {
    const stored = localStorage.getItem(NOTE_KEY);

    if (!stored) {
      return '';
    }

    try {
      const notes = JSON.parse(stored) as Record<string, string>;
      return notes[getLessonKey(courseId, lessonId)] ?? '';
    } catch {
      return '';
    }
  },

  saveNote(courseId: string, lessonId: string, note: string): void {
    const stored = localStorage.getItem(NOTE_KEY);

    let notes: Record<string, string> = {};

    if (stored) {
      try {
        notes = JSON.parse(stored) as Record<string, string>;
      } catch {
        notes = {};
      }
    }

    notes[getLessonKey(courseId, lessonId)] = note;

    localStorage.setItem(NOTE_KEY, JSON.stringify(notes));
  },

  isCompleted(courseId: string, lessonId: string): boolean {
    return readArray(COMPLETED_KEY).includes(
      getLessonKey(courseId, lessonId),
    );
  },

  markCompleted(courseId: string, lessonId: string): void {
    const key = getLessonKey(courseId, lessonId);
    const completed = readArray(COMPLETED_KEY);

    if (!completed.includes(key)) {
      localStorage.setItem(
        COMPLETED_KEY,
        JSON.stringify([...completed, key]),
      );
    }
  },
};