import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function AppLayout() {
  return (
    <div className="app-shell">
      <a
        href="#main-content"
        className="skip-to-content"
      >
        Skip to main content
      </a>

      <Sidebar />

      <div className="app-main">
        <Topbar />

        <main
          id="main-content"
          className="page-content"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;