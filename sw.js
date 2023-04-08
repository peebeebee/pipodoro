// Heavily based on https://github.com/mdn/pwa-examples/blob/main/js13kpwa/sw.js

const cacheName = 'pipodoroPWA-v1';

const contentToCache = [
  'index.html',
  'timer.js',
  'ui.js',
  'utils.js',
  'icons/favicon.svg'
]

// Installing Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  // Cache http and https only, skip unsupported chrome-extension:// and file://...
  if (!(e.request.url.startsWith('http:') || e.request.url.startsWith('https:'))) {
    return;
  }

  e.respondWith((async () => {
    const r = await caches.match(e.request);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    cache.put(e.request, response.clone());
    return response;
  })());
});