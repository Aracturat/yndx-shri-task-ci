# Задание "Инфраструктура"
 
Данный репозитории содержит реализацию домашнего задания по теме "Инфраструктура".

Репозиторий предоставляет из себя монорепозиторий, для управления используется lerna.

## Установка

- Установить Node.js версии 12.6.0

- Установить все зависимости `npm install`

- Нужно создать в папке `packages/config-server` файл `server.env` (пример содержимого можно найти в `server.env.example`). 
  В нем нужно указать токен доступа к API базы, токен можно получить на странице https://hw.shri.yandex/
  
- Нужно создать в папке `packages/build-server` файл `server-conf.json` (пример содержимого можно найти в `server-conf.example.json`). 
  В нем нужно указать токен доступа к API базы (из предыдущего пункта)

## Доступные команды

- `npm run config-server` - запустить сервер настроек.

- `npm run config-server-ui` - запустить UI для сервера настроек, доступный по адресу http://localhost:3000/).

- `npm run build-server` - запустить билд-сервер, обрабатывающий очередь билдов. 
  Также настройки можно задать в файле `packages/build-server/server-conf.json`.
  
- `npm run build-agent [-- --port=1234]` - запустить билд-агента, опциональный параметр задает его порт.
  Также настройки можно задать в файле `packages/build-agent/agent-conf.json`.

## Описание реализаций требований
Сервер каждые 30 секунд лезет в базу и проверяет, есть ли незавершенные билды. 

- Сервер должен максимально утилизировать имеющихся агентов.

Поддерживается список агентов, из которого для каждого билда выбирается свободный агент.

- Сервер должен корректно обрабатывать ситуацию, когда агент прекратил работать между сборками.

Каждый 60 секунд сервер пингует агента, и если агент не отвечает, то агент удаляется из списка доступных агентов. 

- Сервер должен корректно обрабатывать ситуацию, когда агент прекратил работать в процессе выполнения сборки.
  
На каждой итерации для билдов в статусе InProgress проверяется, что есть зарегистрированные агенты, обрабатывающие этот билд.
Если таких агентов нет, то билд заново определяется свободному агенту.

- Агент должен корректно обрабатывать ситуацию, когда при старте не смог соединиться с сервером.

Агент при старте пытается подключиться к серверу несколько раз (5 раз).

- Агент должен корректно обрабатывать ситуацию, когда при отправке результатов сборки не смог соединиться с сервером.

Агент пытается отправить серверу результаты сборки несколько раз.
