import {
  BookOpen,
  BrainCircuit,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Presentation,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

function Sidebar() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const navigation =
    user?.role === 'instructor'
      ? [
          {
            to: '/instructor',
            label: 'Instructor',
            icon: Presentation,
          },
        ]
      : user?.role === 'admin'
        ? [
            {
              to: '/admin',
              label: 'Administration',
              icon: ShieldCheck,
            },
          ]
        : [
            {
              to: '/dashboard',
              label: 'Dashboard',
              icon: LayoutDashboard,
            },
            {
              to: '/courses',
              label: 'Courses',
              icon: BookOpen,
            },
          ];

  function handleLogout() {
    authService.logout();
    navigate('/login');
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <BrainCircuit size={23} />
        </div>

        <div>
          <strong>VertexLearn</strong>
          <span>Learning Platform</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-label">Workspace</span>

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={19} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button className="sidebar-link sidebar-button">
          <Settings size={19} />
          Settings
        </button>

        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>

          <div className="sidebar-user-details">
            <strong>{user?.name}</strong>
            <span>{user?.role}</span>
          </div>

          <button
            className="sidebar-logout"
            onClick={handleLogout}
            aria-label="Sign out"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;