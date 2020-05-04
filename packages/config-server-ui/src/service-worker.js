// Детали реализации взяты из статьи https://habr.com/ru/company/2gis/blog/345552/
// Добавляем аннотацию для автодополнения =)

/** @alias ServiceWorkerGlobalScope */
var self = this;


/** Array<{ revision, url }> */
let files = JSON.parse(`__WEBPACK_FILES__`) || [];


self.addEventListener('install', (/** ExtendableEvent  */ event) => {
	event.waitUntil(
		caches.open(CACHE)
			.then((cache) =>
				cache.addAll(files.map(file => file.url))
			)
			.finally(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (/** ExtendableEvent  */ event) => {

});

self.addEventListener('fetch', (/** FetchEvent */ event) => {
	// Кэшируем только статику.
	if (
		event.request.method !== 'GET'
		||
		!event.request.url.endsWith('.js')
		||
		!event.request.url.endsWith('.css')
		||
		!event.request.url.endsWith('.woff2')
		||
		!event.request.url.startsWith('http')
		||
		event.request.url.endsWith('service-worker.js')
	) {
		return;
	}

	event.respondWith(fromCache(event.request));
	event.waitUntil(update(event.request));
});

const CACHE = 'static-files';

/**
 * Get cache.
 *
 * @returns {Promise<Cache>}
 */
function openCache() {
	return caches.open(CACHE);
}

function update(request) {
	return openCache()
		.then((cache) =>
			fetch(request)
				.then((response) => cache.put(request, response))
		);
}

function fromCache(request) {
	return openCache()
		.then(
			(cache) => cache.match(request)
				.then((matching) => matching || Promise.reject('no-match'))
		);
}

self.addEventListener('push', function (/** */ event) {
	let notification = null;

	try {
		notification = event.data.json();
	} catch (e) {
		notification = {
			title: 'CI Server',
			body: 'Something was updated',
			data: null
		}
	}

	self.clients.matchAll().then(clientList => {
		clientList.forEach(client => {
			client.postMessage(notification.data);
		});
	});

	event.waitUntil(
		self.registration.showNotification(notification.title, {
			body: notification.body,
		})
	);
});

self.addEventListener('notificationclick', function (event) {
	event.notification.close();

	event.waitUntil(
		self.clients.matchAll().then(function (clientList) {
			if (clientList.length > 0) {
				return clientList[0].focus();
			}

			return self.clients.openWindow(`/build/${event.notification.data.id}`);
		})
	);
});
