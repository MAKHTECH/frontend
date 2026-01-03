import GRPC_CONFIG from '../config/grpc.config.js';
import protobuf from 'protobufjs';

// Определяем proto схему напрямую в коде
const protoSchema = {
  nested: {
    auth: {
      nested: {
        RegisterRequest: {
          fields: {
            email: { type: 'string', id: 1 },
            username: { type: 'string', id: 2 },
            password: { type: 'string', id: 3 },
            app_id: { type: 'int32', id: 4 }
          }
        },
        LoginRequest: {
          fields: {
            username: { type: 'string', id: 1 },
            password: { type: 'string', id: 2 },
            app_id: { type: 'int32', id: 3 }
          }
        },
        RefreshTokenRequest: {
          fields: {
            refresh_token: { type: 'string', id: 1 }
          }
        },
        LogoutRequest: {
          fields: {
            access_token: { type: 'string', id: 1 }
          }
        },
        GetDevicesRequest: {
          fields: {
            user_id: { type: 'int32', id: 1 }
          }
        },
        TokenPair: {
          fields: {
            accessToken: { type: 'string', id: 1 },
            refreshToken: { type: 'string', id: 2 }
          }
        },
        RegisterResponse: {
          fields: {
            tokens: { type: 'TokenPair', id: 1 }
          }
        },
        LoginResponse: {
          fields: {
            tokens: { type: 'TokenPair', id: 1 }
          }
        },
        RefreshTokenResponse: {
          fields: {
            tokens: { type: 'TokenPair', id: 1 }
          }
        },
        LogoutResponse: {
          fields: {
            success: { type: 'bool', id: 1 }
          }
        },
        Device: {
          fields: {
            refresh_token: { type: 'string', id: 1 },
            user_id: { type: 'string', id: 2 },
            ua: { type: 'string', id: 3 },
            ip: { type: 'string', id: 4 },
            fingerprint: { type: 'string', id: 5 },
            expires_in: { type: 'int64', id: 6 },
            created_at: { type: 'int64', id: 7 }
          }
        },
        GetDevicesResponse: {
          fields: {
            devices: { rule: 'repeated', type: 'Device', id: 1 }
          }
        }
      }
    }
  }
};

// Создаем root из схемы
const root = protobuf.Root.fromJSON(protoSchema);

/**
 * Сервис для работы с аутентификацией через gRPC
 */
class AuthService {
  constructor() {
    this.serviceUrl = GRPC_CONFIG.serverUrl;
  }

