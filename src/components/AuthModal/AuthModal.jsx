import { useState } from 'react';
import './AuthModal.css';

function AuthModal({ isOpen, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Имитация задержки запроса
    setTimeout(() => {
      if (email === 'admin' && password === 'admin') {
        onSuccess();
      } else {
        setError('Неверный логин или пароль');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleTelegramLogin = () => {
    // В будущем здесь будет логика входа через Telegram
    setError('Telegram авторизация в разработке');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close mono" onClick={onClose}>×</button>
        
        <div className="modal-header mono">
          <span className="modal-comment">// Авторизация</span>
          <h2 className="modal-title">
            <span className="fn-keyword">async</span>{' '}
            <span className="fn-name">login</span>
            <span className="parens">()</span>
          </h2>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label mono">
              <span className="label-key">email:</span>
            </label>
            <input
              type="text"
              className="form-input mono"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label mono">
              <span className="label-key">password:</span>
            </label>
            <input
              type="password"
              className="form-input mono"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="form-error mono">
              <span className="error-prefix">error:</span>
              <span className="error-message">"{error}"</span>
            </div>
          )}

          <button 
            type="submit" 
            className="btn-submit mono"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>loading...</span>
            ) : (
              <>
                <span className="btn-bracket">[</span>
                Войти
                <span className="btn-bracket">]</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span className="divider-line"></span>
          <span className="divider-text mono">||</span>
          <span className="divider-line"></span>
        </div>

        <button className="btn-telegram mono" onClick={handleTelegramLogin}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          Войти через Telegram
        </button>

        <p className="auth-hint mono">
          <span className="comment-slash">//</span> Нет аккаунта? Создайте сервер — регистрация автоматическая
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
