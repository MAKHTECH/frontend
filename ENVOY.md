# Envoy Proxy для gRPC-Web

## Быстрый старт

### Запустить Envoy:
```bash
docker-compose up -d
```

### Остановить Envoy:
```bash
docker-compose down
```

### Посмотреть логи:
```bash
docker-compose logs -f envoy
```

### Перезапустить после изменения конфигурации:
```bash
docker-compose restart
```

## Проверка работы

После запуска Envoy будет доступен на `http://localhost:8080`

Проверить статус:
```bash
curl http://localhost:8080
```

## Настройка

Envoy настроен на проксирование запросов к вашему gRPC серверу:
- **Входящие запросы:** `http://localhost:8080` (gRPC-Web)
- **Исходящие запросы:** `http://localhost:44044` (ваш gRPC сервер)

Если нужно изменить порт gRPC сервера, отредактируйте `envoy.yaml` (строка 54).

## Устранение неполадок

### Проблема: "Cannot connect to the Docker daemon"
**Решение:** Убедитесь, что Docker Desktop запущен

### Проблема: "port is already allocated"
**Решение:** Порт 8080 уже занят. Остановите другой сервис или измените порт в `docker-compose.yml`

### Проблема: Envoy не может подключиться к gRPC серверу
**Решение:** 
1. Проверьте, что gRPC сервер запущен на порту 44044
2. В Windows используйте `host.docker.internal` вместо `localhost` в `envoy.yaml`:
   ```yaml
   address: host.docker.internal
   port_value: 44044
   ```
