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
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { lessonsByCourse } from '../data/learningData';
import { courses } from '../data/mockData';
import { learningService } from '../services/learningService';

function formatTimestamp(
  totalSeconds: number,
) {
  const seconds = Math.max(
    0,
    Math.floor(totalSeconds),
  );

  const minutes = Math.floor(
    seconds / 60,
  );

  const remainingSeconds =
    seconds % 60;

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;
}

function LearningPlayer() {
  const { courseId, lessonId } =
    useParams();

  const navigate = useNavigate();

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const lastSavedSecond =
    useRef(-1);

  const course = courses.find(
    (item) => item.id === courseId,
  );

  const lessons = course
    ? lessonsByCourse[course.id] ?? []
    : [];

  const currentLesson =
    lessons.find(
      (lesson) =>
        lesson.id === lessonId,
    ) ?? lessons[0];

  const currentIndex =
    lessons.findIndex(
      (lesson) =>
        lesson.id ===
        currentLesson?.id,
    );

  const [note, setNote] =
    useState('');

  const [noteTimestamp, setNoteTimestamp] =
    useState(0);

  const [
    bookmarked,
    setBookmarked,
  ] = useState(false);

  const [
    bookmarkTimestamp,
    setBookmarkTimestamp,
  ] = useState<number | null>(null);

  const [
    currentTime,
    setCurrentTime,
  ] = useState(0);

  const [
    playbackRate,
    setPlaybackRate,
  ] = useState(1);

  const [, setVersion] =
    useState(0);

  useEffect(() => {
    if (!course || !currentLesson) {
      return;
    }

    const noteDetails =
      learningService.getNoteDetails(
        course.id,
        currentLesson.id,
      );

    const bookmarkDetails =
      learningService.getBookmarkDetails(
        course.id,
        currentLesson.id,
      );

    setNote(noteDetails.content);
    setNoteTimestamp(
      noteDetails.timestamp,
    );

    setBookmarked(
      learningService.isBookmarked(
        course.id,
        currentLesson.id,
      ),
    );

    setBookmarkTimestamp(
      bookmarkDetails?.timestamp ??
        null,
    );

    setCurrentTime(0);
    setPlaybackRate(1);

    lastSavedSecond.current = -1;
  }, [course, currentLesson]);

  if (!course || !currentLesson) {
    return (
      <section className="learning-empty-state">
        <PlayCircle size={38} />

        <h1>
          Learning content unavailable
        </h1>

        <p>
          This course does not have demo
          lessons yet.
        </p>

        <Link to="/courses">
          Return to courses
        </Link>
      </section>
    );
  }

  const activeCourse = course;
  const activeLesson =
    currentLesson;

  const completedCount =
    lessons.filter((lesson) =>
      learningService.isCompleted(
        activeCourse.id,
        lesson.id,
      ),
    ).length;

  const progress =
    lessons.length > 0
      ? Math.round(
          (completedCount /
            lessons.length) *
            100,
        )
      : 0;

  const currentCompleted =
    learningService.isCompleted(
      activeCourse.id,
      activeLesson.id,
    );

  const nextLesson =
    lessons[currentIndex + 1];

  function handleLoadedMetadata() {
    const video =
      videoRef.current;

    if (!video) {
      return;
    }

    const savedPosition =
      learningService.getVideoPosition(
        activeCourse.id,
        activeLesson.id,
      );

    if (
      savedPosition > 0 &&
      savedPosition <
        video.duration - 1
    ) {
      video.currentTime =
        savedPosition;

      setCurrentTime(
        savedPosition,
      );
    }

    video.playbackRate =
      playbackRate;
  }

  function handleTimeUpdate() {
    const video =
      videoRef.current;

    if (!video) {
      return;
    }

    const second = Math.floor(
      video.currentTime,
    );

    setCurrentTime(second);

    if (
      lastSavedSecond.current !==
      second
    ) {
      learningService.saveVideoPosition(
        activeCourse.id,
        activeLesson.id,
        second,
      );

      lastSavedSecond.current =
        second;
    }
  }

  function handlePause() {
    const video =
      videoRef.current;

    if (!video) {
      return;
    }

    learningService.saveVideoPosition(
      activeCourse.id,
      activeLesson.id,
      video.currentTime,
    );
  }

  function handleEnded() {
    learningService.saveVideoPosition(
      activeCourse.id,
      activeLesson.id,
      0,
    );

    setCurrentTime(0);
  }

  function handleSpeedChange(
    value: string,
  ) {
    const rate = Number(value);

    setPlaybackRate(rate);

    if (videoRef.current) {
      videoRef.current.playbackRate =
        rate;
    }
  }

  function handleBookmark() {
    const active =
      learningService.toggleBookmark(
        activeCourse.id,
        activeLesson.id,
        currentTime,
      );

    setBookmarked(active);

    setBookmarkTimestamp(
      active
        ? Math.floor(currentTime)
        : null,
    );
  }

  function handleSaveNote() {
    learningService.saveNote(
      activeCourse.id,
      activeLesson.id,
      note,
      currentTime,
    );

    setNoteTimestamp(
      Math.floor(currentTime),
    );
  }

  function handleComplete() {
    learningService.markCompleted(
      activeCourse.id,
      activeLesson.id,
    );

    setVersion(
      (value) => value + 1,
    );
  }

  function openLesson(
    id: string,
  ) {
    navigate(
      `/learn/${activeCourse.id}/${id}`,
    );
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
          <span>
            Course progress
          </span>

          <div className="learning-progress-track">
            <div
              className="learning-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <strong>
            {progress}%
          </strong>
        </div>
      </div>

      <div className="learning-layout">
        <div className="learning-main">
          <div className="video-shell">
            <video
              ref={videoRef}
              key={activeLesson.id}
              className="lesson-video"
              controls
              preload="metadata"
              onLoadedMetadata={
                handleLoadedMetadata
              }
              onTimeUpdate={
                handleTimeUpdate
              }
              onPause={handlePause}
              onEnded={handleEnded}
            >
              <source
                src={
                  activeLesson.videoUrl
                }
                type="video/mp4"
              />

              Your browser does not
              support video playback.
            </video>
          </div>

          <div className="lesson-video-tools">
            <div className="video-position-info">
              <Clock3 size={15} />

              <span>
                Current position
              </span>

              <strong>
                {formatTimestamp(
                  currentTime,
                )}
              </strong>
            </div>

            <label className="playback-speed-control">
              <span>
                Playback speed
              </span>

              <select
                value={playbackRate}
                onChange={(event) =>
                  handleSpeedChange(
                    event.target.value,
                  )
                }
                aria-label="Playback speed"
              >
                <option value="0.75">
                  0.75×
                </option>

                <option value="1">
                  1×
                </option>

                <option value="1.25">
                  1.25×
                </option>

                <option value="1.5">
                  1.5×
                </option>

                <option value="2">
                  2×
                </option>
              </select>
            </label>
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
                  {
                    activeLesson.duration
                  }
                </span>

                <span>
                  Lesson{' '}
                  {currentIndex + 1}{' '}
                  of {lessons.length}
                </span>
              </div>
            </div>

            <div className="bookmark-area">
              <button
                type="button"
                className={`bookmark-button ${
                  bookmarked
                    ? 'active'
                    : ''
                }`}
                onClick={
                  handleBookmark
                }
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
                  : 'Bookmark here'}
              </button>

              {bookmarked &&
                bookmarkTimestamp !==
                  null && (
                  <small>
                    Saved at{' '}
                    {formatTimestamp(
                      bookmarkTimestamp,
                    )}
                  </small>
                )}
            </div>
          </div>

          <div className="lesson-actions">
            <button
              type="button"
              className={`mark-complete-button ${
                currentCompleted
                  ? 'completed'
                  : ''
              }`}
              onClick={
                handleComplete
              }
              disabled={
                currentCompleted
              }
            >
              <CheckCircle2
                size={17}
              />

              {currentCompleted
                ? 'Lesson completed'
                : 'Mark as complete'}
            </button>

            {nextLesson && (
              <button
                type="button"
                className="next-lesson-button"
                onClick={
                  handleNextLesson
                }
              >
                Next lesson
                <ChevronRight
                  size={17}
                />
              </button>
            )}
          </div>

          <section className="lesson-notes-card">
            <div className="lesson-notes-heading">
              <div>
                <FileText size={19} />

                <div>
                  <h2>
                    Lesson notes
                  </h2>

                  <p>
                    Save this note at
                    your current lecture
                    position.
                  </p>

                  {noteTimestamp >
                    0 && (
                    <small className="note-timestamp">
                      Last saved at{' '}
                      {formatTimestamp(
                        noteTimestamp,
                      )}
                    </small>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={
                  handleSaveNote
                }
              >
                <Save size={15} />
                Save at{' '}
                {formatTimestamp(
                  currentTime,
                )}
              </button>
            </div>

            <textarea
              value={note}
              onChange={(event) =>
                setNote(
                  event.target.value,
                )
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

            <h2>
              {activeCourse.title}
            </h2>

            <p>
              {completedCount} of{' '}
              {lessons.length} demo
              lessons completed
            </p>
          </div>

          <div className="lesson-list">
            {lessons.map(
              (lesson, index) => {
                const active =
                  lesson.id ===
                  activeLesson.id;

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
                      active
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      openLesson(
                        lesson.id,
                      )
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
                          {index +
                            1}
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
                        <Clock3
                          size={12}
                        />
                        {
                          lesson.duration
                        }
                      </span>
                    </div>

                    <ChevronRight
                      size={16}
                    />
                  </button>
                );
              },
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default LearningPlayer;