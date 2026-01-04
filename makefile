# Генерация JavaScript клиентов из proto файлов
# protoc -I=proto ^proto/sso/auth.proto proto/sso/user.proto proto/sso/sso.proto ^--plugin=protoc-gen-js=node_modules\.bin\protoc-gen-js.cmd ^--js_out=import_style=commonjs:src/generated ^--plugin=protoc-gen-grpc-web=node_modules\.bin\protoc-gen-grpc-web.cmd ^--grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/generated
generate:
	protoc -I=proto proto/sso/auth.proto proto/sso/user.proto proto/sso/sso.proto --plugin=protoc-gen-js=node_modules\.bin\protoc-gen-js.cmd --js_out=import_style=commonjs:src/generated --plugin=protoc-gen-grpc-web=node_modules\.bin\protoc-gen-grpc-web.cmd --grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/generated



# Запуск Envoy proxy
envoy:
	docker-compose up -d

# Остановка Envoy proxy
envoy-stop:
	docker-compose down

# Логи Envoy
envoy-logs:
	docker-compose logs -f envoy

# Перезапуск Envoy
envoy-restart:
	docker-compose restart

# Запуск frontend
dev:
	npm run dev

# Установка зависимостей
install:
	npm install

# Запуск всего (Envoy + Frontend)
start: envoy
	npm run dev

# Остановка всего
stop: envoy-stop

# Полная перезагрузка
restart: envoy-restart
	@echo Envoy перезапущен. Перезапустите npm run dev вручную.

# Помощь
help:
	@echo Доступные команды:
	@echo   make generate      - Генерация JS клиентов из proto файлов
	@echo   make envoy         - Запуск Envoy proxy
	@echo   make envoy-stop    - Остановка Envoy proxy
	@echo   make envoy-logs    - Просмотр логов Envoy
	@echo   make envoy-restart - Перезапуск Envoy
	@echo   make dev           - Запуск frontend
	@echo   make install       - Установка зависимостей
	@echo   make start         - Запуск Envoy + Frontend
	@echo   make stop          - Остановка всего
	@echo   make restart       - Перезапуск Envoy

.PHONY: generate envoy envoy-stop envoy-logs envoy-restart dev install start stop restart help