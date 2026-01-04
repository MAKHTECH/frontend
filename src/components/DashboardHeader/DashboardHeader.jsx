import { useLocation } from 'react-router-dom';
import './DashboardHeader.css';

function DashboardHeader({ user }) {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return { comment: '// Доступные серверы', title: 'servers', method: 'getAll' };
      case '/dashboard/my-servers':
        return { comment: '// Мои серверы', title: 'myServers', method: 'list' };
      case '/dashboard/profile':
        return { comment: '// Профиль пользователя', title: 'profile', method: 'getUser' };
      default:
        return { comment: '// Панель управления', title: 'dashboard', method: 'init' };
    }
  };

  const pageInfo = getPageTitle();

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <div className="header-breadcrumb mono">
          <span className="breadcrumb-comment">makhkets.t.me</span> 
          {/* <span>{pageInfo.title}</span>
          <span>{pageInfo.comment}</span> */}
        </div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="search()..." 
            className="search-input mono"
          />
        </div>

        <div className="header-notifications">
          <button className="btn-notification">
            <span>🔔</span>
            <span className="notification-badge">0</span>
          </button>
        </div>

        <div className="header-user mono">
          <span className="user-balance">₽{user?.balance?.toFixed(2) || '0.00'}</span>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
