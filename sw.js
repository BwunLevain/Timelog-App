// open server go to the pages that you want to use, ctrl + shit + i -> devtools -> application -> service workers -> check offline and restart the page
const CACHE_VERSION = "v1";
const CACHE_NAME = `workers-cache-${CACHE_VERSION}`;

const ASSETS = [
  "./", 
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./swCall.js",

  // HTML Files
  "./offline.html",
  "./overviewpage.html",
  "./pomodoromode.html",
  "./settingspage.html",
  "./trainingmode.html",

  // CSS Files
  "./src/css/base.css",
  "./src/css/components.css",
  "./src/css/overview.css",
  "./src/css/style.css",
  "./src/css/timer.css",
  "./src/css/variables.css",

  // Scripts (All moved into the src/scripts/ path)
  "./src/scripts/addTimeDOM.js",
  "./src/scripts/addTimeLogic.js",
  "./src/scripts/barchartDOM.js",
  "./src/scripts/barchartLogic.js",
  "./src/scripts/localStorage.js",
  "./src/scripts/navigation.js",
  "./src/scripts/overviewDOM.js",
  "./src/scripts/overviewLogic.js",
  "./src/scripts/timer.js",
  "./src/scripts/settingsDOM.js",
  "./src/scripts/statsDisplayDOM.js",
  "./src/scripts/statsDisplayLogic.js",  
  "./src/scripts/themes.js",
  "./src/scripts/timerDOM.js",
  "./src/scripts/training.js",

  // Images
  "./src/images/icon-192.png",
  "./src/images/icon-512.png",
];

// Install - Saves all critical resources in the cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cachar resurser...");
      return cache.addAll(ASSETS);
    }),
  );
  self.skipWaiting(); // Makes it so that the new Service worker is activated instantly
});

// Activate - Clears old cache's to handle updates in "version"
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
  self.clients.claim();
});

// Fetch - Handels requests 
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  // If the cache is findable, return it
  if (cachedResponse) {
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse.ok) cache.put(request, networkResponse.clone());
      })
      .catch(() => {
      });

    return cachedResponse.clone();
  }

  // If the file is not in the ache we will get it from the web
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Gets used if the user tries to navigate to a new page
    if (request.mode === "navigate") {
      const offlineFallback = await cache.match("offline.html");
      if (offlineFallback) return offlineFallback;
    }

    // If there is no fallback this is the message that you will get.
    return new Response("You´re offline and this resource isn´t cached.", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}