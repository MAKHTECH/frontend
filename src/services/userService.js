import GRPC_CONFIG from '../config/grpc.config.js';

/**
 * Сервис для работы с пользователями через gRPC
 */
class UserService {
  constructor() {
    this.serviceUrl = GRPC_CONFIG.serverUrl;
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

      const response = await this.makeGrpcRequest('/auth.User/AssignRole', requestData);
      
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
   * @param {string} method - Метод gRPC
   * @param {Object} data - Данные запроса
   * @returns {Promise<Object>} - Ответ от сервера
   */
  async makeGrpcRequest(method, data) {
    try {
      const body = JSON.stringify(data);
      
      // Получаем токен для аутентифицированных запросов
      const accessToken = localStorage.getItem('accessToken');

      const headers = {
        'Content-Type': 'application/grpc-web-text',
        'X-Grpc-Web': '1',
        'Accept': 'application/grpc-web-text'
      };

      // Добавляем токен в заголовки, если он есть
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch(`${this.serviceUrl}${method}`, {
        method: 'POST',
        headers: headers,
        body: body,
        mode: 'cors'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('gRPC request error:', error);
      throw new Error(error.message || 'Ошибка соединения с сервером');
    }
  }
}

// Экспортируем singleton instance
const userService = new UserService();
export default userService;
