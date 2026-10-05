import {
  studyResources,
  type StudyTopic,
} from '../data/studyToolsData';
import { quizzes } from '../data/assessmentData';
import { assessmentService } from './assessmentService';

export type MasteryLevel =
  | 'developing'
  | 'proficient'
  | 'strong';

export type AdaptiveDifficulty =
  | 'beginner'
  | 'intermediate'
  | 'advanced';

export interface TopicMastery {
  courseId: string;
  topicTitle: string;
  score: number;
  level: MasteryLevel;
  updatedAt: string;
}

const MASTERY_KEY =
  'lms_topic_mastery';

function clampScore(
  score: number,
) {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(score),
    ),
  );
}

function getLevel(
  score: number,
): MasteryLevel {
  if (score >= 80) {
    return 'strong';
  }

  if (score >= 60) {
    return 'proficient';
  }

  return 'developing';
}

function getBaseScore(
  status: StudyTopic['status'],
) {
  if (status === 'strong') {
    return 82;
  }

  if (status === 'review') {
    return 55;
  }

  return 42;
}

function readMastery():
  TopicMastery[] {
  const stored =
    localStorage.getItem(
      MASTERY_KEY,
    );

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(
      stored,
    ) as TopicMastery[];
  } catch {
    return [];
  }
}

function saveMastery(
  mastery: TopicMastery[],
) {
  localStorage.setItem(
    MASTERY_KEY,
    JSON.stringify(mastery),
  );
}

function getCourseQuizPercentage(
  courseId: string,
): number | null {
  const quiz =
    quizzes.find(
      (item) =>
        item.courseId ===
        courseId,
    );

  if (!quiz) {
    return null;
  }

  const attempt =
    assessmentService.getQuizAttempt(
      quiz.id,
    );

  if (
    !attempt ||
    attempt.total === 0
  ) {
    return null;
  }

  return Math.round(
    (attempt.score /
      attempt.total) *
      100,
  );
}

function createCourseMastery(
  courseId: string,
): TopicMastery[] {
  const resource =
    studyResources.find(
      (item) =>
        item.courseId ===
        courseId,
    );

  if (!resource) {
    return [];
  }

  const quizPercentage =
    getCourseQuizPercentage(
      courseId,
    );

  return resource.topics.map(
    (topic) => {
      const baseScore =
        getBaseScore(
          topic.status,
        );

      const score =
        quizPercentage === null
          ? baseScore
          : clampScore(
              baseScore *
                0.55 +
                quizPercentage *
                  0.45,
            );

      return {
        courseId,
        topicTitle:
          topic.title,
        score,
        level:
          getLevel(score),
        updatedAt:
          new Date().toISOString(),
      };
    },
  );
}

export const topicMasteryService = {
  getCourseMastery(
    courseId: string,
  ): TopicMastery[] {
    const stored =
      readMastery();

    const existing =
      stored.filter(
        (item) =>
          item.courseId ===
          courseId,
      );

    if (
      existing.length > 0
    ) {
      return existing;
    }

    const initial =
      createCourseMastery(
        courseId,
      );

    const updated = [
      ...stored,
      ...initial,
    ];

    saveMastery(updated);

    return initial;
  },

  syncFromQuiz(
    courseId: string,
  ): TopicMastery[] {
    const current =
      readMastery();

    const recalculated =
      createCourseMastery(
        courseId,
      );

    const updated = [
      ...current.filter(
        (item) =>
          item.courseId !==
          courseId,
      ),
      ...recalculated,
    ];

    saveMastery(updated);

    return recalculated;
  },

  recordTutorInteraction(
    courseId: string,
    topicTitle: string,
  ): TopicMastery[] {
    const currentCourse =
      this.getCourseMastery(
        courseId,
      );

    const updatedCourse =
      currentCourse.map(
        (topic) => {
          if (
            topic.topicTitle !==
            topicTitle
          ) {
            return topic;
          }

          const score =
            clampScore(
              topic.score + 2,
            );

          return {
            ...topic,
            score,
            level:
              getLevel(score),
            updatedAt:
              new Date().toISOString(),
          };
        },
      );

    const all =
      readMastery();

    saveMastery([
      ...all.filter(
        (item) =>
          item.courseId !==
          courseId,
      ),
      ...updatedCourse,
    ]);

    return updatedCourse;
  },

  getAverageMastery(
    courseId: string,
  ): number {
    const topics =
      this.getCourseMastery(
        courseId,
      );

    if (
      topics.length === 0
    ) {
      return 0;
    }

    return Math.round(
      topics.reduce(
        (total, topic) =>
          total +
          topic.score,
        0,
      ) /
        topics.length,
    );
  },

  getRecommendedDifficulty(
    courseId: string,
  ): AdaptiveDifficulty {
    const average =
      this.getAverageMastery(
        courseId,
      );

    if (average < 55) {
      return 'beginner';
    }

    if (average < 80) {
      return 'intermediate';
    }

    return 'advanced';
  },
};