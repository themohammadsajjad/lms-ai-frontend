const BOOKMARK_KEY = 'lms_bookmarks';
const BOOKMARK_DETAIL_KEY = 'lms_bookmark_details';
const NOTE_KEY = 'lms_lesson_notes';
const COMPLETED_KEY = 'lms_completed_lessons';
const VIDEO_POSITION_KEY = 'lms_video_positions';

export interface LessonNoteDetails {
  content: string;
  timestamp: number;
  updatedAt: string;
}

export interface BookmarkDetails {
  timestamp: number;
  createdAt: string;
}

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

function readRecord<T>(
  key: string,
): Record<string, T> {
  const stored = localStorage.getItem(key);

  if (!stored) {
    return {};
  }

  try {
    return JSON.parse(stored) as Record<
      string,
      T
    >;
  } catch {
    return {};
  }
}

function getLessonKey(
  courseId: string,
  lessonId: string,
) {
  return `${courseId}:${lessonId}`;
}

export const learningService = {
  isBookmarked(
    courseId: string,
    lessonId: string,
  ): boolean {
    return readArray(BOOKMARK_KEY).includes(
      getLessonKey(courseId, lessonId),
    );
  },

  getBookmarkDetails(
    courseId: string,
    lessonId: string,
  ): BookmarkDetails | null {
    const details =
      readRecord<BookmarkDetails>(
        BOOKMARK_DETAIL_KEY,
      );

    return (
      details[getLessonKey(courseId, lessonId)] ??
      null
    );
  },

  toggleBookmark(
    courseId: string,
    lessonId: string,
    timestamp = 0,
  ): boolean {
    const key = getLessonKey(
      courseId,
      lessonId,
    );

    const bookmarks = readArray(BOOKMARK_KEY);

    const alreadyBookmarked =
      bookmarks.includes(key);

    const updated = alreadyBookmarked
      ? bookmarks.filter(
          (item) => item !== key,
        )
      : [...bookmarks, key];

    localStorage.setItem(
      BOOKMARK_KEY,
      JSON.stringify(updated),
    );

    const details =
      readRecord<BookmarkDetails>(
        BOOKMARK_DETAIL_KEY,
      );

    if (alreadyBookmarked) {
      delete details[key];
    } else {
      details[key] = {
        timestamp: Math.max(
          0,
          Math.floor(timestamp),
        ),
        createdAt: new Date().toISOString(),
      };
    }

    localStorage.setItem(
      BOOKMARK_DETAIL_KEY,
      JSON.stringify(details),
    );

    return !alreadyBookmarked;
  },

  getNote(
    courseId: string,
    lessonId: string,
  ): string {
    return this.getNoteDetails(
      courseId,
      lessonId,
    ).content;
  },

  getNoteDetails(
    courseId: string,
    lessonId: string,
  ): LessonNoteDetails {
    const stored =
      localStorage.getItem(NOTE_KEY);

    if (!stored) {
      return {
        content: '',
        timestamp: 0,
        updatedAt: '',
      };
    }

    try {
      const notes = JSON.parse(stored) as Record<
        string,
        string | LessonNoteDetails
      >;

      const note =
        notes[
          getLessonKey(courseId, lessonId)
        ];

      // Supports notes saved by the older version.
      if (typeof note === 'string') {
        return {
          content: note,
          timestamp: 0,
          updatedAt: '',
        };
      }

      return (
        note ?? {
          content: '',
          timestamp: 0,
          updatedAt: '',
        }
      );
    } catch {
      return {
        content: '',
        timestamp: 0,
        updatedAt: '',
      };
    }
  },

  saveNote(
    courseId: string,
    lessonId: string,
    content: string,
    timestamp = 0,
  ): void {
    const stored =
      localStorage.getItem(NOTE_KEY);

    let notes: Record<
      string,
      string | LessonNoteDetails
    > = {};

    if (stored) {
      try {
        notes = JSON.parse(stored) as Record<
          string,
          string | LessonNoteDetails
        >;
      } catch {
        notes = {};
      }
    }

    notes[
      getLessonKey(courseId, lessonId)
    ] = {
      content,
      timestamp: Math.max(
        0,
        Math.floor(timestamp),
      ),
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      NOTE_KEY,
      JSON.stringify(notes),
    );
  },

  getVideoPosition(
    courseId: string,
    lessonId: string,
  ): number {
    const positions =
      readRecord<number>(
        VIDEO_POSITION_KEY,
      );

    return (
      positions[
        getLessonKey(courseId, lessonId)
      ] ?? 0
    );
  },

  saveVideoPosition(
    courseId: string,
    lessonId: string,
    position: number,
  ): void {
    const positions =
      readRecord<number>(
        VIDEO_POSITION_KEY,
      );

    positions[
      getLessonKey(courseId, lessonId)
    ] = Math.max(
      0,
      Math.floor(position),
    );

    localStorage.setItem(
      VIDEO_POSITION_KEY,
      JSON.stringify(positions),
    );
  },

  isCompleted(
    courseId: string,
    lessonId: string,
  ): boolean {
    return readArray(
      COMPLETED_KEY,
    ).includes(
      getLessonKey(courseId, lessonId),
    );
  },

  markCompleted(
    courseId: string,
    lessonId: string,
  ): void {
    const key = getLessonKey(
      courseId,
      lessonId,
    );

    const completed = readArray(
      COMPLETED_KEY,
    );

    if (!completed.includes(key)) {
      localStorage.setItem(
        COMPLETED_KEY,
        JSON.stringify([
          ...completed,
          key,
        ]),
      );
    }
  },
};