const CACHE_NAME = 'flowsystem-shell-v1-2-24-r2';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .filter((key) => key.startsWith('flowsystem-shell-') || key.startsWith('naursystem-shell-'))
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

const updateCache = async (request, response) => {
  if (!response || response.status !== 200 || response.type === 'opaque') return response;
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());
  return response;
};

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => updateCache('/index.html', response))
        .catch(async () => {
          const cached = await caches.match('/index.html');
          return cached || Response.error();
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => updateCache(event.request, response))
        .catch(() => cached);

      return cached || network;
    })
  );
});
