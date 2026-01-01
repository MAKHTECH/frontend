# Работа с токенами

## Описание

После успешной регистрации или входа сервер возвращает пару токенов:
- **accessToken** - краткосрочный токен для API запросов (обычно 15-60 минут)
- **refreshToken** - долгосрочный токен для обновления accessToken (обычно 7-30 дней)

## Автоматическое сохранение

AuthService автоматически сохраняет токены в `localStorage`:

```javascript
// После успешного входа/регистрации
localStorage.setItem('accessToken', tokens.accessToken);
localStorage.setItem('refreshToken', tokens.refreshToken);
```

## Использование токенов

### 1. Получение токена для API запросов

```javascript
import authService from './services/authService';

const accessToken = authService.getAccessToken();

// Использование в fetch запросах
fetch('http://localhost:44044/api/protected', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

### 2. Обновление токена

Когда accessToken истекает, используйте refreshToken для получения новой пары:

```javascript
import authService from './services/authService';

try {
  const response = await authService.refreshToken();
  console.log('Новые токены:', response.tokens);
  // Токены автоматически сохранены в localStorage
} catch (error) {
  // Если refresh token тоже истек, пользователь выходит из системы
  console.error('Необходима повторная авторизация');
}
```

### 3. Проверка авторизации

```javascript
import authService from './services/authService';

if (authService.isAuthenticated()) {
  console.log('Пользователь авторизован');
} else {
  console.log('Пользователь НЕ авторизован');
}
```

### 4. Выход из системы

```javascript
import authService from './services/authService';

await authService.logout();
// Токены удалены из localStorage
```

## Автоматическое обновление токенов

Вы можете создать interceptor для автоматического обновления токена:

```javascript
// src/utils/apiInterceptor.js
import authService from '../services/authService';

export async function fetchWithAuth(url, options = {}) {
  let accessToken = authService.getAccessToken();
  
  // Добавляем токен в заголовки
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${accessToken}`
  };

  let response = await fetch(url, { ...options, headers });

  // Если 401, пробуем обновить токен
  if (response.status === 401) {
    try {
      await authService.refreshToken();
      accessToken = authService.getAccessToken();
      
      // Повторяем запрос с новым токеном
      headers.Authorization = `Bearer ${accessToken}`;
      response = await fetch(url, { ...options, headers });
    } catch (error) {
      // Если обновление не удалось, выходим
      await authService.logout();
      window.location.href = '/login';
      throw error;
    }
  }

  return response;
}
```

### Использование interceptor:

```javascript
import { fetchWithAuth } from './utils/apiInterceptor';

const response = await fetchWithAuth('http://localhost:44044/api/user/profile');
const data = await response.json();
```

## React Context для аутентификации

Пример создания React Context:

```javascript
// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    const checkAuth = async () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      // Если есть refresh token, пробуем обновить
      if (authenticated && authService.getRefreshToken()) {
        try {
          await authService.refreshToken();
        } catch (error) {
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    const response = await authService.login(username, password);
    if (response.success) {
      setIsAuthenticated(true);
    }
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### Использование в компонентах:

```javascript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Необходима авторизация</div>;
  }

  return (
    <div>
      <h1>Приветствуем!</h1>
      <button onClick={logout}>Выйти</button>
    </div>
  );
}
```

## Protected Routes

```javascript
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

### Использование:

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

## Безопасность

⚠️ **Важные замечания:**

1. **Никогда не храните токены в `document.cookie` без флага `httpOnly`** - они будут доступны через JavaScript и уязвимы для XSS атак
2. **localStorage подходит для SPA приложений**, но помните, что токены доступны через JavaScript
3. **Используйте HTTPS** в продакшене для защиты токенов при передаче
4. **Устанавливайте короткое время жизни для accessToken** (15-60 минут)
5. **Refresh token должен иметь более длительное время жизни** (7-30 дней)
6. **Рассмотрите использование httpOnly cookies** для refresh token в продакшене

## Дополнительно

📖 JWT токены: https://jwt.io/  
📖 OAuth 2.0: https://oauth.net/2/
