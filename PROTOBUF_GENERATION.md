# Генерация gRPC-Web клиентов

## Проблема 415

Ошибка 415 (Unsupported Media Type) возникает потому, что ваш gRPC сервер ожидает protobuf бинарный формат, а не JSON.

## Решение

Нужно сгенерировать JavaScript клиенты из ваших .proto файлов.

### Установка protoc

1. **Скачайте protoc:**
   - Перейдите на https://github.com/protocolbuffers/protobuf/releases
   - Скачайте `protoc-<version>-win64.zip`
   - Распакуйте и добавьте в PATH

2. **Скачайте protoc-gen-grpc-web:**
   - Перейдите на https://github.com/grpc/grpc-web/releases
   - Скачайте `protoc-gen-grpc-web-<version>-windows-x86_64.exe`
   - Переименуйте в `protoc-gen-grpc-web.exe`
   - Добавьте в PATH

### Генерация клиентов

```bash
# Создайте директорию для сгенерированных файлов
mkdir src/generated

# Генерация JavaScript кода
protoc -I=proto proto/sso/auth.proto proto/sso/user.proto proto/sso/sso.proto --js_out=import_style=commonjs:src/generated --grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/generated
```

### Использование сгенерированных клиентов

После генерации файлов, обновите `authService.js`:

```javascript
import { AuthClient } from '../generated/sso/SsoServiceClientPb';
import { RegisterRequest, LoginRequest } from '../generated/sso/auth_pb';

class AuthService {
  constructor() {
    this.client = new AuthClient('http://localhost:8080', null, null);
  }

  async register(email, username, password, appId = 1) {
    const request = new RegisterRequest();
    request.setEmail(email);
    request.setUsername(username);
    request.setPassword(password);
    request.setAppId(appId);

    return new Promise((resolve, reject) => {
      this.client.register(request, {}, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            success: true,
            tokens: {
              accessToken: response.getTokens().getAccesstoken(),
              refreshToken: response.getTokens().getRefreshtoken()
            }
          });
        }
      });
    });
  }
}
```

## Альтернативное решение (быстрое)

Если не хотите генерировать клиенты, используйте прямой HTTP запрос с правильной кодировкой.

Но для production рекомендуется использовать сгенерированные клиенты!
