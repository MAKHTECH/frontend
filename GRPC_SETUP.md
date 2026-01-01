# gRPC Authentication Setup

## Описание

Этот проект использует gRPC-Web для аутентификации пользователей. Регистрация и вход осуществляются через gRPC запросы к вашему серверу.

## Файловая структура

```
frontend/
├── proto/
│   └── auth.proto              # Protobuf определения для аутентификации
├── src/
│   ├── config/
│   │   └── grpc.config.js      # Конфигурация gRPC соединения
│   ├── services/
│   │   └── authService.js      # Сервис для работы с gRPC API
│   └── components/
│       └── AuthModal/
│           └── AuthModal.jsx   # Модальное окно с интеграцией gRPC
```

## Настройка

### 1. Конфигурация сервера

Откройте файл `src/config/grpc.config.js` и укажите адрес вашего gRPC-Web прокси:

```javascript
export const GRPC_CONFIG = {
  serverUrl: 'http://localhost:8080', // Замените на адрес вашего сервера
  // ...
};
```

### 2. Серверная часть

Ваш gRPC сервер должен реализовывать следующие методы из `proto/auth.proto`:

- `Register(RegisterRequest) returns (RegisterResponse)` - регистрация
- `Login(LoginRequest) returns (LoginResponse)` - вход

#### Пример структуры запросов/ответов:

**RegisterRequest:**
```protobuf
message RegisterRequest {
  string email = 1;
  string password = 2;
}
```

**RegisterResponse:**
```protobuf
message RegisterResponse {
  bool success = 1;
  string message = 2;
  string token = 3;
  User user = 4;
}
```

### 3. gRPC-Web Proxy (Envoy)

Так как браузеры не поддерживают нативный gRPC, вам нужен прокси. Рекомендуется использовать Envoy.

#### Пример конфигурации Envoy (envoy.yaml):

```yaml
static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address:
        address: 0.0.0.0
        port_value: 8080
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          stat_prefix: ingress_http
          access_log:
          - name: envoy.access_loggers.stdout
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.access_loggers.stream.v3.StdoutAccessLog
          http_filters:
          - name: envoy.filters.http.grpc_web
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.grpc_web.v3.GrpcWeb
          - name: envoy.filters.http.cors
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.cors.v3.Cors
          - name: envoy.filters.http.router
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router
          route_config:
            name: local_route
            virtual_hosts:
            - name: local_service
              domains: ["*"]
              routes:
              - match:
                  prefix: "/"
                route:
                  cluster: grpc_service
                  timeout: 0s
                  max_stream_duration:
                    grpc_timeout_header_max: 0s
              cors:
                allow_origin_string_match:
                - prefix: "*"
                allow_methods: GET, PUT, DELETE, POST, OPTIONS
                allow_headers: keep-alive,user-agent,cache-control,content-type,content-transfer-encoding,custom-header-1,x-accept-content-transfer-encoding,x-accept-response-streaming,x-user-agent,x-grpc-web,grpc-timeout
                max_age: "1728000"
                expose_headers: custom-header-1,grpc-status,grpc-message
  clusters:
  - name: grpc_service
    connect_timeout: 0.25s
    type: logical_dns
    http2_protocol_options: {}
    lb_policy: round_robin
    load_assignment:
      cluster_name: cluster_0
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: localhost  # Адрес вашего gRPC сервера
                port_value: 50051   # Порт вашего gRPC сервера
```

#### Запуск Envoy:

```bash
docker run -d -p 8080:8080 -v $(pwd)/envoy.yaml:/etc/envoy/envoy.yaml envoyproxy/envoy:v1.24.0
```

## Использование

### Регистрация пользователя

```javascript
import authService from './services/authService';

try {
  const response = await authService.register('user@example.com', 'password123');
  if (response.success) {
    console.log('Успешная регистрация:', response.user);
    console.log('Токен:', response.token);
  }
} catch (error) {
  console.error('Ошибка:', error.message);
}
```

### Вход пользователя

```javascript
try {
  const response = await authService.login('user@example.com', 'password123');
  if (response.success) {
    console.log('Успешный вход:', response.user);
    console.log('Токен:', response.token);
  }
} catch (error) {
  console.error('Ошибка:', error.message);
}
```

### Проверка аутентификации

```javascript
if (authService.isAuthenticated()) {
  console.log('Пользователь авторизован');
  const token = authService.getToken();
}
```

### Выход

```javascript
authService.logout();
```

## Тестирование

1. Запустите ваш gRPC сервер
2. Запустите Envoy proxy
3. Запустите frontend: `npm run dev`
4. Откройте браузер и протестируйте регистрацию/вход

## Генерация JavaScript файлов из proto (опционально)

Если хотите использовать типизированные gRPC клиенты, выполните:

```bash
npm run proto:gen
```

Это создаст файлы в `src/generated/` используя `protoc` и `grpc-web` плагин.

**Примечание:** Для этого нужно установить `protoc` и `protoc-gen-grpc-web`:
- [protoc](https://github.com/protocolbuffers/protobuf/releases)
- [protoc-gen-grpc-web](https://github.com/grpc/grpc-web/releases)

## Устранение неполадок

### CORS ошибки

Убедитесь, что Envoy proxy правильно настроен для CORS и запущен.

### Ошибки соединения

1. Проверьте, что gRPC сервер запущен
2. Проверьте, что Envoy proxy запущен и направляет запросы на правильный адрес
3. Проверьте адрес в `src/config/grpc.config.js`

### Ошибки формата данных

Убедитесь, что ваш сервер возвращает ответы в правильном формате:

```json
{
  "success": true,
  "message": "Success",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

## Дополнительные ресурсы

- [gRPC-Web Documentation](https://github.com/grpc/grpc-web)
- [Protocol Buffers](https://developers.google.com/protocol-buffers)
- [Envoy Proxy](https://www.envoyproxy.io/)
