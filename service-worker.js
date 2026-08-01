const VERSION = 'geely-pwa-v1.8.0';
const STATIC_CACHE = `${VERSION}-static`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const CAR_IMAGES = [
  'ex2_pro','ex2_max','ex5_pro','ex5_max','ex5_emi_pro','ex5_emi_max',
  'monjaro_premium','monjaro_flagship','coolray_exec_26','coolray_prem_26',
  'coolray_flag_26','okavango_exec','okavango_prem'
].map(name => `./assets/cars/${name}.svg`);

const LOCAL_ASSETS = [
  './','./index.html','./offline.html','./manifest.webmanifest',
  './assets/app.css','./assets/export-compat.css?v=180','./assets/app.js?v=180',
  './assets/idb-store.js?v=180','./assets/firebase-sync.js?v=180',
  './assets/qrcode-browser.js','./assets/pwa.js?v=180',
  './assets/vendor/react.production.min.js','./assets/vendor/scheduler.production.min.js',
  './assets/vendor/react-dom.production.min.js',
  './icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/apple-touch-icon.png',
  ...CAR_IMAGES
];

const REMOTE_LIBRARIES = [
  'https://www.gstatic.com/firebasejs/12.16.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/12.16.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore-compat.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const staticCache = await caches.open(STATIC_CACHE);
    await staticCache.addAll(LOCAL_ASSETS);
    const runtimeCache = await caches.open(RUNTIME_CACHE);
    await Promise.allSettled(REMOTE_LIBRARIES.map(async url => {
      const response = await fetch(url, { mode: 'no-cors', cache: 'reload' });
      await runtimeCache.put(url, response);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('geely-pwa-') && ![STATIC_CACHE,RUNTIME_CACHE].includes(name)).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => { if (event.data === 'SKIP_WAITING') self.skipWaiting(); });

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        const cache = await caches.open(STATIC_CACHE);
        cache.put('./index.html', response.clone());
        return response;
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
      const network = fetch(request).then(async response => {
        if (response.ok) {
          const cache = await caches.open(STATIC_CACHE);
          cache.put(request, response.clone());
        }
        return response;
      }).catch(() => null);
      return cached || (await network) || Response.error();
    })());
    return;
  }

  if (request.destination === 'image') {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      const network = fetch(request).then(async response => {
        const cache = await caches.open(RUNTIME_CACHE);
        await cache.put(request, response.clone());
        return response;
      }).catch(() => null);
      return cached || (await network) || Response.error();
    })());
  }
});
