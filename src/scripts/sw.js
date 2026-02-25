// open server go to the pages that you want to use, ctrl + shit + i -> devtools -> application -> service workers -> check offline and restart the page
const CACHE_VERSION = "v1";
const CACHE_NAME = `workers-cache-${CACHE_VERSION}`;

const ASSETS = [
  "/",
  // HTML Files
  "../html/offline.html",
  "../html/overviewpage.html",
  "../html/pomodoromode.html",
  "../html/settingspage.html",
  "../html/trainingmode.html",
  "../../index.html",

  // CSS Files
  "../css/base.css",
  "../css/components.css",
  "../css/overview.css",
  "../css/style.css",
  "../css/timer.css",
  "../css/variables.css",

  // Scripts
  "./addTimeDOM.js",
  "./addTimeLogic.js",
  "./barchartDOM.js",
  "./barchartLogic.js",
  "./localStorage.js",
  "./navigation.js",
  "./overviewDOM.js",
  "./overviewLogic.js",
  "./timer.js",
  "./settingsDOM.js",
  "./statsDisplayDOM.js",
  "./statsDisplayLogic.js",
  "./swCall.js",
  "./themes.js",
  "./timerDOM.js",
  "./training.js",
  "./sw.js",

  // Root files
  
  "../../manifest.json",

  // Images
  "../images/icon-192.png",
  "../images/icon-512.png",
];

// Install - Sparar alla kritiska resurser i cachen
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cachar resurser...");
      return cache.addAll(ASSETS);
    }),
  );
  self.skipWaiting(); // Gör att den nya SW:n aktiveras direkt
});

// Activate - Rensar gamla cacher för att hantera uppdateringar smidigt
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim(); // Tar kontroll över alla flikar omedelbart
});

// Fetch - Hanterar förfrågningar
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  // 1. Om filen finns i cachen, returnera den
  if (cachedResponse) {
    // Försök uppdatera cachen i bakgrunden (Stale-while-revalidate)
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse.ok) cache.put(request, networkResponse.clone());
      })
      .catch(() => {
        /* Tystar nätverksfel i konsolen när vi är offline */
      });

    return cachedResponse.clone();
  }

  // 2. Om filen inte finns i cachen, hämta från nätverket
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // 3. OFFLINE-FALLBACK (Kriterium nr 5)
    // Kontrollerar om användaren försöker navigera till en ny sida
    if (request.mode === "navigate") {
      const offlineFallback = await cache.match("../html/offline.html");
      if (offlineFallback) return offlineFallback;
    }

    // Standardmeddelande om ingen fallback finns
    return new Response("You´re offline and this resource isn´t cached.", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}