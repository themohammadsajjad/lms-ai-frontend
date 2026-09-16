import {
  BookOpen,
  MessageCircle,
  Plus,
  Send,
  Users,
} from 'lucide-react';
import {
  useMemo,
  useState,
  type FormEvent,
} from 'react';
import { courses } from '../data/mockData';
import { authService } from '../services/authService';
import { discussionService } from '../services/communicationService';

function Discussions() {
  const user = authService.getCurrentUser();

  const [posts, setPosts] = useState(
    discussionService.getPosts(),
  );
  const [courseFilter, setCourseFilter] =
    useState('All');
  const [showComposer, setShowComposer] =
    useState(false);

  const [courseTitle, setCourseTitle] = useState(
    courses[0]?.title ?? '',
  );
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [replyText, setReplyText] = useState<
    Record<string, string>
  >({});

  const filteredPosts = useMemo(() => {
    if (courseFilter === 'All') {
      return posts;
    }

    return posts.filter(
      (post) =>
        post.courseTitle === courseFilter,
    );
  }, [posts, courseFilter]);

  const courseNames = [
    'All',
    ...Array.from(
      new Set(posts.map((post) => post.courseTitle)),
    ),
  ];

  function handleCreatePost(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      !user ||
      !title.trim() ||
      !message.trim() ||
      !courseTitle
    ) {
      return;
    }

    const updated = discussionService.addPost(
      user.name,
      courseTitle,
      title.trim(),
      message.trim(),
    );

    setPosts(updated);
    setTitle('');
    setMessage('');
    setShowComposer(false);
  }

  function handleReply(postId: string) {
    const text = replyText[postId]?.trim();

    if (!user || !text) {
      return;
    }

    const updated = discussionService.addReply(
      postId,
      user.name,
      text,
    );

    setPosts(updated);

    setReplyText((current) => ({
      ...current,
      [postId]: '',
    }));
  }

  return (
    <section className="discussions-page">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">
            Learning community
          </span>

          <h1>Discussions</h1>

          <p>
            Ask questions, share ideas and learn
            together with other students.
          </p>
        </div>

        <button
          type="button"
          className="new-discussion-button"
          onClick={() =>
            setShowComposer((current) => !current)
          }
        >
          <Plus size={16} />
          New discussion
        </button>
      </div>

      {showComposer && (
        <form
          className="discussion-composer"
          onSubmit={handleCreatePost}
        >
          <div className="discussion-composer-heading">
            <div>
              <MessageCircle size={20} />

              <section>
                <h2>Start a discussion</h2>
                <p>
                  Ask a clear question or share an
                  idea with the course community.
                </p>
              </section>
            </div>
          </div>

          <label>
            <span>Course</span>

            <select
              value={courseTitle}
              onChange={(event) =>
                setCourseTitle(event.target.value)
              }
            >
              {courses.map((course) => (
                <option
                  key={course.id}
                  value={course.title}
                >
                  {course.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Discussion title</span>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="What do you want to discuss?"
            />
          </label>

          <label>
            <span>Message</span>

            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Add more context to your question..."
            />
          </label>

          <div className="discussion-composer-actions">
            <button
              type="button"
              onClick={() =>
                setShowComposer(false)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                !title.trim() || !message.trim()
              }
            >
              <Send size={15} />
              Publish discussion
            </button>
          </div>
        </form>
      )}

      <div className="discussion-toolbar">
        <div>
          <Users size={16} />
          <strong>
            {posts.length} community discussions
          </strong>
        </div>

        <select
          value={courseFilter}
          onChange={(event) =>
            setCourseFilter(event.target.value)
          }
        >
          {courseNames.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      <div className="discussion-list">
        {filteredPosts.map((post) => (
          <article
            className="discussion-card"
            key={post.id}
          >
            <div className="discussion-post-header">
              <div className="discussion-avatar">
                {post.author
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <strong>{post.author}</strong>
                <span>{post.createdAt}</span>
              </div>

              <div className="discussion-course-chip">
                <BookOpen size={12} />
                {post.courseTitle}
              </div>
            </div>

            <h2>{post.title}</h2>

            <p className="discussion-message">
              {post.message}
            </p>

            <div className="discussion-reply-count">
              <MessageCircle size={14} />
              {post.replies.length}{' '}
              {post.replies.length === 1
                ? 'reply'
                : 'replies'}
            </div>

            {post.replies.length > 0 && (
              <div className="discussion-replies">
                {post.replies.map((reply) => (
                  <div
                    className="discussion-reply"
                    key={reply.id}
                  >
                    <div className="discussion-reply-avatar">
                      {reply.author
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <section>
                        <strong>
                          {reply.author}
                        </strong>

                        <span>
                          {reply.createdAt}
                        </span>
                      </section>

                      <p>{reply.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="discussion-reply-box">
              <input
                type="text"
                value={replyText[post.id] ?? ''}
                onChange={(event) =>
                  setReplyText((current) => ({
                    ...current,
                    [post.id]:
                      event.target.value,
                  }))
                }
                placeholder="Write a reply..."
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleReply(post.id);
                  }
                }}
              />

              <button
                type="button"
                onClick={() =>
                  handleReply(post.id)
                }
                disabled={
                  !replyText[post.id]?.trim()
                }
                aria-label="Send reply"
              >
                <Send size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Discussions;