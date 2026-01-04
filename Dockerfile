FROM node:20-alpine

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Открываем порт Vite
EXPOSE 5173

# Запускаем dev сервер с host 0.0.0.0 для доступа извне контейнера
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
