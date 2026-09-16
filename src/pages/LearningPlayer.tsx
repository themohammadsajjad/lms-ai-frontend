import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  PlayCircle,
  Save,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { lessonsByCourse } from '../data/learningData';
import { courses } from '../data/mockData';
import { learningService } from '../services/learningService';

function LearningPlayer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const course = courses.find((item) => item.id === courseId);

  const lessons = course
    ? lessonsByCourse[course.id] ?? []
    : [];

  const currentLesson =
    lessons.find((lesson) => lesson.id === lessonId) ??
    lessons[0];

  const currentIndex = lessons.findIndex(
    (lesson) => lesson.id === currentLesson?.id,
  );

  const [note, setNote] = useState('');
  const [bookmarked, setBookmarked] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!course || !currentLesson) {
      return;
    }

    setNote(
      learningService.getNote(
        course.id,
        currentLesson.id,
      ),
    );

    setBookmarked(
      learningService.isBookmarked(
        course.id,
        currentLesson.id,
      ),
    );
  }, [course, currentLesson]);

  if (!course || !currentLesson) {
    return (
      <section className="learning-empty-state">
        <PlayCircle size={38} />

        <h1>Learning content unavailable</h1>

        <p>
          This course does not have demo lessons yet.
        </p>

        <Link to="/courses">
          Return to courses
        </Link>
      </section>
    );
  }

  const activeCourse = course;
  const activeLesson = currentLesson;

  const completedCount = lessons.filter((lesson) =>
    learningService.isCompleted(
      activeCourse.id,
      lesson.id,
    ),
  ).length;

  const progress =
    lessons.length > 0
      ? Math.round(
          (completedCount / lessons.length) * 100,
        )
      : 0;

  const currentCompleted =
    learningService.isCompleted(
      activeCourse.id,
      activeLesson.id,
    );

  const nextLesson = lessons[currentIndex + 1];

  function handleBookmark() {
    const active = learningService.toggleBookmark(
      activeCourse.id,
      activeLesson.id,
    );

    setBookmarked(active);
  }

  function handleSaveNote() {
    learningService.saveNote(
      activeCourse.id,
      activeLesson.id,
      note,
    );
  }

  function handleComplete() {
    learningService.markCompleted(
      activeCourse.id,
      activeLesson.id,
    );

    setVersion((value) => value + 1);
  }

  function openLesson(id: string) {
    navigate(`/learn/${activeCourse.id}/${id}`);
  }

  function handleNextLesson() {
    if (nextLesson) {
      navigate(
        `/learn/${activeCourse.id}/${nextLesson.id}`,
      );
    }
  }

  return (
    <section
      className="learning-page"
      key={version}
    >
      <div className="learning-top-row">
        <Link
          to={`/courses/${activeCourse.id}`}
          className="back-link"
        >
          <ArrowLeft size={16} />
          Back to course
        </Link>

        <div className="learning-progress-summary">
          <span>Course progress</span>

          <div className="learning-progress-track">
            <div
              className="learning-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <strong>{progress}%</strong>
        </div>
      </div>

      <div className="learning-layout">
        <div className="learning-main">
          <div className="video-shell">
            <video
              key={activeLesson.id}
              className="lesson-video"
              controls
              preload="metadata"
            >
              <source
                src={activeLesson.videoUrl}
                type="video/mp4"
              />

              Your browser does not support video playback.
            </video>
          </div>

          <div className="lesson-heading-row">
            <div>
              <span className="eyebrow">
                {activeLesson.module}
              </span>

              <h1>
                {activeLesson.title}
              </h1>

              <div className="lesson-meta">
                <span>
                  <Clock3 size={14} />
                  {activeLesson.duration}
                </span>

                <span>
                  Lesson {currentIndex + 1} of{' '}
                  {lessons.length}
                </span>
              </div>
            </div>

            <button
              type="button"
              className={`bookmark-button ${
                bookmarked ? 'active' : ''
              }`}
              onClick={handleBookmark}
            >
              <Bookmark
                size={18}
                fill={
                  bookmarked
                    ? 'currentColor'
                    : 'none'
                }
              />

              {bookmarked
                ? 'Bookmarked'
                : 'Bookmark'}
            </button>
          </div>

          <div className="lesson-actions">
            <button
              type="button"
              className={`mark-complete-button ${
                currentCompleted
                  ? 'completed'
                  : ''
              }`}
              onClick={handleComplete}
              disabled={currentCompleted}
            >
              <CheckCircle2 size={17} />

              {currentCompleted
                ? 'Lesson completed'
                : 'Mark as complete'}
            </button>

            {nextLesson && (
              <button
                type="button"
                className="next-lesson-button"
                onClick={handleNextLesson}
              >
                Next lesson
                <ChevronRight size={17} />
              </button>
            )}
          </div>

          <section className="lesson-notes-card">
            <div className="lesson-notes-heading">
              <div>
                <FileText size={19} />

                <div>
                  <h2>Lesson notes</h2>

                  <p>
                    Keep personal notes for this lesson.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveNote}
              >
                <Save size={15} />
                Save note
              </button>
            </div>

            <textarea
              value={note}
              onChange={(event) =>
                setNote(event.target.value)
              }
              placeholder="Write your notes here..."
            />
          </section>
        </div>

        <aside className="lesson-sidebar">
          <div className="lesson-sidebar-header">
            <span className="eyebrow">
              Course content
            </span>

            <h2>{activeCourse.title}</h2>

            <p>
              {completedCount} of{' '}
              {lessons.length} demo lessons completed
            </p>
          </div>

          <div className="lesson-list">
            {lessons.map((lesson, index) => {
              const active =
                lesson.id === activeLesson.id;

              const completed =
                learningService.isCompleted(
                  activeCourse.id,
                  lesson.id,
                );

              return (
                <button
                  type="button"
                  key={lesson.id}
                  className={`lesson-list-item ${
                    active ? 'active' : ''
                  }`}
                  onClick={() =>
                    openLesson(lesson.id)
                  }
                >
                  <div
                    className={`lesson-status ${
                      completed
                        ? 'completed'
                        : ''
                    }`}
                  >
                    {completed ? (
                      <CheckCircle2
                        size={16}
                      />
                    ) : (
                      <span>
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <div className="lesson-list-info">
                    <small>
                      {lesson.module}
                    </small>

                    <strong>
                      {lesson.title}
                    </strong>

                    <span>
                      <Clock3 size={12} />
                      {lesson.duration}
                    </span>
                  </div>

                  <ChevronRight size={16} />
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default LearningPlayer;