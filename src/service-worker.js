/* eslint-disable no-restricted-globals */
// Service worker for CRA 5 Workbox InjectManifest.
// At build time, webpack replaces `self.__WB_MANIFEST` with precache entries
// shaped as [{url, revision}, ...]. Use workbox-precaching to handle them.

import { precacheAndRoute } from 'workbox-precaching';

// Precache all build assets (injected by Workbox at build time)
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Clean up old caches on activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('workbox-'))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Network-first for navigations, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first with offline fallback to cached index
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open('dwiky-navigation').then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('/'))
        )
    );
    return;
  }

  // Static assets: cache-first (hashed filenames are immutable)
  if (
    url.pathname.startsWith('/static/') ||
    url.pathname === '/manifest.json'
  ) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const copy = response.clone();
            caches.open('dwiky-assets').then((cache) => cache.put(request, copy));
            return response;
          })
      )
    );
  }
});
