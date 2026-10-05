import {
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  FileText,
  Gauge,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react';
import { useState } from 'react';
import { quizzes } from '../data/assessmentData';
import { lessonsByCourse } from '../data/learningData';
import {
  getLectureTranscript,
} from '../data/lectureTranscriptData';
import { studyResources } from '../data/studyToolsData';
import { assessmentService } from '../services/assessmentService';
import { studyToolsService } from '../services/studyToolsService';
import { topicMasteryService } from '../services/topicMasteryService';

const initialCourseId =
  studyResources[0]?.courseId ?? '';

const initialModuleTitle =
  studyResources[0]?.flashcards[0]
    ?.moduleTitle ?? '';

function StudyTools() {
  const [courseId, setCourseId] =
    useState(initialCourseId);

  const [
    selectedLessonId,
    setSelectedLessonId,
  ] = useState(
    lessonsByCourse[
      initialCourseId
    ]?.[0]?.id ?? '',
  );

  const [
    selectedModuleTitle,
    setSelectedModuleTitle,
  ] = useState(
    initialModuleTitle,
  );

  const [
    generatedSummaryLessonId,
    setGeneratedSummaryLessonId,
  ] = useState<
    string | null
  >(null);

  const [
    flippedCardId,
    setFlippedCardId,
  ] = useState<
    string | null
  >(null);

  const [, setVersion] =
    useState(0);

  const resource =
    studyResources.find(
      (item) =>
        item.courseId ===
        courseId,
    );

  if (!resource) {
    return (
      <section className="learning-empty-state">
        <BrainCircuit
          size={38}
        />

        <h1>
          Study tools unavailable
        </h1>

        <p>
          No study resources are
          available for this
          course yet.
        </p>
      </section>
    );
  }

  const activeResource =
    resource;

  const courseLessons =
    lessonsByCourse[
      activeResource.courseId
    ] ?? [];

  const selectedLesson =
    courseLessons.find(
      (lesson) =>
        lesson.id ===
        selectedLessonId,
    );

  const selectedTranscript =
    selectedLesson
      ? getLectureTranscript(
          selectedLesson.id,
        )
      : undefined;

  const generatedSummary =
    generatedSummaryLessonId ===
      selectedLesson?.id &&
    selectedTranscript
      ? selectedTranscript.keyPoints
      : null;

  const moduleTitles =
    Array.from(
      new Set(
        activeResource.flashcards.map(
          (card) =>
            card.moduleTitle,
        ),
      ),
    );

  const activeModuleTitle =
    moduleTitles.includes(
      selectedModuleTitle,
    )
      ? selectedModuleTitle
      : moduleTitles[0] ?? '';

  const moduleFlashcards =
    activeResource.flashcards.filter(
      (card) =>
        card.moduleTitle ===
        activeModuleTitle,
    );

  const cardIds =
    moduleFlashcards.map(
      (card) =>
        card.id,
    );

  const masteredCount =
    studyToolsService.getMasteredCount(
      cardIds,
    );

  const masteryPercentage =
    cardIds.length > 0
      ? Math.round(
          (masteredCount /
            cardIds.length) *
            100,
        )
      : 0;

  const courseQuiz =
    quizzes.find(
      (quiz) =>
        quiz.courseId ===
        activeResource.courseId,
    );

  const quizAttempt =
    courseQuiz
      ? assessmentService.getQuizAttempt(
          courseQuiz.id,
        )
      : null;

  const quizPercentage =
    quizAttempt
      ? Math.round(
          (quizAttempt.score /
            quizAttempt.total) *
            100,
        )
      : null;

  const topicMastery =
    topicMasteryService.getCourseMastery(
      activeResource.courseId,
    );

  const averageTopicMastery =
    topicMasteryService.getAverageMastery(
      activeResource.courseId,
    );

  const recommendedDifficulty =
    topicMasteryService.getRecommendedDifficulty(
      activeResource.courseId,
    );

  const reviewTopic =
    activeResource.topics.find(
      (topic) =>
        topic.status ===
        'review',
    );

  const nextTopic =
    activeResource.topics.find(
      (topic) =>
        topic.status ===
        'next',
    );

  function getPersonalizedPlan() {
    if (
      quizPercentage === null
    ) {
      return {
        status:
          'Assessment needed',
        headline:
          'Complete a quiz to personalize your plan',
        description:
          'Your recommendations will adapt once a quiz score is available.',
        steps: [
          `Review ${
            reviewTopic?.title ??
            'the current course topics'
          } before your assessment.`,
          'Practice the available flashcards and mark confident answers as mastered.',
          'Complete the course quiz so VertexLearn can identify your current learning level.',
          'Return here after the quiz to see a score-based study recommendation.',
        ],
      };
    }

    if (
      quizPercentage < 60
    ) {
      return {
        status:
          'Needs focused review',
        headline:
          'Strengthen the fundamentals first',
        description: `Your latest quiz score is ${quizPercentage}%. Focus on weaker concepts before moving ahead.`,
        steps: [
          `Review ${
            reviewTopic?.title ??
            'the topic marked Needs review'
          } carefully.`,
          'Practice every flashcard at least once before marking cards as mastered.',
          'Use AI Tutor in Beginner mode for concepts that are still unclear.',
          'Retake the quiz after revision and aim for at least 60%.',
        ],
      };
    }

    if (
      quizPercentage < 80
    ) {
      return {
        status:
          'Good progress',
        headline:
          'Target the remaining weak areas',
        description: `Your latest quiz score is ${quizPercentage}%. Your fundamentals are developing, but a focused review can improve mastery.`,
        steps: [
          `Spend extra time on ${
            reviewTopic?.title ??
            'the recommended review topic'
          }.`,
          'Practice the flashcards that you have not mastered yet.',
          'Use AI Tutor in Intermediate mode for practical explanations.',
          `Continue with ${
            nextTopic?.title ??
            'the next recommended topic'
          } after review.`,
        ],
      };
    }

    return {
      status:
        'Strong performance',
      headline:
        'You are ready to progress',
      description: `Your latest quiz score is ${quizPercentage}%. Continue building on your strong assessment performance.`,
      steps: [
        `Continue with ${
          nextTopic?.title ??
          'the next recommended topic'
        }.`,
        'Master any remaining flashcards to reinforce long-term recall.',
        'Use AI Tutor in Advanced mode to explore deeper concepts and edge cases.',
        'Attempt another assessment after completing the next learning topic.',
      ],
    };
  }

  const personalizedPlan =
    getPersonalizedPlan();

  function handleCourseChange(
    value: string,
  ) {
    setCourseId(value);

    const nextResource =
      studyResources.find(
        (item) =>
          item.courseId ===
          value,
      );

    const firstLesson =
      lessonsByCourse[
        value
      ]?.[0];

    const firstModule =
      nextResource
        ?.flashcards[0]
        ?.moduleTitle ?? '';

    setSelectedLessonId(
      firstLesson?.id ??
        '',
    );

    setSelectedModuleTitle(
      firstModule,
    );

    setGeneratedSummaryLessonId(
      null,
    );

    setFlippedCardId(
      null,
    );
  }

  function handleLessonChange(
    value: string,
  ) {
    setSelectedLessonId(
      value,
    );

    setGeneratedSummaryLessonId(
      null,
    );
  }

  function handleModuleChange(
    value: string,
  ) {
    setSelectedModuleTitle(
      value,
    );

    setFlippedCardId(
      null,
    );
  }

  function handleGenerateSummary() {
    if (
      !selectedLesson ||
      !selectedTranscript
    ) {
      return;
    }

    setGeneratedSummaryLessonId(
      selectedLesson.id,
    );
  }

  function handleMastered(
    cardId: string,
  ) {
    studyToolsService.toggleMastered(
      cardId,
    );

    setVersion(
      (value) =>
        value + 1,
    );
  }

  function formatDifficulty() {
    return (
      recommendedDifficulty
        .charAt(0)
        .toUpperCase() +
      recommendedDifficulty.slice(
        1,
      )
    );
  }

  return (
    <section className="study-tools-page">
      <div className="study-tools-header">
        <div>
          <span className="eyebrow">
            AI study toolkit
          </span>

          <h1>
            Study Tools
          </h1>

          <p>
            Summarize selected
            lectures, practice
            module-specific
            flashcards and follow
            recommendations based
            on your quiz
            performance and topic
            mastery.
          </p>
        </div>

        <div className="study-course-select">
          <BookOpen
            size={16}
          />

          <select
            value={
              courseId
            }
            onChange={(
              event,
            ) =>
              handleCourseChange(
                event.target
                  .value,
              )
            }
          >
            {studyResources.map(
              (item) => (
                <option
                  key={
                    item.courseId
                  }
                  value={
                    item.courseId
                  }
                >
                  {
                    item.courseTitle
                  }
                </option>
              ),
            )}
          </select>

          <ChevronDown
            size={15}
          />
        </div>
      </div>

      <div className="study-overview-grid">
        <article className="study-summary-card">
          <div className="study-section-title">
            <div className="study-icon purple">
              <Sparkles
                size={20}
              />
            </div>

            <div>
              <span>
                Course summary
              </span>

              <h2>
                {
                  activeResource.courseTitle
                }
              </h2>
            </div>
          </div>

          <div className="summary-points">
            {activeResource.summary.map(
              (
                point,
                index,
              ) => (
                <div
                  key={point}
                >
                  <span>
                    {index + 1}
                  </span>

                  <p>
                    {point}
                  </p>
                </div>
              ),
            )}
          </div>
        </article>

        <article className="mastery-card">
          <div className="mastery-circle">
            <strong>
              {
                masteryPercentage
              }
              %
            </strong>

            <span>
              Mastered
            </span>
          </div>

          <div>
            <span className="eyebrow">
              Module flashcard
              progress
            </span>

            <h2>
              {masteredCount}{' '}
              of{' '}
              {
                moduleFlashcards.length
              }{' '}
              mastered
            </h2>

            <p>
              Progress for{' '}
              <strong>
                {
                  activeModuleTitle
                }
              </strong>
              . Mark cards as
              mastered when you
              can recall the
              answer without
              help.
            </p>

            <div className="mastery-track">
              <div
                style={{
                  width: `${masteryPercentage}%`,
                }}
              />
            </div>
          </div>
        </article>
      </div>

      <article className="lecture-summary-card">
        <div className="lecture-summary-heading">
          <div className="lecture-summary-icon">
            <FileText
              size={22}
            />
          </div>

          <div>
            <span>
              AI lecture summary
            </span>

            <h2>
              Summarize a selected
              lecture
            </h2>

            <p>
              Choose a lecture
              and generate key
              points from its
              course transcript.
            </p>
          </div>
        </div>

        <div className="lecture-summary-controls">
          <label>
            <span>
              Lecture
            </span>

            <div className="lecture-select-wrapper">
              <select
                value={
                  selectedLessonId
                }
                onChange={(
                  event,
                ) =>
                  handleLessonChange(
                    event.target
                      .value,
                  )
                }
                disabled={
                  courseLessons.length ===
                  0
                }
              >
                {courseLessons.length >
                0 ? (
                  courseLessons.map(
                    (lesson) => (
                      <option
                        key={
                          lesson.id
                        }
                        value={
                          lesson.id
                        }
                      >
                        {lesson.module}{' '}
                        —{' '}
                        {
                          lesson.title
                        }
                      </option>
                    ),
                  )
                ) : (
                  <option value="">
                    No lectures
                    available
                  </option>
                )}
              </select>

              <ChevronDown
                size={15}
              />
            </div>
          </label>

          <button
            type="button"
            className="generate-lecture-summary-button"
            disabled={
              !selectedLesson ||
              !selectedTranscript
            }
            onClick={
              handleGenerateSummary
            }
          >
            <Sparkles
              size={15}
            />

            Generate AI Summary
          </button>
        </div>

        {selectedLesson && (
          <div className="selected-lecture-context">
            <div>
              <span>
                Selected lecture
              </span>

              <strong>
                {
                  selectedLesson.title
                }
              </strong>

              <small>
                {
                  selectedLesson.module
                }{' '}
                ·{' '}
                {
                  selectedLesson.duration
                }
              </small>
            </div>

            <span className="transcript-status">
              {selectedTranscript
                ? 'Transcript ready'
                : 'Transcript unavailable'}
            </span>
          </div>
        )}

        {generatedSummary ? (
          <div className="generated-lecture-summary">
            <div className="generated-summary-header">
              <div>
                <span>
                  AI-generated key
                  points
                </span>

                <h3>
                  {
                    selectedLesson?.title
                  }
                </h3>
              </div>

              <Sparkles
                size={18}
              />
            </div>

            <div className="generated-summary-points">
              {generatedSummary.map(
                (
                  point,
                  index,
                ) => (
                  <div
                    key={
                      point
                    }
                  >
                    <span>
                      {String(
                        index +
                          1,
                      ).padStart(
                        2,
                        '0',
                      )}
                    </span>

                    <p>
                      {
                        point
                      }
                    </p>
                  </div>
                ),
              )}
            </div>

            <div className="generated-summary-source">
              <FileText
                size={14}
              />

              Generated from the
              selected lecture
              transcript
            </div>
          </div>
        ) : (
          <div className="lecture-summary-placeholder">
            <Sparkles
              size={20}
            />

            <div>
              <strong>
                {selectedTranscript
                  ? 'Ready to summarize'
                  : 'Summary unavailable'}
              </strong>

              <span>
                {selectedTranscript
                  ? 'Generate a concise set of key points from this lecture transcript.'
                  : 'This lecture does not have transcript data in the frontend demo yet.'}
              </span>
            </div>
          </div>
        )}
      </article>

      <article className="study-quiz-insight">
        <div className="study-quiz-insight-icon">
          <Trophy
            size={21}
          />
        </div>

        <div className="study-quiz-insight-content">
          <span>
            Quiz performance
          </span>

          <h2>
            {quizPercentage !==
            null
              ? `${quizPercentage}% latest score`
              : 'No quiz attempt yet'}
          </h2>

          <p>
            {
              personalizedPlan.description
            }
          </p>
        </div>

        <div className="study-plan-status">
          {
            personalizedPlan.status
          }
        </div>
      </article>

      <article className="topic-mastery-overview">
        <div className="topic-mastery-overview-icon">
          <Gauge
            size={22}
          />
        </div>

        <div className="topic-mastery-overview-content">
          <span>
            Adaptive learning
          </span>

          <h2>
            {averageTopicMastery}%
            average topic mastery
          </h2>

          <p>
            Your topic-level
            mastery is calculated
            from course progress
            signals and your
            latest quiz
            performance.
          </p>
        </div>

        <div className="adaptive-difficulty-card">
          <span>
            Recommended AI level
          </span>

          <strong>
            {formatDifficulty()}
          </strong>

          <small>
            Adjusted from current
            mastery
          </small>
        </div>
      </article>

      <section className="flashcard-section">
        <div className="section-heading">
          <div>
            <h2>
              Module Flashcards
            </h2>

            <p>
              Practice AI study
              cards for one
              module at a time.
            </p>
          </div>

          <div className="flashcard-module-tools">
            <label className="flashcard-module-select">
              <span>
                Module
              </span>

              <div>
                <select
                  value={
                    activeModuleTitle
                  }
                  onChange={(
                    event,
                  ) =>
                    handleModuleChange(
                      event.target
                        .value,
                    )
                  }
                  disabled={
                    moduleTitles.length ===
                    0
                  }
                >
                  {moduleTitles.map(
                    (
                      moduleTitle,
                    ) => (
                      <option
                        key={
                          moduleTitle
                        }
                        value={
                          moduleTitle
                        }
                      >
                        {
                          moduleTitle
                        }
                      </option>
                    ),
                  )}
                </select>

                <ChevronDown
                  size={14}
                />
              </div>
            </label>

            <span className="flashcard-count">
              {
                moduleFlashcards.length
              }{' '}
              cards
            </span>
          </div>
        </div>

        {moduleFlashcards.length >
        0 ? (
          <div className="flashcard-grid">
            {moduleFlashcards.map(
              (
                card,
                index,
              ) => {
                const flipped =
                  flippedCardId ===
                  card.id;

                const mastered =
                  studyToolsService.isMastered(
                    card.id,
                  );

                return (
                  <article
                    className={`flashcard ${
                      flipped
                        ? 'flipped'
                        : ''
                    } ${
                      mastered
                        ? 'mastered'
                        : ''
                    }`}
                    key={
                      card.id
                    }
                  >
                    <button
                      type="button"
                      className="flashcard-main"
                      onClick={() =>
                        setFlippedCardId(
                          flipped
                            ? null
                            : card.id,
                        )
                      }
                    >
                      <div className="flashcard-top">
                        <span>
                          Card{' '}
                          {index +
                            1}
                        </span>

                        {mastered && (
                          <span className="mastered-badge">
                            <CheckCircle2
                              size={
                                13
                              }
                            />

                            Mastered
                          </span>
                        )}
                      </div>

                      <div className="flashcard-content">
                        <small>
                          {flipped
                            ? 'Answer'
                            : 'Question'}
                        </small>

                        <h3>
                          {flipped
                            ? card.back
                            : card.front}
                        </h3>
                      </div>

                      <div className="flashcard-flip-hint">
                        <RotateCcw
                          size={14}
                        />

                        {flipped
                          ? 'Show question'
                          : 'Reveal answer'}
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`master-card-button ${
                        mastered
                          ? 'active'
                          : ''
                      }`}
                      onClick={() =>
                        handleMastered(
                          card.id,
                        )
                      }
                    >
                      <CheckCircle2
                        size={15}
                      />

                      {mastered
                        ? 'Marked as mastered'
                        : 'Mark as mastered'}
                    </button>
                  </article>
                );
              },
            )}
          </div>
        ) : (
          <div className="catalog-empty">
            <BrainCircuit
              size={28}
            />

            <h3>
              No flashcards
              available
            </h3>

            <p>
              This module does
              not have generated
              flashcards yet.
            </p>
          </div>
        )}
      </section>

      <div className="study-bottom-grid">
        <section className="study-panel">
          <div className="study-panel-heading">
            <div className="study-icon orange">
              <Target
                size={20}
              />
            </div>

            <div>
              <span>
                Personalized
                focus
              </span>

              <h2>
                Topic mastery
              </h2>
            </div>
          </div>

          <div className="topic-list">
            {activeResource.topics.map(
              (topic) => {
                const mastery =
                  topicMastery.find(
                    (item) =>
                      item.topicTitle ===
                      topic.title,
                  );

                const score =
                  mastery?.score ??
                  0;

                return (
                  <article
                    className={`topic-card ${topic.status}`}
                    key={
                      topic.title
                    }
                  >
                    <div className="topic-status-icon">
                      {topic.status ===
                      'strong' ? (
                        <CheckCircle2
                          size={17}
                        />
                      ) : topic.status ===
                        'review' ? (
                        <CircleAlert
                          size={17}
                        />
                      ) : (
                        <Lightbulb
                          size={17}
                        />
                      )}
                    </div>

                    <div className="topic-card-content">
                      <div className="topic-card-heading">
                        <div>
                          <span>
                            {mastery?.level ===
                            'strong'
                              ? 'Strong mastery'
                              : mastery?.level ===
                                  'proficient'
                                ? 'Proficient'
                                : 'Developing'}
                          </span>

                          <h3>
                            {
                              topic.title
                            }
                          </h3>
                        </div>

                        <strong className="topic-mastery-score">
                          {score}%
                        </strong>
                      </div>

                      <p>
                        {
                          topic.note
                        }
                      </p>

                      <div
                        className="topic-mastery-track"
                        aria-label={`${topic.title} mastery ${score}%`}
                      >
                        <div
                          style={{
                            width: `${score}%`,
                          }}
                        />
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        </section>

        <aside className="study-plan-card">
          <div className="study-plan-icon">
            <BrainCircuit
              size={23}
            />
          </div>

          <span>
            Personalized study
            plan
          </span>

          <h2>
            {
              personalizedPlan.headline
            }
          </h2>

          <div className="study-plan-steps">
            {personalizedPlan.steps.map(
              (
                step,
                index,
              ) => (
                <div
                  key={step}
                >
                  <strong>
                    {String(
                      index +
                        1,
                    ).padStart(
                      2,
                      '0',
                    )}
                  </strong>

                  <p>
                    {step}
                  </p>
                </div>
              ),
            )}
          </div>

          <div className="study-plan-footer">
            <Sparkles
              size={15}
            />

            {quizPercentage !==
            null
              ? `Generated from your latest ${quizPercentage}% quiz score`
              : 'Complete a quiz to unlock score-based recommendations'}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default StudyTools;