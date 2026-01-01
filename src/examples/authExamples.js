/**
 * Примеры использования authService
 * 
 * Этот файл содержит примеры вызовов gRPC методов через authService
 */

import authService from './services/authService';

// ============================================
// ПРИМЕР 1: Регистрация нового пользователя
// ============================================

async function exampleRegister() {
  try {
    const email = 'newuser@example.com';
    const password = 'securePassword123';

    console.log('Отправка запроса на регистрацию...');
    const response = await authService.register(email, password);

    if (response.success) {
      console.log('✅ Регистрация успешна!');
      console.log('Пользователь:', response.user);
      console.log('Токен:', response.token);
      
      // Токен автоматически сохраняется в localStorage
      console.log('Токен из localStorage:', authService.getToken());
    } else {
      console.log('❌ Ошибка регистрации:', response.message);
    }
  } catch (error) {
    console.error('❌ Ошибка при регистрации:', error.message);
  }
}

// ============================================
// ПРИМЕР 2: Вход пользователя
// ============================================

async function exampleLogin() {
  try {
    const email = 'user@example.com';
    const password = 'password123';

    console.log('Отправка запроса на вход...');
    const response = await authService.login(email, password);

    if (response.success) {
      console.log('✅ Вход успешен!');
      console.log('Пользователь:', response.user);
      console.log('Токен:', response.token);
    } else {
      console.log('❌ Ошибка входа:', response.message);
    }
  } catch (error) {
    console.error('❌ Ошибка при входе:', error.message);
  }
}

// ============================================
// ПРИМЕР 3: Проверка аутентификации
// ============================================

function exampleCheckAuth() {
  if (authService.isAuthenticated()) {
    console.log('✅ Пользователь авторизован');
    console.log('Токен:', authService.getToken());
  } else {
    console.log('❌ Пользователь НЕ авторизован');
  }
}

// ============================================
// ПРИМЕР 4: Выход пользователя
// ============================================

function exampleLogout() {
  console.log('Выход из системы...');
  authService.logout();
  console.log('✅ Токен удален из localStorage');
  console.log('Авторизован:', authService.isAuthenticated());
}

// ============================================
// ПРИМЕР 5: Использование в React компоненте
// ============================================

/*
import React, { useState } from 'react';
import authService from './services/authService';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      
      if (response.success) {
        // Успешный вход
        console.log('Logged in:', response.user);
        // Редирект или обновление состояния приложения
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
*/

// ============================================
// ПРИМЕР 6: Отправка authenticated запросов
// ============================================

async function exampleAuthenticatedRequest() {
  const token = authService.getToken();
  
  if (!token) {
    console.error('❌ Пользователь не авторизован');
    return;
  }

  try {
    // Пример запроса к защищенному API endpoint
    const response = await fetch('http://localhost:8080/api/protected', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Данные получены:', data);
    } else {
      console.error('❌ Ошибка запроса:', response.status);
    }
  } catch (error) {
    console.error('❌ Ошибка при запросе:', error.message);
  }
}

// ============================================
// Экспорт примеров для тестирования
// ============================================

export {
  exampleRegister,
  exampleLogin,
  exampleCheckAuth,
  exampleLogout,
  exampleAuthenticatedRequest
};

// Чтобы протестировать в консоли браузера:
// import { exampleRegister, exampleLogin } from './examples/authExamples.js';
// await exampleRegister();
// await exampleLogin();
