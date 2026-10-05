import {
  Bell,
  Search,
} from 'lucide-react';
import {
  useEffect,
  useState,
  type FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { notificationService } from '../../services/communicationService';

function Topbar() {
  const navigate =
    useNavigate();

  const user =
    authService.getCurrentUser();

  const [
    search,
    setSearch,
  ] = useState('');

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(
    notificationService.getUnreadCount(),
  );

  useEffect(() => {
    function updateNotifications() {
      setUnreadCount(
        notificationService.getUnreadCount(),
      );
    }

    window.addEventListener(
      'vertexlearn-notifications-updated',
      updateNotifications,
    );

    return () => {
      window.removeEventListener(
        'vertexlearn-notifications-updated',
        updateNotifications,
      );
    };
  }, []);

  function handleSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const value =
      search.trim();

    if (value) {
      navigate(
        `/courses?search=${encodeURIComponent(
          value,
        )}`,
      );
    } else {
      navigate(
        '/courses',
      );
    }
  }

  const notificationLabel =
    unreadCount > 0
      ? `Notifications, ${unreadCount} unread`
      : 'Notifications';

  return (
    <header
      className="topbar"
      aria-label="Application toolbar"
    >
      <div>
        <span className="topbar-eyebrow">
          Learning workspace
        </span>

        <h2>
          Welcome back,{' '}
          {
            user?.name?.split(
              ' ',
            )[0]
          }
        </h2>
      </div>

      <div className="topbar-actions">
        {user?.role ===
          'student' && (
          <form
            className="topbar-search"
            onSubmit={
              handleSearch
            }
            role="search"
            aria-label="Course search"
          >
            <Search
              size={18}
              aria-hidden="true"
            />

            <input
              type="search"
              placeholder="Search courses..."
              value={
                search
              }
              onChange={(
                event,
              ) =>
                setSearch(
                  event.target
                    .value,
                )
              }
              aria-label="Search courses"
            />
          </form>
        )}

        <button
          type="button"
          className="icon-button"
          aria-label={
            notificationLabel
          }
          title="Notifications"
          onClick={() =>
            navigate(
              '/notifications',
            )
          }
        >
          <Bell
            size={20}
            aria-hidden="true"
          />

          {unreadCount >
            0 && (
            <>
              <span
                className="notification-dot"
                aria-hidden="true"
              />

              <span
                className="notification-count"
                aria-hidden="true"
              >
                {
                  unreadCount
                }
              </span>
            </>
          )}
        </button>

        <div className="topbar-profile">
          <div
            className="topbar-avatar"
            aria-hidden="true"
          >
            {user?.name
              ?.charAt(0)
              .toUpperCase() ||
              'U'}
          </div>

          <div>
            <strong>
              {user?.name}
            </strong>

            <span>
              {user?.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;