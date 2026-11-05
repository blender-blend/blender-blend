// BlendBridge PWA Service Worker for Offline Caching
const CACHE_NAME = 'blendbridge-v1';
const ASSETS = [
  './',
  './index.html',
  './shortcuts.html',
  './modifiers.html',
  './tutorials.html',
  './glossary.html',
  './errors.html',
  './practice.html',
  './style-landing.css',
  './style-shortcuts.css',
  './style-tutorials.css',
  './style-glossary.css',
  './style-errors.css',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
