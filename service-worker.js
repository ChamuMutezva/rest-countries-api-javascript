const filesToCache = [
  '/',
  'style.css',
  'main.js',
  'images/moon-solid.svg',
  'index.html',
  'offline.html',
  '404.html',
  'README.md'

];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => { 
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [staticCacheName];
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

self.addEventListener('fetch', event => {

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(response => {
            if (response.status === 404) {
              return caches.match('404.html');
            }
            return caches.open(staticCacheName).then(cache => {
              cache.put(event.request.url, response.clone());
              return response;
            });
          });
      }).catch(error => {
        return caches.match('offline.html');
      })
  );
});