  /**
   * Регистрация нового пользователя
   * @param {string} email - Email пользователя
   * @param {string} username - Имя пользователя
   * @param {string} password - Пароль пользователя
   * @param {number} appId - ID приложения (по умолчанию 1)
   * @returns {Promise<Object>} - Результат регистрации с токенами
   */
  async register(email, username, password, appId = 1) {
    try {
      const requestData = {
        email: email,
        username: username,
        password: password,
        app_id: appId
      };

      const response = await this.makeGrpcRequest(
        '/auth.Auth/Register',
        'RegisterRequest',
        'RegisterResponse',
        requestData
      );
      
      if (response.tokens) {
        // Сохраняем токены в localStorage
        if (response.tokens.accessToken) {
          localStorage.setItem('accessToken', response.tokens.accessToken);
        }
        if (response.tokens.refreshToken) {
          localStorage.setItem('refreshToken', response.tokens.refreshToken);
        }
        return { success: true, tokens: response.tokens };
      } else {
        throw new Error('Ошибка регистрации: токены не получены');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Вход пользователя
   * @param {string} username - Имя пользователя
   * @param {string} password - Пароль пользователя
   * @param {number} appId - ID приложения (по умолчанию 1)
   * @returns {Promise<Object>} - Результат входа с токенами
   */
  async login(username, password, appId = 1) {
    try {
      const requestData = {
        username: username,
        password: password,
        app_id: appId
      };

      const response = await this.makeGrpcRequest(
        '/auth.Auth/Login',
        'LoginRequest',
        'LoginResponse',
        requestData
      );
      
      if (response.tokens) {
        // Сохраняем токены в localStorage
        if (response.tokens.accessToken) {
          localStorage.setItem('accessToken', response.tokens.accessToken);
        }
        if (response.tokens.refreshToken) {
          localStorage.setItem('refreshToken', response.tokens.refreshToken);
        }
        return { success: true, tokens: response.tokens };
      } else {
        throw new Error('Ошибка входа: токены не получены');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Выход пользователя
   */
  async logout() {
    try {
      const accessToken = this.getAccessToken();
      if (accessToken) {
        const requestData = {
          access_token: accessToken
        };
        await this.makeGrpcRequest(
          '/auth.Auth/Logout',
          'LogoutRequest',
          'LogoutResponse',
          requestData
        );
      }
    } catch (error) {
      // Ошибка при logout не критична
    } finally {
      // Удаляем токены из localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  /**
   * Обновление токена
   * @returns {Promise<Object>} - Новая пара токенов
   */
  async refreshToken() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('Refresh token не найден');
      }

      const requestData = {
        refresh_token: refreshToken
      };

      const response = await this.makeGrpcRequest(
        '/auth.Auth/RefreshToken',
        'RefreshTokenRequest',
        'RefreshTokenResponse',
        requestData
      );
      
      if (response.tokens) {
        // Обновляем токены в localStorage
        if (response.tokens.accessToken) {
          localStorage.setItem('accessToken', response.tokens.accessToken);
        }
        if (response.tokens.refreshToken) {
          localStorage.setItem('refreshToken', response.tokens.refreshToken);
        }
        return { success: true, tokens: response.tokens };
      } else {
        throw new Error('Ошибка обновления токена');
      }
    } catch (error) {
      // При ошибке удаляем токены
      this.logout();
      throw error;
    }
  }

  /**
   * Получение устройств пользователя
   * @param {number} userId - ID пользователя
   * @returns {Promise<Array>} - Список устройств
   */
  async getDevices(userId) {
    try {
      const requestData = {
        user_id: userId
      };

      const response = await this.makeGrpcRequest(
        '/auth.Auth/GetDevices',
        'GetDevicesRequest',
        'GetDevicesResponse',
        requestData
      );
      return response.devices || [];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Получение access токена
   * @returns {string|null} - Access токен
   */
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  /**
   * Получение refresh токена
   * @returns {string|null} - Refresh токен
   */
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  /**
   * Получение текущего токена (алиас для getAccessToken)
   * @returns {string|null} - Токен аутентификации
   */
  getToken() {
    return this.getAccessToken();
  }

  /**
   * Проверка аутентификации
   * @returns {boolean} - Аутентифицирован ли пользователь
   */
  isAuthenticated() {
    return !!this.getToken();
  }

  /**
   * Выполнение gRPC запроса
   * @param {string} method - Метод gRPC (например, '/auth.Auth/Register')
   * @param {string} requestType - Тип запроса (например, 'RegisterRequest')
   * @param {string} responseType - Тип ответа (например, 'RegisterResponse')
   * @param {Object} data - Данные запроса
   * @returns {Promise<Object>} - Ответ от сервера
   */
  async makeGrpcRequest(method, requestType, responseType, data) {
    try {
      // Получаем типы сообщений
      const RequestMessage = root.lookupType(`auth.${requestType}`);
      const ResponseMessage = root.lookupType(`auth.${responseType}`);

      // Создаем и кодируем сообщение
      const errMsg = RequestMessage.verify(data);
      if (errMsg) throw Error(errMsg);
      
      const message = RequestMessage.create(data);
      const buffer = RequestMessage.encode(message).finish();

      // Создаем gRPC-Web фрейм
      const frame = new Uint8Array(buffer.length + 5);
      frame[0] = 0; // compression flag
      const view = new DataView(frame.buffer);
      view.setUint32(1, buffer.length, false); // message length (big-endian)
      frame.set(buffer, 5);

      const response = await fetch(`${this.serviceUrl}${method}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/grpc-web+proto',
          'X-Grpc-Web': '1',
          'Accept': 'application/grpc-web+proto'
        },
        body: frame,
        mode: 'cors'
      });

      // Сначала проверяем grpc-status в HTTP заголовках (Envoy/gRPC-Web часто передаёт ошибки там)
      const grpcStatusHeader = response.headers.get('grpc-status');
      const grpcMessageHeader = response.headers.get('grpc-message');
      
      if (grpcStatusHeader && grpcStatusHeader !== '0') {
        let errorMessage = grpcMessageHeader || 'Ошибка сервера';
        try {
          errorMessage = decodeURIComponent(errorMessage.replace(/\+/g, ' '));
        } catch (e) {
          // Если не удалось декодировать, используем как есть
        }
        throw new Error(errorMessage);
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      // Декодируем ответ
      const responseBuffer = await response.arrayBuffer();
      const responseData = new Uint8Array(responseBuffer);
      
      // Читаем все фреймы gRPC-Web
      let offset = 0;
      let messageData = null;
      let trailers = {};
      
      while (offset < responseData.length) {
        // Проверяем, есть ли достаточно байт для заголовка
        if (offset + 5 > responseData.length) break;
        
        // Читаем заголовок фрейма (5 байт)
        const frameType = responseData[offset];
        const messageLength = new DataView(responseData.buffer, responseData.byteOffset + offset + 1, 4).getUint32(0, false);
        
        // Проверяем, есть ли достаточно байт для сообщения
        if (offset + 5 + messageLength > responseData.length) break;
        
        // Проверяем тип фрейма (bit 7 указывает на trailers)
        const isTrailers = (frameType & 0x80) !== 0;
        
        if (!isTrailers) {
          // Data frame - это наше сообщение
          messageData = responseData.slice(offset + 5, offset + 5 + messageLength);
        } else {
          // Trailers frame - парсим для извлечения grpc-status и grpc-message
          const trailersData = responseData.slice(offset + 5, offset + 5 + messageLength);
          const trailersText = new TextDecoder().decode(trailersData);
          
          // Парсим trailers (формат: key: value, разделитель может быть \r\n или \n)
          const lines = trailersText.split(/\r?\n/);
          lines.forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
              const key = line.substring(0, colonIndex).trim().toLowerCase();
              const value = line.substring(colonIndex + 1).trim();
              trailers[key] = value;
            }
          });
        }
        
        offset += 5 + messageLength;
      }
      
      // Проверяем статус gRPC из trailers
      const grpcStatus = trailers['grpc-status'];
      if (grpcStatus && grpcStatus !== '0') {
        // gRPC вернул ошибку
        let errorMessage = trailers['grpc-message'] || 'Ошибка сервера';
        // Декодируем URL-encoded сообщение
        try {
          errorMessage = decodeURIComponent(errorMessage.replace(/\+/g, ' '));
        } catch (e) {
          // Если не удалось декодировать, используем как есть
        }
        throw new Error(errorMessage);
      }
      
      if (!messageData) {
        throw new Error('Ответ от сервера не содержит данных');
      }
      
      const responseMessage = ResponseMessage.decode(messageData);
      return ResponseMessage.toObject(responseMessage, {
        longs: String,
        enums: String,
        bytes: String,
      });
    } catch (error) {
      throw new Error(error.message || 'Ошибка соединения с сервером');
    }
  }
}

// Экспортируем singleton instance
const authService = new AuthService();
export default authService;

