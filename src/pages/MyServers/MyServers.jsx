import './MyServers.css';

function MyServers() {
  const servers = []; // Пока пустой массив

  return (
    <div className="page-my-servers">
      <div className="page-header">
        <span className="page-comment mono">// Мои активные серверы</span>
        <h1 className="page-title">
          <span className="const-keyword">const</span>{' '}
          <span className="var-name">myServers</span>{' '}
          <span className="operator">=</span>{' '}
          <span className="method">getUserServers</span>
          <span className="brackets">()</span>;
        </h1>
      </div>

      {servers.length === 0 ? (
        <div className="empty-state">
          <div className="terminal-card">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="btn-red"></span>
                <span className="btn-yellow"></span>
                <span className="btn-green"></span>
              </div>
              <span className="terminal-title mono">myServers.list()</span>
            </div>
            <div className="terminal-body mono">
              <p className="terminal-output">
                <span className="prompt">→</span> Searching for active servers...
              </p>
              <p className="terminal-empty">
                <span className="comment">// Результат: пустой массив []</span>
              </p>
              <p className="terminal-hint">
                <span className="prompt">$</span> У вас пока нет активных серверов
              </p>
            </div>
          </div>

          <a href="/dashboard" className="btn-browse mono">
            <span className="arrow">→</span>
            servers.browse()
          </a>
        </div>
      ) : (
        <div className="servers-list">
          {servers.map(server => (
            <div key={server.id} className="my-server-card">
              {/* Карточка сервера */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyServers;
