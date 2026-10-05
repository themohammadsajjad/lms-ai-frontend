import {
  Bell,
  BookOpen,
  Megaphone,
  Send,
  Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { instructorService } from '../../services/instructorService';
import { instructorAnnouncementService } from '../../services/instructorAnnouncementService';

function InstructorAnnouncements() {
  const courses =
    instructorService.getCourses();

  const [courseId, setCourseId] =
    useState(
      courses[0]?.id ?? '',
    );

  const [title, setTitle] =
    useState('');

  const [message, setMessage] =
    useState('');

  const [
    announcements,
    setAnnouncements,
  ] = useState(() =>
    instructorAnnouncementService.getAnnouncements(),
  );

  const selectedCourse =
    courses.find(
      (course) =>
        course.id === courseId,
    );

  const courseAnnouncements =
    useMemo(
      () =>
        announcements.filter(
          (announcement) =>
            announcement.courseId ===
            courseId,
        ),
      [announcements, courseId],
    );

  function resetForm() {
    setTitle('');
    setMessage('');
  }

  function handlePublish() {
    if (
      !selectedCourse ||
      !title.trim() ||
      !message.trim()
    ) {
      return;
    }

    const updated =
      instructorAnnouncementService.createAnnouncement(
        {
          courseId:
            selectedCourse.id,
          courseTitle:
            selectedCourse.title,
          title,
          message,
        },
      );

    setAnnouncements(updated);
    resetForm();
  }

  function handleDelete(
    announcementId: string,
  ) {
    setAnnouncements(
      instructorAnnouncementService.deleteAnnouncement(
        announcementId,
      ),
    );
  }

  function formatDate(
    value: string,
  ) {
    return new Date(
      value,
    ).toLocaleString();
  }

  return (
    <section className="instructor-announcement-section">
      <div className="instructor-section-heading">
        <div>
          <span className="eyebrow">
            Course communication
          </span>

          <h2>
            Announcements
          </h2>

          <p>
            Share course updates,
            reminders and important
            information with learners.
          </p>
        </div>

        <div className="course-status-summary">
          <strong>
            {
              courseAnnouncements.length
            }
          </strong>

          <span>
            Announcements
          </span>
        </div>
      </div>

      <div className="announcement-authoring-layout">
        <section className="announcement-authoring-panel">
          <div className="announcement-authoring-heading">
            <div className="announcement-authoring-icon">
              <Megaphone
                size={20}
              />
            </div>

            <div>
              <span>
                New announcement
              </span>

              <h3>
                Publish an update
              </h3>
            </div>
          </div>

          <div className="announcement-form">
            <label className="announcement-field">
              <span>
                Course
              </span>

              <select
                value={courseId}
                onChange={(
                  event,
                ) => {
                  setCourseId(
                    event.target
                      .value,
                  );

                  resetForm();
                }}
              >
                {courses.map(
                  (course) => (
                    <option
                      key={
                        course.id
                      }
                      value={
                        course.id
                      }
                    >
                      {
                        course.title
                      }
                    </option>
                  ),
                )}
              </select>
            </label>

            <label className="announcement-field">
              <span>
                Announcement title
              </span>

              <input
                type="text"
                value={title}
                onChange={(
                  event,
                ) =>
                  setTitle(
                    event.target
                      .value,
                  )
                }
                placeholder="e.g. Quiz deadline reminder"
              />
            </label>

            <label className="announcement-field announcement-field-full">
              <span>
                Message
              </span>

              <textarea
                value={message}
                onChange={(
                  event,
                ) =>
                  setMessage(
                    event.target
                      .value,
                  )
                }
                placeholder="Write your announcement for enrolled learners..."
                rows={6}
              />
            </label>
          </div>

          <button
            type="button"
            className="announcement-publish-button"
            disabled={
              !selectedCourse ||
              !title.trim() ||
              !message.trim()
            }
            onClick={
              handlePublish
            }
          >
            <Send size={15} />
            Publish announcement
          </button>

          <p className="announcement-demo-note">
            Frontend demo:
            announcements are stored
            locally and persist after
            refresh.
          </p>
        </section>

        <aside className="announcement-course-summary">
          <div className="announcement-course-icon">
            <BookOpen
              size={20}
            />
          </div>

          <span>
            Selected course
          </span>

          <h3>
            {selectedCourse?.title ??
              'No course selected'}
          </h3>

          <p>
            {selectedCourse?.description ??
              'Select a course to publish an announcement.'}
          </p>

          <div className="announcement-course-count">
            <strong>
              {
                courseAnnouncements.length
              }
            </strong>

            <span>
              Published announcements
            </span>
          </div>
        </aside>
      </div>

      <section className="announcement-library-section">
        <div className="section-heading">
          <div>
            <h2>
              Announcement history
            </h2>

            <p>
              Updates published for{' '}
              <strong>
                {
                  selectedCourse?.title
                }
              </strong>
              .
            </p>
          </div>
        </div>

        {courseAnnouncements.length >
        0 ? (
          <div className="announcement-library-list">
            {courseAnnouncements.map(
              (
                announcement,
              ) => (
                <article
                  className="announcement-library-card"
                  key={
                    announcement.id
                  }
                >
                  <div className="announcement-card-icon">
                    <Bell
                      size={18}
                    />
                  </div>

                  <div className="announcement-card-content">
                    <span>
                      {
                        announcement.courseTitle
                      }
                    </span>

                    <h3>
                      {
                        announcement.title
                      }
                    </h3>

                    <p>
                      {
                        announcement.message
                      }
                    </p>

                    <small>
                      Published{' '}
                      {formatDate(
                        announcement.createdAt,
                      )}
                    </small>
                  </div>

                  <button
                    type="button"
                    className="announcement-delete-button"
                    onClick={() =>
                      handleDelete(
                        announcement.id,
                      )
                    }
                    aria-label={`Delete ${announcement.title}`}
                  >
                    <Trash2
                      size={15}
                    />
                  </button>
                </article>
              ),
            )}
          </div>
        ) : (
          <div className="announcement-empty-state">
            <Megaphone
              size={28}
            />

            <h3>
              No announcements yet
            </h3>

            <p>
              Publish the first update
              for this course.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}

export default InstructorAnnouncements;