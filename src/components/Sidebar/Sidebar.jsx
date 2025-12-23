import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ user, onLogout }) {
  const defaultAvatar = 'https://api.dicebear.com/7.x/initials/svg?seed=' + (user?.name || 'User');

  return (
    <aside className="sidebar">
      <div className="sidebar-logo mono">
        <span className="logo-prefix">./</span>orbita
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-section-title mono">// Серверы</span>
          <NavLink to="/dashboard" end className={({ isActive }) => `nav-item mono ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">⚡</span>
            <span>servers.all()</span>
          </NavLink>
          <NavLink to="/dashboard/my-servers" className={({ isActive }) => `nav-item mono ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">📦</span>
            <span>myServers.list()</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <span className="nav-section-title mono">// Поддержка</span>
          <a 
            href="https://t.me/makhkets" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-item mono"
          >
            <span className="nav-icon">💬</span>
            <span>support.contact()</span>
            <span className="external-icon">↗</span>
          </a>
        </div>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/dashboard/profile" className={({ isActive }) => `profile-card ${isActive ? 'active' : ''}`}>
          <div className="profile-avatar">
            <img 
              src={user?.avatar || defaultAvatar} 
              alt="Avatar" 
              onError={(e) => { e.target.src = defaultAvatar; }}
            />
          </div>
          <div className="profile-info">
            <span className="profile-name mono">{user?.name || 'User'}</span>
            <span className="profile-balance mono">₽{user?.balance?.toFixed(2) || '0.00'}</span>
          </div>
        </NavLink>
        <button className="btn-logout mono" onClick={onLogout}>
          logout()
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
