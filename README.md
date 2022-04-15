# yndx-shri-task-ci

## Установка

Репозиторий предоставляет из себя монорепозиторий, для управления используется lerna.

- Установить Node.js версии 12.6.0

- Установить все зависимости `npm install`

- Нужно создать в папке `packages/config-server` файл `server.env` (пример содержимого можно найти в `server.env.example`). 
  В нем нужно указать токен доступа к API базы, токен можно получить на странице https://hw.shri.yandex/
  
- Нужно создать в папке `packages/build-server` файл `server-conf.json` (пример содержимого можно найти в `server-conf.example.json`). 
  В нем нужно указать токен доступа к API базы (из предыдущего пункта)
  
- Сгенерировать ключи для пушей с помощью команды `npx web-push generate-vapid-keys` 
и записать их в два конфига: `packages/build-server/server-conf.json` и `packages/config-server-ui/src/push.config.js` 
(пример `push.config.js` лежит в той же директории в файле `push.config.example.js`)

## Доступные команды

- `npm run config-server` - запустить сервер настроек.

- `npm run config-server-ui` - запустить UI для сервера настроек, доступный по адресу http://localhost:3000/).

- `npm run build-server` - запустить билд-сервер, обрабатывающий очередь билдов. 
  Также настройки можно задать в файле `packages/build-server/server-conf.json`.
  
- `npm run build-agent [-- --port=1234]` - запустить билд-агента, опциональный параметр задает его порт.
  Также настройки можно задать в файле `packages/build-agent/agent-conf.json`.
