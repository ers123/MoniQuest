const CACHE_VERSION = 'v1.4.0';
const CACHE_NAME = `moniquest-cache-${CACHE_VERSION}`;

const scopeUrl = self.registration ? new URL(self.registration.scope) : new URL(self.location.href);
const toScopeUrl = (path = './') => new URL(path, scopeUrl).toString();
const OFFLINE_URL = toScopeUrl('offline.html');

const CORE_ASSETS = [
  toScopeUrl('./'),
  toScopeUrl('index.html'),
  toScopeUrl('manifest.json'),
  toScopeUrl('moni_icon.png'),
  toScopeUrl('moni_image.png'),
  OFFLINE_URL,
];

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(CORE_ASSETS);
    })()
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })()
  );
  self.clients.claim();
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        } catch (error) {
          const cached = await caches.match(request);
          if (cached) {
            return cached;
          }
          const offlinePage = await caches.match(OFFLINE_URL);
          return offlinePage || Response.error();
        }
      })()
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) {
        return cached;
      }

      try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, networkResponse.clone());
        return networkResponse;
      } catch (error) {
        return caches.match(request);
      }
    })()
  );
});
