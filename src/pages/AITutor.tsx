import {
  Bot,
  BookOpen,
  BrainCircuit,
  ChevronDown,
  Eraser,
  Send,
  Sparkles,
  Target,
  UserRound,
} from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import {
  tutorKnowledge,
  type TutorMode,
} from '../data/aiTutorData';
import { studyResources } from '../data/studyToolsData';
import {
  aiTutorService,
  type TutorMessage,
} from '../services/aiTutorService';
import { topicMasteryService } from '../services/topicMasteryService';

const topicKeywords: Record<
  string,
  Record<string, string[]>
> = {
  'react-foundations': {
    'Components and Props': [
      'component',
      'components',
      'prop',
      'props',
      'parent',
      'child',
    ],
    'State and Events': [
      'state',
      'event',
      'events',
      'update',
    ],
    'Hooks and Reusability': [
      'hook',
      'hooks',
      'usestate',
      'reuse',
      'reusable',
    ],
  },

  'python-data-science': {
    'Python Essentials': [
      'python',
      'variable',
      'function',
      'list',
      'dictionary',
    ],
    'NumPy Fundamentals': [
      'numpy',
      'array',
      'arrays',
      'numerical',
    ],
    'Data Analysis with pandas': [
      'pandas',
      'dataframe',
      'data frame',
      'missing',
      'clean',
      'dataset',
    ],
  },

  'machine-learning': {
    'Machine Learning Foundations': [
      'machine learning',
      'supervised',
      'training',
      'label',
      'labels',
      'model',
    ],
    'Regression Models': [
      'regression',
      'continuous',
      'prediction',
    ],
    'Model Evaluation': [
      'evaluation',
      'performance',
      'metric',
      'metrics',
      'error',
      'mae',
      'mse',
    ],
  },
};

function findRelevantTopic(
  courseId: string,
  question: string,
) {
  const resource =
    studyResources.find(
      (item) =>
        item.courseId ===
        courseId,
    );

  if (!resource) {
    return '';
  }

  const normalizedQuestion =
    question.toLowerCase();

  const courseKeywords =
    topicKeywords[courseId] ??
    {};

  const matchedTopic =
    resource.topics.find(
      (topic) => {
        const keywords =
          courseKeywords[
            topic.title
          ] ?? [];

        return keywords.some(
          (keyword) =>
            normalizedQuestion.includes(
              keyword,
            ),
        );
      },
    );

  if (matchedTopic) {
    return matchedTopic.title;
  }

  const reviewTopic =
    resource.topics.find(
      (topic) =>
        topic.status ===
        'review',
    );

  return (
    reviewTopic?.title ??
    resource.topics[0]?.title ??
    ''
  );
}

function formatMode(
  mode: TutorMode,
) {
  return (
    mode
      .charAt(0)
      .toUpperCase() +
    mode.slice(1)
  );
}

