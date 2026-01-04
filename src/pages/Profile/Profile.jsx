import { useState } from 'react';
import userService from '../../services/userService';
import './Profile.css';

function Profile({ user, onUserUpdate }) {
  const [editModal, setEditModal] = useState({ type: null, isOpen: false });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatarUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Генерируем аватар по умолчанию только если нет photo_url
  const defaultAvatar = 'https://api.dicebear.com/7.x/initials/svg?seed=' + (user?.name || 'User');
  const avatarUrl = user?.avatar || defaultAvatar;

  // Определяем что показывать в поле email
  const emailDisplay = user?.email || 'Logged in via Telegram';
  const isTelegramAuth = user?.isTelegramAuth || !user?.email;

  const openEditModal = (type) => {
    setError('');
    setFormData({
      username: user?.name || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      avatarUrl: user?.avatar || ''
    });
    setEditModal({ type, isOpen: true });
  };

  const closeEditModal = () => {
    setEditModal({ type: null, isOpen: false });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const appId = 1; // ID приложения

      switch (editModal.type) {
        case 'username':
          if (!formData.username.trim()) {
            throw new Error('Имя пользователя не может быть пустым');
          }
          const usernameResult = await userService.changeUsername(appId, formData.username);
          if (onUserUpdate) {
            onUserUpdate({ ...user, name: usernameResult.username });
          }
          break;

        case 'email':
          if (!formData.email.trim() || !formData.email.includes('@')) {
            throw new Error('Введите корректный email');
          }
          const emailResult = await userService.changeEmail(appId, formData.email);
          if (onUserUpdate) {
            onUserUpdate({ ...user, email: emailResult.email });
          }
          break;

        case 'password':
          if (!formData.currentPassword) {
            throw new Error('Введите текущий пароль');
          }
          if (!formData.newPassword || formData.newPassword.length < 6) {
            throw new Error('Новый пароль должен быть не менее 6 символов');
          }
          if (formData.newPassword !== formData.confirmPassword) {
            throw new Error('Пароли не совпадают');
          }
          await userService.changePassword(appId, formData.currentPassword, formData.newPassword);
          break;

        case 'avatar':
          // Проверяем, является ли введённое значение валидной ссылкой
          const urlPattern = /^https?:\/\/.+/i;
          const avatarValue = formData.avatarUrl.trim();
          
          // Если пустое или не ссылка - используем дефолтный аватар по инициалам
          const finalAvatarUrl = (avatarValue && urlPattern.test(avatarValue)) 
            ? avatarValue 
            : `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`;
          
          await userService.changeAvatar(appId, finalAvatarUrl);
          if (onUserUpdate) {
            onUserUpdate({ ...user, avatar: finalAvatarUrl });
          }
          break;

        default:
          break;
      }

      closeEditModal();
    } catch (err) {
      setError(err.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  const renderModalContent = () => {
    switch (editModal.type) {
      case 'username':
        return (
          <>
            <h3 className="modal-title mono">// Изменить имя пользователя</h3>
            <div className="form-group">
              <label className="form-label mono">new_username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form-input mono"
                placeholder="Введите новое имя"
                autoFocus
              />
            </div>
          </>
        );

      case 'email':
        return (
          <>
            <h3 className="modal-title mono">// Изменить email</h3>
            <div className="form-group">
              <label className="form-label mono">new_email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input mono"
                placeholder="Введите новый email"
                autoFocus
              />
            </div>
          </>
        );

      case 'password':
        return (
          <>
            <h3 className="modal-title mono">// Изменить пароль</h3>
            <div className="form-group">
              <label className="form-label mono">current_password:</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="form-input mono"
                placeholder="Текущий пароль"
                autoFocus
              />
            </div>
            <div className="form-group">
              <label className="form-label mono">new_password:</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="form-input mono"
                placeholder="Новый пароль"
              />
            </div>
            <div className="form-group">
              <label className="form-label mono">confirm_password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-input mono"
                placeholder="Подтвердите пароль"
              />
            </div>
          </>
        );

      case 'avatar':
        return (
          <>
            <h3 className="modal-title mono">// Изменить аватар</h3>
            <div className="avatar-preview">
              <img 
                src={formData.avatarUrl || defaultAvatar} 
                alt="Preview" 
                onError={(e) => { e.target.src = defaultAvatar; }}
              />
            </div>
            <div className="form-group">
              <label className="form-label mono">photo_url:</label>
              <input
                type="url"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleInputChange}
                className="form-input mono"
                placeholder="https://example.com/avatar.jpg"
                autoFocus
              />
            </div>
            <p className="form-hint mono">// Вставьте прямую ссылку на изображение</p>
          </>
        );

      default:
        return null;
    }
  };

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
              <button className="btn-avatar-edit" onClick={() => openEditModal('avatar')}>📷</button>
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
              <span className="stat-value">{user?.id || 'N/A'}</span>
              <span className="stat-label">user id</span>
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
                  <button className="btn-action mono" onClick={() => openEditModal('username')}>edit()</button>
                </div>
                <div className="info-item">
                  <div className="info-icon">{isTelegramAuth ? '✈️' : '📧'}</div>
                  <div className="info-content">
                    <span className="info-label mono">{isTelegramAuth ? 'auth:' : 'email:'}</span>
                    <span className={`info-value mono ${isTelegramAuth ? 'telegram-auth-value' : ''}`}>
                      "{isTelegramAuth ? 'via Telegram' : user?.email}"
                    </span>
                  </div>
                  {!isTelegramAuth && <button className="btn-action mono" onClick={() => openEditModal('email')}>edit()</button>}
                </div>
                <div className="info-item">
                  <div className="info-icon">🔐</div>
                  <div className="info-content">
                    <span className="info-label mono">password:</span>
                    <span className="info-value mono">"••••••••"</span>
                  </div>
                  <button className="btn-action mono" onClick={() => openEditModal('password')}>change()</button>
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

      {/* Edit Modal */}
      {editModal.isOpen && (
        <div className="edit-modal-overlay" onClick={closeEditModal}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeEditModal}>×</button>
            <form onSubmit={handleSubmit}>
              {renderModalContent()}
              {error && <div className="form-error mono">{error}</div>}
              <div className="modal-actions">
                <button 
                  type="submit" 
                  className="btn-submit mono"
                  disabled={loading}
                >
                  {loading ? 'loading...' : 'save()'}
                </button>
                <button 
                  type="button" 
                  className="btn-cancel mono" 
                  onClick={closeEditModal}
                  disabled={loading}
                >
                  cancel()
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
