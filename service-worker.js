// Cache name
const CACHE_NAME = 'fi-laro-cache-v2';

// Files to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/menu.css',
    '/saliScramble.hmlt',
    '/wikaBlanks.html',
    '/styles.css',
    '/saliScramble.css',
    '/wikablanks.css',
    '/script.js',
    '/saliScramble.js',
    '/wikablanks.js',
    '/icons/72.png',
    '/icons/96.png',
    '/icons/128.png',
    '/icons/144.png',
    '/icons/152.png',
    '/icons/192.png',
    '/icons/512.png'
];

// Install event: Cache the files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event: Serve cached files or fetch from network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return the response from cache
                if (response) {
                    return response;
                }
                // Not in cache - fetch from network
                return fetch(event.request).then(networkResponse => {
                    // If the request is for an HTML page, cache it
                    if (event.request.mode === 'navigate') {
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, networkResponse.clone());
                        });
                    }
                    return networkResponse;
                }).catch(() => {
                    // Fallback to a custom offline page
                    return caches.match('/offline.html');
                });
            })
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log(`Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});