import './Profile.css';

function Profile({ user }) {
  // Генерируем аватар по умолчанию только если нет photo_url
  const defaultAvatar = 'https://api.dicebear.com/7.x/initials/svg?seed=' + (user?.name || 'User');
  const avatarUrl = user?.avatar || defaultAvatar;

  // Определяем что показывать в поле email
  const emailDisplay = user?.email || 'Logged in via Telegram';
  const isTelegramAuth = user?.isTelegramAuth || !user?.email;

  return (
    <div className="page-profile">
      <div className="page-header">
        <span className="page-comment mono">// Профиль пользователя</span>
        <h1 className="page-title">
          <span className="const-keyword">const</span>{' '}
          <span className="var-name">profile</span>{' '}
          <span className="operator">=</span>{' '}
          <span className="method">getUser</span>
          <span className="brackets">()</span>;
        </h1>
      </div>

      <div className="profile-layout">
        {/* User Card - Full Width */}
        <div className="profile-user-card">
          <div className="user-card-header">
            <div className="user-avatar">
              <img 
                src={avatarUrl} 
                alt="Avatar" 
                onError={(e) => { e.target.src = defaultAvatar; }}
              />
              <button className="btn-avatar-edit">📷</button>
            </div>
            <div className="user-info">
              <h2 className="user-name">{user?.name || 'User'}</h2>
              <span className={`user-email mono ${isTelegramAuth ? 'telegram-auth' : ''}`}>
                {isTelegramAuth && <span className="telegram-icon">✈️ </span>}
                {emailDisplay}
              </span>
              <div className="user-badges">
                {isTelegramAuth && <span className="badge telegram">Telegram</span>}
                <span className="badge verified">✓ verified</span>
              </div>
            </div>
          </div>
          <div className="user-card-stats mono">
            <div className="user-stat">
              <span className="stat-value">{user?.balance?.toFixed(2) || '0.00'}</span>
              <span className="stat-label">balance (₽)</span>
            </div>
            <div className="user-stat">
              <span className="stat-value">0</span>
              <span className="stat-label">servers</span>
            </div>
            <div className="user-stat">
              <span className="stat-value">2024</span>
              <span className="stat-label">member since</span>
            </div>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="profile-grid">
          {/* Left Column */}
          <div className="profile-column">
            {/* Account Info */}
            <div className="profile-section">
              <div className="section-header">
                <span className="section-title mono">// Данные аккаунта</span>
              </div>
              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon">👤</div>
                  <div className="info-content">
                    <span className="info-label mono">username:</span>
                    <span className="info-value mono">"{user?.name || 'User'}"</span>
                  </div>
                  <button className="btn-action mono">edit()</button>
                </div>
                <div className="info-item">
                  <div className="info-icon">{isTelegramAuth ? '✈️' : '📧'}</div>
                  <div className="info-content">
                    <span className="info-label mono">{isTelegramAuth ? 'auth:' : 'email:'}</span>
                    <span className={`info-value mono ${isTelegramAuth ? 'telegram-auth-value' : ''}`}>
                      "{isTelegramAuth ? 'via Telegram' : user?.email}"
                    </span>
                  </div>
                  {!isTelegramAuth && <button className="btn-action mono">edit()</button>}
                </div>
                <div className="info-item">
                  <div className="info-icon">🔐</div>
                  <div className="info-content">
                    <span className="info-label mono">password:</span>
                    <span className="info-value mono">"••••••••"</span>
                  </div>
                  <button className="btn-action mono">change()</button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="profile-section danger">
              <div className="section-header">
                <span className="section-title mono danger-title">// ⚠️ Опасная зона</span>
              </div>
              <div className="danger-content">
                <p className="danger-warning mono">
                  <span className="comment">// Эти действия необратимы</span>
                </p>
                <button className="btn-danger mono">account.delete()</button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="profile-column">
            {/* Balance Section */}
            <div className="profile-section">
              <div className="section-header">
                <span className="section-title mono">// Баланс</span>
              </div>
              <div className="balance-card">
                <div className="balance-info">
                  <span className="balance-label mono">currentBalance:</span>
                  <span className="balance-amount mono">₽{user?.balance?.toFixed(2) || '0.00'}</span>
                </div>
                <button className="btn-topup mono">
                  <span className="plus">+</span>
                  balance.topup()
                </button>
              </div>
              <div className="balance-history">
                <div className="history-empty mono">
                  <span className="comment">// История транзакций пуста</span>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="profile-section">
              <div className="section-header">
                <span className="section-title mono">// Безопасность</span>
              </div>
              <div className="security-list">
                <div className="security-item">
                  <div className="security-icon">🛡️</div>
                  <div className="security-content">
                    <span className="security-name">Двухфакторная аутентификация</span>
                    <span className="security-status off mono">status: "disabled"</span>
                  </div>
                  <button className="btn-action mono">enable()</button>
                </div>
                <div className="security-item">
                  <div className="security-icon">📱</div>
                  <div className="security-content">
                    <span className="security-name">Активные сессии</span>
                    <span className="security-status mono">sessions: 1</span>
                  </div>
                  <button className="btn-action mono">view()</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
