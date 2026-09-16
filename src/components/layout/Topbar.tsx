import { Bell, Search } from 'lucide-react';
import { authService } from '../../services/authService';

function Topbar() {
  const user = authService.getCurrentUser();

  return (
    <header className="topbar">
      <div>
        <span className="topbar-eyebrow">Learning workspace</span>
        <h2>Welcome back, {user?.name?.split(' ')[0]}</h2>
      </div>

      <div className="topbar-actions">
        <div className="topbar-search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search courses..."
            aria-label="Search courses"
          />
        </div>

        <button className="icon-button" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <div className="topbar-profile">
          <div className="topbar-avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>

          <div>
            <strong>{user?.name}</strong>
            <span>{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;