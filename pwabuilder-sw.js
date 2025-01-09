const CACHE = "pwabuilder-offline-page";

// Import Workbox (for advanced caching strategies)
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Replace with the correct offline fallback page
const offlineFallbackPage = "offline.html";

// Listen for messages (e.g., to skip waiting)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Install event: Cache the offline fallback page
self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

// Enable navigation preload (if supported)
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Cache all pages using StaleWhileRevalidate strategy
workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

// Fetch event: Serve the offline fallback page if the network fails
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // Try to fetch the page from the network
        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {
        // If the network fails, serve the offline fallback page
        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});