import GRPC_CONFIG from '../config/grpc.config.js';
import protobuf from 'protobufjs';

// Определяем proto схему для User сервиса
const userProtoSchema = {
  nested: {
    auth: {
      nested: {
        Role: {
          values: {
            USER: 0,
            ADMIN: 1
          }
        },
        AssignRoleRequest: {
          fields: {
            user_id: { type: 'uint32', id: 1 },
            app_id: { type: 'int32', id: 2 },
            role: { type: 'Role', id: 3 }
          }
        },
        AssignRoleResponse: {
          fields: {
            success: { type: 'bool', id: 1 }
          }
        },
        ChangeAvatarRequest: {
          fields: {
            app_id: { type: 'int32', id: 1 },
            photo_url: { type: 'string', id: 2 }
          }
        },
        ChangeAvatarResponse: {
          fields: {
            success: { type: 'bool', id: 1 }
          }
        },
        ChangeUsernameRequest: {
          fields: {
            app_id: { type: 'int32', id: 1 },
            username: { type: 'string', id: 2 }
          }
        },
        ChangeUsernameResponse: {
          fields: {
            username: { type: 'string', id: 1 }
          }
        },
        ChangePasswordRequest: {
          fields: {
            app_id: { type: 'int32', id: 1 },
            current_password: { type: 'string', id: 2 },
            new_password: { type: 'string', id: 3 }
          }
        },
        ChangePasswordResponse: {
          fields: {
            success: { type: 'bool', id: 1 }
          }
        },
        ChangeEmailRequest: {
          fields: {
            app_id: { type: 'int32', id: 1 },
            email: { type: 'string', id: 2 }
          }
        },
        ChangeEmailResponse: {
          fields: {
            email: { type: 'string', id: 1 }
          }
        }
      }
    }
  }
};

// Создаем root из схемы
const root = protobuf.Root.fromJSON(userProtoSchema);

/**
 * Сервис для работы с пользователями через gRPC
 */
class UserService {
  constructor() {
    this.serviceUrl = GRPC_CONFIG.serverUrl;
  }

  /**
   * Изменение имени пользователя
   * @param {number} appId - ID приложения
   * @param {string} username - Новое имя пользователя
   * @returns {Promise<Object>} - Результат операции
   */
  async changeUsername(appId, username) {
    try {
      const requestData = {
        app_id: appId,
        username: username
      };

      const response = await this.makeGrpcRequest(
        '/auth.User/ChangeUsername',
        'ChangeUsernameRequest',
        'ChangeUsernameResponse',
        requestData
      );
      return { success: true, username: response.username };
    } catch (error) {
      console.error('Change username error:', error);
      throw error;
    }
  }

  /**
   * Изменение email пользователя
   * @param {number} appId - ID приложения
   * @param {string} email - Новый email
   * @returns {Promise<Object>} - Результат операции
   */
  async changeEmail(appId, email) {
    try {
      const requestData = {
        app_id: appId,
        email: email
      };

      const response = await this.makeGrpcRequest(
        '/auth.User/ChangeEmail',
        'ChangeEmailRequest',
        'ChangeEmailResponse',
        requestData
      );
      return { success: true, email: response.email };
    } catch (error) {
      console.error('Change email error:', error);
      throw error;
    }
  }

