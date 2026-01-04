import { useState, useRef } from 'react';
import './AuthModal.css';
import authService from '../../services/authService';

function AuthModal({ isOpen, onClose, onSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isMouseDownInsideModal = useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Проверка для регистрации
    if (isRegisterMode) {
      if (!email || !username || !password || !confirmPassword) {
        setError('Заполните все поля');
        return;
      }
      if (password !== confirmPassword) {
        setError('Пароли не совпадают');
        return;
      }
      if (password.length < 6) {
        setError('Пароль должен быть не менее 6 символов');
        return;
      }
    } else {
      // Проверка для входа
      if (!username || !password) {
        setError('Заполните все поля');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (isRegisterMode) {
        // Отправка запроса на регистрацию через gRPC
        const response = await authService.register(email, username, password);
        console.log('Registration response:', response);
        
        if (response.success && response.tokens) {
          // Успешная регистрация
          onSuccess({ tokens: response.tokens });
        } else {
          setError('Ошибка регистрации');
        }
      } else {
        // Отправка запроса на вход через gRPC
        const response = await authService.login(username, password);
        console.log('Login response:', response);
        
        if (response.success && response.tokens) {
          // Успешный вход
          onSuccess({ tokens: response.tokens });
        } else {
          setError('Ошибка входа');
        }
      }
    } catch (error) {
      setError(error.message || 'Произошла ошибка. Проверьте подключение к серверу.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError('');
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleTelegramLogin = () => {
    setError('');
    setIsLoading(true);
    
    // Telegram Bot username и callback URL
    const botUsername = 'ENStealer_bot';
    const callbackUrl = 'http://localhost:8099/callback/telegram/auth';
    
    // Генерируем уникальный ID для этой сессии авторизации
    const authId = Date.now().toString();
    
    // Создаём URL для Telegram OAuth
    const telegramAuthUrl = `https://oauth.telegram.org/auth?bot_id=6140124734&origin=${encodeURIComponent(window.location.origin)}&request_access=write&return_to=${encodeURIComponent(window.location.href)}`;
    
    // Открываем popup для авторизации Telegram
    const width = 550;
    const height = 470;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    const popup = window.open(
      `https://oauth.telegram.org/auth?bot_id=6140124734&origin=${encodeURIComponent(window.location.origin)}&embed=1&request_access=write`,
      'telegram-auth',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
    );
    
    // Слушаем сообщения от Telegram
    const handleMessage = async (event) => {
      // Проверяем origin
      if (event.origin !== 'https://oauth.telegram.org') return;
      
      try {
        const data = JSON.parse(event.data);
        
        if (data.event === 'auth_result' && data.result) {
          window.removeEventListener('message', handleMessage);
          if (popup && !popup.closed) popup.close();
          
          // Отправляем данные на бэкенд
          const telegramData = data.result;
          const response = await authService.loginWithTelegram(telegramData);
          
          if (response.success && response.tokens) {
            onSuccess({ tokens: response.tokens });
          } else {
            setError('Ошибка авторизации через Telegram');
          }
          setIsLoading(false);
        }
      } catch (e) {
        console.error('Error parsing Telegram auth message:', e);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Проверяем закрытие popup
    const checkPopup = setInterval(() => {
      if (popup && popup.closed) {
        clearInterval(checkPopup);
        window.removeEventListener('message', handleMessage);
        setIsLoading(false);
      }
    }, 500);
    
    // Таймаут на случай, если popup был заблокирован
    if (!popup || popup.closed) {
      setError('Не удалось открыть окно авторизации. Разрешите всплывающие окна.');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = () => {
    // Закрываем только если мышь была нажата вне модального окна
    if (!isMouseDownInsideModal.current) {
      handleClose();
    }
    isMouseDownInsideModal.current = false;
  };

  const handleModalMouseDown = (e) => {
    // Отмечаем, что нажатие началось внутри модального окна
    isMouseDownInsideModal.current = true;
    e.stopPropagation();
  };

  const handleOverlayMouseDown = () => {
    // Отмечаем, что нажатие началось вне модального окна
    isMouseDownInsideModal.current = false;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay"
      onClick={handleOverlayClick}
      onMouseDown={handleOverlayMouseDown}
    >
      <div 
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleModalMouseDown}
      >
        <button className="modal-close mono" onClick={handleClose}>×</button>
        
        <div className="modal-header mono">
          <span className="modal-comment">
            // {isRegisterMode ? 'Регистрация' : 'Авторизация'}
          </span>
          <h2 className="modal-title">
            <span className="fn-keyword">async</span>{' '}
            <span className="fn-name">{isRegisterMode ? 'register' : 'login'}</span>
            <span className="parens">()</span>
          </h2>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegisterMode && (
            <div className="form-group">
              <label className="form-label mono">
                <span className="label-key">email:</span>
              </label>
              <input
                type="email"
                className="form-input mono"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label mono">
              <span className="label-key">username:</span>
            </label>
            <input
              type="text"
              className="form-input mono"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              autoComplete="username"
              required
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
              autoComplete={isRegisterMode ? "new-password" : "current-password"}
              required
            />
          </div>

          {isRegisterMode && (
            <div className="form-group">
              <label className="form-label mono">
                <span className="label-key">confirmPassword:</span>
              </label>
              <input
                type="password"
                className="form-input mono"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </div>
          )}

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
                {isRegisterMode ? 'Зарегистрироваться' : 'Войти'}
                <span className="btn-bracket">]</span>
              </>
            )}
          </button>

          <button 
            type="button" 
            className="btn-toggle-mode mono"
            onClick={toggleMode}
          >
            {isRegisterMode 
              ? <><span className="comment-slash">//</span> Уже есть аккаунт? Войти</>
              : <><span className="comment-slash">//</span> Нет аккаунта? Зарегистрироваться</>
            }
          </button>
        </form>

        <div className="auth-divider">
          <span className="divider-line"></span>
          <span className="divider-text mono">||</span>
          <span className="divider-line"></span>
        </div>

        <button 
          className="btn-telegram mono" 
          onClick={handleTelegramLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <span>loading...</span>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              {isRegisterMode ? 'Регистрация через Telegram' : 'Войти через Telegram'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default AuthModal;
