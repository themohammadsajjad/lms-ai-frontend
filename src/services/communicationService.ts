import {
  discussionSeedPosts,
  notifications,
  type DiscussionPost,
} from '../data/communicationData';

const READ_NOTIFICATIONS_KEY = 'lms_read_notifications';
const DISCUSSIONS_KEY = 'lms_discussions';

function readNotificationIds(): string[] {
  const stored = localStorage.getItem(READ_NOTIFICATIONS_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

function notifyNotificationChange() {
  window.dispatchEvent(
    new Event('vertexlearn-notifications-updated'),
  );
}

export const notificationService = {
  isRead(notificationId: string): boolean {
    return readNotificationIds().includes(notificationId);
  },

  getUnreadCount(): number {
    const read = readNotificationIds();

    return notifications.filter(
      (notification) => !read.includes(notification.id),
    ).length;
  },

  markRead(notificationId: string): void {
    const current = readNotificationIds();

    if (!current.includes(notificationId)) {
      localStorage.setItem(
        READ_NOTIFICATIONS_KEY,
        JSON.stringify([...current, notificationId]),
      );
    }

    notifyNotificationChange();
  },

  markAllRead(): void {
    localStorage.setItem(
      READ_NOTIFICATIONS_KEY,
      JSON.stringify(
        notifications.map((notification) => notification.id),
      ),
    );

    notifyNotificationChange();
  },
};

function getStoredDiscussions(): DiscussionPost[] {
  const stored = localStorage.getItem(DISCUSSIONS_KEY);

  if (!stored) {
    localStorage.setItem(
      DISCUSSIONS_KEY,
      JSON.stringify(discussionSeedPosts),
    );

    return discussionSeedPosts;
  }

  try {
    return JSON.parse(stored) as DiscussionPost[];
  } catch {
    localStorage.setItem(
      DISCUSSIONS_KEY,
      JSON.stringify(discussionSeedPosts),
    );

    return discussionSeedPosts;
  }
}

function saveDiscussions(posts: DiscussionPost[]) {
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
    const current = getStoredDiscussions();

    const newPost: DiscussionPost = {
      id: crypto.randomUUID(),
      courseTitle,
      author,
      title,
      message,
      createdAt: 'Just now',
      replies: [],
    };

    const updated = [newPost, ...current];

    saveDiscussions(updated);

    return updated;
  },

  addReply(
    postId: string,
    author: string,
    message: string,
  ): DiscussionPost[] {
    const current = getStoredDiscussions();

    const updated = current.map((post) => {
      if (post.id !== postId) {
        return post;
      }

      return {
        ...post,
        replies: [
          ...post.replies,
          {
            id: crypto.randomUUID(),
            author,
            message,
            createdAt: 'Just now',
          },
        ],
      };
    });

    saveDiscussions(updated);

    return updated;
  },
};