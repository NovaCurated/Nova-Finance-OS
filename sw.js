const APP_VERSION = '1.0.0';
const CACHE_NAME = `nova-finance-${APP_VERSION}`;
const CORE_ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(CORE_ASSETS)).catch(() => {})
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
  // Notify all open tabs that a new version is active
  self.clients.matchAll({ type: 'window' }).then(clients => {
    clients.forEach(c => c.postMessage({ type: 'SW_ACTIVATED', version: APP_VERSION }));
  });
});

self.addEventListener('fetch', e => {
  // Only handle same-origin navigation requests — let Supabase calls go direct
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('./index.html'))
    );
    return;
  }
  // For local assets, cache-first
  if (new URL(e.request.url).origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      }))
    );
  }
});

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
