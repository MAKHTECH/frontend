// Конфигурация для gRPC и API соединений
// Переменные окружения из Vite (VITE_ префикс обязателен)

// URL вашего gRPC-Web прокси сервера
// Для разработки обычно используется envoy proxy
export const GRPC_CONFIG = {
  // Адрес вашего gRPC сервера через Envoy proxy
  serverUrl: import.meta.env.VITE_GRPC_SERVER_URL || 'http://localhost:8080',
  
  // Адрес напрямую к gRPC серверу (для разработки)
  grpcServerUrl: import.meta.env.VITE_GRPC_DIRECT_URL || 'http://localhost:44044',
  
  // Опции для запросов
  requestOptions: {
    mode: 'cors',
    credentials: 'include',
  },
  
  // Таймауты
  timeout: 10000, // 10 секунд
};

// API URLs
export const API_CONFIG = {
  // Telegram Auth callback URL
  telegramAuthUrl: import.meta.env.VITE_TELEGRAM_AUTH_URL || 'http://localhost:8099',
};

export default GRPC_CONFIG;
