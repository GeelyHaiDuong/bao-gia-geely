const VERSION = 'geely-pwa-v1.5.0';
const STATIC_CACHE = `${VERSION}-static`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const LOCAL_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './manifest.webmanifest',
  './assets/app.css',
  './assets/export-compat.css?v=150',
  './assets/app.js',
  './assets/qrcode-browser.js',
  './assets/pwa.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

const REMOTE_LIBRARIES = [
  'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const staticCache = await caches.open(STATIC_CACHE);
    await staticCache.addAll(LOCAL_ASSETS);

    const runtimeCache = await caches.open(RUNTIME_CACHE);
    await Promise.allSettled(
      REMOTE_LIBRARIES.map(async url => {
        const response = await fetch(url, { mode: 'no-cors', cache: 'reload' });
        await runtimeCache.put(url, response);
      })
    );

    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names
        .filter(name => name.startsWith('geely-pwa-') && ![STATIC_CACHE, RUNTIME_CACHE].includes(name))
        .map(name => caches.delete(name))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(STATIC_CACHE);
        cache.put('./index.html', networkResponse.clone());
        return networkResponse;
      } catch (error) {
        return (await caches.match('./index.html')) || (await caches.match('./offline.html'));
      }
    })());
    return;
  }

  if (REMOTE_LIBRARIES.includes(request.url)) {
    event.respondWith((async () => {
      const cached = await caches.match(request.url);
      if (cached) return cached;
      const response = await fetch(request);
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request.url, response.clone());
      return response;
    })());
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
      return response;
    })());
    return;
  }

  // Ảnh xe từ link ngoài: dùng cache khi mất mạng.
  if (request.destination === 'image') {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      const networkPromise = fetch(request)
        .then(async response => {
          const cache = await caches.open(RUNTIME_CACHE);
          await cache.put(request, response.clone());
          return response;
        })
        .catch(() => null);
      return cached || (await networkPromise) || Response.error();
    })());
  }
});
