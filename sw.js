/* Nightwatch service worker — cache the shell, let live data pass through. */
const CACHE = "nightwatch-v4";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-180.png", "./background.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Live data (NOAA, Open-Meteo) always goes to the network; the app has its
  // own localStorage staleness cache and quiet failure states.
  if (url.origin !== location.origin) return;
  // App shell: network-first so updates land, cache fallback for offline.
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true })
        .then(m => m || caches.match("./index.html")))
  );
});
