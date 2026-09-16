import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <Topbar />

        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;