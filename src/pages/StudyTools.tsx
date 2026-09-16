import {
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
} from 'lucide-react';
import { useState } from 'react';
import { studyResources } from '../data/studyToolsData';
import { studyToolsService } from '../services/studyToolsService';

function StudyTools() {
  const [courseId, setCourseId] = useState(
    studyResources[0]?.courseId ?? '',
  );
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [, setVersion] = useState(0);

  const resource = studyResources.find(
    (item) => item.courseId === courseId,
  );

  if (!resource) {
    return (
      <section className="learning-empty-state">
        <BrainCircuit size={38} />
        <h1>Study tools unavailable</h1>
        <p>No study resources are available for this course yet.</p>
      </section>
    );
  }

  const activeResource = resource;

  const cardIds = activeResource.flashcards.map(
    (card) => card.id,
  );

  const masteredCount =
    studyToolsService.getMasteredCount(cardIds);

  const masteryPercentage =
    cardIds.length > 0
      ? Math.round(
          (masteredCount / cardIds.length) * 100,
        )
      : 0;

  function handleCourseChange(value: string) {
    setCourseId(value);
    setFlippedCardId(null);
  }

  function handleMastered(cardId: string) {
    studyToolsService.toggleMastered(cardId);
    setVersion((value) => value + 1);
  }

  return (
    <section className="study-tools-page">
      <div className="study-tools-header">
        <div>
          <span className="eyebrow">
            AI study toolkit
          </span>

          <h1>Study Tools</h1>

          <p>
            Review course summaries, practice with flashcards
            and focus on the topics that need your attention.
          </p>
        </div>

        <div className="study-course-select">
          <BookOpen size={16} />

          <select
            value={courseId}
            onChange={(event) =>
              handleCourseChange(event.target.value)
            }
          >
            {studyResources.map((item) => (
              <option
                key={item.courseId}
                value={item.courseId}
              >
                {item.courseTitle}
              </option>
            ))}
          </select>

          <ChevronDown size={15} />
        </div>
      </div>

      <div className="study-overview-grid">
        <article className="study-summary-card">
          <div className="study-section-title">
            <div className="study-icon purple">
              <Sparkles size={20} />
            </div>

            <div>
              <span>Course summary</span>
              <h2>{activeResource.courseTitle}</h2>
            </div>
          </div>

          <div className="summary-points">
            {activeResource.summary.map(
              (point, index) => (
                <div key={point}>
                  <span>{index + 1}</span>
                  <p>{point}</p>
                </div>
              ),
            )}
          </div>
        </article>

        <article className="mastery-card">
          <div className="mastery-circle">
            <strong>{masteryPercentage}%</strong>
            <span>Mastered</span>
          </div>

          <div>
            <span className="eyebrow">
              Flashcard progress
            </span>

            <h2>
              {masteredCount} of{' '}
              {activeResource.flashcards.length} mastered
            </h2>

            <p>
              Mark cards as mastered once you are confident
              you can recall the answer without help.
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

      <section className="flashcard-section">
        <div className="section-heading">
          <div>
            <h2>Flashcards</h2>
            <p>
              Click a card to reveal the answer.
            </p>
          </div>

          <span className="flashcard-count">
            {activeResource.flashcards.length} cards
          </span>
        </div>

        <div className="flashcard-grid">
          {activeResource.flashcards.map(
            (card, index) => {
              const flipped =
                flippedCardId === card.id;

              const mastered =
                studyToolsService.isMastered(
                  card.id,
                );

              return (
                <article
                  className={`flashcard ${
                    flipped ? 'flipped' : ''
                  } ${
                    mastered ? 'mastered' : ''
                  }`}
                  key={card.id}
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
                        Card {index + 1}
                      </span>

                      {mastered && (
                        <span className="mastered-badge">
                          <CheckCircle2
                            size={13}
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
                      <RotateCcw size={14} />
                      {flipped
                        ? 'Show question'
                        : 'Reveal answer'}
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`master-card-button ${
                      mastered ? 'active' : ''
                    }`}
                    onClick={() =>
                      handleMastered(card.id)
                    }
                  >
                    <CheckCircle2 size={15} />

                    {mastered
                      ? 'Marked as mastered'
                      : 'Mark as mastered'}
                  </button>
                </article>
              );
            },
          )}
        </div>
      </section>

      <div className="study-bottom-grid">
        <section className="study-panel">
          <div className="study-panel-heading">
            <div className="study-icon orange">
              <Target size={20} />
            </div>

            <div>
              <span>Personalized focus</span>
              <h2>Topic recommendations</h2>
            </div>
          </div>

          <div className="topic-list">
            {activeResource.topics.map(
              (topic) => (
                <article
                  className={`topic-card ${topic.status}`}
                  key={topic.title}
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
                      <Lightbulb size={17} />
                    )}
                  </div>

                  <div>
                    <span>
                      {topic.status ===
                      'strong'
                        ? 'Strong topic'
                        : topic.status ===
                            'review'
                          ? 'Needs review'
                          : 'Study next'}
                    </span>

                    <h3>{topic.title}</h3>
                    <p>{topic.note}</p>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <aside className="study-plan-card">
          <div className="study-plan-icon">
            <BrainCircuit size={23} />
          </div>

          <span>Recommended study plan</span>

          <h2>Your next study session</h2>

          <div className="study-plan-steps">
            <div>
              <strong>01</strong>
              <p>
                Review the topic marked
                <b> Needs review</b>.
              </p>
            </div>

            <div>
              <strong>02</strong>
              <p>
                Practice all flashcards and mark
                confident answers as mastered.
              </p>
            </div>

            <div>
              <strong>03</strong>
              <p>
                Continue with the recommended
                <b> Study next</b> topic.
              </p>
            </div>

            <div>
              <strong>04</strong>
              <p>
                Use AI Tutor to clarify anything
                that is still unclear.
              </p>
            </div>
          </div>

          <div className="study-plan-footer">
            <Sparkles size={15} />
            Based on your demo learning activity
          </div>
        </aside>
      </div>
    </section>
  );
}

export default StudyTools;