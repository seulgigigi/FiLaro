// Cache name
const CACHE_NAME = 'fi-laro-cache-v1';

// Files to cache
const urlsToCache = [
    '/',
    'index.html',
    'salita.html',
    'wikablanks.html',
    'styles.css',
    'salita.css',
    'wikablanks.css',
    'script.js',
    'salita.js',
    'wikablanks.js',
    'icons/icon-48x48.png',
    'icons/icon-72x72.png',
    'icons/icon-96x96.png',
    'icons/icon-128x128.png',
    'icons/icon-144x144.png',
    'icons/icon-152x152.png',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png'
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
                return fetch(event.request);
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
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});