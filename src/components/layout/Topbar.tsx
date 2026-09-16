import { Bell, Search } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

function Topbar() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const [search, setSearch] = useState('');

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = search.trim();

    if (value) {
      navigate(`/courses?search=${encodeURIComponent(value)}`);
    } else {
      navigate('/courses');
    }
  }

  return (
    <header className="topbar">
      <div>
        <span className="topbar-eyebrow">Learning workspace</span>
        <h2>Welcome back, {user?.name?.split(' ')[0]}</h2>
      </div>

      <div className="topbar-actions">
        {user?.role === 'student' && (
          <form className="topbar-search" onSubmit={handleSearch}>
            <Search size={18} />

            <input
              type="search"
              placeholder="Search courses..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search courses"
            />
          </form>
        )}

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