import {
  discussionSeedPosts,
  notifications,
  type AppNotification,
  type DiscussionPost,
} from '../data/communicationData';
import { courses } from '../data/mockData';
import { instructorAnnouncementService } from './instructorAnnouncementService';

const READ_NOTIFICATIONS_KEY =
  'lms_read_notifications';

const DISCUSSIONS_KEY =
  'lms_discussions';

function readNotificationIds(): string[] {
  const stored =
    localStorage.getItem(
      READ_NOTIFICATIONS_KEY,
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

function notifyNotificationChange() {
  window.dispatchEvent(
    new Event(
      'vertexlearn-notifications-updated',
    ),
  );
}

function formatAnnouncementTime(
  createdAt: string,
): string {
  const date = new Date(createdAt);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return 'Recently';
  }

  return date.toLocaleString();
}

function getAnnouncementNotifications():
  AppNotification[] {
  const enrolledCourses =
    courses.filter(
      (course) =>
        course.enrolled,
    );

  const enrolledCourseMap =
    new Map(
      enrolledCourses.map(
        (course) => [
          course.title,
          course.id,
        ],
      ),
    );

  return instructorAnnouncementService
    .getAnnouncements()
    .filter((announcement) =>
      enrolledCourseMap.has(
        announcement.courseTitle,
      ),
    )
    .map(
      (
        announcement,
      ): AppNotification => {
        const studentCourseId =
          enrolledCourseMap.get(
            announcement.courseTitle,
          );

        return {
          id: `announcement-${announcement.id}`,
          title:
            announcement.title,
          message:
            announcement.message,
          time:
            formatAnnouncementTime(
              announcement.createdAt,
            ),
          type: 'announcement',
          path: studentCourseId
            ? `/courses/${studentCourseId}`
            : '/courses',
        };
      },
    );
}

function getAllNotifications():
  AppNotification[] {
  return [
    ...getAnnouncementNotifications(),
    ...notifications,
  ];
}

export const notificationService = {
  getNotifications():
    AppNotification[] {
    return getAllNotifications();
  },

  isRead(
    notificationId: string,
  ): boolean {
    return readNotificationIds().includes(
      notificationId,
    );
  },

  getUnreadCount(): number {
    const read =
      readNotificationIds();

    return getAllNotifications().filter(
      (notification) =>
        !read.includes(
          notification.id,
        ),
    ).length;
  },

  markRead(
    notificationId: string,
  ): void {
    const current =
      readNotificationIds();

    if (
      !current.includes(
        notificationId,
      )
    ) {
      localStorage.setItem(
        READ_NOTIFICATIONS_KEY,
        JSON.stringify([
          ...current,
          notificationId,
        ]),
      );
    }

    notifyNotificationChange();
  },

  markAllRead(): void {
    localStorage.setItem(
      READ_NOTIFICATIONS_KEY,
      JSON.stringify(
        getAllNotifications().map(
          (notification) =>
            notification.id,
        ),
      ),
    );

    notifyNotificationChange();
  },
};

function getStoredDiscussions():
  DiscussionPost[] {
  const stored =
    localStorage.getItem(
      DISCUSSIONS_KEY,
    );

  if (!stored) {
    localStorage.setItem(
      DISCUSSIONS_KEY,
      JSON.stringify(
        discussionSeedPosts,
      ),
    );

    return discussionSeedPosts;
  }

  try {
    return JSON.parse(
      stored,
    ) as DiscussionPost[];
  } catch {
    localStorage.setItem(
      DISCUSSIONS_KEY,
      JSON.stringify(
        discussionSeedPosts,
      ),
    );

    return discussionSeedPosts;
  }
}

function saveDiscussions(
  posts: DiscussionPost[],
) {
  localStorage.setItem(
    DISCUSSIONS_KEY,
    JSON.stringify(posts),
  );
}

export const discussionService = {
  getPosts(): DiscussionPost[] {
    return getStoredDiscussions();
  },

  addPost(
    author: string,
    courseTitle: string,
    title: string,
    message: string,
  ): DiscussionPost[] {
    const current =
      getStoredDiscussions();

    const newPost:
      DiscussionPost = {
      id: crypto.randomUUID(),
      courseTitle,
      author,
      title,
      message,
      createdAt: 'Just now',
      replies: [],
    };

    const updated = [
      newPost,
      ...current,
    ];

    saveDiscussions(updated);

    return updated;
  },

  addReply(
    postId: string,
    author: string,
    message: string,
  ): DiscussionPost[] {
    const current =
      getStoredDiscussions();

    const updated =
      current.map(
        (post) => {
          if (
            post.id !== postId
          ) {
            return post;
          }

          return {
            ...post,
            replies: [
              ...post.replies,
              {
                id:
                  crypto.randomUUID(),
                author,
                message,
                createdAt:
                  'Just now',
              },
            ],
          };
        },
      );

    saveDiscussions(updated);

    return updated;
  },
};