function AITutor() {
  const initialCourseId =
    tutorKnowledge[0]
      ?.courseId ?? '';

  const [
    courseId,
    setCourseId,
  ] = useState(
    initialCourseId,
  );

  const [
    mode,
    setMode,
  ] =
    useState<TutorMode>(
      () => {
        if (
          !initialCourseId
        ) {
          return 'intermediate';
        }

        return topicMasteryService.getRecommendedDifficulty(
          initialCourseId,
        );
      },
    );

  const [
    question,
    setQuestion,
  ] = useState('');

  const [
    messages,
    setMessages,
  ] = useState<
    TutorMessage[]
  >(() => {
    if (
      !initialCourseId
    ) {
      return [];
    }

    return aiTutorService.getMessages(
      initialCourseId,
    );
  });

  const bottomRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const activeKnowledge =
    tutorKnowledge.find(
      (item) =>
        item.courseId ===
        courseId,
    );

  const averageMastery =
    topicMasteryService.getAverageMastery(
      courseId,
    );

  const recommendedMode =
    topicMasteryService.getRecommendedDifficulty(
      courseId,
    );

  useEffect(() => {
    bottomRef.current?.scrollIntoView(
      {
        behavior: 'smooth',
      },
    );
  }, [messages]);

  function handleCourseChange(
    value: string,
  ) {
    setCourseId(value);

    setMode(
      topicMasteryService.getRecommendedDifficulty(
        value,
      ),
    );

    setMessages(
      aiTutorService.getMessages(
        value,
      ),
    );
  }

  function sendQuestion(
    text: string,
  ) {
    const cleanQuestion =
      text.trim();

    if (
      !cleanQuestion ||
      !courseId
    ) {
      return;
    }

    const previousRecommendedMode =
      topicMasteryService.getRecommendedDifficulty(
        courseId,
      );

    const updated =
      aiTutorService.ask(
        courseId,
        cleanQuestion,
        mode,
      );

    const relevantTopic =
      findRelevantTopic(
        courseId,
        cleanQuestion,
      );

    if (relevantTopic) {
      topicMasteryService.recordTutorInteraction(
        courseId,
        relevantTopic,
      );
    }

    const nextRecommendedMode =
      topicMasteryService.getRecommendedDifficulty(
        courseId,
      );

    /*
     * Keep adapting automatically while the
     * student is using the recommended mode.
     * A manually selected mode is respected.
     */
    if (
      mode ===
        previousRecommendedMode &&
      nextRecommendedMode !==
        previousRecommendedMode
    ) {
      setMode(
        nextRecommendedMode,
      );
    }

    setMessages(updated);
    setQuestion('');
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    sendQuestion(
      question,
    );
  }

  function handleClear() {
    aiTutorService.clear(
      courseId,
    );

    setMessages([]);
  }

  return (
    <section className="ai-tutor-page">
      <div className="ai-tutor-header">
        <div>
          <span className="eyebrow">
            AI learning
            assistant
          </span>

          <h1>
            AI Tutor
          </h1>

          <p>
            Ask questions based
            on your course
            material and explore
            concepts at a level
            adapted to your topic
            mastery.
          </p>
        </div>

        <div className="ai-status">
          <span />

          Course-grounded demo
        </div>
      </div>

      <div className="ai-tutor-layout">
        <aside className="ai-control-panel">
          <div className="ai-control-brand">
            <div>
              <BrainCircuit
                size={23}
              />
            </div>

            <section>
              <strong>
                VertexLearn AI
              </strong>

              <span>
                Study companion
              </span>
            </section>
          </div>

          <div className="ai-control-section">
            <label htmlFor="ai-course">
              Course
            </label>

            <div className="ai-select-wrapper">
              <BookOpen
                size={16}
              />

              <select
                id="ai-course"
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
                {tutorKnowledge.map(
                  (course) => (
                    <option
                      key={
                        course.courseId
                      }
                      value={
                        course.courseId
                      }
                    >
                      {
                        course.courseTitle
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

          <div className="ai-control-section">
            <label>
              Explanation level
            </label>

            <div className="ai-mastery-recommendation">
              <Target
                size={16}
              />

              <div>
                <span>
                  Mastery
                  recommendation
                </span>

                <strong>
                  {formatMode(
                    recommendedMode,
                  )}
                </strong>

                <small>
                  {
                    averageMastery
                  }
                  % average topic
                  mastery
                </small>
              </div>

              {mode !==
                recommendedMode && (
                <button
                  type="button"
                  onClick={() =>
                    setMode(
                      recommendedMode,
                    )
                  }
                >
                  Use
                </button>
              )}
            </div>

            <div className="ai-mode-list">
              <button
                type="button"
                className={
                  mode ===
                  'beginner'
                    ? 'active'
                    : ''
                }
                aria-pressed={
                  mode ===
                  'beginner'
                }
                onClick={() =>
                  setMode(
                    'beginner',
                  )
                }
              >
                <strong>
                  Beginner
                </strong>

                <span>
                  Simple language
                  and basic
                  examples
                </span>
              </button>

              <button
                type="button"
                className={
                  mode ===
                  'intermediate'
                    ? 'active'
                    : ''
                }
                aria-pressed={
                  mode ===
                  'intermediate'
                }
                onClick={() =>
                  setMode(
                    'intermediate',
                  )
                }
              >
                <strong>
                  Intermediate
                </strong>

                <span>
                  Balanced
                  explanations
                  and context
                </span>
              </button>

              <button
                type="button"
                className={
                  mode ===
                  'advanced'
                    ? 'active'
                    : ''
                }
                aria-pressed={
                  mode ===
                  'advanced'
                }
                onClick={() =>
                  setMode(
                    'advanced',
                  )
                }
              >
                <strong>
                  Advanced
                </strong>

                <span>
                  Deeper concepts
                  and edge cases
                </span>
              </button>
            </div>
          </div>

          <div className="ai-control-section">
            <label>
              Suggested
              questions
            </label>

            <div className="ai-suggestions">
              {activeKnowledge
                ?.suggestions
                .map(
                  (
                    suggestion,
                  ) => (
                    <button
                      type="button"
                      key={
                        suggestion
                      }
                      onClick={() =>
                        sendQuestion(
                          suggestion,
                        )
                      }
                    >
                      <Sparkles
                        size={13}
                      />

                      {
                        suggestion
                      }
                    </button>
                  ),
                )}
            </div>
          </div>

          <button
            type="button"
            className="ai-clear-button"
            onClick={
              handleClear
            }
            disabled={
              messages.length ===
              0
            }
          >
            <Eraser
              size={15}
            />

            Clear conversation
          </button>
        </aside>

        <div className="ai-chat-panel">
          <div className="ai-chat-topbar">
            <div>
              <div className="ai-chat-avatar">
                <Bot
                  size={19}
                />
              </div>

              <section>
                <strong>
                  {
                    activeKnowledge
                      ?.courseTitle
                  }
                </strong>

                <span>
                  {formatMode(
                    mode,
                  )}{' '}
                  mode
                </span>
              </section>
            </div>

            <span className="ai-grounded-badge">
              <Sparkles
                size={13}
              />

              Grounded in
              course material
            </span>
          </div>

          <div className="ai-messages">
            {messages.length ===
            0 ? (
              <div className="ai-empty-chat">
                <div>
                  <BrainCircuit
                    size={30}
                  />
                </div>

                <h2>
                  What would you
                  like to
                  understand?
                </h2>

                <p>
                  Ask a question
                  about{' '}
                  <strong>
                    {
                      activeKnowledge
                        ?.courseTitle
                    }
                  </strong>{' '}
                  or choose one
                  of the
                  suggested
                  questions.
                </p>

                <div className="ai-empty-suggestions">
                  {activeKnowledge
                    ?.suggestions
                    .slice(
                      0,
                      2,
                    )
                    .map(
                      (
                        suggestion,
                      ) => (
                        <button
                          type="button"
                          key={
                            suggestion
                          }
                          onClick={() =>
                            sendQuestion(
                              suggestion,
                            )
                          }
                        >
                          {
                            suggestion
                          }
                        </button>
                      ),
                    )}
                </div>
              </div>
            ) : (
              messages.map(
                (
                  message,
                ) => (
                  <article
                    key={
                      message.id
                    }
                    className={`ai-message ${message.role}`}
                  >
                    <div className="ai-message-avatar">
                      {message.role ===
                      'assistant' ? (
                        <Bot
                          size={17}
                        />
                      ) : (
                        <UserRound
                          size={17}
                        />
                      )}
                    </div>

                    <div className="ai-message-body">
                      <div className="ai-message-name">
                        {message.role ===
                        'assistant'
                          ? 'VertexLearn AI'
                          : 'You'}
                      </div>

                      <div className="ai-message-bubble">
                        {
                          message.content
                        }
                      </div>

                      {message.sources &&
                        message
                          .sources
                          .length >
                          0 && (
                          <div className="ai-sources">
                            <span>
                              Sources
                            </span>

                            <div>
                              {message.sources.map(
                                (
                                  source,
                                ) => (
                                  <button
                                    type="button"
                                    key={
                                      source.id
                                    }
                                  >
                                    <BookOpen
                                      size={12}
                                    />

                                    <section>
                                      <strong>
                                        {
                                          source.section
                                        }
                                      </strong>

                                      <small>
                                        {
                                          source.title
                                        }
                                      </small>
                                    </section>
                                  </button>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </article>
                ),
              )
            )}

            <div
              ref={
                bottomRef
              }
            />
          </div>

          <form
            className="ai-chat-composer"
            onSubmit={
              handleSubmit
            }
          >
            <div>
              <textarea
                value={
                  question
                }
                onChange={(
                  event,
                ) =>
                  setQuestion(
                    event.target
                      .value,
                  )
                }
                placeholder={`Ask about ${
                  activeKnowledge
                    ?.courseTitle ??
                  'your course'
                }...`}
                rows={1}
              />

              <button
                type="submit"
                disabled={
                  !question.trim()
                }
                aria-label="Send question"
              >
                <Send
                  size={18}
                />
              </button>
            </div>

            <p>
              Demo responses are
              generated from the
              frontend course
              knowledge set.
              Explanation depth
              can adapt from your
              topic mastery.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AITutor;