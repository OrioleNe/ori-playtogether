const CACHE_NAME = 'ori-tools-cache-v1';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'https://lh3.googleusercontent.com/pw/AP1GczNrOte9iKVdTsCjMpmcRj1bCupYIBQBq1CP1JxJB_3OklHOATufYoDLMPaybvFnnRoGpYZ_3aLD5oF_XJS6xYomoUZBbwIR32oKg81Vovw4IJt9CRlxnbUy9anxY_0mjwEfMR59gzW5tPtQ47mc6K5xZw=w449-h520-s-no-gm?authuser=0'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
