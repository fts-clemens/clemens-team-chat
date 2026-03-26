// Service worker for PWA — enables "Add to Home Screen" on mobile
const CACHE = 'clemens-chat-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/'])));
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // Network-first for API calls, cache-first for static assets
  if (e.request.url.includes('/team-chat/')) {
    e.respondWith(fetch(e.request));
  } else {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
  }
});
