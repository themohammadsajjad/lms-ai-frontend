import {
  moderationSeedReports,
  type ModerationReport,
  type ModerationStatus,
} from '../data/adminModerationData';
import {
  discussionSeedPosts,
  type DiscussionPost,
} from '../data/communicationData';

const MODERATION_KEY =
  'lms_admin_moderation_reports';

const DISCUSSIONS_KEY =
  'lms_discussions';

function readReports():
  ModerationReport[] {
  const stored =
    localStorage.getItem(
      MODERATION_KEY,
    );

  if (!stored) {
    localStorage.setItem(
      MODERATION_KEY,
      JSON.stringify(
        moderationSeedReports,
      ),
    );

    return moderationSeedReports;
  }

  try {
    return JSON.parse(
      stored,
    ) as ModerationReport[];
  } catch {
    localStorage.setItem(
      MODERATION_KEY,
      JSON.stringify(
        moderationSeedReports,
      ),
    );

    return moderationSeedReports;
  }
}

function saveReports(
  reports: ModerationReport[],
) {
  localStorage.setItem(
    MODERATION_KEY,
    JSON.stringify(reports),
  );
}

function readDiscussions():
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

function updateReportStatus(
  reportId: string,
  status: ModerationStatus,
): ModerationReport[] {
  const updated =
    readReports().map(
      (report) => {
        if (
          report.id !== reportId
        ) {
          return report;
        }

        return {
          ...report,
          status,
        };
      },
    );

  saveReports(updated);

  return updated;
}

export const adminModerationService = {
  getReports():
    ModerationReport[] {
    return readReports();
  },

  dismissReport(
    reportId: string,
  ): ModerationReport[] {
    return updateReportStatus(
      reportId,
      'dismissed',
    );
  },

  removeContent(
    reportId: string,
  ): ModerationReport[] {
    const reports =
      readReports();

    const targetReport =
      reports.find(
        (report) =>
          report.id === reportId,
      );

    if (!targetReport) {
      return reports;
    }

    const discussions =
      readDiscussions();

    let updatedDiscussions:
      DiscussionPost[];

    if (
      targetReport.contentType ===
      'post'
    ) {
      updatedDiscussions =
        discussions.filter(
          (post) =>
            post.id !==
            targetReport.postId,
        );
    } else {
      updatedDiscussions =
        discussions.map(
          (post) => {
            if (
              post.id !==
              targetReport.postId
            ) {
              return post;
            }

            return {
              ...post,
              replies:
                post.replies.filter(
                  (reply) =>
                    reply.id !==
                    targetReport.replyId,
                ),
            };
          },
        );
    }

    saveDiscussions(
      updatedDiscussions,
    );

    return updateReportStatus(
      reportId,
      'removed',
    );
  },

  restorePending(
    reportId: string,
  ): ModerationReport[] {
    return updateReportStatus(
      reportId,
      'pending',
    );
  },

  getPendingCount(): number {
    return readReports().filter(
      (report) =>
        report.status ===
        'pending',
    ).length;
  },
};