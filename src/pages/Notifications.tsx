import {
  Award,
  Bell,
  BookOpen,
  Check,
  ClipboardCheck,
  HelpCircle,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../data/communicationData';
import { notificationService } from '../services/communicationService';

function Notifications() {
  const navigate = useNavigate();
  const [, setVersion] = useState(0);

  const unreadCount = notificationService.getUnreadCount();

  function handleOpen(
    notificationId: string,
    path: string,
  ) {
    notificationService.markRead(notificationId);
    navigate(path);
  }

  function handleMarkAll() {
    notificationService.markAllRead();
    setVersion((value) => value + 1);
  }

  function getIcon(type: string) {
    if (type === 'assignment') {
      return <ClipboardCheck size={19} />;
    }

    if (type === 'quiz') {
      return <HelpCircle size={19} />;
    }

    if (type === 'achievement') {
      return <Award size={19} />;
    }

    return <BookOpen size={19} />;
  }

  return (
    <section className="notifications-page">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">
            Activity center
          </span>

          <h1>Notifications</h1>

          <p>
            Stay updated with assignments, quizzes,
            achievements and course activity.
          </p>
        </div>

        <button
          type="button"
          className="mark-all-button"
          onClick={handleMarkAll}
          disabled={unreadCount === 0}
        >
          <Check size={16} />
          Mark all as read
        </button>
      </div>

      <div className="notification-summary-card">
        <div>
          <Bell size={21} />
        </div>

        <section>
          <strong>{unreadCount}</strong>
          <span>Unread notifications</span>
        </section>
      </div>

      <div className="notification-list">
        {notifications.map((notification) => {
          const read = notificationService.isRead(
            notification.id,
          );

          return (
            <button
              type="button"
              key={notification.id}
              className={`notification-card ${
                read ? 'read' : 'unread'
              }`}
              onClick={() =>
                handleOpen(
                  notification.id,
                  notification.path,
                )
              }
            >
              <div
                className={`notification-type-icon ${notification.type}`}
              >
                {getIcon(notification.type)}
              </div>

              <div className="notification-content">
                <div>
                  <h2>{notification.title}</h2>

                  {!read && (
                    <span className="unread-badge">
                      New
                    </span>
                  )}
                </div>

                <p>{notification.message}</p>

                <time>{notification.time}</time>
              </div>

              {!read && (
                <span className="notification-unread-dot" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Notifications;