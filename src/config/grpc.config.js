// Конфигурация для gRPC соединения

// URL вашего gRPC-Web прокси сервера
// Для разработки обычно используется envoy proxy
export const GRPC_CONFIG = {
  // Адрес вашего gRPC сервера через Envoy proxy
  serverUrl: 'http://localhost:8080',
  
  // Адрес напрямую к gRPC серверу (для разработки)
  grpcServerUrl: 'http://localhost:44044',
  
  // Опции для запросов
  requestOptions: {
    mode: 'cors',
    credentials: 'include',
  },
  
  // Таймауты
  timeout: 10000, // 10 секунд
};

export default GRPC_CONFIG;