  /**
   * Изменение пароля пользователя
   * @param {number} appId - ID приложения
   * @param {string} currentPassword - Текущий пароль
   * @param {string} newPassword - Новый пароль
   * @returns {Promise<Object>} - Результат операции
   */
  async changePassword(appId, currentPassword, newPassword) {
    try {
      const requestData = {
        app_id: appId,
        current_password: currentPassword,
        new_password: newPassword
      };

      const response = await this.makeGrpcRequest(
        '/auth.User/ChangePassword',
        'ChangePasswordRequest',
        'ChangePasswordResponse',
        requestData
      );
      
      if (response.success) {
        return { success: true, message: 'Пароль успешно изменён' };
      } else {
        throw new Error('Ошибка изменения пароля');
      }
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  /**
   * Изменение аватара пользователя
   * @param {number} appId - ID приложения
   * @param {string} photoUrl - URL нового аватара
   * @returns {Promise<Object>} - Результат операции
   */
  async changeAvatar(appId, photoUrl) {
    try {
      const requestData = {
        app_id: appId,
        photo_url: photoUrl
      };

      const response = await this.makeGrpcRequest(
        '/auth.User/ChangeAvatar',
        'ChangeAvatarRequest',
        'ChangeAvatarResponse',
        requestData
      );
      
      if (response.success) {
        return { success: true, message: 'Аватар успешно изменён' };
      } else {
        throw new Error('Ошибка изменения аватара');
      }
    } catch (error) {
      console.error('Change avatar error:', error);
      throw error;
    }
  }

  /**
   * Назначение роли пользователю (только для администраторов)
   * @param {number} userId - ID пользователя
   * @param {number} appId - ID приложения
   * @param {string} role - Роль: 'USER' или 'ADMIN'
   * @returns {Promise<Object>} - Результат операции
   */
  async assignRole(userId, appId, role) {
    try {
      const requestData = {
        user_id: userId,
        app_id: appId,
        role: role === 'ADMIN' ? 1 : 0 // USER = 0, ADMIN = 1
      };

      const response = await this.makeGrpcRequest(
        '/auth.User/AssignRole',
        'AssignRoleRequest',
        'AssignRoleResponse',
        requestData
      );
      
      if (response.success) {
        return { success: true, message: 'Роль успешно назначена' };
      } else {
        throw new Error('Ошибка назначения роли');
      }
    } catch (error) {
      console.error('Assign role error:', error);
      throw error;
    }
  }

  /**
   * Выполнение gRPC запроса
   * @param {string} method - Метод gRPC (например, '/auth.User/ChangeAvatar')
   * @param {string} requestType - Тип запроса (например, 'ChangeAvatarRequest')
   * @param {string} responseType - Тип ответа (например, 'ChangeAvatarResponse')
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

      // Получаем токен для аутентифицированных запросов
      const accessToken = localStorage.getItem('accessToken');

      const headers = {
        'Content-Type': 'application/grpc-web+proto',
        'X-Grpc-Web': '1',
        'Accept': 'application/grpc-web+proto'
      };

      // Добавляем токен в заголовки
      if (accessToken) {
        headers['Authorization'] = accessToken;
      }

      const response = await fetch(`${this.serviceUrl}${method}`, {
        method: 'POST',
        headers: headers,
        body: frame,
        mode: 'cors'
      });

      // Проверяем grpc-status в HTTP заголовках
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
        
        const frameType = responseData[offset];
        const frameView = new DataView(responseData.buffer, offset + 1, 4);
        const frameLength = frameView.getUint32(0, false);
        
        if (offset + 5 + frameLength > responseData.length) break;
        
        const frameData = responseData.slice(offset + 5, offset + 5 + frameLength);
        
        if (frameType === 0) {
          // Data frame
          messageData = frameData;
        } else if (frameType === 128) {
          // Trailers frame
          const trailersText = new TextDecoder().decode(frameData);
          const lines = trailersText.split('\r\n');
          for (const line of lines) {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
              const key = line.substring(0, colonIndex).trim().toLowerCase();
              const value = line.substring(colonIndex + 1).trim();
              trailers[key] = value;
            }
          }
        }
        
        offset += 5 + frameLength;
      }

      // Проверяем grpc-status в trailers
      if (trailers['grpc-status'] && trailers['grpc-status'] !== '0') {
        let errorMessage = trailers['grpc-message'] || 'Ошибка сервера';
        try {
          errorMessage = decodeURIComponent(errorMessage.replace(/\+/g, ' '));
        } catch (e) {
          // Если не удалось декодировать, используем как есть
        }
        throw new Error(errorMessage);
      }

      // Декодируем protobuf сообщение
      if (messageData) {
        const decoded = ResponseMessage.decode(messageData);
        return ResponseMessage.toObject(decoded, {
          longs: Number,
          enums: String,
          defaults: true
        });
      }

      return {};
    } catch (error) {
      console.error('gRPC request error:', error);
      throw new Error(error.message || 'Ошибка соединения с сервером');
    }
  }
}

// Экспортируем singleton instance
const userService = new UserService();
export default userService;
