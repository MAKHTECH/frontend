import './Dashboard.css';

function Dashboard({ onLogout }) {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-logo mono">
          <span className="logo-prefix">./</span>orbita
        </div>
        <button className="btn-logout mono" onClick={onLogout}>
          logout()
        </button>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-welcome">
          <span className="welcome-comment mono">// Добро пожаловать в панель управления</span>
          <h1 className="welcome-title">
            <span className="const-keyword">const</span>{' '}
            <span className="var-name">user</span>{' '}
            <span className="operator">=</span>{' '}
            <span className="string">"admin"</span>;
          </h1>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-label mono">servers.count</span>
            <span className="stat-value mono">0</span>
          </div>
          <div className="stat-card">
            <span className="stat-label mono">balance</span>
            <span className="stat-value mono">₽0.00</span>
          </div>
          <div className="stat-card">
            <span className="stat-label mono">status</span>
            <span className="stat-value mono status-active">● active</span>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="terminal-card">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="btn-red"></span>
                <span className="btn-yellow"></span>
                <span className="btn-green"></span>
              </div>
              <span className="terminal-title mono">servers.list()</span>
            </div>
            <div className="terminal-body mono">
              <p className="terminal-empty">
                <span className="comment">// У вас пока нет серверов</span>
              </p>
              <p className="terminal-hint">
                <span className="prompt">$</span> Создайте первый сервер, чтобы начать
              </p>
            </div>
          </div>

          <button className="btn-create-server mono">
            <span className="plus">+</span>
            server.create()
          </button>
        </div>

        <div className="dashboard-footer mono">
          <span className="comment">/* Панель управления в разработке */</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
